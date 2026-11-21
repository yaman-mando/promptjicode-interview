import type { Question } from '#shared/types/quiz'
import { choice } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const topic = 'react' as const
const r = { codeLang: 'jsx' as const, topic }

export const REACT_2: Question[] = [
  // ───────── Junior ─────────
  choice({ ...r, id: 'r-j2-curly', level: 'junior',
    prompt: W('كيف تعرض قيمة المتغير name داخل JSX؟', 'How do you show the value of name inside JSX?', 'JSX içinde name değişkeninin değerini nasıl gösterirsin?'),
    options: ['<h1>Hello {name}</h1>', '<h1>Hello ${name}</h1>', '<h1>Hello {{name}}</h1>', '<h1>Hello name</h1>'], answer: 0,
    why: W('الأقواس المفردة {} تُدخل أي تعبير JavaScript. أما {{ }} فهي صيغة Vue، و${} لنصوص القوالب.', 'Single braces {} embed any JavaScript expression. {{ }} is Vue’s syntax, and ${} is for template strings.', 'Tek süslü parantez {} herhangi bir JavaScript ifadesini yerleştirir. {{ }} Vue söz dizimidir, ${} şablon metinleri içindir.') }),
  choice({ ...r, id: 'r-j2-usestate-returns', level: 'junior',
    prompt: W('ماذا يُرجع useState؟', 'What does useState return?', 'useState ne döndürür?'),
    code: `const [count, setCount] = useState(0)`,
    options: L3(['مصفوفة من عنصرين: القيمة الحالية ودالة لتغييرها', 'القيمة فقط', 'كائنًا فيه value وset', 'وعدًا'],
      ['An array of two: the current value and a function to change it', 'Only the value', 'An object with value and set', 'A promise'],
      ['İki öğeli bir dizi: mevcut değer ve onu değiştiren fonksiyon', 'Sadece değer', 'value ve set içeren bir nesne', 'Bir promise']), answer: 0,
    why: W('لهذا نستخدم تفكيك المصفوفة ونختار الأسماء بحرية. تغيير الحالة بالدالة فقط هو ما يعيد الرسم.', 'That is why we destructure the array and pick any names. Only changing state through that function triggers a re-render.', 'Bu yüzden diziyi parçalarız ve adları serbestçe seçeriz. Yalnızca o fonksiyonla durumu değiştirmek yeniden çizim tetikler.') }),
  choice({ ...r, id: 'r-j2-ternary', level: 'junior',
    prompt: W('ما الطريقة الصحيحة لعرض «جاري التحميل» أو القائمة؟', 'What is the right way to show either "Loading" or the list?', '"Yükleniyor" ya da listeyi göstermenin doğru yolu nedir?'),
    options: ['{loading ? <Spinner /> : <List />}', '{if (loading) <Spinner /> else <List />}', '<if loading><Spinner /></if>', '{loading then <Spinner />}'], answer: 0,
    why: W('داخل JSX تُكتب التعبيرات فقط، فلا يُقبل if. استخدم المعامل الثلاثي، أو if قبل return.', 'Only expressions go inside JSX, so if is not allowed there. Use the ternary operator, or an if before return.', 'JSX içine yalnızca ifadeler yazılır, if kabul edilmez. Üçlü operatörü ya da return’den önce if kullan.') }),
  choice({ ...r, id: 'r-j2-map', level: 'junior',
    prompt: W('كيف تعرض مصفوفة users كعناصر <li>؟', 'How do you render the users array as <li> items?', 'users dizisini <li> öğeleri olarak nasıl gösterirsin?'),
    options: ['{users.map(u => <li key={u.id}>{u.name}</li>)}', '{users.forEach(u => <li>{u.name}</li>)}', '{for (const u of users) <li>{u.name}</li>}', '<li v-for="u in users">{u.name}</li>'], answer: 0,
    why: W('map تُرجع مصفوفة عناصر يعرضها React، أما forEach فتُرجع undefined فلا يظهر شيء.', 'map returns an array of elements React can render; forEach returns undefined, so nothing shows.', 'map, React’in gösterebileceği bir öğe dizisi döndürür; forEach undefined döndürür ve hiçbir şey görünmez.') }),
  choice({ ...r, id: 'r-j2-capital', level: 'junior',
    prompt: W('لماذا لا يظهر المكوّن هنا؟', 'Why does the component not show here?', 'Bileşen burada neden görünmüyor?'),
    code: `function myButton() {
  return <button>Save</button>
}
export default function App() {
  return <myButton />
}`,
    options: L3(['اسم المكوّن يجب أن يبدأ بحرف كبير؛ وإلا يعتبره React وسم HTML عاديًا', 'يجب استخدام class', 'ينقصه import React', 'الزر لا يعمل في JSX'],
      ['A component name must start with a capital letter; otherwise React treats it as a plain HTML tag', 'It must be a class', 'import React is missing', 'Buttons do not work in JSX'],
      ['Bileşen adı büyük harfle başlamalı; yoksa React onu düz HTML etiketi sayar', 'Sınıf olmalı', 'import React eksik', 'JSX’te buton çalışmaz']), answer: 0,
    why: W('<myButton /> يُحوَّل إلى عنصر HTML اسمه mybutton لا يعرفه المتصفح. سمِّه MyButton.', '<myButton /> becomes an HTML element named mybutton that the browser does not know. Name it MyButton.', '<myButton />, tarayıcının tanımadığı mybutton adlı bir HTML öğesine dönüşür. Adını MyButton yap.') }),
  choice({ ...r, id: 'r-j2-children', level: 'junior',
    prompt: W('كيف يعرض Card المحتوى الموضوع بين وسميه؟', 'How does Card render the content placed between its tags?', 'Card, etiketleri arasına konan içeriği nasıl gösterir?'),
    code: `<Card>
  <p>Hello</p>
</Card>`,
    options: ['function Card({ children }) { return <div className="card">{children}</div> }', 'function Card({ slot }) { return <div>{slot}</div> }', 'function Card() { return <div><slot /></div> }', 'function Card(props) { return <div>{props.content}</div> }'], answer: 0,
    why: W('المحتوى بين الوسمين يصل كـ props.children. أما <slot> فهي فكرة Vue وWeb Components.', 'Content between the tags arrives as props.children. <slot> is the Vue and Web Components idea.', 'Etiketler arasındaki içerik props.children olarak gelir. <slot> ise Vue ve Web Components fikridir.') }),
  choice({ ...r, id: 'r-j2-onclick-arg', level: 'junior',
    prompt: W('كيف تمرر id إلى remove عند الضغط فقط؟', 'How do you pass id to remove only when clicked?', 'id’yi remove’a yalnızca tıklanınca nasıl geçirirsin?'),
    options: ['<button onClick={() => remove(id)}>×</button>', '<button onClick={remove(id)}>×</button>', '<button onClick="remove(id)">×</button>', '<button click={remove, id}>×</button>'], answer: 0,
    why: W('الدالة السهمية تؤجل الاستدعاء حتى الضغط. أما remove(id) مباشرة فتُنفَّذ أثناء الرسم.', 'The arrow function delays the call until the click. remove(id) on its own runs during render.', 'Ok fonksiyonu çağrıyı tıklamaya kadar erteler. Doğrudan remove(id) çizim sırasında çalışır.') }),
  choice({ ...r, id: 'r-j2-style', level: 'junior',
    prompt: W('ما الصيغة الصحيحة لـ style في JSX؟', 'What is the correct style syntax in JSX?', 'JSX’te style için doğru söz dizimi nedir?'),
    options: ["<p style={{ color: 'red', fontSize: 18 }}>", '<p style="color: red; font-size: 18px">', "<p style={color: 'red'}>", "<p css={{ 'font-size': '18px' }}>"], answer: 0,
    why: W('style يأخذ كائنًا بأسماء camelCase، والأرقام تُفهم بالبكسل. القوسان: واحد للتعبير وواحد للكائن.', 'style takes an object with camelCase names, and numbers mean pixels. Two braces: one for the expression, one for the object.', 'style camelCase adlı bir nesne alır ve sayılar piksel sayılır. İki parantez: biri ifade, biri nesne için.') }),
  choice({ ...r, id: 'r-j2-single-root', level: 'junior',
    prompt: W('لماذا يعطي هذا الكود خطأ؟', 'Why does this code give an error?', 'Bu kod neden hata veriyor?'),
    code: `function Header() {
  return (
    <h1>Title</h1>
    <p>Subtitle</p>
  )
}`,
    options: L3(['يجب أن يُرجع المكوّن عنصرًا جذريًا واحدًا؛ لفّهما بـ <>…</>', 'h1 ممنوع في المكوّنات', 'ينقص key', 'الأقواس غير لازمة'],
      ['A component must return one root element; wrap them in <>…</>', 'h1 is not allowed in components', 'A key is missing', 'The parentheses are not needed'],
      ['Bileşen tek bir kök öğe döndürmeli; ikisini <>…</> ile sar', 'Bileşende h1 yasak', 'key eksik', 'Parantezler gereksiz']), answer: 0,
    why: W('JSX يتحول إلى استدعاء دالة، والدالة لا ترجع قيمتين. الـ Fragment لا يضيف عنصرًا في الصفحة.', 'JSX turns into a function call, and a function cannot return two values. A Fragment adds no element to the page.', 'JSX bir fonksiyon çağrısına dönüşür ve fonksiyon iki değer döndüremez. Fragment sayfaya öğe eklemez.') }),
  choice({ ...r, id: 'r-j2-htmlfor', level: 'junior',
    prompt: W('كيف تكتب label مربوطة بالحقل في JSX؟', 'How do you write a label tied to its field in JSX?', 'JSX’te alana bağlı bir label nasıl yazılır?'),
    options: ['<label htmlFor="email">Email</label>', '<label for="email">Email</label>', '<label forId="email">Email</label>', '<label to="email">Email</label>'], answer: 0,
    why: W('for وclass كلمتان محجوزتان في JavaScript، فأصبحتا htmlFor وclassName في JSX.', 'for and class are reserved words in JavaScript, so JSX uses htmlFor and className.', 'for ve class JavaScript’te ayrılmış sözcüklerdir; JSX’te htmlFor ve className olurlar.') }),
  choice({ ...r, id: 'r-j2-effect-timing', level: 'junior',
    prompt: W('متى يُنفَّذ الكود داخل useEffect؟', 'When does the code inside useEffect run?', 'useEffect içindeki kod ne zaman çalışır?'),
    code: `useEffect(() => {
  document.title = title
}, [title])`,
    options: L3(['بعد رسم المكوّن على الشاشة، ثم كلما تغيّر title', 'قبل الرسم دائمًا', 'مرة واحدة فقط عند تشغيل التطبيق', 'عند كل ضغطة زر'],
      ['After the component is painted, then whenever title changes', 'Always before rendering', 'Only once when the app starts', 'On every button click'],
      ['Bileşen ekrana çizildikten sonra, sonra title her değiştiğinde', 'Her zaman çizimden önce', 'Uygulama başlarken yalnızca bir kez', 'Her buton tıklamasında']), answer: 0,
    why: W('useEffect لمزامنة المكوّن مع شيء خارجه (العنوان، اشتراك، مؤقت)، والمصفوفة تحدد متى يُعاد تشغيله.', 'useEffect syncs the component with something outside it (the title, a subscription, a timer), and the array says when it re-runs.', 'useEffect bileşeni dışındaki bir şeyle (başlık, abonelik, zamanlayıcı) eşitler; dizi ne zaman yeniden çalışacağını söyler.') }),
  choice({ ...r, id: 'r-j2-callback-up', level: 'junior',
    prompt: W('كيف يخبر المكوّن الابن أباه أن المستخدم اختار عنصرًا؟', 'How does a child component tell its parent the user picked an item?', 'Alt bileşen, kullanıcının bir öğe seçtiğini üst bileşene nasıl bildirir?'),
    options: L3(['الأب يمرر دالة كـ prop (مثل onSelect)، والابن يستدعيها', 'الابن يغيّر props الأب', 'بمتغير عام window', 'لا يمكن ذلك في React'],
      ['The parent passes a function as a prop (like onSelect) and the child calls it', 'The child edits the parent’s props', 'Through a global window variable', 'It is impossible in React'],
      ['Üst bileşen bir fonksiyonu prop olarak geçer (onSelect gibi), alt bileşen onu çağırır', 'Alt bileşen üstün props’unu değiştirir', 'Global window değişkeniyle', 'React’te mümkün değil']), answer: 0,
    why: W('البيانات تنزل عبر props، والأحداث تصعد عبر دوال. هذا هو تدفق البيانات في اتجاه واحد.', 'Data flows down through props; events flow up through functions. That is one-way data flow.', 'Veri props ile aşağı, olaylar fonksiyonlarla yukarı akar. Tek yönlü veri akışı budur.') }),
  choice({ ...r, id: 'r-j2-updater', level: 'junior',
    prompt: W('count = 0. بعد ضغطة واحدة، كم تصبح القيمة؟', 'count = 0. After one click, what is it?', 'count = 0. Bir tıklamadan sonra kaç olur?'),
    code: `function add() {
  setCount(c => c + 1)
  setCount(c => c + 1)
}`,
    options: ['2', '1', '0', 'NaN'], answer: 0,
    why: W('دالة التحديث تأخذ أحدث قيمة في الطابور، فيُطبَّق التحديثان. أما setCount(count + 1) مرتين فتعطي 1.', 'An updater function receives the latest queued value, so both updates apply. setCount(count + 1) twice would give 1.', 'Güncelleyici fonksiyon kuyruktaki en son değeri alır; iki güncelleme de uygulanır. İki kez setCount(count + 1) 1 verirdi.') }),

  // ───────── Mid ─────────
  choice({ ...r, id: 'r-m2-lift-state', level: 'mid',
    prompt: W('مكوّنان شقيقان (فلتر وقائمة) يحتاجان نفس قيمة البحث. أين توضع الحالة؟', 'Two sibling components (a filter and a list) need the same search value. Where does the state go?', 'İki kardeş bileşen (filtre ve liste) aynı arama değerine ihtiyaç duyuyor. Durum nereye konur?'),
    options: L3(['في أقرب أب مشترك، وتُمرَّر لكليهما عبر props', 'نسخة منفصلة في كل منهما', 'في localStorage', 'في متغير خارج المكوّنات'],
      ['In their closest common parent, passed to both through props', 'A separate copy in each', 'In localStorage', 'In a variable outside the components'],
      ['En yakın ortak üst bileşende; ikisine props ile geçirilir', 'Her birinde ayrı bir kopya', 'localStorage’da', 'Bileşenlerin dışındaki bir değişkende'],
    ), answer: 0,
    why: W('«رفع الحالة» يجعل مصدر الحقيقة واحدًا. وإذا ابتعدت المكوّنات كثيرًا ففكّر في Context أو مكتبة حالة.', '"Lifting state up" keeps one source of truth. If the components are far apart, consider Context or a state library.', '"Durumu yukarı taşımak" tek bir doğruluk kaynağı sağlar. Bileşenler çok uzaksa Context ya da bir durum kütüphanesi düşün.') }),
  choice({ ...r, id: 'r-m2-missing-dep', level: 'mid',
    prompt: W('عند تغيير userId لا تُحدَّث البيانات. لماذا؟', 'When userId changes the data does not update. Why?', 'userId değişince veri güncellenmiyor. Neden?'),
    code: `useEffect(() => {
  fetchUser(userId).then(setUser)
}, [])`,
    options: L3(['userId ليس في مصفوفة الاعتماديات، فلا يُعاد تشغيل التأثير', 'fetch لا يعمل داخل useEffect', 'setUser لا يقبل دوال', 'يجب استخدام useMemo'],
      ['userId is not in the dependency array, so the effect never re-runs', 'fetch does not work in useEffect', 'setUser does not accept functions', 'useMemo must be used'],
      ['userId bağımlılık dizisinde yok; etki yeniden çalışmaz', 'fetch useEffect içinde çalışmaz', 'setUser fonksiyon kabul etmez', 'useMemo kullanılmalı']), answer: 0,
    why: W('كل قيمة من المكوّن يستخدمها التأثير يجب أن تكون في المصفوفة. قاعدة eslint ‏exhaustive-deps تكشف هذا.', 'Every component value the effect uses belongs in the array. The eslint rule exhaustive-deps catches this.', 'Etkinin kullandığı her bileşen değeri diziye girmelidir. exhaustive-deps eslint kuralı bunu yakalar.') }),
  choice({ ...r, id: 'r-m2-fetch-race', level: 'mid',
    prompt: W('المستخدم ينتقل بسرعة بين ملفات 1 ثم 2، فيظهر ملف 1 أحيانًا. ما الإصلاح داخل useEffect؟', 'The user switches quickly from profile 1 to 2, and profile 1 sometimes shows. The fix inside useEffect?', 'Kullanıcı 1. profilden 2.ye hızla geçiyor ve bazen 1. profil görünüyor. useEffect içindeki düzeltme?'),
    code: `useEffect(() => {
  let ignore = false
  fetchUser(id).then(u => { if (!ignore) setUser(u) })
  return () => { ??? }
}, [id])`,
    options: ['ignore = true', 'setUser(null)', 'id = 0', 'fetchUser.cancel = true'], answer: 0,
    why: W('عند تغيّر id تعمل دالة التنظيف للتأثير القديم، فيُتجاهل رده إن وصل متأخرًا. أو استخدم AbortController لإلغاء الطلب نفسه.', 'When id changes the old effect’s cleanup runs, so its late response is ignored. Or use AbortController to cancel the request itself.', 'id değişince eski etkinin temizliği çalışır; geç gelen yanıtı yok sayılır. Ya da isteğin kendisini iptal etmek için AbortController kullan.') }),
  choice({ ...r, id: 'r-m2-derived', level: 'mid',
    prompt: W('ما المشكلة في هذا الكود؟', 'What is wrong with this code?', 'Bu kodun sorunu ne?'),
    code: `const [first, setFirst] = useState('')
const [last, setLast] = useState('')
const [full, setFull] = useState('')
useEffect(() => setFull(first + ' ' + last), [first, last])`,
    options: L3(['full قيمة مشتقة؛ احسبها أثناء الرسم بدل حالة وتأثير يسببان رسمًا إضافيًا', 'لا مشكلة', 'ينقص key', 'يجب جمعها بـ concat'],
      ['full is derived; compute it during render instead of extra state plus an effect that causes an extra render', 'No problem', 'A key is missing', 'It should use concat'],
      ['full türetilmiş bir değer; ek render’a yol açan durum ve etki yerine çizim sırasında hesapla', 'Sorun yok', 'key eksik', 'concat kullanılmalı']), answer: 0,
    why: W('const full = first + \' \' + last يكفي. الحالة المكررة قد تخرج عن التزامن، والتأثير يرسم مرتين.', 'const full = first + \' \' + last is enough. Duplicated state can drift out of sync, and the effect renders twice.', 'const full = first + \' \' + last yeterli. Kopyalanan durum senkrondan çıkabilir ve etki iki kez çizdirir.') }),
  choice({ ...r, id: 'r-m2-usememo', level: 'mid',
    prompt: W('متى يفيد useMemo؟', 'When does useMemo help?', 'useMemo ne zaman işe yarar?'),
    code: `const sorted = useMemo(() => sortBig(rows), [rows])`,
    options: L3(['لحساب مكلف لا يتغير إلا بتغير مدخلاته، أو للحفاظ على نفس المرجع لمكوّن memo', 'لكل متغير في المكوّن', 'لجلب البيانات من الخادم', 'لتخزين البيانات بين إعادة تحميل الصفحة'],
      ['For an expensive calculation that only changes when its inputs do, or to keep the same reference for a memo component', 'For every variable in the component', 'To fetch server data', 'To keep data across page reloads'],
      ['Yalnızca girdileri değişince değişen pahalı bir hesap için ya da memo bileşene aynı referansı korumak için', 'Bileşendeki her değişken için', 'Sunucudan veri çekmek için', 'Sayfa yenilemeleri arasında veri tutmak için']), answer: 0,
    why: W('للحسابات البسيطة يكلف useMemo أكثر مما يوفر. قِس أولًا. وReact Compiler يضيفه تلقائيًا في الإصدارات الحديثة.', 'For simple calculations useMemo costs more than it saves. Measure first. React Compiler adds it automatically in recent versions.', 'Basit hesaplarda useMemo kazandırdığından fazlasına mal olur. Önce ölç. React Compiler yeni sürümlerde onu otomatik ekler.') }),
  choice({ ...r, id: 'r-m2-context-object', level: 'mid',
    prompt: W('كل المكوّنات التي تستخدم ThemeContext يُعاد رسمها عند أي تغيير في App. لماذا؟', 'Every component using ThemeContext re-renders on any change in App. Why?', 'ThemeContext kullanan tüm bileşenler App’teki her değişiklikte yeniden çiziliyor. Neden?'),
    code: `function App() {
  const [theme, setTheme] = useState('dark')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      …
    </ThemeContext.Provider>
  )
}`,
    options: L3(['الكائن { theme, setTheme } جديد في كل رسم، فيرى React قيمة مختلفة؛ ثبّته بـ useMemo', 'Context بطيء دائمًا', 'setTheme يجب أن يكون خارج المكوّن', 'ينقص key على Provider'],
      ['The object { theme, setTheme } is new on every render, so React sees a new value; stabilise it with useMemo', 'Context is always slow', 'setTheme must live outside the component', 'The Provider needs a key'],
      ['{ theme, setTheme } nesnesi her çizimde yenidir, React yeni değer görür; useMemo ile sabitle', 'Context her zaman yavaştır', 'setTheme bileşenin dışında olmalı', 'Provider’a key gerekir']), answer: 0,
    why: W('المستهلكون يُرسمون كلما تغيّر value بالمرجع. وفصل السياقات (قيمة وتحديث) يقلل الرسم أكثر.', 'Consumers re-render whenever value changes by reference. Splitting contexts (value and updater) cuts renders further.', 'Tüketiciler value referans olarak değiştikçe yeniden çizilir. Context’leri (değer ve güncelleyici) ayırmak çizimi daha da azaltır.') }),
  choice({ ...r, id: 'r-m2-default-value', level: 'mid',
    prompt: W('ما الفرق بين هذين الحقلين؟', 'What is the difference between these two fields?', 'Bu iki alan arasındaki fark nedir?'),
    code: `<input value={name} onChange={e => setName(e.target.value)} />  // A
<input defaultValue="Ali" ref={inputRef} />                       // B`,
    options: L3(['A متحكَّم به (React يملك القيمة)، وB غير متحكَّم (المتصفح يملكها وتُقرأ عبر ref)', 'لا فرق', 'B لا يقبل الكتابة', 'A يعمل بدون JavaScript'],
      ['A is controlled (React owns the value); B is uncontrolled (the DOM owns it, read via ref)', 'No difference', 'B cannot be typed in', 'A works without JavaScript'],
      ['A kontrollüdür (değer React’te); B kontrolsüzdür (değer DOM’da, ref ile okunur)', 'Fark yok', 'B’ye yazılamaz', 'A JavaScript’siz çalışır']), answer: 0,
    why: W('المتحكَّم به يسهّل التحقق الفوري والتنسيق، وغير المتحكَّم أبسط للنماذج الكبيرة (مثل react-hook-form).', 'Controlled inputs make instant validation and formatting easy; uncontrolled ones are simpler for big forms (as in react-hook-form).', 'Kontrollü girdiler anlık doğrulama ve biçimlendirmeyi kolaylaştırır; kontrolsüzler büyük formlarda daha basittir (react-hook-form gibi).') }),
  choice({ ...r, id: 'r-m2-custom-hook', level: 'mid',
    prompt: W('منطق «حالة الاتصال بالإنترنت» مكرر في 5 مكوّنات. ما الحل؟', 'The "online status" logic is repeated in 5 components. The fix?', '"Çevrimiçi durumu" mantığı 5 bileşende tekrarlanıyor. Çözüm?'),
    options: ['function useOnlineStatus() { … return isOnline }', 'class OnlineStatus extends Component', 'window.isOnline = …', 'function getOnlineStatus() { const [s] = useState(); … }  // called in a loop'], answer: 0, codeLang: 'jsx',
    why: W('الـ hook المخصص يجمع الحالة والتأثيرات ويُعاد استخدامه، واسمه يبدأ بـ use لتطبق عليه قواعد الـ Hooks.', 'A custom hook bundles state and effects for reuse, and its name starts with use so the Rules of Hooks apply.', 'Özel hook durumu ve etkileri yeniden kullanım için toplar; adı use ile başlar ki Hook kuralları uygulansın.') }),
  choice({ ...r, id: 'r-m2-strict-mode', level: 'mid',
    prompt: W('في بيئة التطوير، يُطبع «connected» مرتين عند فتح الصفحة. لماذا؟', 'In development, "connected" is logged twice when the page opens. Why?', 'Geliştirmede sayfa açılınca "connected" iki kez yazılıyor. Neden?'),
    code: `useEffect(() => {
  console.log('connected')
  const ws = connect()
  return () => ws.close()
}, [])`,
    options: L3(['StrictMode يشغّل التأثير ويُنظّفه ثم يعيده عمدًا في التطوير ليكشف نقص التنظيف', 'خطأ في React', 'المكوّن مكرر في الصفحة', 'سيحدث نفس الشيء في الإنتاج'],
      ['StrictMode deliberately runs, cleans up and re-runs effects in development to expose missing cleanup', 'A React bug', 'The component is on the page twice', 'Production will do the same'],
      ['StrictMode, eksik temizliği ortaya çıkarmak için geliştirmede etkileri bilerek çalıştırır, temizler ve yeniden çalıştırır', 'React hatası', 'Bileşen sayfada iki kez var', 'Canlıda da aynısı olur']), answer: 0,
    why: W('إن ظهرت مشكلة بسبب التشغيل المزدوج، فهي موجودة أصلًا عند إعادة تركيب المكوّن. الحل تنظيف صحيح، لا إزالة StrictMode.', 'If double running breaks something, the bug already exists on remount. The fix is proper cleanup, not removing StrictMode.', 'Çift çalıştırma bir şeyi bozuyorsa hata yeniden bağlanmada zaten vardır. Çözüm doğru temizlik, StrictMode’u kaldırmak değil.') }),
  choice({ ...r, id: 'r-m2-prevent-default', level: 'mid',
    prompt: W('عند إرسال النموذج يُعاد تحميل الصفحة كلها. ما الناقص؟', 'Submitting the form reloads the whole page. What is missing?', 'Form gönderilince tüm sayfa yeniden yükleniyor. Eksik olan ne?'),
    code: `function onSubmit(e) {
  ???
  save(data)
}
<form onSubmit={onSubmit}>…</form>`,
    options: ['e.preventDefault()', 'e.stopPropagation()', 'return true', 'e.target.reset()'], answer: 0,
    why: W('السلوك الافتراضي للنموذج إرسال الصفحة. preventDefault يوقفه لنرسل البيانات بـ fetch.', 'A form’s default behaviour is to submit the page. preventDefault stops it so we can send the data with fetch.', 'Formun varsayılan davranışı sayfayı göndermektir. preventDefault bunu durdurur, veriyi fetch ile göndeririz.') }),
  choice({ ...r, id: 'r-m2-usereducer', level: 'mid',
    prompt: W('متى يُفضّل useReducer على عدة useState؟', 'When is useReducer better than several useState calls?', 'useReducer ne zaman birkaç useState’ten daha iyidir?'),
    options: L3(['عندما تتغير عدة قيم مرتبطة معًا بأحداث واضحة (مثل سلة مشتريات)', 'دائمًا، لأنه أسرع', 'للقيم المنطقية فقط', 'عند جلب البيانات فقط'],
      ['When several related values change together through clear events (like a shopping cart)', 'Always, it is faster', 'Only for booleans', 'Only when fetching data'],
      ['Birkaç ilişkili değer net olaylarla birlikte değişiyorsa (alışveriş sepeti gibi)', 'Her zaman, daha hızlıdır', 'Sadece boolean değerler için', 'Sadece veri çekerken']), answer: 0,
    why: W('الـ reducer يجمع منطق التحديث في دالة واحدة سهلة الاختبار، ويمنع حالات غير منطقية مثل loading وerror معًا.', 'A reducer puts update logic in one easy-to-test function and prevents impossible states like loading and error at once.', 'Reducer güncelleme mantığını test edilmesi kolay tek bir fonksiyonda toplar ve aynı anda loading ve error gibi imkânsız durumları önler.') }),
  choice({ ...r, id: 'r-m2-portal', level: 'mid',
    prompt: W('نافذة منبثقة داخل بطاقة عليها overflow: hidden تُقص. ما الحل في React؟', 'A modal inside a card with overflow: hidden gets clipped. The React fix?', 'overflow: hidden olan bir kartın içindeki modal kesiliyor. React’teki çözüm?'),
    options: ['createPortal(<Modal />, document.body)', 'z-index: 9999', 'React.Fragment', 'useLayoutEffect'], answer: 0,
    why: W('الـ portal يرسم العنصر في مكان آخر من DOM، بينما يبقى في شجرة React فتصل إليه الأحداث والـ context.', 'A portal renders the element elsewhere in the DOM while it stays in the React tree, so events and context still reach it.', 'Portal öğeyi DOM’da başka bir yerde çizer ama React ağacında kalır; olaylar ve context ona ulaşmaya devam eder.') }),
  choice({ ...r, id: 'r-m2-usecallback-useless', level: 'mid',
    prompt: W('هل يفيد useCallback هنا؟', 'Does useCallback help here?', 'useCallback burada işe yarar mı?'),
    code: `const onClick = useCallback(() => setOpen(true), [])
return <button onClick={onClick}>Open</button>`,
    options: L3(['لا تقريبًا: الزر عنصر HTML عادي لا يستفيد من ثبات المرجع', 'نعم، يسرّع الضغط', 'نعم، يمنع إعادة رسم الأب', 'نعم، ضروري لكل دالة'],
      ['Hardly: a plain HTML button gains nothing from a stable reference', 'Yes, it speeds up the click', 'Yes, it stops the parent re-rendering', 'Yes, every function needs it'],
      ['Pek değil: düz bir HTML butonu sabit referanstan bir şey kazanmaz', 'Evet, tıklamayı hızlandırır', 'Evet, üst bileşenin yeniden çizimini durdurur', 'Evet, her fonksiyona gerekir']), answer: 0,
    why: W('useCallback مفيد عندما تُمرَّر الدالة لمكوّن memo أو تكون اعتمادية لتأثير. غير ذلك يضيف تعقيدًا فقط.', 'useCallback helps when the function goes to a memo component or is an effect dependency. Otherwise it only adds noise.', 'useCallback, fonksiyon bir memo bileşene gidiyor ya da bir etkinin bağımlılığıysa işe yarar. Aksi halde yalnızca karmaşa ekler.') }),

  // ───────── Senior ─────────
  choice({ ...r, id: 'r-s2-use-client', level: 'senior',
    prompt: W('في Next.js مع App Router، لماذا يعطي هذا المكوّن خطأ؟', 'In Next.js with the App Router, why does this component error?', 'App Router’lı Next.js’te bu bileşen neden hata veriyor?'),
    code: `// app/components/Counter.jsx
import { useState } from 'react'
export default function Counter() {
  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>{n}</button>
}`,
    options: L3(['المكوّنات افتراضيًا Server Components؛ الحالة والأحداث تحتاج \'use client\' في أول الملف', 'useState محذوف من React 19', 'يجب استخدام class', 'الأزرار ممنوعة في Next.js'],
      ['Components are Server Components by default; state and events need \'use client\' at the top of the file', 'useState was removed in React 19', 'It must be a class', 'Buttons are not allowed in Next.js'],
      ['Bileşenler varsayılan olarak Server Component’tir; durum ve olaylar dosyanın başında \'use client\' ister', 'useState React 19’da kaldırıldı', 'Sınıf olmalı', 'Next.js’te butonlar yasak']), answer: 0,
    why: W('مكوّنات الخادم لا ترسل JavaScript للمتصفح، فلا تفاعل فيها. ضع \'use client\' على أصغر جزء تفاعلي فقط.', 'Server Components ship no JavaScript to the browser, so they cannot be interactive. Put \'use client\' on the smallest interactive part only.', 'Server Component’ler tarayıcıya JavaScript göndermez, etkileşimli olamazlar. \'use client\'i yalnızca en küçük etkileşimli parçaya koy.') }),
  choice({ ...r, id: 'r-s2-lazy-suspense', level: 'senior',
    prompt: W('ماذا يحقق هذا الكود؟', 'What does this code achieve?', 'Bu kod neyi sağlar?'),
    code: `const Chart = lazy(() => import('./Chart'))

<Suspense fallback={<Spinner />}>
  {showChart && <Chart />}
</Suspense>`,
    options: L3(['كود Chart في ملف منفصل لا يُنزَّل إلا عند الحاجة، مع Spinner أثناء التحميل', 'يحمّل Chart قبل الصفحة', 'يمنع Chart من إعادة الرسم', 'يحفظ Chart في الكاش للأبد'],
      ['Chart’s code goes in a separate file downloaded only when needed, with a spinner meanwhile', 'Loads Chart before the page', 'Stops Chart from re-rendering', 'Caches Chart forever'],
      ['Chart’ın kodu yalnızca gerektiğinde inen ayrı bir dosyaya gider; bu sırada spinner görünür', 'Chart’ı sayfadan önce yükler', 'Chart’ın yeniden çizilmesini durdurur', 'Chart’ı sonsuza dek önbelleğe alır']), answer: 0,
    why: W('تقسيم الكود يصغّر الحزمة الأولى، ومفيد للمكتبات الثقيلة مثل الرسوم البيانية أو المحررات.', 'Code splitting shrinks the first bundle; it is useful for heavy libraries like charts or editors.', 'Kod bölme ilk paketi küçültür; grafik ya da editör gibi ağır kütüphaneler için faydalıdır.') }),
  choice({ ...r, id: 'r-s2-transition', level: 'senior',
    prompt: W('تبديل التبويب يعرض قائمة ثقيلة ويجمّد الأزرار لحظات. ما الأداة في React 18+؟', 'Switching tabs renders a heavy list and freezes buttons for a moment. Which React 18+ tool helps?', 'Sekme değiştirmek ağır bir listeyi çiziyor ve butonları bir an donduruyor. React 18+’de hangi araç?'),
    code: `const [isPending, startTransition] = useTransition()
function selectTab(t) {
  startTransition(() => setTab(t))
}`,
    options: L3(['useTransition: يجعل التحديث غير عاجل فتبقى الواجهة مستجيبة ويمكن مقاطعته', 'useEffect', 'useRef', 'setTimeout داخل كل مكوّن'],
      ['useTransition: marks the update as non-urgent so the UI stays responsive and the render can be interrupted', 'useEffect', 'useRef', 'setTimeout in every component'],
      ['useTransition: güncellemeyi acil değil olarak işaretler; arayüz duyarlı kalır ve çizim kesilebilir', 'useEffect', 'useRef', 'Her bileşende setTimeout']), answer: 0,
    why: W('React يرسم الحالة الجديدة في الخلفية ويعطي الأولوية للنقرات، وisPending لعرض مؤشر خفيف.', 'React renders the new state in the background and prioritises clicks; isPending lets you show a light indicator.', 'React yeni durumu arka planda çizer ve tıklamalara öncelik verir; isPending hafif bir gösterge için.') }),
  choice({ ...r, id: 'r-s2-deferred', level: 'senior',
    prompt: W('حقل بحث يفلتر 10,000 عنصر، والكتابة متقطعة. ما الأنسب؟', 'A search box filters 10,000 items and typing stutters. What fits best?', 'Bir arama kutusu 10.000 öğeyi filtreliyor ve yazarken takılıyor. En uygunu?'),
    code: `const [query, setQuery] = useState('')
const deferred = ???
const results = useMemo(() => filter(items, deferred), [deferred])`,
    options: ['useDeferredValue(query)', 'useRef(query)', 'useState(query)', 'useCallback(query)'], answer: 0,
    why: W('الحقل يُحدَّث فورًا مع كل حرف، والقائمة تُرسم بقيمة متأخرة قليلًا يمكن مقاطعتها، بدون debounce يدوي.', 'The input updates instantly on every key, while the list renders with a slightly delayed, interruptible value, with no manual debounce.', 'Girdi her tuşta anında güncellenir, liste ise biraz gecikmeli ve kesilebilir bir değerle çizilir; elle debounce gerekmez.') }),
  choice({ ...r, id: 'r-s2-hydration', level: 'senior',
    prompt: W('صفحة SSR تعطي تحذير hydration mismatch. ما السبب المحتمل هنا؟', 'An SSR page warns about a hydration mismatch. The likely cause here?', 'SSR sayfası hydration mismatch uyarısı veriyor. Buradaki olası neden?'),
    code: `function Footer() {
  return <p>Rendered at {new Date().toLocaleTimeString()}</p>
}`,
    options: L3(['الوقت يختلف بين الخادم والمتصفح؛ القيم المتغيرة تُحسب بعد التركيب في useEffect', 'p ممنوع في Footer', 'ينقص key', 'toLocaleTimeString غير موجودة'],
      ['The time differs between server and browser; changing values should be set after mount in useEffect', 'p is not allowed in Footer', 'A key is missing', 'toLocaleTimeString does not exist'],
      ['Saat sunucu ile tarayıcı arasında farklı; değişen değerler mount’tan sonra useEffect’te ayarlanmalı', 'Footer’da p yasak', 'key eksik', 'toLocaleTimeString yok']), answer: 0,
    why: W('أي شيء يختلف بين البيئتين (الوقت، Math.random، window، اللغة) يكسر المطابقة. اعرض قيمة ثابتة أولًا ثم حدّثها.', 'Anything that differs between the two (time, Math.random, window, locale) breaks the match. Render a stable value first, then update it.', 'İki ortam arasında farklı olan her şey (zaman, Math.random, window, dil) eşleşmeyi bozar. Önce sabit bir değer göster, sonra güncelle.') }),
  choice({ ...r, id: 'r-s2-layout-effect', level: 'senior',
    prompt: W('تقيس ارتفاع عنصر لتضع tooltip فوقه، فيظهر في مكان خاطئ لحظة ثم يقفز. ما الحل؟', 'You measure an element to place a tooltip above it, and it shows in the wrong place for a moment, then jumps. The fix?', 'Bir öğeyi ölçüp üstüne tooltip koyuyorsun; bir an yanlış yerde görünüp zıplıyor. Çözüm?'),
    options: {

      ar: ['useLayoutEffect', 'useEffect مع setTimeout', 'useMemo', 'useDeferredValue'],

      en: ['useLayoutEffect', 'useEffect with setTimeout', 'useMemo', 'useDeferredValue'],

      tr: ['useLayoutEffect', 'setTimeout ile useEffect', 'useMemo', 'useDeferredValue'],

    }, answer: 0,
    why: W('useLayoutEffect يعمل بعد تحديث DOM وقبل الرسم، فيمكن القياس وتعديل الموضع دون أن يرى المستخدم الخطوة الخاطئة. استخدمه للقياس فقط.', 'useLayoutEffect runs after the DOM update but before paint, so you can measure and reposition before the user sees the wrong frame. Use it only for measuring.', 'useLayoutEffect DOM güncellemesinden sonra, çizimden önce çalışır; kullanıcı yanlış kareyi görmeden ölçüp konumlandırabilirsin. Yalnızca ölçüm için kullan.') }),
  choice({ ...r, id: 'r-s2-external-store', level: 'senior',
    prompt: W('تريد اشتراك مكوّنات React في متجر خارجي (مثل navigator.onLine أو متجر خاص) بشكل آمن مع الرسم المتزامن. ما الـ Hook؟', 'You want React components to subscribe to an external store (like navigator.onLine or your own store) safely with concurrent rendering. Which hook?', 'React bileşenlerinin dış bir depoya (navigator.onLine ya da kendi deponuz) eşzamanlı çizimle güvenle abone olmasını istiyorsun. Hangi hook?'),
    options: ['useSyncExternalStore(subscribe, getSnapshot)', 'useEffect + useState', 'useContext', 'useImperativeHandle'], answer: 0,
    why: W('مع الرسم المتزامن قد يقرأ جزء من الشجرة قيمة قديمة وآخر جديدة (tearing). هذا الـ Hook يمنع ذلك، وتستخدمه مكتبات مثل Zustand.', 'With concurrent rendering part of the tree can read an old value and part a new one (tearing). This hook prevents that, and libraries like Zustand use it.', 'Eşzamanlı çizimde ağacın bir kısmı eski, bir kısmı yeni değeri okuyabilir (tearing). Bu hook bunu önler; Zustand gibi kütüphaneler onu kullanır.') }),
  choice({ ...r, id: 'r-s2-error-boundary', level: 'senior',
    prompt: W('أي خطأ لا يلتقطه Error Boundary؟', 'Which error does an Error Boundary not catch?', 'Error Boundary hangi hatayı yakalamaz?'),
    options: L3(['خطأ داخل onClick أو داخل كود غير متزامن مثل fetch', 'خطأ أثناء رسم مكوّن ابن', 'خطأ في useEffect لمكوّن ابن عند التركيب', 'خطأ في constructor مكوّن class ابن'],
      ['An error inside onClick or inside async code like fetch', 'An error while a child renders', 'An error in a child’s useEffect on mount', 'An error in a child class component’s constructor'],
      ['onClick içinde ya da fetch gibi asenkron kodda oluşan hata', 'Bir alt bileşen çizilirken oluşan hata', 'Alt bileşenin mount sırasındaki useEffect hatası', 'Alt sınıf bileşeninin constructor hatası']), answer: 0,
    why: W('الحدود تلتقط أخطاء الرسم ودورة الحياة. أخطاء الأحداث والوعود عالجها بـ try/catch، وأظهر حالة خطأ في الواجهة.', 'Boundaries catch rendering and lifecycle errors. Handle event and promise errors with try/catch and show an error state in the UI.', 'Sınırlar çizim ve yaşam döngüsü hatalarını yakalar. Olay ve promise hatalarını try/catch ile ele al, arayüzde hata durumu göster.') }),
  choice({ ...r, id: 'r-s2-ref-prop', level: 'senior',
    prompt: W('في React 19، كيف تمرر ref لعنصر input داخل مكوّن TextField؟', 'In React 19, how do you pass a ref to the input inside a TextField component?', 'React 19’da TextField bileşenindeki input’a ref nasıl geçirilir?'),
    options: {

      ar: ['function TextField({ ref, ...props }) { return <input ref={ref} {...props} /> }', 'TextField.ref = inputRef', 'document.querySelector داخل الأب', 'useRef داخل TextField وإرجاعه'],

      en: ['function TextField({ ref, ...props }) { return <input ref={ref} {...props} /> }', 'TextField.ref = inputRef', 'document.querySelector in the parent', 'useRef inside TextField and return it'],

      tr: ['function TextField({ ref, ...props }) { return <input ref={ref} {...props} /> }', 'TextField.ref = inputRef', 'Üst bileşende document.querySelector', 'TextField içinde useRef ve döndürmek'],

    }, answer: 0, codeLang: 'jsx',
    why: W('في React 19 أصبح ref خاصية عادية للمكوّنات الدالية، ولم يعد forwardRef ضروريًا للكود الجديد.', 'In React 19 ref is a regular prop for function components, so forwardRef is no longer needed for new code.', 'React 19’da ref fonksiyon bileşenleri için normal bir prop’tur; yeni kodda forwardRef’e gerek kalmadı.') }),
  choice({ ...r, id: 'r-s2-virtualize', level: 'senior',
    prompt: W('جدول بـ 20,000 صف بطيء جدًا في الرسم والتمرير. ما الحل الأساسي؟', 'A table with 20,000 rows is very slow to render and scroll. The core fix?', '20.000 satırlık bir tablo çizim ve kaydırmada çok yavaş. Temel çözüm?'),
    options: L3(['Virtualization: رسم الصفوف الظاهرة فقط (مثل TanStack Virtual)', 'React.memo على الجدول كله', 'إضافة key لكل صف', 'استخدام useMemo على البيانات'],
      ['Virtualization: render only the visible rows (like TanStack Virtual)', 'React.memo on the whole table', 'Add a key to each row', 'useMemo on the data'],
      ['Sanallaştırma: yalnızca görünen satırları çizmek (TanStack Virtual gibi)', 'Tüm tabloya React.memo', 'Her satıra key eklemek', 'Veriye useMemo'],
    ), answer: 0,
    why: W('المشكلة عدد عناصر DOM نفسه، لا الحسابات. القائمة الافتراضية تُبقي بضع عشرات من العناصر مهما كبرت البيانات.', 'The problem is the sheer number of DOM nodes, not the calculations. A virtual list keeps a few dozen nodes however big the data gets.', 'Sorun hesaplar değil, DOM düğümlerinin sayısıdır. Sanal liste veri ne kadar büyürse büyüsün birkaç düzine düğüm tutar.') }),
  choice({ ...r, id: 'r-s2-optimistic', level: 'senior',
    prompt: W('تريد أن يظهر الإعجاب فورًا قبل رد الخادم، ويُلغى إن فشل الطلب. ما الأداة في React 19؟', 'You want a like to show instantly before the server replies, and roll back if the request fails. Which React 19 tool?', 'Beğeninin sunucu yanıtından önce hemen görünmesini ve istek başarısız olursa geri alınmasını istiyorsun. React 19’da hangi araç?'),
    options: ['useOptimistic', 'useDeferredValue', 'useId', 'useDebugValue'], answer: 0,
    why: W('useOptimistic يعرض حالة مؤقتة أثناء الإجراء، ويعود للحالة الحقيقية تلقائيًا عند انتهائه أو فشله.', 'useOptimistic shows a temporary state while the action runs and falls back to the real state automatically when it ends or fails.', 'useOptimistic işlem sürerken geçici bir durum gösterir; bitince ya da başarısız olunca otomatik olarak gerçek duruma döner.') }),
  choice({ ...r, id: 'r-s2-render-loop', level: 'senior',
    prompt: W('لماذا يعطي هذا المكوّن خطأ «Too many re-renders»؟', 'Why does this component throw "Too many re-renders"?', 'Bu bileşen neden "Too many re-renders" hatası veriyor?'),
    code: `function Price({ value }) {
  const [p, setP] = useState(0)
  setP(value * 1.18)
  return <span>{p}</span>
}`,
    options: L3(['setP داخل الرسم مباشرة يطلب رسمًا جديدًا، فيتكرر للأبد؛ احسبها كقيمة مشتقة', 'useState لا يقبل أرقامًا عشرية', 'span ممنوع', 'value غير معرّفة'],
      ['Calling setP directly during render asks for another render, forever; compute it as a derived value', 'useState rejects decimals', 'span is not allowed', 'value is undefined'],
      ['Çizim sırasında doğrudan setP çağırmak yeni bir çizim ister, sonsuza dek; türetilmiş değer olarak hesapla', 'useState ondalık kabul etmez', 'span yasak', 'value tanımsız']), answer: 0,
    why: W('const p = value * 1.18 يكفي. تحديث الحالة أثناء الرسم مسموح فقط بشرط يمنع التكرار، وهو نمط نادر.', 'const p = value * 1.18 is enough. Setting state during render is only allowed behind a condition that stops repeats, and it is a rare pattern.', 'const p = value * 1.18 yeterli. Çizim sırasında durum ayarlamak yalnızca tekrarı durduran bir koşulla serbesttir ve nadir bir kalıptır.') }),
  choice({ ...r, id: 'r-s2-profiler', level: 'senior',
    prompt: W('الصفحة بطيئة وتشك في إعادة رسم غير ضرورية. ما أول خطوة؟', 'The page is slow and you suspect unnecessary re-renders. What is the first step?', 'Sayfa yavaş ve gereksiz yeniden çizimlerden şüpheleniyorsun. İlk adım nedir?'),
    options: L3(['القياس بـ React DevTools Profiler لمعرفة أي مكوّنات تُرسم ولماذا', 'إضافة memo لكل المكوّنات', 'تحويل كل شيء إلى useReducer', 'حذف StrictMode'],
      ['Measure with the React DevTools Profiler to see which components render and why', 'Wrap every component in memo', 'Convert everything to useReducer', 'Remove StrictMode'],
      ['Hangi bileşenlerin neden çizildiğini görmek için React DevTools Profiler ile ölçmek', 'Her bileşeni memo ile sarmak', 'Her şeyi useReducer’a çevirmek', 'StrictMode’u kaldırmak'],
    ), answer: 0,
    why: W('التحسين بدون قياس يضيف تعقيدًا وقد لا يمس السبب الحقيقي (مثل قائمة طويلة أو سياق يتغير كثيرًا).', 'Optimising without measuring adds complexity and may miss the real cause (like a long list or a context that changes too often).', 'Ölçmeden optimize etmek karmaşıklık ekler ve asıl nedeni (uzun bir liste ya da çok sık değişen bir context gibi) kaçırabilir.') }),
  choice({ ...r, id: 'r-s2-split-context', level: 'senior',
    prompt: W('سياق واحد فيه user وcart وtheme، وكل تغيير في السلة يعيد رسم الهيدر وصفحة الحساب. ما التحسين؟', 'One context holds user, cart and theme, and every cart change re-renders the header and account page. The improvement?', 'Tek bir context user, cart ve theme tutuyor; her sepet değişikliği başlığı ve hesap sayfasını yeniden çiziyor. İyileştirme?'),
    options: L3(['تقسيمه لسياقات منفصلة حسب معدل التغيّر، أو متجر يسمح بالاشتراك في جزء محدد', 'نقل كل شيء إلى props', 'React.memo على الهيدر فقط', 'استخدام useRef بدل الحالة'],
      ['Split it into separate contexts by how often they change, or use a store that lets components subscribe to one slice', 'Move everything to props', 'React.memo on the header only', 'Use useRef instead of state'],
      ['Değişim sıklığına göre ayrı context’lere bölmek ya da bileşenlerin tek bir parçaya abone olabildiği bir depo kullanmak', 'Her şeyi props’a taşımak', 'Sadece başlığa React.memo', 'Durum yerine useRef'],
    ), answer: 0,
    why: W('كل مستهلك يُرسم عند تغيّر أي جزء من القيمة. memo لا يمنع ذلك لأن useContext يتجاوزه.', 'Every consumer re-renders when any part of the value changes. memo does not help, because useContext bypasses it.', 'Değerin herhangi bir kısmı değişince her tüketici yeniden çizilir. memo işe yaramaz; useContext onu atlar.') }),
]
