/**
 * Turkish hadith text+commentary translation — Chapters 4-50 (hadiths 54-411)
 * Run: node scripts/translate-tr-batch3.js
 */
import { readFileSync, writeFileSync } from 'fs'

const fp = new URL('../src/lib/translations/tr.json', import.meta.url)
const tr = JSON.parse(readFileSync(fp, 'utf-8'))

const t = {}

t[56] = `Uzun bir konuşmasında Herakleios'a şöyle dedi: Herakleios, "O —Resûlullah (ﷺ)'i kastederek— size neyi emrediyor?" diye sordu. Ebû Süfyân: "Namaz kılın, doğru söyleyin, iffetli olun ve akrabalık bağlarını koruyun" dedi. (Buhârî, Müslim)`

t[57] = `Bedir Savaşı'na katılmış bir sahâbî olan Sehl bin Huneyf (رضي الله عنه) şöyle anlatır: Resûlullah (ﷺ) şöyle buyurdu: "Kim samimi bir kalple Allah'tan şehitlik dilerse, Allah onu yatağında ölse bile şehitlerin mertebesine ulaştırır." (Müslim)`

t[58] = `Resûlullah (ﷺ) şöyle buyurdu: "Geçmiş peygamberlerden biri (عليه السلام) savaşa çıktı ve kavmine şöyle dedi: 'Şu üç özellikten birine sahip olan benimle gelmesin: Evlenip de henüz zifafa girmemiş olan, ev yapıp da henüz oturmayan ve savaş için hayvan alıp henüz eğitmemiş olan.'" (Buhârî, Müslim)`

t[59] = `Resûlullah (ﷺ) şöyle buyurdu: "Alıcı ve satıcı, birbirlerinden ayrılmadıkları sürece alışverişi iptal etme veya devam ettirme hakkına sahiptir. Eğer doğru söyler ve (varsa) kusurları açıklarlarsa, alışverişleri bereketlenir. Yalan söyler ve kusurları gizlerlerse, alışverişlerinin bereketi yok edilir." (Buhârî, Müslim)`

t[63] = `Siz öyle şeyler yapıyorsunuz ki, onları bir kıldan daha önemsiz görüyorsunuz; halbuki Resûlullah (ﷺ) zamanında onları büyük günahlardan sayardık. (Buhârî)`

t[64] = `Resûlullah (ﷺ) şöyle buyurdu: "Allah (ﷻ)'ın ghamîr (hoşnutsuzluk) dediği bir hali vardır. Allah'ın ghamîri, kişinin Allah'ın haram kıldığını helal sayarak işlemesi durumunda ortaya çıkar." (Müslim)`

t[65] = `Abdullah bin Abbâs (رضي الله عنهما) şöyle anlatır: Resûlullah (ﷺ) şöyle buyurdu: "Allah, Benî İsrâil'den üç kişiyi —bir cüzamlı, bir kel ve bir kör— imtihan etmeye karar verdi..." (Buhârî)`

t[66] = `Resûlullah (ﷺ) şöyle buyurdu: "Akıllı kişi, nefsini hesaba çeken ve ölümden sonrası için çalışandır. Âciz kişi ise nefsinin arzularına uyan ve Allah'tan (hayır) umandır." (Tirmizî, İbn Mâce)`

t[67] = `Resûlullah (ﷺ) şöyle buyurdu: "Kişinin İslâm'ının güzelliği, kendini ilgilendirmeyen şeylerden yüz çevirmesidir." (Tirmizî, İbn Mâce)`

t[68] = `Resûlullah (ﷺ) şöyle buyurdu: "Kişi, hanımını niçin dövdü diye sorgulanmaz." (Ebû Dâvûd)`

t[70] = `Resûlullah (ﷺ) şöyle buyurdu: "Dünya tatlı ve yeşildir. Allah sizi onun üzerine halife kıldı ve nasıl davranacağınıza bakmaktadır. Dünyaya karşı dikkatli olun ve kadınlara karşı da dikkatli olun." (Müslim)`

