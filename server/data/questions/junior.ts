import type { Question } from '#shared/types/quiz'
import { output } from './helpers'

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
]
