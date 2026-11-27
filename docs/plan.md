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
- [ ] **Prisma & SQLite Kurulumu:** `server/prisma/schema.prisma` içinde `Project`, `Post`, `GuestbookEntry`, `Message` modellerini tanımla ve ilk migration'ı oluştur.
- [ ] **Domain Katmanı (`server/src/domain/`):**
  - [ ] Saf TypeScript entity'lerini (`Project`, `Post`, `GuestbookEntry`, `ContactMessage`) tanımla.
  - [ ] Repository arayüzlerini (`IProjectRepository`, `IPostRepository`, `IGuestbookRepository`, `IMessageRepository`) yaz.
- [ ] **Infrastructure Katmanı (`server/src/infrastructure/`):**
  - [ ] Prisma modellerini Domain Entity'lere dönüştüren izole Mapper'ları yaz.
  - [ ] Repository implementasyonlarını (`PrismaProjectRepository` vb.) oluştur.
  - [ ] 6 projeyi (Aura Crisis Network, FinanceFocus, NESTORA, ProductIQ, ProjectGym, PawCare) ve başlangıç geliştirici notlarını ekleyen idempotent `seed.ts` script'ini yaz ve çalıştır.
- [ ] **Application Katmanı (`server/src/application/`):**
  - [ ] Public Use Case'leri yaz: `GetProjects`, `LikeProject`, `GetPosts`, `LikePost`, `GetGuestbook`, `CreateGuestbookEntry`, `SendMessage`.
  - [ ] Admin Use Case'leri yaz: `AdminVerify`, `CreateProject`, `DeleteProject`, `CreatePost`, `DeletePost`, `GetMessages`, `MarkMessageRead`, `DeleteGuestbookEntry`.
- [ ] **Presentation Katmanı (`server/src/presentation/`):**
  - [ ] Zod validasyon şemalarını yaz.
  - [ ] `adminAuthMiddleware`, `rateLimiter` ve merkezi `errorHandler` middleware'lerini kur.
  - [ ] Express controller ve route'larını (`/api/projects`, `/api/posts`, `/api/guestbook`, `/api/messages`, `/api/admin/*`) bağla.
- [ ] Backend API uçlarını (health, public get/post, admin auth) test ederek doğrula.

---

## Faz 2: Design System & Frontend Çekirdeği (Client Core)
- [ ] Tailwind CSS yapılandırmasını `docs/design-system.md` renk token'larıyla (Warm Light & Warm Dark) ve fontlarla (`DM Serif Display`, `Manrope`, `IBM Plex Mono`, `Caveat`) kur.
- [ ] Framer Motion ve Lucide ikon paketlerini ekle; `prefers-reduced-motion` desteğini global CSS ve hook seviyesinde tanımla.
- [ ] `ThemeProvider` (Warm Light ↔ Warm Dark geçişi + `localStorage` kalıcılığı) oluştur.
- [ ] `client/src/domain/` tiplerini ve `client/src/services/` (`apiClient`, `projectService`, `postService`, `guestbookService`, `messageService`, `adminService`) katmanını oluştur.
- [ ] Atomik UI bileşenlerini (`Button`, `Badge`, `Card`, `Drawer/Modal`, `Toast`) oluştur.

---

## Faz 3: Hero, Navbar & Twitter/X Profil Başlığı
- [ ] **Navbar:** Sol tarafta hover'da yeniden çizilen el yazısı **A.Y** SVG imzası, orta navigasyon linkleri, tema değiştirici ve `Hire Me` butonu.
- [ ] **Compact Hero:** Durum rozeti, `DM Serif Display` başlık, CTA butonları (`View Projects`, `Get in Touch`).
- [ ] **Yaşayan Çalışma Masası İllüstrasyonu:** Kahve buharı (`steamRise`), nefes alan asılı lamba (`lampBreathe`), bitki salınımı (`leafSway`) ve fareyi takip eden paralaks (`useMouseParallax`) animasyonlarını Framer Motion + SVG ile kur.
- [ ] **Social Profile Header Card:** Pastel/organik gradyan kapak banner'ı, yüzü tam ortalanmış yuvarlak avatar (`object-cover`), doğrulanmış rozeti, bio, anlık durum etiketi ve sosyal linkler (`GitHub`, `LinkedIn`, `Email`).
- [ ] **Horizontal Profile Tabs:** `Feed`, `About & Journey`, `Tech Stack`, `Guestbook / DM` sekmeleri ve `AnimatePresence` geçişi.

---

## Faz 4: 4 Ana Sekme ve İçeriklerin İnşası
- [ ] **Feed Sekmesi (`features/feed/`):**
  - [ ] İmza söz kartı (*"I don't just learn. I build..."*) ve mini geliştirici notları (`posts`).
  - [ ] Pinned rozeti **olmadan** 6 proje kartı (kategori etiketi, özet, teknoloji rozetleri, optimistic ❤️ beğeni sayacı, GitHub Repo, Live Demo ve `View Case Study` butonu).
  - [ ] **Case Study Thread Drawer / Modal:** Tıklandığında Problem, Goal, Solution, Architecture Layers, Challenges & Learned ve ekran görüntülerini Twitter Thread estetiğinde açan detay bileşeni.
- [ ] **About & Journey Sekmesi (`features/about/`):**
  - [ ] Hakkımda özeti (Backend, Full-Stack, Mobile, SAP ilgisi, Clean Architecture & Proje Yönetimi vurgusu) + 4 `Key Focus Areas` kartı.
  - [ ] `Download CV (PDF)` butonu.
  - [ ] Eğitim & Gelişim Timeline'ı (İstanbul Nişantaşı Üni., SoftITO, TalentCoders TechCamp, Acun Medya Akademi) ve her sertifika için yeni sekmede açılan `View Certificate` butonları.
- [ ] **Tech Stack Sekmesi (`features/stack/`):**
  - [ ] 4 kategoride (`Backend & APIs`, `Frontend & Mobile`, `Databases & Cloud`, `Architecture, DevOps & AI Workflow`) etkileşimli teknoloji rozetleri ve hover/focus deneyim notları.
- [ ] **Guestbook / DM Sekmesi (`features/guestbook/`):**
  - [ ] Gerçek zamanlı Ziyaretçi Defteri (isim + mood emoji + mesaj ekleme ve listeleme).
  - [ ] DM / Hire Me formu (başarılı gönderimde zarf uçuş `envelopeFly` animasyonu).

---

## Faz 5: Şifreli Yönetim Paneli (`/admin`)
- [ ] `/admin` rotası ve şifre/secret giriş ekranı (`ADMIN_SECRET` doğrulaması).
- [ ] **Gelen Kutusu (DM / Hire Me):** Ziyaretçilerden gelen mesajları listeleme ve okundu işaretleme.
- [ ] **İçerik Yönetimi:** Yeni proje veya mini geliştirici notu (`post`) ekleme ve silme.
- [ ] **Guestbook Moderasyonu:** Ziyaretçi defteri kayıtlarını görüntüleme ve gerekirse silme.

---

## Faz 6: Son Kontrol, Doğrulama ve Teslim
- [ ] Responsive (mobil, tablet, masaüstü) ve Warm Light / Warm Dark tema kontrast kontrolleri.
- [ ] Tüm animasyonların akıcılığı, CV & Sertifika PDF linklerinin çalışırlığı, avatar hizalaması ve API hata senaryolarının testi.
- [ ] `client` ve `server` TypeScript build (`tsc` & `vite build`) kontrollerinin hatasız geçmesi.

