#!/usr/bin/env python3
"""
Parse DİB (Diyanet) Riyazus Salihin epub files and extract hadith text.

Usage:
    python3 scripts/parse-dib-epub.py

Reads:
    static/dib/riyazus-salihin-1.epub
    static/dib/riyazus-salihin-2.epub

Writes:
    static/dib/parsed.json  — { "1": {"text": "...", "source": "..."}, ... }
"""

import json
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

REPO = Path(__file__).parent.parent
OUT = REPO / "static/dib/parsed.json"

NS = {"xhtml": "http://www.w3.org/1999/xhtml"}

def iter_text(elem):
    """Recursively yield all text content from an element, preserving order."""
    parts = []
    if elem.text:
        parts.append(elem.text)
    for child in elem:
        parts.extend(iter_text(child))
        if child.tail:
            parts.append(child.tail)
    return parts

def elem_text(elem):
    return "".join(iter_text(elem)).strip()

def parse_epub(epub_path):
    """Parse one epub and return list of (hadith_num, text, source) tuples."""
    hadiths = []

    with zipfile.ZipFile(epub_path) as zf:
        # Get all xhtml content files, sorted
        xhtml_files = sorted(
            [n for n in zf.namelist() if n.startswith("OEBPS/riyaz") and n.endswith(".xhtml")],
            key=lambda x: [int(c) if c.isdigit() else c for c in re.split(r'(\d+)', x)]
        )

        for fname in xhtml_files:
            try:
                content = zf.read(fname).decode("utf-8")
            except Exception as e:
                print(f"  WARN: could not read {fname}: {e}")
                continue

            try:
                root = ET.fromstring(content)
            except ET.ParseError as e:
                print(f"  WARN: XML parse error in {fname}: {e}")
                continue

            body = root.find(".//{http://www.w3.org/1999/xhtml}body")
            if body is None:
                continue

            # Collect paragraphs with their classes
            paragraphs = []
            for elem in body.iter("{http://www.w3.org/1999/xhtml}p"):
                cls = elem.get("class", "")
                text = elem_text(elem)
                if text:
                    paragraphs.append((cls, text))

            # Parse hadith entries: text paragraphs numbered "N. narrator text..."
            # Each hadith starts with a paragraph beginning with a digit and dot
            hadith_num = None
            current_parts = []
            current_source = ""

            for cls, text in paragraphs:
                if cls == "resimalti":
                    # Source citation — belongs to current hadith
                    current_source = text
                    if hadith_num is not None:
                        hadiths.append((hadith_num, " ".join(current_parts), current_source))
                        hadith_num = None
                        current_parts = []
                        current_source = ""
                    continue

                # Check if this paragraph starts a new hadith (begins with number + dot)
                m = re.match(r'^(\d+)\.\s+(.+)', text, re.DOTALL)
                if m:
                    # Save previous hadith if any (without citation — citation comes after)
                    if hadith_num is not None and current_parts:
                        hadiths.append((hadith_num, " ".join(current_parts), current_source))
                    hadith_num = int(m.group(1))
                    current_parts = [m.group(2)]
                    current_source = ""
                elif hadith_num is not None and cls in ("resim", ""):
                    # Continuation of current hadith
                    current_parts.append(text)

            # Flush last hadith in file (may not have citation)
            if hadith_num is not None and current_parts:
                hadiths.append((hadith_num, " ".join(current_parts), current_source))

    return hadiths


def main():
    all_hadiths = {}

    for vol_num, epub_name in [(1, "riyazus-salihin-1.epub"), (2, "riyazus-salihin-2.epub")]:
        epub_path = REPO / "static/dib" / epub_name
        if not epub_path.exists():
            print(f"SKIP: {epub_name} not found")
            continue

        print(f"Parsing Vol {vol_num}: {epub_name}")
        try:
            hadiths = parse_epub(epub_path)
        except zipfile.BadZipFile:
            print(f"  SKIP: {epub_name} is incomplete/corrupt (still downloading?)")
            continue
        print(f"  Found {len(hadiths)} hadith entries")

        for num, text, source in hadiths:
            if str(num) in all_hadiths:
                # Merge — some hadiths span file boundaries; concatenate
                prev = all_hadiths[str(num)]
                if text not in prev["text"]:
                    prev["text"] += " " + text
                if source and not prev["source"]:
                    prev["source"] = source
            else:
                all_hadiths[str(num)] = {"text": text, "source": source}

    # Sort by hadith number
    sorted_hadiths = {str(k): all_hadiths[str(k)] for k in sorted(all_hadiths.keys(), key=int)}

    print(f"\nTotal unique hadiths: {len(sorted_hadiths)}")
    nums = sorted(int(k) for k in sorted_hadiths)
    if nums:
        print(f"Range: h{nums[0]} – h{nums[-1]}")
        # Check for gaps
        expected = set(range(nums[0], nums[-1] + 1))
        missing = expected - set(nums)
        if missing:
            print(f"Missing hadith numbers: {sorted(missing)[:20]}{'...' if len(missing) > 20 else ''}")
        else:
            print("No gaps in sequence")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(sorted_hadiths, f, ensure_ascii=False, indent=2)

    print(f"\nWritten to {OUT}")

    # Show first 3 entries as sample
    print("\nSample entries:")
    for k in list(sorted_hadiths.keys())[:3]:
        h = sorted_hadiths[k]
        print(f"\nh{k}: {h['text'][:120]}...")
        print(f"  source: {h['source']}")


if __name__ == "__main__":
    main()
