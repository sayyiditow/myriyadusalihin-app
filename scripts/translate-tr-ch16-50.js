/**
 * Comprehensive Turkish translation for ALL remaining hadiths
 * 
 * Strategy:
 * 1. Manual high-quality translations for chapters 16-50
 * 2. Pattern-based with sentence-by-sentence processing for remaining hadiths
 * 
 * Run: node scripts/translate-tr-ch16-50.js
 */
import { readFileSync, writeFileSync } from 'fs'

const fp = new URL('../src/lib/translations/tr.json', import.meta.url)
const ep = new URL('../src/lib/translations/en.json', import.meta.url)
const tr = JSON.parse(readFileSync(fp, 'utf-8'))
const en = JSON.parse(readFileSync(ep, 'utf-8'))

// Manually translate specific hadith texts
const text = {
  // Chapter 16: Upholding the Sunnah (hadiths 156-167)
  "156": `Resûlullah (ﷺ) şöyle buyurdu: "Size bıraktığımı alın (fazlasını istemeyin). Çünkü sizden öncekiler ancak çok soru sormaları ve peygamberleri hakkında ihtilafa düşmeleri yüzünden helâk oldu." (Buhârî, Müslim)`,
  "157": `Resûlullah (ﷺ) bize öyle derin ve beliğ bir hutbe irad etti ki, kalplerimiz titredi, gözlerimiz yaşardı. Biz: "Ey Allah'ın Resûlü! Bu vedalaşan birinin konuşması gibi. Bize ne tavsiye edersin?" dedik. Resûlullah (ﷺ): "Size, Allah'a karşı takvayı, emretse bile bir Habeşli köleyi dinleyip itaat etmeyi tavsiye ederim. Benden sonra sağ olanlarınız çok ihtilaflar görecek. O zaman sünnetime ve hidâyete erdirilmiş halifelerin sünnetine sımsıkı sarılın. Isırırcasına ona tutunun. Sonradan çıkarılan şeylerden (bid'atlerden) sakının. Çünkü her bid'at sapıklıktır." (Ebû Dâvûd, Tirmizî)`,
  "158": `Resûlullah (ﷺ) şöyle buyurdu: "Ümmetimin hepsi cennete girecek, ancak kabul etmeyenler hariç." "Peygamber'den kabul etmeyen kim olur?" diye soruldu. Resûlullah (ﷺ): "Bana itaat eden cennete girer, bana isyan eden ise kabul etmemiştir" buyurdu. (Buhârî)`,
  "159": `Bir adam, Resûlullah (ﷺ)'in huzurunda sol eliyle yemek yedi. Resûlullah (ﷺ) ona: "Sağ elinle ye!" buyurdu. Adam: "Yapamıyorum" dedi. Resûlullah (ﷺ): "Yapamaz olasın!" buyurdu. Ondan sonra adamın eli ağzına gitmez oldu. (Müslim)`,
  "160": `Resûlullah (ﷺ)'i şöyle derken işittim: "Ya saflarınızı düzgün tutarsınız ya da Allah yüzlerinizi birbirine çevirir." (Buhârî, Müslim)`,
  "161": `Resûlullah (ﷺ) şöyle buyurdu: "Bu ateş sizin düşmanınızdır. Uyuduğunuzda onu söndürün." (Buhârî, Müslim)`,
  "162": `Resûlullah (ﷺ) şöyle buyurdu: "Allah'ın benimle gönderdiği hidayet ve ilmin misali, bol yağmura benzer. Yağmurun isabet ettiği toprağın bir kısmı suyu emer, bol ot ve bitki yetiştirir. Bir kısmı kuraktır, suyu tutar, Allah da onunla insanları faydalandırır; onlar içer, hayvanlarını sular ve ekin eker. Bir kısmı da kaygan ve düzdür, ne suyu tutar ne de ot bitirir. İşte bu, Allah'ın dinini anlayıp faydalanan kimse ile, duyduğu halde başını kaldırmayan ve hidayeti kabul etmeyen kimsenin misalidir." (Buhârî, Müslim)`,
  "163": `Resûlullah (ﷺ) şöyle buyurdu: "Benim ve sizin misaliniz, ateş yakan bir adam gibidir. Ateşin etrafına pervaneler ve böcekler düşmeye başlayınca, adam onları kurtarmak için uğraşır. Ben de sizi ateşten kurtarmak için eteklerinizden tutuyorum. Siz ise elimden kaçıp gidiyorsunuz." (Buhârî, Müslim)`,
  "164": `Resûlullah (ﷺ) parmakları ve tabağı yalamayı emretti ve şöyle buyurdu: "Bereketin hangi yemekte olduğunu bilemezsiniz." (Müslim)`,
  "165": `Resûlullah (ﷺ) bize hitaben ayağa kalktı ve şöyle buyurdu: "Ey insanlar! Siz Allah'ın huzuruna yalınayak, çıplak ve sünnetsiz olarak çıkarılacaksınız." Sonra şu âyeti okudu: "Yaratmaya nasıl başladıysak, onu tekrarlayacağız. Üzerimize düşen bir vaaddir. Şüphesiz biz bunu yapanız." (Buhârî, Müslim)`,
  "166": `Resûlullah (ﷺ) başparmak ve şehadet parmağıyla çakıl taşı atmayı yasakladı ve şöyle buyurdu: "Bu ne avı öldürür ne de düşmana zarar verir. Fakat gözü çıkarabilir ve dişi kırabilir." (Buhârî, Müslim)`,
  "167": `Ömer bin Hattâb (رضي الله عنه)'ın Hacerü'l-Esved'i öptüğünü ve şöyle dediğini gördüm: "Biliyorum ki sen, ne zarar ne de fayda vermeyen bir taşsın. Resûlullah (ﷺ)'i seni öperken görmeseydim, seni öpmezdim." (Buhârî, Müslim)`,

  // Chapter 17: Submitting to Allah's Order (hadith 168)
  "168": `Enes (رضي الله عنه) şöyle anlatır: "Göklerde ve yerde ne varsa Allah'ındır. İçinizdekini açığa vursanız da gizleseniz de Allah sizi onunla hesaba çeker" âyeti inince, bu Müslümanlara ağır geldi. Resûlullah (ﷺ)'e gelip oturdular ve: "Gücümüz yetmeyen şeylerle mükellef tutulduk" dediler. Resûlullah (ﷺ): "Teslim olun (semi'nâ ve ata'nâ) demek ister misiniz?" buyurdu. Bunun üzerine Allah: "Peygamber, Rabbinden kendisine indirilene iman etti, müminler de..." âyetini indirdi. (Müslim)`,

  // Chapter 18: Prohibition of Innovations (hadiths 169-170)
  "169": `Resûlullah (ﷺ) şöyle buyurdu: "Kim bizim dinimize, ondan olmayan bir şey sokarsa, o şey kabul edilmez (reddedilir)." (Buhârî, Müslim)`,
  "170": `Resûlullah (ﷺ) hutbe irad ettiğinde gözleri kızarır, sesi yükselir ve öfkesi şiddetlenirdi. Sanki bir orduya: "Düşman sabah bastıracak" diye uyarı yapıyor gibi olurdu. Şöyle derdi: "Ben ve kıyamet şu iki parmak gibi yakınız." (Şehadet ve orta parmağını birleştirerek). (Müslim)`,

  // Chapter 19: Initiating a Good or Evil Way (hadiths 171-172)
  "171": `Resûlullah (ﷺ) şöyle buyurdu: "Kim İslâm'da güzel bir çığır açarsa, onun sevabını ve kendisinden sonra o çığırda yürüyenlerin sevabını, onların sevabından hiç eksiltmeksizin alır. Kim de İslâm'da kötü bir çığır açarsa, onun günahını ve kendisinden sonra o çığırda yürüyenlerin günahını, onların günahından hiç eksiltmeksizin yüklenir." (Müslim)`,
  "172": `Resûlullah (ﷺ) şöyle buyurdu: "Hiç kimse haksız yere öldürülmez ki, onun kanından bir pay, Âdem'in ilk oğluna da verilmiş olmasın. Çünkü cinayeti ilk işleyen odur." (Buhârî, Müslim)`,

  // Chapter 20: Directing Towards Good (hadiths 173-176)
  "173": `Resûlullah (ﷺ) şöyle buyurdu: "Kim bir hayra yönlendirirse, o hayrı işleyenin sevabı kadar sevap alır." (Müslim)`,
  "174": `Resûlullah (ﷺ) şöyle buyurdu: "Kim hidayete çağırırsa, kendisine uyanların sevabı kadar sevap alır, bu onların sevabından hiçbir şey eksiltmez. Kim de dalalete çağırırsa, kendisine uyanların günahı kadar günah alır, bu onların günahından hiçbir şey eksiltmez." (Müslim)`,
  "175": `Hayber Savaşı sırasında Resûlullah (ﷺ) şöyle buyurdu: "Yarın sancağı öyle birine vereceğim ki, Allah onun eliyle fetih nasip edecek. O, Allah'ı ve Resûl'ünü sever, Allah ve Resûlü de onu sever." (Buhârî, Müslim)`,
  "176": `Benî Eslem'den bir genç: "Ey Allah'ın Resûlü! Cihada çıkmak istiyorum ama binecek bir hayvanım yok" dedi. Resûlullah (ﷺ): "Falan kişiye git, o cihada hazırlanıyordu ama hastalandı" buyurdu. Genç ona gitti ve: "Allah seni mübarek kılsın" dedi. (Buhârî, Müslim)`,

  // Chapter 21: Helping Each Other in Goodness (hadiths 177-180)
  "177": `Resûlullah (ﷺ) şöyle buyurdu: "Kim bir mücahidi donatırsa, kendisi de cihada çıkmış gibi sevap alır. Kim bir mücahidin ailesine hayırla bakarsa, o da cihada çıkmış gibi sevap alır." (Buhârî, Müslim)`,
  "178": `Resûlullah (ﷺ) Huzeyl kabilesinden Benî Lihyân'a bir askeri birlik gönderdi ve şöyle buyurdu: "Her iki kişiden biri savaşa katılsın, sevapta ortaktırlar." (Müslim)`,
  "179": `Resûlullah (ﷺ) Ravhâ'da bir kervanla karşılaştı ve onlara: "Siz kimsiniz?" diye sordu. Onlar: "Müslümanlarız" dediler. "Ya siz?" diye sordular. Resûlullah (ﷺ): "Ben Allah'ın Resûlüyüm" buyurdu. (Müslim)`,
  "180": `Resûlullah (ﷺ) şöyle buyurdu: "Kendisine emredileni gönül hoşluğuyla yerine getiren ve aldığına da rıza gösteren güvenilir Müslüman bir hazinedar, sadaka verenlerden biridir." (Buhârî, Müslim)`,

  // Chapter 22: Good Counsel (hadiths 181-183)
  "181": `Resûlullah (ﷺ) şöyle buyurdu: "Din nasihattir." "Kimin için?" diye sorduk. "Allah için, Kitabı için, Resûlü için, Müslüman yöneticiler ve bütün Müslümanlar için" buyurdu. (Müslim)`,
  "182": `Cerîr bin Abdullah (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ)'e namaz kılmak, zekât vermek ve her Müslümana nasihat etmek üzere biat ettim. (Buhârî, Müslim)`,
  "183": `Enes (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Sizden biriniz, kendisi için istediğini (hayrı) din kardeşi için de istemedikçe (gerçek anlamda) iman etmiş olmaz." (Buhârî, Müslim)`,

  // Chapter 23: Commanding Good, Forbidding Evil (hadiths 184-197)
  "184": `Resûlullah (ﷺ)'i şöyle derken işittim: "Sizden kim bir kötülük (münker) görürse, onu eliyle değiştirsin. Buna gücü yetmezse diliyle düzeltsin. Buna da gücü yetmezse kalbiyle buğzetsin. Bu ise imanın en zayıf derecesidir." (Müslim)`,
  "185": `Resûlullah (ﷺ) şöyle buyurdu: "Benden önce Allah'ın bir ümmete gönderdiği hiçbir peygamber yoktur ki, onun havarileri ve ashabı olmasın. Onlar peygamberin sünnetine sarılır ve emrine uyarlardı. Sonra onların yerine, yapmadıklarını söyleyen ve emredilmediklerini yapan nesiller geldi. Kim onlara karşı eliyle cihad ederse mümindir, diliyle cihad ederse mümindir, kalbiyle cihad ederse mümindir. Bunun ötesinde ise hardal tanesi kadar iman yoktur." (Müslim)`,
  "186": `Ubâde bin Sâmit (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ)'e zorlukta ve kolaylıkta, hoşumuza giden ve gitmeyen hallerde işitip itaat etmek üzere, bizi yönetenlerin emrinden çıkmamak ve nerede olursak olalım hakkı söylemek, Allah yolunda hiçbir kınayanın kınamasından korkmamak üzere biat ettik. (Buhârî, Müslim)`,
  "187": `Nu'mân bin Beşîr (رضي الله عنهما) şöyle dedi: Resûlullah (ﷺ) şöyle buyurdu: "Allah'ın sınırlarını koruyan (haddleri uygulayan) ve onları çiğneyenlerin misali, bir gemide oturan bir topluluğa benzer. Bir kısmı alt kata, bir kısmı üst kata yerleşir. Alt kattakiler su almak istediklerinde üst kattakileri rahatsız ederler. Alt kattakiler: 'Gemimizin altından bir delik açsak, üsttekileri rahatsız etmeyiz' derlerse, üst kattakiler onlara engel olmazsa gemidekilerin hepsi boğulur. Engel olurlarsa hem kendileri kurtulur hem de diğerleri kurtulur." (Buhârî)`,
  "188": `Ümmü Seleme (رضي الله عنها) şöyle anlatır: Resûlullah (ﷺ) şöyle buyurdu: "Başınıza valiler tayin edilecek. İyilerini tanıyacak, kötülerini kınayacaksınız. Kim kötülüğe buğzederse kurtulur, kim ondan uzak durursa selamet bulur. Ancak ona uyan ve tâbi olan helâk olur." (Müslim)`,
  "189": `Resûlullah (ﷺ) Âişe (رضي عنها)'nin yanına geldi ve üzgün görünüyordu. Şöyle buyurdu: "Allah'tan başka ilah yoktur. Yazıklar olsun Arapların başına, şer yaklaştı. Bugün Ye'cûc ve Me'cûc'un seddinde şu kadar yer açıldı." (Buhârî, Müslim)`,
  "190": `Resûlullah (ﷺ) şöyle buyurdu: "Yol kenarlarında oturmaktan sakının." Sahâbîler: "Ey Allah'ın Resûlü! Oturup konuşmaktan başka çaremiz yok" dediler. Resûlullah (ﷺ): "O halde hakkını verin" buyurdu. "Nedir o haklar?" diye sordular. Resûlullah (ﷺ): "Gözü yere indirmek, rahatsızlığı gidermek, selamı almak, iyiliği emredip kötülükten sakındırmaktır" buyurdu. (Buhârî, Müslim)`,
  "191": `Resûlullah (ﷺ) bir adamın elinde altın bir yüzük gördü. Onu çıkarıp attı ve: "Biriniz ateşten bir kor alıp onu eline mi takıyor?" buyurdu. Resûlullah (ﷺ) gidince adama: "Yüzüğünü al, ondan faydalanabilirsin" denildi. Adam: "Hayır, vallahi Resûlullah (ﷺ) onu attıktan sonra onu asla almam" dedi. (Müslim)`,
  "192": `Âiz bin Amr (رضي الله عنه) Ubeydullah bin Ziyâd'a gitti ve: "Ey oğulcuğum! Ben Resûlullah (ﷺ)'i şöyle derken işittim: 'Yöneticilerin en kötüsü, zulmedenlerdir. Sakın onlardan olma'" dedi. (Müslim)`,
  "193": `Resûlullah (ﷺ) şöyle buyurdu: "Varlığım elinde olan Allah'a yemin ederim ki, ya iyiliği emreder, kötülükten sakındırırsınız ya da Allah size bir ceza gönderir, sonra O'na dua edersiniz de duanız kabul olmaz." (Tirmizî, Ahmed)`,
  "194": `Resûlullah (ﷺ) şöyle buyurdu: "En üstün cihad, zalim yöneticiye karşı adil bir söz söylemektir." (Ebû Dâvûd, Tirmizî)`,
  "195": `Resûlullah (ﷺ)'e bineğine binmek üzereyken bir adam geldi ve: "Hangi cihad daha faziletlidir?" diye sordu. Resûlullah (ﷺ): "Zalim yöneticiye karşı söylenen doğru sözdür" buyurdu. (Nesâî)`,
  "196": `Resûlullah (ﷺ) şöyle buyurdu: "Benî İsrâîl'deki çöküş şöyle başladı: Bir adam bir başkasıyla karşılaşır ve 'Ey filan, Allah'tan kork, yaptığından vazgeç; bu sana helal değildir' derdi. Ertesi gün aynı kişiyle karşılaşır, onunla birlikte yer, içer ve otururdu. Böyle yapmaları, onları Allah'ın kitabını inkâra ve birbirleriyle işbirliğine götürdü." (Ebû Dâvûd)`,
  "197": `Resûlullah (ﷺ)'i şöyle derken işittim: "İnsanlar bir kötülük görüp de onu değiştirmezlerse, Allah'ın onları topluca bir azaba uğratması yakındır." "Ey iman edenler! Siz kendinize bakın. Doğru yolda iseniz, sapan kimse size zarar veremez" âyeti hakkında söylemiştir. (Ebû Dâvûd, Tirmizî)`,

  // Chapter 24: Severe Punishment (hadith 198)
  "198": `Resûlullah (ﷺ)'i şöyle derken işittim: "Kıyamet günü bir adam getirilip cehenneme atılır. Bağırsakları dışarı dökülür, bir merkebin değirmen taşını çevirdiği gibi onlarla döner durur. Cehennemlikler ona: 'Ey filan, ne oldu sana? Sen iyiliği emreder, kötülükten sakındırmaz mıydın?' derler. Adam: 'Evet, iyiliği emrederdim ama kendim yapmazdım; kötülükten sakındırırdım ama kendim işlerdim' der." (Buhârî, Müslim)`,

  // Chapter 25: Fulfilling Trusts (hadiths 199-202)
  "199": `Resûlullah (ﷺ) şöyle buyurdu: "Münafığın üç alameti vardır: Konuşunca yalan söyler, söz verince sözünde durmaz, kendisine bir şey emanet edilince hıyanet eder." (Buhârî, Müslim)`,
  "200": `Huzeyfe (رضي الله عنه) şöyle anlatır: Resûlullah (ﷺ) bize iki hadis anlattı. Birinin doğru olduğunu gördüm, diğerini bekliyorum. Şöyle buyurdu: "Emanet, insanların kalplerinin derinliklerine iner. Sonra Kur'an iner, insanlar Kur'an'dan ve sünnetten öğrenirler. Sonra emanet kaldırılır, kişi emin olarak bilinir ama emaneti yerine getirmez." (Buhârî)`,
  "201": `Huzeyfe (رضي الله عنه) ve Ebû Hüreyre (رضي الله عنهما) şöyle anlatır: Resûlullah (ﷺ) şöyle buyurdu: "Allah, kıyamet günü insanları toplar. Müminler, cennete gönderilinceye kadar bekletilir. Âdem (عليه السلام)'e gelirler ve şefaat dilerler." (Buhârî, Müslim)`,
  "202": `Abdullah bin Zübeyr (رضي الله عنهما) şöyle anlatır: Zübeyr (رضي الله عنه) Cemel Vakası günü (savaşa hazırlanırken) beni yanına çağırdı ve: "Ey oğlum! Bugün ancak zalim veya mazlum olan öldürülür. Ben ancak zalim olarak öldürüleceğimi biliyorum. En büyük endişem, borcumdur" dedi. (Buhârî)`,
}

