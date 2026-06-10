import json
import re
import urllib.request
import time
import os

en_path = 'src/lib/translations/en.json'
ur_path = 'src/lib/translations/ur.json'
cache_path = 'scripts/quran_cache_ur.json'

surahs = {
    'fatihah': 1, 'baqarah': 2, 'imran': 3, 'nisa': 4, 'maidah': 5, 'an\'am': 6, 'anam': 6,
    'a\'raf': 7, 'araf': 7, 'anfal': 8, 'tawbah': 9, 'taubah': 9, 'yunus': 10, 'hud': 11,
    'yusuf': 12, 'ra\'d': 13, 'rad': 13, 'ibrahim': 14, 'hijr': 15, 'nahl': 16, 'isra': 17,
    'bani': 17, 'kahf': 18, 'maryam': 19, 'taha': 20, 'ta ha': 20, 'anbiya': 21, 'hajj': 22, 'haj': 22,
    'mu\'minun': 23, 'muminun': 23, 'nur': 24, 'furqan': 25, 'shu\'ara': 26, 'shuara': 26,
    'naml': 27, 'qasas': 28, 'ankabut': 29, 'rum': 30, 'luqman': 31, 'sajdah': 32, 'ahzab': 33,
    'saba': 34, 'fatir': 35, 'yasin': 36, 'saffat': 37, 'sad': 38, 'zumar': 39, 'ghafir': 40,
    'mumin': 40, 'fussilat': 41, 'shura': 42, 'zukhruf': 43, 'dukhan': 44, 'jathiyah': 45, 'ahqaf': 46,
    'muhammad': 47, 'fath': 48, 'hujurat': 49, 'qaf': 50, 'dhariyat': 51, 'tur': 52, 'najm': 53,
    'qamar': 54, 'rahman': 55, 'waqi\'ah': 56, 'waqiah': 56, 'hadid': 57, 'mujadalah': 58,
    'hashr': 59, 'mumtahanah': 60, 'saff': 61, 'jumu\'ah': 62, 'jumuah': 62, 'munafiqun': 63,
    'taghabun': 64, 'talaq': 65, 'tahrim': 66, 'mulk': 67, 'qalam': 68, 'haqqah': 69, 'ma\'arij': 70,
    'muzzammil': 73, 'muddaththir': 74, 'insan': 76, 'dahr': 76, 'mursalat': 77, 'naba': 78, 'abasa': 80,
    'infitar': 82, 'mutaffifin': 83, 'inshiqaq': 84, 'buruj': 85, 'tariq': 86, 'a\'la': 87, 'ala': 87,
    'ghashiyah': 88, 'fajr': 89, 'balad': 90, 'shams': 91, 'layl': 92, 'duha': 93, 'sharh': 94,
    'tin': 95, 'alaq': 96, 'qadr': 97, 'bayyinah': 98, 'zalzalah': 99, 'qari\'ah': 101, 'qariah': 101,
    'takathur': 102, 'asr': 103, 'humazah': 104, 'ma\'un': 107, 'maun': 107, 'kawthar': 108,
    'kafirun': 109, 'nasr': 110, 'ikhlas': 112
}

def clean_name(name):
    name = name.lower()
    name = re.sub(r'^sūrah\s+|^surah\s+', '', name)
    name = name.replace('ā', 'a').replace('ī', 'i').replace('ū', 'u').replace('ḥ', 'h').replace('ṣ', 's').replace('ṭ', 't').replace('ḍ', 'd').replace('ẓ', 'z').replace('ʿ', '').replace('’', '').replace('\'', '')
    name = re.sub(r'[^a-z0-9\s]', '', name)
    return name.strip()

