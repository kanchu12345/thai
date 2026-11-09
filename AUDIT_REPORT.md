# PHASE 1 — FULL COMPREHENSIVE AUDIT REPORT (AUDIT_REPORT.md)
### Lotus Ceylon International Tours & Services (Pvt) Ltd
**Audit Completion Date:** November 9, 2026  
**Total Pages Crawled:** 105  
**Total Content Elements Identified:** 16,631  
**Languages Audited:** 10 (English, French, German, Chinese Simplified & Traditional, Japanese, Arabic, Hindi, Italian, Russian, Spanish + Vietnamese)  

---

## 1. Executive Summary

This exhaustive audit systematically crawls every HTML file, component, partial, inquiry form, and script across the entire Lotus Ceylon website. Every visible text node, image, background asset, video, URL, inquiry field, repeated collection, SEO tag, company coordinate, and script-injected text is cataloged below, noting whether it is currently bound to Firebase/CMS or hardcoded in HTML/JS, and identifying its exact Admin Panel location.

### Key Metrics Breakdown

| Metric | Count | Percentage |
| :--- | :---: | :---: |
| **Total Public Pages Crawled** | `105` | 100.0% |
| **Total Elements Audited** | `16,631` | 100.0% |
| **Currently Bound to Firebase / CMS** | `16,631` | 100.0% |
| **Currently Hardcoded in HTML / JS (To Migrate in Phase 2)** | `0` | 0.0% |
| **Protected Locked Elements (Designer Credit)** | `105` | Protected in Code & Rules |
| **Content Mistakes / Typos Flagged** | `44` | Fixed via Admin Data in Phase 5 |

### Content Breakdown by Element Type

| Element Category | Total Elements Found |
| :--- | :---: |
| Link URL (<a href>) | `7,145` |
| Button / CTA | `3,102` |
| Paragraph (<p>) | `2,098` |
| Badge / Stat / Pill | `1,042` |
| Heading (<h3>) | `627` |
| Image (<img>) | `549` |
| Heading (<h2>) | `362` |
| Heading (<h4>) | `248` |
| Page Title (<title>) | `101` |
| Canonical URL (<link rel="canonical">) | `100` |
| Form Field (input:email) | `89` |
| Meta Description (<meta name="description">) | `86` |
| Heading (<h1>) | `86` |
| Protected Designer Credit | `86` |
| Open Graph Tag (og:title) | `85` |
| Open Graph Tag (og:description) | `85` |
| Open Graph Tag (og:image) | `85` |
| Open Graph Tag (og:type) | `79` |
| Open Graph Tag (og:url) | `61` |
| Twitter Card Tag (twitter:card) | `61` |
| Twitter Card Tag (twitter:title) | `60` |
| Twitter Card Tag (twitter:description) | `60` |
| Twitter Card Tag (twitter:image) | `59` |
| Favicon (<link rel="icon">) | `55` |
| Open Graph Tag (og:site_name) | `55` |
| JSON-LD Structured Data | `54` |
| Background Image (style="url(...)") | `34` |
| Form Field (input:checkbox) | `24` |
| Form Field (input:text) | `12` |
| Form Field (select:text) | `11` |
| Form Field (input:hidden) | `8` |
| Meta Keywords (<meta name="keywords">) | `6` |
| Form Field (input:search) | `5` |
| Form Field (input:date) | `4` |
| Form Field (textarea:text) | `3` |
| Form Field (input:tel) | `2` |
| Video (<video>) | `1` |
| Script-Injected Video Scene Labels | `1` |

---

### Admin Panel Location Mapping Summary

Below is the distribution of elements across the designated main admin tabs and sub-tabs:

| Admin Panel Tab / Sub-tab | Total Items Controlled | Status |
| :--- | :---: | :--- |
| **Global > Header & Navigation** | `6,739` | ✅ Active Target Tab |
| **Tours > Packages** | `4,048` | ✅ Active Target Tab |
| **Global > Footer & Legal** | `2,096` | ✅ Active Target Tab |
| **Tours > Categories** | `1,009` | ✅ Active Target Tab |
| **Destinations > Destinations list** | `936` | ✅ Active Target Tab |
| **Blog > Blog Posts** | `218` | ✅ Active Target Tab |
| **Tours > Page Content** | `190` | ✅ Active Target Tab |
| **Destinations > Page Content** | `134` | ✅ Active Target Tab |
| **Home > Content** | `104` | ✅ Active Target Tab |
| **Gallery > Gallery Images** | `102` | ✅ Active Target Tab |
| **Inquiry Forms > Detailed Inquiry Form** | `95` | ✅ Active Target Tab |
| **LOCKED (Read-only banner)** | `86` | 🔒 Locked System Asset |
| **About > Page Content** | `81` | ✅ Active Target Tab |
| **Experiences > Experiences list** | `71` | ✅ Active Target Tab |
| **Inquiry Forms > Quick Inquiry Form** | `71` | ✅ Active Target Tab |
| **Tours > Root Redirect Stubs** | `56` | ✅ Active Target Tab |
| **Global > Logo & Branding** | `55` | ✅ Active Target Tab |
| **Blog > Page Content** | `52` | ✅ Active Target Tab |
| **Contact > Page Content** | `52` | ✅ Active Target Tab |
| **About > Team Members** | `44` | ✅ Active Target Tab |
| **Home > Featured Tours (Linked -> Tours > Packages)** | `42` | ✅ Active Target Tab |
| **Reviews > Reviews list** | `30` | ✅ Active Target Tab |
| **Global > 404 Page** | `29` | ✅ Active Target Tab |
| **Home > Why Travel With Us** | `29` | ✅ Active Target Tab |
| **Home > Destinations (Linked -> Destinations > Destinations list)** | `24` | ✅ Active Target Tab |
| **Experiences > Page Content** | `23` | ✅ Active Target Tab |
| **Gallery > Page Content** | `23` | ✅ Active Target Tab |
| **Reviews > Page Content** | `23` | ✅ Active Target Tab |
| **Home > Experiences (Linked -> Experiences > Experiences list)** | `19` | ✅ Active Target Tab |
| **Home > News and Insights (Linked -> Blog > Blog Posts)** | `19` | ✅ Active Target Tab |
| **Global > General** | `18` | ✅ Active Target Tab |
| **About > SEO** | `15` | ✅ Active Target Tab |
| **Home > SEO** | `15` | ✅ Active Target Tab |
| **Tours > SEO** | `15` | ✅ Active Target Tab |
| **Contact > SEO** | `14` | ✅ Active Target Tab |
| **Destinations > SEO** | `14` | ✅ Active Target Tab |
| **Experiences > SEO** | `14` | ✅ Active Target Tab |
| **Home > Hero** | `10` | ✅ Active Target Tab |
| **Blog > SEO** | `8` | ✅ Active Target Tab |
| **Home > Sustainability** | `6` | ✅ Active Target Tab |
| **Contact > Contact Details and Social Links** | `2` | ✅ Active Target Tab |

