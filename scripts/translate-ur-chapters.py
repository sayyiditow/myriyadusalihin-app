import json
from deep_translator import GoogleTranslator
import time
import os

en_path = 'src/lib/translations/en.json'
ur_path = 'src/lib/translations/ur.json'

with open(en_path, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

if os.path.exists(ur_path):
    with open(ur_path, 'r', encoding='utf-8') as f:
        ur_data = json.load(f)
else:
    ur_data = {"meta": {}, "chapters": {}, "hadiths": {}}

translator = GoogleTranslator(source='en', target='ur')

en_chapters = en_data.get('chapters', {})
print(f"Total chapters to translate: {len(en_chapters)}")

count = 0
for cid, ch in en_chapters.items():
    title = ch.get('title', '')
    if not title:
        continue
    
    # Translate title
    try:
        translated_title = translator.translate(title)
        # Ensure we have the chapter structure in ur_data
        if cid not in ur_data['chapters']:
            ur_data['chapters'][cid] = {}
        
        ur_data['chapters'][cid]['title'] = translated_title
        count += 1
        if count % 20 == 0:
            print(f"Translated {count}/{len(en_chapters)} chapter titles...")
            # Small sleep to prevent rate limiting
            time.sleep(0.5)
    except Exception as e:
        print(f"Error translating chapter {cid}: {e}")
        time.sleep(2)

# Save updated ur.json
ur_data['_lang'] = 'ur'
ur_data['_updated'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
with open(ur_path, 'w', encoding='utf-8') as f:
    json.dump(ur_data, f, ensure_ascii=False, indent=2)

print(f"Successfully translated {count} chapter titles and saved to {ur_path}")
