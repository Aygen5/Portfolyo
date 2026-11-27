# Aygen Yıldırım — Living Editorial & Twitter/X-Style Portfolio

A full-stack personal engineering portfolio crafted with a **Warm Editorial & Living Workspace** aesthetic and a **Twitter / X profile stream** experience — engineered strictly around **Clean Architecture** and **Data Isolation**.

---

## ✨ Highlights

- **Living Editorial Hero & Desk Scene:** Custom SVG workspace illustration featuring rising coffee steam, a breathing terracotta hanging lamp (click to toggle brightness), swaying plant leaves, and multi-layer cursor parallax (`prefers-reduced-motion` aware).
- **Warm Light & Warm Dark Themes:** Paper-cream light mode (`#F4EFE5`) and warm moss-charcoal dark mode (`#292B25`) — avoiding cold pure black or generic dark-blue palettes.
- **Twitter / X Profile Stream (4 Tabs):**
  1. **Feed (Projects & Dev Notes):** 6 real engineering projects (**Aura Crisis Network**, **FinanceFocus**, **NESTORA**, **ProductIQ**, **ProjectGym**, **PawCare**) with category filtering, optimistic ❤️ likes persisted in SQLite, quick summary drawers, and a **6-Part Engineering Case Study Thread Modal**.
  2. **About & Journey:** Engineering summary, one-click **CV (PDF)** download, 4 **Key Focus Areas**, and an **Education & Training Timeline** with clickable **Certificate PDFs**.
  3. **Tech Stack:** Categorized interactive technology badges that reveal real project experience notes on hover/tap.
  4. **Guestbook / DM:** Real-time public guestbook wall with mood emojis + a Direct Message (`Hire Me`) form with an envelope flight animation.
- **Protected `/admin` Studio Console:** Password-protected (`ADMIN_SECRET`) console for reading/managing DMs, publishing new projects or developer notes, and moderating guestbook entries.

---

## 🏗️ Clean Architecture Structure

```text
portfolyo/
├── docs/                   # Project specs (project, skills, architecture, design-system, plan)
├── client/                 # Frontend (React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion)
│   ├── public/assets/      # Avatar, CV PDF, Certificates, and Project Screenshots
│   └── src/
│       ├── app/            # App root & ThemeProvider
│       ├── domain/         # Pure frontend domain types
│       ├── data/           # Static profile, education, focus areas & tech stack data
│       ├── services/       # Isolated HTTP API client & service modules
│       ├── hooks/          # Custom hooks (parallax, reduced motion, stream state)
│       ├── components/     # Atomic design system UI components
│       └── features/       # Feature modules (navbar, hero, profile, feed, about, stack, guestbook, admin)
└── server/                 # Backend & Data (Node.js + Express + TypeScript + Prisma + SQLite)
    ├── prisma/             # schema.prisma & idempotent seed.ts
    └── src/
        ├── config/         # Environment configuration
        ├── domain/         # Framework-free Entities, DomainErrors & Repository Interfaces
        ├── application/    # Isolated Use Cases (Public & Admin)
        ├── infrastructure/ # Prisma Client, Entity Mappers & Repository Implementations
        └── presentation/   # Express Controllers, Routes, Zod Validators & Middlewares
```

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install all dependencies (root, server, client)
npm run install:all

# 2. Push SQLite schema & seed initial projects/notes
npm --prefix server run db:push
npm --prefix server run db:seed

# 3. Start both Backend (http://localhost:4000) & Frontend (http://localhost:5173)
npm run dev
```
