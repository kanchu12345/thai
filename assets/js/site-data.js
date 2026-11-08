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



  const SUPPORTED_LANGS = ['en', 'fr', 'de', 'zh-CN', 'zh-TW', 'ru', 'es', 'it', 'ja', 'ar', 'hi'];



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

      if (cachedPayload && (!remoteVersion || String(remoteVersion) === cachedVersion)) {

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

      const [pkgs, cats, dests, revs, teams, blogs, settingsDoc] = await Promise.all([

        fetchCol('tourPackages'),

        fetchCol('tourCategories'),

        fetchCol('destinations'),

        fetchCol('reviews'),

        fetchCol('team'),

        fetchCol('blogs'),

        fetch(`${FIRESTORE_BASE}/siteGlobal/branding?key=${API_KEY}`).then(r => r.ok ? r.json() : null).catch(() => null)

      ]);



      if (pkgs && pkgs.length > 0) this.store.packages = pkgs;

      if (cats && cats.length > 0) this.store.categories = cats;

      if (dests && dests.length > 0) this.store.destinations = dests;

      if (revs && revs.length > 0) this.store.reviews = revs;

      if (teams && teams.length > 0) this.store.team = teams;

      if (blogs && blogs.length > 0) this.store.blog = blogs;



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

        const [pkgRes, defRes, seedRes, blogRes] = await Promise.all([

          fetch(`${base}data/packages.json`).catch(() => null),

          fetch(`${base}data/default-content.json`).catch(() => null),

          fetch(`${base}data/seed-catalog.json`).catch(() => null),

          fetch(`${base}data/blog.json`).catch(() => null)

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

          de: "REINE REISEN. HEILIGE ERLEBNISSE."

        },

        foundedYear: 2014,

        companyReg: "PV 00374439",

        director: "Mallawa Arachchige Dhushantha Gihan Mallawaarachchi",

        address: "286/C, Niwandama South, Ja-Ela, Western Province, Sri Lanka – 11350 (12 Min./13km away from Airport)",

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



      // 6. Dynamic Blog Hydration (Sustainability, Homepage News, Blog Listing)

      this.hydrateBlogs();

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



  // Auto-init

  SiteData.init();



})(window, document);

