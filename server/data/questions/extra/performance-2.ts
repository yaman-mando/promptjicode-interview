import type { Question } from '#shared/types/quiz'
import { choice, output } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const topic = 'performance' as const

export const PERFORMANCE_2: Question[] = [
  // ───────── Junior ─────────
  output({ id: 'p-j2-debounce', level: 'junior', topic,
    code: `function debounce(fn, ms) {
  let t
  return () => { clearTimeout(t); t = setTimeout(fn, ms) }
}
let requests = 0
const search = debounce(() => requests++, 20)
search(); search(); search()
await new Promise(r => setTimeout(r, 50))
console.log(requests)`,
    options: ['1', '3', '0', '2'], answer: 0,
    why: W('debounce ينتظر توقف المستخدم عن الكتابة ثم ينفّذ مرة واحدة، فيقل عدد الطلبات للخادم كثيرًا.', 'debounce waits until the user stops typing, then runs once, which cuts server requests a lot.', 'debounce kullanıcı yazmayı bırakana kadar bekler, sonra bir kez çalışır; sunucu istekleri çok azalır.') }),
  output({ id: 'p-j2-memo', level: 'junior', topic,
    code: `let work = 0
const cache = new Map()
function slowSquare(n) {
  if (cache.has(n)) return cache.get(n)
  work++
  const r = n * n
  cache.set(n, r)
  return r
}
slowSquare(4); slowSquare(4); slowSquare(5); slowSquare(4)
console.log(work)`,
    options: ['2', '4', '1', '3'], answer: 0,
    why: W('الحفظ (memoization) يتذكر نتائج الحسابات المكلفة، فلا يُعاد حساب نفس المدخل.', 'Memoization remembers results of expensive work, so the same input is never recomputed.', 'Memoization pahalı işlerin sonuçlarını hatırlar; aynı girdi yeniden hesaplanmaz.') }),
  output({ id: 'p-j2-dedupe', level: 'junior', topic,
    code: `const ids = [3, 1, 3, 2, 1]
const unique = [...new Set(ids)]
console.log(unique)`,
    options: ['[ 3, 1, 2 ]', '[ 1, 2, 3 ]', '[ 3, 1, 3, 2, 1 ]', '[ 3 ]'], answer: 0,
    why: W('Set يحذف التكرار بسرعة ويحافظ على ترتيب أول ظهور، أسرع بكثير من حلقة مع includes على القوائم الكبيرة.', 'A Set removes duplicates quickly and keeps first-seen order, far faster than a loop with includes on big lists.', 'Set tekrarları hızla atar ve ilk görülme sırasını korur; büyük listelerde includes’lu döngüden çok daha hızlıdır.') }),
  choice({ id: 'p-j2-modern-formats', level: 'junior', topic,
    prompt: W('أي صيغة صور تعطي غالبًا أصغر حجم بنفس الجودة للصور الفوتوغرافية؟', 'Which image format usually gives the smallest size at the same quality for photos?', 'Fotoğraflar için aynı kalitede genelde en küçük boyutu hangi biçim verir?'),
    options: ['AVIF / WebP', 'BMP', 'PNG', 'GIF'], answer: 0,
    why: W('AVIF وWebP أصغر بكثير من JPEG وPNG. PNG مناسب للصور بخلفية شفافة وحدود حادة، وSVG للأيقونات.', 'AVIF and WebP are much smaller than JPEG and PNG. PNG suits sharp-edged images with transparency, and SVG suits icons.', 'AVIF ve WebP, JPEG ve PNG’den çok daha küçüktür. PNG keskin kenarlı saydam resimlere, SVG simgelere uygundur.') }),
  choice({ id: 'p-j2-cdn', level: 'junior', topic,
    prompt: W('كيف يسرّع CDN تحميل الموقع للزوار البعيدين؟', 'How does a CDN speed up the site for distant visitors?', 'Bir CDN siteyi uzaktaki ziyaretçiler için nasıl hızlandırır?'),
    options: L3(['يقدّم الملفات من خادم قريب جغرافيًا من الزائر', 'يضغط كود JavaScript', 'يزيد سرعة إنترنت الزائر', 'يقلل عدد الصفحات'],
      ['It serves files from a server geographically close to the visitor', 'It compresses JavaScript code', 'It boosts the visitor’s internet speed', 'It reduces the number of pages'],
      ['Dosyaları ziyaretçiye coğrafi olarak yakın bir sunucudan sunar', 'JavaScript kodunu sıkıştırır', 'Ziyaretçinin internet hızını artırır', 'Sayfa sayısını azaltır']), answer: 0,
    why: W('كل رحلة للخادم البعيد تضيف زمنًا. الـ CDN يقصّر المسافة ويخفف الحمل عن الخادم الأصلي.', 'Every round trip to a distant server adds latency. A CDN shortens the distance and takes load off the origin.', 'Uzak sunucuya her gidiş-dönüş gecikme ekler. CDN mesafeyi kısaltır ve asıl sunucunun yükünü alır.') }),
  choice({ id: 'p-j2-font-weights', level: 'junior', topic,
    prompt: W('الموقع يحمّل 9 أوزان من خط Cairo ويستخدم 3 فقط. ما الأثر؟', 'The site loads 9 weights of the Cairo font but uses only 3. The effect?', 'Site Cairo fontunun 9 ağırlığını yüklüyor ama yalnızca 3’ünü kullanıyor. Etkisi?'),
    options: L3(['تنزيل ملفات زائدة يبطئ ظهور النص؛ حمّل الأوزان المستخدمة فقط', 'لا أثر', 'يحسّن جودة الخط', 'يسرّع الموقع'],
      ['Extra downloads delay the text; load only the weights you use', 'No effect', 'Better font quality', 'A faster site'],
      ['Fazla indirme metnin görünmesini geciktirir; yalnızca kullanılan ağırlıkları yükle', 'Etkisi yok', 'Daha kaliteli font', 'Daha hızlı site']), answer: 0,
    why: W('الخطوط العربية كبيرة الحجم. والخط المتغير (variable font) ملف واحد يغطي كل الأوزان.', 'Arabic fonts are large files. A variable font is one file covering every weight.', 'Arapça fontlar büyük dosyalardır. Değişken (variable) font tüm ağırlıkları kapsayan tek bir dosyadır.') }),
  choice({ id: 'p-j2-skeleton', level: 'junior', topic,
    prompt: W('البيانات تحتاج ثانيتين للتحميل. ما الذي يجعل الانتظار يبدو أقصر للمستخدم؟', 'Data takes two seconds to load. What makes the wait feel shorter to users?', 'Verinin yüklenmesi iki saniye sürüyor. Bekleyişi kullanıcıya daha kısa hissettiren ne?'),
    options: L3(['هيكل مبدئي (skeleton) بشكل المحتوى القادم', 'صفحة بيضاء فارغة', 'رسالة «انتظر» فقط', 'إعادة تحميل الصفحة'],
      ['A skeleton shaped like the incoming content', 'A blank white page', 'Just a "please wait" message', 'Reloading the page'],
      ['Gelecek içeriğin şeklinde bir iskelet (skeleton)', 'Boş beyaz sayfa', 'Sadece "bekleyin" mesajı', 'Sayfayı yenilemek']), answer: 0,
    why: W('الأداء المُدرَك مهم مثل الحقيقي. والهيكل بنفس الأبعاد يمنع أيضًا قفز المحتوى (CLS).', 'Perceived performance matters as much as real performance. A skeleton with the same dimensions also prevents layout shift (CLS).', 'Algılanan performans gerçek performans kadar önemlidir. Aynı boyutlarda bir iskelet içerik kaymasını (CLS) da önler.') }),
  choice({ id: 'p-j2-browser-cache', level: 'junior', topic,
    prompt: W('لماذا يفتح الموقع أسرع في الزيارة الثانية؟', 'Why does the site open faster on the second visit?', 'Site ikinci ziyarette neden daha hızlı açılıyor?'),
    options: L3(['المتصفح يحتفظ بالملفات (CSS وJS والصور) في الكاش فلا ينزّلها من جديد', 'الخادم يتذكر الزائر', 'الإنترنت أسرع في المرة الثانية', 'لا يوجد فرق حقيقي'],
      ['The browser keeps files (CSS, JS, images) in its cache and does not download them again', 'The server remembers the visitor', 'The internet is faster the second time', 'There is no real difference'],
      ['Tarayıcı dosyaları (CSS, JS, resimler) önbellekte tutar ve yeniden indirmez', 'Sunucu ziyaretçiyi hatırlar', 'İnternet ikinci seferde daha hızlıdır', 'Gerçek bir fark yok']), answer: 0,
    why: W('ترويسات Cache-Control من الخادم تحدد كم يحتفظ المتصفح بكل ملف.', 'Cache-Control headers from the server decide how long the browser keeps each file.', 'Sunucudan gelen Cache-Control başlıkları tarayıcının her dosyayı ne kadar tutacağını belirler.') }),
  choice({ id: 'p-j2-heavy-lib', level: 'junior', topic,
    prompt: W('تستورد مكتبة تواريخ كاملة (300KB) لتنسيق تاريخ واحد. ما البديل؟', 'You import a whole date library (300 KB) to format one date. The alternative?', 'Tek bir tarihi biçimlendirmek için tüm bir tarih kütüphanesini (300 KB) içe aktarıyorsun. Alternatif?'),
    options: L3(['Intl.DateTimeFormat المدمج في المتصفح، أو مكتبة صغيرة تستورد الدالة المطلوبة فقط', 'لا بديل', 'تحميلها مرتين', 'نسخ المكتبة داخل الكود'],
      ['The browser’s built-in Intl.DateTimeFormat, or a small library importing only the function you need', 'There is none', 'Load it twice', 'Paste the library into the code'],
      ['Tarayıcıya yerleşik Intl.DateTimeFormat ya da yalnızca gereken fonksiyonu içe aktaran küçük bir kütüphane', 'Alternatif yok', 'İki kez yüklemek', 'Kütüphaneyi koda yapıştırmak']), answer: 0,
    why: W('كل كيلوبايت JavaScript يُنزَّل ويُحلَّل ويُنفَّذ، وهذا أثقل على الجوالات الضعيفة.', 'Every kilobyte of JavaScript is downloaded, parsed and executed, which hits weak phones hardest.', 'Her kilobayt JavaScript indirilir, ayrıştırılır ve çalıştırılır; bu zayıf telefonları en çok etkiler.') }),
  choice({ id: 'p-j2-video', level: 'junior', topic,
    prompt: W('فيديو كبير في أسفل الصفحة الرئيسية يبطئ تحميلها. ما الحل البسيط؟', 'A big video near the bottom of the home page slows its loading. A simple fix?', 'Ana sayfanın altındaki büyük bir video yüklemeyi yavaşlatıyor. Basit çözüm?'),
    options: ['<video preload="none" poster="cover.webp" controls>', '<video autoplay>', '<video preload="auto">', '<video loop muted autoplay>'], answer: 0,
    why: W('preload="none" لا ينزّل الفيديو حتى يضغط المستخدم تشغيل، والـ poster صورة خفيفة مكانه.', 'preload="none" downloads nothing until the user presses play, and the poster is a light image in its place.', 'preload="none" kullanıcı oynata basana kadar hiçbir şey indirmez; poster yerine hafif bir resimdir.') }),
  choice({ id: 'p-j2-psi', level: 'junior', topic,
    prompt: W('PageSpeed Insights يعرض قسمين: بيانات مستخدمين حقيقيين ونتيجة اختبار. أيهما يعبّر عن تجربة زوارك فعلًا؟', 'PageSpeed Insights shows two parts: real-user data and a lab test score. Which reflects your visitors’ actual experience?', 'PageSpeed Insights iki bölüm gösterir: gerçek kullanıcı verisi ve laboratuvar test puanı. Hangisi ziyaretçilerinin gerçek deneyimini yansıtır?'),
    options: L3(['بيانات المستخدمين الحقيقيين (field data) من Chrome', 'نتيجة الاختبار المختبري فقط', 'كلاهما متطابق دائمًا', 'لا أحد منهما'],
      ['The real-user (field) data from Chrome', 'Only the lab test score', 'Both are always identical', 'Neither'],
      ['Chrome’dan gelen gerçek kullanıcı (saha) verisi', 'Sadece laboratuvar test puanı', 'İkisi her zaman aynıdır', 'Hiçbiri'],
    ), answer: 0,
    why: W('الاختبار المختبري مفيد لاكتشاف المشاكل وتجربة الإصلاح، لكن Google يقيّم الموقع بالبيانات الحقيقية.', 'The lab test is useful for finding problems and trying fixes, but Google judges the site by real data.', 'Laboratuvar testi sorunları bulmak ve düzeltmeleri denemek için faydalıdır, ama Google siteyi gerçek veriyle değerlendirir.') }),
  choice({ id: 'p-j2-ttfb', level: 'junior', topic,
    prompt: W('ماذا يقيس TTFB؟', 'What does TTFB measure?', 'TTFB neyi ölçer?'),
    options: L3(['الزمن حتى يصل أول بايت من رد الخادم', 'زمن تحميل كل الصور', 'زمن تنفيذ JavaScript', 'حجم الصفحة'],
      ['The time until the first byte of the server’s response arrives', 'How long every image takes', 'JavaScript execution time', 'Page size'],
      ['Sunucu yanıtının ilk baytı gelene kadar geçen süre', 'Tüm resimlerin yüklenme süresi', 'JavaScript çalışma süresi', 'Sayfa boyutu']), answer: 0,
    why: W('TTFB عالٍ يعني خادمًا بطيئًا أو بعيدًا أو استعلامات ثقيلة قبل الرد. لا يمكن لأي تحسين في الواجهة أن يعوضه.', 'A high TTFB means a slow or distant server, or heavy queries before replying. No frontend tweak can make up for it.', 'Yüksek TTFB yavaş ya da uzak bir sunucu veya yanıttan önce ağır sorgular demektir. Hiçbir ön yüz ayarı bunu telafi edemez.') }),
  choice({ id: 'p-j2-svg-icons', level: 'junior', topic,
    prompt: W('ما الأنسب لأيقونات الموقع؟', 'What suits the site’s icons best?', 'Sitenin simgeleri için en uygunu ne?'),
    options: {

      ar: ['SVG', 'JPEG', 'PNG بحجم كبير', 'GIF'],

      en: ['SVG', 'JPEG', 'Large PNGs', 'GIF'],

      tr: ['SVG', 'JPEG', 'Büyük PNG’ler', 'GIF'],

    }, answer: 0,
    why: W('SVG صغير ويبقى حادًا بأي حجم ويمكن تلوينه بـ CSS (currentColor)، بدل صور مختلفة لكل حجم.', 'SVG is small, stays sharp at any size and can be coloured with CSS (currentColor), instead of separate images per size.', 'SVG küçüktür, her boyutta keskin kalır ve CSS ile (currentColor) renklendirilebilir; her boyut için ayrı resim gerekmez.') }),
  choice({ id: 'p-j2-third-party', level: 'junior', topic,
    prompt: W('سكربت محادثة خارجي يبطئ ظهور الصفحة. ما الحل؟', 'An outside chat widget script slows down the page appearing. The fix?', 'Dış bir sohbet bileşeni script’i sayfanın görünmesini yavaşlatıyor. Çözüm?'),
    options: L3(['تحميله لاحقًا (async أو بعد التفاعل أو بعد التحميل)، فالمحتوى الأساسي أولًا', 'وضعه في أول <head>', 'تحميله مرتين', 'نسخ كوده داخل الصفحة'],
      ['Load it later (async, after interaction, or after load) so the main content comes first', 'Put it first in <head>', 'Load it twice', 'Paste its code into the page'],
      ['Sonra yüklemek (async, etkileşimden ya da yüklemeden sonra); önce ana içerik gelsin', '<head>’in başına koymak', 'İki kez yüklemek', 'Kodunu sayfaya yapıştırmak']), answer: 0,
    why: W('سكربتات الطرف الثالث من أكثر أسباب البطء شيوعًا، ولا تتحكم في حجمها ولا سرعة خوادمها.', 'Third-party scripts are among the most common causes of slowness, and you control neither their size nor their servers.', 'Üçüncü taraf script’ler yavaşlığın en yaygın nedenlerindendir; ne boyutlarını ne sunucularını kontrol edersin.') }),
  choice({ id: 'p-j2-pagination', level: 'junior', topic,
    prompt: W('صفحة المنتجات تجلب كل الـ 8,000 منتج دفعة واحدة. ما التحسين الأساسي؟', 'The products page fetches all 8,000 products at once. The basic improvement?', 'Ürünler sayfası 8.000 ürünün hepsini tek seferde çekiyor. Temel iyileştirme?'),
    options: L3(['جلب صفحة صغيرة (مثلًا 24 منتجًا) وتحميل المزيد عند الحاجة', 'ضغط الصور فقط', 'تحميلها كلها لكن بسرعة أكبر', 'إخفاء المنتجات بـ CSS'],
      ['Fetch a small page (say 24 products) and load more when needed', 'Only compress images', 'Load them all, just faster', 'Hide products with CSS'],
      ['Küçük bir sayfa (ör. 24 ürün) çekip gerektikçe daha fazlasını yüklemek', 'Sadece resimleri sıkıştırmak', 'Hepsini ama daha hızlı yüklemek', 'Ürünleri CSS ile gizlemek']), answer: 0,
    why: W('أقل بيانات = رد أسرع، وذاكرة أقل، وعدد عناصر DOM أقل. والبحث والفلترة مكانها الخادم.', 'Less data means a faster response, less memory and fewer DOM nodes. Search and filtering belong on the server.', 'Daha az veri daha hızlı yanıt, daha az bellek ve daha az DOM düğümü demektir. Arama ve filtreleme sunucuya aittir.') }),
  choice({ id: 'p-j2-ssr', level: 'junior', topic,
    prompt: W('تطبيق SPA يُظهر صفحة بيضاء ثلاث ثوانٍ على الجوال قبل ظهور المحتوى. ما الذي يساعد؟', 'An SPA shows a blank white page for three seconds on mobile before content appears. What helps?', 'Bir SPA içerik görünmeden önce mobilde üç saniye boş beyaz sayfa gösteriyor. Ne yardımcı olur?'),
    options: L3(['الرسم في الخادم (SSR) أو التوليد المسبق (SSG)، فيصل HTML جاهزًا', 'زيادة حجم JavaScript', 'إضافة مزيد من المكتبات', 'إزالة CSS'],
      ['Server-side rendering (SSR) or static generation (SSG), so HTML arrives ready', 'More JavaScript', 'More libraries', 'Removing CSS'],
      ['Sunucuda çizim (SSR) ya da statik üretim (SSG); HTML hazır gelir', 'Daha fazla JavaScript', 'Daha fazla kütüphane', 'CSS’i kaldırmak']), answer: 0,
    why: W('في SPA يجب تنزيل JavaScript وتشغيله قبل ظهور أي شيء. ومع SSR يظهر المحتوى أولًا ثم يصبح تفاعليًا، وهذا أفضل لـ SEO أيضًا.', 'In an SPA, JavaScript must download and run before anything appears. With SSR the content shows first, then becomes interactive, which is better for SEO too.', 'SPA’da hiçbir şey görünmeden önce JavaScript inip çalışmalıdır. SSR ile içerik önce görünür, sonra etkileşimli olur; SEO için de daha iyidir.') }),
  choice({ id: 'p-j2-image-cdn-resize', level: 'junior', topic,
    prompt: W('المستخدمون يرفعون صورًا بحجم 6MB، وتُعرض كصور مصغرة صغيرة. ما الحل؟', 'Users upload 6 MB photos, and they are shown as small thumbnails. The fix?', 'Kullanıcılar 6 MB fotoğraf yüklüyor ve küçük önizleme olarak gösteriliyor. Çözüm?'),
    options: L3(['توليد نسخ مصغرة بأحجام مناسبة عند الرفع (أو عبر خدمة صور) وعرضها بدل الأصل', 'تصغيرها بـ CSS فقط', 'منع الرفع', 'ضغط الصفحة'],
      ['Generate resized versions on upload (or via an image service) and show those instead of the original', 'Only shrink them with CSS', 'Block uploads', 'Compress the page'],
      ['Yüklemede (ya da bir resim servisiyle) uygun boyutlarda küçük sürümler üretip asıl yerine onları göstermek', 'Sadece CSS ile küçültmek', 'Yüklemeyi engellemek', 'Sayfayı sıkıştırmak']), answer: 0,
    why: W('التصغير بـ CSS يبقي المتصفح ينزّل 6MB كاملة لكل صورة. والنسخة المصغرة قد لا تتجاوز 20KB.', 'Shrinking with CSS still makes the browser download the full 6 MB per image. A thumbnail can be under 20 KB.', 'CSS ile küçültmek, tarayıcının her resim için 6 MB’ın tamamını indirmesine yol açar. Küçük bir sürüm 20 KB’ın altında olabilir.') }),

  // ───────── Mid ─────────
  output({ id: 'p-m2-throttle', level: 'mid', topic,
    code: `function throttle(fn, ms) {
  let last = 0
  return () => {
    const now = Date.now()
    if (now - last >= ms) { last = now; fn() }
  }
}
let runs = 0
const onScroll = throttle(() => runs++, 1000)
for (let i = 0; i < 100; i++) onScroll()
console.log(runs)`,
    options: ['1', '100', '0', '10'], answer: 0,
    why: W('throttle ينفّذ مرة كل فترة مهما كثرت الأحداث، مناسب للتمرير وتغيير الحجم. أما debounce فينتظر التوقف.', 'throttle runs at most once per interval however many events fire, good for scroll and resize. debounce waits for a pause instead.', 'throttle, olay sayısı ne olursa olsun aralık başına en fazla bir kez çalışır; kaydırma ve yeniden boyutlandırma için iyidir. debounce ise duraklamayı bekler.') }),
  output({ id: 'p-m2-intl', level: 'mid', topic,
    code: `const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const date = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' })
console.log(money.format(1234.5), '|', date.format(new Date(Date.UTC(2026, 10, 21))))`,
    options: ['$1,234.50 | 21 Nov 2026', '1234.5 USD | 2026-11-21', '$1234.50 | Nov 21, 2026', '1,234.50$ | 21/11/2026'], answer: 0,
    why: W('Intl مدمج في المتصفح بلا أي حجم إضافي، ويدعم العربية والتركية. أنشئ المنسّق مرة واحدة وأعد استخدامه، فإنشاؤه مكلف.', 'Intl is built into the browser at zero bundle cost and supports Arabic and Turkish. Create a formatter once and reuse it, since creating one is expensive.', 'Intl tarayıcıya yerleşiktir, paket maliyeti sıfırdır ve Arapça ile Türkçeyi destekler. Biçimlendiriciyi bir kez oluşturup yeniden kullan; oluşturması pahalıdır.') }),
  choice({ id: 'p-m2-nested-includes', level: 'mid', topic,
    prompt: W('هذا الكود بطيء جدًا مع 50,000 طلب و50,000 مستخدم. ما الإصلاح؟', 'This code is very slow with 50,000 orders and 50,000 users. The fix?', 'Bu kod 50.000 sipariş ve 50.000 kullanıcıyla çok yavaş. Düzeltme?'),
    code: `const vipOrders = orders.filter(o => vipIds.includes(o.userId))`,
    options: {

      ar: ['const vip = new Set(vipIds); orders.filter(o => vip.has(o.userId))', 'orders.forEach بدل filter', 'ترتيب orders أولًا', 'تقسيمه بـ setTimeout'],

      en: ['const vip = new Set(vipIds); orders.filter(o => vip.has(o.userId))', 'orders.forEach instead of filter', 'Sort orders first', 'Split it with setTimeout'],

      tr: ['const vip = new Set(vipIds); orders.filter(o => vip.has(o.userId))', 'filter yerine orders.forEach', 'Önce orders’ı sıralamak', 'setTimeout ile bölmek'],

    }, answer: 0, codeLang: 'js',
    why: W('includes تبحث في كل القائمة لكل طلب (O(n²))، أما Set.has فبحثه شبه فوري (O(1)). من مليارات العمليات إلى آلاف.', 'includes scans the whole list for every order (O(n²)), while Set.has is near-instant (O(1)). Billions of operations become thousands.', 'includes her sipariş için tüm listeyi tarar (O(n²)); Set.has neredeyse anlıktır (O(1)). Milyarlarca işlem binlere iner.') }),
  choice({ id: 'p-m2-frontend-n1', level: 'mid', topic,
    prompt: W('صفحة تعرض 50 طلبًا، ثم ترسل طلبًا منفصلًا لجلب اسم العميل لكل طلب. ما المشكلة والحل؟', 'A page shows 50 orders, then sends a separate request to fetch each order’s customer name. The problem and fix?', 'Bir sayfa 50 sipariş gösteriyor, sonra her siparişin müşteri adı için ayrı istek gönderiyor. Sorun ve çözüm?'),
    options: L3(['51 طلبًا بدل واحد (N+1)؛ أرجع الاسم مع الطلبات من الـ API أو اجلب كل العملاء بطلب واحد', 'لا مشكلة مع HTTP/2', 'زيادة سرعة الخادم', 'تخزين الأسماء في الكوكيز'],
      ['51 requests instead of one (N+1); return the name with the orders from the API, or fetch all customers in one request', 'No problem with HTTP/2', 'A faster server', 'Store names in cookies'],
      ['Bir yerine 51 istek (N+1); adı siparişlerle API’den döndür ya da tüm müşterileri tek istekte çek', 'HTTP/2 ile sorun yok', 'Daha hızlı sunucu', 'Adları çerezlerde saklamak'],
    ), answer: 0,
    why: W('كل طلب له زمن رحلة ورأس، وعلى شبكة الجوال تتضاعف الكلفة. صمّم الـ API حول ما تحتاجه الشاشة.', 'Each request has round-trip time and overhead, and on mobile networks that multiplies. Design the API around what the screen needs.', 'Her isteğin gidiş-dönüş süresi ve ek yükü vardır; mobil ağda bu katlanır. API’yi ekranın ihtiyacına göre tasarla.') }),
  choice({ id: 'p-m2-critical-css', level: 'mid', topic,
    prompt: W('ما فكرة «CSS الحرج» (critical CSS)؟', 'What is the idea behind "critical CSS"?', '"Kritik CSS" (critical CSS) fikri nedir?'),
    options: L3(['تضمين أنماط الجزء الظاهر أولًا داخل HTML، وتحميل بقية CSS دون إيقاف الرسم', 'حذف كل CSS', 'كتابة CSS داخل JavaScript', 'استخدام !important في كل مكان'],
      ['Inline the styles for the first visible part in the HTML, and load the rest of the CSS without blocking rendering', 'Delete all CSS', 'Write CSS inside JavaScript', 'Use !important everywhere'],
      ['İlk görünen kısmın stillerini HTML içine gömmek, CSS’in kalanını çizimi engellemeden yüklemek', 'Tüm CSS’i silmek', 'CSS’i JavaScript içinde yazmak', 'Her yerde !important kullanmak']), answer: 0,
    why: W('ملفات CSS توقف الرسم حتى تُنزَّل. تضمين القليل الضروري يسمح بظهور أول شاشة مع أول رد.', 'CSS files block rendering until downloaded. Inlining the essential bit lets the first screen show with the first response.', 'CSS dosyaları inene kadar çizimi engeller. Gerekli küçük kısmı gömmek ilk ekranın ilk yanıtla görünmesini sağlar.') }),
  choice({ id: 'p-m2-bundle-analyzer', level: 'mid', topic,
    prompt: W('حزمة JavaScript حجمها 2MB ولا تعرف السبب. ما أول خطوة؟', 'The JavaScript bundle is 2 MB and you do not know why. What is the first step?', 'JavaScript paketi 2 MB ve nedenini bilmiyorsun. İlk adım?'),
    options: L3(['أداة تحليل الحزمة (مثل rollup-plugin-visualizer) لرؤية أكبر المكتبات', 'حذف مكتبات عشوائيًا', 'تعطيل الضغط', 'كتابة كل شيء من جديد'],
      ['A bundle analyzer (such as rollup-plugin-visualizer) to see the biggest libraries', 'Delete libraries at random', 'Turn off minification', 'Rewrite everything'],
      ['En büyük kütüphaneleri görmek için bir paket analizcisi (rollup-plugin-visualizer gibi)', 'Rastgele kütüphane silmek', 'Küçültmeyi kapatmak', 'Her şeyi baştan yazmak']), answer: 0,
    why: W('غالبًا تكون المشكلة في مكتبة أو اثنتين (أيقونات كاملة، مكتبة تواريخ، محرر). القياس يوجّه الجهد للمكان الصحيح.', 'Usually one or two libraries are to blame (a full icon set, a date library, an editor). Measuring points the effort at the right place.', 'Genelde suçlu bir iki kütüphanedir (tam bir simge seti, tarih kütüphanesi, editör). Ölçmek emeği doğru yere yönlendirir.') }),
  choice({ id: 'p-m2-idle-callback', level: 'mid', topic,
    prompt: W('كود تحليلات غير عاجل يعمل عند التحميل ويؤخر التفاعل. أين تنقله؟', 'Non-urgent analytics code runs on load and delays interactivity. Where do you move it?', 'Acil olmayan analitik kodu yüklemede çalışıp etkileşimi geciktiriyor. Nereye taşırsın?'),
    options: {

      ar: ['requestIdleCallback(() => initAnalytics())', 'داخل أول <head> متزامنًا', 'while (true) loop', 'داخل كل حدث click'],

      en: ['requestIdleCallback(() => initAnalytics())', 'Synchronously at the top of <head>', 'while (true) loop', 'Inside every click handler'],

      tr: ['requestIdleCallback(() => initAnalytics())', '<head>’in başında senkron', 'while (true) loop', 'Her click işleyicisinin içinde'],

    }, answer: 0, codeLang: 'js',
    why: W('requestIdleCallback ينفّذ الكود عندما يكون المتصفح متفرغًا، فلا يزاحم الرسم أو استجابة المستخدم.', 'requestIdleCallback runs the code when the browser is idle, so it does not compete with rendering or user input.', 'requestIdleCallback kodu tarayıcı boştayken çalıştırır; çizimle ya da kullanıcı girdisiyle yarışmaz.') }),
  choice({ id: 'p-m2-swr-header', level: 'mid', topic,
    prompt: W('رد API لقائمة منتجات يتغير قليلًا. أي ترويسة تجعل الرد سريعًا مع تحديث في الخلفية؟', 'An API response for a product list rarely changes. Which header makes it fast while refreshing in the background?', 'Bir ürün listesi API yanıtı nadiren değişiyor. Hangi başlık onu hızlı tutarken arka planda yeniler?'),
    options: ['Cache-Control: max-age=60, stale-while-revalidate=600', 'Cache-Control: no-store', 'Cache-Control: max-age=0', 'Pragma: no-cache'], answer: 0, codeLang: 'http',
    why: W('خلال دقيقة يُستخدم الكاش مباشرة، وبعدها يُعرض المحفوظ فورًا ويُجلب الجديد في الخلفية للطلب التالي.', 'For a minute the cache is used directly; after that the stored copy is served instantly while a fresh one is fetched in the background.', 'Bir dakika boyunca önbellek doğrudan kullanılır; sonra saklanan kopya anında sunulurken arka planda yenisi çekilir.') }),
  choice({ id: 'p-m2-bg-image-lcp', level: 'mid', topic,
    prompt: W('صورة الـ hero موضوعة كـ background-image في CSS، وتتأخر في الظهور. لماذا؟', 'The hero image is a CSS background-image and shows up late. Why?', 'Hero resmi CSS background-image olarak konmuş ve geç görünüyor. Neden?'),
    options: L3(['المتصفح لا يكتشفها إلا بعد تنزيل CSS وتطبيقه؛ استخدم <img> أو preload لها', 'الخلفيات لا تُضغط', 'CSS يمنع الصور', 'لا يوجد سبب'],
      ['The browser only discovers it after downloading and applying the CSS; use an <img> or preload it', 'Backgrounds cannot be compressed', 'CSS blocks images', 'There is no reason'],
      ['Tarayıcı onu ancak CSS indirilip uygulandıktan sonra keşfeder; <img> kullan ya da preload et', 'Arka planlar sıkıştırılamaz', 'CSS resimleri engeller', 'Bir neden yok']), answer: 0,
    why: W('ماسح التحميل المسبق في المتصفح يجد <img> في HTML مبكرًا جدًا، لكنه لا يقرأ ملفات CSS.', 'The browser’s preload scanner finds an <img> in the HTML very early, but it does not read CSS files.', 'Tarayıcının ön yükleme tarayıcısı HTML’deki <img>’yi çok erken bulur, ama CSS dosyalarını okumaz.') }),
  choice({ id: 'p-m2-lab-vs-field', level: 'mid', topic,
    prompt: W('Lighthouse يعطي 98، لكن بيانات المستخدمين الحقيقيين تُظهر LCP سيئًا. ما التفسير الأرجح؟', 'Lighthouse scores 98, but real-user data shows a poor LCP. The most likely explanation?', 'Lighthouse 98 veriyor ama gerçek kullanıcı verisi kötü bir LCP gösteriyor. En olası açıklama?'),
    options: L3(['المستخدمون الحقيقيون على أجهزة وشبكات أبطأ، وصفحات وحالات غير التي اختُبرت', 'Lighthouse معطّل', 'البيانات الحقيقية خاطئة دائمًا', 'المشكلة في الخط'],
      ['Real users have slower devices and networks, and hit pages and states that were not tested', 'Lighthouse is broken', 'Real data is always wrong', 'It is the font'],
      ['Gerçek kullanıcıların cihazları ve ağları daha yavaş; test edilmeyen sayfa ve durumlara giriyorlar', 'Lighthouse bozuk', 'Gerçek veri hep yanlış', 'Sorun fontta'],
    ), answer: 0,
    why: W('الاختبار يجري على جهاز واحد وبلا كاش وبلا تسجيل دخول. اجمع بيانات حقيقية بمكتبة web-vitals لترى الصورة كاملة.', 'The test runs on one device, with no cache and no login. Collect real data with the web-vitals library to see the full picture.', 'Test tek cihazda, önbelleksiz ve girişsiz çalışır. Tam resmi görmek için web-vitals kütüphanesiyle gerçek veri topla.') }),
  choice({ id: 'p-m2-reserve-space', level: 'mid', topic,
    prompt: W('إعلان أو تضمين خارجي يظهر متأخرًا ويدفع المحتوى للأسفل. كيف تمنع ذلك؟', 'An ad or outside embed appears late and pushes the content down. How do you prevent it?', 'Bir reklam ya da dış gömme geç görünüp içeriği aşağı itiyor. Nasıl önlersin?'),
    options: ['.ad-slot { min-height: 250px; }', '.ad-slot { display: none; }', '.ad-slot { position: absolute; top: 0; }', '.ad-slot { z-index: 999; }'], answer: 0,
    why: W('حجز المساحة مسبقًا يجعل المحتوى لا يتحرك عند وصول العنصر، فيتحسن CLS.', 'Reserving the space up front means the content does not move when the element arrives, which improves CLS.', 'Alanı önceden ayırmak, öğe gelince içeriğin kaymamasını sağlar; CLS iyileşir.') }),
  choice({ id: 'p-m2-font-subset', level: 'mid', topic,
    prompt: W('ملف الخط يحوي حروف كل اللغات (400KB) والموقع عربي وإنجليزي فقط. ما التحسين؟', 'The font file has glyphs for every language (400 KB), but the site is only Arabic and English. The improvement?', 'Font dosyası her dilin karakterlerini içeriyor (400 KB) ama site sadece Arapça ve İngilizce. İyileştirme?'),
    options: {

      ar: ['تقسيم الخط (subsetting) مع unicode-range لكل جزء', 'font-display: block', 'تحميله من 3 مصادر', 'تحويله إلى صور'],

      en: ['Subset the font with a unicode-range per part', 'font-display: block', 'Load it from 3 sources', 'Turn it into images'],

      tr: ['Fontu alt kümelere bölüp her parça için unicode-range', 'font-display: block', '3 kaynaktan yüklemek', 'Resme çevirmek'],

    }, answer: 0,
    why: W('مع unicode-range ينزّل المتصفح فقط الملف الذي يحوي الحروف المستخدمة فعلًا في الصفحة.', 'With unicode-range the browser downloads only the file containing characters actually used on the page.', 'unicode-range ile tarayıcı yalnızca sayfada gerçekten kullanılan karakterleri içeren dosyayı indirir.') }),
  choice({ id: 'p-m2-http2-sharding', level: 'mid', topic,
    prompt: W('مع HTTP/2، هل ما زال توزيع الملفات على عدة نطاقات (domain sharding) مفيدًا؟', 'With HTTP/2, is spreading files across several domains (domain sharding) still useful?', 'HTTP/2 ile dosyaları birkaç alana yaymak (domain sharding) hâlâ faydalı mı?'),
    options: L3(['لا، HTTP/2 ينقل ملفات كثيرة عبر اتصال واحد، والنطاقات الإضافية تضيف اتصالات وزمنًا', 'نعم، دائمًا', 'نعم، للصور فقط', 'HTTP/2 لا يدعم الصور'],
      ['No, HTTP/2 sends many files over one connection, and extra domains add connections and latency', 'Yes, always', 'Yes, only for images', 'HTTP/2 does not support images'],
      ['Hayır, HTTP/2 birçok dosyayı tek bağlantıda gönderir; ek alanlar bağlantı ve gecikme ekler', 'Evet, her zaman', 'Evet, sadece resimler için', 'HTTP/2 resimleri desteklemez']), answer: 0,
    why: W('كانت حيلة لزمن HTTP/1.1 الذي يحد عدد الاتصالات لكل نطاق. كثير من «حيل الأداء» القديمة أصبحت ضارة.', 'It was a trick for HTTP/1.1, which limited connections per domain. Many old "performance tricks" are now harmful.', 'Alan başına bağlantıyı sınırlayan HTTP/1.1 dönemi için bir hileydi. Eski "performans hilelerinin" çoğu artık zararlı.') }),

  choice({ id: 'p-m2-json-compression', level: 'mid', topic,
    prompt: W('رد API بصيغة JSON حجمه 900KB ويصل ببطء على الجوال. ما أسرع تحسين في الخادم؟', 'A 900 KB JSON API response arrives slowly on mobile. What is the quickest server-side win?', '900 KB’lık bir JSON API yanıtı mobilde yavaş geliyor. Sunucu tarafında en hızlı kazanç ne?'),
    options: L3(['تفعيل ضغط gzip أو Brotli للردود، وإرسال الحقول المطلوبة فقط', 'تحويل JSON إلى XML', 'إرسال الرد مرتين', 'زيادة المهلة'],
      ['Enable gzip or Brotli compression on responses, and send only the needed fields', 'Switch JSON to XML', 'Send the response twice', 'Raise the timeout'],
      ['Yanıtlarda gzip ya da Brotli sıkıştırmayı açmak ve yalnızca gereken alanları göndermek', 'JSON’u XML’e çevirmek', 'Yanıtı iki kez göndermek', 'Zaman aşımını artırmak']), answer: 0,
    why: W('JSON نص متكرر فيُضغط بنسبة كبيرة جدًا، أحيانًا إلى عُشر حجمه. وحذف الحقول غير المستخدمة يقلل أكثر.', 'JSON is repetitive text that compresses very well, sometimes to a tenth of its size. Dropping unused fields cuts more.', 'JSON tekrarlı bir metindir ve çok iyi sıkışır, bazen boyutunun onda birine. Kullanılmayan alanları atmak daha da azaltır.') }),

  // ───────── Senior ─────────
  choice({ id: 'p-s2-ssr-waterfall', level: 'senior', topic,
    prompt: W('صفحة SSR لها TTFB بثانيتين: تجلب المستخدم، ثم طلباته، ثم التوصيات بالتسلسل. ما الحل؟', 'An SSR page has a 2-second TTFB: it fetches the user, then their orders, then recommendations, one after another. The fix?', 'Bir SSR sayfasının TTFB’si 2 saniye: kullanıcıyı, sonra siparişlerini, sonra önerileri sırayla çekiyor. Çözüm?'),
    options: L3(['جلب المستقل بالتوازي (Promise.all)، وبث الأجزاء البطيئة لاحقًا (streaming) بدل انتظارها', 'زيادة ذاكرة الخادم', 'إلغاء SSR', 'تخزين الصفحة لكل مستخدم في الكاش'],
      ['Fetch the independent parts in parallel (Promise.all), and stream the slow parts later instead of waiting', 'More server memory', 'Drop SSR', 'Cache the page per user'],
      ['Bağımsız kısımları paralel çekmek (Promise.all) ve yavaş kısımları beklemek yerine sonradan akıtmak (streaming)', 'Daha fazla sunucu belleği', 'SSR’dan vazgeçmek', 'Sayfayı kullanıcı başına önbelleğe almak'],
    ), answer: 0,
    why: W('الشلال (waterfall) يجمع أزمنة الطلبات. والتوصيات غير ضرورية لأول شاشة، فيمكن إرسالها بعد الهيكل.', 'A waterfall adds up the request times. Recommendations are not needed for the first screen, so they can be sent after the shell.', 'Şelale (waterfall) istek sürelerini toplar. Öneriler ilk ekran için gerekli değildir; iskeletten sonra gönderilebilir.') }),
  choice({ id: 'p-s2-early-hints', level: 'senior', topic,
    prompt: W('الخادم يحتاج 800ms لتجهيز HTML. كيف يبدأ المتصفح تنزيل CSS والخط خلال هذا الانتظار؟', 'The server needs 800 ms to prepare the HTML. How can the browser start downloading the CSS and font during that wait?', 'Sunucunun HTML’i hazırlaması 800 ms sürüyor. Tarayıcı bu bekleme sırasında CSS ve fontu indirmeye nasıl başlar?'),
    options: {

      ar: ['103 Early Hints مع Link: </app.css>; rel=preload', '301 Moved Permanently', '204 No Content', 'Retry-After'],

      en: ['103 Early Hints with Link: </app.css>; rel=preload', '301 Moved Permanently', '204 No Content', 'Retry-After'],

      tr: ['Link: </app.css>; rel=preload ile 103 Early Hints', '301 Moved Permanently', '204 No Content', 'Retry-After'],

    }, answer: 0,
    why: W('الخادم يرسل ردًا مبكرًا بالروابط المهمة قبل أن يجهز الرد الحقيقي، فيُستغل وقت التفكير. تدعمه Cloudflare والمتصفحات الحديثة.', 'The server sends an early response listing key resources before the real one is ready, using the server’s think time. Cloudflare and modern browsers support it.', 'Sunucu asıl yanıt hazır olmadan önemli kaynakları listeleyen erken bir yanıt gönderir; düşünme süresi değerlendirilir. Cloudflare ve modern tarayıcılar destekler.') }),
  choice({ id: 'p-s2-precompress', level: 'senior', topic,
    prompt: W('موقع ثابت كبير يضغط الملفات بـ Brotli عند كل طلب، فيرتفع استهلاك المعالج. ما التحسين؟', 'A big static site compresses files with Brotli on every request, and CPU usage climbs. The improvement?', 'Büyük bir statik site her istekte dosyaları Brotli ile sıkıştırıyor ve CPU kullanımı artıyor. İyileştirme?'),
    options: L3(['ضغط الملفات مسبقًا وقت البناء بأعلى مستوى وتقديم .br الجاهز', 'إلغاء الضغط', 'استخدام gzip مستوى 1', 'ضغط الصور فقط'],
      ['Pre-compress at build time at the highest level and serve the ready .br files', 'Turn compression off', 'Use gzip level 1', 'Only compress images'],
      ['Derleme anında en yüksek seviyede önceden sıkıştırmak ve hazır .br dosyalarını sunmak', 'Sıkıştırmayı kapatmak', 'gzip seviye 1 kullanmak', 'Sadece resimleri sıkıştırmak']), answer: 0,
    why: W('Brotli بأعلى مستوى بطيء جدًا للضغط الفوري لكنه يعطي ملفات أصغر. الضغط مرة واحدة يعطيك الحسنيين.', 'Max-level Brotli is too slow to do on the fly but gives smaller files. Compressing once gives you both.', 'En yüksek seviye Brotli anlık sıkıştırma için çok yavaştır ama daha küçük dosyalar verir. Bir kez sıkıştırmak ikisini de sağlar.') }),
  choice({ id: 'p-s2-islands', level: 'senior', topic,
    prompt: W('صفحة محتوى ثابت في معظمها، فيها زر إعجاب واحد تفاعلي، لكنها ترسل 400KB من JavaScript للـ hydration. ما النهج الأنسب؟', 'A mostly static content page with a single interactive like button ships 400 KB of JavaScript for hydration. Better approach?', 'Çoğunlukla statik, tek bir etkileşimli beğen butonu olan içerik sayfası hydration için 400 KB JavaScript gönderiyor. Daha iyi yaklaşım?'),
    options: L3(['جزر تفاعلية (islands) أو Server Components: JavaScript فقط للأجزاء التفاعلية', 'تقسيم الحزمة إلى 4 ملفات', 'ضغط أكثر', 'تحميل JavaScript قبل HTML'],
      ['Islands or Server Components: JavaScript only for the interactive parts', 'Split the bundle into 4 files', 'More compression', 'Load JavaScript before the HTML'],
      ['Adacıklar (islands) ya da Server Components: JavaScript yalnızca etkileşimli kısımlar için', 'Paketi 4 dosyaya bölmek', 'Daha fazla sıkıştırma', 'JavaScript’i HTML’den önce yüklemek'],
    ), answer: 0,
    why: W('الـ hydration الكامل يعيد تشغيل كل المكوّنات في المتصفح حتى الثابتة منها. أدوات مثل Astro أو Nuxt Islands تتجنب ذلك.', 'Full hydration re-runs every component in the browser, even the static ones. Tools like Astro or Nuxt Islands avoid that.', 'Tam hydration statik olanlar dahil her bileşeni tarayıcıda yeniden çalıştırır. Astro ya da Nuxt Islands gibi araçlar bundan kaçınır.') }),
  choice({ id: 'p-s2-lighthouse-ci', level: 'senior', topic,
    prompt: W('كيف تمنع تراجع الأداء تدريجيًا مع كل ميزة جديدة؟', 'How do you stop performance from slowly regressing with every new feature?', 'Her yeni özellikle performansın yavaş yavaş gerilemesini nasıl önlersin?'),
    options: L3(['ميزانيات أداء تُفحص تلقائيًا في CI (مثل Lighthouse CI أو حدود حجم الحزمة) تُفشل الدمج عند التجاوز', 'فحص يدوي كل سنة', 'الاعتماد على شكاوى المستخدمين', 'خادم أقوى كل فترة'],
      ['Performance budgets checked automatically in CI (like Lighthouse CI or bundle size limits) that fail the merge when exceeded', 'A manual check once a year', 'Waiting for user complaints', 'A bigger server every so often'],
      ['CI’da otomatik kontrol edilen ve aşılınca birleştirmeyi başarısız kılan performans bütçeleri (Lighthouse CI ya da paket boyutu sınırları gibi)', 'Yılda bir elle kontrol', 'Kullanıcı şikâyetlerine güvenmek', 'Arada bir daha güçlü sunucu'],
    ), answer: 0,
    why: W('الأداء يتراجع بخطوات صغيرة لا يلاحظها أحد. الفحص الآلي يجعل كل زيادة قرارًا واعيًا.', 'Performance slips in small steps nobody notices. Automated checks make every increase a conscious decision.', 'Performans kimsenin fark etmediği küçük adımlarla geriler. Otomatik kontroller her artışı bilinçli bir karar yapar.') }),
  choice({ id: 'p-s2-rum-attribution', level: 'senior', topic,
    prompt: W('INP سيئ عند المستخدمين، ولا تعرف أي تفاعل هو السبب. كيف تكتشفه؟', 'INP is bad for real users and you do not know which interaction causes it. How do you find out?', 'Gerçek kullanıcılarda INP kötü ve hangi etkileşimin neden olduğunu bilmiyorsun. Nasıl bulursun?'),
    options: L3(['جمع القياسات مع attribution (العنصر ونوع الحدث والسكربت) من متصفحات المستخدمين عبر web-vitals', 'تشغيل Lighthouse مرة أخرى', 'التخمين', 'تعطيل كل الأحداث'],
      ['Collect measurements with attribution (element, event type, script) from users’ browsers via web-vitals', 'Run Lighthouse again', 'Guess', 'Disable every event'],
      ['web-vitals ile kullanıcı tarayıcılarından atıflı ölçümler (öğe, olay türü, script) toplamak', 'Lighthouse’u yeniden çalıştırmak', 'Tahmin etmek', 'Tüm olayları kapatmak']), answer: 0,
    why: W('Lighthouse لا يقيس INP لأنه لا يتفاعل مع الصفحة. بناء الـ attribution يذكر العنصر المسؤول، ومع Long Animation Frames ترى السكربت.', 'Lighthouse cannot measure INP because it does not interact with the page. The attribution build names the element, and Long Animation Frames show the script.', 'Lighthouse sayfayla etkileşmediği için INP ölçemez. Attribution sürümü sorumlu öğeyi söyler; Long Animation Frames de script’i gösterir.') }),
  choice({ id: 'p-s2-facade', level: 'senior', topic,
    prompt: W('صفحة فيها 6 فيديوهات YouTube مضمّنة تحمّل أكثر من 3MB قبل أي تشغيل. ما الحل؟', 'A page with 6 embedded YouTube videos loads over 3 MB before anything is played. The fix?', '6 gömülü YouTube videolu bir sayfa hiçbir şey oynatılmadan 3 MB’tan fazla yüklüyor. Çözüm?'),
    options: L3(['واجهة خفيفة (facade): صورة مصغرة وزر تشغيل، ولا يُحمَّل الـ iframe إلا عند الضغط', 'loading="eager" على الـ iframes', 'زيادة حجم الصفحة المسموح', 'تحميل الفيديوهات بالتوازي'],
      ['A lightweight facade: a thumbnail and play button, with the iframe loaded only on click', 'loading="eager" on the iframes', 'Raise the allowed page weight', 'Load the videos in parallel'],
      ['Hafif bir cephe (facade): küçük resim ve oynat butonu; iframe yalnızca tıklanınca yüklenir', 'iframe’lere loading="eager"', 'İzin verilen sayfa ağırlığını artırmak', 'Videoları paralel yüklemek']), answer: 0,
    why: W('كل iframe يحمّل مشغّلًا كاملًا بسكربتاته. معظم الزوار لا يشغّلون كل الفيديوهات، فلا داعي لدفع الكلفة مسبقًا.', 'Each iframe loads a full player with its scripts. Most visitors do not play every video, so there is no need to pay up front.', 'Her iframe betikleriyle birlikte tam bir oynatıcı yükler. Ziyaretçilerin çoğu her videoyu oynatmaz; bedeli önceden ödemeye gerek yok.') }),
  choice({ id: 'p-s2-loaf', level: 'senior', topic,
    prompt: W('ما فائدة Long Animation Frames API مقارنة بـ Long Tasks؟', 'What does the Long Animation Frames API add compared with Long Tasks?', 'Long Animation Frames API, Long Tasks’e göre ne katar?'),
    options: L3(['يوضح أي سكربت وأي دالة سببت الإطار البطيء، شاملًا الرسم والتخطيط', 'يسرّع الحركات تلقائيًا', 'يقيس سرعة الشبكة', 'لا فرق'],
      ['It shows which script and function caused the slow frame, including rendering and layout', 'It speeds up animations automatically', 'It measures network speed', 'No difference'],
      ['Yavaş kareye hangi script’in ve fonksiyonun neden olduğunu, çizim ve düzen dahil gösterir', 'Animasyonları otomatik hızlandırır', 'Ağ hızını ölçer', 'Fark yok']), answer: 0,
    why: W('Long Tasks تقول «حدث شيء بطيء» فقط، أما LoAF فيذكر مصدر السكربت ومدته، فتعرف إن كان كودك أو سكربت طرف ثالث.', 'Long Tasks only say "something was slow"; LoAF names the script source and its duration, so you know whether it was your code or a third party.', 'Long Tasks yalnızca "bir şey yavaştı" der; LoAF script kaynağını ve süresini belirtir, kendi kodun mu üçüncü taraf mı bilirsin.') }),
  choice({ id: 'p-s2-edge-html', level: 'senior', topic,
    prompt: W('صفحات المنتجات تُرسم في الخادم لكل زائر بسبب اسم المستخدم في الهيدر فقط. كيف تخزنها في CDN؟', 'Product pages are rendered on the server for every visitor just because of the username in the header. How do you cache them on a CDN?', 'Ürün sayfaları yalnızca başlıktaki kullanıcı adı yüzünden her ziyaretçi için sunucuda çiziliyor. CDN’de nasıl önbelleğe alırsın?'),
    options: L3(['تخزين HTML العام للجميع، وجلب الجزء الشخصي (الاسم، السلة) من المتصفح بطلب صغير', 'تخزين نسخة لكل مستخدم', 'إلغاء الكاش', 'وضع اسم المستخدم في الرابط'],
      ['Cache the shared HTML for everyone and fetch the personal bit (name, cart) from the browser with a small request', 'Cache a copy per user', 'Disable caching', 'Put the username in the URL'],
      ['Ortak HTML’i herkes için önbelleğe alıp kişisel kısmı (ad, sepet) tarayıcıdan küçük bir istekle çekmek', 'Kullanıcı başına kopya saklamak', 'Önbelleği kapatmak', 'Kullanıcı adını URL’ye koymak']), answer: 0,
    why: W('جزء صغير شخصي يمنع تخزين الصفحة كلها. فصله يجعل معظم الزوار يأخذون الصفحة من الحافة في أجزاء من الثانية.', 'A small personal bit stops the whole page from being cached. Splitting it out lets most visitors get the page from the edge in milliseconds.', 'Küçük bir kişisel parça tüm sayfanın önbelleğe alınmasını engeller. Ayırmak ziyaretçilerin çoğunun sayfayı uçtan milisaniyeler içinde almasını sağlar.') }),
]
