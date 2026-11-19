import type { Question } from '#shared/types/quiz'
import { choice, output } from './helpers'

const level = 'junior' as const

export const JUNIOR: Question[] = [
  // ── Types and coercion ──
  output({
    id: 'j-plus-string', level, topic: 'javascript',
    code: `console.log(1 + '2');`,
    options: ['3', '12', 'NaN', 'TypeError'],
    answer: 1,
    why: {
      ar: 'إذا كان أحد طرفي + نصًّا، يتحوّل الطرف الآخر إلى نص ويُدمجان. لذلك 1 + \'2\' تعطي "12" وليس 3.',
      en: 'If either side of + is a string, the other side becomes a string and they are joined. So 1 + \'2\' gives "12", not 3.',
      tr: '+ işaretinin bir tarafı metin ise diğer taraf da metne çevrilir ve birleştirilir. Bu yüzden 1 + \'2\' sonucu 3 değil "12" olur.',
    },
  }),
  output({
    id: 'j-minus-string', level, topic: 'javascript',
    code: `console.log('5' - 2);`,
    options: ['3', '52', 'NaN', '"5-2"'],
    answer: 0,
    why: {
      ar: 'العامل - لا يعمل مع النصوص، فيحوّل \'5\' إلى الرقم 5 ثم يطرح. فقط + هو الذي يدمج النصوص.',
      en: 'The - operator has no string meaning, so \'5\' is converted to the number 5 and then subtracted. Only + joins strings.',
      tr: '- operatörünün metinlerle bir anlamı yoktur; \'5\' sayıya (5) çevrilir ve çıkarma yapılır. Metinleri yalnızca + birleştirir.',
    },
  }),
  output({
    id: 'j-unary-plus', level, topic: 'javascript',
    code: `console.log(+'42px');
console.log(parseInt('42px'));`,
    options: ['42, 42', 'NaN, 42', 'NaN, NaN', '42, NaN'],
    answer: 1,
    why: {
      ar: 'الـ + الأحادي (ومثله Number) يحتاج أن يكون النص كله رقمًا، وإلا يعطي NaN. أما parseInt فيقرأ الأرقام من البداية ويتوقف عند أول حرف غير رقمي.',
      en: 'Unary + (like Number) needs the whole string to be numeric, otherwise it gives NaN. parseInt reads digits from the start and stops at the first non-digit.',
      tr: 'Tekli + (Number gibi) metnin tamamının sayı olmasını ister, değilse NaN verir. parseInt ise baştan rakamları okur ve ilk rakam olmayan karakterde durur.',
    },
  }),
  output({
    id: 'j-loose-equal', level, topic: 'javascript',
    code: `console.log(0 == '');
console.log(0 === '');`,
    options: ['true, false', 'false, false', 'true, true', 'false, true'],
    answer: 0,
    why: {
      ar: '== يحوّل الأنواع قبل المقارنة: النص الفارغ يصبح 0 فتكون النتيجة true. أما === فيقارن النوع أيضًا: رقم ونص، إذن false. استخدم === دائمًا تقريبًا.',
      en: '== converts types before comparing: the empty string becomes 0, so it is true. === also compares the type: number vs string, so false. Use === almost always.',
      tr: '== karşılaştırmadan önce türleri dönüştürür: boş metin 0 olur, sonuç true. === türü de karşılaştırır: sayı ve metin, yani false. Neredeyse her zaman === kullanın.',
    },
  }),
  output({
    id: 'j-nan-equal', level, topic: 'javascript',
    code: `console.log(NaN === NaN);
console.log(Number.isNaN(NaN));`,
    options: ['true, true', 'false, true', 'false, false', 'true, false'],
    answer: 1,
    why: {
      ar: 'NaN هي القيمة الوحيدة في JavaScript التي لا تساوي نفسها. للتحقق منها استخدم Number.isNaN.',
      en: 'NaN is the only value in JavaScript that is not equal to itself. Use Number.isNaN to check for it.',
      tr: 'NaN, JavaScript’te kendisine eşit olmayan tek değerdir. Kontrol etmek için Number.isNaN kullanın.',
    },
  }),
  output({
    id: 'j-float-sum', level, topic: 'javascript',
    code: `console.log(0.1 + 0.2 === 0.3);`,
    options: ['true', 'false', 'NaN', 'TypeError'],
    answer: 1,
    why: {
      ar: 'الأرقام العشرية تُخزَّن بنظام ثنائي لا يمثّل 0.1 و0.2 بدقة، فالمجموع 0.30000000000000004. للمال استخدم أعدادًا صحيحة (قروش أو سنتات)، أو قارن بفرق صغير.',
      en: 'Decimals are stored in binary, which cannot represent 0.1 and 0.2 exactly, so the sum is 0.30000000000000004. For money, use whole numbers (cents) or compare with a small tolerance.',
      tr: 'Ondalık sayılar ikili sistemde saklanır ve 0.1 ile 0.2 tam olarak gösterilemez; toplam 0.30000000000000004 olur. Para için tam sayılar (kuruş) kullanın ya da küçük bir toleransla karşılaştırın.',
    },
  }),
  output({
    id: 'j-boolean-strings', level, topic: 'javascript',
    code: `console.log(Boolean('0'));
console.log(Boolean(0));`,
    options: ['false, false', 'true, false', 'true, true', 'false, true'],
    answer: 1,
    why: {
      ar: 'أي نص غير فارغ يعتبر truthy حتى لو كان "0" أو "false". القيم falsy هي فقط: false و0 و"" وnull وundefined وNaN.',
      en: 'Any non-empty string is truthy, even "0" or "false". The only falsy values are false, 0, "", null, undefined and NaN.',
      tr: 'Boş olmayan her metin truthy’dir, "0" veya "false" bile. Falsy değerler yalnızca false, 0, "", null, undefined ve NaN’dır.',
    },
  }),
  output({
    id: 'j-empty-array-truthy', level, topic: 'javascript',
    code: `if ([]) {
  console.log('yes');
} else {
  console.log('no');
}`,
    options: ['yes', 'no', 'undefined', 'TypeError'],
    answer: 0,
    why: {
      ar: 'كل المصفوفات والكائنات truthy، حتى الفارغة منها. للتحقق من أن المصفوفة فارغة استخدم arr.length === 0.',
      en: 'Every array and object is truthy, even empty ones. To check for an empty array, use arr.length === 0.',
      tr: 'Tüm diziler ve nesneler truthy’dir, boş olsalar bile. Boş dizi kontrolü için arr.length === 0 kullanın.',
    },
  }),
  output({
    id: 'j-string-compare', level, topic: 'javascript',
    code: `console.log('10' < '9');
console.log(10 < 9);`,
    options: ['false, false', 'true, false', 'true, true', 'false, true'],
    answer: 1,
    why: {
      ar: 'مقارنة نصين تتم حرفًا بحرف: "1" قبل "9"، فتكون "10" أصغر. مع الأرقام تتم مقارنة القيمة. حوّل القيم إلى أرقام قبل المقارنة.',
      en: 'Two strings are compared character by character: "1" comes before "9", so "10" is smaller. Numbers are compared by value. Convert to numbers before comparing.',
      tr: 'İki metin karakter karakter karşılaştırılır: "1", "9"dan önce gelir, bu yüzden "10" daha küçüktür. Sayılar değerle karşılaştırılır. Karşılaştırmadan önce sayıya çevirin.',
    },
  }),
  output({
    id: 'j-typeof-array', level, topic: 'javascript',
    code: `console.log(typeof []);
console.log(Array.isArray([]));`,
    options: ['array, true', 'object, true', 'object, false', 'array, false'],
    answer: 1,
    why: {
      ar: 'المصفوفات كائنات في JavaScript، فيعيد typeof القيمة "object". للتحقق من المصفوفة استخدم Array.isArray.',
      en: 'Arrays are objects in JavaScript, so typeof returns "object". Use Array.isArray to check for an array.',
      tr: 'Diziler JavaScript’te nesnedir, bu yüzden typeof "object" döndürür. Dizi kontrolü için Array.isArray kullanın.',
    },
  }),
  output({
    id: 'j-object-identity', level, topic: 'javascript',
    code: `console.log({} === {});
console.log([1] == [1]);`,
    options: ['true, true', 'false, false', 'true, false', 'false, true'],
    answer: 1,
    why: {
      ar: 'الكائنات والمصفوفات تُقارَن بالمرجع لا بالمحتوى. كل {} أو [1] جديد هو كائن مختلف في الذاكرة، حتى لو بدا متطابقًا.',
      en: 'Objects and arrays are compared by reference, not by content. Every new {} or [1] is a different object in memory, even if it looks the same.',
      tr: 'Nesneler ve diziler içerikle değil referansla karşılaştırılır. Her yeni {} veya [1], aynı görünse de bellekte farklı bir nesnedir.',
    },
  }),

  // ── Variables and scope ──
  output({
    id: 'j-var-hoisting', level, topic: 'javascript',
    code: `console.log(x);
var x = 5;`,
    options: ['5', 'undefined', 'ReferenceError', 'null'],
    answer: 1,
    why: {
      ar: 'تعريف var يُرفع (hoisting) إلى أعلى الدالة، لكن الإسناد يبقى في مكانه. فالمتغير موجود قبل السطر الثاني لكن قيمته undefined.',
      en: 'A var declaration is hoisted to the top of the function, but the assignment stays where it is. So x exists before line 2, but its value is undefined.',
      tr: 'var tanımı fonksiyonun en üstüne taşınır (hoisting), ama atama yerinde kalır. Yani x ikinci satırdan önce vardır ama değeri undefined’dır.',
    },
  }),
  output({
    id: 'j-let-tdz', level, topic: 'javascript',
    code: `console.log(y);
let y = 5;`,
    options: ['5', 'undefined', 'ReferenceError', 'null'],
    answer: 2,
    why: {
      ar: 'let وconst يُرفعان أيضًا، لكنهما في "المنطقة الميتة المؤقتة" (TDZ) حتى سطر التعريف. أي وصول قبله يرمي ReferenceError، وهذا أفضل من undefined الصامت.',
      en: 'let and const are hoisted too, but they stay in the "temporal dead zone" (TDZ) until their declaration line. Any access before it throws a ReferenceError, which is safer than a silent undefined.',
      tr: 'let ve const da yukarı taşınır ama tanım satırına kadar "geçici ölü bölgede" (TDZ) kalır. Öncesinde erişim ReferenceError fırlatır; sessiz bir undefined’dan daha güvenlidir.',
    },
  }),
  output({
    id: 'j-function-hoisting', level, topic: 'javascript',
    code: `console.log(sum(2, 3));

function sum(a, b) {
  return a + b;
}`,
    options: ['5', 'undefined', 'ReferenceError', 'TypeError'],
    answer: 0,
    why: {
      ar: 'تعريف الدالة بكلمة function يُرفع كاملًا مع جسمه، لذلك يمكن استدعاؤها قبل سطر تعريفها.',
      en: 'A function declaration is hoisted together with its body, so it can be called before the line where it is written.',
      tr: 'function anahtar kelimesiyle yapılan tanım gövdesiyle birlikte yukarı taşınır; bu yüzden yazıldığı satırdan önce çağrılabilir.',
    },
  }),
  output({
    id: 'j-arrow-hoisting', level, topic: 'javascript',
    code: `console.log(sum(2, 3));

const sum = (a, b) => a + b;`,
    options: ['5', 'undefined', 'ReferenceError', 'TypeError'],
    answer: 2,
    why: {
      ar: 'هنا الدالة مخزّنة في متغير const، فتنطبق عليه قاعدة TDZ: لا يمكن استخدامه قبل سطر تعريفه، فيُرمى ReferenceError.',
      en: 'Here the function is stored in a const, so the TDZ rule applies: it cannot be used before its line, so a ReferenceError is thrown.',
      tr: 'Burada fonksiyon bir const içinde saklanır, bu yüzden TDZ kuralı geçerlidir: tanım satırından önce kullanılamaz ve ReferenceError fırlatılır.',
    },
  }),
  output({
    id: 'j-const-push', level, topic: 'javascript',
    code: `const nums = [1, 2];
nums.push(3);
console.log(nums);`,
    options: ['[1, 2, 3]', 'TypeError', '[1, 2]', 'undefined'],
    answer: 0,
    why: {
      ar: 'const يمنع إعادة إسناد المتغير لمصفوفة أخرى، لكنه لا يمنع تعديل المصفوفة نفسها. لتجميدها استخدم Object.freeze.',
      en: 'const stops the variable from pointing to another array, but it does not stop changes to the array itself. Use Object.freeze to lock it.',
      tr: 'const değişkenin başka bir diziye atanmasını engeller, ama dizinin kendisinin değişmesini engellemez. Kilitlemek için Object.freeze kullanın.',
    },
  }),
  output({
    id: 'j-closure-counter', level, topic: 'javascript',
    code: `function counter() {
  let count = 0;
  return () => ++count;
}

const next = counter();
next();
console.log(next());`,
    options: ['0', '1', '2', 'undefined'],
    answer: 2,
    why: {
      ar: 'الدالة المُعادة تحتفظ بالوصول إلى count حتى بعد انتهاء counter، وهذا هو الـ closure. الاستدعاء الأول جعلها 1 والثاني 2.',
      en: 'The returned function keeps access to count even after counter has finished: that is a closure. The first call makes it 1, the second makes it 2.',
      tr: 'Döndürülen fonksiyon, counter bittikten sonra bile count’a erişimini korur: buna closure denir. İlk çağrı 1, ikincisi 2 yapar.',
    },
  }),

  // ── Strings ──
  output({
    id: 'j-string-methods-new', level, topic: 'javascript',
    code: `const word = 'cat';
const loud = word.toUpperCase();
console.log(loud, word);`,
    options: ['CAT cat', 'CAT CAT', 'cat cat', 'TypeError'],
    answer: 0,
    why: {
      ar: 'النصوص في JavaScript غير قابلة للتعديل. دوال النصوص مثل toUpperCase وreplace وtrim لا تغيّر النص الأصلي، بل تعيد نصًّا جديدًا.',
      en: 'Strings in JavaScript are immutable. String methods like toUpperCase, replace and trim never change the original, they return a new string.',
      tr: 'JavaScript’te metinler değiştirilemez. toUpperCase, replace ve trim gibi metin metotları orijinali değiştirmez, yeni bir metin döndürür.',
    },
  }),
  output({
    id: 'j-template-literal', level, topic: 'javascript',
    code: 'const n = 3;\nconsole.log(`${n} + ${n} = ${n + n}`);',
    options: ['3 + 3 = 6', '3 + 3 = 33', '${n} + ${n} = ${n + n}', 'n + n = 6'],
    answer: 0,
    why: {
      ar: 'داخل الـ template literal (بين علامتي `) يُنفَّذ كل ما بين ${ } كتعبير JavaScript. n + n هنا جمع أرقام لأن n رقم، فالناتج 6.',
      en: 'Inside a template literal (between backticks), everything in ${ } runs as a JavaScript expression. n + n is a number sum because n is a number, so it is 6.',
      tr: 'Template literal içinde (ters tırnaklar arasında) ${ } içindeki her şey JavaScript ifadesi olarak çalışır. n bir sayı olduğu için n + n toplama yapar ve 6 olur.',
    },
  }),
  output({
    id: 'j-trim-length', level, topic: 'javascript',
    code: `const input = '  hi  ';
console.log(input.length, input.trim().length);`,
    options: ['6 2', '2 2', '6 6', '4 2'],
    answer: 0,
    why: {
      ar: 'length تعدّ المسافات أيضًا. trim تزيل المسافات من البداية والنهاية فقط وتعيد نصًّا جديدًا، ولا تغيّر input الأصلي.',
      en: 'length counts spaces too. trim removes spaces only from the start and end, and returns a new string without changing input.',
      tr: 'length boşlukları da sayar. trim yalnızca baştaki ve sondaki boşlukları siler ve input’u değiştirmeden yeni bir metin döndürür.',
    },
  }),

  // ── Arrays ──
  output({
    id: 'j-array-hole-length', level, topic: 'javascript',
    code: `const list = [1, 2, 3];
list[10] = 4;
console.log(list.length);`,
    options: ['4', '10', '11', '3'],
    answer: 2,
    why: {
      ar: 'length تساوي أكبر فهرس + 1، وليس عدد العناصر الفعلية. الإسناد إلى الفهرس 10 يترك فراغات من 3 إلى 9.',
      en: 'length is the highest index + 1, not the number of real items. Assigning to index 10 leaves empty slots from 3 to 9.',
      tr: 'length, gerçek öğe sayısı değil en büyük indeks + 1’dir. 10. indekse atama yapmak 3’ten 9’a kadar boş yerler bırakır.',
    },
  }),
  output({
    id: 'j-slice', level, topic: 'javascript',
    code: `const a = [1, 2, 3, 4];
const b = a.slice(1, 3);
console.log(a, b);`,
    options: ['[1, 2, 3, 4] [2, 3]', '[1, 4] [2, 3]', '[1, 2, 3, 4] [2, 3, 4]', '[1] [2, 3, 4]'],
    answer: 0,
    why: {
      ar: 'slice لا يغيّر المصفوفة الأصلية، ويعيد نسخة من البداية حتى النهاية دون أن يشمل النهاية: الفهرس 1 و2 فقط.',
      en: 'slice does not change the original array. It returns a copy from start up to, but not including, end: indexes 1 and 2 only.',
      tr: 'slice orijinal diziyi değiştirmez. Başlangıçtan bitişe kadar (bitiş hariç) bir kopya döndürür: yalnızca 1. ve 2. indeksler.',
    },
  }),
  output({
    id: 'j-splice', level, topic: 'javascript',
    code: `const a = [1, 2, 3, 4];
a.splice(1, 2);
console.log(a);`,
    options: ['[1, 2, 3, 4]', '[1, 4]', '[2, 3]', '[1, 3, 4]'],
    answer: 1,
    why: {
      ar: 'على عكس slice، يعدّل splice المصفوفة نفسها. splice(1, 2) يحذف عنصرين بدءًا من الفهرس 1، أي 2 و3.',
      en: 'Unlike slice, splice changes the array itself. splice(1, 2) removes two items starting at index 1, which are 2 and 3.',
      tr: 'slice’ın aksine splice dizinin kendisini değiştirir. splice(1, 2), 1. indeksten başlayarak iki öğeyi (2 ve 3) siler.',
    },
  }),
  output({
    id: 'j-delete-array', level, topic: 'javascript',
    code: `const a = [1, 2, 3];
delete a[1];
console.log(a.length);`,
    options: ['2', '3', 'undefined', 'TypeError'],
    answer: 1,
    why: {
      ar: 'delete يزيل القيمة لكنه يترك مكانها فارغًا، فلا يتغيّر length. لحذف عنصر من مصفوفة استخدم splice أو filter.',
      en: 'delete removes the value but leaves an empty slot, so length does not change. Use splice or filter to remove an item from an array.',
      tr: 'delete değeri siler ama yerini boş bırakır, bu yüzden length değişmez. Diziden öğe silmek için splice veya filter kullanın.',
    },
  }),
  output({
    id: 'j-join-nested', level, topic: 'javascript',
    code: `console.log([1, [2, 3]].join('-'));`,
    options: ['1-2-3', '1-2,3', '1-[2,3]', '1,2,3'],
    answer: 1,
    why: {
      ar: 'join يحوّل كل عنصر إلى نص. المصفوفة الداخلية [2, 3] تصبح "2,3" (بالفاصلة الافتراضية)، ثم يُضاف - بين العناصر الخارجية فقط.',
      en: 'join turns each item into a string. The inner array [2, 3] becomes "2,3" (default comma), then - is added only between the outer items.',
      tr: 'join her öğeyi metne çevirir. İçteki [2, 3] dizisi "2,3" olur (varsayılan virgül), sonra - yalnızca dıştaki öğelerin arasına eklenir.',
    },
  }),
  output({
    id: 'j-includes-nan', level, topic: 'javascript',
    code: `const values = [NaN];
console.log(values.includes(NaN));
console.log(values.indexOf(NaN));`,
    options: ['true, 0', 'true, -1', 'false, -1', 'false, 0'],
    answer: 1,
    why: {
      ar: 'indexOf يستخدم === ولأن NaN لا يساوي نفسه لا يجده أبدًا (-1). أما includes فيعامل NaN معاملة خاصة ويجده.',
      en: 'indexOf uses ===, and since NaN is not equal to itself it never finds it (-1). includes treats NaN specially and finds it.',
      tr: 'indexOf === kullanır ve NaN kendisine eşit olmadığı için onu asla bulamaz (-1). includes ise NaN’ı özel olarak ele alır ve bulur.',
    },
  }),

  // ── Objects and functions ──
  output({
    id: 'j-spread-copy', level, topic: 'javascript',
    code: `const a = { x: 1 };
const b = { ...a };
b.x = 2;
console.log(a.x);`,
    options: ['1', '2', 'undefined', 'TypeError'],
    answer: 0,
    why: {
      ar: 'الـ spread ينشئ كائنًا جديدًا وينسخ الخصائص إليه، فتعديل b لا يؤثر على a. انتبه: النسخ سطحي، فالكائنات الداخلية تبقى مشتركة.',
      en: 'Spread creates a new object and copies the properties into it, so changing b does not affect a. Careful: the copy is shallow, nested objects are still shared.',
      tr: 'Spread yeni bir nesne oluşturup özellikleri kopyalar; b’yi değiştirmek a’yı etkilemez. Dikkat: kopya yüzeyseldir, iç içe nesneler hâlâ paylaşılır.',
    },
  }),
  output({
    id: 'j-default-param-null', level, topic: 'javascript',
    code: `function greet(name = 'Guest') {
  return 'Hi ' + name;
}

console.log(greet(undefined));
console.log(greet(null));`,
    options: ['Hi Guest, Hi Guest', 'Hi Guest, Hi null', 'Hi undefined, Hi null', 'Hi Guest, Hi '],
    answer: 1,
    why: {
      ar: 'القيمة الافتراضية تُستخدم فقط عندما يكون الوسيط undefined. أما null فقيمة مقصودة، فتُمرَّر كما هي.',
      en: 'A default value is used only when the argument is undefined. null is a deliberate value, so it is passed through as is.',
      tr: 'Varsayılan değer yalnızca argüman undefined olduğunda kullanılır. null bilinçli bir değerdir, olduğu gibi aktarılır.',
    },
  }),
  output({
    id: 'j-optional-chaining', level, topic: 'javascript',
    code: `const user = {};
console.log(user.address?.city);`,
    options: ['undefined', 'null', 'TypeError', '""'],
    answer: 0,
    why: {
      ar: 'الـ ?. يتوقف ويعيد undefined إذا كان ما قبله null أو undefined. بدونه، user.address.city كان سيرمي TypeError.',
      en: '?. stops and returns undefined when the value before it is null or undefined. Without it, user.address.city would throw a TypeError.',
      tr: '?. kendinden önceki değer null veya undefined ise durur ve undefined döndürür. Onsuz user.address.city bir TypeError fırlatırdı.',
    },
  }),
  output({
    id: 'j-destructure-default', level, topic: 'javascript',
    code: `const { a = 10, b = 20 } = { a: undefined, b: null };
console.log(a, b);`,
    options: ['10 20', '10 null', 'undefined null', 'undefined 20'],
    answer: 1,
    why: {
      ar: 'نفس قاعدة الوسائط: القيمة الافتراضية في الـ destructuring تُستخدم فقط مع undefined. null يبقى null.',
      en: 'Same rule as parameters: a destructuring default is used only for undefined. null stays null.',
      tr: 'Parametrelerle aynı kural: destructuring varsayılanı yalnızca undefined için kullanılır. null, null olarak kalır.',
    },
  }),

  // ── Control flow ──
  output({
    id: 'j-switch-fallthrough', level, topic: 'javascript',
    code: `const day = 2;

switch (day) {
  case 1: console.log('one');
  case 2: console.log('two');
  case 3: console.log('three'); break;
  default: console.log('other');
}`,
    options: ['two', 'two, three', 'two, three, other', 'one, two, three'],
    answer: 1,
    why: {
      ar: 'بدون break يكمل switch تنفيذ الحالات التالية (fall-through). يبدأ من case 2 ويكمل إلى case 3 ثم يتوقف عند break.',
      en: 'Without break, switch keeps running the next cases (fall-through). It starts at case 2, continues into case 3 and stops at break.',
      tr: 'break olmadan switch sonraki durumları da çalıştırır (fall-through). case 2’den başlar, case 3’e devam eder ve break’te durur.',
    },
  }),
  output({
    id: 'j-for-in-keys', level, topic: 'javascript',
    code: `for (const i in ['a', 'b']) {
  console.log(typeof i);
}`,
    options: ['number, number', 'string, string', 'a, b', 'object, object'],
    answer: 1,
    why: {
      ar: 'for...in يمرّ على مفاتيح الكائن، وهي دائمًا نصوص ("0" و"1") حتى في المصفوفات. للمرور على القيم استخدم for...of.',
      en: 'for...in loops over object keys, which are always strings ("0" and "1"), even for arrays. Use for...of to loop over the values.',
      tr: 'for...in nesne anahtarlarında döner ve anahtarlar dizilerde bile her zaman metindir ("0" ve "1"). Değerlerde dönmek için for...of kullanın.',
    },
  }),

  // ── More JavaScript ──
  output({
    id: 'j-push-returns', level, topic: 'javascript',
    code: `const result = [1, 2].push(3);
console.log(result);`,
    options: ['[1, 2, 3]', '3', 'undefined', '1'],
    answer: 1,
    why: {
      ar: 'push يعدّل المصفوفة ويعيد طولها الجديد، لا المصفوفة نفسها. خطأ شائع: const list = arr.push(x) ثم معاملة list كمصفوفة.',
      en: 'push changes the array and returns its new length, not the array. A common bug: const list = arr.push(x) and then treating list as an array.',
      tr: 'push diziyi değiştirir ve dizinin kendisini değil yeni uzunluğunu döndürür. Sık hata: const list = arr.push(x) yazıp list’i dizi gibi kullanmak.',
    },
  }),
  output({
    id: 'j-modulo-negative', level, topic: 'javascript',
    code: `console.log(7 % 3, -7 % 3);`,
    options: ['1 -1', '1 2', '1 1', '2 -1'],
    answer: 0,
    why: {
      ar: 'العامل % في JavaScript هو "الباقي" ويأخذ إشارة الطرف الأيسر، فيعطي -1 مع الأرقام السالبة. إذا أردت نتيجة موجبة دائمًا: ((n % m) + m) % m.',
      en: 'In JavaScript % is the remainder and takes the sign of the left side, so it gives -1 for negatives. For an always-positive result use ((n % m) + m) % m.',
      tr: 'JavaScript’te % kalan operatörüdür ve sol tarafın işaretini alır; negatiflerde -1 verir. Her zaman pozitif sonuç için ((n % m) + m) % m kullanın.',
    },
  }),

  // ── HTML ──
  choice({
    id: 'j-html-alt', level, topic: 'html',
    code: `<img src="divider.png" alt="">`, codeLang: 'html',
    prompt: {
      ar: 'صورة زخرفية فقط (خط فاصل). لماذا alt فارغ هنا هو الصحيح؟',
      en: 'This image is purely decorative (a divider). Why is an empty alt correct here?',
      tr: 'Bu görsel tamamen süs amaçlı (bir ayırıcı). Burada boş alt neden doğrudur?',
    },
    options: {
      ar: ['لأن قارئ الشاشة سيتجاهلها بدل أن يقرأ اسم الملف', 'لأن alt غير مهم للصور', 'لأنه يسرّع تحميل الصورة', 'لأنه يخفي الصورة عن الـ SEO فقط'],
      en: ['Screen readers skip it instead of reading the file name', 'Because alt does not matter for images', 'It makes the image load faster', 'It only hides the image from SEO'],
      tr: ['Ekran okuyucular dosya adını okumak yerine onu atlar', 'Çünkü alt görseller için önemsizdir', 'Görselin daha hızlı yüklenmesini sağlar', 'Yalnızca SEO’dan gizler'],
    },
    answer: 0,
    why: {
      ar: 'alt="" تعني "هذه الصورة لا تحمل معلومة". بدون alt أصلًا قد يقرأ قارئ الشاشة اسم الملف. أما الصور التي تحمل معنى فيجب أن يصف alt محتواها.',
      en: 'alt="" means "this image carries no information". With no alt at all, a screen reader may read out the file name. Images that carry meaning need an alt that describes them.',
      tr: 'alt="", "bu görsel bilgi taşımıyor" demektir. Hiç alt yoksa ekran okuyucu dosya adını okuyabilir. Anlam taşıyan görsellerde alt içeriği tarif etmelidir.',
    },
  }),
  choice({
    id: 'j-html-label', level, topic: 'html',
    code: `<label for="email">Email</label>
<input id="email" type="email">`, codeLang: 'html',
    prompt: {
      ar: 'ما فائدة ربط الـ label بالـ input عبر for وid؟',
      en: 'What does linking the label to the input with for and id give you?',
      tr: 'label’ı input’a for ve id ile bağlamak ne sağlar?',
    },
    options: {
      ar: ['الضغط على النص يركّز الحقل، وقارئ الشاشة يقرأ اسم الحقل', 'يغيّر لون الحقل', 'يتحقق من صحة الإيميل', 'لا فائدة، هو للتنسيق فقط'],
      en: ['Clicking the text focuses the field, and screen readers announce its name', 'It changes the field’s color', 'It validates the email', 'Nothing, it is just for styling'],
      tr: ['Metne tıklamak alanı odaklar ve ekran okuyucular alanın adını söyler', 'Alanın rengini değiştirir', 'E-postayı doğrular', 'Hiçbir şey, yalnızca stil içindir'],
    },
    answer: 0,
    why: {
      ar: 'الـ label المرتبط يكبّر مساحة النقر (مهم على الموبايل) ويعطي الحقل اسمًا مسموعًا. الـ placeholder ليس بديلًا عنه لأنه يختفي عند الكتابة.',
      en: 'A linked label makes the click target bigger (important on mobile) and gives the field an accessible name. A placeholder is not a replacement because it disappears while typing.',
      tr: 'Bağlı bir label tıklama alanını büyütür (mobilde önemli) ve alana erişilebilir bir ad verir. placeholder onun yerine geçmez çünkü yazarken kaybolur.',
    },
  }),
  choice({
    id: 'j-html-main', level, topic: 'html',
    prompt: {
      ar: 'أي وسم مخصّص للمحتوى الرئيسي الفريد في الصفحة؟',
      en: 'Which tag is meant for the page’s unique main content?',
      tr: 'Sayfanın benzersiz ana içeriği için hangi etiket kullanılır?',
    },
    options: ['<main>', '<section>', '<div id="main">', '<article>'],
    answer: 0,
    why: {
      ar: '<main> يظهر مرة واحدة في الصفحة ويحدد محتواها الأساسي، فيستطيع مستخدمو قارئ الشاشة القفز إليه مباشرة. <section> و<article> لتقسيم المحتوى داخله.',
      en: '<main> appears once per page and marks its core content, so screen reader users can jump straight to it. <section> and <article> divide the content inside it.',
      tr: '<main> sayfada bir kez bulunur ve ana içeriği işaretler; ekran okuyucu kullanıcıları doğrudan oraya atlayabilir. <section> ve <article> onun içindeki içeriği böler.',
    },
  }),
  choice({
    id: 'j-html-button-submit', level, topic: 'html',
    code: `<form action="/save">
  <input name="title">
  <button>Preview</button>
</form>`, codeLang: 'html',
    prompt: {
      ar: 'ماذا يحدث عند الضغط على Preview؟',
      en: 'What happens when Preview is clicked?',
      tr: 'Preview’a tıklanınca ne olur?',
    },
    options: {
      ar: ['يُرسَل الفورم، لأن الزر داخل form نوعه submit افتراضيًا', 'لا شيء', 'يُمسح الفورم', 'يظهر خطأ'],
      en: ['The form is submitted, because a button in a form is type="submit" by default', 'Nothing', 'The form is reset', 'An error is shown'],
      tr: ['Form gönderilir, çünkü form içindeki buton varsayılan olarak type="submit"’tir', 'Hiçbir şey', 'Form sıfırlanır', 'Hata gösterilir'],
    },
    answer: 0,
    why: {
      ar: 'أي <button> داخل form بدون type يتصرف كـ submit. للأزرار التي لا يجب أن ترسل الفورم اكتب type="button" دائمًا.',
      en: 'Any <button> inside a form with no type acts as submit. For buttons that should not send the form, always write type="button".',
      tr: 'Form içinde type’ı olmayan her <button> submit gibi davranır. Formu göndermemesi gereken butonlara her zaman type="button" yazın.',
    },
  }),

  // ── CSS ──
  choice({
    id: 'j-css-inline-width', level, topic: 'css',
    code: `span {
  width: 200px;
  height: 50px;
}`, codeLang: 'css',
    prompt: {
      ar: 'لماذا لا يتغيّر عرض الـ span وارتفاعه؟',
      en: 'Why do the span’s width and height not change?',
      tr: 'span’ın genişliği ve yüksekliği neden değişmiyor?',
    },
    options: {
      ar: ['لأن span عنصر inline، وwidth وheight لا تؤثر عليه', 'لأن span لا يقبل CSS', 'لأن القيم يجب أن تكون بـ %', 'لأنه يحتاج !important'],
      en: ['span is inline, and width and height do not apply to inline elements', 'span does not accept CSS', 'The values must be in %', 'It needs !important'],
      tr: ['span inline’dır ve width/height inline öğelere uygulanmaz', 'span CSS kabul etmez', 'Değerler % olmalı', '!important gerekir'],
    },
    answer: 0,
    why: {
      ar: 'العناصر inline تأخذ حجم محتواها. لتطبيق width وheight اجعله display: inline-block أو block، أو ضعه داخل flex أو grid.',
      en: 'Inline elements size to their content. To apply width and height, make it display: inline-block or block, or place it inside flex or grid.',
      tr: 'Inline öğeler içerikleri kadar yer kaplar. width ve height uygulamak için display: inline-block veya block yapın ya da flex/grid içine koyun.',
    },
  }),
  choice({
    id: 'j-css-important', level, topic: 'css',
    code: `/* <p class="note" style="color: blue">Hi</p> */

.note { color: red !important; }`, codeLang: 'css',
    prompt: {
      ar: 'ما لون النص؟',
      en: 'What color is the text?',
      tr: 'Metnin rengi nedir?',
    },
    options: ['red', 'blue', 'black', 'purple'],
    answer: 0,
    why: {
      ar: 'الـ style المضمّن أقوى من أي محدد عادي، لكن !important يتغلّب عليه. استخدم !important نادرًا، لأنه يجعل تعديل التنسيق لاحقًا صعبًا.',
      en: 'An inline style beats any normal selector, but !important beats it. Use !important rarely, because it makes later style changes hard.',
      tr: 'Satır içi stil her normal seçiciyi yener, ama !important onu da yener. !important’ı nadiren kullanın; sonradan stil değiştirmeyi zorlaştırır.',
    },
  }),
  choice({
    id: 'j-css-center', level, topic: 'css',
    prompt: {
      ar: 'أبسط طريقة لتوسيط عنصر أفقيًا وعموديًا داخل حاويته؟',
      en: 'What is the simplest way to center an item horizontally and vertically in its container?',
      tr: 'Bir öğeyi kapsayıcısında yatay ve dikey ortalamanın en basit yolu nedir?',
    },
    options: [
      'display: flex; justify-content: center; align-items: center;',
      'text-align: center; vertical-align: middle;',
      'margin: auto; float: center;',
      'position: center;',
    ],
    answer: 0,
    why: {
      ar: 'في flex: justify-content يوسّط على المحور الرئيسي (أفقيًا افتراضيًا) وalign-items على المحور العرضي. وفي grid تكفي place-items: center.',
      en: 'In flex, justify-content centers along the main axis (horizontal by default) and align-items along the cross axis. In grid, place-items: center is enough.',
      tr: 'Flex’te justify-content ana eksende (varsayılan yatay), align-items çapraz eksende ortalar. Grid’de place-items: center yeterlidir.',
    },
  }),
  choice({
    id: 'j-css-min-width-media', level, topic: 'css',
    code: `.menu { display: none; }

@media (min-width: 768px) {
  .menu { display: flex; }
}`, codeLang: 'css',
    prompt: {
      ar: 'على أي شاشات تظهر القائمة؟',
      en: 'On which screens is the menu visible?',
      tr: 'Menü hangi ekranlarda görünür?',
    },
    options: {
      ar: ['768px وأعرض', 'أقل من 768px', 'كل الشاشات', 'ولا شاشة'],
      en: ['768px and wider', 'Narrower than 768px', 'All screens', 'No screens'],
      tr: ['768px ve daha geniş', '768px’ten dar', 'Tüm ekranlar', 'Hiçbir ekran'],
    },
    answer: 0,
    why: {
      ar: 'هذا أسلوب mobile-first: التنسيق الأساسي للموبايل (مخفية)، وmin-width تضيف تغييرات للشاشات الأعرض من 768px.',
      en: 'This is mobile-first: the base styles are for mobile (hidden), and min-width adds changes for screens 768px and wider.',
      tr: 'Bu mobile-first yaklaşımıdır: temel stiller mobil içindir (gizli), min-width ise 768px ve daha geniş ekranlar için değişiklik ekler.',
    },
  }),
  choice({
    id: 'j-css-position-fixed', level, topic: 'css',
    prompt: {
      ar: 'زر "للأعلى" يجب أن يبقى في زاوية الشاشة حتى أثناء التمرير. أي position؟',
      en: 'A "back to top" button must stay in the screen corner even while scrolling. Which position?',
      tr: '"Yukarı çık" butonu kaydırırken bile ekran köşesinde kalmalı. Hangi position?',
    },
    options: ['fixed', 'absolute', 'relative', 'static'],
    answer: 0,
    why: {
      ar: 'fixed يُحدَّد موضعه نسبةً إلى نافذة العرض (viewport) فلا يتحرك مع التمرير. absolute يُحدَّد نسبةً لأقرب أب له position، ويتحرك مع الصفحة.',
      en: 'fixed is positioned relative to the viewport, so it does not move when scrolling. absolute is positioned relative to the nearest positioned ancestor and scrolls with the page.',
      tr: 'fixed görünüm alanına (viewport) göre konumlanır ve kaydırmayla hareket etmez. absolute, konumlandırılmış en yakın üst öğeye göre konumlanır ve sayfayla kayar.',
    },
  }),

  // ── Browser ──
  choice({
    id: 'j-script-in-head', level, topic: 'browser',
    code: `<head>
  <script>
    document.getElementById('title').textContent = 'Hello';
  </script>
</head>
<body>
  <h1 id="title"></h1>
</body>`, codeLang: 'html',
    prompt: {
      ar: 'ماذا يحدث؟',
      en: 'What happens?',
      tr: 'Ne olur?',
    },
    options: {
      ar: ['TypeError، لأن العنصر لم يُنشأ بعد فـ getElementById يعيد null', 'يظهر Hello', 'لا شيء ولا خطأ', 'يظهر Hello بعد ثانية'],
      en: ['TypeError: the element does not exist yet, so getElementById returns null', 'Hello is shown', 'Nothing happens, no error', 'Hello shows after a second'],
      tr: ['TypeError: öğe henüz yok, getElementById null döndürür', 'Hello gösterilir', 'Hiçbir şey olmaz, hata yok', 'Hello bir saniye sonra görünür'],
    },
    answer: 0,
    why: {
      ar: 'المتصفح يقرأ الـ HTML من الأعلى للأسفل ويشغّل السكربت فور وصوله إليه، قبل وجود <h1>. ضع السكربت في نهاية body، أو استخدم defer.',
      en: 'The browser reads HTML top to bottom and runs the script as soon as it reaches it, before <h1> exists. Put the script at the end of body or use defer.',
      tr: 'Tarayıcı HTML’i yukarıdan aşağı okur ve betiği ulaştığı anda, <h1> oluşmadan çalıştırır. Betiği body’nin sonuna koyun ya da defer kullanın.',
    },
  }),
  choice({
    id: 'j-http-post-login', level, topic: 'browser',
    prompt: {
      ar: 'أي طريقة HTTP مناسبة لإرسال فورم تسجيل الدخول (إيميل وكلمة مرور)؟',
      en: 'Which HTTP method fits a login form (email and password)?',
      tr: 'Giriş formu (e-posta ve şifre) için hangi HTTP metodu uygundur?',
    },
    options: ['POST', 'GET', 'HEAD', 'OPTIONS'],
    answer: 0,
    why: {
      ar: 'مع GET تُوضع البيانات في الرابط، فتظهر في السجل والـ logs والـ history. POST يرسلها في جسم الطلب. ومع ذلك يجب أن يكون الموقع على HTTPS ليُشفَّر الطلب كله.',
      en: 'With GET, data goes into the URL, so it shows up in history and server logs. POST sends it in the request body. The site still needs HTTPS so the whole request is encrypted.',
      tr: 'GET ile veri URL’ye konur; geçmişte ve sunucu kayıtlarında görünür. POST onu istek gövdesinde gönderir. Tüm isteğin şifrelenmesi için site yine de HTTPS kullanmalıdır.',
    },
  }),
]
