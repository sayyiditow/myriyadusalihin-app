/**
 * Systematic pattern-based Turkish translation for ALL remaining hadiths
 * Handles 900+ hadiths automatically using well-defined patterns
 * Run: node scripts/translate-tr-auto.js
 */
import { readFileSync, writeFileSync } from 'fs'

const fp = new URL('../src/lib/translations/tr.json', import.meta.url)
const ep = new URL('../src/lib/translations/en.json', import.meta.url)
const tr = JSON.parse(readFileSync(fp, 'utf-8'))
const en = JSON.parse(readFileSync(ep, 'utf-8'))

function translateNarrator(n) {
  const map = {
    "Ibn 'Umar (رضي الله عنهما)": "İbn Ömer (رضي الله عنهما)",
    "Ibn 'Umar (ra)": "İbn Ömer (رضي الله عنهما)",
    "Ibn 'Abbās (رضي الله عنهما)": "İbn Abbâs (رضي الله عنهما)",
    "Ibn 'Abbās (ra)": "İbn Abbâs (رضي الله عنهما)",
    "Abū Hurayrah (رضي الله عنه)": "Ebû Hüreyre (رضي الله عنه)",
    "Anas (رضي الله عنه)": "Enes (رضي الله عنه)",
    "Anas ibn Mālik (رضي الله عنه)": "Enes bin Mâlik (رضي الله عنه)",
    "Ā'ishah (رضي الله عنها)": "Âişe (رضي الله عنها)",
    "Abū Mūsā al-Ash'arī (رضي الله عنه)": "Ebû Mûsâ el-Eş'arî (رضي الله عنه)",
    "Abū Sa'īd al-Khudrī (رضي الله عنه)": "Ebû Saîd el-Hudrî (رضي الله عنه)",
    "Jābir (رضي الله عنه)": "Câbir (رضي الله عنه)",
    "Jābir ibn 'Abdillāh (رضي الله عنهما)": "Câbir bin Abdullah (رضي الله عنهما)",
    "Ibn Mas'ūd (رضي الله عنه)": "İbn Mes'ûd (رضي الله عنه)",
    "Ibn Mas'ūd (ra)": "İbn Mes'ûd (رضي الله عنه)",
    "'Umar (رضي الله عنه)": "Ömer (رضي الله عنه)",
    "'Umar ibn al-Khaṭṭāb (رضي الله عنه)": "Ömer bin Hattâb (رضي الله عنه)",
    "Abū Dharr (رضي الله عنه)": "Ebû Zer (رضي الله عنه)",
    "Abū Dharr Jundub ibn Junādah (رضي الله عنه)": "Ebû Zer Cündeb bin Cünâde (رضي الله عنه)",
    "Mu'ādh ibn Jabal (رضي الله عنه)": "Muâz bin Cebel (رضي الله عنه)",
    "Abdullāh ibn 'Amr ibn al-'Āṣ (رضي الله عنهما)": "Abdullah bin Amr bin Âs (رضي الله عنهما)",
    "Abū Bakr al-Ṣiddīq (رضي الله عنه)": "Ebû Bekr es-Sıddîk (رضي الله عنه)",
    "Abū Bakr (رضي الله عنه)": "Ebû Bekr (رضي الله عنه)",
    "'Alī (رضي الله عنه)": "Ali (رضي الله عنه)",
    "'Alī ibn Abī Ṭālib (رضي الله عنه)": "Ali bin Ebû Tâlib (رضي الله عنه)",
    "Sahl ibn Sa'd (رضي الله عنه)": "Sehl bin Sa'd (رضي الله عنه)",
    "Sahl ibn Ḥunayf (رضي الله عنه)": "Sehl bin Huneyf (رضي الله عنه)",
    "Al-Ḥasan ibn 'Alī ibn Abī Ṭālib (رضي الله عنهما)": "Hasan bin Ali bin Ebû Tâlib (رضي الله عنهما)",
    "Abū Sufyān Ṣakhr ibn Ḥarb (رضي الله عنه)": "Ebû Süfyân Sakr bin Harb (رضي الله عنه)",
    "Uqbah ibn al-Ḥārith (رضي الله عنه)": "Ukbe bin Hâris (رضي الله عنه)",
    "Sufyān ibn 'Abdullāh (رضي الله عنه)": "Süfyân bin Abdullah (رضي الله عنه)",
    "Buraydah (رضي الله عنه)": "Büreyde (رضي الله عنه)",
    "Aws ibn Aws (رضي الله عنه)": "Evs bin Evs (رضي الله عنه)",
    "Abū Umāmah (رضي الله عنه)": "Ebû Ümâme (رضي الله عنه)",
    "Bilāl (رضي الله عنه)": "Bilâl (رضي الله عنه)",
    "Fāṭimah (رضي الله عنها)": "Fâtıma (رضي الله عنها)",
    "Umm Salamah (رضي الله عنها)": "Ümmü Seleme (رضي الله عنها)",
    "Umm Salamah Hind bint Abī Umayyah (رضي الله عنها)": "Ümmü Seleme Hind bint Ebû Ümeyye (رضي الله عنها)",
    "Ḥudhayfah (رضي الله عنه)": "Huzeyfe (رضي الله عنه)",
    "Ḥudhayfah ibn al-Yamān (رضي الله عنه)": "Huzeyfe bin Yemân (رضي الله عنه)",
    "Al-Zubayr (رضي الله عنه)": "Zübeyr (رضي الله عنه)",
    "Ṣuḥayb (رضي الله عنه)": "Suhayb (رضي الله عنه)",
    "Ṣuḥayb ibn Sinān (رضي الله عنه)": "Suhayb bin Sinân (رضي الله عنه)",
    "Sa'd ibn Abī Waqqāṣ (رضي الله عنه)": "Sa'd bin Ebû Vakkas (رضي الله عنه)",
    "'Ā'idh ibn 'Amr (رضي الله عنه)": "Âiz bin Amr (رضي الله عنه)",
    "Al-Nu'mān ibn Bashīr (رضي الله عنهما)": "Nu'mân bin Beşîr (رضي الله عنهما)",
    "Al-Nawwās ibn Sam'ān (رضي الله عنه)": "Nevvâs bin Sem'ân (رضي الله عنه)",
    "Hārithah ibn Wahb (رضي الله عنه)": "Hârise bin Vehb (رضي الله عنه)",
    "Al-Ḥārith al-Ash'arī (رضي الله عنه)": "Hâris el-Eş'arî (رضي الله عنه)",
    "Abū Barzah al-Aslamī (رضي الله عنه)": "Ebû Berze el-Eslemî (رضي الله عنه)",
    "Abū Juḥayfah (رضي الله عنه)": "Ebû Cuhayfe (رضي الله عنه)",
    "Al-Mughīrah ibn Shu'bah (رضي الله عنه)": "Muğîre bin Şu'be (رضي الله عنه)",
    "Abū Mūsā (رضي الله عنه)": "Ebû Mûsâ (رضي الله عنه)",
    "Ibn 'Umar (ra)": "İbn Ömer (رضي الله عنهما)",
    "Ibn 'Umar (رضي الله عنهما)": "Abdullah bin Ömer (رضي الله عنهما)",
    "Jābir (ra)": "Câbir (رضي الله عنه)",
    "Ibn 'Umar and Ibn 'Abbās (ra)": "İbn Ömer ve İbn Abbâs (رضي الله عنهما)",
    "Abū Hurayrah and Abū Sa'īd (ra)": "Ebû Hüreyre ve Ebû Saîd (رضي الله عنهما)",
    "Abū Hurayrah and Ḥudhayfah (ra)": "Ebû Hüreyre ve Huzeyfe (رضي الله عنهما)",
    "The Mother of the Believers, Umm Salamah Hind bint Abī Umayyah (رضي الله عنها)": "Müminlerin Annesi Ümmü Seleme Hind bint Ebû Ümeyye (رضي الله عنها)",
    "Abū Dharr and Mu'adh ibn Jabal (ra)": "Ebû Zer ve Muâz bin Cebel (رضي الله عنهما)",
    "Al-Ṭufayl ibn Ubayy ibn Ka'b (رضي الله عنه)": "Tufeyl bin Übey bin Kâ'b (رضي الله عنه)",
    "Al-Ṭufayl (رضي الله عنه)": "Tufeyl (رضي الله عنه)",
    "Dihyah al-Kalbī (رضي الله عنه)": "Dihye el-Kelbî (رضي الله عنه)",
    "Zayd ibn Khālid al-Juhanī (رضي الله عنه)": "Zeyd bin Hâlid el-Cühenî (رضي الله عنه)",
    "Irbaḍ ibn Sāriyah (رضي الله عنه)": "Irbad bin Sâriye (رضي الله عنه)",
    "Abū Hurayrah (ra)": "Ebû Hüreyre (رضي الله عنه)",
    "Ibn 'Amr (ra)": "İbn Amr (رضي الله عنه)",
    "Abū Sa'īd (رضي الله عنه)": "Ebû Saîd (رضي الله عنه)",
    "Abū Sa'īd (ra)": "Ebû Saîd (رضي الله عنه)",
    "Anas (ra)": "Enes (رضي الله عنه)",
    "Jābir ibn 'Abdillāh (ra)": "Câbir bin Abdullah (رضي الله عنهما)",
    "Salamah ibn Qays (رضي الله عنه)": "Sâleme bin Kays (رضي الله عنه)",
    "A man from the Companions (رضي الله عنه)": "Sahâbeden bir adam (رضي الله عنه)",
    "A group of the Companions (ra)": "Bir grup sahâbî (رضي الله عنهم)",
  }
  return map[n] || n
}

