# Lotus Ceylon - URL Routing, Canonical Links & Redirect Architecture

This document outlines the URL routing structure and canonical mappings for the Lotus Ceylon website hosted on GitHub Pages (`https://lotusceylon.com` / `https://kanchu12345.github.io/thai/`).

## Canonical URL Architecture

Lotus Ceylon employs a clean hierarchical routing architecture:
- **Tours Catalog Hub**: `/tours/`
- **Category Portals**: `/tours/<category>/` (e.g. `/tours/beach/`, `/tours/cultural/`, `/tours/wildlife/`)
- **Package Itinerary Pages**: `/tours/<category>/<slug>/` (e.g. `/tours/beach/southern-sands-serenade/`)

## Backward-Compatible Root URL Mapping

For maximum compatibility with legacy links, direct bookmarks, and external referrals, the root legacy paths map to the canonical category paths:

| Legacy Root URL | Canonical URL Target | HTTP Status / Technique |
| :--- | :--- | :--- |
| `/beach-tours.html` | `/tours/beach/` | Canonical `<link rel="canonical">` + `<meta http-equiv="refresh">` |
| `/cultural-tours.html` | `/tours/cultural/` | Canonical `<link rel="canonical">` + `<meta http-equiv="refresh">` |
| `/wildlife-tours.html` | `/tours/wildlife/` | Canonical `<link rel="canonical">` + `<meta http-equiv="refresh">` |
| `/hill-country-tours.html` | `/tours/hill-country/` | Canonical `<link rel="canonical">` + `<meta http-equiv="refresh">` |
| `/adventure-tours.html` | `/tours/adventure/` | Canonical `<link rel="canonical">` + `<meta http-equiv="refresh">` |
| `/ayurvedic-tours.html` | `/tours/ayurvedic/` | Canonical `<link rel="canonical">` + `<meta http-equiv="refresh">` |
| `/honeymoon-tours.html` | `/tours/honeymoon/` | Canonical `<link rel="canonical">` + `<meta http-equiv="refresh">` |
| `/family-tours.html` | `/tours/family/` | Canonical `<link rel="canonical">` + `<meta http-equiv="refresh">` |
| `/ramayana-tours.html` | `/tours/ramayana/` | Canonical `<link rel="canonical">` + `<meta http-equiv="refresh">` |
| `/golf-tours.html` | `/tours/golf/` | Canonical `<link rel="canonical">` + `<meta http-equiv="refresh">` |
| `/sri-lanka-tours.html` | `/tours/` | Canonical `<link rel="canonical">` + `<meta http-equiv="refresh">` |

## Nginx / Apache Server Configuration (When migrating to custom VPS/Host)

```nginx
# Nginx 301 Permanent Redirects
location = /beach-tours.html { return 301 /tours/beach/; }
location = /cultural-tours.html { return 301 /tours/cultural/; }
location = /wildlife-tours.html { return 301 /tours/wildlife/; }
location = /hill-country-tours.html { return 301 /tours/hill-country/; }
location = /adventure-tours.html { return 301 /tours/adventure/; }
location = /ayurvedic-tours.html { return 301 /tours/ayurvedic/; }
location = /honeymoon-tours.html { return 301 /tours/honeymoon/; }
location = /family-tours.html { return 301 /tours/family/; }
location = /ramayana-tours.html { return 301 /tours/ramayana/; }
location = /golf-tours.html { return 301 /tours/golf/; }
location = /sri-lanka-tours.html { return 301 /tours/; }
```

## Multilingual Alternates

Every tour page declares multilingual alternate URLs via `js/i18n.js` client switching and XML sitemap `xhtml:link` tags across 10 supported languages:
- English (`en`), Arabic (`ar` with RTL), German (`de`), Spanish (`es`), French (`fr`), Hindi (`hi`), Italian (`it`), Japanese (`ja`), Russian (`ru`), Chinese (`zh`), plus `x-default`.
