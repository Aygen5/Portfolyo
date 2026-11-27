# Proje Tanımı ve İşleyiş (`project.md`)

## 1. Vizyon ve Amaç
Bu proje, klasik ve statik kişisel portfolyo sitelerinin dışına çıkan; **Twitter / X profil akışı** mantığında kurgulanmış, sıcak, samimi ve yaşayan bir kişisel portfolyo platformudur.

- **Dil:** Arayüz ve tüm içerikler **İngilizce** olacaktır (global erişilebilirlik ve profesyonel sunum için).
- **Ton ve Hissiyat:** Kurumsal soğukluktan uzak, "editorial & warm" (sıcak, dergi/stüdyo estetiğinde), merak uyandıran, ilk saniyeden canlı hissettiren (kahve buharı, lamba nefesi, fareyi takip eden paralaks katmanlar) bir deneyim.
- **Temel Hedef:** Ziyaretçinin (işveren, ekip arkadaşı veya geliştirici) sadece projeleri okuması değil; beğeni (❤️) bırakabilmesi, ziyaretçi defterine not düşebilmesi ve tek tıkla doğrudan mesaj (DM / Hire Me) gönderebilmesi.

---

## 2. Sayfa ve Bileşen Akışı

### A. Üst Navigasyon (Top Navigation Bar)
- Sol tarafta el yazısı (`Caveat` / SVG imza) **A.Y** logosu (hover'da yeniden çizilme animasyonu).
- Ortada hızlı sekme geçiş linkleri (`Projects`, `About`, `Stack`, `Notes`).
- Sağda **Tema Değiştirici** (Warm Light ↔ Warm Dark) ve dikkat çeken **Hire Me** butonu (doğrudan DM/İletişim alanına kaydırır ve sekmeyi açar).

### B. Eğlenceli Giriş (Compact Hero Section)
- **Sol Kolon:**
  - Anlık durum rozeti (örn. `Open to internships & creative builds`).
  - Büyük, samimi başlık (`Hi, I'm Aygen!`) ve alt başlık.
  - Kısa tanıtım metni ve iki aksiyon butonu (`View Projects`, `Get in Touch`).
- **Sağ Kolon (Canlı İllüstrasyon):**
  - Asılı sıcak lambalı, laptoplu, kahve fincanlı, bitkili ve kitap raflı çalışma masası illüstrasyonu.
  - Sürekli çalışan mikro-animasyonlar (kahve buharı, lamba ışığı nefesi, bitki salınımı) + fare hareketine duyarlı paralaks katmanlar.

### C. Twitter / X Profil Başlığı (Social Profile Header Card)
- Üstte sıcak pastel/organik gradyan kapak banner'ı.
- Banner'ın sol altına oturan yuvarlak profil avatarı ve doğrulanmış (Verified) rozeti.
- İsim (`Aygen Yıldırım`), `@aygenyildirim`, kısa ve karakterli bio (Backend ağırlıklı Full-Stack, Mobil, SAP ilgisi ve Clean Architecture & Proje Yönetimi vurgusu), anlık durum etiketi (`✨ Currently: Exploring SAP & building clean systems`), konum (`Istanbul, Turkey`) ve sosyal linkler (`GitHub`, `LinkedIn`, `Email`).
- Profil akışı içinde veya hemen altında Aygen'in mühendislik felsefesini yansıtan imza alıntı kartı ("Engineering Note"):
  > *"I don't just learn. I build. Every technology on this page exists here because I used it to ship something — not because I watched a course about it."*

### D. 4 Ana Sekme (Horizontal Profile Tabs)
1. **Feed (Projects & Notes):**
   - Projeler sosyal medya gönderisi (tweet/post) formatında akar (6 ana proje: **Aura Crisis Network**, **FinanceFocus**, **NESTORA**, **ProductIQ**, **ProjectGym**, **PawCare**).
   - **Not:** Akışta "Pinned Post" (Sabitlenmiş Gönderi) rozeti bulunmaz; projeler özenle belirlenmiş akış sırasıyla (veya tarih/kategori filtresiyle) listelenir.
   - Her kartta: Kategori etiketi (`FULL-STACK`, `BACKEND`, `MOBILE`), proje başlığı, özet, teknoloji etiketleri, ziyaretçilerin basabileceği **canlı Beğeni (❤️) sayacı** (veritabanına kaydedilir), **GitHub Repo** ve varsa **Live Demo** butonları ile **"View Case Study"** butonu.
   - **"View Case Study" Etkileşimi (Twitter Thread / Drawer Mantığı):** Önceki portfolyodaki detaylı proje inceleme deneyimi (Problem, Goal, Solution, Architecture Layers, Features, Challenges & Learned, Ekran Görüntüleri), Twitter akışını bozmadan kartın altında akıcı bir **Case Study Drawer** veya **Thread Modal** olarak açılır.
   - Aralarda kısa geliştirici notları / mini güncellemeler (`posts`) gösterilebilir (örn. *"I care about how an application looks, but I care just as much about how it works underneath."*).
2. **About & Journey (Hakkımda, Eğitim & Yolculuk):**
   - **About Me & Key Focus Areas:** 3. sınıf Yazılım Mühendisliği öğrencisi kimliğiyle; **Backend & System Design** (.NET Core, Node.js, PostgreSQL, Clean Architecture) ağırlıklı, **Mobile** (Flutter/BLoC), **SAP Technologies** ilgisi, **UI/UX** hassasiyeti ve **Project Management / Planning** disiplinini vurgulayan özet ve 4 ana odak alanı kartı.
   - **Education, Training & Certificates Timeline:**
     1. *Istanbul Nişantaşı University* — B.Sc. Software Engineering (100% English, Oct 2023 – Jun 2028) + English Prep Program (1 Year, B2/C1).
     2. *SoftITO Software & IT Academy (İTO)* — Mobile App Developer (Flutter & Dart, 320 Hours, Online & On-site, Sep 2026 – Nov 2026, BLoC/Riverpod/Clean Architecture/CI-CD). -> **Certificate PDF**
     3. *TalentCoders TechCamp (4th Year)* — Intensive TechCamp Program (Aug 17 – Sep 11, 2026). -> **Certificate**
     4. *Acun Medya Academy & Nişantaşı Univ. SEM* — Yazılım Flex Backend Eğitimi / Bootcamp (96 Hours, C# & PostgreSQL, Jan 2026 – Jun 2026, Clean Architecture, Docker, xUnit). -> **Certificate PDF**
   - **Sertifika & CV Alanı:** İlgili eğitim/kurs kartlarının altında **"View Certificate"** butonları (yeni sekmede PDF/görsel açar) ve üstte tek tıkla **Download CV (`Aygen_Yildirim_CV_EN.pdf`)** butonu.
3. **Tech Stack:**
   - Klasik `%85 React` gibi yapay ilerleme çubukları yerine; 4 kategoride (`Backend & APIs`, `Frontend & Mobile`, `Databases & Cloud`, `Architecture, DevOps & AI Workflow`) gruplanmış etkileşimli teknoloji rozetleri.
   - Hover veya odaklanmada her teknolojinin yanında kısa deneyim notu (örn. `ASP.NET Core — Built Clean Architecture REST APIs & CQRS pipelines`).
4. **Guestbook / DM:**
   - **Ziyaretçi Defteri (Guestbook):** Ziyaretçilerin isim, mood/emoji ve kısa bir not bırakabildiği gerçek zamanlı akış.
   - **DM / Hire Me Formu:** Doğrudan iş/staj teklifi veya iletişim mesajı gönderebilme (başarılı gönderimde zarf uçuş animasyonu).

### E. Yönetim (Admin) Alanı (`/admin` — İlk Sürümde Dahil)
- Basit, güvenli (`ADMIN_SECRET` / Bearer Token) `/admin` ekranı üzerinden:
  - Gelen `messages` (DM / Hire Me) kayıtlarını okuma ve okundu işaretleme,
  - Yeni proje veya mini geliştirici notu (`posts`) ekleme / silme,
  - Ziyaretçi defteri (`guestbook_entries`) moderasyonu.

---

## 3. Veritabanı Veri Modeli (Özet)
- `projects`: `id`, `slug`, `title`, `subtitle`, `category` (`fullstack` | `backend` | `mobile`), `summary`, `overview`, `problem`, `goal`, `solution`, `techStack` (JSON), `highlights` (JSON), `architecture` (JSON), `features` (JSON), `challenges` (JSON), `learned` (JSON), `imageUrl`, `liveUrl`, `repoUrl`, `likes`, `sortOrder`, `createdAt`
- `posts`: `id`, `content`, `mood`, `likes`, `createdAt`
- `guestbook_entries`: `id`, `authorName`, `emoji`, `message`, `createdAt`
- `messages`: `id`, `senderName`, `senderEmail`, `subject`, `body`, `isRead`, `createdAt`

