/**
 * Lotus Ceylon Universal CMS Engine (Phase 1)
 * 
 * High-performance, zero-dependency, non-blocking client that reads live content
 * from Firestore REST API, binds data-cms attributes, manages 10-language translations,
 * and maintains resilient local caching.
 */

(function (window, document) {
  'use strict';

  const CACHE_KEY = 'lotus_cms_v3';
  const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
  const LEGACY_CACHE_KEYS = ['lotus_seed_catalog_cache_v2', 'lotus_seed_catalog_cache'];

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
        }
      }
      if (path.endsWith('about.html') || path.includes('/about.')) return 'siteContent/about';
      if (path.endsWith('contact.html') || path.includes('/contact.')) return 'siteContent/contact';
      if (path.endsWith('destinations.html') || path.includes('/destinations.')) return 'siteContent/destinations';
      if (path.endsWith('experiences.html') || path.includes('/experiences.')) return 'siteContent/experiences';
      if (path.endsWith('gallery.html') || path.includes('/gallery.')) return 'siteContent/gallery';
      if (path.endsWith('reviews.html') || path.includes('/reviews.')) return 'siteContent/reviews';
      if (path.endsWith('blog.html') || path.includes('/blog.')) return 'siteContent/blog';
      if (path.endsWith('sri-lanka-tours.html')) return 'siteContent/toursCatalog';

      return 'siteContent/home';
    },

    getValueByPath(pathStr) {
      if (!pathStr) return null;
      const parts = pathStr.split('.');

      // Try from siteGlobal first if path starts with siteGlobal
      if (parts[0] === 'siteGlobal') {
        let curr = this.data.siteGlobal;
        for (let i = 1; i < parts.length; i++) {
          if (curr === null || curr === undefined) return null;
          curr = curr[parts[i]];
        }
        return curr;
      }

      // Try from current page document
      if (this.data.page) {
        let curr = this.data.page;
        for (let i = 0; i < parts.length; i++) {
          if (curr === null || curr === undefined) {
            curr = null;
            break;
          }
          curr = curr[parts[i]];
        }
        if (curr !== null && curr !== undefined) return curr;
      }

      // Try root fallback
      let curr = this.data;
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
        if (raw) {
          const resolved = resolveImgUrl(raw);
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
            el.style.backgroundImage = `url("${resolved}")`;
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
                if (el.parentElement && el.parentElement.tagName === 'VIDEO' && window.innerWidth >= 993) {
                  el.parentElement.load();
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
      const url = getFirestoreRestBase() + '/siteMeta/version';
      const res = await fetch(url);
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

      const res = await fetch(getFirestoreRestBase() + ':batchGet', {
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

      if (isPreview) {
        console.info('[CMS Preview Mode] Active. Cache bypassed.');
        this.setupPreviewListener();
      }

      // Check cache if not in preview
      if (!isPreview) {
        const cached = this.readCache();
        const forceRefresh = urlParams.has('cms_refresh') || urlParams.has('refresh');
        const SESSION_VER_CHECK_KEY = 'lotus_cms_last_ver_check';
        const VER_CHECK_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

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
        }
        body.cms-edit-active a {
          cursor: pointer !important;
        }
      `;
      document.head.appendChild(style);
      document.body.classList.add('cms-edit-active');

      // 2. Click-to-edit interceptor
      let activeEl = null;

      document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-cms], [data-cms-html], [data-cms-img], [data-cms-bg], [data-cms-video], [data-cms-link], [data-cms-list]');
        if (target) {
          e.preventDefault();
          e.stopPropagation();

          if (activeEl) activeEl.classList.remove('lotus-cms-selected-element');
          activeEl = target;
          activeEl.classList.add('lotus-cms-selected-element');

          const attrType = target.hasAttribute('data-cms-html') ? 'html' :
                           target.hasAttribute('data-cms-img') ? 'image' :
                           target.hasAttribute('data-cms-bg') ? 'bg-image' :
                           target.hasAttribute('data-cms-video') ? 'video' :
                           target.hasAttribute('data-cms-link') ? 'link' :
                           target.hasAttribute('data-cms-list') ? 'list' : 'text';

          const key = target.getAttribute('data-cms') ||
                      target.getAttribute('data-cms-html') ||
                      target.getAttribute('data-cms-img') ||
                      target.getAttribute('data-cms-bg') ||
                      target.getAttribute('data-cms-video') ||
                      target.getAttribute('data-cms-link') ||
                      target.getAttribute('data-cms-list');

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

          // Notify parent frame
          if (window.parent && window.parent !== window) {
            window.parent.postMessage({
              type: 'lotus:element-selected',
              key: key,
              attrType: attrType,
              currentVal: (currentVal || '').trim(),
              tagName: target.tagName.toLowerCase(),
              sectionId: sectionId
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

        // Scroll to Element
        if (event.data.type === 'lotus:scroll-to-key') {
          const { key } = event.data;
          const el = document.querySelector(`[data-cms="${key}"], [data-cms-html="${key}"], [data-cms-img="${key}"], [data-cms-bg="${key}"], [data-cms-video="${key}"], [data-cms-link="${key}"]`);
          if (el) {
            if (activeEl) activeEl.classList.remove('lotus-cms-selected-element');
            activeEl = el;
            activeEl.classList.add('lotus-cms-selected-element');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    },

    applyLiveUpdate(key, val, attrType, lang) {
      const elements = document.querySelectorAll(
        `[data-cms="${key}"], [data-cms-html="${key}"], [data-cms-img="${key}"], [data-cms-bg="${key}"], [data-cms-video="${key}"], [data-cms-link="${key}"]`
      );

      elements.forEach(el => {
        if (el.hasAttribute('data-cms-img')) {
          el.setAttribute('src', val);
        } else if (el.hasAttribute('data-cms-bg')) {
          el.style.backgroundImage = `url("${val}")`;
        } else if (el.hasAttribute('data-cms-video')) {
          const src = el.querySelector('source') || el;
          src.setAttribute('src', val);
          if (el.tagName === 'VIDEO') {
            el.src = val;
            el.load();
          }
        } else if (el.hasAttribute('data-cms-link')) {
          el.setAttribute('href', val);
        } else if (el.hasAttribute('data-cms-html')) {
          el.innerHTML = sanitizeHtml(val);
        } else if (el.hasAttribute('data-cms')) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.setAttribute('placeholder', val);
          } else {
            el.textContent = val;
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