def parse_ref(ref):
    parts = re.split(r'[,:]', ref)
    clean_first = clean_name(parts[0])
    
    found_surah_num = None
    for sname in sorted(surahs.keys(), key=len, reverse=True):
        if sname in clean_first:
            found_surah_num = surahs[sname]
            break
            
    if not found_surah_num:
        return None
        
    rest_str = ref[len(parts[0]):]
    nums = [int(n) for n in re.findall(r'\d+', rest_str)]
    
    if nums and nums[0] == found_surah_num:
        nums = nums[1:]
        
    if not nums:
        all_nums = [int(n) for n in re.findall(r'\d+', ref)]
        if len(all_nums) == 1:
            nums = all_nums
        elif len(all_nums) == 2 and all_nums[0] == found_surah_num:
            nums = [all_nums[1]]
            
    if len(nums) == 1:
        return found_surah_num, list(range(nums[0], nums[0] + 1))
    elif len(nums) == 2:
        return found_surah_num, list(range(nums[0], nums[1] + 1))
    else:
        return None

# Load cache
if os.path.exists(cache_path):
    with open(cache_path, 'r', encoding='utf-8') as f:
        cache = json.load(f)
else:
    cache = {}

def fetch_ayah(surah_num, ayah_num):
    key = f"{surah_num}:{ayah_num}"
    if key in cache:
        return cache[key]
    
    url = f"https://api.alquran.cloud/v1/ayah/{surah_num}:{ayah_num}/ur.jalandhry"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req) as response:
                res = json.loads(response.read().decode('utf-8'))
                if res.get('status') == 'OK':
                    text = res.get('data', {}).get('text', '').strip()
                    cache[key] = text
                    # Save cache every time to avoid loss
                    with open(cache_path, 'w', encoding='utf-8') as cf:
                        json.dump(cache, cf, ensure_ascii=False, indent=2)
                    return text
        except Exception as e:
            print(f"Error fetching {key} (attempt {attempt+1}): {e}")
            time.sleep(2)
            
    return None

# Load translation files
with open(en_path, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

with open(ur_path, 'r', encoding='utf-8') as f:
    ur_data = json.load(f)

# Loop and fetch
count = 0
not_found = []

en_chapters = en_data.get('chapters', {})
total_chapters = len(en_chapters)

for cid, ch in en_chapters.items():
    intro_verses = ch.get('introVerses', [])
    if not intro_verses:
        continue
    
    # Initialize chapters inside ur_data if not present
    if cid not in ur_data['chapters']:
        ur_data['chapters'][cid] = {}
    
    ur_data['chapters'][cid]['introVerses'] = []
    
    for vi, v in enumerate(intro_verses):
        ref = v.get('reference', '')
        original_eng_text = v.get('text', '')
        
        parsed = parse_ref(ref)
        if not parsed:
            print(f"Failed to parse reference: {ref} in chapter {cid}")
            not_found.append((cid, ref))
            # Fallback to English text
            ur_data['chapters'][cid]['introVerses'].append({
                "reference": ref,
                "text": original_eng_text
            })
            continue
            
        surah_num, ayahs = parsed
        translated_ayahs = []
        success = True
        
        for ayah in ayahs:
            text = fetch_ayah(surah_num, ayah)
            if text:
                translated_ayahs.append(text)
            else:
                success = False
                break
                
        if success and translated_ayahs:
            urdu_translation = " ".join(translated_ayahs)
            ur_data['chapters'][cid]['introVerses'].append({
                "reference": ref,
                "text": urdu_translation
            })
            count += 1
        else:
            print(f"Failed to fetch Urdu translation for reference: {ref} in chapter {cid}")
            not_found.append((cid, ref))
            ur_data['chapters'][cid]['introVerses'].append({
                "reference": ref,
                "text": original_eng_text
            })

# Save updated ur.json
ur_data['_lang'] = 'ur'
ur_data['_updated'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
with open(ur_path, 'w', encoding='utf-8') as f:
    json.dump(ur_data, f, ensure_ascii=False, indent=2)

print(f"\nFinished processing!")
print(f"Successfully translated {count} Quranic verse groups.")
print(f"Failed/Unparsed count: {len(not_found)}")
if not_found:
    print("Unresolved list:")
    for cid, ref in not_found:
        print(f"  Chapter {cid}: {ref}")
