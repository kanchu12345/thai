# LOTUS CEYLON CMS FULL AUDIT REPORT (audit.md)
**Date**: 2026-10-27T13:20:18.090Z  
**Pages Audited**: 69  
**Total Identified Audit Checkpoints**: 553

---

## Executive Summary
This audit inspects every public page of Lotus Ceylon International Tours & Services across all critical elements:
- **Hero Image, Hero Background, Hero Video** (MP4 / Cloudinary / YouTube), Hero heading, subheading, and CTA buttons.
- **Brand Logo & Favicon** across headers, footers, and mobile drawers.
- **Section Background Images, Gallery Images, Team Photos, Map Images, and QR Codes**.
- **SEO Title, Meta Description, and OpenGraph Image tags**.
- **Header, Menu Navigation, Footer, and Floating WhatsApp / Concierge Widgets**.
- **Tour Packages, Categories, Destinations, Reviews, FAQs, and Inquiry Form Options**.

---

| Page | Element | Type | Current Firestore Key | Editable in Admin Today? | Required Fix |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `404.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `404.html` | Page Title (<title>) | **seo** | `siteContent/404.seo.title` | **NO** | Add data-cms="siteContent/404.seo.title" and bind in editor |
| `404.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/404.seo.description` | **NO** | Add data-cms="siteContent/404.seo.description" |
| `404.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **NO** | Add data-cms-img="siteGlobal.branding.logo" |
| `404.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **NO** | Add data-cms-link="siteGlobal.contact.whatsappUrl" |
| `404.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/404.*` | **NO** | Bind elements |
| `404.html` | Page Images (0/2 bound) | **image** | `siteContent/404.*` | **NO** | Bind remaining 2 images |
| `about.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `about.html` | Page Title (<title>) | **seo** | `siteContent/about.seo.title` | **NO** | Add data-cms="siteContent/about.seo.title" and bind in editor |
| `about.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/about.seo.description` | **NO** | Add data-cms="siteContent/about.seo.description" |
| `about.html` | OpenGraph Image (og:image) | **seo** | `siteContent/about.seo.og_image` | **NO** | Add data-cms-img="siteContent/about.seo.og_image" |
| `about.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `about.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `about.html` | Page Text Content (194 text bindings, 5 rich HTML bindings) | **text** | `siteContent/about.*` | **YES** | Group into friendly visual sections |
| `about.html` | Page Images (6/6 bound) | **image** | `siteContent/about.*` | **YES** | None |
| `adventure-tours.html` | Page Title (<title>) | **seo** | `siteContent/adventure-tours.seo.title` | **NO** | Add data-cms="siteContent/adventure-tours.seo.title" and bind in editor |
| `adventure-tours.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/adventure-tours.*` | **NO** | Bind elements |
| `adventure-tours.html` | Page Images (0/0 bound) | **image** | `siteContent/adventure-tours.*` | **NO** | None |
| `ayurvedic-tours.html` | Page Title (<title>) | **seo** | `siteContent/ayurvedic-tours.seo.title` | **NO** | Add data-cms="siteContent/ayurvedic-tours.seo.title" and bind in editor |
| `ayurvedic-tours.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/ayurvedic-tours.*` | **NO** | Bind elements |
| `ayurvedic-tours.html` | Page Images (0/0 bound) | **image** | `siteContent/ayurvedic-tours.*` | **NO** | None |
| `beach-tours.html` | Page Title (<title>) | **seo** | `siteContent/beach-tours.seo.title` | **NO** | Add data-cms="siteContent/beach-tours.seo.title" and bind in editor |
| `beach-tours.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/beach-tours.*` | **NO** | Bind elements |
| `beach-tours.html` | Page Images (0/0 bound) | **image** | `siteContent/beach-tours.*` | **NO** | None |
| `blog.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `blog.html` | Page Title (<title>) | **seo** | `siteContent/blog.seo.title` | **NO** | Add data-cms="siteContent/blog.seo.title" and bind in editor |
| `blog.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/blog.seo.description` | **NO** | Add data-cms="siteContent/blog.seo.description" |
| `blog.html` | OpenGraph Image (og:image) | **seo** | `siteContent/blog.seo.og_image` | **NO** | Add data-cms-img="siteContent/blog.seo.og_image" |
| `blog.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `blog.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `blog.html` | Page Text Content (120 text bindings, 1 rich HTML bindings) | **text** | `siteContent/blog.*` | **YES** | Group into friendly visual sections |
| `blog.html` | Page Images (3/3 bound) | **image** | `siteContent/blog.*` | **YES** | None |
| `buddhist-heritage-tours.html` | Page Title (<title>) | **seo** | `siteContent/buddhist-heritage-tours.seo.title` | **NO** | Add data-cms="siteContent/buddhist-heritage-tours.seo.title" and bind in editor |
| `buddhist-heritage-tours.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/buddhist-heritage-tours.*` | **NO** | Bind elements |
| `buddhist-heritage-tours.html` | Page Images (0/0 bound) | **image** | `siteContent/buddhist-heritage-tours.*` | **NO** | None |
| `cancellation-policy.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `cancellation-policy.html` | Page Title (<title>) | **seo** | `siteContent/cancellation-policy.seo.title` | **NO** | Add data-cms="siteContent/cancellation-policy.seo.title" and bind in editor |
| `cancellation-policy.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/cancellation-policy.seo.description` | **NO** | Add data-cms="siteContent/cancellation-policy.seo.description" |
| `cancellation-policy.html` | OpenGraph Image (og:image) | **seo** | `siteContent/cancellation-policy.seo.og_image` | **NO** | Add data-cms-img="siteContent/cancellation-policy.seo.og_image" |
| `cancellation-policy.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `cancellation-policy.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `cancellation-policy.html` | Page Text Content (124 text bindings, 4 rich HTML bindings) | **text** | `siteContent/cancellation-policy.*` | **YES** | Group into friendly visual sections |
| `cancellation-policy.html` | Page Images (2/2 bound) | **image** | `siteContent/cancellation-policy.*` | **YES** | None |
| `category.html` | Page Title (<title>) | **seo** | `siteContent/category.seo.title` | **NO** | Add data-cms="siteContent/category.seo.title" and bind in editor |
| `category.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/category.seo.description` | **NO** | Add data-cms="siteContent/category.seo.description" |
| `category.html` | OpenGraph Image (og:image) | **seo** | `siteContent/category.seo.og_image` | **NO** | Add data-cms-img="siteContent/category.seo.og_image" |
| `category.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/category.*` | **NO** | Bind elements |
| `category.html` | Page Images (0/0 bound) | **image** | `siteContent/category.*` | **NO** | None |
| `contact.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `contact.html` | Page Title (<title>) | **seo** | `siteContent/contact.seo.title` | **NO** | Add data-cms="siteContent/contact.seo.title" and bind in editor |
| `contact.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/contact.seo.description` | **NO** | Add data-cms="siteContent/contact.seo.description" |
| `contact.html` | OpenGraph Image (og:image) | **seo** | `siteContent/contact.seo.og_image` | **NO** | Add data-cms-img="siteContent/contact.seo.og_image" |
| `contact.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `contact.html` | Interactive Map / Route Map Image | **image** | `siteContent/contact.map.url` | **NO** | Add data-cms-img="siteContent/contact.map.url" |
| `contact.html` | Interactive Map / Route Map Image | **image** | `siteContent/contact.map.url` | **NO** | Add data-cms-img="siteContent/contact.map.url" |
| `contact.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `contact.html` | Page Text Content (139 text bindings, 0 rich HTML bindings) | **text** | `siteContent/contact.*` | **YES** | Group into friendly visual sections |
| `contact.html` | Page Images (2/2 bound) | **image** | `siteContent/contact.*` | **YES** | None |
| `cookie-policy.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `cookie-policy.html` | Page Title (<title>) | **seo** | `siteContent/cookie-policy.seo.title` | **NO** | Add data-cms="siteContent/cookie-policy.seo.title" and bind in editor |
| `cookie-policy.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/cookie-policy.seo.description` | **NO** | Add data-cms="siteContent/cookie-policy.seo.description" |
| `cookie-policy.html` | OpenGraph Image (og:image) | **seo** | `siteContent/cookie-policy.seo.og_image` | **NO** | Add data-cms-img="siteContent/cookie-policy.seo.og_image" |
| `cookie-policy.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `cookie-policy.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `cookie-policy.html` | Page Text Content (119 text bindings, 3 rich HTML bindings) | **text** | `siteContent/cookie-policy.*` | **YES** | Group into friendly visual sections |
| `cookie-policy.html` | Page Images (2/2 bound) | **image** | `siteContent/cookie-policy.*` | **YES** | None |
| `cultural-tours.html` | Page Title (<title>) | **seo** | `siteContent/cultural-tours.seo.title` | **NO** | Add data-cms="siteContent/cultural-tours.seo.title" and bind in editor |
| `cultural-tours.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/cultural-tours.*` | **NO** | Bind elements |
| `cultural-tours.html` | Page Images (0/0 bound) | **image** | `siteContent/cultural-tours.*` | **NO** | None |
| `destinations.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `destinations.html` | Page Title (<title>) | **seo** | `siteContent/destinations.seo.title` | **NO** | Add data-cms="siteContent/destinations.seo.title" and bind in editor |
| `destinations.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/destinations.seo.description` | **NO** | Add data-cms="siteContent/destinations.seo.description" |
| `destinations.html` | OpenGraph Image (og:image) | **seo** | `siteContent/destinations.seo.og_image` | **NO** | Add data-cms-img="siteContent/destinations.seo.og_image" |
| `destinations.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `destinations.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `destinations.html` | Page Text Content (224 text bindings, 1 rich HTML bindings) | **text** | `siteContent/destinations.*` | **YES** | Group into friendly visual sections |
| `destinations.html` | Page Images (26/26 bound) | **image** | `siteContent/destinations.*` | **YES** | None |
| `experiences.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `experiences.html` | Page Title (<title>) | **seo** | `siteContent/experiences.seo.title` | **NO** | Add data-cms="siteContent/experiences.seo.title" and bind in editor |
| `experiences.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/experiences.seo.description` | **NO** | Add data-cms="siteContent/experiences.seo.description" |
| `experiences.html` | OpenGraph Image (og:image) | **seo** | `siteContent/experiences.seo.og_image` | **NO** | Add data-cms-img="siteContent/experiences.seo.og_image" |
| `experiences.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `experiences.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `experiences.html` | Page Text Content (191 text bindings, 1 rich HTML bindings) | **text** | `siteContent/experiences.*` | **YES** | Group into friendly visual sections |
| `experiences.html` | Page Images (17/17 bound) | **image** | `siteContent/experiences.*` | **YES** | None |
| `family-tours.html` | Page Title (<title>) | **seo** | `siteContent/family-tours.seo.title` | **NO** | Add data-cms="siteContent/family-tours.seo.title" and bind in editor |
| `family-tours.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/family-tours.*` | **NO** | Bind elements |
| `family-tours.html` | Page Images (0/0 bound) | **image** | `siteContent/family-tours.*` | **NO** | None |
| `gallery.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `gallery.html` | Page Title (<title>) | **seo** | `siteContent/gallery.seo.title` | **NO** | Add data-cms="siteContent/gallery.seo.title" and bind in editor |
| `gallery.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/gallery.seo.description` | **NO** | Add data-cms="siteContent/gallery.seo.description" |
| `gallery.html` | OpenGraph Image (og:image) | **seo** | `siteContent/gallery.seo.og_image` | **NO** | Add data-cms-img="siteContent/gallery.seo.og_image" |
| `gallery.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `gallery.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `gallery.html` | Page Text Content (182 text bindings, 1 rich HTML bindings) | **text** | `siteContent/gallery.*` | **YES** | Group into friendly visual sections |
| `gallery.html` | Page Images (20/21 bound) | **image** | `siteContent/gallery.*` | **YES** | Bind remaining 1 images |
| `golf-tours.html` | Page Title (<title>) | **seo** | `siteContent/golf-tours.seo.title` | **NO** | Add data-cms="siteContent/golf-tours.seo.title" and bind in editor |
| `golf-tours.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/golf-tours.*` | **NO** | Bind elements |
| `golf-tours.html` | Page Images (0/0 bound) | **image** | `siteContent/golf-tours.*` | **NO** | None |
| `hill-country-tours.html` | Page Title (<title>) | **seo** | `siteContent/hill-country-tours.seo.title` | **NO** | Add data-cms="siteContent/hill-country-tours.seo.title" and bind in editor |
| `hill-country-tours.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/hill-country-tours.*` | **NO** | Bind elements |
| `hill-country-tours.html` | Page Images (0/0 bound) | **image** | `siteContent/hill-country-tours.*` | **NO** | None |
| `honeymoon-tours.html` | Page Title (<title>) | **seo** | `siteContent/honeymoon-tours.seo.title` | **NO** | Add data-cms="siteContent/honeymoon-tours.seo.title" and bind in editor |
| `honeymoon-tours.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/honeymoon-tours.*` | **NO** | Bind elements |
| `honeymoon-tours.html` | Page Images (0/0 bound) | **image** | `siteContent/honeymoon-tours.*` | **NO** | None |
| `index.html` | Page Title (<title>) | **seo** | `home.seo.title` | **YES** | None |
| `index.html` | Meta Description (<meta name="description">) | **seo** | `home.seo.description` | **NO** | Add data-cms="siteContent/home.seo.description" |
| `index.html` | OpenGraph Image (og:image) | **seo** | `siteContent/home.seo.og_image` | **NO** | Add data-cms-img="siteContent/home.seo.og_image" |
| `index.html` | Hero Background Video (<video>) | **video** | `hero.video` | **YES** | None |
| `index.html` | Hero Banner Image (<img>) | **image** | `hero.image` | **YES** | None |
| `index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappLink` | **YES** | None |
| `index.html` | Page Text Content (287 text bindings, 34 rich HTML bindings) | **text** | `siteContent/home.*` | **YES** | Group into friendly visual sections |
| `index.html` | Page Images (45/45 bound) | **image** | `siteContent/home.*` | **YES** | None |
| `inquiry-detailed.html` | Page Title (<title>) | **seo** | `siteContent/inquiry-detailed.seo.title` | **NO** | Add data-cms="siteContent/inquiry-detailed.seo.title" and bind in editor |
| `inquiry-detailed.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/inquiry-detailed.seo.description` | **NO** | Add data-cms="siteContent/inquiry-detailed.seo.description" |
| `inquiry-detailed.html` | OpenGraph Image (og:image) | **seo** | `siteContent/inquiry-detailed.seo.og_image` | **NO** | Add data-cms-img="siteContent/inquiry-detailed.seo.og_image" |
| `inquiry-detailed.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `inquiry-detailed.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `inquiry-detailed.html` | Page Text Content (168 text bindings, 1 rich HTML bindings) | **text** | `siteContent/inquiry-detailed.*` | **YES** | Group into friendly visual sections |
| `inquiry-detailed.html` | Page Images (2/2 bound) | **image** | `siteContent/inquiry-detailed.*` | **YES** | None |
| `inquiry-quick.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `inquiry-quick.html` | Page Title (<title>) | **seo** | `siteContent/inquiry-quick.seo.title` | **NO** | Add data-cms="siteContent/inquiry-quick.seo.title" and bind in editor |
| `inquiry-quick.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/inquiry-quick.seo.description` | **NO** | Add data-cms="siteContent/inquiry-quick.seo.description" |
| `inquiry-quick.html` | OpenGraph Image (og:image) | **seo** | `siteContent/inquiry-quick.seo.og_image` | **NO** | Add data-cms-img="siteContent/inquiry-quick.seo.og_image" |
| `inquiry-quick.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `inquiry-quick.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `inquiry-quick.html` | Page Text Content (141 text bindings, 0 rich HTML bindings) | **text** | `siteContent/inquiry-quick.*` | **YES** | Group into friendly visual sections |
| `inquiry-quick.html` | Page Images (2/2 bound) | **image** | `siteContent/inquiry-quick.*` | **YES** | None |
| `privacy-policy.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `privacy-policy.html` | Page Title (<title>) | **seo** | `siteContent/privacy-policy.seo.title` | **NO** | Add data-cms="siteContent/privacy-policy.seo.title" and bind in editor |
| `privacy-policy.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/privacy-policy.seo.description` | **NO** | Add data-cms="siteContent/privacy-policy.seo.description" |
| `privacy-policy.html` | OpenGraph Image (og:image) | **seo** | `siteContent/privacy-policy.seo.og_image` | **NO** | Add data-cms-img="siteContent/privacy-policy.seo.og_image" |
| `privacy-policy.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `privacy-policy.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `privacy-policy.html` | Page Text Content (132 text bindings, 0 rich HTML bindings) | **text** | `siteContent/privacy-policy.*` | **YES** | Group into friendly visual sections |
| `privacy-policy.html` | Page Images (2/2 bound) | **image** | `siteContent/privacy-policy.*` | **YES** | None |
| `ramayana-tours.html` | Page Title (<title>) | **seo** | `siteContent/ramayana-tours.seo.title` | **NO** | Add data-cms="siteContent/ramayana-tours.seo.title" and bind in editor |
| `ramayana-tours.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/ramayana-tours.*` | **NO** | Bind elements |
| `ramayana-tours.html` | Page Images (0/0 bound) | **image** | `siteContent/ramayana-tours.*` | **NO** | None |
| `reviews.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `reviews.html` | Page Title (<title>) | **seo** | `siteContent/reviews.seo.title` | **NO** | Add data-cms="siteContent/reviews.seo.title" and bind in editor |
| `reviews.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/reviews.seo.description` | **NO** | Add data-cms="siteContent/reviews.seo.description" |
| `reviews.html` | OpenGraph Image (og:image) | **seo** | `siteContent/reviews.seo.og_image` | **NO** | Add data-cms-img="siteContent/reviews.seo.og_image" |
| `reviews.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `reviews.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `reviews.html` | Page Text Content (127 text bindings, 1 rich HTML bindings) | **text** | `siteContent/reviews.*` | **YES** | Group into friendly visual sections |
| `reviews.html` | Page Images (2/2 bound) | **image** | `siteContent/reviews.*` | **YES** | None |
| `sri-lanka-tours.html` | Page Title (<title>) | **seo** | `siteContent/sri-lanka-tours.seo.title` | **NO** | Add data-cms="siteContent/sri-lanka-tours.seo.title" and bind in editor |
| `sri-lanka-tours.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/sri-lanka-tours.*` | **NO** | Bind elements |
| `sri-lanka-tours.html` | Page Images (0/0 bound) | **image** | `siteContent/sri-lanka-tours.*` | **NO** | None |
| `terms-conditions.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `terms-conditions.html` | Page Title (<title>) | **seo** | `siteContent/terms-conditions.seo.title` | **NO** | Add data-cms="siteContent/terms-conditions.seo.title" and bind in editor |
| `terms-conditions.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/terms-conditions.seo.description` | **NO** | Add data-cms="siteContent/terms-conditions.seo.description" |
| `terms-conditions.html` | OpenGraph Image (og:image) | **seo** | `siteContent/terms-conditions.seo.og_image` | **NO** | Add data-cms-img="siteContent/terms-conditions.seo.og_image" |
| `terms-conditions.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `terms-conditions.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `terms-conditions.html` | Page Text Content (126 text bindings, 0 rich HTML bindings) | **text** | `siteContent/terms-conditions.*` | **YES** | Group into friendly visual sections |
| `terms-conditions.html` | Page Images (2/2 bound) | **image** | `siteContent/terms-conditions.*` | **YES** | None |
| `tour-package-detail.html` | Page Title (<title>) | **seo** | `siteContent/tour-package-detail.seo.title` | **NO** | Add data-cms="siteContent/tour-package-detail.seo.title" and bind in editor |
| `tour-package-detail.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/tour-package-detail.seo.description` | **NO** | Add data-cms="siteContent/tour-package-detail.seo.description" |
| `tour-package-detail.html` | OpenGraph Image (og:image) | **seo** | `siteContent/tour-package-detail.seo.og_image` | **NO** | Add data-cms-img="siteContent/tour-package-detail.seo.og_image" |
| `tour-package-detail.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/tour-package-detail.*` | **NO** | Bind elements |
| `tour-package-detail.html` | Page Images (0/0 bound) | **image** | `siteContent/tour-package-detail.*` | **NO** | None |
| `tours/adventure/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/adventure/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/adventure/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourCategories/adventure.seo.description" |
| `tours/adventure/index.html` | OpenGraph Image (og:image) | **seo** | `tourCategories/adventure.seo.og_image` | **NO** | Add data-cms-img="tourCategories/adventure.seo.og_image" |
| `tours/adventure/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/adventure/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/adventure.map.url` | **NO** | Add data-cms-img="tourCategories/adventure.map.url" |
| `tours/adventure/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/adventure.map.url` | **NO** | Add data-cms-img="tourCategories/adventure.map.url" |
| `tours/adventure/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/adventure.map.url` | **NO** | Add data-cms-img="tourCategories/adventure.map.url" |
| `tours/adventure/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/adventure/index.html` | Page Text Content (207 text bindings, 4 rich HTML bindings) | **text** | `tourCategories/adventure.*` | **YES** | Group into friendly visual sections |
| `tours/adventure/index.html` | Page Images (4/4 bound) | **image** | `tourCategories/adventure.*` | **YES** | None |
| `tours/adventure/island-adrenaline-rapids-expedition/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/adventure/island-adrenaline-rapids-expedition/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/adventure/island-adrenaline-rapids-expedition/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/island-adrenaline-rapids-expedition.seo.description" |
| `tours/adventure/island-adrenaline-rapids-expedition/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/island-adrenaline-rapids-expedition.seo.og_image` | **NO** | Add data-cms-img="tourPackages/island-adrenaline-rapids-expedition.seo.og_image" |
| `tours/adventure/island-adrenaline-rapids-expedition/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/island-adrenaline-rapids-expedition.hero.image` | **NO** | Add data-cms-bg="tourPackages/island-adrenaline-rapids-expedition.hero.image" |
| `tours/adventure/island-adrenaline-rapids-expedition/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/adventure/island-adrenaline-rapids-expedition/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/island-adrenaline-rapids-expedition.map.url` | **NO** | Add data-cms-img="tourPackages/island-adrenaline-rapids-expedition.map.url" |
| `tours/adventure/island-adrenaline-rapids-expedition/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/adventure/island-adrenaline-rapids-expedition/index.html` | Page Text Content (191 text bindings, 12 rich HTML bindings) | **text** | `tourPackages/island-adrenaline-rapids-expedition.*` | **YES** | Group into friendly visual sections |
| `tours/adventure/island-adrenaline-rapids-expedition/index.html` | Page Images (3/3 bound) | **image** | `tourPackages/island-adrenaline-rapids-expedition.*` | **YES** | None |
| `tours/adventure/wild-peaks-trails-surf-safari/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/adventure/wild-peaks-trails-surf-safari/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/adventure/wild-peaks-trails-surf-safari/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/wild-peaks-trails-surf-safari.seo.description" |
| `tours/adventure/wild-peaks-trails-surf-safari/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/wild-peaks-trails-surf-safari.seo.og_image` | **NO** | Add data-cms-img="tourPackages/wild-peaks-trails-surf-safari.seo.og_image" |
| `tours/adventure/wild-peaks-trails-surf-safari/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/wild-peaks-trails-surf-safari.hero.image` | **NO** | Add data-cms-bg="tourPackages/wild-peaks-trails-surf-safari.hero.image" |
| `tours/adventure/wild-peaks-trails-surf-safari/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/adventure/wild-peaks-trails-surf-safari/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/wild-peaks-trails-surf-safari.map.url` | **NO** | Add data-cms-img="tourPackages/wild-peaks-trails-surf-safari.map.url" |
| `tours/adventure/wild-peaks-trails-surf-safari/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/adventure/wild-peaks-trails-surf-safari/index.html` | Page Text Content (197 text bindings, 12 rich HTML bindings) | **text** | `tourPackages/wild-peaks-trails-surf-safari.*` | **YES** | Group into friendly visual sections |
| `tours/adventure/wild-peaks-trails-surf-safari/index.html` | Page Images (3/3 bound) | **image** | `tourPackages/wild-peaks-trails-surf-safari.*` | **YES** | None |
| `tours/ayurvedic/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/ayurvedic/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/ayurvedic/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourCategories/ayurvedic.seo.description" |
| `tours/ayurvedic/index.html` | OpenGraph Image (og:image) | **seo** | `tourCategories/ayurvedic.seo.og_image` | **NO** | Add data-cms-img="tourCategories/ayurvedic.seo.og_image" |
| `tours/ayurvedic/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/ayurvedic/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/ayurvedic.map.url` | **NO** | Add data-cms-img="tourCategories/ayurvedic.map.url" |
| `tours/ayurvedic/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/ayurvedic.map.url` | **NO** | Add data-cms-img="tourCategories/ayurvedic.map.url" |
| `tours/ayurvedic/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/ayurvedic.map.url` | **NO** | Add data-cms-img="tourCategories/ayurvedic.map.url" |
| `tours/ayurvedic/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/ayurvedic/index.html` | Page Text Content (198 text bindings, 3 rich HTML bindings) | **text** | `tourCategories/ayurvedic.*` | **YES** | Group into friendly visual sections |
| `tours/ayurvedic/index.html` | Page Images (4/4 bound) | **image** | `tourCategories/ayurvedic.*` | **YES** | None |
| `tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/lotus-ayu-holistic-rejuvenation.seo.description" |
| `tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/lotus-ayu-holistic-rejuvenation.seo.og_image` | **NO** | Add data-cms-img="tourPackages/lotus-ayu-holistic-rejuvenation.seo.og_image" |
| `tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/lotus-ayu-holistic-rejuvenation.hero.image` | **NO** | Add data-cms-bg="tourPackages/lotus-ayu-holistic-rejuvenation.hero.image" |
| `tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/lotus-ayu-holistic-rejuvenation.map.url` | **NO** | Add data-cms-img="tourPackages/lotus-ayu-holistic-rejuvenation.map.url" |
| `tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html` | Page Text Content (195 text bindings, 14 rich HTML bindings) | **text** | `tourPackages/lotus-ayu-holistic-rejuvenation.*` | **YES** | Group into friendly visual sections |
| `tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html` | Page Images (3/3 bound) | **image** | `tourPackages/lotus-ayu-holistic-rejuvenation.*` | **YES** | None |
| `tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/sacred-serenity-forest-meditation-retreat.seo.description" |
| `tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/sacred-serenity-forest-meditation-retreat.seo.og_image` | **NO** | Add data-cms-img="tourPackages/sacred-serenity-forest-meditation-retreat.seo.og_image" |
| `tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/sacred-serenity-forest-meditation-retreat.hero.image` | **NO** | Add data-cms-bg="tourPackages/sacred-serenity-forest-meditation-retreat.hero.image" |
| `tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/sacred-serenity-forest-meditation-retreat.map.url` | **NO** | Add data-cms-img="tourPackages/sacred-serenity-forest-meditation-retreat.map.url" |
| `tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html` | Page Text Content (203 text bindings, 12 rich HTML bindings) | **text** | `tourPackages/sacred-serenity-forest-meditation-retreat.*` | **YES** | Group into friendly visual sections |
| `tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html` | Page Images (3/3 bound) | **image** | `tourPackages/sacred-serenity-forest-meditation-retreat.*` | **YES** | None |
| `tours/beach/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/beach/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/beach/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/beach.map.url` | **NO** | Add data-cms-img="tourCategories/beach.map.url" |
| `tours/beach/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/beach.map.url` | **NO** | Add data-cms-img="tourCategories/beach.map.url" |
| `tours/beach/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/beach.map.url` | **NO** | Add data-cms-img="tourCategories/beach.map.url" |
| `tours/beach/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/beach/index.html` | Page Text Content (292 text bindings, 11 rich HTML bindings) | **text** | `tourCategories/beach.*` | **YES** | Group into friendly visual sections |
| `tours/beach/index.html` | Page Images (5/5 bound) | **image** | `tourCategories/beach.*` | **YES** | None |
| `tours/beach/pristine-seaboard-odyssey/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/beach/pristine-seaboard-odyssey/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/beach/pristine-seaboard-odyssey/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/pristine-seaboard-odyssey.seo.description" |
| `tours/beach/pristine-seaboard-odyssey/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/pristine-seaboard-odyssey.seo.og_image` | **NO** | Add data-cms-img="tourPackages/pristine-seaboard-odyssey.seo.og_image" |
| `tours/beach/pristine-seaboard-odyssey/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/pristine-seaboard-odyssey.hero.image` | **NO** | Add data-cms-bg="tourPackages/pristine-seaboard-odyssey.hero.image" |
| `tours/beach/pristine-seaboard-odyssey/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/beach/pristine-seaboard-odyssey/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/pristine-seaboard-odyssey.map.url` | **NO** | Add data-cms-img="tourPackages/pristine-seaboard-odyssey.map.url" |
| `tours/beach/pristine-seaboard-odyssey/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/beach/pristine-seaboard-odyssey/index.html` | Page Text Content (205 text bindings, 16 rich HTML bindings) | **text** | `tourPackages/pristine-seaboard-odyssey.*` | **YES** | Group into friendly visual sections |
| `tours/beach/pristine-seaboard-odyssey/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/pristine-seaboard-odyssey.*` | **YES** | None |
| `tours/beach/southern-sands-serenade/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/beach/southern-sands-serenade/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/beach/southern-sands-serenade/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/southern-sands-serenade.seo.description" |
| `tours/beach/southern-sands-serenade/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/southern-sands-serenade.seo.og_image` | **NO** | Add data-cms-img="tourPackages/southern-sands-serenade.seo.og_image" |
| `tours/beach/southern-sands-serenade/index.html` | Hero Background Image (CSS background) | **bg-image** | `hero_image` | **YES** | None |
| `tours/beach/southern-sands-serenade/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/beach/southern-sands-serenade/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/southern-sands-serenade.map.url` | **NO** | Add data-cms-img="tourPackages/southern-sands-serenade.map.url" |
| `tours/beach/southern-sands-serenade/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/beach/southern-sands-serenade/index.html` | Page Text Content (199 text bindings, 18 rich HTML bindings) | **text** | `tourPackages/southern-sands-serenade.*` | **YES** | Group into friendly visual sections |
| `tours/beach/southern-sands-serenade/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/southern-sands-serenade.*` | **YES** | None |
| `tours/beach/turquoise-eastern-sanctuary/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/beach/turquoise-eastern-sanctuary/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/beach/turquoise-eastern-sanctuary/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/turquoise-eastern-sanctuary.seo.description" |
| `tours/beach/turquoise-eastern-sanctuary/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/turquoise-eastern-sanctuary.seo.og_image` | **NO** | Add data-cms-img="tourPackages/turquoise-eastern-sanctuary.seo.og_image" |
| `tours/beach/turquoise-eastern-sanctuary/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/turquoise-eastern-sanctuary.hero.image` | **NO** | Add data-cms-bg="tourPackages/turquoise-eastern-sanctuary.hero.image" |
| `tours/beach/turquoise-eastern-sanctuary/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/beach/turquoise-eastern-sanctuary/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/turquoise-eastern-sanctuary.map.url` | **NO** | Add data-cms-img="tourPackages/turquoise-eastern-sanctuary.map.url" |
| `tours/beach/turquoise-eastern-sanctuary/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/beach/turquoise-eastern-sanctuary/index.html` | Page Text Content (201 text bindings, 16 rich HTML bindings) | **text** | `tourPackages/turquoise-eastern-sanctuary.*` | **YES** | Group into friendly visual sections |
| `tours/beach/turquoise-eastern-sanctuary/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/turquoise-eastern-sanctuary.*` | **YES** | None |
| `tours/buddhist-heritage/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/buddhist-heritage/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/buddhist-heritage/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourCategories/buddhist-heritage.seo.description" |
| `tours/buddhist-heritage/index.html` | OpenGraph Image (og:image) | **seo** | `tourCategories/buddhist-heritage.seo.og_image` | **NO** | Add data-cms-img="tourCategories/buddhist-heritage.seo.og_image" |
| `tours/buddhist-heritage/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourCategories/buddhist-heritage.hero.image` | **NO** | Add data-cms-bg="tourCategories/buddhist-heritage.hero.image" |
| `tours/buddhist-heritage/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/buddhist-heritage/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/buddhist-heritage/index.html` | Page Text Content (160 text bindings, 0 rich HTML bindings) | **text** | `tourCategories/buddhist-heritage.*` | **YES** | Group into friendly visual sections |
| `tours/buddhist-heritage/index.html` | Page Images (5/5 bound) | **image** | `tourCategories/buddhist-heritage.*` | **YES** | None |
| `tours/cultural/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/cultural/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/cultural/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/cultural.map.url` | **NO** | Add data-cms-img="tourCategories/cultural.map.url" |
| `tours/cultural/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/cultural.map.url` | **NO** | Add data-cms-img="tourCategories/cultural.map.url" |
| `tours/cultural/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/cultural.map.url` | **NO** | Add data-cms-img="tourCategories/cultural.map.url" |
| `tours/cultural/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/cultural/index.html` | Page Text Content (279 text bindings, 11 rich HTML bindings) | **text** | `tourCategories/cultural.*` | **YES** | Group into friendly visual sections |
| `tours/cultural/index.html` | Page Images (5/5 bound) | **image** | `tourCategories/cultural.*` | **YES** | None |
| `tours/cultural/royal-kingdoms-sacred-temples/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/cultural/royal-kingdoms-sacred-temples/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/cultural/royal-kingdoms-sacred-temples/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/royal-kingdoms-sacred-temples.seo.description" |
| `tours/cultural/royal-kingdoms-sacred-temples/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/royal-kingdoms-sacred-temples.seo.og_image` | **NO** | Add data-cms-img="tourPackages/royal-kingdoms-sacred-temples.seo.og_image" |
| `tours/cultural/royal-kingdoms-sacred-temples/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/royal-kingdoms-sacred-temples.hero.image` | **NO** | Add data-cms-bg="tourPackages/royal-kingdoms-sacred-temples.hero.image" |
| `tours/cultural/royal-kingdoms-sacred-temples/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/cultural/royal-kingdoms-sacred-temples/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/royal-kingdoms-sacred-temples.map.url` | **NO** | Add data-cms-img="tourPackages/royal-kingdoms-sacred-temples.map.url" |
| `tours/cultural/royal-kingdoms-sacred-temples/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/cultural/royal-kingdoms-sacred-temples/index.html` | Page Text Content (189 text bindings, 15 rich HTML bindings) | **text** | `tourPackages/royal-kingdoms-sacred-temples.*` | **YES** | Group into friendly visual sections |
| `tours/cultural/royal-kingdoms-sacred-temples/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/royal-kingdoms-sacred-temples.*` | **YES** | None |
| `tours/cultural/the-sacred-lotus-triangle/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/cultural/the-sacred-lotus-triangle/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/cultural/the-sacred-lotus-triangle/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/the-sacred-lotus-triangle.seo.description" |
| `tours/cultural/the-sacred-lotus-triangle/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/the-sacred-lotus-triangle.seo.og_image` | **NO** | Add data-cms-img="tourPackages/the-sacred-lotus-triangle.seo.og_image" |
| `tours/cultural/the-sacred-lotus-triangle/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/the-sacred-lotus-triangle.hero.image` | **NO** | Add data-cms-bg="tourPackages/the-sacred-lotus-triangle.hero.image" |
| `tours/cultural/the-sacred-lotus-triangle/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/cultural/the-sacred-lotus-triangle/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/the-sacred-lotus-triangle.map.url` | **NO** | Add data-cms-img="tourPackages/the-sacred-lotus-triangle.map.url" |
| `tours/cultural/the-sacred-lotus-triangle/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/cultural/the-sacred-lotus-triangle/index.html` | Page Text Content (195 text bindings, 15 rich HTML bindings) | **text** | `tourPackages/the-sacred-lotus-triangle.*` | **YES** | Group into friendly visual sections |
| `tours/cultural/the-sacred-lotus-triangle/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/the-sacred-lotus-triangle.*` | **YES** | None |
| `tours/cultural/three-millennia-of-living-heritage/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/cultural/three-millennia-of-living-heritage/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/cultural/three-millennia-of-living-heritage/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/three-millennia-of-living-heritage.seo.description" |
| `tours/cultural/three-millennia-of-living-heritage/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/three-millennia-of-living-heritage.seo.og_image` | **NO** | Add data-cms-img="tourPackages/three-millennia-of-living-heritage.seo.og_image" |
| `tours/cultural/three-millennia-of-living-heritage/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/three-millennia-of-living-heritage.hero.image` | **NO** | Add data-cms-bg="tourPackages/three-millennia-of-living-heritage.hero.image" |
| `tours/cultural/three-millennia-of-living-heritage/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/cultural/three-millennia-of-living-heritage/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/three-millennia-of-living-heritage.map.url` | **NO** | Add data-cms-img="tourPackages/three-millennia-of-living-heritage.map.url" |
| `tours/cultural/three-millennia-of-living-heritage/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/cultural/three-millennia-of-living-heritage/index.html` | Page Text Content (207 text bindings, 16 rich HTML bindings) | **text** | `tourPackages/three-millennia-of-living-heritage.*` | **YES** | Group into friendly visual sections |
| `tours/cultural/three-millennia-of-living-heritage/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/three-millennia-of-living-heritage.*` | **YES** | None |
| `tours/detail.html` | Page Title (<title>) | **seo** | `siteContent/tours_detail.seo.title` | **NO** | Add data-cms="siteContent/tours_detail.seo.title" and bind in editor |
| `tours/detail.html` | Meta Description (<meta name="description">) | **seo** | `siteContent/tours_detail.seo.description` | **NO** | Add data-cms="siteContent/tours_detail.seo.description" |
| `tours/detail.html` | OpenGraph Image (og:image) | **seo** | `siteContent/tours_detail.seo.og_image` | **NO** | Add data-cms-img="siteContent/tours_detail.seo.og_image" |
| `tours/detail.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/tours_detail.*` | **NO** | Bind elements |
| `tours/detail.html` | Page Images (0/0 bound) | **image** | `siteContent/tours_detail.*` | **NO** | None |
| `tours/family/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/family/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/family/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourCategories/family.seo.description" |
| `tours/family/index.html` | OpenGraph Image (og:image) | **seo** | `tourCategories/family.seo.og_image` | **NO** | Add data-cms-img="tourCategories/family.seo.og_image" |
| `tours/family/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/family/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/family.map.url` | **NO** | Add data-cms-img="tourCategories/family.map.url" |
| `tours/family/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/family.map.url` | **NO** | Add data-cms-img="tourCategories/family.map.url" |
| `tours/family/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/family.map.url` | **NO** | Add data-cms-img="tourCategories/family.map.url" |
| `tours/family/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/family/index.html` | Page Text Content (241 text bindings, 4 rich HTML bindings) | **text** | `tourCategories/family.*` | **YES** | Group into friendly visual sections |
| `tours/family/index.html` | Page Images (5/5 bound) | **image** | `tourCategories/family.*` | **YES** | None |
| `tours/family/island-wonder-multi-gen-family-discovery/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/family/island-wonder-multi-gen-family-discovery/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/family/island-wonder-multi-gen-family-discovery/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/island-wonder-multi-gen-family-discovery.seo.description" |
| `tours/family/island-wonder-multi-gen-family-discovery/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/island-wonder-multi-gen-family-discovery.seo.og_image` | **NO** | Add data-cms-img="tourPackages/island-wonder-multi-gen-family-discovery.seo.og_image" |
| `tours/family/island-wonder-multi-gen-family-discovery/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/island-wonder-multi-gen-family-discovery.hero.image` | **NO** | Add data-cms-bg="tourPackages/island-wonder-multi-gen-family-discovery.hero.image" |
| `tours/family/island-wonder-multi-gen-family-discovery/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/family/island-wonder-multi-gen-family-discovery/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/island-wonder-multi-gen-family-discovery.map.url` | **NO** | Add data-cms-img="tourPackages/island-wonder-multi-gen-family-discovery.map.url" |
| `tours/family/island-wonder-multi-gen-family-discovery/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/family/island-wonder-multi-gen-family-discovery/index.html` | Page Text Content (199 text bindings, 12 rich HTML bindings) | **text** | `tourPackages/island-wonder-multi-gen-family-discovery.*` | **YES** | Group into friendly visual sections |
| `tours/family/island-wonder-multi-gen-family-discovery/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/island-wonder-multi-gen-family-discovery.*` | **YES** | None |
| `tours/family/the-grand-ceylon-family-adventure/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/family/the-grand-ceylon-family-adventure/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/family/the-grand-ceylon-family-adventure/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/the-grand-ceylon-family-adventure.seo.description" |
| `tours/family/the-grand-ceylon-family-adventure/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/the-grand-ceylon-family-adventure.seo.og_image` | **NO** | Add data-cms-img="tourPackages/the-grand-ceylon-family-adventure.seo.og_image" |
| `tours/family/the-grand-ceylon-family-adventure/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/the-grand-ceylon-family-adventure.hero.image` | **NO** | Add data-cms-bg="tourPackages/the-grand-ceylon-family-adventure.hero.image" |
| `tours/family/the-grand-ceylon-family-adventure/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/family/the-grand-ceylon-family-adventure/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/the-grand-ceylon-family-adventure.map.url` | **NO** | Add data-cms-img="tourPackages/the-grand-ceylon-family-adventure.map.url" |
| `tours/family/the-grand-ceylon-family-adventure/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/family/the-grand-ceylon-family-adventure/index.html` | Page Text Content (207 text bindings, 12 rich HTML bindings) | **text** | `tourPackages/the-grand-ceylon-family-adventure.*` | **YES** | Group into friendly visual sections |
| `tours/family/the-grand-ceylon-family-adventure/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/the-grand-ceylon-family-adventure.*` | **YES** | None |
| `tours/family/wild-safari-coastal-family-holiday/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/family/wild-safari-coastal-family-holiday/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/family/wild-safari-coastal-family-holiday/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/wild-safari-coastal-family-holiday.seo.description" |
| `tours/family/wild-safari-coastal-family-holiday/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/wild-safari-coastal-family-holiday.seo.og_image` | **NO** | Add data-cms-img="tourPackages/wild-safari-coastal-family-holiday.seo.og_image" |
| `tours/family/wild-safari-coastal-family-holiday/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/wild-safari-coastal-family-holiday.hero.image` | **NO** | Add data-cms-bg="tourPackages/wild-safari-coastal-family-holiday.hero.image" |
| `tours/family/wild-safari-coastal-family-holiday/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/family/wild-safari-coastal-family-holiday/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/wild-safari-coastal-family-holiday.map.url` | **NO** | Add data-cms-img="tourPackages/wild-safari-coastal-family-holiday.map.url" |
| `tours/family/wild-safari-coastal-family-holiday/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/family/wild-safari-coastal-family-holiday/index.html` | Page Text Content (203 text bindings, 12 rich HTML bindings) | **text** | `tourPackages/wild-safari-coastal-family-holiday.*` | **YES** | Group into friendly visual sections |
| `tours/family/wild-safari-coastal-family-holiday/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/wild-safari-coastal-family-holiday.*` | **YES** | None |
| `tours/golf/highland-greens-coastal-links-championship/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/golf/highland-greens-coastal-links-championship/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/golf/highland-greens-coastal-links-championship/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/highland-greens-coastal-links-championship.seo.description" |
| `tours/golf/highland-greens-coastal-links-championship/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/highland-greens-coastal-links-championship.seo.og_image` | **NO** | Add data-cms-img="tourPackages/highland-greens-coastal-links-championship.seo.og_image" |
| `tours/golf/highland-greens-coastal-links-championship/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/highland-greens-coastal-links-championship.hero.image` | **NO** | Add data-cms-bg="tourPackages/highland-greens-coastal-links-championship.hero.image" |
| `tours/golf/highland-greens-coastal-links-championship/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/golf/highland-greens-coastal-links-championship/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/highland-greens-coastal-links-championship.map.url` | **NO** | Add data-cms-img="tourPackages/highland-greens-coastal-links-championship.map.url" |
| `tours/golf/highland-greens-coastal-links-championship/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/golf/highland-greens-coastal-links-championship/index.html` | Page Text Content (199 text bindings, 12 rich HTML bindings) | **text** | `tourPackages/highland-greens-coastal-links-championship.*` | **YES** | Group into friendly visual sections |
| `tours/golf/highland-greens-coastal-links-championship/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/highland-greens-coastal-links-championship.*` | **YES** | None |
| `tours/golf/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/golf/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/golf/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourCategories/golf.seo.description" |
| `tours/golf/index.html` | OpenGraph Image (og:image) | **seo** | `tourCategories/golf.seo.og_image` | **NO** | Add data-cms-img="tourCategories/golf.seo.og_image" |
| `tours/golf/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/golf/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/golf.map.url` | **NO** | Add data-cms-img="tourCategories/golf.map.url" |
| `tours/golf/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/golf.map.url` | **NO** | Add data-cms-img="tourCategories/golf.map.url" |
| `tours/golf/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/golf.map.url` | **NO** | Add data-cms-img="tourCategories/golf.map.url" |
| `tours/golf/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/golf/index.html` | Page Text Content (209 text bindings, 5 rich HTML bindings) | **text** | `tourCategories/golf.*` | **YES** | Group into friendly visual sections |
| `tours/golf/index.html` | Page Images (5/5 bound) | **image** | `tourCategories/golf.*` | **YES** | None |
| `tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/the-grand-ceylon-masters-golf-odyssey.seo.description" |
| `tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/the-grand-ceylon-masters-golf-odyssey.seo.og_image` | **NO** | Add data-cms-img="tourPackages/the-grand-ceylon-masters-golf-odyssey.seo.og_image" |
| `tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/the-grand-ceylon-masters-golf-odyssey.hero.image` | **NO** | Add data-cms-bg="tourPackages/the-grand-ceylon-masters-golf-odyssey.hero.image" |
| `tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/the-grand-ceylon-masters-golf-odyssey.map.url` | **NO** | Add data-cms-img="tourPackages/the-grand-ceylon-masters-golf-odyssey.map.url" |
| `tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html` | Page Text Content (203 text bindings, 12 rich HTML bindings) | **text** | `tourPackages/the-grand-ceylon-masters-golf-odyssey.*` | **YES** | Group into friendly visual sections |
| `tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/the-grand-ceylon-masters-golf-odyssey.*` | **YES** | None |
| `tours/golf/the-royal-ceylon-fairways-tour/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/golf/the-royal-ceylon-fairways-tour/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/golf/the-royal-ceylon-fairways-tour/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/the-royal-ceylon-fairways-tour.seo.description" |
| `tours/golf/the-royal-ceylon-fairways-tour/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/the-royal-ceylon-fairways-tour.seo.og_image` | **NO** | Add data-cms-img="tourPackages/the-royal-ceylon-fairways-tour.seo.og_image" |
| `tours/golf/the-royal-ceylon-fairways-tour/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/the-royal-ceylon-fairways-tour.hero.image` | **NO** | Add data-cms-bg="tourPackages/the-royal-ceylon-fairways-tour.hero.image" |
| `tours/golf/the-royal-ceylon-fairways-tour/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/golf/the-royal-ceylon-fairways-tour/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/the-royal-ceylon-fairways-tour.map.url` | **NO** | Add data-cms-img="tourPackages/the-royal-ceylon-fairways-tour.map.url" |
| `tours/golf/the-royal-ceylon-fairways-tour/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/golf/the-royal-ceylon-fairways-tour/index.html` | Page Text Content (193 text bindings, 12 rich HTML bindings) | **text** | `tourPackages/the-royal-ceylon-fairways-tour.*` | **YES** | Group into friendly visual sections |
| `tours/golf/the-royal-ceylon-fairways-tour/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/the-royal-ceylon-fairways-tour.*` | **YES** | None |
| `tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/ceylon-tea-trails-colonial-grandeur.seo.description" |
| `tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/ceylon-tea-trails-colonial-grandeur.seo.og_image` | **NO** | Add data-cms-img="tourPackages/ceylon-tea-trails-colonial-grandeur.seo.og_image" |
| `tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/ceylon-tea-trails-colonial-grandeur.hero.image` | **NO** | Add data-cms-bg="tourPackages/ceylon-tea-trails-colonial-grandeur.hero.image" |
| `tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/ceylon-tea-trails-colonial-grandeur.map.url` | **NO** | Add data-cms-img="tourPackages/ceylon-tea-trails-colonial-grandeur.map.url" |
| `tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html` | Page Text Content (195 text bindings, 16 rich HTML bindings) | **text** | `tourPackages/ceylon-tea-trails-colonial-grandeur.*` | **YES** | Group into friendly visual sections |
| `tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/ceylon-tea-trails-colonial-grandeur.*` | **YES** | None |
| `tours/hill-country/highland-wilderness-cascading-waterfalls/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/hill-country/highland-wilderness-cascading-waterfalls/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/hill-country/highland-wilderness-cascading-waterfalls/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/highland-wilderness-cascading-waterfalls.seo.description" |
| `tours/hill-country/highland-wilderness-cascading-waterfalls/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/highland-wilderness-cascading-waterfalls.seo.og_image` | **NO** | Add data-cms-img="tourPackages/highland-wilderness-cascading-waterfalls.seo.og_image" |
| `tours/hill-country/highland-wilderness-cascading-waterfalls/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/highland-wilderness-cascading-waterfalls.hero.image` | **NO** | Add data-cms-bg="tourPackages/highland-wilderness-cascading-waterfalls.hero.image" |
| `tours/hill-country/highland-wilderness-cascading-waterfalls/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/hill-country/highland-wilderness-cascading-waterfalls/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/highland-wilderness-cascading-waterfalls.map.url` | **NO** | Add data-cms-img="tourPackages/highland-wilderness-cascading-waterfalls.map.url" |
| `tours/hill-country/highland-wilderness-cascading-waterfalls/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/hill-country/highland-wilderness-cascading-waterfalls/index.html` | Page Text Content (203 text bindings, 12 rich HTML bindings) | **text** | `tourPackages/highland-wilderness-cascading-waterfalls.*` | **YES** | Group into friendly visual sections |
| `tours/hill-country/highland-wilderness-cascading-waterfalls/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/highland-wilderness-cascading-waterfalls.*` | **YES** | None |
| `tours/hill-country/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/hill-country/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/hill-country/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourCategories/hill-country.seo.description" |
| `tours/hill-country/index.html` | OpenGraph Image (og:image) | **seo** | `tourCategories/hill-country.seo.og_image` | **NO** | Add data-cms-img="tourCategories/hill-country.seo.og_image" |
| `tours/hill-country/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/hill-country/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/hill-country.map.url` | **NO** | Add data-cms-img="tourCategories/hill-country.map.url" |
| `tours/hill-country/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/hill-country.map.url` | **NO** | Add data-cms-img="tourCategories/hill-country.map.url" |
| `tours/hill-country/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/hill-country.map.url` | **NO** | Add data-cms-img="tourCategories/hill-country.map.url" |
| `tours/hill-country/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/hill-country/index.html` | Page Text Content (228 text bindings, 5 rich HTML bindings) | **text** | `tourCategories/hill-country.*` | **YES** | Group into friendly visual sections |
| `tours/hill-country/index.html` | Page Images (5/5 bound) | **image** | `tourCategories/hill-country.*` | **YES** | None |
| `tours/hill-country/misty-peaks-scenic-railways-expedition/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/hill-country/misty-peaks-scenic-railways-expedition/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/hill-country/misty-peaks-scenic-railways-expedition/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/misty-peaks-scenic-railways-expedition.seo.description" |
| `tours/hill-country/misty-peaks-scenic-railways-expedition/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/misty-peaks-scenic-railways-expedition.seo.og_image` | **NO** | Add data-cms-img="tourPackages/misty-peaks-scenic-railways-expedition.seo.og_image" |
| `tours/hill-country/misty-peaks-scenic-railways-expedition/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/misty-peaks-scenic-railways-expedition.hero.image` | **NO** | Add data-cms-bg="tourPackages/misty-peaks-scenic-railways-expedition.hero.image" |
| `tours/hill-country/misty-peaks-scenic-railways-expedition/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/hill-country/misty-peaks-scenic-railways-expedition/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/misty-peaks-scenic-railways-expedition.map.url` | **NO** | Add data-cms-img="tourPackages/misty-peaks-scenic-railways-expedition.map.url" |
| `tours/hill-country/misty-peaks-scenic-railways-expedition/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/hill-country/misty-peaks-scenic-railways-expedition/index.html` | Page Text Content (199 text bindings, 14 rich HTML bindings) | **text** | `tourPackages/misty-peaks-scenic-railways-expedition.*` | **YES** | Group into friendly visual sections |
| `tours/hill-country/misty-peaks-scenic-railways-expedition/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/misty-peaks-scenic-railways-expedition.*` | **YES** | None |
| `tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/enchanted-ceylon-romantic-hideaway.seo.description" |
| `tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/enchanted-ceylon-romantic-hideaway.seo.og_image` | **NO** | Add data-cms-img="tourPackages/enchanted-ceylon-romantic-hideaway.seo.og_image" |
| `tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/enchanted-ceylon-romantic-hideaway.hero.image` | **NO** | Add data-cms-bg="tourPackages/enchanted-ceylon-romantic-hideaway.hero.image" |
| `tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/enchanted-ceylon-romantic-hideaway.map.url` | **NO** | Add data-cms-img="tourPackages/enchanted-ceylon-romantic-hideaway.map.url" |
| `tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html` | Page Text Content (193 text bindings, 13 rich HTML bindings) | **text** | `tourPackages/enchanted-ceylon-romantic-hideaway.*` | **YES** | Group into friendly visual sections |
| `tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html` | Page Images (3/3 bound) | **image** | `tourPackages/enchanted-ceylon-romantic-hideaway.*` | **YES** | None |
| `tours/honeymoon/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/honeymoon/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/honeymoon/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourCategories/honeymoon.seo.description" |
| `tours/honeymoon/index.html` | OpenGraph Image (og:image) | **seo** | `tourCategories/honeymoon.seo.og_image` | **NO** | Add data-cms-img="tourCategories/honeymoon.seo.og_image" |
| `tours/honeymoon/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/honeymoon/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/honeymoon.map.url` | **NO** | Add data-cms-img="tourCategories/honeymoon.map.url" |
| `tours/honeymoon/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/honeymoon.map.url` | **NO** | Add data-cms-img="tourCategories/honeymoon.map.url" |
| `tours/honeymoon/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/honeymoon.map.url` | **NO** | Add data-cms-img="tourCategories/honeymoon.map.url" |
| `tours/honeymoon/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/honeymoon/index.html` | Page Text Content (210 text bindings, 3 rich HTML bindings) | **text** | `tourCategories/honeymoon.*` | **YES** | Group into friendly visual sections |
| `tours/honeymoon/index.html` | Page Images (4/4 bound) | **image** | `tourCategories/honeymoon.*` | **YES** | None |
| `tours/honeymoon/pure-serenade-coastal-highland-romance/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/honeymoon/pure-serenade-coastal-highland-romance/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/honeymoon/pure-serenade-coastal-highland-romance/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/pure-serenade-coastal-highland-romance.seo.description" |
| `tours/honeymoon/pure-serenade-coastal-highland-romance/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/pure-serenade-coastal-highland-romance.seo.og_image` | **NO** | Add data-cms-img="tourPackages/pure-serenade-coastal-highland-romance.seo.og_image" |
| `tours/honeymoon/pure-serenade-coastal-highland-romance/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/pure-serenade-coastal-highland-romance.hero.image` | **NO** | Add data-cms-bg="tourPackages/pure-serenade-coastal-highland-romance.hero.image" |
| `tours/honeymoon/pure-serenade-coastal-highland-romance/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/honeymoon/pure-serenade-coastal-highland-romance/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/pure-serenade-coastal-highland-romance.map.url` | **NO** | Add data-cms-img="tourPackages/pure-serenade-coastal-highland-romance.map.url" |
| `tours/honeymoon/pure-serenade-coastal-highland-romance/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/honeymoon/pure-serenade-coastal-highland-romance/index.html` | Page Text Content (199 text bindings, 13 rich HTML bindings) | **text** | `tourPackages/pure-serenade-coastal-highland-romance.*` | **YES** | Group into friendly visual sections |
| `tours/honeymoon/pure-serenade-coastal-highland-romance/index.html` | Page Images (3/3 bound) | **image** | `tourPackages/pure-serenade-coastal-highland-romance.*` | **YES** | None |
| `tours/index.html` | Page Title (<title>) | **seo** | `siteContent/toursIndex.seo.title` | **NO** | Add data-cms="siteContent/toursIndex.seo.title" and bind in editor |
| `tours/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/index.html` | Interactive Map / Route Map Image | **image** | `siteContent/toursIndex.map.url` | **NO** | Add data-cms-img="siteContent/toursIndex.map.url" |
| `tours/index.html` | Interactive Map / Route Map Image | **image** | `siteContent/toursIndex.map.url` | **NO** | Add data-cms-img="siteContent/toursIndex.map.url" |
| `tours/index.html` | Interactive Map / Route Map Image | **image** | `siteContent/toursIndex.map.url` | **NO** | Add data-cms-img="siteContent/toursIndex.map.url" |
| `tours/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/index.html` | Page Text Content (285 text bindings, 38 rich HTML bindings) | **text** | `siteContent/toursIndex.*` | **YES** | Group into friendly visual sections |
| `tours/index.html` | Page Images (12/12 bound) | **image** | `siteContent/toursIndex.*` | **YES** | None |
| `tours/ramayana/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/ramayana/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/ramayana/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourCategories/ramayana.seo.description" |
| `tours/ramayana/index.html` | OpenGraph Image (og:image) | **seo** | `tourCategories/ramayana.seo.og_image` | **NO** | Add data-cms-img="tourCategories/ramayana.seo.og_image" |
| `tours/ramayana/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/ramayana/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/ramayana.map.url` | **NO** | Add data-cms-img="tourCategories/ramayana.map.url" |
| `tours/ramayana/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/ramayana.map.url` | **NO** | Add data-cms-img="tourCategories/ramayana.map.url" |
| `tours/ramayana/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/ramayana.map.url` | **NO** | Add data-cms-img="tourCategories/ramayana.map.url" |
| `tours/ramayana/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/ramayana/index.html` | Page Text Content (204 text bindings, 4 rich HTML bindings) | **text** | `tourCategories/ramayana.*` | **YES** | Group into friendly visual sections |
| `tours/ramayana/index.html` | Page Images (4/4 bound) | **image** | `tourCategories/ramayana.*` | **YES** | None |
| `tours/ramayana/sacred-ramayana-heritage-trail/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/ramayana/sacred-ramayana-heritage-trail/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/ramayana/sacred-ramayana-heritage-trail/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/sacred-ramayana-heritage-trail.seo.description" |
| `tours/ramayana/sacred-ramayana-heritage-trail/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/sacred-ramayana-heritage-trail.seo.og_image` | **NO** | Add data-cms-img="tourPackages/sacred-ramayana-heritage-trail.seo.og_image" |
| `tours/ramayana/sacred-ramayana-heritage-trail/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/sacred-ramayana-heritage-trail.hero.image` | **NO** | Add data-cms-bg="tourPackages/sacred-ramayana-heritage-trail.hero.image" |
| `tours/ramayana/sacred-ramayana-heritage-trail/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/ramayana/sacred-ramayana-heritage-trail/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/sacred-ramayana-heritage-trail.map.url` | **NO** | Add data-cms-img="tourPackages/sacred-ramayana-heritage-trail.map.url" |
| `tours/ramayana/sacred-ramayana-heritage-trail/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/ramayana/sacred-ramayana-heritage-trail/index.html` | Page Text Content (189 text bindings, 12 rich HTML bindings) | **text** | `tourPackages/sacred-ramayana-heritage-trail.*` | **YES** | Group into friendly visual sections |
| `tours/ramayana/sacred-ramayana-heritage-trail/index.html` | Page Images (3/3 bound) | **image** | `tourPackages/sacred-ramayana-heritage-trail.*` | **YES** | None |
| `tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/the-epic-ramayana-chronicle-pilgrimage.seo.description" |
| `tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/the-epic-ramayana-chronicle-pilgrimage.seo.og_image` | **NO** | Add data-cms-img="tourPackages/the-epic-ramayana-chronicle-pilgrimage.seo.og_image" |
| `tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/the-epic-ramayana-chronicle-pilgrimage.hero.image` | **NO** | Add data-cms-bg="tourPackages/the-epic-ramayana-chronicle-pilgrimage.hero.image" |
| `tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/the-epic-ramayana-chronicle-pilgrimage.map.url` | **NO** | Add data-cms-img="tourPackages/the-epic-ramayana-chronicle-pilgrimage.map.url" |
| `tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html` | Page Text Content (195 text bindings, 12 rich HTML bindings) | **text** | `tourPackages/the-epic-ramayana-chronicle-pilgrimage.*` | **YES** | Group into friendly visual sections |
| `tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html` | Page Images (3/3 bound) | **image** | `tourPackages/the-epic-ramayana-chronicle-pilgrimage.*` | **YES** | None |
| `tours/wildlife/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/wildlife/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/wildlife/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/wildlife.map.url` | **NO** | Add data-cms-img="tourCategories/wildlife.map.url" |
| `tours/wildlife/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/wildlife.map.url` | **NO** | Add data-cms-img="tourCategories/wildlife.map.url" |
| `tours/wildlife/index.html` | Interactive Map / Route Map Image | **image** | `tourCategories/wildlife.map.url` | **NO** | Add data-cms-img="tourCategories/wildlife.map.url" |
| `tours/wildlife/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/wildlife/index.html` | Page Text Content (285 text bindings, 11 rich HTML bindings) | **text** | `tourCategories/wildlife.*` | **YES** | Group into friendly visual sections |
| `tours/wildlife/index.html` | Page Images (5/5 bound) | **image** | `tourCategories/wildlife.*` | **YES** | None |
| `tours/wildlife/the-sri-lanka-big-five-expedition/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/wildlife/the-sri-lanka-big-five-expedition/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/wildlife/the-sri-lanka-big-five-expedition/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/the-sri-lanka-big-five-expedition.seo.description" |
| `tours/wildlife/the-sri-lanka-big-five-expedition/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/the-sri-lanka-big-five-expedition.seo.og_image` | **NO** | Add data-cms-img="tourPackages/the-sri-lanka-big-five-expedition.seo.og_image" |
| `tours/wildlife/the-sri-lanka-big-five-expedition/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/the-sri-lanka-big-five-expedition.hero.image` | **NO** | Add data-cms-bg="tourPackages/the-sri-lanka-big-five-expedition.hero.image" |
| `tours/wildlife/the-sri-lanka-big-five-expedition/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/wildlife/the-sri-lanka-big-five-expedition/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/the-sri-lanka-big-five-expedition.map.url` | **NO** | Add data-cms-img="tourPackages/the-sri-lanka-big-five-expedition.map.url" |
| `tours/wildlife/the-sri-lanka-big-five-expedition/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/wildlife/the-sri-lanka-big-five-expedition/index.html` | Page Text Content (205 text bindings, 16 rich HTML bindings) | **text** | `tourPackages/the-sri-lanka-big-five-expedition.*` | **YES** | Group into friendly visual sections |
| `tours/wildlife/the-sri-lanka-big-five-expedition/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/the-sri-lanka-big-five-expedition.*` | **YES** | None |
| `tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/untamed-biosphere-rainforest-odyssey.seo.description" |
| `tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/untamed-biosphere-rainforest-odyssey.seo.og_image` | **NO** | Add data-cms-img="tourPackages/untamed-biosphere-rainforest-odyssey.seo.og_image" |
| `tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/untamed-biosphere-rainforest-odyssey.hero.image` | **NO** | Add data-cms-bg="tourPackages/untamed-biosphere-rainforest-odyssey.hero.image" |
| `tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/untamed-biosphere-rainforest-odyssey.map.url` | **NO** | Add data-cms-img="tourPackages/untamed-biosphere-rainforest-odyssey.map.url" |
| `tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html` | Page Text Content (211 text bindings, 16 rich HTML bindings) | **text** | `tourPackages/untamed-biosphere-rainforest-odyssey.*` | **YES** | Group into friendly visual sections |
| `tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/untamed-biosphere-rainforest-odyssey.*` | **YES** | None |
| `tours/wildlife/wild-ceylon-predator-elephant-trail/index.html` | Favicon (<link rel="icon">) | **image** | `siteGlobal.branding.favicon` | **NO** | Add data-cms-img="siteGlobal.branding.favicon" and Firestore field |
| `tours/wildlife/wild-ceylon-predator-elephant-trail/index.html` | Page Title (<title>) | **seo** | `seo.title` | **YES** | None |
| `tours/wildlife/wild-ceylon-predator-elephant-trail/index.html` | Meta Description (<meta name="description">) | **seo** | `seo.description` | **NO** | Add data-cms="tourPackages/wild-ceylon-predator-elephant-trail.seo.description" |
| `tours/wildlife/wild-ceylon-predator-elephant-trail/index.html` | OpenGraph Image (og:image) | **seo** | `tourPackages/wild-ceylon-predator-elephant-trail.seo.og_image` | **NO** | Add data-cms-img="tourPackages/wild-ceylon-predator-elephant-trail.seo.og_image" |
| `tours/wildlife/wild-ceylon-predator-elephant-trail/index.html` | Hero Background Image (CSS background) | **bg-image** | `tourPackages/wild-ceylon-predator-elephant-trail.hero.image` | **NO** | Add data-cms-bg="tourPackages/wild-ceylon-predator-elephant-trail.hero.image" |
| `tours/wildlife/wild-ceylon-predator-elephant-trail/index.html` | Brand Logo (Header) | **image** | `siteGlobal.branding.logo` | **YES** | None |
| `tours/wildlife/wild-ceylon-predator-elephant-trail/index.html` | Interactive Map / Route Map Image | **image** | `tourPackages/wild-ceylon-predator-elephant-trail.map.url` | **NO** | Add data-cms-img="tourPackages/wild-ceylon-predator-elephant-trail.map.url" |
| `tours/wildlife/wild-ceylon-predator-elephant-trail/index.html` | Floating WhatsApp Concierge Link | **link** | `siteGlobal.contact.whatsappUrl` | **YES** | None |
| `tours/wildlife/wild-ceylon-predator-elephant-trail/index.html` | Page Text Content (193 text bindings, 15 rich HTML bindings) | **text** | `tourPackages/wild-ceylon-predator-elephant-trail.*` | **YES** | Group into friendly visual sections |
| `tours/wildlife/wild-ceylon-predator-elephant-trail/index.html` | Page Images (4/4 bound) | **image** | `tourPackages/wild-ceylon-predator-elephant-trail.*` | **YES** | None |
| `tours.html` | Page Title (<title>) | **seo** | `siteContent/tours.seo.title` | **NO** | Add data-cms="siteContent/tours.seo.title" and bind in editor |
| `tours.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/tours.*` | **NO** | Bind elements |
| `tours.html` | Page Images (0/0 bound) | **image** | `siteContent/tours.*` | **NO** | None |
| `wildlife-tours.html` | Page Title (<title>) | **seo** | `siteContent/wildlife-tours.seo.title` | **NO** | Add data-cms="siteContent/wildlife-tours.seo.title" and bind in editor |
| `wildlife-tours.html` | Page Text Content (0 text bindings, 0 rich HTML bindings) | **text** | `siteContent/wildlife-tours.*` | **NO** | Bind elements |
| `wildlife-tours.html` | Page Images (0/0 bound) | **image** | `siteContent/wildlife-tours.*` | **NO** | None |
