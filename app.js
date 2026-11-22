"use strict";


/* =========================================================
   1. VERİ — bakım rehberi
   ========================================================= */
const FLOWERS = [
 {id:"zambak",name:"Zambak",latin:"Lilium spp.",aliases:["lilyum","lily","lilium","lilyum çiçeği"],kind:"Soğanlı çiçek",
  blurb:"Uzun, kıvrık taç yaprakları ve güçlü kokusuyla buketlerin ve bahçelerin gösterişli soğanlısı. Saksıda da bahçede de yetişir.",
  colors:[{n:"Beyaz",hex:"#F7F4EC",m:"asalet, saflık ve zarafet"},{n:"Pembe",hex:"#EE9DB5",m:"şefkat ve bolluk"},{n:"Turuncu",hex:"#F08A3C",m:"tutku ve özgüven"},{n:"Sarı",hex:"#F4D04E",m:"neşe ve minnettarlık"},{n:"Kırmızı",hex:"#C8314B",m:"derin sevgi"}],
  care:{light:[3,"Bol ama dolaylı ışık; günde en az 6 saat aydınlık"],water:[2,"Toprak üstten 2–3 cm kuruyunca, kökü çürütmeden"],soil:"İyi drene olan, hafif asidik toprak",temp:"15–24 °C",humidity:"Orta",feed:"Büyüme döneminde 2 haftada bir potasyumlu gübre"},
  good:["Saksı dibinde drenaj deliği ve çakıl","Sabah güneşi, öğleden sonra yarı gölge","Kök bölgesinin serin kalması (üstüne malç)","Buket hâlinde: suyu iki günde bir değiştirmek, sapı çapraz kesmek"],
  bad:["Su biriktiren saksı tabağı","Öğle güneşinin doğrudan yakması","Polenlerin taç yaprağa dökülmesi (lekeler) — başçıkları alınabilir","Taze gübreli, ağır killi toprak"],
  toxic:"Kediler için çok zehirlidir; polen ve vazo suyu bile böbrek yetmezliğine yol açabilir. Kedili evlerde bulundurmayın.",
  shape:{t:"lily",center:"#C9B85A"}},
 {id:"gul",name:"Gül",latin:"Rosa spp.",aliases:["rose","rosa","gül fidanı","güller"],kind:"Çalı / kesme çiçek",
  blurb:"Kat kat açan taç yapraklarıyla bahçenin klasiği. Güneşi ve düzenli budamayı sever, karşılığında bütün yaz çiçek verir.",
  colors:[{n:"Kırmızı",hex:"#B3203A",m:"aşk ve tutku"},{n:"Beyaz",hex:"#F6F3EA",m:"saflık ve yeni başlangıç"},{n:"Pembe",hex:"#F2A3B8",m:"hayranlık ve minnet"},{n:"Sarı",hex:"#F5CF4A",m:"dostluk ve neşe"},{n:"Turuncu",hex:"#EE7F3B",m:"coşku ve heyecan"},{n:"Lila",hex:"#B9A2D6",m:"ilk görüşte aşk"}],
  care:{light:[3,"Günde 6+ saat doğrudan güneş"],water:[2,"Haftada 1–2 kez, derin ve kök dibine; yaprağı ıslatmadan"],soil:"Organik maddesi bol, tınlı toprak",temp:"15–27 °C",humidity:"Orta, iyi hava akışı",feed:"İlkbahar–yaz ayda bir gül gübresi"},
  good:["Sabah sulamak (yapraklar gün içinde kurur)","Solan çiçekleri kesmek — yenisi çabuk gelir","Kış sonunda budama","Dibine kompost ve malç"],
  bad:["Akşam yaprak ıslatmak (külleme, kara leke)","Sık dikilip havasız kalmak","Gölge","Yaprak bitine geç müdahale"],
  toxic:"Evcil hayvanlar için zehirsizdir; dikenlere dikkat.",
  shape:{t:"rose",center:"#E7C15A"}},
 {id:"lale",name:"Lale",latin:"Tulipa spp.",aliases:["tulip","tulipa","lâle"],kind:"Soğanlı çiçek",
  blurb:"Kadeh biçimli zarif çiçeğiyle baharın habercisi. Soğanlar sonbaharda dikilir, kışın soğuğuyla uyanır.",
  colors:[{n:"Kırmızı",hex:"#C42A36",m:"gerçek aşk"},{n:"Sarı",hex:"#F3CB3D",m:"neşe ve güneşli düşünceler"},{n:"Beyaz",hex:"#F5F2EA",m:"af ve saygı"},{n:"Mor",hex:"#6D3E8E",m:"asalet"},{n:"Pembe",hex:"#EE8DAA",m:"şefkat ve iyi dilekler"}],
  care:{light:[3,"Tam güneş ya da parlak yarı gölge"],water:[1,"Dikimden sonra bir kez; sonra yalnızca kuraklıkta"],soil:"Kumlu, süzek toprak",temp:"Kışın soğuk (≤ 10 °C) dönem şart",humidity:"Düşük–orta",feed:"Dikimde kemik unu ya da soğanlı bitki gübresi"},
  good:["Ekim–kasımda, soğanın 2–3 katı derinliğe dikmek","Çiçek bittikten sonra yaprakları sararana kadar bırakmak","Vazoda soğuk su ve az su"],
  bad:["Islak, ağır toprak (soğan çürür)","Sıcak bir kış — çiçek açmayabilir","Vazoda nergisle aynı suda bekletmek"],
  toxic:"Soğanı kedi ve köpekler için zehirlidir.",
  shape:{t:"tulip",center:"#3A3A2A"}},
 {id:"orkide",name:"Orkide",latin:"Phalaenopsis spp.",aliases:["phalaenopsis","kelebek orkidesi","orchid","orkide çiçeği"],kind:"Epifit saksı bitkisi",
  blurb:"Kelebeği andıran çiçekleri aylarca açık kalan, evin en zarif misafiri. Toprağı değil, kabuk karışımını sever.",
  colors:[{n:"Beyaz",hex:"#F8F6F2",m:"zarafet ve saygı"},{n:"Pembe",hex:"#E58BB2",m:"incelik ve sevgi"},{n:"Mor",hex:"#9C4D9E",m:"hayranlık ve saygınlık"},{n:"Sarı",hex:"#F1D365",m:"dostluk ve yeni başlangıç"}],
  care:{light:[2,"Parlak, dolaylı ışık; doğu penceresi ideal"],water:[1,"Haftada bir, kökler gümüşi grileşince; daldırıp süzdürerek"],soil:"Çam kabuğu karışımı, şeffaf saksı",temp:"18–28 °C, gece birkaç derece serin",humidity:"Yüksek (%50–70)",feed:"Ayda bir, yarı dozda orkide gübresi"},
  good:["Şeffaf saksı (kökler ışık alır)","Gece–gündüz sıcaklık farkı — yeni çiçek dalını tetikler","Çiçek bitince dalı ikinci boğumun üstünden kesmek"],
  bad:["Yaprak koltuğunda su kalması (çürüme)","Doğrudan öğle güneşi","Normal saksı toprağı","Kalorifer üstü ve soğuk cereyan"],
  toxic:"Kedi ve köpekler için zehirsiz kabul edilir.",
  shape:{t:"orchid",center:"#E7C85A",lip:"#8E2F5A"}},
 {id:"papatya",name:"Papatya",latin:"Leucanthemum / Matricaria",aliases:["daisy","margarit","bahçe papatyası"],kind:"Çok yıllık çiçek",
  blurb:"Beyaz taç yaprakları ve güneş sarısı göbeğiyle en sade, en neşeli kır çiçeği.",
  colors:[{n:"Beyaz",hex:"#FAF8F1",m:"masumiyet ve saflık"},{n:"Sarı",hex:"#F4D14E",m:"neşe"},{n:"Pembe",hex:"#F0A7C0",m:"sevecenlik"}],
  care:{light:[3,"Tam güneş"],water:[2,"Toprak kurudukça; aşırı sudan hoşlanmaz"],soil:"Süzek, orta verimli",temp:"10–25 °C",humidity:"Düşük–orta",feed:"İlkbaharda bir kez dengeli gübre yeter"},
  good:["Solan çiçekleri koparmak","Yoğun güneş","2–3 yılda bir kökünü bölüp yenilemek"],
  bad:["Gölge — boylanır, az çiçek açar","Islak kış toprağı"],
  toxic:"Kedi ve köpeklerde hafif mide rahatsızlığı yapabilir.",
  shape:{t:"daisy",center:"#F1C232"}},
 {id:"aycicegi",name:"Ayçiçeği",latin:"Helianthus annuus",aliases:["gün çiçeği","sunflower","helianthus","günebakan"],kind:"Tek yıllık çiçek",
  blurb:"Gençken güneşi takip eden kocaman başıyla yazın simgesi. Tohumdan hızla büyür.",
  colors:[{n:"Sarı",hex:"#F5C21B",m:"sadakat, hayranlık ve uzun ömür"},{n:"Bordo",hex:"#8E2B22",m:"sıcaklık ve içtenlik"},{n:"Krem",hex:"#F3E6B6",m:"huzur"}],
  care:{light:[3,"Günde 6–8 saat doğrudan güneş"],water:[2,"Köke derin sulama, haftada 1–2 kez"],soil:"Derin, gevşek toprak",temp:"20–30 °C",humidity:"Düşük–orta",feed:"Az gübre; fazla azot sapı zayıflatır"},
  good:["Rüzgârlı yerde destek çubuğu","Tohumu doğrudan yerine ekmek (şaşırtmayı sevmez)"],
  bad:["Gölge","Sık ekim"],
  toxic:"Evcil hayvanlar için zehirsizdir.",
  shape:{t:"sunflower",center:"#4A2E16"}},
 {id:"lavanta",name:"Lavanta",latin:"Lavandula angustifolia",aliases:["lavender","lavandula","lavander"],kind:"Aromatik çalı",
  blurb:"Kokusu güveleri uzak tutan, arıları çağıran gümüşi yapraklı Akdeniz çalısı.",
  colors:[{n:"Mor",hex:"#7D63B5",m:"sükûnet ve bağlılık"},{n:"Beyaz",hex:"#EEEAF3",m:"saflık"},{n:"Pembe",hex:"#D9A6C9",m:"zarafet"}],
  care:{light:[3,"Tam güneş, sıcak ve kuru köşe"],water:[1,"Az; toprak tamamen kuruyunca"],soil:"Kumlu, kireçli, çok süzek",temp:"Soğuğa dayanıklı, sıcağı sever",humidity:"Düşük",feed:"Neredeyse hiç; fakir toprağı sever"},
  good:["Çiçeklenmeden sonra üçte bir oranında budamak","Taşlı, kireçli toprak","Hava alan, seyrek dikim"],
  bad:["Fazla su ve nem","Zengin, gübreli toprak","Odunlaşmış kısımlardan sert budama"],
  toxic:"Kedi ve köpeklerde yüksek miktarda hafif zehirlenme yapabilir.",
  shape:{t:"lavender",center:"#5E4C8C"}},
 {id:"karanfil",name:"Karanfil",latin:"Dianthus caryophyllus",aliases:["carnation","dianthus","karanfil çiçeği"],kind:"Kesme çiçek / bahçe",
  blurb:"Tırtıklı, fırfırlı yapraklarıyla vazoda iki hafta dayanan, baharatlı kokulu çiçek.",
  colors:[{n:"Kırmızı",hex:"#B8263C",m:"derin sevgi ve hayranlık"},{n:"Beyaz",hex:"#F7F5EF",m:"saf sevgi ve iyi şans"},{n:"Pembe",hex:"#F2A0B6",m:"anne sevgisi"},{n:"Mor",hex:"#8F4C9C",m:"kaprislilik (geleneksel)"},{n:"Sarı",hex:"#F2D35A",m:"hayal kırıklığı (geleneksel)"}],
  care:{light:[3,"Günde 4–6 saat güneş"],water:[2,"Toprak kurudukça, dibinden"],soil:"Hafif alkali, süzek",temp:"10–24 °C",humidity:"Orta",feed:"Ayda bir dengeli gübre"},
  good:["Vazoda sapı boğumun hemen üstünden kesmek","Solanları koparmak"],
  bad:["Gövdenin dibini malçla boğmak","Durgun, nemli hava"],
  toxic:"Kedi ve köpeklerde hafif mide rahatsızlığı ve cilt tahrişi yapabilir.",
  shape:{t:"carnation",center:"#E6E0B0"}},
 {id:"sumbul",name:"Sümbül",latin:"Hyacinthus orientalis",aliases:["hyacinth","hyacinthus"],kind:"Soğanlı çiçek",
  blurb:"Tek bir sapta onlarca küçük yıldız çiçek; kokusu bütün odayı doldurur.",
  colors:[{n:"Mavi",hex:"#5B78C9",m:"samimiyet"},{n:"Mor",hex:"#7B4FA6",m:"pişmanlık ve af dileme"},{n:"Beyaz",hex:"#F6F4EE",m:"güzellik ve dua"},{n:"Pembe",hex:"#EE9DBA",m:"oyunbazlık"},{n:"Sarı",hex:"#F1D56A",m:"kıskançlık (geleneksel)"}],
  care:{light:[2,"Parlak ışık; çiçek açınca serin yer daha uzun dayanır"],water:[2,"Toprak nemli ama ıslak değil"],soil:"Süzek, kumlu",temp:"Kışın soğuk dönem gerekir",humidity:"Orta",feed:"Dikimde soğanlı bitki gübresi"},
  good:["Soğanı eldivenle tutmak (cilde dokunursa kaşındırır)","Saksıda serin ve aydınlık oda"],
  bad:["Sıcak oda — çiçek hızla geçer","Soğanın suya oturması"],
  toxic:"Soğanı kedi ve köpekler için zehirlidir.",
  shape:{t:"hyacinth",center:"#E9E2A8"}},
 {id:"nergis",name:"Nergis",latin:"Narcissus spp.",aliases:["narcissus","fulya","zerrin","daffodil"],kind:"Soğanlı çiçek",
  blurb:"Ortasında küçük bir taç (korona) taşıyan, kışın sonunda ilk açan kokulu çiçek.",
  colors:[{n:"Sarı",hex:"#F4CF2E",m:"yeniden doğuş ve yeni başlangıç"},{n:"Beyaz",hex:"#F8F6EE",m:"umut ve saflık"}],
  care:{light:[3,"Tam güneş ya da yarı gölge"],water:[2,"Büyürken düzenli, yaz uykusunda kuru"],soil:"Süzek, orta verimli",temp:"Soğuğa dayanıklı",humidity:"Orta",feed:"Çiçekten sonra bir kez potasyumlu gübre"},
  good:["Yaprakları kendiliğinden sararana kadar kesmemek","Grup hâlinde dikmek"],
  bad:["Vazoda başka çiçeklerle aynı suda bekletmek (salgısı onları soldurur)"],
  toxic:"Tüm bitki, özellikle soğanı, kedi ve köpekler için zehirlidir.",
  shape:{t:"narcissus",center:"#F08A1C"}},
 {id:"kasimpati",name:"Kasımpatı",latin:"Chrysanthemum morifolium",aliases:["krizantem","chrysanthemum","mum çiçeği"],kind:"Çok yıllık çiçek",
  blurb:"Günler kısalınca açan, sonbaharın renkli ponponları.",
  colors:[{n:"Beyaz",hex:"#F6F3EA",m:"dürüstlük ve sadakat"},{n:"Sarı",hex:"#F2C230",m:"dostluk"},{n:"Kırmızı",hex:"#A92A2E",m:"sevgi"},{n:"Mor",hex:"#8A4B91",m:"iyileşme dileği"},{n:"Turuncu",hex:"#E77C2C",m:"sıcaklık ve coşku"}],
  care:{light:[3,"Bol güneş"],water:[2,"Düzenli; toprak hiç tamamen kurumasın"],soil:"Verimli, süzek",temp:"10–22 °C",humidity:"Orta",feed:"Yaz başına kadar 2 haftada bir"},
  good:["Haziran sonuna dek uç almak — daha gür olur","Sonbaharda serin ve aydınlık yer"],
  bad:["Gece suni ışık (çiçek açmayı geciktirir)","Yaprakları ıslatmak"],
  toxic:"Kedi ve köpeklerde kusma ve salya yapabilir.",
  shape:{t:"mum",center:"#E2C94A"}},
 {id:"ortanca",name:"Ortanca",latin:"Hydrangea macrophylla",aliases:["hortensia","hydrangea","hortenzya"],kind:"Çalı",
  blurb:"Top top açan çiçekleri toprağın asitliğine göre maviden pembeye döner.",
  colors:[{n:"Mavi",hex:"#6E8FD6",m:"anlayış ve af"},{n:"Pembe",hex:"#EE9BBE",m:"içtenlik"},{n:"Beyaz",hex:"#F3F1EA",m:"zarafet ve bolluk"},{n:"Mor",hex:"#8E6CC1",m:"derin anlayış"}],
  care:{light:[2,"Sabah güneşi, öğleden sonra gölge"],water:[3,"Bol; toprağı hep nemli tutun"],soil:"Asidik toprak mavi, alkali toprak pembe yapar",temp:"15–25 °C",humidity:"Orta–yüksek",feed:"İlkbahar–yaz ayda bir; mavi için alüminyum sülfat"},
  good:["Yağmur suyu","Malç ile nemi korumak","Mavi renk için asidik toprak"],
  bad:["Öğle güneşi","Kireçli su (rengi pembeleştirir)","Sonbaharda sert budama (gelecek yılın tomurcuklarını keser)"],
  toxic:"Kedi ve köpekler için zehirlidir.",
  shape:{t:"hydrangea",center:"#D8D3B0"}},
 {id:"menekse",name:"Afrika menekşesi",latin:"Saintpaulia ionantha",aliases:["menekşe","saintpaulia","african violet","saksı menekşesi"],kind:"Saksı bitkisi",
  blurb:"Kadife yapraklı, yıl boyu çiçek açabilen küçük pencere bitkisi.",
  colors:[{n:"Mor",hex:"#7044A8",m:"sadakat ve bağlılık"},{n:"Beyaz",hex:"#F7F5F0",m:"saflık"},{n:"Pembe",hex:"#E89BC4",m:"sevgi"},{n:"Mavi",hex:"#5A62C2",m:"vefa"}],
  care:{light:[2,"Parlak dolaylı ışık; kuzey ya da doğu penceresi"],water:[2,"Oda sıcaklığında suyla, tabaktan; yaprağı ıslatmadan"],soil:"Hafif, havadar menekşe toprağı",temp:"18–24 °C",humidity:"Orta–yüksek",feed:"2 haftada bir yarı dozda çiçek gübresi"},
  good:["Tabaktan sulama (alttan)","Saksıyı haftada bir çeyrek tur döndürmek","Küçük saksı — kök sıkışıklığını sever"],
  bad:["Yaprağa soğuk su (lekelenir)","Doğrudan güneş","Büyük saksı"],
  toxic:"Kedi ve köpekler için zehirsiz kabul edilir.",
  shape:{t:"violet",center:"#F2D04A"}},
 {id:"gerbera",name:"Gerbera",latin:"Gerbera jamesonii",aliases:["gerber","african daisy","transvaal papatyası"],kind:"Saksı / kesme çiçek",
  blurb:"Papatyanın iri ve canlı renkli kuzeni; buketlerin en neşeli yüzü.",
  colors:[{n:"Turuncu",hex:"#F07A2A",m:"neşe"},{n:"Pembe",hex:"#EE6F9C",m:"hayranlık"},{n:"Kırmızı",hex:"#D12B37",m:"aşk"},{n:"Sarı",hex:"#F5C92E",m:"mutluluk"},{n:"Beyaz",hex:"#F7F4EC",m:"saflık"}],
  care:{light:[3,"Bol ışık, sabah güneşi"],water:[2,"Toprak üstü kuruyunca, kök boğazını ıslatmadan"],soil:"Süzek, hafif asidik",temp:"18–25 °C",humidity:"Orta",feed:"Çiçeklenmede 2 haftada bir"},
  good:["Vazoda az su (sap yumuşamasın)","Hava alan yer"],
  bad:["Kök boğazının gömülmesi","Fazla su"],
  toxic:"Evcil hayvanlar için zehirsizdir.",
  shape:{t:"gerbera",center:"#3B2A17"}},
 {id:"sakayik",name:"Şakayık",latin:"Paeonia lactiflora",aliases:["peony","paeonia","ayı gülü","şakayik"],kind:"Çok yıllık çiçek",
  blurb:"Kocaman, yumuşacık, kat kat açan çiçekleri onlarca yıl aynı yerde yaşar.",
  colors:[{n:"Pembe",hex:"#F0A2BC",m:"romantizm ve mutlu evlilik"},{n:"Beyaz",hex:"#F7F3EC",m:"onur ve incelik"},{n:"Kırmızı",hex:"#A8243A",m:"onur ve bereket"},{n:"Mercan",hex:"#F2876E",m:"tutku"}],
  care:{light:[3,"Tam güneş"],water:[2,"Haftada bir derin sulama"],soil:"Verimli, süzek, nötr",temp:"Kışın soğuk dönem gerekir",humidity:"Orta",feed:"İlkbaharda bir kez kompost"},
  good:["Yumruyu sığ dikmek (en fazla 5 cm)","Ağır çiçekler için halka destek"],
  bad:["Yerini değiştirmek — yıllarca küsebilir","Derin dikim"],
  toxic:"Kedi ve köpeklerde hafif mide rahatsızlığı yapabilir.",
  shape:{t:"peony",center:"#E8C657"}},
 {id:"zeytin",name:"Zeytin ağacı",latin:"Olea europaea",aliases:["zeytin","olive","olea","zeytin fidanı"],kind:"Ağaç",
  blurb:"Gümüşi yapraklı, yüzyıllar yaşayan Akdeniz ağacı. Büyük saksıda balkonda da yetişir.",
  colors:[{n:"Yeşil",hex:"#7E9A62",m:"barış ve bilgelik"},{n:"Gümüşi",hex:"#A9B7A0",m:"dayanıklılık"}],
  care:{light:[3,"Tam güneş"],water:[1,"Toprak iyice kuruyunca; saksıda yazın haftada bir"],soil:"Kumlu, kireçli, süzek",temp:"−7 °C'ye kadar dayanır",humidity:"Düşük",feed:"İlkbaharda yavaş salınımlı gübre"},
  good:["Geniş, ağır, delikli saksı","Kış sonunda şekil budaması"],
  bad:["Kapalı, karanlık oda","Sürekli ıslak toprak"],
  toxic:"Evcil hayvanlar için zehirsizdir.",
  shape:{t:"tree",center:"#3D4A26"}},
 {"id":"monstera","name":"Deve tabanı","latin":"Monstera deliciosa","aliases":["monstera","deve tabanı","delikli yaprak","monstera deliciosa"],"kind":"Yapraklı saksı bitkisi","blurb":"Delikli, iri yapraklarıyla salonların gözdesi. Hızlı büyür; dolaylı ışık ve tutunacak bir destek verilirse kocaman olur.","colors":[{"n":"Yeşil","hex":"#2F6B3E","m":"bolluk ve uzun ömür"},{"n":"Alacalı","hex":"#DCE5D3","m":"nadirlik ve özgünlük"}],"care":{"light":[2,"Parlak ama dolaylı ışık; doğrudan öğle güneşi yaprağı yakar"],"water":[2,"Toprağın üst 3–5 cm'si kuruyunca; kışın daha seyrek"],"soil":"Havadar, kabuk ve perlit karışımlı saksı toprağı","temp":"18–27 °C","humidity":"Orta–yüksek","feed":"İlkbahar–yaz ayda bir yeşil bitki gübresi"},"good":["Tırmanması için yosun çubuğu","Yaprakları ayda bir nemli bezle silmek","İki yılda bir, bir boy büyük saksı"],"bad":["Tabağında su bekletmek","Soğuk cam ve cereyan","Karanlık köşe (yeni yapraklar delik açmaz)"],"toxic":"Kalsiyum oksalat kristalleri içerir; çiğnenirse ağızda yanma ve salya yapar. Kedi ve köpekler için zehirlidir.","shape":{"t":"tree","center":"#2F6B3E"}},
 {"id":"pothos","name":"Salon sarmaşığı","latin":"Epipremnum aureum","aliases":["pothos","potos","şeytan sarmaşığı","salon sarmaşığı","epipremnum"],"kind":"Sarkan yapraklı bitki","blurb":"Kalp biçimli yaprakları raflardan aşağı sarkan, neredeyse öldürülemeyen bir başlangıç bitkisi. Az ışıkta da idare eder.","colors":[{"n":"Yeşil","hex":"#3E7D3A","m":"yenilenme ve umut"},{"n":"Sarı alacalı","hex":"#D8D46A","m":"neşe ve canlılık"},{"n":"Beyaz alacalı","hex":"#E8ECDF","m":"sadelik"}],"care":{"light":[1,"Az ışığa dayanır; alacalı yapraklar için parlak dolaylı ışık daha iyi"],"water":[2,"Toprak yarısına kadar kuruyunca; yapraklar hafif sarkınca sula"],"soil":"Standart, süzek saksı toprağı","temp":"16–29 °C","humidity":"Orta","feed":"Büyüme döneminde 4–6 haftada bir"},"good":["Uzayan dalları kesip suda köklendirmek","Askılı saksı ya da raf kenarı","Arada bir yaprak duşu"],"bad":["Sürekli ıslak toprak","Doğrudan güneş","10 °C altı soğuk"],"toxic":"Kalsiyum oksalat içerir; kedi ve köpeklerde ağız tahrişi, salya ve kusma yapar.","shape":{"t":"tree","center":"#3E7D3A"}},
 {"id":"pasakilici","name":"Paşa kılıcı","latin":"Dracaena trifasciata","aliases":["sansevieria","kaynana dili","paşa kılıcı","yılan bitkisi","sansevyerya"],"kind":"Sukulent yapraklı bitki","blurb":"Dik, kılıç gibi yapraklarıyla az ışığa ve unutkan sulamaya en dayanıklı ev bitkilerinden biri.","colors":[{"n":"Yeşil","hex":"#3B6E46","m":"dayanıklılık"},{"n":"Sarı kenarlı","hex":"#C9C25A","m":"koruma ve sağlam duruş"}],"care":{"light":[1,"Az ışıkta yaşar, parlak dolaylı ışıkta daha hızlı büyür"],"water":[1,"Toprak tamamen kuruyunca; kışın ayda bir bile yeter"],"soil":"Kaktüs ve sukulent toprağı, bol drenaj","temp":"15–29 °C","humidity":"Düşük–orta","feed":"Yazın 2 ayda bir, yarım dozda"},"good":["Seyrek sulanmak","Ağır, devrilmeyen saksı","Kalabalıklaşınca bölerek çoğaltmak"],"bad":["Fazla sulama (en sık ölüm nedeni)","Yaprak rozetinin içine su kaçması","Donma"],"toxic":"Saponin içerir; kedi ve köpeklerde kusma ve ishale yol açabilir.","shape":{"t":"tree","center":"#3B6E46"}},
 {"id":"zz","name":"ZZ bitkisi","latin":"Zamioculcas zamiifolia","aliases":["zz","zamioculcas","zamya","zamiokulkas","zz bitkisi"],"kind":"Yapraklı saksı bitkisi","blurb":"Parlak, mumsu yaprakları ve toprak altındaki su depolayan yumrularıyla haftalarca susuz kalabilen bir ofis klasiği.","colors":[{"n":"Yeşil","hex":"#2E5E36","m":"büyüme ve sebat"},{"n":"Siyah (Raven)","hex":"#1F2A22","m":"gizem ve zarafet"}],"care":{"light":[1,"Az ışığa dayanır; parlak dolaylı ışıkta gürleşir"],"water":[1,"Toprak tamamen kuruyunca, 2–3 haftada bir"],"soil":"Süzek, kumlu saksı toprağı","temp":"18–26 °C","humidity":"Düşük–orta","feed":"Yazın 6–8 haftada bir yarım doz"},"good":["Seyrek ama derin sulama","Ofis ışığı","Yaprak tozunu silmek"],"bad":["Islak toprak (yumru çürür)","Soğuk cam kenarı","Gereğinden büyük saksı"],"toxic":"Kalsiyum oksalat içerir; kedi ve köpeklerde ağız tahrişi ve kusma yapabilir. Özsuyuyla çalışırken eldiven kullan.","shape":{"t":"tree","center":"#2E5E36"}},
 {"id":"aloe","name":"Aloe vera","latin":"Aloe vera","aliases":["aloe","sarısabır","aloe vera","aleo vera"],"kind":"Sukulent","blurb":"Etli, jel dolu yapraklarıyla hem pencere kenarı süsü hem de evde küçük yanıklar için bilinen bir bitki.","colors":[{"n":"Yeşil","hex":"#5C8A5A","m":"şifa ve koruma"},{"n":"Sarı (çiçek)","hex":"#E9B841","m":"neşe"}],"care":{"light":[3,"Bol ışık; güneye bakan pencere ya da yarı gölge balkon"],"water":[1,"Toprak tamamen kuruyunca; kışın ayda bir"],"soil":"Kaktüs toprağı ya da kumlu karışım","temp":"13–27 °C","humidity":"Düşük","feed":"Yazın 2 ayda bir sukulent gübresi"},"good":["Pişmiş topraktan, delikli saksı","Yavruları ayırıp ayrı saksıya dikmek","Yazın balkonda temiz hava"],"bad":["Islak toprak","Donma","Birden doğrudan güneşe çıkarmak (yanar; yavaş alıştır)"],"toxic":"Yaprak kabuğundaki sarı özsu (aloin) kedi ve köpeklerde kusma ve ishal yapar; zehirlidir.","shape":{"t":"tree","center":"#5C8A5A"}},
 {"id":"kaktus","name":"Kaktüs","latin":"Cactaceae","aliases":["kaktus","kaktüs","cactus","dikenli bitki"],"kind":"Sukulent / kaktüs","blurb":"Gövdesinde su depolayan, çöllerden gelen dikenli bitkiler ailesi. Bol ışık ve çok az suyla yıllarca yaşar; doğru kışlatılırsa çiçek de açar.","colors":[{"n":"Yeşil","hex":"#5E8C4F","m":"dayanıklılık"},{"n":"Pembe (çiçek)","hex":"#E77AA2","m":"beklenmedik sevgi"},{"n":"Sarı (çiçek)","hex":"#F2C744","m":"sabır"}],"care":{"light":[3,"En aydınlık pencere; günde birkaç saat doğrudan güneş"],"water":[1,"Yazın toprak tamamen kuruyunca; kışın neredeyse hiç"],"soil":"Kaktüs toprağı, bol kum ve perlit","temp":"Yazın 20–35 °C; kışın serin (8–12 °C) dinlenme","humidity":"Düşük","feed":"Yazın ayda bir kaktüs gübresi"},"good":["Kışın serin, kuru dinlenme (çiçeklenmeyi tetikler)","Dar, delikli saksı","Saksı değiştirirken kalın eldiven ya da katlanmış gazete"],"bad":["Kışın sıcak ve sulanan oda","Gölge (bitki incelip uzar)","Su tutan toprak"],"toxic":"Çoğu kaktüs zehirsizdir; tehlike dikenlerdir. Kaktüse benzeyen bazı sütleğenler (Euphorbia) ise zehirli özsu taşır.","shape":{"t":"tree","center":"#5E8C4F"}},
 {"id":"sukulent","name":"Sukulent (Ekeverya)","latin":"Echeveria","aliases":["sukulent","ekeverya","echeveria","taş gülü","succulent"],"kind":"Sukulent","blurb":"Gül gibi dizilmiş etli yapraklarıyla küçük saksıların ve teraryumların yıldızı. Işık ister, suyu az.","colors":[{"n":"Mavi-yeşil","hex":"#8FAFA8","m":"huzur"},{"n":"Pembe uçlu","hex":"#D9A0B0","m":"zarafet"},{"n":"Mor","hex":"#8C6A92","m":"gizem"}],"care":{"light":[3,"Bol ışık; ışık azsa rozet açılıp uzar"],"water":[1,"Toprak tamamen kuruyunca; toprağa ya da dipten, rozetin ortasına değil"],"soil":"Kaktüs toprağı ya da kum–perlit karışımı","temp":"10–27 °C","humidity":"Düşük","feed":"Yazın 2 ayda bir yarım doz"},"good":["Yapraktan çoğaltmak","Sığ, delikli saksı","Güneye bakan pencere"],"bad":["Rozetin içinde su kalması","Deliksiz dekoratif saksılar","Gölge"],"toxic":"Ekeverya kedi ve köpekler için zehirsiz kabul edilir.","shape":{"t":"mum","center":"#8FAFA8"}},
 {"id":"barisicegi","name":"Barış çiçeği","latin":"Spathiphyllum","aliases":["spatifilyum","barış çiçeği","yelken çiçeği","spathiphyllum","barış zambağı"],"kind":"Çiçekli saksı bitkisi","blurb":"Koyu yeşil yaprakların arasından beyaz yelken gibi çiçekler çıkaran, az ışıkta da çiçek açabilen bir ev bitkisi. Susayınca yapraklarını sarkıtıp haber verir.","colors":[{"n":"Beyaz","hex":"#F4F4EE","m":"barış ve huzur"},{"n":"Yeşil","hex":"#2D5E3A","m":"yenilenme"}],"care":{"light":[1,"Az ya da orta dolaylı ışık; doğrudan güneş yaprağı yakar"],"water":[3,"Toprak hep hafif nemli kalsın; yapraklar sarkınca hemen sula"],"soil":"Humuslu, nem tutan ama süzek saksı toprağı","temp":"18–27 °C","humidity":"Yüksek","feed":"İlkbahar–yaz 6 haftada bir"},"good":["Banyo gibi nemli, aydınlık yerler","Solan çiçek sapını dipten kesmek","Yaprak duşu"],"bad":["Toprağın tamamen kuruması","Doğrudan güneş","Kireçli su (yaprak uçları kahverengileşir)"],"toxic":"Kalsiyum oksalat içerir; kedi ve köpeklerde ağız tahrişi ve salya yapar.","shape":{"t":"lily","center":"#E8E2B0"}},
 {"id":"ataturkcicegi","name":"Atatürk çiçeği","latin":"Euphorbia pulcherrima","aliases":["atatürk çiçeği","ataturk cicegi","poinsettia","noel çiçeği","euphorbia pulcherrima"],"kind":"Kış saksı bitkisi","blurb":"Asıl çiçeği küçücüktür; göz alan kırmızı kısım renklenen yapraklardır (örtü yaprak). Kasım–aralıkta, kısalan günlerle renklenir.","colors":[{"n":"Kırmızı","hex":"#C21F34","m":"kutlama ve sıcaklık"},{"n":"Beyaz","hex":"#F2EFE4","m":"umut"},{"n":"Pembe","hex":"#E58FAA","m":"şefkat"}],"care":{"light":[3,"Parlak dolaylı ışık; günde 6 saat aydınlık"],"water":[2,"Toprak üstten kuruyunca; tabakta su bırakmadan"],"soil":"Süzek saksı toprağı","temp":"16–22 °C; 13 °C altı ve cereyan zarar verir","humidity":"Orta","feed":"İlkbahar–yaz ayda bir; renklenme döneminde verme"},"good":["Eve getirirken soğuktan sarılı taşımak","Sıcaklığı sabit, aydınlık oda","Yeniden renklendirmek için ekimden itibaren 6–8 hafta, her gece 14 saat tam karanlık"],"bad":["Soğuk cam ve kapı ağzı","Fazla sulama","Kalorifer üstü"],"toxic":"Beyaz özsuyu cildi ve ağzı tahriş eder; yenirse kedi ve köpeklerde hafif kusma yapabilir. Sanıldığı kadar zehirli değildir ama dikkat edin.","shape":{"t":"gerbera","center":"#E3C04B"}},
 {"id":"sardunya","name":"Sardunya","latin":"Pelargonium","aliases":["sardunya","itır","pelargonium","geranium","ıtır"],"kind":"Balkon çiçeği","blurb":"Balkon ve pencere önlerinin yaz boyu açan, kolay çoğalan klasiği. Güneşi sever, suyu az ister.","colors":[{"n":"Kırmızı","hex":"#C7283B","m":"dostluk ve sıcak karşılama"},{"n":"Pembe","hex":"#E880A4","m":"zarafet ve minnet"},{"n":"Beyaz","hex":"#F4F2EA","m":"saflık"},{"n":"Mercan","hex":"#EE7A62","m":"canlılık"}],"care":{"light":[3,"Tam güneş ya da çok parlak ışık"],"water":[2,"Toprak üstten kuruyunca; fazla su gövdeyi çürütür"],"soil":"Süzek, hafif kumlu saksı toprağı","temp":"10–27 °C; dona dayanmaz","humidity":"Düşük–orta","feed":"Yazın 2 haftada bir çiçek gübresi"},"good":["Solan çiçek başlarını koparmak","Sonbaharda çelikle çoğaltmak","Kışı aydınlık, serin bir odada geçirmek"],"bad":["Islak, ağır toprak","Gölge","Yaprakları akşam ıslatmak"],"toxic":"Kedi ve köpeklerde kusma, iştahsızlık ve ciltte tahriş yapabilir; zehirlidir.","shape":{"t":"hydrangea","center":"#E9C24B"}},
 {"id":"begonya","name":"Begonya","latin":"Begonia","aliases":["begonya","begonia","mum begonyası","begoniya"],"kind":"Çiçekli saksı bitkisi","blurb":"Mumsu yapraklı küçük türlerden desenli yapraklı iri türlere kadar geniş bir aile. Gölgeli balkon ve aydınlık iç mekân için ideal.","colors":[{"n":"Kırmızı","hex":"#C73446","m":"tutku"},{"n":"Pembe","hex":"#EE9AB2","m":"incelik"},{"n":"Beyaz","hex":"#F5F3EC","m":"masumiyet"},{"n":"Turuncu","hex":"#F08C47","m":"sıcaklık"}],"care":{"light":[2,"Parlak dolaylı ışık ya da yarı gölge"],"water":[2,"Toprak üstten kuruyunca, yaprakları ıslatmadan"],"soil":"Hafif, humuslu ve süzek toprak","temp":"16–24 °C","humidity":"Orta–yüksek (ama yaprak ıslak kalmasın)","feed":"Büyüme döneminde 2–3 haftada bir yarım doz"},"good":["Saksı altında nemli çakıl tabağı","Solan çiçekleri temizlemek","Havadar ortam"],"bad":["Yaprakları ıslatmak (külleme)","Soğuk ve cereyan","Fazla sulama"],"toxic":"Özellikle yumruları kedi ve köpeklerde ağız tahrişi ve kusma yapar; zehirlidir.","shape":{"t":"rose","center":"#E9C24B"}},
 {"id":"kaucuk","name":"Kauçuk ağacı","latin":"Ficus elastica","aliases":["kauçuk","kaucuk","ficus elastica","lastik ağacı","kauçuk bitkisi"],"kind":"Yapraklı saksı bitkisi","blurb":"Kalın, parlak, deri gibi yapraklarıyla yıllar içinde tavana uzanabilen dayanıklı bir iç mekân ağacı.","colors":[{"n":"Koyu yeşil","hex":"#24452E","m":"istikrar"},{"n":"Bordo","hex":"#4A1F28","m":"güç"},{"n":"Alacalı","hex":"#C9D4B6","m":"özgünlük"}],"care":{"light":[2,"Parlak dolaylı ışık; az ışıkta yaprak döker"],"water":[2,"Toprağın üst 3 cm'si kuruyunca"],"soil":"Süzek, verimli saksı toprağı","temp":"16–27 °C","humidity":"Orta","feed":"İlkbahar–yaz ayda bir"},"good":["Yaprakları nemli bezle silmek","Sabit bir yer","Boylanınca tepeden budayarak dallandırmak"],"bad":["Sık yer değiştirmek (yaprak döker)","Soğuk cereyan","Islak toprak"],"toxic":"Beyaz özsuyu cildi tahriş eder; yenirse kedi ve köpeklerde ağız tahrişi ve kusma yapabilir.","shape":{"t":"tree","center":"#24452E"}},
 {"id":"benjamin","name":"Benjamin","latin":"Ficus benjamina","aliases":["benjamin","benjamin ağacı","ficus benjamina","fikus"],"kind":"İç mekân ağacı","blurb":"İnce dalları ve küçük parlak yapraklarıyla zarif bir iç mekân ağacı. Yerini sever; taşınınca yapraklarını dökerek tepki verir.","colors":[{"n":"Yeşil","hex":"#3D6B3A","m":"huzur"},{"n":"Alacalı","hex":"#CFD9B8","m":"zarafet"}],"care":{"light":[2,"Parlak dolaylı ışık; sabah güneşi iyi gelir"],"water":[2,"Toprak üstten kuruyunca, düzenli aralıklarla"],"soil":"Süzek saksı toprağı","temp":"16–24 °C","humidity":"Orta","feed":"İlkbahar–yaz ayda bir"},"good":["Hep aynı yerde durmak","Düzenli sulama temposu","İlkbaharda hafif budama"],"bad":["Yer değişikliği","Cereyan ve kalorifer","Düzensiz sulama"],"toxic":"Özsuyu ciltte tahriş yapar; yenirse kedi ve köpeklerde kusma yapabilir.","shape":{"t":"tree","center":"#3D6B3A"}},
 {"id":"paraagaci","name":"Para ağacı","latin":"Crassula ovata","aliases":["para ağacı","yeşim bitkisi","crassula","para çiçeği","jade"],"kind":"Sukulent","blurb":"Etli, yuvarlak yaprakları ve kalınlaşan gövdesiyle minik bir ağaca benzeyen, yıllarca yaşayan bir sukulent. Halk arasında bolluk getirdiğine inanılır.","colors":[{"n":"Yeşil","hex":"#4E7D4C","m":"bolluk ve bereket"},{"n":"Kırmızı kenarlı","hex":"#B0573E","m":"şans"},{"n":"Beyaz (çiçek)","hex":"#F3EEF0","m":"dostluk"}],"care":{"light":[3,"Bol ışık; birkaç saat doğrudan güneş yaprak kenarını kızartır"],"water":[1,"Toprak tamamen kuruyunca; kışın çok seyrek"],"soil":"Kaktüs toprağı","temp":"10–27 °C","humidity":"Düşük","feed":"Yazın 2 ayda bir yarım doz"},"good":["Ağır, devrilmeyen saksı","Yaprak ya da dal çeliğiyle çoğaltmak","Kışın serin ve aydınlık dinlenme"],"bad":["Islak toprak","Gölge","Donma"],"toxic":"Kedi ve köpeklerde kusma ve halsizliğe yol açabilir; zehirlidir.","shape":{"t":"tree","center":"#4E7D4C"}},
 {"id":"yukka","name":"Yukka","latin":"Yucca elephantipes","aliases":["yukka","yucca","avize ağacı","fil ayağı yukka"],"kind":"İç mekân ağacı","blurb":"Kalın gövdesinin üstünde sivri yaprak demetleri taşıyan, kuraklığa dayanıklı bir iç mekân ağacı.","colors":[{"n":"Yeşil","hex":"#4C7A45","m":"direnç"},{"n":"Krem kenarlı","hex":"#E2DFB4","m":"aydınlık"}],"care":{"light":[3,"Bol ışık; az ışıkta yapraklar incelir"],"water":[1,"Toprağın yarısı kuruyunca; kışın seyrek"],"soil":"Süzek, kumlu toprak","temp":"10–27 °C","humidity":"Düşük","feed":"Yazın ayda bir"},"good":["Yazın balkonda yarı gölge","Kuruyan alt yaprakları dipten almak","Ağır saksı"],"bad":["Fazla sulama","Karanlık köşe","Tabakta su"],"toxic":"Saponin içerir; kedi ve köpeklerde kusma yapabilir.","shape":{"t":"tree","center":"#4C7A45"}},
 {"id":"difenbahya","name":"Difenbahya","latin":"Dieffenbachia","aliases":["difenbahya","dieffenbachia","dilsiz kamış"],"kind":"Yapraklı saksı bitkisi","blurb":"Krem lekeli iri yapraklarıyla gösterişli bir salon bitkisi. Güzeldir ama özsuyu nedeniyle çocuk ve hayvanlardan uzak tutulmalıdır.","colors":[{"n":"Yeşil-krem","hex":"#B8C99A","m":"canlılık"},{"n":"Koyu yeşil","hex":"#2F5B35","m":"sağlamlık"}],"care":{"light":[2,"Parlak dolaylı ışık ya da yarı gölge"],"water":[2,"Toprağın üst 2–3 cm'si kuruyunca"],"soil":"Humuslu, süzek toprak","temp":"18–27 °C","humidity":"Orta–yüksek","feed":"İlkbahar–yaz ayda bir"},"good":["Yaprakları silmek","Saksıyı arada bir çevirmek (düz büyüsün)","Budarken eldiven"],"bad":["Soğuk","Doğrudan güneş","Islak toprak"],"toxic":"Çok zehirlidir: kalsiyum oksalat ağızda ve boğazda şiddetli yanma, şişme ve konuşamama yapabilir. Çocuk ve hayvanlardan uzak tut.","shape":{"t":"tree","center":"#2F5B35"}},
 {"id":"antoryum","name":"Antoryum","latin":"Anthurium andraeanum","aliases":["antoryum","anthurium","flamingo çiçeği","kalp çiçeği"],"kind":"Çiçekli saksı bitkisi","blurb":"Parlak, kalp biçimli “çiçeği” aslında renkli bir örtü yapraktır; doğru yerde neredeyse bütün yıl açar.","colors":[{"n":"Kırmızı","hex":"#C4192F","m":"tutku ve konukseverlik"},{"n":"Pembe","hex":"#EC8CA9","m":"romantizm"},{"n":"Beyaz","hex":"#F3F1E7","m":"masumiyet"}],"care":{"light":[2,"Parlak dolaylı ışık; doğrudan güneş yakar"],"water":[2,"Toprak üstten kuruyunca; tabakta su bırakma"],"soil":"Orkide kabuğu ve torf karışımı, çok havadar","temp":"18–27 °C","humidity":"Yüksek","feed":"Büyüme döneminde ayda bir, fosforlu"},"good":["Nemli, aydınlık banyo","Yaprak duşu","Solan çiçek sapını dipten kesmek"],"bad":["Kuru hava","Soğuk","Ağır, su tutan toprak"],"toxic":"Kalsiyum oksalat içerir; kedi ve köpeklerde ağız tahrişi ve salya yapar.","shape":{"t":"lily","center":"#E7C14C"}},
 {"id":"kalanso","name":"Kalanşo","latin":"Kalanchoe blossfeldiana","aliases":["kalanşo","kalanso","kalanchoe","kalançe"],"kind":"Çiçekli sukulent","blurb":"Etli yaprakları üstünde haftalarca açık kalan çiçek demetleriyle kışın da renk veren, az sulanan bir saksı çiçeği.","colors":[{"n":"Kırmızı","hex":"#C7303F","m":"sevgi"},{"n":"Turuncu","hex":"#EE8239","m":"neşe"},{"n":"Sarı","hex":"#F3C844","m":"dostluk"},{"n":"Pembe","hex":"#E987A7","m":"incelik"}],"care":{"light":[3,"Bol ışık; kışın en aydınlık pencere"],"water":[1,"Toprak tamamen kuruyunca"],"soil":"Kaktüs toprağı ya da süzek karışım","temp":"13–24 °C","humidity":"Düşük","feed":"Çiçeklenme döneminde ayda bir"},"good":["Solan demetleri kesmek","Yeniden çiçek için sonbaharda 6 hafta uzun geceler (günde 14 saat karanlık)","Delikli saksı"],"bad":["Fazla sulama","Gölge","Soğuk cam"],"toxic":"Kalp glikozitleri içerir; kedi ve köpeklerde kusma, ishal ve nadiren kalp ritmi bozukluğu yapabilir. Zehirlidir.","shape":{"t":"hydrangea","center":"#E8C14A"}},
 {"id":"siklamen","name":"Sıklamen","latin":"Cyclamen persicum","aliases":["sıklamen","siklamen","tavşan kulağı","cyclamen","domuz turpu"],"kind":"Kış çiçeği (yumrulu)","blurb":"Geriye kıvrık taç yapraklarıyla kelebeğe benzeyen, kışın açan yumrulu bir bitki. Anadolu'da yabani akrabaları yetişir; serin odayı sever.","colors":[{"n":"Pembe","hex":"#E77EA2","m":"şefkat"},{"n":"Kırmızı","hex":"#C42A49","m":"derin sevgi"},{"n":"Beyaz","hex":"#F5F2EC","m":"saflık"},{"n":"Mor","hex":"#8D4B8E","m":"vefa"}],"care":{"light":[2,"Parlak dolaylı ışık"],"water":[2,"Alttan sula: saksıyı 15 dakika suya otur; yumruya ve yaprağa su değmesin"],"soil":"Hafif, süzek, humuslu toprak","temp":"10–18 °C; sıcak odada çabuk solar","humidity":"Orta","feed":"Çiçeklenmede 2–3 haftada bir yarım doz"},"good":["Serin bir oda ya da kapalı balkon","Solan çiçeği sapıyla birlikte burarak çekmek","Yazın yumruyu kuru dinlendirmek"],"bad":["Kalorifer yanı","Yumrunun üstünden sulamak","20 °C üstü sıcaklık"],"toxic":"Yumrusu kedi ve köpekler için zehirlidir; kusma ve ishal yapar.","shape":{"t":"orchid","center":"#9E3D66"}},
 {"id":"feslegen","name":"Fesleğen","latin":"Ocimum basilicum","aliases":["fesleğen","feslegen","reyhan","basil","ocimum"],"kind":"Aromatik ot","blurb":"Kokulu yapraklarıyla mutfağın ve pencere önlerinin vazgeçilmezi. Sıcağı ve güneşi sever; uçlarını kopardıkça gürleşir.","colors":[{"n":"Yeşil","hex":"#4C8C3E","m":"iyi dilek ve sevgi"},{"n":"Mor (reyhan)","hex":"#5B2E55","m":"bağlılık"}],"care":{"light":[3,"Günde 6+ saat güneş"],"water":[3,"Toprak hep hafif nemli; sıcakta her gün kontrol et"],"soil":"Verimli, süzek toprak","temp":"18–30 °C; 10 °C altı zarar verir","humidity":"Orta","feed":"Yazın 2–3 haftada bir organik gübre"},"good":["Çiçek tomurcuklarını koparmak (yaprak acılaşmasın)","Uçlarından düzenli hasat","Sabah sulamak"],"bad":["Soğuk ve cereyan","Gölge","Çiçeğe kaçmasına izin vermek"],"toxic":"Kedi ve köpekler için zehirsizdir.","shape":{"t":"lavender","center":"#F3F1E6"}},
 {"id":"nane","name":"Nane","latin":"Mentha spicata","aliases":["nane","mentha","bahçe nanesi","spearmint"],"kind":"Aromatik ot","blurb":"Hızla yayılan, serinletici kokulu bir ot. Saksıda tutmak iyidir; bahçede bırakılırsa her yeri kaplar.","colors":[{"n":"Yeşil","hex":"#3F8A4D","m":"tazelik ve misafirperverlik"},{"n":"Lila (çiçek)","hex":"#B9A1CF","m":"sıcaklık"}],"care":{"light":[2,"Güneş ya da yarı gölge"],"water":[3,"Toprak hep nemli"],"soil":"Nem tutan, verimli toprak","temp":"15–27 °C; kışın toprak altında dinlenir","humidity":"Orta–yüksek","feed":"Ayda bir hafif gübre"},"good":["Kendi saksısında yetiştirmek","Sık hasat","Çiçeklenmeden önce kesmek"],"bad":["Kuruması","Bahçede sınırsız bırakmak (istilacıdır)","Yaprak pası olan dalları bırakmak"],"toxic":"Kedi ve köpeklerde çok miktarda yenirse kusma ve ishal yapabilir.","shape":{"t":"lavender","center":"#B9A1CF"}},
 {"id":"biberiye","name":"Biberiye","latin":"Salvia rosmarinus","aliases":["biberiye","rosmarinus","rosemary","kuşdili"],"kind":"Aromatik çalı","blurb":"İğne gibi kokulu yapraklarıyla Akdeniz mutfağının ve kuru bahçelerin dayanıklı çalısı. Az sulanmayı ve bol güneşi sever.","colors":[{"n":"Yeşil","hex":"#5E7F62","m":"hatıra ve sadakat"},{"n":"Mavi (çiçek)","hex":"#8EA6D6","m":"sevgi"}],"care":{"light":[3,"Tam güneş"],"water":[1,"Toprak kuruyunca; fazla sudan hoşlanmaz"],"soil":"Kumlu, kireçli, süzek toprak","temp":"Hafif dona dayanır; saksıdakini −5 °C altında koru","humidity":"Düşük","feed":"Çok az; yılda bir kez yeter"},"good":["Hasattan sonra uçları kısaltmak","Taşlık ve kuru bahçe","Kışın saksıdakini aydınlık, serin bir yere almak"],"bad":["Islak toprak (kök çürür)","Gölge","Kışın kapalı, sıcak oda"],"toxic":"Kedi ve köpekler için zehirsizdir.","shape":{"t":"lavender","center":"#8EA6D6"}},
 {"id":"yasemin","name":"Yasemin","latin":"Jasminum officinale","aliases":["yasemin","jasmine","jasminum","beyaz yasemin"],"kind":"Kokulu sarılıcı","blurb":"Yaz akşamlarını kokusuyla dolduran, beyaz yıldız çiçekli bir sarılıcı. Çit, pergola ve balkon korkulukları için idealdir.","colors":[{"n":"Beyaz","hex":"#F7F5EE","m":"sevgi ve zarafet"},{"n":"Sarı","hex":"#F0CF4E","m":"neşe ve alçakgönüllülük"}],"care":{"light":[3,"Güneş ya da parlak yarı gölge"],"water":[2,"Toprak üstten kuruyunca; yazın daha sık"],"soil":"Verimli, süzek toprak","temp":"Hafif dona dayanır; saksıdakini sert soğukta koru","humidity":"Orta","feed":"İlkbahar–yaz ayda bir"},"good":["Tutunacağı bir tel ya da pergola","Çiçeklenmeden sonra budama","Kapının ya da oturma yerinin yakını (koku)"],"bad":["Derin gölge","Su birikmesi","Çiçek öncesi sert budama"],"toxic":"Gerçek yasemin (Jasminum) kedi ve köpekler için zehirsizdir. “Yasemin” diye satılan bazı başka bitkiler (ör. Gelsemium) ise zehirlidir.","shape":{"t":"narcissus","center":"#F1E7B0"}},
 {"id":"begonvil","name":"Begonvil","latin":"Bougainvillea","aliases":["begonvil","bougainvillea","gelin duvağı","kağıt çiçeği"],"kind":"Sarılıcı çalı","blurb":"Ege ve Akdeniz evlerinin duvarlarını kaplayan, kâğıt gibi renkli örtü yapraklı bir sarılıcı. Sıcağı, güneşi ve kuru toprağı sever.","colors":[{"n":"Fuşya","hex":"#C2267A","m":"tutku ve canlılık"},{"n":"Mor","hex":"#8A3A97","m":"asalet"},{"n":"Beyaz","hex":"#F4F1EA","m":"saflık"},{"n":"Turuncu","hex":"#EE8740","m":"coşku"}],"care":{"light":[3,"Tam güneş; günde 6+ saat"],"water":[1,"Toprak kuruyunca; biraz susuz kalınca daha çok çiçek açar"],"soil":"Süzek, kumlu toprak","temp":"Sıcağı sever; 5 °C altında yaprak döker, dona dayanmaz","humidity":"Düşük–orta","feed":"Yazın ayda bir, azotu düşük çiçek gübresi"},"good":["Güney duvarı","Çiçeklenmeden sonra budama","Dikenli dallar için eldiven"],"bad":["Fazla su ve azotlu gübre (yaprak verir, çiçek vermez)","Sık saksı değiştirmek (kökleri hassastır)","Soğuk kış"],"toxic":"Dikenli dalları ve özsuyu ciltte hafif tahriş yapabilir; yenirse hafif mide rahatsızlığı bildirilmiştir.","shape":{"t":"hydrangea","center":"#F2E8C8"}}
];
/* Mevsim notları (Türkiye, kuzey yarımküre): ilkbahar mart–mayıs, yaz haziran–ağustos, sonbahar eylül–kasım, kış aralık–şubat */
const SEASONS = {
  zambak:{ilkbahar:"Toprak ısınınca soğanları 15–20 cm derine dik; filizler çıkınca düzenli sula.",yaz:"Çiçekler solunca yalnızca çiçek başını kes; yaprakları bırak ki soğan güç toplasın.",sonbahar:"Gövde sararınca yerden 5 cm yukarıdan kes. Yeni soğan dikimi için de uygun zaman.",kis:"Soğuk bölgelerde toprağı malçla ört; saksıdakileri donmayan, serin bir yere al."},
  gul:{ilkbahar:"Gözler kabarınca buda: kurumuş, zayıf ve çapraz dalları al, ardından gübre ver.",yaz:"Solan çiçekleri ilk beş yapraklı yaprağın üstünden kes; sıcakta sabah erken derin sula.",sonbahar:"Gübrelemeyi bırak ki dallar kışa odunlaşsın; dökülen hastalıklı yaprakları topla.",kis:"Soğuk bölgelerde aşı noktasının çevresine toprak ya da malç doldur."},
  lale:{ilkbahar:"Çiçek solunca tohum başını kopar; yaprakları kendiliğinden sararana kadar kesme.",yaz:"Yapraklar kuruyunca soğanları sökebilirsin; serin, kuru ve havadar bir yerde sakla.",sonbahar:"Ekim–kasım dikim zamanı: soğanları 15 cm derine, sivri ucu yukarı gelecek şekilde dik.",kis:"Soğuk dönem çiçeklenme için gerekli; saksıdaki soğanları sıcak eve alma."},
  orkide:{ilkbahar:"Çiçeklenme bittiyse ve kökler saksıyı doldurduysa kabuk harcıyla saksı değiştir.",yaz:"Öğle güneşinden koru; sıcak günlerde nemi artır ama yaprak arasında su bırakma.",sonbahar:"Gece sıcaklığının birkaç hafta 15–18 °C'ye düşmesi yeni çiçek dalını tetikler.",kis:"Kaloriferin üstünden ve soğuk camdan uzak tut; sulamayı biraz seyrelt."},
  papatya:{ilkbahar:"Kalabalıklaşan öbekleri bölerek çoğalt; tohum ekimi için de uygun dönem.",yaz:"Solan çiçekleri kestikçe yenisi gelir; kuraklıkta derin sula.",sonbahar:"Çiçeklenme bitince gövdeleri yere yakın kes.",kis:"Soğuğa dayanıklıdır; yalnızca su tutan toprakta çürümemesine dikkat et."},
  aycicegi:{ilkbahar:"Don tehlikesi geçince tohumları doğrudan yerine, 2–3 cm derine ek.",yaz:"Uzun boylu çeşitleri desteğe bağla; çiçeklenirken bol su ister.",sonbahar:"Tablanın arkası sararınca tablayı kes ve kurut; tohumları kuşlardan böyle korursun.",kis:"Tek yıllıktır; kurumuş bitkiyi sök, gelecek yıl başka bir yere ek."},
  lavanta:{ilkbahar:"Yeni sürgünler görününce hafif buda; odunlaşmış kısma kesme.",yaz:"Kurutmak için çiçekleri yarı açıkken kes; çiçeklenme sonrası şekil budaması yap.",sonbahar:"Gübre verme; toprağın süzek olduğundan, su birikmediğinden emin ol.",kis:"Asıl düşmanı soğuk değil ıslaklıktır; saksıdakileri yağmurdan koru, az sula."},
  karanfil:{ilkbahar:"Tepe uçlarını çimdikle; daha gür ve çok dallı olur.",yaz:"Solan çiçekleri kes; kökü sula, yaprakları kuru tut.",sonbahar:"Çelikle çoğaltmak için uygun zaman.",kis:"Saksıdakileri serin ve aydınlık bir yerde tut, az sula."},
  sumbul:{ilkbahar:"Çiçek solunca sapı kes; yaprakları kendiliğinden sararana kadar bırak.",yaz:"Soğanlar dinlenmede; sulamaya gerek yok.",sonbahar:"Soğanları 10–15 cm derine dik. İçeride çiçek açtırmak için saksıya alıp serin ve karanlık yerde köklendir.",kis:"Köklenen saksıları filizler 5 cm olunca aydınlığa al."},
  nergis:{ilkbahar:"Çiçek solunca baş kısmını kopar; yaprakları en az altı hafta kesme.",yaz:"Kalabalık öbekleri yapraklar kuruyunca söküp ayırabilirsin.",sonbahar:"Eylül–ekim dikim zamanı: soğan boyunun 2–3 katı derine.",kis:"Soğuğa dayanıklıdır; ek bir şey gerekmez."},
  kasimpati:{ilkbahar:"Eski öbekleri böl ya da çelikle çoğalt.",yaz:"Temmuz ortasına kadar uçları çimdikle; daha toplu ve çok çiçekli olur.",sonbahar:"Asıl çiçeklenme zamanı: solan çiçekleri temizle, toprağı nemli tut.",kis:"Çiçek bitince gövdeleri 10 cm'ye kes; soğukta kökü malçla koru."},
  ortanca:{ilkbahar:"Yalnızca kurumuş dalları ve eski çiçek başlarını al; çoğu çeşit geçen yılın dalında çiçek açar.",yaz:"Sabah güneşi, öğleden sonra gölge; sıcakta her gün sulamak gerekebilir.",sonbahar:"Gübrelemeyi bırak. Mavi renk istiyorsan toprağı asidik tut.",kis:"Kuru çiçek başlarını bahara kadar bırak; altındaki tomurcukları dondan korur."},
  menekse:{ilkbahar:"Saksı değiştirme ve yaprak çeliğiyle çoğaltma zamanı.",yaz:"Doğrudan güneşten koru; oda sıcaklığındaki suyla alttan sula.",sonbahar:"Günler kısalınca daha aydınlık bir pencereye taşı.",kis:"Soğuk camdan uzak tut; 16 °C'nin altına düşmesin."},
  gerbera:{ilkbahar:"Daha büyük saksıya alırken kök boğazını gömme.",yaz:"Bol ışık ister; solan çiçekleri sapıyla birlikte dibinden çek.",sonbahar:"Sulamayı azalt; yaprakların üstüne su gelmesin.",kis:"İçeride serin ve aydınlık bir yerde dinlendir, az sula."},
  sakayik:{ilkbahar:"Ağır çiçekler eğilmesin diye filizlenirken destek halkası koy.",yaz:"Çiçek solunca baş kısmını kes; yaprakları sonbahara kadar bırak.",sonbahar:"Dikim ve bölme zamanı. Gözler toprağın en fazla 5 cm altında kalsın; daha derine gömülürse çiçek vermez.",kis:"Yaprakları yerden kes; soğuk dönem çiçeklenme için gerekli."},
  zeytin:{ilkbahar:"Budama zamanı: ağacın içini havalandır, kurumuş dalları al.",yaz:"Kuraklığa dayanıklıdır; saksıdakileri toprak tamamen kuruyunca derin sula.",sonbahar:"Hasat zamanı (ekim–aralık); gübrelemeyi bırak.",kis:"Genç ağaçlar −7 °C'nin altında zarar görebilir; saksıdakileri korunaklı bir yere al."},
  monstera:{"ilkbahar":"Saksı değiştirme ve gübrelemeye başlama zamanı; yeni yapraklar açılır.","yaz":"Hızlı büyür: düzenli sula, ayda bir gübrele, öğle güneşinden koru.","sonbahar":"Sulamayı seyrelt, gübreyi bırak; soğuk camdan uzaklaştır.","kis":"Büyüme yavaşlar; toprak iyice kuruyunca sula, kaloriferden uzak tut."},
  pothos:{"ilkbahar":"Uzayan dalları kesip suda köklendirerek çoğalt.","yaz":"Toprak yarısına kadar kuruyunca sula; 4–6 haftada bir gübre ver.","sonbahar":"Işık azalınca daha aydınlık bir yere taşı.","kis":"Sulamayı azalt; yaprak sararması çoğunlukla fazla sudandır."},
  pasakilici:{"ilkbahar":"Kalabalıklaşan saksıyı bölerek çoğalt.","yaz":"Ayda bir sulama genellikle yeter; yarım dozda gübre verebilirsin.","sonbahar":"Sulamayı azaltmaya başla.","kis":"Ayda bir ya da daha az sula; 10 °C altında bırakma."},
  zz:{"ilkbahar":"Gerekirse bir boy büyük saksıya al; yumrular saksıyı zorlayabilir.","yaz":"Toprak kuruyunca derin sula; parlak dolaylı ışıkta yeni sürgün verir.","sonbahar":"Sulamayı seyrelt.","kis":"3–4 haftada bir sulama yeter."},
  aloe:{"ilkbahar":"Yavruları ana bitkiden ayırıp ayrı saksılara dik.","yaz":"Balkona çıkarabilirsin; doğrudan güneşe yavaş yavaş alıştır.","sonbahar":"Gece 10 °C'nin altına düşmeden içeri al.","kis":"Ayda bir sula; aydınlık bir pencerede tut."},
  kaktus:{"ilkbahar":"Sulamaya yavaş yavaş yeniden başla; saksı değiştirme zamanı.","yaz":"Toprak tamamen kuruyunca sula, ayda bir kaktüs gübresi ver.","sonbahar":"Sulamayı azalt, gübreyi kes.","kis":"Serin ve aydınlık yerde neredeyse susuz dinlendir; bu dönem çiçeklenmeyi sağlar."},
  sukulent:{"ilkbahar":"Yapraktan ve yavrudan çoğaltma zamanı.","yaz":"Kızgın öğle güneşinde yanabilir; sıcakta toprağa sula, rozete değil.","sonbahar":"Sulamayı azalt; gece soğumadan içeri al.","kis":"En aydınlık pencere; çok az su."},
  barisicegi:{"ilkbahar":"Gerekirse saksı değiştir; gübrelemeye başla.","yaz":"Toprak kurumasın; sıcakta sık kontrol et.","sonbahar":"Gübreyi azalt; ışık azalınca pencereye yaklaştır.","kis":"Kalorifer havasına karşı nemi artır; sulamayı biraz seyrelt."},
  ataturkcicegi:{"ilkbahar":"Renkli yapraklar dökülünce dalları 10–15 cm'ye kadar kısalt.","yaz":"Balkonda yarı gölgede büyütebilirsin; ayda bir gübrele.","sonbahar":"Yeniden renklenmesi için ekimden itibaren her gece 14 saat tam karanlık ver.","kis":"Renklenme zamanı: sabit sıcaklık, aydınlık ve cereyansız oda."},
  sardunya:{"ilkbahar":"Kışlattığın bitkileri buda; balkona çıkarmadan önce dona dikkat et.","yaz":"Asıl çiçeklenme: solan çiçekleri kopar, 2 haftada bir gübrele.","sonbahar":"Çelik al; ilk donlardan önce saksıları içeri al.","kis":"Serin, aydınlık odada az suyla dinlendir."},
  begonya:{"ilkbahar":"Yumrulu türleri yeniden saksıla, sulamaya başla.","yaz":"Yarı gölgede tut; yaprakları ıslatmadan sula.","sonbahar":"Yumrulu türlerde yapraklar sararınca sulamayı kes, yumruyu kurut.","kis":"Saksıdakileri aydınlık, ılık odada tut; az sula."},
  kaucuk:{"ilkbahar":"Budama ve saksı değiştirme zamanı.","yaz":"Düzenli sula, ayda bir gübrele; yaprakları sil.","sonbahar":"Sulamayı azalt, yerini değiştirme.","kis":"Kalorifer yanından uzak tut; toprak üstten kuruyunca sula."},
  benjamin:{"ilkbahar":"Hafif budama yap; gübrelemeye başla.","yaz":"Düzenli sula; sabah güneşi iyi gelir.","sonbahar":"Işık azalınca yaprak dökebilir; yerini değiştirmeden en aydınlık noktada tut.","kis":"Cereyandan ve kaloriferden koru; sulamayı azalt."},
  paraagaci:{"ilkbahar":"Çelikle çoğalt; gerekirse saksı değiştir.","yaz":"Balkonda yarı gölgede tutabilirsin; toprak kuruyunca sula.","sonbahar":"Sulamayı azalt; serin geceler çiçek tomurcuğunu tetikler.","kis":"Serin, aydınlık yerde çok az suyla dinlendir; bu dönemde çiçek açabilir."},
  yukka:{"ilkbahar":"Saksı değiştirme zamanı; kuruyan alt yaprakları al.","yaz":"Balkonda yarı gölgeye çıkarabilirsin.","sonbahar":"Gece 10 °C altına düşmeden içeri al.","kis":"En aydınlık yerde, seyrek sula."},
  difenbahya:{"ilkbahar":"Boylanan gövdeyi eldivenle kısaltabilirsin; kesilen parça köklenir.","yaz":"Düzenli sula, nemi yüksek tut.","sonbahar":"Gübreyi bırak, sulamayı azalt.","kis":"16 °C altına düşmesin; soğuk camdan uzak tut."},
  antoryum:{"ilkbahar":"Kabuklu, havadar toprakla saksı değiştir.","yaz":"Nemi yüksek tut; ayda bir fosforlu gübre ver.","sonbahar":"Işık azalınca pencereye yaklaştır.","kis":"Kuru kalorifer havasına karşı nemli çakıl tabağı kullan."},
  kalanso:{"ilkbahar":"Çiçek bitince solan demetleri kes; gerekirse saksı değiştir.","yaz":"Az sula; balkonda yarı gölgede tutabilirsin.","sonbahar":"Yeniden çiçek için 6 hafta uzun gece ver (günde 14 saat karanlık).","kis":"Çiçeklenme dönemi: aydınlık pencere, az su."},
  siklamen:{"ilkbahar":"Çiçeklenme biter; yapraklar sararınca sulamayı azalt.","yaz":"Yumruyu kuru ve serin dinlendir.","sonbahar":"Yeni yapraklar çıkınca alttan sulamaya başla.","kis":"Çiçeklenme dönemi: serin oda (10–18 °C), alttan sulama."},
  feslegen:{"ilkbahar":"Don geçince tohum ek ya da fide dik.","yaz":"Uçlarından hasat et, çiçek tomurcuklarını kopar, sık sula.","sonbahar":"Soğuk gelmeden son hasadı yap; yaprakları kurut ya da dondur.","kis":"Tek yıllık gibi yetişir; içeride güneşli pencerede bir süre yaşatılabilir."},
  nane:{"ilkbahar":"Yeni sürgünler gelir; saksıyı böl ve toprağı tazele.","yaz":"Sık hasat et, toprak kurumasın.","sonbahar":"Dalları yere yakın kes.","kis":"Toprak altında dinlenir; saksıyı dondan koru."},
  biberiye:{"ilkbahar":"Çiçekten sonra hafif buda; çelik al.","yaz":"Sıcağı sever, az sula.","sonbahar":"Saksıdakini sert soğuklardan önce korunaklı bir yere hazırla.","kis":"Islak ve soğuk toprak kökünü çürütür; seyrek sula."},
  yasemin:{"ilkbahar":"Yeni sürgünleri tele yönlendir; gübrelemeye başla.","yaz":"Çiçeklenme ve koku dönemi; düzenli sula.","sonbahar":"Çiçeklenme bitince buda.","kis":"Saksıdakini sert soğuktan koru; az sula."},
  begonvil:{"ilkbahar":"Hafif budama yap; çiçek gübresine başla.","yaz":"Asıl çiçeklenme; biraz susuz kalması daha çok çiçek açtırır.","sonbahar":"Çiçek bitince şekil budaması yap.","kis":"5 °C altında saksıdakini içeri ya da korunaklı yere al; çok az sula."}
};
const SEASON_NAMES={ilkbahar:"İlkbahar",yaz:"Yaz",sonbahar:"Sonbahar",kis:"Kış"};
/* Sağlık ve kullanım: geleneksel kullanım + kanıt düzeyi + uyarı. Bilgi amaçlıdır, tıbbi tavsiye değildir.
   level: "güçlü" | "sınırlı" | "yok" (bilimsel kanıt) */