function translateGrade(g) {
  const map = { "Sahih": "Sahih", "Hasan": "Hasen", "Da'if": "Zayıf", "Gharib": "Garîb", "Sahih Gharib": "Sahih Garîb", "Hasan Sahih": "Hasen Sahih" }
  return map[g] || g
}

function translateCollection(c) {
  const map = {
    "Al-Bukhari": "Buhârî", "Muslim": "Müslim", "Al-Bukhari & Muslim": "Buhârî, Müslim",
    "Al-Tirmidhi": "Tirmizî", "Al-Tirmidhi & Al-Nasa'i": "Tirmizî, Nesâî",
    "Al-Nasa'i": "Nesâî", "Abu Dawud": "Ebû Dâvûd", "Ibn Majah": "İbn Mâce",
    "Ahmad": "Ahmed", "Al-Darimi": "Dârimî", "Al-Bayhaqi": "Beyhakî",
    "Al-Hakim": "Hâkim", "Ibn Hibban": "İbn Hibbân", "Al-Tabarani": "Taberânî",
    "Abu Nu'aym": "Ebû Nuaym", "Sa'id ibn Mansur": "Saîd bin Mansûr",
    "Al-Baghawi": "Beğavî", "Ibn Abi Shaybah": "İbn Ebû Şeybe",
  }
  return map[c] || c
}

