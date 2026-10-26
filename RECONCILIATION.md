# CMS Registry ↔ Firestore Seed Reconciliation Report

**Generated**: 2026-10-26T10:49:19.563Z
**Branch**: `cms-phase1`
**Status**: ✅ 100% PERFECT RECONCILIATION (0 Unmapped Keys)

## Executive Summary

| Metric | Count |
| :--- | :--- |
| **Total Core Pages Audited** | 52 |
| **Unique Global Field Bindings (`siteGlobal`)** | 42 |
| **Page-Specific Unique Bindings** | 7779 |
| **Total Unique Bindings Bound in HTML** | 7821 |
| **Total Field Bindings Seeded in Firestore Plan** | 7821 |
| **Total Unmapped Keys** | **0** |
| **Reconciliation Coverage Rate** | **100.00%** |

## Per-Collection Document Summary in Seed Plan

| Collection | Document Count | Contents & Schema Role |
| :--- | :--- | :--- |
| `siteMeta` | 1 | Version tracking document `{v: 1, updatedAt}` for zero-cost caching |
| `siteGlobal` | 6 | Deduplicated sub-docs: `branding`, `header`, `footer`, `contact`, `menu`, `social` |
| `siteContent` | 52 | Full text, headings, badges, and layout content for all 52 core pages |
| `tourCategories` | 11 | All 11 tour categories with rich metadata and page-specific attributes |
| `tourPackages` | 26 | All 26 luxury packages with itineraries, pricing, inclusions, and FAQs |
| `destinations` | 12 | Curated destination guides, regions, coordinates, and highlights |
| `team` | 2 | Verified executive leadership profiles from `data/team.json` |
| `blogPosts` | 5 | Editorial insights and news articles |
| `gallery` | 12 | Showcase image gallery cards across all regions |
| `forms` | 2 | Inquiry form validation schemas with honeypot definitions |
| `reviews` | 0 | **Purged** (Zero fake reviews seeded) |

## Comprehensive Per-Page Reconciliation Table

