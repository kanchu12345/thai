/**
 * Lotus Ceylon - Master CMS Loader & Dynamic Hydration Engine (Phase 3)
 * Provides instantaneous cache-first rendering, live Firestore sync,
 * multi-language switching, and client-side 301 redirects.
 */

(function (window) {
  'use strict';

  const CACHE_KEY = 'lotus_seed_catalog_cache_v2';

  function getRelativePrefix() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/tours/')) {
      const parts = path.split('/tours/')[1].split('/').filter(function(p) { return p && !p.endsWith('.html'); });
      return '../'.repeat(parts.length + 1);
    }
    if (path.includes('/admin/')) {
      return '../';
    }
    return './';
  }

  function getFallbackUrl() {
    return getRelativePrefix() + 'data/seed-catalog.json';
  }

  const CMS = {
    data: null,
    currentLang: 'en',
    initialized: false,

    /**
     * Multilingual translation helper with English fallback
     */
    t(field, lang = null) {
      if (!field) return '';
      const targetLang = lang || this.currentLang || 'en';
      const cleanLang = (targetLang === 'zh-CN' || targetLang === 'zh-TW') ? 'zh' : targetLang;

      if (typeof field === 'string') return field;
      if (typeof field === 'object') {
        return field[cleanLang] || field['en'] || Object.values(field)[0] || '';
      }
      return String(field);
    },

    /**
     * Resolves image path relative to current page location across root and nested routes
     */
    resolveImg(url) {
      if (!url) return '';
      url = String(url).trim();
      if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
        return url;
      }
      const cleanUrl = url.replace(/^(\.\.\/)+/, '').replace(/^(\.\/)+/, '').replace(/^\//, '');
      return getRelativePrefix() + cleanUrl;
    },

    /**
     * Initialize CMS on page load
     */
    async init() {
      if (this.initialized) return;
      this.initialized = true;

      // 1. Determine active language
      const savedLang = localStorage.getItem('lotus_lang') || localStorage.getItem('lotus_preferred_lang') || document.documentElement.lang || 'en';
      this.currentLang = (savedLang === 'zh-CN' || savedLang === 'zh-TW') ? 'zh' : savedLang;

      // 2. Read from Cache first (0ms latency, zero layout shift)
      this.data = this.readCache();

      // 3. Handle 301 Client Redirects if needed
      this.checkRedirects();

      // 4. Hydrate DOM from Cache immediately
      if (this.data) {
        this.hydrateDOM();
      }

      // 5. Fetch fresh data from Firestore or seed-catalog.json
      await this.fetchFreshData();

      // 6. Setup Language Mutation Observer
      this.setupLanguageObserver();
    },

    readCache() {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return null;
    },

    saveCache(data) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      } catch (e) {}
    },

    /**
     * Check if current page URL is mapped in redirects collection
     */
    checkRedirects() {
      if (!this.data || !this.data.redirects) return;
      const currentPath = window.location.pathname;
      const redirects = this.data.redirects;

      for (const [from, to] of Object.entries(redirects)) {
        if (currentPath.endsWith(from) || currentPath === from) {
          console.log(`[LotusCMS] 301 Redirect: ${from} -> ${to}`);
          window.location.replace(to);
          return;
        }
      }
    },

    /**
     * Fetch fresh catalog data from Firestore or fallback bundle
     */
    async fetchFreshData() {
      let freshData = null;

      // Try Firebase live Firestore if available
      if (window.LotusFirebase && typeof window.LotusFirebase.fetchFirestoreCatalog === 'function' && navigator.onLine) {
        try {
          const liveCatalog = await window.LotusFirebase.fetchFirestoreCatalog();
          if (liveCatalog && liveCatalog.packages && liveCatalog.packages.length > 0) {
            freshData = {
              ...(this.data || {}),
              packages: liveCatalog.packages,
              tours: liveCatalog.packages,
              categories: liveCatalog.categories
            };
          }
        } catch (err) {
          console.warn('[LotusCMS] Firestore live fetch deferred:', err.message);
        }
      }

      // If no live Firestore data, load seed bundle
      if (!freshData) {
        try {
          const res = await fetch(getFallbackUrl());
          if (res.ok) {
            freshData = await res.json();
          }
        } catch (e) {
          console.warn('[LotusCMS] Could not load fallback JSON bundle:', e.message);
        }
      }

      if (freshData) {
        this.data = freshData;
        this.saveCache(freshData);
        this.hydrateDOM();
      }
    },

    /**
     * Hydrate all DOM elements across the page
     */
    hydrateDOM() {
      if (!this.data) return;
      const lang = this.currentLang;

      // 1. Hydrate Global Settings (Phone, Email, Address, WhatsApp, Slogan)
      const settings = (this.data.settings && this.data.settings[0]) || this.data.settings || {};
      if (settings.phone) {
        document.querySelectorAll('[data-cms="phone"]').forEach(el => el.textContent = settings.phone);
        document.querySelectorAll('a[href^="tel:"]').forEach(el => {
          el.href = 'tel:' + (settings.phoneRaw || settings.phone).replace(/\s+/g, '');
          if (el.textContent.includes('+94') || el.textContent.includes('71 54 22 384')) {
            el.textContent = settings.phone;
          }
        });
      }
      if (settings.email) {
        document.querySelectorAll('[data-cms="email"]').forEach(el => el.textContent = settings.email);
        document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
          el.href = 'mailto:' + settings.email;
          if (el.textContent.includes('@lotusceylon') || el.textContent.includes('info@')) {
            el.textContent = settings.email;
          }
        });
      }
      if (settings.address && settings.address.full) {
        document.querySelectorAll('[data-cms="address"]').forEach(el => el.textContent = settings.address.full);
      }
      if (settings.whatsappLink || settings.phoneRaw) {
        const waLink = settings.whatsappLink || `https://wa.me/${(settings.phoneRaw || '94715422384').replace(/\D/g, '')}`;
        document.querySelectorAll('.fab-whatsapp, .cta-wa-btn, .btn-mobile-whatsapp, [data-cms-href="whatsapp"], a[href*="wa.me"]').forEach(el => {
          el.href = waLink;
        });
      }
      if (settings.slogan) {
        document.querySelectorAll('[data-cms="slogan"]').forEach(el => el.textContent = this.t(settings.slogan, lang));
      }

      // 2. Hydrate Tour Package Cards (Auto-detecting from links or data-tour-slug)
      const tours = this.data.tours || this.data.packages || [];
      document.querySelectorAll('a[href*="tours/"]').forEach(a => {
        if (a.closest('.dest-card')) return; // Destination cards have their own hydration
        const href = a.getAttribute('href') || '';
        const m = href.match(/(?:^|\/)tours\/[^/]+\/([^/]+)/);
        if (m && m[1] && !m[1].endsWith('.html')) {
          const card = a.closest('.package-cards-grid > div, .hover-box, article, .tour-card, .curated-tour-card') || a;
          if (!card.hasAttribute('data-tour-slug')) {
            card.setAttribute('data-tour-slug', m[1]);
          }
        }
      });

      document.querySelectorAll('[data-tour-slug]').forEach(card => {
        const slug = card.getAttribute('data-tour-slug');
        const tour = tours.find(t => t.slug === slug);
        if (tour) {
          const titleEl = card.querySelector('.tour-card-title, [data-cms="tour-title"], .heading--24');
          if (titleEl) titleEl.textContent = this.t(tour.title, lang);

          const descEl = card.querySelector('.tour-card-desc, [data-cms="tour-desc"], .paragraph--14');
          if (descEl) descEl.textContent = this.t(tour.tagline || tour.overview, lang);

          const priceEl = card.querySelector('.tour-card-price, [data-cms="tour-price"]');
          if (priceEl && tour.price_from) priceEl.textContent = '$' + tour.price_from;

          const daysEl = card.querySelector('[data-cms="tour-days"], .paragraph--18');
          if (daysEl) daysEl.textContent = `${tour.nights || 0} Nights & ${tour.days || 0} Days`;

          const imgEl = card.querySelector('.tour-card-img, [data-cms="tour-img"], .slider-img.active');
          if (imgEl && tour.hero_image) imgEl.src = this.resolveImg(tour.hero_image);
        }
      });

      // 2.5 Hydrate Current Tour Detail Page if on one
      const path = window.location.pathname.replace(/\\/g, '/');
      if (path.includes('/tours/') && !path.endsWith('/tours/') && !path.endsWith('/tours/index.html')) {
        const pathParts = path.split('/').filter(Boolean);
        const currentTour = tours.find(t => pathParts.includes(t.slug));
        if (currentTour) {
          const heroTitleMain = document.querySelector('.hero-title-main');
          if (heroTitleMain) {
            heroTitleMain.textContent = this.t(currentTour.title, lang);
          } else {
            const h1 = document.querySelector('.tour-hero-title');
            if (h1) h1.textContent = this.t(currentTour.title, lang);
          }

          const heroTagline = document.querySelector('.tour-hero-tagline');
          if (heroTagline) heroTagline.textContent = this.t(currentTour.tagline || currentTour.overview, lang);

          const heroBadgeDays = document.querySelector('.tour-badge-gold');
          if (heroBadgeDays) heroBadgeDays.textContent = `${currentTour.nights || 0} Nights • ${currentTour.days || 0} Days`;

          const heroBg = document.querySelector('.tour-hero-banner, .tour-hero');
          if (heroBg && currentTour.hero_image) {
            heroBg.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.7)), url("${this.resolveImg(currentTour.hero_image)}")`;
          }
        }
      }

      // 3. Hydrate Destination Cards (Auto-detecting from titles or data-dest-slug)
      const destinations = this.data.destinations || [];
      document.querySelectorAll('.dest-card').forEach(card => {
        if (!card.hasAttribute('data-dest-slug')) {
          const title = card.querySelector('.dest-card-title')?.textContent?.trim().toLowerCase();
          if (title) {
            const match = destinations.find(d => (d.title && typeof d.title === 'object' && d.title.en.toLowerCase() === title) || d.slug === title);
            if (match) card.setAttribute('data-dest-slug', match.slug);
          }
        }
      });

      document.querySelectorAll('[data-dest-slug]').forEach(card => {
        const slug = card.getAttribute('data-dest-slug');
        const dest = destinations.find(d => d.slug === slug);
        if (dest) {
          const titleEl = card.querySelector('.dest-card-title, [data-cms="dest-title"]');
          if (titleEl) titleEl.textContent = this.t(dest.title, lang);

          const descEl = card.querySelector('.dest-card-desc, [data-cms="dest-desc"]');
          if (descEl) descEl.textContent = this.t(dest.description, lang);

          const imgEl = card.querySelector('.dest-card-img, [data-cms="dest-img"]');
          if (imgEl && dest.image) imgEl.src = this.resolveImg(dest.image);
        }
      });

      // 4. Hydrate Category Elements
      const categories = this.data.categories || [];
      const catList = Array.isArray(categories) ? categories : Object.values(categories);
      document.querySelectorAll('[data-cat-slug]').forEach(card => {
        const slug = card.getAttribute('data-cat-slug');
        const cat = catList.find(c => c.slug === slug);
        if (cat) {
          const titleEl = card.querySelector('[data-cms="cat-title"]');
          if (titleEl) titleEl.textContent = this.t(cat.title, lang);

          const taglineEl = card.querySelector('[data-cms="cat-tagline"]');
          if (taglineEl) taglineEl.textContent = this.t(cat.tagline, lang);

          const descEl = card.querySelector('[data-cms="cat-desc"]');
          if (descEl) descEl.textContent = this.t(cat.description, lang);
        }
      });

      // 5. Hydrate FAQs
      const faqs = this.data.faqs || [];
      document.querySelectorAll('[data-faq-id]').forEach(item => {
        const id = item.getAttribute('data-faq-id');
        const faq = faqs.find(f => f.id === id);
        if (faq) {
          const qEl = item.querySelector('.accordion-header-btn span, [data-cms="faq-q"]');
          if (qEl) qEl.textContent = this.t(faq.question, lang);

          const aEl = item.querySelector('.accordion-content-box p, [data-cms="faq-a"]');
          if (aEl) aEl.textContent = this.t(faq.answer, lang);
        }
      });
    },

    /**
     * Switch active language in real time
     */
    setLanguage(langCode) {
      this.currentLang = (langCode === 'zh-CN' || langCode === 'zh-TW') ? 'zh' : langCode;
      this.hydrateDOM();
    },

    /**
     * Observe language switcher mutations on <html> element
     */
    setupLanguageObserver() {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
            const newLang = document.documentElement.lang;
            if (newLang) {
              this.setLanguage(newLang);
            }
          }
        });
      });

      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

      window.addEventListener('lotus-lang-changed', (e) => {
        if (e.detail && e.detail.lang) {
          this.setLanguage(e.detail.lang);
        }
      });
    }
  };

  window.LotusCMS = CMS;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CMS.init());
  } else {
    CMS.init();
  }
})(window);