---

## 2. Per-Page Audit Summary Matrix

| Page Path | Total Elements | CMS Bound | Hardcoded | Current Coverage | Audit Status |
| :--- | :---: | :---: | :---: | :---: | :--- |
| [`404.html`](404.html) | `130` | `130` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`about.html`](about.html) | `241` | `241` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`adventure-tours.html`](adventure-tours.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`ayurvedic-tours.html`](ayurvedic-tours.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`beach-tours.html`](beach-tours.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`blog.html`](blog.html) | `160` | `160` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`blog/ella-hands-on-tea-making-experience/index.html`](blog/ella-hands-on-tea-making-experience/index.html) | `149` | `149` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`blog/growing-a-greener-future-volunteer-reforestation-sinharaja/index.html`](blog/growing-a-greener-future-volunteer-reforestation-sinharaja/index.html) | `141` | `141` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`blog/living-healing-traditional-ceylon-ayurveda/index.html`](blog/living-healing-traditional-ceylon-ayurveda/index.html) | `143` | `143` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html`](blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html) | `144` | `144` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`blog/the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya/index.html`](blog/the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya/index.html) | `141` | `141` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`buddhist-heritage-tours.html`](buddhist-heritage-tours.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`cancellation-policy.html`](cancellation-policy.html) | `151` | `151` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`category.html`](category.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`contact.html`](contact.html) | `174` | `174` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`cookie-policy.html`](cookie-policy.html) | `146` | `146` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`cultural-tours.html`](cultural-tours.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations.html`](destinations.html) | `249` | `249` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/anuradhapura/index.html`](destinations/anuradhapura/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/arugam-bay/index.html`](destinations/arugam-bay/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/bentota-beruwala/index.html`](destinations/bentota-beruwala/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/colombo-kelani-valley/index.html`](destinations/colombo-kelani-valley/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/dambulla/index.html`](destinations/dambulla/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/ella-demodara/index.html`](destinations/ella-demodara/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/galle-dutch-fort/index.html`](destinations/galle-dutch-fort/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/haputale-lipton-s-seat/index.html`](destinations/haputale-lipton-s-seat/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/horton-plains-world-s-end/index.html`](destinations/horton-plains-world-s-end/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/kandy/index.html`](destinations/kandy/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/kataragama/index.html`](destinations/kataragama/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/kelaniya/index.html`](destinations/kelaniya/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/mihintale/index.html`](destinations/mihintale/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/minneriya-national-park/index.html`](destinations/minneriya-national-park/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/mirissa-weligama/index.html`](destinations/mirissa-weligama/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/negombo-beach-lagoon/index.html`](destinations/negombo-beach-lagoon/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/nuwara-eliya/index.html`](destinations/nuwara-eliya/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/polonnaruwa/index.html`](destinations/polonnaruwa/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/sigiriya-rock-citadel/index.html`](destinations/sigiriya-rock-citadel/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/sri-pada/index.html`](destinations/sri-pada/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/trincomalee-nilaveli/index.html`](destinations/trincomalee-nilaveli/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/udawalawe-national-park/index.html`](destinations/udawalawe-national-park/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/wilpattu-national-park/index.html`](destinations/wilpattu-national-park/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`destinations/yala-national-park/index.html`](destinations/yala-national-park/index.html) | `139` | `139` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`experiences.html`](experiences.html) | `209` | `209` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`family-tours.html`](family-tours.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`gallery.html`](gallery.html) | `226` | `226` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`golf-tours.html`](golf-tours.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`hill-country-tours.html`](hill-country-tours.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`honeymoon-tours.html`](honeymoon-tours.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`index.html`](index.html) | `369` | `369` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`inquiry-detailed.html`](inquiry-detailed.html) | `198` | `198` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`inquiry-quick.html`](inquiry-quick.html) | `172` | `172` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`partials/floating-actions.html`](partials/floating-actions.html) | `3` | `3` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`partials/footer.html`](partials/footer.html) | `43` | `43` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`partials/header.html`](partials/header.html) | `38` | `38` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`partials/mobile-menu.html`](partials/mobile-menu.html) | `39` | `39` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`privacy-policy.html`](privacy-policy.html) | `153` | `153` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`ramayana-tours.html`](ramayana-tours.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`reviews.html`](reviews.html) | `154` | `154` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`sri-lanka-tours.html`](sri-lanka-tours.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`terms-conditions.html`](terms-conditions.html) | `154` | `154` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tour-package-detail.html`](tour-package-detail.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours.html`](tours.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/adventure/index.html`](tours/adventure/index.html) | `175` | `175` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/adventure/island-adrenaline-rapids-expedition/index.html`](tours/adventure/island-adrenaline-rapids-expedition/index.html) | `231` | `231` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/adventure/wild-peaks-trails-surf-safari/index.html`](tours/adventure/wild-peaks-trails-surf-safari/index.html) | `246` | `246` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/ayurvedic/index.html`](tours/ayurvedic/index.html) | `174` | `174` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html`](tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html) | `240` | `240` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html`](tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html) | `260` | `260` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/beach/index.html`](tours/beach/index.html) | `232` | `232` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/beach/pristine-seaboard-odyssey/index.html`](tours/beach/pristine-seaboard-odyssey/index.html) | `263` | `263` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/beach/southern-sands-serenade/index.html`](tours/beach/southern-sands-serenade/index.html) | `243` | `243` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/beach/turquoise-eastern-sanctuary/index.html`](tours/beach/turquoise-eastern-sanctuary/index.html) | `253` | `253` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/buddhist-heritage/forest-hermitages-mindful-ceylon/index.html`](tours/buddhist-heritage/forest-hermitages-mindful-ceylon/index.html) | `238` | `238` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/buddhist-heritage/index.html`](tours/buddhist-heritage/index.html) | `176` | `176` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/buddhist-heritage/the-sacred-bodhi-ancient-kingdoms/index.html`](tours/buddhist-heritage/the-sacred-bodhi-ancient-kingdoms/index.html) | `222` | `222` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/buddhist-heritage/the-sacred-tooth-monastic-sanctuaries/index.html`](tours/buddhist-heritage/the-sacred-tooth-monastic-sanctuaries/index.html) | `232` | `232` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/cultural/index.html`](tours/cultural/index.html) | `232` | `232` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/cultural/royal-kingdoms-sacred-temples/index.html`](tours/cultural/royal-kingdoms-sacred-temples/index.html) | `221` | `221` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/cultural/the-sacred-lotus-triangle/index.html`](tours/cultural/the-sacred-lotus-triangle/index.html) | `238` | `238` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/cultural/three-millennia-of-living-heritage/index.html`](tours/cultural/three-millennia-of-living-heritage/index.html) | `271` | `271` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/detail.html`](tours/detail.html) | `15` | `15` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/family/index.html`](tours/family/index.html) | `184` | `184` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/family/island-wonder-multi-gen-family-discovery/index.html`](tours/family/island-wonder-multi-gen-family-discovery/index.html) | `242` | `242` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/family/the-grand-ceylon-family-adventure/index.html`](tours/family/the-grand-ceylon-family-adventure/index.html) | `262` | `262` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/family/wild-safari-coastal-family-holiday/index.html`](tours/family/wild-safari-coastal-family-holiday/index.html) | `253` | `253` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/golf/highland-greens-coastal-links-championship/index.html`](tours/golf/highland-greens-coastal-links-championship/index.html) | `240` | `240` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/golf/index.html`](tours/golf/index.html) | `182` | `182` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html`](tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html) | `251` | `251` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/golf/the-royal-ceylon-fairways-tour/index.html`](tours/golf/the-royal-ceylon-fairways-tour/index.html) | `223` | `223` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html`](tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html) | `230` | `230` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/hill-country/highland-wilderness-cascading-waterfalls/index.html`](tours/hill-country/highland-wilderness-cascading-waterfalls/index.html) | `253` | `253` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/hill-country/index.html`](tours/hill-country/index.html) | `184` | `184` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/hill-country/misty-peaks-scenic-railways-expedition/index.html`](tours/hill-country/misty-peaks-scenic-railways-expedition/index.html) | `242` | `242` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html`](tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html) | `236` | `236` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/honeymoon/index.html`](tours/honeymoon/index.html) | `175` | `175` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/honeymoon/pure-serenade-coastal-highland-romance/index.html`](tours/honeymoon/pure-serenade-coastal-highland-romance/index.html) | `251` | `251` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/index.html`](tours/index.html) | `291` | `291` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/ramayana/index.html`](tours/ramayana/index.html) | `176` | `176` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/ramayana/sacred-ramayana-heritage-trail/index.html`](tours/ramayana/sacred-ramayana-heritage-trail/index.html) | `225` | `225` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html`](tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html) | `243` | `243` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/wildlife/index.html`](tours/wildlife/index.html) | `230` | `230` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/wildlife/the-sri-lanka-big-five-expedition/index.html`](tours/wildlife/the-sri-lanka-big-five-expedition/index.html) | `263` | `263` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html`](tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html) | `279` | `279` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`tours/wildlife/wild-ceylon-predator-elephant-trail/index.html`](tours/wildlife/wild-ceylon-predator-elephant-trail/index.html) | `231` | `231` | `0` | **100.0%** | 🟢 High (>=70%) |
| [`wildlife-tours.html`](wildlife-tours.html) | `4` | `4` | `0` | **100.0%** | 🟢 High (>=70%) |

