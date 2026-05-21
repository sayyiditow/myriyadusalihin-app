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
  { code: 'ur', label: 'Urdu', shortLabel: 'UR', dir: 'rtl' },
]

const STORAGE_KEY = 'preferred_language'

/** Cache loaded translation data so we only fetch each language once */
const translationCache = {}

/**
 * Load translation data for a given language code.
 * @param {'en'|'tr'|'fr'|'sw'|'cr'|'ur'} lang
 * @returns {Promise<object|null>} Translation data, or null for English
 */
export async function loadTranslations(lang) {
  if (lang === 'en') return null
  if (translationCache[lang]) return translationCache[lang]
  const mod = await import(`./${lang}.json`)
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
  },
}

/** Get UI string for a given language key */
export function ui(key, lang = 'en') {
  return UI_STRINGS[lang]?.[key] ?? UI_STRINGS['en'][key] ?? key
}
