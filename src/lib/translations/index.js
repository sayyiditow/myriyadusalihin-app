/**
 * Core translation engine for Riyad-us-Salihin
 *
 * Manages language state, loads translation JSON files, and merges
 * translated text over the canonical English data from content.js.
 *
 * Arabic honorifics (صلى الله عليه وسلم, ﷺ, رضي الله عنه, etc.)
 * are embedded in the text and preserved as-is during translation.
 */

/** Available languages */
export const LANGUAGES = [
  { code: 'en', label: 'English', shortLabel: 'EN', dir: 'ltr' },
  { code: 'tr', label: 'Türkçe', shortLabel: 'TR', dir: 'ltr' },
  { code: 'ur', label: 'Urdu', shortLabel: 'UR', dir: 'ltr' },
]

const STORAGE_KEY = 'preferred_language'

/** Cache loaded translation data so we only fetch each language once */
const translationCache = {}

/**
 * Per-language loaders. Each is a static `import()` so Rollup can
 * code-split the JSON into its own lazy chunk and emit it in the
 * production build. A template-literal import (`./${lang}.json`) is
 * NOT analyzable by Vite and silently fails to bundle in prod.
 */
const translationLoaders = {
  tr: () => import('./tr.json'),
  ur: () => import('./ur.json'),
}

/**
 * Load translation data for a given language code.
 * @param {'en'|'tr'|'ur'} lang
 * @returns {Promise<object|null>} Translation data, or null for English
 */
export async function loadTranslations(lang) {
  if (lang === 'en') return null
  if (translationCache[lang]) return translationCache[lang]
  const loader = translationLoaders[lang]
  if (!loader) return null
  const mod = await loader()
  translationCache[lang] = mod.default
  return translationCache[lang]
}

/**
 * Apply translations from a loaded JSON blob over the canonical
 * English data (riyadusSalihin). Returns a new array; does not mutate.
 *
 * Any field missing from translations falls back to the original English.
 * Arabic honorifics in the original English data are preserved.
 *
 * @param {Array} baseData The riyadusSalihin array
 * @param {object|null} translations Loaded translation data, or null for English
 * @returns {Array} Translated (or original) content array
 */
export function applyTranslations(baseData, translations) {
  if (!translations) return baseData

  const tChapters = translations.chapters || {}
  const tHadiths = translations.hadiths || {}

  return baseData.map((chapter) => {
    const cid = String(chapter.id)
    const tc = tChapters[cid]

    return {
      ...chapter,
      title: tc?.title ?? chapter.title,
      introVerses: chapter.introVerses
        ? chapter.introVerses.map((v, vi) => ({
            ...v,
            englishText: tc?.introVerses?.[vi]?.text ?? v.englishText,
          }))
        : chapter.introVerses,
      hadiths: chapter.hadiths.map((h) => {
        const hid = String(h.number)
        const th = tHadiths[hid]
        if (!th) return h
        return {
          ...h,
          narrator: th.narrator ?? h.narrator,
          englishText: th.text ?? h.englishText,
          commentary: th.commentary ?? h.commentary,
          grade: th.grade ?? h.grade,
          collection: th.collection ?? h.collection,
        }
      }),
    }
  })
}

/**
 * Persist the user's language preference to localStorage.
 * @param {string} lang
 */
export function saveLanguagePreference(lang) {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // localStorage may be unavailable
  }
}

/**
 * Read the user's saved language preference.
 * @param {string} fallback
 * @returns {string}
 */
export function getLanguagePreference(fallback = 'en') {
  if (typeof localStorage === 'undefined') return fallback
  try {
    return localStorage.getItem(STORAGE_KEY) || fallback
  } catch {
    return fallback
  }
}

/**
 * UI string translations for the app interface.
 * These are small and bundled inline (no async load needed).
 */
