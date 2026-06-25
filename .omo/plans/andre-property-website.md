# Andre Property - Personal Branding Website

## TL;DR

> **Quick Summary**: Membangun website personal branding one-page bilingual (ID+EN) untuk Andre Rahmat (Andre Property), seorang Digital Marketing & Social Media Specialist fokus property sales. Website menggabungkan personal brand showcase, portfolio display, dan lead generation (contact form + WhatsApp + booking survey).
>
> **Deliverables**:
> - Website Next.js + Tailwind one-page bilingual
> - 9 section: Hero, About, Experience, Skills, Portfolio, Testimoni (placeholder), Booking Survey, Contact, Blog (coming soon)
> - Form kontak + tombol WhatsApp + link Google Drive portfolio & CV
> - Deploy ke Vercel
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Scaffolding → Design System + Content Data → UI Sections (paralel) → Integration + Forms → Final QA

---

## Context

### Original Request
User (Andre Rahmat) ingin dibuatkan website personal branding sebagai Digital Marketing & Social Media Specialist yang fokus pada property sales. Materi lengkap diberikan: profile, pengalaman kerja, skills (hard/soft/tools), portfolio (TikTok perf, Meta Ads, KPI Report), social links, dan kontak.

### Interview Summary
**Key Discussions**:
- **Tujuan**: Kombinasi personal brand + portfolio showcase + lead gen klien properti
- **Tech Stack**: Next.js + Tailwind CSS
- **Design**: Professional & Property-Feel (elegant, trust-building, neutral + gold/blue accents)
- **Struktur**: Single page dengan smooth scroll
- **Bahasa**: Bilingual ID+EN dengan toggle
- **Portfolio**: Deskripsi + sample image + link ke Google Drive
- **Contact**: Form + WhatsApp button (placeholder) + email
- **Testimoni**: Placeholder dulu
- **Property**: Form booking survey saja (bukan listing penuh)
- **CV**: Link ke Google Drive
- **Blog**: Coming Soon page
- **Deploy**: Vercel free + subdomain
- **Testing**: QA otomatis Playwright saja, tanpa unit tests

**Research Findings**:
- Project greenfield (workspace kosong, bukan git repo)
- Tidak ada SDD framework
- Tidak ada test infrastructure (Playwright untuk QA only)

### Metis Review
**Identified Gaps** (addressed):
- **Placeholder data strategy**: WA number, testimoni, blog — semua pakai placeholder yang mudah diupdate. File `src/config/site.ts` terpusat untuk semua data.
- **Bilingual implementation**: Gunakan `next-intl` atau i18n sederhana dengan context, bukan duplicate pages.
- **Form backend**: Tanpa backend, form akan menggunakan mailto atau service gratis (Formspree/Web3Forms). Ditentukan: Web3Forms (gratis, no backend).
- **SEO**: Next.js Metadata API untuk SEO + Open Graph. Harus ada di plan.
- **Responsive**: Mobile-first wajib (user property sering diakses via HP).
- **Accessibility**: Semua tombol punya aria-label, gambar alt text, form label.
- **Performance**: Optimasi gambar (next/image), font display swap, lazy load sections.
- **Analytics**: Bisa opsional add Google Analytics / Vercel Analytics (di task final).

---

## Work Objectives

### Core Objective
Membangun website personal branding one-page bilingual untuk Andre Rahmat yang menampilkan profil digital marketer property, portfolio, dan mengkonversi visitor menjadi lead via form/WhatsApp/booking.

### Concrete Deliverables
- Repository Next.js 14+ dengan App Router + Tailwind CSS
- 9 section dalam satu halaman dengan smooth scroll navigation
- Bilingual toggle ID/EN dengan i18n context
- File konfigurasi terpusat (`src/config/site.ts`) untuk semua konten & placeholder
- Form kontak (Web3Forms) + tombol WhatsApp + link email
- Form booking survey properti
- Portfolio section dengan 3 kategori (TikTok, Meta Ads, KPI) + link Google Drive
- Testimoni section dengan placeholder
- Blog Coming Soon page
- Download CV link ke Google Drive
- Social links (Instagram, TikTok)
- SEO metadata + Open Graph + favicon
- Deploy ke Vercel

### Definition of Done
- [ ] Website build sukses (`npm run build` exit 0)
- [ ] Semua section tampil dengan konten (ID + EN)
- [ ] Form kontak mengirim email via Web3Forms
- [ ] Tombol WhatsApp membuka wa.me link
- [ ] Toggle bahasa berfungsi (ID ↔ EN)
- [ ] Responsive di mobile, tablet, desktop
- [ ] Deploy ke Vercel sukses & URL accessible
- [ ] Lighthouse score ≥ 80 (performance, accessibility, SEO)

### Must Have
- One-page website bilingual ID+EN
- Semua section: Hero, About, Experience, Skills, Portfolio, Testimoni, Booking, Contact, Blog coming soon
- Smooth scroll navigation
- Form kontak functional (Web3Forms)
- WhatsApp button
- Responsive mobile-first
- SEO metadata + Open Graph
- File konfigurasi terpusat untuk konten
- Deploy ke Vercel

### Must NOT Have (Guardrails)
- Tidak beli custom domain (subdomain Vercel saja)
- Tidak buat real property listing (cukup form booking)
- Tidak isi testimoni asli (placeholder saja)
- Tidak buat artikel blog (Coming Soon page saja)
- Tidak generate CV PDF (link ke Drive saja)
- Tidak integrasi nomor WA asli (placeholder, mudah diupdate)
- Tidak tulis unit tests (QA via Playwright only)
- Tidak over-engineer (hindari AI slop: excessive comments, over-abstraction, generic names)
- Tidak gunakan animasi berat yang impact performance
- Tidak duplicate pages untuk bilingual (pakai i18n context)
- Tidak hardcode konten di komponen (semua lewat config/translation files)

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (project baru)
- **Automated tests**: NO (skip unit tests)
- **Framework**: Playwright untuk QA only
- **Approach**: QA otomatis per task via Playwright (buka browser, cek DOM, interaksi, screenshot)

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.omo/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright - Navigate, interact, assert DOM, screenshot
- **Forms**: Playwright fill form, submit, verify success/error state
- **Responsive**: Playwright with different viewport sizes
- **Build**: Bash `npm run build` exit code check
- **Deploy**: Verify Vercel URL accessible via curl

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately - foundation):
├── Task 1: Project scaffolding Next.js + Tailwind + deps [quick]
├── Task 2: Design system tokens (colors, fonts, spacing) [quick]
├── Task 3: Site config + content data structure [quick]
└── Task 4: i18n context + translation files (ID+EN) [quick]

Wave 2a (After Wave 1 - layout shell, gate for sections):
└── Task 5: Layout shell + Navbar + smooth scroll + language toggle [visual-engineering]

Wave 2b (After Wave 2a - core UI sections, MAX PARALLEL 8):
├── Task 6: Hero section [visual-engineering]
├── Task 7: About + Experience sections [visual-engineering]
├── Task 8: Skills + Tools sections [visual-engineering]
├── Task 9: Portfolio section (3 categories + Drive link) [visual-engineering]
├── Task 10: Testimoni section (placeholder) + Blog Coming Soon [visual-engineering]
├── Task 11: Contact section (form Web3Forms + WA + email) [unspecified-high]
├── Task 12: Booking Survey form section [unspecified-high]
└── Task 13: Footer + social links + CV download [quick]

