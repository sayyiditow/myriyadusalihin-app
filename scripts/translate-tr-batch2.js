/**
 * Translate hadith text & commentary for chapters 4-30
 * Run: node scripts/translate-tr-batch2.js
 */
import { readFileSync, writeFileSync } from 'fs'

const fp = new URL('../src/lib/translations/tr.json', import.meta.url)
const tr = JSON.parse(readFileSync(fp, 'utf-8'))

const text = {
  "54": `Abdullah bin Mes'ud (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Doğruluk iyiliğe, iyilik de cennete götürür. Kişi doğru söylemeye devam ederse, Allah katında sıddîk (doğrulayıcı) olarak kaydedilir. Yalan söylemek günaha, günah da cehenneme götürür. Kişi yalan söylemeye devam ederse, Allah katında kezzâb (çok yalancı) olarak kaydedilir." (Buhârî, Müslim)`,
  "55": `Hasan bin Ali bin Ebû Tâlib (رضي الله عنهما) şöyle dedi: Resûlullah (ﷺ)'den şunu ezberledim: "Seni şüpheye düşüren şeyi bırak, şüphe vermeyene bak. Doğruluk kalbi rahatlatan bir tatminliktir, yalan ise şüphe ve huzursuzluktur." (Tirmizî, Nesâî, Ahmed)`,

  "60": `Ömer bin Hattâb (رضي الله عنه) şöyle anlatır: Bir gün Resûlullah (ﷺ)'in yanında otururken, elbisesi bembeyaz, saçı simsiyah bir adam çıkageldi. Üzerinde yolculuk eseri görünmüyordu. Kimse de onu tanımıyordu. Resûlullah (ﷺ)'in yanına gelip dizlerini onun dizlerine dayadı ve: "Ey Muhammed! Bana İslâm'ın ne olduğunu haber ver" dedi. Resûlullah (ﷺ) şöyle buyurdu: "İslâm, Allah'tan başka ilah olmadığına ve Muhammed'in Allah'ın Resûlü olduğuna şehadet etmen, namazı kılman, zekâtı vermen, Ramazan orucunu tutman ve gücün yeterse Kâbe'yi haccetmendir." Adam: "Doğru söyledin" dedi. Sonra "Bana imanı haber ver" dedi. Resûlullah (ﷺ): "Allah'a, meleklerine, kitaplarına, peygamberlerine, ahiret gününe ve hayır ve şerrin Allah'tan olduğuna kader inancına iman etmendir" buyurdu. Adam: "Bana ihsanı haber ver" dedi. Resûlullah (ﷺ): "Allah'ı görüyormuş gibi ibadet etmendir. Sen O'nu görmesen de O seni görür" buyurdu. Adam: "Kıyameti haber ver" dedi. Resûlullah (ﷺ): "Bu konuda kendisine sorulan, sorandan daha bilgili değildir" buyurdu. Bunun üzerine adam kalkıp gitti. Resûlullah (ﷺ) bana: "Ey Ömer, soruyu soranın kim olduğunu biliyor musun?" dedi. Ben: "Allah ve Resûlü daha iyi bilir" dedim. Resûlullah (ﷺ): "O Cebrail'di; size dininizi öğretmek için geldi" buyurdu. (Müslim)`,
  "62": `Abdullah bin Abbâs (رضي الله عنهما) şöyle anlatır: Bir gün Resûlullah (ﷺ)'in bineğinin arkasında idim. Bana şöyle buyurdu: "Ey çocuk! Sana bazı sözler öğreteceğim: Allah'ı gözet ki Allah da seni gözetsin. Allah'ı gözet ki O'nu yanında bulasın. Bir şey istediğinde Allah'tan iste. Yardım dilediğinde Allah'tan dile. Şunu bil ki bütün toplumlar sana fayda vermek için bir araya gelseler, Allah'ın senin için yazdığından başka bir fayda veremezler. Yine bütün toplumlar sana zarar vermek için bir araya gelseler, Allah'ın senin için yazdığından başka bir zarar veremezler. Kalemler kaldırılmış, sahifeler kurumuştur." (Tirmizî, Ahmed)`,

  "69": `Ebû Hüreyre (رضي الله عنه) şöyle anlatır: Resûlullah (ﷺ)'e: "İnsanların en şereflisi kimdir?" diye soruldu. Resûlullah (ﷺ): "Allah'tan en çok korkanınızdır" buyurdu. (Buhârî, Müslim)`,
  "86": `Ebû Hüreyre (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Orta yolu tutun ve istikamet üzere olun. Bilin ki hiçbiriniz ameliyle kurtulamaz." Sahâbîler: "Sen de mi ey Allah'ın Resûlü?" dediler. Resûlullah (ﷺ): "Ben de, ancak Allah'ın rahmetiyle kuşatılmam sayesinde kurtulurum" buyurdu. (Müslim)`,
  "87": `Ebû Hüreyre (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Karanlık gecenin parçaları gibi fitneler gelmeden önce hayırlı işlerde acele edin. O gün kişi mümin olarak sabahlayıp kâfir olarak akşamlar veya mümin olarak akşamlayıp kâfir olarak sabahlar. Dinini dünyalık bir menfaat karşılığında satar." (Müslim)`,
  "88": `Ukbe bin Hâris (رضي الله عنه) şöyle anlatır: Resûlullah (ﷺ)'in arkasında Medine'de ikindi namazını kıldım. Namazı bitirince hızla sıraların arasından geçip hanımlarının odalarına doğru yürüdü. Bu hareketi insanları telaşlandırdı. Resûlullah (ﷺ) dönünce, insanların telaşlandığını görünce şöyle buyurdu: "Sizi telaşlandıran bir şey hatırladım. Odada bir miktar altın bulunduğunu hatırladım ve dağıtılmasını emretmek istedim." (Buhârî)`,
  "89": `Câbir (رضي الله عنه) şöyle anlatır: Uhud Savaşı günü bir adam Resûlullah (ﷺ)'e: "Eğer öldürülürsem nerede olurum?" diye sordu. Resûlullah (ﷺ): "Cennette" buyurdu. Adam elindeki birkaç hurmayı atıp savaşa katıldı ve şehid oldu. (Buhârî, Müslim)`,
  "90": `Ebû Hüreyre (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Allah yolunda savaşan bir mücahide benzeyen kimse yoktur." (Buhârî, Müslim)`,
  "91": `Enes (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Kim doğrulukla Allah'tan cenneti üç kere dilerse, cennet 'Allah'ım, onu cennete koy' der. Kim de cehennemden üç kere Allah'a sığınırsa, cehennem 'Allah'ım, onu cehennemden koru' der." (Tirmizî, İbn Mâce, Nesâî, İbn Hibbân, Hâkim)`,
  "92": `Ebû Saîd el-Hudrî (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Ey Ebû Saîd! Kim Allah'ın rızasını isteyerek O'na yönelirse, Allah bu dünyada rızkına kefil olur ve onu ahirette de ödüllendirir." (Buhârî, Müslim)`,
  "95": `Ebû Hüreyre (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Allah (ﷻ) şöyle buyurdu: 'Benim velî kuluma düşmanlık edene ben savaş açarım. Kulumu, kendisine farz kıldığım şeylerden daha sevimli bir şeyle bana yaklaşamaz. Kulum nafile ibadetlerle bana yaklaşmaya devam eder, ta ki onu severim. Onu sevdiğim zaman, işiten kulağı, gören gözü, tutan eli ve yürüyen ayağı olurum. Benden bir şey dilerse mutlaka veririm, bana sığınırsa mutlaka onu korurum.'" (Buhârî)`,
  "96": `Enes (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Allah (ﷻ) buyurur ki: 'Kulum bana bir karış yaklaşırsa, ben ona bir arşın yaklaşırım. Bana bir arşın yaklaşırsa, ben ona bir kulaç yaklaşırım. Bana yürüyerek gelirse, ben ona koşarak gelirim.'" (Buhârî)`,
  "97": `Abdullah bin Abbâs (رضي الله عنهما) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "İki nimet vardır ki insanların çoğu onların kıymetini bilmez: Sağlık ve boş zaman." (Buhârî)`,
  "112": `Ebû Hüreyre (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Allah, ömrünü uzatıp da hayır yapmayana özür bırakmamıştır." (Buhârî, Müslim)`,
  "117": `Ebû Zer (رضي الله عنه) şöyle anlatır: Dedim ki: "Ey Allah'ın Resûlü! Hangi amel daha faziletlidir?" Resûlullah (ﷺ): "Allah'a iman ve O'nun yolunda cihad" buyurdu. Dedim ki: "Hangi köle azat etmek daha faziletlidir?" Resûlullah (ﷺ): "Sahibinin yanında en değerli ve fiyatı en yüksek olanı" buyurdu. Dedim ki: "Ya hiçbir şey yapamazsam?" Resûlullah (ﷺ): "Bir iş yapana yardım edersin veya bir iş yapamayana yardımcı olursun" buyurdu. Dedim ki: "Ya bunu da yapamazsam?" Resûlullah (ﷺ): "İnsanlara zarar vermezsin; çünkü bu da senin için bir sadakadır" buyurdu. (Buhârî, Müslim)`,
  "118": `Ebû Zer (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Her birinizin her gün her eklemi için bir sadaka gerekir. Her sübhanallah bir sadakadır, her elhamdülillah bir sadakadır, her la ilahe illallah bir sadakadır, her Allahu ekber bir sadakadır. İyiliği emretmek ve kötülükten sakındırmak bir sadakadır. Kuşluk vaktinde kılınan iki rekat namaz da bunların hepsine yeter." (Müslim)`,
  "125": `Ebû Hüreyre (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Güneşin doğduğu her yeni günde, kişinin her eklemi için bir sadaka gerekir. İki kişi arasında adaletle hükmetmek bir sadakadır. Binmek isteyene yardım etmek veya yükünü yüklemek bir sadakadır. Güzel söz bir sadakadır. Namaz kılmak için atılan her adım bir sadakadır. Yoldan eziyet veren bir şeyi kaldırmak bir sadakadır." (Buhârî, Müslim)`,
  "142": `Âişe (رضي الله عنها) şöyle anlatır: Resûlullah (ﷺ) yanında bir kadın olduğu halde Âişe'ye geldi ve: "Bu kim?" diye sordu. Âişe: "Falan kadındır, uykusunu (namazını) anlatıyor" dedi. Resûlullah (ﷺ) bu söz üzerine şöyle buyurdu: "Amellerinizden gücünüzün yettiğini yapın. Allah usanmaz, ama siz usanırsınız." (Buhârî, Müslim)`,
  "143": `Enes (رضي الله عنه) şöyle anlatır: Resûlullah (ﷺ)'in hanımlarının odalarına üç kişi gelerek Resûlullah (ﷺ)'in ibadetini sordular. Kendilerine haber verilince, ibadeti azımsayarak: "Biz Resûlullah (ﷺ)'e nereden yetişeceğiz? O'nun geçmiş ve gelecek günahları bağışlanmıştır" dediler. İçlerinden biri: "Ben gece boyunca namaz kılarım" dedi. Diğeri: "Ben hiç iftar etmeden (aralıksız) oruç tutarım" dedi. Üçüncüsü: "Ben kadınlardan uzak durur ve hiç evlenmem" dedi. Bunun üzerine Resûlullah (ﷺ) gelip şöyle buyurdu: "Siz şöyle şöyle diyenlersiniz. Allah'a yemin ederim ki, ben sizin Allah'tan en çok korkanınız ve O'ndan en çok sakınanınızım. Fakat bazı günler oruç tutar, bazı günler iftar ederim. Namaz kılar ve uyurum. Kadınlarla da evlenirim. Kim benim sünnetimden yüz çevirirse, benden değildir." (Buhârî, Müslim)`,
  "144": `İbn Mes'ud (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Kendilerine aşırı yüklenenler helâk oldu" - bunu üç kere tekrarladı. (Müslim)`,
  "153": `Ömer bin Hattâb (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Kim gece ibadetinden bir bölümü uyuyarak kaçırırsa, onu sabah ile öğle arasında kılsın; böylece onu yapmış gibi sevap alır." (Müslim)`,
  "155": `Âişe (رضي الله عنها) şöyle dedi: Resûlullah (ﷺ), hastalık veya başka bir sebeple gece namazını kaçırdığında, gündüz on iki rekât kılardı. (Müslim)`,
}

