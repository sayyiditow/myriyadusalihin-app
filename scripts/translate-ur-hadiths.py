#!/usr/bin/env python3
"""
Translate Urdu hadith texts and commentaries from English using Claude CLI.
Processes in batches of 15, saves progress after each batch.

Usage:
  # Full sequential run:
  python3 scripts/translate-ur-hadiths.py

  # Partial range (for parallel workers), writes to temp file:
  python3 scripts/translate-ur-hadiths.py --start 1 --end 632 --output /tmp/ur_p1.json
  python3 scripts/translate-ur-hadiths.py --start 633 --end 1264 --output /tmp/ur_p2.json
  python3 scripts/translate-ur-hadiths.py --start 1265 --end 1896 --output /tmp/ur_p3.json

  # Merge worker outputs after all complete:
  python3 scripts/translate-ur-hadiths.py --merge /tmp/ur_p1.json /tmp/ur_p2.json /tmp/ur_p3.json
"""

import json
import subprocess
import re
import sys
import time
import argparse
import os

EN_PATH = 'src/lib/translations/en.json'
UR_PATH = 'src/lib/translations/ur.json'
BATCH_SIZE = 15
MODEL = 'claude-haiku-4-5-20251001'


def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json(data, path):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def is_urdu(text):
    """True if text contains meaningful Arabic/Urdu script content."""
    if not text:
        return False
    urdu_chars = sum(1 for c in text if '؀' <= c <= 'ۿ' or 'ݐ' <= c <= 'ݿ' or 'ﭐ' <= c <= '﷿' or 'ﹰ' <= c <= '﻿')
    return urdu_chars > len(text) * 0.15


def extract_json(text):
    match = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', text)
    if match:
        return match.group(1)
    match = re.search(r'\{[\s\S]*\}', text)
    if match:
        return match.group(0)
    return text


def translate_batch(batch_items, en_hadiths):
    """batch_items: list of hadith IDs to translate"""
    hadith_lines = []
    for hid in batch_items:
        h = en_hadiths[hid]
        text = h.get('text', '')
        commentary = h.get('commentary', '') or '(empty)'
        hadith_lines.append(f'HADITH {hid}:')
        hadith_lines.append(f'text: {text}')
        hadith_lines.append(f'commentary: {commentary}')
        hadith_lines.append('')

    prompt = f"""Translate the following hadith texts and commentaries from English to Urdu (Nastaliq script).

RULES:
- Translate faithfully — these are sacred Islamic texts
- Keep Arabic phrases like (رضي الله عنه), (ﷺ), (صلى الله عليه وسلم) exactly as-is
- Render Sahabi names in standard Urdu (e.g. ابوہریرہ، عمر، عائشہ)
- If commentary is "(empty)", output an empty string ""
- Return ONLY valid JSON, no markdown fences, no explanation:
{{"1": {{"text": "اردو متن", "commentary": "اردو شرح"}}, ...}}

{''.join(hadith_lines)}
Return JSON with keys: {json.dumps(batch_items)}"""

    result = subprocess.run(
        ['claude', '-p', '--model', MODEL],
        input=prompt,
        capture_output=True, text=True, timeout=480
    )

    if result.returncode != 0:
        raise RuntimeError(f"CLI error: {result.stderr[:300]}")

    return json.loads(extract_json(result.stdout.strip()))


