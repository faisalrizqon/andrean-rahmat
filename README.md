# Andre Property — Personal Branding Website

Bilingual (ID + EN) one-page personal branding website for **Andre Rahmat** (Andre Property) — Digital Marketing & Social Media Specialist. Built with Next.js 16, Tailwind CSS v4, and React 19.

## Features

- **9 content sections**: Hero, About, Experience, Skills, Portfolio, Testimoni, Booking Survey, Contact, Blog
- **Bilingual toggle** (Indonesian / English) via React Context — default locale `id`, persisted in `localStorage`
- **Web3Forms integration** for contact + booking forms (no backend required)
- **WhatsApp floating button** for direct inquiry
- **Responsive mobile-first** layout (375px → desktop), no horizontal overflow
- **SEO optimized**: metadata, Open Graph, Twitter Cards, JSON-LD Person schema, `sitemap.xml`, `robots.txt`
- **Accessibility**: WCAG 2.1 AA — skip-to-content link, focus-visible rings, semantic HTML, ARIA labels, heading hierarchy
- **Performance**: code-splitting via `next/dynamic`, optimized fonts, ~196 KB gzipped JS

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.9 (App Router, Turbopack) |
| UI | React 19.2.4 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` config) |
| Animation | framer-motion |
| Icons | react-icons |
| Forms | Web3Forms (https://web3forms.com) |
| Language | TypeScript 5 |

## Getting Started

### Prerequisites

- **Node.js 18+** (Next.js 16 requires Node 18.18+)
- npm (bundled with Node.js)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the next available port if 3000 is occupied).

### Production Build

```bash
npm run build
npm start
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
cp .env.local.example .env.local
```

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms API key for contact + booking forms. Get a free key at https://web3forms.com | Yes (for forms to work) |
| `NEXT_PUBLIC_SITE_URL` | Production URL for SEO canonical + Open Graph. Example: `https://your-app.vercel.app` | Yes (for production SEO) |

> **Note**: `NEXT_PUBLIC_SITE_URL` should be set to the final Vercel URL after the first deployment. Update it and redeploy so canonical URLs and OG tags resolve correctly.

## Deployment to Vercel

### Option A: GitHub + Vercel (Recommended)

1. **Push this repository to GitHub** (create a new repo and push):
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. Go to **https://vercel.com/new**
3. **Import** the GitHub repository
4. In the Vercel project settings, **add environment variables**:
   - `NEXT_PUBLIC_WEB3FORMS_KEY` — your Web3Forms access key
   - `NEXT_PUBLIC_SITE_URL` — `https://<your-project>.vercel.app` (use the Vercel-assigned domain)
5. Click **Deploy** — Vercel auto-detects Next.js and runs `npm run build`
6. After the first deploy, **update `NEXT_PUBLIC_SITE_URL`** to the Vercel-assigned URL (e.g. `https://andre-property.vercel.app`), then **redeploy** so canonical + OG URLs point to the live domain

### Option B: Vercel CLI

1. **Install the Vercel CLI** globally:
   ```bash
   npm i -g vercel
   ```
2. **Log in** (interactive — opens browser):
   ```bash
   vercel login
   ```
3. **Deploy** from the project root:
   ```bash
   vercel          # preview deployment
   vercel --prod   # production deployment
   ```
4. **Add environment variables** (prompts for value + environment):
   ```bash
   vercel env add NEXT_PUBLIC_WEB3FORMS_KEY
   vercel env add NEXT_PUBLIC_SITE_URL
   ```
5. **Redeploy** so the new env vars take effect:
   ```bash
   vercel --prod
   ```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, I18nProvider, metadata, JSON-LD)
│   ├── page.tsx            # Home page (renders all 9 sections + dynamic imports)
│   ├── globals.css         # Tailwind v4 @theme tokens + base styles
│   ├── icon.svg            # Favicon (App Router magic file)
│   ├── robots.ts           # robots.txt generator
│   └── sitemap.ts          # sitemap.xml generator
├── components/
│   ├── layout/             # Navbar, Footer
│   └── sections/           # 9 section components (Hero, About, Experience, ...)
├── config/
│   └── site.ts             # Single source of truth for all content data
├── i18n/
│   ├── I18nProvider.tsx    # React Context provider (locale state + localStorage)
│   ├── useI18n.ts          # Hook: t(key), locale, toggleLocale
│   └── translations.ts     # All UI strings (id + en)
├── lib/
│   └── formSubmit.ts       # Web3Forms submission helper
└── types/
    └── index.ts            # TypeScript interfaces (Profile, Experience, SiteConfig, ...)
```

## Author

**Andre Rahmat** — Andre Property

Digital Marketing & Social Media Specialist
