# LOTUS CEYLON International Tours & Services (Pvt) Ltd
### Official Website — Travel Inquiry System

> **Pure Journeys. Sacred Experiences.**  
> Dedicated to bespoke Sri Lankan holidays since 2014.

---

## 🌺 Brand Identity & Design System

* **Brand Name:** LOTUS CEYLON International Tours & Services (Pvt) Ltd
* **Slogan:** PURE JOURNEYS. SACRED EXPERIENCES.
* **Logo:** Circular gold lotus + Sri Lanka map emblem (`logo.png`)
* **Color Palette:**
  * **Rich Gold Gradient:** `#C9962B` to `#F2C14E` (accent buttons, borders, highlights)
  * **Warm Cream / Ivory Background:** `#FBF6EA` & `#F4EED9`
  * **Deep Brown Typography:** `#3B2A14`
  * **Teal Accent:** `#1F8A8A` (subtle badges, icons, hover accents)
* **Typography:**
  * Headings: *Playfair Display* (elegant serif)
  * Body: *Poppins* (clean, accessible sans-serif)
* **Motifs:** Delicate lotus dividers, watermark accents, soft shadows, rounded surfaces.

---

## 📁 File Structure

```text
├── index.html               # Flagship Home Page (Hero, Trip Finder, Tours, Experiences, Reviews, FAQ)
├── inquiry-detailed.html    # Dedicated 14-Field Detailed Travel Inquiry Form
├── inquiry-quick.html       # Streamlined 7-Field Quick Travel Inquiry Form
├── logo.png                 # Circular gold lotus + Sri Lanka map logo
├── README.md                # Hosting & configuration guide
│
├── css/
│   └── style.css            # Master responsive stylesheet with Arabic RTL support
│
├── js/
│   ├── config.js            # Central configuration (WhatsApp, email, address, maps)
│   ├── countries.js         # Comprehensive global country dataset with flags & dial codes
│   ├── i18n.js              # 10-language translations engine & Arabic RTL handler
│   └── form.js              # Validation, auto-calc pax, date bounds, submission & WhatsApp
│
└── assets/
    ├── images/
    │   ├── logo.png         # Logo file asset
    │   ├── hero-nine-arches.jpg # Scenery hero banner (Nine Arches Bridge Ella)
    │   ├── sigiriya.jpg     # Sigiriya Rock Fortress
    │   ├── wildlife.jpg     # Safari & Elephants
    │   ├── tea-country.jpg  # Misty Tea Hills
    │   ├── beach-galle.jpg  # Galle Dutch Fort & Southern Coast
    │   └── temple-culture.jpg # Sacred Ceylon Temples
    └── qr/
        ├── whatsapp-qr.png  # WhatsApp direct chat QR code
        ├── wechat-qr.png    # WeChat direct connect QR code
        └── line-qr.png      # LINE direct connect QR code
```

---

## 📋 Features Overview

### 1. Detailed Inquiry Form (`index.html` & `inquiry-detailed.html`)
Fields configured in exact order:
1. **Name** – Text input, required, real-time validation.
2. **Country of Residence** – Searchable dropdown with country flags, required.
3. **Email Address** – Required, RFC regex validation with friendly error messages.
4. **WhatsApp Number** – Country dial code selector (with flag & searchable code) + telephone input, required.
5. **Arrival Date** – Date picker, required, restricted so dates cannot be in the past (`min="today"`).
6. **Departure Date** – Date picker, required, automatically constrained to dates after the chosen arrival date.
7. **No. of Pax** – Adults (12+ yrs, 1–15) and Children (6–12 yrs, 0–10) dropdowns with **dynamic real-time total calculation badge**.
8. **Hotel Category** – Multi-select cards (Boutique / Heritage Villa, 5-Star Luxury, 4-Star Superior, 3-Star Standard, Budget / Eco Stays) plus an optional star-rating dropdown selector.
9. **No. of Rooms** – Dropdown (1 to 10+ rooms).
10. **Meal Plan** – Checkbox tiles: Bed & Breakfast (BB), Half Board (HB), Full Board (FB).
11. **Interests** – Interactive tiles with custom SVG icons: Culture & Heritage, Nature, Ancient & Archaeology, Wildlife, Adventure, Beach, Shopping.
12. **Targeted Package Budget** – Required, multi-currency selector (USD default, EUR, GBP, AUD, CAD, CHF, JPY, CNY, INR, AED, SAR, RUB, LKR) + amount input.
13. **Other Requirements** – Textarea with character counter (0 / 1000).
14. **Submit Button** – "Submit Inquiry" with yellow-gold gradient and hover micro-animations.

