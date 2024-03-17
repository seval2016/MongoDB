*** DAY 1 ***
1-ekranı temizleme

* cls 

2-shop isminde bir DB oluşturalım.

*use dbname

3-hangi DB deyim

* db

4-tüm DB leri görelim

* show databases

5-customers isminde bir
collection oluşturalım.

*db.createCollection("customers") 
veya
* db.getCollectionNames()

6-tüm collectionları görelim

* show collections

7-customers collectionını
silelim.

* db.customers.drop()

8-shop DB yi silelim

db.dropDatabase()

9-yeni bir DB(products)
ve içine bir collection
ekleyelim:electronics

db.createCollection("elektronic")

10-electronics collectionına
bir document insert edelim.

db.electronics.insertOne({"name":"TV","price":230})

db.electronics.insertOne({"name":"Sefiller","price":230})

NOT:olmayan bir collectiona document eklemek istersek otomatik collectionı oluşturup documentı ekler.

11-bir collecitona birden fazla
document ekleyelim.

db.electronics.insertMany([{"name":"ipad","price":110},{"name":"radio","price":80},{"name":"iphone","price":250,"tax":1.2}])

Not:insertMany parametre olarak document dizisi aldığı için [] ile kullanılır.

Not:String data tipi için "" veya '' kullanılabilir. Hata vermez

12-tüm documentları listeleyelim.

db.electronics.find()

13-sadece ilk 2 documentı
görelim.

db.electronics.find().limit(2)

14-sadece 2-4 arasındaki documentları
görelim.

db.electronics.find().skip(1).limit(2)

15-name i airpod olan documentları
görelim.

db.electronics.insertOne({name:"airpod",price:180})

Not:find({filter}) filter özelliği vardır.

16-name i airpod ve price:90
olan documentları görelim

db.electronics.find({"name":"airport",price:90})

veya

db.electronics.find({$and:[{"name":"airpod"},{"price":80}]})

17-name i airpod veya price:110
olan documentları görelim

db.electronics.find({$or:[{"name":"airpod"},{"price":80}]})

18-sadece belirli fieldları
görelim.

-sadece priceları görelim.

db.electronics.find({$or:[{"name":"airpod"},{"price":80}]},{"price":1})


-sadece priceları görelim,
_id de olmasın.

db.electronics.find({$or:[{"name":"airpod"},{"price":80}]},{"price":1,"_id":0})

NOT:find({filter},{projection})

NOT:projectionda bazı fieldları 
değeri 0/1 verilmiş ise
değeri verilmeyen 
fieldların değerini 1/0 kabul eder. 

NOT:_id nin projection değeri
default olarak 1 dir.

19-tüm documentları görüntüleyelim
sadece price ve name bilgileri gelsin.

db.electronics.find({},{name:1,price:1,"_id":0})

20-yukarıdaki sorguyu price değerine
göre sıralayalım.

db.electronics.find({},{name:1,price:1,"_id":0}).sort("price")

21-yukarıdaki sorguyu price değerine
göre azalan sıralayalım.

db.electronics.find({},{name:1,price:1,"_id":0}).sort({"price":-1})

22-name:airpod olan documentları 
price değerine göre azalan sıralayalım.

db.electronics.find({name:"airpod"}).sort({"price":-1})


23-collectiondaki tüm documentlardan ilkini
görelim.

db.electronics.findOne()

alternatifi :

db.electronics.find().limit(1)


24-collectiondaki name:radio olan 
documentlardan ilkini görelim.

db.electronics.findOne({"name":"radio"})


**********
Comparison Operators
    Eşitlik     ==> $eq
    Küçüktür    ==> $lt
    Büyüktür    ==> $gt
    Küçük eşit  ==> $lte
    Büyük eşit  ==> $gte
    Eşit değil  ==> $ne
    Dizi içinde ==> $in
    Dizi değil  ==> $nin

**********  

25-price ı 180 olan tüm documentları
görelim

db.electronics.find({"price" : {$eq:180}})

alternatifi:

db.electronics.find({price:180})

26-price ı 180 veya daha az olan 
tüm documentları görelim

db.electronics.find({"price" : {$lte:180}})

27-yukarıdaki sorguda _id gözükmesin.

db.electronics.find({"price" : {$lte:180}},{"_id":0})

28-price ı 100, 80 veya 230 olan 
documentların sadece name ve price
değerlerini görelim

db.electronics.find({"price":{$in:[80,100,230]}},{"name":1,"price":1,"_id":0})

29-price ı 50, 99 ve 90 olmayan 
documentların sadece name ve price
değerlerini görelim.

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


30-price ı 100 den az olan documentlardan
ilkini

name:"mobilphone"
price:250

olan document ile değiştiriniz.


//=================================================================

MONGODB-NOTLAR

-non-sql bir database dir
-tablo kullanmaz key value şeklinde Json data kullanır
-Mongodb açık kaynak bir database dir ve ücretsizdir
-Mongo db facebook en yaygın kullnaım alanıdır, sosyal medyada cok kullanılır,
 guvenlık sevıyesı dusuk alanlarda kullanılır
-RDBMS olmadığı için datalar arası ilişki yoktu.
-windows,linux ve mac uyumludur
-Java, php, Node js, Python, C# gibi bir çok dili destekler
-Farklı Non-sql databaseler:Amazon Documentdb, google datastore gibi,
-En yaygın olanı Mongodb
-Join gibi kompleks yapılar yoktur. Bunu yerine daha rahat anlaşılır
ve kullanılabilir Aggregations yapıları vardır.

-colllectionlar da öğrenci bilgilerini saklıyoruz
-JSON formatı= mongodb de isim giriyorum dediğimizde Strıngı mongodb gırıyor, 
yaş gircem dedıgımde mongodb yaşa integer atıyor.
-integer,boolean,aray,strıng gibi data tipleri kullanılıyor aşırı esnek yapıya sahip
-oop çok yakın bir tipi var mongodb nın

Mongodb ve RDBMS farkları

-Document içindeki field sayıları, içerikleri ve boyutları farklı olabilir.
-Karmaşık yapıdaki Join işlemleri yoktur.
-Yazılan Query ler daha basit ama SQL Query leri kadar güçlüdür.
-SQL ile Java arasında köprü görevi olarak Hİbernate kullanılıyor. Mongodb yapı olarak 
oop ye yakın oldugu için böyle bir ihtiyaç yoktur.
-Dataya ulaşma konusunda index yapısı kullanıldığından en hızlılarındandır.
Büyük kitapların sonundaki index gibi. Oldukça hızlı şekilde dataya ulaşmayı sağlar.

Mongodb nin sunucusunu lokelimize kurduktan sonra çalışır. 27017 serverınde calısır.
Mongodb compass te shell gömülü sekilde geliyor buna mongosh deniliyor.