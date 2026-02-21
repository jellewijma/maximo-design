# Maximo Design - Refined Website Specification

**Last Updated:** Based on client answers to discovery questions

---

## 1. Project Summary

| Attribute | Value |
|-----------|-------|
| **Business Type** | B2B |
| **Primary Goal** | Showcase catalog, generate quote requests |
| **Languages** | Dutch & English |
| **Timeline** | ASAP |
| **Budget** | < €500 |
| **E-commerce** | No |

---

## 2. Design System

### 2.1 Colors

```css
:root {
  /* Background */
  --color-bg: #121111;

  /* Text & Brand */
  --color-text: #EFEFEF;
  --color-brand: #EFEFEF;

  /* Primary Action */
  --color-primary: #2E00E5;  /* Used only for "Bekijk catalogus" button */
}
```

| Usage | Color | Hex |
|-------|-------|-----|
| Background | Dark charcoal | `#121111` |
| Text / Brand | Light gray | `#EFEFEF` |
| Primary Button | Electric blue | `#2E00E5` |

### 2.2 Typography

| Usage | Font Family | Notes |
|-------|-------------|-------|
| Brand Name ("Maximo Design") | **Abril Display** | Licensed font |
| All Other Text | **Montserrat** | Google Font |

**Font Sizes (Variable/Adjustable):**
```css
:root {
  --font-xs: 0.75rem;    /* 12px */
  --font-sm: 0.875rem;   /* 14px */
  --font-base: 1rem;     /* 16px */
  --font-lg: 1.125rem;   /* 18px */
  --font-xl: 1.25rem;    /* 20px */
  --font-2xl: 1.5rem;    /* 24px */
  --font-3xl: 1.875rem;  /* 30px */
  --font-4xl: 2.25rem;   /* 36px */
  --font-5xl: 3rem;      /* 48px */
  --font-6xl: 3.75rem;   /* 60px */
}
```

### 2.3 Animations
- **Style:** Subtle
- **Use Cases:** Page transitions, hover states, button interactions

---

## 3. Site Structure

```
Maximo Design
├── Homepage (/ or /nl, /en)
│   ├── Header (logo + 2 action buttons)
│   ├── Two-column layout
│   │   ├── Left: Description, tagline, brand title
│   │   └── Right: Hero product image
│   └── Carousel indicators
│
├── Catalog Page (/catalogus or /catalog)
│   ├── Header (logo + 2 action buttons)
│   ├── Page title "Catalogus"
│   ├── Three-column layout
│   │   ├── Left sidebar: Category filter with thumbnails
│   │   ├── Center: Large lifestyle product image
│   │   └── Right panel: Category title & description
│   └── Bottom pagination
│
└── Contact Page (/contact)
    ├── Header (logo + 2 action buttons)
    └── Two-column layout
        ├── Left: Contact info & message
        └── Right: Portrait photo
```

**Global Header (All Pages):**
- "M" logo (top-left)
- "CONTACT" button (outline style, top-right)
- "NAAR CATALOGUS" button (filled purple, top-right)

**Note:** No footer on any page.

---

## 4. Pages

### 4.1 Homepage

**Layout:** Two-column split design

**Left Column (Text Content):**
- Lorem ipsum description text (positioned at top)
- "Kranen met kwaliteit" tagline (positioned mid-section)
- "Maximo Design" large brand title (positioned at BOTTOM) - uses Abril Display font

**Right Column (Hero Image):**
- Large product photograph: gold/brass faucet on dark textured background
- Professional lifestyle photography style
- Dark, moody aesthetic

**Bottom Elements:**
- Carousel/slider dots (5-6 indicators) positioned bottom-right of hero image

**Navigation:**
- No "Bekijk catalogus" button on homepage in current design
- Navigation handled via header buttons only

### 4.2 Catalog Page

**Page Title:**
- "Catalogus" centered at top

**Left Sidebar (Filter Navigation):**
- Narrow vertical strip (~80-100px wide)
- Vertical line markers separating categories
- Category sections visible:
  - "Gun Metal" with product thumbnail grid
  - "Cloud" with product thumbnail grid
- Each thumbnail shows miniature faucet image
- Visual hierarchy through spacing and vertical lines

**Main Content Area:**
- Large centered lifestyle product image
- Styled photography showing faucet in real-world setting (dark surfaces, plants, design objects)

