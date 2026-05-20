/**
 * Safe Turkish translation: only applies proven-safe transforms.
 * Hadith text & commentary left in English (app falls back gracefully).
 * Run: node scripts/translate-tr.js
 */
import { readFileSync, writeFileSync } from 'fs'

const en = JSON.parse(readFileSync(new URL('../src/lib/translations/en.json', import.meta.url), 'utf-8'))
const tr = JSON.parse(JSON.stringify(en))

// ================================================================
// CHAPTER TITLES — fully translated
// ================================================================
const chapterTitles = {
  "1": "Bölüm 1: İhlâs ve Niyetler",
  "2": "Bölüm 2: Tevbe",
  "3": "Bölüm 3: Sabır",
  "4": "Bölüm 4: Doğruluk",
  "5": "Bölüm 5: Takvâ",
  "6": "Bölüm 6: Allah Korkusu",
  "7": "Bölüm 7: Allah Yolunda Harcama ve Cömertlik",
  "8": "Bölüm 8: Gece Namazı (Teheccüd)",
  "9": "Bölüm 9: Hastayı Ziyaret ve Cenaze Namazı",
  "10": "Bölüm 10: Tevekkül ve Allah'a Güven",
  "11": "Bölüm 11: Zikir ve Allah'ı Anmak",
  "12": "Bölüm 12: Güzel Ahlâk",
  "13": "Bölüm 13: Selâm Vermek ve Almak",
  "14": "Bölüm 14: Yemek Âdâbı",
  "15": "Bölüm 15: Giyim Kuşam Âdâbı",
  "16": "Bölüm 16: Uyku Âdâbı",
  "17": "Bölüm 17: Ziyafet ve Davet Âdâbı",
  "18": "Bölüm 18: Sıla-i Rahim ve Akraba Ziyareti",
  "19": "Bölüm 19: Yetimlere ve Çocuklara Şefkat",
  "20": "Bölüm 20: Komşu Hakkı",
  "21": "Bölüm 21: Ana-Babaya İyilik ve Hürmet",
  "22": "Bölüm 22: Evlilik ve Aile Hayatı",
  "23": "Bölüm 23: Helâl Rızık ve Çalışmak",
  "24": "Bölüm 24: Tevazu ve Alçakgönüllülük",
  "25": "Bölüm 25: Kardeşlik ve Birlik",
  "26": "Bölüm 26: Adalet ve Hakkı Gözetmek",
  "27": "Bölüm 27: Fitne ve Musibetlere Sabır",
  "28": "Bölüm 28: Haset ve Kibirden Sakınmak",
  "29": "Bölüm 29: Kul Hakkı ve Helalleşmek",
  "30": "Bölüm 30: Zulüm ve Haksızlıktan Kaçınmak",
  "31": "Bölüm 31: Öfke ve Hiddeti Yenmek",
  "32": "Bölüm 32: Gıybet ve Dedikodudan Sakınmak",
  "33": "Bölüm 33: Tecessüs ve Mahremiyet",
  "34": "Bölüm 34: Sözünde Durmak ve Emanet",
  "35": "Bölüm 35: Ticaret Ahlâkı ve Dürüstlük",
  "36": "Bölüm 36: İlim Öğrenmek ve Öğretmek",
  "37": "Bölüm 37: Cihad ve Allah Yolunda Çalışmak",
  "38": "Bölüm 38: Cennet ve Cennet Nimetleri",
  "39": "Bölüm 39: Cehennem ve Cehennem Azabı",
  "40": "Bölüm 40: Kıyamet ve Ahiret",
  "41": "Bölüm 41: Ölüm ve Kabir Hayatı",
  "42": "Bölüm 42: Dua ve Allah'a Yalvarmak",
  "43": "Bölüm 43: Tefekkür ve Allah'ın Kâinattaki Ayetleri",
  "44": "Bölüm 44: Şükür ve Nimetlere Karşı Vefa",
  "45": "Bölüm 45: Rıza ve Kadere Teslimiyet",
  "46": "Bölüm 46: Hayâ ve Edep",
  "47": "Bölüm 47: Merhamet ve Şefkat",
  "48": "Bölüm 48: Doğru Söz ve Sözünde Durmak",
  "49": "Bölüm 49: Müsamaha ve Hoşgörü",
  "50": "Bölüm 50: Müminin Özellikleri",
  "51": "Bölüm 51: Münâfıklık Alametleri",
  "52": "Bölüm 52: Bid'at ve Hurafelerden Sakınmak",
  "53": "Bölüm 53: Şirk ve Küfürden Sakındırmak",
  "54": "Bölüm 54: İbadet ve Kulluk",
  "55": "Bölüm 55: Oruç ve Ramazan",
  "56": "Bölüm 56: Zekât ve Sadaka",
  "57": "Bölüm 57: Hac ve Umre",
  "58": "Bölüm 58: Kurban ve İbadetler",
  "59": "Bölüm 59: Kur'ân Okumak ve Ezberlemek",
  "60": "Bölüm 60: Allah'ın İsimleri ve Sıfatları",
  "61": "Bölüm 61: Tevhid ve İman",
  "62": "Bölüm 62: Nübüvvet ve Peygamberler",
  "63": "Bölüm 63: Sahabenin Fazileti",
  "64": "Bölüm 64: Ehl-i Beyt'in Fazileti",
  "65": "Bölüm 65: İslam Büyüklerine Hürmet",
  "66": "Bölüm 66: Ramazan ve Bayramlar",
  "67": "Bölüm 67: Cuma Namazı",
  "68": "Bölüm 68: Cemaatle Namaz",
  "69": "Bölüm 69: Mescitler ve İbadethaneler",
  "70": "Bölüm 70: Ezan ve Kamet",
  "71": "Bölüm 71: Seferi Namazı",
  "72": "Bölüm 72: Korku Namazı",
  "73": "Bölüm 73: Yağmur Duası (İstiska)",
  "74": "Bölüm 74: Güneş ve Ay Tutulması Namazı",
  "75": "Bölüm 75: Cenaze ve Kabir Ziyareti",
  "76": "Bölüm 76: Şehitler ve Şehadet",
  "77": "Bölüm 77: İlim Talebesinin Âdâbı",
  "78": "Bölüm 78: Alimlere Saygı",
  "79": "Bölüm 79: Cehalet ve Câhilce Davranış",
  "80": "Bölüm 80: Nasihat ve Öğüt",
  "81": "Bölüm 81: Emr-i bi'l-Ma'rûf ve Nehy-i ani'l-Münker",
  "82": "Bölüm 82: İyiliği Emretmek ve Kötülükten Sakındırmak",
  "83": "Bölüm 83: Fitne Zamanında Sabır",
  "84": "Bölüm 84: İdareci ve Yöneticilerle İlişkiler",
  "85": "Bölüm 85: Adaletli Yönetici",
  "86": "Bölüm 86: Halka Hizmet ve Yardım",
  "87": "Bölüm 87: Şura ve İstişare",
  "88": "Bölüm 88: Barış ve Sulh",
  "89": "Bölüm 89: Savaş ve Cihad Âdâbı",
  "90": "Bölüm 90: Esirlere ve Düşmana Muamele",
  "91": "Bölüm 91: Anlaşmalar ve Ahitleşmeler",
  "92": "Bölüm 92: Ganimet ve Fey",
  "93": "Bölüm 93: Hudud ve Ceza Hukuku",
  "94": "Bölüm 94: Diyet ve Kısas",
  "95": "Bölüm 95: Yemin ve Keffaret",
  "96": "Bölüm 96: Şahitlik ve Adalet",
  "97": "Bölüm 97: Hüküm ve Kadılık",
  "98": "Bölüm 98: Davalar ve İspat",
  "99": "Bölüm 99: Sulh ve Arabuluculuk",
  "100": "Bölüm 100: Vasiyet ve Miras",
}

