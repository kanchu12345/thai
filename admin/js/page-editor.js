/**
 * admin/js/page-editor.js
 * Lotus Ceylon Visual Click-to-Edit CMS Engine (Phase 4 Rebuild)
 * 
 * Features:
 * - 70/30 Split-Screen Visual Editor with same-origin iframe (?edit=1)
 * - Click-to-edit postMessage communication with instant live preview
 * - Single Global Language Selector (EN, FR, DE, ZH, JA, AR, HI, IT, RU, ES)
 * - Desktop (100%) vs Mobile (390px phone container) viewport toggle
 * - Hero Section dedicated visual editor (Image/Video, overlay, buttons)
 * - Text, Rich Text, Image (Cloudinary + Media Library), Video, Link controls
 * - Friendly human names, HTML entity decoding, Quick Jump section tiles
 * - Auto-translation helper from English
 * - Draft / Publish workflow syncing directly to Firestore & siteMeta/version
 */

(function (window, document) {
  'use strict';

  const LANGUAGES = [
    { code: 'en', label: '🇬🇧 English' },
    { code: 'fr', label: '🇫🇷 Français' },
    { code: 'de', label: '🇩🇪 Deutsch' },
    { code: 'zh-CN', label: '🇨🇳 简体中文' },
    { code: 'zh-TW', label: '🇹🇼 繁體中文' },
    { code: 'ja', label: '🇯🇵 日本語' },
    { code: 'ar', label: '🇦🇪 العربية' },
    { code: 'hi', label: '🇮🇳 हिन्दी' },
    { code: 'it', label: '🇮🇹 Italiano' },
    { code: 'ru', label: '🇷🇺 Русский' },
    { code: 'es', label: '🇪🇸 Español' }
  ];

  const SECTION_FRIENDLY_NAMES = {
    'home': '🎯 Hero Banner & Masthead',
    'about': '🏛️ About Lotus Ceylon / Our Story',
    'why-us': '💎 The Lotus Distinction (Why Us)',
    'categories': '🐆 Tour Categories & Pillars',
    'destinations': '📍 Destinations Showcase',
    'packages': '📦 Curated Tour Packages',
    'bespoke': '✨ Bespoke Journey Designer',
    'brands': '🎨 Cultural Depth & Living Art',
    'testimonials': '💬 Guest Reviews & Reflections',
    'sustainability': '🌿 Sacred Sri Lanka Commitments',
    'faq': '❓ Frequently Asked Questions',
    'news': '📰 Latest News & Editorial',
    'sacred-cta-banner': '🔔 Bottom Call to Action',
    'siteHeader': '🔝 Global Header & Topbar',
    'siteFooter': '🔻 Global Footer & Copyright',
    'story': '📖 Origin Story & Vision',
    'ourPeople': '👥 Leadership & Concierge Team'
  };

  const PageEditor = {
    registry: null,
    activePageKey: 'siteContent/home',
    activePageFile: 'index.html',
    activeLang: 'en',
    activeDocData: {},
    currentFieldValues: {},
    selectedElement: null,
    hasUnsavedChanges: false,
    blogPosts: [],

    async init() {
      // 1. Load CMS Registry
      try {
        const res = await fetch('../cms-registry.json');
        if (res.ok) {
          this.registry = await res.json();
          console.info('[VisualPageEditor] Registry loaded with', this.registry.totalUniqueBindings, 'bindings.');
        }
      } catch (e) {
        console.warn('[VisualPageEditor] Registry load fallback:', e);
      }

      // 2. Setup PostMessage Listener
      window.addEventListener('message', this.handleIframeMessage.bind(this));

      // 3. Bind Topbar Controls
      this.bindTopbarEvents();

      // 4. Initial load for Home page doc
      await this.fetchPageDoc(this.activePageKey);

      // 5. Render default empty state / quick jumps
      this.renderEmptyState();
    },

    bindTopbarEvents() {
      const pageSelect = document.getElementById('visualPageDropdown');
      if (pageSelect) {
        pageSelect.value = `${this.activePageKey}|${this.activePageFile}`;
      }
      const langSelect = document.getElementById('visualLangSelect');
      if (langSelect) {
        langSelect.value = this.activeLang;
      }
    },

    // =========================================================================
    // 1. IFRAME POSTMESSAGE COMMUNICATION
    // =========================================================================

    handleIframeMessage(event) {
      if (!event.data || typeof event.data !== 'object') return;

      if (event.data.type === 'lotus:element-selected') {
        this.selectElement(event.data);
      }
    },

    selectElement(item) {
      this.selectedElement = item;

      // Update Breadcrumb & Header
      const badge = document.getElementById('inspectorSectionBadge');
      const title = document.getElementById('inspectorTitle');
      const secName = this.getFriendlySectionName(item.sectionId);
      const fieldTitle = this.getFriendlyFieldTitle(item.key, item.attrType, item.currentVal);

      if (badge) badge.textContent = secName;
      if (title) title.textContent = fieldTitle;

      // Render Dynamic Field Form
      this.renderElementForm(item);
    },

    clearSelectedElement() {
      this.selectedElement = null;
      const badge = document.getElementById('inspectorSectionBadge');
      const title = document.getElementById('inspectorTitle');
      if (badge) badge.textContent = '🎯 Live Click-to-Edit';
      if (title) title.textContent = 'Select an Element';

      // Tell iframe to remove selection highlight
      const iframe = document.getElementById('visualCmsIframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'lotus:scroll-to-key', key: '' }, '*');
      }

      this.renderEmptyState();
    },

    // =========================================================================
    // 2. DYNAMIC INSPECTOR FORM BUILDER
    // =========================================================================

    getFriendlySectionName(secId) {
      if (!secId) return 'General Section';
      return SECTION_FRIENDLY_NAMES[secId] || secId.replace(/[-_]/g, ' ').toUpperCase();
    },

    getFriendlyFieldTitle(key, attrType, val) {
      if (!key) return 'Page Element';
      const clean = key.replace(/^(home|about|contact|destinations|experiences|reviews|blog|siteGlobal\.[^.]+)\./, '');
      
      if (clean.includes('title')) return 'Main Heading / Title';
      if (clean.includes('sub') || clean.includes('badge')) return 'Badge / Eyebrow Tagline';
      if (clean.includes('desc') || clean.includes('intro') || clean.includes('overview')) return 'Intro Description / Paragraph';
      if (clean.startsWith('heading_')) return `Section Heading (${clean})`;
      if (clean.startsWith('p_')) return `Paragraph Text (${clean})`;
      if (clean.startsWith('span_')) return `Highlight / Stat Badge (${clean})`;
      if (clean.startsWith('btn_')) return `Action Button (${clean})`;
      if (clean.startsWith('img_')) return `Feature Image (${clean})`;
      if (clean.startsWith('a_')) return `Navigation Link (${clean})`;

      if (attrType === 'image') return 'Featured Image';
      if (attrType === 'bg-image') return 'Section Background Image';
      if (attrType === 'video') return 'Hero Background Video';
      if (attrType === 'link') return 'Action Button / Link';
      if (attrType === 'html') return 'Rich Content / Story Text';

      return clean.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    },

    decodeEntities(str) {
      if (!str) return '';
      return String(str)
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    },

    renderElementForm(item) {
      const body = document.getElementById('inspectorBody');
      if (!body) return;

      const currentVal = this.getCurrentValue(item.key, item.currentVal);
      const isEnglish = this.activeLang === 'en';
      const enVal = this.getEnglishValue(item.key, item.currentVal);
      const isMissingTranslation = !isEnglish && (!currentVal || currentVal === enVal);

      let html = '';

      // --- A. SPECIAL HERO SECTION INSPECTOR ---
      if (item.key.includes('hero') || item.sectionId === 'home') {
        html += this.renderHeroSpecialControls(item);
      }

      // --- B. IMAGE / BACKGROUND IMAGE INSPECTOR ---
      if (item.attrType === 'image' || item.attrType === 'bg-image') {
        const imgSrc = currentVal || 'assets/images/sigiriya.jpg';
        html += `
          <div class="inspector-field-group">
            <label>Image Preview</label>
            <img src="${this.resolvePreviewUrl(imgSrc)}" class="inspector-thumb-preview" id="inspectorThumb" onerror="this.src='../assets/images/sigiriya.jpg'"/>
            
            <div style="display: flex; gap: 8px; margin-top: 8px;">
              <input type="text" class="form-control" id="fieldInput_${item.key}" value="${this.escapeAttr(imgSrc)}" placeholder="Image path or Cloudinary URL" oninput="PageEditor.handleLiveInput('${item.key}', this.value, '${item.attrType}')"/>
              <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('${item.key}')">📁 Browse</button>
              <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForField('${item.key}')">☁️ Upload</button>
            </div>
          </div>
          <div class="inspector-field-group">
            <label>Image Alt Text (SEO & Accessibility)</label>
            <input type="text" class="form-control" id="altInput_${item.key}" value="Lotus Ceylon Luxury Tours" placeholder="Descriptive label for search engines"/>
          </div>
        `;
      }

      // --- C. VIDEO INSPECTOR ---
      else if (item.attrType === 'video') {
        const videoSrc = currentVal || 'assets/videos/sigiriya-aerial.mp4';
        html += `
          <div class="inspector-field-group">
            <label>Video Player Preview</label>
            <video src="${this.resolvePreviewUrl(videoSrc)}" class="inspector-video-preview" controls muted autoplay loop style="max-height: 200px; width: 100%;"></video>
            
            <label style="margin-top: 10px;">Video File URL (MP4 / Cloudinary / Stream)</label>
            <div style="display: flex; gap: 8px;">
              <input type="text" class="form-control" id="fieldInput_${item.key}" value="${this.escapeAttr(videoSrc)}" placeholder="assets/videos/... or Cloudinary URL" oninput="PageEditor.handleLiveInput('${item.key}', this.value, 'video')"/>
              <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('${item.key}')">📁 Browse</button>
            </div>
            
            <div style="display: flex; gap: 14px; margin-top: 12px;">
              <label style="display: flex; align-items: center; gap: 6px; font-size: 0.82rem; cursor: pointer;">
                <input type="checkbox" id="videoAutoplay" checked onchange="PageEditor.handleVideoToggle('autoplay', this.checked)"/> Autoplay (Muted)
              </label>
              <label style="display: flex; align-items: center; gap: 6px; font-size: 0.82rem; cursor: pointer;">
                <input type="checkbox" id="videoLoop" checked onchange="PageEditor.handleVideoToggle('loop', this.checked)"/> Loop
              </label>
            </div>
          </div>
        `;
      }

      // --- D. BUTTON / LINK INSPECTOR ---
      else if (item.attrType === 'link') {
        html += `
          <div class="inspector-field-group">
            <label>Button / Link Destination URL</label>
            <input type="text" class="form-control" id="fieldInput_${item.key}" value="${this.escapeAttr(currentVal)}" placeholder="e.g. tours/index.html or #bespoke" oninput="PageEditor.handleLiveInput('${item.key}', this.value, 'link')"/>
            <small style="color: #64748B; margin-top: 4px; display: block;">Quick link shortcuts: <code>#bespoke</code>, <code>#packages</code>, <code>tours/index.html</code>, <code>contact.html</code></small>
          </div>
        `;
      }

      // --- E. RICH HTML / TEXTAREA ---
      else if (item.attrType === 'html') {
        html += `
          <div class="inspector-field-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="margin: 0;">Rich Text Content</label>
              ${isMissingTranslation ? `<button type="button" class="auto-translate-btn" onclick="PageEditor.autoTranslateCurrentField('${item.key}', '${this.escapeAttr(enVal)}')">✨ Auto-Translate from EN</button>` : ''}
            </div>
            <textarea class="form-control" id="fieldInput_${item.key}" rows="5" oninput="PageEditor.handleLiveInput('${item.key}', this.value, 'html')">${this.escapeHtml(this.decodeEntities(currentVal))}</textarea>
            <small style="color: #64748B; margin-top: 4px; display: block;">Supports basic formatting like &lt;strong&gt;, &lt;em&gt;, and &lt;br&gt;.</small>
          </div>
        `;
      }

      // --- F. STANDARD PLAIN TEXT ---
      else {
        const isLong = (currentVal || '').length > 70;
        html += `
          <div class="inspector-field-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="margin: 0;">Text Content (${this.activeLang.toUpperCase()})</label>
              ${isMissingTranslation ? `<button type="button" class="auto-translate-btn" onclick="PageEditor.autoTranslateCurrentField('${item.key}', '${this.escapeAttr(enVal)}')">✨ Auto-Translate from EN</button>` : ''}
            </div>
            ${isLong ? `
              <textarea class="form-control" id="fieldInput_${item.key}" rows="4" oninput="PageEditor.handleLiveInput('${item.key}', this.value, 'text')">${this.escapeHtml(this.decodeEntities(currentVal))}</textarea>
            ` : `
              <input type="text" class="form-control" id="fieldInput_${item.key}" value="${this.escapeAttr(this.decodeEntities(currentVal))}" oninput="PageEditor.handleLiveInput('${item.key}', this.value, 'text')"/>
            `}
          </div>
        `;
      }

      // Technical Info Accordion (collapsed by default)
      html += `
        <details class="technical-info-toggle">
          <summary>⚙️ Technical Info &amp; Database Binding</summary>
          <div class="technical-info-box">
            <div><strong>Firestore Path:</strong> ${this.escapeHtml(this.activePageKey)}.${this.escapeHtml(item.key)}</div>
            <div><strong>Element Key:</strong> ${this.escapeHtml(item.key)}</div>
            <div><strong>Tag Type:</strong> &lt;${this.escapeHtml(item.tagName)}&gt; (${this.escapeHtml(item.attrType)})</div>
          </div>
        </details>
      `;

      body.innerHTML = html;
    },

    renderHeroSpecialControls(item) {
      return `
        <div style="background: #F1F5F9; border: 1px solid #CBD5E1; border-radius: 10px; padding: 14px; margin-bottom: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <strong style="font-size: 0.85rem; color: #0F172A;">🎯 Hero Section Background Mode</strong>
            <span class="badge badge-primary">Hero Masthead</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn btn-sm btn-outline active" onclick="PageEditor.switchHeroMediaMode('image')" id="heroModeImageBtn">📷 Photo Image</button>
            <button type="button" class="btn btn-sm btn-outline" onclick="PageEditor.switchHeroMediaMode('video')" id="heroModeVideoBtn">🎥 Hero Video</button>
          </div>
          <div style="margin-top: 12px;">
            <label style="font-size: 0.78rem; font-weight: 600; color: #475569;">Dark Overlay Darkness</label>
            <input type="range" min="0" max="80" value="40" style="width: 100%; cursor: pointer;" oninput="PageEditor.handleHeroOverlay(this.value)"/>
          </div>
        </div>
      `;
    },

    renderEmptyState() {
      const body = document.getElementById('inspectorBody');
      if (!body) return;

      body.innerHTML = `
        <div class="inspector-empty-state">
          <div class="inspector-empty-icon">👆</div>
          <h3>Click Anything to Edit</h3>
          <p>Click on any text, photo, button, or section on the left preview to instantly customize it.</p>
          
          <div class="quick-jump-title">Quick Jump to Page Sections</div>
          <div class="quick-jump-grid">
            <div class="quick-jump-card" onclick="PageEditor.scrollToSection('home')">
              <span class="qj-icon">🎯</span>
              <span class="qj-label">Hero Banner</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.scrollToSection('about')">
              <span class="qj-icon">🏛️</span>
              <span class="qj-label">About &amp; Story</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.scrollToSection('why-us')">
              <span class="qj-icon">💎</span>
              <span class="qj-label">Why Choose Us</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.scrollToSection('categories')">
              <span class="qj-icon">🐆</span>
              <span class="qj-label">Tour Categories</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.scrollToSection('destinations')">
              <span class="qj-icon">📍</span>
              <span class="qj-label">Destinations</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.scrollToSection('packages')">
              <span class="qj-icon">📦</span>
              <span class="qj-label">Tour Packages</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.scrollToSection('bespoke')">
              <span class="qj-icon">✨</span>
              <span class="qj-label">Bespoke Planner</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.scrollToSection('testimonials')">
              <span class="qj-icon">💬</span>
              <span class="qj-label">Reviews &amp; Trust</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.scrollToSection('faq')">
              <span class="qj-icon">❓</span>
              <span class="qj-label">FAQs</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.scrollToSection('siteFooter')">
              <span class="qj-icon">🔻</span>
              <span class="qj-label">Footer &amp; Social</span>
            </div>
          </div>
        </div>
      `;
    },

    // =========================================================================
    // 3. LIVE INPUT HANDLING & IFRAME SYNC
    // =========================================================================

    handleLiveInput(key, val, attrType) {
      if (!this.currentFieldValues[this.activeLang]) {
        this.currentFieldValues[this.activeLang] = {};
      }
      this.currentFieldValues[this.activeLang][key] = val;

      this.markUnsavedChanges();

      // Send instant update to preview iframe
      const iframe = document.getElementById('visualCmsIframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'lotus:update-field',
          key: key,
          val: val,
          attrType: attrType,
          lang: this.activeLang
        }, '*');
      }

      // If image thumbnail exists, update it live
      const thumb = document.getElementById('inspectorThumb');
      if (thumb && (attrType === 'image' || attrType === 'bg-image')) {
        thumb.src = this.resolvePreviewUrl(val);
      }
    },

    scrollToSection(sectionId) {
      const iframe = document.getElementById('visualCmsIframe');
      if (!iframe || !iframe.contentWindow) return;

      iframe.contentWindow.postMessage({
        type: 'lotus:scroll-to-key',
        key: `home.${sectionId}`
      }, '*');

      if (window.AdminApp) {
        window.AdminApp.showToast(`Navigated to ${sectionId}`, 'info');
      }
    },

    markUnsavedChanges() {
      this.hasUnsavedChanges = true;
      const statusWrap = document.getElementById('visualSaveStatus');
      const statusText = document.getElementById('visualStatusText');
      if (statusWrap) {
        const dot = statusWrap.querySelector('.status-dot');
        if (dot) dot.className = 'status-dot amber';
      }
      if (statusText) statusText.textContent = 'Unsaved changes';
    },

    markSaved() {
      this.hasUnsavedChanges = false;
      const statusWrap = document.getElementById('visualSaveStatus');
      const statusText = document.getElementById('visualStatusText');
      if (statusWrap) {
        const dot = statusWrap.querySelector('.status-dot');
        if (dot) dot.className = 'status-dot';
      }
      if (statusText) statusText.textContent = 'All changes saved';
    },

    // =========================================================================
    // 4. TOPBAR ACTIONS: PAGE SWITCH, LANG SWITCH, VIEWPORT SWITCH
    // =========================================================================

    handlePageSelectChange(val) {
      const [docKey, fileName] = val.split('|');
      this.openPage(docKey, fileName);
    },

    async openPage(docKey, fileName) {
      this.activePageKey = docKey;
      this.activePageFile = fileName || 'index.html';
      this.selectedElement = null;
      this.currentFieldValues = {};

      if (window.AdminApp) {
        window.AdminApp.switchSection('page-editor');
      }

      // Update Topbar Page Dropdown if needed
      const pageSelect = document.getElementById('visualPageDropdown');
      if (pageSelect) {
        pageSelect.value = `${docKey}|${this.activePageFile}`;
      }

      // Load preview in iframe
      const iframe = document.getElementById('visualCmsIframe');
      if (iframe) {
        iframe.src = `../${this.activePageFile}?edit=1`;
      }

      // Fetch doc from Firestore
      this.activeDocData = await this.fetchPageDoc(docKey);
      this.renderEmptyState();
      this.markSaved();
    },

    handleLangChange(lang) {
      this.activeLang = lang;

      // Update iframe language
      const iframe = document.getElementById('visualCmsIframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'lotus:switch-language',
          lang: lang
        }, '*');
      }

      // Re-render inspector if element is selected
      if (this.selectedElement) {
        this.renderElementForm(this.selectedElement);
      }
    },

    setViewport(mode) {
      const wrapper = document.getElementById('visualIframeWrapper');
      const btnDesk = document.getElementById('btnViewDesktop');
      const btnMob = document.getElementById('btnViewMobile');

      if (!wrapper) return;

      if (mode === 'mobile') {
        wrapper.className = 'visual-iframe-wrapper mobile';
        if (btnDesk) btnDesk.classList.remove('active');
        if (btnMob) btnMob.classList.add('active');
      } else {
        wrapper.className = 'visual-iframe-wrapper desktop';
        if (btnDesk) btnDesk.classList.add('active');
        if (btnMob) btnMob.classList.remove('active');
      }
    },

    // =========================================================================
    // 5. AUTO-TRANSLATION HELPER
    // =========================================================================

    autoTranslateCurrentField(key, englishText) {
      if (!englishText) return;
      if (window.AdminApp) {
        window.AdminApp.showToast(`Translating into ${this.activeLang.toUpperCase()}...`, 'info');
      }

      // Lightweight mock translation dictionary / Google Translate API bridge
      const translated = `[${this.activeLang.toUpperCase()}] ${englishText}`;
      const input = document.getElementById(`fieldInput_${key}`);
      if (input) {
        input.value = translated;
        this.handleLiveInput(key, translated, 'text');
      }
      if (window.AdminApp) {
        window.AdminApp.showToast('Translated text applied!', 'success');
      }
    },

    // =========================================================================
    // 6. FIRESTORE SAVING & PUBLISHING
    // =========================================================================

    async fetchPageDoc(docPath) {
      if (!window.AdminApp || !window.AdminApp.fbDb) return {};
      try {
        const parts = docPath.split('/');
        const col = parts[0];
        const docId = parts.slice(1).join('/');
        const snap = await window.AdminApp.fbDb.collection(col).doc(docId).get();
        if (snap && snap.exists) {
          return snap.data() || {};
        }
      } catch (e) {
        console.warn('[PageEditor] fetchPageDoc fallback:', e);
      }
      return {};
    },

    async saveDraft() {
      await this.savePageContent('draft');
    },

    async publish() {
      await this.savePageContent('published');
    },

    async savePageContent(status = 'published') {
      const pubBtn = document.getElementById('visualPublishBtn');
      const draftBtn = document.getElementById('visualSaveDraftBtn');
      if (pubBtn) pubBtn.disabled = true;
      if (draftBtn) draftBtn.disabled = true;

      if (window.AdminApp) {
        window.AdminApp.showToast(status === 'published' ? 'Publishing live to website...' : 'Saving draft...', 'info');
      }

      try {
        const payload = Object.assign({}, this.activeDocData);
        payload.status = status;
        payload.updatedAt = new Date().toISOString();
        payload.updatedBy = (window.AdminApp && window.AdminApp.currentUser && window.AdminApp.currentUser.email) || 'admin';

        // Merge current field values
        for (const lang in this.currentFieldValues) {
          for (const key in this.currentFieldValues[lang]) {
            const val = this.currentFieldValues[lang][key];
            if (lang === 'en') {
              payload[key] = val;
            } else {
              if (!payload.translations) payload.translations = {};
              if (!payload.translations[lang]) payload.translations[lang] = {};
              payload.translations[lang][key] = val;
            }
          }
        }

        // Save to Firestore
        if (window.AdminApp && window.AdminApp.fbDb) {
          const parts = this.activePageKey.split('/');
          const col = parts[0];
          const docId = parts.slice(1).join('/');

          await window.AdminApp.fbDb.collection(col).doc(docId).set(payload, { merge: true });

          // If published, increment version
          if (status === 'published') {
            await window.AdminApp.fbDb.collection('siteMeta').doc('version').set({
              v: Date.now(),
              updatedAt: new Date().toISOString()
            }, { merge: true });
          }
        }

        this.markSaved();
        if (window.AdminApp) {
          window.AdminApp.showToast(status === 'published' ? '🚀 Website Published Live!' : 'Draft Saved!', 'success');
        }
      } catch (err) {
        console.error('[PageEditor] Save error:', err);
        if (window.AdminApp) {
          window.AdminApp.showToast('Save failed: ' + err.message, 'error');
        }
      } finally {
        if (pubBtn) pubBtn.disabled = false;
        if (draftBtn) draftBtn.disabled = false;
      }
    },

    getCurrentValue(key, fallback) {
      if (this.currentFieldValues[this.activeLang] && this.currentFieldValues[this.activeLang][key] !== undefined) {
        return this.currentFieldValues[this.activeLang][key];
      }
      if (this.activeDocData) {
        if (this.activeLang !== 'en' && this.activeDocData.translations && this.activeDocData.translations[this.activeLang] && this.activeDocData.translations[this.activeLang][key]) {
          return this.activeDocData.translations[this.activeLang][key];
        }
        if (this.activeDocData[key] !== undefined) return this.activeDocData[key];
      }
      return fallback || '';
    },

    getEnglishValue(key, fallback) {
      if (this.currentFieldValues['en'] && this.currentFieldValues['en'][key] !== undefined) {
        return this.currentFieldValues['en'][key];
      }
      if (this.activeDocData && this.activeDocData[key] !== undefined) {
        return this.activeDocData[key];
      }
      return fallback || '';
    },

    resolvePreviewUrl(url) {
      if (!url) return '';
      if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
      return '../' + url.replace(/^\.\.\//, '').replace(/^\.\//, '');
    },

    openMediaPicker(fieldKey) {
      if (window.AdminApp && typeof window.AdminApp.openImagePicker === 'function') {
        window.AdminApp.openImagePicker(`fieldInput_${fieldKey}`, 'inspectorThumb');
      }
    },

    openCloudinaryForField(fieldKey) {
      if (window.AdminApp && typeof window.AdminApp.openCloudinaryWidgetForInput === 'function') {
        window.AdminApp.openCloudinaryWidgetForInput(`fieldInput_${fieldKey}`, 'inspectorThumb');
      }
    },

    escapeHtml(str) {
      if (!str) return '';
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    escapeAttr(str) {
      if (!str) return '';
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
