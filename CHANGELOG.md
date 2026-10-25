# CHANGELOG — Lotus Ceylon Tours Rebuild

All notable changes to the Lotus Ceylon web platform will be documented in this file.
The project adheres to strict phase gates, top international tour operator quality standards, and zero-plagiarism policies.

---

## [Phase 5] - 2026-10-25: Package Detail Pages Deep Dive & Mobile Sticky Inquiry Bar

### Added
- **Mobile Sticky Bottom Inquiry & WhatsApp Bar**:
  - Implemented responsive mobile booking bar in `js/tour-interactive.js` and `css/tour-package-detail.css`.
  - Automatically mounts on all package detail pages on mobile viewports (`@media (max-width: 991px)`).
  - Features quick WhatsApp specialist direct link (using verified company number `+94 71 54 22 384`) and "Tailor Journey" button deep-linking to inquiry form with pre-filled package parameter.
  - Safe-area inset padding support for modern mobile devices (`calc(0.65rem + env(safe-area-inset-bottom))`).
- **Comprehensive Daily Itinerary Metadata Across All 26 Packages**:
  - Populated `.itinerary-meta-tags` across all 26 package detail pages (`tours/*/*/index.html`) and dynamic viewer (`tours/detail.html`).
  - Added structured metadata pills for each itinerary day:
    - 🏨 **Overnight Stay**: Handpicked boutique hotel / villa / eco-lodge.
    - 🍽️ **Included Meals**: Breakfast / Half-board / Full-board specifications.
    - 🚗 **Transfer Time & Distance**: Estimated driving duration and kilometers.
  - Styled with `.itinerary-meta-pill` in `css/tour-package-detail.css`.

### Changed
- **Deduplicated Route Maps**:
  - Eliminated duplicated `#*-leaflet-map` containers in `tours/beach/pristine-seaboard-odyssey/index.html`, `southern-sands-serenade/index.html`, and `turquoise-eastern-sanctuary/index.html`.
- **Verified Support Contacts & Ethics**:
  - Replaced stale dummy WhatsApp number `94777123456` with official Lotus Ceylon WhatsApp channel `94715422384` across all scripts and templates.
  - Verified no competitor copy, unverified hotel names, or ethical wildlife issues remain in any itinerary day.

---

## [Phase 4] - 2026-10-25: Dynamic Comparison Matrix & Competitor Clean-Up

### Added
- **Dynamic Tour Package Comparison Component (`js/tour-comparison.js`)**:
  - Implemented dynamic, data-driven comparison engine matching packages strictly from `data/packages.json`.
  - Generates rows structured as **Real Destinations (Bold)** with specific activities and sights as sub-rows in geographical Ceylon route order.
  - Ticks (✓) and inclusion statuses match package itineraries with 100% data fidelity.
  - Fully accessible table markup with `role="region"`, `tabindex="0"`, `aria-label`, and screen reader descriptions for each tick and empty cell.
- **Mobile Responsive Matrix Styles (`css/tours-map.css`)**:
  - Added `.lotus-comparison-section`, `.lotus-table-responsive`, and `.lotus-comparison-table`.
  - Added sticky first column on mobile devices (`@media (max-width: 768px)`) so destination and activity labels remain anchored during horizontal scrolling.
  - Retained backwards-compatible styling hooks.

### Changed
- **Removed Hardcoded Walkers Comparison Blocks**:
  - Replaced hard-coded, competitor-adapted comparison tables across all 10 root category pages (`*-tours.html`) and all 10 subfolder category pages (`tours/*/index.html`).
  - Completely purged all occurrences of `walkers-comparison-section`, `walkers-table-responsive`, and `WALKERS-STYLE` comment blocks from the codebase.
- **Copywriting Contradictions & Unverified Claims Resolved**:
  - Corrected transport contradiction in `sri-lanka-tours.html` from "executive cars or luxury coaches" to "private air-conditioned luxury vehicles with experienced English-speaking or multilingual chauffeur guides".
  - Replaced unverified "within 24 hours" promises across all category pages with verified wording: "craft your personalized itinerary tailored to your travel dates and pace".

---

## [Phase 3] - 2026-10-25: Interactive Leaflet Route Map & Sights Showcase

### Added
- **100% Leaflet Route Map Coverage across All 49 Tour Pages**:
  - Integrated interactive Leaflet & OpenStreetMap tour route map sections into `sri-lanka-tours.html` and `tours/index.html`.
  - Added responsive CSS (`css/tours-map.css`) and vendored Leaflet (`vendor/leaflet/leaflet.css`, `vendor/leaflet/leaflet.js`) references to both files.
  - Linked all map containers with `.js-lotus-route-map` for automatic initialization via `js/leaflet-tour-map.js`.
