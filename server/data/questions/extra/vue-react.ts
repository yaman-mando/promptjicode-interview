import type { Question } from '#shared/types/quiz'
import { WHAT_LOGS, choice } from '../helpers'

export const VUE_REACT: Question[] = [
  // ───────── Vue · Junior ─────────
  choice({
    id: 'v-j-v-on-short', level: 'junior', topic: 'vue',
    prompt: {
      ar: 'ما الاختصار الصحيح لـ v-on:click في Vue؟',
      en: 'What is the shorthand for v-on:click in Vue?',
      tr: 'Vue’da v-on:click’in kısaltması nedir?',
    },
    options: ['@click', ':click', '#click', '(click)'],
    answer: 0,
    why: {
      ar: '@ اختصار v-on للأحداث، و: اختصار v-bind للخصائص، و# اختصار v-slot. أما (click) فصيغة Angular.',
      en: '@ is short for v-on (events), : is short for v-bind (attributes) and # is short for v-slot. (click) is Angular syntax.',
      tr: '@ v-on’un (olaylar), : v-bind’ın (öznitelikler), # ise v-slot’un kısaltmasıdır. (click) Angular söz dizimidir.',
    },
  }),
  choice({
    id: 'v-j-v-bind-short', level: 'junior', topic: 'vue',
    prompt: {
      ar: 'تريد أن يأخذ الرابط قيمته من المتغير url. أي سطر صحيح؟',
      en: 'You want the link to take its value from the variable url. Which line is right?',
      tr: 'Bağlantının değerini url değişkeninden almasını istiyorsun. Hangi satır doğru?',
    },
    options: ['<a :href="url">', '<a href="url">', '<a href="{{ url }}">', '<a @href="url">'],
    answer: 0,
    codeLang: 'html',
    why: {
      ar: ':href (اختصار v-bind:href) يقيّم url كتعبير JavaScript. بدون النقطتين تصبح القيمة النص "url" حرفيًا، و{{ }} لا تعمل داخل الخصائص في Vue.',
      en: ':href (short for v-bind:href) evaluates url as JavaScript. Without the colon the value is the literal text "url", and {{ }} does not work inside attributes in Vue.',
      tr: ':href (v-bind:href kısaltması) url’i JavaScript ifadesi olarak değerlendirir. İki nokta olmadan değer düz "url" metni olur; Vue’da {{ }} öznitelik içinde çalışmaz.',
    },
  }),
  choice({
    id: 'v-j-v-model', level: 'junior', topic: 'vue',
    prompt: {
      ar: 'ماذا يفعل v-model في هذا الحقل؟',
      en: 'What does v-model do on this input?',
      tr: 'Bu input’taki v-model ne yapar?',
    },
    code: `<script setup>
import { ref } from 'vue'
const name = ref('')
</script>

<template>
  <input v-model="name">
  <p>Hello {{ name }}</p>
</template>`,
    codeLang: 'vue',
    options: {
      ar: ['يربط الحقل بـ name في الاتجاهين، فيتحدث النص أثناء الكتابة', 'يعرض name مرة واحدة فقط', 'يمنع الكتابة في الحقل', 'يرسل الحقل إلى الخادم'],
      en: ['It binds the input to name both ways, so the text updates as you type', 'It shows name once only', 'It stops typing in the input', 'It sends the input to the server'],
      tr: ['Input’u name’e iki yönlü bağlar; yazdıkça metin güncellenir', 'name’i sadece bir kez gösterir', 'Input’a yazmayı engeller', 'Input’u sunucuya gönderir'],
    },
    answer: 0,
    why: {
      ar: 'v-model يجمع بين :value و@input: يضع قيمة name في الحقل، ويحدّث name عند كل كتابة، فيتغير «Hello …» مباشرة.',
      en: 'v-model combines :value and @input: it puts name into the input and updates name on every keystroke, so "Hello …" changes live.',
      tr: 'v-model, :value ile @input’u birleştirir: name’i input’a koyar ve her tuşta name’i günceller; "Hello …" anında değişir.',
    },
  }),
  choice({
    id: 'v-j-ref-in-template', level: 'junior', topic: 'vue',
    prompt: {
      ar: 'في <script setup> عرّفت const count = ref(0). كيف تعرضه في الـ template؟',
      en: 'In <script setup> you have const count = ref(0). How do you show it in the template?',
      tr: '<script setup> içinde const count = ref(0) var. Template’te nasıl gösterirsin?',
    },
    options: ['{{ count }}', '{{ count.value }}', '{{ count() }}', '{{ this.count }}'],
    answer: 0,
    why: {
      ar: 'الـ template يفكّ الـ ref تلقائيًا، فتكتب {{ count }}. أما في كود JavaScript داخل <script> فتحتاج count.value.',
      en: 'Templates unwrap refs for you, so you write {{ count }}. Inside the <script> code you still need count.value.',
      tr: 'Template ref’leri otomatik açar, {{ count }} yazarsın. <script> içindeki kodda ise count.value gerekir.',
    },
  }),
  choice({
    id: 'v-j-emit-up', level: 'junior', topic: 'vue',
    prompt: {
      ar: 'كيف يخبر الـ component الابنُ أباه أن المستخدم ضغط «حفظ»؟',
      en: 'How should a child component tell its parent that the user pressed "Save"?',
      tr: 'Alt component, kullanıcının "Kaydet"e bastığını üst component’e nasıl bildirmeli?',
    },
    options: {
      ar: ['يرسل حدثًا: emit(\'save\')، والأب يستمع بـ @save', 'يغيّر قيمة الـ prop مباشرة', 'يكتب في متغير عام على window', 'يستدعي دالة الأب عبر this.$parent دائمًا'],
      en: ['It emits an event: emit(\'save\'), and the parent listens with @save', 'It changes the prop directly', 'It writes to a global variable on window', 'It always calls the parent through this.$parent'],
      tr: ['Bir olay gönderir: emit(\'save\'); üst component @save ile dinler', 'Prop’u doğrudan değiştirir', 'window üzerinde global bir değişkene yazar', 'Her zaman this.$parent ile üstün fonksiyonunu çağırır'],
    },
    answer: 0,
    why: {
      ar: 'القاعدة: البيانات تنزل عبر props، والأحداث تصعد عبر emit. الـ props للقراءة فقط في الابن، و$parent يربط المكوّنين ببعض بشكل هش.',
      en: 'The rule: data goes down through props, events go up through emit. Props are read-only in the child, and $parent ties the two components together in a fragile way.',
      tr: 'Kural: veri props ile aşağı iner, olaylar emit ile yukarı çıkar. Props alt component’te salt okunurdur; $parent ise iki component’i kırılgan biçimde birbirine bağlar.',
    },
  }),
  choice({
    id: 'v-j-v-for-key', level: 'junior', topic: 'vue',
    prompt: {
      ar: 'لماذا نضيف :key في v-for؟',
      en: 'Why do we add :key in v-for?',
      tr: 'v-for’da neden :key ekleriz?',
    },
    code: `<li v-for="todo in todos" :key="todo.id">
  {{ todo.text }}
</li>`,
    codeLang: 'vue',
    options: {
      ar: ['ليعرف Vue كل عنصر، فيحدّث القائمة بشكل صحيح عند الإضافة والحذف والترتيب', 'لترتيب العناصر', 'لتلوين العناصر', 'لأن v-for لا يعمل بدونه أبدًا'],
      en: ['So Vue can tell items apart and update the list correctly when items are added, removed or reordered', 'To sort the items', 'To style the items', 'Because v-for never works without it'],
      tr: ['Vue öğeleri ayırt edebilsin ve ekleme, silme, sıralamada listeyi doğru güncellesin diye', 'Öğeleri sıralamak için', 'Öğeleri renklendirmek için', 'Çünkü v-for onsuz hiç çalışmaz'],
    },
    answer: 0,
    why: {
      ar: 'بدون key يعيد Vue استخدام العناصر حسب ترتيبها، فقد تبقى حالة حقل إدخال أو checkbox مرتبطة بالعنصر الخطأ بعد الحذف. استخدم معرّفًا ثابتًا مثل id، لا الفهرس.',
      en: 'Without a key, Vue reuses elements by position, so an input or checkbox state can stick to the wrong item after a delete. Use a stable id, not the index.',
      tr: 'key olmadan Vue elemanları sıraya göre yeniden kullanır; silmeden sonra bir input veya checkbox durumu yanlış öğede kalabilir. İndeks değil, id gibi sabit bir değer kullan.',
    },
  }),
  choice({
    id: 'v-j-v-if-else', level: 'junior', topic: 'vue',
    prompt: {
      ar: 'ماذا يظهر عندما تكون loading = false و error = \'Oops\'؟',
      en: 'What shows when loading = false and error = \'Oops\'?',
      tr: 'loading = false ve error = \'Oops\' iken ne görünür?',
    },
    code: `<p v-if="loading">Loading…</p>
<p v-else-if="error">{{ error }}</p>
<p v-else>Done</p>`,
    codeLang: 'vue',
    options: ['Oops', 'Loading…', 'Done', 'Oops Done'],
    answer: 0,
    why: {
      ar: 'v-if وv-else-if وv-else سلسلة واحدة: يظهر أول فرع شرطه صحيح فقط. loading خاطئة، وerror فيه نص، فيظهر Oops.',
      en: 'v-if, v-else-if and v-else form one chain: only the first branch whose condition is true is shown. loading is false and error has text, so Oops shows.',
      tr: 'v-if, v-else-if ve v-else tek bir zincirdir: koşulu doğru olan ilk dal gösterilir. loading false, error’da metin var; Oops görünür.',
    },
  }),

  // ───────── Vue · Mid ─────────
  choice({
    id: 'v-m-watch-lazy', level: 'mid', topic: 'vue',
    prompt: WHAT_LOGS,
    code: `const id = ref(1)

watch(id, (value) => {
  console.log('load', value)
})

id.value = 2`,
    codeLang: 'js',
    options: {
      ar: ["'load 2' فقط", "'load 1' ثم 'load 2'", "لا شيء", "'load 1' فقط"],
      en: ["only 'load 2'", "'load 1' then 'load 2'", "nothing", "only 'load 1'"],
      tr: ["sadece 'load 2'", "önce 'load 1', sonra 'load 2'", "hiçbir şey", "sadece 'load 1'"],
    },
    answer: 0,
    why: {
      ar: 'watch كسول افتراضيًا: لا يعمل عند الإنشاء، بل عند أول تغيير فقط. لتشغيله فورًا بالقيمة الحالية أضف { immediate: true } أو استخدم watchEffect.',
      en: 'watch is lazy by default: it does not run when created, only on the first change. To run it right away with the current value, add { immediate: true } or use watchEffect.',
      tr: 'watch varsayılan olarak tembeldir: oluşturulunca değil, ilk değişiklikte çalışır. Mevcut değerle hemen çalışması için { immediate: true } ekle ya da watchEffect kullan.',
    },
  }),
  choice({
    id: 'v-m-provide-inject', level: 'mid', topic: 'vue',
    prompt: {
      ar: 'تريد تمرير المستخدم الحالي من App إلى component بعمق 5 مستويات، دون تمريره عبر props في كل مستوى. ما الأداة المناسبة في Vue؟',
      en: 'You want to pass the current user from App to a component 5 levels down without passing props at every level. Which Vue tool fits?',
      tr: 'Mevcut kullanıcıyı App’ten 5 seviye aşağıdaki bir component’e, her seviyede prop geçmeden iletmek istiyorsun. Hangi Vue aracı uygun?',
    },
    options: ['provide / inject', 'v-model', 'emit', 'v-slot'],
    answer: 0,
    why: {
      ar: 'provide في الأعلى وinject في أي component تحته، فتتجنب «prop drilling». وإذا مرّرت ref تبقى القيمة reactive. للحالة المشتركة الكبيرة يمكن استخدام Pinia.',
      en: 'provide at the top and inject in any component below avoids "prop drilling". Pass a ref and it stays reactive. For larger shared state, use Pinia.',
      tr: 'Üstte provide, altındaki herhangi bir component’te inject; böylece "prop drilling" olmaz. ref geçirirsen reaktif kalır. Büyük ortak durum için Pinia kullanılabilir.',
    },
  }),

  // ───────── Vue · Senior ─────────
  choice({
    id: 'v-s-key-reset', level: 'senior', topic: 'vue',
    prompt: {
      ar: 'ماذا يحدث للـ component عندما تتغير قيمة userId؟',
      en: 'What happens to the component when userId changes?',
      tr: 'userId değişince component’e ne olur?',
    },
    code: `<UserForm :key="userId" :user-id="userId" />`,
    codeLang: 'vue',
    options: {
      ar: ['يُحذف ويُنشأ component جديد بحالة نظيفة', 'تتحدث الـ prop فقط وتبقى الحالة الداخلية', 'لا يحدث شيء', 'يظهر خطأ لأن key للقوائم فقط'],
      en: ['It is destroyed and a fresh component is created with clean state', 'Only the prop updates; inner state stays', 'Nothing happens', 'An error, because key is only for lists'],
      tr: ['Yok edilir ve temiz durumla yeni bir component oluşturulur', 'Sadece prop güncellenir, iç durum kalır', 'Hiçbir şey olmaz', 'Hata olur, çünkü key sadece listeler içindir'],
    },
    answer: 0,
    why: {
      ar: 'تغيير key يجعل Vue يعتبره component مختلفًا: يحذف القديم ويركّب جديدًا، فتُعاد حقول النموذج وحالته من البداية. طريقة بسيطة لتصفير نموذج عند الانتقال لمستخدم آخر.',
      en: 'A new key makes Vue treat it as a different component: it unmounts the old one and mounts a new one, so the form state starts over. A simple way to reset a form when switching users.',
      tr: 'Yeni key, Vue’nun onu farklı bir component saymasını sağlar: eskisini kaldırır, yenisini takar; form durumu sıfırdan başlar. Kullanıcı değişince formu sıfırlamanın basit yolu.',
    },
  }),
  choice({
    id: 'v-s-define-model', level: 'senior', topic: 'vue',
    prompt: {
      ar: 'لكي يعمل <MyInput v-model="text" /> في Vue 3، ماذا يحتاج المكوّن MyInput؟',
      en: 'For <MyInput v-model="text" /> to work in Vue 3, what does MyInput need?',
      tr: 'Vue 3’te <MyInput v-model="text" /> çalışması için MyInput neye ihtiyaç duyar?',
    },
    options: {
      ar: ['prop باسم modelValue وحدث update:modelValue (أو defineModel())', 'prop باسم value وحدث input', 'prop باسم v-model', 'لا شيء، يعمل تلقائيًا'],
      en: ['A modelValue prop and an update:modelValue event (or defineModel())', 'A value prop and an input event', 'A prop called v-model', 'Nothing, it works automatically'],
      tr: ['modelValue prop’u ve update:modelValue olayı (veya defineModel())', 'value prop’u ve input olayı', 'v-model adında bir prop', 'Hiçbir şey, kendiliğinden çalışır'],
    },
    answer: 0,
    why: {
      ar: 'في Vue 3 يتحول v-model على component إلى :modelValue و@update:modelValue. أما value وinput فكانت في Vue 2. ومنذ Vue 3.4 يختصر defineModel() كل ذلك بسطر واحد.',
      en: 'In Vue 3, v-model on a component becomes :modelValue and @update:modelValue. value and input were Vue 2. Since Vue 3.4, defineModel() does it all in one line.',
      tr: 'Vue 3’te component üzerindeki v-model, :modelValue ve @update:modelValue’ya dönüşür. value ve input Vue 2’deydi. Vue 3.4’ten beri defineModel() bunu tek satırda yapar.',
    },
  }),

  // ───────── React · Junior ─────────
  choice({
    id: 'r-j-classname', level: 'junior', topic: 'react',
    prompt: {
      ar: 'كيف تضيف CSS class لعنصر في JSX؟',
      en: 'How do you add a CSS class to an element in JSX?',
      tr: 'JSX’te bir elemana CSS class’ı nasıl eklenir?',
    },
    options: ['<div className="card">', '<div class="card">', '<div :class="card">', '<div cssClass="card">'],
    answer: 0,
    codeLang: 'jsx',
    why: {
      ar: 'class كلمة محجوزة في JavaScript، لذلك يستخدم JSX الاسم className (وhtmlFor بدل for).',
      en: 'class is a reserved word in JavaScript, so JSX uses className (and htmlFor instead of for).',
      tr: 'class JavaScript’te ayrılmış bir kelimedir; JSX bu yüzden className (ve for yerine htmlFor) kullanır.',
    },
  }),
  choice({
    id: 'r-j-props-readonly', level: 'junior', topic: 'react',
    prompt: {
      ar: 'هل يجوز للـ component أن يغيّر الـ props التي وصلته؟',
      en: 'May a component change the props it receives?',
      tr: 'Bir component aldığı props’u değiştirebilir mi?',
    },
    code: `function Title({ text }) {
  text = text.toUpperCase();
  return <h1>{text}</h1>;
}`,
    codeLang: 'jsx',
    options: {
      ar: ['لا، الـ props للقراءة فقط. لتغيير القيمة استخدم state أو اطلب من الأب تغييرها', 'نعم، وهذه أفضل طريقة', 'نعم، والأب يتحدث تلقائيًا', 'فقط في class components'],
      en: ['No, props are read-only. Use state, or ask the parent to change the value', 'Yes, that is the best way', 'Yes, and the parent updates too', 'Only in class components'],
      tr: ['Hayır, props salt okunurdur. State kullan ya da değişikliği üst component’ten iste', 'Evet, en iyi yol budur', 'Evet, üst component de güncellenir', 'Sadece class component’lerde'],
    },
    answer: 0,
    why: {
      ar: 'الـ props يملكها الأب. هنا أُعيد تعيين متغير محلي فقط، فلا يتأثر الأب. الأوضح أن تكتب const upper = text.toUpperCase(). وتغيير كائن داخل props يسبّب أخطاء يصعب تتبعها.',
      en: 'Props belong to the parent. Here only a local variable is reassigned, so the parent is not affected. Clearer: const upper = text.toUpperCase(). Mutating an object inside props causes bugs that are hard to trace.',
      tr: 'Props üst component’e aittir. Burada sadece yerel değişken yeniden atanıyor, üst etkilenmez. Daha açık olanı: const upper = text.toUpperCase(). Props içindeki bir nesneyi değiştirmek izlenmesi zor hatalara yol açar.',
    },
  }),
  choice({
    id: 'r-j-state-snapshot', level: 'junior', topic: 'react',
    prompt: {
      ar: 'count يبدأ من 0. ماذا يُطبع عند أول ضغطة؟',
      en: 'count starts at 0. What is logged on the first click?',
      tr: 'count 0’dan başlıyor. İlk tıklamada konsola ne yazılır?',
    },
    code: `const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count);
}`,
    codeLang: 'jsx',
    options: ['0', '1', 'undefined', 'NaN'],
    answer: 0,
    why: {
      ar: 'setCount لا يغيّر المتغير count في هذا الـ render، بل يطلب render جديدًا بالقيمة 1. داخل نفس الدالة يبقى count هو 0.',
      en: 'setCount does not change count in this render. It asks for a new render with 1. Inside the same function, count is still 0.',
      tr: 'setCount bu render’daki count’u değiştirmez; 1 değeriyle yeni bir render ister. Aynı fonksiyon içinde count hâlâ 0’dır.',
    },
  }),
  choice({
    id: 'r-j-onclick-call', level: 'junior', topic: 'react',
    prompt: {
      ar: 'ما المشكلة في هذا السطر؟',
      en: 'What is wrong with this line?',
      tr: 'Bu satırdaki sorun nedir?',
    },
    code: `<button onClick={save()}>Save</button>`,
    codeLang: 'jsx',
    options: {
      ar: ['save تُستدعى أثناء الـ render وليس عند الضغط', 'لا مشكلة', 'يجب أن تكون onclick بحروف صغيرة', 'الأزرار لا تقبل onClick'],
      en: ['save runs during render, not on click', 'Nothing is wrong', 'It must be lowercase onclick', 'Buttons do not accept onClick'],
      tr: ['save tıklamada değil, render sırasında çalışır', 'Sorun yok', 'onclick küçük harfle yazılmalı', 'Butonlar onClick kabul etmez'],
    },
    answer: 0,
    why: {
      ar: 'save() بين الأقواس تُنفَّذ فورًا ويُمرَّر ناتجها إلى onClick. مرّر الدالة نفسها: onClick={save}، أو onClick={() => save(id)} إذا احتجت معاملات.',
      en: 'save() with parentheses runs right away and its result is passed to onClick. Pass the function itself: onClick={save}, or onClick={() => save(id)} if you need arguments.',
      tr: 'Parantezli save() hemen çalışır ve sonucu onClick’e verilir. Fonksiyonun kendisini ver: onClick={save}, parametre gerekirse onClick={() => save(id)}.',
    },
  }),
  choice({
    id: 'r-j-fragment', level: 'junior', topic: 'react',
    prompt: {
      ar: 'تريد أن يرجع الـ component عنصرين متجاورين دون إضافة div زائد. ماذا تستخدم؟',
      en: 'You want a component to return two sibling elements without an extra div. What do you use?',
      tr: 'Bir component’in fazladan div eklemeden yan yana iki eleman döndürmesini istiyorsun. Ne kullanırsın?',
    },
    options: {
      ar: ['<>…</> (Fragment)', '<span>…</span>', 'return [<h1/>, <p/>] بدون key', '<template>…</template>'],
      en: ['<>…</> (Fragment)', '<span>…</span>', 'return [<h1/>, <p/>] without keys', '<template>…</template>'],
      tr: ['<>…</> (Fragment)', '<span>…</span>', 'key’siz return [<h1/>, <p/>]', '<template>…</template>'],
    },
    answer: 0,
    codeLang: 'jsx',
    why: {
      ar: 'الـ Fragment (<>…</> أو <React.Fragment>) يجمع العناصر دون إضافة عنصر إلى الـ DOM. <template> صيغة Vue، والمصفوفة تحتاج key لكل عنصر.',
      en: 'A Fragment (<>…</> or <React.Fragment>) groups elements without adding a DOM node. <template> is Vue, and an array needs a key on each element.',
      tr: 'Fragment (<>…</> veya <React.Fragment>) DOM’a eleman eklemeden grup oluşturur. <template> Vue’dur, dizi ise her elemanda key ister.',
    },
  }),
  choice({
    id: 'r-j-list-key', level: 'junior', topic: 'react',
    prompt: {
      ar: 'React يعطي تحذيرًا في الـ console لهذا الكود. ما الناقص؟',
      en: 'React shows a console warning for this code. What is missing?',
      tr: 'React bu kod için konsolda uyarı veriyor. Eksik olan ne?',
    },
    code: `<ul>
  {users.map(user => <li>{user.name}</li>)}
</ul>`,
    codeLang: 'jsx',
    options: {
      ar: ['key={user.id} على <li>', 'id={user.id}', 'return داخل map', 'useState'],
      en: ['key={user.id} on <li>', 'id={user.id}', 'a return inside map', 'useState'],
      tr: ['<li> üzerinde key={user.id}', 'id={user.id}', 'map içinde return', 'useState'],
    },
    answer: 0,
    why: {
      ar: 'كل عنصر في قائمة يحتاج key فريدًا وثابتًا، ليعرف React أي عنصر تغيّر أو حُذف. الدالة السهمية بدون أقواس {} ترجع القيمة تلقائيًا، فلا ينقص return.',
      en: 'Every item in a list needs a unique, stable key so React knows which item changed or was removed. An arrow function without {} returns automatically, so no return is missing.',
      tr: 'Listedeki her öğe benzersiz ve sabit bir key ister; böylece React hangisinin değiştiğini veya silindiğini bilir. {} olmayan ok fonksiyonu otomatik döndürür, return eksik değil.',
    },
  }),
  choice({
    id: 'r-j-and-false', level: 'junior', topic: 'react',
    prompt: {
      ar: 'ماذا يظهر عندما تكون isAdmin = false؟',
      en: 'What renders when isAdmin is false?',
      tr: 'isAdmin false iken ne görünür?',
    },
    code: `<nav>
  <Link to="/">Home</Link>
  {isAdmin && <Link to="/admin">Admin</Link>}
</nav>`,
    codeLang: 'jsx',
    options: {
      ar: ['رابط Home فقط', 'Home والنص false', 'Home وAdmin', 'خطأ'],
      en: ['Only the Home link', 'Home and the text false', 'Home and Admin', 'An error'],
      tr: ['Sadece Home bağlantısı', 'Home ve false metni', 'Home ve Admin', 'Hata'],
    },
    answer: 0,
    why: {
      ar: 'false && … يعطي false، وReact لا يعرض true وfalse وnull وundefined. لكن احذر من الرقم 0: {count && …} يعرض 0 على الشاشة.',
      en: 'false && … gives false, and React renders nothing for true, false, null and undefined. Watch out for 0 though: {count && …} shows a 0 on the screen.',
      tr: 'false && … false verir; React true, false, null ve undefined için hiçbir şey göstermez. Ama 0’a dikkat: {count && …} ekranda 0 gösterir.',
    },
  }),

  // ───────── React · Mid ─────────
  choice({
    id: 'r-m-controlled-no-onchange', level: 'mid', topic: 'react',
    prompt: {
      ar: 'ماذا يحدث عندما يحاول المستخدم الكتابة في هذا الحقل؟',
      en: 'What happens when the user tries to type in this input?',
      tr: 'Kullanıcı bu input’a yazmaya çalışınca ne olur?',
    },
    code: `const [name, setName] = useState('Sara');

return <input value={name} />;`,
    codeLang: 'jsx',
    options: {
      ar: ['النص لا يتغير، وReact يحذّر من حقل value بدون onChange', 'النص يتغير بشكل طبيعي', 'يتغير name تلقائيًا', 'الحقل يختفي'],
      en: ['The text does not change, and React warns about value without onChange', 'The text changes normally', 'name updates automatically', 'The input disappears'],
      tr: ['Metin değişmez; React onChange olmadan value kullanıldığı için uyarır', 'Metin normal şekilde değişir', 'name otomatik güncellenir', 'Input kaybolur'],
    },
    answer: 0,
    why: {
      ar: 'الحقل «controlled»: قيمته تأتي دائمًا من name، ولا شيء يغيّر name. أضف onChange={e => setName(e.target.value)}، أو استخدم defaultValue إن أردته غير متحكَّم به.',
      en: 'The input is controlled: its value always comes from name, and nothing changes name. Add onChange={e => setName(e.target.value)}, or use defaultValue for an uncontrolled input.',
      tr: 'Input kontrollüdür: değeri hep name’den gelir ve name’i değiştiren bir şey yok. onChange={e => setName(e.target.value)} ekle ya da kontrolsüz input için defaultValue kullan.',
    },
  }),
]
