/**
 * Translate broken Turkish hadiths from English source via Anthropic API.
 *
 * USAGE:
 *   1. Add ANTHROPIC_API_KEY to .env.local
 *   2. bun run scripts/translate-broken-tr.js
 *
 * The script:
 *   - Detects which hadiths in tr.json are still broken (English residue, "bütünāh" etc.)
 *   - For each, uses Claude Sonnet 4.6 to translate text + commentary to scholarly Turkish
 *   - Writes results incrementally to .progress.json so you can resume mid-run
 *   - Merges into tr.json at the end (and on Ctrl-C)
 *
 * Style: matches the existing translated chapters (1-15) — preserves (ﷺ), (ﷻ),
 * (رضي الله عنه), uses Turkish religious vocabulary (Resûlullah, hadis, sahâbî, etc.).
 */
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { config } from 'dotenv'

config({ path: '.env.local' })

const API_KEY = process.env.ANTHROPIC_API_KEY
if (!API_KEY) {
    console.error('ERROR: Set ANTHROPIC_API_KEY in .env.local')
    process.exit(1)
}

const MODEL = 'claude-sonnet-4-6'
const BATCH_SIZE = 5  // hadiths per API call (text + commentary per hadith)
const CONCURRENCY = 3  // parallel batches

const TR_PATH = new URL('../src/lib/translations/tr.json', import.meta.url)
const EN_PATH = new URL('../src/lib/translations/en.json', import.meta.url)
const PROGRESS_PATH = new URL('./translate-broken-tr.progress.json', import.meta.url)

const tr = JSON.parse(readFileSync(TR_PATH, 'utf-8'))
const en = JSON.parse(readFileSync(EN_PATH, 'utf-8'))

// Detect broken hadiths
function isBroken(h) {
    const full = (h.text || '') + ' ' + (h.commentary || '')
    if (full.includes('bütünāh')) return true
    if (full.includes('(Müslüman)')) return true
    const enWords = full.match(/\b(the|and|of|to|in|was|is|with|from|will|that|for|said|asked|replied)\b/gi)
    return enWords && enWords.length > 6
}

const brokenIds = []
for (let n = 1; n <= 1896; n++) {
    if (isBroken(tr.hadiths[n])) brokenIds.push(n)
}
console.log(`Found ${brokenIds.length} broken hadiths to translate`)

// Load progress (resume support)
let progress = {}
if (existsSync(PROGRESS_PATH)) {
    progress = JSON.parse(readFileSync(PROGRESS_PATH, 'utf-8'))
    console.log(`Resuming — ${Object.keys(progress).length} already translated`)
}

const todo = brokenIds.filter((n) => !progress[n])
console.log(`Remaining: ${todo.length}`)

const SYSTEM_PROMPT = `Sen, Riyâdü's-Sâlihîn hadis kitabının Türkçe çevirisi üzerinde çalışan bir İslâmî metin çevirmenisin.

Görevin: Sağlanan İngilizce hadis metinlerini ve şerhlerini hatasız, doğal Türkçeye çevirmek. Çeviri tarzı:

- "Resûlullah (ﷺ)" / "Peygamber (ﷺ)" — "Messenger of Allah" karşılığı; (ﷺ) işareti aynen korunur.
- "Allah Teâlâ" / "Allah (ﷻ)" — Tanrı karşılığı; (ﷻ) işareti aynen korunur.
- "(رضي الله عنه)" / "(رضي الله عنها)" / "(رضي الله عنهما)" — sahâbî isimlerinden sonra; aynen korunur.
- "(عليه السلام)" — peygamber isimlerinden sonra; aynen korunur.
- Sahâbî/peygamber/yer adlarını Türkçe transliterasyonlarıyla yaz: Ebû Hüreyre, Hz. Âişe, Ömer, Buhârî, Müslim, Mekke-i Mükerreme, Medîne-i Münevvere, vb.
- Hadis collection adları: "(Buhârî, Müslim)", "(Tirmizî)", "(Ebû Dâvûd)", "(Nesâî)", "(İbn Mâce)" — orijinaldeki gibi.
- Dînî terimler: namaz, oruç, zekât, sadaka, hac, cihâd, îmân, ihlâs, takvâ, tövbe, sabır, hadis, âyet, Kur'ân, sünnet, cennet, cehennem, melek, peygamber, sahâbî, ümmet, hicret, sahih, hasen, vb.
- Âyet referansları (Bakara, 2/153 gibi) Türkçe surah adlarıyla.

Çıktı formatı: SADECE JSON. Her hadis için { "<id>": { "text": "...", "commentary": "..." } } şeklinde. Açıklama veya yorum ekleme.`

async function translateBatch(items) {
    const userInput = JSON.stringify(items, null, 2)
    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            model: MODEL,
            max_tokens: 16000,
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: 'user',
                    content: `Aşağıdaki hadis metinlerini ve şerhlerini Türkçeye çevir. Sadece JSON çıktısı ver:\n\n${userInput}`,
                },
            ],
        }),
    })
    if (!res.ok) {
        const errText = await res.text()
        throw new Error(`API error ${res.status}: ${errText}`)
    }
    const data = await res.json()
    const text = data.content[0].text
    // Extract JSON object (model may add ```json fences)
    const m = text.match(/\{[\s\S]*\}/)
    if (!m) throw new Error(`No JSON in response: ${text.substring(0, 500)}`)
    return JSON.parse(m[0])
}

function saveProgress() {
    writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2))
}

function mergeIntoTrJson() {
    for (const [id, val] of Object.entries(progress)) {
        if (tr.hadiths[id]) {
            tr.hadiths[id].text = val.text
            tr.hadiths[id].commentary = val.commentary
        }
    }
    writeFileSync(TR_PATH, JSON.stringify(tr, null, 2) + '\n')
    console.log(`Merged ${Object.keys(progress).length} translations into tr.json`)
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nSIGINT — saving progress and merging...')
    saveProgress()
    mergeIntoTrJson()
    process.exit(0)
})

// Process in batches with concurrency
async function processBatch(batchIds) {
    const items = {}
    for (const id of batchIds) {
        items[id] = {
            text: en.hadiths[id].text,
            commentary: en.hadiths[id].commentary || '',
        }
    }
    try {
        const result = await translateBatch(items)
        for (const id of batchIds) {
            if (result[id] && result[id].text) {
                progress[id] = result[id]
            } else {
                console.warn(`  WARN: no translation returned for h${id}`)
            }
        }
        saveProgress()
        console.log(`✓ batch done (${batchIds.join(', ')}) — total: ${Object.keys(progress).length}/${brokenIds.length}`)
    } catch (e) {
        console.error(`✗ batch failed (${batchIds.join(', ')}): ${e.message}`)
    }
}

async function main() {
    // Chunk todo into batches
    const batches = []
    for (let i = 0; i < todo.length; i += BATCH_SIZE) {
        batches.push(todo.slice(i, i + BATCH_SIZE))
    }
    console.log(`Total batches: ${batches.length}; concurrency: ${CONCURRENCY}`)

    // Process with concurrency
    let idx = 0
    async function worker() {
        while (idx < batches.length) {
            const b = batches[idx++]
            await processBatch(b)
        }
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()))

    mergeIntoTrJson()
    console.log('Done.')
}

main().catch((e) => {
    console.error('Fatal:', e)
    saveProgress()
    process.exit(1)
})