t[71] = `Resûlullah (ﷺ) şöyle dua ederdi: "Allah'ım! Senden hidayet, takva, iffet ve gönül zenginliği dilerim." (Müslim)`

t[72] = `Resûlullah (ﷺ)'i şöyle derken işittim: "Kim bir yemin eder ve sonra daha hayırlısını görürse, yeminini bozsun, kefaretini versin ve daha hayırlı olanı yapsın." (Müslim)`

t[73] = `Resûlullah (ﷺ)'i Veda Haccı'nda bir hutbe irad ederken işittim. Şöyle buyurdu: "Allah'tan korkun. Namazınızı beş vakit kılın. Ramazan orucunuzu tutun. Malınızın zekâtını verin. Yöneticilerinize itaat edin. Böylece Rabbinizin cennetine girersiniz." (Tirmizî)`

t[74] = `Resûlullah (ﷺ) şöyle buyurdu: "Geçmiş ümmetler bana gösterildi. Bir peygamber gördüm, yanında küçük bir topluluk vardı. Bir peygamber gördüm, yanında bir veya iki kişi vardı. Bir peygamber gördüm, yanında hiç kimse yoktu. Derken bana büyük bir kalabalık gösterildi ve onların benim ümmetim olduğunu sandım. Fakat bana: 'Bu Mûsâ ve kavmidir' denildi." (Buhârî, Müslim)`

t[75] = `Resûlullah (ﷺ) şöyle derdi: "Allah'ım! Yalnız Sana teslim oldum, yalnız Sana inandım, yalnız Sana güvendim, yalnız Sana yöneldim ve yalnız Senin uğrunda mücadele ettim. Allah'ım! Beni doğru yola ilettiğin gibi, izzetin hakkı için, Senden başka ilah yoktur, beni sapıklıktan koru." (Buhârî, Müslim)`

t[76] = `"Allah bize yeter, O ne güzel vekildir!" Bu sözler, İbrâhim (عليه السلام)'in ateşe atıldığında ve Muhammed (ﷺ)'in müşriklerin "Şüphesiz insanlar size karşı ordu toplamış" dediklerinde söyledikleri sözlerdir. (Buhârî)`

t[80] = `Resûlullah (ﷺ) şöyle buyurdu: "Ey falan kişi! Yatağına girdiğinde şöyle de: 'Allah'ım! Kendimi Sana teslim ettim. Yüzümü Sana çevirdim. İşimi Sana havale ettim. Sırtımı Sana dayadım. Sana rağbet ve Senden korkarak. Senden kaçıp sığınılacak yer yine Sensin. İndirdiğin kitabına ve gönderdiğin peygamberine iman ettim.'" (Buhârî, Müslim)`

t[81] = `Ebû Bekr es-Sıddîk (رضي الله عنه) —ki babası, annesi ve kendisi sahâbîdir— şöyle anlatır: "Müşriklerin bizi rahatsız ettiğini gördüğümüzde, Resûlullah (ﷺ)'i Sevr Mağarası'nda gözetlerdik..." (Müslim)`

t[82] = `Resûlullah (ﷺ) evinden çıkarken şöyle derdi: "Bismillah. Allah'a tevekkül ettim. Allah'ım! Sana sığınırım, sapıklığa düşmekten veya saptırılmaktan, kaymaktan veya kaydırılmaktan, zulmetmekten veya zulme uğramaktan, bilgisizlik etmekten veya bilgisizliğe uğratılmaktan." (Tirmizî, Ebû Dâvûd)`

t[83] = `Resûlullah (ﷺ) şöyle buyurdu: "Kim evinden çıkarken 'Bismillah, tevekkeltü alellah, lâ havle velâ kuvvete illâ billah' derse, ona: 'Doğru yola iletilin, korundun ve yardıma mazhar oldun' denilir. Şeytan da ondan uzaklaşır." (Tirmizî, Ebû Dâvûd)`

