import type { Question } from '#shared/types/quiz'
import { choice } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })

export const DB_API: Question[] = [
  // ───────── Databases · Junior ─────────
  choice({
    id: 'db-j-where', level: 'junior', topic: 'databases',
    prompt: W('أي جزء في الاستعلام يحدد الصفوف التي تُرجع؟', 'Which clause decides which rows come back?', 'Sorguda hangi satırların döneceğini hangi kısım belirler?'),
    code: `SELECT name FROM users WHERE age > 18;`, codeLang: 'sql',
    options: ['WHERE', 'ORDER BY', 'GROUP BY', 'FROM'],
    answer: 0,
    why: W('WHERE يفلتر الصفوف قبل إرجاعها. FROM يحدد الجدول، وORDER BY يرتب، وGROUP BY يجمع الصفوف في مجموعات.',
      'WHERE filters rows before they are returned. FROM picks the table, ORDER BY sorts and GROUP BY groups rows.',
      'WHERE satırları döndürmeden önce süzer. FROM tabloyu seçer, ORDER BY sıralar, GROUP BY gruplar.'),
  }),
  choice({
    id: 'db-j-primary-key', level: 'junior', topic: 'databases',
    prompt: W('ما وظيفة المفتاح الأساسي (PRIMARY KEY)؟', 'What is a PRIMARY KEY for?', 'PRIMARY KEY ne işe yarar?'),
    options: L3(
      ['يعرّف كل صف بقيمة فريدة لا تكون NULL', 'يشفّر الجدول', 'يرتب الصفوف أبجديًا', 'يربط الجدول بالخادم'],
      ['It identifies each row with a unique, non-null value', 'It encrypts the table', 'It sorts rows alphabetically', 'It links the table to the server'],
      ['Her satırı benzersiz ve NULL olmayan bir değerle tanımlar', 'Tabloyu şifreler', 'Satırları alfabetik sıralar', 'Tabloyu sunucuya bağlar'],
    ),
    answer: 0,
    why: W('المفتاح الأساسي يضمن أن لكل صف معرّفًا مختلفًا، وقاعدة البيانات تنشئ له فهرسًا تلقائيًا، وتستخدمه الجداول الأخرى للربط.',
      'A primary key guarantees every row has a different id. The database indexes it automatically, and other tables use it to link rows.',
      'Birincil anahtar her satırın farklı bir kimliği olmasını garanti eder. Veritabanı onu otomatik indeksler; diğer tablolar bağlantı için kullanır.'),
  }),
  choice({
    id: 'db-j-count-null', level: 'junior', topic: 'databases',
    prompt: W('الجدول فيه 5 مستخدمين، اثنان منهم email عندهم NULL. ما نتيجة الاستعلام؟', 'The table has 5 users; 2 have a NULL email. What does the query return?', 'Tabloda 5 kullanıcı var; 2’sinin email’i NULL. Sorgu ne döndürür?'),
    code: `SELECT COUNT(email) FROM users;`, codeLang: 'sql',
    options: ['3', '5', '2', 'NULL'],
    answer: 0,
    why: W('COUNT(column) يعدّ القيم غير الفارغة فقط. لعدّ كل الصفوف استخدم COUNT(*) فتكون النتيجة 5.',
      'COUNT(column) only counts non-null values. To count every row, use COUNT(*), which gives 5.',
      'COUNT(sütun) sadece NULL olmayan değerleri sayar. Tüm satırlar için COUNT(*) kullan; sonuç 5 olur.'),
  }),
  choice({
    id: 'db-j-inner-join', level: 'junior', topic: 'databases',
    prompt: W('ماذا يرجع INNER JOIN بين users وorders؟', 'What does an INNER JOIN between users and orders return?', 'users ile orders arasındaki INNER JOIN ne döndürür?'),
    code: `SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON o.user_id = u.id;`, codeLang: 'sql',
    options: L3(
      ['المستخدمين الذين لهم طلبات فقط، مع طلباتهم', 'كل المستخدمين حتى من ليس لهم طلبات', 'كل الطلبات حتى بدون مستخدم', 'المستخدمين بدون طلبات فقط'],
      ['Only users who have orders, with their orders', 'Every user, even those with no orders', 'Every order, even with no user', 'Only users without orders'],
      ['Sadece siparişi olan kullanıcılar ve siparişleri', 'Siparişi olmayanlar dahil tüm kullanıcılar', 'Kullanıcısı olmayanlar dahil tüm siparişler', 'Sadece siparişi olmayan kullanıcılar'],
    ),
    answer: 0,
    why: W('INNER JOIN يرجع الصفوف التي لها تطابق في الجدولين فقط. لإظهار كل المستخدمين حتى بدون طلبات استخدم LEFT JOIN.',
      'INNER JOIN returns only rows with a match in both tables. To keep every user, even without orders, use LEFT JOIN.',
      'INNER JOIN sadece iki tabloda da eşleşen satırları döndürür. Siparişi olmayanlar dahil tüm kullanıcılar için LEFT JOIN kullan.'),
  }),
  choice({
    id: 'db-j-order-limit', level: 'junior', topic: 'databases',
    prompt: W('ماذا يرجع هذا الاستعلام؟', 'What does this query return?', 'Bu sorgu ne döndürür?'),
    code: `SELECT name, price FROM products
ORDER BY price DESC
LIMIT 3;`, codeLang: 'sql',
    options: L3(
      ['أغلى 3 منتجات', 'أرخص 3 منتجات', 'أول 3 منتجات أُضيفت', '3 منتجات عشوائية'],
      ['The 3 most expensive products', 'The 3 cheapest products', 'The first 3 products added', '3 random products'],
      ['En pahalı 3 ürün', 'En ucuz 3 ürün', 'İlk eklenen 3 ürün', 'Rastgele 3 ürün'],
    ),
    answer: 0,
    why: W('DESC يرتب من الأكبر للأصغر، ثم LIMIT 3 يأخذ أول ثلاثة. بدون DESC يكون الترتيب تصاعديًا (ASC).',
      'DESC sorts from highest to lowest, then LIMIT 3 takes the first three. Without DESC the order is ascending (ASC).',
      'DESC büyükten küçüğe sıralar, LIMIT 3 ilk üçünü alır. DESC olmadan sıralama artan (ASC) olur.'),
  }),
  choice({
    id: 'db-j-delete-no-where', level: 'junior', topic: 'databases',
    prompt: W('ماذا يحدث عند تنفيذ هذا السطر؟', 'What happens when this runs?', 'Bu çalışınca ne olur?'),
    code: `DELETE FROM orders;`, codeLang: 'sql',
    options: L3(
      ['تُحذف كل صفوف الجدول', 'يُحذف آخر صف فقط', 'يُحذف الجدول نفسه مع بنيته', 'خطأ لأن WHERE إجباري'],
      ['Every row in the table is deleted', 'Only the last row is deleted', 'The table and its structure are dropped', 'An error, because WHERE is required'],
      ['Tablodaki tüm satırlar silinir', 'Sadece son satır silinir', 'Tablo yapısıyla birlikte silinir', 'Hata, çünkü WHERE zorunlu'],
    ),
    answer: 0,
    why: W('DELETE بدون WHERE يحذف كل الصفوف ويبقي الجدول فارغًا. أما حذف الجدول نفسه فيكون بـ DROP TABLE. اكتب WHERE دائمًا، وجرّب الشرط بـ SELECT أولًا.',
      'DELETE without WHERE removes every row and leaves an empty table. Dropping the table itself is DROP TABLE. Always write the WHERE, and test it with a SELECT first.',
      'WHERE’siz DELETE tüm satırları siler, tablo boş kalır. Tablonun kendisini silmek DROP TABLE’dır. WHERE’i hep yaz ve önce SELECT ile dene.'),
  }),
  choice({
    id: 'db-j-foreign-key', level: 'junior', topic: 'databases',
    prompt: W('ما فائدة FOREIGN KEY على orders.user_id؟', 'What does a FOREIGN KEY on orders.user_id do?', 'orders.user_id üzerindeki FOREIGN KEY ne yapar?'),
    code: `ALTER TABLE orders
ADD FOREIGN KEY (user_id) REFERENCES users(id);`, codeLang: 'sql',
    options: L3(
      ['يمنع إضافة طلب لمستخدم غير موجود', 'يجعل user_id فريدًا', 'يسرّع كل الاستعلامات تلقائيًا', 'ينسخ بيانات المستخدم إلى الطلب'],
      ['It stops an order from pointing at a user that does not exist', 'It makes user_id unique', 'It speeds up every query automatically', 'It copies user data into the order'],
      ['Var olmayan bir kullanıcıya sipariş eklenmesini engeller', 'user_id’yi benzersiz yapar', 'Tüm sorguları otomatik hızlandırır', 'Kullanıcı verisini siparişe kopyalar'],
    ),
    answer: 0,
    why: W('المفتاح الأجنبي يحافظ على سلامة العلاقات: لا طلب بدون مستخدم حقيقي. ويمكن أن يحدد ماذا يحدث عند حذف المستخدم (ON DELETE CASCADE مثلًا).',
      'A foreign key keeps relations consistent: no order without a real user. It can also say what happens when the user is deleted (for example ON DELETE CASCADE).',
      'Yabancı anahtar ilişkileri tutarlı tutar: gerçek kullanıcı olmadan sipariş olmaz. Kullanıcı silinince ne olacağını da belirleyebilir (ör. ON DELETE CASCADE).'),
  }),

  // ───────── Databases · Mid ─────────
  choice({
    id: 'db-m-index-cost', level: 'mid', topic: 'databases',
    prompt: W('أضفت فهرسًا على عمود email. ما الثمن الذي تدفعه مقابل سرعة البحث؟', 'You add an index on email. What do you pay for the faster lookups?', 'email’e indeks ekledin. Hızlı arama için ne ödersin?'),
    code: `CREATE INDEX idx_users_email ON users(email);`, codeLang: 'sql',
    options: L3(
      ['كتابة أبطأ قليلًا (INSERT/UPDATE) ومساحة تخزين إضافية', 'لا شيء', 'قراءات أبطأ', 'لا يمكن تعديل email بعدها'],
      ['Slightly slower writes (INSERT/UPDATE) and extra storage', 'Nothing', 'Slower reads', 'email can no longer be changed'],
      ['Biraz daha yavaş yazma (INSERT/UPDATE) ve ek depolama', 'Hiçbir şey', 'Daha yavaş okuma', 'email artık değiştirilemez'],
    ),
    answer: 0,
    why: W('كل كتابة تحدّث الجدول والفهرس معًا، والفهرس يأخذ مساحة. لذلك نضع الفهارس على الأعمدة المستخدمة فعلًا في البحث والربط والترتيب.',
      'Every write updates both the table and the index, and the index takes space. So index the columns you really filter, join or sort on.',
      'Her yazma hem tabloyu hem indeksi günceller ve indeks yer kaplar. Bu yüzden gerçekten filtrelediğin, birleştirdiğin veya sıraladığın sütunları indeksle.'),
  }),
  choice({
    id: 'db-m-left-join', level: 'mid', topic: 'databases',
    prompt: W('ماذا يظهر لمستخدم ليس له أي طلب؟', 'What shows for a user with no orders?', 'Hiç siparişi olmayan bir kullanıcı için ne görünür?'),
    code: `SELECT u.name, o.id AS order_id
FROM users u
LEFT JOIN orders o ON o.user_id = u.id;`, codeLang: 'sql',
    options: L3(
      ['صف باسمه وorder_id = NULL', 'لا يظهر', 'صف بـ order_id = 0', 'خطأ في الاستعلام'],
      ['A row with the name and order_id = NULL', 'They do not appear', 'A row with order_id = 0', 'A query error'],
      ['Adıyla ve order_id = NULL ile bir satır', 'Görünmez', 'order_id = 0 olan bir satır', 'Sorgu hatası'],
    ),
    answer: 0,
    why: W('LEFT JOIN يبقي كل صفوف الجدول الأيسر، ويملأ أعمدة الجدول الأيمن بـ NULL عند عدم التطابق. ولإيجاد المستخدمين بدون طلبات أضف WHERE o.id IS NULL.',
      'LEFT JOIN keeps every row of the left table and fills the right side with NULL when nothing matches. To find users with no orders, add WHERE o.id IS NULL.',
      'LEFT JOIN sol tablonun tüm satırlarını tutar, eşleşme yoksa sağ tarafı NULL ile doldurur. Siparişi olmayanları bulmak için WHERE o.id IS NULL ekle.'),
  }),
  choice({
    id: 'db-m-having', level: 'mid', topic: 'databases',
    prompt: W('تريد العملاء الذين لديهم أكثر من 5 طلبات. ما الصحيح؟', 'You want customers with more than 5 orders. Which is right?', '5’ten fazla siparişi olan müşterileri istiyorsun. Hangisi doğru?'),
    options: [
      'GROUP BY customer_id HAVING COUNT(*) > 5',
      'WHERE COUNT(*) > 5 GROUP BY customer_id',
      'GROUP BY customer_id WHERE COUNT(*) > 5',
      'ORDER BY COUNT(*) > 5',
    ],
    answer: 0, codeLang: 'sql',
    why: W('WHERE يعمل على الصفوف قبل التجميع، فلا يعرف COUNT. HAVING يفلتر المجموعات بعد GROUP BY.',
      'WHERE runs on rows before grouping, so it cannot see COUNT. HAVING filters groups after GROUP BY.',
      'WHERE gruplamadan önce satırlarda çalışır, COUNT’u göremez. HAVING, GROUP BY’dan sonra grupları süzer.'),
  }),
  choice({
    id: 'db-m-transaction', level: 'mid', topic: 'databases',
    prompt: W('تحويل مال بين حسابين بخطوتين. لماذا نضعهما في transaction؟', 'A money transfer takes two updates. Why put them in a transaction?', 'Para transferi iki güncelleme gerektiriyor. Neden bir transaction içine koyarız?'),
    code: `BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`, codeLang: 'sql',
    options: L3(
      ['لتنجح الخطوتان معًا أو تُلغيا معًا إذا فشلت إحداهما', 'لتصبح أسرع', 'لتُنفّذا بالتوازي', 'لتسجيل العملية في ملف'],
      ['So both succeed together, or both are undone if one fails', 'To make them faster', 'To run them in parallel', 'To log the operation to a file'],
      ['İkisi birlikte başarılı olsun ya da biri başarısızsa ikisi de geri alınsın diye', 'Daha hızlı olsunlar diye', 'Paralel çalışsınlar diye', 'İşlemi dosyaya kaydetmek için'],
    ),
    answer: 0,
    why: W('هذه خاصية الذرّية (Atomicity) في ACID: لو تعطل الخادم بعد الخصم وقبل الإضافة، تُلغى العملية كلها بـ ROLLBACK ولا يضيع المال.',
      'This is atomicity, the A in ACID: if the server crashes after the debit but before the credit, everything is rolled back and no money disappears.',
      'Bu ACID’deki atomiklik: sunucu, para çekildikten sonra ama eklenmeden önce çökerse her şey ROLLBACK ile geri alınır, para kaybolmaz.'),
  }),
  choice({
    id: 'db-m-n-plus-one', level: 'mid', topic: 'databases',
    prompt: W('ما المشكلة في هذا الكود عندما يكون عدد المستخدمين 500؟', 'What is the problem with this code when there are 500 users?', '500 kullanıcı olduğunda bu kodun sorunu nedir?'),
    code: `const users = await db.query('SELECT * FROM users');
for (const user of users) {
  user.orders = await db.query(
    'SELECT * FROM orders WHERE user_id = ?', [user.id]);
}`, codeLang: 'js',
    options: L3(
      ['N+1: استعلام واحد ثم 500 استعلام إضافي، والحل JOIN أو WHERE user_id IN (...)', 'لا مشكلة', 'خطأ في الصيغة', 'سيرجع المستخدم الأول فقط'],
      ['N+1: one query, then 500 more. Use a JOIN or WHERE user_id IN (...)', 'No problem', 'A syntax error', 'Only the first user comes back'],
      ['N+1: bir sorgu, ardından 500 sorgu daha. JOIN veya WHERE user_id IN (...) kullan', 'Sorun yok', 'Söz dizimi hatası', 'Sadece ilk kullanıcı döner'],
    ),
    answer: 0,
    why: W('كل استعلام فيه رحلة إلى قاعدة البيانات، فـ 501 رحلة تجعل الصفحة بطيئة. اجلب الطلبات كلها مرة واحدة ووزّعها في الكود، أو استخدم eager loading في الـ ORM.',
      'Each query is a round trip to the database, so 501 trips make the page slow. Fetch all orders at once and group them in code, or use eager loading in your ORM.',
      'Her sorgu veritabanına bir gidiş-dönüştür; 501 gidiş sayfayı yavaşlatır. Tüm siparişleri tek seferde çekip kodda dağıt ya da ORM’de eager loading kullan.'),
  }),
  choice({
    id: 'db-m-is-null', level: 'mid', topic: 'databases',
    prompt: W('لماذا لا يرجع هذا الاستعلام أي صف رغم وجود صفوف deleted_at فيها NULL؟', 'Why does this return no rows even though some have deleted_at = NULL?', 'Bazı satırlarda deleted_at NULL olduğu halde bu sorgu neden satır döndürmüyor?'),
    code: `SELECT * FROM posts WHERE deleted_at = NULL;`, codeLang: 'sql',
    options: L3(
      ['المقارنة مع NULL بـ = نتيجتها «غير معروف» دائمًا، ويجب كتابة IS NULL', 'NULL غير مدعوم في SQL', 'يجب كتابة \'NULL\' بين علامتي تنصيص', 'الجدول فارغ'],
      ['Comparing with NULL using = is always "unknown"; write IS NULL', 'SQL does not support NULL', 'NULL must be written in quotes', 'The table is empty'],
      ['NULL ile = karşılaştırması her zaman "bilinmez" olur; IS NULL yaz', 'SQL NULL’ı desteklemez', 'NULL tırnak içinde yazılmalı', 'Tablo boş'],
    ),
    answer: 0,
    why: W('NULL يعني «قيمة مجهولة»، وأي مقارنة معه بـ = أو != تعطي UNKNOWN فلا يمر الصف. استخدم IS NULL وIS NOT NULL.',
      'NULL means "unknown", and any comparison with = or != gives UNKNOWN, so no row passes. Use IS NULL and IS NOT NULL.',
      'NULL "bilinmeyen" demektir; = veya != ile her karşılaştırma UNKNOWN verir, satır geçmez. IS NULL ve IS NOT NULL kullan.'),
  }),
  choice({
    id: 'db-m-composite-index', level: 'mid', topic: 'databases',
    prompt: W('يوجد فهرس على (last_name, first_name). أي استعلام لا يستفيد منه بشكل جيد؟', 'There is an index on (last_name, first_name). Which query cannot use it well?', '(last_name, first_name) üzerinde indeks var. Hangi sorgu onu iyi kullanamaz?'),
    options: [
      "WHERE first_name = 'Sara'",
      "WHERE last_name = 'Ali'",
      "WHERE last_name = 'Ali' AND first_name = 'Sara'",
      "WHERE last_name LIKE 'Al%'",
    ],
    answer: 0, codeLang: 'sql',
    why: W('الفهرس المركّب مرتب حسب العمود الأول ثم الثاني، مثل دليل الهاتف. البحث بالاسم الأول وحده يشبه البحث في الدليل بالاسم الأول: يجب المرور على كل شيء.',
      'A composite index is sorted by the first column, then the second, like a phone book. Searching by first name alone is like searching a phone book by first name: you scan everything.',
      'Bileşik indeks önce ilk, sonra ikinci sütuna göre sıralıdır; telefon rehberi gibi. Sadece ada göre aramak rehberde ada göre aramak gibidir: her şeyi taramak gerekir.'),
  }),

  // ───────── Databases · Senior ─────────
  choice({
    id: 'db-s-oversell', level: 'senior', topic: 'databases',
    prompt: W('بقيت قطعة واحدة في المخزون، وطلبان وصلا في نفس اللحظة. ماذا قد يحدث، وما الحل؟', 'One item is left in stock and two requests arrive at the same moment. What can happen, and what is the fix?', 'Stokta tek ürün kaldı ve aynı anda iki istek geldi. Ne olabilir, çözüm ne?'),
    code: `const { stock } = await db.one('SELECT stock FROM items WHERE id = ?', [id]);
if (stock > 0) {
  await db.run('UPDATE items SET stock = ? WHERE id = ?', [stock - 1, id]);
  await createOrder(id);
}`, codeLang: 'js',
    options: L3(
      ['يُباع المنتج مرتين. الحل تحديث ذري: UPDATE … SET stock = stock - 1 WHERE id = ? AND stock > 0 وفحص عدد الصفوف المتأثرة', 'لا يحدث شيء لأن قاعدة البيانات ترتب الطلبات', 'يفشل الطلبان', 'الحل إضافة فهرس على stock'],
      ['It sells twice. Use an atomic update: UPDATE … SET stock = stock - 1 WHERE id = ? AND stock > 0 and check the affected row count', 'Nothing, the database orders requests', 'Both requests fail', 'Add an index on stock'],
      ['İki kez satılır. Atomik güncelleme kullan: UPDATE … SET stock = stock - 1 WHERE id = ? AND stock > 0 ve etkilenen satır sayısını kontrol et', 'Hiçbir şey, veritabanı istekleri sıraya koyar', 'İki istek de başarısız olur', 'stock’a indeks ekle'],
    ),
    answer: 0,
    why: W('هذا race condition: الطلبان يقرآن 1 قبل أن يكتب أي منهما. الشرط داخل UPDATE يجعل الفحص والتعديل خطوة واحدة. أو استخدم SELECT … FOR UPDATE داخل transaction.',
      'This is a race condition: both read 1 before either writes. Putting the check inside the UPDATE makes check and change one step. Or use SELECT … FOR UPDATE inside a transaction.',
      'Bu bir yarış durumu: ikisi de yazmadan önce 1 okur. Koşulu UPDATE içine koymak kontrolü ve değişikliği tek adım yapar. Ya da transaction içinde SELECT … FOR UPDATE kullan.'),
  }),
  choice({
    id: 'db-s-keyset', level: 'senior', topic: 'databases',
    prompt: W('صفحة 5000 في قائمة كبيرة بطيئة جدًا. ما البديل الأفضل؟', 'Page 5,000 of a large list is very slow. What is the better approach?', 'Büyük bir listenin 5.000. sayfası çok yavaş. Daha iyi yaklaşım nedir?'),
    code: `SELECT * FROM events ORDER BY id LIMIT 20 OFFSET 100000;`, codeLang: 'sql',
    options: L3(
      ['keyset pagination: WHERE id > :last_id ORDER BY id LIMIT 20', 'زيادة LIMIT', 'إضافة DISTINCT', 'استخدام ORDER BY RANDOM()'],
      ['Keyset pagination: WHERE id > :last_id ORDER BY id LIMIT 20', 'A bigger LIMIT', 'Adding DISTINCT', 'ORDER BY RANDOM()'],
      ['Keyset sayfalama: WHERE id > :last_id ORDER BY id LIMIT 20', 'Daha büyük LIMIT', 'DISTINCT eklemek', 'ORDER BY RANDOM()'],
    ),
    answer: 0,
    why: W('OFFSET يجعل قاعدة البيانات تقرأ 100,000 صف ثم ترميها. مع keyset يقفز الفهرس مباشرة بعد آخر id رآه المستخدم، فتبقى كل صفحة بنفس السرعة.',
      'OFFSET makes the database read 100,000 rows and throw them away. With keyset pagination the index jumps straight past the last id the user saw, so every page is equally fast.',
      'OFFSET veritabanına 100.000 satır okutup atar. Keyset ile indeks kullanıcının gördüğü son id’nin hemen sonrasına atlar; her sayfa aynı hızda olur.'),
  }),
  choice({
    id: 'db-s-explain', level: 'senior', topic: 'databases',
    prompt: W('كيف تعرف إن كان الاستعلام البطيء يستخدم فهرسًا أم يقرأ الجدول كله؟', 'How do you find out whether a slow query uses an index or scans the whole table?', 'Yavaş bir sorgunun indeks kullanıp kullanmadığını ya da tüm tabloyu tarayıp taramadığını nasıl anlarsın?'),
    options: ['EXPLAIN (ANALYZE)', 'DESCRIBE TABLE', 'SHOW TABLES', 'VACUUM'],
    answer: 0, codeLang: 'sql',
    why: W('EXPLAIN يعرض خطة التنفيذ (Seq Scan أو Index Scan…)، وEXPLAIN ANALYZE ينفذ الاستعلام فعلًا ويعرض الأوقات الحقيقية. DESCRIBE يعرض الأعمدة فقط.',
      'EXPLAIN shows the plan (Seq Scan, Index Scan…), and EXPLAIN ANALYZE actually runs it and shows real timings. DESCRIBE only lists columns.',
      'EXPLAIN planı gösterir (Seq Scan, Index Scan…); EXPLAIN ANALYZE sorguyu gerçekten çalıştırıp gerçek süreleri verir. DESCRIBE sadece sütunları listeler.'),
  }),
  choice({
    id: 'db-s-function-index', level: 'senior', topic: 'databases',
    prompt: W('على email فهرس عادي، لكن هذا الاستعلام بطيء. لماذا؟', 'email has a normal index, yet this query is slow. Why?', 'email’de normal bir indeks var ama bu sorgu yavaş. Neden?'),
    code: `SELECT * FROM users WHERE LOWER(email) = 'sara@mail.com';`, codeLang: 'sql',
    options: L3(
      ['الدالة على العمود تمنع استخدام الفهرس؛ أنشئ فهرسًا على LOWER(email) أو خزّن البريد بحروف صغيرة', 'LOWER بطيئة جدًا في كل الحالات', 'الفهارس لا تعمل مع النصوص', 'يجب استخدام LIKE'],
      ['The function on the column blocks the index; index LOWER(email) or store emails in lowercase', 'LOWER is always very slow', 'Indexes do not work on text', 'You must use LIKE'],
      ['Sütundaki fonksiyon indeksi engeller; LOWER(email) üzerinde indeks oluştur ya da e-postaları küçük harfle sakla', 'LOWER her zaman çok yavaştır', 'İndeksler metinde çalışmaz', 'LIKE kullanılmalı'],
    ),
    answer: 0,
    why: W('الفهرس مرتب حسب قيم email كما هي، لا حسب LOWER(email)، فيضطر المحرك لحساب الدالة لكل صف. الحل فهرس على التعبير نفسه (expression index).',
      'The index is sorted by email as stored, not by LOWER(email), so the engine must compute the function for every row. Fix it with an index on that expression.',
      'İndeks email’in saklandığı haline göre sıralıdır, LOWER(email)’e göre değil; motor her satır için fonksiyonu hesaplamak zorunda kalır. Çözüm: o ifade üzerinde indeks.'),
  }),
  choice({
    id: 'db-s-replica-lag', level: 'senior', topic: 'databases',
    prompt: W('المستخدم يحفظ ملفه الشخصي ثم تُعرض الصفحة بالبيانات القديمة. القراءة من replica والكتابة على primary. ما السبب الأرجح؟', 'A user saves their profile and the next page shows old data. Reads go to a replica, writes to the primary. Most likely cause?', 'Kullanıcı profilini kaydediyor ve sonraki sayfa eski veriyi gösteriyor. Okumalar replica’dan, yazmalar primary’ye. En olası sebep?'),
    options: L3(
      ['تأخر النسخ (replication lag)؛ اقرأ من الـ primary بعد الكتابة مباشرة', 'الكاش في المتصفح', 'خطأ في الـ transaction', 'الـ replica معطلة'],
      ['Replication lag; read from the primary right after a write', 'Browser cache', 'A transaction bug', 'The replica is down'],
      ['Replikasyon gecikmesi; yazmadan hemen sonra primary’den oku', 'Tarayıcı önbelleği', 'Transaction hatası', 'Replica çalışmıyor'],
    ),
    answer: 0,
    why: W('النسخ إلى الـ replica غالبًا غير متزامن، فيتأخر أجزاء من الثانية أو أكثر. الحل الشائع «read your writes»: وجّه قراءات المستخدم إلى الـ primary لفترة قصيرة بعد كتابته.',
      'Replication to replicas is usually asynchronous, so it lags by fractions of a second or more. The usual fix is "read your writes": send that user’s reads to the primary for a short while after they write.',
      'Replica’ya kopyalama genelde asenkrondur ve saniyenin kesirleri veya daha fazla gecikir. Yaygın çözüm "read your writes": kullanıcı yazdıktan sonra kısa süre onun okumalarını primary’ye yönlendir.'),
  }),
  choice({
    id: 'db-s-deadlock', level: 'senior', topic: 'databases',
    prompt: W('Transaction A يقفل الصف 1 ثم يطلب الصف 2، وTransaction B يقفل الصف 2 ثم يطلب الصف 1. ماذا يحدث؟', 'Transaction A locks row 1 then wants row 2; transaction B locks row 2 then wants row 1. What happens?', 'Transaction A satır 1’i kilitleyip satır 2’yi istiyor; B satır 2’yi kilitleyip satır 1’i istiyor. Ne olur?'),
    options: L3(
      ['deadlock: قاعدة البيانات تلغي أحدهما. الحل قفل الصفوف بنفس الترتيب دائمًا وإعادة المحاولة', 'ينتظران إلى الأبد دائمًا', 'ينجحان معًا', 'تُحذف الصفوف'],
      ['A deadlock: the database aborts one. Always lock rows in the same order, and retry', 'They always wait forever', 'Both succeed', 'The rows are deleted'],
      ['Deadlock: veritabanı birini iptal eder. Satırları hep aynı sırayla kilitle ve yeniden dene', 'Sonsuza kadar beklerler', 'İkisi de başarılı olur', 'Satırlar silinir'],
    ),
    answer: 0,
    why: W('كل واحد ينتظر قفلًا يملكه الآخر. قواعد البيانات تكتشف ذلك وتلغي أحدهما بخطأ. رتّب الأقفال (مثلًا حسب id تصاعديًا) واجعل الكود يعيد المحاولة عند خطأ deadlock.',
      'Each waits for a lock the other holds. Databases detect this and abort one with an error. Lock in a fixed order (say, ascending id) and retry on deadlock errors.',
      'Her biri diğerinin tuttuğu kilidi bekler. Veritabanları bunu fark edip birini hatayla iptal eder. Kilitleri sabit sırayla al (ör. artan id) ve deadlock hatasında yeniden dene.'),
  }),

  // ───────── API · Junior ─────────
  choice({
    id: 'api-j-get-post', level: 'junior', topic: 'api',
    prompt: W('أي طريقة HTTP مناسبة لإنشاء مستخدم جديد؟', 'Which HTTP method fits creating a new user?', 'Yeni kullanıcı oluşturmak için hangi HTTP metodu uygundur?'),
    options: ['POST /users', 'GET /users/create', 'GET /users?new=1', 'DELETE /users'],
    answer: 0, codeLang: 'http',
    why: W('GET للقراءة فقط ولا يغيّر البيانات، وقد يُخزَّن في الكاش أو يُعاد إرساله. الإنشاء يكون بـ POST على مجموعة المستخدمين.',
      'GET is for reading only and must not change data; it can be cached or retried. Creating is a POST to the users collection.',
      'GET sadece okumak içindir, veri değiştirmemeli; önbelleğe alınabilir veya tekrar gönderilebilir. Oluşturma, kullanıcı koleksiyonuna POST ile yapılır.'),
  }),
  choice({
    id: 'api-j-201', level: 'junior', topic: 'api',
    prompt: W('ما رمز الحالة المناسب بعد إنشاء مورد جديد بنجاح؟', 'Which status code fits after successfully creating a resource?', 'Bir kaynak başarıyla oluşturulduktan sonra hangi durum kodu uygundur?'),
    options: ['201 Created', '200 OK', '204 No Content', '302 Found'],
    answer: 0,
    why: W('201 يعني «أُنشئ شيء جديد»، وغالبًا يُرسل معه ترويسة Location بعنوان المورد. 200 مقبول لكنه أقل دقة، و204 يعني نجاح بدون محتوى.',
      '201 means "something new was created", usually with a Location header pointing to it. 200 works but is less precise, and 204 means success with no body.',
      '201 "yeni bir şey oluşturuldu" demektir; genelde kaynağı gösteren Location başlığıyla gelir. 200 olur ama daha az kesindir; 204 gövdesiz başarı demektir.'),
  }),
  choice({
    id: 'api-j-content-type', level: 'junior', topic: 'api',
    prompt: W('ترسل بيانات JSON في جسم الطلب. أي ترويسة يجب أن ترسلها؟', 'You send JSON in the request body. Which header should you send?', 'İstek gövdesinde JSON gönderiyorsun. Hangi başlığı göndermelisin?'),
    options: ['Content-Type: application/json', 'Accept: text/html', 'Authorization: JSON', 'Content-Length: json'],
    answer: 0, codeLang: 'http',
    why: W('Content-Type يخبر الخادم بنوع البيانات المرسلة ليقرأها بشكل صحيح. أما Accept فيخبره بالنوع الذي تريد استقباله.',
      'Content-Type tells the server what you are sending so it can parse it. Accept tells it what you want back.',
      'Content-Type sunucuya ne gönderdiğini söyler ki doğru ayrıştırsın. Accept ise ne almak istediğini söyler.'),
  }),
  choice({
    id: 'api-j-rest-url', level: 'junior', topic: 'api',
    prompt: W('ما الرابط الأنسب بأسلوب REST لجلب طلبات المستخدم رقم 42؟', 'Which REST-style URL fits getting the orders of user 42?', '42 numaralı kullanıcının siparişlerini almak için REST tarzına en uygun URL hangisi?'),
    options: ['GET /users/42/orders', 'GET /getOrdersOfUser?id=42', 'POST /orders/get/42', 'GET /orders/user-42-list'],
    answer: 0, codeLang: 'http',
    why: W('في REST الرابط يصف المورد بأسماء (users، orders)، والفعل يأتي من طريقة HTTP. لا داعي لكلمات مثل get داخل الرابط.',
      'In REST the URL names the resource (users, orders) and the verb comes from the HTTP method. No need for words like get in the path.',
      'REST’te URL kaynağı isimlerle (users, orders) tanımlar, fiil HTTP metodundan gelir. Yolda get gibi kelimelere gerek yok.'),
  }),
  choice({
    id: 'api-j-401-403', level: 'junior', topic: 'api',
    prompt: W('مستخدم مسجّل الدخول يحاول فتح صفحة للمدراء فقط. ما الرمز المناسب؟', 'A signed-in user tries an admin-only endpoint. Which status fits?', 'Giriş yapmış bir kullanıcı sadece yöneticilere açık bir uç noktayı deniyor. Hangi kod uygundur?'),
    options: ['403 Forbidden', '401 Unauthorized', '404 Not Found', '400 Bad Request'],
    answer: 0,
    why: W('401 يعني «لا نعرف من أنت»: غير مسجّل أو الرمز غير صالح. 403 يعني «نعرفك لكن غير مسموح لك».',
      '401 means "we don’t know who you are": not signed in or a bad token. 403 means "we know you, but you’re not allowed".',
      '401 "kim olduğunu bilmiyoruz" demektir: giriş yok veya token geçersiz. 403 "seni tanıyoruz ama iznin yok" demektir.'),
  }),
  choice({
    id: 'api-j-query-params', level: 'junior', topic: 'api',
    prompt: W('أين نضع عادةً معايير الفلترة والصفحات في طلب GET؟', 'Where do filters and paging usually go in a GET request?', 'GET isteğinde filtreler ve sayfalama genelde nereye konur?'),
    options: L3(
      ['في query string: /products?category=books&page=2', 'في جسم الطلب', 'في ترويسة Cookie', 'في اسم النطاق'],
      ['In the query string: /products?category=books&page=2', 'In the request body', 'In the Cookie header', 'In the domain name'],
      ['Query string’de: /products?category=books&page=2', 'İstek gövdesinde', 'Cookie başlığında', 'Alan adında'],
    ),
    answer: 0,
    why: W('طلبات GET لا تحمل جسمًا عادةً، والـ query string يجعل الرابط قابلًا للمشاركة والتخزين في الكاش.',
      'GET requests usually have no body, and the query string keeps the URL shareable and cacheable.',
      'GET istekleri genelde gövde taşımaz; query string URL’yi paylaşılabilir ve önbelleğe alınabilir tutar.'),
  }),
  choice({
    id: 'api-j-500', level: 'junior', topic: 'api',
    prompt: W('الـ API يرجع 500. أين المشكلة غالبًا؟', 'The API returns 500. Where is the problem usually?', 'API 500 döndürüyor. Sorun genelde nerede?'),
    options: L3(
      ['في الخادم: خطأ غير متوقع في الكود أو قاعدة البيانات', 'في الطلب: بيانات ناقصة', 'المستخدم غير مسجّل', 'الرابط غير موجود'],
      ['On the server: an unexpected error in the code or the database', 'In the request: missing data', 'The user is not signed in', 'The URL does not exist'],
      ['Sunucuda: kodda veya veritabanında beklenmeyen bir hata', 'İstekte: eksik veri', 'Kullanıcı giriş yapmamış', 'URL yok'],
    ),
    answer: 0,
    why: W('أخطاء 5xx من الخادم، و4xx من الطلب. وإذا كانت البيانات خاطئة يجب أن يرجع الخادم 400 أو 422، لا 500. راجع سجلات الخادم (logs).',
      '5xx errors come from the server, 4xx from the request. If the input is wrong the server should answer 400 or 422, not 500. Check the server logs.',
      '5xx hataları sunucudan, 4xx istekten gelir. Girdi yanlışsa sunucu 500 değil 400 veya 422 dönmelidir. Sunucu loglarına bak.'),
  }),

  // ───────── API · Mid ─────────
  choice({
    id: 'api-m-idempotent', level: 'mid', topic: 'api',
    prompt: W('أي طريقة HTTP ليست idempotent، أي أن تكرارها قد يغيّر النتيجة؟', 'Which HTTP method is not idempotent, so repeating it can change the result?', 'Hangi HTTP metodu idempotent değildir, yani tekrarı sonucu değiştirebilir?'),
    options: ['POST', 'PUT', 'DELETE', 'GET'],
    answer: 0,
    why: W('إرسال PUT بنفس البيانات مرتين يترك نفس الحالة، وDELETE مرتين يبقى المورد محذوفًا. أما POST مرتين فقد ينشئ طلبين. لهذا تعيد المكتبات المحاولة تلقائيًا للطرق idempotent فقط.',
      'Sending the same PUT twice leaves the same state, and deleting twice leaves it deleted. Two POSTs can create two orders. That is why clients only auto-retry idempotent methods.',
      'Aynı PUT’u iki kez göndermek aynı durumu bırakır, iki kez DELETE de silinmiş bırakır. İki POST iki sipariş oluşturabilir. Bu yüzden istemciler sadece idempotent metotları otomatik tekrar eder.'),
  }),
  choice({
    id: 'api-m-put-patch', level: 'mid', topic: 'api',
    prompt: W('تريد تغيير رقم الهاتف فقط للمستخدم. ما الأنسب؟', 'You only want to change the user’s phone number. Which fits?', 'Kullanıcının sadece telefon numarasını değiştirmek istiyorsun. Hangisi uygun?'),
    code: `{ "phone": "+90 555 000 00 00" }`, codeLang: 'json',
    options: ['PATCH /users/42', 'PUT /users/42', 'POST /users/42/phone/update', 'GET /users/42?phone=…'],
    answer: 0,
    why: W('PATCH لتحديث جزئي. PUT يعني «استبدل المورد كاملًا بهذا»، فإرسال الهاتف وحده قد يمسح الحقول الأخرى في تطبيق صحيح لـ PUT.',
      'PATCH is a partial update. PUT means "replace the whole resource with this", so a PUT with only the phone could wipe the other fields.',
      'PATCH kısmi güncellemedir. PUT "kaynağın tamamını bununla değiştir" demektir; sadece telefonla PUT diğer alanları silebilir.'),
  }),
  choice({
    id: 'api-m-429', level: 'mid', topic: 'api',
    prompt: W('عميل يرسل طلبات أكثر من الحد المسموح. ما الرد المناسب؟', 'A client sends more requests than allowed. What is the right response?', 'Bir istemci izin verilenden fazla istek gönderiyor. Uygun yanıt nedir?'),
    options: {
      ar: ['429 Too Many Requests + Retry-After', '500 Internal Server Error', '403 Forbidden دائمًا', '200 مع رسالة خطأ في الجسم'],
      en: ['429 Too Many Requests + Retry-After', '500 Internal Server Error', '403 Forbidden, always', '200 with an error message in the body'],
      tr: ['429 Too Many Requests + Retry-After', '500 Internal Server Error', 'Her zaman 403 Forbidden', 'Gövdede hata mesajıyla 200'],
    },
    answer: 0,
    why: W('429 هو الرمز القياسي لتجاوز الحد، وترويسة Retry-After تخبر العميل متى يحاول مجددًا، فتتصرف المكتبات الجيدة بشكل صحيح تلقائيًا.',
      '429 is the standard code for rate limits, and Retry-After tells the client when to try again, so good clients back off on their own.',
      '429 hız sınırı için standart koddur; Retry-After istemciye ne zaman tekrar deneyeceğini söyler, iyi istemciler kendiliğinden bekler.'),
  }),
  choice({
    id: 'api-m-preflight', level: 'mid', topic: 'api',
    prompt: W('تطبيق على app.example.com يرسل PUT بـ JSON إلى api.example.com. ماذا يرسل المتصفح قبله؟', 'An app on app.example.com sends a JSON PUT to api.example.com. What does the browser send first?', 'app.example.com’daki bir uygulama api.example.com’a JSON PUT gönderiyor. Tarayıcı önce ne gönderir?'),
    options: L3(
      ['طلب OPTIONS (preflight) ليتأكد أن الخادم يسمح بالطريقة والترويسات', 'لا شيء', 'طلب GET لنفس الرابط', 'طلب HEAD'],
      ['An OPTIONS preflight to check the server allows the method and headers', 'Nothing', 'A GET to the same URL', 'A HEAD request'],
      ['Sunucunun metoda ve başlıklara izin verdiğini kontrol eden bir OPTIONS preflight', 'Hiçbir şey', 'Aynı URL’ye GET', 'HEAD isteği'],
    ),
    answer: 0,
    why: W('الطلبات «غير البسيطة» بين مصدرين مختلفين (مثل PUT أو JSON) تحتاج preflight. يجب أن يرد الخادم بـ Access-Control-Allow-Origin وAllow-Methods وAllow-Headers، وإلا يمنع المتصفح الطلب.',
      'Non-simple cross-origin requests (like PUT or JSON) need a preflight. The server must answer with Access-Control-Allow-Origin, -Methods and -Headers, or the browser blocks the request.',
      'Farklı kökenler arası "basit olmayan" istekler (PUT veya JSON gibi) preflight ister. Sunucu Access-Control-Allow-Origin, -Methods ve -Headers ile yanıt vermeli; yoksa tarayıcı isteği engeller.'),
  }),
  choice({
    id: 'api-m-etag', level: 'mid', topic: 'api',
    prompt: W('العميل يرسل If-None-Match بقيمة ETag التي معه، والبيانات لم تتغير. ماذا يرد الخادم؟', 'The client sends If-None-Match with its ETag, and the data has not changed. What does the server answer?', 'İstemci elindeki ETag ile If-None-Match gönderiyor ve veri değişmemiş. Sunucu ne yanıt verir?'),
    options: {
      ar: ['304 Not Modified', '200 OK مع البيانات كاملة', '204 No Content', '412 Precondition Failed'],
      en: ['304 Not Modified', '200 OK with the full data', '204 No Content', '412 Precondition Failed'],
      tr: ['304 Not Modified', 'Tüm veriyle 200 OK', '204 No Content', '412 Precondition Failed'],
    },
    answer: 0,
    why: W('304 بدون جسم يعني «نسختك ما زالت صالحة»، فيوفّر نقل البيانات. وETag مع If-Match يُستخدم أيضًا لمنع الكتابة فوق تعديلات شخص آخر.',
      '304 with no body means "your copy is still good", saving the transfer. ETag with If-Match is also used to avoid overwriting someone else’s changes.',
      'Gövdesiz 304 "kopyan hâlâ geçerli" demektir; aktarımdan tasarruf sağlar. ETag, If-Match ile başkasının değişikliklerinin üzerine yazmayı önlemek için de kullanılır.'),
  }),
  choice({
    id: 'api-m-versioning', level: 'mid', topic: 'api',
    prompt: W('تحتاج تغيير شكل الرد بطريقة ستكسر التطبيقات الحالية. ما التصرف الأفضل؟', 'You need to change the response shape in a way that breaks existing apps. What is best?', 'Yanıt yapısını mevcut uygulamaları bozacak şekilde değiştirmen gerekiyor. En iyisi nedir?'),
    options: L3(
      ['إصدار جديد (/v2 أو عبر ترويسة) مع إبقاء v1 فترة ثم إيقافه بإعلان مسبق', 'تغيير v1 مباشرة', 'إرجاع الشكلين معًا في نفس الحقل', 'إيقاف الـ API يومًا للتحديث'],
      ['A new version (/v2 or a header), keeping v1 for a while and retiring it with notice', 'Change v1 in place', 'Return both shapes in the same field', 'Take the API down for a day'],
      ['Yeni sürüm (/v2 veya başlıkla); v1’i bir süre tutup önceden duyurarak kapatmak', 'v1’i doğrudan değiştirmek', 'İki yapıyı aynı alanda döndürmek', 'API’yi bir gün kapatmak'],
    ),
    answer: 0,
    why: W('التطبيقات (خاصة على الجوال) لا تتحدث كلها في نفس اليوم. الإصدار يعطي العملاء وقتًا للانتقال.',
      'Clients, especially mobile apps, do not all update on the same day. Versioning gives them time to move.',
      'İstemciler, özellikle mobil uygulamalar, aynı gün güncellenmez. Sürümleme onlara geçiş için zaman tanır.'),
  }),
  choice({
    id: 'api-m-validation', level: 'mid', topic: 'api',
    prompt: W('المستخدم أرسل بريدًا بصيغة خاطئة. كيف يرد الـ API بشكل مفيد؟', 'The user sent a badly formatted email. How should the API answer helpfully?', 'Kullanıcı hatalı biçimde bir e-posta gönderdi. API nasıl faydalı yanıt vermeli?'),
    code: `{
  "error": "validation_failed",
  "fields": { "email": "invalid_format" }
}`, codeLang: 'json',
    options: L3(
      ['400 أو 422 مع تفاصيل الحقول الخاطئة كما في المثال', '500 مع رسالة عامة', '200 مع success: false فقط', '404'],
      ['400 or 422 with per-field details like the example', '500 with a generic message', '200 with just success: false', '404'],
      ['Örnekteki gibi alan ayrıntılarıyla 400 veya 422', 'Genel mesajla 500', 'Sadece success: false ile 200', '404'],
    ),
    answer: 0,
    why: W('رمز 4xx يوضح أن الخطأ من الطلب، وتفاصيل الحقول تسمح للواجهة بعرض الرسالة بجانب الحقل الصحيح. و200 مع خطأ يربك المكتبات والمراقبة.',
      'A 4xx code says the request was at fault, and per-field details let the UI show the message next to the right field. A 200 carrying an error confuses clients and monitoring.',
      '4xx kodu hatanın istekte olduğunu söyler; alan ayrıntıları arayüzün mesajı doğru alanın yanında göstermesini sağlar. Hata taşıyan 200 istemcileri ve izlemeyi şaşırtır.'),
  }),

  // ───────── API · Senior ─────────
  choice({
    id: 'api-s-idempotency-key', level: 'senior', topic: 'api',
    prompt: W('طلب دفع POST انتهت مهلته عند العميل، فأعاد الإرسال. كيف تمنع خصم المبلغ مرتين؟', 'A payment POST timed out on the client, so it resent it. How do you stop a double charge?', 'Bir ödeme POST’u istemcide zaman aşımına uğradı ve tekrar gönderildi. Çift tahsilatı nasıl önlersin?'),
    code: `POST /payments
Idempotency-Key: 7f3c9a2e-…`, codeLang: 'http',
    options: L3(
      ['مفتاح Idempotency-Key فريد لكل عملية، والخادم يحفظ نتيجته ويرجعها عند التكرار', 'منع العميل من إعادة المحاولة', 'تحويل الطلب إلى GET', 'زيادة مهلة الطلب فقط'],
      ['A unique Idempotency-Key per operation; the server stores the result and returns it on repeats', 'Forbid clients from retrying', 'Turn it into a GET', 'Only raise the timeout'],
      ['Her işlem için benzersiz Idempotency-Key; sunucu sonucu saklar ve tekrarda aynısını döndürür', 'İstemcinin tekrar denemesini yasaklamak', 'GET’e çevirmek', 'Sadece zaman aşımını artırmak'],
    ),
    answer: 0,
    why: W('العميل لا يعرف إن كان الطلب الأول نجح قبل انقطاع الاتصال. المفتاح يجعل POST آمنًا للتكرار، وهي الطريقة التي تستخدمها Stripe مثلًا.',
      'The client cannot know whether the first request succeeded before the connection dropped. The key makes the POST safe to repeat, which is how Stripe does it, for example.',
      'İstemci, bağlantı kopmadan önce ilk isteğin başarılı olup olmadığını bilemez. Anahtar POST’u tekrar için güvenli yapar; Stripe da böyle yapar.'),
  }),
  choice({
    id: 'api-s-webhook-signature', level: 'senior', topic: 'api',
    prompt: W('خدمة دفع ترسل webhooks إلى /webhooks/payment. كيف تتأكد أن الطلب منها فعلًا؟', 'A payment provider posts webhooks to /webhooks/payment. How do you know a request really came from it?', 'Bir ödeme sağlayıcısı /webhooks/payment’a webhook gönderiyor. İsteğin gerçekten ondan geldiğini nasıl anlarsın?'),
    options: L3(
      ['التحقق من توقيع HMAC للجسم الخام بالسر المشترك، مع فحص الطابع الزمني', 'فحص ترويسة User-Agent', 'جعل الرابط سريًا وطويلًا فقط', 'قبول الطلبات من أي IP'],
      ['Verify the HMAC signature of the raw body with the shared secret, and check the timestamp', 'Check the User-Agent header', 'Just make the URL long and secret', 'Accept requests from any IP'],
      ['Ham gövdenin HMAC imzasını ortak sırla doğrula ve zaman damgasını kontrol et', 'User-Agent başlığına bak', 'Sadece URL’yi uzun ve gizli yap', 'Her IP’den gelen isteği kabul et'],
    ),
    answer: 0,
    why: W('أي أحد يستطيع إرسال POST إلى رابطك وتزوير User-Agent. التوقيع يثبت المصدر وأن الجسم لم يُعدَّل، والطابع الزمني يمنع إعادة إرسال طلب قديم (replay). احسب التوقيع على الجسم الخام قبل تحويله إلى JSON.',
      'Anyone can POST to your URL and fake a User-Agent. The signature proves the sender and that the body was not changed, and the timestamp blocks replays. Compute it on the raw body, before JSON parsing.',
      'Herkes URL’ne POST atıp User-Agent’ı taklit edebilir. İmza göndereni ve gövdenin değişmediğini kanıtlar; zaman damgası eski isteğin tekrar gönderilmesini engeller. İmzayı JSON’a çevirmeden, ham gövde üzerinde hesapla.'),
  }),
  choice({
    id: 'api-s-graphql-n1', level: 'senior', topic: 'api',
    prompt: W('استعلام GraphQL يطلب 100 منشور مع كاتب كل منشور، فيُنفَّذ 101 استعلام على قاعدة البيانات. ما الحل المعتاد؟', 'A GraphQL query asks for 100 posts with each author, and runs 101 database queries. What is the usual fix?', 'Bir GraphQL sorgusu 100 gönderiyi yazarlarıyla istiyor ve veritabanında 101 sorgu çalışıyor. Yaygın çözüm nedir?'),
    options: L3(
      ['DataLoader: يجمع طلبات الكتّاب في استعلام واحد WHERE id IN (...) مع كاش لكل طلب', 'منع حقل author', 'تحويل الـ API إلى REST', 'زيادة موارد الخادم'],
      ['DataLoader: batch the author lookups into one WHERE id IN (...) query, with a per-request cache', 'Remove the author field', 'Switch the API to REST', 'Give the server more resources'],
      ['DataLoader: yazar sorgularını tek WHERE id IN (...) sorgusunda topla, istek başına önbellekle', 'author alanını kaldır', 'API’yi REST’e çevir', 'Sunucuya daha fazla kaynak ver'],
    ),
    answer: 0,
    why: W('كل resolver يعمل لوحده فيطلب كاتبه، وهذه مشكلة N+1. DataLoader ينتظر حتى نهاية الدورة الحالية ويجمع كل المعرّفات في طلب واحد.',
      'Each resolver runs on its own and fetches its author: an N+1 problem. DataLoader waits until the end of the current tick and batches all the ids into one call.',
      'Her resolver kendi başına çalışıp yazarını ister: N+1 sorunu. DataLoader mevcut turun sonuna kadar bekler ve tüm kimlikleri tek çağrıda toplar.'),
  }),
  choice({
    id: 'api-s-202-job', level: 'senior', topic: 'api',
    prompt: W('إنشاء تقرير يستغرق 5 دقائق. كيف تصمم الـ endpoint؟', 'Building a report takes 5 minutes. How do you design the endpoint?', 'Bir rapor oluşturmak 5 dakika sürüyor. Uç noktayı nasıl tasarlarsın?'),
    options: L3(
      ['202 Accepted مع رقم مهمة، والعميل يتابع الحالة عبر رابط أو يستقبل webhook', 'إبقاء الاتصال مفتوحًا 5 دقائق', 'إرجاع 500 ثم المحاولة لاحقًا', 'تقسيم التقرير إلى 300 طلب'],
      ['202 Accepted with a job id; the client polls a status URL or gets a webhook', 'Keep the connection open for 5 minutes', 'Return 500 and retry later', 'Split the report into 300 requests'],
      ['İş kimliğiyle 202 Accepted; istemci durum URL’sini sorgular veya webhook alır', 'Bağlantıyı 5 dakika açık tutmak', '500 dönüp sonra tekrar denemek', 'Raporu 300 isteğe bölmek'],
    ),
    answer: 0,
    why: W('الاتصالات الطويلة تنقطع بسبب الـ proxies والمهلات. 202 يعني «استلمت طلبك وسأعالجه»، والعمل يتم في طابور (queue) بالخلفية.',
      'Long connections get cut by proxies and timeouts. 202 means "got it, I will process it", and the work runs in a background queue.',
      'Uzun bağlantılar proxy’ler ve zaman aşımları yüzünden kesilir. 202 "aldım, işleyeceğim" demektir; iş arka planda bir kuyrukta yapılır.'),
  }),
  choice({
    id: 'api-s-retry-backoff', level: 'senior', topic: 'api',
    prompt: W('خدمة خارجية تفشل أحيانًا. ما أفضل طريقة لإعادة المحاولة؟', 'An external service fails now and then. What is the best way to retry?', 'Dış bir servis ara sıra başarısız oluyor. En iyi yeniden deneme yolu nedir?'),
    options: L3(
      ['تأخير يتضاعف مع عشوائية (exponential backoff + jitter)، بعدد محدود، وللطلبات الآمنة للتكرار فقط', 'إعادة فورية بلا حد', 'إعادة كل ثانية بالضبط من كل الخوادم', 'عدم إعادة المحاولة أبدًا'],
      ['Doubling delays with randomness (exponential backoff + jitter), a limited number of times, only for requests safe to repeat', 'Retry instantly with no limit', 'Retry every second exactly from every server', 'Never retry'],
      ['Rastgelelik eklenmiş katlanan bekleme (exponential backoff + jitter), sınırlı sayıda ve sadece tekrar için güvenli isteklerde', 'Sınırsız ve anında tekrar', 'Her sunucudan tam her saniye tekrar', 'Asla tekrar deneme'],
    ),
    answer: 0,
    why: W('الإعادة الفورية من آلاف العملاء تُغرق الخدمة وهي تحاول التعافي. التأخير المتزايد يعطيها وقتًا، والعشوائية تمنع أن يعيد الجميع في نفس اللحظة.',
      'Instant retries from thousands of clients flood a service while it is trying to recover. Growing delays give it room, and jitter stops everyone retrying at the same moment.',
      'Binlerce istemciden anında tekrar, toparlanmaya çalışan servisi boğar. Artan bekleme ona zaman tanır, rastgelelik herkesin aynı anda denemesini önler.'),
  }),
  choice({
    id: 'api-s-compat', level: 'senior', topic: 'api',
    prompt: W('أي تغيير على API منشور لا يكسر العملاء الحاليين عادةً؟', 'Which change to a published API usually does not break existing clients?', 'Yayındaki bir API’de hangi değişiklik genelde mevcut istemcileri bozmaz?'),
    options: L3(
      ['إضافة حقل اختياري جديد في الرد', 'جعل حقل اختياري في الطلب إجباريًا', 'تغيير اسم حقل في الرد', 'تغيير نوع id من رقم إلى نص'],
      ['Adding a new optional field to the response', 'Making an optional request field required', 'Renaming a response field', 'Changing id from a number to a string'],
      ['Yanıta yeni, isteğe bağlı bir alan eklemek', 'İstekteki isteğe bağlı bir alanı zorunlu yapmak', 'Yanıttaki bir alanın adını değiştirmek', 'id’yi sayıdan metne çevirmek'],
    ),
    answer: 0,
    why: W('العملاء الجيدون يتجاهلون الحقول التي لا يعرفونها. أما الحذف وإعادة التسمية وتغيير الأنواع وتشديد شروط الطلب فتكسر الكود الموجود.',
      'Well-behaved clients ignore fields they do not know. Removing, renaming, changing types and tightening request rules break existing code.',
      'İyi istemciler bilmedikleri alanları yok sayar. Silmek, yeniden adlandırmak, tip değiştirmek ve istek kurallarını sıkılaştırmak mevcut kodu bozar.'),
  }),
]
