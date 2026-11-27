# Teknoloji Yığını ve Kullanım Rehberi (`skills.md`)

Bu doküman, projede kullanılacak teknolojileri, neden seçildiklerini ve her birinin hangi sınırlar içinde kullanılacağını tanımlar.

---

## 1. Frontend Teknolojileri

| Teknoloji | Kullanım Amacı | Nasıl Kullanacağız? |
| :--- | :--- | :--- |
| **React 18+ & TypeScript** | UI bileşenleri ve tip güvenliği | Katı TypeScript (`strict: true`). Her API yanıtı ve domain nesnesi için paylaşılan tipler. |
| **Vite** | Geliştirme sunucusu ve bundler | Hızlı HMR ve hafif production build. SSR karmaşası olmadan SPA olarak çalışır. |
| **Tailwind CSS** | Stil sistemi ve tema yönetimi | `darkMode: 'class'` ile Warm Light / Warm Dark geçişi. Renk, tipografi ve spacing değerleri `design-system.md` token'larına birebir bağlıdır. |
| **Framer Motion** | Mikro-animasyonlar ve sekme geçişleri | Sekme geçişleri (`AnimatePresence`), kart girişleri, beğeni (❤️) pop efekti, fare paralaksı (`useMotionValue`, `useSpring`). `prefers-reduced-motion` desteği zorunludur. |
| **Lucide React / Material Symbols** | İkonografi | Tutarlı çizgi kalınlığına sahip sade ikonlar. |

---

## 2. Backend Teknolojileri

| Teknoloji | Kullanım Amacı | Nasıl Kullanacağız? |
| :--- | :--- | :--- |
| **Node.js + TypeScript** | Sunucu çalışma zamanı | Frontend ile aynı dil (TS) sayesinde hızlı geliştirme ve ortak tip/validasyon mantığı. |
| **Express (veya Fastify)** | HTTP API sunucusu | Hafif REST API. Sadece HTTP yönlendirme, middleware (CORS, rate-limit, error handler) ve controller delegasyonu yapar; iş mantığı barındırmaz. |
| **Zod** | İstek (Request) doğrulama | Guestbook, DM formu ve Admin isteklerinin şema doğrulaması. Hatalı veriyi daha controller aşamasında yakalar. |

---

## 3. Veritabanı ve ORM

| Teknoloji | Kullanım Amacı | Nasıl Kullanacağız? |
| :--- | :--- | :--- |
| **SQLite** | Hafif, tek dosyalık veritabanı | Sıfır sunucu kurulumu. Geliştirme ve küçük/orta ölçekli canlı ortam için ideal. |
| **Prisma ORM** | Tip güvenli veritabanı erişimi | `schema.prisma` üzerinden modeller yönetilir. İleride PostgreSQL/Supabase'e geçmek gerekirse yalnızca `datasource` sağlayıcısı değiştirilir. |

---

## 4. Kalite, Güvenlik ve Dağıtım (Deploy) Kuralları
- **Ortam Değişkenleri (`.env`):** `DATABASE_URL`, `ADMIN_SECRET`, `PORT` gibi hassas değerler asla koda gömülmez.
- **Rate Limiting & Basit Spam Koruması:** Guestbook ve DM endpoint'lerinde basit IP bazlı rate-limit uygulanır.
- **Temiz Bağımlılık:** Gereksiz büyük kütüphanelerden kaçınılır; her yeni paket eklenmeden önce "gerçekten gerekli mi?" sorusu sorulur.