t[84] = `Resûlullah (ﷺ) zamanında iki kardeş vardı. Biri Resûlullah (ﷺ)'e gelir, diğeri ise çalışırdı. Çalışan kardeş, diğerini Resûlullah (ﷺ)'e şikâyet etti. Resûlullah (ﷺ): "Belki de onun sayesinde rızıklandırılıyorsunuz" buyurdu. (Tirmizî)`

t[85] = `Süfyân bin Abdullah (رضي الله عنه) şöyle dedi: "Ey Allah'ın Resûlü! Bana İslâm hakkında öyle bir şey söyle ki, ondan sonra hiç kimseden bir şey sormayayım." Resûlullah (ﷺ): "Allah'a inandım de, sonra dosdoğru ol" buyurdu. (Müslim)`

t[156] = `Resûlullah (ﷺ) şöyle buyurdu: "Size bıraktığımı alın (fazlasını istemeyin). Çünkü sizden öncekiler ancak çok soru sormaları ve peygamberleri hakkında ihtilafa düşmeleri yüzünden helâk oldu." (Buhârî, Müslim)`

t[157] = `Resûlullah (ﷺ) bize öyle derin ve beliğ bir hutbe irad etti ki, kalplerimiz titredi, gözlerimiz yaşardı. Biz: "Ey Allah'ın Resûlü! Bu vedalaşan birinin konuşması gibi. Bize ne tavsiye edersin?" dedik. Resûlullah (ﷺ): "Size, Allah'a karşı takvayı, emretse bile bir Habeşli köleyi dinleyip itaat etmeyi tavsiye ederim. Benden sonra sağ olanlarınız çok ihtilaflar görecek. O zaman sünnetime ve hidâyete erdirilmiş halifelerin sünnetine sımsıkı sarılın. Isırırcasına ona tutunun. Sonradan çıkarılan şeylerden (bid'atlerden) sakının. Çünkü her bid'at sapıklıktır." (Ebû Dâvûd, Tirmizî)`

t[158] = `Resûlullah (ﷺ) şöyle buyurdu: "Ümmetimin hepsi cennete girecek, ancak kabul etmeyenler hariç." "Peygamber'den kabul etmeyen kim olur?" diye soruldu. Resûlullah (ﷺ): "Bana itaat eden cennete girer, bana isyan eden ise kabul etmemiştir" buyurdu. (Buhârî)`

t[159] = `Bir adam, Resûlullah (ﷺ)'in huzurunda sol eliyle yemek yedi. Resûlullah (ﷺ) ona: "Sağ elinle ye!" buyurdu. Adam: "Yapamıyorum" dedi. Resûlullah (ﷺ): "Yapamaz olasın!" buyurdu. Ondan sonra adamın eli ağzına gitmez oldu. (Müslim)`

t[160] = `Resûlullah (ﷺ)'i şöyle derken işittim: "Ya saflarınızı düzgün tutarsınız ya da Allah yüzlerinizi birbirine çevirir." (Buhârî, Müslim)`

t[161] = `Medine'de bir ev bir gece yandı ve içindekiler de yandı. Resûlullah (ﷺ)'e bu haber verildiğinde şöyle buyurdu: "Bu ateş sizin düşmanınızdır. Uyuduğunuzda onu söndürün." (Buhârî, Müslim)`

t[162] = `Resûlullah (ﷺ) şöyle buyurdu: "Allah'ın benimle gönderdiği hidayet ve ilmin misali, bol yağmura benzer. Yağmurun isabet ettiği toprağın bir kısmı suyu emer, bol ot ve bitki yetiştirir. Bir kısmı kuraktır, suyu tutar, Allah da onunla insanları faydalandırır; onlar içer, hayvanlarını sular ve ekin eker. Bir kısmı da kaygan ve düzdür, ne suyu tutar ne de ot bitirir." (Buhârî, Müslim)`

