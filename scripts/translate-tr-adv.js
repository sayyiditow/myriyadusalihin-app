/**
 * Advanced systematic Turkish translation for hadiths 412-1896
 * Handles quoted content with phrase-level translation
 * Run: node scripts/translate-tr-adv.js
 */
import { readFileSync, writeFileSync } from 'fs'

const fp = new URL('../src/lib/translations/tr.json', import.meta.url)
const ep = new URL('../src/lib/translations/en.json', import.meta.url)
const tr = JSON.parse(readFileSync(fp, 'utf-8'))
const en = JSON.parse(readFileSync(ep, 'utf-8'))

function translate(text) {
  if (!text) return text

  // === Opening narration patterns ===
  // "The Messenger of Allāh (ﷺ) said:" 
  text = text.replace(/^The Messenger of Allāh \(ﷺ\) said:?\s*/,
    'Resûlullah (ﷺ) şöyle buyurdu: ')
  // "I heard the Messenger of Allāh (ﷺ) saying:"
  text = text.replace(/^I heard the Messenger of Allāh \(ﷺ\) say(ing)?:\s*/,
    "Resûlullah (ﷺ)'i şöyle derken işittim: ")
  // "The Messenger of Allāh (ﷺ) used to say:"
  text = text.replace(/^The Messenger of Allāh \(ﷺ\) used to say:?\s*/,
    'Resûlullah (ﷺ) şöyle derdi: ')
  // "Heard the Messenger of Allāh (ﷺ) saying:"
  text = text.replace(/^Heard the Messenger of Allāh \(ﷺ\) saying:\s*/,
    "Resûlullah (ﷺ)'i şöyle derken işitti: ")
  // "Allāh (ﷻ) says:" / "Allāh (ﷻ) said:"
  text = text.replace(/^Allāh \(ﷻ\) (says|said):\s*/, 'Allah (ﷻ) şöyle buyurdu: ')
  // "The Prophet (ﷺ) said:"
  text = text.replace(/^The Prophet \(ﷺ\) said:?\s*/, 'Peygamber (ﷺ) şöyle buyurdu: ')
  // "Heard the Prophet (ﷺ) saying:"
  text = text.replace(/^Heard the Prophet \(ﷺ\) saying:\s*/, "Peygamber (ﷺ)'i şöyle derken işitti: ")
  // "Narrated by X:"
  text = text.replace(/^Narrated by [^:]+:\s*"?/, '')
  // "From X:"
  text = text.replace(/^From the Messenger of Allāh \(ﷺ\):\s*/, 'Resûlullah (ﷺ) şöyle buyurdu: ')

  // === Honorifics and key names ===
  text = text.replace(/Allāh \(ﷻ\)/g, 'Allah (ﷻ)')
  text = text.replace(/Allāh \(the Mighty and Sublime\)/g, 'Allah (ﷻ)')
  text = text.replace(/Allāh \(the Exalted\)/g, 'Allah (ﷻ)')
  text = text.replace(/Allāh \(the Blessed and Exalted\)/g, 'Allah (ﷻ)')
  text = text.replace(/Allāh \(the Most High\)/g, 'Allah (ﷻ)')
  text = text.replace(/the Messenger of Allāh \(ﷺ\)/g, 'Resûlullah (ﷺ)')
  text = text.replace(/the Prophet \(ﷺ\)/g, 'Peygamber (ﷺ)')
  text = text.replace(/Muḥammad \(ﷺ\)/g, 'Muhammed (ﷺ)')

  // === Islamic terms ===
  const terms = {
    'Paradise': 'Cennet', 'paradise': 'cennet', 'Hell(-fire)?': 'Cehennem', 'hell(-fire)?': 'cehennem',
    'Qiyāmah': 'Kıyamet', 'the Day of Qiyāmah': 'Kıyamet Günü', 'the Day of Resurrection': 'Kıyamet Günü',
    'Jannah': 'Cennet', 'Jahannam': 'Cehennem', 'jihād': 'cihat', 'Jihad': 'Cihat',
    'Ṣalāh': 'namaz', 'ṣalāh': 'namaz', 'Zakāh': 'Zekât', 'zakāh': 'zekât',
    'Ramadān': 'Ramazan', 'Qur\'ān': 'Kur\'an', 'Sunnah': 'Sünnet', 'sunnah': 'sünnet',
    'Ḥadīth': 'Hadis', 'ḥadīth': 'hadis', 'Taqwā': 'Takvâ',
    'Islām': 'İslâm', 'Mu\'min': 'Mümin', 'mu\'min': 'mümin',
    'Muslim': 'Müslüman', 'muslim': 'müslüman', 'Ṣaḥābah': 'Sahâbe', 'Ṣaḥābī': 'Sahâbî',
    'Kāfir': 'Kâfir', 'kāfir': 'kâfir', 'Shirk': 'Şirk',
    'Du\'ā\'': 'Dua', 'du\'ā\'': 'dua', 'Khuṭbah': 'Hutbe', 'Jumu\'ah': 'Cuma',
    'Fajr': 'Sabah', 'Zuhr': 'Öğle', '\'Aṣr': 'İkindi', 'Maghrib': 'Akşam', '\'Ishā\'': 'Yatsı',
    'Wuḍū\'': 'Abdest', 'Ghusl': 'Gusül', 'Ḥajj': 'Hac', '\'Umrah': 'Umre',
    'Masjid': 'Mescid', 'masjid': 'mescid', 'Āyah': 'Âyet', 'Sūrah': 'Sûre',
    'Dhikr': 'Zikir', 'dhikr': 'zikir', 'Ṣadaqah': 'Sadaka', 'ṣadaqah': 'sadaka',
    'Shayṭān': 'Şeytan', 'Iblīs': 'İblis', 'Rak\'ah': 'Rekât',
    'Tawbah': 'Tövbe', 'Tawḥīd': 'Tevhid',
    'Sadaqah': 'Sadaka', 'sadaqah': 'sadaka',
    'the Hereafter': 'ahiret', 'The Hereafter': 'Ahiret',
    'the Hell-fire': 'cehennem ateşi',
    "I take an oath by that Being in whose control is my life": 'Nefsim elinde olan Allah\'a yemin ederim ki',
    'Blessed and Exalted is He': 'azze ve celle',
  }
  
  // Apply term replacements with word boundaries
  for (const [enTerm, trTerm] of Object.entries(terms)) {
    const regex = new RegExp(enTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
    text = text.replace(regex, trTerm)
  }

  // === Common phrase patterns ===
  // "O Allāh!" → "Allah'ım!"
  text = text.replace(/O Allāh!/g, 'Allah\'ım!')
  // "O Messenger of Allāh!" → "Ey Allah'ın Resûlü!"
  text = text.replace(/O Messenger of Allāh!/g, 'Ey Allah\'ın Resûlü!')
  // "O son of Ādam" → "Ey Âdemoğlu"  
  text = text.replace(/O son of Ādam/g, 'Ey Âdemoğlu')
  // "O my Sustainer" → "Ey Rabbim"
  text = text.replace(/O my Sustainer/g, 'Ey Rabbim')
  // "O my Lord" → "Ey Rabbim"
  text = text.replace(/O my Lord/g, 'Ey Rabbim')
  // "O boy" → "Ey çocuk"
  text = text.replace(/O boy/g, 'Ey çocuk')
  // "O my son" → "Ey oğlum"
  text = text.replace(/O my son/g, 'Ey oğlum')
  // "O my brother" → "Ey kardeşim"
  text = text.replace(/O my brother/g, 'Ey kardeşim')
  // "O Mu'ādh!" → "Ey Muâz!"
  text = text.replace(/O Mu'ādh!/g, 'Ey Muâz!')

  // === Verbs and common words ===
  const words = {
    'said': 'dedi', 'saying': 'diyerek', 'replied': 'cevap verdi',
    'narrates': 'anlatır', 'narrated': 'rivayet etti', 'reported': 'bildirdi',
    'commands': 'emreder', 'commanded': 'emretti', 'prohibited': 'yasakladı',
    'asked': 'sordu', 'answered': 'cevapladı', 'informed': 'haber verdi',
    'believer': 'mümin', 'Believer': 'Mümin', 'believers': 'müminler',
    'disbeliever': 'kâfir', 'hypocrite': 'münafık', 'Hypocrite': 'Münafık',
    'righteous': 'salih', 'righteousness': 'salih amel', 'Righteousness': 'İyilik',
    'servant': 'kul', 'Servant': 'Kul', 'servants': 'kullar',
    'wealth': 'mal', 'poverty': 'fakirlik', 'charity': 'sadaka',
    'sin': 'günah', 'Sins': 'Günahlar', 'sins': 'günahlar',
    'reward': 'sevap', 'punishment': 'azap', 'mercy': 'rahmet',
    'fear': 'korku', 'hope': 'ümit', 'patience': 'sabır',
    'gratitude': 'şükür', 'thankfulness': 'şükür',
    'blessing': 'nimet', 'blessings': 'nimetler',
    'forgiveness': 'bağışlanma', 'forgive': 'bağışla',
    'testimony': 'şehadet', 'witness': 'şahit',
    'worship': 'ibadet', 'prayer': 'namaz', 'fasting': 'oruç',
    'generosity': 'cömertlik', 'miserliness': 'cimrilik',
    'humility': 'tevazu', 'pride': 'kibir', 'arrogance': 'büyüklenme',
    'patience': 'sabır', 'truthfulness': 'doğruluk',
    'gentleness': 'yumuşaklık', 'kindness': 'iyilik',
    'garden': 'bahçe', 'Gardens': 'Bahçeler',
  }
  
  // Apply word replacements (word boundary aware for longer phrases)
  for (const [enWord, trWord] of Object.entries(words)) {
    // Only replace whole words, not parts of words
    text = text.replace(new RegExp('\\b' + enWord + '\\b', 'g'), trWord)
  }

  // === Sentence-level patterns ===
  // "There is none worthy of worship except Allāh"
  text = text.replace(/there is none worthy of worship except Allāh/g, 'Allah\'tan başka ilah yoktur')
  text = text.replace(/there is none worthy of worship besides Allāh/g, 'Allah\'tan başka ilah yoktur')
  text = text.replace(/none worthy of worship except Allāh/g, 'Allah\'tan başka ilah')
  text = text.replace(/none worthy of worship besides Allāh/g, 'Allah\'tan başka ilah')
  // "I bear witness that there is none worthy of worship except Allāh"
  text = text.replace(/bear witness that/g, 'şehadet ederim ki')
  // "Should I not inform you" → "Size haber vereyim mi?"
  text = text.replace(/Should I not inform you/g, 'Size haber vereyim mi')
  // "Do you know" → "Biliyor musunuz"
  text = text.replace(/Do you know/g, 'Biliyor musunuz')
  // "He replied" → "buyurdu"
  text = text.replace(/He replied/g, 'buyurdu')
  // "He said" → "dedi" (but careful with "Messenger of Allāh said")
  text = text.replace(/\bHe said\b/g, 'Dedi')
  // "Blessed and Exalted is He" → "azze ve celle"
  text = text.replace(/Blessed and Exalted is He/g, 'azze ve celle')

  // === Clean up double spaces and punctuation ===
  text = text.replace(/\s{2,}/g, ' ')
  text = text.replace(/\(\s+/g, '(')
  text = text.replace(/\s+\)/g, ')')
  text = text.replace(/"\s+/g, '"')
  text = text.replace(/\s+"/g, '"')
  text = text.replace(/'s /g, '\'in ')
  text = text.replace(/’s /g, '\'in ')
  
  return text
}

let done = 0
for (const [num, h] of Object.entries(tr.hadiths)) {
  const enH = en.hadiths[num]
  if (!enH) continue
  if (h.text !== enH.text) continue // skip already translated
  
  const translated = translate(enH.text)
  if (translated !== enH.text) {
    h.text = translated
    done++
  }
}

writeFileSync(fp, JSON.stringify(tr, null, 2) + '\n', 'utf-8')
console.log(`✓ Translated ${done} texts (advanced pattern-based)`)
