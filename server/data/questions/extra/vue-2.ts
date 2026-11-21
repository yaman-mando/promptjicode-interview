import type { Question } from '#shared/types/quiz'
import { choice } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const topic = 'vue' as const
const v = { codeLang: 'vue' as const, topic }

export const VUE_2: Question[] = [
  // ───────── Junior ─────────
  choice({ ...v, id: 'v-j2-for-index', level: 'junior',
    prompt: W('كيف تحصل على رقم العنصر داخل v-for؟', 'How do you get the item’s index inside v-for?', 'v-for içinde öğenin sırasını nasıl alırsın?'),
    options: ['<li v-for="(item, i) in items" :key="item.id">{{ i }}</li>', '<li v-for="item in items, i">', '<li v-for="i of items.index">', '<li v-for="item in items" :index="i">'], answer: 0,
    why: W('المعامل الثاني هو الرقم. لكن لا تستخدمه كـ key إذا كان ترتيب القائمة يتغير.', 'The second parameter is the index. Do not use it as the key if the list order can change.', 'İkinci parametre sıradır. Liste sırası değişebiliyorsa onu key olarak kullanma.') }),
  choice({ ...v, id: 'v-j2-class-object', level: 'junior',
    prompt: W('كيف تضيف class="active" فقط عندما يكون isActive صحيحًا؟', 'How do you add class="active" only when isActive is true?', 'class="active"’i yalnızca isActive doğruysa nasıl eklersin?'),
    options: [`<li :class="{ active: isActive }">`, `<li class="isActive ? active">`, `<li v-class="active: isActive">`, `<li :class="active if isActive">`], answer: 0,
    why: W('كائن الـ class يضيف المفتاح عندما تكون قيمته صحيحة، ويمكن دمجه مع class ثابتة على نفس العنصر.', 'The class object adds each key whose value is truthy, and it merges with a static class on the same element.', 'Class nesnesi değeri doğru olan her anahtarı ekler ve aynı öğedeki sabit class ile birleşir.') }),
  choice({ ...v, id: 'v-j2-computed', level: 'junior',
    prompt: W('ما الأنسب لعرض الاسم الكامل من firstName وlastName؟', 'What fits best for showing a full name from firstName and lastName?', 'firstName ve lastName’den tam adı göstermek için en uygunu?'),
    options: ["const fullName = computed(() => `${first.value} ${last.value}`)", "const fullName = ref(first.value + ' ' + last.value)", "watch(first, () => fullName = …)", "let fullName = first + ' ' + last"], answer: 0, codeLang: 'js',
    why: W('computed تتحدث تلقائيًا عند تغير مصادرها وتُحفظ نتيجتها. أما ref بهذه الطريقة فتأخذ القيمة مرة واحدة فقط.', 'A computed updates automatically when its sources change and caches the result. A ref written that way only captures the value once.', 'computed kaynakları değişince otomatik güncellenir ve sonucu önbelleğe alır. O şekilde yazılan ref değeri yalnızca bir kez alır.') }),
  choice({ ...v, id: 'v-j2-define-props', level: 'junior',
    prompt: W('كيف يستقبل مكوّن title كـ prop في <script setup>؟', 'How does a component receive title as a prop in <script setup>?', '<script setup>’ta bir bileşen title’ı prop olarak nasıl alır?'),
    options: ["const props = defineProps({ title: String })", "const props = useProps(['title'])", "export const title = prop()", "this.props.title"], answer: 0, codeLang: 'js',
    why: W('defineProps ماكرو لا يحتاج import. ومع TypeScript: defineProps<{ title: string }>().', 'defineProps is a compiler macro that needs no import. With TypeScript: defineProps<{ title: string }>().', 'defineProps import gerektirmeyen bir derleyici makrosudur. TypeScript ile: defineProps<{ title: string }>().') }),
  choice({ ...v, id: 'v-j2-prevent', level: 'junior',
    prompt: W('ماذا تفعل .prevent هنا؟', 'What does .prevent do here?', 'Buradaki .prevent ne yapar?'),
    code: `<form @submit.prevent="save">`,
    options: L3(['تستدعي event.preventDefault() فلا تُعاد تحميل الصفحة عند الإرسال', 'تمنع استدعاء save', 'تمنع الضغط المزدوج', 'تجعل النموذج إلزاميًا'],
      ['It calls event.preventDefault(), so submitting does not reload the page', 'It prevents save from being called', 'It prevents double clicks', 'It makes the form required'],
      ['event.preventDefault() çağırır; gönderim sayfayı yenilemez', 'save’in çağrılmasını engeller', 'Çift tıklamayı engeller', 'Formu zorunlu yapar']), answer: 0,
    why: W('معدّلات الأحداث مثل .prevent و.stop و.once تختصر كودًا متكررًا داخل الدوال.', 'Event modifiers like .prevent, .stop and .once save repeated code inside handlers.', '.prevent, .stop ve .once gibi olay değiştiricileri işleyicilerdeki tekrarlayan kodu kısaltır.') }),
  choice({ ...v, id: 'v-j2-model-trim', level: 'junior',
    prompt: W('المستخدم يكتب اسمه مع مسافات زائدة في البداية والنهاية. ما الأبسط؟', 'Users type their name with extra spaces at the start and end. Simplest fix?', 'Kullanıcılar adlarını başta ve sonda fazla boşlukla yazıyor. En basit çözüm?'),
    options: ['<input v-model.trim="name">', '<input v-model="name.trim()">', '<input v-trim="name">', '<input :value="name" trim>'], answer: 0,
    why: W('.trim يحذف المسافات تلقائيًا، و.number يحوّل القيمة لرقم، و.lazy يحدّث عند change بدل كل حرف.', '.trim strips the spaces automatically, .number converts to a number, and .lazy updates on change instead of on every key.', '.trim boşlukları otomatik siler, .number sayıya çevirir, .lazy her tuş yerine change’de günceller.') }),
  choice({ ...v, id: 'v-j2-v-html', level: 'junior',
    prompt: W('ما الفرق بين هذين السطرين إذا كان comment يحتوي <b>Hi</b>؟', 'What is the difference between these two lines if comment contains <b>Hi</b>?', 'comment <b>Hi</b> içeriyorsa bu iki satırın farkı ne?'),
    code: `<p>{{ comment }}</p>
<p v-html="comment"></p>`,
    options: L3(['الأول يعرض النص كما هو بأمان، والثاني ينفّذ HTML فيكون خطرًا مع محتوى المستخدمين', 'لا فرق', 'الأول لا يعمل', 'الثاني أكثر أمانًا'],
      ['The first shows the text as is, safely; the second renders HTML, which is dangerous with user content', 'No difference', 'The first does not work', 'The second is safer'],
      ['İlki metni olduğu gibi güvenle gösterir; ikincisi HTML’i çalıştırır, kullanıcı içeriğiyle tehlikelidir', 'Fark yok', 'İlki çalışmaz', 'İkincisi daha güvenli']), answer: 0,
    why: W('{{ }} يرمّز المحتوى تلقائيًا. v-html فقط لمحتوى موثوق، أو بعد تنقيته بمكتبة مثل DOMPurify.', '{{ }} escapes content automatically. Use v-html only for trusted content, or after sanitising with a library like DOMPurify.', '{{ }} içeriği otomatik escape eder. v-html’i yalnızca güvenilir içerik için ya da DOMPurify gibi bir kütüphaneyle temizledikten sonra kullan.') }),
  choice({ ...v, id: 'v-j2-scoped', level: 'junior',
    prompt: W('ماذا يعني scoped هنا؟', 'What does scoped mean here?', 'Buradaki scoped ne demek?'),
    code: `<style scoped>
.title { color: red; }
</style>`,
    options: L3(['القواعد تطبَّق على عناصر هذا المكوّن فقط، لا على .title في مكوّنات أخرى', 'القواعد تعمل في كل الصفحة', 'تُحمَّل CSS لاحقًا', 'تمنع استخدام class'],
      ['The rules apply only to this component’s elements, not to .title in other components', 'The rules apply page-wide', 'The CSS loads later', 'Classes are forbidden'],
      ['Kurallar yalnızca bu bileşenin öğelerine uygulanır, diğer bileşenlerdeki .title’a değil', 'Kurallar tüm sayfada geçerli', 'CSS sonra yüklenir', 'class kullanmak yasak']), answer: 0,
    why: W('Vue يضيف خاصية فريدة مثل data-v-1a2b لعناصر المكوّن. للوصول لعنصر داخل مكوّن ابن استخدم :deep().', 'Vue adds a unique attribute like data-v-1a2b to the component’s elements. To reach inside a child component, use :deep().', 'Vue bileşenin öğelerine data-v-1a2b gibi benzersiz bir öznitelik ekler. Alt bileşenin içine ulaşmak için :deep() kullan.') }),
  choice({ ...v, id: 'v-j2-on-mounted', level: 'junior',
    prompt: W('تريد التركيز على حقل البحث عند ظهور المكوّن. أين يوضع الكود؟', 'You want to focus the search box when the component appears. Where does the code go?', 'Bileşen görününce arama kutusuna odaklanmak istiyorsun. Kod nereye?'),
    options: {

      ar: ['onMounted(() => input.value.focus())', 'في أعلى <script setup> مباشرة', 'computed(() => input.value.focus())', 'onBeforeMount(() => input.value.focus())'],

      en: ['onMounted(() => input.value.focus())', 'Straight at the top of <script setup>', 'computed(() => input.value.focus())', 'onBeforeMount(() => input.value.focus())'],

      tr: ['onMounted(() => input.value.focus())', 'Doğrudan <script setup>’ın başında', 'computed(() => input.value.focus())', 'onBeforeMount(() => input.value.focus())'],

    }, answer: 0, codeLang: 'js',
    why: W('عناصر DOM لا توجد إلا بعد التركيب (mounted). وفي SSR لا يعمل onMounted على الخادم أصلًا.', 'DOM elements only exist after mounting. With SSR, onMounted does not run on the server at all.', 'DOM öğeleri ancak mount’tan sonra var olur. SSR’da onMounted sunucuda hiç çalışmaz.') }),
  choice({ ...v, id: 'v-j2-slot', level: 'junior',
    prompt: W('كيف يعرض المكوّن BaseCard المحتوى الموضوع بين وسميه؟', 'How does BaseCard render the content placed between its tags?', 'BaseCard, etiketleri arasına konan içeriği nasıl gösterir?'),
    code: `<BaseCard>
  <p>Hello</p>
</BaseCard>`,
    options: ['<div class="card"><slot /></div>', '<div class="card">{{ children }}</div>', '<div class="card" v-html="content"></div>', '<div class="card"><BaseCard /></div>'], answer: 0,
    why: W('<slot /> مكان المحتوى القادم من الأب، ويمكن وضع محتوى افتراضي داخله يظهر عند عدم تمرير شيء.', '<slot /> is where content from the parent goes; you can put default content inside it for when nothing is passed.', '<slot /> üst bileşenden gelen içeriğin yeridir; hiçbir şey geçilmezse görünecek varsayılan içerik koyabilirsin.') }),
  choice({ ...v, id: 'v-j2-disabled', level: 'junior',
    prompt: W('كيف تعطّل الزر أثناء الحفظ؟', 'How do you disable the button while saving?', 'Kaydederken butonu nasıl devre dışı bırakırsın?'),
    options: ['<button :disabled="saving">Save</button>', '<button disabled="saving">Save</button>', '<button v-disabled>Save</button>', '<button :disabled="{{ saving }}">Save</button>'], answer: 0,
    why: W('بدون النقطتين تكون القيمة النص "saving" فيبقى الزر معطلًا دائمًا. ولا تُستخدم {{ }} داخل الخصائص.', 'Without the colon the value is the text "saving", so the button is always disabled. {{ }} is never used inside attributes.', 'İki nokta olmadan değer "saving" metnidir ve buton hep devre dışı kalır. Özniteliklerin içinde {{ }} kullanılmaz.') }),
  choice({ ...v, id: 'v-j2-plain-let', level: 'junior',
    prompt: W('لماذا لا يتغير الرقم على الشاشة عند الضغط؟', 'Why does the number on screen not change when clicked?', 'Tıklanınca ekrandaki sayı neden değişmiyor?'),
    code: `<script setup>
let count = 0
function add() { count++ }
</script>
<template><button @click="add">{{ count }}</button></template>`,
    options: L3(['count متغير عادي غير تفاعلي؛ استخدم const count = ref(0) وcount.value++', 'add لا تُستدعى', 'يجب استخدام var', 'الزر لا يقبل @click'],
      ['count is a plain, non-reactive variable; use const count = ref(0) and count.value++', 'add is never called', 'It should use var', 'Buttons do not accept @click'],
      ['count reaktif olmayan düz bir değişken; const count = ref(0) ve count.value++ kullan', 'add hiç çağrılmıyor', 'var kullanılmalı', 'Buton @click kabul etmez']), answer: 0,
    why: W('Vue يتتبع فقط القيم التفاعلية (ref وreactive وcomputed). القيمة تتغير في الذاكرة لكن الواجهة لا تعلم.', 'Vue only tracks reactive values (ref, reactive, computed). The value changes in memory but the UI never hears about it.', 'Vue yalnızca reaktif değerleri (ref, reactive, computed) izler. Değer bellekte değişir ama arayüzün haberi olmaz.') }),
  choice({ ...v, id: 'v-j2-sfc', level: 'junior',
    prompt: W('ما الأقسام الثلاثة المعتادة في ملف .vue؟', 'What are the three usual sections of a .vue file?', 'Bir .vue dosyasının olağan üç bölümü nedir?'),
    options: ['<template>, <script setup>, <style>', '<html>, <head>, <body>', '<view>, <model>, <controller>', '<div>, <js>, <css>'], answer: 0,
    why: W('ملف المكوّن الواحد (SFC) يجمع الشكل والمنطق والتنسيق في مكان واحد، وكل قسم اختياري.', 'A single-file component (SFC) keeps markup, logic and styles together; each section is optional.', 'Tek dosyalık bileşen (SFC) işaretleme, mantık ve stili bir arada tutar; her bölüm isteğe bağlıdır.') }),

  // ───────── Mid ─────────
  choice({ ...v, id: 'v-m2-watch-effect', level: 'mid',
    prompt: W('ما الفرق بين watch وwatchEffect؟', 'What is the difference between watch and watchEffect?', 'watch ile watchEffect arasındaki fark nedir?'),
    options: L3(['watchEffect يعمل فورًا ويتتبع تلقائيًا كل ما يقرؤه، وwatch يراقب مصدرًا محددًا ويعطي القيمة القديمة والجديدة', 'لا فرق', 'watch أسرع دائمًا', 'watchEffect للـ props فقط'],
      ['watchEffect runs immediately and auto-tracks whatever it reads; watch observes a specific source and gives old and new values', 'No difference', 'watch is always faster', 'watchEffect is only for props'],
      ['watchEffect hemen çalışır ve okuduğu her şeyi otomatik izler; watch belirli bir kaynağı izler ve eski ile yeni değeri verir', 'Fark yok', 'watch her zaman daha hızlı', 'watchEffect sadece props için']), answer: 0,
    why: W('watch أوضح عندما تريد التحكم بما يُراقب، أو تحتاج القيمة القديمة، أو تريده كسولًا (لا يعمل فورًا).', 'watch is clearer when you want control over what is watched, need the old value, or want it lazy (not running immediately).', 'Neyin izlendiğini kontrol etmek, eski değere ihtiyaç duymak ya da tembel (hemen çalışmayan) olmasını istemek durumunda watch daha nettir.') }),
  choice({ ...v, id: 'v-m2-composable', level: 'mid',
    prompt: W('منطق تتبع موضع الفأرة مكرر في 3 مكوّنات. ما الطريقة في Vue 3؟', 'Mouse-position tracking logic is repeated in 3 components. The Vue 3 way?', 'Fare konumu izleme mantığı 3 bileşende tekrarlanıyor. Vue 3 yolu?'),
    options: {

      ar: ['export function useMouse() { const x = ref(0); …; return { x, y } }', 'mixins: [MouseMixin]', 'window.mouse = reactive({})', 'نسخ الكود في كل مكوّن'],

      en: ['export function useMouse() { const x = ref(0); …; return { x, y } }', 'mixins: [MouseMixin]', 'window.mouse = reactive({})', 'Copy the code into each component'],

      tr: ['export function useMouse() { const x = ref(0); …; return { x, y } }', 'mixins: [MouseMixin]', 'window.mouse = reactive({})', 'Kodu her bileşene kopyalamak'],

    }, answer: 0, codeLang: 'js',
    why: W('الـ composable دالة تجمع الحالة والتأثيرات وتُعيدها، بأصل واضح لكل قيمة، بدل mixins التي تتعارض أسماؤها.', 'A composable is a function that bundles state and effects and returns them, with a clear source for each value, unlike mixins whose names collide.', 'Composable, durumu ve etkileri toplayıp döndüren bir fonksiyondur; her değerin kaynağı nettir, adları çakışan mixin’lerin aksine.') }),
  choice({ ...v, id: 'v-m2-named-slots', level: 'mid',
    prompt: W('كيف تملأ منطقة header في مكوّن Layout؟', 'How do you fill the header area of a Layout component?', 'Layout bileşeninin header alanını nasıl doldurursun?'),
    code: `<!-- Layout.vue -->
<header><slot name="header" /></header>
<main><slot /></main>`,
    options: ['<Layout><template #header><h1>Title</h1></template>…</Layout>', '<Layout header="<h1>Title</h1>">', '<Layout><h1 slot="header">Title</h1></Layout> (Vue 3)', '<Layout v-slot="header">'], answer: 0,
    why: W('#header اختصار لـ v-slot:header. وما يوضع خارج أي template يذهب للـ slot الافتراضي.', '#header is short for v-slot:header. Anything outside a template goes to the default slot.', '#header, v-slot:header’ın kısaltmasıdır. Bir template dışındaki her şey varsayılan slot’a gider.') }),
  choice({ ...v, id: 'v-m2-scoped-slot', level: 'mid',
    prompt: W('مكوّن DataTable يمرر كل صف للأب ليحدد شكله. كيف يستقبله الأب؟', 'A DataTable passes each row to the parent so it decides how it looks. How does the parent receive it?', 'DataTable her satırı görünümüne karar versin diye üst bileşene geçiriyor. Üst bileşen nasıl alır?'),
    code: `<!-- DataTable.vue -->
<tr v-for="row in rows" :key="row.id"><slot name="row" :row="row" /></tr>`,
    options: ['<DataTable><template #row="{ row }"><td>{{ row.name }}</td></template></DataTable>', '<DataTable :row="row">', '<DataTable @row="row => …">', '<DataTable><td>{{ rows.name }}</td></DataTable>'], answer: 0,
    why: W('الـ scoped slot يجعل المكوّن الابن يملك المنطق (الترتيب، الترقيم) والأب يملك الشكل.', 'A scoped slot lets the child own the logic (sorting, paging) and the parent own the look.', 'Scoped slot mantığın (sıralama, sayfalama) alt bileşende, görünümün üst bileşende kalmasını sağlar.') }),
  choice({ ...v, id: 'v-m2-template-ref', level: 'mid',
    prompt: W('كيف تصل لعنصر input في <script setup> (Vue 3.5+)؟', 'How do you reach an input element in <script setup> (Vue 3.5+)?', '<script setup>’ta bir input öğesine nasıl ulaşırsın (Vue 3.5+)?'),
    code: `<input ref="search">`,
    options: ["const search = useTemplateRef('search')", "const search = document.getElementById('search')", "const search = this.$refs.search", "const search = defineRef('search')"], answer: 0, codeLang: 'js',
    why: W('useTemplateRef يعطي ref مرتبطًا بالعنصر، وقيمته null حتى التركيب. وقبل 3.5: ref(null) بنفس اسم الخاصية.', 'useTemplateRef gives a ref bound to the element, null until mounted. Before 3.5: a ref(null) with the same name as the attribute.', 'useTemplateRef öğeye bağlı bir ref verir; mount’a kadar null’dır. 3.5 öncesi: öznitelikle aynı adlı bir ref(null).') }),
  choice({ ...v, id: 'v-m2-multi-model', level: 'mid',
    prompt: W('كيف تربط قيمتين (العنوان والوصف) بمكوّن واحد عبر v-model؟', 'How do you bind two values (title and description) to one component with v-model?', 'İki değeri (başlık ve açıklama) tek bir bileşene v-model ile nasıl bağlarsın?'),
    options: ['<PostForm v-model:title="title" v-model:body="body" />', '<PostForm v-model="[title, body]" />', '<PostForm v-model="title" v-model="body" />', '<PostForm :model="{ title, body }" />'], answer: 0,
    why: W('كل v-model مسمّى يقابله defineModel(\'title\') وdefineModel(\'body\') داخل المكوّن.', 'Each named v-model maps to defineModel(\'title\') and defineModel(\'body\') inside the component.', 'Her adlandırılmış v-model bileşen içindeki defineModel(\'title\') ve defineModel(\'body\')’ye karşılık gelir.') }),
  choice({ ...v, id: 'v-m2-store-to-refs', level: 'mid',
    prompt: W('لماذا لا يتحدث count في الواجهة بعد التفكيك من متجر Pinia؟', 'Why does count not update in the UI after destructuring it from a Pinia store?', 'Pinia deposundan parçaladıktan sonra count arayüzde neden güncellenmiyor?'),
    code: `const store = useCartStore()
const { count } = store`,
    options: ['const { count } = storeToRefs(store)', 'const count = store.count.value', 'const { count } = reactive(store)', 'const count = computed(store)'], answer: 0,
    why: W('التفكيك يأخذ القيمة الحالية ويفقد التفاعل. storeToRefs يحوّل الحالة والـ getters إلى refs، أما الدوال فتُفكك مباشرة.', 'Destructuring takes the current value and loses reactivity. storeToRefs turns state and getters into refs; actions can be destructured directly.', 'Parçalamak mevcut değeri alır ve reaktifliği kaybeder. storeToRefs durum ve getter’ları ref’e çevirir; action’lar doğrudan parçalanabilir.') }),
  choice({ ...v, id: 'v-m2-keep-alive', level: 'mid',
    prompt: W('المستخدم يبدّل بين تبويبين، ويريد ألا يضيع ما كتبه في النموذج. ما الحل؟', 'The user switches between two tabs and does not want to lose what they typed in a form. The fix?', 'Kullanıcı iki sekme arasında geçiyor ve formda yazdıklarını kaybetmek istemiyor. Çözüm?'),
    options: ['<KeepAlive><component :is="currentTab" /></KeepAlive>', '<component :is="currentTab" v-once />', '<Teleport to="body">', '<Suspense>'], answer: 0,
    why: W('KeepAlive يحتفظ بالمكوّن في الذاكرة بدل إزالته، مع onActivated وonDeactivated. حدّد العدد بـ max.', 'KeepAlive keeps the component in memory instead of unmounting it, with onActivated and onDeactivated. Cap it with max.', 'KeepAlive bileşeni kaldırmak yerine bellekte tutar; onActivated ve onDeactivated ile. max ile sınırla.') }),
  choice({ ...v, id: 'v-m2-teleport', level: 'mid',
    prompt: W('نافذة منبثقة داخل مكوّن عميق تتأثر بـ overflow وz-index أبائها. ما الحل؟', 'A modal deep inside a component is affected by its parents’ overflow and z-index. The fix?', 'Derindeki bir bileşenin içindeki modal üst öğelerin overflow ve z-index’inden etkileniyor. Çözüm?'),
    options: ['<Teleport to="body"><Modal /></Teleport>', '<KeepAlive><Modal /></KeepAlive>', '<Modal v-show="open" />', 'z-index: 99999'], answer: 0,
    why: W('Teleport يرسم المحتوى في مكان آخر من DOM مع بقاء منطقه وprops في المكوّن الأصلي.', 'Teleport renders the content elsewhere in the DOM while its logic and props stay in the original component.', 'Teleport içeriği DOM’da başka bir yerde çizer; mantığı ve props’u asıl bileşende kalır.') }),
  choice({ ...v, id: 'v-m2-computed-pure', level: 'mid',
    prompt: W('ما المشكلة في هذا الـ computed؟', 'What is wrong with this computed?', 'Bu computed’ın sorunu ne?'),
    code: `const total = computed(() => {
  fetch('/api/log')
  return items.value.length
})`,
    options: L3(['الـ computed يجب أن يكون نقيًا بلا آثار جانبية؛ الطلبات مكانها watch أو الأحداث', 'لا مشكلة', 'length لا تعمل', 'يجب إرجاع وعد'],
      ['A computed must be pure, with no side effects; requests belong in a watch or an event', 'No problem', 'length does not work', 'It should return a promise'],
      ['computed saf olmalı, yan etkisiz; istekler watch’a ya da olaylara aittir', 'Sorun yok', 'length çalışmaz', 'Promise döndürmeli']), answer: 0,
    why: W('Vue يقرر متى يُعاد حساب computed (وقد لا يحسبه أصلًا إن لم يُقرأ)، فالآثار الجانبية فيه غير متوقعة.', 'Vue decides when a computed re-runs (and may not run it at all if nobody reads it), so side effects in it are unpredictable.', 'Vue computed’ın ne zaman yeniden hesaplanacağına karar verir (okunmazsa hiç hesaplamayabilir); içindeki yan etkiler öngörülemez.') }),
  choice({ ...v, id: 'v-m2-async-component', level: 'mid',
    prompt: W('محرر نصوص ثقيل يظهر فقط عند الضغط على «تعديل». كيف تؤجل تحميل كوده؟', 'A heavy text editor shows only when "Edit" is clicked. How do you defer loading its code?', 'Ağır bir metin editörü yalnızca "Düzenle"ye basınca görünüyor. Kodunun yüklenmesini nasıl ertelersin?'),
    options: ["const Editor = defineAsyncComponent(() => import('./Editor.vue'))", "import Editor from './Editor.vue'", "const Editor = lazy('./Editor.vue')", "<Editor v-if=\"false\" />"], answer: 0, codeLang: 'js',
    why: W('الملف يصبح حزمة منفصلة لا تُنزَّل إلا عند أول عرض للمكوّن. وفي Nuxt يكفي اسم Lazy قبل اسم المكوّن.', 'The file becomes a separate chunk downloaded only when the component first renders. In Nuxt, prefixing the name with Lazy is enough.', 'Dosya, bileşen ilk çizildiğinde inen ayrı bir parçaya dönüşür. Nuxt’ta adın önüne Lazy eklemek yeterlidir.') }),
  choice({ ...v, id: 'v-m2-transition', level: 'mid',
    prompt: W('ما الذي يحتاجه هذا الكود ليظهر العنصر ويختفي بتلاشٍ؟', 'What does this code need for the element to fade in and out?', 'Bu kodun öğeyi solarak gösterip gizlemesi için neye ihtiyacı var?'),
    code: `<Transition name="fade">
  <p v-if="show">Saved</p>
</Transition>`,
    options: {

      ar: ['.fade-enter-active, .fade-leave-active { transition: opacity .3s } .fade-enter-from, .fade-leave-to { opacity: 0 }', '.fade { animation: fade .3s }', 'v-show بدل v-if فقط', 'لا شيء، يعمل تلقائيًا'],

      en: ['.fade-enter-active, .fade-leave-active { transition: opacity .3s } .fade-enter-from, .fade-leave-to { opacity: 0 }', '.fade { animation: fade .3s }', 'Just v-show instead of v-if', 'Nothing, it works automatically'],

      tr: ['.fade-enter-active, .fade-leave-active { transition: opacity .3s } .fade-enter-from, .fade-leave-to { opacity: 0 }', '.fade { animation: fade .3s }', 'Sadece v-if yerine v-show', 'Hiçbir şey, otomatik çalışır'],

    }, answer: 0,
    why: W('Transition يضيف ويزيل classes بحسب name في اللحظات المناسبة، وأنت تكتب الحركة بـ CSS.', 'Transition adds and removes classes based on name at the right moments; you write the motion in CSS.', 'Transition, name’e göre sınıfları doğru anlarda ekler ve kaldırır; hareketi CSS ile sen yazarsın.') }),
  choice({ ...v, id: 'v-m2-define-emits', level: 'mid',
    prompt: W('ما فائدة تعريف الأحداث بـ defineEmits؟', 'What do you gain by declaring events with defineEmits?', 'Olayları defineEmits ile tanımlamanın faydası nedir?'),
    code: `const emit = defineEmits<{ save: [id: number] }>()`,
    options: L3(['توثيق ما يطلقه المكوّن، والتحقق من الأنواع، وفصل الأحداث عن السمات التي تُمرر للعنصر الجذري', 'لا فائدة', 'يجعل الأحداث أسرع', 'يمنع الأب من الاستماع'],
      ['It documents what the component emits, type-checks it, and separates events from attributes passed down to the root element', 'Nothing', 'It makes events faster', 'It stops the parent from listening'],
      ['Bileşenin ne yaydığını belgeler, tipleri denetler ve olayları kök öğeye aktarılan özniteliklerden ayırır', 'Hiçbir şey', 'Olayları hızlandırır', 'Üst bileşenin dinlemesini engeller']), answer: 0,
    why: W('حدث غير معرّف يُعامل كسمة ويُضاف للعنصر الجذري، فقد يُستدعى المستمع مرتين مع أحداث DOM الأصلية مثل click.', 'An undeclared event is treated as an attribute and lands on the root element, so a listener might fire twice with native DOM events like click.', 'Tanımlanmamış bir olay öznitelik sayılır ve kök öğeye eklenir; click gibi yerel DOM olaylarıyla dinleyici iki kez tetiklenebilir.') }),

  // ───────── Senior ─────────
  choice({ ...v, id: 'v-s2-proxy-new-prop', level: 'senior',
    prompt: W('في Vue 3، هل تتحدث الواجهة عند إضافة خاصية جديدة لكائن reactive؟', 'In Vue 3, does the UI update when you add a new property to a reactive object?', 'Vue 3’te reactive bir nesneye yeni özellik eklenince arayüz güncellenir mi?'),
    code: `const user = reactive({ name: 'Ali' })
user.age = 30`,
    options: L3(['نعم، لأن Vue 3 يستخدم Proxy الذي يلتقط الخصائص الجديدة (لا حاجة لـ Vue.set)', 'لا، تحتاج Vue.set', 'فقط بعد nextTick', 'فقط مع ref'],
      ['Yes, Vue 3 uses a Proxy that catches new properties (no need for Vue.set)', 'No, it needs Vue.set', 'Only after nextTick', 'Only with ref'],
      ['Evet, Vue 3 yeni özellikleri yakalayan Proxy kullanır (Vue.set gerekmez)', 'Hayır, Vue.set gerekir', 'Sadece nextTick’ten sonra', 'Sadece ref ile']), answer: 0,
    why: W('Vue 2 كان يستخدم Object.defineProperty فلا يرى الخصائص الجديدة. هذا من أهم أسباب الترقية.', 'Vue 2 used Object.defineProperty and could not see new properties. This is one of the big reasons to upgrade.', 'Vue 2 Object.defineProperty kullanıyordu ve yeni özellikleri göremiyordu. Bu, yükseltmenin büyük nedenlerinden biridir.') }),
  choice({ ...v, id: 'v-s2-markraw', level: 'senior',
    prompt: W('تضع كائن خريطة من مكتبة خارجية (Leaflet) داخل ref فتصبح الصفحة بطيئة وتظهر أخطاء غريبة. ما الحل؟', 'You put a map object from an outside library (Leaflet) in a ref, and the page gets slow with strange errors. The fix?', 'Dış bir kütüphanenin (Leaflet) harita nesnesini bir ref’e koyuyorsun; sayfa yavaşlıyor ve garip hatalar çıkıyor. Çözüm?'),
    options: {

      ar: ['shallowRef أو markRaw(map)', 'reactive(map)', 'computed(() => map)', 'JSON.parse(JSON.stringify(map))'],

      en: ['shallowRef or markRaw(map)', 'reactive(map)', 'computed(() => map)', 'JSON.parse(JSON.stringify(map))'],

      tr: ['shallowRef ya da markRaw(map)', 'reactive(map)', 'computed(() => map)', 'JSON.parse(JSON.stringify(map))'],

    }, answer: 0,
    why: W('Vue يحوّل الكائن كله لـ Proxy عميق، وهذا مكلف ويكسر مكتبات تقارن الكائنات بالهوية. markRaw يتركه كما هو.', 'Vue turns the whole object into a deep Proxy, which is costly and breaks libraries that compare objects by identity. markRaw leaves it untouched.', 'Vue tüm nesneyi derin bir Proxy’ye çevirir; bu pahalıdır ve nesneleri kimlikle karşılaştıran kütüphaneleri bozar. markRaw onu olduğu gibi bırakır.') }),
  choice({ ...v, id: 'v-s2-flush-post', level: 'senior',
    prompt: W('watch يقرأ ارتفاع قائمة بعد إضافة عنصر، لكنه يقرأ الارتفاع القديم. ما الحل؟', 'A watch reads a list’s height after an item is added, but gets the old height. The fix?', 'Bir watch öğe eklendikten sonra listenin yüksekliğini okuyor ama eski yüksekliği alıyor. Çözüm?'),
    code: `watch(items, () => {
  console.log(listEl.value.scrollHeight)
})`,
    options: ["watch(items, fn, { flush: 'post' })", "watch(items, fn, { deep: true })", "watch(items, fn, { immediate: true })", "watch(items, fn, { once: true })"], answer: 0, codeLang: 'js',
    why: W('افتراضيًا يعمل watch قبل تحديث DOM. flush: \'post\' (أو watchPostEffect) يشغّله بعد التحديث.', 'By default a watch runs before the DOM updates. flush: \'post\' (or watchPostEffect) runs it after.', 'Varsayılan olarak watch DOM güncellenmeden önce çalışır. flush: \'post\' (ya da watchPostEffect) sonra çalıştırır.') }),
  choice({ ...v, id: 'v-s2-usefetch', level: 'senior',
    prompt: W('في صفحة Nuxt، لماذا يُفضّل useFetch على $fetch مباشرة داخل setup؟', 'In a Nuxt page, why prefer useFetch over calling $fetch directly in setup?', 'Bir Nuxt sayfasında setup içinde doğrudan $fetch yerine neden useFetch tercih edilir?'),
    options: L3(['يجلب البيانات في الخادم ويمررها للمتصفح، فلا يتكرر الطلب عند hydration', '$fetch لا يعمل في Nuxt', 'useFetch أسرع في الشبكة', 'لا فرق'],
      ['It fetches on the server and passes the data to the browser, so the request is not repeated during hydration', '$fetch does not work in Nuxt', 'useFetch is faster on the network', 'No difference'],
      ['Veriyi sunucuda alır ve tarayıcıya aktarır; hydration sırasında istek tekrarlanmaz', '$fetch Nuxt’ta çalışmaz', 'useFetch ağda daha hızlı', 'Fark yok']), answer: 0,
    why: W('$fetch في setup يعمل مرة في الخادم ومرة في المتصفح. أما $fetch فمناسب داخل الأحداث مثل إرسال نموذج.', '$fetch in setup runs once on the server and again in the browser. $fetch is fine inside events such as a form submit.', 'setup’taki $fetch bir kez sunucuda, bir kez tarayıcıda çalışır. Form gönderimi gibi olayların içinde $fetch uygundur.') }),
  choice({ ...v, id: 'v-s2-ssr-state-leak', level: 'senior',
    prompt: W('في تطبيق Nuxt، ref معرّف خارج أي دالة في ملف composable يجعل مستخدمًا يرى بيانات مستخدم آخر. لماذا؟', 'In a Nuxt app, a ref defined outside any function in a composable file makes one user see another’s data. Why?', 'Bir Nuxt uygulamasında composable dosyasında fonksiyon dışında tanımlı bir ref, bir kullanıcının başkasının verisini görmesine yol açıyor. Neden?'),
    code: `// composables/useUser.ts
const user = ref(null)
export const useUser = () => user`,
    options: L3(['المتغير يعيش في ذاكرة الخادم ويُشارَك بين كل الطلبات؛ استخدم useState(\'user\') أو Pinia', 'خطأ في المتصفح', 'ref لا يعمل في Nuxt', 'المشكلة في الكوكيز'],
      ['The variable lives in server memory and is shared by every request; use useState(\'user\') or Pinia', 'A browser bug', 'ref does not work in Nuxt', 'A cookie problem'],
      ['Değişken sunucu belleğinde yaşar ve tüm isteklerce paylaşılır; useState(\'user\') ya da Pinia kullan', 'Tarayıcı hatası', 'ref Nuxt’ta çalışmaz', 'Çerez sorunu']), answer: 0,
    why: W('في SSR يبقى الخادم يعمل بين الطلبات، فالحالة على مستوى الملف تتسرب بين المستخدمين. useState ينشئ حالة لكل طلب.', 'With SSR the server keeps running between requests, so module-level state leaks between users. useState creates state per request.', 'SSR’da sunucu istekler arasında çalışmaya devam eder; modül seviyesindeki durum kullanıcılar arasında sızar. useState istek başına durum oluşturur.') }),
  choice({ ...v, id: 'v-s2-client-only', level: 'senior',
    prompt: W('مكوّن يعرض الوقت المحلي للمستخدم يسبب hydration mismatch في Nuxt. ما الحل الأبسط؟', 'A component showing the user’s local time causes a hydration mismatch in Nuxt. The simplest fix?', 'Kullanıcının yerel saatini gösteren bir bileşen Nuxt’ta hydration mismatch’e yol açıyor. En basit çözüm?'),
    options: ['<ClientOnly><LocalTime /></ClientOnly>', '<LocalTime v-once />', '<KeepAlive><LocalTime /></KeepAlive>', '<LocalTime :key="Date.now()" />'], answer: 0,
    why: W('الخادم لا يعرف المنطقة الزمنية للمستخدم. ClientOnly يرسمه في المتصفح فقط، ويمكن وضع محتوى بديل في #fallback.', 'The server does not know the user’s time zone. ClientOnly renders it only in the browser, and you can put placeholder content in #fallback.', 'Sunucu kullanıcının saat dilimini bilmez. ClientOnly onu yalnızca tarayıcıda çizer; #fallback’e yer tutucu içerik konabilir.') }),
  choice({ ...v, id: 'v-s2-v-memo', level: 'senior',
    prompt: W('قائمة 5,000 صف، وتغيير الصف المحدد يعيد فحص كل الصفوف. ما الأداة في Vue 3.2+؟', 'A list of 5,000 rows, and changing the selected row re-checks every row. Which Vue 3.2+ tool?', '5.000 satırlık bir liste; seçili satırı değiştirmek tüm satırları yeniden kontrol ettiriyor. Vue 3.2+’da hangi araç?'),
    code: `<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">…</div>`,
    options: L3(['v-memo: يتخطى تحديث الصف إن لم تتغير القيم في المصفوفة', 'v-once', 'v-show', 'v-cloak'],
      ['v-memo: skips updating a row unless the values in the array change', 'v-once', 'v-show', 'v-cloak'],
      ['v-memo: dizideki değerler değişmedikçe satırın güncellenmesini atlar', 'v-once', 'v-show', 'v-cloak']), answer: 0,
    why: W('عند تغيير التحديد يتحدث صفان فقط بدل 5,000. لكنه تحسين دقيق؛ إن نسيت قيمة تؤثر على الصف فلن يتحدث.', 'When the selection changes only two rows update instead of 5,000. It is a precise tool: forget a value the row depends on and it will not update.', 'Seçim değişince 5.000 yerine yalnızca iki satır güncellenir. Hassas bir araçtır: satırın bağlı olduğu bir değeri unutursan güncellenmez.') }),
  choice({ ...v, id: 'v-s2-directive', level: 'senior',
    prompt: W('كيف تكتب directive مخصصًا v-focus يركّز على الحقل عند ظهوره؟', 'How do you write a custom v-focus directive that focuses the field when it appears?', 'Görününce alana odaklanan özel bir v-focus direktifini nasıl yazarsın?'),
    options: ['const vFocus = { mounted: el => el.focus() }', 'const vFocus = () => document.activeElement', "app.component('v-focus', …)", 'const vFocus = ref(true)'], answer: 0, codeLang: 'js',
    why: W('في <script setup> أي متغير يبدأ بـ v يصبح directive. استخدمها للعمل المباشر على DOM فقط، والباقي بمكوّنات أو composables.', 'In <script setup> any variable starting with v becomes a directive. Use them for direct DOM work only; everything else belongs in components or composables.', '<script setup>’ta v ile başlayan her değişken direktif olur. Yalnızca doğrudan DOM işi için kullan; gerisi bileşenlere ya da composable’lara aittir.') }),
  choice({ ...v, id: 'v-s2-scope-dispose', level: 'senior',
    prompt: W('composable يضيف مستمعًا على window. كيف يضمن إزالته حتى لو استُخدم خارج مكوّن (داخل effectScope)؟', 'A composable adds a window listener. How does it ensure removal even when used outside a component (inside an effectScope)?', 'Bir composable window’a dinleyici ekliyor. Bileşen dışında (bir effectScope içinde) kullanılsa bile kaldırılmasını nasıl garanti eder?'),
    options: {

      ar: ["onScopeDispose(() => window.removeEventListener('resize', fn))", "onUnmounted(() => …) فقط", "setTimeout(remove, 0)", "لا حاجة للإزالة"],

      en: ["onScopeDispose(() => window.removeEventListener('resize', fn))", "Only onUnmounted(() => …)", "setTimeout(remove, 0)", "No removal needed"],

      tr: ["onScopeDispose(() => window.removeEventListener('resize', fn))", "Sadece onUnmounted(() => …)", "setTimeout(remove, 0)", "Kaldırmaya gerek yok"],

    }, answer: 0, codeLang: 'js',
    why: W('onScopeDispose يعمل عند انتهاء أي نطاق تأثيرات، ومنه المكوّن نفسه، فهو أعم من onUnmounted.', 'onScopeDispose runs when any effect scope ends, the component’s included, so it is more general than onUnmounted.', 'onScopeDispose, bileşeninki dahil herhangi bir etki kapsamı bitince çalışır; onUnmounted’dan daha geneldir.') }),
  choice({ ...v, id: 'v-s2-define-expose', level: 'senior',
    prompt: W('الأب يحاول استدعاء formRef.value.reset() لمكوّن يستخدم <script setup>، فيكون reset غير معرّف. لماذا؟', 'The parent tries formRef.value.reset() on a component using <script setup>, and reset is undefined. Why?', 'Üst bileşen <script setup> kullanan bir bileşende formRef.value.reset() çağırıyor ve reset tanımsız. Neden?'),
    options: {

      ar: ['مكوّنات <script setup> مغلقة افتراضيًا؛ يجب defineExpose({ reset })', 'reset اسم محجوز', 'يجب استخدام $refs', 'يجب انتظار nextTick دائمًا'],

      en: ['<script setup> components are closed by default; it needs defineExpose({ reset })', 'reset is a reserved name', 'You must use $refs', 'You must always await nextTick'],

      tr: ['<script setup> bileşenleri varsayılan olarak kapalıdır; defineExpose({ reset }) gerekir', 'reset ayrılmış bir ad', '$refs kullanılmalı', 'Her zaman nextTick beklenmeli'],

    }, answer: 0,
    why: W('هذا يحمي المكوّن من اعتماد الآخرين على تفاصيله الداخلية. اكشف أقل ما يلزم، والأفضل التواصل بـ props وأحداث.', 'This protects the component from others relying on its internals. Expose as little as needed; props and events are usually better.', 'Bu, bileşeni başkalarının iç ayrıntılarına güvenmesinden korur. Gerekenin en azını aç; genelde props ve olaylar daha iyidir.') }),
  choice({ ...v, id: 'v-s2-render-fn', level: 'senior',
    prompt: W('متى تكون دالة render بـ h() أنسب من القالب؟', 'When is a render function with h() a better fit than a template?', 'h() ile render fonksiyonu ne zaman şablondan daha uygundur?'),
    options: L3(['عندما تُبنى البنية برمجيًا بشكل كبير، مثل مكوّن عنوان يختار h1 إلى h6 حسب prop', 'دائمًا، لأنها أسرع', 'للمكوّنات البسيطة فقط', 'عندما تريد CSS scoped'],
      ['When the structure is built largely in code, like a heading component that picks h1 to h6 from a prop', 'Always, they are faster', 'Only for simple components', 'When you want scoped CSS'],
      ['Yapı büyük ölçüde kodla kurulduğunda, ör. prop’a göre h1–h6 seçen bir başlık bileşeni', 'Her zaman, daha hızlıdır', 'Sadece basit bileşenler için', 'Scoped CSS istediğinde']), answer: 0,
    why: W('القوالب يحسّنها المترجم تلقائيًا وهي أوضح لمعظم الحالات. وأحيانًا <component :is> يكفي بدل render.', 'Templates are optimised by the compiler and clearer in most cases. Often <component :is> is enough instead of a render function.', 'Şablonlar derleyici tarafından optimize edilir ve çoğu durumda daha nettir. Çoğu zaman render yerine <component :is> yeterlidir.') }),
  choice({ ...v, id: 'v-s2-suspense', level: 'senior',
    prompt: W('مكوّن فيه await في أعلى <script setup>. ماذا يحتاج ليظهر مؤشر تحميل؟', 'A component has an await at the top of <script setup>. What does it need to show a loading indicator?', '<script setup>’ın başında await olan bir bileşen. Yükleme göstergesi için neye ihtiyaç var?'),
    code: `<script setup>
const posts = await $fetch('/api/posts')
</script>`,
    options: ['<Suspense><Posts /><template #fallback><Spinner /></template></Suspense>', '<KeepAlive><Posts /></KeepAlive>', '<Posts v-if="loaded" />', '<Transition><Posts /></Transition>'], answer: 0,
    why: W('await في setup يجعل المكوّن غير متزامن، ويجب أن يحيطه Suspense في مكان ما من الشجرة. (Nuxt يفعل ذلك للصفحات تلقائيًا.)', 'await in setup makes the component async, and a Suspense must wrap it somewhere up the tree. (Nuxt does this for pages automatically.)', 'setup içindeki await bileşeni asenkron yapar; ağacın yukarısında bir yerde Suspense onu sarmalıdır. (Nuxt bunu sayfalar için otomatik yapar.)') }),
  choice({ ...v, id: 'v-s2-route-guard', level: 'senior',
    prompt: W('كيف تمنع زوار غير مسجلين من فتح كل صفحات /admin في Vue Router؟', 'How do you stop logged-out visitors from opening any /admin page in Vue Router?', 'Vue Router’da giriş yapmamış ziyaretçilerin /admin sayfalarını açmasını nasıl engellersin?'),
    options: {

      ar: ["router.beforeEach(to => { if (to.meta.admin && !auth.user) return '/login' })", 'v-if="user" في كل صفحة', 'إخفاء الروابط من القائمة', 'onMounted في كل صفحة يعيد التوجيه'],

      en: ["router.beforeEach(to => { if (to.meta.admin && !auth.user) return '/login' })", 'v-if="user" on every page', 'Hide the links from the menu', 'onMounted redirect on every page'],

      tr: ["router.beforeEach(to => { if (to.meta.admin && !auth.user) return '/login' })", 'Her sayfada v-if="user"', 'Bağlantıları menüden gizlemek', 'Her sayfada onMounted ile yönlendirmek'],

    }, answer: 0, codeLang: 'js',
    why: W('الحارس العام يعمل قبل التنقل لكل المسارات من مكان واحد. وتذكّر: الحماية الحقيقية في الـ API، لأن كود الواجهة يمكن تجاوزه.', 'A global guard runs before every navigation from one place. Remember: real protection lives in the API, since frontend code can be bypassed.', 'Global koruyucu her gezinmeden önce tek bir yerden çalışır. Unutma: gerçek koruma API’dedir; ön yüz kodu atlatılabilir.') }),
  choice({ ...v, id: 'v-s2-readonly-inject', level: 'senior',
    prompt: W('تريد مشاركة حالة الإعدادات عبر provide، مع منع المكوّنات البعيدة من تعديلها مباشرة. ما الطريقة؟', 'You want to share settings state via provide while stopping distant components from editing it directly. How?', 'Ayar durumunu provide ile paylaşmak ama uzak bileşenlerin doğrudan değiştirmesini engellemek istiyorsun. Nasıl?'),
    options: ["provide('settings', { state: readonly(settings), update })", "provide('settings', settings)", "provide('settings', JSON.stringify(settings))", "provide('settings', Object.freeze(settings))"], answer: 0, codeLang: 'js',
    why: W('readonly يبقي القيمة تفاعلية للقراءة ويحذّر عند محاولة التعديل، والتغيير يمر عبر دالة واحدة معروفة.', 'readonly keeps the value reactive for reading and warns on attempts to modify; changes go through one known function.', 'readonly değeri okuma için reaktif tutar ve değiştirme girişiminde uyarır; değişiklikler bilinen tek bir fonksiyondan geçer.') }),
]
