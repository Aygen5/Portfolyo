# Uygulama Planı (`plan.md`)

Bu plan, projenin baştan sona **Clean Architecture** ve **Design System** kurallarına sadık kalarak, hiçbir katmanı birbirine karıştırmadan adım adım inşa edilmesi için hazırlanmıştır. Her adım tamamlandığında yanındaki kutucuk `[x]` olarak işaretlenecektir.

---

## Faz 0: Varlıkların (Assets) Toplanması ve Proje İskeleti
- [x] Kök dizinde `client/` (React + Vite + TS) ve `server/` (Node.js + Express + TS) çalışma alanlarını oluştur.
- [x] Kullanıcı tarafından sağlanan medya ve belgeleri `client/public/assets/` altında düzenli klasörlere yerleştir:
  - [x] Profil fotoğrafını (`avatar.jpg`) ekle (yuvarlak avatar içinde yüzün tam ortalanması için konumlandırma ayarla).
  - [x] `Aygen_Yildirim_CV_EN.pdf` dosyasını `assets/docs/cv.pdf` olarak ekle.
  - [x] 3 sertifikayı (`acunmedya-backend.pdf`, `softito-mobile.pdf`, `talentcoders-techcamp.jpg`) `assets/certificates/` altına ekle.
  - [x] `Aygen5/portfolio`, `Aygen5/NESTORA` ve `Aygen5/PawCare` repolarından proje ekran görüntülerini `assets/projects/` altına indir/yerleştir.
- [x] Kök dizinde tek komutla hem client hem server'ı ayağa kaldıracak script/yapılandırmayı (`package.json` veya workspace) kur.

---

## Faz 1: Data & Backend Katmanı (Clean Architecture — Server)
- [x] **Prisma & SQLite Kurulumu:** `server/prisma/schema.prisma` içinde `Project`, `Post`, `GuestbookEntry`, `Message` modellerini tanımla ve ilk migration'ı oluştur.
- [x] **Domain Katmanı (`server/src/domain/`):**
  - [x] Saf TypeScript entity'lerini (`Project`, `Post`, `GuestbookEntry`, `ContactMessage`) tanımla.
  - [x] Repository arayüzlerini (`IProjectRepository`, `IPostRepository`, `IGuestbookRepository`, `IMessageRepository`) yaz.
- [x] **Infrastructure Katmanı (`server/src/infrastructure/`):**
  - [x] Prisma modellerini Domain Entity'lere dönüştüren izole Mapper'ları yaz.
  - [x] Repository implementasyonlarını (`PrismaProjectRepository` vb.) oluştur.
  - [x] 6 projeyi (Aura Crisis Network, FinanceFocus, NESTORA, ProductIQ, ProjectGym, PawCare) ve başlangıç geliştirici notlarını ekleyen idempotent `seed.ts` script'ini yaz ve çalıştır.
- [x] **Application Katmanı (`server/src/application/`):**
  - [x] Public Use Case'leri yaz: `GetProjects`, `LikeProject`, `GetPosts`, `LikePost`, `GetGuestbook`, `CreateGuestbookEntry`, `SendMessage`.
  - [x] Admin Use Case'leri yaz: `AdminVerify`, `CreateProject`, `DeleteProject`, `CreatePost`, `DeletePost`, `GetMessages`, `MarkMessageRead`, `DeleteGuestbookEntry`.
- [x] **Presentation Katmanı (`server/src/presentation/`):**
  - [x] Zod validasyon şemalarını yaz.
  - [x] `adminAuthMiddleware`, `rateLimiter` ve merkezi `errorHandler` middleware'lerini kur.
  - [x] Express controller ve route'larını (`/api/projects`, `/api/posts`, `/api/guestbook`, `/api/messages`, `/api/admin/*`) bağla.
- [x] Backend API uçlarını (health, public get/post, admin auth) test ederek doğrula.

---

## Faz 2: Design System & Frontend Çekirdeği (Client Core)
- [x] Tailwind CSS yapılandırmasını `docs/design-system.md` renk token'larıyla (Warm Light & Warm Dark) ve fontlarla (`DM Serif Display`, `Manrope`, `IBM Plex Mono`, `Caveat`) kur.
- [x] Framer Motion ve Lucide ikon paketlerini ekle; `prefers-reduced-motion` desteğini global CSS ve hook seviyesinde tanımla.
- [x] `ThemeProvider` (Warm Light ↔ Warm Dark geçişi + `localStorage` kalıcılığı) oluştur.
- [x] `client/src/domain/` tiplerini ve `client/src/services/` (`apiClient`, `projectService`, `postService`, `guestbookService`, `messageService`, `adminService`) katmanını oluştur.
- [x] Atomik UI bileşenlerini (`Button`, `Badge`, `Card`, `Drawer/Modal`, `Toast`) oluştur.

---

