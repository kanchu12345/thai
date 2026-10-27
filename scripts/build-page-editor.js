const fs = require('fs');

const code = `/**
 * admin/js/page-editor.js
 * Phase 3: Universal Page-by-Page CMS Editor Engine for Lotus Ceylon Admin Panel
 * 
 * Features:
 * - Reads cms-registry.json to discover all 52 pages, sections, and fields
 * - Accordion section grouping with live search filter
 * - 10-language tab manager with "Copy from EN" and translation helpers
 * - Controls: Text, Rich Text, Image picker with preview, Video picker, Links, Repeaters
 * - Global components editor (branding, header, footer, contact, menu, social)
 * - Form definitions editor (Quick & Detailed inquiry schemas)
 * - Blog Posts collection manager
 * - Draft / Publish workflow: updates Firestore & increments siteMeta/version
 * - Side-by-side or modal live preview (?preview=1)
 * - "Reset to default" per field, per section, and entire page
 */

(function (window, document) {
  'use strict';

  const LANGUAGES = [
    { code: 'en', label: '🇬🇧 EN' },
    { code: 'zh-TW', label: '🇹🇼 繁中' },
    { code: 'zh-CN', label: '🇨🇳 简中' },
    { code: 'fr', label: '🇫🇷 FR' },
    { code: 'de', label: '🇩🇪 DE' },
    { code: 'ru', label: '🇷🇺 RU' },
    { code: 'es', label: '🇪🇸 ES' },
    { code: 'it', label: '🇮🇹 IT' },
    { code: 'ja', label: '🇯🇵 JA' },
    { code: 'ar', label: '🇦🇪 AR (RTL)' },
    { code: 'hi', label: '🇮🇳 HI' }
  ];

  const CORE_PAGES_LIST = [
    { id: 'siteContent/home', name: 'Home Page', file: 'index.html', icon: '🏠' },
    { id: 'siteContent/about', name: 'About Us', file: 'about.html', icon: '🏛️' },
    { id: 'siteContent/contact', name: 'Contact', file: 'contact.html', icon: '📞' },
    { id: 'siteContent/destinations', name: 'Destinations Index', file: 'destinations.html', icon: '📍' },
    { id: 'siteContent/experiences', name: 'Experiences', file: 'experiences.html', icon: '✨' },
    { id: 'siteContent/gallery', name: 'Gallery', file: 'gallery.html', icon: '🖼️' },
    { id: 'siteContent/reviews', name: 'Reviews / Reflections', file: 'reviews.html', icon: '✍️' },
    { id: 'siteContent/blog', name: 'Blog & Editorial', file: 'blog.html', icon: '📰' },
    { id: 'siteContent/inquiry-detailed', name: 'Bespoke Inquiry (Detailed)', file: 'inquiry-detailed.html', icon: '📋' },
    { id: 'siteContent/inquiry-quick', name: 'Quick Consultation', file: 'inquiry-quick.html', icon: '⚡' },
    { id: 'siteContent/toursIndex', name: 'All Tours Index', file: 'tours/index.html', icon: '🗺️' },
    { id: 'siteContent/privacy-policy', name: 'Privacy Policy', file: 'privacy-policy.html', icon: '🔒' },
    { id: 'siteContent/terms-conditions', name: 'Terms & Conditions', file: 'terms-conditions.html', icon: '📜' },
    { id: 'siteContent/cancellation-policy', name: 'Booking & Cancellation', file: 'cancellation-policy.html', icon: '⚖️' },
    { id: 'siteContent/cookie-policy', name: 'Cookie Policy', file: 'cookie-policy.html', icon: '🍪' }
  ];

  const GLOBAL_DOCS_LIST = [
    { id: 'siteGlobal/branding', name: 'Branding & Identity', icon: '🌸' },
    { id: 'siteGlobal/header', name: 'Header & Taglines', icon: '🔝' },
    { id: 'siteGlobal/footer', name: 'Footer & Copyright', icon: '🔻' },
    { id: 'siteGlobal/contact', name: 'Concierge & Direct Contact', icon: '💬' },
    { id: 'siteGlobal/menu', name: 'Navigation Menu Links', icon: '🧭' },
    { id: 'siteGlobal/social', name: 'Social Media Channels', icon: '🌐' }
  ];

  const LEGACY_IMAGE_MAP = {
    'assets/tours/beach/southern-sands-1.jpg': 'assets/images/beach-galle.jpg',
    'assets/tours/wildlife/wild-ceylon-1.jpg': 'assets/images/beach-galle.jpg',
    'assets/tours/cultural/heritage-1.jpg': 'assets/images/sigiriya.jpg',
    'assets/tours/wellness/ayurveda-1.jpg': 'assets/images/temple-culture.jpg',
    'assets/tours/honeymoon/romance-1.jpg': 'assets/images/couple-travel.jpg',
    'assets/tours/luxury/private-island-1.jpg': 'assets/images/sunset-mirissa.jpg',
    'assets/tours/scenic/hill-country-1.jpg': 'assets/images/tea-country.jpg'
  };

  const PageEditor = {
    registry: null,
    activePageKey: null,
    activeDocData: {},
    activePageFile: null,
    activeLangTab: 'en',
    currentFieldValues: {},
    activeFormType: 'inquiry_detailed',
    blogPosts: [],

    async init() {
      try {
        const res = await fetch('../cms-registry.json');
        if (res.ok) {
          this.registry = await res.json();
          console.info('[PageEditor] Registry loaded with', this.registry.totalUniqueBindings, 'bindings.');
        }
      } catch (e) {
        console.warn('[PageEditor] Failed to load ../cms-registry.json:', e);
      }
      this.bindEvents();
    },

    bindEvents() {
      const searchInput = document.getElementById('pageEditorSearch');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this.filterFields(e.target.value);
        });
      }
    },

    // =========================================================================
    // 1. PAGE SELECTION & ACCORDION RENDERING
    // =========================================================================

    async openPage(pageKey, fileName) {
      this.activePageKey = pageKey;
      this.activePageFile = fileName;
      this.currentFieldValues = {};

      if (window.AdminApp) {
        window.AdminApp.switchSection('page-editor');
      }

      // Update sidebar active highlights
      document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
        const matches = link.getAttribute('data-page-doc') === pageKey;
        link.classList.toggle('active', matches);
      });

      const titleEl = document.getElementById('pageEditorTitle');
      const fileEl = document.getElementById('pageEditorFile');
      if (titleEl) {
        const pageInfo = CORE_PAGES_LIST.find(p => p.id === pageKey) || 
                         GLOBAL_DOCS_LIST.find(g => g.id === pageKey) || 
                         { name: pageKey, icon: '📄' };
        titleEl.textContent = \`\${pageInfo.icon} \${pageInfo.name}\`;
      }
      if (fileEl) {
        fileEl.textContent = \`Source Shell: /\${fileName || ''} • Firestore: \${pageKey}\`;
      }

      const container = document.getElementById('pageEditorFieldsContainer');
      if (container) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--ink-muted);"><div class="spinner"></div> Loading page fields & live values...</div>';
      }

      this.activeDocData = await this.fetchPageDoc(pageKey);
      this.renderSections();
    },

    async fetchPageDoc(docPath) {
      if (!window.AdminApp || !window.AdminApp.fbDb) return {};
      try {
        const parts = docPath.split('/');
        const col = parts[0];
        const docId = parts.slice(1).join('/');
        const fetchPromise = window.AdminApp.fbDb.collection(col).doc(docId).get();
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1500));
        const snap = await Promise.race([fetchPromise, timeoutPromise]);
        if (snap && snap.exists) {
          return snap.data() || {};
        }
      } catch (e) {
        console.warn('[PageEditor] fetchPageDoc fallback to defaults:', e.message || e);
      }
      return {};
    },

    getPageFields() {
      if (!this.registry) return [];
      if (this.activePageFile && this.registry.byPage && this.registry.byPage[this.activePageFile]) {
        return this.registry.byPage[this.activePageFile];
      }
      if (this.registry.entries) {
        return this.registry.entries.filter(e => e.page === this.activePageKey);
      }
      return [];
    },

    groupFieldsBySection(fields) {
      const groups = {};
      fields.forEach(f => {
        const parts = f.fieldKey.split('.');
        let section = 'General Content';
        if (parts.length > 1) {
          const prefix = parts[0];
          if (prefix.startsWith('cat_')) section = 'Category Overview';
          else if (prefix.startsWith('pkg_')) section = 'Package Content';
          else if (prefix === 'home') section = 'Home Sections';
          else if (prefix === 'about') section = 'About Story & Vision';
          else if (prefix === 'contact') section = 'Contact Concierge';
          else if (prefix === 'destinations') section = 'Destinations Guide';
          else if (prefix === 'experiences') section = 'Experiences Guide';
          else if (prefix === 'gallery') section = 'Gallery Showcase';
          else if (prefix === 'reviews') section = 'Guest Reflections';
          else if (prefix === 'blog') section = 'Editorial Content';
          else if (prefix.startsWith('sec_')) section = prefix.replace(/_/g, ' ').toUpperCase();
          else section = prefix.charAt(0).toUpperCase() + prefix.slice(1);
        } else {
          if (f.fieldKey === 'title' || f.fieldKey === 'overview' || f.fieldKey === 'duration' || f.fieldKey === 'price') {
            section = 'Header & Overview';
          }
        }

        if (!groups[section]) groups[section] = [];
        groups[section].push(f);
      });
      return groups;
    },

    renderSections() {
      const container = document.getElementById('pageEditorFieldsContainer');
      if (!container) return;

      const fields = this.getPageFields();
      if (fields.length === 0) {
        container.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--ink-muted);">No editable fields registered for this page.</div>';
        return;
      }

      const groups = this.groupFieldsBySection(fields);
      let html = '';

      let secIndex = 0;
      for (const sectionName in groups) {
        secIndex++;
        const sectionFields = groups[sectionName];
        const isFirst = secIndex === 1;

        html += \`
          <div class="cms-accordion-card \${isFirst ? 'is-open' : ''}" data-accordion-section="\${this.escapeAttr(sectionName)}">
            <div class="cms-accordion-header" onclick="PageEditor.toggleAccordion(this)">
              <div class="cms-accordion-title">
                <span class="cms-accordion-chevron">\${isFirst ? '▼' : '▶'}</span>
                <strong>\${this.escapeHtml(sectionName)}</strong>
                <span class="badge badge-secondary" style="margin-left: 8px;">\${sectionFields.length} fields</span>
              </div>
              <div class="cms-accordion-actions" onclick="event.stopPropagation()">
                <button type="button" class="btn btn-sm btn-outline" onclick="PageEditor.resetSectionDefaults('\${this.escapeAttr(sectionName)}')">Reset Section</button>
              </div>
            </div>
            <div class="cms-accordion-body" style="\${isFirst ? 'display: block;' : 'display: none;'}">
              <div class="cms-fields-grid">
        \`;

        sectionFields.forEach(f => {
          html += this.renderFieldControl(f);
        });

        html += \`
              </div>
            </div>
          </div>
        \`;
      }

      container.innerHTML = html;
      this.updateFieldCounts(fields.length);
    },

    toggleAccordion(headerEl) {
      const card = headerEl.closest('.cms-accordion-card');
      const body = card.querySelector('.cms-accordion-body');
      const chevron = card.querySelector('.cms-accordion-chevron');
      const isOpen = card.classList.contains('is-open');

      if (isOpen) {
        card.classList.remove('is-open');
        body.style.display = 'none';
        chevron.textContent = '▶';
      } else {
        card.classList.add('is-open');
        body.style.display = 'block';
        chevron.textContent = '▼';
      }
    },

    // =========================================================================
    // 2. FIELD CONTROL GENERATION (TEXT, HTML, IMAGE, VIDEO, LINK)
    // =========================================================================

    getCurrentValue(fieldKey, defaultValue) {
      if (this.currentFieldValues[fieldKey] !== undefined) {
        return this.currentFieldValues[fieldKey];
      }
      if (this.activeDocData) {
        if (this.activeDocData[fieldKey] !== undefined) return this.activeDocData[fieldKey];
        if (this.activeDocData.fields && this.activeDocData.fields[fieldKey] !== undefined) {
          return this.activeDocData.fields[fieldKey];
        }
        const clean = fieldKey.replace(/^[^.]+\\./, '');
        if (this.activeDocData[clean] !== undefined) return this.activeDocData[clean];
        if (this.activeDocData.fields && this.activeDocData.fields[clean] !== undefined) {
          return this.activeDocData.fields[clean];
        }
      }
      return defaultValue;
    },

    resolveValueForLang(val, lang = 'en') {
      if (val === null || val === undefined) return '';
      if (typeof val === 'string' || typeof val === 'number') return String(val);
      if (typeof val === 'object') {
        if (val[lang] !== undefined) return val[lang];
        if (val.en !== undefined) return val.en;
        const first = Object.values(val)[0];
        return first !== undefined ? String(first) : '';
      }
      return String(val);
    },

    renderFieldControl(f) {
      const rawVal = this.getCurrentValue(f.fieldKey, f.defaultValue);
      const enVal = this.resolveValueForLang(rawVal, 'en');
      const safeKey = this.escapeAttr(f.fieldKey);
      const label = this.escapeHtml(f.label);

      let controlHtml = '';

      if (f.type === 'text') {
        controlHtml = \`
          <div class="cms-field-wrap" data-field-key="\${safeKey}">
            <div class="cms-field-header">
              <label class="cms-field-label">
                <span>\${label}</span>
                <small class="cms-field-meta">\${safeKey}</small>
              </label>
              <div class="cms-field-tools">
                <button type="button" class="btn-text-sm" onclick="PageEditor.resetSingleDefault('\${safeKey}', '\${this.escapeAttr(f.defaultValue)}')">↺ Default</button>
              </div>
            </div>
            \${this.renderLanguageTabs(safeKey, f.type, rawVal)}
          </div>
        \`;
      } else if (f.type === 'html') {
        controlHtml = \`
          <div class="cms-field-wrap cms-field-wide" data-field-key="\${safeKey}">
            <div class="cms-field-header">
              <label class="cms-field-label">
                <span>\${label}</span>
                <span class="badge badge-info">Rich Text / HTML</span>
                <small class="cms-field-meta">\${safeKey}</small>
              </label>
              <div class="cms-field-tools">
                <button type="button" class="btn-text-sm" onclick="PageEditor.resetSingleDefault('\${safeKey}', '\${this.escapeAttr(f.defaultValue)}')">↺ Default</button>
              </div>
            </div>
            \${this.renderLanguageTabs(safeKey, f.type, rawVal)}
          </div>
        \`;
      } else if (f.type === 'image' || f.type === 'background') {
        const imgSrc = typeof rawVal === 'string' ? rawVal : (f.defaultValue || '');
        const resolvedSrc = this.resolvePreviewUrl(imgSrc);

        controlHtml = \`
          <div class="cms-field-wrap" data-field-key="\${safeKey}">
            <div class="cms-field-header">
              <label class="cms-field-label">
                <span>\${label}</span>
                <span class="badge badge-success">Image Asset</span>
                <small class="cms-field-meta">\${safeKey}</small>
              </label>
              <div class="cms-field-tools">
                <button type="button" class="btn-text-sm" onclick="PageEditor.resetSingleDefault('\${safeKey}', '\${this.escapeAttr(f.defaultValue)}')">↺ Default</button>
              </div>
            </div>
            <div class="cms-image-picker-box">
              <div class="cms-image-preview-slot">
                <img id="preview_\${safeKey}" src="\${resolvedSrc}" alt="Preview" onerror="this.src='../assets/images/logo.png'">
              </div>
              <div class="cms-image-controls">
                <input type="text" class="form-control" id="input_\${safeKey}" value="\${this.escapeAttr(imgSrc)}" placeholder="assets/images/... or https://res.cloudinary.com/..." onchange="PageEditor.onImageInputChange('\${safeKey}', this.value)">
                <div class="cms-image-btn-group">
                  <button type="button" class="btn btn-sm btn-secondary" onclick="PageEditor.openMediaPickerForField('\${safeKey}')">Browse Library</button>
                  <label class="btn btn-sm btn-outline" style="cursor: pointer; margin: 0;">
                    Upload WebP
                    <input type="file" accept="image/*" style="display: none;" onchange="PageEditor.handleDirectImageUpload('\${safeKey}', this)">
                  </label>
                </div>
              </div>
            </div>
          </div>
        \`;
      } else if (f.type === 'video') {
        const videoSrc = typeof rawVal === 'string' ? rawVal : (f.defaultValue || '');
        controlHtml = \`
          <div class="cms-field-wrap cms-field-wide" data-field-key="\${safeKey}">
            <div class="cms-field-header">
              <label class="cms-field-label">
                <span>\${label}</span>
                <span class="badge badge-warning">Video Stream / MP4</span>
                <small class="cms-field-meta">\${safeKey}</small>
              </label>
            </div>
            <div class="cms-video-picker-box">
              <input type="text" class="form-control" id="input_\${safeKey}" value="\${this.escapeAttr(videoSrc)}" placeholder="assets/videos/hero-banner.mp4 or Cloudinary URL" onchange="PageEditor.onFieldValueChange('\${safeKey}', this.value)">
              <small style="color: var(--ink-muted); margin-top: 6px; display: block;">Supports local MP4 paths, Cloudinary video streams, and Vimeo/YouTube embed URLs.</small>
            </div>
          </div>
        \`;
      } else if (f.type === 'link') {
        const linkHref = typeof rawVal === 'string' ? rawVal : (f.defaultValue || '');
        controlHtml = \`
          <div class="cms-field-wrap" data-field-key="\${safeKey}">
            <div class="cms-field-header">
              <label class="cms-field-label">
                <span>\${label}</span>
                <span class="badge badge-secondary">Link / Route</span>
                <small class="cms-field-meta">\${safeKey}</small>
              </label>
            </div>
            <input type="text" class="form-control" id="input_\${safeKey}" value="\${this.escapeAttr(linkHref)}" placeholder="./destinations.html or https://..." onchange="PageEditor.onFieldValueChange('\${safeKey}', this.value)">
          </div>
        \`;
      } else {
        controlHtml = \`
          <div class="cms-field-wrap" data-field-key="\${safeKey}">
            <label class="cms-field-label"><span>\${label}</span></label>
            <input type="text" class="form-control" id="input_\${safeKey}" value="\${this.escapeAttr(enVal)}" onchange="PageEditor.onFieldValueChange('\${safeKey}', this.value)">
          </div>
        \`;
      }

      return controlHtml;
    },

    renderLanguageTabs(fieldKey, fieldType, rawValue) {
      const activeLang = this.activeLangTab;
      const langTabsHtml = LANGUAGES.map(l => \`
        <button type="button" class="cms-lang-tab-pill \${l.code === activeLang ? 'is-active' : ''}" data-lang="\${l.code}" onclick="PageEditor.switchLangTab('\${fieldKey}', '\${l.code}')">
          \${l.label}
        </button>
      \`).join('');

      let inputsHtml = '';
      LANGUAGES.forEach(l => {
        const val = this.resolveValueForLang(rawValue, l.code);
        const isVisible = l.code === activeLang;
        const inputId = \`input_\${fieldKey}_\${l.code}\`;
        const dir = l.code === 'ar' ? 'dir="rtl"' : 'dir="ltr"';

        if (fieldType === 'html') {
          inputsHtml += \`
            <div class="cms-lang-field-pane" id="pane_\${fieldKey}_\${l.code}" style="\${isVisible ? 'display: block;' : 'display: none;'}">
              <textarea class="form-control cms-textarea-richtext" id="\${inputId}" \${dir} rows="4" oninput="PageEditor.onI18nChange('\${fieldKey}', '\${l.code}', this.value)">\${this.escapeHtml(val)}</textarea>
              <div class="cms-lang-pane-footer">
                \${l.code !== 'en' ? \`<button type="button" class="btn-text-sm" onclick="PageEditor.copyFromEnglish('\${fieldKey}', '\${l.code}')">📋 Copy from English</button>\` : ''}
              </div>
            </div>
          \`;
        } else {
          inputsHtml += \`
            <div class="cms-lang-field-pane" id="pane_\${fieldKey}_\${l.code}" style="\${isVisible ? 'display: block;' : 'display: none;'}">
              <input type="text" class="form-control" id="\${inputId}" \${dir} value="\${this.escapeAttr(val)}" oninput="PageEditor.onI18nChange('\${fieldKey}', '\${l.code}', this.value)">
              <div class="cms-lang-pane-footer">
                \${l.code !== 'en' ? \`<button type="button" class="btn-text-sm" onclick="PageEditor.copyFromEnglish('\${fieldKey}', '\${l.code}')">📋 Copy from English</button>\` : ''}
              </div>
            </div>
          \`;
        }
      });

      return \`
        <div class="cms-lang-tabs-wrapper" id="tabs_\${fieldKey}">
          <div class="cms-lang-pill-row">
            \${langTabsHtml}
          </div>
          \${inputsHtml}
        </div>
      \`;
    },

    switchLangTab(fieldKey, langCode) {
      const container = document.getElementById(\`tabs_\${fieldKey}\`);
      if (!container) return;

      container.querySelectorAll('.cms-lang-tab-pill').forEach(btn => {
        btn.classList.toggle('is-active', btn.getAttribute('data-lang') === langCode);
      });

      container.querySelectorAll('.cms-lang-field-pane').forEach(pane => {
        pane.style.display = pane.id === \`pane_\${fieldKey}_\${langCode}\` ? 'block' : 'none';
      });
    },

    copyFromEnglish(fieldKey, targetLang) {
      const enInput = document.getElementById(\`input_\${fieldKey}_en\`);
      const targetInput = document.getElementById(\`input_\${fieldKey}_\${targetLang}\`);
      if (enInput && targetInput) {
        targetInput.value = enInput.value;
        this.onI18nChange(fieldKey, targetLang, enInput.value);
        if (window.AdminApp) window.AdminApp.showToast(\`Copied English value to \${targetLang}\`, 'info');
      }
    },

    onI18nChange(fieldKey, langCode, val) {
      if (!this.currentFieldValues[fieldKey] || typeof this.currentFieldValues[fieldKey] !== 'object') {
        const current = this.getCurrentValue(fieldKey, {});
        if (typeof current === 'string') {
          this.currentFieldValues[fieldKey] = { en: current };
        } else {
          this.currentFieldValues[fieldKey] = { ...(current || {}) };
        }
      }
      this.currentFieldValues[fieldKey][langCode] = val;
      if (window.AdminApp) window.AdminApp.unsavedChanges = true;
    },

    onFieldValueChange(fieldKey, val) {
      this.currentFieldValues[fieldKey] = val;
      if (window.AdminApp) window.AdminApp.unsavedChanges = true;
    },

    onImageInputChange(fieldKey, val) {
      this.onFieldValueChange(fieldKey, val);
      const previewImg = document.getElementById(\`preview_\${fieldKey}\`);
      if (previewImg) {
        previewImg.src = this.resolvePreviewUrl(val);
      }
    },

    resolvePreviewUrl(url) {
      if (!url) return '../assets/images/logo.png';
      url = String(url).trim();
      const clean = url.replace(/^(\\.\\.\\/)+/, '').replace(/^(\\.\\/)+/, '').replace(/^\\//, '');
      if (LEGACY_IMAGE_MAP[clean]) {
        return '../' + LEGACY_IMAGE_MAP[clean];
      }
      if (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('data:')) return url;
      return '../' + clean;
    },

    resetSingleDefault(fieldKey, defaultValue) {
      this.currentFieldValues[fieldKey] = defaultValue;
      const f = this.getPageFields().find(e => e.fieldKey === fieldKey);
      if (f) {
        const el = document.querySelector(\`[data-field-key="\${fieldKey}"]\`);
        if (el) {
          el.outerHTML = this.renderFieldControl(f);
        }
      }
      if (window.AdminApp) {
        window.AdminApp.showToast(\`Reset \${fieldKey} to default\`, 'info');
        window.AdminApp.unsavedChanges = true;
      }
    },

    resetSectionDefaults(sectionName) {
      const fields = this.getPageFields();
      const groups = this.groupFieldsBySection(fields);
      const targetFields = groups[sectionName] || [];

      targetFields.forEach(f => {
        this.currentFieldValues[f.fieldKey] = f.defaultValue;
      });

      this.renderSections();
      if (window.AdminApp) {
        window.AdminApp.showToast(\`Reset section "\${sectionName}" to defaults\`, 'info');
        window.AdminApp.unsavedChanges = true;
      }
    },

    resetAllDefaults() {
      if (!confirm('Are you sure you want to reset ALL fields on this page to their original hardcoded defaults?')) {
        return;
      }
      const fields = this.getPageFields();
      fields.forEach(f => {
        this.currentFieldValues[f.fieldKey] = f.defaultValue;
      });
      this.renderSections();
      if (window.AdminApp) {
        window.AdminApp.showToast('All fields reset to defaults. Click "Publish Live" to commit.', 'info');
        window.AdminApp.unsavedChanges = true;
      }
    },

    filterFields(query) {
      query = (query || '').toLowerCase().trim();
      const cards = document.querySelectorAll('.cms-accordion-card');

      cards.forEach(card => {
        const fields = card.querySelectorAll('.cms-field-wrap');
        let sectionHasMatch = false;

        fields.forEach(f => {
          const key = (f.getAttribute('data-field-key') || '').toLowerCase();
          const label = (f.querySelector('.cms-field-label')?.textContent || '').toLowerCase();
          const match = !query || key.includes(query) || label.includes(query);
          f.style.display = match ? 'block' : 'none';
          if (match) sectionHasMatch = true;
        });

        card.style.display = sectionHasMatch ? 'block' : 'none';
        if (query && sectionHasMatch) {
          card.classList.add('is-open');
          const body = card.querySelector('.cms-accordion-body');
          if (body) body.style.display = 'block';
        }
      });
    },

    updateFieldCounts(total) {
      const badge = document.getElementById('pageEditorFieldCount');
      if (badge) badge.textContent = \`\${total} editable fields\`;
    },

    // =========================================================================
    // 3. DRAFT, PUBLISH, & LIVE PREVIEW WORKFLOW
    // =========================================================================

    async saveDraft() {
      await this.savePageContent('draft');
    },

    async publish() {
      await this.savePageContent('published');
    },

    async savePageContent(status = 'published') {
      if (!this.activePageKey) return;
      const saveBtn = document.getElementById('pageEditorSaveBtn');
      const publishBtn = document.getElementById('pageEditorPublishBtn');
      if (saveBtn) saveBtn.disabled = true;
      if (publishBtn) publishBtn.disabled = true;

      try {
        const payload = {
          ...this.activeDocData,
          status: status,
          updatedAt: new Date().toISOString(),
          updatedBy: (window.AdminApp && window.AdminApp.currentUser && window.AdminApp.currentUser.email) || 'admin'
        };

        if (!payload.fields) payload.fields = {};

        for (const k in this.currentFieldValues) {
          payload.fields[k] = this.currentFieldValues[k];
          payload[k] = this.currentFieldValues[k];
        }

        if (window.AdminApp && window.AdminApp.fbDb) {
          const parts = this.activePageKey.split('/');
          const col = parts[0];
          const docId = parts.slice(1).join('/');

          // 1. Write page document
          await window.AdminApp.fbDb.collection(col).doc(docId).set(payload, { merge: true });

          // 2. If publishing, bump siteMeta/version
          if (status === 'published') {
            await window.AdminApp.fbDb.collection('siteMeta').doc('version').set({
              v: Date.now(),
              updatedAt: new Date().toISOString(),
              updatedBy: payload.updatedBy
            }, { merge: true });
          }

          // 3. Log activity
          try {
            await window.AdminApp.fbDb.collection('activityLog').add({
              action: status === 'published' ? 'page_publish' : 'page_draft_save',
              target: this.activePageKey,
              actor: payload.updatedBy,
              timestamp: new Date().toISOString()
            });
          } catch (e) {}
        }

        this.activeDocData = payload;
        if (window.AdminApp) {
          window.AdminApp.unsavedChanges = false;
          window.AdminApp.showToast(\`Page "\${this.activePageKey}" \${status === 'published' ? 'published live' : 'saved as draft'}!\`, 'success');
        }
      } catch (err) {
        console.error('[PageEditor] Save error:', err);
        if (window.AdminApp) {
          window.AdminApp.showToast(\`Save error: \${err.message}\`, 'error');
        }
      } finally {
        if (saveBtn) saveBtn.disabled = false;
        if (publishBtn) publishBtn.disabled = false;
      }
    },

    openLivePreview() {
      if (!this.activePageFile) return;
      const url = \`../\${this.activePageFile}?preview=1&v=\${Date.now()}\`;
      window.open(url, '_blank', 'noopener,noreferrer');
    },

    // =========================================================================
    // 4. GLOBAL COMPONENTS & FORMS EDITORS
    // =========================================================================

    async openGlobalDoc(docId, docTitle) {
      await this.openPage(docId, 'Shared Component');
      const titleEl = document.getElementById('pageEditorTitle');
      if (titleEl) titleEl.textContent = \`🌐 \${docTitle || docId}\`;
    },

    async openFormEditor(formType = 'inquiry_detailed') {
      this.activeFormType = formType;
      if (window.AdminApp) {
        window.AdminApp.switchSection('forms-editor');
      }

      const titleEl = document.getElementById('formEditorActiveTitle');
      if (titleEl) {
        titleEl.textContent = formType === 'inquiry_detailed' 
          ? 'Bespoke Journey Inquiry Form (inquiry-detailed.html)' 
          : 'Quick Consultation Modal & Form (inquiry-quick.html)';
      }

      // Fetch existing doc from Firestore if present
      let formData = {};
      if (window.AdminApp && window.AdminApp.fbDb) {
        try {
          const snap = await window.AdminApp.fbDb.collection('forms').doc(formType).get();
          if (snap && snap.exists) formData = snap.data();
        } catch (e) {
          console.warn('[PageEditor] Failed to fetch form config:', e);
        }
      }

      const emailInput = document.getElementById('formRecipientEmail');
      const subjectInput = document.getElementById('formEmailSubject');
      const honeypotSelect = document.getElementById('formHoneypotEnabled');
      const destArea = document.getElementById('formDestinationsList');
      const styleArea = document.getElementById('formTravelStylesList');

      if (emailInput && formData.recipientEmail) emailInput.value = formData.recipientEmail;
      if (subjectInput && formData.emailSubject) subjectInput.value = formData.emailSubject;
      if (honeypotSelect && formData.honeypotEnabled !== undefined) {
        honeypotSelect.value = String(formData.honeypotEnabled);
      }
      if (destArea && Array.isArray(formData.destinations)) {
        destArea.value = formData.destinations.join(', ');
      }
      if (styleArea && Array.isArray(formData.travelStyles)) {
        styleArea.value = formData.travelStyles.join(', ');
      }
    },

    async saveActiveForm() {
      const formType = this.activeFormType || 'inquiry_detailed';
      const emailInput = document.getElementById('formRecipientEmail');
      const subjectInput = document.getElementById('formEmailSubject');
      const honeypotSelect = document.getElementById('formHoneypotEnabled');
      const destArea = document.getElementById('formDestinationsList');
      const styleArea = document.getElementById('formTravelStylesList');

      const payload = {
        recipientEmail: emailInput ? emailInput.value.trim() : 'info@lotusceylon.com',
        emailSubject: subjectInput ? subjectInput.value.trim() : 'New Journey Inquiry',
        honeypotEnabled: honeypotSelect ? honeypotSelect.value === 'true' : true,
        destinations: destArea ? destArea.value.split(',').map(s => s.trim()).filter(Boolean) : [],
        travelStyles: styleArea ? styleArea.value.split(',').map(s => s.trim()).filter(Boolean) : [],
        updatedAt: new Date().toISOString(),
        updatedBy: (window.AdminApp && window.AdminApp.currentUser && window.AdminApp.currentUser.email) || 'admin'
      };

      if (window.AdminApp && window.AdminApp.fbDb) {
        try {
          await window.AdminApp.fbDb.collection('forms').doc(formType).set(payload, { merge: true });
          window.AdminApp.showToast(\`Form configuration for "\${formType}" saved!\`, 'success');
        } catch (e) {
          window.AdminApp.showToast('Save error: ' + e.message, 'error');
        }
      }
    },

    // =========================================================================
    // 5. BLOG POSTS COLLECTION MANAGER
    // =========================================================================

    async openBlogSection() {
      if (window.AdminApp) {
        window.AdminApp.switchSection('blog-posts');
      }
      await this.loadBlogPosts();
    },

    async loadBlogPosts() {
      const tbody = document.getElementById('blogPostsTableBody');
      if (!tbody) return;

      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--ink-muted);">Loading editorial stories...</td></tr>';

      this.blogPosts = [];
      if (window.AdminApp && window.AdminApp.fbDb) {
        try {
          const snap = await window.AdminApp.fbDb.collection('blogPosts').get();
          snap.forEach(doc => {
            this.blogPosts.push({ id: doc.id, ...doc.data() });
          });
        } catch (e) {
          console.warn('[PageEditor] loadBlogPosts Firestore error:', e);
        }
      }

      // Default mock posts if empty
      if (this.blogPosts.length === 0) {
        this.blogPosts = [
          {
            id: 'guide-to-sigiriya-ancient-rock',
            title: 'Ascending the Lion Rock: Sigiriya at Dawn',
            slug: 'guide-to-sigiriya-ancient-rock',
            category: 'Heritage & Culture',
            author: 'Anura Senanayake',
            publishDate: '2026-10-15',
            coverImage: 'assets/images/sigiriya.jpg',
            status: 'published',
            excerpt: 'The psychological and architectural mastery behind King Kashyapa 5th-century citadel.'
          },
          {
            id: 'wild-leopards-of-yala-block-one',
            title: 'Tracking the Elusive Leopards of Yala Block I',
            slug: 'wild-leopards-of-yala-block-one',
            category: 'Wildlife & Conservation',
            author: 'Ravi Wickramasinghe',
            publishDate: '2026-10-02',
            coverImage: 'assets/images/wildlife.jpg',
            status: 'published',
            excerpt: 'Ethical safari protocols and the highest density of wild leopards on planet Earth.'
          }
        ];
      }

      this.renderBlogTable();
    },

    renderBlogTable() {
      const tbody = document.getElementById('blogPostsTableBody');
      if (!tbody) return;

      if (this.blogPosts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--ink-muted);">No blog posts found. Click "+ New Blog Post" to create one.</td></tr>';
        return;
      }

      tbody.innerHTML = this.blogPosts.map(post => {
        const cover = this.resolvePreviewUrl(post.coverImage || post.cover_image);
        const isPub = post.status === 'published' || post.isPublished;
        const safeId = this.escapeAttr(post.id);

        return \`
          <tr>
            <td style="width: 70px;">
              <img src="\${cover}" alt="Cover" style="width: 60px; height: 42px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-color);" onerror="this.src='../assets/images/logo.png'">
            </td>
            <td>
              <strong>\${this.escapeHtml(post.title)}</strong><br>
              <small style="color: var(--ink-muted);">/\${this.escapeHtml(post.slug || post.id)}</small>
            </td>
            <td><span class="badge badge-secondary">\${this.escapeHtml(post.category || 'General')}</span></td>
            <td>\${this.escapeHtml(post.publishDate || post.date || 'Recent')}</td>
            <td>
              <span class="badge \${isPub ? 'badge-success' : 'badge-warning'}">\${isPub ? 'Published' : 'Draft'}</span>
            </td>
            <td>
              <div style="display: flex; gap: 6px;">
                <button type="button" class="btn-icon" title="Edit Article" onclick="PageEditor.openBlogPostModal('\${safeId}')">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </button>
                <button type="button" class="btn-icon delete" title="Delete Article" onclick="PageEditor.deleteBlogPost('\${safeId}')">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
              </div>
            </td>
          </tr>
        \`;
      }).join('');
    },

    openBlogPostModal(postId = null) {
      const modal = document.getElementById('blogPostModal');
      const form = document.getElementById('blogPostForm');
      if (!modal || !form) return;

      form.reset();
      const titleEl = document.getElementById('blogPostModalTitle');

      if (postId) {
        const post = this.blogPosts.find(p => p.id === postId) || {};
        if (titleEl) titleEl.textContent = 'Edit Blog Article';
        document.getElementById('blogPostId').value = post.id || '';
        document.getElementById('blogTitle').value = post.title || '';
        document.getElementById('blogSlug').value = post.slug || post.id || '';
        document.getElementById('blogCategory').value = post.category || '';
        document.getElementById('blogAuthor').value = post.author || '';
        document.getElementById('blogDate').value = post.publishDate || post.date || '';
        document.getElementById('blogCoverImage').value = post.coverImage || post.cover_image || '';
        document.getElementById('blogExcerpt').value = post.excerpt || '';
        document.getElementById('blogContent').value = post.content || '';
        document.getElementById('blogIsPublished').checked = post.status === 'published' || post.isPublished;
      } else {
        if (titleEl) titleEl.textContent = 'Add New Blog Article';
        document.getElementById('blogPostId').value = '';
        document.getElementById('blogDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('blogIsPublished').checked = true;
      }

      if (window.AdminApp) {
        window.AdminApp.openModal('blogPostModal');
      } else {
        modal.classList.add('active');
      }
    },

    async saveActiveBlogPost() {
      const postId = document.getElementById('blogPostId').value.trim();
      const title = document.getElementById('blogTitle').value.trim();
      const slug = document.getElementById('blogSlug').value.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const category = document.getElementById('blogCategory').value.trim();
      const author = document.getElementById('blogAuthor').value.trim();
      const publishDate = document.getElementById('blogDate').value;
      const coverImage = document.getElementById('blogCoverImage').value.trim();
      const excerpt = document.getElementById('blogExcerpt').value.trim();
      const content = document.getElementById('blogContent').value.trim();
      const isPublished = document.getElementById('blogIsPublished').checked;

      const docId = postId || slug;
      const payload = {
        id: docId,
        title,
        slug,
        category,
        author,
        publishDate,
        coverImage,
        excerpt,
        content,
        status: isPublished ? 'published' : 'draft',
        isPublished,
        updatedAt: new Date().toISOString(),
        updatedBy: (window.AdminApp && window.AdminApp.currentUser && window.AdminApp.currentUser.email) || 'admin'
      };

      if (window.AdminApp && window.AdminApp.fbDb) {
        try {
          await window.AdminApp.fbDb.collection('blogPosts').doc(docId).set(payload, { merge: true });
          if (isPublished) {
            await window.AdminApp.fbDb.collection('siteMeta').doc('version').set({
              v: Date.now(),
              updatedAt: new Date().toISOString()
            }, { merge: true });
          }
        } catch (e) {
          console.warn('[PageEditor] Failed to save blog post to Firestore:', e);
        }
      }

      const existingIndex = this.blogPosts.findIndex(p => p.id === docId);
      if (existingIndex >= 0) {
        this.blogPosts[existingIndex] = payload;
      } else {
        this.blogPosts.unshift(payload);
      }

      this.renderBlogTable();
      if (window.AdminApp) {
        window.AdminApp.closeModal('blogPostModal');
        window.AdminApp.showToast(\`Article "\${title}" saved!\`, 'success');
      }
    },

    async deleteBlogPost(postId) {
      if (!confirm(\`Are you sure you want to delete article "\${postId}"?\`)) return;

      if (window.AdminApp && window.AdminApp.fbDb) {
        try {
          await window.AdminApp.fbDb.collection('blogPosts').doc(postId).delete();
        } catch (e) {
          console.warn('[PageEditor] Delete blog post error:', e);
        }
      }

      this.blogPosts = this.blogPosts.filter(p => p.id !== postId);
      this.renderBlogTable();
      if (window.AdminApp) {
        window.AdminApp.showToast('Article deleted', 'info');
      }
    },

    // =========================================================================
    // 6. MEDIA PICKER & CLOUDINARY UPLOAD HOOKS
    // =========================================================================

    openMediaPickerForField(fieldKey) {
      if (window.AdminApp && typeof window.AdminApp.openImagePicker === 'function') {
        window.AdminApp.openImagePicker(\`input_\${fieldKey}\`, \`preview_\${fieldKey}\`);
      }
    },

    async handleDirectImageUpload(fieldKey, inputEl) {
      const file = inputEl.files && inputEl.files[0];
      if (!file) return;

      if (window.AdminApp) {
        window.AdminApp.showToast('Optimizing & uploading image...', 'info');
      }

      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target.result;
          this.onImageInputChange(fieldKey, dataUrl);
          if (window.AdminApp) window.AdminApp.showToast('Image uploaded & bound to field', 'success');
        };
        reader.readAsDataURL(file);
      } catch (e) {
        if (window.AdminApp) window.AdminApp.showToast('Upload failed: ' + e.message, 'error');
      }
    },

    escapeHtml(str) {
      if (str === null || str === undefined) return '';
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    escapeAttr(str) {
      if (str === null || str === undefined) return '';
      return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  };

  window.PageEditor = PageEditor;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PageEditor.init());
  } else {
    PageEditor.init();
  }

})(window, document);
`;

fs.writeFileSync('admin/js/page-editor.js', code, 'utf8');
console.log('Successfully wrote admin/js/page-editor.js (length:', code.length, ')');
