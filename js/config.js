
// Universal Site URL Configuration (Custom Domain Ready)
window.SITE_URL = (typeof window !== 'undefined' && window.location.hostname.includes('github.io'))
  ? 'https://kanchu12345.github.io/thai/'
  : (typeof window !== 'undefined' ? (window.location.origin + (window.location.pathname.startsWith('/thai') ? '/thai/' : '/')) : 'https://kanchu12345.github.io/thai/');
/**
 * LOTUS CEYLON International Tours & Services (Pvt) Ltd
 * Global Single Source of Truth Website & Inquiry Configuration
 * 
 * Centralises all company coordinates, social handles, multi-language definitions,
 * database connections (Supabase & Firebase), Cloudinary, and routing.
 */

// Establish global BASE_PATH for GitHub Pages hosting under /thai/
window.BASE_PATH = window.BASE_PATH || "/thai/";
var BASE_PATH = window.BASE_PATH;

// Global LOTUS_CONFIG: single source of truth for both public website and CMS Admin
var LOTUS_CONFIG = window.LOTUS_CONFIG || {};

(function() {
  var defaults = {
    // Brand details
    companyName: "LOTUS CEYLON International Tours & Services (Pvt) Ltd",
    shortName: "Lotus Ceylon Tours",
    slogan: "PURE JOURNEYS. SACRED EXPERIENCES.",
    tagline: "PURE JOURNEYS. SACRED EXPERIENCES.",
    foundedYear: 2014,
    responseTimeHours: 2,

    // 24/7 Concierge Hotline & Telephone
    phone: "+94 71 54 22 384",
    phoneRaw: "94715422384",
    hotline: {
      display: "+94 71 54 22 384",
      tel: "+94715422384"
    },

    // Corporate Email
    email: "paliforbuddhism@gmail.com",
    secondaryEmail: "paliforbuddhism@gmail.com",
    emailConfig: {
      primary: "paliforbuddhism@gmail.com",
      secondary: "paliforbuddhism@gmail.com",
      label: "Email Inquiries",
      mailto: "mailto:paliforbuddhism@gmail.com"
    },
    
    // Physical office address (Ja-Ela Headquarters)
    address: {
      line1: "286/C, Niwandama South",
      street: "286/C, Niwandama South",
      city: "Ja-Ela",
      country: "Sri Lanka",
      postalCode: "11350",
      full: "286/C, Niwandama South, Ja-Ela, Sri Lanka – 11350",
      coordinates: {
        lat: 7.0785,
        lng: 79.8913,
        zoom: 15
      },
      googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=7.0785,79.8913"
    },

    // WhatsApp Messaging
    whatsapp: {
      number: "+94 71 54 22 384",
      link: "https://wa.me/94715422384",
      defaultMessage: "Hello Lotus Ceylon Tours! I would like to inquire about a customized tour package to Sri Lanka."
    },

    // Instant Messaging & Social Concierge
    messaging: {
      whatsapp: {
        number: "+94 71 54 22 384",
        link: "https://wa.me/94715422384",
        defaultText: "Hello Lotus Ceylon! I would like to inquire about a customized tour package to Sri Lanka."
      },
      wechat: {
        id: "LotusCeylonTours",
        label: "WeChat: LotusCeylonTours",
        actionUrl: "weixin://dl/chat?LotusCeylonTours",
        qr: "assets/qr/wechat-qr.png"
      },
      line: {
        id: "@lotusceylon",
        label: "LINE: @lotusceylon",
        actionUrl: "https://line.me/R/ti/p/@lotusceylon",
        qr: "assets/qr/line-qr.png"
      }
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
    social: {
      facebook: "https://www.facebook.com/lotusceylontours",
      instagram: "https://www.instagram.com/lotusceylontours",
      youtube: "https://www.youtube.com/@lotusceylontours",
      tripadvisor: "https://www.tripadvisor.com"
    },

    // Google Maps Embed URL
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
    submission: {
      provider: "formspree",
      formspreeEndpoint: "https://formspree.io/f/mqkvnzyz",
      customApiEndpoint: "https://formspree.io/f/mqkvnzyz",
      enableDirectWhatsAppRedirect: true
    },
    inquiryEndpoint: "https://formspree.io/f/mqkvnzyz",

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
    ],

    // Supabase Backend CMS Configuration
    // (Safe for frontend: protected by Postgres Row Level Security)
    supabase: {
      url: "", // Set via project config or dashboard when activating Supabase
      anonKey: "", // Public anon key from Supabase Project Settings > API
      storageBucket: "media"
    },

    // Firebase Web App Configuration (Public Client Values)
    firebase: {
      apiKey: "AIzaSyD5NyCFaPHeS1cKlsgxZ_WsraswHlYonNA",
      authDomain: "louterst-36b64.firebaseapp.com",
      projectId: "louterst-36b64",
      storageBucket: "louterst-36b64.firebasestorage.app",
      messagingSenderId: "416036235757",
      appId: "1:416036235757:web:544c89abdb74b41a585fe4",
      measurementId: "G-KKNCD89X6F"
    },

    // Cloudinary Client Configuration (Public CDN & Unsigned Upload)
    cloudinary: {
      cloudName: "qmukrbh6",
      uploadPreset: "lotus_tours_unsigned",
      folder: "lotus/tours"
    }
  };

  for (var k in defaults) {
    if (defaults.hasOwnProperty(k) && !LOTUS_CONFIG.hasOwnProperty(k)) {
      LOTUS_CONFIG[k] = defaults[k];
    }
  }
  window.LOTUS_CONFIG = LOTUS_CONFIG;
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = { LOTUS_CONFIG: window.LOTUS_CONFIG, BASE_PATH: window.BASE_PATH };
}
