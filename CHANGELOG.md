# CHANGELOG — Lotus Ceylon Tours Rebuild

All notable changes to the Lotus Ceylon web platform will be documented in this file.
The project adheres to strict phase gates, top international tour operator quality standards, and zero-plagiarism policies.

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
