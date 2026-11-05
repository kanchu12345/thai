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