### 2. Quick Inquiry Form (`inquiry-quick.html`)
Streamlined 7-field fast-track version:
* Name, Country, Email, Arrival Date, Departure Date, No. of Pax (with dynamic calculation), Hotel Category, and Spam Protection.
* Clear cross-link banner: *"Need full customization? Use the Detailed Inquiry Form ➔"*.

### 3. Multi-Language Switcher & Arabic RTL Support
Supports 10 languages:
* 🇬🇧 **English (EN)**
* 🇮🇳 **Hindi (HI)**
* 🇫🇷 **French (FR)**
* 🇮🇹 **Italian (IT)**
* 🇨🇳 **Chinese (ZH)**
* 🇯🇵 **Japanese (JA)**
* 🇦🇪 **Arabic (AR)** — Automatically flips layout to **RTL (`dir="rtl"`)** and mirrors UI elements
* 🇩🇪 **German (DE)**
* 🇪🇸 **Spanish (ES)**
* 🇷🇺 **Russian (RU)**

### 4. Spam Protection
* **Honeypot Field:** Hidden input (`hp_website_lotus`) that catches automated bots without disrupting legitimate users.
* **Human Verification:** Custom interactive "Lotus Spam Guard" verification checkbox.

### 5. Multi-Channel Submission (Email & WhatsApp)
* **Formspree / EmailJS / Custom API:** Configurable endpoint in `js/config.js`.
* **WhatsApp Instant Handover:** The thank-you modal automatically prepares a formatted, human-readable WhatsApp itinerary message with reference number (`LC-2026-XXXXXX`) that opens directly in WhatsApp with one click!

---

## ⚙️ How to Edit Settings in `js/config.js`

You can update company details, contact information, map embed, and backend endpoints in `js/config.js` without touching HTML or CSS:

```javascript
const LOTUS_CONFIG = {
  // Brand details
  companyName: "LOTUS CEYLON International Tours & Services (Pvt) Ltd",
  slogan: "PURE JOURNEYS. SACRED EXPERIENCES.",

  // Contact info
  phone: "+94 71 54 22 384",
  phoneRaw: "94715422384",
  email: "inquiry@lotusceylon.com",

  // Physical address
  address: {
    line1: "286/C, Niwandama South",
    city: "Ja-Ela",
    country: "Sri Lanka",
    postalCode: "11350"
  },

  // Google Maps embed URL
  googleMapEmbedUrl: "https://www.google.com/maps/embed?...",

  // Submission endpoint
  submission: {
    provider: "formspree", // 'formspree', 'emailjs', or 'custom_api'
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID"
  }
};
```

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

This project is built using 100% vanilla HTML, CSS, and JavaScript with relative paths, making it directly hostable on GitHub Pages for free.

### Step 1: Initialize Git and Commit
Open PowerShell or Terminal in this folder:

```bash
git init
git add .
git commit -m "Initial commit of Lotus Ceylon website inquiry forms"
```

