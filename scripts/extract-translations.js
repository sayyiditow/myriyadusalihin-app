/**
 * Extracts all translatable English text from content.js into a JSON file
 * structured for translators. Run with:
 *   node scripts/extract-translations.js
 */
import { riyadusSalihin } from '../src/lib/content.js'
import { writeFileSync } from 'fs'

const extracted = {
  meta: {
    generated: new Date().toISOString(),
    totalChapters: riyadusSalihin.length,
    totalHadiths: riyadusSalihin.reduce((s, c) => s + c.hadiths.length, 0),
  },
  chapters: {},
  hadiths: {},
}

for (const chapter of riyadusSalihin) {
  const cid = String(chapter.id)

  // Chapter title
  extracted.chapters[cid] = {
    title: chapter.title,
  }

  // Intro verses
  if (chapter.introVerses?.length) {
    extracted.chapters[cid].introVerses = chapter.introVerses.map((v) => ({
      reference: v.reference,
      text: v.englishText,
    }))
  }

  // Hadiths
  for (const hadith of chapter.hadiths) {
    const hid = String(hadith.number)
    extracted.hadiths[hid] = {
      narrator: hadith.narrator,
      text: hadith.englishText,
      commentary: hadith.commentary || '',
      grade: hadith.grade || '',
      collection: hadith.collection || '',
    }
  }
}

writeFileSync(
  new URL('../src/lib/translations/en.json', import.meta.url),
  JSON.stringify(extracted, null, 2),
  'utf-8',
)

console.log(
  `Extracted ${Object.keys(extracted.chapters).length} chapters and ${Object.keys(extracted.hadiths).length} hadiths → src/lib/translations/en.json`,
)