t[163] = `Resûlullah (ﷺ) şöyle buyurdu: "Benim ve sizin misaliniz, ateş yakan bir adam gibidir. Ateşin etrafına pervaneler ve böcekler düşmeye başlayınca, adam onları kurtarmak için uğraşır. Ben de sizi ateşten kurtarmak için eteklerinizden tutuyorum. Siz ise elimden kaçıp gidiyorsunuz." (Buhârî, Müslim)`

t[164] = `Resûlullah (ﷺ) parmakları ve tabağı yalamayı emretti ve şöyle buyurdu: "Bereketin hangi yemekte olduğunu bilemezsiniz." (Müslim)`

t[165] = `Resûlullah (ﷺ) bize hitaben ayağa kalktı ve şöyle buyurdu: "Ey insanlar! Siz Allah'ın huzuruna yalınayak, çıplak ve sünnetsiz olarak çıkarılacaksınız..." (Buhârî, Müslim)`

t[166] = `Resûlullah (ﷺ) başparmak ve şehadet parmağıyla çakıl taşı atmayı yasakladı ve şöyle buyurdu: "Bu ne avı öldürür ne de düşmana zarar verir. Fakat gözü çıkarabilir ve dişi kırabilir." (Buhârî, Müslim)`

t[167] = `Ömer bin Hattâb (رضي الله عنه)'ın Hacerü'l-Esved'i öptüğünü ve şöyle dediğini gördüm: "Biliyorum ki sen, ne zarar ne de fayda vermeyen bir taşsın. Resûlullah (ﷺ)'i seni öperken görmeseydim, seni öpmezdim." (Buhârî, Müslim)`

t[168] = `"Göklerde ve yerde ne varsa Allah'ındır. İçinizdekini açığa vursanız da gizleseniz de Allah sizi onunla hesaba çeker" âyeti inince, bu Müslümanlara ağır geldi. Resûlullah (ﷺ)'e gelip oturdular ve: "Gücümüz yetmeyen şeylerle mükellef tutulduk" dediler. Resûlullah (ﷺ): "Teslim olun (semi'nâ ve ata'nâ) demek ister misiniz?" buyurdu. Bunun üzerine Allah: "Peygamber, Rabbinden kendisine indirilene iman etti, müminler de..." âyetini indirdi. (Müslim)`

t[169] = `Resûlullah (ﷺ) şöyle buyurdu: "Kim bizim dinimize, ondan olmayan bir şey sokarsa, o şey kabul edilmez (reddedilir)." (Buhârî, Müslim)`

t[170] = `Resûlullah (ﷺ) hutbe irad ettiğinde gözleri kızarır, sesi yükselir ve öfkesi şiddetlenirdi. Sanki bir orduya: "Düşman sabah bastıracak" diye uyarı yapıyor gibi olurdu. Şöyle derdi: "Ben ve kıyamet şu iki parmak gibi yakınız." (Şehadet ve orta parmağını birleştirerek). (Müslim)`

t[171] = `Bir gün sabah vakti Resûlullah (ﷺ)'in yanında oturuyorduk. Bir grup insan geldi... Resûlullah (ﷺ) şöyle buyurdu: "Kim İslâm'da güzel bir çığır açarsa, onun sevabını ve kendisinden sonra o çığırda yürüyenlerin sevabını, onların sevabından hiç eksiltmeksizin alır. Kim de İslâm'da kötü bir çığır açarsa, onun günahını ve kendisinden sonra o çığırda yürüyenlerin günahını, onların günahından hiç eksiltmeksizin yüklenir." (Müslim)`

t[172] = `Resûlullah (ﷺ) şöyle buyurdu: "Hiç kimse haksız yere öldürülmez ki, onun kanından bir pay, Âdem'in ilk oğluna da verilmiş olmasın. Çünkü cinayeti ilk işleyen odur." (Buhârî, Müslim)`

t[173] = `Resûlullah (ﷺ) şöyle buyurdu: "Kim bir hayra yönlendirirse, o hayrı işleyenin sevabı kadar sevap alır." (Müslim)`

