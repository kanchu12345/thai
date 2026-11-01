# Phase 0: Master Admin Content & CMS Coverage Audit Report

> **Target Objective**: 100% of visible content, links, images, SEO fields, tables, badges, and numbers on every public page must be editable, deletable, and uploadable from the admin panel with 0 hard-coded visible elements remaining.

## Executive Summary

- **Total Pages Audited**: `99` pages across the public repository.
- **Total Elements Audited**: `20,920` elements (headings, text, links, images, table cells, FAQs, badges, counters, meta tags, and schema).
- **Currently Bound to Firestore / CMS**: `11,013` elements (`52.6%`).
- **Hard-Coded Elements to be Migrated**: `9,907` elements (`47.4%`).

| Metric | Count | Percentage |
| :--- | :--- | :--- |
| **Total Public Pages** | `99` | `100.0%` |
| **Total Tracked Elements** | `20,920` | `100.0%` |
| **CMS Bound Elements** | `11,013` | `52.6%` |
| **Hard-Coded Elements (Phase 1-3 Scope)** | `9,907` | `47.4%` |

---

## Coverage by Page Category

| Category | Page Count | Total Elements | CMS Bound | Hard-Coded | Coverage % |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Category Pages (tours/*/index.html)** | `11` | `3,566` | `1,934` | `1,632` | `54.2%` |
| **Individual Tour Detail Pages (29 Tours)** | `29` | `9,425` | `4,820` | `4,605` | `51.1%` |
| **Destination Pages (24 Destinations)** | `24` | `3,864` | `2,016` | `1,848` | `52.2%` |
| **Core Site Pages (Home, About, Contact, etc.)** | `16` | `2,999` | `1,699` | `1,300` | `56.7%` |
| **Legacy / Redirect Stubs (*-tours.html)** | `16` | `75` | `0` | `75` | `0.0%` |
| **Blog Pages (4 Articles + Index)** | `5` | `824` | `352` | `472` | `42.7%` |

---

## Per-Page Comprehensive Audit Table

| Page Path | Total Elements | CMS Bound | Hard-Coded | Coverage % | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [`tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html`](tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html) | `384` | `181` | `203` | `47.1%` | 🟡 Partial (40-75%) |
| [`tours/wildlife/wild-ceylon-predator-elephant-trail/index.html`](tours/wildlife/wild-ceylon-predator-elephant-trail/index.html) | `384` | `181` | `203` | `47.1%` | 🟡 Partial (40-75%) |
| [`tours/cultural/three-millennia-of-living-heritage/index.html`](tours/cultural/three-millennia-of-living-heritage/index.html) | `366` | `177` | `189` | `48.4%` | 🟡 Partial (40-75%) |
| [`tours/beach/index.html`](tours/beach/index.html) | `423` | `236` | `187` | `55.8%` | 🟡 Partial (40-75%) |
| [`tours/cultural/index.html`](tours/cultural/index.html) | `412` | `225` | `187` | `54.6%` | 🟡 Partial (40-75%) |
| [`tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html`](tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html) | `352` | `169` | `183` | `48.0%` | 🟡 Partial (40-75%) |
| [`tours/family/the-grand-ceylon-family-adventure/index.html`](tours/family/the-grand-ceylon-family-adventure/index.html) | `356` | `173` | `183` | `48.6%` | 🟡 Partial (40-75%) |
| [`tours/beach/pristine-seaboard-odyssey/index.html`](tours/beach/pristine-seaboard-odyssey/index.html) | `357` | `175` | `182` | `49.0%` | 🟡 Partial (40-75%) |
| [`tours/wildlife/index.html`](tours/wildlife/index.html) | `414` | `232` | `182` | `56.0%` | 🟡 Partial (40-75%) |
| [`tours/wildlife/the-sri-lanka-big-five-expedition/index.html`](tours/wildlife/the-sri-lanka-big-five-expedition/index.html) | `357` | `175` | `182` | `49.0%` | 🟡 Partial (40-75%) |
| [`tours/family/index.html`](tours/family/index.html) | `362` | `188` | `174` | `51.9%` | 🟡 Partial (40-75%) |
| [`tours/family/wild-safari-coastal-family-holiday/index.html`](tours/family/wild-safari-coastal-family-holiday/index.html) | `338` | `169` | `169` | `50.0%` | 🟡 Partial (40-75%) |
| [`tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html`](tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html) | `338` | `169` | `169` | `50.0%` | 🟡 Partial (40-75%) |
| [`tours/hill-country/highland-wilderness-cascading-waterfalls/index.html`](tours/hill-country/highland-wilderness-cascading-waterfalls/index.html) | `338` | `169` | `169` | `50.0%` | 🟡 Partial (40-75%) |
| [`tours/honeymoon/pure-serenade-coastal-highland-romance/index.html`](tours/honeymoon/pure-serenade-coastal-highland-romance/index.html) | `335` | `166` | `169` | `49.6%` | 🟡 Partial (40-75%) |
| [`tours/beach/turquoise-eastern-sanctuary/index.html`](tours/beach/turquoise-eastern-sanctuary/index.html) | `339` | `171` | `168` | `50.4%` | 🟡 Partial (40-75%) |
| [`tours/adventure/wild-peaks-trails-surf-safari/index.html`](tours/adventure/wild-peaks-trails-surf-safari/index.html) | `325` | `163` | `162` | `50.2%` | 🟡 Partial (40-75%) |
| [`tours/hill-country/index.html`](tours/hill-country/index.html) | `338` | `176` | `162` | `52.1%` | 🟡 Partial (40-75%) |
| [`tours/family/island-wonder-multi-gen-family-discovery/index.html`](tours/family/island-wonder-multi-gen-family-discovery/index.html) | `320` | `165` | `155` | `51.6%` | 🟡 Partial (40-75%) |
| [`tours/golf/highland-greens-coastal-links-championship/index.html`](tours/golf/highland-greens-coastal-links-championship/index.html) | `320` | `165` | `155` | `51.6%` | 🟡 Partial (40-75%) |
| [`tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html`](tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html) | `316` | `161` | `155` | `50.9%` | 🟡 Partial (40-75%) |
| [`tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html`](tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html) | `317` | `163` | `154` | `51.4%` | 🟡 Partial (40-75%) |
| [`tours/hill-country/misty-peaks-scenic-railways-expedition/index.html`](tours/hill-country/misty-peaks-scenic-railways-expedition/index.html) | `321` | `167` | `154` | `52.0%` | 🟡 Partial (40-75%) |
| [`tours/beach/southern-sands-serenade/index.html`](tours/beach/southern-sands-serenade/index.html) | `322` | `169` | `153` | `52.5%` | 🟡 Partial (40-75%) |
| [`tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html`](tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html) | `308` | `160` | `148` | `51.9%` | 🟡 Partial (40-75%) |
| [`tours/cultural/the-sacred-lotus-triangle/index.html`](tours/cultural/the-sacred-lotus-triangle/index.html) | `311` | `164` | `147` | `52.7%` | 🟡 Partial (40-75%) |
| [`tours/adventure/island-adrenaline-rapids-expedition/index.html`](tours/adventure/island-adrenaline-rapids-expedition/index.html) | `298` | `157` | `141` | `52.7%` | 🟡 Partial (40-75%) |
| [`tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html`](tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html) | `305` | `165` | `140` | `54.1%` | 🟡 Partial (40-75%) |
| [`tours/ramayana/index.html`](tours/ramayana/index.html) | `288` | `153` | `135` | `53.1%` | 🟡 Partial (40-75%) |
| [`tours/golf/the-royal-ceylon-fairways-tour/index.html`](tours/golf/the-royal-ceylon-fairways-tour/index.html) | `293` | `159` | `134` | `54.3%` | 🟡 Partial (40-75%) |
| [`tours/ramayana/sacred-ramayana-heritage-trail/index.html`](tours/ramayana/sacred-ramayana-heritage-trail/index.html) | `289` | `155` | `134` | `53.6%` | 🟡 Partial (40-75%) |
| [`tours/honeymoon/index.html`](tours/honeymoon/index.html) | `291` | `158` | `133` | `54.3%` | 🟡 Partial (40-75%) |
| [`tours/adventure/index.html`](tours/adventure/index.html) | `287` | `155` | `132` | `54.0%` | 🟡 Partial (40-75%) |
| [`tours/golf/index.html`](tours/golf/index.html) | `288` | `156` | `132` | `54.2%` | 🟡 Partial (40-75%) |
| [`tours/buddhist-heritage/forest-hermitages-mindful-ceylon/index.html`](tours/buddhist-heritage/forest-hermitages-mindful-ceylon/index.html) | `284` | `158` | `126` | `55.6%` | 🟡 Partial (40-75%) |
| [`tours/buddhist-heritage/the-sacred-bodhi-ancient-kingdoms/index.html`](tours/buddhist-heritage/the-sacred-bodhi-ancient-kingdoms/index.html) | `284` | `158` | `126` | `55.6%` | 🟡 Partial (40-75%) |
| [`tours/buddhist-heritage/the-sacred-tooth-monastic-sanctuaries/index.html`](tours/buddhist-heritage/the-sacred-tooth-monastic-sanctuaries/index.html) | `284` | `158` | `126` | `55.6%` | 🟡 Partial (40-75%) |
| [`tours/cultural/royal-kingdoms-sacred-temples/index.html`](tours/cultural/royal-kingdoms-sacred-temples/index.html) | `284` | `158` | `126` | `55.6%` | 🟡 Partial (40-75%) |
| [`tours/ayurvedic/index.html`](tours/ayurvedic/index.html) | `266` | `145` | `121` | `54.5%` | 🟡 Partial (40-75%) |
| [`gallery.html`](gallery.html) | `249` | `143` | `106` | `57.4%` | 🟡 Partial (40-75%) |
| [`index.html`](index.html) | `383` | `277` | `106` | `72.3%` | 🟡 Partial (40-75%) |
| [`blog.html`](blog.html) | `175` | `72` | `103` | `41.1%` | 🟡 Partial (40-75%) |
| [`contact.html`](contact.html) | `199` | `102` | `97` | `51.3%` | 🟡 Partial (40-75%) |
| [`about.html`](about.html) | `246` | `151` | `95` | `61.4%` | 🟡 Partial (40-75%) |
| [`blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html`](blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html) | `164` | `70` | `94` | `42.7%` | 🟡 Partial (40-75%) |
| [`blog/living-healing-traditional-ceylon-ayurveda/index.html`](blog/living-healing-traditional-ceylon-ayurveda/index.html) | `163` | `70` | `93` | `42.9%` | 🟡 Partial (40-75%) |
| [`experiences.html`](experiences.html) | `231` | `139` | `92` | `60.2%` | 🟡 Partial (40-75%) |
| [`blog/growing-a-greener-future-volunteer-reforestation-sinharaja/index.html`](blog/growing-a-greener-future-volunteer-reforestation-sinharaja/index.html) | `161` | `70` | `91` | `43.5%` | 🟡 Partial (40-75%) |
| [`blog/the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya/index.html`](blog/the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya/index.html) | `161` | `70` | `91` | `43.5%` | 🟡 Partial (40-75%) |
| [`inquiry-detailed.html`](inquiry-detailed.html) | `179` | `89` | `90` | `49.7%` | 🟡 Partial (40-75%) |
| [`inquiry-quick.html`](inquiry-quick.html) | `174` | `87` | `87` | `50.0%` | 🟡 Partial (40-75%) |
| [`reviews.html`](reviews.html) | `173` | `86` | `87` | `49.7%` | 🟡 Partial (40-75%) |
| [`tours/buddhist-heritage/index.html`](tours/buddhist-heritage/index.html) | `197` | `110` | `87` | `55.8%` | 🟡 Partial (40-75%) |
| [`cancellation-policy.html`](cancellation-policy.html) | `178` | `92` | `86` | `51.7%` | 🟡 Partial (40-75%) |
| [`destinations.html`](destinations.html) | `272` | `186` | `86` | `68.4%` | 🟡 Partial (40-75%) |
| [`privacy-policy.html`](privacy-policy.html) | `183` | `97` | `86` | `53.0%` | 🟡 Partial (40-75%) |
| [`terms-conditions.html`](terms-conditions.html) | `177` | `91` | `86` | `51.4%` | 🟡 Partial (40-75%) |
| [`tours/index.html`](tours/index.html) | `350` | `264` | `86` | `75.4%` | 🟢 High (>75%) |
| [`cookie-policy.html`](cookie-policy.html) | `172` | `87` | `85` | `50.6%` | 🟡 Partial (40-75%) |
| [`destinations/anuradhapura/index.html`](destinations/anuradhapura/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/arugam-bay/index.html`](destinations/arugam-bay/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/bentota-beruwala/index.html`](destinations/bentota-beruwala/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/colombo-kelani-valley/index.html`](destinations/colombo-kelani-valley/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/dambulla/index.html`](destinations/dambulla/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/ella-demodara/index.html`](destinations/ella-demodara/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/galle-dutch-fort/index.html`](destinations/galle-dutch-fort/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/haputale-lipton-s-seat/index.html`](destinations/haputale-lipton-s-seat/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/horton-plains-world-s-end/index.html`](destinations/horton-plains-world-s-end/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/kandy/index.html`](destinations/kandy/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/kataragama/index.html`](destinations/kataragama/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/kelaniya/index.html`](destinations/kelaniya/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/mihintale/index.html`](destinations/mihintale/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/minneriya-national-park/index.html`](destinations/minneriya-national-park/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/mirissa-weligama/index.html`](destinations/mirissa-weligama/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/negombo-beach-lagoon/index.html`](destinations/negombo-beach-lagoon/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/nuwara-eliya/index.html`](destinations/nuwara-eliya/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/polonnaruwa/index.html`](destinations/polonnaruwa/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/sigiriya-rock-citadel/index.html`](destinations/sigiriya-rock-citadel/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/sri-pada/index.html`](destinations/sri-pada/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/trincomalee-nilaveli/index.html`](destinations/trincomalee-nilaveli/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/udawalawe-national-park/index.html`](destinations/udawalawe-national-park/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/wilpattu-national-park/index.html`](destinations/wilpattu-national-park/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
| [`destinations/yala-national-park/index.html`](destinations/yala-national-park/index.html) | `161` | `84` | `77` | `52.2%` | 🟡 Partial (40-75%) |
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
- **Coverage**: `181 / 384` elements bound (`47.1%`) | **Hard-Coded**: `203` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (123 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 16 Nights / 17 DaysSri Lanka Wildlife Sa`
- `Badge: Day 1`
- `Badge: 🏨`
- `Badge: 🍽️Breakfast & Gourmet Dinner`
- `Badge: 🍽️`
- *... and 115 more*

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


### [`tours/wildlife/wild-ceylon-predator-elephant-trail/index.html`](tours/wildlife/wild-ceylon-predator-elephant-trail/index.html)
- **Coverage**: `181 / 384` elements bound (`47.1%`) | **Hard-Coded**: `203` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (123 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 16 Nights / 17 DaysSri Lanka Wildlife Sa`
- `Badge: Day 1`
- `Badge: 🏨`
- `Badge: 🍽️Breakfast & Gourmet Dinner`
- `Badge: 🍽️`
- *... and 115 more*

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
- **Coverage**: `177 / 366` elements bound (`48.4%`) | **Hard-Coded**: `189` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (109 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 14 Nights / 15 DaysSri Lanka Cultural To`
- `Badge: Day 1`
- `Badge: 🏨`
- `Badge: 🍽️Breakfast & Gourmet Dinner`
- `Badge: 🍽️`
- *... and 101 more*

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


### [`tours/beach/index.html`](tours/beach/index.html)
- **Coverage**: `236 / 423` elements bound (`55.8%`) | **Hard-Coded**: `187` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (28 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 20 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Table Cell (100 hard-coded):**
- `<th> Destinations & Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 92 more*

**Badge / Tag (4 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 🌸PURE JOURNEYS • TROPICAL COASTAL ESCAPE`

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


### [`tours/cultural/index.html`](tours/cultural/index.html)
- **Coverage**: `225 / 412` elements bound (`54.6%`) | **Hard-Coded**: `187` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (28 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 20 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Table Cell (100 hard-coded):**
- `<th> Destinations & Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 92 more*

**Badge / Tag (4 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 🏛️SACRED KINGDOMS • UNESCO LIVING HERITA`

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


### [`tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html`](tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html)
- **Coverage**: `169 / 352` elements bound (`48.0%`) | **Hard-Coded**: `183` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (102 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 13 Nights / 14 DaysSri Lanka Ayurvedic &`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner Included`
- `Badge: 🍽️`
- *... and 94 more*

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


### [`tours/family/the-grand-ceylon-family-adventure/index.html`](tours/family/the-grand-ceylon-family-adventure/index.html)
- **Coverage**: `173 / 356` elements bound (`48.6%`) | **Hard-Coded**: `183` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (102 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 13 Nights / 14 DaysSri Lanka Family Holi`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner Included`
- `Badge: 🍽️`
- *... and 94 more*

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


### [`tours/beach/pristine-seaboard-odyssey/index.html`](tours/beach/pristine-seaboard-odyssey/index.html)
- **Coverage**: `175 / 357` elements bound (`49.0%`) | **Hard-Coded**: `182` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (102 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 13 Nights / 14 DaysSri Lanka Luxury Beac`
- `Badge: Day 1`
- `Badge: 🏨`
- `Badge: 🍽️Breakfast & Gourmet Dinner`
- `Badge: 🍽️`
- *... and 94 more*

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


### [`tours/wildlife/index.html`](tours/wildlife/index.html)
- **Coverage**: `232 / 414` elements bound (`56.0%`) | **Hard-Coded**: `182` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (28 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 20 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Table Cell (95 hard-coded):**
- `<th> Destinations & Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 87 more*

**Badge / Tag (4 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 🐆ASIA’S APEX WILDLIFE • THE BIG FIVE SAN`

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


### [`tours/wildlife/the-sri-lanka-big-five-expedition/index.html`](tours/wildlife/the-sri-lanka-big-five-expedition/index.html)
- **Coverage**: `175 / 357` elements bound (`49.0%`) | **Hard-Coded**: `182` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (102 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 13 Nights / 14 DaysSri Lanka Wildlife Sa`
- `Badge: Day 1`
- `Badge: 🏨`
- `Badge: 🍽️Breakfast & Gourmet Dinner`
- `Badge: 🍽️`
- *... and 94 more*

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


### [`tours/family/index.html`](tours/family/index.html)
- **Coverage**: `188 / 362` elements bound (`51.9%`) | **Hard-Coded**: `174` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Table Cell (92 hard-coded):**
- `<th> Destinations & Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<th> Negombo`
- `<td> ✓`
- *... and 84 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

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


### [`tours/family/wild-safari-coastal-family-holiday/index.html`](tours/family/wild-safari-coastal-family-holiday/index.html)
- **Coverage**: `169 / 338` elements bound (`50.0%`) | **Hard-Coded**: `169` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (88 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 11 Nights / 12 DaysSri Lanka Family Holi`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner Included`
- `Badge: 🍽️`
- *... and 80 more*

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


### [`tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html`](tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html)
- **Coverage**: `169 / 338` elements bound (`50.0%`) | **Hard-Coded**: `169` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (88 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 11 Nights / 12 DaysSri Lanka Golf Holida`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner & Welcome Cocktails`
- `Badge: 🍽️`
- *... and 80 more*

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


### [`tours/hill-country/highland-wilderness-cascading-waterfalls/index.html`](tours/hill-country/highland-wilderness-cascading-waterfalls/index.html)
- **Coverage**: `169 / 338` elements bound (`50.0%`) | **Hard-Coded**: `169` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (88 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 11 Nights / 12 DaysSri Lanka Hill Countr`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner Included`
- `Badge: 🍽️`
- *... and 80 more*

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
- **Coverage**: `166 / 335` elements bound (`49.6%`) | **Hard-Coded**: `169` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (88 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 11 Nights / 12 DaysSri Lanka Luxury Hone`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner & Champagne`
- `Badge: 🍽️`
- *... and 80 more*

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


### [`tours/beach/turquoise-eastern-sanctuary/index.html`](tours/beach/turquoise-eastern-sanctuary/index.html)
- **Coverage**: `171 / 339` elements bound (`50.4%`) | **Hard-Coded**: `168` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (88 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 11 Nights / 12 DaysSri Lanka Luxury Beac`
- `Badge: Day 1`
- `Badge: 🏨`
- `Badge: 🍽️Breakfast & Gourmet Dinner`
- `Badge: 🍽️`
- *... and 80 more*

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


### [`tours/adventure/wild-peaks-trails-surf-safari/index.html`](tours/adventure/wild-peaks-trails-surf-safari/index.html)
- **Coverage**: `163 / 325` elements bound (`50.2%`) | **Hard-Coded**: `162` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (81 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 10 Nights / 11 DaysSri Lanka Adventure &`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner Included`
- `Badge: 🍽️`
- *... and 73 more*

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


### [`tours/hill-country/index.html`](tours/hill-country/index.html)
- **Coverage**: `176 / 338` elements bound (`52.1%`) | **Hard-Coded**: `162` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Table Cell (80 hard-coded):**
- `<th> Destinations & Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 72 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Hill Country & Tea Country Tou'`
- `meta[og:description]='Escape to the cool emerald highlands of '`
- `meta[og:url]='https://lotusceylon.com/tours/hill-count'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Hill Country & Tea Country Tou'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/family/island-wonder-multi-gen-family-discovery/index.html`](tours/family/island-wonder-multi-gen-family-discovery/index.html)
- **Coverage**: `165 / 320` elements bound (`51.6%`) | **Hard-Coded**: `155` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (74 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 9 Nights / 10 DaysSri Lanka Family Holid`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner Included`
- `Badge: 🍽️`
- *... and 66 more*

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


### [`tours/golf/highland-greens-coastal-links-championship/index.html`](tours/golf/highland-greens-coastal-links-championship/index.html)
- **Coverage**: `165 / 320` elements bound (`51.6%`) | **Hard-Coded**: `155` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (74 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 9 Nights / 10 DaysSri Lanka Golf Holiday`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner Included`
- `Badge: 🍽️`
- *... and 66 more*

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


### [`tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html`](tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html)
- **Coverage**: `161 / 316` elements bound (`50.9%`) | **Hard-Coded**: `155` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (74 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 9 Nights / 10 DaysSri Lanka Ramayana Her`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Vegetarian Dinner`
- `Badge: 🍽️`
- *... and 66 more*

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


### [`tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html`](tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html)
- **Coverage**: `163 / 317` elements bound (`51.4%`) | **Hard-Coded**: `154` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (74 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 9 Nights / 10 DaysSri Lanka Ayurvedic &`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Sattvic Dinner`
- `Badge: 🍽️`
- *... and 66 more*

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


### [`tours/hill-country/misty-peaks-scenic-railways-expedition/index.html`](tours/hill-country/misty-peaks-scenic-railways-expedition/index.html)
- **Coverage**: `167 / 321` elements bound (`52.0%`) | **Hard-Coded**: `154` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (74 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 9 Nights / 10 DaysSri Lanka Hill Country`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner Included`
- `Badge: 🍽️`
- *... and 66 more*

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


### [`tours/beach/southern-sands-serenade/index.html`](tours/beach/southern-sands-serenade/index.html)
- **Coverage**: `169 / 322` elements bound (`52.5%`) | **Hard-Coded**: `153` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (73 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 9 Nights / 10 DaysSri Lanka Luxury Beach`
- `Badge: 🏨`
- `Badge: 🍽️Breakfast & Gourmet Dinner`
- `Badge: 🍽️`
- `Badge: 🚗`
- *... and 65 more*

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


### [`tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html`](tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html)
- **Coverage**: `160 / 308` elements bound (`51.9%`) | **Hard-Coded**: `148` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (67 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 8 Nights / 9 DaysSri Lanka Luxury Honeym`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner & Welcome Champagne`
- `Badge: 🍽️`
- *... and 59 more*

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


### [`tours/cultural/the-sacred-lotus-triangle/index.html`](tours/cultural/the-sacred-lotus-triangle/index.html)
- **Coverage**: `164 / 311` elements bound (`52.7%`) | **Hard-Coded**: `147` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (67 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 8 Nights / 9 DaysSri Lanka Cultural Tour`
- `Badge: Day 1`
- `Badge: 🏨`
- `Badge: 🍽️Breakfast & Gourmet Dinner`
- `Badge: 🍽️`
- *... and 59 more*

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


### [`tours/adventure/island-adrenaline-rapids-expedition/index.html`](tours/adventure/island-adrenaline-rapids-expedition/index.html)
- **Coverage**: `157 / 298` elements bound (`52.7%`) | **Hard-Coded**: `141` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (60 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 7 Nights / 8 DaysSri Lanka Adventure & A`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner Included`
- `Badge: 🍽️`
- *... and 52 more*

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


### [`tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html`](tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html)
- **Coverage**: `165 / 305` elements bound (`54.1%`) | **Hard-Coded**: `140` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (60 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 7 Nights / 8 DaysSri Lanka Hill Country`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner Included`
- `Badge: 🍽️`
- *... and 52 more*

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


### [`tours/ramayana/index.html`](tours/ramayana/index.html)
- **Coverage**: `153 / 288` elements bound (`53.1%`) | **Hard-Coded**: `135` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Table Cell (53 hard-coded):**
- `<th> Destinations & Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 45 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

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


### [`tours/golf/the-royal-ceylon-fairways-tour/index.html`](tours/golf/the-royal-ceylon-fairways-tour/index.html)
- **Coverage**: `159 / 293` elements bound (`54.3%`) | **Hard-Coded**: `134` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (53 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 6 Nights / 7 DaysSri Lanka Golf Holidays`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner Included`
- `Badge: 🍽️`
- *... and 45 more*

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


### [`tours/ramayana/sacred-ramayana-heritage-trail/index.html`](tours/ramayana/sacred-ramayana-heritage-trail/index.html)
- **Coverage**: `155 / 289` elements bound (`53.6%`) | **Hard-Coded**: `134` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**List Item (1 hard-coded):**
- `✕Visas`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (53 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 6 Nights / 7 DaysSri Lanka Ramayana Heri`
- `Badge: Day 01`
- `Badge: 🏨`
- `Badge: 🍽️Dinner Included`
- `Badge: 🍽️`
- *... and 45 more*

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


### [`tours/honeymoon/index.html`](tours/honeymoon/index.html)
- **Coverage**: `158 / 291` elements bound (`54.3%`) | **Hard-Coded**: `133` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Table Cell (51 hard-coded):**
- `<th> Destinations & Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<th> Negombo`
- `<td> ✓`
- *... and 43 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

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


### [`tours/adventure/index.html`](tours/adventure/index.html)
- **Coverage**: `155 / 287` elements bound (`54.0%`) | **Hard-Coded**: `132` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Table Cell (50 hard-coded):**
- `<th> Destinations & Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<th> Negombo`
- `<td> ✓`
- *... and 42 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Adventure & Active Expeditions'`
- `meta[og:description]='Challenge your spirit across raw, untame'`
- `meta[og:url]='https://lotusceylon.com/tours/adventure/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Adventure & Active Expeditions'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/golf/index.html`](tours/golf/index.html)
- **Coverage**: `156 / 288` elements bound (`54.2%`) | **Hard-Coded**: `132` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Table Cell (50 hard-coded):**
- `<th> Destinations & Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 42 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Golf Holidays & Championship T'`
- `meta[og:description]='Tee off across Asia’s most scenic and hi'`
- `meta[og:url]='https://lotusceylon.com/tours/golf/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Golf Holidays & Championship T'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/buddhist-heritage/forest-hermitages-mindful-ceylon/index.html`](tours/buddhist-heritage/forest-hermitages-mindful-ceylon/index.html)
- **Coverage**: `158 / 284` elements bound (`55.6%`) | **Hard-Coded**: `126` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (46 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 5 Nights / 6 DaysSri Lanka Cultural Tour`
- `Badge: Day 1`
- `Badge: 🏨`
- `Badge: 🍽️Breakfast & Gourmet Dinner`
- `Badge: 🍽️`
- *... and 38 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Forest Hermitages & Mindful Ceylon | Lot'`
- `meta[og:description]='Explore Sri Lanka's cultural highlights '`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Forest Hermitages & Mindful Ceylon | Lot'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/buddhist-heritage/the-sacred-bodhi-ancient-kingdoms/index.html`](tours/buddhist-heritage/the-sacred-bodhi-ancient-kingdoms/index.html)
- **Coverage**: `158 / 284` elements bound (`55.6%`) | **Hard-Coded**: `126` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (46 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 5 Nights / 6 DaysSri Lanka Cultural Tour`
- `Badge: Day 1`
- `Badge: 🏨`
- `Badge: 🍽️Breakfast & Gourmet Dinner`
- `Badge: 🍽️`
- *... and 38 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='The Sacred Bodhi & Ancient Kingdoms | Lo'`
- `meta[og:description]='Explore Sri Lanka's cultural highlights '`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='The Sacred Bodhi & Ancient Kingdoms | Lo'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/buddhist-heritage/the-sacred-tooth-monastic-sanctuaries/index.html`](tours/buddhist-heritage/the-sacred-tooth-monastic-sanctuaries/index.html)
- **Coverage**: `158 / 284` elements bound (`55.6%`) | **Hard-Coded**: `126` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (46 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 5 Nights / 6 DaysSri Lanka Cultural Tour`
- `Badge: Day 1`
- `Badge: 🏨`
- `Badge: 🍽️Breakfast & Gourmet Dinner`
- `Badge: 🍽️`
- *... and 38 more*

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='The Sacred Tooth & Monastic Sanctuaries '`
- `meta[og:description]='Explore Sri Lanka's cultural highlights '`
- `meta[og:url]='https://kanchu12345.github.io/thai/tours'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='The Sacred Tooth & Monastic Sanctuaries '`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/cultural/royal-kingdoms-sacred-temples/index.html`](tours/cultural/royal-kingdoms-sacred-temples/index.html)
- **Coverage**: `158 / 284` elements bound (`55.6%`) | **Hard-Coded**: `126` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Price...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (46 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 5 Nights / 6 DaysSri Lanka Cultural Tour`
- `Badge: Day 1`
- `Badge: 🏨`
- `Badge: 🍽️Breakfast & Gourmet Dinner`
- `Badge: 🍽️`
- *... and 38 more*

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


### [`tours/ayurvedic/index.html`](tours/ayurvedic/index.html)
- **Coverage**: `145 / 266` elements bound (`54.5%`) | **Hard-Coded**: `121` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Table Cell (39 hard-coded):**
- `<th> Destinations & Key Sights`
- `<th> Colombo`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- `<td> ✓`
- *... and 31 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Ayurvedic & Holistic Wellness '`
- `meta[og:description]='Restore harmony of body, mind, and spiri'`
- `meta[og:url]='https://lotusceylon.com/tours/ayurvedic/'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Ayurvedic & Holistic Wellness '`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`gallery.html`](gallery.html)
- **Coverage**: `143 / 249` elements bound (`57.4%`) | **Hard-Coded**: `106` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (27 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 19 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 33 more*

**Image (1 hard-coded):**
- `src='' alt='Enlarged Visual'`

**Badge / Tag (22 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: ☸✦ SACRED CEYLON VISUAL CHRONICLES ✦☸`
- `Badge: 🔍`
- `Badge: 🔍`
- `Badge: 🔍`
- `Badge: 🔍`
- *... and 14 more*

**Meta Tag (13 hard-coded):**
- `<title> Sri Lanka Visual Chronicles & Photo Gallery | Lotu`
- `meta[description]='Journey through breathtaking imagery of '`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Visual Chronicles & Photo Gall'`
- `meta[og:description]='Journey through breathtaking imagery of '`
- `meta[og:url]='https://lotusceylon.com/gallery.html'`
- `meta[og:image]='https://lotusceylon.com/assets/images/he'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`index.html`](index.html)
- **Coverage**: `277 / 383` elements bound (`72.3%`) | **Hard-Coded**: `106` elements

**Paragraph (4 hard-coded):**
- `Select Language...`
- `12+...`
- `10+...`
- `100%...`

**Button (28 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 20 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 33 more*

**Stat / Counter (7 hard-coded):**
- `Stat: 12+Years of Inbound Excellence`
- `Stat: 12+Years of Inbound Excellence`
- `Stat: 12+`
- `Stat: 10+Global Country Representati`
- `Stat: 10+`
- `Stat: 100%Tailor-Made Private Itiner`
- `Stat: 100%`

**Badge / Tag (12 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: Lotus Blossom SanctuariesSacred Waters o`
- `Badge: Lotus Blossom SanctuariesSacred Waters o`
- `Badge: Lotus Blossom Sanctuaries`
- `Badge: Sacred Waters of Ceylon`
- `Badge: Wild & Pristine`
- *... and 4 more*

**Meta Tag (13 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sri Lanka Tours | Lotus Ceylon Luxury Ho'`
- `meta[og:description]='Welcome to Lotus Ceylon, Sri Lanka's pre'`
- `meta[og:url]='https://lotusceylon.com/'`
- `meta[og:image]='https://lotusceylon.com/assets/images/he'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Sri Lanka Tours | Lotus Ceylon Luxury Ho'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`blog.html`](blog.html)
- **Coverage**: `72 / 175` elements bound (`41.1%`) | **Hard-Coded**: `103` elements

**Heading (4 hard-coded):**
- `<h3> Sacred Footsteps: Unlocking Sri Lanka's Ancient Buddhist Kingdoms`
- `<h3> The Great Gathering: Watching Hundreds of Wild Elephants at Minneriya`
- `<h3> Growing a Greener Future: Volunteer Reforestation in the Sinharaja Can`
- `<h3> Living Healing: The Ancient Art and Science of Traditional Ceylon Ayur`

**Paragraph (5 hard-coded):**
- `Select Language...`
- `From the colossal brick stupas of Anuradhapura to the cloud fortress o...`
- `Ranked among the world's greatest wildlife spectacles by Lonely Planet...`
- `Explore how Lotus Ceylon supports rainforest buffer zone conservation ...`
- `Discover how Sri Lanka's unique Deshiya Chikitsa indigenous medicine i...`

**Button (25 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 17 more*

**Link (53 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 45 more*

**Image (4 hard-coded):**
- `src='assets/images/cultural/sigiriya-1.webp' alt='Sacred Footsteps: Unlocking Sr'`
- `src='assets/images/wildlife/minneriya-elephant-gathering-2.webp' alt='The Great Gathering: Watching '`
- `src='assets/images/wildlife/sinharaja-rainforest-5.webp' alt='Growing a Greener Future: Volu'`
- `src='assets/images/ayurveda/herbal-treatment-1.webp' alt='Living Healing: The Ancient Ar'`

**Badge / Tag (4 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 🌸✦ EDITORIAL & CEYLON STORIES ✦🌸`

**Meta Tag (8 hard-coded):**
- `<title> Lotus Ceylon Travel Journal & Editorial Insights |`
- `meta[description]='Immerse in curated travel stories, pilgr'`
- `meta[og:title]='Lotus Ceylon Travel Journal & Editorial '`
- `meta[og:description]='Immerse in curated travel stories, pilgr'`
- `meta[og:image]='./assets/images/cultural/sigiriya-1.webp'`
- `meta[og:url]='https://lotusceylon.com/blog.html'`
- `meta[twitter:card]='summary_large_image'`
- `canonical='https://lotusceylon.com/blog.html'`


### [`contact.html`](contact.html)
- **Coverage**: `102 / 199` elements bound (`51.3%`) | **Hard-Coded**: `97` elements

**Heading (1 hard-coded):**
- `<h3> Scan QR Code`

**Paragraph (2 hard-coded):**
- `Select Language...`
- `24/7 assistance for travellers currently on tour...`

**Button (27 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 19 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 33 more*

**Image (4 hard-coded):**
- `src='assets/qr/whatsapp-qr.png' alt='Scan WhatsApp QR Code - Lotus '`
- `src='assets/qr/wechat-qr.png' alt='Scan WeChat QR Code - Lotus Ce'`
- `src='assets/qr/line-qr.png' alt='Scan LINE QR Code - Lotus Ceyl'`
- `src='' alt='Enlarged QR Code'`

**Badge / Tag (8 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 💬 WhatsApp🌿 WeChat: FGUTaiwan90🟢 LINE: d`
- `Badge: 💬 WhatsApp`
- `Badge: 💬 WhatsApp`
- `Badge: 🌿 WeChat`
- `Badge: 🟢 LINE`

**Meta Tag (13 hard-coded):**
- `<title> Contact Lotus Ceylon | Island Headquarters & Direc`
- `meta[description]='Reach Lotus Ceylon International Tours &'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Contact Lotus Ceylon | Island Headquarte'`
- `meta[og:description]='Reach Lotus Ceylon International Tours &'`
- `meta[og:url]='https://kanchu12345.github.io/thai/conta'`
- `meta[og:image]='https://kanchu12345.github.io/thai/asset'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`about.html`](about.html)
- **Coverage**: `151 / 246` elements bound (`61.4%`) | **Hard-Coded**: `95` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 33 more*

**Badge / Tag (12 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 🌸Pure Journeys • Sacred Experiences✦`
- `Badge: 01Sacred & Spiritual RespectWe provide s`
- `Badge: 01`
- `Badge: 02Unrivaled PersonalizationNo rigid grou`
- `Badge: 02`
- *... and 4 more*

**Meta Tag (14 hard-coded):**
- `<title> About Lotus Ceylon | Pure Journeys & Sacred Experi`
- `meta[description]='Discover Lotus Ceylon International Tour'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='About Lotus Ceylon | Pure Journeys & Sac'`
- `meta[og:description]='Discover Lotus Ceylon International Tour'`
- `meta[og:url]='https://lotusceylon.com/about.html'`
- `meta[og:image]='https://lotusceylon.com/assets/images/ab'`
- *... and 6 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html`](blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html)
- **Coverage**: `70 / 164` elements bound (`42.7%`) | **Hard-Coded**: `94` elements

**Heading (4 hard-coded):**
- `<h1> Sacred Footsteps: Unlocking Sri Lanka's Ancient Buddhist Kingdoms`
- `<h2> The Sacred Cities of the Northern Plains`
- `<h2> Polonnaruwa and the Living Rock of Gal Vihara`
- `<h2> The Temple of the Sacred Tooth Relic in Kandy`

**Paragraph (7 hard-coded):**
- `Select Language...`
- `ByLotus Ceylon Editorial Team...`
- `Sri Lanka is more than an emerald teardrop in the Indian Ocean; it is ...`
- `In Anuradhapura, the ancient capital founded in the 4th century BCE, c...`
- `“Pilgrimage in Ceylon is not passive sightseeing; it is an intimate mi...`
- `In medieval Polonnaruwa, master sculptors transformed living granite i...`
- `Nestled in the mist-veiled central highlands beside Kandy Lake, Sri Da...`

**Button (25 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 17 more*

**Link (43 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 35 more*

**Image (1 hard-coded):**
- `src='../../assets/images/cultural/sigiriya-1.webp' alt='Sacred Footsteps: Unlocking Sr'`

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

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
- **Coverage**: `70 / 163` elements bound (`42.9%`) | **Hard-Coded**: `93` elements

**Heading (4 hard-coded):**
- `<h1> Living Healing: The Ancient Art and Science of Traditional Ceylon Ayur`
- `<h2> Pulse Diagnosis (Nadi Pariksha) with Resident Vaidyas`
- `<h2> Tailored Herbal Elixirs and Sacred Treatments`
- `<h2> Sanctuary for the Soul`

**Paragraph (6 hard-coded):**
- `Select Language...`
- `ByLotus Ayu Senior Practitioner...`
- `For more than 3,000 years, the island of Sri Lanka has nurtured one of...`
- `Every healing journey begins with a private diagnostic consultation by...`
- `Treatments are prescribed individually using freshly prepared organic ...`
- `Set within private coastal coconut groves in Bentota and secluded rive...`

**Button (25 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 17 more*

**Link (43 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 35 more*

**Image (1 hard-coded):**
- `src='../../assets/images/ayurveda/herbal-treatment-1.webp' alt='Living Healing: The Ancient Ar'`

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

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


### [`experiences.html`](experiences.html)
- **Coverage**: `139 / 231` elements bound (`60.2%`) | **Hard-Coded**: `92` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 33 more*

**Badge / Tag (10 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 🌸✦ CURATED ENCOUNTERS & SIGNATURE BRANDS`
- `Badge: 🏛️Artisan & Cultural HeritageLotus Artis`
- `Badge: 🏛️Artisan & Cultural HeritageLotus Artis`
- `Badge: 🌿Ayurveda & HealingLotus Ayu WellnessRoo`
- `Badge: 🌿Ayurveda & HealingLotus Ayu WellnessRoo`
- *... and 2 more*

**Meta Tag (13 hard-coded):**
- `<title> Sacred & Bespoke Ceylon Experiences | Lotus Ceylon`
- `meta[description]='Discover Lotus Ceylon's signature travel'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Sacred & Bespoke Ceylon Experiences | Lo'`
- `meta[og:description]='Immerse yourself in authentic Sri Lankan'`
- `meta[og:url]='https://lotusceylon.com/experiences.html'`
- `meta[og:image]='https://lotusceylon.com/assets/images/wi'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`blog/growing-a-greener-future-volunteer-reforestation-sinharaja/index.html`](blog/growing-a-greener-future-volunteer-reforestation-sinharaja/index.html)
- **Coverage**: `70 / 161` elements bound (`43.5%`) | **Hard-Coded**: `91` elements

**Heading (3 hard-coded):**
- `<h1> Growing a Greener Future: Volunteer Reforestation in the Sinharaja Can`
- `<h2> The Buffer Zone Protection Initiative`
- `<h2> Silent Walks Through Living Evolution`

**Paragraph (5 hard-coded):**
- `Select Language...`
- `ByLotus Ceylon Conservation Desk...`
- `As Sri Lanka's last viable area of primary tropical rainforest, the Si...`
- `Through our responsible travel charter, Lotus Ceylon contributes direc...`
- `Trekking under Sinharaja's dense emerald canopy is a transformative se...`

**Button (25 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 17 more*

**Link (43 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 35 more*

**Image (1 hard-coded):**
- `src='../../assets/images/wildlife/sinharaja-rainforest-5.webp' alt='Growing a Greener Future: Volu'`

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

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
- **Coverage**: `70 / 161` elements bound (`43.5%`) | **Hard-Coded**: `91` elements

**Heading (3 hard-coded):**
- `<h1> The Great Gathering: Watching Hundreds of Wild Elephants at Minneriya`
- `<h2> The Ancient Reservoir That Sustains Generations`
- `<h2> Ethical Safaris with Lotus Ceylon Chauffeurs`

**Paragraph (5 hard-coded):**
- `Select Language...`
- `ByLotus Ceylon Wildlife Naturalist...`
- `Every year during the dry season from July through October, nature orc...`
- `Built by King Mahasen in the 3rd century CE, the ancient Minneriya tan...`
- `Lotus Ceylon adheres strictly to ethical wildlife protocols. Our custo...`

**Button (25 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 17 more*

**Link (43 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 35 more*

**Image (1 hard-coded):**
- `src='../../assets/images/wildlife/minneriya-elephant-gathering-2.webp' alt='The Great Gathering: Watching '`

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

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
- **Coverage**: `89 / 179` elements bound (`49.7%`) | **Hard-Coded**: `90` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (27 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 19 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 33 more*

**Stat / Counter (1 hard-coded):**
- `Stat: 0 / 1000`

**Badge / Tag (5 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: Bespoke Ceylon Travel`
- `Badge: Total travellers2`

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


### [`inquiry-quick.html`](inquiry-quick.html)
- **Coverage**: `87 / 174` elements bound (`50.0%`) | **Hard-Coded**: `87` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (27 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 19 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 33 more*

**Badge / Tag (4 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: Express Travel Coordination`

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
- **Coverage**: `86 / 173` elements bound (`49.7%`) | **Hard-Coded**: `87` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (27 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 19 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 33 more*

**Badge / Tag (4 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: ☸✦ DISCERNING TRAVELER REFLECTIONS ✦☸`

**Meta Tag (13 hard-coded):**
- `<title> Guest Testimonials & Reviews | Lotus Ceylon Luxury`
- `meta[description]='Read Guest Stories and authentic travel '`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Guest Testimonials & Reviews | Lotus Cey'`
- `meta[og:description]='Read Guest Stories and authentic travel '`
- `meta[og:url]='https://lotusceylon.com/reviews.html'`
- `meta[og:image]='https://lotusceylon.com/assets/images/ab'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/buddhist-heritage/index.html`](tours/buddhist-heritage/index.html)
- **Coverage**: `110 / 197` elements bound (`55.8%`) | **Hard-Coded**: `87` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (44 hard-coded):**
- `href='#siteHeader' [Skip to main content]`
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 36 more*

**Badge / Tag (4 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: SACRED DHAMMA PILGRIMAGES`

**Meta Tag (11 hard-coded):**
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Buddhist Heritage & Sacred Pilgrimages |'`
- `meta[og:description]='Embark on transformative Buddhist pilgri'`
- `meta[og:url]='https://lotusceylon.com/tours/buddhist-h'`
- `meta[og:image]='https://lotusceylon.com/assets/images/cu'`
- `meta[twitter:card]='summary_large_image'`
- `meta[twitter:title]='Buddhist Heritage & Sacred Pilgrimages |'`
- *... and 3 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`cancellation-policy.html`](cancellation-policy.html)
- **Coverage**: `92 / 178` elements bound (`51.7%`) | **Hard-Coded**: `86` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Last updated: November 2026...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 33 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (13 hard-coded):**
- `<title> Cancellation & Refund Policy | Lotus Ceylon Luxury`
- `meta[description]='Review Lotus Ceylon's fair cancellation '`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Cancellation & Refund Policy | Lotus Cey'`
- `meta[og:description]='Review Lotus Ceylon's fair cancellation '`
- `meta[og:url]='https://lotusceylon.com/cancellation-pol'`
- `meta[og:image]='https://lotusceylon.com/assets/images/he'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`destinations.html`](destinations.html)
- **Coverage**: `186 / 272` elements bound (`68.4%`) | **Hard-Coded**: `86` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 33 more*

**Badge / Tag (4 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`
- `Badge: 🌸✦ SACRED PILGRIMAGE & ICONIC WONDERS ✦🌸`

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
- **Coverage**: `97 / 183` elements bound (`53.0%`) | **Hard-Coded**: `86` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Last updated: November 2026...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 33 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

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
- **Coverage**: `91 / 177` elements bound (`51.4%`) | **Hard-Coded**: `86` elements

**Paragraph (2 hard-coded):**
- `Select Language...`
- `Last updated: November 2026...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 33 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (13 hard-coded):**
- `<title> Terms & Conditions | Lotus Ceylon Luxury Tours & S`
- `meta[description]='Official terms and booking conditions fo'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Terms & Conditions | Lotus Ceylon Luxury'`
- `meta[og:description]='Official terms and booking conditions fo'`
- `meta[og:url]='https://lotusceylon.com/terms-conditions'`
- `meta[og:image]='https://lotusceylon.com/assets/images/he'`
- *... and 5 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`tours/index.html`](tours/index.html)
- **Coverage**: `264 / 350` elements bound (`75.4%`) | **Hard-Coded**: `86` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (41 hard-coded):**
- `href='../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 33 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (14 hard-coded):**
- `<title> Sri Lanka Tour Packages & Luxury Tailor-Made Holid`
- `meta[description]='Discover 29 hand-crafted Sri Lanka tour '`
- `meta[keywords]='sri lanka tours, tour packages sri lanka'`
- `meta[og:type]='website'`
- `meta[og:site_name]='Lotus Ceylon International Tours'`
- `meta[og:title]='Curated Sri Lanka Tours & Holiday Packag'`
- `meta[og:description]='Discover bespoke private chauffeur-guide'`
- `meta[og:url]='https://lotusceylon.com/tours/index.html'`
- *... and 6 more*

**JSON-LD (1 hard-coded):**
- `JSON-LD Schema Script block`


### [`cookie-policy.html`](cookie-policy.html)
- **Coverage**: `87 / 172` elements bound (`50.6%`) | **Hard-Coded**: `85` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (41 hard-coded):**
- `href='#mainContent' [Skip to main content]`
- `href='./tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='./tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='./tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='./tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='./tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='./tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='./tours/honeymoon/index.html' [💍Honeymoon Romance]`
- *... and 33 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (13 hard-coded):**
- `<title> Cookie Policy | Lotus Ceylon International Tours &`
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


### [`destinations/anuradhapura/index.html`](destinations/anuradhapura/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Anuradhapura | Luxury Tours & Sacred Ceylon Journe`
- `meta[description]='Foundational Buddhist capital with tower'`
- `meta[og:title]='Anuradhapura - Lotus Ceylon'`
- `meta[og:description]='Foundational Buddhist capital with tower'`
- `meta[og:image]='../../assets/images/cultural/kandy-templ'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/anuradhapura/'`


### [`destinations/arugam-bay/index.html`](destinations/arugam-bay/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Arugam Bay | Luxury Tours & Sacred Ceylon Journeys`
- `meta[description]='World-class right-hand surf point, relax'`
- `meta[og:title]='Arugam Bay - Lotus Ceylon'`
- `meta[og:description]='World-class right-hand surf point, relax'`
- `meta[og:image]='../../assets/images/adventure/kitulgala-'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/arugam-bay/'`


### [`destinations/bentota-beruwala/index.html`](destinations/bentota-beruwala/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Bentota & Beruwala | Luxury Tours & Sacred Ceylon`
- `meta[description]='Sri Lanka's luxury coastal capital featu'`
- `meta[og:title]='Bentota & Beruwala - Lotus Ceylon'`
- `meta[og:description]='Sri Lanka's luxury coastal capital featu'`
- `meta[og:image]='../../assets/images/beach/mirissa-1.webp'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/bentota-beruwala/'`


### [`destinations/colombo-kelani-valley/index.html`](destinations/colombo-kelani-valley/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Colombo & Kelani Valley | Luxury Tours & Sacred Ce`
- `meta[description]='Vibrant commercial and cultural hub blen'`
- `meta[og:title]='Colombo & Kelani Valley - Lotus Ceylon'`
- `meta[og:description]='Vibrant commercial and cultural hub blen'`
- `meta[og:image]='../../assets/images/about/hospitality-sc'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/colombo-kelani-valley/'`


### [`destinations/dambulla/index.html`](destinations/dambulla/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Dambulla | Luxury Tours & Sacred Ceylon Journeys`
- `meta[description]='Magnificent UNESCO cave temple complex c'`
- `meta[og:title]='Dambulla - Lotus Ceylon'`
- `meta[og:description]='Magnificent UNESCO cave temple complex c'`
- `meta[og:image]='../../assets/images/cultural/polonnaruwa'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/dambulla/'`


### [`destinations/ella-demodara/index.html`](destinations/ella-demodara/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Ella & Demodara | Luxury Tours & Sacred Ceylon Jou`
- `meta[description]='Sri Lanka's beloved mountain village fam'`
- `meta[og:title]='Ella & Demodara - Lotus Ceylon'`
- `meta[og:description]='Sri Lanka's beloved mountain village fam'`
- `meta[og:image]='../../assets/images/hill-country/nine-ar'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/ella-demodara/'`


### [`destinations/galle-dutch-fort/index.html`](destinations/galle-dutch-fort/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Galle Dutch Fort | Luxury Tours & Sacred Ceylon Jo`
- `meta[description]='300-year-old living UNESCO seaside fort '`
- `meta[og:title]='Galle Dutch Fort - Lotus Ceylon'`
- `meta[og:description]='300-year-old living UNESCO seaside fort '`
- `meta[og:image]='../../assets/images/beach/mirissa-1.webp'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/galle-dutch-fort/'`


### [`destinations/haputale-lipton-s-seat/index.html`](destinations/haputale-lipton-s-seat/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Haputale & Lipton's Seat | Luxury Tours & Sacred C`
- `meta[description]='The dramatic cliffside viewpoint where S'`
- `meta[og:title]='Haputale & Lipton's Seat - Lotus Ceylon'`
- `meta[og:description]='The dramatic cliffside viewpoint where S'`
- `meta[og:image]='../../assets/images/hill-country/nuwara-'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/haputale-lipton-s-seat/'`


### [`destinations/horton-plains-world-s-end/index.html`](destinations/horton-plains-world-s-end/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Horton Plains & World's End | Luxury Tours & Sacre`
- `meta[description]='Dramatic cloud forest plateau at 2,100m '`
- `meta[og:title]='Horton Plains & World's End - Lotus Ceyl'`
- `meta[og:description]='Dramatic cloud forest plateau at 2,100m '`
- `meta[og:image]='../../assets/images/wildlife/sinharaja-r'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/horton-plains-world-s-end/'`


### [`destinations/kandy/index.html`](destinations/kandy/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Kandy (Temple of the Tooth) | Luxury Tours & Sacre`
- `meta[description]='The hill capital honoring Sri Dalada Mal'`
- `meta[og:title]='Kandy (Temple of the Tooth) - Lotus Ceyl'`
- `meta[og:description]='The hill capital honoring Sri Dalada Mal'`
- `meta[og:image]='../../assets/images/cultural/sigiriya-1.'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/kandy/'`


### [`destinations/kataragama/index.html`](destinations/kataragama/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Kataragama | Luxury Tours & Sacred Ceylon Journeys`
- `meta[description]='Sacred forest shrine complex venerated f'`
- `meta[og:title]='Kataragama - Lotus Ceylon'`
- `meta[og:description]='Sacred forest shrine complex venerated f'`
- `meta[og:image]='../../assets/images/cultural/sigiriya-1.'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/kataragama/'`


### [`destinations/kelaniya/index.html`](destinations/kelaniya/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Kelaniya | Luxury Tours & Sacred Ceylon Journeys`
- `meta[description]='Revered riverside temple near Colombo, s'`
- `meta[og:title]='Kelaniya - Lotus Ceylon'`
- `meta[og:description]='Revered riverside temple near Colombo, s'`
- `meta[og:image]='../../assets/tours/cultural/hero.jpg'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/kelaniya/'`


### [`destinations/mihintale/index.html`](destinations/mihintale/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Mihintale | Luxury Tours & Sacred Ceylon Journeys`
- `meta[description]='The venerated mountain sanctuary where A'`
- `meta[og:title]='Mihintale - Lotus Ceylon'`
- `meta[og:description]='The venerated mountain sanctuary where A'`
- `meta[og:image]='../../assets/images/cultural/dambulla-ca'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/mihintale/'`


### [`destinations/minneriya-national-park/index.html`](destinations/minneriya-national-park/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Minneriya National Park | Luxury Tours & Sacred Ce`
- `meta[description]='Site of 'The Gathering'—the world's larg'`
- `meta[og:title]='Minneriya National Park - Lotus Ceylon'`
- `meta[og:description]='Site of 'The Gathering'—the world's larg'`
- `meta[og:image]='../../assets/images/wildlife/minneriya-e'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/minneriya-national-park/'`


### [`destinations/mirissa-weligama/index.html`](destinations/mirissa-weligama/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Mirissa & Weligama | Luxury Tours & Sacred Ceylon`
- `meta[description]='Crescent golden beach world-renowned for'`
- `meta[og:title]='Mirissa & Weligama - Lotus Ceylon'`
- `meta[og:description]='Crescent golden beach world-renowned for'`
- `meta[og:image]='../../assets/images/honeymoon/mirissa-su'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/mirissa-weligama/'`


### [`destinations/negombo-beach-lagoon/index.html`](destinations/negombo-beach-lagoon/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Negombo Beach & Lagoon | Luxury Tours & Sacred Cey`
- `meta[description]='Convenient coastal starting haven locate'`
- `meta[og:title]='Negombo Beach & Lagoon - Lotus Ceylon'`
- `meta[og:description]='Convenient coastal starting haven locate'`
- `meta[og:image]='../../assets/tours/beach/hero.jpg'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/negombo-beach-lagoon/'`


### [`destinations/nuwara-eliya/index.html`](destinations/nuwara-eliya/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Nuwara Eliya ('Little England') | Luxury Tours & S`
- `meta[description]='Cool mountain retreat surrounded by roll'`
- `meta[og:title]='Nuwara Eliya ('Little England') - Lotus '`
- `meta[og:description]='Cool mountain retreat surrounded by roll'`
- `meta[og:image]='../../assets/images/hill-country/nuwara-'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/nuwara-eliya/'`


### [`destinations/polonnaruwa/index.html`](destinations/polonnaruwa/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Polonnaruwa | Luxury Tours & Sacred Ceylon Journey`
- `meta[description]='Medieval royal capital famed for the Gal'`
- `meta[og:title]='Polonnaruwa - Lotus Ceylon'`
- `meta[og:description]='Medieval royal capital famed for the Gal'`
- `meta[og:image]='../../assets/images/cultural/polonnaruwa'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/polonnaruwa/'`


### [`destinations/sigiriya-rock-citadel/index.html`](destinations/sigiriya-rock-citadel/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Sigiriya Rock Citadel | Luxury Tours & Sacred Ceyl`
- `meta[description]='The world-famous 'Lion Rock'—a 5th-centu'`
- `meta[og:title]='Sigiriya Rock Citadel - Lotus Ceylon'`
- `meta[og:description]='The world-famous 'Lion Rock'—a 5th-centu'`
- `meta[og:image]='../../assets/images/cultural/sigiriya-1.'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/sigiriya-rock-citadel/'`


### [`destinations/sri-pada/index.html`](destinations/sri-pada/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Sri Pada (Adam's Peak) | Luxury Tours & Sacred Cey`
- `meta[description]='The sacred 2,243m conical mountain crown'`
- `meta[og:title]='Sri Pada (Adam's Peak) - Lotus Ceylon'`
- `meta[og:description]='The sacred 2,243m conical mountain crown'`
- `meta[og:image]='../../assets/images/hill-country/nuwara-'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/sri-pada/'`


### [`destinations/trincomalee-nilaveli/index.html`](destinations/trincomalee-nilaveli/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Trincomalee & Nilaveli | Luxury Tours & Sacred Cey`
- `meta[description]='East coast sanctuary of powdery white sa'`
- `meta[og:title]='Trincomalee & Nilaveli - Lotus Ceylon'`
- `meta[og:description]='East coast sanctuary of powdery white sa'`
- `meta[og:image]='../../assets/images/beach/pasikudah-5.we'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/trincomalee-nilaveli/'`


### [`destinations/udawalawe-national-park/index.html`](destinations/udawalawe-national-park/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Udawalawe National Park | Luxury Tours & Sacred Ce`
- `meta[description]='Renowned for year-round wild elephant si'`
- `meta[og:title]='Udawalawe National Park - Lotus Ceylon'`
- `meta[og:description]='Renowned for year-round wild elephant si'`
- `meta[og:image]='../../assets/tours/wildlife/hero.jpg'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/udawalawe-national-park/'`


### [`destinations/wilpattu-national-park/index.html`](destinations/wilpattu-national-park/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Wilpattu National Park | Luxury Tours & Sacred Cey`
- `meta[description]='Sri Lanka's largest and oldest national '`
- `meta[og:title]='Wilpattu National Park - Lotus Ceylon'`
- `meta[og:description]='Sri Lanka's largest and oldest national '`
- `meta[og:image]='../../assets/images/wildlife/yala-leopar'`
- `meta[og:type]='place'`
- `canonical='https://lotusceylon.com/destinations/wilpattu-national-park/'`


### [`destinations/yala-national-park/index.html`](destinations/yala-national-park/index.html)
- **Coverage**: `84 / 161` elements bound (`52.2%`) | **Hard-Coded**: `77` elements

**Paragraph (1 hard-coded):**
- `Select Language...`

**Button (26 hard-coded):**
- `EN`
- `🇬🇧 English`
- `🇹🇼 繁體中文 (Taiwan)`
- `🇨🇳 简体中文 (Modern)`
- `🇫🇷 Français (French)`
- `🇩🇪 Deutsch (German)`
- `🇷🇺 Русский`
- `🇪🇸 Español`
- *... and 18 more*

**Link (40 hard-coded):**
- `href='../../tours/cultural/index.html' [🏛️Cultural Heritage]`
- `href='../../tours/buddhist-heritage/index.html' [☸️Buddhist Heritage]`
- `href='../../tours/wildlife/index.html' [🐆Wildlife Safaris]`
- `href='../../tours/beach/index.html' [🏖️Pristine Beaches]`
- `href='../../tours/hill-country/index.html' [⛰️Hill Country & Tea]`
- `href='../../tours/ayurvedic/index.html' [🌿Ayurvedic Healing]`
- `href='../../tours/honeymoon/index.html' [💍Honeymoon Romance]`
- `href='../../tours/family/index.html' [👨‍👩‍👧‍👦Family Discovery]`
- *... and 32 more*

**Badge / Tag (3 hard-coded):**
- `Badge: EN🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Mod`
- `Badge: EN`
- `Badge: 🇬🇧 English🇹🇼 繁體中文 (Taiwan)🇨🇳 简体中文 (Moder`

**Meta Tag (7 hard-coded):**
- `<title> Yala National Park | Luxury Tours & Sacred Ceylon`
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
- `Redirecting toAdventure & Trekking Tours......`

**Link (1 hard-coded):**
- `href='./tours/adventure/index.html' [Adventure & Trekking Tours]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Adventure & Trekking Tours | Lotus`
- `canonical='https://lotusceylon.com/tours/adventure/index.html'`


### [`ayurvedic-tours.html`](ayurvedic-tours.html)
- **Coverage**: `0 / 4` elements bound (`0.0%`) | **Hard-Coded**: `4` elements

**Paragraph (1 hard-coded):**
- `Redirecting toAuthentic Ayurveda & Wellness......`

**Link (1 hard-coded):**
- `href='./tours/ayurvedic/index.html' [Authentic Ayurveda & Wellness]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Authentic Ayurveda & Wellness | Lot`
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
- `Redirecting toHill Country & Tea Trails......`

**Link (1 hard-coded):**
- `href='./tours/hill-country/index.html' [Hill Country & Tea Trails]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Hill Country & Tea Trails | Lotus C`
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
- `Redirecting toAll Sri Lanka Tours & Packages......`

**Link (1 hard-coded):**
- `href='./tours/index.html' [All Sri Lanka Tours & Packages]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to All Sri Lanka Tours & Packages | Lo`
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
- `Redirecting toWildlife & Safari Expeditions......`

**Link (1 hard-coded):**
- `href='./tours/wildlife/index.html' [Wildlife & Safari Expeditions]`

**Meta Tag (2 hard-coded):**
- `<title> Redirecting to Wildlife & Safari Expeditions | Lot`
- `canonical='https://lotusceylon.com/tours/wildlife/index.html'`

