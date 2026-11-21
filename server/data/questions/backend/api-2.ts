import type { Question } from '#shared/types/quiz'
import { choice, output } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const topic = 'api' as const

export const API_2: Question[] = [
  // ───────── Junior ─────────
  output({ id: 'api-j2-stringify-undefined', level: 'junior', topic,
    code: `const body = { name: 'Ali', phone: undefined, note: null }
console.log(JSON.stringify(body))`,
    options: ['{"name":"Ali","note":null}', '{"name":"Ali","phone":undefined,"note":null}', '{"name":"Ali","phone":null,"note":null}', '{"name":"Ali"}'], answer: 0,
    why: W('JSON لا يعرف undefined، فيُحذف الحقل كليًا، بينما null تُرسل كما هي. انتبه لهذا عند إرسال البيانات للخادم.', 'JSON has no undefined, so the field is dropped entirely, while null is sent as is. Keep this in mind when sending data to a server.', 'JSON’da undefined yoktur; alan tamamen düşer, null ise olduğu gibi gönderilir. Sunucuya veri gönderirken bunu unutma.') }),
  output({ id: 'api-j2-query-get', level: 'junior', topic,
    code: `const q = new URLSearchParams('page=2&sort=name')
console.log(q.get('page'), typeof q.get('page'), q.get('limit'))`,
    options: ['2 string null', '2 number null', '2 string undefined', '2 number 0'], answer: 0,
    why: W('قيم الرابط نصوص دائمًا، والمعامل غير الموجود يرجع null. حوّل الأرقام وتحقق منها في الخادم.', 'URL values are always strings, and a missing parameter returns null. Convert and validate numbers on the server.', 'URL değerleri her zaman metindir; olmayan parametre null döner. Sayıları sunucuda çevir ve doğrula.') }),
  output({ id: 'api-j2-price-string', level: 'junior', topic,
    code: `const item = JSON.parse('{"price": "10", "qty": 2}')
console.log(item.price + item.qty)`,
    options: ['102', '12', 'NaN', '20'], answer: 0,
    why: W('السعر أُرسل كنص، فتحوّل + إلى دمج نصوص. أرسل الأرقام في JSON كأرقام، وحدّد الأنواع في توثيق الـ API.', 'The price was sent as a string, so + becomes string joining. Send numbers in JSON as numbers, and state types in the API docs.', 'Fiyat metin olarak gönderilmiş; + metin birleştirmeye dönüşür. JSON’da sayıları sayı olarak gönder ve tipleri API belgesinde belirt.') }),
  choice({ id: 'api-j2-404', level: 'junior', topic,
    prompt: W('طلب GET /users/999 والمستخدم غير موجود. ما الرمز المناسب؟', 'GET /users/999 and the user does not exist. Which status fits?', 'GET /users/999 ve kullanıcı yok. Hangi durum kodu uygun?'),
    options: {

      ar: ['404 Not Found', '200 OK مع جسم فارغ', '500 Internal Server Error', '400 Bad Request'],

      en: ['404 Not Found', '200 OK with an empty body', '500 Internal Server Error', '400 Bad Request'],

      tr: ['404 Not Found', 'Boş gövdeyle 200 OK', '500 Internal Server Error', '400 Bad Request'],

    }, answer: 0,
    why: W('الطلب صحيح، لكن المورد غير موجود. 400 للطلب المكتوب خطأ، و500 لأخطاء الخادم.', 'The request is valid but the resource is missing. 400 is for a malformed request, 500 for server errors.', 'İstek geçerli ama kaynak yok. 400 hatalı istek, 500 sunucu hataları içindir.') }),
  choice({ id: 'api-j2-204', level: 'junior', topic,
    prompt: W('بعد DELETE /posts/7 الناجح ولا يوجد ما تُرجعه. أي رمز؟', 'After a successful DELETE /posts/7 with nothing to return. Which status?', 'Başarılı DELETE /posts/7 sonrası döndürecek bir şey yok. Hangi kod?'),
    options: ['204 No Content', '201 Created', '202 Accepted', '304 Not Modified'], answer: 0,
    why: W('204 يعني «تم بنجاح ولا يوجد جسم». 201 للإنشاء، و202 لعمل سيكتمل لاحقًا.', '204 means "done, no body". 201 is for creation, 202 for work that finishes later.', '204 "tamam, gövde yok" demektir. 201 oluşturma, 202 sonra bitecek iş içindir.') }),
  choice({ id: 'api-j2-safe-method', level: 'junior', topic,
    prompt: W('أي طريقة HTTP يجب ألا تغيّر أي بيانات في الخادم؟', 'Which HTTP method must not change any data on the server?', 'Hangi HTTP metodu sunucudaki veriyi değiştirmemelidir?'),
    options: ['GET', 'POST', 'DELETE', 'PATCH'], answer: 0,
    why: W('GET «آمن»: المتصفحات والكاش والزواحف قد تستدعيه في أي وقت. لا تجعل رابط GET يحذف أو يعدّل شيئًا.', 'GET is "safe": browsers, caches and crawlers may call it anytime. Never let a GET link delete or change anything.', 'GET "güvenli"dir: tarayıcılar, önbellekler ve tarayıcı botlar onu her an çağırabilir. Bir GET bağlantısı asla bir şey silmemeli ya da değiştirmemeli.') }),
  choice({ id: 'api-j2-accept', level: 'junior', topic,
    prompt: W('ماذا يعني الترويسة Accept: application/json في الطلب؟', 'What does the request header Accept: application/json mean?', 'İstekteki Accept: application/json başlığı ne demektir?'),
    options: L3(
      ['العميل يطلب أن يكون الرد بصيغة JSON', 'جسم الطلب بصيغة JSON', 'العميل مسجّل دخوله', 'الخادم يقبل الطلب'],
      ['The client asks for the response in JSON', 'The request body is JSON', 'The client is logged in', 'The server accepts the request'],
      ['İstemci yanıtı JSON olarak istiyor', 'İstek gövdesi JSON', 'İstemci giriş yapmış', 'Sunucu isteği kabul ediyor'],
    ), answer: 0,
    why: W('Accept تصف ما يريده العميل في الرد، أما Content-Type فتصف صيغة الجسم المرسل فعلًا.', 'Accept describes what the client wants back; Content-Type describes the format of the body actually sent.', 'Accept istemcinin yanıtta ne istediğini, Content-Type ise gerçekten gönderilen gövdenin biçimini anlatır.') }),
  choice({ id: 'api-j2-301', level: 'junior', topic,
    prompt: W('نقلت الـ API من /v1/items إلى /items نهائيًا. أي رمز يخبر العملاء ومحركات البحث بذلك؟', 'You moved the API from /v1/items to /items for good. Which status tells clients and search engines?', 'API’yi /v1/items’tan /items’a kalıcı olarak taşıdın. Hangi kod bunu istemcilere ve arama motorlarına söyler?'),
    options: ['301 Moved Permanently', '302 Found', '404 Not Found', '410 Gone'], answer: 0,
    why: W('301 تحويل دائم مع ترويسة Location. 302 مؤقت، و410 يعني أن المورد حُذف ولن يعود.', '301 is a permanent redirect with a Location header. 302 is temporary, and 410 means the resource is gone for good.', '301 Location başlıklı kalıcı yönlendirmedir. 302 geçici, 410 kaynağın kalıcı olarak kaldırıldığı anlamına gelir.') }),
  choice({ id: 'api-j2-path-vs-query', level: 'junior', topic,
    prompt: W('ما التصميم الأوضح لجلب كتب قسم معين مرتبة حسب السعر؟', 'Which design is clearest for fetching one category’s books sorted by price?', 'Bir kategorinin kitaplarını fiyata göre sıralı getirmek için en net tasarım hangisi?'),
    options: ['GET /books?category=novels&sort=price', 'POST /getBooksByCategorySorted', 'GET /books/novels/sort/price/asc', 'GET /books?action=get&category=novels'], answer: 0, codeLang: 'http',
    why: W('المسار يحدد المورد (books)، ومعاملات الرابط للفلترة والترتيب والترقيم. والفعل في الطريقة GET لا في اسم المسار.', 'The path names the resource (books); query parameters filter, sort and paginate. The verb lives in the GET method, not the path.', 'Yol kaynağı (books) adlandırır; query parametreleri filtreler, sıralar ve sayfalar. Fiil yol adında değil GET metodundadır.') }),
  choice({ id: 'api-j2-key-in-url', level: 'junior', topic,
    prompt: W('أين ترسل مفتاح الـ API في طلباتك؟', 'Where do you send the API key in your requests?', 'API anahtarını isteklerinde nereye koyarsın?'),
    options: L3(
      ['في ترويسة مثل Authorization، لا في الرابط', 'في الرابط ?key=…', 'في كود الواجهة الأمامية', 'في اسم النطاق'],
      ['In a header such as Authorization, not in the URL', 'In the URL as ?key=…', 'In the frontend code', 'In the domain name'],
      ['Authorization gibi bir başlıkta, URL’de değil', 'URL’de ?key=… olarak', 'Ön yüz kodunda', 'Alan adında'],
    ), answer: 0,
    why: W('الروابط تُحفظ في سجلات الخوادم وسجل المتصفح وترويسة Referer، فيتسرّب المفتاح بسهولة.', 'URLs end up in server logs, browser history and the Referer header, so the key leaks easily.', 'URL’ler sunucu loglarına, tarayıcı geçmişine ve Referer başlığına düşer; anahtar kolayca sızar.') }),
  choice({ id: 'api-j2-cors-curl', level: 'junior', topic,
    prompt: W('الطلب يعمل من Postman وcurl، لكنه يفشل من المتصفح بخطأ CORS. لماذا؟', 'The request works from Postman and curl but fails in the browser with a CORS error. Why?', 'İstek Postman ve curl’de çalışıyor ama tarayıcıda CORS hatasıyla başarısız. Neden?'),
    options: L3(
      ['CORS قاعدة يطبقها المتصفح فقط، والخادم لم يسمح لنطاق موقعك', 'الخادم معطّل', 'Postman يستخدم إنترنت أسرع', 'المتصفح لا يدعم JSON'],
      ['CORS is enforced only by browsers, and the server has not allowed your site’s origin', 'The server is down', 'Postman uses faster internet', 'The browser does not support JSON'],
      ['CORS yalnızca tarayıcılarca uygulanır ve sunucu sitenin kökenine izin vermemiş', 'Sunucu çalışmıyor', 'Postman daha hızlı internet kullanıyor', 'Tarayıcı JSON desteklemiyor'],
    ), answer: 0,
    why: W('الحل في الخادم: Access-Control-Allow-Origin للنطاق المسموح. CORS لا يحمي الخادم من curl؛ هو يحمي المستخدم في المتصفح.', 'The fix is on the server: Access-Control-Allow-Origin for the allowed origin. CORS does not protect the server from curl; it protects the user in the browser.', 'Çözüm sunucudadır: izin verilen köken için Access-Control-Allow-Origin. CORS sunucuyu curl’den korumaz; tarayıcıdaki kullanıcıyı korur.') }),
  choice({ id: 'api-j2-stateless', level: 'junior', topic,
    prompt: W('ماذا يعني أن HTTP «بلا حالة» (stateless)؟', 'What does it mean that HTTP is stateless?', 'HTTP’nin durumsuz (stateless) olması ne demektir?'),
    options: L3(
      ['كل طلب يحمل كل ما يحتاجه الخادم لفهمه، مثل رمز الدخول', 'الخادم لا يستخدم قاعدة بيانات', 'الطلبات لا تُرجع حالة', 'لا يمكن تسجيل الدخول'],
      ['Each request carries everything the server needs to understand it, like the auth token', 'The server uses no database', 'Requests return no status code', 'Logging in is impossible'],
      ['Her istek, sunucunun onu anlaması için gereken her şeyi (giriş token’ı gibi) taşır', 'Sunucu veritabanı kullanmaz', 'İstekler durum kodu döndürmez', 'Giriş yapmak imkânsız'],
    ), answer: 0,
    why: W('لهذا ترسل الكوكيز أو الرمز مع كل طلب. وهذا ما يسمح بتوزيع الطلبات على عدة خوادم.', 'That is why cookies or a token go with every request, and why requests can be spread across several servers.', 'Bu yüzden çerezler veya token her istekle gider; istekler bu sayede birden çok sunucuya dağıtılabilir.') }),
  choice({ id: 'api-j2-pagination-meta', level: 'junior', topic,
    prompt: W('ماذا يُفضّل أن يحتوي رد قائمة مقسّمة لصفحات؟', 'What should a paginated list response include?', 'Sayfalanmış bir liste yanıtı neleri içermeli?'),
    options: L3(
      ['العناصر، ومعلومات الصفحة التالية (رقم أو cursor)، وأحيانًا العدد الكلي', 'كل العناصر دفعة واحدة', 'رقم الصفحة فقط', 'رابط ملف CSV'],
      ['The items, how to get the next page (number or cursor), and sometimes the total', 'Every item at once', 'Only the page number', 'A CSV file link'],
      ['Öğeler, sonraki sayfanın nasıl alınacağı (numara veya cursor) ve bazen toplam', 'Tüm öğeler tek seferde', 'Sadece sayfa numarası', 'Bir CSV dosyası bağlantısı'],
    ), answer: 0,
    why: W('مثلًا: { "data": [...], "next_cursor": "abc", "has_more": true }. والعدد الكلي مكلف على الجداول الكبيرة فاجعله اختياريًا.', 'For example: { "data": [...], "next_cursor": "abc", "has_more": true }. A total count is costly on big tables, so make it optional.', 'Örneğin: { "data": [...], "next_cursor": "abc", "has_more": true }. Büyük tablolarda toplam sayı maliyetlidir; isteğe bağlı yap.') }),

  // ───────── Mid ─────────
  output({ id: 'api-m2-date-json', level: 'mid', topic,
    code: `const event = { at: new Date(Date.UTC(2026, 0, 2, 9, 30)) }
const sent = JSON.stringify(event)
console.log(sent)
console.log(typeof JSON.parse(sent).at)`,
    options: ['{"at":"2026-01-02T09:30:00.000Z"}, string', '{"at":1767346200000}, number', '{"at":{}}, object', '{"at":"2026-01-02T09:30:00.000Z"}, object'], answer: 0,
    why: W('التاريخ يتحول إلى نص ISO بتوقيت UTC، ويعود نصًا لا كائن Date. حوّله بنفسك بعد الاستلام، وأرسل التواريخ دائمًا بـ UTC.', 'A Date becomes an ISO string in UTC, and comes back as a string, not a Date. Convert it yourself after receiving, and always send dates in UTC.', 'Date UTC’de ISO metnine dönüşür ve Date olarak değil metin olarak geri gelir. Aldıktan sonra kendin çevir; tarihleri her zaman UTC gönder.') }),
  output({ id: 'api-m2-patch-null', level: 'mid', topic,
    code: `// PATCH /users/7 body
console.log(JSON.stringify({ phone: undefined }))
console.log(JSON.stringify({ phone: null }))`,
    options: ['{}, {"phone":null}', '{"phone":null}, {"phone":null}', '{"phone":undefined}, {"phone":null}', '{}, {}'], answer: 0,
    why: W('في PATCH يجب التمييز: حقل غير موجود يعني «لا تغيّره»، وnull يعني «امسح القيمة». وهذا ما يقوله JSON Merge Patch.', 'In PATCH you must tell them apart: a missing field means "leave it", null means "clear it". That is what JSON Merge Patch says.', 'PATCH’te ayırt etmelisin: olmayan alan "değiştirme", null "değeri sil" demektir. JSON Merge Patch bunu söyler.') }),
  output({ id: 'api-m2-encode', level: 'mid', topic,
    code: `const q = 'C# & .NET'
console.log('/search?q=' + q)
console.log('/search?q=' + encodeURIComponent(q))`,
    options: ['/search?q=C# & .NET, /search?q=C%23%20%26%20.NET', '/search?q=C# & .NET, /search?q=C#%20&%20.NET', '/search?q=C%23, /search?q=C%23%20%26%20.NET', '/search?q=C# & .NET, /search?q=C# & .NET'], answer: 0,
    why: W('بدون ترميز يصبح # بداية جزء الصفحة و& فاصل معاملات، فيصل للخادم "C" فقط. أو استخدم URLSearchParams.', 'Unencoded, # starts the fragment and & splits parameters, so the server only gets "C". Or use URLSearchParams.', 'Kodlanmadan # parça başlangıcı, & parametre ayracı olur; sunucuya sadece "C" ulaşır. Ya da URLSearchParams kullan.') }),
  output({ id: 'api-m2-getall', level: 'mid', topic,
    code: `const q = new URLSearchParams('tag=vue&tag=nuxt')
console.log(q.get('tag'), q.getAll('tag'))`,
    options: ["vue [ 'vue', 'nuxt' ]", "nuxt [ 'vue', 'nuxt' ]", "vue,nuxt [ 'vue,nuxt' ]", "vue [ 'vue' ]"], answer: 0,
    why: W('get ترجع أول قيمة فقط. عند قبول قيم متعددة استخدم getAll، ووثّق الصيغة: تكرار المفتاح أو قائمة بفواصل.', 'get returns only the first value. When accepting several values use getAll, and document the format: repeated keys or a comma list.', 'get yalnızca ilk değeri döndürür. Birden çok değer kabul ederken getAll kullan ve biçimi belgele: tekrarlı anahtar ya da virgüllü liste.') }),
  output({ id: 'api-m2-fetch-404', level: 'mid', topic,
    code: `const res = new Response('{"error":"not found"}', { status: 404 })
console.log(res.ok, res.status)
const data = await res.json()
console.log(data.error)`,
    options: ['false 404, not found', 'Error', 'true 404, not found', 'false 404, undefined'], answer: 0,
    why: W('fetch لا يرمي خطأ عند 404 أو 500؛ يرمي فقط عند فشل الشبكة. افحص res.ok بنفسك قبل استخدام البيانات.', 'fetch does not throw on 404 or 500; it only throws on network failure. Check res.ok yourself before using the data.', 'fetch 404 ya da 500’de hata fırlatmaz; yalnızca ağ hatasında fırlatır. Veriyi kullanmadan önce res.ok’u kendin kontrol et.') }),
  choice({ id: 'api-m2-409', level: 'mid', topic,
    prompt: W('POST /users ببريد مسجّل مسبقًا. أي رمز هو الأنسب؟', 'POST /users with an email that is already registered. Which status fits best?', 'Zaten kayıtlı bir e-postayla POST /users. En uygun kod hangisi?'),
    options: ['409 Conflict', '500 Internal Server Error', '200 OK', '404 Not Found'], answer: 0,
    why: W('409 يعني تعارضًا مع حالة المورد الحالية. ولا تترك قيد UNIQUE في قاعدة البيانات يتحول إلى 500.', '409 means a conflict with the current state of the resource. Do not let the database UNIQUE error turn into a 500.', '409, kaynağın mevcut durumuyla çakışma demektir. Veritabanındaki UNIQUE hatasının 500’e dönüşmesine izin verme.') }),
  choice({ id: 'api-m2-location', level: 'mid', topic,
    prompt: W('بعد POST /orders يرجع الخادم 201 Created. أي ترويسة تُخبر العميل بمكان الطلب الجديد؟', 'After POST /orders the server returns 201 Created. Which header tells the client where the new order lives?', 'POST /orders sonrası sunucu 201 Created döndürüyor. Hangi başlık yeni siparişin yerini söyler?'),
    options: ['Location: /orders/1042', 'Content-Location: *', 'Referer: /orders', 'Host: /orders/1042'], answer: 0, codeLang: 'http',
    why: W('Location مع 201 تشير لرابط المورد الجديد، وعادة يُرجع الجسم المورد نفسه أيضًا.', 'Location with 201 points to the new resource’s URL, and the body usually returns the resource too.', '201 ile Location yeni kaynağın URL’sini gösterir; gövde genelde kaynağın kendisini de döndürür.') }),
  choice({ id: 'api-m2-no-store', level: 'mid', topic,
    prompt: W('رد GET /me فيه بيانات حساسة. أي ترويسة تمنع حفظه في أي كاش؟', 'The GET /me response has sensitive data. Which header stops any cache from storing it?', 'GET /me yanıtında hassas veri var. Hangi başlık hiçbir önbelleğin saklamasını engeller?'),
    options: ['Cache-Control: no-store', 'Cache-Control: no-cache', 'Cache-Control: max-age=0', 'Pragma: private'], answer: 0, codeLang: 'http',
    why: W('no-cache لا تعني «لا تحفظ»: تعني «احفظ لكن تحقق قبل الاستخدام». المنع الكامل هو no-store.', 'no-cache does not mean "do not store": it means "store, but check before use". Full prevention is no-store.', 'no-cache "saklama" demek değildir: "sakla ama kullanmadan önce kontrol et" demektir. Tam engel no-store’dur.') }),
  choice({ id: 'api-m2-422', level: 'mid', topic,
    prompt: W('الجسم JSON صحيح، لكن age = -5. أي رمز يشرح أن المشكلة في المحتوى لا في الصيغة؟', 'The body is valid JSON, but age = -5. Which status says the problem is the content, not the format?', 'Gövde geçerli JSON ama age = -5. Hangi kod sorunun biçimde değil içerikte olduğunu söyler?'),
    options: ['422 Unprocessable Content', '415 Unsupported Media Type', '405 Method Not Allowed', '503 Service Unavailable'], answer: 0,
    why: W('400 مقبول أيضًا عند كثير من الفرق، لكن 422 أدق لأخطاء التحقق، ومعه قائمة بالحقول الخاطئة.', 'Many teams use 400 too, but 422 is more precise for validation errors, along with a list of the bad fields.', 'Birçok ekip 400 de kullanır ama doğrulama hataları için 422 daha nettir; yanında hatalı alanların listesiyle.') }),
  choice({ id: 'api-m2-error-shape', level: 'mid', topic,
    prompt: W('ما أفضل شكل لرد الخطأ في الـ API؟', 'What is the best shape for an API error response?', 'API hata yanıtı için en iyi biçim nedir?'),
    options: L3(
      ['شكل ثابت لكل الأخطاء: رمز داخلي، ورسالة، وتفاصيل الحقول', 'نص عادي يختلف حسب المكان', 'رمز 200 مع success: false', 'تفاصيل الخطأ الكاملة مع stack trace'],
      ['One consistent shape for all errors: an internal code, a message, and field details', 'Plain text that differs by place', 'Status 200 with success: false', 'The full error details with the stack trace'],
      ['Tüm hatalar için tek tutarlı biçim: iç kod, mesaj ve alan ayrıntıları', 'Yere göre değişen düz metin', 'success: false ile 200 kodu', 'Stack trace dahil tüm hata ayrıntıları'],
    ), answer: 0,
    why: W('الشكل الثابت (مثل application/problem+json) يسهّل على العملاء معالجة الأخطاء. والـ stack trace يكشف تفاصيل داخلية للمهاجمين.', 'A consistent shape (like application/problem+json) makes errors easy for clients to handle. A stack trace leaks internals to attackers.', 'Tutarlı biçim (application/problem+json gibi) hataları istemciler için kolaylaştırır. Stack trace saldırganlara iç ayrıntıları sızdırır.') }),
  choice({ id: 'api-m2-cursor', level: 'mid', topic,
    prompt: W('تغذية أخبار تُضاف لها عناصر جديدة باستمرار. المستخدم يرى عناصر مكررة عند الانتقال للصفحة التالية. ما الحل؟', 'A news feed keeps getting new items, and users see duplicates when moving to the next page. The fix?', 'Sürekli yeni öğe eklenen bir haber akışında kullanıcılar sonraki sayfada tekrarlar görüyor. Çözüm?'),
    options: L3(
      ['ترقيم بالـ cursor: «أعطني ما بعد آخر عنصر رأيته»', 'تكبير حجم الصفحة', 'منع إضافة عناصر جديدة', 'ترتيب عشوائي'],
      ['Cursor pagination: "give me what comes after the last item I saw"', 'A bigger page size', 'Block new items', 'Random order'],
      ['Cursor sayfalama: "gördüğüm son öğeden sonrakileri ver"', 'Daha büyük sayfa boyutu', 'Yeni öğeleri engellemek', 'Rastgele sıralama'],
    ), answer: 0,
    why: W('مع ?page=2 تُزاح العناصر عند إضافة جديد في الأعلى، فيتكرر بعضها. الـ cursor يبدأ من نقطة ثابتة.', 'With ?page=2 items shift when a new one is added on top, so some repeat. A cursor starts from a fixed point.', '?page=2 ile üste yeni öğe eklenince öğeler kayar ve bazıları tekrarlanır. Cursor sabit bir noktadan başlar.') }),
  choice({ id: 'api-m2-bulk', level: 'mid', topic,
    prompt: W('الواجهة تحذف 200 عنصر محدد بإرسال 200 طلب DELETE. ما التحسين؟', 'The frontend deletes 200 selected items by sending 200 DELETE requests. The improvement?', 'Ön yüz seçilen 200 öğeyi 200 DELETE isteğiyle siliyor. İyileştirme nedir?'),
    options: {

      ar: ['POST /items/bulk-delete  { "ids": [ … ] }', 'DELETE /items?all=true', 'إرسالها كلها بالتوازي', 'GET /items/delete?ids=…'],

      en: ['POST /items/bulk-delete  { "ids": [ … ] }', 'DELETE /items?all=true', 'Send them all in parallel', 'GET /items/delete?ids=…'],

      tr: ['POST /items/bulk-delete  { "ids": [ … ] }', 'DELETE /items?all=true', 'Hepsini paralel göndermek', 'GET /items/delete?ids=…'],

    }, answer: 0, codeLang: 'http',
    why: W('طلب واحد بعمليات مجمّعة أسرع ويمكن تنفيذه داخل معاملة واحدة. ويجب أن يرجع نتيجة كل عنصر عند الفشل الجزئي.', 'One bulk request is faster and can run in one transaction. It should report per-item results on partial failure.', 'Tek toplu istek daha hızlıdır ve tek transaction’da çalışabilir. Kısmi hatada öğe başına sonuç bildirmelidir.') }),
  choice({ id: 'api-m2-head', level: 'mid', topic,
    prompt: W('تريد معرفة حجم ملف كبير ونوعه قبل تنزيله. أي طلب؟', 'You want a big file’s size and type before downloading it. Which request?', 'Büyük bir dosyanın boyutunu ve tipini indirmeden öğrenmek istiyorsun. Hangi istek?'),
    options: ['HEAD /files/report.pdf', 'GET /files/report.pdf', 'OPTIONS /files/report.pdf', 'POST /files/report.pdf/info'], answer: 0, codeLang: 'http',
    why: W('HEAD يرجع نفس ترويسات GET (مثل Content-Length وContent-Type) بدون الجسم.', 'HEAD returns the same headers as GET (like Content-Length and Content-Type) without the body.', 'HEAD, GET ile aynı başlıkları (Content-Length ve Content-Type gibi) gövdesiz döndürür.') }),

  // ───────── Senior ─────────
  output({ id: 'api-s2-bigint-id', level: 'senior', topic,
    code: `const res = JSON.parse('{"id": 1234567890123456789}')
console.log(res.id)
console.log(res.id === 1234567890123456789)`,
    options: ['1234567890123456800, true', '1234567890123456789, true', '1234567890123456789, false', 'Error'], answer: 0,
    why: W('أرقام JavaScript آمنة حتى 2^53 تقريبًا، فيتغير المعرّف بصمت. معرّفات 64 بت (مثل Snowflake) تُرسل كنصوص في JSON.', 'JavaScript numbers are safe only up to about 2^53, so the id changes silently. 64-bit ids (like Snowflake) should be sent as strings in JSON.', 'JavaScript sayıları yaklaşık 2^53’e kadar güvenlidir; kimlik sessizce değişir. 64 bit kimlikler (Snowflake gibi) JSON’da metin olarak gönderilmeli.') }),
  output({ id: 'api-s2-cursor-encode', level: 'senior', topic,
    code: `const cursor = Buffer.from(JSON.stringify({ id: 120, at: 1700 })).toString('base64url')
console.log(cursor)
console.log(JSON.parse(Buffer.from(cursor, 'base64url').toString()).id)`,
    options: ['eyJpZCI6MTIwLCJhdCI6MTcwMH0, 120', 'eyJpZCI6MTIwLCJhdCI6MTcwMH0=, 120', '{"id":120,"at":1700}, 120', 'eyJpZCI6MTIwLCJhdCI6MTcwMH0, undefined'], answer: 0,
    why: W('الـ cursor المعتم يخفي التفاصيل الداخلية ويسمح بتغيير طريقة الترقيم لاحقًا. base64url بدون = ومناسب للروابط. ووقّعه إذا لم ترد أن يعدّله العميل.', 'An opaque cursor hides internals and lets you change the pagination later. base64url has no = and is URL-safe. Sign it if clients must not edit it.', 'Opak bir cursor iç ayrıntıları gizler ve sayfalamayı sonra değiştirmene izin verir. base64url’de = yoktur ve URL için güvenlidir. İstemci değiştirmemeliyse imzala.') }),
  choice({ id: 'api-s2-if-match', level: 'senior', topic,
    prompt: W('موظفان يعدّلان نفس المنتج، والثاني يمسح تعديل الأول بدون أن يعرف. كيف تمنع هذا في الـ API؟', 'Two staff edit the same product, and the second silently overwrites the first. How does the API prevent this?', 'İki çalışan aynı ürünü düzenliyor ve ikincisi farkında olmadan birincinin değişikliğini siliyor. API bunu nasıl önler?'),
    options: L3(
      ['إرسال If-Match مع الـ ETag؛ إن تغيّر المورد يرجع الخادم 412 Precondition Failed', 'قفل المنتج لساعة عند فتحه', 'الاحتفاظ بآخر تعديل دائمًا', 'منع التعديل لأكثر من موظف'],
      ['Send If-Match with the ETag; if the resource changed the server returns 412 Precondition Failed', 'Lock the product for an hour when opened', 'Always keep the last write', 'Only allow one staff member to edit'],
      ['ETag ile If-Match göndermek; kaynak değiştiyse sunucu 412 Precondition Failed döndürür', 'Açılınca ürünü bir saat kilitlemek', 'Her zaman son yazanı tutmak', 'Düzenlemeyi tek çalışana vermek'],
    ), answer: 0,
    why: W('هذا optimistic concurrency: لا أقفال، والتعارض يُكتشف عند الحفظ فتطلب الواجهة من المستخدم مراجعة التغييرات.', 'This is optimistic concurrency: no locks; the conflict is detected on save and the UI asks the user to review the changes.', 'Bu iyimser eşzamanlılıktır: kilit yok; çakışma kayıtta yakalanır ve arayüz kullanıcıdan değişiklikleri incelemesini ister.') }),
  choice({ id: 'api-s2-sse', level: 'senior', topic,
    prompt: W('تريد إرسال إشعارات من الخادم للمتصفح فقط (اتجاه واحد) مع إعادة اتصال تلقائية. ما الأبسط؟', 'You need to push notifications from server to browser only (one way) with automatic reconnect. Simplest option?', 'Sunucudan tarayıcıya tek yönlü bildirim göndermek ve otomatik yeniden bağlanmak istiyorsun. En basiti?'),
    options: {

      ar: ['Server-Sent Events (EventSource)', 'WebSocket', 'Polling كل ثانية', 'WebRTC'],

      en: ['Server-Sent Events (EventSource)', 'WebSocket', 'Polling every second', 'WebRTC'],

      tr: ['Server-Sent Events (EventSource)', 'WebSocket', 'Her saniye polling', 'WebRTC'],

    }, answer: 0,
    why: W('SSE يعمل فوق HTTP العادي ويعيد الاتصال وحده. WebSocket مناسب عندما يحتاج الطرفان الإرسال بكثافة، مثل المحادثة.', 'SSE runs over plain HTTP and reconnects by itself. WebSocket fits when both sides send a lot, as in chat.', 'SSE düz HTTP üzerinde çalışır ve kendiliğinden yeniden bağlanır. WebSocket, sohbet gibi iki tarafın da çok gönderdiği durumlara uygundur.') }),
  choice({ id: 'api-s2-token-bucket', level: 'senior', topic,
    prompt: W('ما ميزة خوارزمية Token Bucket في تحديد معدل الطلبات؟', 'What does the token bucket algorithm give you for rate limiting?', 'Token bucket algoritması hız sınırlamada ne sağlar?'),
    options: L3(
      ['تسمح بدفعة قصيرة من الطلبات مع الالتزام بمعدل متوسط ثابت', 'تمنع أي طلب يتجاوز طلبًا بالثانية', 'تعدّ الطلبات يوميًا فقط', 'لا تحتاج تخزين أي حالة'],
      ['Short bursts are allowed while keeping a steady average rate', 'It blocks anything above one request per second', 'It only counts requests per day', 'It needs no stored state'],
      ['Sabit ortalama hızı korurken kısa patlamalara izin verir', 'Saniyede birden fazla isteği engeller', 'Sadece günlük istekleri sayar', 'Hiç durum saklamaz'],
    ), answer: 0,
    why: W('الدلو يمتلئ بمعدل ثابت وكل طلب يأخذ رمزًا. هذا يناسب المستخدمين الحقيقيين الذين يرسلون عدة طلبات عند فتح صفحة.', 'The bucket refills at a fixed rate and each request takes a token. That suits real users who fire several requests when a page opens.', 'Kova sabit hızla dolar ve her istek bir token alır. Bu, sayfa açılınca birkaç istek gönderen gerçek kullanıcılara uygundur.') }),
  choice({ id: 'api-s2-rename-field', level: 'senior', topic,
    prompt: W('تريد تغيير اسم الحقل fullname إلى name في API تستخدمه تطبيقات موبايل قديمة. ما الطريقة الآمنة؟', 'You want to rename the field fullname to name in an API used by old mobile app versions. The safe way?', 'Eski mobil sürümlerin kullandığı bir API’de fullname alanını name olarak değiştirmek istiyorsun. Güvenli yol?'),
    options: L3(
      ['إضافة name مع إبقاء fullname، ووسمه deprecated، ثم إزالته بعد أن يقل استخدامه', 'تغيير الاسم مباشرة', 'إرجاع الحقلين بنفس الاسم', 'إيقاف التطبيقات القديمة'],
      ['Add name, keep fullname, mark it deprecated, and remove it once usage drops', 'Rename it directly', 'Return both under the same name', 'Shut down the old apps'],
      ['name ekle, fullname’i tut, deprecated işaretle ve kullanım düşünce kaldır', 'Doğrudan yeniden adlandır', 'İkisini aynı adla döndür', 'Eski uygulamaları kapat'],
    ), answer: 0,
    why: W('تطبيقات الموبايل لا يحدّثها الجميع. التغيير المتوافق مع الإضافة فقط يمنع تعطّل المستخدمين، وراقب استخدام الحقل القديم قبل حذفه.', 'Not everyone updates mobile apps. An additive, compatible change avoids breaking users; watch the old field’s usage before removing it.', 'Herkes mobil uygulamayı güncellemez. Yalnızca ekleyen uyumlu değişiklik kullanıcıları bozmaz; eski alanın kullanımını kaldırmadan önce izle.') }),
  choice({ id: 'api-s2-private-cache', level: 'senior', topic,
    prompt: W('رد GET /cart يختلف لكل مستخدم، وتريد السماح للمتصفح بحفظه دقيقة. ما الترويسة؟', 'GET /cart differs per user, and you want the browser to keep it for a minute. Which header?', 'GET /cart her kullanıcıya göre değişiyor ve tarayıcının bir dakika saklamasını istiyorsun. Hangi başlık?'),
    options: ['Cache-Control: private, max-age=60', 'Cache-Control: public, max-age=60', 'Cache-Control: s-maxage=60', 'Expires: 0'], answer: 0, codeLang: 'http',
    why: W('private تسمح بالحفظ في متصفح المستخدم فقط. public قد تجعل CDN يقدّم سلة مستخدم لمستخدم آخر.', 'private allows storage only in the user’s browser. public could let a CDN serve one user’s cart to another.', 'private yalnızca kullanıcının tarayıcısında saklamaya izin verir. public bir CDN’in bir kullanıcının sepetini başkasına sunmasına yol açabilir.') }),
  choice({ id: 'api-s2-grpc', level: 'senior', topic,
    prompt: W('خدمتان داخليتان تتبادلان آلاف الطلبات بالثانية وتريدان عقدًا صارم الأنواع. ما الخيار المناسب غالبًا؟', 'Two internal services exchange thousands of requests per second and want a strictly typed contract. Usually the right choice?', 'İki iç servis saniyede binlerce istek alışverişi yapıyor ve katı tipli bir sözleşme istiyor. Genelde doğru seçim?'),
    options: {

      ar: ['gRPC مع Protocol Buffers', 'SOAP', 'REST مع XML', 'Webhooks'],

      en: ['gRPC with Protocol Buffers', 'SOAP', 'REST with XML', 'Webhooks'],

      tr: ['Protocol Buffers ile gRPC', 'SOAP', 'XML ile REST', 'Webhooks'],

    }, answer: 0,
    why: W('gRPC أسرع وأصغر حجمًا فوق HTTP/2، ويولّد كودًا من ملف .proto. أما للمتصفحات والعملاء الخارجيين فـ REST/JSON أسهل غالبًا.', 'gRPC is faster and smaller over HTTP/2 and generates code from a .proto file. For browsers and outside clients, REST/JSON is usually easier.', 'gRPC HTTP/2 üzerinde daha hızlı ve küçüktür, .proto dosyasından kod üretir. Tarayıcılar ve dış istemciler için REST/JSON genelde daha kolaydır.') }),
  choice({ id: 'api-s2-circuit-breaker', level: 'senior', topic,
    prompt: W('خدمة الدفع الخارجية بطيئة جدًا، فتتكدس الطلبات وتسقط خدمتك كلها. ما النمط المناسب؟', 'The external payment service is very slow, requests pile up and your whole service goes down. Which pattern fits?', 'Dış ödeme servisi çok yavaş; istekler birikiyor ve tüm servisin çöküyor. Hangi kalıp uygun?'),
    options: L3(
      ['مهلة قصيرة + Circuit Breaker يوقف الطلبات مؤقتًا عند تكرار الفشل', 'زيادة المهلة إلى دقيقتين', 'إعادة المحاولة فورًا بلا حد', 'إزالة المهلة كليًا'],
      ['A short timeout plus a circuit breaker that pauses calls after repeated failures', 'Raise the timeout to two minutes', 'Retry immediately with no limit', 'Remove the timeout entirely'],
      ['Kısa zaman aşımı ve tekrarlanan hatalarda çağrıları durduran bir circuit breaker', 'Zaman aşımını iki dakikaya çıkarmak', 'Sınırsız ve hemen yeniden denemek', 'Zaman aşımını tamamen kaldırmak'],
    ), answer: 0,
    why: W('الـ Circuit Breaker يفشل بسرعة بدل الانتظار، فلا تُستهلك كل الاتصالات، ويجرب الخدمة من جديد بعد فترة.', 'A circuit breaker fails fast instead of waiting, so connections are not used up, and it tries the service again after a while.', 'Circuit breaker beklemek yerine hızlı başarısız olur; bağlantılar tükenmez ve bir süre sonra servisi yeniden dener.') }),
  choice({ id: 'api-s2-jwt-revoke', level: 'senior', topic,
    prompt: W('مستخدم سُرقت جلسته وتستخدم JWT صالحًا 30 يومًا. ما المشكلة في التصميم؟', 'A user’s session was stolen, and you use JWTs valid for 30 days. What is wrong with the design?', 'Bir kullanıcının oturumu çalındı ve 30 gün geçerli JWT kullanıyorsun. Tasarımdaki sorun ne?'),
    options: L3(
      ['لا يمكن إلغاء الرمز قبل انتهائه؛ الأفضل رمز وصول قصير (دقائق) مع refresh token يمكن إبطاله', 'JWT غير مشفّر', 'المدة قصيرة جدًا', 'يجب تخزينه في الرابط'],
      ['The token cannot be revoked before it expires; better a short access token (minutes) plus a revocable refresh token', 'JWTs are not encrypted', 'The lifetime is too short', 'It should be stored in the URL'],
      ['Token süresi dolmadan iptal edilemez; daha iyisi kısa erişim token’ı (dakikalar) ve iptal edilebilir refresh token', 'JWT şifreli değil', 'Süre çok kısa', 'URL’de saklanmalı'],
    ), answer: 0,
    why: W('الخادم لا يحفظ حالة JWT، فلا شيء يوقفه. الرمز القصير يقلل نافذة الضرر، والـ refresh token محفوظ في قاعدة البيانات ويمكن حذفه.', 'The server keeps no state for a JWT, so nothing stops it. A short token shrinks the damage window, and the refresh token lives in the database where it can be deleted.', 'Sunucu JWT için durum tutmaz, onu hiçbir şey durdurmaz. Kısa token zarar penceresini daraltır; refresh token veritabanında durur ve silinebilir.') }),
  choice({ id: 'api-s2-cors-credentials', level: 'senior', topic,
    prompt: W('الطلب يرسل الكوكيز (credentials: include) والخادم يرد Access-Control-Allow-Origin: *. ماذا يحدث؟', 'The request sends cookies (credentials: include) and the server replies Access-Control-Allow-Origin: *. What happens?', 'İstek çerezleri gönderiyor (credentials: include) ve sunucu Access-Control-Allow-Origin: * yanıtı veriyor. Ne olur?'),
    options: L3(
      ['يرفض المتصفح الرد؛ يجب إرجاع النطاق المحدد مع Access-Control-Allow-Credentials: true', 'يعمل بشكل طبيعي', 'تُرسل الكوكيز لكل المواقع', 'يحوّل المتصفح الطلب إلى GET'],
      ['The browser rejects it; the server must return the specific origin plus Access-Control-Allow-Credentials: true', 'It works normally', 'Cookies get sent to every site', 'The browser turns it into a GET'],
      ['Tarayıcı reddeder; sunucu belirli kökeni ve Access-Control-Allow-Credentials: true döndürmeli', 'Normal çalışır', 'Çerezler her siteye gider', 'Tarayıcı isteği GET’e çevirir'],
    ), answer: 0,
    why: W('السماح بالكوكيز لأي موقع خطير، فالمتصفح يمنعه. أرجع النطاق من قائمة مسموحة، وأضف Vary: Origin.', 'Allowing cookies from any site is dangerous, so the browser forbids it. Echo the origin from an allow-list and add Vary: Origin.', 'Her siteden çereze izin vermek tehlikelidir, tarayıcı bunu yasaklar. Kökeni izin listesinden döndür ve Vary: Origin ekle.') }),
  choice({ id: 'api-s2-partial-failure', level: 'senior', topic,
    prompt: W('طلب استيراد 500 منتج نجح منها 480 وفشل 20. ما الرد الأوضح للعميل؟', 'An import of 500 products: 480 succeed and 20 fail. What is the clearest response for the client?', '500 ürünlük bir içe aktarmada 480 başarılı, 20 başarısız. İstemci için en net yanıt?'),
    options: L3(
      ['نتيجة لكل عنصر (نجح أو فشل مع السبب)، مع ملخص بالأعداد', '500 خطأ عام', '200 بدون تفاصيل', 'إلغاء كل الاستيراد دائمًا'],
      ['A result per item (success, or failure with a reason) plus a summary of counts', 'A generic 500 error', '200 with no details', 'Always roll back the whole import'],
      ['Öğe başına sonuç (başarılı ya da nedeniyle başarısız) ve sayıların özeti', 'Genel bir 500 hatası', 'Ayrıntısız 200', 'Her zaman tüm içe aktarmayı geri almak'],
    ), answer: 0,
    why: W('العميل يحتاج معرفة أي العناصر يعيد إرسالها. وإذا كان المطلوب «الكل أو لا شيء» فاجعل العملية في معاملة واحدة ووثّق ذلك.', 'The client needs to know which items to resend. If the rule is "all or nothing", run it in one transaction and document that.', 'İstemcinin hangi öğeleri yeniden göndereceğini bilmesi gerekir. Kural "hepsi ya da hiçbiri" ise tek transaction’da çalıştır ve belgele.') }),
  choice({ id: 'api-s2-bff', level: 'senior', topic,
    prompt: W('تطبيق الموبايل يحتاج 6 طلبات لعرض الصفحة الرئيسية من عدة خدمات. ما النمط الذي يحل هذا؟', 'The mobile app needs 6 requests to several services to show the home screen. Which pattern solves this?', 'Mobil uygulama ana ekranı göstermek için birkaç servise 6 istek atıyor. Bunu hangi kalıp çözer?'),
    options: ['Backend for Frontend (BFF)', 'Database sharding', 'Event sourcing', 'Blue-green deployment'], answer: 0,
    why: W('الـ BFF طبقة خاصة بكل واجهة، تجمع البيانات من الخدمات وتُرجع ما تحتاجه الشاشة في طلب واحد.', 'A BFF is a layer per frontend that gathers data from the services and returns what the screen needs in one request.', 'BFF her ön yüz için bir katmandır; verileri servislerden toplar ve ekranın ihtiyacını tek istekte döndürür.') }),
  choice({ id: 'api-s2-cursor-tiebreak', level: 'senior', topic,
    prompt: W('الترقيم بالـ cursor على created_at وحده يُسقط أو يكرر عناصر أحيانًا. لماذا وما الحل؟', 'Cursor pagination on created_at alone sometimes skips or repeats items. Why, and the fix?', 'Yalnızca created_at üzerinde cursor sayfalama bazen öğe atlıyor ya da tekrarlıyor. Neden ve çözüm?'),
    options: L3(
      ['عدة صفوف تتشارك نفس الوقت؛ أضف id كترتيب ثانٍ: WHERE (created_at, id) < (:at, :id)', 'الساعة في الخادم غير دقيقة', 'يجب استخدام OFFSET بدلًا منه', 'الفهرس على created_at تالف'],
      ['Several rows share the same timestamp; add id as a tiebreaker: WHERE (created_at, id) < (:at, :id)', 'The server clock is inaccurate', 'Use OFFSET instead', 'The created_at index is corrupt'],
      ['Birden çok satır aynı zamanı paylaşıyor; id’yi ikinci sıralama olarak ekle: WHERE (created_at, id) < (:at, :id)', 'Sunucu saati hatalı', 'Yerine OFFSET kullanılmalı', 'created_at indeksi bozuk'],
    ), answer: 0,
    why: W('الـ cursor يجب أن يشير لموضع فريد. ترتيب (created_at, id) مع فهرس مركّب عليهما يجعل الصفحات ثابتة.', 'A cursor must point to a unique position. Ordering by (created_at, id) with a composite index on both keeps pages stable.', 'Cursor benzersiz bir konumu göstermelidir. (created_at, id) sıralaması ve ikisi üzerinde bileşik indeks sayfaları sabit tutar.') }),
]
