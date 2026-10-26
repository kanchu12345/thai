# Lotus Ceylon - Technical Diagnosis Report (Phase 0)

**Project**: Lotus Ceylon Luxury Tours (`https://kanchu12345.github.io/thai/` / `https://lotusceylon.com/`)  
**Backend**: Firebase Firestore (`louterst-36b64`), Cloudinary (`qmukrbh6`), Formspree  
**Hosting**: GitHub Pages (Static HTML)  
**Date**: October 2026  
**Status**: Diagnostic Complete (No code modifications in Phase 0)

---

## 1. End-to-End Trace: Tour Package Title & Hero Image Edit

To diagnose why changes saved in the admin panel do not appear on public website pages, we traced an edit from the Admin UI to the database and then to the public rendering code.

### A. The Admin Edit & Save Workflow
1. **User Action**: The administrator opens `admin/index.html`, selects a Tour Package (e.g. *Southern Sands Serenade* or *Royal Kingdoms & Sacred Temples*), changes the title to `"Southern Sands Serenade (Updated)"` and inputs/uploads a new hero image (e.g., `https://res.cloudinary.com/qmukrbh6/image/upload/v1/lotus/tours/new-hero.webp`).
2. **Admin Handler**: `AdminApp.savePackage()` inside `admin/js/admin-app.js` executes:
   - Constructs a package payload:
     ```javascript
     const payload = {
       id: pkgId || ('pkg-' + slug), // e.g. "pkg-beach-01"
       slug: slug, // "southern-sands-serenade"
       title: title, // "Southern Sands Serenade (Updated)"
       category: category,
       price_from: price,
       days: days,
       hero_image: heroImage, // "https://res.cloudinary.com/..."
       itinerary: [...],
       highlights: [...],
       updated_at: new Date().toISOString()
     };
     ```
3. **Firestore Writes Executed**:
   - `this.fbDb.collection('tours').doc(pkgId).set(payload, { merge: true })`
   - `this.fbDb.collection('packages').doc(pkgId).set(payload, { merge: true })`
   - If `pkgId !== slug`:
     - `this.fbDb.collection('tours').doc(slug).set(payload, { merge: true })`
     - `this.fbDb.collection('packages').doc(slug).set(payload, { merge: true })`
   - Also calls `window.LotusFirebase.savePackage(payload)`, which updates `tours/{pkgId}` and `packages/{pkgId}`.
4. **Local Admin Cache**:
   - Admin writes the updated in-memory package list to `localStorage.setItem('lotus_seed_catalog_cache_v2', ...)`.

---

### B. What Happens on the Public Pages
We inspect the public destination and package pages:
- Tour Detail Page: `tours/beach/southern-sands-serenade/index.html` (or `tours/cultural/royal-kingdoms-sacred-temples/index.html`)
- Catalog Page: `sri-lanka-tours.html`
- Homepage: `index.html`

1. **Scripts Loaded on the Public Page**:
   - `vendor/leaflet/leaflet.js`
   - `js/leaflet-tour-map.js`
   - `js/tour-interactive.js`
   - `js/site-translator.js`
   - `assets/js/config.js`
   - `assets/js/mobile-nav.js`
   - `assets/js/cms.js`
   - ⚠️ **Notice**: Firebase SDK (`firebase-app.js`, `firebase-firestore.js`) is **NOT imported** on public pages!
   - ⚠️ **Notice**: `js/firebase-tour-sync.js` is **NOT imported** on public pages!
2. **Execution Inside `assets/js/cms.js`**:
   - Line 128:
     ```javascript
     if (window.LotusFirebase && typeof window.LotusFirebase.fetchFirestoreCatalog === 'function' && navigator.onLine)
     ```
     Because `window.LotusFirebase` is `undefined`, this block evaluates to **`false`**.
   - Line 146:
     ```javascript
     // If no live Firestore data, load seed bundle
     const res = await fetch(getFallbackUrl()); // fetches static 'data/seed-catalog.json'
     ```
     The public site **never attempts to contact Firestore**. It exclusively fetches the static file `data/seed-catalog.json`.
3. **Persistent LocalStorage Cache Lock**:
   - Line 73: `this.data = this.readCache();`
   - Reads `localStorage.getItem('lotus_seed_catalog_cache_v2')`.
   - Once a visitor loads the page, the static `seed-catalog.json` payload is cached forever in localStorage with no version stamp, no expiration, and no query busting. Even if `seed-catalog.json` were redeployed, returning visitors see stale data.
