import { readFileSync, writeFileSync } from 'fs'

const f = 'src/lib/translations/tr.json'
const tr = JSON.parse(readFileSync(f, 'utf-8'))

const fixes = {
  '64__Surah Āl \'Imrān, 92': 'Sevdiğiniz şeylerden infak etmedikçe iyiliğe eremezsiniz. Her ne infak ederseniz, Allah onu hakkıyla bilir.',
  '65__Surah al-Naḥl, 61': 'Eğer Allah, insanları zulümleri yüzünden cezalandırsaydı, yeryüzünde hiçbir canlı bırakmazdı. Fakat onları belirli bir süreye kadar erteler. Ecelleri geldiğinde ne bir an geri kalırlar ne de ileri gidebilirler.',
  '69__Surah al-Dhāriyāt, 50': 'Öyleyse Allah\'a kaçın (O\'na sığının). Şüphesiz ben, O\'nun tarafından sizi açıkça uyaran biriyim.',
  '72__Sūrah al-Qaṣaṣ, 76-81': 'Karun, Mûsâ\'nın kavmindendi ve onlara karşı azgınlık etti. Ona öyle hazineler vermiştik ki anahtarları güçlü bir topluluğa ağır gelirdi. Kavmi ona: "Şımarma, Allah şımaranları sevmez" dedi.',
  '80__Sūrah al-Nisā\', 59': 'Ey iman edenler! Allah\'a itaat edin, Peygamber\'e itaat edin ve sizden olan emir sahiplerine itaat edin. Eğer bir konuda anlaşmazlığa düşerseniz, onu Allah\'a ve Resûl\'e döndürün.',
  '87__Sūrah al-Ḥadīd, 57: 27': 'Onu gereği gibi gözetmediler.',
  '187__Sūrah al-\'Ankabūt, 29:45': 'Şüphesiz namaz, hayâsızlıktan ve kötülükten alıkoyar. Allah\'ı anmak elbette en büyüktür. Allah yaptıklarınızı bilir.',
  '193__Sūrah al-Baqarah, 2:238': 'Namazlara ve orta namaza devam edin. Allah için saygıyla kalkıp namaz kılın.',
  '244__Surah al-\'Ankabut, 45': 'Şüphesiz namaz, hayâsızlıktan ve kötülükten alıkoyar. Allah\'ı anmak elbette en büyüktür. Allah yaptıklarınızı bilir.'
}

let count = 0
for (const [cid, ch] of Object.entries(tr.chapters)) {
  if (!ch.introVerses) continue
  for (const v of ch.introVerses) {
    const key = cid + '__' + v.reference
    if (fixes[key]) {
      v.text = fixes[key]
      count++
    }
  }
}
writeFileSync(f, JSON.stringify(tr, null, 2) + '\n', 'utf-8')
console.log('Fixed ' + count + ' verses')
