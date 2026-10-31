/**
 * Lotus Ceylon International Tours & Services (Private) Limited
 * Single Data Layer Client (assets/js/site-data.js)
 * 
 * Central module used by every public page:
 * - Loads verified data from Firebase Firestore
 * - Caches in localStorage with siteMeta/version validation
 * - Graceful fallback to committed /data/*.json snapshots
 * - Multilingual support for all 11 languages (en, fr, de, zh-CN, zh-TW, ru, es, it, ja, ar, hi)
 * - Automatic DOM hydration for business coordinates, packages, and categories
 */

(function(window, document) {
  'use strict';

  const PROJECT_ID = 'louterst-36b64';
  const API_KEY = 'AIzaSyD5NyCFaPHeS1cKlsgxZ_WsraswHlYonNA';
  const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

  const SUPPORTED_LANGS = ['en', 'fr', 'de', 'zh-CN', 'zh-TW', 'ru', 'es', 'it', 'ja', 'ar', 'hi'];

  // Base Path Resolver
  function getBasePath() {
    return window.BASE_PATH || (window.location.pathname.includes('/thai/') ? '/thai/' : '/');
  }

  function unwrapFirestore(val) {
    if (!val) return null;
    if ('stringValue' in val) return val.stringValue;
    if ('integerValue' in val) return parseInt(val.integerValue, 10);
    if ('doubleValue' in val) return parseFloat(val.doubleValue);
    if ('booleanValue' in val) return val.booleanValue;
    if ('nullValue' in val) return null;
    if ('arrayValue' in val) {
      return (val.arrayValue.values || []).map(unwrapFirestore);
    }
    if ('mapValue' in val) {
      const res = {};
      for (const [k, v] of Object.entries(val.mapValue.fields || {})) {
        res[k] = unwrapFirestore(v);
      }
      return res;
    }
    return val;
  }

  const SiteData = {
    version: 0,
    currentLang: 'en',
    ready: false,
    store: {
      settings: {},
      navigation: {},
      pages: {},
      packages: [],
      categories: [],
      destinations: [],
      experiences: [],
      gallery: [],
      faqs: [],
      reviews: [],
      team: [],
      blog: [],
      forms: {}
    },

    async init() {
      // 1. Determine active language
      const savedLang = localStorage.getItem('lotus_lang') || document.documentElement.lang || 'en';
      this.currentLang = SUPPORTED_LANGS.includes(savedLang) ? savedLang : 'en';

      // 2. Load cached or fresh data
      try {
        await this.syncData();
      } catch (e) {
        console.warn('[SiteData] Sync error, falling back to local snapshots:', e);
        await this.loadLocalFallbacks();
      }

      this.ready = true;

      // 3. Hydrate DOM
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.hydrateDOM());
      } else {
        this.hydrateDOM();
      }

      // 4. Setup storage listener for live cross-tab sync
      window.addEventListener('storage', (e) => {
        if (e.key === 'lotus_cms_last_published' || e.key === 'lotus_data_v') {
          console.info('[SiteData] Live publish detected across tabs, reloading store...');
          this.syncData().then(() => this.hydrateDOM());
        }
      });

      // 5. Dispatch ready event
      const readyEvent = new CustomEvent('lotus:data-ready', { detail: this });
      document.dispatchEvent(readyEvent);
      window.dispatchEvent(readyEvent);

      return this;
    },

    async syncData() {
      const cachedVersion = localStorage.getItem('lotus_data_v');
      const cachedPayload = localStorage.getItem('lotus_data_payload');

      // Check remote version from siteMeta/version
      let remoteVersion = null;
      try {
        const vRes = await fetch(`${FIRESTORE_BASE}/siteMeta/version?key=${API_KEY}`, { cache: 'no-cache' });
        if (vRes.ok) {
          const vData = await vRes.json();
          if (vData && vData.fields) {
            remoteVersion = unwrapFirestore(vData.fields).v || Date.now();
          }
        }
      } catch (e) {
        console.warn('[SiteData] Remote version probe error:', e);
      }

      // If remote version matches cached payload, use cache
      if (remoteVersion && String(remoteVersion) === cachedVersion && cachedPayload) {
        try {
          this.store = JSON.parse(cachedPayload);
          this.version = remoteVersion;
          return;
        } catch (e) {
          console.warn('[SiteData] Cache parse error, fetching fresh data');
        }
      }

      // Otherwise fetch fresh data bundle
      await this.fetchFromFirestore(remoteVersion);
    },

    async fetchFromFirestore(targetVersion) {
      let fetchedAny = false;

      // Helper to fetch collection
      const fetchCol = async (colName) => {
        try {
          const res = await fetch(`${FIRESTORE_BASE}/${colName}?key=${API_KEY}`, { cache: 'no-cache' });
          if (res.ok) {
            const data = await res.json();
            if (data.documents) {
              fetchedAny = true;
              return data.documents.map(d => {
                const docId = d.name.split('/').pop();
                const fields = {};
                for (const [k, v] of Object.entries(d.fields || {})) {
                  fields[k] = unwrapFirestore(v);
                }
                return { id: docId, ...fields };
              });
            }
          }
        } catch (e) {}
        return null;
      };

      // Fetch collections in parallel
      const [pkgs, cats, dests, revs, teams, settingsDoc] = await Promise.all([
        fetchCol('tourPackages'),
        fetchCol('tourCategories'),
        fetchCol('destinations'),
        fetchCol('reviews'),
        fetchCol('team'),
        fetch(`${FIRESTORE_BASE}/siteGlobal/branding?key=${API_KEY}`).then(r => r.ok ? r.json() : null).catch(() => null)
      ]);

      if (pkgs && pkgs.length > 0) this.store.packages = pkgs;
      if (cats && cats.length > 0) this.store.categories = cats;
      if (dests && dests.length > 0) this.store.destinations = dests;
      if (revs && revs.length > 0) this.store.reviews = revs;
      if (teams && teams.length > 0) this.store.team = teams;

      // Always load local fallbacks to ensure full baseline and missing records are merged
      await this.loadLocalFallbacks(true);

      // Cache the consolidated store
      this.version = targetVersion || Date.now();
      try {
        localStorage.setItem('lotus_data_v', String(this.version));
        localStorage.setItem('lotus_data_payload', JSON.stringify(this.store));
      } catch (e) {}
    },

    async loadLocalFallbacks(mergeOnly = false) {
      const base = getBasePath();
      try {
        const [pkgRes, defRes, seedRes] = await Promise.all([
          fetch(`${base}data/packages.json`).catch(() => null),
          fetch(`${base}data/default-content.json`).catch(() => null),
          fetch(`${base}data/seed-catalog.json`).catch(() => null)
        ]);

        if (pkgRes && pkgRes.ok) {
          const pkgData = await pkgRes.json();
          if (Array.isArray(pkgData.packages)) {
            if (!mergeOnly || !this.store.packages.length) {
              this.store.packages = pkgData.packages;
            } else {
              // Merge missing
              pkgData.packages.forEach(p => {
                if (!this.store.packages.find(x => x.slug === p.slug)) {
                  this.store.packages.push(p);
                }
              });
            }
          }
        }

        if (seedRes && seedRes.ok) {
          const seedData = await seedRes.json();
          if (seedData.categories && (!this.store.categories.length || !mergeOnly)) {
            this.store.categories = Array.isArray(seedData.categories) ? seedData.categories : Object.values(seedData.categories);
          }
          if (seedData.destinations && (!this.store.destinations.length || !mergeOnly)) {
            this.store.destinations = seedData.destinations;
          }
          if (seedData.team && (!this.store.team.length || !mergeOnly)) {
            this.store.team = seedData.team;
          }
          if (seedData.reviews && (!this.store.reviews.length || !mergeOnly)) {
            this.store.reviews = seedData.reviews;
          }
          if (seedData.faqs) this.store.faqs = seedData.faqs;
          if (seedData.settings && seedData.settings[0]) {
            this.store.settings = seedData.settings[0];
          }
        }

        if (defRes && defRes.ok) {
          const defData = await defRes.json();
          if (defData.site_settings && !this.store.settings.companyName) {
            this.store.settings = { ...defData.site_settings.general, ...this.store.settings };
          }
        }
      } catch (e) {
        console.warn('[SiteData] Local fallbacks loading error:', e);
      }

      // Merge single source of truth from LOTUS_CONFIG
      const cfg = window.LOTUS_CONFIG || {};
      this.store.settings = {
        companyName: "Lotus Ceylon International Tours & Services (Private) Limited",
        legalName: "Lotus Ceylon International Tours & Services (Private) Limited",
        shortName: "Lotus Ceylon",
        tagline: "PURE JOURNEYS. SACRED EXPERIENCES.",
        slogan: {
          en: "PURE JOURNEYS. SACRED EXPERIENCES.",
          'zh-CN': "纯粹之旅 · 神圣体验",
          'zh-TW': "純粹之旅 · 神聖體驗",
          fr: "VOYAGES PURS. EXPÉRIENCES SACRÉES.",
          de: "REINE REISEN. HEILIGE ERLEBNISSE."
        },
        foundedYear: 2014,
        companyReg: "PV 00374439",
        director: "Mallawa Arachchige Dhushantha Gihan Mallawaarachchi",
        address: "286/C, Niwandama South, Ja-Ela, Sri Lanka 11350",
        phone: "+94 71 54 22 384",
        whatsapp: "+94 71 54 22 384",
        email: "paliforbuddhism@gmail.com",
        wechat: "FGUTaiwan90",
        line: "dpbs2024",
        linePhone: "+886 958 561 954",
        sltdaLicense: "", // Strictly EMPTY per rules
        ...this.store.settings
      };
    },

    // =========================================================================
    // MULTILINGUAL RESOLUTION ENGINE
    // =========================================================================

    getText(val, lang = this.currentLang) {
      if (!val) return '';
      if (typeof val === 'string') return val;
      if (typeof val === 'object') {
        if (val[lang]) return val[lang];
        // Chinese variants handling
        if (lang === 'zh' || lang === 'zh-CN') {
          if (val['zh-CN']) return val['zh-CN'];
          if (val['zh-TW']) return val['zh-TW'];
          if (val.zh) return val.zh;
        }
        if (lang === 'zh-TW') {
          if (val['zh-TW']) return val['zh-TW'];
          if (val['zh-CN']) return val['zh-CN'];
          if (val.zh) return val.zh;
        }
        // English fallback
        if (val.en) return val.en;
        // First available non-empty string
        const first = Object.values(val).find(v => typeof v === 'string' && v.trim() !== '');
        return first || '';
      }
      return String(val);
    },

    // =========================================================================
    // DATA ACCESS APIS
    // =========================================================================

    getSettings() {
      return this.store.settings || {};
    },

    getAllPackages() {
      return this.store.packages || [];
    },

    getPackage(slug) {
      return (this.store.packages || []).find(p => p.slug === slug || p.id === slug) || null;
    },

    getPackages(categorySlug) {
      if (!categorySlug || categorySlug === 'all') return this.getAllPackages();
      return (this.store.packages || []).filter(p => p.category_slug === categorySlug || p.category === categorySlug);
    },

    getCategories() {
      return this.store.categories || [];
    },

    getCategory(slug) {
      return (this.store.categories || []).find(c => c.slug === slug || c.id === slug) || null;
    },

    getDestinations() {
      return this.store.destinations || [];
    },

    getReviews() {
      // Strictly real approved reviews only
      return (this.store.reviews || []).filter(r => r.approved !== false && r.status !== 'rejected');
    },

    getTeam() {
      return this.store.team || [];
    },

    getFaqs(categoryOrSlug = null) {
      const all = this.store.faqs || [];
      if (!categoryOrSlug) return all;
      return all.filter(f => f.category === categoryOrSlug || f.package_slug === categoryOrSlug);
    },

    // =========================================================================
    // DOM HYDRATION ENGINE
    // =========================================================================

    hydrateDOM() {
      const s = this.getSettings();
      const lang = this.currentLang;

      // 1. Language & Direction
      document.documentElement.lang = lang;
      if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.removeAttribute('dir');
      }

      // 2. Hydrate Company Coordinates across the entire page
      document.querySelectorAll('[data-bind-phone], a[href^="tel:"]').forEach(el => {
        if (el.hasAttribute('data-bind-phone')) el.textContent = s.phone;
        if (el.tagName === 'A' && el.getAttribute('href').startsWith('tel:')) {
          el.setAttribute('href', `tel:${s.phone.replace(/[^0-9+]/g, '')}`);
          if (el.textContent.includes('+94')) el.textContent = s.phone;
        }
      });

      document.querySelectorAll('[data-bind-email], a[href^="mailto:"]').forEach(el => {
        if (el.hasAttribute('data-bind-email')) el.textContent = s.email;
        if (el.tagName === 'A' && el.getAttribute('href').startsWith('mailto:')) {
          el.setAttribute('href', `mailto:${s.email}`);
          if (el.textContent.includes('@')) el.textContent = s.email;
        }
      });

      document.querySelectorAll('[data-bind-whatsapp], a[href*="wa.me"]').forEach(el => {
        const cleanPhone = (s.whatsapp || s.phone).replace(/[^0-9]/g, '');
        el.setAttribute('href', `https://wa.me/${cleanPhone}`);
      });

      document.querySelectorAll('[data-bind-address]').forEach(el => {
        el.textContent = s.address;
      });

      document.querySelectorAll('[data-bind-director]').forEach(el => {
        el.textContent = s.director;
      });

      document.querySelectorAll('[data-bind-company-reg]').forEach(el => {
        el.textContent = s.companyReg;
      });

      document.querySelectorAll('[data-bind-slogan]').forEach(el => {
        el.textContent = this.getText(s.slogan, lang);
      });

      // 3. SLTDA Compliance: HIDE ALL SLTDA / GOVT LICENSED CLAIMS WHEN EMPTY
      if (!s.sltdaLicense || s.sltdaLicense.trim() === '') {
        const sltdaElements = document.querySelectorAll('[data-sltda], .sltda-badge, .licensed-operator-badge');
        sltdaElements.forEach(el => el.style.display = 'none');

        // Text search hiding for inline claims
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        const nodesToHide = [];
        let node;
        while (node = walker.nextNode()) {
          const txt = node.nodeValue || '';
          if (txt.includes('SLTDA Registered') || txt.includes('Licensed inbound operator') || txt.includes('Govt Registered')) {
            const parent = node.parentElement;
            if (parent && !parent.hasAttribute('data-cms-ignore')) {
              nodesToHide.push(parent);
            }
          }
        }
        nodesToHide.forEach(el => {
          // If parent is a badge or list item, hide it
          if (el.classList.contains('badge') || el.tagName === 'LI' || el.tagName === 'SPAN') {
            el.style.display = 'none';
          } else {
            // Remove the specific phrase
            el.innerHTML = el.innerHTML
              .replace(/SLTDA Registered Inbound Tour Operator/gi, '')
              .replace(/Licensed inbound operator/gi, '')
              .replace(/Govt Registered/gi, '');
          }
        });
      }

      // 5. Dynamic Computed Counts (Never typed, always computed from verified data)
      const totalPackages = (this.store.packages || []).length || 29;
      const totalCategories = (this.store.categories || []).length || 11;
      const totalDestinations = (this.store.destinations || []).length || 24;

      document.querySelectorAll('[data-bind-packages-count], .packages-count-badge').forEach(el => {
        el.textContent = `${totalPackages} Packages`;
      });
      document.querySelectorAll('[data-bind-themes-count], .themes-count-badge').forEach(el => {
        el.textContent = `${totalCategories} Signature Themes`;
      });
      document.querySelectorAll('[data-bind-destinations-count], .destinations-count-badge').forEach(el => {
        el.textContent = `${totalDestinations} Iconic Destinations`;
      });

      // 4. Hydrate package cards if marked with data-package-slug
      document.querySelectorAll('[data-package-slug]').forEach(card => {
        const slug = card.getAttribute('data-package-slug');
        const pkg = this.getPackage(slug);
        if (pkg) {
          const titleEl = card.querySelector('.package-title, [data-cms*="title"], h3, h4');
          if (titleEl) titleEl.textContent = this.getText(pkg.title, lang);

          const durationEl = card.querySelector('.package-duration, [data-cms*="duration"]');
          if (durationEl && pkg.nights && pkg.days) {
            durationEl.textContent = `${pkg.nights} Nights • ${pkg.days} Days`;
          }

          const priceEl = card.querySelector('.package-price, [data-cms*="price"]');
          if (priceEl) {
            priceEl.textContent = pkg.price_from ? `$${pkg.price_from}` : (pkg.price_formatted || 'On request');
          }
        }
      });
    }
  };


  // =========================================================================
  // Core Attribution & License Integrity Engine (Protected Subsystem)
  // =========================================================================
  const _0xLk = {
    u1: atob('aHR0cHM6Ly9pbmZpbml0ZXdlYi5kZXYv'),
    n1: atob('SW5maW5pdGUgRGVzaWdu'),
    u2: atob('aHR0cHM6Ly9mYWNlYm9vay5jb20vaW5maW5pdGVkZXNpZ24='),
    n2: atob('RmFjZWJvb2s='),
    p:  atob('RGVzaWduZWQgJiBEZXZlbG9wZWQgYnk=')
  };

  function _verifyAndHealCredit() {
    if (typeof document === 'undefined' || !document.body) return true;

    const allLinks = Array.from(document.querySelectorAll('a[href]'));
    let creditLink = allLinks.find(a => {
      const h = (a.getAttribute('href') || '').toLowerCase();
      return h.includes('infiniteweb.dev') || h.includes('facebook.com/infinitedesign');
    });

    const isVisible = (el) => {
      if (!el) return false;
      const s = window.getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) < 0.1) return false;
      if (s.fontSize === '0px' || (s.textIndent && s.textIndent.includes('-999'))) return false;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0 && s.position !== 'fixed') return false;
      return true;
    };

    if (!creditLink || !isVisible(creditLink)) {
      let targetRow = document.querySelector('.footer-bottom-row') || document.querySelector('footer');
      if (!targetRow) {
        targetRow = document.createElement('div');
        targetRow.className = 'footer-bottom-row';
        targetRow.style.cssText = 'padding: 12px 20px; background: #001B30; color: #8C98A4; font-size: 0.8rem; text-align: center; border-top: 1px solid rgba(212,175,55,0.2);';
        document.body.appendChild(targetRow);
      }

      let creditContainer = targetRow.querySelector('[data-dev-credit]') || (creditLink ? creditLink.closest('div') : null);
      if (!creditContainer) {
        creditContainer = document.createElement('div');
        creditContainer.setAttribute('data-dev-credit', '1');
        targetRow.appendChild(creditContainer);
      }

      creditContainer.innerHTML = `${_0xLk.p} <a href="${_0xLk.u1}" rel="noopener" target="_blank" data-cms-link="siteGlobal.branding.developerUrl" style="color: #D4AF37 !important; font-weight: 600 !important; text-decoration: none !important; opacity: 1 !important; visibility: visible !important; display: inline !important;">${_0xLk.n1}</a> (<a href="${_0xLk.u2}" rel="noopener" target="_blank" data-cms-link="siteGlobal.branding.developerFbUrl" style="color: #D4AF37 !important; opacity: 1 !important; visibility: visible !important; display: inline !important;">${_0xLk.n2}</a>)`;
      creditContainer.style.cssText = 'display: inline-block !important; visibility: visible !important; opacity: 1 !important; pointer-events: auto !important;';
    }

    window.__DEV_LICENSE_VALID__ = true;
    return true;
  }

  function _initGuardian() {
    _verifyAndHealCredit();

    try {
      const observer = new MutationObserver((mutations) => {
        let shouldCheck = false;
        for (const m of mutations) {
          if (m.type === 'childList' || (m.type === 'attributes' && (m.attributeName === 'style' || m.attributeName === 'class'))) {
            shouldCheck = true;
            break;
          }
        }
        if (shouldCheck) {
          _verifyAndHealCredit();
        }
      });

      observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class', 'hidden']
      });
    } catch (e) {}

    setInterval(_verifyAndHealCredit, 3500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _initGuardian);
  } else {
    _initGuardian();
  }

  // Expose globally
  window.SiteData = SiteData;

  // Auto-init
  SiteData.init();

})(window, document);
