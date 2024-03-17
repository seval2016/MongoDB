//*** DAY 2***

use("products");
db.electronics.find();

use("products");
db.electronics.insertMany([
  { name: "iron", price: 110 },
  { name: "ipod", price: 110 },
  { name: "radio", price: 105 },
  { name: "iphone14", price: 270.99, tax: 1.2 },
  { name: "airpod", price: 180 },
  { name: "airpod", price: 100, tax: 1.02 },
]);

//=================================================================
//            findOneAndUpdate - findOneAndReplace
//=================================================================

// A - findOneAndReplace()
//----------------------------
//   1-) belirtilen koşullara uyan ilk dökümanı bulur ve degistirir.
//   2-) Komut icerisinde belirtilen kisimlari guncellerken bos birakilan
//       alanlari kaldirir. (API lerdeki PUT metoduna benzetilebilir).
//   3-) Islem sonunda ilgili dokumanin guncellenmemiş halini gosterir.
//       yani ben bunu değiştirdim diye haber veriyor

//
// B - findOneAndUpdate()
//----------------------------
///  1-) Belirtilen koşullara uyan ilk dökümanı bulur ve günceller.
//   2-) Komut icerisinde belirtilen kisimlari guncellerken bos birakilan
//       alanlari modifiye etmez  (API lerdeki PATCH metoduna benzetilebilir).
//   3-) komutun kosul kismindan sonra degislikileri gerceklestirmek icin bir
//       atomic operator kullanilir.
//       ($set (direk değer verilirse), $inc(arttırma azaltma), $mul (çarpma)vb.)
//   4)  Islem sonunda ilgili dokumanin guncellenMEmiş halini gosterir.

//=================================================================
// ÖNEMLİ : !!!  bu 2 kod çalıştığında dökümanın update olmamış hali ekrana gelir.
// SYNTAX : ( {filter}, {update}, {options})

/*30-price ı 100 den az olan documentlardan
ilkini

name:"mobilphone"
price:250

olan document ile değiştiriniz.*/

use("products");
db.electronics.findOneAndReplace(
  { price: { $lt: 100 } },
  { name: "mobilphone", price: 250 }
);

/* 31-price ı 100 den fazla olan 
documentlardan price ı en büyük 
olan documentı 

"name":"en pahalı"

documentı ile değiştiriniz. */

use("products");
db.electronics.findOneAndReplace(
  { price: { $gt: 100 } },
  { name: "en pahalı" },
  { sort: { price: -1 } }
);

/* 32-price ı 100 den fazla olan 
documentlardan price ı en küçük
olan documentı 

"name":"en ucuz"

olarak güncelleyiniz. */

use("products");
db.electronics.findOneAndUpdate(
  { price: { $gt: 100 } },
  { $set: { name: "en ucuz" } },
  { sort: "price" }
);

use("products");
db.electronics.find();

/* 33-price ı 200 den az olan 
documentlardan price ı en küçük
olan documentın price değerini 
100 artırınız ve GÜNCELLENEN 
documentı görüntüleyiniz. */

use("products");
db.electronics.findOneAndUpdate(
  { price: { $lt: 200 } },
  { $inc: { price: 100 } },
  { sort: "price", returnNewDocument: true }
);

/* 34-birden fazla documentı update edelim.
price ı 110 olan tüm documentların

"name":"woooww"

 olarak güncelleyiniz.  */

use("products");
db.electronics.updateMany({ price: 110 }, { $set: { name: "woooww" } });

/* 35-bir documentı silme
"name":"en pahalı" olan ilk documentı silelim/ */

use("products");
db.electronics.deleteOne({ name: "en pahalı" });

/* 36-birden fazla documentı silelim

"name":"woooww"

olan tüm documentları silelim */

use("products");
db.electronics.deleteMany({ name: "woooww" });

// 37-tüm documentları silelim.

use("products");
db.electronics.deleteMany({});

// deprecated
use("product");
db.electronics.remove({});

//=================================================
//                   AGGREGATION
//=================================================
// 1) Aggregation, dokumanlardaki verilerin islenmesi ve hesaplanan
//    sonuclarin donmesini saglayan islemlerdir.
//
// 2) Aggregation islemleri, farklı dokumanlardaki degerleri gruplandirabilir.
//
// 3) Bu gruplanan veriler uzerinde cesitli islemlerin gereceklestirelerek tek
//    bir sonuc degerinin donmesi saglanabilir.
//
// 4) MongoDB, 3 farklı yontem ile aggregation gerceklestirmeye izin verir.
//     A) aggregation pipeline (toplama boru hattı) --> best practice...
//     B) map-reduce function (map indirgeme)
//     C) single-purpose aggregation (tek-amaç toplama)
//
// 5) Aggregation ile SQL deki Join gibi işlemler yapılabilir.
//=================================================
//             AGGREGATION PIPELINE
//=================================================
// SYNTAX
//
//   pipeline = [
//   { $match : { … }},//stage:aşama
//   { $group : { … }},
//   { $sort : { … }},
//      ...
//   ]
//   db.collectionName.aggregate({pipeline}, {options})
//
//  $match() –> Verileri secerken filtrelemek icin
//  $group:{_id : "$field"} - >istenen verilerin gruplanmasi icin
//NOT:buradaki _id anahtar kelimesi group operatörünün syntaxindedir, belirleyici görevi görür.
//  $sort() -> Sonuclarin siralanmasi icin