export const UI_STRINGS = {
  en: {
    siteTitle: 'Riyad-us-Salihin - Gardens of the Righteous',
    pageTitleHome: 'Home - Riyad-us-Salihin',
    pageTitleAbout: 'About - Riyad-us-Salihin',
    headingRiyad: 'Riyad-us-Salihin',
    searchPlaceholder: 'Search hadith...',
    tableOfContents: 'Table of contents',
    openContents: 'Open table of contents',
    closeContents: 'Close contents',
    contents: 'Contents',
    chapters: 'chapters',
    filterChapters: 'Filter chapters...',
    noChaptersMatch: 'No chapters match',
    hadithLabel: 'Hadith',
    browsing: 'Browsing',
    commentary: 'Commentary',
    previousHadith: 'Previous hadith',
    nextHadith: 'Next hadith',
    hadithNavigation: 'Hadith navigation',
    noMatches: 'No matches found for your search',
    clearFilter: 'Clear filter',
    readingProgress: 'Reading Progress',
    noSavedPositions: 'No saved positions yet.',
    startReadingAutoSave: 'Start reading to auto-save.',
    progressNotSaved: 'Reading progress not being saved',
    active: 'Active',
    startNewSlot: 'Start new reading slot',
    replaceOldestSlot: 'Replace oldest slot',
    slotsUsed: 'slots used. Active slot auto-updates as you read.',
    installApp: 'Install App',
    gotIt: 'Got it',
    installIOS: 'To install this app on your iPhone/iPad:',
    installAndroid: 'To install this app on your device:',
    installStep1IOS: 'Tap the Share button at the bottom',
    installStep2IOS: 'Scroll down and tap "Add to Home Screen"',
    installStep3IOS: 'Tap "Add" to install',
    installStep1Android: 'Tap the menu button (3 dots) in Chrome',
    installStep2Android: 'Tap "Install app"',
    installStep3Android: 'Tap "Install" to confirm',
    aboutThisCollection: 'About this collection',
    backToHadiths: 'Back to Hadiths',
    aboutTitle: 'About This Collection',
    aboutTheBook: 'Riyad-us-Salihin',
    hadiths: 'Hadiths',
    chapters_: 'Chapters',
    books: 'Books',
    aboutDesc1: 'Riyad-us-Salihin is one of the most widely read and influential collections of hadith in the Islamic world.',
    authorTitle: 'Imam An-Nawawi',
    translationLabel: 'Translation & Commentary',
    translationDesc: 'English rendering and scholarly notes',
    acknowledgments: 'Acknowledgments',
    withGratitude: 'With gratitude',
    freeResource: 'This is a free resource for the Muslim community.',
    allPraise: 'All praise is due to Allah, Lord of the worlds.',
    changeLanguage: 'Change language',
    moreOptions: 'More options',
    aboutDesc2: "The collection covers a comprehensive range of topics essential to a Muslim's daily life, including sincerity, patience, gratitude, remembrance of Allah, good manners, family relations, social conduct, and the virtues of various acts of worship. Each chapter begins with relevant Quranic verses, followed by carefully selected hadiths that illuminate the topic.",
    aboutAuthorBio1: 'Imam Yahya ibn Sharaf an-Nawawi (رَحِمَهُ اللهُ) was born in the village of Nawa, near Damascus, Syria. He is regarded as one of the most influential scholars in Islamic history, particularly in the fields of hadith and Shafi\'i jurisprudence.',
    aboutAuthorBio2: 'Despite living only 45 years, Imam an-Nawawi produced an extraordinary body of work. His most famous contributions include:',
    aboutAuthorWork1: 'Riyad-us-Salihin — This collection of hadiths for daily guidance',
    aboutAuthorWork2: "Al-Arba'in an-Nawawiyyah — The Forty Hadiths, perhaps the most memorized hadith collection",
    aboutAuthorWork3: 'Sharh Sahih Muslim — A comprehensive commentary on Sahih Muslim',
    aboutAuthorWork4: "Al-Majmu' — An extensive work on Shafi'i jurisprudence",
    aboutAuthorBio3: 'Imam an-Nawawi was known for his piety, asceticism, and devotion to knowledge. He never married, dedicating his entire life to scholarship and worship. He passed away in his hometown of Nawa at the age of 45, leaving behind a legacy that continues to benefit Muslims worldwide.',
    aboutTransDesc1: 'The English translation and commentary used in this application is sourced from the work published by Muslims At Work Publications, a South African Islamic publishing house dedicated to making classical Islamic texts accessible to English-speaking audiences.',
    pubDetails: 'Publication Details',
    pubTitle: 'A Translation and Commentary of Riyad al-Salihin',
    pubVolumes: '3 Volumes (Hadith 1–1896)',
    pubEditor: 'General Editor:',
    pubPublisher: 'Muslims At Work Publications, South Africa',
    aboutTransDesc2: 'This translation features modern, accessible English while maintaining fidelity to the original Arabic. The commentary draws from classical scholars and provides context for contemporary readers, explaining the practical application of each hadith in daily life.',
    turkishSourcesTitle: 'Turkish Translation Sources',
    aboutAckIntro: 'We express our deepest gratitude to all those who have contributed to preserving and transmitting this sacred knowledge across generations:',
    ackBullet1: 'The scholars and hadith masters who preserved these prophetic traditions',
    ackBullet2: 'Imam an-Nawawi for his meticulous compilation and selection',
    ackBullet3: 'Muslims At Work Publications for their excellent translation and commentary',
    ackBullet4: 'Darussalam Publishers and Hafiz Salahuddin Yusuf for their inspiring commentary that first sparked this project',
    ackBullet5: 'All who have supported the creation of this digital resource',
    ackDua: 'May Allah reward them with goodness',
    nawaLocation: 'Nawa, Syria',
  },
  tr: {
    siteTitle: 'Riyad-us-Salihin - Salihlerin Bahçeleri',
    pageTitleHome: 'Ana Sayfa - Riyad-us-Salihin',
    pageTitleAbout: 'Hakkında - Riyad-us-Salihin',
    headingRiyad: 'Riyad-us-Salihin',
    searchPlaceholder: 'Hadis ara...',
    tableOfContents: 'İçindekiler',
    openContents: 'İçindekileri aç',
    closeContents: 'İçindekileri kapat',
    contents: 'İçindekiler',
    chapters: 'bölüm',
    filterChapters: 'Bölümleri filtrele...',
    noChaptersMatch: 'Eşleşen bölüm bulunamadı',
    hadithLabel: 'Hadis',
    browsing: 'Göz atıyor',
    commentary: 'Yorum',
    previousHadith: 'Önceki hadis',
    nextHadith: 'Sonraki hadis',
    hadithNavigation: 'Hadis gezinme',
    noMatches: 'Aramanızla eşleşen sonuç bulunamadı',
    clearFilter: 'Filtreyi temizle',
    readingProgress: 'Okuma İlerlemesi',
    noSavedPositions: 'Henüz kayıtlı konum yok.',
    startReadingAutoSave: 'Okumaya başlayın, otomatik kaydedilsin.',
    progressNotSaved: 'Okuma ilerlemesi kaydedilmiyor',
    active: 'Aktif',
    startNewSlot: 'Yeni okuma yuvası başlat',
    replaceOldestSlot: 'En eski yuvayı değiştir',
    slotsUsed: 'yuva kullanılıyor. Aktif yuva okurken otomatik güncellenir.',
    installApp: 'Uygulamayı Yükle',
    gotIt: 'Anladım',
    installIOS: 'Bu uygulamayı iPhone/iPad\'inize yüklemek için:',
    installAndroid: 'Bu uygulamayı cihazınıza yüklemek için:',
    installStep1IOS: 'Alttaki Paylaş düğmesine dokunun',
    installStep2IOS: 'Aşağı kaydırın ve "Ana Ekrana Ekle"ye dokunun',
    installStep3IOS: 'Yüklemek için "Ekle"ye dokunun',
    installStep1Android: 'Chrome\'da menü düğmesine (3 nokta) dokunun',
    installStep2Android: '"Uygulamayı yükle"ye dokunun',
    installStep3Android: 'Onaylamak için "Yükle"ye dokunun',
    aboutThisCollection: 'Bu Koleksiyon Hakkında',
    backToHadiths: 'Hadislere Dön',
    aboutTitle: 'Bu Koleksiyon Hakkında',
    aboutTheBook: 'Riyad-us-Salihin',
    hadiths: 'Hadis',
    chapters_: 'Bölüm',
    books: 'Kitap',
    aboutDesc1: 'Riyad-us-Salihin, İslam dünyasında en çok okunan ve en etkili hadis koleksiyonlarından biridir.',
    authorTitle: 'İmam Nevevî',
    translationLabel: 'Tercüme ve Yorum',
    translationDesc: 'İngilizce tercüme ve ilmi notlar',
    acknowledgments: 'Teşekkür',
    withGratitude: 'Şükranla',
    freeResource: 'Bu, Müslüman toplumu için ücretsiz bir kaynaktır.',
    allPraise: 'Hamd, alemlerin Rabbi olan Allah\'a mahsustur.',
    changeLanguage: 'Dili değiştir',
    moreOptions: 'Diğer seçenekler',
    aboutDesc2: 'Koleksiyon, Müslümanın günlük yaşamında gerekli olan geniş bir konu yelpazesini kapsamaktadır: samimiyetlik, sabır, şükür, Allah\'ın zikri, iyi ahlak, aile ilişkileri, sosyal davranışlar ve çeşitli ibadatlerin faziletleri. Her bölüm ilgili Kur\'an ayetleriyle başlar ve ardından konuyu aydınlatan dikkatli seçilmiş hadisler gelir.',
    aboutAuthorBio1: 'İmam Yahya ibn Şeref en-Nawawî (رَحِمَهُ اللهُ) Şam yakınlarındaki Nawa köyünde doğmuştur. İslam tarihinde, özellikle hadis ve Şâfî fakahati alanlarında en etkili âlimlerden biri olarak kabul edilmektedir.',
    aboutAuthorBio2: 'Sadece 45 yıl yaşamasına rağmen, İmam en-Nawawî olağanüstü bir eser koleksiyonu ortaya koymuştur. En ünlü katkıları şunlardır:',
    aboutAuthorWork1: 'Riyad-us-Salihin — Günlük rehberlik için hadislerin bu koleksiyonu',
    aboutAuthorWork2: "Al-Arba'in an-Nawawiyyah — Kırk Hadis, belki de en çok ezberlenen hadis koleksiyonu",
    aboutAuthorWork3: 'Sharh Sahih Muslim — Sahih Muslim üzerine kapsamlı bir şerh',
    aboutAuthorWork4: "Al-Majmu' — Şâfî fakahati hakkında geniş bir eser",
    aboutAuthorBio3: 'İmam en-Nawawî, takvası, zühdü ve bilime bağlılığı ile tanınmıştı. Hiç evlenmedi, tüm hayatını ilim ve ibadet hayatına adadı. 45 yaşında memleketinde Nawa\'da vefat etti ve mirasıyla bütün dünyada Müslümanları faydalandırmaya devam etmektedir.',
    aboutTransDesc1: 'Bu uygulamada kullanılan İngilizce çeviri ve tefsir, İngilizce konuşan halka klasik İslami metinleri erişilebilir kılmaya adanmış bir Güney Afrika İslami yayınevi olan Muslims At Work Publications tarafından yayınlanan eserden kaynaklanmaktadır.',
    pubDetails: 'Yayın Detayları',
    pubTitle: "Riyad al-Salihin'in Çevirisi ve Şerhi",
    pubVolumes: '3 Cilt (Hadis 1–1896)',
    pubEditor: 'Genel Editör:',
    pubPublisher: 'Muslims At Work Publications, Güney Afrika',
    aboutTransDesc2: 'Bu çeviri, orijinal Arapçaya sadakat korunurken modern ve anlaşılır bir sunum sunmaktadır. Tefsir klasik âlimlerden kaynaklanır ve çağdaş okuyuculara bağlam sağlar, her hadisin günlük hayattaki pratik uygulamasını açıklar.',
    turkishSourcesTitle: 'Türkçe Çeviri Kaynakları',
    aboutAckIntro: 'Bu kutsal bilgiyi nesiller boyunca koruyan ve ileten herkese en derin şükranlarımızı sunuyoruz:',
    ackBullet1: 'Bu peygamber hadislerini koruyan âlimler ve hadis ustalarına',
    ackBullet2: 'İmam en-Nawawî\'ye titiz derlemesi ve seçimi için',
    ackBullet3: 'Muslims At Work Publications\'a mükemmel çevirisi ve tefsiri için',
    ackBullet4: 'Darussalam Publishers\'a ve Hafiz Salahuddin Yusuf\'a ilham verici tefsiri için bu projeyi başlatan',
    ackBullet5: 'Bu dijital kaynağın oluşturulmasını destekleyen herkese',
    ackDua: 'Allah onları iyilikle mükâfatlandırsın',
    nawaLocation: 'Nawa, Suriye',
  },
  fr: {
    siteTitle: 'Riyad-us-Salihin - Jardins des Vertueux',
    pageTitleHome: 'Accueil - Riyad-us-Salihin',
    pageTitleAbout: 'À propos - Riyad-us-Salihin',
    headingRiyad: 'Riyad-us-Salihin',
    searchPlaceholder: 'Rechercher un hadith...',
    tableOfContents: 'Table des matières',
    openContents: 'Ouvrir la table des matières',
    closeContents: 'Fermer la table des matières',
    contents: 'Sommaire',
    chapters: 'chapitres',
    filterChapters: 'Filtrer les chapitres...',
    noChaptersMatch: 'Aucun chapitre ne correspond',
    hadithLabel: 'Hadith',
    browsing: 'Parcourir',
    commentary: 'Commentaire',
    previousHadith: 'Hadith précédent',
    nextHadith: 'Hadith suivant',
    hadithNavigation: 'Navigation des hadiths',
    noMatches: 'Aucun résultat trouvé pour votre recherche',
    clearFilter: 'Effacer le filtre',
    readingProgress: 'Progression de lecture',
    noSavedPositions: 'Aucune position sauvegardée.',
    startReadingAutoSave: 'Commencez à lire pour sauvegarder automatiquement.',
    progressNotSaved: 'Progression de lecture non sauvegardée',
    active: 'Actif',
    startNewSlot: 'Nouvel emplacement de lecture',
    replaceOldestSlot: 'Remplacer le plus ancien',
    slotsUsed: 'emplacements utilisés. L\'emplacement actif se met à jour automatiquement.',
    installApp: 'Installer l\'application',
    gotIt: 'Compris',
    installIOS: 'Pour installer cette application sur votre iPhone/iPad :',
    installAndroid: 'Pour installer cette application sur votre appareil :',
    installStep1IOS: 'Appuyez sur le bouton Partager en bas',
    installStep2IOS: 'Faites défiler et appuyez sur "Ajouter à l\'écran d\'accueil"',
    installStep3IOS: 'Appuyez sur "Ajouter" pour installer',
    installStep1Android: 'Appuyez sur le bouton menu (3 points) dans Chrome',
    installStep2Android: 'Appuyez sur "Installer l\'application"',
    installStep3Android: 'Appuyez sur "Installer" pour confirmer',
    aboutThisCollection: 'À propos de cette collection',
    backToHadiths: 'Retour aux Hadiths',
    aboutTitle: 'À propos de cette collection',
    aboutTheBook: 'Riyad-us-Salihin',
    hadiths: 'Hadiths',
    chapters_: 'Chapitres',
    books: 'Livres',
    aboutDesc1: 'Riyad-us-Salihin est l\'une des collections de hadiths les plus lues et influentes du monde islamique.',
    authorTitle: 'Imam An-Nawawi',
    translationLabel: 'Traduction et commentaire',
    translationDesc: 'Traduction anglaise et notes savantes',
    acknowledgments: 'Remerciements',
    withGratitude: 'Avec gratitude',
    freeResource: 'Ceci est une ressource gratuite pour la communauté musulmane.',
    allPraise: 'Toute louange est due à Allah, Seigneur des mondes.',
    changeLanguage: 'Changer la langue',
    moreOptions: 'Plus d\'options',
    aboutDesc2: "La collection couvre une gamme complète de sujets essentiels à la vie quotidienne d'un musulman, notamment la sincérité, la patience, la gratitude, le souvenir d'Allah, les bonnes manières, les relations familiales, la conduite sociale et les vertus de divers actes d'adoration. Chaque chapitre commence par des versets coraniques pertinents, suivis de hadiths soigneusement sélectionnés qui illuminent le sujet.",
    aboutAuthorBio1: "L'Imam Yahya ibn Sharaf an-Nawawi (رَحِمَهُ اللهُ) est né dans le village de Nawa, près de Damas, en Syrie. Il est considéré comme l'un des savants les plus influents de l'histoire islamique, particulièrement dans les domaines du hadith et de la jurisprudence shaféite.",
    aboutAuthorBio2: "Malgré sa vie de seulement 45 ans, l'Imam an-Nawawi a produit un corpus extraordinaire d'œuvres. Ses contributions les plus célèbres incluent :",
    aboutAuthorWork1: 'Riyad-us-Salihin — Cette collection de hadiths pour la guidance quotidienne',
    aboutAuthorWork2: "Al-Arba'in an-Nawawiyyah — Les Quarante Hadiths, peut-être la collection de hadith la plus mémorisée",
    aboutAuthorWork3: 'Sharh Sahih Muslim — Un commentaire complet sur Sahih Muslim',
    aboutAuthorWork4: "Al-Majmu' — Une œuvre étendue sur la jurisprudence shaféite",
    aboutAuthorBio3: "L'Imam an-Nawawi était connu pour sa piété, son ascétisme et son dévouement au savoir. Il ne s'est jamais marié, consacrant toute sa vie à l'érudition et à l'adoration. Il est décédé dans sa ville natale de Nawa à l'âge de 45 ans, laissant un héritage qui continue à bénéficier aux musulmans du monde entier.",
    aboutTransDesc1: "La traduction anglaise et le commentaire utilisés dans cette application proviennent de l'œuvre publiée par Muslims At Work Publications, une maison d'édition islamique sud-africaine dédiée à rendre les textes islamiques classiques accessibles aux lecteurs anglophones.",
    pubDetails: 'Détails de publication',
    pubTitle: 'Une traduction et un commentaire de Riyad al-Salihin',
    pubVolumes: '3 volumes (Hadith 1–1896)',
    pubEditor: 'Directeur général :',
    pubPublisher: 'Muslims At Work Publications, Afrique du Sud',
    aboutTransDesc2: "Cette traduction présente un anglais moderne et accessible tout en maintenant la fidélité à l'arabe original. Le commentaire s'inspire des savants classiques et fournit un contexte pour les lecteurs contemporains, expliquant l'application pratique de chaque hadith dans la vie quotidienne.",
    turkishSourcesTitle: 'Sources de traduction turque',
    aboutAckIntro: 'Nous exprimons notre gratitude la plus profonde à tous ceux qui ont contribué à préserver et à transmettre ce savoir sacré à travers les générations :',
    ackBullet1: 'Les savants et maîtres du hadith qui ont préservé ces traditions prophétiques',
    ackBullet2: "L'Imam an-Nawawi pour sa compilation et sa sélection méticuleuses",
    ackBullet3: 'Muslims At Work Publications pour leur excellente traduction et commentaire',
    ackBullet4: 'Darussalam Publishers et Hafiz Salahuddin Yusuf pour leur commentaire inspirant qui a initialement inspiré ce projet',
    ackBullet5: "Tous ceux qui ont soutenu la création de cette ressource numérique",
    ackDua: "Qu'Allah les récompense de bien",
    nawaLocation: 'Nawa, Syrie',
  },
  ur: {
    siteTitle: 'ریاض الصالحین - نیک لوگوں کے باغات',
    pageTitleHome: 'ہوم - ریاض الصالحین',
    pageTitleAbout: 'تعارف - ریاض الصالحین',
    headingRiyad: 'ریاض الصالحین',
    searchPlaceholder: 'حدیث تلاش کریں...',
    tableOfContents: 'فہرست مضامین',
    openContents: 'فہرست مضامین کھولیں',
    closeContents: 'فہرست بند کریں',
    contents: 'مضامین',
    chapters: 'ابواب',
    filterChapters: 'ابواب فلٹر کریں...',
    noChaptersMatch: 'کوئی باب نہیں ملا',
    hadithLabel: 'حدیث',
    browsing: 'مطالعہ',
    commentary: 'تشریح',
    previousHadith: 'پچھلی حدیث',
    nextHadith: 'اگلی حدیث',
    hadithNavigation: 'حدیث نیویگیشن',
    noMatches: 'آپ کی تلاش کے مطابق کوئی نتیجہ نہیں ملا',
    clearFilter: 'فلٹر ختم کریں',
    readingProgress: 'مطالعہ کی پیش رفت',
    noSavedPositions: 'ابھی تک کوئی پوزیشن محفوظ نہیں کی گئی۔',
    startReadingAutoSave: 'مطالعہ شروع کریں تاکہ خودکار محفوظ ہو جائے۔',
    progressNotSaved: 'مطالعہ کی پیش رفت محفوظ نہیں ہو رہی',
    active: 'فعال',
    startNewSlot: 'نیا مطالعہ سلاٹ شروع کریں',
    replaceOldestSlot: 'پرانے سلاٹ کو تبدیل کریں',
    slotsUsed: 'سلاٹس استعمال ہو چکے ہیں۔ جیسے جیسے آپ پڑھتے ہیں فعال سلاٹ خود بخود اپ ڈیٹ ہو جاتا ہے۔',
    installApp: 'ایپ انسٹال کریں',
    gotIt: 'ٹھیک ہے',
    installIOS: 'اپنے آئی فون/آئی پیڈ پر اس ایپ کو انسٹال کرنے کے لیے:',
    installAndroid: 'اپنے ڈیوائس پر اس ایپ کو انسٹال کرنے کے لیے:',
    installStep1IOS: 'نیچے شیئر بٹن پر ٹیپ کریں',
    installStep2IOS: 'نیچے اسکرول کریں اور "ہوم اسکرین پر شامل کریں" پر ٹیپ کریں',
    installStep3IOS: 'انسٹال کرنے کے لیے "شامل کریں" پر ٹیپ کریں',
    installStep1Android: 'کروم میں مینو بٹن (3 نقطے) پر ٹیپ کریں',
    installStep2Android: '"ایپ انسٹال کریں" پر ٹیپ کریں',
    installStep3Android: 'تصدیق کے لیے "انسٹال کریں" پر ٹیپ کریں',
    aboutThisCollection: 'اس مجموعہ کے بارے میں',
    backToHadiths: 'احادیث پر واپس جائیں',
    aboutTitle: 'اس مجموعہ کے بارے میں',
    aboutTheBook: 'ریاض الصالحین',
    hadiths: 'احادیث',
    chapters_: 'ابواب',
    books: 'کتب',
    aboutDesc1: 'ریاض الصالحین اسلامی دنیا میں سب سے زیادہ پڑھی جانے والی اور بااثر احادیث کے مجموعوں میں سے ایک ہے۔',
    authorTitle: 'امام النووی',
    translationLabel: 'ترجمہ اور تشریح',
    translationDesc: 'علمی ترجمہ اور تشریحی حواشی',
    acknowledgments: 'اظہار تشکر',
    withGratitude: 'انتہائی شکر گزاری کے ساتھ',
    freeResource: 'یہ مسلم کمیونٹی کے لیے ایک مفت ذریعہ ہے۔',
    allPraise: 'تمام تعریفیں اللہ ہی کے لیے ہیں، جو تمام جہانوں کا رب ہے۔',
    changeLanguage: 'زبان تبدیل کریں',
    moreOptions: 'مزید آپشنز',
    aboutDesc2: 'یہ مجموعہ مسلمان کی روزمرہ کی زندگی کے لیے ضروری وسیع موضوعات پر مشتمل ہے، جس میں خلوص، صبر، شکر گزاری، اللہ کی یادگاری، اچھے اخلاق، خاندانی تعلقات، معاشرتی رویے، اور مختلف عبادتوں کی فضیلت شامل ہے۔ ہر باب متعلقہ قرآنی آیات سے شروع ہوتا ہے، جس کے بعد احادیث جو موضوع کو روشن کرتی ہیں۔',
    aboutAuthorBio1: 'امام یحییٰ بن شرف النووی (رَحِمَهُ اللهُ) شام کے دمشق کے قریب نوا کی بستی میں پیدا ہوئے۔ وہ اسلامی تاریخ میں سب سے زیادہ اثر رکھنے والے علماء میں سے ایک سمجھے جاتے ہیں، خاص طور پر حدیث اور شافعی فقہ کے میدانوں میں۔',
    aboutAuthorBio2: 'صرف 45 سال کی عمر میں جینے کے باوجود، امام النووی نے کام کا ایک غیر معمولی ذخیرہ تیار کیا۔ ان کی سب سے مشہور شراکتوں میں شامل ہیں:',
    aboutAuthorWork1: 'ریاض الصالحین — روزمرہ کی ہدایت کے لیے احادیث کا یہ مجموعہ',
    aboutAuthorWork2: 'الاربعین النووی — چالیس احادیث، شاید احادیث کا سب سے زیادہ یادگار مجموعہ',
    aboutAuthorWork3: 'شرح صحیح مسلم — صحیح مسلم پر ایک جامع شرح',
    aboutAuthorWork4: 'المجموع — شافعی فقہ پر ایک وسیع کام',
    aboutAuthorBio3: 'امام النووی اپنی دینداری، ریاضت، اور علم کی عقیدت کے لیے معروف تھے۔ انہوں نے کبھی شادی نہیں کی، اپنی پوری زندگی علم اور عبادت کو وقف کر دی۔ وہ اپنے آبائی شہر نوا میں 45 سال کی عمر میں انتقال فرما گئے، ایک ایسی میراث چھوڑ گئے جو دنیا بھر کے مسلمانوں کو فائدہ پہنچانا جاری رکھے ہوئے ہے۔',
    aboutTransDesc1: 'اس ایپلیکیشن میں استعمال کیا جانے والا انگریزی ترجمہ اور شرح Muslims At Work Publications کی شائع کردہ کتاب سے لی گئی ہے، جو ایک جنوبی افریقی اسلامی ادارہ ہے جو کلاسیکی اسلامی متون کو انگریزی بولنے والے سامعین کے لیے سہل بنانے کے لیے وقف ہے۔',
    pubDetails: 'اشاعت کی تفصیلات',
    pubTitle: 'ریاض الصالحین کا ترجمہ اور شرح',
    pubVolumes: '3 جلدیں (حدیث 1–1896)',
    pubEditor: 'سردار مدیر:',
    pubPublisher: 'Muslims At Work Publications, جنوبی افریقہ',
    aboutTransDesc2: 'یہ ترجمہ جدید، قابل رسائی انگریزی پیش کرتا ہے جبکہ اصل عربی کے ساتھ وفادار رہتا ہے۔ شرح کلاسیکی علماء سے لی گئی ہے اور موجودہ قارئین کے لیے تناظر فراہم کرتی ہے، روزمرہ کی زندگی میں ہر حدیث کے عملی اطلاق کی وضاحت کرتی ہے۔',
    turkishSourcesTitle: 'ترکی ترجمے کے ذرائع',
    aboutAckIntro: 'ہم ان تمام لوگوں سے اپنی گہری شکرگزاری کا اظہار کرتے ہیں جنہوں نے نسل در نسل اس مقدس علم کو محفوظ رکھنے اور منتقل کرنے میں حصہ لیا ہے:',
    ackBullet1: 'علماء اور حدیث کے ماہرین جنہوں نے ان نبوی روایات کو محفوظ رکھا',
    ackBullet2: 'امام النووی اپنی محتاط ترتیب اور انتخاب کے لیے',
    ackBullet3: 'Muslims At Work Publications ان کے بہترین ترجمہ اور شرح کے لیے',
    ackBullet4: 'Darussalam Publishers اور Hafiz Salahuddin Yusuf ان کی متاثر کن شرح کے لیے جس نے اس منصوبے کو پہلی بار روشن کیا',
    ackBullet5: 'تمام وہ لوگ جنہوں نے اس ڈیجیٹل وسیلے کی تخلیق میں معاونت کی',
    ackDua: 'اللہ انہیں بھلائی کا انعام دے',
    nawaLocation: 'نوا، شام',
  },
}

/** Get UI string for a given language key */
export function ui(key, lang = 'en') {
  return UI_STRINGS[lang]?.[key] ?? UI_STRINGS['en'][key] ?? key
}