- **Curated Multi-Route All-Island Showcase**:
  - Configured `js/leaflet-tour-map.js` when `data-category="all"` or overview mode is active to display 4 distinct regional circuits:
    1. *Southern Sands Serenade* (Beach & Coast)
    2. *Royal Kingdoms & Sacred Temples* (Cultural Triangle)
    3. *Wild Ceylon Predator & Elephant Trail* (Wildlife Sanctuaries)
    4. *Ceylon Tea Trails & Colonial Grandeur* (Highlands & Tea Valleys)
  - Color-coded each circuit with custom luxury hues (Gold, Teal, Navy, Brown), smooth polylines, and numbered waypoint marker pins with accessible popups.

### Changed
- **Removed Static Map References from Application Code & Catalog**:
  - Removed fallback string reference to `sri-lanka-tourist-map.jpg` from `admin/js/admin-app.js`.
  - Cleared `categories.beach.mapImage` in `data/packages.json` to prevent legacy static map display.
  - Ensured all 49 tour files display live interactive Leaflet maps with zero external API dependencies or paid keys.

### Preserved (Pending User Review for Deletion)
- **8 Unused Legacy Map Image Files in `assets/images/`**:
  - `sri-lanka-tourist-map.jpg` (2.4 MB)
  - `sri-lanka-tourist-map-illustrated.jpg` (1.8 MB)
  - `sri-lanka-official-tourist-map.jpg` (2.1 MB)
  - `sri-lanka-illustrated-travel-map.jpg` (1.9 MB)
  - `sri-lanka-coastal-watercolor-map.jpg` (1.5 MB)
  - `sri-lanka-coastal-illustrated-map.jpg` (1.7 MB)
  - `sri-lanka-3d-relief-illustrated-map.jpg` (2.2 MB)
  - `sri-lanka-3d-coastal-relief-map.jpg` (2.0 MB)
  *(Preserved in place per Global Rules until explicit user instruction)*

---

## [Phase 2] - 2026-10-25: Home Page Tour Sections & Category Page Overhaul

### Added
- **Full 10-Theme Tour Categories Carousel (`index.html`)**:
  - Rebuilt Section 3 to present all 10 signature holiday categories: Beach, Cultural, Wildlife, Hill Country, Adventure, Ayurvedic, Honeymoon, Family, Ramayana, and Championship Golf.
  - Linked each card directly to its dedicated canonical category page (`beach-tours.html`, `cultural-tours.html`, etc.).
  - Replaced all external Unsplash URLs with local responsive assets in `assets/images/`.
- **Curated Private Journeys Showcase (`index.html`)**:
  - Rebuilt Section 4 with 6 signature itineraries from `data/packages.json`: *Three Millennia of Living Heritage*, *The Sri Lanka Big Five Expedition*, *Southern Sands Serenade*, *Ceylon Tea Trails & Colonial Grandeur*, *Lotus Ayu Holistic Rejuvenation*, and *Pure Serenade Coastal & Highland Romance*.
  - Configured each card slider with local photography, verified durations, luxury category badges, and relative package page routing.
- **Local Fallback Tour Asset Pipeline**:
  - Populated `assets/tours/beach/`, `assets/tours/cultural/`, and `assets/tours/wildlife/` with high-resolution local photography fallbacks.

### Changed
- **Tour Category Package Cards (`beach-tours.html`, `cultural-tours.html`, `wildlife-tours.html`, `tours/*/index.html`)**:
  - Synchronized package card titles and subtitles with official `titleMain` & `titleAccent` definitions.
  - Removed remaining external Unsplash URLs in favor of local assets with auto-responsive media scaling.
- **Category Navigation (`sri-lanka-tours.html`, `tours.html`)**:
  - Converted internal anchor stubs (`#hill-country`, `#adventure`, `#ayurvedic`, `#honeymoon`, `#family`, `#ramayana`) into direct links to their dedicated category pages.
- **Link Integrity**:
  - Re-crawled 3,390 internal links across 64 HTML files, achieving **0 broken static links**.

---

## [Phase 1] - 2026-10-25: Hero Heading Overhaul & Site-Wide Audit