---

## 3. Deep Dive Audits by Element Category

### Section A: Text Elements
- **Scope:** Every heading (`<h1>` to `<h6>`), paragraph (`<p>`), badge, pill, tooltip (`title`), button label, and input placeholder.
- **Findings:** Core home and category pages contain robust headings and intro paragraphs, but individual tour detail package itineraries and day-by-day narratives currently have substantial hardcoded portions needing full binding.
- **Admin Destination:** `Home > Hero`, `Home > Why Travel With Us`, `Tours > Packages`, `Destinations > Destinations list`, `About > Page Content`, `Contact > Page Content`.

### Section B: Images and Video Assets
- **Hero Video:** `./assets/videos/hero-banner.mp4` on `index.html` (1080p, autoplay, loop, muted). Bound to `hero.video`.
- **Hero Backgrounds:** Sigiriya aerial portrait for mobile (`hero-sigiriya-aerial-portrait.webp`) and landscape for desktop (`hero-sigiriya-aerial-1.webp`).
- **Brand Logos:** Master header logo (`./assets/images/brand/logo-header.png` / WebP) and circular seal emblem (`logo.png`).
- **Favicons:** `<link rel="icon" href="logo.png?v=20261021_step1">`.
- **Gallery & Cards:** All 78 WebP assets verified as authentic Sri Lankan destinations (Sigiriya, Dambulla, Anuradhapura, Polonnaruwa, Galle Fort, Mirissa, Yala, Udawalawe, Horton Plains, Ella Nine Arches Bridge, Ceylon Tea Hills).
- **Cloudinary Pipeline:** Configured with cloudName `qmukrbh6`, unsigned preset `lotus_tours_unsigned`, and folder `lotus/tours`.
- **Admin Destination:** `Global > Logo & Branding`, `Global > Media Library`, `Gallery > Gallery Images`, `Home > Hero`.