Wave 3 (After Wave 2 - integration + polish + deploy):
├── Task 14: SEO metadata + Open Graph + favicon + sitemap [quick]
├── Task 15: Responsive polish + accessibility audit [visual-engineering]
├── Task 16: Performance optimization (images, fonts, lazy load) [unspecified-high]
└── Task 17: Deploy to Vercel + verify [quick]

Wave FINAL (After ALL tasks — 4 parallel reviews):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA via Playwright (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 4 → Task 5 → Task 11 → Task 14 → Task 17 → F1-F4
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 8 (Wave 2b)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | - | 2,3,4,5 |
| 2 | 1 | 5,6,7,8,9,10 |
| 3 | 1 | 4,5,6,7,8,9,10,11,12,13 |
| 4 | 1,3 | 5,6,7,8,9,10,11,12,13 |
| 5 | 2,3,4 | 14,15,16 |
| 6 | 2,3,4,5 | 14,15 |
| 7 | 2,3,4,5 | 14,15 |
| 8 | 2,3,4,5 | 14,15 |
| 9 | 2,3,4,5 | 14,15 |
| 10 | 2,3,4,5 | 14,15 |
| 11 | 2,3,4,5 | 14,15 |
| 12 | 2,3,4,5 | 14,15 |
| 13 | 2,3,4,5 | 14,15 |
| 14 | 5,6,7,8,9,10,11,12,13 | 17 |
| 15 | all UI tasks | 17 |
| 16 | all UI tasks | 17 |
| 17 | 14,15,16 | F1-F4 |

### Agent Dispatch Summary

- **Wave 1**: 4 tasks - T1-T4 → `quick`
- **Wave 2a**: 1 task - T5 → `visual-engineering` (gate for Wave 2b)
- **Wave 2b**: 8 tasks - T6-T10,T13 → `visual-engineering`, T11-T12 → `unspecified-high`
- **Wave 3**: 4 tasks - T14,T17 → `quick`, T15 → `visual-engineering`, T16 → `unspecified-high`
- **FINAL**: 4 tasks - F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high` (+playwright), F4 → `deep`

---

## TODOs

- [x] 1. Project Scaffolding Next.js + Tailwind + Dependencies

  **What to do**:
  - Inisialisasi project Next.js 14+ dengan App Router, TypeScript, Tailwind CSS di workspace root
  - Install dependencies: `next-intl` (atau setup i18n context manual), `react-icons`, `framer-motion` (untuk smooth scroll & animasi halus), `@next/mdx` (optional untuk blog future)
  - Setup struktur folder: `src/app/`, `src/components/sections/`, `src/components/ui/`, `src/config/`, `src/i18n/`, `src/lib/`
  - Setup Tailwind config dengan path content yang benar
  - Buat `.env.local.example` dengan placeholder untuk Web3Forms access key
  - Verify `npm run dev` dan `npm run build` sukses

  **Must NOT do**:
  - Jangan install library yang tidak dipakai
  - Jangan setup custom domain
  - Jangan buat komponen UI dulu (hanya scaffolding)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Task setup standar yang well-documented

  **Parallelization**:
  - **Can Run In Parallel**: NO (foundation untuk semua task lain)
  - **Parallel Group**: Wave 1 (solo start, others wait)
  - **Blocks**: 2, 3, 4, 5
  - **Blocked By**: None

  **References**:
  - Next.js App Router docs: https://nextjs.org/docs/app
  - Tailwind CSS setup with Next.js: https://tailwindcss.com/docs/guides/nextjs
  - next-intl: https://next-intl-docs.vercel.app/

  **Acceptance Criteria**:
  - [ ] `package.json` exists with Next.js 14+, React 18+, Tailwind, TypeScript
  - [ ] `npm run build` exit 0
  - [ ] `npm run dev` starts server on localhost:3000
  - [ ] Folder structure: `src/app/`, `src/components/sections/`, `src/components/ui/`, `src/config/`, `src/i18n/`, `src/lib/`
  - [ ] `.env.local.example` exists with Web3Forms key placeholder

  **QA Scenarios**:
  ```
  Scenario: Build sukses setelah scaffolding
    Tool: Bash
    Preconditions: Project files created
    Steps:
      1. Run `npm run build`
      2. Check exit code
    Expected Result: Exit code 0, no error output
    Failure Indicators: Exit code non-zero, TypeScript errors, missing deps
    Evidence: .omo/evidence/task-1-build-success.txt

  Scenario: Dev server starts
    Tool: Bash
    Preconditions: Build sukses
    Steps:
      1. Run `npm run dev` (background)
      2. Wait 5 seconds
      3. curl -s http://localhost:3000
      4. Check HTTP status
    Expected Result: HTTP 200, HTML response
    Failure Indicators: Connection refused, HTTP 500
    Evidence: .omo/evidence/task-1-dev-server.txt
  ```

  **Commit**: YES
  - Message: `chore(scaffold): init next.js + tailwind + deps`
  - Files: all scaffolding files
  - Pre-commit: `npm run build`

- [x] 2. Design System Tokens (Colors, Fonts, Spacing)

  **What to do**:
  - Definisikan design tokens di `tailwind.config.ts`:
    - Color palette: neutral base (warm white, charcoal), gold accent (#C9A961 atau similar), blue accent (#1E3A5F untuk trust), success/error/warning
    - Typography: heading font (e.g., Playfair Display atau Plus Jakarta Sans), body font (Inter)
    - Spacing scale, border radius, shadows
  - Setup `src/app/globals.css` dengan CSS variables untuk tokens
  - Konfigurasi next/font untuk load Google Fonts dengan display swap
  - Buat utility classes untuk patterns umum (container, section padding, gradient text)
  - Pastikan kontras WCAG AA compliant

  **Must NOT do**:
  - Jangan hardcode warna di komponen (selalu pakai tokens)
  - Jangan overload animasi
  - Jangan pakai >3 font families

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Design system setup adalah task config yang straightforward

  **Parallelization**:
  - **Can Run In Parallel**: YES (dengan Task 3, 4 setelah Task 1)
  - **Parallel Group**: Wave 1
  - **Blocks**: 5,6,7,8,9,10
  - **Blocked By**: 1

  **References**:
  - Tailwind theme config: https://tailwindcss.com/docs/theme
  - next/font: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
  - Color palette inspiration: elegant property websites (neutral + gold)

  **Acceptance Criteria**:
  - [ ] `tailwind.config.ts` punya custom colors: primary (blue), accent (gold), neutral, success, error, warning
  - [ ] `src/app/globals.css` punya CSS variables untuk semua tokens
  - [ ] next/font configured untuk heading + body font
  - [ ] Utility classes `.container-custom`, `.section-padding` tersedia
  - [ ] Build sukses

  **QA Scenarios**:
  ```
  Scenario: Design tokens ter-render di CSS
    Tool: Bash (curl) + grep
    Preconditions: Dev server running
    Steps:
      1. curl http://localhost:3000
      2. Grep CSS output untuk custom color variable (--color-primary atau --accent-gold)
      3. Grep untuk font-family declaration
    Expected Result: Custom CSS variables ditemukan, font family ter-load
    Failure Indicators: Variables tidak ada, font fallback ke sans-serif
    Evidence: .omo/evidence/task-2-design-tokens.txt

  Scenario: Build dengan custom theme
    Tool: Bash
    Steps:
      1. Run `npm run build`
    Expected Result: Exit 0, no Tailwind config errors
    Evidence: .omo/evidence/task-2-build.txt
  ```

  **Commit**: YES (group dengan Wave 1)
  - Message: `style(design): setup design tokens + fonts`
  - Files: tailwind.config.ts, globals.css, layout.tsx (font setup)

- [x] 3. Site Config + Content Data Structure

  **What to do**:
  - Buat `src/config/site.ts` berisi SEMUA konten website (data-driven, bukan hardcode di komponen):
    - profile: name, title, tagline, about, location, email
    - social: instagram, tikTok, googleDrive (portfolio), cvDrive
    - whatsapp: placeholder number `6281234567890` dengan komentar "UPDATE THIS"
    - experiences: array of {role, company, period, description, achievements[]}
    - skills: {hard[], tools[], soft[]}
    - portfolio: array of {id, title, description, category, driveLink, sampleImage}
    - testimoni: array placeholder (3-4 entries dengan placeholder text)
    - bookingForm: fields config
  - Type definitions di `src/types/index.ts` untuk semua data structures
  - Pastikan semua konten dari user materials masuk ke config
  - Komentari placeholder dengan `// TODO: UPDATE WITH REAL VALUE`

  **Must NOT do**:
  - Jangan hardcode konten di komponen
  - Jangan buat file terpisah untuk setiap data (satukan di site.ts kecuali terlalu besar)
  - Jangan masukkan teks bahasa di sini (itu di translation files Task 4)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Data structure & content entry task

  **Parallelization**:
  - **Can Run In Parallel**: YES (dengan Task 2, 4)
  - **Parallel Group**: Wave 1
  - **Blocks**: 4,5,6,7,8,9,10,11,12,13
  - **Blocked By**: 1

  **References**:
  - User materials di draft: `.omo/drafts/andre-property-website.md`
  - All profile, experience, skills, tools, portfolio data dari user

  **Acceptance Criteria**:
  - [ ] `src/config/site.ts` exists dengan semua data dari user materials
  - [ ] `src/types/index.ts` exists dengan TypeScript types
  - [ ] WhatsApp number pakai placeholder `6281234567890` dengan TODO comment
  - [ ] Testimoni punya 3 placeholder entries
  - [ ] Portfolio punya 3 entries (TikTok, Meta Ads, KPI)
  - [ ] TypeScript: `npx tsc --noEmit` exit 0

  **QA Scenarios**:
  ```
  Scenario: Config file valid & lengkap
    Tool: Bash (node)
    Preconditions: site.ts created
    Steps:
      1. Run `npx tsc --noEmit`
      2. Check exit code
      3. Grep site.ts for key fields: profile.name, experiences, skills, portfolio, whatsapp
    Expected Result: tsc exit 0, semua field ada
    Failure Indicators: TypeScript errors, missing fields
    Evidence: .omo/evidence/task-3-config-check.txt

  Scenario: Placeholder ter-mark dengan TODO
    Tool: Bash (grep)
    Steps:
      1. grep -n "TODO" src/config/site.ts
    Expected Result: Minimal 2 TODO comments (WA number, testimoni)
    Evidence: .omo/evidence/task-3-todo-markers.txt
  ```

  **Commit**: YES (group Wave 1)
  - Message: `feat(config): add site config + content data`
  - Files: src/config/site.ts, src/types/index.ts

- [x] 4. i18n Context + Translation Files (ID + EN)

  **What to do**:
  - Setup i18n context sederhana (React Context, bukan next-intl route-based untuk simplicity one-page):
    - `src/i18n/I18nProvider.tsx` - context dengan state locale (id|en), toggle function
    - `src/i18n/translations.ts` - object dengan semua UI strings dalam ID & EN
    - `src/i18n/useI18n.ts` - hook untuk akses t() function & locale
  - Aturan: SEMUA teks UI (button labels, section titles, nav items, form labels, placeholders) lewat translation files
  - Konten data (experiences, skills) tetap di site.ts, tapi label/heading section di translations
  - Default locale: `id` (Bahasa Indonesia)
  - Persist locale choice di localStorage
  - Sertakan key untuk: nav, hero, about, experience, skills, portfolio, testimoni, booking, contact, blog, footer, formLabels, formErrors, buttons

  **Must NOT do**:
  - Jangan duplicate halaman untuk ID/EN
  - Jangan hardcode teks UI di komponen
  - Jangan pakai next-intl route-based (overkill untuk one-page)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Pattern i18n context standar React

  **Parallelization**:
  - **Can Run In Parallel**: YES (dengan Task 2, 3)
  - **Parallel Group**: Wave 1
  - **Blocks**: 5,6,7,8,9,10,11,12,13
  - **Blocked By**: 1, 3

  **References**:
  - React Context i18n pattern: standard React docs
  - Translation keys: harus cover semua section di plan

  **Acceptance Criteria**:
  - [ ] `src/i18n/I18nProvider.tsx` exists dengan locale state + toggle
  - [ ] `src/i18n/translations.ts` punya `id` dan `en` objects dengan key lengkap
  - [ ] `src/i18n/useI18n.ts` exports `useI18n()` hook dengan `t(key)` dan `locale`
  - [ ] Default locale `id`, localStorage persistence
  - [ ] `npx tsc --noEmit` exit 0

  **QA Scenarios**:
  ```
  Scenario: Translation keys lengkap ID & EN
    Tool: Bash (node script)
    Preconditions: translations.ts created
    Steps:
      1. Run node script yang import translations & compare keys ID vs EN
    Expected Result: Semua keys di `id` punya pasangan di `en`, no missing keys
    Failure Indicators: Keys mismatch, missing translations
    Evidence: .omo/evidence/task-4-translations-check.txt

  Scenario: Build dengan i18n
    Tool: Bash
    Steps:
      1. npm run build
    Expected Result: Exit 0
    Evidence: .omo/evidence/task-4-build.txt
  ```

  **Commit**: YES (group Wave 1)
  - Message: `feat(i18n): add bilingual context + translations`
  - Files: src/i18n/*

---

- [x] 5. Layout Shell + Navbar + Smooth Scroll + Language Toggle

  **What to do**:
  - Buat `src/app/layout.tsx` root layout dengan:
    - I18nProvider wrapper
    - Font loading (dari Task 2)
    - Metadata dasar (akan dilengkapi Task 14)
  - Buat `src/app/page.tsx` yang render semua section (akan diisi task lain)
  - Buat `src/components/layout/Navbar.tsx`:
    - Logo/name kiri
    - Nav links tengah (Home, About, Experience, Skills, Portfolio, Booking, Contact) dengan smooth scroll (CSS scroll-behavior: smooth + anchor links)
    - Language toggle (ID/EN) kanan
    - Mobile: hamburger menu dengan slide-in drawer
    - Sticky dengan backdrop blur saat scroll
  - Buat `src/components/layout/SmoothScroll.tsx` atau pakai CSS `scroll-behavior: smooth` + `scroll-margin-top` untuk section anchors
  - Pastikan anchor links navigate ke section ID yang benar

  **Must NOT do**:
  - Jangan pakai JS heavy scroll library (CSS smooth scroll cukup)
  - Jangan hardcode nav labels (pakai translations)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - Reason: Layout & navigation adalah komponen UI kritis untuk UX

  **Parallelization**:
  - **Can Run In Parallel**: NO (setelah Wave 1, blocks semua section tasks - gate for Wave 2b)
  - **Parallel Group**: Wave 2a (solo gate)
  - **Blocks**: 6,7,8,9,10,11,12,13,14,15,16
  - **Blocked By**: 2,3,4

  **References**:
  - Next.js layout: https://nextjs.org/docs/app/api-reference/file-conventions/layout
  - CSS smooth scroll: `scroll-behavior: smooth` di html
  - Design tokens dari Task 2

  **Acceptance Criteria**:
  - [ ] Navbar sticky dengan backdrop blur saat scroll
  - [ ] Nav links smooth scroll ke section terkait
  - [ ] Language toggle mengubah teks (verify dengan label yang berubah)
  - [ ] Mobile hamburger menu berfungsi
  - [ ] `src/app/page.tsx` render layout shell

  **QA Scenarios**:
  ```
  Scenario: Navbar render & smooth scroll
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000
      2. Assert nav visible: selector `nav` atau `[data-testid="navbar"]`
      3. Click nav link "About" (atau link ke #about)
      4. Wait for scroll, assert URL contains #about atau section about in viewport
      5. Screenshot navbar
    Expected Result: Navbar visible, click triggers smooth scroll, section about terlihat
    Failure Indicators: Navbar not visible, click no scroll, 404
    Evidence: .omo/evidence/task-5-navbar-smoothscroll.png

  Scenario: Language toggle berfungsi
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000
      2. Click language toggle button (data-testid="lang-toggle")
      3. Assert nav label berubah (e.g., "Tentang" ↔ "About")
      4. Screenshot before/after
    Expected Result: Teks berubah saat toggle diklik
    Failure Indicators: Teks tidak berubah, button not found
    Evidence: .omo/evidence/task-5-lang-toggle-id.png, .omo/evidence/task-5-lang-toggle-en.png

  Scenario: Mobile hamburger menu
    Tool: Playwright
    Steps:
      1. Set viewport to 375x667 (mobile)
      2. Navigate to http://localhost:3000
      3. Assert hamburger visible (data-testid="hamburger")
      4. Click hamburger, assert mobile menu opens
      5. Click nav item, assert menu closes & scrolls
      6. Screenshot
    Expected Result: Hamburger toggles menu, menu items functional
    Evidence: .omo/evidence/task-5-mobile-menu.png
  ```

  **Commit**: YES (group Wave 2)
  - Message: `feat(layout): navbar + smooth scroll + lang toggle`
  - Files: src/app/layout.tsx, src/app/page.tsx, src/components/layout/*

- [x] 6. Hero Section

  > **DESIGN PIVOT (2026-06-25)**: User requested adding their personal photo as identity in Hero, centered with text above (LinkedIn-style). Also requested accent color change from gold #C9A961 → Sky Blue #5B9BD5/#4A90E2 (property sales feel). Accent palette swap DONE in globals.css. **Photo integration BLOCKED** — user said "image gambar saya" but no image file transmitted to workspace. Awaiting re-upload/paste or explicit file path (e.g. `public/profile.jpg`).
  >
  > - [~] Hero profile photo integration (BLOCKED: image not received from user)

  **What to do**:
  - Buat `src/components/sections/Hero.tsx`:
    - Full viewport height (min-h-screen)
    - Background: gradient elegant atau image subtle property-related (pakai next/image)
    - Heading besar: nama + title (dari site.config)
    - Tagline/catchphrase (translatable)
    - 2 CTA buttons: "Hubungi Saya" (scroll to #contact) + "Lihat Portfolio" (scroll to #portfolio)
    - Social links icon (Instagram, TikTok, WhatsApp)
    - Subtle animation (fade-in via framer-motion atau CSS)
  - Section ID: `#home` atau `#hero`

  **Must NOT do**:
  - Jangan pakai autoplay video berat
  - Jangan pakai stock image generik (jika pakai image, pilih yang relevant)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - Reason: Hero adalah first impression, perlu polish visual

  **Parallelization**:
  - **Can Run In Parallel**: YES (dengan Task 7-13, setelah Task 5)
  - **Parallel Group**: Wave 2b
  - **Blocks**: 14,15
  - **Blocked By**: 2,3,4,5

  **References**:
  - site.config profile data
  - Design tokens (colors, fonts)
  - framer-motion: https://www.framer.com/motion/

  **Acceptance Criteria**:
  - [ ] Hero full viewport, nama & title terlihat
  - [ ] 2 CTA buttons dengan smooth scroll ke section terkait
  - [ ] Social icons (IG, TikTok, WA) dengan link benar
  - [ ] Animasi subtle (fade-in), tidak berat
  - [ ] Responsive mobile/desktop

  **QA Scenarios**:
  ```
  Scenario: Hero render dengan CTA
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000
      2. Assert hero visible: section#hero
      3. Assert heading contains "Andre" (atau profile.name)
      4. Assert 2 buttons: "Hubungi Saya" & "Lihat Portfolio"
      5. Click "Lihat Portfolio", assert scroll to #portfolio
      6. Screenshot
    Expected Result: Hero visible, CTAs functional
    Evidence: .omo/evidence/task-6-hero.png

  Scenario: Social links benar
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000
      2. Find social link dengan href mengandung "instagram.com/andreproperty"
      3. Find link mengandung "tiktok.com/@andreproperty"
      4. Find link mengandung "wa.me"
    Expected Result: 3 social links dengan href benar
    Evidence: .omo/evidence/task-6-social-links.txt
  ```

  **Commit**: YES (group Wave 2)
  - Message: `feat(hero): hero section with CTAs + social`
  - Files: src/components/sections/Hero.tsx

- [x] 7. About + Experience Sections

  **What to do**:
  - Buat `src/components/sections/About.tsx`:
    - Section ID `#about`
    - Heading "Tentang Saya" / "About Me" (translatable)
    - About text dari site.config (paragraf dari user materials)
    - Optional: foto profil placeholder atau inisial avatar
    - Info cards: Lokasi, Email, Pendidikan (S1 Manajemen)
  - Buat `src/components/sections/Experience.tsx`:
    - Section ID `#experience`
    - Heading "Pengalaman" / "Experience"
    - Timeline vertical: pengalaman relevan (2) + pengalaman lain (1)
    - Setiap entry: role, company, period, description, achievements (bullet list)
    - Data dari site.config.experiences
    - Visual: timeline line dengan dot per entry

  **Must NOT do**:
  - Jangan hardcode data (pakai site.config)
  - Jangan buat timeline terlalu kompleks

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - Reason: Section content-driven dengan visual polish

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2b
  - **Blocks**: 14,15
  - **Blocked By**: 2,3,4,5

  **References**:
  - site.config: profile.about, experiences[]
  - Translation keys: about.title, experience.title

  **Acceptance Criteria**:
  - [ ] About section render dengan teks dari config
  - [ ] Info cards (lokasi, email, pendidikan) tampil
  - [ ] Experience timeline 3 entries (2 relevan + 1 lain)
  - [ ] Setiap entry tampil: role, company, period, description, achievements
  - [ ] Responsive

  **QA Scenarios**:
  ```
  Scenario: About section konten lengkap
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000#about
      2. Assert section#about visible
      3. Assert text contains "Digital Marketing" (dari about text)
      4. Assert info cards: lokasi "Kendal", email, "S1 Manajemen"
      5. Screenshot
    Expected Result: About section dengan konten lengkap
    Evidence: .omo/evidence/task-7-about.png

  Scenario: Experience timeline 3 entries
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000#experience
      2. Assert section#experience visible
      3. Assert 3 experience entries (data-testid="experience-item")
      4. Assert entry 1 contains "Andre Property" dan "Freelance"
      5. Assert entry 2 contains "PT Permata Sentul"
      6. Assert entry 3 contains "Tanatap Coffee"
      7. Screenshot
    Expected Result: 3 entries dengan data benar
    Evidence: .omo/evidence/task-7-experience.png
  ```

  **Commit**: YES (group Wave 2)
  - Message: `feat(sections): about + experience timeline`
  - Files: src/components/sections/About.tsx, src/components/sections/Experience.tsx

- [x] 8. Skills + Tools Sections

  **What to do**:
  - Buat `src/components/sections/Skills.tsx`:
    - Section ID `#skills`
    - Heading "Skills" / "Keahlian"
    - 3 kategori cards: Hard Skills, Soft Skills, Tools & Software
    - Hard Skills: Social Media Management, Content Strategy, Copywriting, Digital Marketing, Paid Advertising, Sales & Lead Gen, Customer Engagement
    - Soft Skills: Communication, Creative Thinking, Problem Solving, Time Management, Adaptability, Teamwork, Result-Oriented
    - Tools: Canva, CapCut, Meta Business Suite, Google Sheets, WhatsApp Business
    - Visual: chip/badge style untuk setiap skill, atau card per kategori
    - Data dari site.config.skills
  - Bisa combine jadi 1 section atau 2 sub-section

  **Must NOT do**:
  - Jangan pakai progress bar (subjective, tidak ada data)
  - Jangan hardcode skill list

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - Reason: Visual presentation skills

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2b
  - **Blocks**: 14,15
  - **Blocked By**: 2,3,4,5

  **References**:
  - site.config.skills {hard[], soft[], tools[]}

  **Acceptance Criteria**:
  - [ ] Skills section render 3 kategori
  - [ ] Hard skills 7 items
  - [ ] Soft skills 7 items
  - [ ] Tools 5 items
  - [ ] Responsive grid

  **QA Scenarios**:
  ```
  Scenario: Skills section lengkap
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000#skills
      2. Assert section#skills visible
      3. Assert 3 kategori cards (data-testid="skill-category")
      4. Count hard skills badges: expect 7
      5. Count soft skills: expect 7
      6. Count tools: expect 5
      7. Assert "Canva" dan "CapCut" ada di tools
      8. Screenshot
    Expected Result: 3 kategori dengan jumlah items benar
    Evidence: .omo/evidence/task-8-skills.png
  ```

  **Commit**: YES (group Wave 2)
  - Message: `feat(skills): skills + tools section`
  - Files: src/components/sections/Skills.tsx

- [x] 9. Portfolio Section (3 Categories + Drive Link)

  **What to do**:
  - Buat `src/components/sections/Portfolio.tsx`:
    - Section ID `#portfolio`
    - Heading "Portfolio" / "Portofolio"
    - 3 portfolio cards (dari site.config.portfolio):
      1. TikTok Content Performance - deskripsi + sample image placeholder + "Lihat Detail" link ke Drive
      2. Meta Ads Campaign Performance - deskripsi + sample + Drive link
      3. KPI Performance Report - deskripsi + sample + Drive link
    - Setiap card: title, category badge, description, sample image (placeholder atau dari Drive), button "Lihat di Google Drive"
    - Link ke: https://drive.google.com/drive/folders/127yBTp1emL7RhjAt-NETW3G9CPs8OnJa
    - Visual: card grid dengan hover effect
  - Sample image: gunakan placeholder gradient atau screenshot jika tersedia, dengan TODO comment untuk replace real

  **Must NOT do**:
  - Jangan embed Google Drive iframe (sering broken)
  - Jangan hardcode portfolio data

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - Reason: Portfolio showcase visual

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2b
  - **Blocks**: 14,15
  - **Blocked By**: 2,3,4,5

  **References**:
  - site.config.portfolio[]
  - Drive URL: https://drive.google.com/drive/folders/127yBTp1emL7RhjAt-NETW3G9CPs8OnJa

  **Acceptance Criteria**:
  - [ ] Portfolio section render 3 cards
  - [ ] Setiap card punya title, category, description, sample image, Drive link button
  - [ ] Drive link button href benar (mengandung folder ID)
  - [ ] Hover effect pada cards
  - [ ] Responsive

  **QA Scenarios**:
  ```
  Scenario: Portfolio 3 cards dengan Drive links
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000#portfolio
      2. Assert section#portfolio visible
      3. Assert 3 portfolio cards (data-testid="portfolio-card")
      4. Assert card 1 contains "TikTok"
      5. Assert card 2 contains "Meta Ads"
      6. Assert card 3 contains "KPI"
      7. For each card, assert link href contains "drive.google.com"
      8. Screenshot
    Expected Result: 3 cards dengan Drive links benar
    Evidence: .omo/evidence/task-9-portfolio.png

  Scenario: Drive link opens correct URL
    Tool: Playwright
    Steps:
      1. Get href dari portfolio card button
      2. Assert href contains "127yBTp1emL7RhjAt-NETW3G9CPs8OnJa"
    Expected Result: All 3 links contain correct Drive folder ID
    Evidence: .omo/evidence/task-9-drive-links.txt
  ```

  **Commit**: YES (group Wave 2)
  - Message: `feat(portfolio): portfolio section with 3 cards + drive links`
  - Files: src/components/sections/Portfolio.tsx

---

- [x] 10. Testimoni Section (Placeholder) + Blog Coming Soon

  **What to do**:
  - Buat `src/components/sections/Testimoni.tsx`:
    - Section ID `#testimoni`
    - Heading "Testimoni" / "Testimonials"
    - 3 testimoni placeholder cards dari site.config.testimoni (text placeholder seperti "Testimoni dari klien akan ditampilkan di sini" + nama placeholder + role placeholder)
    - Visual: card dengan quote icon, avatar inisial, nama, role
    - Tambahkan note kecil "Testimoni akan diperbarui segera" (translatable)
  - Buat `src/components/sections/Blog.tsx` (Coming Soon):
    - Section ID `#blog`
    - Heading "Blog" / "Artikel"
    - Coming Soon message: "Artikel tips property & digital marketing coming soon"
    - Optional: email signup form untuk notify saat blog live (atau skip, just message)
    - Visual: centered, illustration/icon

  **Must NOT do**:
  - Jangan buat artikel nyata
  - Jangan hardcode testimoni (pakai config placeholder)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - Reason: Visual section dengan placeholder content

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2b
  - **Blocks**: 14,15
  - **Blocked By**: 2,3,4,5

  **References**:
  - site.config.testimoni[]
  - Translation keys: testimoni.*, blog.*

  **Acceptance Criteria**:
  - [ ] Testimoni section render 3 placeholder cards
  - [ ] Setiap card ada quote, nama placeholder, role placeholder
  - [ ] Note "akan diperbarui" tampil
  - [ ] Blog section render Coming Soon message
  - [ ] Responsive

  **QA Scenarios**:
  ```
  Scenario: Testimoni placeholder section
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000#testimoni
      2. Assert section#testimoni visible
      3. Assert 3 testimoni cards (data-testid="testimoni-card")
      4. Assert "akan diperbarui" atau "coming" text ada
      5. Screenshot
    Expected Result: 3 placeholder cards dengan note
    Evidence: .omo/evidence/task-10-testimoni.png

  Scenario: Blog Coming Soon
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000#blog
      2. Assert section#blog visible
      3. Assert "coming soon" atau "segera" text ada
      4. Screenshot
    Expected Result: Coming Soon message displayed
    Evidence: .omo/evidence/task-10-blog-coming-soon.png
  ```

  **Commit**: YES (group Wave 2)
  - Message: `feat(sections): testimoni placeholder + blog coming soon`
  - Files: src/components/sections/Testimoni.tsx, src/components/sections/Blog.tsx

- [x] 11. Contact Section (Form Web3Forms + WhatsApp + Email)

  **What to do**:
  - Buat `src/components/sections/Contact.tsx`:
    - Section ID `#contact`
    - Heading "Kontak" / "Contact"
    - Contact form dengan fields:
      - Nama (text, required)
      - Email (email, required)
      - Nomor WhatsApp (tel, optional)
      - Pesan (textarea, required)
    - Form submit via Web3Forms (https://web3forms.com/) - gratis, no backend
      - Action: POST to https://api.web3forms.com/submit
      - Hidden input: access_key dari env (NEXT_PUBLIC_WEB3FORMS_KEY atau hardcode placeholder dengan TODO)
      - On success: show success message (translatable)
      - On error: show error message (translatable)
    - WhatsApp button: link ke `https://wa.me/{site.config.whatsapp}` dengan pesan default
    - Email link: `mailto:andrerahmat1212@gmail.com`
    - Form validation: required fields, email format
  - Buat helper `src/lib/formSubmit.ts` untuk handle form submission logic

  **Must NOT do**:
  - Jangan buat backend API route (Web3Forms handle itu)
  - Jangan hardcode access key (pakai env var dengan placeholder + TODO)
  - Jangan pakai WA number asli (placeholder dari config)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`frontend-ui-ux`]
  - Reason: Form dengan integrasi third-party service

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2b
  - **Blocks**: 14,15
  - **Blocked By**: 2,3,4,5

  **References**:
  - Web3Forms docs: https://docs.web3forms.com/
  - site.config: whatsapp, email
  - Translation keys: contact.*, formLabels.*, formErrors.*, buttons.*

  **Acceptance Criteria**:
  - [ ] Contact form render dengan 4 fields
  - [ ] Required validation berfungsi (HTML5 + JS)
  - [ ] Email format validation
  - [ ] Form submit ke Web3Forms endpoint
  - [ ] Success message tampil setelah submit
  - [ ] Error message tampil jika gagal
  - [ ] WhatsApp button link benar (wa.me/6281234567890)
  - [ ] Email link mailto benar
  - [ ] `.env.local` updated dengan Web3Forms key placeholder

  **QA Scenarios**:
  ```
  Scenario: Contact form validation
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000#contact
      2. Assert section#contact visible
      3. Click submit button tanpa isi form
      4. Assert validation messages muncul (HTML5 required)
      5. Isi email dengan "invalid-email"
      6. Assert email validation error
      7. Screenshot
    Expected Result: Validation mencegah submit kosong & email invalid
    Evidence: .omo/evidence/task-11-form-validation.png

  Scenario: Form submit success (mock Web3Forms)
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000#contact
      2. Isi nama: "Test User"
      3. Isi email: "test@example.com"
      4. Isi WA: "081234567890"
      5. Isi pesan: "Test message dari QA"
      6. Click submit
      7. Wait for success message (data-testid="form-success") timeout 10s
      8. Screenshot
    Expected Result: Success message displayed (jika Web3Forms key valid) atau graceful error (jika placeholder)
    Failure Indicators: Form stuck loading, no feedback
    Evidence: .omo/evidence/task-11-form-submit.png

  Scenario: WhatsApp & email links
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000#contact
      2. Find WA link, assert href contains "wa.me/6281234567890"
      3. Find email link, assert href contains "mailto:andrerahmat1212@gmail.com"
    Expected Result: Links benar
    Evidence: .omo/evidence/task-11-contact-links.txt

  Scenario: Form error handling (negative)
    Tool: Playwright
    Preconditions: Web3Forms key invalid/placeholder
    Steps:
      1. Fill form valid
      2. Submit
      3. Assert error message displayed (data-testid="form-error")
    Expected Result: Error message shown gracefully
    Evidence: .omo/evidence/task-11-form-error.png
  ```

  **Commit**: YES (group Wave 2)
  - Message: `feat(contact): contact form + whatsapp + email`
  - Files: src/components/sections/Contact.tsx, src/lib/formSubmit.ts

- [x] 12. Booking Survey Form Section

  **What to do**:
  - Buat `src/components/sections/Booking.tsx`:
    - Section ID `#booking`
    - Heading "Booking Survey Properti" / "Book Property Survey"
    - Form fields:
      - Nama (required)
      - WhatsApp (required)
      - Email (optional)
      - Tipe properti interested (select: Rumah Subsidi, Rumah Komersial, Lainnya)
      - Lokasi preferensi (text)
      - Tanggal preferensi survey (date)
      - Catatan (textarea)
    - Submit via Web3Forms (sama dengan contact, different subject)
    - Success/error messages translatable
    - Visual: form 2 kolom di desktop, 1 kolom mobile
  - Helper: reuse `src/lib/formSubmit.ts`

  **Must NOT do**:
  - Jangan buat backend
  - Jangan buat calendar picker kompleks (input date HTML5 cukup)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`frontend-ui-ux`]
  - Reason: Form dengan multiple fields & validation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2b
  - **Blocks**: 14,15
  - **Blocked By**: 2,3,4,5

  **References**:
  - Web3Forms (same as Task 11)
  - Translation keys: booking.*, formLabels.*, formErrors.*

  **Acceptance Criteria**:
  - [ ] Booking form render dengan 7 fields
  - [ ] Required validation (nama, WA)
  - [ ] Select tipe properti dengan 3 options
  - [ ] Date picker
  - [ ] Form submit ke Web3Forms
  - [ ] Success/error messages
  - [ ] Responsive 2-col/1-col

  **QA Scenarios**:
  ```
  Scenario: Booking form fields lengkap
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000#booking
      2. Assert section#booking visible
      3. Assert input name="nama" exists
      4. Assert input name="whatsapp" exists
      5. Assert select name="tipe_properti" with 3 options
      6. Assert input type="date" exists
      7. Screenshot
    Expected Result: All 7 fields present
    Evidence: .omo/evidence/task-12-booking-form.png

  Scenario: Booking form validation & submit
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000#booking
      2. Click submit tanpa isi
      3. Assert validation errors
      4. Isi: nama "Test", WA "08123", tipe "Rumah Subsidi", date "2026-07-01"
      5. Submit
      6. Wait for feedback (success/error) timeout 10s
    Expected Result: Validation works, form gives feedback after submit
    Evidence: .omo/evidence/task-12-booking-submit.png
  ```

  **Commit**: YES (group Wave 2)
  - Message: `feat(booking): property survey booking form`
  - Files: src/components/sections/Booking.tsx

- [x] 13. Footer + Social Links + CV Download

  **What to do**:
  - Buat `src/components/layout/Footer.tsx`:
    - Logo/name + tagline singkat
    - Quick links (nav items, same as navbar)
    - Social icons: Instagram, TikTok (link dari config)
    - "Download CV" button: link ke Google Drive CV (https://drive.google.com/drive/folders/127yBTp1emL7RhjAt-NETW3G9CPs8OnJa - same folder atau specific CV link)
    - Contact info singkat: email, lokasi
    - Copyright: "© 2026 Andre Property. All rights reserved."
    - Back to top button
  - Register Footer di layout/page

  **Must NOT do**:
  - Jangan hardcode social links (pakai config)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Komponen sederhana

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2b
  - **Blocks**: 14,15
  - **Blocked By**: 2,3,4,5

  **References**:
  - site.config: social, email, location
  - Drive URL for CV

  **Acceptance Criteria**:
  - [ ] Footer render dengan nama, tagline, quick links
  - [ ] Social icons link benar (IG, TikTok)
  - [ ] Download CV button link ke Drive
  - [ ] Contact info tampil
  - [ ] Copyright text
  - [ ] Back to top button berfungsi
  - [ ] Responsive

  **QA Scenarios**:
  ```
  Scenario: Footer lengkap
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000
      2. Scroll to bottom
      3. Assert footer visible (data-testid="footer")
      4. Assert IG link href contains "instagram.com/andreproperty"
      5. Assert TikTok link href contains "tiktok.com/@andreproperty"
      6. Assert CV download link href contains "drive.google.com"
      7. Assert copyright "2026" dan "Andre Property"
      8. Click back to top, assert page scroll to top
      9. Screenshot
    Expected Result: Footer lengkap dengan links benar
    Evidence: .omo/evidence/task-13-footer.png
  ```

  **Commit**: YES (group Wave 2)
  - Message: `feat(footer): footer with social + cv download`
  - Files: src/components/layout/Footer.tsx

---

- [x] 14. SEO Metadata + Open Graph + Favicon + Sitemap

  **What to do**:
  - Update `src/app/layout.tsx` dengan Metadata API:
    - title, description, keywords
    - Open Graph tags: title, description, image (placeholder), url, type
    - Twitter card tags
    - canonical URL
    - robots
  - Buat `src/app/robots.ts` (Next.js metadata robots)
  - Buat `src/app/sitemap.ts` (Next.js sitemap)
  - Buat/tambah favicon:
    - `src/app/favicon.ico`
    - `src/app/icon.svg` (modern favicon)
    - Apple touch icon
    - Bisa pakai inisial "AP" atau logo sederhana
  - Structured data (JSON-LD): Person schema untuk Andre (name, jobTitle, email, url, sameAs IG/TikTok)
  - Pastikan metadata bilingual-aware (atau default ID)

  **Must NOT do**:
  - Jangan hardcode URL (pakai env var NEXT_PUBLIC_SITE_URL)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: SEO config task

  **Parallelization**:
  - **Can Run In Parallel**: NO (butuh semua section siap)
  - **Parallel Group**: Wave 3 (start after Wave 2)
  - **Blocks**: 17
  - **Blocked By**: 5,6,7,8,9,10,11,12,13

  **References**:
  - Next.js Metadata: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  - JSON-LD Person: https://schema.org/Person
  - site.config untuk data profile

  **Acceptance Criteria**:
  - [ ] `src/app/layout.tsx` punya export const metadata lengkap
  - [ ] Open Graph tags di HTML head
  - [ ] `src/app/robots.ts` exists
  - [ ] `src/app/sitemap.ts` exists
  - [ ] Favicon files exist (favicon.ico, icon.svg, apple-icon)
  - [ ] JSON-LD Person schema di layout
  - [ ] Build sukses

  **QA Scenarios**:
  ```
  Scenario: SEO metadata di HTML
    Tool: Bash (curl + grep)
    Steps:
      1. Run `npm run dev`
      2. curl http://localhost:3000
      3. Grep for `<title>` - assert contains "Andre"
      4. Grep for `og:title` - assert exists
      5. Grep for `og:image` - assert exists
      6. Grep for `twitter:card` - assert exists
      7. Grep for `application/ld+json` - assert exists
    Expected Result: All SEO tags present
    Evidence: .omo/evidence/task-14-seo-meta.txt

  Scenario: robots.txt & sitemap.xml accessible
    Tool: Bash (curl)
    Steps:
      1. curl http://localhost:3000/robots.txt - assert 200
      2. curl http://localhost:3000/sitemap.xml - assert 200
    Expected Result: Both accessible
    Evidence: .omo/evidence/task-14-robots-sitemap.txt

  Scenario: Favicon accessible
    Tool: Bash (curl)
    Steps:
      1. curl -o /dev/null -w "%{http_code}" http://localhost:3000/favicon.ico
      2. curl -o /dev/null -w "%{http_code}" http://localhost:3000/icon.svg
    Expected Result: 200 for both
    Evidence: .omo/evidence/task-14-favicon.txt
  ```

  **Commit**: YES (group Wave 3)
  - Message: `feat(seo): metadata + open graph + favicon + sitemap`
  - Files: src/app/layout.tsx, src/app/robots.ts, src/app/sitemap.ts, src/app/favicon.ico, src/app/icon.svg

- [x] 15. Responsive Polish + Accessibility Audit

  **What to do**:
  - Audit semua section di berbagai viewport:
    - Mobile: 375px (iPhone SE), 390px (iPhone 14)
    - Tablet: 768px (iPad)
    - Desktop: 1280px, 1920px
  - Fix layout issues: overflow, text terlalu kecil, button terlalu rapat, grid tidak adaptif
  - Accessibility audit:
    - Semua interactive elements punya aria-label atau accessible name
    - Semua images punya alt text
    - Form labels terhubung via htmlFor
    - Color contrast WCAG AA (≥4.5:1 untuk normal text)
    - Focus visible (keyboard navigation)
    - Skip to content link di top
    - Heading hierarchy benar (h1 > h2 > h3)
  - Test keyboard navigation (Tab, Enter, Escape)
  - Fix issue yang ditemukan

  **Must NOT do**:
  - Jangan add library a11y berat (manual fixes cukup)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
  - Reason: UI polish & a11y requires visual judgment

  **Parallelization**:
  - **Can Run In Parallel**: YES (dengan Task 16)
  - **Parallel Group**: Wave 3
  - **Blocks**: 17
  - **Blocked By**: 5,6,7,8,9,10,11,12,13

  **References**:
  - WCAG 2.1 AA: https://www.w3.org/WAI/WCAG21/quickref/
  - Tailwind responsive: https://tailwindcss.com/docs/responsive-design

  **Acceptance Criteria**:
  - [ ] No horizontal scroll di mobile (375px)
  - [ ] All text readable di mobile
  - [ ] All interactive elements accessible via keyboard
  - [ ] Color contrast ≥4.5:1
  - [ ] All images alt text
  - [ ] Heading hierarchy benar (1 h1, h2 per section)
  - [ ] Focus visible
  - [ ] Lighthouse accessibility ≥90

  **QA Scenarios**:
  ```
  Scenario: Responsive mobile 375px
    Tool: Playwright
    Steps:
      1. Set viewport 375x667
      2. Navigate http://localhost:3000
      3. Scroll through all sections
      4. Check no horizontal overflow (scrollWidth <= clientWidth)
      5. Screenshot each section
    Expected Result: No overflow, all content visible
    Evidence: .omo/evidence/task-15-mobile-375.png

  Scenario: Responsive tablet & desktop
    Tool: Playwright
    Steps:
      1. Set viewport 768x1024, screenshot
      2. Set viewport 1280x800, screenshot
      3. Set viewport 1920x1080, screenshot
    Expected Result: Layout adapt di semua ukuran
    Evidence: .omo/evidence/task-15-tablet.png, .omo/evidence/task-15-desktop.png, .omo/evidence/task-15-wide.png

  Scenario: Keyboard navigation
    Tool: Playwright
    Steps:
      1. Navigate http://localhost:3000
      2. Press Tab multiple times
      3. Assert focus visible (CSS outline)
      4. Press Enter on focused nav link, assert scroll
      5. Tab to form, fill via keyboard
    Expected Result: All interactive reachable via keyboard, focus visible
    Evidence: .omo/evidence/task-15-keyboard-nav.png

  Scenario: Lighthouse accessibility audit
    Tool: Bash (lighthouse CLI atau Playwright)
    Steps:
      1. Run lighthouse http://localhost:3000 --only-categories=accessibility
      2. Parse score
    Expected Result: Score ≥ 90
    Evidence: .omo/evidence/task-15-lighthouse-a11y.json
  ```

  **Commit**: YES (group Wave 3)
  - Message: `fix(ui): responsive polish + accessibility`
  - Files: various section components

- [x] 16. Performance Optimization (Images, Fonts, Lazy Load)

  **What to do**:
  - Audit Lighthouse performance
  - Optimize:
    - Pakai next/image untuk semua gambar (Hero bg, portfolio samples)
    - Font display: swap, preload critical fonts
    - Lazy load section berat (Testimoni, Blog) dengan Intersection Observer atau next/dynamic
    - Minimize JS bundle: check dynamic imports
    - Compress gambar (next/image auto)
    - Remove unused dependencies
    - Metrika Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
  - Pastikan tidak ada render-blocking resources
  - Test dengan throttling 3G

  **Must NOT do**:
  - Jangan sacrifice UX untuk perf (lazy load critical above-fold)
  - Jangan add analytics berat

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`frontend-ui-ux`]
  - Reason: Performance tuning butuh knowledge Next.js optimization

  **Parallelization**:
  - **Can Run In Parallel**: YES (dengan Task 15)
  - **Parallel Group**: Wave 3
  - **Blocks**: 17
  - **Blocked By**: 5,6,7,8,9,10,11,12,13

  **References**:
  - next/image: https://nextjs.org/docs/app/api-reference/components/image
  - next/dynamic: https://nextjs.org/docs/app/api-reference/components/dynamic
  - Web Vitals: https://web.dev/vitals/

  **Acceptance Criteria**:
  - [ ] Lighthouse performance ≥80
  - [ ] LCP <2.5s
  - [ ] CLS <0.1
  - [ ] All images pakai next/image
  - [ ] Fonts pakai next/font dengan display swap
  - [ ] No unused deps (npm prune check)

  **QA Scenarios**:
  ```
  Scenario: Lighthouse performance
    Tool: Bash (lighthouse CLI)
    Steps:
      1. Build production: npm run build && npm start
      2. Run lighthouse http://localhost:3000 --only-categories=performance
      3. Parse score, LCP, CLS, FID
    Expected Result: Performance ≥80, LCP <2.5s, CLS <0.1
    Evidence: .omo/evidence/task-16-lighthouse-perf.json

  Scenario: Images optimized
    Tool: Bash (grep)
    Steps:
      1. grep -r "<img" src/components/ - should be minimal/none
      2. grep -r "next/image" src/components/ - should be present
    Expected Result: Pakai next/image, minimal raw <img>
    Evidence: .omo/evidence/task-16-image-optimization.txt

  Scenario: Bundle size reasonable
    Tool: Bash
    Steps:
      1. npm run build
      2. Check .next/static size
      3. Assert First Load JS <200KB
    Expected Result: Reasonable bundle size
    Evidence: .omo/evidence/task-16-bundle-size.txt
  ```

  **Commit**: YES (group Wave 3)
  - Message: `perf: optimize images, fonts, lazy load`
  - Files: various components

- [ ] 17. Deploy to Vercel + Verify

  **What to do**:
  - Setup Vercel deployment:
    - Option A: Push ke GitHub, connect Vercel ke repo (manual by user, document steps)
    - Option B: Vercel CLI `vercel` untuk deploy dari local
  - Document deploy steps di README
  - Set environment variables di Vercel:
    - NEXT_PUBLIC_WEB3FORMS_KEY (placeholder jika belum ada)
    - NEXT_PUBLIC_SITE_URL (Vercel URL)
  - Deploy ke production
  - Verify deployment:
    - URL accessible (HTTP 200)
    - All sections render
    - Form functional
    - Language toggle works
    - Responsive
  - Update site.config atau env dengan production URL untuk SEO canonical

  **Must NOT do**:
  - Jangan beli custom domain (subdomain vercel.app saja)
  - Jangan setup CI/CD kompleks (Vercel auto-deploy cukup)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Deploy task dengan dokumentasi

  **Parallelization**:
  - **Can Run In Parallel**: NO (final task before QA wave)
  - **Parallel Group**: Wave 3 (last)
  - **Blocks**: F1,F2,F3,F4
  - **Blocked By**: 14,15,16

  **References**:
  - Vercel deploy: https://vercel.com/docs/getting-started
  - Vercel CLI: https://vercel.com/docs/cli

  **Acceptance Criteria**:
  - [ ] Website deployed ke Vercel (URL accessible)
  - [ ] `curl -s -o /dev/null -w "%{http_code}" <vercel-url>` returns 200
  - [ ] README.md punya deploy instructions
  - [ ] Environment variables set di Vercel dashboard (documented)
  - [ ] Production build sukses di Vercel

  **QA Scenarios**:
  ```
  Scenario: Production URL accessible
    Tool: Bash (curl)
    Preconditions: Deploy sukses, URL diketahui
    Steps:
      1. curl -s -o /dev/null -w "%{http_code}" <vercel-url>
      2. Assert 200
      3. curl <vercel-url> | grep "<title>" - assert contains "Andre"
    Expected Result: 200, title contains Andre
    Evidence: .omo/evidence/task-17-production-accessible.txt

  Scenario: All sections accessible di production
    Tool: Playwright
    Steps:
      1. Navigate to <vercel-url>
      2. Scroll through all sections
      3. Assert each section ID visible: hero, about, experience, skills, portfolio, testimoni, booking, contact, blog
      4. Test language toggle
      5. Test nav links
      6. Screenshot full page
    Expected Result: All sections present & functional
    Evidence: .omo/evidence/task-17-production-fullpage.png

  Scenario: Form functional di production
    Tool: Playwright
    Steps:
      1. Navigate <vercel-url>#contact
      2. Fill form, submit
      3. Assert feedback (success/error message)
    Expected Result: Form gives feedback
    Evidence: .omo/evidence/task-17-production-form.png
  ```

  **Commit**: YES (group Wave 3)
  - Message: `docs(deploy): add vercel deploy instructions`
  - Files: README.md

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .omo/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run build` + linter. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp). Verify config-driven content (no hardcoded strings in components).
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-section integration (smooth scroll nav, language toggle across all sections). Test edge cases: empty form submit, invalid email, mobile viewport, dark/light. Save to `.omo/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff if git available, else file listing). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1 (Task 1-4)**: `chore(scaffold): setup next.js + tailwind + i18n + config` - all foundation files
- **Wave 2 (Task 5-13)**: `feat(sections): implement all UI sections` - all section components
- **Wave 3 (Task 14-17)**: `feat(polish): seo + responsive + perf + deploy` - polish & deploy
- **Final**: Commit evidence files separately if needed

Pre-commit check: `npm run build` must pass before commit.

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: exit 0, no errors
npm run dev            # Expected: server starts on localhost:3000
npm run lint           # Expected: no errors
curl -s -o /dev/null -w "%{http_code}" <vercel-url>  # Expected: 200
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] Website accessible di Vercel URL
- [ ] Bilingual toggle berfungsi
- [ ] Semua form functional
- [ ] Responsive di mobile/tablet/desktop
- [ ] Lighthouse ≥ 80
- [ ] All evidence files in .omo/evidence/
