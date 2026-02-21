# Maximo Design - Website Frontend Specification

**Figma Source:** https://www.figma.com/design/Ltuxg6pC7VELD9U1hG7cot/Maximo-Design

---

## 1. Overview

**Brand:** Maximo Design
**Industry:** Premium bathroom faucets/taps (kranen)
**Tagline:** "Kranen met kwaliteit" (Taps with quality)
**Contact:** sanisupply@info.nl

The website is a product catalog and brand showcase for Maximo Design, featuring high-quality bathroom faucets in various finishes.

---

## 2. Page Structure

### 2.1 Homepage
- **Layout:** Two-column split (text content left, hero image right)
- **Hero Image:** Gold faucet on dark textured background (right side, approx. 50% width)
- **Content Structure (Left Side):**
  - **Description:** Lorem ipsum text at top-left
  - **Tagline:** "Kranen met kwaliteit" positioned lower-left
  - **Brand Title:** "Maximo Design" prominently displayed at BOTTOM-left
- **Carousel Indicators:** Dot navigation at bottom-right (5-6 dots visible)

### 2.2 Catalog Page
- **Header:** "Catalogus" title centered at top
- **Left Sidebar:** Vertical filter navigation with:
  - Vertical line markers indicating categories
  - "Gun Metal" section with product thumbnail grid
  - "Cloud" section with product thumbnail grid
  - Each thumbnail shows miniature product image
- **Main Content Area:** Large centered lifestyle product image
- **Right Panel:**
  - Active category title (e.g., "Gun Metal")
  - Product description text below title
- **Bottom Navigation:**
  - Centered pagination with left/right arrows
  - Page counter in format "40 / 92"

### 2.3 Contact Page
- **Layout:** Two-column split (text left, photo right)
- **Left Column:**
  - **Title:** "Contact"
  - **Message:** "Wilt u een **bestelling** plaatsen of heeft u een **vraag**? Wij staan voor u klaar."
  - **Email:** "E-mail: sanisupply@info.nl"
- **Right Column:**
  - Large photo of person in orange shirt looking upward (professional portrait)

---

## 3. Layout Specifications

### 3.1 Breakpoints
| Breakpoint | Width | Notes |
|------------|-------|-------|
| Desktop | 1920px | Primary desktop layout |
| Tablet | 768px | Responsive tablet layout |

### 3.2 Grid System
- **Desktop:** 12-column grid with two-column content areas
- **Content Area:** Maximum width ~1920px
- **Gutters:** 30px left padding from edge
- **Header Height:** 119px

### 3.3 Key Measurements
| Element | Dimension |
|---------|-----------|
| Header height | 119px |
| Logo area | 58px x 49px |
| Navigation buttons | 180px x 49px, 310px x 49px |
| Hero image area | 960px x 961px |
| Catalog card height | 480px |
| Product thumbnail | ~75px x 96-98px |
| Large product view | 586px / 595px width |

---

## 4. Typography

### 4.1 Font Families
| Element | Font Family | Weight |
|---------|-------------|--------|
| Brand Title "Maximo Design" | Abril Display (licensed) | Regular |
| All Other Text | Montserrat | Regular/Bold |

### 4.2 Headings
| Element | Size | Usage |
|---------|------|-------|
| H1 / Brand Title | Very Large | "Maximo Design" at bottom-left of homepage |
| H2 / Page Title | Large | "Catalogus", "Contact" |
| H3 / Section Title | Medium | "Gun Metal" category title |
| Tagline | Small | "Kranen met kwaliteit" |

### 4.3 Body Text
| Element | Size | Usage |
|---------|------|-------|
| Description | Standard | Lorem ipsum intro text |
| Contact Text | Standard | Contact page message with bold keywords |
| Category Description | Small | Product finish descriptions |
| Buttons | Standard/Small Caps | "CONTACT", "NAAR CATALOGUS" |
| Pagination | Small | "40 / 92" page counter |

---

## 5. Color Palette

### 5.1 Product Finishes
These are key product categories that may influence UI accent colors:
- **Gun Metal** - Dark metallic finish
- **Cloud** - Light/silver finish
- **Goud (Gold)** - Golden/brass finish (visible in hero image)

### 5.2 UI Colors
| Usage | Color | Hex Code |
|-------|-------|----------|
| Background | Dark charcoal/black | #121111 |
| Text | Light gray/white | #EFEFEF |
| Primary Button | Electric blue/purple | #2E00E5 |
| Button Outline | Light gray border | #EFEFEF |
| Accent Lines | Thin dividers | Semi-transparent white |

---

## 6. Components

