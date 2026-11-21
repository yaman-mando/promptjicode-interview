import type { Question } from '#shared/types/quiz'
import { choice, output } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const topic = 'architecture' as const

export const ARCHITECTURE_2: Question[] = [
  // ───────── Junior ─────────
  output({ id: 'ar-j2-cache-hits', level: 'junior', topic,
    code: `const cache = new Map()
let dbCalls = 0
function getUser(id) {
  if (!cache.has(id)) { dbCalls++; cache.set(id, { id }) }
  return cache.get(id)
}
getUser(1); getUser(2); getUser(1); getUser(1)
console.log(dbCalls, cache.size)`,
    options: ['2 2', '4 2', '3 2', '2 4'], answer: 0,
    why: W('أول طلب لكل معرّف يذهب لقاعدة البيانات، والباقي يُقرأ من الكاش. هذه فكرة الكاش ببساطة.', 'The first request for each id goes to the database; the rest come from the cache. That is caching in a nutshell.', 'Her kimlik için ilk istek veritabanına gider, gerisi önbellekten okunur. Önbelleğin özü budur.') }),
  output({ id: 'ar-j2-config-merge', level: 'junior', topic,
    code: `const defaults = { port: 3000, debug: false, db: 'local' }
const production = { debug: false, db: 'prod-cluster' }
const config = { ...defaults, ...production }
console.log(config.port, config.db)`,
    options: ['3000 prod-cluster', '3000 local', 'undefined prod-cluster', '3000 undefined'], answer: 0,
    why: W('إعدادات البيئة تُكتب فوق القيم الافتراضية، وما لم يُذكر يبقى كما هو. هكذا يعمل نفس الكود في كل بيئة.', 'Environment settings override the defaults, and anything not mentioned stays. That is how the same code runs in every environment.', 'Ortam ayarları varsayılanların üzerine yazar; belirtilmeyen aynen kalır. Aynı kod her ortamda böyle çalışır.') }),
  choice({ id: 'ar-j2-scale-up-out', level: 'junior', topic,
    prompt: W('ما الفرق بين التوسع العمودي والأفقي؟', 'What is the difference between scaling up and scaling out?', 'Dikey ve yatay ölçekleme arasındaki fark nedir?'),
    options: L3(
      ['العمودي: خادم أقوى. الأفقي: خوادم أكثر تتوزع عليها الطلبات', 'العمودي: خوادم أكثر. الأفقي: خادم أقوى', 'لا فرق', 'العمودي لقواعد البيانات فقط'],
      ['Up: a bigger server. Out: more servers sharing the requests', 'Up: more servers. Out: a bigger server', 'No difference', 'Up is only for databases'],
      ['Dikey: daha güçlü sunucu. Yatay: istekleri paylaşan daha çok sunucu', 'Dikey: daha çok sunucu. Yatay: daha güçlü sunucu', 'Fark yok', 'Dikey sadece veritabanları için'],
    ), answer: 0,
    why: W('العمودي أبسط لكن له حد أعلى ونقطة فشل واحدة. الأفقي يحتاج تطبيقًا بلا حالة وموزع أحمال.', 'Scaling up is simpler but has a ceiling and a single point of failure. Scaling out needs a stateless app and a load balancer.', 'Dikey daha basittir ama bir tavanı ve tek hata noktası vardır. Yatay, durumsuz bir uygulama ve yük dengeleyici ister.') }),
  choice({ id: 'ar-j2-object-storage', level: 'junior', topic,
    prompt: W('لماذا لا نحفظ صور المستخدمين على قرص الخادم نفسه؟', 'Why not keep user-uploaded images on the server’s own disk?', 'Kullanıcı resimlerini neden sunucunun kendi diskinde tutmayız?'),
    options: L3(
      ['تضيع عند إعادة النشر أو مع عدة خوادم؛ الأفضل تخزين كائنات مثل S3 أو R2', 'لأن القرص بطيء دائمًا', 'لأن الصور ممنوعة على الخوادم', 'لأن قاعدة البيانات أرخص للصور'],
      ['They get lost on redeploys or with several servers; object storage like S3 or R2 is better', 'Disks are always slow', 'Images are banned on servers', 'The database is cheaper for images'],
      ['Yeniden dağıtımda ya da çok sunuculu yapıda kaybolurlar; S3 veya R2 gibi nesne depolama daha iyi', 'Diskler her zaman yavaştır', 'Sunucularda resim yasaktır', 'Resimler için veritabanı daha ucuz'],
    ), answer: 0,
    why: W('تخزين الكائنات مشترك بين كل الخوادم ورخيص ويمكن تقديمه عبر CDN. ونحفظ في قاعدة البيانات الرابط فقط.', 'Object storage is shared by every server, cheap, and can be served through a CDN. The database keeps only the URL.', 'Nesne depolama tüm sunucularca paylaşılır, ucuzdur ve CDN üzerinden sunulabilir. Veritabanı yalnızca URL’yi tutar.') }),
  choice({ id: 'ar-j2-staging', level: 'junior', topic,
    prompt: W('ما فائدة بيئة staging بين التطوير والإنتاج؟', 'What is a staging environment between development and production for?', 'Geliştirme ile canlı arasındaki staging ortamı ne işe yarar?'),
    options: L3(
      ['اختبار النسخة الجديدة في ظروف قريبة من الإنتاج قبل وصولها للمستخدمين', 'تسريع الموقع', 'تخزين النسخ الاحتياطية', 'لا فائدة'],
      ['Testing the new version in near-production conditions before users see it', 'Making the site faster', 'Storing backups', 'None'],
      ['Yeni sürümü kullanıcılar görmeden canlıya yakın koşullarda test etmek', 'Siteyi hızlandırmak', 'Yedekleri saklamak', 'Hiçbir faydası yok'],
    ), answer: 0,
    why: W('staging يكشف مشاكل الإعدادات والـ migrations قبل الإنتاج، وله قاعدة بيانات منفصلة دائمًا.', 'Staging catches config and migration problems before production, and it always has its own database.', 'Staging, yapılandırma ve migration sorunlarını canlıdan önce yakalar ve her zaman ayrı bir veritabanı vardır.') }),
  choice({ id: 'ar-j2-dns', level: 'junior', topic,
    prompt: W('ما دور DNS عند فتح example.com؟', 'What does DNS do when you open example.com?', 'example.com açılırken DNS ne yapar?'),
    options: L3(
      ['يحوّل اسم النطاق إلى عنوان IP للخادم', 'يشفّر الاتصال', 'يخزّن صفحات الموقع', 'يوزّع الأحمال بين قواعد البيانات'],
      ['Translates the domain name into the server’s IP address', 'Encrypts the connection', 'Stores the site’s pages', 'Balances load between databases'],
      ['Alan adını sunucunun IP adresine çevirir', 'Bağlantıyı şifreler', 'Sitenin sayfalarını saklar', 'Veritabanları arasında yük dağıtır'],
    ), answer: 0,
    why: W('ولأن نتائج DNS تُخزّن مؤقتًا حسب TTL، قد يأخذ تغيير العنوان بعض الوقت ليصل للجميع.', 'Because DNS answers are cached by TTL, a change of address can take a while to reach everyone.', 'DNS yanıtları TTL’e göre önbelleğe alındığı için adres değişikliğinin herkese ulaşması zaman alabilir.') }),
  choice({ id: 'ar-j2-reverse-proxy', level: 'junior', topic,
    prompt: W('ما دور Nginx كـ reverse proxy أمام تطبيق Node أو Python؟', 'What does Nginx do as a reverse proxy in front of a Node or Python app?', 'Node veya Python uygulamasının önündeki reverse proxy olarak Nginx ne yapar?'),
    options: L3(
      ['يستقبل الطلبات ويتولى HTTPS والضغط والملفات الثابتة، ثم يمرر الباقي للتطبيق', 'يكتب كود التطبيق', 'يحل محل قاعدة البيانات', 'يمنع كل الطلبات الخارجية'],
      ['Receives requests, handles HTTPS, compression and static files, and passes the rest to the app', 'Writes the app code', 'Replaces the database', 'Blocks all outside requests'],
      ['İstekleri alır; HTTPS, sıkıştırma ve statik dosyaları üstlenir, gerisini uygulamaya iletir', 'Uygulama kodunu yazar', 'Veritabanının yerini alır', 'Tüm dış istekleri engeller'],
    ), answer: 0,
    why: W('التطبيق يركز على المنطق، والـ proxy يتولى المهام المتكررة، ويمكنه توزيع الطلبات على عدة نسخ.', 'The app focuses on logic while the proxy handles the repetitive jobs, and it can spread requests over several instances.', 'Uygulama mantığa odaklanır, proxy tekrarlayan işleri üstlenir ve istekleri birkaç kopyaya dağıtabilir.') }),
  choice({ id: 'ar-j2-docker', level: 'junior', topic,
    prompt: W('ما الفائدة الأساسية من تشغيل التطبيق في حاوية Docker؟', 'What is the main benefit of running the app in a Docker container?', 'Uygulamayı Docker konteynerinde çalıştırmanın asıl faydası nedir?'),
    options: L3(
      ['نفس البيئة والإصدارات في جهازك والخادم: «يعمل عندي» يعمل في كل مكان', 'يجعل الكود أسرع بمرتين', 'يغني عن الاختبارات', 'يشفّر قاعدة البيانات'],
      ['The same environment and versions on your laptop and the server: "works on my machine" works everywhere', 'It makes code twice as fast', 'It replaces tests', 'It encrypts the database'],
      ['Bilgisayarında ve sunucuda aynı ortam ve sürümler: "bende çalışıyor" her yerde çalışır', 'Kodu iki kat hızlandırır', 'Testlerin yerini alır', 'Veritabanını şifreler'],
    ), answer: 0,
    why: W('الصورة تحمل نظام التشغيل والمكتبات والإعدادات، فتختفي فروق البيئات تقريبًا.', 'The image carries the OS, libraries and setup, so differences between environments mostly disappear.', 'İmaj işletim sistemini, kütüphaneleri ve kurulumu taşır; ortam farkları büyük ölçüde kaybolur.') }),
  choice({ id: 'ar-j2-service-layer', level: 'junior', topic,
    prompt: W('Controller فيه 300 سطر من حسابات الخصم والضرائب. ما التحسين الأوضح؟', 'A controller has 300 lines of discount and tax calculations. The clearest improvement?', 'Bir controller’da 300 satır indirim ve vergi hesabı var. En net iyileştirme?'),
    options: L3(
      ['نقل منطق الأعمال إلى طبقة خدمات (service)، وإبقاء الـ controller للطلب والرد', 'تقسيمه إلى 3 controllers', 'نقله إلى الواجهة الأمامية', 'تركه كما هو'],
      ['Move the business logic into a service layer and keep the controller for request and response', 'Split it into 3 controllers', 'Move it to the frontend', 'Leave it'],
      ['İş mantığını bir servis katmanına taşıyıp controller’ı istek ve yanıta bırakmak', '3 controller’a bölmek', 'Ön yüze taşımak', 'Olduğu gibi bırakmak'],
    ), answer: 0,
    why: W('الخدمة يمكن اختبارها وإعادة استخدامها من مكان آخر (مهمة مجدولة أو API ثانٍ) بدون HTTP.', 'A service can be tested and reused elsewhere (a scheduled job or another API) without HTTP.', 'Servis, HTTP olmadan test edilebilir ve başka yerde (zamanlanmış iş veya başka bir API) yeniden kullanılabilir.') }),
  choice({ id: 'ar-j2-monitoring', level: 'junior', topic,
    prompt: W('كيف تعرف أن الموقع توقف قبل أن يخبرك المستخدمون؟', 'How do you find out the site is down before users tell you?', 'Sitenin çöktüğünü kullanıcılar söylemeden nasıl öğrenirsin?'),
    options: L3(
      ['مراقبة تفحص الموقع دوريًا وترسل تنبيهًا عند الفشل أو البطء', 'قراءة السجلات يدويًا كل يوم', 'انتظار رسائل المستخدمين', 'إعادة تشغيل الخادم كل ساعة'],
      ['Monitoring that checks the site regularly and alerts on failure or slowness', 'Reading logs by hand every day', 'Waiting for user messages', 'Restarting the server hourly'],
      ['Siteyi düzenli kontrol edip hata ya da yavaşlıkta uyarı gönderen izleme', 'Her gün logları elle okumak', 'Kullanıcı mesajlarını beklemek', 'Sunucuyu her saat yeniden başlatmak'],
    ), answer: 0,
    why: W('السجلات تشرح ما حدث، والمقاييس والتنبيهات تخبرك أنه يحدث الآن (الأخطاء، زمن الاستجابة، التوفر).', 'Logs explain what happened; metrics and alerts tell you it is happening now (errors, latency, uptime).', 'Loglar ne olduğunu anlatır; metrikler ve uyarılar şu an olduğunu söyler (hatalar, gecikme, erişilebilirlik).') }),
  choice({ id: 'ar-j2-webhook', level: 'junior', topic,
    prompt: W('ما هو الـ webhook؟', 'What is a webhook?', 'Webhook nedir?'),
    options: L3(
      ['خدمة خارجية تستدعي رابطًا في خادمك عند حدوث شيء، مثل نجاح دفعة', 'طلب يرسله المتصفح كل ثانية', 'نوع من قواعد البيانات', 'مكتبة لـ React'],
      ['An outside service calls a URL on your server when something happens, like a successful payment', 'A request the browser sends every second', 'A kind of database', 'A React library'],
      ['Bir şey olduğunda (ör. başarılı ödeme) dış servisin sunucundaki bir URL’yi çağırması', 'Tarayıcının her saniye gönderdiği istek', 'Bir veritabanı türü', 'Bir React kütüphanesi'],
    ), answer: 0,
    why: W('بدل أن تسأل الخدمة كل دقيقة «هل حدث شيء؟»، تخبرك هي فور حدوثه. وتحقق دائمًا من توقيع الطلب.', 'Instead of asking the service every minute "anything new?", it tells you as soon as it happens. Always verify the request signature.', 'Servise her dakika "yeni bir şey var mı?" diye sormak yerine, o olduğu anda sana haber verir. İsteğin imzasını her zaman doğrula.') }),
  choice({ id: 'ar-j2-prod-db', level: 'junior', topic,
    prompt: W('لماذا لا نختبر الكود الجديد على قاعدة بيانات الإنتاج؟', 'Why not test new code against the production database?', 'Yeni kodu neden canlı veritabanında test etmeyiz?'),
    options: L3(
      ['خطأ واحد قد يمسح أو يفسد بيانات حقيقية للمستخدمين', 'لأنها أبطأ', 'لأن الاختبارات لا تعمل عليها', 'لا مانع'],
      ['One mistake can delete or corrupt real users’ data', 'It is slower', 'Tests do not run there', 'It is fine'],
      ['Tek bir hata gerçek kullanıcı verisini silebilir ya da bozabilir', 'Daha yavaştır', 'Testler orada çalışmaz', 'Sorun yok'],
    ), answer: 0,
    why: W('لكل بيئة قاعدة بيانات منفصلة، وإن احتجت بيانات واقعية فانسخها بعد إخفاء البيانات الشخصية.', 'Each environment has its own database; if you need realistic data, copy it after masking personal information.', 'Her ortamın ayrı veritabanı olur; gerçekçi veri gerekirse kişisel bilgileri maskeledikten sonra kopyala.') }),
  choice({ id: 'ar-j2-cron', level: 'junior', topic,
    prompt: W('تريد إرسال تقرير يومي الساعة 6 صباحًا. ما الأداة المناسبة؟', 'You want to send a daily report at 6 a.m. Which tool fits?', 'Her gün sabah 6’da rapor göndermek istiyorsun. Hangi araç uygun?'),
    options: L3(
      ['مهمة مجدولة (cron أو scheduler في الإطار)', 'setTimeout داخل طلب المستخدم', 'زر يضغطه موظف كل يوم', 'حلقة while(true) في الخادم'],
      ['A scheduled job (cron or the framework’s scheduler)', 'setTimeout inside a user request', 'A button a staff member presses daily', 'A while(true) loop on the server'],
      ['Zamanlanmış iş (cron ya da çatının scheduler’ı)', 'Kullanıcı isteği içinde setTimeout', 'Bir çalışanın her gün bastığı buton', 'Sunucuda while(true) döngüsü'],
    ), answer: 0,
    why: W('المهام المجدولة مستقلة عن طلبات المستخدمين. ومع عدة خوادم تأكد أنها تعمل على خادم واحد فقط.', 'Scheduled jobs are independent of user requests. With several servers, make sure the job runs on only one.', 'Zamanlanmış işler kullanıcı isteklerinden bağımsızdır. Birden çok sunucuda işin yalnızca birinde çalıştığından emin ol.') }),

  // ───────── Mid ─────────
  output({ id: 'ar-m2-backoff', level: 'mid', topic,
    code: `const delays = [0, 1, 2, 3].map(attempt => 100 * 2 ** attempt)
console.log(delays)`,
    options: ['[ 100, 200, 400, 800 ]', '[ 100, 200, 300, 400 ]', '[ 0, 100, 200, 400 ]', '[ 200, 400, 800, 1600 ]'], answer: 0,
    why: W('الانتظار الأسّي يضاعف المهلة في كل محاولة فيعطي الخدمة المتعثرة وقتًا لتتعافى. وأضف عشوائية صغيرة (jitter) حتى لا تعيد كل العملاء المحاولة معًا.', 'Exponential backoff doubles the wait each attempt, giving a struggling service time to recover. Add a little randomness (jitter) so clients do not retry together.', 'Üstel bekleme her denemede süreyi ikiye katlar ve zorlanan servise toparlanma zamanı verir. İstemciler aynı anda denemesin diye biraz rastgelelik (jitter) ekle.') }),
  output({ id: 'ar-m2-lru', level: 'mid', topic,
    code: `class LRU {
  constructor(max) { this.max = max; this.map = new Map() }
  get(k) {
    if (!this.map.has(k)) return
    const v = this.map.get(k)
    this.map.delete(k); this.map.set(k, v)
    return v
  }
  set(k, v) {
    this.map.delete(k); this.map.set(k, v)
    if (this.map.size > this.max) this.map.delete(this.map.keys().next().value)
  }
}
const c = new LRU(2)
c.set('a', 1); c.set('b', 2); c.get('a'); c.set('c', 3)
console.log([...c.map.keys()].join(','))`,
    options: ['a,c', 'b,c', 'a,b', 'a,b,c'], answer: 0,
    why: W('LRU يحذف الأقدم استخدامًا. قراءة a جعلتها «حديثة»، فحُذفت b عند إضافة c. هكذا يعمل Redis مع سياسة allkeys-lru.', 'LRU evicts the least recently used. Reading a made it recent, so b was evicted when c arrived. Redis works like this with allkeys-lru.', 'LRU en uzun süredir kullanılmayanı çıkarır. a okunduğu için yeni sayıldı; c gelince b çıkarıldı. Redis allkeys-lru ile böyle çalışır.') }),
  choice({ id: 'ar-m2-dlq', level: 'mid', topic,
    prompt: W('رسالة في الطابور تفشل كل مرة بسبب بيانات تالفة وتُعاد للأبد. ما الحل؟', 'A queue message fails every time because of bad data and keeps coming back forever. The fix?', 'Kuyruktaki bir mesaj bozuk veri yüzünden her seferinde başarısız oluyor ve sonsuza dek geri geliyor. Çözüm?'),
    options: L3(
      ['حد لعدد المحاولات ثم نقلها إلى Dead Letter Queue لمراجعتها', 'حذف الطابور', 'زيادة عدد العمال', 'إيقاف الأخطاء في السجل'],
      ['Cap the retries, then move it to a dead letter queue for review', 'Delete the queue', 'Add more workers', 'Silence the errors in the log'],
      ['Deneme sayısını sınırla, sonra incelemek üzere dead letter queue’ya taşı', 'Kuyruğu silmek', 'Daha çok worker eklemek', 'Logdaki hataları susturmak'],
    ), answer: 0,
    why: W('الرسالة «السامة» تستهلك العمال وتؤخر الرسائل السليمة. الـ DLQ يعزلها مع تنبيه لمراجعتها يدويًا.', 'A "poison" message ties up workers and delays healthy ones. A DLQ isolates it, with an alert so someone reviews it.', '"Zehirli" mesaj worker’ları meşgul eder ve sağlam mesajları geciktirir. DLQ onu bir uyarıyla izole eder ki biri incelesin.') }),
  choice({ id: 'ar-m2-feature-flag', level: 'mid', topic,
    prompt: W('ميزة جديدة جاهزة في الكود، لكنك تريد تفعيلها لـ 5% من المستخدمين أولًا. ما الأداة؟', 'A new feature is in the code, but you want to turn it on for 5% of users first. Which tool?', 'Yeni bir özellik kodda hazır ama önce kullanıcıların %5’i için açmak istiyorsun. Hangi araç?'),
    options: ['Feature flag', 'Git branch', 'Database index', 'Load balancer'], answer: 0,
    why: W('الـ feature flag يفصل النشر عن الإطلاق: الكود منشور، والتفعيل يتغير بلا نشر جديد، ويمكن إطفاؤه فورًا عند مشكلة.', 'A feature flag separates deploying from releasing: the code is live, switching it on needs no new deploy, and it can be turned off instantly if something breaks.', 'Feature flag, dağıtımı yayından ayırır: kod canlıdadır, açmak yeni dağıtım gerektirmez ve sorun olursa anında kapatılır.') }),
  choice({ id: 'ar-m2-rolling', level: 'mid', topic,
    prompt: W('كيف تنشر نسخة جديدة بدون توقف الخدمة؟', 'How do you deploy a new version without downtime?', 'Yeni sürümü kesinti olmadan nasıl dağıtırsın?'),
    options: L3(
      ['استبدال النسخ تدريجيًا (rolling) أو blue-green، مع health check قبل تحويل الطلبات', 'إيقاف الخادم ثم تشغيله بسرعة', 'النشر ليلًا فقط', 'نشر الكود على نفس الملفات أثناء العمل'],
      ['Replace instances gradually (rolling) or blue-green, with a health check before routing traffic', 'Stop the server and start it quickly', 'Only deploy at night', 'Overwrite the files while running'],
      ['Kopyaları kademeli değiştirmek (rolling) ya da blue-green; trafiği yönlendirmeden önce health check', 'Sunucuyu durdurup hızla başlatmak', 'Sadece gece dağıtmak', 'Çalışırken dosyaların üzerine yazmak'],
    ), answer: 0,
    why: W('النسخة الجديدة تستقبل الطلبات فقط بعد أن تثبت أنها سليمة، والقديمة تُكمل طلباتها الحالية ثم تتوقف.', 'The new version gets traffic only after it proves healthy, and the old one finishes its current requests before stopping.', 'Yeni sürüm sağlıklı olduğunu kanıtladıktan sonra trafik alır; eskisi mevcut isteklerini bitirip durur.') }),
  choice({ id: 'ar-m2-logs-stdout', level: 'mid', topic,
    prompt: W('أين يكتب التطبيق سجلاته عند تشغيله في حاويات على عدة خوادم؟', 'Where should the app write its logs when running in containers on several servers?', 'Uygulama birkaç sunucuda konteynerlerde çalışırken loglarını nereye yazmalı?'),
    options: L3(
      ['إلى stdout بصيغة منظمة (JSON)، وتجمعها المنصة في مكان مركزي', 'ملف على قرص كل حاوية', 'جدول في قاعدة البيانات الرئيسية', 'لا داعي للسجلات'],
      ['To stdout in a structured format (JSON), collected centrally by the platform', 'A file on each container’s disk', 'A table in the main database', 'No logs needed'],
      ['Yapılandırılmış biçimde (JSON) stdout’a; platform merkezi bir yerde toplar', 'Her konteynerin diskindeki bir dosyaya', 'Ana veritabanındaki bir tabloya', 'Loga gerek yok'],
    ), answer: 0,
    why: W('ملفات الحاوية تختفي معها، والبحث في 10 خوادم مرهق. السجلات المركزية المنظمة تسمح بالبحث والتنبيه.', 'Container files vanish with the container, and searching 10 servers is painful. Central structured logs allow search and alerts.', 'Konteyner dosyaları onunla birlikte kaybolur ve 10 sunucuda aramak yorucudur. Merkezi yapılandırılmış loglar arama ve uyarı sağlar.') }),
  choice({ id: 'ar-m2-write-through', level: 'mid', topic,
    prompt: W('في نمط write-through للكاش، ماذا يحدث عند الكتابة؟', 'In the write-through cache pattern, what happens on a write?', 'Write-through önbellek kalıbında yazma sırasında ne olur?'),
    options: L3(
      ['تُكتب البيانات في قاعدة البيانات والكاش معًا في نفس العملية', 'تُكتب في الكاش فقط وتُنقل لاحقًا', 'يُحذف الكاش كاملًا', 'تُكتب في قاعدة البيانات فقط'],
      ['Data is written to the database and the cache together in the same operation', 'Data goes only to the cache and is flushed later', 'The whole cache is cleared', 'Data goes only to the database'],
      ['Veri aynı işlemde hem veritabanına hem önbelleğe yazılır', 'Sadece önbelleğe yazılır, sonra aktarılır', 'Tüm önbellek temizlenir', 'Sadece veritabanına yazılır'],
    ), answer: 0,
    why: W('القراءات بعدها سريعة ومحدّثة، مقابل كتابة أبطأ قليلًا. أما الكتابة للكاش فقط ثم النقل (write-behind) فأسرع لكنها قد تفقد بيانات.', 'Reads afterwards are fast and fresh, at the cost of slightly slower writes. Writing to the cache first and flushing later (write-behind) is faster but can lose data.', 'Sonraki okumalar hızlı ve günceldir; bedeli biraz daha yavaş yazmadır. Önce önbelleğe yazıp sonra aktarmak (write-behind) daha hızlıdır ama veri kaybedebilir.') }),
  choice({ id: 'ar-m2-pubsub', level: 'mid', topic,
    prompt: W('حدث «تم الطلب» يجب أن يصل لخدمة البريد وخدمة المخزون وخدمة التحليلات معًا. ما النمط؟', 'An "order placed" event must reach the email, inventory and analytics services. Which pattern?', '"Sipariş verildi" olayı e-posta, stok ve analitik servislerine birlikte ulaşmalı. Hangi kalıp?'),
    options: {

      ar: ['Publish/Subscribe (fan-out)', 'Point-to-point queue', 'Synchronous HTTP chain', 'Shared database table'],

      en: ['Publish/Subscribe (fan-out)', 'Point-to-point queue', 'سلسلة طلبات HTTP متزامنة', 'Shared database table'],

      tr: ['Publish/Subscribe (fan-out)', 'Point-to-point queue', 'Senkron HTTP zinciri', 'Shared database table'],

    }, answer: 0,
    why: W('في Pub/Sub تحصل كل خدمة على نسختها من الحدث. في الطابور العادي تأخذ الرسالة خدمة واحدة فقط.', 'With pub/sub each service gets its own copy of the event. In a plain queue only one consumer takes a message.', 'Pub/sub’da her servis olayın kendi kopyasını alır. Normal kuyrukta mesajı yalnızca bir tüketici alır.') }),
  choice({ id: 'ar-m2-presigned', level: 'mid', topic,
    prompt: W('المستخدمون يرفعون فيديوهات بحجم 2GB عبر الـ API، فيمتلئ الخادم ويبطؤ. ما الحل؟', 'Users upload 2 GB videos through the API, so the server fills up and slows down. The fix?', 'Kullanıcılar API üzerinden 2 GB video yüklüyor; sunucu doluyor ve yavaşlıyor. Çözüm?'),
    options: L3(
      ['رابط رفع موقّع (presigned URL) ليرفع المتصفح مباشرة إلى S3 أو R2', 'زيادة ذاكرة الخادم', 'ضغط الفيديو في الخادم أولًا', 'منع الفيديوهات'],
      ['A presigned upload URL so the browser uploads straight to S3 or R2', 'Add server memory', 'Compress the video on the server first', 'Ban videos'],
      ['Tarayıcının doğrudan S3 veya R2’ye yüklemesi için imzalı yükleme URL’si (presigned URL)', 'Sunucu belleğini artırmak', 'Videoyu önce sunucuda sıkıştırmak', 'Videoları yasaklamak'],
    ), answer: 0,
    why: W('الخادم يصدر رابطًا مؤقتًا بصلاحية محددة فقط، والملف لا يمر عبره. بعد الرفع يُبلغ التطبيق لتسجيله.', 'The server only issues a short-lived, limited URL, and the file never passes through it. After upload the app is notified to record it.', 'Sunucu yalnızca kısa ömürlü, sınırlı bir URL verir; dosya ondan geçmez. Yüklemeden sonra kayıt için uygulamaya haber verilir.') }),
  choice({ id: 'ar-m2-request-id', level: 'mid', topic,
    prompt: W('طلب يمر بثلاث خدمات وفشل في مكان ما. كيف تتبعه في السجلات؟', 'A request passes through three services and fails somewhere. How do you trace it in the logs?', 'Bir istek üç servisten geçip bir yerde başarısız oldu. Loglarda nasıl izlersin?'),
    options: L3(
      ['معرّف طلب (request/trace ID) يُمرَّر في الترويسات ويُسجَّل مع كل سطر', 'البحث بالوقت التقريبي', 'تسجيل كل شيء في ملف واحد', 'إعادة تنفيذ الطلب'],
      ['A request/trace ID passed in headers and logged with every line', 'Search by rough time', 'Log everything to one file', 'Replay the request'],
      ['Başlıklarda taşınan ve her satırla loglanan bir istek/trace kimliği', 'Yaklaşık zamana göre aramak', 'Her şeyi tek dosyaya yazmak', 'İsteği yeniden çalıştırmak'],
    ), answer: 0,
    why: W('بالمعرّف تبحث مرة واحدة فترى رحلة الطلب كاملة. وهذا أساس التتبع الموزع مثل OpenTelemetry.', 'With the id, one search shows the request’s whole journey. This is the basis of distributed tracing such as OpenTelemetry.', 'Kimlikle tek arama isteğin tüm yolculuğunu gösterir. OpenTelemetry gibi dağıtık izlemenin temeli budur.') }),
  choice({ id: 'ar-m2-modular-monolith', level: 'mid', topic,
    prompt: W('فريق من 4 مطورين يبدأ منتجًا جديدًا. ما البنية الأنسب غالبًا؟', 'A team of 4 developers starts a new product. Usually the best structure?', '4 geliştiricilik bir ekip yeni bir ürüne başlıyor. Genelde en uygun yapı?'),
    options: {

      ar: ['Modular monolith', '20 microservices', 'Serverless function per endpoint', 'One file for everything'],

      en: ['Modular monolith', '20 microservices', 'دالة serverless لكل مسار', 'ملف واحد لكل شيء'],

      tr: ['Modular monolith', '20 microservices', 'Her endpoint için bir serverless fonksiyon', 'Her şey için tek dosya'],

    }, answer: 0,
    why: W('تطبيق واحد بوحدات منفصلة بوضوح أبسط في النشر والتطوير، ويمكن فصل وحدة لاحقًا إذا احتاجت توسعًا مستقلًا.', 'One app with clearly separated modules is simpler to deploy and build, and a module can be split out later if it needs to scale on its own.', 'Net ayrılmış modüllere sahip tek uygulama dağıtım ve geliştirmede daha basittir; bir modül bağımsız ölçeklenmesi gerekirse sonra ayrılabilir.') }),
  choice({ id: 'ar-m2-sync-chain', level: 'mid', topic,
    prompt: W('إنشاء طلب يستدعي 5 خدمات بالتسلسل عبر HTTP، فإذا تعطلت إحداها فشل الطلب كله. ما التحسين؟', 'Creating an order calls 5 services in sequence over HTTP, and if one is down the whole order fails. The improvement?', 'Sipariş oluşturmak HTTP ile 5 servisi sırayla çağırıyor; biri çökünce tüm sipariş başarısız oluyor. İyileştirme?'),
    options: L3(
      ['إبقاء الضروري فقط متزامنًا، والباقي (البريد، التحليلات) عبر أحداث غير متزامنة', 'زيادة المهلة لكل طلب', 'دمج كل الخدمات في قاعدة بيانات واحدة', 'إعادة المحاولة بلا حد'],
      ['Keep only what is essential synchronous; the rest (email, analytics) goes through async events', 'Raise every timeout', 'Merge all services into one database', 'Retry without limit'],
      ['Yalnızca zorunlu olanı senkron tutmak; gerisi (e-posta, analitik) asenkron olaylarla', 'Her zaman aşımını artırmak', 'Tüm servisleri tek veritabanında birleştirmek', 'Sınırsız yeniden denemek'],
    ), answer: 0,
    why: W('كل خدمة متزامنة تضيف زمنًا واحتمال فشل. ما لا يحتاجه المستخدم فورًا يمكن أن يتم بعد الرد.', 'Every synchronous hop adds latency and a chance to fail. Whatever the user does not need right away can happen after the response.', 'Her senkron adım gecikme ve hata olasılığı ekler. Kullanıcının hemen ihtiyacı olmayan şey yanıttan sonra yapılabilir.') }),

  choice({ id: 'ar-m2-readiness', level: 'mid', topic,
    prompt: W('ما الفرق بين liveness وreadiness في فحوصات الحاويات (مثل Kubernetes)؟', 'What is the difference between liveness and readiness checks for containers (as in Kubernetes)?', 'Konteyner kontrollerinde (Kubernetes gibi) liveness ile readiness arasındaki fark nedir?'),
    options: L3(
      ['liveness: هل العملية حية أم يجب إعادة تشغيلها؟ readiness: هل هي جاهزة لاستقبال الطلبات الآن؟', 'لا فرق', 'readiness يعيد تشغيل الحاوية، وliveness يوقف الطلبات', 'الاثنان لقاعدة البيانات فقط'],
      ['Liveness: is the process alive, or should it be restarted? Readiness: can it take requests right now?', 'No difference', 'Readiness restarts the container; liveness stops traffic', 'Both are only for the database'],
      ['Liveness: süreç canlı mı, yeniden başlatılmalı mı? Readiness: şu an istek alabilir mi?', 'Fark yok', 'Readiness konteyneri yeniden başlatır, liveness trafiği durdurur', 'İkisi de sadece veritabanı için'],
    ), answer: 0,
    why: W('أثناء الإقلاع أو عند انقطاع قاعدة البيانات تكون الخدمة حية لكن غير جاهزة، فتتوقف عنها الطلبات بدل إعادة تشغيلها بلا فائدة.', 'While starting up, or when the database is unreachable, the service is alive but not ready, so traffic stops instead of a pointless restart.', 'Başlarken ya da veritabanına ulaşılamadığında servis canlı ama hazır değildir; anlamsız yeniden başlatma yerine trafik durur.') }),

  // ───────── Senior ─────────
  output({ id: 'ar-s2-modulo-reshard', level: 'senior', topic,
    code: `// keys 0..11 spread with key % servers
let moved = 0
for (let key = 0; key < 12; key++) {
  if (key % 3 !== key % 4) moved++
}
console.log(moved)`,
    options: ['9', '3', '4', '0'], answer: 0,
    why: W('عند إضافة خادم رابع تنتقل معظم المفاتيح مع الباقي البسيط (%)، فيفرغ الكاش تقريبًا. Consistent hashing ينقل حوالي ربع المفاتيح فقط.', 'Adding a fourth server moves most keys with plain modulo (%), so the cache is almost emptied. Consistent hashing moves only about a quarter.', 'Dördüncü sunucu eklenince basit mod (%) ile anahtarların çoğu taşınır ve önbellek neredeyse boşalır. Consistent hashing yalnızca yaklaşık dörtte birini taşır.') }),
  output({ id: 'ar-s2-jitter', level: 'senior', topic,
    code: `// 3 clients retry after a 1000 ms failure
const noJitter = [1000, 1000, 1000]
const jitter = [0.12, 0.57, 0.93].map(r => Math.round(1000 * r))
console.log(new Set(noJitter).size, new Set(jitter).size)`,
    options: ['1 3', '3 3', '1 1', '3 1'], answer: 0,
    why: W('بدون عشوائية يعيد كل العملاء المحاولة في نفس اللحظة فيسقطون الخدمة من جديد (retry storm). الـ jitter يوزعهم على الوقت.', 'Without randomness every client retries at the same instant and knocks the service down again (a retry storm). Jitter spreads them out.', 'Rastgelelik olmadan her istemci aynı anda yeniden dener ve servisi tekrar düşürür (retry storm). Jitter onları zamana yayar.') }),
  choice({ id: 'ar-s2-saga', level: 'senior', topic,
    prompt: W('حجز رحلة يمر بخدمة الدفع ثم الفندق ثم الطيران، ولكل منها قاعدة بيانات. كيف تتعامل مع فشل الخطوة الأخيرة؟', 'Booking a trip goes through payment, then hotel, then flight, each with its own database. How do you handle the last step failing?', 'Bir seyahat rezervasyonu ödeme, otel ve uçuş servislerinden geçiyor; her birinin kendi veritabanı var. Son adım başarısız olursa?'),
    options: L3(
      ['Saga: خطوات محلية متتالية، ولكل خطوة عملية تعويض (استرداد الدفع، إلغاء الفندق)', 'معاملة SQL واحدة عبر القواعد الثلاث', 'تجاهل الفشل', 'إعادة المحاولة إلى ما لا نهاية'],
      ['A saga: local steps in sequence, each with a compensating action (refund, cancel the hotel)', 'One SQL transaction across all three databases', 'Ignore the failure', 'Retry forever'],
      ['Saga: sıralı yerel adımlar, her biri için telafi işlemi (iade, otel iptali)', 'Üç veritabanında tek SQL transaction', 'Hatayı yok saymak', 'Sonsuza dek yeniden denemek'],
    ), answer: 0,
    why: W('المعاملات الموزعة (2PC) بطيئة وهشة. الـ Saga تقبل أن النظام غير متسق لفترة قصيرة، وتصلح ذلك بالتعويض.', 'Distributed transactions (2PC) are slow and fragile. A saga accepts brief inconsistency and fixes it with compensation.', 'Dağıtık transaction’lar (2PC) yavaş ve kırılgandır. Saga kısa süreli tutarsızlığı kabul eder ve telafiyle düzeltir.') }),
  choice({ id: 'ar-s2-cqrs', level: 'senior', topic,
    prompt: W('ما فكرة CQRS؟', 'What is the idea behind CQRS?', 'CQRS’in fikri nedir?'),
    options: L3(
      ['فصل نموذج الكتابة عن نموذج القراءة، لكل منهما تصميم وتخزين يناسبه', 'استخدام SQL للكتابة وNoSQL للقراءة دائمًا', 'تشفير الأوامر والاستعلامات', 'دمج الـ API مع قاعدة البيانات'],
      ['Separating the write model from the read model, each with the design and storage that suits it', 'Always SQL for writes and NoSQL for reads', 'Encrypting commands and queries', 'Merging the API with the database'],
      ['Yazma modelini okuma modelinden ayırmak; her birine uygun tasarım ve depolama', 'Yazma için her zaman SQL, okuma için NoSQL', 'Komut ve sorguları şifrelemek', 'API’yi veritabanıyla birleştirmek'],
    ), answer: 0,
    why: W('مفيد عندما تختلف القراءة كثيرًا عن الكتابة (لوحات تقارير ثقيلة مثلًا). لكنه يضيف تعقيدًا وتأخرًا في تحديث القراءة، فلا تبدأ به.', 'It helps when reads differ a lot from writes (heavy reporting dashboards, say). It adds complexity and read lag, so do not start with it.', 'Okumalar yazmalardan çok farklıysa (ağır rapor panelleri gibi) faydalıdır. Karmaşıklık ve okuma gecikmesi ekler; onunla başlama.') }),
  choice({ id: 'ar-s2-event-sourcing', level: 'senior', topic,
    prompt: W('ما الكلفة الأساسية لاستخدام Event Sourcing؟', 'What is the main cost of using event sourcing?', 'Event sourcing kullanmanın asıl maliyeti nedir?'),
    options: L3(
      ['تعقيد أكبر: إعادة بناء الحالة، وتطوير صيغ الأحداث، واستعلامات تحتاج read models', 'لا يوجد سجل للتغييرات', 'لا يمكن الرجوع للماضي', 'لا يعمل مع الطوابير'],
      ['More complexity: rebuilding state, evolving event formats, and queries that need read models', 'There is no change history', 'You cannot look back in time', 'It does not work with queues'],
      ['Daha fazla karmaşıklık: durumu yeniden kurmak, olay biçimlerini geliştirmek ve read model gerektiren sorgular', 'Değişiklik geçmişi yok', 'Geçmişe bakılamaz', 'Kuyruklarla çalışmaz'],
    ), answer: 0,
    why: W('ميزته سجل كامل لكل تغيير (مناسب للمحاسبة والتدقيق)، لكن تغيير شكل الأحداث القديمة مؤلم، فاستخدمه حيث يستحق.', 'Its strength is a full history of every change (great for accounting and audits), but changing old event shapes is painful, so use it where it pays off.', 'Gücü her değişikliğin tam geçmişidir (muhasebe ve denetim için ideal); ama eski olay biçimlerini değiştirmek zordur, değdiği yerde kullan.') }),
  choice({ id: 'ar-s2-backpressure', level: 'senior', topic,
    prompt: W('الطابور يكبر بلا توقف لأن المنتجين أسرع من المستهلكين. ما الأولوية؟', 'The queue keeps growing because producers are faster than consumers. What comes first?', 'Üreticiler tüketicilerden hızlı olduğu için kuyruk durmadan büyüyor. Öncelik nedir?'),
    options: L3(
      ['قياس عمر الرسائل، وزيادة المستهلكين أو إبطاء المنتجين (backpressure)', 'تكبير ذاكرة الطابور فقط', 'حذف الرسائل القديمة عشوائيًا', 'تجاهله'],
      ['Measure message age, then add consumers or slow the producers (backpressure)', 'Just give the queue more memory', 'Randomly drop old messages', 'Ignore it'],
      ['Mesaj yaşını ölçmek, sonra tüketici eklemek ya da üreticileri yavaşlatmak (backpressure)', 'Sadece kuyruğa daha çok bellek vermek', 'Eski mesajları rastgele silmek', 'Yok saymak'],
    ), answer: 0,
    why: W('الطابور يمتص الذروات، لا يحل عدم التوازن الدائم. عمر أقدم رسالة مقياس أفضل من عدد الرسائل للتنبيه.', 'A queue absorbs spikes; it does not fix a permanent imbalance. The age of the oldest message is a better alert than the message count.', 'Kuyruk ani yükleri emer, kalıcı dengesizliği çözmez. En eski mesajın yaşı, uyarı için mesaj sayısından daha iyi bir ölçüttür.') }),
  choice({ id: 'ar-s2-rpo-rto', level: 'senior', topic,
    prompt: W('ماذا يعني RPO = 5 دقائق وRTO = ساعة في خطة التعافي من الكوارث؟', 'What do RPO = 5 minutes and RTO = 1 hour mean in a disaster recovery plan?', 'Felaket kurtarma planında RPO = 5 dakika ve RTO = 1 saat ne demektir?'),
    options: L3(
      ['نقبل خسارة بيانات آخر 5 دقائق كحد أقصى، والعودة للعمل خلال ساعة', 'نسخة احتياطية كل ساعة واسترجاع في 5 دقائق', 'الخادم يعمل 5 دقائق كل ساعة', 'لا علاقة لهما بالبيانات'],
      ['At most the last 5 minutes of data can be lost, and service is back within an hour', 'A backup every hour and a restore in 5 minutes', 'The server runs 5 minutes per hour', 'They have nothing to do with data'],
      ['En fazla son 5 dakikanın verisi kaybolabilir ve servis bir saat içinde geri gelir', 'Her saat yedek ve 5 dakikada geri yükleme', 'Sunucu saatte 5 dakika çalışır', 'Veriyle ilgileri yok'],
    ), answer: 0,
    why: W('RPO يحدد عدد مرات النسخ أو التكرار، وRTO يحدد سرعة الاسترجاع. وجرّب الاسترجاع فعليًا، فالنسخة التي لم تُجرَّب غير موثوقة.', 'RPO sets how often you back up or replicate; RTO sets how fast you restore. Actually rehearse restores: an untested backup cannot be trusted.', 'RPO yedekleme ya da çoğaltma sıklığını, RTO geri yükleme hızını belirler. Geri yüklemeyi gerçekten dene: denenmemiş yedeğe güvenilmez.') }),
  choice({ id: 'ar-s2-strangler', level: 'senior', topic,
    prompt: W('نظام قديم كبير يجب استبداله دون توقف العمل. ما الطريقة الأكثر أمانًا؟', 'A big legacy system must be replaced without stopping the business. The safest approach?', 'Büyük bir eski sistem iş durmadan değiştirilmeli. En güvenli yaklaşım?'),
    options: L3(
      ['Strangler fig: نقل جزء بعد جزء خلف نفس المدخل حتى لا يبقى شيء من القديم', 'إعادة كتابة كل شيء ثم التحويل في يوم واحد', 'تجميد النظام القديم سنتين', 'نسخ قاعدة البيانات فقط'],
      ['Strangler fig: move piece by piece behind the same entry point until nothing of the old system remains', 'Rewrite everything and switch over in one day', 'Freeze the old system for two years', 'Copy only the database'],
      ['Strangler fig: aynı giriş noktasının arkasında parça parça taşımak, eskiden hiçbir şey kalmayana dek', 'Her şeyi yeniden yazıp tek günde geçmek', 'Eski sistemi iki yıl dondurmak', 'Sadece veritabanını kopyalamak'],
    ), answer: 0,
    why: W('كل جزء يُنقل ويُختبر مع مستخدمين حقيقيين ويمكن الرجوع عنه. «الإعادة الكبيرة دفعة واحدة» من أشهر أسباب فشل المشاريع.', 'Each piece is moved, tested with real users and can be rolled back. The "big bang rewrite" is a classic way projects fail.', 'Her parça taşınır, gerçek kullanıcılarla test edilir ve geri alınabilir. "Tek seferde büyük yeniden yazım" projelerin bilinen bir başarısızlık nedenidir.') }),
  choice({ id: 'ar-s2-hot-key', level: 'senior', topic,
    prompt: W('مفتاح واحد في Redis (ملف مشهور) يستقبل 50 ألف قراءة بالثانية ويُبطئ العقدة كلها. ما الحل؟', 'One Redis key (a celebrity profile) gets 50,000 reads per second and slows its whole node. The fix?', 'Tek bir Redis anahtarı (ünlü bir profil) saniyede 50.000 okuma alıyor ve tüm düğümü yavaşlatıyor. Çözüm?'),
    options: L3(
      ['كاش محلي قصير في كل خادم، أو نسخ المفتاح على عدة مفاتيح وتوزيع القراءة', 'حذف المفتاح', 'زيادة TTL فقط', 'نقله إلى قاعدة البيانات'],
      ['A short local cache on each app server, or copies of the key spread across several keys', 'Delete the key', 'Only raise the TTL', 'Move it to the database'],
      ['Her uygulama sunucusunda kısa yerel önbellek ya da anahtarın birkaç anahtara kopyalanıp okumaların dağıtılması', 'Anahtarı silmek', 'Sadece TTL’i artırmak', 'Veritabanına taşımak'],
    ), answer: 0,
    why: W('كل المفاتيح المتشابهة تذهب لنفس العقدة، فالحل توزيع الحمل أو تخفيفه قبل الوصول إليها. ولو لثانيتين، الكاش المحلي يمتص معظم القراءات.', 'A given key always lands on the same node, so you spread or absorb the load before it gets there. Even two seconds of local caching soaks up most reads.', 'Bir anahtar hep aynı düğüme düşer; yükü oraya varmadan dağıtmak ya da emmek gerekir. İki saniyelik yerel önbellek bile okumaların çoğunu emer.') }),
  choice({ id: 'ar-s2-expand-contract', level: 'senior', topic,
    prompt: W('تريد تغيير اسم عمود في جدول كبير بدون توقف، مع نسخ قديمة وجديدة من التطبيق تعمل معًا أثناء النشر. ما الخطوات؟', 'You want to rename a column on a big table with no downtime, while old and new app versions run together during the deploy. The steps?', 'Büyük bir tabloda sütunu kesintisiz yeniden adlandırmak istiyorsun; dağıtım sırasında eski ve yeni sürümler birlikte çalışıyor. Adımlar?'),
    options: L3(
      ['Expand/contract: إضافة العمود الجديد، والكتابة في الاثنين، ونقل البيانات، ثم القراءة من الجديد، ثم حذف القديم', 'RENAME COLUMN مباشرة مع النشر', 'إيقاف الموقع ساعة', 'إنشاء جدول جديد وحذف القديم فورًا'],
      ['Expand/contract: add the new column, write to both, backfill, read from the new one, then drop the old', 'RENAME COLUMN straight away with the deploy', 'Take the site down for an hour', 'Create a new table and drop the old one at once'],
      ['Expand/contract: yeni sütunu ekle, ikisine yaz, verileri taşı, yeniden oku, sonra eskiyi sil', 'Dağıtımla birlikte doğrudan RENAME COLUMN', 'Siteyi bir saat kapatmak', 'Yeni tablo oluşturup eskisini hemen silmek'],
    ), answer: 0,
    why: W('أثناء النشر تعمل نسختان من الكود؛ كل خطوة يجب أن تكون متوافقة مع الاثنتين، وكل منها في نشر مستقل.', 'During a deploy two code versions run at once; every step must work with both, and each ships in its own deploy.', 'Dağıtım sırasında iki kod sürümü birlikte çalışır; her adım ikisiyle de uyumlu olmalı ve her biri ayrı dağıtımda gitmeli.') }),
  choice({ id: 'ar-s2-cache-race', level: 'senior', topic,
    prompt: W('بعد تحديث السعر في قاعدة البيانات يظهر السعر القديم أحيانًا لدقائق، رغم أننا نحذف الكاش. ما السبب المحتمل؟', 'After a price update the old price sometimes shows for minutes, even though we delete the cache. Likely cause?', 'Fiyat güncellemesinden sonra, önbelleği silsek de eski fiyat bazen dakikalarca görünüyor. Olası neden?'),
    options: L3(
      ['قراءة متزامنة أعادت كتابة القيمة القديمة في الكاش بعد الحذف؛ احذف بعد COMMIT وأضف TTL قصير أو رقم نسخة', 'Redis معطّل', 'المتصفح لا يدعم الكاش', 'المشكلة في الفهرس'],
      ['A concurrent read put the old value back into the cache after the delete; delete after COMMIT and add a short TTL or a version number', 'Redis is broken', 'The browser does not support caching', 'An index problem'],
      ['Eşzamanlı bir okuma silmeden sonra eski değeri önbelleğe geri yazdı; COMMIT’ten sonra sil, kısa TTL ya da sürüm numarası ekle', 'Redis bozuk', 'Tarayıcı önbelleği desteklemiyor', 'İndeks sorunu'],
    ), answer: 0,
    why: W('قارئ قرأ السعر القديم قبل الـ COMMIT ثم كتبه في الكاش بعد الحذف. الحذف المتأخر أو المفاتيح بنسخة تقلل هذه النافذة، والـ TTL يحدّ من مدتها.', 'A reader fetched the old price before the COMMIT and wrote it to the cache after the delete. Delayed deletes or versioned keys narrow that window; a TTL bounds it.', 'Bir okuyucu COMMIT’ten önce eski fiyatı okuyup silmeden sonra önbelleğe yazdı. Gecikmeli silme ya da sürümlü anahtarlar bu pencereyi daraltır; TTL süresini sınırlar.') }),
  choice({ id: 'ar-s2-slo', level: 'senior', topic,
    prompt: W('هدف الخدمة (SLO) توفّر 99.9% شهريًا. ماذا يعني «ميزانية الأخطاء»؟', 'The service SLO is 99.9% availability per month. What is the "error budget"?', 'Servisin SLO’su aylık %99,9 erişilebilirlik. "Hata bütçesi" nedir?'),
    options: L3(
      ['حوالي 43 دقيقة توقف مسموحة شهريًا؛ إذا استُهلكت نخفف المخاطرة ونركز على الاستقرار', 'المال المخصص لإصلاح الأخطاء', 'عدد الأخطاء المسموح في الكود', 'مدة الاختبارات'],
      ['About 43 minutes of allowed downtime a month; when it is spent, we slow risky changes and focus on stability', 'Money set aside to fix bugs', 'The number of bugs allowed in code', 'How long tests take'],
      ['Ayda yaklaşık 43 dakikalık izinli kesinti; harcanınca riskli değişiklikler yavaşlar ve istikrara odaklanılır', 'Hata düzeltmeye ayrılan para', 'Kodda izin verilen hata sayısı', 'Testlerin süresi'],
    ), answer: 0,
    why: W('0.1% من 30 يومًا ≈ 43 دقيقة. الميزانية تحوّل نقاش «السرعة مقابل الاستقرار» إلى رقم يتفق عليه الفريق.', '0.1% of 30 days ≈ 43 minutes. The budget turns the "speed versus stability" debate into a number the team agrees on.', '30 günün %0,1’i ≈ 43 dakika. Bütçe, "hız mı istikrar mı" tartışmasını ekibin üzerinde anlaştığı bir sayıya çevirir.') }),
  choice({ id: 'ar-s2-bulkhead', level: 'senior', topic,
    prompt: W('خدمة التقارير البطيئة تستهلك كل اتصالات قاعدة البيانات، فتتوقف صفحات الشراء أيضًا. ما النمط؟', 'The slow reporting service uses up every database connection, so checkout pages stop too. Which pattern?', 'Yavaş raporlama servisi tüm veritabanı bağlantılarını tüketiyor ve ödeme sayfaları da duruyor. Hangi kalıp?'),
    options: ['Bulkhead', 'Singleton', 'Observer', 'Decorator'], answer: 0,
    why: W('الـ Bulkhead يعزل الموارد: pool اتصالات منفصل (أو replica) للتقارير، فلا يُغرق جزء واحد بقية النظام.', 'A bulkhead isolates resources: a separate connection pool (or a replica) for reports, so one part cannot sink the rest.', 'Bulkhead kaynakları izole eder: raporlar için ayrı bir bağlantı havuzu (ya da replica); bir parça diğerlerini batıramaz.') }),
  choice({ id: 'ar-s2-consistent-hashing', level: 'senior', topic,
    prompt: W('ما ميزة Consistent Hashing عند توزيع المفاتيح على خوادم الكاش؟', 'What does consistent hashing give you when spreading keys over cache servers?', 'Önbellek sunucularına anahtar dağıtırken consistent hashing ne sağlar?'),
    options: L3(
      ['إضافة خادم أو حذفه ينقل جزءًا صغيرًا من المفاتيح فقط', 'تشفير المفاتيح', 'ترتيب المفاتيح أبجديًا', 'نسخ كل المفاتيح على كل خادم'],
      ['Adding or removing a server moves only a small share of the keys', 'It encrypts the keys', 'It sorts keys alphabetically', 'Every key is copied to every server'],
      ['Sunucu ekleyip çıkarmak anahtarların yalnızca küçük bir kısmını taşır', 'Anahtarları şifreler', 'Anahtarları alfabetik sıralar', 'Her anahtar her sunucuya kopyalanır'],
    ), answer: 0,
    why: W('الخوادم والمفاتيح على حلقة واحدة، وكل مفتاح يذهب لأقرب خادم بعده. ومع «عقد افتراضية» يتوزع الحمل بالتساوي.', 'Servers and keys sit on one ring, and each key goes to the next server along it. With virtual nodes the load spreads evenly.', 'Sunucular ve anahtarlar tek bir halkadadır; her anahtar ondan sonraki ilk sunucuya gider. Sanal düğümlerle yük eşit dağılır.') }),
]