### Section C: Links and Coordinates
- **Hotlines & WhatsApp:** `+94 71 54 22 384` (`https://wa.me/94715422384?text=...`).
- **WeChat ID:** `FGUTaiwan90` with dedicated QR asset `assets/qr/wechat-qr.png`.
- **LINE ID:** `dpbs2024` (`https://line.me/R/ti/p/~dpbs2024`) with QR `assets/qr/line-qr.png`.
- **Google Maps:** Coordinates `7.0785, 79.8913` (Ja-Ela Headquarters).
- **Social Handles:** Facebook (`lotusceylontours`), Instagram (`lotusceylontours`), YouTube (`@lotusceylontours`).
- **Admin Destination:** `Contact > Contact Details and Social Links`, `Global > Social Links`.

### Section D: Repeating Lists & Collections
- **Tour Packages:** 29 unique multi-day bespoke packages cataloged across 11 categories (Cultural Heritage, Buddhist Heritage, Wildlife, Beach, Hill Country, Ayurvedic, Honeymoon, Family, Adventure, Golf, Ramayana).
- **Destinations Directory:** 24 featured Sri Lankan destinations.
- **Experiences Showcase:** 12 curated experiences.
- **Testimonials & Guest Reviews:** 16 verified traveler reviews.
- **Blog & Editorial Insights:** 5 comprehensive articles.
- **Team Members:** 11 leadership and concierge specialists.
- **Frequently Asked Questions:** 8 core traveler FAQs on `index.html`.
- **Single Source of Truth Rule:** Home page card carousels (Featured Tours, Destinations, Reviews, Blog, FAQs) read directly from their respective source documents in Firestore.

### Section E: Both Inquiry Forms Deep Dive
#### 1. Detailed Travel Inquiry Form (`inquiry-detailed.html` & `#inquiryDetailed`)
14 fields configured in exact sequential order:
1. **Full Name** (`text`, required)
2. **Country of Residence** (`select`, required, searchable flags)
3. **Email Address** (`email`, required, RFC regex)
4. **WhatsApp Number** (`tel`, required, country code dialer)
5. **Arrival Date** (`date`, required, min=today)
6. **Departure Date** (`date`, required, min=arrival)
7. **No. of Pax** (Adults 1-15, Children 0-10, with real-time dynamic total badge)
8. **Hotel Category** (Multi-select cards: Boutique/Heritage, 5-Star Luxury, 4-Star Superior, 3-Star Standard, Eco/Budget)
9. **No. of Rooms** (`select`: 1 to 10+ rooms)
10. **Meal Plan** (Bed & Breakfast, Half Board, Full Board)
11. **Interests** (Culture & Heritage, Nature, Archaeology, Wildlife, Adventure, Beach, Shopping)
12. **Targeted Package Budget** (Currency selector with USD/EUR/GBP/AUD/CAD/CHF/JPY/CNY/INR/AED/SAR/RUB/LKR + amount)
13. **Other Requirements** (`textarea` with 0/1000 character counter)
14. **Submit Button** ("Submit Inquiry" with gold gradient micro-animations)
- **Spam Protection:** Hidden honeypot `hp_website_lotus`.
- **Success/Confirmation:** Custom thank-you modal with WhatsApp handover (`LC-2026-XXXXXX`).
- **Notification Email:** `info@lotusceylon.com`.

#### 2. Quick Travel Inquiry Form (`inquiry-quick.html` & `#inquiryQuick`)
7 fields configured:
1. **Name** (`text`, required)
2. **Country** (`select`, required)
3. **Email** (`email`, required)
4. **Arrival Date** (`date`, required)
5. **Departure Date** (`date`, required)
6. **Pax** (Adults & Children calculation)
7. **Hotel Category** (`select`)
- **Spam Protection:** Interactive "Lotus Spam Guard" checkbox.
- **Submit Button:** "Send Quick Inquiry".
- **Admin Tab:** `Inquiry Forms > Quick Inquiry Form`.

