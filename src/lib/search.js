/**
 * @param {string} query 
 * @param {Array<any>} data 
 * @returns {Array<any>}
 */
export const searchHadiths = (query, data) => {
    if (!query) return []
    const lowerQuery = query.toLowerCase().trim()
    const isNumeric = /^\d+$/.test(lowerQuery)
    const searchNumber = isNumeric ? parseInt(lowerQuery) : null

    /** @type {any[]} */
    let results = []

    data.forEach((/** @type {any} */ chapter) => {
        // Check if the chapter title matches (for "Search by chapter")
        const chapterMatches = chapter.title.toLowerCase().includes(lowerQuery) ||
            (chapter.arabicTitle && chapter.arabicTitle.toLowerCase().includes(lowerQuery))

        chapter.hadiths.forEach((/** @type {any} */ hadith) => {
            // 1. Exact Hadith # match
            const numberMatch = isNumeric && hadith.number === searchNumber

            // 2. Full text match (English, Arabic, Narrator, Commentary)
            const textMatch =
                (hadith.englishText && hadith.englishText.toLowerCase().includes(lowerQuery)) ||
                (hadith.narrator && hadith.narrator.toLowerCase().includes(lowerQuery)) ||
                (hadith.commentary && hadith.commentary.toLowerCase().includes(lowerQuery)) ||
                (hadith.arabicText && hadith.arabicText.toLowerCase().includes(lowerQuery))

            if (numberMatch || chapterMatches || textMatch) {
                results.push({
                    ...hadith,
                    chapterTitle: chapter.title,
                    arabicChapterTitle: chapter.arabicTitle,
                    introVerses: chapter.introVerses
                })
            }
        })
    })

    return results
}

/**
 * Get all bookmarked hadiths from localStorage.
 * 
 * @param {Array<any>} data The riyadusSalihin data array
 * @returns {Array<any>} A list of bookmarked hadith objects
 */
export const getBookmarks = (data) => {
    if (typeof window === 'undefined') return []
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')

    return data.flatMap(chapter =>
        chapter.hadiths
            .filter((/** @type {{ number: any; }} */ hadith) => bookmarks.includes(hadith.number))
            .map((/** @type {any} */ hadith) => ({ ...hadith, chapterTitle: chapter.title }))
    )
}
