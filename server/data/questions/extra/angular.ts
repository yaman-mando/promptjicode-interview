import type { Question } from '#shared/types/quiz'
import { WHAT_LOGS, choice } from '../helpers'

const topic = 'angular' as const

export const ANGULAR: Question[] = [
  // ───────── Junior ─────────
  choice({
    id: 'a-j-interpolation', level: 'junior', topic,
    prompt: {
      ar: 'كيف تعرض قيمة الخاصية title من الـ component داخل الـ template؟',
      en: 'How do you show the component property title in the template?',
      tr: 'Component’teki title özelliğini template içinde nasıl gösterirsin?',
    },
    options: ['{{ title }}', '[title]', '(title)', '#title'],
    answer: 0,
    why: {
      ar: 'الأقواس المزدوجة {{ }} هي interpolation: تعرض القيمة كنص وتتحدث عندما تتغير. أما [ ] فلربط خاصية في عنصر، و( ) للأحداث، و# لمتغير مرجعي في الـ template.',
      en: 'Double braces {{ }} are interpolation: they show the value as text and update when it changes. [ ] binds an element property, ( ) listens to events, and # declares a template reference variable.',
      tr: 'Çift süslü parantez {{ }} interpolation’dır: değeri metin olarak gösterir ve değiştikçe günceller. [ ] bir özelliğe bağlar, ( ) olay dinler, # ise template referans değişkeni tanımlar.',
    },
  }),
  choice({
    id: 'a-j-event-binding', level: 'junior', topic,
    prompt: {
      ar: 'كيف تستدعي الدالة save() عند الضغط على زر في Angular؟',
      en: 'How do you call save() when a button is clicked in Angular?',
      tr: 'Angular’da bir butona tıklanınca save() nasıl çağrılır?',
    },
    options: ['<button (click)="save()">', '<button [click]="save()">', '<button @click="save()">', '<button onClick={save}>'],
    answer: 0,
    codeLang: 'html',
    why: {
      ar: 'في Angular الأحداث تُكتب بين أقواس عادية: (click). أما @click فهي صيغة Vue، وonClick={save} صيغة React.',
      en: 'In Angular, events go in parentheses: (click). @click is Vue syntax and onClick={save} is React.',
      tr: 'Angular’da olaylar normal parantez içinde yazılır: (click). @click Vue, onClick={save} ise React söz dizimidir.',
    },
  }),
  choice({
    id: 'a-j-ngmodel', level: 'junior', topic,
    prompt: {
      ar: 'ما الصيغة الصحيحة لربط حقل إدخال بالخاصية name في الاتجاهين (two-way binding)؟',
      en: 'What is the right syntax to bind an input to name in both directions (two-way binding)?',
      tr: 'Bir input’u name özelliğine iki yönlü (two-way binding) bağlamanın doğru söz dizimi nedir?',
    },
    options: ['[(ngModel)]="name"', '([ngModel])="name"', '{{ ngModel }}="name"', 'v-model="name"'],
    answer: 0,
    why: {
      ar: '[( )] تُسمّى «الموزة في الصندوق»: [ ] تُدخل القيمة إلى الحقل، و( ) تستقبل التغيير منه. وتحتاج FormsModule في imports.',
      en: '[( )] is the "banana in a box": [ ] sends the value in, ( ) takes changes back. It needs FormsModule in imports.',
      tr: '[( )] "kutudaki muz" olarak bilinir: [ ] değeri içeri verir, ( ) değişikliği geri alır. imports içinde FormsModule gerekir.',
    },
  }),
  choice({
    id: 'a-j-component-decorator', level: 'junior', topic,
    prompt: {
      ar: 'أي decorator يجعل الـ class مكوّنًا (component) له template؟',
      en: 'Which decorator turns a class into a component with a template?',
      tr: 'Hangi decorator bir class’ı template’i olan bir component yapar?',
    },
    options: ['@Component', '@Injectable', '@Directive', '@Pipe'],
    answer: 0,
    why: {
      ar: '@Component يعرّف selector وtemplate وstyles. أما @Injectable فللخدمات (services)، و@Directive لسلوك بدون template، و@Pipe لتحويل القيم في الـ template.',
      en: '@Component sets the selector, template and styles. @Injectable is for services, @Directive adds behaviour without a template, and @Pipe transforms values in templates.',
      tr: '@Component selector, template ve stilleri tanımlar. @Injectable servisler içindir, @Directive template’siz davranış ekler, @Pipe ise template’te değer dönüştürür.',
    },
  }),
  choice({
    id: 'a-j-cli-generate', level: 'junior', topic,
    prompt: {
      ar: 'أي أمر في Angular CLI ينشئ component جديدًا باسم user؟',
      en: 'Which Angular CLI command creates a new component called user?',
      tr: 'Hangi Angular CLI komutu user adında yeni bir component oluşturur?',
    },
    options: ['ng generate component user', 'ng new component user', 'ng add component user', 'ng create user'],
    answer: 0,
    why: {
      ar: 'ng generate component (أو اختصارًا ng g c) ينشئ ملفات الـ component. أما ng new فينشئ مشروعًا كاملًا، وng add يضيف مكتبة.',
      en: 'ng generate component (short: ng g c) creates the component files. ng new creates a whole project and ng add installs a library.',
      tr: 'ng generate component (kısaca ng g c) component dosyalarını oluşturur. ng new tüm projeyi oluşturur, ng add ise bir kütüphane ekler.',
    },
  }),
  choice({
    id: 'a-j-control-flow-if', level: 'junior', topic,
    prompt: {
      ar: 'في Angular 17 وما بعده، كيف تعرض عنصرًا فقط إذا كانت isLoggedIn صحيحة؟',
      en: 'In Angular 17 and later, how do you show an element only when isLoggedIn is true?',
      tr: 'Angular 17 ve sonrasında bir elemanı yalnızca isLoggedIn true ise nasıl gösterirsin?',
    },
    options: ['@if (isLoggedIn) { … }', '*ngShow="isLoggedIn"', 'v-if="isLoggedIn"', '{{#if isLoggedIn}}'],
    answer: 0,
    why: {
      ar: 'الصيغة الجديدة @if مدمجة في الـ template ولا تحتاج استيراد شيء. الصيغة القديمة *ngIf ما زالت تعمل، أما *ngShow فغير موجودة.',
      en: 'The built-in @if block needs no import. The older *ngIf still works, but *ngShow does not exist.',
      tr: 'Yerleşik @if bloğu hiçbir import gerektirmez. Eski *ngIf hâlâ çalışır, ama *ngShow diye bir şey yoktur.',
    },
  }),
  choice({
    id: 'a-j-input', level: 'junior', topic,
    prompt: {
      ar: 'كيف يستقبل الـ component الابن بيانات من الأب؟',
      en: 'How does a child component receive data from its parent?',
      tr: 'Alt component, üst component’ten nasıl veri alır?',
    },
    options: ['@Input()', '@Output()', '@ViewChild()', '@HostListener()'],
    answer: 0,
    why: {
      ar: '@Input() (أو الدالة الأحدث input()) تجعل الخاصية تُمرَّر من الأب: <app-user [name]="userName">. أما @Output() فللاتجاه المعاكس: من الابن إلى الأب.',
      en: '@Input() (or the newer input()) lets the parent pass a value: <app-user [name]="userName">. @Output() is the other way, from child to parent.',
      tr: '@Input() (veya daha yeni input()) üst component’in değer geçmesini sağlar: <app-user [name]="userName">. @Output() ise tersi, alttan üste.',
    },
  }),

  // ───────── Mid ─────────
  choice({
    id: 'a-m-output-event', level: 'mid', topic,
    prompt: {
      ar: 'الابن يرسل حدثًا بـ this.saved.emit(user). في template الأب، ما اسم المتغير الذي يحمل القيمة المرسلة؟',
      en: 'The child sends an event with this.saved.emit(user). In the parent template, which variable holds the sent value?',
      tr: 'Alt component this.saved.emit(user) ile olay gönderiyor. Üst template’te gönderilen değeri hangi değişken tutar?',
    },
    code: `<app-user-form (saved)="onSaved(???)" />`,
    codeLang: 'html',
    options: ['$event', 'event', 'value', 'this.user'],
    answer: 0,
    why: {
      ar: 'في ربط الأحداث، $event هو ما مُرِّر إلى emit() (أو كائن الحدث الأصلي في عناصر الـ DOM). فتكتب (saved)="onSaved($event)".',
      en: 'In an event binding, $event is whatever was passed to emit() (or the native event for DOM elements). So you write (saved)="onSaved($event)".',
      tr: 'Olay bağlamada $event, emit()’e verilen değerdir (DOM elemanlarında ise yerel olay nesnesi). Yani (saved)="onSaved($event)" yazılır.',
    },
  }),
  choice({
    id: 'a-m-provided-in-root', level: 'mid', topic,
    prompt: {
      ar: 'ماذا يعني providedIn: \'root\' في الخدمة التالية؟',
      en: 'What does providedIn: \'root\' mean in this service?',
      tr: 'Bu serviste providedIn: \'root\' ne anlama gelir?',
    },
    code: `@Injectable({ providedIn: 'root' })
export class CartService {
  items: string[] = [];
}`,
    codeLang: 'ts',
    options: {
      ar: ['نسخة واحدة مشتركة في كل التطبيق، وتُحذف من الـ bundle إذا لم تُستخدم', 'نسخة جديدة لكل component يطلبها', 'تعمل فقط في الـ AppComponent', 'تُنشأ عند تشغيل التطبيق حتى لو لم يطلبها أحد'],
      en: ['One shared instance for the whole app, removed from the bundle if unused', 'A new instance for every component that asks for it', 'It only works in AppComponent', 'It is created at startup even if nothing uses it'],
      tr: ['Tüm uygulama için tek ortak örnek; kullanılmazsa bundle’dan çıkarılır', 'İsteyen her component için yeni bir örnek', 'Sadece AppComponent’te çalışır', 'Kimse kullanmasa bile uygulama açılırken oluşturulur'],
    },
    answer: 0,
    why: {
      ar: 'root يعني أن الـ injector الرئيسي يملك نسخة واحدة (singleton) تُشارك بين الجميع، فتبقى items نفسها في كل الصفحات. وهي tree-shakable: إن لم يحقنها أحد لا تدخل الـ bundle.',
      en: 'root means the app-wide injector holds one instance shared by everyone, so items is the same on every page. It is also tree-shakable: if nothing injects it, it is left out of the bundle.',
      tr: 'root, uygulama genelindeki injector’ın herkesin paylaştığı tek bir örnek tuttuğu anlamına gelir; items her sayfada aynıdır. Ayrıca tree-shakable’dır: kimse inject etmezse bundle’a girmez.',
    },
  }),
  choice({
    id: 'a-m-lifecycle-input', level: 'mid', topic,
    prompt: {
      ar: 'أين يكون أول مكان مضمون تتوفر فيه قيم الـ @Input() لتستخدمها مثلًا في جلب البيانات؟',
      en: 'Where is the first guaranteed place your @Input() values are set, for example to fetch data?',
      tr: '@Input() değerlerinin kesin olarak ilk hazır olduğu yer neresidir (örneğin veri çekmek için)?',
    },
    options: ['ngOnInit', 'constructor', 'ngOnDestroy', 'ngAfterViewChecked'],
    answer: 0,
    why: {
      ar: 'في الـ constructor لم يربط Angular الـ inputs بعد. تُضبط قبل أول ngOnChanges ثم يأتي ngOnInit، لذلك هو المكان المعتاد لبدء الجلب. ngAfterViewChecked يعمل بعد كل فحص للواجهة فهو متأخر ويتكرر كثيرًا، والـ constructor للحقن فقط.',
      en: 'In the constructor, Angular has not set the inputs yet. They are set before the first ngOnChanges, then ngOnInit runs, so that is the usual place to start loading. ngAfterViewChecked runs after every view check, so it is late and runs again and again. Keep the constructor for injection.',
      tr: 'Constructor’da Angular input’ları henüz atamamıştır. İlk ngOnChanges’ten önce atanırlar, sonra ngOnInit çalışır; bu yüzden veri çekmeye genelde orada başlanır. ngAfterViewChecked her görünüm kontrolünden sonra çalışır; geç kalır ve sürekli tekrarlanır. Constructor’ı inject için kullan.',
    },
  }),
  choice({
    id: 'a-m-http-cold', level: 'mid', topic,
    prompt: {
      ar: 'هل يُرسَل طلب HTTP في هذا الكود؟',
      en: 'Is an HTTP request sent by this code?',
      tr: 'Bu kod bir HTTP isteği gönderir mi?',
    },
    code: `ngOnInit() {
  const users$ = this.http.get<User[]>('/api/users');
  console.log('done');
}`,
    codeLang: 'ts',
    options: {
      ar: ['لا، لا يُرسل حتى يشترك أحد (subscribe)', 'نعم، فور استدعاء get()', 'نعم، مرتين', 'نعم، بعد انتهاء ngOnInit تلقائيًا'],
      en: ['No, nothing is sent until something subscribes', 'Yes, as soon as get() is called', 'Yes, twice', 'Yes, automatically after ngOnInit ends'],
      tr: ['Hayır, biri subscribe olana kadar gönderilmez', 'Evet, get() çağrılır çağrılmaz', 'Evet, iki kez', 'Evet, ngOnInit bittikten sonra otomatik olarak'],
    },
    answer: 0,
    why: {
      ar: 'Observable الذي يرجعه HttpClient «بارد» (cold): الطلب يبدأ عند subscribe() أو عند استخدام async pipe. وكل اشتراك جديد يرسل طلبًا جديدًا.',
      en: 'HttpClient returns a cold Observable: the request starts on subscribe() or when the async pipe uses it. Each new subscription sends a new request.',
      tr: 'HttpClient soğuk (cold) bir Observable döndürür: istek subscribe() ile ya da async pipe kullanınca başlar. Her yeni abonelik yeni bir istek gönderir.',
    },
  }),
  choice({
    id: 'a-m-async-pipe', level: 'mid', topic,
    prompt: {
      ar: 'ما الميزة الأساسية لكتابة users$ | async في الـ template بدل subscribe() يدويًا؟',
      en: 'What is the main benefit of users$ | async in the template instead of a manual subscribe()?',
      tr: 'Template’te elle subscribe() yerine users$ | async yazmanın asıl faydası nedir?',
    },
    options: {
      ar: ['يشترك ويلغي الاشتراك تلقائيًا عند حذف الـ component', 'يجعل الطلب أسرع', 'يخزّن النتيجة في localStorage', 'يمنع الأخطاء في الطلب'],
      en: ['It subscribes and unsubscribes for you when the component is destroyed', 'It makes the request faster', 'It caches the result in localStorage', 'It prevents request errors'],
      tr: ['Abone olur ve component yok edilince aboneliği kendisi iptal eder', 'İsteği hızlandırır', 'Sonucu localStorage’a kaydeder', 'İstek hatalarını engeller'],
    },
    answer: 0,
    why: {
      ar: 'async pipe يدير دورة الاشتراك كاملة، فلا يحدث تسرّب في الذاكرة عند مغادرة الصفحة، ويطلب تحديث الواجهة عند وصول قيمة جديدة.',
      en: 'The async pipe manages the whole subscription, so nothing leaks when you leave the page, and it marks the view for update when a new value arrives.',
      tr: 'async pipe aboneliği baştan sona yönetir; sayfadan çıkınca bellek sızıntısı olmaz ve yeni değer gelince görünümü güncellenmek üzere işaretler.',
    },
  }),
  choice({
    id: 'a-m-signal-read', level: 'mid', topic,
    prompt: {
      ar: 'لديك count = signal(0). كيف تقرأ قيمته؟',
      en: 'You have count = signal(0). How do you read its value?',
      tr: 'count = signal(0) var. Değerini nasıl okursun?',
    },
    options: ['count()', 'count.value', 'count.get()', 'count.current'],
    answer: 0,
    why: {
      ar: 'الـ signal دالة: تقرؤه باستدعائه count()، في الكود وفي الـ template. وتغيّره بـ set() أو update(). أما .value فهي أسلوب ref في Vue.',
      en: 'A signal is a function: you read it by calling count(), in code and in templates. You change it with set() or update(). .value is how Vue refs work.',
      tr: 'Signal bir fonksiyondur: count() diye çağırarak okursun, kodda da template’te de. set() veya update() ile değiştirirsin. .value ise Vue ref yöntemidir.',
    },
  }),
  choice({
    id: 'a-m-for-track', level: 'mid', topic,
    prompt: {
      ar: 'ما فائدة track item.id في حلقة @for؟',
      en: 'What does track item.id do in an @for loop?',
      tr: '@for döngüsündeki track item.id ne işe yarar?',
    },
    code: `@for (item of items; track item.id) {
  <app-row [item]="item" />
}`,
    codeLang: 'html',
    options: {
      ar: ['يعرّف كل عنصر، فيعيد Angular استخدام عناصر الـ DOM بدل إعادة إنشائها', 'يرتب العناصر حسب id', 'يحذف العناصر المكررة', 'يسجّل تغييرات القائمة في الـ console'],
      en: ['It identifies each item, so Angular reuses DOM elements instead of recreating them', 'It sorts items by id', 'It removes duplicates', 'It logs list changes to the console'],
      tr: ['Her öğeyi tanımlar; Angular DOM elemanlarını yeniden oluşturmak yerine tekrar kullanır', 'Öğeleri id’ye göre sıralar', 'Tekrarlananları siler', 'Liste değişikliklerini konsola yazar'],
    },
    answer: 0,
    why: {
      ar: 'track يربط كل عنصر في الـ DOM بمفتاح ثابت. عند تحديث القائمة يحرّك Angular العناصر الموجودة بدل حذفها وإنشائها من جديد، وهذا أسرع ويحافظ على حالتها. وهو مثل key في React وVue.',
      en: 'track links each DOM block to a stable key. When the list changes, Angular moves existing elements instead of destroying and rebuilding them, which is faster and keeps their state. It is like key in React and Vue.',
      tr: 'track her DOM bloğunu sabit bir anahtara bağlar. Liste değişince Angular mevcut elemanları silip baştan kurmak yerine taşır; bu daha hızlıdır ve durumlarını korur. React ve Vue’daki key gibidir.',
    },
  }),

  // ───────── Senior ─────────
  choice({
    id: 'a-s-onpush-mutation', level: 'senior', topic,
    prompt: {
      ar: 'الابن يستخدم ChangeDetectionStrategy.OnPush ويستقبل items. الأب ينفّذ الكود التالي. هل تتحدث قائمة الابن؟',
      en: 'The child uses ChangeDetectionStrategy.OnPush and receives items. The parent runs this code. Does the child’s list update?',
      tr: 'Alt component ChangeDetectionStrategy.OnPush kullanıyor ve items alıyor. Üst component bu kodu çalıştırıyor. Alttaki liste güncellenir mi?',
    },
    code: `// parent
addItem() {
  this.items.push('new');
}
// template: <app-list [items]="items" />`,
    codeLang: 'ts',
    options: {
      ar: ['لا، لأن المرجع (reference) نفسه لم يتغير', 'نعم، دائمًا', 'نعم، لكن بعد ثانية', 'تحدث خطأ في الـ console'],
      en: ['No, because the array reference did not change', 'Yes, always', 'Yes, but a second later', 'An error is logged'],
      tr: ['Hayır, çünkü dizinin referansı değişmedi', 'Evet, her zaman', 'Evet, ama bir saniye sonra', 'Konsola hata yazılır'],
    },
    answer: 0,
    why: {
      ar: 'مع OnPush يُفحص الـ component عندما يتغير مرجع input، أو يقع حدث بداخله، أو يرسل async pipe قيمة، أو تتغير signal يقرؤها. push() يغيّر المصفوفة نفسها، فيبقى المرجع كما هو. الحل: this.items = [...this.items, \'new\'].',
      en: 'With OnPush the component is checked when an input reference changes, an event fires inside it, an async pipe emits, or a signal it reads changes. push() mutates the same array, so the reference stays the same. Use this.items = [...this.items, \'new\'].',
      tr: 'OnPush’ta component; bir input referansı değişince, içinde olay olunca, async pipe değer verince ya da okuduğu bir signal değişince kontrol edilir. push() aynı diziyi değiştirir, referans aynı kalır. Çözüm: this.items = [...this.items, \'new\'].',
    },
  }),
  choice({
    id: 'a-s-computed', level: 'senior', topic,
    prompt: WHAT_LOGS,
    code: `const price = signal(10);
const total = computed(() => price() * 2);

price.set(25);
console.log(total());`,
    codeLang: 'ts',
    options: ['50', '20', '25', 'undefined'],
    answer: 0,
    why: {
      ar: 'computed يتذكّر الـ signals التي قرأها. عند تغيّر price يُعلَّم أنه قديم، ويُعاد حسابه عند القراءة التالية: 25 × 2 = 50.',
      en: 'computed tracks the signals it reads. When price changes it is marked stale and recomputed on the next read: 25 × 2 = 50.',
      tr: 'computed okuduğu signal’leri izler. price değişince eskimiş sayılır ve bir sonraki okumada yeniden hesaplanır: 25 × 2 = 50.',
    },
  }),
  choice({
    id: 'a-s-switchmap', level: 'senior', topic,
    prompt: {
      ar: 'حقل بحث يرسل طلبًا مع كل حرف. أي عامل RxJS يلغي الطلب السابق عندما يكتب المستخدم حرفًا جديدًا، حتى لا تصل نتيجة قديمة بعد الجديدة؟',
      en: 'A search box sends a request on every keystroke. Which RxJS operator cancels the previous request when a new term comes in, so an old result never lands after a new one?',
      tr: 'Bir arama kutusu her tuşta istek gönderiyor. Yeni terim gelince önceki isteği iptal eden ve eski sonucun yeniden sonra gelmesini önleyen RxJS operatörü hangisi?',
    },
    code: `this.term$.pipe(
  debounceTime(300),
  ???(term => this.api.search(term)),
)`,
    codeLang: 'ts',
    options: ['switchMap', 'mergeMap', 'concatMap', 'exhaustMap'],
    answer: 0,
    why: {
      ar: 'switchMap يلغي الاشتراك في الطلب السابق عند وصول قيمة جديدة. mergeMap يترك كل الطلبات تعمل معًا (فقد تصل النتائج بترتيب خاطئ)، وconcatMap ينتظر كل طلب بالدور، وexhaustMap يتجاهل الجديد حتى ينتهي الحالي.',
      en: 'switchMap unsubscribes from the previous request when a new value arrives. mergeMap keeps all requests running (results can land out of order), concatMap queues them, and exhaustMap ignores new ones until the current one ends.',
      tr: 'switchMap yeni değer gelince önceki isteğin aboneliğini iptal eder. mergeMap hepsini birlikte çalıştırır (sonuçlar karışık sırayla gelebilir), concatMap sıraya koyar, exhaustMap ise mevcut bitene kadar yenileri yok sayar.',
    },
  }),
  choice({
    id: 'a-s-interval-leak', level: 'senior', topic,
    prompt: {
      ar: 'ماذا يحدث لهذا الاشتراك بعد مغادرة الصفحة وحذف الـ component؟',
      en: 'What happens to this subscription after you leave the page and the component is destroyed?',
      tr: 'Sayfadan çıkıp component yok edildikten sonra bu aboneliğe ne olur?',
    },
    code: `ngOnInit() {
  interval(1000).subscribe(() => this.refresh());
}`,
    codeLang: 'ts',
    options: {
      ar: ['يستمر بالعمل كل ثانية (تسرّب في الذاكرة)', 'يتوقف تلقائيًا', 'يتوقف بعد دقيقة', 'يرمي خطأ فورًا'],
      en: ['It keeps running every second (a memory leak)', 'It stops on its own', 'It stops after a minute', 'It throws an error right away'],
      tr: ['Her saniye çalışmaya devam eder (bellek sızıntısı)', 'Kendiliğinden durur', 'Bir dakika sonra durur', 'Hemen hata fırlatır'],
    },
    answer: 0,
    why: {
      ar: 'interval لا ينتهي أبدًا، وحذف الـ component لا يلغي الاشتراكات اليدوية. أضف .pipe(takeUntilDestroyed()) أو احفظ الـ Subscription وألغه في ngOnDestroy، أو استخدم async pipe.',
      en: 'interval never completes, and destroying the component does not cancel manual subscriptions. Add .pipe(takeUntilDestroyed()), or keep the Subscription and unsubscribe in ngOnDestroy, or use the async pipe.',
      tr: 'interval hiç bitmez ve component’in yok edilmesi elle yapılan abonelikleri iptal etmez. .pipe(takeUntilDestroyed()) ekle ya da Subscription’ı saklayıp ngOnDestroy’da iptal et veya async pipe kullan.',
    },
  }),
  choice({
    id: 'a-s-standalone', level: 'senior', topic,
    prompt: {
      ar: 'ما معنى أن يكون الـ component «standalone»؟',
      en: 'What does it mean for a component to be "standalone"?',
      tr: 'Bir component’in "standalone" olması ne demektir?',
    },
    options: {
      ar: ['يعلن ما يحتاجه في imports الخاصة به، ولا يحتاج أن يُعرَّف في NgModule', 'لا يمكن استخدامه داخل component آخر', 'لا يدعم الـ dependency injection', 'يعمل خارج Angular كـ Web Component تلقائيًا'],
      en: ['It lists what it needs in its own imports and does not have to be declared in an NgModule', 'It cannot be used inside another component', 'It does not support dependency injection', 'It automatically runs outside Angular as a Web Component'],
      tr: ['İhtiyaçlarını kendi imports listesinde belirtir ve bir NgModule’de tanımlanması gerekmez', 'Başka bir component içinde kullanılamaz', 'Dependency injection desteklemez', 'Otomatik olarak Angular dışında Web Component olarak çalışır'],
    },
    answer: 0,
    why: {
      ar: 'الـ standalone component يستورد مباشرة ما يستخدمه (components وpipes وdirectives) فيصبح أوضح وأسهل للتحميل الكسول (lazy loading). وأصبح هو الافتراضي منذ Angular 19.',
      en: 'A standalone component imports what it uses (components, pipes, directives) directly, which makes it clearer and easier to lazy load. It is the default since Angular 19.',
      tr: 'Standalone component kullandığı component, pipe ve directive’leri doğrudan import eder; bu daha anlaşılır ve lazy loading için daha kolaydır. Angular 19’dan beri varsayılandır.',
    },
  }),
  choice({
    id: 'a-s-effect-batching', level: 'senior', topic,
    prompt: {
      ar: 'effect يقرأ count(). بعد التشغيل الأول، يُغيَّر count ثلاث مرات متتالية في نفس الدالة. كم مرة يعمل الـ effect بعدها؟',
      en: 'An effect reads count(). After its first run, count is set three times in a row in one function. How many times does the effect run after that?',
      tr: 'Bir effect count() okuyor. İlk çalışmasından sonra count aynı fonksiyon içinde art arda üç kez değiştiriliyor. Effect bundan sonra kaç kez çalışır?',
    },
    code: `effect(() => console.log('count is', this.count()));

increment3() {
  this.count.set(1);
  this.count.set(2);
  this.count.set(3);
}`,
    codeLang: 'ts',
    options: {
      ar: ['مرة واحدة، بالقيمة الأخيرة 3', 'ثلاث مرات: 1 ثم 2 ثم 3', 'مرة واحدة، بالقيمة 1', 'لا يعمل أبدًا'],
      en: ['Once, with the last value 3', 'Three times: 1, 2, then 3', 'Once, with the value 1', 'It never runs'],
      tr: ['Bir kez, son değer 3 ile', 'Üç kez: 1, 2, sonra 3', 'Bir kez, 1 değeriyle', 'Hiç çalışmaz'],
    },
    answer: 0,
    why: {
      ar: 'الـ effects لا تعمل فورًا مع كل set، بل تُجدول لتعمل لاحقًا (أثناء دورة change detection)، فترى القيمة الأخيرة فقط. لذلك لا تعتمد على effect لمتابعة كل تغيير وسيط.',
      en: 'Effects do not run on every set. They are scheduled to run later (during change detection), so they only see the latest value. Do not rely on an effect to catch every intermediate change.',
      tr: 'Effect’ler her set’te hemen çalışmaz; daha sonra (change detection sırasında) çalışmak üzere sıraya alınır, bu yüzden sadece son değeri görür. Her ara değişikliği yakalamak için effect’e güvenme.',
    },
  }),
]
