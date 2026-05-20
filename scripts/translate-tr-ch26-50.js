/**
 * Turkish translation for chapters 26-50 (hadiths 214-411)
 * Run: node scripts/translate-tr-ch26-50.js
 */
import { readFileSync, writeFileSync } from 'fs'

const fp = new URL('../src/lib/translations/tr.json', import.meta.url)
const ep = new URL('../src/lib/translations/en.json', import.meta.url)
const tr = JSON.parse(readFileSync(fp, 'utf-8'))
const en = JSON.parse(readFileSync(ep, 'utf-8'))

const text = {
  // Chapter 26: Prohibition of Oppression (hadiths 203-221, but 203-213 already done)
  "214": `Resûlullah (ﷺ) şöyle buyurdu: "Allah, bir kimseye dünyalık bir iş verir de o kişi onu gizlerse ve ihanet ederse, kıyamet günü Allah onu ateşten bir bayrakla karşılar." (Müslim)`,
  "215": `Resûlullah (ﷺ)'i şöyle derken işittim: "Birimizi bir işin başına tayin ettiğimizde, o kişi bir iğne veya daha küçük bir şeyi gizlerse, bu bir ihanettir ve kıyamet günü onu getirir." (Müslim)`,
  "216": `Ömer bin Hattâb (رضي الله عنه) şöyle anlatır: Hayber Savaşı günü Resûlullah (ﷺ)'in sahâbîlerinden bir grup gelip: 'Falan kimse şehid oldu, falan kimse şehid oldu' dediler. Bir adama gelince: 'Falan da şehid oldu' dediler. Resûlullah (ﷺ): 'Hayır! Onu, ganimetten aldığı bir abayı üzerinde gördüm. O, cehennemdedir' buyurdu. (Müslim)`,
  "217": `Resûlullah (ﷺ) sahâbenin arasında ayağa kalktı ve onlara Allah yolunda cihadın, Allah'a imanın en faziletli amel olduğunu anlattı. (Buhârî, Müslim)`,
  "218": `Resûlullah (ﷺ) şöyle buyurdu: "Müflis (iflas etmiş) kimdir biliyor musunuz?" Sahâbîler: "Bizde müflis, parası ve malı olmayan kimsedir" dediler. Resûlullah (ﷺ): "Ümmetimden müflis, kıyamet günü namaz, oruç ve zekât sevabıyla gelen, fakat şuna sövdüğü, buna iftira attığı, falancanın malını yediği, filancanın kanını döktüğü, diğerini dövdüğü için iyiliklerinden alınıp bunlara dağıtılan, iyilikleri bitince de hak sahiplerinin günahlarının alınıp ona yüklenen kimsedir." (Müslim)`,
  "219": `Resûlullah (ﷺ) şöyle buyurdu: "Ben de sizin gibi bir insanım. Aramızda anlaşmazlık olduğunda, biriniz delilini daha güzel ifade edebilir. Ben de duyduğuma göre hüküm veririm. Kimin lehine, kardeşinin hakkından bir şeye hükmedersem, onu almasın. Çünkü ona cehennemden bir parça veriyorum." (Buhârî, Müslim)`,
  "220": `Resûlullah (ﷺ) şöyle buyurdu: "Mümin, kan dökmediği sürece dininin genişliği içinde rahat eder." (Buhârî)`,
  "221": `Resûlullah (ﷺ)'i şöyle derken işittim: "Bu kişi, dünyada iken Allah'ın haram kıldığı bir kanı akıtmış olmasaydı (eğer öldürülseydi), Allah onu ateşe atmazdı." (Buhârî)`,

  // Chapter 27: Honouring the Sanctity of Muslims (hadiths 222-239)
  "222": `Resûlullah (ﷺ) şöyle buyurdu: "Mümin, diğer mümin için, birbirini destekleyen bir bina gibidir." (Buhârî, Müslim)`,
  "223": `Resûlullah (ﷺ) şöyle buyurdu: "Biriniz mescidlerimizden veya çarşılarımızdan geçerken elinde mızrak varsa, onun sivri ucunu tutsun." (Buhârî, Müslim)`,
  "224": `Resûlullah (ﷺ) şöyle buyurdu: "Müminlerin birbirlerine olan sevgi, merhamet ve şefkatteki benzerlikleri, bir tek vücuda benzer. Vücudun bir organı rahatsız olduğunda, diğer organlar da uykusuzluk ve ateşle ona ortak olur." (Müslim)`,
  "225": `Resûlullah (ﷺ) Hasan bin Ali (رضي الله عنهما)'yi öptü. O sırada Akra' bin Hâbis de yanında oturuyordu. Akra': "Benim on çocuğum var, hiçbirini öpmedim" dedi. Resûlullah (ﷺ) ona baktı ve: "Merhamet etmeyene merhamet edilmez" buyurdu. (Buhârî, Müslim)`,
  "226": `Âişe (رضي الله عنها) şöyle anlatır: Bazı bedevîler Resûlullah (ﷺ)'e gelip: "Çocuklarınızı öpüyor musunuz?" diye sordular. Resûlullah (ﷺ): "Evet" buyurdu. Onlar: "Vallahi biz öpmeyiz" dediler. Resûlullah (ﷺ): "Allah kalplerinizden merhameti çekip çıkarmışsa, size ne yapabilirim?" buyurdu. (Buhârî, Müslim)`,
  "227": `Resûlullah (ﷺ) şöyle buyurdu: "İnsanlara merhamet etmeyene Allah merhamet etmez." (Müslim)`,
  "228": `Resûlullah (ﷺ) şöyle buyurdu: "Biriniz insanlara namaz kıldırdığında hafif kıldırsın. Çünkü cemaatte zayıf, hasta ve yaşlı olanlar vardır. Kendi başına namaz kıldığında dilediği kadar uzatsın." (Buhârî, Müslim)`,
  "229": `Âişe (رضي الله عنها) şöyle dedi: Resûlullah (ﷺ) bir ameli yapmayı çok istediği halde, insanların da onu yapıp farz haline gelmesinden korktuğu için onu yapmazdı. (Buhârî, Müslim)`,
  "230": `Âişe (رضي الله عنها) şöyle dedi: Resûlullah (ﷺ) onları visâl orucundan (ara vermeksizin arka arkaya oruç tutmak) merhametinden dolayı menetti. Sahâbîler: "Ama sen visâl yapıyorsun" dediler. Resûlullah (ﷺ): "Ben sizin gibi değilim. Rabbim beni yedirir ve içirir" buyurdu. (Buhârî, Müslim)`,
  "231": `Resûlullah (ﷺ) şöyle buyurdu: "Namaza kalkar, uzatmak isterim. Fakat bir çocuğun ağlamasını işitir, annesinin rahatsız olmasından endişe ederek namazı kısa keserim." (Buhârî)`,
  "232": `Resûlullah (ﷺ) şöyle buyurdu: "Sabah namazını kılan kimse Allah'ın koruması altındadır. Allah, koruması altındaki bir kimseden bir şey talep etmesin. Kimi talep ederse ona yetişir ve sonra onu cehenneme yüzüstü atar." (Müslim)`,
  "233": `Resûlullah (ﷺ) şöyle buyurdu: "Müslüman, Müslümanın kardeşidir. Ona zulmetmez, onu (düşmana) teslim etmez. Kim kardeşinin bir ihtiyacını giderirse, Allah da onun bir ihtiyacını giderir. Kim bir Müslümanın bir sıkıntısını giderirse, Allah da onun kıyamet günündeki sıkıntılarından birini giderir. Kim bir Müslümanın ayıbını örterse, Allah da dünya ve ahirette onun ayıbını örter." (Buhârî, Müslim)`,
  "234": `Resûlullah (ﷺ) şöyle buyurdu: "Müslüman, Müslümanın kardeşidir. Ona hainlik etmez, yalan söylemez, onu yüzüstü bırakmaz. Müslümanın her şeyi Müslümana haramdır: kanı, malı ve namusu. Takvâ işte şuradadır (kalbi göstererek). Bir kişiye kötülük olarak, Müslüman kardeşini küçük görmesi yeter." (Tirmizî)`,
  "235": `Resûlullah (ﷺ) şöyle buyurdu: "Birbirinize haset etmeyin, birbirinize aldatmayın, birbirinize kin tutmayın, birbirinize sırt çevirmeyin. Ey Allah'ın kulları! Kardeş olun. Bir Müslümanın, din kardeşiyle üç günden fazla dargın durması helal değildir." (Buhârî, Müslim)`,
  "236": `Resûlullah (ﷺ) şöyle buyurdu: "Sizden biriniz, kendisi için istediğini (hayrı) kardeşi için de istemedikçe (gerçek anlamda) iman etmiş olmaz." (Buhârî, Müslim)`,
  "237": `Resûlullah (ﷺ) şöyle buyurdu: "Din kardeşine, ister zulmeden ister zulme uğrayan olsun, yardım et." Sahâbîler: "Zulme uğrayana yardım ederiz, ama zulmedene nasıl yardım ederiz?" dediler. Resûlullah (ﷺ): "Onu zulümden alıkoyarsın, işte bu ona yardımdır" buyurdu. (Buhârî)`,
  "238": `Resûlullah (ﷺ) şöyle buyurdu: "Müslümanın Müslüman üzerinde beş hakkı vardır: Selamını almak, hastasını ziyaret etmek, cenazesine katılmak, davetine icabet etmek ve aksırdığında 'yerhamükellah' demek." (Buhârî, Müslim)`,
  "239": `Berâ bin Âzib (رضي الله عنهما) şöyle dedi: Resûlullah (ﷺ) bize yedi şeyi emretti, yedi şeyi yasakladı: Bizi, hastayı ziyaret etmeyi, cenazeye katılmayı, aksırana dua etmeyi, yemin edenin yeminini yerine getirmeyi, zulme uğrayana yardım etmeyi, davete icabet etmeyi ve selamı yaymayı emretti. (Buhârî, Müslim)`,

  // Chapter 28: Concealing Faults (hadiths 240-243)
  "240": `Resûlullah (ﷺ) şöyle buyurdu: "Kim dünyada bir Müslümanın ayıbını örterse, Allah da dünya ve ahirette onun ayıbını örter." (Müslim)`,
  "241": `Resûlullah (ﷺ)'i şöyle derken işittim: "Ümmetimin hepsi affedilir, ancak günahını açığa vuranlar müstesna. Kişi gece bir günah işler, Allah onu örter. Sonra sabah olunca 'Ey filan, dün şöyle yaptım' der. Böylece Allah'ın örttüğünü açığa vurmuş olur." (Buhârî, Müslim)`,
  "242": `Resûlullah (ﷺ) şöyle buyurdu: "Cariye zina eder ve zinası sabit olursa, ona sopa vurun (celde). Sonra tekrar zina ederse yine sopa vurun. Üçüncü veya dördüncüde, onu bir ipe (veya bir deve semeri) karşılığında satın." (Buhârî, Müslim)`,
  "243": `Resûlullah (ﷺ)'e içki içmiş bir adam getirildi. Resûlullah (ﷺ): "Ona vurun" buyurdu. Ebû Hüreyre: "Kimimiz eliyle, kimimiz ayakkabısıyla, kimimiz elbisesiyle vurduk. Sonra birisi: 'Allah seni rezil etsin' dedi. Resûlullah (ﷺ): 'Böyle söyleme, şeytana yardım etme' buyurdu." (Buhârî)`,

  // Chapter 29: Fulfilling Needs (hadiths 244-245)
  "244": `Resûlullah (ﷺ) şöyle buyurdu: "Müslüman, Müslümanın kardeşidir. Ona zulmetmez, onu (düşmana) teslim etmez. Kim kardeşinin bir ihtiyacını giderirse, Allah da onun bir ihtiyacını giderir." (Buhârî, Müslim)`,
  "245": `Resûlullah (ﷺ) şöyle buyurdu: "Kim bir Müslümanın dünya sıkıntılarından birini giderirse, Allah da onun kıyamet sıkıntılarından birini giderir. Kim darda olana kolaylık gösterirse, Allah da dünya ve ahirette ona kolaylık gösterir. Kim bir Müslümanın ayıbını örterse, Allah da dünya ve ahirette onun ayıbını örter." (Müslim)`,

  // Chapter 30: Intercession (hadiths 246-247)
  "246": `Resûlullah (ﷺ)'e bir ihtiyaç sahibi geldiğinde, yanında oturanlara döner ve: "Şefaat edin, sevap alırsınız. Allah, Resûlü'nün diliyle dilediğini hükmeder" buyururdu. (Buhârî, Müslim)`,
  "247": `Abdullah bin Abbâs (رضي الله عنهما) şöyle anlatır: Berîre (رضي الله عنها) ve kocası hakkında Resûlullah (ﷺ) ona şöyle buyurdu: "Niçin ona dönmüyorsun? O senin çocuklarının babasıdır." Berîre: "Ey Allah'ın Resûlü! Bana emrediyor musun?" dedi. Resûlullah (ﷺ): "Hayır, sadece şefaat ediyorum" buyurdu. (Buhârî)`,

  // Chapter 31: Restoring Harmony (hadiths 248-251)
  "248": `Resûlullah (ﷺ) şöyle buyurdu: "Her gün güneşin doğmasıyla insanın her eklemi için bir sadaka gerekir. İki kişinin arasını bulmak da bir sadakadır." (Buhârî, Müslim)`,
  "249": `Resûlullah (ﷺ)'i şöyle derken işittim: "İnsanlar arasını bulmak için hayırlı söz söyleyen veya hayırlı bir şey uyduran yalancı sayılmaz." (Buhârî, Müslim)`,
  "250": `Âişe (رضي الله عنها) şöyle anlatır: Resûlullah (ﷺ) kapısının dışında, seslerini yükseltmiş iki kişinin tartışmasını duydu. (Buhârî)`,
  "251": `Sehl bin Sa'd (رضي الله عنه) şöyle anlatır: Resûlullah (ﷺ)'e Amr bin Avf kabilesi arasında bir anlaşmazlık çıktığı haberi ulaştı. Resûlullah (ﷺ) aralarını bulmak için yanlarına gitti. (Buhârî)`,

  // Chapter 32: Virtues of the Weak (hadiths 252-259)
  "252": `Resûlullah (ﷺ)'i şöyle derken işittim: "Size cennet ehlinin kimler olduğunu haber vereyim mi? Zayıf görülen ve kendisine değer verilmeyen her kimsedir. Allah'a yemin ederse, Allah onu yemininde başarılı kılar. Size cehennem ehlinin kimler olduğunu haber vereyim mi? Sert, kaba, büyüklük taslayan her kimsedir." (Buhârî, Müslim)`,
  "253": `Resûlullah (ﷺ)'in yanından bir adam geçti. Resûlullah (ﷺ) yanında oturan birine: "Bu adam hakkında ne düşünüyorsun?" diye sordu. (Buhârî, Müslim)`,
  "254": `Resûlullah (ﷺ) şöyle buyurdu: "Cennet ve cehennem tartıştı. Cehennem: 'Bende zorbalar ve kibirliler var' dedi. Cennet: 'Bende zayıflar ve yoksullar var' dedi." (Müslim)`,
  "255": `Resûlullah (ﷺ) şöyle buyurdu: "Kıyamet günü şişman ve önemli bir adam getirilir, Allah katında bir sivrisinek kanadı ağırlığınca bile değeri olmaz." (Buhârî, Müslim)`,
  "256": `Siyah bir kadın (veya genç) mescidi süpürürdü. Resûlullah (ﷺ) onu görmeyince sordu. 'Öldü' dediler. 'Bana neden haber vermediniz?' buyurdu ve kabrine gidip dua etti. (Buhârî, Müslim)`,
  "257": `Resûlullah (ﷺ) şöyle buyurdu: "Nice toz toprak içinde, dağınık saçlı, kapılardan kovulan kimseler vardır ki, Allah'a yemin etse Allah onu yemininde doğru çıkarır." (Müslim)`,
  "258": `Resûlullah (ﷺ) şöyle buyurdu: "Cennetin kapısında durdum ve cennete girenlerin çoğunun fakirler olduğunu gördüm." (Buhârî, Müslim)`,
  "259": `Resûlullah (ﷺ) şöyle buyurdu: "Beşikte sadece üç kişi konuştu: (1) Meryem oğlu İsa, (2) Cüreyc'in yanındaki çocuk, (3) Bir başka bebek." (Buhârî, Müslim)`,

  // Chapter 33: Compassion for Orphans (hadiths 260-272)
  "260": `Biz altı kişilik bir grupla Resûlullah (ﷺ)'in yanında iken, müşrikler Resûlullah (ﷺ)'e: 'Şu zayıf kimseleri yanından kov' dediler. (Müslim)`,
  "261": `Ebû Hubeyre Âiz bin Amr el-Müzenî (رضي الله عنه) —ki Rıdvan Biatı'nda bulunanlardandır— şöyle anlatır: Resûlullah (ﷺ) şöyle buyurdu: "Cehennem ateşinden korunun, bir hurma ile de olsa." (Buhârî, Müslim)`,
  "262": `Resûlullah (ﷺ) şöyle buyurdu: "Ben ve yetime bakan kimse cennette şöyleyiz." Ve işaret ve orta parmaklarını göstererek aralarını biraz açtı. (Buhârî)`,
  "263": `Resûlullah (ﷺ) şöyle buyurdu: "Ben ve yetime bakan kimse, ister yakını ister uzağı olsun, cennette şöyleyiz." (Müslim)`,
  "264": `Resûlullah (ﷺ) şöyle buyurdu: "Fakir, bir iki hurma veya bir iki lokma ile geri çevrilen kimse değildir. Asıl fakir, insanlardan dilenmeyen ve durumu bilinmeyen kimsedir." (Buhârî, Müslim)`,
  "265": `Resûlullah (ﷺ) şöyle buyurdu: "Dul ve yoksulların işini gören kimse, Allah yolunda cihat eden gibidir." (Buhârî)`,
  "266": `Resûlullah (ﷺ) şöyle buyurdu: "Yemeğin en kötüsü, zenginlerin çağrılıp fakirlerin çağrılmadığı düğün yemeğidir. Kim davete icabet etmezse Allah ve Resûlü'ne isyan etmiş olur." (Müslim)`,
  "267": `Resûlullah (ﷺ) şöyle buyurdu: "Kim iki kız çocuğunu büluğ çağına gelinceye kadar yetiştirirse, kıyamet günü ben ve o şöyleyiz." Ve parmaklarını birleştirdi. (Müslim)`,
  "268": `Âişe (رضي الله عنها) şöyle anlatır: İki kızını taşıyan fakir bir kadın bana geldi. Ona üç hurma verdim. Kadın her birine bir hurma verdi ve üçüncü hurmayı ağzına götürecekken kızlar onu istedi. Kadın hurmayı ikiye bölüp kızlarına verdi. (Buhârî, Müslim)`,
  "269": `Âişe (رضي الله عنها) bu olayı anlattı ve şöyle dedi: Sonra Resûlullah (ﷺ) geldi ve ona anlattım. Resûlullah (ﷺ): "Allah, bu kadına cenneti farz kıldı ve onu cehennemden azat etti" buyurdu. (Müslim)`,
  "270": `Resûlullah (ﷺ) şöyle buyurdu: "Allah'ım! İki zayıfın hakkını zayi edenlere karşı uyarıyorum: Yetim ve kadın." (İbn Mâce)`,
  "271": `Sa'd (رضي الله عنه) kendinden aşağıdakilere karşı üstünlük tasladığını hissetti. Bunun üzerine Resûlullah (ﷺ): "Allah'a karşı ancak takva sahibi kullar üstünlük kazanır" buyurdu. (Muvatta)`,
  "272": `Resûlullah (ﷺ)'i şöyle derken işittim: "Bana zayıflarınızı arayın. Çünkü siz, zayıflarınız sayesinde rızıklandırılır ve yardım görürsünüz." (Ebû Dâvûd, Tirmizî)`,

  // Chapter 34: Treating Women Well (hadiths 273-280)
  "273": `Resûlullah (ﷺ) şöyle buyurdu: "Kadınlara iyi davranmanızı tavsiye ederim. Çünkü kadın, kaburga kemiğinden yaratılmıştır. Kaburganın en eğri yeri üst kısmıdır. Onu doğrultmaya kalkarsan kırarsın, kendi haline bırakırsan eğri kalır. Kadınlara iyi davranın." (Buhârî, Müslim)`,
  "274": `Resûlullah (ﷺ)'i hutbe verirken işitti: "Sâlih (عليه السلام)'in devesini ve onu öldüren adamdan bahsetti. (Buhârî, Müslim)`,
  "275": `Resûlullah (ﷺ) şöyle buyurdu: "Mümin bir erkek, mümin bir kadına (bir özelliğinden dolayı) buğz etmesin. Çünkü onun bir huyunu beğenmezse, başka bir huyundan hoşnut olur." (Müslim)`,
  "276": `Resûlullah (ﷺ)'i Veda Haccı'nda şöyle derken işitti: "Kadınlar hakkında Allah'tan korkun. Çünkü siz onları Allah'ın emaneti olarak aldınız ve onların namuslarını Allah'ın adıyla helal kıldınız." (Müslim)`,
  "277": `Muâz bin Cebel (رضي الله عنه) şöyle anlatır: Dedim ki: "Ey Allah'ın Resûlü! Kadının kocası üzerindeki hakkı nedir?" Resûlullah (ﷺ): "Yediğin zaman ona da yedirmen, giydiğin zaman ona da giydirmen, yüzüne vurmaman, ona kötü söz söylememen ve evin dışında ona darılmaman" buyurdu. (Ebû Dâvûd, İbn Mâce)`,
  "278": `Resûlullah (ﷺ) şöyle buyurdu: "Müminlerin iman bakımından en mükemmeli, ahlâkı en güzel olanıdır. En hayırlınız, kadınlarına karşı en iyi davrananınızdır." (Tirmizî)`,
  "279": `Resûlullah (ﷺ) şöyle buyurdu: "Allah'ın cariyelerini (kadınları) dövmeyin." Sonra Ömer (رضي الله عنه) Resûlullah (ﷺ)'e gelip: "Kadınlar kocalarına karşı başkaldırdı" dedi. Bunun üzerine Resûlullah (ﷺ) onları dövmeye izin verdi. Sonra kadınlar Resûlullah (ﷺ)'in hanımlarının yanına şikâyete gittiler. Resûlullah (ﷺ): "Bugün yetmiş kadın Muhammed'in ailesine şikâyete geldi. Kadınlarına iyi davranmayanlar, onların en hayırlıları değildir." (Ebû Dâvûd, İbn Mâce)`,
  "280": `Resûlullah (ﷺ) şöyle buyurdu: "Dünya bir metadır. Dünyanın en hayırlı metası saliha bir kadındır." (Müslim)`,

  // Chapter 35: Rights of Husband (hadiths 281-288)
  "281": `Resûlullah (ﷺ) şöyle buyurdu: "Bir kadın, kocası onu yatağına çağırdığında gelmez ve kocası ona kızgın olarak sabahlarsa, melekler sabaha kadar ona lanet eder." (Buhârî, Müslim)`,
  "282": `Resûlullah (ﷺ) şöyle buyurdu: "Kocası yanında iken, kadının onun izni olmadan (nafile) oruç tutması helal değildir." (Buhârî, Müslim)`,
  "283": `Resûlullah (ﷺ) şöyle buyurdu: "Hepiniz çobansınız ve hepiniz güttüklerinizden sorumlusunuz. Devlet başkanı bir çobandır ve sorumludur. Erkek, ailesinin çobanıdır ve sorumludur. Kadın, kocasının evinin çobanıdır ve sorumludur." (Buhârî, Müslim)`,
  "284": `Resûlullah (ﷺ) şöyle buyurdu: "Koca karısını ihtiyacı için çağırdığında, kadın fırının başında olsa bile ona gelsin." (Tirmizî)`,
  "285": `Resûlullah (ﷺ) şöyle buyurdu: "Eğer bir kimseye (Allah'tan başka) secde etmeyi emredecek olsaydım, kadına kocasına secde etmesini emrederdim." (Tirmizî)`,
  "286": `Resûlullah (ﷺ) şöyle buyurdu: "Kocası kendisinden razı olduğu halde ölen kadın cennete girer." (Tirmizî)`,
  "287": `Resûlullah (ﷺ) şöyle buyurdu: "Hangi kadın dünyada kocasını üzerse, cennetteki huri eşi şöyle der: 'Allah seni kahretsin! Onu rahatsız etme. O senin yanında ancak bir misafirdir. Yakında senden ayrılıp bize gelecektir.'" (Tirmizî)`,
  "288": `Resûlullah (ﷺ) şöyle buyurdu: "Erkekler için kadınlardan daha zararlı bir fitne bırakmadım." (Buhârî, Müslim)`,

  // Chapter 36: Spending on Family (hadiths 289-296)
  "289": `Resûlullah (ﷺ) şöyle buyurdu: "Allah yolunda harcadığın dinar, bir köle azat etmek için harcadığın dinar, bir fakire sadaka olarak verdiğin dinar ve ailene harcadığın dinar. Bunların en faziletlisi ailene harcadığındır." (Müslim)`,
  "290": `Resûlullah (ﷺ)'in azatlı kölesi Sevbân (رضي الله عنه) şöyle anlatır: Resûlullah (ﷺ) şöyle buyurdu: "Bir kimsenin en faziletli dinarı, ailesi için harcadığı dinardır." (Müslim)`,
  "291": `Ümmü Seleme (رضي الله عنها) şöyle dedi: "Ey Allah'ın Resûlü! Ebû Seleme'nin çocuklarına harcama yaparsam sevap alır mıyım? Onları kendi haline bırakıp sahipsiz görmek istemiyorum." Resûlullah (ﷺ): "Evet, onlara harcadıklarından dolayı sevap alırsın" buyurdu. (Buhârî, Müslim)`,
  "292": `Sa'd bin Ebû Vakkas (رضي الله عنه)'ın uzun hadisi daha önce geçmişti: "Ey Allah'ın Resûlü! Ben varlıklı bir adamım. Kızımdan başka varisim yok. Malımın ne kadarını sadaka olarak vereyim?" (Buhârî, Müslim)`,
  "293": `Resûlullah (ﷺ) şöyle buyurdu: "Kişi, ailesine sevap niyetiyle bir harcama yaptığında, bu onun için bir sadaka olur." (Buhârî, Müslim)`,
  "294": `Resûlullah (ﷺ) şöyle buyurdu: "Kişiye, bakmakla yükümlü olduğu kimseleri ihmal etmesi günah olarak yeter." (Buhârî, Müslim)`,
  "295": `Resûlullah (ﷺ) şöyle buyurdu: "Her sabah iki melek iner. Biri: 'Allah'ım! İnfak edene (yeniden) ver' der. Diğeri: 'Allah'ım! Vermeyene (malında) yok olma ver' der." (Buhârî, Müslim)`,
  "296": `Resûlullah (ﷺ) şöyle buyurdu: "Üstteki el, alttaki elden hayırlıdır. (İnfaka) ailenden başla." (Buhârî, Müslim)`,

  // Chapter 37: Spending from Best (hadith 297)
  "297": `Ebû Talha (رضي الله عنه) Medine'de ensarın en çok hurmalığına sahipti. En sevdiği malı ise Mescid-i Nebevî'nin karşısındaki Beyruhâ adlı bahçesiydi. "Sevdiğiniz şeylerden infak etmedikçe iyiliğe eremezsiniz" âyeti inince, Resûlullah (ﷺ)'e gelip: "Ey Allah'ın Resûlü! En sevdiğim malım Beyruhâ'dır. Onu Allah yolunda sadaka olarak veriyorum" dedi. (Buhârî, Müslim)`,

  // Chapter 38: Obligation to Command Family (hadiths 298-302)
  "298": `Hasan bin Ali (رضي الله عنهما) sadaka olarak verilen bir hurmayı alıp ağzına koydu. Resûlullah (ﷺ): "Kaka, kaka! Onu at, sadaka olduğunu bilmiyor musun?" buyurdu. (Buhârî, Müslim)`,
  "299": `Ömer bin Ebû Seleme (رضي الله عنه) —Ümmü Seleme (رضي الله عنها)'nin oğlu— şöyle anlatır: Resûlullah (ﷺ)'in himayesindeydim. Elim yemek kabının etrafında dolaşırdı. Resûlullah (ﷺ) bana: "Ey oğul! Besmele çek, sağ elinle ye ve önünden ye" buyurdu. (Buhârî, Müslim)`,
  "300": `Resûlullah (ﷺ)'i şöyle derken işittim: "Hepiniz çobansınız ve hepiniz güttüklerinizden sorumlusunuz. Devlet başkanı bir çobandır, erkek ailesinin çobanıdır, kadın kocasının evinin ve çocuklarının çobanıdır." (Buhârî, Müslim)`,
  "301": `Amr bin Şuayb, babasından, o da dedesinden (رضي الله عنه) şöyle rivayet eder: Resûlullah (ﷺ) şöyle buyurdu: "Çocuklarınıza yedi yaşında namazı emredin. On yaşında (kılmazlarsa) dövün ve yataklarını ayırın." (Ebû Dâvûd)`,
  "302": `Resûlullah (ﷺ) şöyle buyurdu: "Çocuğa yedi yaşında namazı öğretin. On yaşında (kılmazsa) dövün." (Ebû Dâvûd, Tirmizî)`,

  // Chapter 39: Rights of the Neighbour (hadiths 303-311)
  "303": `İbn Ömer (رضي الله عنهما) ve Âişe (رضي الله عنها) şöyle anlatır: Resûlullah (ﷺ) şöyle buyurdu: "Cebrail bana komşu hakkında o kadar çok tavsiyede bulundu ki, komşunun komşuya varis olacağını sandım." (Buhârî, Müslim)`,
  "304": `Resûlullah (ﷺ) şöyle buyurdu: "Ey Ebû Zer! Çorba pişirdiğinde suyunu çok koy ve komşularını da gözet." (Müslim)`,
  "305": `Resûlullah (ﷺ) şöyle buyurdu: "Allah'a yemin ederim ki, mümin olamaz. Allah'a yemin ederim ki, mümin olamaz. Allah'a yemin ederim ki, mümin olamaz." "Kimdir o, ey Allah'ın Resûlü?" denildi. "Komşusunun, şerlerinden güvende olmadığı kimsedir" buyurdu. (Buhârî)`,
  "306": `Resûlullah (ﷺ) şöyle buyurdu: "Ey Müslüman kadınlar! Hiçbir kadın komşusuna bir koyun paçası da olsa hediye vermekten çekinmesin." (Buhârî, Müslim)`,
  "307": `Resûlullah (ﷺ) şöyle buyurdu: "Hiçbiriniz, komşusunun duvarına bir mertek koymasına engel olmasın." (Buhârî, Müslim)`,
  "308": `Resûlullah (ﷺ) şöyle buyurdu: "Allah'a ve ahiret gününe inanan, komşusuna eziyet etmesin. Allah'a ve ahiret gününe inanan, misafirine ikramda bulunsun. Allah'a ve ahiret gününe inanan, ya hayır söylesin veya sussun." (Buhârî, Müslim)`,
  "309": `Resûlullah (ﷺ) şöyle buyurdu: "Allah'a ve ahiret gününe inanan, komşusuna iyilik etsin." (Buhârî, Müslim)`,
  "310": `Abdullah bin Amr (رضي الله عنهما) şöyle dedi: "Ey Allah'ın Resûlü! İki komşum var. Hangisine hediye vereyim?" Resûlullah (ﷺ): "Kapısı sana en yakın olana" buyurdu. (Buhârî)`,
  "311": `Resûlullah (ﷺ) şöyle buyurdu: "Allah katında arkadaşların en hayırlısı, arkadaşına karşı en iyi davranandır. Komşuların en hayırlısı, komşusuna karşı en iyi davranandır." (Tirmizî)`,

  // Chapter 40: Kindness to Parents (hadiths 312-335)
  "312": `Abdullah bin Mes'ûd (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ)'e: "Hangi amel daha faziletlidir?" diye sordum. Resûlullah (ﷺ): "Vaktinde kılınan namaz" buyurdu. "Sonra hangisi?" dedim. "Ana babaya iyilik" buyurdu. "Sonra hangisi?" dedim. "Allah yolunda cihad" buyurdu. (Buhârî, Müslim)`,
  "313": `Resûlullah (ﷺ) şöyle buyurdu: "Evlat, babasının hakkını ancak, onu köle olarak bulup satın alıp azat etmekle ödeyebilir." (Müslim)`,
  "314": `Resûlullah (ﷺ) şöyle buyurdu: "Allah'a ve ahiret gününe inanan, misafirine ikram etsin. Allah'a ve ahiret gününe inanan, akrabasını ziyaret etsin. Allah'a ve ahiret gününe inanan, ya hayır söylesin veya sussun." (Buhârî, Müslim)`,
  "315": `Resûlullah (ﷺ) şöyle buyurdu: "Allah mahlûkatı yarattı. Yaratmayı bitirince akrabalık bağı kalktı ve şöyle dedi: 'Bu, Sana sığınanın makamıdır. Seni rahmetle ananla bağını sürdürmeni, kesenle de kesmeni dilerim.' Allah: 'Peki, seninle bağını sürdürenle ben de bağlantımı sürdürürüm, seni kesenle de keserim' buyurdu." (Buhârî)`,
  "316": `Bir adam Resûlullah (ﷺ)'e gelip: "Ey Allah'ın Resûlü! İnsanlardan en iyi arkadaşlığa layık olan kimdir?" diye sordu. Resûlullah (ﷺ): "Annendir" buyurdu. "Sonra kim?" dedi. "Annendir" buyurdu. "Sonra kim?" dedi. "Annendir" buyurdu. "Sonra kim?" dedi. "Baban" buyurdu. (Buhârî, Müslim)`,
  "317": `Resûlullah (ﷺ) şöyle buyurdu: "Yazıklar olsun! Yine yazıklar olsun! Yine yazıklar olsun o kimseye ki, ana babası veya ikisinden biri yanında yaşlanır da cennete giremez." (Müslim)`,
  "318": `Bir adam: "Ey Allah'ın Resûlü! Akrabalarım var, onlarla iyi ilişki kuruyorum, ama onlar benimle ilişkiyi kesiyorlar. Ben onlara iyilik ediyorum, onlar bana kötülük ediyor. Ben onlara yumuşak davranıyorum, onlar bana sert davranıyor" dedi. Resûlullah (ﷺ): "Eğer dediğin gibiysen, onlara kor döküyorsun demektir. Bu durumda Allah'ın yardımı senden yana olur." (Müslim)`,
  "319": `Resûlullah (ﷺ) şöyle buyurdu: "Kim rızkının genişlemesini ve ömrünün uzamasını istiyorsa, akrabasını ziyaret etsin." (Buhârî, Müslim)`,
  "320": `Enes (رضي الله عنه) şöyle anlatır: Ebû Talha (رضي الله عنه), Medine'de ensarın en çok hurmalığına sahipti. En sevdiği malı ise Beyruhâ adlı bahçesiydi. "Sevdiğiniz şeylerden infak etmedikçe iyiliğe eremezsiniz" âyeti inince Resûlullah (ﷺ)'e gelip: "Ey Allah'ın Resûlü! En sevdiğim malım Beyruhâ'dır. Onu Allah yolunda sadaka olarak veriyorum. Allah katında onu biriktirmeni ve yakınlarım arasında paylaştırmanı dilerim" dedi. (Buhârî, Müslim)`,
  "321": `Bir adam Resûlullah (ﷺ)'e gelip: "Sevabını Allah'tan umarak hicret ve cihat için size biat ediyorum" dedi. Resûlullah (ﷺ): "Ana babandan sağ olan var mı?" buyurdu. Adam: "Evet, ikisi de sağ" dedi. Resûlullah (ﷺ): "Peki sen sevabı Allah'tan mı umuyorsun?" buyurdu. Adam: "Evet" dedi. Resûlullah (ﷺ): "Öyleyse ana babana dön ve onlara iyi bak" buyurdu. (Buhârî, Müslim)`,
  "322": `Resûlullah (ﷺ) şöyle buyurdu: "Sıla-i rahim (akraba ziyareti), iyiliğe iyilikle karşılık vermek değildir. Asıl sıla-i rahim, akrabasının ilişkiyi kestiği zaman onunla ilişkiyi sürdürendir." (Buhârî)`,
  "323": `Resûlullah (ﷺ) şöyle buyurdu: "Rahim (akrabalık bağı) Arş'a asılıdır ve şöyle der: 'Benimle bağını sürdürenle Allah bağını sürdürsün, beni kesenle Allah bağını kessin.'" (Buhârî, Müslim)`,
  "324": `Âişe (رضي الله عنها) şöyle anlatır: Bir cariyeyi Resûlullah (ﷺ)'in iznini almadan azat etti. Resûlullah (ﷺ)'in yanına gelme sırası geldiğinde ona durumu anlattı. (Buhârî, Müslim)`,
  "325": `Esma bint Ebû Bekr (رضي الله عنها) şöyle anlatır: Müşrik olan annem Resûlullah (ﷺ) zamanında bana geldi. Resûlullah (ﷺ)'e: "Annem bana geldi. Ona iyilik yapabilir miyim?" diye sordum. Resûlullah (ﷺ): "Evet, annene iyilik yap" buyurdu. (Buhârî, Müslim)`,
  "326": `Abdullah bin Mes'ûd (رضي الله عنه)'un hanımı Zeyneb es-Sekafiyye (رضي الله عنها) şöyle anlatır: Resûlullah (ﷺ) şöyle buyurdu: "Ey kadınlar! Malınızın bir kısmını sadaka olarak verin." (Buhârî, Müslim)`,
  "327": `Ebû Süfyân (رضي الله عنه) şöyle anlatır: Herakleios'un uzun konuşmasında bana: "Resûlullah (ﷺ) size neyi emrediyor?" diye sordu. Ben: "Namaz kılmayı, doğru söylemeyi, iffetli olmayı ve akrabalık bağlarını korumayı emrediyor" dedim. (Buhârî, Müslim)`,
  "328": `Resûlullah (ﷺ) şöyle buyurdu: "Yakında öyle bir beldeyi fethedeceksiniz ki, orada kırat (para birimi) kullanılır." (Buhârî)`,
  "329": `"Yakın akrabanı uyar" (Şuarâ 214) âyeti inince, Resûlullah (ﷺ) Kureyş'i topladı ve genel ve özel olarak uyardı. (Buhârî, Müslim)`,
  "330": `Resûlullah (ﷺ)'i yüksek sesle şöyle derken işittim: "Falan ailesi benim dostlarım değildir. Benim dostlarım Allah ve salih müminlerdir." (Buhârî, Müslim)`,
  "331": `Bir adam: "Ey Allah'ın Resûlü! Bana beni cennete sokacak ve cehennemden uzaklaştıracak bir amel söyle" dedi. Resûlullah (ﷺ): "Allah'a ibadet et, O'na hiçbir şeyi ortak koşma, namazı kıl, zekâtı ver ve akrabanı ziyaret et" buyurdu. (Buhârî, Müslim)`,
  "332": `Resûlullah (ﷺ) şöyle buyurdu: "Biriniz orucunu açacağı zaman hurma ile açsın. Çünkü hurma bereketlidir. Hurma bulamazsa su ile açsın. Çünkü su temizdir." (Tirmizî, Ebû Dâvûd)`,
  "333": `Abdullah bin Ömer (رضي الله عنهما) şöyle anlatır: Sevdiğim bir kadınla evliydim. Babam Ömer (رضي الله عنه) onu sevmezdi. Bana: "Onu boşa" dedi. Ben boşamadım. Babam Resûlullah (ﷺ)'e gidip durumu anlattı. Resûlullah (ﷺ): "Boşa onu" buyurdu. (Tirmizî, Ebû Dâvûd)`,
  "334": `Bir adam Sa'd (رضي الله عنه)'a gelip: "Bir eşim var, annem onu boşamamı istiyor" dedi. Sa'd: "Resûlullah (ﷺ)'i şöyle derken işittim: 'Ana babaya itaat etmeyen kimse cennetin kokusunu bile alamaz'" dedi. (Buhârî, Müslim)`,
  "335": `Resûlullah (ﷺ) şöyle buyurdu: "Teyze, anne konumundadır." (Tirmizî)`,

  // Chapter 41: Prohibition of Disobeying Parents (hadiths 336-340)
  "336": `Resûlullah (ﷺ) şöyle buyurdu: "Size büyük günahların en büyüğünü haber vereyim mi?" Bunu üç kere tekrarladı. "Allah'a ortak koşmak, ana babaya isyan etmek" buyurdu. Sonra yaslanmışken doğrulup: "Dikkat edin! Yalan söylemek ve yalancı şahitlik de!" Bunu o kadar tekrarladı ki, keşke sussaydı dedik. (Buhârî, Müslim)`,
  "337": `Resûlullah (ﷺ) şöyle buyurdu: "Büyük günahlar: Allah'a ortak koşmak, ana babaya isyan etmek, bir cana kıymak ve yalan yemin etmektir." (Buhârî)`,
  "338": `Resûlullah (ﷺ) şöyle buyurdu: "Büyük günahlardan biri de kişinin ana babasına sövmesidir." (Buhârî, Müslim)`,
  "339": `Resûlullah (ﷺ) şöyle buyurdu: "Akrabalık bağını kesen cennete giremez." (Buhârî, Müslim)`,
  "340": `Resûlullah (ﷺ) şöyle buyurdu: "Allah size annelere isyanı, mal biriktirip vermemeyi, kız çocuklarını diri diri gömmeyi yasakladı. Size dedikodu yapmayı, çok soru sormayı ve malı israf etmeyi de hoş görmedi." (Buhârî, Müslim)`,

  // Chapter 42: Maintaining Good Relations (hadiths 341-345)
  "341": `Resûlullah (ﷺ) şöyle buyurdu: "İyiliğin en güzeli, kişinin babasının dostlarıyla iyi ilişkisini sürdürmesidir." (Müslim)`,
  "342": `Abdullah bin Dinar, Abdullah bin Ömer (رضي الله عنهما)'den şöyle rivayet eder: Mekke yolunda bir bedevî ona rastladı. Abdullah ona iyilik yaptı ve bir merkep verdi. (Buhârî)`,
  "343": `Resûlullah (ﷺ)'in yanında oturuyorduk. Benî Seleme kabilesinden bir adam gelip: "Ey Allah'ın Resûlü! Annemden sonra ona iyilik yapabileceğim bir şey kaldı mı?" dedi. Resûlullah (ﷺ): "Evet, ona dua et, onun için bağışlanma dile, vasiyetini yerine getir, dostlarına ikramda bulun ve akrabalarına sıla-i rahim yap" buyurdu. (Ebû Dâvûd)`,
  "344": `Âişe (رضي الله عنها) şöyle dedi: Resûlullah (ﷺ)'in hanımlarından hiçbirini, Hatice (رضي الله عنها)'yi kıskandığım kadar kıskanmadım. Onu hiç görmedim ama Resûlullah (ﷺ) onu çok anardı. (Buhârî, Müslim)`,
  "345": `Cerîr bin Abdullah el-Becelî (رضي الله عنه) ile bir yolculuğa çıktım. Bana hizmet etti. Ben: "Bunu yapma" dedim. O: "Müslümanların birbirine hizmet etmesi güzel bir şeydir" dedi. (Müslim)`,

  // Chapter 43: Honouring Family of the Messenger (hadiths 346-347)
  "346": `Yezid bin Hayyân şöyle anlatır: "Husayn bin Sabra, Amr bin Müslim ve ben Zeyd bin Erkam (رضي الله عنهم)'ı ziyarete gittik..." (Müslim)`,
  "347": `Ebû Bekr (رضي الله عنه) şöyle dedi: "Muhammed (ﷺ)'i, ailesine hürmet ederek hürmet edin." (Buhârî)`,

  // Chapter 44: Honouring Scholars (hadiths 348-359)
  "348": `Resûlullah (ﷺ) şöyle buyurdu: "Cemaate, Allah'ın Kitabı'nı en iyi okuyan imam olsun. Kıraatte eşitlerse, sünneti en iyi bilen; onda da eşitlerse, önce hicret eden; onda da eşitlerse, önce Müslüman olan imam olsun." (Müslim)`,
  "349": `Resûlullah (ﷺ) namazda safları düzeltirken omuzlarımızı sıvazlar ve: "Saflarınızı düzgün tutun, omuzlarınızı aynı hizaya getirin" derdi. (Müslim)`,
  "350": `Resûlullah (ﷺ) şöyle buyurdu: "Bana yakın olanlar, akıllı ve olgun olanlarınız, sonra onlara yakın olanlar, sonra onlara yakın olanlar (derece derece)." (Müslim)`,
  "351": `Sehl bin Ebû Hasme (رضي الله عنه) şöyle anlatır: Abdullah bin Sehl ve Muhayyisa bin Mes'ûd, Hayber'e gittiler. O sırada Hayberlilerle barış vardı. (Buhârî)`,
  "352": `Resûlullah (ﷺ) Uhud şehitlerinden iki kişiyi aynı kabre koyar ve: "Hangisi daha çok Kur'an bilir?" diye sorar, çok bileni önce kabre koyardı. (Buhârî)`,
  "353": `Resûlullah (ﷺ) şöyle buyurdu: "Rüyamda misvak kullandığımı gördüm. Bana iki kişi geldi. Biri diğerinden yaşlıydı. Misvakı küçük olana verdim. Bana: 'Büyüğe ver' dendi, ben de büyüğe verdim." (Buhârî)`,
  "354": `Resûlullah (ﷺ) şöyle buyurdu: "Allah'a saygının bir parçası, yaşlı Müslümanı, Kur'an'ı ezberleyip ona göre yaşayanı ve adaletli yöneticiyi saygıyla anmaktır." (Ebû Dâvûd)`,
  "355": `Amr bin Şuayb, babasından, o da dedesinden (رضي الله عنه) şöyle rivayet eder: Resûlullah (ﷺ) şöyle buyurdu: "Küçüklerimize merhamet etmeyen ve büyüklerimize saygı göstermeyen bizden değildir." (Tirmizî, Ebû Dâvûd)`,
  "356": `Âişe (رضي عنها)'ye bir dilenci geldi, ona bir parça ekmek verdi. Sonra güzel giyimli bir adam geldi, onu oturttu ve yemek yedirdi. Durumu kendisine sorulunca: "Resûlullah (ﷺ) bize: 'İnsanlara, bulundukları mevkiye göre muamele edin' buyurdu" dedi. (Ebû Dâvûd)`,
  "357": `Uyeyne bin Hısn, yeğeni Hürr bin Kays'ın yanında misafir kaldı. Hürr, Ömer (رضي الله عنه)'in yakınlarındandı. Ömer (رضي الله عنه), Kur'an okuyanları ve ileri gelenleri yanına alırdı. (Buhârî)`,
  "358": `Enes (رضي الله عنه) şöyle dedi: Resûlullah (ﷺ) zamanında genç bir çocuktum ve O'nun sözlerini ezberlerdim. Sadece, beni konuştuklarımdan engelleyen şey, burada yaşlıların bulunmasıydı. (Buhârî, Müslim)`,
  "359": `Resûlullah (ﷺ) şöyle buyurdu: "Bir genç, yaşlı bir kimseye yaşından dolayı saygı göstermezse, Allah o gencin yaşlılığında ona saygı gösterecek birini mutlaka gönderir." (Tirmizî)`,

  // Chapter 45: Visiting the Righteous (hadiths 360-374)
  "360": `Resûlullah (ﷺ)'in vefatından sonra Ebû Bekr (رضي الله عنه), Ömer (رضي الله عنه)'e: "Haydi Ümmü Eymen (رضي الله عنها)'i ziyarete gidelim" dedi. (Müslim)`,
  "361": `Resûlullah (ﷺ) şöyle buyurdu: "Bir adam, başka bir şehirdeki din kardeşini ziyarete gitti. Allah (ﷻ) yoluna bir melek gönderdi..." (Müslim)`,
  "362": `Resûlullah (ﷺ) şöyle buyurdu: "Kim bir hastayı ziyaret eder veya Allah rızası için bir din kardeşini ziyaret ederse, bir melek ona: 'Ne güzel iş yaptın, yürüyüşün hayırlı ve cennette bir yer edindin' der." (Tirmizî)`,
  "363": `Resûlullah (ﷺ) şöyle buyurdu: "İyi arkadaşla kötü arkadaşın misali, misk satanla demirci körüğü gibidir. Misk satandan ya satın alırsın veya güzel kokusunu alırsın. Demirci körüğü ise ya elbiseni yakar veya kötü kokusunu alırsın." (Buhârî, Müslim)`,
  "364": `Resûlullah (ﷺ) şöyle buyurdu: "Kadın dört şey için nikâhlanır: Malı, soyu, güzelliği ve dini. Dindar olanı tercih et, bereketli olursun." (Buhârî, Müslim)`,
  "365": `Resûlullah (ﷺ) Cebrail (عليه السلام)'e: "Bizi daha sık ziyaret etmekten seni alıkoyan nedir?" dedi. Bunun üzerine şu âyet indi: "Biz ancak Rabbinin emriyle ineriz..." (Meryem 64) (Buhârî)`,
  "366": `Resûlullah (ﷺ) şöyle buyurdu: "Müminlerden başkasını dost edinme. Yemeğini de takva sahiplerinden başkası yemesin." (Ebû Dâvûd, Tirmizî)`,
  "367": `Resûlullah (ﷺ) şöyle buyurdu: "Kişi dostunun dini üzeredir. Öyleyse kiminle dost olduğunuza dikkat edin." (Ebû Dâvûd, Tirmizî)`,
  "368": `Resûlullah (ﷺ) şöyle buyurdu: "Kişi, sevdiği ile beraberdir." (Buhârî, Müslim)`,
  "369": `Bir bedevî Resûlullah (ﷺ)'e: "Kıyamet ne zaman?" diye sordu. Resûlullah (ﷺ): "Onun için ne hazırladın?" diye sordu. (Buhârî)`,
  "370": `Bir adam Resûlullah (ﷺ)'e gelip: "Ey Allah'ın Resûlü! Bir topluluğu seviyorum ama henüz onlara katılamadım (derecelerine erişemedim)" dedi. Resûlullah (ﷺ): "Kişi, sevdiği ile beraberdir" buyurdu. (Buhârî, Müslim)`,
  "371": `Resûlullah (ﷺ) şöyle buyurdu: "İnsanlar, altın ve gümüş madenleri gibi madenlerdir. Câhiliyede hayırlı olanlar, İslâm'da da hayırlıdır, anlayışlı olduklarında." (Buhârî, Müslim)`,
  "372": `Useyr bin Amr (veya Useyr bin Câbir) (رضي الله عنه) şöyle anlatır: "Yemenden Ömer (رضي الله عنه)'e heyetler geldiğinde..." (Müslim)`,
  "373": `Abdullah bin Ömer (رضي الله عنهما) şöyle dedi: Resûlullah (ﷺ)'den umre için izin istedim, izin verdi ve: "Ey kardeşim! Duana beni de kat" buyurdu. (Ebû Dâvûd)`,
  "374": `Resûlullah (ﷺ) Kuba Mescidi'ni binekli veya yaya olarak ziyaret eder ve orada iki rekât namaz kılardı. (Buhârî, Müslim)`,

  // Chapter 46: Loving for the Sake of Allah (hadiths 375-385)
  "375": `Resûlullah (ﷺ) şöyle buyurdu: "Üç özellik kimde bulunursa, o imanın tadını bulur: Allah ve Resûlü'nü her şeyden çok sevmek, sevdiğini sırf Allah için sevmek ve Allah kendisini kurtardıktan sonra tekrar küfre dönmekten ateşe atılmaktan korktuğu gibi korkmak." (Buhârî, Müslim)`,
  "376": `Resûlullah (ﷺ) şöyle buyurdu: "Allah'ın (ﷻ) gölgesinden başka gölgenin bulunmadığı kıyamet gününde Allah yedi sınıf insanı gölgelendirir: Adaletli yönetici, Allah'a ibadetle yetişen genç, kalbi mescitlere bağlı kimse, Allah için birbirini seven ve bu sevgiyle bir araya gelip ayrılan iki kişi, güzel ve mevki sahibi bir kadının davetine 'Ben Allah'tan korkarım' diyerek reddeden kimse, sağ elinin verdiğini sol eli bilmeyecek kadar gizli sadaka veren kimse ve tenhada Allah'ı anıp gözleri yaşaran kimse." (Buhârî, Müslim)`,
  "377": `Resûlullah (ﷺ) şöyle buyurdu: "Allah kıyamet günü: 'Benim rızam için birbirini sevenler nerede? Bugün onları gölgemden başka gölge olmayan günümde gölgelendireceğim' buyurur." (Müslim)`,
  "378": `Resûlullah (ﷺ) şöyle buyurdu: "Nefsim elinde olan Allah'a yemin ederim ki, iman etmedikçe cennete giremezsiniz, birbirinizi sevmedikçe de iman etmiş olmazsınız." (Müslim)`,
  "379": `Resûlullah (ﷺ) şöyle buyurdu: "Bir adam başka bir şehirdeki kardeşini ziyarete gitti. Allah (ﷻ) yoluna bir melek gönderdi..." (Müslim)`,
  "380": `Resûlullah (ﷺ) ensar hakkında şöyle buyurdu: "Onları ancak mümin sever, onlara ancak münafık buğzeder. Allah onları seveni sever, onlara buğzedene de buğzeder." (Buhârî, Müslim)`,
  "381": `Resûlullah (ﷺ)'i şöyle derken işittim: "Allah (ﷻ) şöyle buyurdu: 'Benim rızam için birbirini sevenlere, nurdan minberler vardır. Peygamberler ve şehitler onlara imrenir.'" (Tirmizî)`,
  "382": `Şam Mescidi'ne girdim. Orada parlak dişli bir genç gördüm, etrafında insanlar toplanmıştı. Anlaşmazlığa düştüklerinde ona danışırlardı. (Müslim)`,
  "383": `Resûlullah (ﷺ) şöyle buyurdu: "Bir kimse kardeşini severse, ona sevdiğini bildirsin." (Ebû Dâvûd, Tirmizî)`,
  "384": `Resûlullah (ﷺ) Muâz'ı elinden tuttu ve: "Ey Muâz! Vallahi seni seviyorum. Ey Muâz! Sana, her namazın sonunda şöyle demeni tavsiye ederim: 'Allah'ım! Seni anmak, Sana şükretmek ve Sana güzelce ibadet etmekte bana yardım et'" buyurdu. (Ebû Dâvûd, Nesâî)`,
  "385": `Resûlullah (ﷺ)'in yanında oturan bir adam, yanından bir başkası geçti. Oturan adam: "Ey Allah'ın Resûlü! Ben bu adamı seviyorum" dedi. Resûlullah (ﷺ): "Ona sevdiğini bildirdin mi?" dedi. "Hayır" dedi. Resûlullah (ﷺ): "Git, ona bildir" buyurdu. Adam gidip: "Seni Allah için seviyorum" dedi. O da: "Beni kendisi için sevdiğin Allah da seni sevsin" dedi. (Ebû Dâvûd)`,

  // Chapter 47: Signs of Allah's Love (hadiths 386-388)
  "386": `Resûlullah (ﷺ) şöyle buyurdu: "Allah (ﷻ) şöyle buyurdu: 'Benim velî kuluma düşmanlık edene Ben savaş açarım. Kulumu, kendisine farz kıldığım şeylerden daha sevimli bir şeyle bana yaklaşamaz. Kulum nafile ibadetlerle bana yaklaşmaya devam eder, ta ki onu severim. Onu sevdiğim zaman, işiten kulağı, gören gözü, tutan eli ve yürüyen ayağı olurum. Benden bir şey dilerse mutlaka veririm, bana sığınırsa mutlaka onu korurum.'" (Buhârî)`,
  "387": `Resûlullah (ﷺ) şöyle buyurdu: "Allah (ﷻ) bir kulu sevdiği zaman, Cebrail'e: 'Allah falancayı seviyor, sen de sev' diye seslenir. Cebrail de onu sever ve gök halkına: 'Allah falancayı seviyor, siz de sevin' diye seslenir. Gök halkı da onu sever. Sonra yeryüzünde onun için kabul (sevilme) vardır." (Buhârî, Müslim)`,
  "388": `Resûlullah (ﷺ) bir askeri birliğe bir komutan gönderdi. Komutan sahâbîlerine namaz kıldırırken kısa okurdu. (Buhârî, Müslim)`,

  // Chapter 48: Warning Against Harming the Righteous (hadith 389)
  "389": `Resûlullah (ﷺ) şöyle buyurdu: "Kim sabah namazını kılarsa, Allah'ın koruması altındadır. Sakın Allah, korumasından bir şey talep etmesin!" (Müslim)`,

  // Chapter 49: Passing Judgement on Outward Actions (hadiths 390-395)
  "390": `Resûlullah (ﷺ) şöyle buyurdu: "Allah'tan başka ilah olmadığına ve Muhammed'in Allah'ın Resûlü olduğuna şehadet edinceye, namazı kılıp zekâtı verinceye kadar insanlarla savaşmakla emrolundum. Bunu yaptıklarında kanlarını ve mallarını benden korumuş olurlar, ancak İslâm'ın hakkı müstesna. Hesapları ise Allah'a aittir." (Buhârî, Müslim)`,
  "391": `Resûlullah (ﷺ)'i şöyle derken işittim: "Kim Allah'tan başka ilah olmadığına şehadet eder ve Allah'tan başka taptıklarını reddederse, malı ve kanı haram olur. Hesapları Allah'a aittir." (Müslim)`,
  "392": `Resûlullah (ﷺ)'e: "Söyle bana, bir kâfirle karşılaşıp savaşsak, o bir elimi kesse, sonra bir ağaca sığınıp 'Allah'a teslim oldum' dese, onu öldürür müyüm?" diye sordum. Resûlullah (ﷺ): "Onu öldürme" buyurdu. (Buhârî, Müslim)`,
  "393": `Resûlullah (ﷺ) bizi Cüheyne kabilesinden Huraka'ya gönderdi. Sabah vakti onlara baskın yaptık. (Buhârî, Müslim)`,
  "394": `Resûlullah (ﷺ) bir askeri birliği müşrikler üzerine gönderdi. Savaş başladı. Müşriklerden bir adam Müslümanlardan birine saldırdı. (Buhârî, Müslim)`,
  "395": `Abdullah bin Utbe bin Mes'ûd şöyle anlatır: Ömer bin Hattâb (رضي الله عنه)'i şöyle derken işittim: "Bazı kimseler, vahiy yoluyla hükme bağlanırdı. Şimdi vahiy kesildi. Biz, sizin açıktan yaptıklarınıza göre hüküm veriyoruz." (Buhârî)`,

  // Chapter 50: Fear (hadiths 396-411)
  "396": `Resûlullah (ﷺ) —ki doğru söyler ve kendisine doğru haber verilirdi— bize şöyle anlattı: "Her birinizin yaratılışı, annesinin karnında kırk gün nutfe olarak, sonra kırk gün aleka (kan pıhtısı) olarak, sonra kırk gün mudga (bir çiğnem et) olarak toplanır. Sonra Allah bir melek gönderir ve ona dört kelime yazması emredilir: Rızkı, eceli, ameli ve şakî veya said olacağı. Sonra ruh üflenir." (Buhârî, Müslim)`,
  "397": `Resûlullah (ﷺ) şöyle buyurdu: "Kıyamet günü cehennem yetmiş bin yularla getirilir. Her yuları yetmiş bin melek çeker." (Müslim)`,
  "398": `Resûlullah (ﷺ)'i şöyle derken işittim: "Cehennem ehlinin en hafif azap göreni, ayaklarının altına iki ateş koru konulup beyninin kaynatıldığı kimsedir." (Buhârî, Müslim)`,
  "399": `Resûlullah (ﷺ) şöyle buyurdu: "Cehennem ateşi, kimi topuklarına, kimi dizlerine, kimi beline, kimi boynuna kadar kaplar." (Müslim)`,
  "400": `Resûlullah (ﷺ) şöyle buyurdu: "İnsanlar, alemlerin Rabbi'nin huzurunda toplanırlar. Kimi alın teri içinde boğulur." (Buhârî)`,
  "401": `Resûlullah (ﷺ) bana öyle bir hutbe verdi ki, onun gibisini hiç duymamıştım. Şöyle buyurdu: "Benim bildiklerimi bilseydiniz, az güler çok ağlardınız." (Buhârî, Müslim)`,
  "402": `Resûlullah (ﷺ)'i şöyle derken işittim: "Kıyamet günü güneş mahlûkata yaklaştırılır. Hatta onlara bir mil kadar yaklaşır." (Müslim)`,
  "403": `Resûlullah (ﷺ) şöyle buyurdu: "Kıyamet günü insanlar o kadar terler ki, terleri yetmiş arşın yere batar ve ağızlarına kadar yükselir." (Buhârî, Müslim)`,
  "404": `Bir sesin düştüğünü duyunca bize: "Bunun ne olduğunu biliyor musunuz?" diye sordu. "Bu, yetmiş yıl önce cehenneme atılan bir taştır. Şimdi dibine indi. İşte onun sesini duydunuz." (Müslim)`,
  "405": `Resûlullah (ﷺ) şöyle buyurdu: "Allah (ﷻ), sizin her birinizle tercümansız olarak konuşacak. Kişi sağına bakar, önceden gönderdiği amellerini görür. Soluna bakar, günahlarını görür. Önüne bakar, önünde cehennemi görür." (Buhârî, Müslim)`,
  "406": `Resûlullah (ﷺ) şöyle buyurdu: "Ben sizin görmediklerinizi görüyorum. Gök inliyor ve inlemeye hakkı var. Gökte dört parmak yer yoktur ki, bir melek alnını secdeye koymuş olmasın." (Tirmizî)`,
  "407": `Resûlullah (ﷺ) şöyle buyurdu: "Kıyamet günü kulun ayakları, dört şeyden sorgulanmadıkça yerinden kıpırdamaz: Ömrünü nerede tükettiğinden, ilmiyle ne amel ettiğinden, malını nereden kazanıp nerede harcadığından ve bedenini nerede yıprattığından." (Tirmizî)`,
  "408": `Resûlullah (ﷺ): "O gün yer, haberlerini anlatır" âyetini okudu ve: "Yerin haberlerinin ne olduğunu biliyor musunuz?" diye sordu. (Tirmizî)`,
  "409": `Resûlullah (ﷺ) şöyle buyurdu: "Sûr'a üflemekle görevli melek boruya ağız dayamış, ne zaman üfürüleceğini beklerken, ben nasıl rahat edeyim?" (Tirmizî)`,
  "410": `Resûlullah (ﷺ) şöyle buyurdu: "Korkan, gecenin ilk vaktinde yola çıkar. Gecenin ilk vaktinde yola çıkan (hedefine) ulaşır. Dikkat edin! Allah'ın metaı pahalıdır. Dikkat edin! Allah'ın metaı cennettir." (Tirmizî)`,
  "411": `Resûlullah (ﷺ)'i şöyle derken işittim: "Kıyamet günü insanlar yalınayak, çıplak ve sünnetsiz olarak diriltilir." (Buhârî, Müslim)`,
}

let c = 0
for (const [num, t] of Object.entries(text)) {
  if (tr.hadiths[num]) { tr.hadiths[num].text = t; c++ }
}

writeFileSync(fp, JSON.stringify(tr, null, 2) + '\n', 'utf-8')
console.log(`✓ Added ${c} texts (chapters 26-50, hadiths 214-411)`)
