import type { Question } from '#shared/types/quiz'
import { output } from '../helpers'

const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const topic = 'javascript' as const

export const JAVASCRIPT_2: Question[] = [
  // ───────── Mid ─────────
  output({ id: 'js-m2-typeof', level: 'mid', topic,
    code: `console.log(typeof null, typeof [], Array.isArray([]))`,
    options: ['object object true', 'null array true', 'object array true', 'null object false'], answer: 0,
    why: W('typeof null يعطي object (خطأ تاريخي في اللغة)، والمصفوفة كائن أيضًا؛ لذلك استخدم Array.isArray.', 'typeof null is object (a historic bug in the language), and arrays are objects too; that is why Array.isArray exists.', 'typeof null object verir (dilde tarihsel bir hata), diziler de nesnedir; bu yüzden Array.isArray var.') }),
  output({ id: 'js-m2-default-null', level: 'mid', topic,
    code: `const { page = 1, limit = 20 } = { page: null, limit: undefined }
console.log(page, limit)`,
    options: ['null 20', '1 20', 'null undefined', '1 undefined'], answer: 0,
    why: W('القيمة الافتراضية تُستخدم فقط عند undefined، لا عند null. وهذا يهم مع بيانات JSON التي تحوي null.', 'Defaults apply only for undefined, not null. That matters with JSON data containing null.', 'Varsayılan değer yalnızca undefined için kullanılır, null için değil. null içeren JSON verisinde bu önemlidir.') }),
  output({ id: 'js-m2-at', level: 'mid', topic,
    code: `const items = ['a', 'b', 'c']
console.log(items.at(-1), items[items.length - 1], items[-1])`,
    options: ['c c undefined', 'c c c', 'a c undefined', 'undefined c c'], answer: 0,
    why: W('at() تقبل الأرقام السالبة من النهاية. أما items[-1] فتبحث عن خاصية اسمها "-1" فلا تجدها.', 'at() accepts negative indexes counting from the end. items[-1] looks for a property named "-1" and finds nothing.', 'at() sondan sayan negatif indeksleri kabul eder. items[-1] "-1" adlı bir özellik arar ve bulamaz.') }),
  output({ id: 'js-m2-spread-order', level: 'mid', topic,
    code: `const defaults = { theme: 'light', lang: 'ar' }
const saved = { theme: 'dark' }
const settings = { ...defaults, ...saved, lang: 'en' }
console.log(settings.theme, settings.lang)`,
    options: ['dark en', 'light ar', 'dark ar', 'light en'], answer: 0,
    why: W('الخصائص اللاحقة تكتب فوق السابقة، فالترتيب يحدد أي قيمة تفوز.', 'Later properties overwrite earlier ones, so the order decides which value wins.', 'Sonraki özellikler öncekilerin üzerine yazar; hangi değerin kazanacağını sıra belirler.') }),
  output({ id: 'js-m2-closure-counters', level: 'mid', topic,
    code: `const makeCounter = () => { let n = 0; return () => ++n }
const a = makeCounter()
const b = makeCounter()
a(); a()
console.log(a(), b())`,
    options: ['3 1', '3 3', '1 1', '2 1'], answer: 0,
    why: W('كل استدعاء لـ makeCounter ينشئ متغير n جديدًا خاصًا به، فالعدّادان مستقلان.', 'Each call to makeCounter creates its own fresh n, so the two counters are independent.', 'makeCounter’ın her çağrısı kendi yeni n’ini oluşturur; iki sayaç bağımsızdır.') }),
  output({ id: 'js-m2-tofixed', level: 'mid', topic,
    code: `const total = 0.1 * 3
console.log(total, total.toFixed(2), typeof total.toFixed(2))`,
    options: ['0.30000000000000004 0.30 string', '0.3 0.30 number', '0.30000000000000004 0.3 number', '0.3 0.3 string'], answer: 0,
    why: W('toFixed للعرض فقط ويرجع نصًا. للحسابات المالية احسب بالقروش كأعداد صحيحة.', 'toFixed is for display only and returns a string. For money, calculate in cents as integers.', 'toFixed yalnızca gösterim içindir ve metin döndürür. Para hesapları için kuruş cinsinden tam sayıyla hesapla.') }),

  // ───────── Senior ─────────
  output({ id: 'js-s2-getter-json', level: 'senior', topic,
    code: `const cart = {
  items: [5, 10],
  get total() { return this.items.reduce((a, b) => a + b, 0) },
}
console.log(JSON.stringify(cart))`,
    options: ['{"items":[5,10],"total":15}', '{"items":[5,10]}', '{"items":[5,10],"total":{}}', 'Error'], answer: 0,
    why: W('JSON.stringify يقرأ الـ getters كخصائص عادية ويحفظ قيمتها الحالية، أما الدوال العادية فتُحذف.', 'JSON.stringify reads getters like normal properties and stores their current value; plain functions are dropped.', 'JSON.stringify getter’ları normal özellik gibi okur ve mevcut değerlerini saklar; düz fonksiyonlar düşer.') }),
  output({ id: 'js-s2-holes', level: 'senior', topic,
    code: `const a = [1, , 3]
console.log(a.length, 1 in a, a.map(x => x * 2))`,
    options: ['3 false [ 2, <1 empty item>, 6 ]', '3 true [ 2, NaN, 6 ]', '2 false [ 2, 6 ]', '3 false [ 2, undefined, 6 ]'], answer: 0,
    why: W('الفراغ في المصفوفة ليس undefined بل خانة غير موجودة، وmap تتخطاه. تجنب المصفوفات المثقوبة، فهي أبطأ ومربكة.', 'A hole is not undefined but a missing slot, and map skips it. Avoid sparse arrays: they are slower and confusing.', 'Dizideki boşluk undefined değil, var olmayan bir yuvadır; map onu atlar. Seyrek dizilerden kaçın: daha yavaş ve kafa karıştırıcıdır.') }),
  output({ id: 'js-s2-custom-iterable', level: 'senior', topic,
    code: `const range = {
  from: 1, to: 3,
  *[Symbol.iterator]() { for (let i = this.from; i <= this.to; i++) yield i },
}
console.log([...range], Math.max(...range))`,
    options: ['[ 1, 2, 3 ] 3', '[ range ] NaN', 'Error', '[ 1, 3 ] 3'], answer: 0,
    why: W('أي كائن يعرّف Symbol.iterator يعمل مع spread وfor…of وArray.from، والـ generator أسهل طريقة لكتابته.', 'Any object that defines Symbol.iterator works with spread, for…of and Array.from, and a generator is the easiest way to write it.', 'Symbol.iterator tanımlayan her nesne spread, for…of ve Array.from ile çalışır; generator onu yazmanın en kolay yoludur.') }),
  output({ id: 'js-s2-tagged-template', level: 'senior', topic,
    code: `const tag = (strings, ...values) => strings.join('|') + ' / ' + values.join(',')
console.log(tag\`a\${1}b\${2}\`)`,
    options: ['a|b| / 1,2', 'a1b2 / 1,2', 'a|b / 1,2', 'a|1|b|2 /'], answer: 0,
    why: W('الدالة تأخذ الأجزاء النصية (وهي دائمًا أكثر من القيم بواحد) ثم القيم منفصلة. هكذا تعمل sql`` وhtml`` لترميز القيم بأمان.', 'The function receives the string parts (always one more than the values) and the values separately. That is how sql`` and html`` escape values safely.', 'Fonksiyon metin parçalarını (her zaman değerlerden bir fazla) ve değerleri ayrı alır. sql`` ve html`` değerleri böyle güvenle escape eder.') }),
  output({ id: 'js-s2-freeze-shallow', level: 'senior', topic,
    code: `const config = Object.freeze({ db: { host: 'localhost' } })
config.db.host = 'prod-db'
console.log(config.db.host, Object.isFrozen(config), Object.isFrozen(config.db))`,
    options: ['prod-db true false', 'localhost true true', 'Error', 'localhost true false'], answer: 0,
    why: W('Object.freeze سطحي: الكائنات الداخلية تبقى قابلة للتعديل. للتجميد الكامل جمّد كل مستوى، أو استخدم readonly في TypeScript.', 'Object.freeze is shallow: nested objects stay mutable. To freeze fully, freeze every level, or use readonly in TypeScript.', 'Object.freeze yüzeyseldir: iç içe nesneler değiştirilebilir kalır. Tamamen dondurmak için her seviyeyi dondur ya da TypeScript’te readonly kullan.') }),
  output({ id: 'js-s2-module-this', level: 'senior', topic,
    code: `// inside an ES module (type="module" or .mjs)
console.log(typeof this, typeof globalThis)`,
    options: ['undefined object', 'object object', 'window object', 'undefined undefined'], answer: 0,
    why: W('في ES modules تكون this في المستوى الأعلى undefined (والوضع strict تلقائيًا). للوصول للكائن العام استخدم globalThis في أي بيئة.', 'In ES modules top-level this is undefined (and strict mode is automatic). To reach the global object anywhere, use globalThis.', 'ES modüllerinde en üst seviyedeki this undefined’dır (ve katı mod otomatiktir). Global nesneye her ortamda ulaşmak için globalThis kullan.') }),
  output({ id: 'js-s2-parse-number', level: 'senior', topic,
    code: `console.log(parseFloat('3.14kg'), Number('3.14kg'), Number(''), parseInt('08'))`,
    options: ['3.14 NaN 0 8', '3.14 3.14 NaN 8', 'NaN NaN 0 0', '3.14 NaN NaN 8'], answer: 0,
    why: W('parseFloat تقرأ حتى أول حرف غير رقمي، وNumber ترفض النص كله. وانتبه: Number(\'\') تعطي 0 لا NaN، فحقل فارغ يصبح صفرًا.', 'parseFloat reads up to the first non-digit, while Number rejects the whole string. Watch out: Number(\'\') is 0, not NaN, so an empty field becomes zero.', 'parseFloat ilk rakam olmayan karaktere kadar okur, Number tüm metni reddeder. Dikkat: Number(\'\') NaN değil 0’dır; boş alan sıfır olur.') }),
]
