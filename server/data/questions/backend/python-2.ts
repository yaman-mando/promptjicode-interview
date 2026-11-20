import type { Question } from '#shared/types/quiz'
import { choice, output } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const P = W('ماذا يطبع هذا الكود؟', 'What does this code print?', 'Bu kod ne yazdırır?')
const topic = 'python' as const
const py = { codeLang: 'py' as const, prompt: P, topic }

export const PYTHON_2: Question[] = [
  // ───────── Junior ─────────
  output({ ...py, id: 'py-j2-slice', level: 'junior',
    code: `s = "promptji"
print(s[0:3], s[-2:])`,
    options: ['pro ji', 'prom ji', 'pro tji', 'pr ij'], answer: 0,
    why: W('[0:3] يأخذ من 0 حتى قبل 3، و[-2:] آخر حرفين.', '[0:3] takes from 0 up to (not including) 3, and [-2:] the last two characters.', '[0:3] 0’dan 3’e kadar (3 hariç), [-2:] son iki karakteri alır.') }),
  output({ ...py, id: 'py-j2-dict-update', level: 'junior',
    code: `d = {"a": 1, "b": 2}
d["a"] = 5
print(len(d), d["a"])`,
    options: ['2 5', '3 5', '2 1', '3 1'], answer: 0,
    why: W('الإسناد لمفتاح موجود يغيّر قيمته ولا يضيف مفتاحًا جديدًا.', 'Assigning to an existing key changes its value; it does not add a new key.', 'Var olan bir anahtara atama değerini değiştirir, yeni anahtar eklemez.') }),
  output({ ...py, id: 'py-j2-range-step', level: 'junior',
    code: `print(list(range(2, 10, 3)))`,
    options: ['[2, 5, 8]', '[2, 5, 8, 11]', '[3, 6, 9]', '[2, 3, 4]'], answer: 0,
    why: W('range(البداية، النهاية، الخطوة): يبدأ من 2 ويزيد 3 ويتوقف قبل 10.', 'range(start, stop, step): starts at 2, adds 3 each time and stops before 10.', 'range(başlangıç, bitiş, adım): 2’den başlar, 3 artar ve 10’dan önce durur.') }),
  output({ ...py, id: 'py-j2-swap', level: 'junior',
    code: `a, b = 1, 2
a, b = b, a
print(a, b)`,
    options: ['2 1', '1 2', '2 2', '1 1'], answer: 0,
    why: W('الطرف الأيمن يُحسب أولًا كـ tuple (2, 1) ثم يُوزَّع، فيتبادل المتغيران بدون متغير مؤقت.', 'The right side is built first as the tuple (2, 1), then unpacked, so the two swap without a temp variable.', 'Sağ taraf önce (2, 1) demeti olarak oluşturulur, sonra dağıtılır; geçici değişken olmadan yer değiştirirler.') }),
  output({ ...py, id: 'py-j2-in-dict', level: 'junior',
    code: `user = {"name": "Ali"}
print("name" in user, "Ali" in user)`,
    options: ['True False', 'True True', 'False True', 'False False'], answer: 0,
    why: W('in مع القاموس يبحث في المفاتيح فقط. للبحث في القيم: "Ali" in user.values().', 'in on a dict checks keys only. To search values: "Ali" in user.values().', 'Sözlükte in sadece anahtarlara bakar. Değerlerde aramak için: "Ali" in user.values().') }),
  output({ ...py, id: 'py-j2-str-int', level: 'junior',
    code: `print("5" * 2, int("5") * 2)`,
    options: ['55 10', '10 10', '55 55', '10 55'], answer: 0,
    why: W('ضرب النص يكرره، وint() يحوّل النص إلى رقم قبل الضرب.', 'Multiplying a string repeats it; int() turns it into a number before multiplying.', 'Metni çarpmak onu tekrarlar; int() çarpmadan önce sayıya çevirir.') }),
  output({ ...py, id: 'py-j2-truthy', level: 'junior',
    code: `print(bool([]), bool("0"), bool(0))`,
    options: ['False True False', 'False False False', 'True True False', 'False True True'], answer: 0,
    why: W('القائمة الفارغة والصفر «كاذبان»، أما النص "0" فليس فارغًا فهو «صادق».', 'An empty list and zero are falsy, but the string "0" is not empty, so it is truthy.', 'Boş liste ve sıfır yanlış (falsy) sayılır; "0" metni boş değildir, doğru (truthy) sayılır.') }),
  output({ ...py, id: 'py-j2-join', level: 'junior',
    code: `print("-".join(["a", "b", "c"]))`,
    options: ['a-b-c', '-a-b-c', 'abc', "['a', 'b', 'c']"], answer: 0,
    why: W('join دالة على النص الفاصل وتستقبل القائمة، فتضع "-" بين العناصر فقط.', 'join is called on the separator string and takes the list, putting "-" only between items.', 'join ayraç metni üzerinde çağrılır ve listeyi alır; "-" sadece öğelerin arasına konur.') }),
  output({ ...py, id: 'py-j2-split-empty', level: 'junior',
    code: `print("a,b,,c".split(","))`,
    options: ["['a', 'b', '', 'c']", "['a', 'b', 'c']", "['a,b,,c']", "['a', 'b', ',', 'c']"], answer: 0,
    why: W('الفاصلتان المتتاليتان تعطيان نصًا فارغًا بينهما. split() بدون معامل يتعامل مع المسافات بطريقة مختلفة.', 'Two commas in a row give an empty string between them. split() with no argument treats whitespace differently.', 'Art arda iki virgül aralarında boş bir metin verir. Argümansız split() boşlukları farklı ele alır.') }),
  output({ ...py, id: 'py-j2-try-except', level: 'junior',
    code: `try:
    print(int("abc"))
except ValueError:
    print("bad number")`,
    options: ['bad number', 'abc', '0', 'ValueError'], answer: 0,
    why: W('int("abc") ترمي ValueError قبل الطباعة، فينتقل التنفيذ إلى except.', 'int("abc") raises ValueError before printing, so execution jumps to except.', 'int("abc") yazdırmadan önce ValueError fırlatır; çalışma except’e geçer.') }),
  output({ ...py, id: 'py-j2-enumerate', level: 'junior',
    code: `for i, name in enumerate(["a", "b"], start=1):
    print(i, name)`,
    options: ['1 a, 2 b', '0 a, 1 b', 'a 1, b 2', '1, 2'], answer: 0,
    why: W('enumerate يعطي الرقم مع العنصر، وstart=1 يبدأ العدّ من 1 بدل 0.', 'enumerate gives the index with each item, and start=1 counts from 1 instead of 0.', 'enumerate her öğeyle birlikte sırasını verir; start=1 saymayı 0 yerine 1’den başlatır.') }),
  choice({ id: 'py-j2-venv', level: 'junior', topic,
    prompt: W('لماذا ننشئ بيئة افتراضية (venv) لكل مشروع Python؟', 'Why create a virtual environment (venv) per Python project?', 'Her Python projesi için neden sanal ortam (venv) oluştururuz?'),
    options: L3(['لتكون مكتبات وإصدارات كل مشروع منفصلة عن غيره', 'لتسريع Python', 'لتشفير الكود', 'لأن pip لا يعمل بدونها'], ['So each project’s libraries and versions are kept apart', 'To make Python faster', 'To encrypt the code', 'Because pip does not work without it'], ['Her projenin kütüphane ve sürümleri birbirinden ayrı kalsın diye', 'Python’u hızlandırmak için', 'Kodu şifrelemek için', 'pip onsuz çalışmadığı için']), answer: 0,
    why: W('مشروع يحتاج Django 4 وآخر Django 5؛ كل venv له مجلد حزم خاص. تُنشأ بـ python -m venv .venv.', 'One project needs Django 4, another Django 5; each venv has its own packages folder. Create one with python -m venv .venv.', 'Bir proje Django 4, diğeri Django 5 ister; her venv’in kendi paket klasörü vardır. python -m venv .venv ile oluşturulur.') }),
  choice({ id: 'py-j2-requirements', level: 'junior', topic,
    prompt: W('زميلك أرسل مشروعًا فيه requirements.txt. كيف تثبّت المكتبات؟', 'A colleague sent a project with requirements.txt. How do you install the libraries?', 'Bir arkadaşın requirements.txt içeren bir proje gönderdi. Kütüphaneleri nasıl kurarsın?'),
    options: ['pip install -r requirements.txt', 'python requirements.txt', 'npm install', 'pip run requirements'], answer: 0, codeLang: 'bash',
    why: W('-r يقرأ قائمة الحزم من الملف ويثبتها بإصداراتها. أنشئ الملف بـ pip freeze > requirements.txt.', '-r reads the package list from the file and installs those versions. Create the file with pip freeze > requirements.txt.', '-r paket listesini dosyadan okuyup o sürümleri kurar. Dosyayı pip freeze > requirements.txt ile oluştur.') }),

  // ───────── Mid ─────────
  output({ ...py, id: 'py-m2-set', level: 'mid',
    code: `print(sorted({3, 1, 3, 2}))`,
    options: ['[1, 2, 3]', '[1, 2, 3, 3]', '{1, 2, 3}', '[3, 1, 2]'], answer: 0,
    why: W('المجموعة (set) تحذف المكرر، وsorted ترجع قائمة مرتبة.', 'A set drops duplicates, and sorted returns a sorted list.', 'Küme (set) tekrarları atar; sorted sıralı bir liste döndürür.') }),
  output({ ...py, id: 'py-m2-dict-comp', level: 'mid',
    code: `print({k: v * 2 for k, v in {"a": 1, "b": 2}.items()})`,
    options: ["{'a': 2, 'b': 4}", "{'a': 1, 'b': 2}", "[2, 4]", "{'aa': 1, 'bb': 2}"], answer: 0,
    why: W('dict comprehension يبني قاموسًا جديدًا بنفس المفاتيح وقيم مضاعفة.', 'A dict comprehension builds a new dict with the same keys and doubled values.', 'Sözlük comprehension aynı anahtarlarla ve iki katına çıkmış değerlerle yeni bir sözlük kurar.') }),
  output({ ...py, id: 'py-m2-args-kwargs', level: 'mid',
    code: `def f(*args, **kwargs):
    print(args, kwargs)

f(1, 2, x=3)`,
    options: ["(1, 2) {'x': 3}", "[1, 2] {'x': 3}", "(1, 2, 3) {}", "1 2 x=3"], answer: 0,
    why: W('*args يجمع المعاملات الموضعية في tuple، و**kwargs يجمع المسمّاة في dict.', '*args collects positional arguments into a tuple, and **kwargs collects named ones into a dict.', '*args konumsal argümanları bir demette, **kwargs isimli olanları bir sözlükte toplar.') }),
  output({ ...py, id: 'py-m2-zip', level: 'mid',
    code: `print(list(zip([1, 2, 3], "ab")))`,
    options: ["[(1, 'a'), (2, 'b')]", "[(1, 'a'), (2, 'b'), (3, None)]", "[1, 'a', 2, 'b']", 'Error'], answer: 0,
    why: W('zip يتوقف عند أقصر مدخل. لإكمال الأطول استخدم itertools.zip_longest، ومنذ 3.10 يمكن zip(..., strict=True) لرمي خطأ عند اختلاف الطول.', 'zip stops at the shortest input. Use itertools.zip_longest to keep going, or zip(..., strict=True) (3.10+) to error on a length mismatch.', 'zip en kısa girdide durur. Devam etmek için itertools.zip_longest, uzunluk farkında hata için zip(..., strict=True) (3.10+) kullan.') }),
  output({ ...py, id: 'py-m2-any-all', level: 'mid',
    code: `print(any([0, "", None]), all([1, "a"]))`,
    options: ['False True', 'True True', 'False False', 'True False'], answer: 0,
    why: W('any تحتاج عنصرًا واحدًا صادقًا على الأقل، وall تحتاج كل العناصر صادقة.', 'any needs at least one truthy item; all needs every item to be truthy.', 'any en az bir doğru öğe ister; all tüm öğelerin doğru olmasını ister.') }),
  output({ ...py, id: 'py-m2-decorator', level: 'mid',
    code: `def shout(fn):
    def wrapper():
        return fn().upper()
    return wrapper

@shout
def hello():
    return "hi"

print(hello())`,
    options: ['HI', 'hi', 'wrapper', 'None'], answer: 0,
    why: W('@shout تعني hello = shout(hello)، فيصبح استدعاء hello استدعاءً لـ wrapper. وفي الكود الحقيقي أضف functools.wraps.', '@shout means hello = shout(hello), so calling hello calls wrapper. In real code add functools.wraps.', '@shout, hello = shout(hello) demektir; hello çağrısı wrapper’ı çağırır. Gerçek kodda functools.wraps ekle.') }),
  output({ ...py, id: 'py-m2-class-attr', level: 'mid',
    code: `class Counter:
    count = 0
    def __init__(self):
        Counter.count += 1

Counter()
Counter()
print(Counter.count)`,
    options: ['2', '1', '0', 'Error'], answer: 0,
    why: W('count خاصية على الصنف نفسه مشتركة بين كل الكائنات، وكل إنشاء يزيدها.', 'count is an attribute on the class itself, shared by every instance, and each creation increments it.', 'count sınıfın kendisinde, tüm örneklerce paylaşılan bir özelliktir; her oluşturma onu artırır.') }),
  output({ ...py, id: 'py-m2-sorted-key', level: 'mid',
    code: `users = [("Sara", 30), ("Ali", 25)]
print(sorted(users, key=lambda u: u[1])[0][0])`,
    options: ['Ali', 'Sara', '25', '30'], answer: 0,
    why: W('key يحدد ما نرتب عليه: العمر هنا، فيأتي Ali (25) أولًا.', 'key decides what to sort on: the age here, so Ali (25) comes first.', 'key neye göre sıralanacağını belirler: burada yaş; Ali (25) önce gelir.') }),
  output({ ...py, id: 'py-m2-finally', level: 'mid',
    code: `def f():
    try:
        return "try"
    finally:
        print("finally")

print(f())`,
    options: ['finally, try', 'try, finally', 'try', 'finally'], answer: 0,
    why: W('finally يعمل دائمًا قبل خروج الدالة، حتى مع return، ثم تُطبع القيمة المرجعة.', 'finally always runs before the function leaves, even after return, and then the returned value is printed.', 'finally, return olsa bile fonksiyon çıkmadan önce her zaman çalışır; sonra dönen değer yazdırılır.') }),
  choice({ id: 'py-m2-with', level: 'mid', topic,
    prompt: W('ما فائدة with هنا؟', 'What does with do here?', 'Burada with ne işe yarar?'),
    code: `with open("data.txt") as f:
    data = f.read()`, codeLang: 'py',
    options: L3(['يغلق الملف تلقائيًا عند الخروج من الكتلة، حتى عند حدوث خطأ', 'يقرأ الملف بسرعة أكبر', 'يفتح الملف للكتابة', 'يقفل الملف عن البرامج الأخرى'], ['It closes the file when the block ends, even on an error', 'It reads faster', 'It opens the file for writing', 'It locks the file from other programs'], ['Blok bitince, hata olsa bile dosyayı otomatik kapatır', 'Daha hızlı okur', 'Dosyayı yazmak için açar', 'Dosyayı diğer programlara kilitler']), answer: 0,
    why: W('with يستخدم context manager (__enter__ و__exit__)، وهو نفس النمط مع اتصالات قاعدة البيانات والأقفال.', 'with uses a context manager (__enter__ and __exit__), the same pattern used for database connections and locks.', 'with bir bağlam yöneticisi (__enter__ ve __exit__) kullanır; veritabanı bağlantıları ve kilitler için de aynı kalıp.') }),
  choice({ id: 'py-m2-django-migrations', level: 'mid', topic,
    prompt: W('أضفت حقلًا جديدًا إلى موديل Django. ما الخطوتان لتحديث قاعدة البيانات؟', 'You added a field to a Django model. What are the two steps to update the database?', 'Bir Django modeline alan ekledin. Veritabanını güncellemenin iki adımı nedir?'),
    options: {

      ar: ['makemigrations ثم migrate', 'migrate ثم makemigrations', 'runserver فقط', 'collectstatic ثم migrate'],

      en: ['makemigrations, then migrate', 'migrate, then makemigrations', 'just runserver', 'collectstatic, then migrate'],

      tr: ['önce makemigrations, sonra migrate', 'önce migrate, sonra makemigrations', 'sadece runserver', 'önce collectstatic, sonra migrate'],

    }, answer: 0,
    why: W('makemigrations يكتب ملف migration يصف التغيير ويُرفع مع الكود، وmigrate ينفذه على قاعدة البيانات.', 'makemigrations writes a migration file describing the change (commit it), and migrate applies it to the database.', 'makemigrations değişikliği anlatan bir migration dosyası yazar (commit edilir); migrate onu veritabanına uygular.') }),
  choice({ id: 'py-m2-depends', level: 'mid', topic,
    prompt: W('ما وظيفة Depends(get_db) في FastAPI؟', 'What does Depends(get_db) do in FastAPI?', 'FastAPI’de Depends(get_db) ne yapar?'),
    code: `@app.get("/users/{id}")
def read(id: int, db: Session = Depends(get_db)):
    return db.get(User, id)`, codeLang: 'py',
    options: L3(['يحقن جلسة قاعدة بيانات لكل طلب ويغلقها بعده', 'يجعل المسار للمدراء فقط', 'يخزّن النتيجة في الكاش', 'يتحقق من id'], ['Injects a database session per request and closes it afterwards', 'Makes the route admin-only', 'Caches the result', 'Validates the id'], ['Her istek için bir veritabanı oturumu enjekte eder ve sonra kapatır', 'Rotayı sadece yöneticilere açar', 'Sonucu önbelleğe alır', 'id’yi doğrular']), answer: 0,
    why: W('get_db عادةً generator فيه yield: ما قبل yield يفتح الجلسة وما بعده يغلقها. ويسهل استبداله بجلسة وهمية في الاختبارات.', 'get_db is usually a generator with yield: before yield opens the session, after it closes it. It is easy to swap for a fake in tests.', 'get_db genelde yield içeren bir generator’dır: yield’den önce oturumu açar, sonra kapatır. Testlerde sahtesiyle değiştirmek kolaydır.') }),
  choice({ id: 'py-m2-settings', level: 'mid', topic,
    prompt: W('ما الطريقة الأنظف لقراءة إعدادات مثل DATABASE_URL في تطبيق Python؟', 'What is the cleanest way to read settings like DATABASE_URL in a Python app?', 'Bir Python uygulamasında DATABASE_URL gibi ayarları okumanın en temiz yolu nedir?'),
    options: L3(['من متغيرات البيئة، مثلًا عبر pydantic-settings مع تحقق من الأنواع', 'كتابتها داخل الكود', 'في ملف .py يُرفع إلى Git', 'من قاعدة البيانات نفسها'], ['From environment variables, e.g. with pydantic-settings and type checks', 'Hard-coded in the code', 'In a .py file committed to Git', 'From the database itself'], ['Ortam değişkenlerinden, ör. tip kontrollü pydantic-settings ile', 'Koda sabit yazmak', 'Git’e gönderilen bir .py dosyasında', 'Veritabanının kendisinden']), answer: 0,
    why: W('pydantic-settings يقرأ البيئة (و.env محليًا) ويتحقق أن القيم موجودة ومن النوع الصحيح عند بدء التشغيل.', 'pydantic-settings reads the environment (and .env locally) and checks values exist and have the right types at startup.', 'pydantic-settings ortamı (yerelde .env’i) okur ve başlangıçta değerlerin var ve doğru tipte olduğunu kontrol eder.') }),

  // ───────── Senior ─────────
  output({ ...py, id: 'py-s2-mro', level: 'senior',
    code: `class A:
    def who(self): return "A"
class B(A):
    def who(self): return "B" + super().who()
class C(A):
    def who(self): return "C" + super().who()
class D(B, C):
    pass

print(D().who())`,
    options: ['BCA', 'BA', 'BACA', 'CBA'], answer: 0,
    why: W('super() يتبع ترتيب MRO للصنف D: D ثم B ثم C ثم A، فـ super داخل B يستدعي C لا A.', 'super() follows D’s MRO: D, B, C, A, so super() inside B calls C, not A.', 'super() D’nin MRO sırasını izler: D, B, C, A; bu yüzden B içindeki super() A’yı değil C’yi çağırır.') }),
  output({ ...py, id: 'py-s2-dataclass', level: 'senior',
    code: `from dataclasses import dataclass

@dataclass
class P:
    x: int
    y: int

print(P(1, 2) == P(1, 2), P(1, 2))`,
    options: ['True P(x=1, y=2)', 'False P(x=1, y=2)', 'True <P object>', 'False <P object>'], answer: 0,
    why: W('dataclass يولّد __init__ و__repr__ و__eq__ تلقائيًا، فتُقارن الكائنات حسب الحقول.', 'dataclass generates __init__, __repr__ and __eq__ for you, so instances compare by their fields.', 'dataclass __init__, __repr__ ve __eq__’i otomatik üretir; örnekler alanlarına göre karşılaştırılır.') }),
  output({ ...py, id: 'py-s2-nonlocal', level: 'senior',
    code: `def counter():
    n = 0
    def inc():
        nonlocal n
        n += 1
        return n
    return inc

c = counter()
c()
c()
print(c())`,
    options: ['3', '1', '0', 'UnboundLocalError'], answer: 0,
    why: W('nonlocal يسمح للدالة الداخلية بتعديل n في الدالة الخارجية، وn تبقى حية في الـ closure بين الاستدعاءات.', 'nonlocal lets the inner function change n in the outer one, and n stays alive in the closure between calls.', 'nonlocal iç fonksiyonun dıştaki n’i değiştirmesine izin verir; n çağrılar arasında closure’da yaşamaya devam eder.') }),
  output({ ...py, id: 'py-s2-create-task', level: 'senior',
    code: `import asyncio

async def job(n):
    await asyncio.sleep(0.01 * n)
    return n

async def main():
    t = asyncio.create_task(job(2))
    print("started")
    print(await t)

asyncio.run(main())`,
    options: ['started, 2', '2, started', 'started', '2'], answer: 0,
    why: W('create_task يجدول المهمة دون انتظارها، فيكمل الكود ويطبع started، ثم await يرجع النتيجة عند انتهائها.', 'create_task schedules the job without waiting, so the code carries on and prints started; await then returns the result.', 'create_task işi beklemeden planlar; kod devam edip started yazar, sonra await sonucu döndürür.') }),
  output({ ...py, id: 'py-s2-tuple-mutable', level: 'senior',
    code: `t = ([1], 2)
t[0].append(3)
print(t)`,
    options: ['([1, 3], 2)', '([1], 2)', 'TypeError', '([1], 2, 3)'], answer: 0,
    why: W('الـ tuple لا يتغير في عدد عناصره ومراجعها، لكن القائمة داخله قابلة للتعديل. لهذا لا يصلح هذا الـ tuple كمفتاح قاموس.', 'A tuple’s slots cannot change, but the list inside it can. That is why this tuple cannot be a dict key.', 'Demetin öğeleri değişemez ama içindeki liste değişebilir. Bu yüzden bu demet sözlük anahtarı olamaz.') }),
  output({ ...py, id: 'py-s2-decimal', level: 'senior',
    code: `from decimal import Decimal

print(0.1 + 0.2 == 0.3, Decimal("0.1") + Decimal("0.2") == Decimal("0.3"))`,
    options: ['False True', 'True True', 'False False', 'True False'], answer: 0,
    why: W('float تقريبي، وDecimal دقيق للحسابات العشرية مثل المال. أنشئ Decimal من نص لا من float.', 'float is approximate; Decimal is exact for decimal math like money. Build Decimal from a string, not a float.', 'float yaklaşıktır; Decimal para gibi ondalık hesaplar için kesindir. Decimal’i float’tan değil metinden oluştur.') }),
  output({ ...py, id: 'py-s2-deepcopy', level: 'senior',
    code: `import copy

a = {"tags": ["x"]}
b = copy.deepcopy(a)
b["tags"].append("y")
print(a["tags"])`,
    options: ["['x']", "['x', 'y']", "['y']", '[]'], answer: 0,
    why: W('deepcopy ينسخ كل المستويات، فالقائمة داخل b منفصلة تمامًا عن قائمة a.', 'deepcopy copies every level, so the list inside b is fully separate from a’s.', 'deepcopy her seviyeyi kopyalar; b’deki liste a’dakinden tamamen ayrıdır.') }),
  output({ ...py, id: 'py-s2-defaultdict', level: 'senior',
    code: `from collections import defaultdict

counts = defaultdict(int)
for w in "a b a".split():
    counts[w] += 1
print(dict(counts))`,
    options: ["{'a': 2, 'b': 1}", "{'a': 1, 'b': 1}", 'KeyError', "{'a b a': 1}"], answer: 0,
    why: W('defaultdict(int) ينشئ القيمة 0 للمفتاح الجديد تلقائيًا. وCounter من collections يقوم بالمهمة نفسها مباشرة.', 'defaultdict(int) creates 0 for a new key automatically. collections.Counter does this job directly.', 'defaultdict(int) yeni anahtar için otomatik 0 oluşturur. collections.Counter bu işi doğrudan yapar.') }),
  choice({ id: 'py-s2-generator-memory', level: 'senior', topic,
    prompt: W('أيهما يستهلك ذاكرة أقل بكثير؟', 'Which one uses far less memory?', 'Hangisi çok daha az bellek kullanır?'),
    options: {

      ar: ['sum(x * x for x in range(10**7))', 'sum([x * x for x in range(10**7)])', 'sum(list(map(lambda x: x * x, range(10**7))))', 'لا فرق'],

      en: ['sum(x * x for x in range(10**7))', 'sum([x * x for x in range(10**7)])', 'sum(list(map(lambda x: x * x, range(10**7))))', 'No difference'],

      tr: ['sum(x * x for x in range(10**7))', 'sum([x * x for x in range(10**7)])', 'sum(list(map(lambda x: x * x, range(10**7))))', 'Fark yok'],

    }, answer: 0, codeLang: 'py',
    why: W('الأقواس العادية تنشئ generator ينتج القيم واحدة واحدة، أما [] فتبني قائمة من 10 ملايين عنصر في الذاكرة أولًا.', 'Parentheses make a generator that yields values one at a time; [] builds a 10-million-item list in memory first.', 'Normal parantez değerleri tek tek üreten bir generator oluşturur; [] önce bellekte 10 milyon öğelik bir liste kurar.') }),
  choice({ id: 'py-s2-celery', level: 'senior', topic,
    prompt: W('مهمة Celery لخصم رصيد قد تُنفَّذ مرتين عند إعادة المحاولة. ما المطلوب في تصميمها؟', 'A Celery task that charges a balance may run twice on retry. What does its design need?', 'Bakiye düşen bir Celery görevi yeniden denemede iki kez çalışabilir. Tasarımında ne gerekir?'),
    options: L3(['أن تكون idempotent: مفتاح عملية فريد يمنع تكرار الخصم', 'إيقاف إعادة المحاولة نهائيًا', 'تشغيلها بـ time.sleep قبل التنفيذ', 'زيادة عدد الـ workers'], ['Idempotency: a unique operation key that stops a second charge', 'Turning retries off completely', 'A time.sleep before running', 'More workers'], ['Idempotent olmalı: ikinci tahsilatı engelleyen benzersiz bir işlem anahtarı', 'Yeniden denemeyi tamamen kapatmak', 'Çalışmadan önce time.sleep', 'Daha fazla worker']), answer: 0,
    why: W('الطوابير تضمن التسليم مرة على الأقل. خزّن معرّف العملية مع قيد unique، أو تحقق قبل الخصم، فيصبح التكرار بلا أثر.', 'Queues guarantee at-least-once delivery. Store the operation id with a unique constraint, or check before charging, so a repeat has no effect.', 'Kuyruklar en az bir kez teslimi garanti eder. İşlem kimliğini benzersiz kısıtla sakla ya da tahsilattan önce kontrol et; tekrar etkisiz olur.') }),
  choice({ id: 'py-s2-raw-sql', level: 'senior', topic,
    prompt: W('أي استعلام خام آمن في Django؟', 'Which raw query is safe in Django?', 'Django’da hangi ham sorgu güvenlidir?'),
    options: [
      'User.objects.raw("SELECT * FROM auth_user WHERE email = %s", [email])',
      'User.objects.raw(f"SELECT * FROM auth_user WHERE email = \'{email}\'")',
      'User.objects.raw("SELECT * FROM auth_user WHERE email = \'%s\'" % email)',
      'cursor.execute("SELECT * FROM auth_user WHERE email = " + email)',
    ], answer: 0, codeLang: 'py',
    why: W('تمرير القيم كقائمة منفصلة يجعل المكتبة تهرّبها. f-string أو % يدمجان النص داخل SQL فيعود خطر الحقن.', 'Passing values as a separate list lets the driver escape them. An f-string or % glues them into the SQL and brings injection back.', 'Değerleri ayrı bir liste olarak vermek sürücünün onları kaçışlamasını sağlar. f-string veya % onları SQL’e yapıştırır ve enjeksiyon geri gelir.') }),
  choice({ id: 'py-s2-sqlalchemy-session', level: 'senior', topic,
    prompt: W('تطبيق FastAPI يستخدم جلسة SQLAlchemy واحدة عامة لكل الطلبات. ما المشكلة؟', 'A FastAPI app uses one global SQLAlchemy session for all requests. What is the problem?', 'Bir FastAPI uygulaması tüm istekler için tek bir global SQLAlchemy oturumu kullanıyor. Sorun nedir?'),
    options: L3(['الجلسة ليست آمنة للتزامن: طلبات متداخلة تخلط المعاملات والبيانات', 'لا مشكلة، وهذا أسرع', 'SQLAlchemy لا يعمل مع FastAPI', 'المشكلة في الأداء فقط'], ['A session is not safe to share: overlapping requests mix transactions and data', 'No problem, and it is faster', 'SQLAlchemy does not work with FastAPI', 'Only a performance issue'], ['Oturum paylaşılmaya uygun değil: iç içe istekler transaction’ları ve veriyi karıştırır', 'Sorun yok, daha hızlı', 'SQLAlchemy FastAPI ile çalışmaz', 'Sadece performans sorunu']), answer: 0,
    why: W('الجلسة تحمل حالة المعاملة والكائنات المحمّلة. أنشئ جلسة لكل طلب (Depends) من sessionmaker مشترك.', 'A session carries transaction state and loaded objects. Create one per request (Depends) from a shared sessionmaker.', 'Oturum transaction durumunu ve yüklenen nesneleri taşır. Ortak bir sessionmaker’dan istek başına (Depends) bir oturum oluştur.') }),
  choice({ id: 'py-s2-workers', level: 'senior', topic,
    prompt: W('كيف تشغّل تطبيق FastAPI في الإنتاج ليستفيد من عدة أنوية؟', 'How do you run a FastAPI app in production to use several CPU cores?', 'Bir FastAPI uygulamasını canlıda birden çok çekirdeği kullanacak şekilde nasıl çalıştırırsın?'),
    options: L3(['عدة عمليات workers، مثلًا uvicorn --workers 4 أو gunicorn مع UvicornWorker', 'عملية واحدة مع threads كثيرة', 'python main.py فقط', 'تشغيله داخل المتصفح'], ['Several worker processes, e.g. uvicorn --workers 4 or gunicorn with UvicornWorker', 'One process with many threads', 'Just python main.py', 'Run it in the browser'], ['Birkaç worker süreci, ör. uvicorn --workers 4 veya UvicornWorker ile gunicorn', 'Çok thread’li tek süreç', 'Sadece python main.py', 'Tarayıcıda çalıştırmak'], ), answer: 0,
    why: W('بسبب الـ GIL تستخدم العملية الواحدة نواة واحدة لكود Python. عدة عمليات = عدة أنوية، ولكل واحدة event loop خاص.', 'Because of the GIL, one process runs Python code on one core. Several processes means several cores, each with its own event loop.', 'GIL yüzünden tek süreç Python kodunu tek çekirdekte çalıştırır. Birden çok süreç birden çok çekirdek demektir; her birinin kendi event loop’u olur.') }),
  choice({ id: 'py-s2-type-hints', level: 'senior', topic,
    prompt: W('ماذا يحدث عند تشغيل هذا الكود؟', 'What happens when this code runs?', 'Bu kod çalışınca ne olur?'),
    code: `def double(n: int) -> int:
    return n * 2

print(double("ab"))`, codeLang: 'py',
    options: L3(['يطبع abab؛ تلميحات الأنواع لا تُفحص وقت التشغيل', 'TypeError', 'يطبع 0', 'خطأ ترجمة'], ['It prints abab; type hints are not checked at runtime', 'TypeError', 'It prints 0', 'A compile error'], ['abab yazar; tip ipuçları çalışma anında kontrol edilmez', 'TypeError', '0 yazar', 'Derleme hatası']), answer: 0,
    why: W('التلميحات للأدوات مثل mypy والمحررات. للتحقق وقت التشغيل استخدم مكتبة مثل Pydantic.', 'Hints are for tools like mypy and editors. For runtime checks, use a library like Pydantic.', 'İpuçları mypy ve editörler gibi araçlar içindir. Çalışma anı kontrolü için Pydantic gibi bir kütüphane kullan.') }),
]
