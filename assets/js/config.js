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
      full: "286/C, Niwandama South, Ja-Ela, Sri Lanka – 11350",
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

    // Corporate Email
    email: "inquiry@lotusceylon.com",
    emailConfig: {
      primary: "inquiry@lotusceylon.com",
      secondary: "lotusceylontours@gmail.com",
      label: "Email Inquiries",
      mailto: "mailto:inquiry@lotusceylon.com"
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

    // Social Channels
    social: {
      facebook: "https://facebook.com/lotusceylon",
      instagram: "https://instagram.com/lotusceylon",
      tripadvisor: "https://tripadvisor.com/lotusceylon",
      youtube: "https://youtube.com/@lotusceylon"
    },

    // API Endpoint for Inquiries (Formspree fallback)
    inquiryEndpoint: "https://formspree.io/f/mqkvnzyz",

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