// Apply
for (const [key, title] of Object.entries(chapterTitles)) {
  if (tr.chapters[key]) tr.chapters[key].title = title
}

// ================================================================
// NARRATOR NAMES — fully translated (Arabic honorifics preserved)
// ================================================================
const narratorMap = {
  'Umar (رضي الله عنه)': 'Ömer (رضي الله عنه)',
  'Ā\'ishah (رضي الله عنها)': 'Âişe (رضي الله عنها)',
  'Jābir ibn \'Abdullāh al-Anṣārī (رضي الله عنهما)': 'Câbir bin Abdullah el-Ensârî (رضي الله عنهما)',
  'Ma\'n ibn Yazīd ibn al-Akhnas (رضي الله عنهم)': 'Ma\'n bin Yezîd bin el-Ahnes (رضي الله عنهم)',
  'Sa\'d ibn Abī Waqqāṣ (رضي الله عنه)': 'Sa\'d bin Ebû Vakkās (رضي الله عنه)',
  'Abū Hurayrah (رضي الله عنه)': 'Ebû Hüreyre (رضي الله عنه)',
  'Abdullāh ibn Qays al Ash\'arī (رضي الله عنه)': 'Abdullah bin Kays el-Eş\'arî (رضي الله عنه)',
  'Nufay\' ibn Ḥārith al-Thaqafī (رضي الله عنه)': 'Nüfey\' bin Hâris es-Sekafî (رضي الله عنه)',
  'Abdullāh ibn \'Abbās (رضي الله عنهما)': 'Abdullah bin Abbâs (رضي الله عنهما)',
  'Anas ibn Mālik (رضي الله عنه)': 'Enes bin Mâlik (رضي الله عنه)',
  'Abū Mūsā al-Ash\'arī (رضي الله عنه)': 'Ebû Mûsâ el-Eş\'arî (رضي الله عنه)',
  'Abū Sa\'īd al-Khudrī (رضي الله عنه)': 'Ebû Saîd el-Hudrî (رضي الله عنه)',
  'Abdullāh ibn \'Umar (رضي الله عنهما)': 'Abdullah bin Ömer (رضي الله عنهما)',
  'Abū Dharr (رضي الله عنه)': 'Ebû Zer (رضي الله عنه)',
  'Abū Bakr al-Ṣiddīq (رضي الله عنه)': 'Ebû Bekir es-Sıddîk (رضي الله عنه)',
  'Alī ibn Abī Ṭālib (رضي الله عنه)': 'Ali bin Ebû Tâlib (رضي الله عنه)',
  'Mu\'ādh ibn Jabal (رضي الله عنه)': 'Muâz bin Cebel (رضي الله عنه)',
  'Ṣuhayb (رضي الله عنه)': 'Suhayb (رضي الله عنه)',
  'Salman al-Fārsī (رضي الله عنه)': 'Selman-ı Fârisî (رضي الله عنه)',
  'Abdullāh ibn \'Amr ibn al-\'Āṣ (رضي الله عنهما)': 'Abdullah bin Amr bin el-Âs (رضي الله عنهما)',
  'Abdullāh ibn al-Zubayr (رضي الله عنهما)': 'Abdullah bin Zübeyr (رضي الله عنهما)',
  'Abdullāh ibn Salām (رضي الله عنه)': 'Abdullah bin Selâm (رضي الله عنه)',
  'Abdullāh ibn Mughaffal (رضي الله عنه)': 'Abdullah bin Mugaffel (رضي الله عنه)',
  'Abd al-Raḥmān ibn \'Awf (رضي الله عنه)': 'Abdurrahman bin Avf (رضي الله عنه)',
  '\'Adī ibn Ḥātim (رضي الله عنه)': 'Adiyy bin Hâtim (رضي الله عنه)',
  '\'Amr ibn al-\'Āṣ (رضي الله عنه)': 'Amr bin el-Âs (رضي الله عنه)',
  '\'Imrān ibn Ḥuṣayn (رضي الله عنه)': 'İmrân bin Husayn (رضي الله عنه)',
  '\'Ubādah ibn al-Ṣāmit (رضي الله عنه)': 'Ubâde bin es-Sâmit (رضي الله عنه)',
  '\'Urwah ibn al-Zubayr (رضي الله عنه)': 'Urve bin Zübeyr (رضي الله عنه)',
  '\'Uthmān ibn \'Affān (رضي الله عنه)': 'Osman bin Affân (رضي الله عنه)',
  'Al-Miqdād ibn Ma\'dīkarib (رضي الله عنه)': 'Mikdâd bin Ma\'dîkerib (رضي الله عنه)',
  'Al-Mughīrah ibn Shu\'bah (رضي الله عنه)': 'Muğîre bin Şu\'be (رضي الله عنه)',
  'Al-Nu\'mān ibn Bashīr (رضي الله عنه)': 'Nu\'man bin Beşîr (رضي الله عنه)',
  'Al-Zubayr ibn al-\'Awwām (رضي الله عنه)': 'Zübeyr bin Avvâm (رضي الله عنه)',
  'Al-Ḥasan ibn \'Alī (رضي الله عنهما)': 'Hasan bin Ali (رضي الله عنهما)',
  'Al-Ḥusayn ibn \'Alī (رضي الله عنه)': 'Hüseyin bin Ali (رضي الله عنه)',
  'Bilāl ibn Rabāḥ (رضي الله عنه)': 'Bilâl bin Rebâh (رضي الله عنه)',
  'Buraydah (رضي الله عنه)': 'Büreyde (رضي الله عنه)',
  'Fāṭimah (رضي الله عنها)': 'Fâtıma (رضي الله عنها)',
  'Ḥafṣah (رضي الله عنها)': 'Hafsa (رضي الله عنها)',
  'Ḥakīm ibn Ḥizām (رضي الله عنه)': 'Hakîm bin Hizâm (رضي الله عنه)',
  'Ḥudhayfah ibn al-Yamān (رضي الله عنه)': 'Huzeyfe bin el-Yemân (رضي الله عنه)',
  'Ibn \'Abbās (رضي الله عنهما)': 'İbn Abbâs (رضي الله عنهما)',
  'Ibn \'Umar (رضي الله عنهما)': 'İbn Ömer (رضي الله عنهما)',
  'Ibn Mas\'ūd (رضي الله عنه)': 'İbn Mes\'ud (رضي الله عنه)',
  'Jābir ibn Samurah (رضي الله عنه)': 'Câbir bin Semure (رضي الله عنه)',
  'Jarīr ibn \'Abdullāh (رضي الله عنه)': 'Cerîr bin Abdullah (رضي الله عنه)',
  'Ka\'b ibn Mālik (رضي الله عنه)': 'Kâb bin Mâlik (رضي الله عنه)',
  'Ka\'b ibn \'Ujrah (رضي الله عنه)': 'Kâb bin Ucre (رضي الله عنه)',
  'Khabbāb ibn al-Aratt (رضي الله عنه)': 'Habbâb bin Eret (رضي الله عنه)',
  'Khālid ibn al-Walīd (رضي الله عنه)': 'Hâlid bin Velîd (رضي الله عنه)',
  'Mālik ibn al-Ḥuwayrith (رضي الله عنه)': 'Mâlik bin el-Huveyris (رضي الله عنه)',
  'Mu\'āwiyah ibn Abī Sufyān (رضي الله عنهما)': 'Muâviye bin Ebû Süfyân (رضي الله عنهما)',
  'Qays ibn Sa\'d (رضي الله عنه)': 'Kays bin Sa\'d (رضي الله عنه)',
  'Rāfi\' ibn Khadīj (رضي الله عنه)': 'Râfi\' bin Hadîc (رضي الله عنه)',
  'Sa\'īd ibn Zayd (رضي الله عنه)': 'Saîd bin Zeyd (رضي الله عنه)',
  'Salāmah ibn al-Akwa\' (رضي الله عنه)': 'Seleme bin el-Ekva\' (رضي الله عنه)',
  'Samurah ibn Jundab (رضي الله عنه)': 'Semüre bin Cündeb (رضي الله عنه)',
  'Shaddād ibn Aws (رضي الله عنه)': 'Şeddâd bin Evs (رضي الله عنه)',
  'Tamīm al-Dārī (رضي الله عنه)': 'Temîm ed-Dârî (رضي الله عنه)',
  'Thābit ibn Qays (رضي الله عنه)': 'Sabit bin Kays (رضي الله عنه)',
  'Thawbān (رضي الله عنه)': 'Sevbân (رضي الله عنه)',
  'Ubay ibn Ka\'b (رضي الله عنه)': 'Übeyy bin Kâb (رضي الله عنه)',
  'Umm \'Aṭiyyah (رضي الله عنها)': 'Ümmü Atiyye (رضي الله عنها)',
  'Umm Ḥabībah (رضي الله عنها)': 'Ümmü Habîbe (رضي الله عنها)',
  'Umm Salamah (رضي الله عنها)': 'Ümmü Seleme (رضي الله عنها)',
  'Umm Sulaym (رضي الله عنها)': 'Ümmü Süleym (رضي الله عنها)',
  'Usāmah ibn Zayd (رضي الله عنهما)': 'Usâme bin Zeyd (رضي الله عنهما)',
  'Zayd ibn Arqam (رضي الله عنه)': 'Zeyd bin Erkam (رضي الله عنه)',
  'Zayd ibn Hārithah (رضي الله عنه)': 'Zeyd bin Hârise (رضي الله عنه)',
  'Zayd ibn Thābit (رضي الله عنه)': 'Zeyd bin Sâbit (رضي الله عنه)',
  'Abū Umāmah (رضي الله عنه)': 'Ebû Ümâme (رضي الله عنه)',
  'Abū Qatādah (رضي الله عنه)': 'Ebû Katâde (رضي الله عنه)',
  'Abū al-Dardā\' (رضي الله عنه)': 'Ebü\'d-Derdâ (رضي الله عنه)',
  'Abū Mūsā (رضي الله عنه)': 'Ebû Mûsâ (رضي الله عنه)',
  'Abū Sa\'īd (رضي الله عنه)': 'Ebû Saîd (رضي الله عنه)',
  'Abū Razīn (رضي الله عنه)': 'Ebû Rezîn (رضي الله عنه)',
  'Abū Hurayrah (radhiAllahu anhu)': 'Ebû Hüreyre (رضي الله عنه)',
  'Al-Ḥasan al-Baṣrī (رحمة الله)': 'Hasan el-Basrî (رحمة الله)',
  'Anas (رضي الله عنه)': 'Enes (رضي الله عنه)',
  'Jābir (رضي الله عنه)': 'Câbir (رضي الله عنه)',
  'Bilāl (رضي الله عنه)': 'Bilâl (رضي الله عنه)',
}

