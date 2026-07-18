# 💈 Yakamoz Erkek Kuaförü — Online Randevu Sistemi

Yakamoz Erkek Kuaförü için geliştirilmiş, backend gerektirmeyen, tamamen istemci tarafında (client-side) çalışan bir randevu yönetim uygulamasıdır. Müşteriler online randevu alabilir, randevularını telefon numaralarıyla sorgulayabilir; işletme sahibi ise admin panelinden randevuları onaylayıp yönetebilir.

🎯 Portfolyo / demo projesi — Veriler bir sunucuya değil, tarayıcının localStorage'ına kaydedilir.

## 📑 İçindekiler


Özellikler
Ekran Akışı
Teknoloji Yığını
Proje Yapısı
Kurulum
Admin Girişi
Veri Katmanı ve Kalıcılık
Randevu İş Kuralları
Tema Sistemi
Bilinen Sınırlamalar
Yol Haritası



### ✨ Özellikler

### Müşteri Tarafı


🏠 Ana Sayfa — İşletme tanıtımı, öne çıkan hizmetler, hızlı randevu çağrısı
✂️ Hizmetler — Aktif hizmetlerin listesi (isim, süre, ücret), hizmete tıklayarak doğrudan randevu formuna geçiş
📅 Randevu Al — Ad-soyad, telefon, hizmet seçimi, takvimden tarih seçimi ve o günün uygun saatlerini gösteren dinamik saat seçimi
🔍 Randevularım — Telefon numarasıyla geçmiş/gelecek randevu sorgulama
🌗 Açık/Koyu Tema — Sistem tercihine duyarlı, manuel değiştirilebilir tema anahtarı


### Admin (Berber Paneli) Tarafı


🔐 Kullanıcı adı/şifre ile korumalı giriş (ProtectedRoute)
📋 Randevu Yönetimi — Güne göre randevu listeleme, durum/hizmet/isim filtreleme, randevu detayında onayla / iptal et / sil / tarih değiştir / müşteriyi engelle işlemleri
🚫 Engellenen Müşteriler — Kötüye kullanan müşterileri isim+telefon eşleşmesiyle engelleme/engel kaldırma
🛠️ Hizmet Yönetimi — Hizmet ekleme, düzenleme, silme, aktif/pasif yapma
📆 Kapalı Günler — Resmî tatil, bakım vb. sebeplerle özel gün kapatma
⚙️ Ayarlar — Haftalık kapalı gün seçimi, admin şifre değiştirme



### 🧭 Ekran Akışı

Ana Sayfa ──┬── Hizmetler ──► Randevu Al ──► Onay Ekranı <br>
            ├── Randevu Al (doğrudan) <br>
            ├── Randevularım (telefonla sorgu) <br>
            └── Admin Girişi ──► Berber Paneli <br>
                                   ├── Randevular (filtrele / onayla / iptal / sil / ertele / engelle) <br>
                                   ├── Engellenen Müşteriler <br>
                                   ├── Hizmetler (CRUD) <br>
                                   ├── Kapalı Günler <br>
                                   └── Ayarlar (çalışma günleri, şifre) <br>


### 🧰 Teknoloji Yığını

| Katman           | Kullanılan Kütüphane                                                |
|----------------:|:-------------------------------------------------------------------:|
| UI Framework     | React (fonksiyonel bileşenler + Hooks)                              |
| Yönlendirme      | react-router-dom (BrowserRouter, ProtectedRoute)                    |
| Form Yönetimi    | react-hook-form (useForm, Controller)                               |
| Bildirimler      | react-toastify                                                      |
| Tarih İşlemleri  | dayjs (weekday, customParseFormat, isSameOrAfter/Before, tr locale) |
| İkonlar          | lucide-react                                                        |
| Veri Kalıcılığı  | Tarayıcı localStorage (özel storage.js sarmalayıcı)                 |
| Kimlik Doğrulama | İstemci tarafında üretilen sahte JWT (demo amaçlı, alg: none)       |
| Stil             | CSS, CSS custom properties (design tokens) ile tema yönetimi        |


⚠️ Not: Kimlik doğrulama, kod içindeki yorumda da belirtildiği gibi gerçek bir backend'i temsil etmez. Üretim ortamında bu mantığın bir sunucu tarafından yürütülmesi gerekir.

### 📁 Proje Yapısı

