import type { Question } from '#shared/types/quiz'
import { choice } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const topic = 'angular' as const
const a = { codeLang: 'ts' as const, topic }
const h = { codeLang: 'html' as const, topic }

export const ANGULAR_2: Question[] = [
  // ───────── Junior ─────────
  choice({ ...h, id: 'a-j2-property-binding', level: 'junior',
    prompt: W('كيف تربط src للصورة بخاصية imageUrl في المكوّن؟', 'How do you bind an image’s src to the component property imageUrl?', 'Bir resmin src’sini bileşendeki imageUrl özelliğine nasıl bağlarsın?'),
    options: ['<img [src]="imageUrl">', '<img src="imageUrl">', '<img (src)="imageUrl">', '<img src="{imageUrl}">'], answer: 0,
    why: W('الأقواس المربعة [ ] لربط الخصائص من المكوّن إلى القالب، والأقواس العادية ( ) للأحداث.', 'Square brackets [ ] bind properties from component to template; parentheses ( ) are for events.', 'Köşeli parantez [ ] özellikleri bileşenden şablona bağlar; normal parantez ( ) olaylar içindir.') }),
  choice({ ...h, id: 'a-j2-for', level: 'junior',
    prompt: W('ما صيغة الحلقة الحديثة في Angular 17+ لعرض قائمة products؟', 'What is the modern Angular 17+ loop syntax to show a products list?', 'Angular 17+’da products listesini göstermek için modern döngü söz dizimi nedir?'),
    options: ['@for (p of products; track p.id) { <li>{{ p.name }}</li> }', '<li v-for="p in products">', '{products.map(p => <li>{p.name}</li>)}', '<li *for="p in products">'], answer: 0,
    why: W('track إلزامي في @for ويساعد Angular على تحديث العناصر المتغيرة فقط. والصيغة القديمة *ngFor ما زالت تعمل.', 'track is required in @for and helps Angular update only the items that changed. The older *ngFor still works.', '@for’da track zorunludur ve Angular’ın yalnızca değişen öğeleri güncellemesine yardım eder. Eski *ngFor hâlâ çalışır.') }),
  choice({ ...h, id: 'a-j2-class-binding', level: 'junior',
    prompt: W('كيف تضيف class="active" عندما يكون isActive صحيحًا؟', 'How do you add class="active" when isActive is true?', 'isActive doğruyken class="active"’i nasıl eklersin?'),
    options: ['<li [class.active]="isActive">', '<li class="active" *ngIf="isActive">', '<li [active]="isActive">', '<li class="{{ isActive }}">'], answer: 0,
    why: W('[class.اسم] يضيف أو يزيل class واحدة. ولعدة classes: [class]="{ active: isActive, big: isBig }".', '[class.name] adds or removes one class. For several: [class]="{ active: isActive, big: isBig }".', '[class.ad] tek bir sınıfı ekler ya da kaldırır. Birden fazlası için: [class]="{ active: isActive, big: isBig }".') }),
  choice({ ...h, id: 'a-j2-currency-pipe', level: 'junior',
    prompt: W('كيف تعرض السعر 1250 بصيغة عملة؟', 'How do you show the price 1250 formatted as currency?', '1250 fiyatını para birimi biçiminde nasıl gösterirsin?'),
    options: ["{{ price | currency:'USD' }}", "{{ currency(price) }}", "{{ price.toCurrency() }}", "{{ price :: currency }}"], answer: 0,
    why: W('الـ pipes تحوّل القيمة للعرض دون تغييرها. وdate وdecimal وpercent وuppercase أمثلة أخرى.', 'Pipes transform a value for display without changing it. date, decimal, percent and uppercase are other examples.', 'Pipe’lar bir değeri değiştirmeden gösterim için dönüştürür. date, decimal, percent ve uppercase başka örneklerdir.') }),
  choice({ ...a, id: 'a-j2-service-purpose', level: 'junior',
    prompt: W('لماذا نضع طلبات HTTP في service بدل المكوّن؟', 'Why put HTTP requests in a service instead of the component?', 'HTTP isteklerini neden bileşen yerine bir service’e koyarız?'),
    options: L3(['لمشاركتها بين عدة مكوّنات وإبقاء المكوّن للعرض فقط، ولتسهيل الاختبار', 'لأن المكوّنات لا تستطيع استخدام HttpClient', 'لأنها أسرع', 'لأن Angular يمنع ذلك'],
      ['To share them across components, keep the component about display, and make testing easier', 'Components cannot use HttpClient', 'It is faster', 'Angular forbids it'],
      ['Onları bileşenler arasında paylaşmak, bileşeni görünüme odaklı tutmak ve testi kolaylaştırmak için', 'Bileşenler HttpClient kullanamaz', 'Daha hızlıdır', 'Angular yasaklıyor'],
    ), answer: 0,
    why: W('الـ service تُحقن حيث تحتاجها، ويمكن استبدالها بنسخة وهمية في الاختبارات.', 'A service is injected wherever you need it and can be swapped for a fake in tests.', 'Bir service ihtiyaç duyulan yere enjekte edilir ve testlerde sahtesiyle değiştirilebilir.') }),
  choice({ ...h, id: 'a-j2-router-link', level: 'junior',
    prompt: W('كيف تنتقل لصفحة /products دون إعادة تحميل الصفحة كلها؟', 'How do you go to /products without reloading the whole page?', 'Tüm sayfayı yenilemeden /products’a nasıl gidersin?'),
    options: ['<a routerLink="/products">Products</a>', '<a href="/products">Products</a>', '<a (click)="location = \'/products\'">', '<router to="/products">'], answer: 0,
    why: W('routerLink يغيّر الصفحة داخل التطبيق فقط. أما href العادي فيعيد تحميل كل شيء ويفقد الحالة.', 'routerLink changes the page inside the app. A plain href reloads everything and loses state.', 'routerLink sayfayı uygulama içinde değiştirir. Düz href her şeyi yeniden yükler ve durumu kaybeder.') }),
  choice({ ...a, id: 'a-j2-ng-serve', level: 'junior',
    prompt: W('أي أمر يشغّل تطبيق Angular محليًا مع إعادة تحميل تلقائية عند الحفظ؟', 'Which command runs an Angular app locally with automatic reload on save?', 'Bir Angular uygulamasını kaydedince otomatik yenilemeyle yerelde hangi komut çalıştırır?'),
    options: ['ng serve', 'ng build', 'ng deploy', 'ng test --watch=false'], answer: 0, codeLang: 'bash',
    why: W('ng build ينتج ملفات الإنتاج في مجلد dist، وng serve للتطوير فقط.', 'ng build produces production files in dist; ng serve is for development only.', 'ng build dist klasöründe canlı dosyalarını üretir; ng serve yalnızca geliştirme içindir.') }),
  choice({ ...h, id: 'a-j2-template-ref', level: 'junior',
    prompt: W('ماذا يفعل #email هنا؟', 'What does #email do here?', 'Buradaki #email ne yapar?'),
    code: `<input #email type="email">
<button (click)="subscribe(email.value)">Subscribe</button>`,
    options: L3(['متغير قالب يشير لعنصر input، فيمكن قراءة قيمته داخل نفس القالب', 'يجعل الحقل إلزاميًا', 'يربط الحقل بخاصية في المكوّن', 'يغيّر id العنصر'],
      ['A template variable that points to the input, so its value can be read in the same template', 'Makes the field required', 'Binds the field to a component property', 'Changes the element’s id'],
      ['Input’u gösteren bir şablon değişkeni; değeri aynı şablonda okunabilir', 'Alanı zorunlu yapar', 'Alanı bileşen özelliğine bağlar', 'Öğenin id’sini değiştirir']), answer: 0,
    why: W('مفيد للحالات البسيطة. وللنماذج الحقيقية استخدم ngModel أو Reactive Forms.', 'Handy for simple cases. For real forms use ngModel or Reactive Forms.', 'Basit durumlar için kullanışlı. Gerçek formlar için ngModel ya da Reactive Forms kullan.') }),
  choice({ ...h, id: 'a-j2-else', level: 'junior',
    prompt: W('كيف تعرض «لا توجد طلبات» عندما تكون القائمة فارغة في Angular 17+؟', 'How do you show "No orders" when the list is empty in Angular 17+?', 'Angular 17+’da liste boşken "Sipariş yok"u nasıl gösterirsin?'),
    options: ['@for (o of orders; track o.id) { … } @empty { <p>No orders</p> }', '@for (o of orders) { … } @else { <p>No orders</p> }', '<p *ngIf="orders.empty">', '<p v-else>No orders</p>'], answer: 0,
    why: W('@empty كتلة خاصة بـ @for تظهر عندما تكون القائمة فارغة، و@else تتبع @if.', '@empty is a block for @for that shows when the list is empty; @else follows @if.', '@empty, liste boşken görünen bir @for bloğudur; @else, @if’i izler.') }),
  choice({ ...a, id: 'a-j2-inject', level: 'junior',
    prompt: W('ما الطريقة الحديثة للحصول على service داخل مكوّن؟', 'What is the modern way to get a service inside a component?', 'Bir bileşen içinde service almanın modern yolu nedir?'),
    options: ['private cart = inject(CartService)', 'private cart = new CartService()', 'private cart = CartService.instance', 'private cart = import(CartService)'], answer: 0,
    why: W('inject() يأخذ النسخة من نظام حقن الاعتماديات (DI) نفسها التي يأخذها الجميع، بدل إنشاء نسخة جديدة منفصلة.', 'inject() gets the instance from dependency injection, the same one everyone else gets, instead of creating a separate new one.', 'inject() örneği bağımlılık enjeksiyonundan, herkesin aldığı aynı örneği alır; ayrı yeni bir örnek oluşturmaz.') }),
  choice({ ...a, id: 'a-j2-on-init', level: 'junior',
    prompt: W('أين تضع جلب البيانات الأول للمكوّن عادةً؟', 'Where do you usually put a component’s first data fetch?', 'Bir bileşenin ilk veri çekimini genelde nereye koyarsın?'),
    options: ['ngOnInit()', 'constructor()', 'ngOnDestroy()', 'ngAfterViewChecked()'], answer: 0,
    why: W('في ngOnInit تكون قيم الـ inputs جاهزة. والـ constructor للحقن والإعداد البسيط فقط.', 'In ngOnInit the inputs are ready. The constructor is for injection and simple setup only.', 'ngOnInit’te input’lar hazırdır. constructor yalnızca enjeksiyon ve basit kurulum içindir.') }),
  choice({ ...a, id: 'a-j2-styles-encapsulated', level: 'junior',
    prompt: W('كتبت .title { color: red } في ملف CSS لمكوّن. أين تُطبَّق؟', 'You wrote .title { color: red } in a component’s CSS file. Where does it apply?', 'Bir bileşenin CSS dosyasına .title { color: red } yazdın. Nerede uygulanır?'),
    options: L3(['على عناصر هذا المكوّن فقط (افتراضيًا)', 'على كل الموقع', 'على المكوّنات الأبناء فقط', 'لا تُطبَّق إلا في styles.css'],
      ['Only on this component’s elements (by default)', 'Across the whole site', 'Only on child components', 'Only in styles.css'],
      ['Yalnızca bu bileşenin öğelerinde (varsayılan olarak)', 'Tüm sitede', 'Sadece alt bileşenlerde', 'Sadece styles.css’te'],
    ), answer: 0,
    why: W('Angular يعزل الأنماط بإضافة خصائص فريدة (ViewEncapsulation.Emulated). والأنماط العامة مكانها styles.css.', 'Angular isolates styles by adding unique attributes (ViewEncapsulation.Emulated). Global styles go in styles.css.', 'Angular benzersiz öznitelikler ekleyerek stilleri izole eder (ViewEncapsulation.Emulated). Genel stiller styles.css’e gider.') }),
  choice({ ...h, id: 'a-j2-date-pipe', level: 'junior',
    prompt: W('كيف تعرض تاريخ الطلب بصيغة مختصرة مثل 21/11/2026؟', 'How do you show the order date in a short format like 21/11/2026?', 'Sipariş tarihini 21/11/2026 gibi kısa biçimde nasıl gösterirsin?'),
    options: ["{{ order.date | date:'dd/MM/yyyy' }}", "{{ order.date.format('dd/MM') }}", "{{ date(order.date) }}", "{{ order.date | short }}"], answer: 0,
    why: W('date pipe يقبل صيغًا جاهزة مثل shortDate أو صيغة مخصصة، ويتبع لغة التطبيق المحددة.', 'The date pipe accepts presets like shortDate or a custom pattern, and follows the app’s configured locale.', 'date pipe shortDate gibi hazır biçimleri ya da özel bir kalıbı kabul eder ve uygulamanın diline uyar.') }),

  // ───────── Mid ─────────
  choice({ ...a, id: 'a-m2-signal-update', level: 'mid',
    prompt: W('ما الفرق بين set وupdate في signals؟', 'What is the difference between set and update on signals?', 'Signal’larda set ile update arasındaki fark nedir?'),
    code: `count.set(5)
count.update(n => n + 1)`,
    options: L3(['set تضع قيمة جديدة مباشرة، وupdate تحسبها من القيمة الحالية', 'لا فرق', 'update أسرع دائمًا', 'set للأرقام فقط'],
      ['set puts a new value directly; update computes it from the current value', 'No difference', 'update is always faster', 'set is only for numbers'],
      ['set doğrudan yeni değer koyar; update onu mevcut değerden hesaplar', 'Fark yok', 'update her zaman daha hızlı', 'set sadece sayılar için']), answer: 0,
    why: W('مع الكائنات والمصفوفات أنشئ نسخة جديدة داخل update، لأن تعديل نفس الكائن لا يُعلم Angular بالتغيير.', 'With objects and arrays, create a new copy inside update, because mutating the same object does not tell Angular anything changed.', 'Nesne ve dizilerde update içinde yeni bir kopya oluştur; aynı nesneyi değiştirmek Angular’a değişikliği bildirmez.') }),
  choice({ ...a, id: 'a-m2-input-signal', level: 'mid',
    prompt: W('ما الطريقة الحديثة (Angular 17.1+) لتعريف input إلزامي؟', 'What is the modern (Angular 17.1+) way to declare a required input?', 'Zorunlu bir input tanımlamanın modern (Angular 17.1+) yolu nedir?'),
    options: ['userId = input.required<number>()', '@Input() userId!: number', 'userId = signal<number>()', 'userId = inject(Input)'], answer: 0,
    why: W('input() يعطي signal للقراءة فقط، فيعمل مع computed وeffect مباشرة دون ngOnChanges.', 'input() gives a read-only signal, so it works directly with computed and effect, without ngOnChanges.', 'input() salt okunur bir signal verir; ngOnChanges olmadan doğrudan computed ve effect ile çalışır.') }),
  choice({ ...a, id: 'a-m2-model', level: 'mid',
    prompt: W('كيف يدعم مكوّن RatingComponent الربط ثنائي الاتجاه [(value)]؟', 'How does a RatingComponent support two-way binding [(value)]?', 'RatingComponent iki yönlü bağlamayı [(value)] nasıl destekler?'),
    options: ['value = model(0)', 'value = input(0)', 'value = output<number>()', 'value = signal(0)'], answer: 0,
    why: W('model() يجمع input وoutput معًا، فالتغيير داخل المكوّن يصل للأب تلقائيًا.', 'model() combines an input and an output, so changes inside the component reach the parent automatically.', 'model() bir input ile output’u birleştirir; bileşen içindeki değişiklikler üst bileşene otomatik ulaşır.') }),
  choice({ ...a, id: 'a-m2-reactive-form', level: 'mid',
    prompt: W('كيف تعرّف نموذجًا فيه بريد إلزامي وصالح باستخدام Reactive Forms؟', 'How do you define a form with a required, valid email using Reactive Forms?', 'Reactive Forms ile zorunlu ve geçerli e-postalı bir formu nasıl tanımlarsın?'),
    options: ["form = new FormGroup({ email: new FormControl('', [Validators.required, Validators.email]) })", "form = { email: '' }", "form = signal({ email: Validators.email })", "form = new FormControl({ email: 'required' })"], answer: 0,
    why: W('Reactive Forms تجعل منطق التحقق في TypeScript قابلًا للاختبار، وform.valid وcontrol.errors جاهزة للقالب.', 'Reactive Forms keep validation logic in TypeScript where it can be tested, with form.valid and control.errors ready for the template.', 'Reactive Forms doğrulama mantığını test edilebilir şekilde TypeScript’te tutar; form.valid ve control.errors şablona hazırdır.') }),
  choice({ ...a, id: 'a-m2-interceptor', level: 'mid',
    prompt: W('تريد إضافة ترويسة Authorization لكل طلبات HttpClient. ما الأداة؟', 'You want to add an Authorization header to every HttpClient request. Which tool?', 'Tüm HttpClient isteklerine Authorization başlığı eklemek istiyorsun. Hangi araç?'),
    options: {

      ar: ['HttpInterceptorFn مع provideHttpClient(withInterceptors([authInterceptor]))', 'إضافتها يدويًا في كل service', 'window.fetch = …', 'ترويسة في index.html'],

      en: ['An HttpInterceptorFn with provideHttpClient(withInterceptors([authInterceptor]))', 'Add it by hand in every service', 'window.fetch = …', 'A header in index.html'],

      tr: ['provideHttpClient(withInterceptors([authInterceptor])) ile bir HttpInterceptorFn', 'Her service’e elle eklemek', 'window.fetch = …', 'index.html’de başlık'],

    }, answer: 0,
    why: W('الـ interceptor يمر عليه كل طلب ورد، مناسب للتوثيق ومعالجة الأخطاء العامة ومؤشر التحميل.', 'Every request and response passes through an interceptor, which suits auth, global error handling and loading indicators.', 'Her istek ve yanıt bir interceptor’dan geçer; kimlik doğrulama, genel hata yönetimi ve yükleme göstergesi için uygundur.') }),
  choice({ ...a, id: 'a-m2-can-activate', level: 'mid',
    prompt: W('كيف تمنع غير المسجلين من فتح مسار /dashboard؟', 'How do you stop logged-out users from opening the /dashboard route?', 'Giriş yapmamış kullanıcıların /dashboard rotasını açmasını nasıl engellersin?'),
    code: `{ path: 'dashboard', component: Dashboard, canActivate: [???] }`,
    options: {

      ar: ["() => inject(Auth).isLoggedIn() ", "() => window.location.href = '/login'", "Dashboard.guard = true", "() => alert('Login first')"],

      en: ["", "() => window.location.href = '/login'", "Dashboard.guard = true", "() => alert('Login first')"],

      tr: [" inject(Router).parseUrl('/login')", "() => window.location.href = '/login'", "Dashboard.guard = true", "() => alert('Login first')"],

    }, answer: 0,
    why: W('الحارس الدالي يرجع true أو رابط تحويل (UrlTree). والحماية الحقيقية تبقى في الـ API.', 'A functional guard returns true or a redirect (UrlTree). Real protection still lives in the API.', 'Fonksiyonel koruyucu true ya da bir yönlendirme (UrlTree) döndürür. Gerçek koruma yine API’dedir.') }),
  choice({ ...a, id: 'a-m2-load-component', level: 'mid',
    prompt: W('كيف تجعل كود صفحة الإعدادات يُحمَّل فقط عند فتحها؟', 'How do you make the settings page’s code load only when it is opened?', 'Ayarlar sayfasının kodunun yalnızca açıldığında yüklenmesini nasıl sağlarsın?'),
    options: ["{ path: 'settings', loadComponent: () => import('./settings').then(m => m.Settings) }", "{ path: 'settings', component: Settings, lazy: true }", "{ path: 'settings', async: Settings }", "{ path: 'settings', defer: true }"], answer: 0,
    why: W('loadComponent يضع المكوّن في حزمة منفصلة، فيصغر حجم التحميل الأول. ولمجموعة مسارات: loadChildren.', 'loadComponent puts the component in a separate chunk, shrinking the first load. For a group of routes: loadChildren.', 'loadComponent bileşeni ayrı bir parçaya koyar ve ilk yüklemeyi küçültür. Bir rota grubu için: loadChildren.') }),
  choice({ ...a, id: 'a-m2-pure-pipe', level: 'mid',
    prompt: W('متى يُعاد حساب pipe «نقي» (pure، الافتراضي)؟', 'When does a pure pipe (the default) re-run?', 'Saf (pure, varsayılan) bir pipe ne zaman yeniden hesaplanır?'),
    options: L3(['فقط عندما يتغير مرجع المدخل أو معاملاته، لا عند كل فحص للتغييرات', 'عند كل فحص للتغييرات', 'مرة واحدة فقط', 'عند كل ضغطة زر'],
      ['Only when its input reference or arguments change, not on every change-detection pass', 'On every change-detection pass', 'Only once', 'On every click'],
      ['Yalnızca girdi referansı ya da argümanları değişince; her değişiklik algılamada değil', 'Her değişiklik algılamada', 'Yalnızca bir kez', 'Her tıklamada']), answer: 0,
    why: W('لهذا لا يرى الـ pipe النقي إضافة عنصر لنفس المصفوفة (push). أنشئ مصفوفة جديدة بدل تعديلها.', 'That is why a pure pipe does not notice an item pushed into the same array. Create a new array instead of mutating it.', 'Bu yüzden saf pipe aynı diziye push edilen öğeyi fark etmez. Diziyi değiştirmek yerine yeni dizi oluştur.') }),
  choice({ ...h, id: 'a-m2-defer', level: 'mid',
    prompt: W('ماذا يفعل هذا الكود (Angular 17+)؟', 'What does this code do (Angular 17+)?', 'Bu kod ne yapar (Angular 17+)?'),
    code: `@defer (on viewport) {
  <app-comments />
} @placeholder {
  <p>Comments</p>
}`,
    options: L3(['يحمّل كود التعليقات ويعرضها فقط عندما تقترب من الشاشة، مع نص مؤقت قبلها', 'يخفي التعليقات نهائيًا', 'يحمّل التعليقات قبل الصفحة', 'يؤخر الصفحة كلها'],
      ['Loads and shows the comments’ code only when they near the viewport, with placeholder text before', 'Hides the comments for good', 'Loads the comments before the page', 'Delays the whole page'],
      ['Yorumların kodunu yalnızca ekrana yaklaşınca yükler ve gösterir; öncesinde yer tutucu metin', 'Yorumları kalıcı gizler', 'Yorumları sayfadan önce yükler', 'Tüm sayfayı geciktirir']), answer: 0,
    why: W('@defer يقسّم الكود تلقائيًا بلا إعداد. وهناك محفزات أخرى: on idle وon interaction وon hover.', '@defer splits the code automatically with no setup. Other triggers: on idle, on interaction, on hover.', '@defer kodu kurulum olmadan otomatik böler. Diğer tetikleyiciler: on idle, on interaction, on hover.') }),
  choice({ ...a, id: 'a-m2-view-child', level: 'mid',
    prompt: W('متى يكون viewChild متاحًا لأول مرة للتعامل مع عنصر في القالب؟', 'When is a viewChild first available to work with a template element?', 'Şablondaki bir öğeyle çalışmak için viewChild ilk ne zaman kullanılabilir?'),
    code: `chart = viewChild<ElementRef>('chart')`,
    options: {

      ar: ['ngAfterViewInit (أو afterNextRender)', 'constructor', 'ngOnInit دائمًا', 'ngOnDestroy'],

      en: ['ngAfterViewInit (or afterNextRender)', 'constructor', 'Always ngOnInit', 'ngOnDestroy'],

      tr: ['ngAfterViewInit (ya da afterNextRender)', 'constructor', 'Her zaman ngOnInit', 'ngOnDestroy'],

    }, answer: 0,
    why: W('العناصر لا توجد قبل رسم القالب. ومكتبات DOM مثل الرسوم البيانية تُهيأ بعد الرسم، وفي المتصفح فقط مع SSR.', 'Elements do not exist before the template renders. DOM libraries like charts are set up after rendering, and only in the browser with SSR.', 'Öğeler şablon çizilmeden önce yoktur. Grafikler gibi DOM kütüphaneleri çizimden sonra ve SSR’da yalnızca tarayıcıda kurulur.') }),
  choice({ ...a, id: 'a-m2-take-until-destroyed', level: 'mid',
    prompt: W('ما أبسط طريقة لإلغاء اشتراك Observable تلقائيًا عند تدمير المكوّن؟', 'What is the simplest way to unsubscribe from an Observable automatically when the component is destroyed?', 'Bileşen yok edilince bir Observable aboneliğini otomatik iptal etmenin en basit yolu nedir?'),
    code: `this.route.params.pipe(???).subscribe(p => this.load(p.id))`,
    options: {

      ar: ['takeUntilDestroyed()', 'take(1) دائمًا', 'delay(0)', 'share()'],

      en: ['takeUntilDestroyed()', 'Always take(1)', 'delay(0)', 'share()'],

      tr: ['takeUntilDestroyed()', 'Her zaman take(1)', 'delay(0)', 'share()'],

    }, answer: 0,
    why: W('takeUntilDestroyed يستخدم DestroyRef فيُغلق الاشتراك وحده. أو حوّل الـ Observable لـ signal بـ toSignal، أو استخدم async pipe.', 'takeUntilDestroyed uses DestroyRef and closes the subscription on its own. Or turn the Observable into a signal with toSignal, or use the async pipe.', 'takeUntilDestroyed DestroyRef kullanır ve aboneliği kendisi kapatır. Ya da Observable’ı toSignal ile signal’e çevir veya async pipe kullan.') }),
  choice({ ...a, id: 'a-m2-environment', level: 'mid',
    prompt: W('رابط الـ API مختلف بين التطوير والإنتاج. أين يوضع في Angular؟', 'The API URL differs between development and production. Where does it go in Angular?', 'API URL’si geliştirme ve canlı arasında farklı. Angular’da nereye konur?'),
    options: L3(['ملفات environment مع fileReplacements في angular.json لكل إعداد بناء', 'ثابت في كل service', 'في localStorage', 'في index.html'],
      ['environment files with fileReplacements in angular.json per build configuration', 'Hard-coded in each service', 'In localStorage', 'In index.html'],
      ['Her derleme yapılandırması için angular.json’da fileReplacements ile environment dosyaları', 'Her service’te sabit', 'localStorage’da', 'index.html’de']), answer: 0,
    why: W('تذكّر أن كل ما في الواجهة مكشوف للمستخدم، فلا تضع مفاتيح سرية في ملفات environment.', 'Remember everything in the frontend is visible to users, so never put secret keys in environment files.', 'Ön yüzdeki her şeyin kullanıcıya açık olduğunu unutma; environment dosyalarına asla gizli anahtar koyma.') }),
  choice({ ...a, id: 'a-m2-output-fn', level: 'mid',
    prompt: W('ما الطريقة الحديثة لتعريف حدث يرسله المكوّن للأب؟', 'What is the modern way to declare an event the component sends to its parent?', 'Bileşenin üst bileşene gönderdiği bir olayı tanımlamanın modern yolu nedir?'),
    options: ['deleted = output<number>()  …  this.deleted.emit(id)', '@Event() deleted = 1', 'deleted = signal<number>()', 'deleted = input<number>()'], answer: 0,
    why: W('output() بديل أخف لـ @Output مع EventEmitter، والأب يستمع بـ (deleted)="remove($event)".', 'output() is a lighter replacement for @Output with EventEmitter; the parent listens with (deleted)="remove($event)".', 'output(), EventEmitter’lı @Output’un daha hafif yerine geçenidir; üst bileşen (deleted)="remove($event)" ile dinler.') }),

  // ───────── Senior ─────────
  choice({ ...a, id: 'a-s2-zoneless', level: 'senior',
    prompt: W('ماذا يتطلب التطبيق ليعمل بدون zone.js (provideZonelessChangeDetection)؟', 'What does an app need to run without zone.js (provideZonelessChangeDetection)?', 'Bir uygulamanın zone.js olmadan (provideZonelessChangeDetection) çalışması için ne gerekir?'),
    options: L3(['أن تُبلغ Angular بالتغييرات عبر signals أو async pipe أو markForCheck، لا تعديل الخصائص بصمت', 'لا شيء، يعمل كل شيء كما هو', 'إزالة RxJS', 'استخدام setTimeout في كل مكان'],
      ['Changes must reach Angular through signals, the async pipe or markForCheck, not silent property changes', 'Nothing, everything works as before', 'Removing RxJS', 'Using setTimeout everywhere'],
      ['Değişiklikler sessiz özellik değişimleriyle değil, signal’lar, async pipe ya da markForCheck ile Angular’a bildirilmeli', 'Hiçbir şey, her şey aynı çalışır', 'RxJS’i kaldırmak', 'Her yerde setTimeout kullanmak']), answer: 0,
    why: W('zone.js كان يكتشف كل حدث غير متزامن ويفحص الشجرة كلها. بدونه يصبح التطبيق أخف وأسرع، لكن التحديث يحتاج إشارة صريحة.', 'zone.js detected every async event and checked the whole tree. Without it the app is lighter and faster, but updates need an explicit signal.', 'zone.js her asenkron olayı yakalayıp tüm ağacı kontrol ediyordu. Onsuz uygulama daha hafif ve hızlıdır ama güncellemeler açık bir sinyal ister.') }),
  choice({ ...a, id: 'a-s2-to-signal', level: 'senior',
    prompt: W('كيف تحوّل Observable من HttpClient إلى signal يُقرأ في القالب؟', 'How do you turn an HttpClient Observable into a signal you read in the template?', 'HttpClient’tan gelen bir Observable’ı şablonda okunan bir signal’e nasıl çevirirsin?'),
    options: ["users = toSignal(this.http.get<User[]>('/api/users'), { initialValue: [] })", "users = signal(this.http.get('/api/users'))", "users = computed(() => this.http.get('/api/users'))", "users = effect(() => this.http.get('/api/users'))"], answer: 0,
    why: W('toSignal يشترك ويلغي الاشتراك تلقائيًا مع المكوّن. وinitialValue يمنع undefined قبل وصول البيانات.', 'toSignal subscribes and unsubscribes automatically with the component. initialValue avoids undefined before data arrives.', 'toSignal bileşenle birlikte otomatik abone olur ve aboneliği bitirir. initialValue veri gelmeden önce undefined’ı önler.') }),
  choice({ ...a, id: 'a-s2-exhaust-map', level: 'senior',
    prompt: W('المستخدم يضغط «دفع» عدة مرات بسرعة، فتُرسل عدة طلبات. أي عامل RxJS يتجاهل الضغطات حتى انتهاء الطلب الحالي؟', 'The user taps "Pay" several times quickly and several requests go out. Which RxJS operator ignores taps until the current request finishes?', 'Kullanıcı "Öde"ye hızla birkaç kez basıyor ve birkaç istek gidiyor. Hangi RxJS operatörü mevcut istek bitene kadar basmaları yok sayar?'),
    options: ['exhaustMap', 'switchMap', 'mergeMap', 'concatMap'], answer: 0,
    why: W('switchMap يلغي القديم ويبدأ الجديد (مناسب للبحث)، وconcatMap يرتبها كلها، وmergeMap يرسلها كلها معًا. للدفع: exhaustMap.', 'switchMap cancels the old one and starts the new (good for search), concatMap queues them all, mergeMap sends them all at once. For payment: exhaustMap.', 'switchMap eskisini iptal edip yenisini başlatır (arama için iyi), concatMap hepsini sıraya koyar, mergeMap hepsini aynı anda gönderir. Ödeme için: exhaustMap.') }),
  choice({ ...a, id: 'a-s2-share-replay', level: 'senior',
    prompt: W('ثلاثة مكوّنات تشترك في نفس config$ من HttpClient، فيُرسل الطلب 3 مرات. ما الحل؟', 'Three components subscribe to the same config$ from HttpClient, and the request goes out 3 times. The fix?', 'Üç bileşen HttpClient’tan gelen aynı config$’a abone oluyor ve istek 3 kez gidiyor. Çözüm?'),
    code: `config$ = this.http.get<Config>('/api/config').pipe(???)`,
    options: ['shareReplay({ bufferSize: 1, refCount: true })', 'take(1)', 'retry(3)', 'debounceTime(300)'], answer: 0,
    why: W('طلبات HttpClient «باردة»: كل اشتراك يرسل طلبًا جديدًا. shareReplay يشارك نتيجة واحدة ويعيدها للمشتركين الجدد.', 'HttpClient requests are cold: every subscription sends a new request. shareReplay shares one result and replays it to new subscribers.', 'HttpClient istekleri soğuktur: her abonelik yeni bir istek gönderir. shareReplay tek bir sonucu paylaşır ve yeni abonelere tekrar oynatır.') }),
  choice({ ...a, id: 'a-s2-browser-only', level: 'senior',
    prompt: W('مع SSR، مكتبة رسوم بيانية تستخدم window فتنهار في الخادم. أين تُهيّأ؟', 'With SSR, a charting library that uses window crashes on the server. Where do you set it up?', 'SSR’da window kullanan bir grafik kütüphanesi sunucuda çöküyor. Nerede kurarsın?'),
    options: ['afterNextRender(() => initChart())', 'constructor()', 'ngOnInit()', 'providedIn: \'root\''], answer: 0,
    why: W('afterNextRender وafterRender لا تعمل في الخادم إطلاقًا، فهي المكان الآمن لكود DOM والمتصفح.', 'afterNextRender and afterRender never run on the server, so they are the safe place for DOM and browser code.', 'afterNextRender ve afterRender sunucuda hiç çalışmaz; DOM ve tarayıcı kodu için güvenli yer onlardır.') }),
  choice({ ...a, id: 'a-s2-component-provider', level: 'senior',
    prompt: W('ماذا يحدث عند وضع service في providers الخاصة بالمكوّن؟', 'What happens when a service is listed in a component’s providers?', 'Bir service bileşenin providers listesine konunca ne olur?'),
    code: `@Component({ providers: [CartService], … })
export class CartWidget {}`,
    options: L3(['كل نسخة من CartWidget تأخذ نسخة جديدة خاصة بها من CartService (ومعها أبناؤها)', 'نسخة واحدة لكل التطبيق', 'يُمنع حقن CartService في مكان آخر', 'لا تأثير'],
      ['Each CartWidget instance gets its own new CartService (shared with its children)', 'One instance for the whole app', 'CartService can no longer be injected elsewhere', 'No effect'],
      ['Her CartWidget örneği kendi yeni CartService’ini alır (alt bileşenleriyle paylaşır)', 'Tüm uygulama için tek örnek', 'CartService başka yere enjekte edilemez', 'Etkisi yok']), answer: 0,
    why: W('شجرة الحقن هرمية: مفيد لحالة خاصة بكل ودجت، وخطأ شائع عندما تتوقع نسخة مشتركة فتحصل على عدة نسخ.', 'The injector tree is hierarchical: useful for per-widget state, and a common bug when you expect one shared instance but get several.', 'Enjektör ağacı hiyerarşiktir: bileşen başına durum için faydalıdır; tek paylaşılan örnek beklerken birkaç örnek almak yaygın bir hatadır.') }),
  choice({ ...a, id: 'a-s2-injection-token', level: 'senior',
    prompt: W('تريد حقن كائن إعدادات (ليس class) في عدة services. ما الطريقة الصحيحة؟', 'You want to inject a config object (not a class) into several services. The right way?', 'Birkaç service’e bir yapılandırma nesnesi (sınıf değil) enjekte etmek istiyorsun. Doğru yol?'),
    code: `export const API_CONFIG = new ???<{ baseUrl: string }>('API_CONFIG')
// providers: [{ provide: API_CONFIG, useValue: { baseUrl: '/api' } }]`,
    options: ['InjectionToken', 'Injectable', 'Component', 'Signal'], answer: 0,
    why: W('الواجهات تختفي بعد الترجمة فلا تصلح مفتاحًا للحقن. InjectionToken مفتاح حقيقي مع نوع.', 'Interfaces disappear after compiling, so they cannot be injection keys. An InjectionToken is a real key with a type.', 'Interface’ler derlemeden sonra kaybolur, enjeksiyon anahtarı olamazlar. InjectionToken tipli gerçek bir anahtardır.') }),
  choice({ ...a, id: 'a-s2-effect-no-writes', level: 'senior',
    prompt: W('ما المشكلة في هذا الكود؟', 'What is wrong with this code?', 'Bu kodun sorunu ne?'),
    code: `total = signal(0)
constructor() {
  effect(() => this.total.set(this.price() * this.qty()))
}`,
    options: L3(['قيمة مشتقة بـ effect؛ الصحيح total = computed(() => this.price() * this.qty())', 'effect لا تعمل في constructor', 'set غير موجودة', 'لا مشكلة'],
      ['It derives a value with an effect; the right way is total = computed(() => this.price() * this.qty())', 'effect does not work in the constructor', 'set does not exist', 'No problem'],
      ['Türetilmiş bir değeri effect ile üretiyor; doğrusu total = computed(() => this.price() * this.qty())', 'effect constructor’da çalışmaz', 'set yok', 'Sorun yok']), answer: 0,
    why: W('computed متزامن وكسول ومحفوظ، أما effect فتعمل لاحقًا وقد تسبب حلقات. effect للتأثيرات الخارجية فقط (سجلات، localStorage).', 'computed is synchronous, lazy and cached; an effect runs later and can cause loops. Effects are for outside side effects only (logging, localStorage).', 'computed senkron, tembel ve önbellekli; effect daha sonra çalışır ve döngülere yol açabilir. effect yalnızca dış yan etkiler içindir (log, localStorage).') }),
  choice({ ...a, id: 'a-s2-onpush-signal', level: 'senior',
    prompt: W('مكوّن OnPush يقرأ signal في القالب، ويتغير الـ signal من service. هل يتحدث المكوّن؟', 'An OnPush component reads a signal in its template, and the signal changes from a service. Does the component update?', 'OnPush bir bileşen şablonunda bir signal okuyor ve signal bir service’ten değişiyor. Bileşen güncellenir mi?'),
    options: L3(['نعم، قراءة signal في القالب تجعل Angular يعلّم المكوّن للتحديث تلقائيًا', 'لا، يحتاج تغيّر input', 'فقط مع markForCheck يدويًا', 'فقط إذا كان المكوّن standalone'],
      ['Yes, reading a signal in the template makes Angular mark the component for update automatically', 'No, it needs an input change', 'Only with a manual markForCheck', 'Only if the component is standalone'],
      ['Evet, şablonda signal okumak Angular’ın bileşeni otomatik güncelleme için işaretlemesini sağlar', 'Hayır, input değişikliği gerekir', 'Sadece elle markForCheck ile', 'Sadece bileşen standalone ise']), answer: 0,
    why: W('هذا ما يجعل الـ signals مع OnPush مزيجًا ممتازًا: تحديث دقيق دون فحص الشجرة كلها.', 'This is what makes signals with OnPush a great pair: precise updates without checking the whole tree.', 'Signal’ları OnPush ile harika bir ikili yapan budur: tüm ağacı kontrol etmeden hassas güncellemeler.') }),
  choice({ ...h, id: 'a-s2-ng-content-select', level: 'senior',
    prompt: W('كيف يعرض مكوّن Card محتوى العنوان والجسم في مكانين مختلفين؟', 'How does a Card component show the title content and the body content in two different places?', 'Bir Card bileşeni başlık ve gövde içeriğini iki farklı yerde nasıl gösterir?'),
    code: `<!-- usage -->
<app-card>
  <h2 card-title>Orders</h2>
  <p>…</p>
</app-card>`,
    options: ['<header><ng-content select="[card-title]" /></header><section><ng-content /></section>', '<header>{{ title }}</header>', '<slot name="card-title" />', '<header #title></header>'], answer: 0,
    why: W('select يختار المحتوى حسب محدد CSS، وng-content بدون select يأخذ الباقي. هذا ما يقابل الـ slots في Vue.', 'select picks content by a CSS selector, and ng-content without select takes the rest. It is Angular’s counterpart to Vue slots.', 'select içeriği bir CSS seçiciyle seçer; select’siz ng-content gerisini alır. Vue slot’larının Angular karşılığıdır.') }),
  choice({ ...h, id: 'a-s2-template-function', level: 'senior',
    prompt: W('لماذا قد يكون هذا القالب بطيئًا في قائمة كبيرة؟', 'Why might this template be slow in a big list?', 'Bu şablon büyük bir listede neden yavaş olabilir?'),
    code: `@for (o of orders; track o.id) {
  <td>{{ formatTotal(o) }}</td>
}`,
    options: L3(['الدالة تُستدعى في كل فحص للتغييرات لكل صف؛ استخدم computed أو pipe نقيًا', 'track خاطئ', 'td ممنوع داخل @for', 'لا يوجد أي أثر'],
      ['The function runs on every change-detection pass for every row; use a computed or a pure pipe', 'The track is wrong', 'td is not allowed inside @for', 'No effect at all'],
      ['Fonksiyon her değişiklik algılamada her satır için çalışır; computed ya da saf pipe kullan', 'track yanlış', '@for içinde td yasak', 'Hiçbir etkisi yok']), answer: 0,
    why: W('مع الحسابات الخفيفة لا بأس، لكن مع التنسيق الثقيل أو آلاف الصفوف تظهر المشكلة. الـ pipe النقي يُعاد حسابه فقط عند تغيّر مدخله.', 'Light calculations are fine, but heavy formatting or thousands of rows show the cost. A pure pipe only re-runs when its input changes.', 'Hafif hesaplar sorun değil, ama ağır biçimlendirme ya da binlerce satır maliyeti gösterir. Saf pipe yalnızca girdisi değişince yeniden hesaplanır.') }),
  choice({ ...a, id: 'a-s2-budgets', level: 'senior',
    prompt: W('كيف تمنع زيادة حجم حزمة JavaScript بالخطأ عند إضافة مكتبة ثقيلة؟', 'How do you stop the JavaScript bundle from growing by accident when a heavy library is added?', 'Ağır bir kütüphane eklenince JavaScript paketinin kazara büyümesini nasıl engellersin?'),
    options: L3(['budgets في angular.json تحذّر أو تُفشل البناء عند تجاوز حجم محدد', 'حذف node_modules', 'تعطيل الضغط', 'ng serve --prod'],
      ['budgets in angular.json warn or fail the build when a size limit is exceeded', 'Delete node_modules', 'Turn off minification', 'ng serve --prod'],
      ['angular.json’daki budgets, belirli bir boyut aşılınca uyarır ya da derlemeyi başarısız kılar', 'node_modules’ü silmek', 'Küçültmeyi kapatmak', 'ng serve --prod'],
    ), answer: 0,
    why: W('فشل البناء في CI يجعل الزيادة تُناقش قبل الدمج. وأداة source-map-explorer تُظهر ما يملأ الحزمة.', 'Failing the CI build makes the increase get discussed before merging. source-map-explorer shows what fills the bundle.', 'CI’da derlemenin başarısız olması artışın birleştirmeden önce tartışılmasını sağlar. source-map-explorer paketi neyin doldurduğunu gösterir.') }),
  choice({ ...a, id: 'a-s2-resource', level: 'senior',
    prompt: W('ما فائدة resource() (Angular 19+) هنا؟', 'What does resource() (Angular 19+) give you here?', 'resource() (Angular 19+) burada ne sağlar?'),
    code: `userId = input.required<number>()
user = resource({
  params: () => ({ id: this.userId() }),
  loader: ({ params }) => fetch(\`/api/users/\${params.id}\`).then(r => r.json()),
})`,
    options: L3(['يعيد الجلب تلقائيًا عند تغيّر userId، ويعطي value وisLoading وerror كـ signals', 'يحفظ البيانات في localStorage', 'يجلب مرة واحدة فقط', 'يعمل في الخادم فقط'],
      ['It refetches automatically when userId changes and exposes value, isLoading and error as signals', 'It saves the data to localStorage', 'It fetches only once', 'It only works on the server'],
      ['userId değişince otomatik yeniden çeker ve value, isLoading ve error’ı signal olarak sunar', 'Veriyi localStorage’a kaydeder', 'Sadece bir kez çeker', 'Sadece sunucuda çalışır']), answer: 0,
    why: W('ويلغي الطلب القديم عند تغيّر المعامل قبل انتهائه. وhttpResource نسخة مبنية على HttpClient.', 'It also cancels the previous request if the parameter changes before it finishes. httpResource is a version built on HttpClient.', 'Parametre bitmeden değişirse önceki isteği de iptal eder. httpResource, HttpClient üzerine kurulu bir sürümdür.') }),
  choice({ ...a, id: 'a-s2-provide-http', level: 'senior',
    prompt: W('في تطبيق standalone، أين يُفعَّل HttpClient مع الـ interceptors؟', 'In a standalone app, where is HttpClient enabled with interceptors?', 'Standalone bir uygulamada HttpClient interceptor’larla nerede etkinleştirilir?'),
    options: {

      ar: ['bootstrapApplication(App, { providers: [provideHttpClient(withInterceptors([auth]), withFetch())] })', 'imports: [HttpClientModule] في كل مكوّن', 'new HttpClient() داخل main.ts', 'window.HttpClient = …'],

      en: ['bootstrapApplication(App, { providers: [provideHttpClient(withInterceptors([auth]), withFetch())] })', 'imports: [HttpClientModule] in every component', 'new HttpClient() in main.ts', 'window.HttpClient = …'],

      tr: ['bootstrapApplication(App, { providers: [provideHttpClient(withInterceptors([auth]), withFetch())] })', 'Her bileşende imports: [HttpClientModule]', 'main.ts içinde new HttpClient()', 'window.HttpClient = …'],

    }, answer: 0, codeLang: 'ts',
    why: W('دوال provide* تستبدل الوحدات القديمة. وwithFetch يستخدم fetch بدل XHR، وهو الأنسب مع SSR.', 'provide* functions replace the old modules. withFetch uses fetch instead of XHR, which suits SSR best.', 'provide* fonksiyonları eski modüllerin yerini alır. withFetch, XHR yerine fetch kullanır; SSR için en uygunudur.') }),
]
