import type { Question } from '#shared/types/quiz'
import { choice } from '../helpers'

const WHICH_ERRORS = {
  ar: 'أي سطر يعطي خطأ من TypeScript؟',
  en: 'Which line gives a TypeScript error?',
  tr: 'Hangi satır TypeScript hatası verir?',
}
const WHAT_TYPE = {
  ar: 'ما النوع (type) الذي يستنتجه TypeScript؟',
  en: 'What type does TypeScript infer?',
  tr: 'TypeScript hangi tipi çıkarır?',
}

export const TS_HTML_CSS: Question[] = [
  // ───────── TypeScript · Junior ─────────
  choice({
    id: 't-j-annotation', level: 'junior', topic: 'typescript',
    prompt: {
      ar: 'ماذا يقول TypeScript عن هذا السطر؟',
      en: 'What does TypeScript say about this line?',
      tr: 'TypeScript bu satır hakkında ne der?',
    },
    code: `let age: number = '30';`,
    codeLang: 'ts',
    options: {
      ar: ['خطأ: النوع string لا يُسند إلى number', 'يحوّل \'30\' إلى 30 تلقائيًا', 'لا شيء، الكود صحيح', 'خطأ فقط عند التشغيل في المتصفح'],
      en: ['Error: type string is not assignable to type number', 'It turns \'30\' into 30 for you', 'Nothing, the code is fine', 'An error only when it runs in the browser'],
      tr: ['Hata: string tipi number tipine atanamaz', '\'30\'u otomatik olarak 30’a çevirir', 'Hiçbir şey, kod doğru', 'Sadece tarayıcıda çalışınca hata'],
    },
    answer: 0,
    why: {
      ar: 'TypeScript يفحص الأنواع أثناء الكتابة والبناء، ولا يحوّل القيم. \'30\' نص، والمتغير معرَّف كرقم، فيظهر الخطأ قبل التشغيل.',
      en: 'TypeScript checks types while you write and build; it never converts values. \'30\' is a string and the variable is declared as a number, so you get an error before anything runs.',
      tr: 'TypeScript tipleri yazarken ve derlerken kontrol eder, değerleri dönüştürmez. \'30\' bir metin, değişken number olarak tanımlı; hata çalışmadan önce görünür.',
    },
  }),
  choice({
    id: 't-j-optional-prop', level: 'junior', topic: 'typescript',
    prompt: {
      ar: 'ماذا تعني علامة ? بعد age؟',
      en: 'What does the ? after age mean?',
      tr: 'age’den sonraki ? ne anlama gelir?',
    },
    code: `interface User {
  name: string;
  age?: number;
}`,
    codeLang: 'ts',
    options: {
      ar: ['الخاصية اختيارية: قد تكون غير موجودة (undefined)', 'age قد يكون رقمًا أو نصًا', 'age يجب أن يكون أكبر من 0', 'age للقراءة فقط'],
      en: ['The property is optional: it may be missing (undefined)', 'age may be a number or a string', 'age must be greater than 0', 'age is read-only'],
      tr: ['Özellik isteğe bağlıdır: olmayabilir (undefined)', 'age sayı veya metin olabilir', 'age 0’dan büyük olmalı', 'age salt okunurdur'],
    },
    answer: 0,
    why: {
      ar: 'age? يعني أن { name: \'Sara\' } كائن User صحيح. ونوع user.age يصبح number | undefined، فيجب التحقق منه قبل استخدامه في عملية حسابية.',
      en: 'age? means { name: \'Sara\' } is a valid User. The type of user.age becomes number | undefined, so check it before doing math with it.',
      tr: 'age?, { name: \'Sara\' } nesnesinin geçerli bir User olduğu anlamına gelir. user.age’in tipi number | undefined olur; hesaplamada kullanmadan önce kontrol et.',
    },
  }),
  choice({
    id: 't-j-union', level: 'junior', topic: 'typescript',
    prompt: WHICH_ERRORS,
    code: `let id: string | number;

id = 42;        // A
id = 'u-42';    // B
id = true;      // C
id = 7 + 1;     // D`,
    codeLang: 'ts',
    options: ['C', 'A', 'B', 'D'],
    answer: 0,
    why: {
      ar: 'string | number (union) يقبل أي قيمة من النوعين فقط. true من نوع boolean، فالسطر C هو الخاطئ.',
      en: 'string | number (a union) accepts a value of either type only. true is a boolean, so line C is the error.',
      tr: 'string | number (union) sadece bu iki tipten birini kabul eder. true bir boolean’dır; hatalı satır C’dir.',
    },
  }),
  choice({
    id: 't-j-array-push', level: 'junior', topic: 'typescript',
    prompt: WHICH_ERRORS,
    code: `const tags: string[] = [];

tags.push('vue');      // A
tags.push("ts");       // B
tags.push(10);         // C
tags.length = 0;       // D`,
    codeLang: 'ts',
    options: ['C', 'A', 'B', 'D'],
    answer: 0,
    why: {
      ar: 'string[] مصفوفة نصوص فقط، فإضافة الرقم 10 خطأ. أما const فيمنع إعادة تعيين المتغير، لا تعديل محتوى المصفوفة، لذلك push وlength = 0 مسموحان.',
      en: 'string[] holds strings only, so pushing 10 is an error. const stops you from reassigning the variable, not from changing the array, so push and length = 0 are allowed.',
      tr: 'string[] sadece metin tutar; 10 eklemek hatadır. const değişkeni yeniden atamayı engeller, dizinin içeriğini değiştirmeyi değil; push ve length = 0 serbesttir.',
    },
  }),
  choice({
    id: 't-j-return-type', level: 'junior', topic: 'typescript',
    prompt: {
      ar: 'ماذا يعني : number الأخير في تعريف الدالة؟',
      en: 'What does the last : number mean in this function?',
      tr: 'Bu fonksiyondaki son : number ne anlama gelir?',
    },
    code: `function add(a: number, b: number): number {
  return a + b;
}`,
    codeLang: 'ts',
    options: {
      ar: ['نوع القيمة التي ترجعها الدالة', 'عدد المعاملات', 'نوع المعامل الأول', 'أن الدالة غير متزامنة'],
      en: ['The type of the value the function returns', 'The number of parameters', 'The type of the first parameter', 'That the function is async'],
      tr: ['Fonksiyonun döndürdüğü değerin tipi', 'Parametre sayısı', 'İlk parametrenin tipi', 'Fonksiyonun asenkron olduğu'],
    },
    answer: 0,
    why: {
      ar: 'ما بعد الأقواس هو نوع القيمة المرجعة. إذا أرجعت الدالة نصًا بالخطأ سيعترض TypeScript. ويمكن غالبًا تركه ليستنتجه TypeScript وحده.',
      en: 'What comes after the parentheses is the return type. If the function returned a string by mistake, TypeScript would complain. You can often leave it out and let TypeScript infer it.',
      tr: 'Parantezden sonra gelen, dönüş tipidir. Fonksiyon yanlışlıkla metin döndürürse TypeScript itiraz eder. Çoğu zaman yazmayıp TypeScript’in çıkarmasına bırakabilirsin.',
    },
  }),
  choice({
    id: 't-j-readonly', level: 'junior', topic: 'typescript',
    prompt: WHICH_ERRORS,
    code: `interface Product {
  readonly id: number;
  name: string;
}

const p: Product = { id: 1, name: 'Pen' };
p.name = 'Pencil';  // A
p.id = 2;           // B
console.log(p.id);  // C
const copy = { ...p, id: 3 }; // D`,
    codeLang: 'ts',
    options: ['B', 'A', 'C', 'D'],
    answer: 0,
    why: {
      ar: 'readonly يمنع تعديل الخاصية بعد الإنشاء، فالسطر B خطأ. القراءة مسموحة، وإنشاء نسخة جديدة بقيمة id مختلفة مسموح أيضًا.',
      en: 'readonly stops the property from being changed after creation, so line B is the error. Reading is fine, and so is making a new copy with a different id.',
      tr: 'readonly, oluşturulduktan sonra özelliğin değiştirilmesini engeller; hata B satırıdır. Okumak serbesttir, farklı id ile yeni bir kopya oluşturmak da öyle.',
    },
  }),
  choice({
    id: 't-j-literal-type', level: 'junior', topic: 'typescript',
    prompt: WHICH_ERRORS,
    code: `type Size = 'sm' | 'md' | 'lg';

let a: Size = 'sm';  // A
let b: Size = 'md';  // B
let c: Size = 'xl';  // C
let d: Size = 'lg';  // D`,
    codeLang: 'ts',
    options: ['C', 'A', 'B', 'D'],
    answer: 0,
    why: {
      ar: 'النوع Size يقبل هذه النصوص الثلاثة فقط. \'xl\' ليس منها، فيظهر الخطأ أثناء الكتابة، وهذا يمنع الأخطاء الإملائية في القيم.',
      en: 'Size accepts only these three strings. \'xl\' is not one of them, so you get an error while typing, which catches typos in values.',
      tr: 'Size sadece bu üç metni kabul eder. \'xl\' bunlardan biri değil; yazarken hata alırsın, bu da değerlerdeki yazım hatalarını yakalar.',
    },
  }),

  // ───────── TypeScript · Mid ─────────
  choice({
    id: 't-m-generic-first', level: 'mid', topic: 'typescript',
    prompt: WHAT_TYPE,
    code: `function first<T>(list: T[]): T | undefined {
  return list[0];
}

const x = first(['a', 'b']);`,
    codeLang: 'ts',
    options: ['string | undefined', 'string', 'any', 'T'],
    answer: 0,
    why: {
      ar: 'T يُستنتج من المعامل: المصفوفة string[] فيصبح T هو string. والدالة ترجع T | undefined لأن المصفوفة قد تكون فارغة.',
      en: 'T is inferred from the argument: the array is string[], so T is string. The function returns T | undefined because the array may be empty.',
      tr: 'T argümandan çıkarılır: dizi string[], yani T string olur. Dizi boş olabileceği için fonksiyon T | undefined döndürür.',
    },
  }),
  choice({
    id: 't-m-partial', level: 'mid', topic: 'typescript',
    prompt: {
      ar: 'ماذا يفعل Partial<User> هنا؟',
      en: 'What does Partial<User> do here?',
      tr: 'Burada Partial<User> ne yapar?',
    },
    code: `interface User { name: string; email: string; age: number }

function updateUser(id: string, changes: Partial<User>) { /* … */ }

updateUser('1', { email: 'new@mail.com' });`,
    codeLang: 'ts',
    options: {
      ar: ['يجعل كل خصائص User اختيارية، فيمكن إرسال جزء منها', 'يحذف خاصية واحدة من User', 'يجعل كل الخصائص للقراءة فقط', 'يتحقق من البريد أثناء التشغيل'],
      en: ['Makes every User property optional, so you can send just some of them', 'Removes one property from User', 'Makes every property read-only', 'Validates the email at runtime'],
      tr: ['User’ın tüm özelliklerini isteğe bağlı yapar; sadece bir kısmını gönderebilirsin', 'User’dan bir özelliği siler', 'Tüm özellikleri salt okunur yapar', 'E-postayı çalışma anında doğrular'],
    },
    answer: 0,
    why: {
      ar: 'Partial<T> أداة جاهزة تضيف ? لكل خاصية. مناسبة لعمليات التحديث الجزئي (PATCH). وأخواتها: Required وReadonly وPick وOmit.',
      en: 'Partial<T> is a built-in utility that adds ? to every property. Handy for partial updates (PATCH). Its siblings: Required, Readonly, Pick and Omit.',
      tr: 'Partial<T>, her özelliğe ? ekleyen yerleşik bir yardımcıdır. Kısmi güncellemeler (PATCH) için uygundur. Benzerleri: Required, Readonly, Pick ve Omit.',
    },
  }),
  choice({
    id: 't-m-narrowing', level: 'mid', topic: 'typescript',
    prompt: {
      ar: 'ما نوع value داخل فرع else؟',
      en: 'What is the type of value inside the else branch?',
      tr: 'else dalında value’nun tipi nedir?',
    },
    code: `function format(value: string | number) {
  if (typeof value === 'string') {
    return value.trim();
  } else {
    return value.toFixed(2);
  }
}`,
    codeLang: 'ts',
    options: ['number', 'string | number', 'string', 'unknown'],
    answer: 0,
    why: {
      ar: 'هذا يُسمّى narrowing: بعد typeof value === \'string\' يعرف TypeScript أن value نص في الفرع الأول، فلا يبقى في else إلا number، لذلك toFixed مسموح.',
      en: 'This is narrowing: after typeof value === \'string\', TypeScript knows value is a string in the first branch, so only number is left in else, and toFixed is allowed.',
      tr: 'Buna narrowing denir: typeof value === \'string\' kontrolünden sonra TypeScript ilk dalda value’nun metin olduğunu bilir; else’de sadece number kalır, toFixed kullanılabilir.',
    },
  }),
  choice({
    id: 't-m-interface-merge', level: 'mid', topic: 'typescript',
    prompt: {
      ar: 'ما نتيجة تعريف interface بنفس الاسم مرتين؟',
      en: 'What happens when the same interface name is declared twice?',
      tr: 'Aynı interface adı iki kez tanımlanınca ne olur?',
    },
    code: `interface Settings { theme: string }
interface Settings { lang: string }

const s: Settings = { theme: 'dark', lang: 'ar' };`,
    codeLang: 'ts',
    options: {
      ar: ['يندمج التعريفان، فيحتاج Settings إلى theme وlang معًا', 'خطأ: الاسم مكرر', 'التعريف الثاني يلغي الأول', 'يكفي theme أو lang'],
      en: ['The two declarations merge, so Settings needs both theme and lang', 'Error: duplicate name', 'The second one replaces the first', 'Either theme or lang is enough'],
      tr: ['İki tanım birleşir; Settings hem theme hem lang ister', 'Hata: isim tekrarı', 'İkincisi ilkinin yerine geçer', 'theme veya lang’den biri yeterli'],
    },
    answer: 0,
    why: {
      ar: 'الـ interface يدعم declaration merging، وتستخدمه المكتبات لإضافة خصائص لأنواع موجودة. أما type بنفس الاسم مرتين فيعطي خطأ.',
      en: 'Interfaces support declaration merging, which libraries use to add fields to existing types. Declaring a type alias twice with the same name is an error.',
      tr: 'Interface’ler declaration merging’i destekler; kütüphaneler mevcut tiplere alan eklemek için bunu kullanır. Aynı adla iki kez type tanımlamak ise hatadır.',
    },
  }),

  // ───────── TypeScript · Senior ─────────
  choice({
    id: 't-s-awaited-return', level: 'senior', topic: 'typescript',
    prompt: {
      ar: 'ما النوع Users؟',
      en: 'What is the type Users?',
      tr: 'Users tipi nedir?',
    },
    code: `async function loadUsers() {
  const res = await fetch('/api/users');
  return (await res.json()) as { id: number }[];
}

type Users = Awaited<ReturnType<typeof loadUsers>>;`,
    codeLang: 'ts',
    options: ['{ id: number }[]', 'Promise<{ id: number }[]>', 'Response', 'any'],
    answer: 0,
    why: {
      ar: 'ReturnType يعطي ما ترجعه الدالة، وهو Promise<{ id: number }[]> لأنها async. ثم Awaited يفكّ الـ Promise فيبقى { id: number }[]. مفيد لاستخراج الأنواع من دوال موجودة بدل تكرارها.',
      en: 'ReturnType gives what the function returns: Promise<{ id: number }[]>, because it is async. Awaited then unwraps the Promise, leaving { id: number }[]. Useful for taking types from existing functions instead of repeating them.',
      tr: 'ReturnType fonksiyonun döndürdüğünü verir: async olduğu için Promise<{ id: number }[]>. Awaited ise Promise’i açar ve { id: number }[] kalır. Tipleri tekrar yazmak yerine mevcut fonksiyonlardan almak için kullanışlıdır.',
    },
  }),
  choice({
    id: 't-s-distributive', level: 'senior', topic: 'typescript',
    prompt: {
      ar: 'ما النوع X؟',
      en: 'What is the type X?',
      tr: 'X tipi nedir?',
    },
    code: `type ToArray<T> = T extends unknown ? T[] : never;

type X = ToArray<string | number>;`,
    codeLang: 'ts',
    options: ['string[] | number[]', '(string | number)[]', 'never', 'unknown[]'],
    answer: 0,
    why: {
      ar: 'الـ conditional type على معامل عام (T) «يتوزّع» على كل عضو في الـ union، فيُطبَّق على string ثم number. لمنع التوزيع اكتب [T] extends [unknown].',
      en: 'A conditional type on a bare type parameter distributes over each member of a union, so it runs for string and then for number. To stop that, write [T] extends [unknown].',
      tr: 'Çıplak bir tip parametresi üzerindeki koşullu tip, union’ın her üyesine dağılır; önce string, sonra number için çalışır. Bunu engellemek için [T] extends [unknown] yaz.',
    },
  }),

  // ───────── HTML · Junior ─────────
  choice({
    id: 'h-j-new-tab', level: 'junior', topic: 'html',
    prompt: {
      ar: 'أي خاصية تجعل الرابط يُفتح في تبويب جديد؟',
      en: 'Which attribute opens a link in a new tab?',
      tr: 'Bir bağlantıyı yeni sekmede açan öznitelik hangisi?',
    },
    options: ['target="_blank"', 'rel="new"', 'href="_new"', 'open="tab"'],
    answer: 0,
    codeLang: 'html',
    why: {
      ar: 'target="_blank" يفتح الرابط في تبويب جديد. والمتصفحات الحديثة تضيف rel="noopener" تلقائيًا، لكن كتابته صراحة عادة جيدة للمواقع الخارجية.',
      en: 'target="_blank" opens the link in a new tab. Modern browsers add rel="noopener" for you, but writing it out is a good habit for external sites.',
      tr: 'target="_blank" bağlantıyı yeni sekmede açar. Modern tarayıcılar rel="noopener"ı kendisi ekler ama dış siteler için açıkça yazmak iyi bir alışkanlıktır.',
    },
  }),
  choice({
    id: 'h-j-headings', level: 'junior', topic: 'html',
    prompt: {
      ar: 'ما الاستخدام الصحيح لعناوين h1 إلى h6؟',
      en: 'What is the right way to use the h1 to h6 headings?',
      tr: 'h1–h6 başlıklarının doğru kullanımı hangisi?',
    },
    options: {
      ar: ['حسب بنية المحتوى: عنوان رئيسي h1 ثم أقسام h2 وتحتها h3', 'حسب حجم الخط الذي أريده', 'h1 لكل فقرة مهمة', 'لا فرق بينها وبين p'],
      en: ['By the structure of the content: one main h1, sections in h2, sub-sections in h3', 'By the font size I want', 'An h1 for every important paragraph', 'They are no different from p'],
      tr: ['İçeriğin yapısına göre: bir ana h1, bölümler h2, alt bölümler h3', 'İstediğim yazı boyutuna göre', 'Her önemli paragraf için h1', 'p’den hiçbir farkları yok'],
    },
    answer: 0,
    why: {
      ar: 'العناوين تصف بنية الصفحة لقارئات الشاشة ومحركات البحث، ويتنقّل بها مستخدمو قارئات الشاشة. حجم الخط يُضبط بـ CSS، لا باختيار رقم العنوان.',
      en: 'Headings describe the page structure for screen readers and search engines, and screen reader users jump between them. Set the font size with CSS, not by picking a heading number.',
      tr: 'Başlıklar sayfa yapısını ekran okuyuculara ve arama motorlarına anlatır; ekran okuyucu kullananlar başlıklar arasında gezinir. Yazı boyutunu başlık numarasıyla değil, CSS ile ayarla.',
    },
  }),
  choice({
    id: 'h-j-input-email', level: 'junior', topic: 'html',
    prompt: {
      ar: 'ما فائدة type="email" بدل type="text" في حقل البريد؟',
      en: 'What do you gain from type="email" instead of type="text" for an email field?',
      tr: 'E-posta alanında type="text" yerine type="email" kullanmanın faydası nedir?',
    },
    options: {
      ar: ['تحقق مدمج من الصيغة، ولوحة مفاتيح فيها @ على الجوال', 'يرسل بريدًا للتأكيد', 'يمنع البريد الوهمي تمامًا', 'لا فرق'],
      en: ['Built-in format checks, and a keyboard with @ on phones', 'It sends a confirmation email', 'It fully blocks fake emails', 'No difference'],
      tr: ['Yerleşik biçim kontrolü ve telefonda @ içeren klavye', 'Onay e-postası gönderir', 'Sahte e-postaları tamamen engeller', 'Fark yok'],
    },
    answer: 0,
    why: {
      ar: 'المتصفح يتحقق أن القيمة تشبه بريدًا قبل إرسال النموذج، ويعرض لوحة مفاتيح مناسبة على الجوال. لكنه لا يتأكد أن البريد موجود فعلًا، ويجب التحقق على الخادم أيضًا.',
      en: 'The browser checks the value looks like an email before submitting and shows a fitting keyboard on phones. It does not check the address really exists, and the server must validate too.',
      tr: 'Tarayıcı form gönderilmeden önce değerin e-postaya benzediğini kontrol eder ve telefonda uygun klavyeyi açar. Adresin gerçekten var olduğunu kontrol etmez; sunucu da doğrulamalıdır.',
    },
  }),

  // ───────── HTML · Mid ─────────
  choice({
    id: 'h-m-nav', level: 'mid', topic: 'html',
    prompt: {
      ar: 'ما العنصر المناسب لقائمة الروابط الرئيسية في الموقع؟',
      en: 'Which element fits the site’s main menu of links?',
      tr: 'Sitenin ana bağlantı menüsü için hangi eleman uygundur?',
    },
    options: ['<nav>', '<menuitem>', '<section>', '<div class="nav">'],
    answer: 0,
    codeLang: 'html',
    why: {
      ar: '<nav> يعلن أن هذه منطقة تنقّل، فتعرضها قارئات الشاشة كـ landmark يمكن القفز إليه. <div> لا يحمل أي معنى، و<menuitem> عنصر قديم أُزيل.',
      en: '<nav> marks a navigation area, so screen readers list it as a landmark you can jump to. <div> carries no meaning, and <menuitem> is an old element that was removed.',
      tr: '<nav> bir gezinme alanını belirtir; ekran okuyucular onu atlanabilir bir landmark olarak sunar. <div> anlam taşımaz, <menuitem> ise kaldırılmış eski bir elemandır.',
    },
  }),
  choice({
    id: 'h-m-novalidate', level: 'mid', topic: 'html',
    prompt: {
      ar: 'الحقل مطلوب (required) لكنه فارغ. ماذا يحدث عند الضغط على «إرسال»؟',
      en: 'The field is required but empty. What happens when you press "Send"?',
      tr: 'Alan zorunlu (required) ama boş. "Gönder"e basınca ne olur?',
    },
    code: `<form novalidate>
  <input name="email" type="email" required>
  <button>Send</button>
</form>`,
    codeLang: 'html',
    options: {
      ar: ['يُرسل النموذج، لأن novalidate يوقف التحقق المدمج', 'يظهر تنبيه «هذا الحقل مطلوب»', 'لا يحدث شيء', 'يُمسح النموذج'],
      en: ['The form is sent, because novalidate turns off built-in validation', 'A "This field is required" bubble shows', 'Nothing happens', 'The form is cleared'],
      tr: ['Form gönderilir, çünkü novalidate yerleşik doğrulamayı kapatır', '"Bu alan zorunludur" uyarısı çıkar', 'Hiçbir şey olmaz', 'Form temizlenir'],
    },
    answer: 0,
    why: {
      ar: 'novalidate يوقف رسائل التحقق في المتصفح عند الإرسال. يُستخدم عندما تعرض رسائل الخطأ بنفسك في JavaScript، مع إمكانية الاستمرار في استخدام checkValidity().',
      en: 'novalidate turns off the browser’s validation messages on submit. It is used when you show your own error messages in JavaScript, and you can still call checkValidity().',
      tr: 'novalidate, gönderimde tarayıcının doğrulama mesajlarını kapatır. Hata mesajlarını JavaScript ile kendin gösterdiğinde kullanılır; checkValidity() yine çağrılabilir.',
    },
  }),
  choice({
    id: 'h-m-icon-button-label', level: 'mid', topic: 'html',
    prompt: {
      ar: 'زر فيه أيقونة × فقط. ماذا ينقصه ليفهمه مستخدم قارئ الشاشة؟',
      en: 'A button has only an × icon. What does it need so a screen reader user understands it?',
      tr: 'Bir butonda sadece × simgesi var. Ekran okuyucu kullanan birinin anlaması için neye ihtiyaç var?',
    },
    code: `<button class="close">
  <svg><!-- × --></svg>
</button>`,
    codeLang: 'html',
    options: {
      ar: ['aria-label="Close"', 'title فقط', 'role="icon"', 'tabindex="0"'],
      en: ['aria-label="Close"', 'title only', 'role="icon"', 'tabindex="0"'],
      tr: ['aria-label="Close"', 'sadece title', 'role="icon"', 'tabindex="0"'],
    },
    answer: 0,
    why: {
      ar: 'زر بدون نص ليس له اسم، فيُقرأ «زر» فقط. aria-label يعطيه اسمًا مسموعًا. title لا يُقرأ بشكل موثوق في كل قارئات الشاشة، والزر يقبل التركيز أصلًا فلا حاجة لـ tabindex.',
      en: 'A button with no text has no name, so it is read as just "button". aria-label gives it a spoken name. title is not read reliably by every screen reader, and a button is already focusable, so tabindex is not needed.',
      tr: 'Metni olmayan bir butonun adı yoktur, sadece "buton" diye okunur. aria-label ona sesli bir ad verir. title her ekran okuyucuda güvenilir okunmaz; buton zaten odaklanabilir, tabindex gerekmez.',
    },
  }),
  choice({
    id: 'h-m-srcset', level: 'mid', topic: 'html',
    prompt: {
      ar: 'ماذا يفعل srcset وsizes في هذه الصورة؟',
      en: 'What do srcset and sizes do on this image?',
      tr: 'Bu görseldeki srcset ve sizes ne yapar?',
    },
    code: `<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Team photo">`,
    codeLang: 'html',
    options: {
      ar: ['يختار المتصفح الملف المناسب لعرض الشاشة وكثافة البكسل', 'يحمّل الملفات الثلاثة معًا', 'يعرض الصور الثلاث بالتتابع', 'يضغط الصورة تلقائيًا'],
      en: ['The browser picks the file that fits the layout width and pixel density', 'It downloads all three files', 'It shows the three images one after another', 'It compresses the image automatically'],
      tr: ['Tarayıcı, düzen genişliğine ve piksel yoğunluğuna uyan dosyayı seçer', 'Üç dosyayı da indirir', 'Üç görseli sırayla gösterir', 'Görseli otomatik sıkıştırır'],
    },
    answer: 0,
    why: {
      ar: 'srcset يعرض الأحجام المتاحة، وsizes يخبر المتصفح كم ستأخذ الصورة من عرض الشاشة. فيحمّل الجوال الصغير ملف 400 بدل 1600، وهذا يوفّر البيانات ويسرّع الصفحة.',
      en: 'srcset lists the available sizes, and sizes tells the browser how wide the image will be on screen. A small phone then downloads the 400 file instead of the 1600 one, saving data and time.',
      tr: 'srcset mevcut boyutları listeler, sizes ise görselin ekranda ne kadar yer kaplayacağını söyler. Küçük bir telefon 1600 yerine 400’lük dosyayı indirir; veri ve zaman kazanılır.',
    },
  }),
  choice({
    id: 'h-m-meta-viewport', level: 'mid', topic: 'html',
    prompt: {
      ar: 'ماذا يحدث على الجوال إذا نسيت هذا السطر؟',
      en: 'What happens on phones if you forget this line?',
      tr: 'Bu satırı unutursan telefonda ne olur?',
    },
    code: `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    codeLang: 'html',
    options: {
      ar: ['تُعرض الصفحة كأنها شاشة كمبيوتر عرضها نحو 980px وتصغُر، وmedia queries الجوال لا تعمل كما يجب', 'لا يحدث شيء', 'لا تفتح الصفحة على الجوال', 'تتوقف JavaScript'],
      en: ['The page is laid out like a ~980px desktop screen and shrunk, so mobile media queries do not kick in as expected', 'Nothing happens', 'The page will not open on phones', 'JavaScript stops'],
      tr: ['Sayfa ~980px masaüstü ekranı gibi dizilip küçültülür; mobil media query’ler beklendiği gibi çalışmaz', 'Hiçbir şey olmaz', 'Sayfa telefonda açılmaz', 'JavaScript durur'],
    },
    answer: 0,
    why: {
      ar: 'بدونه يفترض متصفح الجوال أن الصفحة صُممت للكمبيوتر، فيرسمها بعرض واسع ثم يصغّرها، فيصبح النص صغيرًا جدًا. width=device-width يجعل العرض مساويًا لعرض الجهاز.',
      en: 'Without it, mobile browsers assume a desktop page, draw it wide and zoom out, so text gets tiny. width=device-width makes the layout width match the device.',
      tr: 'Bu satır olmadan mobil tarayıcı sayfanın masaüstü için olduğunu varsayar, geniş çizip uzaklaştırır; yazılar çok küçülür. width=device-width düzen genişliğini cihaza eşitler.',
    },
  }),
  choice({
    id: 'h-m-dialog', level: 'mid', topic: 'html',
    prompt: {
      ar: 'ماذا يعطيك dialog.showModal() دون كتابة كود إضافي؟',
      en: 'What does dialog.showModal() give you without extra code?',
      tr: 'dialog.showModal() ek kod yazmadan sana ne sağlar?',
    },
    code: `<dialog id="confirm">
  <p>Delete this file?</p>
  <form method="dialog"><button>OK</button></form>
</dialog>
<script>confirm.showModal()</script>`,
    codeLang: 'html',
    options: {
      ar: ['نافذة فوق الصفحة، ما خلفها غير قابل للتفاعل، وتُغلق بـ Escape، ومعها ::backdrop', 'نافذة متصفح منفصلة', 'رسالة alert عادية', 'لا شيء دون مكتبة'],
      en: ['A dialog on top, the page behind it becomes inert, Escape closes it, and you get ::backdrop', 'A separate browser window', 'A plain alert', 'Nothing without a library'],
      tr: ['Sayfanın üstünde bir pencere; arkası etkileşimsiz olur, Escape ile kapanır ve ::backdrop gelir', 'Ayrı bir tarayıcı penceresi', 'Sıradan bir alert', 'Kütüphane olmadan hiçbir şey'],
    },
    answer: 0,
    why: {
      ar: 'showModal() يضع العنصر في الطبقة العليا (top layer)، ويجعل باقي الصفحة غير قابلة للتفاعل، وينقل التركيز إليه، ويغلقه بـ Escape. وform method="dialog" يغلقه عند الضغط على الزر.',
      en: 'showModal() puts it in the top layer, makes the rest of the page inert, moves focus into it and closes on Escape. form method="dialog" closes it when the button is pressed.',
      tr: 'showModal() onu en üst katmana koyar, sayfanın geri kalanını etkileşimsiz yapar, odağı içine taşır ve Escape ile kapatır. form method="dialog" butona basınca kapatır.',
    },
  }),
  choice({
    id: 'h-m-lang-dir', level: 'mid', topic: 'html',
    prompt: {
      ar: 'ما فائدة lang="ar" dir="rtl" على عنصر <html>؟',
      en: 'What do lang="ar" dir="rtl" on <html> do?',
      tr: '<html> üzerindeki lang="ar" dir="rtl" ne işe yarar?',
    },
    options: {
      ar: ['قارئ الشاشة ينطق بالعربية، والاتجاه من اليمين لليسار في التخطيط والنص', 'يترجم الصفحة تلقائيًا', 'يغيّر الخط إلى خط عربي', 'يؤثر على SEO فقط'],
      en: ['Screen readers speak Arabic, and layout and text flow right to left', 'It translates the page automatically', 'It switches to an Arabic font', 'It only affects SEO'],
      tr: ['Ekran okuyucu Arapça okur; düzen ve metin sağdan sola akar', 'Sayfayı otomatik çevirir', 'Yazı tipini Arapçaya çevirir', 'Sadece SEO’yu etkiler'],
    },
    answer: 0,
    why: {
      ar: 'lang يحدد لغة المحتوى (للنطق والتدقيق الإملائي ومحركات البحث)، وdir يقلب اتجاه التخطيط. ومع خصائص CSS المنطقية مثل margin-inline-start يتكيف التصميم مع الاتجاهين.',
      en: 'lang sets the content language (for speech, spell-check and search engines), and dir flips the layout direction. With logical CSS like margin-inline-start, one design works both ways.',
      tr: 'lang içerik dilini belirler (seslendirme, yazım denetimi ve arama motorları için), dir ise düzen yönünü çevirir. margin-inline-start gibi mantıksal CSS ile tek tasarım iki yönde de çalışır.',
    },
  }),

  // ───────── HTML · Senior ─────────
  choice({
    id: 'h-s-details', level: 'senior', topic: 'html',
    prompt: {
      ar: 'ما ميزة <details> و<summary> لقسم الأسئلة الشائعة؟',
      en: 'What is the benefit of <details> and <summary> for an FAQ?',
      tr: 'SSS bölümü için <details> ve <summary> kullanmanın faydası nedir?',
    },
    code: `<details>
  <summary>Is it free?</summary>
  <p>Yes.</p>
</details>`,
    codeLang: 'html',
    options: {
      ar: ['فتح وإغلاق مدمج يعمل بلوحة المفاتيح وقارئ الشاشة دون JavaScript', 'يخفي النص عن محركات البحث', 'يعمل فقط مع JavaScript', 'تأثير بصري فقط'],
      en: ['Built-in open/close that works with the keyboard and screen readers, no JavaScript', 'It hides the text from search engines', 'It only works with JavaScript', 'It is just a visual effect'],
      tr: ['Klavye ve ekran okuyucuyla çalışan yerleşik aç/kapa; JavaScript gerekmez', 'Metni arama motorlarından gizler', 'Sadece JavaScript ile çalışır', 'Sadece görsel bir efekt'],
    },
    answer: 0,
    why: {
      ar: 'المتصفح يدير الحالة (الخاصية open) والتركيز والإعلان «موسّع/مطوي» بنفسه. والنص المخفي يبقى في الـ HTML فتقرؤه محركات البحث، ويمكن البحث فيه بـ Ctrl+F في المتصفحات الحديثة.',
      en: 'The browser handles the state (the open attribute), focus and the "expanded/collapsed" announcement. The hidden text stays in the HTML, so search engines read it, and modern browsers find it with Ctrl+F.',
      tr: 'Tarayıcı durumu (open özniteliği), odağı ve "genişletildi/daraltıldı" duyurusunu kendisi yönetir. Gizli metin HTML’de kalır; arama motorları okur, modern tarayıcılarda Ctrl+F ile bulunur.',
    },
  }),
  choice({
    id: 'h-s-preload-font', level: 'senior', topic: 'html',
    prompt: {
      ar: 'ما مشكلة هذا السطر؟',
      en: 'What is wrong with this line?',
      tr: 'Bu satırdaki sorun nedir?',
    },
    code: `<link rel="preload" href="/fonts/cairo.woff2" as="font" type="font/woff2">`,
    codeLang: 'html',
    options: {
      ar: ['ينقصه crossorigin، فلا يُستخدم الملف المحمَّل مسبقًا ويُحمَّل الخط مرتين', 'as="font" غير صحيح', 'الخطوط لا يمكن تحميلها مسبقًا', 'لا مشكلة'],
      en: ['It lacks crossorigin, so the preloaded file is not used and the font downloads twice', 'as="font" is wrong', 'Fonts cannot be preloaded', 'Nothing is wrong'],
      tr: ['crossorigin eksik; önceden yüklenen dosya kullanılmaz ve font iki kez indirilir', 'as="font" yanlış', 'Fontlar önceden yüklenemez', 'Sorun yok'],
    },
    answer: 0,
    why: {
      ar: 'الخطوط تُجلب دائمًا بوضع CORS حتى من نفس الموقع. إذا اختلف وضع الـ preload عن الطلب الحقيقي لا يتطابقان، فيضيع التحميل المسبق. أضف crossorigin.',
      en: 'Fonts are always fetched in CORS mode, even from the same site. If the preload mode does not match the real request, they do not match and the preload is wasted. Add crossorigin.',
      tr: 'Fontlar aynı siteden bile olsa her zaman CORS modunda çekilir. Preload modu gerçek istekle uyuşmazsa eşleşmez ve ön yükleme boşa gider. crossorigin ekle.',
    },
  }),
  choice({
    id: 'h-s-inert', level: 'senior', topic: 'html',
    prompt: {
      ar: 'ماذا تفعل الخاصية inert على عنصر main أثناء فتح نافذة مخصصة؟',
      en: 'What does the inert attribute on main do while a custom modal is open?',
      tr: 'Özel bir modal açıkken main üzerindeki inert özniteliği ne yapar?',
    },
    code: `<main inert>…</main>
<div class="my-modal">…</div>`,
    codeLang: 'html',
    options: {
      ar: ['يمنع النقر والتركيز ويخفيه عن قارئ الشاشة', 'يجعله شفافًا فقط', 'يوقف JavaScript داخله', 'يحذفه من الـ DOM'],
      en: ['Blocks clicks and focus, and hides it from screen readers', 'Only makes it transparent', 'Stops JavaScript inside it', 'Removes it from the DOM'],
      tr: ['Tıklamayı ve odaklanmayı engeller, ekran okuyuculardan gizler', 'Sadece saydam yapar', 'İçindeki JavaScript’i durdurur', 'DOM’dan siler'],
    },
    answer: 0,
    why: {
      ar: 'inert يجعل العنصر وكل ما بداخله غير قابل للتفاعل: لا نقر، ولا Tab، ولا يُقرأ. هذا يحبس التركيز داخل النافذة بسطر واحد بدل كود معقّد.',
      en: 'inert makes the element and everything inside it non-interactive: no clicks, no Tab, not read out. That keeps focus inside the modal with one attribute instead of complex code.',
      tr: 'inert, elemanı ve içindekileri etkileşimsiz yapar: tıklama yok, Tab yok, okunmaz. Böylece karmaşık kod yerine tek öznitelikle odak modal içinde kalır.',
    },
  }),
  choice({
    id: 'h-s-otp-autocomplete', level: 'senior', topic: 'html',
    prompt: {
      ar: 'أي قيمة لـ autocomplete تجعل الجوال يقترح رمز التحقق الذي وصل في رسالة SMS؟',
      en: 'Which autocomplete value lets the phone suggest the code from an SMS?',
      tr: 'Hangi autocomplete değeri telefonun SMS’le gelen kodu önermesini sağlar?',
    },
    options: ['one-time-code', 'sms-code', 'otp', 'current-password'],
    answer: 0,
    codeLang: 'html',
    why: {
      ar: 'autocomplete="one-time-code" قيمة قياسية تفهمها iOS وAndroid، فيظهر الرمز فوق لوحة المفاتيح. وأضف inputmode="numeric" لإظهار لوحة الأرقام.',
      en: 'autocomplete="one-time-code" is a standard value iOS and Android understand, so the code appears above the keyboard. Add inputmode="numeric" for a number pad.',
      tr: 'autocomplete="one-time-code" iOS ve Android’in anladığı standart bir değerdir; kod klavyenin üstünde çıkar. Rakam klavyesi için inputmode="numeric" ekle.',
    },
  }),
  choice({
    id: 'h-s-template', level: 'senior', topic: 'html',
    prompt: {
      ar: 'ماذا يحدث لـ <img> الموجود داخل <template>؟',
      en: 'What happens to the <img> inside <template>?',
      tr: '<template> içindeki <img>’e ne olur?',
    },
    code: `<template id="row">
  <li><img src="/avatar.png" alt=""> <span></span></li>
</template>`,
    codeLang: 'html',
    options: {
      ar: ['لا يُعرض ولا يُحمَّل حتى يُنسخ المحتوى ويُضاف إلى الصفحة', 'يُحمَّل ويُعرض مخفيًا', 'يُحمَّل لكن لا يُعرض', 'يظهر في أعلى الصفحة'],
      en: ['It is neither shown nor downloaded until the content is cloned into the page', 'It loads and is shown hidden', 'It loads but is not shown', 'It shows at the top of the page'],
      tr: ['İçerik kopyalanıp sayfaya eklenene kadar ne gösterilir ne indirilir', 'Yüklenir ve gizli gösterilir', 'Yüklenir ama gösterilmez', 'Sayfanın en üstünde görünür'],
    },
    answer: 0,
    why: {
      ar: 'محتوى <template> يعيش في DocumentFragment غير فعّال: الصور لا تُحمَّل والسكربتات لا تعمل. تنسخه بـ template.content.cloneNode(true) ثم تضيفه، وعندها فقط يصبح فعّالًا.',
      en: 'The content of <template> lives in an inert DocumentFragment: images do not load and scripts do not run. Clone it with template.content.cloneNode(true) and insert it; only then does it come alive.',
      tr: '<template> içeriği etkisiz bir DocumentFragment’tadır: görseller yüklenmez, script’ler çalışmaz. template.content.cloneNode(true) ile kopyalayıp eklersin; ancak o zaman canlanır.',
    },
  }),

  // ───────── CSS ─────────
  choice({
    id: 'c-j-margin-padding', level: 'junior', topic: 'css',
    prompt: {
      ar: 'ما الفرق بين padding وmargin؟',
      en: 'What is the difference between padding and margin?',
      tr: 'padding ile margin arasındaki fark nedir?',
    },
    options: {
      ar: ['padding مسافة داخل الحدود، وmargin مسافة خارجها', 'لا فرق', 'margin داخل الحدود، وpadding خارجها', 'padding للنص فقط وmargin للصور فقط'],
      en: ['padding is space inside the border, margin is space outside it', 'No difference', 'margin is inside the border, padding outside it', 'padding is only for text, margin only for images'],
      tr: ['padding kenarlığın içindeki, margin dışındaki boşluktur', 'Fark yok', 'margin içeride, padding dışarıda', 'padding sadece metin, margin sadece görsel için'],
    },
    answer: 0,
    why: {
      ar: 'padding يكبّر المساحة داخل العنصر ويأخذ لون خلفيته. margin يبعد العنصر عن جيرانه وهو شفاف دائمًا، والهوامش العمودية بين عنصرين قد تندمج.',
      en: 'padding grows the space inside the element and takes its background. margin pushes neighbours away and is always transparent, and vertical margins between two blocks can collapse.',
      tr: 'padding elemanın içindeki alanı büyütür ve arka plan rengini alır. margin komşuları uzaklaştırır, her zaman saydamdır; iki blok arasındaki dikey margin’ler birleşebilir.',
    },
  }),
  choice({
    id: 'c-j-display-visibility', level: 'junior', topic: 'css',
    prompt: {
      ar: 'ما الفرق بين display: none وvisibility: hidden؟',
      en: 'What is the difference between display: none and visibility: hidden?',
      tr: 'display: none ile visibility: hidden arasındaki fark nedir?',
    },
    options: {
      ar: ['display: none يزيل العنصر من التخطيط، وvisibility: hidden يخفيه ويترك مكانه فارغًا', 'لا فرق', 'visibility: hidden يحذفه من الـ DOM', 'display: none يجعله شفافًا فقط'],
      en: ['display: none removes it from the layout; visibility: hidden hides it but keeps its space', 'No difference', 'visibility: hidden removes it from the DOM', 'display: none only makes it transparent'],
      tr: ['display: none düzenden çıkarır; visibility: hidden gizler ama yerini korur', 'Fark yok', 'visibility: hidden DOM’dan siler', 'display: none sadece saydam yapar'],
    },
    answer: 0,
    why: {
      ar: 'مع display: none تتحرك العناصر المجاورة لتملأ المكان. مع visibility: hidden يبقى الفراغ بنفس الحجم. وفي الحالتين لا يُقرأ العنصر ولا يُنقر عليه، ويبقى في الـ DOM.',
      en: 'With display: none, neighbours move in to fill the gap. With visibility: hidden, the empty space stays the same size. In both cases it is not read out or clickable, and it stays in the DOM.',
      tr: 'display: none’da komşu elemanlar boşluğu doldurur. visibility: hidden’da boşluk aynı boyutta kalır. İki durumda da eleman okunmaz, tıklanmaz ve DOM’da kalır.',
    },
  }),
  choice({
    id: 'c-s-container-type', level: 'senior', topic: 'css',
    prompt: {
      ar: 'لماذا لا تُطبَّق قاعدة @container هنا أبدًا؟',
      en: 'Why does this @container rule never apply?',
      tr: 'Bu @container kuralı neden hiç uygulanmıyor?',
    },
    code: `.sidebar { width: 500px; }

@container (min-width: 400px) {
  .card { display: flex; }
}

/* <aside class="sidebar"><div class="card">…</div></aside> */`,
    codeLang: 'css',
    options: {
      ar: ['لا يوجد أب عليه container-type: inline-size', '@container لا يدعم min-width', 'يجب كتابة @media بدلها', 'عرض 500px أصغر من 400px'],
      en: ['No ancestor has container-type: inline-size', '@container does not support min-width', 'It must be @media instead', '500px is smaller than 400px'],
      tr: ['Hiçbir üst elemanda container-type: inline-size yok', '@container min-width desteklemez', '@media yazılmalı', '500px, 400px’ten küçük'],
    },
    answer: 0,
    why: {
      ar: 'container queries تحتاج أبًا مُعلَنًا كـ container. أضف .sidebar { container-type: inline-size; } فيقيس .card حجم الشريط الجانبي بدل حجم الشاشة.',
      en: 'Container queries need an ancestor declared as a container. Add .sidebar { container-type: inline-size; } and .card will respond to the sidebar’s width instead of the screen.',
      tr: 'Container query’ler container olarak tanımlanmış bir üst eleman ister. .sidebar { container-type: inline-size; } ekle; .card ekran yerine kenar çubuğunun genişliğine göre davranır.',
    },
  }),
  choice({
    id: 'c-s-has', level: 'senior', topic: 'css',
    prompt: {
      ar: 'أي العناصر يختارها هذا المحدد؟',
      en: 'Which elements does this selector match?',
      tr: 'Bu seçici hangi elemanları seçer?',
    },
    code: `.card:has(img) {
  padding-top: 0;
}`,
    codeLang: 'css',
    options: {
      ar: ['كل .card بداخله img', 'كل img داخل .card', 'كل .card بعده img مباشرة', 'كل .card ليس بداخله img'],
      en: ['Every .card that contains an img', 'Every img inside a .card', 'Every .card directly followed by an img', 'Every .card without an img'],
      tr: ['İçinde img olan her .card', '.card içindeki her img', 'Hemen ardından img gelen her .card', 'İçinde img olmayan her .card'],
    },
    answer: 0,
    why: {
      ar: ':has() يختار العنصر نفسه حسب ما بداخله، وهو ما كان يُسمّى «محدد الأب». والتنسيق يقع على .card لا على الصورة.',
      en: ':has() selects the element itself based on what is inside it, the long-awaited "parent selector". The style applies to .card, not to the image.',
      tr: ':has() elemanın kendisini içindekilere göre seçer; uzun süre beklenen "ebeveyn seçici". Stil görsele değil, .card’a uygulanır.',
    },
  }),
  choice({
    id: 'c-s-sticky-overflow', level: 'senior', topic: 'css',
    prompt: {
      ar: 'الهيدر عليه position: sticky; top: 0 لكنه لا يلتصق عند التمرير. ما السبب الأرجح؟',
      en: 'The header has position: sticky; top: 0 but does not stick when scrolling. What is the most likely cause?',
      tr: 'Başlıkta position: sticky; top: 0 var ama kaydırınca yapışmıyor. En olası sebep nedir?',
    },
    code: `.layout { overflow: hidden; }
.header { position: sticky; top: 0; }

/* <div class="layout"><header class="header">…</header>…</div> */`,
    codeLang: 'css',
    options: {
      ar: ['الأب عليه overflow: hidden فيصبح هو حاوية التمرير', 'sticky يحتاج z-index', 'يجب استخدام position: fixed', 'top: 0 غير مسموح'],
      en: ['The parent has overflow: hidden, so it becomes the scroll container', 'sticky needs a z-index', 'You must use position: fixed', 'top: 0 is not allowed'],
      tr: ['Üst elemanda overflow: hidden var; kaydırma kapsayıcısı o oluyor', 'sticky z-index ister', 'position: fixed kullanılmalı', 'top: 0 kullanılamaz'],
    },
    answer: 0,
    why: {
      ar: 'العنصر sticky يلتصق داخل أقرب أب له overflow غير visible. هنا .layout لا يتمرر هو نفسه، فلا يلتصق الهيدر. احذف overflow: hidden أو استخدم overflow: clip الذي لا ينشئ حاوية تمرير.',
      en: 'A sticky element sticks inside its nearest ancestor with overflow other than visible. Here .layout does not scroll itself, so the header never sticks. Remove overflow: hidden, or use overflow: clip, which does not create a scroll container.',
      tr: 'Sticky eleman, overflow’u visible olmayan en yakın üst elemanın içinde yapışır. Burada .layout kendisi kaymıyor, başlık hiç yapışmaz. overflow: hidden’ı kaldır ya da kaydırma kapsayıcısı oluşturmayan overflow: clip kullan.',
    },
  }),
  choice({
    id: 'c-s-z-index-static', level: 'senior', topic: 'css',
    prompt: {
      ar: 'لماذا لا يظهر .badge فوق الصورة رغم z-index الكبير؟',
      en: 'Why does .badge not show above the image despite the large z-index?',
      tr: 'Büyük z-index’e rağmen .badge neden görselin üstünde görünmüyor?',
    },
    code: `.badge {
  z-index: 9999;
  margin-top: -20px;
}`,
    codeLang: 'css',
    options: {
      ar: ['z-index لا يؤثر على عنصر position: static في التدفق العادي', 'الرقم كبير جدًا', 'z-index يعمل في Grid فقط', 'margin سالب يلغي z-index'],
      en: ['z-index has no effect on a position: static element in normal flow', 'The number is too large', 'z-index only works in Grid', 'A negative margin cancels z-index'],
      tr: ['z-index normal akıştaki position: static elemanda etkisizdir', 'Sayı çok büyük', 'z-index sadece Grid’de çalışır', 'Negatif margin z-index’i iptal eder'],
    },
    answer: 0,
    why: {
      ar: 'z-index يعمل على العناصر الموضوعة (relative أو absolute أو fixed أو sticky) وعلى عناصر flex وgrid. أضف position: relative. وإذا بقيت المشكلة فقد يكون الأب ينشئ stacking context خاصًا.',
      en: 'z-index works on positioned elements (relative, absolute, fixed, sticky) and on flex and grid items. Add position: relative. If it still fails, a parent may be creating its own stacking context.',
      tr: 'z-index konumlandırılmış elemanlarda (relative, absolute, fixed, sticky) ve flex/grid öğelerinde çalışır. position: relative ekle. Hâlâ olmuyorsa bir üst eleman kendi stacking context’ini oluşturuyor olabilir.',
    },
  }),
  choice({
    id: 'c-s-clamp', level: 'senior', topic: 'css',
    prompt: {
      ar: 'ما حجم الخط على شاشة عرضها 1600px؟',
      en: 'What is the font size on a 1600px wide screen?',
      tr: '1600px genişliğindeki ekranda yazı boyutu nedir?',
    },
    code: `html { font-size: 16px; }
h1 { font-size: clamp(1.5rem, 4vw, 3rem); }`,
    codeLang: 'css',
    options: ['48px', '64px', '24px', '40px'],
    answer: 0,
    why: {
      ar: '4vw من 1600px تساوي 64px، لكن clamp يحدّها بالحد الأعلى 3rem = 48px. وعلى شاشة 400px تكون 4vw = 16px فتُرفع إلى الحد الأدنى 1.5rem = 24px.',
      en: '4vw of 1600px is 64px, but clamp caps it at the max, 3rem = 48px. On a 400px screen 4vw is 16px, so it is raised to the min, 1.5rem = 24px.',
      tr: '1600px’in 4vw’si 64px’tir ama clamp bunu üst sınırla, 3rem = 48px ile keser. 400px ekranda 4vw = 16px olur ve alt sınıra, 1.5rem = 24px’e yükseltilir.',
    },
  }),
]