t[174] = `Resûlullah (ﷺ) şöyle buyurdu: "Kim hidayete çağırırsa, kendisine uyanların sevabı kadar sevap alır, bu onların sevabından hiçbir şey eksiltmez. Kim de dalalete çağırırsa, kendisine uyanların günahı kadar günah alır, bu onların günahından hiçbir şey eksiltmez." (Müslim)`

t[175] = `Hayber Savaşı sırasında Resûlullah (ﷺ) şöyle buyurdu: "Yarın sancağı öyle birine vereceğim ki, Allah onun eliyle fetih nasip edecek. O, Allah'ı ve Resûl'ünü sever, Allah ve Resûlü de onu sever." (Buhârî, Müslim)`

t[176] = `Benî Eslem'den bir genç: "Ey Allah'ın Resûlü! Cihada çıkmak istiyorum ama binecek bir hayvanım yok" dedi. Resûlullah (ﷺ): "Falan kişiye git, o cihada hazırlanıyordu ama hastalandı" buyurdu. Genç ona gitti; "Allah seni mübarek kılsın" dedi. (Buhârî, Müslim)`

t[177] = `Resûlullah (ﷺ) şöyle buyurdu: "Kim bir mücahidi donatırsa, kendisi de cihada çıkmış gibi sevap alır. Kim bir mücahidin ailesine hayırla bakarsa, o da cihada çıkmış gibi sevap alır." (Buhârî, Müslim)`

t[178] = `Resûlullah (ﷺ) Huzeyl kabilesinden Benî Lihyân'a bir askeri birlik gönderdi ve şöyle buyurdu: "Her iki kişiden biri savaşa katılsın, sevapta ortaktırlar." (Müslim)`

t[179] = `Resûlullah (ﷺ) Ravhâ'da bir kervanla karşılaştı ve onlara: "Siz kimsiniz?" diye sordu. Onlar: "Müslümanlarız" dediler. "Ya siz?" diye sordular. Resûlullah (ﷺ): "Ben Allah'ın Resûlüyüm" buyurdu. (Müslim)`

t[180] = `Resûlullah (ﷺ) şöyle buyurdu: "Kendisine emredileni gönül hoşluğuyla yerine getiren ve aldığına da rıza gösteren güvenilir Müslüman bir hazinedar, sadaka verenlerden biridir." (Buhârî, Müslim)`

t[181] = `Resûlullah (ﷺ) şöyle buyurdu: "Din nasihattir." "Kimin için?" diye sorduk. "Allah için, Kitabı için, Resûlü için, Müslüman yöneticiler ve bütün Müslümanlar için" buyurdu. (Müslim)`

t[182] = `Resûlullah (ﷺ)'e namaz kılmak, zekât vermek ve her Müslümana nasihat etmek üzere biat ettim. (Buhârî, Müslim)`

t[183] = `Resûlullah (ﷺ) şöyle buyurdu: "Sizden biriniz, kendisi için istediğini (hayrı) din kardeşi için de istemedikçe (gerçek anlamda) iman etmiş olmaz." (Buhârî, Müslim)`

t[184] = `Resûlullah (ﷺ)'i şöyle derken işittim: "Sizden kim bir kötülük (münker) görürse, onu eliyle değiştirsin. Buna gücü yetmezse diliyle düzeltsin. Buna da gücü yetmezse kalbiyle buğzetsin. Bu ise imanın en zayıf derecesidir." (Müslim)`

t[185] = `Resûlullah (ﷺ) şöyle buyurdu: "Benden önce Allah'ın bir ümmete gönderdiği hiçbir peygamber yoktur ki, onun havarileri ve ashabı olmasın. Onlar peygamberin sünnetine sarılır ve emrine uyarlardı. Sonra onların yerine, yapmadıklarını söyleyen ve emredilmediklerini yapan nesiller geldi. Kim onlara karşı eliyle cihad ederse mümindir, diliyle cihad ederse mümindir, kalbiyle cihad ederse mümindir. Bunun ötesinde ise hardal tanesi kadar iman yoktur." (Müslim)`