| # | Page / Document Path | Source HTML File | Bound Keys | Seeded Keys | Unmapped Keys | Status |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| 1 | `siteGlobal (Deduplicated Header/Footer/Contact)` | `Shared Components across 52 pages` | 42 | 42 | 0 | ✅ MATCH |
| 2 | `siteContent/home` | `index.html` | 292 | 292 | 0 | ✅ MATCH |
| 3 | `siteContent/about` | `about.html` | 148 | 148 | 0 | ✅ MATCH |
| 4 | `siteContent/contact` | `contact.html` | 85 | 85 | 0 | ✅ MATCH |
| 5 | `siteContent/destinations` | `destinations.html` | 196 | 196 | 0 | ✅ MATCH |
| 6 | `siteContent/experiences` | `experiences.html` | 151 | 151 | 0 | ✅ MATCH |
| 7 | `siteContent/gallery` | `gallery.html` | 148 | 148 | 0 | ✅ MATCH |
| 8 | `siteContent/reviews` | `reviews.html` | 75 | 75 | 0 | ✅ MATCH |
| 9 | `siteContent/blog` | `blog.html` | 71 | 71 | 0 | ✅ MATCH |
| 10 | `siteContent/inquiry-detailed` | `inquiry-detailed.html` | 115 | 115 | 0 | ✅ MATCH |
| 11 | `siteContent/inquiry-quick` | `inquiry-quick.html` | 88 | 88 | 0 | ✅ MATCH |
| 12 | `siteContent/privacy-policy` | `privacy-policy.html` | 80 | 80 | 0 | ✅ MATCH |
| 13 | `siteContent/terms-conditions` | `terms-conditions.html` | 75 | 75 | 0 | ✅ MATCH |
| 14 | `siteContent/cancellation-policy` | `cancellation-policy.html` | 77 | 77 | 0 | ✅ MATCH |
| 15 | `siteContent/cookie-policy` | `cookie-policy.html` | 71 | 71 | 0 | ✅ MATCH |
| 16 | `siteContent/toursIndex` | `tours/index.html` | 267 | 267 | 0 | ✅ MATCH |
| 17 | `tourCategories/adventure` | `tours/adventure/index.html` | 149 | 149 | 0 | ✅ MATCH |
| 18 | `tourPackages/island-adrenaline-rapids-expedition` | `tours/adventure/island-adrenaline-rapids-expedition/index.html` | 142 | 142 | 0 | ✅ MATCH |
| 19 | `tourPackages/wild-peaks-trails-surf-safari` | `tours/adventure/wild-peaks-trails-surf-safari/index.html` | 148 | 148 | 0 | ✅ MATCH |
| 20 | `tourCategories/ayurvedic` | `tours/ayurvedic/index.html` | 139 | 139 | 0 | ✅ MATCH |
| 21 | `tourPackages/lotus-ayu-holistic-rejuvenation` | `tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html` | 148 | 148 | 0 | ✅ MATCH |
| 22 | `tourPackages/sacred-serenity-forest-meditation-retreat` | `tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html` | 154 | 154 | 0 | ✅ MATCH |
| 23 | `tourCategories/beach` | `tours/beach/index.html` | 235 | 235 | 0 | ✅ MATCH |
| 24 | `tourPackages/pristine-seaboard-odyssey` | `tours/beach/pristine-seaboard-odyssey/index.html` | 161 | 161 | 0 | ✅ MATCH |
| 25 | `tourPackages/southern-sands-serenade` | `tours/beach/southern-sands-serenade/index.html` | 162 | 162 | 0 | ✅ MATCH |
| 26 | `tourPackages/turquoise-eastern-sanctuary` | `tours/beach/turquoise-eastern-sanctuary/index.html` | 157 | 157 | 0 | ✅ MATCH |
| 27 | `tourCategories/buddhist-heritage` | `tours/buddhist-heritage/index.html` | 104 | 104 | 0 | ✅ MATCH |
| 28 | `tourCategories/cultural` | `tours/cultural/index.html` | 222 | 222 | 0 | ✅ MATCH |
| 29 | `tourPackages/royal-kingdoms-sacred-temples` | `tours/cultural/royal-kingdoms-sacred-temples/index.html` | 144 | 144 | 0 | ✅ MATCH |
| 30 | `tourPackages/the-sacred-lotus-triangle` | `tours/cultural/the-sacred-lotus-triangle/index.html` | 150 | 150 | 0 | ✅ MATCH |
| 31 | `tourPackages/three-millennia-of-living-heritage` | `tours/cultural/three-millennia-of-living-heritage/index.html` | 163 | 163 | 0 | ✅ MATCH |
| 32 | `tourCategories/family` | `tours/family/index.html` | 182 | 182 | 0 | ✅ MATCH |
| 33 | `tourPackages/island-wonder-multi-gen-family-discovery` | `tours/family/island-wonder-multi-gen-family-discovery/index.html` | 151 | 151 | 0 | ✅ MATCH |
| 34 | `tourPackages/the-grand-ceylon-family-adventure` | `tours/family/the-grand-ceylon-family-adventure/index.html` | 159 | 159 | 0 | ✅ MATCH |
| 35 | `tourPackages/wild-safari-coastal-family-holiday` | `tours/family/wild-safari-coastal-family-holiday/index.html` | 155 | 155 | 0 | ✅ MATCH |
| 36 | `tourCategories/golf` | `tours/golf/index.html` | 151 | 151 | 0 | ✅ MATCH |
| 37 | `tourPackages/highland-greens-coastal-links-championship` | `tours/golf/highland-greens-coastal-links-championship/index.html` | 151 | 151 | 0 | ✅ MATCH |
| 38 | `tourPackages/the-grand-ceylon-masters-golf-odyssey` | `tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html` | 155 | 155 | 0 | ✅ MATCH |
| 39 | `tourPackages/the-royal-ceylon-fairways-tour` | `tours/golf/the-royal-ceylon-fairways-tour/index.html` | 145 | 145 | 0 | ✅ MATCH |
| 40 | `tourCategories/hill-country` | `tours/hill-country/index.html` | 170 | 170 | 0 | ✅ MATCH |
| 41 | `tourPackages/ceylon-tea-trails-colonial-grandeur` | `tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html` | 151 | 151 | 0 | ✅ MATCH |
| 42 | `tourPackages/highland-wilderness-cascading-waterfalls` | `tours/hill-country/highland-wilderness-cascading-waterfalls/index.html` | 155 | 155 | 0 | ✅ MATCH |
| 43 | `tourPackages/misty-peaks-scenic-railways-expedition` | `tours/hill-country/misty-peaks-scenic-railways-expedition/index.html` | 153 | 153 | 0 | ✅ MATCH |
| 44 | `tourCategories/honeymoon` | `tours/honeymoon/index.html` | 151 | 151 | 0 | ✅ MATCH |
| 45 | `tourPackages/enchanted-ceylon-romantic-hideaway` | `tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html` | 145 | 145 | 0 | ✅ MATCH |
| 46 | `tourPackages/pure-serenade-coastal-highland-romance` | `tours/honeymoon/pure-serenade-coastal-highland-romance/index.html` | 151 | 151 | 0 | ✅ MATCH |
| 47 | `tourCategories/ramayana` | `tours/ramayana/index.html` | 146 | 146 | 0 | ✅ MATCH |
| 48 | `tourPackages/sacred-ramayana-heritage-trail` | `tours/ramayana/sacred-ramayana-heritage-trail/index.html` | 140 | 140 | 0 | ✅ MATCH |
| 49 | `tourPackages/the-epic-ramayana-chronicle-pilgrimage` | `tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html` | 146 | 146 | 0 | ✅ MATCH |
| 50 | `tourCategories/wildlife` | `tours/wildlife/index.html` | 229 | 229 | 0 | ✅ MATCH |
| 51 | `tourPackages/the-sri-lanka-big-five-expedition` | `tours/wildlife/the-sri-lanka-big-five-expedition/index.html` | 161 | 161 | 0 | ✅ MATCH |
| 52 | `tourPackages/untamed-biosphere-rainforest-odyssey` | `tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html` | 167 | 167 | 0 | ✅ MATCH |
| 53 | `tourPackages/wild-ceylon-predator-elephant-trail` | `tours/wildlife/wild-ceylon-predator-elephant-trail/index.html` | 148 | 148 | 0 | ✅ MATCH |

