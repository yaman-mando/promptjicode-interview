import type { Question } from '#shared/types/quiz'
import { choice, output } from '../helpers'

const L3 = (ar: string[], en: string[], tr: string[]) => ({ ar, en, tr })
const W = (ar: string, en: string, tr: string) => ({ ar, en, tr })
const topic = 'server-security' as const

export const SERVER_SECURITY_2: Question[] = [
  // ───────── Junior ─────────
  output({ id: 'ss-j2-path-join', level: 'junior', topic,
    code: `const { join } = await import('node:path')
// GET /download?file=../../etc/passwd
const file = '../../etc/passwd'
console.log(join('/app/uploads', file))`,
    options: ['/etc/passwd', '/app/uploads/../../etc/passwd', '/app/uploads/etc/passwd', 'Error'], answer: 0,
    why: W('هذا path traversal: دمج اسم ملف من المستخدم يسمح بالخروج من المجلد. استخدم معرّفًا بدل الاسم، أو تحقق أن المسار النهائي داخل المجلد.', 'This is path traversal: joining a user-supplied file name lets it escape the folder. Use an id instead of a name, or check the final path stays inside the folder.', 'Bu path traversal’dır: kullanıcıdan gelen dosya adını birleştirmek klasörden çıkmaya izin verir. Ad yerine kimlik kullan ya da son yolun klasör içinde kaldığını kontrol et.') }),
  output({ id: 'ss-j2-uuid', level: 'junior', topic,
    code: `const id = crypto.randomUUID()
console.log(id.length, id.split('-').length)`,
    options: ['36 5', '32 1', '36 4', '16 5'], answer: 0,
    why: W('crypto.randomUUID وcrypto.getRandomValues عشوائية آمنة للرموز والمعرّفات. أما Math.random فيمكن توقعها، فلا تستخدمها لرموز الدخول.', 'crypto.randomUUID and crypto.getRandomValues are secure randomness for tokens and ids. Math.random is predictable, so never use it for auth tokens.', 'crypto.randomUUID ve crypto.getRandomValues token ve kimlikler için güvenli rastgeleliktir. Math.random tahmin edilebilir; giriş token’ları için asla kullanma.') }),
  choice({ id: 'ss-j2-password-hash', level: 'junior', topic,
    prompt: W('كيف تُخزَّن كلمات المرور في قاعدة البيانات؟', 'How should passwords be stored in the database?', 'Şifreler veritabanında nasıl saklanmalı?'),
    options: L3(
      ['بدالة بطيئة مخصصة مثل bcrypt أو Argon2 مع salt', 'مشفّرة بـ AES ليمكن استرجاعها', 'بـ MD5 أو SHA-256 مباشرة', 'كنص عادي في جدول مخفي'],
      ['With a slow, purpose-built function like bcrypt or Argon2, with a salt', 'Encrypted with AES so they can be recovered', 'With plain MD5 or SHA-256', 'As plain text in a hidden table'],
      ['bcrypt veya Argon2 gibi yavaş, amaca özel bir fonksiyonla, salt ile', 'Geri alınabilsin diye AES ile şifreli', 'Doğrudan MD5 veya SHA-256 ile', 'Gizli bir tabloda düz metin'],
    ), answer: 0,
    why: W('كلمة المرور لا يجب أن تُسترجع أبدًا، فقط يُتحقق منها. وبطء الدالة متعمد ليجعل التخمين مكلفًا جدًا.', 'A password should never be recoverable, only verifiable. The function is slow on purpose, to make guessing very expensive.', 'Şifre asla geri alınabilir olmamalı, sadece doğrulanabilmeli. Fonksiyon tahmini çok pahalı yapmak için bilerek yavaştır.') }),
  choice({ id: 'ss-j2-https', level: 'junior', topic,
    prompt: W('لماذا يجب أن يعمل موقع تسجيل الدخول عبر HTTPS؟', 'Why must a login site run over HTTPS?', 'Giriş sitesi neden HTTPS üzerinden çalışmalı?'),
    options: L3(
      ['لأن البيانات تُشفّر في الطريق، فلا يقرأ أحد كلمة المرور أو الكوكيز على الشبكة', 'لأنه أسرع دائمًا', 'لأنه يمنع كل أنواع الاختراق', 'لأن Google يطلبه فقط'],
      ['Data is encrypted in transit, so nobody on the network can read the password or cookies', 'It is always faster', 'It prevents every kind of attack', 'Only because Google asks for it'],
      ['Veri yolda şifrelenir; ağdaki kimse şifreyi ya da çerezleri okuyamaz', 'Her zaman daha hızlıdır', 'Her türlü saldırıyı önler', 'Sadece Google istediği için'],
    ), answer: 0,
    why: W('على شبكة Wi-Fi عامة يمكن لأي شخص قراءة الطلبات غير المشفرة. لكن HTTPS لا يحمي من الثغرات داخل الكود نفسه.', 'On public Wi-Fi anyone can read unencrypted requests. But HTTPS does not protect against bugs in the code itself.', 'Halka açık Wi-Fi’da herkes şifresiz istekleri okuyabilir. Ama HTTPS kodun içindeki açıklara karşı korumaz.') }),
  choice({ id: 'ss-j2-httponly', level: 'junior', topic,
    prompt: W('ماذا يفعل الخيار HttpOnly على كوكي الجلسة؟', 'What does the HttpOnly flag do on a session cookie?', 'Oturum çerezindeki HttpOnly bayrağı ne yapar?'),
    options: L3(
      ['يمنع JavaScript من قراءة الكوكي، فلا يسرقها كود XSS', 'يرسلها عبر HTTP فقط بدون HTTPS', 'يحذفها عند إغلاق المتصفح', 'يشفّر محتواها'],
      ['It stops JavaScript from reading the cookie, so XSS code cannot steal it', 'It sends it over HTTP only, not HTTPS', 'It deletes it when the browser closes', 'It encrypts its content'],
      ['JavaScript’in çerezi okumasını engeller; XSS kodu onu çalamaz', 'Sadece HTTP üzerinden gönderir, HTTPS değil', 'Tarayıcı kapanınca siler', 'İçeriğini şifreler'],
    ), answer: 0,
    why: W('اجمعه مع Secure (عبر HTTPS فقط) وSameSite. هذه الخيارات الثلاثة أساس أي كوكي جلسة.', 'Combine it with Secure (HTTPS only) and SameSite. Those three flags are the baseline for any session cookie.', 'Secure (sadece HTTPS) ve SameSite ile birleştir. Bu üç bayrak her oturum çerezinin temelidir.') }),
  choice({ id: 'ss-j2-server-validation', level: 'junior', topic,
    prompt: W('الواجهة الأمامية تتحقق أن السعر موجب. هل يكفي هذا؟', 'The frontend checks that the price is positive. Is that enough?', 'Ön yüz fiyatın pozitif olduğunu kontrol ediyor. Bu yeterli mi?'),
    options: L3(
      ['لا، أي شخص يستطيع إرسال الطلب مباشرة؛ التحقق في الخادم إلزامي', 'نعم، الواجهة تكفي', 'نعم إذا كان الموقع HTTPS', 'نعم إذا استخدمنا React'],
      ['No, anyone can send the request directly; server-side validation is mandatory', 'Yes, the frontend is enough', 'Yes if the site uses HTTPS', 'Yes if we use React'],
      ['Hayır, herkes isteği doğrudan gönderebilir; sunucuda doğrulama zorunludur', 'Evet, ön yüz yeterli', 'Site HTTPS ise evet', 'React kullanırsak evet'],
    ), answer: 0,
    why: W('تحقق الواجهة لتجربة المستخدم فقط. والسعر خاصة يجب أن يُحسب في الخادم من قاعدة البيانات، لا أن يُقبل من الطلب.', 'Frontend checks are only for user experience. The price especially must be computed on the server from the database, not taken from the request.', 'Ön yüz kontrolleri yalnızca kullanıcı deneyimi içindir. Özellikle fiyat istekten alınmamalı, sunucuda veritabanından hesaplanmalı.') }),
  choice({ id: 'ss-j2-2fa', level: 'junior', topic,
    prompt: W('ما فائدة التحقق بخطوتين (2FA)؟', 'What does two-factor authentication (2FA) add?', 'İki adımlı doğrulama (2FA) ne kazandırır?'),
    options: L3(
      ['حتى لو سُرقت كلمة المرور، يحتاج المهاجم عاملًا ثانيًا مثل رمز من تطبيق', 'يجعل كلمة المرور أطول', 'يغني عن HTTPS', 'يسرّع تسجيل الدخول'],
      ['Even if the password is stolen, the attacker needs a second factor such as an app code', 'It makes the password longer', 'It replaces HTTPS', 'It speeds up login'],
      ['Şifre çalınsa bile saldırganın uygulama kodu gibi ikinci bir faktöre ihtiyacı olur', 'Şifreyi uzatır', 'HTTPS’in yerini alır', 'Girişi hızlandırır'],
    ), answer: 0,
    why: W('تطبيقات المصادقة ومفاتيح الأمان أقوى من رسائل SMS، التي يمكن اعتراضها أو نقل الرقم لشريحة أخرى.', 'Authenticator apps and security keys are stronger than SMS, which can be intercepted or moved to another SIM.', 'Kimlik doğrulama uygulamaları ve güvenlik anahtarları, ele geçirilebilen ya da başka SIM’e taşınabilen SMS’ten daha güçlüdür.') }),
  choice({ id: 'ss-j2-default-creds', level: 'junior', topic,
    prompt: W('نصبت لوحة إدارة قاعدة بيانات بكلمة المرور الافتراضية admin/admin. ما الخطر؟', 'You installed a database admin panel with the default password admin/admin. What is the risk?', 'Veritabanı yönetim panelini varsayılan admin/admin şifresiyle kurdun. Risk nedir?'),
    options: L3(
      ['برامج آلية تفحص الإنترنت وتجرّب كلمات المرور الافتراضية خلال دقائق', 'لا خطر إن كان الرابط غير معروف', 'الخطر فقط إن كان الموقع مشهورًا', 'لا خطر مع HTTPS'],
      ['Bots scan the internet and try default passwords within minutes', 'No risk if the URL is unknown', 'Only a risk if the site is famous', 'No risk with HTTPS'],
      ['Botlar interneti tarar ve varsayılan şifreleri dakikalar içinde dener', 'URL bilinmiyorsa risk yok', 'Sadece site ünlüyse risk var', 'HTTPS ile risk yok'],
    ), answer: 0,
    why: W('«الإخفاء» ليس حماية. غيّر كلمات المرور الافتراضية فورًا، والأفضل ألا تكون لوحات الإدارة متاحة للإنترنت أصلًا.', 'Obscurity is not protection. Change default passwords at once, and preferably keep admin panels off the public internet entirely.', 'Gizlilik koruma değildir. Varsayılan şifreleri hemen değiştir; tercihen yönetim panelleri hiç internete açık olmasın.') }),
  choice({ id: 'ss-j2-stored-xss', level: 'junior', topic,
    prompt: W('مستخدم كتب في تعليقه <script>…</script> فنُفّذ عند كل الزوار. ما الإصلاح الأساسي؟', 'A user put <script>…</script> in a comment and it ran for every visitor. The core fix?', 'Bir kullanıcı yorumuna <script>…</script> yazdı ve her ziyaretçide çalıştı. Temel düzeltme?'),
    options: L3(
      ['ترميز (escape) المحتوى عند العرض، وتنقية HTML إن كان مسموحًا', 'حذف كلمة script فقط من النص', 'منع التعليقات', 'تشفير التعليقات في قاعدة البيانات'],
      ['Escape the content when rendering, and sanitize HTML if it is allowed', 'Just strip the word script', 'Ban comments', 'Encrypt comments in the database'],
      ['İçeriği gösterirken escape etmek, HTML’e izin varsa temizlemek', 'Sadece script kelimesini silmek', 'Yorumları yasaklamak', 'Yorumları veritabanında şifrelemek'],
    ), answer: 0,
    why: W('حذف الكلمة سهل التجاوز (<img onerror=…>). أغلب القوالب ترمّز تلقائيًا؛ المشكلة تأتي من v-html أو {!! !!} أو innerHTML.', 'Stripping the word is easy to bypass (<img onerror=…>). Most templates escape by default; trouble comes from v-html, {!! !!} or innerHTML.', 'Kelimeyi silmek kolayca atlatılır (<img onerror=…>). Çoğu şablon varsayılan olarak escape eder; sorun v-html, {!! !!} veya innerHTML’den gelir.') }),
  choice({ id: 'ss-j2-db-port', level: 'junior', topic,
    prompt: W('منفذ PostgreSQL ‏5432 مفتوح للإنترنت كله. ما الصحيح؟', 'PostgreSQL port 5432 is open to the whole internet. What is right?', 'PostgreSQL 5432 portu tüm internete açık. Doğrusu nedir?'),
    options: L3(
      ['إغلاقه والسماح فقط لخوادم التطبيق عبر شبكة خاصة أو جدار ناري', 'تركه مفتوحًا مع كلمة مرور قوية', 'تغيير المنفذ إلى رقم آخر', 'لا مشكلة'],
      ['Close it and allow only the app servers through a private network or firewall', 'Leave it open with a strong password', 'Change the port number', 'No problem'],
      ['Kapatıp yalnızca uygulama sunucularına özel ağ ya da güvenlik duvarıyla izin vermek', 'Güçlü şifreyle açık bırakmak', 'Port numarasını değiştirmek', 'Sorun yok'],
    ), answer: 0,
    why: W('كل خدمة مفتوحة هدف للتخمين والثغرات. قاعدة البيانات لا يحتاج الوصول إليها إلا التطبيق.', 'Every exposed service is a target for guessing and exploits. Only the app needs to reach the database.', 'Açık her servis tahmin ve açık istismarı için hedeftir. Veritabanına yalnızca uygulamanın erişmesi gerekir.') }),
  choice({ id: 'ss-j2-login-message', level: 'junior', topic,
    prompt: W('أي رسالة خطأ أفضل عند فشل تسجيل الدخول؟', 'Which error message is better when a login fails?', 'Giriş başarısız olduğunda hangi hata mesajı daha iyi?'),
    options: L3(
      ['«البريد أو كلمة المرور غير صحيحة»', '«هذا البريد غير مسجل»', '«كلمة المرور خاطئة لهذا البريد»', '«خطأ في السطر 42 من auth.js»'],
      ['"The email or password is incorrect"', '"This email is not registered"', '"Wrong password for this email"', '"Error on line 42 of auth.js"'],
      ['"E-posta veya şifre hatalı"', '"Bu e-posta kayıtlı değil"', '"Bu e-posta için şifre yanlış"', '"auth.js 42. satırda hata"'],
    ), answer: 0,
    why: W('الرسائل المختلفة تخبر المهاجم أي البُرُد مسجلة (account enumeration)، فيركز عليها في التخمين.', 'Different messages tell an attacker which emails are registered (account enumeration), so they focus their guessing there.', 'Farklı mesajlar saldırgana hangi e-postaların kayıtlı olduğunu söyler (hesap listeleme); tahminlerini oraya yoğunlaştırır.') }),
  choice({ id: 'ss-j2-patching', level: 'junior', topic,
    prompt: W('صدر تحديث أمني لـ Node.js وللنظام على الخادم. متى تثبّته؟', 'A security update came out for Node.js and the server OS. When do you install it?', 'Node.js ve sunucu işletim sistemi için güvenlik güncellemesi çıktı. Ne zaman kurarsın?'),
    options: L3(
      ['قريبًا بعد تجربته على staging، فالثغرات المعلنة تُستغل بسرعة', 'بعد سنة لضمان الاستقرار', 'لا داعي إذا كان الموقع يعمل', 'فقط عند حدوث اختراق'],
      ['Soon, after trying it on staging; published vulnerabilities get exploited fast', 'After a year, to be safe', 'Never, if the site works', 'Only after a breach'],
      ['Staging’de denedikten sonra kısa sürede; duyurulan açıklar hızla istismar edilir', 'Güvenli olsun diye bir yıl sonra', 'Site çalışıyorsa hiç', 'Sadece bir saldırıdan sonra'],
    ), answer: 0,
    why: W('بعد إعلان الثغرة يبدأ المهاجمون بفحص الخوادم غير المحدّثة خلال أيام. التحديث المنتظم أرخص من الاختراق.', 'Once a flaw is announced, attackers start scanning for unpatched servers within days. Regular patching is cheaper than a breach.', 'Bir açık duyurulunca saldırganlar günler içinde güncellenmemiş sunucuları taramaya başlar. Düzenli güncelleme saldırıdan ucuzdur.') }),
  choice({ id: 'ss-j2-backup-secrets', level: 'junior', topic,
    prompt: W('ملف backup.sql كامل موجود في مجلد public على الموقع. ما المشكلة؟', 'A full backup.sql file sits in the site’s public folder. What is the problem?', 'Tam bir backup.sql dosyası sitenin public klasöründe duruyor. Sorun ne?'),
    options: L3(
      ['أي شخص يعرف الرابط أو يخمّنه ينزّل قاعدة البيانات كلها', 'الملف كبير فقط', 'لا مشكلة لأنه بصيغة SQL', 'يبطئ الموقع'],
      ['Anyone who knows or guesses the URL downloads the whole database', 'It is just a big file', 'No problem, it is SQL', 'It slows the site'],
      ['URL’yi bilen ya da tahmin eden herkes tüm veritabanını indirir', 'Sadece büyük bir dosya', 'SQL olduğu için sorun yok', 'Siteyi yavaşlatır'],
    ), answer: 0,
    why: W('أدوات الفحص تجرّب أسماء شائعة مثل backup.sql و.env و.git تلقائيًا. النسخ الاحتياطية مكانها تخزين خاص ومشفّر.', 'Scanners automatically try common names like backup.sql, .env and .git. Backups belong in private, encrypted storage.', 'Tarayıcılar backup.sql, .env ve .git gibi yaygın adları otomatik dener. Yedekler özel ve şifreli depolamada durmalı.') }),

  // ───────── Mid ─────────
  output({ id: 'ss-m2-unsalted', level: 'mid', topic,
    code: `const { createHash } = await import('node:crypto')
const sha = s => createHash('sha256').update(s).digest('hex')
// two users who picked the same password
console.log(sha('Mersin2024') === sha('Mersin2024'))`,
    options: ['true', 'false', 'undefined', 'Error'], answer: 0,
    why: W('بدون salt، كلمات المرور المتطابقة لها نفس الـ hash، فكسر واحدة يكشف الجميع، وجداول الـ hash الجاهزة تعمل مباشرة.', 'Without a salt, identical passwords share the same hash: cracking one reveals all, and precomputed hash tables work straight away.', 'Salt olmadan aynı şifreler aynı hash’i paylaşır: birini kırmak hepsini açar ve hazır hash tabloları hemen işe yarar.') }),
  output({ id: 'ss-m2-salted', level: 'mid', topic,
    code: `const { scryptSync, randomBytes } = await import('node:crypto')
const hash = pw => {
  const salt = randomBytes(16)
  return salt.toString('hex') + ':' + scryptSync(pw, salt, 32).toString('hex')
}
console.log(hash('Mersin2024') === hash('Mersin2024'))`,
    options: ['false', 'true', 'undefined', 'Error'], answer: 0,
    why: W('salt عشوائي لكل مستخدم يجعل الناتج مختلفًا لنفس كلمة المرور، ويُحفظ مع الـ hash للتحقق لاحقًا.', 'A random salt per user makes the result differ for the same password; it is stored with the hash for later checks.', 'Kullanıcı başına rastgele salt aynı şifre için farklı sonuç üretir; sonraki doğrulama için hash ile birlikte saklanır.') }),
  output({ id: 'ss-m2-open-redirect', level: 'mid', topic,
    code: `// after login: redirect to ?next=
const isSafe = next => new URL(next, 'https://shop.com').origin === 'https://shop.com'
console.log(isSafe('/orders'), isSafe('//evil.com'), isSafe('https://evil.com/login'))`,
    options: ['true false false', 'true true false', 'true true true', 'false false false'], answer: 0,
    why: W('//evil.com رابط كامل لموقع آخر رغم أنه يبدأ بـ /. فحص «يبدأ بـ /» وحده يترك ثغرة open redirect تُستخدم في التصيد.', '//evil.com is a full link to another site even though it starts with /. A "starts with /" check alone leaves an open redirect used in phishing.', '//evil.com / ile başlasa da başka siteye tam bir bağlantıdır. Yalnızca "/ ile başlıyor" kontrolü, oltalamada kullanılan bir open redirect açığı bırakır.') }),
  choice({ id: 'ss-m2-samesite', level: 'mid', topic,
    prompt: W('كيف يساعد SameSite=Lax على كوكي الجلسة؟', 'How does SameSite=Lax on the session cookie help?', 'Oturum çerezindeki SameSite=Lax nasıl yardımcı olur?'),
    options: L3(
      ['لا يرسل المتصفح الكوكي مع طلبات POST القادمة من مواقع أخرى، فيقل خطر CSRF', 'يمنع XSS كليًا', 'يشفّر الكوكي', 'يجعل الكوكي دائمة'],
      ['The browser does not send it with POST requests coming from other sites, which reduces CSRF', 'It stops XSS completely', 'It encrypts the cookie', 'It makes the cookie permanent'],
      ['Tarayıcı onu diğer sitelerden gelen POST isteklerinde göndermez; CSRF riski azalır', 'XSS’i tamamen önler', 'Çerezi şifreler', 'Çerezi kalıcı yapar'],
    ), answer: 0,
    why: W('Lax يسمح بالكوكي عند الانتقال العادي عبر رابط، ويمنعه في الطلبات الخلفية. ويبقى رمز CSRF مفيدًا كطبقة إضافية.', 'Lax allows the cookie on normal link navigation and blocks it on background cross-site requests. A CSRF token is still a useful extra layer.', 'Lax normal bağlantı gezinmesinde çereze izin verir, arka plandaki siteler arası isteklerde engeller. CSRF token’ı yine de faydalı ek katmandır.') }),
  choice({ id: 'ss-m2-csp', level: 'mid', topic,
    prompt: W('ما فائدة ترويسة Content-Security-Policy؟', 'What does the Content-Security-Policy header do?', 'Content-Security-Policy başlığı ne işe yarar?'),
    options: L3(
      ['تحدد مصادر السكربتات والموارد المسموحة، فتحدّ من أثر XSS', 'تشفّر الصفحة', 'تمنع التخزين المؤقت', 'تحدد عدد الطلبات المسموحة'],
      ['It sets which script and resource sources are allowed, limiting the impact of XSS', 'It encrypts the page', 'It disables caching', 'It limits the number of requests'],
      ['İzin verilen script ve kaynak adreslerini belirler; XSS’in etkisini sınırlar', 'Sayfayı şifreler', 'Önbelleği kapatır', 'İstek sayısını sınırlar'],
    ), answer: 0,
    why: W('حتى لو نجح حقن سكربت، يرفض المتصفح تنفيذه إن لم يكن من مصدر مسموح. CSP طبقة دفاع إضافية لا بديل عن الترميز.', 'Even if a script gets injected, the browser refuses to run it unless it comes from an allowed source. CSP is an extra layer, not a replacement for escaping.', 'Bir script enjekte edilse bile tarayıcı izinli kaynaktan değilse çalıştırmaz. CSP ek bir katmandır, escape’in yerine geçmez.') }),
  choice({ id: 'ss-m2-hsts', level: 'mid', topic,
    prompt: W('ماذا تضيف ترويسة Strict-Transport-Security (HSTS)؟', 'What does the Strict-Transport-Security (HSTS) header add?', 'Strict-Transport-Security (HSTS) başlığı ne katar?'),
    options: L3(
      ['تجبر المتصفح على استخدام HTTPS دائمًا لهذا النطاق، حتى لو كتب المستخدم http://', 'تشفّر قاعدة البيانات', 'تمنع الإعلانات', 'تجعل الشهادة مجانية'],
      ['It forces the browser to always use HTTPS for this domain, even if the user types http://', 'It encrypts the database', 'It blocks ads', 'It makes the certificate free'],
      ['Kullanıcı http:// yazsa bile tarayıcıyı bu alan için hep HTTPS kullanmaya zorlar', 'Veritabanını şifreler', 'Reklamları engeller', 'Sertifikayı ücretsiz yapar'],
    ), answer: 0,
    why: W('بدونها يمكن للمهاجم على الشبكة اعتراض أول طلب HTTP قبل التحويل إلى HTTPS.', 'Without it, an attacker on the network can intercept the first HTTP request before the redirect to HTTPS.', 'Olmadan, ağdaki bir saldırgan HTTPS’e yönlendirmeden önceki ilk HTTP isteğini ele geçirebilir.') }),
  choice({ id: 'ss-m2-leaked-key', level: 'mid', topic,
    prompt: W('رفعت مفتاح Stripe السري إلى GitHub بالخطأ، ثم حذفته في commit جديد. هل انتهت المشكلة؟', 'You pushed the secret Stripe key to GitHub by mistake, then removed it in a new commit. Is the problem over?', 'Gizli Stripe anahtarını yanlışlıkla GitHub’a gönderdin, sonra yeni commit’te sildin. Sorun bitti mi?'),
    options: L3(
      ['لا، المفتاح باقٍ في السجل وربما نُسخ؛ ألغِه وأصدر مفتاحًا جديدًا فورًا', 'نعم، الحذف يكفي', 'نعم إذا كان المستودع خاصًا', 'نعم بعد ساعة'],
      ['No, it stays in the history and may already be copied; revoke it and issue a new key at once', 'Yes, deleting is enough', 'Yes if the repo is private', 'Yes after an hour'],
      ['Hayır, geçmişte kalır ve kopyalanmış olabilir; hemen iptal edip yeni anahtar üret', 'Evet, silmek yeterli', 'Depo özelse evet', 'Bir saat sonra evet'],
    ), answer: 0,
    why: W('برامج آلية تفحص GitHub بحثًا عن المفاتيح خلال ثوانٍ من الرفع. التغيير (rotation) هو الحل، وتنظيف السجل خطوة ثانوية.', 'Bots scan GitHub for keys within seconds of a push. Rotation is the fix; cleaning the history is secondary.', 'Botlar GitHub’ı gönderimden saniyeler içinde anahtar için tarar. Çözüm anahtarı değiştirmektir; geçmişi temizlemek ikincildir.') }),
  choice({ id: 'ss-m2-command-injection', level: 'mid', topic,
    prompt: W('أي سطر آمن لتحويل صورة رفعها المستخدم؟', 'Which line safely converts an image the user uploaded?', 'Kullanıcının yüklediği resmi hangi satır güvenle dönüştürür?'),
    options: ["execFile('convert', [input, '-resize', '200x200', output])", "exec(`convert ${input} -resize 200x200 ${output}`)", "exec('convert ' + req.body.file)", "spawn('sh', ['-c', `convert ${input}`])"], answer: 0, codeLang: 'js',
    why: W('exec يمرر النص لـ shell، فاسم ملف مثل "a.png; rm -rf /" يُنفَّذ كأمر. execFile مع مصفوفة لا يستخدم shell.', 'exec hands the text to a shell, so a file name like "a.png; rm -rf /" runs as a command. execFile with an array uses no shell.', 'exec metni kabuğa verir; "a.png; rm -rf /" gibi bir dosya adı komut olarak çalışır. Diziyle execFile kabuk kullanmaz.') }),
  choice({ id: 'ss-m2-xxe', level: 'mid', topic,
    prompt: W('خادمك يقرأ ملفات XML يرفعها المستخدم. ما الإعداد الأمني الأهم؟', 'Your server parses XML files uploaded by users. Which security setting matters most?', 'Sunucun kullanıcıların yüklediği XML dosyalarını ayrıştırıyor. En önemli güvenlik ayarı nedir?'),
    options: L3(
      ['تعطيل الكيانات الخارجية (external entities) وDTD في المحلل', 'التأكد أن الملف ينتهي بـ .xml', 'ضغط الملف', 'تحويله إلى JSON أولًا يدويًا'],
      ['Disable external entities and DTDs in the parser', 'Check the file ends in .xml', 'Compress the file', 'Convert it to JSON by hand first'],
      ['Ayrıştırıcıda harici varlıkları (external entities) ve DTD’yi kapatmak', 'Dosyanın .xml ile bittiğini kontrol etmek', 'Dosyayı sıkıştırmak', 'Önce elle JSON’a çevirmek'],
    ), answer: 0,
    why: W('هجوم XXE يجعل المحلل يقرأ ملفات من الخادم مثل /etc/passwd أو يطلب عناوين داخلية.', 'An XXE attack makes the parser read files from the server, such as /etc/passwd, or call internal addresses.', 'XXE saldırısı ayrıştırıcının sunucudan /etc/passwd gibi dosyaları okumasına ya da iç adresleri çağırmasına yol açar.') }),
  choice({ id: 'ss-m2-otp-bruteforce', level: 'mid', topic,
    prompt: W('رمز التحقق المرسل بالبريد من 6 أرقام بلا حد للمحاولات. ما المشكلة؟', 'A 6-digit email verification code has no attempt limit. What is the problem?', '6 haneli e-posta doğrulama kodunda deneme sınırı yok. Sorun nedir?'),
    options: L3(
      ['مليون احتمال فقط، فيمكن تخمينه آليًا؛ حدد المحاولات ومدة الصلاحية', 'لا مشكلة لأنه عشوائي', 'المشكلة في طول البريد', 'يجب جعله حروفًا فقط'],
      ['Only a million possibilities, so a script can guess it; limit attempts and expiry', 'No problem, it is random', 'The email length is the issue', 'It should be letters only'],
      ['Yalnızca bir milyon olasılık var, bir betik tahmin edebilir; denemeleri ve süreyi sınırla', 'Rastgele olduğu için sorun yok', 'Sorun e-posta uzunluğunda', 'Sadece harflerden oluşmalı'],
    ), answer: 0,
    why: W('مع 5 محاولات ومدة 10 دقائق تصبح فرصة التخمين ضئيلة جدًا، ثم يُلغى الرمز ويُطلب رمز جديد.', 'With 5 attempts and a 10-minute expiry the chance of guessing becomes tiny; then the code is voided and a new one requested.', '5 deneme ve 10 dakikalık süreyle tahmin şansı çok küçülür; sonra kod iptal edilir ve yenisi istenir.') }),
  choice({ id: 'ss-m2-credential-stuffing', level: 'mid', topic,
    prompt: W('مهاجم يجرب آلاف أزواج البريد وكلمة المرور المسربة من مواقع أخرى، من آلاف عناوين IP. ما الدفاع الأفضل؟', 'An attacker tries thousands of email/password pairs leaked from other sites, from thousands of IPs. Best defence?', 'Bir saldırgan başka sitelerden sızan binlerce e-posta/şifre çiftini binlerce IP’den deniyor. En iyi savunma?'),
    options: L3(
      ['2FA، وحد للمحاولات لكل حساب، ورفض كلمات المرور المعروفة كمسربة', 'حظر عنوان IP واحد', 'تغيير رابط صفحة الدخول', 'إخفاء زر الدخول'],
      ['2FA, a per-account attempt limit, and rejecting passwords known to be leaked', 'Block a single IP', 'Change the login page URL', 'Hide the login button'],
      ['2FA, hesap başına deneme sınırı ve sızdığı bilinen şifreleri reddetmek', 'Tek bir IP’yi engellemek', 'Giriş sayfası URL’sini değiştirmek', 'Giriş butonunu gizlemek'],
    ), answer: 0,
    why: W('الحد لكل IP لا يكفي مع آلاف العناوين. فحص كلمات المرور ضد قوائم التسريب (مثل Have I Been Pwned) يمنع أضعفها.', 'A per-IP limit is not enough against thousands of addresses. Checking passwords against breach lists (such as Have I Been Pwned) blocks the weakest.', 'Binlerce adrese karşı IP başına sınır yetmez. Şifreleri sızıntı listelerine (Have I Been Pwned gibi) karşı kontrol etmek en zayıflarını engeller.') }),
  choice({ id: 'ss-m2-session-timeout', level: 'mid', topic,
    prompt: W('لوحة إدارة مالية تبقى مسجّلة الدخول للأبد على حاسوب مشترك. ما الإعداد المطلوب؟', 'A finance admin panel stays logged in forever on a shared computer. Which setting is needed?', 'Bir finans yönetim paneli ortak bir bilgisayarda sonsuza dek açık kalıyor. Hangi ayar gerekli?'),
    options: L3(
      ['انتهاء الجلسة بعد فترة خمول، وطلب إعادة الدخول للعمليات الحساسة', 'كوكي بلا انتهاء', 'حفظ كلمة المرور في المتصفح', 'لا شيء'],
      ['Expire the session after idle time, and ask for re-login on sensitive actions', 'A cookie that never expires', 'Saving the password in the browser', 'Nothing'],
      ['Hareketsizlikten sonra oturumu bitirmek ve hassas işlemler için yeniden giriş istemek', 'Süresi dolmayan çerez', 'Şifreyi tarayıcıda kaydetmek', 'Hiçbir şey'],
    ), answer: 0,
    why: W('مدة الجلسة تتبع حساسية النظام. لوحات المال والإدارة تحتاج مهلة قصيرة وتأكيدًا قبل الحذف أو التحويل.', 'Session length should follow how sensitive the system is. Money and admin panels need short timeouts and a confirmation before deletes or transfers.', 'Oturum süresi sistemin hassasiyetini izlemeli. Para ve yönetim panelleri kısa zaman aşımı ve silme ya da transfer öncesi onay ister.') }),
  choice({ id: 'ss-m2-api-token-hash', level: 'mid', topic,
    prompt: W('كيف تخزّن رموز API التي تُعطى للعملاء في قاعدة البيانات؟', 'How do you store API tokens issued to customers in the database?', 'Müşterilere verilen API token’larını veritabanında nasıl saklarsın?'),
    options: L3(
      ['تخزين hash للرمز فقط، وعرض الرمز للعميل مرة واحدة عند إنشائه', 'كنص عادي ليسهل عرضه لاحقًا', 'مشفرًا بمفتاح داخل الكود', 'في ملف نصي على الخادم'],
      ['Store only a hash of the token, and show the token to the customer once when it is created', 'As plain text so it can be shown later', 'Encrypted with a key in the code', 'In a text file on the server'],
      ['Yalnızca token’ın hash’ini saklamak ve token’ı müşteriye oluşturulurken bir kez göstermek', 'Sonra gösterilebilsin diye düz metin', 'Koddaki bir anahtarla şifreli', 'Sunucuda bir metin dosyasında'],
    ), answer: 0,
    why: W('لو تسربت قاعدة البيانات لا يمكن استخدام الرموز. وتكفي SHA-256 هنا لأن الرموز عشوائية وطويلة، على عكس كلمات المرور.', 'If the database leaks, the tokens are useless. SHA-256 is fine here because tokens are long and random, unlike passwords.', 'Veritabanı sızarsa token’lar kullanılamaz. Token’lar şifrelerin aksine uzun ve rastgele olduğu için burada SHA-256 yeterlidir.') }),

  // ───────── Senior ─────────
  output({ id: 'ss-s2-startswith', level: 'senior', topic,
    code: `const { resolve, sep } = await import('node:path')
const base = '/app/uploads'
const target = resolve(base, '../uploads-old/secret.txt')
console.log(target)
console.log(target.startsWith(base), target.startsWith(base + sep))`,
    options: ['/app/uploads-old/secret.txt, true false', '/app/uploads/secret.txt, true true', '/app/uploads-old/secret.txt, false false', '/app/uploads-old/secret.txt, true true'], answer: 0,
    why: W('فحص startsWith(base) وحده يقبل مجلدًا شقيقًا اسمه يبدأ بنفس الحروف. أضف الفاصل في النهاية، أو استخدم path.relative وتأكد أنه لا يبدأ بـ ..', 'A bare startsWith(base) check accepts a sibling folder whose name starts the same. Add the separator, or use path.relative and make sure it does not start with ..', 'Yalnızca startsWith(base) kontrolü adı aynı harflerle başlayan kardeş klasörü kabul eder. Sonuna ayırıcı ekle ya da path.relative kullanıp .. ile başlamadığından emin ol.') }),
  output({ id: 'ss-s2-jwt-none', level: 'senior', topic,
    code: `const token = 'eyJhbGciOiJub25lIn0.eyJyb2xlIjoiYWRtaW4ifQ.'
const [h, p] = token.split('.')
const decode = s => JSON.parse(Buffer.from(s, 'base64url').toString())
console.log(decode(h).alg, decode(p).role)`,
    options: ['none admin', 'HS256 admin', 'none user', 'Error'], answer: 0,
    why: W('أي شخص يستطيع كتابة JWT بخوارزمية none ودور admin. المكتبة يجب أن تتحقق بخوارزمية محددة مسبقًا ولا تثق بحقل alg القادم في الرمز.', 'Anyone can write a JWT with alg none and role admin. The library must verify with a fixed, expected algorithm and never trust the alg field from the token.', 'Herkes alg none ve admin rolüyle JWT yazabilir. Kütüphane önceden belirlenmiş bir algoritmayla doğrulamalı ve token’daki alg alanına güvenmemeli.') }),
  choice({ id: 'ss-s2-zip-slip', level: 'senior', topic,
    prompt: W('ميزة «رفع ملف ZIP وفك ضغطه». ما الخطر الخاص بها؟', 'A feature that uploads a ZIP and extracts it. What risk is specific to it?', '"ZIP yükle ve aç" özelliği. Ona özgü risk nedir?'),
    options: L3(
      ['Zip Slip: أسماء ملفات مثل ../../app/server.js تُكتب خارج المجلد، وZIP bombs تملأ القرص', 'لا خطر لأن الملفات مضغوطة', 'الخطر فقط في حجم الرفع', 'الملفات المضغوطة لا تحمل فيروسات'],
      ['Zip Slip: entries like ../../app/server.js are written outside the folder, and zip bombs fill the disk', 'No risk, the files are compressed', 'Only the upload size is a risk', 'Compressed files cannot carry malware'],
      ['Zip Slip: ../../app/server.js gibi girdiler klasör dışına yazılır, zip bombaları diski doldurur', 'Sıkıştırılmış olduğu için risk yok', 'Sadece yükleme boyutu risk', 'Sıkıştırılmış dosyalar zararlı taşıyamaz'],
    ), answer: 0,
    why: W('تحقق من المسار النهائي لكل ملف، وحدد الحجم الكلي بعد فك الضغط وعدد الملفات، وفك الضغط في مكان معزول.', 'Check each entry’s final path, cap the total extracted size and file count, and extract in an isolated place.', 'Her girdinin son yolunu kontrol et, açılmış toplam boyutu ve dosya sayısını sınırla, izole bir yerde aç.') }),
  choice({ id: 'ss-s2-supply-chain', level: 'senior', topic,
    prompt: W('ما الذي يقلل خطر حزمة npm خبيثة في سلسلة الإمداد؟', 'What reduces the risk of a malicious npm package in the supply chain?', 'Tedarik zincirindeki kötü niyetli bir npm paketinin riskini ne azaltır?'),
    options: L3(
      ['ملف lock مع npm ci، ومراجعة الحزم الجديدة وسكربتات postinstall، وتنبيهات الثغرات', 'تحديث كل الحزم يوميًا لآخر إصدار تلقائيًا', 'تثبيت الحزم بـ sudo', 'نسخ الحزم من مواقع عشوائية'],
      ['A lockfile with npm ci, reviewing new packages and postinstall scripts, and vulnerability alerts', 'Auto-updating every package to latest daily', 'Installing packages with sudo', 'Copying packages from random sites'],
      ['npm ci ile lock dosyası, yeni paketleri ve postinstall betiklerini incelemek, açık uyarıları', 'Her paketi her gün otomatik en son sürüme güncellemek', 'Paketleri sudo ile kurmak', 'Paketleri rastgele sitelerden kopyalamak'],
    ), answer: 0,
    why: W('انتبه لأسماء متشابهة (typosquatting) وحزم صغيرة بلا صيانة. التحديث التلقائي الأعمى قد يجلب نسخة مخترقة.', 'Watch for look-alike names (typosquatting) and tiny unmaintained packages. Blind auto-updates can pull in a compromised release.', 'Benzer adlara (typosquatting) ve bakımsız küçük paketlere dikkat et. Kör otomatik güncelleme ele geçirilmiş bir sürümü getirebilir.') }),
  choice({ id: 'ss-s2-tenant', level: 'senior', topic,
    prompt: W('تطبيق SaaS فيه عدة شركات في نفس الجداول. كيف تضمن ألا ترى شركة بيانات أخرى؟', 'A SaaS app keeps several companies in the same tables. How do you make sure one cannot see another’s data?', 'Bir SaaS uygulaması birkaç şirketi aynı tablolarda tutuyor. Birinin diğerinin verisini görmemesini nasıl sağlarsın?'),
    options: L3(
      ['فرض tenant_id في كل استعلام مركزيًا (scope أو Row-Level Security)، لا يدويًا في كل مكان', 'الاعتماد على أن الروابط غير معروفة', 'إخفاء معرّفات الشركات في الواجهة', 'قاعدة بيانات واحدة بلا قيود'],
      ['Enforce tenant_id on every query centrally (a scope or Row-Level Security), not by hand everywhere', 'Rely on URLs being unknown', 'Hide company ids in the UI', 'One unrestricted database'],
      ['tenant_id’yi her sorguda merkezi olarak zorlamak (scope veya Row-Level Security), her yerde elle değil', 'URL’lerin bilinmemesine güvenmek', 'Arayüzde şirket kimliklerini gizlemek', 'Kısıtsız tek veritabanı'],
    ), answer: 0,
    why: W('نسيان الشرط في استعلام واحد يكشف بيانات كل العملاء. الفرض المركزي (مثل RLS في PostgreSQL) يجعل النسيان مستحيلًا.', 'Forgetting the condition in one query exposes every customer’s data. Central enforcement (like PostgreSQL RLS) makes forgetting impossible.', 'Tek bir sorguda koşulu unutmak tüm müşterilerin verisini açar. Merkezi zorlama (PostgreSQL RLS gibi) unutmayı imkânsız kılar.') }),
  choice({ id: 'ss-s2-envelope', level: 'senior', topic,
    prompt: W('تريد تشفير حقول حساسة (رقم الهوية) في قاعدة البيانات. أين المفتاح؟', 'You want to encrypt sensitive fields (national ID) in the database. Where does the key live?', 'Veritabanında hassas alanları (kimlik numarası) şifrelemek istiyorsun. Anahtar nerede durur?'),
    options: L3(
      ['في خدمة إدارة مفاتيح (KMS)، مع تشفير مغلّف: مفتاح بيانات مشفّر بمفتاح رئيسي لا يغادر الخدمة', 'في نفس جدول البيانات', 'ثابت في الكود', 'في ملف README'],
      ['In a key management service (KMS), with envelope encryption: a data key encrypted by a master key that never leaves the service', 'In the same table as the data', 'Hard-coded in the code', 'In the README'],
      ['Bir anahtar yönetim servisinde (KMS), zarf şifrelemeyle: servisi hiç terk etmeyen ana anahtarla şifrelenmiş veri anahtarı', 'Verinin olduğu aynı tabloda', 'Koda sabit yazılı', 'README dosyasında'],
    ), answer: 0,
    why: W('المفتاح بجانب البيانات يعني أن تسرّب القاعدة يكشف كل شيء. الـ KMS يسجل كل استخدام للمفتاح ويسمح بتغييره.', 'A key next to the data means a database leak exposes everything. A KMS logs every use of the key and allows rotation.', 'Verinin yanındaki anahtar, veritabanı sızıntısında her şeyi açar. KMS anahtarın her kullanımını kaydeder ve değiştirilmesine izin verir.') }),
  choice({ id: 'ss-s2-oauth-state', level: 'senior', topic,
    prompt: W('في تسجيل الدخول عبر Google (OAuth)، ما فائدة معامل state؟', 'In "Sign in with Google" (OAuth), what is the state parameter for?', '"Google ile giriş" (OAuth) akışında state parametresi ne işe yarar?'),
    options: L3(
      ['قيمة عشوائية تُربط بجلسة المستخدم وتُفحص عند العودة لمنع هجمات CSRF على تسجيل الدخول', 'تخزين لغة المستخدم', 'تحديد مدة الرمز', 'لا فائدة منه'],
      ['A random value tied to the user’s session and checked on return, to stop CSRF attacks on login', 'Storing the user’s language', 'Setting the token lifetime', 'It has no purpose'],
      ['Kullanıcı oturumuna bağlı, dönüşte kontrol edilen rastgele bir değer; girişe yönelik CSRF saldırılarını önler', 'Kullanıcının dilini saklamak', 'Token süresini belirlemek', 'Hiçbir işe yaramaz'],
    ), answer: 0,
    why: W('بدونه يستطيع مهاجم ربط حسابه هو بجلسة الضحية. ومع التطبيقات العامة (SPA والموبايل) أضف PKCE أيضًا.', 'Without it an attacker can bind their own account to the victim’s session. For public clients (SPA and mobile) add PKCE too.', 'Olmadan saldırgan kendi hesabını kurbanın oturumuna bağlayabilir. Açık istemciler (SPA ve mobil) için PKCE de ekle.') }),
  choice({ id: 'ss-s2-coupon-race', level: 'senior', topic,
    prompt: W('كوبون «استخدام مرة واحدة» استُخدم 30 مرة بإرسال طلبات متزامنة. ما الإصلاح؟', 'A "one use only" coupon was redeemed 30 times with concurrent requests. The fix?', '"Tek kullanımlık" bir kupon eşzamanlı isteklerle 30 kez kullanıldı. Düzeltme?'),
    options: L3(
      ['جعل الاستهلاك ذرّيًا في قاعدة البيانات: قيد unique أو UPDATE … WHERE used = false مع فحص الصفوف المتأثرة', 'فحص «هل استُخدم؟» في الكود قبل الحفظ', 'تأخير عشوائي قبل الحفظ', 'منع المستخدم من الضغط مرتين في الواجهة'],
      ['Make redemption atomic in the database: a unique constraint or UPDATE … WHERE used = false, checking affected rows', 'Check "already used?" in code before saving', 'A random delay before saving', 'Stop double clicks in the UI'],
      ['Kullanımı veritabanında atomik yapmak: benzersiz kısıt ya da etkilenen satırları kontrol eden UPDATE … WHERE used = false', 'Kaydetmeden önce kodda "kullanıldı mı?" kontrolü', 'Kaydetmeden önce rastgele gecikme', 'Arayüzde çift tıklamayı engellemek'],
    ), answer: 0,
    why: W('«افحص ثم اكتب» في الكود يترك نافذة تمر منها كل الطلبات المتزامنة (race condition). قاعدة البيانات وحدها تستطيع الحسم الذرّي.', '"Check then write" in code leaves a window that all concurrent requests slip through (a race condition). Only the database can decide atomically.', 'Kodda "kontrol et sonra yaz" tüm eşzamanlı isteklerin geçtiği bir pencere bırakır (race condition). Atomik kararı yalnızca veritabanı verebilir.') }),
  choice({ id: 'ss-s2-audit-log', level: 'senior', topic,
    prompt: W('ما الذي يجعل سجل التدقيق (audit log) موثوقًا بعد اختراق؟', 'What makes an audit log trustworthy after a breach?', 'Bir ihlalden sonra denetim kaydını (audit log) güvenilir yapan nedir?'),
    options: L3(
      ['إرساله لنظام منفصل يُضاف إليه فقط، فلا يستطيع المهاجم أو المدير تعديله', 'حفظه في جدول في نفس قاعدة البيانات', 'حفظه على قرص الخادم المخترق', 'تسجيل الأخطاء فقط'],
      ['Shipping it to a separate append-only system that neither an attacker nor an admin can edit', 'A table in the same database', 'The compromised server’s disk', 'Logging errors only'],
      ['Saldırganın ya da yöneticinin düzenleyemeyeceği, yalnızca ekleme yapılan ayrı bir sisteme göndermek', 'Aynı veritabanında bir tablo', 'Ele geçirilen sunucunun diski', 'Sadece hataları kaydetmek'],
    ), answer: 0,
    why: W('أول ما يفعله المهاجم مسح آثاره. سجل منفصل يُضاف إليه فقط يُبقي من فعل ماذا ومتى.', 'The first thing an attacker does is wipe their tracks. A separate append-only log keeps who did what and when.', 'Saldırganın ilk işi izlerini silmektir. Ayrı, yalnızca eklemeli bir kayıt kimin ne zaman ne yaptığını korur.') }),
  choice({ id: 'ss-s2-xff-spoof', level: 'senior', topic,
    prompt: W('حد المحاولات يعتمد على ترويسة X-Forwarded-For، والمهاجم يغيّرها في كل طلب. ما الإصلاح؟', 'The rate limit uses the X-Forwarded-For header, and the attacker changes it on every request. The fix?', 'Hız sınırı X-Forwarded-For başlığını kullanıyor ve saldırgan her istekte değiştiriyor. Düzeltme?'),
    options: L3(
      ['الوثوق بالترويسة فقط من الـ proxy الخاص بك (trust proxy)، وأخذ العنوان الذي أضافه هو', 'حظر الترويسة كليًا', 'استخدام أول عنوان في القائمة دائمًا', 'إلغاء حد المحاولات'],
      ['Trust the header only from your own proxy (trust proxy) and take the address it added', 'Block the header completely', 'Always use the first address in the list', 'Remove the rate limit'],
      ['Başlığa yalnızca kendi proxy’nden güvenmek (trust proxy) ve onun eklediği adresi almak', 'Başlığı tamamen engellemek', 'Her zaman listedeki ilk adresi kullanmak', 'Hız sınırını kaldırmak'],
    ), answer: 0,
    why: W('أول عنوان في القائمة يكتبه العميل كما يشاء. الصحيح هو العنوان الذي أضافته آخر طبقة موثوقة (موزع الأحمال أو Cloudflare).', 'The first address in the list is whatever the client wrote. The right one is the address added by the last trusted hop (your load balancer or Cloudflare).', 'Listedeki ilk adres istemcinin istediği gibi yazdığıdır. Doğrusu son güvenilir katmanın (yük dengeleyici veya Cloudflare) eklediği adrestir.') }),
  choice({ id: 'ss-s2-image-secrets', level: 'senior', topic,
    prompt: W('Dockerfile فيه COPY .env . ثم RUN rm .env. هل اختفى الملف من الصورة؟', 'A Dockerfile has COPY .env . and then RUN rm .env. Is the file gone from the image?', 'Bir Dockerfile’da COPY .env . ve ardından RUN rm .env var. Dosya imajdan gitti mi?'),
    options: L3(
      ['لا، يبقى في طبقة سابقة ويمكن استخراجه؛ مرّر الأسرار وقت التشغيل أو كـ build secrets', 'نعم، rm يحذفه نهائيًا', 'نعم إذا كانت الصورة خاصة', 'نعم بعد docker build الثاني'],
      ['No, it stays in an earlier layer and can be extracted; pass secrets at runtime or as build secrets', 'Yes, rm deletes it for good', 'Yes if the image is private', 'Yes after a second docker build'],
      ['Hayır, önceki bir katmanda kalır ve çıkarılabilir; gizli bilgileri çalışma anında ya da build secret olarak ver', 'Evet, rm kalıcı olarak siler', 'İmaj özelse evet', 'İkinci docker build’den sonra evet'],
    ), answer: 0,
    why: W('كل أمر في Dockerfile طبقة مستقلة، والحذف في طبقة لاحقة يخفي الملف فقط. وأضف .env إلى .dockerignore.', 'Each Dockerfile instruction is its own layer; deleting in a later layer only hides the file. Also add .env to .dockerignore.', 'Dockerfile’daki her komut ayrı bir katmandır; sonraki katmanda silmek dosyayı yalnızca gizler. .env’i .dockerignore’a da ekle.') }),
  choice({ id: 'ss-s2-incident-first', level: 'senior', topic,
    prompt: W('اكتشفت أن مفتاح AWS ظهر في سجلات عامة قبل ساعتين. ما أول خطوة؟', 'You find that an AWS key appeared in public logs two hours ago. What is the first step?', 'Bir AWS anahtarının iki saat önce açık loglarda göründüğünü fark ettin. İlk adım nedir?'),
    options: L3(
      ['تعطيل المفتاح وإصدار بديل فورًا، ثم فحص ما فعله المفتاح خلال تلك الفترة', 'كتابة تقرير مفصل أولًا', 'انتظار ظهور استخدام مريب', 'حذف السجلات فقط'],
      ['Disable the key and issue a replacement at once, then check what the key did during that time', 'Write a detailed report first', 'Wait for suspicious use to show up', 'Only delete the logs'],
      ['Anahtarı hemen devre dışı bırakıp yenisini üretmek, sonra o süre içinde neler yaptığını incelemek', 'Önce ayrıntılı rapor yazmak', 'Şüpheli kullanım görünmesini beklemek', 'Sadece logları silmek'],
    ), answer: 0,
    why: W('احتواء الضرر قبل التحقيق. ثم راجع CloudTrail أو ما يماثله، والفواتير، والموارد الجديدة (مثل خوادم تعدين).', 'Contain first, investigate second. Then review CloudTrail or its equivalent, billing, and new resources (such as mining servers).', 'Önce sınırla, sonra araştır. Ardından CloudTrail veya benzerini, faturaları ve yeni kaynakları (madencilik sunucuları gibi) incele.') }),
  choice({ id: 'ss-s2-pkce', level: 'senior', topic,
    prompt: W('لماذا يُستخدم PKCE في OAuth لتطبيقات الموبايل والـ SPA؟', 'Why is PKCE used in OAuth for mobile apps and SPAs?', 'Mobil uygulamalar ve SPA’lar için OAuth’ta neden PKCE kullanılır?'),
    options: L3(
      ['لأنها لا تستطيع حفظ client secret؛ PKCE يضمن أن من بدأ الطلب هو من يستبدل الرمز', 'لتسريع تسجيل الدخول', 'لإلغاء الحاجة إلى HTTPS', 'لتخزين كلمة المرور على الجهاز'],
      ['They cannot keep a client secret; PKCE ensures whoever started the flow is the one exchanging the code', 'To speed up login', 'To remove the need for HTTPS', 'To store the password on the device'],
      ['İstemci gizli anahtarını saklayamazlar; PKCE akışı başlatanın kodu değiştirenle aynı olmasını sağlar', 'Girişi hızlandırmak için', 'HTTPS ihtiyacını kaldırmak için', 'Şifreyi cihazda saklamak için'],
    ), answer: 0,
    why: W('إن اعترض تطبيق خبيث رمز التفويض في الطريق، فلن يستطيع استبداله دون الـ code_verifier الذي بقي عند التطبيق الأصلي.', 'If a malicious app intercepts the authorization code, it cannot exchange it without the code_verifier that stayed with the original app.', 'Kötü niyetli bir uygulama yetkilendirme kodunu ele geçirse bile, asıl uygulamada kalan code_verifier olmadan değiştiremez.') }),
  choice({ id: 'ss-s2-signed-url', level: 'senior', topic,
    prompt: W('فواتير العملاء في bucket عام بروابط مثل /invoices/1042.pdf. ما المشكلة والحل؟', 'Customer invoices sit in a public bucket at URLs like /invoices/1042.pdf. The problem and the fix?', 'Müşteri faturaları açık bir bucket’ta /invoices/1042.pdf gibi URL’lerde duruyor. Sorun ve çözüm?'),
    options: L3(
      ['يمكن تخمين الأرقام وتنزيل فواتير الآخرين؛ bucket خاص وروابط موقّعة قصيرة العمر بعد فحص الصلاحية', 'لا مشكلة لأن الملفات PDF', 'إضافة كلمة مرور للـ PDF فقط', 'تغيير الأرقام إلى حروف'],
      ['The numbers can be guessed to download others’ invoices; use a private bucket and short-lived signed URLs after a permission check', 'No problem, they are PDFs', 'Only password-protect the PDF', 'Switch numbers to letters'],
      ['Numaralar tahmin edilip başkalarının faturaları indirilebilir; özel bucket ve yetki kontrolünden sonra kısa ömürlü imzalı URL’ler', 'PDF oldukları için sorun yok', 'Sadece PDF’e şifre koymak', 'Numaraları harfe çevirmek'],
    ), answer: 0,
    why: W('الملفات الخاصة تحتاج نفس فحص الصلاحية مثل البيانات. الرابط الموقّع ينتهي بعد دقائق، فلا يفيد إن انتشر.', 'Private files need the same permission check as data. A signed URL expires after minutes, so it is useless if shared around.', 'Özel dosyalar da veriler kadar yetki kontrolü ister. İmzalı URL dakikalar sonra sona erer; paylaşılsa bile işe yaramaz.') }),
]
