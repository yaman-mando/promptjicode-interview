import type { Question } from '#shared/types/quiz'
import { choice } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const topic = 'css' as const
const c = { codeLang: 'css' as const, topic }

export const CSS_2: Question[] = [
  // ───────── Junior ─────────
  choice({ ...c, id: 'c-j2-class-selector', level: 'junior',
    prompt: W('أي محدد يختار كل العناصر التي عليها class="btn"؟', 'Which selector picks every element with class="btn"?', 'class="btn" olan tüm öğeleri hangi seçici seçer?'),
    options: ['.btn', '#btn', 'btn', '*btn'], answer: 0,
    why: W('النقطة للـ class، و# للـ id (عنصر واحد فقط)، والاسم بدونهما لنوع الوسم.', 'A dot is for a class, # for an id (one element only), and a bare name for a tag type.', 'Nokta class için, # id için (tek öğe), çıplak ad etiket türü içindir.') }),
  choice({ ...c, id: 'c-j2-rgba', level: 'junior',
    prompt: W('ماذا يعني الرقم الأخير هنا؟', 'What does the last number mean here?', 'Buradaki son sayı ne anlama gelir?'),
    code: `.overlay { background: rgba(0, 0, 0, 0.5); }`,
    options: L3(['الشفافية: 0.5 تعني نصف شفاف', 'درجة اللون الأزرق', 'سماكة الحدود', 'السطوع'],
      ['Opacity: 0.5 means half transparent', 'The blue channel', 'The border width', 'Brightness'],
      ['Saydamlık: 0.5 yarı saydam demek', 'Mavi kanal', 'Kenarlık kalınlığı', 'Parlaklık']), answer: 0,
    why: W('على عكس opacity، شفافية لون الخلفية لا تؤثر على النص داخل العنصر. والصيغة الحديثة: rgb(0 0 0 / 50%).', 'Unlike opacity, a transparent background colour does not affect the text inside. Modern syntax: rgb(0 0 0 / 50%).', 'opacity’nin aksine saydam arka plan rengi içteki metni etkilemez. Modern söz dizimi: rgb(0 0 0 / 50%).') }),
  choice({ ...c, id: 'c-j2-rem', level: 'junior',
    prompt: W('حجم html هو 16px. كم يساوي 1.5rem؟', 'html’s font size is 16px. What is 1.5rem?', 'html’in yazı boyutu 16px. 1.5rem kaç eder?'),
    options: ['24px', '15px', '1.5px', '16px'], answer: 0,
    why: W('rem نسبة إلى حجم خط html دائمًا، فلا يتأثر بالعنصر الأب على عكس em.', 'rem is always relative to html’s font size, so it ignores the parent, unlike em.', 'rem her zaman html’in yazı boyutuna görelidir; em’in aksine üst öğeden etkilenmez.') }),
  choice({ ...c, id: 'c-j2-cascade-order', level: 'junior',
    prompt: W('ما لون الفقرة؟', 'What colour is the paragraph?', 'Paragraf ne renk?'),
    code: `p { color: red; }
p { color: blue; }`,
    options: ['blue', 'red', 'purple', 'black'], answer: 0,
    why: W('عند تساوي الخصوصية تفوز القاعدة المكتوبة لاحقًا.', 'When specificity is equal, the rule written later wins.', 'Özgüllük eşitse sonra yazılan kural kazanır.') }),
  choice({ ...c, id: 'c-j2-hover', level: 'junior',
    prompt: W('كيف تغيّر لون الزر عند مرور الفأرة؟', 'How do you change the button colour on mouse hover?', 'Fare üzerine gelince buton rengini nasıl değiştirirsin?'),
    options: ['.btn:hover { background: #e2a15c; }', '.btn.hover { background: #e2a15c; }', '.btn::hover { background: #e2a15c; }', '.btn[hover] { background: #e2a15c; }'], answer: 0,
    why: W('نقطتان للحالات (pseudo-classes) مثل :hover و:focus، ونقطتان مزدوجتان للعناصر الوهمية مثل ::before.', 'One colon is for states (pseudo-classes) like :hover and :focus; two colons for pseudo-elements like ::before.', 'Tek iki nokta :hover ve :focus gibi durumlar (pseudo-class) için, çift iki nokta ::before gibi sahte öğeler içindir.') }),
  choice({ ...c, id: 'c-j2-flex-column', level: 'junior',
    prompt: W('كيف تجعل عناصر flex تتراص عموديًا؟', 'How do you stack flex items vertically?', 'Flex öğelerini dikey nasıl dizersin?'),
    options: ['flex-direction: column;', 'flex-wrap: column;', 'align-items: column;', 'display: vertical;'], answer: 0,
    why: W('الاتجاه الافتراضي row. ومع column يصبح justify-content للمحور العمودي وalign-items للأفقي.', 'The default direction is row. With column, justify-content works on the vertical axis and align-items on the horizontal.', 'Varsayılan yön row’dur. column ile justify-content dikey, align-items yatay eksende çalışır.') }),
  choice({ ...c, id: 'c-j2-space-between', level: 'junior',
    prompt: W('شعار في طرف وقائمة في الطرف الآخر من الهيدر. أي خاصية؟', 'A logo at one end of the header and a menu at the other. Which property?', 'Başlığın bir ucunda logo, öbür ucunda menü. Hangi özellik?'),
    code: `.header { display: flex; ??? }`,
    options: ['justify-content: space-between;', 'align-items: space-between;', 'text-align: justify;', 'float: right;'], answer: 0,
    why: W('space-between يضع الأول في البداية والأخير في النهاية ويوزع المسافة بينهما.', 'space-between puts the first item at the start and the last at the end, spreading the space between.', 'space-between ilkini başa, sonuncuyu sona koyar ve aradaki boşluğu dağıtır.') }),
  choice({ ...c, id: 'c-j2-circle', level: 'junior',
    prompt: W('كيف تجعل صورة مربعة 80×80 دائرية؟', 'How do you make an 80×80 square image round?', '80×80 kare bir resmi nasıl yuvarlak yaparsın?'),
    options: ['border-radius: 50%;', 'border-radius: 80px 0;', 'shape: circle;', 'radius: round;'], answer: 0,
    why: W('50% من كل ضلع تعطي دائرة كاملة للعنصر المربع. ومع العناصر المستطيلة تعطي شكلًا بيضاويًا.', '50% of each side gives a full circle on a square element; on a rectangle it gives an ellipse.', 'Her kenarın %50’si kare öğede tam bir daire verir; dikdörtgende elips verir.') }),
  choice({ ...c, id: 'c-j2-img-responsive', level: 'junior',
    prompt: W('صورة كبيرة تخرج عن حدود الشاشة في الجوال. ما القاعدة الشائعة؟', 'A big image overflows the screen on mobile. The common rule?', 'Büyük bir resim mobilde ekrandan taşıyor. Yaygın kural?'),
    options: ['img { max-width: 100%; height: auto; }', 'img { width: 1200px; }', 'img { overflow: hidden; }', 'img { zoom: 0.5; }'], answer: 0,
    why: W('max-width يمنع تجاوز الحاوية مع السماح بحجم أصغر، وheight: auto يحافظ على النسبة.', 'max-width stops it outgrowing its container while allowing it to be smaller; height: auto keeps the ratio.', 'max-width kapsayıcıyı aşmasını engeller ama küçülmesine izin verir; height: auto oranı korur.') }),
  choice({ ...c, id: 'c-j2-center-block', level: 'junior',
    prompt: W('كيف توسّط صندوقًا عرضه 600px أفقيًا داخل الصفحة؟', 'How do you center a 600px-wide box horizontally on the page?', '600px genişliğindeki bir kutuyu sayfada yatay olarak nasıl ortalarsın?'),
    options: ['.box { width: 600px; margin-inline: auto; }', '.box { text-align: center; }', '.box { align: center; }', '.box { float: center; }'], answer: 0,
    why: W('الهوامش التلقائية تتقاسم المساحة الباقية بالتساوي. أما text-align فيوسّط المحتوى داخل العنصر لا العنصر نفسه.', 'Auto margins share the leftover space equally. text-align centers the content inside the element, not the element itself.', 'Otomatik kenar boşlukları kalan alanı eşit paylaşır. text-align öğenin kendisini değil içindeki içeriği ortalar.') }),
  choice({ ...c, id: 'c-j2-inherit', level: 'junior',
    prompt: W('أي خاصية يرثها العنصر الابن من أبيه تلقائيًا؟', 'Which property does a child inherit from its parent automatically?', 'Alt öğe hangi özelliği üst öğeden otomatik miras alır?'),
    options: ['color', 'border', 'margin', 'background-image'], answer: 0,
    why: W('خصائص النص (color، font، line-height) تورث، أما خصائص الصندوق (border، margin، padding) فلا.', 'Text properties (color, font, line-height) inherit; box properties (border, margin, padding) do not.', 'Metin özellikleri (color, font, line-height) miras alınır; kutu özellikleri (border, margin, padding) alınmaz.') }),
  choice({ ...c, id: 'c-j2-gap', level: 'junior',
    prompt: W('ما أبسط طريقة لوضع مسافة 16px بين عناصر flex؟', 'What is the simplest way to put 16px between flex items?', 'Flex öğeleri arasına 16px boşluk koymanın en basit yolu?'),
    options: ['.row { display: flex; gap: 16px; }', '.row > * { margin: 16px; }', '.row { padding: 16px; }', '.row { spacing: 16px; }'], answer: 0,
    why: W('gap يضع المسافة بين العناصر فقط، بدون مسافة زائدة على الأطراف كما مع margin.', 'gap adds space only between items, with no extra space at the edges as with margin.', 'gap boşluğu yalnızca öğeler arasına koyar; margin’deki gibi kenarlarda fazla boşluk olmaz.') }),
  choice({ ...c, id: 'c-j2-variables', level: 'junior',
    prompt: W('كيف تستخدم متغير CSS اسمه --brand؟', 'How do you use a CSS variable named --brand?', '--brand adlı bir CSS değişkenini nasıl kullanırsın?'),
    code: `:root { --brand: #e2a15c; }`,
    options: ['.btn { background: var(--brand); }', '.btn { background: $brand; }', '.btn { background: --brand; }', '.btn { background: @brand; }'], answer: 0,
    why: W('متغيرات CSS تُقرأ بـ var() وتعمل في المتصفح مباشرة، ويمكن تغييرها بـ JavaScript أو داخل media query. أما $ فهي Sass.', 'CSS variables are read with var() and work live in the browser; you can change them from JavaScript or inside a media query. $ is Sass.', 'CSS değişkenleri var() ile okunur ve tarayıcıda canlı çalışır; JavaScript’ten ya da media query içinde değiştirilebilir. $ Sass’tır.') }),

  // ───────── Mid ─────────
  choice({ ...c, id: 'c-m2-specificity', level: 'mid',
    prompt: W('أي قاعدة تفوز؟', 'Which rule wins?', 'Hangi kural kazanır?'),
    code: `#header .link { color: red; }          /* A */
.nav .link.active.big { color: blue; } /* B */`,
    options: {

      ar: ['A', 'B', 'الأخيرة دائمًا', 'كلاهما'],

      en: ['A', 'B', 'Always the later one', 'Both'],

      tr: ['A', 'B', 'Her zaman sonraki', 'İkisi de'],

    }, answer: 0,
    why: W('id واحد أقوى من أي عدد من الـ classes. لهذا يُفضّل تجنب id في التنسيق.', 'One id beats any number of classes. That is why styling with ids is best avoided.', 'Tek bir id, istenen sayıda class’ı yener. Bu yüzden stil verirken id’den kaçınmak iyidir.') }),
  choice({ ...c, id: 'c-m2-before-content', level: 'mid',
    prompt: W('لماذا لا يظهر العنصر الوهمي؟', 'Why does the pseudo-element not show?', 'Sahte öğe neden görünmüyor?'),
    code: `.badge::before {
  width: 8px; height: 8px;
  background: red;
}`,
    options: {

      ar: ['content: "" مفقودة', 'يجب كتابة :before بنقطة واحدة', 'العرض صغير جدًا', 'background لا يعمل عليه'],

      en: ['content: "" is missing', 'It must be :before with one colon', 'The width is too small', 'background does not work on it'],

      tr: ['content: "" eksik', 'Tek iki noktalı :before olmalı', 'Genişlik çok küçük', 'background onda çalışmaz'],

    }, answer: 0,
    why: W('بدون content لا يُنشأ ::before أو ::after أصلًا، حتى لو كانت قيمته فارغة. وأضف display: block أو inline-block ليقبل الأبعاد.', 'Without content, ::before or ::after is not created at all, even if empty. Add display: block or inline-block so it takes dimensions.', 'content olmadan ::before ya da ::after hiç oluşmaz, boş olsa bile. Boyut alması için display: block ya da inline-block ekle.') }),
  choice({ ...c, id: 'c-m2-absolute-parent', level: 'mid',
    prompt: W('شارة position: absolute تظهر في زاوية الصفحة بدل زاوية البطاقة. ما الناقص؟', 'A position: absolute badge shows in the page corner instead of the card’s. What is missing?', 'position: absolute rozet kartın değil sayfanın köşesinde görünüyor. Eksik olan ne?'),
    code: `.card { … }
.card .badge { position: absolute; top: 8px; right: 8px; }`,
    options: ['.card { position: relative; }', '.badge { display: block; }', '.card { overflow: auto; }', '.badge { z-index: 10; }'], answer: 0,
    why: W('العنصر المطلق يُحسب من أقرب أب له position غير static. إن لم يوجد، يُحسب من الصفحة.', 'An absolute element is placed relative to the nearest ancestor whose position is not static. Without one, the page is used.', 'Absolute öğe, position’ı static olmayan en yakın üst öğeye göre konumlanır. Yoksa sayfa kullanılır.') }),
  choice({ ...c, id: 'c-m2-ellipsis-flex', level: 'mid',
    prompt: W('النص الطويل داخل عنصر flex لا يُقص بـ «…» ويدفع العناصر الأخرى خارج الصف. ما الإصلاح؟', 'Long text inside a flex item is not truncated with "…" and pushes the others off the row. The fix?', 'Bir flex öğesindeki uzun metin "…" ile kesilmiyor ve diğerlerini satırdan itiyor. Düzeltme?'),
    code: `.title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`,
    options: ['.title { min-width: 0; }', '.title { width: 100%; }', '.title { flex-shrink: 0; }', '.title { display: block; }'], answer: 0,
    why: W('عناصر flex لها min-width: auto افتراضيًا، أي لا تصغر أقل من محتواها. min-width: 0 يسمح بالتصغير فيعمل القص.', 'Flex items default to min-width: auto, so they never shrink below their content. min-width: 0 allows shrinking, and the ellipsis works.', 'Flex öğeleri varsayılan olarak min-width: auto’dur, içeriklerinden küçülmezler. min-width: 0 küçülmeye izin verir ve üç nokta çalışır.') }),
  choice({ ...c, id: 'c-m2-grid-areas', level: 'mid',
    prompt: W('ماذا يحدد هذا الكود؟', 'What does this code define?', 'Bu kod neyi tanımlar?'),
    code: `.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
}
.side { grid-area: sidebar; }`,
    options: L3(['تخطيط بالأسماء: الهيدر بعرض عمودين، وتحته الشريط الجانبي والمحتوى', 'جدول HTML', 'ترتيب العناصر في الكود', 'خطوط الشبكة فقط'],
      ['A named layout: the header spans two columns, with the sidebar and main below it', 'An HTML table', 'The order of elements in the code', 'Only the grid lines'],
      ['Adlandırılmış bir düzen: başlık iki sütuna yayılır, altında kenar çubuğu ve ana içerik', 'Bir HTML tablosu', 'Koddaki öğe sırası', 'Sadece ızgara çizgileri']), answer: 0,
    why: W('الأسماء تجعل التخطيط مقروءًا، وتغييره في media query بسيط دون لمس HTML.', 'Names make the layout readable, and changing it inside a media query is easy without touching the HTML.', 'Adlar düzeni okunur yapar; HTML’e dokunmadan media query içinde değiştirmek kolaydır.') }),
  choice({ ...c, id: 'c-m2-aspect-ratio', level: 'mid',
    prompt: W('تريد بطاقة فيديو بنسبة 16:9 مهما كان عرضها. ما الأبسط؟', 'You want a video card that stays 16:9 at any width. Simplest way?', 'Her genişlikte 16:9 kalan bir video kartı istiyorsun. En basit yol?'),
    options: ['.video { aspect-ratio: 16 / 9; }', '.video { padding-top: 16px; }', '.video { height: 56.25%; }', '.video { ratio: 16:9; }'], answer: 0,
    why: W('aspect-ratio يحسب الارتفاع من العرض مباشرة، بدل حيلة padding-top: 56.25% القديمة.', 'aspect-ratio computes the height from the width directly, replacing the old padding-top: 56.25% trick.', 'aspect-ratio yüksekliği doğrudan genişlikten hesaplar; eski padding-top: %56.25 hilesinin yerini alır.') }),
  choice({ ...c, id: 'c-m2-object-fit', level: 'mid',
    prompt: W('صور المنتجات بأبعاد مختلفة وتظهر مشوّهة في مربعات 200×200. ما الحل؟', 'Product photos have different sizes and look stretched in 200×200 boxes. The fix?', 'Ürün fotoğrafları farklı boyutlarda ve 200×200 kutularda bozuk görünüyor. Çözüm?'),
    code: `.thumb { width: 200px; height: 200px; ??? }`,
    options: ['object-fit: cover;', 'background-size: cover;', 'overflow: hidden;', 'resize: both;'], answer: 0,
    why: W('cover يملأ المربع ويقص الزائد مع الحفاظ على النسبة، وcontain يُظهر الصورة كاملة مع فراغ. background-size لصور الخلفية فقط.', 'cover fills the box and crops the excess while keeping the ratio; contain shows the whole image with empty space. background-size is for background images only.', 'cover kutuyu doldurur ve oranı koruyarak fazlayı kırpar; contain resmin tamamını boşlukla gösterir. background-size yalnızca arka plan resimleri içindir.') }),
  choice({ ...c, id: 'c-m2-reduced-motion', level: 'mid',
    prompt: W('ماذا تفعل هذه القاعدة؟', 'What does this rule do?', 'Bu kural ne yapar?'),
    code: `@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`,
    options: L3(['توقف الحركات لمن فعّل «تقليل الحركة» في نظامه (مثلًا بسبب الدوار)', 'تسرّع الحركات', 'تعمل على الجوال فقط', 'توقف الحركات في الطباعة'],
      ['Turns animations off for people who enabled "reduce motion" in their OS (for example due to dizziness)', 'Speeds animations up', 'Only works on mobile', 'Stops animations when printing'],
      ['Sistemde "hareketi azalt" açanlar için (ör. baş dönmesi yüzünden) animasyonları kapatır', 'Animasyonları hızlandırır', 'Sadece mobilde çalışır', 'Yazdırırken animasyonları durdurur']), answer: 0,
    why: W('خيار وصول مهم. ولطف أكثر: قلل الحركة بدل إلغائها، واترك التلاشي البسيط.', 'An important accessibility setting. Gentler still: reduce motion instead of removing it, keeping simple fades.', 'Önemli bir erişilebilirlik ayarı. Daha nazik olanı: hareketi kaldırmak yerine azaltmak ve basit solmaları bırakmak.') }),
  choice({ ...c, id: 'c-m2-nth-child', level: 'mid',
    prompt: W('أي صفوف يلوّن هذا المحدد؟', 'Which rows does this selector colour?', 'Bu seçici hangi satırları renklendirir?'),
    code: `tr:nth-child(2n + 1) { background: #f5f5f5; }`,
    options: L3(['الصفوف الفردية: 1، 3، 5…', 'الزوجية: 2، 4، 6…', 'الصف الثاني فقط', 'كل الصفوف'],
      ['The odd rows: 1, 3, 5…', 'The even rows: 2, 4, 6…', 'Only the second row', 'Every row'],
      ['Tek satırlar: 1, 3, 5…', 'Çift satırlar: 2, 4, 6…', 'Sadece ikinci satır', 'Tüm satırlar']), answer: 0,
    why: W('n تبدأ من 0: 1، 3، 5. ويمكن كتابتها :nth-child(odd)، و(even) للزوجية.', 'n starts at 0: 1, 3, 5. You can write :nth-child(odd), and (even) for the even rows.', 'n 0’dan başlar: 1, 3, 5. :nth-child(odd) ve çiftler için (even) yazılabilir.') }),
  choice({ ...c, id: 'c-m2-logical', level: 'mid',
    prompt: W('موقع بالعربية والإنجليزية. أي قاعدة تعمل صحيحًا في الاتجاهين؟', 'A site in Arabic and English. Which rule works correctly in both directions?', 'Arapça ve İngilizce bir site. Hangi kural iki yönde de doğru çalışır?'),
    options: ['.icon { margin-inline-end: 8px; }', '.icon { margin-right: 8px; }', '.icon { margin-left: 8px; }', '.icon { float: right; }'], answer: 0,
    why: W('الخصائص المنطقية (inline-start وinline-end) تتبع اتجاه النص: end يمين في الإنجليزية ويسار في العربية.', 'Logical properties (inline-start, inline-end) follow the text direction: end is right in English and left in Arabic.', 'Mantıksal özellikler (inline-start, inline-end) yazı yönünü izler: end İngilizcede sağ, Arapçada soldur.') }),
  choice({ ...c, id: 'c-m2-transition-display', level: 'mid',
    prompt: W('لماذا لا تظهر القائمة بحركة تلاشٍ؟', 'Why does the menu not fade in?', 'Menü neden solarak belirmiyor?'),
    code: `.menu { display: none; transition: opacity .3s; opacity: 0; }
.menu.open { display: block; opacity: 1; }`,
    options: L3(['display لا يتحرك، والعنصر يظهر فجأة؛ استخدم opacity مع visibility أو @starting-style', 'opacity لا تقبل transition', 'المدة قصيرة جدًا', 'يجب استخدام animation فقط'],
      ['display does not animate, so the element appears instantly; use opacity with visibility, or @starting-style', 'opacity cannot transition', 'The duration is too short', 'Only animation works'],
      ['display canlandırılamaz, öğe aniden görünür; visibility ile opacity ya da @starting-style kullan', 'opacity transition almaz', 'Süre çok kısa', 'Sadece animation çalışır']), answer: 0,
    why: W('عند التبديل من none لا يوجد «قبل» تبدأ منه الحركة. visibility تُخفي العنصر عن الضغط والقارئات مع إمكانية تحريكها.', 'Switching from none gives the transition no "before" to start from. visibility hides the element from clicks and screen readers while still animating.', 'none’dan geçişte animasyonun başlayacağı bir "önce" yoktur. visibility öğeyi tıklamalardan ve ekran okuyuculardan gizler, yine de canlandırılabilir.') }),
  choice({ ...c, id: 'c-m2-focus-visible', level: 'mid',
    prompt: W('المصمم لا يريد إطار التركيز عند الضغط بالفأرة، لكن مستخدمي لوحة المفاتيح يحتاجونه. ما الحل؟', 'The designer does not want a focus ring on mouse clicks, but keyboard users need it. The fix?', 'Tasarımcı fare tıklamasında odak çerçevesi istemiyor ama klavye kullanıcılarının ihtiyacı var. Çözüm?'),
    options: ['button:focus-visible { outline: 2px solid #e2a15c; }', 'button:focus { outline: none; }', '* { outline: 0; }', 'button:active { outline: 2px solid; }'], answer: 0,
    why: W(':focus-visible يظهر عند التنقل بلوحة المفاتيح فقط. إزالة الإطار كليًا تجعل الموقع غير قابل للاستخدام بلوحة المفاتيح.', ':focus-visible shows only when navigating by keyboard. Removing the outline entirely makes the site unusable with a keyboard.', ':focus-visible yalnızca klavyeyle gezinirken görünür. Çerçeveyi tamamen kaldırmak siteyi klavyeyle kullanılamaz yapar.') }),
  choice({ ...c, id: 'c-m2-rem-access', level: 'mid',
    prompt: W('لماذا يُفضّل rem على px لأحجام الخطوط؟', 'Why is rem preferred over px for font sizes?', 'Yazı boyutları için neden px yerine rem tercih edilir?'),
    options: L3(['يحترم حجم الخط الذي اختاره المستخدم في إعدادات المتصفح', 'لأنه أسرع في الرسم', 'لأن px لا تعمل في الجوال', 'لا فرق'],
      ['It respects the font size the user chose in the browser settings', 'It renders faster', 'px does not work on mobile', 'No difference'],
      ['Kullanıcının tarayıcı ayarlarında seçtiği yazı boyutuna saygı gösterir', 'Daha hızlı çizilir', 'px mobilde çalışmaz', 'Fark yok']), answer: 0,
    why: W('ضعيفو البصر يكبّرون الخط الافتراضي، والـ px الثابتة تتجاهل ذلك. أما الحدود الرفيعة فـ px مناسبة لها.', 'People with low vision raise the default font size, and fixed px ignores it. For thin borders, px is fine.', 'Az gören kişiler varsayılan yazı boyutunu büyütür; sabit px bunu yok sayar. İnce kenarlıklar için px uygundur.') }),
  choice({ ...c, id: 'c-m2-auto-fit', level: 'mid',
    prompt: W('ماذا يفعل هذا السطر؟', 'What does this line do?', 'Bu satır ne yapar?'),
    code: `.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }`,
    options: L3(['أكبر عدد ممكن من الأعمدة بعرض 220px على الأقل، تتمدد لتملأ الصف، بدون media queries', 'ثلاثة أعمدة ثابتة', 'عمود واحد دائمًا', 'أعمدة بعرض 220px بالضبط'],
      ['As many columns as fit, each at least 220px, stretching to fill the row, with no media queries', 'Three fixed columns', 'Always one column', 'Columns exactly 220px wide'],
      ['Sığdığı kadar sütun, her biri en az 220px, satırı dolduracak şekilde uzar; media query gerekmez', 'Üç sabit sütun', 'Her zaman tek sütun', 'Tam 220px genişliğinde sütunlar']), answer: 0,
    why: W('على الجوال عمود واحد، وعلى الشاشات الكبيرة أعمدة أكثر تلقائيًا. auto-fill يترك أعمدة فارغة بدل التمدد.', 'One column on a phone, more columns on big screens automatically. auto-fill keeps empty tracks instead of stretching.', 'Telefonda tek sütun, büyük ekranlarda otomatik olarak daha fazla. auto-fill uzamak yerine boş sütunlar bırakır.') }),

  // ───────── Senior ─────────
  choice({ ...c, id: 'c-s2-layers', level: 'senior',
    prompt: W('ما لون الزر؟', 'What colour is the button?', 'Buton ne renk?'),
    code: `@layer base, components;
@layer components { .btn { color: blue; } }
@layer base { #save.btn { color: red; } }`,
    options: ['blue', 'red', 'black', 'purple'], answer: 0,
    why: W('ترتيب الطبقات يسبق الخصوصية: components معلنة بعد base فتفوز حتى لو كان محدد base أقوى. مفيد لترويض CSS المكتبات.', 'Layer order beats specificity: components is declared after base, so it wins even against a stronger base selector. Handy for taming library CSS.', 'Katman sırası özgüllükten önce gelir: components, base’ten sonra tanımlı, daha güçlü base seçicisini bile yener. Kütüphane CSS’ini evcilleştirmek için kullanışlı.') }),
  choice({ ...c, id: 'c-s2-where', level: 'senior',
    prompt: W('ما خصوصية هذا المحدد؟', 'What is this selector’s specificity?', 'Bu seçicinin özgüllüğü nedir?'),
    code: `:where(#app .card) p { margin: 0; }`,
    options: L3(['خصوصية p فقط (0,0,1)؛ ‏:where لا تضيف شيئًا فيسهل تجاوزها', 'مثل id (1,1,1)', 'أعلى من !important', 'صفر لكل المحدد'],
      ['Only p’s specificity (0,0,1); :where adds nothing, so it is easy to override', 'Like an id (1,1,1)', 'Higher than !important', 'Zero for the whole selector'],
      ['Yalnızca p’nin özgüllüğü (0,0,1); :where hiçbir şey eklemez, kolayca geçersiz kılınır', 'id gibi (1,1,1)', '!important’tan yüksek', 'Tüm seçici için sıfır']), answer: 0,
    why: W(':where مثالية لأنماط reset والمكتبات. أما :is فتأخذ خصوصية أقوى عنصر في قائمتها.', ':where is ideal for resets and libraries. :is takes the specificity of the strongest item in its list.', ':where reset’ler ve kütüphaneler için idealdir. :is listesindeki en güçlü öğenin özgüllüğünü alır.') }),
  choice({ ...c, id: 'c-s2-content-visibility', level: 'senior',
    prompt: W('صفحة طويلة جدًا فيها مئات الأقسام وتأخذ وقتًا في الرسم الأول. ما الذي يساعد؟', 'A very long page with hundreds of sections is slow to render first. What helps?', 'Yüzlerce bölümlü çok uzun bir sayfa ilk çizimde yavaş. Ne yardımcı olur?'),
    code: `.section {
  content-visibility: auto;
  contain-intrinsic-size: auto 600px;
}`,
    options: L3(['يتخطى المتصفح رسم الأقسام البعيدة عن الشاشة حتى تقترب منها', 'يخفي الأقسام نهائيًا', 'يحمّل الأقسام من الخادم لاحقًا', 'لا يؤثر على الأداء'],
      ['The browser skips rendering sections far off screen until they come near', 'It hides the sections for good', 'It fetches the sections from the server later', 'It does not affect performance'],
      ['Tarayıcı ekrandan uzak bölümlerin çizimini, yaklaşana dek atlar', 'Bölümleri kalıcı gizler', 'Bölümleri sonra sunucudan getirir', 'Performansı etkilemez']), answer: 0,
    why: W('contain-intrinsic-size يعطي ارتفاعًا تقديريًا حتى لا يقفز شريط التمرير. المحتوى يبقى في DOM ويمكن البحث فيه.', 'contain-intrinsic-size gives an estimated height so the scrollbar does not jump. The content stays in the DOM and remains searchable.', 'contain-intrinsic-size tahmini bir yükseklik verir, kaydırma çubuğu zıplamaz. İçerik DOM’da kalır ve aranabilir.') }),
  choice({ ...c, id: 'c-s2-will-change', level: 'senior',
    prompt: W('ما المشكلة في هذه القاعدة؟', 'What is wrong with this rule?', 'Bu kuralın sorunu ne?'),
    code: `* { will-change: transform, opacity; }`,
    options: L3(['تنشئ طبقة GPU لكل عنصر فتستهلك الذاكرة وتبطئ الصفحة؛ استخدمه لعناصر محددة قبل حركتها', 'لا مشكلة، تسرّع كل شيء', 'لا تعمل مع opacity', 'تمنع الحركات'],
      ['It creates a GPU layer for every element, eating memory and slowing the page; use it only on specific elements before they animate', 'No problem, it speeds everything up', 'It does not work with opacity', 'It blocks animations'],
      ['Her öğe için GPU katmanı oluşturur, bellek tüketir ve sayfayı yavaşlatır; yalnızca canlanmadan önce belirli öğelerde kullan', 'Sorun yok, her şeyi hızlandırır', 'opacity ile çalışmaz', 'Animasyonları engeller']), answer: 0,
    why: W('will-change تلميح لحالات محددة قيست مشكلتها، لا تحسين عام. وهو ينشئ أيضًا stacking context جديدًا.', 'will-change is a hint for specific, measured cases, not a general boost. It also creates a new stacking context.', 'will-change ölçülmüş belirli durumlar için bir ipucudur, genel bir hızlandırma değil. Ayrıca yeni bir stacking context oluşturur.') }),
  choice({ ...c, id: 'c-s2-dvh', level: 'senior',
    prompt: W('صفحة بارتفاع 100vh يُقص أسفلها في Safari على iPhone بسبب شريط العنوان. ما الحل الحديث؟', 'A 100vh page gets its bottom cut off in Safari on iPhone because of the address bar. The modern fix?', 'iPhone Safari’de 100vh bir sayfanın altı adres çubuğu yüzünden kesiliyor. Modern çözüm?'),
    options: ['height: 100dvh;', 'height: 100%;', 'height: 100vw;', 'height: calc(100vh + 50px);'], answer: 0,
    why: W('dvh يتغير مع ظهور واختفاء أشرطة المتصفح، وsvh هو الأصغر دائمًا، وlvh الأكبر.', 'dvh changes as the browser bars show and hide; svh is always the smallest and lvh the largest.', 'dvh tarayıcı çubukları görünüp kayboldukça değişir; svh her zaman en küçük, lvh en büyüktür.') }),
  choice({ ...c, id: 'c-s2-subgrid', level: 'senior',
    prompt: W('بطاقات في شبكة، وعناوينها بأطوال مختلفة فلا تتحاذى الأزرار أسفلها. ما الحل؟', 'Cards sit in a grid, and their titles differ in length, so the buttons below do not line up. The fix?', 'Kartlar bir ızgarada ve başlıkların uzunlukları farklı, alttaki butonlar hizalanmıyor. Çözüm?'),
    code: `.card { display: grid; grid-row: span 3; grid-template-rows: ???; }`,
    options: ['subgrid', 'auto', '1fr 1fr 1fr', 'masonry'], answer: 0,
    why: W('subgrid يجعل صفوف البطاقة تستخدم صفوف الشبكة الأم، فتتحاذى العناوين والأوصاف والأزرار عبر كل البطاقات.', 'subgrid makes the card’s rows use the parent grid’s rows, so titles, descriptions and buttons align across all cards.', 'subgrid kartın satırlarının üst ızgaranın satırlarını kullanmasını sağlar; başlıklar, açıklamalar ve butonlar tüm kartlarda hizalanır.') }),
  choice({ ...c, id: 'c-s2-light-dark', level: 'senior',
    prompt: W('ماذا يفعل هذا الكود؟', 'What does this code do?', 'Bu kod ne yapar?'),
    code: `:root { color-scheme: light dark; }
body { background: light-dark(#fbf1e4, #120c09); }`,
    options: L3(['يختار لون الخلفية حسب الوضع الفاتح أو الداكن للنظام، ويضبط عناصر المتصفح الافتراضية أيضًا', 'يمزج اللونين', 'يعمل في الطباعة فقط', 'يحدد لونًا عشوائيًا'],
      ['Picks the background by the system light or dark mode, and also adapts the browser’s default controls', 'Blends the two colours', 'Only works when printing', 'Picks a random colour'],
      ['Arka planı sistemin açık ya da koyu moduna göre seçer ve tarayıcının varsayılan kontrollerini de uyarlar', 'İki rengi karıştırır', 'Sadece yazdırırken çalışır', 'Rastgele renk seçer']), answer: 0,
    why: W('color-scheme يجعل أشرطة التمرير والحقول تتبع الوضع، وlight-dark() يختصر media query لكل لون.', 'color-scheme makes scrollbars and form fields follow the mode, and light-dark() saves a media query per colour.', 'color-scheme kaydırma çubuklarının ve form alanlarının moda uymasını sağlar; light-dark() her renk için media query’den kurtarır.') }),
  choice({ ...c, id: 'c-s2-scroll-snap', level: 'senior',
    prompt: W('تريد شريط صور أفقي يتوقف كل صورة في مكانها عند التمرير، بدون JavaScript. ما الخصائص؟', 'You want a horizontal image strip where each image snaps into place on scroll, without JavaScript. Which properties?', 'Kaydırınca her resmin yerine oturduğu, JavaScript’siz yatay bir resim şeridi istiyorsun. Hangi özellikler?'),
    options: ['.strip { scroll-snap-type: x mandatory; } .strip > img { scroll-snap-align: start; }', '.strip { overflow: snap; }', '.strip { scroll-behavior: smooth; }', '.strip img { position: sticky; }'], answer: 0,
    why: W('scroll-snap يعمل مع اللمس والفأرة ويحترم إمكانية الوصول، بدل مكتبات sliders الثقيلة.', 'scroll-snap works with touch and mouse and respects accessibility, instead of heavy slider libraries.', 'scroll-snap dokunma ve fareyle çalışır ve erişilebilirliğe saygı duyar; ağır slider kütüphanelerinin yerine.') }),
  choice({ ...c, id: 'c-s2-supports', level: 'senior',
    prompt: W('كيف تستخدم ميزة حديثة مع بديل للمتصفحات القديمة؟', 'How do you use a modern feature with a fallback for older browsers?', 'Eski tarayıcılar için yedekle modern bir özelliği nasıl kullanırsın?'),
    code: `.card { background: #fff; }
@??? (backdrop-filter: blur(8px)) {
  .card { background: rgb(255 255 255 / 60%); backdrop-filter: blur(8px); }
}`,
    options: ['@supports', '@media', '@if', '@feature'], answer: 0,
    why: W('@supports يطبق القواعد فقط إن فهم المتصفح الخاصية. وهذا أفضل من فحص اسم المتصفح.', '@supports applies rules only if the browser understands the property. That beats sniffing browser names.', '@supports kuralları yalnızca tarayıcı özelliği anlıyorsa uygular. Tarayıcı adını yoklamaktan iyidir.') }),
  choice({ ...c, id: 'c-s2-fixed-in-transform', level: 'senior',
    prompt: W('نافذة position: fixed داخل عنصر عليه transform لا تلتصق بالشاشة وتتحرك مع العنصر. لماذا؟', 'A position: fixed modal inside an element with a transform does not stick to the viewport and moves with it. Why?', 'transform’lu bir öğenin içindeki position: fixed modal ekrana sabitlenmiyor, öğeyle birlikte kayıyor. Neden?'),
    options: L3(['transform (وfilter وcontain) يجعل العنصر مرجعًا للعناصر fixed بداخله بدل الشاشة', 'fixed لا يعمل في Chrome', 'z-index منخفض', 'ينقص top: 0'],
      ['transform (and filter and contain) makes the element the containing block for fixed children instead of the viewport', 'fixed does not work in Chrome', 'The z-index is low', 'top: 0 is missing'],
      ['transform (ve filter, contain) öğeyi, içindeki fixed öğeler için ekran yerine kapsayıcı blok yapar', 'fixed Chrome’da çalışmaz', 'z-index düşük', 'top: 0 eksik']), answer: 0,
    why: W('لهذا تُرسم النوافذ في body عبر portal، أو بـ <dialog> الذي يظهر في الطبقة العليا.', 'That is why modals are rendered into body through a portal, or with <dialog>, which shows in the top layer.', 'Bu yüzden modallar bir portal ile body’ye ya da üst katmanda görünen <dialog> ile çizilir.') }),
  choice({ ...c, id: 'c-s2-isolation', level: 'senior',
    prompt: W('مكوّن فيه عناصر بـ z-index: 10 تظهر فوق نافذة الموقع. ما الحل دون رفع كل الأرقام؟', 'A component’s z-index: 10 elements show above the site’s modal. The fix without raising every number?', 'Bir bileşenin z-index: 10 öğeleri sitenin modalının üstünde görünüyor. Tüm sayıları artırmadan çözüm?'),
    code: `.widget { ??? }`,
    options: ['isolation: isolate;', 'z-index: -1;', 'position: static;', 'overflow: visible;'], answer: 0,
    why: W('isolation: isolate ينشئ stacking context جديدًا، فتبقى أرقام z-index الداخلية محصورة داخل المكوّن.', 'isolation: isolate creates a new stacking context, so the inner z-index values stay contained within the component.', 'isolation: isolate yeni bir stacking context oluşturur; içteki z-index değerleri bileşenin içinde kalır.') }),
  choice({ ...c, id: 'c-s2-print-media-trick', level: 'senior',
    prompt: W('ملف CSS غير ضروري للعرض الأول يوقف الرسم. ما الحيلة الشائعة لتحميله دون إيقاف؟', 'A CSS file not needed for first paint blocks rendering. The common trick to load it without blocking?', 'İlk çizim için gerekmeyen bir CSS dosyası çizimi engelliyor. Engellemeden yüklemenin yaygın hilesi?'),
    options: [`<link rel="stylesheet" href="extra.css" media="print" onload="this.media='all'">`, '<link rel="stylesheet" href="extra.css" async>', '<link rel="stylesheet" href="extra.css" defer>', '<style src="extra.css" lazy>'], answer: 0, codeLang: 'html',
    why: W('ملف print لا يوقف الرسم على الشاشة، ثم يتحول إلى all بعد تحميله. والـ CSS الحرج للعرض الأول يوضع مضمّنًا.', 'A print stylesheet does not block screen rendering, and it switches to all once loaded. Critical first-paint CSS goes inline.', 'Bir print stil dosyası ekran çizimini engellemez, yüklenince all’a geçer. İlk çizim için kritik CSS satır içine konur.') }),
  choice({ ...c, id: 'c-s2-is-specificity', level: 'senior',
    prompt: W('ما خصوصية هذا المحدد؟', 'What is this selector’s specificity?', 'Bu seçicinin özgüllüğü nedir?'),
    code: `:is(#nav, .menu) a { color: red; }`,
    options: L3(['(1,0,1): ‏:is تأخذ خصوصية أقوى عنصر في قائمتها، وهو #nav', '(0,1,1)', '(0,0,1)', 'تتغير حسب العنصر المطابق'],
      ['(1,0,1): :is takes the specificity of the strongest item in its list, #nav', '(0,1,1)', '(0,0,1)', 'It depends on which item matched'],
      ['(1,0,1): :is listesindeki en güçlü öğenin, yani #nav’ın özgüllüğünü alır', '(0,1,1)', '(0,0,1)', 'Eşleşen öğeye göre değişir']), answer: 0,
    why: W('حتى عندما يطابق .menu، تبقى الخصوصية بقوة id. هذا يفاجئ كثيرين، ولهذا وُجدت :where.', 'Even when .menu matches, the specificity stays at id strength. That surprises many people, and it is why :where exists.', '.menu eşleştiğinde bile özgüllük id gücünde kalır. Bu birçok kişiyi şaşırtır; :where bu yüzden var.') }),
]