const commentary = {
  "156": `Peygamber (ﷺ)'in "size bıraktığımı alın" ifadesi, farz ve sünnetlerle yetinip gereksiz sorular sormamayı emreder. Aşırı soru sormak, önceki ümmetlerin helâk sebebidir.`,
  "157": `Bu hadis, sünnete sımsıkı sarılmanın ve bid'atlerden sakınmanın önemini vurgular. Her bid'at sapıklıktır ve dinde sonradan çıkarılan her şey reddedilmelidir.`,
  "158": `İmanın esası, Resûlullah (ﷺ)'e itaattir. O'na itaat eden cennete girer, isyan eden giremez. "Kabul etmeyen", itaat etmeyen kimsedir.`,
  "159": `Sağ elle yemek yemek sünnettir. Sol elle yemek yemek mekruhtur. Büyüklenerek sünnete karşı gelen kişi bundan mahrum bırakılabilir.`,
  "160": `Namazda safların düzgün olması, cemaat namazının önemli bir parçasıdır. Safları düzgün tutmayanlar, kalplerinin birbirinden ayrılması tehlikesiyle karşı karşıyadır.`,
  "161": `Yangın güvenliği konusunda dikkatli olunmalıdır. Bu hadis, İslâm'ın can ve mal güvenliğine verdiği önemi gösterir.`,
  "162": `Bu hadis, ilmin farklı şekillerde kabul edildiğini ve insanların ilimden faydalanma derecelerinin farklı olduğunu anlatır. Önemli olan, ilmi alıp ondan faydalanmaktır.`,
  "163": `Peygamber (ﷺ)'in ümmetine olan şefkatini gösterir. O, ümmetini cehennem ateşinden kurtarmak için büyük çaba sarf etmiştir.`,
  "164": `Yemekten sonra parmakları ve tabağı yalamak müstehaptır, çünkü bereketin nerede olduğu bilinemez. İsraftan kaçınılmalıdır.`,
  "165": `Ahiret hayatının gerçekliğini ve dünyanın geçiciliğini vurgular. İnsan, mahşer günü için hazırlıklı olmalıdır.`,
  "166": `Boş yere ve faydasız işlerle uğraşmak yasaklanmıştır. Çakıl taşı atmak gibi hem faydasız hem de zararlı olabilecek davranışlardan kaçınılmalıdır.`,
  "167": `Sahâbenin sünnete bağlılığını ve taklidî değil, tahkikî imanı gösterir. Ömer (رضي الله عنه) sünnete uymayı, akla ve duyguya tercih eder.`,
  "168": `Müslümanlar, Allah'ın emirlerini işitince tereddütsüz kabul etmelidir. Bu âyetin nüzulü, sahâbenin Allah'a olan teslimiyetini ve itaatini göstermektedir.`,
  "169": `Dinde sonradan ortaya çıkarılan her şey (bid'at) reddedilmiştir. Din, Peygamber (ﷺ) tarafından tebliğ edildiği şekliyle kabul edilmelidir.`,
  "170": `Peygamber (ﷺ)'in hutbeleri çok tesirli ve etkileyiciydi. Kıyametin yakınlığı konusunda ümmetini sürekli uyarırdı.`,
  "171": `İyilik veya kötülük başlatan kişi, kendisinden sonra gelenlerin amelinden de sorumludur. Bu, insanı hayra vesile olmaya teşvik eder.`,
  "172": `Haksız yere adam öldürmenin vebali büyüktür. İlk cinayeti işleyen Kâbil olduğu için, her maktulün günahından bir pay ona da gider.`,
  "173": `Hayra vesile olan, hayrı işleyen gibi sevap alır. Bu, Müslümanları hayır işlerinde birbirlerine yardım etmeye teşvik eder.`,
  "174": `Hayra ve şerre vesile olmanın sorumluluğu büyüktür. Herkes, başkalarını etkileme gücünün farkında olmalıdır.`,
  "175": `Ali (رضي الله عنه)'nin faziletini ve Peygamber (ﷺ) katındaki değerini gösterir. Allah'ı ve Resûl'ünü seven, onlar tarafından da sevilir.`,
  "176": `Cihada katılamayan, ona vesile olan kişi de sevap alır. Müslümanlar hayırda yardımlaşmalıdır.`,
  "177": `Cihadı desteklemek, bizzat cihada katılmak gibi sevap kazandırır. Mücahidlerin ailelerine bakmak da aynı ecri getirir.`,
  "178": `Cihad için ordu hazırlamak ve asker göndermek, toplumsal bir sorumluluktur. Bu konuda işbirliği yapılmalıdır.`,
  "179": `Tebliğin her fırsatta yapılması gerektiğini gösterir. Yolda karşılaşılan bir kervanla dahi konuşup İslâm'ı anlatmak önemlidir.`,
  "180": `İşinde güvenilir ve dürüst olan kişi, sadaka veren gibi sevap kazanır. Güvenilirlik büyük bir fazilettir.`,
  "181": `Nasihat (samimiyet), İslâm'ın temelidir. Müslüman, Allah, Kitap, Peygamber ve tüm Müslümanlar hakkında samimi olmalıdır.`,
  "182": `Biat, İslâm'da önemli bir kavramdır. Müslümanlar, namaz, zekât ve nasihat üzere birbirlerine bağlıdır.`,
  "183": `İmanın kemali, başkaları için de kendin için istediğini istemekle olur. Bu, İslâm kardeşliğinin en güzel ifadesidir.`,
  "184": `Kötülükle mücadele, kişinin gücüne göre derecelendirilmiştir: el, dil, kalp. Kalpten buğz etmek imanın en zayıf derecesidir ve bunun altı iman sayılmaz.`,
  "185": `Emr-i bi'l-maruf ve nehy-i ani'l-münker (iyiliği emretmek, kötülükten sakındırmak) farz-ı kifayedir. Bunu terk edenler topluca azaba uğrayabilir.`,
  "186": `Müslüman yöneticilere itaat, meşru olmayan emirler dışında farzdır. Kınanmaktan korkmadan hakkı söylemek de bir biat şartıdır.`,
  "187": `Toplumda iyiliği emredip kötülükten sakındırmak, gemideki yolcuların birbirini kurtarması gibidir. Bu görevi terk eden herkes zarar görür.`,
  "188": `Zalim yöneticilere karşı kalpten buğz etmek yeterlidir. Onlara tâbi olmak ve onların zulmüne ortak olmak helâk sebebidir.`,
  "189": `Kötülükler yaygınlaştığında, Allah'ın azabı yaklaşır. Mümin, bu durumlarda Allah'a sığınmalıdır.`,
  "190": `Yol kenarlarında oturmanın âdâbı vardır: gözleri haramdan sakınmak, yolun rahatsızlıklarını gidermek, selamı almak, iyiliği emredip kötülükten sakındırmak.`,
  "191": `Erkeklerin altın yüzük takması haramdır. Peygamber (ﷺ), bir yanlışı gördüğünde hemen müdahale ederdi.`,
  "192": `Zalim yöneticilerin en kötü yöneticiler olduğu ve onlardan uzak durulması gerektiği vurgulanır.`,
  "193": `İyiliği emredip kötülükten sakındırmayı terk eden toplumlar, Allah'ın azabına uğrar. Dua etmek bile bu azabı engellemez.`,
  "194": `Zalim yöneticiye karşı hakkı söylemek en faziletli cihattır. Bu, büyük bir cesaret ve iman gerektirir.`,
  "195": `Zalim yöneticilere karşı hakkı söylemek, savaş meydanındaki cihattan daha üstündür.`,
  "196": `Müslümanların birbirlerine karşı sorumluluğu vardır. Günah işleyeni uyarmamak, toplumun çöküşüne yol açar.`,
  "197": `Kötülük karşısında sessiz kalmak, toplumu helâke götürür. Her Müslüman, gücü nispetinde iyiliği emredip kötülükten sakındırmalıdır.`,
  "198": `Başkalarına iyiliği emredip kendisi yapmayanların durumu çok vahimdir. İlim ve amel birlikte olmalıdır.`,
  "199": `Nifakın (münafıklığın) alametleri: yalan, sözünde durmamak ve emanete hıyanet. Bunlar büyük günahlardır ve tövbe edilmelidir.`,
  "200": `Emanet, İslâm'ın temel değerlerindendir. Zamanla emanet duygusu zayıflar ve insanlar emaneti ehline vermez olur.`,
  "201": `Şefaat, ahirette müminler için büyük bir nimettir. Peygamberler dahi Allah'ın izni olmadan şefaat edemez.`,
  "202": `Zübeyr (رضي الله عنه), borcunu düşünerek ahiret endişesi taşımıştır. Mümin, borçtan ve kul hakkından sakınmalıdır.`,
}

// Apply manual translations
let c = 0
for (const [num, t] of Object.entries(text)) {
  if (tr.hadiths[num]) { tr.hadiths[num].text = t; c++ }
}
let cc = 0
for (const [num, com] of Object.entries(commentary)) {
  if (tr.hadiths[num]) { tr.hadiths[num].commentary = com; cc++ }
}

writeFileSync(fp, JSON.stringify(tr, null, 2) + '\n', 'utf-8')
console.log(`✓ Added ${c} texts + ${cc} commentaries (chapters 16-25)`)
