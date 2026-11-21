import type { Question } from '#shared/types/quiz'
import { choice } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const topic = 'typescript' as const
const t = { codeLang: 'ts' as const, topic }
const WHICH_ERR = W('أي سطر يعطي خطأ في TypeScript؟', 'Which line gives a TypeScript error?', 'Hangi satır TypeScript hatası verir?')

export const TYPESCRIPT_2: Question[] = [
  // ───────── Junior ─────────
  choice({ ...t, id: 't-j2-inference', level: 'junior', prompt: WHICH_ERR,
    code: `let count = 5        // A
count = count + 1    // B
count = 'six'        // C
const n = count * 2  // D`,
    options: ['C', 'A', 'B', 'D'], answer: 0,
    why: W('TypeScript استنتج أن count من نوع number من القيمة الأولى، دون كتابة النوع صراحة.', 'TypeScript inferred count is a number from its first value, without you writing the type.', 'TypeScript, count’un number olduğunu ilk değerinden çıkardı; tipi yazmana gerek kalmadı.') }),
  choice({ ...t, id: 't-j2-implicit-any', level: 'junior',
    prompt: W('مع "strict": true، ما المشكلة هنا؟', 'With "strict": true, what is the problem here?', '"strict": true ile buradaki sorun nedir?'),
    code: `function total(price, qty) {
  return price * qty
}`,
    options: L3(['المعاملات بلا أنواع فتصبح any ضمنيًا، وهذا خطأ في الوضع الصارم', 'لا مشكلة', 'return ممنوعة', 'يجب استخدام arrow function'],
      ['The parameters have no types, so they are implicitly any, which strict mode rejects', 'No problem', 'return is not allowed', 'It must be an arrow function'],
      ['Parametrelerin tipi yok, örtük olarak any olurlar; katı mod bunu reddeder', 'Sorun yok', 'return yasak', 'Ok fonksiyonu olmalı']), answer: 0,
    why: W('الصحيح: function total(price: number, qty: number). المعاملات لا يُستنتج نوعها تلقائيًا مثل المتغيرات.', 'Correct: function total(price: number, qty: number). Parameters are not inferred the way variables are.', 'Doğrusu: function total(price: number, qty: number). Parametrelerin tipi değişkenler gibi çıkarılmaz.') }),
  choice({ ...t, id: 't-j2-tuple', level: 'junior',
    prompt: W('ما نوع المصفوفة التي يجب أن تحوي اسمًا ثم عمرًا، بالترتيب؟', 'Which type is an array that must hold a name then an age, in that order?', 'Sırayla bir ad sonra bir yaş içermesi gereken dizinin tipi nedir?'),
    options: ['[string, number]', '(string | number)[]', 'Array<string, number>', '{ string, number }'], answer: 0,
    why: W('الـ tuple يحدد العدد والترتيب والنوع لكل موضع. أما (string | number)[] فتقبل أي ترتيب وأي طول.', 'A tuple fixes the length, order and type of each slot. (string | number)[] accepts any order and length.', 'Tuple her konumun sayısını, sırasını ve tipini sabitler. (string | number)[] her sırayı ve uzunluğu kabul eder.') }),
  choice({ ...t, id: 't-j2-optional-param', level: 'junior',
    prompt: W('كيف تجعل المعامل name اختياريًا؟', 'How do you make the name parameter optional?', 'name parametresini nasıl isteğe bağlı yaparsın?'),
    options: ['function greet(name?: string) {}', 'function greet(name: string?) {}', 'function greet(optional name: string) {}', 'function greet(name: string | void = ) {}'], answer: 0,
    why: W('داخل الدالة يكون نوعه string | undefined، فتحقق منه أو أعطه قيمة افتراضية: name = \'Guest\'.', 'Inside the function its type is string | undefined, so check it or give a default: name = \'Guest\'.', 'Fonksiyon içinde tipi string | undefined’dır; kontrol et ya da varsayılan ver: name = \'Guest\'.') }),
  choice({ ...t, id: 't-j2-strict-null', level: 'junior', prompt: WHICH_ERR,
    code: `let a: string = 'Ali'        // A
let b: string | null = null  // B
let c: string = null         // C
let d = null                 // D`,
    options: ['C', 'A', 'B', 'D'], answer: 0,
    why: W('مع strictNullChecks لا يقبل string القيمة null إلا إذا كتبت string | null صراحة. هذا يمنع أخطاء «Cannot read properties of null».', 'With strictNullChecks, string does not accept null unless you write string | null. That prevents "Cannot read properties of null" bugs.', 'strictNullChecks ile string, açıkça string | null yazmadıkça null kabul etmez. Bu "Cannot read properties of null" hatalarını önler.') }),
  choice({ ...t, id: 't-j2-type-alias', level: 'junior',
    prompt: W('ما الذي تستطيعه type ولا تستطيعه interface؟', 'What can type do that interface cannot?', 'type’ın yapıp interface’in yapamadığı nedir?'),
    options: {

      ar: ["type Status = 'on' | 'off'  (اتحاد قيم)|type Status = 'on' | 'off'  (a union)|type Status = 'on' | 'off'  (birleşim)", 'وصف شكل كائن', 'التوريث بـ extends', 'خصائص اختيارية'],

      en: ["type Status = 'on' | 'off'  (اتحاد قيم)|type Status = 'on' | 'off'  (a union)|type Status = 'on' | 'off'  (birleşim)", 'Describe an object’s shape', 'Inheritance with extends', 'Optional properties'],

      tr: ["type Status = 'on' | 'off'  (اتحاد قيم)|type Status = 'on' | 'off'  (a union)|type Status = 'on' | 'off'  (birleşim)", 'Bir nesnenin şeklini tanımlamak', 'extends ile kalıtım', 'İsteğe bağlı özellikler'],

    }, answer: 0,
    why: W('كلاهما يصف الكائنات. type تصف أيضًا الاتحادات والـ tuples والأنواع المركبة، وinterface يمكن دمجها وتمديدها لاحقًا.', 'Both describe objects. type also describes unions, tuples and computed types; an interface can be merged and extended later.', 'İkisi de nesneleri tanımlar. type ayrıca birleşimleri, tuple’ları ve türetilmiş tipleri tanımlar; interface sonradan birleştirilip genişletilebilir.') }),
  choice({ ...t, id: 't-j2-compile-output', level: 'junior',
    prompt: W('ماذا يبقى من الأنواع في ملف JavaScript الناتج؟', 'What is left of the types in the resulting JavaScript file?', 'Ortaya çıkan JavaScript dosyasında tiplerden ne kalır?'),
    code: `const price: number = 10
interface Item { name: string }`,
    options: L3(['لا شيء: const price = 10 فقط، والـ interface تختفي', 'تبقى كتعليقات', 'تتحول إلى فحوصات وقت التشغيل', 'يبقى كل شيء كما هو'],
      ['Nothing: just const price = 10, and the interface disappears', 'They stay as comments', 'They become runtime checks', 'Everything stays the same'],
      ['Hiçbir şey: sadece const price = 10; interface kaybolur', 'Yorum olarak kalır', 'Çalışma anı kontrollerine dönüşür', 'Her şey aynen kalır']), answer: 0,
    why: W('الأنواع للمطور والمحرر فقط. لذلك البيانات القادمة من الخارج تحتاج تحققًا فعليًا (مثل Zod).', 'Types exist only for the developer and the editor. That is why outside data needs real validation (like Zod).', 'Tipler yalnızca geliştirici ve editör içindir. Bu yüzden dışarıdan gelen veri gerçek doğrulama ister (Zod gibi).') }),
  choice({ ...t, id: 't-j2-void', level: 'junior',
    prompt: W('ماذا يعني النوع void هنا؟', 'What does void mean here?', 'Buradaki void ne demek?'),
    code: `function log(msg: string): void {
  console.log(msg)
}`,
    options: L3(['الدالة لا تُرجع قيمة مفيدة', 'الدالة لا تقبل معاملات', 'الدالة ترمي خطأ دائمًا', 'الدالة غير متزامنة'],
      ['The function returns no useful value', 'The function takes no parameters', 'The function always throws', 'The function is async'],
      ['Fonksiyon işe yarar bir değer döndürmez', 'Fonksiyon parametre almaz', 'Fonksiyon her zaman hata fırlatır', 'Fonksiyon asenkron']), answer: 0,
    why: W('ودالة لا تنتهي أبدًا (ترمي خطأ دائمًا أو حلقة لا نهائية) نوعها never.', 'A function that never finishes (always throws, or loops forever) has the type never.', 'Hiç bitmeyen bir fonksiyonun (hep hata fırlatan ya da sonsuz döngü) tipi never’dır.') }),
  choice({ ...t, id: 't-j2-missing-prop', level: 'junior', prompt: WHICH_ERR,
    code: `interface User { name: string; age: number }
const a: User = { name: 'Ali', age: 30 }   // A
const b: User = { name: 'Sara' }           // B
const c = { name: 'Omar' }                 // C
const d: Partial<User> = { name: 'Lina' }  // D`,
    options: ['B', 'A', 'C', 'D'], answer: 0,
    why: W('age مطلوبة في User. c بلا نوع فلا تُفحص، وPartial تجعل كل الخصائص اختيارية.', 'age is required in User. c has no type, so it is not checked, and Partial makes every property optional.', 'age, User’da zorunludur. c’nin tipi yok, kontrol edilmez; Partial tüm özellikleri isteğe bağlı yapar.') }),
  choice({ ...t, id: 't-j2-union-method', level: 'junior',
    prompt: W('لماذا يعطي هذا السطر خطأ؟', 'Why does this line give an error?', 'Bu satır neden hata veriyor?'),
    code: `function show(id: string | number) {
  return id.toUpperCase()
}`,
    options: L3(['toUpperCase موجودة في string فقط، وid قد يكون رقمًا؛ تحقق بـ typeof أولًا', 'string | number غير مسموح', 'يجب كتابة نوع الإرجاع', 'toUpperCase غير موجودة في JavaScript'],
      ['toUpperCase exists only on string, and id may be a number; check with typeof first', 'string | number is not allowed', 'The return type must be written', 'toUpperCase does not exist in JavaScript'],
      ['toUpperCase yalnızca string’de var ve id sayı olabilir; önce typeof ile kontrol et', 'string | number yasak', 'Dönüş tipi yazılmalı', 'JavaScript’te toUpperCase yok']), answer: 0,
    why: W('مع الاتحاد تُسمح فقط العمليات المشتركة بين كل الأنواع، حتى تضيّق النوع بشرط.', 'With a union only operations shared by every member are allowed, until you narrow it with a condition.', 'Birleşimde yalnızca tüm üyelerde ortak işlemlere izin verilir; bir koşulla daraltana kadar.') }),
  choice({ ...t, id: 't-j2-record', level: 'junior',
    prompt: W('ماذا يصف هذا النوع؟', 'What does this type describe?', 'Bu tip neyi tanımlar?'),
    code: `const stock: Record<string, number> = { apple: 3, pear: 0 }`,
    options: L3(['كائن مفاتيحه نصوص وقيمه أرقام', 'مصفوفة من أرقام', 'سجل في قاعدة البيانات', 'Map من JavaScript'],
      ['An object whose keys are strings and values are numbers', 'An array of numbers', 'A database record', 'A JavaScript Map'],
      ['Anahtarları metin, değerleri sayı olan bir nesne', 'Sayı dizisi', 'Bir veritabanı kaydı', 'Bir JavaScript Map’i']), answer: 0,
    why: W('ومع مفاتيح محددة يصبح أدق: Record<\'apple\' | \'pear\', number> يفرض وجود المفتاحين.', 'With specific keys it is stricter: Record<\'apple\' | \'pear\', number> requires both keys.', 'Belirli anahtarlarla daha katıdır: Record<\'apple\' | \'pear\', number> iki anahtarı da zorunlu kılar.') }),
  choice({ ...t, id: 't-j2-array-syntax', level: 'junior',
    prompt: W('ما الفرق بين string[] وArray<string>؟', 'What is the difference between string[] and Array<string>?', 'string[] ile Array<string> arasındaki fark nedir?'),
    options: L3(['لا فرق، صيغتان لنفس النوع', 'Array<string> أسرع', 'string[] للقراءة فقط', 'Array<string> يقبل أرقامًا أيضًا'],
      ['None, they are two spellings of the same type', 'Array<string> is faster', 'string[] is read-only', 'Array<string> also accepts numbers'],
      ['Fark yok, aynı tipin iki yazımı', 'Array<string> daha hızlı', 'string[] salt okunur', 'Array<string> sayı da kabul eder']), answer: 0,
    why: W('الصيغة القصيرة أشيع. وللقراءة فقط: readonly string[] أو ReadonlyArray<string>.', 'The short form is more common. For read-only: readonly string[] or ReadonlyArray<string>.', 'Kısa yazım daha yaygındır. Salt okunur için: readonly string[] ya da ReadonlyArray<string>.') }),
  choice({ ...t, id: 't-j2-function-type', level: 'junior',
    prompt: W('كيف تكتب نوع دالة تأخذ رقمًا وترجع نصًا؟', 'How do you write the type of a function that takes a number and returns a string?', 'Sayı alıp metin döndüren bir fonksiyonun tipi nasıl yazılır?'),
    options: ['type Format = (n: number) => string', 'type Format = function(number): string', 'type Format = number -> string', 'type Format = Function<number, string>'], answer: 0,
    why: W('أسماء المعاملات في نوع الدالة للتوثيق فقط، والمهم الأنواع والترتيب.', 'Parameter names in a function type are only documentation; the types and their order are what matter.', 'Fonksiyon tipindeki parametre adları yalnızca belgeleme içindir; önemli olan tipler ve sıralarıdır.') }),

  // ───────── Mid ─────────
  choice({ ...t, id: 't-m2-pick-omit', level: 'mid',
    prompt: W('تريد نوعًا للرد العام للمستخدم بدون password. ما الأنسب؟', 'You want a public user response type without password. What fits best?', 'password olmadan herkese açık kullanıcı yanıtı tipi istiyorsun. En uygunu?'),
    code: `interface User { id: number; name: string; email: string; password: string }`,
    options: ["type PublicUser = Omit<User, 'password'>", "type PublicUser = Partial<User>", "type PublicUser = User & { password?: never }", "type PublicUser = Required<User>"], answer: 0,
    why: W('Omit يحذف خصائص، وPick يختار خصائص. وأي حقل جديد في User يظهر في PublicUser تلقائيًا.', 'Omit removes properties and Pick selects them. Any new field added to User shows up in PublicUser automatically.', 'Omit özellik çıkarır, Pick özellik seçer. User’a eklenen her yeni alan PublicUser’da otomatik görünür.') }),
  choice({ ...t, id: 't-m2-constraint', level: 'mid',
    prompt: W('لماذا يعطي هذا الكود خطأ، وما الإصلاح؟', 'Why does this code error, and what is the fix?', 'Bu kod neden hata veriyor ve düzeltme nedir?'),
    code: `function byId<T>(list: T[], id: number) {
  return list.find(x => x.id === id)
}`,
    options: {

      ar: ['T قد لا يحوي id؛ اكتب <T extends { id: number }>', 'find غير موجودة', 'يجب استخدام any', 'id يجب أن يكون string'],

      en: ['T may have no id; write <T extends { id: number }>', 'find does not exist', 'Use any', 'id must be a string'],

      tr: ['T’de id olmayabilir; <T extends { id: number }> yaz', 'find yok', 'any kullan', 'id string olmalı'],

    }, answer: 0,
    why: W('القيد يقول «أي نوع بشرط أن يحوي id رقميًا»، فيبقى النوع الكامل لـ T في الناتج.', 'The constraint says "any type, as long as it has a numeric id", so the full T type is kept in the result.', 'Kısıt "sayısal id’si olduğu sürece herhangi bir tip" der; sonuçta T’nin tam tipi korunur.') }),
  choice({ ...t, id: 't-m2-type-guard', level: 'mid',
    prompt: W('ماذا يعني x is Admin في نوع الإرجاع؟', 'What does x is Admin mean in the return type?', 'Dönüş tipindeki x is Admin ne anlama gelir?'),
    code: `function isAdmin(x: User): x is Admin {
  return 'permissions' in x
}
if (isAdmin(u)) { u.permissions }`,
    options: L3(['دالة type guard: عندما ترجع true يعامل TypeScript المتغير كـ Admin داخل الشرط', 'تحويل الكائن إلى Admin', 'ترجع كائن Admin جديدًا', 'خطأ في الصيغة'],
      ['A type guard: when it returns true, TypeScript treats the variable as Admin inside the condition', 'It converts the object to Admin', 'It returns a new Admin object', 'A syntax error'],
      ['Bir tip koruyucu: true dönünce TypeScript değişkeni koşul içinde Admin olarak görür', 'Nesneyi Admin’e çevirir', 'Yeni bir Admin nesnesi döndürür', 'Söz dizimi hatası']), answer: 0,
    why: W('TypeScript يثق بك هنا: إن كان الفحص خاطئًا فالنوع سيكذب. اجعل الفحص دقيقًا.', 'TypeScript trusts you here: if the check is wrong, the type will lie. Keep the check accurate.', 'TypeScript burada sana güvenir: kontrol yanlışsa tip yalan söyler. Kontrolü doğru tut.') }),
  choice({ ...t, id: 't-m2-discriminated', level: 'mid',
    prompt: W('ما نوع res داخل if؟', 'What is the type of res inside the if?', 'if içinde res’in tipi nedir?'),
    code: `type Res =
  | { ok: true; data: string[] }
  | { ok: false; error: string }
function handle(res: Res) {
  if (!res.ok) {
    res // ?
  }
}`,
    options: ['{ ok: false; error: string }', 'Res', '{ ok: true; data: string[] }', 'never'], answer: 0,
    why: W('الحقل المشترك ok يميّز بين الحالات، فيضيّق TypeScript النوع تلقائيًا. لا يمكن الوصول لـ data هنا.', 'The shared ok field distinguishes the cases, so TypeScript narrows the type automatically. data is not reachable here.', 'Ortak ok alanı durumları ayırt eder, TypeScript tipi otomatik daraltır. Burada data’ya erişilemez.') }),
  choice({ ...t, id: 't-m2-non-null', level: 'mid',
    prompt: W('ما الخطر في علامة ! هنا؟', 'What is the risk of the ! here?', 'Buradaki ! işaretinin riski nedir?'),
    code: `const btn = document.querySelector('#save')!
btn.addEventListener('click', save)`,
    options: L3(['تُسكت TypeScript فقط؛ إن لم يوجد العنصر يحدث خطأ وقت التشغيل', 'لا خطر، تضمن وجود العنصر', 'تجعل الكود أبطأ', 'تحذف العنصر من DOM'],
      ['It only silences TypeScript; if the element is missing, it crashes at runtime', 'No risk, it guarantees the element exists', 'It slows the code', 'It removes the element from the DOM'],
      ['Yalnızca TypeScript’i susturur; öğe yoksa çalışma anında çöker', 'Risk yok, öğenin varlığını garanti eder', 'Kodu yavaşlatır', 'Öğeyi DOM’dan siler']), answer: 0,
    why: W('استخدمها فقط عندما تكون متأكدًا تمامًا. وإلا فافحص: if (!btn) return، أو استخدم ?.', 'Use it only when you are completely sure. Otherwise check: if (!btn) return, or use ?.', 'Yalnızca kesinlikle eminsen kullan. Aksi halde kontrol et: if (!btn) return, ya da ?. kullan.') }),
  choice({ ...t, id: 't-m2-unchecked-index', level: 'mid',
    prompt: W('مع "noUncheckedIndexedAccess": true، ما نوع first؟', 'With "noUncheckedIndexedAccess": true, what is the type of first?', '"noUncheckedIndexedAccess": true ile first’ün tipi nedir?'),
    code: `const names: string[] = []
const first = names[0]`,
    options: ['string | undefined', 'string', 'never', 'any'], answer: 0,
    why: W('بدون هذا الخيار يفترض TypeScript أن names[0] موجود دائمًا، رغم أن المصفوفة قد تكون فارغة.', 'Without this option TypeScript assumes names[0] always exists, even though the array may be empty.', 'Bu seçenek olmadan TypeScript, dizi boş olabilse de names[0]’ın her zaman var olduğunu varsayar.') }),
  choice({ ...t, id: 't-m2-return-type', level: 'mid',
    prompt: W('تريد نوع ما تُرجعه دالة createStore بدون كتابته يدويًا. كيف؟', 'You want the type of what createStore returns without writing it by hand. How?', 'createStore’un döndürdüğünün tipini elle yazmadan istiyorsun. Nasıl?'),
    options: ['type Store = ReturnType<typeof createStore>', 'type Store = typeof createStore()', 'type Store = createStore.return', 'type Store = Returns<createStore>'], answer: 0,
    why: W('typeof يأخذ نوع الدالة نفسها، وReturnType يستخرج نوع ما ترجعه. والنوع يتحدث تلقائيًا مع الكود.', 'typeof gets the function’s own type, and ReturnType extracts what it returns. The type stays in sync with the code.', 'typeof fonksiyonun kendi tipini alır, ReturnType döndürdüğünü çıkarır. Tip kodla senkron kalır.') }),
  choice({ ...t, id: 't-m2-as-runtime', level: 'mid',
    prompt: W('ماذا يُطبع عند التشغيل؟', 'What is logged at runtime?', 'Çalışma anında ne yazdırılır?'),
    code: `const input = '5' as unknown as number
console.log(input + 1)`,
    options: {

      ar: ['51', '6', 'NaN', 'خطأ في التشغيل'],

      en: ['51', '6', 'NaN', 'A runtime error'],

      tr: ['51', '6', 'NaN', 'Çalışma anı hatası'],

    }, answer: 0,
    why: W('as تغيّر ما يعتقده TypeScript فقط، ولا تحوّل القيمة. للتحويل الحقيقي استخدم Number(input).', 'as only changes what TypeScript believes; it does not convert the value. For a real conversion use Number(input).', 'as yalnızca TypeScript’in inandığını değiştirir, değeri çevirmez. Gerçek dönüşüm için Number(input) kullan.') }),
  choice({ ...t, id: 't-m2-optional-chain-type', level: 'mid',
    prompt: W('ما نوع city؟', 'What is the type of city?', 'city’nin tipi nedir?'),
    code: `interface User { address?: { city: string } }
declare const user: User
const city = user.address?.city ?? 'Unknown'`,
    options: ['string', 'string | undefined', 'string | null', 'unknown'], answer: 0,
    why: W('?. قد ترجع undefined، و?? تستبدلها بنص، فيبقى النوع النهائي string.', '?. may return undefined, and ?? replaces it with a string, so the final type is string.', '?. undefined döndürebilir, ?? onu bir metinle değiştirir; son tip string’dir.') }),
  choice({ ...t, id: 't-m2-strict', level: 'mid',
    prompt: W('ماذا يفعل "strict": true في tsconfig؟', 'What does "strict": true do in tsconfig?', 'tsconfig’deki "strict": true ne yapar?'),
    options: L3(['يفعّل مجموعة فحوصات منها strictNullChecks وnoImplicitAny', 'يمنع استخدام any نهائيًا', 'يجعل البناء أسرع', 'يحوّل الأخطاء إلى تحذيرات'],
      ['Turns on a group of checks, including strictNullChecks and noImplicitAny', 'Bans any completely', 'Makes builds faster', 'Turns errors into warnings'],
      ['strictNullChecks ve noImplicitAny dahil bir grup kontrolü açar', 'any’yi tamamen yasaklar', 'Derlemeyi hızlandırır', 'Hataları uyarıya çevirir']), answer: 0,
    why: W('ابدأ المشاريع الجديدة به دائمًا. نقل مشروع قديم إليه أصعب، فيمكن تفعيل الخيارات واحدًا واحدًا.', 'Always start new projects with it. Moving an old project is harder, so you can enable the options one by one.', 'Yeni projelere her zaman onunla başla. Eski projeyi taşımak zordur; seçenekleri tek tek açabilirsin.') }),
  choice({ ...t, id: 't-m2-zod-infer', level: 'mid',
    prompt: W('كيف تتجنب كتابة نوع User مرتين: مرة كـ interface ومرة كمخطط تحقق؟', 'How do you avoid writing User twice: once as an interface and once as a validation schema?', 'User’ı iki kez, bir interface ve bir doğrulama şeması olarak yazmaktan nasıl kaçınırsın?'),
    code: `const UserSchema = z.object({ name: z.string(), age: z.number() })`,
    options: ['type User = z.infer<typeof UserSchema>', 'interface User extends UserSchema {}', 'type User = UserSchema', 'type User = typeof UserSchema.shape'], answer: 0,
    why: W('المخطط مصدر واحد للحقيقة: يتحقق وقت التشغيل ويعطي النوع وقت الكتابة، فلا يختلفان أبدًا.', 'The schema is a single source of truth: it validates at runtime and gives the type at compile time, so they never drift.', 'Şema tek doğruluk kaynağıdır: çalışma anında doğrular, derleme anında tipi verir; asla ayrışmazlar.') }),
  choice({ ...t, id: 't-m2-enum-union', level: 'mid',
    prompt: W('لماذا يفضّل كثيرون اتحاد النصوص على enum؟', 'Why do many prefer a string union over an enum?', 'Neden birçokları enum yerine metin birleşimini tercih eder?'),
    code: `enum Role { Admin = 'admin', User = 'user' }
type Role2 = 'admin' | 'user'`,
    options: L3(['الاتحاد يختفي بعد الترجمة ويقبل النصوص مباشرة، أما enum فيولّد كود JavaScript وقت التشغيل', 'enum غير مدعوم', 'الاتحاد أسرع في التنفيذ بكثير', 'enum لا يقبل نصوصًا'],
      ['A union disappears after compiling and accepts plain strings; an enum generates runtime JavaScript', 'enum is not supported', 'A union runs much faster', 'enum cannot hold strings'],
      ['Birleşim derlemeden sonra kaybolur ve düz metin kabul eder; enum çalışma anında JavaScript kodu üretir', 'enum desteklenmiyor', 'Birleşim çok daha hızlı çalışır', 'enum metin tutamaz']), answer: 0,
    why: W('مع enum يجب كتابة Role.Admin بدل \'admin\'، وبعض الأدوات (مثل type stripping في Node) لا تدعمه.', 'With an enum you must write Role.Admin instead of \'admin\', and some tools (like type stripping in Node) do not support it.', 'enum ile \'admin\' yerine Role.Admin yazmak gerekir ve bazı araçlar (Node’daki type stripping gibi) onu desteklemez.') }),
  choice({ ...t, id: 't-m2-required', level: 'mid',
    prompt: W('ماذا يفعل Required<Options>؟', 'What does Required<Options> do?', 'Required<Options> ne yapar?'),
    code: `interface Options { timeout?: number; retries?: number }
const defaults: Required<Options> = { timeout: 5000, retries: 3 }`,
    options: L3(['يجعل كل الخصائص الاختيارية إلزامية', 'يجعل الكائن للقراءة فقط', 'يحذف الخصائص الاختيارية', 'يجعل القيم غير قابلة لأن تكون null'],
      ['Makes every optional property required', 'Makes the object read-only', 'Removes the optional properties', 'Makes values non-nullable'],
      ['Tüm isteğe bağlı özellikleri zorunlu yapar', 'Nesneyi salt okunur yapar', 'İsteğe bağlı özellikleri kaldırır', 'Değerleri null olamaz yapar']), answer: 0,
    why: W('مثالي للقيم الافتراضية: إن أُضيف خيار جديد ونُسيت قيمته الافتراضية، يظهر خطأ فورًا.', 'Ideal for defaults: if a new option is added and its default is forgotten, you get an error right away.', 'Varsayılanlar için ideal: yeni bir seçenek eklenip varsayılanı unutulursa hemen hata alırsın.') }),

  // ───────── Senior ─────────
  choice({ ...t, id: 't-s2-infer', level: 'senior',
    prompt: W('ما نوع A وB؟', 'What are the types A and B?', 'A ve B tipleri nedir?'),
    code: `type ElementOf<T> = T extends (infer U)[] ? U : T
type A = ElementOf<string[]>
type B = ElementOf<number>`,
    options: ['A = string, B = number', 'A = string[], B = number', 'A = string, B = never', 'A = unknown, B = number'], answer: 0,
    why: W('infer يلتقط جزءًا من النوع داخل الشرط. هكذا تُبنى أدوات مثل ReturnType وAwaited.', 'infer captures part of a type inside a condition. That is how utilities like ReturnType and Awaited are built.', 'infer bir koşul içinde tipin bir parçasını yakalar. ReturnType ve Awaited gibi araçlar böyle kurulur.') }),
  choice({ ...t, id: 't-s2-template-literal', level: 'senior',
    prompt: W('ما نوع Handlers؟', 'What is the type Handlers?', 'Handlers tipi nedir?'),
    code: `type Events = 'click' | 'focus'
type Handlers = \`on\${Capitalize<Events>}\``,
    options: {

      ar: ["'onClick' | 'onFocus'", "'onclick' | 'onfocus'", 'string', "'on' "],

      en: ["'onClick' | 'onFocus'", "'onclick' | 'onfocus'", 'string', " 'Click' "],

      tr: ["'onClick' | 'onFocus'", "'onclick' | 'onfocus'", 'string', " 'Focus'"],

    }, answer: 0,
    why: W('أنواع القوالب النصية تتوزع على الاتحاد، وتُستخدم لأسماء الأحداث ومسارات API وأسماء CSS.', 'Template literal types distribute over a union; they are used for event names, API paths and CSS names.', 'Şablon metin tipleri birleşime dağılır; olay adları, API yolları ve CSS adları için kullanılır.') }),
  choice({ ...t, id: 't-s2-key-remap', level: 'senior',
    prompt: W('ما نوع Getters؟', 'What is the type Getters?', 'Getters tipi nedir?'),
    code: `interface User { name: string; age: number }
type Getters = {
  [K in keyof User as \`get\${Capitalize<K>}\`]: () => User[K]
}`,
    options: ['{ getName: () => string; getAge: () => number }', '{ name: () => string; age: () => number }', '{ get: () => User }', '{ getName: string; getAge: number }'], answer: 0,
    why: W('as داخل الـ mapped type تعيد تسمية المفاتيح، ويمكنها أيضًا حذف مفاتيح بإرجاع never.', 'as inside a mapped type renames keys, and it can drop keys by mapping them to never.', 'Eşlenmiş tip içindeki as anahtarları yeniden adlandırır; never’a eşleyerek anahtarları da düşürebilir.') }),
  choice({ ...t, id: 't-s2-brand', level: 'senior',
    prompt: W('دالة تأخذ userId وorderId وكلاهما string، وتم تمريرهما بالعكس بالخطأ دون أي تحذير. ما الحل؟', 'A function takes userId and orderId, both strings, and they were passed swapped by mistake with no warning. The fix?', 'Bir fonksiyon ikisi de string olan userId ve orderId alıyor ve yanlışlıkla ters geçirildiler; uyarı yok. Çözüm?'),
    options: ["type UserId = string & { readonly __brand: 'UserId' }", 'type UserId = string', 'interface UserId extends String {}', 'type UserId = `${string}`'], answer: 0,
    why: W('TypeScript بنيوي: نوعان بنفس الشكل متطابقان. الـ brand يجعلهما مختلفين في الأنواع فقط، بلا كلفة وقت التشغيل.', 'TypeScript is structural: two types with the same shape are the same. A brand makes them distinct in types only, at no runtime cost.', 'TypeScript yapısaldır: aynı şekle sahip iki tip aynıdır. Brand onları yalnızca tiplerde ayırır, çalışma anı maliyeti yoktur.') }),
  choice({ ...t, id: 't-s2-overloads', level: 'senior',
    prompt: W('ما نوع a وb؟', 'What are the types of a and b?', 'a ve b’nin tipleri nedir?'),
    code: `function parse(v: string): number
function parse(v: number): string
function parse(v: string | number) {
  return typeof v === 'string' ? Number(v) : String(v)
}
const a = parse('5')
const b = parse(5)`,
    options: {

      ar: ['a: number, b: string', 'a: string ', 'a: string, b: number', 'a: any, b: any'],

      en: ['a: number, b: string', ' number, b: string ', 'a: string, b: number', 'a: any, b: any'],

      tr: ['a: number, b: string', ' number', 'a: string, b: number', 'a: any, b: any'],

    }, answer: 0,
    why: W('التوقيعات المتعددة (overloads) تربط كل نوع مدخل بنوع ناتج محدد. والتوقيع الأخير لا يُرى من الخارج.', 'Overloads tie each input type to a specific output type. The final implementation signature is not visible from outside.', 'Aşırı yüklemeler her girdi tipini belirli bir çıktı tipine bağlar. Son uygulama imzası dışarıdan görünmez.') }),
  choice({ ...t, id: 't-s2-catch-unknown', level: 'senior',
    prompt: W('في الوضع الصارم (TS 4.4+)، ما نوع e داخل catch، ولماذا يعطي e.message خطأ؟', 'In strict mode (TS 4.4+), what is e’s type in catch, and why does e.message error?', 'Katı modda (TS 4.4+) catch içinde e’nin tipi nedir ve e.message neden hata verir?'),
    code: `try { risky() } catch (e) {
  console.log(e.message)
}`,
    options: {

      ar: ['unknown؛ أي شيء يمكن رميه، فتحقق بـ e instanceof Error', 'Error دائمًا', 'any ولا خطأ', 'never'],

      en: ['unknown; anything can be thrown, so check with e instanceof Error', 'Always Error', 'any, with no error', 'never'],

      tr: ['unknown; her şey fırlatılabilir, e instanceof Error ile kontrol et', 'Her zaman Error', 'any, hata yok', 'never'],

    }, answer: 0,
    why: W('JavaScript يسمح برمي نص أو رقم أو أي شيء. useUnknownInCatchVariables يجبرك على الفحص قبل الاستخدام.', 'JavaScript lets you throw a string, a number, anything. useUnknownInCatchVariables forces you to check before use.', 'JavaScript metin, sayı, her şeyi fırlatmaya izin verir. useUnknownInCatchVariables kullanmadan önce kontrol etmeye zorlar.') }),
  choice({ ...t, id: 't-s2-noinfer', level: 'senior',
    prompt: W('ماذا يفعل NoInfer (TS 5.4) هنا؟', 'What does NoInfer (TS 5.4) do here?', 'NoInfer (TS 5.4) burada ne yapar?'),
    code: `function pick<T extends string>(options: T[], initial: NoInfer<T>) {}
pick(['sm', 'md'], 'lg')`,
    options: L3(['يمنع استنتاج T من initial، فيُستنتج من options فقط ويظهر خطأ لأن \'lg\' ليست منها', 'يمنع استخدام T', 'يجعل T من نوع any', 'لا يغيّر شيئًا'],
      ['It stops T being inferred from initial, so T comes from options only and \'lg\' is an error', 'It forbids using T', 'It makes T any', 'It changes nothing'],
      ['T’nin initial’dan çıkarılmasını engeller; T yalnızca options’tan gelir ve \'lg\' hata olur', 'T kullanımını yasaklar', 'T’yi any yapar', 'Hiçbir şey değiştirmez']), answer: 0,
    why: W('بدونه يضيف TypeScript \'lg\' إلى T فيصبح \'sm\' | \'md\' | \'lg\' ولا يظهر أي خطأ.', 'Without it TypeScript adds \'lg\' to T, making it \'sm\' | \'md\' | \'lg\', and no error appears.', 'Olmadan TypeScript \'lg\'’yi T’ye ekler, \'sm\' | \'md\' | \'lg\' olur ve hata çıkmaz.') }),
  choice({ ...t, id: 't-s2-const-generic', level: 'senior',
    prompt: W('ما نوع r مع const في معامل النوع (TS 5.0)؟', 'What is the type of r with const on the type parameter (TS 5.0)?', 'Tip parametresinde const ile (TS 5.0) r’nin tipi nedir?'),
    code: `function routes<const T extends readonly string[]>(paths: T) { return paths }
const r = routes(['/', '/about'])`,
    options: ["readonly ['/', '/about']", 'string[]', "('/' | '/about')[]", 'readonly string[]'], answer: 0,
    why: W('const يجعل الاستنتاج حرفيًا كما لو كتب المستدعي as const، دون أن يطلب ذلك منه.', 'const makes inference literal, as if the caller had written as const, without asking them to.', 'const çıkarımı, çağıran as const yazmış gibi birebir yapar; ondan bunu istemeden.') }),
  choice({ ...t, id: 't-s2-augment-window', level: 'senior',
    prompt: W('سكربت خارجي يضيف window.analytics، وTypeScript لا يعرفه. ما الطريقة الصحيحة؟', 'An outside script adds window.analytics, and TypeScript does not know about it. The right way?', 'Dış bir script window.analytics ekliyor ve TypeScript bunu bilmiyor. Doğru yol?'),
    code: `// types/global.d.ts
declare global {
  interface Window { ??? }
}
export {}`,
    options: {

      ar: ['analytics?: { track(event: string): void }', '(window as any).analytics في كل مكان', '// @ts-ignore فوق كل استخدام', 'class Window { analytics }'],

      en: ['analytics?: { track(event: string): void }', '(window as any).analytics everywhere', '// @ts-ignore above every use', 'class Window { analytics }'],

      tr: ['analytics?: { track(event: string): void }', 'Her yerde (window as any).analytics', 'Her kullanımın üstüne // @ts-ignore', 'class Window { analytics }'],

    }, answer: 0,
    why: W('دمج الـ interfaces يضيف الخاصية لـ Window في كل المشروع مرة واحدة، مع نوع دقيق بدل any.', 'Interface merging adds the property to Window across the whole project once, with a precise type instead of any.', 'Interface birleştirme özelliği tüm projede Window’a bir kez, any yerine kesin bir tiple ekler.') }),
  choice({ ...t, id: 't-s2-asserts', level: 'senior',
    prompt: W('ما فائدة asserts هنا؟', 'What does asserts do here?', 'Buradaki asserts ne işe yarar?'),
    code: `function assertDefined<T>(v: T): asserts v is NonNullable<T> {
  if (v == null) throw new Error('Missing value')
}
const el = document.getElementById('app')
assertDefined(el)
el.innerHTML = ''`,
    options: L3(['بعد الاستدعاء يعرف TypeScript أن el ليس null في بقية الكود، لأن الدالة ترمي خطأ غير ذلك', 'تحذف null من القيمة وقت التشغيل', 'تجعل el من نوع any', 'لا تأثير لها على الأنواع'],
      ['After the call TypeScript knows el is not null for the rest of the code, because the function throws otherwise', 'It strips null from the value at runtime', 'It makes el any', 'It has no effect on types'],
      ['Çağrıdan sonra TypeScript kodun geri kalanında el’in null olmadığını bilir; aksi halde fonksiyon hata fırlatır', 'Çalışma anında değerden null’ı siler', 'el’i any yapar', 'Tiplere etkisi yok']), answer: 0,
    why: W('أفضل من ! لأن الفحص يحدث فعلًا وقت التشغيل مع رسالة خطأ واضحة.', 'Better than ! because the check really happens at runtime, with a clear error message.', '! işaretinden iyidir; kontrol gerçekten çalışma anında, net bir hata mesajıyla yapılır.') }),
  choice({ ...t, id: 't-s2-exclude-extract', level: 'senior',
    prompt: W('ما نوع A وB؟', 'What are the types A and B?', 'A ve B tipleri nedir?'),
    code: `type Status = 'draft' | 'published' | 'archived'
type A = Exclude<Status, 'archived'>
type B = Extract<Status, 'draft' | 'deleted'>`,
    options: {

      ar: ["A = 'draft' | 'published', B = 'draft'", "A = 'archived', B = 'draft' | 'deleted'", "A = 'draft' ", "A = Status, B = never"],

      en: ["A = 'draft' | 'published', B = 'draft'", "A = 'archived', B = 'draft' | 'deleted'", " 'published', B = 'draft' ", "A = Status, B = never"],

      tr: ["A = 'draft' | 'published', B = 'draft'", "A = 'archived', B = 'draft' | 'deleted'", " 'deleted'", "A = Status, B = never"],

    }, answer: 0,
    why: W('Exclude يحذف من الاتحاد، وExtract يُبقي فقط المشترك. \'deleted\' ليست في Status فلا تظهر.', 'Exclude removes from a union; Extract keeps only what overlaps. \'deleted\' is not in Status, so it does not appear.', 'Exclude birleşimden çıkarır, Extract yalnızca örtüşeni tutar. \'deleted\' Status’ta olmadığı için görünmez.') }),
  choice({ ...t, id: 't-s2-import-type', level: 'senior',
    prompt: W('مع "verbatimModuleSyntax": true، لماذا يجب كتابة import type هنا؟', 'With "verbatimModuleSyntax": true, why must you write import type here?', '"verbatimModuleSyntax": true ile burada neden import type yazmak gerekir?'),
    code: `import type { User } from './types'`,
    options: L3(['حتى يُحذف الاستيراد كاملًا من JavaScript الناتج؛ وإلا قد يبقى استيراد لملف لا يصدّر قيمة وقت التشغيل', 'لأنه أسرع في المحرر', 'لا فرق', 'لأن types مجلد محجوز'],
      ['So the import is erased completely from the output JavaScript; otherwise an import of a file with no runtime export could remain', 'It is faster in the editor', 'No difference', 'types is a reserved folder'],
      ['Import çıktı JavaScript’ten tamamen silinsin diye; yoksa çalışma anında değer dışa aktarmayan bir dosyanın import’u kalabilir', 'Editörde daha hızlı', 'Fark yok', 'types ayrılmış bir klasör']), answer: 0,
    why: W('الأدوات التي تعالج كل ملف وحده (esbuild وSWC وNode) لا تعرف إن كان المستورد نوعًا، فهذا يجعل الكود واضحًا لها.', 'Tools that handle one file at a time (esbuild, SWC, Node) cannot tell whether an import is a type, so this makes it explicit for them.', 'Dosyaları tek tek işleyen araçlar (esbuild, SWC, Node) bir import’un tip olup olmadığını bilemez; bu onlar için açık hale getirir.') }),
  choice({ ...t, id: 't-s2-structural', level: 'senior',
    prompt: W('هل يقبل TypeScript هذا الكود؟', 'Does TypeScript accept this code?', 'TypeScript bu kodu kabul eder mi?'),
    code: `class Cat { name = '' }
class Dog { name = '' }
const pet: Cat = new Dog()`,
    options: L3(['نعم، لأن النظام بنيوي: Dog له نفس شكل Cat', 'لا، الأصناف مختلفة', 'فقط مع as', 'فقط إذا ورث Dog من Cat'],
      ['Yes, the type system is structural: Dog has the same shape as Cat', 'No, the classes differ', 'Only with as', 'Only if Dog extends Cat'],
      ['Evet, tip sistemi yapısaldır: Dog, Cat ile aynı şekle sahip', 'Hayır, sınıflar farklı', 'Sadece as ile', 'Sadece Dog, Cat’ten türerse']), answer: 0,
    why: W('على عكس Java وC#، الأسماء لا تهم بل الشكل. الخصائص private تكسر هذا التطابق، وهي حيلة أخرى للتمييز.', 'Unlike Java and C#, names do not matter, only shape. private members break the match, which is another way to tell types apart.', 'Java ve C#’ın aksine adlar değil şekil önemlidir. private üyeler eşleşmeyi bozar; tipleri ayırmanın başka bir yolu.') }),
  choice({ ...t, id: 't-s2-readonly-array', level: 'senior', prompt: WHICH_ERR,
    code: `function sum(nums: readonly number[]) {
  const copy = [...nums]       // A
  copy.push(1)                 // B
  nums.push(1)                 // C
  return nums.reduce((a, b) => a + b, 0)  // D
}`,
    options: ['C', 'A', 'B', 'D'], answer: 0,
    why: W('readonly تمنع تعديل المصفوفة المستلمة، فيعرف المستدعي أن الدالة لن تغيّر بياناته. والنسخة تبقى قابلة للتعديل.', 'readonly forbids changing the received array, so callers know the function will not touch their data. A copy is still mutable.', 'readonly alınan diziyi değiştirmeyi yasaklar; çağıranlar fonksiyonun verilerine dokunmayacağını bilir. Kopya yine değiştirilebilir.') }),
]