t[186] = `Resûlullah (ﷺ)'e zorlukta ve kolaylıkta, hoşumuza giden ve gitmeyen hallerde işitip itaat etmek üzere, bizi yönetenlerin emrinden çıkmamak ve nerede olursak olalım hakkı söylemek, Allah yolunda hiçbir kınayanın kınamasından korkmamak üzere biat ettik. (Buhârî, Müslim)`

t[187] = `Resûlullah (ﷺ) şöyle buyurdu: "Allah'ın sınırlarını koruyan (haddleri uygulayan) ve onları çiğneyenlerin misali, bir gemide alt kata ve üst kata yerleşen bir topluluğa benzer. Üsttekiler su ihtiyaçları olduğunda aşağı inip alttakileri rahatsız ederler. Alt kattakiler bir balta alıp gemiyi delmeye kalkışsalar, üsttekiler onlara engel olmazsa gemidekilerin hepsi boğulur." (Buhârî)`

t[188] = `Müminlerin Annesi Ümmü Seleme Hind bint Ebû Ümeyye (رضي الله عنها) şöyle anlatır: Resûlullah (ﷺ) şöyle buyurdu: "Size iki vali tayin edilecek: Biri iyi, biri kötü. İyi valiye itaat edin, kötü valiyi ise kınayın. Kötü valiye isyan etmeyin."`

t[189] = `Resûlullah (ﷺ) Âişe (رضي الله عنها)'nin yanına geldi ve üzgün görünüyordu. Şöyle buyurdu: "Allah'tan başka ilah yoktur. Yazıklar olsun Arapların başına, şer yaklaştı. Bugün Ye'cûc ve Me'cûc'un seddinde şu kadar yer açıldı." (Buhârî, Müslim)`

t[190] = `Resûlullah (ﷺ) şöyle buyurdu: "Yol kenarlarında oturmaktan sakının." Sahâbîler: "Ey Allah'ın Resûlü! Oturup konuşmaktan başka çaremiz yok" dediler. Resûlullah (ﷺ): "O halde hakkını verin" buyurdu. "Nedir o haklar?" diye sordular. Resûlullah (ﷺ): "Gözü yere indirmek, rahatsızlığı gidermek, selamı almak, iyiliği emredip kötülükten sakındırmaktır" buyurdu. (Buhârî, Müslim)`

t[191] = `Resûlullah (ﷺ) bir adamın elinde altın bir yüzük gördü. Onu çıkarıp attı ve: "Biriniz ateşten bir kor alıp onu eline mi takıyor?" buyurdu. Resûlullah (ﷺ) gidince adama: "Yüzüğünü al, ondan faydalanabilirsin" denildi. Adam: "Hayır, vallahi Resûlullah (ﷺ) onu attıktan sonra onu asla almam" dedi. (Müslim)`

t[192] = `Âiz bin Amr (رضي عنه) Ubeydullah bin Ziyâd'a gitti ve: "Ey oğulcuğum! Ben Resûlullah (ﷺ)'i şöyle derken işittim: 'Yöneticilerin en kötüsü, zulmedenlerdir. Sakın onlardan olma'" dedi. (Müslim)`

t[193] = `Resûlullah (ﷺ) şöyle buyurdu: "Varlığım elinde olan Allah'a yemin ederim ki, ya iyiliği emreder, kötülükten sakındırırsınız ya da Allah size bir ceza gönderir, sonra O'na dua edersiniz de duanız kabul olmaz." (Tirmizî, Ahmed)`

t[194] = `Resûlullah (ﷺ) şöyle buyurdu: "En üstün cihad, zalim yöneticiye karşı adil bir söz söylemektir." (Ebû Dâvûd, Tirmizî)`