const HEALTH = {
  zambak:{uses:["Akdeniz zambağının (Lilium candidum) çiçekleri halk arasında zeytinyağında bekletilip “zambak yağı” olarak yanık, çatlak ve morluklara dıştan sürülür.","Geleneksel Çin tıbbında bazı zambak türlerinin soğanı öksürük ve uykusuzluk için kullanılır."],level:"sınırlı",note:"Bu kullanımları destekleyen klinik çalışma yok denecek kadar az.",caution:"Kediler için ölümcül zehirlidir: yaprak, çiçek, polen, hatta vazodaki su bile böbrek yetmezliğine yol açabilir. Ağızdan kullanma."},
  gul:{uses:["Gül suyu (Rosa damascena) cilt toniği ve yatıştırıcı olarak, gül yağı aromaterapide kullanılır.","İlaçsız yetiştirilmiş güllerin taç yaprakları reçel ve şerbette kullanılır.","Yabani gülün meyvesi kuşburnu (Rosa canina) C vitamini bakımından zengindir; çayı halk arasında soğuk algınlığında içilir."],level:"sınırlı",note:"Kuşburnunun C vitamini içeriği iyi bilinir; eklem ağrısına etkisi üzerine birkaç küçük çalışma var. Gül suyunun cilde etkisi için kanıt sınırlı.",caution:"Çiçekçiden alınan güller ilaçlanmış olabilir; taç yaprakları yenmez."},
  lale:{uses:["Bilinen bir tıbbi kullanımı yoktur; süs bitkisidir.","1944–45 Hollanda kıtlığında soğanı yiyecek yerine yenmiştir; bugün önerilmez."],level:"yok",note:"Tıbbi kullanım için kanıt yok.",caution:"Soğanı ve gövdesi ciltte kaşıntılı tahriş (“lale parmağı”) yapabilir; kedi ve köpekler için zehirlidir."},
  orkide:{uses:["Saksı orkidesinin (Phalaenopsis) bilinen bir tıbbi kullanımı yoktur.","Salep, başka orkide cinslerinin (Orchis vb.) yumrularından yapılır; doğadan aşırı toplanması bu türleri tehlikeye sokmuştur.","Vanilya da bir orkidenin (Vanilla planifolia) meyvesidir."],level:"yok",note:"Phalaenopsis için tıbbi kullanım kanıtı yok.",caution:"Phalaenopsis kedi ve köpekler için zehirsiz kabul edilir."},
  papatya:{uses:["Rehberdeki papatya, iri çiçekli öküzgözü papatyasıdır (Leucanthemum vulgare). Halk arasında genç yaprakları salataya katılır, çiçeği öksürük ve gaz için çay olarak içilmiştir.","Bilinen “papatya çayı” ise başka bir bitkiden, Alman papatyasından (Matricaria chamomilla) yapılır: hafif yatıştırıcı ve mide rahatlatıcı olarak kullanılır."],level:"sınırlı",note:"Alman papatyası için hafif kaygı ve uyku üzerine bazı klinik çalışmalar var; öküzgözü papatyası için kanıt yok.",caution:"Papatyagillere (Asteraceae) alerjisi olanlarda alerji yapabilir. Hamilelikte ve kan sulandırıcı kullanıyorsan doktora danış."},
  aycicegi:{uses:["Çekirdeği E vitamini, magnezyum ve doymamış yağ bakımından zengindir.","Ayçiçek yağı mutfakta, ayrıca ciltte nemlendirici olarak kullanılır."],level:"güçlü",note:"Besin değeri iyi belgelenmiştir; çekirdek ve yağ bir tedavi değil, beslenmenin parçasıdır.",caution:"Tuzlu çekirdek fazla tüketilince tuz alımı artar. Bitki zehirsizdir."},
  lavanta:{uses:["Lavanta yağı aromaterapide gerginlik ve uyku sorunları için koklanır ya da seyreltilerek masajda kullanılır.","Kurutulmuş çiçekleri çay, kese ve güve kovucu olarak kullanılır."],level:"sınırlı",note:"Standart lavanta yağı kapsülleri (Silexan) üzerine kaygı bozukluğunda olumlu klinik çalışmalar var; koklamanın etkisi için kanıt daha zayıf.",caution:"Saf yağ içilmez ve cilde seyreltilmeden sürülmez; tahriş yapabilir. Kedi ve köpekler için zararlıdır."},
  karanfil:{uses:["Çiçek karanfilin (Dianthus caryophyllus) taç yaprakları yenilebilir; tatlı ve salatalarda süs olarak kullanılır.","Diş ağrısında kullanılan baharat “karanfil” ise bambaşka bir bitkidir: karanfil ağacının (Syzygium aromaticum) kurutulmuş tomurcuğu. Etkisi içindeki öjenolden gelir."],level:"yok",note:"Çiçek karanfil için tıbbi kanıt yok; baharat karanfildeki öjenolün diş ağrısında uyuşturucu etkisi bilinir.",caution:"Kedi ve köpeklerde hafif mide bulantısı yapabilir."},
  sumbul:{uses:["Bilinen bir tıbbi kullanımı yoktur; kokusu nedeniyle parfümcülükte kullanılır."],level:"yok",note:"Tıbbi kullanım için kanıt yok.",caution:"Soğanı zehirlidir ve ciltte tahriş yapar; soğanlarla eldivenle çalış. Evcil hayvanlardan uzak tut."},
  nergis:{uses:["Alzheimer hastalığında kullanılan galantamin etken maddesi nergis ve kardelen soğanlarından elde edilebilir; ama bu, laboratuvarda saflaştırılmış onaylı bir ilaçtır.","Halk arasında soğanı haricen yara ve çıbanlara sürülmüştür."],level:"yok",note:"Galantamin onaylı bir ilaçtır; bitkinin kendisini kullanmanın güvenli bir yolu yoktur.",caution:"Bütün bitki, özellikle soğanı çok zehirlidir (likorin). Soğanının taze soğan sanılıp yenmesiyle zehirlenmeler olur. Asla ağızdan kullanma."},
  kasimpati:{uses:["Çin'de Chrysanthemum morifolium çiçeğinden yapılan “ju hua” çayı, geleneksel tıpta soğuk algınlığı, baş ağrısı ve göz yorgunluğu için içilir.","Doğal böcek öldürücü piretrin, akrabası pire otundan (Tanacetum cinerariifolium) elde edilir."],level:"sınırlı",note:"Kasımpatı çayı için klinik kanıt sınırlı.",caution:"Papatyagillere alerjisi olanlarda alerji yapabilir; kedi ve köpekler için zehirlidir."},
  ortanca:{uses:["Japonya'da bir ortanca türünün (Hydrangea serrata) mayalanmış yapraklarından tatlı “amaça” çayı yapılır.","Kuzey Amerika'da başka bir türün kökü halk arasında böbrek taşı için kullanılmıştır."],level:"yok",note:"Bu kullanımlar için güvenilir klinik kanıt yok.",caution:"Yaprak ve çiçekleri siyanojenik glikozit içerir; yenirse kusma ve ishal yapabilir. Çocuk ve hayvanlardan uzak tut."},
  menekse:{uses:["Afrika menekşesinin bilinen bir tıbbi kullanımı yoktur.","Öksürük şuruplarında ve tatlılarda kullanılan “kokulu menekşe” (Viola odorata) başka bir bitkidir."],level:"yok",note:"Tıbbi kullanım için kanıt yok.",caution:"Kedi ve köpekler için zehirsizdir."},
  gerbera:{uses:["Bilinen bir tıbbi kullanımı yoktur; kesme çiçek olarak yetiştirilir.","NASA'nın 1989 “temiz hava” çalışmasında iç ortamdaki bazı kimyasalları azaltan bitkiler arasında anılır; ancak bir evdeki birkaç saksının etkisi çok küçüktür."],level:"yok",note:"Sağlık üzerine kanıt yok.",caution:"Kedi ve köpekler için zehirsizdir."},
  sakayik:{uses:["Paeonia lactiflora'nın kökü (“bai shao”) geleneksel Çin tıbbında ağrı ve kramplar için kullanılır; içindeki paeoniflorin üzerine çalışmalar sürmektedir.","Taç yaprakları bazı mutfaklarda çay ve tatlılara katılır."],level:"sınırlı",note:"Laboratuvar ve küçük klinik çalışmalar var; güçlü kanıt yok.",caution:"Kök ve kabuğu evcil hayvanlarda kusma ve ishal yapabilir. Kan sulandırıcı kullanıyorsan doktora danışmadan kullanma."},
  zeytin:{uses:["Sızma zeytinyağı Akdeniz beslenmesinin temelidir; kalp ve damar sağlığını desteklediği büyük çalışmalarla gösterilmiştir.","Zeytin yaprağı çayı ve özü halk arasında tansiyon ve kan şekeri için kullanılır."],level:"güçlü",note:"Zeytinyağı için güçlü kanıt var (PREDIMED gibi büyük çalışmalar); zeytin yaprağı için kanıt sınırlı.",caution:"Zeytin yaprağı özü tansiyon ve şeker ilaçlarının etkisini artırabilir; ilaç kullanıyorsan doktora danış."},
  monstera:{"uses":["Olgun meyvesi tropik ülkelerde yenir; ham meyve ağzı yakar.","Bilinen bir tıbbi kullanımı yoktur."],"level":"yok","note":"Tıbbi kullanım için kanıt yok.","caution":"Yaprakları ve ham meyvesi kalsiyum oksalat içerir; çiğnenmemeli."},
  pothos:{"uses":["Bilinen bir tıbbi kullanımı yoktur.","NASA'nın 1989 “temiz hava” çalışmasında iç ortamdaki bazı kimyasalları azaltan bitkiler arasında anılır; ama bir evdeki birkaç saksının etkisi çok küçüktür."],"level":"yok","note":"Sağlık üzerine kanıt yok.","caution":"Kalsiyum oksalat içerir; yaprakları çiğnenmemeli."},
  pasakilici:{"uses":["Bazı Afrika ülkelerinde yaprak liflerinden ip yapılmıştır.","Gece oksijen verdiği ve havayı belirgin biçimde temizlediği sıkça söylenir; bir odadaki etkisi ölçülemeyecek kadar küçüktür."],"level":"yok","note":"Hava temizleme iddiaları ev koşullarında desteklenmiyor.","caution":"Yaprakları yenmemeli; saponin mide bulantısı yapar."},
  zz:{"uses":["Doğu Afrika'da halk arasında bazı rahatsızlıklarda kullanıldığı kayıtlıdır.","Bilinen yaygın bir tıbbi kullanımı yoktur."],"level":"yok","note":"Güvenilir kanıt yok.","caution":"Özsuyu ciltte tahriş yapabilir; yaprakları yenmemeli."},
  aloe:{"uses":["Yaprağın içindeki şeffaf jel, hafif yanık, güneş yanığı ve kuru ciltte yatıştırıcı olarak sürülür.","Yaprak kabuğundaki sarı özsu (aloin) eskiden müshil olarak kullanılırdı; bugün güvenlik nedeniyle birçok ülkede ilaçlardan çıkarılmıştır."],"level":"sınırlı","note":"Hafif yanıklarda iyileşmeyi hızlandırabileceğini gösteren bazı çalışmalar var; ağızdan kullanım için kanıt zayıf, risk ise belirgin.","caution":"Sarı özsu içilmemeli; ishal, kramp ve uzun kullanımda böbrek sorunlarına yol açabilir. Derin ya da enfekte yarada kullanma."},
  kaktus:{"uses":["Frenk inciri (Opuntia) kaktüsünün meyvesi ve genç yaprakları (nopal) yenir; lif bakımından zengindir.","Süs kaktüslerinin bilinen bir tıbbi kullanımı yoktur."],"level":"sınırlı","note":"Nopalın kan şekerine etkisi üzerine küçük çalışmalar var; süs kaktüsleri için kanıt yok.","caution":"Dikenleri cilde batar; Frenk incirinin ince tüy dikenleri gözle zor görülür, eldivenle tut."},
  sukulent:{"uses":["Bilinen bir tıbbi kullanımı yoktur; süs bitkisidir."],"level":"yok","note":"Tıbbi kullanım için kanıt yok.","caution":"Zehirsiz kabul edilir; yine de yenmesi önerilmez."},
  barisicegi:{"uses":["Bilinen bir tıbbi kullanımı yoktur.","NASA'nın 1989 “temiz hava” çalışmasında anılır; ev ortamındaki etkisi çok küçüktür."],"level":"yok","note":"Sağlık üzerine kanıt yok.","caution":"Kalsiyum oksalat içerir; poleni hassas kişilerde alerji yapabilir."},
  ataturkcicegi:{"uses":["Meksika'da Azteklerin örtü yapraklarından kırmızı boya elde ettiği bilinir.","Bilinen bir tıbbi kullanımı yoktur."],"level":"yok","note":"Tıbbi kullanım için kanıt yok.","caution":"Beyaz özsuyu cildi ve gözü tahriş eder; lateks alerjisi olanlarda alerji yapabilir."},
  sardunya:{"uses":["Kokulu bir sardunya türünden (Pelargonium graveolens) elde edilen ıtır yağı parfümcülükte ve aromaterapide kullanılır.","Güney Afrika'da bir türün kökünden (Pelargonium sidoides) yapılan özüt, bronşit ve soğuk algınlığı için bitkisel ilaç olarak satılır."],"level":"sınırlı","note":"Pelargonium sidoides özütünün akut bronşitte belirtileri kısaltabildiğine dair bazı klinik çalışmalar var; balkon sardunyası için kanıt yok.","caution":"Yağ ciltte seyreltilmeden kullanılmaz; balkon sardunyasının yaprakları yenmez."},
  begonya:{"uses":["Bazı türlerin ekşimsi çiçekleri bazı mutfaklarda süs ve salata malzemesi olarak kullanılır.","Bilinen yaygın bir tıbbi kullanımı yoktur."],"level":"yok","note":"Tıbbi kullanım için kanıt yok.","caution":"Oksalik asit içerir; yumruları yenmemeli, böbrek taşı eğilimi olanlar dikkat etmeli."},
  kaucuk:{"uses":["Eskiden özsuyundan düşük kaliteli kauçuk elde edilmiştir; bugünkü doğal kauçuk başka bir ağaçtan (Hevea brasiliensis) gelir.","Bilinen bir tıbbi kullanımı yoktur."],"level":"yok","note":"Tıbbi kullanım için kanıt yok.","caution":"Özsuyu lateks alerjisi olanlarda alerji yapabilir."},
  benjamin:{"uses":["Bilinen bir tıbbi kullanımı yoktur.","İç mekânda yaprak ve özsu tozları bazı kişilerde alerjiye yol açabilir; ev bitkisi alerjilerinin bilinen kaynaklarındandır."],"level":"yok","note":"Tıbbi kullanım için kanıt yok.","caution":"Lateks alerjisi olanlarda alerji yapabilir."},
  paraagaci:{"uses":["Bilinen bir tıbbi kullanımı yoktur.","Doğu Asya'da bolluk ve şans getirdiğine inanılır; dükkânlara açılış hediyesi olarak verilir."],"level":"yok","note":"Tıbbi kullanım için kanıt yok.","caution":"Kedi ve köpeklerde zehirlenme yapabilir; ağızdan kullanılmamalı."},
  yukka:{"uses":["Bazı yukka türlerinin kökü Kuzey Amerika'da sabun gibi kullanılmıştır (saponin).","Yenen “yuka” (manyok, Manihot esculenta) bambaşka bir bitkidir."],"level":"yok","note":"İnsan sağlığına etkisi için güvenilir kanıt yok.","caution":"Yaprak uçları sivridir; göze dikkat."},
  difenbahya:{"uses":["Bilinen bir tıbbi kullanımı yoktur."],"level":"yok","note":"Tıbbi kullanım için kanıt yok.","caution":"Çok zehirlidir; özsuyu göze kaçarsa bol suyla yıka ve doktora başvur."},
  antoryum:{"uses":["Bilinen bir tıbbi kullanımı yoktur; kesme çiçek olarak vazoda haftalarca dayanır."],"level":"yok","note":"Tıbbi kullanım için kanıt yok.","caution":"Kalsiyum oksalat içerir; yaprakları ve çiçeği çiğnenmemeli."},
  kalanso:{"uses":["Bazı akraba türleri (ör. Kalanchoe pinnata) halk arasında yara ve yanıkta kullanılmıştır.","Saksı kalanşosunun bilinen bir tıbbi kullanımı yoktur."],"level":"yok","note":"Güvenilir klinik kanıt yok.","caution":"Kalp glikozitleri içerir; ağızdan kullanılmamalı."},
  siklamen:{"uses":["Yumrusu eskiden halk arasında haricen kullanılmıştır; bugün önerilmez.","Yabani sıklamen türleri uluslararası koruma (CITES) altındadır; doğadan sökülmüş yumru satın alma."],"level":"yok","note":"Tıbbi kullanım için kanıt yok.","caution":"Yumrusu zehirlidir; yenirse kusma ve ishal yapar."},
  feslegen:{"uses":["Mutfakta taze ve kuru olarak kullanılır; pesto sosunun ana malzemesidir.","Halk arasında hazımsızlık ve gaz için çayı içilir."],"level":"sınırlı","note":"Mutfak kullanımı güvenlidir; sindirime etkisi için kanıt sınırlı.","caution":"Yoğun fesleğen yağı (esans) içilmez; hamilelikte ilaç gibi yüksek dozda kullanma."},
  nane:{"uses":["Taze ve kuru yaprakları mutfakta, çayı halk arasında mide bulantısı ve hazımsızlık için kullanılır.","Mide-bağırsak kramplarında kullanılan nane yağı kapsülleri ise başka bir türden, tıbbi naneden (Mentha × piperita) yapılır."],"level":"sınırlı","note":"Bağırsakta açılan nane yağı kapsüllerinin irritabl bağırsak sendromunda belirtileri azalttığını gösteren güçlü çalışmalar var; bahçe nanesinin çayı için kanıt sınırlı.","caution":"Reflüsü (mide yanması) olanlarda şikâyeti artırabilir; nane yağı bebek ve küçük çocukların yüzüne sürülmez."},
  biberiye:{"uses":["Mutfakta et, patates ve ekmekte baharat olarak kullanılır.","Kokusunun hafızayı güçlendirdiği sıkça söylenir; bu konuda yalnızca küçük, ön çalışmalar var.","Biberiye yağı saç bakım ürünlerinde kullanılır."],"level":"sınırlı","note":"Mutfak kullanımı güvenlidir; sağlık iddiaları için kanıt sınırlı.","caution":"Yoğun biberiye yağı içilmez; epilepsi hastaları ve hamileler yağı kullanmadan önce doktora danışmalı."},
  yasemin:{"uses":["Çiçekleri yeşil çaya koku vermek için kullanılır (yasemin çayı).","Yasemin yağı parfümcülüğün en değerli malzemelerindendir; aromaterapide rahatlatıcı olarak koklanır."],"level":"sınırlı","note":"Kokusunun rahatlatıcı etkisi üzerine küçük çalışmalar var; güçlü kanıt yok.","caution":"Saf yağ cilde seyreltilmeden sürülmez; çayda yalnızca gerçek yasemin (Jasminum) kullanılır."},
  begonvil:{"uses":["Bazı ülkelerde halk arasında öksürük için çayı içildiği kayıtlıdır.","Asıl değeri süs bitkisi olarak; renkli kısımları gerçek çiçek değil, örtü yapraklarıdır."],"level":"yok","note":"Tıbbi kullanım için güvenilir kanıt yok.","caution":"Dikenlerine ve özsuyuna karşı eldiven kullan."}
};
const seasonOf=(d=new Date())=>["kis","kis","ilkbahar","ilkbahar","ilkbahar","yaz","yaz","yaz","sonbahar","sonbahar","sonbahar","kis"][d.getMonth()];
const BY_ID = Object.fromEntries(FLOWERS.map(f=>[f.id,f]));
const SHAPES = ["lily","rose","tulip","orchid","daisy","sunflower","lavender","carnation","hyacinth","narcissus","mum","hydrangea","violet","gerbera","peony","tree"];
const CATS = ["Kesme çiçek","Saksı çiçeği","Buket","Ağaç / fidan","Soğan / tohum","Diğer"];

