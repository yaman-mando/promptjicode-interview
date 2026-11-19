import type { Question } from '#shared/types/quiz'
import { WHAT_ORDER, choice, output } from './helpers'

const level = 'mid' as const

export const MID: Question[] = [
  // ───────── JavaScript ─────────
  output({
    id: 'm-map-parseint', level, topic: 'javascript',
    code: `console.log(['1', '2', '3'].map(parseInt));`,
    options: ['[1, 2, 3]', '[1, NaN, NaN]', '[NaN, NaN, NaN]', '[1, NaN, 3]'],
    answer: 1,
    why: {
      ar: 'map يمرّر (القيمة، الفهرس) للدالة. فيصبح الاستدعاء parseInt(\'2\', 1) وparseInt(\'3\', 2)، والفهرس هنا يُفهم كأساس العدّ (radix) فينتج NaN. استخدم map(Number) أو map(s => parseInt(s, 10)).',
      en: 'map passes (value, index) to the callback, so the calls become parseInt(\'2\', 1) and parseInt(\'3\', 2). The index is read as the radix and gives NaN. Use map(Number) or map(s => parseInt(s, 10)).',
      tr: 'map callback’e (değer, indeks) gönderir; çağrılar parseInt(\'2\', 1) ve parseInt(\'3\', 2) olur. İndeks taban (radix) olarak okunur ve NaN verir. map(Number) veya map(s => parseInt(s, 10)) kullanın.',
    },
  }),
  output({
    id: 'm-object-key-order', level, topic: 'javascript',
    code: `const o = { b: 1, a: 2, 1: 'x' };
console.log(Object.keys(o));`,
    options: ["['b', 'a', '1']", "['1', 'b', 'a']", "['a', 'b', '1']", "['1', 'a', 'b']"],
    answer: 1,
    why: {
      ar: 'المفاتيح التي تشبه أرقامًا صحيحة تأتي أولًا بترتيب تصاعدي، ثم باقي المفاتيح النصية بترتيب إضافتها. لا تعتمد على ترتيب المفاتيح إذا كانت أرقامًا.',
      en: 'Integer-like keys come first in ascending order, then the other string keys in insertion order. Do not rely on key order when keys look like numbers.',
      tr: 'Tam sayıya benzeyen anahtarlar önce artan sırayla gelir, sonra diğer metin anahtarları eklenme sırasıyla. Anahtarlar sayıya benziyorsa sıraya güvenmeyin.',
    },
  }),
  output({
    id: 'm-class-method-lost-this', level, topic: 'javascript',
    code: `class User {
  constructor() { this.name = 'Ali'; }
  greet() { return this.name; }
}

const greet = new User().greet;

try {
  console.log(greet());
} catch (e) {
  console.log(e.name);
}`,
    options: ['Ali', 'undefined', 'TypeError', '""'],
    answer: 2,
    why: {
      ar: 'this يُحدَّد عند الاستدعاء لا عند التعريف. greet() تُستدعى بدون كائن، وجسم الـ class دائمًا في strict mode، فيكون this هو undefined وقراءة this.name ترمي TypeError. الحل: bind أو دالة سهمية.',
      en: 'this is decided at call time, not where the method is written. greet() is called with no object, and class bodies are always strict, so this is undefined and reading this.name throws a TypeError. Fix it with bind or an arrow function.',
      tr: 'this, tanımda değil çağrı anında belirlenir. greet() bir nesne olmadan çağrılıyor ve class gövdeleri her zaman strict’tir; this undefined olur ve this.name okumak TypeError fırlatır. Çözüm: bind veya ok fonksiyonu.',
    },
  }),
  output({
    id: 'm-arrow-this', level, topic: 'javascript',
    code: `class Timer {
  constructor() { this.seconds = 5; }
  values() {
    return [1].map(() => this.seconds);
  }
}

console.log(new Timer().values());`,
    options: ['[5]', '[undefined]', 'TypeError', '[]'],
    answer: 0,
    why: {
      ar: 'الدالة السهمية ليس لها this خاص بها، بل تأخذه من المكان المحيط بها، وهنا هو كائن Timer. لو كانت function عادية لضاع this.',
      en: 'An arrow function has no this of its own. It takes this from where it is written, here the Timer instance. A regular function would lose it.',
      tr: 'Ok fonksiyonunun kendi this’i yoktur; yazıldığı yerden alır, burada Timer nesnesinden. Normal bir function olsaydı this kaybolurdu.',
    },
  }),
  output({
    id: 'm-bind-wins', level, topic: 'javascript',
    code: `function getN() { return this.n; }

const bound = getN.bind({ n: 1 });
console.log(bound.call({ n: 2 }));`,
    options: ['1', '2', 'undefined', 'TypeError'],
    answer: 0,
    why: {
      ar: 'bind يثبّت this بشكل دائم. استدعاء call أو apply على دالة مربوطة لا يغيّر this بعد ذلك.',
      en: 'bind fixes this permanently. Calling call or apply on a bound function cannot change this afterwards.',
      tr: 'bind, this’i kalıcı olarak sabitler. Bağlanmış bir fonksiyonda call veya apply çağırmak this’i artık değiştiremez.',
    },
  }),
  output({
    id: 'm-prototype-lookup', level, topic: 'javascript',
    code: `function Dog() {}
Dog.prototype.sound = 'woof';

const d = new Dog();
d.sound = 'grr';
delete d.sound;

console.log(d.sound);`,
    options: ['grr', 'woof', 'undefined', 'TypeError'],
    answer: 1,
    why: {
      ar: 'd.sound = \'grr\' أنشأ خاصية على الكائن نفسه تغطي خاصية الـ prototype. بعد حذفها، يرجع JavaScript للبحث في الـ prototype فيجد woof.',
      en: 'd.sound = \'grr\' created an own property that hid the prototype one. After deleting it, JavaScript looks up the prototype chain again and finds woof.',
      tr: 'd.sound = \'grr\' nesnenin kendisinde, prototype’takini gizleyen bir özellik oluşturdu. Silindikten sonra JavaScript prototype zincirine bakar ve woof’u bulur.',
    },
  }),
  output({
    id: 'm-map-object-key', level, topic: 'javascript',
    code: `const cache = new Map();
const key = {};
cache.set(key, 'saved');

console.log(cache.get({}), cache.get(key));`,
    options: ['saved saved', 'undefined saved', 'undefined undefined', 'saved undefined'],
    answer: 1,
    why: {
      ar: 'Map يقارن المفاتيح الكائنية بالمرجع. {} الجديد كائن آخر لا علاقة له بـ key، فلا يجد شيئًا.',
      en: 'Map compares object keys by reference. A new {} is a different object from key, so nothing is found.',
      tr: 'Map nesne anahtarlarını referansla karşılaştırır. Yeni bir {} key’den farklı bir nesnedir, bu yüzden bir şey bulunmaz.',
    },
  }),
  output({
    id: 'm-set-dedupe', level, topic: 'javascript',
    code: `console.log([...new Set([1, '1', 1, 2])]);`,
    options: ["[1, 2]", "[1, '1', 2]", "['1', 2]", "[1, '1', 1, 2]"],
    answer: 1,
    why: {
      ar: 'Set يحذف التكرار باستخدام مقارنة صارمة: الرقم 1 والنص \'1\' قيمتان مختلفتان، فيبقى الاثنان.',
      en: 'Set removes duplicates using strict comparison: the number 1 and the string \'1\' are different values, so both stay.',
      tr: 'Set tekrarları katı karşılaştırmayla siler: 1 sayısı ve \'1\' metni farklı değerlerdir, ikisi de kalır.',
    },
  }),
  output({
    id: 'm-json-drops', level, topic: 'javascript',
    code: `const data = { a: undefined, b: null, c: () => 1 };
console.log(JSON.stringify(data));`,
    options: ['{"a":undefined,"b":null}', '{"b":null}', '{"a":null,"b":null,"c":null}', '{}'],
    answer: 1,
    why: {
      ar: 'JSON لا يعرف undefined ولا الدوال، فيحذف JSON.stringify هذه الخصائص من الكائنات. أما null فقيمة صالحة في JSON فتبقى.',
      en: 'JSON has no undefined or functions, so JSON.stringify drops those properties from objects. null is valid JSON, so it stays.',
      tr: 'JSON’da undefined ve fonksiyon yoktur; JSON.stringify bu özellikleri nesnelerden atar. null geçerli bir JSON değeridir, kalır.',
    },
  }),
  output({
    id: 'm-json-date-clone', level, topic: 'javascript',
    code: `const date = new Date(0);

const viaJson = JSON.parse(JSON.stringify(date));
const viaClone = structuredClone(date);

console.log(typeof viaJson, viaClone instanceof Date);`,
    options: ['object true', 'string true', 'string false', 'object false'],
    answer: 1,
    why: {
      ar: 'نسخ كائن عبر JSON يحوّل التواريخ إلى نصوص (ويفقد Map وSet وundefined). structuredClone ينسخ نسخة عميقة ويحافظ على Date وMap وSet.',
      en: 'Copying through JSON turns dates into strings (and loses Map, Set and undefined). structuredClone makes a deep copy and keeps Date, Map and Set.',
      tr: 'JSON üzerinden kopyalamak tarihleri metne çevirir (Map, Set ve undefined da kaybolur). structuredClone derin kopya yapar ve Date, Map, Set’i korur.',
    },
  }),
  output({
    id: 'm-to-sorted', level, topic: 'javascript',
    code: `const a = [3, 1, 2];
const b = a.toSorted();

console.log(a, b);`,
    options: ['[1, 2, 3] [1, 2, 3]', '[3, 1, 2] [1, 2, 3]', '[3, 1, 2] [3, 1, 2]', '[1, 2, 3] [3, 1, 2]'],
    answer: 1,
    why: {
      ar: 'sort يرتّب المصفوفة نفسها ويغيّرها. toSorted (ومثلها toReversed وtoSpliced) تعيد نسخة جديدة وتترك الأصل كما هو، وهذا مفيد مع الـ state في React وVue.',
      en: 'sort reorders the array in place. toSorted (like toReversed and toSpliced) returns a new copy and leaves the original alone, which is handy with React or Vue state.',
      tr: 'sort diziyi yerinde sıralar. toSorted (toReversed ve toSpliced gibi) yeni bir kopya döndürür ve orijinale dokunmaz; React veya Vue state’i için kullanışlıdır.',
    },
  }),
  output({
    id: 'm-reduce-empty', level, topic: 'javascript',
    code: `try {
  console.log([].reduce((sum, n) => sum + n));
} catch (e) {
  console.log(e.name);
}`,
    options: ['0', 'undefined', 'TypeError', 'NaN'],
    answer: 2,
    why: {
      ar: 'reduce بدون قيمة ابتدائية يأخذ أول عنصر كبداية. المصفوفة الفارغة ليس فيها عنصر، فيرمي TypeError. مرّر دائمًا قيمة ابتدائية: reduce(fn, 0).',
      en: 'Without an initial value, reduce uses the first item as the start. An empty array has none, so it throws a TypeError. Always pass one: reduce(fn, 0).',
      tr: 'Başlangıç değeri olmadan reduce ilk öğeyi başlangıç alır. Boş dizide öğe yoktur, TypeError fırlatır. Her zaman bir değer verin: reduce(fn, 0).',
    },
  }),
  output({
    id: 'm-finally-return', level, topic: 'javascript',
    code: `function run() {
  try {
    return 'try';
  } finally {
    console.log('finally');
  }
}

console.log(run());`,
    options: ['try', 'finally, try', 'try, finally', 'finally'],
    answer: 1,
    why: {
      ar: 'finally يعمل دائمًا، حتى بعد return. تُحفَظ القيمة المُعادة، ويُنفَّذ finally، ثم تخرج الدالة بالقيمة. لذلك يُطبع finally قبل try.',
      en: 'finally always runs, even after return. The return value is held, finally runs, then the function exits with the value. So finally is logged before try.',
      tr: 'finally her zaman çalışır, return’den sonra bile. Dönüş değeri bekletilir, finally çalışır, sonra fonksiyon değerle çıkar. Bu yüzden finally, try’dan önce yazılır.',
    },
  }),
  output({
    id: 'm-generator-spread', level, topic: 'javascript',
    code: `function* ids() {
  yield 1;
  yield 2;
  yield 3;
}

const it = ids();
console.log(it.next().value, [...it]);`,
    options: ['1 [1, 2, 3]', '1 [2, 3]', '1 []', 'undefined [1, 2, 3]'],
    answer: 1,
    why: {
      ar: 'الـ iterator يتذكّر موضعه. next() استهلك القيمة 1، فالـ spread يكمل من حيث توقف ويأخذ 2 و3 فقط.',
      en: 'An iterator remembers where it is. next() consumed 1, so the spread continues from there and only gets 2 and 3.',
      tr: 'Bir iterator kaldığı yeri hatırlar. next() 1’i tüketti, spread oradan devam eder ve yalnızca 2 ile 3’ü alır.',
    },
  }),

  // ───────── Async ─────────
  output({
    id: 'm-promise-catch-recover', level, topic: 'async',
    code: `Promise.resolve(1)
  .then(x => x + 1)
  .then(() => { throw new Error('boom'); })
  .catch(() => 10)
  .then(x => console.log(x));`,
    options: ['2', '10', 'undefined', 'Error'],
    answer: 1,
    why: {
      ar: 'الخطأ يقفز إلى أقرب catch. ما يعيده catch يصبح قيمة ناجحة للسلسلة، فيستلم then التالي الرقم 10.',
      en: 'The error jumps to the nearest catch. Whatever catch returns becomes a normal value for the chain, so the next then receives 10.',
      tr: 'Hata en yakın catch’e atlar. catch’in döndürdüğü değer zincir için normal bir değer olur, sonraki then 10 alır.',
    },
  }),
  output({
    id: 'm-async-returns-promise', level, topic: 'async',
    code: `async function getOne() {
  return 1;
}

console.log(getOne() instanceof Promise);`,
    options: ['true', 'false', '1', 'undefined'],
    answer: 0,
    why: {
      ar: 'الدالة async تعيد دائمًا Promise، حتى لو أعادت قيمة عادية. للحصول على 1 استخدم await getOne() أو then.',
      en: 'An async function always returns a Promise, even when it returns a plain value. Use await getOne() or then to get 1.',
      tr: 'async fonksiyon, düz bir değer döndürse bile her zaman bir Promise döndürür. 1’i almak için await getOne() veya then kullanın.',
    },
  }),
  output({
    id: 'm-await-order', level, topic: 'async',
    prompt: WHAT_ORDER,
    code: `async function load() {
  console.log('A1');
  await null;
  console.log('A2');
}

load();
console.log('B');`,
    options: ['A1, A2, B', 'A1, B, A2', 'B, A1, A2', 'A1, B'],
    answer: 1,
    why: {
      ar: 'الدالة async تعمل بشكل متزامن حتى أول await. عندها تتوقف ويكمل الكود الخارجي (B)، ثم يكمل باقي الدالة كـ microtask (A2).',
      en: 'An async function runs synchronously until its first await. There it pauses and the outer code continues (B); the rest of the function resumes as a microtask (A2).',
      tr: 'async fonksiyon ilk await’e kadar senkron çalışır. Orada durur ve dıştaki kod devam eder (B); fonksiyonun geri kalanı microtask olarak sürer (A2).',
    },
  }),
  output({
    id: 'm-executor-sync', level, topic: 'async',
    prompt: WHAT_ORDER,
    code: `new Promise(resolve => {
  console.log(1);
  resolve();
});

console.log(2);`,
    options: ['1, 2', '2, 1', '2', '1'],
    answer: 0,
    why: {
      ar: 'الدالة التي تمرّرها لـ new Promise تعمل فورًا وبشكل متزامن. فقط then وcatch هما اللذان ينتظران.',
      en: 'The function you pass to new Promise runs immediately and synchronously. Only then and catch wait.',
      tr: 'new Promise’e verdiğiniz fonksiyon hemen ve senkron çalışır. Yalnızca then ve catch bekler.',
    },
  }),
  output({
    id: 'm-timeout-inside-then', level, topic: 'async',
    prompt: WHAT_ORDER,
    code: `setTimeout(() => console.log('t1'), 0);

Promise.resolve().then(() => {
  console.log('p');
  setTimeout(() => console.log('t2'), 0);
});`,
    options: ['p, t1, t2', 't1, p, t2', 'p, t2, t1', 't1, t2, p'],
    answer: 0,
    why: {
      ar: 'الـ microtask (p) يعمل قبل أي setTimeout. وt2 أُضيف إلى طابور الـ timers بعد t1، فيعمل بعده.',
      en: 'The microtask (p) runs before any setTimeout. t2 was queued after t1, so it runs after it.',
      tr: 'Microtask (p) her setTimeout’tan önce çalışır. t2, t1’den sonra kuyruğa eklendi, bu yüzden ondan sonra çalışır.',
    },
  }),
  output({
    id: 'm-promise-all-reject', level, topic: 'async',
    code: `Promise.all([
  Promise.resolve(1),
  Promise.reject(new Error('fail')),
  Promise.resolve(3),
])
  .then(values => console.log(values))
  .catch(e => console.log(e.message));`,
    options: ['[1, undefined, 3]', 'fail', '[1, 3]', '[1, Error, 3]'],
    answer: 1,
    why: {
      ar: 'Promise.all يُرفض فورًا عند أول رفض، وتضيع نتائج الباقي. إذا أردت كل النتائج حتى مع الأخطاء استخدم Promise.allSettled.',
      en: 'Promise.all rejects as soon as one promise rejects, and the other results are lost. Use Promise.allSettled if you need every result even with errors.',
      tr: 'Promise.all, bir promise reddedildiği anda reddedilir ve diğer sonuçlar kaybolur. Hatalara rağmen tüm sonuçlar gerekiyorsa Promise.allSettled kullanın.',
    },
  }),
  output({
    id: 'm-promise-race', level, topic: 'async',
    code: `const wait = (ms, value) => new Promise(r => setTimeout(() => r(value), ms));

Promise.race([wait(100, 'slow'), wait(10, 'fast')])
  .then(winner => console.log(winner));`,
    options: ['slow', 'fast', "['slow', 'fast']", 'undefined'],
    answer: 1,
    why: {
      ar: 'Promise.race يستقر مع أول وعد ينتهي (نجاحًا أو فشلًا). يُستخدم كثيرًا لإضافة مهلة زمنية (timeout) لطلب.',
      en: 'Promise.race settles with the first promise that finishes, success or failure. It is often used to add a timeout to a request.',
      tr: 'Promise.race, başarılı ya da başarısız ilk biten promise ile sonuçlanır. Genellikle bir isteğe zaman aşımı eklemek için kullanılır.',
    },
  }),
  output({
    id: 'm-foreach-async', level, topic: 'async',
    code: `const saved = [];

[1, 2, 3].forEach(async n => {
  await null;
  saved.push(n);
});

console.log(saved.length);`,
    options: ['3', '0', '1', 'undefined'],
    answer: 1,
    why: {
      ar: 'forEach لا ينتظر الدوال async. يطلقها ويكمل فورًا، فعند console.log لم تُضَف أي قيمة بعد. استخدم for...of مع await، أو Promise.all مع map.',
      en: 'forEach does not wait for async callbacks. It starts them and moves on, so at console.log nothing has been pushed yet. Use for...of with await, or Promise.all with map.',
      tr: 'forEach async callback’leri beklemez; başlatır ve devam eder. console.log anında henüz hiçbir şey eklenmemiştir. await ile for...of ya da map ile Promise.all kullanın.',
    },
  }),

  // ───────── React ─────────
  choice({
    id: 'm-react-effect-empty-deps', level, topic: 'react',
    code: `useEffect(() => {
  loadProfile();
}, []);`, codeLang: 'jsx',
    prompt: {
      ar: 'متى تُستدعى loadProfile في الإنتاج (production)؟',
      en: 'When does loadProfile run in production?',
      tr: 'Production’da loadProfile ne zaman çalışır?',
    },
    options: {
      ar: ['مرة واحدة بعد أول عرض للمكوّن', 'بعد كل عرض', 'قبل أول عرض', 'كلما تغيّرت الـ props'],
      en: ['Once, after the first render', 'After every render', 'Before the first render', 'Whenever props change'],
      tr: ['Bir kez, ilk render’dan sonra', 'Her render’dan sonra', 'İlk render’dan önce', 'Props her değiştiğinde'],
    },
    answer: 0,
    why: {
      ar: 'مصفوفة اعتماديات فارغة تعني: نفّذ بعد أول ظهور فقط. في وضع التطوير مع StrictMode يشغّلها React مرتين عمدًا ليكشف أخطاء التنظيف.',
      en: 'An empty dependency array means: run once after the component first appears. In development with StrictMode, React runs it twice on purpose to catch missing cleanup.',
      tr: 'Boş bağımlılık dizisi şu demektir: bileşen ilk göründükten sonra bir kez çalıştır. Geliştirmede StrictMode ile React, eksik temizliği yakalamak için bilerek iki kez çalıştırır.',
    },
  }),
  choice({
    id: 'm-react-mutate-state', level, topic: 'react',
    code: `const [user, setUser] = useState({ name: 'Ali' });

function rename() {
  user.name = 'Omar';
  setUser(user);
}`, codeLang: 'jsx',
    prompt: {
      ar: 'ماذا يحدث على الشاشة عند استدعاء rename؟',
      en: 'What happens on screen when rename is called?',
      tr: 'rename çağrıldığında ekranda ne olur?',
    },
    options: {
      ar: ['يظهر Omar', 'لا يتغيّر شيء غالبًا', 'خطأ: لا يمكن تعديل state', 'يظهر Omar مرتين'],
      en: ['Omar is shown', 'Usually nothing changes', 'Error: state cannot be changed', 'Omar is shown twice'],
      tr: ['Omar gösterilir', 'Genellikle hiçbir şey değişmez', 'Hata: state değiştirilemez', 'Omar iki kez gösterilir'],
    },
    answer: 1,
    why: {
      ar: 'React يقارن الـ state الجديد بالقديم بالمرجع (Object.is). مرّرنا نفس الكائن بعد تعديله، فيعتبر React أن لا شيء تغيّر ولا يعيد العرض. أنشئ كائنًا جديدًا: setUser({ ...user, name: \'Omar\' }).',
      en: 'React compares new and old state by reference (Object.is). We passed the same object after mutating it, so React sees no change and skips the render. Create a new object: setUser({ ...user, name: \'Omar\' }).',
      tr: 'React yeni ve eski state’i referansla karşılaştırır (Object.is). Değiştirdikten sonra aynı nesneyi verdik, React değişiklik görmez ve render’ı atlar. Yeni nesne oluşturun: setUser({ ...user, name: \'Omar\' }).',
    },
  }),
  choice({
    id: 'm-react-stale-interval', level, topic: 'react',
    code: `const [count, setCount] = useState(0);

useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000);
  return () => clearInterval(id);
}, []);`, codeLang: 'jsx',
    prompt: {
      ar: 'ماذا يظهر على الشاشة بعد 5 ثوانٍ؟',
      en: 'What is on screen after 5 seconds?',
      tr: '5 saniye sonra ekranda ne görünür?',
    },
    options: ['0', '1', '5', '6'],
    answer: 1,
    why: {
      ar: 'الدالة داخل setInterval أُنشئت في أول عرض، فهي ترى count = 0 دائمًا (stale closure). كل ثانية تطلب setCount(1). الحل: setCount(c => c + 1).',
      en: 'The interval callback was created in the first render, so it always sees count = 0 (a stale closure). Every second it asks for setCount(1). Fix: setCount(c => c + 1).',
      tr: 'Interval callback’i ilk render’da oluşturuldu, bu yüzden her zaman count = 0 görür (bayat closure). Her saniye setCount(1) ister. Çözüm: setCount(c => c + 1).',
    },
  }),
  choice({
    id: 'm-react-and-zero', level, topic: 'react',
    code: `const items = [];

return <div>{items.length && <List items={items} />}</div>;`, codeLang: 'jsx',
    prompt: {
      ar: 'ماذا يظهر داخل الـ div؟',
      en: 'What is rendered inside the div?',
      tr: 'div’in içinde ne render edilir?',
    },
    options: {
      ar: ['لا شيء', 'الرقم 0', 'false', 'قائمة فارغة'],
      en: ['Nothing', 'The number 0', 'false', 'An empty list'],
      tr: ['Hiçbir şey', '0 sayısı', 'false', 'Boş bir liste'],
    },
    answer: 1,
    why: {
      ar: '&& يعيد الطرف الأيسر إذا كان falsy، أي 0. وReact يعرض الأرقام حتى لو كانت 0 (لكنه لا يعرض false). استخدم items.length > 0 && ...',
      en: '&& returns the left side when it is falsy, which is 0. React renders numbers, including 0 (it skips false). Use items.length > 0 && ...',
      tr: '&& sol taraf falsy ise onu döndürür, yani 0. React sayıları render eder, 0 dahil (false’u atlar). items.length > 0 && ... kullanın.',
    },
  }),
  choice({
    id: 'm-react-ref-no-render', level, topic: 'react',
    code: `const clicks = useRef(0);

function onClick() {
  clicks.current++;
}

return <button onClick={onClick}>{clicks.current}</button>;`, codeLang: 'jsx',
    prompt: {
      ar: 'بعد 3 نقرات، ماذا يظهر على الزر؟',
      en: 'After 3 clicks, what does the button show?',
      tr: '3 tıklamadan sonra butonda ne yazar?',
    },
    options: ['0', '3', '1', 'NaN'],
    answer: 0,
    why: {
      ar: 'تغيير ref.current لا يسبب إعادة عرض. القيمة تزيد فعلًا في الذاكرة، لكن الشاشة لا تتحدّث. للقيم التي تظهر للمستخدم استخدم useState.',
      en: 'Changing ref.current does not trigger a re-render. The value does go up in memory, but the screen is not updated. Use useState for values the user sees.',
      tr: 'ref.current’ı değiştirmek yeniden render tetiklemez. Değer bellekte artar ama ekran güncellenmez. Kullanıcının gördüğü değerler için useState kullanın.',
    },
  }),

  // ───────── Vue ─────────
  choice({
    id: 'm-vue-ref-value', level, topic: 'vue',
    code: `<script setup>
import { ref } from 'vue'

const count = ref(0)

function add() {
  // ?
}
</script>`, codeLang: 'vue',
    prompt: {
      ar: 'أي سطر يزيد count بشكل صحيح داخل add؟',
      en: 'Which line correctly increments count inside add?',
      tr: 'add içinde count’u hangi satır doğru şekilde artırır?',
    },
    options: ['count++', 'count.value++', 'this.count++', 'count.set(count + 1)'],
    answer: 1,
    why: {
      ar: 'ref يغلّف القيمة في كائن، والقيمة نفسها في .value داخل الـ script. في الـ template فقط يفكّ Vue الغلاف تلقائيًا فتكتب count مباشرة.',
      en: 'ref wraps the value in an object, and in script the value lives in .value. Only in the template does Vue unwrap it for you, so there you write count.',
      tr: 'ref değeri bir nesneye sarar; script içinde değer .value’dadır. Yalnızca template’te Vue sarmalayıcıyı otomatik açar, orada count yazarsınız.',
    },
  }),
  choice({
    id: 'm-vue-reactive-destructure', level, topic: 'vue',
    code: `const state = reactive({ count: 0 })
const { count } = state

state.count++
console.log(count)`, codeLang: 'js',
    prompt: {
      ar: 'ماذا يُطبع؟',
      en: 'What gets logged?',
      tr: 'Konsola ne yazılır?',
    },
    options: ['0', '1', 'undefined', 'Ref<1>'],
    answer: 0,
    why: {
      ar: 'الـ destructuring ينسخ القيمة الحالية (0) إلى متغير عادي، فيفقد الربط بالـ reactive. لإبقاء الربط استخدم toRefs(state) أو اقرأ state.count مباشرة.',
      en: 'Destructuring copies the current value (0) into a plain variable, so the link to the reactive object is lost. Use toRefs(state) or read state.count directly.',
      tr: 'Destructuring o anki değeri (0) düz bir değişkene kopyalar ve reactive nesneyle bağ kopar. toRefs(state) kullanın ya da doğrudan state.count okuyun.',
    },
  }),
  choice({
    id: 'm-vue-computed-cache', level, topic: 'vue',
    prompt: {
      ar: 'ما الفرق الأساسي بين computed ودالة عادية (method) تُستدعى في الـ template؟',
      en: 'What is the main difference between a computed and a method called in the template?',
      tr: 'computed ile template’te çağrılan bir method arasındaki temel fark nedir?',
    },
    options: {
      ar: ['computed يحفظ النتيجة ولا يعيد الحساب إلا إذا تغيّرت مصادره', 'الـ method أسرع دائمًا', 'computed لا يمكن أن يعتمد على props', 'لا فرق بينهما'],
      en: ['computed caches its result and only recalculates when its sources change', 'A method is always faster', 'computed cannot depend on props', 'There is no difference'],
      tr: ['computed sonucu önbelleğe alır ve yalnızca kaynakları değişince yeniden hesaplar', 'Method her zaman daha hızlıdır', 'computed props’a bağlı olamaz', 'Hiçbir fark yoktur'],
    },
    answer: 0,
    why: {
      ar: 'الـ method تُنفَّذ في كل إعادة عرض. أما computed فيتذكّر القيمة ويعيد حسابها فقط عندما تتغيّر القيم التفاعلية التي يعتمد عليها، فهو أنسب للحسابات المكلفة.',
      en: 'A method runs on every re-render. A computed remembers its value and only recalculates when the reactive values it uses change, so it is better for expensive work.',
      tr: 'Method her yeniden render’da çalışır. computed değerini hatırlar ve yalnızca kullandığı reaktif değerler değişince yeniden hesaplar; pahalı işler için daha uygundur.',
    },
  }),
  choice({
    id: 'm-vue-if-show', level, topic: 'vue',
    prompt: {
      ar: 'عنصر يُفتح ويُغلق مئات المرات (مثل قائمة منسدلة). أيهما أنسب ولماذا؟',
      en: 'An element is toggled hundreds of times (like a dropdown). Which fits better and why?',
      tr: 'Bir öğe yüzlerce kez açılıp kapanıyor (açılır menü gibi). Hangisi daha uygun ve neden?',
    },
    options: {
      ar: ['v-show: يبقي العنصر في الـ DOM ويغيّر display فقط', 'v-if: لأنه يحذف العنصر', 'v-for: لأنه أسرع', 'لا فرق في الأداء'],
      en: ['v-show: it keeps the element in the DOM and only changes display', 'v-if: because it removes the element', 'v-for: because it is faster', 'No performance difference'],
      tr: ['v-show: öğeyi DOM’da tutar ve yalnızca display’i değiştirir', 'v-if: çünkü öğeyi kaldırır', 'v-for: çünkü daha hızlıdır', 'Performans farkı yok'],
    },
    answer: 0,
    why: {
      ar: 'v-if ينشئ العنصر ويدمّره في كل مرة، وهذا مكلف مع التبديل المتكرر لكنه أوفر إذا كان نادر الظهور. v-show يرسم مرة واحدة ثم يبدّل display: none.',
      en: 'v-if creates and destroys the element each time, which is costly when toggled often but cheaper if it rarely shows. v-show renders once and then toggles display: none.',
      tr: 'v-if öğeyi her seferinde oluşturup yok eder; sık açılıp kapanınca pahalıdır ama nadiren görünüyorsa daha ucuzdur. v-show bir kez render eder, sonra display: none’ı değiştirir.',
    },
  }),
  choice({
    id: 'm-vue-next-tick', level, topic: 'vue',
    code: `const items = ref(['a'])
const list = ref(null) // <ul ref="list">

async function add() {
  items.value.push('b')
  console.log(list.value.children.length)
}`, codeLang: 'js',
    prompt: {
      ar: 'القائمة تعرض عنصرًا لكل item. ماذا يُطبع عند استدعاء add؟',
      en: 'The list renders one item per entry. What gets logged when add runs?',
      tr: 'Liste her öğe için bir eleman gösteriyor. add çalışınca ne yazılır?',
    },
    options: ['1', '2', '0', 'undefined'],
    answer: 0,
    why: {
      ar: 'Vue يجمّع تحديثات الـ DOM ويطبّقها لاحقًا بشكل غير متزامن. مباشرة بعد push لم يتحدّث الـ DOM بعد. استخدم await nextTick() قبل قراءة الـ DOM.',
      en: 'Vue batches DOM updates and applies them asynchronously. Right after push the DOM has not been updated yet. Use await nextTick() before reading the DOM.',
      tr: 'Vue DOM güncellemelerini toplar ve asenkron uygular. push’tan hemen sonra DOM henüz güncellenmemiştir. DOM’u okumadan önce await nextTick() kullanın.',
    },
  }),

  // ───────── CSS ─────────
  choice({
    id: 'm-css-box-sizing', level, topic: 'css',
    code: `.card {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid;
}`, codeLang: 'css',
    prompt: {
      ar: 'ما العرض الكلي للبطاقة على الشاشة؟',
      en: 'How wide is the card on screen in total?',
      tr: 'Kart ekranda toplam ne kadar geniştir?',
    },
    options: ['200px', '240px', '250px', '225px'],
    answer: 2,
    why: {
      ar: 'مع content-box يُطبَّق width على المحتوى فقط، ثم يُضاف الـ padding والـ border من الجهتين: 200 + 40 + 10 = 250. مع border-box يبقى 200px، ولهذا يضعه أغلب المطورين لكل العناصر.',
      en: 'With content-box, width applies to the content only, then padding and border are added on both sides: 200 + 40 + 10 = 250. With border-box it stays 200px, which is why most developers set it on everything.',
      tr: 'content-box’ta width yalnızca içeriğe uygulanır, padding ve border iki taraftan eklenir: 200 + 40 + 10 = 250. border-box ile 200px kalır; bu yüzden çoğu geliştirici bunu her öğeye uygular.',
    },
  }),
  choice({
    id: 'm-css-margin-collapse', level, topic: 'css',
    code: `.a { margin-bottom: 20px; }
.b { margin-top: 30px; }

/* <div class="a"></div>
   <div class="b"></div> */`, codeLang: 'css',
    prompt: {
      ar: 'كم المسافة العمودية بين .a و.b؟',
      en: 'How much vertical space is between .a and .b?',
      tr: '.a ile .b arasında ne kadar dikey boşluk vardır?',
    },
    options: ['50px', '30px', '20px', '10px'],
    answer: 1,
    why: {
      ar: 'الهوامش العمودية بين عناصر block متتالية تندمج (margin collapse)، ويبقى الأكبر فقط. لا يحدث هذا داخل flex أو grid.',
      en: 'Vertical margins between adjacent block elements collapse, and only the larger one remains. This does not happen inside flex or grid.',
      tr: 'Ardışık block öğeler arasındaki dikey margin’ler birleşir (margin collapse) ve yalnızca büyük olan kalır. Flex veya grid içinde bu olmaz.',
    },
  }),
  choice({
    id: 'm-css-flex-grow', level, topic: 'css',
    code: `.row { display: flex; width: 600px; }
.a { flex: 1; }
.b { flex: 2; }`, codeLang: 'css',
    prompt: {
      ar: 'العنصران فارغان. كم عرض .a؟',
      en: 'Both items are empty. How wide is .a?',
      tr: 'İki öğe de boş. .a ne kadar geniştir?',
    },
    options: ['300px', '200px', '400px', '100px'],
    answer: 1,
    why: {
      ar: 'flex: 1 يعني flex-basis: 0 مع grow بقيمة 1. المساحة (600px) تُقسَّم بنسبة 1:2، فيأخذ .a الثلث (200px) و.b الثلثين.',
      en: 'flex: 1 means flex-basis: 0 with grow 1. The 600px is split 1:2, so .a gets a third (200px) and .b two thirds.',
      tr: 'flex: 1, flex-basis: 0 ve grow 1 demektir. 600px 1:2 oranında bölünür; .a üçte birini (200px), .b üçte ikisini alır.',
    },
  }),
  choice({
    id: 'm-css-em', level, topic: 'css',
    code: `html   { font-size: 16px; }
.parent { font-size: 20px; }
.child  { font-size: 1.5em; padding: 1rem; }`, codeLang: 'css',
    prompt: {
      ar: 'ما حجم خط .child وما قيمة الـ padding بالبكسل؟',
      en: 'What are .child’s font size and padding in pixels?',
      tr: '.child’ın yazı boyutu ve padding’i kaç pikseldir?',
    },
    options: ['24px / 16px', '30px / 16px', '30px / 20px', '24px / 24px'],
    answer: 1,
    why: {
      ar: 'em في font-size نسبة إلى خط الأب: 1.5 × 20 = 30px. أما rem فدائمًا نسبة إلى خط html: 1 × 16 = 16px.',
      en: 'em in font-size is relative to the parent’s font: 1.5 × 20 = 30px. rem is always relative to the html font: 1 × 16 = 16px.',
      tr: 'font-size’taki em, ebeveynin yazı boyutuna göredir: 1.5 × 20 = 30px. rem her zaman html’e göredir: 1 × 16 = 16px.',
    },
  }),
  choice({
    id: 'm-css-grid-fr', level, topic: 'css',
    code: `.grid {
  display: grid;
  width: 400px;
  grid-template-columns: 100px 1fr 2fr;
}`, codeLang: 'css',
    prompt: {
      ar: 'كم عرض العمود الثالث (2fr)؟',
      en: 'How wide is the third column (2fr)?',
      tr: 'Üçüncü sütun (2fr) ne kadar geniştir?',
    },
    options: ['200px', '266px', '100px', '150px'],
    answer: 0,
    why: {
      ar: 'الأعمدة الثابتة تُطرح أولًا: 400 - 100 = 300px متبقية. تُقسَّم على 3 أجزاء (1fr + 2fr)، فكل fr = 100px والعمود الثالث 200px.',
      en: 'Fixed columns are taken first: 400 - 100 = 300px left. It is split into 3 parts (1fr + 2fr), so each fr is 100px and the third column is 200px.',
      tr: 'Önce sabit sütunlar çıkarılır: 400 - 100 = 300px kalır. 3 parçaya bölünür (1fr + 2fr); her fr 100px, üçüncü sütun 200px olur.',
    },
  }),

  // ───────── TypeScript ─────────
  choice({
    id: 'm-ts-unknown', level, topic: 'typescript',
    code: `function handle(data: ??? ) {
  data.toUpperCase(); // should be a compile error
}`, codeLang: 'ts',
    prompt: {
      ar: 'تريد نوعًا يقبل أي قيمة، لكن يمنعك من استخدامها قبل التحقق من نوعها. ماذا تكتب مكان ???',
      en: 'You want a type that accepts any value but forces you to check it before use. What goes in place of ???',
      tr: 'Her değeri kabul eden ama kullanmadan önce kontrol etmeye zorlayan bir tip istiyorsunuz. ??? yerine ne yazılır?',
    },
    options: ['any', 'unknown', 'never', 'object'],
    answer: 1,
    why: {
      ar: 'any يطفئ فحص الأنواع تمامًا. unknown يقبل أي قيمة لكن لا يسمح باستخدامها حتى تتحقق منها (مثلًا typeof data === \'string\'). لهذا unknown أأمن لبيانات الـ API.',
      en: 'any switches type checking off. unknown accepts any value but will not let you use it until you narrow it (for example typeof data === \'string\'). That makes unknown safer for API data.',
      tr: 'any tip kontrolünü tamamen kapatır. unknown her değeri kabul eder ama daraltana kadar kullanmanıza izin vermez (örneğin typeof data === \'string\'). Bu yüzden API verisi için unknown daha güvenlidir.',
    },
  }),
  choice({
    id: 'm-ts-as-const', level, topic: 'typescript',
    code: `const config = { mode: 'dark' } as const;

config.mode = 'light';`, codeLang: 'ts',
    prompt: {
      ar: 'ماذا يحدث؟',
      en: 'What happens?',
      tr: 'Ne olur?',
    },
    options: {
      ar: ['خطأ عند الترجمة: الخاصية readonly', 'يعمل وتصبح القيمة light', 'خطأ عند التشغيل في المتصفح', 'يعمل لكن بتحذير فقط'],
      en: ['Compile error: the property is readonly', 'It works and becomes light', 'Runtime error in the browser', 'It works with only a warning'],
      tr: ['Derleme hatası: özellik readonly’dir', 'Çalışır ve light olur', 'Tarayıcıda çalışma zamanı hatası', 'Yalnızca uyarıyla çalışır'],
    },
    answer: 0,
    why: {
      ar: 'as const يجعل الخصائص readonly ونوع mode هو \'dark\' حرفيًا. هذا فحص عند الترجمة فقط؛ في JavaScript الناتج لا يوجد أي تجميد.',
      en: 'as const makes the properties readonly and mode’s type the literal \'dark\'. It is a compile-time check only; the emitted JavaScript freezes nothing.',
      tr: 'as const özellikleri readonly yapar ve mode’un tipi tam olarak \'dark\' olur. Bu yalnızca derleme zamanı kontrolüdür; üretilen JavaScript hiçbir şeyi dondurmaz.',
    },
  }),
  choice({
    id: 'm-ts-runtime', level, topic: 'typescript',
    code: `interface User { id: number; name: string }

const user: User = await fetch('/api/me').then(r => r.json());`, codeLang: 'ts',
    prompt: {
      ar: 'السيرفر أعاد { "id": "7" } فقط. ماذا يحدث؟',
      en: 'The server returned only { "id": "7" }. What happens?',
      tr: 'Sunucu yalnızca { "id": "7" } döndürdü. Ne olur?',
    },
    options: {
      ar: ['لا خطأ: user.id نص وuser.name غير موجود', 'TypeScript يرمي خطأ عند التشغيل', 'يُحوَّل id إلى رقم تلقائيًا', 'fetch يرفض الوعد'],
      en: ['No error: user.id is a string and user.name is missing', 'TypeScript throws at runtime', 'id is converted to a number automatically', 'fetch rejects'],
      tr: ['Hata yok: user.id metindir ve user.name yoktur', 'TypeScript çalışma zamanında hata fırlatır', 'id otomatik olarak sayıya çevrilir', 'fetch reddedilir'],
    },
    answer: 0,
    why: {
      ar: 'أنواع TypeScript تُحذف عند الترجمة ولا تُفحص عند التشغيل. أنت فقط "أخبرت" المترجم بالنوع. للتحقق الحقيقي من بيانات الـ API استخدم مكتبة مثل Zod أو Valibot.',
      en: 'TypeScript types are erased at compile time and never checked at runtime. You only told the compiler the type. To really validate API data, use a library like Zod or Valibot.',
      tr: 'TypeScript tipleri derlemede silinir ve çalışma zamanında kontrol edilmez. Derleyiciye sadece tipi söylediniz. API verisini gerçekten doğrulamak için Zod veya Valibot gibi bir kütüphane kullanın.',
    },
  }),

  // ───────── Browser ─────────
  choice({
    id: 'm-localstorage-string', level, topic: 'browser',
    code: `localStorage.setItem('count', 5);
const count = localStorage.getItem('count');

console.log(count + 1);`, codeLang: 'js',
    prompt: {
      ar: 'ماذا يُطبع؟',
      en: 'What gets logged?',
      tr: 'Konsola ne yazılır?',
    },
    options: ['6', '51', 'NaN', 'null'],
    answer: 1,
    why: {
      ar: 'localStorage يخزّن النصوص فقط. الرقم 5 يُحفَظ كـ "5"، و"5" + 1 = "51". حوّل القيمة بـ Number، أو احفظ الكائنات بـ JSON.stringify واقرأها بـ JSON.parse.',
      en: 'localStorage stores strings only. 5 is saved as "5", and "5" + 1 = "51". Convert with Number, or save objects with JSON.stringify and read them with JSON.parse.',
      tr: 'localStorage yalnızca metin saklar. 5, "5" olarak kaydedilir ve "5" + 1 = "51" olur. Number ile çevirin ya da nesneleri JSON.stringify ile kaydedip JSON.parse ile okuyun.',
    },
  }),
  choice({
    id: 'm-cors-who', level, topic: 'browser',
    prompt: {
      ar: 'طلب fetch من موقعك إلى API على دومين آخر فشل بخطأ CORS. من الذي منع قراءة الرد؟',
      en: 'A fetch from your site to an API on another domain fails with a CORS error. Who blocked reading the response?',
      tr: 'Sitenizden başka bir alan adındaki API’ye yapılan fetch CORS hatası veriyor. Yanıtın okunmasını kim engelledi?',
    },
    options: {
      ar: ['المتصفح، لأن الرد لا يحتوي Access-Control-Allow-Origin المناسب', 'السيرفر رفض الطلب ولم يصله', 'الـ firewall', 'Node.js'],
      en: ['The browser, because the response lacks the right Access-Control-Allow-Origin', 'The server rejected the request before it arrived', 'The firewall', 'Node.js'],
      tr: ['Tarayıcı, çünkü yanıtta uygun Access-Control-Allow-Origin yok', 'Sunucu isteği ulaşmadan reddetti', 'Güvenlik duvarı', 'Node.js'],
    },
    answer: 0,
    why: {
      ar: 'CORS قاعدة يطبّقها المتصفح. الطلب غالبًا وصل للسيرفر ورجع رد، لكن المتصفح يمنع JavaScript من قراءته إذا لم يسمح السيرفر بدومينك. لذلك الطلب نفسه من Postman أو من سيرفر يعمل.',
      en: 'CORS is enforced by the browser. The request usually reached the server and got a response, but the browser hides it from JavaScript unless the server allows your origin. That is why the same request works from Postman or a server.',
      tr: 'CORS’u tarayıcı uygular. İstek genellikle sunucuya ulaşır ve yanıt döner, ama sunucu sizin origin’inize izin vermiyorsa tarayıcı yanıtı JavaScript’ten gizler. Bu yüzden aynı istek Postman’den veya bir sunucudan çalışır.',
    },
  }),
  choice({
    id: 'm-http-401-403', level, topic: 'browser',
    prompt: {
      ar: 'مستخدم مسجّل الدخول حاول فتح صفحة للمشرفين فقط. أي رمز حالة HTTP هو الأنسب؟',
      en: 'A logged-in user tries to open an admin-only page. Which HTTP status fits best?',
      tr: 'Giriş yapmış bir kullanıcı yalnızca yöneticilere açık bir sayfayı açmaya çalışıyor. Hangi HTTP durum kodu en uygun?',
    },
    options: ['401 Unauthorized', '403 Forbidden', '404 Not Found', '400 Bad Request'],
    answer: 1,
    why: {
      ar: '401 تعني "لا نعرف من أنت" (لم تسجّل الدخول أو انتهت الجلسة). 403 تعني "نعرفك، لكن ليس لديك صلاحية". هنا المستخدم معروف، فالأنسب 403.',
      en: '401 means "we do not know who you are" (not logged in or session expired). 403 means "we know you, but you are not allowed". The user is known here, so 403.',
      tr: '401 "kim olduğunuzu bilmiyoruz" demektir (giriş yok veya oturum bitti). 403 "sizi tanıyoruz ama yetkiniz yok" demektir. Burada kullanıcı tanınıyor, yani 403.',
    },
  }),
  choice({
    id: 'm-script-defer', level, topic: 'browser',
    code: `<script defer src="a.js"></script>
<script defer src="b.js"></script>`, codeLang: 'html',
    prompt: {
      ar: 'b.js أصغر وينتهي تحميله أولًا. متى وبأي ترتيب يعمل الملفان؟',
      en: 'b.js is smaller and finishes downloading first. When and in what order do they run?',
      tr: 'b.js daha küçük ve önce iniyor. Dosyalar ne zaman ve hangi sırayla çalışır?',
    },
    options: {
      ar: ['بعد قراءة الـ HTML كاملة، وبالترتيب a ثم b', 'فور التحميل: b ثم a', 'قبل قراءة الـ HTML: a ثم b', 'بعد تحميل كل الصور: b ثم a'],
      en: ['After the HTML is parsed, in order: a then b', 'As soon as each downloads: b then a', 'Before the HTML is parsed: a then b', 'After all images load: b then a'],
      tr: ['HTML ayrıştırıldıktan sonra, sırayla: önce a sonra b', 'İndikleri anda: önce b sonra a', 'HTML ayrıştırılmadan önce: önce a sonra b', 'Tüm görseller yüklendikten sonra: önce b sonra a'],
    },
    answer: 0,
    why: {
      ar: 'defer يحمّل بالتوازي دون إيقاف الصفحة، ثم ينفّذ بعد انتهاء قراءة الـ HTML وبترتيب كتابة الوسوم. أما async فينفّذ فور انتهاء التحميل دون ضمان ترتيب.',
      en: 'defer downloads in parallel without blocking, then runs after the HTML is parsed, in the order the tags appear. async runs as soon as each file arrives, with no order guarantee.',
      tr: 'defer sayfayı durdurmadan paralel indirir, HTML ayrıştırıldıktan sonra etiketlerin sırasıyla çalıştırır. async ise her dosya gelir gelmez çalıştırır, sıra garantisi yoktur.',
    },
  }),
  choice({
    id: 'm-event-bubbling', level, topic: 'browser',
    code: `<div id="card">
  <button id="btn">Buy</button>
</div>

<script>
  card.addEventListener('click', () => console.log('card'))
  btn.addEventListener('click', () => console.log('btn'))
</script>`, codeLang: 'html',
    prompt: {
      ar: 'المستخدم ضغط الزر. ما ترتيب الطباعة؟',
      en: 'The user clicks the button. In what order are things logged?',
      tr: 'Kullanıcı butona tıklıyor. Hangi sırayla yazılır?',
    },
    options: ['btn, card', 'card, btn', 'btn', 'card'],
    answer: 0,
    why: {
      ar: 'الأحداث تبدأ من العنصر الذي نُقر عليه ثم "تصعد" إلى آبائه (bubbling). لإيقاف الصعود استخدم event.stopPropagation()، ولمنع السلوك الافتراضي preventDefault().',
      en: 'Events start at the clicked element and then bubble up to its parents. Use event.stopPropagation() to stop the bubbling, and preventDefault() to cancel the default action.',
      tr: 'Olaylar tıklanan öğeden başlar ve ebeveynlerine doğru kabarır (bubbling). Kabarmayı durdurmak için event.stopPropagation(), varsayılan davranışı engellemek için preventDefault() kullanın.',
    },
  }),
]