t[195] = `Bir adam ayağını üzengiye koymuş (bineğine binmek üzereyken) Resûlullah (ﷺ)'e: "Hangi cihad daha faziletlidir?" diye sordu. Resûlullah (ﷺ): "Zalim yöneticiye karşı söylenen doğru sözdür" buyurdu. (Nesâî)`

t[196] = `Resûlullah (ﷺ) şöyle buyurdu: "Benî İsrâîl'deki çöküş şöyle başladı: Bir adam bir başkasıyla karşılaşır ve 'Ey filan, Allah'tan kork, yaptığından vazgeç; bu sana helal değildir' derdi. Ertesi gün aynı kişiyle karşılaşır, onunla birlikte yer, içer ve otururdu. Böyle yapmaları, onları Allah'ın kitabını inkâra ve birbirleriyle işbirliğine götürdü." (Ebû Dâvûd)`

t[197] = `"Ey iman edenler! Siz kendinize bakın. Doğru yolda iseniz, sapan kimse size zarar veremez" âyetini okuyorsunuz. Ben Resûlullah (ﷺ)'i şöyle derken işittim: "İnsanlar bir kötülük görüp de onu değiştirmezlerse, Allah'ın onları topluca bir azaba uğratması yakındır." (Ebû Dâvûd, Tirmizî)`

t[198] = `Resûlullah (ﷺ)'i şöyle derken işittim: "Kıyamet günü bir adam getirilip cehenneme atılır. Bağırsakları dışarı dökülür, bir merkebin değirmen taşını çevirdiği gibi onlarla döner durur. Cehennemlikler ona: 'Ey filan, ne oldu sana? Sen iyiliği emreder, kötülükten sakındırmaz mıydın?' derler. Adam: 'Evet, iyiliği emrederdim ama kendim yapmazdım; kötülükten sakındırırdım ama kendim işlerdim' der." (Buhârî, Müslim)`

t[199] = `Resûlullah (ﷺ) şöyle buyurdu: "Münafığın üç alameti vardır: Konuşunca yalan söyler, söz verince sözünde durmaz, kendisine bir şey emanet edilince hıyanet eder." (Buhârî, Müslim)`

t[200] = `Resûlullah (ﷺ) bize iki hadis anlattı. Birinin doğru olduğunu gördüm, diğerini bekliyorum. Resûlullah (ﷺ) şöyle buyurdu: "Emanet, insanların kalplerinin derinliklerine iner. Sonra Kur'an iner, insanlar Kur'an'dan ve sünnetten öğrenirler." (Buhârî)`

t[201] = `Huzeyfe (رضي الله عنه) ve Ebû Hüreyre (رضي الله عنه) şöyle anlatır: Resûlullah (ﷺ) şöyle buyurdu: "Allah, kıyamet günü insanları toplar. Her ümmet, neye tapıyorsa onun ardına düşer. Dünyada bir iyiliği ve hayrı olmayan kişiye ise sadece zorluklar kalır." (Buhârî, Müslim)`

t[202] = `Zübeyr (رضي الله عنه) Cemel Vakası günü (savaşa hazırlanırken) beni yanına çağırdı ve: "Ey oğlum! Bugün ancak zalim veya mazlum olan öldürülür. Ben ancak zalim olarak öldürüleceğimi biliyorum. En büyük endişem, borcumdur" dedi. (Buhârî)`

t[203] = `Resûlullah (ﷺ) şöyle buyurdu: "Zulümden sakının. Çünkü zulüm, kıyamet günü karanlıklardır." (Buhârî, Müslim)`

t[204] = `Resûlullah (ﷺ) şöyle buyurdu: "Kıyamet günü haklar sahiplerine verilecektir. Hatta boynuzsuz koyunun boynuzlu koyundan hakkı alınacaktır." (Müslim)`

t[205] = `Resûlullah (ﷺ) aramızda otururken Veda Haccı'ndan bahsediyorduk. Resûlullah (ﷺ) şöyle buyurdu: "Şu ay ve şu ay ve şu ay haram aylardır." (Buhârî, Müslim)`

