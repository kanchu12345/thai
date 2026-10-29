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
      const fieldTitle = this.getFriendlyFieldTitle(item.key, item.attrType, item.currentVal, item);

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

    getFriendlyFieldTitle(key, attrType, val, item = null) {
      if (!key) return 'Page Element';
      if (item && item.isWatermark) return '🌊 Watermark Background Heading';
      if (key && (key.includes('watermark') || key.endsWith('.p_1') || key.endsWith('.p_3') || key.endsWith('.p_8') || key.endsWith('.p_41') || key.endsWith('.p_63') || key.endsWith('.p_68'))) {
        if (item && (item.currentVal || '').length < 30) {
          // Check if likely watermark text
        }
      }
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
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="margin: 0; font-weight: 700; color: #0F172A;">🖼️ Image Preview &amp; Source</label>
              <span class="badge" style="font-size: 0.72rem; background: #E2E8F0; color: #334155;">${this.escapeHtml(item.key)}</span>
            </div>
            
            <div style="position: relative; border-radius: 8px; overflow: hidden; background: #0B132B; text-align: center; border: 1px solid #CBD5E1; margin-bottom: 10px;">
              <img src="${this.resolvePreviewUrl(imgSrc)}" class="inspector-thumb-preview" id="inspectorThumb" style="max-height: 200px; width: 100%; object-fit: cover; display: block;" onerror="this.src='../assets/images/placeholder.png'"/>
            </div>

            <label style="font-size: 0.82rem; font-weight: 600; color: #475569;">Image CDN URL / Relative Path</label>
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
              <input type="text" class="form-control" id="fieldInput_${item.key}" value="${this.escapeAttr(imgSrc)}" placeholder="Image path or Cloudinary URL" oninput="PageEditor.handleLiveInput('${item.key}', this.value, '${item.attrType}')"/>
            </div>

            <!-- Action buttons: Upload, Browse, Delete/Remove, Reset -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForField('${item.key}')" title="Upload a new photo directly to Cloudinary CDN">☁️ Upload New</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('${item.key}')" title="Choose from previously uploaded media">📁 Media Library</button>
              <button type="button" class="btn btn-danger btn-sm" onclick="PageEditor.clearImageField('${item.key}', '${item.attrType}')" style="background: #EF4444; color: #FFFFFF; border: none;" title="Remove this image">🗑️ Remove Image</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.resetFieldToDefault('${item.key}', '${item.attrType}')" title="Restore original default image">🔄 Reset Default</button>
            </div>
          </div>

          <div class="inspector-field-group">
            <label style="font-weight: 600; font-size: 0.82rem; color: #475569;">Image Alt Text (SEO &amp; Accessibility)</label>
            <input type="text" class="form-control" id="altInput_${item.key}" value="Lotus Ceylon Luxury Tours" placeholder="Descriptive label for search engines" oninput="PageEditor.handleLiveInput('${item.key}_alt', this.value, 'alt')"/>
          </div>

          <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid #E2E8F0;">
            <button type="button" class="btn btn-gold btn-block" onclick="PageEditor.publish()">🚀 Publish Changes Live</button>
          </div>
        `;
      }

      // --- C. VIDEO INSPECTOR ---
      else if (item.attrType === 'video') {
        const videoSrc = currentVal || 'assets/videos/sigiriya-aerial.mp4';
        html += `
          <div class="inspector-field-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="margin: 0; font-weight: 700; color: #0F172A;">🎬 Video Player Preview</label>
              <span class="badge" style="font-size: 0.72rem; background: #E2E8F0; color: #334155;">${this.escapeHtml(item.key)}</span>
            </div>
            
            <div style="border-radius: 8px; overflow: hidden; background: #000; margin-bottom: 10px;">
              <video src="${this.resolvePreviewUrl(videoSrc)}" class="inspector-video-preview" controls muted autoplay loop style="max-height: 200px; width: 100%; display: block;"></video>
            </div>
            
            <label style="font-size: 0.82rem; font-weight: 600; color: #475569;">Video URL (Cloudinary / MP4 Stream)</label>
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
              <input type="text" class="form-control" id="fieldInput_${item.key}" value="${this.escapeAttr(videoSrc)}" placeholder="assets/videos/... or Cloudinary URL" oninput="PageEditor.handleLiveInput('${item.key}', this.value, 'video')"/>
            </div>

            <!-- Video Actions -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForField('${item.key}', 'video')">🎬 Upload Video</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('${item.key}')">📁 Media Library</button>
              <button type="button" class="btn btn-danger btn-sm" onclick="PageEditor.clearVideoField('${item.key}')" style="background: #EF4444; color: #FFFFFF; border: none;">🗑️ Remove Video</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.resetFieldToDefault('${item.key}', 'video')">🔄 Reset Default</button>
            </div>
            
            <div style="display: flex; gap: 14px; margin-top: 10px; padding: 8px 12px; background: #F8FAFC; border-radius: 6px; border: 1px solid #E2E8F0;">
              <label style="display: flex; align-items: center; gap: 6px; font-size: 0.82rem; cursor: pointer; margin: 0;">
                <input type="checkbox" id="videoAutoplay" checked onchange="PageEditor.handleVideoToggle('autoplay', this.checked)"/> Autoplay (Muted)
              </label>
              <label style="display: flex; align-items: center; gap: 6px; font-size: 0.82rem; cursor: pointer; margin: 0;">
                <input type="checkbox" id="videoLoop" checked onchange="PageEditor.handleVideoToggle('loop', this.checked)"/> Loop
              </label>
            </div>

            <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid #E2E8F0;">
              <button type="button" class="btn btn-gold btn-block" onclick="PageEditor.publish()">🚀 Publish Changes Live</button>
            </div>
          </div>
        `;
      }

      // --- D. BUTTON / LINK INSPECTOR ---
      else if (item.attrType === 'link') {
        html += `
          <div class="inspector-field-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="margin: 0; font-weight: 700; color: #0F172A;">🔗 Button / Link Destination</label>
              <span class="badge" style="font-size: 0.72rem; background: #E2E8F0; color: #334155;">${this.escapeHtml(item.key)}</span>
            </div>
            <input type="text" class="form-control" id="fieldInput_${item.key}" value="${this.escapeAttr(currentVal)}" placeholder="e.g. tours/index.html or #bespoke" oninput="PageEditor.handleLiveInput('${item.key}', this.value, 'link')"/>
            
            <div style="display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;">
              <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('fieldInput_${item.key}').value='#packages'; PageEditor.handleLiveInput('${item.key}', '#packages', 'link');">#packages</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('fieldInput_${item.key}').value='inquiry-detailed.html'; PageEditor.handleLiveInput('${item.key}', 'inquiry-detailed.html', 'link');">Bespoke Form</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('fieldInput_${item.key}').value='tours/index.html'; PageEditor.handleLiveInput('${item.key}', 'tours/index.html', 'link');">Tours Index</button>
              <button type="button" class="btn btn-danger btn-sm" onclick="PageEditor.clearTextField('${item.key}');" style="background: #EF4444; color: #FFFFFF; border: none;">🗑️ Clear Link</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.resetFieldToDefault('${item.key}', 'link')">🔄 Reset Default</button>
            </div>

            <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid #E2E8F0;">
              <button type="button" class="btn btn-gold btn-block" onclick="PageEditor.publish()">🚀 Publish Changes Live</button>
            </div>
          </div>
        `;
      }

      // --- E. RICH HTML / TEXTAREA ---
      else if (item.attrType === 'html') {
        html += `
          <div class="inspector-field-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="margin: 0; font-weight: 700; color: #0F172A;">📝 Rich Content Text (${this.activeLang.toUpperCase()})</label>
              ${isMissingTranslation ? `<button type="button" class="auto-translate-btn" onclick="PageEditor.autoTranslateCurrentField('${item.key}', '${this.escapeAttr(enVal)}')">✨ Auto-Translate from EN</button>` : ''}
            </div>
            <textarea class="form-control" id="fieldInput_${item.key}" rows="5" oninput="PageEditor.handleLiveInput('${item.key}', this.value, 'html')">${this.escapeHtml(this.decodeEntities(currentVal))}</textarea>
            
            <div style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
              <button type="button" class="btn btn-danger btn-sm" onclick="PageEditor.clearTextField('${item.key}')" style="background: #EF4444; color: #FFFFFF; border: none;">🗑️ Clear Text</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.resetFieldToDefault('${item.key}', 'html')">🔄 Reset Default</button>
            </div>

            <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid #E2E8F0;">
              <button type="button" class="btn btn-gold btn-block" onclick="PageEditor.publish()">🚀 Publish Changes Live</button>
            </div>
          </div>
        `;
      }

      // --- F. STANDARD PLAIN TEXT ---
      else {
        const isLong = (currentVal || '').length > 70;
        html += `
          <div class="inspector-field-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="margin: 0; font-weight: 700; color: #0F172A;">✏️ Text Content (${this.activeLang.toUpperCase()})</label>
              ${isMissingTranslation ? `<button type="button" class="auto-translate-btn" onclick="PageEditor.autoTranslateCurrentField('${item.key}', '${this.escapeAttr(enVal)}')">✨ Auto-Translate from EN</button>` : ''}
            </div>
            ${isLong ? `
              <textarea class="form-control" id="fieldInput_${item.key}" rows="4" oninput="PageEditor.handleLiveInput('${item.key}', this.value, 'text')">${this.escapeHtml(this.decodeEntities(currentVal))}</textarea>
            ` : `
              <input type="text" class="form-control" id="fieldInput_${item.key}" value="${this.escapeAttr(this.decodeEntities(currentVal))}" oninput="PageEditor.handleLiveInput('${item.key}', this.value, 'text')"/>
            `}
            
            <div style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
              <button type="button" class="btn btn-danger btn-sm" onclick="PageEditor.clearTextField('${item.key}')" style="background: #EF4444; color: #FFFFFF; border: none;">🗑️ Clear Text</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.resetFieldToDefault('${item.key}', 'text')">🔄 Reset Default</button>
            </div>

            <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid #E2E8F0;">
              <button type="button" class="btn btn-gold btn-block" onclick="PageEditor.publish()">🚀 Publish Changes Live</button>
            </div>
          </div>
        `;
      }

      // Technical Info Accordion (collapsed by default)
      html += `
        <details class="technical-info-toggle" style="margin-top: 16px;">
          <summary style="font-size: 0.8rem; color: #64748B; cursor: pointer;">⚙️ Technical Info &amp; Database Binding</summary>
          <div class="technical-info-box" style="margin-top: 6px; font-size: 0.78rem; background: #F8FAFC; padding: 10px; border-radius: 6px; border: 1px solid #E2E8F0;">
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

        // Merge current field values with dual-key mapping (both "img_1" and "destinations.img_1")
        const docName = this.activePageKey.split('/').pop() || '';
        for (const lang in this.currentFieldValues) {
          for (const key in this.currentFieldValues[lang]) {
            const val = this.currentFieldValues[lang][key];
            const cleanKey = key.includes('.') ? key.split('.').pop() : key;
            const prefixedKey = docName ? (docName + '.' + cleanKey) : cleanKey;

            if (lang === 'en') {
              payload[cleanKey] = val;
              payload[prefixedKey] = val;
              payload[key] = val;
            } else {
              if (!payload.translations) payload.translations = {};
              if (!payload.translations[lang]) payload.translations[lang] = {};
              payload.translations[lang][cleanKey] = val;
              payload.translations[lang][prefixedKey] = val;
              payload.translations[lang][key] = val;
            }
          }
        }

        // Store instant published document in localStorage for immediate cross-tab sync
        if (status === 'published') {
          try {
            localStorage.setItem('lotus_cms_published_' + this.activePageKey, JSON.stringify(payload));
            localStorage.setItem('lotus_cms_last_published', String(Date.now()));
            // Clear cached bundle
            localStorage.removeItem('lotus_cms_v3');
          } catch (e) {}
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
        window.AdminApp.openImagePicker(`fieldInput_${fieldKey}`, 'inspectorThumb', null, {
          onSelect: (url) => {
            const input = document.getElementById(`fieldInput_${fieldKey}`);
            if (input) {
              input.value = url;
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
            }
            this.handleLiveInput(fieldKey, url, 'image');
            const thumb = document.getElementById('inspectorThumb');
            if (thumb) thumb.src = this.resolvePreviewUrl(url);
          }
        });
      }
    },

    clearImageField(key, attrType) {
      const input = document.getElementById(`fieldInput_${key}`);
      if (input) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      this.handleLiveInput(key, '', attrType);
      const thumb = document.getElementById('inspectorThumb');
      if (thumb) thumb.src = '../assets/images/placeholder.png';
      if (window.AdminApp) {
        window.AdminApp.showToast('Image cleared. Click "Publish Changes Live" to save.', 'info');
      }
    },

    clearVideoField(key) {
      const input = document.getElementById(`fieldInput_${key}`);
      if (input) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      this.handleLiveInput(key, '', 'video');
      if (window.AdminApp) {
        window.AdminApp.showToast('Video removed. Click "Publish Changes Live" to save.', 'info');
      }
    },

    clearTextField(key) {
      const input = document.getElementById(`fieldInput_${key}`);
      if (input) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      this.handleLiveInput(key, '', 'text');
      if (window.AdminApp) {
        window.AdminApp.showToast('Content cleared. Click "Publish Changes Live" to save.', 'info');
      }
    },

    resetFieldToDefault(key, attrType) {
      let defaultVal = '';
      if (this.registry && Array.isArray(this.registry.bindings)) {
        const found = this.registry.bindings.find(b => b.fieldKey === key);
        if (found && found.defaultValue) defaultVal = found.defaultValue;
      }
      if (!defaultVal && this.selectedElement) {
        defaultVal = this.selectedElement.currentVal;
      }
      const input = document.getElementById(`fieldInput_${key}`);
      if (input) {
        input.value = defaultVal;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      this.handleLiveInput(key, defaultVal, attrType);
      const thumb = document.getElementById('inspectorThumb');
      if (thumb && (attrType === 'image' || attrType === 'bg-image')) {
        thumb.src = this.resolvePreviewUrl(defaultVal);
      }
      if (window.AdminApp) {
        window.AdminApp.showToast('Restored default content.', 'info');
      }
    },

    openCloudinaryForField(fieldKey, mediaType = 'image') {
      const isVid = mediaType === 'video';
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = isVid 
        ? 'video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov' 
        : 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.jpg,.jpeg,.png,.webp,.gif,.svg';
      fileInput.style.display = 'none';
      document.body.appendChild(fileInput);

      fileInput.onchange = async () => {
        const file = fileInput.files && fileInput.files[0];
        if (!file) {
          if (fileInput.parentNode) fileInput.remove();
          return;
        }

        try {
          const uploader = window.uploadToCloudinary || (window.AdminApp && window.AdminApp.uploadToCloudinary);
          if (!uploader) throw new Error('Cloudinary uploader module is not available.');
          
          const result = await uploader(file, { resourceType: isVid ? 'video' : 'auto' });
          const targetInput = document.getElementById('fieldInput_' + fieldKey);
          if (targetInput) {
            targetInput.value = result.secureUrl;
            targetInput.dispatchEvent(new Event('input', { bubbles: true }));
            targetInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
          this.handleLiveInput(fieldKey, result.secureUrl, isVid ? 'video' : 'image');
          const thumb = document.getElementById('inspectorThumb');
          if (thumb) thumb.src = result.secureUrl;
        } catch (err) {
          console.error('[PageEditor Upload Error]', err);
        } finally {
          if (fileInput.parentNode) fileInput.remove();
        }
      };

      fileInput.click();
    },

    openGlobalDoc(docKey, label) {
      this.activePageKey = docKey;
      this.activePageFile = 'index.html';
      this.selectedElement = null;
      this.currentFieldValues = {};

      if (window.AdminApp) {
        window.AdminApp.switchSection('page-editor');
      }

      const iframe = document.getElementById('visualCmsIframe');
      if (iframe) {
        iframe.src = '../index.html?edit=1';
      }

      this.fetchPageDoc(docKey).then(data => {
        this.activeDocData = data || {};
        this.renderGlobalInspector(docKey, label);
        this.markSaved();
      });
    },

    renderGlobalInspector(docKey, label) {
      const panel = document.getElementById('inspectorBody');
      if (!panel) return;

      if (docKey === 'siteGlobal/branding') {
        const logoSrc = (this.activeDocData && this.activeDocData['siteGlobal.branding.logo']) || 'assets/images/brand/logo-header.png';
        const heroVideoSrc = (this.activeDocData && this.activeDocData['home.hero_video']) || 'assets/videos/sigiriya-aerial.mp4';
        const heroBgSrc = (this.activeDocData && this.activeDocData['home.hero_bg']) || 'assets/images/home/hero-sigiriya-aerial-1.webp';

        panel.innerHTML = `
          <div class="inspector-card">
            <h4 style="font-size: 1.05rem; margin-bottom: 8px;">🌸 Branding & Global Media</h4>
            <p style="color: #64748B; font-size: 0.82rem; margin-bottom: 16px;">Configure brand logos, emblems, hero video and global background assets across all pages.</p>
            
            <div class="inspector-field-group">
              <label>Header Brand Logo / Emblem</label>
              <img src="${this.resolvePreviewUrl(logoSrc)}" class="inspector-thumb-preview" id="preview_branding_logo" style="max-height: 80px; object-fit: contain; background: #0B132B; padding: 6px; border-radius: 4px;"/>
              <div style="display: flex; gap: 8px; margin-top: 8px;">
                <input type="text" class="form-control" id="fieldInput_siteGlobal.branding.logo" value="${this.escapeAttr(logoSrc)}" oninput="PageEditor.handleLiveInput('siteGlobal.branding.logo', this.value, 'image')"/>
                <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('siteGlobal.branding.logo')">📁 Browse</button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForField('siteGlobal.branding.logo')">☁️ Upload</button>
              </div>
            </div>

            <div class="inspector-field-group" style="margin-top: 16px;">
              <label>Home Hero Background Video (MP4 / WebM)</label>
              <video src="${this.resolvePreviewUrl(heroVideoSrc)}" class="inspector-video-preview" controls muted autoplay loop style="max-height: 140px; width: 100%; border-radius: 6px;"></video>
              <div style="display: flex; gap: 8px; margin-top: 8px;">
                <input type="text" class="form-control" id="fieldInput_home.hero_video" value="${this.escapeAttr(heroVideoSrc)}" oninput="PageEditor.handleLiveInput('home.hero_video', this.value, 'video')"/>
                <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('home.hero_video')">📁 Browse</button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForField('home.hero_video', 'video')">🎬 Upload Video</button>
              </div>
            </div>

            <div class="inspector-field-group" style="margin-top: 16px;">
              <label>Home Hero Background Image (Fallback / Poster)</label>
              <img src="${this.resolvePreviewUrl(heroBgSrc)}" class="inspector-thumb-preview" id="preview_hero_bg" style="max-height: 120px;"/>
              <div style="display: flex; gap: 8px; margin-top: 8px;">
                <input type="text" class="form-control" id="fieldInput_home.hero_bg" value="${this.escapeAttr(heroBgSrc)}" oninput="PageEditor.handleLiveInput('home.hero_bg', this.value, 'bg-image')"/>
                <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('home.hero_bg')">📁 Browse</button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForField('home.hero_bg')">☁️ Upload</button>
              </div>
            </div>
          </div>
        `;
      } else {
        panel.innerHTML = `
          <div class="inspector-card">
            <h4>${label}</h4>
            <p style="color: #64748B; font-size: 0.85rem;">Global document components are editable via the live preview on the left. Click any element on the page with a dashed outline to edit its text, link, or media.</p>
          </div>
        `;
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
