import type { Question } from '#shared/types/quiz'
import { choice, output, WHAT_ORDER } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const topic = 'browser' as const

export const BROWSER_2: Question[] = [
  // ───────── Junior ─────────
  output({ id: 'b-j2-same-listener', level: 'junior', topic,
    code: `const button = new EventTarget()
let clicks = 0
function onClick() { clicks++ }
button.addEventListener('click', onClick)
button.addEventListener('click', onClick)
button.dispatchEvent(new Event('click'))
console.log(clicks)`,
    options: ['1', '2', '0', 'Error'], answer: 0,
    why: W('إضافة نفس الدالة لنفس الحدث مرتين تُتجاهل. أما دالتان مختلفتان (حتى لو بنفس الكود) فتعملان معًا.', 'Adding the same function for the same event twice is ignored. Two different functions (even with identical code) would both run.', 'Aynı olay için aynı fonksiyonu iki kez eklemek yok sayılır. İki farklı fonksiyon (kodu aynı olsa bile) ikisi de çalışır.') }),
  output({ id: 'b-j2-once', level: 'junior', topic,
    code: `const form = new EventTarget()
let sent = 0
form.addEventListener('submit', () => sent++, { once: true })
form.dispatchEvent(new Event('submit'))
form.dispatchEvent(new Event('submit'))
console.log(sent)`,
    options: ['1', '2', '0', 'undefined'], answer: 0,
    why: W('{ once: true } يزيل المستمع تلقائيًا بعد أول تشغيل، مفيد لمنع الإرسال المزدوج.', '{ once: true } removes the listener automatically after its first run, handy against double submits.', '{ once: true } dinleyiciyi ilk çalışmadan sonra otomatik kaldırır; çift gönderime karşı kullanışlı.') }),
  output({ id: 'b-j2-url-parts', level: 'junior', topic,
    code: `const u = new URL('https://shop.com:8080/products?id=7#reviews')
console.log(u.hostname, u.port, u.pathname, u.hash)`,
    options: ['shop.com 8080 /products #reviews', 'shop.com:8080 8080 /products?id=7 reviews', 'https://shop.com 8080 /products #reviews', 'shop.com 80 /products #reviews'], answer: 0,
    why: W('كائن URL يقسّم الرابط بدقة بدل قصّه يدويًا بالنصوص.', 'The URL object splits a link precisely instead of cutting strings by hand.', 'URL nesnesi bağlantıyı metinleri elle kesmek yerine doğru biçimde böler.') }),
  choice({ id: 'b-j2-hash-server', level: 'junior', topic,
    prompt: W('عند فتح https://site.com/page#faq، هل يصل «#faq» إلى الخادم؟', 'When opening https://site.com/page#faq, does "#faq" reach the server?', 'https://site.com/page#faq açılınca "#faq" sunucuya ulaşır mı?'),
    options: L3(['لا، الجزء بعد # يبقى في المتصفح فقط', 'نعم، دائمًا', 'نعم، في الكوكيز', 'فقط مع HTTPS'],
      ['No, the part after # stays in the browser', 'Yes, always', 'Yes, in the cookies', 'Only over HTTPS'],
      ['Hayır, # sonrası yalnızca tarayıcıda kalır', 'Evet, her zaman', 'Evet, çerezlerde', 'Sadece HTTPS ile']), answer: 0,
    why: W('يستخدمه المتصفح للتمرير إلى العنصر الذي يحمل id="faq"، وتستخدمه بعض التطبيقات للتوجيه داخل الصفحة.', 'The browser uses it to scroll to the element with id="faq"; some apps use it for in-page routing.', 'Tarayıcı onu id="faq" olan öğeye kaydırmak için kullanır; bazı uygulamalar sayfa içi yönlendirme için kullanır.') }),
  choice({ id: 'b-j2-network-tab', level: 'junior', topic,
    prompt: W('زر «حفظ» لا يعمل ولا يظهر خطأ. أين ترى إن كان الطلب للخادم قد أُرسل ونتيجته؟', 'The "Save" button does nothing and shows no error. Where do you see whether the request was sent and how it went?', '"Kaydet" butonu çalışmıyor ve hata göstermiyor. İsteğin gönderilip gönderilmediğini ve sonucunu nerede görürsün?'),
    options: L3(['تبويب Network في أدوات المطور', 'تبويب Elements', 'سجل المتصفح', 'إعدادات المتصفح'],
      ['The Network tab in DevTools', 'The Elements tab', 'The browser history', 'Browser settings'],
      ['Geliştirici araçlarındaki Network sekmesi', 'Elements sekmesi', 'Tarayıcı geçmişi', 'Tarayıcı ayarları']), answer: 0,
    why: W('يُظهر كل طلب ورمز حالته وجسمه والرد ووقته. وConsole تُظهر أخطاء JavaScript.', 'It shows every request with its status, body, response and timing. Console shows JavaScript errors.', 'Her isteği durum kodu, gövdesi, yanıtı ve süresiyle gösterir. Console JavaScript hatalarını gösterir.') }),
  choice({ id: 'b-j2-localstorage-life', level: 'junior', topic,
    prompt: W('متى تُحذف البيانات المحفوظة في localStorage؟', 'When is data saved in localStorage removed?', 'localStorage’a kaydedilen veri ne zaman silinir?'),
    options: L3(['تبقى حتى يحذفها الكود أو يمسح المستخدم بيانات الموقع', 'عند إغلاق التبويب', 'بعد 24 ساعة', 'عند إعادة تحميل الصفحة'],
      ['It stays until the code removes it or the user clears site data', 'When the tab closes', 'After 24 hours', 'On page reload'],
      ['Kod silene ya da kullanıcı site verisini temizleyene kadar kalır', 'Sekme kapanınca', '24 saat sonra', 'Sayfa yenilenince']), answer: 0,
    why: W('وهي لكل نطاق على حدة، وتخزّن نصوصًا فقط، ويمكن لأي سكربت في الصفحة قراءتها؛ فلا تضع فيها أسرارًا.', 'It is per origin, stores strings only, and any script on the page can read it, so keep secrets out of it.', 'Köken başınadır, yalnızca metin saklar ve sayfadaki her script okuyabilir; içine sır koyma.') }),
  choice({ id: 'b-j2-queryselector', level: 'junior', topic,
    prompt: W('ماذا يُرجع document.querySelector(\'.item\')؟', 'What does document.querySelector(\'.item\') return?', 'document.querySelector(\'.item\') ne döndürür?'),
    options: L3(['أول عنصر يطابق، أو null إن لم يوجد', 'كل العناصر المطابقة', 'عدد العناصر', 'مصفوفة فارغة إن لم يوجد'],
      ['The first matching element, or null if none', 'Every matching element', 'The number of elements', 'An empty array if none'],
      ['Eşleşen ilk öğe, yoksa null', 'Eşleşen tüm öğeler', 'Öğe sayısı', 'Yoksa boş dizi']), answer: 0,
    why: W('لكل العناصر استخدم querySelectorAll، الذي يُرجع NodeList يمكن المرور عليه بـ forEach.', 'For every match use querySelectorAll, which returns a NodeList you can loop with forEach.', 'Tüm eşleşmeler için querySelectorAll kullan; forEach ile dolaşılabilen bir NodeList döndürür.') }),
  choice({ id: 'b-j2-hard-reload', level: 'junior', topic,
    prompt: W('عدّلت ملف CSS لكن المتصفح ما زال يعرض النسخة القديمة. ما أول ما تجربه؟', 'You changed a CSS file but the browser still shows the old version. What do you try first?', 'Bir CSS dosyasını değiştirdin ama tarayıcı hâlâ eskisini gösteriyor. İlk ne denersin?'),
    options: L3(['إعادة تحميل كاملة تتجاوز الكاش (Ctrl+Shift+R أو Cmd+Shift+R)', 'إعادة تشغيل الحاسوب', 'تغيير المتصفح', 'حذف الملف'],
      ['A hard reload that bypasses the cache (Ctrl+Shift+R or Cmd+Shift+R)', 'Restart the computer', 'Switch browsers', 'Delete the file'],
      ['Önbelleği atlayan tam yenileme (Ctrl+Shift+R veya Cmd+Shift+R)', 'Bilgisayarı yeniden başlatmak', 'Tarayıcı değiştirmek', 'Dosyayı silmek']), answer: 0,
    why: W('في الإنتاج يُحل هذا بإضافة hash لاسم الملف مع كل بناء (app.3f2a.css)، فيأخذ المستخدمون النسخة الجديدة تلقائيًا.', 'In production this is solved by adding a hash to the file name on each build (app.3f2a.css), so users get the new version automatically.', 'Canlıda bu, her derlemede dosya adına hash eklenerek çözülür (app.3f2a.css); kullanıcılar yeni sürümü otomatik alır.') }),
  choice({ id: 'b-j2-domcontentloaded', level: 'junior', topic,
    prompt: W('ما الفرق بين DOMContentLoaded وload؟', 'What is the difference between DOMContentLoaded and load?', 'DOMContentLoaded ile load arasındaki fark nedir?'),
    options: L3(['DOMContentLoaded عند جاهزية HTML، وload بعد تحميل كل الصور والملفات أيضًا', 'لا فرق', 'load يحدث أولًا دائمًا', 'DOMContentLoaded للصور فقط'],
      ['DOMContentLoaded fires when the HTML is ready; load waits for every image and file too', 'No difference', 'load always fires first', 'DOMContentLoaded is for images only'],
      ['DOMContentLoaded HTML hazır olunca, load ise tüm resim ve dosyalar da yüklenince tetiklenir', 'Fark yok', 'load her zaman önce gelir', 'DOMContentLoaded sadece resimler için']), answer: 0,
    why: W('معظم الكود يحتاج DOM فقط. وسكربتات defer تعمل قبل DOMContentLoaded مباشرة.', 'Most code only needs the DOM. defer scripts run just before DOMContentLoaded.', 'Kodun çoğu yalnızca DOM’a ihtiyaç duyar. defer script’leri DOMContentLoaded’dan hemen önce çalışır.') }),
  choice({ id: 'b-j2-device-mode', level: 'junior', topic,
    prompt: W('كيف تجرب شكل الموقع على شاشة جوال من الحاسوب بسرعة؟', 'How do you quickly check how the site looks on a phone screen from your computer?', 'Sitenin telefon ekranında nasıl göründüğünü bilgisayardan hızlıca nasıl denersin?'),
    options: L3(['وضع الأجهزة في أدوات المطور (Ctrl+Shift+M)', 'تصغير نافذة المتصفح فقط', 'تغيير دقة الشاشة', 'لا يمكن ذلك'],
      ['Device mode in DevTools (Ctrl+Shift+M)', 'Just shrinking the browser window', 'Changing the screen resolution', 'It is impossible'],
      ['Geliştirici araçlarındaki cihaz modu (Ctrl+Shift+M)', 'Sadece tarayıcı penceresini küçültmek', 'Ekran çözünürlüğünü değiştirmek', 'Mümkün değil']), answer: 0,
    why: W('يحاكي حجم الشاشة واللمس وبطء الشبكة، لكن جرّب على جهاز حقيقي قبل الإطلاق.', 'It simulates screen size, touch and slow networks, but test on a real device before launch.', 'Ekran boyutunu, dokunmayı ve yavaş ağı taklit eder; yine de yayından önce gerçek cihazda dene.') }),
  choice({ id: 'b-j2-same-origin', level: 'junior', topic,
    prompt: W('أي رابط من «نفس الأصل» (same origin) مع https://shop.com؟', 'Which URL has the same origin as https://shop.com?', 'Hangi URL https://shop.com ile aynı kökene (same origin) sahip?'),
    options: ['https://shop.com/cart', 'http://shop.com', 'https://api.shop.com', 'https://shop.com:8443'], answer: 0,
    why: W('الأصل = البروتوكول + النطاق + المنفذ. تغيّر أي جزء (http، نطاق فرعي، منفذ) يجعله أصلًا مختلفًا.', 'Origin = scheme + host + port. Changing any part (http, a subdomain, a port) makes it a different origin.', 'Köken = şema + alan + port. Herhangi biri değişirse (http, alt alan, port) farklı bir köken olur.') }),
  choice({ id: 'b-j2-textcontent', level: 'junior', topic,
    prompt: W('تعرض اسم المستخدم القادم من الخادم في الصفحة. أي طريقة آمنة؟', 'You show a username from the server on the page. Which way is safe?', 'Sunucudan gelen kullanıcı adını sayfada gösteriyorsun. Hangi yol güvenli?'),
    options: ['el.textContent = user.name', 'el.innerHTML = user.name', 'document.write(user.name)', 'el.outerHTML = user.name'], answer: 0,
    why: W('textContent يضع النص كما هو، أما innerHTML فينفّذ أي HTML فيه، فيصبح الاسم «<img onerror=…>» هجوم XSS.', 'textContent inserts plain text; innerHTML parses any HTML, so a name like "<img onerror=…>" becomes an XSS attack.', 'textContent düz metin ekler; innerHTML içindeki HTML’i çalıştırır, "<img onerror=…>" gibi bir ad XSS saldırısına dönüşür.') }),
  choice({ id: 'b-j2-lighthouse', level: 'junior', topic,
    prompt: W('ماذا يقيس Lighthouse في أدوات Chrome؟', 'What does Lighthouse in Chrome DevTools measure?', 'Chrome geliştirici araçlarındaki Lighthouse neyi ölçer?'),
    options: L3(['الأداء وإمكانية الوصول وأفضل الممارسات وSEO، مع اقتراحات للإصلاح', 'عدد الزوار', 'سرعة الإنترنت لديك فقط', 'أخطاء الخادم'],
      ['Performance, accessibility, best practices and SEO, with suggestions to fix', 'Visitor numbers', 'Only your internet speed', 'Server errors'],
      ['Performans, erişilebilirlik, en iyi uygulamalar ve SEO; düzeltme önerileriyle', 'Ziyaretçi sayısı', 'Sadece internet hızın', 'Sunucu hataları']), answer: 0,
    why: W('نتيجته مختبرية على جهازك؛ الأرقام الحقيقية للمستخدمين تأتي من بيانات Core Web Vitals الميدانية.', 'Its score is a lab result on your machine; real user numbers come from field Core Web Vitals data.', 'Puanı kendi makinendeki bir laboratuvar sonucudur; gerçek kullanıcı sayıları sahadaki Core Web Vitals verilerinden gelir.') }),
  choice({ id: 'b-j2-dns-first', level: 'junior', topic,
    prompt: W('كتبت example.com في المتصفح. ما أول خطوة قبل طلب الصفحة؟', 'You type example.com in the browser. What is the first step before requesting the page?', 'Tarayıcıya example.com yazdın. Sayfayı istemeden önceki ilk adım nedir?'),
    options: L3(['البحث عن عنوان IP للنطاق عبر DNS', 'رسم الصفحة', 'تنزيل CSS', 'تشغيل JavaScript'],
      ['Looking up the domain’s IP address through DNS', 'Painting the page', 'Downloading the CSS', 'Running JavaScript'],
      ['DNS ile alan adının IP adresini bulmak', 'Sayfayı çizmek', 'CSS indirmek', 'JavaScript çalıştırmak']), answer: 0,
    why: W('بعدها: اتصال TCP وTLS، ثم طلب HTML، ثم تحليله وتنزيل CSS وJS، ثم الرسم.', 'Then: a TCP and TLS connection, the HTML request, parsing and fetching CSS and JS, then painting.', 'Ardından: TCP ve TLS bağlantısı, HTML isteği, ayrıştırma ve CSS ile JS indirme, sonra çizim.') }),

  // ───────── Mid ─────────
  output({ prompt: WHAT_ORDER, id: 'b-m2-stop-immediate', level: 'mid', topic,
    code: `const btn = new EventTarget()
btn.addEventListener('click', e => { console.log('first'); e.stopImmediatePropagation() })
btn.addEventListener('click', () => console.log('second'))
btn.dispatchEvent(new Event('click'))`,
    options: ['first', 'first, second', 'second', 'second, first'], answer: 0,
    why: W('stopImmediatePropagation يوقف بقية المستمعين على نفس العنصر أيضًا، أما stopPropagation فيوقف الصعود للآباء فقط.', 'stopImmediatePropagation also stops the remaining listeners on the same element; stopPropagation only stops bubbling to parents.', 'stopImmediatePropagation aynı öğedeki kalan dinleyicileri de durdurur; stopPropagation yalnızca üst öğelere kabarmayı durdurur.') }),
  output({ id: 'b-m2-signal-remove', level: 'mid', topic,
    code: `const win = new EventTarget()
const ac = new AbortController()
let calls = 0
win.addEventListener('resize', () => calls++, { signal: ac.signal })
win.addEventListener('scroll', () => calls++, { signal: ac.signal })
ac.abort()
win.dispatchEvent(new Event('resize'))
win.dispatchEvent(new Event('scroll'))
console.log(calls)`,
    options: ['0', '2', '1', 'Error'], answer: 0,
    why: W('signal يزيل كل المستمعين المرتبطين به بسطر واحد، مثالي لتنظيف المكوّنات بدل removeEventListener لكل واحد.', 'A signal removes every listener tied to it in one line, ideal for component cleanup instead of removeEventListener for each.', 'Bir signal kendisine bağlı tüm dinleyicileri tek satırda kaldırır; her biri için removeEventListener yerine bileşen temizliği için ideal.') }),
  output({ id: 'b-m2-custom-event', level: 'mid', topic,
    code: `const cart = new EventTarget()
cart.addEventListener('added', e => console.log(e.detail.name, e.detail.qty))
cart.dispatchEvent(new CustomEvent('added', { detail: { name: 'Book', qty: 2 } }))`,
    options: ['Book 2', 'undefined undefined', '[object Object]', 'Error'], answer: 0,
    why: W('CustomEvent يحمل بيانات في detail. مفيد لتواصل أجزاء الصفحة أو Web Components دون ربط مباشر.', 'CustomEvent carries data in detail. Useful for parts of a page or Web Components to talk without tight coupling.', 'CustomEvent veriyi detail içinde taşır. Sayfa parçalarının ya da Web Components’in sıkı bağ olmadan konuşması için faydalı.') }),
  output({ id: 'b-m2-bytes', level: 'mid', topic,
    code: `const text = 'سلام'
console.log(text.length, new TextEncoder().encode(text).length)`,
    options: ['4 8', '4 4', '8 8', '4 16'], answer: 0,
    why: W('الحرف العربي يأخذ بايتين في UTF-8. حدود الحجم (مثل الكوكيز 4KB أو أعمدة القاعدة) تُحسب بالبايت لا بعدد الحروف.', 'An Arabic letter takes two bytes in UTF-8. Size limits (like 4 KB cookies or database columns) count bytes, not characters.', 'Arapça bir harf UTF-8’de iki bayt tutar. Boyut sınırları (4 KB çerezler ya da veritabanı sütunları gibi) karakteri değil baytı sayar.') }),
  output({ id: 'b-m2-structured-clone-map', level: 'mid', topic,
    code: `const prefs = new Map([['theme', 'dark']])
console.log(structuredClone(prefs).get('theme'), JSON.stringify(prefs))`,
    options: ['dark {}', 'dark {"theme":"dark"}', 'undefined {}', 'Error'], answer: 0,
    why: W('JSON لا يعرف Map وSet وDate كما هي، أما structuredClone فينسخها. وهي نفس الخوارزمية التي يستخدمها postMessage وIndexedDB.', 'JSON does not understand Map, Set or Date as such; structuredClone copies them. It is the same algorithm postMessage and IndexedDB use.', 'JSON Map, Set ve Date’i olduğu gibi anlamaz; structuredClone kopyalar. postMessage ve IndexedDB de aynı algoritmayı kullanır.') }),
  choice({ id: 'b-m2-cookie-domain', level: 'mid', topic,
    prompt: W('تريد مشاركة كوكي الدخول بين shop.com وapi.shop.com. أي خاصية؟', 'You want the login cookie shared between shop.com and api.shop.com. Which attribute?', 'Giriş çerezinin shop.com ile api.shop.com arasında paylaşılmasını istiyorsun. Hangi öznitelik?'),
    options: ['Domain=shop.com', 'Path=/', 'SameSite=None', 'Secure'], answer: 0,
    why: W('بدون Domain يبقى الكوكي للنطاق الذي أنشأه فقط. ومع Domain يصل لكل النطاقات الفرعية، فاستخدمه عن قصد.', 'Without Domain the cookie stays with the exact host that set it. With Domain it reaches every subdomain, so use it deliberately.', 'Domain olmadan çerez yalnızca onu ayarlayan alanda kalır. Domain ile tüm alt alanlara gider; bilerek kullan.') }),
  choice({ id: 'b-m2-preload-prefetch', level: 'mid', topic,
    prompt: W('ما الفرق بين preload وprefetch؟', 'What is the difference between preload and prefetch?', 'preload ile prefetch arasındaki fark nedir?'),
    options: L3(['preload لملف تحتاجه الصفحة الحالية الآن، وprefetch لملف قد تحتاجه الصفحة التالية بأولوية منخفضة', 'لا فرق', 'prefetch أعلى أولوية', 'preload للصور فقط'],
      ['preload is for a file the current page needs now; prefetch is for one the next page may need, at low priority', 'No difference', 'prefetch has higher priority', 'preload is only for images'],
      ['preload mevcut sayfanın şimdi ihtiyaç duyduğu dosya, prefetch sonraki sayfanın ihtiyaç duyabileceği dosya içindir, düşük öncelikle', 'Fark yok', 'prefetch daha yüksek öncelikli', 'preload sadece resimler için']), answer: 0,
    why: W('preload لملف لا يُكتشف مبكرًا مثل خط داخل CSS. والإفراط فيه يزاحم الملفات الأهم.', 'preload suits a file discovered late, like a font referenced inside CSS. Overusing it crowds out more important files.', 'preload, CSS içindeki bir font gibi geç keşfedilen dosyaya uygundur. Fazla kullanmak daha önemli dosyaları sıkıştırır.') }),
  choice({ id: 'b-m2-layout-thrash', level: 'mid', topic,
    prompt: W('لماذا هذه الحلقة بطيئة جدًا؟', 'Why is this loop so slow?', 'Bu döngü neden bu kadar yavaş?'),
    code: `for (const el of items) {
  el.style.height = el.offsetHeight + 10 + 'px'
}`,
    options: L3(['القراءة ثم الكتابة في كل دورة تجبر المتصفح على حساب التخطيط من جديد كل مرة (layout thrashing)', 'style لا يقبل px', 'offsetHeight غير موجودة', 'for…of أبطأ من forEach'],
      ['Reading then writing each pass forces the browser to recompute layout every time (layout thrashing)', 'style does not accept px', 'offsetHeight does not exist', 'for…of is slower than forEach'],
      ['Her turda önce okuyup sonra yazmak tarayıcıyı her seferinde düzeni yeniden hesaplamaya zorlar (layout thrashing)', 'style px kabul etmez', 'offsetHeight yok', 'for…of, forEach’ten yavaş']), answer: 0,
    why: W('الحل: اقرأ كل القيم أولًا في حلقة، ثم اكتب كلها في حلقة ثانية، أو استخدم requestAnimationFrame.', 'The fix: read every value first in one loop, then write them all in a second loop, or use requestAnimationFrame.', 'Çözüm: önce tüm değerleri bir döngüde oku, sonra hepsini ikinci döngüde yaz ya da requestAnimationFrame kullan.') }),
  choice({ id: 'b-m2-indexeddb', level: 'mid', topic,
    prompt: W('تطبيق يحفظ 50MB من الصور والملاحظات للعمل دون إنترنت. أي تخزين؟', 'An app stores 50 MB of photos and notes to work offline. Which storage?', 'Çevrimdışı çalışmak için 50 MB fotoğraf ve not saklayan bir uygulama. Hangi depolama?'),
    options: ['IndexedDB', 'localStorage', 'Cookies', 'sessionStorage'], answer: 0,
    why: W('localStorage محدود بحوالي 5MB، ونصوص فقط، ومتزامن فيوقف الصفحة. IndexedDB غير متزامن ويخزن ملفات وكائنات بأحجام كبيرة.', 'localStorage is limited to about 5 MB, strings only, and synchronous, so it blocks the page. IndexedDB is async and stores files and objects at large sizes.', 'localStorage yaklaşık 5 MB, yalnızca metin ve senkrondur; sayfayı bloklar. IndexedDB asenkrondur ve büyük boyutlarda dosya ve nesne saklar.') }),
  choice({ id: 'b-m2-storage-event', level: 'mid', topic,
    prompt: W('المستخدم سجّل خروجه في تبويب، وتريد أن تعرف بقية التبويبات فورًا. ما الطريقة البسيطة؟', 'The user logged out in one tab and you want the other tabs to know right away. A simple way?', 'Kullanıcı bir sekmede çıkış yaptı ve diğer sekmelerin hemen bilmesini istiyorsun. Basit bir yol?'),
    options: {

      ar: ["window.addEventListener('storage', …) عند تغيير localStorage", 'setInterval يقرأ الكوكيز كل ثانية', 'لا يمكن', 'إعادة تحميل كل التبويبات من الخادم'],

      en: ["window.addEventListener('storage', …) when localStorage changes", 'setInterval reading cookies every second', 'Not possible', 'Reload all tabs from the server'],

      tr: ["localStorage değişince window.addEventListener('storage', …)", 'Her saniye çerez okuyan setInterval', 'Mümkün değil', 'Tüm sekmeleri sunucudan yenilemek'],

    }, answer: 0, codeLang: 'js',
    why: W('حدث storage يصل للتبويبات الأخرى من نفس الأصل عند تغيير localStorage. وBroadcastChannel بديل أوضح للرسائل.', 'The storage event fires in other same-origin tabs when localStorage changes. BroadcastChannel is a clearer option for messages.', 'localStorage değişince storage olayı aynı kökenden diğer sekmelerde tetiklenir. Mesajlar için BroadcastChannel daha net bir seçenektir.') }),
  choice({ id: 'b-m2-immutable-cache', level: 'mid', topic,
    prompt: W('ملفات JS باسم فيه hash مثل app.3f2a.js. ما أفضل ترويسة كاش لها؟', 'JS files have a hash in the name, like app.3f2a.js. The best cache header for them?', 'JS dosyalarının adında hash var, app.3f2a.js gibi. Onlar için en iyi önbellek başlığı?'),
    options: ['Cache-Control: public, max-age=31536000, immutable', 'Cache-Control: no-store', 'Cache-Control: max-age=60', 'Expires: 0'], answer: 0,
    why: W('أي تغيير ينتج اسمًا جديدًا، فيمكن حفظ القديم سنة كاملة. أما ملف HTML نفسه فيجب ألا يُحفظ طويلًا ليشير للأسماء الجديدة.', 'Any change produces a new name, so the old file can be cached for a year. The HTML itself must not be cached long, so it points to the new names.', 'Her değişiklik yeni bir ad üretir; eski dosya bir yıl önbellekte kalabilir. HTML’in kendisi uzun süre önbelleğe alınmamalı ki yeni adları göstersin.') }),
  choice({ id: 'b-m2-crp', level: 'mid', topic,
    prompt: W('ما الترتيب الصحيح لخطوات رسم الصفحة في المتصفح؟', 'What is the correct order of the browser’s rendering steps?', 'Tarayıcının sayfa çizim adımlarının doğru sırası nedir?'),
    options: ['DOM + CSSOM → Render tree → Layout → Paint → Composite', 'Paint → Layout → DOM → CSSOM', 'Layout → DOM → Paint → CSSOM', 'CSSOM → Paint → DOM → Layout'], answer: 0,
    why: W('تغيير العرض يعيد Layout وما بعده، وتغيير اللون يعيد Paint فقط، وtransform وopacity تكتفي بـ Composite وهي الأرخص.', 'Changing width reruns Layout and onward, changing colour reruns Paint only, and transform and opacity need only Composite, the cheapest.', 'Genişliği değiştirmek Layout’u ve sonrasını, rengi değiştirmek yalnızca Paint’i yeniden çalıştırır; transform ve opacity yalnızca Composite ister, en ucuzu.') }),
  choice({ id: 'b-m2-visibility', level: 'mid', topic,
    prompt: W('صفحة تسأل الخادم كل 5 ثوانٍ حتى لو كان التبويب مخفيًا. كيف توقفه في الخلفية؟', 'A page polls the server every 5 seconds even when the tab is hidden. How do you pause it in the background?', 'Bir sayfa sekme gizliyken bile sunucuyu her 5 saniyede yokluyor. Arka planda nasıl durdurursun?'),
    options: ["document.addEventListener('visibilitychange', () => document.hidden ? stop() : start())", "window.addEventListener('blur', stop)", "window.onunload = stop", "setInterval(fn, 0)"], answer: 0, codeLang: 'js',
    why: W('Page Visibility API يعرف إن كانت الصفحة ظاهرة فعلًا. blur يحدث أيضًا عند الضغط على نافذة أخرى والصفحة ما زالت ظاهرة.', 'The Page Visibility API knows whether the page is actually visible. blur also fires when another window is clicked while the page is still visible.', 'Page Visibility API sayfanın gerçekten görünür olup olmadığını bilir. blur, sayfa hâlâ görünürken başka pencereye tıklanınca da tetiklenir.') }),

  // ───────── Senior ─────────
  output({ prompt: WHAT_ORDER, id: 'b-s2-dispatch-sync', level: 'senior', topic,
    code: `const el = new EventTarget()
el.addEventListener('custom', () => console.log('handler'))
console.log('before')
el.dispatchEvent(new Event('custom'))
console.log('after')`,
    options: ['before, handler, after', 'before, after, handler', 'handler, before, after', 'before, after'], answer: 0,
    why: W('dispatchEvent متزامن: المستمعون يعملون فورًا قبل السطر التالي، على عكس الأحداث التي يطلقها المتصفح من نقرات المستخدم.', 'dispatchEvent is synchronous: listeners run immediately, before the next line, unlike events the browser fires from user clicks.', 'dispatchEvent senkrondur: dinleyiciler bir sonraki satırdan önce hemen çalışır; kullanıcı tıklamalarından tarayıcının tetiklediği olayların aksine.') }),
  choice({ id: 'b-s2-broadcast', level: 'senior', topic,
    prompt: W('تريد أن تتواصل تبويبات نفس الموقع مباشرة (مثلًا: تحديث السلة في كلها). ما الواجهة المخصصة لذلك؟', 'You want tabs of the same site to talk directly (say, update the cart in all of them). Which API is built for that?', 'Aynı sitenin sekmelerinin doğrudan konuşmasını istiyorsun (ör. sepeti hepsinde güncellemek). Bunun için hangi API var?'),
    options: ["new BroadcastChannel('cart')", 'window.postMessage', 'WebSocket', 'SharedArrayBuffer'], answer: 0,
    why: W('BroadcastChannel يرسل رسائل لكل السياقات من نفس الأصل (تبويبات، iframes، workers) دون خادم.', 'BroadcastChannel sends messages to every same-origin context (tabs, iframes, workers) with no server involved.', 'BroadcastChannel aynı kökenli tüm bağlamlara (sekmeler, iframe’ler, worker’lar) sunucusuz mesaj gönderir.') }),
  choice({ id: 'b-s2-swr', level: 'senior', topic,
    prompt: W('في Service Worker، ماذا تعني استراتيجية stale-while-revalidate؟', 'In a Service Worker, what does the stale-while-revalidate strategy mean?', 'Service Worker’da stale-while-revalidate stratejisi ne demektir?'),
    options: L3(['الرد فورًا من الكاش، وتحديثه من الشبكة في الخلفية للمرة القادمة', 'الشبكة دائمًا والكاش عند الفشل فقط', 'الكاش دائمًا بلا تحديث', 'منع الكاش'],
      ['Answer from the cache immediately and refresh it from the network in the background for next time', 'Always the network, cache only on failure', 'Always the cache, never refreshed', 'No caching'],
      ['Hemen önbellekten yanıtla ve bir dahaki sefer için arka planda ağdan güncelle', 'Her zaman ağ, sadece hata olursa önbellek', 'Her zaman önbellek, hiç güncelleme yok', 'Önbellek yok']), answer: 0,
    why: W('سريع جدًا ومقبول لمحتوى يتحمل أن يكون قديمًا قليلًا (صور، قوائم). أما البيانات الحساسة فالشبكة أولًا.', 'Very fast and fine for content that can be slightly stale (images, lists). Sensitive data goes network-first.', 'Çok hızlıdır ve biraz eski olabilecek içerik (resimler, listeler) için uygundur. Hassas veri önce ağdan gelir.') }),
  choice({ id: 'b-s2-coop-coep', level: 'senior', topic,
    prompt: W('ما المطلوب لاستخدام SharedArrayBuffer في المتصفح؟', 'What is required to use SharedArrayBuffer in the browser?', 'Tarayıcıda SharedArrayBuffer kullanmak için ne gerekir?'),
    options: ['Cross-Origin-Opener-Policy: same-origin + Cross-Origin-Embedder-Policy: require-corp', 'Access-Control-Allow-Origin: *', 'Content-Security-Policy: default-src *', 'Strict-Transport-Security'], answer: 0,
    why: W('بعد ثغرات Spectre أصبح «العزل عبر الأصول» شرطًا للميزات التي تسمح بقياس الوقت بدقة عالية.', 'Since the Spectre attacks, cross-origin isolation is required for features that allow high-precision timing.', 'Spectre saldırılarından beri yüksek hassasiyetli zamanlamaya izin veren özellikler için kökenler arası izolasyon zorunludur.') }),
  choice({ id: 'b-s2-chips', level: 'senior', topic,
    prompt: W('ودجت دردشة مضمّن في مواقع عملائك يعتمد على كوكي طرف ثالث، والمتصفحات تحجبها. ما الحل القياسي؟', 'A chat widget embedded on your clients’ sites relies on a third-party cookie, and browsers block it. The standard fix?', 'Müşterilerinin sitelerine gömülü bir sohbet bileşeni üçüncü taraf çereze dayanıyor ve tarayıcılar engelliyor. Standart çözüm?'),
    options: {

      ar: ['Set-Cookie: …; Secure; SameSite=None; Partitioned', 'SameSite=Strict', 'تخزين الكوكي في localStorage للموقع الأم', 'Domain=.com'],

      en: ['Set-Cookie: …; Secure; SameSite=None; Partitioned', 'SameSite=Strict', 'Store it in the host page’s localStorage', 'Domain=.com'],

      tr: ['Set-Cookie: …; Secure; SameSite=None; Partitioned', 'SameSite=Strict', 'Ana sayfanın localStorage’ında saklamak', 'Domain=.com'],

    }, answer: 0,
    why: W('الكوكي المقسّم (CHIPS) يُحفظ بشكل منفصل لكل موقع مضيف، فيعمل الودجت دون تتبع المستخدم عبر المواقع.', 'A partitioned cookie (CHIPS) is stored separately per host site, so the widget works without tracking users across sites.', 'Bölümlenmiş çerez (CHIPS) her ana site için ayrı saklanır; bileşen kullanıcıyı siteler arası izlemeden çalışır.') }),
  choice({ id: 'b-s2-speculation', level: 'senior', topic,
    prompt: W('ماذا يفعل هذا الكود في Chrome؟', 'What does this code do in Chrome?', 'Bu kod Chrome’da ne yapar?'),
    code: `<script type="speculationrules">
{ "prerender": [{ "where": { "href_matches": "/product/*" }, "eagerness": "moderate" }] }
</script>`,
    options: L3(['يجهّز صفحات المنتجات مسبقًا في الخلفية عند المرور فوق رابطها، فتفتح فورًا', 'يمنع فتح صفحات المنتجات', 'يحمّل الصور فقط', 'يرسل بيانات للتحليلات'],
      ['Prerenders product pages in the background when their link is hovered, so they open instantly', 'Blocks product pages', 'Only loads images', 'Sends analytics data'],
      ['Bağlantının üzerine gelince ürün sayfalarını arka planda önceden çizer; anında açılırlar', 'Ürün sayfalarını engeller', 'Sadece resimleri yükler', 'Analitik verisi gönderir']), answer: 0,
    why: W('Speculation Rules تجعل التنقل شبه فوري، لكن الصفحة المجهزة تنفّذ كودها، فانتبه للتحليلات والعمليات ذات الأثر.', 'Speculation Rules make navigation near-instant, but a prerendered page runs its code, so watch analytics and side effects.', 'Speculation Rules gezinmeyi neredeyse anında yapar, ama önceden çizilen sayfa kodunu çalıştırır; analitiğe ve yan etkilere dikkat et.') }),
  choice({ id: 'b-s2-inp', level: 'senior', topic,
    prompt: W('ماذا يقيس مؤشر INP في Core Web Vitals؟', 'What does INP in Core Web Vitals measure?', 'Core Web Vitals’taki INP neyi ölçer?'),
    options: L3(['الزمن من تفاعل المستخدم (ضغطة أو كتابة) حتى يرسم المتصفح الإطار التالي، لأسوأ التفاعلات تقريبًا', 'سرعة تحميل أول صورة', 'تحرك العناصر أثناء التحميل', 'حجم ملفات JavaScript'],
      ['The time from a user interaction (click or key) until the next frame is painted, for roughly the worst interactions', 'How fast the first image loads', 'Elements shifting during load', 'JavaScript file size'],
      ['Kullanıcı etkileşiminden (tıklama veya tuş) bir sonraki karenin çizilmesine kadar geçen süre, yaklaşık en kötü etkileşimler için', 'İlk resmin yüklenme hızı', 'Yükleme sırasında öğelerin kayması', 'JavaScript dosya boyutu']), answer: 0,
    why: W('الحد الجيد أقل من 200ms. يسوء بسبب المهام الطويلة على الخيط الرئيسي، والحل تقسيمها وتأجيل غير الضروري.', 'A good score is under 200 ms. Long main-thread tasks make it worse; the fix is to split them and defer what is not needed.', 'İyi değer 200 ms’nin altıdır. Ana thread’deki uzun görevler onu kötüleştirir; çözüm bölmek ve gereksizi ertelemek.') }),
  choice({ id: 'b-s2-resize-observer', level: 'senior', topic,
    prompt: W('رسم بياني يجب أن يعيد حساب أبعاده عندما يتغير عرض حاويته (لا النافذة). ما الأداة؟', 'A chart must recompute its size when its container’s width changes (not the window’s). Which tool?', 'Bir grafik, pencerenin değil kapsayıcısının genişliği değişince boyutunu yeniden hesaplamalı. Hangi araç?'),
    options: ['ResizeObserver', "window.addEventListener('resize')", 'MutationObserver', 'IntersectionObserver'], answer: 0,
    why: W('الحاوية قد تتغير دون تغيّر النافذة (فتح شريط جانبي مثلًا). ResizeObserver يراقب عنصرًا محددًا بكفاءة.', 'The container can change without the window changing (a sidebar opening, say). ResizeObserver watches a specific element efficiently.', 'Kapsayıcı pencere değişmeden de değişebilir (ör. kenar çubuğu açılınca). ResizeObserver belirli bir öğeyi verimli izler.') }),
  choice({ id: 'b-s2-mutation-observer', level: 'senior', topic,
    prompt: W('سكربت طرف ثالث يضيف عناصر للصفحة وتريد معرفة متى تُضاف. ما الأداة؟', 'A third-party script adds elements to the page and you want to know when. Which tool?', 'Üçüncü taraf bir script sayfaya öğe ekliyor ve ne zaman eklendiğini bilmek istiyorsun. Hangi araç?'),
    options: {

      ar: ['MutationObserver', 'setInterval مع querySelector', 'ResizeObserver', "window.addEventListener('change')"],

      en: ['MutationObserver', 'setInterval with querySelector', 'ResizeObserver', "window.addEventListener('change')"],

      tr: ['MutationObserver', 'querySelector ile setInterval', 'ResizeObserver', "window.addEventListener('change')"],

    }, answer: 0,
    why: W('MutationObserver يُبلغك بتغييرات DOM (إضافة، حذف، خصائص) دفعةً واحدة بعد كل تغيير، دون فحص مستمر مكلف.', 'MutationObserver reports DOM changes (additions, removals, attributes) in batches, without costly constant polling.', 'MutationObserver DOM değişikliklerini (ekleme, silme, öznitelik) toplu bildirir; maliyetli sürekli yoklama gerekmez.') }),
  choice({ id: 'b-s2-sendbeacon', level: 'senior', topic,
    prompt: W('تريد إرسال مدة بقاء الزائر عند مغادرته الصفحة، وfetch العادي يُلغى أحيانًا. ما الأنسب؟', 'You want to send how long a visitor stayed when they leave, and a plain fetch sometimes gets cancelled. Best option?', 'Ziyaretçi ayrılırken ne kadar kaldığını göndermek istiyorsun ve normal fetch bazen iptal oluyor. En uygunu?'),
    options: {

      ar: ["navigator.sendBeacon('/api/track', data) في visibilitychange", "fetch داخل beforeunload", "alert قبل المغادرة", "XMLHttpRequest متزامن"],

      en: ["navigator.sendBeacon('/api/track', data) in visibilitychange", "fetch inside beforeunload", "alert before leaving", "A synchronous XMLHttpRequest"],

      tr: ["visibilitychange’de navigator.sendBeacon('/api/track', data)", "beforeunload içinde fetch", "Ayrılmadan önce alert", "Senkron XMLHttpRequest"],

    }, answer: 0, codeLang: 'js',
    why: W('sendBeacon يكمل الإرسال حتى بعد إغلاق الصفحة. وvisibilitychange أكثر موثوقية من unload خاصة على الجوال. (أو fetch مع keepalive: true.)', 'sendBeacon finishes sending even after the page closes, and visibilitychange is more reliable than unload, especially on mobile. (Or fetch with keepalive: true.)', 'sendBeacon sayfa kapandıktan sonra bile göndermeyi bitirir; visibilitychange özellikle mobilde unload’dan daha güvenilirdir. (Ya da keepalive: true ile fetch.)') }),
  choice({ id: 'b-s2-compositor', level: 'senior', topic,
    prompt: W('أي حركة تبقى ناعمة حتى عندما يكون الخيط الرئيسي مشغولًا بـ JavaScript ثقيل؟', 'Which animation stays smooth even while the main thread is busy with heavy JavaScript?', 'Ana thread ağır JavaScript’le meşgulken bile hangi animasyon akıcı kalır?'),
    options: {

      ar: ['CSS animation على transform وopacity', 'CSS animation على width وleft', 'requestAnimationFrame يغيّر top', 'setInterval يغيّر margin'],

      en: ['A CSS animation of transform and opacity', 'A CSS animation of width and left', 'requestAnimationFrame changing top', 'setInterval changing margin'],

      tr: ['transform ve opacity üzerinde CSS animasyonu', 'width ve left üzerinde CSS animasyonu', 'top’u değiştiren requestAnimationFrame', 'margin’i değiştiren setInterval'],

    }, answer: 0,
    why: W('transform وopacity يمكن تنفيذهما في خيط الـ compositor دون الخيط الرئيسي، أما width وtop فتحتاج layout على الخيط الرئيسي.', 'transform and opacity can run on the compositor thread without the main thread; width and top need layout on the main thread.', 'transform ve opacity ana thread olmadan compositor thread’inde çalışabilir; width ve top ana thread’de layout gerektirir.') }),
  choice({ id: 'b-s2-detached-dom', level: 'senior', topic,
    prompt: W('ذاكرة صفحة SPA تزيد مع كل تنقل بين الصفحات. ما السبب الشائع وكيف تتأكد؟', 'An SPA’s memory grows with every page navigation. The usual cause, and how do you confirm it?', 'Bir SPA’nın belleği her sayfa geçişinde artıyor. Olağan neden ve nasıl doğrularsın?'),
    options: L3(['مستمعون أو مؤقتات أو متغيرات تحتفظ بعناصر DOM محذوفة؛ تأكد بـ Heap snapshot وابحث عن Detached', 'الصور كبيرة', 'CSS كثير', 'المتصفح قديم'],
      ['Listeners, timers or variables holding on to removed DOM nodes; confirm with a heap snapshot and look for Detached', 'The images are large', 'Too much CSS', 'An old browser'],
      ['Silinen DOM düğümlerini tutan dinleyiciler, zamanlayıcılar ya da değişkenler; heap snapshot ile doğrula ve Detached ara', 'Resimler büyük', 'Çok fazla CSS', 'Eski tarayıcı']), answer: 0,
    why: W('العنصر المحذوف من الصفحة لا يُحرَّر طالما يشير إليه شيء. نظّف المستمعين والمؤقتات عند إزالة المكوّن.', 'A node removed from the page is not freed while something still references it. Clean up listeners and timers when a component unmounts.', 'Sayfadan kaldırılan bir düğüm, bir şey ona referans verdikçe serbest kalmaz. Bileşen kaldırılınca dinleyicileri ve zamanlayıcıları temizle.') }),
  choice({ id: 'b-s2-idb-autocommit', level: 'senior', topic,
    prompt: W('معاملة IndexedDB تفشل بخطأ TransactionInactiveError بعد await fetch(...) داخلها. لماذا؟', 'An IndexedDB transaction fails with TransactionInactiveError after an await fetch(...) inside it. Why?', 'Bir IndexedDB transaction’ı içindeki await fetch(...) sonrası TransactionInactiveError ile başarısız oluyor. Neden?'),
    options: L3(['المعاملة تُغلق تلقائيًا عندما لا توجد طلبات IndexedDB معلقة؛ اجلب البيانات قبل فتح المعاملة', 'fetch ممنوع في المتصفح', 'IndexedDB لا يدعم async', 'يجب إعادة تحميل الصفحة'],
      ['The transaction auto-commits when no IndexedDB requests are pending; fetch the data before opening the transaction', 'fetch is banned in browsers', 'IndexedDB does not support async', 'The page must be reloaded'],
      ['Bekleyen IndexedDB isteği yoksa transaction otomatik commit olur; veriyi transaction’ı açmadan önce getir', 'Tarayıcıda fetch yasak', 'IndexedDB async desteklemez', 'Sayfa yeniden yüklenmeli']), answer: 0,
    why: W('أي انتظار لشيء خارج IndexedDB يعطي المعاملة فرصة للانتهاء. مكتبات مثل idb تسهل العمل لكنها لا تغيّر هذه القاعدة.', 'Waiting on anything outside IndexedDB gives the transaction a chance to finish. Libraries like idb make it easier but do not change this rule.', 'IndexedDB dışındaki herhangi bir şeyi beklemek transaction’a bitme fırsatı verir. idb gibi kütüphaneler işi kolaylaştırır ama bu kuralı değiştirmez.') }),
]
