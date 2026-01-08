# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Maximo Design is a B2B bathroom faucets catalog website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and next-intl for internationalization (Dutch and English).

The site features:

- Homepage with hero section and catalog preview
- Catalog page with two-page spread viewer and category filtering
- Contact page

## Development Commands

```bash
# Install dependencies
npm install

# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues

# Code formatting
npm run format        # Format code with Prettier
npm run format:check  # Check formatting

# Type checking
npm run typecheck     # Run TypeScript compiler
```

## Architecture

### Internationalization (i18n)

The app uses `next-intl` for internationalization with Dutch (nl) as the default locale and English (en) as secondary.

**Key files:**

- `src/lib/i18n/config.ts` - Locale definitions and configuration
- `src/lib/i18n/request.ts` - next-intl request configuration (loaded by Next.js plugin)
- `src/middleware.ts` - Middleware for locale detection and routing
- `messages/nl.json` and `messages/en.json` - Translation files

**Important:**

- All routes are prefixed with locale (e.g., `/nl/catalogus`, `/en/catalog`)
- Locale is handled via the `[locale]` dynamic route segment in `src/app/[locale]/`
- The middleware automatically redirects users to locale-prefixed URLs
- Use `useTranslations()` hook in client components and `getTranslations()` in server components

### App Router Structure

```text
src/app/
├── layout.tsx              # Root layout - font loading, global styles
├── [locale]/               # Locale-specific routes
│   ├── layout.tsx          # Locale layout - Header, NextIntlClientProvider
│   ├── page.tsx            # Homepage
│   ├── catalogus/          # Catalog page (Dutch URL)
│   │   ├── page.tsx
│   │   └── CatalogPageClient.tsx  # Client component for state management
│   └── contact/
│       └── page.tsx
```

The root `layout.tsx` handles basic HTML structure and font loading. The `[locale]/layout.tsx` handles locale-specific metadata and the NextIntlClientProvider wrapper.

### Catalog System

The catalog displays 117 pages of product images organized by finish type (Gun Metal, Gold, Bronze, Chrome, Matte Black).

**Key files:**

- `src/lib/catalog-data.ts` - Catalog data structure, page ranges, filtering logic
- `src/components/catalog/CatalogViewer.tsx` - Two-page spread viewer with pagination
- `src/components/catalog/CatalogSidebar.tsx` - Category filter sidebar
- `src/app/[locale]/catalogus/CatalogPageClient.tsx` - Client component managing filter/page state

**Image naming convention:**

- Page 1: `Maximo-magazine-zonder-prijzen-17juli.jpg`
- Pages 2-117: `Maximo-magazine-zonder-prijzen-17juli{N}.jpg`

**Category page ranges** (defined in `catalog-data.ts`):

- Gun Metal: pages 6-25
- Gold: pages 26-45
- Bronze: pages 46-65
- Chrome: pages 66-85
- Matte Black: pages 86-105

**State management:**

- The catalog page uses URL search params to persist filter and page state
- Filter changes reset to the first page of the selected category
- The CatalogViewer component handles keyboard navigation (arrow keys)

### Design System

**Colors** (defined in `tailwind.config.ts`):

- `background`: #121111 (dark charcoal)
- `foreground`: #EFEFEF (light gray - text and brand)
- `primary`: #2E00E5 (electric blue - CTA button)

**Typography:**

- Body text: Montserrat (Google Fonts via `next/font`)
- Brand name: Abril Display (self-hosted from `public/fonts/`)
- Font CSS variables: `--font-montserrat` and `--font-abril-display`

**Breakpoints:**

- `tablet`: 768px
- `desktop`: 1280px
- `wide`: 1920px

**Custom font sizes** are configured in Tailwind config with specific line heights for the design system.

### Component Organization

```text
src/components/
├── catalog/
│   ├── CatalogViewer.tsx      # Two-page spread catalog viewer
│   └── CatalogSidebar.tsx     # Category filter sidebar
├── layout/
│   ├── Header.tsx             # Site header with navigation
│   └── LanguageSwitcher.tsx   # Language toggle (NL/EN)
├── ui/
│   └── Button.tsx             # Reusable button component
├── Hero.tsx                   # Homepage hero section
└── index.ts                   # Component exports
```

### Fonts

- **Montserrat**: Loaded via `next/font/google` in `src/app/layout.tsx`
- **Abril Display**: Self-hosted font defined via CSS variable in `src/app/layout.tsx`

  - Font file should be at `public/fonts/AbrilDisplay-SemiBold.otf`
  - Loaded via `@font-face` in `src/app/globals.css`

### Path Aliases

TypeScript path alias `@/*` maps to `./src/*` (configured in `tsconfig.json`).

Example: `import { Header } from "@/components/layout"`

## Important Patterns

### Server vs Client Components

- Most components are Server Components by default (Next.js 14 App Router)
- Components requiring interactivity use `"use client"` directive
- Client components: CatalogViewer, CatalogPageClient, LanguageSwitcher, Button
- Keep client boundaries minimal for better performance

### Image Optimization

- Use Next.js `<Image>` component for all images
- Catalog images use `fill` prop with `object-cover` for responsive sizing
- Hero images use `priority` prop for above-the-fold content
- Supported formats: AVIF and WebP (configured in `next.config.mjs`)

### Styling Approach

- Tailwind CSS utility classes for styling
- Custom design tokens in `tailwind.config.ts`
- Global styles in `src/app/globals.css`
- Responsive design: mobile-first approach with breakpoint prefixes (tablet:, desktop:, wide:)

## Code Quality

- ESLint configured with Next.js and Prettier rules (`.eslintrc.json`)
- Prettier for code formatting (`.prettierrc`)
- TypeScript strict mode enabled
- Use `npm run lint:fix` and `npm run format` before committing

## Deployment

### Vercel Setup

The project is deployed on Vercel with the following configuration:

- **Production**: `main` branch → https://maximo-design-new.vercel.app
- **Preview**: `staging` branch → Gets automatic preview URL
- **Pull Requests**: Automatic preview deployments

**Vercel CLI:**
```bash
vercel login          # Authenticate with Vercel
vercel                # Deploy to preview
vercel --prod         # Deploy to production
```

### Git Workflow

The project uses a protected main branch workflow:

1. **Main branch** (`main`): Production-ready code only
   - Protected branch (requires PR to merge)
   - Auto-deploys to production on Vercel

2. **Staging branch** (`staging`): Development and testing
   - All development work happens here
   - Auto-deploys to preview environment on Vercel
   - Merge to main via pull request when ready for production

**Workflow:**
```bash
# 1. Make sure you're on staging
git checkout staging

# 2. Make your changes and commit
git add .
git commit -m "Your changes"
git push

# 3. Test on staging preview URL

# 4. When ready for production, merge to main:
git checkout main
git merge staging
git push

# 5. Switch back to staging for next work
git checkout staging
```

### Performance Monitoring

- **Vercel Speed Insights**: Integrated via `@vercel/speed-insights` package
- Tracks Core Web Vitals (LCP, FID, CLS, FCP, TTFB)
- View metrics at: https://vercel.com/jelle-wijmas-projects/maximo-design-new

### Image Optimization

- Next.js automatic image optimization enabled
- Formats: AVIF (primary), WebP (fallback)
- Quality settings:
  - Main catalog images: `quality={85}`
  - Sidebar thumbnails: `quality={75}`
- Responsive image sizes configured in `next.config.mjs`
- 1-year cache TTL for optimized images
