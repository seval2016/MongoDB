/*
Neden NoSQL db ?

1. Big Data - Büyük Veri -> Büyük veri ile NoSQl bir puzzle iki parçası gibi
2. NoSQL lerin ortaya çıkma sebeplerinden birisi de veri çeşitliliği

    * Structured - Yapısal veriler
    Belirli bir düzende, gerektiğinde aralarında ilşkiler oluşturabileceğimiz tablolar halinde tutulmasını sağlayan yapısal verilerdir.

    * Semi-Structured - Yarı yapısal veriler
    Semi-Structured -> Tabloda her bir veriye karşılık gelen key value şeklinde fieldlarda tutulan kod yapıları.(JSON gibi) Tablolar kadar kesın kuralları yoktur. Kod parçaları arasında farklılıklar olabilir. Esneklik vardır. Bir kişi yada ürüne ait veriler aynı yerde tutulabilir.

    * Unstructured - Yapısal olmayan veriler
    Hiçbir yapısı olmayan videolar,fotograflar,içerisinde ne olduğunu bilmediğimiz fakat analiz etmek istediğimiz dökümanlar gibi belli bir yapısı olmayan veriler vardır ve bu tarz verileri Structured yada Semi - Structured tablolarda saklayamayız. Bu tarz verileri saklamak için NoSQL de özel saklama alanları var.

3.  Query Response Time (Sorgu Cevaplama Süresi)



                RDBMS                                                NoSQL
                ACID                                                  Base
                                                   |
    Atomicity: Bütünlük,Ya hep yahiç               |    Basic Availability : Amaç hızlı cevap ve
                                                   |    erişilebilir olmaktır.
    Consistency: Tutarlılık,mevcut verinin         |
    yeni değeri alabilmesi                         |    Soft State: Tutarlılık konusunda esnektir.
                                                   |
    Isolation: Tek işlem ilgili veri kilitlenir,   |    Eventualy Consistency: İşlemler
    işlemler seri halde yapılır                    |    sistemin durumuna göre diğer
                                                   |    sunuculara yansır.Neredeyse tutarlı
    Durability: Dayanıklılık, Hataya               |    bir sistem
    dayanıklılıktır. Hata anında eski              |
    değere dönebilir.                              |
                                                   |
            Dikey Ölçeklendirme                    |            Yatay Ölçeklendirme
                  Scale Up                                            Scale Out


                                       Tutarlılık vs Erişilebilirlik

4. Vertical Scaling : Eski bir yöntemdir. Verilerin kapasitesi yetmediği durumda server kapasitesini değiştirmek. Bu durum veri miktarı arttıkça maliyetli olmaktadır. Bu zamanla problem olmaktadır.

Horizontal Scaling :Verilerin kapasitesi yetmediği durumda server kapasitesini değiştirmek yerine aynı kapasitede başka bir server kullanmak. ve bu iki server'ı birlikte kullanılıyor.

Bu iki durumda da iyi ve kötü yönler bulunmaktadır. Birini bırakıp diğerini alamayız. En azından şimdilik bunu yapamadığımız için hibrit bir kullanım modeli sağlıyoruz. Bu da RDMS + NoSQL şeklinde olur.

5. Büyük veri kaynakları :

    * Sosyal medya verileri,
    * Mobil telefon uygulama verileri,
    * Sensör verileri(akıllı ev,otonom araçlar vs),
    * Log verileri ("internetteki ayak izlerimiz" dediğimiz veriler),
    * Gerçek zamanlı veri analizi ihtiyacı, yapay zeka teknolojilerinin veriye bağımlılığı


- NoSQL kategorilendirme tipleri ve en çok kullanılan NoSQL veritabanları
    * Document tipi NoSQL (MongoDB,CouchDB,RavenDB)
    * Graph tipi NoSQL (Neo4j,Amazon Neptune,ArangoDB)
    * Key-Value tipi NoSQL (Amazon DynamoDB,Apache Cassandra,Redis)
    * Wide-column tipi NoSQL (Cassandra,Apache HBase,Google Bigtable)


=================================== Mongo DB ===================================

* Açık Kaynak
* Belge tabanlı (document-oriented) bir NoSQL veritabanıdır.
* MongoDB de her kayıt bir döküman olarak tutulur.
* Dökümanlar JSON benzeri Binary JSON (BSN) formatında saklanır.
* Herhangi bir scheması yoktur. Yani yapılarda farklı veriler saklanabilir
* Scability (çlçeklenebilirlik )
* Replikasyon(Kopyalama)
* Load Balancing (Yük dengeleme)
* Sorgulama Kolaylığı
* Indexleme


RDBMS           |       MongoDB
------------------------------------
Table,view      |     Collection
Row             |     Document
Index           |     Index
Join            |     Embedded Document
Foreign Key     |     Reference
Partition       |     Sharding


Relational table sütun isimleri : OneToMany ilişki  var yani bir kişinin birden fazla arabası olabilir
Person Table: Pers_ID | Surname | First_Name | City |
Car Table : Car_ID |Model | Year | Value | Pers_ID |

MongoDB Document :
{
    first_name: 'Paul',
    surname:'Miller',
    city:'London',
    location:'[45.123,47.232]',
    cars:
    [
        {
            model:'Bently',
            year:'1973',
            value:100000,.....
        },
        {
            model:'Rolls Royce',
            year:'1965',
            value:330000,.....

        }
    ]
}



 */