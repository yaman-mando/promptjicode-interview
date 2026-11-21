import type { Question } from '#shared/types/quiz'
import { choice, output } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const P = W('ماذا يُرجع هذا الاستعلام؟ (كل صف في جزء، والقيم بمسافة)', 'What does this query return? (one part per row, values separated by a space)', 'Bu sorgu ne döndürür? (her satır bir parça, değerler boşlukla)')
const topic = 'databases' as const
const sql = { codeLang: 'sql' as const, prompt: P, topic }

export const DATABASES_2: Question[] = [
  // ───────── Junior ─────────
  output({ ...sql, id: 'db-j2-count-null', level: 'junior',
    code: `WITH users(name, phone) AS (
  VALUES ('Ali', NULL), ('Sara', '0555'), ('Omar', NULL)
)
SELECT COUNT(*), COUNT(phone) FROM users;`,
    options: ['3 1', '3 3', '1 3', '2 1'], answer: 0,
    why: W('COUNT(*) يعد كل الصفوف، أما COUNT(عمود) فيتجاهل القيم NULL.', 'COUNT(*) counts every row; COUNT(column) skips NULL values.', 'COUNT(*) tüm satırları sayar; COUNT(sütun) NULL değerleri atlar.') }),
  output({ ...sql, id: 'db-j2-eq-null', level: 'junior',
    code: `WITH users(name, phone) AS (
  VALUES ('Ali', NULL), ('Sara', '0555')
)
SELECT COUNT(*) FROM users WHERE phone = NULL;`,
    options: ['0', '1', '2', 'Error'], answer: 0,
    why: W('المقارنة مع NULL بـ = لا تكون صحيحة أبدًا. الصحيح: WHERE phone IS NULL.', 'Comparing with NULL using = is never true. Use WHERE phone IS NULL.', 'NULL ile = karşılaştırması asla doğru olmaz. WHERE phone IS NULL kullan.') }),
  output({ ...sql, id: 'db-j2-distinct', level: 'junior',
    code: `WITH orders(city) AS (
  VALUES ('Mersin'), ('Adana'), ('Mersin')
)
SELECT COUNT(DISTINCT city) FROM orders;`,
    options: ['2', '3', '1', '0'], answer: 0,
    why: W('DISTINCT يحذف التكرار قبل العد، فتبقى مدينتان.', 'DISTINCT removes duplicates before counting, leaving two cities.', 'DISTINCT saymadan önce tekrarları atar; iki şehir kalır.') }),
  output({ ...sql, id: 'db-j2-order-limit', level: 'junior',
    code: `WITH products(name, price) AS (
  VALUES ('A', 10), ('B', 30), ('C', 20)
)
SELECT name FROM products
ORDER BY price DESC
LIMIT 2;`,
    options: ['B, C', 'A, B', 'B', 'C, B'], answer: 0,
    why: W('الترتيب تنازليًا حسب السعر ثم أخذ أول صفين: الأغلى ثم الذي يليه.', 'Sort by price descending, then take the first two rows: the most expensive, then the next.', 'Fiyata göre azalan sırala, ilk iki satırı al: en pahalı ve sonraki.') }),
  output({ ...sql, id: 'db-j2-inner-join', level: 'junior',
    code: `WITH users(id, name) AS (VALUES (1, 'Ali'), (2, 'Sara')),
     orders(user_id) AS (VALUES (1), (1))
SELECT u.name
FROM users u
JOIN orders o ON o.user_id = u.id;`,
    options: ['Ali, Ali', 'Ali', 'Ali, Sara', 'Ali, Ali, Sara'], answer: 0,
    why: W('JOIN يُرجع صفًا لكل تطابق: لعلي طلبان فيظهر مرتين، وسارة بلا طلبات فلا تظهر.', 'JOIN returns one row per match: Ali has two orders so he appears twice; Sara has none, so she is gone.', 'JOIN her eşleşme için bir satır döndürür: Ali’nin iki siparişi var, iki kez görünür; Sara’nın yok, görünmez.') }),
  output({ ...sql, id: 'db-j2-left-join', level: 'junior',
    code: `WITH users(id, name) AS (VALUES (1, 'Ali'), (2, 'Sara')),
     orders(user_id) AS (VALUES (1), (1))
SELECT u.name, COUNT(o.user_id)
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name
ORDER BY u.id;`,
    options: ['Ali 2, Sara 0', 'Ali 2', 'Ali 2, Sara 1', 'Ali 1, Sara 0'], answer: 0,
    why: W('LEFT JOIN يُبقي كل المستخدمين، ومن ليس له طلبات تكون أعمدة الطلب NULL فيعدّها COUNT صفرًا.', 'LEFT JOIN keeps every user; with no orders the order columns are NULL, so COUNT gives 0.', 'LEFT JOIN tüm kullanıcıları tutar; siparişi olmayanda sipariş sütunları NULL olur ve COUNT 0 verir.') }),
  output({ ...sql, id: 'db-j2-coalesce', level: 'junior',
    code: `SELECT COALESCE(NULL, 'guest', 'admin');`,
    options: ['guest', 'NULL', 'admin', 'guest admin'], answer: 0,
    why: W('COALESCE ترجع أول قيمة ليست NULL، وتفيد لوضع قيمة بديلة عند العرض.', 'COALESCE returns the first non-NULL value, handy for a fallback when displaying data.', 'COALESCE NULL olmayan ilk değeri döndürür; gösterimde yedek değer için kullanışlı.') }),
  output({ ...sql, id: 'db-j2-having', level: 'junior',
    code: `WITH sales(seller, amount) AS (
  VALUES ('a', 10), ('b', 5), ('a', 7), ('c', 20)
)
SELECT seller FROM sales
GROUP BY seller
HAVING SUM(amount) > 15
ORDER BY seller;`,
    options: ['a, c', 'c', 'a, b, c', 'a'], answer: 0,
    why: W('HAVING يفلتر المجموعات بعد التجميع: مجموع a هو 17 ومجموع c هو 20.', 'HAVING filters groups after aggregation: a totals 17 and c totals 20.', 'HAVING gruplamadan sonra filtreler: a’nın toplamı 17, c’ninki 20.') }),
  output({ ...sql, id: 'db-j2-update-no-where', level: 'junior',
    code: `CREATE TABLE users (id INTEGER, name TEXT);
INSERT INTO users VALUES (1, 'Ali'), (2, 'Sara');
UPDATE users SET name = 'X';
SELECT name FROM users ORDER BY id;`,
    options: ['X, X', 'X, Sara', 'Ali, Sara', 'Error'], answer: 0,
    why: W('بدون WHERE يتغير كل صف في الجدول. اكتب الشرط أولًا، واختبره بـ SELECT قبل UPDATE أو DELETE.', 'Without WHERE every row changes. Write the condition first and try it with a SELECT before an UPDATE or DELETE.', 'WHERE olmadan tablodaki her satır değişir. Koşulu önce yaz ve UPDATE ya da DELETE’ten önce SELECT ile dene.') }),
  choice({ id: 'db-j2-delete-drop', level: 'junior', topic,
    prompt: W('تريد حذف كل الصفوف مع إبقاء الجدول وبنيته. أي أمر؟', 'You want to remove every row but keep the table and its structure. Which command?', 'Tabloyu ve yapısını koruyup tüm satırları silmek istiyorsun. Hangi komut?'),
    options: ['DELETE FROM users;', 'DROP TABLE users;', 'REMOVE users;', 'ALTER TABLE users CLEAR;'], answer: 0, codeLang: 'sql',
    why: W('DROP يحذف الجدول نفسه. أما TRUNCATE فهو بديل أسرع لـ DELETE في PostgreSQL وMySQL.', 'DROP deletes the table itself. TRUNCATE is a faster alternative to DELETE in PostgreSQL and MySQL.', 'DROP tablonun kendisini siler. TRUNCATE, PostgreSQL ve MySQL’de DELETE’e daha hızlı bir alternatiftir.') }),
  choice({ id: 'db-j2-foreign-key', level: 'junior', topic,
    prompt: W('ما فائدة FOREIGN KEY على orders.user_id؟', 'What does a FOREIGN KEY on orders.user_id give you?', 'orders.user_id üzerindeki FOREIGN KEY ne sağlar?'),
    options: L3(
      ['يمنع وجود طلب لمستخدم غير موجود', 'يجعل الاستعلامات أسرع دائمًا', 'يمنع تكرار user_id', 'يشفّر العمود'],
      ['It prevents an order for a user that does not exist', 'It always makes queries faster', 'It prevents duplicate user_id values', 'It encrypts the column'],
      ['Var olmayan bir kullanıcı için sipariş olmasını engeller', 'Sorguları her zaman hızlandırır', 'user_id tekrarını engeller', 'Sütunu şifreler'],
    ), answer: 0,
    why: W('المفتاح الأجنبي يحمي ترابط البيانات. أما منع التكرار فهو عمل UNIQUE.', 'A foreign key protects referential integrity. Preventing duplicates is what UNIQUE does.', 'Yabancı anahtar veri bütünlüğünü korur. Tekrarı engellemek UNIQUE’in işidir.') }),
  choice({ id: 'db-j2-where-having', level: 'junior', topic,
    prompt: W('ما الفرق بين WHERE وHAVING؟', 'What is the difference between WHERE and HAVING?', 'WHERE ile HAVING arasındaki fark nedir?'),
    options: L3(
      ['WHERE يفلتر الصفوف قبل التجميع، وHAVING يفلتر المجموعات بعده', 'لا فرق', 'HAVING أسرع دائمًا', 'WHERE يعمل فقط مع JOIN'],
      ['WHERE filters rows before grouping; HAVING filters groups after it', 'No difference', 'HAVING is always faster', 'WHERE only works with JOIN'],
      ['WHERE gruplamadan önce satırları, HAVING sonra grupları filtreler', 'Fark yok', 'HAVING her zaman daha hızlıdır', 'WHERE sadece JOIN ile çalışır'],
    ), answer: 0,
    why: W('شرط مثل SUM(amount) > 100 مكانه HAVING. وما يمكن فلترته بـ WHERE ضعه هناك، لأنه يقلل الصفوف قبل التجميع.', 'A condition like SUM(amount) > 100 belongs in HAVING. Anything WHERE can filter should go there, since it cuts rows before grouping.', 'SUM(amount) > 100 gibi bir koşul HAVING’e aittir. WHERE ile filtrelenebilen her şey oraya gitmeli; gruplamadan önce satırları azaltır.') }),
  choice({ id: 'db-j2-primary-key', level: 'junior', topic,
    prompt: W('أي وصف صحيح للمفتاح الأساسي PRIMARY KEY؟', 'Which description of a PRIMARY KEY is correct?', 'PRIMARY KEY için hangi açıklama doğrudur?'),
    options: L3(
      ['قيمة فريدة وغير NULL تحدد كل صف', 'أول عمود في الجدول دائمًا', 'عمود يقبل التكرار للبحث السريع', 'كلمة مرور الجدول'],
      ['A unique, non-NULL value that identifies each row', 'Always the first column in the table', 'A column that allows duplicates for fast search', 'The table’s password'],
      ['Her satırı tanımlayan benzersiz ve NULL olmayan değer', 'Her zaman tablonun ilk sütunu', 'Hızlı arama için tekrara izin veren sütun', 'Tablonun şifresi'],
    ), answer: 0,
    why: W('لكل جدول مفتاح أساسي واحد، وقد يتكون من أكثر من عمود (مفتاح مركّب).', 'A table has one primary key, and it can span several columns (a composite key).', 'Bir tablonun tek birincil anahtarı olur ve birden çok sütundan oluşabilir (bileşik anahtar).') }),

  // ───────── Mid ─────────
  output({ ...sql, id: 'db-m2-union', level: 'mid',
    code: `SELECT COUNT(*) FROM (SELECT 'x' UNION SELECT 'x');
SELECT COUNT(*) FROM (SELECT 'x' UNION ALL SELECT 'x');`,
    options: ['1, 2', '2, 2', '1, 1', '2, 1'], answer: 0,
    why: W('UNION يحذف الصفوف المكررة (وهذا له كلفة)، وUNION ALL يُبقيها. استخدم UNION ALL عندما لا يهمك التكرار.', 'UNION removes duplicate rows (which costs work); UNION ALL keeps them. Use UNION ALL when duplicates do not matter.', 'UNION tekrar eden satırları atar (bunun maliyeti var); UNION ALL tutar. Tekrar önemli değilse UNION ALL kullan.') }),
  output({ ...sql, id: 'db-m2-not-in-null', level: 'mid',
    code: `WITH users(id) AS (VALUES (1), (2), (3)),
     banned(user_id) AS (VALUES (1), (NULL))
SELECT COUNT(*) FROM users
WHERE id NOT IN (SELECT user_id FROM banned);`,
    options: ['0', '2', '1', '3'], answer: 0,
    why: W('وجود NULL في قائمة NOT IN يجعل الشرط «غير معروف» لكل صف، فلا يرجع شيء. استخدم NOT EXISTS بدلًا منها.', 'A NULL in the NOT IN list makes the condition unknown for every row, so nothing comes back. Use NOT EXISTS instead.', 'NOT IN listesindeki bir NULL koşulu her satır için bilinmez yapar ve hiçbir şey dönmez. Yerine NOT EXISTS kullan.') }),
  output({ ...sql, id: 'db-m2-avg-null', level: 'mid',
    code: `WITH scores(s) AS (VALUES (10), (NULL), (20))
SELECT AVG(s), SUM(s), COUNT(*) FROM scores;`,
    options: ['15.0 30 3', '10.0 30 3', '15.0 30 2', 'NULL NULL 3'], answer: 0,
    why: W('AVG وSUM يتجاهلان NULL، فالمتوسط (10 + 20) ÷ 2. إذا كانت NULL تعني صفرًا فاستخدم AVG(COALESCE(s, 0)).', 'AVG and SUM skip NULLs, so the average is (10 + 20) ÷ 2. If NULL means zero, use AVG(COALESCE(s, 0)).', 'AVG ve SUM NULL’ları atlar; ortalama (10 + 20) ÷ 2 olur. NULL sıfır demekse AVG(COALESCE(s, 0)) kullan.') }),
  output({ ...sql, id: 'db-m2-int-div', level: 'mid',
    code: `-- PostgreSQL / SQLite
SELECT 7 / 2, 7 / 2.0;`,
    options: ['3 3.5', '3.5 3.5', '3 3', '4 3.5'], answer: 0,
    why: W('قسمة عددين صحيحين تحذف الكسر في PostgreSQL وSQLite (أما MySQL فتعطي 3.5). لحساب النسب حوّل أحد الطرفين إلى عشري.', 'Dividing two integers drops the fraction in PostgreSQL and SQLite (MySQL gives 3.5). For ratios, cast one side to a decimal.', 'İki tam sayının bölümü PostgreSQL ve SQLite’ta kesri atar (MySQL 3.5 verir). Oranlar için bir tarafı ondalığa çevir.') }),
  output({ ...sql, id: 'db-m2-row-number', level: 'mid',
    code: `WITH emp(dept, name, salary) AS (
  VALUES ('IT', 'Ali', 900), ('IT', 'Omar', 700),
         ('HR', 'Sara', 800), ('HR', 'Lina', 600)
)
SELECT name FROM (
  SELECT name, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn
  FROM emp
) AS t
WHERE rn = 1
ORDER BY name;`,
    options: ['Ali, Sara', 'Ali', 'Omar, Lina', 'Ali, Omar, Sara, Lina'], answer: 0,
    why: W('ROW_NUMBER مع PARTITION BY يرقّم داخل كل قسم، فـ rn = 1 هو الأعلى راتبًا في كل قسم.', 'ROW_NUMBER with PARTITION BY numbers rows inside each department, so rn = 1 is the top earner in each.', 'PARTITION BY ile ROW_NUMBER her departman içinde numaralar; rn = 1 her birinde en yüksek maaştır.') }),
  output({ ...sql, id: 'db-m2-case', level: 'mid',
    code: `WITH products(name, price) AS (
  VALUES ('A', 10), ('B', 30), ('C', 20)
)
SELECT name, CASE WHEN price >= 20 THEN 'high' ELSE 'low' END
FROM products
ORDER BY name;`,
    options: ['A low, B high, C high', 'A low, B high, C low', 'A high, B high, C high', 'B high, C high'], answer: 0,
    why: W('CASE يحسب قيمة لكل صف، و20 >= 20 صحيح فـ C تصبح high.', 'CASE computes a value per row, and 20 >= 20 is true, so C is high.', 'CASE her satır için bir değer hesaplar; 20 >= 20 doğrudur, C high olur.') }),
  output({ ...sql, id: 'db-m2-left-join-where', level: 'mid',
    code: `WITH users(id, name) AS (VALUES (1, 'Ali'), (2, 'Sara')),
     orders(id, user_id, status) AS (VALUES (1, 1, 'paid'), (2, 1, 'refunded'))
SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.status = 'paid'
GROUP BY u.name;`,
    options: ['Ali 1', 'Ali 1, Sara 0', 'Ali 2, Sara 0', 'Ali 2'], answer: 0,
    why: W('شرط WHERE على جدول الطرف الأيمن يحذف صفوف NULL فيصبح الـ LEFT JOIN مثل JOIN عادي. ضع الشرط داخل ON لتبقى سارة بصفر.', 'A WHERE condition on the right-hand table drops the NULL rows, turning the LEFT JOIN into a plain JOIN. Put the condition in ON to keep Sara with 0.', 'Sağ tablodaki bir WHERE koşulu NULL satırları atar ve LEFT JOIN’i normal JOIN’e çevirir. Sara’nın 0 ile kalması için koşulu ON içine koy.') }),
  output({ ...sql, id: 'db-m2-subquery-avg', level: 'mid',
    code: `WITH products(name, price) AS (
  VALUES ('A', 10), ('B', 30), ('C', 20)
)
SELECT name FROM products
WHERE price > (SELECT AVG(price) FROM products);`,
    options: ['B', 'B, C', 'C', 'A'], answer: 0,
    why: W('الاستعلام الفرعي يحسب المتوسط (20) مرة واحدة، و20 ليست أكبر من 20.', 'The subquery computes the average (20) once, and 20 is not greater than 20.', 'Alt sorgu ortalamayı (20) bir kez hesaplar; 20, 20’den büyük değildir.') }),
  choice({ id: 'db-m2-index-function', level: 'mid', topic,
    prompt: W('يوجد فهرس على email. أي شرط لا يستطيع استخدامه؟', 'There is an index on email. Which condition cannot use it?', 'email üzerinde bir indeks var. Hangi koşul onu kullanamaz?'),
    options: ["WHERE LOWER(email) = 'ali@x.com'", "WHERE email = 'ali@x.com'", "WHERE email IN ('a@x.com', 'b@x.com')", 'ORDER BY email LIMIT 10'], answer: 0, codeLang: 'sql',
    why: W('تطبيق دالة على العمود يمنع استخدام الفهرس العادي. الحل: فهرس على LOWER(email)، أو تخزين البريد بحروف صغيرة من البداية.', 'Wrapping the column in a function stops a plain index from being used. Fix: an index on LOWER(email), or store emails lowercased in the first place.', 'Sütunu bir fonksiyona sarmak normal indeksin kullanılmasını engeller. Çözüm: LOWER(email) üzerinde indeks ya da e-postaları baştan küçük harfle saklamak.') }),
  choice({ id: 'db-m2-composite-index', level: 'mid', topic,
    prompt: W('فهرس مركّب على (last_name, first_name). أي استعلام يستفيد منه أقل؟', 'A composite index on (last_name, first_name). Which query benefits least?', '(last_name, first_name) üzerinde bileşik indeks. Hangi sorgu en az yararlanır?'),
    options: ["WHERE first_name = 'Ali'", "WHERE last_name = 'Mando'", "WHERE last_name = 'Mando' AND first_name = 'Ali'", "WHERE last_name LIKE 'Ma%'"], answer: 0, codeLang: 'sql',
    why: W('الفهرس المركّب مرتب حسب العمود الأول، فالبحث بالعمود الثاني وحده لا يستفيد منه جيدًا (قاعدة البادئة اليسرى).', 'A composite index is sorted by its first column, so searching on the second column alone cannot use it well (the leftmost-prefix rule).', 'Bileşik indeks ilk sütuna göre sıralıdır; yalnızca ikinci sütunla arama ondan iyi yararlanamaz (en soldaki önek kuralı).') }),
  choice({ id: 'db-m2-transaction', level: 'mid', topic,
    prompt: W('تحويل مبلغ: خصم من حساب وإضافة لآخر. ما الذي يضمن ألا يحدث نصف العملية فقط؟', 'A transfer: debit one account and credit another. What guarantees only half of it never happens?', 'Para transferi: bir hesaptan düş, diğerine ekle. İşlemin yarım kalmamasını ne garanti eder?'),
    options: L3(
      ['تنفيذ الأمرين داخل معاملة واحدة BEGIN … COMMIT', 'تنفيذهما بسرعة متتالية', 'إضافة فهرس على رقم الحساب', 'تنفيذ الإضافة قبل الخصم'],
      ['Running both inside one transaction, BEGIN … COMMIT', 'Running them quickly one after the other', 'Adding an index on the account number', 'Crediting before debiting'],
      ['İkisini tek bir transaction içinde çalıştırmak, BEGIN … COMMIT', 'İkisini hızla art arda çalıştırmak', 'Hesap numarasına indeks eklemek', 'Düşmeden önce eklemek'],
    ), answer: 0,
    why: W('المعاملة ذرّية: إما ينجح الأمران معًا أو يُلغيان معًا عند أي خطأ (ROLLBACK).', 'A transaction is atomic: both succeed together, or both are undone on any error (ROLLBACK).', 'Transaction atomiktir: ya ikisi birlikte başarılı olur ya da herhangi bir hatada ikisi de geri alınır (ROLLBACK).') }),
  choice({ id: 'db-m2-csv-column', level: 'mid', topic,
    prompt: W('تخزّن وسوم المقال كنص "vue,nuxt,css" في عمود واحد. ما المشكلة الأساسية؟', 'You store a post’s tags as the text "vue,nuxt,css" in one column. What is the main problem?', 'Bir yazının etiketlerini tek sütunda "vue,nuxt,css" metni olarak saklıyorsun. Asıl sorun nedir?'),
    options: L3(
      ['البحث والفهرسة والربط بالوسوم يصبح صعبًا وبطيئًا؛ الأفضل جدول وسيط', 'النص يأخذ مساحة كبيرة فقط', 'لا مشكلة إطلاقًا', 'الفواصل ممنوعة في SQL'],
      ['Searching, indexing and joining on tags becomes hard and slow; a junction table is better', 'Only that text takes a lot of space', 'No problem at all', 'Commas are not allowed in SQL'],
      ['Etiketlerle arama, indeksleme ve birleştirme zor ve yavaş olur; ara tablo daha iyi', 'Sadece metnin çok yer kaplaması', 'Hiç sorun yok', 'SQL’de virgül yasak'],
    ), answer: 0,
    why: W('جدول post_tags (post_id, tag_id) يسمح بفهرس وبحث دقيق بدل LIKE \'%vue%\' الذي يطابق "vuex" أيضًا.', 'A post_tags (post_id, tag_id) table allows an index and exact matches, instead of LIKE \'%vue%\', which also matches "vuex".', 'post_tags (post_id, tag_id) tablosu indeks ve tam eşleşme sağlar; "vuex"i de yakalayan LIKE \'%vue%\' yerine.') }),
  choice({ id: 'db-m2-money-type', level: 'mid', topic,
    prompt: W('ما النوع المناسب لتخزين الأسعار والمبالغ؟', 'Which type suits prices and amounts of money?', 'Fiyatlar ve para tutarları için hangi tip uygundur?'),
    options: L3(
      ['DECIMAL/NUMERIC، أو عدد صحيح بالقروش', 'FLOAT', 'VARCHAR', 'DOUBLE PRECISION'],
      ['DECIMAL/NUMERIC, or an integer in cents', 'FLOAT', 'VARCHAR', 'DOUBLE PRECISION'],
      ['DECIMAL/NUMERIC ya da kuruş cinsinden tam sayı', 'FLOAT', 'VARCHAR', 'DOUBLE PRECISION'],
    ), answer: 0,
    why: W('الأنواع العشرية التقريبية تجمع أخطاء صغيرة تظهر في الفواتير. والنص يمنع الحساب والترتيب الصحيح.', 'Approximate floating types pile up tiny errors that show up on invoices. Text blocks correct maths and sorting.', 'Yaklaşık ondalık tipler faturalarda görünen küçük hatalar biriktirir. Metin ise doğru hesap ve sıralamayı engeller.') }),

  // ───────── Senior ─────────
  output({ ...sql, id: 'db-s2-recursive', level: 'senior',
    code: `WITH RECURSIVE n(x) AS (
  SELECT 1
  UNION ALL
  SELECT x * 2 FROM n WHERE x < 10
)
SELECT x FROM n;`,
    options: ['1, 2, 4, 8, 16', '1, 2, 4, 8', '2, 4, 8, 16', '1, 2, 4, 8, 16, 32'], answer: 0,
    why: W('الشرط يُفحص على الصف السابق: 8 < 10 فيُنتج 16، ثم 16 لا يحقق الشرط فيتوقف. يُستخدم هذا لشجرة التصنيفات والتعليقات المتداخلة.', 'The condition is checked on the previous row: 8 < 10 produces 16, then 16 fails and it stops. Used for category trees and nested comments.', 'Koşul önceki satırda kontrol edilir: 8 < 10, 16’yı üretir; 16 koşulu sağlamaz ve durur. Kategori ağaçları ve iç içe yorumlar için kullanılır.') }),
  output({ ...sql, id: 'db-s2-rank', level: 'senior',
    code: `WITH t(score) AS (VALUES (90), (90), (80))
SELECT score,
       RANK() OVER (ORDER BY score DESC),
       DENSE_RANK() OVER (ORDER BY score DESC)
FROM t
ORDER BY score DESC;`,
    options: ['90 1 1, 90 1 1, 80 3 2', '90 1 1, 90 2 2, 80 3 3', '90 1 1, 90 1 1, 80 2 2', '90 1 1, 90 1 1, 80 3 3'], answer: 0,
    why: W('RANK يترك فجوة بعد التعادل (1، 1، 3)، وDENSE_RANK لا يترك فجوة (1، 1، 2).', 'RANK leaves a gap after a tie (1, 1, 3); DENSE_RANK does not (1, 1, 2).', 'RANK eşitlikten sonra boşluk bırakır (1, 1, 3); DENSE_RANK bırakmaz (1, 1, 2).') }),
  output({ ...sql, id: 'db-s2-running-total', level: 'senior',
    code: `WITH sales(day, amount) AS (VALUES (1, 10), (2, 5), (3, 20))
SELECT SUM(amount) OVER (ORDER BY day)
FROM sales
ORDER BY day;`,
    options: ['10, 15, 35', '35, 35, 35', '10, 5, 20', '35, 25, 20'], answer: 0,
    why: W('SUM مع OVER (ORDER BY) يعطي مجموعًا تراكميًا لكل صف دون أن يدمج الصفوف كما يفعل GROUP BY.', 'SUM with OVER (ORDER BY) gives a running total per row without collapsing rows like GROUP BY does.', 'OVER (ORDER BY) ile SUM, GROUP BY gibi satırları birleştirmeden her satır için kümülatif toplam verir.') }),
  output({ ...sql, id: 'db-s2-unique-null', level: 'senior',
    code: `CREATE TABLE users (email TEXT UNIQUE);
INSERT INTO users VALUES (NULL);
INSERT INTO users VALUES (NULL);
SELECT COUNT(*) FROM users;`,
    options: ['2', '1', 'Error', '0'], answer: 0,
    why: W('في PostgreSQL وMySQL وSQLite تُعتبر كل NULL مختلفة، فيسمح UNIQUE بأكثر من واحدة (SQL Server يسمح بواحدة فقط). في PostgreSQL 15+ يمكن NULLS NOT DISTINCT.', 'In PostgreSQL, MySQL and SQLite each NULL counts as distinct, so UNIQUE allows several (SQL Server allows one). PostgreSQL 15+ has NULLS NOT DISTINCT.', 'PostgreSQL, MySQL ve SQLite’ta her NULL farklı sayılır; UNIQUE birden fazlasına izin verir (SQL Server bir taneye). PostgreSQL 15+ NULLS NOT DISTINCT sunar.') }),
  output({ ...sql, id: 'db-s2-upsert', level: 'senior',
    code: `CREATE TABLE stock (id INTEGER PRIMARY KEY, qty INTEGER);
INSERT INTO stock VALUES (1, 5);
INSERT INTO stock VALUES (1, 3)
  ON CONFLICT (id) DO UPDATE SET qty = stock.qty + excluded.qty;
SELECT qty FROM stock;`,
    options: ['8', '3', '5', 'Error'], answer: 0,
    why: W('ON CONFLICT (PostgreSQL وSQLite) يحوّل الإدخال المكرر إلى تحديث ذرّي، وexcluded هو الصف الذي حاولنا إدخاله. في MySQL: ON DUPLICATE KEY UPDATE.', 'ON CONFLICT (PostgreSQL and SQLite) turns a duplicate insert into an atomic update; excluded is the row we tried to insert. MySQL uses ON DUPLICATE KEY UPDATE.', 'ON CONFLICT (PostgreSQL ve SQLite) tekrar eden eklemeyi atomik bir güncellemeye çevirir; excluded eklemeye çalıştığımız satırdır. MySQL’de ON DUPLICATE KEY UPDATE.') }),
  output({ ...sql, id: 'db-s2-lag', level: 'senior',
    code: `WITH prices(day, price) AS (VALUES (1, 10), (2, 12), (3, 9))
SELECT price - LAG(price) OVER (ORDER BY day)
FROM prices
ORDER BY day;`,
    options: ['NULL, 2, -3', '0, 2, -3', '2, -3, NULL', '10, 2, -3'], answer: 0,
    why: W('LAG يعطي قيمة الصف السابق، ولأول صف لا يوجد سابق فتكون NULL. يمكن إعطاء قيمة افتراضية: LAG(price, 1, price).', 'LAG gives the previous row’s value; the first row has none, so it is NULL. You can pass a default: LAG(price, 1, price).', 'LAG önceki satırın değerini verir; ilk satırın öncesi yoktur, NULL olur. Varsayılan verilebilir: LAG(price, 1, price).') }),
  output({ ...sql, id: 'db-s2-not-exists', level: 'senior',
    code: `WITH users(id, name) AS (VALUES (1, 'Ali'), (2, 'Sara')),
     orders(user_id) AS (VALUES (1), (NULL))
SELECT name FROM users u
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)
ORDER BY name;`,
    options: ['Sara', 'NULL', 'Ali, Sara', 'Ali'], answer: 0,
    why: W('NOT EXISTS لا يتأثر بقيم NULL في الجدول الآخر، على عكس NOT IN التي كانت سترجع لا شيء هنا.', 'NOT EXISTS is not affected by NULLs in the other table, unlike NOT IN, which would return nothing here.', 'NOT EXISTS diğer tablodaki NULL’lardan etkilenmez; burada hiçbir şey döndürmeyecek olan NOT IN’in aksine.') }),
  output({ ...sql, id: 'db-s2-count-distinct-null', level: 'senior',
    code: `SELECT COUNT(DISTINCT column1), COUNT(column1)
FROM (VALUES (1), (NULL), (1), (2)) AS t;`,
    options: ['2 3', '3 4', '2 4', '3 3'], answer: 0,
    why: W('كلاهما يتجاهل NULL، ثم DISTINCT يحذف تكرار الرقم 1.', 'Both skip the NULL, and then DISTINCT drops the repeated 1.', 'İkisi de NULL’ı atlar, sonra DISTINCT tekrar eden 1’i atar.') }),
  choice({ id: 'db-s2-lost-update', level: 'senior', topic,
    prompt: W('طلبان متزامنان يقرآن المخزون (1) ثم يكتب كل منهما stock = 0، فيُباع المنتج مرتين. ما الحل الأبسط؟', 'Two concurrent requests read stock (1), then each writes stock = 0, so the item sells twice. Simplest fix?', 'Eşzamanlı iki istek stoku (1) okuyup her biri stock = 0 yazıyor; ürün iki kez satılıyor. En basit çözüm?'),
    options: {

      ar: ["UPDATE products SET stock = stock - 1 WHERE id = 7 AND stock > 0 (ثم فحص عدد الصفوف المتأثرة)", 'قراءة المخزون مرتين قبل الكتابة', 'إضافة فهرس على stock', 'تخزين المخزون في الذاكرة المؤقتة'],

      en: ["UPDATE products SET stock = stock - 1 WHERE id = 7 AND stock > 0 (then check affected rows)", 'Read the stock twice before writing', 'Add an index on stock', 'Cache the stock'],

      tr: ["UPDATE products SET stock = stock - 1 WHERE id = 7 AND stock > 0 (sonra etkilenen satır sayısını kontrol et)", 'Yazmadan önce stoku iki kez okumak', 'stock’a indeks eklemek', 'Stoku önbelleğe almak'],

    }, answer: 0,
    why: W('التحديث الذرّي يجمع القراءة والكتابة في خطوة واحدة؛ إن أرجع 0 صفوف فالمنتج نفد. البديل: SELECT … FOR UPDATE داخل معاملة.', 'An atomic update does the read and write in one step; 0 affected rows means it sold out. The alternative is SELECT … FOR UPDATE inside a transaction.', 'Atomik güncelleme okuma ve yazmayı tek adımda yapar; 0 satır etkilendiyse ürün tükenmiştir. Alternatif: transaction içinde SELECT … FOR UPDATE.') }),
  choice({ id: 'db-s2-seq-scan', level: 'senior', topic,
    prompt: W('95% من الطلبات حالتها active، ومع ذلك يتجاهل PostgreSQL الفهرس على status في WHERE status = \'active\'. لماذا؟', '95% of orders are active, yet PostgreSQL ignores the index on status for WHERE status = \'active\'. Why?', 'Siparişlerin %95’i active, yine de PostgreSQL WHERE status = \'active\' için status indeksini yok sayıyor. Neden?'),
    options: L3(
      ['لأن قراءة الجدول كاملًا أرخص من القفز عبر الفهرس لمعظم الصفوف', 'الفهرس معطّل', 'يجب إعادة تشغيل الخادم', 'PostgreSQL لا يستخدم الفهارس مع النصوص'],
      ['Reading the whole table is cheaper than jumping through the index for most rows', 'The index is broken', 'The server needs a restart', 'PostgreSQL does not use indexes on text'],
      ['Satırların çoğu için indeksten atlamaktansa tüm tabloyu okumak daha ucuz', 'İndeks bozuk', 'Sunucu yeniden başlatılmalı', 'PostgreSQL metinde indeks kullanmaz'],
    ), answer: 0,
    why: W('الفهرس مفيد للشروط الانتقائية. هنا فهرس جزئي WHERE status <> \'active\' يفيد الاستعلامات عن الحالات النادرة.', 'Indexes help selective conditions. Here a partial index WHERE status <> \'active\' helps queries for the rare statuses.', 'İndeksler seçici koşullarda işe yarar. Burada nadir durumlar için WHERE status <> \'active\' kısmi indeksi faydalıdır.') }),
  choice({ id: 'db-s2-keyset', level: 'senior', topic,
    prompt: W('الصفحة 5000 من قائمة طويلة بطيئة جدًا مع OFFSET 100000. ما البديل؟', 'Page 5,000 of a long list is very slow with OFFSET 100000. The alternative?', 'Uzun bir listenin 5.000. sayfası OFFSET 100000 ile çok yavaş. Alternatif nedir?'),
    options: {

      ar: ['WHERE id > :last_id ORDER BY id LIMIT 20', 'OFFSET 100000 LIMIT 10', 'SELECT * then slice in code', 'ORDER BY RANDOM() LIMIT 20'],

      en: ['WHERE id > :last_id ORDER BY id LIMIT 20', 'OFFSET 100000 LIMIT 10', 'SELECT * ثم التقطيع في الكود', 'ORDER BY RANDOM() LIMIT 20'],

      tr: ['WHERE id > :last_id ORDER BY id LIMIT 20', 'OFFSET 100000 LIMIT 10', 'SELECT * sonra kodda dilimlemek', 'ORDER BY RANDOM() LIMIT 20'],

    }, answer: 0, codeLang: 'sql',
    why: W('OFFSET يقرأ كل الصفوف المتخطاة ثم يرميها. ترقيم المفاتيح (keyset) يقفز مباشرة عبر الفهرس، وسرعته ثابتة في أي صفحة.', 'OFFSET reads every skipped row and throws it away. Keyset pagination jumps straight through the index, at the same speed on any page.', 'OFFSET atlanan her satırı okuyup atar. Keyset sayfalama doğrudan indeksten atlar; her sayfada aynı hızdadır.') }),
  choice({ id: 'db-s2-concurrent-index', level: 'senior', topic,
    prompt: W('تحتاج فهرسًا جديدًا على جدول فيه 200 مليون صف في PostgreSQL والإنتاج يعمل. ما الطريقة الآمنة؟', 'You need a new index on a 200-million-row PostgreSQL table while production is running. The safe way?', 'Canlı çalışırken 200 milyon satırlık bir PostgreSQL tablosuna yeni indeks gerekiyor. Güvenli yol nedir?'),
    options: ['CREATE INDEX CONCURRENTLY idx_orders_user ON orders (user_id);', 'CREATE INDEX idx_orders_user ON orders (user_id);', 'LOCK TABLE orders; CREATE INDEX …', 'VACUUM FULL orders;'], answer: 0, codeLang: 'sql',
    why: W('الإنشاء العادي يمنع الكتابة على الجدول طوال المدة. CONCURRENTLY أبطأ لكنه لا يوقف الكتابة، ولا يعمل داخل معاملة.', 'A normal build blocks writes to the table the whole time. CONCURRENTLY is slower but does not block writes, and cannot run inside a transaction.', 'Normal oluşturma tüm süre boyunca tabloya yazmayı engeller. CONCURRENTLY daha yavaştır ama yazmayı engellemez ve transaction içinde çalışmaz.') }),
  choice({ id: 'db-s2-deadlock', level: 'senior', topic,
    prompt: W('معاملتان: الأولى تحدّث الحساب A ثم B، والثانية B ثم A. تظهر أخطاء deadlock. ما الإصلاح؟', 'Two transactions: one updates account A then B, the other B then A. Deadlocks appear. The fix?', 'İki transaction: biri önce A sonra B hesabını, diğeri önce B sonra A’yı güncelliyor. Deadlock oluşuyor. Düzeltme?'),
    options: L3(
      ['تحديث الصفوف بترتيب ثابت دائمًا (مثلًا حسب المعرّف الأصغر أولًا)', 'زيادة مهلة الانتظار', 'إلغاء المعاملات', 'استخدام فهرس إضافي'],
      ['Always update rows in a fixed order (say, lowest id first)', 'Increase the lock timeout', 'Drop transactions', 'Add another index'],
      ['Satırları her zaman sabit bir sırayla güncellemek (ör. önce küçük kimlik)', 'Kilit zaman aşımını artırmak', 'Transaction’ları kaldırmak', 'Ek indeks eklemek'],
    ), answer: 0,
    why: W('الـ deadlock يحدث عندما تنتظر كل معاملة قفلًا تملكه الأخرى. الترتيب الثابت يمنع الدائرة، ومع ذلك أعد المحاولة عند حدوثه.', 'A deadlock happens when each transaction waits on a lock the other holds. A fixed order breaks the cycle; still retry when one happens.', 'Deadlock, her transaction diğerinin tuttuğu kilidi beklediğinde olur. Sabit sıra döngüyü kırar; yine de olursa yeniden dene.') }),
  choice({ id: 'db-s2-replica-lag', level: 'senior', topic,
    prompt: W('المستخدم يعدّل اسمه ثم يرى الاسم القديم بعد إعادة التحميل. القراءة من نسخة replica. ما الحل؟', 'A user edits their name, reloads, and sees the old one. Reads go to a replica. The fix?', 'Kullanıcı adını değiştiriyor, yenileyince eskisini görüyor. Okumalar replica’dan. Çözüm?'),
    options: L3(
      ['قراءة بيانات المستخدم من الخادم الرئيسي لفترة قصيرة بعد الكتابة (read-your-writes)', 'حذف الـ replica', 'إضافة كاش أطول', 'إعادة المحاولة حتى يتغير الاسم'],
      ['Read that user’s data from the primary for a short time after a write (read-your-writes)', 'Remove the replica', 'Add a longer cache', 'Retry until the name changes'],
      ['Yazmadan sonra kısa süre o kullanıcının verisini primary’den okumak (read-your-writes)', 'Replica’yı kaldırmak', 'Daha uzun önbellek', 'İsim değişene kadar yeniden denemek'],
    ), answer: 0,
    why: W('النسخ إلى الـ replica غير فوري. الحل يُبقي فائدة الـ replica لبقية القراءات ويحل مشكلة من كتب للتو.', 'Replication to the replica is not instant. This keeps the replica’s benefit for other reads and fixes it for whoever just wrote.', 'Replica’ya kopyalama anlık değildir. Bu, diğer okumalar için replica’nın faydasını korur ve az önce yazan için sorunu çözer.') }),
]