### Step 2: Push to GitHub
1. Create a new repository on [GitHub.com](https://github.com) (e.g. `lotus-ceylon-tours`).
2. Link your local project to the GitHub repository:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lotus-ceylon-tours.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (tab at top).
3. In the left navigation menu, click **Pages**.
4. Under **Build and deployment**:
   * **Source:** Select `Deploy from a branch`.
   * **Branch:** Select `main` and folder `/ (root)`.
5. Click **Save**.

Within 1–2 minutes, your website will be live at:
`https://YOUR_USERNAME.github.io/lotus-ceylon-tours/`

---

## 📱 Mobile & Accessibility Standards
* Responsive viewport meta configured for iOS, Android, and tablets.
* WCAG contrast-compliant palette.
* Touch target sizes minimum 44px for buttons, checkboxes, and pickers.
* Keyboard navigable (Tab, Enter, Escape on dropdowns).
* Floating WhatsApp badge positioned conveniently in the bottom-right corner.


---

## 🔒 Developer Note: Protected Design Attribution Credit

* **Protected Attribution Text:** `"Website Designed & Developed by Infinite Design"`
* **Protected Link:** `https://infiniteweb.dev/`
* **Generator Tag:** `<meta name="generator" content="Built by Infinite Design — https://infiniteweb.dev/">`
* **Single Source of Truth in Code:**
  1. `partials/footer.html` (line 137)
  2. `assets/js/site-data.js` (`SiteData.ensureDesignCredit()`)
* **Tamper Protection & Locking Rules:**
  - The design attribution credit is **locked in code** and intentionally **excluded** from the Firestore `pageContent`, `siteSettings`, and CMS JSON registries.
  - The Admin Panel contains **no fields, toggles, or controls** to edit, hide, or remove this attribution.
  - In the click-to-edit PageEditor (`admin/js/page-editor.js`), clicking the design attribution displays an informative lock banner explaining that developer attribution is permanently protected.
  - `SiteData.ensureDesignCredit()` executes on `DOMContentLoaded`, on dynamic hydration (`hydrateDOM()`), and monitors DOM mutations via a `MutationObserver`. If the attribution link, text, or meta generator tag is removed, detached, or rendered invisible (e.g. `display: none`, `visibility: hidden`, `opacity: 0`, zero dimensions), it is automatically reinstated in real time.
  - **No remote dependencies, kill-switches, phone-home beacons, or obfuscation** are employed; protection is purely client-side code integrity preservation.

---

## 🧭 CMS Administration Guide: Where to Edit What

The Admin Panel navigation mirrors the public website navigation structure. Top-level tabs correspond to website pages, each containing section sub-tabs. Linked dynamic items (tours, categories, destinations, experiences, reviews, gallery photos, and blog posts) are edited in their dedicated source manager to ensure a single source of truth across all pages.

### 1. Home (`index.html`)
* **Hero** (`#hero`): Hero headline, sub-headline, primary and secondary CTA button labels and URLs, background slides and video.
* **Why Travel With Us** (`#whyUs`): Section heading, subtext, 4 value pillars (titles, descriptions, and iconography).
* **Category Showcase** (Linked): Section heading, subheading, and item count. *To manage categories, go to Tours > Categories.*
* **Featured Tours** (Linked): Section heading, subheading, item count, and display mode (featured/popular). *To manage tour packages, go to Tours > Packages.*
* **Destinations** (Linked): Section heading, subheading, and item count. *To manage destinations, go to Destinations > Destinations list.*
* **Experiences** (Linked): Section heading, subheading, and item count. *To manage experiences, go to Experiences > Experiences list.*
* **Reviews** (Linked): Section heading, subheading, and item count. *To manage reviews, go to Reviews > Reviews list.*
* **Gallery** (Linked): Section heading, subheading, and item count. *To manage gallery images, go to Gallery > Gallery Images.*
* **News and Insights** (Linked): Section heading, subheading, and homepage slot assignments (Main Featured & Side Slots 1-4). *To manage articles, go to Blog > Blog Posts.*
* **Success Stories**: 5 curated traveler stories with guest names, quote narratives, badges, photos, and sort orders.
* **Sustainability**: Environmental commitment statement, conservation pillars, and community support copy.
* **SEO**: Meta title, Meta description, Canonical URL, and Open Graph share image.

### 2. Tours (`tours/index.html`)
* **Page Content**: Tour catalog banner headline, subtitle, Travel Preparation Guide copy (visa regulations, packing advice, local currency, cultural etiquette), and bottom CTA.
* **Categories**: Tour category definitions (Cultural, Wildlife, Scenic, Beach, Wellness, Adventure), hero banners, taglines, and display order.
* **Packages**: Full tour package catalog: titles, slugs, categories, durations, prices, highlights, day-by-day itineraries, inclusions/exclusions, popular badges, and publication status.
* **Trip Finder options**: Durations, travel styles, and budget range options.
* **SEO**: Meta title, Meta description, and OG image for the Tours page.

### 3. Destinations (`destinations.html`)
* **Page Content**: Destinations directory headline, subtitle, regional travel overview, and travel advice banner.
* **Destinations list**: All destination entries: title, region, summary narrative, hero photography, key highlights, best time to visit, and publication status.
* **SEO**: Meta title, Meta description, and OG image for Destinations.

### 4. Experiences (`experiences.html`)
* **Page Content**: Experiences page headline, subtitle, and experiential travel guarantee copy.
* **Experiences list**: Curated experiences: title, category tag, duration, descriptive body, image, activity rating, and publication status.
* **SEO**: Meta title, Meta description, and OG image for Experiences.

### 5. About Us (`about.html`)
* **Page Content**: Heritage narrative, company founding story, foundational pillars, director's welcome message, and ethics statement.
* **Team Members**: Team profiles: name, role, country/flag, profile photograph, sort order, and publication status.
* **SEO**: Meta title, Meta description, and OG image for About Us.

### 6. Gallery (`gallery.html`)
* **Page Content**: Visual gallery headline, subtitle, and intro narrative.
* **Gallery Images**: Curated visual assets: image file (Media Library or upload), alt text, category filter (Wildlife, Culture, Scenic, Heritage), display order, and publication status.
* **SEO**: Meta title, Meta description, and OG image for Gallery.

### 7. Reviews (`reviews.html`)
* **Page Content**: Traveler testimonials headline, subtitle, guestbook introduction, and verified reviews promise.
* **Reviews list**: Customer feedback: guest name, avatar, nationality, rating (1–5 stars), tour taken, testimonial narrative, verified status, and publication status.
* **SEO**: Meta title, Meta description, and OG image for Reviews.

### 8. Blog (`blog.html`)
* **Page Content**: Editorial journal headline, subtitle, newsletter signup copy, and reading room intro.
* **Blog Posts**: Complete article catalog: headline, slug, category, author, read time, publication date, cover photography, full HTML content, and publication status.
* **SEO**: Meta title, Meta description, and OG image for Blog.

### 9. Contact (`contact.html`)
* **Page Content**: Inquiries hero headline, subtitle, office hours, and consultation promise.
* **Contact Details and Social Links**: Primary telephone, WhatsApp hotline, official email, physical office address, Google Maps embed URL, QR codes (WhatsApp, WeChat, LINE), and social media profile URLs.
* **Inquiry form texts**: Detailed and quick inquiry form field labels, placeholder texts, step indicators, and confirmation thank-you modal copy.
* **Customer Inquiries**: Central inbox of submitted client inquiries with search, status filters, and export capabilities.
* **SEO**: Meta title, Meta description, and OG image for Contact.

### 10. Site (Global Infrastructure)
* **Logo & Branding**: Primary header logo, white footer logo, and browser favicon.
* **Header and Footer text**: Global navigation bar labels, footer slogan, and legal copyright text.
* **Social Links**: Global social media profile links (Facebook, Instagram, YouTube, LinkedIn, TripAdvisor).
* **Media Library**: Upload, search, preview, and replace image assets across the entire website.
* **Publish / Export to GitHub**: Staging branch validation, automated safety checks, and 1-click publishing to GitHub Pages.
* **Admin Account & Users**: Administrator credentials, security management, and authentication controls.
