import type { Question } from '#shared/types/quiz'
import { choice, output } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const P = W('ماذا يطبع هذا الكود؟', 'What does this code print?', 'Bu kod ne yazdırır?')
const topic = 'dotnet' as const
const cs = { codeLang: 'cs' as const, prompt: P, topic }

export const DOTNET_2: Question[] = [
  // ───────── Junior ─────────
  output({ ...cs, id: 'cs-j2-int-div', level: 'junior',
    code: `int a = 7, b = 2;
Console.WriteLine(a / b);
Console.WriteLine(a / 2.0);`,
    options: ['3, 3.5', '3.5, 3.5', '3, 3', '4, 3.5'], answer: 0,
    why: W('قسمة عددين صحيحين تعطي عددًا صحيحًا وتحذف الكسر. إذا كان أحد الطرفين double يصبح الناتج عشريًا.', 'Dividing two ints gives an int and drops the fraction. If either side is a double, the result is a decimal number.', 'İki int’i bölmek int verir ve kesri atar. Taraflardan biri double ise sonuç ondalıklı olur.') }),
  output({ ...cs, id: 'cs-j2-string-immutable', level: 'junior',
    code: `string s = "hello";
s.ToUpper();
Console.WriteLine(s);`,
    options: ['hello', 'HELLO', 'Hello', 'Error'], answer: 0,
    why: W('النصوص في C# غير قابلة للتعديل؛ ToUpper ترجع نصًا جديدًا. اكتب s = s.ToUpper().', 'Strings in C# are immutable; ToUpper returns a new string. Write s = s.ToUpper().', 'C#’ta metinler değiştirilemez; ToUpper yeni bir metin döndürür. s = s.ToUpper() yaz.') }),
  output({ ...cs, id: 'cs-j2-foreach-list', level: 'junior',
    code: `var names = new List<string> { "Ali", "Sara" };
names.Add("Omar");
Console.WriteLine(names.Count);
Console.WriteLine(names[2]);`,
    options: ['3, Omar', '2, Sara', '3, Sara', '2, Omar'], answer: 0,
    why: W('List يكبر تلقائيًا مع Add، والفهرس يبدأ من 0 فـ [2] هو العنصر الثالث.', 'A List grows with Add, and indexes start at 0, so [2] is the third item.', 'List, Add ile büyür; indeksler 0’dan başlar, [2] üçüncü öğedir.') }),
  output({ ...cs, id: 'cs-j2-dictionary', level: 'junior',
    code: `var stock = new Dictionary<string, int> { ["apple"] = 3 };
Console.WriteLine(stock.TryGetValue("pear", out var n));
Console.WriteLine(n);`,
    options: ['False, 0', 'True, 3', 'False, null', 'KeyNotFoundException'], answer: 0,
    why: W('TryGetValue لا يرمي استثناء، ويرجع false ويضع القيمة الافتراضية 0. أما stock["pear"] فكانت سترمي KeyNotFoundException.', 'TryGetValue does not throw; it returns false and sets the default 0. stock["pear"] would throw KeyNotFoundException.', 'TryGetValue istisna fırlatmaz; false döndürür ve varsayılan 0’ı atar. stock["pear"] KeyNotFoundException fırlatırdı.') }),
  output({ ...cs, id: 'cs-j2-parse', level: 'junior',
    code: `bool ok = int.TryParse("12a", out int x);
Console.WriteLine($"{ok} {x}");`,
    options: ['False 0', 'True 12', 'False 12', 'FormatException'], answer: 0,
    why: W('TryParse آمن لإدخال المستخدم: يرجع false بدل رمي FormatException كما يفعل int.Parse.', 'TryParse is safe for user input: it returns false instead of throwing FormatException like int.Parse.', 'TryParse kullanıcı girdisi için güvenlidir: int.Parse gibi FormatException fırlatmak yerine false döndürür.') }),
  output({ ...cs, id: 'cs-j2-ternary', level: 'junior',
    code: `int age = 17;
string label = age >= 18 ? "adult" : "minor";
Console.WriteLine(label);`,
    options: ['minor', 'adult', 'True', '17'], answer: 0,
    why: W('المعامل الثلاثي: الشرط ? قيمة عند الصحة : قيمة عند الخطأ.', 'The ternary operator: condition ? value-if-true : value-if-false.', 'Üçlü operatör: koşul ? doğruysa değer : yanlışsa değer.') }),
  output({ ...cs, id: 'cs-j2-class-default', level: 'junior',
    code: `var u = new User();
Console.WriteLine(u.Name ?? "none");
Console.WriteLine(u.Age);

class User {
    public string? Name { get; set; }
    public int Age { get; set; }
}`,
    options: ['none, 0', 'null, 0', 'none, null', ', 0'], answer: 0,
    why: W('الخصائص تأخذ القيمة الافتراضية: null للنصوص و0 للأرقام. و?? تعطي بديلًا عند null.', 'Properties start at their defaults: null for strings, 0 for numbers. ?? gives a fallback for null.', 'Özellikler varsayılanla başlar: metin için null, sayı için 0. ?? null için yedek değer verir.') }),
  output({ ...cs, id: 'cs-j2-linq-where', level: 'junior',
    code: `var nums = new[] { 1, 2, 3, 4, 5 };
var even = nums.Where(n => n % 2 == 0).ToList();
Console.WriteLine(string.Join(",", even));`,
    options: ['2,4', '1,3,5', '2', '1,2,3,4,5'], answer: 0,
    why: W('Where يُبقي العناصر التي تحقق الشرط، وstring.Join يجمعها بفاصل.', 'Where keeps items matching the condition, and string.Join joins them with a separator.', 'Where koşula uyan öğeleri tutar; string.Join onları ayraçla birleştirir.') }),
  choice({ id: 'cs-j2-dotnet-new', level: 'junior', topic,
    prompt: W('أي أمر ينشئ مشروع Web API جديدًا؟', 'Which command creates a new Web API project?', 'Hangi komut yeni bir Web API projesi oluşturur?'),
    options: ['dotnet new webapi -n Shop.Api', 'dotnet run webapi', 'dotnet add webapi', 'nuget new webapi'], answer: 0, codeLang: 'bash',
    why: W('dotnet new ينشئ مشروعًا من قالب. dotnet run يشغّل مشروعًا موجودًا، وdotnet add package يضيف حزمة.', 'dotnet new creates a project from a template. dotnet run runs an existing one, and dotnet add package adds a package.', 'dotnet new şablondan proje oluşturur. dotnet run mevcut projeyi çalıştırır, dotnet add package paket ekler.') }),
  choice({ id: 'cs-j2-appsettings', level: 'junior', topic,
    prompt: W('أين توضع سلسلة الاتصال بقاعدة البيانات عادةً في ASP.NET Core؟', 'Where does the database connection string usually go in ASP.NET Core?', 'ASP.NET Core’da veritabanı bağlantı dizesi genelde nereye konur?'),
    options: L3(['في appsettings.json تحت ConnectionStrings، وفي الإنتاج من متغيرات البيئة أو خزنة أسرار', 'داخل كل Controller', 'في Program.cs كنص ثابت', 'في ملف wwwroot'], ['In appsettings.json under ConnectionStrings, and from env vars or a secret store in production', 'Inside each controller', 'Hard-coded in Program.cs', 'In a wwwroot file'], ['appsettings.json’da ConnectionStrings altında; canlıda ortam değişkenleri veya gizli kasadan', 'Her controller’ın içinde', 'Program.cs’te sabit metin olarak', 'Bir wwwroot dosyasında']), answer: 0,
    why: W('تُقرأ بـ builder.Configuration.GetConnectionString("Default"). محليًا استخدم dotnet user-secrets لكلمات المرور.', 'Read it with builder.Configuration.GetConnectionString("Default"). Locally, keep passwords in dotnet user-secrets.', 'builder.Configuration.GetConnectionString("Default") ile okunur. Yerelde şifreleri dotnet user-secrets’ta tut.') }),
  choice({ id: 'cs-j2-minimal-api', level: 'junior', topic,
    prompt: W('ماذا يفعل هذا السطر في Program.cs؟', 'What does this line do in Program.cs?', 'Program.cs’teki bu satır ne yapar?'),
    code: `app.MapGet("/health", () => Results.Ok("up"));`, codeLang: 'cs',
    options: L3(['يضيف مسار GET يرجع 200 مع "up"', 'يضيف middleware لكل الطلبات', 'يفحص صحة قاعدة البيانات', 'ينشئ Controller جديدًا'], ['Adds a GET route that returns 200 with "up"', 'Adds middleware for every request', 'Checks database health', 'Creates a new controller'], ['"up" ile 200 döndüren bir GET rotası ekler', 'Her istek için middleware ekler', 'Veritabanı sağlığını kontrol eder', 'Yeni bir controller oluşturur']), answer: 0,
    why: W('هذه Minimal API: مسار ومعالج في سطر واحد بدون Controller، مناسبة للخدمات الصغيرة.', 'This is a Minimal API: a route and handler in one line with no controller, good for small services.', 'Bu bir Minimal API’dir: controller olmadan tek satırda rota ve işleyici, küçük servisler için uygun.') }),
  choice({ id: 'cs-j2-ef-add', level: 'junior', topic,
    prompt: W('أضفت منتجًا بـ db.Products.Add(p) لكنه لم يظهر في قاعدة البيانات. ما الناقص؟', 'You added a product with db.Products.Add(p) but it is not in the database. What is missing?', 'db.Products.Add(p) ile ürün ekledin ama veritabanında yok. Eksik olan ne?'),
    options: ['await db.SaveChangesAsync()', 'db.Products.Commit()', 'db.Dispose()', 'p.Save()'], answer: 0, codeLang: 'cs',
    why: W('Add يسجّل التغيير في الذاكرة فقط، وSaveChanges يرسل كل التغييرات إلى قاعدة البيانات في معاملة واحدة.', 'Add only tracks the change in memory; SaveChanges sends all changes to the database in one transaction.', 'Add değişikliği sadece bellekte izler; SaveChanges tüm değişiklikleri tek transaction’da veritabanına gönderir.') }),
  choice({ id: 'cs-j2-model-validation', level: 'junior', topic,
    prompt: W('ماذا تضيف [Required] فوق خاصية في نموذج الطلب داخل [ApiController]؟', 'What does [Required] on a request model property do inside an [ApiController]?', '[ApiController] içinde istek modelindeki bir özelliğe [Required] ne yapar?'),
    options: L3(['يرجع ASP.NET Core خطأ 400 تلقائيًا إذا كانت القيمة مفقودة', 'يجعل العمود NOT NULL فقط', 'يشفّر القيمة', 'لا شيء بدون كود إضافي'], ['ASP.NET Core returns a 400 automatically if the value is missing', 'It only makes the column NOT NULL', 'It encrypts the value', 'Nothing without extra code'], ['Değer eksikse ASP.NET Core otomatik 400 döndürür', 'Sadece sütunu NOT NULL yapar', 'Değeri şifreler', 'Ek kod olmadan hiçbir şey']), answer: 0,
    why: W('[ApiController] يفحص ModelState قبل تنفيذ الدالة ويرجع ValidationProblem مع تفاصيل الحقول.', '[ApiController] checks ModelState before your action runs and returns a ValidationProblem with field details.', '[ApiController] metot çalışmadan önce ModelState’i kontrol eder ve alan ayrıntılarıyla ValidationProblem döndürür.') }),

  // ───────── Mid ─────────
  output({ ...cs, id: 'cs-m2-record-eq', level: 'mid',
    code: `var a = new Point(1, 2);
var b = new Point(1, 2);
Console.WriteLine(a == b);
Console.WriteLine(a with { Y = 5 });

record Point(int X, int Y);`,
    options: ['True, Point { X = 1, Y = 5 }', 'False, Point { X = 1, Y = 5 }', 'True, Point { X = 1, Y = 2 }', 'False, Point'], answer: 0,
    why: W('record يقارن بالقيم لا بالمرجع، وwith ينشئ نسخة جديدة مع تغيير خاصية. مناسب للـ DTOs.', 'A record compares by value, not reference, and with makes a new copy with one property changed. Great for DTOs.', 'record referansla değil değerle karşılaştırır; with bir özelliği değiştirilmiş yeni kopya oluşturur. DTO’lar için ideal.') }),
  output({ ...cs, id: 'cs-m2-class-ref', level: 'mid',
    code: `var a = new Box { N = 1 };
var b = a;
b.N = 2;
Console.WriteLine(a.N);

class Box { public int N; }`,
    options: ['2', '1', '0', 'Error'], answer: 0,
    why: W('class نوع مرجعي: a وb يشيران لنفس الكائن. لو كان struct لنُسخت القيمة.', 'A class is a reference type: a and b point to the same object. A struct would have been copied.', 'class bir referans tipidir: a ve b aynı nesneyi gösterir. struct olsaydı kopyalanırdı.') }),
  output({ ...cs, id: 'cs-m2-linq-groupby', level: 'mid',
    code: `var orders = new[] { ("ali", 10), ("sara", 5), ("ali", 7) };
var totals = orders
    .GroupBy(o => o.Item1)
    .Select(g => $"{g.Key}:{g.Sum(o => o.Item2)}");
Console.WriteLine(string.Join(" ", totals));`,
    options: ['ali:17 sara:5', 'ali:10 sara:5 ali:7', 'sara:5 ali:17', 'ali:2 sara:1'], answer: 0,
    why: W('GroupBy يجمع الطلبات حسب المستخدم بترتيب أول ظهور، وSum يجمع المبالغ داخل كل مجموعة.', 'GroupBy groups orders by user in first-seen order, and Sum adds the amounts in each group.', 'GroupBy siparişleri ilk görülme sırasına göre kullanıcıya göre gruplar; Sum her gruptaki tutarları toplar.') }),
  output({ ...cs, id: 'cs-m2-first-or-default', level: 'mid',
    code: `var ids = new List<int> { 4, 8 };
Console.WriteLine(ids.FirstOrDefault(i => i > 10));
try { ids.First(i => i > 10); }
catch (InvalidOperationException) { Console.WriteLine("none"); }`,
    options: ['0, none', 'null, none', '0, 0', 'none, none'], answer: 0,
    why: W('FirstOrDefault ترجع القيمة الافتراضية (0 لـ int) عند عدم وجود نتيجة، وFirst ترمي InvalidOperationException.', 'FirstOrDefault returns the default (0 for int) when nothing matches; First throws InvalidOperationException.', 'FirstOrDefault eşleşme yoksa varsayılanı (int için 0) döndürür; First InvalidOperationException fırlatır.') }),
  output({ ...cs, id: 'cs-m2-pattern', level: 'mid',
    code: `object v = 42;
string kind = v switch {
    int n when n > 100 => "big",
    int => "int",
    string => "text",
    _ => "other",
};
Console.WriteLine(kind);`,
    options: ['int', 'big', 'other', 'text'], answer: 0,
    why: W('switch expression يختبر الحالات بالترتيب؛ 42 عدد صحيح لكنه لا يحقق شرط when، فتطابق الحالة التالية.', 'A switch expression checks cases in order; 42 is an int but fails the when guard, so the next case matches.', 'Switch ifadesi durumları sırayla dener; 42 int’tir ama when koşulunu geçemez, sonraki durum eşleşir.') }),
  output({ ...cs, id: 'cs-m2-async-order', level: 'mid',
    code: `async Task<int> LoadAsync() {
    await Task.Delay(10);
    Console.WriteLine("loaded");
    return 1;
}
var t = LoadAsync();
Console.WriteLine("started");
Console.WriteLine(await t);`,
    options: ['started, loaded, 1', 'loaded, started, 1', 'started, 1, loaded', 'loaded, 1, started'], answer: 0,
    why: W('استدعاء الدالة يبدأها حتى أول await ثم يرجع Task فورًا، فيُطبع started قبل انتهاء التحميل.', 'Calling the method runs it up to the first await and returns a Task right away, so started prints before the load ends.', 'Metodu çağırmak onu ilk await’e kadar çalıştırır ve hemen bir Task döndürür; started yükleme bitmeden yazılır.') }),
  output({ ...cs, id: 'cs-m2-stringbuilder', level: 'mid',
    code: `using System.Text;

var sb = new StringBuilder();
for (int i = 0; i < 3; i++) sb.Append(i).Append(';');
Console.WriteLine(sb.ToString());`,
    options: ['0;1;2;', '0;1;2', '012', '1;2;3;'], answer: 0,
    why: W('StringBuilder يبني النص في مخزن واحد، بدل إنشاء نص جديد مع كل += داخل الحلقة.', 'StringBuilder builds text in one buffer instead of making a new string on every += in a loop.', 'StringBuilder metni tek bir tamponda kurar; döngüde her += ile yeni metin oluşturmaz.') }),
  output({ ...cs, id: 'cs-m2-null-conditional', level: 'mid',
    code: `Customer? c = null;
Console.WriteLine(c?.Address?.City ?? "unknown");
Console.WriteLine(c?.Orders.Count ?? 0);

class Customer {
    public Address? Address { get; set; }
    public List<int> Orders { get; } = new();
}
class Address { public string City { get; set; } = ""; }`,
    options: ['unknown, 0', 'null, 0', 'NullReferenceException', 'unknown, null'], answer: 0,
    why: W('?. يوقف السلسلة ويرجع null بدل NullReferenceException، و?? يعطي قيمة بديلة.', '?. stops the chain and returns null instead of a NullReferenceException, and ?? supplies a fallback.', '?. zinciri durdurur ve NullReferenceException yerine null döndürür; ?? yedek değer verir.') }),
  choice({ id: 'cs-m2-di-register', level: 'mid', topic,
    prompt: W('كيف تسجّل خدمة EmailSender لتُحقن في الـ Controllers بحيث تُنشأ نسخة جديدة لكل طلب؟', 'How do you register EmailSender so controllers get it injected, with a new instance per request?', 'EmailSender’ı controller’lara enjekte edilecek ve her istek için yeni örnek oluşturulacak şekilde nasıl kaydedersin?'),
    options: {

      ar: ['builder.Services.AddScoped<IEmailSender, EmailSender>();', 'builder.Services.AddSingleton<EmailSender>(new());', 'new EmailSender() داخل كل Controller', 'app.Use<EmailSender>();'],

      en: ['builder.Services.AddScoped<IEmailSender, EmailSender>();', 'builder.Services.AddSingleton<EmailSender>(new());', 'new EmailSender() in each controller', 'app.Use<EmailSender>();'],

      tr: ['builder.Services.AddScoped<IEmailSender, EmailSender>();', 'builder.Services.AddSingleton<EmailSender>(new());', 'Her controller’da new EmailSender()', 'app.Use<EmailSender>();'],

    }, answer: 0, codeLang: 'cs',
    why: W('Scoped = نسخة لكل طلب، Transient = نسخة لكل حقن، Singleton = نسخة واحدة للتطبيق. والتسجيل عبر الواجهة يسهّل الاختبار.', 'Scoped = one per request, Transient = one per injection, Singleton = one for the app. Registering by interface makes testing easier.', 'Scoped = istek başına bir, Transient = enjeksiyon başına bir, Singleton = uygulama için bir. Arayüzle kayıt test etmeyi kolaylaştırır.') }),
  choice({ id: 'cs-m2-ef-n-plus-one', level: 'mid', topic,
    prompt: W('هذا الكود ينفذ 101 استعلامًا لـ 100 طلب. ما الإصلاح؟', 'This code runs 101 queries for 100 orders. What is the fix?', 'Bu kod 100 sipariş için 101 sorgu çalıştırıyor. Düzeltme nedir?'),
    code: `var orders = await db.Orders.ToListAsync();
foreach (var o in orders)
    Console.WriteLine(o.Customer.Name); // lazy loading`, codeLang: 'cs',
    options: ['db.Orders.Include(o => o.Customer)', 'db.Orders.AsNoTracking()', 'orders.Distinct()', 'db.SaveChanges()'], answer: 0,
    why: W('Include يجلب العملاء مع الطلبات في استعلام واحد (JOIN). أو استخدم Select لجلب الحقول المطلوبة فقط.', 'Include loads customers with the orders in one query (a JOIN). Or project with Select to fetch only the fields you need.', 'Include müşterileri siparişlerle tek sorguda (JOIN) yükler. Ya da yalnızca gereken alanları Select ile çek.') }),
  choice({ id: 'cs-m2-ef-migration', level: 'mid', topic,
    prompt: W('غيّرت كلاس Entity وأضفت خاصية. ما الأمران لتحديث قاعدة البيانات؟', 'You changed an entity class by adding a property. Which two commands update the database?', 'Bir entity sınıfına özellik ekledin. Veritabanını hangi iki komut günceller?'),
    options: {

      ar: ['dotnet ef migrations add AddPhone ثم dotnet ef database update', 'dotnet build ثم dotnet run', 'dotnet ef database drop فقط', 'dotnet restore ثم dotnet test'],

      en: ['dotnet ef migrations add AddPhone, then dotnet ef database update', 'dotnet build, then dotnet run', 'just dotnet ef database drop', 'dotnet restore, then dotnet test'],

      tr: ['önce dotnet ef migrations add AddPhone, sonra dotnet ef database update', 'önce dotnet build, sonra dotnet run', 'sadece dotnet ef database drop', 'önce dotnet restore, sonra dotnet test'],

    }, answer: 0, codeLang: 'bash',
    why: W('الأول يولّد ملف migration يصف التغيير (ويُرفع مع الكود)، والثاني ينفذه. في الإنتاج يُفضّل توليد سكربت SQL ومراجعته.', 'The first generates a migration file describing the change (commit it); the second applies it. In production, prefer generating and reviewing a SQL script.', 'İlki değişikliği anlatan bir migration dosyası üretir (commit edilir); ikincisi uygular. Canlıda bir SQL betiği üretip incelemek daha iyidir.') }),
  choice({ id: 'cs-m2-middleware-order', level: 'mid', topic,
    prompt: W('ما الترتيب الصحيح لهذه الـ middleware في Program.cs؟', 'What is the right order for these middlewares in Program.cs?', 'Program.cs’te bu middleware’lerin doğru sırası nedir?'),
    options: ['UseRouting → UseAuthentication → UseAuthorization → MapControllers', 'UseAuthorization → UseAuthentication → UseRouting → MapControllers', 'MapControllers → UseAuthentication → UseAuthorization', 'UseAuthorization → MapControllers → UseAuthentication'], answer: 0, codeLang: 'cs',
    why: W('الطلب يمر بالترتيب: يجب معرفة المستخدم (Authentication) قبل فحص صلاحياته (Authorization)، وكلاهما قبل تنفيذ المسار.', 'Requests flow in order: you must know who the user is (authentication) before checking what they may do (authorization), both before the endpoint runs.', 'İstekler sırayla akar: kullanıcının kim olduğunu bilmek (authentication) ne yapabileceğini kontrol etmekten (authorization) önce gelir; ikisi de endpoint’ten önce.') }),
  choice({ id: 'cs-m2-options', level: 'mid', topic,
    prompt: W('ما الطريقة المنظمة لقراءة قسم "Smtp" من الإعدادات داخل خدمة؟', 'What is the structured way to read the "Smtp" settings section inside a service?', 'Bir servis içinde ayarlardaki "Smtp" bölümünü okumanın düzenli yolu nedir?'),
    options: {

      ar: ["Options pattern: Configure<SmtpOptions>(config.GetSection(\"Smtp\")) ثم حقن IOptions<SmtpOptions>", "قراءة appsettings.json بـ File.ReadAllText", "Environment.GetEnvironmentVariable في كل مكان", "متغير static عام"],

      en: ["Options pattern: Configure<SmtpOptions>(config.GetSection(\"Smtp\")), then inject IOptions<SmtpOptions>", "Reading appsettings.json with File.ReadAllText", "Environment.GetEnvironmentVariable everywhere", "A global static variable"],

      tr: ["Options pattern: Configure<SmtpOptions>(config.GetSection(\"Smtp\")), ardından IOptions<SmtpOptions> enjekte etmek", "appsettings.json’ı File.ReadAllText ile okumak", "Her yerde Environment.GetEnvironmentVariable", "Global bir static değişken"],

    }, answer: 0,
    why: W('الإعدادات تصبح كلاسًا بأنواع واضحة، ويمكن التحقق منها عند البدء بـ ValidateOnStart.', 'Settings become a typed class, and you can validate them at startup with ValidateOnStart.', 'Ayarlar tipli bir sınıf olur ve başlangıçta ValidateOnStart ile doğrulanabilir.') }),

  // ───────── Senior ─────────
  output({ ...cs, id: 'cs-s2-linq-deferred-mutate', level: 'senior',
    code: `var list = new List<int> { 1, 2, 3 };
var big = list.Where(x => x > 1);
list.Add(10);
Console.WriteLine(big.Count());`,
    options: ['3', '2', '4', 'InvalidOperationException'], answer: 0,
    why: W('Where لا ينفذ إلا عند القراءة، فيرى العنصر 10 المضاف لاحقًا. استخدم ToList() لأخذ لقطة.', 'Where only runs when enumerated, so it sees the 10 added later. Use ToList() to take a snapshot.', 'Where yalnızca okunurken çalışır; sonradan eklenen 10’u görür. Anlık görüntü için ToList() kullan.') }),
  output({ ...cs, id: 'cs-s2-struct-in-list', level: 'senior',
    code: `var pts = new List<P> { new P { X = 1 } };
var p = pts[0];
p.X = 9;
Console.WriteLine(pts[0].X);

struct P { public int X; }`,
    options: ['1', '9', '0', 'Error'], answer: 0,
    why: W('قراءة struct من List ترجع نسخة، فتعديل p لا يغيّر العنصر في القائمة. يجب إعادة الإسناد pts[0] = p.', 'Reading a struct from a List returns a copy, so changing p does not change the list item. Assign it back: pts[0] = p.', 'List’ten struct okumak bir kopya döndürür; p’yi değiştirmek listedeki öğeyi değiştirmez. Geri ata: pts[0] = p.') }),
  output({ ...cs, id: 'cs-s2-finally-return', level: 'senior',
    code: `int F() {
    int x = 1;
    try { return x; }
    finally { x = 2; Console.WriteLine("finally"); }
}
Console.WriteLine(F());`,
    options: ['finally, 1', 'finally, 2', '1, finally', '2'], answer: 0,
    why: W('قيمة return تُحفظ قبل تنفيذ finally، فتغيير x داخل finally لا يغيّر القيمة المرجعة.', 'The return value is captured before finally runs, so changing x in finally does not change what is returned.', 'Dönüş değeri finally çalışmadan önce yakalanır; finally içinde x’i değiştirmek döneni değiştirmez.') }),
  output({ ...cs, id: 'cs-s2-whenall', level: 'senior',
    code: `using System.Diagnostics;

var sw = Stopwatch.StartNew();
await Task.WhenAll(Task.Delay(100), Task.Delay(100), Task.Delay(100));
Console.WriteLine(sw.ElapsedMilliseconds < 250);`,
    options: ['True', 'False', '300', 'Error'], answer: 0,
    why: W('المهام الثلاث تعمل معًا فتنتهي بعد نحو 100ms. لكن لا تشغّل استعلامات متوازية على نفس DbContext لأنه غير آمن للتزامن.', 'The three run together and finish in about 100 ms. But never run parallel queries on one DbContext; it is not thread-safe.', 'Üçü birlikte çalışır ve yaklaşık 100 ms’de biter. Ama tek bir DbContext’te paralel sorgu çalıştırma; thread-safe değildir.') }),
  output({ ...cs, id: 'cs-s2-closure-loop', level: 'senior',
    code: `var actions = new List<Func<int>>();
for (int i = 0; i < 3; i++) actions.Add(() => i);
Console.WriteLine(string.Join(",", actions.Select(a => a())));`,
    options: ['3,3,3', '0,1,2', '2,2,2', '0,0,0'], answer: 0,
    why: W('متغير الحلقة for واحد تشترك فيه كل الدوال، وقيمته 3 بعد انتهائها. foreach على عكسها ينشئ متغيرًا جديدًا في كل دورة.', 'The for loop variable is one variable shared by all lambdas, and it is 3 when the loop ends. foreach, by contrast, makes a fresh variable each pass.', 'for döngü değişkeni tüm lambda’ların paylaştığı tek bir değişkendir ve döngü bitince 3’tür. foreach ise her turda yeni bir değişken oluşturur.') }),
  output({ ...cs, id: 'cs-s2-decimal', level: 'senior',
    code: `Console.WriteLine(0.1 + 0.2 == 0.3);
Console.WriteLine(0.1m + 0.2m == 0.3m);`,
    options: ['False, True', 'True, True', 'False, False', 'True, False'], answer: 0,
    why: W('double ثنائي وتقريبي، وdecimal (اللاحقة m) عشري ودقيق، وهو النوع الصحيح للمبالغ المالية.', 'double is binary and approximate; decimal (the m suffix) is base-10 and exact, the right type for money.', 'double ikili ve yaklaşıktır; decimal (m soneki) onluk ve kesindir, para için doğru tiptir.') }),
  output({ ...cs, id: 'cs-s2-checked', level: 'senior',
    code: `int max = int.MaxValue;
Console.WriteLine(max + 1);
try { Console.WriteLine(checked(max + 1)); }
catch (OverflowException) { Console.WriteLine("overflow"); }`,
    options: ['-2147483648, overflow', '2147483648, overflow', 'overflow, overflow', '-2147483648, -2147483648'], answer: 0,
    why: W('افتراضيًا يلتف int بصمت إلى قيمة سالبة. checked يرمي OverflowException، وهو مهم في حسابات الأرصدة والكميات.', 'By default int silently wraps to a negative value. checked throws OverflowException, which matters for balances and quantities.', 'Varsayılan olarak int sessizce negatife sarar. checked OverflowException fırlatır; bakiye ve miktar hesaplarında önemlidir.') }),
  choice({ id: 'cs-s2-configureawait', level: 'senior', topic,
    prompt: W('في ASP.NET Core، هل تحتاج ConfigureAwait(false) في كود التطبيق لتجنب deadlock؟', 'In ASP.NET Core, do you need ConfigureAwait(false) in app code to avoid deadlocks?', 'ASP.NET Core’da deadlock’tan kaçınmak için uygulama kodunda ConfigureAwait(false) gerekir mi?'),
    options: L3(['لا، لا يوجد SynchronizationContext. لكنه مفيد في المكتبات التي قد تعمل في WPF أو WinForms', 'نعم، في كل await', 'نعم، وإلا لن يعمل async', 'لا، لأن async ممنوع في ASP.NET Core'], ['No, there is no SynchronizationContext. It still helps in libraries that may run under WPF or WinForms', 'Yes, on every await', 'Yes, or async will not work', 'No, because async is banned in ASP.NET Core'], ['Hayır, SynchronizationContext yok. Yine de WPF veya WinForms altında çalışabilecek kütüphanelerde faydalıdır', 'Evet, her await’te', 'Evet, yoksa async çalışmaz', 'Hayır, çünkü ASP.NET Core’da async yasak']), answer: 0,
    why: W('الـ deadlock الكلاسيكي يأتي من .Result مع سياق متزامن. الحل الحقيقي: async حتى النهاية.', 'The classic deadlock comes from .Result with a sync context. The real fix is async all the way.', 'Klasik deadlock, senkron bağlamla .Result’tan gelir. Gerçek çözüm baştan sona async.') }),
  choice({ id: 'cs-s2-background-scope', level: 'senior', topic,
    prompt: W('BackgroundService (Singleton) يحتاج AppDbContext كل دقيقة. ما الطريقة الصحيحة؟', 'A BackgroundService (a singleton) needs AppDbContext every minute. What is the right way?', 'Bir BackgroundService (singleton) her dakika AppDbContext’e ihtiyaç duyuyor. Doğru yol nedir?'),
    options: L3(['حقن IServiceScopeFactory وإنشاء scope جديد في كل دورة لأخذ DbContext منه', 'حقن AppDbContext في الـ constructor مباشرة', 'جعل AppDbContext Singleton', 'إنشاء DbContext static'], ['Inject IServiceScopeFactory and create a new scope each cycle to get the DbContext', 'Inject AppDbContext straight into the constructor', 'Make AppDbContext a singleton', 'Use a static DbContext'], ['IServiceScopeFactory enjekte edip her turda yeni scope oluşturarak DbContext almak', 'AppDbContext’i doğrudan constructor’a enjekte etmek', 'AppDbContext’i singleton yapmak', 'Static bir DbContext kullanmak']), answer: 0,
    why: W('الـ DbContext مصمم ليعيش قصيرًا ويتتبع التغييرات. إبقاؤه للأبد يسبب تضخم الذاكرة وبيانات قديمة وأخطاء تزامن.', 'A DbContext is meant to be short-lived and tracks changes. Keeping one forever causes memory growth, stale data and concurrency errors.', 'DbContext kısa ömürlü olacak ve değişiklikleri izleyecek şekilde tasarlanmıştır. Sonsuza dek tutmak bellek şişmesi, eski veri ve eşzamanlılık hataları yaratır.') }),
  choice({ id: 'cs-s2-fromsqlraw', level: 'senior', topic,
    prompt: W('أي استعلام آمن من SQL injection في EF Core؟', 'Which query is safe from SQL injection in EF Core?', 'EF Core’da hangi sorgu SQL injection’a karşı güvenlidir?'),
    options: [
      'db.Users.FromSql($"SELECT * FROM Users WHERE Email = {email}")',
      'db.Users.FromSqlRaw("SELECT * FROM Users WHERE Email = \'" + email + "\'")',
      'db.Users.FromSqlRaw($"SELECT * FROM Users WHERE Email = \'{email}\'")',
      'db.Database.ExecuteSqlRaw("DELETE FROM Users WHERE Email = " + email)',
    ], answer: 0, codeLang: 'cs',
    why: W('FromSql (أو FromSqlInterpolated) يحوّل {email} إلى معامل SQL. أما FromSqlRaw مع دمج النصوص فيضع القيمة داخل الاستعلام.', 'FromSql (or FromSqlInterpolated) turns {email} into a SQL parameter. FromSqlRaw with string building pastes the value into the query.', 'FromSql (veya FromSqlInterpolated) {email}’i bir SQL parametresine çevirir. Metin birleştirmeli FromSqlRaw değeri sorguya yapıştırır.') }),
  choice({ id: 'cs-s2-jwt-validate', level: 'senior', topic,
    prompt: W('ما الإعداد الخطير في التحقق من JWT؟', 'Which JWT validation setting is dangerous?', 'JWT doğrulamasında hangi ayar tehlikelidir?'),
    options: ['ValidateIssuerSigningKey = false', 'ValidateLifetime = true', 'ClockSkew = TimeSpan.FromMinutes(1)', 'ValidAudience = "shop-api"'], answer: 0, codeLang: 'cs',
    why: W('بدون التحقق من التوقيع يمكن لأي شخص صنع token بأي صلاحيات. التحقق من التوقيع والمُصدِر والجمهور والصلاحية الزمنية كلها ضرورية.', 'Without checking the signature anyone can forge a token with any claims. Signature, issuer, audience and lifetime checks are all needed.', 'İmza kontrolü olmadan herkes istediği yetkiyle token üretebilir. İmza, yayıncı, hedef kitle ve süre kontrollerinin hepsi gerekir.') }),
  choice({ id: 'cs-s2-rate-limit', level: 'senior', topic,
    prompt: W('مسار تسجيل الدخول يتعرض لمحاولات تخمين كلمات المرور. ما الأداة المدمجة في .NET 8؟', 'The login endpoint is hit by password-guessing attempts. Which built-in .NET 8 tool helps?', 'Giriş endpoint’i şifre tahmin denemelerine maruz kalıyor. Hangi yerleşik .NET 8 aracı yardımcı olur?'),
    options: {

      ar: ['AddRateLimiter + RequireRateLimiting("login")', 'AddResponseCaching', 'UseStaticFiles', 'AddMemoryCache فقط'],

      en: ['AddRateLimiter + RequireRateLimiting("login")', 'AddResponseCaching', 'UseStaticFiles', 'AddMemoryCache only'],

      tr: ['AddRateLimiter + RequireRateLimiting("login")', 'AddResponseCaching', 'UseStaticFiles', 'Sadece AddMemoryCache'],

    }, answer: 0, codeLang: 'cs',
    why: W('Rate limiting يحدد عدد المحاولات لكل IP أو حساب في فترة زمنية ويرجع 429. اجمعه مع قفل الحساب المؤقت.', 'Rate limiting caps attempts per IP or account per time window and returns 429. Combine it with temporary account lockout.', 'Rate limiting, zaman penceresinde IP veya hesap başına denemeleri sınırlar ve 429 döndürür. Geçici hesap kilitleme ile birleştir.') }),
  choice({ id: 'cs-s2-compiled-query', level: 'senior', topic,
    prompt: W('شاشة قراءة فقط تعرض 10,000 صف ببطء مع EF Core. ما التحسين الأوضح؟', 'A read-only screen shows 10,000 rows slowly with EF Core. Clearest improvement?', 'Salt okunur bir ekran EF Core ile 10.000 satırı yavaş gösteriyor. En belirgin iyileştirme nedir?'),
    options: L3(['AsNoTracking مع Select للحقول المطلوبة وتقسيم النتائج إلى صفحات', 'إضافة Include لكل العلاقات', 'استدعاء SaveChanges بعد القراءة', 'تحويل كل شيء إلى ToList ثم الفلترة في الذاكرة'], ['AsNoTracking with a Select of the needed fields, plus paging', 'Include every relation', 'Call SaveChanges after reading', 'ToList everything and filter in memory'], ['Gereken alanları Select eden AsNoTracking, artı sayfalama', 'Tüm ilişkileri Include etmek', 'Okuduktan sonra SaveChanges çağırmak', 'Her şeyi ToList edip bellekte filtrelemek']), answer: 0,
    why: W('التتبع يكلف ذاكرة ووقتًا بلا فائدة للقراءة فقط، وجلب أعمدة أقل وصفحات أصغر يقلل البيانات المنقولة.', 'Tracking costs memory and time with no benefit for read-only data, and fewer columns plus smaller pages cut the data moved.', 'İzleme salt okunur veri için faydasız bellek ve zaman harcar; daha az sütun ve küçük sayfalar taşınan veriyi azaltır.') }),
  choice({ id: 'cs-s2-idempotent-webhook', level: 'senior', topic,
    prompt: W('مزود الدفع يرسل نفس webhook مرتين أحيانًا، فيُشحن الطلب مرتين. ما التصميم الصحيح؟', 'The payment provider sometimes sends the same webhook twice, so the order ships twice. The right design?', 'Ödeme sağlayıcı bazen aynı webhook’u iki kez gönderiyor ve sipariş iki kez kargolanıyor. Doğru tasarım nedir?'),
    options: L3(['حفظ معرّف الحدث بقيد unique ضمن نفس المعاملة، وتجاهل الحدث المكرر', 'إضافة Thread.Sleep قبل المعالجة', 'إرجاع 500 للحدث الثاني', 'معالجة الأحداث بخيط واحد فقط'], ['Store the event id with a unique constraint in the same transaction and skip duplicates', 'Add a Thread.Sleep before handling', 'Return 500 for the second event', 'Handle events on one thread only'], ['Olay kimliğini aynı transaction içinde benzersiz kısıtla saklayıp tekrarları atlamak', 'İşlemden önce Thread.Sleep eklemek', 'İkinci olay için 500 döndürmek', 'Olayları tek thread’de işlemek']), answer: 0,
    why: W('الـ webhooks تُسلَّم «مرة على الأقل». تحقق أولًا من التوقيع، ثم اجعل المعالجة idempotent وأرجع 200 للمكرر حتى يتوقف المزود عن الإعادة.', 'Webhooks are delivered at least once. Verify the signature first, then make handling idempotent and return 200 for duplicates so the provider stops retrying.', 'Webhook’lar en az bir kez teslim edilir. Önce imzayı doğrula, sonra işlemeyi idempotent yap ve tekrarlara 200 döndür ki sağlayıcı yeniden denemeyi bıraksın.') }),
]
