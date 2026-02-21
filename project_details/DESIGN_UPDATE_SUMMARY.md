# Design Specification Update Summary

**Date:** 2026-01-03
**Updated Files:**
- `/home/jelle/dev/maximo_design/project_details/design_specification.md`
- `/home/jelle/dev/maximo_design/project_details/refined_specification.md`

**Source Screenshots:**
- `/home/jelle/dev/maximo_design/project_details/landing_page.png`
- `/home/jelle/dev/maximo_design/project_details/catalog.png`
- `/home/jelle/dev/maximo_design/project_details/contact.png`

---

## Major Design Changes Documented

### 1. Header Navigation (CRITICAL UPDATE)

**Previous Understanding:**
- Traditional navigation links
- Large navigation buttons (310px x 49px and 180px x 49px)

**Actual Design:**
- **Logo:** "M" monogram (top-left)
- **Two action buttons only (top-right):**
  - "CONTACT" - Outline button (transparent with border)
  - "NAAR CATALOGUS" - Filled purple button (#2E00E5)
- **No traditional nav menu**
- Consistent across all pages

### 2. Homepage Layout (SIGNIFICANT CHANGES)

**Previous Understanding:**
- Brand title at top
- Description below
- CTA button "Bekijk catalogus"

**Actual Design:**
- **Two-column layout** (50/50 split)
- **Left column content order:**
  1. Lorem ipsum description (TOP)
  2. "Kranen met kwaliteit" tagline (MIDDLE)
  3. "Maximo Design" brand title (BOTTOM) - Abril Display font
- **Right column:** Gold faucet hero image on dark textured background
- **Carousel dots:** 5-6 indicators at bottom-right of hero image
- **NO "Bekijk catalogus" button** - navigation via header only

### 3. Catalog Page Layout (MAJOR RESTRUCTURE)

**Previous Understanding:**
- Two-column product viewer
- Product numbers in sidebar cells
- Categories: Gun Metal, Goud (Gold), Brons (Bronze)

**Actual Design:**
- **Three-column layout:**
  - **Left sidebar (~80-100px wide):**
    - Vertical line markers for category sections
    - "Gun Metal" section with thumbnails
    - "Cloud" section with thumbnails (NOT "Goud")
    - Miniature faucet images in grid
  - **Center (majority of width):**
    - Large lifestyle product image
    - Styled photography (faucet with plants, surfaces, design objects)
  - **Right panel:**
    - Active category title (e.g., "Gun Metal")
    - Product description text
- **"Catalogus" title:** Centered at top of page
- **Bottom pagination:** Centered bar with arrows and "40 / 92" counter

### 4. Contact Page Layout (UPDATED)

**Previous Understanding:**
- Two layout options (centered OR two-column)
- Image placement uncertain

**Actual Design:**
- **Two-column layout** (confirmed)
- **Left column (~40% width):**
  - "Contact" title
  - Message with bold keywords: "Wilt u een **bestelling** plaatsen of heeft u een **vraag**? Wij staan voor u klaar."
  - "E-mail: sanisupply@info.nl"
- **Right column (~60% width):**
  - Large portrait photo
  - Person in bright orange shirt
  - Looking upward, outdoor lighting
  - Warm, approachable aesthetic

### 5. Color Palette Confirmed

**Updates:**
- Background: `#121111` (dark charcoal/black) - CONFIRMED
- Text: `#EFEFEF` (light gray) - CONFIRMED
- Primary button: `#2E00E5` (electric blue/purple) - CONFIRMED
- Outline button border: `#EFEFEF` - NEW
- Accent lines: Semi-transparent white - NEW

### 6. Typography Confirmed

**Updates:**
- "Maximo Design" ONLY uses Abril Display font
- ALL other text uses Montserrat
- Button text appears in UPPERCASE
- Contact page uses inline bold for keywords

### 7. Product Categories Update

**Previous Categories:**
- Gun Metal
- Goud (Gold)
- Brons (Bronze)

**Actual Categories Visible:**
- Gun Metal ✓
- Cloud (NEW - replaces or supplements Goud)

Note: Only Gun Metal and Cloud are visible in catalog screenshot. Other categories may exist but not shown.

---

## New Components Documented

### Homepage Carousel
- Dot indicators (5-6 dots)
- Positioned bottom-right of hero image
- Active state indicator visible
- Suggests multiple hero images available

### Catalog Sidebar Navigation
- Vertical line markers as visual separators
- Category labels with thumbnail grids
- Narrow strip design (~80-100px)
- Scrollable thumbnail grid per category

### Pagination Component
- Horizontal centered bar
- Left arrow | Page counter | Right arrow
- Format: "40 / 92" (current / total)
- Minimalist dark design with subtle borders

---

## Assets Required from Client

**Updated list based on screenshots:**

1. **Logo:** "M" monogram (white/light version)
2. **Abril Display font file** (licensed, self-hosted)
3. **Homepage hero images:**
   - Gold faucet on dark background (shown)
   - 4-5 additional carousel images
4. **Catalog lifestyle images:**
   - Large styled product photography
   - Multiple images per category
   - Professional lifestyle aesthetic
5. **Catalog thumbnails:**
   - Small faucet silhouettes
   - For sidebar navigation
   - Per product/variant
6. **Contact portrait photo:**
   - Person in orange shirt (shown) or similar
   - Professional but approachable

---

## Implementation Notes

### Navigation Behavior
- Header buttons navigate between pages
- "CONTACT" → Contact page
- "NAAR CATALOGUS" → Catalog page
- Logo likely links to homepage

### Carousel Implementation
- Homepage hero section needs image slider
- Dot navigation for manual control
- Auto-play behavior TBD
- Transition animations should be subtle

### Catalog Filtering
- Click category in sidebar to filter/navigate
- Main image and right panel update to show category
- Pagination navigates within selected category
- Sidebar remains visible for category switching

### Responsive Considerations
- Header buttons may need to collapse on mobile
- Two-column layouts stack to single column
- Sidebar may become horizontal filter bar
- Images scale appropriately

---

## Questions for Client (If Needed)

1. How many total hero images for homepage carousel?
2. Complete list of product categories beyond Gun Metal and Cloud?
3. Do catalog pages show multiple products or one product per page?
4. Should clicking thumbnails in sidebar jump to specific pages?
5. Alternative contact portrait photo if current one unavailable?

---

## Files Updated

### design_specification.md
- Updated all page structure sections (2.1, 2.2, 2.3)
- Updated header/navigation component (6.1)
- Updated color palette section (5)
- Updated typography section (4)
- Updated catalog sidebar component (6.3)
- Updated product viewer component (6.4)
- Updated pagination component (6.5)
- Updated footer section (6.6) - confirmed NO footer

### refined_specification.md
- Completely rewrote page descriptions (4.1, 4.2, 4.3)
- Updated site structure diagram (3)
- Added global header specification
- Updated features list (5.1) - added carousel, pagination details
- Updated assets required (6.1) - comprehensive list
- Updated translation keys (9.2) - accurate button labels
- **Added new section 10:** "Design Details from Screenshots" with comprehensive visual specifications

---

## Next Steps for Development

1. **Set up header component** with M logo and two action buttons
2. **Implement homepage** with two-column layout and carousel
3. **Build catalog viewer** with sidebar navigation and pagination
4. **Create contact page** with two-column layout
5. **Gather all required image assets** from client
6. **Set up Abril Display font** (licensed, self-hosted)
7. **Implement responsive breakpoints** for mobile/tablet

---

**Confidence Level:** HIGH - All three pages now have accurate, screenshot-verified specifications.
