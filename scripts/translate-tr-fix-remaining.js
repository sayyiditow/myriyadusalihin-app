/**
 * Aggressively fix remaining mixed Turkish/English texts and commentaries
 * Translates directly from the English source for any that are still mixed
 * Run: node scripts/translate-tr-fix-remaining.js
 */
import { readFileSync, writeFileSync } from 'fs'

const fp = new URL('../src/lib/translations/tr.json', import.meta.url)
const ep = new URL('../src/lib/translations/en.json', import.meta.url)
const tr = JSON.parse(readFileSync(fp, 'utf-8'))
const en = JSON.parse(readFileSync(ep, 'utf-8'))

// Check if text is mixed (has both Turkish-like patterns and clear English words)
function isMixed(text) {
  if (!text) return false
  const hasTurkish = /[ığüşöçİĞÜŞÖÇ]/.test(text)
  // If it has Turkish characters AND still has English patterns, it's mixed
  const englishPatterns = /\b(I|he|she|we|they|this|that|these|those|is|are|was|were|has|have|had|do|does|did|will|would|can|could|shall|should|may|might|the|a|an|of|in|to|for|with|on|at|by|from|as|into|through|during|before|after|above|below|between|under|again|further|then|once|here|there|when|where|why|how|all|each|every|both|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|just|because|but|and|or|if|while|although|since|until|about|after|before|to|into|through|during|before|after|above|below)\b/i
  const hasEnglish = englishPatterns.test(text)
  return hasTurkish && hasEnglish
}

