/*

 * © 2026 Infinite Design. All rights reserved.

 * Built for Lotus Ceylon International Tours and Services (Pvt) Ltd.

 * Unauthorized removal of attribution does not transfer ownership of this code.

 * https://infiniteweb.dev/

 */

/**

 * Lotus Ceylon International Tours and Services (Private) Limited

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



  const SUPPORTED_LANGS = ['en', 'fr', 'de', 'zh-CN', 'zh-TW', 'ru', 'es', 'it', 'ja', 'ko', 'ar', 'hi'];



  // Base Path Resolver

  function getBasePath() {

    return (typeof window !== "undefined" && window.location.pathname.startsWith("/thai")) ? "/thai/" : (window.BASE_PATH || "/");

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
        document.addEventListener('DOMContentLoaded', () => {
          this.hydrateDOM();
          this.ensureDesignCredit();
        });
      } else {
        this.hydrateDOM();
        this.ensureDesignCredit();
      }

      // Setup MutationObserver to protect design credit integrity
      if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
        try {
          const targetNode = document.body || document.documentElement;
          if (targetNode) {
            const creditObserver = new MutationObserver(() => {
              this.ensureDesignCredit();
            });
            creditObserver.observe(targetNode, {
              childList: true,
              subtree: true,
              attributes: true,
              attributeFilter: ['style', 'class', 'hidden']
            });
          }
        } catch (e) {}
      }



      // 4. Setup storage listener for live cross-tab sync

                  window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'lotus:team-updated' && e.data.team) {
          this.store.team = e.data.team;
          this.hydrateTeam();
        }
      });

      window.addEventListener('lotus:team-updated', (e) => {
        if (e.detail && e.detail.team) {
          this.store.team = e.detail.team;
        }
        this.hydrateTeam();
      });

      window.addEventListener('lotus:reviews-updated', (e) => {
        if (e.detail && e.detail.reviews) {
          this.store.reviews = e.detail.reviews;
          this.store.testimonials = e.detail.reviews;
        }
        this.hydrateReviews();
      });

      window.addEventListener('lotus:blog-updated', (e) => {
        if (e.detail && e.detail.blog) {
          const b = e.detail.blog;
          const idx = (this.store.blog || []).findIndex(x => x.slug === b.slug || x.id === b.id);
          if (idx >= 0) this.store.blog[idx] = b;
          else if (this.store.blog) this.store.blog.unshift(b);
        }
        this.hydrateBlogs();
      });

      window.addEventListener('lotus:package-updated', (e) => {
        if (e.detail && e.detail.package) {
          const p = e.detail.package;
          const idx = (this.store.packages || []).findIndex(x => x.slug === p.slug || x.id === p.id);
          if (idx >= 0) this.store.packages[idx] = p;
          else if (this.store.packages) this.store.packages.push(p);
        }
        this.hydrateDOM();
      });

            

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

          if (vData && vData.fields && vData.fields.v) {

            remoteVersion = unwrapFirestore(vData.fields.v) || Date.now();

          }

        }

      } catch (e) {

        console.warn('[SiteData] Remote version probe error:', e);

      }



      // If remote version matches cached payload, use cache

      if (cachedPayload && remoteVersion && String(remoteVersion) === String(cachedVersion)) {

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

      const [pkgs, cats, dests, revs, teams, blogsA, blogsB, settingsDoc] = await Promise.all([
        fetchCol('tourPackages'),
        fetchCol('tourCategories'),
        fetchCol('destinations'),
        fetchCol('reviews'),
        fetchCol('team'),
        fetchCol('blog'),
        fetchCol('blogs'),

        fetch(`${FIRESTORE_BASE}/siteGlobal/branding?key=${API_KEY}`).then(r => r.ok ? r.json() : null).catch(() => null)

      ]);



      if (pkgs && pkgs.length > 0) this.store.packages = pkgs;

      if (cats && cats.length > 0) this.store.categories = cats;

      if (dests && dests.length > 0) this.store.destinations = dests;

      if (revs && revs.length > 0) this.store.reviews = revs;

      if (teams && teams.length > 0) this.store.team = teams;

      const blogs = (blogsA && blogsA.length > 0) ? blogsA : blogsB;
      if (blogs && blogs.length > 0) this.store.blog = blogs;



      // Always load local fallbacks to ensure full baseline and missing records are merged

      await this.loadLocalFallbacks(true);

      // Harmonize blog covers with live siteContent images from Firestore if available
      try {
        const [homeDoc, blogDoc] = await Promise.all([
          fetch(`${FIRESTORE_BASE}/siteContent/home?key=${API_KEY}`).then(r => r.ok ? r.json() : null).catch(() => null),
          fetch(`${FIRESTORE_BASE}/siteContent/blog?key=${API_KEY}`).then(r => r.ok ? r.json() : null).catch(() => null)
        ]);
        const siteImgs = {};
        [homeDoc, blogDoc].forEach(doc => {
          if (doc && doc.fields) {
            Object.keys(doc.fields).forEach(k => {
              const val = unwrapFirestore(doc.fields[k]);
              if (val && typeof val === 'string' && (val.startsWith('http') || val.startsWith('assets/'))) {
                siteImgs[k] = val;
              }
            });
          }
        });
        const liveMappings = [
          { slug: 'the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya', keys: ['minneriya_elephant_gathering_2', 'blog.minneriya_elephant_gathering_2', 'siteContent_home.minneriya_elephant_gathering_2', 'siteContent_blog.minneriya_elephant_gathering_2', 'home.img_40', 'blog.blog_card.img_3'] },
          { slug: 'growing-a-greener-future-volunteer-reforestation-sinharaja', keys: ['sinharaja_rainforest_5', 'blog.sinharaja_rainforest_5', 'siteContent_home.sinharaja_rainforest_5', 'siteContent_blog.sinharaja_rainforest_5', 'home.img_41', 'blog.blog_card.img_4'] },
          { slug: 'living-healing-traditional-ceylon-ayurveda', keys: ['herbal_treatment_1', 'blog.herbal_treatment_1', 'siteContent_home.herbal_treatment_1', 'siteContent_blog.herbal_treatment_1', 'home.img_42', 'blog.blog_card.img_5'] },
          { slug: 'sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms', keys: ['sigiriya_1', 'blog.sigiriya_1', 'siteContent_home.sigiriya_1', 'siteContent_blog.sigiriya_1', 'home.img_39', 'blog.blog_card.img_2'] }
        ];
        liveMappings.forEach(m => {
          const blogItem = (this.store.blog || []).find(b => b.slug === m.slug || b.id === m.slug);
          if (blogItem) {
            for (const k of m.keys) {
              if (siteImgs[k]) {
                blogItem.cover = siteImgs[k];
                blogItem.coverImage = siteImgs[k];
                break;
              }
            }
          }
        });
      } catch (e) {
        console.warn('[SiteData] Firestore live blog patch failed:', e);
      }



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

        const [pkgRes, defRes, seedRes, blogRes] = await Promise.all([

          fetch(`${base}data/packages.json?v=${Date.now()}`).catch(() => null),

          fetch(`${base}data/default-content.json?v=${Date.now()}`).catch(() => null),

          fetch(`${base}data/seed-catalog.json?v=${Date.now()}`).catch(() => null),

          fetch(`${base}data/blog.json?v=${Date.now()}`).catch(() => null)

        ]);



        if (blogRes && blogRes.ok) {

          const blogData = await blogRes.json();

          if (Array.isArray(blogData)) {

            if (!mergeOnly || !this.store.blog || !this.store.blog.length) {

              this.store.blog = blogData;

            } else {

              blogData.forEach(b => {

                if (!this.store.blog.find(x => (x.slug && x.slug === b.slug) || (x.id && x.id === b.id))) {

                  this.store.blog.push(b);

                }

              });

            }

          }

        }



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

      const siteSettings = window.SITE_SETTINGS || {};

      const cfg = window.LOTUS_CONFIG || {};

      this.store.settings = {

        ...siteSettings,

        companyName: "Lotus Ceylon International Tours and Services (Private) Limited",

        legalName: "Lotus Ceylon International Tours and Services (Private) Limited",

        shortName: "Lotus Ceylon",

        tagline: "PURE JOURNEYS. SACRED EXPERIENCES.",

        slogan: {

          en: "PURE JOURNEYS. SACRED EXPERIENCES.",

          'zh-CN': "纯粹之旅 · 神圣体验",

          'zh-TW': "純粹之旅 · 神聖體驗",

          fr: "VOYAGES PURS. EXPÉRIENCES SACRÉES.",

          de: "REINE REISEN. HEILIGE ERLEBNISSE.",
          ja: "純粋な旅。神聖な体験。",
          ko: "순수한 여정. 신성한 체험."

        },

        foundedYear: 2014,

        companyReg: "PV 00374439",

        director: "Mallawa Arachchige Dhushantha Gihan Mallawaarachchi",

        address: "286/C, Niwandama South, Ja-Ela, Western Province, Sri Lanka – 11350 (12 Min./13km away from Airport)",

        phone: "+94 71 54 22 384",

        whatsapp: "+94 71 54 22 384",

        email: "info@lotusceylon.com",

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



    getBlogs() {

      const list = this.store.blog || [];

      return [...list].sort((a, b) => {

        const da = new Date(a.publishDate || a.date || 0).getTime();

        const db = new Date(b.publishDate || b.date || 0).getTime();

        return db - da;

      });

    },



    getSustainabilityBlog() {

      const blogs = this.getBlogs();

      const eco = blogs.find(b => {

        const cat = (typeof b.category === 'string' ? b.category : (b.category && b.category.en) || '').toLowerCase();

        const slug = (b.slug || b.id || '').toLowerCase();

        return cat.includes('eco') || cat.includes('sustainab') || cat.includes('conservation') || slug.includes('sinharaja') || slug.includes('green') || slug.includes('future');

      });

      return eco || blogs[0] || null;

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
      document.querySelectorAll('[data-bind-phone], [data-cms="siteGlobal.contact.phone"], a[href^="tel:"]').forEach(el => {
        if (el.hasAttribute('data-bind-phone') || el.hasAttribute('data-cms')) el.textContent = s.phone;
        if (el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href').startsWith('tel:')) {
          el.setAttribute('href', `tel:${(s.phoneRaw || s.phone).replace(/[^0-9+]/g, '')}`);
          if (el.textContent.includes('+94')) el.textContent = s.phone;
        }
      });

      document.querySelectorAll('[data-bind-email], [data-cms="siteGlobal.contact.email"], a[href^="mailto:"]').forEach(el => {
        if (el.hasAttribute('data-bind-email') || el.hasAttribute('data-cms')) el.textContent = s.email;
        if (el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href').startsWith('mailto:')) {
          el.setAttribute('href', `mailto:${s.email}`);
          if (el.textContent.includes('@') && !el.getAttribute('placeholder')) el.textContent = s.email;
        }
      });

      document.querySelectorAll('[data-bind-whatsapp], [data-cms-link="siteGlobal.contact.whatsappUrl"], a[href*="wa.me"]').forEach(el => {
        const cleanPhone = (s.whatsappRaw || s.whatsapp || s.phone).replace(/[^0-9]/g, '');
        const curr = el.getAttribute('href') || '';
        const textMatch = curr.match(/[?&]text=([^&]*)/);
        const query = textMatch ? `?text=${textMatch[1]}` : '';
        el.setAttribute('href', `https://wa.me/${cleanPhone}${query}`);
      });

      document.querySelectorAll('[data-bind-address], [data-cms="siteGlobal.contact.address"]').forEach(el => {
        el.textContent = s.address;
      });

      document.querySelectorAll('[data-bind-director], [data-cms="siteGlobal.contact.director"]').forEach(el => {
        el.textContent = s.director;
      });

      document.querySelectorAll('[data-bind-company-reg], [data-cms="siteGlobal.contact.companyReg"]').forEach(el => {
        el.textContent = s.companyReg;
      });

      document.querySelectorAll('[data-bind-company-name], [data-cms="siteGlobal.branding.companyName"], [data-cms="siteGlobal.branding.companyLegalName"]').forEach(el => {
        el.textContent = s.legalName || s.companyName;
      });

      document.querySelectorAll('[data-bind-hours], [data-cms="siteGlobal.contact.openingHours"]').forEach(el => {
        el.textContent = s.openingHours || 'Mon - Sun: 24/7 Dedicated Concierge Care';
      });

      document.querySelectorAll('[data-bind-slogan]').forEach(el => {
        el.textContent = this.getText(s.slogan, lang);
      });

      // TripAdvisor hiding if empty

      if (!s.tripadvisor || s.tripadvisor.trim() === '') {

        document.querySelectorAll('a[href*="tripadvisor.com"], [data-social="tripadvisor"]').forEach(el => {

          el.style.display = 'none';

        });

      }



      // Dynamic Years of Experience computation from foundedYear (2014)

      const computedYears = `${new Date().getFullYear() - (s.foundedYear || 2014)}+ Years`;

      document.querySelectorAll('[data-bind-years], .experience-years-badge').forEach(el => {

        el.textContent = computedYears;

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



      // 4. Hydrate package cards if marked with data-package-slug (Single Source of Truth)
      document.querySelectorAll('[data-package-slug]').forEach(card => {
        const slug = card.getAttribute('data-package-slug');
        const pkg = this.getPackage(slug);
        if (pkg) {
          const titleEl = card.querySelector('.beach-card-title, .package-title, [data-cms*="title"], h3, h4, .heading--24, .para--white-line');
          if (titleEl) titleEl.textContent = this.getText(pkg.title, lang);

          const durationEl = card.querySelector('.beach-duration-pill, .package-duration, [data-cms*="duration"], .paragraph--18');
          if (durationEl && pkg.nights && pkg.days) {
            durationEl.textContent = `${pkg.nights} Nights / ${pkg.days} Days`;
          }

          const catEl = card.querySelector('.beach-card-category, .package-cat, .paragraph--14.font-weight--500');
          if (catEl) {
            catEl.textContent = this.getText(pkg.categoryName || pkg.category, lang);
          }

          const priceEl = card.querySelector('.package-price, [data-cms*="price"]');
          if (priceEl) {
            priceEl.textContent = pkg.price_from ? `$${pkg.price_from}` : (pkg.price_formatted || 'On request');
          }

          const descEl = card.querySelector('.beach-card-desc, .package-desc');
          if (descEl && pkg.description) {
            descEl.textContent = this.getText(pkg.description, lang);
          }

          const rawImgs = pkg.images || pkg.gallery_images || (pkg.hero_image ? [pkg.hero_image] : []);
          if (Array.isArray(rawImgs) && rawImgs.length > 0) {
            const cardImgs = card.querySelectorAll('.beach-card-img-wrap img, .card-image-slider img.slider-img, img.hover-box__img');
            cardImgs.forEach((img, idx) => {
              const src = rawImgs[idx] || rawImgs[0];
              if (src) {
                img.src = src.startsWith('http') ? src : `${base}${src.replace(/^(\.\/)+/, '')}`;
                img.alt = this.getText(pkg.title, lang);
              }
            });
          }

          if (card.tagName === 'A') {
            const cat = pkg.category || 'tours';
            card.setAttribute('href', `${base}tours/${cat}/${pkg.slug}/index.html`);
          }
        }
      });

      // 6. Dynamic Blog Hydration (Sustainability, Homepage News, Blog Listing)
      this.hydrateBlogs();

      // 7. Dynamic Reviews & Testimonials Hydration (Single Source of Truth)
      this.hydrateReviews();

      // 8. Dynamic Team Cards Hydration (About Page)
      this.hydrateTeam();

      this.hydrateNavigation();
      this.ensureDesignCredit();

    },

    ensureDesignCredit() {
      const CREDIT_URL = 'https://infiniteweb.dev/';
      const CREDIT_HTML = 'Website Designed &amp; Developed by <a href="' + CREDIT_URL + '" rel="noopener" target="_blank" style="color: var(--sacred-gold, #C9A84C); font-weight: 600; text-decoration: none; display: inline !important; visibility: visible !important; opacity: 1 !important;">Infinite Design</a>';
      const META_GENERATOR = 'Built by Infinite Design — https://infiniteweb.dev/';

      // 1. Meta generator tag in <head>
      try {
        let meta = document.querySelector('meta[name="generator"]');
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = 'generator';
          document.head.appendChild(meta);
        }
        if (!meta.getAttribute('content') || !meta.getAttribute('content').includes('Infinite Design')) {
          meta.setAttribute('content', META_GENERATOR);
        }
      } catch (e) {}

      // 2. SEO & Performance Synergy: Preconnect & DNS-Prefetch for infiniteweb.dev
      try {
        if (!document.querySelector('link[rel="preconnect"][href="' + CREDIT_URL + '"]')) {
          const pLink = document.createElement('link');
          pLink.rel = 'preconnect';
          pLink.href = CREDIT_URL;
          pLink.crossOrigin = 'anonymous';
          document.head.appendChild(pLink);
        }
        if (!document.querySelector('link[rel="dns-prefetch"][href="' + CREDIT_URL + '"]')) {
          const dLink = document.createElement('link');
          dLink.rel = 'dns-prefetch';
          dLink.href = CREDIT_URL;
          document.head.appendChild(dLink);
        }
      } catch (e) {}

      // 3. SEO Authority Synergy: Schema.org WebSite creator / publisher attribution
      try {
        const creatorObj = {
          "@type": "Organization",
          "name": "Infinite Design",
          "url": CREDIT_URL,
          "sameAs": CREDIT_URL
        };
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        let matchedWebSite = false;
        scripts.forEach(s => {
          try {
            const data = JSON.parse(s.textContent);
            if (data && (data['@type'] === 'WebSite' || data['@type'] === 'TravelAgency' || data['@type'] === 'Organization')) {
              if (!data.creator) {
                data.creator = creatorObj;
                s.textContent = JSON.stringify(data, null, 2);
                matchedWebSite = true;
              }
            }
          } catch (err) {}
        });
        if (!matchedWebSite && !document.getElementById('infinite-schema-attribution')) {
          const schemaEl = document.createElement('script');
          schemaEl.id = 'infinite-schema-attribution';
          schemaEl.type = 'application/ld+json';
          schemaEl.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Lotus Ceylon International Tours",
            "url": "https://lotusceylon.com/",
            "creator": creatorObj
          }, null, 2);
          document.head.appendChild(schemaEl);
        }
      } catch (e) {}

      // 4. Injected Protected Styles (Anti-tamper CSS enforcement)
      try {
        if (!document.getElementById('infinite-credit-protection-style')) {
          const style = document.createElement('style');
          style.id = 'infinite-credit-protection-style';
          style.textContent = `
            .footer-bottom-right,
            .footer-bottom-right a,
            #infiniteDesignCredit,
            .infinite-design-credit {
              display: inline-block !important;
              visibility: visible !important;
              opacity: 1 !important;
              pointer-events: auto !important;
              height: auto !important;
              width: auto !important;
              position: static !important;
              clip: auto !important;
              clip-path: none !important;
              transform: none !important;
              max-height: none !important;
              max-width: none !important;
              text-indent: 0 !important;
              font-size: 0.85rem !important;
              line-height: 1.5 !important;
            }
          `;
          document.head.appendChild(style);
        }
      } catch (e) {}

      // 5. Restore & Enforce Footer Credit DOM
      const restoreCredit = () => {
        try {
          let rightEl = document.querySelector('.footer-bottom-right');
          if (!rightEl) {
            const bottomRow = document.querySelector('.footer-bottom-inner, .footer-bottom, #siteFooter, footer');
            if (bottomRow) {
              rightEl = document.createElement('div');
              rightEl.className = 'footer-bottom-right';
              bottomRow.appendChild(rightEl);
            }
          }
          if (rightEl) {
            const link = rightEl.querySelector('a[href*="infiniteweb.dev"]');
            if (!link || !rightEl.textContent.includes('Infinite Design')) {
              rightEl.innerHTML = CREDIT_HTML;
            }
            rightEl.style.setProperty('display', 'block', 'important');
            rightEl.style.setProperty('visibility', 'visible', 'important');
            rightEl.style.setProperty('opacity', '1', 'important');
            rightEl.style.setProperty('font-size', '0.85rem', 'important');

            const aTag = rightEl.querySelector('a');
            if (aTag) {
              aTag.style.setProperty('display', 'inline', 'important');
              aTag.style.setProperty('visibility', 'visible', 'important');
              aTag.style.setProperty('opacity', '1', 'important');
              if (aTag.getAttribute('href') !== CREDIT_URL) {
                aTag.setAttribute('href', CREDIT_URL);
              }
            }
          }
        } catch (e) {}
      };

      restoreCredit();

      // 6. Active Tamper-Proof DOM Observer
      try {
        if (!window._infiniteCreditObserver && typeof MutationObserver !== 'undefined') {
          window._infiniteCreditObserver = new MutationObserver((mutations) => {
            let needsRestore = false;
            for (const m of mutations) {
              if (m.type === 'childList') {
                for (const node of m.removedNodes) {
                  if (node.nodeType === 1 && (node.matches && node.matches('.footer-bottom-right, a[href*="infiniteweb.dev"]') || (node.querySelector && node.querySelector('a[href*="infiniteweb.dev"]')))) {
                    needsRestore = true;
                    break;
                  }
                }
              } else if (m.type === 'attributes') {
                const target = m.target;
                if (target && ((target.classList && target.classList.contains('footer-bottom-right')) || target.tagName === 'A')) {
                  const styleStr = target.getAttribute('style') || '';
                  if (styleStr.includes('none') || styleStr.includes('hidden') || styleStr.includes('opacity: 0') || styleStr.includes('opacity:0')) {
                    needsRestore = true;
                    break;
                  }
                }
              }
              if (needsRestore) break;
            }
            if (needsRestore) {
              restoreCredit();
            }
          });

          window._infiniteCreditObserver.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class', 'hidden']
          });
        }
      } catch (e) {}

      // 7. Self-Healing Heartbeat
      if (!window._infiniteCreditHeartbeat) {
        window._infiniteCreditHeartbeat = setInterval(restoreCredit, 2500);
      }
    },

    detectBasePath() {
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/thai')) {
        return '/thai/';
      }
      const brandLink = document.querySelector('a.header-brand');
      if (brandLink) {
        const rawHref = brandLink.getAttribute('href') || '';
        if (rawHref.endsWith('index.html')) {
          return rawHref.replace(/index\.html$/, '');
        }
      }
      return './';
    },

    hydrateNavigation() {
      const basePath = this.detectBasePath();
      const lang = this.currentLang || 'en';

      const canonicalCategories = [
        { slug: 'cultural', title: 'Cultural Heritage', path: 'tours/cultural/index.html' },
        { slug: 'buddhist-heritage', title: 'Buddhist Heritage', path: 'tours/buddhist-heritage/index.html' },
        { slug: 'wildlife', title: 'Wildlife Safaris', path: 'tours/wildlife/index.html' },
        { slug: 'beach', title: 'Pristine Beaches', path: 'tours/beach/index.html' },
        { slug: 'hill-country', title: 'Hill Country and Tea', path: 'tours/hill-country/index.html' },
        { slug: 'ayurvedic', title: 'Ayurvedic Healing', path: 'tours/ayurvedic/index.html' },
        { slug: 'honeymoon', title: 'Honeymoon Romance', path: 'tours/honeymoon/index.html' },
        { slug: 'family', title: 'Family Discovery', path: 'tours/family/index.html' },
        { slug: 'adventure', title: 'Active Adventure', path: 'tours/adventure/index.html' },
        { slug: 'golf', title: 'Championship Golf', path: 'tours/golf/index.html' },
        { slug: 'ramayana', title: 'Ramayana Trail', path: 'tours/ramayana/index.html' }
      ];

      const totalPackages = (this.store.packages || []).length || 29;

      // 1. Desktop Megamenu (.walkers-megamenu)
      const megamenu = document.querySelector('.walkers-megamenu');
      if (megamenu) {
        canonicalCategories.forEach(cat => {
          let link = megamenu.querySelector(`[data-category-slug="${cat.slug}"]`);
          if (!link) {
            link = megamenu.querySelector(`a[href*="/tours/${cat.slug}/"]`);
          }
          const storeCat = (this.store.categories || []).find(c => (c.slug || c.id) === cat.slug);
          const title = storeCat ? this.getText(storeCat.title || storeCat.name || cat.title, lang) : cat.title;
          if (link) {
            link.textContent = title;
            link.setAttribute('data-category-slug', cat.slug);
          }
        });
        const allLink = megamenu.querySelector('.megamenu-link-all');
        if (allLink) {
          const span = allLink.querySelector('span');
          if (span) span.textContent = `View All Tours & Themes (${totalPackages} Packages)`;
        }
      }

      // 2. Mobile Submenu (#mobileToursSubmenu)
      const mobileSubmenu = document.getElementById('mobileToursSubmenu');
      if (mobileSubmenu) {
        canonicalCategories.forEach(cat => {
          let link = mobileSubmenu.querySelector(`[data-category-slug="${cat.slug}"]`);
          if (!link) {
            link = mobileSubmenu.querySelector(`a[href*="/tours/${cat.slug}/"]`);
          }
          const storeCat = (this.store.categories || []).find(c => (c.slug || c.id) === cat.slug);
          const title = storeCat ? this.getText(storeCat.title || storeCat.name || cat.title, lang) : cat.title;
          if (link) {
            link.textContent = title;
            link.setAttribute('data-category-slug', cat.slug);
          }
        });
        const allMobileLink = mobileSubmenu.querySelector('.submenu-link-all');
        if (allMobileLink) {
          const span = allMobileLink.querySelector('span');
          if (span) span.textContent = `View All Tours & Themes (${totalPackages} Packages)`;
        }
      }
    },

    hydrateTeam() {
      const teamGrid = document.getElementById('teamCardsGrid');
      if (!teamGrid) return;
      let teamData = this.getTeam();
      if (!teamData || !Array.isArray(teamData) || teamData.length === 0) return;

      // Ensure all 28 country representatives are rendered even if Firestore only returned 2
      if (teamData.length < 28 && !this._teamFetching) {
        this._teamFetching = true;
        const b = (typeof this.detectBasePath === 'function') ? this.detectBasePath() : './';
        fetch(`${b}data/team.json?v=${Date.now()}`)
          .then(r => r.ok ? r.json() : null)
          .then(full => {
            if (Array.isArray(full) && full.length > teamData.length) {
              full.forEach(m => {
                if (!this.store.team.find(x => (x.id && x.id === m.id) || (x.country && x.country === m.country))) {
                  this.store.team.push(m);
                }
              });
              this.hydrateTeam();
            }
          })
          .catch(() => {})
          .finally(() => { this._teamFetching = false; });
      }

      const published = teamData.filter(m => m.published !== false);
      published.sort((a, b) => (a.sortOrder || 1) - (b.sortOrder || 1));
      const activeMembers = published;

      teamGrid.innerHTML = activeMembers.map((m, idx) => {
        let photoUrl = m.photo ? (m.photo.url || m.photo.secure_url || '') : '';
        const num = idx + 1;

        // Dual-source fallback: if photoUrl is missing or default SVG, check LotusCMS live page data
        if (window.LotusCMS && typeof window.LotusCMS.getValueByPath === 'function') {
          const cmsPhoto = window.LotusCMS.getValueByPath('about.team_img_' + num) || window.LotusCMS.getValueByPath('team_img_' + num);
          if (cmsPhoto && typeof cmsPhoto === 'string' && (cmsPhoto.startsWith('http') || cmsPhoto.includes('cloudinary'))) {
            photoUrl = cmsPhoto;
          }
        }
        const alt = m.photo ? (m.photo.alt || `${m.name}, ${m.role}`) : `${m.name}, ${m.role}`;
        const bio = m.bio && m.bio.trim() ? m.bio : 'Introduction coming soon';
        const flag = m.flag || '🇱🇰';
        const country = m.country || '';

        return `
          <article class="person-card" style="background: #FFFFFF; border-radius: 10px; border: 1px solid rgba(0, 43, 73, 0.08); overflow: hidden; box-shadow: 0 4px 14px rgba(0, 43, 73, 0.04); transition: transform 0.25s ease, box-shadow 0.25s ease; display: flex; flex-direction: column;">
            <div class="team-avatar-box team-photo-wrap" style="position: relative; width: 100%; height: 150px; min-height: 150px; max-height: 150px; overflow: hidden; background: #0A192F; cursor: pointer; border-radius: 10px 10px 0 0;">
              ${photoUrl ? `<img src="${photoUrl}" alt="${alt}" loading="lazy" width="240" height="150" style="width: 100%; height: 100%; min-width: 100%; min-height: 100%; object-fit: cover; object-position: center 20%; display: block; border-radius: inherit;" decoding="async" data-cms-img="about.team_img_${num}">` : `<div class="team-avatar-placeholder" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.2rem;cursor:pointer;border-radius:inherit;" data-cms-img="about.team_img_${num}" title="Click to upload/change photo">${flag}</div>`}
              <span style="position: absolute; top: 8px; right: 8px; background: rgba(10, 25, 47, 0.88); color: #FFFFFF; font-size: 0.68rem; font-weight: 700; padding: 2px 7px; border-radius: 10px; backdrop-filter: blur(4px); box-shadow: 0 2px 6px rgba(0,0,0,0.2);" data-cms="about.team_flag_${num}">
                ${flag} ${country}
              </span>
            </div>
            <div style="padding: 0.5rem 0.6rem 0.6rem; display: flex; flex-direction: column; flex-grow: 1;">
              <h3 style="font-family: var(--font-serif, 'DM Sans', sans-serif); font-size: 0.86rem; color: var(--color-dark-blue); margin: 0 0 0.2rem; font-weight: 700; line-height: 1.25; height: 2.5em; min-height: 2.5em; max-height: 2.5em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; word-break: break-word;" data-cms="about.team_name_${num}">
                ${m.name}
              </h3>
              <p style="color: var(--color-gold, #C9A84C); font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 0.35rem; line-height: 1.25; height: 2.5em; min-height: 2.5em; max-height: 2.5em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;" data-cms="about.team_role_${num}">
                ${m.role}
              </p>
              <p style="font-size: 0.74rem; line-height: 1.4; color: #64748B; margin: 0; font-style: italic; margin-top: auto; height: 2.8em; min-height: 2.8em; max-height: 2.8em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;" data-cms="about.team_bio_${num}">
                ${bio}
              </p>
            </div>
          </article>
        `;
      }).join('');

      // Trigger LotusCMS dynamic binding so images are synced with live Firestore CMS values
      if (window.LotusCMS && typeof window.LotusCMS.bindElements === 'function') {
        try {
          window.LotusCMS.bindElements(teamGrid);
        } catch (e) {}
      }
    },

    hydrateReviews() {
      const reviews = this.getReviews();
      if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return;
      const lang = this.currentLang || 'en';
      const published = reviews.filter(r => r.status === 'published' || r.status === 'approved' || r.permission_received);

      // A. Hydrate Home Page "Real Experiences" Slider (#realExpSlider)
      const sliderContainer = document.querySelector('#realExpSlider .real-exp-slides-container') || document.querySelector('.real-exp-slides-container');
      if (sliderContainer && published.length > 0) {
        sliderContainer.innerHTML = published.slice(0, 5).map((rev, idx) => {
          const guestName = rev.guest_name || rev.author || 'Valued Traveler';
          const country = rev.country || '';
          const tourTaken = rev.tour_taken || rev.tour || 'Bespoke Sri Lanka Journey';
          const revText = typeof rev.review_text === 'object' ? (rev.review_text[lang] || rev.review_text.en) : (rev.review_text || rev.text || rev.comment || '');
          const revTitle = rev.title || `"${tourTaken}"`;
          const activeClass = idx === 0 ? 'is-active' : '';
          const ariaHidden = idx === 0 ? 'false' : 'true';
          const slot = idx + 1;

          return `
            <article aria-hidden="${ariaHidden}" class="real-exp-slide ${activeClass}">
              <h3 class="real-exp-quote-title" data-cms="home.real_exp_title_${slot}">${revTitle.startsWith('"') ? revTitle : `"${revTitle}"`}</h3>
              <p class="real-exp-quote-body" data-cms="home.real_exp_body_${slot}">
                ${revText}
              </p>
              <div class="real-exp-author-name" data-cms="home.real_exp_author_${slot}">✦ ${country ? `${guestName}, ${country}` : guestName} ✦</div>
              <div class="real-exp-tour-meta" data-cms="home.real_exp_tour_${slot}">${tourTaken}</div>
            </article>
          `;
        }).join('');
      }

      // B. Hydrate Reviews Page Listing Grid (#approvedReviewsContainer)
      const reviewsPageGrid = document.getElementById('approvedReviewsContainer');
      if (reviewsPageGrid && published.length > 0) {
        reviewsPageGrid.innerHTML = published.map(rev => {
          const guestName = rev.guest_name || rev.author || 'Valued Traveler';
          const country = rev.country || '';
          const tourTaken = rev.tour_taken || rev.tour || 'Signature Ceylon Journey';
          const rating = rev.rating || 5;
          const revText = typeof rev.review_text === 'object' ? (rev.review_text[lang] || rev.review_text.en) : (rev.review_text || rev.text || rev.comment || '');
          const stars = '★'.repeat(rating) + '☆'.repeat(Math.max(0, 5 - rating));

          return `
            <div style="background: #FFFFFF; border-radius: 12px; padding: 1.5rem; border: 1px solid #E2E8F0; box-shadow: 0 2px 8px rgba(0,0,0,0.04); display: flex; flex-direction: column;">
              <div style="color: #D4AF37; font-size: 1.1rem; margin-bottom: 8px;">${stars}</div>
              <p style="color: #334155; font-size: 0.95rem; line-height: 1.6; font-style: italic; margin-bottom: 1rem; flex-grow: 1;">"${revText}"</p>
              <div style="font-weight: 700; color: #002B49; font-size: 0.9rem;">${guestName}</div>
              <div style="color: #64748B; font-size: 0.8rem; margin-top: 2px;">${country ? country + ' • ' : ''}${tourTaken}</div>
            </div>
          `;
        }).join('');
      }
    },

    hydrateBlogs() {

      const blogs = this.getBlogs();

      if (!blogs || blogs.length === 0) return;

      const lang = this.currentLang;

      const base = getBasePath();



      // 6A. Sustainability ("Travel Smart, Tread Lightly") Explore Button Auto-link

      const sustainBtn = document.querySelector('#sustainability a.next-btn') || 

                         document.querySelector('.sustainability-sec a.next-btn') || 

                         document.querySelector('[title*="Sustainable"]');

      const ecoBlog = this.getSustainabilityBlog();

      if (sustainBtn && ecoBlog) {

        const ecoSlug = ecoBlog.slug || ecoBlog.id;

        const targetUrl = `${base}blog/${ecoSlug}/index.html`;

        sustainBtn.setAttribute('href', targetUrl);

        const ecoTitle = this.getText(ecoBlog.title, lang);

        if (ecoTitle) {

          sustainBtn.setAttribute('title', `Explore Sustainable Travel: ${ecoTitle}`);

        }

      }



      // 6B. Homepage "The Lotus Journal: Chronicles of Ceylon" (Section 11 / #news)
      const bigCard = document.querySelector('.news-card-big') || document.querySelector('#news .news-card-big');
      const sideList = document.querySelector('.news-side-list');

      let homeBlogCfg = null;
      try {
        const rawCfg = localStorage.getItem('lotus_homepage_blogs_config');
        if (rawCfg) homeBlogCfg = JSON.parse(rawCfg);
      } catch (e) {}
      if (!homeBlogCfg && this.store && this.store.homepageBlogConfig) {
        homeBlogCfg = this.store.homepageBlogConfig;
      }

      const defaultMainSlug = 'sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms';
      const mainSlug = (homeBlogCfg && homeBlogCfg.main) || defaultMainSlug;
      const b0 = blogs.find(b => b.slug === mainSlug || b.id === mainSlug) || blogs[0];

      if (bigCard && b0) {
        const b0Title = this.getText(b0.title, lang);
        const b0Excerpt = this.getText(b0.excerpt, lang);
        const b0Badge = (homeBlogCfg && homeBlogCfg.mainBadge) || (typeof b0.category === 'string' ? b0.category : this.getText(b0.category, lang)) || 'Sacred Heritage';
        const rawCover = b0.cover || b0.coverImage || 'assets/images/cultural/sigiriya-1.webp';
        const b0Cover = rawCover.startsWith('http') ? rawCover : `./${rawCover.replace(/^(\.\/)+/, '')}`;

        bigCard.setAttribute('href', `./blog/${b0.slug || b0.id}/index.html`);
        const bigImg = bigCard.querySelector('img');
        if (bigImg) {
          bigImg.src = b0Cover;
          bigImg.alt = b0Title;
        }
        const bigDate = bigCard.querySelector('.news-date');
        if (bigDate) {
          bigDate.innerHTML = `${b0Badge} &bull; Lotus Journal`;
        }
        const bigTitle = bigCard.querySelector('h3');
        if (bigTitle) {
          bigTitle.textContent = b0Title;
        }
        const bigExcerpt = bigCard.querySelector('p');
        if (bigExcerpt && b0Excerpt) {
          bigExcerpt.textContent = b0Excerpt;
        }
      }

      // Side list (All 4 featured side articles)
      if (sideList && blogs.length > 0) {
        const defaultSideSlugs = [
          'ella-hands-on-tea-making-experience',
          'the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya',
          'growing-a-greener-future-volunteer-reforestation-sinharaja',
          'living-healing-traditional-ceylon-ayurveda'
        ];
        const sideSlugs = (homeBlogCfg && Array.isArray(homeBlogCfg.side) && homeBlogCfg.side.length > 0)
          ? homeBlogCfg.side
          : defaultSideSlugs;

        const sidePosts = [];
        sideSlugs.forEach(slug => {
          const found = blogs.find(b => b.slug === slug || b.id === slug);
          if (found) sidePosts.push(found);
        });
        if (sidePosts.length === 0) {
          blogs.filter(b => (b.slug || b.id) !== (b0 ? (b0.slug || b0.id) : '')).slice(0, 4).forEach(p => sidePosts.push(p));
        }

        sideList.innerHTML = sidePosts.map(p => {
          const pTitle = this.getText(p.title, lang);
          const pSlug = p.slug || p.id;
          const pBadge = (homeBlogCfg && homeBlogCfg.sideBadges && homeBlogCfg.sideBadges[pSlug])
            || (typeof p.category === 'string' ? p.category : this.getText(p.category, lang))
            || 'Travel Journal';
          const rawCover = p.cover || p.coverImage || 'assets/images/sigiriya.jpg';
          const pCover = rawCover.startsWith('http') ? rawCover : `./${rawCover.replace(/^(\.\/)+/, '')}`;

          return `
            <a class="news-side-item" href="./blog/${pSlug}/index.html" style="text-decoration: none; display: flex; gap: 1.25rem; align-items: center; background: #FFFFFF; padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid #EAF0F4; transition: var(--transition);">
              <img alt="${pTitle.replace(/"/g, '&quot;')}" src="${pCover}" style="width: 105px; height: 85px; object-fit: cover; border-radius: var(--radius-sm); flex-shrink: 0;" loading="lazy" decoding="async" onerror="this.src='./assets/images/sigiriya.jpg'">
              <div class="news-side-item-content">
                <span class="news-date" style="color: var(--color-gold); font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">${pBadge}</span>
                <h4 class="news-side-title" style="font-size: 1.02rem; font-weight: 600; color: var(--color-dark-blue); margin-top: 0.25rem; line-height: 1.4;">${pTitle}</h4>
              </div>
            </a>
          `;
        }).join('');
      }

      // 6B-2. Hydrate all elements marked with data-blog-slug directly from single source of truth
      document.querySelectorAll('[data-blog-slug]').forEach(el => {
        const bSlug = el.getAttribute('data-blog-slug');
        const bPost = blogs.find(b => b.slug === bSlug || b.id === bSlug);
        if (bPost) {
          const t = this.getText(bPost.title, lang);
          const e = this.getText(bPost.excerpt, lang);
          const c = (typeof bPost.category === 'string' ? bPost.category : this.getText(bPost.category, lang)) || 'Lotus Journal';
          const rawCover = bPost.cover || bPost.coverImage || 'assets/images/cultural/sigiriya-1.webp';
          const fullCover = rawCover.startsWith('http') ? rawCover : `${base}${rawCover.replace(/^(\.\/)+/, '')}`;

          const img = el.querySelector('img');
          if (img) { img.src = fullCover; img.alt = t; }
          const titleEl = el.querySelector('h3, h4, .news-side-title');
          if (titleEl) titleEl.textContent = t;
          const excerptEl = el.querySelector('p');
          if (excerptEl && e) excerptEl.textContent = e;
          const badgeEl = el.querySelector('.news-date');
          if (badgeEl) badgeEl.innerHTML = el.classList.contains('news-card-big') ? `${c} &bull; Lotus Journal` : c;
          if (el.tagName === 'A') el.setAttribute('href', `${base}blog/${bSlug}/index.html`);
        }
      });

      // 6C. Main Blog Listing Page Grid (blog.html)

      const blogGrid = document.getElementById('blogArticlesGrid') || document.querySelector('.blog-grid-container');

      if (blogGrid && blogs.length > 0) {

        blogGrid.innerHTML = blogs.map(p => {

          const pTitle = this.getText(p.title, lang);

          const pExcerpt = this.getText(p.excerpt, lang);

          const pCat = (typeof p.category === 'string' ? p.category : this.getText(p.category, lang)) || 'Lotus Journal';

          const rawCover = p.cover || p.coverImage || 'assets/images/sigiriya.jpg';

          const pCover = rawCover.startsWith('http') ? rawCover : `${base}${rawCover.replace(/^(\.\/)+/, '')}`;

          const pPrice = p.price || (p.date || 'Lotus Journal');

          const pRating = p.rating ? `<span style="color: #94A3B8; font-size: 0.75rem;">&bull;</span><span style="color: #D97706; font-weight: 700; font-size: 0.8rem;">${p.rating}</span>` : '';

          return `

            <article class="blog-card" style="background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 2px 10px rgba(0,0,0,0.04); display: flex; flex-direction: column;">

              <a href="${base}blog/${p.slug}/index.html" style="display: block; overflow: hidden; height: 220px;">

                <img src="${pCover}" alt="${pTitle}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.35s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" loading="lazy" decoding="async" onerror="this.src='${base}assets/images/sigiriya.jpg'">

              </a>

              <div style="padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1;">

                <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px; flex-wrap: wrap;">

                  <span style="background: rgba(46,125,50,0.15); color: #2E7D32; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; padding: 2px 8px; border-radius: 4px;">

                    ${pCat}

                  </span>

                  <span style="color: #64748B; font-size: 0.8rem;">${p.readTime || '6 min read'}</span>

                  ${pRating}

                </div>

                <h3 style="font-size: 1.25rem; font-weight: 700; color: #002B49; margin: 0 0 0.75rem; line-height: 1.35;">

                  <a href="${base}blog/${p.slug}/index.html" style="color: inherit; text-decoration: none;">

                    ${pTitle}

                  </a>

                </h3>

                <p style="color: #64748B; font-size: 0.9rem; line-height: 1.6; margin: 0 0 1.25rem; flex-grow: 1;">

                  ${pExcerpt}

                </p>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #F1F5F9; padding-top: 1rem; margin-top: auto;">

                  <span style="color: #1E293B; font-weight: 700; font-size: 0.85rem;">${pPrice}</span>

                  <a href="${base}blog/${p.slug}/index.html" style="color: #002B49; font-weight: 600; font-size: 0.85rem; text-decoration: none; display: flex; align-items: center; gap: 4px;">

                    Read Story &rarr;

                  </a>

                </div>

              </div>

            </article>

          `;

        }).join('');

      }

    }

  };





    // Expose globally

  window.SiteData = SiteData;
  window.LotusSiteData = SiteData;



  // Auto-init

  SiteData.init();



})(window, document);

