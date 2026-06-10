/**
 * Final comprehensive Turkish translation for all remaining texts + commentaries
 * Run: node scripts/translate-tr-final.js
 */
import { readFileSync, writeFileSync } from 'fs'

const fp = new URL('../src/lib/translations/tr.json', import.meta.url)
const ep = new URL('../src/lib/translations/en.json', import.meta.url)
const tr = JSON.parse(readFileSync(fp, 'utf-8'))
const en = JSON.parse(readFileSync(ep, 'utf-8'))

// ============== Narration starters (for text) ==============
function fixNarrationStart(text) {
  // Fix mixed English/Turkish patterns left by auto-translation
  const fixes = [
    // Unmatched "he" patterns
    [/^He /, 'O '],
    [/^The patient /, 'Hasta '],
    [/^The people /, 'İnsanlar '],
    [/^The man /, 'Adam '],
    [/^The woman /, 'Kadın '],
    [/^The bedouin /, 'Bedevî '],
    [/^I dedi/, 'Ben dedim'],
    [/^I sordu/, 'Ben sordum'],
    [/^I cevap verdi/, 'Ben cevap verdim'],
    [/^I haber verdi/, 'Ben haber verdim'],
    [/^He dedi/, 'O dedi'],
    [/^He sordu/, 'O sordu'],
    [/^He cevap verdi/, 'O cevap verdi'],
    [/ a kul /, ' bir kul '],
    [/An old woman /, 'Yaşlı bir kadın '],
    [/A woman /, 'Bir kadın '],
    [/A man /, 'Bir adam '],
    [/A person /, 'Bir kişi '],
    [/A bedouin /, 'Bir bedevî '],
    [/The messenger of Allāh \(ﷺ\)/gi, 'Resûlullah (ﷺ)'],
  ]
  for (const [from, to] of fixes) {
    text = text.replace(from, to)
  }
  return text
}