**Right Info Panel:**
- Active category title (e.g., "Gun Metal")
- Product description text below title
- Positioned beside/over main image

**Bottom Navigation:**
- Centered pagination bar
- Left arrow (previous)
- Page counter "40 / 92" format (current / total pages)
- Right arrow (next)
- Minimalist design with subtle borders

**Note:** No individual product pages - catalog is page-based viewer only

### 4.3 Contact Page

**Layout:** Two-column split design

**Left Column (Contact Information):**
- "Contact" title
- Call-to-action message: "Wilt u een **bestelling** plaatsen of heeft u een **vraag**? Wij staan voor u klaar."
  - Note: "bestelling" and "vraag" appear in bold
- Email: "E-mail: sanisupply@info.nl"

**Right Column (Photo):**
- Large professional portrait photograph
- Person in orange shirt looking upward
- Bright, optimistic, approachable aesthetic (contrasts with dark product photography)

---

## 5. Features

### 5.1 Included
| Feature | Details |
|---------|---------|
| Multi-language | Dutch (primary) & English |
| Responsive | Desktop (1920px) & Tablet (768px) |
| Catalog viewer | Browse PDF catalog pages as images |
| Category navigation | Navigate between finish types (Gun Metal, Cloud, etc.) |
| Pagination | Navigate through catalog pages with counter |
| Image carousel | Homepage hero image slider (dots indicate multiple images) |
| Contact | Display contact info for quotes |
| Subtle animations | Hover states, transitions |

### 5.2 Not Included
| Feature | Reason |
|---------|--------|
| E-commerce | B2B model - contact for quotes |
| Newsletter | Not required |
| Blog | Not required |
| User accounts | Not required |
| Search | Not required |
| Chat/Support widget | Not required |
| Analytics | Basic only if any |
| Social media links | Not required |
| SEO optimization | Not prioritized |
| Cookie consent | Not required |
| Sitemap | Not required |
| Forms | Not required (email contact only) |

---

## 6. Assets

### 6.1 Required from Client
| Asset | Status | Notes |
|-------|--------|-------|
| "M" logo | Available in Figma | Monogram version |
| Abril Display font | Licensed | Client has license, used for "Maximo Design" only |
| Catalog page images | Needed | Export from catalog PDF |
| Hero product images | Needed | Gold faucet on dark background (+ 4-5 more for carousel) |
| Category lifestyle images | Needed | Large styled product photos for catalog viewer |
| Product thumbnails | Needed | Small images for sidebar filter navigation |
| Contact portrait photo | Needed | Person in orange shirt (or similar professional portrait) |

### 6.2 Fonts to Load
- **Abril Display** - Self-hosted (licensed)
- **Montserrat** - Google Fonts (free)

---

## 7. Technical Decisions

### 7.1 Recommended Stack (Budget-Friendly)
| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | **Next.js 14** | Free, great for static sites, easy i18n |
| Styling | **Tailwind CSS** | Fast development, small bundle |
| Language | **TypeScript** | Type safety, better DX |
| Hosting | **Vercel** | Free tier, perfect for Next.js |
| Fonts | Self-hosted + Google | Performance |

### 7.2 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

*No IE11 or legacy browser support required.*

---

## 8. Content Requirements

### 8.1 To Be Provided Later
- Brand description text (using placeholder for now)
- Final catalog page images

### 8.2 Placeholder Text
```
Lorem ipsum dolor sit amet consectetur. Gravida consequat hendrerit
dui diam eget. Adipiscing eget tempus a pretium condimentum donec
odio mauris. Tellus mauris nunc adipiscing tellus turpis at
ullamcorper turpis.
```

---

## 9. Internationalization (i18n)

### 9.1 Languages
| Language | Code | URL Pattern |
|----------|------|-------------|
| Dutch | `nl` | `/nl/...` or default |
| English | `en` | `/en/...` |

### 9.2 Translation Keys Needed
- Button labels:
  - "CONTACT" / "CONTACT" (same in both languages)
  - "NAAR CATALOGUS" / "TO CATALOG"
- Page titles:
  - "Catalogus" / "Catalog"
  - "Contact" / "Contact"
- Contact message:
  - "Wilt u een bestelling plaatsen of heeft u een vraag? Wij staan voor u klaar."
  - "Would you like to place an order or do you have a question? We are here for you."