for (const [key, hadith] of Object.entries(tr.hadiths)) {
  if (narratorMap[hadith.narrator]) {
    hadith.narrator = narratorMap[hadith.narrator]
  } else {
    for (const [en, trN] of Object.entries(narratorMap)) {
      const enBase = en.replace(/\(.*?\)/g, '').trim()
      if (hadith.narrator.startsWith(enBase)) {
        hadith.narrator = hadith.narrator.replace(enBase, trN.replace(/\(.*?\)/g, '').trim())
        break
      }
    }
  }
}

// ================================================================
// GRADE & COLLECTION — fully translated
// ================================================================
const gradeMap = {
  'Sahih': 'Sahih',
  'Hasan': 'Hasen',
  'Da\'if': 'Zayıf',
}

const collectionMap = {
  'Al-Bukhari & Muslim': 'Buhârî & Müslim',
  'Al-Bukhari': 'Buhârî',
  'Muslim': 'Müslim',
  'Al-Bukhari, Muslim': 'Buhârî, Müslim',
  'Muslim & Al-Bukhari': 'Müslim & Buhârî',
  'At-Tirmidhi': 'Tirmizî',
  'Abu Dawud': 'Ebû Dâvûd',
  'An-Nasai': 'Nesâî',
  'Ibn Majah': 'İbn Mâce',
  'Ahmad': 'Ahmed',
  'Al-Bayhaqi': 'Beyhakî',
  'Ad-Daraqutni': 'Dârekutnî',
  'Al-Hakim': 'Hâkim',
  'Ibn Hibban': 'İbn Hibbân',
  'Ibn Khuzaymah': 'İbn Huzeyme',
  'At-Tabarani': 'Taberânî',
  'Ad-Darimi': 'Dârimî',
  'Abu Ya\'la': 'Ebû Ya\'lâ',
  'Al-Bazzar': 'Bezzâr',
  'Muslim, Al-Bukhari': 'Müslim, Buhârî',
  'Malik': 'Mâlik',
  'Abu Dawud': 'Ebû Dâvûd',
  'At-Tahawi': 'Tahâvî',
  'Ash-Shafi\'i': 'Şâfiî',
  'Ibn Abi Shaybah': 'İbn Ebî Şeybe',
  'Abdur Razzaq': 'Abdürrezzâk',
  'Sa\'id ibn Mansur': 'Saîd bin Mansûr',
  'Al-Baghawi': 'Beğavî',
}

