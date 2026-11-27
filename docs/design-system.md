# Tasarım Sistemi ve Animasyon Planı (`design-system.md`)

Bu doküman, `stitch/code.html` referans tasarımını temel alarak projenin görsel dilini, renk paletini, tipografisini ve canlı mikro-animasyonlarını tanımlar.

---

## 1. Tasarım Felsefesi
- **Estetik:** *Warm Editorial & Living Workspace*. Klasik soğuk teknoloji portfolyoları yerine; kağıt dokusu sıcaklığında, zeytin yeşili ve terracotta tonlarıyla dengelenmiş, samimi bir stüdyo atmosferi.
- **Koyu Mod (Warm Dark Mode):** Kesinlikle `#000000` saf siyah veya yapay zekanın sık kullandığı soğuk lacivert (`#0F172A`) **kullanılmaz**. Koyu modda da yosun/kömür sıcaklığı (`#292B25` zemin, `#34372F` kartlar, `#E8DFD0` krem metin) korunur.

---

## 2. Renk Paleti (Color Tokens)

### Aydınlık Mod (Warm Light)
- **Zemin (`surface`):** `#F4EFE5` (Sıcak krem / kağıt)
- **Kart / Konteyner (`surface-container`):** `#FAF7F0`
- **İkincil Yüzey (`surface-muted`):** `#EAE3D5`
- **Ana Metin (`on-surface`):** `#49382F` (Koyu espresso kahve)
- **İkincil Metin (`on-surface-muted`):** `#6F6459`
- **Ana Vurgu (`primary`):** `#344536` (Orman zeytini / Forest Olive)
- **İkincil Vurgu (`secondary`):** `#A8B29A` (Adaçayı / Sage)
- **Sıcak Aksan (`terracotta`):** `#C18B70` (Lamba ışığı, kalp ve sıcak detaylar)
- **Çizgi / Kenarlık (`outline`):** `#DED5C7`

### Karanlık Mod (Warm Dark)
- **Zemin (`surface`):** `#292B25` (Sıcak yosun kömürü)
- **Kart / Konteyner (`surface-container`):** `#34372F`
- **İkincil Yüzey (`surface-muted`):** `#3E4238`
- **Ana Metin (`on-surface`):** `#E8DFD0` (Yumuşak krem)
- **İkincil Metin (`on-surface-muted`):** `#B8AE9D`
- **Ana Vurgu (`primary`):** `#87977B` (Yumuşak adaçayı)
- **İkincil Vurgu (`secondary`):** `#414A37`
- **Çizgi / Kenarlık (`outline`):** `#494A40`

---

## 3. Tipografi
- **Başlıklar (`display` / `headline`):** `DM Serif Display` — Karakterli, editoryal ve samimi.
- **Gövde ve Arayüz (`body` / `title`):** `Manrope` — Yüksek okunabilirlik, modern ve temiz.
- **Etiketler ve Kod (`label` / `mono`):** `IBM Plex Mono` — Teknoloji rozetleri, durum etiketleri ve tarihler için.
- **İmza (`signature`):** `Caveat` veya özel SVG el yazısı yolu.

---

## 4. Canlı Mikro-Animasyon Planı

Tüm animasyonlar `prefers-reduced-motion: reduce` medya sorgusuna saygı duyar.

1. **Hero Masa İllüstrasyonu (Sürekli Yaşayan Sahne):**
   - **Kahve Buharı (`steamRise`):** Fincanın üzerinden iki farklı fazda (3.4s ve 3.8s) yükselip kaybolan yumuşak buhar dalgaları.
   - **Asılı Lamba Işığı (`lampBreathe`):** 4.2 saniyelik döngüde sıcak terracotta ışığın parlaklığının ve yarıçapının nefes alır gibi azalıp artması.
   - **Bitki Salınımı (`leafSway`):** 5 saniyelik çok hafif rüzgar salınımı.
   - **Fare Takibi (Mouse Parallax):** Fare masa sahnesi veya hero üzerinde hareket ettikçe kitap rafı, lamba ve ön plan objelerinin derinlik hissi verecek şekilde hafifçe (2px–8px) zıt/paralel kayması.
2. **İmza ve Navigasyon:**
   - Sol üstteki **A.Y** imzasının üzerine gelindiğinde (`hover`) SVG `stroke-dashoffset` ile el yazısının yeniden çizilmesi.
3. **Twitter/X Akışı ve Etkileşimler:**
   - **Sekme Geçişleri:** `AnimatePresence` ile 220ms yumuşak dikey kayma (`fadeSlideIn`).
   - **Beğeni (❤️) Butonu:** Tıklandığında `heartPop` (scale 1 -> 1.35 -> 1) animasyonu ve terracotta renk geçişi.
   - **Case Study Thread / Modal:** "View Case Study" tıklandığında projenin tüm mühendislik hikayesini (Problem -> Goal -> Solution -> Architecture Layers -> Challenges & Learned + Ekran Görüntüsü + Repo/Live Demo linkleri) Twitter "Thread" (zincir gönderi) estetiğinde akıcı şekilde açan detay paneli.
   - **Sertifika & CV Butonları:** Hover'da hafif yükselme ve yeni sekmede PDF açma ikonu (`open_in_new`) mikro-animasyonu.
   - **DM / İletişim Gönderimi:** Mesaj başarıyla gönderildiğinde zarf ikonunun uçuş (`envelopeFly`) animasyonu.

