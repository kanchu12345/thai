# Phase 0: Master Admin Content & CMS Coverage Audit Report

> **Target Objective**: 100% of visible content, links, images, SEO fields, tables, badges, and numbers on every public page must be editable, deletable, and uploadable from the admin panel with 0 hard-coded visible elements remaining.

## Executive Summary

- **Total Pages Audited**: `112` pages across the public repository.
- **Total Elements Audited**: `23,340` elements (headings, text, links, images, table cells, FAQs, badges, counters, meta tags, and schema).
- **Currently Bound to Firestore / CMS**: `9,537` elements (`40.9%`).
- **Hard-Coded Elements to be Migrated**: `13,803` elements (`59.1%`).

| Metric | Count | Percentage |
| :--- | :--- | :--- |
| **Total Public Pages** | `112` | `100.0%` |
| **Total Tracked Elements** | `23,340` | `100.0%` |
| **CMS Bound Elements** | `9,537` | `40.9%` |
| **Hard-Coded Elements (Phase 1-3 Scope)** | `13,803` | `59.1%` |

---

## Coverage by Page Category

| Category | Page Count | Total Elements | CMS Bound | Hard-Coded | Coverage % |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Category Pages (tours/*/index.html)** | `11` | `2,473` | `1,452` | `1,021` | `58.7%` |
| **Individual Tour Detail Pages (29 Tours)** | `29` | `8,640` | `2,001` | `6,639` | `23.2%` |
| **Destination Pages (24 Destinations)** | `24` | `3,960` | `1,896` | `2,064` | `47.9%` |
| **Core Site Pages (Home, About, Contact, etc.)** | `16` | `3,078` | `1,634` | `1,444` | `53.1%` |
| **Legacy / Redirect Stubs (*-tours.html)** | `16` | `75` | `0` | `75` | `0.0%` |
| **Blog Pages (4 Articles + Index)** | `6` | `1,023` | `413` | `610` | `40.4%` |

---

## Per-Page Comprehensive Audit Table

| Page Path | Total Elements | CMS Bound | Hard-Coded | Coverage % | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [`tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html`](tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html) | `341` | `69` | `272` | `20.2%` | 🔴 Low (<40%) |
| [`tours/cultural/three-millennia-of-living-heritage/index.html`](tours/cultural/three-millennia-of-living-heritage/index.html) | `331` | `69` | `262` | `20.8%` | 🔴 Low (<40%) |
| [`tours/beach/pristine-seaboard-odyssey/index.html`](tours/beach/pristine-seaboard-odyssey/index.html) | `322` | `69` | `253` | `21.4%` | 🔴 Low (<40%) |
| [`tours/wildlife/the-sri-lanka-big-five-expedition/index.html`](tours/wildlife/the-sri-lanka-big-five-expedition/index.html) | `322` | `69` | `253` | `21.4%` | 🔴 Low (<40%) |
| [`tours/family/the-grand-ceylon-family-adventure/index.html`](tours/family/the-grand-ceylon-family-adventure/index.html) | `318` | `69` | `249` | `21.7%` | 🔴 Low (<40%) |
| [`tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html`](tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html) | `316` | `69` | `247` | `21.8%` | 🔴 Low (<40%) |
| [`tours/beach/turquoise-eastern-sanctuary/index.html`](tours/beach/turquoise-eastern-sanctuary/index.html) | `310` | `69` | `241` | `22.3%` | 🔴 Low (<40%) |
| [`tours/family/wild-safari-coastal-family-holiday/index.html`](tours/family/wild-safari-coastal-family-holiday/index.html) | `307` | `69` | `238` | `22.5%` | 🔴 Low (<40%) |
| [`tours/hill-country/highland-wilderness-cascading-waterfalls/index.html`](tours/hill-country/highland-wilderness-cascading-waterfalls/index.html) | `307` | `69` | `238` | `22.5%` | 🔴 Low (<40%) |
| [`tours/honeymoon/pure-serenade-coastal-highland-romance/index.html`](tours/honeymoon/pure-serenade-coastal-highland-romance/index.html) | `306` | `69` | `237` | `22.5%` | 🔴 Low (<40%) |
| [`tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html`](tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html) | `305` | `69` | `236` | `22.6%` | 🔴 Low (<40%) |
| [`tours/adventure/wild-peaks-trails-surf-safari/index.html`](tours/adventure/wild-peaks-trails-surf-safari/index.html) | `299` | `69` | `230` | `23.1%` | 🔴 Low (<40%) |
| [`tours/beach/southern-sands-serenade/index.html`](tours/beach/southern-sands-serenade/index.html) | `299` | `69` | `230` | `23.1%` | 🔴 Low (<40%) |
| [`tours/hill-country/misty-peaks-scenic-railways-expedition/index.html`](tours/hill-country/misty-peaks-scenic-railways-expedition/index.html) | `295` | `69` | `226` | `23.4%` | 🔴 Low (<40%) |
| [`tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html`](tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html) | `295` | `69` | `226` | `23.4%` | 🔴 Low (<40%) |
| [`tours/family/island-wonder-multi-gen-family-discovery/index.html`](tours/family/island-wonder-multi-gen-family-discovery/index.html) | `294` | `69` | `225` | `23.5%` | 🔴 Low (<40%) |
| [`tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html`](tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html) | `293` | `69` | `224` | `23.5%` | 🔴 Low (<40%) |
| [`tours/golf/highland-greens-coastal-links-championship/index.html`](tours/golf/highland-greens-coastal-links-championship/index.html) | `292` | `69` | `223` | `23.6%` | 🔴 Low (<40%) |
| [`tours/buddhist-heritage/forest-hermitages-mindful-ceylon/index.html`](tours/buddhist-heritage/forest-hermitages-mindful-ceylon/index.html) | `291` | `69` | `222` | `23.7%` | 🔴 Low (<40%) |
| [`tours/cultural/the-sacred-lotus-triangle/index.html`](tours/cultural/the-sacred-lotus-triangle/index.html) | `291` | `69` | `222` | `23.7%` | 🔴 Low (<40%) |
| [`tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html`](tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html) | `288` | `69` | `219` | `24.0%` | 🔴 Low (<40%) |
| [`tours/buddhist-heritage/the-sacred-tooth-monastic-sanctuaries/index.html`](tours/buddhist-heritage/the-sacred-tooth-monastic-sanctuaries/index.html) | `283` | `69` | `214` | `24.4%` | 🔴 Low (<40%) |
| [`tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html`](tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html) | `283` | `69` | `214` | `24.4%` | 🔴 Low (<40%) |
| [`tours/wildlife/wild-ceylon-predator-elephant-trail/index.html`](tours/wildlife/wild-ceylon-predator-elephant-trail/index.html) | `283` | `69` | `214` | `24.4%` | 🔴 Low (<40%) |
| [`tours/adventure/island-adrenaline-rapids-expedition/index.html`](tours/adventure/island-adrenaline-rapids-expedition/index.html) | `281` | `69` | `212` | `24.6%` | 🔴 Low (<40%) |
| [`tours/ramayana/sacred-ramayana-heritage-trail/index.html`](tours/ramayana/sacred-ramayana-heritage-trail/index.html) | `274` | `69` | `205` | `25.2%` | 🔴 Low (<40%) |
| [`tours/golf/the-royal-ceylon-fairways-tour/index.html`](tours/golf/the-royal-ceylon-fairways-tour/index.html) | `272` | `69` | `203` | `25.4%` | 🔴 Low (<40%) |
| [`tours/buddhist-heritage/the-sacred-bodhi-ancient-kingdoms/index.html`](tours/buddhist-heritage/the-sacred-bodhi-ancient-kingdoms/index.html) | `271` | `69` | `202` | `25.5%` | 🔴 Low (<40%) |
| [`tours/cultural/royal-kingdoms-sacred-temples/index.html`](tours/cultural/royal-kingdoms-sacred-temples/index.html) | `271` | `69` | `202` | `25.5%` | 🔴 Low (<40%) |
| [`tours/beach/index.backup.html`](tours/beach/index.backup.html) | `423` | `227` | `196` | `53.7%` | 🟡 Partial (40-75%) |
| [`tours/cultural/index.backup.html`](tours/cultural/index.backup.html) | `412` | `216` | `196` | `52.4%` | 🟡 Partial (40-75%) |
| [`tours/wildlife/index.backup.html`](tours/wildlife/index.backup.html) | `414` | `223` | `191` | `53.9%` | 🟡 Partial (40-75%) |
| [`tours/family/index.backup.html`](tours/family/index.backup.html) | `362` | `179` | `183` | `49.4%` | 🟡 Partial (40-75%) |
| [`tours/hill-country/index.backup.html`](tours/hill-country/index.backup.html) | `338` | `167` | `171` | `49.4%` | 🟡 Partial (40-75%) |
| [`tours/index.backup.html`](tours/index.backup.html) | `360` | `190` | `170` | `52.8%` | 🟡 Partial (40-75%) |
| [`tours/index.html`](tours/index.html) | `360` | `190` | `170` | `52.8%` | 🟡 Partial (40-75%) |
| [`tours/ramayana/index.backup.html`](tours/ramayana/index.backup.html) | `288` | `144` | `144` | `50.0%` | 🟡 Partial (40-75%) |
| [`tours/honeymoon/index.backup.html`](tours/honeymoon/index.backup.html) | `291` | `149` | `142` | `51.2%` | 🟡 Partial (40-75%) |
| [`index.html`](index.html) | `412` | `271` | `141` | `65.8%` | 🟡 Partial (40-75%) |
| [`tours/adventure/index.backup.html`](tours/adventure/index.backup.html) | `287` | `146` | `141` | `50.9%` | 🟡 Partial (40-75%) |
| [`tours/golf/index.backup.html`](tours/golf/index.backup.html) | `288` | `147` | `141` | `51.0%` | 🟡 Partial (40-75%) |
| [`tours/ayurvedic/index.backup.html`](tours/ayurvedic/index.backup.html) | `266` | `136` | `130` | `51.1%` | 🟡 Partial (40-75%) |
| [`blog.html`](blog.html) | `185` | `72` | `113` | `38.9%` | 🔴 Low (<40%) |
| [`experiences.html`](experiences.html) | `245` | `134` | `111` | `54.7%` | 🟡 Partial (40-75%) |
| [`contact.html`](contact.html) | `199` | `94` | `105` | `47.2%` | 🟡 Partial (40-75%) |
| [`about.html`](about.html) | `282` | `178` | `104` | `63.1%` | 🟡 Partial (40-75%) |
| [`blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html`](blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html) | `168` | `65` | `103` | `38.7%` | 🔴 Low (<40%) |
| [`blog/living-healing-traditional-ceylon-ayurveda/index.html`](blog/living-healing-traditional-ceylon-ayurveda/index.html) | `167` | `65` | `102` | `38.9%` | 🔴 Low (<40%) |
| [`blog/growing-a-greener-future-volunteer-reforestation-sinharaja/index.html`](blog/growing-a-greener-future-volunteer-reforestation-sinharaja/index.html) | `165` | `65` | `100` | `39.4%` | 🔴 Low (<40%) |
| [`blog/the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya/index.html`](blog/the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya/index.html) | `165` | `65` | `100` | `39.4%` | 🔴 Low (<40%) |
| [`inquiry-detailed.html`](inquiry-detailed.html) | `183` | `84` | `99` | `45.9%` | 🟡 Partial (40-75%) |
| [`gallery.html`](gallery.html) | `231` | `134` | `97` | `58.0%` | 🟡 Partial (40-75%) |
| [`inquiry-quick.html`](inquiry-quick.html) | `178` | `82` | `96` | `46.1%` | 🟡 Partial (40-75%) |
| [`reviews.html`](reviews.html) | `173` | `77` | `96` | `44.5%` | 🟡 Partial (40-75%) |
| [`tours/beach/index.html`](tours/beach/index.html) | `270` | `174` | `96` | `64.4%` | 🟡 Partial (40-75%) |
| [`tours/buddhist-heritage/index.backup.html`](tours/buddhist-heritage/index.backup.html) | `195` | `99` | `96` | `50.8%` | 🟡 Partial (40-75%) |
| [`tours/buddhist-heritage/index.html`](tours/buddhist-heritage/index.html) | `198` | `102` | `96` | `51.5%` | 🟡 Partial (40-75%) |
| [`tours/cultural/index.html`](tours/cultural/index.html) | `271` | `175` | `96` | `64.6%` | 🟡 Partial (40-75%) |
| [`tours/wildlife/index.html`](tours/wildlife/index.html) | `269` | `173` | `96` | `64.3%` | 🟡 Partial (40-75%) |
| [`cancellation-policy.html`](cancellation-policy.html) | `178` | `83` | `95` | `46.6%` | 🟡 Partial (40-75%) |
| [`destinations.html`](destinations.html) | `272` | `177` | `95` | `65.1%` | 🟡 Partial (40-75%) |
| [`privacy-policy.html`](privacy-policy.html) | `183` | `88` | `95` | `48.1%` | 🟡 Partial (40-75%) |
| [`terms-conditions.html`](terms-conditions.html) | `177` | `82` | `95` | `46.3%` | 🟡 Partial (40-75%) |
| [`cookie-policy.html`](cookie-policy.html) | `172` | `78` | `94` | `45.3%` | 🟡 Partial (40-75%) |
| [`blog/ella-hands-on-tea-making-experience/index.html`](blog/ella-hands-on-tea-making-experience/index.html) | `173` | `81` | `92` | `46.8%` | 🟡 Partial (40-75%) |
| [`tours/adventure/index.html`](tours/adventure/index.html) | `204` | `113` | `91` | `55.4%` | 🟡 Partial (40-75%) |
| [`tours/ayurvedic/index.html`](tours/ayurvedic/index.html) | `203` | `112` | `91` | `55.2%` | 🟡 Partial (40-75%) |
| [`tours/family/index.html`](tours/family/index.html) | `217` | `126` | `91` | `58.1%` | 🟡 Partial (40-75%) |
| [`tours/golf/index.html`](tours/golf/index.html) | `215` | `124` | `91` | `57.7%` | 🟡 Partial (40-75%) |
| [`tours/hill-country/index.html`](tours/hill-country/index.html) | `217` | `126` | `91` | `58.1%` | 🟡 Partial (40-75%) |
| [`tours/honeymoon/index.html`](tours/honeymoon/index.html) | `204` | `113` | `91` | `55.4%` | 🟡 Partial (40-75%) |
| [`tours/ramayana/index.html`](tours/ramayana/index.html) | `205` | `114` | `91` | `55.6%` | 🟡 Partial (40-75%) |
| [`destinations/anuradhapura/index.html`](destinations/anuradhapura/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/arugam-bay/index.html`](destinations/arugam-bay/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/bentota-beruwala/index.html`](destinations/bentota-beruwala/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/colombo-kelani-valley/index.html`](destinations/colombo-kelani-valley/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/dambulla/index.html`](destinations/dambulla/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/ella-demodara/index.html`](destinations/ella-demodara/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/galle-dutch-fort/index.html`](destinations/galle-dutch-fort/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/haputale-lipton-s-seat/index.html`](destinations/haputale-lipton-s-seat/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/horton-plains-world-s-end/index.html`](destinations/horton-plains-world-s-end/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/kandy/index.html`](destinations/kandy/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/kataragama/index.html`](destinations/kataragama/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/kelaniya/index.html`](destinations/kelaniya/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/mihintale/index.html`](destinations/mihintale/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/minneriya-national-park/index.html`](destinations/minneriya-national-park/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/mirissa-weligama/index.html`](destinations/mirissa-weligama/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/negombo-beach-lagoon/index.html`](destinations/negombo-beach-lagoon/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/nuwara-eliya/index.html`](destinations/nuwara-eliya/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/polonnaruwa/index.html`](destinations/polonnaruwa/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/sigiriya-rock-citadel/index.html`](destinations/sigiriya-rock-citadel/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/sri-pada/index.html`](destinations/sri-pada/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/trincomalee-nilaveli/index.html`](destinations/trincomalee-nilaveli/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/udawalawe-national-park/index.html`](destinations/udawalawe-national-park/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/wilpattu-national-park/index.html`](destinations/wilpattu-national-park/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`destinations/yala-national-park/index.html`](destinations/yala-national-park/index.html) | `165` | `79` | `86` | `47.9%` | 🟡 Partial (40-75%) |
| [`tours/detail.html`](tours/detail.html) | `15` | `0` | `15` | `0.0%` | 🔴 Low (<40%) |
| [`adventure-tours.html`](adventure-tours.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`ayurvedic-tours.html`](ayurvedic-tours.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`beach-tours.html`](beach-tours.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`buddhist-heritage-tours.html`](buddhist-heritage-tours.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`category.html`](category.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`cultural-tours.html`](cultural-tours.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`family-tours.html`](family-tours.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`golf-tours.html`](golf-tours.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`hill-country-tours.html`](hill-country-tours.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`honeymoon-tours.html`](honeymoon-tours.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`ramayana-tours.html`](ramayana-tours.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`sri-lanka-tours.html`](sri-lanka-tours.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`tour-package-detail.html`](tour-package-detail.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`tours.html`](tours.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |
| [`wildlife-tours.html`](wildlife-tours.html) | `4` | `0` | `4` | `0.0%` | 🔴 Low (<40%) |

---

## Detailed Hard-Coded Elements Breakdown (Phase 1-3 Migration Targets)

### [`tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html`](tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html)
- **Coverage**: `69 / 341` elements bound (`20.2%`) | **Hard-Coded**: `272` elements

**Heading (34 hard-coded):**
- `<h1> Untamed Biosphere & Rainforest Odyssey`
- `<h2> A journey throughUntamed Biosphere & Rainforest Odyssey`
- `<h3> Arrival in Negombo • Gateway to Paradise`
- `<h3> Wilpattu National Park Safari`
- `<h3> Full-Day Wilpattu Naturalist Exploration`
- `<h3> Habarana & Minneriya Elephant Gathering`
- `<h3> Journey to Gal Oya • The Untamed East`
- `<h3> Boat Safari with Swimming Elephants & Vedda Tribe Walk`
- *... and 26 more*

**Paragraph (33 hard-coded):**
- `Select Language...`
- `From Primary Cloud Forests to Wetland Corridors...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Warm traditional welcome at the airport. Transfer to your boutique sea...`
- `Drive to Wilpattu. Afternoon 4x4 game drive tracking leopards around n...`
- `A full day of tracking sloth bears, spotted deer, and raptors in Wilpa...`
- `Drive across the central plains to Habarana. Afternoon 4x4 safari amon...`
- `Travel off the beaten path to Gal Oya National Park, Sri Lanka's least...`
- *... and 25 more*

**List Item (19 hard-coded):**
- `✓Private luxury vehicle with dedicated licensed safari chauf`
- `✓16 Nights luxury accommodation across premier eco-lodges an`
- `✓Daily breakfast and select gourmet dining experiences`
- `✓All private 4x4 safaris in Wilpattu, Minneriya, Kumana, Yal`
- `✓Unique boat safari in Gal Oya National Park and walk with i`
- `✓Guided biodiversity trekking in UNESCO Sinharaja Rainforest`
- `✓All national park permits, community fees, road tolls, and`
- `✕International flights and Sri Lanka ETA visa fees`
- *... and 11 more*

**Button (50 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 42 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/wildlife/udawalawe-3.webp' alt='Negombo'`
- `src='../../../assets/tours/wildlife/biosphere-odyssey-2.jpg' alt='Wilpattu'`
- `src='../../../assets/tours/wildlife/biosphere-odyssey-3.jpg' alt='Minneriya'`
- `src='../../../assets/images/wildlife/yala-leopard-1.webp' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/wildlife/minneriya-elephant-gathering-2.webp' alt='Wild Ceylon Predator & Elephan'`
- `src='../../../assets/images/wildlife/yala-leopard-1.webp' alt='The Sri Lanka Big Five Expedit'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/wildlife/udawalawe-3.webp' on <section>`

**Badge / Tag (70 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Wildlife, Safaris & Natu`
- `Badge: Inquire Now`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Meals: Breakfast & Gourmet Dinner`
- *... and 62 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Untamed Biosphere & Rainforest Odyssey |'`
- `meta[og:description]='A grand 17-day wildlife expedition acros'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Untamed Biosphere & Rainforest Odyssey |'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/cultural/three-millennia-of-living-heritage/index.html`](tours/cultural/three-millennia-of-living-heritage/index.html)
- **Coverage**: `69 / 331` elements bound (`20.8%`) | **Hard-Coded**: `262` elements

**Heading (32 hard-coded):**
- `<h1> Three Millennia of Living Heritage`
- `<h2> A journey throughThree Millennia of Living Heritage`
- `<h3> Arrival in Negombo • Coastal Sanctuary`
- `<h3> Wilpattu Sacred Monasteries & Anuradhapura`
- `<h3> The First Kingdom: Sacred Anuradhapura & Mihintale`
- `<h3> Journey into the Deep North • Jaffna Peninsula`
- `<h3> Jaffna Dutch Fort & Nagadeepa Sacred Island`
- `<h3> Southward to the Cultural Triangle • Sigiriya`
- *... and 24 more*

**Paragraph (31 hard-coded):**
- `Select Language...`
- `The Grand North-to-South Cultural & Historical Odyssey...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Warm arrival reception by your Lotus Ceylon private chauffeur guide. T...`
- `Drive northward toward Anuradhapura, visiting tranquil forest hermitag...`
- `Full day dedicated to the sacred stupas of Ruwanwelisaya, Abhayagiri, ...`
- `Cross the Elephant Pass causeway into the vibrant northern cultural ca...`
- `Explore the star-shaped Jaffna Dutch Fort and take a wooden ferry to s...`
- *... and 23 more*

**List Item (19 hard-coded):**
- `✓Private luxury vehicle with dedicated licensed chauffeur gu`
- `✓14 Nights luxury boutique and 5★ heritage accommodation acr`
- `✓Daily gourmet breakfast and curated dining experiences`
- `✓All monument and site entrance fees across Anuradhapura, Ja`
- `✓Bicycle hire in Polonnaruwa and private boat crossing to Na`
- `✓Tea factory private VIP tasting experience`
- `✓All tolls, parking, fuel, and 24/7 Lotus Ceylon concierge s`
- `✕International airfare and Sri Lanka ETA visa fees`
- *... and 11 more*

**Button (48 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 40 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/cultural/polonnaruwa-gal-vihara-3.webp' alt='Negombo'`
- `src='../../../assets/tours/cultural/three-millennia-2.jpg' alt='Wilpattu'`
- `src='../../../assets/tours/cultural/three-millennia-3.jpg' alt='Anuradhapura'`
- `src='../../../assets/images/cultural/sigiriya-1.webp' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/cultural/sigiriya-1.webp' alt='Royal Kingdoms & Sacred Temple'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='The Sacred Lotus Triangle'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/cultural/polonnaruwa-gal-vihara-3.webp' on <section>`

**Badge / Tag (66 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Culture, Heritage`
- `Badge: Inquire Now`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Meals: Breakfast & Gourmet Dinner`
- *... and 58 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Three Millennia of Living Heritage | Lot'`
- `meta[og:description]='The definitive 15-day cultural odyssey o'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Three Millennia of Living Heritage | Lot'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/beach/pristine-seaboard-odyssey/index.html`](tours/beach/pristine-seaboard-odyssey/index.html)
- **Coverage**: `69 / 322` elements bound (`21.4%`) | **Hard-Coded**: `253` elements

**Heading (31 hard-coded):**
- `<h1> Pristine Seaboard Odyssey`
- `<h2> A journey throughPristine Seaboard Odyssey`
- `<h3> Arrival in Colombo • Coastal Highway to Kalpitiya`
- `<h3> Kalpitiya Dolphin Pod Cruise & Coral Bar`
- `<h3> Historic Mannar Island • Ancient Baobab Trees`
- `<h3> Adam’s Bridge Mythical Sandbanks`
- `<h3> Crossing into Northern Jaffna Peninsula`
- `<h3> Casuarina Beach & Sacred Keerimalai Natural Springs`
- *... and 23 more*

**Paragraph (30 hard-coded):**
- `Select Language...`
- `Dolphins, Dunes & Untouched Northern Islands...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Meet your private chauffeur guide at the airport and head north to the...`
- `Embark at sunrise on a thrilling ocean cruise. Watch in awe as hundred...`
- `Journey north into the fascinating landscape of Mannar. Marvel at anci...`
- `Drive out to the western tip of Mannar Island to view the mythical lim...`
- `Cross the historic Elephant Pass causeway into the vibrant cultural la...`
- *... and 22 more*

**List Item (19 hard-coded):**
- `✓Private luxury vehicle with dedicated licensed chauffeur gu`
- `✓13 Nights luxury boutique and 5★ accommodation across remot`
- `✓Daily breakfast and select gourmet regional dinners`
- `✓Private dolphin watching boat expedition in Kalpitiya`
- `✓Ferry tickets to Nagadeepa Island and boat transfers to Pig`
- `✓All national park permits, community fees, road tolls, and`
- `✓24/7 dedicated concierge assistance, complimentary Wi-Fi, a`
- `✕International flights and ETA visa fees`
- *... and 11 more*

**Button (47 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 39 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/beach/unawatuna-2.webp' alt='Negombo'`
- `src='../../../assets/tours/beach/seaboard-odyssey-2.jpg' alt='Kalpitiya'`
- `src='../../../assets/tours/beach/seaboard-odyssey-3.jpg' alt='Mannar Island'`
- `src='../../../assets/images/beach-galle.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `src='../../../assets/images/beach/pasikudah-5.webp' alt='Turquoise Eastern Sanctuary'`
- `src='../../../assets/images/cultural/sigiriya-1.webp' alt='Royal Kingdoms & Sacred Temple'`
- `bg='../../../assets/images/beach/unawatuna-2.webp' on <section>`

**Badge / Tag (60 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Beach Leisure, Relaxatio`
- `Badge: Inquire Now`
- `Badge: Overnight: Kalpitiya Lagoon & Beach Reso`
- `Badge: Overnight: Kalpitiya Lagoon & Beach Reso`
- `Badge: Meals: Breakfast & Gourmet Dinner`
- *... and 52 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Pristine Seaboard Odyssey | Lotus Ceylon'`
- `meta[og:description]='The ultimate 14-day coastal voyage of Sr'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Pristine Seaboard Odyssey | Lotus Ceylon'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/wildlife/the-sri-lanka-big-five-expedition/index.html`](tours/wildlife/the-sri-lanka-big-five-expedition/index.html)
- **Coverage**: `69 / 322` elements bound (`21.4%`) | **Hard-Coded**: `253` elements

**Heading (31 hard-coded):**
- `<h1> The Sri Lanka Big Five Expedition`
- `<h2> A journey throughThe Sri Lanka Big Five Expedition`
- `<h3> Arrival in Negombo • Coastline Gateway`
- `<h3> Wilpattu National Park • Tracking the Sloth Bear & Leopard`
- `<h3> Full-Day Wilpattu Deep Wilderness Drive`
- `<h3> Transit to Habarana • Minneriya Elephant Gathering`
- `<h3> Minneriya / Hurulu Eco-Park Safari & Night Jungle Walk`
- `<h3> Scenic Route to Udawalawe National Park`
- *... and 23 more*

**Paragraph (30 hard-coded):**
- `Select Language...`
- `Leopard, Elephant, Sloth Bear, Blue Whale & Sperm Whale...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Receive an authentic VIP welcome by your Lotus Ceylon safari host. Tra...`
- `Drive northward to Wilpattu National Park. Afternoon 4x4 safari traver...`
- `Spend an entire day immersed in Wilpattu’s untouched wilderness with p...`
- `Drive to Habarana. In the late afternoon, embark on an open 4x4 safari...`
- `Morning at leisure at your jungle resort. Afternoon safari in Hurulu E...`
- *... and 22 more*

**List Item (19 hard-coded):**
- `✓Private luxury vehicle with dedicated licensed safari chauf`
- `✓13 Nights luxury accommodation in safari tented camps, eco-`
- `✓Daily breakfast and select gourmet dining experiences`
- `✓All private 4x4 safari jeeps and entry permits for Wilpattu`
- `✓Private chartered whale watching boat expedition off Miriss`
- `✓Entrance permits to Udawalawe Elephant Transit Home and Gal`
- `✓All road tolls, fuel, chauffeur fees, and round-the-clock c`
- `✕International flights and ETA visa fees`
- *... and 11 more*

**Button (47 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 39 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/wildlife/yala-leopard-1.webp' alt='Negombo'`
- `src='../../../assets/tours/wildlife/big-five-2.jpg' alt='Wilpattu'`
- `src='../../../assets/tours/wildlife/big-five-3.jpg' alt='Habarana'`
- `src='../../../assets/images/wildlife/yala-leopard-1.webp' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/wildlife/minneriya-elephant-gathering-2.webp' alt='Wild Ceylon Predator & Elephan'`
- `src='../../../assets/images/wildlife/udawalawe-3.webp' alt='Untamed Biosphere & Rainforest'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/wildlife/yala-leopard-1.webp' on <section>`

**Badge / Tag (60 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Wildlife, Safaris & Natu`
- `Badge: Inquire Now`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Meals: Breakfast & Gourmet Dinner`
- *... and 52 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='The Sri Lanka Big Five Expedition | Lotu'`
- `meta[og:description]='The definitive 14-day wildlife safari: t'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='The Sri Lanka Big Five Expedition | Lotu'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/family/the-grand-ceylon-family-adventure/index.html`](tours/family/the-grand-ceylon-family-adventure/index.html)
- **Coverage**: `69 / 318` elements bound (`21.7%`) | **Hard-Coded**: `249` elements

**Heading (31 hard-coded):**
- `<h1> The Grand Ceylon Family Adventure`
- `<h2> A journey throughThe Grand Ceylon Family Adventure`
- `<h3> Welcome to Ceylon & Coastal Relaxation in Negombo`
- `<h3> Drive North to Wilpattu National Park Border`
- `<h3> Wilpattu Safari & Sandstone Ruins of Anuradhapura`
- `<h3> Sacred Bodhi Tree & Transfer to Sigiriya`
- `<h3> Sigiriya Rock Palace & Chena Farm Village Lunch`
- `<h3> Dambulla Golden Caves & Matale Spice Gardens`
- *... and 23 more*

**Paragraph (30 hard-coded):**
- `Select Language...`
- `Two magical weeks covering ancient wonders, wild national parks, sceni...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Arrival at CMB airport. Private transfer to a family resort with swimm...`
- `Journey through scenic coconut estates to the borders of Wilpattu, Sri...`
- `Morning jeep safari around natural sand-rimmed water basins (Villus). ...`
- `Visit the 2,300-year-old Jaya Sri Maha Bodhi tree. Drive south to a be...`
- `Morning ascent of Sigiriya Rock Fortress. Enjoy an authentic rural lun...`
- *... and 22 more*

**List Item (16 hard-coded):**
- `✓13 Nights in luxury family-friendly resorts with interconne`
- `✓Private spacious air-conditioned vehicle with experienced f`
- `✓Wilpattu National Park safari jeep, guide, and entrance per`
- `✓Madu Ganga river boat safari and Kosgoda turtle hatchery ti`
- `✓All national monument tickets and daily breakfast and dinne`
- `✕International flights`
- `✕Visas`
- `✕Personal expenses`
- *... and 8 more*

**Button (47 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 39 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Negombo'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Wilpattu'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Cultural Triangle'`
- `src='../../../assets/images/sigiriya.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Island Wonder Multi-Gen Family'`
- `src='../../../assets/images/wildlife.jpg' alt='Wild Safari & Coastal Family H'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/hero-nine-arches.jpg' on <section>`

**Badge / Tag (59 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Families, Multi-Gen Disc`
- `Badge: Inquire Now`
- `Badge: Overnight: Coastal Family Resort, Negomb`
- `Badge: Overnight: Coastal Family Resort, Negomb`
- `Badge: Meals: Dinner Included`
- *... and 51 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='The Grand Ceylon Family Adventure | Lotu'`
- `meta[og:description]='The ultimate two-week family tour of Sri'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='The Grand Ceylon Family Adventure | Lotu'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html`](tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html)
- **Coverage**: `69 / 316` elements bound (`21.8%`) | **Hard-Coded**: `247` elements

**Heading (31 hard-coded):**
- `<h1> Sacred Serenity & Forest Meditation Retreat`
- `<h2> A journey throughSacred Serenity & Forest Meditation Retreat`
- `<h3> Arrival & Gentle Transfer to Cultural Forest Haven`
- `<h3> Dambulla Sacred Rock Caves & Vipassana Introduction`
- `<h3> Forest Hermitage Meditation & Monastic Audience`
- `<h3> Ritigala Strict Nature Reserve & Meditative Ruins`
- `<h3> Transfer to Kandy & Evening Temple Puja Drums`
- `<h3> Embekke Woodcarving Shrines & Meditation Walk`
- *... and 23 more*

**Paragraph (30 hard-coded):**
- `Select Language...`
- `Combine ancient Buddhist meditation, forest monasteries, and Ayurvedic...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Arrival at CMB airport. Private transfer to a serene forest hermitage ...`
- `Morning silent walk through the five sacred cave sanctuaries of Dambul...`
- `Visit an active Buddhist forest monastery (Aranya Senasanaya). Experie...`
- `Explore the stone monastic bridges and meditation platforms of 1st-cen...`
- `Drive into the hills of Kandy. Participate in evening oil lamp offerin...`
- *... and 22 more*

**List Item (16 hard-coded):**
- `✓13 Nights in monastic eco-retreats and premier oceanfront A`
- `✓All Ayurvedic therapies, doctor consultations, medicines, a`
- `✓Full board dining during Ayurvedic stay and half board in c`
- `✓Private scholarly Buddhist guide for temple and forest herm`
- `✓Private luxury air-conditioned chauffeur throughout`
- `✕International flights`
- `✕Visas`
- `✕Personal extras`
- *... and 8 more*

**Button (47 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 39 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/temple-culture.jpg' alt='Colombo'`
- `src='../../../assets/images/temple-culture.jpg' alt='Dambulla'`
- `src='../../../assets/images/temple-culture.jpg' alt='Kandy'`
- `src='../../../assets/images/honeymoon/seaside-villa-1.webp' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/temple-culture.jpg' alt='Lotus Ayu Holistic Rejuvenatio'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `src='../../../assets/images/beach/pasikudah-5.webp' alt='Turquoise Eastern Sanctuary'`
- `bg='../../../assets/images/temple-culture.jpg' on <section>`

**Badge / Tag (57 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Ayurveda, Wellness & Hea`
- `Badge: Inquire Now`
- `Badge: Overnight: Forest Meditation Sanctuary,`
- `Badge: Overnight: Forest Meditation Sanctuary,`
- `Badge: Meals: Dinner Included`
- *... and 49 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sacred Serenity & Forest Meditation Retr'`
- `meta[og:description]='Discover inner tranquility with Buddhist'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sacred Serenity & Forest Meditation Retr'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/beach/turquoise-eastern-sanctuary/index.html`](tours/beach/turquoise-eastern-sanctuary/index.html)
- **Coverage**: `69 / 310` elements bound (`22.3%`) | **Hard-Coded**: `241` elements

**Heading (29 hard-coded):**
- `<h1> Turquoise Eastern Sanctuary`
- `<h2> A journey throughTurquoise Eastern Sanctuary`
- `<h3> Arrival in Negombo • Gateway to Ceylon`
- `<h3> Cross-Island Journey to Trincomalee`
- `<h3> Pigeon Island Marine Sanctuary Snorkeling Expedition`
- `<h3> Koneswaram Cliff Temple & Fort Frederick`
- `<h3> Coastal Route to the Shallows of Pasikudah`
- `<h3> Barefoot Lagoon Relaxation & Water Sports`
- *... and 21 more*

**Paragraph (28 hard-coded):**
- `Select Language...`
- `Crystal Coral Lagoons, Surfing & Cliffside Shrines...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Touch down in Sri Lanka and transfer to a serene seaside retreat in Ne...`
- `Drive across the lush central dry plains toward the historic naval har...`
- `Take a short speedboat ride to Pigeon Island National Park. Put on you...`
- `Visit historic Fort Frederick and the sacred Koneswaram Kovil perched ...`
- `Follow the eastern coastline south to Pasikudah, renowned for having o...`
- *... and 20 more*

**List Item (19 hard-coded):**
- `✓Private luxury vehicle with professional licensed chauffeur`
- `✓11 Nights premium accommodation in luxury boutique beachfro`
- `✓Daily breakfast and select dinners`
- `✓Speedboat transfers and full snorkeling equipment at Pigeon`
- `✓Pottuvil Lagoon canoe safari with local wildlife boatman`
- `✓All conservation fees, temple entrance tickets, and road to`
- `✓24/7 Lotus Ceylon concierge support, cold bottled water, an`
- `✕International flights and visa fees`
- *... and 11 more*

**Button (45 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 37 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/beach/pasikudah-5.webp' alt='Negombo'`
- `src='../../../assets/tours/beach/eastern-sanctuary-2.jpg' alt='Trincomalee'`
- `src='../../../assets/tours/beach/eastern-sanctuary-3.jpg' alt='Nilaveli'`
- `src='../../../assets/images/beach-galle.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `src='../../../assets/images/beach/unawatuna-2.webp' alt='Pristine Seaboard Odyssey'`
- `src='../../../assets/images/cultural/sigiriya-1.webp' alt='Royal Kingdoms & Sacred Temple'`
- `bg='../../../assets/images/beach/pasikudah-5.webp' on <section>`

**Badge / Tag (54 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Beach Leisure, Relaxatio`
- `Badge: Inquire Now`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Meals: Breakfast & Gourmet Dinner`
- *... and 46 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Turquoise Eastern Sanctuary | Lotus Ceyl'`
- `meta[og:description]='Discover Sri Lanka's East Coast: Pigeon '`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Turquoise Eastern Sanctuary | Lotus Ceyl'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/family/wild-safari-coastal-family-holiday/index.html`](tours/family/wild-safari-coastal-family-holiday/index.html)
- **Coverage**: `69 / 307` elements bound (`22.5%`) | **Hard-Coded**: `238` elements

**Heading (29 hard-coded):**
- `<h1> Wild Safari & Coastal Family Holiday`
- `<h2> A journey throughWild Safari & Coastal Family Holiday`
- `<h3> Arrival & Leisurely Recovery in Negombo Lagoon Resort`
- `<h3> Drive to Minneriya Elephant Country`
- `<h3> Minneriya Great Elephant Gathering Safari`
- `<h3> Sigiriya Lion Rock Morning Exploration`
- `<h3> Transfer to Hill Country Kandy & Temple Walk`
- `<h3> Scenic Train to Ella & Nine Arches Bridge`
- *... and 21 more*

**Paragraph (28 hard-coded):**
- `Select Language...`
- `The ideal blend of exciting animal encounters, rainforest wonders, and...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Meet your private chauffeur. Check into a calm lagoon resort to recove...`
- `Drive into the north-central dry zone. Check into a spacious nature lo...`
- `Afternoon private 4x4 open-top jeep safari watching herds of wild elep...`
- `Morning visit to the dramatic 5th-century palace citadel. Children lov...`
- `Scenic drive into Kandy. Visit the historic lakeside temple and witnes...`
- *... and 20 more*

**List Item (16 hard-coded):**
- `✓11 Nights in premium family-friendly hotels and safari lodg`
- `✓Private spacious air-conditioned vehicle with patient famil`
- `✓Minneriya & Yala National Park safari jeeps, park rangers,`
- `✓Udawalawe Elephant Transit Home and Kosgoda turtle hatchery`
- `✓First-class train tickets and daily breakfast and dinner`
- `✕International airfare`
- `✕Visas`
- `✕Optional water sports`
- *... and 8 more*

**Button (45 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 37 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/wildlife.jpg' alt='Colombo'`
- `src='../../../assets/images/wildlife.jpg' alt='Minneriya'`
- `src='../../../assets/images/wildlife.jpg' alt='Kandy'`
- `src='../../../assets/images/sigiriya.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Island Wonder Multi-Gen Family'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='The Grand Ceylon Family Advent'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/wildlife.jpg' on <section>`

**Badge / Tag (54 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Families, Multi-Gen Disc`
- `Badge: Inquire Now`
- `Badge: Overnight: Lagoon Resort, NegomboMeals:`
- `Badge: Overnight: Lagoon Resort, Negombo`
- `Badge: Meals: Dinner Included`
- *... and 46 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Wild Safari & Coastal Family Holiday | L'`
- `meta[og:description]='An unforgettable family journey through '`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Wild Safari & Coastal Family Holiday | L'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/hill-country/highland-wilderness-cascading-waterfalls/index.html`](tours/hill-country/highland-wilderness-cascading-waterfalls/index.html)
- **Coverage**: `69 / 307` elements bound (`22.5%`) | **Hard-Coded**: `238` elements

**Heading (29 hard-coded):**
- `<h1> Highland Wilderness & Cascading Waterfalls`
- `<h2> A journey throughHighland Wilderness & Cascading Waterfalls`
- `<h3> Arrival in Colombo & Transfer to Kelani River Valley`
- `<h3> Rainforest Waterfalls & Secret Canyon Pools`
- `<h3> Aberdeen & Laxapana Twin Cataracts Route`
- `<h3> St. Clair’s & Devon Falls Panoramic Circuit`
- `<h3> Horton Plains Wilderness & World’s End`
- `<h3> Transfer to Misty Haputale & High Tea`
- *... and 21 more*

**Paragraph (28 hard-coded):**
- `Select Language...`
- `A majestic exploration of Sri Lanka's alpine wilderness, roaring catar...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Meet your private chauffeur guide and drive into the rainforest valley...`
- `Morning trek through riverine rainforest to hidden waterfalls. Enjoy a...`
- `Scenic drive visiting Aberdeen Falls and the roaring 126-meter Laxapan...`
- `Visit 'Little Niagara of Sri Lanka' St. Clair's Falls. Taste artisanal...`
- `Hike the 9.5 km loop of Horton Plains. Marvel at misty Baker's Falls c...`
- *... and 20 more*

**List Item (16 hard-coded):**
- `✓11 Nights in boutique mountain lodges and luxury ridge-top`
- `✓Daily breakfast and dinner throughout`
- `✓Private luxury vehicle with seasoned highland chauffeur gui`
- `✓All waterfall conservation zone permits and guide fees`
- `✓Horton Plains National Park trek and Lipton's Seat excursio`
- `✕International flights`
- `✕Visas`
- `✕Lunches not stated`
- *... and 8 more*

**Button (45 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 37 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/tea-country.jpg' alt='Colombo'`
- `src='../../../assets/images/tea-country.jpg' alt='Kitulgala'`
- `src='../../../assets/images/tea-country.jpg' alt='Nuwara Eliya'`
- `src='../../../assets/images/tea-country.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/tea-country.jpg' alt='Ceylon Tea Trails & Colonial G'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Misty Peaks & Scenic Railways '`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/tea-country.jpg' on <section>`

**Badge / Tag (54 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Tea Country, Mountain Vi`
- `Badge: Inquire Now`
- `Badge: Overnight: Riverside Eco-Luxury Lodge, K`
- `Badge: Overnight: Riverside Eco-Luxury Lodge, K`
- `Badge: Meals: Dinner Included`
- *... and 46 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Highland Wilderness & Cascading Waterfal'`
- `meta[og:description]='Explore Sri Lanka's tallest waterfalls, '`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Highland Wilderness & Cascading Waterfal'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/honeymoon/pure-serenade-coastal-highland-romance/index.html`](tours/honeymoon/pure-serenade-coastal-highland-romance/index.html)
- **Coverage**: `69 / 306` elements bound (`22.5%`) | **Hard-Coded**: `237` elements

**Heading (29 hard-coded):**
- `<h1> Pure Serenade Coastal & Highland Romance`
- `<h2> A journey throughPure Serenade Coastal & Highland Romance`
- `<h3> Arrival in Colombo & Transfer to Cultural Oasis`
- `<h3> Sigiriya Rock Palace at Golden Hour`
- `<h3> Bicycle Ride Through Ancient Royal Monasteries`
- `<h3> Ascent to Nuwara Eliya Mountain Retreat`
- `<h3> Scenic Mountain Train & Nine Arches Viaduct`
- `<h3> Descent to Yala Safari Wilderness Glamping`
- *... and 21 more*

**Paragraph (28 hard-coded):**
- `Select Language...`
- `An intimate grand tour uniting ancient water gardens, mist-clad peaks,...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Warm welcome at CMB airport. Transfer to an eco-luxury water pavilion ...`
- `Morning at leisure by your private pool. In the late afternoon, ascend...`
- `Leisurely cycling through shaded ruins of Polonnaruwa royal capital. P...`
- `Drive past Dambulla into misty tea country. Check into a colonial mano...`
- `Scenic rail journey through tea-clad cliffs to Ella. Stroll along Nine...`
- *... and 20 more*

**List Item (17 hard-coded):**
- `✓11 Nights in premier boutique hotels, luxury glamping tents`
- `✓All gourmet dinners including private beach BBQ and champag`
- `✓Exclusive private whale watching charter boat in Mirissa`
- `✓Private 4x4 custom safari drives in Yala with dedicated nat`
- `✓Private luxury vehicle with executive chauffeur guide`
- `✓All park permits, monument entrances, and government taxes`
- `✕International flights`
- `✕Visas`
- *... and 9 more*

**Button (45 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 37 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/couple-travel.jpg' alt='Colombo'`
- `src='../../../assets/images/couple-travel.jpg' alt='Cultural Triangle'`
- `src='../../../assets/images/couple-travel.jpg' alt='Nuwara Eliya'`
- `src='../../../assets/images/couple-travel.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/couple-travel.jpg' alt='Enchanted Ceylon Romantic Hide'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `src='../../../assets/images/beach/pasikudah-5.webp' alt='Turquoise Eastern Sanctuary'`
- `bg='../../../assets/images/couple-travel.jpg' on <section>`

**Badge / Tag (52 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Romance, Honeymoon Luxur`
- `Badge: Inquire Now`
- `Badge: Overnight: Water Garden Pavilion, Sigiri`
- `Badge: Overnight: Water Garden Pavilion, Sigiri`
- `Badge: Meals: Dinner & Champagne`
- *... and 44 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Pure Serenade Coastal & Highland Romance'`
- `meta[og:description]='Experience the ultimate Sri Lanka honeym'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Pure Serenade Coastal & Highland Romance'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html`](tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html)
- **Coverage**: `69 / 305` elements bound (`22.6%`) | **Hard-Coded**: `236` elements

**Heading (29 hard-coded):**
- `<h1> The Grand Ceylon Masters Golf Odyssey`
- `<h2> A journey throughThe Grand Ceylon Masters Golf Odyssey`
- `<h3> VIP Airport Arrival & The Kingsbury Colombo Check-In`
- `<h3> Round 1: 18 Holes at Royal Colombo Golf Club`
- `<h3> Transfer to Victoria Golf Resort Kandy`
- `<h3> Round 2: 18 Holes at Victoria Championship Course`
- `<h3> Round 3: 18 Holes Victoria Re-Match & Temple Visit`
- `<h3> Scenic Ascent to Nuwara Eliya Alpine Highlands`
- *... and 21 more*

**Paragraph (28 hard-coded):**
- `Select Language...`
- `The ultimate luxury golfing journey: 6 rounds across championship cour...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `VIP expedited arrival at CMB airport. Check into your ocean-facing lux...`
- `Morning 18-hole championship round on historic colonial parkland fairw...`
- `Private luxury transfer into the central hills. Afternoon practice rou...`
- `First competitive 18 holes on Donald Steel’s spectacular lake-bordered...`
- `Second full 18-hole round at Victoria. Evening private cultural blessi...`
- *... and 20 more*

**List Item (16 hard-coded):**
- `✓11 Nights in 5-star luxury hotels, golf villas, and colonia`
- `✓Green fees, private senior caddies, and carts for 6 champio`
- `✓Guaranteed prime morning tee times and unlimited practice r`
- `✓Spacious private luxury executive van for players, companio`
- `✓Daily breakfast, gourmet clubhouse lunches, and fine dining`
- `✕International airfare`
- `✕Visas`
- `✕Club rentals`
- *... and 8 more*

**Button (45 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 37 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/tea-country.jpg' alt='Colombo'`
- `src='../../../assets/images/tea-country.jpg' alt='Kandy'`
- `src='../../../assets/images/tea-country.jpg' alt='Nuwara Eliya'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/tea-country.jpg' alt='The Royal Ceylon Fairways Tour'`
- `src='../../../assets/images/tea-country.jpg' alt='Highland Greens & Coastal Link'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/tea-country.jpg' on <section>`

**Badge / Tag (52 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Championship Golf, Luxur`
- `Badge: Inquire Now`
- `Badge: Overnight: The Kingsbury 5-Star Hotel, C`
- `Badge: Overnight: The Kingsbury 5-Star Hotel, C`
- `Badge: Meals: Dinner & Welcome Cocktails`
- *... and 44 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='The Grand Ceylon Masters Golf Odyssey | '`
- `meta[og:description]='The definitive Sri Lanka golf tour: 6 ch'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='The Grand Ceylon Masters Golf Odyssey | '`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/adventure/wild-peaks-trails-surf-safari/index.html`](tours/adventure/wild-peaks-trails-surf-safari/index.html)
- **Coverage**: `69 / 299` elements bound (`23.1%`) | **Hard-Coded**: `230` elements

**Heading (28 hard-coded):**
- `<h1> Wild Peaks, Trails & Surf Safari`
- `<h2> A journey throughWild Peaks, Trails & Surf Safari`
- `<h3> Arrival & Coastal Transition in Negombo`
- `<h3> Into the Deep UNESCO Sinharaja Rainforest`
- `<h3> Sinharaja Bird Waves & Hidden Waterfall Rappel`
- `<h3> Ascent to Ella High Ridges`
- `<h3> Descent to Arugam Bay Surf Mecca`
- `<h3> Dawn Surf Session & Lagoon Wildlife Kayak`
- *... and 20 more*

**Paragraph (27 hard-coded):**
- `Select Language...`
- `From the deep virgin canopy of Sinharaja to high-altitude peaks and le...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Meet your private adventure guide. Rest and refresh overlooking the oc...`
- `Drive to the borders of Sinharaja. Trek under towering rainforest cano...`
- `Witness the world's largest mixed-species bird feeding flocks. Enjoy c...`
- `Drive into the central highlands. Hike through tea terraces to Little ...`
- `Cross the dramatic transition from misty tea highlands to arid eastern...`
- *... and 19 more*

**List Item (16 hard-coded):**
- `✓10 Nights in boutique rainforest lodges, surf retreats, and`
- `✓Private custom expedition 4WD vehicle and adventure chauffe`
- `✓Sinharaja expert tracking naturalist and Kumana 4x4 safari`
- `✓Lagoon kayak expedition and surf coaching gear`
- `✓All national park permits and conservation tickets`
- `✕International flights`
- `✕Visas`
- `✕Personal extras`
- *... and 8 more*

**Button (44 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 36 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/adventure.jpg' alt='Negombo'`
- `src='../../../assets/images/adventure.jpg' alt='Sinharaja'`
- `src='../../../assets/images/adventure.jpg' alt='Ella'`
- `src='../../../assets/images/adventure.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/adventure.jpg' alt='Island Adrenaline & Rapids Exp'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `src='../../../assets/images/beach/pasikudah-5.webp' alt='Turquoise Eastern Sanctuary'`
- `bg='../../../assets/images/adventure.jpg' on <section>`

**Badge / Tag (49 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Active Adventure, Water`
- `Badge: Inquire Now`
- `Badge: Overnight: Beach Villa, NegomboMeals: Di`
- `Badge: Overnight: Beach Villa, Negombo`
- `Badge: Meals: Dinner Included`
- *... and 41 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Wild Peaks, Trails & Surf Safari | Lotus'`
- `meta[og:description]='The ultimate adventure: Sinharaja rainfo'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Wild Peaks, Trails & Surf Safari | Lotus'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/beach/southern-sands-serenade/index.html`](tours/beach/southern-sands-serenade/index.html)
- **Coverage**: `69 / 299` elements bound (`23.1%`) | **Hard-Coded**: `230` elements

**Heading (27 hard-coded):**
- `<h1> Southern Sands Serenade`
- `<h2> A journey throughSouthern Sands Serenade`
- `<h3> Arrival in Paradise • Tropical Warmth in Negombo`
- `<h3> Scenic Southern Highway • Tangalle’s Secluded Bays`
- `<h3> Hummanaya Natural Geyser & Mulgirigala Monastic Rock`
- `<h3> Coastal Drive to Mirissa • Sunset at Coconut Tree Hill`
- `<h3> Gentle Ocean Giants • Blue Whale Marine Safari`
- `<h3> Unawatuna Bay & Living Heritage of UNESCO Galle Fort`
- *... and 19 more*

**Paragraph (26 hard-coded):**
- `Select Language...`
- `Sun-Kissed Bays, Blue Whales & Dutch Ramparts...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Arrive at Bandaranaike International Airport where your private Lotus ...`
- `Journey south along the scenic expressway towards Tangalle, famed for ...`
- `Witness the dramatic Hummanaya natural sea blowhole sending spray 30 m...`
- `Drive west along the picturesque coastline to Mirissa. In the late aft...`
- `Board a private chartered boat at sunrise into the deep oceanic trench...`
- *... and 18 more*

**List Item (20 hard-coded):**
- `✓Private luxury air-conditioned vehicle with dedicated licen`
- `✓9 Nights luxury accommodation in handpicked 4★/5★ beachfron`
- `✓Daily gourmet breakfast and select coastal dinners`
- `✓Private Mirissa blue whale & dolphin watching boat charter`
- `✓Private guided walking tour of UNESCO Galle Dutch Fort with`
- `✓Madu River mangrove boat safari and Kosgoda Sea Turtle Sanc`
- `✓All road tolls, fuel, parking fees, and chauffeur accommoda`
- `✓Complimentary high-speed in-vehicle Wi-Fi, chilled bottled`
- *... and 12 more*

**Button (43 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 35 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Negombo'`
- `src='../../../assets/tours/beach/southern-sands-2.jpg' alt='Tangalle'`
- `src='../../../assets/tours/beach/southern-sands-3.jpg' alt='Mirissa'`
- `src='../../../assets/images/beach-galle.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/beach/pasikudah-5.webp' alt='Turquoise Eastern Sanctuary'`
- `src='../../../assets/images/beach/unawatuna-2.webp' alt='Pristine Seaboard Odyssey'`
- `src='../../../assets/images/cultural/sigiriya-1.webp' alt='Royal Kingdoms & Sacred Temple'`
- `bg='../../../assets/images/beach/mirissa-1.webp' on <section>`

**Badge / Tag (48 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Beach Leisure, Relaxatio`
- `Badge: Inquire Now`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Meals: Breakfast & Gourmet Dinner`
- *... and 40 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Southern Sands Serenade | Lotus Ceylon P'`
- `meta[og:description]='Experience 10 days of barefoot luxury on'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Southern Sands Serenade | Lotus Ceylon'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/hill-country/misty-peaks-scenic-railways-expedition/index.html`](tours/hill-country/misty-peaks-scenic-railways-expedition/index.html)
- **Coverage**: `69 / 295` elements bound (`23.4%`) | **Hard-Coded**: `226` elements

**Heading (27 hard-coded):**
- `<h1> Misty Peaks & Scenic Railways Expedition`
- `<h2> A journey throughMisty Peaks & Scenic Railways Expedition`
- `<h3> Arrival in Tropical Negombo Coastal Haven`
- `<h3> Ascent to Sacred Kandy & Cultural Heritage Evening`
- `<h3> Train Stage 1: Kandy to Hatton Tea Country`
- `<h3> Castlereagh Reservoir Cruise & High Mountain Tea Plucking`
- `<h3> Train Stage 2: Hatton to Nanu Oya (Nuwara Eliya)`
- `<h3> Horton Plains Plateau & Baker’s Falls Cloud Forest`
- *... and 19 more*

**Paragraph (26 hard-coded):**
- `Select Language...`
- `The definitive highland railway odyssey across dramatic bridges, cloud...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Arrive at CMB airport and enjoy a private 20-minute transfer to your c...`
- `Drive past lush pineapple plantations into Kandy. Evening cultural dru...`
- `Board the observation saloon train climbing through steep mountain ben...`
- `Gentle morning boat excursion on the mirror-like waters of Castlereagh...`
- `Board the train for the scenic climb through Great Western mountain pa...`
- *... and 18 more*

**List Item (17 hard-coded):**
- `✓9 Nights in luxury boutique mountain hotels and restored pl`
- `✓Daily breakfast and 3-course gourmet dinners`
- `✓First-class reserved tickets for 3 scenic railway segments`
- `✓Dedicated private chauffeur guide and private mountain vehi`
- `✓All national park and excursion entrance permits`
- `✓24/7 on-ground travel designer support`
- `✕International flights & visas`
- `✕Lunches not specified`
- *... and 9 more*

**Button (43 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 35 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Negombo'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Kandy'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Hatton'`
- `src='../../../assets/images/tea-country.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/tea-country.jpg' alt='Ceylon Tea Trails & Colonial G'`
- `src='../../../assets/images/tea-country.jpg' alt='Highland Wilderness & Cascadin'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/hero-nine-arches.jpg' on <section>`

**Badge / Tag (47 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Tea Country, Mountain Vi`
- `Badge: Inquire Now`
- `Badge: Overnight: Beachfront Boutique Resort, N`
- `Badge: Overnight: Beachfront Boutique Resort, N`
- `Badge: Meals: Dinner Included`
- *... and 39 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Misty Peaks & Scenic Railways Expedition'`
- `meta[og:description]='Experience Sri Lanka's world-famous scen'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Misty Peaks & Scenic Railways Expedition'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html`](tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html)
- **Coverage**: `69 / 295` elements bound (`23.4%`) | **Hard-Coded**: `226` elements

**Heading (27 hard-coded):**
- `<h1> The Epic Ramayana Chronicle Pilgrimage`
- `<h2> A journey throughThe Epic Ramayana Chronicle Pilgrimage`
- `<h3> Arrival in Colombo & Coastal Journey to Chilaw`
- `<h3> Mannar Island, Thiruketheeswaram & Rama Setu (Adam's Bridge)`
- `<h3> Naguleswaram Temple & Jaffna Cultural Heritage`
- `<h3> Trincomalee Koneswaram Temple & Kanniya Hot Springs`
- `<h3> Ascent to Hill Capital of Kandy`
- `<h3> Sri Bhakta Hanuman Temple & Seetha Amman Temple`
- *... and 19 more*

**Paragraph (26 hard-coded):**
- `Select Language...`
- `The ultimate 10-day cross-island pilgrimage tracing sacred shrines fro...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Meet your private scholarly guide. Drive north to Chilaw. Evening puja...`
- `Drive across Mannar causeway. Visit ancient Thiruketheeswaram Shiva te...`
- `Visit Naguleswaram temple and sacred Keerimalai springs where sage Nag...`
- `Cross to the east coast. Visit Koneswaram Temple perched atop Swami Ro...`
- `Scenic drive into central highlands. Evening cultural drum offering an...`
- *... and 18 more*

**List Item (16 hard-coded):**
- `✓9 Nights in handpicked hotels with authentic vegetarian din`
- `✓Dedicated private air-conditioned vehicle with Ramayana-spe`
- `✓All temple puja offerings, entry permits, and sacred site a`
- `✓Daily vegetarian breakfast and dinner throughout`
- `✓24/7 Lotus Ceylon concierge and pilgrim support`
- `✕International flights`
- `✕Visas`
- `✕Personal donations`
- *... and 8 more*

**Button (43 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 35 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/polonnaruwa.jpg' alt='Colombo'`
- `src='../../../assets/images/polonnaruwa.jpg' alt='Mannar'`
- `src='../../../assets/images/polonnaruwa.jpg' alt='Jaffna'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/polonnaruwa.jpg' alt='Sacred Ramayana Heritage Trail'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `src='../../../assets/images/beach/pasikudah-5.webp' alt='Turquoise Eastern Sanctuary'`
- `bg='../../../assets/images/polonnaruwa.jpg' on <section>`

**Badge / Tag (48 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Sacred Heritage, Spiritu`
- `Badge: Inquire Now`
- `Badge: Overnight: Coastal Hotel, Chilaw/Kalpiti`
- `Badge: Overnight: Coastal Hotel, Chilaw/Kalpiti`
- `Badge: Meals: Vegetarian Dinner`
- *... and 40 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='The Epic Ramayana Chronicle Pilgrimage |'`
- `meta[og:description]='Cross-island sacred Ramayana pilgrimage:'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='The Epic Ramayana Chronicle Pilgrimage |'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/family/island-wonder-multi-gen-family-discovery/index.html`](tours/family/island-wonder-multi-gen-family-discovery/index.html)
- **Coverage**: `69 / 294` elements bound (`23.5%`) | **Hard-Coded**: `225` elements

**Heading (27 hard-coded):**
- `<h1> Island Wonder Multi-Gen Family Discovery`
- `<h2> A journey throughIsland Wonder Multi-Gen Family Discovery`
- `<h3> Arrival in Colombo & Child-Friendly Coastal Check-In`
- `<h3> Pinnawala Elephants & Transfer to Sigiriya Forest Resort`
- `<h3> Sigiriya Water Gardens & Traditional Village Expedition`
- `<h3> Minneriya Wild Elephant Gathering Safari`
- `<h3> Spices of Matale & Ascent to Kandy Royal City`
- `<h3> Peradeniya Royal Botanic Gardens & Scenic Train`
- *... and 19 more*

**Paragraph (26 hard-coded):**
- `Select Language...`
- `Safe, gentle, and deeply engaging exploration for grandparents, parent...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Meet your family-friendly chauffeur guide at CMB airport. Short 20-min...`
- `Watch majestic elephant herds bathing in Ma Oya river. Drive into Cult...`
- `Explore the ancient water gardens at the base of Sigiriya rock (easy w...`
- `Afternoon open-top jeep safari into Minneriya National Park to observe...`
- `Visit an aromatic spice garden where kids touch cinnamon bark and vani...`
- *... and 18 more*

**List Item (16 hard-coded):**
- `✓9 Nights in spacious family-friendly resorts with interconn`
- `✓Spacious luxury air-conditioned van with professional famil`
- `✓Minneriya National Park private family safari jeep and entr`
- `✓Kosgoda sea turtle hatchery and baby turtle release program`
- `✓All monument entrances, village boat rides, and daily break`
- `✕International flights`
- `✕Visas`
- `✕Lunches not stated`
- *... and 8 more*

**Button (43 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 35 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Negombo'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Pinnawala'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Sigiriya'`
- `src='../../../assets/images/sigiriya.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/wildlife.jpg' alt='Wild Safari & Coastal Family H'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='The Grand Ceylon Family Advent'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/hero-nine-arches.jpg' on <section>`

**Badge / Tag (47 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Families, Multi-Gen Disc`
- `Badge: Inquire Now`
- `Badge: Overnight: Family Beach Resort, NegomboM`
- `Badge: Overnight: Family Beach Resort, Negombo`
- `Badge: Meals: Dinner Included`
- *... and 39 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Island Wonder Multi-Gen Family Discovery'`
- `meta[og:description]='The perfect family holiday in Sri Lanka:'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Island Wonder Multi-Gen Family Discovery'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html`](tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html)
- **Coverage**: `69 / 293` elements bound (`23.5%`) | **Hard-Coded**: `224` elements

**Heading (27 hard-coded):**
- `<h1> Lotus Ayu Holistic Rejuvenation`
- `<h2> A journey throughLotus Ayu Holistic Rejuvenation`
- `<h3> Ayubowan & Welcome to Ayurvedic Beachfront Sanctuary`
- `<h3> Physician Consultation & Initial Dosha Diagnosis`
- `<h3> Panchakarma Phase 1: Deep Herbal Snehana (Oleation)`
- `<h3> The Art of Shirodhara & Nervous System Restoration`
- `<h3> Herbal Steam Bath & Organic Botanical Garden Walk`
- `<h3> Pinda Sweda (Medicinal Rice & Herbal Bolus Therapy)`
- *... and 19 more*

**Paragraph (26 hard-coded):**
- `Select Language...`
- `A restorative sanctuary escape dedicated to authentic physician-led pa...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Peaceful arrival transfer to your dedicated Ayurvedic coastal sanctuar...`
- `In-depth pulse analysis (Nadi Pariksha) by our resident Ayurvedic phys...`
- `Synchronized full-body warm herbal oil massage (Abhyanga) followed by ...`
- `Experience continuous stream of warm medicinal oil over the third eye ...`
- `Guided walking tour through our medicinal botanical gardens identifyin...`
- *... and 18 more*

**List Item (17 hard-coded):**
- `✓9 Nights in dedicated oceanfront Ayurvedic wellness resort`
- `✓Complete Ayurvedic full-board organic dining tailored to in`
- `✓Daily doctor consultations and personalized daily 2.5-hour`
- `✓Daily morning yoga, pranayama, and evening guided meditatio`
- `✓All herbal medicines, tonics, and customized treatment oils`
- `✓Private airport chauffeur transfers in quiet air-conditione`
- `✕International flights`
- `✕Entry visa`
- *... and 9 more*

**Button (43 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 35 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/temple-culture.jpg' alt='Negombo'`
- `src='../../../assets/images/temple-culture.jpg' alt='Wadduwa'`
- `src='../../../assets/images/temple-culture.jpg' alt='Bentota'`
- `src='../../../assets/images/honeymoon/seaside-villa-1.webp' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/temple-culture.jpg' alt='Sacred Serenity & Forest Medit'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `src='../../../assets/images/beach/pasikudah-5.webp' alt='Turquoise Eastern Sanctuary'`
- `bg='../../../assets/images/temple-culture.jpg' on <section>`

**Badge / Tag (45 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Ayurveda, Wellness & Hea`
- `Badge: Inquire Now`
- `Badge: Overnight: Ayurvedic Beach Sanctuary, Wa`
- `Badge: Overnight: Ayurvedic Beach Sanctuary, Wa`
- `Badge: Meals: Sattvic Dinner`
- *... and 37 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Lotus Ayu Holistic Rejuvenation | Lotus '`
- `meta[og:description]='Authentic physician-guided Ayurvedic pan'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Lotus Ayu Holistic Rejuvenation | Lotus '`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/golf/highland-greens-coastal-links-championship/index.html`](tours/golf/highland-greens-coastal-links-championship/index.html)
- **Coverage**: `69 / 292` elements bound (`23.6%`) | **Hard-Coded**: `223` elements

**Heading (27 hard-coded):**
- `<h1> Highland Greens & Coastal Links Championship`
- `<h2> A journey throughHighland Greens & Coastal Links Championship`
- `<h3> Arrival in Colombo & Royal Colombo Clubhouse Welcome`
- `<h3> Round 1: 18 Holes at Royal Colombo Golf Club`
- `<h3> Transfer to Victoria Golf Resort Kandy`
- `<h3> Round 2: 18 Holes at Victoria Championship Course`
- `<h3> Ascent to Nuwara Eliya & Round 3: 18 Holes at NEGC`
- `<h3> Highland Tea Tasting & Scenic Descent to Southern Coast`
- *... and 19 more*

**Paragraph (26 hard-coded):**
- `Select Language...`
- `The complete golf circuit: colonial fairways, highland pine greens, an...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Chauffeur meet & greet at CMB airport. Transfer to luxury 5-star hotel...`
- `Tee off at the historic RCGC. Experience classic parkland golf in the ...`
- `Drive past spice hills to Victoria Golf Resort. Practice on the drivin...`
- `Conquer Donald Steel’s spectacular course with elevation drops and bre...`
- `Drive up to 'Little England'. Play the historic 1889 Nuwara Eliya Golf...`
- *... and 18 more*

**List Item (16 hard-coded):**
- `✓9 Nights in 5-star luxury hotels, golf resorts, and colonia`
- `✓Green fees, caddies, and carts for 4 championship 18-hole r`
- `✓Guaranteed morning tee times at all 4 courses`
- `✓Private luxury air-conditioned van with dedicated golf lugg`
- `✓Daily breakfast and gourmet dinners throughout`
- `✕International flights`
- `✕Visas`
- `✕Club rentals`
- *... and 8 more*

**Button (43 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 35 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/tea-country.jpg' alt='Colombo'`
- `src='../../../assets/images/tea-country.jpg' alt='Kandy'`
- `src='../../../assets/images/tea-country.jpg' alt='Nuwara Eliya'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/tea-country.jpg' alt='The Royal Ceylon Fairways Tour'`
- `src='../../../assets/images/tea-country.jpg' alt='The Grand Ceylon Masters Golf '`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/tea-country.jpg' on <section>`

**Badge / Tag (45 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Championship Golf, Luxur`
- `Badge: Inquire Now`
- `Badge: Overnight: Luxury 5-Star Hotel, ColomboM`
- `Badge: Overnight: Luxury 5-Star Hotel, Colombo`
- `Badge: Meals: Dinner Included`
- *... and 37 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Highland Greens & Coastal Links Champion'`
- `meta[og:description]='Play Sri Lanka's 4 best golf courses: Ro'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Highland Greens & Coastal Links Champion'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/buddhist-heritage/forest-hermitages-mindful-ceylon/index.html`](tours/buddhist-heritage/forest-hermitages-mindful-ceylon/index.html)
- **Coverage**: `69 / 291` elements bound (`23.7%`) | **Hard-Coded**: `222` elements

**Heading (29 hard-coded):**
- `<h1> Forest Hermitages & Mindful Ceylon`
- `<h2> A journey throughForest Hermitages & Mindful Ceylon`
- `<h3> Arrival & Mindful Welcome in Negombo`
- `<h3> Journey to the Sacred Forest Foothills of Ritigala`
- `<h3> Ritigala Monastic Ruins & Walking Meditation`
- `<h3> Pilgrimage to Jaya Sri Maha Bodhi for Dawn Chanting`
- `<h3> Mihintale Peak Contemplation & Forest Caves`
- `<h3> Dambulla Rock Sanctuaries & Herbal Gardens`
- *... and 21 more*

**Paragraph (13 hard-coded):**
- `Select Language...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `From Negombo through Sigiriya and Kandy, this 05 nights and 06 days jo...`
- `Yes, certainly. Every itinerary we design is 100% bespoke. Our private...`
- `Absolutely. You can choose from audited heritage tea bungalows, boutiq...`
- `Your journey will be led by a handpicked, licensed Sri Lankan National...`
- `A 20% advance deposit confirms your private reservation. In the event ...`
- `Sun-Kissed Bays, Blue Whales & Dutch Ramparts...`
- *... and 5 more*

**List Item (15 hard-coded):**
- `✓All luxury eco-lodge and heritage villa stays`
- `✓Private chauffeured hybrid/electric luxury vehicle`
- `✓Organic vegetarian meal plan`
- `✓Experienced meditation teacher and Dhamma guide`
- `✕International flights`
- `✕Personal expenses`
- `✕Optional spa treatments`
- `✓20% advance confirmation deposit upon private reservation a`
- *... and 7 more*

**Button (45 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 37 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Negombo'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Sigiriya'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Kandy'`
- `src='../../../assets/images/buddhist-heritage/ruwanwelisaya-2.webp' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='The Sacred Bodhi & Ancient Kin'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='The Sacred Tooth & Monastic Sa'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/cultural/dambulla-cave-temple-2.webp' on <section>`

**Badge / Tag (54 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Sacred Pilgrimage, Mindf`
- `Badge: Inquire Now`
- `Badge: Overnight: NegomboMeals: Breakfast and G`
- `Badge: Overnight: Negombo`
- `Badge: Meals: Breakfast and Gourmet Dinner`
- *... and 46 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Forest Hermitages & Mindful Ceylon | Lot'`
- `meta[og:description]=''`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Forest Hermitages & Mindful Ceylon | Lot'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/cultural/the-sacred-lotus-triangle/index.html`](tours/cultural/the-sacred-lotus-triangle/index.html)
- **Coverage**: `69 / 291` elements bound (`23.7%`) | **Hard-Coded**: `222` elements

**Heading (26 hard-coded):**
- `<h1> The Sacred Lotus Triangle`
- `<h2> A journey throughThe Sacred Lotus Triangle`
- `<h3> Arrival in Negombo • Coastal Sanctuary`
- `<h3> Pilgrimage to First Royal Capital: Anuradhapura`
- `<h3> Monastic Sanctuaries & Mihintale Cradle of Buddhism`
- `<h3> Mystic Ritigala Forest Hermitage & Sigiriya`
- `<h3> Sigiriya Dawn Fortress Ascent & Village Catamaran Safari`
- `<h3> Medieval Splendor of Polonnaruwa by Bicycle`
- *... and 18 more*

**Paragraph (25 hard-coded):**
- `Select Language...`
- `Living UNESCO Heritage Across Three Ancient Capitals...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Receive a private VIP airport greeting and transfer to your peaceful b...`
- `Drive northward to Anuradhapura, Ceylon's sacred capital for over a mi...`
- `Explore the peaceful monastic ruins of Jetavanarama and the serene sto...`
- `Journey south through dense forests to the enigmatic ruins of Ritigala...`
- `Ascend Sigiriya Rock Fortress at sunrise, admiring the mirror wall and...`
- *... and 17 more*

**List Item (18 hard-coded):**
- `✓Private luxury vehicle with dedicated English-speaking lice`
- `✓8 Nights luxury accommodation in boutique heritage hotels`
- `✓Daily gourmet breakfast and selected local culinary feasts`
- `✓All entrance permits to Anuradhapura, Mihintale, Ritigala,`
- `✓Bicycle rentals in Polonnaruwa and village catamaran experi`
- `✓All tolls, parking, fuel, and round-the-clock concierge sup`
- `✕International air tickets and visa fees`
- `✕Lunches, beverages, and personal expenses`
- *... and 10 more*

**Button (42 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 34 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Negombo'`
- `src='../../../assets/tours/cultural/sacred-triangle-2.jpg' alt='Anuradhapura'`
- `src='../../../assets/tours/cultural/sacred-triangle-3.jpg' alt='Sigiriya'`
- `src='../../../assets/images/cultural/sigiriya-1.webp' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/cultural/sigiriya-1.webp' alt='Royal Kingdoms & Sacred Temple'`
- `src='../../../assets/images/cultural/polonnaruwa-gal-vihara-3.webp' alt='Three Millennia of Living Heri'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/cultural/dambulla-cave-temple-2.webp' on <section>`

**Badge / Tag (45 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Culture, Heritage`
- `Badge: Inquire Now`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Meals: Breakfast & Gourmet Dinner`
- *... and 37 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='The Sacred Lotus Triangle | Lotus Ceylon'`
- `meta[og:description]='Immerse in Anuradhapura, Polonnaruwa, Si'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='The Sacred Lotus Triangle | Lotus Ceylon'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html`](tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html)
- **Coverage**: `69 / 288` elements bound (`24.0%`) | **Hard-Coded**: `219` elements

**Heading (26 hard-coded):**
- `<h1> Enchanted Ceylon Romantic Hideaway`
- `<h2> A journey throughEnchanted Ceylon Romantic Hideaway`
- `<h3> Ayubowan & Welcome to Your Private Coastal Hideaway`
- `<h3> Ascent to the Royal Hills of Kandy`
- `<h3> Journey into Colonial Ceylon Tea Trails`
- `<h3> Romantic Lakeside Picnics & Tea Plantation Strolls`
- `<h3> Descent to Galle Fort & Sunset Ramparts Walk`
- `<h3> Private Candlelight Rampart Dinner for Two`
- *... and 18 more*

**Paragraph (25 hard-coded):**
- `Select Language...`
- `Private plunge pool villas, misty tea trails, candlelit rampart dining...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Arrive at CMB airport where your private chauffeur welcomes you with t...`
- `Scenic drive to Kandy. Visit the sacred Temple of the Tooth and enjoy ...`
- `Winding drive through misty tea hills to your restored luxury colonial...`
- `Delight in a private gourmet picnic hamper set up beside Castlereagh L...`
- `Drive down to the UNESCO World Heritage Galle Fort. Check into a histo...`
- *... and 17 more*

**List Item (17 hard-coded):**
- `✓8 Nights in premier boutique villas, Tea Trails bungalows a`
- `✓All gourmet dining, welcome champagne, and private candleli`
- `✓Couples signature 2-hour Ayurvedic spa massage ritual`
- `✓Private luxury air-conditioned vehicle with discreet execut`
- `✓All private monument permits, boat charters, and romantic s`
- `✓24/7 personalized Lotus Ceylon concierge on call`
- `✕International flights`
- `✕Visas`
- *... and 9 more*

**Button (42 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 34 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/couple-travel.jpg' alt='Negombo'`
- `src='../../../assets/images/couple-travel.jpg' alt='Kandy'`
- `src='../../../assets/images/couple-travel.jpg' alt='Tea Trails'`
- `src='../../../assets/images/couple-travel.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/couple-travel.jpg' alt='Pure Serenade Coastal & Highla'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `src='../../../assets/images/beach/pasikudah-5.webp' alt='Turquoise Eastern Sanctuary'`
- `bg='../../../assets/images/couple-travel.jpg' on <section>`

**Badge / Tag (43 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Romance, Honeymoon Luxur`
- `Badge: Inquire Now`
- `Badge: Overnight: Romantic Coastal Villa, Negom`
- `Badge: Overnight: Romantic Coastal Villa, Negom`
- `Badge: Meals: Dinner & Welcome Champagne`
- *... and 35 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Enchanted Ceylon Romantic Hideaway | Lot'`
- `meta[og:description]='The ultimate luxury honeymoon in Sri Lan'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Enchanted Ceylon Romantic Hideaway | Lot'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/buddhist-heritage/the-sacred-tooth-monastic-sanctuaries/index.html`](tours/buddhist-heritage/the-sacred-tooth-monastic-sanctuaries/index.html)
- **Coverage**: `69 / 283` elements bound (`24.4%`) | **Hard-Coded**: `214` elements

**Heading (27 hard-coded):**
- `<h1> The Sacred Tooth & Monastic Sanctuaries`
- `<h2> A journey throughThe Sacred Tooth & Monastic Sanctuaries`
- `<h3> Arrival & Transfer to Negombo`
- `<h3> Kurunegala Monasteries to Anuradhapura`
- `<h3> Jaya Sri Maha Bodhi & The Atamasthana`
- `<h3> Mihintale Sacred Ascent & Dambulla Foothills`
- `<h3> Sigiriya Ancient Fortress & Golden Cave Temple`
- `<h3> Aluvihara Rock Temple & Spiritual Ascent to Kandy`
- *... and 19 more*

**Paragraph (13 hard-coded):**
- `Select Language...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `From Negombo through Sigiriya and Kandy, this 05 nights and 06 days jo...`
- `Yes, certainly. Every itinerary we design is 100% bespoke. Our private...`
- `Absolutely. You can choose from audited heritage tea bungalows, boutiq...`
- `Your journey will be led by a handpicked, licensed Sri Lankan National...`
- `A 20% advance deposit confirms your private reservation. In the event ...`
- `Sun-Kissed Bays, Blue Whales & Dutch Ramparts...`
- *... and 5 more*

**List Item (15 hard-coded):**
- `✓Private luxury chauffeur-driven transport`
- `✓All entrance fees and sacred site permits`
- `✓Daily breakfast & dinner`
- `✓Dhamma specialist tour guide`
- `✕International airfare`
- `✕Travel insurance`
- `✕Personal expenses`
- `✓20% advance confirmation deposit upon private reservation a`
- *... and 7 more*

**Button (43 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 35 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Negombo'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Sigiriya'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Kandy'`
- `src='../../../assets/images/buddhist-heritage/ruwanwelisaya-2.webp' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='The Sacred Bodhi & Ancient Kin'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Forest Hermitages & Mindful Ce'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/cultural/dambulla-cave-temple-2.webp' on <section>`

**Badge / Tag (50 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Sacred Pilgrimage, Mindf`
- `Badge: Inquire Now`
- `Badge: Overnight: NegomboMeals: Breakfast and G`
- `Badge: Overnight: Negombo`
- `Badge: Meals: Breakfast and Gourmet Dinner`
- *... and 42 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='The Sacred Tooth & Monastic Sanctuaries '`
- `meta[og:description]=''`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='The Sacred Tooth & Monastic Sanctuaries '`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html`](tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html)
- **Coverage**: `69 / 283` elements bound (`24.4%`) | **Hard-Coded**: `214` elements

**Heading (25 hard-coded):**
- `<h1> Ceylon Tea Trails & Colonial Grandeur`
- `<h2> A journey throughCeylon Tea Trails & Colonial Grandeur`
- `<h3> Ayubowan & Transfer to the Royal Hill Capital of Kandy`
- `<h3> Sacred Temple of the Tooth & Peradeniya Royal Botanic Gardens`
- `<h3> Scenic Mountain Railway to Nuwara Eliya (Little England)`
- `<h3> Pedro Tea Estate Plucking & Connoisseur Tea Tasting`
- `<h3> Horton Plains National Park & Sunrise at World's End`
- `<h3> Picturesque Transfer to Ella & Nine Arches Bridge Walk`
- *... and 17 more*

**Paragraph (24 hard-coded):**
- `Select Language...`
- `A refined highland journey through colonial planter estates, manicured...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Meet your private chauffeur guide at Bandaranaike International Airpor...`
- `Morning private scholarly tour of the Sacred Relic Temple of the Tooth...`
- `Board the legendary blue train in first-class reserved carriage. Gaze ...`
- `Put on a traditional woven tea basket and join local estate pluckers o...`
- `Pre-dawn drive to Horton Plains plateau. Trek through cloud forests, e...`
- *... and 16 more*

**List Item (19 hard-coded):**
- `✓7 Nights in luxury colonial tea bungalows & mountain boutiq`
- `✓Daily breakfast, gourmet dinners, and traditional afternoon`
- `✓Private luxury air-conditioned vehicle with dedicated mount`
- `✓Reserved first-class seats on Kandy to Nuwara Eliya scenic`
- `✓Private guided factory tour and master tea tasting at Pedro`
- `✓All national park permits, entrance tickets and conservatio`
- `✓24/7 Lotus Ceylon dedicated concierge support`
- `✕International flight tickets & Sri Lanka visa (ETA)`
- *... and 11 more*

**Button (41 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 33 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/tea-country.jpg' alt='Colombo'`
- `src='../../../assets/images/tea-country.jpg' alt='Kandy'`
- `src='../../../assets/images/tea-country.jpg' alt='Nuwara Eliya'`
- `src='../../../assets/images/tea-country.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Misty Peaks & Scenic Railways '`
- `src='../../../assets/images/tea-country.jpg' alt='Highland Wilderness & Cascadin'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/tea-country.jpg' on <section>`

**Badge / Tag (39 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Tea Country, Mountain Vi`
- `Badge: Inquire Now`
- `Badge: Overnight: Luxury Boutique Sanctuary, Ka`
- `Badge: Overnight: Luxury Boutique Sanctuary, Ka`
- `Badge: Meals: Dinner Included`
- *... and 31 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Ceylon Tea Trails & Colonial Grandeur | '`
- `meta[og:description]='Discover the romance of Sri Lanka's tea '`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Ceylon Tea Trails & Colonial Grandeur | '`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/wildlife/wild-ceylon-predator-elephant-trail/index.html`](tours/wildlife/wild-ceylon-predator-elephant-trail/index.html)
- **Coverage**: `69 / 283` elements bound (`24.4%`) | **Hard-Coded**: `214` elements

**Heading (25 hard-coded):**
- `<h1> Wild Ceylon Predator & Elephant Trail`
- `<h2> A journey throughWild Ceylon Predator & Elephant Trail`
- `<h3> Arrival in Negombo • Coastal Gateway`
- `<h3> Wilpattu National Park • Natural Villus & Sloth Bears`
- `<h3> Dawn Game Drive & Transit to the Elephant Heartlands`
- `<h3> The Great Minneriya Elephant Gathering Safari`
- `<h3> Highland Edge Transit toward Yala National Park`
- `<h3> Full-Day Yala Leopard & Sloth Bear Tracking`
- *... and 17 more*

**Paragraph (24 hard-coded):**
- `Select Language...`
- `Big Cats, Sloth Bears & The Great Elephant Gathering...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Warm welcome at the airport by your Lotus Ceylon safari chauffeur guid...`
- `Drive northward to Wilpattu, Sri Lanka’s largest and oldest national p...`
- `Set off on a misty dawn game drive in Wilpattu when predators are most...`
- `In the afternoon, enter Minneriya National Park in an open-top 4x4 jee...`
- `Travel southward along scenic routes toward Yala on the southeast coas...`
- *... and 16 more*

**List Item (18 hard-coded):**
- `✓Private luxury vehicle with dedicated licensed safari chauf`
- `✓7 Nights luxury accommodation in premier safari lodges and`
- `✓Daily breakfast and select safari camp bush dinners`
- `✓Private 4x4 custom safari jeeps with experienced wildlife t`
- `✓All national park entry tickets, conservation fees, and wil`
- `✓Complimentary high-speed Wi-Fi, binoculars, chilled bottled`
- `✕International air tickets and Sri Lanka ETA visa fees`
- `✕Lunches and alcoholic drinks`
- *... and 10 more*

**Button (41 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 33 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/wildlife/minneriya-elephant-gathering-2.webp' alt='Negombo'`
- `src='../../../assets/tours/wildlife/predator-trail-2.jpg' alt='Wilpattu National Park'`
- `src='../../../assets/tours/wildlife/predator-trail-3.jpg' alt='Minneriya National Park'`
- `src='../../../assets/images/wildlife/yala-leopard-1.webp' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/wildlife/yala-leopard-1.webp' alt='The Sri Lanka Big Five Expedit'`
- `src='../../../assets/images/wildlife/udawalawe-3.webp' alt='Untamed Biosphere & Rainforest'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/wildlife/minneriya-elephant-gathering-2.webp' on <section>`

**Badge / Tag (40 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Wildlife, Safaris & Natu`
- `Badge: Inquire Now`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Overnight: Negombo Beach Boutique Resort`
- `Badge: Meals: Breakfast & Gourmet Dinner`
- *... and 32 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Wild Ceylon Predator & Elephant Trail | '`
- `meta[og:description]='Experience 8 days tracking leopards in Y'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Wild Ceylon Predator & Elephant Trail | '`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/adventure/island-adrenaline-rapids-expedition/index.html`](tours/adventure/island-adrenaline-rapids-expedition/index.html)
- **Coverage**: `69 / 281` elements bound (`24.6%`) | **Hard-Coded**: `212` elements

**Heading (25 hard-coded):**
- `<h1> Island Adrenaline & Rapids Expedition`
- `<h2> A journey throughIsland Adrenaline & Rapids Expedition`
- `<h3> Arrival in Colombo & Direct Expedition Transfer to Kitulgala`
- `<h3> White Water Rafting & Confidence Waterfall Jump`
- `<h3> Ascent to Knuckles UNESCO Wilderness Range`
- `<h3> Knuckles Ridge Cloud Forest Summit Trek`
- `<h3> Transfer to Ella & Flying Ravana Mega Zip-Line`
- `<h3> Ella Rock Scramble & Descent to South Coast Surf`
- *... and 17 more*

**Paragraph (24 hard-coded):**
- `Select Language...`
- `Grade III white water rapids, jungle canyoning, Knuckles cloud trekkin...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Meet your adventure chauffeur guide. Drive to Kitulgala river canyon b...`
- `Conquer Head Chopper, Virgin's Breast, and Butter Crunch Grade III/IV ...`
- `Transfer to the rugged Knuckles mountain massif. Trek past isolated ca...`
- `Full day 16km trek across mist-shrouded knife-edge ridges and endemic ...`
- `Scenic mountain drive to Ella. Strap in for Sri Lanka’s fastest mega z...`
- *... and 16 more*

**List Item (16 hard-coded):**
- `✓7 Nights in adventure eco-lodges, wilderness camps and bout`
- `✓All adventure gear (helmets, CE lifejackets, harnesses, sur`
- `✓Certified river guides, trekking naturalists and surf instr`
- `✓All national park permits, river fees, and activity insuran`
- `✓Private 4WD AC vehicle and dedicated driver-guide`
- `✕International flights`
- `✕Visas`
- `✕Alcoholic drinks`
- *... and 8 more*

**Button (41 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 33 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/adventure.jpg' alt='Colombo'`
- `src='../../../assets/images/adventure.jpg' alt='Kitulgala'`
- `src='../../../assets/images/adventure.jpg' alt='Knuckles'`
- `src='../../../assets/images/adventure.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/adventure.jpg' alt='Wild Peaks, Trails & Surf Safa'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `src='../../../assets/images/beach/pasikudah-5.webp' alt='Turquoise Eastern Sanctuary'`
- `bg='../../../assets/images/adventure.jpg' on <section>`

**Badge / Tag (40 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Active Adventure, Water`
- `Badge: Inquire Now`
- `Badge: Overnight: Adventure Safari Camp, Kitulg`
- `Badge: Overnight: Adventure Safari Camp, Kitulg`
- `Badge: Meals: Dinner Included`
- *... and 32 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Island Adrenaline & Rapids Expedition | '`
- `meta[og:description]='Conquer Sri Lanka's wildest outdoor thri'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Island Adrenaline & Rapids Expedition | '`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/ramayana/sacred-ramayana-heritage-trail/index.html`](tours/ramayana/sacred-ramayana-heritage-trail/index.html)
- **Coverage**: `69 / 274` elements bound (`25.2%`) | **Hard-Coded**: `205` elements

**Heading (24 hard-coded):**
- `<h1> Sacred Ramayana Heritage Trail`
- `<h2> A journey throughSacred Ramayana Heritage Trail`
- `<h3> Ayubowan & Arrival in Colombo`
- `<h3> Munneswaram & Manavari Temples (Lord Rama’s Sins Cleansed)`
- `<h3> Kandy Royal City & Sri Bhakta Hanuman Temple (Ramboda)`
- `<h3> Seetha Amman Temple & Ashoka Vatika (Hakgala)`
- `<h3> Divurumpola (Agni Pariksha) & Gayathri Peedam`
- `<h3> Kelaniya Vibhishana Temple & Return to Colombo`
- *... and 16 more*

**Paragraph (23 hard-coded):**
- `Select Language...`
- `Follow the legendary epic through Munneswaram, Manavari, Seetha Amman ...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Warm welcome by your scholarly chauffeur guide. Transfer to your comfo...`
- `Drive north to Chilaw. Visit Munneswaram Shiva Temple where Lord Rama ...`
- `Ascend into the misty hills. Stop at Ramboda to visit the 16-foot gran...`
- `Visit the world’s only Seetha Amman Temple where Sita Devi was held ca...`
- `Visit Divurumpola Temple, where Sita Devi underwent the Agni Pariksha ...`
- *... and 15 more*

**List Item (16 hard-coded):**
- `✓6 Nights in carefully selected hotels with vegetarian / sat`
- `✓Private dedicated air-conditioned vehicle with Ramayana-kno`
- `✓All temple special puja offerings, coconuts, and entrance p`
- `✓Hakgala Botanical Gardens (Ashoka Vatika) entrance tickets`
- `✓Daily vegetarian breakfast and dinner throughout`
- `✕International airfare`
- `✕Visas`
- `✕Personal dakshina / donations`
- *... and 8 more*

**Button (40 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 32 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/polonnaruwa.jpg' alt='Colombo'`
- `src='../../../assets/images/polonnaruwa.jpg' alt='Chilaw'`
- `src='../../../assets/images/polonnaruwa.jpg' alt='Kandy'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/polonnaruwa.jpg' alt='The Epic Ramayana Chronicle Pi'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `src='../../../assets/images/beach/pasikudah-5.webp' alt='Turquoise Eastern Sanctuary'`
- `bg='../../../assets/images/polonnaruwa.jpg' on <section>`

**Badge / Tag (36 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Sacred Heritage, Spiritu`
- `Badge: Inquire Now`
- `Badge: Overnight: Heritage Hotel, Colombo/Negom`
- `Badge: Overnight: Heritage Hotel, Colombo/Negom`
- `Badge: Meals: Dinner Included`
- *... and 28 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sacred Ramayana Heritage Trail | Lotus C'`
- `meta[og:description]='Walk the holy Ramayana trail in Sri Lank'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sacred Ramayana Heritage Trail | Lotus C'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/golf/the-royal-ceylon-fairways-tour/index.html`](tours/golf/the-royal-ceylon-fairways-tour/index.html)
- **Coverage**: `69 / 272` elements bound (`25.4%`) | **Hard-Coded**: `203` elements

**Heading (24 hard-coded):**
- `<h1> The Royal Ceylon Fairways Tour`
- `<h2> A journey throughThe Royal Ceylon Fairways Tour`
- `<h3> Arrival in Colombo & Welcome to The Galle Face Hotel`
- `<h3> Round 1: 18 Holes at Royal Colombo Golf Club (RCGC)`
- `<h3> Scenic Transfer to Victoria Golf Resort Kandy`
- `<h3> Round 2: 18 Holes at Donald Steel’s Victoria Championship Course`
- `<h3> Kandy Heritage Exploration & Rest Day / Twilight 9 Holes`
- `<h3> Round 3: 18 Holes Championship Re-Match at Victoria`
- *... and 16 more*

**Paragraph (23 hard-coded):**
- `Select Language...`
- `Tee off at Asia’s oldest golf clubs: Royal Colombo and Donald Steel’s ...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Meet your private chauffeur guide at CMB airport. Transfer to Colombo'...`
- `Tee off on the historic tree-lined fairways of the 145-year-old RCGC. ...`
- `Drive through lush tropical scenery into the Kandyan hills. Check into...`
- `Play Donald Steel's award-winning 73-par masterpiece flanked by majest...`
- `Morning private tour of the sacred Temple of the Tooth and Peradeniya ...`
- *... and 15 more*

**List Item (16 hard-coded):**
- `✓6 Nights in 5-star colonial heritage hotels and fairway res`
- `✓Green fees, private caddies, and shared golf carts for 3 fu`
- `✓Pre-reserved prime morning tee times`
- `✓Spacious private air-conditioned vehicle accommodating all`
- `✓Daily breakfast and fine dining dinners throughout`
- `✕Club rental fees (available on request)`
- `✕International airfare`
- `✕Visas`
- *... and 8 more*

**Button (40 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 32 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/tea-country.jpg' alt='Colombo'`
- `src='../../../assets/images/tea-country.jpg' alt='Kandy'`
- `src='../../../assets/images/tea-country.jpg' alt='Kandy'`
- `src='../../../assets/images/hero-nine-arches.jpg' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/tea-country.jpg' alt='Highland Greens & Coastal Link'`
- `src='../../../assets/images/tea-country.jpg' alt='The Grand Ceylon Masters Golf '`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/tea-country.jpg' on <section>`

**Badge / Tag (34 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Championship Golf, Luxur`
- `Badge: Inquire Now`
- `Badge: Overnight: The Galle Face Hotel, Colombo`
- `Badge: Overnight: The Galle Face Hotel, Colombo`
- `Badge: Meals: Dinner Included`
- *... and 26 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='The Royal Ceylon Fairways Tour | Lotus C'`
- `meta[og:description]='Play golf at Royal Colombo Golf Club and'`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='The Royal Ceylon Fairways Tour | Lotus C'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/buddhist-heritage/the-sacred-bodhi-ancient-kingdoms/index.html`](tours/buddhist-heritage/the-sacred-bodhi-ancient-kingdoms/index.html)
- **Coverage**: `69 / 271` elements bound (`25.5%`) | **Hard-Coded**: `202` elements

**Heading (25 hard-coded):**
- `<h1> The Sacred Bodhi & Ancient Kingdoms`
- `<h2> A journey throughThe Sacred Bodhi & Ancient Kingdoms`
- `<h3> Arrival & Sacred Welcome at Negombo Seaboard`
- `<h3> Journey North to Anuradhapura & Jaya Sri Maha Bodhi`
- `<h3> The Great Stupas: Ruwanwelisaya, Jetavanaramaya & Abhayagiri`
- `<h3> Mihintale Mountain Sanctuary & Ritigala Forest Monastery`
- `<h3> Medieval Royal Sanctuary of Polonnaruwa & Gal Vihara`
- `<h3> Dambulla Rock Cave Temples & Transfer to Hill Capital Kandy`
- *... and 17 more*

**Paragraph (13 hard-coded):**
- `Select Language...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `From Negombo through Sigiriya and Kandy, this 05 nights and 06 days jo...`
- `Yes, certainly. Every itinerary we design is 100% bespoke. Our private...`
- `Absolutely. You can choose from audited heritage tea bungalows, boutiq...`
- `Your journey will be led by a handpicked, licensed Sri Lankan National...`
- `A 20% advance deposit confirms your private reservation. In the event ...`
- `Sun-Kissed Bays, Blue Whales & Dutch Ramparts...`
- *... and 5 more*

**List Item (15 hard-coded):**
- `✓Private luxury chauffeur-driven transport`
- `✓All entrance fees and sacred site permits`
- `✓Daily breakfast & authentic dinner`
- `✓Specialized Buddhist pilgrimage guide`
- `✕International flights and visa fees`
- `✕Personal travel insurance`
- `✕Discretionary gratuities`
- `✓20% advance confirmation deposit upon private reservation a`
- *... and 7 more*

**Button (41 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 33 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Negombo'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Sigiriya'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Kandy'`
- `src='../../../assets/images/buddhist-heritage/ruwanwelisaya-2.webp' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='The Sacred Tooth & Monastic Sa'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='Forest Hermitages & Mindful Ce'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/cultural/dambulla-cave-temple-2.webp' on <section>`

**Badge / Tag (42 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Sacred Pilgrimage, Mindf`
- `Badge: Inquire Now`
- `Badge: Overnight: NegomboMeals: Breakfast and G`
- `Badge: Overnight: Negombo`
- `Badge: Meals: Breakfast and Gourmet Dinner`
- *... and 34 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='The Sacred Bodhi & Ancient Kingdoms | Lo'`
- `meta[og:description]=''`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='The Sacred Bodhi & Ancient Kingdoms | Lo'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/cultural/royal-kingdoms-sacred-temples/index.html`](tours/cultural/royal-kingdoms-sacred-temples/index.html)
- **Coverage**: `69 / 271` elements bound (`25.5%`) | **Hard-Coded**: `202` elements

**Heading (23 hard-coded):**
- `<h1> Royal Kingdoms & Sacred Temples`
- `<h2> A journey throughRoyal Kingdoms & Sacred Temples`
- `<h3> Arrival in Negombo • Welcome to Ancient Ceylon`
- `<h3> Dambulla Cave Frescoes & Habarana Sanctuary`
- `<h3> Sigiriya 5th-Century Sky Fortress & Village Immersion`
- `<h3> Spice Gardens of Matale & Highland Royal Capital of Kandy`
- `<h3> Peradeniya Royal Botanical Gardens & Colombo`
- `<h3> Farewell to Ceylon • Airport Transfer`
- *... and 15 more*

**Paragraph (22 hard-coded):**
- `Select Language...`
- `The Essential UNESCO Heritage Triangle...`
- `Every element of this bespoke journey is privately chauffeured in luxu...`
- `Arrive at the airport and receive a warm traditional welcome with frag...`
- `Drive into the Cultural Triangle. Ascend the gentle granite slopes of ...`
- `At dawn, climb King Kasyapa's 5th-century Sigiriya Rock Fortress befor...`
- `Travel southward into the mist-draped hills of Kandy, stopping at an o...`
- `Stroll beneath towering Royal Palms and giant Java Fig trees in Perade...`
- *... and 14 more*

**List Item (18 hard-coded):**
- `✓Private luxury air-conditioned vehicle with dedicated licen`
- `✓5 Nights accommodation in premier 4★/5★ heritage boutique h`
- `✓Daily gourmet breakfast and authentic dining experiences`
- `✓Priority entrance tickets to Sigiriya Rock Fortress, Dambul`
- `✓Traditional catamaran village excursion with private local`
- `✓Entrance permits to Peradeniya Royal Botanical Gardens`
- `✓All road tolls, driver accommodation, and complimentary chi`
- `✕International flights and entry visas`
- *... and 10 more*

**Button (39 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 31 more*

**Link (46 hard-coded):**
- `href='../../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../../tours/family/index.html' [Family Discovery]`
- *... and 38 more*

**Image (8 hard-coded):**
- `src='../../../assets/images/cultural/sigiriya-1.webp' alt='Negombo'`
- `src='../../../assets/tours/cultural/royal-kingdoms-2.jpg' alt='Dambulla'`
- `src='../../../assets/tours/cultural/royal-kingdoms-3.jpg' alt='Sigiriya'`
- `src='../../../assets/images/cultural/sigiriya-1.webp' alt='Sri Lanka Luxury Travel FAQ'`
- `src='../../../assets/images/cultural/dambulla-cave-temple-2.webp' alt='The Sacred Lotus Triangle'`
- `src='../../../assets/images/cultural/polonnaruwa-gal-vihara-3.webp' alt='Three Millennia of Living Heri'`
- `src='../../../assets/images/beach/mirissa-1.webp' alt='Southern Sands Serenade'`
- `bg='../../../assets/images/cultural/sigiriya-1.webp' on <section>`

**Badge / Tag (34 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Recommended for Culture, Heritage`
- `Badge: Inquire Now`
- `Badge: Overnight: Negombo Boutique RetreatMeals`
- `Badge: Overnight: Negombo Boutique Retreat`
- `Badge: Meals: Breakfast & Gourmet Dinner`
- *... and 26 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Royal Kingdoms & Sacred Temples | Lotus '`
- `meta[og:description]='Explore Sri Lanka's cultural highlights '`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Royal Kingdoms & Sacred Temples | Lotus '`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/beach/index.backup.html`](tours/beach/index.backup.html)
- **Coverage**: `227 / 423` elements bound (`53.7%`) | **Hard-Coded**: `196` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (31 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 23 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Table Cell (100 hard-coded):**
- `<th> Destinations and Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 92 more*

**Badge / Tag (7 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: PURE JOURNEYS • TROPICAL COASTAL ESCAPES`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `meta[description]='Discover tailor-made Sri Lanka beach hol'`
- `meta[keywords]='sri lanka beach tours, luxury beach holi'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Luxury Beach Holidays | Lotus '`
- `meta[og:description]='Surrender to 1,300 kilometers of sun-ble'`
- `meta[og:url]='https://lotusceylon.com/tours/beach/inde'`
- `meta[og:image]='https://lotusceylon.com/assets/tours/bea'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/cultural/index.backup.html`](tours/cultural/index.backup.html)
- **Coverage**: `216 / 412` elements bound (`52.4%`) | **Hard-Coded**: `196` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (31 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 23 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Table Cell (100 hard-coded):**
- `<th> Destinations and Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 92 more*

**Badge / Tag (7 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: SACRED KINGDOMS • UNESCO LIVING HERITAGE`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `meta[description]='Immerse in three millennia of living her'`
- `meta[keywords]='sri lanka cultural tours, cultural trian'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Cultural Tours | Lotus Ceylon '`
- `meta[og:description]='Journey across 2,300+ years of recorded '`
- `meta[og:url]='https://lotusceylon.com/tours/cultural/i'`
- `meta[og:image]='https://lotusceylon.com/assets/tours/cul'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/wildlife/index.backup.html`](tours/wildlife/index.backup.html)
- **Coverage**: `223 / 414` elements bound (`53.9%`) | **Hard-Coded**: `191` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (31 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 23 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Table Cell (95 hard-coded):**
- `<th> Destinations and Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 87 more*

**Badge / Tag (7 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: ASIA’S APEX WILDLIFE • THE BIG FIVE SANC`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `meta[description]='Embark on thrilling private wildlife saf'`
- `meta[keywords]='sri lanka wildlife tours, yala leopard s'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Wildlife Safaris | Lotus Ceylo'`
- `meta[og:description]='Encounter earth’s highest leopard densit'`
- `meta[og:url]='https://lotusceylon.com/tours/wildlife/i'`
- `meta[og:image]='https://lotusceylon.com/assets/tours/wil'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/family/index.backup.html`](tours/family/index.backup.html)
- **Coverage**: `179 / 362` elements bound (`49.4%`) | **Hard-Coded**: `183` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Table Cell (92 hard-coded):**
- `<th> Destinations and Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<th> Negombo`
- `<td> ✓`
- *... and 84 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Family Holiday Packages | Lotu'`
- `meta[og:description]='Create unforgettable memories across gen'`
- `meta[og:url]='https://lotusceylon.com/tours/family/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Family Holiday Packages | Lotu'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/hill-country/index.backup.html`](tours/hill-country/index.backup.html)
- **Coverage**: `167 / 338` elements bound (`49.4%`) | **Hard-Coded**: `171` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Table Cell (80 hard-coded):**
- `<th> Destinations and Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 72 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Hill Country and Tea Country T'`
- `meta[og:description]='Escape to the cool emerald highlands of '`
- `meta[og:url]='https://lotusceylon.com/tours/hill-count'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Hill Country and Tea Country T'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/index.backup.html`](tours/index.backup.html)
- **Coverage**: `190 / 360` elements bound (`52.8%`) | **Hard-Coded**: `170` elements

**Heading (11 hard-coded):**
- `<h3> Cultural Heritage`
- `<h3> Buddhist Heritage`
- `<h3> Wildlife Safaris`
- `<h3> Pristine Beaches`
- `<h3> Hill Country and Tea`
- `<h3> Ayurvedic Healing`
- `<h3> Honeymoon Romance`
- `<h3> Family Discovery`
- *... and 3 more*

**Paragraph (17 hard-coded):**
- `Select Language...`
- `Journey across 2,500 years of living history. From sky palaces perched...`
- `Reverent, deeply peaceful journeys to Sri Lanka's most venerated Buddh...`
- `Encounter earth’s highest leopard density, dramatic elephant gathering...`
- `Surrender to 1,300 kilometers of sun-blessed coastline, secret golden ...`
- `Escape to the cool emerald highlands of Ceylon. Wander through rolling...`
- `Restore harmony of body, mind, and spirit with 3,000-year-old indigeno...`
- `Celebrate your love in an enchanted tropical paradise. Secluded oceanf...`
- *... and 9 more*

**List Item (29 hard-coded):**
- `Royal Kingdoms & Sacred Temples• 6 Days`
- `The Sacred Lotus Triangle• 9 Days`
- `Three Millennia of Living Heritage• 15 Days`
- `The Sacred Bodhi & Ancient Kingdoms• 6 Days`
- `The Sacred Tooth & Monastic Sanctuaries• 6 Days`
- `Forest Hermitages & Mindful Ceylon• 6 Days`
- `Wild Ceylon Predator & Elephant Trail• 17 Days`
- `The Sri Lanka Big Five Expedition• 14 Days`
- *... and 21 more*

**Button (30 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 22 more*

**Link (50 hard-coded):**
- `href='../tours/cultural/index.html' [Cultural Heritage]`
- `href='../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../tours/beach/index.html' [Pristine Beaches]`
- `href='../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../tours/family/index.html' [Family Discovery]`
- *... and 42 more*

**Stat / Counter (1 hard-coded):**
- `Stat: Showing29of29packages`

**Badge / Tag (17 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: 3 Signature Itineraries`
- `Badge: 3 Sacred Pilgrimages`
- `Badge: 3 Signature Itineraries`
- `Badge: 3 Signature Itineraries`
- `Badge: 3 Signature Itineraries`
- *... and 9 more*

**Meta Tag (14 hard-coded):**
- `<title> Sri Lanka Tour Packages and Luxury Tailor-Made Hol`
- `meta[description]='Discover 29 hand-crafted Sri Lanka tour '`
- `meta[keywords]='sri lanka tours, tour packages sri lanka'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Curated Sri Lanka Tours and Holiday Pack'`
- `meta[og:description]='Discover bespoke private chauffeur-guide'`
- `meta[og:url]='https://lotusceylon.com/tours/index.html'`
- *... and 6 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/index.html`](tours/index.html)
- **Coverage**: `190 / 360` elements bound (`52.8%`) | **Hard-Coded**: `170` elements

**Heading (11 hard-coded):**
- `<h3> Cultural Heritage`
- `<h3> Buddhist Heritage`
- `<h3> Wildlife Safaris`
- `<h3> Pristine Beaches`
- `<h3> Hill Country and Tea`
- `<h3> Ayurvedic Healing`
- `<h3> Honeymoon Romance`
- `<h3> Family Discovery`
- *... and 3 more*

**Paragraph (17 hard-coded):**
- `Select Language...`
- `Journey across 2,500 years of living history. From sky palaces perched...`
- `Reverent, deeply peaceful journeys to Sri Lanka's most venerated Buddh...`
- `Encounter earth’s highest leopard density, dramatic elephant gathering...`
- `Surrender to 1,300 kilometers of sun-blessed coastline, secret golden ...`
- `Escape to the cool emerald highlands of Ceylon. Wander through rolling...`
- `Restore harmony of body, mind, and spirit with 3,000-year-old indigeno...`
- `Celebrate your love in an enchanted tropical paradise. Secluded oceanf...`
- *... and 9 more*

**List Item (29 hard-coded):**
- `Royal Kingdoms & Sacred Temples• 6 Days`
- `The Sacred Lotus Triangle• 9 Days`
- `Three Millennia of Living Heritage• 15 Days`
- `The Sacred Bodhi & Ancient Kingdoms• 6 Days`
- `The Sacred Tooth & Monastic Sanctuaries• 6 Days`
- `Forest Hermitages & Mindful Ceylon• 6 Days`
- `Wild Ceylon Predator & Elephant Trail• 17 Days`
- `The Sri Lanka Big Five Expedition• 14 Days`
- *... and 21 more*

**Button (30 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 22 more*

**Link (50 hard-coded):**
- `href='../tours/cultural/index.html' [Cultural Heritage]`
- `href='../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../tours/beach/index.html' [Pristine Beaches]`
- `href='../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../tours/family/index.html' [Family Discovery]`
- *... and 42 more*

**Stat / Counter (1 hard-coded):**
- `Stat: Showing29of29packages`

**Badge / Tag (17 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: 3 Signature Itineraries`
- `Badge: 3 Sacred Pilgrimages`
- `Badge: 3 Signature Itineraries`
- `Badge: 3 Signature Itineraries`
- `Badge: 3 Signature Itineraries`
- *... and 9 more*

**Meta Tag (14 hard-coded):**
- `<title> Sri Lanka Tour Packages and Luxury Tailor-Made Hol`
- `meta[description]='Discover 29 hand-crafted Sri Lanka tour '`
- `meta[keywords]='sri lanka tours, tour packages sri lanka'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Curated Sri Lanka Tours and Holiday Pack'`
- `meta[og:description]='Discover bespoke private chauffeur-guide'`
- `meta[og:url]='https://lotusceylon.com/tours/index.html'`
- *... and 6 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/ramayana/index.backup.html`](tours/ramayana/index.backup.html)
- **Coverage**: `144 / 288` elements bound (`50.0%`) | **Hard-Coded**: `144` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Table Cell (53 hard-coded):**
- `<th> Destinations and Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 45 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Ramayana Heritage Tours | Lotu'`
- `meta[og:description]='Walk in the footsteps of Sri Rama, Sita '`
- `meta[og:url]='https://lotusceylon.com/tours/ramayana/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Ramayana Heritage Tours | Lotu'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/honeymoon/index.backup.html`](tours/honeymoon/index.backup.html)
- **Coverage**: `149 / 291` elements bound (`51.2%`) | **Hard-Coded**: `142` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Table Cell (51 hard-coded):**
- `<th> Destinations and Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<th> Negombo`
- `<td> ✓`
- *... and 43 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Luxury Honeymoon Tours | Lotus'`
- `meta[og:description]='Celebrate your love in an enchanted trop'`
- `meta[og:url]='https://lotusceylon.com/tours/honeymoon/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Luxury Honeymoon Tours | Lotus'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`index.html`](index.html)
- **Coverage**: `271 / 412` elements bound (`65.8%`) | **Hard-Coded**: `141` elements

**Heading (1 hard-coded):**
- `<h3> Sacred Anuradhapura`

**Paragraph (10 hard-coded):**
- `Select Language...`
- `12+...`
- `10+...`
- `100%...`
- `100%...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- *... and 2 more*

**Button (42 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 34 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 33 more*

**Image (7 hard-coded):**
- `src='./assets/images/brand/logo-header.png' alt=''`
- `src='./assets/images/buddhist-heritage/ruwanwelisaya-2.webp' alt='Lotus Ceylon Completed Tour'`
- `src='assets/images/icons/operating-travel.svg' alt='100% Tailor-Made Itineraries'`
- `src='assets/images/icons/call-center.svg' alt='24/7 Dedicated Trip Concierge'`
- `src='assets/images/icons/hassel-free.svg' alt='Sacred Buddhist and Heritage G'`
- `src='assets/images/icons/free-cancel.svg' alt='Private Luxury Fleet and Chauf'`
- `src='assets/images/icons/partner.svg' alt='Handpicked Eco and Boutique St'`

**Stat / Counter (10 hard-coded):**
- `Stat: 1/5`
- `Stat: 12+Years of Inbound Excellence`
- `Stat: 12+Years of Inbound Excellence`
- `Stat: 12+`
- `Stat: 10+Global Country Representati`
- `Stat: 10+`
- `Stat: 100%Tailor-Made Private Itiner`
- `Stat: 100%`
- *... and 2 more*

**Badge / Tag (17 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Lotus Blossom SanctuariesSacred Waters o`
- `Badge: Lotus Blossom SanctuariesSacred Waters o`
- `Badge: Lotus Blossom Sanctuaries`
- `Badge: Sacred Waters of Ceylon`
- `Badge: The sacred city of Anuradhapura`
- *... and 9 more*

**Meta Tag (12 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Tours | Lotus Ceylon Luxury Ho'`
- `meta[og:description]='Welcome to Lotus Ceylon, Sri Lanka's pre'`
- `meta[og:url]='https://lotusceylon.com/'`
- `meta[og:image]='https://lotusceylon.com/assets/images/he'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Tours | Lotus Ceylon Luxury Ho'`
- *... and 4 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/adventure/index.backup.html`](tours/adventure/index.backup.html)
- **Coverage**: `146 / 287` elements bound (`50.9%`) | **Hard-Coded**: `141` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Table Cell (50 hard-coded):**
- `<th> Destinations and Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<th> Negombo`
- `<td> ✓`
- *... and 42 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Adventure and Active Expeditio'`
- `meta[og:description]='Challenge your spirit across raw, untame'`
- `meta[og:url]='https://lotusceylon.com/tours/adventure/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Adventure and Active Expeditio'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/golf/index.backup.html`](tours/golf/index.backup.html)
- **Coverage**: `147 / 288` elements bound (`51.0%`) | **Hard-Coded**: `141` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Table Cell (50 hard-coded):**
- `<th> Destinations and Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 42 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Golf Holidays and Championship'`
- `meta[og:description]='Tee off across Asia’s most scenic and hi'`
- `meta[og:url]='https://lotusceylon.com/tours/golf/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Golf Holidays and Championship'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/ayurvedic/index.backup.html`](tours/ayurvedic/index.backup.html)
- **Coverage**: `136 / 266` elements bound (`51.1%`) | **Hard-Coded**: `130` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Table Cell (39 hard-coded):**
- `<th> Destinations and Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 31 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Ayurvedic and Holistic Wellnes'`
- `meta[og:description]='Restore harmony of body, mind, and spiri'`
- `meta[og:url]='https://lotusceylon.com/tours/ayurvedic/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Ayurvedic and Holistic Wellnes'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`blog.html`](blog.html)
- **Coverage**: `72 / 185` elements bound (`38.9%`) | **Hard-Coded**: `113` elements

**Heading (4 hard-coded):**
- `<h3> Sacred Footsteps: Unlocking Sri Lanka's Ancient Buddhist Kingdoms`
- `<h3> The Great Gathering: Watching Hundreds of Wild Elephants at Minneriya`
- `<h3> Growing a Greener Future: Volunteer Reforestation in the Sinharaja Can`
- `<h3> Living Healing: The Ancient Art and Science of Traditional Ceylon Ayur`

**Paragraph (10 hard-coded):**
- `Select Language...`
- `From the colossal brick stupas of Anuradhapura to the cloud fortress o...`
- `Ranked among the world's greatest wildlife spectacles by Lonely Planet...`
- `Explore how Lotus Ceylon supports rainforest buffer zone conservation ...`
- `Discover how Sri Lanka's unique Deshiya Chikitsa indigenous medicine i...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- *... and 2 more*

**Button (28 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 20 more*

**Link (52 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 44 more*

**Image (4 hard-coded):**
- `src='assets/images/cultural/sigiriya-1.webp' alt='Sacred Footsteps: Unlocking Sr'`
- `src='assets/images/wildlife/minneriya-elephant-gathering-2.webp' alt='The Great Gathering: Watching '`
- `src='assets/images/wildlife/sinharaja-rainforest-5.webp' alt='Growing a Greener Future: Volu'`
- `src='assets/images/ayurveda/herbal-treatment-1.webp' alt='Living Healing: The Ancient Ar'`

**Badge / Tag (7 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: EDITORIAL AND CEYLON STORIES`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (8 hard-coded):**
- `<title> Lotus Ceylon Travel Journal and Editorial Insights`
- `meta[description]='Immerse in curated travel stories, pilgr'`
- `meta[og:title]='Lotus Ceylon Travel Journal and Editoria'`
- `meta[og:description]='Immerse in curated travel stories, pilgr'`
- `meta[og:image]='./assets/images/cultural/sigiriya-1.webp'`
- `meta[og:url]='https://lotusceylon.com/blog.html'`
- `meta[twitter:card]='summary_large_image'`
- `canonical='https://lotusceylon.com/blog.html'`


### [`experiences.html`](experiences.html)
- **Coverage**: `134 / 245` elements bound (`54.7%`) | **Hard-Coded**: `111` elements

**Paragraph (10 hard-coded):**
- `Select Language...`
- `“Watching private monks chant by flickering oil lamp at the Temple of ...`
- `“Our physician-led Panchakarma retreat and warm herbal Shirodhara rest...`
- `“Tracking an apex leopard at sunrise in Yala and watching hundreds of ...`
- `“Hand-harvesting tea flushes with resident artisans and sipping golden...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- *... and 2 more*

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (39 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 31 more*

**Badge / Tag (19 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: CURATED ENCOUNTERS AND SIGNATURE BRANDS`
- `Badge: Artisan and Cultural HeritageLotus Artis`
- `Badge: Artisan and Cultural HeritageLotus Artis`
- `Badge: “Watching private monks chant by flicker`
- `Badge: Ayurveda and HealingLotus Ayu Wellness“O`
- *... and 11 more*

**Meta Tag (13 hard-coded):**
- `<title> Sacred and Bespoke Ceylon Experiences | Lotus Ceyl`
- `meta[description]='Discover Lotus Ceylon's signature travel'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sacred and Bespoke Ceylon Experiences | '`
- `meta[og:description]='Immerse yourself in authentic Sri Lankan'`
- `meta[og:url]='https://lotusceylon.com/experiences.html'`
- `meta[og:image]='https://lotusceylon.com/assets/images/wi'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`contact.html`](contact.html)
- **Coverage**: `94 / 199` elements bound (`47.2%`) | **Hard-Coded**: `105` elements

**Heading (1 hard-coded):**
- `<h3> Scan QR Code`

**Paragraph (7 hard-coded):**
- `Select Language...`
- `24/7 assistance for travellers currently on tour...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (30 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 22 more*

**Link (39 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 31 more*

**Image (1 hard-coded):**
- `src='' alt='Enlarged QR Code'`

**Badge / Tag (13 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: WhatsAppWeChat: FGUTaiwan90LINE: dpbs202`
- `Badge: WhatsApp`
- `Badge: WeChat: FGUTaiwan90`
- `Badge: LINE: dpbs2024 (+886 958 561 954)`
- `Badge: WhatsApp`
- *... and 5 more*

**Meta Tag (13 hard-coded):**
- `<title> Contact Lotus Ceylon | Island Headquarters and Dir`
- `meta[description]='Reach Lotus Ceylon International Tours a'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Contact Lotus Ceylon | Island Headquarte'`
- `meta[og:description]='Reach Lotus Ceylon International Tours a'`
- `meta[og:url]='https://kanchu12345.github.io/thai/conta'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`about.html`](about.html)
- **Coverage**: `178 / 282` elements bound (`63.1%`) | **Hard-Coded**: `104` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (39 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 31 more*

**Badge / Tag (15 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Pure Journeys • Sacred Experiences`
- `Badge: 01Sacred and Spiritual RespectWe provide`
- `Badge: 01`
- `Badge: 02Unrivaled PersonalizationNo rigid grou`
- `Badge: 02`
- *... and 7 more*

**Meta Tag (14 hard-coded):**
- `<title> About Lotus Ceylon | Pure Journeys and Sacred Expe`
- `meta[description]='Discover Lotus Ceylon International Tour'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='About Lotus Ceylon | Pure Journeys and S'`
- `meta[og:description]='Discover Lotus Ceylon International Tour'`
- `meta[og:url]='https://lotusceylon.com/about.html'`
- `meta[og:image]='https://lotusceylon.com/assets/images/ab'`
- *... and 6 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html`](blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html)
- **Coverage**: `65 / 168` elements bound (`38.7%`) | **Hard-Coded**: `103` elements

**Heading (4 hard-coded):**
- `<h1> Sacred Footsteps: Unlocking Sri Lanka's Ancient Buddhist Kingdoms`
- `<h2> The Sacred Cities of the Northern Plains`
- `<h2> Polonnaruwa and the Living Rock of Gal Vihara`
- `<h2> The Temple of the Sacred Tooth Relic in Kandy`

**Paragraph (12 hard-coded):**
- `Select Language...`
- `ByLotus Ceylon Editorial Team...`
- `Sri Lanka is more than an emerald teardrop in the Indian Ocean; it is ...`
- `In Anuradhapura, the ancient capital founded in the 4th century BCE, c...`
- `“Pilgrimage in Ceylon is not passive sightseeing; it is an intimate mi...`
- `In medieval Polonnaruwa, master sculptors transformed living granite i...`
- `Nestled in the mist-veiled central highlands beside Kandy Lake, Sri Da...`
- `ADDRESS...`
- *... and 4 more*

**Button (28 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 20 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 33 more*

**Image (1 hard-coded):**
- `src='../../assets/images/cultural/sigiriya-1.webp' alt='Sacred Footsteps: Unlocking Sr'`

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `<title> Sacred Footsteps: Unlocking Sri Lanka's Ancient Bu`
- `meta[description]='From the colossal brick stupas of Anurad'`
- `meta[og:title]='Sacred Footsteps: Unlocking Sri Lanka's '`
- `meta[og:description]='From the colossal brick stupas of Anurad'`
- `meta[og:image]='../../assets/images/cultural/sigiriya-1.'`
- `meta[og:url]='https://lotusceylon.com/blog/sacred-foot'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sacred Footsteps: Unlocking Sri Lanka's '`
- *... and 3 more*


### [`blog/living-healing-traditional-ceylon-ayurveda/index.html`](blog/living-healing-traditional-ceylon-ayurveda/index.html)
- **Coverage**: `65 / 167` elements bound (`38.9%`) | **Hard-Coded**: `102` elements

**Heading (4 hard-coded):**
- `<h1> Living Healing: The Ancient Art and Science of Traditional Ceylon Ayur`
- `<h2> Pulse Diagnosis (Nadi Pariksha) with Resident Vaidyas`
- `<h2> Tailored Herbal Elixirs and Sacred Treatments`
- `<h2> Sanctuary for the Soul`

**Paragraph (11 hard-coded):**
- `Select Language...`
- `ByLotus Ayu Senior Practitioner...`
- `For more than 3,000 years, the island of Sri Lanka has nurtured one of...`
- `Every healing journey begins with a private diagnostic consultation by...`
- `Treatments are prescribed individually using freshly prepared organic ...`
- `Set within private coastal coconut groves in Bentota and secluded rive...`
- `ADDRESS...`
- `PHONE...`
- *... and 3 more*

**Button (28 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 20 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 33 more*

**Image (1 hard-coded):**
- `src='../../assets/images/ayurveda/herbal-treatment-1.webp' alt='Living Healing: The Ancient Ar'`

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `<title> Living Healing: The Ancient Art and Science of Tra`
- `meta[description]='Discover how Sri Lanka's unique Deshiya '`
- `meta[og:title]='Living Healing: The Ancient Art and Scie'`
- `meta[og:description]='Discover how Sri Lanka's unique Deshiya '`
- `meta[og:image]='../../assets/images/ayurveda/herbal-trea'`
- `meta[og:url]='https://lotusceylon.com/blog/living-heal'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Living Healing: The Ancient Art and Scie'`
- *... and 3 more*


### [`blog/growing-a-greener-future-volunteer-reforestation-sinharaja/index.html`](blog/growing-a-greener-future-volunteer-reforestation-sinharaja/index.html)
- **Coverage**: `65 / 165` elements bound (`39.4%`) | **Hard-Coded**: `100` elements

**Heading (3 hard-coded):**
- `<h1> Growing a Greener Future: Volunteer Reforestation in the Sinharaja Can`
- `<h2> The Buffer Zone Protection Initiative`
- `<h2> Silent Walks Through Living Evolution`

**Paragraph (10 hard-coded):**
- `Select Language...`
- `ByLotus Ceylon Conservation Desk...`
- `As Sri Lanka's last viable area of primary tropical rainforest, the Si...`
- `Through our responsible travel charter, Lotus Ceylon contributes direc...`
- `Trekking under Sinharaja's dense emerald canopy is a transformative se...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- *... and 2 more*

**Button (28 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 20 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 33 more*

**Image (1 hard-coded):**
- `src='../../assets/images/wildlife/sinharaja-rainforest-5.webp' alt='Growing a Greener Future: Volu'`

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `<title> Growing a Greener Future: Volunteer Reforestation`
- `meta[description]='Explore how Lotus Ceylon supports rainfo'`
- `meta[og:title]='Growing a Greener Future: Volunteer Refo'`
- `meta[og:description]='Explore how Lotus Ceylon supports rainfo'`
- `meta[og:image]='../../assets/images/wildlife/sinharaja-r'`
- `meta[og:url]='https://lotusceylon.com/blog/growing-a-g'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Growing a Greener Future: Volunteer Refo'`
- *... and 3 more*


### [`blog/the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya/index.html`](blog/the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya/index.html)
- **Coverage**: `65 / 165` elements bound (`39.4%`) | **Hard-Coded**: `100` elements

**Heading (3 hard-coded):**
- `<h1> The Great Gathering: Watching Hundreds of Wild Elephants at Minneriya`
- `<h2> The Ancient Reservoir That Sustains Generations`
- `<h2> Ethical Safaris with Lotus Ceylon Chauffeurs`

**Paragraph (10 hard-coded):**
- `Select Language...`
- `ByLotus Ceylon Wildlife Naturalist...`
- `Every year during the dry season from July through October, nature orc...`
- `Built by King Mahasen in the 3rd century CE, the ancient Minneriya tan...`
- `Lotus Ceylon adheres strictly to ethical wildlife protocols. Our custo...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- *... and 2 more*

**Button (28 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 20 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 33 more*

**Image (1 hard-coded):**
- `src='../../assets/images/wildlife/minneriya-elephant-gathering-2.webp' alt='The Great Gathering: Watching '`

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `<title> The Great Gathering: Watching Hundreds of Wild Ele`
- `meta[description]='Ranked among the world's greatest wildli'`
- `meta[og:title]='The Great Gathering: Watching Hundreds o'`
- `meta[og:description]='Ranked among the world's greatest wildli'`
- `meta[og:image]='../../assets/images/wildlife/minneriya-e'`
- `meta[og:url]='https://lotusceylon.com/blog/the-great-g'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='The Great Gathering: Watching Hundreds o'`
- *... and 3 more*


### [`inquiry-detailed.html`](inquiry-detailed.html)
- **Coverage**: `84 / 183` elements bound (`45.9%`) | **Hard-Coded**: `99` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (30 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 22 more*

**Link (39 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 31 more*

**Stat / Counter (1 hard-coded):**
- `Stat: 0 / 1000`

**Badge / Tag (8 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Bespoke Ceylon Travel`
- `Badge: Total travellers2`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (14 hard-coded):**
- `<title> Tailor-Made Private Journey Planner | Lotus Ceylon`
- `meta[description]='Craft your dream Sri Lanka holiday. Comp'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Tailor-Made Private Journey Planner | Lo'`
- `meta[og:description]='Craft your dream Sri Lanka holiday. Comp'`
- `meta[og:url]='https://lotusceylon.com/inquiry-detailed'`
- `meta[og:image]='https://lotusceylon.com/assets/images/he'`
- *... and 6 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`gallery.html`](gallery.html)
- **Coverage**: `134 / 231` elements bound (`58.0%`) | **Hard-Coded**: `97` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (30 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 22 more*

**Link (39 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 31 more*

**Image (1 hard-coded):**
- `src='' alt='Enlarged Visual'`

**Badge / Tag (7 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: SACRED CEYLON VISUAL CHRONICLES`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `<title> Sri Lanka Visual Chronicles and Photo Gallery | Lo`
- `meta[description]='Journey through breathtaking imagery of '`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Visual Chronicles and Photo Ga'`
- `meta[og:description]='Journey through breathtaking imagery of '`
- `meta[og:url]='https://lotusceylon.com/gallery.html'`
- `meta[og:image]='https://lotusceylon.com/assets/images/he'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`inquiry-quick.html`](inquiry-quick.html)
- **Coverage**: `82 / 178` elements bound (`46.1%`) | **Hard-Coded**: `96` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (30 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 22 more*

**Link (39 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 31 more*

**Badge / Tag (7 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: Express Travel Coordination`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `<title> Quick Tour Inquiry | Plan Your Sri Lanka Journey |`
- `meta[description]='Request a fast, customized Sri Lanka tou'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Quick Tour Inquiry | Plan Your Sri Lanka'`
- `meta[og:description]='Request a fast, customized Sri Lanka tou'`
- `meta[og:url]='https://lotusceylon.com/inquiry-quick.ht'`
- `meta[og:image]='https://lotusceylon.com/assets/images/he'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`reviews.html`](reviews.html)
- **Coverage**: `77 / 173` elements bound (`44.5%`) | **Hard-Coded**: `96` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (30 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 22 more*

**Link (39 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 31 more*

**Badge / Tag (7 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: DISCERNING TRAVELER REFLECTIONS`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `<title> Guest Testimonials and Reviews | Lotus Ceylon Luxu`
- `meta[description]='Read Guest Stories and authentic travel '`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Guest Testimonials and Reviews | Lotus C'`
- `meta[og:description]='Read Guest Stories and authentic travel '`
- `meta[og:url]='https://lotusceylon.com/reviews.html'`
- `meta[og:image]='https://lotusceylon.com/assets/images/ab'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/beach/index.html`](tours/beach/index.html)
- **Coverage**: `174 / 270` elements bound (`64.4%`) | **Hard-Coded**: `96` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (31 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 23 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (7 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: PURE JOURNEYS • TROPICAL COASTAL ESCAPES`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `meta[description]='Discover tailor-made Sri Lanka beach hol'`
- `meta[keywords]='sri lanka beach tours, luxury beach holi'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Luxury Beach Holidays | Lotus '`
- `meta[og:description]='Surrender to 1,300 kilometers of sun-ble'`
- `meta[og:url]='https://lotusceylon.com/tours/beach/inde'`
- `meta[og:image]='https://lotusceylon.com/assets/tours/bea'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/buddhist-heritage/index.backup.html`](tours/buddhist-heritage/index.backup.html)
- **Coverage**: `99 / 195` elements bound (`50.8%`) | **Hard-Coded**: `96` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (42 hard-coded):**
- `href='#siteHeader' [Skip to main content]`
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 34 more*

**Badge / Tag (7 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: SACRED DHAMMA PILGRIMAGES`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Buddhist Heritage and Sacred Pilgrimages'`
- `meta[og:description]='Embark on transformative Buddhist pilgri'`
- `meta[og:url]='https://lotusceylon.com/tours/buddhist-h'`
- `meta[og:image]='https://lotusceylon.com/assets/images/cu'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Buddhist Heritage and Sacred Pilgrimages'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/buddhist-heritage/index.html`](tours/buddhist-heritage/index.html)
- **Coverage**: `102 / 198` elements bound (`51.5%`) | **Hard-Coded**: `96` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (42 hard-coded):**
- `href='#siteHeader' [Skip to main content]`
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 34 more*

**Badge / Tag (7 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: SACRED DHAMMA PILGRIMAGES`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Buddhist Heritage and Sacred Pilgrimages'`
- `meta[og:description]='Embark on transformative Buddhist pilgri'`
- `meta[og:url]='https://lotusceylon.com/tours/buddhist-h'`
- `meta[og:image]='https://lotusceylon.com/assets/images/cu'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Buddhist Heritage and Sacred Pilgrimages'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/cultural/index.html`](tours/cultural/index.html)
- **Coverage**: `175 / 271` elements bound (`64.6%`) | **Hard-Coded**: `96` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (31 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 23 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (7 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: SACRED KINGDOMS • UNESCO LIVING HERITAGE`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `meta[description]='Immerse in three millennia of living her'`
- `meta[keywords]='sri lanka cultural tours, cultural trian'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Cultural Tours | Lotus Ceylon '`
- `meta[og:description]='Journey across 2,300+ years of recorded '`
- `meta[og:url]='https://lotusceylon.com/tours/cultural/i'`
- `meta[og:image]='https://lotusceylon.com/assets/tours/cul'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/wildlife/index.html`](tours/wildlife/index.html)
- **Coverage**: `173 / 269` elements bound (`64.3%`) | **Hard-Coded**: `96` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (31 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 23 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (7 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: ASIA’S APEX WILDLIFE • THE BIG FIVE SANC`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `meta[description]='Embark on thrilling private wildlife saf'`
- `meta[keywords]='sri lanka wildlife tours, yala leopard s'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Wildlife Safaris | Lotus Ceylo'`
- `meta[og:description]='Encounter earth’s highest leopard densit'`
- `meta[og:url]='https://lotusceylon.com/tours/wildlife/i'`
- `meta[og:image]='https://lotusceylon.com/assets/tours/wil'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`cancellation-policy.html`](cancellation-policy.html)
- **Coverage**: `83 / 178` elements bound (`46.6%`) | **Hard-Coded**: `95` elements

**Paragraph (7 hard-coded):**
- `Select Language...`
- `Last updated: November 2026...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (39 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 31 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `<title> Cancellation and Refund Policy | Lotus Ceylon Luxu`
- `meta[description]='Review Lotus Ceylon's fair cancellation '`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Cancellation and Refund Policy | Lotus C'`
- `meta[og:description]='Review Lotus Ceylon's fair cancellation '`
- `meta[og:url]='https://lotusceylon.com/cancellation-pol'`
- `meta[og:image]='https://lotusceylon.com/assets/images/he'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`destinations.html`](destinations.html)
- **Coverage**: `177 / 272` elements bound (`65.1%`) | **Hard-Coded**: `95` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (39 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 31 more*

**Badge / Tag (7 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: SACRED PILGRIMAGE AND ICONIC WONDERS`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `<title> Sacred Destinations of Sri Lanka | Lotus Ceylon Tr`
- `meta[description]='Discover Sri Lanka's most revered Buddhi'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sacred Destinations of Sri Lanka | Lotus'`
- `meta[og:description]='Explore Sri Lanka's most iconic destinat'`
- `meta[og:url]='https://lotusceylon.com/destinations.htm'`
- `meta[og:image]='https://lotusceylon.com/assets/images/cu'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`privacy-policy.html`](privacy-policy.html)
- **Coverage**: `88 / 183` elements bound (`48.1%`) | **Hard-Coded**: `95` elements

**Paragraph (7 hard-coded):**
- `Select Language...`
- `Last updated: November 2026...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (39 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 31 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `<title> Privacy Policy | Lotus Ceylon International Tours`
- `meta[description]='Learn how Lotus Ceylon International Tou'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Privacy Policy | Lotus Ceylon Internatio'`
- `meta[og:description]='Learn how Lotus Ceylon International Tou'`
- `meta[og:url]='https://lotusceylon.com/privacy-policy.h'`
- `meta[og:image]='https://lotusceylon.com/assets/images/he'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`terms-conditions.html`](terms-conditions.html)
- **Coverage**: `82 / 177` elements bound (`46.3%`) | **Hard-Coded**: `95` elements

**Paragraph (7 hard-coded):**
- `Select Language...`
- `Last updated: November 2026...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (39 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 31 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `<title> Terms and Conditions | Lotus Ceylon Luxury Tours a`
- `meta[description]='Official terms and booking conditions fo'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Terms and Conditions | Lotus Ceylon Luxu'`
- `meta[og:description]='Official terms and booking conditions fo'`
- `meta[og:url]='https://lotusceylon.com/terms-conditions'`
- `meta[og:image]='https://lotusceylon.com/assets/images/he'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`cookie-policy.html`](cookie-policy.html)
- **Coverage**: `78 / 172` elements bound (`45.3%`) | **Hard-Coded**: `94` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (39 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [Wildlife Safaris]`
- `href='./tours/beach/index.html' [Pristine Beaches]`
- `href='./tours/hill-country/index.html' [Hill Country and Tea]`
- `href='./tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 31 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (13 hard-coded):**
- `<title> Cookie Policy | Lotus Ceylon International Tours a`
- `meta[description]='Information about the cookies and local '`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Cookie Policy | Lotus Ceylon Internation'`
- `meta[og:description]='Information about the cookies and local '`
- `meta[og:url]='https://lotusceylon.com/cookie-policy.ht'`
- `meta[og:image]='https://lotusceylon.com/assets/images/he'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`blog/ella-hands-on-tea-making-experience/index.html`](blog/ella-hands-on-tea-making-experience/index.html)
- **Coverage**: `81 / 173` elements bound (`46.8%`) | **Hard-Coded**: `92` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (28 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 20 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- *... and 33 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `<title> Ella: Hands-On Tea Making Experience with Tasting`
- `meta[description]='Discover the heart of Sri Lanka's tea cu'`
- `meta[og:title]='Ella: Hands-On Tea Making Experience wit'`
- `meta[og:description]='Discover the heart of Sri Lanka's tea cu'`
- `meta[og:image]='../../assets/images/blog/ella-tea-making'`
- `meta[og:url]='https://lotusceylon.com/blog/ella-hands-'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Ella: Hands-On Tea Making Experience wit'`
- *... and 3 more*


### [`tours/adventure/index.html`](tours/adventure/index.html)
- **Coverage**: `113 / 204` elements bound (`55.4%`) | **Hard-Coded**: `91` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Adventure and Active Expeditio'`
- `meta[og:description]='Challenge your spirit across raw, untame'`
- `meta[og:url]='https://lotusceylon.com/tours/adventure/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Adventure and Active Expeditio'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/ayurvedic/index.html`](tours/ayurvedic/index.html)
- **Coverage**: `112 / 203` elements bound (`55.2%`) | **Hard-Coded**: `91` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Ayurvedic and Holistic Wellnes'`
- `meta[og:description]='Restore harmony of body, mind, and spiri'`
- `meta[og:url]='https://lotusceylon.com/tours/ayurvedic/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Ayurvedic and Holistic Wellnes'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/family/index.html`](tours/family/index.html)
- **Coverage**: `126 / 217` elements bound (`58.1%`) | **Hard-Coded**: `91` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Family Holiday Packages | Lotu'`
- `meta[og:description]='Create unforgettable memories across gen'`
- `meta[og:url]='https://lotusceylon.com/tours/family/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Family Holiday Packages | Lotu'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/golf/index.html`](tours/golf/index.html)
- **Coverage**: `124 / 215` elements bound (`57.7%`) | **Hard-Coded**: `91` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Golf Holidays and Championship'`
- `meta[og:description]='Tee off across Asia’s most scenic and hi'`
- `meta[og:url]='https://lotusceylon.com/tours/golf/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Golf Holidays and Championship'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/hill-country/index.html`](tours/hill-country/index.html)
- **Coverage**: `126 / 217` elements bound (`58.1%`) | **Hard-Coded**: `91` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Hill Country and Tea Country T'`
- `meta[og:description]='Escape to the cool emerald highlands of '`
- `meta[og:url]='https://lotusceylon.com/tours/hill-count'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Hill Country and Tea Country T'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/honeymoon/index.html`](tours/honeymoon/index.html)
- **Coverage**: `113 / 204` elements bound (`55.4%`) | **Hard-Coded**: `91` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Luxury Honeymoon Tours | Lotus'`
- `meta[og:description]='Celebrate your love in an enchanted trop'`
- `meta[og:url]='https://lotusceylon.com/tours/honeymoon/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Luxury Honeymoon Tours | Lotus'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/ramayana/index.html`](tours/ramayana/index.html)
- **Coverage**: `114 / 205` elements bound (`55.6%`) | **Hard-Coded**: `91` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Ramayana Heritage Tours | Lotu'`
- `meta[og:description]='Walk in the footsteps of Sri Rama, Sita '`
- `meta[og:url]='https://lotusceylon.com/tours/ramayana/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Ramayana Heritage Tours | Lotu'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`destinations/anuradhapura/index.html`](destinations/anuradhapura/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Anuradhapura | Luxury Tours and Sacred Ceylon Jour`
- `meta[description]='Foundational Buddhist capital with tower'`
- `meta[og:title]='Anuradhapura - Lotus Ceylon'`
- `meta[og:description]='Foundational Buddhist capital with tower'`
- `meta[og:image]='../../assets/images/cultural/kandy-templ'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/anuradhapura/'`


### [`destinations/arugam-bay/index.html`](destinations/arugam-bay/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Arugam Bay | Luxury Tours and Sacred Ceylon Journe`
- `meta[description]='World-class right-hand surf point, relax'`
- `meta[og:title]='Arugam Bay - Lotus Ceylon'`
- `meta[og:description]='World-class right-hand surf point, relax'`
- `meta[og:image]='../../assets/images/adventure/kitulgala-'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/arugam-bay/'`


### [`destinations/bentota-beruwala/index.html`](destinations/bentota-beruwala/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Bentota and Beruwala | Luxury Tours and Sacred Cey`
- `meta[description]='Sri Lanka's luxury coastal capital featu'`
- `meta[og:title]='Bentota and Beruwala - Lotus Ceylon'`
- `meta[og:description]='Sri Lanka's luxury coastal capital featu'`
- `meta[og:image]='../../assets/images/beach/mirissa-1.webp'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/bentota-beruwala/'`


### [`destinations/colombo-kelani-valley/index.html`](destinations/colombo-kelani-valley/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Colombo and Kelani Valley | Luxury Tours and Sacre`
- `meta[description]='Vibrant commercial and cultural hub blen'`
- `meta[og:title]='Colombo and Kelani Valley - Lotus Ceylon'`
- `meta[og:description]='Vibrant commercial and cultural hub blen'`
- `meta[og:image]='../../assets/images/about/hospitality-sc'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/colombo-kelani-valley/'`


### [`destinations/dambulla/index.html`](destinations/dambulla/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Dambulla | Luxury Tours and Sacred Ceylon Journeys`
- `meta[description]='Magnificent UNESCO cave temple complex c'`
- `meta[og:title]='Dambulla - Lotus Ceylon'`
- `meta[og:description]='Magnificent UNESCO cave temple complex c'`
- `meta[og:image]='../../assets/images/cultural/polonnaruwa'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/dambulla/'`


### [`destinations/ella-demodara/index.html`](destinations/ella-demodara/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Ella and Demodara | Luxury Tours and Sacred Ceylon`
- `meta[description]='Sri Lanka's beloved mountain village fam'`
- `meta[og:title]='Ella and Demodara - Lotus Ceylon'`
- `meta[og:description]='Sri Lanka's beloved mountain village fam'`
- `meta[og:image]='../../assets/images/hill-country/nine-ar'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/ella-demodara/'`


### [`destinations/galle-dutch-fort/index.html`](destinations/galle-dutch-fort/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Galle Dutch Fort | Luxury Tours and Sacred Ceylon`
- `meta[description]='300-year-old living UNESCO seaside fort '`
- `meta[og:title]='Galle Dutch Fort - Lotus Ceylon'`
- `meta[og:description]='300-year-old living UNESCO seaside fort '`
- `meta[og:image]='../../assets/images/beach/mirissa-1.webp'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/galle-dutch-fort/'`


### [`destinations/haputale-lipton-s-seat/index.html`](destinations/haputale-lipton-s-seat/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Haputale and Lipton's Seat | Luxury Tours and Sacr`
- `meta[description]='The dramatic cliffside viewpoint where S'`
- `meta[og:title]='Haputale and Lipton's Seat - Lotus Ceylo'`
- `meta[og:description]='The dramatic cliffside viewpoint where S'`
- `meta[og:image]='../../assets/images/hill-country/nuwara-'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/haputale-lipton-s-seat/'`


### [`destinations/horton-plains-world-s-end/index.html`](destinations/horton-plains-world-s-end/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Horton Plains and World's End | Luxury Tours and S`
- `meta[description]='Dramatic cloud forest plateau at 2,100m '`
- `meta[og:title]='Horton Plains and World's End - Lotus Ce'`
- `meta[og:description]='Dramatic cloud forest plateau at 2,100m '`
- `meta[og:image]='../../assets/images/wildlife/sinharaja-r'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/horton-plains-world-s-end/'`


### [`destinations/kandy/index.html`](destinations/kandy/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Kandy (Temple of the Tooth) | Luxury Tours and Sac`
- `meta[description]='The hill capital honoring Sri Dalada Mal'`
- `meta[og:title]='Kandy (Temple of the Tooth) - Lotus Ceyl'`
- `meta[og:description]='The hill capital honoring Sri Dalada Mal'`
- `meta[og:image]='../../assets/images/cultural/sigiriya-1.'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/kandy/'`


### [`destinations/kataragama/index.html`](destinations/kataragama/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Kataragama | Luxury Tours and Sacred Ceylon Journe`
- `meta[description]='Sacred forest shrine complex venerated f'`
- `meta[og:title]='Kataragama - Lotus Ceylon'`
- `meta[og:description]='Sacred forest shrine complex venerated f'`
- `meta[og:image]='../../assets/images/cultural/sigiriya-1.'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/kataragama/'`


### [`destinations/kelaniya/index.html`](destinations/kelaniya/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Kelaniya | Luxury Tours and Sacred Ceylon Journeys`
- `meta[description]='Revered riverside temple near Colombo, s'`
- `meta[og:title]='Kelaniya - Lotus Ceylon'`
- `meta[og:description]='Revered riverside temple near Colombo, s'`
- `meta[og:image]='../../assets/tours/cultural/hero.jpg'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/kelaniya/'`


### [`destinations/mihintale/index.html`](destinations/mihintale/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Mihintale | Luxury Tours and Sacred Ceylon Journey`
- `meta[description]='The venerated mountain sanctuary where A'`
- `meta[og:title]='Mihintale - Lotus Ceylon'`
- `meta[og:description]='The venerated mountain sanctuary where A'`
- `meta[og:image]='../../assets/images/cultural/dambulla-ca'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/mihintale/'`


### [`destinations/minneriya-national-park/index.html`](destinations/minneriya-national-park/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Minneriya National Park | Luxury Tours and Sacred`
- `meta[description]='Site of 'The Gathering'—the world's larg'`
- `meta[og:title]='Minneriya National Park - Lotus Ceylon'`
- `meta[og:description]='Site of 'The Gathering'—the world's larg'`
- `meta[og:image]='../../assets/images/wildlife/minneriya-e'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/minneriya-national-park/'`


### [`destinations/mirissa-weligama/index.html`](destinations/mirissa-weligama/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Mirissa and Weligama | Luxury Tours and Sacred Cey`
- `meta[description]='Crescent golden beach world-renowned for'`
- `meta[og:title]='Mirissa and Weligama - Lotus Ceylon'`
- `meta[og:description]='Crescent golden beach world-renowned for'`
- `meta[og:image]='../../assets/images/honeymoon/mirissa-su'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/mirissa-weligama/'`


### [`destinations/negombo-beach-lagoon/index.html`](destinations/negombo-beach-lagoon/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Negombo Beach and Lagoon | Luxury Tours and Sacred`
- `meta[description]='Convenient coastal starting haven locate'`
- `meta[og:title]='Negombo Beach and Lagoon - Lotus Ceylon'`
- `meta[og:description]='Convenient coastal starting haven locate'`
- `meta[og:image]='../../assets/tours/beach/hero.jpg'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/negombo-beach-lagoon/'`


### [`destinations/nuwara-eliya/index.html`](destinations/nuwara-eliya/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Nuwara Eliya ('Little England') | Luxury Tours and`
- `meta[description]='Cool mountain retreat surrounded by roll'`
- `meta[og:title]='Nuwara Eliya ('Little England') - Lotus '`
- `meta[og:description]='Cool mountain retreat surrounded by roll'`
- `meta[og:image]='../../assets/images/hill-country/nuwara-'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/nuwara-eliya/'`


### [`destinations/polonnaruwa/index.html`](destinations/polonnaruwa/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Polonnaruwa | Luxury Tours and Sacred Ceylon Journ`
- `meta[description]='Medieval royal capital famed for the Gal'`
- `meta[og:title]='Polonnaruwa - Lotus Ceylon'`
- `meta[og:description]='Medieval royal capital famed for the Gal'`
- `meta[og:image]='../../assets/images/cultural/polonnaruwa'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/polonnaruwa/'`


### [`destinations/sigiriya-rock-citadel/index.html`](destinations/sigiriya-rock-citadel/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Sigiriya Rock Citadel | Luxury Tours and Sacred Ce`
- `meta[description]='The world-famous 'Lion Rock'—a 5th-centu'`
- `meta[og:title]='Sigiriya Rock Citadel - Lotus Ceylon'`
- `meta[og:description]='The world-famous 'Lion Rock'—a 5th-centu'`
- `meta[og:image]='../../assets/images/cultural/sigiriya-1.'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/sigiriya-rock-citadel/'`


### [`destinations/sri-pada/index.html`](destinations/sri-pada/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Sri Pada (Adam's Peak) | Luxury Tours and Sacred C`
- `meta[description]='The sacred 2,243m conical mountain crown'`
- `meta[og:title]='Sri Pada (Adam's Peak) - Lotus Ceylon'`
- `meta[og:description]='The sacred 2,243m conical mountain crown'`
- `meta[og:image]='../../assets/images/hill-country/nuwara-'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/sri-pada/'`


### [`destinations/trincomalee-nilaveli/index.html`](destinations/trincomalee-nilaveli/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Trincomalee and Nilaveli | Luxury Tours and Sacred`
- `meta[description]='East coast sanctuary of powdery white sa'`
- `meta[og:title]='Trincomalee and Nilaveli - Lotus Ceylon'`
- `meta[og:description]='East coast sanctuary of powdery white sa'`
- `meta[og:image]='../../assets/images/beach/pasikudah-5.we'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/trincomalee-nilaveli/'`


### [`destinations/udawalawe-national-park/index.html`](destinations/udawalawe-national-park/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Udawalawe National Park | Luxury Tours and Sacred`
- `meta[description]='Renowned for year-round wild elephant si'`
- `meta[og:title]='Udawalawe National Park - Lotus Ceylon'`
- `meta[og:description]='Renowned for year-round wild elephant si'`
- `meta[og:image]='../../assets/tours/wildlife/hero.jpg'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/udawalawe-national-park/'`


### [`destinations/wilpattu-national-park/index.html`](destinations/wilpattu-national-park/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Wilpattu National Park | Luxury Tours and Sacred C`
- `meta[description]='Sri Lanka's largest and oldest national '`
- `meta[og:title]='Wilpattu National Park - Lotus Ceylon'`
- `meta[og:description]='Sri Lanka's largest and oldest national '`
- `meta[og:image]='../../assets/images/wildlife/yala-leopar'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/wilpattu-national-park/'`


### [`destinations/yala-national-park/index.html`](destinations/yala-national-park/index.html)
- **Coverage**: `79 / 165` elements bound (`47.9%`) | **Hard-Coded**: `86` elements

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ADDRESS...`
- `PHONE...`
- `EMAIL...`
- `NEWSLETTER...`
- `OUR PAYMENT PARTNERS...`

**Button (29 hard-coded):**
- `EN`
- `English`
- `繁體中文 (Taiwan)`
- `简体中文 (Modern)`
- `Français (French)`
- `Deutsch (German)`
- `Русский`
- `Español`
- *... and 21 more*

**Link (38 hard-coded):**
- `href='../../tours/cultural/index.html' [Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [Wildlife Safaris]`
- `href='../../tours/beach/index.html' [Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [Hill Country and Tea]`
- `href='../../tours/ayurvedic/index.html' [Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [Honeymoon Romance]`
- `href='../../tours/family/index.html' [Family Discovery]`
- *... and 30 more*

**Badge / Tag (6 hard-coded):**
- `Badge: ENEnglish繁體中文 (Taiwan)简体中文 (Modern)Franç`
- `Badge: EN`
- `Badge: English繁體中文 (Taiwan)简体中文 (Modern)Françai`
- `Badge: AMEXPay`
- `Badge: AMEX`
- `Badge: Pay`

**Meta Tag (7 hard-coded):**
- `<title> Yala National Park | Luxury Tours and Sacred Ceylo`
- `meta[description]='Sri Lanka's premier wildlife park boasti'`
- `meta[og:title]='Yala National Park - Lotus Ceylon'`
- `meta[og:description]='Sri Lanka's premier wildlife park boasti'`
- `meta[og:image]='../../assets/images/wildlife/yala-leopar'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/yala-national-park/'`


### [`tours/detail.html`](tours/detail.html)
- **Coverage**: `0 / 15` elements bound (`0.0%`) | **Hard-Coded**: `15` elements

**Heading (1 hard-coded):**
- `<h1> Redirecting to Lotus Ceylon`

**Paragraph (1 hard-coded):**
- `Please wait, redirecting toThe Sacred Lotus Triangle......`

**Link (1 hard-coded):**
- `href='cultural/the-sacred-lotus-triangle/' [The Sacred Lotus Triangle]`

**Meta Tag (12 hard-coded):**
- `<title> Redirecting to The Sacred Lotus Triangle | Lotus C`
- `meta[description]='Redirecting to Detail on Lotus Ceylon. E'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Redirecting to Detail | Lotus Ceylon'`
- `meta[og:description]='Explore Detail on Lotus Ceylon. Private '`
- `meta[og:url]='https://lotusceylon.com/tours/cultural/t'`
- `meta[og:image]='https://lotusceylon.com/assets/images/he'`
- *... and 4 more*


### [`adventure-tours.html`](adventure-tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toAdventure and Trekking Tours......`

**Link (1 hard-coded):**
- `href='./tours/adventure/index.html' [Adventure and Trekking Tours]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Adventure and Trekking Tours | Lotu`
- `canonical='https://lotusceylon.com/tours/adventure/index.html'`


### [`ayurvedic-tours.html`](ayurvedic-tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toAuthentic Ayurveda and Wellness......`

**Link (1 hard-coded):**
- `href='./tours/ayurvedic/index.html' [Authentic Ayurveda and Wellnes]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Authentic Ayurveda and Wellness | L`
- `canonical='https://lotusceylon.com/tours/ayurvedic/index.html'`


### [`beach-tours.html`](beach-tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toPristine Beach Holidays......`

**Link (1 hard-coded):**
- `href='./tours/beach/index.html' [Pristine Beach Holidays]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Pristine Beach Holidays | Lotus Cey`
- `canonical='https://lotusceylon.com/tours/beach/index.html'`


### [`buddhist-heritage-tours.html`](buddhist-heritage-tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toBuddhist Heritage Pilgrimages......`

**Link (1 hard-coded):**
- `href='./tours/buddhist-heritage/index.html' [Buddhist Heritage Pilgrimages]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Buddhist Heritage Pilgrimages | Lot`
- `canonical='https://lotusceylon.com/tours/buddhist-heritage/index.html'`


### [`category.html`](category.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toTour Categories......`

**Link (1 hard-coded):**
- `href='./tours/cultural/index.html' [Tour Categories]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Tour Categories | Lotus Ceylon`
- `canonical='https://lotusceylon.com/tours/cultural/index.html'`


### [`cultural-tours.html`](cultural-tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toCultural Triangle Tours......`

**Link (1 hard-coded):**
- `href='./tours/cultural/index.html' [Cultural Triangle Tours]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Cultural Triangle Tours | Lotus Cey`
- `canonical='https://lotusceylon.com/tours/cultural/index.html'`


### [`family-tours.html`](family-tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toFamily Escapes......`

**Link (1 hard-coded):**
- `href='./tours/family/index.html' [Family Escapes]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Family Escapes | Lotus Ceylon`
- `canonical='https://lotusceylon.com/tours/family/index.html'`


### [`golf-tours.html`](golf-tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toCeylon Golf Masters......`

**Link (1 hard-coded):**
- `href='./tours/golf/index.html' [Ceylon Golf Masters]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Ceylon Golf Masters | Lotus Ceylon`
- `canonical='https://lotusceylon.com/tours/golf/index.html'`


### [`hill-country-tours.html`](hill-country-tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toHill Country and Tea Trails......`

**Link (1 hard-coded):**
- `href='./tours/hill-country/index.html' [Hill Country and Tea Trails]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Hill Country and Tea Trails | Lotus`
- `canonical='https://lotusceylon.com/tours/hill-country/index.html'`


### [`honeymoon-tours.html`](honeymoon-tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toRomantic Honeymoon Escapes......`

**Link (1 hard-coded):**
- `href='./tours/honeymoon/index.html' [Romantic Honeymoon Escapes]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Romantic Honeymoon Escapes | Lotus`
- `canonical='https://lotusceylon.com/tours/honeymoon/index.html'`


### [`ramayana-tours.html`](ramayana-tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toSacred Ramayana Trail......`

**Link (1 hard-coded):**
- `href='./tours/ramayana/index.html' [Sacred Ramayana Trail]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Sacred Ramayana Trail | Lotus Ceylo`
- `canonical='https://lotusceylon.com/tours/ramayana/index.html'`


### [`sri-lanka-tours.html`](sri-lanka-tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toAll Sri Lanka Tours and Packages......`

**Link (1 hard-coded):**
- `href='./tours/index.html' [All Sri Lanka Tours and Packag]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to All Sri Lanka Tours and Packages |`
- `canonical='https://lotusceylon.com/tours/index.html'`


### [`tour-package-detail.html`](tour-package-detail.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toTour Package Detail......`

**Link (1 hard-coded):**
- `href='./tours/cultural/the-sacred-lotus-triangle/index.html' [Tour Package Detail]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Tour Package Detail | Lotus Ceylon`
- `canonical='https://lotusceylon.com/tours/cultural/the-sacred-lotus-triangle/index.html'`


### [`tours.html`](tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toCurated Sri Lanka Tours......`

**Link (1 hard-coded):**
- `href='./tours/index.html' [Curated Sri Lanka Tours]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Curated Sri Lanka Tours | Lotus Cey`
- `canonical='https://lotusceylon.com/tours/index.html'`


### [`wildlife-tours.html`](wildlife-tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toWildlife and Safari Expeditions......`

**Link (1 hard-coded):**
- `href='./tours/wildlife/index.html' [Wildlife and Safari Expedition]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Wildlife and Safari Expeditions | L`
- `canonical='https://lotusceylon.com/tours/wildlife/index.html'`

