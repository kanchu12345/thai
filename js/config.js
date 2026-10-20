/**
 * LOTUS CEYLON International Tours & Services (Pvt) Ltd
 * Global Website & Inquiry Configuration
 * 
 * Edit this file to update contact numbers, addresses, social media links,
 * map embeds, and email service endpoints without touching HTML or CSS.
 */

const LOTUS_CONFIG = {
  // Brand details
  companyName: "LOTUS CEYLON International Tours & Services (Pvt) Ltd",
  shortName: "Lotus Ceylon Tours",
  slogan: "PURE JOURNEYS. SACRED EXPERIENCES.",
  foundedYear: 2014,

  // Contact details
  phone: "+94 71 54 22 384",
  phoneRaw: "94715422384", // Numbers only with country code
  email: "inquiry@lotusceylon.com",
  secondaryEmail: "lotusceylontours@gmail.com",
  
  // Physical office address
  address: {
    line1: "286/C, Niwandama South",
    city: "Ja-Ela",
    country: "Sri Lanka",
    postalCode: "11350",
    full: "286/C, Niwandama South, Ja-Ela, Sri Lanka – 11350"
  },

  // WhatsApp Messaging
  whatsapp: {
    number: "+94 71 54 22 384",
    link: "https://wa.me/94715422384",
    defaultMessage: "Hello Lotus Ceylon Tours! I would like to inquire about a customized tour package to Sri Lanka."
  },

  // QR Codes Info
  qr: {
    whatsapp: {
      image: "assets/qr/whatsapp-qr.png",
      label: "WhatsApp",
      handle: "+94 71 54 22 384",
      actionUrl: "https://wa.me/94715422384"
    },
    wechat: {
      image: "assets/qr/wechat-qr.png",
      label: "WeChat",
      handle: "LotusCeylonTours",
      actionUrl: "weixin://dl/chat?LotusCeylonTours"
    },
    line: {
      image: "assets/qr/line-qr.png",
      label: "LINE",
      handle: "@lotusceylon",
      actionUrl: "https://line.me/R/ti/p/@lotusceylon"
    }
  },

  // Social Media Links
  socialLinks: {
    facebook: "https://www.facebook.com/lotusceylontours",
    instagram: "https://www.instagram.com/lotusceylontours",
    youtube: "https://www.youtube.com/@lotusceylontours",
    tripadvisor: "https://www.tripadvisor.com",
    twitter: "https://twitter.com/lotusceylon"
  },

  // Google Maps Embed URL
  // You can paste your exact Google Maps Embed <iframe> src URL here
  googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.988898150334!2d79.89745!3d7.07062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fb37648f5729%3A0x7d25e01b4c73a11b!2sJa-Ela%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=286/C,+Niwandama+South,+Ja-Ela,+Sri+Lanka",

  // Designer / Developer Credits
  designer: {
    name: "Infinite Design",
    url: "https://infiniteweb.dev/",
    facebookUrl: "https://facebook.com/infinitedesign"
  },

  // 10 Supported Language Slots (EN & 中文 first)
  languages: [
    { code: "en", name: "English", flag: "🇬🇧", active: true },
    { code: "zh", name: "中文 (Chinese)", flag: "🇨🇳", active: true },
    { code: "de", name: "Deutsch", flag: "🇩🇪", active: false },
    { code: "fr", name: "Français", flag: "🇫🇷", active: false },
    { code: "ru", name: "Русский", flag: "🇷🇺", active: false },
    { code: "es", name: "Español", flag: "🇪🇸", active: false },
    { code: "it", name: "Italiano", flag: "🇮🇹", active: false },
    { code: "ja", name: "日本語", flag: "🇯🇵", active: false },
    { code: "ar", name: "العربية", flag: "🇦🇪", active: false },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳", active: false }
  ],

  // Tour Categories for Mega Dropdown & Ticker
  tourCategories: [
    { id: "cultural", name: "Cultural", desc: "Ancient kingdoms, rock temples, and sacred living heritage" },
    { id: "buddhist", name: "Buddhist Heritage", desc: "Sacred stupas, tooth relic veneration, and monastic pilgrimages" },
    { id: "wildlife", name: "Wildlife & Safari", desc: "Leopard tracking in Yala and majestic elephant gathering" },
    { id: "beach", name: "Beach & Coast", desc: "Golden southern palms, secluded coves, and surf sanctuaries" },
    { id: "hill-country", name: "Hill Country", desc: "Misty tea estates, emerald valleys, and historic train routes" },
    { id: "ayurveda", name: "Ayurveda & Wellness", desc: "Authentic herbal therapies, panchakarma, and mindful meditation" },
    { id: "honeymoon", name: "Honeymoon & Romance", desc: "Private butler estates, sunset cruises, and candlelit dinners" },
    { id: "family", name: "Family Journeys", desc: "Child-safe adventures, turtle hatcheries, and interactive crafts" },
    { id: "adventure", name: "Adventure & Trekking", desc: "Ella rock climbs, white-water rapids, and rainforest treks" },
    { id: "ramayana", name: "Ramayana Trail", desc: "Epic mythology trails from Ravana falls to Seetha Amman temple" }
  ],

  // Submission Backend Endpoint Settings
  // Option 1: Formspree (Default and easiest for GitHub Pages: replace with your Formspree endpoint or keep demo endpoint)
  // Option 2: EmailJS
  // Option 3: Custom REST API (for when the admin panel backend is connected)
  submission: {
    provider: "formspree", // 'formspree', 'emailjs', 'custom_api', or 'whatsapp_only'
    
    // Formspree Config
    formspreeEndpoint: "https://formspree.io/f/mqkvnzyz", // Replace with your Formspree form ID
    
    // EmailJS Config (optional)
    emailjs: {
      serviceId: "service_lotus",
      templateId: "template_inquiry",
      publicKey: "your_public_key_here"
    },

    // Custom Admin Backend API Endpoint (for future admin portal integration)
    customApiEndpoint: "https://api.lotusceylon.com/v1/inquiries",

    // Automatically generate WhatsApp message on submission
    enableDirectWhatsAppRedirect: true
  },

  // Supported Currencies for Targeted Budget
  currencies: [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "AED", symbol: "AED", name: "UAE Dirham" },
    { code: "SAR", symbol: "SAR", name: "Saudi Riyal" },
    { code: "RUB", symbol: "₽", name: "Russian Ruble" },
    { code: "LKR", symbol: "Rs", name: "Sri Lankan Rupee" }
  ]
};

// Freeze config object to prevent accidental runtime mutations
if (typeof Object.freeze === "function") {
  Object.freeze(LOTUS_CONFIG);
}