- Tagline:
  - "Kranen met kwaliteit" / "Taps with quality"
- Pagination (if localized):
  - Page counter format may stay numeric: "40 / 92"
- Category names:
  - "Gun Metal" (likely same)
  - "Cloud" (likely same)
- Placeholder description (currently Lorem ipsum)

### 9.3 Catalog
- Catalog images are single-language (not translated)
- Can change between releases

---

## 10. Design Details from Screenshots

### 10.1 Header Component (All Pages)
- **Background:** Solid dark (#121111)
- **Logo:** "M" monogram, white, positioned top-left corner
- **Buttons (Top-Right):**
  - "CONTACT" - Outline button (transparent background, light border, light text)
  - "NAAR CATALOGUS" - Filled button (purple #2E00E5 background, light text)
- **Layout:** Fixed horizontal alignment, no hamburger menu visible
- **Height:** Compact, approximately 60-80px

### 10.2 Homepage Specific Details
- **Content Hierarchy (Left Column):**
  1. Lorem ipsum paragraph (top-left, small body text)
  2. "Kranen met kwaliteit" (mid-left, small text)
  3. "Maximo Design" (bottom-left, very large Abril Display)
- **Text Color:** All text appears in #EFEFEF (light gray)
- **Spacing:** Generous whitespace between elements
- **Hero Image:**
  - Shows gold faucet with curved spout
  - Black textured background (appears to be fabric or similar material)
  - Professional product photography lighting
- **Carousel Dots:**
  - 5-6 dots visible
  - Positioned bottom-right of hero image
  - One dot appears highlighted (active state)

### 10.3 Catalog Page Specific Details
- **Page Title "Catalogus":**
  - Centered horizontally
  - Positioned below header
  - Medium size text
- **Left Sidebar Details:**
  - Very narrow (estimated 80-100px)
  - Dark background matching page
  - Vertical white lines as section dividers
  - "Gun Metal" label visible
  - "Cloud" label visible below
  - Multiple small product thumbnails in grid
  - Each thumbnail shows faucet silhouette
- **Main Image:**
  - Large lifestyle/mood photograph
  - Shows kitchen faucet in styled setting
  - Dark surfaces, plants, white card, terracotta cup
  - Professional food/lifestyle photography aesthetic
- **Right Panel:**
  - "Gun Metal" title in white text
  - Description text below (smaller, gray)
  - Panel appears to overlay or sit beside main image
  - Dark semi-transparent background
- **Pagination Bar:**
  - Thin horizontal element at bottom center
  - < arrow | "40 / 92" | > arrow
  - Dark background with subtle borders
  - Text appears in light gray

### 10.4 Contact Page Specific Details
- **Left Column Layout:**
  - "Contact" title (large, white)
  - Message paragraph with inline bold formatting
  - "E-mail: sanisupply@info.nl" below message
  - All text left-aligned
  - Generous line spacing
- **Right Column Photo:**
  - Portrait of person in bright orange polo shirt
  - Looking upward and to the side
  - Soft outdoor lighting (blurred background suggests outdoor setting)
  - Professional but approachable feel
  - Warm color palette (contrasts with dark product photos elsewhere)
- **Column Split:** Approximately 40% text / 60% image

### 10.5 Visual Design Language
- **Overall Aesthetic:** Minimal, sophisticated, B2B luxury
- **Photography Style:** High-end product and lifestyle photography
- **Color Temperature:** Cool dark backgrounds with warm product accents (gold/brass)
- **Typography Hierarchy:** Clear, generous spacing, high contrast
- **Interaction Cues:** Subtle (dots for carousel, arrows for pagination)
- **White Space:** Generous use throughout all pages
- **Consistency:** Same header on all pages, consistent dark background

---

## 11. Summary of Simplifications

Given the budget constraint (< €500), the following simplifications apply:

1. **No footer** - Reduces development time
2. **No forms** - Direct email contact only
3. **No search** - Browse catalog only
4. **No user accounts** - Public site only
5. **No e-commerce** - B2B quote model
6. **Basic animations only** - Subtle hover/transitions
7. **Static catalog** - Images, not dynamic products
8. **Minimal SEO** - Basic meta tags only
9. **No analytics integration** - Can be added later
10. **No cookie consent** - Not tracking users