const commentary = {
  "54": `Doğruluk (sıdk), İslâm'ın temel ahlâkî prensiplerinden biridir. Kişi doğru söylediğinde, bu onu iyiliğe ve sonunda cennete götürür. Yalan ise kişiyi günaha ve sonunda cehenneme sürükler. Doğruluk bir alışkanlık haline gelmeli, kişi her durumda doğruyu söylemelidir.`,
  "55": `Kişi, helâl-haram konusunda şüpheye düştüğünde, şüpheli olandan kaçınmalı ve gönül rahatlığıyla yapabileceği şeye yönelmelidir. Bu hadis, dinin özünü anlamak için önemli bir prensiptir.`,
  "60": `Bu hadis, "Cibril Hadisi" olarak bilinir ve İslâm, iman, ihsan ve kıyamet alametleri olmak üzere dinin temel esaslarını özetler. Müslüman, dinini bu dört temel üzerine inşa etmelidir. Cebrail'in farklı kılıklarda gelmesi, meleklerin insan suretine girebileceğini gösterir.`,
  "62": `Bu hadis, Allah'a karşı sorumluluk bilincini (takvâ) ve O'na güvenmeyi (tevekkül) öğretir. Kişi, Allah'ın kaderine iman etmeli ve O'ndan başka kimseden korkmamalıdır. Allah'ı gözeten kişiyi Allah da korur ve kollar.`,
  "69": `İnsanlar arasında üstünlük, soy veya makamla değil, ancak takvâ iledir. Allah katında en değerli olan, O'ndan en çok korkan ve emirlerine en çok uyandır.`,
  "86": `Kurtuluş, amellerle değil, Allah'ın rahmetiyledir. Müslüman, aşırılığa kaçmadan orta yolu tutmalı ve istikamet üzere olmalıdır. Amellerde süreklilik, miktardan daha önemlidir.`,
  "87": `Fitneler gelmeden önce hayırlı işlere koşmak gerekir. Fitne zamanlarında dinini korumak zorlaşır. Kişi, dünyalık menfaatler uğruna dinini satmamalıdır.`,
  "88": `Peygamber (ﷺ)'in dünya malına değer vermediğini ve hemen dağıtmak istediğini gösterir. Sadaka ve zekâtın geciktirilmeden verilmesi gerekir.`,
  "89": `Cennet arzusu, dünyalık her şeyden üstün tutulmalıdır. Şehitlik, Allah katında en yüksek mertebelerden biridir.`,
  "90": `Allah yolunda cihad etmek veya savaşa katılmak, en faziletli amellerdendir. Cihada katılamayan, niyetiyle sevap alabilir.`,
  "91": `Dua ve niyazın gücünü gösterir. Kişi, cenneti istemeli ve cehennemden Allah'a sığınmalıdır. Samimi dua, kabul olunur.`,
  "92": `Rızık endişesi taşımayıp Allah'a yönelen kişinin rızkına Allah kefildir. Dünya ve ahiret dengesi gözetilmelidir.`,
  "95": `Bu, Velâyet Hadisi olarak bilinir. Allah'ın sevdiği kulları (evliyâ) vardır. Farz ibadetler en önemlisidir, nafileler ise kişiyi Allah'a yaklaştırır. Allah bir kulu sevdiğinde, onun tüm uzuvlarını hayırda kullanır.`,
  "96": `Allah'ın rahmeti ve yakınlığı sonsuzdur. Kulumuz O'na ne kadar yaklaşırsa, O da kuluna daha fazla yaklaşır. Bu, Allah'ın lütuf ve kereminin bir ifadesidir.`,
  "97": `Sağlık ve boş vakit, değeri bilinmeyen iki büyük nimettir. Kişi bu iki nimeti Allah yolunda kullanmalı, gafletle geçirmemelidir.`,
  "112": `Uzun ömür, kişiye daha fazla ibadet ve hayır yapma fırsatı verir. Bu fırsatı değerlendirmeyenler için özür yoktur.`,
  "117": `Amellerin fazileti konusunda önemli bir hadistir. Herkes gücüne göre hayır işlemeli, yapamadığında başkalarına yardım etmeli veya en azından kimseye zarar vermemelidir.`,
  "118": `Sadaka sadece mal ile olmaz; zikir, iyiliği emretmek, kötülükten sakındırmak ve hatta güzel söz söylemek bile sadakadır. Kuşluk namazı (duhâ) bütün bu sadakaların yerine geçer.`,
  "125": `Her gün için şükür gereklidir. Hizmet, yardım, güzel söz ve çevre temizliği gibi basit işler bile sadaka sayılır. Bir Müslüman, günlük hayatının her anında sevap kazanabilir.`,
  "142": `İbadette aşırılıktan kaçınmak esastır. Kişi gücünün yettiği kadar ibadet etmeli, kendini zorlamamalıdır. Amelde süreklilik, az da olsa önemlidir.`,
  "143": `Bu hadis, sünnete uymanın önemini vurgular. Resûlullah (ﷺ)'in sünneti, aşırılıklardan uzak, dengeli bir hayat tarzıdır. Sürekli ibadet için oruç tutmamak, gece namazı kılıp uyumak ve evlenmek sünnettir. Dinde aşırılık yasaklanmıştır.`,
  "144": `Dinde aşırı gitmek ve kendine gereksiz yere zorluk çıkarmak yasaklanmıştır. Müslüman, orta yolu izlemeli ve aşırılıklardan kaçınmalıdır.`,
  "153": `Gece namazı (teheccüd) kaçırıldığında, gündüz kaza edilebilir ve aynı sevap alınır. Bu, Allah'ın kolaylık dileyen dininin bir göstergesidir.`,
  "155": `Peygamber (ﷺ) kaçırdığı gece namazını gündüz kaza ederdi. Zamanında kılınamayan nâfile namazların kazası müstehaptır.`,
}

// Apply
for (const [num, t] of Object.entries(text)) {
  if (tr.hadiths[num]) tr.hadiths[num].text = t
}
for (const [num, c] of Object.entries(commentary)) {
  if (tr.hadiths[num]) tr.hadiths[num].commentary = c
}

writeFileSync(fp, JSON.stringify(tr, null, 2) + '\n', 'utf-8')
console.log(`✓ Batch 2: ${Object.keys(text).length} texts + ${Object.keys(commentary).length} commentaries translated`)