## Faz 3: Hero, Navbar & Twitter/X Profil Başlığı
- [x] **Navbar:** Sol tarafta hover'da yeniden çizilen el yazısı **A.Y** SVG imzası, orta navigasyon linkleri, tema değiştirici ve `Hire Me` butonu.
- [x] **Compact Hero:** Durum rozeti, `DM Serif Display` başlık, CTA butonları (`View Projects`, `Get in Touch`).
- [x] **Yaşayan Çalışma Masası İllüstrasyonu:** Kahve buharı (`steamRise`), nefes alan asılı lamba (`lampBreathe`), bitki salınımı (`leafSway`) ve fareyi takip eden paralaks (`useMouseParallax`) animasyonlarını Framer Motion + SVG ile kur.
- [x] **Social Profile Header Card:** Pastel/organik gradyan kapak banner'ı, yüzü tam ortalanmış yuvarlak avatar (`object-cover`), doğrulanmış rozeti, bio, anlık durum etiketi ve sosyal linkler (`GitHub`, `LinkedIn`, `Email`).
- [x] **Horizontal Profile Tabs:** `Feed`, `About & Journey`, `Tech Stack`, `Guestbook / DM` sekmeleri ve `AnimatePresence` geçişi.

---

## Faz 4: 4 Ana Sekme ve İçeriklerin İnşası
- [x] **Feed Sekmesi (`features/feed/`):**
  - [x] İmza söz kartı (*"I don't just learn. I build..."*) ve mini geliştirici notları (`posts`).
  - [x] Pinned rozeti **olmadan** 6 proje kartı (kategori etiketi, özet, teknoloji rozetleri, optimistic ❤️ beğeni sayacı, GitHub Repo, Live Demo ve `View Case Study` butonu).
  - [x] **Case Study Thread Drawer / Modal:** Tıklandığında Problem, Goal, Solution, Architecture Layers, Challenges & Learned ve ekran görüntülerini Twitter Thread estetiğinde açan detay bileşeni.
- [x] **About & Journey Sekmesi (`features/about/`):**
  - [x] Hakkımda özeti (Backend, Full-Stack, Mobile, SAP ilgisi, Clean Architecture & Proje Yönetimi vurgusu) + 4 `Key Focus Areas` kartı.
  - [x] `Download CV (PDF)` butonu.
  - [x] Eğitim & Gelişim Timeline'ı (İstanbul Nişantaşı Üni., SoftITO, TalentCoders TechCamp, Acun Medya Akademi) ve her sertifika için yeni sekmede açılan `View Certificate` butonları.
- [x] **Tech Stack Sekmesi (`features/stack/`):**
  - [x] 4 kategoride (`Backend & APIs`, `Frontend & Mobile`, `Databases & Cloud`, `Architecture, DevOps & AI Workflow`) etkileşimli teknoloji rozetleri ve hover/focus deneyim notları.
- [x] **Guestbook / DM Sekmesi (`features/guestbook/`):**
  - [x] Gerçek zamanlı Ziyaretçi Defteri (isim + mood emoji + mesaj ekleme ve listeleme).
  - [x] DM / Hire Me formu (başarılı gönderimde zarf uçuş `envelopeFly` animasyonu).

---

## Faz 5: Şifreli Yönetim Paneli (`/admin`)
- [x] `/admin` rotası ve şifre/secret giriş ekranı (`ADMIN_SECRET` doğrulaması).
- [x] **Gelen Kutusu (DM / Hire Me):** Ziyaretçilerden gelen mesajları listeleme ve okundu işaretleme.
- [x] **İçerik Yönetimi:** Yeni proje veya mini geliştirici notu (`post`) ekleme ve silme.
- [x] **Guestbook Moderasyonu:** Ziyaretçi defteri kayıtlarını görüntüleme ve gerekirse silme.

---

## Faz 6: Son Kontrol, Doğrulama ve Teslim
- [x] Responsive (mobil, tablet, masaüstü) ve Warm Light / Warm Dark tema kontrast kontrolleri.
- [x] Tüm animasyonların akıcılığı, CV & Sertifika PDF linklerinin çalışırlığı, avatar hizalaması ve API hata senaryolarının testi.
- [x] `client` ve `server` TypeScript build (`tsc` & `vite build`) kontrollerinin hatasız geçmesi.

---

## Faz 7: Canlıya Alma — Her Şey Vercel'de + Bulut PostgreSQL (Supabase / Neon)
- [x] **Adım 1 (AI — Prisma PostgreSQL Geçişi):** `server/prisma/schema.prisma` dosyasını PostgreSQL (`provider = "postgresql"`, `url = env("DATABASE_URL")`) destekleyecek şekilde güncelle.
- [x] **Adım 2 (AI — Vercel Serverless API Köprüsü):** Express sunucusunu (`server/src/index.ts`) Vercel'in `/api/*` Serverless Function yapısıyla doğrudan çalışacak şekilde kök `api/index.ts` ve `vercel.json` ile bağla (böylece Frontend ve Backend aynı Vercel domaini altında sıfır CORS ve sıfır uyku süresiyle çalışır).
- [x] **Adım 3 (SEN — Ücretsiz PostgreSQL URL'si Alma):** Supabase veya Neon.tech üzerinde ücretsiz bir PostgreSQL veritabanı açıp `DATABASE_URL` bağlantı adresini sohbette paylaş.
- [x] **Adım 4 (AI — Canlı Veritabanı Kurulumu & Seed):** Paylaşılan `DATABASE_URL` ile canlı PostgreSQL veritabanına tabloları bas (`prisma db push`), 6 projeyi ve başlangıç notlarını yükle (`prisma db seed`) ve tüm değişiklikleri GitHub'a push'la.
- [ ] **Adım 5 (SEN — Vercel Deploy):** Vercel hesabında `Aygen5/Portfolyo` GitHub reposunu seç, Environment Variables kısmına `DATABASE_URL` ve `ADMIN_SECRET` değerlerini yapıştırıp **Deploy** butonuna bas.