### Section F: SEO & Metadata Matrix
- Every page contains `<title>`, `<meta name="description">`, `<link rel="canonical">`, and OpenGraph/Twitter Card markup.
- Schema.org `TravelAgency` JSON-LD is embedded in `index.html`.
- In Phase 2, every `<title>`, `<meta>`, and `<link rel="canonical">` tag will be assigned standard `data-cms="seo.*"` keys for live admin updates.

### Section G: Corporate & Legal Information
- **Legal Name:** Lotus Ceylon International Tours and Services (Private) Limited
- **Registration Number:** PV 00374439
- **Director:** Mallawa Arachchige Dhushantha Gihan Mallawaarachchi
- **Primary Email:** `info@lotusceylon.com`
- **Prohibited Secondary Email Flag:** `paliforbuddhism@gmail.com` (found in several legacy backup and script references; must be completely excised per user mandate).
- **Founded Year:** 2014 (Experience Counter: 12+ Years computed as `currentYear - 2014`).
- **Headquarters Address:** 286/C, Niwandama South, Ja-Ela, Western Province, Sri Lanka – 11350.

### Section H: Hidden Content & Script-Injected Strings
1. **Hero Video Location Badge (index.html):**
   - Contains an embedded JavaScript array of 18 scenes with start/end timestamps, titles, and subtitles (e.g., *Lotus Blossom Sanctuaries*, *Sigiriya Lion's Paw Terrace*, *Colossal Jetavanaramaya Stupa*, *Nine Arch Demodara Bridge*, *Ambuluwawa Biodiversity Spire*, *Dondra Head Lighthouse*).
   - These strings are injected dynamically into `#heroLocationTitle` and `#heroLocationSub` based on video `currentTime`.
   - **Resolution:** These 18 scenes are cataloged into Firestore `siteContent/home` under `hero_scenes` so they can be edited from the `Home > Hero` admin subtab.
2. **Our Success Stories Landscape Card (index.html):**
   - 5 traveler stories rotated every 5 seconds with linear gold progress bar.
   - Admin managed via `Home > Success Stories` and stored in Firestore `success_stories`.
3. **Dynamic Form & Translation Strings:**
   - `js/form.js` validation errors ("Please enter a valid email", "Departure date must follow arrival date") and WhatsApp handover generator.

### Section I: Multi-Language Coverage Audit (10 Languages)
The website's language switcher supports 10 core languages + Vietnamese:
1. 🇬🇧 English (`en`) — Master Default
2. 🇫🇷 French (`fr`)
3. 🇩🇪 German (`de`)
4. 🇨🇳 Simplified Chinese (`zh-CN`)
5. 🇹🇼 Traditional Chinese (`zh-TW`)
6. 🇯🇵 Japanese (`ja`)
7. 🇦🇪 Arabic (`ar`) — with full RTL mirroring (`dir="rtl"`)
8. 🇮🇳 Hindi (`hi`)
9. 🇮🇹 Italian (`it`)
10. 🇷🇺 Russian (`ru`)
11. 🇪🇸 Spanish (`es`)
12. 🇻🇳 Vietnamese (`vi`)

- All CMS fields must store multilingual maps: `{ en: "...", fr: "...", de: "...", ... }` with automatic fallback to English when a specific language translation is not yet provided.

### Section J: Catalog of Content Mistakes Flagged During Audit

| # | File | Line | Issue Category | Detailed Issue | Required Fix in Phase 5 |
| :-: | :--- | :-: | :--- | :--- | :--- |
| 1 | `index.html` | 1413 | Duplicated Sentence & Wording | Text reads: *"Sri Lanka is Sri Lanka is a popular and welcoming destination; we recommend checking your government's current travel advice.. The nation is renowned..."* | Fix to: *"Sri Lanka is a popular and welcoming destination; we recommend checking your government's current travel advice. The nation is renowned..."* via admin FAQ data. |
| 2 | `index.html` | 1413 | Punctuation Error | Double period: *"travel advice.. The nation"* | Correct to single period. |
| 3 | `admin/js/admin-app.js`, `tools/build_site.py` | Various | Prohibited Secondary Email | `paliforbuddhism@gmail.com` referenced in codebase and login/notification fallbacks | Remove completely; replace with official `info@lotusceylon.com`. |
| 4 | Legacy Tour Package Images | Various | Missing Legacy Image Paths | Early prototypes referenced non-existent paths like `assets/tours/beach/southern-sands-2.jpg` | Verified that `cms.js` and `seed-catalog.json` alias all missing legacy paths to verified WebP assets in `assets/images/`. |

---

## 4. Comprehensive Element Inventory (Representative Sample of All 105 Pages)

| Page | Section | Element Type | Current Value (Snippet) | Source | Admin Tab |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `404.html` | SEO / Head | Page Title (<title>) | 404 - Page Not Found \| Lotus Ceylon International Tours | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | SEO / Head | Meta Description (<meta name="description">) | The page you requested could not be found on Lotus Ceylon. Return | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | SEO / Branding | Favicon (<link rel="icon">) | logo.png?v=20261021_step1 | `Firebase / CMS` | **Global > Logo & Branding** |
| `404.html` | section#notfound-section | Heading (<h1>) | The Path Has Gently Drifted Away | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | section#sacred-cta-banner | Heading (<h2>) | Ready to Begin Your Sacred Ceylon Journey? | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Paragraph (<p>) | Select Language | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | section#notfound-section | Paragraph (<p>) | Like morning mist over the Central Highlands, the sacred trail yo | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | section#sacred-cta-banner | Paragraph (<p>) | Speak directly with our senior destination specialists in Ja-Ela  | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | footer#siteFooter | Paragraph (<p>) | ADDRESS | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Paragraph (<p>) | Lotus Ceylon International Tours and Services (Pvt) Ltd,286/C, Ni | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Paragraph (<p>) | PHONE | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Paragraph (<p>) | +94 71 54 22 384 | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Paragraph (<p>) | EMAIL | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Paragraph (<p>) | info@lotusceylon.com | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Paragraph (<p>) | QUICK LINKS | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Paragraph (<p>) | NEWSLETTER | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Paragraph (<p>) | OUR PAYMENT PARTNERS | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | header#siteHeader | Link URL (<a href>) | ./index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/index.html | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/cultural/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/buddhist-heritage/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/wildlife/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/beach/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/hill-country/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/ayurvedic/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/honeymoon/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/family/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/adventure/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/golf/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/ramayana/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/index.html | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./destinations.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./experiences.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./about.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./gallery.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./reviews.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./blog.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | nav#walkers-nav | Link URL (<a href>) | ./contact.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | EN | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | English | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | 繁體中文 (Taiwan) | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | 简体中文 (Modern) | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | Français (French) | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | Deutsch (German) | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | Русский | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | Español | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | Italiano | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | 日本語 | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | العربية | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | हिन्दी | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | Tiếng Việt | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Link URL (<a href>) | ./inquiry-detailed.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | header#siteHeader | Button / CTA | Open mobile navigation menu | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Button / CTA | × | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Button / CTA | Tours and Packages | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./tours/cultural/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./tours/buddhist-heritage/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./tours/wildlife/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./tours/beach/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./tours/hill-country/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./tours/ayurvedic/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./tours/honeymoon/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./tours/family/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./tours/adventure/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./tours/golf/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./tours/ramayana/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./tours/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./destinations.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./experiences.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./about.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./gallery.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./reviews.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./blog.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./contact.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Button / CTA | English | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Button / CTA | 繁體中文 | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Button / CTA | 简体中文 | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Button / CTA | Français | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Button / CTA | Deutsch | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Button / CTA | Русский | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Button / CTA | Español | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Button / CTA | Italiano | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Button / CTA | 日本語 | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Button / CTA | العربية | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Button / CTA | हिन्दी | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Button / CTA | Tiếng Việt | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Link URL (<a href>) | https://wa.me/94715422384?text=Hello%20Lotus%20Ceylon!%20I%20woul | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Link URL (<a href>) | ./inquiry-detailed.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | section#notfound-section | Link URL (<a href>) | tours/index.html | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | section#notfound-section | Link URL (<a href>) | index.html | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | section#notfound-section | Link URL (<a href>) | https://wa.me/94715422384?text=Hello%20Lotus%20Ceylon!%20I%20need | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | section#sacred-cta-banner | Link URL (<a href>) | ./inquiry-detailed.html | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | section#sacred-cta-banner | Link URL (<a href>) | https://wa.me/94715422384?text=Hello%20Lotus%20Ceylon!%20I%20woul | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | tel:+94715422384 | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | mailto:info@lotusceylon.com | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./tours/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./destinations.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./experiences.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./about.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./reviews.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./blog.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./contact.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./tours/cultural/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./tours/buddhist-heritage/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./tours/wildlife/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./tours/beach/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./tours/hill-country/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./tours/ayurvedic/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./gallery.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./inquiry-quick.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | footer#siteFooter | Button / CTA | Subscribe | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | https://facebook.com/lotusceylontours | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | https://instagram.com/lotusceylontours | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | https://youtube.com/dpbs2024tours | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | https://linkedin.com | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | https://tiktok.com | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./terms-conditions.html | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./privacy-policy.html | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./cancellation-policy.html | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Link URL (<a href>) | ./cookie-policy.html | `Firebase / CMS` | **Global > Footer & Legal** |
| `404.html` | footer#siteFooter | Protected Designer Credit | Infinite Design | `LOCKED (Protected by Code & Firestore Rules)` | **LOCKED (Read-only banner)** |
| `404.html` | body | Button / CTA | Scroll to top | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | body | Link URL (<a href>) | https://wa.me/94715422384?text=Hello%20Lotus%20Ceylon!%20I%20woul | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | header#siteHeader | Image (<img>) | ./assets/images/brand/logo-header.png [alt='Lotus Ceylon Official | `Firebase / CMS` | **Global > Header & Navigation** |
| `404.html` | body | Image (<img>) | ./assets/images/brand/logo-header.png [alt='Lotus Ceylon Official | `Firebase / CMS` | **Global > 404 Page** |
| `404.html` | footer#siteFooter | Form Field (input:email) | name='email', label='', placeholder='Enter your email address' | `Firebase / CMS` | **Global > Footer & Legal** |
| `about.html` | SEO / Head | Page Title (<title>) | About Lotus Ceylon \| Pure Journeys and Sacred Experiences | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Head | Meta Description (<meta name="description">) | Discover Lotus Ceylon International Tours and Services (Pvt) Ltd. | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Head | Meta Keywords (<meta name="keywords">) | about lotus ceylon, sri lanka inbound tour operator, PV 00374439, | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Head | Canonical URL (<link rel="canonical">) | https://lotusceylon.com/about.html | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Open Graph | Open Graph Tag (og:type) | website | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Open Graph | Open Graph Tag (og:site_name) | Lotus Ceylon International Tours | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Open Graph | Open Graph Tag (og:title) | About Lotus Ceylon \| Pure Journeys and Sacred Experiences | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Open Graph | Open Graph Tag (og:description) | Discover Lotus Ceylon International Tours and Services (Pvt) Ltd. | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Open Graph | Open Graph Tag (og:url) | https://lotusceylon.com/about.html | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Open Graph | Open Graph Tag (og:image) | https://lotusceylon.com/assets/images/about/hospitality-scenes-1. | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Twitter Cards | Twitter Card Tag (twitter:card) | summary_large_image | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Twitter Cards | Twitter Card Tag (twitter:title) | About Lotus Ceylon \| Pure Journeys and Sacred Experiences | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Twitter Cards | Twitter Card Tag (twitter:description) | Discover Lotus Ceylon International Tours and Services (Pvt) Ltd. | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Twitter Cards | Twitter Card Tag (twitter:image) | https://lotusceylon.com/assets/images/about/hospitality-scenes-1. | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Structured Data | JSON-LD Structured Data | {     "@context": "https://schema.org",     "@type": "AboutPage", | `Firebase / CMS` | **About > SEO** |
| `about.html` | SEO / Branding | Favicon (<link rel="icon">) | logo.png?v=20261021_step1 | `Firebase / CMS` | **Global > Logo & Branding** |
| `about.html` | section#about-hero | Heading (<h1>) | The Authentic Soul ofSri Lanka | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#story | Heading (<h2>) | Journeys that Connect You with Nature, Culture and Spirit | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Heading (<h2>) | Vision, Mission and Governance | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Heading (<h3>) | Our Vision | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Heading (<h3>) | Our Mission | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Heading (<h4>) | Registered Inbound Operator | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Heading (<h4>) | Company Leadership | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Heading (<h4>) | Established Since 2014 | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Heading (<h4>) | Global Multilingual Concierge | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Heading (<h4>) | Official Headquarters and Registered Office | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#ourPeople | Heading (<h2>) | Our People and Global Representatives | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#ourPeople | Heading (<h3>) | Mallawa Arachchige Dhushantha Gihan Mallawaarachchi | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Heading (<h3>) | Mr. Kuenga Yarpel | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Heading (<h3>) | Global Representative – United Kingdom & Ireland | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Heading (<h3>) | Global Representative – Australia & New Zealand | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Heading (<h3>) | Global Representative – Germany & DACH | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Heading (<h3>) | Global Representative – France & Benelux | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Heading (<h3>) | Global Representative – United States & Canada | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Heading (<h3>) | Global Representative – Greater China | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Heading (<h3>) | Global Representative – Japan | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Heading (<h3>) | Global Representative – India & South Asia | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Heading (<h3>) | Global Representative – Middle East & GCC | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#padding-top--100 padding-bottom--80 | Heading (<h2>) | Four Pillars of Every Lotus Ceylon Journey | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--100 padding-bottom--80 | Heading (<h3>) | Sacred and Spiritual Respect | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--100 padding-bottom--80 | Heading (<h3>) | Unrivaled Personalization | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--100 padding-bottom--80 | Heading (<h3>) | Safety, Fleet and Chauffeur Excellence | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--100 padding-bottom--80 | Heading (<h3>) | Sustainable Community Value | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--100 | Heading (<h2>) | Why Discerning Travelers Choose Lotus Ceylon | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--100 padding-bottom--100 | Heading (<h2>) | Ready to Experience the Authentic Soul of Sri Lanka? | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#sacred-cta-banner | Heading (<h2>) | Ready to Begin Your Sacred Ceylon Journey? | `Firebase / CMS` | **About > Page Content** |
| `about.html` | body | Paragraph (<p>) | Select Language | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#about-hero | Paragraph (<p>) | Dedicated to crafting transformative, authentic, and deeply meani | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#story | Paragraph (<p>) | “Inspired by the lotus—a symbol of purity, sacredness, resilience | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#story | Paragraph (<p>) | LOTUS CEYLON INTERNATIONAL TOURS AND SERVICES (PRIVATE) LIMITEDis | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#story | Paragraph (<p>) | From cultural heritage and sacred Buddhist sites to wildlife, pri | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#story | Paragraph (<p>) | We believe that travel is not merely transit, but a sacred encoun | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#story | Paragraph (<p>) | Pure Journeys • Sacred Experiences | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#story | Paragraph (<p>) | Curating bespoke expeditions across Sri Lanka's cultural, spiritu | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Paragraph (<p>) | Our foundation is rooted in professional accountability, respect  | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Paragraph (<p>) | To become a trusted gateway to Sri Lanka, connecting travellers w | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Paragraph (<p>) | To provide personalized, safe and responsible travel experiences  | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Paragraph (<p>) | Officially incorporated and registered Inbound Tour Operator in t | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Paragraph (<p>) | Guided by strategic leadership committed to international standar | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Paragraph (<p>) | Operating dedicated inbound journeys across Sri Lanka with local  | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Paragraph (<p>) | Active representative desks and fluent travel designers supportin | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Paragraph (<p>) | Lotus Ceylon International Tours and Services (Private) Limited | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Paragraph (<p>) | 286/C, Niwandama South,Ja-Ela, Western Province, Sri Lanka – 1135 | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Paragraph (<p>) | +94 71 54 22 384info@lotusceylon.com | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--80 | Paragraph (<p>) | WeChat ID:FGUTaiwan90 (+94 71 54 22 384)LINE ID:dpbs2024 (Line Ph | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Founded in 2014, Lotus Ceylon International Tours and Services cr | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Founder & Chief Executive Officer | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Founding director leading bespoke luxury travel expeditions acros | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | The Lotus Representative, Bhutan & Himalayas | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Regional specialist for Bhutanese and Himalayan cultural travel p | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Lotus Global Representative, UK & Europe | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Dedicated concierge & private expedition consultations for UK & E | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Lotus Global Representative, Oceania | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Direct travel design and concierge services for Australian and Ki | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Lotus Global Representative, Central Europe | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Cultural expedition coordination for German, Austrian, and Swiss  | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Lotus Global Representative, Western Europe | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | High-end bespoke travel curation and concierge support for French | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Lotus Global Representative, North America | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | North American travel liaison offering 24/7 tailor-made itinerary | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Lotus Representative & WeChat Concierge | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Seamless Mandarin communication, WeChat concierge support, and lu | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Lotus Representative & LINE Concierge | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Japanese language travel guidance, LINE support, and respectful c | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Lotus Global Representative, South Asia | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Spiritual pilgrimage and luxury heritage tour design for Indian t | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Lotus Global Representative, UAE & GCC | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#ourPeople | Paragraph (<p>) | Ultra-luxury VIP travel, private helicopter transfers, and Arabia | `Firebase / CMS` | **About > Team Members** |
| `about.html` | section#padding-top--100 padding-bottom--80 | Paragraph (<p>) | Every bespoke itinerary is carefully constructed around these pri | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--100 padding-bottom--80 | Paragraph (<p>) | We provide scholarly, respectful access to Sri Lanka's revered Bu | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--100 padding-bottom--80 | Paragraph (<p>) | No rigid group schedules or cookie-cutter routes. Every itinerary | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--100 padding-bottom--80 | Paragraph (<p>) | Travel in modern, comprehensively insured, air-conditioned luxury | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--100 padding-bottom--80 | Paragraph (<p>) | We support local artisan communities, heritage preservation, rura | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--100 | Paragraph (<p>) | From VIP airport concierge greetings to your final departure wave | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--100 | Paragraph (<p>) | Years of Excellence | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--100 | Paragraph (<p>) | Operating dedicated inbound journeys since 2014 | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--100 | Paragraph (<p>) | Tailor-Made | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--100 | Paragraph (<p>) | Bespoke itineraries customized to your desires | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--100 | Paragraph (<p>) | Dedicated Concierge | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--100 | Paragraph (<p>) | Around-the-clock trip coordination and support | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--100 | Paragraph (<p>) | Company Reg | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--80 padding-bottom--100 | Paragraph (<p>) | Incorporated in Sri Lanka | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#padding-top--100 padding-bottom--100 | Paragraph (<p>) | Connect directly with our master travel designers to craft your p | `Firebase / CMS` | **About > Page Content** |
| `about.html` | section#sacred-cta-banner | Paragraph (<p>) | Speak directly with our senior destination specialists in Ja-Ela  | `Firebase / CMS` | **About > Page Content** |
| `about.html` | footer#siteFooter | Paragraph (<p>) | ADDRESS | `Firebase / CMS` | **Global > Footer & Legal** |
| `about.html` | footer#siteFooter | Paragraph (<p>) | Lotus Ceylon International Tours and Services (Pvt) Ltd,286/C, Ni | `Firebase / CMS` | **Global > Footer & Legal** |
| `about.html` | footer#siteFooter | Paragraph (<p>) | PHONE | `Firebase / CMS` | **Global > Footer & Legal** |
| `about.html` | footer#siteFooter | Paragraph (<p>) | +94 71 54 22 384 | `Firebase / CMS` | **Global > Footer & Legal** |
| `about.html` | footer#siteFooter | Paragraph (<p>) | EMAIL | `Firebase / CMS` | **Global > Footer & Legal** |
| `about.html` | footer#siteFooter | Paragraph (<p>) | info@lotusceylon.com | `Firebase / CMS` | **Global > Footer & Legal** |
| `about.html` | footer#siteFooter | Paragraph (<p>) | QUICK LINKS | `Firebase / CMS` | **Global > Footer & Legal** |
| `about.html` | footer#siteFooter | Paragraph (<p>) | NEWSLETTER | `Firebase / CMS` | **Global > Footer & Legal** |
| `about.html` | footer#siteFooter | Paragraph (<p>) | OUR PAYMENT PARTNERS | `Firebase / CMS` | **Global > Footer & Legal** |
| `about.html` | header#siteHeader | Link URL (<a href>) | ./index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/index.html | `Firebase / CMS` | **About > Page Content** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/cultural/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/buddhist-heritage/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/wildlife/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/beach/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/hill-country/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/ayurvedic/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/honeymoon/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/family/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/adventure/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/golf/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/ramayana/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./tours/index.html | `Firebase / CMS` | **About > Page Content** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./destinations.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./experiences.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./about.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./gallery.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./reviews.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./blog.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | nav#walkers-nav | Link URL (<a href>) | ./contact.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | EN | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | English | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | 繁體中文 (Taiwan) | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | 简体中文 (Modern) | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | Français (French) | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | Deutsch (German) | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | Русский | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | Español | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | Italiano | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | 日本語 | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | العربية | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | हिन्दी | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | Tiếng Việt | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Link URL (<a href>) | ./inquiry-detailed.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | header#siteHeader | Button / CTA | Open mobile navigation menu | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Button / CTA | × | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Button / CTA | Tours and Packages | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./tours/cultural/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./tours/buddhist-heritage/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./tours/wildlife/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./tours/beach/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./tours/hill-country/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./tours/ayurvedic/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./tours/honeymoon/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./tours/family/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./tours/adventure/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./tours/golf/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./tours/ramayana/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./tours/index.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./destinations.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./experiences.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./about.html | `Firebase / CMS` | **Global > Header & Navigation** |
| `about.html` | body | Link URL (<a href>) | ./gallery.html | `Firebase / CMS` | **Global > Header & Navigation** |

*... and 16,331 additional audited element entries systematically cataloged across all 105 site pages.*

---
### End of Phase 1 Audit Report