/* =========================================================
   2. YARDIMCILAR — güvenli DOM, doğrulama
   ========================================================= */
// Kullanıcıdan / veritabanından gelen hiçbir metin innerHTML ile basılmaz.
function el(tag, attrs, ...kids){
  const n = document.createElement(tag);
  if(attrs) for(const [k,v] of Object.entries(attrs)){
    if(v==null||v===false) continue;
    if(k==="class") n.className=v;
    else if(k==="text") n.textContent=v;
    else if(k.startsWith("on")) n.addEventListener(k.slice(2),v);
    else if(k==="style") n.style.cssText=v; // CSSOM: CSP'de style-src 'unsafe-inline' gerektirmez
    else n.setAttribute(k, v===true?"":String(v));
  }
  for(const k of kids.flat()){ if(k==null||k===false) continue; n.append(k instanceof Node?k:document.createTextNode(String(k))); }
  return n;
}
const svgNS="http://www.w3.org/2000/svg";
function svg(markup){ // yalnızca sabit, koda gömülü SVG için
  const t=document.createElement("template"); t.innerHTML=markup.trim(); return t.content.firstChild;
}
// satır sonlarını koruyan sürüm (Vikipedi bölümleri için)
const clampML=(s,max)=>typeof s==="string"?[...s].filter(ch=>{ const c=ch.charCodeAt(0); return c===10||(c>=32&&c!==127&&c!==8232&&c!==8233); }).join("").trim().slice(0,max):"";
// replaceChildren boş değerleri "null" diye yazar; önce ayıkla
const nodes=(...a)=>a.flat().filter(x=>x!=null&&x!==false&&x!=="");
const clampStr=(s,max)=>typeof s==="string"?s.replace(/[\u0000-\u001F\u007F]/g," ").trim().slice(0,max):"";
const HEX=/^#[0-9a-fA-F]{6}$/;
const safeHex=(h,f="#cccccc")=>HEX.test(h||"")?h:f;
const fmtTL=n=>new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY",maximumFractionDigits:2}).format(n);
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Türkçe-duyarlı normalleştirme: "Şakayık" -> "sakayik" */
function norm(s){
  return String(s).toLocaleLowerCase("tr").replace(/ı/g,"i").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]+/g," ").replace(/\s+/g," ").trim();
}

/* =========================================================
   3. ANAHTAR AĞACI (TRIE) — önek araması
   ========================================================= */
class Trie{
  constructor(){ this.root={c:new Map(),ids:new Set()}; }
  insert(text,id){
    const n0=norm(text); if(!n0) return;
    // tam ifade + her kelimenin başı: "beyaz zambak" hem "bey" hem "zam" ile bulunur
    const words=n0.split(" "); const starts=new Set([n0]);
    for(let i=0;i<words.length;i++) starts.add(words.slice(i).join(" "));
    for(const s of starts){
      let n=this.root;
      for(const ch of s){ let nx=n.c.get(ch); if(!nx){ nx={c:new Map(),ids:new Set()}; n.c.set(ch,nx); } n=nx; n.ids.add(id); }
    }
  }
  prefix(p){ let n=this.root; for(const ch of p){ n=n.c.get(ch); if(!n) return new Set(); } return n.ids; }
  search(q){
    const nq=norm(q); if(!nq) return [];
    let hit=this.prefix(nq);
    if(hit.size===0){ // kelime kelime kesişim: "pembe ork"
      const toks=nq.split(" "); let acc=null;
      for(const t of toks){ const s=this.prefix(t); acc=acc?new Set([...acc].filter(x=>s.has(x))):new Set(s); if(!acc.size) break; }
      hit=acc||new Set();
    }
    return [...hit];
  }
}

/* Rehber ağacı */
const gTrie=new Trie();
for(const f of FLOWERS){
  gTrie.insert(f.name,f.id); gTrie.insert(f.latin,f.id); f.aliases.forEach(a=>gTrie.insert(a,f.id)); gTrie.insert(f.kind,f.id);
  f.colors.forEach(c=>{ gTrie.insert(c.n,f.id); gTrie.insert(c.n+" "+f.name,f.id); gTrie.insert(c.m,f.id); });
}

/* =========================================================
   4. 3B ÇİÇEK SAHNESİ (Three.js, prosedürel)
   ========================================================= */
// Three.js (~600 KB) yalnızca 3B gerektiğinde yüklenir: 3B'ye geçince, fotoğrafı olmayan bitki/üründe.
const CAN_GL = (()=>{ try{ const c=document.createElement("canvas"); return !!(c.getContext("webgl")||c.getContext("experimental-webgl")); }catch(e){ return false; } })();
let HAS_GL = CAN_GL && !!window.THREE;
const THREE_SRC="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js";
const THREE_SRI="sha384-CI3ELBVUz9XQO+97x6nwMDPosPR5XvsxW2ua7N1Xeygeh1IxtgqtCkGfQY9WWdHu"; // SRI: CDN'deki dosya değişirse yüklenmez
let threeP=null;
function loadThree(){
  if(!CAN_GL) return Promise.resolve(false);
  return threeP??=new Promise(res=>{
    if(window.THREE){ HAS_GL=true; res(true); return; }
    const s=document.createElement("script"); s.src=THREE_SRC; s.integrity=THREE_SRI; s.crossOrigin="anonymous";
    s.onload=()=>{ HAS_GL=!!window.THREE; res(HAS_GL); }; s.onerror=()=>{ threeP=null; res(false); };
    document.head.append(s);
  });
}

