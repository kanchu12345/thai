
window.SITE_URL = (typeof window !== 'undefined' && window.location.hostname.includes('github.io'))
  ? 'https://kanchu12345.github.io/thai/'
  : 'https://kanchu12345.github.io/thai/';
/**
 * Lotus Ceylon International Tours & Services (Pvt) Ltd
 * Global Single Source of Truth Configuration File (assets/js/config.js)
 * 
 * Centralises all company contact coordinates, social handles,
 * BASE_PATH routing, and API endpoint references.
 */

// BASE_PATH for GitHub Pages hosting under /thai/
window.BASE_PATH = window.BASE_PATH || "/thai/";
var BASE_PATH = window.BASE_PATH;

window.LOTUS_CONFIG = window.LOTUS_CONFIG || {};

(function() {
  var props = {
    // Corporate Identity
    companyName: "Lotus Ceylon International Tours & Services (Private) Limited",
    shortName: "Lotus Ceylon",
    tagline: "PURE JOURNEYS. SACRED EXPERIENCES.",
    slogan: "PURE JOURNEYS. SACRED EXPERIENCES.",
    foundedYear: 2014,

    // Registered Office & Headquarters (Ja-Ela)
    address: {
      street: "286/C, Niwandama South",
      line1: "286/C, Niwandama South",
      city: "Ja-Ela",
      country: "Sri Lanka",
      postalCode: "11350",
      full: "286/C, Niwandama South, Ja-Ela, Sri Lanka 11350",
      coordinates: {
        lat: 7.0785,
        lng: 79.8913,
        zoom: 15
      },
      googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=7.0785,79.8913"
    },

    // 24/7 Concierge Hotline
    hotline: {
      display: "+94 71 54 22 384",
      tel: "+94715422384"
    },
    phone: "+94 71 54 22 384",
    phoneRaw: "94715422384",

    companyReg: "PV 00374439",
    director: "Mallawa Arachchige Dhushantha Gihan Mallawaarachchi",
    sltdaLicense: "", // Intentionally EMPTY per business rules until verified

    // Corporate Email - Single Source of Truth
    email: "paliforbuddhism@gmail.com",
    emailConfig: {
      primary: "paliforbuddhism@gmail.com",
      secondary: "",
      label: "Email Inquiries",
      mailto: "mailto:paliforbuddhism@gmail.com"
    },

    // Instant Messaging & Social Concierge
    messaging: {
      whatsapp: {
        number: "+94 71 54 22 384",
        link: "https://wa.me/94715422384",
        defaultText: "Hello Lotus Ceylon! I would like to inquire about a customized tour package to Sri Lanka."
      },
      wechat: {
        id: "FGUTaiwan90",
        label: "WeChat: FGUTaiwan90",
        actionUrl: "weixin://dl/chat?FGUTaiwan90",
        qr: "assets/qr/wechat-qr.png"
      },
      line: {
        id: "dpbs2024",
        phone: "+886 958 561 954",
        label: "LINE: dpbs2024",
        actionUrl: "https://line.me/R/ti/p/~dpbs2024",
        qr: "assets/qr/line-qr.png"
      }
    },

    // Social Channels
    social: {
      facebook: "",
      instagram: "",
      tripadvisor: "",
      youtube: "",
      googleMaps: "",
      bookingDotCom: ""
    },

    // API Endpoint for Inquiries (Formspree fallback)
    inquiryEndpoint: "https://formspree.io/f/mqkvnzyz",

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

  for (var k in props) {
    if (props.hasOwnProperty(k) && !window.LOTUS_CONFIG.hasOwnProperty(k)) {
      window.LOTUS_CONFIG[k] = props[k];
    }
  }
})();

var LOTUS_CONFIG = window.LOTUS_CONFIG;

// Export for Node/CommonJS build environments if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { LOTUS_CONFIG: window.LOTUS_CONFIG, BASE_PATH: window.BASE_PATH };
}
