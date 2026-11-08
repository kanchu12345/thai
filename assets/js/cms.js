/*
 * © 2026 Infinite Design. All rights reserved.
 * Built for Lotus Ceylon International Tours & Services (Pvt) Ltd.
 * Unauthorized removal of attribution does not transfer ownership of this code.
 * https://infiniteweb.dev/
 */
/**
 * Lotus Ceylon Universal CMS Engine (Phase 1)
 * 
 * High-performance, zero-dependency, non-blocking client that reads live content
 * from Firestore REST API, binds data-cms attributes, manages 10-language translations,
 * and maintains resilient local caching.
 */

(function (window, document) {
  'use strict';

  const CACHE_KEY = 'lotus_cms_v6';
  const CACHE_TTL_MS = 30 * 1000; // 10 minutes
  const LEGACY_CACHE_KEYS = ['lotus_cms_v5', 'lotus_seed_catalog_cache_v2', 'lotus_seed_catalog_cache'];

  // Legacy Image Alias Mapping
  const IMAGE_ALIAS_MAP = {
    'assets/tours/beach/southern-sands-1.jpg': 'assets/images/beach/mirissa-1.webp',
    'assets/tours/beach/seaboard-odyssey-1.jpg': 'assets/images/beach/unawatuna-2.webp',
    'assets/tours/beach/eastern-sanctuary-1.jpg': 'assets/images/beach/pasikudah-5.webp',
    'assets/tours/cultural/royal-kingdoms-1.jpg': 'assets/images/cultural/sigiriya-1.webp',
    'assets/tours/cultural/sacred-triangle-1.jpg': 'assets/images/cultural/dambulla-cave-temple-2.webp',
    'assets/tours/cultural/three-millennia-1.jpg': 'assets/images/cultural/polonnaruwa-gal-vihara-3.webp',
    'assets/tours/wildlife/big-five-1.jpg': 'assets/images/wildlife/yala-leopard-1.webp',
    'assets/tours/wildlife/rainforest-1.jpg': 'assets/images/wildlife/sinharaja-rainforest-5.webp',
    'assets/tours/wildlife/predator-trail-1.jpg': 'assets/images/wildlife/minneriya-elephant-gathering-2.webp',
    'assets/tours/wildlife/biosphere-odyssey-1.jpg': 'assets/images/wildlife/udawalawe-3.webp'
  };

  function getApiKey() {
    return (window.LOTUS_CONFIG && window.LOTUS_CONFIG.firebase && window.LOTUS_CONFIG.firebase.apiKey) || 'AIzaSyD5NyCFaPHeS1cKlsgxZ_WsraswHlYonNA';
  }

  function getProjectId() {
    return (window.LOTUS_CONFIG && window.LOTUS_CONFIG.firebase && window.LOTUS_CONFIG.firebase.projectId) || 'louterst-36b64';
  }

  function getFirestoreRestBase() {
    return 'https://firestore.googleapis.com/v1/projects/' + getProjectId() + '/databases/(default)/documents';
  }

  function getRelativePrefix() {
    const path = window.location.pathname.replace(/\\/g, '/');
    let p = path;
    if (p.includes('/thai/')) {
      p = p.split('/thai/')[1] || '';
    } else {
      p = p.replace(/^\//, '');
    }
    const segments = p.split('/').filter(function (s) {
      return s && !s.endsWith('.html');
    });
    return segments.length === 0 ? './' : '../'.repeat(segments.length);
  }

  function resolveImgUrl(url) {
    if (!url) return '';
    url = String(url).trim();
    if (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('data:') || url.startsWith('blob:')) {
      return url;
    }
    const clean = url.replace(/^(\.\.\/)+/, '').replace(/^(\.\/)+/, '').replace(/^\//, '');
    const aliased = IMAGE_ALIAS_MAP[clean] || clean;
    if (IMAGE_ALIAS_MAP[clean] && window.location.search.includes('debug=1')) {
      console.warn('[CMS Image Alias Fallback] Legacy image path redirected:', clean, '->', aliased);
    }
    return getRelativePrefix() + aliased;
  }

  function unwrapFirestoreValue(val) {
    if (!val || typeof val !== 'object') return val;
    if ('stringValue' in val) return val.stringValue;
    if ('integerValue' in val) return parseInt(val.integerValue, 10);
    if ('doubleValue' in val) return parseFloat(val.doubleValue);
    if ('booleanValue' in val) return val.booleanValue;
    if ('nullValue' in val) return null;
    if ('timestampValue' in val) return val.timestampValue;
    if ('arrayValue' in val) {
      const arr = val.arrayValue.values || [];
      return arr.map(unwrapFirestoreValue);
    }
    if ('mapValue' in val) {
      const fields = val.mapValue.fields || {};
      const res = {};
      for (const k in fields) {
        if (fields.hasOwnProperty(k)) {
          res[k] = unwrapFirestoreValue(fields[k]);
        }
      }
      return res;
    }
    return val;
  }

  function unwrapFirestoreDoc(doc) {
    if (!doc || !doc.fields) return null;
    const result = {};
    for (const key in doc.fields) {
      if (doc.fields.hasOwnProperty(key)) {
        result[key] = unwrapFirestoreValue(doc.fields[key]);
      }
    }
    return result;
  }

  function sanitizeHtml(htmlString) {
    if (!htmlString || typeof htmlString !== 'string') return '';
    const temp = document.createElement('div');
    temp.innerHTML = htmlString;
    const allowedTags = ['STRONG', 'EM', 'B', 'I', 'BR', 'P', 'SPAN', 'A', 'UL', 'OL', 'LI'];

    function walk(node) {
      const children = Array.from(node.childNodes);
      for (const child of children) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          if (!allowedTags.includes(child.tagName)) {
            const textNode = document.createTextNode(child.textContent);
            node.replaceChild(textNode, child);
          } else {
            // Strip unsafe attributes
            const attrs = Array.from(child.attributes);
            for (const attr of attrs) {
              const attrName = attr.name.toLowerCase();
              if (child.tagName === 'A' && attrName === 'href') {
                const href = attr.value.trim().toLowerCase();
                if (href.startsWith('javascript:') || href.startsWith('data:')) {
                  child.removeAttribute(attr.name);
                }
              } else if (child.tagName === 'A' && (attrName === 'target' || attrName === 'rel')) {
                // Keep target and rel for links
              } else {
                child.removeAttribute(attr.name);
              }
            }
            walk(child);
          }
        }
      }
    }

    walk(temp);
    return temp.innerHTML;
  }

  const CMS = {
    data: {
      siteGlobal: {},
      page: {}
    },
    currentLang: 'en',
    pageKey: '',
    initialized: false,
    listTemplates: {},

    detectLanguage() {
      const savedLang = window.__LOTUS_LANG ||
        localStorage.getItem('lotus_lang') ||
        localStorage.getItem('lotus_preferred_lang') ||
        document.documentElement.lang ||
        'en';
      this.currentLang = savedLang;
      if (savedLang === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
      return this.currentLang;
    },

    resolveI18n(val, lang) {
      if (val === null || val === undefined) return null;
      if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
        return val;
      }
      if (typeof val === 'object') {
        const targetLang = lang || this.currentLang || 'en';
        if (val[targetLang] !== undefined) return val[targetLang];
        if (targetLang === 'zh-TW' && val['zh-Hant'] !== undefined) return val['zh-Hant'];
        if (targetLang === 'zh-TW' && val['zh'] !== undefined) return val['zh'];
        if (targetLang === 'zh-CN' && val['zh-Hans'] !== undefined) return val['zh-Hans'];
        if (targetLang === 'zh-CN' && val['zh'] !== undefined) return val['zh'];
        if (val['en'] !== undefined) return val['en'];
        const first = Object.values(val)[0];
        return first !== undefined ? first : '';
      }
      return String(val);
    },

    determinePageKey() {
      const explicit = document.body ? (document.body.getAttribute('data-cms-page') || document.documentElement.getAttribute('data-cms-page')) : null;
      if (explicit) return explicit;

      const path = window.location.pathname.replace(/\\/g, '/');
      if (path.includes('/tours/')) {
        const parts = path.split('/tours/')[1].split('/').filter(function (p) {
          return p && !p.endsWith('.html');
        });
        if (parts.length >= 2) {
          // e.g. tours/beach/southern-sands-serenade
          const slug = parts[parts.length - 1];
          return 'tourPackages/' + slug;
        } else if (parts.length === 1) {
          return 'tourCategories/' + parts[0];
        }
      }
      if (path.includes('/destinations/')) {
        const parts = path.split('/destinations/')[1].split('/').filter(function (p) {
          return p && !p.endsWith('.html');
        });
        if (parts.length >= 1) {
          return 'destinations/' + parts[0];
        }
      }
      if (path.includes('/blog/')) {
        const parts = path.split('/blog/')[1].split('/').filter(function (p) {
          return p && !p.endsWith('.html');
        });
        if (parts.length >= 1) {
          return 'blogPosts/' + parts[0];
        }
      }
      if (path.endsWith('about.html') || path.includes('/about.')) return 'siteContent/about';
      if (path.endsWith('contact.html') || path.includes('/contact.')) return 'siteContent/contact';
      if (path.endsWith('destinations.html') || path.includes('/destinations.')) return 'siteContent/destinations';
      if (path.endsWith('experiences.html') || path.includes('/experiences.')) return 'siteContent/experiences';
      if (path.endsWith('gallery.html') || path.includes('/gallery.')) return 'siteContent/gallery';
      if (path.endsWith('reviews.html') || path.includes('/reviews.')) return 'siteContent/reviews';
      if (path.endsWith('blog.html') || path.includes('/blog.')) return 'siteContent/blog';
      if (path.endsWith('sri-lanka-tours.html') || path.endsWith('tours.html')) return 'siteContent/toursCatalog';
      if (path.endsWith('privacy-policy.html')) return 'siteContent/privacy-policy';
      if (path.endsWith('terms-conditions.html')) return 'siteContent/terms-conditions';
      if (path.endsWith('cancellation-policy.html')) return 'siteContent/cancellation-policy';
      if (path.endsWith('cookie-policy.html')) return 'siteContent/cookie-policy';
      if (path.endsWith('inquiry-quick.html')) return 'siteContent/inquiry-quick';
      if (path.endsWith('inquiry-detailed.html')) return 'siteContent/inquiry-detailed';

      return 'siteContent/home';
    },

    getValueByPath(pathStr) {
      if (!pathStr) return null;

      // 1. Try from siteGlobal first if path starts with siteGlobal
      if (pathStr.startsWith('siteGlobal.')) {
        const parts = pathStr.split('.');
        let curr = this.data.siteGlobal;
        for (let i = 1; i < parts.length; i++) {
          if (curr === null || curr === undefined) return null;
          curr = curr[parts[i]];
        }
        return curr;
      }

      // 2. Try from current page document
      if (this.data.page) {
        // A. Direct literal key check (e.g. "destinations.img_1" or "img_1")
        if (this.data.page[pathStr] !== undefined && this.data.page[pathStr] !== null) {
          return this.data.page[pathStr];
        }

        // B. Subkey check (strip prefix: "destinations.img_1" -> "img_1")
        const dotIdx = pathStr.indexOf('.');
        if (dotIdx !== -1) {
          const subKey = pathStr.substring(dotIdx + 1);
          if (this.data.page[subKey] !== undefined && this.data.page[subKey] !== null) {
            return this.data.page[subKey];
          }

          // Nested object access with subKey
          const subParts = subKey.split('.');
          let subCurr = this.data.page;
          let subFound = true;
          for (let i = 0; i < subParts.length; i++) {
            if (subCurr === null || subCurr === undefined || subCurr[subParts[i]] === undefined) {
              subFound = false;
              break;
            }
            subCurr = subCurr[subParts[i]];
          }
          if (subFound && subCurr !== null && subCurr !== undefined) return subCurr;
        }

        // C. Add docId prefix if missing (e.g. "img_1" -> "destinations.img_1")
        const docName = (this.pageKey || '').split('/').pop();
        if (docName) {
          const prefixedKey = docName + '.' + pathStr;
          if (this.data.page[prefixedKey] !== undefined && this.data.page[prefixedKey] !== null) {
            return this.data.page[prefixedKey];
          }
        }

        // D. Nested traversal on page
        const parts = pathStr.split('.');
        let curr = this.data.page;
        let found = true;
        for (let i = 0; i < parts.length; i++) {
          if (curr === null || curr === undefined || curr[parts[i]] === undefined) {
            found = false;
            break;
          }
          curr = curr[parts[i]];
        }
        if (found && curr !== null && curr !== undefined) return curr;
      }

      // 3. Try root fallback
      let curr = this.data;
      if (curr && curr[pathStr] !== undefined) return curr[pathStr];
      const parts = pathStr.split('.');
      for (let i = 0; i < parts.length; i++) {
        if (curr === null || curr === undefined) return null;
        curr = curr[parts[i]];
      }
      return curr;
    },

    attachImgErrorHandler(img) {
      if (img._cmsErrorHandled) return;
      img._cmsErrorHandled = true;
      const defaultSrc = img.getAttribute('src');
      img.addEventListener('error', function () {
        if (img._hasRetriedDefault) return;
        img._hasRetriedDefault = true;
        if (window.location.search.includes('debug=1')) {
          console.warn('[CMS Image Error] Failed to load:', img.src, 'falling back to:', defaultSrc);
        }
        if (defaultSrc && img.src !== defaultSrc) {
          img.src = defaultSrc;
        }
      });
    },

    bindElements(scope = document) {
      const lang = this.currentLang;

      // 0. Check hidden elements
      scope.querySelectorAll('[data-cms], [data-cms-html], [data-cms-img], [data-cms-bg], [data-cms-video], [data-cms-link]').forEach(el => {
        const key = el.getAttribute('data-cms') || el.getAttribute('data-cms-html') || el.getAttribute('data-cms-img') || el.getAttribute('data-cms-bg') || el.getAttribute('data-cms-video') || el.getAttribute('data-cms-link');
        if (key) {
          const hiddenVal = this.getValueByPath(key + '_hidden');
          if (hiddenVal === 'true' || hiddenVal === true) {
            el.setAttribute('data-cms-hidden', 'true');
            if (window.location.search.includes('edit=1')) {
              el.style.opacity = '0.35';
              el.style.filter = 'grayscale(80%)';
              el.style.outline = '2px dashed #EF4444';
            } else {
              el.style.display = 'none';
            }
          }
        }
      });

      // 1. data-cms (textContent or input placeholder)
      scope.querySelectorAll('[data-cms]').forEach(el => {
        const key = el.getAttribute('data-cms');
        const raw = this.getValueByPath(key);
        const val = this.resolveI18n(raw, lang);
        if (val !== null && val !== undefined && val !== '') {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.setAttribute('placeholder', String(val));
          } else {
            if (el.textContent !== String(val)) {
              el.textContent = String(val);
            }
          }
          el.setAttribute('data-translated-by', 'cms');
        }
      });

      // 2. data-cms-html (sanitized innerHTML)
      scope.querySelectorAll('[data-cms-html]').forEach(el => {
        const key = el.getAttribute('data-cms-html');
        const raw = this.getValueByPath(key);
        const val = this.resolveI18n(raw, lang);
        if (val !== null && val !== undefined && val !== '') {
          const clean = sanitizeHtml(String(val));
          if (el.innerHTML !== clean) {
            el.innerHTML = clean;
          }
          el.setAttribute('data-translated-by', 'cms');
        }
      });

      // 3. data-cms-img (src)
      scope.querySelectorAll('[data-cms-img]').forEach(el => {
        const key = el.getAttribute('data-cms-img');
        const raw = this.getValueByPath(key);
        if (raw !== undefined && raw !== null) {
          const resolved = raw ? resolveImgUrl(raw) : 'assets/images/placeholder.png';
          if (resolved && el.getAttribute('src') !== resolved) {
            this.attachImgErrorHandler(el);
            el.setAttribute('src', resolved);
          }
        }
      });

      // 4. data-cms-alt (alt)
      scope.querySelectorAll('[data-cms-alt]').forEach(el => {
        const key = el.getAttribute('data-cms-alt');
        const raw = this.getValueByPath(key);
        const val = this.resolveI18n(raw, lang);
        if (val) {
          el.setAttribute('alt', String(val));
        }
      });

      // 5. data-cms-bg (background-image)
      scope.querySelectorAll('[data-cms-bg]').forEach(el => {
        const key = el.getAttribute('data-cms-bg');
        const raw = this.getValueByPath(key);
        if (raw) {
          const resolved = resolveImgUrl(raw);
          if (resolved) {
            if (el.classList.contains('sacred-cta-banner')) {
              el.style.backgroundImage = `linear-gradient(135deg, rgba(13, 43, 29, 0.82) 0%, rgba(22, 54, 29, 0.90) 100%), url("${val}")`;
            } else if (el.classList.contains('dest-hero') || el.classList.contains('about-hero') || el.classList.contains('contact-hero') || el.classList.contains('exp-hero') || el.classList.contains('gallery-hero') || el.classList.contains('reviews-hero') || el.classList.contains('blog-hero') || el.classList.contains('beach-hero-banner') || el.classList.contains('tours-hero-banner') || el.classList.contains('banner-section-inner')) {
              el.style.backgroundImage = `linear-gradient(180deg, rgba(0, 43, 73, 0.65) 0%, rgba(0, 43, 73, 0.88) 100%), url("${resolved}")`;
            } else {
              el.style.backgroundImage = `url("${resolved}")`;
            }
          }
        }
      });

      // 6. data-cms-video (video or source src)
      scope.querySelectorAll('[data-cms-video]').forEach(el => {
        const key = el.getAttribute('data-cms-video');
        const raw = this.getValueByPath(key);
        if (raw) {
          const resolved = resolveImgUrl(raw);
          if (resolved) {
            const currentSrc = el.getAttribute('src');
            if (currentSrc !== resolved) {
              el.setAttribute('src', resolved);
              if (el.tagName === 'VIDEO') {
                el.src = resolved;
              } else if (el.tagName === 'SOURCE') {
                el.src = resolved;
                if (el.parentElement && el.parentElement.tagName === 'VIDEO') {
                  el.parentElement.load();
                  el.parentElement.play().catch(function(){});
                }
              }
            }
          }
        }
      });

      // 7. data-cms-link (href)
      scope.querySelectorAll('[data-cms-link]').forEach(el => {
        const key = el.getAttribute('data-cms-link');
        const raw = this.getValueByPath(key);
        if (raw && typeof raw === 'string') {
          el.setAttribute('href', raw);
        }
      });

      // 8. data-cms-list (repeatable dynamic items)
      scope.querySelectorAll('[data-cms-list]').forEach(container => {
        const listKey = container.getAttribute('data-cms-list');
        const items = this.getValueByPath(listKey);

        if (!this.listTemplates[listKey]) {
          this.listTemplates[listKey] = container.innerHTML;
        }

        if (Array.isArray(items) && items.length > 0) {
          const templateHtml = this.listTemplates[listKey];
          const tempParent = document.createElement('div');
          tempParent.innerHTML = templateHtml;
          const templateNode = tempParent.firstElementChild;

          if (!templateNode) return;

          container.innerHTML = '';

          items.forEach((item, index) => {
            const clone = templateNode.cloneNode(true);

            // Bind scalar item or object properties to cloned node
            if (typeof item === 'string' || typeof item === 'number') {
              if (clone.hasAttribute('data-cms') && !clone.getAttribute('data-cms')) {
                clone.textContent = String(item);
              } else {
                clone.textContent = String(item);
              }
            } else if (typeof item === 'object' && item !== null) {
              // Bind child elements inside the item
              clone.querySelectorAll('[data-cms]').forEach(child => {
                const subKey = child.getAttribute('data-cms').replace(/^\./, '');
                const rawVal = item[subKey];
                const resolved = this.resolveI18n(rawVal, lang);
                if (resolved !== null && resolved !== undefined && resolved !== '') {
                  child.textContent = String(resolved);
                  child.setAttribute('data-translated-by', 'cms');
                }
              });

              clone.querySelectorAll('[data-cms-html]').forEach(child => {
                const subKey = child.getAttribute('data-cms-html').replace(/^\./, '');
                const rawVal = item[subKey];
                const resolved = this.resolveI18n(rawVal, lang);
                if (resolved !== null && resolved !== undefined && resolved !== '') {
                  child.innerHTML = sanitizeHtml(String(resolved));
                  child.setAttribute('data-translated-by', 'cms');
                }
              });

              clone.querySelectorAll('[data-cms-img]').forEach(child => {
                const subKey = child.getAttribute('data-cms-img').replace(/^\./, '');
                const rawVal = item[subKey];
                if (rawVal) {
                  const resolved = resolveImgUrl(rawVal);
                  if (resolved) {
                    this.attachImgErrorHandler(child);
                    child.setAttribute('src', resolved);
                  }
                }
              });
            }

            container.appendChild(clone);
          });
        }
      });
    },

    purgeLegacyCaches() {
      LEGACY_CACHE_KEYS.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (e) {}
      });
    },

    readCache() {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.version || !parsed.data) return null;
        if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
        return parsed;
      } catch (e) {
        return null;
      }
    },

    writeCache(version, data) {
      try {
        const payload = {
          version: version,
          fetchedAt: Date.now(),
          pageKey: this.pageKey,
          data: data
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
      } catch (e) {}
    },

    async fetchVersion() {
      const url = getFirestoreRestBase() + '/siteMeta/version?key=' + getApiKey();
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        if (res.status === 404) return 1;
        throw new Error('Version fetch HTTP ' + res.status);
      }
      const json = await res.json();
      const unwrapped = unwrapFirestoreDoc(json);
      return (unwrapped && unwrapped.v) ? unwrapped.v : 1;
    },

    async fetchBatchedDocuments(docPaths) {
      const projectId = getProjectId();
      const fullDocNames = docPaths.map(p => `projects/${projectId}/databases/(default)/documents/${p}`);

      const res = await fetch(getFirestoreRestBase() + ':batchGet?key=' + getApiKey(), {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documents: fullDocNames })
      });

      if (!res.ok) {
        throw new Error('BatchGet HTTP ' + res.status);
      }

      const results = await res.json();
      const mapped = {};

      if (Array.isArray(results)) {
        results.forEach(entry => {
          if (entry.found && entry.found.name) {
            const docName = entry.found.name;
            const relativePath = docName.split('/databases/(default)/documents/')[1];
            mapped[relativePath] = unwrapFirestoreDoc(entry.found);
          }
        });
      }

      return mapped;
    },

    async loadContent() {
      const urlParams = new URLSearchParams(window.location.search);
      const isPreview = urlParams.has('preview');
      this.pageKey = this.determinePageKey();

      // Check instant local storage sync across tabs
      try {
        const instantPublished = localStorage.getItem('lotus_cms_published_' + this.pageKey);
        if (instantPublished) {
          const parsedPub = JSON.parse(instantPublished);
          if (parsedPub) {
            this.data.page = Object.assign({}, this.data.page || {}, parsedPub);
          }
        }
      } catch (e) {}

      if (isPreview) {
        console.info('[CMS Preview Mode] Active. Cache bypassed.');
        this.setupPreviewListener();
      }

      // Check cache if not in preview
      if (!isPreview) {
        const cached = this.readCache();
        const forceRefresh = urlParams.has('cms_refresh') || urlParams.has('refresh');
        const SESSION_VER_CHECK_KEY = 'lotus_cms_last_ver_check';
        const VER_CHECK_INTERVAL_MS = 10 * 1000; // 5 minutes

        let lastVerCheck = 0;
        try {
          lastVerCheck = parseInt(sessionStorage.getItem(SESSION_VER_CHECK_KEY) || '0', 10);
        } catch (e) {}

        const shouldCheckVersion = forceRefresh || (Date.now() - lastVerCheck > VER_CHECK_INTERVAL_MS);

        if (cached && cached.data && cached.pageKey === this.pageKey) {
          this.data = cached.data;
          this.bindElements();

          if (!shouldCheckVersion) {
            return; // Cache valid and version verified within 5-min session window: zero network calls!
          }

          // Check version asynchronously in background
          try {
            const currentVer = await this.fetchVersion();
            try {
              sessionStorage.setItem(SESSION_VER_CHECK_KEY, String(Date.now()));
            } catch (e) {}

            if (currentVer === cached.version) {
              return; // Cache is current
            }
          } catch (e) {
            return; // Network error, stick with valid cache
          }
        }
      }

      // Fetch fresh data
      try {
        let version = 1;
        try {
          version = await this.fetchVersion();
        } catch (e) {}

        const globalDocs = [
          'siteGlobal/branding',
          'siteGlobal/header',
          'siteGlobal/footer',
          'siteGlobal/contact',
          'siteGlobal/menu'
        ];

        const docsToFetch = [...globalDocs, this.pageKey];
        const docResults = await this.fetchBatchedDocuments(docsToFetch);

        const siteGlobal = {
          branding: docResults['siteGlobal/branding'] || {},
          header: docResults['siteGlobal/header'] || {},
          footer: docResults['siteGlobal/footer'] || {},
          contact: docResults['siteGlobal/contact'] || {},
          menu: docResults['siteGlobal/menu'] || {}
        };

        const pageDoc = docResults[this.pageKey] || {};

        this.data = {
          siteGlobal: siteGlobal,
          page: pageDoc
        };

        this.bindElements();

        if (!isPreview) {
          this.writeCache(version, this.data);
          try {
            sessionStorage.setItem('lotus_cms_last_ver_check', String(Date.now()));
          } catch (e) {}
        }
      } catch (err) {
        if (window.location.search.includes('debug=1')) {
          console.warn('[CMS] Failed to fetch live content, falling back to hardcoded defaults:', err);
        }
      }
    },

    setupPreviewListener() {
      window.addEventListener('message', event => {
        if (!event.data || typeof event.data !== 'object') return;
        if (event.data.type === 'lotus:cms-preview') {
          if (event.data.page) {
            this.data.page = Object.assign({}, this.data.page, event.data.page);
          }
          if (event.data.siteGlobal) {
            this.data.siteGlobal = Object.assign({}, this.data.siteGlobal, event.data.siteGlobal);
          }
          this.bindElements();
        }
      });
    },

    setupLanguageListeners() {
      // Custom event for instant in-page updates
      window.addEventListener('lotus:languageChanged', (e) => {
        const lang = (e.detail && e.detail.lang) || e.detail;
        if (lang) {
          this.currentLang = lang;
          if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
          } else {
            document.documentElement.dir = 'ltr';
          }
          this.bindElements();
        }
      });

      // Observer for html lang attribute changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
            const newLang = document.documentElement.lang;
            if (newLang && newLang !== this.currentLang) {
              this.currentLang = newLang;
              this.bindElements();
            }
          }
        });
      });

      observer.observe(document.documentElement, { attributes: true });
    },

  
    setupVisualEditMode() {
      const urlParams = new URLSearchParams(window.location.search);
      const isEditMode = urlParams.has('edit') || (window.self !== window.top && urlParams.has('preview'));
      if (!isEditMode) return;

      console.info('[LotusCMS] Visual Edit Mode activated (?edit=1)');

      // 1. Inject Visual Edit Styles
      const style = document.createElement('style');
      style.id = 'lotus-cms-edit-styles';
      style.textContent = `
        [data-cms], [data-cms-html], [data-cms-img], [data-cms-bg], [data-cms-video], [data-cms-link], [data-cms-list] {
          cursor: pointer !important;
          transition: outline 0.15s ease, box-shadow 0.15s ease !important;
        }
        [data-cms]:hover, [data-cms-html]:hover, [data-cms-img]:hover, [data-cms-bg]:hover, [data-cms-video]:hover, [data-cms-link]:hover, [data-cms-list]:hover {
          outline: 2px dashed #D4A373 !important;
          outline-offset: 3px !important;
        }
        .lotus-cms-selected-element {
          outline: 3px solid #008080 !important;
          outline-offset: 4px !important;
          box-shadow: 0 0 16px rgba(0, 128, 128, 0.45) !important;
          position: relative !important;
          z-index: 10 !important;
        }
        body.cms-edit-active a {
          cursor: pointer !important;
        }
        /* Disable pointer-events on overlays so underlying images and cards can be clicked */
        body.cms-edit-active .hover-box__overlay,
        body.cms-edit-active .hover-box:hover .hover-box__overlay,
        body.cms-edit-active .hero-banner-overlay,
        body.cms-edit-active .video-overlay,
        body.cms-edit-active [class*="overlay"]:not([data-cms]):not([data-cms-img]) {
          pointer-events: none !important;
        }
        /* Ensure card image containers are interactive */
        body.cms-edit-active .beach-card-img-wrap,
        body.cms-edit-active .card-image-slider,
        body.cms-edit-active .news-card-big,
        body.cms-edit-active .news-side-item,
        body.cms-edit-active img {
          pointer-events: auto !important;
        }
        body.cms-edit-active .news-card-big img,
        body.cms-edit-active .news-side-item img {
          pointer-events: auto !important;
          cursor: pointer !important;
        }
        body.cms-edit-active .news-card-big-content {
          pointer-events: none !important;
        }
        body.cms-edit-active .news-card-big-content > * {
          pointer-events: auto !important;
        }
        /* Enable pointer-events on watermark headings so they can be clicked and edited */
        body.cms-edit-active .watermark-heading,
        body.cms-edit-active [class*="watermark"] {
          pointer-events: auto !important;
          cursor: pointer !important;
          user-select: text !important;
          position: relative !important;
          z-index: 10 !important;
        }
        body.cms-edit-active .watermark-heading:hover,
        body.cms-edit-active [class*="watermark"]:hover {
          outline: 2px dashed #D4A373 !important;
          outline-offset: 4px !important;
          background: rgba(212, 163, 115, 0.12) !important;
        }
        /* Ensure all data-cms elements have pointer-events auto */
        body.cms-edit-active [data-cms],
        body.cms-edit-active [data-cms-html],
        body.cms-edit-active [data-cms-img],
        body.cms-edit-active [data-cms-bg],
        body.cms-edit-active [data-cms-video],
        body.cms-edit-active [data-cms-link] {
          pointer-events: auto !important;
        }
        body.cms-edit-active [data-cms-bg] {
          outline: 2px dashed rgba(212, 175, 55, 0.65) !important;
          outline-offset: -2px !important;
          cursor: pointer !important;
        }
        body.cms-edit-active [data-cms-bg]:hover {
          outline: 3px solid #D4AF37 !important;
        }
      `;
      document.head.appendChild(style);
      document.body.classList.add('cms-edit-active');

      // 2. Click-to-edit interceptor
      let activeEl = null;

      document.addEventListener('click', (e) => {
        // Prevent default navigation on links in visual edit mode so clicking cards selects element
        const anchor = e.target.closest('a');
        if (anchor && (anchor.hasAttribute('data-cms-link') || anchor.querySelector('[data-cms], [data-cms-img], [data-cms-html]') || anchor.classList.contains('hover-box') || anchor.classList.contains('next-btn') || anchor.classList.contains('btn-beach-view') || anchor.classList.contains('btn-beach-inquire'))) {
          e.preventDefault();
        }

        // Check if element belongs to Our Success Stories homepage landscape card
        const storyCard = e.target.closest('#homeSuccessStoriesWrapper, #successStoriesCard, .success-stories-landscape-card');
        if (storyCard) {
          e.preventDefault();
          e.stopPropagation();

          if (activeEl) activeEl.classList.remove('lotus-cms-selected-element');
          activeEl = storyCard;
          activeEl.classList.add('lotus-cms-selected-element');

          const curIdxEl = document.getElementById('storyCurrentIndex');
          const currentSlide = curIdxEl ? (parseInt(curIdxEl.textContent, 10) - 1) : 0;
          const stories = (window.LotusSuccessStories && typeof window.LotusSuccessStories.getStories === 'function')
            ? window.LotusSuccessStories.getStories()
            : [];
          const curStory = (stories && stories[currentSlide]) || {};
          const titleEl = document.getElementById('storyTitle');
          const descEl = document.getElementById('storyDesc');
          const badgeEl = document.getElementById('storyBadge');
          const imgEl = document.getElementById('storyImage');

          if (window.parent && window.parent !== window) {
            window.parent.postMessage({
              type: 'lotus:element-selected',
              key: 'home.success_stories_card',
              attrType: 'success-stories',
              currentVal: (curStory.title || (titleEl ? titleEl.textContent : '')).trim(),
              tagName: 'card',
              sectionId: 'home',
              storyData: {
                currentSlide: currentSlide,
                stories: stories,
                story: {
                  id: curStory.id || ('story-0' + (currentSlide + 1)),
                  title: curStory.title || (titleEl ? titleEl.textContent : ''),
                  badge: curStory.badge || (badgeEl ? badgeEl.textContent : ''),
                  description: curStory.description || (descEl ? descEl.textContent : ''),
                  photo: curStory.photo || (imgEl ? imgEl.getAttribute('src') : ''),
                  sortOrder: curStory.sortOrder || (currentSlide + 1),
                  published: curStory.published !== false
                }
              }
            }, '*');
          }
          return;
        }

        // Dedicated Click Handler for Real Experiences Carousel
        const wreSec = e.target.closest('.real-experiences-sec, .walkers-real-experiences, #experiences');
        if (wreSec) {
          const isText = e.target.closest('.wre-quote-title, .wre-quote-text, .wre-quote-author, .real-exp-quote-title, .real-exp-quote-body, .real-exp-author-name, .real-exp-tour-meta, .real-exp-btn-secondary');
          if (!isText || e.target.classList.contains('real-exp-bg-layer') || e.target.classList.contains('wre-bg-slide') || e.target.classList.contains('real-exp-content-overlay') || e.target.classList.contains('real-exp-nav-btn') || e.target.classList.contains('real-exp-dot') || e.target.classList.contains('real-exp-thumb-btn') || e.target === wreSec) {
            e.preventDefault();
            e.stopPropagation();

            const bgSlides = Array.from(wreSec.querySelectorAll('.real-exp-bg-layer, .wre-bg-slide'));
            let currentSlide = bgSlides.findIndex(s => s.classList.contains('is-active'));
            if (currentSlide < 0) currentSlide = 0;

            const clickedDot = e.target.closest('.wre-dot, .real-exp-dot, .real-exp-thumb-btn');
            if (clickedDot) {
              const dotsOrThumbs = clickedDot.classList.contains('real-exp-thumb-btn')
                ? Array.from(wreSec.querySelectorAll('.real-exp-thumb-btn'))
                : Array.from(wreSec.querySelectorAll('.real-exp-dot, .wre-dot'));
              const dotIdx = dotsOrThumbs.indexOf(clickedDot);
              if (dotIdx >= 0) currentSlide = dotIdx;
            }

            const slideKeys = ['home.real_exp_bg_1', 'home.real_exp_bg_2', 'home.real_exp_bg_3', 'home.real_exp_bg_4'];
            const slideAlts = [
              'Ella Rock Misty Highlands (Panoramic)',
              'Sigiriya Rock Citadel (Panoramic)',
              'Kaudulla Wild Elephants & Safari (Panoramic)',
              'Scenic Ceylon Highlands Train (Panoramic)'
            ];
            const slideDefaults = [
              'assets/images/experiences/real-experiences-ella-rock-large.webp',
              'assets/images/home/hero-sigiriya-aerial-1.webp',
              'assets/images/wildlife/minneriya-elephant-gathering-2.webp',
              'assets/images/family/scenic-train-ride-2.webp'
            ];

            const sliderImages = slideKeys.map((k, i) => {
              const slideEl = bgSlides[i];
              let bg = slideEl ? slideEl.style.backgroundImage : '';
              bg = bg.replace(/^url\(["\']?/, '').replace(/["\']?\)$/, '');
              return {
                index: i,
                key: k,
                src: bg || slideDefaults[i],
                alt: slideAlts[i],
                isActive: i === currentSlide
              };
            });

            const activeKey = slideKeys[currentSlide] || 'home.real_exp_bg_1';
            const curVal = sliderImages[currentSlide] ? sliderImages[currentSlide].src : slideDefaults[0];

            if (activeEl) activeEl.classList.remove('lotus-cms-selected-element');
            if (bgSlides[currentSlide]) {
              activeEl = bgSlides[currentSlide];
              activeEl.classList.add('lotus-cms-selected-element');
            }

            if (window.parent && window.parent !== window) {
              window.parent.postMessage({
                type: 'lotus:element-selected',
                key: activeKey,
                attrType: 'bg-image',
                currentVal: curVal,
                tagName: 'div',
                sectionId: 'experiences',
                label: `Real Experiences (Slide ${currentSlide + 1} of 4)`,
                sliderImages: sliderImages
              }, '*');
            }
            return;
          }
        }

        let target = null;
        if (e.target.tagName === 'IMG' || e.target.hasAttribute('data-cms-img') || e.target.hasAttribute('data-cms-bg')) {
          target = e.target;
        } else {
          const imgWrap = e.target.closest('.hover-box, .about-visual-composition, .about-img-main, .about-img-floating, .bespoke-img-main, .bespoke-img-overlap, .dest-card, .beach-card-img-wrap, .card-image-slider, .story-img-wrap, .faq-visual-wrap, .news-card-big, .news-side-item');
          if (imgWrap) {
            const isCardOrContainer = e.target.matches('.news-card-big, .news-card-big-content, .news-side-item, .news-side-item-content, .hover-box, .dest-card');
            if (isCardOrContainer || !['P', 'H1', 'H2', 'H3', 'H4', 'A', 'BUTTON', 'SPAN'].includes(e.target.tagName)) {
              const activeSlideImg = imgWrap.querySelector('.card-image-slider img.active, img.active');
              const innerImg = activeSlideImg || imgWrap.querySelector('img[data-cms-img], img, [data-cms-bg]');
              if (innerImg) target = innerImg;
            }
          }
        }
        if (!target) {
          const banner = e.target.closest('.sacred-cta-banner, [data-cms-bg], .dest-hero, .about-hero, .contact-hero, .exp-hero, .gallery-hero, .reviews-hero, .blog-hero, .beach-hero-banner, .tours-hero-banner, .banner-section-inner, .banner-section');
          if (banner && (e.target.classList.contains('sacred-cta-banner') || e.target.classList.contains('cta-motif') || banner.hasAttribute('data-cms-bg'))) {
            target = banner.hasAttribute('data-cms-bg') ? banner : banner.querySelector('[data-cms-bg], [data-cms-img]');
          }
        }
        if (!target) {
          target = e.target.closest('[data-cms], [data-cms-html], [data-cms-img], [data-cms-bg], [data-cms-video], [data-cms-link], [data-cms-list]');
        }

        // Universal Selector: Any text node, heading, paragraph, button, link, list item or image
        if (!target) {
          const candidate = e.target.closest('h1, h2, h3, h4, h5, h6, p, span, a, button, li, blockquote, label, th, td, figcaption, b, strong, em, img, video');
          if (candidate && !candidate.closest('#lotus-cms-edit-styles, script, style, noscript')) {
            target = candidate;
          }
        }

        if (target) {
          e.preventDefault();
          e.stopPropagation();

          if (activeEl) activeEl.classList.remove('lotus-cms-selected-element');
          activeEl = target;
          activeEl.classList.add('lotus-cms-selected-element');

          let attrType = target.hasAttribute('data-cms-html') ? 'html' :
                         target.hasAttribute('data-cms-img') ? 'image' :
                         target.hasAttribute('data-cms-bg') ? 'bg-image' :
                         target.hasAttribute('data-cms-video') ? 'video' :
                         target.hasAttribute('data-cms-link') ? 'link' :
                         target.hasAttribute('data-cms-list') ? 'list' :
                         (target.tagName === 'IMG' ? 'image' : 'text');

          let key = target.getAttribute('data-cms') ||
                    target.getAttribute('data-cms-html') ||
                    target.getAttribute('data-cms-img') ||
                    target.getAttribute('data-cms-bg') ||
                    target.getAttribute('data-cms-video') ||
                    target.getAttribute('data-cms-link') ||
                    target.getAttribute('data-cms-list');

          if (!key) {
            const pageSlug = (document.body && document.body.getAttribute('data-cms-page')) || window.location.pathname.split('/').pop().replace('.html', '') || 'page';
            const tag = target.tagName.toLowerCase();
            const textSnippet = (target.textContent || '').trim().slice(0, 15).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
            const section = target.closest('section, header, footer');
            const secName = section ? (section.id || (section.className ? String(section.className).split(' ')[0] : 'sec')) : 'gen';

            if (tag === 'img') {
              const src = target.getAttribute('src') || '';
              const filename = (src.split('/').pop() || 'img').split('.')[0] || 'img';
              key = (pageSlug + '.' + filename).replace(/[^a-zA-Z0-9_.]/g, '_');
              target.setAttribute('data-cms-img', key);
              attrType = 'image';
            } else if (tag === 'a' || tag === 'button') {
              key = (pageSlug + '.' + secName + '_' + tag + '_' + (textSnippet || 'btn')).replace(/[^a-zA-Z0-9_.]/g, '_');
              if (target.getAttribute('href')) {
                target.setAttribute('data-cms-link', key + '_link');
              }
              target.setAttribute('data-cms', key);
              attrType = target.getAttribute('href') ? 'link' : 'text';
            } else {
              key = (pageSlug + '.' + secName + '_' + tag + '_' + (textSnippet || 'text')).replace(/[^a-zA-Z0-9_.]/g, '_');
              target.setAttribute('data-cms', key);
              attrType = 'text';
            }
          }

          let currentVal = '';
          if (attrType === 'image') {
            currentVal = target.getAttribute('src') || '';
          } else if (attrType === 'bg-image') {
            currentVal = target.style.backgroundImage || '';
            currentVal = currentVal.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
          } else if (attrType === 'video') {
            const srcNode = target.querySelector('source') || target;
            currentVal = srcNode.getAttribute('src') || srcNode.src || '';
          } else if (attrType === 'link') {
            currentVal = target.getAttribute('href') || '';
          } else if (attrType === 'html') {
            currentVal = target.innerHTML || '';
          } else {
            currentVal = target.textContent || '';
          }

          const section = target.closest('section, header, footer');
          const sectionId = section ? (section.id || section.className || 'Page Section') : 'General Content';

          // Check if element is inside or part of a tour package card
          const pkgEl = target.closest('[data-package-slug], [data-slug], [data-tour], .package-card, .tour-card, .tour-grid-card, .curated-card, .beach-package-card');
          let packageSlug = pkgEl ? (pkgEl.getAttribute('data-package-slug') || pkgEl.getAttribute('data-slug') || pkgEl.getAttribute('data-tour')) : null;
          if (!packageSlug) {
            const linkEl = target.closest('a[href*="/tours/"]') || (pkgEl ? pkgEl.querySelector('a[href*="/tours/"]') : null);
            if (linkEl && linkEl.getAttribute('href')) {
              const href = linkEl.getAttribute('href');
              const parts = href.split('/').filter(p => p && !p.endsWith('.html') && p !== 'tours');
              if (parts.length > 0) packageSlug = parts[parts.length - 1];
            }
          }

          // Check if element is inside or part of a destination card
          const destEl = target.closest('[data-destination-slug], .dest-card, a[href*="destinations/"]');
          let destinationSlug = destEl ? (destEl.getAttribute('data-destination-slug') || destEl.getAttribute('data-slug')) : null;
          if (!destinationSlug) {
            const dLink = target.closest('a[href*="destinations/"]') || (destEl ? destEl.querySelector('a[href*="destinations/"]') : null);
            if (dLink && dLink.getAttribute('href')) {
              const href = dLink.getAttribute('href');
              const parts = href.split('destinations/')[1].split('/').filter(p => p && !p.endsWith('.html'));
              if (parts.length > 0) destinationSlug = parts[0];
            }
          }

          // Check linked href on anchor or enclosing link
          const enclosingAnchor = target.closest('a') || (target.tagName === 'A' ? target : null) || (pkgEl ? pkgEl.querySelector('a') : null) || (destEl ? destEl.querySelector('a') : null);
          const linkedHref = enclosingAnchor ? enclosingAnchor.getAttribute('href') : null;

          // Double click or Alt/Ctrl click fast navigation
          if (e.altKey || e.ctrlKey || e.metaKey) {
            if (linkedHref && window.parent && window.parent !== window) {
              window.parent.postMessage({ type: 'lotus:navigate-page', href: linkedHref }, '*');
              return;
            }
          }

          // Check if target belongs to a card-image-slider with multiple slides
          let sliderWrap = target.closest('.card-image-slider');
          if (!sliderWrap) {
            const container = target.closest('.hover-box, .package-card, .tour-card, .tour-grid-card, .curated-card, .beach-package-card, .dest-card');
            if (container) {
              sliderWrap = container.querySelector('.card-image-slider');
            }
          }
          let sliderImages = null;
          if (sliderWrap) {
            const imgs = Array.from(sliderWrap.querySelectorAll('.slider-img, img[data-cms-img]'));
            if (imgs.length > 1) {
              sliderImages = imgs.map((img, i) => {
                let imgKey = img.getAttribute('data-cms-img') || img.getAttribute('data-cms');
                if (!imgKey) {
                  const src = img.getAttribute('src') || '';
                  const filename = (src.split('/').pop() || 'img').split('.')[0] || ('img_' + (i + 1));
                  imgKey = 'img_' + filename.replace(/[^a-zA-Z0-9_]/g, '_');
                  img.setAttribute('data-cms-img', imgKey);
                }
                return {
                  index: i,
                  key: imgKey,
                  src: img.getAttribute('src') || '',
                  alt: img.getAttribute('alt') || ('Slide ' + (i + 1)),
                  isActive: img.classList.contains('active') || i === 0
                };
              });
            }
          }

          // Design credit protection check
          const isCreditLocked = !!(target.closest('#designCredit, .infinite-design-credit, a[href*="infiniteweb.dev"]') || (target.textContent && target.textContent.includes('Infinite Design')));

          // Linked content check (single source of truth enforcement)
          let isLinked = false;
          let linkedSource = '';
          let targetTab = '';
          let targetSubtab = '';
          let modalOpenFn = '';

          const path = (window.location.pathname || '').toLowerCase();
          const isHomePage = path.endsWith('index.html') || path.endsWith('/') || path === '' || !path.includes('.html');

          if (pkgEl || target.closest('#featuredTours, .package-card, .tour-card, .tour-grid-card, .curated-card, .beach-package-card')) {
            if (isHomePage || target.closest('#featuredTours')) {
              isLinked = true;
              linkedSource = 'Tours > Packages';
              targetTab = 'tours';
              targetSubtab = 'packages';
              if (packageSlug) modalOpenFn = "AdminApp.openPackageModal('" + packageSlug + "');";
            }
          } else if (target.closest('#categoryShowcase, .cat-showcase-card, [data-category-slug]')) {
            if (isHomePage || target.closest('#categoryShowcase')) {
              isLinked = true;
              linkedSource = 'Tours > Categories';
              targetTab = 'tours';
              targetSubtab = 'categories';
            }
          } else if (destEl || target.closest('#destinations, #destinationsGrid, .dest-card')) {
            if (isHomePage || target.closest('#destinations')) {
              isLinked = true;
              linkedSource = 'Destinations > Destinations list';
              targetTab = 'destinations';
              targetSubtab = 'destinations-list';
              if (destinationSlug) modalOpenFn = "AdminApp.openDestinationModal('" + destinationSlug + "');";
            }
          } else if (target.closest('#experiences, .experience-card, .exp-grid-item, .exp-card')) {
            if (target.closest('.experience-card, .exp-grid-item, .exp-card')) {
              isLinked = true;
              linkedSource = 'Experiences > Experiences list';
              targetTab = 'experiences';
              targetSubtab = 'experiences-list';
            }
          } else if (target.closest('#reviews, .testimonial-card, .review-card, .reviews-slider')) {
            if (isHomePage || target.closest('#reviews')) {
              if (target.closest('.testimonial-card, .review-card, .swiper-slide')) {
                isLinked = true;
                linkedSource = 'Reviews > Reviews list';
                targetTab = 'reviews';
                targetSubtab = 'reviews-list';
              }
            }
          } else if (target.closest('#gallery, .gallery-grid, .gallery-item')) {
            if (isHomePage || target.closest('#gallery')) {
              if (target.closest('.gallery-item, .gallery-thumb, [data-gallery-idx]')) {
                isLinked = true;
                linkedSource = 'Gallery > Gallery Images';
                targetTab = 'gallery';
                targetSubtab = 'gallery-images';
              }
            }
          } else if (target.closest('#newsInsights, .news-card, .news-card-big, .news-card-side, .footer-recent-posts')) {
            if (isHomePage || target.closest('#newsInsights, .footer-recent-posts')) {
              isLinked = true;
              linkedSource = 'Blog > Blog Posts';
              targetTab = 'blog';
              targetSubtab = 'blog-posts';
            }
          } else if (target.closest('#teamGrid, .team-card, .team-member-card')) {
            isLinked = true;
            linkedSource = 'About Us > Team Members';
            targetTab = 'about';
            targetSubtab = 'team';
          }

          // Notify parent frame
          const isWatermark = target.classList.contains('watermark-heading') || (target.className && String(target.className).includes('watermark'));
          if (window.parent && window.parent !== window) {
            const isHidden = target.getAttribute('data-cms-hidden') === 'true' || target.style.display === 'none';
            const altText = target.tagName === 'IMG' ? (target.getAttribute('alt') || '') : '';
            const styleObj = window.getComputedStyle ? {
              fontSize: window.getComputedStyle(target).fontSize,
              fontWeight: window.getComputedStyle(target).fontWeight,
              textAlign: window.getComputedStyle(target).textAlign,
              color: window.getComputedStyle(target).color
            } : {};

            window.parent.postMessage({
              type: 'lotus:element-selected',
              key: key,
              attrType: attrType,
              currentVal: (currentVal || '').trim(),
              tagName: target.tagName.toLowerCase(),
              sectionId: sectionId,
              packageSlug: packageSlug || null,
              destinationSlug: destinationSlug || null,
              linkedHref: linkedHref || null,
              isWatermark: isWatermark,
              sliderImages: sliderImages,
              isHidden: isHidden,
              altText: altText,
              computedStyles: styleObj,
              isCreditLocked: isCreditLocked,
              isLinked: isLinked,
              linkedSource: linkedSource,
              targetTab: targetTab,
              targetSubtab: targetSubtab,
              modalOpenFn: modalOpenFn
            }, '*');
          }
        }
      }, true);

      // 3. Parent-to-Iframe Message Listener
      window.addEventListener('message', (event) => {
        if (!event.data || typeof event.data !== 'object') return;

        // Instant Field Update
        if (event.data.type === 'lotus:update-field') {
          const { key, val, attrType, lang } = event.data;
          this.applyLiveUpdate(key, val, attrType, lang);
        }

        // Language Switcher
        if (event.data.type === 'lotus:switch-language') {
          const { lang } = event.data;
          this.currentLang = lang;
          document.documentElement.lang = lang;
          if (lang === 'ar') document.documentElement.dir = 'rtl';
          else document.documentElement.dir = 'ltr';
          this.bindElements();
        }

        // Activate specific slide in Real Experiences Carousel
        if (event.data.type === 'lotus:set-wre-slide' || event.data.type === 'lotus:set-real-exp-slide') {
          const idx = typeof event.data.index === 'number' ? event.data.index : 0;
          if (window.LotusRealExp && typeof window.LotusRealExp.goTo === 'function') {
            window.LotusRealExp.goTo(idx);
          } else {
            const wreSec = document.querySelector('.real-experiences-sec, .walkers-real-experiences, #experiences');
            if (wreSec) {
              const bgSlides = wreSec.querySelectorAll('.real-exp-bg-layer, .wre-bg-slide');
              const quoteSlides = wreSec.querySelectorAll('.real-exp-slide, .wre-quote-slide');
              const dots = wreSec.querySelectorAll('.real-exp-dot, .wre-dot');
              const thumbs = wreSec.querySelectorAll('.real-exp-thumb-btn');
              bgSlides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
              quoteSlides.forEach((q, i) => q.classList.toggle('is-active', i === idx));
              dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
              thumbs.forEach((t, i) => t.classList.toggle('is-active', i === idx));
            }
          }
        }

        // Activate specific story slide in Our Success Stories
        if (event.data.type === 'lotus:set-story-slide') {
          if (window.LotusSuccessStories && typeof window.LotusSuccessStories.goTo === 'function') {
            window.LotusSuccessStories.goTo(event.data.index);
          }
        }

        // Live update for success story field
        if (event.data.type === 'lotus:update-story-live') {
          const { field, val } = event.data;
          if (field === 'title') {
            const el = document.getElementById('storyTitle');
            if (el) el.textContent = val;
          } else if (field === 'badge') {
            const el = document.getElementById('storyBadge');
            if (el) el.textContent = val;
          } else if (field === 'description') {
            const el = document.getElementById('storyDesc');
            if (el) el.textContent = val;
          } else if (field === 'photo') {
            const el = document.getElementById('storyImage');
            if (el) el.src = resolveImgUrl(val);
          }
        }

        // Activate specific slide in card-image-slider
        if (event.data.type === 'lotus:activate-slide') {
          const { key, index } = event.data;
          const cleanKey = key && key.includes('.') ? key.split('.').pop() : key;
          const targetImg = document.querySelector(`[data-cms-img="${key}"], [data-cms-img="${cleanKey}"]`);
          if (targetImg) {
            const parentSlider = targetImg.closest('.card-image-slider');
            if (parentSlider) {
              const allImgs = parentSlider.querySelectorAll('.slider-img, img');
              const allDots = parentSlider.querySelectorAll('.slider-dot');
              allImgs.forEach(img => img.classList.remove('active'));
              allDots.forEach(dot => dot.classList.remove('active'));
              targetImg.classList.add('active');
              const idx = Array.from(allImgs).indexOf(targetImg);
              if (idx >= 0 && allDots[idx]) allDots[idx].classList.add('active');
            }
            if (activeEl) activeEl.classList.remove('lotus-cms-selected-element');
            activeEl = targetImg;
            activeEl.classList.add('lotus-cms-selected-element');
          }
        }

        // Scroll to Element
        if (event.data.type === 'lotus:scroll-to-key') {
          const { key } = event.data;
          const cleanKey = key.includes('.') ? key.split('.').pop() : key;
          const el = document.querySelector(`[data-cms="${key}"], [data-cms="${cleanKey}"], [data-cms-html="${key}"], [data-cms-html="${cleanKey}"], [data-cms-img="${key}"], [data-cms-img="${cleanKey}"], [data-cms-bg="${key}"], [data-cms-video="${key}"], [data-cms-link="${key}"]`);
          if (el) {
            if (activeEl) activeEl.classList.remove('lotus-cms-selected-element');
            activeEl = el;
            activeEl.classList.add('lotus-cms-selected-element');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }

        // Toggle Element Visibility
        if (event.data.type === 'lotus:toggle-visibility') {
          const { key, hidden } = event.data;
          const cleanKey = key && key.includes('.') ? key.split('.').pop() : key;
          const el = (key ? document.querySelector(`[data-cms="${key}"], [data-cms="${cleanKey}"], [data-cms-img="${key}"], [data-cms-img="${cleanKey}"], [data-cms-bg="${key}"], [data-cms-link="${key}"]`) : null) || activeEl;
          if (el) {
            if (hidden) {
              el.setAttribute('data-cms-hidden', 'true');
              el.style.opacity = '0.35';
              el.style.filter = 'grayscale(80%)';
              el.style.outline = '2px dashed #EF4444';
            } else {
              el.removeAttribute('data-cms-hidden');
              el.style.opacity = '1';
              el.style.filter = 'none';
              el.style.outline = '';
            }
          }
        }

        // Delete Element (Hide from DOM with visual indicator)
        if (event.data.type === 'lotus:delete-element') {
          const { key } = event.data;
          const cleanKey = key && key.includes('.') ? key.split('.').pop() : key;
          const el = (key ? document.querySelector(`[data-cms="${key}"], [data-cms="${cleanKey}"], [data-cms-img="${key}"], [data-cms-img="${cleanKey}"], [data-cms-bg="${key}"], [data-cms-link="${key}"]`) : null) || activeEl;
          if (el) {
            el.setAttribute('data-cms-hidden', 'true');
            el.style.display = 'none';
            if (activeEl === el) {
              activeEl.classList.remove('lotus-cms-selected-element');
              activeEl = null;
            }
          }
        }

        // Add Element Below Active Element
        if (event.data.type === 'lotus:add-element') {
          const { tag, defaultContent, key } = event.data;
          const parentOrRef = activeEl || document.querySelector('main') || document.body;
          const newEl = document.createElement(tag || 'p');
          const autoKey = key || ('new_' + tag + '_' + Date.now().toString(36));
          
          if (tag === 'img') {
            newEl.setAttribute('data-cms-img', autoKey);
            newEl.src = defaultContent || 'assets/images/sigiriya.jpg';
            newEl.alt = 'Lotus Ceylon Tours';
            newEl.style.maxWidth = '100%';
            newEl.style.borderRadius = '8px';
            newEl.style.display = 'block';
            newEl.style.margin = '16px 0';
          } else if (tag === 'a') {
            newEl.setAttribute('data-cms-link', autoKey + '_link');
            newEl.setAttribute('data-cms', autoKey);
            newEl.href = '#';
            newEl.className = 'btn btn-gold';
            newEl.textContent = defaultContent || 'Discover More';
            newEl.style.display = 'inline-block';
            newEl.style.margin = '10px 0';
          } else {
            newEl.setAttribute('data-cms', autoKey);
            newEl.textContent = defaultContent || (tag.startsWith('h') ? 'New Heading Title' : 'New paragraph content text here...');
            if (tag.startsWith('h')) {
              newEl.style.color = '#002B49';
              newEl.style.margin = '16px 0 8px 0';
            } else {
              newEl.style.lineHeight = '1.7';
              newEl.style.margin = '8px 0';
            }
          }

          if (parentOrRef && parentOrRef.parentNode && parentOrRef !== document.body) {
            parentOrRef.parentNode.insertBefore(newEl, parentOrRef.nextSibling);
          } else {
            (document.querySelector('main') || document.body).appendChild(newEl);
          }

          if (activeEl) activeEl.classList.remove('lotus-cms-selected-element');
          activeEl = newEl;
          activeEl.classList.add('lotus-cms-selected-element');
          newEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

          if (window.parent && window.parent !== window) {
            window.parent.postMessage({
              type: 'lotus:element-selected',
              key: autoKey,
              attrType: tag === 'img' ? 'image' : (tag === 'a' ? 'link' : 'text'),
              currentVal: tag === 'img' ? newEl.src : newEl.textContent,
              tagName: tag,
              sectionId: 'Custom Added Content',
              isNewlyAdded: true
            }, '*');
          }
        }

        // Convert Tag (e.g. H2 -> P, P -> H3)
        if (event.data.type === 'lotus:convert-tag') {
          const { newTag } = event.data;
          if (activeEl && newTag && activeEl.tagName.toLowerCase() !== newTag.toLowerCase()) {
            const replacement = document.createElement(newTag);
            Array.from(activeEl.attributes).forEach(attr => {
              replacement.setAttribute(attr.name, attr.value);
            });
            replacement.innerHTML = activeEl.innerHTML;
            activeEl.parentNode.replaceChild(replacement, activeEl);
            activeEl = replacement;
            activeEl.classList.add('lotus-cms-selected-element');
          }
        }

        // Update Inline Style (fontSize, textAlign, fontWeight, color)
        if (event.data.type === 'lotus:update-style') {
          const { prop, value } = event.data;
          if (activeEl && prop) {
            activeEl.style[prop] = value;
          }
        }
      });
    },

    applyLiveUpdate(key, val, attrType, lang) {
      const cleanKey = key.includes('.') ? key.split('.').pop() : key;
      const elements = document.querySelectorAll(
        `[data-cms="${key}"], [data-cms="${cleanKey}"],
         [data-cms-html="${key}"], [data-cms-html="${cleanKey}"],
         [data-cms-img="${key}"], [data-cms-img="${cleanKey}"],
         [data-cms-bg="${key}"], [data-cms-bg="${cleanKey}"],
         [data-cms-video="${key}"], [data-cms-video="${cleanKey}"],
         [data-cms-link="${key}"], [data-cms-link="${cleanKey}"]`
      );

      if (attrType === 'alt') {
        const cleanKey = key.replace(/_alt$/, '');
        const img = document.querySelector(`[data-cms-img="${cleanKey}"], img[data-cms="${cleanKey}"]`);
        if (img && img.tagName === 'IMG') img.setAttribute('alt', val || '');
      }

      elements.forEach(el => {
        if (el.hasAttribute('data-cms-img') || el.tagName === 'IMG') {
          const resolved = val ? resolveImgUrl(val) : resolveImgUrl('assets/images/placeholder.png');
          el.setAttribute('src', resolved);
        } else if (el.hasAttribute('data-cms-bg')) {
          if (!val) {
            el.style.backgroundImage = 'none';
          } else {
            const resolvedBg = resolveImgUrl(val);
            if (el.classList.contains('sacred-cta-banner')) {
              el.style.backgroundImage = `linear-gradient(135deg, rgba(13, 43, 29, 0.82) 0%, rgba(22, 54, 29, 0.90) 100%), url("${resolvedBg}")`;
            } else if (el.classList.contains('dest-hero') || el.classList.contains('about-hero') || el.classList.contains('contact-hero') || el.classList.contains('exp-hero') || el.classList.contains('gallery-hero') || el.classList.contains('reviews-hero') || el.classList.contains('blog-hero') || el.classList.contains('beach-hero-banner') || el.classList.contains('tours-hero-banner') || el.classList.contains('banner-section-inner')) {
              el.style.backgroundImage = `linear-gradient(180deg, rgba(0, 43, 73, 0.65) 0%, rgba(0, 43, 73, 0.88) 100%), url("${resolvedBg}")`;
            } else {
              el.style.backgroundImage = `url("${resolvedBg}")`;
            }
          }
        } else if (el.hasAttribute('data-cms-video')) {
          const src = el.querySelector('source') || el;
          src.setAttribute('src', val || '');
          if (el.tagName === 'VIDEO') {
            el.src = val || '';
            el.load();
          }
        } else if (el.hasAttribute('data-cms-link')) {
          el.setAttribute('href', val || '#');
        } else if (el.hasAttribute('data-cms-html')) {
          el.innerHTML = sanitizeHtml(val || '');
        } else if (el.hasAttribute('data-cms')) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.setAttribute('placeholder', val || '');
          } else {
            el.textContent = val || '';
          }
        }
      });
    },

        

    init() {
      if (this.initialized) return;
      this.initialized = true;

      this.purgeLegacyCaches();
      this.detectLanguage();
      this.setupLanguageListeners();
      this.setupVisualEditMode();
      

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.loadContent());
      } else {
        this.loadContent();
      }
    }
  };

  window.LotusCMS = CMS;
  CMS.init();

})(window, document);