src/ <br>
├── App.jsx                     # Route tanımları ve provider ağacı <br>
├── App.css                     # Tüm tasarım tokenları ve global stiller <br>
├── context/ <br>
│   ├── SettingsContext.jsx     # İşletme adı, telefon, çalışma saatleri, kapalı gün <br>
│   ├── AuthContext.jsx         # Sahte JWT tabanlı admin oturumu <br>
│   ├── ServiceContext.jsx      # Hizmet CRUD + aktif/pasif yönetimi <br>
│   ├── BlockedCustomerContext.jsx <br>
│   ├── AppointmentContext.jsx  # Randevu CRUD, slot doluluk kontrolü <br>
│   ├── ClosedDayContext.jsx    # Admin tarafından eklenen özel kapalı günler <br>
│   └── ThemeContext.jsx        # Açık/koyu tema durumu <br>
├── components/ <br>
│   ├── layout/                 # Header, Footer, ProtectedRoute <br>
│   ├── pages/                  # Home, Services, BookAppointment, MyAppointments, <br>
│   │                           # Login, AdminPanel, NotFound <br>
│   ├── admin/                  # BusinessHoursSettings, ClosedDaysManager, <br>
│   │                           # AppointmentFilters, PasswordSettings <br>
│   ├── services/                # ServiceCard, ServiceForm, ServiceManagerList <br>
│   ├── ui/                      # Button, Input, Select, Modal, Card, Badge, Calendar, Spinner <br>
│   ├── visuals/                 # Logo, BarberStripe (marka imza öğesi) <br>
│   └── hooks/                   # useAvailability, useDebounce, useFetch <br>
└── utils/ <br>
    ├── dateUtils.js             # Slot üretimi, tarih formatlama, çalışma günü kontrolü <br>
    ├── scheduling.js            # Tek noktadan tarih kapalılık kontrolü (UI + veri katmanı ortak) <br>
    ├── storage.js                # localStorage get/set sarmalayıcı + STORAGE_KEYS <br>
    └── validation.js             # Ad-soyad / telefon doğrulama ve normalize etme <br>

Mimari Not: utils/scheduling.js içindeki getDateClosureInfo fonksiyonu, hem Calendar bileşeninin hem useAvailability hook'unun hem de AppointmentContext'in aynı kapalı gün mantığını kullanmasını sağlar. Bu, arayüz ile veri katmanının kapanış kurallarında birbirinden sapmasını önler.


### 🚀 Kurulum

bash# Bağımlılıkları yükleyin  <br>
npm install 

### Geliştirme sunucusunu başlatın
npm run dev

### Üretim derlemesi
npm run build

Uygulama varsayılan olarak Vite geliştirme sunucusunda (index.html giriş noktası /src/main.jsx) çalışacak şekilde yapılandırılmıştır.


### 🔑 Admin Girişi

Varsayılan demo kimlik bilgileri (AuthContext.jsx içinde tanımlı):

| Kullanıcı Adı | Şifre       |
|---------------|-------------|
| admin         | yakamoz2026 |


Giriş yaptıktan sonra admin, Ayarlar sekmesinden şifresini değiştirebilir (PasswordSettings). Oturum, 8 saat geçerlilik süreli bir token ile localStorage'da tutulur.


#### 💾 Veri Katmanı ve Kalıcılık

Tüm veriler src/utils/storage.js üzerinden localStorage'a yazılır. Kullanılan anahtarlar:

| Anahtar                   | İçerik                                                         |
|---------------------------|----------------------------------------------------------------|
| yakamoz_appointments      | Randevu kayıtları                                              |
| yakamoz_services          | Hizmet listesi                                                 |
| yakamoz_blocked_customers | Engellenen müşteriler                                          |
| yakamoz_auth_token        | Admin oturum token'ı                                           |
| yakamoz_admin_credentials | Admin kullanıcı adı/şifresi                                    |
| yakamoz_settings          | İşletme ayarları (isim, telefon, çalışma saatleri, kapalı gün) |
| yakamoz_closed_days       | Özel kapalı günler                                             |
| yakamoz_theme             | Seçili tema                                                    |
| yakamoz_admin_filters     | Admin panelindeki son kullanılan randevu filtreleri            |


Backend olmadığı için useFetch hook'u şu an aktif kullanılmıyor; ileride gerçek bir API'ye (/api/appointments vb.) geçiş yapılmak istenirse hazır bir soyutlama olarak bırakılmıştır.




### 📏 Randevu İş Kuralları

- Çalışma saatleri: 09:00 – 19:00, 30 dakikalık dilimlerle (SLOT_INTERVAL_MINUTES)
- Bir zaman dilimine en fazla 2 randevu alınabilir (MAX_APPOINTMENTS_PER_SLOT)
- Varsayılan haftalık kapalı gün: Salı (admin panelinden değiştirilebilir)
- Admin, takvimden bağımsız olarak istediği özel günleri de kapalı ilan edebilir (resmî tatil, bakım vb.)
- Geçmiş tarih/saatler otomatik olarak seçilemez hale gelir
- Aynı ad-soyad + telefon kombinasyonu engellenmişse yeni randevu oluşturulamaz
- Randevu ertelendiğinde de aynı doluluk ve kapalı gün kontrolleri tekrar uygulanır

### 🎨 Tema Sistemi


- İlk yüklemede index.html içindeki inline script, flash of wrong theme önlemek için tema kararını DOM boyanmadan önce verir
- Kullanıcı tercihi yoksa prefers-color-scheme sistem ayarına bakılır
- Seçim ThemeContext üzerinden data-theme attribute'u ile CSS custom property'lerine yansıtılır


⚠️ Bilinen Sınırlamalar

- Gerçek bir backend/API yoktur; veriler yalnızca kullanıcının tarayıcısında saklanır ve cihazlar arasında senkronize olmaz
- Kimlik doğrulama demo amaçlıdır, üretim güvenliği sağlamaz (alg: none sahte JWT)
- Randevu bildirimleri (SMS/e-posta) gönderilmez, sadece uygulama içi toast bildirimleri vardır


🗺️ Yol Haritası Fikirleri

- Gerçek bir backend/API entegrasyonu (useFetch hook'u bu geçişe hazır)
- SMS/e-posta ile randevu hatırlatma
- Çoklu berber/çalışan desteği
- Randevu istatistikleri ve raporlama paneli