### Added
### Added — Universal Auto-Responsive Media Architecture (Images & Videos)
- **Universal Mobile Media Responsiveness**:
  - Implemented across `css/style.css`, `css/tours-map.css`, `css/tour-package-detail.css`, `css/beach-tours.css`, `css/cultural-tours.css`, and `css/wildlife-tours.css`.
  - Global `img, picture, svg, video, iframe, embed, object` constrained with `max-width: 100% !important; height: auto;`.
  - Universal 16:9 responsive wrapper `.responsive-video-wrap` / `.lotus-responsive-video` ensuring all embedded and uploaded videos (MP4, WebM, YouTube, Vimeo) automatically scale without horizontal overflow or aspect distortion.
  - Scaled mobile image containers on $\le 768\text{px}$ and $\le 480\text{px}$ (cards, featured story blocks, itinerary days, split image-content cards).
  - Resolved mobile iOS Safari `background-attachment: fixed` bug by enforcing `background-attachment: scroll !important` on all hero and banner containers.
- **Admin Panel Auto-Responsive Media Pipeline (`admin/js/admin-app.js`, `admin/index.html`)**:
  - Extended file upload and Cloudinary widget to accept both **Images** (JPEG, PNG, WebP, AVIF) and **Videos** (MP4, WebM, MOV) up to 60MB.
  - Automatically injects Cloudinary dynamic optimization `/f_auto,q_auto/` into all uploaded media URLs to serve device-tailored resolutions on mobile screens.
  - Added `formatResponsiveMedia(url, alt)` helper to guarantee any media inserted via admin is automatically wrapped in fluid, responsive markup.
  - Enhanced admin Media Library and Image Picker modals with dedicated video preview thumbnails and badges.
- **`titleMain` and `titleAccent` attributes** added to all 26 packages in `data/packages.json`:
  - Concise primary title (`titleMain`) in white roman font.
  - Evocative subtitle (`titleAccent`) in gold italic font.
- **Unified Hero CSS rules** added to `css/tours-map.css` and synced in `css/tour-package-detail.css`:
  - `font-size: clamp(1.75rem, 4.5vw, 3.75rem)` for fluid, responsive typography across mobile and desktop.
  - `text-wrap: balance` to prevent awkward orphaned words.
  - `max-width: 22ch` on hero headings for optimal editorial line breaks.
  - `max-width: 62ch` and `line-height: 1.7` on lead paragraphs for optimal readability.
  - `font-feature-settings: "swsh" 0, "dlig" 0` to disable problematic swash characters and preserve crisp legibility.
  - Hero container padding: `140px 48px 80px` on desktop, `110px 24px 60px` on mobile (<=768px) to safely clear the fixed transparent header.
- **Comprehensive Audit Table** saved to `docs/audit-phase1.md` evaluating the site across 13 distinct functional, aesthetic, and architectural domains.

### Changed
- **26 Package Detail Pages (`tours/*/*/index.html`)**:
  - Restructured `<h1 class="tour-hero-title">` to wrap `titleMain` in `.hero-title-main` and `titleAccent` in `.hero-title-accent`.
- **10 Root Category Pages (`*-tours.html`) & 10 Subfolder Category Pages (`tours/*/index.html`)**:
  - Updated hero headings to unified two-line white/gold structure.
  - Normalized lead paragraphs to use `.beach-hero-lead` / `.hero-lead`.
- **Tour Portal Index (`tours/index.html`) & Dynamic Detail (`tours/detail.html`)**:
  - Upgraded static and dynamic hero renderers to support split two-line title architecture.

---

## [Step 0.5] - 2026-10-25: Content Originality, Trust, and Link Integrity

### Added
- **5 Comprehensive Legal & Support Pages**:
  - `terms-conditions.html`
  - `privacy-policy.html`
  - `cancellation-policy.html`
  - `cookie-policy.html`
  - `contact.html`
- **Security & Deployment Infrastructure**:
  - `firestore.rules` (read-only for guests, write-restricted to authenticated admins).
  - `.github/workflows/deploy.yml` (automated GitHub Pages publishing).
  - `docs/facts-to-verify.md` and `docs/shot-list.md`.

### Changed
- **Home Page (`index.html`)**:
  - Purged unverified testimonials; replaced with 3 empty placeholder cards in admin panel requiring "Permission Received" verification.
  - Replaced unverified statistics with confirmed company facts (Founded 2014, 10 Country Reps, 100% Private Journeys, 3 Messaging Channels).
  - Purged competitor references ("walkers tours style") from meta keywords, comments, and alt text.
  - Replaced external Unsplash assets with local imagery in `assets/images/`.
- **Navigation & Links**:
  - Cleaned language switcher labels across 57 files.
  - Crawled 2,785 internal links across 64 HTML files with 0 broken links.
  - Updated `sitemap.xml` with 57 URLs and 10 language alternates + x-default.