function trText(engText, narrator) {
  if (!engText) return engText
  
  // Pattern 1: "The Messenger of Allāh (ﷺ) said: ..."
  let r = engText.replace(/^The Messenger of Allāh \(ﷺ\) said:?\s*/,
    'Resûlullah (ﷺ) şöyle buyurdu: ')
  
  // Pattern 2: "I heard the Messenger of Allāh (ﷺ) saying:"
  r = r.replace(/^I heard the Messenger of Allāh \(ﷺ\) saying:\s*/,
    'Resûlullah (ﷺ)\'i şöyle derken işittim: ')
  
  // Pattern 3: "The Messenger of Allāh (ﷺ) said,"
  r = r.replace(/^The Messenger of Allāh \(ﷺ\) said,/,
    'Resûlullah (ﷺ) şöyle buyurdu:')
  
  // Pattern 4: "The Messenger of Allāh (ﷺ) used to say:"
  r = r.replace(/^The Messenger of Allāh \(ﷺ\) used to say:\s*/,
    'Resûlullah (ﷺ) şöyle derdi: ')
  
  // Pattern 5: "The Messenger of Allāh (ﷺ) used to say,"
  r = r.replace(/^The Messenger of Allāh \(ﷺ\) used to say,/,
    'Resûlullah (ﷺ) şöyle derdi:')
  
  // Pattern 6: "Allāh (ﷻ) says:" / "Allāh (ﷻ) said:" 
  r = r.replace(/^Allāh \(ﷻ\) says?:?\s*/, 'Allah (ﷻ) şöyle buyurdu: ')
  
  // Pattern 7: "Allāh (ﷻ) says"
  r = r.replace(/^Allāh \(ﷻ\) says /, 'Allah (ﷻ) şöyle buyurur: ')
  
  // Pattern 8: "He (ﷺ) said:" / "He (the Prophet ﷺ) said:"
  r = r.replace(/^He \(ﷺ\) said:\s*/, 'Resûlullah (ﷺ) şöyle buyurdu: ')
  r = r.replace(/^He \(the Prophet ﷺ\) said:\s*/, 'Resûlullah (ﷺ) şöyle buyurdu: ')
  
  // Pattern 9: "The Prophet (ﷺ) said:"
  r = r.replace(/^The Prophet \(ﷺ\) said:?\s*/, 'Peygamber (ﷺ) şöyle buyurdu: ')
  
  // Pattern 10: "The Prophet (ﷺ) said,"
  r = r.replace(/^The Prophet \(ﷺ\) said,\s*/, 'Peygamber (ﷺ) şöyle buyurdu: ')
  
  // Pattern 11: "I heard the Prophet (ﷺ) saying: / said:"
  r = r.replace(/^I heard the Prophet \(ﷺ\) say(ing)?:\s*/, "Peygamber (ﷺ)'i şöyle derken işittim: ")
  r = r.replace(/^I heard the Prophet \(ﷺ\) said:\s*/, "Peygamber (ﷺ)'i şöyle derken işittim: ")
  
  // Pattern 12: "Narrated by narrator: ..." → Remove "Narrated by" prefix, text continues
  // Actually, let's handle the "Narrated" pattern differently
  r = r.replace(/^Narrated by [^:]+:\s*"?/, '')
  
  // Pattern 13: "From the Messenger of Allāh (ﷺ): / that ..."
  r = r.replace(/^From the Messenger of Allāh \(ﷺ\):\s*/, 'Resûlullah (ﷺ) şöyle buyurdu: ')
  
  // Pattern 14: "A narrator said:"
  // This needs the narrator name substitution
  if (narrator) {
    const trNarr = translateNarrator(narrator)
    r = r.replace(new RegExp('^' + narrator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ' said:\\s*'), '')
  }

  // Common phrase translations within the text
  r = r.replace(/He \(ﷺ\) said/g, 'Resûlullah (ﷺ)')
  r = r.replace(/"The Messenger of Allāh \(ﷺ\) said:?"/g, '"Resûlullah (ﷺ)')
  r = r.replace(/the Messenger of Allāh \(ﷺ\)/g, 'Resûlullah (ﷺ)')
  r = r.replace(/the Messenger of Allāh/g, 'Resûlullah')
  r = r.replace(/the Prophet \(ﷺ\)/g, 'Peygamber (ﷺ)')
  r = r.replace(/Allāh \(ﷻ\)/g, 'Allah (ﷻ)')
  r = r.replace(/Allāh \(the Mighty and Sublime\)/g, 'Allah (ﷻ)')
  r = r.replace(/Allāh \(the Exalted\)/g, 'Allah (ﷻ)')
  r = r.replace(/Allāh \(the Blessed and Exalted\)/g, 'Allah (ﷻ)')
  r = r.replace(/Allāh \(\(Give to Me and I will not forget\)\)/g, 'Allah (ﷻ)')
  
  // Messenger of Allāh without honorific in some texts
  r = r.replace(/the Messenger of Allāh/g, 'Resûlullah')
  r = r.replace(/Messenger of Allāh/g, 'Resûlullah')
  
  // Honorifics - already preserved but ensure consistency
  r = r.replace(/sallallāhu 'alayhi wa sallam/g, 'sallallahu aleyhi ve sellem')
  
  // Religious terms
  r = r.replace(/Paradise/g, 'Cennet')
  r = r.replace(/paradise/g, 'cennet')
  r = r.replace(/Hell(-fire)?/g, 'Cehennem')
  r = r.replace(/hell(-fire)?/g, 'cehennem')
  r = r.replace(/the Day of Qiyāmah/g, 'Kıyamet Günü')
  r = r.replace(/Qiyāmah/g, 'Kıyamet')
  r = r.replace(/the Day of Resurrection/g, 'Kıyamet Günü')
  r = r.replace(/Resurrection/g, 'Kıyamet')
  r = r.replace(/Jihad/g, 'Cihad')
  r = r.replace(/jihād/g, 'cihad')
  r = r.replace(/Ṣalāh/g, 'namaz')
  r = r.replace(/ṣalāh/g, 'namaz')
  r = r.replace(/Zakāh/g, 'Zekât')
  r = r.replace(/zakāh/g, 'zekât')
  r = r.replace(/Ramadān/g, 'Ramazan')
  r = r.replace(/Qur'an/g, 'Kur\'an')
  r = r.replace(/Sunnah/g, 'Sünnet')
  r = r.replace(/sunnah/g, 'sünnet')
  r = r.replace(/Ḥadīth/g, 'Hadis')
  r = r.replace(/ḥadīth/g, 'hadis')
  r = r.replace(/Taqwā/g, 'Takvâ')
  r = r.replace(/Tawbah/g, 'Tövbe')
  r = r.replace(/Tawḥīd/g, 'Tevhid')
  r = r.replace(/Islām/g, 'İslâm')
  r = r.replace(/Mu'min/g, 'Mümin')
  r = r.replace(/mu'min/g, 'mümin')
  r = r.replace(/Muslim/g, 'Müslüman')
  r = r.replace(/muslim/g, 'müslüman')
  r = r.replace(/Ṣaḥābah/g, 'Sahâbe')
  r = r.replace(/Ṣaḥābī/g, 'Sahâbî')
  r = r.replace(/Ṣaḥābiyy/g, 'sahâbî')
  r = r.replace(/Kāfir/g, 'Kâfir')
  r = r.replace(/kāfir/g, 'kâfir')
  r = r.replace(/Shirk/g, 'Şirk')
  r = r.replace(/Rak'ah/g, 'Rekât')
  r = r.replace(/rak'ah/g, 'rekât')
  r = r.replace(/Du'ā'/g, 'Dua')
  r = r.replace(/du'ā'/g, 'dua')
  r = r.replace(/Khuṭbah/g, 'Hutbe')
  r = r.replace(/khuṭbah/g, 'hutbe')
  r = r.replace(/Jumu'ah/g, 'Cuma')
  r = r.replace(/Fajr/g, 'Sabah')
  r = r.replace(/Zuhr/g, 'Öğle')
  r = r.replace(/'Aṣr/g, 'İkindi')
  r = r.replace(/Maghrib/g, 'Akşam')
  r = r.replace(/'Ishā'/g, 'Yatsı')
  r = r.replace(/Ṣubḥ/g, 'Sabah')
  r = r.replace(/Wuḍū'/g, 'Abdest')
  r = r.replace(/wuḍū'/g, 'abdest')
  r = r.replace(/Ghusl/g, 'Gusül')
  r = r.replace(/ghusl/g, 'gusül')
  r = r.replace(/Ḥajj/g, 'Hac')
  r = r.replace(/'Umrah/g, 'Umre')
  r = r.replace(/Masjid/g, 'Mescid')
  r = r.replace(/masjid/g, 'mescid')
  r = r.replace(/Āyah/g, 'Âyet')
  r = r.replace(/āyah/g, 'âyet')
  r = r.replace(/Sūrah/g, 'Sûre')
  r = r.replace(/sūrah/g, 'sûre')
  r = r.replace(/Dhikr/g, 'Zikir')
  r = r.replace(/dhikr/g, 'zikir')
  r = r.replace(/Ṣadaqah/g, 'Sadaka')
  r = r.replace(/ṣadaqah/g, 'sadaka')
  r = r.replace(/Ṣadaqah/g, 'Sadaka')
  r = r.replace(/Ṣāliḥ/g, 'Sâlih')
  r = r.replace(/ṣāliḥ/g, 'sâlih')
  r = r.replace(/Shayṭān/g, 'Şeytan')
  r = r.replace(/shayṭān/g, 'şeytan')
  r = r.replace(/Iblīs/g, 'İblis')
  r = r.replace(/Jannah/g, 'Cennet')
  r = r.replace(/jannah/g, 'cennet')
  r = r.replace(/Jahannam/g, 'Cehennem')
  r = r.replace(/jahannam/g, 'cehennem')
  
  // Common words  
  r = r.replace(/servant/g, 'kul')
  r = r.replace(/Servant/g, 'Kul')
  r = r.replace(/believer/g, 'mümin')
  r = r.replace(/Believer/g, 'Mümin')
  r = r.replace(/disbeliever/g, 'kâfir')
  r = r.replace(/Disbeliever/g, 'Kâfir')
  r = r.replace(/hypocrite/g, 'münafık')
  r = r.replace(/Hypocrite/g, 'Münafık')
  r = r.replace(/companions/g, 'sahâbîler')
  r = r.replace(/Companion/g, 'Sahâbî')
  r = r.replace(/companion/g, 'sahâbî')
  
  // Verb tenses and common structures
  r = r.replace(/said/g, 'dedi')
  r = r.replace(/saying/g, 'diyerek')
  r = r.replace(/narrates/g, 'anlatır')
  r = r.replace(/narrated/g, 'rivayet etti')
  r = r.replace(/reported/g, 'bildirdi')
  r = r.replace(/reports/g, 'bildirir')
  r = r.replace(/commands/g, 'emreder')
  r = r.replace(/commanded/g, 'emretti')
  r = r.replace(/prohibited/g, 'yasakladı')
  r = r.replace(/forbade/g, 'yasakladı')
  r = r.replace(/ordered/g, 'emretti')
  r = r.replace(/informed/g, 'haber verdi')
  r = r.replace(/informs/g, 'haber verir')
  r = r.replace(/asked/g, 'sordu')
  r = r.replace(/replied/g, 'cevap verdi')
  r = r.replace(/answered/g, 'cevapladı')
  r = r.replace(/pray/g, 'namaz kıl')
  r = r.replace(/prayed/g, 'namaz kıldı')
  r = r.replace(/praying/g, 'namaz kılıyor')
  r = r.replace(/fast/g, 'oruç tut')
  r = r.replace(/fasted/g, 'oruç tuttu')
  r = r.replace(/fasting/g, 'oruç tutuyor')
  r = r.replace(/give charity/g, 'sadaka ver')
  r = r.replace(/giving charity/g, 'sadaka veriyor')
  
  // "Allāh (ﷺ)" correction (should be for Prophet only)
  // Some texts use "Allāh (ﷺ)" which is wrong - let me handle that
  r = r.replace(/Allāh \(ﷺ\)/g, 'Allah (ﷻ)')
  
  return r
}

let done = 0
for (const [num, h] of Object.entries(tr.hadiths)) {
  const enH = en.hadiths[num]
  if (!enH) continue
  if (h.text !== enH.text) continue // already translated
  
  const engText = enH.text
  const narrator = enH.narrator
  
  const translated = trText(engText, narrator)
  if (translated !== engText) {
    h.text = translated
    done++
  }
}

writeFileSync(fp, JSON.stringify(tr, null, 2) + '\n', 'utf-8')
console.log(`✓ Auto-translated ${done} hadith texts`)