4. **Hardcoded HTML Markup**:
   - The hero title in `tours/beach/southern-sands-serenade/index.html`:
     ```html
     <h1 class="tour-hero-title">
       <span class="hero-title-main">Southern Sands Serenade</span>
       <span class="hero-title-accent">Sun-Kissed Bays & Blue Whales</span>
     </h1>
     ```
   - The hero image:
     ```html
     <section class="tour-hero-section" id="tourHero" style="background-image: url('../../../assets/tours/beach/southern-sands-1.jpg');">
     ```
   - All itinerary days, hotels, meals, inclusions, FAQs, and overview descriptions are 100% hardcoded HTML.
   - There are **no data-binding attributes** (e.g. `data-cms="page.section.field"`).
   - In `cms.js`, line 245 only attempts `heroTitleMain.textContent = currentTour.title`. It does **not** update `#tourHero.style.backgroundImage`, nor does it update the tagline, itinerary, inclusions, or highlights.

---

### C. Exact Reasons Edits Do Not Show

| Factor | Diagnosis & Root Cause |
| :--- | :--- |
| **1. Hardcoded HTML** | All public HTML files contain static text, images, and inline styles with zero dynamic binding attributes. |
| **2. Missing Firebase Read Code** | Public pages do not import Firebase SDK or initialize a Firestore listener/fetcher; `window.LotusFirebase` is `undefined`. |
| **3. Offline/Fallback Trap** | Public hydration script exclusively falls back to bundled static file `data/seed-catalog.json`, which is frozen at build time. |
| **4. Aggressive Unversioned Caching** | `localStorage` key `lotus_seed_catalog_cache_v2` stores the static snapshot with no timestamp or version check. |
| **5. Image Path Mismatch** | Data files reference legacy paths like `assets/tours/beach/southern-sands-1.jpg` (or missing `.jpg` files), whereas the live site uses modern optimized WebP assets such as `assets/images/beach/mirissa-1.webp`. |
| **6. No Page-Level CMS Architecture** | Current Firestore only has `packages` and `tours` collections. There are no collections or documents for general page sections (Hero, About, Why Us, Sustainability, FAQ, Footer, Header, Menus). |

---

## 2. Complete Inventory of All Pages & Shared Components

Every page and shared component across the repository is audited below:

### A. Core Public Pages (19 Pages)

| Page Route | File Path | Content State |
| :--- | :--- | :---: |
| **Home** | `index.html` | **100% Hardcoded HTML** (Zero dynamic CMS bindings) |
| **About Us** | `about.html` | **100% Hardcoded HTML** (Fallback script checks team.json) |
| **Sri Lanka Tours (Catalog)** | `sri-lanka-tours.html` | **100% Hardcoded HTML** (11 static tour cards in HTML) |
| **Tours Alternative** | `tours.html` | **100% Hardcoded HTML** |
| **Destinations Index** | `destinations.html` | **100% Hardcoded HTML** (12 static destination cards) |
| **Curated Experiences** | `experiences.html` | **100% Hardcoded HTML** |
| **Visual Gallery** | `gallery.html` | **100% Hardcoded HTML** (Static image gallery items) |
| **Guest Reviews** | `reviews.html` | **100% Hardcoded HTML** (Static review testimonials) |
| **Travel Blog** | `blog.html` | **100% Hardcoded HTML** (Static blog articles) |
| **Contact Us & Headquarters**| `contact.html` | **100% Hardcoded HTML** (Static contact details and map) |
| **Quick Inquiry Form** | `inquiry-quick.html` | **100% Hardcoded HTML** (Static labels & placeholders) |
| **Detailed Travel Inquiry** | `inquiry-detailed.html`| **100% Hardcoded HTML** (Static multi-step form) |
| **404 Not Found** | `404.html` | **100% Hardcoded HTML** |
| **Privacy Policy** | `privacy-policy.html` | **100% Hardcoded HTML** |
| **Terms & Conditions** | `terms-conditions.html` | **100% Hardcoded HTML** |
| **Cancellation Policy** | `cancellation-policy.html`| **100% Hardcoded HTML** |
| **Cookie Policy** | `cookie-policy.html` | **100% Hardcoded HTML** |
| **Dynamic Category View** | `category.html` | **100% Hardcoded HTML** (Stub with JS fallback) |
| **Dynamic Detail View** | `tour-package-detail.html`| **100% Hardcoded HTML** (Stub with JS fallback) |

### B. Category Index Pages (11 Pages)