## Concrete Firestore Path Mapping Reference

Every field binding in the HTML is mapped to an exact, concrete path in Firestore:

1. **Global Site Elements** (`data-cms="siteGlobal.*"`):
   - Target Collection: `siteGlobal`
   - Target Documents: `branding`, `header`, `footer`, `contact`, `menu`, `social`
   - Path Example: `siteGlobal/contact.phone` -> `+94 71 54 22 384`

2. **Core Public Pages** (`data-cms-page="siteContent/{pageId}"`):
   - Target Collection: `siteContent`
   - Target Documents: `home`, `about`, `contact`, `destinations`, `experiences`, `gallery`, `reviews`, `blog`, etc.
   - Path Example: `siteContent/home.heading_1` -> Section heading text

3. **Tour Category Pages** (`data-cms-page="tourCategories/{catSlug}"`):
   - Target Collection: `tourCategories`
   - Target Documents: `adventure`, `beach`, `buddhist-heritage`, `cultural`, `golf`, etc. (11 total)
   - Path Example: `tourCategories/buddhist-heritage.title` -> `Buddhist Heritage & Sacred Pilgrimages`

4. **Tour Package Detail Pages** (`data-cms-page="tourPackages/{pkgSlug}"`):
   - Target Collection: `tourPackages`
   - Target Documents: `southern-sands-serenade`, `the-grand-ceylon-masters-golf-odyssey`, etc. (26 total)
   - Path Example: `tourPackages/southern-sands-serenade.duration` -> `10 Days / 9 Nights`

## Buddhist Heritage Special Category Note

The Buddhist Heritage landing page (`tours/buddhist-heritage/index.html`) is a curated theme landing page displaying signature pilgrimage options linking directly to bespoke inquiry forms. It has **0 sub-package pages**, which accurately reflects the website structure without fabricating unapproved packages.
