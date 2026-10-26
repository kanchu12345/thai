# Lotus Ceylon - Image Asset Audit Report

**Date**: October 2026  
**Total Image References Audited**: 196  
**Valid Existing Images on Disk**: 78  
**Missing or Legacy References**: 118  

---

## 1. Summary of Legacy & Missing Image References

The audit detected legacy references (chiefly legacy `assets/tours/...` paths from early prototypes) that either do not exist or can be mapped to high-quality WebP assets in `assets/images/...`.

| Referenced Path | Disk Status | Suggested Replacement / Mapping | Referenced In (Sample) |
| :--- | :---: | :--- | :--- |
| `image.webp` | ❌ Missing | Missing on disk | `admin/js/admin-app.js` |
| `assets/images/cultural-triangle.jpg` | ❌ Missing | Missing on disk | `admin/js/admin-app.js, data/default-content.json` |
| `/hero.jpg` | ❌ Missing | Mapped to `assets/tours/beach/hero.jpg` | `admin/js/admin-app.js, data/seed-catalog.json` |
| `assets/images/kandy.jpg` | ❌ Missing | Missing on disk | `data/default-content.json` |
| `assets/images/yala.jpg` | ❌ Missing | Missing on disk | `data/default-content.json` |
| `assets/tours/beach/southern-sands-2.jpg` | ❌ Missing | Mapped to `assets/images/beach/arugam-bay-4.webp` | `data/packages.json` |
| `assets/tours/beach/southern-sands-3.jpg` | ❌ Missing | Mapped to `assets/images/beach/arugam-bay-4.webp` | `data/packages.json` |
| `assets/tours/beach/eastern-sanctuary-2.jpg` | ❌ Missing | Mapped to `assets/images/beach/arugam-bay-4.webp` | `data/packages.json` |
| `assets/tours/beach/eastern-sanctuary-3.jpg` | ❌ Missing | Mapped to `assets/images/beach/arugam-bay-4.webp` | `data/packages.json` |
| `assets/tours/beach/seaboard-odyssey-2.jpg` | ❌ Missing | Mapped to `assets/images/beach/arugam-bay-4.webp` | `data/packages.json` |
| `assets/tours/beach/seaboard-odyssey-3.jpg` | ❌ Missing | Mapped to `assets/images/beach/arugam-bay-4.webp` | `data/packages.json` |
| `assets/tours/cultural/royal-kingdoms-2.jpg` | ❌ Missing | Missing on disk | `data/packages.json` |
| `assets/tours/cultural/royal-kingdoms-3.jpg` | ❌ Missing | Missing on disk | `data/packages.json` |
| `assets/tours/cultural/sacred-triangle-2.jpg` | ❌ Missing | Missing on disk | `data/packages.json` |
| `assets/tours/cultural/sacred-triangle-3.jpg` | ❌ Missing | Missing on disk | `data/packages.json` |
| `assets/tours/cultural/three-millennia-2.jpg` | ❌ Missing | Missing on disk | `data/packages.json` |
| `assets/tours/cultural/three-millennia-3.jpg` | ❌ Missing | Missing on disk | `data/packages.json` |
| `assets/tours/wildlife/predator-trail-2.jpg` | ❌ Missing | Missing on disk | `data/packages.json` |
| `assets/tours/wildlife/predator-trail-3.jpg` | ❌ Missing | Missing on disk | `data/packages.json` |
| `assets/tours/wildlife/big-five-2.jpg` | ❌ Missing | Missing on disk | `data/packages.json` |
| `assets/tours/wildlife/big-five-3.jpg` | ❌ Missing | Missing on disk | `data/packages.json` |
| `assets/tours/wildlife/biosphere-odyssey-2.jpg` | ❌ Missing | Missing on disk | `data/packages.json` |
| `assets/tours/wildlife/biosphere-odyssey-3.jpg` | ❌ Missing | Missing on disk | `data/packages.json` |
| `hero-sigiriya-aerial-1.webp` | ❌ Missing | Mapped to `assets/images/home/hero-sigiriya-aerial-1.webp` | `data/seed-catalog.json` |
| `sigiriya-1.webp` | ❌ Missing | Mapped to `assets/images/cultural/sigiriya-1.webp` | `data/seed-catalog.json` |
| `dambulla-cave-temple-2.webp` | ❌ Missing | Mapped to `assets/images/cultural/dambulla-cave-temple-2.webp` | `data/seed-catalog.json` |
| `polonnaruwa-gal-vihara-3.webp` | ❌ Missing | Mapped to `assets/images/cultural/polonnaruwa-gal-vihara-3.webp` | `data/seed-catalog.json` |
| `kandy-temple-of-tooth-4.webp` | ❌ Missing | Mapped to `assets/images/cultural/kandy-temple-of-tooth-4.webp` | `data/seed-catalog.json` |
| `galle-fort-5.webp` | ❌ Missing | Mapped to `assets/images/cultural/galle-fort-5.webp` | `data/seed-catalog.json` |
| `jaya-sri-maha-bodhi-1.webp` | ❌ Missing | Mapped to `assets/images/buddhist-heritage/jaya-sri-maha-bodhi-1.webp` | `data/seed-catalog.json` |
| `ruwanwelisaya-2.webp` | ❌ Missing | Mapped to `assets/images/buddhist-heritage/ruwanwelisaya-2.webp` | `data/seed-catalog.json` |
| `mihintale-3.webp` | ❌ Missing | Mapped to `assets/images/buddhist-heritage/mihintale-3.webp` | `data/seed-catalog.json` |
| `temple-of-the-tooth-4.webp` | ❌ Missing | Mapped to `assets/images/buddhist-heritage/temple-of-the-tooth-4.webp` | `data/seed-catalog.json` |
| `yala-leopard-1.webp` | ❌ Missing | Mapped to `assets/images/wildlife/yala-leopard-1.webp` | `data/seed-catalog.json` |
| `minneriya-elephant-gathering-2.webp` | ❌ Missing | Mapped to `assets/images/wildlife/minneriya-elephant-gathering-2.webp` | `data/seed-catalog.json` |
| `udawalawe-3.webp` | ❌ Missing | Mapped to `assets/images/wildlife/udawalawe-3.webp` | `data/seed-catalog.json` |
| `mirissa-blue-whale-4.webp` | ❌ Missing | Mapped to `assets/images/wildlife/mirissa-blue-whale-4.webp` | `data/seed-catalog.json` |
| `sinharaja-rainforest-5.webp` | ❌ Missing | Mapped to `assets/images/wildlife/sinharaja-rainforest-5.webp` | `data/seed-catalog.json` |
| `mirissa-1.webp` | ❌ Missing | Mapped to `assets/images/beach/mirissa-1.webp` | `data/seed-catalog.json` |
| `unawatuna-2.webp` | ❌ Missing | Mapped to `assets/images/beach/unawatuna-2.webp` | `data/seed-catalog.json` |
| `bentota-3.webp` | ❌ Missing | Mapped to `assets/images/beach/bentota-3.webp` | `data/seed-catalog.json` |
| `arugam-bay-4.webp` | ❌ Missing | Mapped to `assets/images/beach/arugam-bay-4.webp` | `data/seed-catalog.json` |
| `pasikudah-5.webp` | ❌ Missing | Mapped to `assets/images/beach/pasikudah-5.webp` | `data/seed-catalog.json` |
| `nilaveli-6.webp` | ❌ Missing | Mapped to `assets/images/beach/nilaveli-6.webp` | `data/seed-catalog.json` |
| `nine-arches-bridge-1.webp` | ❌ Missing | Mapped to `assets/images/hill-country/nine-arches-bridge-1.webp` | `data/seed-catalog.json` |
| `nuwara-eliya-tea-2.webp` | ❌ Missing | Mapped to `assets/images/hill-country/nuwara-eliya-tea-2.webp` | `data/seed-catalog.json` |
| `ella-rock-3.webp` | ❌ Missing | Mapped to `assets/images/hill-country/ella-rock-3.webp` | `data/seed-catalog.json` |
| `ramboda-falls-4.webp` | ❌ Missing | Mapped to `assets/images/hill-country/ramboda-falls-4.webp` | `data/seed-catalog.json` |
| `kandy-ella-train-5.webp` | ❌ Missing | Mapped to `assets/images/hill-country/kandy-ella-train-5.webp` | `data/seed-catalog.json` |
| `herbal-treatment-1.webp` | ❌ Missing | Mapped to `assets/images/ayurveda/herbal-treatment-1.webp` | `data/seed-catalog.json` |
| `matale-spice-garden-2.webp` | ❌ Missing | Mapped to `assets/images/ayurveda/matale-spice-garden-2.webp` | `data/seed-catalog.json` |
| `sri-lanka-yoga-3.webp` | ❌ Missing | Mapped to `assets/images/ayurveda/sri-lanka-yoga-3.webp` | `data/seed-catalog.json` |
| `seaside-villa-1.webp` | ❌ Missing | Mapped to `assets/images/honeymoon/seaside-villa-1.webp` | `data/seed-catalog.json` |
| `mirissa-sunset-2.webp` | ❌ Missing | Mapped to `assets/images/honeymoon/mirissa-sunset-2.webp` | `data/seed-catalog.json` |
| `tea-bungalow-3.webp` | ❌ Missing | Mapped to `assets/images/honeymoon/tea-bungalow-3.webp` | `data/seed-catalog.json` |
| `kosgoda-turtle-hatchery-1.webp` | ❌ Missing | Mapped to `assets/images/family/kosgoda-turtle-hatchery-1.webp` | `data/seed-catalog.json` |
| `scenic-train-ride-2.webp` | ❌ Missing | Mapped to `assets/images/family/scenic-train-ride-2.webp` | `data/seed-catalog.json` |
| `calm-beach-3.webp` | ❌ Missing | Mapped to `assets/images/beach/arugam-bay-4.webp` | `data/seed-catalog.json` |
| `kitulgala-rafting-1.webp` | ❌ Missing | Mapped to `assets/images/adventure/kitulgala-rafting-1.webp` | `data/seed-catalog.json` |
| `adams-peak-2.webp` | ❌ Missing | Mapped to `assets/images/adventure/adams-peak-2.webp` | `data/seed-catalog.json` |
| `weligama-surfing-3.webp` | ❌ Missing | Mapped to `assets/images/adventure/weligama-surfing-3.webp` | `data/seed-catalog.json` |
| `knuckles-trek-4.webp` | ❌ Missing | Mapped to `assets/images/adventure/knuckles-trek-4.webp` | `data/seed-catalog.json` |
| `seetha-amman-temple-1.webp` | ❌ Missing | Mapped to `assets/images/ramayana/seetha-amman-temple-1.webp` | `data/seed-catalog.json` |
| `ravana-falls-2.webp` | ❌ Missing | Mapped to `assets/images/ramayana/ravana-falls-2.webp` | `data/seed-catalog.json` |
| `munneswaram-3.webp` | ❌ Missing | Mapped to `assets/images/ramayana/munneswaram-3.webp` | `data/seed-catalog.json` |
| `hakgala-gardens-4.webp` | ❌ Missing | Mapped to `assets/images/ramayana/hakgala-gardens-4.webp` | `data/seed-catalog.json` |
| `hospitality-scenes-1.webp` | ❌ Missing | Mapped to `assets/images/about/hospitality-scenes-1.webp` | `data/seed-catalog.json` |
| `negombo-lagoon-1.webp` | ❌ Missing | Mapped to `assets/images/contact/negombo-lagoon-1.webp` | `data/seed-catalog.json` |
| `adventure.jpg` | ❌ Missing | Mapped to `assets/images/adventure.jpg` | `data/seed-catalog.json` |
| `avatar-1.jpg` | ❌ Missing | Mapped to `assets/images/avatar-1.jpg` | `data/seed-catalog.json` |
| `avatar-2.jpg` | ❌ Missing | Mapped to `assets/images/avatar-2.jpg` | `data/seed-catalog.json` |
| `beach-galle.jpg` | ❌ Missing | Mapped to `assets/images/beach/arugam-bay-4.webp` | `data/seed-catalog.json` |
| `couple-travel.jpg` | ❌ Missing | Mapped to `assets/images/couple-travel.jpg` | `data/seed-catalog.json` |
| `hero-nine-arches.jpg` | ❌ Missing | Mapped to `assets/images/hero-nine-arches.jpg` | `data/seed-catalog.json` |
| `logo-emblem-hd.png` | ❌ Missing | Mapped to `assets/images/logo-emblem-hd.png` | `data/seed-catalog.json` |
| `logo-generated-3d-transparent.png` | ❌ Missing | Mapped to `assets/images/logo-generated-3d-transparent.png` | `data/seed-catalog.json` |
| `logo_circular_navy_transparent.png` | ❌ Missing | Mapped to `assets/images/logo_circular_navy_transparent.png` | `data/seed-catalog.json` |
| `logo_icon_only.png` | ❌ Missing | Mapped to `assets/images/logo_icon_only.png` | `data/seed-catalog.json` |
| `logo_luxury_dark.jpg` | ❌ Missing | Mapped to `assets/images/logo_luxury_dark.jpg` | `data/seed-catalog.json` |
| `logo_luxury_transparent.png` | ❌ Missing | Mapped to `assets/images/logo_luxury_transparent.png` | `data/seed-catalog.json` |
| `logo_transparent.png` | ❌ Missing | Mapped to `assets/images/logo_transparent.png` | `data/seed-catalog.json` |
| `lotus-emblem-icon.png` | ❌ Missing | Mapped to `assets/images/lotus-emblem-icon.png` | `data/seed-catalog.json` |
| `original_logo_dark_navy.png` | ❌ Missing | Mapped to `assets/images/original_logo_dark_navy.png` | `data/seed-catalog.json` |
| `original_logo_transparent.png` | ❌ Missing | Mapped to `assets/images/original_logo_transparent.png` | `data/seed-catalog.json` |
| `polonnaruwa.jpg` | ❌ Missing | Mapped to `assets/images/polonnaruwa.jpg` | `data/seed-catalog.json` |
| `sigiriya.jpg` | ❌ Missing | Mapped to `assets/images/sigiriya.jpg` | `data/seed-catalog.json` |
| `sri-lanka-3d-coastal-relief-map.jpg` | ❌ Missing | Mapped to `assets/images/sri-lanka-3d-coastal-relief-map.jpg` | `data/seed-catalog.json` |
| `sri-lanka-3d-relief-illustrated-map.jpg` | ❌ Missing | Mapped to `assets/images/sri-lanka-3d-relief-illustrated-map.jpg` | `data/seed-catalog.json` |
| `sri-lanka-coastal-illustrated-map.jpg` | ❌ Missing | Mapped to `assets/images/sri-lanka-coastal-illustrated-map.jpg` | `data/seed-catalog.json` |
| `sri-lanka-coastal-watercolor-map.jpg` | ❌ Missing | Mapped to `assets/images/sri-lanka-coastal-watercolor-map.jpg` | `data/seed-catalog.json` |
| `sri-lanka-illustrated-travel-map.jpg` | ❌ Missing | Mapped to `assets/images/sri-lanka-illustrated-travel-map.jpg` | `data/seed-catalog.json` |
| `sri-lanka-official-tourist-map.jpg` | ❌ Missing | Mapped to `assets/images/sri-lanka-official-tourist-map.jpg` | `data/seed-catalog.json` |
| `sri-lanka-tourist-map-illustrated.jpg` | ❌ Missing | Mapped to `assets/images/sri-lanka-tourist-map-illustrated.jpg` | `data/seed-catalog.json` |
| `sri-lanka-tourist-map.jpg` | ❌ Missing | Mapped to `assets/images/sri-lanka-tourist-map.jpg` | `data/seed-catalog.json` |
| `sunset-mirissa.jpg` | ❌ Missing | Mapped to `assets/images/sunset-mirissa.jpg` | `data/seed-catalog.json` |
| `tea-country.jpg` | ❌ Missing | Mapped to `assets/images/tea-country.jpg` | `data/seed-catalog.json` |
| `temple-culture.jpg` | ❌ Missing | Mapped to `assets/images/temple-culture.jpg` | `data/seed-catalog.json` |
| `wildlife.jpg` | ❌ Missing | Mapped to `assets/images/wildlife.jpg` | `data/seed-catalog.json` |
| `hero-sigiriya-aerial-portrait.webp` | ❌ Missing | Mapped to `assets/images/home/hero-sigiriya-aerial-portrait.webp` | `data/seed-catalog.json` |
| `line-qr.png` | ❌ Missing | Missing on disk | `data/seed-catalog.json` |
| `wechat-qr.png` | ❌ Missing | Missing on disk | `data/seed-catalog.json` |
| `whatsapp-qr.png` | ❌ Missing | Missing on disk | `data/seed-catalog.json` |
| `eastern-sanctuary-1.jpg` | ❌ Missing | Mapped to `assets/tours/beach/eastern-sanctuary-1.jpg` | `data/seed-catalog.json` |
| `seaboard-odyssey-1.jpg` | ❌ Missing | Mapped to `assets/tours/beach/seaboard-odyssey-1.jpg` | `data/seed-catalog.json` |
| `southern-sands-1.jpg` | ❌ Missing | Mapped to `assets/tours/beach/southern-sands-1.jpg` | `data/seed-catalog.json` |
| `royal-kingdoms-1.jpg` | ❌ Missing | Mapped to `assets/tours/cultural/royal-kingdoms-1.jpg` | `data/seed-catalog.json` |
| `sacred-triangle-1.jpg` | ❌ Missing | Mapped to `assets/tours/cultural/sacred-triangle-1.jpg` | `data/seed-catalog.json` |
| `three-millennia-1.jpg` | ❌ Missing | Mapped to `assets/tours/cultural/three-millennia-1.jpg` | `data/seed-catalog.json` |
| `big-five-1.jpg` | ❌ Missing | Mapped to `assets/tours/wildlife/big-five-1.jpg` | `data/seed-catalog.json` |
| `biosphere-odyssey-1.jpg` | ❌ Missing | Mapped to `assets/tours/wildlife/biosphere-odyssey-1.jpg` | `data/seed-catalog.json` |
| `predator-trail-1.jpg` | ❌ Missing | Mapped to `assets/tours/wildlife/predator-trail-1.jpg` | `data/seed-catalog.json` |
| `rainforest-1.jpg` | ❌ Missing | Mapped to `assets/tours/wildlife/rainforest-1.jpg` | `data/seed-catalog.json` |
| `images/layers.png` | ❌ Missing | Missing on disk | `vendor/leaflet/leaflet.css` |
| `images/layers-2x.png` | ❌ Missing | Missing on disk | `vendor/leaflet/leaflet.css` |
| `images/marker-icon.png` | ❌ Missing | Missing on disk | `vendor/leaflet/leaflet.css` |
| `marker-icon.png` | ❌ Missing | Missing on disk | `vendor/leaflet/leaflet.js` |
| `marker-icon-2x.png` | ❌ Missing | Missing on disk | `vendor/leaflet/leaflet.js` |
| `marker-shadow.png` | ❌ Missing | Missing on disk | `vendor/leaflet/leaflet.js` |

---

## 2. Valid Existing Image Directory Distribution

Total 94 real image files verified under `assets/images/` and `assets/tours/`:
- **About**: `assets/images/about/`
- **Adventure**: `assets/images/adventure/`
- **Ayurveda**: `assets/images/ayurveda/`
- **Beach**: `assets/images/beach/`
- **Brand**: `assets/images/brand/`
- **Buddhist Heritage**: `assets/images/buddhist-heritage/`
- **Contact**: `assets/images/contact/`
- **Cultural**: `assets/images/cultural/`
- **Family**: `assets/images/family/`
- **Hill Country**: `assets/images/hill-country/`
- **Home**: `assets/images/home/`
- **Honeymoon**: `assets/images/honeymoon/`
- **Ramayana**: `assets/images/ramayana/`
- **Wildlife**: `assets/images/wildlife/`

---

## 3. Recommended Remediation in CMS & Engine
1. In `assets/js/cms.js` image resolver: add legacy alias table mapping `assets/tours/{category}/{name}.jpg` to the corresponding real asset in `assets/images/{category}/...`.
2. Add image `onerror` fallback to `assets/images/brand/logo.png` to ensure zero broken image icons appear in public view.
