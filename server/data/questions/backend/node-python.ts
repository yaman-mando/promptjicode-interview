import type { Question } from '#shared/types/quiz'
import { WHAT_LOGS, WHAT_ORDER, choice, output } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const WHAT_PRINTS = W('ماذا يطبع هذا الكود؟', 'What does this code print?', 'Bu kod ne yazdırır?')

export const NODE_PYTHON: Question[] = [
  // ───────── Node.js · Junior ─────────
  choice({
    id: 'n-j-package-lock', level: 'junior', topic: 'node',
    prompt: W('ما وظيفة ملف package-lock.json؟', 'What is package-lock.json for?', 'package-lock.json ne işe yarar?'),
    options: L3(
      ['يثبّت الإصدارات الدقيقة لكل الحزم، فيحصل الجميع على نفس النسخ', 'يمنع تثبيت حزم جديدة', 'يحتوي كلمات مرور npm', 'يُحذف بعد كل تثبيت'],
      ['Locks the exact version of every package, so everyone gets the same ones', 'Stops new packages being installed', 'Holds npm passwords', 'Is deleted after each install'],
      ['Her paketin tam sürümünü sabitler; herkes aynı sürümleri alır', 'Yeni paket kurulmasını engeller', 'npm şifrelerini tutar', 'Her kurulumdan sonra silinir'],
    ),
    answer: 0,
    why: W('package.json يقول «^4.18.0» مثلًا، أما الـ lock فيسجل 4.18.2 بالضبط مع كل الحزم الفرعية. يُرفع إلى Git، وnpm ci يثبّت منه حرفيًا.',
      'package.json may say "^4.18.0"; the lock file records exactly 4.18.2, plus every sub-dependency. Commit it to Git; npm ci installs exactly from it.',
      'package.json "^4.18.0" diyebilir; lock dosyası tam olarak 4.18.2’yi ve tüm alt bağımlılıkları kaydeder. Git’e ekle; npm ci birebir ondan kurar.'),
  }),
  choice({
    id: 'n-j-env-var', level: 'junior', topic: 'node',
    prompt: W('كيف تقرأ متغير البيئة PORT في Node.js؟', 'How do you read the PORT environment variable in Node.js?', 'Node.js’te PORT ortam değişkenini nasıl okursun?'),
    options: ['process.env.PORT', 'window.env.PORT', 'env("PORT")', 'require("PORT")'],
    answer: 0,
    why: W('process.env كائن فيه متغيرات البيئة كنصوص. لذلك نكتب عادة Number(process.env.PORT) || 3000. وwindow غير موجود في Node.',
      'process.env holds environment variables as strings, so you usually write Number(process.env.PORT) || 3000. window does not exist in Node.',
      'process.env ortam değişkenlerini metin olarak tutar; genelde Number(process.env.PORT) || 3000 yazılır. Node’da window yoktur.'),
  }),
  choice({
    id: 'n-j-route-params', level: 'junior', topic: 'node',
    prompt: W('الطلب GET /users/42. ما قيمة req.params.id؟', 'The request is GET /users/42. What is req.params.id?', 'İstek GET /users/42. req.params.id nedir?'),
    code: `app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id, type: typeof req.params.id });
});`, codeLang: 'js',
    options: {
      ar: ["'42' (نص)", '42 (رقم)', 'undefined', ':id'],
      en: ["'42' (a string)", '42 (a number)', 'undefined', ':id'],
      tr: ["'42' (metin)", '42 (sayı)', 'undefined', ':id'],
    },
    answer: 0,
    why: W('معاملات الرابط تصل نصوصًا دائمًا. حوّلها بنفسك بـ Number() وتحقق منها قبل استخدامها في قاعدة البيانات.',
      'Route params always arrive as strings. Convert with Number() yourself and validate before using them in a query.',
      'Rota parametreleri her zaman metin olarak gelir. Number() ile kendin çevir ve sorguda kullanmadan önce doğrula.'),
  }),
  choice({
    id: 'n-j-sync-io', level: 'junior', topic: 'node',
    prompt: W('لماذا نتجنب fs.readFileSync داخل معالج الطلبات في الخادم؟', 'Why avoid fs.readFileSync inside a server request handler?', 'Sunucudaki istek işleyicisinde neden fs.readFileSync’ten kaçınırız?'),
    options: L3(
      ['يوقف الـ event loop، فلا يُخدم أي مستخدم آخر حتى ينتهي', 'لأنه لا يقرأ الملفات الكبيرة', 'لأنه يحذف الملف', 'لأنه لا يعمل على Linux'],
      ['It blocks the event loop, so nobody else is served until it finishes', 'It cannot read big files', 'It deletes the file', 'It does not work on Linux'],
      ['Event loop’u kilitler; bitene kadar başka kimseye hizmet verilmez', 'Büyük dosyaları okuyamaz', 'Dosyayı siler', 'Linux’ta çalışmaz'],
    ),
    answer: 0,
    why: W('Node يخدم كل الطلبات من خيط واحد. النسخة المتزامنة تجعل الجميع ينتظر القرص. استخدم await fs.promises.readFile. أما عند بدء التشغيل فالمتزامنة مقبولة.',
      'Node serves every request from one thread. The sync version makes everyone wait for the disk. Use await fs.promises.readFile. At startup, sync calls are fine.',
      'Node tüm isteklere tek iş parçacığından hizmet verir. Senkron sürüm herkesi diski beklemeye zorlar. await fs.promises.readFile kullan. Başlangıçta senkron çağrılar sorun değil.'),
  }),
  output({
    id: 'n-j-json-string', level: 'junior', topic: 'node',
    prompt: WHAT_LOGS,
    code: `const data = JSON.parse('{"age": "30"}');
console.log(typeof data.age, data.age + 1);`,
    options: ['string 301', 'number 31', 'string 31', 'number 301'],
    answer: 0,
    why: W('القيمة في JSON مكتوبة بين علامتي تنصيص فهي نص، و+ مع نص يدمج: "30" + 1 = "301". حوّل الأرقام القادمة من الطلبات قبل الحساب.',
      'The JSON value is in quotes, so it is a string, and + with a string concatenates: "30" + 1 = "301". Convert numbers that come from requests before doing math.',
      'JSON’daki değer tırnak içinde, yani metin; + metinle birleştirir: "30" + 1 = "301". İsteklerden gelen sayıları hesaplamadan önce çevir.'),
  }),
  choice({
    id: 'n-j-npm-scripts', level: 'junior', topic: 'node',
    prompt: W('ماذا يحدث عند تنفيذ npm run dev؟', 'What happens when you run npm run dev?', 'npm run dev çalıştırınca ne olur?'),
    code: `{
  "scripts": {
    "dev": "node --watch server.js",
    "start": "node server.js"
  }
}`, codeLang: 'json',
    options: L3(
      ['يشغّل الأمر المكتوب في scripts.dev: node --watch server.js', 'يثبّت حزمة اسمها dev', 'ينشر المشروع', 'يشغّل start'],
      ['It runs the command in scripts.dev: node --watch server.js', 'It installs a package called dev', 'It deploys the project', 'It runs start'],
      ['scripts.dev’deki komutu çalıştırır: node --watch server.js', 'dev adlı bir paket kurar', 'Projeyi yayınlar', 'start’ı çalıştırır'],
    ),
    answer: 0,
    why: W('npm run <name> يشغّل أي سكربت من package.json، مع إتاحة أدوات node_modules/.bin. و--watch يعيد التشغيل عند تعديل الملفات.',
      'npm run <name> runs any script from package.json, with node_modules/.bin on the path. --watch restarts when files change.',
      'npm run <ad> package.json’daki herhangi bir betiği çalıştırır; node_modules/.bin yolda olur. --watch dosyalar değişince yeniden başlatır.'),
  }),
  choice({
    id: 'n-j-esm-import', level: 'junior', topic: 'node',
    prompt: W('في مشروع فيه "type": "module" في package.json، ما الطريقة الصحيحة لاستيراد readFile؟', 'In a project with "type": "module" in package.json, what is the right way to import readFile?', 'package.json’da "type": "module" olan bir projede readFile’ı içe aktarmanın doğru yolu nedir?'),
    options: [
      "import { readFile } from 'node:fs/promises'",
      "const { readFile } = require('fs')",
      "include 'fs'",
      "import readFile from fs",
    ],
    answer: 0, codeLang: 'js',
    why: W('مع "type": "module" تعمل الملفات كـ ES modules، فيُستخدم import وexport، وrequire غير موجود افتراضيًا. البادئة node: توضح أنها وحدة مدمجة.',
      'With "type": "module", files are ES modules, so you use import and export, and require is not available by default. The node: prefix marks a built-in module.',
      '"type": "module" ile dosyalar ES modülüdür; import ve export kullanılır, require varsayılan olarak yoktur. node: öneki yerleşik modülü belirtir.'),
  }),

  // ───────── Node.js · Mid ─────────
  output({
    id: 'n-m-nexttick', level: 'mid', topic: 'node',
    prompt: WHAT_ORDER,
    code: `setTimeout(() => {
  Promise.resolve().then(() => console.log('promise'));
  process.nextTick(() => console.log('nextTick'));
  console.log('timeout');
}, 0);`,
    options: ['timeout, nextTick, promise', 'timeout, promise, nextTick', 'nextTick, promise, timeout', 'promise, nextTick, timeout'],
    answer: 0,
    why: W('بعد انتهاء دالة setTimeout، يفرغ Node طابور process.nextTick أولًا، ثم طابور الـ Promises (microtasks). لذلك يأتي nextTick قبل promise.',
      'After the setTimeout callback finishes, Node drains the process.nextTick queue first, then the Promise (microtask) queue. So nextTick comes before promise.',
      'setTimeout geri çağrısı bitince Node önce process.nextTick kuyruğunu, sonra Promise (microtask) kuyruğunu boşaltır. Bu yüzden nextTick, promise’ten önce gelir.'),
  }),
  choice({
    id: 'n-m-immediate-io', level: 'mid', topic: 'node',
    prompt: W('داخل دالة رد قراءة ملف (I/O callback)، أيهما يُطبع أولًا؟', 'Inside a file-read (I/O) callback, which one prints first?', 'Bir dosya okuma (I/O) geri çağrısının içinde hangisi önce yazdırılır?'),
    code: `fs.readFile('data.txt', () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});`, codeLang: 'js',
    options: {
      ar: ['immediate, timeout', 'timeout, immediate', 'عشوائي دائمًا', 'immediate فقط'],
      en: ['immediate, timeout', 'timeout, immediate', 'always random', 'only immediate'],
      tr: ['immediate, timeout', 'timeout, immediate', 'her zaman rastgele', 'sadece immediate'],
    },
    answer: 0,
    why: W('بعد مرحلة I/O يأتي دور مرحلة check التي تشغّل setImmediate، ثم تعود الحلقة إلى مرحلة timers. أما من الكود الرئيسي مباشرة فترتيبهما غير مضمون.',
      'After the I/O phase comes the check phase, which runs setImmediate, and only then does the loop go back to the timers phase. From the main script, their order is not guaranteed.',
      'I/O aşamasından sonra setImmediate’i çalıştıran check aşaması gelir; döngü ancak sonra timers aşamasına döner. Ana betikten çağrılırsa sıraları garanti değildir.'),
  }),
  choice({
    id: 'n-m-emitter-error', level: 'mid', topic: 'node',
    prompt: W('EventEmitter يطلق حدث \'error\' ولا يوجد مستمع له. ماذا يحدث؟', 'An EventEmitter emits \'error\' and nobody listens for it. What happens?', 'Bir EventEmitter \'error\' yayınlıyor ve dinleyen yok. Ne olur?'),
    code: `const e = new EventEmitter();
e.emit('error', new Error('boom'));
console.log('after');`, codeLang: 'js',
    options: L3(
      ['يُرمى الخطأ وقد يتوقف البرنامج، ولا يُطبع after', 'يُتجاهل بصمت', 'يُطبع after ثم الخطأ', 'يُعاد إطلاقه لاحقًا'],
      ['The error is thrown and can crash the process; after is not printed', 'It is silently ignored', 'after prints, then the error', 'It is re-emitted later'],
      ['Hata fırlatılır ve süreç çökebilir; after yazdırılmaz', 'Sessizce yok sayılır', 'Önce after, sonra hata yazılır', 'Daha sonra yeniden yayınlanır'],
    ),
    answer: 0,
    why: W('حدث \'error\' خاص في Node: بدون مستمع يتحول إلى throw. لهذا يجب إضافة .on(\'error\', …) على الـ streams والـ sockets دائمًا.',
      'The \'error\' event is special in Node: with no listener it becomes a throw. That is why streams and sockets should always get an .on(\'error\', …).',
      '\'error\' olayı Node’da özeldir: dinleyici yoksa throw’a dönüşür. Bu yüzden stream’lere ve soketlere her zaman .on(\'error\', …) eklenmelidir.'),
  }),
  choice({
    id: 'n-m-streams', level: 'mid', topic: 'node',
    prompt: W('تريد إرسال ملف حجمه 2GB للمستخدم. ما الطريقة الأفضل؟', 'You need to send a 2 GB file to the user. What is the best way?', 'Kullanıcıya 2 GB’lık bir dosya göndermen gerekiyor. En iyi yol nedir?'),
    options: [
      'fs.createReadStream(path).pipe(res)',
      'res.send(await fs.promises.readFile(path))',
      'res.json(fs.readFileSync(path))',
      'res.send(path)',
    ],
    answer: 0, codeLang: 'js',
    why: W('readFile يحمّل الملف كله في الذاكرة قبل الإرسال، وعدة طلبات معًا تُسقط الخادم. الـ stream يقرأ ويرسل على دفعات صغيرة، وذاكرته ثابتة تقريبًا.',
      'readFile loads the whole file into memory before sending, and a few requests at once will crash the server. A stream reads and sends in small chunks with roughly constant memory.',
      'readFile göndermeden önce tüm dosyayı belleğe alır; aynı anda birkaç istek sunucuyu çökertir. Stream küçük parçalarla okur ve gönderir, bellek kullanımı neredeyse sabittir.'),
  }),
  choice({
    id: 'n-m-sequential-await', level: 'mid', topic: 'node',
    prompt: W('كل دالة من الثلاث تأخذ ثانية واحدة ولا تعتمد على غيرها. كم يستغرق الكود تقريبًا؟', 'Each of the three calls takes one second and they do not depend on each other. Roughly how long does this take?', 'Üç çağrının her biri bir saniye sürüyor ve birbirine bağlı değil. Bu kod yaklaşık ne kadar sürer?'),
    code: `const user = await getUser(id);
const orders = await getOrders(id);
const stats = await getStats(id);`, codeLang: 'js',
    options: L3(
      ['3 ثوانٍ؛ مع Promise.all تصبح ثانية واحدة', 'ثانية واحدة', '0 ثانية', '6 ثوانٍ'],
      ['3 seconds; with Promise.all it would be 1', '1 second', '0 seconds', '6 seconds'],
      ['3 saniye; Promise.all ile 1 saniye olur', '1 saniye', '0 saniye', '6 saniye'],
    ),
    answer: 0,
    why: W('كل await ينتظر انتهاء السابق. ابدأ الثلاثة معًا: const [user, orders, stats] = await Promise.all([getUser(id), getOrders(id), getStats(id)]).',
      'Each await waits for the previous one. Start all three at once: const [user, orders, stats] = await Promise.all([getUser(id), getOrders(id), getStats(id)]).',
      'Her await bir öncekinin bitmesini bekler. Üçünü birlikte başlat: const [user, orders, stats] = await Promise.all([getUser(id), getOrders(id), getStats(id)]).'),
  }),
  choice({
    id: 'n-m-error-middleware', level: 'mid', topic: 'node',
    prompt: W('لماذا لا يُستدعى معالج الأخطاء هذا في Express؟', 'Why is this Express error handler never called?', 'Bu Express hata işleyicisi neden hiç çağrılmıyor?'),
    code: `app.use((err, req, res) => {
  res.status(500).json({ error: 'Something went wrong' });
});`, codeLang: 'js',
    options: L3(
      ['Express يعرف معالج الأخطاء من وجود 4 معاملات: (err, req, res, next)', 'يجب وضعه قبل كل المسارات', 'Express لا يدعم معالجة الأخطاء', 'يجب أن يرجع 400'],
      ['Express spots an error handler by its 4 parameters: (err, req, res, next)', 'It must come before all routes', 'Express has no error handling', 'It must return 400'],
      ['Express hata işleyicisini 4 parametresinden tanır: (err, req, res, next)', 'Tüm rotalardan önce gelmeli', 'Express hata işlemeyi desteklemez', '400 dönmeli'],
    ),
    answer: 0,
    why: W('Express يفحص عدد معاملات الدالة: 3 تعني middleware عادي، و4 تعني معالج أخطاء. أضف next حتى لو لم تستخدمه، وضعه بعد كل المسارات.',
      'Express looks at the function’s parameter count: 3 means normal middleware, 4 means an error handler. Add next even if unused, and register it after all routes.',
      'Express fonksiyonun parametre sayısına bakar: 3 normal middleware, 4 hata işleyici demektir. Kullanmasan da next ekle ve tüm rotalardan sonra kaydet.'),
  }),
  choice({
    id: 'n-m-cpu-heavy', level: 'mid', topic: 'node',
    prompt: W('endpoint يضغط صورًا كبيرة بحسابات ثقيلة في JavaScript، وكل المستخدمين يلاحظون بطء الموقع أثناء ذلك. ما الحل؟', 'An endpoint compresses big images with heavy JavaScript math, and every user notices the site slowing down meanwhile. What is the fix?', 'Bir uç nokta büyük görselleri ağır JavaScript hesaplarıyla sıkıştırıyor ve bu sırada tüm kullanıcılar siteyi yavaş buluyor. Çözüm nedir?'),
    options: L3(
      ['نقل العمل إلى worker_threads أو طابور وخدمة منفصلة', 'استخدام async/await فقط', 'زيادة الذاكرة', 'تقليل عدد المسارات'],
      ['Move the work to worker_threads, or a queue and a separate worker', 'Just use async/await', 'Add more memory', 'Have fewer routes'],
      ['İşi worker_threads’e ya da bir kuyruk ve ayrı bir worker’a taşımak', 'Sadece async/await kullanmak', 'Daha fazla bellek eklemek', 'Rota sayısını azaltmak'],
    ),
    answer: 0,
    why: W('async/await لا يجعل الحساب نفسه يعمل في الخلفية؛ الكود الثقيل ما زال يحجز الخيط الرئيسي. الـ workers تشغّله في خيط آخر فيبقى الخادم سريع الاستجابة.',
      'async/await does not move the computation off the main thread; heavy code still blocks it. Workers run it on another thread so the server stays responsive.',
      'async/await hesaplamanın kendisini arka plana taşımaz; ağır kod ana iş parçacığını yine kilitler. Worker’lar onu başka bir iş parçacığında çalıştırır, sunucu duyarlı kalır.'),
  }),

  // ───────── Node.js · Senior ─────────
  choice({
    id: 'n-s-memory-leak', level: 'senior', topic: 'node',
    prompt: W('ذاكرة الخادم تزيد كل يوم حتى يتوقف. ما السبب في هذا الكود؟', 'Server memory grows every day until it dies. What causes it in this code?', 'Sunucu belleği her gün artıyor ve sonunda çöküyor. Bu kodda sebep nedir?'),
    code: `const cache = new Map();

app.get('/product/:id', async (req, res) => {
  if (!cache.has(req.params.id)) {
    cache.set(req.params.id, await loadProduct(req.params.id));
  }
  res.json(cache.get(req.params.id));
});`, codeLang: 'js',
    options: L3(
      ['الكاش لا يحذف أي شيء أبدًا، حتى للمعرّفات العشوائية؛ استخدم LRU بحجم أقصى وTTL', 'Map بطيئة', 'async داخل المسار', 'res.json يسرّب الذاكرة'],
      ['The cache never evicts anything, even for random ids; use an LRU with a max size and a TTL', 'Map is slow', 'async inside the route', 'res.json leaks memory'],
      ['Önbellek hiçbir şeyi silmiyor, rastgele kimlikler için bile; maksimum boyut ve TTL’li bir LRU kullan', 'Map yavaştır', 'Rotadaki async', 'res.json bellek sızdırır'],
    ),
    answer: 0,
    why: W('كل id جديد يضيف عنصرًا يبقى للأبد، ويمكن لأي شخص طلب ملايين المعرّفات. الكاش في الذاكرة يحتاج حدًا أعلى وسياسة حذف.',
      'Every new id adds an entry that stays forever, and anyone can request millions of ids. An in-memory cache needs a size limit and an eviction policy.',
      'Her yeni kimlik sonsuza kadar kalan bir kayıt ekler ve herkes milyonlarca kimlik isteyebilir. Bellek içi önbelleğin üst sınırı ve silme politikası olmalı.'),
  }),
  choice({
    id: 'n-s-backpressure', level: 'senior', topic: 'node',
    prompt: W('ما الخطأ في نسخ ملف ضخم إلى عميل بطيء بهذه الطريقة؟', 'What is wrong with copying a huge file to a slow client like this?', 'Büyük bir dosyayı yavaş bir istemciye bu şekilde kopyalamanın sorunu nedir?'),
    code: `readable.on('data', (chunk) => {
  res.write(chunk);
});
readable.on('end', () => res.end());`, codeLang: 'js',
    options: L3(
      ['يتجاهل backpressure: write() قد ترجع false والبيانات تتكدس في الذاكرة؛ استخدم pipeline()', 'لا خطأ', 'يجب استخدام res.send', 'data لا يعمل مع الملفات'],
      ['It ignores backpressure: write() can return false and data piles up in memory; use pipeline()', 'Nothing', 'Use res.send instead', 'data does not work with files'],
      ['Backpressure’ı yok sayar: write() false dönebilir ve veri bellekte birikir; pipeline() kullan', 'Sorun yok', 'res.send kullanılmalı', 'data dosyalarla çalışmaz'],
    ),
    answer: 0,
    why: W('القراءة من القرص أسرع من شبكة العميل، فيمتلئ الـ buffer. pipeline (أو pipe) يوقف القراءة عندما يمتلئ ويستأنفها عند حدث drain، ويعالج الأخطاء ويغلق الطرفين.',
      'Reading from disk is faster than the client’s network, so the buffer fills up. pipeline (or pipe) pauses reading when it is full, resumes on drain, handles errors and closes both ends.',
      'Diskten okuma istemcinin ağından hızlıdır; tampon dolar. pipeline (veya pipe) dolunca okumayı durdurur, drain olayında devam ettirir, hataları işler ve iki ucu da kapatır.'),
  }),
  choice({
    id: 'n-s-graceful-shutdown', level: 'senior', topic: 'node',
    prompt: W('المنصة ترسل SIGTERM قبل إيقاف الخادم أثناء النشر. ما التصرف الصحيح؟', 'The platform sends SIGTERM before stopping the server during a deploy. What should the app do?', 'Platform, dağıtım sırasında sunucuyu durdurmadan önce SIGTERM gönderiyor. Uygulama ne yapmalı?'),
    options: L3(
      ['التوقف عن قبول طلبات جديدة، وإنهاء الجارية، وإغلاق اتصالات قاعدة البيانات، ثم الخروج', 'الخروج فورًا بـ process.exit(0)', 'تجاهل الإشارة', 'إعادة تشغيل نفسه'],
      ['Stop accepting new requests, finish the ones in flight, close database connections, then exit', 'Exit at once with process.exit(0)', 'Ignore the signal', 'Restart itself'],
      ['Yeni istek kabul etmeyi bırakmak, süren istekleri bitirmek, veritabanı bağlantılarını kapatmak, sonra çıkmak', 'process.exit(0) ile hemen çıkmak', 'Sinyali yok saymak', 'Kendini yeniden başlatmak'],
    ),
    answer: 0,
    why: W('الخروج الفوري يقطع طلبات المستخدمين في منتصفها. server.close() يوقف القبول ويستدعي دالته بعد آخر طلب، مع مهلة قصوى إذا علق شيء.',
      'Exiting at once cuts users’ requests in half. server.close() stops accepting and calls back after the last request, with a hard timeout in case something hangs.',
      'Hemen çıkmak kullanıcıların isteklerini yarıda keser. server.close() kabulü durdurur ve son istekten sonra geri çağırır; bir şey takılırsa diye kesin bir zaman aşımı da koy.'),
  }),
  choice({
    id: 'n-s-als', level: 'senior', topic: 'node',
    prompt: W('تريد أن يظهر معرّف الطلب (request id) في كل سطر سجل، حتى في دوال بعيدة لا تستقبل req. ما الأداة المناسبة في Node؟', 'You want the request id on every log line, even in deep functions that never receive req. Which Node tool fits?', 'İstek kimliğinin, req almayan derin fonksiyonlar dahil her log satırında görünmesini istiyorsun. Hangi Node aracı uygun?'),
    options: ['AsyncLocalStorage', 'global.requestId', 'process.env.REQUEST_ID', 'localStorage'],
    answer: 0, codeLang: 'js',
    why: W('المتغير العام يُكتب فوقه من طلبات أخرى متزامنة. AsyncLocalStorage يحفظ قيمة تتبع سلسلة العمليات غير المتزامنة لكل طلب على حدة.',
      'A global gets overwritten by other requests running at the same time. AsyncLocalStorage keeps a value that follows each request’s own chain of async calls.',
      'Global bir değişken aynı anda çalışan diğer isteklerce ezilir. AsyncLocalStorage her isteğin kendi asenkron çağrı zincirini izleyen bir değer tutar.'),
  }),
  choice({
    id: 'n-s-module-cache', level: 'senior', topic: 'node',
    prompt: W('ملفان مختلفان يستوردان counter.js ويستدعيان next() مرة لكل منهما. ماذا يرجع الاستدعاء الثاني؟', 'Two different files import counter.js and each calls next() once. What does the second call return?', 'İki farklı dosya counter.js’i içe aktarıyor ve her biri next()’i bir kez çağırıyor. İkinci çağrı ne döndürür?'),
    code: `// counter.js
let count = 0;
export function next() {
  return ++count;
}`, codeLang: 'js',
    options: ['2', '1', 'undefined', 'NaN'],
    answer: 0,
    why: W('الوحدة تُنفَّذ مرة واحدة وتُخزَّن، وكل من يستوردها يحصل على نفس النسخة. لهذا تعمل الوحدات كـ singletons، ولهذا الحالة المشتركة فيها قد تفاجئك في الاختبارات.',
      'A module is evaluated once and cached, and every importer gets the same instance. That is why modules act as singletons, and why shared state in them can surprise you in tests.',
      'Bir modül bir kez çalıştırılıp önbelleğe alınır; onu içe aktaran herkes aynı örneği alır. Modüller bu yüzden singleton gibi davranır ve içlerindeki ortak durum testlerde şaşırtabilir.'),
  }),
  choice({
    id: 'n-s-uncaught', level: 'senior', topic: 'node',
    prompt: W('ما الممارسة الموصى بها في process.on(\'uncaughtException\')؟', 'What is the recommended practice in process.on(\'uncaughtException\')?', 'process.on(\'uncaughtException\') içinde önerilen uygulama nedir?'),
    options: L3(
      ['تسجيل الخطأ ثم إنهاء العملية، وترك مدير العمليات يعيد تشغيلها', 'تجاهل الخطأ والاستمرار', 'إعادة تنفيذ آخر طلب', 'إرسال الخطأ للمستخدم'],
      ['Log the error, then exit, and let the process manager restart it', 'Ignore it and carry on', 'Replay the last request', 'Send the error to the user'],
      ['Hatayı logla, sonra süreci sonlandır ve süreç yöneticisinin yeniden başlatmasına izin ver', 'Yok sayıp devam et', 'Son isteği yeniden çalıştır', 'Hatayı kullanıcıya gönder'],
    ),
    answer: 0,
    why: W('بعد خطأ غير متوقع قد تكون الحالة في الذاكرة غير سليمة (اتصالات نصف مغلقة، أقفال معلقة). الأأمن البدء من جديد بنسخة نظيفة.',
      'After an unexpected error, in-memory state may be broken (half-closed connections, stuck locks). Starting fresh is the safest option.',
      'Beklenmeyen bir hatadan sonra bellekteki durum bozuk olabilir (yarı kapalı bağlantılar, takılı kilitler). En güvenlisi temiz bir örnekle yeniden başlamaktır.'),
  }),

  // ───────── Python · Junior ─────────
  output({
    id: 'py-j-append-list', level: 'junior', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `nums = [1, 2, 3]
nums.append([4, 5])
print(len(nums))`,
    options: ['4', '5', '3', '2'],
    answer: 0,
    why: W('append يضيف عنصرًا واحدًا، وهنا العنصر قائمة كاملة [4, 5]. لإضافة كل العناصر استخدم extend فيصبح الطول 5.',
      'append adds one item, and here that item is the whole list [4, 5]. To add each element, use extend; the length would be 5.',
      'append tek bir öğe ekler; burada o öğe [4, 5] listesinin kendisi. Her öğeyi eklemek için extend kullan; uzunluk 5 olur.'),
  }),
  output({
    id: 'py-j-division', level: 'junior', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `print(7 / 2, 7 // 2)`,
    options: ['3.5 3', '3 3', '3.5 3.5', '3 3.5'],
    answer: 0,
    why: W('/ قسمة عادية ترجع float دائمًا في Python 3، و// قسمة صحيحة تقرّب للأسفل.',
      '/ is true division and always returns a float in Python 3; // is floor division.',
      '/ gerçek bölmedir ve Python 3’te her zaman float döndürür; // tam bölmedir, aşağı yuvarlar.'),
  }),
  output({
    id: 'py-j-fstring', level: 'junior', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `name = "Sara"
age = 30
print(f"{name} is {age + 1}")`,
    options: ['Sara is 31', '{name} is {age + 1}', 'Sara is 301', 'Sara is 30 + 1'],
    answer: 0,
    why: W('السلسلة التي تبدأ بـ f تقيّم ما بين الأقواس { } كتعبير Python. وage رقم، فـ age + 1 = 31.',
      'A string starting with f evaluates whatever is inside { } as a Python expression. age is a number, so age + 1 is 31.',
      'f ile başlayan metin { } içindekini Python ifadesi olarak değerlendirir. age sayıdır, age + 1 = 31.'),
  }),
  output({
    id: 'py-j-dict-get', level: 'junior', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `user = {"name": "Ali"}
print(user.get("age", 0))`,
    options: ['0', 'None', 'KeyError', 'age'],
    answer: 0,
    why: W('get ترجع القيمة الافتراضية (0 هنا) إذا لم يوجد المفتاح، بينما user["age"] ترمي KeyError.',
      'get returns the default (0 here) when the key is missing, while user["age"] raises KeyError.',
      'get, anahtar yoksa varsayılanı (burada 0) döndürür; user["age"] ise KeyError fırlatır.'),
  }),
  output({
    id: 'py-j-string-repeat', level: 'junior', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `print("ab" * 3)`,
    options: ['ababab', 'ab3', 'TypeError', 'aaabbb'],
    answer: 0,
    why: W('ضرب النص في رقم صحيح يكرره. وهذا يعمل مع القوائم أيضًا: [0] * 3 = [0, 0, 0].',
      'Multiplying a string by an integer repeats it. It works for lists too: [0] * 3 is [0, 0, 0].',
      'Bir metni tam sayıyla çarpmak onu tekrarlar. Listelerde de çalışır: [0] * 3 = [0, 0, 0].'),
  }),
  choice({
    id: 'py-j-indentation', level: 'junior', topic: 'python',
    prompt: W('كيف تعرف Python بداية ونهاية جسم الدالة أو الشرط؟', 'How does Python know where a function or if block starts and ends?', 'Python bir fonksiyonun veya if bloğunun nerede başlayıp bittiğini nasıl bilir?'),
    options: L3(
      ['من المسافة البادئة (indentation)', 'من الأقواس { }', 'من كلمة end', 'من الفاصلة المنقوطة'],
      ['From the indentation', 'From { } braces', 'From an end keyword', 'From semicolons'],
      ['Girintiden (indentation)', '{ } parantezlerinden', 'end anahtar kelimesinden', 'Noktalı virgülden'],
    ),
    answer: 0,
    why: W('في Python المسافة جزء من القواعد: بعد النقطتين : تبدأ كتلة بمسافة أكبر، وتنتهي عندما ترجع المسافة. خلط Tab والمسافات يسبب أخطاء.',
      'In Python indentation is part of the syntax: after a colon a deeper-indented block starts, and it ends when the indentation goes back. Mixing tabs and spaces causes errors.',
      'Python’da girinti söz diziminin parçasıdır: iki noktadan sonra daha içeriden bir blok başlar, girinti geri gelince biter. Tab ile boşluğu karıştırmak hata verir.'),
  }),
  output({
    id: 'py-j-none-return', level: 'junior', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `def greet(name):
    print("Hi", name)

result = greet("Omar")
print(result)`,
    options: ['Hi Omar, None', 'Hi Omar, Hi Omar', 'Hi Omar', 'None'],
    answer: 0,
    why: W('الدالة تطبع لكنها لا ترجع شيئًا، والدالة بدون return ترجع None. الطباعة والإرجاع شيئان مختلفان.',
      'The function prints but returns nothing, and a function with no return gives None. Printing and returning are different things.',
      'Fonksiyon yazdırıyor ama bir şey döndürmüyor; return’süz fonksiyon None döndürür. Yazdırmak ve döndürmek farklı şeylerdir.'),
  }),

  // ───────── Python · Mid ─────────
  output({
    id: 'py-m-mutable-default', level: 'mid', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `def add(item, items=[]):
    items.append(item)
    return items

add(1)
print(add(2))`,
    options: ['[1, 2]', '[2]', '[1]', '[]'],
    answer: 0,
    why: W('القيمة الافتراضية تُنشأ مرة واحدة عند تعريف الدالة، فتشترك كل الاستدعاءات في نفس القائمة. الحل: items=None ثم if items is None: items = [].',
      'The default value is created once, when the function is defined, so every call shares the same list. Fix: items=None, then if items is None: items = [].',
      'Varsayılan değer fonksiyon tanımlanırken bir kez oluşturulur; her çağrı aynı listeyi paylaşır. Çözüm: items=None, sonra if items is None: items = [].'),
  }),
  output({
    id: 'py-m-comprehension', level: 'mid', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `print([n * n for n in range(6) if n % 2 == 0])`,
    options: ['[0, 4, 16]', '[4, 16]', '[0, 4, 16, 36]', '[1, 9, 25]'],
    answer: 0,
    why: W('range(6) تعطي 0 إلى 5، والشرط يأخذ الأعداد الزوجية 0 و2 و4، ثم تُربَّع: 0 و4 و16.',
      'range(6) gives 0 to 5, the condition keeps the even ones 0, 2 and 4, and they are squared: 0, 4, 16.',
      'range(6) 0’dan 5’e verir; koşul çift olanları (0, 2, 4) tutar ve kareleri alınır: 0, 4, 16.'),
  }),
  output({
    id: 'py-m-is-eq', level: 'mid', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `a = [1, 2]
b = [1, 2]
print(a == b, a is b)`,
    options: ['True False', 'True True', 'False False', 'False True'],
    answer: 0,
    why: W('== تقارن المحتوى، وis تقارن هل هما نفس الكائن في الذاكرة. هنا قائمتان منفصلتان بنفس المحتوى. استخدم is مع None فقط تقريبًا.',
      '== compares contents; is checks whether they are the same object in memory. These are two separate lists with equal contents. Use is mostly for None.',
      '== içeriği karşılaştırır; is aynı bellek nesnesi olup olmadıklarına bakar. Bunlar içeriği aynı iki ayrı liste. is’i çoğunlukla None için kullan.'),
  }),
  output({
    id: 'py-m-shallow-copy', level: 'mid', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `a = [[1, 2], [3]]
b = a.copy()
b[0].append(9)
print(a)`,
    options: ['[[1, 2, 9], [3]]', '[[1, 2], [3]]', '[[1, 2], [3], 9]', '[[9], [3]]'],
    answer: 0,
    why: W('copy() نسخة سطحية: قائمة خارجية جديدة لكن القوائم الداخلية نفسها مشتركة. للنسخ الكامل استخدم copy.deepcopy.',
      'copy() is shallow: a new outer list, but the inner lists are shared. For a full copy, use copy.deepcopy.',
      'copy() yüzeyseldir: dış liste yenidir ama iç listeler ortaktır. Tam kopya için copy.deepcopy kullan.'),
  }),
  choice({
    id: 'py-m-django-select-related', level: 'mid', topic: 'python',
    prompt: W('صفحة Django تعرض 200 طلب مع اسم العميل، وتنفذ 201 استعلام. ما الحل؟', 'A Django page lists 200 orders with the customer name and runs 201 queries. What is the fix?', 'Bir Django sayfası 200 siparişi müşteri adıyla listeliyor ve 201 sorgu çalıştırıyor. Çözüm nedir?'),
    code: `orders = Order.objects.all()
for order in orders:
    print(order.customer.name)`, codeLang: 'py',
    options: [
      "Order.objects.select_related('customer')",
      "Order.objects.all().count()",
      "Order.objects.values('id')",
      "Order.objects.order_by('customer')",
    ],
    answer: 0,
    why: W('الوصول إلى order.customer يرسل استعلامًا لكل طلب (N+1). select_related يجلب العميل مع الطلب بـ JOIN واحد. وللعلاقات المتعددة استخدم prefetch_related.',
      'Accessing order.customer sends a query per order (N+1). select_related fetches the customer in the same JOIN. For many-to-many or reverse relations, use prefetch_related.',
      'order.customer’a erişmek her sipariş için sorgu gönderir (N+1). select_related müşteriyi aynı JOIN ile getirir. Çoka çok veya ters ilişkiler için prefetch_related kullan.'),
  }),
  choice({
    id: 'py-m-fastapi-422', level: 'mid', topic: 'python',
    prompt: W('ماذا يرجع FastAPI إذا أُرسل age = "abc"؟', 'What does FastAPI return if age = "abc" is sent?', 'age = "abc" gönderilirse FastAPI ne döndürür?'),
    code: `class User(BaseModel):
    name: str
    age: int

@app.post("/users")
def create(user: User):
    return user`, codeLang: 'py',
    options: L3(
      ['422 مع تفاصيل الحقل الخاطئ، تلقائيًا', '500', '200 و age = 0', '200 و age = "abc"'],
      ['422 with details about the bad field, automatically', '500', '200 with age = 0', '200 with age = "abc"'],
      ['Otomatik olarak, hatalı alanın ayrıntılarıyla 422', '500', 'age = 0 ile 200', 'age = "abc" ile 200'],
    ),
    answer: 0,
    why: W('FastAPI يستخدم Pydantic للتحقق من الجسم حسب الأنواع. القيمة التي لا يمكن تحويلها إلى int ترفض قبل الوصول إلى دالتك.',
      'FastAPI uses Pydantic to validate the body against the types. A value that cannot become an int is rejected before your function runs.',
      'FastAPI gövdeyi tiplere göre doğrulamak için Pydantic kullanır. int’e çevrilemeyen bir değer fonksiyonun çalışmadan reddedilir.'),
  }),
  output({
    id: 'py-m-generator', level: 'mid', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `def count():
    yield 1
    yield 2

g = count()
print(next(g), next(g))
print(list(g))`,
    options: ['1 2, []', '1 2, [1, 2]', '1 1, [1, 2]', '1 2, [2]'],
    answer: 0,
    why: W('الـ generator يُستهلك مرة واحدة: بعد أخذ القيمتين بـ next لا يبقى شيء، فـ list(g) فارغة.',
      'A generator can only be consumed once: after next takes both values nothing is left, so list(g) is empty.',
      'Generator yalnızca bir kez tüketilir: next iki değeri de aldıktan sonra bir şey kalmaz, list(g) boştur.'),
  }),

  // ───────── Python · Senior ─────────
  choice({
    id: 'py-s-gil', level: 'senior', topic: 'python',
    prompt: W('حسابات CPU ثقيلة في Python لم تصبح أسرع مع 8 threads. لماذا، وما البديل؟', 'Heavy CPU work in Python did not get faster with 8 threads. Why, and what is the alternative?', 'Python’daki ağır CPU işi 8 thread ile hızlanmadı. Neden ve alternatif nedir?'),
    options: L3(
      ['الـ GIL في CPython يسمح لخيط واحد بتنفيذ كود Python في كل لحظة؛ استخدم multiprocessing', 'الـ threads في Python غير موجودة', 'يجب استخدام asyncio لتسريع الحساب', 'المعالج لا يدعم 8 خيوط'],
      ['CPython’s GIL lets only one thread run Python code at a time; use multiprocessing', 'Python has no threads', 'Use asyncio to speed up the math', 'The CPU cannot run 8 threads'],
      ['CPython’daki GIL aynı anda yalnızca bir thread’in Python kodu çalıştırmasına izin verir; multiprocessing kullan', 'Python’da thread yok', 'Hesabı hızlandırmak için asyncio kullan', 'İşlemci 8 thread çalıştıramaz'],
    ),
    answer: 0,
    why: W('الـ threads مفيدة لانتظار الشبكة والقرص، لكن ليس للحساب. العمليات المنفصلة (أو مكتبات مثل NumPy التي تحرر الـ GIL) تستخدم كل الأنوية. وهناك إصدار تجريبي بدون GIL منذ Python 3.13.',
      'Threads help with waiting on network and disk, not with computation. Separate processes (or libraries like NumPy that release the GIL) use all cores. Python 3.13 also has an experimental build without the GIL.',
      'Thread’ler ağ ve disk beklemede işe yarar, hesaplamada değil. Ayrı süreçler (veya GIL’i bırakan NumPy gibi kütüphaneler) tüm çekirdekleri kullanır. Python 3.13’te GIL’siz deneysel bir sürüm de var.'),
  }),
  output({
    id: 'py-s-late-binding', level: 'senior', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])`,
    options: ['[2, 2, 2]', '[0, 1, 2]', '[0, 0, 0]', '[3, 3, 3]'],
    answer: 0,
    why: W('الـ lambda تقرأ i وقت الاستدعاء لا وقت الإنشاء، وعندها تكون الحلقة انتهت وi = 2. للحفظ وقت الإنشاء: lambda i=i: i.',
      'The lambda reads i when called, not when created, and by then the loop is over and i is 2. To capture it at creation time: lambda i=i: i.',
      'Lambda, i’yi oluşturulduğunda değil çağrıldığında okur; o zaman döngü bitmiş ve i = 2’dir. Oluşturma anında yakalamak için: lambda i=i: i.'),
  }),
  choice({
    id: 'py-s-async-blocking', level: 'senior', topic: 'python',
    prompt: W('لماذا يتوقف خادم FastAPI كله عن الرد لمدة 5 ثوانٍ عند استدعاء هذا الـ endpoint؟', 'Why does the whole FastAPI server stop answering for 5 seconds when this endpoint is called?', 'Bu uç nokta çağrılınca neden tüm FastAPI sunucusu 5 saniye yanıt vermiyor?'),
    code: `@app.get("/report")
async def report():
    time.sleep(5)
    return {"ok": True}`, codeLang: 'py',
    options: L3(
      ['time.sleep يحجز الـ event loop داخل async def؛ استخدم await asyncio.sleep أو دالة عادية def', 'FastAPI لا يدعم async', 'return يجب أن يكون await', 'المشكلة في JSON'],
      ['time.sleep blocks the event loop inside async def; use await asyncio.sleep, or a plain def', 'FastAPI does not support async', 'return should be awaited', 'The JSON is the problem'],
      ['time.sleep, async def içinde event loop’u kilitler; await asyncio.sleep ya da düz def kullan', 'FastAPI async desteklemez', 'return await edilmeli', 'Sorun JSON’da'],
    ),
    answer: 0,
    why: W('داخل async def يجب أن يكون كل انتظار بـ await ليتنازل للطلبات الأخرى. الدوال المتزامنة مثل requests.get وtime.sleep تحجز الخيط. FastAPI يشغّل الدوال العادية def في thread pool فلا تحجز.',
      'Inside async def every wait must use await so other requests can run. Blocking calls like requests.get and time.sleep hold the thread. FastAPI runs plain def endpoints in a thread pool, so they do not block.',
      'async def içinde her bekleme await ile olmalı ki diğer istekler çalışabilsin. requests.get ve time.sleep gibi engelleyici çağrılar thread’i tutar. FastAPI düz def uç noktalarını thread havuzunda çalıştırır, engellemez.'),
  }),
  output({
    id: 'py-s-dict-order', level: 'senior', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `d = {"b": 1, "a": 2}
d["c"] = 3
del d["b"]
d["b"] = 4
print(list(d))`,
    options: ["['a', 'c', 'b']", "['b', 'a', 'c']", "['a', 'b', 'c']", "['c', 'a', 'b']"],
    answer: 0,
    why: W('القواميس تحفظ ترتيب الإدخال (مضمون منذ Python 3.7). حذف b ثم إضافته من جديد يضعه في النهاية.',
      'Dicts keep insertion order (guaranteed since Python 3.7). Deleting b and adding it again puts it at the end.',
      'Sözlükler ekleme sırasını korur (Python 3.7’den beri garanti). b’yi silip yeniden eklemek onu sona koyar.'),
  }),
  output({
    id: 'py-s-gather', level: 'senior', topic: 'python', codeLang: 'py',
    prompt: WHAT_PRINTS,
    code: `import asyncio

async def job(name, delay):
    await asyncio.sleep(delay)
    print(name)
    return name

async def main():
    result = await asyncio.gather(job("a", 0.03), job("b", 0.01))
    print(result)

asyncio.run(main())`,
    options: ["b, a, ['a', 'b']", "a, b, ['a', 'b']", "b, a, ['b', 'a']", "['a', 'b']"],
    answer: 0,
    why: W('المهمتان تعملان معًا، فتنتهي b أولًا لأن انتظارها أقصر. لكن gather ترجع النتائج بترتيب المهام المعطاة، لا بترتيب الانتهاء.',
      'Both jobs run concurrently, so b finishes first because its wait is shorter. But gather returns results in the order the jobs were given, not the order they finished.',
      'İki iş eşzamanlı çalışır; beklemesi kısa olduğu için b önce biter. Ama gather sonuçları bitiş sırasına göre değil, verilen iş sırasına göre döndürür.'),
  }),
  choice({
    id: 'py-s-django-f', level: 'senior', topic: 'python',
    prompt: W('عدّاد المشاهدات يفقد زيارات عندما يزور كثيرون المنشور معًا. ما الحل في Django؟', 'A view counter loses visits when many people open the post at once. What is the fix in Django?', 'Bir gönderiyi aynı anda çok kişi açınca görüntülenme sayacı ziyaret kaybediyor. Django’da çözüm nedir?'),
    code: `post = Post.objects.get(pk=pk)
post.views += 1
post.save()`, codeLang: 'py',
    options: [
      "Post.objects.filter(pk=pk).update(views=F('views') + 1)",
      'post.views = post.views + 1; post.save()',
      'post.save(force_insert=True)',
      "Post.objects.get(pk=pk).views.increment()",
    ],
    answer: 0,
    why: W('الكود يقرأ القيمة ثم يكتبها، فطلبان يقرآن نفس الرقم ويكتبان نفس الزيادة (lost update). مع F() تتم الزيادة داخل قاعدة البيانات في خطوة واحدة.',
      'The code reads the value and then writes it, so two requests read the same number and write the same increment (a lost update). With F() the database does the increment in one step.',
      'Kod değeri okuyup sonra yazıyor; iki istek aynı sayıyı okur ve aynı artışı yazar (kayıp güncelleme). F() ile artış veritabanında tek adımda yapılır.'),
  }),
]
