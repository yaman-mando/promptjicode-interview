import type { Question } from '#shared/types/quiz'
import { choice, output, WHAT_ORDER } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const topic = 'async' as const
const O = { prompt: WHAT_ORDER }

export const ASYNC_2: Question[] = [
  // ───────── Junior ─────────
  output({ ...O, id: 'as-j2-then-after', level: 'junior', topic,
    code: `async function getName() {
  return 'Ali'
}
getName().then(name => console.log(name))
console.log('after')`,
    options: ['after, Ali', 'Ali, after', 'after', 'Ali'], answer: 0,
    why: W('حتى لو كانت النتيجة جاهزة، then تعمل بعد انتهاء الكود المتزامن الحالي.', 'Even when the result is ready, then runs after the current synchronous code finishes.', 'Sonuç hazır olsa bile then, mevcut senkron kod bittikten sonra çalışır.') }),
  output({ ...O, id: 'as-j2-await-pauses', level: 'junior', topic,
    code: `async function load() {
  console.log(1)
  await null
  console.log(2)
}
load()
console.log(3)`,
    options: ['1, 3, 2', '1, 2, 3', '3, 1, 2', '1, 3'], answer: 0,
    why: W('await يوقف الدالة نفسها فقط، والكود الذي استدعاها يكمل. لهذا تظهر 3 قبل 2.', 'await pauses only that function; the code that called it carries on. That is why 3 comes before 2.', 'await yalnızca o fonksiyonu duraklatır; onu çağıran kod devam eder. Bu yüzden 3, 2’den önce gelir.') }),
  output({ id: 'as-j2-missing-return', level: 'junior', topic,
    code: `Promise.resolve(2)
  .then(x => { x * 3 })
  .then(v => console.log(v))`,
    options: ['undefined', '6', '2', 'NaN'], answer: 0,
    why: W('مع الأقواس المعقوفة تحتاج return صريحة. اكتب x => x * 3 أو أضف return.', 'With curly braces you need an explicit return. Write x => x * 3 or add return.', 'Süslü parantezle açık bir return gerekir. x => x * 3 yaz ya da return ekle.') }),
  output({ ...O, id: 'as-j2-timeout-delays', level: 'junior', topic,
    code: `setTimeout(() => console.log('A'), 100)
setTimeout(() => console.log('B'), 0)
console.log('C')`,
    options: ['C, B, A', 'A, B, C', 'C, A, B', 'B, C, A'], answer: 0,
    why: W('الكود المتزامن أولًا، ثم المؤقتات حسب مدتها: B بعد 0 تقريبًا، وA بعد 100ms.', 'Synchronous code first, then timers by their delay: B after about 0, A after 100 ms.', 'Önce senkron kod, sonra zamanlayıcılar süresine göre: B yaklaşık 0’dan, A 100 ms’den sonra.') }),
  output({ ...O, id: 'as-j2-let-loop', level: 'junior', topic,
    code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}`,
    options: ['0, 1, 2', '3, 3, 3', '2, 2, 2', '0, 0, 0'], answer: 0,
    why: W('let ينشئ متغيرًا جديدًا في كل دورة، فكل مؤقت يتذكر قيمته. مع var كانت ستطبع 3 ثلاث مرات.', 'let creates a fresh variable each pass, so each timer remembers its own value. With var it would print 3 three times.', 'let her turda yeni bir değişken oluşturur; her zamanlayıcı kendi değerini hatırlar. var ile üç kez 3 yazardı.') }),
  output({ id: 'as-j2-try-await', level: 'junior', topic,
    code: `async function save() {
  throw new Error('network down')
}
try {
  await save()
} catch (e) {
  console.log('caught:', e.message)
}`,
    options: ['caught: network down', 'network down', 'Error', 'caught: undefined'], answer: 0,
    why: W('await يحوّل الوعد المرفوض إلى خطأ عادي يمسكه try/catch. بدون await لن يُمسك.', 'await turns a rejected promise into a normal error that try/catch can catch. Without await it would not be caught.', 'await reddedilen promise’i try/catch’in yakalayacağı normal bir hataya çevirir. await olmadan yakalanmaz.') }),
  output({ id: 'as-j2-all-order', level: 'junior', topic,
    code: `const wait = (ms, v) => new Promise(r => setTimeout(() => r(v), ms))
const result = await Promise.all([wait(30, 'slow'), wait(5, 'fast')])
console.log(result)`,
    options: ["[ 'slow', 'fast' ]", "[ 'fast', 'slow' ]", "'fast'", "[ 'slow' ]"], answer: 0,
    why: W('Promise.all يُرجع النتائج بنفس ترتيب المدخلات، مهما كان الأسرع.', 'Promise.all returns results in the same order as the inputs, whichever finishes first.', 'Promise.all, hangisi önce biterse bitsin, sonuçları girdilerle aynı sırada döndürür.') }),
  output({ ...O, id: 'as-j2-finally', level: 'junior', topic,
    code: `Promise.reject(new Error('fail'))
  .catch(() => console.log('caught'))
  .finally(() => console.log('done'))`,
    options: ['caught, done', 'done, caught', 'done', 'caught'], answer: 0,
    why: W('finally تعمل في النهاية سواء نجح الوعد أو فشل، مثل إخفاء مؤشر التحميل.', 'finally runs at the end whether the promise succeeded or failed, for example to hide a loading spinner.', 'finally, promise başarılı da olsa başarısız da olsa sonda çalışır; örneğin yükleme göstergesini gizlemek için.') }),
  output({ id: 'as-j2-interval', level: 'junior', topic,
    code: `let n = 0
await new Promise(done => {
  const id = setInterval(() => {
    n++
    console.log(n)
    if (n === 3) { clearInterval(id); done() }
  }, 5)
})`,
    options: ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2', '3'], answer: 0,
    why: W('setInterval يتكرر حتى clearInterval. انسَ إيقافه فيستمر للأبد ويستهلك الموارد.', 'setInterval repeats until clearInterval. Forget to stop it and it runs forever, wasting resources.', 'setInterval, clearInterval’a kadar tekrarlar. Durdurmayı unutursan sonsuza dek çalışır ve kaynak harcar.') }),
  output({ id: 'as-j2-map-async', level: 'junior', topic,
    code: `const doubled = [1, 2].map(async x => x * 2)
console.log(doubled[0] instanceof Promise)
console.log(await Promise.all(doubled))`,
    options: ['true, [ 2, 4 ]', 'false, [ 2, 4 ]', 'true, [ 1, 2 ]', 'false, 2'], answer: 0,
    why: W('دالة async ترجع وعدًا دائمًا، فينتج map مصفوفة وعود. Promise.all يحوّلها لقيم.', 'An async function always returns a promise, so map gives an array of promises. Promise.all turns them into values.', 'async fonksiyon her zaman promise döndürür; map bir promise dizisi üretir. Promise.all onları değerlere çevirir.') }),
  output({ id: 'as-j2-await-value', level: 'junior', topic,
    code: `const x = await 5
console.log(x, typeof x)`,
    options: ['5 number', 'Promise { 5 } object', 'undefined undefined', 'Error'], answer: 0,
    why: W('await على قيمة عادية يعيدها كما هي. وawait في المستوى الأعلى مسموح داخل ES modules.', 'await on a plain value returns it unchanged. Top-level await is allowed in ES modules.', 'Düz bir değer üzerinde await onu olduğu gibi döndürür. En üst seviyede await ES modüllerinde serbesttir.') }),
  output({ ...O, id: 'as-j2-executor', level: 'junior', topic,
    code: `new Promise(resolve => resolve('ok')).then(v => console.log(v))
console.log('sync')`,
    options: ['sync, ok', 'ok, sync', 'ok', 'sync'], answer: 0,
    why: W('حتى الوعد المحلول فورًا يؤجل then إلى ما بعد الكود المتزامن.', 'Even an immediately resolved promise defers then until after the synchronous code.', 'Hemen çözülen bir promise bile then’i senkron koddan sonraya erteler.') }),
  output({ id: 'as-j2-throw-in-then', level: 'junior', topic,
    code: `Promise.resolve()
  .then(() => { throw new Error('bad data') })
  .then(() => console.log('skipped'))
  .catch(e => console.log(e.message))`,
    options: ['bad data', 'skipped, bad data', 'skipped', 'Error'], answer: 0,
    why: W('الخطأ داخل then يقفز مباشرة إلى أقرب catch ويتخطى ما بينهما.', 'An error inside then jumps straight to the nearest catch, skipping everything in between.', 'then içindeki hata en yakın catch’e atlar ve aradakileri atlar.') }),
  output({ id: 'as-j2-forgot-await', level: 'junior', topic,
    code: `const res = { json: async () => ({ id: 7 }) }
const data = res.json()
console.log(data.id)`,
    options: ['undefined', '7', 'Error', 'null'], answer: 0,
    why: W('res.json() ترجع وعدًا، ونسيان await يعطي الوعد نفسه لا البيانات. الصحيح: const data = await res.json().', 'res.json() returns a promise; forgetting await gives you the promise, not the data. Correct: const data = await res.json().', 'res.json() bir promise döndürür; await’i unutmak veriyi değil promise’in kendisini verir. Doğrusu: const data = await res.json().') }),
  choice({ id: 'as-j2-states', level: 'junior', topic,
    prompt: W('ما الحالات الممكنة للـ Promise؟', 'What states can a Promise be in?', 'Bir Promise hangi durumlarda olabilir?'),
    options: L3(['pending ثم fulfilled أو rejected، ولا تتغير بعدها', 'started وstopped', 'true وfalse', 'loading وloaded فقط'],
      ['pending, then fulfilled or rejected, and it never changes after that', 'started and stopped', 'true and false', 'only loading and loaded'],
      ['pending, sonra fulfilled ya da rejected; ardından asla değişmez', 'started ve stopped', 'true ve false', 'sadece loading ve loaded']), answer: 0,
    why: W('بعد أن يستقر الوعد (settled) لا يمكن تغيير نتيجته، واستدعاء resolve مرة ثانية يُتجاهل.', 'Once a promise is settled its result cannot change, and calling resolve again is ignored.', 'Promise bir kez sonuçlanınca (settled) sonucu değişmez; resolve’u tekrar çağırmak yok sayılır.') }),
  choice({ id: 'as-j2-await-where', level: 'junior', topic,
    prompt: W('أين يمكن استخدام await؟', 'Where can await be used?', 'await nerede kullanılabilir?'),
    options: L3(['داخل دالة async، أو في المستوى الأعلى لملف ES module', 'في أي دالة', 'داخل الحلقات فقط', 'داخل then فقط'],
      ['Inside an async function, or at the top level of an ES module', 'In any function', 'Only inside loops', 'Only inside then'],
      ['async fonksiyon içinde ya da bir ES modülünün en üst seviyesinde', 'Herhangi bir fonksiyonda', 'Sadece döngülerde', 'Sadece then içinde']), answer: 0,
    why: W('استخدام await داخل callback عادي (مثل forEach) خطأ أو لا ينتظر كما تتوقع.', 'Using await inside a normal callback (like forEach) is an error or does not wait the way you expect.', 'Normal bir callback (forEach gibi) içinde await kullanmak hatadır ya da beklediğin gibi beklemez.') }),
  choice({ id: 'as-j2-callback-hell', level: 'junior', topic,
    prompt: W('لماذا يُفضّل async/await على callbacks متداخلة؟', 'Why is async/await preferred over nested callbacks?', 'İç içe callback’ler yerine neden async/await tercih edilir?'),
    options: L3(['الكود يُقرأ من الأعلى للأسفل، والأخطاء تُعالج بـ try/catch واحدة', 'لأنه أسرع في التنفيذ دائمًا', 'لأن callbacks ممنوعة في JavaScript الحديثة', 'لأنه يعمل بدون إنترنت'],
      ['The code reads top to bottom, and errors are handled with one try/catch', 'It always runs faster', 'Callbacks are banned in modern JavaScript', 'It works offline'],
      ['Kod yukarıdan aşağı okunur ve hatalar tek try/catch ile ele alınır', 'Her zaman daha hızlı çalışır', 'Modern JavaScript’te callback yasak', 'Çevrimdışı çalışır']), answer: 0,
    why: W('الأداء نفسه تقريبًا؛ الفائدة في الوضوح ومعالجة الأخطاء. وكل callback قديم يمكن تحويله لوعد.', 'Performance is about the same; the gain is clarity and error handling. Any old callback API can be wrapped in a promise.', 'Performans aşağı yukarı aynıdır; kazanç okunabilirlik ve hata yönetimindedir. Her eski callback API’si promise’e sarılabilir.') }),

  // ───────── Mid ─────────
  output({ ...O, id: 'as-m2-all-finish-order', level: 'mid', topic,
    code: `const wait = (ms, v) => new Promise(r => setTimeout(() => { console.log(v); r(v) }, ms))
await Promise.all([wait(20, 'slow'), wait(5, 'fast')])
console.log('done')`,
    options: ['fast, slow, done', 'slow, fast, done', 'done, fast, slow', 'fast, done, slow'], answer: 0,
    why: W('الوعود تعمل بالتوازي فيظهر الأسرع أولًا، لكن مصفوفة النتائج تحافظ على ترتيب المدخلات.', 'The promises run in parallel so the faster logs first, but the result array keeps the input order.', 'Promise’ler paralel çalışır, hızlı olan önce yazar; ama sonuç dizisi girdi sırasını korur.') }),
  output({ ...O, id: 'as-m2-queue-order', level: 'mid', topic,
    code: `setTimeout(() => console.log('t'), 0)
queueMicrotask(() => console.log('m'))
Promise.resolve().then(() => console.log('p'))
console.log('s')`,
    options: ['s, m, p, t', 's, p, m, t', 's, t, m, p', 'm, p, s, t'], answer: 0,
    why: W('queueMicrotask وthen في نفس طابور الـ microtasks بترتيب إضافتهما، وكلاهما قبل المؤقت.', 'queueMicrotask and then share the microtask queue in the order they were added, and both run before the timer.', 'queueMicrotask ve then eklenme sırasıyla aynı microtask kuyruğundadır; ikisi de zamanlayıcıdan önce çalışır.') }),
  output({ id: 'as-m2-abort', level: 'mid', topic,
    code: `const ac = new AbortController()
const task = new Promise((_, reject) => {
  ac.signal.addEventListener('abort', () => reject(ac.signal.reason))
})
ac.abort()
try { await task } catch (e) { console.log(e.name) }`,
    options: ['AbortError', 'Error', 'TypeError', 'undefined'], answer: 0,
    why: W('abort() بدون سبب يعطي DOMException اسمها AbortError، وهو ما يرميه fetch عند الإلغاء. افحص هذا الاسم لتتجاهل الإلغاء المقصود.', 'abort() with no reason gives a DOMException named AbortError, which fetch throws when cancelled. Check that name to ignore deliberate cancels.', 'Nedensiz abort(), AbortError adlı bir DOMException verir; fetch iptal edilince bunu fırlatır. Kasıtlı iptalleri yok saymak için bu adı kontrol et.') }),
  output({ id: 'as-m2-then-second-arg', level: 'mid', topic,
    code: `Promise.resolve()
  .then(
    () => { throw new Error('boom') },
    () => console.log('handler 1'),
  )
  .catch(() => console.log('handler 2'))`,
    options: ['handler 2', 'handler 1', 'handler 1, handler 2', 'Error'], answer: 0,
    why: W('المعامل الثاني لـ then يعالج رفض الوعد السابق فقط، لا الأخطاء داخل المعامل الأول. لهذا .catch في النهاية أوضح.', 'The second argument of then handles only the previous promise’s rejection, not errors in the first argument. That is why a trailing .catch is clearer.', 'then’in ikinci argümanı yalnızca önceki promise’in reddini ele alır, birinci argümandaki hataları değil. Bu yüzden sondaki .catch daha nettir.') }),
  output({ id: 'as-m2-for-await', level: 'mid', topic,
    code: `async function* pages() {
  yield 'page 1'
  yield 'page 2'
}
for await (const p of pages()) console.log(p)`,
    options: ['page 1, page 2', 'page 2, page 1', 'Promise, Promise', 'Error'], answer: 0,
    why: W('async generator ينتج القيم واحدة واحدة مع await بينها، مثالي لجلب صفحات API متتالية أو قراءة stream.', 'An async generator yields values one at a time with awaits in between, ideal for paging through an API or reading a stream.', 'Async generator değerleri aralarında await ile tek tek üretir; bir API’nin sayfalarını gezmek ya da stream okumak için ideal.') }),
  output({ id: 'as-m2-resolve-twice', level: 'mid', topic,
    code: `const p = new Promise((resolve, reject) => {
  resolve('first')
  resolve('second')
  reject(new Error('late'))
})
console.log(await p)`,
    options: ['first', 'second', 'Error', 'first, second'], answer: 0,
    why: W('أول استدعاء يحسم النتيجة وما بعده يُتجاهل بصمت، لذلك لا تعتمد على resolve أو reject الثاني.', 'The first call settles it and later ones are silently ignored, so never rely on a second resolve or reject.', 'İlk çağrı sonucu belirler, sonrakiler sessizce yok sayılır; ikinci bir resolve ya da reject’e güvenme.') }),
  output({ id: 'as-m2-all-plain-values', level: 'mid', topic,
    code: `const r = await Promise.all([1, Promise.resolve(2), Promise.resolve(3).then(x => x * 10)])
console.log(r)`,
    options: ['[ 1, 2, 30 ]', '[ 1, 2, 3 ]', 'Error', '[ Promise, 2, 30 ]'], answer: 0,
    why: W('Promise.all يقبل قيمًا عادية ويعاملها كوعود محلولة.', 'Promise.all accepts plain values and treats them as resolved promises.', 'Promise.all düz değerleri kabul eder ve onları çözülmüş promise gibi ele alır.') }),
  choice({ id: 'as-m2-stale-search', level: 'mid', topic,
    prompt: W('بحث فوري: كتب المستخدم «re» ثم «react»، فوصل رد «re» متأخرًا وغطّى النتائج الصحيحة. ما الحل؟', 'Search-as-you-type: the user typed "re" then "react", and the "re" response arrived late and replaced the right results. The fix?', 'Yazarken arama: kullanıcı "re" sonra "react" yazdı; "re" yanıtı geç gelip doğru sonuçların üzerine yazdı. Çözüm?'),
    options: L3(['إلغاء الطلب السابق بـ AbortController (أو تجاهل أي رد ليس لآخر طلب)', 'زيادة سرعة الخادم', 'Promise.all لكل الطلبات', 'إرسال الطلبات بالتسلسل'],
      ['Cancel the previous request with AbortController (or ignore any response that is not for the latest request)', 'Make the server faster', 'Promise.all over all requests', 'Send requests one after another'],
      ['Önceki isteği AbortController ile iptal etmek (ya da son isteğe ait olmayan yanıtları yok saymak)', 'Sunucuyu hızlandırmak', 'Tüm istekler için Promise.all', 'İstekleri sırayla göndermek'],
    ), answer: 0,
    why: W('الردود لا تصل بترتيب الإرسال. ومعه debounce يقلل عدد الطلبات أصلًا.', 'Responses do not arrive in the order they were sent. Add debounce too, to cut the number of requests.', 'Yanıtlar gönderildiği sırayla gelmez. İstek sayısını azaltmak için debounce da ekle.') }),
  choice({ id: 'as-m2-sequential-vs-parallel', level: 'mid', topic,
    prompt: W('تجلب 5 طلبات مستقلة، كل منها 200ms. أي كود أسرع؟', 'You fetch 5 independent requests, each taking 200 ms. Which code is faster?', 'Her biri 200 ms süren 5 bağımsız istek getiriyorsun. Hangi kod daha hızlı?'),
    options: ['await Promise.all(ids.map(id => getUser(id)))', 'for (const id of ids) await getUser(id)', 'for (const id of ids) { setTimeout(() => getUser(id)) }', 'ids.forEach(async id => await getUser(id))'], answer: 0, codeLang: 'js',
    why: W('Promise.all يأخذ حوالي 200ms، والحلقة مع await حوالي 1000ms. وforEach لا ينتظر شيئًا أصلًا.', 'Promise.all takes about 200 ms; the loop with await about 1000 ms. forEach does not wait for anything at all.', 'Promise.all yaklaşık 200 ms sürer, await’li döngü yaklaşık 1000 ms. forEach hiçbir şeyi beklemez.') }),

  // ───────── Senior ─────────
  output({ ...O, id: 'as-s2-await-vs-then', level: 'senior', topic,
    code: `async function f() {
  console.log(1)
  await null
  console.log(3)
}
f()
Promise.resolve().then(() => console.log(4))
console.log(2)`,
    options: ['1, 2, 3, 4', '1, 2, 4, 3', '1, 3, 2, 4', '2, 1, 3, 4'], answer: 0,
    why: W('استكمال f بعد await null دخل طابور الـ microtasks قبل then، لأن f استُدعيت أولًا.', 'f’s continuation after await null entered the microtask queue before the then, because f was called first.', 'f’in await null sonrası devamı, f önce çağrıldığı için microtask kuyruğuna then’den önce girdi.') }),
  output({ ...O, id: 'as-s2-return-promise-ticks', level: 'senior', topic,
    code: `async function a() { return Promise.resolve('a') }
async function b() { return 'b' }
a().then(console.log)
b().then(console.log)`,
    options: ['b, a', 'a, b', 'a', 'b'], answer: 0,
    why: W('إرجاع وعد من دالة async يضيف خطوات إضافية في طابور الـ microtasks قبل أن يُحسم، فتسبقها b.', 'Returning a promise from an async function adds extra microtask steps before it settles, so b gets ahead.', 'async fonksiyondan promise döndürmek, sonuçlanmadan önce ek microtask adımları ekler; b öne geçer.') }),
  output({ id: 'as-s2-microtask-starve', level: 'senior', topic,
    code: `let n = 0
setTimeout(() => console.log('timeout', n), 0)
function spin() {
  if (++n < 1000) queueMicrotask(spin)
}
spin()`,
    options: ['timeout 1000', 'timeout 1', 'timeout 0', 'timeout 500'], answer: 0,
    why: W('المتصفح أو Node يفرّغ كل الـ microtasks قبل أي مؤقت أو رسم. سلسلة microtasks طويلة تجمّد الصفحة مثل الحلقة المتزامنة.', 'The browser or Node drains every microtask before any timer or paint. A long microtask chain freezes the page like a sync loop.', 'Tarayıcı ya da Node, herhangi bir zamanlayıcı veya çizimden önce tüm microtask’leri bitirir. Uzun bir microtask zinciri sayfayı senkron döngü gibi dondurur.') }),
  output({ id: 'as-s2-executor-throw', level: 'senior', topic,
    code: `new Promise(() => { throw new Error('sync throw') })
  .catch(e => console.log('caught', e.message))`,
    options: ['caught sync throw', 'Error', 'caught undefined', 'sync throw'], answer: 0,
    why: W('الخطأ المتزامن داخل executor يتحول إلى رفض للوعد تلقائيًا.', 'A synchronous error inside the executor automatically becomes a rejection.', 'Executor içindeki senkron hata otomatik olarak bir reddetmeye dönüşür.') }),
  output({ id: 'as-s2-async-throw-escapes', level: 'senior', topic,
    code: `new Promise(() => {
  setTimeout(() => { throw new Error('late') }, 0)
}).catch(() => console.log('caught'))`,
    options: ['Error', 'caught', 'caught, Error', 'undefined'], answer: 0,
    why: W('الخطأ داخل callback المؤقت يحدث لاحقًا خارج الوعد، فلا يمسكه catch ويصبح خطأ غير معالج. استدعِ reject بنفسك داخل المؤقت.', 'The error inside the timer callback happens later, outside the promise, so catch never sees it: it becomes uncaught. Call reject yourself inside the timer.', 'Zamanlayıcı callback’indeki hata daha sonra, promise dışında olur; catch onu görmez ve yakalanmamış hata olur. Zamanlayıcıda reject’i kendin çağır.') }),
  output({ id: 'as-s2-finally-value', level: 'senior', topic,
    code: `console.log(await Promise.resolve(1).finally(() => 2))
try {
  await Promise.resolve(1).finally(() => { throw new Error('cleanup failed') })
} catch (e) {
  console.log(e.message)
}`,
    options: ['1, cleanup failed', '2, cleanup failed', '1, 1', '2, 1'], answer: 0,
    why: W('قيمة finally المُرجعة تُتجاهل والنتيجة الأصلية تمر، لكن رمي خطأ داخل finally يستبدل النتيجة بالرفض.', 'finally’s return value is ignored and the original result passes through, but throwing inside finally replaces it with a rejection.', 'finally’nin dönüş değeri yok sayılır ve asıl sonuç geçer; ama finally içinde hata fırlatmak sonucu reddetmeyle değiştirir.') }),
  output({ id: 'as-s2-with-resolvers', level: 'senior', topic,
    code: `const { promise, resolve } = Promise.withResolvers()
setTimeout(() => resolve('ready'), 5)
console.log(await promise)`,
    options: ['ready', 'undefined', 'Promise { <pending> }', 'Error'], answer: 0,
    why: W('Promise.withResolvers (ES2024) يعطي الوعد مع resolve وreject خارجه، بدل حيلة حفظهما من داخل الـ executor.', 'Promise.withResolvers (ES2024) gives you the promise plus resolve and reject outside it, instead of the trick of saving them from inside the executor.', 'Promise.withResolvers (ES2024), promise’i resolve ve reject ile dışarıda verir; executor içinden saklama hilesine gerek kalmaz.') }),
  output({ id: 'as-s2-all-no-cancel', level: 'senior', topic,
    code: `const log = []
const job = (ms, name, fail) => new Promise((ok, no) =>
  setTimeout(() => { log.push(name); fail ? no(new Error(name)) : ok(name) }, ms))
try {
  await Promise.all([job(5, 'a', true), job(15, 'b')])
} catch (e) {
  console.log('failed on', e.message, '| ran:', log.join(','))
}
await new Promise(r => setTimeout(r, 25))
console.log('later ran:', log.join(','))`,
    options: ['failed on a | ran: a, later ran: a,b', 'failed on a | ran: a,b, later ran: a,b', 'failed on a | ran: a, later ran: a', 'failed on b | ran: a,b, later ran: a,b'], answer: 0,
    why: W('Promise.all يرفض عند أول فشل لكنه لا يوقف بقية المهام؛ تكمل في الخلفية. للإلغاء الحقيقي مرّر AbortSignal.', 'Promise.all rejects on the first failure but does not stop the other tasks; they finish in the background. For real cancellation pass an AbortSignal.', 'Promise.all ilk hatada reddeder ama diğer görevleri durdurmaz; arka planda biterler. Gerçek iptal için bir AbortSignal geçir.') }),
  choice({ id: 'as-s2-concurrency-limit', level: 'senior', topic,
    prompt: W('تحتاج استدعاء API لـ 10,000 عنصر، والخادم يقبل 10 طلبات متزامنة فقط. ما الطريقة الصحيحة؟', 'You must call an API for 10,000 items, and the server accepts only 10 concurrent requests. The right approach?', '10.000 öğe için API çağırman gerekiyor ve sunucu yalnızca 10 eşzamanlı isteği kabul ediyor. Doğru yaklaşım?'),
    options: L3(['مجموعة عمال محدودة (pool) بعشرة طلبات بالتوازي كحد أقصى، مثل p-limit', 'Promise.all على كل العناصر', 'for مع await واحد تلو الآخر', 'setTimeout عشوائي لكل طلب'],
      ['A bounded pool with at most 10 requests in flight, like p-limit', 'Promise.all over every item', 'A for loop awaiting one at a time', 'A random setTimeout per request'],
      ['En fazla 10 isteğin aynı anda çalıştığı sınırlı bir havuz, p-limit gibi', 'Tüm öğeler için Promise.all', 'Tek tek await eden for döngüsü', 'Her istek için rastgele setTimeout'],
    ), answer: 0,
    why: W('Promise.all يطلق 10,000 طلب دفعة واحدة فيحدث 429 أو انهيار الذاكرة، والتسلسل بطيء جدًا. الـ pool يوازن بينهما.', 'Promise.all fires 10,000 requests at once, causing 429s or memory blowups; sequential is far too slow. A pool balances the two.', 'Promise.all 10.000 isteği aynı anda gönderir; 429 ya da bellek sorunu çıkar. Sıralı çok yavaştır. Havuz ikisini dengeler.') }),
  choice({ id: 'as-s2-worker', level: 'senior', topic,
    prompt: W('معالجة صورة كبيرة في المتصفح تجمّد الصفحة 3 ثوانٍ رغم أنها داخل دالة async. ما الحل؟', 'Processing a big image in the browser freezes the page for 3 seconds even though it is inside an async function. The fix?', 'Tarayıcıda büyük bir resmi işlemek, async fonksiyon içinde olmasına rağmen sayfayı 3 saniye donduruyor. Çözüm?'),
    options: L3(['نقل الحساب إلى Web Worker يعمل على خيط آخر', 'إضافة await قبل كل سطر', 'استخدام Promise.all', 'setTimeout(fn, 0) حول الدالة كلها'],
      ['Move the computation into a Web Worker running on another thread', 'Add await before every line', 'Use Promise.all', 'Wrap the whole function in setTimeout(fn, 0)'],
      ['Hesaplamayı başka bir thread’de çalışan Web Worker’a taşımak', 'Her satırın önüne await eklemek', 'Promise.all kullanmak', 'Tüm fonksiyonu setTimeout(fn, 0) ile sarmak'],
    ), answer: 0,
    why: W('async لا يجعل الحساب الثقيل متوازيًا؛ الكود يبقى على الخيط الرئيسي. الـ Worker يتواصل عبر postMessage.', 'async does not make heavy computation parallel; the code still runs on the main thread. A worker talks through postMessage.', 'async ağır hesaplamayı paralel yapmaz; kod hâlâ ana thread’de çalışır. Worker postMessage ile iletişim kurar.') }),
  choice({ id: 'as-s2-raf', level: 'senior', topic,
    prompt: W('لماذا يُفضّل requestAnimationFrame على setInterval(fn, 16) للحركة؟', 'Why is requestAnimationFrame preferred over setInterval(fn, 16) for animation?', 'Animasyon için neden setInterval(fn, 16) yerine requestAnimationFrame tercih edilir?'),
    options: L3(['يعمل متزامنًا مع رسم الشاشة، ويتوقف في التبويبات المخفية', 'لأنه أسرع بعشر مرات', 'لأنه يعمل في Node', 'لأن setInterval ممنوع'],
      ['It runs in step with screen painting, and pauses in hidden tabs', 'It is ten times faster', 'It works in Node', 'setInterval is banned'],
      ['Ekran çizimiyle eşzamanlı çalışır ve gizli sekmelerde durur', 'On kat daha hızlıdır', 'Node’da çalışır', 'setInterval yasak'],
    ), answer: 0,
    why: W('المؤقت لا يعرف متى سيُرسم الإطار فيسبب تقطعًا، ويهدر البطارية في الخلفية. ولحركات CSS البسيطة استخدم transition.', 'A timer does not know when a frame will be painted, causing jank, and it wastes battery in the background. For simple CSS motion, use a transition.', 'Zamanlayıcı karenin ne zaman çizileceğini bilmez, takılmaya yol açar ve arka planda pil harcar. Basit CSS hareketleri için transition kullan.') }),
  choice({ id: 'as-s2-yield', level: 'senior', topic,
    prompt: W('حلقة تعالج 50,000 صف في المتصفح وتجعل الضغط على الأزرار بطيئًا (INP سيئ). ما الحل دون Worker؟', 'A loop handles 50,000 rows in the browser and makes button presses sluggish (bad INP). A fix without a worker?', 'Tarayıcıda 50.000 satırı işleyen bir döngü buton tıklamalarını yavaşlatıyor (kötü INP). Worker’sız çözüm?'),
    options: L3(['تقسيم العمل إلى دفعات وإعطاء المتصفح فرصة بينها (scheduler.yield أو setTimeout)', 'تحويل الحلقة إلى forEach', 'استخدام queueMicrotask بين الدفعات', 'إضافة async للدالة فقط'],
      ['Split the work into chunks and give the browser a turn between them (scheduler.yield or setTimeout)', 'Turn the loop into forEach', 'Use queueMicrotask between chunks', 'Just mark the function async'],
      ['İşi parçalara bölüp aralarında tarayıcıya sıra vermek (scheduler.yield ya da setTimeout)', 'Döngüyü forEach’e çevirmek', 'Parçalar arasında queueMicrotask', 'Fonksiyonu sadece async yapmak'],
    ), answer: 0,
    why: W('الـ microtasks تُنفَّذ قبل معالجة النقرات والرسم، فلا تعطي المتصفح فرصة. المهمة أو الـ yield تفعل ذلك.', 'Microtasks run before input and painting are handled, so they give the browser no turn. A new task or a yield does.', 'Microtask’ler girdi ve çizim işlenmeden önce çalışır; tarayıcıya sıra vermezler. Yeni bir görev ya da yield verir.') }),
  choice({ id: 'as-s2-unhandled-browser', level: 'senior', topic,
    prompt: W('كيف تجمع أخطاء الوعود غير المعالجة من متصفحات المستخدمين لإرسالها لنظام المراقبة؟', 'How do you collect unhandled promise errors from users’ browsers to send to monitoring?', 'Kullanıcı tarayıcılarındaki işlenmemiş promise hatalarını izleme sistemine göndermek için nasıl toplarsın?'),
    options: {

      ar: ["window.addEventListener('unhandledrejection', e => report(e.reason))", "window.onerror فقط", "try/catch حول كل الملف", "console.error = report"],

      en: ["window.addEventListener('unhandledrejection', e => report(e.reason))", "window.onerror only", "try/catch around the whole file", "console.error = report"],

      tr: ["window.addEventListener('unhandledrejection', e => report(e.reason))", "Sadece window.onerror", "Tüm dosyanın etrafında try/catch", "console.error = report"],

    }, answer: 0, codeLang: 'js',
    why: W('window.onerror يلتقط الأخطاء المتزامنة فقط، والوعود المرفوضة بلا catch لها حدث مستقل. أدوات مثل Sentry تستمع للاثنين.', 'window.onerror catches synchronous errors only; promises rejected with no catch have their own event. Tools like Sentry listen to both.', 'window.onerror yalnızca senkron hataları yakalar; catch’siz reddedilen promise’lerin ayrı bir olayı vardır. Sentry gibi araçlar ikisini de dinler.') }),
  choice({ id: 'as-s2-async-constructor', level: 'senior', topic,
    prompt: W('كائن يحتاج تحميل إعدادات من الشبكة قبل الاستخدام، والـ constructor لا يقبل await. ما النمط المعتاد؟', 'An object needs to load settings from the network before use, and a constructor cannot await. The usual pattern?', 'Bir nesnenin kullanılmadan önce ağdan ayar yüklemesi gerekiyor ve constructor await edemez. Olağan kalıp?'),
    options: ['static async create() { const c = new Client(); await c.init(); return c }', 'async constructor() { … }', 'constructor() { this.ready = await load() }', 'constructor() { while (!this.loaded) {} }'], answer: 0, codeLang: 'js',
    why: W('دالة مصنع static async تُرجع الكائن جاهزًا، فلا يوجد كائن نصف مهيأ. والحلقة المنتظرة تجمّد الخيط للأبد.', 'A static async factory returns a ready object, so a half-initialised one never exists. A busy-wait loop would freeze the thread forever.', 'Static async fabrika hazır nesneyi döndürür; yarım kurulmuş nesne hiç oluşmaz. Meşgul bekleme döngüsü thread’i sonsuza dek dondurur.') }),
]