use("okul");
db.grades.insertMany([
  { _id: 6305, name: "A. MacDyver", assignment: 5, points: 24 },
  { _id: 6308, name: "B. Batlock", assignment: 3, points: 22 },
  { _id: 6312, name: "M. Tagnum", assignment: 5, points: 30 },
  { _id: 6319, name: "R. Stiles", assignment: 2, points: 12 },
  { _id: 6322, name: "A. MacDyver", assignment: 2, points: 14 },
  { _id: 6334, name: "R. Stiles", assignment: 1, points: 10 },
  { _id: 6345, name: "A. Stiles", assignment: 1, points: 10 },
]);

use("okul");
db.grades.find();

//1-her bir assignment için toplam puanları listeleyelim.

//1.gruplama
//var bir data tipi(JS)

use("okul");
var pipeline = [
  { $group: { _id: "$assignment", total_points: { $sum: "$points" } } }, //sadece 1 stage/aşama
];
db.grades.aggregate(pipeline);

//ya da

use("okul");
db.grades.aggregate({
  $group: { _id: "$assignment", total_points: { $sum: "$points" } },
});

//2-assignment değeri 4 ten küçük olan her bir assignment için
//max puanları hesaplayıp azalan şekilde listeleyelim

//1.aşama(stage)---filtreleme : assignment<4
//2.aşama(stage)---gruplama:assignment, max
//3.aşama(stage)---sıralama:DESC

use("okul");
var pipeline = [
  { $match: { assignment: { $lt: 4 } } }, //1.aşama
  { $group: { _id: "$assignment", max_point: { $max: "$points" } } }, //2.aşama
  { $sort: { max_point: -1 } }, //3.aşama
];

db.grades.aggregate(pipeline);

//3-ismi A ile başlayan documentların toplam puanlarını
//hesaplayıp listeleyelim.

// 1.filtreleme
// 2.gruplamadan toplama işlemi

use("okul");
var pipeline = [
  { $match: { name: { $regex: "^A" } } }, //1.aşama
  { $group: { _id: "", total: { $sum: "$points" } } }
];

db.grades.aggregate(pipeline);

//4-points değeri 19 dan düşük olan documentların
//sayısını bulunuz.

use("okul");
db.grades.find({"points":{$lt:19}}).count();

//veya

use("okul");
var pipeline = [
  { $match: { points: {$lt:19 } } }, //1.aşama
  { $count:"düşük_puanlar" }
];

db.grades.aggregate(pipeline);

//================================================

use("okul")
db.exams.insertMany(
[{"student":"dave", "midterm":80,  "final":100},
{"student":"dave",  "midterm":85,  "final":52},
{"student":"fred",  "midterm":60,  "final":100},
{"student":"wilma", "midterm":55,  "final":50},
{"student":"barnie","midterm":60,  "final":75},
{"student":"wilma", "midterm":94,  "final":99},
{"student":"betty", "midterm":95,  "final":91}]);

use("okul")
db.accounting.insertMany(
[{"name":"dave", "expense":[-80, -40, -50, -120], "earn":[100, 150]},
{"name":"dave",  "expense":[-60, -30, -20],       "earn":[200, 50, 130]},
{"name":"fred",  "expense":[-80, -40, -50],       "earn":[300, 450]},
{"name":"wilma", "expense":[-80, -120],           "earn":[500, 50, 70, 10]},
{"name":"barnie","expense":[-140, -50, -120],     "earn":[400]},
{"name":"wilma", "expense":[-120],                "earn":[22, 375, 65]},
{"name":"betty", "expense":[-180, -40, -70, -12], "earn":[500, 650, 400]}]);

use("okul");
db.exams.find();


//5-exams collectionında tüm documentların midterm ve final değerlerini
//result ismindeki bir field ile listeleyelim.
//result değerine göre artan sıralayalım.


use("okul");
var pipeline = [
  {
    $addFields: {
      "result": {
        $sum: ["$midterm", "$final"]
      }
    }
  },
  {
    $sort: { result: 1 }
  }
];

db.exams.aggregate(pipeline);


//6-accounting collectionında her bir documentda expense ve earn ile
//birlikte total_expense ve total_earn olarak toplam gider ve gelirleri
//listeleyelim.

use("okul");
var pipeline=[
    {$addFields:{"total_exp":{$sum:"$expense"}, "total_earn":{$sum:"$earn"}}},
    {$project:{"_id":0,"earn":0,"expense":0}}
]
db.accounting.aggregate(pipeline);

//7-accounting collectionında her bir documentda 
// toplam gider ve gelirleri ve net karı(net_balance)
//listeleyelim.

use("okul");
var pipeline=[
    {$addFields:{"total_exp":{$sum:"$expense"}, "total_earn":{$sum:"$earn"}}},
    {$addFields:{"net_balance":{$sum:["$total_exp","$total_earn"]}}},
    {$sort:{"net_balance":1}},
    {$project:{"_id":0,"earn":0,"expense":0}}
]
db.accounting.aggregate(pipeline);