### 6.1 Header/Navigation
- **Logo:** "M" monogram positioned top-left corner
- **Navigation Items:** Two buttons in top-right corner
  - **"CONTACT" button:** Outline style (transparent with border)
  - **"NAAR CATALOGUS" button:** Filled purple (#2E00E5) button
- **Layout:** No traditional navigation links, only logo left and two action buttons right
- **Background:** Dark/black background throughout

### 6.2 Product Card (Catalog Preview)
- **Dimensions:** 930px x 480px (desktop), 768px x 480px (tablet)
- **Content:**
  - Product category image
  - Category title (e.g., "Brons kranen")
  - Page reference (e.g., "pg 05 - 11")

### 6.3 Catalog Filter Sidebar
- **Width:** ~80-100px (narrow vertical strip)
- **Structure:**
  - Vertical line markers indicating category sections
  - Category labels: "Gun Metal", "Cloud"
  - Product thumbnail grid (1-2 columns)
  - Miniature product images showing faucet designs
  - Visual hierarchy through spacing and vertical lines

### 6.4 Product Viewer
- **Layout:** Large centered lifestyle image with right-side info panel
- **Main Image:** Full-width lifestyle product photography showing faucet in styled setting (dark surfaces, plants, accessories)
- **Right Info Panel:**
  - Category title (e.g., "Gun Metal")
  - Description text
  - Positioned over/beside main image
- **Bottom Controls:** Centered pagination with arrows and page counter

### 6.5 Pagination Component
- **Layout:** Horizontal centered bar at bottom
- **Left Arrow:** Previous page navigation
- **Page Indicator:** "40 / 92" format showing current/total pages
- **Right Arrow:** Next page navigation
- **Style:** Minimalist with subtle borders and dark background

### 6.6 Footer
- **Note:** No footer present in design
- **All pages:** Content extends to bottom of viewport without footer section

---

## 7. Responsive Behavior

### 7.1 Desktop (1920px)
- Two-column layouts
- Hero image on right side
- Full catalog sidebar visible
- Large product views

### 7.2 Tablet (768px)
- Single-column stacked layout
- Hero image above content
- Catalog categories stacked vertically
- Full-width product cards
- Condensed navigation (hamburger menu icon)

---

## 8. Interactive Elements

### 8.1 Navigation
- Logo (links to home)
- Navigation menu items
- Mobile menu toggle

### 8.2 Catalog
- Filter sidebar (clickable finish options)
- Product thumbnail grid (selectable)
- Pagination controls (previous/next)
- Product category cards (clickable)

### 8.3 Contact
- Email link (mailto: sanisupply@info.nl)

---

## 9. Image Assets Required

| Asset Type | Description | Dimensions |
|------------|-------------|------------|
| Logo | Company logo "Middel 1100 1" | 58px x 49px |
| Hero Images | Product lifestyle photos | 960px x 961px |
| Category Images | Product category thumbnails | 930px x 480px |
| Product Thumbnails | Catalog grid items | ~75px x 96px |
| Product Detail | Large product images | 586px x 840px |
| Contact Image | Contact page imagery | 960px x 961px |

---

## 10. Implementation Notes

### 10.1 Layout Approach
- Use CSS Grid or Flexbox for main layouts
- Two-column split layouts for hero and contact sections
- Grid for product catalogs

### 10.2 Responsive Strategy
- Mobile-first or desktop-first approach
- Breakpoint at 768px for tablet layouts
- Single-column layouts on smaller screens

### 10.3 Navigation
- Sticky header recommended
- Responsive navigation (hamburger menu on mobile)

### 10.4 Catalog Functionality
- Filter by product finish (Gun Metal, Gold, Bronze, etc.)
- Paginated product viewing
- Product detail modal or page

---

## 11. Figma Frame Reference

| Frame Name | Dimensions | Description |
|------------|------------|-------------|
| Desktop - 18 | 1920x1071 | Homepage with hero |
| Desktop - 19 | 1920x1071 | Homepage variant |
| Desktop - 14 | 768x1297 | Tablet homepage |
| Desktop - 21 | 768x3412 | Tablet full page scroll |
| Desktop - 23 | 1920x1080 | Contact (centered) |
| Desktop - 24 | 1920x1080 | Contact (two-column) |
| Desktop - 27 | 1920x1090 | Catalog page |
| Desktop - 28 | 1920x1090 | Catalog variant |

---

## 12. Additional Considerations

### 12.1 Accessibility
- Ensure sufficient color contrast
- Alt text for all product images
- Keyboard navigation support
- ARIA labels for interactive elements

### 12.2 Performance
- Lazy loading for catalog images
- Optimized image formats (WebP with fallbacks)
- Responsive image srcsets

### 12.3 SEO
- Semantic HTML structure
- Product structured data
- Descriptive page titles and meta descriptions