const multiCollection = [
  ['Al-Bukhari & Muslim', 'Buhârî & Müslim'],
  ['Al-Bukhari, Muslim', 'Buhârî, Müslim'],
  ['Al-Bukhari, Muslim, Abu Dawud', 'Buhârî, Müslim, Ebû Dâvûd'],
  ['Al-Bukhari, Muslim, At-Tirmidhi', 'Buhârî, Müslim, Tirmizî'],
  ['Al-Bukhari, Muslim, An-Nasai', 'Buhârî, Müslim, Nesâî'],
  ['Al-Bukhari, Muslim, Ibn Majah', 'Buhârî, Müslim, İbn Mâce'],
  ['Al-Bukhari, Muslim, Ahmad', 'Buhârî, Müslim, Ahmed'],
  ['Muslim, At-Tirmidhi', 'Müslim, Tirmizî'],
  ['Muslim, Abu Dawud', 'Müslim, Ebû Dâvûd'],
  ['Muslim, An-Nasai', 'Müslim, Nesâî'],
  ['Muslim, Ibn Majah', 'Müslim, İbn Mâce'],
  ['Muslim, Ahmad', 'Müslim, Ahmed'],
  ['Ahmad, Al-Bukhari, Muslim', 'Ahmed, Buhârî, Müslim'],
  ['Ahmad, Muslim', 'Ahmed, Müslim'],
  ['Ahmad, Abu Dawud', 'Ahmed, Ebû Dâvûd'],
  ['Ahmad, At-Tirmidhi', 'Ahmed, Tirmizî'],
  ['Ahmad, Ibn Majah', 'Ahmed, İbn Mâce'],
  ['Ahmad, Al-Hakim', 'Ahmed, Hâkim'],
  ['Abu Dawud, At-Tirmidhi', 'Ebû Dâvûd, Tirmizî'],
  ['Abu Dawud, An-Nasai', 'Ebû Dâvûd, Nesâî'],
  ['Abu Dawud, Ibn Majah', 'Ebû Dâvûd, İbn Mâce'],
  ['Abu Dawud, Ahmad', 'Ebû Dâvûd, Ahmed'],
  ['At-Tirmidhi, An-Nasai', 'Tirmizî, Nesâî'],
  ['At-Tirmidhi, Ibn Majah', 'Tirmizî, İbn Mâce'],
  ['At-Tirmidhi, Ahmad', 'Tirmizî, Ahmed'],
  ['An-Nasai, Ibn Majah', 'Nesâî, İbn Mâce'],
  ['An-Nasai, Ahmad', 'Nesâî, Ahmed'],
  ['Ibn Majah, Ahmad', 'İbn Mâce, Ahmed'],
  ['Al-Hakim, Al-Bayhaqi', 'Hâkim, Beyhakî'],
  ['Ibn Hibban, Al-Hakim', 'İbn Hibbân, Hâkim'],
  ['At-Tabarani, Al-Bayhaqi', 'Taberânî, Beyhakî'],
  ['Al-Bayhaqi, Al-Hakim', 'Beyhakî, Hâkim'],
  ['Ad-Daraqutni, Al-Bayhaqi', 'Dârekutnî, Beyhakî'],
  ['At-Tabarani, Al-Bazzar', 'Taberânî, Bezzâr'],
  ['Ibn Khuzaymah, Ibn Hibban', 'İbn Huzeyme, İbn Hibbân'],
  ['Muslim & Al-Bukhari', 'Müslim & Buhârî'],
  ['Al-Hakim', 'Hâkim'],
  ['Ibn Hibban', 'İbn Hibbân'],
  ['At-Tabarani', 'Taberânî'],
  ['Ad-Darimi', 'Dârimî'],
  ['Abu Ya\'la', 'Ebû Ya\'lâ'],
  ['Al-Bazzar', 'Bezzâr'],
  ['At-Tahawi', 'Tahâvî'],
  ['Ash-Shafi\'i', 'Şâfiî'],
]

for (const [key, hadith] of Object.entries(tr.hadiths)) {
  if (gradeMap[hadith.grade]) hadith.grade = gradeMap[hadith.grade]
  if (collectionMap[hadith.collection]) {
    hadith.collection = collectionMap[hadith.collection]
  } else {
    for (const [en, trC] of multiCollection) {
      if (hadith.collection === en) { hadith.collection = trC; break }
    }
  }
}

// ================================================================
// TEXT & COMMENTARY — leave English (app falls back gracefully)
// The app's applyTranslations() uses English for any missing field,
// so English text + commentary = safe fallback. Translators can
// fill these in tr.json chapter by chapter.
// ================================================================

writeFileSync(
  new URL('../src/lib/translations/tr.json', import.meta.url),
  JSON.stringify(tr, null, 2) + '\n',
  'utf-8'
)

console.log('✓ Safe Turkish translation complete')
console.log(`  Chapter titles: ${Object.keys(chapterTitles).length} translated`)
console.log(`  Narrator names: ${Object.keys(narratorMap).length} mapped`)
console.log(`  Grade/Collection: standard terms translated`)
console.log(`  Hadith texts & commentary: left in English (fallback)`)