function petalGeo(o){
  const {len=1,wid=.35,a=.7,b=.7,cup=.3,curl=.2,ruffle=0,su=22,sv=12,seed=1}=o;
  const pos=[],col=[],idx=[],uvs=[], rnd=rng(seed);
  const wob=[rnd()*6,rnd()*6,.03+rnd()*.05]; // her yaprağın kenarı biraz farklı dalgalanır
  for(let i=0;i<=su;i++){
    const u=i/su, w=wid*Math.pow(Math.max(0,Math.sin(Math.PI*Math.pow(u,a))),b)*(1+wob[2]*Math.sin(u*11+wob[0]));
    for(let j=0;j<=sv;j++){
      const v=j/sv*2-1;
      const x=v*w, y=u*len;
      const z=cup*v*v*w + curl*u*u*len + ruffle*Math.sin(v*9+u*7)*u*w*.45 + .025*Math.sin(v*3+wob[1])*u*len;
      pos.push(x,y,z); uvs.push((v+1)/2,u);
      const l=.82+.18*Math.pow(u,.5);
      col.push(l,l,l);
    }
  }
  for(let i=0;i<su;i++)for(let j=0;j<sv;j++){ const A=i*(sv+1)+j,B=A+sv+1; idx.push(A,B,A+1,B,B+1,A+1); }
  const g=new THREE.BufferGeometry();
  g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));
  g.setAttribute("color",new THREE.Float32BufferAttribute(col,3));
  g.setAttribute("uv",new THREE.Float32BufferAttribute(uvs,2));
  g.setIndex(idx); g.computeVertexNormals(); return g;
}
/* tohumlu rastgele sayı: aynı çiçek her açılışta aynı “kusurlarla” görünür */
function rng(seed){ let a=(seed*2654435761)>>>0; return ()=>{ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function hashStr(s){ let h=2166136261; for(const c of s){ h^=c.charCodeAt(0); h=Math.imul(h,16777619); } return h>>>0; }

/* prosedürel dokular: damarlar, taban gölgesi, ince lif, kenar koyuluğu */
const TEX={};
function petalTex(kind){
  if(TEX[kind]) return TEX[kind];
  const W=256,H=512,c=document.createElement("canvas"); c.width=W; c.height=H; const x=c.getContext("2d"), R=rng(hashStr(kind));
  // taban (v=0 aşağıda) hafif yeşilimsi-krem, uca doğru açılır
  const g=x.createLinearGradient(0,H,0,0);
  g.addColorStop(0, kind==="leaf"?"#b9c9a4":"#d9dcc0"); g.addColorStop(.28,"#f6f4ec"); g.addColorStop(.85,"#ffffff"); g.addColorStop(1,"#f1eee9");
  x.fillStyle=g; x.fillRect(0,0,W,H);
  // ince lif dokusu
  for(let i=0;i<5000;i++){ const a=R()*.05; x.fillStyle=`rgba(${R()<.5?"0,0,0":"255,255,255"},${a})`; x.fillRect(R()*W,R()*H,1,2+R()*6); }
  // damarlar: tabandan yelpaze gibi açılan ince çizgiler
  const N= kind==="ray"?14 : kind==="leaf"?9 : 28;
  for(let i=0;i<N;i++){
    const t=i/(N-1), endX= kind==="ray"? 8+t*(W-16) : W*.5+(t-.5)*W*1.05, mid=Math.abs(t-.5)<.03;
    x.strokeStyle=`rgba(60,50,40,${mid?.22:.06+R()*.07})`; x.lineWidth=mid?2.2:.8+R()*1.1;
    x.beginPath(); x.moveTo(W/2+(t-.5)*(kind==="ray"?W*.8:12),H);
    const cx=W/2+(t-.5)*W*(kind==="leaf"?.2:.7)+ (R()-.5)*10;
    if(kind==="leaf") x.quadraticCurveTo(cx, H*(.75-t*.0), endX, H*(.25+Math.abs(t-.5)*.6));
    else x.quadraticCurveTo(cx,H*.55,endX+(R()-.5)*8,0);
    x.stroke();
    if(kind!=="leaf" && kind!=="ray" && R()<.6){ // dallanma
      x.lineWidth=.6; x.strokeStyle="rgba(60,50,40,.05)"; x.beginPath(); const y0=H*(.3+R()*.4); x.moveTo(cx,y0); x.lineTo(cx+(R()-.5)*60,y0-90-R()*80); x.stroke(); }
  }
  if(kind==="leaf"){ x.strokeStyle="rgba(230,240,210,.5)"; x.lineWidth=3; x.beginPath(); x.moveTo(W/2,H); x.lineTo(W/2,0); x.stroke(); }
  // kenarlara doğru hafif koyulaşma
  const e=x.createLinearGradient(0,0,W,0); e.addColorStop(0,"rgba(0,0,0,.10)"); e.addColorStop(.18,"rgba(0,0,0,0)"); e.addColorStop(.82,"rgba(0,0,0,0)"); e.addColorStop(1,"rgba(0,0,0,.10)");
  x.fillStyle=e; x.fillRect(0,0,W,H);
  const T=new THREE.CanvasTexture(c); T.encoding=THREE.sRGBEncoding; T.anisotropy=4;
  return TEX[kind]=T;
}
function texKind(t){ return ["daisy","sunflower","gerbera","mum"].includes(t)?"ray": ["rose","peony","carnation","tulip"].includes(t)?"soft":"vein"; }

/* yumuşak, doğal ortam ışığı (gökyüzü + toprak yansıması) */
function envFor(renderer){
  const sc=new THREE.Scene(), geo=new THREE.SphereGeometry(10,32,16), cols=[];
  const top=new THREE.Color("#fdfcf6"), hor=new THREE.Color("#dfe9df"), bot=new THREE.Color("#7f957d");
  const pos=geo.attributes.position; for(let i=0;i<pos.count;i++){ const y=pos.getY(i)/10; const c=y>0?hor.clone().lerp(top,y):hor.clone().lerp(bot,-y); cols.push(c.r,c.g,c.b); }
  geo.setAttribute("color",new THREE.Float32BufferAttribute(cols,3));
  sc.add(new THREE.Mesh(geo,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide})));
  const win=new THREE.Mesh(new THREE.PlaneGeometry(6,4),new THREE.MeshBasicMaterial({color:0xffffff})); win.position.set(4,6,5); win.lookAt(0,0,0); sc.add(win);
  const pm=new THREE.PMREMGenerator(renderer); const rt=pm.fromScene(sc,.04); pm.dispose(); return rt.texture;
}

function whiteColors(g){ const n=g.attributes.position.count; g.setAttribute("color",new THREE.Float32BufferAttribute(new Array(n*3).fill(.9),3)); return g; }
class FlowerStage{
  constructor(host,opts={}){
    this.host=host; this.pivots=[]; this.bloom=1; this.bloomT=1; this.disposables=[];
    const r=this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:!!opts.still});
    r.setPixelRatio(opts.still?1.5:Math.min(devicePixelRatio,2)); r.outputEncoding=THREE.sRGBEncoding;
    r.toneMapping=THREE.ACESFilmicToneMapping; r.toneMappingExposure=1.05;
    r.shadowMap.enabled=true; r.shadowMap.type=THREE.PCFSoftShadowMap;
    if(host) host.prepend(r.domElement);
    this.scene=new THREE.Scene(); this.scene.environment=envFor(r);
    this.cam=new THREE.PerspectiveCamera(30,1,.1,50);
    this.camPos=new THREE.Vector3(0,.5,6.3); this.camGoal=this.camPos.clone(); this.look=new THREE.Vector3(0,-.45,0); this.lookGoal=this.look.clone();
    this.scene.add(new THREE.HemisphereLight(0xfffaf0,0x5d7a5f,.35));
    const d=new THREE.DirectionalLight(0xfff4e2,1.25); d.position.set(2.2,5,3.2); d.castShadow=true;
    d.shadow.mapSize.set(opts.still?1024:2048,opts.still?1024:2048); d.shadow.bias=-.0004; d.shadow.normalBias=.015; d.shadow.radius=4;
    Object.assign(d.shadow.camera,{left:-2.4,right:2.4,top:2.4,bottom:-4,near:.5,far:14}); this.scene.add(d);
    const back=new THREE.DirectionalLight(0xffe9f2,.55); back.position.set(-2.5,1.5,-3.5); this.scene.add(back); // arkadan ışık: yaprak kenarları parlar
    this.root=new THREE.Group(); this.scene.add(this.root);
    this.petalMat=new THREE.MeshPhysicalMaterial({color:0xffffff,vertexColors:true,side:THREE.DoubleSide,roughness:.62,metalness:0,map:petalTex("vein"),bumpMap:petalTex("vein"),bumpScale:.0025,sheen:new THREE.Color(.22,.2,.2),envMapIntensity:.6,emissiveIntensity:.07});
    this.leafTex=petalTex("leaf");
    this.goalColor=new THREE.Color(0xffffff);
    this.rotY=-.4; this.rotX=0; this.vel=0; this.drag=false; this.visible=true;
    if(opts.still){ this.visible=false; return; }
    this.bindPointer(); this.resize();
    new ResizeObserver(()=>this.resize()).observe(host);
    new IntersectionObserver(es=>{ this.visible=es[0].isIntersecting; if(this.visible) this.loop(); }).observe(host);
    this.clock=new THREE.Clock(); this.loop();
  }
  resize(){ const w=this.host.clientWidth,h=this.host.clientHeight||w; this.renderer.setSize(w,h,false); this.cam.aspect=w/h; this.cam.updateProjectionMatrix(); }
  bindPointer(){
    const c=this.renderer.domElement; let lx=0,ly=0;
    c.addEventListener("pointerdown",e=>{ this.drag=true; lx=e.clientX; ly=e.clientY; c.setPointerCapture(e.pointerId); });
    c.addEventListener("pointermove",e=>{ if(!this.drag) return; const dx=e.clientX-lx, dy=e.clientY-ly; lx=e.clientX; ly=e.clientY; this.vel=dx*.008; this.rotY+=this.vel; this.rotX=Math.max(-.6,Math.min(.9,this.rotX+dy*.006)); });
    const up=()=>{ this.drag=false; }; c.addEventListener("pointerup",up); c.addEventListener("pointercancel",up);
  }
  setView(v){
    const P={front:[[0,.5,6.3],[0,-.45,0]],top:[[0,5.2,1.6],[0,0,0]],close:[[0,.6,3.1],[0,.1,0]]}[v]||[[0,.5,6.3],[0,-.45,0]];
    this.camGoal.set(...P[0]); this.lookGoal.set(...P[1]);
  }
  clear(){
    this.root.remove(this.flower); this.disposables.forEach(x=>x.dispose&&x.dispose()); this.disposables=[]; this.pivots=[];
  }
  track(x){ this.disposables.push(x); return x; }
  mat(hex,extra){ return this.track(new THREE.MeshStandardMaterial(Object.assign({color:new THREE.Color(hex),roughness:.75,envMapIntensity:.5},extra||{}))); }

  whorl(parent,geo,mat,n,tiltDeg,off=0,y=0,r=0){
    for(let k=0;k<n;k++){
      const R=this.rnd, j=()=>R()*2-1;
      const phi=off+k*Math.PI*2/n + j()*Math.PI/n*.22, p=new THREE.Group(); p.rotation.order="YXZ"; p.rotation.y=phi;
      p.position.set(-Math.sin(phi)*r,y+j()*.01,-Math.cos(phi)*r);
      const m=new THREE.Mesh(geo,mat); m.scale.set(1+j()*.08,1+j()*.1,1+j()*.15); m.rotation.y=j()*.14; m.rotation.z=j()*.05;
      p.add(m); parent.add(p); this.pivots.push({o:p,tilt:THREE.MathUtils.degToRad(tiltDeg)+j()*.07});
    }
  }
  build(f,hex){
    if(this.flower) this.clear();
    const S=f.shape||{t:"daisy"}, t=S.t, F=this.flower=new THREE.Group(), head=new THREE.Group();
    this.rnd=rng(hashStr(f.id||f.name||"x"));
    const center=this.mat(safeHex(S.center,"#E2C04A"),{roughness:.9});
    const green=this.mat("#4F7A3E",{side:THREE.DoubleSide,map:this.leafTex,bumpMap:this.leafTex,bumpScale:.003,roughness:.55}), dkgreen=this.mat("#46703A",{roughness:.6});
    const pm=this.petalMat, tk=petalTex(texKind(t)); pm.map=tk; pm.bumpMap=tk; pm.needsUpdate=true;
    this.goalColor.set(safeHex(hex,"#ffffff")); pm.color.copy(this.goalColor); pm.emissive.copy(this.goalColor);
    let gs=0; const G=o=>this.track(petalGeo(Object.assign({seed:++gs},o)));
    let headScale=1, stemLen=3.1, face=.45;

    if(t!=="tree"){ // sap + yapraklar
      const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(0,-.02,0),new THREE.Vector3(.05,-1,.08),new THREE.Vector3(-.06,-2.1,0),new THREE.Vector3(.08,-stemLen,-.05)]);
      F.add(new THREE.Mesh(this.track(new THREE.TubeGeometry(curve,40,.035,8,false)),dkgreen));
      const lg=G({len:1.1,wid:.2,a:.6,b:1,cup:.25,curl:.25,su:12,sv:6});
      [[-1.5,.9],[-2.2,-2.2]].forEach(([y,phi])=>{ const p=new THREE.Group(); p.position.y=y; p.rotation.order="YXZ"; p.rotation.y=phi; p.rotation.x=-1.0; p.add(new THREE.Mesh(lg,green)); F.add(p); });
    }
    switch(t){
      case "lily":{
        const g=G({len:1.45,wid:.33,a:.6,b:1.1,cup:.35,curl:-.32});
        this.whorl(head,g,pm,3,72,0); this.whorl(head,g,pm,3,64,Math.PI/3,.03);
        const fil=this.track(new THREE.CylinderGeometry(.008,.008,.8,5)), anth=this.track(new THREE.SphereGeometry(.045,10,8));
        const am=this.mat("#9B4A23");
        for(let k=0;k<6;k++){ const p=new THREE.Group(); p.rotation.y=k*Math.PI/3; p.rotation.z=.32; const m=new THREE.Mesh(fil,green); m.position.y=.4; p.add(m); const a=new THREE.Mesh(anth,am); a.position.y=.82; a.scale.set(2.2,.8,.8); p.add(a); head.add(p); }
        const pis=new THREE.Mesh(this.track(new THREE.CylinderGeometry(.012,.012,.9,6)),green); pis.position.y=.45; head.add(pis);
        face=.55; break;}
      case "rose": case "peony":{
        const pe=t==="peony", L=pe?7:6;
        for(let l=0;l<L;l++){
          const g=G({len:(pe?.5:.42)+l*(pe?.12:.1),wid:(pe?.42:.34)+l*.06,a:.85,b:.45,cup:pe?.9:.75,curl:(pe?.35:.3)-l*.09,ruffle:pe?.35:.08});
          this.whorl(head,g,pm,pe?7:5,8+l*(pe?12.5:13.5),l*.7,0,.02*l);
        }
        const bud=new THREE.Mesh(this.track(whiteColors(new THREE.SphereGeometry(.13,16,12))),pm); bud.scale.set(1,1.3,1); bud.position.y=.12; head.add(bud);
        headScale=pe?.9:1.05; face=.5; break;}
      case "tulip":{
        const g=G({len:1.05,wid:.5,a:.9,b:.42,cup:.65,curl:.12});
        this.whorl(head,g,pm,3,15,0); this.whorl(head,g,pm,3,21,Math.PI/3,0,.02);
        face=.25; headScale=1.05; break;}
      case "orchid":{
        const se=G({len:1,wid:.36,a:.6,b:.9,cup:.15,curl:-.05}), pt=G({len:.85,wid:.55,a:.8,b:.45,cup:.1,curl:-.05});
        const lipM=this.track(pm.clone()); this.lipMat=lipM; lipM.color.set(safeHex(S.lip,"#8E2F5A"));
        this.whorl(head,se,pm,3,86,0); // üç çanak
        this.whorl(head,pt,pm,2,84,Math.PI/2); // iki taç
        const lip=G({len:.5,wid:.33,a:.7,b:.6,cup:.9,curl:.3}); const p=new THREE.Group(); p.rotation.order="YXZ"; p.rotation.y=Math.PI; p.add(new THREE.Mesh(lip,lipM)); head.add(p); this.pivots.push({o:p,tilt:THREE.MathUtils.degToRad(58)});
        const col=new THREE.Mesh(this.track(new THREE.SphereGeometry(.08,12,10)),center); col.position.set(0,.06,-.02); head.add(col);
        face=1.0; break;}
      case "daisy": case "gerbera": case "sunflower":{
        const sf=t==="sunflower", gb=t==="gerbera";
        const n=sf?21:gb?26:22, g=G({len:sf?.85:gb?.9:.85,wid:sf?.17:gb?.12:.1,a:sf?.55:.5,b:sf?1:.6,cup:.12,curl:-.06});
        this.whorl(head,g,pm,n,84,0,0,sf?.42:gb?.22:.16); this.whorl(head,g,pm,n,76,Math.PI/n,.01,sf?.4:gb?.2:.14);
        const cr=sf?.5:gb?.27:.2, disc=new THREE.Mesh(this.track(new THREE.SphereGeometry(cr,32,16)),center); disc.scale.y=sf?.28:.45; disc.position.y=.02; head.add(disc);
        { // phyllotaxis tohumları / tüp çiçekçikler
          const seed=this.track(new THREE.SphereGeometry(sf?.022:gb?.014:.016,6,5)), sm=this.mat(sf?"#2B1A0B":gb?"#C49A2A":"#E3A91C"), N=sf?240:gb?70:110;
          for(let i=0;i<N;i++){ const r=cr*.95*Math.sqrt(i/N), th=i*2.39996; const m=new THREE.Mesh(seed,sm); m.position.set(Math.cos(th)*r,.02+cr*(sf?.28:.45)*Math.sqrt(Math.max(0,1-(r/cr)**2)),Math.sin(th)*r); head.add(m); }
        }
        face=sf?.8:.7; headScale=sf?1.15:1; break;}
      case "carnation":{
        for(let l=0;l<4;l++){ const g=G({len:.5+l*.09,wid:.32,a:.8,b:.4,cup:.35,curl:.15-l*.08,ruffle:1.1}); this.whorl(head,g,pm,10,24+l*17,l*.5,0,.02*l); }
        const cal=new THREE.Mesh(this.track(new THREE.CylinderGeometry(.16,.06,.4,10)),green); cal.position.y=-.18; head.add(cal);
        face=.5; break;}
      case "mum":{
        for(let l=0;l<6;l++){ const g=G({len:.36+l*.09,wid:.085,a:.6,b:.6,cup:.55,curl:.42-l*.04}); this.whorl(head,g,pm,16,10+l*13,l*.4,0,.01*l); }
        face=.5; headScale=1.1; break;}
      case "violet":{
        const g=G({len:.42,wid:.32,a:.8,b:.45,cup:.12,curl:-.04}); this.whorl(head,g,pm,5,86,0);
        const c=new THREE.Mesh(this.track(new THREE.SphereGeometry(.07,10,8)),center); c.position.y=.04; head.add(c);
        face=.9; headScale=1.5; break;}
      case "narcissus":{
        const g=G({len:.72,wid:.32,a:.65,b:.75,cup:.1,curl:-.04}); this.whorl(head,g,pm,6,86,0);
        const pts=[]; for(let i=0;i<=12;i++){ const u=i/12; pts.push(new THREE.Vector2(.07+.14*u+.03*Math.sin(u*9)*u, u*.32)); }
        const cor=new THREE.Mesh(this.track(new THREE.LatheGeometry(pts,28)),this.mat(safeHex(S.center,"#F08A1C"),{side:THREE.DoubleSide})); head.add(cor);
        face=.95; headScale=1.15; break;}
      case "lavender": case "hyacinth":{
        const hy=t==="hyacinth", N=hy?30:46, H=hy?1.25:1.6;
        const fl=hy?G({len:.17,wid:.07,a:.6,b:.8,cup:.15,curl:-.2,su:8,sv:4}):this.track(whiteColors(new THREE.SphereGeometry(.055,8,6)));
        for(let i=0;i<N;i++){
          const y=(i/N)*H, th=i*2.39996, rr=(hy?.2:.07)*(1-.45*i/N);
          const g=new THREE.Group(); g.position.set(Math.cos(th)*rr,y,Math.sin(th)*rr);
          if(hy){ g.lookAt(Math.cos(th)*rr*3,y+.15,Math.sin(th)*rr*3); g.rotateX(Math.PI/2); this.whorl(g,fl,pm,6,62,0); }
          else { const m=new THREE.Mesh(fl,pm); m.scale.set(1,1.5,1); g.add(m); this.pivots.push({o:g,tilt:0,scale:true}); }
          head.add(g);
        }
        head.position.y=-.55; face=.08; break;}
      case "hydrangea":{
        const g=G({len:.17,wid:.13,a:.8,b:.45,cup:.12,curl:-.05,su:8,sv:4});
        for(let i=0;i<80;i++){
          const yy=1-(i/79)*1.25, r=Math.sqrt(Math.max(0,1-yy*yy)), th=i*2.39996, R=.62;
          const p=new THREE.Vector3(Math.cos(th)*r*R,yy*R,Math.sin(th)*r*R);
          const fg=new THREE.Group(); fg.position.copy(p); fg.lookAt(p.clone().multiplyScalar(2)); fg.rotateX(Math.PI/2);
          this.whorl(fg,g,pm,4,84,(i%4)*.3); head.add(fg);
        }
        head.position.y=.2; face=.2; break;}
      case "tree":{
        const bark=this.mat("#6B5843"), trunkC=new THREE.CatmullRomCurve3([new THREE.Vector3(0,-3,0),new THREE.Vector3(.18,-2,.05),new THREE.Vector3(-.12,-1.1,0),new THREE.Vector3(.05,-.3,0)]);
        F.add(new THREE.Mesh(this.track(new THREE.TubeGeometry(trunkC,40,.12,10,false)),bark));
        const pot=new THREE.Mesh(this.track(new THREE.CylinderGeometry(.55,.4,.7,32)),this.mat("#B9714E")); pot.position.y=-3.25; F.add(pot);
        const leaf=G({len:.32,wid:.05,a:.5,b:1,cup:.1,curl:.05,su:6,sv:3});
        const blobs=[[0,.1,0,.85],[.55,-.1,.2,.6],[-.55,-.05,-.1,.65],[.1,.55,-.2,.6],[-.2,-.35,.4,.55]];
        const olive=this.track(new THREE.SphereGeometry(.045,8,6)), om=this.mat("#3E4421");
        blobs.forEach(([x,y,z,r])=>{ for(let i=0;i<60;i++){ const u=Math.random()*2-1, th=Math.random()*Math.PI*2, rr=r*Math.cbrt(Math.random()); const p=new THREE.Vector3(x+Math.sqrt(1-u*u)*Math.cos(th)*rr,y+u*rr*.7,z+Math.sqrt(1-u*u)*Math.sin(th)*rr);
          const g=new THREE.Group(); g.position.copy(p); g.rotation.set(Math.random()*6,Math.random()*6,Math.random()*6); g.add(new THREE.Mesh(leaf,pm)); this.pivots.push({o:g,tilt:0,scale:true}); head.add(g);
          if(Math.random()<.08){ const o=new THREE.Mesh(olive,om); o.position.copy(p); head.add(o);} } });
        face=0; F.position.y=.35; F.scale.setScalar(.72); break;}
    }
    head.scale.setScalar(headScale); head.rotation.x=face; F.add(head);
    if(t==="lavender"||t==="hyacinth") { /* başak sapın ucunda */ }
    F.traverse(o=>{ if(o.isMesh){ o.castShadow=true; o.receiveShadow=true; } });
    this.root.add(F); this.head=head;
    this.bloom=reduced?1:0; this.bloomT=1; this.applyBloom();
  }
  setColor(hex){ this.goalColor.set(safeHex(hex,"#ffffff")); }
  still(f,hex,w=480,h=360){ // vitrin için tek kare önizleme
    this.renderer.setSize(w,h,false); this.cam.aspect=w/h; this.cam.updateProjectionMatrix();
    this.build(f,hex); this.bloom=1; this.applyBloom(); this.petalMat.emissive.copy(this.petalMat.color);
    this.root.rotation.set(.05,-.5,0); this.root.updateMatrixWorld(true);
    const bx=new THREE.Box3().setFromObject(this.head), c=bx.getCenter(new THREE.Vector3()), sz=bx.getSize(new THREE.Vector3());
    const span=Math.max(sz.y*1.5, sz.x/this.cam.aspect*1.25, .8), dist=span/2/Math.tan(THREE.MathUtils.degToRad(this.cam.fov/2));
    this.cam.position.set(c.x, c.y+span*.12, c.z+dist); this.cam.lookAt(c.x, c.y-span*.12, c.z);
    this.renderer.render(this.scene,this.cam); return this.renderer.domElement.toDataURL("image/webp",.86);
  }
  applyBloom(){
    const e=1-Math.pow(1-this.bloom,3);
    for(const p of this.pivots){ if(p.scale){ p.o.scale.setScalar(.2+.8*e); } else p.o.rotation.x=-(p.tilt*e*1.0 + .06*(1-e)); }
  }
  loop(){
    if(this._raf) return;
    const step=()=>{
      this._raf=null; if(!this.visible||this.paused) return;
      const dt=Math.min(.05,this.clock.getDelta()), t=this.clock.elapsedTime;
      if(this.bloom<this.bloomT){ this.bloom=Math.min(1,this.bloom+dt/1.6); this.applyBloom(); }
      this.petalMat.color.lerp(this.goalColor,.08); this.petalMat.emissive.copy(this.petalMat.color);
      if(!this.drag){ this.vel*=.94; this.rotY+=this.vel + (reduced?0:.0025); }
      this.root.rotation.y=this.rotY; this.root.rotation.x=this.rotX*.6 + (reduced?0:Math.sin(t*.7)*.015);
      this.camPos.lerp(this.camGoal,.07); this.look.lerp(this.lookGoal,.07);
      this.cam.position.copy(this.camPos); this.cam.lookAt(this.look);
      this.renderer.render(this.scene,this.cam);
      this._raf=requestAnimationFrame(step);
    };
    this._raf=requestAnimationFrame(step);
  }
}

/* =========================================================
   5. ALTYAPI — Supabase (oturum, veritabanı, fotoğraf) + kendi API'lerimiz
   ========================================================= */
const SB_URL="https://scsfclxgoxhogttmhazg.supabase.co";
const SB_KEY="sb_publishable_HsDfOyv7qiU9dW_y-xeR5g_Y-slgaqr"; // yayımlanabilir anahtar; yetkiyi veritabanı kuralları (RLS) belirler
const sb = window.supabase ? window.supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}) : null;
const PHOTO_BASE=SB_URL+"/storage/v1/object/public/product-photos/";
const PHOTO_RE=/^[0-9a-f-]{36}\/[0-9a-z-]{8,64}\.(webp|jpg|png)$/;
let session=null;
const uid=()=>session?.user?.id||null;

/* rehber bitkileri için fotoğraf aramasında kullanılan Latince ad ve Vikipedi başlığı */
const LOOKUP={zambak:["Lilium","Zambak"],gul:["Rosa","Gül"],lale:["Tulipa","Lale"],orkide:["Phalaenopsis","Orkide"],papatya:["Leucanthemum vulgare","Papatya"],
  aycicegi:["Helianthus annuus","Ayçiçeği"],lavanta:["Lavandula angustifolia","Lavanta"],karanfil:["Dianthus caryophyllus","Karanfil (çiçek)"],sumbul:["Hyacinthus orientalis","Sümbül"],
  nergis:["Narcissus","Nergis"],kasimpati:["Chrysanthemum morifolium","Kasımpatı"],ortanca:["Hydrangea macrophylla","Ortanca"],menekse:["Streptocarpus ionanthus","Afrika menekşesi"],
  gerbera:["Gerbera jamesonii","Gerbera"],sakayik:["Paeonia lactiflora","Şakayık"],zeytin:["Olea europaea","Zeytin"],monstera:["Monstera deliciosa","Deve tabanı"],pothos:["Epipremnum aureum","Epipremnum aureum"],pasakilici:["Dracaena trifasciata","Paşa kılıcı"],zz:["Zamioculcas zamiifolia","Zamioculcas"],aloe:["Aloe vera","Aloe vera"],kaktus:["Cactaceae","Kaktüs"],sukulent:["Echeveria","Echeveria"],barisicegi:["Spathiphyllum","Spathiphyllum"],ataturkcicegi:["Euphorbia pulcherrima","Atatürk çiçeği"],sardunya:["Pelargonium","Sardunya"],begonya:["Begonia","Begonya"],kaucuk:["Ficus elastica","Kauçuk ağacı"],benjamin:["Ficus benjamina","Ficus benjamina"],paraagaci:["Crassula ovata","Crassula ovata"],yukka:["Yucca elephantipes","Yukka"],difenbahya:["Dieffenbachia","Dieffenbachia"],antoryum:["Anthurium andraeanum","Anthurium"],kalanso:["Kalanchoe blossfeldiana","Kalanchoe blossfeldiana"],siklamen:["Cyclamen persicum","Sıklamen"],feslegen:["Ocimum basilicum","Fesleğen"],nane:["Mentha spicata","Nane"],biberiye:["Salvia rosmarinus","Biberiye"],yasemin:["Jasminum officinale","Yasemin"],begonvil:["Bougainvillea","Begonvil"]};
