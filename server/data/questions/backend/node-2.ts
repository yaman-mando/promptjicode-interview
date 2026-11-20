import type { Question } from '#shared/types/quiz'
import { choice, output, WHAT_ORDER } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const topic = 'node' as const

export const NODE_2: Question[] = [
  // ───────── Junior ─────────
  output({ id: 'n-j2-argv', level: 'junior', topic,
    code: `// node app.js
console.log(process.argv.length >= 2)`,
    options: ['true', 'false', '0', 'undefined'], answer: 0,
    why: W('process.argv يحتوي دائمًا مسار node ثم مسار الملف، وبعدهما المعاملات التي يمررها المستخدم.', 'process.argv always holds the node path and the file path first, then any user arguments.', 'process.argv her zaman önce node yolunu ve dosya yolunu, sonra kullanıcı argümanlarını içerir.') }),
  output({ id: 'n-j2-json-parse', level: 'junior', topic,
    code: `const body = '{"name":"Ali","age":30}'
const user = JSON.parse(body)
console.log(user.age + 1)`,
    options: ['31', '301', 'NaN', 'undefined'], answer: 0,
    why: W('JSON.parse يحوّل النص إلى كائن، والرقم 30 يبقى رقمًا فيُجمع.', 'JSON.parse turns the text into an object, and 30 stays a number, so it adds.', 'JSON.parse metni nesneye çevirir; 30 sayı olarak kalır ve toplanır.') }),
  output({ id: 'n-j2-json-invalid', level: 'junior', topic,
    code: `try {
  JSON.parse("{name: 'Ali'}")
} catch (e) {
  console.log(e.name)
}`,
    options: ['SyntaxError', 'TypeError', 'Error', 'undefined'], answer: 0,
    why: W('JSON يتطلب مفاتيح ونصوصًا بعلامات تنصيص مزدوجة. لفّ JSON.parse لجسم الطلب بـ try/catch وأرجع 400.', 'JSON needs double-quoted keys and strings. Wrap JSON.parse of a request body in try/catch and return 400.', 'JSON çift tırnaklı anahtar ve metin ister. İstek gövdesindeki JSON.parse’ı try/catch ile sar ve 400 döndür.') }),
  output({ id: 'n-j2-env-string', level: 'junior', topic,
    code: `process.env.PORT = 3000
console.log(typeof process.env.PORT)`,
    options: ['string', 'number', 'undefined', 'object'], answer: 0,
    why: W('قيم process.env نصوص دائمًا. حوّلها بـ Number(process.env.PORT) قبل استخدامها كرقم.', 'process.env values are always strings. Convert with Number(process.env.PORT) before using it as a number.', 'process.env değerleri her zaman metindir. Sayı olarak kullanmadan önce Number(process.env.PORT) ile çevir.') }),
  output({ id: 'n-j2-buffer', level: 'junior', topic,
    code: `const b = Buffer.from("hi")
console.log(b.length, b.toString("base64"))`,
    options: ['2 aGk=', '2 hi', '4 aGk=', '2 68 69'], answer: 0,
    why: W('Buffer بيانات ثنائية: "hi" بايتان، وtoString("base64") يحوّلها إلى Base64.', 'A Buffer is binary data: "hi" is two bytes, and toString("base64") encodes it to Base64.', 'Buffer ikili veridir: "hi" iki bayttır; toString("base64") onu Base64’e çevirir.') }),
  output({ id: 'n-j2-settimeout-order', level: 'junior', topic, prompt: WHAT_ORDER,
    code: `setTimeout(() => console.log("timer"), 0)
console.log("sync")`,
    options: ['sync, timer', 'timer, sync', 'sync', 'timer'], answer: 0,
    why: W('حتى مع 0، الـ callback ينتظر انتهاء الكود المتزامن الحالي.', 'Even with 0, the callback waits for the current synchronous code to finish.', '0 olsa bile callback mevcut senkron kodun bitmesini bekler.') }),
  output({ id: 'n-j2-url', level: 'junior', topic,
    code: `const u = new URL("https://api.example.com/users?page=2")
console.log(u.pathname, u.searchParams.get("page"))`,
    options: ['/users 2', 'users page=2', '/users?page=2 2', 'api.example.com 2'], answer: 0,
    why: W('URL وURLSearchParams مدمجان في Node، ويغنيان عن تقسيم الرابط يدويًا.', 'URL and URLSearchParams are built into Node and save you from splitting URLs by hand.', 'URL ve URLSearchParams Node’da yerleşiktir; URL’yi elle bölmekten kurtarır.') }),
  output({ id: 'n-j2-async-await', level: 'junior', topic,
    code: `async function getUser() {
  return { id: 1 }
}
const u = await getUser()
console.log(u.id)`,
    options: ['1', 'undefined', 'Promise { { id: 1 } }', 'Error'], answer: 0,
    why: W('الدالة async ترجع Promise دائمًا، وawait ينتظر قيمتها.', 'An async function always returns a Promise, and await unwraps its value.', 'async fonksiyon her zaman Promise döndürür; await değerini açar.') }),
  choice({ id: 'n-j2-npm-dev', level: 'junior', topic,
    prompt: W('أين تُثبّت أداة مثل nodemon تحتاجها فقط أثناء التطوير؟', 'Where do you install a tool like nodemon that you only need while developing?', 'Sadece geliştirme sırasında gereken nodemon gibi bir aracı nereye kurarsın?'),
    options: ['npm install -D nodemon', 'npm install nodemon -g --prod', 'npm run nodemon', 'npm publish nodemon'], answer: 0, codeLang: 'bash',
    why: W('-D يضيفها إلى devDependencies فلا تُثبَّت في الإنتاج عند npm ci --omit=dev.', '-D adds it to devDependencies, so it is skipped in production with npm ci --omit=dev.', '-D onu devDependencies’e ekler; canlıda npm ci --omit=dev ile atlanır.') }),
  choice({ id: 'n-j2-express-json', level: 'junior', topic,
    prompt: W('في Express، req.body يصل undefined عند إرسال JSON. ما الذي ينقص؟', 'In Express, req.body is undefined when JSON is sent. What is missing?', 'Express’te JSON gönderilince req.body undefined geliyor. Eksik olan ne?'),
    options: ['app.use(express.json())', 'app.use(cors())', 'app.listen(3000)', 'res.json()'], answer: 0, codeLang: 'js',
    why: W('Express لا يقرأ جسم الطلب افتراضيًا. express.json() يحلل الطلبات ذات Content-Type: application/json.', 'Express does not parse the body by default. express.json() parses requests with Content-Type: application/json.', 'Express gövdeyi varsayılan olarak ayrıştırmaz. express.json() Content-Type: application/json isteklerini ayrıştırır.') }),
  choice({ id: 'n-j2-status', level: 'junior', topic,
    prompt: W('كيف ترجع خطأ «غير موجود» مع رسالة JSON في Express؟', 'How do you return a "not found" error with a JSON message in Express?', 'Express’te JSON mesajlı "bulunamadı" hatasını nasıl döndürürsün?'),
    options: ["res.status(404).json({ error: 'Not found' })", "res.send(404, 'Not found')", "throw 404", "res.json(404)"], answer: 0, codeLang: 'js',
    why: W('status يضبط رمز HTTP، وjson يرسل الجسم ويضبط Content-Type. res.json(404) يرسل الرقم 404 بحالة 200.', 'status sets the HTTP code, and json sends the body with the right Content-Type. res.json(404) sends the number 404 with status 200.', 'status HTTP kodunu ayarlar, json gövdeyi doğru Content-Type ile gönderir. res.json(404), 404 sayısını 200 durumuyla gönderir.') }),
  choice({ id: 'n-j2-esm', level: 'junior', topic,
    prompt: W('ما الذي يجعل Node يعامل ملفات .js كـ ES modules (import/export)؟', 'What makes Node treat .js files as ES modules (import/export)?', 'Node’un .js dosyalarını ES modülü (import/export) olarak ele almasını ne sağlar?'),
    options: {

      ar: ['"type": "module" في package.json', 'تثبيت Babel دائمًا', 'تسمية الملف index.js', 'تشغيل node --watch'],

      en: ['"type": "module" in package.json', 'Always installing Babel', 'Naming the file index.js', 'Running node --watch'],

      tr: ['package.json’da "type": "module"', 'Her zaman Babel kurmak', 'Dosyaya index.js adı vermek', 'node --watch çalıştırmak'],

    }, answer: 0,
    why: W('بدونها تكون .js بصيغة CommonJS (require). ويمكن أيضًا استخدام امتداد .mjs لملف واحد.', 'Without it, .js files are CommonJS (require). You can also use the .mjs extension for a single file.', 'Onsuz .js dosyaları CommonJS’tir (require). Tek bir dosya için .mjs uzantısı da kullanılabilir.') }),
  choice({ id: 'n-j2-readfile-sync', level: 'junior', topic,
    prompt: W('لماذا يُنصح بتجنب fs.readFileSync داخل معالج طلبات الخادم؟', 'Why avoid fs.readFileSync inside a server request handler?', 'Sunucu istek işleyicisinde fs.readFileSync’ten neden kaçınılır?'),
    options: L3(['لأنه يوقف الـ event loop فتنتظر كل الطلبات الأخرى', 'لأنه لا يقرأ ملفات JSON', 'لأنه محذوف من Node', 'لأنه يقرأ الملف مرتين'], ['It blocks the event loop, so every other request waits', 'It cannot read JSON files', 'It was removed from Node', 'It reads the file twice'], ['Event loop’u durdurur, diğer tüm istekler bekler', 'JSON dosyalarını okuyamaz', 'Node’dan kaldırıldı', 'Dosyayı iki kez okur']), answer: 0,
    why: W('استخدم fs/promises مع await داخل الطلبات. النسخة المتزامنة مقبولة عند بدء التشغيل فقط، مثل قراءة ملف إعدادات.', 'Use fs/promises with await inside requests. The sync version is fine only at startup, like reading a config file.', 'İsteklerde await ile fs/promises kullan. Senkron sürüm sadece başlangıçta, ör. ayar dosyası okurken uygundur.') }),

  // ───────── Mid ─────────
  output({ id: 'n-m2-nexttick', level: 'mid', topic, prompt: WHAT_ORDER,
    code: `// inside a callback, e.g. a request handler
setTimeout(() => {
  setTimeout(() => console.log("timeout"), 0)
  Promise.resolve().then(() => console.log("promise"))
  process.nextTick(() => console.log("tick"))
  console.log("sync")
}, 0)`,
    options: ['sync, tick, promise, timeout', 'sync, promise, tick, timeout', 'tick, sync, promise, timeout', 'sync, timeout, tick, promise'], answer: 0,
    why: W('بعد الكود المتزامن تُنفّذ طابور nextTick، ثم الـ microtasks (Promise)، ثم مرحلة المؤقتات.', 'After sync code, Node drains the nextTick queue, then microtasks (Promise), then the timers phase.', 'Senkron koddan sonra Node önce nextTick kuyruğunu, sonra microtask’leri (Promise), sonra zamanlayıcı aşamasını işler.') }),
  output({ id: 'n-m2-promise-all-fail', level: 'mid', topic,
    code: `const ok = Promise.resolve(1)
const bad = Promise.reject(new Error("db down"))
try {
  await Promise.all([ok, bad])
} catch (e) {
  console.log(e.message)
}`,
    options: ['db down', '1', '[1, Error]', 'undefined'], answer: 0,
    why: W('Promise.all يفشل عند أول رفض. إذا أردت نتيجة كل وعد استخدم Promise.allSettled.', 'Promise.all rejects on the first failure. Use Promise.allSettled to get every result.', 'Promise.all ilk hatada reddeder. Her sonucu almak için Promise.allSettled kullan.') }),
  output({ id: 'n-m2-allsettled', level: 'mid', topic,
    code: `const r = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject(new Error("x")),
])
console.log(r.map(x => x.status).join(" "))`,
    options: ['fulfilled rejected', 'fulfilled fulfilled', 'rejected', 'Error'], answer: 0,
    why: W('allSettled ينتظر كل الوعود ولا يرفض أبدًا، ويعطي status لكل واحد.', 'allSettled waits for every promise, never rejects, and gives each one a status.', 'allSettled tüm promise’leri bekler, asla reddetmez ve her birine bir status verir.') }),
  output({ id: 'n-m2-forEach-async', level: 'mid', topic, prompt: WHAT_ORDER,
    code: `const wait = ms => new Promise(r => setTimeout(r, ms))
const ids = [1, 2]
ids.forEach(async id => {
  await wait(10)
  console.log("saved", id)
})
console.log("done")`,
    options: ['done, saved 1, saved 2', 'saved 1, saved 2, done', 'done', 'saved 1, done, saved 2'], answer: 0,
    why: W('forEach لا ينتظر الدوال async. استخدم for...of مع await للتسلسل، أو Promise.all للتوازي.', 'forEach does not wait for async callbacks. Use for...of with await for order, or Promise.all for parallel.', 'forEach async callback’leri beklemez. Sıra için await’li for...of, paralel için Promise.all kullan.') }),
  output({ id: 'n-m2-abort', level: 'mid', topic,
    code: `const ac = new AbortController()
ac.signal.addEventListener("abort", () => console.log("cancelled"))
ac.abort()
console.log(ac.signal.aborted)`,
    options: ['cancelled, true', 'true, cancelled', 'false', 'cancelled, false'], answer: 0,
    why: W('abort يطلق الحدث فورًا. تمرير signal إلى fetch أو استعلام قاعدة بيانات يسمح بإلغاء العمل عند انقطاع الطلب أو انتهاء المهلة.', 'abort fires the event right away. Passing the signal to fetch or a DB query lets you cancel work on timeout or disconnect.', 'abort olayı hemen tetikler. signal’i fetch’e veya bir DB sorgusuna vermek, zaman aşımında ya da bağlantı kopunca işi iptal etmeyi sağlar.') }),
  output({ id: 'n-m2-structured-clone', level: 'mid', topic,
    code: `const a = { d: new Date(0), tags: ["x"] }
const b = structuredClone(a)
b.tags.push("y")
console.log(a.tags.length, b.d instanceof Date)`,
    options: ['1 true', '2 true', '1 false', '2 false'], answer: 0,
    why: W('structuredClone نسخ عميق مدمج يحافظ على Date وMap وSet، على عكس JSON.parse(JSON.stringify()).', 'structuredClone is a built-in deep copy that keeps Date, Map and Set, unlike JSON.parse(JSON.stringify()).', 'structuredClone, JSON.parse(JSON.stringify())’in aksine Date, Map ve Set’i koruyan yerleşik derin kopyadır.') }),
  output({ id: 'n-m2-error-cause', level: 'mid', topic,
    code: `try {
  throw new Error("save failed", { cause: new Error("timeout") })
} catch (e) {
  console.log(e.message, "<-", e.cause.message)
}`,
    options: ['save failed <- timeout', 'timeout <- save failed', 'save failed <- undefined', 'Error'], answer: 0,
    why: W('cause يربط الخطأ الأصلي بالخطأ الجديد، فلا تضيع معلومات السبب في السجلات.', 'cause links the original error to the new one, so the root cause is not lost in logs.', 'cause asıl hatayı yenisine bağlar; kök neden loglarda kaybolmaz.') }),
  output({ id: 'n-m2-searchparams', level: 'mid', topic,
    code: `const qs = new URLSearchParams({ q: "a b", page: 2 })
console.log(qs.toString())`,
    options: ['q=a+b&page=2', 'q=a b&page=2', 'q=a%20b&page=2', '{"q":"a b","page":2}'], answer: 0,
    why: W('URLSearchParams يرمّز القيم تلقائيًا (المسافة تصبح +) ويحوّل الأرقام إلى نصوص. أفضل من بناء الرابط بدمج النصوص.', 'URLSearchParams encodes values for you (a space becomes +) and turns numbers into strings. Safer than gluing strings.', 'URLSearchParams değerleri kendisi kodlar (boşluk + olur) ve sayıları metne çevirir. Metin yapıştırmaktan daha güvenli.') }),
  choice({ id: 'n-m2-error-middleware', level: 'mid', topic,
    prompt: W('كيف يعرف Express أن هذه الدالة معالج أخطاء؟', 'How does Express know this function is an error handler?', 'Express bu fonksiyonun hata işleyici olduğunu nasıl anlar?'),
    code: `app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error' })
})`, codeLang: 'js',
    options: L3(['من وجود أربعة معاملات (err أولًا)، ويُسجَّل بعد كل المسارات', 'من اسم المتغير err فقط', 'لأنه يرجع 500', 'يجب تسجيله قبل المسارات'], ['It has four parameters (err first), and it is registered after all routes', 'Only from the name err', 'Because it returns 500', 'It must be registered before routes'], ['Dört parametresi vardır (önce err) ve tüm rotalardan sonra kaydedilir', 'Sadece err adından', '500 döndürdüğü için', 'Rotalardan önce kaydedilmeli']), answer: 0,
    why: W('Express يعدّ المعاملات. وفي Express 5 تصل الوعود المرفوضة في المسارات إلى هذا المعالج تلقائيًا.', 'Express counts the parameters. In Express 5, rejected promises in routes reach this handler automatically.', 'Express parametreleri sayar. Express 5’te rotalardaki reddedilen promise’ler bu işleyiciye otomatik ulaşır.') }),
  choice({ id: 'n-m2-stream-pipe', level: 'mid', topic,
    prompt: W('ما أفضل طريقة لإرسال ملف حجمه 2GB للمستخدم؟', 'What is the best way to send a 2 GB file to a user?', 'Kullanıcıya 2 GB’lık bir dosyayı göndermenin en iyi yolu nedir?'),
    options: ["pipeline(fs.createReadStream(path), res)", "res.send(await fs.promises.readFile(path))", "res.json(fs.readFileSync(path))", "res.end(path)"], answer: 0, codeLang: 'js',
    why: W('الـ stream يرسل الملف قطعًا ويحترم الضغط العكسي (backpressure)، أما readFile فيحمل الملف كله في الذاكرة.', 'A stream sends the file in chunks and respects backpressure; readFile loads the whole file into memory.', 'Stream dosyayı parça parça gönderir ve geri basıncı (backpressure) gözetir; readFile tüm dosyayı belleğe yükler.') }),
  choice({ id: 'n-m2-graceful', level: 'mid', topic,
    prompt: W('عند إعادة النشر يرسل Docker إشارة SIGTERM. ماذا يجب أن يفعل الخادم؟', 'On redeploy Docker sends SIGTERM. What should the server do?', 'Yeniden dağıtımda Docker SIGTERM gönderir. Sunucu ne yapmalı?'),
    options: L3(['يتوقف عن قبول طلبات جديدة، ويكمل الحالية، ثم يغلق الاتصالات ويخرج', 'يخرج فورًا بـ process.exit(0)', 'يتجاهل الإشارة', 'يعيد تشغيل نفسه'], ['Stop accepting new requests, finish current ones, close connections, then exit', 'Exit at once with process.exit(0)', 'Ignore the signal', 'Restart itself'], ['Yeni istek almayı bırakıp mevcutları bitirmeli, bağlantıları kapatıp çıkmalı', 'process.exit(0) ile hemen çıkmalı', 'Sinyali yok saymalı', 'Kendini yeniden başlatmalı']), answer: 0,
    why: W('process.on("SIGTERM") ثم server.close() وإغلاق اتصال قاعدة البيانات، حتى لا تنقطع طلبات المستخدمين في منتصفها.', 'process.on("SIGTERM"), then server.close() and closing the DB pool, so user requests are not cut mid-way.', 'process.on("SIGTERM"), ardından server.close() ve DB havuzunu kapatmak; kullanıcı istekleri yarıda kesilmez.') }),
  choice({ id: 'n-m2-validate', level: 'mid', topic,
    prompt: W('ما الطريقة الأنظف للتحقق من جسم طلب POST /users في Node؟', 'What is the cleanest way to validate a POST /users body in Node?', 'Node’da POST /users gövdesini doğrulamanın en temiz yolu nedir?'),
    options: L3(['مخطط (schema) بمكتبة مثل Zod، ورفض الطلب بـ 400 إن فشل', 'الاعتماد على تحقق الواجهة الأمامية', 'if لكل حقل منتشرة في الكود', 'حفظ الجسم كما هو ثم التحقق لاحقًا'], ['A schema with a library like Zod, rejecting with 400 on failure', 'Relying on frontend validation', 'Scattered ifs for each field', 'Save the body as-is and check later'], ['Zod gibi bir kütüphaneyle şema; başarısızsa 400 ile reddetmek', 'Ön yüz doğrulamasına güvenmek', 'Her alan için dağınık if’ler', 'Gövdeyi olduğu gibi kaydedip sonra kontrol etmek']), answer: 0,
    why: W('المخطط يتحقق ويحوّل الأنواع في مكان واحد، ويعطي نوع TypeScript للبيانات. تحقق الواجهة يمكن تجاوزه بسهولة.', 'A schema validates and coerces in one place and gives you a TypeScript type. Frontend checks are easy to bypass.', 'Şema doğrulamayı ve tip dönüşümünü tek yerde yapar, TypeScript tipi de verir. Ön yüz kontrolleri kolayca atlatılır.') }),
  choice({ id: 'n-m2-env-validate', level: 'mid', topic,
    prompt: W('نُشر التطبيق بدون DATABASE_URL، فظهر الخطأ بعد ساعة عند أول استعلام. ما الحل؟', 'The app shipped without DATABASE_URL and failed an hour later on the first query. The fix?', 'Uygulama DATABASE_URL olmadan yayınlandı ve bir saat sonra ilk sorguda çöktü. Çözüm?'),
    options: L3(['التحقق من متغيرات البيئة عند بدء التشغيل والخروج برسالة واضحة', 'وضع قيمة افتراضية داخل الكود', 'إعادة تشغيل الخادم كل ساعة', 'تسجيل الخطأ فقط'], ['Validate env vars at startup and exit with a clear message', 'Put a default value in the code', 'Restart the server every hour', 'Just log the error'], ['Başlangıçta ortam değişkenlerini doğrulayıp açık bir mesajla çıkmak', 'Koda varsayılan değer koymak', 'Sunucuyu her saat yeniden başlatmak', 'Sadece hatayı loglamak']), answer: 0,
    why: W('«افشل مبكرًا»: النشر الخاطئ يتوقف فورًا ويظهر في سجل النشر، بدل أن يفاجئ المستخدمين لاحقًا.', 'Fail fast: a bad deploy stops at once and shows in the deploy log, instead of surprising users later.', 'Erken başarısız ol: hatalı dağıtım hemen durur ve dağıtım logunda görünür, kullanıcıları sonra şaşırtmaz.') }),

  // ───────── Senior ─────────
  output({ id: 'n-s2-setimmediate', level: 'senior', topic, prompt: WHAT_ORDER,
    code: `setTimeout(() => {
  setImmediate(() => console.log("immediate"))
  queueMicrotask(() => console.log("micro"))
  process.nextTick(() => console.log("tick"))
}, 0)`,
    options: ['tick, micro, immediate', 'micro, tick, immediate', 'immediate, tick, micro', 'tick, immediate, micro'], answer: 0,
    why: W('بعد كل callback ينفذ Node طابور nextTick ثم الـ microtasks، وsetImmediate في مرحلة check لاحقًا. ملاحظة: في المستوى الأعلى لملف ES module ينعكس أول اثنين، لأن الملف نفسه يعمل كـ microtask.', 'After each callback Node drains nextTick, then microtasks; setImmediate runs later in the check phase. Note: at the top level of an ES module the first two swap, because the module itself runs as a microtask.', 'Her callback’ten sonra Node önce nextTick’i, sonra microtask’leri işler; setImmediate daha sonra check aşamasında çalışır. Not: bir ES modülünün en üst seviyesinde ilk ikisi yer değiştirir, çünkü modülün kendisi bir microtask olarak çalışır.') }),
  output({ id: 'n-s2-unhandled', level: 'senior', topic,
    code: `async function save() { throw new TypeError("bad input") }
save()
console.log("after")`,
    options: ['after, TypeError', 'TypeError', 'after', 'TypeError, after'], answer: 0,
    why: W('بدون await أو catch يصبح الرفض غير معالج. منذ Node 15 هذا يُسقط العملية افتراضيًا، فلا تترك وعدًا بدون معالجة.', 'Without await or catch the rejection is unhandled. Since Node 15 that crashes the process by default, so never leave a promise unhandled.', 'await veya catch olmadan red işlenmemiş kalır. Node 15’ten beri bu varsayılan olarak süreci çökertir; promise’i asla işlenmemiş bırakma.') }),
  output({ id: 'n-s2-await-loop-time', level: 'senior', topic,
    code: `const wait = ms => new Promise(r => setTimeout(r, ms))
const t = Date.now()
await Promise.all([wait(50), wait(50), wait(50)])
console.log(Date.now() - t < 120)`,
    options: ['true', 'false', 'undefined', 'Error'], answer: 0,
    why: W('الوعود الثلاثة تعمل بالتوازي فتنتهي بعد نحو 50ms. لو استخدمت await داخل for لأخذت 150ms.', 'The three run in parallel and finish in about 50 ms. await inside a for loop would take 150 ms.', 'Üçü paralel çalışır ve yaklaşık 50 ms’de biter. for içinde await 150 ms sürerdi.') }),
  output({ id: 'n-s2-closure-leak', level: 'senior', topic,
    code: `const cache = new Map()
function getUser(id) {
  if (!cache.has(id)) cache.set(id, { id })
  return cache.get(id)
}
for (let i = 0; i < 1000; i++) getUser(i)
console.log(cache.size)`,
    options: ['1000', '1', '0', '100'], answer: 0,
    why: W('Map عام بدون حد يكبر مع كل مفتاح جديد ولا يُفرَّغ: تسريب ذاكرة كلاسيكي. استخدم LRU بحد أقصى أو مدة صلاحية، أو Redis.', 'An unbounded global Map grows with every new key and is never emptied: a classic memory leak. Use an LRU with a size limit or TTL, or Redis.', 'Sınırsız global bir Map her yeni anahtarla büyür ve hiç boşalmaz: klasik bellek sızıntısı. Boyut sınırlı veya TTL’li bir LRU ya da Redis kullan.') }),
  output({ id: 'n-s2-weakmap', level: 'senior', topic,
    code: `const meta = new WeakMap()
let req = { url: "/" }
meta.set(req, { start: 1 })
console.log(meta.has(req), typeof meta.size)`,
    options: ['true undefined', 'true number', 'false undefined', 'true object'], answer: 0,
    why: W('WeakMap لا يمنع حذف المفتاح من الذاكرة عند زوال المراجع إليه، ولذلك لا يملك size ولا يمكن المرور عليه.', 'A WeakMap does not keep its keys alive once nothing else references them, which is why it has no size and cannot be iterated.', 'WeakMap, başka referans kalmayınca anahtarlarını hayatta tutmaz; bu yüzden size’ı yoktur ve üzerinde dolaşılamaz.') }),
  output({ id: 'n-s2-timeout-race', level: 'senior', topic,
    code: `const slow = new Promise(r => setTimeout(() => r("data"), 100))
const timeout = new Promise((_, j) => setTimeout(() => j(new Error("timeout")), 20))
try {
  console.log(await Promise.race([slow, timeout]))
} catch (e) {
  console.log(e.message)
}`,
    options: ['timeout', 'data', 'data, timeout', 'undefined'], answer: 0,
    why: W('race يأخذ نتيجة أول وعد ينتهي. لكن الطلب البطيء يبقى يعمل؛ للإلغاء الحقيقي استخدم AbortSignal.timeout().', 'race settles with whichever finishes first. The slow call keeps running, though; for real cancelling use AbortSignal.timeout().', 'race ilk biten promise ile sonuçlanır. Ama yavaş çağrı çalışmaya devam eder; gerçek iptal için AbortSignal.timeout() kullan.') }),
  output({ id: 'n-s2-sort-default', level: 'senior', topic,
    code: `console.log([10, 9, 1].sort())`,
    options: ['[ 1, 10, 9 ]', '[ 1, 9, 10 ]', '[ 10, 9, 1 ]', '[ 9, 10, 1 ]'], answer: 0,
    why: W('sort بدون دالة مقارنة يرتب كنصوص. للأرقام: sort((a, b) => a - b). خطأ شائع في ترتيب نتائج API.', 'sort with no comparator sorts as strings. For numbers: sort((a, b) => a - b). A common bug when ordering API results.', 'Karşılaştırıcısız sort metin olarak sıralar. Sayılar için: sort((a, b) => a - b). API sonuçlarını sıralarken yaygın bir hata.') }),
  choice({ id: 'n-s2-cpu-block', level: 'senior', topic,
    prompt: W('مسار يولّد تقرير PDF ثقيل بالحساب يجعل الـ API كله بطيئًا. ما الحل المناسب؟', 'A route that builds a CPU-heavy PDF report slows the whole API. What is the right fix?', 'CPU yoğun bir PDF raporu oluşturan rota tüm API’yi yavaşlatıyor. Doğru çözüm nedir?'),
    options: L3(['نقل العمل إلى worker_threads أو طابور مهام بعمليات منفصلة', 'جعل الدالة async', 'زيادة الذاكرة', 'استخدام setTimeout(fn, 0)'], ['Move the work to worker_threads or a job queue with separate processes', 'Make the function async', 'Add more memory', 'Use setTimeout(fn, 0)'], ['İşi worker_threads’e veya ayrı süreçli bir iş kuyruğuna taşımak', 'Fonksiyonu async yapmak', 'Bellek eklemek', 'setTimeout(fn, 0) kullanmak']), answer: 0,
    why: W('async لا يجعل الحساب الثقيل غير متزامن؛ الكود يبقى على نفس الخيط ويحجب الـ event loop.', 'async does not make heavy computation non-blocking; the code still runs on the same thread and blocks the event loop.', 'async ağır hesaplamayı engellemesiz yapmaz; kod aynı thread’de çalışır ve event loop’u bloklar.') }),
  choice({ id: 'n-s2-cluster-session', level: 'senior', topic,
    prompt: W('شغّلت 4 نسخ من التطبيق خلف موازن أحمال، فصار المستخدم يخرج من حسابه عشوائيًا. ما السبب؟', 'You run 4 app instances behind a load balancer and users get logged out randomly. Why?', 'Uygulamanın 4 kopyasını yük dengeleyici arkasında çalıştırdın; kullanıcılar rastgele oturumdan düşüyor. Neden?'),
    options: L3(['الجلسات محفوظة في ذاكرة كل نسخة؛ يجب نقلها إلى مخزن مشترك مثل Redis', 'موازن الأحمال معطّل', 'الكوكيز لا تعمل مع HTTPS', 'Node لا يدعم أكثر من نسخة'], ['Sessions live in each instance’s memory; move them to a shared store like Redis', 'The load balancer is broken', 'Cookies do not work over HTTPS', 'Node cannot run more than one instance'], ['Oturumlar her kopyanın belleğinde; Redis gibi ortak bir depoya taşınmalı', 'Yük dengeleyici bozuk', 'Çerezler HTTPS’te çalışmaz', 'Node birden fazla kopya çalıştıramaz']), answer: 0,
    why: W('كل طلب قد يذهب لنسخة مختلفة لا تعرف الجلسة. الخادم بلا حالة + مخزن مشترك يسمح بالتوسع الأفقي.', 'Each request may hit a different instance that does not know the session. Stateless servers plus a shared store let you scale out.', 'Her istek oturumu bilmeyen farklı bir kopyaya gidebilir. Durumsuz sunucular ve ortak bir depo yatay ölçeklemeyi sağlar.') }),
  choice({ id: 'n-s2-prototype-pollution', level: 'senior', topic,
    prompt: W('دالة دمج عميق تأخذ JSON من المستخدم. أي جسم طلب قد يسبب prototype pollution؟', 'A deep-merge function takes user JSON. Which body can cause prototype pollution?', 'Derin birleştirme fonksiyonu kullanıcı JSON’u alıyor. Hangi gövde prototype pollution’a yol açabilir?'),
    options: ['{"__proto__": {"isAdmin": true}}', '{"isAdmin": "true"}', '{"name": "<script>"}', '{"id": 1e309}'], answer: 0, codeLang: 'json',
    why: W('الدمج الساذج يكتب على Object.prototype فيصبح isAdmin صحيحًا لكل الكائنات. تجاهل __proto__ وconstructor، أو تحقق بمخطط، أو استخدم Object.create(null).', 'A naive merge writes onto Object.prototype, making isAdmin true on every object. Skip __proto__ and constructor, validate with a schema, or use Object.create(null).', 'Saf bir birleştirme Object.prototype’a yazar ve isAdmin her nesnede true olur. __proto__ ve constructor’ı atla, şemayla doğrula ya da Object.create(null) kullan.') }),
  choice({ id: 'n-s2-pool', level: 'senior', topic,
    prompt: W('تحت الضغط تظهر أخطاء «too many connections» من PostgreSQL. ما السبب الأرجح؟', 'Under load PostgreSQL reports "too many connections". Most likely cause?', 'Yük altında PostgreSQL "too many connections" hatası veriyor. En olası sebep?'),
    options: L3(['إنشاء اتصال جديد لكل طلب بدل pool مشترك بحد أقصى', 'الاستعلامات كثيرة الأعمدة', 'استخدام async/await', 'الفهارس كثيرة'], ['Opening a new connection per request instead of one shared, capped pool', 'Queries with many columns', 'Using async/await', 'Too many indexes'], ['Ortak, sınırlı bir havuz yerine her istekte yeni bağlantı açmak', 'Çok sütunlu sorgular', 'async/await kullanmak', 'Çok fazla indeks']), answer: 0,
    why: W('أنشئ Pool واحدًا عند البدء وأعد استخدامه. ومع نسخ كثيرة أو serverless استخدم PgBouncer.', 'Create one Pool at startup and reuse it. With many instances or serverless, add PgBouncer.', 'Başlangıçta tek bir Pool oluştur ve yeniden kullan. Çok kopya veya serverless için PgBouncer ekle.') }),
  choice({ id: 'n-s2-lockfile-ci', level: 'senior', topic,
    prompt: W('لماذا نستخدم npm ci بدل npm install في خط CI؟', 'Why use npm ci instead of npm install in CI?', 'CI’da neden npm install yerine npm ci kullanılır?'),
    options: L3(['يثبت الإصدارات حرفيًا من package-lock ويفشل إن اختلف عن package.json', 'لأنه يحدّث كل الحزم لآخر إصدار', 'لأنه لا يحتاج إنترنت', 'لأنه يثبت devDependencies فقط'], ['It installs exactly what package-lock says and fails if it disagrees with package.json', 'It updates every package to latest', 'It needs no internet', 'It installs only devDependencies'], ['package-lock’taki sürümleri birebir kurar, package.json ile uyuşmazsa başarısız olur', 'Tüm paketleri en son sürüme günceller', 'İnternet gerektirmez', 'Sadece devDependencies kurar']), answer: 0,
    why: W('بناء قابل للتكرار: نفس الإصدارات في كل مرة، فلا يكسر تحديث فرعي لحزمة ما الإنتاج فجأة.', 'Reproducible builds: the same versions every time, so a sneaky minor update cannot break production.', 'Tekrarlanabilir derleme: her seferinde aynı sürümler; sinsi bir küçük güncelleme canlıyı bozamaz.') }),
  choice({ id: 'n-s2-ssrf', level: 'senior', topic,
    prompt: W('ميزة «استيراد صورة من رابط» تجلب أي URL يرسله المستخدم. ما الخطر الأساسي؟', 'An "import image from URL" feature fetches any URL the user sends. The main risk?', '"URL’den resim içe aktar" özelliği kullanıcının gönderdiği her URL’yi çekiyor. Ana risk nedir?'),
    options: L3(['SSRF: طلب عناوين داخلية مثل 169.254.169.254 أو localhost من داخل الخادم', 'XSS في اسم الصورة', 'بطء التحميل فقط', 'لا خطر لأنه GET'], ['SSRF: requesting internal addresses like 169.254.169.254 or localhost from the server', 'XSS in the image name', 'Only slow downloads', 'No risk since it is a GET'], ['SSRF: sunucudan 169.254.169.254 veya localhost gibi iç adreslere istek', 'Resim adında XSS', 'Sadece yavaş indirme', 'GET olduğu için risk yok']), answer: 0,
    why: W('حلّ اسم النطاق وارفض العناوين الخاصة، واسمح بـ https فقط، وحدد الحجم والمهلة، وعطّل التحويلات أو افحص كل تحويل.', 'Resolve the host and block private ranges, allow https only, cap size and time, and disable or re-check redirects.', 'Host’u çözümle ve özel aralıkları engelle, sadece https’e izin ver, boyut ve süreyi sınırla, yönlendirmeleri kapat veya her birini yeniden kontrol et.') }),
  choice({ id: 'n-s2-emitter-error', level: 'senior', topic,
    prompt: W('ماذا يحدث إذا أطلق EventEmitter حدث "error" ولا يوجد مستمع له؟', 'What happens if an EventEmitter emits "error" and nothing listens for it?', 'Bir EventEmitter "error" yayarsa ve dinleyen yoksa ne olur?'),
    options: L3(['يُرمى الخطأ وقد تسقط العملية كلها', 'يُتجاهل بصمت', 'يُسجَّل تحذير فقط', 'يُعاد إطلاقه بعد ثانية'], ['The error is thrown and may crash the whole process', 'It is silently ignored', 'Only a warning is logged', 'It is re-emitted a second later'], ['Hata fırlatılır ve tüm süreci çökertebilir', 'Sessizce yok sayılır', 'Sadece uyarı loglanır', 'Bir saniye sonra yeniden yayılır']), answer: 0,
    why: W('"error" حدث خاص في Node. أضف دائمًا .on("error") للـ streams والاتصالات مثل Redis وsockets.', '"error" is special in Node. Always add .on("error") to streams and connections such as Redis clients and sockets.', '"error" Node’da özel bir olaydır. Stream’lere ve Redis istemcisi, soket gibi bağlantılara her zaman .on("error") ekle.') }),
]
