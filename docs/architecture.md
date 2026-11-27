# Mimari Tasarım (`architecture.md`)

Bu doküman, projenin **Frontend — Backend — Data** sınırlarını kesin hatlarla ayıran, spagetti koddan uzak, değişikliklere karşı dirençli **Clean Architecture** yapısını tanımlar.

---

## 1. Altın Mimari Kurallar (Değiştirilemez İlkeler)

1. **Kesin Katman İzolasyonu (Front / Back / Data):**
   - **Data (Veritabanı / Prisma):** Prisma modelleri ve SQL sorguları yalnızca `server/src/infrastructure/` içinde yaşar. Controller'lar, Use Case'ler veya Frontend asla Prisma tiplerini bilmez.
   - **Backend (Domain & Application):** İş kuralları (`domain/` ve `application/`) Express'i, HTTP status kodlarını veya SQLite'ı tanımaz. Saf TypeScript sınıf/fonksiyonlarıdır.
   - **Frontend (UI & Services):** React bileşenleri (`features/`, `components/`) asla doğrudan `fetch()` çağırmaz ve ham API yanıtlarını işlemez. Tüm iletişim `services/` katmanı üzerinden tipli DTO'larla yapılır.
2. **DTO & Mapper Disiplini:**
   - Veritabanı satırı -> `Infrastructure Mapper` -> `Domain Entity` -> `Application DTO` -> `HTTP JSON` -> `Frontend Service` -> `UI`.
   - Bu sayede veritabanında bir kolon adı değiştiğinde UI kırılmaz; yalnızca Mapper güncellenir.
3. **Özellik Bazlı (Feature-First) Frontend:**
   - Her sekme ve büyük alan (`hero`, `profile`, `feed`, `about`, `stack`, `guestbook`, `admin`) kendi klasöründe kendi alt bileşenleri ve hook'larıyla yaşar. Bir sekmede yapılan değişiklik diğer sekmeleri etkilemez.
4. **Tek Sorumluluk (SRP) & Küçük Dosyalar:**
   - Hiçbir bileşen veya servis dosyası 200-250 satırı aşan "Tanrı dosyası" (God file) haline getirilmez. Veri, mantık ve görünüm ayrı dosyalarda tutulur.

---

## 2. Klasör Yapısı

```text
portfolyo/
├── docs/                           # Mimari, tasarım, yetkinlik ve plan dokümanları
├── stitch/                         # Referans tasarım (HTML/CSS)
├── client/                         # FRONTEND (React + Vite + TypeScript + Tailwind + Framer Motion)
│   ├── public/
│   │   ├── assets/                 # Profil avatarı, proje ekran görüntüleri, CV & Sertifika PDF'leri
│   └── src/
│       ├── app/                    # App.tsx, ThemeProvider, Router (/ ve /admin)
│       ├── domain/                 # Frontend saf tipleri (Project, Post, GuestbookEntry, ContactMessage)
│       ├── data/                   # Statik portfolyo verileri (About, Education, Certificates, TechStack)
│       ├── services/               # HTTP API istemcisi (apiClient.ts, projectService.ts, guestbookService.ts, adminService.ts)
│       ├── hooks/                  # Paylaşılan hook'lar (useTheme, useMouseParallax)
│       ├── components/             # Atomik tasarım sistemi bileşenleri (Button, Badge, Card, Modal, Drawer)
│       └── features/               # Özellik modülleri
│           ├── navbar/             # Üst bar, imza SVG, tema değiştirici, Hire Me
│           ├── hero/               # Giriş metni + animasyonlu/paralakslı SVG çalışma masası
│           ├── profile/            # Kapak banner, avatar, bio, durum rozeti, sekmeler
│           ├── feed/               # Proje akışı, mini notlar, beğeni, Case Study Thread Drawer
│           ├── about/              # Hakkımda, 4 Odak Alanı, Eğitim/Kurs Timeline, CV & Sertifika butonları
│           ├── stack/              # Kategorize edilmiş, hover notlu teknoloji rozetleri
│           ├── guestbook/          # Ziyaretçi defteri + DM / Hire Me formu
│           └── admin/              # Şifreli /admin paneli (DM okuma, proje/post ekleme, moderasyon)
└── server/                         # BACKEND & DATA (Node.js + Express + TypeScript + Prisma + SQLite)
    ├── prisma/
    │   ├── schema.prisma           # Veritabanı şeması (SQLite; tek satırla PostgreSQL'e geçebilir)
    │   └── seed.ts                 # 6 projenin ve başlangıç notlarının idempotent seed script'i
    └── src/
        ├── config/                 # env doğrulama (PORT, DATABASE_URL, ADMIN_SECRET)
        ├── domain/                 # Saf TS Entity'leri, Domain Hataları ve Repository Interface'leri
        ├── application/            # Use Case'ler (GetProjects, LikeProject, CreateGuestbook, SendMessage, AdminUseCases)
        ├── infrastructure/         # PrismaRepository implementasyonları + Entity Mapper'ları
        └── presentation/           # Express Router, Controller'lar, Zod şemaları, Auth & Error Middleware
```

---

## 3. Veri İzolasyonu ve Güvenlik Sınırları
- **`/admin` Koruması:** Tüm `/api/admin/*` uçları `adminAuthMiddleware` ile korunur (`Authorization: Bearer <token>` veya `x-admin-secret` doğrulaması). Başarısız denemeler `401 Unauthorized` döner.
- **Input Doğrulama:** `presentation/validators/` altındaki Zod şemaları tüm `POST`/`PATCH` gövdelerini daha Use Case'e girmeden doğrular ve temizler (XSS/uzunluk sınırları).
- **Rate Limiting:** `POST /api/guestbook`, `POST /api/messages` ve `POST /api/projects/:id/like` uçlarında spam koruması bulunur.