const MEDIA=new Map();
async function plantMedia(f){
  const [latin,tr]=LOOKUP[f.id]||[String(f.latin||"").replace(/\bspp?\.?$/,"").split(/[\/(]/)[0].trim().split(" ").slice(0,2).join(" "), f.name];
  if(!/^[A-Za-z][A-Za-z .×-]{1,59}$/.test(latin)) return {photos:[],wiki:null};
  const key=latin+"|"+tr;
  if(!MEDIA.has(key)) MEDIA.set(key, fetch(`/api/plant?latin=${encodeURIComponent(latin)}&tr=${encodeURIComponent(tr)}`).then(r=>r.ok?r.json():{photos:[]}).catch(()=>({photos:[]})));
  const d=await MEDIA.get(key);
  // sunucudan gelen veriyi de doğrula
  const photos=(Array.isArray(d.photos)?d.photos:[]).filter(p=>/^https:\/\//.test(p?.src)&&/^https:\/\//.test(p?.page)).slice(0,24)
    .map(p=>({src:p.src,thumb:/^https:\/\//.test(p.thumb)?p.thumb:p.src,author:clampStr(p.author,120)||"Bilinmiyor",license:clampStr(p.license,30),page:p.page,source:clampStr(p.source,30)}));
  const wiki=d.wiki&&typeof d.wiki.text==="string"?{text:clampStr(d.wiki.text,700),url:/^https:\/\/tr\.wikipedia\.org\//.test(d.wiki.url||"")?d.wiki.url:null}:null;
  return {photos,wiki};
}
async function aiCall(body){
  const r=await fetch("/api/ai",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});
  const d=await r.json().catch(()=>({}));
  if(!r.ok) throw {code:d.error||"unavailable"};
  return d;
}

/* =========================================================
   6. REHBER GÖRÜNÜMÜ
   ========================================================= */
let stage=null, current=null, currentColor=0;
const sheet=document.getElementById("sheet"), swatches=document.getElementById("swatches");
const stageHost=document.getElementById("stage");
/** 3B sahne ilk kez gerektiğinde kurulur. */
async function ensureStage(){
  if(stage) return stage;
  const ok=await loadThree();
  if(!ok){
    if(!stageHost.querySelector(".nogl")) stageHost.append(el("div",{class:"nogl",text:CAN_GL?"3B görünüm yüklenemedi; bağlantını kontrol et. Bakım bilgileri yine de yanda.":"Bu tarayıcı 3B görünümü desteklemiyor. Bakım bilgileri yine de yanda."}));
    return null;
  }
  if(stage) return stage;
  stage=new FlowerStage(stageHost);
  if(current) stage.build(current,current.colors[currentColor].hex);
  stage.visible=document.getElementById("v-rehber").classList.contains("on");
  stage.paused=viewMode==="photo";
  if(!stage.paused&&stage.visible) stage.loop();
  return stage;
}
document.querySelectorAll("#stage .views .chip").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll("#stage .views .chip").forEach(x=>x.setAttribute("aria-pressed",String(x===b))); stage&&stage.setView(b.dataset.view);
}));

const ICON={
  sun:on=>`<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="4.2" fill="${on?"#E9AE35":"none"}" stroke="#1D3A2A" stroke-width="1.4"/><g stroke="#1D3A2A" stroke-width="1.4" stroke-linecap="round"><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4"/></g></svg>`,
  drop:on=>`<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.5C7 7 5 9.6 5 12.4a5 5 0 0 0 10 0C15 9.6 13 7 10 2.5Z" fill="${on?"#6C9BD2":"none"}" stroke="#1D3A2A" stroke-width="1.4"/></svg>`,
  yes:`<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 18V9" stroke="#2E6B3F" stroke-width="1.8" stroke-linecap="round"/><path d="M10 10C10 6 7 3.5 3 3.5c0 4 3 6.5 7 6.5Z" fill="#6E9A5B"/><path d="M10 8c0-3.4 2.4-5.8 6.4-5.8 0 3.4-2.4 5.8-6.4 5.8Z" fill="#8DB574"/></svg>`,
  no:`<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#F3D9DE"/><path d="m6.8 6.8 6.4 6.4M13.2 6.8l-6.4 6.4" stroke="#9B2C3D" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  warn:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2 20h20L12 3Z" fill="#E9AE35" stroke="#1D3A2A" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 10v4.5" stroke="#1D3A2A" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17.2" r="1.1" fill="#1D3A2A"/></svg>`,
  paw:`<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="#2E6B3F"><ellipse cx="12" cy="15.5" rx="4.6" ry="3.8"/><circle cx="6" cy="10" r="2"/><circle cx="18" cy="10" r="2"/><circle cx="9.3" cy="6.3" r="2"/><circle cx="14.7" cy="6.3" r="2"/></g></svg>`
};
function gauge(kind,n){ const w=el("span",{class:"g","aria-label":`3 üzerinden ${n}`}); for(let i=1;i<=3;i++) w.append(svg(ICON[kind](i<=n))); return w; }

/* --- her bitkiye ayrı adres: /bitki/orkide?renk=pembe --- */
const slug=s=>norm(s).replace(/ /g,"-");
const SITE_TITLE="Sera Defteri";
const metaDesc=document.querySelector('meta[name="description"]'), canonical=document.querySelector('link[rel="canonical"]');
const DEFAULT_DESC=metaDesc?.content||"";
function plantPath(f,ci){ if(!f||f.ai||!BY_ID[f.id]) return "/"; return `/bitki/${f.id}`+(ci>0?`?renk=${encodeURIComponent(slug(f.colors[ci].n))}`:""); }
function plantFromUrl(){
  const m=location.pathname.match(/^\/bitki\/([a-z]+)\/?$/); const f=m&&BY_ID[m[1]];
  if(!f) return null;
  const rk=new URLSearchParams(location.search).get("renk")||"";
  return {f,ci:Math.max(0,f.colors.findIndex(c=>slug(c.n)===rk))};
}
const isAuthHash=()=>/access_token|refresh_token|error_description|type=(recovery|signup|magiclink)/.test(location.hash);
function syncUrl(mode){
  const path=plantPath(current,currentColor), now=location.pathname+location.search;
  if(mode!=="none"&&!isAuthHash()&&path!==now) history[mode==="push"?"pushState":"replaceState"](null,"",path);
  // başlık ve açıklama: paylaşılan bağlantıda ve arama motorunda bitkinin adı görünsün
  // başlık, adres çubuğundaki sayfaya göre (ana sayfada genel başlık kalır)
  if(current&&!current.ai&&location.pathname===`/bitki/${current.id}`){
    const c=current.colors[currentColor];
    document.title=`${currentColor>0?c.n+" ":""}${current.name} bakımı ve renklerin anlamı — ${SITE_TITLE}`;
    metaDesc&&(metaDesc.content=`${current.name} (${current.latin}): ${current.blurb} ${c.n} ${current.name.toLocaleLowerCase("tr")}: ${c.m}.`.slice(0,300));
    canonical&&(canonical.href=location.origin+`/bitki/${current.id}`);
  }else{ document.title=SITE_TITLE; metaDesc&&(metaDesc.content=DEFAULT_DESC); canonical&&(canonical.href=location.origin+"/"); }
}

function showFlower(f,colorIdx=0,{scroll=false,history:hist="push"}={}){
  current=f; currentColor=Math.max(0,Math.min(colorIdx,f.colors.length-1));
  syncUrl(hist);
  const col=f.colors[currentColor];
  stage&&stage.build(f,col.hex);
  // renkler (yan sütun)
  swatches.replaceChildren(...f.colors.map((c,i)=>el("button",{class:"sw","aria-pressed":String(i===currentColor),onclick:()=>pickColor(i)},el("span",{class:"c",style:`background:${safeHex(c.hex)}`}),c.n)));
  const C=f.care, inGuide=!!BY_ID[f.id];
  const isSafe=/zehirsiz/i.test(f.toxic);
  // büyük fotoğrafın üstündeki ad
  document.getElementById("heroname").replaceChildren(...nodes(
    el("span",{class:"kind"},f.kind),el("h2",{text:f.name}),el("p",{class:"latin",text:f.latin}),
    f.ai?el("span",{class:"ai-badge",text:"Yapay zekâ kartı — doğrulayın"}):null,
    f.enc?el("span",{class:"ai-badge",text:"Ansiklopedi kartı"}):null));
  const careCard=(icon,label,lvl,text)=>text&&text!=="—"?el("div",{class:"care-card"},
    el("div",{class:"cc-top"},icon?svg(icon):null,el("b",{text:label}),lvl?gauge(lvl[0],lvl[1]):null),el("p",{text})):null;
  sheet.replaceChildren(...nodes(
    el("p",{class:"blurb",text:f.blurb}),
    el("div",{class:"wiki",id:"wiki"}),
    f.enc?null:el("section",{class:"block"},el("h3",{text:"Bakım"}),
      el("div",{class:"care-grid"},
        careCard(null,"Işık",["sun",C.light[0]],C.light[1]),
        careCard(null,"Su",["drop",C.water[0]],C.water[1]),
        careCard(CARE_ICON.soil,"Toprak",null,C.soil),
        careCard(CARE_ICON.temp,"Sıcaklık",null,C.temp),
        careCard(CARE_ICON.hum,"Nem",null,C.humidity),
        careCard(CARE_ICON.feed,"Besin",null,C.feed))),
    SEASONS[f.id]?el("div",{class:"season"},el("b",{text:`Bu mevsim · ${SEASON_NAMES[seasonOf()]}`}),el("p",{text:SEASONS[f.id][seasonOf()]})):null,
    f.enc?null:el("div",{class:"diag-cta"},el("span",{text:"Yaprakları sararıyor, çiçek açmıyor ya da böcek mi var?"}),el("button",{type:"button",class:"btn ghost",onclick:()=>openDiagnosis(f)},"Bitkinde bir sorun mu var?")),
    f.good?.length||f.bad?.length?el("div",{class:"twin"},
      el("div",null,el("h3",{text:"Ona iyi gelenler"}),el("ul",null,f.good.map(g=>el("li",null,svg(ICON.yes),g)))),
      el("div",null,el("h3",{text:"Ondan uzak tut"}),el("ul",null,f.bad.map(g=>el("li",null,svg(ICON.no),g))))):null,
    healthBlock(f),
    el("div",{id:"infoblocks"}), // API: hastalık ve zararlılar, botanik kimlik, Vikipedi bölümleri
    f.enc?null:askBox(f)
  ));
  // yan sütun: zehirlilik, bitkilerim, paylaş
  document.getElementById("sideextra").replaceChildren(...nodes(
    f.toxic&&f.toxic!=="—"?el("div",{class:"toxic"+(isSafe?" safe":"")},svg(isSafe?ICON.paw:ICON.warn),el("div",null,el("b",{text:"Evcil hayvanlar: "}),f.toxic)):null,
    el("div",{class:"side-acts"},inGuide?myPlantButton(f):null,inGuide?shareButton():null)));
  chose3d=false; renderMeaning(); loadMedia(f); loadInfo(f);
  if(scroll) document.querySelector(".hero").scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"});
}
const CARE_ICON={
  soil:`<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2 12h16v5H2z" fill="#B88B5A"/><path d="M10 12V5" stroke="#2E6B3F" stroke-width="1.6" stroke-linecap="round"/><path d="M10 7c0-2.5-2-4-4.5-4 0 2.5 2 4 4.5 4Z" fill="#6E9A5B"/></svg>`,
  temp:`<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 3.5a2 2 0 0 1 4 0v8.2a4 4 0 1 1-4 0Z" fill="none" stroke="#1D3A2A" stroke-width="1.4"/><circle cx="10" cy="14.5" r="2" fill="#D46F8C"/><path d="M10 13V7" stroke="#D46F8C" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  hum:`<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3c-2 3-3 4.6-3 6.2a3 3 0 0 0 6 0C9 7.6 8 6 6 3Zm8 4c-2 3-3 4.6-3 6.2a3 3 0 0 0 6 0C17 11.6 16 10 14 7Z" fill="#9CC0E3" stroke="#1D3A2A" stroke-width="1.1"/></svg>`,
  feed:`<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 8h10l-1 9H6Z" fill="#E9AE35" stroke="#1D3A2A" stroke-width="1.2" stroke-linejoin="round"/><path d="M7 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="#1D3A2A" stroke-width="1.2"/></svg>`
};
/* sağlık ve kullanım: el yazımı notlar (16 bitki) — Vikipedi bölümleri loadInfo ile altına eklenir */
const LEVEL_TEXT={"güçlü":"Bilimsel kanıt: güçlü","sınırlı":"Bilimsel kanıt: sınırlı","yok":"Bilimsel kanıt: yok"};

/* Nerede yetişir: ev içi, balkon/teras, bahçe, hediye (kesme ya da saksı hediyelik) — "Bana uygun bitki bul" için */
const PLACES={zambak:["balkon","bahce","hediye"],gul:["balkon","bahce","hediye"],lale:["balkon","bahce","hediye"],orkide:["ev","hediye"],
  papatya:["balkon","bahce","hediye"],aycicegi:["balkon","bahce","hediye"],lavanta:["balkon","bahce"],karanfil:["balkon","bahce","hediye"],
  sumbul:["ev","balkon","bahce"],nergis:["balkon","bahce"],kasimpati:["ev","balkon","bahce","hediye"],ortanca:["balkon","bahce"],
  menekse:["ev","hediye"],gerbera:["ev","balkon","hediye"],sakayik:["bahce","hediye"],zeytin:["balkon","bahce"],monstera:["ev"],pothos:["ev"],pasakilici:["ev","balkon"],zz:["ev"],aloe:["ev","balkon"],kaktus:["ev","balkon"],sukulent:["ev","balkon"],barisicegi:["ev","hediye"],ataturkcicegi:["ev","hediye"],sardunya:["balkon","bahce"],begonya:["ev","balkon","hediye"],kaucuk:["ev"],benjamin:["ev"],paraagaci:["ev","balkon","hediye"],yukka:["ev","balkon"],difenbahya:["ev"],antoryum:["ev","hediye"],kalanso:["ev","balkon","hediye"],siklamen:["ev","balkon","hediye"],feslegen:["ev","balkon","bahce"],nane:["ev","balkon","bahce"],biberiye:["balkon","bahce"],yasemin:["balkon","bahce"],begonvil:["balkon","bahce"]};
const isPetSafe=f=>!!f&&/zehirsiz/i.test(f.toxic||"");
const BULBS=["zambak","lale","sumbul","nergis"];

/* Sorun teşhisi: belirti -> ayrıntı -> olası neden + ne yapmalı. Genel bahçecilik bilgisidir. */
const DIAG=[
  {id:"sari",t:"Yapraklar sararıyor",q:"Hangisi daha çok uyuyor?",opts:[
    {t:"Alttaki yaşlı yapraklar sararıyor, toprak hep nemli",cause:"Fazla sulama; kökler havasız kalıyor",steps:["Toprağın üst 2–3 cm'si kuruyana kadar sulama.","Saksının altında delik olduğundan ve tabakta su beklemediğinden emin ol.","Toprak kokuyorsa ya da kökler kahverengi ve yumuşaksa bitkiyi çıkar, çürük kökleri kes, süzek toprağa al."]},
    {t:"Yapraklar sararıp kuruyor, toprak kupkuru",cause:"Susuzluk",steps:["Suyu alttan akana kadar derin sula; toprak çok kuruysa saksıyı 15–20 dakika su dolu bir kaba otur.","Sonra toprak üstten kuruyunca sula; az az ama sık sulama kökleri yüzeyde tutar."]},
    {t:"Yeni yapraklar sarı ama damarları yeşil",cause:"Demir eksikliği (çoğunlukla kireçli su ya da toprak)",steps:["Mümkünse yağmur suyu ya da bir gün bekletilmiş su kullan.","Şelatlı demir içeren bir gübre ver.","Asit seven bitkilerde (ortanca vb.) asidik toprak kullan."]},
    {t:"Bütün bitki soluk, uzun süredir gübre almadı",cause:"Besin (özellikle azot) eksikliği",steps:["Büyüme döneminde (ilkbahar–yaz) etiketteki dozun yarısıyla 2–4 haftada bir sıvı gübre ver.","Kışın gübrelemeyi azalt ya da bırak.","Toprak iki yıldan uzun süredir değişmediyse taze toprağa al."]},
    {t:"Yerini değiştirdikten sonra birden sarardı",cause:"Taşınma stresi",steps:["Bitkiyi yeni yerinde bırak; sürekli yer değiştirmek stresi artırır.","Kalorifer, klima ve cereyandan uzak tut.","Birkaç hafta gübre verme; yeni yapraklar sağlıklı gelirse sorun geçmiştir."]}]},
  {id:"uc",t:"Yaprak uçları ya da kenarları kahverengi",q:"Hangisi daha çok uyuyor?",opts:[
    {t:"Uçlar kuru ve gevrek, oda havası kuru",cause:"Düşük nem",steps:["Kaloriferden uzaklaştır.","Saksıyı ıslak çakıl dolu bir tabağa koy ya da bitkileri bir araya topla.","Kahverengi uçları, sağlıklı dokuya dokunmadan makasla düzelt."]},
    {t:"Toprağın yüzeyinde beyaz bir kabuk var",cause:"Tuz ve gübre birikimi",steps:["Saksıdan bol su geçirerek toprağı yıka (alttan akana kadar, birkaç kez).","Gübre dozunu azalt.","Beyaz kabuk tutmuş üst toprağı kazıyıp tazesiyle değiştir."]},
    {t:"Kenarlarda kahverengi lekeler, güneşli pencerede duruyor",cause:"Güneş yanığı",steps:["Öğle güneşinden koru; tül perde arkasına al.","Yanık yapraklar düzelmez; bitki yeni yaprak verince onları kesebilirsin."]}]},
  {id:"beyaz",t:"Yapraklarda beyaz toz ya da pamuk",q:"Neye benziyor?",opts:[
    {t:"Un serpilmiş gibi beyaz toz, parmakla siliniyor",cause:"Külleme (mantar hastalığı)",steps:["Hastalıklı yaprakları al ve çöpe at (kompost yapma).","Hava dolaşımını artır; yaprakları ıslatmadan, sabah sula.","Yayılıyorsa kükürtlü ya da potasyum bikarbonatlı bir bitki koruma ürünü kullan."]},
    {t:"Yaprak koltuklarında beyaz, pamuksu kümeler",cause:"Unlu bit",steps:["Bitkiyi diğerlerinden ayır.","Kümeleri alkole batırılmış pamuklu çubukla tek tek sil.","Birkaç gün arayla tekrarla; gerekirse arap sabunlu su ya da neem yağı püskürt."]},
    {t:"İnce ağlar ve yapraklarda minik noktalar",cause:"Kırmızı örümcek (akar)",steps:["Yaprakları, özellikle altlarını ılık suyla duşla.","Nemi artır; akarlar kuru havayı sever.","Arap sabunlu su ya da akarlara karşı bir ürünü birkaç kez uygula."]}]},
  {id:"bocek",t:"Yapraklar yapışkan ya da küçük böcekler var",q:"Hangisini görüyorsun?",opts:[
    {t:"Filiz uçlarında yeşil ya da siyah minik böcek kümeleri",cause:"Yaprak biti",steps:["Tazyikli suyla yıka ya da elle temizle.","Arap sabunlu su (1 litre suya 1 yemek kaşığı) püskürt; birkaç gün arayla tekrarla.","Bahçede uğur böceği gibi doğal düşmanlar varsa ilaçtan kaçın."]},
    {t:"Dokununca havalanan minik beyaz sinekler",cause:"Beyaz sinek",steps:["Sarı yapışkan tuzak as.","Yaprak altlarını arap sabunlu suyla yıka.","Yoğun durumda bitkiyi diğerlerinden ayır."]},
    {t:"Toprağın üstünde uçuşan küçük siyah sinekler",cause:"Mantar sineği (fazla nemli toprak)",steps:["Toprağın üstü iyice kurusun; sulamayı seyrelt.","Sarı yapışkan tuzak as.","Üst toprağı ince bir kum ya da çakıl tabakasıyla kapat."]}]},
  {id:"cicek",t:"Çiçek açmıyor",q:"Hangisi daha çok uyuyor?",opts:[
    {t:"Bitki sağlıklı, yaprak veriyor ama çiçek yok",cause:"Yetersiz ışık ya da fazla azotlu gübre",steps:["Daha aydınlık bir yere al; çoğu çiçekli bitki günde en az 4–6 saat parlak ışık ister.","Fosfor ve potasyumu yüksek bir çiçek gübresi kullan; azotlu gübreyi azalt."]},
    {t:"Soğanlı bir bitki, geçen yıl açmıştı",cause:"Soğan güç toplayamadı ya da soğuk dönem eksik",steps:["Çiçek sonrası yaprakları kendiliğinden sararana kadar kesme; soğan bu sürede beslenir.","Lale, sümbül, nergis gibi soğanlılar çiçek için birkaç hafta soğuk (yaklaşık 10 °C altı) ister.","Kalabalıklaşan öbekleri sonbaharda ayır."]},
    {t:"Yanlış zamanda budamış olabilirim",cause:"Çiçek tomurcukları budamayla gitti",steps:["Bazı bitkiler (ör. çoğu ortanca) geçen yılın dalında çiçek açar; bunları çiçeklenme biter bitmez buda.","Bu yıl yalnızca kurumuş dalları al; bir sonraki sezon çiçek gelir."]}]},
  {id:"sarkik",t:"Bitki sarkık, solgun",q:"Toprak nasıl?",opts:[
    {t:"Toprak kuru",cause:"Susuzluk",steps:["Derin sula; çoğu bitki birkaç saat içinde toparlanır.","Sıcak havada sabah erken ya da akşam sula."]},
    {t:"Toprak ıslak ama bitki yine de sarkık",cause:"Kök çürümesi",steps:["Sulamayı hemen kes.","Bitkiyi saksıdan çıkar; kahverengi, yumuşak, kötü kokan kökleri kes.","Temiz bir saksıda süzek, kuru toprağa dik; birkaç gün sulama."]},
    {t:"Sıcak bir günden sonra oldu",cause:"Sıcak stresi",steps:["Öğle saatlerinde gölgeye al.","Toprağı nemli tut ama tabakta su bırakma; akşam serinleyince toparlanır."]}]},
  {id:"dokulme",t:"Yapraklar dökülüyor",q:"Ne zaman başladı?",opts:[
    {t:"Yeni aldım ya da yerini değiştirdim",cause:"Uyum stresi",steps:["Yerini sabit tut, birkaç hafta bekle.","Fazla sulayarak telafi etmeye çalışma."]},
    {t:"Soğuk cam, kapı ya da klimanın yanında duruyor",cause:"Soğuk hava akımı ya da ani sıcaklık değişimi",steps:["Cereyandan ve soğuk camdan uzaklaştır.","Gece sıcaklığının bitkinin istediği aralıkta kaldığından emin ol."]},
    {t:"Kışın, ışık azken",cause:"Işık azlığı",steps:["En aydınlık pencereye taşı.","Kışın sulama ve gübreyi azalt; bitki yavaşlar."]}]},
  {id:"curuk",t:"Gövde dibi kararmış, yumuşak",q:null,opts:[
    {t:"Gövde dibi kararmış, yumuşak",cause:"Gövde ya da kök çürümesi (çoğunlukla fazla su)",steps:["Sulamayı kes.","Çürük kısmı, sağlam dokuya kadar temiz ve dezenfekte edilmiş bir bıçakla kes.","Kurtarılamıyorsa sağlıklı bir dalından çelik alarak bitkiyi yeniden üret.","Bir dahaki sefere süzek toprak ve delikli saksı kullan."]}]}
];
/* bitkiye özel not (varsa) */
function diagNote(did,oi,f){
  const id=f?.id; if(!id) return null;
  if(did==="sari"&&BULBS.includes(id)) return "Soğanlılarda çiçeklenmeden sonra yaprakların sararması doğaldır; yaprakları kendiliğinden kuruyana kadar kesme.";
  if(did==="sari"&&oi===2&&id==="ortanca") return "Ortanca kireçli suya çok hassastır; demir eksikliği en çok onda görülür.";
  if(did==="cicek"&&id==="orkide") return "Orkidede yeni çiçek dalı için gece sıcaklığının birkaç hafta 15–18 °C'ye düşmesi gerekir.";
  if(did==="cicek"&&id==="ortanca") return "Çoğu ortanca geçen yılın dalında çiçek açar; sonbaharda ya da ilkbaharda sert budama çiçeği götürür.";
  if(did==="cicek"&&BULBS.includes(id)) return "Bu bitki çiçek açmak için soğuk bir dönem ister.";
  if(did==="sarkik"&&oi===1&&(id==="lavanta"||id==="zeytin")) return "Bu bitki kuraklığı sever; en sık ölüm nedeni fazla sulamadır.";
  if(did==="uc"&&oi===0&&(id==="orkide"||id==="menekse")) return "Bu bitki nemli havayı sever; kışın kalorifer havası yaprak uçlarını kurutur.";
  if(did==="beyaz"&&oi===0&&["gul","sakayik","ortanca","kasimpati"].includes(id)) return "Bu bitkide külleme sık görülür; yapraklar arasında hava dolaşsın.";
  return null;
}
function healthBlock(f){
  const h=HEALTH[f.id];
  return el("section",{class:"block health",id:"health",hidden:!h},
    el("h3",{text:"Sağlık ve kullanım"}),
    h?el("div",null,
      el("ul",{class:"uses"},...h.uses.map(u=>el("li",{text:u}))),
      el("p",{class:"evidence"},el("span",{class:"lvl lvl-"+(h.level==="güçlü"?"hi":h.level==="sınırlı"?"mid":"no"),text:LEVEL_TEXT[h.level]})," ",h.note),
      el("div",{class:"caution"},svg(ICON.warn),el("p",null,el("b",{text:"Dikkat: "}),h.caution))):null,
    el("div",{id:"wikiuses"}),
    el("p",{class:"disclaimer",text:"Bilgi amaçlıdır, tıbbi tavsiye değildir. Hiçbir bitkiyi doktora ya da eczacıya danışmadan ilaç olarak kullanma; hamileysen, emziriyorsan, çocuklarda ya da düzenli ilaç kullanıyorsan özellikle dikkat et."}));
}
/* API'den ek bilgi: botanik kimlik, Vikipedi'nin kullanım / zehirlilik / hastalık bölümleri */
const INFO=new Map(); let infoToken=0;
async function loadInfo(f){
  const tok=++infoToken, box=document.getElementById("infoblocks"), usesBox=document.getElementById("wikiuses");
  const [latin,tr]=LOOKUP[f.id]||[String(f.latin||"").replace(/\bspp?\.?$/,"").split(/[\/(]/)[0].trim().split(" ").slice(0,2).join(" "),f.name];
  if(!/^[A-Za-z][A-Za-z .×-]{1,59}$/.test(latin)) return;
  const key=latin+"|"+tr;
  if(!INFO.has(key)) INFO.set(key,fetch(`/api/info?latin=${encodeURIComponent(latin)}&tr=${encodeURIComponent(tr)}`).then(r=>r.ok?r.json():null).catch(()=>null));
  const d=await INFO.get(key); if(tok!==infoToken||!d||!box) return;
  const okUrl=u=>/^https:\/\/([a-z]{2}\.wikipedia\.org|www\.wikidata\.org|www\.gbif\.org)\//.test(u||"")?u:null;
  const secs=(Array.isArray(d.sections)?d.sections:[]).filter(s=>["uses","toxicity","pests"].includes(s.kind)&&["tr","en"].includes(s.lang)).map(s=>({...s,title:clampStr(s.title,80),text:clampML(s.text,1000),url:okUrl(s.url)}));
  const secEl=s=>el("details",{class:"wsec"},
    el("summary",null,s.lang==="en"?`${s.title} (İngilizce Vikipedi)`:`${s.title} (Vikipedi)`),
    ...s.text.split("\n").map(t=>el("p",{text:t})),
    el("p",{class:"muted"},s.url?el("a",{href:s.url,target:"_blank",rel:"noopener noreferrer"},"Kaynağın tamamı (CC BY-SA)"):null,
      s.lang==="en"?" · Bu bölümün Türkçesi Vikipedi'de yok; çeviri için yapay zekâ özelliği açılınca otomatik çevrilecek.":""));
  const uses=secs.filter(s=>s.kind!=="pests"), pests=secs.filter(s=>s.kind==="pests");
  if(usesBox&&uses.length){ document.getElementById("health").hidden=false; } if(usesBox&&uses.length) usesBox.replaceChildren(el("p",{class:"muted small",text:"Vikipedi'den daha fazlası:"}),...uses.map(secEl));
  const facts=[["Familya",clampStr(d.family,60)],["Cins",clampStr(d.genus,60)],["Türkçe adları",(Array.isArray(d.names)?d.names:[]).map(n=>clampStr(n,40)).filter(Boolean).join(", ")],
    ["Koruma durumu (IUCN)",clampStr(d.iucn,60)],["Türkiye'deki gözlem kaydı",Number.isFinite(d.trCount)?`${new Intl.NumberFormat("tr-TR").format(d.trCount)} kayıt (GBIF)`:""]].filter(([,v])=>v);
  box.replaceChildren(...nodes(
    pests.length?el("section",{class:"block"},el("h3",{text:"Hastalık ve zararlılar"}),...pests.map(secEl)):null,
    facts.length?el("section",{class:"block"},el("h3",{text:"Botanik kimlik"}),
      el("dl",{class:"facts"},...facts.flatMap(([k,v])=>[el("dt",{text:k}),el("dd",{text:v})])),
      el("p",{class:"muted small"},"Kaynak: ",
        okUrl(d.gbifUrl)?el("a",{href:d.gbifUrl,target:"_blank",rel:"noopener noreferrer"},"GBIF"):"GBIF",
        okUrl(d.wikidataUrl)?[" · ",el("a",{href:d.wikidataUrl,target:"_blank",rel:"noopener noreferrer"},"Wikidata")]:null)):null));
}
function renderMeaning(){
  const m=document.getElementById("meaning"); if(!m||!current) return;
  const c=current.colors[currentColor];
  m.replaceChildren(el("b",{text:`${c.n} ${current.name.toLocaleLowerCase("tr")}`})," — ",c.m+".");
  m.style.background=`color-mix(in srgb, ${safeHex(c.hex)} 22%, #F4F7F2)`;
  renderRelated();
}
/* aynı renk ailesinden başka çiçekler: "Pembe" seçiliyse pembe lale, pembe karanfil… */
function renderRelated(){
  const box=document.getElementById("related"); if(!box||!current) return;
  const fam=familyOf(current.colors[currentColor].n);
  const hits=FLOWERS.filter(f=>f.id!==current.id&&(!petMode||isPetSafe(f))).map(f=>({f,i:f.colors.findIndex(c=>familyOf(c.n)===fam)})).filter(x=>x.i>=0).slice(0,6);
  if(!hits.length||fam==="Diğer"){ box.replaceChildren(); return; }
  box.replaceChildren(el("span",{class:"muted",text:`${fam} renkte başka çiçekler: `}),
    ...hits.map(({f,i})=>el("a",{class:"chip",href:plantPath(f,i),onclick:e=>{ e.preventDefault(); showFlower(f,i,{scroll:true}); }},
      el("i",{style:`background:${safeHex(f.colors[i].hex)}`}),f.name)));
}
/* bitkiyi paylaş: telefonda paylaşım menüsü, masaüstünde bağlantıyı kopyalar */
function shareButton(){
  const b=el("button",{type:"button",class:"btn ghost share",onclick:async()=>{
    const url=location.origin+plantPath(current,currentColor), c=current.colors[currentColor];
    const title=`${c.n} ${current.name.toLocaleLowerCase("tr")} — ${c.m}`;
    try{
      if(navigator.share){ await navigator.share({title,text:`${title} · Sera Defteri`,url}); return; }
      await navigator.clipboard.writeText(url); b.textContent="Bağlantı kopyalandı"; setTimeout(()=>{ b.textContent="Paylaş"; },2000);
    }catch(_){}
  }},"Paylaş");
  return b;
}
function pickColor(i){
  currentColor=i; swatches.querySelectorAll(".sw").forEach((b,k)=>b.setAttribute("aria-pressed",String(k===i)));
  stage&&stage.setColor(current.colors[i].hex); renderMeaning(); syncUrl("replace"); if(viewMode==="photo"){ chose3d=true; setMode("3d"); }
}

/* --- gerçek fotoğraflar (iNaturalist / Wikimedia Commons) + Vikipedi özeti --- */
let viewMode="photo", mediaToken=0, curPhotos=[], curPhoto=0;
const photoBox=document.getElementById("photo"), photoImg=document.getElementById("photoimg"), credit=document.getElementById("credit"), gallery=document.getElementById("gallery");
function setMode(m){
  viewMode=m;
  document.querySelectorAll("#stage .modes .chip").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.mode===m)));
  photoBox.hidden = m!=="photo";
  document.querySelector("#stage .views").hidden = m==="photo";
  document.querySelector("#stage .hint").hidden = m==="photo";
  if(stage){ stage.paused = m==="photo"; if(!stage.paused) stage.loop(); }
  else if(m==="3d") ensureStage().then(s=>{ if(s&&viewMode==="3d"){ s.paused=false; s.resize(); s.loop(); } });
  stageHost.classList.toggle("is3d",m==="3d"); // 3B'de ad koyu renkle yazılır
  document.querySelectorAll("#mosaic button[data-k]").forEach(b=>b.setAttribute("aria-pressed",String(m==="photo"&&b.dataset.k===String(curPhoto))));
}
let chose3d=false; // kullanıcı bu bitkide 3B'yi kendisi seçtiyse geç gelen fotoğraflar onu geri çevirmez
document.querySelectorAll("#stage .modes .chip").forEach(b=>b.addEventListener("click",()=>{ if(b.dataset.mode==="photo"&&!curPhotos.length) return; chose3d=b.dataset.mode==="3d"; setMode(b.dataset.mode); }));
photoImg.addEventListener("load",()=>photoImg.classList.add("in"));
function preparePhoto(i){
  const p=curPhotos[i]; if(!p) return false; curPhoto=i;
  photoImg.classList.remove("in"); photoImg.src=p.src; photoImg.alt=`${current.name} fotoğrafı`;
  credit.replaceChildren("Fotoğraf: ",p.author,` · ${p.license} · `,el("a",{href:p.page,target:"_blank",rel:"noopener noreferrer"},p.source));
  return true;
}
function showPhoto(i){ if(preparePhoto(i)){ chose3d=false; setMode("photo"); } }
const mosaic=document.getElementById("mosaic"), heroBox=document.querySelector(".hero"), photosNote=document.getElementById("photosnote");
async function loadMedia(f){
  const tok=++mediaToken; curPhotos=[];
  heroBox.classList.add("loading"); mosaic.replaceChildren(...[0,1,2,3].map(()=>el("span",{class:"tile ph-skel"})));
  gallery.replaceChildren(el("p",{class:"muted",text:"Fotoğraflar yükleniyor…"})); photosNote.textContent="";
  const m=await plantMedia(f); if(tok!==mediaToken) return;
  heroBox.classList.remove("loading");
  curPhotos=m.photos;
  const w=document.getElementById("wiki");
  if(w && m.wiki && !f.enc) w.replaceChildren(el("p",{text:m.wiki.text}), m.wiki.url?el("a",{href:m.wiki.url,target:"_blank",rel:"noopener noreferrer",class:"muted"},"Vikipedi’de devamını oku (CC BY-SA)"):null);
  heroBox.classList.toggle("single",curPhotos.length<2);
  if(!curPhotos.length){
    mosaic.replaceChildren(); credit.textContent="";
    gallery.replaceChildren(el("p",{class:"muted",text:"Bu bitki için açık lisanslı fotoğraf bulunamadı; yukarıda 3B görünüm gösteriliyor."}));
    setMode("3d"); return;
  }
  // büyük fotoğrafın yanında 4'lü mozaik; sonuncusunda "+N fotoğraf"
  const rest=curPhotos.length-5;
  mosaic.replaceChildren(...curPhotos.slice(1,5).map((p,k)=>{ const i=k+1, last=k===3&&rest>0;
    return el("button",{class:"tile","data-k":String(i),"aria-label":last?`Bütün fotoğraflar (${curPhotos.length})`:`Fotoğraf ${i+1}: ${p.author}`,
      onclick:()=>last?openLightbox(i):showPhoto(i)},el("img",{src:p.thumb,alt:"",loading:"lazy"}),last?el("span",{class:"more",text:`+${rest+1} fotoğraf`}):null); }));
  // bütün fotoğraflar: duvar düzeni, her birinin altında sahibi ve lisansı
  photosNote.textContent=`${curPhotos.length} açık lisanslı fotoğraf · iNaturalist ve Wikimedia Commons katılımcılarından`;
  gallery.replaceChildren(...curPhotos.map((p,i)=>el("figure",{class:"mitem"},
    el("button",{type:"button","aria-label":`Fotoğraf ${i+1}, büyüt`,onclick:()=>openLightbox(i)},el("img",{src:p.thumb,alt:`${f.name} fotoğrafı ${i+1}`,loading:"lazy"})),
    el("figcaption",null,`${p.author} · ${p.license} · `,el("a",{href:p.page,target:"_blank",rel:"noopener noreferrer"},p.source)))));
  if(chose3d&&viewMode==="3d"){ preparePhoto(0); setMode("3d"); } else showPhoto(0);
}

