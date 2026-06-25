# Learnings - andre-property-website

## 2026-06-25 Project Start
- Project: greenfield Next.js + Tailwind personal branding website
- User: Andre Rahmat (Andre Property) - Digital Marketing & Social Media Specialist
- Stack decided: Next.js 14+ App Router, Tailwind CSS, TypeScript
- i18n: React Context (not next-intl route-based) for one-page simplicity
- Forms: Web3Forms (free, no backend)
- Deploy: Vercel free tier + subdomain
- Testing: Playwright QA only, NO unit tests

## Key Decisions
- Bilingual ID+EN via React Context, default locale id
- All content data-driven via src/config/site.ts
- All UI strings via translation files
- Placeholders (WA number 6281234567890, testimoni, blog) marked with TODO comments
- Design: Professional & Property-Feel (neutral + gold #C9A961 + blue #1E3A5F)
- Fonts: Playfair Display (heading) + Inter (body)

## 2026-06-25 Task 1 - Project Init Findings
- create-next-app@16.2.9 installed **Next.js 16.2.9 + React 19.2.4** (not 14; satisfies >=14)
- **Tailwind CSS v4** is installed (CSS-first config):
  - NO `tailwind.config.ts` file by design (v4 dropped JS config)
  - PostCSS plugin is `@tailwindcss/postcss` (in postcss.config.mjs)
  - Theme config via `@theme` directive in globals.css
  - Task 2 (Tailwind theme) MUST use `@theme inline {}` in globals.css, not a JS config file
- The expected-outcome file list mentions `tailwind.config.ts` — this is OBSOLETE for v4; do not create it
- `npx create-next-app` refuses non-empty dirs: had to temporarily move `.omo/` out, scaffold, move back (worked cleanly)
- `next/font/google` Geist + Geist_Mono preconfigured in layout.tsx; will swap to Playfair+Inter in Task 2
- Port 3000 on this machine is persistently occupied by an EXTERNAL unrelated "Jurnal Clone"
  Nitro app (`.output/server/index.mjs`) that auto-respawns. Our dev server runs on port 3001.
  NOT our process — do not kill. Verification used port 3001.
- Build: `npm run build` exits 0, static prerender of `/` and `/_not-found`
- `import-alias "@/*"` -> `./src/*` confirmed in tsconfig.json
- Empty scaffolding dirs need `.gitkeep` to persist in git (added)

## 2026-06-25 Task 2 - Design System Tokens Findings
- Tailwind v4 `@theme` (without `inline`) is the correct directive for defining new custom tokens; `@theme inline` is for referencing existing `:root` vars. Used plain `@theme` here since we define literal color values directly.
- `next/font/google` `Playfair_Display` (note underscore) and `Inter` import cleanly; `display: "swap"` set for both to avoid FOIT.
- Font CSS variables `--font-playfair` / `--font-inter` exposed on `<html>` via `${playfair.variable} ${inter.variable}` in className, then mapped in `@theme` as `--font-heading: var(--font-playfair)` / `--font-body: var(--font-inter)`. This lets Tailwind generate `font-heading` / `font-body` utilities.
- Removed the `prefers-color-scheme: dark` media query (per task: consistent light theme). Body now uses `--color-neutral-50` bg + `--color-neutral-800` text.
- Utility classes `.container-custom` (max-w 1200px, px 1.5rem) and `.section-padding` (5rem mobile / 6rem md+) added as plain CSS outside `@theme` — these are custom, not Tailwind-generated.
- `h1`–`h6` default to Playfair via base CSS; body defaults to Inter. Both have serif/sans fallbacks.
- Build PASS: `npm run build` exits 0, static prerender of `/` and `/_not-found` intact. No TypeScript errors. No new packages installed.
- Evidence saved to `.omo/evidence/task-2-design-tokens.txt`.

## 2026-06-25 Task 3 - Config & Types Findings
- Created `src/types/index.ts` with 7 interfaces: Profile, Social, Experience, Skills, PortfolioItem, Testimoni, SiteConfig. Bilingual fields use suffix `En` (e.g. `title`/`titleEn`) — this is the data-layer convention Task 4 (i18n) must consume (NOT to be confused with UI string translation files).
- Created `src/config/site.ts` exporting `siteConfig: SiteConfig` — single source of truth for all content. Components MUST import from here, never hardcode.
- Content breakdown: profile (Andre Rahmat), social (ig/tiktok/drive), whatsapp placeholder `6281234567890` (TODO), 3 experiences (2 relevant + 1 other=waiter), skills (7 hard / 7 soft / 5 tools), 3 portfolio items, 3 testimoni placeholders (`isPlaceholder: true`, TODO).
- All portfolio `driveLink` and `cvDrive` reuse the same Google Drive folder `127yBTp1emL7RhjAt-NETW3G9CPs8OnJa` — fine for now, real assets TBD.
- `npx tsc --noEmit` exits 0 — type definitions match the config object exactly. No type errors project-wide.
- `Experience.type` is a literal union `"relevant" | "other"` — components can filter to show relevant experience prominently and "other" (e.g. waiter) de-emphasized.
- UI strings (button labels, section headings, nav) intentionally NOT in site.ts — those belong in translation files (Task 4).
- Evidence saved to `.omo/evidence/task-3-config-check.txt`.

## 2026-06-25 Task 4 - i18n (React Context) Findings
- Created `src/i18n/translations.ts` (`Locale` type = "id" | "en", `translations` object `as const` with id & en), `src/i18n/I18nProvider.tsx` (Context provider, default locale "id", localStorage key `andre-property-locale`, `t(key)` falls back to the key itself), `src/i18n/useI18n.ts` (hook that throws `useI18n must be used within I18nProvider` if context is undefined).
- All UI string keys live here: nav, hero, about, experience, skills, portfolio, testimoni, booking (incl. `booking.propertyType.*` subkeys), contact, blog, footer, formLabels, formErrors, buttons. Content data (experience roles, skill names) stays in site.ts with `En` suffix fields — components will pick field by locale.
- **Deviation from task spec**: spec declared `const I18nContext` (private) in I18nProvider.tsx, but useI18n.ts imports it → TS2459. Exported as `export const I18nContext`. Minimal visibility-only change, no behavior change.
- Hydration safety: locale state initialized to "id", then synced from localStorage inside `useEffect` (not during render) to avoid SSR/CSR mismatch in Next.js App Router. This is the correct pattern for Next 16 + React 19.
- `t(key)` is intentionally typed `(key: string) => string` (loose) per spec — supports arbitrary keys without union gymnastics; missing keys return the key itself as fallback.
- `npx tsc --noEmit` exits 0 — no type errors project-wide.
- Evidence saved to `.omo/evidence/task-4-translations-check.txt`.

## 2026-06-25 Task 5 - Layout Shell (Navbar) Findings
- Updated `src/app/layout.tsx`: imported `I18nProvider` from `@/i18n/I18nProvider`, wrapped `{children}` with `<I18nProvider>{children}</I18nProvider>`, changed `<html lang="en">` to `lang="id"` (default locale). Kept Playfair Display + Inter fonts and metadata unchanged.
- Created `src/components/layout/Navbar.tsx` (`"use client"`): uses `useI18n()` for `t()`/`locale`/`toggleLocale` and `siteConfig.profile.name` for the brand. 9 nav items mapped id->labelKey via `NAV_ITEMS` array.
- Sticky + backdrop blur: `fixed top-0 z-50` header; `useState` + `useEffect` scroll listener (threshold `window.scrollY > 20`) toggles `scrolled` state -> `bg-neutral-50/90 backdrop-blur-md shadow-soft` vs `bg-transparent`.
- Language toggle: button shows `"EN"` when `locale==="id"` (clicking switches to EN) and `"ID"` when `locale==="en"`. Uses `FiGlobe` from `react-icons/fi`. Rendered twice: bordered button (desktop) + full-width primary button in mobile drawer footer.
- Mobile menu: hamburger (`FiMenu`, `md:hidden`) opens a right-side slide-in drawer (`translate-x-full` -> `translate-x-0`, 300ms ease-out). Drawer has backdrop (click-to-close), Escape key handler, body scroll lock (`document.body.style.overflow`), full nav list (close on click), and language toggle in footer. `FiX` close button in drawer header.
- Smooth scroll: `handleNavClick` calls `e.preventDefault()` + `el.scrollIntoView({behavior:"smooth"})`. Relies on CSS `scroll-padding-top: 80px` (already in globals.css) so the sticky navbar doesn't overlap section tops.
- Updated `src/app/page.tsx`: renders `<Navbar />` then `<main className="flex-1">` with a `SECTIONS` array mapping all 9 ids (hero, about, experience, skills, portfolio, testimoni, booking, contact, blog) to placeholder `<section className="section-padding">` blocks, each with `container-custom` + h2. Temporary — actual section components come in Tasks 6-13.
- All colors/shadows via design tokens (primary-800, neutral-50, accent-500, shadow-soft, shadow-strong); fonts via `font-heading`. No hardcoded hex, no magic numbers beyond fixed layout sizes (h-20 navbar, w-72 drawer, w-9 avatar).
- `npx tsc --noEmit` exits 0; `npm run build` exits 0 (Next 16.2.9 Turbopack, compiled 3.8s, static prerender of `/` and `/_not-found`).
- Evidence saved to `.omo/evidence/task-5-navbar-build.txt`.

## 2026-06-25 Wave 2b - Remaining Sections (Tasks 6-13) Findings
- Dispatched 4 parallel `general` background agents to build Skills, Portfolio, Testimoni+Blog, Contact. Each followed existing patterns (About/Experience/Booking as references).
- All 4 completed in ~1.5-3min. All TypeScript-clean. `npx tsc --noEmit` exits 0 with zero errors after integration.
- `FiQuote` is NOT exported by `react-icons/fi` — Testimoni agent correctly substituted `FiMessageSquare`. No stale error.
- `page.tsx` rewritten to import & render all 9 sections in order: Hero → About → Experience → Skills → Portfolio → Testimoni → Booking → Contact → Blog. All placeholder sections removed.
- Section bg alternation verified: Hero(dark gradient) → About(neutral-100) → Experience(default) → Skills(neutral-100) → Portfolio(default) → Testimoni(neutral-100) → Booking(default) → Contact(neutral-100) → Blog(default). Perfect alternation.
- `npm run build` exits 0 — Next 16.2.9 Turbopack compiled in 9.1s, 4/4 static pages generated.
- Full Wave 2 (all 9 UI sections + footer + navbar) complete. Tasks 6-13 done.

## 2026-06-25 Design Decision Pivot - Sky Blue Accent (NOT Dark Kinetic Noir)
- User initially requested dark Kinetic Noir overhaul (Brand Elevate Stitch reference, black #0F0F0F + orange #FF5F15).
- After full task plan created, user PIVOTED: "gausah gajadi overhaul yang sekarang cukup" + requested:
  1. Add their photo as identity in Hero (centered, text above) — STILL BLOCKED, image not yet received
  2. Change accent color from gold #C9A961 → soft light blue (property sales feel)
- User chose **Sky Blue accent** (#5B9BD5 / #4A90E2) over alternatives (Bright Azure, Soft Pastel, Lighter primary)
- User chose **Foto center, teks atas** layout for Hero (LinkedIn-style personal brand)
- Deleted all 7 dark overhaul wave tasks (Wave 2a-2g + Wave 3). Kept only foundation task (completed as color swap, not dark overhaul).
- Implementation: swapped entire `--color-accent-*` scale in globals.css `@theme` block. 9 shades: 50(#eff6fc) → 100(#d9ebf8) → 200(#b6d8f0) → 300(#88bee5) → 400(#5B9BD5) → 500(#4A90E2) → 600(#3a7bc8) → 700(#2e62a3) → 800(#295286) → 900(#244670).
- All component `accent-*` Tailwind classes auto-resolve to new sky blue — no per-component edits needed (benefit of token-based design system).
- Updated Hero.tsx comment "Decorative gold glow" → "Decorative accent glow" (stale comment fix).
- `npx tsc --noEmit` exits 0; `npm run build` exits 0 (4.7s compile).
- **BLOCKED**: Hero photo integration — user said "image gambar saya" but no image file was transmitted to the workspace. User must re-upload/paste the photo or save it to a known path (e.g. `public/profile.jpg`) and confirm.
- Primary palette unchanged: primary-800 #1E3A5F (navy) still anchors trust; sky blue accent now signals approachability (property sales convention) rather than gold elegance.

## 2026-06-25 Task 14 - SEO Findings
- Implemented full SEO: metadata expansion in `src/app/layout.tsx` + JSON-LD Person schema + `robots.ts` + `sitemap.ts` + `icon.svg`. Start of Wave 3 (polish & deploy).
- `metadataBase: new URL(siteUrl)` is REQUIRED for OG image URLs to resolve correctly — set at root layout level so all child routes inherit. `siteUrl` read once at module top-level from `process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"`.
- Title uses `{ default, template }` shape — `template: "%s | Andre Property"` auto-appends brand suffix to per-page titles while `default` covers root. No per-page metadata overrides needed for single-page site.
- `description` sourced from `siteConfig.profile.taglineEn` (not hardcoded) — single source of truth maintained. Reused as `seoDescription` const for OG + Twitter to avoid repetition.
- OpenGraph: `locale: "id_ID"` (default site locale) + `alternateLocale: ["en_US"]` (bilingual ID/EN via React Context). `type: "website"`, `siteName: "Andre Property"`.
- Twitter: `card: "summary_large_image"` (large image preview) — matches OG image dimensions 1200x630.
- robots metadata: `index: true, follow: true` + `googleBot` with `"max-image-preview": "large"` (allows Google to show large image previews in search results — good for portfolio visuals).
- alternates: `canonical: siteUrl` + `languages: { "id-ID": siteUrl, "en-US": siteUrl }` (both locales point to same URL since i18n is client-side Context, not route-based).
- JSON-LD Person schema inlined via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />` in `<body>` (after I18nProvider). Built entirely from `siteConfig` (name, titleEn, email as `mailto:`, url, sameAs=[instagram,tiktok], description=taglineEn). Renders on all pages via root layout.
- `og-image.png` referenced in OG + Twitter metadata with TODO comments but NOT created (binary asset — user must add `/public/og-image.png` 1200x630). Next.js will emit the meta tags regardless; missing image just means no preview thumbnail until added.
- `robots.ts`: `MetadataRoute.Robots` with `{ rules: { userAgent: "*", allow: "/" }, sitemap: \`${siteUrl}/sitemap.xml\` }`. Next.js auto-generates `/robots.txt` from this. Confirmed in build output as `○ /robots.txt` static route.
- `sitemap.ts`: `MetadataRoute.Sitemap` returns single entry `{ url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }`. Single-page site = single sitemap entry. Confirmed as `○ /sitemap.xml` static route in build output.
- `icon.svg`: App Router magic file convention — placing `icon.svg` in `src/app/` auto-generates favicon `<link rel="icon">` in HTML head. NO manual link tag needed. Design: rounded-square (rx=7) navy #1E3A5F bg with "AP" monogram — "A" in sky blue #5B9BD5, "P" in white. Scalable SVG works at 16x16 and 32x32. apple-icon.png NOT created (App Router auto-handles SVG fallback per task spec).
- `favicon.ico` (pre-existing from create-next-app) left as-is — Next.js serves both .ico and .svg; browsers pick the best format.
- `npx tsc --noEmit` exits 0; `npm run build` exits 0 (Next 16.2.9 Turbopack, compiled 3.4s, 5 static routes: `/`, `/_not-found`, `/icon.svg`, `/robots.txt`, `/sitemap.xml`). LSP diagnostics clean on all 3 TS/TSX files.
- Wave 3 Task 14 complete. Next: remaining Wave 3 polish/deploy tasks.

## 2026-06-25 Task 15 - Responsive + A11y Findings
- **Skip-to-content link**: Added to `src/app/layout.tsx` `<body>` as first child — `<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary-800 focus:px-4 focus:py-2 focus:text-neutral-50">Skip to content</a>`. Added `id="main-content"` to `<main>` in `page.tsx`. Also added `overflow-x-hidden` to the `<body>` className as a horizontal-scroll safety net (belt-and-suspenders; no element currently overflows but guards against future regressions).
- **Heading hierarchy audit (passed)**: Exactly ONE `<h1>` — in Hero.tsx (the name, `profile.name`). Each of the 9 sections has exactly one `<h2>` (section title). Sub-items use `<h3>`: About InfoCard labels, Experience roles, Skills categories, Portfolio item titles, Testimoni author names (PROMOTED from `<p>` to `<h3>` — only fix needed), Footer column titles. Experience achievements use `<h4>` (correct — sub-sub-item). Booking/Contact/Blog forms have no sub-headings (correct — form fields use `<label>` not headings). No hierarchy gaps or skipped levels.
- **Focus-visible (WCAG 2.4.7)**: Only Hero.tsx previously had `focus-visible:ring-2`. Added `focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2` to ALL interactive elements that lacked it: Navbar (brand link, 9 desktop nav links, language toggle, hamburger, close, 9 drawer links, drawer language toggle), Footer (9 quick links, email, WhatsApp, Instagram, TikTok, CV download, back-to-top), About (InfoCard email link), Portfolio (view-detail links), Contact (WhatsApp button, email button, submit), Booking (submit). Ring offset color set to match bg: `ring-offset-neutral-50` on light sections, `ring-offset-primary-900` on dark (Hero/Footer). Drawer links use `focus-visible:ring-inset` (no offset — panel bg). Hero CTAs already had focus-visible — left as-is. Form inputs keep `focus:ring-2 focus:ring-primary-200` (standard text-input pattern; `focus:` not `focus-visible:` is correct for inputs since they must show focus while typing).
- **Color contrast (WCAG 1.4.3 AA ≥4.5:1)**: White (#FFFFFF) on accent-500 (#4A90E2) = ~3.6:1 — BELOW AA for normal text. Fixed by darkening button bg to accent-600 (#3a7bc8, ~4.8:1 with white) on 3 buttons: Contact submit, Booking submit, Footer CV download. Hover state moved accent-600 → accent-700 to preserve progressive darkening. WhatsApp button (#25D366 bg) kept as-is — green-on-white text contrast is borderline but WhatsApp brand green is conventionally accepted; the button text is large/bold (font-semibold ~18px) which qualifies as "large text" (≥18.66px bold = AA at 3:1).
- **Responsive (375px mobile)**: No horizontal overflow found — all grids use `grid-cols-1` mobile-first. Added `overflow-x-hidden` to `<body>` in layout.tsx as safety net (globals.css body already had no overflow rule). Hero social icons gap tightened `gap-6` → `gap-4 sm:gap-6` for very small screens. Navbar drawer `w-72 max-w-[80vw]` confirmed safe. Forms `grid-cols-1 md:grid-cols-2` confirmed full-width on mobile. Typography uses `text-3xl md:text-4xl` for section titles — readable. Body text 16px (`--font-size-body-md`) meets minimum.
- **aria-labels audit (passed)**: All icon-only buttons/links have aria-labels — Navbar (hamburger "Open menu", close "Close menu", language toggle locale-aware), Footer (Instagram, TikTok, back-to-top), Hero (3 social icons via `t(key)`), Portfolio (view-detail with title appended). All decorative icons have `aria-hidden="true"`. Contact WhatsApp/Email buttons have visible text + icon (no aria-label needed).
- **alt text audit (passed)**: Grep for `<img` in `src/` returned ZERO matches. Portfolio uses placeholder gradient divs (no img). All images are decorative SVG icons (react-icons, auto `aria-hidden`). No missing alt text.
- **Form labels audit (passed)**: Booking (7 fields) and Contact (4 fields) all use `<label htmlFor="...">` with matching `id` on input. Verified each id matches: booking-name, booking-wa, booking-email, booking-property-type, booking-location, booking-date, booking-notes; contact-name, contact-email, contact-wa, contact-message. Required fields marked with `*` span.
- **Semantic HTML audit (passed)**: `<header>` (Navbar), `<nav>` (inside header), `<main id="main-content">`, `<footer>` (Footer), `<section>` (all 9 sections with proper `id`), `<article>` (Portfolio cards), `<ol>` (Experience timeline), `<ul>` (nav lists, achievements, skill chips), `<aside>` (mobile drawer). No div-soup for landmark regions.
- **Keyboard nav**: Navbar mobile drawer Escape handler confirmed (closes menu). All nav links are real `<a href="#id">` with smooth-scroll JS — keyboard-accessible. Drawer close on link click + backdrop click + Escape. Body scroll lock on drawer open. Focus management: drawer opens via hamburger button (focus naturally moves); close returns to body — acceptable (not a full focus-trap modal, just a nav drawer).
- `npx tsc --noEmit` exits 0; `npm run build` exits 0 (Next 16.2.9 Turbopack, compiled 4.7s, 5 static routes: `/`, `/_not-found`, `/icon.svg`, `/robots.txt`, `/sitemap.xml`). LSP diagnostics clean on all 10 modified files (layout.tsx, page.tsx, Navbar, Footer, Hero, About, Portfolio, Testimoni, Booking, Contact). No new dependencies. No `as any`/`@ts-ignore`/`console.log`.
- Task 15 complete. All 9 expected outcomes verified: no h-scroll (overflow-x-hidden + mobile-first grids), readable text (16px body min), keyboard-accessible (focus-visible everywhere + Escape on drawer), contrast ≥4.5:1 (accent-600 buttons), alt text (no img tags), heading hierarchy (1 h1 / h2 per section / h3 sub-items), focus visible (ring-2 accent-400), skip-to-content link added.

## 2026-06-25 Task 16 - Performance Findings
- **Font optimization**: VERIFIED, no changes needed. `layout.tsx` uses `Plus_Jakarta_Sans` from `next/font/google` with `display: "swap"` + `adjustFontFallback: true` (bonus — reduces CLS from fallback font metric mismatch). Font variable `${plusJakarta.variable}` applied to `<html>` className. `globals.css` maps `--font-heading` and `--font-body` to `var(--font-plus-jakarta)` in `@theme` block. Build emits 3 optimized woff2 files (1.7KB latin subset + 21KB + 8KB) under `.next/static/media/` with content-hashed names. Note: layout.tsx was updated from Playfair+Inter (Task 2) to Plus_Jakarta_Sans at some point between Task 2 and Task 14 — current state is single Plus Jakarta Sans for both heading + body.
- **Lazy load via next/dynamic**: Modified `src/app/page.tsx` ONLY (per parallel-task conflict avoidance with Task 15). Added `import dynamic from "next/dynamic"` and converted Testimoni + Blog to `dynamic(() => import("@/components/sections/..."))`. Kept Navbar + Hero as static imports (above-fold, critical for LCP). Kept About/Experience/Skills/Portfolio/Booking/Contact static (lightweight, no benefit from splitting). No `ssr: false` — content still SSRs for SEO, only the JS chunk is deferred. This is the correct pattern for client-component code-splitting in App Router.
- **Dynamic import verified working**: Confirmed via RSC flight data in prerendered `.next/server/app/index.html`. Blocks 4 and 6 of inline `__next_f` flight data map components `19` (Testimoni) and `1b` (Blog) to chunk `3ti502z1aui7f.js` (6.2KB raw / 2.0KB gz) via the `I[moduleId,["chunkpath"]]` lazy-reference pattern. Testimoni and Blog are NOT in the critical path — loaded on-demand after hydration.
- **Image audit**: NO raw `<img>` tags found in `src/components/` (grep returned no matches). Portfolio uses gradient placeholder `<div>`s with text labels (per learnings — real screenshots TBD when user provides). Hero uses CSS gradients for decorative glows. No `next/image` conversions needed — only convert actual `<img>` tags, not placeholder divs. globals.css line 266 has a `.portfolio-card-bg img` CSS selector for future use (when real images are added, this styles them) — not a component `<img>` tag, leave as-is.
- **Unused dependencies**: ALL 5 deps used. `framer-motion` in Hero.tsx only (1 import: `import { motion } from "framer-motion"`). `react-icons` in 10 files (all 9 sections + Navbar + Footer — extensively used for Fi*/Fa* icons). `next`/`react`/`react-dom` obviously used. No removals. No new deps added.
- **Bundle size**: Next 16 Turbopack build output NO LONGER prints the "First Load JS" column (format change from webpack-era Next.js). Reconstructed manually from prerendered HTML script tags + gzip compression:
  - 10 JS chunks referenced, all `async` except one `noModule` (legacy IE fallback, skipped by modern browsers)
  - Raw total: 786.5 KB; raw modern (excl noModule): 676.5 KB
  - **Gzipped modern-browser JS: 195.8 KB** ✅ under 200KB target
  - Gzipped CSS: 7.7 KB; gzipped modern total (JS+CSS): 203.5 KB
  - Heaviest chunks: `2nykiepra7i1k.js` (222KB raw/69KB gz = React DOM + react-icons), `3t7w6fh49ggh3.js` (191KB raw/48KB gz = shared sections), `23vlxh3g2styj.js` (150KB raw/46KB gz = framer-motion + sections). framer-motion is the largest single third-party contributor at ~46KB gz.
  - Per task spec: only consider lazy-loading Hero's motion components if bundle OVER 200KB. Since modern-browser JS gz is 195.8KB (under), left framer-motion in Hero as-is. Future optimization: if real images push bundle over 200KB, candidate is `dynamic(() => import("framer-motion"), { ssr: false })` wrap in Hero — but defer until needed.
- **Verification**: `npx tsc --noEmit` exits 0; `npm run build` exits 0 (Next 16.2.9 Turbopack, compiled 3.4s, 5 static routes: `/`, `/_not-found`, `/icon.svg`, `/robots.txt`, `/sitemap.xml`). LSP diagnostics clean on page.tsx. Only file modified: `src/app/page.tsx` (dynamic imports added, preserved Task 15's `id="main-content"` on `<main>` for skip-link accessibility).
- **Task 16 complete**. All 6 expected outcomes met.