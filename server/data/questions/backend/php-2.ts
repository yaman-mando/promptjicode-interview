import type { Question } from '#shared/types/quiz'
import { choice, output } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const P = W('ماذا يطبع هذا الكود؟', 'What does this code print?', 'Bu kod ne yazdırır?')
const topic = 'php' as const

export const PHP_2: Question[] = [
  // ───────── Junior ─────────
  output({
    id: 'php-j2-plus-dot', level: 'junior', topic, codeLang: 'php', prompt: P,
    code: `echo "5" + "3", "\\n";
echo "5" . "3", "\\n";`,
    options: ['8, 53', '53, 8', '8, 8', '53, 53'], answer: 0,
    why: W('+ جمع رقمي حتى مع النصوص الرقمية، والنقطة . هي دمج النصوص في PHP.', '+ is numeric addition even for numeric strings; the dot . joins strings in PHP.', '+ sayısal metinlerde bile sayısal toplamadır; nokta . PHP’de metin birleştirmedir.'),
  }),
  output({
    id: 'php-j2-unset-key', level: 'junior', topic, codeLang: 'php', prompt: P,
    code: `$u = ["a" => 1, "b" => 2, "c" => 3];
unset($u["b"]);
echo count($u), " ", implode(",", array_keys($u)), "\\n";`,
    options: ['2 a,c', '3 a,b,c', '2 a,b', '3 a,c'], answer: 0,
    why: W('unset يحذف المفتاح وقيمته، فيبقى a وc.', 'unset removes the key and its value, leaving a and c.', 'unset anahtarı ve değerini siler; a ve c kalır.'),
  }),
  output({
    id: 'php-j2-isset-null', level: 'junior', topic, codeLang: 'php', prompt: P,
    code: `$x = null;
var_dump(isset($x));`,
    options: ['bool(false)', 'bool(true)', 'NULL', 'Warning'], answer: 0,
    why: W('isset ترجع false للمتغير غير الموجود وأيضًا للمتغير الذي قيمته null.', 'isset returns false for an undefined variable and also for one that is null.', 'isset tanımsız değişken için de, değeri null olan için de false döndürür.'),
  }),
  output({
    id: 'php-j2-empty-zero', level: 'junior', topic, codeLang: 'php', prompt: P,
    code: `var_dump(empty("0"));`,
    options: ['bool(true)', 'bool(false)', 'NULL', 'int(0)'], answer: 0,
    why: W('empty تعتبر النص "0" فارغًا، مثل "" و0 وnull و[]. انتبه عند فحص حقول النماذج.', 'empty treats the string "0" as empty, like "", 0, null and []. Careful when checking form fields.', 'empty "0" metnini boş sayar; "", 0, null ve [] gibi. Form alanlarını kontrol ederken dikkat.'),
  }),
  output({
    id: 'php-j2-for', level: 'junior', topic, codeLang: 'php', prompt: P,
    code: `for ($i = 0; $i < 3; $i++) {
    echo $i;
}
echo "\\n";`,
    options: ['012', '123', '0123', '01'], answer: 0,
    why: W('الحلقة تبدأ من 0 وتتوقف قبل 3، فتطبع 0 و1 و2 متتالية بدون فواصل.', 'The loop starts at 0 and stops before 3, printing 0, 1 and 2 with no separators.', 'Döngü 0’dan başlar ve 3’ten önce durur; 0, 1 ve 2’yi ayraçsız yazar.'),
  }),
  output({
    id: 'php-j2-default-arg', level: 'junior', topic, codeLang: 'php', prompt: P,
    code: `function greet($name = "Guest") {
    return "Hi $name";
}
echo greet(), "\\n";`,
    options: ['Hi Guest', 'Hi ', 'Hi $name', 'Error'], answer: 0,
    why: W('عند عدم تمرير المعامل تُستخدم القيمة الافتراضية "Guest".', 'With no argument passed, the default "Guest" is used.', 'Argüman verilmezse varsayılan "Guest" kullanılır.'),
  }),
  output({
    id: 'php-j2-array-merge', level: 'junior', topic, codeLang: 'php', prompt: P,
    code: `$a = [1, 2];
$b = [3];
echo json_encode(array_merge($a, $b)), "\\n";`,
    options: ['[1,2,3]', '[[1,2],[3]]', '[3,1,2]', '{"0":1,"1":2,"2":3}'], answer: 0,
    why: W('array_merge يضم المصفوفتين ويعيد ترقيم المفاتيح الرقمية.', 'array_merge joins both arrays and renumbers numeric keys.', 'array_merge iki diziyi birleştirir ve sayısal anahtarları yeniden numaralar.'),
  }),
  output({
    id: 'php-j2-match', level: 'junior', topic, codeLang: 'php', prompt: P,
    code: `$code = 404;
echo match ($code) {
    200 => "OK",
    404 => "Not Found",
    default => "Other",
}, "\\n";`,
    options: ['Not Found', 'OK', 'Other', '404'], answer: 0,
    why: W('match (منذ PHP 8) يقارن بـ === ويرجع قيمة، ولا يحتاج break مثل switch.', 'match (PHP 8+) compares with === and returns a value, with no break needed like switch.', 'match (PHP 8+) === ile karşılaştırır ve değer döndürür; switch gibi break gerekmez.'),
  }),
  choice({
    id: 'php-j2-composer', level: 'junior', topic,
    prompt: W('كيف تضيف مكتبة مثل guzzlehttp/guzzle إلى مشروع PHP؟', 'How do you add a library like guzzlehttp/guzzle to a PHP project?', 'guzzlehttp/guzzle gibi bir kütüphaneyi PHP projesine nasıl eklersin?'),
    options: ['composer require guzzlehttp/guzzle', 'npm install guzzle', 'php install guzzle', 'pip install guzzle'], answer: 0, codeLang: 'bash',
    why: W('Composer مدير حزم PHP: يضيف المكتبة إلى composer.json ويثبتها في vendor مع autoload.', 'Composer is PHP’s package manager: it adds the library to composer.json and installs it into vendor with autoloading.', 'Composer PHP’nin paket yöneticisidir: kütüphaneyi composer.json’a ekler ve autoload ile vendor’a kurar.'),
  }),
  choice({
    id: 'php-j2-laravel-env', level: 'junior', topic,
    prompt: W('أين تضع كلمة مرور قاعدة البيانات في مشروع Laravel؟', 'Where do you put the database password in a Laravel project?', 'Laravel projesinde veritabanı şifresini nereye koyarsın?'),
    options: L3(
      ['في ملف .env، ولا يُرفع إلى Git', 'داخل الـ Controller', 'في routes/web.php', 'في ملف Blade'],
      ['In the .env file, which is not committed to Git', 'Inside the controller', 'In routes/web.php', 'In a Blade file'],
      ['Git’e gönderilmeyen .env dosyasına', 'Controller’ın içine', 'routes/web.php içine', 'Bir Blade dosyasına'],
    ), answer: 0,
    why: W('ملفات config تقرأ القيم بـ env(\'DB_PASSWORD\')، والكود يقرأ config() فقط. هكذا يختلف الإعداد بين البيئات دون تعديل الكود.', 'Config files read values with env(\'DB_PASSWORD\'), and your code reads config(). Settings differ per environment without code changes.', 'Config dosyaları değerleri env(\'DB_PASSWORD\') ile okur, kod ise config() okur. Ayarlar kod değişmeden ortama göre değişir.'),
  }),
  choice({
    id: 'php-j2-blade-foreach', level: 'junior', topic,
    prompt: W('ما الصيغة الصحيحة لعرض قائمة مقالات في Blade؟', 'What is the right Blade syntax to list posts?', 'Blade’de yazıları listelemenin doğru söz dizimi nedir?'),
    options: ['@foreach ($posts as $post) … @endforeach', 'v-for="post in posts"', '{% for post in posts %}', '*ngFor="let post of posts"'], answer: 0, codeLang: 'php',
    why: W('Blade يستخدم توجيهات تبدأ بـ @. أما v-for فهي Vue، و{% for %} صيغة Twig أو Jinja، و*ngFor صيغة Angular.', 'Blade uses directives starting with @. v-for is Vue, {% for %} is Twig or Jinja, and *ngFor is Angular.', 'Blade @ ile başlayan direktifler kullanır. v-for Vue, {% for %} Twig veya Jinja, *ngFor Angular’dır.'),
  }),
  choice({
    id: 'php-j2-find-or-fail', level: 'junior', topic,
    prompt: W('ما الفرق بين User::find(5) وUser::findOrFail(5)؟', 'What is the difference between User::find(5) and User::findOrFail(5)?', 'User::find(5) ile User::findOrFail(5) arasındaki fark nedir?'),
    options: L3(
      ['find ترجع null إن لم يوجد، وfindOrFail ترمي استثناء يتحول إلى 404', 'لا فرق', 'findOrFail أسرع', 'find تنشئ المستخدم إن لم يوجد'],
      ['find returns null if missing; findOrFail throws an exception that becomes a 404', 'No difference', 'findOrFail is faster', 'find creates the user if missing'],
      ['find yoksa null döndürür; findOrFail 404’e dönüşen bir istisna fırlatır', 'Fark yok', 'findOrFail daha hızlı', 'find yoksa kullanıcıyı oluşturur'],
    ), answer: 0,
    why: W('في الـ controllers تريح findOrFail من كتابة فحص null يدويًا.', 'In controllers findOrFail saves you from writing the null check by hand.', 'Controller’larda findOrFail elle null kontrolü yazmaktan kurtarır.'),
  }),
  choice({
    id: 'php-j2-request-input', level: 'junior', topic,
    prompt: W('كيف تقرأ حقل email المرسل من نموذج في Laravel؟', 'How do you read the email field sent from a form in Laravel?', 'Laravel’de formdan gelen email alanını nasıl okursun?'),
    options: ["$request->input('email')", "$_GET->email", "request.email", "Input::email()"], answer: 0, codeLang: 'php',
    why: W('$request->input يقرأ من الجسم والرابط معًا، ويقبل قيمة افتراضية كمعامل ثانٍ. ويُفضّل استخدام البيانات بعد validate.', '$request->input reads from the body and the query string, and takes a default as its second argument. Prefer using the validated data.', '$request->input hem gövdeden hem query string’den okur ve ikinci argüman olarak varsayılan alır. Doğrulanmış veriyi kullanmak daha iyidir.'),
  }),

  // ───────── Mid ─────────
  output({
    id: 'php-m2-php8-compare', level: 'mid', topic, codeLang: 'php', prompt: P,
    code: `var_dump(in_array("abc", [0]));`,
    options: ['bool(false)', 'bool(true)', 'NULL', 'Warning'], answer: 0,
    why: W('في PHP 8 تغيّرت مقارنة النص غير الرقمي مع الرقم: "abc" == 0 أصبحت false (كانت true في PHP 7). ومع ذلك مرّر true كمعامل ثالث لمقارنة صارمة.', 'PHP 8 changed comparing a non-numeric string with a number: "abc" == 0 is now false (it was true in PHP 7). Still, pass true as the third argument for a strict check.', 'PHP 8 sayısal olmayan metinle sayı karşılaştırmasını değiştirdi: "abc" == 0 artık false (PHP 7’de true idi). Yine de katı kontrol için üçüncü argüman olarak true ver.'),
  }),
  output({
    id: 'php-m2-spaceship', level: 'mid', topic, codeLang: 'php', prompt: P,
    code: `echo 1 <=> 2, " ", "b" <=> "a", "\\n";`,
    options: ['-1 1', '1 -1', 'false true', '0 0'], answer: 0,
    why: W('<=> يرجع -1 أو 0 أو 1، وهو مناسب لدوال الترتيب مثل usort.', '<=> returns -1, 0 or 1, which suits sort callbacks like usort.', '<=> -1, 0 veya 1 döndürür; usort gibi sıralama fonksiyonlarına uygundur.'),
  }),
  output({
    id: 'php-m2-nullsafe', level: 'mid', topic, codeLang: 'php', prompt: P,
    code: `$user = null;
var_dump($user?->profile?->name);`,
    options: ['NULL', 'Error', 'string(0) ""', 'bool(false)'], answer: 0,
    why: W('?-> يوقف السلسلة ويرجع null إذا كان الطرف الأيسر null، بدل خطأ «استدعاء على null».', '?-> stops the chain and returns null when the left side is null, instead of an error.', '?-> sol taraf null ise zinciri durdurur ve hata yerine null döndürür.'),
  }),
  output({
    id: 'php-m2-array-map-keys', level: 'mid', topic, codeLang: 'php', prompt: P,
    code: `$prices = ["tea" => 5, "coffee" => 8];
echo json_encode(array_map(fn($p) => $p * 2, $prices)), "\\n";`,
    options: ['{"tea":10,"coffee":16}', '[10,16]', '{"0":10,"1":16}', '[5,8]'], answer: 0,
    why: W('array_map مع مصفوفة واحدة يحتفظ بالمفاتيح النصية، فيبقى الناتج كائنًا في JSON.', 'array_map with one array keeps string keys, so the result stays an object in JSON.', 'Tek diziyle array_map metin anahtarları korur; sonuç JSON’da nesne kalır.'),
  }),
  output({
    id: 'php-m2-array-by-value', level: 'mid', topic, codeLang: 'php', prompt: P,
    code: `function addOne(array $a) {
    $a[] = 1;
}
$list = [];
addOne($list);
echo count($list), "\\n";`,
    options: ['0', '1', 'Error', 'null'], answer: 0,
    why: W('المصفوفات تُمرَّر بالقيمة (نسخة)، فالتعديل داخل الدالة لا يصل للخارج. للتعديل استخدم &$a أو أرجع المصفوفة.', 'Arrays are passed by value (a copy), so changes inside do not leak out. Use &$a, or return the array.', 'Diziler değerle (kopya) geçirilir; içerideki değişiklik dışarı yansımaz. &$a kullan ya da diziyi döndür.'),
  }),
  output({
    id: 'php-m2-object-handle', level: 'mid', topic, codeLang: 'php', prompt: P,
    code: `class Box { public $n = 0; }
function inc(Box $b) { $b->n++; }
$box = new Box();
inc($box);
echo $box->n, "\\n";`,
    options: ['1', '0', 'Error', 'null'], answer: 0,
    why: W('الكائنات تُمرَّر بمقبض يشير لنفس الكائن، فالتعديل يظهر خارج الدالة، على عكس المصفوفات.', 'Objects are passed as a handle to the same object, so the change is visible outside, unlike arrays.', 'Nesneler aynı nesneyi gösteren bir tutamaçla geçirilir; diziler aksine değişiklik dışarıda görünür.'),
  }),
  output({
    id: 'php-m2-str-pad', level: 'mid', topic, codeLang: 'php', prompt: P,
    code: `echo str_pad("7", 3, "0", STR_PAD_LEFT), "\\n";`,
    options: ['007', '700', '7', '070'], answer: 0,
    why: W('str_pad يكمل النص إلى الطول 3 بإضافة 0 من اليسار، مفيد لأرقام الفواتير مثلًا.', 'str_pad fills the string to length 3 with 0 on the left, handy for invoice numbers.', 'str_pad metni soldan 0 ekleyerek 3 uzunluğa tamamlar; fatura numaraları için kullanışlı.'),
  }),
  output({
    id: 'php-m2-sort-reindex', level: 'mid', topic, codeLang: 'php', prompt: P,
    code: `$a = [3 => "c", 1 => "a", 2 => "b"];
sort($a);
echo json_encode($a), "\\n";`,
    options: ['["a","b","c"]', '{"1":"a","2":"b","3":"c"}', '["c","a","b"]', '{"3":"c","1":"a","2":"b"}'], answer: 0,
    why: W('sort يرتب القيم ويعيد ترقيم المفاتيح من 0. للحفاظ على المفاتيح استخدم asort أو ksort.', 'sort orders the values and renumbers keys from 0. Use asort or ksort to keep keys.', 'sort değerleri sıralar ve anahtarları 0’dan yeniden numaralar. Anahtarları korumak için asort veya ksort kullan.'),
  }),
  choice({
    id: 'php-m2-route-model-binding', level: 'mid', topic,
    prompt: W('ماذا يحدث عند طلب /posts/999 والمقال غير موجود؟', 'What happens when /posts/999 is requested and the post does not exist?', '/posts/999 istenince ve yazı yoksa ne olur?'),
    code: `Route::get('/posts/{post}', function (Post $post) {
    return $post;
});`, codeLang: 'php',
    options: L3(['يرجع Laravel 404 تلقائيًا', 'تصل $post فارغة', 'خطأ 500', 'يُنشأ مقال جديد'], ['Laravel returns a 404 automatically', '$post arrives empty', 'A 500 error', 'A new post is created'], ['Laravel otomatik 404 döndürür', '$post boş gelir', '500 hatası', 'Yeni yazı oluşturulur']), answer: 0,
    why: W('هذا route model binding: اسم المعامل يطابق {post}، فيبحث Laravel بالمعرّف ويرجع 404 إذا لم يجده.', 'This is route model binding: the parameter matches {post}, so Laravel looks it up by id and returns 404 if missing.', 'Bu route model binding’dir: parametre {post} ile eşleşir; Laravel kimliğe göre arar, yoksa 404 döndürür.'),
  }),
  choice({
    id: 'php-m2-policy', level: 'mid', topic,
    prompt: W('أين تضع قاعدة «لا يعدّل المقال إلا كاتبه» في Laravel؟', 'Where does the rule "only the author may edit a post" belong in Laravel?', 'Laravel’de "yazıyı sadece yazarı düzenleyebilir" kuralı nereye konur?'),
    options: L3(['في Policy، وتُفحص بـ $this->authorize(\'update\', $post)', 'في ملف Blade فقط بإخفاء الزر', 'في .env', 'في الـ migration'], ['In a Policy, checked with $this->authorize(\'update\', $post)', 'Only in Blade, by hiding the button', 'In .env', 'In the migration'], ['Bir Policy’de; $this->authorize(\'update\', $post) ile kontrol edilir', 'Sadece Blade’de butonu gizleyerek', '.env’de', 'Migration’da']), answer: 0,
    why: W('إخفاء الزر لا يكفي لأن الطلب يمكن إرساله مباشرة. الـ Policy تجمع قواعد الصلاحيات وتُفحص في الخادم.', 'Hiding the button is not enough, since the request can be sent directly. A Policy keeps permission rules in one place and is checked on the server.', 'Butonu gizlemek yetmez, istek doğrudan gönderilebilir. Policy yetki kurallarını tek yerde toplar ve sunucuda kontrol edilir.'),
  }),
  choice({
    id: 'php-m2-rollback', level: 'mid', topic,
    prompt: W('شغّلت migration خاطئة على بيئة التطوير. أي أمر يتراجع عن آخر دفعة؟', 'You ran a wrong migration in development. Which command undoes the last batch?', 'Geliştirmede yanlış bir migration çalıştırdın. Son grubu hangi komut geri alır?'),
    options: ['php artisan migrate:rollback', 'php artisan migrate:fresh --force', 'composer dump-autoload', 'php artisan cache:clear'], answer: 0, codeLang: 'bash',
    why: W('rollback ينفّذ دوال down() لآخر دفعة. أما migrate:fresh فيحذف كل الجداول ويعيد بناءها، فلا تستخدمه على الإنتاج.', 'rollback runs the down() methods of the last batch. migrate:fresh drops every table and rebuilds, never use it in production.', 'rollback son grubun down() metotlarını çalıştırır. migrate:fresh tüm tabloları silip yeniden kurar; canlıda asla kullanma.'),
  }),
  choice({
    id: 'php-m2-chunk', level: 'mid', topic,
    prompt: W('تريد المرور على مليون صف لإرسال إشعار. ما الطريقة الآمنة للذاكرة؟', 'You need to go through a million rows to send a notification. What is memory-safe?', 'Bildirim göndermek için bir milyon satırı dolaşman gerekiyor. Bellek açısından güvenli yol nedir?'),
    options: ['User::chunkById(1000, fn ($users) => …)', 'User::all()->each(…)', 'User::get()->toArray()', 'User::count()'], answer: 0, codeLang: 'php',
    why: W('all() يحمّل كل الصفوف في الذاكرة مرة واحدة. chunkById (أو lazyById) يجلبها دفعات صغيرة.', 'all() loads every row into memory at once. chunkById (or lazyById) fetches them in small batches.', 'all() tüm satırları tek seferde belleğe yükler. chunkById (veya lazyById) küçük gruplar halinde getirir.'),
  }),
  choice({
    id: 'php-m2-csrf-419', level: 'mid', topic,
    prompt: W('نموذج POST في Laravel يعطي خطأ 419 Page Expired. ما السبب الأرجح؟', 'A Laravel POST form gives a 419 Page Expired error. Most likely cause?', 'Laravel’de bir POST formu 419 Page Expired hatası veriyor. En olası sebep?'),
    options: L3(['ينقص @csrf داخل النموذج', 'الخادم بطيء', 'خطأ في قاعدة البيانات', 'الصفحة كبيرة جدًا'], ['@csrf is missing in the form', 'The server is slow', 'A database error', 'The page is too big'], ['Formda @csrf eksik', 'Sunucu yavaş', 'Veritabanı hatası', 'Sayfa çok büyük']), answer: 0,
    why: W('مسارات web تتطلب رمز CSRF مع كل POST. @csrf يضيف حقلًا مخفيًا فيه الرمز، وانتهاء الجلسة يعطي نفس الخطأ.', 'Web routes need a CSRF token on every POST. @csrf adds a hidden field with it; an expired session gives the same error.', 'Web rotaları her POST’ta CSRF token ister. @csrf onu gizli bir alanla ekler; oturum süresinin dolması da aynı hatayı verir.'),
  }),

  // ───────── Senior ─────────
  output({
    id: 'php-s2-int-overflow', level: 'senior', topic, codeLang: 'php', prompt: P,
    code: `var_dump(PHP_INT_MAX + 1);`,
    options: ['float(9.223372036854776E+18)', 'int(-9223372036854775808)', 'int(0)', 'OverflowError'], answer: 0,
    why: W('عند تجاوز حد int يتحول الناتج إلى float بصمت ويفقد الدقة. للأرقام الكبيرة جدًا استخدم BCMath أو GMP.', 'Going past the int limit silently becomes a float and loses precision. For very large numbers use BCMath or GMP.', 'int sınırını aşınca sonuç sessizce float olur ve hassasiyet kaybolur. Çok büyük sayılar için BCMath veya GMP kullan.'),
  }),
  output({
    id: 'php-s2-float', level: 'senior', topic, codeLang: 'php', prompt: P,
    code: `var_dump(0.1 + 0.2 == 0.3);`,
    options: ['bool(false)', 'bool(true)', 'float(0.3)', 'NULL'], answer: 0,
    why: W('الأعداد العشرية تُخزَّن تقريبيًا. للمبالغ المالية خزّن السنتات كأعداد صحيحة أو استخدم BCMath.', 'Floats are stored approximately. For money, store cents as integers or use BCMath.', 'Ondalıklı sayılar yaklaşık saklanır. Para için kuruşları tam sayı olarak sakla ya da BCMath kullan.'),
  }),
  output({
    id: 'php-s2-generator-keys', level: 'senior', topic, codeLang: 'php', prompt: P,
    code: `function gen() {
    yield 'a' => 1;
    yield 'b' => 2;
}
foreach (gen() as $k => $v) {
    echo "$k$v";
}
echo "\\n";`,
    options: ['a1b2', '0112', '12', 'ab'], answer: 0,
    why: W('الـ generator يستطيع إرجاع مفاتيح أيضًا، ويُنتج القيم واحدة واحدة دون بناء مصفوفة كاملة في الذاكرة.', 'A generator can yield keys too, and produces values one at a time without building a full array in memory.', 'Generator anahtar da üretebilir ve değerleri bellekte tam bir dizi oluşturmadan tek tek verir.'),
  }),
  output({
    id: 'php-s2-static-binding', level: 'senior', topic, codeLang: 'php', prompt: P,
    code: `class A {
    public static function create() { return new static(); }
}
class B extends A {}
echo get_class(B::create()), "\\n";`,
    options: ['B', 'A', 'static', 'Error'], answer: 0,
    why: W('new static يستخدم الصنف الذي استُدعيت عليه الدالة (late static binding)، بينما new self كانت ستنشئ A.', 'new static uses the class the method was called on (late static binding); new self would have created an A.', 'new static, metodun çağrıldığı sınıfı kullanır (late static binding); new self bir A oluştururdu.'),
  }),
  output({
    id: 'php-s2-readonly', level: 'senior', topic, codeLang: 'php', prompt: P,
    code: `class Money {
    public function __construct(public readonly int $amount) {}
}
$m = new Money(5);
try {
    $m->amount = 10;
} catch (Error $e) {
    echo get_class($e), "\\n";
}`,
    options: ['Error', 'Exception', 'TypeError', '10'], answer: 0,
    why: W('خاصية readonly (منذ PHP 8.1) تُكتب مرة واحدة داخل الصنف، وأي تعديل لاحق يرمي Error. مفيدة لكائنات القيم.', 'A readonly property (PHP 8.1+) is written once inside the class; any later change throws an Error. Great for value objects.', 'readonly özellik (PHP 8.1+) sınıf içinde bir kez yazılır; sonraki her değişiklik Error fırlatır. Değer nesneleri için ideal.'),
  }),
  output({
    id: 'php-s2-enum', level: 'senior', topic, codeLang: 'php', prompt: P,
    code: `enum Status: string {
    case Active = 'active';
    case Banned = 'banned';
}
echo Status::from('banned')->name, "\\n";`,
    options: ['Banned', 'banned', 'Status::Banned', '1'], answer: 0,
    why: W('from يحوّل القيمة إلى الحالة المطابقة ويرمي خطأ إن لم توجد (tryFrom ترجع null)، وname هو اسم الحالة.', 'from turns a value into the matching case and throws if none matches (tryFrom returns null); name is the case name.', 'from değeri eşleşen duruma çevirir, yoksa hata fırlatır (tryFrom null döndürür); name durumun adıdır.'),
  }),
  output({
    id: 'php-s2-named-args', level: 'senior', topic, codeLang: 'php', prompt: P,
    code: `function f(int $a, int $b = 2, int $c = 3) {
    return "$a$b$c";
}
echo f(1, c: 9), "\\n";`,
    options: ['129', '193', '923', 'Error'], answer: 0,
    why: W('المعاملات المسمّاة (PHP 8) تسمح بتخطي b وإعطاء c فقط، فتبقى b على قيمتها الافتراضية.', 'Named arguments (PHP 8) let you skip b and set only c, so b keeps its default.', 'İsimli argümanlar (PHP 8) b’yi atlayıp sadece c’yi vermeye izin verir; b varsayılanında kalır.'),
  }),
  output({
    id: 'php-s2-closure-use', level: 'senior', topic, codeLang: 'php', prompt: P,
    code: `$x = 1;
$f = function () use ($x) { return $x; };
$x = 2;
echo $f(), "\\n";`,
    options: ['1', '2', 'null', 'Error'], answer: 0,
    why: W('use ينسخ القيمة لحظة إنشاء الدالة. للربط بالمتغير نفسه استخدم use (&$x)، أما الدوال السهمية fn فتلتقط بالقيمة أيضًا.', 'use copies the value when the closure is created. To bind the variable itself, use use (&$x); arrow functions fn also capture by value.', 'use, closure oluşturulduğunda değeri kopyalar. Değişkenin kendisine bağlamak için use (&$x) kullan; fn ok fonksiyonları da değerle yakalar.'),
  }),
  choice({
    id: 'php-s2-octane-state', level: 'senior', topic,
    prompt: W('بعد تشغيل التطبيق بـ Laravel Octane، بدأ مستخدم يرى بيانات مستخدم آخر أحيانًا. ما السبب الأرجح؟', 'After moving to Laravel Octane, a user sometimes sees another user’s data. Most likely cause?', 'Laravel Octane’e geçtikten sonra bir kullanıcı bazen başka kullanıcının verisini görüyor. En olası sebep?'),
    options: L3(['singleton أو متغير static يحفظ بيانات الطلب ويبقى في الذاكرة بين الطلبات', 'بطء قاعدة البيانات', 'خطأ في Blade', 'Octane لا يدعم الجلسات'], ['A singleton or static variable holding request data stays in memory between requests', 'A slow database', 'A Blade bug', 'Octane does not support sessions'], ['İstek verisi tutan bir singleton veya static değişken istekler arasında bellekte kalıyor', 'Yavaş veritabanı', 'Blade hatası', 'Octane oturumları desteklemez']), answer: 0,
    why: W('Octane يُبقي التطبيق محمّلًا، فما كان يُمسح مع نهاية كل طلب صار يبقى. لا تحفظ المستخدم أو الطلب في singleton أو static.', 'Octane keeps the app loaded, so what used to be wiped at the end of each request now survives. Never keep the user or request in a singleton or a static.', 'Octane uygulamayı yüklü tutar; her isteğin sonunda silinen şeyler artık kalır. Kullanıcıyı veya isteği asla singleton ya da static içinde tutma.'),
  }),
  choice({
    id: 'php-s2-transaction-retry', level: 'senior', topic,
    prompt: W('ماذا يعني الرقم 3 هنا؟', 'What does the 3 mean here?', 'Buradaki 3 ne anlama gelir?'),
    code: `DB::transaction(function () {
    // …
}, 3);`, codeLang: 'php',
    options: L3(['عدد مرات إعادة المحاولة إذا حدث deadlock', 'مهلة 3 ثوانٍ', 'عدد الاستعلامات المسموحة', 'مستوى العزل'], ['How many times to retry if a deadlock happens', 'A 3-second timeout', 'How many queries are allowed', 'The isolation level'], ['Deadlock olursa kaç kez yeniden deneneceği', '3 saniyelik zaman aşımı', 'İzin verilen sorgu sayısı', 'İzolasyon seviyesi']), answer: 0,
    why: W('عند deadlock يعيد Laravel تنفيذ الدالة كاملة حتى 3 مرات، لذا يجب ألا تحتوي آثارًا خارجية مثل إرسال بريد.', 'On a deadlock Laravel re-runs the whole closure up to 3 times, so it must not contain outside side effects like sending email.', 'Deadlock’ta Laravel tüm closure’ı 3 kereye kadar yeniden çalıştırır; içinde e-posta göndermek gibi dış etkiler olmamalı.'),
  }),
  choice({
    id: 'php-s2-cache-lock', level: 'senior', topic,
    prompt: W('مهمة cron لإنشاء التقارير تعمل على 3 خوادم، فيُنشأ التقرير 3 مرات. ما الحل؟', 'A cron job that builds reports runs on 3 servers, so the report is built 3 times. What is the fix?', 'Rapor oluşturan bir cron işi 3 sunucuda çalışıyor ve rapor 3 kez oluşturuluyor. Çözüm nedir?'),
    options: {

      ar: ["->onOneServer() أو Cache::lock('reports')", 'sleep(rand(1, 10))', 'تشغيله كل دقيقة', 'حذف الخادمين الآخرين'],

      en: ["->onOneServer() or Cache::lock('reports')", 'sleep(rand(1, 10))', 'Run it every minute', 'Remove the other two servers'],

      tr: ["->onOneServer() veya Cache::lock('reports')", 'sleep(rand(1, 10))', 'Her dakika çalıştır', 'Diğer iki sunucuyu kaldır'],

    }, answer: 0,
    why: W('القفل المشترك (في Redis مثلًا) يسمح لخادم واحد فقط بالتنفيذ. onOneServer في الـ scheduler يستخدم هذا القفل تلقائيًا.', 'A shared lock (in Redis, say) lets only one server run it. onOneServer in the scheduler uses that lock for you.', 'Ortak bir kilit (ör. Redis’te) yalnızca bir sunucunun çalıştırmasına izin verir. Scheduler’daki onOneServer bu kilidi kendisi kullanır.'),
  }),
  choice({
    id: 'php-s2-raw-bindings', level: 'senior', topic,
    prompt: W('أي سطر آمن من SQL injection؟', 'Which line is safe from SQL injection?', 'Hangi satır SQL injection’a karşı güvenlidir?'),
    options: [
      "DB::select('SELECT * FROM users WHERE email = ?', [$email])",
      "DB::select(\"SELECT * FROM users WHERE email = '$email'\")",
      "DB::statement('SELECT * FROM users WHERE email = ' . $email)",
      "DB::raw(\"email = '$email'\")",
    ], answer: 0, codeLang: 'php',
    why: W('حتى مع Eloquent، الاستعلامات الخام تحتاج bindings (?). دمج المتغير داخل النص يعيد خطر الحقن.', 'Even with Eloquent, raw queries need bindings (?). Putting the variable into the string brings the injection risk back.', 'Eloquent ile bile ham sorgular binding (?) ister. Değişkeni metnin içine koymak enjeksiyon riskini geri getirir.'),
  }),
  choice({
    id: 'php-s2-session-regenerate', level: 'senior', topic,
    prompt: W('لماذا يستدعي Laravel $request->session()->regenerate() بعد تسجيل الدخول؟', 'Why does Laravel call $request->session()->regenerate() after login?', 'Laravel girişten sonra neden $request->session()->regenerate() çağırır?'),
    options: L3(['لمنع session fixation: معرّف جلسة جديد بعد تغيّر الصلاحيات', 'لتسريع الجلسة', 'لحذف السلة', 'لتغيير كلمة المرور'], ['To prevent session fixation: a new session id once privileges change', 'To speed up the session', 'To clear the cart', 'To change the password'], ['Session fixation’ı önlemek için: yetkiler değişince yeni oturum kimliği', 'Oturumu hızlandırmak için', 'Sepeti silmek için', 'Şifreyi değiştirmek için']), answer: 0,
    why: W('لو استطاع مهاجم فرض معرّف جلسة على الضحية قبل الدخول، فسيستخدمه بعده. تغيير المعرّف عند الدخول يقطع ذلك.', 'If an attacker could plant a session id on the victim before login, they could use it after. Changing the id at login cuts that off.', 'Saldırgan girişten önce kurbana bir oturum kimliği dayatabilirse, girişten sonra onu kullanabilir. Girişte kimliği değiştirmek bunu keser.'),
  }),
  choice({
    id: 'php-s2-unserialize-classes', level: 'senior', topic,
    prompt: W('إذا اضطررت لاستخدام unserialize على بيانات قديمة، ما الحماية الأساسية؟', 'If you must unserialize legacy data, what is the basic protection?', 'Eski verilerde unserialize kullanmak zorundaysan temel koruma nedir?'),
    options: {

      ar: ["unserialize($data, ['allowed_classes' => false])", 'unserialize(base64_decode($data))', '@unserialize($data)', 'serialize($data) قبلها'],

      en: ["unserialize($data, ['allowed_classes' => false])", 'unserialize(base64_decode($data))', '@unserialize($data)', 'serialize($data) first'],

      tr: ["unserialize($data, ['allowed_classes' => false])", 'unserialize(base64_decode($data))', '@unserialize($data)', 'önce serialize($data)'],

    }, answer: 0, codeLang: 'php',
    why: W('منع إنشاء الكائنات يغلق باب «POP chains» التي تنفذ كودًا. والأفضل الانتقال إلى json_decode.', 'Blocking object creation shuts the door on POP chains that run code. Better still, move to json_decode.', 'Nesne oluşturmayı engellemek kod çalıştıran POP zincirlerinin kapısını kapatır. Daha iyisi json_decode’a geçmek.'),
  }),
]
