import type { Question } from '#shared/types/quiz'
import { choice } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })

export const ARCH_SECURITY: Question[] = [
  // ───────── Architecture · Junior ─────────
  choice({
    id: 'ar-j-cache', level: 'junior', topic: 'architecture',
    prompt: W('ما فكرة التخزين المؤقت (caching) في الخادم؟', 'What is the idea of caching on the server?', 'Sunucuda önbelleklemenin (caching) fikri nedir?'),
    options: L3(
      ['حفظ نتيجة عملية مكلفة لإعادة استخدامها بدل حسابها كل مرة', 'نسخ قاعدة البيانات احتياطيًا', 'ضغط الملفات قبل إرسالها', 'تشفير البيانات'],
      ['Keeping the result of an expensive operation to reuse instead of recomputing it', 'Backing up the database', 'Compressing files before sending', 'Encrypting data'],
      ['Pahalı bir işlemin sonucunu her seferinde hesaplamak yerine saklayıp yeniden kullanmak', 'Veritabanını yedeklemek', 'Dosyaları göndermeden önce sıkıştırmak', 'Veriyi şifrelemek'],
    ),
    answer: 0,
    why: W('مثلًا نتيجة استعلام ثقيل تُحفظ في Redis لدقائق، فتُخدم الطلبات التالية من الذاكرة بسرعة. والتحدي هو تحديثها عندما تتغير البيانات.',
      'For example, a heavy query result is kept in Redis for a few minutes, so the next requests are served from memory. The hard part is refreshing it when the data changes.',
      'Örneğin ağır bir sorgu sonucu birkaç dakika Redis’te tutulur ve sonraki istekler bellekten hızla karşılanır. Zor kısım, veri değişince onu yenilemektir.'),
  }),
  choice({
    id: 'ar-j-env-config', level: 'junior', topic: 'architecture',
    prompt: W('أين نضع رابط قاعدة البيانات وكلمات المرور التي تختلف بين بيئة التطوير والإنتاج؟', 'Where do you put the database URL and passwords that differ between development and production?', 'Geliştirme ile canlı ortam arasında değişen veritabanı adresi ve şifreleri nereye koyarız?'),
    options: L3(
      ['في متغيرات البيئة (environment variables)، لا داخل الكود', 'ثابتة داخل الكود', 'في ملف HTML', 'في قاعدة البيانات نفسها'],
      ['In environment variables, not in the code', 'Hard-coded in the source', 'In an HTML file', 'In the database itself'],
      ['Kodda değil, ortam değişkenlerinde (environment variables)', 'Kaynak kodda sabit olarak', 'Bir HTML dosyasında', 'Veritabanının kendisinde'],
    ),
    answer: 0,
    why: W('بهذا يعمل نفس الكود في كل بيئة، ولا تدخل الأسرار إلى Git. ملف .env للتطوير المحلي فقط، ويُضاف إلى .gitignore.',
      'That way the same code runs everywhere and secrets never land in Git. A .env file is for local development only and goes in .gitignore.',
      'Böylece aynı kod her ortamda çalışır ve sırlar Git’e girmez. .env dosyası sadece yerel geliştirme içindir ve .gitignore’a eklenir.'),
  }),
  choice({
    id: 'ar-j-load-balancer', level: 'junior', topic: 'architecture',
    prompt: W('ما وظيفة الـ load balancer؟', 'What does a load balancer do?', 'Load balancer ne iş yapar?'),
    options: L3(
      ['يوزّع الطلبات على عدة خوادم، ويتجاوز الخادم المتعطل', 'يضغط قاعدة البيانات', 'يخزّن الملفات الثابتة', 'يكتب السجلات'],
      ['Spreads requests across several servers and skips a dead one', 'Compresses the database', 'Stores static files', 'Writes logs'],
      ['İstekleri birkaç sunucuya dağıtır ve çöken sunucuyu atlar', 'Veritabanını sıkıştırır', 'Statik dosyaları saklar', 'Log yazar'],
    ),
    answer: 0,
    why: W('بوجوده يمكن إضافة خوادم لتحمل ضغط أكبر، وتحديث خادم بعد آخر دون توقف الخدمة.',
      'With one in place you can add servers to handle more traffic and update them one by one without downtime.',
      'Onunla daha fazla trafik için sunucu ekleyebilir ve sunucuları kesinti olmadan tek tek güncelleyebilirsin.'),
  }),
  choice({
    id: 'ar-j-cdn', level: 'junior', topic: 'architecture',
    prompt: W('ما فائدة الـ CDN للصور وملفات JavaScript؟', 'What does a CDN do for images and JavaScript files?', 'CDN, görseller ve JavaScript dosyaları için ne işe yarar?'),
    options: L3(
      ['يقدّمها من خوادم قريبة من المستخدم فتصل أسرع، ويخفف الضغط عن خادمك', 'يكتب الكود بدلًا عنك', 'يشفّر قاعدة البيانات', 'يحوّل الصور إلى نص'],
      ['Serves them from servers close to the user, so they arrive faster and your server does less', 'Writes code for you', 'Encrypts the database', 'Turns images into text'],
      ['Onları kullanıcıya yakın sunuculardan sunar; daha hızlı gelir ve sunucunun yükü azalır', 'Senin yerine kod yazar', 'Veritabanını şifreler', 'Görselleri metne çevirir'],
    ),
    answer: 0,
    why: W('مستخدم في الرياض يحمّل الملفات من خادم في الخليج بدل خادمك في أوروبا مثلًا، فتقصر المسافة ويقل وقت التحميل.',
      'A user in Riyadh gets the files from a nearby edge server instead of your server in Europe, so the distance and load time drop.',
      'Riyad’daki bir kullanıcı dosyaları Avrupa’daki sunucun yerine yakındaki bir uç sunucudan alır; mesafe ve yükleme süresi kısalır.'),
  }),
  choice({
    id: 'ar-j-backups', level: 'junior', topic: 'architecture',
    prompt: W('لديك نسخ احتياطية يومية لقاعدة البيانات. ما الخطوة التي ينساها كثيرون؟', 'You have daily database backups. Which step do many people forget?', 'Veritabanının günlük yedekleri var. Birçok kişinin unuttuğu adım hangisi?'),
    options: L3(
      ['تجربة استعادة نسخة فعلًا بشكل دوري', 'تسمية الملفات بالتاريخ', 'ضغط النسخ', 'حذف النسخ القديمة فورًا'],
      ['Actually testing a restore regularly', 'Naming files by date', 'Compressing the backups', 'Deleting old backups right away'],
      ['Düzenli olarak gerçekten geri yükleme denemek', 'Dosyaları tarihe göre adlandırmak', 'Yedekleri sıkıştırmak', 'Eski yedekleri hemen silmek'],
    ),
    answer: 0,
    why: W('النسخة التي لم تُجرَّب استعادتها قد تكون فارغة أو تالفة، ولن تكتشف ذلك إلا وقت الكارثة. واحفظ نسخة في مكان مختلف عن الخادم.',
      'A backup you have never restored may be empty or broken, and you will only find out during the disaster. Also keep a copy somewhere other than the server.',
      'Hiç geri yüklemediğin bir yedek boş veya bozuk olabilir ve bunu ancak felaket anında öğrenirsin. Bir kopyayı sunucudan farklı bir yerde de tut.'),
  }),
  choice({
    id: 'ar-j-logging', level: 'junior', topic: 'architecture',
    prompt: W('مستخدم يقول إن الدفع فشل أمس الساعة 3 عصرًا. ما الذي يساعدك أكثر لمعرفة السبب؟', 'A user says payment failed yesterday at 3 pm. What helps you most to find out why?', 'Bir kullanıcı ödemenin dün saat 15:00’te başarısız olduğunu söylüyor. Sebebi bulmada en çok ne yardımcı olur?'),
    options: L3(
      ['سجلات (logs) فيها الوقت ومعرّف الطلب والمستخدم ورسالة الخطأ', 'إعادة تشغيل الخادم', 'سؤال المستخدم عن متصفحه فقط', 'حذف الكاش'],
      ['Logs with the time, request id, user and error message', 'Restarting the server', 'Only asking about their browser', 'Clearing the cache'],
      ['Zaman, istek kimliği, kullanıcı ve hata mesajı içeren loglar', 'Sunucuyu yeniden başlatmak', 'Sadece tarayıcısını sormak', 'Önbelleği temizlemek'],
    ),
    answer: 0,
    why: W('في الإنتاج لا يمكنك تشغيل debugger، فالسجلات هي ذاكرتك. ومعرّف الطلب (request id) يربط كل السطور الخاصة بطلب واحد.',
      'In production you cannot attach a debugger, so logs are your memory. A request id ties together every line from one request.',
      'Canlı ortamda debugger bağlayamazsın; loglar hafızandır. İstek kimliği (request id) tek bir isteğe ait tüm satırları birbirine bağlar.'),
  }),
  choice({
    id: 'ar-j-monolith', level: 'junior', topic: 'architecture',
    prompt: W('فريق من 3 مطورين يبدأ منتجًا جديدًا. ما الخيار المعقول غالبًا؟', 'A team of 3 developers starts a new product. What is usually sensible?', '3 geliştiricilik bir ekip yeni bir ürüne başlıyor. Genelde mantıklı olan nedir?'),
    options: L3(
      ['تطبيق واحد (monolith) منظم جيدًا، ويُقسَّم لاحقًا عند الحاجة', '20 microservice من البداية', 'قاعدة بيانات لكل دالة', 'بدون خادم ولا قاعدة بيانات'],
      ['One well-organised app (a monolith), split later if needed', '20 microservices from day one', 'One database per function', 'No server and no database'],
      ['İyi düzenlenmiş tek bir uygulama (monolith); gerekirse sonra bölünür', 'İlk günden 20 microservice', 'Her fonksiyona bir veritabanı', 'Sunucu da veritabanı da yok'],
    ),
    answer: 0,
    why: W('الـ microservices تحل مشاكل فرق كبيرة، لكنها تضيف تعقيد الشبكة والنشر والمراقبة. البداية بتطبيق واحد بحدود واضحة بين أجزائه أسرع وأبسط.',
      'Microservices solve big-team problems but add network, deployment and monitoring complexity. Starting with one app with clear internal boundaries is faster and simpler.',
      'Microservice’ler büyük ekip sorunlarını çözer ama ağ, dağıtım ve izleme karmaşıklığı ekler. İçinde net sınırları olan tek bir uygulamayla başlamak daha hızlı ve basittir.'),
  }),

  // ───────── Architecture · Mid ─────────
  choice({
    id: 'ar-m-sessions-memory', level: 'mid', topic: 'architecture',
    prompt: W('شغّلت خادمين خلف load balancer، والجلسات محفوظة في ذاكرة كل خادم. ماذا يلاحظ المستخدمون؟', 'You run two servers behind a load balancer, with sessions stored in each server’s memory. What do users notice?', 'Load balancer arkasında iki sunucu çalıştırıyorsun ve oturumlar her sunucunun belleğinde. Kullanıcılar ne fark eder?'),
    options: L3(
      ['يخرجون من حساباتهم فجأة؛ الحل تخزين الجلسات في Redis أو قاعدة البيانات، أو رموز موقّعة', 'لا شيء', 'الموقع يصبح أسرع', 'تتكرر طلباتهم'],
      ['They get logged out at random; store sessions in Redis or the database, or use signed tokens', 'Nothing', 'The site gets faster', 'Their requests repeat'],
      ['Rastgele oturumdan düşerler; oturumları Redis’te veya veritabanında tut ya da imzalı token kullan', 'Hiçbir şey', 'Site hızlanır', 'İstekleri tekrarlanır'],
    ),
    answer: 0,
    why: W('الطلب التالي قد يذهب للخادم الآخر الذي لا يعرف الجلسة. اجعل الخوادم «بلا حالة» (stateless) وضع الحالة في مخزن مشترك، فتستطيع إضافة خوادم بحرية.',
      'The next request may hit the other server, which does not know the session. Keep servers stateless and put state in a shared store, so you can add servers freely.',
      'Sonraki istek oturumu bilmeyen diğer sunucuya gidebilir. Sunucuları durumsuz (stateless) tut, durumu ortak bir depoda sakla; böylece rahatça sunucu ekleyebilirsin.'),
  }),
  choice({
    id: 'ar-m-cache-invalidation', level: 'mid', topic: 'architecture',
    prompt: W('صفحة المنتج مخزّنة في الكاش لساعة. غيّرت السعر، والعملاء ما زالوا يرون القديم. ما الحل الأنسب؟', 'Product pages are cached for an hour. You changed a price and customers still see the old one. What is the best fix?', 'Ürün sayfaları bir saat önbellekte. Fiyatı değiştirdin ve müşteriler hâlâ eskisini görüyor. En iyi çözüm nedir?'),
    options: L3(
      ['حذف مفتاح الكاش لهذا المنتج عند تعديله (invalidation)', 'إلغاء الكاش من الموقع كله', 'إعادة تشغيل الخادم كل ساعة', 'الطلب من العملاء تحديث الصفحة'],
      ['Delete that product’s cache key whenever it changes (invalidation)', 'Turn caching off for the whole site', 'Restart the server every hour', 'Ask customers to refresh'],
      ['Ürün değişince o ürünün önbellek anahtarını sil (invalidation)', 'Tüm sitede önbelleği kapat', 'Sunucuyu her saat yeniden başlat', 'Müşterilerden sayfayı yenilemelerini iste'],
    ),
    answer: 0,
    why: W('الكاش يبقى مفيدًا، وكل تعديل يمسح النسخة القديمة فتُبنى من جديد عند أول طلب. وTTL قصير يكون شبكة أمان إذا نُسي المسح في مكان ما.',
      'The cache stays useful, and each update clears the stale copy so the next request rebuilds it. A short TTL is a safety net if an invalidation is missed somewhere.',
      'Önbellek faydalı kalır; her güncelleme eski kopyayı siler ve ilk istek yeniden oluşturur. Bir yerde silme unutulursa kısa TTL güvenlik ağı olur.'),
  }),
  choice({
    id: 'ar-m-queue-email', level: 'mid', topic: 'architecture',
    prompt: W('التسجيل يستغرق 4 ثوانٍ لأنه يرسل بريد ترحيب داخل نفس الطلب. ما الحل؟', 'Sign-up takes 4 seconds because it sends a welcome email inside the request. What is the fix?', 'Kayıt 4 saniye sürüyor çünkü istek içinde hoş geldin e-postası gönderiliyor. Çözüm nedir?'),
    options: L3(
      ['وضع مهمة الإرسال في طابور (queue) ويعالجها worker في الخلفية', 'إرسال البريد قبل حفظ المستخدم', 'إلغاء بريد الترحيب', 'زيادة مهلة الطلب'],
      ['Put the email job on a queue and let a background worker send it', 'Send the email before saving the user', 'Drop the welcome email', 'Raise the request timeout'],
      ['E-posta işini bir kuyruğa koy, arka plandaki bir worker göndersin', 'E-postayı kullanıcıyı kaydetmeden önce gönder', 'Hoş geldin e-postasını kaldır', 'İstek zaman aşımını artır'],
    ),
    answer: 0,
    why: W('المستخدم لا يحتاج انتظار البريد. الطابور يجعل الرد فوريًا، ويعيد المحاولة إذا فشلت خدمة البريد، دون أن يفشل التسجيل نفسه.',
      'The user does not need to wait for the email. A queue makes the response instant and retries if the mail service fails, without failing the sign-up.',
      'Kullanıcının e-postayı beklemesi gerekmez. Kuyruk yanıtı anında verir ve e-posta servisi başarısız olursa kaydı bozmadan yeniden dener.'),
  }),
  choice({
    id: 'ar-m-scale-out', level: 'mid', topic: 'architecture',
    prompt: W('ما الفرق بين التوسع الأفقي والعمودي؟', 'What is the difference between horizontal and vertical scaling?', 'Yatay ve dikey ölçekleme arasındaki fark nedir?'),
    options: L3(
      ['الأفقي: إضافة خوادم أكثر. العمودي: خادم أقوى (معالج وذاكرة أكبر)', 'الأفقي للقراءة والعمودي للكتابة', 'لا فرق', 'العمودي يعني إضافة قواعد بيانات'],
      ['Horizontal: add more servers. Vertical: a bigger server (more CPU and RAM)', 'Horizontal for reads, vertical for writes', 'No difference', 'Vertical means adding databases'],
      ['Yatay: daha fazla sunucu eklemek. Dikey: daha güçlü bir sunucu (daha çok CPU ve RAM)', 'Yatay okuma, dikey yazma için', 'Fark yok', 'Dikey, veritabanı eklemek demektir'],
    ),
    answer: 0,
    why: W('العمودي أسهل لكن له سقف وسعر مرتفع ونقطة فشل واحدة. الأفقي يتوسع أكثر ويتحمل الأعطال، لكنه يحتاج خوادم بلا حالة وموزّع حمل.',
      'Vertical is easier but has a ceiling, gets expensive and is one point of failure. Horizontal goes further and survives failures, but needs stateless servers and a load balancer.',
      'Dikey daha kolaydır ama tavanı vardır, pahalılaşır ve tek arıza noktasıdır. Yatay daha ileri gider ve arızalara dayanır ama durumsuz sunucular ve load balancer ister.'),
  }),
  choice({
    id: 'ar-m-health-check', level: 'mid', topic: 'architecture',
    prompt: W('لماذا نضيف endpoint مثل /health إلى الخدمة؟', 'Why add an endpoint like /health to a service?', 'Bir servise neden /health gibi bir uç nokta ekleriz?'),
    options: L3(
      ['ليعرف الـ load balancer والمنصة أي نسخة سليمة، ويوقفوا إرسال الطلبات للمتعطلة', 'لعرض صفحة للمستخدمين', 'لتسريع الاستعلامات', 'لتسجيل الدخول'],
      ['So the load balancer and platform know which instance is healthy and stop sending traffic to broken ones', 'To show a page to users', 'To speed up queries', 'For login'],
      ['Load balancer ve platform hangi örneğin sağlıklı olduğunu bilsin ve bozuklara trafik göndermesin diye', 'Kullanıcılara sayfa göstermek için', 'Sorguları hızlandırmak için', 'Giriş için'],
    ),
    answer: 0,
    why: W('الفحص الدوري لـ /health يسمح بإبعاد النسخة المعطلة وإعادة تشغيلها تلقائيًا، وبالنشر التدريجي دون توقف.',
      'Regular checks on /health let the platform pull a broken instance out, restart it automatically, and roll out deploys without downtime.',
      '/health’e düzenli kontrol, bozuk örneğin çıkarılıp otomatik yeniden başlatılmasını ve kesintisiz kademeli dağıtımı sağlar.'),
  }),
  choice({
    id: 'ar-m-cache-aside', level: 'mid', topic: 'architecture',
    prompt: W('ما اسم هذا النمط؟', 'What is this pattern called?', 'Bu kalıbın adı nedir?'),
    code: `async function getUser(id) {
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);
  const user = await db.findUser(id);
  await redis.set(\`user:\${id}\`, JSON.stringify(user), 'EX', 300);
  return user;
}`, codeLang: 'js',
    options: ['Cache-aside', 'Write-through', 'Circuit breaker', 'Event sourcing'],
    answer: 0,
    why: W('في cache-aside الكود يسأل الكاش أولًا، وعند عدم الوجود يقرأ من قاعدة البيانات ثم يحفظ النتيجة. أما write-through فيكتب في الكاش وقاعدة البيانات معًا عند كل تعديل.',
      'In cache-aside the code asks the cache first; on a miss it reads the database and stores the result. Write-through writes to cache and database together on every update.',
      'Cache-aside’da kod önce önbelleğe sorar; yoksa veritabanından okuyup sonucu saklar. Write-through ise her güncellemede önbelleğe ve veritabanına birlikte yazar.'),
  }),
  choice({
    id: 'ar-m-connection-pool', level: 'mid', topic: 'architecture',
    prompt: W('الكود يفتح اتصالًا جديدًا بقاعدة البيانات مع كل طلب ويغلقه. ما المشكلة تحت الضغط، وما الحل؟', 'The code opens a new database connection on every request and closes it. What goes wrong under load, and what is the fix?', 'Kod her istekte yeni bir veritabanı bağlantısı açıp kapatıyor. Yük altında ne olur, çözüm nedir?'),
    options: L3(
      ['فتح الاتصال مكلف وقد يتجاوز حد الاتصالات؛ استخدم connection pool يعيد استخدام الاتصالات', 'لا مشكلة', 'تُحذف البيانات', 'يجب فتح اتصالين لكل طلب'],
      ['Opening connections is costly and can hit the connection limit; use a connection pool that reuses them', 'No problem', 'Data gets deleted', 'Open two connections per request'],
      ['Bağlantı açmak pahalıdır ve bağlantı sınırını aşabilir; bağlantıları yeniden kullanan bir connection pool kullan', 'Sorun yok', 'Veri silinir', 'Her istekte iki bağlantı aç'],
    ),
    answer: 0,
    why: W('كل اتصال جديد يحتاج مصافحة TCP وTLS ومصادقة، وقاعدة البيانات تتحمل عددًا محدودًا من الاتصالات. الـ pool يبقي مجموعة جاهزة ويوزعها على الطلبات.',
      'Every new connection needs a TCP and TLS handshake and authentication, and the database only accepts so many. A pool keeps a set ready and hands them out to requests.',
      'Her yeni bağlantı TCP ve TLS el sıkışması ile kimlik doğrulama ister; veritabanı da sınırlı sayıda bağlantı kabul eder. Pool hazır bir grup tutar ve isteklere dağıtır.'),
  }),

  // ───────── Architecture · Senior ─────────
  choice({
    id: 'ar-s-stampede', level: 'senior', topic: 'architecture',
    prompt: W('مفتاح كاش لصفحة شهيرة انتهت صلاحيته، فوصل 2000 طلب إلى قاعدة البيانات في نفس الثانية. ما اسم المشكلة وكيف تُحل؟', 'The cache key for a popular page expires and 2,000 requests hit the database in the same second. What is this and how do you fix it?', 'Popüler bir sayfanın önbellek anahtarı sona erdi ve aynı saniyede 2.000 istek veritabanına gitti. Bu nedir ve nasıl çözülür?'),
    options: L3(
      ['cache stampede: قفل حتى يعيد طلب واحد البناء، أو تقديم النسخة القديمة أثناء التحديث، مع TTL عشوائي', 'deadlock: أعد تشغيل قاعدة البيانات', 'N+1: أضف JOIN', 'لا حل إلا خادم أكبر'],
      ['A cache stampede: a lock so one request rebuilds, or serve the stale copy while refreshing, plus jittered TTLs', 'A deadlock: restart the database', 'N+1: add a JOIN', 'Only a bigger server helps'],
      ['Cache stampede: tek bir istek yeniden oluşturana kadar kilit ya da yenilerken eski kopyayı sunmak, ayrıca rastgele TTL', 'Deadlock: veritabanını yeniden başlat', 'N+1: JOIN ekle', 'Tek çare daha büyük sunucu'],
    ),
    answer: 0,
    why: W('كل الطلبات ترى الكاش فارغًا وتذهب لقاعدة البيانات معًا. «طلب واحد يبني والباقي ينتظر أو يأخذ القديم» (single-flight / stale-while-revalidate) يحمي القاعدة، والعشوائية تمنع انتهاء مفاتيح كثيرة معًا.',
      'Every request sees an empty cache and goes to the database at once. "One request rebuilds, the rest wait or get the stale copy" (single-flight / stale-while-revalidate) protects the database, and jitter stops many keys expiring together.',
      'Her istek önbelleği boş görür ve aynı anda veritabanına gider. "Bir istek yeniden oluşturur, diğerleri bekler ya da eskiyi alır" (single-flight / stale-while-revalidate) veritabanını korur; rastgelelik çok sayıda anahtarın birlikte bitmesini önler.'),
  }),
  choice({
    id: 'ar-s-outbox', level: 'senior', topic: 'architecture',
    prompt: W('الكود يحفظ الطلب في قاعدة البيانات ثم ينشر حدث OrderCreated إلى الطابور. ماذا لو تعطل النشر بعد الحفظ؟', 'The code saves an order, then publishes OrderCreated to a queue. What if publishing fails after the save?', 'Kod siparişi kaydediyor, sonra OrderCreated olayını kuyruğa yayınlıyor. Kayıttan sonra yayın başarısız olursa?'),
    options: L3(
      ['يضيع الحدث؛ الحل نمط Outbox: حفظ الحدث في جدول بنفس الـ transaction ونشره لاحقًا', 'لا شيء، الطابور يعيد المحاولة وحده', 'يُلغى الطلب تلقائيًا', 'يُنشر الحدث مرتين دائمًا'],
      ['The event is lost; use the Outbox pattern: save the event in a table in the same transaction and publish it afterwards', 'Nothing, the queue retries on its own', 'The order is cancelled automatically', 'The event is always published twice'],
      ['Olay kaybolur; Outbox kalıbı: olayı aynı transaction’da bir tabloya kaydet, sonra yayınla', 'Hiçbir şey, kuyruk kendisi tekrar dener', 'Sipariş otomatik iptal edilir', 'Olay her zaman iki kez yayınlanır'],
    ),
    answer: 0,
    why: W('لا يمكن جمع قاعدة البيانات والطابور في transaction واحد. الـ Outbox يجعل الحفظ والحدث ذريّين، وعملية منفصلة تقرأ الجدول وتنشر حتى تنجح.',
      'You cannot put the database and the queue in one transaction. The outbox makes the save and the event atomic, and a separate process reads the table and publishes until it succeeds.',
      'Veritabanını ve kuyruğu tek transaction’a koyamazsın. Outbox kaydı ve olayı atomik yapar; ayrı bir süreç tabloyu okuyup başarılı olana kadar yayınlar.'),
  }),
  choice({
    id: 'ar-s-at-least-once', level: 'senior', topic: 'architecture',
    prompt: W('أغلب الطوابير تضمن التسليم «مرة على الأقل». ماذا يعني ذلك لكود المستهلك (consumer)؟', 'Most queues promise "at least once" delivery. What does that mean for consumer code?', 'Çoğu kuyruk "en az bir kez" teslim garantisi verir. Bu, tüketici (consumer) kodu için ne demek?'),
    options: L3(
      ['قد تصل الرسالة نفسها مرتين، فيجب أن تكون المعالجة idempotent', 'كل رسالة تصل مرة واحدة بالضبط', 'الرسائل تصل بالترتيب دائمًا', 'لا حاجة لمعالجة الأخطاء'],
      ['The same message can arrive twice, so processing must be idempotent', 'Every message arrives exactly once', 'Messages always arrive in order', 'No need to handle errors'],
      ['Aynı mesaj iki kez gelebilir; işleme idempotent olmalı', 'Her mesaj tam bir kez gelir', 'Mesajlar her zaman sırayla gelir', 'Hata işlemeye gerek yok'],
    ),
    answer: 0,
    why: W('إذا عالج المستهلك الرسالة ثم تعطل قبل التأكيد (ack)، تُرسل مجددًا. احفظ معرّفات الرسائل المعالجة، أو صمم العملية بحيث لا يغيّر تكرارها النتيجة.',
      'If a consumer processes a message and crashes before the ack, it is delivered again. Record processed message ids, or design the work so repeating it changes nothing.',
      'Tüketici mesajı işleyip onaydan (ack) önce çökerse mesaj tekrar gelir. İşlenen mesaj kimliklerini kaydet ya da işi tekrarlanınca sonucu değiştirmeyecek şekilde tasarla.'),
  }),
  choice({
    id: 'ar-s-cap', level: 'senior', topic: 'architecture',
    prompt: W('حسب CAP، عند انقطاع الشبكة بين مركزي بيانات، ماذا يجب أن يختار النظام الموزّع؟', 'By CAP, when the network splits two data centres, what must a distributed system choose?', 'CAP’e göre iki veri merkezi arasında ağ koptuğunda dağıtık sistem neyi seçmelidir?'),
    options: L3(
      ['بين الاتساق (رفض بعض الطلبات) والتوفر (الرد ببيانات قد تكون قديمة)', 'لا شيء، يمكن الحصول على الثلاثة دائمًا', 'بين السرعة والأمان', 'بين SQL وNoSQL'],
      ['Between consistency (refuse some requests) and availability (answer with possibly stale data)', 'Nothing; you can always have all three', 'Between speed and security', 'Between SQL and NoSQL'],
      ['Tutarlılık (bazı istekleri reddetmek) ile erişilebilirlik (belki eski veriyle yanıt) arasında', 'Hiçbir şey; üçü de her zaman olur', 'Hız ile güvenlik arasında', 'SQL ile NoSQL arasında'],
    ),
    answer: 0,
    why: W('الانقسام (P) يقع في الواقع ولا يمكن تجنبه، فالسؤال هو ماذا تفعل وقته: نظام بنكي يفضّل الاتساق، وعدّاد إعجابات يفضّل التوفر.',
      'Partitions (P) happen in real life, so the question is what to do during one: a bank prefers consistency, a like counter prefers availability.',
      'Ağ bölünmesi (P) gerçekte olur ve kaçınılmazdır; asıl soru o sırada ne yapılacağıdır: banka tutarlılığı, beğeni sayacı erişilebilirliği tercih eder.'),
  }),
  choice({
    id: 'ar-s-circuit-breaker', level: 'senior', topic: 'architecture',
    prompt: W('خدمة توصيات خارجية تتأخر 30 ثانية لكل طلب، فتتكدس الطلبات عندك ويتعطل موقعك. ما النمط المناسب؟', 'An external recommendations service takes 30 seconds per call, requests pile up and your site goes down. Which pattern fits?', 'Dış bir öneri servisi her çağrıda 30 saniye sürüyor, istekler birikiyor ve siten çöküyor. Hangi kalıp uygun?'),
    options: ['Circuit breaker + timeout', 'Cache-aside', 'Sharding', 'Event sourcing'],
    answer: 0,
    why: W('بعد عدد من الفشل «يُفتح القاطع» فتتوقف الطلبات للخدمة مؤقتًا وترجع فورًا برد بديل (مثل توصيات افتراضية)، ثم يُجرَّب الاتصال مجددًا لاحقًا. ومهلة قصيرة تمنع تكدس الطلبات.',
      'After a number of failures the breaker "opens": calls stop for a while and return a fallback right away (like default recommendations), then it tries again later. A short timeout stops requests piling up.',
      'Belirli sayıda başarısızlıktan sonra devre "açılır": çağrılar bir süre durur ve hemen yedek yanıt döner (ör. varsayılan öneriler), sonra tekrar denenir. Kısa zaman aşımı isteklerin birikmesini önler.'),
  }),
  choice({
    id: 'ar-s-shard-key', level: 'senior', topic: 'architecture',
    prompt: W('قسّمت جدول الأحداث على عدة خوادم حسب تاريخ الإنشاء (شهر لكل خادم). ما المشكلة؟', 'You shard the events table across servers by creation date (one month per server). What is the problem?', 'Olaylar tablosunu oluşturma tarihine göre (sunucu başına bir ay) böldün. Sorun nedir?'),
    options: L3(
      ['كل الكتابات الجديدة تذهب لخادم واحد (hot shard)', 'لا مشكلة', 'لا يمكن قراءة الأشهر القديمة', 'يتكرر كل صف على كل الخوادم'],
      ['All new writes go to one server (a hot shard)', 'No problem', 'Old months can no longer be read', 'Every row is copied to every server'],
      ['Tüm yeni yazmalar tek sunucuya gider (sıcak shard)', 'Sorun yok', 'Eski aylar okunamaz', 'Her satır her sunucuya kopyalanır'],
    ),
    answer: 0,
    why: W('مفتاح التقسيم يجب أن يوزع الحمل. مع التاريخ يعمل خادم الشهر الحالي وحده والباقي خامل. مفتاح مثل user_id (أو hash له) يوزع الكتابات بشكل أفضل.',
      'A shard key should spread the load. With dates, the current month’s server does all the work and the rest sit idle. A key like user_id (or its hash) spreads writes better.',
      'Shard anahtarı yükü dağıtmalıdır. Tarihle, bu ayın sunucusu tüm işi yapar, diğerleri boşta kalır. user_id (veya hash’i) gibi bir anahtar yazmaları daha iyi dağıtır.'),
  }),

  // ───────── Server security · Junior ─────────
  choice({
    id: 'ss-j-sql-injection', level: 'junior', topic: 'server-security',
    prompt: W('ما الخطر في هذا الكود؟', 'What is the danger in this code?', 'Bu koddaki tehlike nedir?'),
    code: `const sql = "SELECT * FROM users WHERE email = '" + req.query.email + "'";
db.query(sql);`, codeLang: 'js',
    options: L3(
      ["SQL injection: إدخال مثل ' OR '1'='1 يغيّر الاستعلام. استخدم الاستعلامات ذات المعاملات (?)", 'الاستعلام بطيء فقط', 'لا خطر لأن البريد نص', 'يجب استخدام double quotes'],
      ["SQL injection: input like ' OR '1'='1 changes the query. Use parameterised queries (?)", 'It is only slow', 'No danger, email is just text', 'You must use double quotes'],
      ["SQL injection: ' OR '1'='1 gibi bir girdi sorguyu değiştirir. Parametreli sorgu (?) kullan", 'Sadece yavaştır', 'Tehlike yok, e-posta sadece metin', 'Çift tırnak kullanılmalı'],
    ),
    answer: 0,
    why: W('عند دمج النص داخل الاستعلام يصبح إدخال المستخدم جزءًا من الكود. مع db.query(\'… WHERE email = ?\', [email]) تُرسل القيمة منفصلة ولا تُفسَّر كـ SQL أبدًا.',
      'Gluing text into the query turns user input into code. With db.query(\'… WHERE email = ?\', [email]) the value is sent separately and is never read as SQL.',
      'Metni sorguya yapıştırmak kullanıcı girdisini koda çevirir. db.query(\'… WHERE email = ?\', [email]) ile değer ayrı gönderilir ve asla SQL olarak okunmaz.'),
  }),
  choice({
    id: 'ss-j-env-leak', level: 'junior', topic: 'server-security',
    prompt: W('رفعت ملف .env فيه مفاتيح API إلى مستودع GitHub عام، ثم حذفته بكوميت جديد. هل انتهت المشكلة؟', 'You pushed a .env with API keys to a public GitHub repo, then deleted it in a new commit. Is the problem solved?', 'API anahtarları olan bir .env dosyasını herkese açık GitHub deposuna gönderdin, sonra yeni bir commit’le sildin. Sorun çözüldü mü?'),
    options: L3(
      ['لا. المفاتيح ما زالت في تاريخ Git وربما نُسخت؛ ألغِها وأنشئ مفاتيح جديدة', 'نعم، الحذف يكفي', 'نعم، إذا جعلت المستودع خاصًا', 'نعم، بعد 24 ساعة'],
      ['No. The keys are still in Git history and may already be copied; revoke them and create new ones', 'Yes, deleting is enough', 'Yes, if you make the repo private', 'Yes, after 24 hours'],
      ['Hayır. Anahtarlar Git geçmişinde duruyor ve kopyalanmış olabilir; iptal edip yenilerini oluştur', 'Evet, silmek yeterli', 'Evet, depoyu gizli yaparsan', 'Evet, 24 saat sonra'],
    ),
    answer: 0,
    why: W('هناك برامج تمسح GitHub بحثًا عن المفاتيح خلال دقائق. اعتبر أي سر ظهر علنًا مكشوفًا: ألغِه فورًا، ثم أضف .env إلى .gitignore.',
      'Bots scan GitHub for keys within minutes. Treat any secret that was public as leaked: revoke it right away, then add .env to .gitignore.',
      'Botlar GitHub’ı dakikalar içinde anahtar için tarar. Herkese açık olmuş her sırrı sızmış say: hemen iptal et, sonra .env’i .gitignore’a ekle.'),
  }),
  choice({
    id: 'ss-j-least-privilege', level: 'junior', topic: 'server-security',
    prompt: W('تطبيقك يتصل بقاعدة البيانات بحساب superuser. لماذا هذه فكرة سيئة؟', 'Your app connects to the database as a superuser. Why is that a bad idea?', 'Uygulaman veritabanına superuser olarak bağlanıyor. Bu neden kötü bir fikir?'),
    options: L3(
      ['أي ثغرة في التطبيق تعطي المهاجم كل الصلاحيات؛ أعطِ التطبيق أقل صلاحيات يحتاجها فقط', 'لأنه أبطأ', 'لأن superuser لا يقرأ الجداول', 'ليست فكرة سيئة'],
      ['Any bug in the app hands the attacker full power; give the app only the permissions it needs', 'Because it is slower', 'Because a superuser cannot read tables', 'It is not a bad idea'],
      ['Uygulamadaki her açık saldırgana tüm yetkiyi verir; uygulamaya sadece ihtiyaç duyduğu yetkileri ver', 'Çünkü daha yavaştır', 'Çünkü superuser tabloları okuyamaz', 'Kötü bir fikir değil'],
    ),
    answer: 0,
    why: W('مبدأ «أقل صلاحية» (least privilege): حساب التطبيق يقرأ ويكتب جداوله فقط، دون حذف قواعد بيانات أو إنشاء مستخدمين. فإذا اختُرق يبقى الضرر محدودًا.',
      'Least privilege: the app account reads and writes its own tables, and cannot drop databases or create users. If it is compromised, the damage stays limited.',
      'En az yetki ilkesi: uygulama hesabı sadece kendi tablolarını okur ve yazar; veritabanı silemez, kullanıcı oluşturamaz. Ele geçirilirse zarar sınırlı kalır.'),
  }),
  choice({
    id: 'ss-j-error-details', level: 'junior', topic: 'server-security',
    prompt: W('عند حدوث خطأ، الـ API يرجع للمستخدم الـ stack trace كاملًا مع استعلام SQL. ما المشكلة؟', 'On an error, the API returns the full stack trace and the SQL query to the user. What is wrong?', 'Hata olduğunda API kullanıcıya tüm stack trace’i ve SQL sorgusunu döndürüyor. Sorun nedir?'),
    options: L3(
      ['يكشف بنية النظام للمهاجم؛ أرجع رسالة عامة وسجّل التفاصيل في الخادم فقط', 'لا مشكلة، يساعد المستخدم', 'يجعل الرد أبطأ فقط', 'المشكلة في رمز الحالة فقط'],
      ['It shows attackers how the system is built; return a generic message and log the details on the server', 'No problem, it helps the user', 'It only slows the response', 'Only the status code is wrong'],
      ['Saldırgana sistemin yapısını gösterir; genel bir mesaj döndür, ayrıntıları sadece sunucuda logla', 'Sorun yok, kullanıcıya yardımcı olur', 'Sadece yanıtı yavaşlatır', 'Sadece durum kodu yanlış'],
    ),
    answer: 0,
    why: W('أسماء الجداول والملفات وإصدارات المكتبات تساعد المهاجم في البحث عن ثغرات. أرسل للمستخدم معرّف خطأ قصيرًا يربطه بالسجل، دون التفاصيل.',
      'Table names, file paths and library versions help an attacker look for holes. Give the user a short error id that maps to the log, not the details.',
      'Tablo adları, dosya yolları ve kütüphane sürümleri saldırganın açık aramasına yardım eder. Kullanıcıya ayrıntıları değil, loga eşlenen kısa bir hata kimliği ver.'),
  }),
  choice({
    id: 'ss-j-dependencies', level: 'junior', topic: 'server-security',
    prompt: W('npm audit يقول إن مكتبة تستخدمها فيها ثغرة معروفة. ما التصرف الصحيح؟', 'npm audit says a library you use has a known vulnerability. What should you do?', 'npm audit kullandığın bir kütüphanede bilinen bir açık olduğunu söylüyor. Ne yapmalısın?'),
    options: L3(
      ['التحديث إلى إصدار مصلَّح واختبار التطبيق، ومتابعة التحديثات بانتظام', 'تجاهله ما دام الموقع يعمل', 'حذف ملف package-lock.json', 'إيقاف npm audit'],
      ['Update to a fixed version, test the app, and keep updating regularly', 'Ignore it while the site works', 'Delete package-lock.json', 'Turn off npm audit'],
      ['Düzeltilmiş sürüme güncelle, uygulamayı test et ve düzenli güncellemeye devam et', 'Site çalıştığı sürece yok say', 'package-lock.json’u sil', 'npm audit’i kapat'],
    ),
    answer: 0,
    why: W('الثغرات المعروفة أسهل طريق للمهاجمين لأن طريقة استغلالها منشورة. أدوات مثل Dependabot تفتح طلبات التحديث تلقائيًا.',
      'Known vulnerabilities are the easiest way in, because the exploit is public. Tools like Dependabot open update pull requests for you.',
      'Bilinen açıklar en kolay giriş yoludur, çünkü nasıl istismar edildikleri yayınlanmıştır. Dependabot gibi araçlar güncelleme isteklerini otomatik açar.'),
  }),
  choice({
    id: 'ss-j-login-rate-limit', level: 'junior', topic: 'server-security',
    prompt: W('شخص يجرّب آلاف كلمات المرور على حساب واحد عبر /login. ما الحماية الأساسية؟', 'Someone tries thousands of passwords on one account via /login. What is the basic protection?', 'Biri /login üzerinden tek hesaba binlerce şifre deniyor. Temel koruma nedir?'),
    options: L3(
      ['تحديد عدد المحاولات (rate limiting) وإبطاء أو قفل مؤقت بعد الفشل المتكرر', 'رسالة خطأ أوضح', 'تخزين كلمات المرور بشكل مرئي', 'إلغاء صفحة الدخول'],
      ['Rate limiting, with slow-downs or a temporary lock after repeated failures', 'A clearer error message', 'Storing passwords in plain text', 'Removing the login page'],
      ['Deneme sayısını sınırlamak (rate limiting), tekrarlanan hatalardan sonra yavaşlatma veya geçici kilit', 'Daha net hata mesajı', 'Şifreleri düz metin saklamak', 'Giriş sayfasını kaldırmak'],
    ),
    answer: 0,
    why: W('بدون حد، يمكن تجربة ملايين الكلمات. الحد حسب الحساب وحسب عنوان IP يوقف ذلك، والمصادقة الثنائية (2FA) تحمي حتى لو عُرفت كلمة المرور.',
      'With no limit, millions of guesses are possible. Limits per account and per IP stop that, and two-factor auth protects even if the password is known.',
      'Sınır yoksa milyonlarca tahmin yapılabilir. Hesap ve IP başına sınır bunu durdurur; iki adımlı doğrulama (2FA) şifre bilinse bile korur.'),
  }),
  choice({
    id: 'ss-j-authn-authz', level: 'junior', topic: 'server-security',
    prompt: W('ما الفرق بين authentication وauthorization؟', 'What is the difference between authentication and authorization?', 'Authentication ile authorization arasındaki fark nedir?'),
    options: L3(
      ['الأولى: من أنت؟ (تسجيل الدخول). الثانية: ماذا يُسمح لك أن تفعل؟ (الصلاحيات)', 'كلمتان لنفس الشيء', 'الأولى للخادم والثانية للمتصفح', 'الأولى للتشفير والثانية للنسخ الاحتياطي'],
      ['The first: who are you? (signing in). The second: what are you allowed to do? (permissions)', 'Two words for the same thing', 'The first is for servers, the second for browsers', 'The first is encryption, the second backups'],
      ['İlki: sen kimsin? (giriş). İkincisi: ne yapmana izin var? (yetkiler)', 'Aynı şey için iki kelime', 'İlki sunucu, ikincisi tarayıcı için', 'İlki şifreleme, ikincisi yedekleme'],
    ),
    answer: 0,
    why: W('تسجيل الدخول الناجح لا يعني أن المستخدم يستطيع فعل أي شيء. يجب فحص الصلاحية في كل endpoint حساس، وهي من أكثر الثغرات شيوعًا عند نسيانها.',
      'A successful login does not mean the user may do anything. Check permissions on every sensitive endpoint; forgetting to is one of the most common holes.',
      'Başarılı giriş, kullanıcının her şeyi yapabileceği anlamına gelmez. Her hassas uç noktada yetkiyi kontrol et; bunu unutmak en yaygın açıklardandır.'),
  }),

  // ───────── Server security · Mid ─────────
  choice({
    id: 'ss-m-idor', level: 'mid', topic: 'server-security',
    prompt: W('مستخدم غيّر الرقم في الرابط فرأى فاتورة شخص آخر. ما اسم الثغرة وكيف تُصلح؟', 'A user changed the number in the URL and saw someone else’s invoice. What is the hole and the fix?', 'Bir kullanıcı URL’deki numarayı değiştirip başkasının faturasını gördü. Açık nedir, nasıl düzeltilir?'),
    code: `app.get('/invoices/:id', auth, async (req, res) => {
  res.json(await Invoice.findById(req.params.id));
});`, codeLang: 'js',
    options: L3(
      ['IDOR: تحقق أن الفاتورة تخص req.user قبل إرجاعها', 'XSS: شفّر الرد', 'CSRF: أضف رمزًا للنموذج', 'لا ثغرة، المستخدم مسجّل الدخول'],
      ['IDOR: check the invoice belongs to req.user before returning it', 'XSS: escape the response', 'CSRF: add a form token', 'No hole, the user is signed in'],
      ['IDOR: döndürmeden önce faturanın req.user’a ait olduğunu kontrol et', 'XSS: yanıtı kaçışla', 'CSRF: forma token ekle', 'Açık yok, kullanıcı giriş yapmış'],
    ),
    answer: 0,
    why: W('auth يثبت هوية المستخدم فقط، ولا يفحص ملكية المورد. اجعل الاستعلام نفسه يقيّد بالمالك: findOne({ id, userId: req.user.id }). والمعرّفات العشوائية تساعد لكنها لا تكفي وحدها.',
      'auth only proves who the user is; it does not check ownership. Scope the query itself: findOne({ id, userId: req.user.id }). Random ids help but are not enough on their own.',
      'auth sadece kullanıcının kim olduğunu kanıtlar, sahipliği kontrol etmez. Sorgunun kendisini sahibe göre sınırla: findOne({ id, userId: req.user.id }). Rastgele kimlikler yardımcı olur ama tek başına yetmez.'),
  }),
  choice({
    id: 'ss-m-mass-assignment', level: 'mid', topic: 'server-security',
    prompt: W('ما المشكلة في تحديث الملف الشخصي بهذا الشكل؟', 'What is wrong with updating the profile like this?', 'Profili bu şekilde güncellemenin sorunu nedir?'),
    code: `app.patch('/me', auth, async (req, res) => {
  await User.update(req.user.id, req.body);
  res.sendStatus(204);
});
// body: { "name": "Sara", "role": "admin" }`, codeLang: 'js',
    options: L3(
      ['mass assignment: المستخدم يستطيع تغيير role أو أي حقل؛ اسمح بحقول محددة فقط', 'لا مشكلة', 'PATCH يجب أن يكون PUT', 'يجب إرجاع 200 بدل 204'],
      ['Mass assignment: the user can set role or any field; allow only specific fields', 'Nothing', 'PATCH should be PUT', 'It should return 200, not 204'],
      ['Mass assignment: kullanıcı role veya herhangi bir alanı değiştirebilir; sadece belirli alanlara izin ver', 'Sorun yok', 'PATCH yerine PUT olmalı', '204 yerine 200 dönmeli'],
    ),
    answer: 0,
    why: W('تمرير الجسم كما هو يسمح بتعديل أعمدة لم تقصدها، مثل role أو is_verified أو balance. اختر الحقول المسموحة صراحةً: const { name, bio } = req.body.',
      'Passing the body straight through lets users change columns you never meant to expose, like role, is_verified or balance. Pick allowed fields explicitly: const { name, bio } = req.body.',
      'Gövdeyi olduğu gibi geçirmek role, is_verified veya balance gibi açmak istemediğin sütunların değişmesine izin verir. İzin verilen alanları açıkça seç: const { name, bio } = req.body.'),
  }),
  choice({
    id: 'ss-m-jwt-verify', level: 'mid', topic: 'server-security',
    prompt: W('ما الخطأ الأمني هنا؟', 'What is the security mistake here?', 'Buradaki güvenlik hatası nedir?'),
    code: `const payload = jwt.decode(req.headers.authorization.slice(7));
if (payload.role === 'admin') { /* … */ }`, codeLang: 'js',
    options: L3(
      ['decode لا يتحقق من التوقيع، فيمكن تزوير الرمز؛ استخدم jwt.verify مع السر', 'slice(7) خطأ دائمًا', 'يجب تخزين الرمز في الكوكي', 'لا خطأ'],
      ['decode does not check the signature, so the token can be forged; use jwt.verify with the secret', 'slice(7) is always wrong', 'The token must be in a cookie', 'No mistake'],
      ['decode imzayı kontrol etmez, token taklit edilebilir; sırla birlikte jwt.verify kullan', 'slice(7) her zaman yanlış', 'Token cookie’de olmalı', 'Hata yok'],
    ),
    answer: 0,
    why: W('أي أحد يستطيع كتابة JWT بـ role: admin. التوقيع هو الذي يثبت أن خادمك أصدره. verify يفحص التوقيع والخوارزمية وتاريخ الانتهاء.',
      'Anyone can write a JWT that says role: admin. The signature is what proves your server issued it. verify checks the signature, the algorithm and the expiry.',
      'Herkes role: admin yazan bir JWT oluşturabilir. Onu senin sunucunun verdiğini kanıtlayan imzadır. verify imzayı, algoritmayı ve süresini kontrol eder.'),
  }),
  choice({
    id: 'ss-m-cors-reflect', level: 'mid', topic: 'server-security',
    prompt: W('الخادم يرجع Access-Control-Allow-Origin بنفس قيمة ترويسة Origin القادمة، مع Allow-Credentials: true. ما الخطر؟', 'The server echoes the incoming Origin header in Access-Control-Allow-Origin, with Allow-Credentials: true. What is the risk?', 'Sunucu gelen Origin başlığını Access-Control-Allow-Origin’e aynen yansıtıyor ve Allow-Credentials: true. Risk nedir?'),
    options: L3(
      ['أي موقع يستطيع قراءة بيانات المستخدم المسجّل عبر الـ API بالكوكي الخاصة به', 'لا خطر', 'الطلبات تصبح أبطأ', 'المتصفح يمنع كل الطلبات'],
      ['Any website can read the signed-in user’s data from the API using their cookies', 'No risk', 'Requests get slower', 'The browser blocks every request'],
      ['Herhangi bir site, giriş yapmış kullanıcının verisini onun cookie’leriyle API’den okuyabilir', 'Risk yok', 'İstekler yavaşlar', 'Tarayıcı tüm istekleri engeller'],
    ),
    answer: 0,
    why: W('هذا يعادل السماح للجميع مع إرسال الكوكيز، وهو ما تمنعه المتصفحات عند كتابة * صراحةً. استخدم قائمة مسموحة من النطاقات وقارن Origin بها.',
      'This is the same as allowing everyone with cookies, which browsers forbid when you write * directly. Use an allow-list of origins and compare Origin against it.',
      'Bu, cookie’lerle herkese izin vermekle aynıdır; tarayıcılar doğrudan * yazınca bunu yasaklar. Bir izin listesi kullan ve Origin’i onunla karşılaştır.'),
  }),
  choice({
    id: 'ss-m-upload', level: 'mid', topic: 'server-security',
    prompt: W('أي ممارسة صحيحة عند حفظ ملفات يرفعها المستخدمون؟', 'Which is a good practice when saving files users upload?', 'Kullanıcıların yüklediği dosyaları kaydederken hangisi iyi bir uygulamadır?'),
    options: L3(
      ['اسم عشوائي جديد، فحص النوع والحجم، وحفظها خارج مجلد الكود أو في تخزين منفصل', 'حفظها باسمها الأصلي في مجلد public', 'الاعتماد على امتداد الملف فقط', 'تشغيلها للتأكد أنها تعمل'],
      ['A new random name, type and size checks, and storing them outside the code folder or in separate storage', 'Save them under their original name in public', 'Trust the file extension only', 'Run them to check they work'],
      ['Yeni rastgele bir ad, tür ve boyut kontrolü, kod klasörü dışında veya ayrı bir depolamada saklamak', 'Orijinal adıyla public klasörüne kaydetmek', 'Sadece uzantıya güvenmek', 'Çalıştığını görmek için çalıştırmak'],
    ),
    answer: 0,
    why: W('الاسم الأصلي قد يحتوي ../ (path traversal) أو يستبدل ملفًا موجودًا، وملف .php في مجلد يُنفَّذ قد يصبح باب خلفي. افحص المحتوى الحقيقي لا الامتداد فقط.',
      'The original name can contain ../ (path traversal) or overwrite an existing file, and a .php file in an executable folder can become a backdoor. Check the real content, not just the extension.',
      'Orijinal ad ../ (path traversal) içerebilir veya mevcut bir dosyanın üzerine yazabilir; çalıştırılabilir bir klasördeki .php dosyası arka kapı olabilir. Sadece uzantıya değil, gerçek içeriğe bak.'),
  }),
  choice({
    id: 'ss-m-reset-token', level: 'mid', topic: 'server-security',
    prompt: W('ما صفات رابط «استعادة كلمة المرور» الآمن؟', 'What makes a password-reset link safe?', 'Güvenli bir şifre sıfırlama bağlantısının özellikleri nelerdir?'),
    options: L3(
      ['رمز عشوائي طويل، صالح لمرة واحدة، وينتهي بعد مدة قصيرة', 'رقم المستخدم في الرابط', 'البريد الإلكتروني مشفّرًا بـ Base64', 'رمز من 4 أرقام بلا انتهاء'],
      ['A long random token, single-use, that expires soon', 'The user id in the URL', 'The email in Base64', 'A 4-digit code that never expires'],
      ['Uzun, rastgele, tek kullanımlık ve kısa sürede sona eren bir token', 'URL’de kullanıcı kimliği', 'Base64 ile kodlanmış e-posta', 'Süresi dolmayan 4 haneli kod'],
    ),
    answer: 0,
    why: W('الرمز المتوقع يمكن تخمينه، وBase64 ليس سرًا. ولّد الرمز بمولد آمن (crypto)، واحفظ الـ hash الخاص به فقط، وألغِه بعد الاستخدام.',
      'A guessable token can be brute-forced, and Base64 is not a secret. Generate it with a secure generator (crypto), store only its hash, and invalidate it after use.',
      'Tahmin edilebilir bir token denenerek bulunur; Base64 sır değildir. Güvenli bir üreteçle (crypto) oluştur, sadece hash’ini sakla ve kullanımdan sonra geçersiz kıl.'),
  }),
  choice({
    id: 'ss-m-timing', level: 'mid', topic: 'server-security',
    prompt: W('ما الضعف في مقارنة مفتاح الـ API بهذه الطريقة؟', 'What is weak about comparing the API key this way?', 'API anahtarını bu şekilde karşılaştırmanın zayıf yanı nedir?'),
    code: `if (req.headers['x-api-key'] === process.env.API_KEY) { /* … */ }`, codeLang: 'js',
    options: L3(
      ['=== يتوقف عند أول حرف مختلف، فالفرق في الوقت قد يكشف المفتاح؛ استخدم crypto.timingSafeEqual', 'يجب استخدام ==', 'لا ضعف', 'المفتاح يجب أن يكون رقمًا'],
      ['=== stops at the first different character, so timing differences can leak the key; use crypto.timingSafeEqual', 'Use == instead', 'Nothing is weak', 'The key must be a number'],
      ['=== ilk farklı karakterde durur; süre farkı anahtarı sızdırabilir; crypto.timingSafeEqual kullan', '== kullanılmalı', 'Zayıf bir yanı yok', 'Anahtar sayı olmalı'],
    ),
    answer: 0,
    why: W('هذا يُسمّى timing attack: بقياس زمن الرد آلاف المرات يمكن تخمين المفتاح حرفًا بحرف. المقارنة بزمن ثابت تزيل هذا الفرق.',
      'This is a timing attack: by measuring response times thousands of times, the key can be guessed character by character. A constant-time compare removes that difference.',
      'Buna zamanlama saldırısı denir: yanıt sürelerini binlerce kez ölçerek anahtar karakter karakter tahmin edilebilir. Sabit süreli karşılaştırma bu farkı ortadan kaldırır.'),
  }),

  // ───────── Server security · Senior ─────────
  choice({
    id: 'ss-s-ssrf', level: 'senior', topic: 'server-security',
    prompt: W('ميزة «معاينة رابط» تجعل الخادم يجلب أي URL يكتبه المستخدم. ما الخطر الأكبر؟', 'A "link preview" feature makes the server fetch any URL the user types. What is the biggest risk?', 'Bir "bağlantı önizleme" özelliği, sunucunun kullanıcının yazdığı her URL’yi çekmesini sağlıyor. En büyük risk nedir?'),
    code: `const html = await fetch(req.body.url).then(r => r.text());
// url = "http://169.254.169.254/latest/meta-data/iam/…"`, codeLang: 'js',
    options: L3(
      ['SSRF: الخادم يصل إلى خدمات داخلية وبيانات اعتماد السحابة؛ امنع العناوين الداخلية واسمح بـ http/https فقط', 'XSS في صفحة المعاينة فقط', 'بطء الخادم فقط', 'لا خطر'],
      ['SSRF: the server reaches internal services and cloud credentials; block internal addresses and allow only http/https', 'Only XSS in the preview', 'Only a slower server', 'No risk'],
      ['SSRF: sunucu iç servislere ve bulut kimlik bilgilerine ulaşır; iç adresleri engelle, sadece http/https’e izin ver', 'Sadece önizlemede XSS', 'Sadece yavaş sunucu', 'Risk yok'],
    ),
    answer: 0,
    why: W('خادمك داخل الشبكة الخاصة، فيستطيع الوصول إلى ما لا يصله المهاجم، مثل خدمة الـ metadata في السحابة. افحص عنوان IP بعد تحليل DNS، واحذر من إعادة التوجيه إلى عنوان داخلي.',
      'Your server sits inside the private network and can reach what the attacker cannot, like the cloud metadata service. Check the IP after DNS resolution, and watch for redirects to internal addresses.',
      'Sunucun özel ağın içindedir ve saldırganın ulaşamadığı yerlere, örneğin bulut metadata servisine ulaşabilir. DNS çözümlemesinden sonra IP’yi kontrol et ve iç adreslere yönlendirmelere dikkat et.'),
  }),
  choice({
    id: 'ss-s-deserialization', level: 'senior', topic: 'server-security',
    prompt: W('الخادم يقرأ كوكي من المستخدم ويحوّلها بـ pickle.loads (Python) أو unserialize (PHP). ما الخطر؟', 'The server reads a user cookie and loads it with pickle.loads (Python) or unserialize (PHP). What is the risk?', 'Sunucu kullanıcının cookie’sini okuyup pickle.loads (Python) veya unserialize (PHP) ile yüklüyor. Risk nedir?'),
    options: L3(
      ['تنفيذ كود عن بُعد (RCE): البيانات المصممة خصيصًا قد تشغّل أوامر على الخادم', 'بطء بسيط فقط', 'فقدان الكوكي', 'لا خطر لأنها بيانات المستخدم نفسه'],
      ['Remote code execution: crafted data can run commands on the server', 'Only a small slowdown', 'Losing the cookie', 'No risk, it is the user’s own data'],
      ['Uzaktan kod çalıştırma (RCE): özel hazırlanmış veri sunucuda komut çalıştırabilir', 'Sadece biraz yavaşlık', 'Cookie’nin kaybolması', 'Risk yok, kullanıcının kendi verisi'],
    ),
    answer: 0,
    why: W('هذه الصيغ تستطيع إنشاء كائنات واستدعاء دوال أثناء القراءة. لا تقرأها أبدًا من مصدر غير موثوق؛ استخدم JSON، ووقّع البيانات إن احتجت إرجاعها من المستخدم.',
      'These formats can build objects and call functions while loading. Never load them from untrusted input; use JSON, and sign the data if it has to come back from the user.',
      'Bu biçimler yüklenirken nesne oluşturup fonksiyon çağırabilir. Güvenilmeyen girdiden asla yükleme; JSON kullan ve veri kullanıcıdan geri gelecekse imzala.'),
  }),
  choice({
    id: 'ss-s-jwt-revoke', level: 'senior', topic: 'server-security',
    prompt: W('مستخدم سُرق رمزه (JWT) وصلاحيته 30 يومًا. كيف كان يجب تصميم النظام ليمكن إيقافه؟', 'A user’s JWT was stolen and is valid for 30 days. How should the system have been designed so it can be stopped?', 'Bir kullanıcının 30 gün geçerli JWT’si çalındı. Durdurulabilmesi için sistem nasıl tasarlanmalıydı?'),
    options: L3(
      ['رمز وصول قصير (دقائق) مع refresh token يُخزَّن ويمكن إلغاؤه، وقائمة منع عند الحاجة', 'رمز بلا انتهاء', 'تغيير اسم المستخدم', 'تشفير الرمز بـ Base64'],
      ['A short-lived access token (minutes) plus a stored, revocable refresh token, and a denylist when needed', 'A token that never expires', 'Changing the username', 'Base64-encoding the token'],
      ['Kısa ömürlü erişim token’ı (dakikalar) ile saklanan ve iptal edilebilen refresh token, gerektiğinde engel listesi', 'Süresi dolmayan token', 'Kullanıcı adını değiştirmek', 'Token’ı Base64 ile kodlamak'],
    ),
    answer: 0,
    why: W('الـ JWT يُفحص بالتوقيع فقط، فلا يمكن «سحبه» قبل انتهائه. المدة القصيرة تحدّ الضرر، والـ refresh token المحفوظ في الخادم يمكن إلغاؤه عند تسجيل الخروج أو تغيير كلمة المرور.',
      'A JWT is checked by its signature alone, so it cannot be "taken back" before it expires. A short lifetime limits damage, and a server-side refresh token can be revoked on logout or password change.',
      'JWT sadece imzasıyla doğrulanır; süresi dolmadan "geri alınamaz". Kısa ömür zararı sınırlar; sunucuda saklanan refresh token çıkışta veya şifre değişince iptal edilebilir.'),
  }),
  choice({
    id: 'ss-s-secret-manager', level: 'senior', topic: 'server-security',
    prompt: W('شركة فيها 30 خدمة، وكل خدمة تحفظ كلمة مرور قاعدة البيانات في ملف .env على الخادم. ما التحسين الأهم؟', 'A company has 30 services, each with the database password in a .env file on its server. What is the most important improvement?', 'Bir şirkette 30 servis var ve her biri veritabanı şifresini sunucudaki bir .env dosyasında tutuyor. En önemli iyileştirme nedir?'),
    options: L3(
      ['مدير أسرار مركزي (Vault أو Secrets Manager) مع صلاحيات لكل خدمة وتدوير دوري للأسرار', 'نسخ الملف إلى كل المطورين', 'وضع كلمة المرور في Git لسهولة التحديث', 'كلمة مرور واحدة لكل شيء'],
      ['A central secret manager (Vault or a Secrets Manager) with per-service access and regular rotation', 'Copy the file to every developer', 'Put the password in Git for easy updates', 'One password for everything'],
      ['Servis bazında erişim ve düzenli rotasyonla merkezi bir sır yöneticisi (Vault veya Secrets Manager)', 'Dosyayı her geliştiriciye kopyalamak', 'Kolay güncelleme için şifreyi Git’e koymak', 'Her şey için tek şifre'],
    ),
    answer: 0,
    why: W('المدير المركزي يسجل من قرأ أي سر، ويسمح بتغيير كلمة المرور في مكان واحد، وبأسرار مؤقتة تنتهي تلقائيًا. والتدوير الدوري يحد من ضرر أي تسريب قديم.',
      'A central manager logs who read which secret, lets you change a password in one place, and can issue temporary secrets that expire. Regular rotation limits the damage from any old leak.',
      'Merkezi yönetici kimin hangi sırrı okuduğunu kaydeder, şifreyi tek yerden değiştirmeyi ve kendiliğinden sona eren geçici sırlar vermeyi sağlar. Düzenli rotasyon eski sızıntıların zararını sınırlar.'),
  }),
  choice({
    id: 'ss-s-logging-secrets', level: 'senior', topic: 'server-security',
    prompt: W('أي من هذه يجب ألا يظهر في سجلات الخادم؟', 'Which of these must not end up in server logs?', 'Bunlardan hangisi sunucu loglarında yer almamalı?'),
    options: L3(
      ['كلمات المرور ورموز الوصول وأرقام البطاقات الكاملة', 'معرّف الطلب', 'رمز الحالة', 'زمن الاستجابة'],
      ['Passwords, access tokens and full card numbers', 'The request id', 'The status code', 'The response time'],
      ['Şifreler, erişim token’ları ve tam kart numaraları', 'İstek kimliği', 'Durum kodu', 'Yanıt süresi'],
    ),
    answer: 0,
    why: W('السجلات تُنسخ إلى أدوات كثيرة ويقرؤها عدد أكبر من الناس، فتصبح مكانًا سهلًا لتسريب الأسرار. استخدم إخفاءً تلقائيًا (redaction) للحقول الحساسة مثل password وauthorization.',
      'Logs get copied into many tools and read by more people, which makes them an easy place to leak secrets. Use automatic redaction for sensitive fields like password and authorization.',
      'Loglar birçok araca kopyalanır ve daha çok kişi tarafından okunur; sırlar için kolay bir sızıntı yeri olur. password ve authorization gibi hassas alanlar için otomatik maskeleme (redaction) kullan.'),
  }),
  choice({
    id: 'ss-s-redos', level: 'senior', topic: 'server-security',
    prompt: W('خادم Node.js يتجمد تمامًا عندما يرسل أحدهم نصًا طويلًا من حرف a ينتهي بـ !. لماذا؟', 'A Node.js server freezes completely when someone sends a long string of a’s ending in !. Why?', 'Biri sonu ! ile biten uzun bir a dizisi gönderince Node.js sunucusu tamamen donuyor. Neden?'),
    code: `const valid = /^(a+)+$/.test(req.body.name);`, codeLang: 'js',
    options: L3(
      ['ReDoS: التعبير النمطي يجرّب عددًا هائلًا من الاحتمالات ويحجز الـ event loop', 'الذاكرة امتلأت بالنص', 'خطأ في JSON', 'Node لا يدعم التعبيرات النمطية'],
      ['ReDoS: the regex tries a huge number of paths and blocks the event loop', 'Memory filled up with the string', 'A JSON error', 'Node does not support regexes'],
      ['ReDoS: regex çok sayıda yolu dener ve event loop’u kilitler', 'Bellek metinle doldu', 'JSON hatası', 'Node regex desteklemez'],
    ),
    answer: 0,
    why: W('التكرار المتداخل (a+)+ مع نص لا يطابق يسبب catastrophic backtracking، وزمنه يتضاعف مع كل حرف. وبما أن Node يعمل في خيط واحد تتوقف كل الطلبات. بسّط التعبير وحدد طول الإدخال.',
      'Nested repetition (a+)+ on a string that does not match causes catastrophic backtracking, doubling the time with each character. Node runs on one thread, so every request stops. Simplify the pattern and cap the input length.',
      'İç içe tekrar (a+)+ eşleşmeyen bir metinde felaket düzeyinde geri izlemeye yol açar; her karakterle süre ikiye katlanır. Node tek iş parçacığında çalıştığı için tüm istekler durur. Kalıbı sadeleştir ve girdi uzunluğunu sınırla.'),
  }),
]