t[206] = `Resûlullah (ﷺ) şöyle buyurdu: "Kim bir karış yeri haksız yere alırsa, kıyamet günü yedi kat yerin dibine geçirilir." (Buhârî, Müslim)`

t[207] = `Resûlullah (ﷺ) şöyle buyurdu: "Allah zalime mühlet verir, ama onu yakaladığında bırakmaz." Sonra şu âyeti okudu: "Rabbin, zulmeden beldeleri yakaladığı zaman işte böyle yakalar. Şüphesiz O'nun yakalaması çok acı ve şiddetlidir." (Buhârî, Müslim)`

t[208] = `Resûlullah (ﷺ) beni (Yemen'e vali olarak) gönderdiğinde şöyle nasihat etti: "Kitap ehlinden bir topluma gidiyorsun. Onları Allah'tan başka ilah olmadığına ve Muhammed'in Allah'ın Resûlü olduğuna şehadet etmeye çağır. Eğer buna uyarlarsa, onlara Allah'ın kendilerine günde beş vakit namazı farz kıldığını bildir. Buna da uyarlarsa, Allah'ın kendilerine zenginlerinden alınıp fakirlerine verilmek üzere zekâtı farz kıldığını bildir. Onların değerli mallarından sakın ve mazlumun duasından kork; çünkü onunla Allah arasında perde yoktur." (Buhârî, Müslim)`

t[209] = `Resûlullah (ﷺ), Azd kabilesinden İbnü'l-Lütbiyye adlı bir adamı zekât memuru tayin etti. Adam gelip: "Bunlar sizin, bunlar da bana hediye edilenler" dedi. Resûlullah (ﷺ) ayağa kalkıp hutbe verdi ve şöyle buyurdu: "Neye hakkı olmadığı halde bizim hakkımızda yalan söyleyen, cehennemdeki yerine hazırlansın." (Buhârî, Müslim)`

t[210] = `Resûlullah (ﷺ) şöyle buyurdu: "Kim din kardeşine, ırzına veya malına tecavüz ederek zulmetmişse, dinar ve dirhemin bulunmadığı kıyamet günü gelmeden önce ondan helallik alsın. Yoksa iyi amelleri varsa, zulmettiği miktarda ondan alınıp hak sahibine verilir. İyi amelleri yoksa, hak sahibinin günahlarından alınıp ona yüklenir." (Buhârî)`

t[211] = `Resûlullah (ﷺ) şöyle buyurdu: "Müslüman, elinden ve dilinden diğer Müslümanların güvende olduğu kimsedir. Muhacir ise Allah'ın yasakladığı şeyleri terk eden kimsedir." (Buhârî)`

t[212] = `Resûlullah (ﷺ)'in eşyasından sorumlu Kirkira adlı bir adam vardı. Öldüğünde Resûlullah (ﷺ): "Cehennemededir" buyurdu. Adamlar gidip baktılar ve bir aba veya harmaniye (beytülmalden) çalmış olduğunu gördüler. (Buhârî)`

t[213] = `Resûlullah (ﷺ) şöyle buyurdu: "Zaman (devir) döndü ve Allah'ın gökleri ve yeri yarattığı günkü haline geldi. Bir yıl on iki aydır. Bunlardan dördü haram aylardır: Üçü peşpeşe Zilkade, Zilhicce, Muharrem ve (diğeri) Cemâziyelâhir ile Şaban arasındaki Mudar kabilesinin ayı Recep'tir." (Buhârî, Müslim)`

// Apply all
let count = 0
for (const [num, text] of Object.entries(t)) {
  if (tr.hadiths[num]) {
    tr.hadiths[num].text = text
    count++
  }
}

writeFileSync(fp, JSON.stringify(tr, null, 2) + '\n', 'utf-8')
console.log(`✓ Batch 3: ${count} texts translated (hadiths ${Object.keys(t)[0]}–${Object.keys(t).at(-1)})`)
