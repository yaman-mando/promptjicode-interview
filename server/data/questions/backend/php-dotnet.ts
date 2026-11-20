import type { Question } from '#shared/types/quiz'
import { choice, output } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const WHAT_PRINTS = W('ماذا يطبع هذا الكود؟', 'What does this code print?', 'Bu kod ne yazdırır?')

export const PHP_DOTNET: Question[] = [
  // ───────── PHP / Laravel · Junior ─────────
  output({
    id: 'php-j-quotes', level: 'junior', topic: 'php', codeLang: 'php',
    prompt: WHAT_PRINTS,
    code: `$name = "Sara";
echo 'Hi $name', "\\n";
echo "Hi $name", "\\n";`,
    options: ['Hi $name, Hi Sara', 'Hi Sara, Hi Sara', 'Hi $name, Hi $name', 'Hi Sara, Hi $name'],
    answer: 0,
    why: W('علامات التنصيص المفردة تبقي النص كما هو، والمزدوجة تستبدل المتغيرات بقيمها.',
      'Single quotes keep the text as is; double quotes replace variables with their values.',
      'Tek tırnak metni olduğu gibi bırakır; çift tırnak değişkenleri değerleriyle değiştirir.'),
  }),
  output({
    id: 'php-j-array-push', level: 'junior', topic: 'php', codeLang: 'php',
    prompt: WHAT_PRINTS,
    code: `$items = ["a", "b"];
$items[] = "c";
echo count($items), "\\n";`,
    options: ['3', '2', '1', 'c'],
    answer: 0,
    why: W('$items[] = … يضيف عنصرًا في نهاية المصفوفة، مثل array_push، فيصبح عددها 3.',
      '$items[] = … appends to the end of the array, like array_push, so the count becomes 3.',
      '$items[] = … dizinin sonuna ekler, array_push gibi; eleman sayısı 3 olur.'),
  }),
  output({
    id: 'php-j-strict-compare', level: 'junior', topic: 'php', codeLang: 'php',
    prompt: WHAT_PRINTS,
    code: `var_dump(0 == "0", 0 === "0");`,
    options: ['bool(true), bool(false)', 'bool(true), bool(true)', 'bool(false), bool(false)', 'bool(false), bool(true)'],
    answer: 0,
    why: W('== يحوّل الأنواع قبل المقارنة، و=== يقارن القيمة والنوع معًا. هنا رقم ونص، فـ === خاطئة. استخدم === افتراضيًا.',
      '== converts types before comparing; === compares value and type. Here it is a number and a string, so === is false. Default to ===.',
      '== karşılaştırmadan önce tipleri çevirir; === değeri ve tipi birlikte karşılaştırır. Burada biri sayı biri metin, === false olur. Varsayılan olarak === kullan.'),
  }),
  output({
    id: 'php-j-null-coalesce', level: 'junior', topic: 'php', codeLang: 'php',
    prompt: WHAT_PRINTS,
    code: `$user = ["name" => "Ali"];
echo $user["age"] ?? 18, "\\n";`,
    options: ['18', 'Warning: Undefined array key', 'null', '0'],
    answer: 0,
    why: W('?? يرجع القيمة اليسرى إذا كانت موجودة وليست null، وإلا يرجع اليمنى، دون تحذير عن المفتاح المفقود.',
      '?? returns the left value if it exists and is not null, otherwise the right one, with no warning about the missing key.',
      '?? sol değer varsa ve null değilse onu, yoksa sağdakini döndürür; eksik anahtar için uyarı vermez.'),
  }),
  choice({
    id: 'php-j-laravel-routes', level: 'junior', topic: 'php',
    prompt: W('في Laravel، أين تُعرَّف مسارات صفحات الموقع العادية؟', 'In Laravel, where are routes for normal web pages defined?', 'Laravel’de normal web sayfalarının rotaları nerede tanımlanır?'),
    options: ['routes/web.php', 'app/Http/Kernel.php', 'config/app.php', 'public/index.php'],
    answer: 0,
    why: W('routes/web.php للصفحات (مع الجلسات وCSRF)، وroutes/api.php لمسارات الـ API التي تبدأ بـ /api وتكون بلا حالة.',
      'routes/web.php is for pages (with sessions and CSRF), and routes/api.php for API routes, prefixed with /api and stateless.',
      'routes/web.php sayfalar içindir (oturum ve CSRF ile); routes/api.php ise /api önekli, durumsuz API rotaları içindir.'),
  }),
  choice({
    id: 'php-j-artisan-migration', level: 'junior', topic: 'php',
    prompt: W('أي أمر ينشئ ملف migration جديد لجدول posts في Laravel؟', 'Which command creates a new migration for a posts table in Laravel?', 'Laravel’de posts tablosu için yeni bir migration oluşturan komut hangisi?'),
    options: ['php artisan make:migration create_posts_table', 'php artisan migrate posts', 'composer create posts', 'php artisan db:seed posts'],
    answer: 0, codeLang: 'bash',
    why: W('make:migration ينشئ الملف فقط، ثم php artisan migrate ينفذه على قاعدة البيانات. وdb:seed يملأ بيانات تجريبية.',
      'make:migration only creates the file; php artisan migrate then runs it against the database. db:seed fills in sample data.',
      'make:migration sadece dosyayı oluşturur; ardından php artisan migrate onu veritabanında çalıştırır. db:seed örnek veri ekler.'),
  }),
  choice({
    id: 'php-j-blade-escape', level: 'junior', topic: 'php',
    prompt: W('أي صيغة في Blade آمنة لعرض اسم كتبه المستخدم؟', 'Which Blade syntax is safe for showing a name the user typed?', 'Kullanıcının yazdığı bir adı göstermek için hangi Blade söz dizimi güvenlidir?'),
    options: ['{{ $name }}', '{!! $name !!}', '<?= $name ?>', '@raw($name)'],
    answer: 0, codeLang: 'php',
    why: W('{{ }} يهرّب الـ HTML تلقائيًا، فيظهر <script> كنص. أما {!! !!} فيطبع الـ HTML كما هو، ويُستخدم فقط مع محتوى موثوق.',
      '{{ }} escapes HTML automatically, so <script> shows as text. {!! !!} prints raw HTML and is only for trusted content.',
      '{{ }} HTML’i otomatik kaçışlar, <script> metin olarak görünür. {!! !!} HTML’i olduğu gibi basar; sadece güvenilir içerik için kullanılır.'),
  }),

  // ───────── PHP / Laravel · Mid ─────────
  choice({
    id: 'php-m-eager-loading', level: 'mid', topic: 'php',
    prompt: W('صفحة تعرض 50 مقالًا مع اسم الكاتب وتنفذ 51 استعلامًا. ما الحل في Eloquent؟', 'A page lists 50 posts with the author name and runs 51 queries. What is the fix in Eloquent?', 'Bir sayfa 50 yazıyı yazar adıyla listeliyor ve 51 sorgu çalıştırıyor. Eloquent’te çözüm nedir?'),
    code: `$posts = Post::all();
foreach ($posts as $post) {
    echo $post->author->name;
}`, codeLang: 'php',
    options: ["Post::with('author')->get()", 'Post::all()->fresh()', "Post::select('author')->get()", 'Post::count()'],
    answer: 0,
    why: W('الوصول إلى $post->author يحمّل العلاقة كسولًا (lazy) لكل مقال. with() يجلب كل الكتّاب في استعلام ثانٍ واحد (eager loading).',
      'Accessing $post->author lazy-loads the relation for each post. with() loads all the authors in one extra query (eager loading).',
      '$post->author’a erişmek ilişkiyi her yazı için tembel (lazy) yükler. with() tüm yazarları tek bir ek sorguda yükler (eager loading).'),
  }),
  choice({
    id: 'php-m-fillable', level: 'mid', topic: 'php',
    prompt: W('ما وظيفة $fillable في موديل Laravel؟', 'What is $fillable for in a Laravel model?', 'Laravel modelindeki $fillable ne işe yarar?'),
    code: `class User extends Model
{
    protected $fillable = ['name', 'email'];
}

User::create($request->all());`, codeLang: 'php',
    options: L3(
      ['تحديد الحقول المسموح تعبئتها جماعيًا، فلا يستطيع المستخدم إرسال is_admin مثلًا', 'الحقول المطلوبة في النموذج', 'الحقول المخفية في JSON', 'ترتيب الأعمدة في الجدول'],
      ['Lists the fields allowed in mass assignment, so a user cannot send is_admin, for example', 'The required form fields', 'Fields hidden from JSON', 'Column order in the table'],
      ['Toplu atamada izin verilen alanları belirler; kullanıcı örneğin is_admin gönderemez', 'Formdaki zorunlu alanlar', 'JSON’da gizlenen alanlar', 'Tablodaki sütun sırası'],
    ),
    answer: 0,
    why: W('هذه حماية من mass assignment. الأفضل أيضًا تمرير البيانات المتحقق منها فقط: User::create($request->validated()).',
      'This protects against mass assignment. Better still, pass only validated data: User::create($request->validated()).',
      'Bu, mass assignment’a karşı korumadır. Daha da iyisi sadece doğrulanmış veriyi geçirmek: User::create($request->validated()).'),
  }),
  output({
    id: 'php-m-array-filter-keys', level: 'mid', topic: 'php', codeLang: 'php',
    prompt: WHAT_PRINTS,
    code: `$prices = [10, 25, 40];
$big = array_filter($prices, fn($p) => $p > 20);
echo json_encode($big), "\\n";`,
    options: ['{"1":25,"2":40}', '[25,40]', '[10]', '{"0":25,"1":40}'],
    answer: 0,
    why: W('array_filter يحتفظ بالمفاتيح الأصلية (1 و2)، فلا تبدأ المصفوفة من 0، ويحوّلها json_encode إلى كائن. استخدم array_values لإعادة الترقيم.',
      'array_filter keeps the original keys (1 and 2), so the array no longer starts at 0 and json_encode turns it into an object. Use array_values to renumber.',
      'array_filter orijinal anahtarları (1 ve 2) korur; dizi 0’dan başlamaz ve json_encode onu nesneye çevirir. Yeniden numaralamak için array_values kullan.'),
  }),
  choice({
    id: 'php-m-validate', level: 'mid', topic: 'php',
    prompt: W('ماذا يحدث في طلب JSON إذا فشل التحقق هنا؟', 'In a JSON request, what happens if validation fails here?', 'Bir JSON isteğinde doğrulama burada başarısız olursa ne olur?'),
    code: `$data = $request->validate([
    'email' => 'required|email',
    'age'   => 'integer|min:18',
]);`, codeLang: 'php',
    options: L3(
      ['يتوقف التنفيذ ويرجع Laravel رد 422 فيه الأخطاء لكل حقل', 'تكون $data فارغة ويكمل الكود', 'خطأ 500', 'يُحفظ الطلب مع الأخطاء'],
      ['Execution stops and Laravel returns a 422 with errors per field', '$data is empty and the code continues', 'A 500 error', 'The request is saved with the errors'],
      ['Çalışma durur ve Laravel alan başına hatalarla 422 döndürür', '$data boş olur ve kod devam eder', '500 hatası', 'İstek hatalarla birlikte kaydedilir'],
    ),
    answer: 0,
    why: W('validate يرمي ValidationException. في طلبات الصفحات يرجع المستخدم للنموذج مع الأخطاء، وفي طلبات JSON يرجع 422.',
      'validate throws a ValidationException. For page requests the user is sent back to the form with errors; for JSON requests you get a 422.',
      'validate bir ValidationException fırlatır. Sayfa isteklerinde kullanıcı hatalarla forma geri gönderilir; JSON isteklerinde 422 döner.'),
  }),
  choice({
    id: 'php-m-auth-middleware', level: 'mid', topic: 'php',
    prompt: W('كيف تجعل مجموعة مسارات متاحة للمستخدمين المسجّلين فقط في Laravel؟', 'How do you make a group of routes available to signed-in users only in Laravel?', 'Laravel’de bir rota grubunu sadece giriş yapmış kullanıcılara nasıl açarsın?'),
    options: [
      "Route::middleware('auth')->group(function () { … })",
      "Route::private(function () { … })",
      "if (session('user')) { Route::get(…) }",
      "Route::get(…)->hidden()",
    ],
    answer: 0, codeLang: 'php',
    why: W('الـ middleware يعمل قبل الـ controller لكل طلب، ويعيد غير المسجّل إلى صفحة الدخول (أو 401 للـ API). ولفحص الصلاحيات استخدم Policies أو Gates.',
      'Middleware runs before the controller on every request and sends guests to the login page (or 401 for APIs). For permissions, use Policies or Gates.',
      'Middleware her istekte controller’dan önce çalışır ve misafirleri giriş sayfasına (API’de 401’e) yönlendirir. Yetkiler için Policy veya Gate kullan.'),
  }),
  choice({
    id: 'php-m-queue-job', level: 'mid', topic: 'php',
    prompt: W('إرسال فاتورة PDF بالبريد يبطئ الطلب. ما الطريقة المعتادة في Laravel؟', 'Emailing a PDF invoice slows the request down. What is the usual Laravel way?', 'PDF faturayı e-postayla göndermek isteği yavaşlatıyor. Laravel’de alışılmış yol nedir?'),
    options: L3(
      ['Job ينفذ ShouldQueue ويُرسل بـ dispatch()، ويشغّله queue:work', 'sleep() قبل الإرسال', 'إرسال البريد من المتصفح', 'كتابة الكود في Blade'],
      ['A Job implementing ShouldQueue, sent with dispatch() and run by queue:work', 'sleep() before sending', 'Send the email from the browser', 'Put the code in Blade'],
      ['ShouldQueue uygulayan bir Job; dispatch() ile gönderilir, queue:work çalıştırır', 'Göndermeden önce sleep()', 'E-postayı tarayıcıdan göndermek', 'Kodu Blade’e yazmak'],
    ),
    answer: 0,
    why: W('الـ Job يُحفظ في الطابور (Redis أو قاعدة البيانات) ويرجع الطلب فورًا. الـ worker يعالجه ويعيد المحاولة عند الفشل.',
      'The job is stored in the queue (Redis or the database) and the request returns at once. A worker processes it and retries on failure.',
      'Job kuyruğa (Redis veya veritabanı) kaydedilir ve istek hemen döner. Bir worker onu işler ve başarısız olursa yeniden dener.'),
  }),
  output({
    id: 'php-m-strict-types', level: 'mid', topic: 'php', codeLang: 'php',
    prompt: WHAT_PRINTS,
    code: `declare(strict_types=1);

function add(int $a, int $b): int {
    return $a + $b;
}

try {
    echo add("2", 3), "\\n";
} catch (TypeError $e) {
    echo "TypeError\\n";
}`,
    options: ['TypeError', '5', '23', '0'],
    answer: 0,
    why: W('بدون strict_types يحوّل PHP النص "2" إلى 2 بصمت ويطبع 5. مع strict_types=1 يجب أن يطابق النوع تمامًا، فيُرمى TypeError.',
      'Without strict_types PHP quietly turns "2" into 2 and prints 5. With strict_types=1 the type must match exactly, so a TypeError is thrown.',
      'strict_types olmadan PHP "2"yi sessizce 2’ye çevirip 5 yazar. strict_types=1 ile tip tam eşleşmeli; TypeError fırlatılır.'),
  }),

  // ───────── PHP / Laravel · Senior ─────────
  output({
    id: 'php-s-foreach-ref', level: 'senior', topic: 'php', codeLang: 'php',
    prompt: WHAT_PRINTS,
    code: `$a = [1, 2, 3];
foreach ($a as &$v) {}
foreach ($a as $v) {}
echo implode(",", $a), "\\n";`,
    options: ['1,2,2', '1,2,3', '3,3,3', '1,1,1'],
    answer: 0,
    why: W('بعد الحلقة الأولى يبقى $v مرجعًا لآخر عنصر. الحلقة الثانية تكتب كل قيمة في $v، أي في آخر عنصر، فيصبح 2 في النهاية. اكتب unset($v) بعد أي foreach بالمرجع.',
      'After the first loop $v is still a reference to the last element. The second loop writes each value into $v, which is that last element, so it ends as 2. Always unset($v) after a by-reference foreach.',
      'İlk döngüden sonra $v hâlâ son elemana referanstır. İkinci döngü her değeri $v’ye, yani son elemana yazar; sonunda 2 olur. Referanslı foreach’ten sonra her zaman unset($v) yaz.'),
  }),
  choice({
    id: 'php-s-share-nothing', level: 'senior', topic: 'php',
    prompt: W('في PHP-FPM التقليدي، متغير static داخل دالة يُزاد مع كل طلب. ما قيمته في الطلب العاشر؟', 'In classic PHP-FPM, a static variable inside a function is incremented on each request. What is it on the 10th request?', 'Klasik PHP-FPM’de bir fonksiyon içindeki static değişken her istekte artırılıyor. 10. istekte değeri nedir?'),
    code: `function hits() {
    static $n = 0;
    return ++$n;
}
echo hits();`, codeLang: 'php',
    options: L3(
      ['1، لأن كل طلب يبدأ من الصفر (share-nothing)', '10', 'عدد عشوائي', 'خطأ'],
      ['1, because every request starts from scratch (share-nothing)', '10', 'A random number', 'An error'],
      ['1, çünkü her istek sıfırdan başlar (share-nothing)', '10', 'Rastgele bir sayı', 'Hata'],
    ),
    answer: 0,
    why: W('PHP التقليدي لا يحتفظ بالذاكرة بين الطلبات، فالحالة المشتركة تكون في قاعدة البيانات أو Redis. أما مع Octane أو Swoole فيبقى التطبيق في الذاكرة، وعندها تصبح الحالة الثابتة مصدرًا للأخطاء.',
      'Classic PHP keeps no memory between requests, so shared state lives in the database or Redis. With Octane or Swoole the app stays in memory, and static state then becomes a source of bugs.',
      'Klasik PHP istekler arasında bellek tutmaz; ortak durum veritabanında veya Redis’te durur. Octane veya Swoole ile uygulama bellekte kalır ve o zaman static durum hata kaynağı olur.'),
  }),
  choice({
    id: 'php-s-lock-for-update', level: 'senior', topic: 'php',
    prompt: W('كيف تمنع بيع آخر قطعة مرتين في Laravel عندما يصل طلبان معًا؟', 'How do you stop the last item being sold twice in Laravel when two requests arrive together?', 'Laravel’de iki istek birlikte geldiğinde son ürünün iki kez satılmasını nasıl önlersin?'),
    code: `DB::transaction(function () use ($id) {
    $item = Item::where('id', $id)->???->first();
    if ($item->stock < 1) throw new SoldOut();
    $item->decrement('stock');
});`, codeLang: 'php',
    options: ['lockForUpdate()', 'cache()', 'latest()', 'withTrashed()'],
    answer: 0,
    why: W('lockForUpdate ينفذ SELECT … FOR UPDATE، فينتظر الطلب الثاني حتى ينتهي الأول من الـ transaction ثم يرى المخزون الجديد.',
      'lockForUpdate runs SELECT … FOR UPDATE, so the second request waits until the first one’s transaction ends, then sees the new stock.',
      'lockForUpdate SELECT … FOR UPDATE çalıştırır; ikinci istek, ilkinin transaction’ı bitene kadar bekler ve sonra yeni stoğu görür.'),
  }),
  choice({
    id: 'php-s-prevent-lazy', level: 'senior', topic: 'php',
    prompt: W('كيف تكتشف مشاكل N+1 مبكرًا في مشروع Laravel كبير؟', 'How do you catch N+1 problems early in a large Laravel project?', 'Büyük bir Laravel projesinde N+1 sorunlarını erkenden nasıl yakalarsın?'),
    options: {
      ar: ['Model::preventLazyLoading() في بيئة التطوير', 'إيقاف الكاش', 'Post::all() دائمًا', 'زيادة memory_limit'],
      en: ['Model::preventLazyLoading() in development', 'Turn off the cache', 'Always Post::all()', 'Raise memory_limit'],
      tr: ['Geliştirme ortamında Model::preventLazyLoading()', 'Önbelleği kapat', 'Her zaman Post::all()', 'memory_limit’i artır'],
    },
    answer: 0,
    why: W('عند تفعيله يرمي Laravel استثناء كلما حُمّلت علاقة كسولًا، فتظهر المشكلة أثناء التطوير بدل أن تُكتشف في الإنتاج.',
      'Once on, Laravel throws whenever a relation is lazy-loaded, so the problem shows up during development instead of in production.',
      'Açıkken Laravel bir ilişki tembel yüklendiğinde istisna fırlatır; sorun canlıda değil geliştirme sırasında ortaya çıkar.'),
  }),
  choice({
    id: 'php-s-opcache', level: 'senior', topic: 'php',
    prompt: W('ما فائدة تفعيل OPcache في الإنتاج؟', 'What does enabling OPcache in production do?', 'Canlı ortamda OPcache’i açmak ne işe yarar?'),
    options: L3(
      ['يحفظ الكود المترجم (bytecode) في الذاكرة فلا يُعاد تحليل الملفات مع كل طلب', 'يخزّن نتائج استعلامات قاعدة البيانات', 'يضغط الصفحات قبل إرسالها', 'يخزّن الجلسات'],
      ['Keeps compiled bytecode in memory so files are not parsed again on every request', 'Caches database query results', 'Compresses pages before sending', 'Stores sessions'],
      ['Derlenmiş bytecode’u bellekte tutar; dosyalar her istekte yeniden ayrıştırılmaz', 'Veritabanı sorgu sonuçlarını önbelleğe alır', 'Sayfaları göndermeden önce sıkıştırır', 'Oturumları saklar'],
    ),
    answer: 0,
    why: W('بدون OPcache يقرأ PHP كل ملف ويحوّله إلى bytecode في كل طلب. في الإنتاج يمكن أيضًا إيقاف فحص تغيّر الملفات (validate_timestamps=0) ومسح الكاش عند النشر.',
      'Without OPcache, PHP reads and compiles every file on every request. In production you can also turn off file-change checks (validate_timestamps=0) and reset the cache on deploy.',
      'OPcache olmadan PHP her istekte her dosyayı okuyup derler. Canlıda dosya değişikliği kontrolünü de kapatabilir (validate_timestamps=0) ve dağıtımda önbelleği sıfırlayabilirsin.'),
  }),
  choice({
    id: 'php-s-password-hash', level: 'senior', topic: 'php',
    prompt: W('مشروع قديم يحفظ كلمات المرور بـ md5. ما الطريقة الصحيحة للانتقال دون إجبار الجميع على إعادة التعيين؟', 'A legacy project stores passwords as md5. What is the right way to migrate without forcing everyone to reset?', 'Eski bir proje şifreleri md5 olarak saklıyor. Herkesi sıfırlamaya zorlamadan geçişin doğru yolu nedir?'),
    options: L3(
      ['عند كل تسجيل دخول ناجح بـ md5، أعد الحفظ بـ password_hash، ثم تحقق بـ password_verify', 'تشفير md5 مرة ثانية', 'إضافة salt ثابت للجميع', 'تحويل md5 إلى Base64'],
      ['On each successful md5 login, re-save with password_hash, then check with password_verify', 'md5 the md5 again', 'Add one fixed salt for everyone', 'Convert md5 to Base64'],
      ['Her başarılı md5 girişinde password_hash ile yeniden kaydet, sonra password_verify ile doğrula', 'md5’i tekrar md5’le', 'Herkese sabit bir salt ekle', 'md5’i Base64’e çevir'],
    ),
    answer: 0,
    why: W('password_hash يستخدم bcrypt أو Argon2 مع salt عشوائي، وpassword_needs_rehash يخبرك متى ترفع الإعدادات. ويمكن أيضًا تغليف md5 القديم داخل password_hash لحماية الحسابات غير النشطة.',
      'password_hash uses bcrypt or Argon2 with a random salt, and password_needs_rehash tells you when to upgrade. You can also wrap the old md5 inside password_hash to protect inactive accounts.',
      'password_hash rastgele salt’lı bcrypt veya Argon2 kullanır; password_needs_rehash ne zaman yükseltileceğini söyler. Etkin olmayan hesapları korumak için eski md5’i password_hash içine de sarabilirsin.'),
  }),

  // ───────── C# / .NET · Junior ─────────
  choice({
    id: 'cs-j-var', level: 'junior', topic: 'dotnet',
    prompt: W('ماذا يحدث في السطر الثاني؟', 'What happens on the second line?', 'İkinci satırda ne olur?'),
    code: `var count = 5;
count = "five";`, codeLang: 'cs',
    options: L3(
      ['خطأ ترجمة: النوع int استُنتج من القيمة الأولى', 'يصبح count نصًا', 'يصبح count = 0', 'لا شيء'],
      ['A compile error: the type int was inferred from the first value', 'count becomes a string', 'count becomes 0', 'Nothing'],
      ['Derleme hatası: tip int ilk değerden çıkarıldı', 'count metne dönüşür', 'count 0 olur', 'Hiçbir şey'],
    ),
    answer: 0,
    why: W('var لا يعني «أي نوع» كما في JavaScript، بل يطلب من المترجم استنتاج النوع مرة واحدة. بعدها يبقى المتغير int.',
      'var does not mean "any type" like in JavaScript; it asks the compiler to infer the type once. After that the variable is an int.',
      'var, JavaScript’teki gibi "her tip" demek değildir; derleyiciden tipi bir kez çıkarmasını ister. Sonra değişken int olarak kalır.'),
  }),
  choice({
    id: 'cs-j-interpolation', level: 'junior', topic: 'dotnet',
    prompt: WHAT_PRINTS,
    code: `string name = "Sara";
int age = 30;
Console.WriteLine($"{name} is {age + 1}");`, codeLang: 'cs',
    options: ['Sara is 31', '{name} is {age + 1}', 'Sara is 301', '$Sara is 31'],
    answer: 0,
    why: W('علامة $ قبل النص تجعل ما بين { } تعبيرات C# تُقيَّم، مثل f-string في Python.',
      'The $ before the string makes whatever is inside { } a C# expression, like an f-string in Python.',
      'Metnin önündeki $, { } içindekini değerlendirilen C# ifadeleri yapar; Python’daki f-string gibi.'),
  }),
  choice({
    id: 'cs-j-null-coalescing', level: 'junior', topic: 'dotnet',
    prompt: W('ما قيمة label عندما يكون user = null؟', 'What is label when user is null?', 'user = null iken label nedir?'),
    code: `string label = user?.Name ?? "Guest";`, codeLang: 'cs',
    options: ['"Guest"', 'null', 'NullReferenceException', '""'],
    answer: 0,
    why: W('?. يرجع null بدل رمي استثناء إذا كان user فارغًا، و?? يستبدل null بالقيمة "Guest".',
      '?. returns null instead of throwing when user is null, and ?? swaps that null for "Guest".',
      '?. user null ise istisna fırlatmak yerine null döndürür; ?? de o null’u "Guest" ile değiştirir.'),
  }),
  choice({
    id: 'cs-j-route-attribute', level: 'junior', topic: 'dotnet',
    prompt: W('أي طلب يصل إلى هذه الدالة في ASP.NET Core؟', 'Which request reaches this method in ASP.NET Core?', 'ASP.NET Core’da bu metoda hangi istek ulaşır?'),
    code: `[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    [HttpGet("{id}")]
    public IActionResult Get(int id) => Ok(id);
}`, codeLang: 'cs',
    options: ['GET /api/users/5', 'POST /api/users/5', 'GET /users/get/5', 'GET /api/UsersController/Get'],
    answer: 0,
    why: W('Route على الـ class يحدد البادئة api/users، وHttpGet("{id}") يضيف المعامل ويقيّد الطريقة بـ GET، ثم يحوّل 5 إلى int تلقائيًا.',
      'The class Route sets the api/users prefix, HttpGet("{id}") adds the parameter and limits it to GET, and 5 is bound to the int automatically.',
      'Sınıftaki Route api/users önekini belirler; HttpGet("{id}") parametreyi ekler ve GET ile sınırlar; 5 otomatik olarak int’e bağlanır.'),
  }),
  choice({
    id: 'cs-j-struct-copy', level: 'junior', topic: 'dotnet',
    prompt: WHAT_PRINTS,
    code: `struct Point { public int X; }

var a = new Point { X = 1 };
var b = a;
b.X = 5;
Console.WriteLine(a.X);`, codeLang: 'cs',
    options: {
      ar: ['1', '5', '0', 'خطأ ترجمة'],
      en: ['1', '5', '0', 'A compile error'],
      tr: ['1', '5', '0', 'Derleme hatası'],
    },
    answer: 0,
    why: W('الـ struct نوع قيمة (value type): b = a ينسخ القيمة كاملة، فتغيير b لا يغيّر a. لو كان Point من نوع class لطُبع 5.',
      'A struct is a value type: b = a copies the whole value, so changing b leaves a alone. If Point were a class, it would print 5.',
      'Struct bir değer tipidir: b = a değerin tamamını kopyalar, b’yi değiştirmek a’yı etkilemez. Point bir class olsaydı 5 yazardı.'),
  }),
  choice({
    id: 'cs-j-nuget', level: 'junior', topic: 'dotnet',
    prompt: W('ما مدير الحزم الرسمي في .NET؟', 'What is the official package manager in .NET?', '.NET’in resmi paket yöneticisi nedir?'),
    options: ['NuGet', 'npm', 'pip', 'Composer'],
    answer: 0,
    why: W('تضيف حزمة بـ dotnet add package اسم_الحزمة، فتُسجَّل في ملف .csproj. وnpm لـ JavaScript، وpip لـ Python، وComposer لـ PHP.',
      'You add a package with dotnet add package Name, and it is recorded in the .csproj file. npm is for JavaScript, pip for Python, Composer for PHP.',
      'dotnet add package Ad ile paket eklersin ve .csproj dosyasına kaydedilir. npm JavaScript, pip Python, Composer PHP içindir.'),
  }),
  choice({
    id: 'cs-j-list', level: 'junior', topic: 'dotnet',
    prompt: WHAT_PRINTS,
    code: `var names = new List<string> { "Ali", "Sara" };
names.Add("Omar");
names.Remove("Ali");
Console.WriteLine(names.Count);`, codeLang: 'cs',
    options: ['2', '3', '1', '4'],
    answer: 0,
    why: W('List<T> قائمة يتغير حجمها: بدأت بعنصرين، أُضيف Omar فصارت 3، ثم حُذف Ali فصارت 2.',
      'List<T> grows and shrinks: it starts with two, adding Omar makes 3, and removing Ali brings it to 2.',
      'List<T> büyüyüp küçülebilir: iki öğeyle başlar, Omar eklenince 3, Ali silinince 2 olur.'),
  }),

  // ───────── C# / .NET · Mid ─────────
  choice({
    id: 'cs-m-result-block', level: 'mid', topic: 'dotnet',
    prompt: W('ما المشكلة في استخدام .Result هنا داخل ASP.NET Core؟', 'What is wrong with using .Result here in ASP.NET Core?', 'ASP.NET Core’da burada .Result kullanmanın sorunu nedir?'),
    code: `public IActionResult Get(int id)
{
    var user = _service.GetUserAsync(id).Result;
    return Ok(user);
}`, codeLang: 'cs',
    options: L3(
      ['يحجز الخيط حتى ينتهي الطلب، فتنفد الخيوط تحت الضغط؛ استخدم async وawait حتى النهاية', 'لا مشكلة', '.Result أسرع من await', 'يرجع null دائمًا'],
      ['It blocks the thread until the call finishes, so threads run out under load; use async and await all the way', 'No problem', '.Result is faster than await', 'It always returns null'],
      ['Çağrı bitene kadar thread’i kilitler, yük altında thread’ler tükenir; baştan sona async ve await kullan', 'Sorun yok', '.Result await’ten hızlıdır', 'Her zaman null döner'],
    ),
    answer: 0,
    why: W('await يحرر الخيط ليخدم طلبات أخرى أثناء الانتظار. .Result و.Wait() يحجزانه (sync over async)، وفي بعض البيئات قد يسببان deadlock. اكتب: public async Task<IActionResult> Get(…).',
      'await frees the thread to serve other requests while waiting. .Result and .Wait() hold it (sync over async), and in some environments can deadlock. Write: public async Task<IActionResult> Get(…).',
      'await, beklerken thread’i başka isteklere hizmet etmesi için serbest bırakır. .Result ve .Wait() onu tutar (sync over async), bazı ortamlarda deadlock’a yol açabilir. Şöyle yaz: public async Task<IActionResult> Get(…).'),
  }),
  choice({
    id: 'cs-m-di-lifetimes', level: 'mid', topic: 'dotnet',
    prompt: W('أي عمر خدمة (service lifetime) ينشئ نسخة واحدة لكل طلب HTTP؟', 'Which service lifetime creates one instance per HTTP request?', 'Hangi servis ömrü her HTTP isteği için bir örnek oluşturur?'),
    options: ['AddScoped', 'AddSingleton', 'AddTransient', 'AddHostedService'],
    answer: 0, codeLang: 'cs',
    why: W('Scoped: نسخة لكل طلب (مثل DbContext). Singleton: نسخة واحدة للتطبيق كله. Transient: نسخة جديدة في كل مرة تُحقن فيها.',
      'Scoped: one per request (like DbContext). Singleton: one for the whole app. Transient: a new one every time it is injected.',
      'Scoped: istek başına bir (DbContext gibi). Singleton: tüm uygulama için bir. Transient: her enjeksiyonda yeni bir örnek.'),
  }),
  choice({
    id: 'cs-m-linq-deferred', level: 'mid', topic: 'dotnet',
    prompt: WHAT_PRINTS,
    code: `var nums = new List<int> { 1, 2, 3 };
var big = nums.Where(n => n > 1);
nums.Add(4);
Console.WriteLine(big.Count());`, codeLang: 'cs',
    options: ['3', '2', '4', '1'],
    answer: 0,
    why: W('استعلامات LINQ مؤجلة التنفيذ: Where لا تعمل حتى تُقرأ النتيجة. عند Count() تُفحص القائمة الحالية فيها 2 و3 و4. استخدم ToList() لأخذ لقطة ثابتة.',
      'LINQ queries are deferred: Where does not run until the result is read. Count() checks the list as it is now, with 2, 3 and 4. Call ToList() to take a fixed snapshot.',
      'LINQ sorguları ertelenir: Where sonuç okunana kadar çalışmaz. Count() listenin şimdiki halini kontrol eder: 2, 3 ve 4. Sabit bir kopya için ToList() çağır.'),
  }),
  choice({
    id: 'cs-m-ef-include', level: 'mid', topic: 'dotnet',
    prompt: W('كيف تجلب الطلبات مع بيانات العميل في استعلام واحد باستخدام EF Core؟', 'How do you load orders with their customer in one query with EF Core?', 'EF Core ile siparişleri müşterileriyle birlikte tek sorguda nasıl yüklersin?'),
    options: [
      'db.Orders.Include(o => o.Customer).ToListAsync()',
      'db.Orders.ToList().Select(o => o.Customer)',
      'db.Orders.Find(o => o.Customer)',
      'db.Customers.Orders()',
    ],
    answer: 0, codeLang: 'cs',
    why: W('Include يضيف JOIN فتأتي البيانات المرتبطة مع الطلبات. بدونه إما يكون Customer فارغًا، أو مع lazy loading يُنفَّذ استعلام لكل طلب (N+1).',
      'Include adds a JOIN so the related data comes back with the orders. Without it, Customer is either empty, or with lazy loading you get a query per order (N+1).',
      'Include bir JOIN ekler, ilişkili veri siparişlerle gelir. Onsuz Customer ya boş kalır ya da lazy loading ile her sipariş için bir sorgu (N+1) çalışır.'),
  }),
  choice({
    id: 'cs-m-using', level: 'mid', topic: 'dotnet',
    prompt: W('ماذا يضمن using هنا؟', 'What does using guarantee here?', 'Burada using neyi garanti eder?'),
    code: `using var stream = File.OpenRead("report.csv");
// … read the file …`, codeLang: 'cs',
    options: L3(
      ['استدعاء Dispose() وإغلاق الملف عند الخروج من النطاق، حتى لو حدث استثناء', 'استيراد مكتبة File', 'تشغيل الكود في خيط منفصل', 'منع تعديل الملف'],
      ['Dispose() is called and the file closed when the scope ends, even if an exception is thrown', 'It imports the File library', 'It runs the code on another thread', 'It stops the file being changed'],
      ['Kapsam bitince, istisna olsa bile Dispose() çağrılır ve dosya kapanır', 'File kütüphanesini içe aktarır', 'Kodu başka bir thread’de çalıştırır', 'Dosyanın değiştirilmesini engeller'],
    ),
    answer: 0,
    why: W('الملفات والاتصالات موارد خارج الـ garbage collector. بدون Dispose قد يبقى الملف مقفولًا أو تنفد الاتصالات. using var يختصر try/finally.',
      'Files and connections are resources outside the garbage collector. Without Dispose a file can stay locked or connections can run out. using var is shorthand for try/finally.',
      'Dosyalar ve bağlantılar çöp toplayıcının dışındaki kaynaklardır. Dispose olmadan dosya kilitli kalabilir veya bağlantılar tükenebilir. using var, try/finally’nin kısaltmasıdır.'),
  }),
  choice({
    id: 'cs-m-notfound', level: 'mid', topic: 'dotnet',
    prompt: W('ماذا يرجع الـ API إذا لم يوجد المستخدم؟', 'What does the API return if the user does not exist?', 'Kullanıcı yoksa API ne döndürür?'),
    code: `[HttpGet("{id}")]
public async Task<ActionResult<UserDto>> Get(int id)
{
    var user = await _db.Users.FindAsync(id);
    if (user is null) return NotFound();
    return new UserDto(user.Id, user.Name);
}`, codeLang: 'cs',
    options: {
      ar: ['404 Not Found', '200 مع null', '500', '204 No Content'],
      en: ['404 Not Found', '200 with null', '500', '204 No Content'],
      tr: ['404 Not Found', 'null ile 200', '500', '204 No Content'],
    },
    answer: 0,
    why: W('NotFound() يرجع 404. ونوع ActionResult<UserDto> يسمح بإرجاع كائن (200) أو نتيجة HTTP مثل NotFound أو BadRequest من نفس الدالة.',
      'NotFound() returns a 404. ActionResult<UserDto> lets the same method return either an object (200) or an HTTP result like NotFound or BadRequest.',
      'NotFound() 404 döndürür. ActionResult<UserDto> aynı metodun ya bir nesne (200) ya da NotFound veya BadRequest gibi bir HTTP sonucu döndürmesine izin verir.'),
  }),
  choice({
    id: 'cs-m-asnotracking', level: 'mid', topic: 'dotnet',
    prompt: W('صفحة تعرض قائمة منتجات للقراءة فقط. ما الإضافة التي تجعل استعلام EF Core أخف؟', 'A page shows a read-only product list. What makes the EF Core query lighter?', 'Bir sayfa salt okunur bir ürün listesi gösteriyor. EF Core sorgusunu ne hafifletir?'),
    options: ['AsNoTracking()', 'Include()', 'SaveChanges()', 'Attach()'],
    answer: 0, codeLang: 'cs',
    why: W('افتراضيًا يتتبع EF Core كل كائن ليعرف ما تغيّر عند SaveChanges، وهذا يأخذ ذاكرة ووقتًا. للقراءة فقط لا حاجة لذلك.',
      'By default EF Core tracks every entity to detect changes for SaveChanges, which costs memory and time. Read-only queries do not need it.',
      'EF Core varsayılan olarak SaveChanges’te değişiklikleri bulmak için her varlığı izler; bu bellek ve zaman harcar. Salt okunur sorgular buna ihtiyaç duymaz.'),
  }),

  // ───────── C# / .NET · Senior ─────────
  choice({
    id: 'cs-s-captive-dependency', level: 'senior', topic: 'dotnet',
    prompt: W('خدمة مسجلة كـ Singleton تستقبل AppDbContext في الـ constructor. ما المشكلة؟', 'A service registered as Singleton takes AppDbContext in its constructor. What is the problem?', 'Singleton olarak kayıtlı bir servis constructor’da AppDbContext alıyor. Sorun nedir?'),
    options: L3(
      ['captive dependency: نفس الـ DbContext (Scoped) يُشارك بين كل الطلبات، وهو ليس thread-safe', 'لا مشكلة', 'DbContext يصبح أسرع', 'الـ Singleton يُنشأ مع كل طلب'],
      ['A captive dependency: one Scoped DbContext gets shared by every request, and it is not thread-safe', 'No problem', 'The DbContext gets faster', 'The singleton is created per request'],
      ['Captive dependency: Scoped bir DbContext tüm isteklerce paylaşılır ve thread-safe değildir', 'Sorun yok', 'DbContext hızlanır', 'Singleton her istekte oluşturulur'],
    ),
    answer: 0,
    why: W('الخدمة الأطول عمرًا «تأسر» الأقصر عمرًا. الحل: اجعل الخدمة Scoped، أو احقن IServiceScopeFactory وأنشئ نطاقًا لكل عملية. وASP.NET Core يكشف ذلك في بيئة التطوير.',
      'The longer-lived service "captures" the shorter-lived one. Fix: make the service Scoped, or inject IServiceScopeFactory and create a scope per operation. ASP.NET Core catches this in development.',
      'Uzun ömürlü servis kısa ömürlüyü "esir alır". Çözüm: servisi Scoped yap ya da IServiceScopeFactory enjekte edip her işlem için bir kapsam oluştur. ASP.NET Core geliştirmede bunu yakalar.'),
  }),
  choice({
    id: 'cs-s-httpclient', level: 'senior', topic: 'dotnet',
    prompt: W('الكود ينشئ new HttpClient() لكل طلب ثم يتخلص منه. ماذا يحدث تحت ضغط عالٍ؟', 'The code creates new HttpClient() per request and disposes it. What happens under heavy load?', 'Kod her istekte new HttpClient() oluşturup atıyor. Yoğun yük altında ne olur?'),
    options: L3(
      ['نفاد المنافذ (socket exhaustion)؛ استخدم IHttpClientFactory أو عميلًا مشتركًا', 'لا شيء', 'تُخزَّن الردود تلقائيًا', 'يصبح أسرع'],
      ['Socket exhaustion; use IHttpClientFactory or a shared client', 'Nothing', 'Responses get cached', 'It gets faster'],
      ['Soket tükenmesi; IHttpClientFactory veya paylaşılan bir istemci kullan', 'Hiçbir şey', 'Yanıtlar önbelleğe alınır', 'Hızlanır'],
    ),
    answer: 0,
    why: W('كل عميل يفتح اتصالات تبقى في حالة TIME_WAIT بعد الإغلاق، فتنفد المنافذ. IHttpClientFactory يدير مجموعة اتصالات ويعيد استخدامها، ويحدّث DNS دوريًا.',
      'Each client opens connections that sit in TIME_WAIT after closing, so ports run out. IHttpClientFactory pools and reuses connections and refreshes DNS periodically.',
      'Her istemci kapandıktan sonra TIME_WAIT’te bekleyen bağlantılar açar, portlar tükenir. IHttpClientFactory bağlantıları havuzda tutup yeniden kullanır ve DNS’i düzenli yeniler.'),
  }),
  choice({
    id: 'cs-s-async-void', level: 'senior', topic: 'dotnet',
    prompt: W('لماذا يُعتبر async void خطيرًا خارج معالجات الأحداث؟', 'Why is async void dangerous outside event handlers?', 'async void neden olay işleyicileri dışında tehlikelidir?'),
    code: `public async void SendReport() { await _mailer.SendAsync(…); }`, codeLang: 'cs',
    options: L3(
      ['لا يمكن انتظاره، واستثناءاته لا تُلتقط وقد توقف التطبيق؛ استخدم async Task', 'لأنه أبطأ', 'لأنه لا يدعم await داخله', 'لا خطر'],
      ['It cannot be awaited, and its exceptions escape and can crash the app; use async Task', 'It is slower', 'It cannot use await inside', 'No danger'],
      ['Await edilemez, istisnaları yakalanmaz ve uygulamayı çökertebilir; async Task kullan', 'Daha yavaştır', 'İçinde await kullanılamaz', 'Tehlike yok'],
    ),
    answer: 0,
    why: W('المستدعي لا يعرف متى انتهت الدالة ولا يستطيع التقاط خطئها بـ try/catch. مع async Task يمكن انتظارها ومعالجة الأخطاء بشكل طبيعي.',
      'The caller cannot know when it finished or catch its error with try/catch. With async Task it can be awaited and errors handled normally.',
      'Çağıran, metodun ne zaman bittiğini bilemez ve hatasını try/catch ile yakalayamaz. async Task ile await edilebilir ve hatalar normal şekilde işlenir.'),
  }),
  choice({
    id: 'cs-s-iqueryable', level: 'senior', topic: 'dotnet',
    prompt: W('جدول Orders فيه مليون صف. لماذا هذا الكود بطيء ويستهلك ذاكرة كبيرة؟', 'Orders has a million rows. Why is this code slow and memory-hungry?', 'Orders tablosunda bir milyon satır var. Bu kod neden yavaş ve çok bellek harcıyor?'),
    code: `var recent = db.Orders
    .ToList()
    .Where(o => o.CreatedAt > since)
    .Take(20);`, codeLang: 'cs',
    options: L3(
      ['ToList() يجلب كل الصفوف إلى الذاكرة قبل الفلترة؛ ضع Where وTake قبل ToList', 'Take(20) بطيء', 'Where لا تعمل مع التواريخ', 'لا مشكلة'],
      ['ToList() pulls every row into memory before filtering; put Where and Take before ToList', 'Take(20) is slow', 'Where does not work with dates', 'No problem'],
      ['ToList() süzmeden önce tüm satırları belleğe çeker; Where ve Take’i ToList’ten önce koy', 'Take(20) yavaştır', 'Where tarihlerle çalışmaz', 'Sorun yok'],
    ),
    answer: 0,
    why: W('قبل ToList يكون الاستعلام IQueryable ويتحول إلى SQL. بعده يصبح IEnumerable في الذاكرة. ترتيب Where ثم Take ثم ToListAsync يجعل قاعدة البيانات ترجع 20 صفًا فقط.',
      'Before ToList the query is an IQueryable that becomes SQL; after it, it is an in-memory IEnumerable. Where, then Take, then ToListAsync lets the database return just 20 rows.',
      'ToList’ten önce sorgu SQL’e dönüşen bir IQueryable’dır; sonrasında bellekteki bir IEnumerable olur. Where, sonra Take, sonra ToListAsync sırası veritabanının sadece 20 satır döndürmesini sağlar.'),
  }),
  choice({
    id: 'cs-s-concurrency-token', level: 'senior', topic: 'dotnet',
    prompt: W('موظفان يعدّلان نفس المنتج في نفس الوقت، والثاني يكتب فوق تعديل الأول دون أن يعلم. ما الحل في EF Core؟', 'Two staff edit the same product at once, and the second silently overwrites the first. What is the fix in EF Core?', 'İki çalışan aynı ürünü aynı anda düzenliyor ve ikincisi farkında olmadan birincinin değişikliğinin üzerine yazıyor. EF Core’da çözüm nedir?'),
    options: L3(
      ['concurrency token مثل [Timestamp] RowVersion، ثم معالجة DbUpdateConcurrencyException', 'قفل الجدول كله', 'تعطيل SaveChanges', 'حفظ كل تعديل في ملف'],
      ['A concurrency token like a [Timestamp] RowVersion, then handle DbUpdateConcurrencyException', 'Lock the whole table', 'Disable SaveChanges', 'Save every edit to a file'],
      ['[Timestamp] RowVersion gibi bir eşzamanlılık belirteci, ardından DbUpdateConcurrencyException’ı işlemek', 'Tüm tabloyu kilitlemek', 'SaveChanges’i kapatmak', 'Her düzenlemeyi dosyaya kaydetmek'],
    ),
    answer: 0,
    why: W('هذا optimistic concurrency: الـ UPDATE يشترط أن يبقى RowVersion كما قُرئ. إذا تغيّر يرمي EF استثناء، فتعرض للمستخدم أن البيانات تغيّرت وتطلب منه المراجعة.',
      'This is optimistic concurrency: the UPDATE requires RowVersion to still match what was read. If it changed, EF throws, and you tell the user the data changed and ask them to review.',
      'Bu iyimser eşzamanlılıktır: UPDATE, RowVersion’ın okunduğu gibi kalmasını şart koşar. Değiştiyse EF istisna fırlatır; kullanıcıya verinin değiştiğini söyleyip gözden geçirmesini istersin.'),
  }),
  choice({
    id: 'cs-s-cancellation', level: 'senior', topic: 'dotnet',
    prompt: W('المستخدم أغلق الصفحة أثناء تقرير ثقيل، لكن الخادم يكمل الحساب حتى النهاية. ما الحل؟', 'The user closed the page during a heavy report, but the server keeps computing to the end. What is the fix?', 'Kullanıcı ağır bir rapor sırasında sayfayı kapattı ama sunucu hesaplamayı sonuna kadar sürdürüyor. Çözüm nedir?'),
    code: `[HttpGet("report")]
public async Task<IActionResult> Report(CancellationToken ct)
{
    var rows = await _db.Sales.Where(…).ToListAsync(???);
    return Ok(Build(rows));
}`, codeLang: 'cs',
    options: L3(
      ['تمرير ct إلى كل الدوال غير المتزامنة، فتتوقف عند انقطاع الاتصال', 'Thread.Abort()', 'زيادة المهلة', 'لا يمكن إيقافه'],
      ['Pass ct to every async call so the work stops when the client disconnects', 'Thread.Abort()', 'Raise the timeout', 'It cannot be stopped'],
      ['ct’yi her asenkron çağrıya geçir; istemci bağlantıyı kesince iş durur', 'Thread.Abort()', 'Zaman aşımını artır', 'Durdurulamaz'],
    ),
    answer: 0,
    why: W('ASP.NET Core يربط CancellationToken بالطلب ويلغيه عند انقطاع العميل. تمريره إلى EF وHttpClient والحلقات الطويلة يوفّر قاعدة البيانات والمعالج.',
      'ASP.NET Core ties the CancellationToken to the request and cancels it when the client goes away. Passing it to EF, HttpClient and long loops saves database and CPU work.',
      'ASP.NET Core, CancellationToken’ı isteğe bağlar ve istemci gidince iptal eder. Onu EF’ye, HttpClient’a ve uzun döngülere geçirmek veritabanı ve CPU’dan tasarruf sağlar.'),
  }),
]