/* --- tam ekran galeri: büyük fotoğraf, önceki/sonraki, ok tuşları, her fotoğrafta atıf --- */
const lightbox=document.getElementById("lightbox");
function openLightbox(start=0){
  if(!curPhotos.length) return;
  let i=Math.max(0,Math.min(start,curPhotos.length-1));
  const img=el("img",{alt:""}), cap=el("p",{class:"lb-cap"}), count=el("span",{class:"lb-count"});
  const grid=el("div",{class:"lb-grid",role:"group","aria-label":"Küçük resimler"});
  const go=k=>{
    i=(k+curPhotos.length)%curPhotos.length; const p=curPhotos[i]; lightbox.dataset.i=String(i);
    img.src=p.src; img.alt=`${current.name} fotoğrafı ${i+1}`;
    cap.replaceChildren("Fotoğraf: ",p.author,` · ${p.license} · `,el("a",{href:p.page,target:"_blank",rel:"noopener noreferrer"},p.source));
    count.textContent=`${i+1} / ${curPhotos.length}`;
    [...grid.children].forEach((b,j)=>b.setAttribute("aria-current",j===i?"true":"false"));
    grid.children[i]?.scrollIntoView({block:"nearest",inline:"nearest"});
  };
  curPhotos.forEach((p,j)=>grid.append(el("button",{type:"button","aria-label":`Fotoğraf ${j+1}`,onclick:()=>go(j)},el("img",{src:p.thumb,alt:"",loading:"lazy"}))));
  lightbox.replaceChildren(
    el("div",{class:"lb-top"},el("b",{text:current.name}),count,el("button",{class:"close","aria-label":"Kapat",onclick:()=>lightbox.close()},"×")),
    el("div",{class:"lb-main"},
      el("button",{class:"lb-nav prev","aria-label":"Önceki fotoğraf",onclick:()=>go(i-1)},"‹"),
      img,
      el("button",{class:"lb-nav next","aria-label":"Sonraki fotoğraf",onclick:()=>go(i+1)},"›")),
    cap,grid);
  lightbox.onkeydown=e=>{ if(e.key==="ArrowRight"){ e.preventDefault(); go(i+1); } else if(e.key==="ArrowLeft"){ e.preventDefault(); go(i-1); } };
  // dokunmatik: sağa/sola kaydır
  let sx=null; img.addEventListener("pointerdown",e=>{ sx=e.clientX; }); img.addEventListener("pointerup",e=>{ if(sx!=null&&Math.abs(e.clientX-sx)>40) go(i+(e.clientX<sx?1:-1)); sx=null; });
  lightbox.showModal(); go(i);
}
lightbox.addEventListener("close",()=>{ const k=+lightbox.dataset.i||0; if(curPhotos[k]&&viewMode==="photo") showPhoto(k); }); // galeride son bakılan fotoğraf sahnede kalsın
photoImg.addEventListener("click",()=>openLightbox(curPhoto));

/* --- yapay zekâya soru --- */
let aiBusy=false, aiLast=0;
function aiReady(){ return !aiBusy && Date.now()-aiLast>4000; }
function askBox(f){
  const out=el("div",{class:"answer","aria-live":"polite"});
  const inp=el("input",{type:"text",maxlength:"240",placeholder:`Örn. ${f.name.toLocaleLowerCase("tr")} yapraklarım neden sararıyor?`,"aria-label":"Bitkin hakkında soru"});
  const btn=el("button",{class:"btn",type:"submit",text:"Sor"});
  const form=el("form",{onsubmit:async e=>{
    e.preventDefault(); const q=clampStr(inp.value,240); if(q.length<3) return;
    if(!aiReady()){ out.textContent="Bir önceki yanıt bitsin; birkaç saniye sonra tekrar deneyin."; return; }
    aiBusy=true; btn.disabled=true; out.textContent="Düşünüyor…";
    try{
      const r=await aiCall({mode:"ask",question:q,plant:{name:f.name,latin:f.latin,light:f.care.light[1],water:f.care.water[1],soil:f.care.soil,temp:f.care.temp}});
      out.textContent=clampStr(r.text,2000)||"Yanıt boş geldi, soruyu farklı sormayı dene.";
    }catch(err){
      out.textContent = err?.code==="rate_limited" ? "Çok sık soruldu; bir dakika bekleyip tekrar deneyin." : "Yanıt alınamadı. Bir süre sonra tekrar deneyin.";
    }finally{ aiBusy=false; aiLast=Date.now(); btn.disabled=false; }
  }},inp,btn);
  return el("div",{class:"ask"},el("h3",{text:"Bitkine dair bir şey mi soracaksın?"}),form,out);
}

