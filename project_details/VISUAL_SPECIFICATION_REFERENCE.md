# Maximo Design - Visual Specification Reference

**Quick reference guide for developers implementing the design**

---

## Global Styles

```css
/* Color Variables */
:root {
  --bg-dark: #121111;
  --text-light: #EFEFEF;
  --primary-purple: #2E00E5;
  --border-light: #EFEFEF;
}

/* Typography */
--font-brand: 'Abril Display', serif;  /* "Maximo Design" ONLY */
--font-body: 'Montserrat', sans-serif; /* Everything else */
```

---

## Header Component (All Pages)

```
┌─────────────────────────────────────────────────────────────┐
│  M                              [CONTACT] [NAAR CATALOGUS]  │
└─────────────────────────────────────────────────────────────┘
```

**Specs:**
- Height: ~60-80px
- Background: #121111
- Logo "M": White, top-left, ~20-30px from edges
- Buttons: Top-right, ~20-30px from edges
  - "CONTACT": Outline (transparent bg, #EFEFEF border, #EFEFEF text)
  - "NAAR CATALOGUS": Filled (#2E00E5 bg, #EFEFEF text)
- Button text: UPPERCASE, Montserrat

---

## Homepage Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Header (see above)                                         │
├──────────────────────────────┬──────────────────────────────┤
│                              │                              │
│  Lorem ipsum dolor sit amet  │                              │
│  consectetur. Gravida...     │                              │
│                              │                              │
│                              │      [Gold Faucet Photo]     │
│  Kranen met kwaliteit       │      on dark background      │
│                              │                              │
│                              │                              │
│  Maximo Design              │                     ○ ○ ● ○ ○ │
│  (Very large, Abril)         │                   (carousel)  │
└──────────────────────────────┴──────────────────────────────┘
```

**Layout:**
- Two equal columns (50/50)
- Left: Text content with vertical spacing
- Right: Hero image + carousel dots

**Left Column Hierarchy:**
1. Description paragraph (top) - small, Montserrat
2. Tagline (middle) - small, Montserrat
3. Brand title (bottom) - very large, Abril Display

**Right Column:**
- Full-height image
- Carousel dots: absolute positioned bottom-right
- 5-6 dots, filled dot = active slide

---

## Catalog Page Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Header (see above)                                          │
├──────────────────────────────────────────────────────────────┤
│                        Catalogus                             │
├───┬──────────────────────────────────────────────┬──────────┤
│   │                                              │          │
│ G │                                              │ Gun Metal│
│ u │                                              │          │
│ n │        [Large Lifestyle Photo]              │ Descrip- │
│   │                                              │ tion text│
│ M │        Kitchen faucet with                   │ about    │
│ e │        plants, surfaces, etc.                │ category │
│ t │                                              │          │
│ a │                                              │          │
│ l │                                              │          │
│───│                                              │          │
│   │                                              │          │
│ C │                                              │          │
│ l │                                              │          │
│ o │                                              │          │
│ u │                                              │          │
│ d │                                              │          │
│   │                                              │          │
├───┴──────────────────────────────────────────────┴──────────┤
│                   <    40 / 92    >                          │
└──────────────────────────────────────────────────────────────┘
```

**Layout:**
- Three sections: Sidebar | Main | Info Panel
- Sidebar: ~80-100px wide
- Main: Majority of width (~60-70%)
- Info Panel: ~200-300px wide

**Sidebar:**
- Vertical white lines separate categories
- Category labels rotated/vertical or horizontal
- Grid of small faucet thumbnails (1-2 columns)
- Dark background

**Main Image:**
- Large centered lifestyle photograph
- Styled product photography
- Dark, sophisticated aesthetic

**Right Info Panel:**
- Category title (large, white)
- Description text (smaller, light gray)
- Semi-transparent dark background

**Pagination:**
- Centered horizontal bar
- < | 40 / 92 | >
- Dark background, light borders

---

## Contact Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Header (see above)                                         │
├───────────────────────────┬─────────────────────────────────┤
│                           │                                 │
│  Contact                  │                                 │
│                           │                                 │
│  Wilt u een bestelling   │                                 │
│  plaatsen of heeft u een │     [Portrait Photo]            │
│  vraag? Wij staan voor   │                                 │
│  u klaar.                 │     Person in orange shirt      │
│                           │     looking upward              │
│  E-mail:                  │                                 │
│  sanisupply@info.nl      │                                 │
│                           │                                 │
└───────────────────────────┴─────────────────────────────────┘
```

**Layout:**
- Two columns: ~40% text / ~60% image
- Left: Contact info, left-aligned
- Right: Portrait photo

**Left Column:**
- "Contact" title (large)
- Message with bold keywords ("bestelling", "vraag")
- Email below message
- All white/light text on dark background

**Right Column:**
- Full-height portrait photo
- Warm, bright image (contrasts with dark UI)
- Professional but approachable

---

## Component Details

### Button Styles

**Outline Button (CONTACT):**
```css
.button-outline {
  background: transparent;
  border: 1px solid #EFEFEF;
  color: #EFEFEF;
  padding: 12px 24px;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
}
```

**Filled Button (NAAR CATALOGUS):**
```css
.button-filled {
  background: #2E00E5;
  border: none;
  color: #EFEFEF;
  padding: 12px 24px;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
}
```

### Carousel Dots

```css
.carousel-dots {
  display: flex;
  gap: 8px;
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(239, 239, 239, 0.3);
}

.dot.active {
  background: #EFEFEF;
}
```

### Pagination

```css
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 16px;
  background: #121111;
  border: 1px solid rgba(239, 239, 239, 0.2);
}

.pagination-arrow {
  cursor: pointer;
  color: #EFEFEF;
}

.pagination-counter {
  color: #EFEFEF;
  font-family: 'Montserrat', sans-serif;
}
```

---

## Typography Scale

```css
/* Recommended sizes */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;
--text-5xl: 48px;
--text-6xl: 60px;
--text-7xl: 72px;
--text-8xl: 96px;

/* Usage */
Button text: --text-sm (uppercase)
Body text: --text-base
Category title: --text-2xl
Page title: --text-3xl
Brand "Maximo Design": --text-7xl or --text-8xl (Abril Display)
```

---

## Spacing System

```css
/* Consistent spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;

/* Usage */
Button padding: --space-md --space-lg
Section padding: --space-2xl
Component gap: --space-lg
```

---

## Responsive Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1920px; /* Large screens */

/* Design is at 1920px, scales down */
```

---

## Image Specifications

| Asset | Size/Ratio | Format | Notes |
|-------|------------|--------|-------|
| Logo "M" | SVG preferred | SVG/PNG | White version, transparent bg |
| Hero images | 960x961px | JPG/WebP | High quality, dark backgrounds |
| Catalog lifestyle | ~1200px wide | JPG/WebP | Professional photography |
| Catalog thumbnails | ~75x96px | JPG/WebP | Small, clear silhouettes |
| Contact portrait | ~800px wide | JPG/WebP | Bright, warm tones |

---

## Animation Guidelines

```css
/* Subtle transitions only */
.button {
  transition: all 0.2s ease;
}

.button:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.carousel {
  transition: transform 0.5s ease-in-out;
}

/* Keep animations minimal and fast */
```

---

## Accessibility Notes

- Ensure color contrast meets WCAG AA (white text on dark bg = good)
- All buttons need focus states
- Carousel needs keyboard navigation
- Images need descriptive alt text
- Links need clear hover/active states
- Consider dark/light mode toggle for future

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge latest versions)
- CSS Grid and Flexbox required
- WebP images with JPG fallback
- No IE11 support needed

---

**Reference Screenshots:**
- `/home/jelle/dev/maximo_design/project_details/landing_page.png`
- `/home/jelle/dev/maximo_design/project_details/catalog.png`
- `/home/jelle/dev/maximo_design/project_details/contact.png`