| Category Page | File Path | Content State |
| :--- | :--- | :---: |
| **Cultural Tours** | `cultural-tours.html` | **100% Hardcoded HTML** |
| **Buddhist Heritage Tours** | `buddhist-heritage-tours.html` | **100% Hardcoded HTML** |
| **Wildlife Safaris** | `wildlife-tours.html` | **100% Hardcoded HTML** |
| **Beach & Coast** | `beach-tours.html` | **100% Hardcoded HTML** |
| **Hill Country & Tea** | `hill-country-tours.html` | **100% Hardcoded HTML** |
| **Ayurvedic Wellness** | `ayurvedic-tours.html` | **100% Hardcoded HTML** |
| **Honeymoon Romance** | `honeymoon-tours.html` | **100% Hardcoded HTML** |
| **Family Journeys** | `family-tours.html` | **100% Hardcoded HTML** |
| **Active Adventure** | `adventure-tours.html` | **100% Hardcoded HTML** |
| **Golf Tours** | `golf-tours.html` | **100% Hardcoded HTML** |
| **Ramayana Heritage** | `ramayana-tours.html` | **100% Hardcoded HTML** |

### C. Tour Detail & Category Subfolders (40 Pages)

| Directory Route | Itinerary Pages | Content State |
| :--- | :--- | :---: |
| `tours/` | `tours/index.html` | **100% Hardcoded HTML** |
| `tours/cultural/` | `index.html`, `royal-kingdoms-sacred-temples/`, `the-sacred-lotus-triangle/`, `three-millennia-of-living-heritage/` | **100% Hardcoded HTML** |
| `tours/buddhist-heritage/`| `index.html` | **100% Hardcoded HTML** |
| `tours/wildlife/` | `index.html`, `the-sri-lanka-big-five-expedition/`, `untamed-biosphere-rainforest-odyssey/`, `wild-ceylon-predator-elephant-trail/` | **100% Hardcoded HTML** |
| `tours/beach/` | `index.html`, `southern-sands-serenade/`, `pristine-seaboard-odyssey/`, `turquoise-eastern-sanctuary/` | **100% Hardcoded HTML** |
| `tours/hill-country/` | `index.html`, `ceylon-tea-trails-colonial-grandeur/`, `highland-wilderness-cascading-waterfalls/`, `misty-peaks-scenic-railways-expedition/` | **100% Hardcoded HTML** |
| `tours/ayurvedic/` | `index.html`, `lotus-ayu-holistic-rejuvenation/`, `sacred-serenity-forest-meditation-retreat/` | **100% Hardcoded HTML** |
| `tours/honeymoon/` | `index.html`, `enchanted-ceylon-romantic-hideaway/`, `pure-serenade-coastal-highland-romance/` | **100% Hardcoded HTML** |
| `tours/family/` | `index.html`, `the-grand-ceylon-family-adventure/`, `island-wonder-multi-gen-family-discovery/`, `wild-safari-coastal-family-holiday/` | **100% Hardcoded HTML** |
| `tours/adventure/` | `index.html`, `island-adrenaline-rapids-expedition/`, `wild-peaks-trails-surf-safari/` | **100% Hardcoded HTML** |
| `tours/golf/` | `index.html`, `the-royal-ceylon-fairways-tour/`, `the-grand-ceylon-masters-golf-odyssey/`, `highland-greens-coastal-links-championship/` | **100% Hardcoded HTML** |
| `tours/ramayana/` | `index.html`, `sacred-ramayana-heritage-trail/`, `the-epic-ramayana-chronicle-pilgrimage/` | **100% Hardcoded HTML** |
| `tours/detail.html` | `detail.html` | **100% Hardcoded HTML** |

### D. Shared Site Components (7 Components)

| Component | Selector / Location | Content State |
| :--- | :--- | :---: |
| **Site Header & Logo** | `.site-header-walkers` | **100% Hardcoded HTML** across all 70 pages |
| **Desktop Mega-Menu** | `.walkers-nav`, `.walkers-megamenu` | **100% Hardcoded HTML** |
| **Mobile Drawer Menu** | `#mobileNavFullscreen` | **100% Hardcoded HTML** |
| **Language Switcher** | `#langPillMenu`, `#mobileLangGrid` | **100% Hardcoded HTML** |
| **Floating Action Group**| `#unifiedFabGroup` (WhatsApp + Top) | **100% Hardcoded HTML** |
| **Floating Inquire Tab** | `.floating-inquire-tab` | **100% Hardcoded HTML** |
| **Site Footer** | `#siteFooter` | **100% Hardcoded HTML** across all 70 pages |

---

## 3. Current Firestore Collections & Cloudinary Usage in Admin Panel