/* --- rehberde olmayan bitki: yapay zekâdan kart --- */
async function aiPlant(name){
  name=clampStr(name,40);
  if(!aiReady()){ toastSheet("Bir önceki istek sürüyor; birkaç saniye sonra tekrar deneyin."); return; }
  aiBusy=true; toastSheet(`“${name}” için bakım kartı hazırlanıyor…`);
  try{
    // önce /api/care (Vikipedi + Wikidata + GBIF + AI, 30 gün önbellekli); o olmazsa doğrudan /api/ai
    let r=null;
    if(/^[A-Za-zÇĞİÖŞÜçğıöşüâîû .'-]{2,40}$/.test(name)){
      const res=await fetch(`/api/care?name=${encodeURIComponent(name)}`).catch(()=>null);
      if(res?.status===429) throw {code:"rate_limited"};
      if(res?.ok) r=await res.json().catch(()=>null);
    }
    if(!r?.plant) r=await aiCall({mode:"plant",name});
    const f=validateAIPlant(r.plant);
    if(!f){ toastSheet(`“${name}” adında bir bitki bulunamadı. Yazımı kontrol edebilirsin.`); return; }
    showFlower(f,0,{scroll:true});
  }catch(err){
    if(err?.code==="rate_limited"){ toastSheet("Çok sık istendi; bir dakika bekleyin."); return; }
    // yapay zekâ kapalıysa: kaynaklardan ansiklopedi kartı (bakım bilgisi olmadan)
    const enc=await encyclopediaCard(name);
    if(enc) showFlower(enc,0,{scroll:true});
    else toastSheet(`“${name}” için bilgi bulunamadı. Yazımı kontrol edebilir ya da Latince adıyla deneyebilirsin.`);
  }
  finally{ aiBusy=false; aiLast=Date.now(); }
}
/* Vikipedi + Wikidata + GBIF'ten, yapay zekâ olmadan: ad, Latince ad, familya, özet; fotoğraf ve ek bilgi showFlower'da yüklenir */
async function encyclopediaCard(name){
  if(!/^[A-Za-zÇĞİÖŞÜçğıöşüâîû .'-]{2,40}$/.test(name)) return null;
  const d=await fetch(`/api/lookup?name=${encodeURIComponent(name)}`).then(r=>r.ok?r.json():null).catch(()=>null);
  if(!d?.found) return null;
  const latin=clampStr(d.latin,80); if(!/^[A-Z][a-z-]+( [a-z×-]+){0,3}$/.test(latin)) return null;
  const blurb=clampStr(d.blurb,600);
  return {id:"enc-"+norm(latin).replace(/ /g,"-"),enc:true,name:clampStr(d.name,40)||latin,latin,
    kind:d.family?`Familya: ${clampStr(d.family,60)}`:"Bitki",
    blurb:(blurb||"Bu bitki için kısa açıklama bulunamadı.")+(d.blurbLang==="en"?" (İngilizce Vikipedi'den)":""),
    aliases:[],colors:[{n:"Doğal",hex:"#7E9A62",m:"bu bitki için çiçek dili kaydı yok"}],
    care:{light:[2,"—"],water:[2,"—"],soil:"—",temp:"—",humidity:"—",feed:"—"},good:[],bad:[],toxic:"—",shape:{t:"daisy",center:"#E2C04A"},
    sources:(Array.isArray(d.sources)?d.sources:[]).map(s=>clampStr(s,30)).slice(0,4)};
}

function validateAIPlant(v){ // yapay zekâ çıktısı güvenilmez veri sayılır
  if(!v||typeof v!=="object"||v.found!==true) return null;
  const s=(x,m)=>clampStr(x,m)||"—", lvl=x=>Math.max(1,Math.min(3,Math.round(+x)||2));
  const arr=(a,m)=>Array.isArray(a)?a.slice(0,5).map(x=>clampStr(x,m)).filter(Boolean):[];
  const colors=(Array.isArray(v.colors)?v.colors:[]).slice(0,6).map(c=>({n:s(c?.n,20),hex:safeHex(c?.hex,"#E9C4D0"),m:s(c?.m,80)}));
  if(!colors.length) colors.push({n:"Yeşil",hex:"#7E9A62",m:"doğa"});
  const C=v.care||{};
  return {id:"ai-"+norm(v.name||"bitki").replace(/ /g,"-"),ai:true,sources:arr(v.sources,20).filter(x=>["Vikipedi (TR)","Wikidata","GBIF","Wikipedia (EN)"].includes(x)),name:s(v.name,40),latin:s(v.latin,60),kind:s(v.kind,40),blurb:s(v.blurb,300),aliases:[],colors,
    care:{light:[lvl(C.light?.[0]),s(C.light?.[1],120)],water:[lvl(C.water?.[0]),s(C.water?.[1],120)],soil:s(C.soil,120),temp:s(C.temp,60),humidity:s(C.humidity,60),feed:s(C.feed,120)},
    good:arr(v.good,140),bad:arr(v.bad,140),toxic:s(v.toxic,220),shape:{t:SHAPES.includes(v.shape)?v.shape:"daisy",center:safeHex(v.center,"#E2C04A")}};
}
function toastSheet(msg){ sheet.replaceChildren(el("p",{class:"meaning",text:msg})); }

/* --- fotoğraftan tanıma (yapay zekâ ile görsel tanıma, /api/identify) --- */
// Latince cins adı -> rehberdeki bitki
const GENUS={};
for(const f of FLOWERS){ const l=(LOOKUP[f.id]?.[0]||f.latin||"").split(/[ /(]/)[0].toLowerCase(); if(l) GENUS[l]=f.id; }
GENUS.saintpaulia=GENUS.streptocarpus; // eski adıyla "Saintpaulia" dönebilir
const idBtn=document.getElementById("idbtn"), idFile=document.getElementById("idfile");
idBtn.addEventListener("click",()=>idFile.click());
idFile.addEventListener("change",async()=>{
  const file=idFile.files[0]; idFile.value=""; if(!file) return;
  if(!/^image\/(jpeg|png|webp)$/.test(file.type)){ toastSheet("Yalnızca JPG, PNG ya da WEBP fotoğraf yükleyebilirsin."); return; }
  if(file.size>15*1024*1024){ toastSheet("Fotoğraf 15 MB’tan büyük; daha küçük bir fotoğraf seç."); return; }
  idBtn.disabled=true; toastSheet("Fotoğraf inceleniyor…");
  try{
    const blob=await reencode(file); // küçültür, EXIF/konum bilgisini siler
    if(blob.size>5*1024*1024) throw {code:"too_large"};
    const fd=new FormData(); fd.append("image",blob,"bitki."+(blob.type==="image/webp"?"webp":"jpg"));
    const r=await fetch("/api/identify",{method:"POST",body:fd}); const d=await r.json().catch(()=>({}));
    if(!r.ok) throw {code:d.error||"unavailable"};
    showIdResults(Array.isArray(d.results)?d.results:[]);
  }catch(err){
    toastSheet(err?.code==="not_configured"?"Fotoğraftan tanıma henüz açılmadı. Bitkinin adını arama kutusuna yazabilirsin."
      :err?.code==="rate_limited"?"Çok sık denendi; bir dakika bekleyip tekrar dene."
      :"Fotoğraf tanınamadı. Bitkinin çiçeği ya da yaprağı net görünen başka bir fotoğraf dene.");
  }finally{ idBtn.disabled=false; }
});
function showIdResults(results){
  const rows=results.map(x=>({score:Math.max(0,Math.min(1,+x.score||0)),latin:clampStr(x.latin,80),genus:clampStr(x.genus,60),common:Array.isArray(x.common)?x.common.slice(0,3).map(c=>clampStr(c,40)).filter(Boolean):[]})).filter(x=>x.latin);
  if(!rows.length){ toastSheet("Bu fotoğrafta tanıdık bir bitki bulunamadı. Çiçeği ya da yaprağı yakından çekmeyi dene."); return; }
  sheet.replaceChildren(
    el("h2",{text:"Bu bitki şunlardan biri olabilir"}),
    el("p",{class:"muted"},el("span",{class:"ai-badge",text:"Yapay zekâ tahmini — doğrulayın"})," Yüzde, ne kadar emin olduğunu gösterir."),
    el("ul",{class:"idlist"},...rows.map(x=>{
      const fid=GENUS[(x.genus||x.latin.split(" ")[0]).toLowerCase()], f=fid&&BY_ID[fid];
      return el("li",null,
        el("div",null,el("b",{text:x.common[0]||x.latin}),el("div",{class:"latin",text:x.latin})),
        el("span",{class:"pct",text:`%${Math.round(x.score*100)}`}),
        f?el("button",{class:"btn",type:"button",onclick:()=>showFlower(f,0,{scroll:true})},`${f.name} rehberini aç`)
         :el("button",{class:"btn ghost",type:"button",onclick:()=>aiPlant(/^[A-Za-z .-]{2,40}$/.test(x.latin)?x.latin:(x.common[0]||x.latin))},"Bakım kartı iste"));
    })));
}

/* --- arama kutusu (ortak bileşen) --- */
function combo(input,list,{source,render,choose,fallback}){
  let items=[], sel=-1;
  const close=()=>{ list.hidden=true; input.setAttribute("aria-expanded","false"); input.removeAttribute("aria-activedescendant"); sel=-1; };
  const paint=()=>{ [...list.children].forEach((li,i)=>li.setAttribute("aria-selected",String(i===sel))); if(sel>=0){ input.setAttribute("aria-activedescendant",list.children[sel].id); list.children[sel].scrollIntoView({block:"nearest"});} };
  const open=()=>{
    const q=input.value; items=source(q);
    if(!q.trim()){ close(); return; }
    if(!items.length && fallback) items=[fallback(q)];
    list.replaceChildren(...items.map((it,i)=>{ const li=el("li",{role:"option",id:list.id+"-"+i,onmousedown:e=>{e.preventDefault(); pick(i);}}); render(li,it,q); return li; }));
    list.hidden=!items.length; input.setAttribute("aria-expanded",String(!!items.length)); sel=items.length?0:-1; paint();
  };
  const pick=i=>{ const it=items[i]; if(!it) return; close(); choose(it,input); };
  input.addEventListener("input",open);
  input.addEventListener("focus",()=>{ if(input.value.trim()) open(); });
  input.addEventListener("blur",()=>setTimeout(close,120));
  input.addEventListener("keydown",e=>{
    if(e.key==="ArrowDown"){ e.preventDefault(); if(list.hidden) open(); else { sel=Math.min(items.length-1,sel+1); paint(); } }
    else if(e.key==="ArrowUp"){ e.preventDefault(); sel=Math.max(0,sel-1); paint(); }
    else if(e.key==="Enter"){ e.preventDefault(); if(list.hidden) open(); if(sel>=0) pick(sel); }
    else if(e.key==="Escape"){ close(); }
  });
}
function hl(text,q){ // eşleşen öneki <mark> ile vurgula (DOM düğümleriyle)
  const nt=norm(text), nq=norm(q).split(" ")[0]; const out=document.createDocumentFragment();
  // norm() uzunluğu korur mu? Türkçe harfler tek karakter kalır; boşluk/simge farkı olabilir — güvenli yaklaşım:
  const words=text.split(/(\s+)/); let done=false;
  for(const w of words){ const nw=norm(w); if(!done && nq && nw.startsWith(nq) && w.length>=nq.length){ out.append(el("mark",{text:w.slice(0,nq.length)}),w.slice(nq.length)); done=true; } else out.append(w); }
  return out;
}
function guideMatches(q){
  let hiddenToxic=0; // evcil hayvan dostu modunda gizlenen zehirli bitkiler
  const nq=norm(q), ids=gTrie.search(q);
  const colorHit=f=>f.colors.findIndex(c=>{ const nc=norm(c.n); return nq.split(" ").some(t=>t.length>1&&nc.startsWith(t)); });
  return ids.map(id=>BY_ID[id]).map(f=>{
    const nn=norm(f.name), ci=colorHit(f);
    const rank = nn.startsWith(nq)?0 : nn.split(" ").some(w=>nq.split(" ").some(t=>w.startsWith(t)))?1 : f.aliases.some(a=>norm(a).startsWith(nq))?2 : 3;
    return {f,ci,rank};
  }).sort((a,b)=>a.rank-b.rank||a.f.name.localeCompare(b.f.name,"tr")).filter(x=>!petMode||isPetSafe(x.f)||(hiddenToxic++,false)).slice(0,8).concat(hiddenToxic?[{pethidden:hiddenToxic}]:[]);
}
combo(document.getElementById("q"),document.getElementById("sugg"),{
  source:guideMatches,
  render:(li,it,q)=>{
    if(it.pethidden){ li.append(svg(ICON.paw),el("span",{class:"muted",text:`${it.pethidden} bitki evcil hayvanlar için zehirli olduğu için gizlendi · göstermek için tıkla`})); return; }
    if(it.ai){ li.append(el("span",{class:"dot",style:"background:var(--pollen)"}),el("span",{class:"ai",text:`“${clampStr(q,40)}” rehberde yok — yapay zekâdan bakım kartı iste`})); return; }
    const c=it.f.colors[it.ci>=0?it.ci:0];
    li.append(el("span",{class:"dot",style:`background:${safeHex(c.hex)}`}),el("span",null,hl(it.f.name,q)),el("small",{text:it.ci>=0?`${c.n.toLocaleLowerCase("tr")} · ${c.m}`:it.f.latin}));
  },
  choose:(it,input)=>{
    if(it.pethidden){ setPetMode(false); input.dispatchEvent(new Event("input")); input.focus(); return; }
    if(it.ai){ aiPlant(input.value); return; }
    input.value=it.f.name; showFlower(it.f,it.ci>=0?it.ci:0,{scroll:true});
  },
  fallback:q=>({ai:true,q})
});

/* =========================================================
   7. RENKLERİN DİLİ
   ========================================================= */
const COLOR_FAMILIES=[["Beyaz","#F6F3EA"],["Kırmızı","#B8263C"],["Pembe","#EE9DB5"],["Sarı","#F4CF2E"],["Turuncu","#EE7F3B"],["Mor","#7D4FA6"],["Mavi","#5B78C9"]];
let colorFilter="";
function familyOf(n){ const x=norm(n); if(["bordo","kirmizi"].includes(x)) return "Kırmızı"; if(["lila","mor"].includes(x)) return "Mor"; if(["mercan","turuncu"].includes(x)) return "Turuncu"; if(["krem","beyaz"].includes(x)) return "Beyaz"; return COLOR_FAMILIES.find(([c])=>norm(c)===x)?.[0]||"Diğer"; }
function renderColors(){
  const bar=document.getElementById("colorbar");
  bar.replaceChildren(el("button",{class:"chip","aria-pressed":String(!colorFilter),onclick:()=>{colorFilter="";renderColors();}},"Hepsi"),
    ...COLOR_FAMILIES.map(([n,h])=>el("button",{class:"chip","aria-pressed":String(colorFilter===n),onclick:()=>{colorFilter=n;renderColors();}},el("i",{style:`background:${h}`}),n)));
  const rows=[];
  FLOWERS.forEach(f=>{ if(petMode&&!isPetSafe(f)) return; f.colors.forEach((c,i)=>{ if(!colorFilter||familyOf(c.n)===colorFilter) rows.push({f,c,i}); }); });
  rows.sort((a,b)=>a.c.n.localeCompare(b.c.n,"tr")||a.f.name.localeCompare(b.f.name,"tr"));
  document.getElementById("lex").replaceChildren(...rows.map(({f,c,i})=>el("button",{class:"entry",onclick:()=>{ location.hash="rehber"; showFlower(f,i,{scroll:true}); }},
    el("span",{class:"c",style:`background:${safeHex(c.hex)}`}),
    el("span",null,el("span",{class:"nm",text:`${c.n} ${f.name.toLocaleLowerCase("tr")}`}),el("br"),el("span",{class:"m",text:c.m})))));
}


let stillStage=null; const STILLS=new Map(); let thumbsWaiting=false;
function flowerThumb(species,color){
  const f=BY_ID[species];
  if(f&&CAN_GL&&!HAS_GL){
    // 3B kütüphanesi henüz yok: yükle, gelince görünen listeleri yeniden çiz
    if(!thumbsWaiting){ thumbsWaiting=true; loadThree().then(ok=>{ thumbsWaiting=false; if(!ok) return;
      if(document.getElementById("v-pazar").classList.contains("on")) renderMarket();
      if(document.getElementById("v-panel").classList.contains("on")) renderPanel(); }); }
    return el("span",{class:"nophoto",text:"3B önizleme hazırlanıyor…"});
  }
  if(f&&HAS_GL){
    const c=(f.colors.find(x=>norm(x.n)===norm(color))||f.colors[0]), key=f.id+c.hex;
    if(!STILLS.has(key)){ try{ stillStage=stillStage||new FlowerStage(null,{still:true}); STILLS.set(key,stillStage.still(f,c.hex)); }catch(e){ STILLS.set(key,""); } }
    const url=STILLS.get(key);
    if(url) return el("span",{class:"still"},el("img",{src:url,alt:""}),el("span",{class:"tag",text:"3B önizleme"}));
  }
  return el("span",{class:"nophoto",text:"Fotoğraf eklenmemiş"});
}

/* =========================================================
   8. PAZAR (çiçekçilerin ürünleri — Supabase)
   ========================================================= */
let PRODUCTS=[], mTrie=new Trie(), mQuery="", marketState="loading";
const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function cleanProduct(x){ // veritabanından gelen veri de güvenilmez sayılır
  if(!x||!UUID_RE.test(x.id||"")||!x.shop||!UUID_RE.test(x.shop.id||"")) return null;
  const name=clampStr(x.name,60), price=Number(x.price); if(!name||!isFinite(price)) return null;
  const phone=clampStr(x.shop.phone,20);
  return {id:x.id,name,price,cat:CATS.includes(x.cat)?x.cat:"Diğer",species:BY_ID[x.species]?x.species:"",color:clampStr(x.color,20),
    stock:Math.max(0,Math.floor(+x.stock||0)),desc:clampStr(x.description,600),photos:(Array.isArray(x.photos)?x.photos:[]).filter(p=>PHOTO_RE.test(p)).slice(0,4),
    created:Date.parse(x.created_at)||0,
    shop:{id:x.shop.id,name:clampStr(x.shop.name,60)||"Çiçekçi",city:clampStr(x.shop.city,30),phone:/^[+0-9 ()-]{7,20}$/.test(phone)?phone:"",about:clampStr(x.shop.about,300)}};
}
const photoURL=p=>PHOTO_BASE+p.split("/").map(encodeURIComponent).join("/");
async function loadMarket(){
  if(!sb){ marketState="error"; renderMarket(); return; }
  const {data,error}=await sb.from("products").select("id,name,cat,species,color,price,stock,description,photos,created_at,shop:shops(id,name,city,phone,about)").order("created_at",{ascending:false}).limit(500);
  if(error){ marketState="error"; renderMarket(); return; }
  PRODUCTS=(data||[]).map(cleanProduct).filter(Boolean); marketState="ok";
  mTrie=new Trie();
  for(const p of PRODUCTS){ const f=BY_ID[p.species]; [p.name,p.cat,p.color,p.shop.name,p.shop.city,f?.name,...(f?.aliases||[]),p.color+" "+(f?.name||"")].forEach(t=>t&&mTrie.insert(t,p.id)); }
  const cities=[...new Set(PRODUCTS.map(p=>p.shop.city).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"tr"));
  const fc=document.getElementById("fcity"), keep=fc.value;
  fc.replaceChildren(el("option",{value:""},"Tüm şehirler"),...cities.map(c=>el("option",{value:c},c))); fc.value=cities.includes(keep)?keep:"";
  renderMarket();
}
let shopFilter=null, shopInfo=null; // /dukkan/:id sayfasındayken o çiçekçinin kimliği
function filteredProducts(){
  let list=PRODUCTS;
  if(shopFilter) list=list.filter(p=>p.shop.id===shopFilter);
  if(mQuery.trim()){ const ids=new Set(mTrie.search(mQuery)); list=list.filter(p=>ids.has(p.id)); }
  const cat=document.getElementById("fcat").value, city=document.getElementById("fcity").value, sort=document.getElementById("fsort").value;
  if(cat) list=list.filter(p=>p.cat===cat); if(city) list=list.filter(p=>p.shop.city===city);
  if(document.getElementById("fstock").checked) list=list.filter(p=>p.stock>0);
  if(petMode) list=list.filter(p=>isPetSafe(BY_ID[p.species])); // türü bilinmeyen ürünler de gizlenir
  const by=sort==="cheap"?(a,b)=>a.price-b.price:sort==="dear"?(a,b)=>b.price-a.price:(a,b)=>b.created-a.created;
  // tükenenler her zaman sona
  return [...list].sort((a,b)=>(a.stock>0?0:1)-(b.stock>0?0:1)||by(a,b));
}
const waLink=phone=>{ const d=String(phone||"").replace(/\D/g,""); return d.length>=10?`https://wa.me/${d}`:null; };
/* çiçekçi sayfası başlığı */
function renderShopHead(){
  const box=document.getElementById("shophead");
  if(!shopFilter){ box.replaceChildren(); document.getElementById("h-pazar").hidden=false; return; }
  document.getElementById("h-pazar").hidden=true;
  const s=shopInfo||PRODUCTS.find(p=>p.shop.id===shopFilter)?.shop;
  if(!s){ box.replaceChildren(el("p",{class:"muted",text:"Çiçekçi yükleniyor…"})); return; }
  document.title=`${s.name}${s.city?", "+s.city:""} — ${SITE_TITLE}`;
  const wa=waLink(s.phone);
  box.replaceChildren(el("div",{class:"shophead"},
    el("a",{href:"/#pazar",class:"linkbtn small",onclick:e=>{ e.preventDefault(); history.pushState(null,"","/#pazar"); route(); }},"Tüm çiçekçiler"),
    el("h1",{class:"big flush",text:s.name}),
    el("p",{class:"muted",text:[s.city,s.phone].filter(Boolean).join(" · ")}),
    s.about?el("p",{class:"about",text:s.about}):null,
    el("div",{class:"row"},
      wa?el("a",{class:"btn",href:wa,target:"_blank",rel:"noopener noreferrer",onclick:()=>{ const p=PRODUCTS.find(x=>x.shop.id===s.id); if(p) bumpStat(p.id,"wa"); }},"WhatsApp’tan yaz"):null,
      el("button",{class:"btn ghost",type:"button",onclick:async e=>{
        const url=location.origin+`/dukkan/${s.id}`;
        try{ if(navigator.share) await navigator.share({title:s.name,url}); else { await navigator.clipboard.writeText(url); e.target.textContent="Bağlantı kopyalandı"; } }catch(_){}
      }},"Dükkânı paylaş"))));
}
async function openShop(id,{push=true}={}){
  if(!UUID_RE.test(id||"")) return;
  if(push) history.pushState(null,"",`/dukkan/${id}`);
  route();
}
function renderMarket(){
  const grid=document.getElementById("mgrid"), status=document.getElementById("mstatus");
  renderShopHead();
  if(marketState==="loading"){ status.textContent="Vitrin yükleniyor…"; return; }
  if(marketState==="error"){ status.textContent=""; grid.replaceChildren(el("div",{class:"empty"},el("h3",{text:"Vitrin şu an yüklenemedi"}),el("p",{text:"Bağlantını kontrol edip sayfayı yenile."}))); return; }
  const list=filteredProducts();
  status.textContent = PRODUCTS.length ? `${list.length} ürün` : "";
  if(shopFilter&&!list.length&&!mQuery.trim()){ grid.replaceChildren(el("div",{class:"empty"},el("h3",{text:"Bu çiçekçinin vitrinde ürünü yok"}),el("p",{text:"Daha sonra tekrar bak ya da diğer çiçekçilere göz at."}))); return; }
  if(!PRODUCTS.length){ grid.replaceChildren(el("div",{class:"empty"},el("h3",{text:"Vitrin henüz boş"}),el("p",{text:"İlk ürünü sen ekle: Çiçekçi paneline geç, hesabını aç, dükkânını tanıt ve elindeki çiçekleri listele."}),el("a",{class:"btn",href:"#panel",style:"display:inline-block;text-decoration:none"},"Çiçekçi paneline geç"))); return; }
  if(!list.length){ grid.replaceChildren(el("div",{class:"empty"},el("h3",{text:"Bu aramaya uyan ürün yok"}),el("p",{text:"Başka bir renk ya da şehir dene, veya filtreleri temizle."}))); return; }
  grid.replaceChildren(...list.map(p=>el("button",{class:"stake"+(p.stock>0?"":" out"),onclick:()=>openProduct(p),"aria-label":`${p.name}, ${p.shop.name}, ${fmtTL(p.price)}${p.stock>0?"":", tükendi"}`},
    el("div",{class:"ph"},p.photos[0]?el("img",{src:photoURL(p.photos[0]),alt:"",loading:"lazy"}):flowerThumb(p.species,p.color),p.stock>0?null:el("span",{class:"soldout",text:"Tükendi"})),
    el("div",{class:"body"},el("div",{class:"nm",text:p.name}),el("div",{class:"shop",text:[p.shop.name,p.shop.city].filter(Boolean).join(", ")}),el("div",{class:"price",text:fmtTL(p.price)})))));
}
combo(document.getElementById("mq"),document.getElementById("msugg"),{
  source:q=>{ const ids=new Set(mTrie.search(q)); return PRODUCTS.filter(p=>ids.has(p.id)).slice(0,8); },
  render:(li,p,q)=>{ const f=BY_ID[p.species]; const c=f?.colors.find(x=>norm(x.n)===norm(p.color))||f?.colors[0]; li.append(el("span",{class:"dot",style:`background:${safeHex(c?.hex,"#9BB58A")}`}),el("span",null,hl(p.name,q)),el("small",{text:`${p.shop.name} · ${fmtTL(p.price)}`})); },
  choose:(p,input)=>{ input.value=p.name; mQuery=p.name; renderMarket(); openProduct(p); }
});
document.getElementById("mq").addEventListener("input",e=>{ mQuery=e.target.value; renderMarket(); });
["fcat","fcity","fsort","fstock"].forEach(id=>document.getElementById(id).addEventListener("change",renderMarket));
document.getElementById("fcat").append(...CATS.map(c=>el("option",{value:c},c)));
document.getElementById("fcat").addEventListener("change",paintCats);

/* --- kategori şeridi: Openverse görselleri (yalnızca süs; atıf zorunlu) --- */
let catsBuilt=false;
function paintCats(){ const v=document.getElementById("fcat").value; document.querySelectorAll("#mcats .cat").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.cat===v))); }
async function buildCats(){
  if(catsBuilt) return; catsBuilt=true;
  const box=document.getElementById("mcats"), credits=document.getElementById("mcredits");
  const tiles=CATS.map(c=>{ const ph=el("span",{class:"ph"}); const b=el("button",{class:"cat",type:"button","data-cat":c,"aria-pressed":"false",onclick:()=>{ const s=document.getElementById("fcat"); s.value=s.value===c?"":c; paintCats(); renderMarket(); }},ph,el("span",{class:"nm",text:c})); return {c,b,ph}; });
  box.replaceChildren(...tiles.map(t=>t.b)); paintCats();
  const got=await Promise.all(tiles.map(t=>fetch(`/api/stock?cat=${encodeURIComponent(t.c)}`).then(r=>r.ok?r.json():{photos:[]}).catch(()=>({photos:[]}))));
  const used=[];
  got.forEach((d,i)=>{
    const p=(Array.isArray(d.photos)?d.photos:[]).find(x=>/^https:\/\/api\.openverse\.org\//.test(x?.src||"")&&/^https:\/\//.test(x?.page||""));
    if(!p) return;
    tiles[i].ph.append(el("img",{src:p.src,alt:"",loading:"lazy"}));
    used.push({author:clampStr(p.author,60)||"Bilinmiyor",license:clampStr(p.license,20),page:p.page});
  });
  if(used.length) credits.replaceChildren("Kategori görselleri: ",...used.flatMap((u,i)=>[i?", ":"",el("a",{href:u.page,target:"_blank",rel:"noopener noreferrer"},u.author),u.license?` (${u.license})`:""])," · ",el("a",{href:"https://openverse.org",target:"_blank",rel:"noopener noreferrer"},"Openverse"));
}

/* --- ürün detayı (fotoğraflar + 3B) --- */
const pmodal=document.getElementById("pmodal"); let mStage=null; const big=el("div",{class:"big"});
function openProduct(p){
  const f=BY_ID[p.species];
  const thumbs=el("div",{class:"thumbs",role:"group","aria-label":"Görseller"});
  const views=[]; p.photos.forEach(id=>views.push({t:"img",id})); if(f&&CAN_GL) views.push({t:"3d"});
  if(!views.length) views.push({t:"svg"});
  let cur=0;
  const show=i=>{
    cur=i;
    [...thumbs.children].forEach((b,k)=>b.setAttribute("aria-pressed",String(k===i)));
    const v=views[i]; big.querySelectorAll(":scope > img, :scope > span").forEach(n=>n.remove());
    if(mStage){ mStage.renderer.domElement.style.display = v.t==="3d"?"block":"none"; mStage.paused = v.t!=="3d"; if(!mStage.paused) mStage.loop(); }
    if(v.t==="img") big.append(el("img",{src:photoURL(v.id),alt:`${p.name} fotoğrafı`}));
    if(v.t==="svg"){ const s=flowerThumb(p.species,p.color); s.style.cssText="position:absolute;inset:0;display:grid;place-items:center"; big.append(s); }
  };
  views.forEach((v,i)=>thumbs.append(el("button",{"aria-pressed":"false","aria-label":v.t==="3d"?"3B görünüm":`Fotoğraf ${i+1}`,onclick:()=>show(i)},v.t==="img"?el("img",{src:photoURL(v.id),alt:""}):v.t==="3d"?"3B":flowerThumb(p.species,p.color))));
  const wa=waLink(p.shop.phone);
  bumpStat(p.id,"view");
  pmodal.replaceChildren(
    el("button",{class:"close","aria-label":"Kapat",onclick:()=>pmodal.close()},"×"),
    el("div",{class:"modal-in"},
      el("div",{class:"modal-media"},big,thumbs),
      el("div",{class:"modal-info"},
        el("div",{class:"muted",text:p.cat}),
        el("h2",{id:"pm-title",text:p.name}),
        el("div",{class:"price",text:fmtTL(p.price)}),
        p.desc?el("p",{text:p.desc}):null,
        el("dl",null,
          el("dt",{text:"Çiçekçi"}),el("dd",null,el("a",{href:`/dukkan/${p.shop.id}`,onclick:e=>{ e.preventDefault(); pmodal.close(); openShop(p.shop.id); }},p.shop.name)),
          p.shop.city?[el("dt",{text:"Şehir"}),el("dd",{text:p.shop.city})]:null,
          p.color?[el("dt",{text:"Renk"}),el("dd",{text:p.color})]:null,
          el("dt",{text:"Stok"}),el("dd",{text:p.stock>0?`${p.stock} adet`:"Tükendi"}),
          p.shop.phone?[el("dt",{text:"Telefon"}),el("dd",{text:p.shop.phone})]:null),
        p.shop.about?el("p",{class:"muted",text:p.shop.about}):null,
        el("div",{class:"row"},
          wa?el("a",{class:"btn",href:wa,target:"_blank",rel:"noopener noreferrer",style:"text-decoration:none",onclick:()=>bumpStat(p.id,"wa")},"WhatsApp’tan yaz"):null,
          shopFilter!==p.shop.id?el("button",{class:"btn ghost",type:"button",onclick:()=>{ pmodal.close(); openShop(p.shop.id); }},"Çiçekçinin diğer ürünleri"):null,
          f?el("button",{class:"btn ghost",onclick:()=>{ pmodal.close(); location.hash="rehber"; const ci=f.colors.findIndex(x=>norm(x.n)===norm(p.color)); showFlower(f,Math.max(0,ci)); }},`${f.name} bakımını gör`):null),
        reportBox(p),
        // moderasyon: yetki veritabanında (RLS) denetlenir; düğme yalnızca kolaylık
        isAdmin&&p.shop.id!==uid()?el("button",{class:"btn ghost danger",type:"button",onclick:async e=>{
          if(!confirm(`“${p.name}” vitrinden kaldırılsın mı? Bu geri alınamaz.`)) return;
          e.target.disabled=true;
          const {error}=await sb.from("products").delete().eq("id",p.id);
          if(!error&&p.photos.length) await sb.storage.from("product-photos").remove(p.photos);
          if(error){ e.target.disabled=false; e.target.textContent="Kaldırılamadı"; return; }
          pmodal.close(); loadMarket();
        }},"Yönetici: ürünü kaldır"):null)));
  pmodal.showModal();
  if(mStage) mStage.renderer.domElement.style.display="none"; // önceki üründen kalan sahne
  show(0);
  if(f&&CAN_GL) loadThree().then(ok=>{
    if(!ok||!pmodal.open) return;
    if(!mStage){ mStage=new FlowerStage(big); }
    mStage.resize(); const ci=f.colors.findIndex(x=>norm(x.n)===norm(p.color)); mStage.build(f,f.colors[Math.max(0,ci)].hex); mStage.visible=true;
    show(cur);
  });
}
pmodal.addEventListener("click",e=>{ if(e.target===pmodal) pmodal.close(); });

/* --- basit istatistik: ürün görüntülenmesi ve WhatsApp tıklaması (kişisel veri tutulmaz) --- */
function bumpStat(id,kind){
  if(!sb||!UUID_RE.test(id)||!["view","wa"].includes(kind)) return;
  const k=`st:${kind}:${id}`;
  try{ if(sessionStorage.getItem(k)) return; sessionStorage.setItem(k,"1"); }catch(e){} // oturum başına bir kez
  sb.from("product_events").insert({product_id:id,kind}).then(()=>{},()=>{});
}

/* --- "Bu ürünü bildir": herkes gönderebilir, yalnızca yöneticiler okur (RLS) --- */
const REPORT_REASONS=["Sahte ya da yanıltıcı","Uygunsuz içerik","Yasak ya da korunan bitki","Fiyat ya da stok yanlış","Diğer"];
const reportedKey=id=>"rep:"+id;
function alreadyReported(id){ try{ return sessionStorage.getItem(reportedKey(id))==="1"; }catch(e){ return false; } }
function reportBox(p){
  const wrap=el("div",{class:"report"});
  if(alreadyReported(p.id)){ wrap.append(el("p",{class:"muted",text:"Bu ürünü bildirdin, teşekkürler."})); return wrap; }
  const open=el("button",{type:"button",class:"linkbtn small",onclick:()=>{
    const reason=el("select",{id:"rp-reason"},...REPORT_REASONS.map(r=>el("option",{value:r},r)));
    const note=el("textarea",{id:"rp-note",maxlength:"300",placeholder:"İstersen kısaca açıkla (en fazla 300 karakter)"});
    const msg=el("p",{class:"err","aria-live":"polite"}), send=el("button",{class:"btn ghost",type:"submit",text:"Bildirimi gönder"});
    wrap.replaceChildren(el("form",{class:"report-form",onsubmit:async e=>{
      e.preventDefault(); msg.textContent=""; send.disabled=true;
      const {error}=await sb.from("product_reports").insert({product_id:p.id,reason:REPORT_REASONS.includes(reason.value)?reason.value:"Diğer",note:clampStr(note.value,300)});
      send.disabled=false;
      if(error){ msg.textContent=/Çok fazla/.test(error.message)?"Bu ürün için çok fazla bildirim geldi; daha sonra tekrar dene.":"Bildirim gönderilemedi, tekrar dene."; return; }
      try{ sessionStorage.setItem(reportedKey(p.id),"1"); }catch(e){}
      wrap.replaceChildren(el("p",{class:"muted",role:"status",text:"Teşekkürler. Bildirimin yöneticilere iletildi."}));
    }},
      el("div",{class:"field"},el("label",{for:"rp-reason",text:"Neden bildiriyorsun?"}),reason),
      el("div",{class:"field"},el("label",{for:"rp-note",text:"Not"}),note),
      el("div",{class:"row"},send,el("button",{type:"button",class:"linkbtn small",onclick:()=>wrap.replaceWith(reportBox(p))},"Vazgeç")),msg));
    reason.focus();
  }},"Bu ürünü bildir");
  wrap.append(open); return wrap;
}
pmodal.addEventListener("close",()=>{ if(mStage) mStage.paused=true; });

/* =========================================================
   9. ÇİÇEKÇİ PANELİ (Supabase oturumu)
   ========================================================= */
let myShop=null, myProducts=[], busy=false, flash="", authMode="login", isAdmin=false, editId=null, reports=[], myStats={};
function setFlash(m){ flash=m; }
async function loadMine(){
  if(!sb||!uid()){ myShop=null; myProducts=[]; isAdmin=false; reports=[]; return; }
  const [a,s,p]=await Promise.all([
    sb.from("admins").select("user_id").eq("user_id",uid()).maybeSingle(),
    sb.from("shops").select("id,name,city,phone,about").eq("id",uid()).maybeSingle(),
    sb.from("products").select("id,name,cat,species,color,price,stock,description,photos,created_at").eq("shop_id",uid()).order("created_at",{ascending:false})
  ]);
  isAdmin=!!a.data;
  myShop=s.data||null;
  myProducts=(p.data||[]).map(x=>cleanProduct({...x,shop:{id:uid(),name:myShop?.name||"",city:"",phone:"",about:""}})).filter(Boolean);
  // istatistik: ürün başına görüntülenme ve WhatsApp tıklaması (görünüm RLS'e uyar: yalnızca kendi ürünlerin)
  myStats={};
  if(myProducts.length){
    const st=await sb.from("product_stats").select("product_id,views,wa_clicks").in("product_id",myProducts.map(x=>x.id));
    for(const r of st.data||[]) if(UUID_RE.test(r.product_id||"")) myStats[r.product_id]={views:Math.max(0,+r.views||0),wa:Math.max(0,+r.wa_clicks||0)};
  }
  reports=[];
  if(isAdmin){
    const r=await sb.from("product_reports").select("id,reason,note,created_at,product:products(id,name,photos,shop:shops(name))").order("created_at",{ascending:false}).limit(100);
    reports=(r.data||[]).filter(x=>UUID_RE.test(x.id||"")&&x.product&&UUID_RE.test(x.product.id||"")).map(x=>({
      id:x.id,reason:REPORT_REASONS.includes(x.reason)?x.reason:"Diğer",note:clampStr(x.note,300),created:Date.parse(x.created_at)||0,
      product:{id:x.product.id,name:clampStr(x.product.name,60),photos:(Array.isArray(x.product.photos)?x.product.photos:[]).filter(ph=>PHOTO_RE.test(ph)),shop:clampStr(x.product.shop?.name,60)}}));
  }
}
/* çiçek anlamları: veritabanındaki sürüm app.js'teki yedeğin yerine geçer */
async function loadMeanings(){
  if(!sb) return;
  const {data,error}=await sb.from("flower_meanings").select("flower_id,color,meaning");
  if(error||!Array.isArray(data)) return; // olmazsa koddaki anlamlar kalır
  let changed=false;
  for(const r of data){
    const f=BY_ID[r.flower_id]; if(!f) continue;
    const c=f.colors.find(x=>x.n===r.color); const m=clampStr(r.meaning,120);
    if(c&&m&&c.m!==m){ c.m=m; gTrie.insert(m,f.id); changed=true; }
  }
  if(!changed) return;
  renderMeaning();
  if(document.getElementById("v-renkler").classList.contains("on")) renderColors();
}
/* yönetici: çiçek anlamlarını düzenle */
function meaningsCard(){
  const msg=el("p",{class:"ok",role:"status"});
  return el("div",{class:"card meanings"},
    el("h3",{text:"Çiçek anlamları"}),
    el("p",{class:"muted",text:"Her rengin çiçek dilindeki anlamı. Kaydettiğin değişiklik rehberde ve Renklerin dili bölümünde hemen görünür."}),
    msg,
    ...FLOWERS.map(f=>el("details",null,el("summary",{text:`${f.name} (${f.colors.length} renk)`}),
      ...f.colors.map(c=>{
        const inp=el("input",{maxlength:"120",value:c.m,"aria-label":`${c.n} ${f.name} anlamı`});
        const save=el("button",{class:"btn ghost",type:"button",onclick:async()=>{
          const m=clampStr(inp.value,120); if(m.length<2){ msg.className="err"; msg.textContent="Anlam en az 2 karakter olmalı."; return; }
          save.disabled=true;
          const {error}=await sb.from("flower_meanings").upsert({flower_id:f.id,color:c.n,meaning:m},{onConflict:"flower_id,color"});
          save.disabled=false;
          if(error){ msg.className="err"; msg.textContent=`${c.n} ${f.name} kaydedilemedi.`; return; }
          c.m=m; gTrie.insert(m,f.id); renderMeaning(); msg.className="ok"; msg.textContent=`${c.n} ${f.name.toLocaleLowerCase("tr")}: “${m}” kaydedildi.`;
        }},"Kaydet");
        return el("div",{class:"mrow"},el("span",{class:"c",style:`background:${safeHex(c.hex)}`}),el("span",{class:"n",text:c.n}),inp,save);
      }))));
}
/* yönetici: bildirilen ürünler */
function reportsCard(){
  const fmt=t=>new Intl.DateTimeFormat("tr-TR",{dateStyle:"medium",timeStyle:"short"}).format(t);
  const act=async(e,fn)=>{ if(busy) return; busy=true; e.target.disabled=true; const msg=await fn(); busy=false; setFlash(msg); await loadMine(); renderPanel(); loadMarket(); };
  return el("div",{class:"card reports"},
    el("h3",{text:`Bildirimler (${reports.length})`}),
    reports.length?el("ul",{class:"mine"},...reports.map(r=>el("li",null,
      el("div",{class:"t"},r.product.photos[0]?el("img",{src:photoURL(r.product.photos[0]),alt:""}):null),
      el("div",null,el("b",{text:`${r.product.name} · ${r.product.shop||"Çiçekçi"}`}),
        el("div",{class:"muted",text:`${r.reason} · ${fmt(r.created)}`}),r.note?el("div",{text:r.note}):null),
      el("div",{class:"acts"},
        el("button",{class:"btn ghost danger",type:"button",onclick:e=>{
          if(!confirm(`“${r.product.name}” vitrinden kaldırılsın mı? Bu geri alınamaz.`)) return;
          act(e,async()=>{ const {error}=await sb.from("products").delete().eq("id",r.product.id); if(error) return "Ürün kaldırılamadı.";
            if(r.product.photos.length) await sb.storage.from("product-photos").remove(r.product.photos); return "Ürün kaldırıldı; bildirimleri de kapandı."; });
        }},"Ürünü kaldır"),
        el("button",{class:"btn ghost",type:"button",onclick:e=>act(e,async()=>{ const {error}=await sb.from("product_reports").delete().eq("id",r.id); return error?"Bildirim kapatılamadı.":"Bildirim kapatıldı."; })},"Bildirimi kapat"))))):
      el("p",{class:"muted",text:"Bekleyen bildirim yok."}));
}
/* --- şifremi unuttum: e-postaya sıfırlama bağlantısı --- */
function resetForm(box){
  const email=el("input",{id:"r-email",type:"email",autocomplete:"email",required:true,maxlength:"120"});
  const err=el("p",{class:"err","aria-live":"polite"}), btn=el("button",{class:"btn",type:"submit",text:"Sıfırlama bağlantısı gönder"});
  box.replaceChildren(el("form",{class:"card narrow",onsubmit:async e=>{
    e.preventDefault(); err.textContent="";
    const em=clampStr(email.value,120);
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){ err.textContent="Geçerli bir e-posta adresi yaz."; return; }
    btn.disabled=true;
    try{
      const {error}=await sb.auth.resetPasswordForEmail(em,{redirectTo:location.origin+"/#panel"});
      if(error&&/rate|seconds/i.test(error.message)){ err.textContent="Çok sık deneme yapıldı; birkaç dakika sonra tekrar dene."; return; }
      // hesabın var olup olmadığını belli etmemek için her durumda aynı mesaj
      box.replaceChildren(el("div",{class:"empty"},el("h3",{text:"Gelen kutunu kontrol et"}),
        el("p",{text:`${em} adresiyle bir hesap varsa, şifreni yenilemen için bir bağlantı gönderdik. Bağlantı bir saat geçerli.`}),
        el("button",{class:"btn ghost",onclick:()=>{authMode="login";renderPanel();}},"Giriş ekranına dön")));
    }finally{ btn.disabled=false; }
  }},
    el("h3",{text:"Şifreni mi unuttun?"}),
    el("p",{class:"muted",text:"Hesabının e-posta adresini yaz; şifreni yenilemen için bir bağlantı gönderelim."}),
    el("div",{class:"field"},el("label",{for:"r-email",text:"E-posta"}),email),
    btn,err,
    el("p",{class:"muted"},el("button",{type:"button",class:"linkbtn",onclick:()=>{authMode="login";renderPanel();}},"Giriş ekranına dön"))));
}
/* --- sıfırlama bağlantısından gelindi: yeni şifre --- */
function newPassForm(box){
  const p1=el("input",{id:"n-pass",type:"password",autocomplete:"new-password",required:true,minlength:"8",maxlength:"72"});
  const p2=el("input",{id:"n-pass2",type:"password",autocomplete:"new-password",required:true,minlength:"8",maxlength:"72"});
  const err=el("p",{class:"err","aria-live":"polite"}), btn=el("button",{class:"btn",type:"submit",text:"Yeni şifreyi kaydet"});
  box.replaceChildren(el("form",{class:"card narrow",onsubmit:async e=>{
    e.preventDefault(); err.textContent="";
    if(p1.value.length<8){ err.textContent="Şifre en az 8 karakter olmalı."; return; }
    if(p1.value!==p2.value){ err.textContent="İki şifre aynı değil."; return; }
    btn.disabled=true;
    try{
      const {error}=await sb.auth.updateUser({password:p1.value});
      if(error){ err.textContent=/same|different/i.test(error.message)?"Yeni şifre eskisiyle aynı olamaz.":/weak|password/i.test(error.message)?"Bu şifre çok zayıf; daha uzun ve tahmin edilmesi zor bir şifre seç.":"Şifre değiştirilemedi. Bağlantının süresi dolmuş olabilir; yeniden sıfırlama iste."; return; }
      authMode="login"; setFlash("Şifren değiştirildi."); renderPanel();
    }finally{ btn.disabled=false; }
  }},
    el("h3",{text:"Yeni şifre belirle"}),
    el("div",{class:"field"},el("label",{for:"n-pass",text:"Yeni şifre"}),p1,el("span",{class:"help",text:"En az 8 karakter."})),
    el("div",{class:"field"},el("label",{for:"n-pass2",text:"Yeni şifre (tekrar)"}),p2),
    btn,err));
}
function authForm(box){
  if(authMode==="reset"){ resetForm(box); return; }
  const email=el("input",{id:"a-email",type:"email",autocomplete:"email",required:true,maxlength:"120"});
  const pass=el("input",{id:"a-pass",type:"password",autocomplete:authMode==="login"?"current-password":"new-password",required:true,minlength:"8",maxlength:"72"});
  const err=el("p",{class:"err","aria-live":"polite"}), btn=el("button",{class:"btn",type:"submit",text:authMode==="login"?"Giriş yap":"Hesap oluştur"});
  const agree=el("input",{type:"checkbox",id:"a-agree"});
  const consent=authMode==="signup"?el("label",{class:"consent",for:"a-agree"},agree,el("span",null,
    el("a",{href:"/kosullar",target:"_blank",rel:"noopener"},"Kullanım koşullarını")," kabul ediyorum; ",
    el("a",{href:"/gizlilik",target:"_blank",rel:"noopener"},"Aydınlatma Metni"),"’ni okudum. Dükkân adım, şehrim ve telefonumun sitede herkese açık görüneceğini biliyorum.")):null;
  const form=el("form",{class:"card",style:"max-width:440px",onsubmit:async e=>{
    e.preventDefault(); err.textContent="";
    const em=clampStr(email.value,120), pw=pass.value;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){ err.textContent="Geçerli bir e-posta adresi yaz."; return; }
    if(pw.length<8){ err.textContent="Şifre en az 8 karakter olmalı."; return; }
    if(authMode==="signup"&&!agree.checked){ err.textContent="Devam etmek için kullanım koşullarını kabul etmen gerekiyor."; agree.focus(); return; }
    btn.disabled=true;
    try{
      if(authMode==="login"){
        const {error}=await sb.auth.signInWithPassword({email:em,password:pw});
        if(error) err.textContent = /confirm/i.test(error.message) ? "E-posta adresin henüz onaylanmamış. Gelen kutundaki bağlantıya tıkla." : "E-posta ya da şifre hatalı.";
      }else{
        // onayın kaydı: hangi sürümü ne zaman kabul ettiği kullanıcı bilgisinde saklanır
        const {data,error}=await sb.auth.signUp({email:em,password:pw,options:{emailRedirectTo:location.origin+"/#panel",data:{terms_version:1,privacy_version:1,consent_at:new Date().toISOString()}}});
        if(error) err.textContent = /rate|seconds/i.test(error.message) ? "Çok sık deneme yapıldı; birkaç dakika sonra tekrar dene." : /password/i.test(error.message) ? "Bu şifre çok zayıf; daha uzun ve tahmin edilmesi zor bir şifre seç." : "Hesap oluşturulamadı: "+clampStr(error.message,120);
        else if(!data.session){ box.replaceChildren(el("div",{class:"empty"},el("h3",{text:"Gelen kutunu kontrol et"}),el("p",{text:`${em} adresine bir onay bağlantısı gönderdik. Bağlantıya tıkladıktan sonra buraya dönüp giriş yapabilirsin.`}),el("button",{class:"btn ghost",onclick:()=>{authMode="login";renderPanel();}},"Giriş ekranına dön"))); return; }
      }
    }finally{ btn.disabled=false; }
  }},
    el("h3",{text:authMode==="login"?"Çiçekçi girişi":"Çiçekçi hesabı oluştur"}),
    el("div",{class:"field"},el("label",{for:"a-email",text:"E-posta"}),email),
    el("div",{class:"field"},el("label",{for:"a-pass",text:"Şifre"}),pass,el("span",{class:"help",text:"En az 8 karakter."}),
      authMode==="login"?el("button",{type:"button",class:"linkbtn small",onclick:()=>{authMode="reset";renderPanel();}},"Şifremi unuttum"):null),
    consent,btn,err,
    el("p",{class:"muted"},authMode==="login"?"Hesabın yok mu? ":"Zaten hesabın var mı? ",
      el("button",{type:"button",class:"linkbtn",onclick:()=>{authMode=authMode==="login"?"signup":"login";renderPanel();}},authMode==="login"?"Hesap oluştur":"Giriş yap")));
  box.replaceChildren(form);
}
function renderPanel(){
  const box=document.getElementById("panelbox");
  if(!sb){ box.replaceChildren(el("div",{class:"empty"},el("h3",{text:"Panel şu an açılamıyor"}),el("p",{text:"Bağlantını kontrol edip sayfayı yenile."}))); return; }
  if(!uid()){ if(authMode==="newpass") authMode="login"; authForm(box); return; }
  if(authMode==="newpass"){ newPassForm(box); return; }
  const s=myShop||{name:"",city:"",phone:"",about:""};
  const fName=el("input",{id:"s-name",required:true,maxlength:"60",value:s.name}), fCity=el("input",{id:"s-city",maxlength:"30",value:s.city,placeholder:"Örn. İzmir"}),
        fPhone=el("input",{id:"s-phone",maxlength:"20",value:s.phone,placeholder:"+90 5xx xxx xx xx",inputmode:"tel"}), fAbout=el("textarea",{id:"s-about",maxlength:"300"},s.about);
  const sErr=el("p",{class:"err","aria-live":"polite"});
  const shopForm=el("form",{class:"card",onsubmit:async e=>{
    e.preventDefault(); if(busy) return;
    const row={id:uid(),name:clampStr(fName.value,60),city:clampStr(fCity.value,30),phone:clampStr(fPhone.value,20),about:clampStr(fAbout.value,300)};
    if(row.name.length<2){ sErr.textContent="Dükkân adı en az 2 karakter olmalı."; return; }
    if(row.phone && !/^[+0-9 ()-]{7,20}$/.test(row.phone)){ sErr.textContent="Telefon yalnızca rakam, boşluk, +, ( ) ve - içerebilir."; return; }
    busy=true; const {error}=await sb.from("shops").upsert(row); busy=false;
    if(error){ sErr.textContent="Kaydedilemedi, tekrar dene."; return; }
    setFlash(myShop?"Dükkân bilgileri kaydedildi.":"Dükkânın açıldı. Şimdi ürün ekleyebilirsin."); await loadMine(); renderPanel(); loadMarket();
  }},
    el("h3",{text:"Dükkân bilgileri"}),
    el("div",{class:"field"},el("label",{for:"s-name",text:"Dükkân adı"}),fName),
    el("div",{class:"two"},el("div",{class:"field"},el("label",{for:"s-city",text:"Şehir"}),fCity),el("div",{class:"field"},el("label",{for:"s-phone",text:"Telefon"}),fPhone)),
    el("div",{class:"field"},el("label",{for:"s-about",text:"Kısa tanıtım"}),fAbout),
    el("button",{class:"btn",type:"submit",text:myShop?"Bilgileri kaydet":"Dükkânı aç"}),sErr,
    el("p",{class:"muted",style:"margin-top:18px"},session.user.email||"", " · ",el("button",{type:"button",class:"linkbtn",onclick:async()=>{ await sb.auth.signOut(); }},"Çıkış yap")),
    myShop?el("div",{class:"danger-zone"},
      el("p",{class:"muted",text:"Dükkânını silersen dükkân bilgilerin, bütün ürünlerin ve ürün fotoğrafların hemen silinir. Bu geri alınamaz."}),
      el("button",{type:"button",class:"btn ghost danger",onclick:async e=>{
        if(busy) return;
        if(!confirm(`“${myShop.name}” dükkânı, ${myProducts.length} ürünü ve fotoğraflarıyla birlikte silinsin mi? Bu geri alınamaz.`)) return;
        busy=true; e.target.disabled=true;
        const photos=myProducts.flatMap(p=>p.photos);
        const {error}=await sb.from("shops").delete().eq("id",uid()); // ürünler veritabanında birlikte silinir (on delete cascade)
        if(!error&&photos.length) await sb.storage.from("product-photos").remove(photos);
        busy=false; editId=null;
        setFlash(error?"Dükkân silinemedi, tekrar dene.":"Dükkânın, ürünlerin ve fotoğrafların silindi. Hesabının tamamen kapatılmasını istersen Aydınlatma Metni’ndeki adrese yazabilirsin.");
        await loadMine(); renderPanel(); loadMarket();
      }},"Dükkânımı sil")):null);

  const right=el("div",{class:"card"});
  if(!myShop){ right.append(el("h3",{text:"Ürünler"}),el("p",{class:"muted",text:"Önce dükkân bilgilerini kaydet; sonra ürün ekleyebilirsin."})); }
  else{
    // düzenleme: aynı form, mevcut ürünün değerleriyle dolar
    const ed=editId?myProducts.find(x=>x.id===editId)||null:null; if(!ed) editId=null;
    let keep=ed?[...ed.photos]:[]; // korunacak mevcut fotoğraflar
    const pName=el("input",{id:"p-name",maxlength:"60",required:true,placeholder:"Örn. Beyaz zambak demeti"});
    const pCat=el("select",{id:"p-cat"},...CATS.map(c=>el("option",{value:c},c)));
    const pSp=el("select",{id:"p-sp"},el("option",{value:""},"Rehberde yok / diğer"),...FLOWERS.map(f=>el("option",{value:f.id},f.name)));
    const pColor=el("select",{id:"p-color"});
    const fillColors=()=>{ const f=BY_ID[pSp.value]; pColor.replaceChildren(el("option",{value:""},"—"),...(f?f.colors:COLOR_FAMILIES.map(([n])=>({n}))).map(c=>el("option",{value:c.n},c.n))); };
    pSp.addEventListener("change",fillColors); fillColors();
    const pPrice=el("input",{id:"p-price",type:"number",min:"0",max:"1000000",step:"0.01",required:true,inputmode:"decimal"});
    const pStock=el("input",{id:"p-stock",type:"number",min:"0",max:"9999",step:"1",value:"1"});
    const pDesc=el("textarea",{id:"p-desc",maxlength:"600",placeholder:"Boy, saksı çapı, kaç dal, bakım notu…"});
    const pFiles=el("input",{id:"p-files",type:"file",accept:"image/jpeg,image/png,image/webp",multiple:true});
    const prev=el("div",{class:"previews"}), pErr=el("p",{class:"err","aria-live":"polite"});
    const slots=()=>4-keep.length;
    const fileHelp=el("span",{class:"help"});
    const paintFileHelp=()=>{ fileHelp.textContent=`JPG, PNG ya da WEBP. Yüklemeden önce küçültülür, konum bilgisi silinir. ${slots()?`${slots()} fotoğraf daha ekleyebilirsin.`:"4 fotoğraf sınırı doldu; yeni eklemek için birini kaldır."}`; pFiles.disabled=!slots(); };
    const paintPrev=()=>{ prev.replaceChildren(...[...pFiles.files].slice(0,slots()).filter(f=>/^image\/(jpeg|png|webp)$/.test(f.type)).map(f=>el("img",{src:URL.createObjectURL(f),alt:""}))); };
    pFiles.addEventListener("change",paintPrev);
    // mevcut fotoğraflar: her birinin "kaldır" düğmesi
    const keepBox=el("div",{class:"keep"});
    const paintKeep=()=>{
      keepBox.replaceChildren(...keep.map(p=>el("span",{class:"kp"},el("img",{src:photoURL(p),alt:""}),
        el("button",{type:"button",class:"x","aria-label":"Bu fotoğrafı kaldır",onclick:()=>{ keep=keep.filter(x=>x!==p); paintKeep(); paintFileHelp(); paintPrev(); }},"×"))));
    };
    if(ed){
      pName.value=ed.name; pCat.value=ed.cat; pSp.value=ed.species; fillColors(); pColor.value=ed.color;
      pPrice.value=String(ed.price); pStock.value=String(ed.stock); pDesc.value=ed.desc;
      paintKeep();
    }
    paintFileHelp();
    const addBtn=el("button",{class:"btn warm",type:"submit",text:ed?"Değişiklikleri kaydet":"Ürünü ekle"});
    const idleText=addBtn.textContent;
    const prodForm=el("form",{id:"prodform",onsubmit:async e=>{
      e.preventDefault(); pErr.textContent=""; if(busy) return;
      const name=clampStr(pName.value,60), price=Number(pPrice.value), stock=Math.floor(Number(pStock.value)||0);
      if(name.length<2){ pErr.textContent="Ürün adı en az 2 karakter olmalı."; return; }
      if(!isFinite(price)||price<0||price>1e6){ pErr.textContent="Fiyat 0 ile 1.000.000 TL arasında olmalı."; return; }
      if(stock<0||stock>9999){ pErr.textContent="Stok 0 ile 9999 arasında olmalı."; return; }
      const files=[...pFiles.files].slice(0,slots());
      for(const f of files){ if(!/^image\/(jpeg|png|webp)$/.test(f.type)){ pErr.textContent=`“${f.name}” desteklenmiyor. JPG, PNG ya da WEBP seç.`; return; } if(f.size>15*1024*1024){ pErr.textContent=`“${f.name}” 15 MB’tan büyük.`; return; } }
      busy=true; addBtn.disabled=true; addBtn.textContent=files.length?"Fotoğraflar yükleniyor…":ed?"Kaydediliyor…":"Ekleniyor…";
      const uploaded=[];
      try{
        for(const f of files){
          const blob=await reencode(f), ext=blob.type==="image/webp"?"webp":"jpg";
          const path=`${uid()}/${crypto.randomUUID()}.${ext}`;
          const {error}=await sb.storage.from("product-photos").upload(path,blob,{contentType:blob.type,cacheControl:"31536000",upsert:false});
          if(error) throw {step:"upload"}; uploaded.push(path);
        }
        const row={name,cat:pCat.value,species:pSp.value,color:clampStr(pColor.value,20),price,stock,description:clampStr(pDesc.value,600),photos:[...keep,...uploaded]};
        if(ed){
          // RLS başka birinin ürününü sessizce 0 satırla geçer; dönen satırla doğrula
          const {data,error}=await sb.from("products").update(row).eq("id",ed.id).eq("shop_id",uid()).select("id");
          if(error||!data?.length) throw {step:"update",msg:error?.message};
          const dropped=ed.photos.filter(p=>!keep.includes(p));
          if(dropped.length) await sb.storage.from("product-photos").remove(dropped);
          editId=null; setFlash("Ürün güncellendi.");
        }else{
          const {error}=await sb.from("products").insert({shop_id:uid(),...row});
          if(error) throw {step:"insert",msg:error.message};
          setFlash("Ürün vitrine eklendi.");
        }
        await loadMine(); renderPanel(); loadMarket();
      }catch(err){
        if(uploaded.length) await sb.storage.from("product-photos").remove(uploaded);
        pErr.textContent = err.step==="upload" ? "Fotoğraf yüklenemedi. Dosyayı küçültüp tekrar dene." : /200/.test(err.msg||"") ? "Bir dükkânda en fazla 200 ürün olabilir." : ed ? "Değişiklikler kaydedilemedi, tekrar dene." : "Ürün eklenemedi, tekrar dene.";
      }finally{ busy=false; addBtn.disabled=false; addBtn.textContent=idleText; }
    }},
      el("h3",{text:ed?`Ürünü düzenle: ${ed.name}`:"Yeni ürün"}),
      el("div",{class:"field"},el("label",{for:"p-name",text:"Ürün adı"}),pName),
      el("div",{class:"two"},el("div",{class:"field"},el("label",{for:"p-cat",text:"Kategori"}),pCat),el("div",{class:"field"},el("label",{for:"p-sp",text:"Bitki türü"}),pSp,el("span",{class:"help",text:"Seçersen vitrinde 3B görünüm ve bakım rehberi bağlanır."}))),
      el("div",{class:"two"},el("div",{class:"field"},el("label",{for:"p-color",text:"Renk"}),pColor),el("div",{class:"field"},el("label",{for:"p-price",text:"Fiyat (TL)"}),pPrice)),
      el("div",{class:"two"},el("div",{class:"field"},el("label",{for:"p-stock",text:"Stok"}),pStock),el("div")),
      el("div",{class:"field"},el("label",{for:"p-desc",text:"Açıklama"}),pDesc),
      el("div",{class:"field"},el("label",{for:"p-files",text:"Fotoğraflar (en fazla 4)"}),ed?keepBox:null,pFiles,fileHelp,prev),
      el("div",{class:"row"},addBtn,ed?el("button",{type:"button",class:"btn ghost",onclick:()=>{ editId=null; renderPanel(); }},"Vazgeç"):null),pErr);
    const mine=el("ul",{class:"mine"},...myProducts.map(it=>el("li",{class:it.id===editId?"editing":null},
      el("div",{class:"t"},it.photos[0]?el("img",{src:photoURL(it.photos[0]),alt:""}):flowerThumb(it.species,it.color)),
      el("div",null,el("b",{text:it.name}),el("div",{class:"muted",text:`${fmtTL(it.price)} · ${it.stock>0?`stok ${it.stock}`:"tükendi"}`}),
        el("div",{class:"stats",text:`${myStats[it.id]?.views||0} görüntülenme · ${myStats[it.id]?.wa||0} WhatsApp tıklaması`})),
      el("div",{class:"acts"},
        el("button",{class:"btn ghost",type:"button","aria-label":`${it.name} ürününü düzenle`,onclick:()=>{
          if(busy) return; editId=it.id; renderPanel();
          document.getElementById("prodform")?.scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"}); document.getElementById("p-name")?.focus({preventScroll:true});
        }},"Düzenle"),
        el("button",{class:"btn ghost",type:"button","aria-label":`${it.name} ürününü kaldır`,onclick:async e=>{
          if(busy) return;
          if(!confirm(`“${it.name}” vitrinden kaldırılsın mı? Bu geri alınamaz.`)) return;
          busy=true; e.target.disabled=true;
          const {error}=await sb.from("products").delete().eq("id",it.id);
          if(!error && it.photos.length) await sb.storage.from("product-photos").remove(it.photos);
          if(!error && editId===it.id) editId=null;
          busy=false; setFlash(error?"Ürün kaldırılamadı.":"Ürün kaldırıldı."); await loadMine(); renderPanel(); loadMarket();
        }},"Kaldır")))));
    right.append(prodForm,el("h3",{style:"margin-top:30px",text:`Vitrindeki ürünlerin (${myProducts.length})`}),myProducts.length?mine:el("p",{class:"muted",text:"Henüz ürün yok."}));
  }
  const fl=flash; flash="";
  box.replaceChildren(fl?el("p",{class:"ok",role:"status",style:"font-size:1.05rem;margin:0 0 16px",text:fl}):"",el("div",{class:"panel"},shopForm,right),isAdmin?reportsCard():"",isAdmin?meaningsCard():"");
}
// Görseli yeniden kodla: boyutu küçült, EXIF/konum ve gömülü veriyi at
async function reencode(file){
  const bmp=await createImageBitmap(file); const max=1600, k=Math.min(1,max/Math.max(bmp.width,bmp.height));
  const c=document.createElement("canvas"); c.width=Math.round(bmp.width*k); c.height=Math.round(bmp.height*k);
  c.getContext("2d").drawImage(bmp,0,0,c.width,c.height); bmp.close&&bmp.close();
  const b=await new Promise(r=>c.toBlob(r,"image/webp",.86)); if(b&&b.type==="image/webp"&&b.size<5e6) return b;
  return await new Promise(r=>c.toBlob(r,"image/jpeg",.82));
}

