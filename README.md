# Maximo Design

B2B bathroom faucets catalog website built with Next.js 16.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Internationalization:** next-intl (Dutch & English)
- **Fonts:** Montserrat (Google Fonts) + Abril Display (self-hosted)

## Getting Started

### Prerequisites

- Node.js 24.0.0 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run typecheck` | Run TypeScript type checking |

## Project Structure

```
maximo_design/
├── messages/              # Translation files
│   ├── nl.json           # Dutch translations
│   └── en.json           # English translations
├── public/
│   ├── fonts/            # Self-hosted fonts (Abril Display)
│   └── images/           # Static images
├── src/
│   ├── app/
│   │   ├── globals.css   # Global styles & design tokens
│   │   ├── layout.tsx    # Root layout
│   │   └── [locale]/     # Locale-specific routes
│   │       ├── layout.tsx
│   │       ├── page.tsx          # Homepage
│   │       ├── catalogus/        # Catalog page
│   │       └── contact/          # Contact page
│   ├── components/
│   │   ├── layout/       # Layout components (Header, etc.)
│   │   ├── ui/           # Reusable UI components
│   │   └── Hero.tsx      # Homepage hero section
│   ├── lib/
│   │   └── i18n/         # Internationalization config
│   └── types/            # TypeScript type definitions
├── tailwind.config.ts    # Tailwind CSS configuration
└── next.config.ts        # Next.js configuration
```

## Design System

### Colors

| Usage | Color | Hex |
|-------|-------|-----|
| Background | Dark charcoal | `#121111` |
| Text / Brand | Light gray | `#EFEFEF` |
| Primary Button | Electric blue | `#2E00E5` |

### Typography

- **Brand Name:** Abril Display (serif)
- **Body Text:** Montserrat (sans-serif)

### Breakpoints

| Name | Width |
|------|-------|
| Mobile | < 768px |
| Tablet | >= 768px |
| Desktop | >= 1280px |
| Wide | >= 1920px |

## Pages

### Homepage (`/`)
- Hero section with brand title and tagline
- "Bekijk catalogus" CTA button

### Catalog (`/catalogus` or `/catalog`)
- Filter sidebar by finish type
- Catalog page viewer
- Pagination

### Contact (`/contact`)
- Contact information
- Email: sanisupply@info.nl

## Internationalization

The site supports Dutch (nl) and English (en). URLs are prefixed with the locale:

- `/nl/` - Dutch (default)
- `/en/` - English

## Adding the Abril Display Font

Place the Abril Display font file in `public/fonts/`:

```
public/fonts/AbrilDisplay-SemiBold.otf
```

The font is loaded via `@font-face` in `globals.css`.

## Deployment

This project is optimized for deployment on Vercel:

```bash
# Build the project
npm run build

# The output is in .next/
```

Or deploy directly to Vercel by connecting your GitHub repository.

## License

Private - All rights reserved.