### A. Firestore Collections

| Collection Name | Document ID Convention | Purpose in Current Admin | Status & Deficiencies |
| :--- | :--- | :--- | :--- |
| `admins` | `{uid}` or `{email}` | RBAC role management (`role: 'super_admin' \| 'editor'`) | Working for authentication |
| `tours` | `{pkgId}` / `{slug}` | Tour package documents | Flat documents; only updated for packages; no page-level data |
| `packages` | `{pkgId}` / `{slug}` | Duplicate mirror of `tours` | Redundant duplication; writes executed twice |
| `categories` | `{slug}` | Tour categories list | Only 8-10 basic categories; no field translations |
| `destinations` | `{slug}` | Destination items | Limited to thumbnail and brief text |
| `testimonials` / `reviews` | `{id}` | Guest reviews | Stored flatly; no page-section mapping |
| `inquiries` | Auto-ID | Customer inquiries from forms | Stored correctly |
| `activityLog` | Auto-ID | Audit trail of admin actions | Stored correctly |
| **MISSING**: `siteContent` | `{pageId}` | **Does NOT exist yet**. Required for page-by-page section/field editing. |
| **MISSING**: `siteGlobal` | `{componentId}` | **Does NOT exist yet**. Required for shared header, footer, branding, menus. |
| **MISSING**: `media` | `{id}` | **Does NOT exist yet**. Required for central Media Library. |

### B. Cloudinary Usage

1. **Configuration in `js/config.js`**:
   - `cloudName`: `"qmukrbh6"`
   - `uploadPreset`: `"lotus_tours_unsigned"`
   - `folder`: `"lotus/tours"`
2. **Current Admin Functionality**:
   - `uploadBlobToCloudinary(blob, filename)`: Sends an unsigned POST request to:
     `https://api.cloudinary.com/v1_1/qmukrbh6/image/upload`
   - Injects `f_auto,q_auto` into the returned `secure_url`.
   - Used only inside the "Save Package" and "Direct Local File Upload" modals.
3. **Current Flaws**:
   - No Media Library database collection (`media/{id}`); uploaded files are stored only in individual form inputs.
   - When administrators edit pages, there is no reusable asset browser to pick previously uploaded images.
   - Existing default website images (such as `assets/images/beach/mirissa-1.webp` or `assets/images/home/hero-sigiriya-aerial-1.webp`) have no corresponding Cloudinary or media library entries, causing previews to fail when relative paths are entered.

---

## 4. Architectural Roadmap (Phases 1 through 5)

Based on this diagnosis, the remediation roadmap is defined as follows:

```
[Phase 0: Diagnosis Complete]
           │
           ▼
[Phase 1: Content Layer]
  ├── Create Firestore schema: siteContent/{pageId}, siteGlobal/{...}, collections, media/{id}
  ├── Build lightweight universal assets/js/cms.js:
  │     ├── data-cms="page.section.field", data-cms-img, data-cms-bg, data-cms-video, data-cms-link, data-cms-html
  │     ├── Firestore snapshot + version-stamped cache invalidation
  │     ├── Multilingual resolution (10 languages with English fallback, Arabic RTL)
  │     └── Cloudinary & relative path resolver
  └── Inject data-cms attributes across all 70 HTML pages & shared components
           │
           ▼
[Phase 2: Auto-Seed Content]
  ├── scripts/scan-cms.js: Scans all HTML pages -> creates cms-registry.json
  ├── scripts/seed-firestore.js: Imports registry defaults into Firestore (never overwriting edits)
  └── Seed media library with all existing local images
           │
           ▼
[Phase 3: Admin Panel Restructure]
  ├── Page-by-Page Sidebar: Home, About, Contact, Tours, etc.
  ├── Page Editor with Section Accordions, Field Controls, and 10-Language Tabs
  ├── Reusable Media Library with Cloudinary Uploads & Image Picker
  └── Draft / Preview (?preview=token) / Publish workflow with live iframe preview
           │
           ▼
[Phase 4: Security & Reliability]
  ├── Firestore Security Rules: published content readable, admin/editor write only
  ├── Snapshot build script for instant static loads & SEO
  └── Graceful fallback: 100% resilient when Firebase is unconfigured or offline
           │
           ▼
[Phase 5: Verification & Delivery]
  ├── Cross-device verification (Desktop, Android 360-412px)
  └── Complete documentation (CMS_GUIDE.md, CHANGELOG.md)
```

---
*Diagnosis complete. Ready to proceed to Phase 1 upon confirmation.*