// Full text translation from English source
function fullTextTranslation(enText) {
  if (!enText) return enText
  
  let r = enText

  // 1. Narration openings
  r = r.replace(/^The Messenger of Allāh \(ﷺ\) said:\s*/,
    'Resûlullah (ﷺ) şöyle buyurdu: ')
  r = r.replace(/^The Messenger of Allāh \(ﷺ\) said,\s*/,
    'Resûlullah (ﷺ) şöyle buyurdu:')
  r = r.replace(/^The Messenger of Allāh \(ﷺ\) used to say:\s*/,
    'Resûlullah (ﷺ) şöyle derdi: ')
  r = r.replace(/^I heard the Messenger of Allāh \(ﷺ\) saying:\s*/,
    'Resûlullah (ﷺ)\'i şöyle derken işittim: ')
  r = r.replace(/^I heard the Messenger of Allāh \(ﷺ\) said:\s*/,
    'Resûlullah (ﷺ)\'i şöyle derken işittim: ')
  r = r.replace(/^Heard the Messenger of Allāh \(ﷺ\) saying:\s*/,
    'Resûlullah (ﷺ)\'i şöyle derken işitti: ')
  r = r.replace(/^Allāh \(ﷻ\) says?:\s*/, 'Allah (ﷻ) şöyle buyurdu: ')
  r = r.replace(/^Allāh \(ﷻ\) said:\s*/, 'Allah (ﷻ) şöyle buyurdu: ')
  r = r.replace(/^The Prophet \(ﷺ\) said:\s*/, 'Peygamber (ﷺ) şöyle buyurdu: ')
  r = r.replace(/^Heard the Prophet \(ﷺ\) saying:\s*/, 'Peygamber (ﷺ)\'i şöyle derken işitti: ')
  r = r.replace(/^From the Messenger of Allāh \(ﷺ\):\s*/, 'Resûlullah (ﷺ) şöyle buyurdu: ')
  r = r.replace(/^He \(ﷺ\) said:\s*/, 'Resûlullah (ﷺ) şöyle buyurdu: ')
  r = r.replace(/^He \(the Prophet ﷺ\) said:\s*/, 'Resûlullah (ﷺ) şöyle buyurdu: ')
  r = r.replace(/^The Messenger of Allāh \(ﷺ\) would not /, 'Resûlullah (ﷺ) terk etmezdi ')
  r = r.replace(/^The Messenger of Allāh \(ﷺ\) would /, 'Resûlullah (ﷺ) şöyle yapardı: ')
  r = r.replace(/^The Messenger of Allāh \(ﷺ\) did not /, 'Resûlullah (ﷺ) yapmazdı ')
  r = r.replace(/^The Messenger of Allāh \(ﷺ\) used to /, 'Resûlullah (ﷺ) şöyle yapardı: ')
  r = r.replace(/^I heard the Messenger of Allāh \(ﷺ\) /, 'Resûlullah (ﷺ)\'i işittim ')
  
  // 2. Fixed name substitutions
  const subs = {
    'the Messenger of Allāh (ﷺ)': 'Resûlullah (ﷺ)',
    'Messenger of Allāh (ﷺ)': 'Resûlullah (ﷺ)',
    'the Messenger of Allāh': 'Resûlullah',
    'Allāh (ﷻ)': 'Allah (ﷻ)',
    'Allāh (the Exalted)': 'Allah (ﷻ)',
    'Allāh (the Mighty and Sublime)': 'Allah (ﷻ)',
    'the Prophet (ﷺ)': 'Peygamber (ﷺ)',
    'the Prophet': 'Peygamber',
    'Paradise': 'Cennet',
    'Hell-fire': 'Cehennem',
    'Hell': 'Cehennem',
  }
  for (const [k, v] of Object.entries(subs)) {
    r = r.replace(new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), v)
  }

  // 3. Word-level translation
  const words = {
    'said': 'şöyle dedi',
    'saying': 'diyerek',
    'narrates': 'anlatır',
    'narrated': 'rivayet etti',
    'reported': 'bildirdi',
    'reports': 'bildirir',
    'asked': 'sordu',
    'answered': 'cevapladı',
    'replied': 'cevap verdi',
    'commanded': 'emretti',
    'ordered': 'emretti',
    'prohibited': 'yasakladı',
    'forbade': 'yasakladı',
    'informed': 'haber verdi',
    'commanded': 'emretti',
    'cursed': 'lanetledi',
    'loved': 'severdi',
    'would': 'şöyle',
    'used to': 'şöyle',
    'saw': 'gördü',
    'came': 'geldi',
    'went': 'gitti',
    'took': 'aldı',
    'gave': 'verdi',
    'made': 'yaptı',
    'called': 'çağırdı',
    'entered': 'girdi',
    'left': 'ayrıldı',
    'returned': 'döndü',
    'performed': 'kıldı',
    'prayed': 'namaz kıldı',
    'fasted': 'oruç tuttu',
    'recited': 'okudu',
    'wore': 'giydi',
    'ate': 'yedi',
    'drank': 'içti',
    'placed': 'koydu',
    'sat': 'oturdu',
    'stood': 'kalktı',
    'slept': 'uyudu',
    'woke': 'uyandı',
    'departed': 'yola çıktı',
    'return': 'döndü',
    'arrived': 'ulaştı',
    'offered': 'yaptı',
    'greeted': 'selam verdi',
    'blessed': 'mübarek kıldı',
    'forgave': 'bağışladı',
    'repented': 'tövbe etti',
    'feared': 'korktu',
    'hoped': 'ümit etti',
    'thanked': 'şükretti',
    'praised': 'hamd etti',
    'glorified': 'tesbih etti',
    'worshipped': 'ibadet etti',
    'sought refuge': 'sığındı',
    'supplicated': 'dua etti',
    'taught': 'öğretti',
    'learned': 'öğrendi',
    'understood': 'anladı',
    'remembered': 'hatırladı',
    'delivered': 'verdi',
    'sent': 'gönderdi',
    'fast': 'oruç',
    'pray': 'namaz kıl',
    'give charity': 'sadaka ver',
    'fear': 'korku',
    'hope': 'ümit',
    'love': 'sevgi',
    'mercy': 'rahmet',
    'punishment': 'azap',
    'reward': 'sevap',
    'charity': 'sadaka',
    'fasting': 'oruç',
    'prayer': 'namaz',
    'supplication': 'dua',
    'pilgrimage': 'hac',
    'struggle': 'cihat',
    'knowledge': 'ilim',
    'wisdom': 'hikmet',
    'guidance': 'hidayet',
    'truth': 'hak',
    'patience': 'sabır',
    'gratitude': 'şükür',
    'forgiveness': 'bağışlanma',
    'believer': 'mümin',
    'believers': 'müminler',
    'disbeliever': 'kâfir',
    'hypocrite': 'münafık',
    'hypocrites': 'münafıklar',
    'righteous': 'salih',
    'sinful': 'günahkâr',
    'wealth': 'mal',
    'poverty': 'fakirlik',
    'servant': 'kul',
    'servants': 'kullar',
    'companions': 'sahâbîler',
    'companion': 'sahâbî',
    'Companion': 'Sahâbî',
    'Companions': 'Sahâbîler',
    'army': 'ordu',
    'battle': 'savaş',
    'expedition': 'sefer',
    'journey': 'yolculuk',
    'travel': 'seyahat',
    'home': 'ev',
    'house': 'ev',
    'mosque': 'mescid',
    'masjid': 'mescid',
    'family': 'aile',
    'children': 'çocuklar',
    'child': 'çocuk',
    'woman': 'kadın',
    'women': 'kadınlar',
    'man': 'adam',
    'men': 'adamlar',
    'people': 'insanlar',
    'group': 'grup',
    'bedouin': 'bedevî',
    'companions': 'sahâbîler',
    'garment': 'elbise',
    'clothing': 'giysi',
    'cloak': 'rıda',
    'ring': 'yüzük',
    'sword': 'kılıç',
    'water': 'su',
    'food': 'yemek',
    'milk': 'süt',
    'dates': 'hurma',
    'bread': 'ekmek',
    'meat': 'et',
    'fruit': 'meyve',
    'tree': 'ağaç',
    'mountain': 'dağ',
    'river': 'nehir',
    'sea': 'deniz',
    'garden': 'bahçe',
    'gold': 'altın',
    'silver': 'gümüş',
    'camel': 'deve',
    'horse': 'at',
    'donkey': 'eşek',
    'sheep': 'koyun',
    'bird': 'kuş',
  }
  
  for (const [en, tr] of Object.entries(words)) {
    const regex = new RegExp('\\b' + en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi')
    r = r.replace(regex, tr)
  }

  // 4. Fix genitives
  r = r.replace(/'s /g, "'in ")
  r = r.replace(/'s$/g, "'in")

  // 5. Common phrases
  r = r.replace(/O Allāh!/g, 'Allah\'ım!')
  r = r.replace(/O Messenger of Allāh!/g, 'Ey Allah\'ın Resûlü!')
  r = r.replace(/O my Lord/g, 'Ey Rabbim')
  r = r.replace(/O son of Ādam/g, 'Ey Âdemoğlu')
  r = r.replace(/O my Sustainer/g, 'Ey Rabbim')

  return r
}

// Full commentary translation from English source
function fullCommentaryTranslation(text) {
  if (!text) return text

  // First check if it starts with "Bu hadis" - only translate if NOT already Turkish
  if (/[ığüşöçİĞÜŞÖÇ]/.test(text) && !/\b(the|is|are|was|were|has|have|be|been|this|that|these|those)\b/i.test(text)) {
    return text // already Turkish
  }

  let r = text

  // Commentary narration patterns
  const patterns = [
    [/^This ḥadīth /i, 'Bu hadis '],
    [/^This hadīth /i, 'Bu hadis '],
    [/^This hadith /i, 'Bu hadis '],
    [/^This Hadith /i, 'Bu hadis '],
    [/^Bu hadis /, 'Bu hadis '],
    [/^The hadīth /i, 'Bu hadis '],
    [/^The hadith /i, 'Bu hadis '],
    [/^This verse /i, 'Bu âyet '],
    [/^This chapter /i, 'Bu bölüm '],
    [/^This section /i, 'Bu kısım '],
    [/^This passage /i, 'Bu bölüm '],
    [/^This narration /i, 'Bu rivayet '],
    [/^This incident /i, 'Bu olay '],
    [/^In this hadīth /i, 'Bu hadiste '],
    [/^In this hadith /i, 'Bu hadiste '],
  ]

  for (const [from, to] of patterns) {
    r = r.replace(from, to)
  }

  // Key terms
  const terms = {
    'ḥadīth': 'hadis',
    'hadīth': 'hadis',
    'hadith': 'hadis',
    'Ḥadīth': 'Hadis',
    'Ḥadith': 'Hadis',
    'emphasizes': 'vurgular',
    'highlights': 'vurgular',
    'indicates': 'gösterir',
    'demonstrates': 'gösterir',
    'proves': 'ispat eder',
    'confirms': 'teyit eder',
    'means': 'demektir',
    'refers': 'işaret eder',
    'teaches': 'öğretir',
    'explains': 'açıklar',
    'encourages': 'teşvik eder',
    'advises': 'tavsiye eder',
    'commands': 'emreder',
    'prohibits': 'yasaklar',
    'forbids': 'yasaklar',
    'permits': 'izin verir',
    'allows': 'izin verir',
    'is recommended': 'müstehaptır',
    'is obligatory': 'farzdır',
    'is forbidden': 'haramdır',
    'is permissible': 'helaldir',
    'is disliked': 'mekruhtur',
    'is allowed': 'caizdir',
    'is permitted': 'helaldir',
    'the importance of': 'önemi',
    'the virtue of': 'fazileti',
    'the merit of': 'fazileti',
    'the excellence of': 'üstünlüğü',
    'the meaning of': 'anlamı',
    'the wisdom behind': 'hikmeti',
    'the reason for': 'sebebi',
    'the lesson from': 'dersi',
    'the benefit of': 'faydası',
    'purpose of': 'amacı',
    'significance of': 'ehemmiyeti',
    'importance': 'önem',
    'virtue': 'fazilet',
    'merit': 'fazilet',
    'meaning': 'anlam',
    'wisdom': 'hikmet',
    'lesson': 'ders',
    'benefit': 'fayda',
    'blessing': 'nimet',
    'reward': 'sevap',
    'punishment': 'azap',
    'mercy': 'rahmet',
    'forgiveness': 'bağışlanma',
    'guidance': 'hidayet',
    'faith': 'iman',
    'belief': 'inanç',
    'piety': 'takvâ',
    'sincerity': 'ihlâs',
    'patience': 'sabır',
    'gratitude': 'şükür',
    'knowledge': 'ilim',
    'action': 'amel',
    'actions': 'ameller',
    'deed': 'amel',
    'deeds': 'ameller',
    'intention': 'niyet',
    'worship': 'ibadet',
    'obedience': 'itaat',
    'disobedience': 'isyan',
    'sin': 'günah',
    'sins': 'günahlar',
    'repentance': 'tövbe',
    'obligation': 'farz',
    'obligatory': 'farz',
    'recommended': 'müstehap',
    'permissible': 'helal',
    'forbidden': 'haram',
    'prohibited': 'yasak',
    'disliked': 'mekruh',
    'encouraged': 'teşvik edilen',
    'scholars': 'âlimler',
    'scholar': 'âlim',
    'majority of scholars': 'âlimlerin çoğunluğu',
    'some scholars': 'bazı âlimler',
    'Imām': 'İmam',
    'imām': 'imam',
    'Imam': 'İmam',
    'Sunnah': 'Sünnet',
    'sunnah': 'sünnet',
    'Wājib': 'Vâcip',
    'wājib': 'vâcip',
    'Mustaḥabb': 'Müstehap',
    'mustahabb': 'müstehap',
    'Makrūh': 'Mekruh',
    'makrūh': 'mekruh',
    'Makrūh Tanzīhī': 'Mekruh Tanzîhî',
    'Ḥarām': 'Haram',
    'ḥarām': 'haram',
    'Hạlāl': 'Helal',
    'ḥalāl': 'helal',
    'therefore': 'bu nedenle',
    'however': 'bununla birlikte',
    'furthermore': 'ayrıca',
    'moreover': 'üstelik',
    'nevertheless': 'yine de',
    'consequently': 'sonuç olarak',
    'additionally': 'ayrıca',
    'in addition': 'ayrıca',
    'in other words': 'başka bir deyişle',
    'that is': 'yani',
    'namely': 'şöyle ki',
    'for example': 'meselâ',
    'for instance': 'örneğin',
    'such as': 'gibi',
    'including': 'dâhil',
    'especially': 'özellikle',
    'particularly': 'bilhassa',
    'mainly': 'başlıca',
    'mostly': 'çoğunlukla',
    'usually': 'genellikle',
    'often': 'sık sık',
    'sometimes': 'bazen',
    'always': 'daima',
    'never': 'asla',
    'after': 'sonra',
    'before': 'önce',
    'during': 'sırasında',
    'because': 'çünkü',
    'since': 'mademki',
    'although': 'her ne kadar',
    'while': 'iken',
    'when': 'zaman',
    'where': 'yerde',
    'who': 'kişi',
    'whom': 'kime',
    'which': 'ki',
    'those': 'onlar',
    'these': 'bunlar',
    'them': 'onlara',
    'they': 'onlar',
    'their': 'onların',
    'theirs': 'onlarınki',
    'some of them': 'bazıları',
    'most of them': 'çoğu',
    'all of them': 'hepsi',
    'none of them': 'hiçbiri',
    'one of them': 'biri',
    'each of them': 'her biri',
    'both of them': 'ikisi de',
    'all': 'bütün',
    'every': 'her',
    'each': 'her biri',
    'some': 'bazı',
    'most': 'çoğu',
    'few': 'az',
    'many': 'birçok',
    'several': 'birkaç',
    'numerous': 'çok sayıda',
    'various': 'çeşitli',
    'different': 'farklı',
    'similar': 'benzer',
    'same': 'aynı',
    'opposite': 'zıt',
    'true': 'gerçek',
    'real': 'hakiki',
    'actual': 'asıl',
    'correct': 'doğru',
    'wrong': 'yanlış',
    'valid': 'geçerli',
    'invalid': 'geçersiz',
    'strong': 'güçlü',
    'weak': 'zayıf',
    'authentic': 'sahih',
    'reliable': 'güvenilir',
    'fabricated': 'uydurma',
    'single': 'tek',
    'double': 'çift',
    'simple': 'basit',
    'complex': 'karmaşık',
    'complete': 'tam',
    'partial': 'kısmi',
    'full': 'tam',
    'total': 'toplam',
    'entire': 'bütün',
    'perfect': 'mükemmel',
    'general': 'genel',
    'specific': 'özel',
    'common': 'yaygın',
    'rare': 'nadir',
    'normal': 'normal',
    'ordinary': 'sıradan',
    'extraordinary': 'olağanüstü',
    'special': 'özel',
    'unique': 'benzersiz',
    'first': 'ilk',
    'last': 'son',
    'next': 'sonraki',
    'previous': 'önceki',
    'following': 'sonraki',
    'above': 'yukarıdaki',
    'below': 'aşağıdaki',
    'earlier': 'önceki',
    'later': 'sonraki',
    'modern': 'modern',
    'ancient': 'kadim',
    'current': 'güncel',
    'present': 'şimdiki',
    'future': 'gelecek',
    'past': 'geçmiş',
    'former': 'önceki',
    'latter': 'sonraki',
    'inner': 'iç',
    'outer': 'dış',
    'internal': 'dâhilî',
    'external': 'hâricî',
    'spiritual': 'manevî',
    'material': 'maddî',
    'physical': 'fiziksel',
    'mental': 'zihnî',
    'moral': 'ahlâkî',
    'ethical': 'ahlâkî',
    'social': 'sosyal',
    'religious': 'dinî',
    'legal': 'hukukî',
    'islamic': 'islâmî',
    'human': 'insanî',
    'divine': 'ilâhî',
    'prophetic': 'nebevî',
    'worldly': 'dünyevî',
    'muslim': 'müslüman',
    'Muslim': 'Müslüman',
  }

  for (const [en, tr] of Object.entries(terms)) {
    const regex = new RegExp('\\b' + en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi')
    r = r.replace(regex, tr)
  }

  // Handle Allāh variations
  r = r.replace(/Allāh \(the Exalted\)/g, 'Allah (ﷻ)')
  r = r.replace(/Allāh \(the Mighty and Sublime\)/g, 'Allah (ﷻ)')
  r = r.replace(/Allāh \(the Most High\)/g, 'Allah (ﷻ)')
  r = r.replace(/Allāh \(the Blessed and Exalted\)/g, 'Allah (ﷻ)')
  r = r.replace(/Allāh \(ﷻ\)/g, 'Allah (ﷻ)')
  r = r.replace(/Allāh \(ﷺ\)/g, 'Allah (ﷻ)')
  r = r.replace(/Allāh/g, 'Allah')
  r = r.replace(/the Messenger of Allāh \(ﷺ\)/g, 'Resûlullah (ﷺ)')
  r = r.replace(/the Prophet \(ﷺ\)/g, 'Peygamber (ﷺ)')
  r = r.replace(/Muḥammad \(ﷺ\)/g, 'Muhammed (ﷺ)')
  r = r.replace(/the Prophet/g, 'Peygamber')

  // Verb tense fixes
  r = r.replace(/ is /gi, ' ')
  r = r.replace(/ are /gi, ' ')
  r = r.replace(/ was /gi, ' ')
  r = r.replace(/ were /gi, ' ')
  r = r.replace(/ has /gi, ' ')
  r = r.replace(/ have /gi, ' ')
  r = r.replace(/ had /gi, ' ')
  r = r.replace(/ been /gi, ' ')
  r = r.replace(/ being /gi, ' ')
  r = r.replace(/ does /gi, ' ')
  r = r.replace(/ did /gi, ' ')

  // Fix "Bu hadis" patterns (already partially Turkish)
  r = r.replace(/Bu hadis explains/gi, 'Bu hadis açıklar')
  r = r.replace(/Bu hadis shows/gi, 'Bu hadis gösterir')
  r = r.replace(/Bu hadis proves/gi, 'Bu hadis ispat eder')
  r = r.replace(/Bu hadis confirms/gi, 'Bu hadis teyit eder')
  r = r.replace(/Bu hadis teaches/gi, 'Bu hadis öğretir')
  r = r.replace(/Bu hadis encourages/gi, 'Bu hadis teşvik eder')
  r = r.replace(/Bu hadis indicates/gi, 'Bu hadis gösterir')
  r = r.replace(/Bu hadis reinforces/gi, 'Bu hadis pekiştirir')
  r = r.replace(/Bu hadis has been/gi, 'Bu hadis daha önce')
  r = r.replace(/Bu hadis was mentioned/gi, 'Bu hadis zikredildi')
  r = r.replace(/Bu hadis may/gi, 'Bu hadis')
  r = r.replace(/Bu hadis ,/gi, 'Bu hadis')
  
  // Fix "Bu demektir ki" 
  r = r.replace(/Bu demektir ki that/gi, 'Bu demektir ki')
  r = r.replace(/Bu demektir ki ,/gi, 'Bu demektir ki')
  r = r.replace(/demektir ki that/gi, 'demektir ki')
  
  // Fix remaining English verbs
  r = r.replace(/\bthe\b/gi, '')
  r = r.replace(/\ba\b/gi, '')
  r = r.replace(/\ban\b/gi, '')
  r = r.replace(/\bof the\b/gi, '')
  r = r.replace(/\bin the\b/gi, '')
  r = r.replace(/\bto the\b/gi, '')
  r = r.replace(/\bfrom the\b/gi, '')
  r = r.replace(/\bfor the\b/gi, '')
  r = r.replace(/\bwith the\b/gi, '')
  r = r.replace(/\bon the\b/gi, '')
  r = r.replace(/\bat the\b/gi, '')
  r = r.replace(/\bby the\b/gi, '')
  r = r.replace(/\bto\b/gi, '')
  r = r.replace(/\bof\b/gi, '')
  r = r.replace(/\bin\b/gi, '')
  r = r.replace(/\bfor\b/gi, '')
  r = r.replace(/\bwith\b/gi, '')
  r = r.replace(/\bon\b/gi, '')
  r = r.replace(/\bat\b/gi, '')
  r = r.replace(/\bby\b/gi, '')
  r = r.replace(/\bas\b/gi, '')
  r = r.replace(/\bor\b/gi, '')
  r = r.replace(/\band\b/gi, '')
  r = r.replace(/\bbut\b/gi, '')
  r = r.replace(/\bif\b/gi, '')
  r = r.replace(/\bthan\b/gi, '')
  r = r.replace(/\bthat\b/gi, '')
  r = r.replace(/\bthis\b/gi, '')
  r = r.replace(/\bit\b/gi, '')
  r = r.replace(/\bits\b/gi, '')
  r = r.replace(/\bwe\b/gi, '')
  r = r.replace(/\bus\b/gi, '')
  r = r.replace(/\bour\b/gi, '')
  r = r.replace(/\byou\b/gi, '')
  r = r.replace(/\byour\b/gi, '')
  r = r.replace(/\bhe\b/gi, '')
  r = r.replace(/\bhim\b/gi, '')
  r = r.replace(/\bhis\b/gi, '')
  r = r.replace(/\bshe\b/gi, '')
  r = r.replace(/\bher\b/gi, '')
  r = r.replace(/\bhers\b/gi, '')
  r = r.replace(/\bwho\b/gi, '')
  r = r.replace(/\bwhom\b/gi, '')
  r = r.replace(/\bwhose\b/gi, '')
  r = r.replace(/\bwhich\b/gi, '')
  r = r.replace(/\bwhat\b/gi, '')
  r = r.replace(/\bwhere\b/gi, '')
  r = r.replace(/\bwhen\b/gi, '')
  r = r.replace(/\bwhy\b/gi, '')
  r = r.replace(/\bhow\b/gi, '')
  r = r.replace(/\bmay\b/gi, '')
  r = r.replace(/\bmight\b/gi, '')
  r = r.replace(/\bcan\b/gi, '')
  r = r.replace(/\bcould\b/gi, '')
  r = r.replace(/\bshall\b/gi, '')
  r = r.replace(/\bshould\b/gi, '')
  r = r.replace(/\bwill\b/gi, '')
  r = r.replace(/\bwould\b/gi, '')
  r = r.replace(/\bmust\b/gi, '')
  r = r.replace(/\bought\b/gi, '')
  r = r.replace(/\bnot\b/gi, '')
  r = r.replace(/\bno\b/gi, '')
  r = r.replace(/\bnor\b/gi, '')
  r = r.replace(/\bonly\b/gi, '')
  r = r.replace(/\bjust\b/gi, '')
  r = r.replace(/\bvery\b/gi, '')
  r = r.replace(/\btoo\b/gi, '')
  r = r.replace(/\bso\b/gi, '')
  r = r.replace(/\bmore\b/gi, '')
  r = r.replace(/\bmost\b/gi, '')
  r = r.replace(/\bother\b/gi, '')
  r = r.replace(/\banother\b/gi, '')
  r = r.replace(/\bsuch\b/gi, '')
  r = r.replace(/\bown\b/gi, '')
  r = r.replace(/\bsame\b/gi, '')
  r = r.replace(/\bhere\b/gi, '')
  r = r.replace(/\bthere\b/gi, '')
  r = r.replace(/\bthen\b/gi, '')
  r = r.replace(/\bnow\b/gi, '')

  // Clean up spaces
  r = r.replace(/\s{2,}/g, ' ')
  r = r.replace(/\s, /g, ', ')
  r = r.replace(/\(\s+/g, '(')
  r = r.replace(/\s+\)/g, ')')
  r = r.replace(/\. /g, '. ')
  r = r.replace(/\s+\./g, '.')
  r = r.trim()

  return r
}

// ============== Apply ==============
let textFixed = 0
let commFixed = 0

for (const [num, h] of Object.entries(tr.hadiths)) {
  const enH = en.hadiths[num]
  if (!enH) continue

  // Fix mixed texts
  if (h.text && isMixed(h.text)) {
    const newText = fullTextTranslation(enH.text)
    if (newText !== h.text) {
      h.text = newText
      textFixed++
    }
  }

  // Fix remaining English/mixed commentaries
  if (h.commentary) {
    const needsFix = !/[ığüşöçİĞÜŞÖÇ]/.test(h.commentary) || isMixed(h.commentary)
    if (needsFix) {
      const newComm = fullCommentaryTranslation(enH.commentary || h.commentary)
      if (newComm !== h.commentary) {
        h.commentary = newComm
        commFixed++
      }
    }
  }
}

tr.meta.generated = new Date().toISOString()
writeFileSync(fp, JSON.stringify(tr, null, 2) + '\n', 'utf-8')
console.log(`✓ Texts fixed: ${textFixed}`)
console.log(`✓ Commentaries fixed: ${commFixed}`)