// ============== Text cleanup: fix mixed Turkish/English ==============
function cleanupText(text) {
  if (!text) return text
  if (/[ığüşöçİĞÜŞÖÇ]/.test(text)) return text // already Turkish

  let r = text

  // Fix half-translated words
  r = r.replace(/\bdedi\b/g, 'şöyle dedi')
  r = r.replace(/\bsordu\b/g, 'sordu')
  r = r.replace(/\bcevap verdi\b/g, 'cevap verdi')
  r = r.replace(/\bhaber verdi\b/g, 'haber verdi')
  r = r.replace(/\bdiyerek\b/g, 'diyerek')
  r = r.replace(/\banlatır\b/g, 'anlatır')
  r = r.replace(/\buyarır\b/g, 'buyurur')
  r = r.replace(/\bbuyurdu\b/g, 'buyurdu')
  r = r.replace(/\bgördüm\b/g, 'gördüm')
  r = r.replace(/\bgördü\b/g, 'gördü')
  r = r.replace(/\bgeldi\b/g, 'geldi')
  r = r.replace(/\bgitti\b/g, 'gitti')
  r = r.replace(/\bdedi ki\b/, 'şöyle dedi')

  // Turkishify remaining English
  const wordMap = {
    'narrates': 'anlatır',
    'narrated': 'rivayet etti',
    'reported': 'bildirdi',
    'reports': 'bildirir',
    'related': 'rivayet etti',
    'said': 'şöyle dedi',
    'saying': 'diyerek',
    'asks': 'sorar',
    'asked': 'sordu',
    'answered': 'cevapladı',
    'replied': 'cevap verdi',
    'informed': 'haber verdi',
    'informs': 'haber verir',
    'commanded': 'emretti',
    'ordered': 'emretti',
    'prohibited': 'yasakladı',
    'forbade': 'yasakladı',
    'went': 'gitti',
    'came': 'geldi',
    'saw': 'gördü',
    'took': 'aldı',
    'gave': 'verdi',
    'made': 'yaptı',
    'said to': 'şöyle dedi',
    'spoke': 'konuştu',
    'called': 'çağırdı',
    'entered': 'girdi',
    'left': 'ayrıldı',
    'returned': 'döndü',
    'sent': 'gönderdi',
    'placed': 'koydu',
    'sat': 'oturdu',
    'stood': 'kalktı',
    'slept': 'uyudu',
    'woke': 'uyandı',
    'ate': 'yedi',
    'drank': 'içti',
    'wore': 'giydi',
    'performed': 'kıldı',
    'prayed': 'namaz kıldı',
    'fasted': 'oruç tuttu',
    'gave charity': 'sadaka verdi',
    'recited': 'okudu',
    'wrote': 'yazdı',
    'read': 'okudu',
    'taught': 'öğretti',
    'learned': 'öğrendi',
    'knew': 'bildi',
    'understood': 'anladı',
    'remembered': 'hatırladı',
    'forgot': 'unuttu',
    'loved': 'sevdi',
    'hated': 'nefret etti',
    'feared': 'korktu',
    'hoped': 'ümit etti',
    'thanked': 'şükretti',
    'praised': 'hamd etti',
    'glorified': 'tesbih etti',
    'worshipped': 'ibadet etti',
    'repented': 'tövbe etti',
    'forgave': 'bağışladı',
    'blessed': 'mübarek kıldı',
    'cursed': 'lanetledi',
    'patient': 'sabırlı',
    'grateful': 'şükreden',
    'truthful': 'doğru sözlü',
    'generous': 'cömert',
    'kind': 'iyi',
    'merciful': 'merhametli',
    'just': 'adil',
    'oppressor': 'zalim',
    'oppressed': 'mazlum',
    'believer': 'mümin',
    'believers': 'müminler',
    'disbeliever': 'kâfir',
    'hypocrite': 'münafık',
    'hypocrites': 'münafıklar',
    'righteous': 'salih',
    'sinful': 'günahkâr',
    'wealth': 'mal',
    'poverty': 'fakirlik',
    'patience': 'sabır',
    'gratitude': 'şükür',
    'forgiveness': 'bağışlanma',
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
    'falsehood': 'batıl',
    'justice': 'adalet',
    'oppression': 'zulüm',
    'tyranny': 'zorbalık',
    'arrogance': 'kibir',
    'humility': 'tevazu',
    'envy': 'haset',
    'jealousy': 'kıskançlık',
    'backbiting': 'gıybet',
    'slander': 'iftira',
    'lying': 'yalan',
    'honesty': 'doğruluk',
    'trust': 'emanet',
    'betrayal': 'ihanet',
    'family': 'aile',
    'children': 'çocuklar',
    'parents': 'ebeveyn',
    'mother': 'anne',
    'father': 'baba',
    'brother': 'kardeş',
    'sister': 'kız kardeş',
    'husband': 'koca',
    'wife': 'hanım',
    'neighbor': 'komşu',
    'friend': 'dost',
    'enemy': 'düşman',
    'stranger': 'yabancı',
    'journey': 'yolculuk',
    'travel': 'seyahat',
    'home': 'ev',
    'house': 'ev',
    'mosque': 'mescid',
    'market': 'pazar',
    'city': 'şehir',
    'village': 'köy',
    'mountain': 'dağ',
    'river': 'nehir',
    'sea': 'deniz',
    'tree': 'ağaç',
    'garden': 'bahçe',
    'food': 'yemek',
    'water': 'su',
    'bread': 'ekmek',
    'meat': 'et',
    'fruit': 'meyve',
    'milk': 'süt',
    'honey': 'bal',
    'garment': 'elbise',
    'clothing': 'giysi',
    'cloak': 'rıda',
    'turban': 'sarık',
    'ring': 'yüzük',
    'sword': 'kılıç',
    'money': 'para',
    'gold': 'altın',
    'silver': 'gümüş',
    'camel': 'deve',
    'horse': 'at',
    'donkey': 'eşek',
    'sheep': 'koyun',
    'goat': 'keçi',
    'bird': 'kuş',
    'companions': 'sahâbîler',
    'Companion': 'Sahâbî',
    'companion': 'sahâbî',
    'slave': 'köle',
    'servant': 'hizmetçi',
    'free': 'hür',
    'old man': 'yaşlı adam',
    'old woman': 'yaşlı kadın',
    'young man': 'genç',
    'young woman': 'genç kadın',
    'child': 'çocuk',
    'son': 'oğul',
    'daughter': 'kız',
    'people': 'insanlar',
    'nation': 'ümmet',
    'community': 'topluluk',
    'tribe': 'kabile',
    'group': 'grup',
    'crowd': 'kalabalık',
    'army': 'ordu',
    'war': 'savaş',
    'peace': 'barış',
    'treaty': 'antlaşma',
    'booty': 'ganimet',
    'spoils': 'ganimetler',
  }

  for (const [enWord, trWord] of Object.entries(wordMap)) {
    const regex = new RegExp('\\b' + enWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi')
    r = r.replace(regex, trWord)
  }

  // Fix genitive
  r = r.replace(/'s /g, "'in ")
  r = r.replace(/'s$/g, "'in")
  
  // Fix punctuation
    
  return r
}

// ============== Commentary translation ==============
function translateCommentary(text) {
  if (!text) return text
  if (/[ığüşöçİĞÜŞÖÇ]/.test(text)) return text

  let r = text

  // Narration patterns for commentary
  r = r.replace(/This hadīth /gi, 'Bu hadis ')
  r = r.replace(/This hadith /gi, 'Bu hadis ')
  r = r.replace(/This ḥadīth /gi, 'Bu hadis ')
  r = r.replace(/This Hadith /gi, 'Bu hadis ')
  r = r.replace(/This passage /gi, 'Bu bölüm ')
  r = r.replace(/This verse /gi, 'Bu âyet ')
  r = r.replace(/This chapter /gi, 'Bu bölüm ')
  r = r.replace(/This narration /gi, 'Bu rivayet ')

  // Opening patterns
  r = r.replace(/^The hadīth indicates /gi, 'Bu hadis gösterir ki ')
  r = r.replace(/^The hadith indicates /gi, 'Bu hadis gösterir ki ')
  r = r.replace(/^This shows /gi, 'Bu gösterir ki ')
  r = r.replace(/^This means /gi, 'Bu demektir ki ')
  r = r.replace(/^It means /gi, 'Yani ')
  r = r.replace(/^In this hadīth /gi, 'Bu hadiste ')
  r = r.replace(/^In this hadith /gi, 'Bu hadiste ')
  r = r.replace(/^According to /gi, 'Göre ')
  r = r.replace(/^In other words/gi, 'Başka bir deyişle')
  r = r.replace(/^That is to say/gi, 'Yani')

  // Religious terms (hadith-specific)
  r = r.replace(/hadīth/gi, 'hadis')
  r = r.replace(/ḥadīth/gi, 'hadis')
  r = r.replace(/hadith/gi, 'hadis')
  
  // Key commentary phrases
  const phrases = {
    'emphasizes the importance of': 'önemini vurgular',
    'highlights the importance of': 'önemine işaret eder',
    'shows the importance of': 'önemini gösterir',
    'indicates the importance of': 'önemine delalet eder',
    'teaches us that': 'bize öğretir ki',
    'reminds us that': 'bize hatırlatır ki',
    'tells us that': 'bize bildirir ki',
    'refers to': 'işaret eder',
    'points to': 'işaret eder',
    'consists of': 'oluşur',
    'means that': 'demektir ki',
    'is a reminder of': 'bir hatırlatmasıdır',
    'is a proof of': 'bir delilidir',
    'is a sign of': 'bir işaretidir',
    'is a means of': 'bir vesilesidir',
    'is a cause of': 'bir sebebidir',
    'is a source of': 'bir kaynağıdır',
    'is a form of': 'bir çeşididir',
    'is a type of': 'bir türüdür',
    'is the best of': 'en hayırlısıdır',
    'is the greatest of': 'en büyüğüdür',
    'is the most beloved of': 'en sevimlisidir',
    'is one of the greatest': 'en büyüklerindendir',
    'is one of the best': 'en hayırlılarındandır',
    'is one of the most important': 'en önemlilerindendir',
    'is considered among': 'arasında sayılır',
    'is regarded as': 'olarak kabul edilir',
    'according to the majority of scholars': 'âlimlerin çoğunluğuna göre',
    'according to some scholars': 'bazı âlimlere göre',
    'most scholars agree that': 'âlimlerin çoğu ittifak eder ki',
    'some scholars say that': 'bazı âlimler der ki',
    'the scholars say that': 'âlimler der ki',
    'the majority of scholars': 'âlimlerin çoğunluğu',
    'the wisdom behind this': 'bundaki hikmet',
    'the reason for this': 'bunun sebebi',
    'the lesson from this': 'bundan alınacak ders',
    'the benefit of this': 'bunun faydası',
    'the purpose of this': 'bunun amacı',
    'on the one hand': 'bir yandan',
    'on the other hand': 'diğer yandan',
    'in addition': 'ayrıca',
    'furthermore': 'üstelik',
    'moreover': 'ayrıca',
    'however': 'bununla birlikte',
    'nevertheless': 'yine de',
    'therefore': 'bu nedenle',
    'thus': 'böylece',
    'hence': 'bundan dolayı',
    'consequently': 'sonuç olarak',
    'in conclusion': 'netice olarak',
    'in summary': 'özetle',
    'in short': 'kısaca',
    'in general': 'genel olarak',
    'in particular': 'özellikle',
    'in reality': 'gerçekte',
    'in fact': 'aslında',
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
    'not only... but also': 'sadece... değil aynı zamanda',
    'both... and': 'hem... hem de',
    'either... or': 'ya... ya da',
    'neither... nor': 'ne... ne de',
    'just as': 'tıpkı... gibi',
    'just like': 'tıpkı',
  }

  for (const [enPhrase, trPhrase] of Object.entries(phrases)) {
    r = r.replace(new RegExp(enPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), trPhrase)
  }

  // Verbs and nouns
  const commentaryWords = {
    'importance': 'önem',
    'virtue': 'fazilet',
    'virtues': 'faziletler',
    'excellence': 'üstünlük',
    'merit': 'fazilet',
    'merits': 'faziletler',
    'meaning': 'anlam',
    'significance': 'ehemmiyet',
    'interpretation': 'yorum',
    'explanation': 'açıklama',
    'clarification': 'açıklama',
    'understanding': 'anlayış',
    'lesson': 'ders',
    'lessons': 'dersler',
    'wisdom': 'hikmet',
    'benefit': 'fayda',
    'benefits': 'faydalar',
    'ruling': 'hüküm',
    'rulings': 'hükümler',
    'command': 'emir',
    'prohibition': 'yasak',
    'permission': 'izin',
    'recommendation': 'tavsiye',
    'encouragement': 'teşvik',
    'discouragement': 'sakındırma',
    'warning': 'uyarı',
    'threat': 'tehdit',
    'promise': 'vaad',
    'obligation': 'farz',
    'obligatory': 'farz',
    'recommended': 'müstehap',
    'permissible': 'helal',
    'forbidden': 'haram',
    'disliked': 'mekruh',
    'encouraged': 'teşvik edilen',
    'discouraged': 'sakındırılan',
    'condition': 'şart',
    'conditions': 'şartlar',
    'pillar': 'rükün',
    'pillars': 'rükünler',
    'act of worship': 'ibadet',
    'acts of worship': 'ibadetler',
    'good deed': 'iyilik',
    'good deeds': 'iyilikler',
    'sin': 'günah',
    'sins': 'günahlar',
    'major sin': 'büyük günah',
    'minor sin': 'küçük günah',
    'major sins': 'büyük günahlar',
    'minor sins': 'küçük günahlar',
    'repentance': 'tövbe',
    'forgiveness': 'bağışlanma',
    'atonement': 'kefaret',
    'expiation': 'kefaret',
    'reward': 'sevap',
    'punishment': 'azap',
    'paradise': 'cennet',
    'hell': 'cehennem',
    'hereafter': 'ahiret',
    'this world': 'dünya',
    'worldly life': 'dünya hayatı',
    'afterlife': 'ahiret',
    'faith': 'iman',
    'belief': 'inanç',
    'disbelief': 'küfür',
    'hypocrisy': 'nifak',
    'sincerity': 'ihlâs',
    'piety': 'takvâ',
    'righteousness': 'salih amel',
    'good character': 'güzel ahlâk',
    'bad character': 'kötü ahlâk',
    'manners': 'adab',
    'etiquette': 'adab',
    'morals': 'ahlâk',
    'morality': 'ahlâk',
    'conduct': 'davranış',
    'behavior': 'davranış',
    'action': 'amel',
    'actions': 'ameller',
    'deed': 'amel',
    'deeds': 'ameller',
    'intention': 'niyet',
    'intentions': 'niyetler',
    'speech': 'söz',
    'word': 'kelime',
    'words': 'sözler',
    'statement': 'ifade',
    'declaration': 'beyan',
    'utterance': 'söz',
    'practice': 'uygulama',
    'tradition': 'sünnet',
    'custom': 'âdet',
    'habit': 'alışkanlık',
    'manner': 'şekil',
    'method': 'yöntem',
    'way': 'yol',
    'path': 'yol',
    'religion': 'din',
    'religious': 'dinî',
    'spiritual': 'manevî',
    'material': 'maddî',
    'worldly': 'dünyevî',
    'divine': 'ilâhî',
    'prophetic': 'nebevî',
    'islamic': 'islâmî',
    'human': 'insanî',
    'social': 'sosyal',
    'moral': 'ahlâkî',
    'ethical': 'ahlâkî',
    'legal': 'hukukî',
    'practical': 'amelî',
    'theoretical': 'nazarî',
    'general': 'genel',
    'specific': 'özel',
    'common': 'yaygın',
    'rare': 'nadir',
    'similar': 'benzer',
    'different': 'farklı',
    'various': 'çeşitli',
    'numerous': 'çok sayıda',
    'many': 'birçok',
    'several': 'birkaç',
    'all': 'bütün',
    'every': 'her',
    'some': 'bazı',
    'most': 'çoğu',
    'few': 'az sayıda',
    'both': 'her iki',
    'each': 'her biri',
    'whole': 'tüm',
    'entire': 'bütün',
    'complete': 'tam',
    'perfect': 'mükemmel',
    'full': 'dolu',
    'partial': 'kısmi',
    'true': 'gerçek',
    'real': 'hakiki',
    'actual': 'asıl',
    'correct': 'doğru',
    'right': 'doğru',
    'wrong': 'yanlış',
    'false': 'yanlış',
    'valid': 'geçerli',
    'invalid': 'geçersiz',
    'strong': 'güçlü',
    'weak': 'zayıf',
    'sound': 'sahih',
    'authentic': 'sahih',
    'reliable': 'güvenilir',
    'unreliable': 'güvenilmez',
    'trustworthy': 'güvenilir',
    'fabricated': 'uydurma',
    'supported': 'desteklenen',
    'attested': 'teyit edilen',
    'confirmed': 'doğrulanan',
    'reported': 'rivayet edilen',
    'transmitted': 'nakledilen',
    'preserved': 'korunan',
    'preservation': 'korunma',
    'protection': 'koruma',
    'guardianship': 'gözetim',
    'love': 'sevgi',
    'hatred': 'nefret',
    'fear': 'korku',
    'hope': 'ümit',
    'trust': 'güven',
    'reliance': 'tevekkül',
    'submission': 'teslimiyet',
    'obedience': 'itaat',
    'disobedience': 'isyan',
    'rebellion': 'başkaldırı',
    'worship': 'ibadet',
    'devotion': 'kulluk',
    'servitude': 'kölelik',
    'humility': 'tevazu',
    'modesty': 'hayâ',
    'shame': 'utanç',
    'honor': 'şeref',
    'dignity': 'haysiyet',
    'respect': 'saygı',
    'disrespect': 'saygısızlık',
    'kindness': 'iyilik',
    'cruelty': 'zulüm',
    'compassion': 'merhamet',
    'mercy': 'rahmet',
    'gentleness': 'yumuşaklık',
    'harshness': 'sertlik',
    'severity': 'şiddet',
    'leniency': 'hoşgörü',
    'tolerance': 'hoşgörü',
    'patience': 'sabır',
    'perseverance': 'sebat',
    'endurance': 'dayanıklılık',
    'steadfastness': 'istikrar',
    'firmness': 'sağlamlık',
    'determination': 'kararlılık',
    'sincerity': 'ihlâs',
    'honesty': 'doğruluk',
    'truthfulness': 'doğruluk',
    'trustworthiness': 'güvenilirlik',
    'loyalty': 'sadakat',
    'betrayal': 'ihanet',
    'justice': 'adalet',
    'fairness': 'hakkaniyet',
    'equity': 'denklik',
    'equality': 'eşitlik',
    'freedom': 'özgürlük',
    'rights': 'haklar',
    'duties': 'görevler',
    'responsibilities': 'sorumluluklar',
    'obligations': 'yükümlülükler',
  }

  for (const [enWord, trWord] of Object.entries(commentaryWords)) {
    const regex = new RegExp('\\b' + enWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi')
    r = r.replace(regex, trWord)
  }

  // Fix common issues
  r = r.replace(/Allāh \(ﷻ\)/g, 'Allah (ﷻ)')
  r = r.replace(/Allāh \(the Exalted\)/g, 'Allah (ﷻ)')
  r = r.replace(/Allāh \(the Mighty and Sublime\)/g, 'Allah (ﷻ)')
  r = r.replace(/Allāh \(the Most High\)/g, 'Allah (ﷻ)')
  r = r.replace(/the Messenger of Allāh \(ﷺ\)/g, 'Resûlullah (ﷺ)')
  r = r.replace(/the Prophet \(ﷺ\)/g, 'Peygamber (ﷺ)')
  r = r.replace(/Muḥammad \(ﷺ\)/g, 'Muhammed (ﷺ)')
  r = r.replace(/Allāh \(ﷺ\)/g, 'Allah (ﷻ)')

  // "ﷺ" in various positions
  r = r.replace(/the Prophet/g, 'Peygamber')
  r = r.replace(/Allah/g, 'Allah')
    
  // Clean double spaces
  r = r.replace(/\s{2,}/g, ' ')
  r = r.replace(/\(\s+/g, '(')
  r = r.replace(/\s+\)/g, ')')
  
  return r
}

// ============== Narrator name translation (expanded) ==============
const narratorMap = {
  "Ibn 'Umar (رضي الله عنهما)": "Abdullah bin Ömer (رضي الله عنهما)",
  "Ibn 'Umar (ra)": "Abdullah bin Ömer (رضي الله عنهما)",
  "Ibn 'Abbās (رضي الله عنهما)": "Abdullah bin Abbâs (رضي الله عنهما)",
  "Ibn 'Abbās (ra)": "Abdullah bin Abbâs (رضي الله عنهما)",
  "Abū Hurayrah (رضي الله عنه)": "Ebû Hüreyre (رضي الله عنه)",
  "Abū Hurayrah (ra)": "Ebû Hüreyre (رضي الله عنه)",
  "Anas (رضي الله عنه)": "Enes (رضي الله عنه)",
  "Anas (ra)": "Enes (رضي الله عنه)",
  "Anas ibn Mālik (رضي الله عنه)": "Enes bin Mâlik (رضي الله عنه)",
  "Ā'ishah (رضي الله عنها)": "Âişe (رضي الله عنها)",
  "Abū Mūsā al-Ash'arī (رضي الله عنه)": "Ebû Mûsâ el-Eş'arî (رضي الله عنه)",
  "Abū Sa'īd al-Khudrī (رضي الله عنه)": "Ebû Saîd el-Hudrî (رضي الله عنه)",
  "Jābir (رضي الله عنه)": "Câbir (رضي الله عنه)",
  "Jābir (ra)": "Câbir (رضي الله عنه)",
  "Jābir ibn 'Abdillāh (رضي الله عنهما)": "Câbir bin Abdullah (رضي الله عنهما)",
  "Ibn Mas'ūd (رضي الله عنه)": "Abdullah bin Mes'ûd (رضي الله عنه)",
  "Ibn Mas'ūd (ra)": "Abdullah bin Mes'ûd (رضي الله عنه)",
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
  "Abū Mūsā (ra)": "Ebû Mûsâ (رضي الله عنه)",
  "Al-Ṭufayl ibn Ubayy ibn Ka'b (رضي الله عنه)": "Tufeyl bin Übey bin Kâ'b (رضي الله عنه)",
  "Al-Ṭufayl (رضي الله عنه)": "Tufeyl (رضي الله عنه)",
  "Dihyah al-Kalbī (رضي الله عنه)": "Dihye el-Kelbî (رضي الله عنه)",
  "Zayd ibn Khālid al-Juhanī (رضي الله عنه)": "Zeyd bin Hâlid el-Cühenî (رضي الله عنه)",
  "Irbaḍ ibn Sāriyah (رضي الله عنه)": "Irbad bin Sâriye (رضي الله عنه)",
  "Abū Sa'īd (رضي الله عنه)": "Ebû Saîd (رضي الله عنه)",
  "Abū Sa'īd (ra)": "Ebû Saîd (رضي الله عنه)",
  "Salamah ibn Qays (رضي الله عنه)": "Sâleme bin Kays (رضي الله عنه)",
  "A man from the Companions (رضي الله عنه)": "Sahâbeden bir adam (رضي الله عنه)",
  "A group of the Companions (ra)": "Bir grup sahâbî (رضي الله عنهم)",
  "the Mother of the Believers, Umm Salamah Hind bint Abī Umayyah (رضي الله عنها)": "Müminlerin Annesi Ümmü Seleme Hind bint Ebû Ümeyye (رضي الله عنها)",
  "Abū Hurayrah and Abū Sa'īd (ra)": "Ebû Hüreyre ve Ebû Saîd (رضي الله عنهما)",
  "Abū Hurayrah and Ḥudhayfah (ra)": "Ebû Hüreyre ve Huzeyfe (رضي الله عنهما)",
  "Abū Dharr and Mu'adh ibn Jabal (ra)": "Ebû Zer ve Muâz bin Cebel (رضي الله عنهما)",
  "Al-Ṭufayl ibn 'Amr al-Dawsī (رضي الله عنه)": "Tufeyl bin Amr ed-Devsî (رضي الله عنه)",
  "Al-Ṭufayl ibn 'Amr (رضي الله عنه)": "Tufeyl bin Amr (رضي الله عنه)",
  "Al-Sā'ib ibn Yazīd (رضي الله عنه)": "Sâib bin Yezîd (رضي الله عنه)",
  "Al-Sā'ib (رضي الله عنه)": "Sâib (رضي الله عنه)",
  "Al-Miswar ibn Makhramah (رضي الله عنه)": "Misver bin Mahreme (رضي الله عنه)",
  "Al-Miswar (رضي الله عنه)": "Misver (رضي الله عنه)",
  "Al-Ḥasan al-Baṣrī (رحمه الله)": "Hasan-ı Basrî (رحمه الله)",
  "Al-Ḥasan al-Basrī (رحمه الله)": "Hasan-ı Basrî (رحمه الله)",
  "Ma'mar (رحمه الله)": "Ma'mer (رحمه الله)",
  "Makhūl (رحمه الله)": "Mekhûl (رحمه الله)",
  "Shahr ibn Ḥawshab (رحمه الله)": "Şehr bin Havşeb (رحمه الله)",
  "Shahr ibn Ḥawshab (رضي الله عنه)": "Şehr bin Havşeb (رضي الله عنه)",
  "Wahb ibn Munabbih (رحمه الله)": "Vehm bin Münebbih (رحمه الله)",
  "Al-Ḥakam ibn 'Utaybah (رحمه الله)": "Hakem bin Uteybe (رحمه الله)",
  "Al-A'mash (رحمه الله)": "A'meş (رحمه الله)",
  "Al-A'mash (rahimahullāh)": "A'meş (رحمه الله)",
  "Al-Awzā'ī (رحمه الله)": "Evzâî (رحمه الله)",
  "Al-Thawrī (رحمه الله)": "Sevrî (رحمه الله)",
  "Salmān al-Fārsī (رضي الله عنه)": "Selman-ı Fârisî (رضي الله عنه)",
  "Salmān (رضي الله عنه)": "Selman (رضي الله عنه)",
  "Salmān al-Fārsī (ra)": "Selman-ı Fârisî (رضي الله عنه)",
  "Abū Hurayrah, Abū Sa'īd, and Jābir (ra)": "Ebû Hüreyre, Ebû Saîd ve Câbir (رضي الله عنهم)",
  "Abū Hurayrah, Abū Sa'īd, and Anas (ra)": "Ebû Hüreyre, Ebû Saîd ve Enes (رضي الله عنهم)",
  "Anas and Ibn 'Abbās (ra)": "Enes ve İbn Abbâs (رضي الله عنهم)",
  "Anas and Abū Hurayrah (ra)": "Enes ve Ebû Hüreyre (رضي الله عنهما)",
  "Jābir and Anas (ra)": "Câbir ve Enes (رضي الله عنهما)",
  "Ibn 'Umar and 'Ā'ishah (ra)": "İbn Ömer ve Âişe (رضي الله عنهم)",
  "Ibn Mas'ūd and Ibn 'Umar (ra)": "İbn Mes'ûd ve İbn Ömer (رضي الله عنهم)",
  "Abū Hurayrah and 'Ā'ishah (ra)": "Ebû Hüreyre ve Âişe (رضي الله عنهما)",
  "Abū Hurayrah and Anas (ra)": "Ebû Hüreyre ve Enes (رضي الله عنهما)",
  "Abū Sa'īd and Abū Hurayrah (ra)": "Ebû Saîd ve Ebû Hüreyre (رضي الله عنهما)",
  "Umm al-Mu'minīn 'Ā'ishah (رضي الله عنها)": "Müminlerin Annesi Âişe (رضي الله عنها)",
  "Umm al-Mu'minīn 'Ā'ishah al-Ṣiddīqah (رضي الله عنها)": "Müminlerin Annesi Âişe es-Sıddîka (رضي الله عنها)",
  "Umm al-Mu'minīn (رضي الله عنها)": "Müminlerin Annesi (رضي الله عنها)",
  "Umm al-Mu'minīn Ḥafṣah (رضي الله عنها)": "Müminlerin Annesi Hafsa (رضي الله عنها)",
  "Umm Ḥabībah Ramlah bint Abī Sufyān (رضي الله عنها)": "Ümmü Habîbe Remle bint Ebû Süfyân (رضي الله عنها)",
  "Umm Habībah (رضي الله عنها)": "Ümmü Habîbe (رضي الله عنها)",
  "Umm Ayman (رضي الله عنها)": "Ümmü Eymen (رضي الله عنها)",
  "Umm al-Dardā' (رضي الله عنها)": "Ümmü Derdâ (رضي الله عنها)",
  "Umm Qays (رضي الله عنها)": "Ümmü Kays (رضي الله عنها)",
  "Umm Hishām (رضي الله عنها)": "Ümmü Hişâm (رضي الله عنها)",
  "Umm Sa'd (رضي الله عنها)": "Ümmü Sa'd (رضي الله عنها)",
  "Umm al-Faḍl (رضي الله عنها)": "Ümmü Fazl (رضي الله عنها)",
  "Umm Mubashshir (رضي الله عنها)": "Ümmü Mübeşşir (رضي الله عنها)",
  "Umm Salamah (ra)": "Ümmü Seleme (رضي الله عنها)",
  "Umm Kulthūm bint 'Uqbah (رضي الله عنها)": "Ümmü Külsüm bint Ukbe (رضي الله عنها)",
  "Umm al-Mu'minīn Maymūnah (رضي الله عنها)": "Müminlerin Annesi Meymûne (رضي الله عنها)",
  "Maymūnah (رضي الله عنها)": "Meymûne (رضي الله عنها)",
  "Asmā' bint Abī Bakr (رضي الله عنها)": "Esma bint Ebû Bekr (رضي الله عنها)",
  "Asmā' bint Abī Bakr (ra)": "Esma bint Ebû Bekr (رضي الله عنها)",
  "Asmā' (رضي الله عنها)": "Esma (رضي الله عنها)",
  "Fāṭimah bint Qays (رضي الله عنها)": "Fâtıma bint Kays (رضي الله عنها)",
  "Fāṭimah al-Zahrā' (رضي الله عنها)": "Fâtıma ez-Zehrâ (رضي الله عنها)",
  "Zaynab bint 'Abdillāh (رضي الله عنها)": "Zeynep bint Abdullah (رضي الله عنها)",
  "Zaynab bint Abī Salamah (رضي الله عنها)": "Zeynep bint Ebû Seleme (رضي الله عنها)",
  "Zaynab bint Jaḥsh (رضي الله عنها)": "Zeynep bint Cahş (رضي الله عنها)",
  "Zaynab (رضي الله عنها)": "Zeynep (رضي الله عنها)",
  "Ḥafṣah (رضي الله عنها)": "Hafsa (رضي الله عنها)",
  "Safīyyah (رضي الله عنها)": "Safiyye (رضي الله عنها)",
  "Juwayriyyah (رضي الله عنها)": "Cüveyriye (رضي الله عنها)",
  "Ramlah (رضي الله عنها)": "Remle (رضي الله عنها)",
  "Khadījah (رضي الله عنها)": "Hatice (رضي الله عنها)",
  "Khadījah bint Khuwaylid (رضي الله عنها)": "Hatice bint Huveylid (رضي الله عنها)",
  "A woman of the Anṣār (رضي الله عنها)": "Ensardan bir kadın (رضي الله عنها)",
  "A woman from Quraysh (رضي الله عنها)": "Kureyşli bir kadın (رضي الله عنها)",
  "A group of women (ra)": "Bir grup kadın (رضي الله عنهن)",
  "Abū Bakr and 'Umar (ra)": "Ebû Bekr ve Ömer (رضي الله عنهما)",
  "Abū Bakr and 'Umar (رضي الله عنهما)": "Ebû Bekr ve Ömer (رضي الله عنهما)",
  "Abū Bakr and 'Alī (ra)": "Ebû Bekr ve Ali (رضي الله عنهما)",
  "Abū Bakr and 'Alī (رضي الله عنهما)": "Ebû Bekr ve Ali (رضي الله عنهما)",
  "Abū Bakr, 'Umar, and 'Alī (ra)": "Ebû Bekr, Ömer ve Ali (رضي الله عنهم)",
  "Abū Bakr, 'Umar, and 'Alī (رضي الله عنهم)": "Ebû Bekr, Ömer ve Ali (رضي الله عنهم)",
  "The ten Companions (ra)": "On sahâbî (رضي الله عنهم)",
  "The ten Companions (رضي الله عنهم)": "On sahâbî (رضي الله عنهم)",
  "The People of the Suffah": "Suffe Ashabı",
  "The people of the Suffah": "Suffe ashabı",
  "People of the Suffah": "Suffe Ashabı",
  "The Anṣār": "Ensar",
  "the Anṣār": "ensar",
  "The Muhājirūn": "Muhacirler",
  "the Muhājirūn": "muhacirler",
  "Muhājirūn": "Muhacirler",
  "muhājirūn": "muhacirler",
  "The Anṣār (ra)": "Ensar (رضي الله عنهم)",
  "The Companions (ra)": "Sahâbîler (رضي الله عنهم)",
  "Companions (ra)": "Sahâbîler (رضي الله عنهم)",
  "Companions (رضي الله عنهم)": "Sahâbîler (رضي الله عنهم)",
  "Some of the Companions (ra)": "Sahâbeden bazıları (رضي الله عنهم)",
  "A group of the Companions (ra)": "Bir grup sahâbî (رضي الله عنهم)",
  "The tribe of Quraysh": "Kureyş kabilesi",
  "Quraysh": "Kureyş",
}

// ============== Grade map ==============
const gradeMap = {
  "Sahih": "Sahih",
  "Hasan": "Hasen",
  "Da'if": "Zayıf",
  "Hasan Sahih": "Hasen Sahih",
  "Hasan Gharib": "Hasen Garîb",
  "Gharib": "Garîb",
  "Sahih Gharib": "Sahih Garîb",
  "Mawquf": "Mevkuf",
  "Marfu'": "Merfû",
  "Qudsi": "Kudsî",
  "Hasan Da'if": "Hasen Zayıf",
  "Sahih Mawquf": "Sahih Mevkuf",
  "Da'if Gharib": "Zayıf Garîb",
  "Munkar": "Münker",
  "Sahih Da'if": "Sahih Zayıf",
  "Maqtu'": "Maktu",
  "Mursal": "Mürsel",
  "Hasan Mawquf": "Hasen Mevkuf",
}

// ============== Collection map ==============
const collectionMap = {
  "Al-Bukhari": "Buhârî",
  "Muslim": "Müslim",
  "Al-Bukhari & Muslim": "Buhârî, Müslim",
  "Al-Tirmidhi": "Tirmizî",
  "Al-Nasa'i": "Nesâî",
  "Abu Dawud": "Ebû Dâvûd",
  "Ibn Majah": "İbn Mâce",
  "Ahmad": "Ahmed",
  "Al-Darimi": "Dârimî",
  "Al-Bayhaqi": "Beyhakî",
  "Al-Hakim": "Hâkim",
  "Ibn Hibban": "İbn Hibbân",
  "Al-Tabarani": "Taberânî",
  "Abu Nu'aym": "Ebû Nuaym",
  "Sa'id ibn Mansur": "Saîd bin Mansûr",
  "Al-Baghawi": "Beğavî",
  "Ibn Abi Shaybah": "İbn Ebû Şeybe",
  "Abu Ya'la": "Ebû Ya'lâ",
  "Abu 'Awana": "Ebû Avâne",
  "Abdullah ibn Ahmad": "Abdullah bin Ahmed",
  "Al-Bukhari & Muslim & Al-Tirmidhi": "Buhârî, Müslim, Tirmizî",
  "Al-Bukhari & Muslim & Abu Dawud & Al-Nasa'i": "Buhârî, Müslim, Ebû Dâvûd, Nesâî",
  "Al-Bukhari & Muslim & Ahmad": "Buhârî, Müslim, Ahmed",
  "Muslim & Al-Tirmidhi": "Müslim, Tirmizî",
  "Muslim & Al-Nasa'i": "Müslim, Nesâî",
  "Muslim & Abu Dawud": "Müslim, Ebû Dâvûd",
  "Al-Bukhari & Muslim & Al-Tirmidhi & Al-Nasa'i": "Buhârî, Müslim, Tirmizî, Nesâî",
  "Al-Bukhari & Muslim & Abu Dawud": "Buhârî, Müslim, Ebû Dâvûd",
  "Ahmad & Al-Bukhari & Muslim": "Ahmed, Buhârî, Müslim",
  "Ahmad & Al-Bukhari": "Ahmed, Buhârî",
  "Ahmad & Abu Dawud": "Ahmed, Ebû Dâvûd",
  "Ahmad & Muslim": "Ahmed, Müslim",
  "Ahmad & Al-Tirmidhi": "Ahmed, Tirmizî",
  "Ahmad & Al-Nasa'i": "Ahmed, Nesâî",
  "Al-Bukhari & Al-Tirmidhi": "Buhârî, Tirmizî",
  "Al-Bukhari & Abu Dawud": "Buhârî, Ebû Dâvûd",
  "Al-Bukhari & Al-Nasa'i": "Buhârî, Nesâî",
  "Al-Tirmidhi & Abu Dawud": "Tirmizî, Ebû Dâvûd",
  "Al-Tirmidhi & Ibn Majah": "Tirmizî, İbn Mâce",
  "Al-Nasa'i & Ibn Majah": "Nesâî, İbn Mâce",
  "Abu Dawud & Al-Nasa'i": "Ebû Dâvûd, Nesâî",
  "Abu Dawud & Ibn Majah": "Ebû Dâvûd, İbn Mâce",
  "Al-Bayhaqi & Al-Hakim": "Beyhakî, Hâkim",
  "Ibn Khuzaymah": "İbn Huzeyme",
  "Ibn Khuzaymah & Ibn Hibban": "İbn Huzeyme, İbn Hibbân",
  "Ibn al-Jarud": "İbn Cârûd",
  "Al-Bazzar": "Bezzâr",
  "Ibn Abi 'Asim": "İbn Ebû Âsım",
  "Ibn al-Mubarak": "İbn Mübârek",
  "Ibn Abi al-Dunya": "İbn Ebû'd-Dünyâ",
  "Al-Bukhari & Al-Tirmidhi & Al-Nasa'i": "Buhârî, Tirmizî, Nesâî",
  "Al-Bukhari & Muslim & Al-Nasa'i": "Buhârî, Müslim, Nesâî",
  "Abd al-Razzaq": "Abdürrezzâk",
  "Al-Bukhari & Muslim & Al-Tirmidhi & Abu Dawud": "Buhârî, Müslim, Tirmizî, Ebû Dâvûd",
  "Al-Bukhari, Muslim & Abu Dawud": "Buhârî, Müslim, Ebû Dâvûd",
  "Al-Bukhari, Muslim, Abu Dawud & Al-Nasa'i": "Buhârî, Müslim, Ebû Dâvûd, Nesâî",
}

// ============== Apply translations ==============
let textFixed = 0
let commentaryTranslated = 0
let narratorTranslated = 0
let gradeTranslated = 0
let collectionTranslated = 0

for (const [num, h] of Object.entries(tr.hadiths)) {
  const enH = en.hadiths[num]
  if (!enH) continue

  // Fix text (mixed English/Turkish)
  if (h.text && !/[ığüşöçİĞÜŞÖÇ]/.test(h.text)) {
    const engSrc = enH.text
    // Only fix if it's not the same as English source (i.e. already partially translated)
    // or if still pure English
    if (h.text === engSrc) {
      // Still pure English - skip, already handled by adv script
    } else {
      // Mixed - clean up
      const cleaned = cleanupText(h.text)
      if (cleaned !== h.text) {
        h.text = cleaned
        textFixed++
      }
    }
  }

  // Translate narrator
  if (h.narrator && !/[ığüşöçİĞÜŞÖÇ]/.test(h.narrator)) {
    const trNarr = narratorMap[h.narrator]
    if (trNarr) {
      h.narrator = trNarr
      narratorTranslated++
    }
  }

  // Translate grade
  if (h.grade && !/[ığüşöçİĞÜŞÖÇ]/.test(h.grade)) {
    const trGrade = gradeMap[h.grade]
    if (trGrade) {
      h.grade = trGrade
      gradeTranslated++
    }
  }

  // Translate collection
  if (h.collection && !/[ığüşöçİĞÜŞÖÇ]/.test(h.collection)) {
    const trCol = collectionMap[h.collection]
    if (trCol) {
      h.collection = trCol
      collectionTranslated++
    }
  }

  // Translate commentary
  if (h.commentary && !/[ığüşöçİĞÜŞÖÇ]/.test(h.commentary)) {
    const translated = translateCommentary(h.commentary)
    if (translated !== h.commentary) {
      h.commentary = translated
      commentaryTranslated++
    }
  }
}

tr.meta.generated = new Date().toISOString()
writeFileSync(fp, JSON.stringify(tr, null, 2) + '\n', 'utf-8')
console.log(`✓ Texts fixed (mixed Turkish/English): ${textFixed}`)
console.log(`✓ Narrators translated: ${narratorTranslated}`)
console.log(`✓ Grades translated: ${gradeTranslated}`)
console.log(`✓ Collections translated: ${collectionTranslated}`)
console.log(`✓ Commentaries translated: ${commentaryTranslated}`)
