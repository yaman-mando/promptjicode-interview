import type { Question } from '#shared/types/quiz'

/** The first 15 questions (from the PromptjiCode interview series). */
export const LEGACY: Question[] = [
  // ───────────────────────── JUNIOR ─────────────────────────
  {
    id: 'j-nullish',
    level: 'junior',
    topic: 'javascript',
    codeLang: 'js',
    code: `const settings = { volume: 0 };

console.log(settings.volume || 50);
console.log(settings.volume ?? 50);`,
    options: ['50, 0', '0, 0', '50, 50', '0, 50'],
    answer: 0,
    text: {
      ar: {
        prompt: 'المستخدم أطفأ الصوت (volume = 0). ماذا يُطبع؟',
        explanation: 'العامل || يعتبر 0 قيمة falsy فيستبدلها بـ 50، فيعود الصوت رغم أن المستخدم أطفأه. أما ?? فلا يستبدل إلا null وundefined، لذلك يحافظ على 0.',
      },
      en: {
        prompt: 'The user muted the sound (volume = 0). What gets logged?',
        explanation: '|| treats 0 as falsy and replaces it with 50, so the sound comes back even though the user muted it. ?? only replaces null and undefined, so 0 is kept.',
      },
      tr: {
        prompt: 'Kullanıcı sesi kapattı (volume = 0). Konsola ne yazılır?',
        explanation: '|| operatörü 0’ı falsy kabul edip 50 ile değiştirir; kullanıcı sesi kapatsa da ses geri gelir. ?? ise yalnızca null ve undefined değerlerini değiştirir, bu yüzden 0 korunur.',
      },
    },
  },
  {
    id: 'j-reference',
    level: 'junior',
    topic: 'javascript',
    codeLang: 'js',
    code: `const a = { likes: 1 };
const b = a;

b.likes++;

console.log(a.likes);`,
    options: ['1', '2', 'undefined', 'TypeError'],
    answer: 1,
    text: {
      ar: {
        prompt: 'ماذا يُطبع؟',
        explanation: 'السطر b = a لا ينسخ الكائن، بل ينسخ المرجع إليه. a وb يشيران إلى الكائن نفسه، فأي تعديل عبر b يظهر في a. وconst يمنع إعادة الإسناد فقط، لا تعديل الخصائص.',
      },
      en: {
        prompt: 'What gets logged?',
        explanation: 'b = a does not copy the object, it copies the reference. a and b point to the same object, so a change through b shows up in a. const only blocks reassignment, not changing properties.',
      },
      tr: {
        prompt: 'Konsola ne yazılır?',
        explanation: 'b = a nesneyi kopyalamaz, referansı kopyalar. a ve b aynı nesneyi gösterir; b üzerinden yapılan değişiklik a’da da görünür. const yalnızca yeniden atamayı engeller, özellik değiştirmeyi değil.',
      },
    },
  },
  {
    id: 'j-typeof-null',
    level: 'junior',
    topic: 'javascript',
    codeLang: 'js',
    code: `console.log(typeof null);`,
    options: ['"null"', '"object"', '"undefined"', '"NaN"'],
    answer: 1,
    text: {
      ar: {
        prompt: 'ماذا يُطبع؟',
        explanation: 'هذا خطأ قديم في JavaScript بقي لأجل التوافق: typeof null يعيد "object". للتحقق من null استخدم value === null.',
      },
      en: {
        prompt: 'What gets logged?',
        explanation: 'This is an old JavaScript bug kept for compatibility: typeof null returns "object". To check for null, use value === null.',
      },
      tr: {
        prompt: 'Konsola ne yazılır?',
        explanation: 'Bu, uyumluluk için korunan eski bir JavaScript hatasıdır: typeof null "object" döndürür. null kontrolü için value === null kullanın.',
      },
    },
  },
  {
    id: 'j-sort-numbers',
    level: 'junior',
    topic: 'javascript',
    codeLang: 'js',
    code: `const prices = [10, 1, 2];

console.log(prices.sort());`,
    options: ['[1, 2, 10]', '[1, 10, 2]', '[10, 2, 1]', '[2, 1, 10]'],
    answer: 1,
    text: {
      ar: {
        prompt: 'ماذا يُطبع؟',
        explanation: 'sort() بدون دالة مقارنة يرتّب العناصر كنصوص، و"10" يأتي قبل "2" أبجديًا. لترتيب الأرقام: prices.sort((a, b) => a - b).',
      },
      en: {
        prompt: 'What gets logged?',
        explanation: 'sort() with no compare function sorts items as strings, and "10" comes before "2". To sort numbers: prices.sort((a, b) => a - b).',
      },
      tr: {
        prompt: 'Konsola ne yazılır?',
        explanation: 'Karşılaştırma fonksiyonu olmadan sort() öğeleri metin olarak sıralar ve "10", "2"den önce gelir. Sayıları sıralamak için: prices.sort((a, b) => a - b).',
      },
    },
  },
  {
    id: 'j-button',
    run: false,
    level: 'junior',
    topic: 'html',
    options: ['<div onclick="save()">', '<span onclick="save()">', '<button type="button">', '<a href="#">'],
    answer: 2,
    text: {
      ar: {
        prompt: 'تريد زرًّا لحفظ النموذج (ليس رابطًا لصفحة أخرى). أي عنصر هو الأنسب؟',
        explanation: 'button يعمل بلوحة المفاتيح (Tab وEnter وSpace)، وقارئ الشاشة يعلن أنه زر، كل ذلك تلقائيًا. div وspan يحتاجان كودًا إضافيًا ليصلا لنفس النتيجة، والرابط مخصص للتنقل.',
      },
      en: {
        prompt: 'You need a control that saves a form (not a link to another page). Which element fits best?',
        explanation: 'A button works with the keyboard (Tab, Enter, Space) and screen readers announce it as a button, all for free. div and span need extra code to match that, and links are meant for navigation.',
      },
      tr: {
        prompt: 'Bir formu kaydeden bir kontrol gerekiyor (başka sayfaya bağlantı değil). Hangi öğe en uygun?',
        explanation: 'button klavyeyle (Tab, Enter, Space) çalışır ve ekran okuyucular onu buton olarak duyurur; hepsi kendiliğinden. div ve span için ek kod gerekir, bağlantılar ise sayfa geçişi içindir.',
      },
    },
  },

  // ───────────────────────── MID ─────────────────────────
  {
    id: 'm-var-loop',
    level: 'mid',
    topic: 'async',
    codeLang: 'js',
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: ['0 1 2', '3 3 3', '2 2 2', 'undefined undefined undefined'],
    answer: 1,
    text: {
      ar: {
        prompt: 'ماذا يُطبع؟',
        explanation: 'var له متغير واحد لكل الحلقة. الدوال داخل setTimeout تعمل بعد انتهاء الحلقة، وعندها تكون i قد صارت 3. مع let يُنشأ متغير جديد في كل دورة فيُطبع 0 1 2.',
      },
      en: {
        prompt: 'What gets logged?',
        explanation: 'var creates one variable for the whole loop. The setTimeout callbacks run after the loop ends, when i is already 3. With let, each iteration gets its own i, so it logs 0 1 2.',
      },
      tr: {
        prompt: 'Konsola ne yazılır?',
        explanation: 'var tüm döngü için tek bir değişken oluşturur. setTimeout fonksiyonları döngü bittikten sonra çalışır; o anda i zaten 3’tür. let ile her turda yeni bir i oluşur ve 0 1 2 yazılır.',
      },
    },
  },
  {
    id: 'm-fetch-404',
    run: false,
    level: 'mid',
    topic: 'async',
    codeLang: 'js',
    code: `// The server responds with 404
try {
  const res = await fetch('/api/user');
  console.log('ok', res.status);
} catch (e) {
  console.log('error');
}`,
    options: ['ok 404', 'error', 'ok 200', '(nothing)'],
    answer: 0,
    text: {
      ar: {
        prompt: 'السيرفر ردّ بـ 404. ماذا يُطبع؟',
        explanation: 'fetch لا يرمي خطأ عند 404 أو 500، فالطلب نفسه نجح والسيرفر ردّ. يرمي فقط عند فشل الشبكة. لذلك افحص res.ok بنفسك قبل استخدام البيانات.',
      },
      en: {
        prompt: 'The server responds with 404. What gets logged?',
        explanation: 'fetch does not throw on 404 or 500: the request itself worked and the server replied. It only throws on network failure. Check res.ok yourself before using the data.',
      },
      tr: {
        prompt: 'Sunucu 404 döndürüyor. Konsola ne yazılır?',
        explanation: 'fetch 404 veya 500’de hata fırlatmaz; istek başarılı oldu ve sunucu yanıt verdi. Yalnızca ağ hatasında fırlatır. Veriyi kullanmadan önce res.ok’u kendiniz kontrol edin.',
      },
    },
  },
  {
    id: 'm-event-loop',
    level: 'mid',
    topic: 'async',
    codeLang: 'js',
    code: `console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve().then(() => console.log(3));

console.log(4);`,
    options: ['1 2 3 4', '1 4 2 3', '1 4 3 2', '1 3 4 2'],
    answer: 2,
    text: {
      ar: {
        prompt: 'ما ترتيب الطباعة؟',
        explanation: 'الكود المتزامن أولًا (1 ثم 4). بعده تُنفَّذ كل الـ microtasks، ومنها then الخاص بالـ Promise (3). وأخيرًا الـ macrotasks مثل setTimeout (2)، حتى لو كان التأخير 0.',
      },
      en: {
        prompt: 'In what order are the numbers logged?',
        explanation: 'Synchronous code runs first (1, then 4). Then all microtasks run, including the Promise then (3). Macrotasks like setTimeout (2) come last, even with a 0 delay.',
      },
      tr: {
        prompt: 'Sayılar hangi sırayla yazılır?',
        explanation: 'Önce senkron kod çalışır (1, sonra 4). Ardından Promise then dahil tüm microtask’lar çalışır (3). setTimeout gibi macrotask’lar en son gelir (2), gecikme 0 olsa bile.',
      },
    },
  },
  {
    id: 'm-react-key',
    run: false,
    level: 'mid',
    topic: 'react',
    codeLang: 'jsx',
    code: `// Each <Item> keeps its own "checked" state
{items.map((item, i) => (
  <Item key={i} name={item} />
))}

// items: ['Milk', 'Bread', 'Eggs']
// 1. The user checks "Bread"
// 2. "Milk" is deleted`,
    answer: 1,
    text: {
      ar: {
        prompt: 'بعد حذف "Milk"، أي عنصر يظهر معلَّمًا؟',
        options: ['يبقى "Bread" معلَّمًا', 'يصبح "Eggs" معلَّمًا', 'لا شيء معلَّم', 'يظهر خطأ'],
        explanation: 'React يربط الحالة بالـ key. "Bread" كان على key = 1. بعد الحذف صار "Eggs" في الموضع 1 فأخذ نفس الـ key ونفس الحالة. استخدم معرّفًا ثابتًا مثل item.id بدل الفهرس.',
      },
      en: {
        prompt: 'After "Milk" is deleted, which item shows as checked?',
        options: ['"Bread" stays checked', '"Eggs" becomes checked', 'Nothing is checked', 'An error is thrown'],
        explanation: 'React ties state to the key. "Bread" had key = 1. After the delete, "Eggs" moves to position 1, gets the same key and the same state. Use a stable id like item.id instead of the index.',
      },
      tr: {
        prompt: '"Milk" silindikten sonra hangi öğe işaretli görünür?',
        options: ['"Bread" işaretli kalır', '"Eggs" işaretli olur', 'Hiçbiri işaretli değil', 'Hata fırlatılır'],
        explanation: 'React durumu key’e bağlar. "Bread" key = 1 idi. Silme sonrası "Eggs" 1. konuma geçer, aynı key’i ve aynı durumu alır. İndeks yerine item.id gibi sabit bir kimlik kullanın.',
      },
    },
  },
  {
    id: 'm-specificity',
    run: false,
    level: 'mid',
    topic: 'css',
    codeLang: 'css',
    code: `/* <h1 id="title" class="title big">Hello</h1> */

#title       { color: blue; }
.title.big   { color: red; }
h1           { color: green; }`,
    options: ['blue', 'red', 'green', 'black'],
    answer: 0,
    text: {
      ar: {
        prompt: 'ما لون العنوان؟',
        explanation: 'الأولوية تُحسب بالـ specificity لا بترتيب الأسطر. محدد id واحد (#title) أقوى من أي عدد من الـ classes (.title.big)، وهذه أقوى من اسم العنصر (h1).',
      },
      en: {
        prompt: 'What color is the heading?',
        explanation: 'Specificity decides, not the order of the rules. One id selector (#title) beats any number of classes (.title.big), which beat an element selector (h1).',
      },
      tr: {
        prompt: 'Başlığın rengi nedir?',
        explanation: 'Kuralların sırası değil, specificity belirler. Tek bir id seçici (#title) istediğiniz sayıda class’ı (.title.big) yener; class’lar da öğe seçicisini (h1) yener.',
      },
    },
  },

  // ───────────────────────── SENIOR ─────────────────────────
  {
    id: 's-transform',
    run: false,
    level: 'senior',
    topic: 'css',
    codeLang: 'css',
    code: `.card {
  transition: ??? 300ms;
}
.card:hover {
  /* move the card 20px to the right */
}`,
    options: ['left', 'margin-left', 'transform', 'width'],
    answer: 2,
    text: {
      ar: {
        prompt: 'أي خاصية تحرّك البطاقة بأسلس أداء، بدون إعادة Layout وPaint في كل إطار؟',
        explanation: 'تغيير left أو margin أو width يجبر المتصفح على إعادة حساب الـ Layout ثم الرسم في كل إطار. transform يُنفَّذ في مرحلة Composite فقط، وغالبًا على الـ GPU، فتبقى الحركة سلسة.',
      },
      en: {
        prompt: 'Which property moves the card most smoothly, without re-running Layout and Paint on every frame?',
        explanation: 'Changing left, margin or width makes the browser redo Layout and then Paint on every frame. transform only touches the Composite step, often on the GPU, so the motion stays smooth.',
      },
      tr: {
        prompt: 'Hangi özellik kartı her karede Layout ve Paint’i yeniden çalıştırmadan en akıcı şekilde hareket ettirir?',
        explanation: 'left, margin veya width değiştirmek tarayıcıyı her karede Layout ve ardından Paint yapmaya zorlar. transform yalnızca Composite adımını etkiler, çoğu zaman GPU’da; hareket akıcı kalır.',
      },
    },
  },
  {
    id: 's-stacking-context',
    run: false,
    level: 'senior',
    topic: 'css',
    codeLang: 'html',
    code: `<div style="position: relative; z-index: 1">
  <div style="position: absolute; z-index: 9999">A</div>
</div>

<div style="position: relative; z-index: 2">B</div>`,
    options: ['A', 'B'],
    answer: 1,
    text: {
      ar: {
        prompt: 'A وB يتداخلان على الشاشة. أيهما يظهر في الأعلى؟',
        options: ['A (لأن z-index له 9999)', 'B'],
        explanation: 'الأب الذي له position وz-index ينشئ stacking context. A محبوس داخل أبيه (z-index: 1)، والـ 9999 تُقارن فقط مع إخوته داخله. الأب نفسه أقل من B (2)، فيظهر B فوق.',
      },
      en: {
        prompt: 'A and B overlap on screen. Which one is on top?',
        options: ['A (its z-index is 9999)', 'B'],
        explanation: 'A parent with position and z-index creates a stacking context. A is trapped inside its parent (z-index: 1); 9999 only competes with its siblings in there. The parent is below B (2), so B wins.',
      },
      tr: {
        prompt: 'A ve B ekranda üst üste biniyor. Hangisi üstte görünür?',
        options: ['A (z-index değeri 9999)', 'B'],
        explanation: 'position ve z-index’i olan üst öğe bir stacking context oluşturur. A, üst öğesinin (z-index: 1) içinde kalır; 9999 yalnızca oradaki kardeşleriyle yarışır. Üst öğe B’nin (2) altında olduğu için B üstte görünür.',
      },
    },
  },
  {
    id: 's-setstate-batch',
    run: false,
    level: 'senior',
    topic: 'react',
    codeLang: 'jsx',
    code: `const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}

// After one click, count is…`,
    options: ['1', '3', '0', '2'],
    answer: 0,
    text: {
      ar: {
        prompt: 'بعد ضغطة واحدة، كم تصبح قيمة count؟',
        explanation: 'count داخل الدالة هو قيمة الـ render الحالي (0). الاستدعاءات الثلاثة تطلب setCount(1). للزيادة ثلاث مرات استخدم الصيغة الدالّية: setCount(c => c + 1).',
      },
      en: {
        prompt: 'After one click, what is count?',
        explanation: 'count inside the handler is the value from the current render (0). All three calls ask for setCount(1). To add three times, use the updater form: setCount(c => c + 1).',
      },
      tr: {
        prompt: 'Tek tıklamadan sonra count kaç olur?',
        explanation: 'Fonksiyon içindeki count, mevcut render’daki değerdir (0). Üç çağrının hepsi setCount(1) ister. Üç kez artırmak için güncelleyici biçimini kullanın: setCount(c => c + 1).',
      },
    },
  },
  {
    id: 's-all-settled',
    level: 'senior',
    topic: 'async',
    codeLang: 'js',
    code: `const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject(new Error('x')),
  Promise.resolve(3),
]);

console.log(results.map(r => r.status));`,
    options: [
      "['fulfilled', 'rejected', 'fulfilled']",
      "Error: x",
      "[1, undefined, 3]",
      "['fulfilled', 'fulfilled', 'fulfilled']",
    ],
    answer: 0,
    text: {
      ar: {
        prompt: 'ماذا يُطبع؟',
        explanation: 'Promise.all يتوقف عند أول رفض، أما allSettled فينتظر الجميع ولا يرمي أبدًا. يعيد لكل وعد كائنًا فيه status (fulfilled أو rejected) مع value أو reason.',
      },
      en: {
        prompt: 'What gets logged?',
        explanation: 'Promise.all stops at the first rejection; allSettled waits for all of them and never throws. It returns an object per promise with status (fulfilled or rejected) plus value or reason.',
      },
      tr: {
        prompt: 'Konsola ne yazılır?',
        explanation: 'Promise.all ilk reddedilmede durur; allSettled hepsini bekler ve asla hata fırlatmaz. Her promise için status (fulfilled veya rejected) ile value ya da reason içeren bir nesne döndürür.',
      },
    },
  },
  {
    id: 's-microtask-chain',
    level: 'senior',
    topic: 'async',
    codeLang: 'js',
    code: `setTimeout(() => console.log('A'), 0);

queueMicrotask(() => {
  console.log('B');
  queueMicrotask(() => console.log('C'));
});

console.log('D');`,
    options: ['D B C A', 'D B A C', 'B C D A', 'D A B C'],
    answer: 0,
    text: {
      ar: {
        prompt: 'ما ترتيب الطباعة؟',
        explanation: 'D متزامن فيُطبع أولًا. ثم تُفرَّغ قائمة الـ microtasks بالكامل، بما فيها أي microtask جديد يُضاف أثناءها، فيُطبع B ثم C. بعد ذلك فقط يأتي دور setTimeout (A).',
      },
      en: {
        prompt: 'In what order are the letters logged?',
        explanation: 'D is synchronous, so it comes first. Then the microtask queue is fully drained, including microtasks added while draining, so B then C. Only after that does setTimeout run (A).',
      },
      tr: {
        prompt: 'Harfler hangi sırayla yazılır?',
        explanation: 'D senkron olduğu için önce yazılır. Sonra microtask kuyruğu tamamen boşaltılır; boşaltma sırasında eklenenler dahil: önce B, sonra C. Ancak bundan sonra setTimeout çalışır (A).',
      },
    },
  },
]