def run_translation(start_id, end_id, output_path, batch_limit=0):
    print(f"Loading translation files...")
    en_data = load_json(EN_PATH)

    # Load existing output or start from ur.json
    if os.path.exists(output_path):
        out_data = load_json(output_path)
    else:
        out_data = load_json(UR_PATH)

    en_hadiths = en_data['hadiths']
    out_hadiths = out_data['hadiths']

    # Find hadiths in range that still need translation
    to_translate = []
    for hid in sorted(en_hadiths.keys(), key=int):
        n = int(hid)
        if n < start_id or n > end_id:
            continue
        en_h = en_hadiths[hid]
        out_h = out_hadiths.get(hid, {})
        needs_text = not is_urdu(out_h.get('text', ''))
        needs_comm = bool(en_h.get('commentary')) and not is_urdu(out_h.get('commentary', ''))
        if needs_text or needs_comm:
            to_translate.append(hid)

    print(f"Range {start_id}–{end_id}: {len(to_translate)} hadiths need translation → output: {output_path}")
    if batch_limit:
        print(f"Stopping after {batch_limit} batches (~{batch_limit * BATCH_SIZE} hadiths).")

    total_batches = (len(to_translate) + BATCH_SIZE - 1) // BATCH_SIZE
    if batch_limit:
        total_batches = min(total_batches, batch_limit)
    success_count = 0

    for batch_num in range(total_batches):
        batch_ids = to_translate[batch_num * BATCH_SIZE:(batch_num + 1) * BATCH_SIZE]
        print(f"\nBatch {batch_num + 1}/{total_batches}: hadiths {batch_ids[0]}–{batch_ids[-1]}...", flush=True)

        for attempt in range(3):
            try:
                translations = translate_batch(batch_ids, en_hadiths)

                for hid in batch_ids:
                    if hid not in out_hadiths:
                        out_hadiths[hid] = dict(en_hadiths[hid])
                    out_h = out_hadiths[hid]
                    t = translations.get(hid, {})

                    if t.get('text') and not is_urdu(out_h.get('text', '')):
                        out_h['text'] = t['text']
                    if t.get('commentary') and en_hadiths[hid].get('commentary') and not is_urdu(out_h.get('commentary', '')):
                        out_h['commentary'] = t['commentary']

                save_json(out_data, output_path)
                sample = translations.get(batch_ids[0], {}).get('text', '')[:70]
                print(f"  Saved. [{batch_ids[0]}]: {sample}")
                success_count += len(batch_ids)
                break

            except Exception as e:
                print(f"  Attempt {attempt + 1}/3 failed: {e}")
                if attempt < 2:
                    time.sleep(5)
                else:
                    print(f"  Skipping batch {batch_ids[0]}–{batch_ids[-1]}")

    print(f"\nDone. {success_count}/{len(to_translate)} hadiths processed → {output_path}")


def merge_outputs(worker_files):
    """Merge worker temp files into ur.json."""
    print(f"Merging {len(worker_files)} worker files into {UR_PATH}...")
    base = load_json(UR_PATH)

    for wf in worker_files:
        if not os.path.exists(wf):
            print(f"  WARNING: {wf} not found, skipping")
            continue
        worker_data = load_json(wf)
        merged = 0
        for hid, h in worker_data['hadiths'].items():
            if is_urdu(h.get('text', '')) or is_urdu(h.get('commentary', '')):
                if hid not in base['hadiths']:
                    base['hadiths'][hid] = {}
                if is_urdu(h.get('text', '')):
                    base['hadiths'][hid]['text'] = h['text']
                    merged += 1
                if is_urdu(h.get('commentary', '')):
                    base['hadiths'][hid]['commentary'] = h['commentary']
        print(f"  {wf}: merged {merged} hadith texts")

    save_json(base, UR_PATH)
    print(f"Merge complete → {UR_PATH}")

    # Verify
    done = sum(1 for h in base['hadiths'].values() if is_urdu(h.get('text', '')))
    print(f"Total Urdu texts in ur.json: {done}/1896")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--start', type=int, default=1)
    parser.add_argument('--end', type=int, default=1896)
    parser.add_argument('--output', default=UR_PATH)
    parser.add_argument('--batches', type=int, default=0, help='Stop after this many batches (0 = unlimited)')
    parser.add_argument('--merge', nargs='+', metavar='FILE', help='Merge worker files into ur.json')
    args = parser.parse_args()

    if args.merge:
        merge_outputs(args.merge)
    else:
        run_translation(args.start, args.end, args.output, args.batches)


if __name__ == '__main__':
    main()