/* =========================================================
   8b. ARAÇLAR: evcil hayvan dostu mod, "Bana uygun bitki bul", sorun teşhisi
   ========================================================= */
let petMode=(()=>{ try{ return localStorage.getItem("sera.pet")==="1"; }catch(e){ return false; } })();
function setPetMode(on){
  petMode=!!on; try{ localStorage.setItem("sera.pet",petMode?"1":"0"); }catch(e){}
  document.querySelectorAll("input.petmode").forEach(c=>{ c.checked=petMode; });
  renderRelated();
  if(document.getElementById("v-renkler").classList.contains("on")) renderColors();
  if(document.getElementById("v-pazar").classList.contains("on")) renderMarket();
}
document.querySelectorAll("input.petmode").forEach(c=>{ c.checked=petMode; c.addEventListener("change",()=>setPetMode(c.checked)); });

const toolDlg=document.getElementById("tooldlg");
toolDlg?.addEventListener("click",e=>{ if(e.target===toolDlg) toolDlg.close(); }); // eski önbellekli sayfa + yeni kod durumunda çökmesin
function toolFrame(title,...body){
  toolDlg.replaceChildren(el("button",{class:"close","aria-label":"Kapat",onclick:()=>toolDlg.close()},"×"),
    el("div",{class:"tool-in"},el("h2",{id:"tool-title",text:title}),...nodes(body)));
  if(!toolDlg.open) toolDlg.showModal();
  toolDlg.querySelector(".tool-in button, .tool-in a")?.focus();
}
const choiceList=(opts,pick)=>el("div",{class:"choices"},...opts.map(o=>el("button",{type:"button",class:"choice",onclick:()=>pick(o.v)},o.t,o.d?el("small",{text:o.d}):null)));
async function thumbFor(f,img){ const m=await plantMedia(f); if(m.photos[0]) img.src=m.photos[0].thumb; }

/* --- Bana uygun bitki bul --- */
const FAMILY_NAMES=COLOR_FAMILIES.map(([n])=>n);
function openFinder(){
  const a={place:null,light:2,water:2,pet:petMode,color:""};
  const steps=[
    {k:"place",q:"Bitki nerede duracak?",opts:[{v:"ev",t:"Ev içinde"},{v:"balkon",t:"Balkon ya da teras"},{v:"bahce",t:"Bahçede"},{v:"hediye",t:"Hediye edeceğim",d:"Kesme çiçek ya da saksı"}]},
    {k:"light",q:"Orası ne kadar aydınlık?",skip:()=>a.place==="hediye",opts:[{v:1,t:"Az",d:"Kuzey cephe ya da pencereden uzak"},{v:2,t:"Orta",d:"Aydınlık oda, dolaylı ışık"},{v:3,t:"Bol",d:"Günde birkaç saat doğrudan güneş"}]},
    {k:"water",q:"Sulamaya ne kadar vaktin var?",skip:()=>a.place==="hediye",opts:[{v:1,t:"Az",d:"Unutkanım, ara sıra sularım"},{v:2,t:"Orta",d:"Haftada bir sularım"},{v:3,t:"Çok",d:"Sık sularım, ilgilenmeyi severim"}]},
    {k:"pet",q:"Evde kedi ya da köpek var mı?",opts:[{v:true,t:"Var",d:"Yalnızca zehirsiz bitkileri öner"},{v:false,t:"Yok"}]},
    {k:"color",q:"Bir renk tercihin var mı?",opts:[{v:"",t:"Fark etmez"},...FAMILY_NAMES.map(n=>({v:n,t:n}))]}
  ];
  const ask=i=>{
    while(i<steps.length&&steps[i].skip?.()) i++;
    if(i>=steps.length) return showFinderResults(a);
    const st=steps[i], total=steps.filter(s=>!s.skip?.()).length, nr=steps.slice(0,i+1).filter(s=>!s.skip?.()).length;
    toolFrame("Sana uygun bitkiyi bulalım",el("p",{class:"muted",text:`Soru ${nr} / ${total}`}),el("h3",{text:st.q}),
      choiceList(st.opts,v=>{ a[st.k]=v; ask(i+1); }),
      i>0?el("button",{type:"button",class:"linkbtn small",onclick:()=>{ let j=i-1; while(j>0&&steps[j].skip?.()) j--; ask(j); }},"Geri"):null);
  };
  ask(0);
}
function scorePlant(f,a){
  const why=[]; let s=0;
  if(a.pet&&!isPetSafe(f)) return null;
  if(!(PLACES[f.id]||[]).includes(a.place)) return null;
  if(a.place!=="hediye"){
    const L=f.care.light[0], W=f.care.water[0];
    if(L>a.light){ s-=3*(L-a.light); } else if(L===a.light){ s+=2; why.push("Işık isteği seçtiğin yere uyuyor"); } else { s-=1; }
    if(W>a.water){ s-=2*(W-a.water); } else if(W===1&&a.water===1){ s+=2; why.push("Az suyla idare eder"); } else if(W===a.water){ s+=1; why.push("Sulama temposu sana uyar"); } else if(a.water-W>1){ s-=1; why.push("Fazla sulamaya dikkat"); }
  } else why.push("Hediyelik olarak sık tercih edilir");
  if(a.color){ const has=f.colors.some(c=>familyOf(c.n)===a.color); if(has){ s+=2; why.push(`${a.color} renkleri var`); } else s-=2; }
  if(isPetSafe(f)) why.push("Kedi ve köpekler için zehirsiz");
  return {f,s,why};
}
function showFinderResults(a){
  const rows=FLOWERS.map(f=>scorePlant(f,a)).filter(Boolean).sort((x,y)=>y.s-x.s).slice(0,5);
  const notes=[];
  if(a.light===1&&a.place!=="hediye") notes.push("Rehberdeki bitkilerin hiçbiri gerçekten az ışığı sevmiyor; aşağıdakiler en iyi idare edenler. Yine de onları evin en aydınlık köşesine koy.");
  if(a.pet) notes.push("Yalnızca kedi ve köpekler için zehirsiz kabul edilen bitkiler gösteriliyor.");
  const label=s=>s>=3?"Çok uygun":s>=0?"Uygun":"Biraz zahmetli";
  toolFrame(rows.length?"Sana uygun bitkiler":"Uygun bitki bulunamadı",
    ...notes.map(t=>el("p",{class:"muted",text:t})),
    rows.length?el("ul",{class:"finder-res"},...rows.map(({f,s,why})=>{
      const img=el("img",{alt:"",loading:"lazy"}); thumbFor(f,img);
      const inMarket=PRODUCTS.filter(p=>p.species===f.id&&p.stock>0).length;
      return el("li",null,el("span",{class:"fr-ph"},img),
        el("div",null,el("b",{text:f.name}),el("span",{class:"fit fit-"+(s>=3?"hi":s>=0?"mid":"lo"),text:label(s)}),
          el("ul",{class:"why"},...why.map(w=>el("li",{text:w}))),
          el("div",{class:"row"},
            el("button",{class:"btn",type:"button",onclick:()=>{ toolDlg.close(); location.hash="rehber"; showFlower(f,0,{scroll:true}); }},"Bakımını gör"),
            inMarket?el("button",{class:"btn ghost",type:"button",onclick:()=>{ toolDlg.close(); mQuery=f.name; document.getElementById("mq").value=f.name; location.hash="pazar"; }},`Çiçekçilerde (${inMarket})`):null)));
    })):el("p",{text:"Seçimlerine tam uyan bir bitki rehberde yok. Işık ya da yer seçimini değiştirerek yeniden dene."}),
    el("div",{class:"row"},el("button",{class:"btn ghost",type:"button",onclick:openFinder},"Baştan başla")));
}

/* --- Sorun teşhisi --- */
function openDiagnosis(f=null){
  const plant=f&&BY_ID[f.id]?f:null;
  const head=plant?el("p",{class:"muted",text:`${plant.name} için`}):null;
  toolFrame("Bitkinde ne sorun var?",head,el("h3",{text:"Ne görüyorsun?"}),
    choiceList(DIAG.map(d=>({v:d.id,t:d.t})),id=>{
      const d=DIAG.find(x=>x.id===id);
      if(d.opts.length===1) return showDiag(d,0,plant);
      toolFrame(d.t,head,el("h3",{text:d.q}),choiceList(d.opts.map((o,i)=>({v:i,t:o.t})),i=>showDiag(d,i,plant)),
        el("button",{type:"button",class:"linkbtn small",onclick:()=>openDiagnosis(plant)},"Geri"));
    }),
    el("p",{class:"disclaimer",text:"Genel bahçecilik bilgisidir; birden fazla neden aynı belirtiyi verebilir."}));
}
function showDiag(d,i,plant){
  const o=d.opts[i], note=diagNote(d.id,i,plant);
  toolFrame("Olası neden",
    el("p",{class:"diag-cause",text:o.cause}),
    note?el("div",{class:"caution"},svg(ICON.warn),el("p",null,el("b",{text:`${plant.name}: `}),note)):null,
    el("h3",{text:"Ne yapmalı?"}),
    el("ol",{class:"diag-steps"},...o.steps.map(t=>el("li",{text:t}))),
    plant?el("p",{class:"muted"},"Bu bitkinin bakımı: ",el("span",{text:`ışık — ${plant.care.light[1]}; su — ${plant.care.water[1]}`})):null,
    el("div",{class:"row"},
      el("button",{class:"btn ghost",type:"button",onclick:()=>openDiagnosis(plant)},"Başka bir belirti"),
      el("button",{class:"btn",type:"button",onclick:()=>toolDlg.close()},"Tamam")));
}
document.getElementById("finderbtn")?.addEventListener("click",openFinder);
document.getElementById("diagbtn")?.addEventListener("click",()=>openDiagnosis(current&&BY_ID[current.id]?current:null));

/* =========================================================
   9a. KAYDIRINCA SAÇILAN TAÇ YAPRAKLAR (2B tuval, hafif)
   Aşağı kaydırdıkça seçili çiçeğin renginde yapraklar sahneden kopup ekrana dağılır.
   prefers-reduced-motion açıksa hiç çalışmaz; sekme gizliyken durur.
   ========================================================= */
const Petals=(()=>{
  if(reduced) return {burst(){}};
  const cv=el("canvas",{class:"petals","aria-hidden":"true"}); document.body.append(cv);
  const ctx=cv.getContext("2d"); let W=0,H=0,dpr=1,list=[],raf=0,lastY=scrollY,carry=0;
  const MAX=80;
  const fit=()=>{ dpr=Math.min(devicePixelRatio||1,2); W=innerWidth; H=innerHeight; cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); };
  fit(); addEventListener("resize",fit);
  const palette=()=>{ if(!current) return ["#D46F8C","#E9AE35"]; const sel=safeHex(current.colors[currentColor].hex); return [sel,sel,sel,...current.colors.map(c=>safeHex(c.hex))]; };
  const lighten=(hex,k)=>{ const n=parseInt(hex.slice(1),16); const f=v=>Math.round(v+(255-v)*k); return `rgb(${f(n>>16)},${f(n>>8&255)},${f(n&255)})`; };
  function spawn(n){
    // yapraklar sahneden (görünüyorsa) ya da ekranın üstünden kopar
    const r=stageHost.getBoundingClientRect(), fromStage=r.bottom>0&&r.top<H&&document.getElementById("v-rehber").classList.contains("on");
    const pal=palette();
    for(let i=0;i<n&&list.length<MAX;i++){
      const x=fromStage?r.left+r.width*(.3+Math.random()*.4):Math.random()*W, y=fromStage?r.top+r.height*(.25+Math.random()*.3):-20;
      const a=Math.random()*Math.PI*2, sp=fromStage?1.5+Math.random()*3:0;
      list.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-(fromStage?1:0)+.4,rot:Math.random()*6.3,vr:(Math.random()-.5)*.08,sway:Math.random()*6.3,
        s:7+Math.random()*9,c:pal[(Math.random()*pal.length)|0],age:0});
    }
    if(!raf) raf=requestAnimationFrame(tick);
  }
  function drawPetal(p){
    const flip=Math.cos(p.sway*1.3); // dönerken ince görünür: sahte 3B
    ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.scale(1,.35+.65*Math.abs(flip));
    const g=ctx.createLinearGradient(0,-p.s,0,p.s); g.addColorStop(0,lighten(p.c,.55)); g.addColorStop(1,p.c);
    ctx.fillStyle=g; ctx.globalAlpha=Math.min(1,p.age/8)*Math.max(0,Math.min(1,(H+20-p.y)/80));
    ctx.beginPath(); ctx.moveTo(0,-p.s);
    ctx.bezierCurveTo(p.s*.85,-p.s*.55,p.s*.6,p.s*.75,0,p.s); ctx.bezierCurveTo(-p.s*.6,p.s*.75,-p.s*.85,-p.s*.55,0,-p.s);
    ctx.fill(); ctx.globalAlpha*=.25; ctx.strokeStyle=lighten(p.c,.8); ctx.lineWidth=.8; ctx.beginPath(); ctx.moveTo(0,-p.s*.7); ctx.lineTo(0,p.s*.8); ctx.stroke(); // damar
    ctx.restore();
  }
  function tick(){
    raf=0; if(document.hidden){ list=[]; ctx.clearRect(0,0,W,H); return; }
    ctx.clearRect(0,0,W,H);
    for(const p of list){ p.age++; p.sway+=.05; p.vx*=.985; p.vy=p.vy*.985+.045; p.x+=p.vx+Math.sin(p.sway)*.7; p.y+=p.vy; p.rot+=p.vr; drawPetal(p); }
    list=list.filter(p=>p.y<H+40&&p.x>-60&&p.x<W+60);
    if(list.length) raf=requestAnimationFrame(tick);
  }
  addEventListener("scroll",()=>{
    const dy=scrollY-lastY; lastY=scrollY;
    const v=document.querySelector("section.view.on")?.id;
    if(dy<=0||(v!=="v-rehber"&&v!=="v-renkler")) return;
    carry+=Math.min(dy,240)/38; const n=carry|0; carry-=n; if(n) spawn(n);
  },{passive:true});
  return {burst:n=>spawn(n)};
})();

/* =========================================================
   9b. BİTKİLERİM — sulama hatırlatıcısı (yalnızca bu tarayıcıda)
   ========================================================= */
const MY_KEY="sera.bitkilerim.v1", DAY=864e5;
const WATER_DAYS={1:14,2:7,3:3}; // bakım kartındaki su düzeyi -> varsayılan sulama aralığı (gün)
const INTERVALS=[2,3,4,5,7,10,14,21];
function loadMy(){
  try{
    const raw=JSON.parse(localStorage.getItem(MY_KEY)||"[]");
    return (Array.isArray(raw)?raw:[]).filter(x=>x&&BY_ID[x.id]).slice(0,60).map(x=>({
      id:x.id, ci:Math.max(0,Math.min(BY_ID[x.id].colors.length-1,Math.floor(+x.ci||0))),
      every:INTERVALS.includes(+x.every)?+x.every:WATER_DAYS[BY_ID[x.id].care.water[0]]||7,
      last:Number.isFinite(+x.last)?+x.last:Date.now(), added:Number.isFinite(+x.added)?+x.added:Date.now()}));
  }catch(e){ return []; }
}
function saveMy(list){ try{ localStorage.setItem(MY_KEY,JSON.stringify(list)); }catch(e){} paintDueBadge(); }
const startOfDay=t=>{ const d=new Date(t); d.setHours(0,0,0,0); return d.getTime(); };
const nextDue=x=>startOfDay(x.last)+x.every*DAY;
const daysLeft=x=>Math.round((nextDue(x)-startOfDay(Date.now()))/DAY);
function paintDueBadge(){
  const n=loadMy().filter(x=>daysLeft(x)<=0).length, b=document.getElementById("duebadge");
  b.hidden=!n; b.textContent=n?String(n):""; b.setAttribute("aria-label",n?`${n} bitki bugün su istiyor`:"");
}
function myPlantButton(f){
  const has=()=>loadMy().some(x=>x.id===f.id);
  const btn=el("button",{type:"button",class:"btn ghost",onclick:()=>{
    let list=loadMy();
    if(has()){ location.hash="bitkilerim"; return; }
    list.push({id:f.id,ci:currentColor,every:WATER_DAYS[f.care.water[0]]||7,last:Date.now(),added:Date.now()});
    saveMy(list); paint();
  }});
  const paint=()=>{ btn.textContent=has()?"Bitkilerimde ✓ — listeye git":"Bitkilerime ekle"; };
  paint();
  return el("div",{class:"myplant"},btn,el("span",{class:"muted",text:`Varsayılan: ${WATER_DAYS[f.care.water[0]]||7} günde bir sulama hatırlatması`}));
}
function dueText(n){ return n<0?`${-n} gün gecikti`:n===0?"Bugün sulanmalı":n===1?"Yarın":`${n} gün sonra`; }
function renderMy(){
  const box=document.getElementById("mybox"), list=loadMy().sort((a,b)=>nextDue(a)-nextDue(b));
  if(!list.length){
    box.replaceChildren(el("div",{class:"empty"},el("h3",{text:"Henüz bitki eklemedin"}),
      el("p",{text:"Bakım rehberinde bir bitki aç ve “Bitkilerime ekle”ye bas. Sulama günü gelince burada ve sekmede gösteririz."}),
      el("a",{class:"btn",href:"#rehber",style:"display:inline-block;text-decoration:none"},"Bakım rehberine git")));
    return;
  }
  const fmt=t=>new Intl.DateTimeFormat("tr-TR",{weekday:"long",day:"numeric",month:"long"}).format(t);
  const update=(id,fn)=>{ const l=loadMy(); const x=l.find(y=>y.id===id); if(x){ fn(x,l); saveMy(l.filter(y=>!y.gone)); } renderMy(); };
  box.replaceChildren(
    el("ul",{class:"mylist"},...list.map(x=>{
      const f=BY_ID[x.id], c=f.colors[x.ci], n=daysLeft(x);
      const sel=el("select",{"aria-label":`${f.name} sulama aralığı`,onchange:e=>update(x.id,y=>{ y.every=+e.target.value; })},
        ...INTERVALS.map(d=>el("option",{value:String(d),selected:d===x.every},`${d} günde bir`)));
      return el("li",{class:n<=0?"due":null},
        el("span",{class:"c",style:`background:${safeHex(c.hex)}`}),
        el("div",null,
          el("a",{href:plantPath(f,x.ci),class:"nm",onclick:e=>{ e.preventDefault(); history.pushState(null,"",plantPath(f,x.ci)); showFlower(f,x.ci,{history:"none"}); route(); }},`${c.n} ${f.name.toLocaleLowerCase("tr")}`),
          el("div",{class:"when",text:`${dueText(n)} · ${fmt(nextDue(x))}`}),
          el("div",{class:"muted",text:f.care.water[1]})),
        el("div",{class:"acts"},
          el("button",{class:n<=0?"btn":"btn ghost",type:"button",onclick:()=>update(x.id,y=>{ y.last=Date.now(); })},"Suladım"),
          sel,
          el("button",{class:"linkbtn small",type:"button",onclick:()=>{ if(confirm(`${f.name} listenden çıkarılsın mı?`)) update(x.id,y=>{ y.gone=true; }); }},"Çıkar")));
    })),
    el("div",{class:"row mytools"},
      el("button",{class:"btn ghost",type:"button",onclick:()=>downloadIcs(list)},"Takvimime ekle (.ics)"),
      "Notification" in window&&Notification.permission!=="granted"&&Notification.permission!=="denied"
        ?el("button",{class:"btn ghost",type:"button",onclick:async()=>{ await Notification.requestPermission(); notifyDue(true); renderMy(); }},"Hatırlatma bildirimine izin ver"):null),
    el("p",{class:"muted",text:"Takvim dosyası, telefonunun takviminde her bitki için tekrarlayan bir sulama hatırlatması oluşturur; site kapalıyken de çalışır. Bildirim ise site açıldığında gösterilir."}));
}
/* .ics: her bitki için tekrarlayan, tüm gün süren etkinlik + sabah 9'da hatırlatma */
function downloadIcs(list){
  const d=t=>{ const x=new Date(t); return `${x.getFullYear()}${String(x.getMonth()+1).padStart(2,"0")}${String(x.getDate()).padStart(2,"0")}`; };
  const esc=s=>String(s).replace(/[\\;,]/g,m=>"\\"+m).replace(/\n/g,"\\n");
  const stamp=new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d+Z$/,"Z");
  const ev=list.map(x=>{ const f=BY_ID[x.id], due=Math.max(nextDue(x),startOfDay(Date.now()));
    return ["BEGIN:VEVENT",`UID:${x.id}-${x.added}@sera-defteri`,`DTSTAMP:${stamp}`,`DTSTART;VALUE=DATE:${d(due)}`,`DTEND;VALUE=DATE:${d(due+DAY)}`,
      `RRULE:FREQ=DAILY;INTERVAL=${x.every}`,`SUMMARY:${esc(f.name+" — sulama günü")}`,`DESCRIPTION:${esc(f.care.water[1])}`,
      "BEGIN:VALARM","ACTION:DISPLAY",`DESCRIPTION:${esc(f.name+" su istiyor")}`,"TRIGGER:PT9H","END:VALARM","END:VEVENT"].join("\r\n"); });
  const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Sera Defteri//Bitkilerim//TR","CALSCALE:GREGORIAN",...ev,"END:VCALENDAR"].join("\r\n")+"\r\n";
  const url=URL.createObjectURL(new Blob([ics],{type:"text/calendar;charset=utf-8"}));
  const a=el("a",{href:url,download:"bitkilerim.ics"}); document.body.append(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),5000);
}
/* site açıldığında, günde en fazla bir kez: bugün su isteyen bitkiler */
async function notifyDue(force=false){
  if(!("Notification" in window)||Notification.permission!=="granted") return;
  const due=loadMy().filter(x=>daysLeft(x)<=0); if(!due.length) return;
  const today=new Date().toDateString();
  try{ if(!force&&localStorage.getItem("sera.notified")===today) return; localStorage.setItem("sera.notified",today); }catch(e){}
  const body=due.map(x=>BY_ID[x.id].name).join(", ")+(due.length>1?" su istiyor.":" su istiyor.");
  try{ const reg=await navigator.serviceWorker?.getRegistration?.(); if(reg) reg.showNotification("Sulama günü",{body,icon:"/favicon.svg",tag:"sulama"}); else new Notification("Sulama günü",{body,icon:"/favicon.svg"}); }catch(e){}
}

/* =========================================================
   10. YÖNLENDİRME + BAŞLANGIÇ
   ========================================================= */
const VIEWS=["rehber","renkler","pazar","bitkilerim","panel"];
const SHOP_RE=/^\/dukkan\/([0-9a-f-]{36})\/?$/;
async function loadShopInfo(id){
  if(PRODUCTS.some(p=>p.shop.id===id)||!sb) return;
  const {data}=await sb.from("shops").select("id,name,city,phone,about").eq("id",id).maybeSingle();
  if(shopFilter!==id) return;
  shopInfo=data&&UUID_RE.test(data.id||"")?{id:data.id,name:clampStr(data.name,60)||"Çiçekçi",city:clampStr(data.city,30),phone:/^[+0-9 ()-]{7,20}$/.test(data.phone||"")?data.phone:"",about:clampStr(data.about,300)}:{id,name:"Bu çiçekçi bulunamadı",city:"",phone:"",about:""};
  renderMarket();
}
function route(){
  const h=location.hash.slice(1), sm=location.pathname.match(SHOP_RE);
  const inShop=!!sm&&!VIEWS.includes(h)&&!isAuthHash(); // /dukkan/:id -> pazar, yalnızca o çiçekçi
  const v=VIEWS.includes(h)?h:inShop?"pazar":"rehber";
  // başka bölüme geçince bitki/dükkân adresi bırakılır (/bitki/x#pazar -> /#pazar); rehbere dönünce bitkinin adresi geri gelir
  if(!isAuthHash()){
    if(v!=="rehber"&&location.pathname!=="/"&&!inShop){ history.replaceState(null,"","/#"+v); document.title=SITE_TITLE; }
    else if(v==="rehber"&&current&&!current.ai&&(location.hash||sm)) syncUrl("replace");
  }
  const nextShop=inShop?sm[1]:null;
  if(nextShop!==shopFilter){ shopFilter=nextShop; shopInfo=null; if(shopFilter) loadShopInfo(shopFilter); else if(v==="pazar") document.title=SITE_TITLE; }
  VIEWS.forEach(x=>document.getElementById("v-"+x).classList.toggle("on",x===v));
  document.querySelectorAll("nav.tabs a").forEach(a=>{ if(a.dataset.v===v) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
  if(v==="renkler") renderColors(); if(v==="pazar"){ renderMarket(); buildCats(); } if(v==="panel") renderPanel(); if(v==="bitkilerim") renderMy();
  if(stage){ stage.visible = v==="rehber"; if(stage.visible) { stage.resize(); stage.loop(); } }
  if(v!=="rehber") scrollTo({top:0});
}
addEventListener("hashchange",route);
// geri/ileri: adresteki bitkiyi yeniden aç
addEventListener("popstate",()=>{ const p=plantFromUrl(); if(p&&(p.f!==current||p.ci!==currentColor)) showFlower(p.f,p.ci,{history:"none"}); route(); });
// Supabase'in e-posta dönüşü URL'de #access_token… bırakır; oturum açılınca panele geçilir
const AUTH_RETURN=isAuthHash();
const start=plantFromUrl();
if(!start&&location.pathname!=="/"&&!SHOP_RE.test(location.pathname)&&!AUTH_RETURN) history.replaceState(null,"","/"+location.hash); // bilinmeyen bitki adresi
route();
showFlower(start?.f||BY_ID.zambak,start?.ci||0,{history:start?"replace":"none"});
loadMarket();
paintDueBadge(); notifyDue(); loadMeanings();
// çevrimdışı çalışma ve "ana ekrana ekle" için
if("serviceWorker" in navigator) addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));
if(sb){
  sb.auth.onAuthStateChange((event,s)=>{ setTimeout(async()=>{ // supabase-js: geri çağrı içinde doğrudan sorgu beklenmez
    session=s; document.getElementById("who").textContent=s?.user?.email||"";
    if(event==="PASSWORD_RECOVERY") authMode="newpass"; // şifre sıfırlama bağlantısından gelindi
    await loadMine();
    if((AUTH_RETURN||authMode==="newpass")&&s&&location.hash!=="#panel") location.hash="panel";
    if(location.hash==="#panel") renderPanel();
  },0); });
}
