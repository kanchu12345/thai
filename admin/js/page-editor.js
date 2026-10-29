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
      this.activeSliderIndex = 0;

      // Auto-detect slider images if not passed via postMessage
      if (!item.sliderImages || item.sliderImages.length === 0) {
        item.sliderImages = this.detectSliderImagesForItem(item);
      }

      if (item.sliderImages && item.sliderImages.length > 0) {
        const cleanKey = item.key && item.key.includes('.') ? item.key.split('.').pop() : item.key;
        const foundIdx = item.sliderImages.findIndex(s => s.key === item.key || (s.key && s.key.split('.').pop() === cleanKey));
        this.activeSliderIndex = foundIdx >= 0 ? foundIdx : 0;
      }

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

    detectSliderImagesForItem(item) {
      if (!item || !item.key) return null;

      const HOME_SLIDERS = [
        {
          keys: ['home.img_17', 'home.img_18', 'home.img_19'],
          alts: ['Sigiriya Citadel', 'Polonnaruwa Vatadage', 'Sacred Temple Heritage'],
          defaults: ['assets/images/cultural/sigiriya-1.webp', 'assets/images/cultural/polonnaruwa-gal-vihara-3.webp', 'assets/images/cultural/kandy-temple-of-tooth-4.webp']
        },
        {
          keys: ['home.img_20', 'home.img_21', 'home.img_22'],
          alts: ['Yala Wild Leopard & Elephants', 'Mirissa Whale Watching', 'Ocean Wildlife Waters'],
          defaults: ['assets/images/wildlife/yala-leopard-1.webp', 'assets/images/beach/mirissa-1.webp', 'assets/images/honeymoon/mirissa-sunset-2.webp']
        },
        {
          keys: ['home.img_23', 'home.img_24'],
          alts: ['Southern Sands Beach Luxury', 'Mirissa Sunset Cove'],
          defaults: ['assets/images/beach/mirissa-1.webp', 'assets/images/honeymoon/mirissa-sunset-2.webp']
        },
        {
          keys: ['home.img_25', 'home.img_26'],
          alts: ['Misty Hill Country Tea Estates', 'Demodara Nine Arch Bridge'],
          defaults: ['assets/images/hill-country/nuwara-eliya-tea-2.webp', 'assets/images/hill-country/nine-arches-bridge-1.webp']
        },
        {
          keys: ['home.img_27', 'home.img_28'],
          alts: ['Ayurvedic Restorative Sanctuary', 'Herbal Gardens & Serenity'],
          defaults: ['assets/images/cultural/kandy-temple-of-tooth-4.webp', 'assets/images/cultural/sigiriya-1.webp']
        },
        {
          keys: ['home.img_29', 'home.img_30'],
          alts: ['Romantic Plunge Pool Coastal Sunset', 'Highland Boutique Bungalow'],
          defaults: ['assets/images/honeymoon/mirissa-sunset-2.webp', 'assets/images/hill-country/nuwara-eliya-tea-2.webp']
        }
      ];

      // 1. Try DOM query into iframe if available
      try {
        const iframe = document.getElementById('visualCmsIframe');
        if (iframe && iframe.contentDocument) {
          const cleanKey = item.key.includes('.') ? item.key.split('.').pop() : item.key;
          const targetImg = iframe.contentDocument.querySelector(`[data-cms-img="${item.key}"], [data-cms-img="${cleanKey}"]`);
          if (targetImg) {
            const slider = targetImg.closest('.card-image-slider');
            if (slider) {
              const imgs = Array.from(slider.querySelectorAll('.slider-img, img[data-cms-img]'));
              if (imgs.length > 1) {
                return imgs.map((img, i) => {
                  const k = img.getAttribute('data-cms-img') || img.getAttribute('data-cms') || `${item.key}_${i}`;
                  return {
                    index: i,
                    key: k,
                    src: img.getAttribute('src') || '',
                    alt: img.getAttribute('alt') || `Slide ${i + 1}`,
                    isActive: img.classList.contains('active')
                  };
                });
              }
            }
          }
        }
      } catch (e) {
        console.warn('[PageEditor] iframe DOM inspect error:', e);
      }

      // 2. Fallback to known static slider definitions
      const cleanKey = item.key.includes('.') ? item.key.split('.').pop() : item.key;
      for (const group of HOME_SLIDERS) {
        if (group.keys.includes(item.key) || group.keys.some(k => k.split('.').pop() === cleanKey)) {
          return group.keys.map((k, i) => {
            return {
              index: i,
              key: k,
              src: this.getCurrentValue(k, group.defaults[i]),
              alt: group.alts[i],
              isActive: k === item.key || k.split('.').pop() === cleanKey
            };
          });
        }
      }

      return null;
    },

    switchSliderSlide(idx) {
      if (!this.selectedElement || !this.selectedElement.sliderImages) return;
      this.activeSliderIndex = idx;
      const slide = this.selectedElement.sliderImages[idx];
      if (!slide) return;

      // Update iframe to reveal this slide visually
      const iframe = document.getElementById('visualCmsIframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'lotus:activate-slide',
          key: slide.key,
          index: idx
        }, '*');
      }

      // Also directly update active class in iframe DOM if accessible
      try {
        if (iframe && iframe.contentDocument) {
          const cleanKey = slide.key.includes('.') ? slide.key.split('.').pop() : slide.key;
          const targetImg = iframe.contentDocument.querySelector(`[data-cms-img="${slide.key}"], [data-cms-img="${cleanKey}"]`);
          if (targetImg) {
            const parentSlider = targetImg.closest('.card-image-slider');
            if (parentSlider) {
              parentSlider.querySelectorAll('.slider-img, img').forEach(im => im.classList.remove('active'));
              parentSlider.querySelectorAll('.slider-dot').forEach(dt => dt.classList.remove('active'));
              targetImg.classList.add('active');
            }
          }
        }
      } catch (e) {}

      // Update inspector title
      const title = document.getElementById('inspectorTitle');
      if (title) {
        title.textContent = `Card Slider (Slide ${idx + 1} of ${this.selectedElement.sliderImages.length})`;
      }

      // Re-render form with updated active slide
      this.renderElementForm(this.selectedElement);
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
      if (item && item.sliderImages && item.sliderImages.length > 1) {
        const currentSlide = (this.activeSliderIndex || 0) + 1;
        return `Card Slider (Slide ${currentSlide} of ${item.sliderImages.length})`;
      }
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

      // Check if this element relates to a tour package
      let pkgSlug = item.packageSlug || null;
      if (this.activePageKey && this.activePageKey.startsWith('tourPackages/')) {
        pkgSlug = this.activePageKey.replace('tourPackages/', '');
      } else if (item.key && (item.key.includes('pkg_') || item.key.includes('package') || item.key.includes('tour'))) {
        if (item.key.includes('pkg_')) {
          const match = item.key.match(/pkg_([a-zA-Z0-9_-]+)/);
          if (match) pkgSlug = match[1].split('.')[0];
        }
      }
      if (pkgSlug) {
        html += `
          <div style="background: linear-gradient(135deg, #FFFBEB, #FEF3C7); border: 1px solid #FCD34D; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
            <div style="font-weight: 700; color: #92400E; font-size: 0.88rem; display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span>📦 Tour Package: ${this.escapeHtml(pkgSlug)}</span>
            </div>
            <p style="font-size: 0.78rem; color: #78350F; margin: 0 0 8px 0;">Edit full price, days, route, day-by-day itinerary, highlights, and gallery images.</p>
            <button type="button" class="btn btn-gold btn-sm btn-block" onclick="AdminApp.openPackageModal('${this.escapeAttr(pkgSlug)}')" style="font-weight: 700;">✏️ Edit Full Tour Package</button>
          </div>
        `;
      }

      // --- A. SPECIAL HERO SECTION INSPECTOR ---
      if (item.key.includes('hero') || item.sectionId === 'home') {
        html += this.renderHeroSpecialControls(item);
      }

      // --- B. IMAGE / BACKGROUND IMAGE INSPECTOR ---
      if (item.attrType === 'image' || item.attrType === 'bg-image') {
        const hasSlider = item.sliderImages && item.sliderImages.length > 1;
        let activeKey = item.key;
        let activeAlt = '';
        let imgSrc = currentVal || 'assets/images/sigiriya.jpg';

        if (hasSlider) {
          const currentSlideIdx = (typeof this.activeSliderIndex === 'number' && item.sliderImages[this.activeSliderIndex]) ? this.activeSliderIndex : 0;
          const currentSlide = item.sliderImages[currentSlideIdx] || item.sliderImages[0];
          activeKey = currentSlide.key;
          imgSrc = this.getCurrentValue(activeKey, currentSlide.src) || currentSlide.src;
          activeAlt = currentSlide.alt || '';

          // Render Slider Switcher Bar
          html += `
            <div style="background: linear-gradient(135deg, #F0FDFA 0%, #E6FFFA 100%); border: 1.5px solid #2DD4BF; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-weight: 700; font-size: 0.85rem; color: #0F766E;">🎠 Tour Card Carousel (${item.sliderImages.length} Slides)</span>
                <span class="badge" style="background: #CCFBF1; color: #115E59; font-size: 0.72rem; font-weight: 700;">Multi-Image</span>
              </div>
              <p style="font-size: 0.76rem; color: #134E4A; margin: 0 0 10px 0; line-height: 1.4;">
                This card rotates between multiple photos on the live site. Click a slide below to preview &amp; change each image:
              </p>
              
              <div style="display: grid; grid-template-columns: repeat(${item.sliderImages.length}, 1fr); gap: 6px;">
                ${item.sliderImages.map((slide, idx) => {
                  const isSelected = idx === currentSlideIdx;
                  const slideVal = this.getCurrentValue(slide.key, slide.src);
                  return `
                    <button type="button" 
                            onclick="PageEditor.switchSliderSlide(${idx})"
                            style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px 4px; border-radius: 6px; cursor: pointer; border: 2px solid ${isSelected ? '#0F766E' : '#99F6E4'}; background: ${isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.7)'}; box-shadow: ${isSelected ? '0 2px 6px rgba(15,118,110,0.25)' : 'none'}; transition: all 0.15s ease;">
                      <img id="sliderTabThumb_${idx}" src="${this.resolvePreviewUrl(slideVal)}" style="width: 100%; height: 42px; object-fit: cover; border-radius: 4px; border: 1px solid #E2E8F0;" onerror="this.src='../assets/images/placeholder.png'"/>
                      <span style="font-size: 0.75rem; font-weight: 700; color: ${isSelected ? '#0F766E' : '#475569'};">Slide ${idx + 1}</span>
                      <span style="font-size: 0.65rem; color: #64748B; overflow: hidden; text-overflow: ellipsis; max-width: 100%; white-space: nowrap;">${this.escapeHtml(slide.key.split('.').pop())}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }

        html += `
          <div class="inspector-field-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="margin: 0; font-weight: 700; color: #0F172A;">${hasSlider ? `Slide ${(this.activeSliderIndex || 0) + 1} Preview &amp; Media` : (item.isHeroBanner ? '🎯 Hero Banner Preview &amp; Media' : '🖼️ Image Preview &amp; Source')}</label>
              <span class="badge" style="font-size: 0.72rem; background: #E2E8F0; color: #334155;">${this.escapeHtml(activeKey)}</span>
            </div>
            
            <div style="position: relative; border-radius: 8px; overflow: hidden; background: #0B132B; text-align: center; border: 1px solid #CBD5E1; margin-bottom: 10px;">
              <img src="${this.resolvePreviewUrl(imgSrc)}" class="inspector-thumb-preview" id="inspectorThumb" style="max-height: 200px; width: 100%; object-fit: cover; display: block;" onerror="this.src='../assets/images/placeholder.png'"/>
            </div>

            <label style="font-size: 0.82rem; font-weight: 600; color: #475569;">Image CDN URL / Relative Path</label>
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
              <input type="text" class="form-control" id="fieldInput_${activeKey}" value="${this.escapeAttr(imgSrc)}" placeholder="Image path or Cloudinary URL" oninput="PageEditor.handleLiveInput('${activeKey}', this.value, '${item.attrType}')"/>
            </div>

            <!-- Action buttons: Upload, Browse, Delete/Remove, Reset -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForField('${activeKey}')" title="Upload a new photo directly to Cloudinary CDN">☁️ Upload New</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('${activeKey}')" title="Choose from previously uploaded media">📁 Media Library</button>
              <button type="button" class="btn btn-danger btn-sm" onclick="PageEditor.clearImageField('${activeKey}', '${item.attrType}')" style="background: #EF4444; color: #FFFFFF; border: none;" title="Remove this image">🗑️ Remove Image</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.resetFieldToDefault('${activeKey}', '${item.attrType}')" title="Restore original default image">🔄 Reset Default</button>
            </div>
          </div>

          <div class="inspector-field-group">
            <label style="font-weight: 600; font-size: 0.82rem; color: #475569;">Image Alt Text (SEO &amp; Accessibility)</label>
            <input type="text" class="form-control" id="altInput_${activeKey}" value="${this.escapeAttr(activeAlt || 'Lotus Ceylon Luxury Tours')}" placeholder="Descriptive label for search engines" oninput="PageEditor.handleLiveInput('${activeKey}_alt', this.value, 'alt')"/>
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

    getHeroBindingForActivePage() {
      const docName = (this.activePageKey || '').split('/').pop();
      const pageFile = (this.activePageFile || '').toLowerCase();

      if (docName === 'home' || pageFile === 'index.html') {
        const val = this.getCurrentValue('hero.image', (this.activeDocData && this.activeDocData['hero.image']) || 'assets/images/home/hero-sigiriya-aerial-1.webp');
        const videoVal = this.getCurrentValue('hero.video', (this.activeDocData && this.activeDocData['hero.video']) || 'assets/videos/hero-banner.mp4');
        return {
          key: 'hero.image',
          videoKey: 'hero.video',
          attrType: 'image',
          currentVal: val,
          videoVal: videoVal,
          label: 'Home Page Hero Banner',
          isHome: true
        };
      }

      const keyMap = {
        'destinations': { key: 'destinations.hero_bg', label: 'Destinations Hero Banner', defaultVal: 'assets/images/cultural/kandy-temple-of-tooth-4.webp' },
        'about': { key: 'about.hero_bg', label: 'About Us Hero Banner', defaultVal: 'assets/images/about/hospitality-scenes-1.webp' },
        'contact': { key: 'contact.hero_bg', label: 'Contact Us Hero Banner', defaultVal: 'assets/images/contact/negombo-lagoon-1.webp' },
        'experiences': { key: 'experiences.hero_bg', label: 'Experiences Hero Banner', defaultVal: 'assets/images/cultural/kandy-temple-of-tooth-4.webp' },
        'gallery': { key: 'gallery.hero_bg', label: 'Gallery Hero Banner', defaultVal: 'assets/images/cultural/kandy-temple-of-tooth-4.webp' },
        'reviews': { key: 'reviews.hero_bg', label: 'Reviews Hero Banner', defaultVal: 'assets/images/cultural/polonnaruwa-gal-vihara-3.webp' },
        'blog': { key: 'blog.hero_bg', label: 'Blog & Editorial Hero Banner', defaultVal: 'assets/images/cultural/sigiriya-1.webp' },
        'tours': { key: 'tours.hero_bg', label: 'All Tours Hero Banner', defaultVal: 'assets/images/cultural/sigiriya-1.webp' },
        'toursindex': { key: 'tours.hero_bg', label: 'All Tours Hero Banner', defaultVal: 'assets/images/cultural/sigiriya-1.webp' },
        'beach': { key: 'beach.hero_bg', label: 'Pristine Beaches Hero Banner', defaultVal: 'assets/images/beach/mirissa-1.webp' },
        'cultural': { key: 'cultural.hero_bg', label: 'Cultural Heritage Hero Banner', defaultVal: 'assets/images/cultural/sigiriya-1.webp' },
        'wildlife': { key: 'wildlife.hero_bg', label: 'Wildlife Safaris Hero Banner', defaultVal: 'assets/images/wildlife/yala-leopard-1.webp' },
        'hillcountry': { key: 'hillCountry.hero_bg', label: 'Hill Country & Tea Hero Banner', defaultVal: 'assets/images/hill-country/nuwara-eliya-tea-2.webp' },
        'buddhistanctours': { key: 'buddhistHeritage.hero_bg', label: 'Buddhist Heritage Hero Banner', defaultVal: 'assets/images/buddhist-heritage/ruwanwelisaya-2.webp' },
        'buddhistheritage': { key: 'buddhistHeritage.hero_bg', label: 'Buddhist Heritage Hero Banner', defaultVal: 'assets/images/buddhist-heritage/ruwanwelisaya-2.webp' },
        'ayurvedic': { key: 'ayurvedic.hero_bg', label: 'Ayurvedic Healing Hero Banner', defaultVal: 'assets/images/cultural/kandy-temple-of-tooth-4.webp' },
        'honeymoon': { key: 'honeymoon.hero_bg', label: 'Honeymoon Romance Hero Banner', defaultVal: 'assets/images/honeymoon/seaside-villa-1.webp' },
        'family': { key: 'family.hero_bg', label: 'Family Discovery Hero Banner', defaultVal: 'assets/images/hill-country/nine-arches-bridge-1.webp' },
        'adventure': { key: 'adventure.hero_bg', label: 'Active Adventure Hero Banner', defaultVal: 'assets/images/adventure/kitulgala-rafting-1.webp' },
        'golf': { key: 'golf.hero_bg', label: 'Championship Golf Hero Banner', defaultVal: 'assets/images/hill-country/nuwara-eliya-tea-2.webp' },
        'ramayana': { key: 'ramayana.hero_bg', label: 'Ramayana Heritage Hero Banner', defaultVal: 'assets/images/cultural/polonnaruwa-gal-vihara-3.webp' }
      };

      const cleanDoc = docName.toLowerCase().replace(/[^a-z]/g, '');
      const mapped = keyMap[cleanDoc] || {
        key: `${docName}.hero_bg`,
        label: `${this.getFriendlySectionName(docName)} Hero Banner`,
        defaultVal: 'assets/images/cultural/sigiriya-1.webp'
      };

      const val = this.getCurrentValue(mapped.key, (this.activeDocData && this.activeDocData[mapped.key]) || mapped.defaultVal);
      return {
        key: mapped.key,
        attrType: 'bg-image',
        currentVal: val,
        label: mapped.label,
        defaultVal: mapped.defaultVal,
        isHome: false
      };
    },

    openImageEditor(key, label, sectionName, defaultUrl, attrType = 'image') {
      const isHeroBanner = key.includes('hero') || attrType === 'bg-image' || key === 'siteGlobal.branding.cta_bg';
      const currentVal = this.getCurrentValue(key, (this.activeDocData && this.activeDocData[key]) || defaultUrl || '');
      
      const item = {
        key: key,
        attrType: attrType,
        currentVal: currentVal,
        defaultVal: defaultUrl,
        label: label,
        sectionId: sectionName,
        isHeroBanner: isHeroBanner
      };

      if (key === 'hero.image') {
        item.isHome = true;
        item.videoKey = 'hero.video';
        item.videoVal = this.getCurrentValue('hero.video', (this.activeDocData && this.activeDocData['hero.video']) || 'assets/videos/hero-banner.mp4');
      }

      this.selectElement(item);

      // Scroll iframe to element
      const iframe = document.getElementById('visualCmsIframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'lotus:scroll-to-key', key: key }, '*');
      }
    },

    openHeroBannerEditor() {
      const hero = this.getHeroBindingForActivePage();
      this.openImageEditor(hero.key, hero.label, '🎯 Top Hero Banner', hero.defaultVal, hero.attrType);
    },

    jumpToSection(secId) {
      this.scrollToSection(secId);
      // Automatically open the primary image for this section if one exists
      const images = this.getSectionImagesForActivePage();
      const match = images.find(img => img.sectionId.toLowerCase().includes(secId.toLowerCase()) || img.key.toLowerCase().includes(secId.toLowerCase()));
      if (match) {
        this.openImageEditor(match.key, match.label, match.sectionName, match.defaultUrl, match.attrType);
      }
    },

    getSectionImagesForActivePage() {
      const docName = (this.activePageKey || '').split('/').pop();
      const pageFile = (this.activePageFile || '').toLowerCase();

      // Shared Sacred CTA Banner (bottom banner on almost every page)
      const ctaBg = {
        key: 'siteGlobal.branding.cta_bg',
        label: 'Sacred CTA Bottom Banner (Plan Your Sacred Journey)',
        sectionName: '🕊️ Sacred Bottom Banner',
        sectionId: 'cta',
        defaultUrl: 'assets/images/cultural/sigiriya-1.webp',
        attrType: 'bg-image'
      };

      if (docName === 'home' || pageFile === 'index.html') {
        return [
          {
            key: 'hero.image',
            label: 'Home Hero Masthead (Photo & Video)',
            sectionName: '🎯 Hero Masthead',
            sectionId: 'home',
            defaultUrl: 'assets/images/home/hero-sigiriya-aerial-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_1',
            label: 'About & Our Story: Main Sigiriya Photo',
            sectionName: '🏛️ About Us / Our Story',
            sectionId: 'about',
            defaultUrl: 'assets/images/home/hero-sigiriya-aerial-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_2',
            label: 'About & Our Story: Sacred Stupa Floating Photo',
            sectionName: '🏛️ About Us / Our Story',
            sectionId: 'about',
            defaultUrl: 'assets/images/buddhist-heritage/ruwanwelisaya-2.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_3',
            label: 'Tour Category: Luxury Beach Holidays',
            sectionName: '🐆 Tour Categories Showcase',
            sectionId: 'categories',
            defaultUrl: 'assets/images/beach/mirissa-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_4',
            label: 'Tour Category: Cultural & Heritage Tours',
            sectionName: '🐆 Tour Categories Showcase',
            sectionId: 'categories',
            defaultUrl: 'assets/images/cultural/sigiriya-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_5',
            label: 'Tour Category: Luxury Wildlife & Safari',
            sectionName: '🐆 Tour Categories Showcase',
            sectionId: 'categories',
            defaultUrl: 'assets/images/wildlife/yala-leopard-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_6',
            label: 'Tour Category: Hill Country & Tea Estates',
            sectionName: '🐆 Tour Categories Showcase',
            sectionId: 'categories',
            defaultUrl: 'assets/images/hill-country/nuwara-eliya-tea-2.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_7',
            label: 'Tour Category: Active Adventure Expeditions',
            sectionName: '🐆 Tour Categories Showcase',
            sectionId: 'categories',
            defaultUrl: 'assets/images/adventure/kitulgala-rafting-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_8',
            label: 'Tour Category: Ayurveda & Wellness Retreats',
            sectionName: '🐆 Tour Categories Showcase',
            sectionId: 'categories',
            defaultUrl: 'assets/images/cultural/kandy-temple-of-tooth-4.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_9',
            label: 'Tour Category: Luxury Honeymoon & Romance',
            sectionName: '🐆 Tour Categories Showcase',
            sectionId: 'categories',
            defaultUrl: 'assets/images/honeymoon/mirissa-sunset-2.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_10',
            label: 'Tour Category: Family Holiday Packages',
            sectionName: '🐆 Tour Categories Showcase',
            sectionId: 'categories',
            defaultUrl: 'assets/images/hill-country/nine-arches-bridge-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_11',
            label: 'Tour Category: Sacred Ramayana Heritage',
            sectionName: '🐆 Tour Categories Showcase',
            sectionId: 'categories',
            defaultUrl: 'assets/images/cultural/polonnaruwa-gal-vihara-3.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_12',
            label: 'Tour Category: Ceylon Golf Holidays',
            sectionName: '🐆 Tour Categories Showcase',
            sectionId: 'categories',
            defaultUrl: 'assets/images/hill-country/nuwara-eliya-tea-2.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_13',
            label: 'Destination: Anuradhapura Sacred Stupas',
            sectionName: '📍 Destinations Showcase',
            sectionId: 'destinations',
            defaultUrl: 'assets/images/buddhist-heritage/ruwanwelisaya-2.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_14',
            label: 'Destination: Temple of the Sacred Tooth Kandy',
            sectionName: '📍 Destinations Showcase',
            sectionId: 'destinations',
            defaultUrl: 'assets/images/cultural/kandy-temple-of-tooth-4.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_15',
            label: 'Destination: Sigiriya Rock Citadel',
            sectionName: '📍 Destinations Showcase',
            sectionId: 'destinations',
            defaultUrl: 'assets/images/cultural/sigiriya-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_16',
            label: 'Destination: Galle Dutch Fort Lighthouse',
            sectionName: '📍 Destinations Showcase',
            sectionId: 'destinations',
            defaultUrl: 'assets/images/colonial/galle-fort-lighthouse-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_31',
            label: 'Bespoke Planner: Main Coastal Villa Photo',
            sectionName: '✨ Bespoke Journey Planner',
            sectionId: 'bespoke',
            defaultUrl: 'assets/images/beach/mirissa-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_32',
            label: 'Bespoke Planner: Highland Tea Trails Overlap Photo',
            sectionName: '✨ Bespoke Journey Planner',
            sectionId: 'bespoke',
            defaultUrl: 'assets/images/hill-country/nuwara-eliya-tea-2.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_33',
            label: 'Signature Experience: Artisan Sacred Heritage',
            sectionName: '🌿 Signature Pillars / Experiences',
            sectionId: 'experiences',
            defaultUrl: 'assets/images/cultural/sigiriya-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_34',
            label: 'Signature Experience: Wildlife Safari Odyssey',
            sectionName: '🌿 Signature Pillars / Experiences',
            sectionId: 'experiences',
            defaultUrl: 'assets/images/wildlife/yala-leopard-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_35',
            label: 'Signature Experience: Ayu Wellness Sanctuary',
            sectionName: '🌿 Signature Pillars / Experiences',
            sectionId: 'experiences',
            defaultUrl: 'assets/images/hill-country/nuwara-eliya-tea-2.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_38',
            label: 'FAQ & Travel Planning: Feature Photo',
            sectionName: '❓ Travel Planning FAQs',
            sectionId: 'faq',
            defaultUrl: 'assets/images/about/hospitality-scenes-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_39',
            label: 'Editorial & News: Main Feature Article',
            sectionName: '📰 Travel Insights & News',
            sectionId: 'news',
            defaultUrl: 'assets/images/adventure/kitulgala-rafting-1.webp',
            attrType: 'image'
          },
          ctaBg
        ];
      }

      if (docName === 'destinations' || pageFile.includes('destinations')) {
        const destList = [
          { key: 'destinations.hero_bg', label: 'Destinations Hero Banner', sectionName: '🎯 Hero Banner', sectionId: 'hero', defaultUrl: 'assets/images/cultural/kandy-temple-of-tooth-4.webp', attrType: 'bg-image' },
          { key: 'destinations.img_1', label: 'Anuradhapura Sacred Stupas', sectionName: '📍 Sacred Pilgrimage', sectionId: 'destinations', defaultUrl: 'assets/images/cultural/kandy-temple-of-tooth-4.webp', attrType: 'image' },
          { key: 'destinations.img_2', label: 'Mihintale Sacred Cradle', sectionName: '📍 Sacred Pilgrimage', sectionId: 'destinations', defaultUrl: 'assets/images/cultural/dambulla-cave-temple-2.webp', attrType: 'image' },
          { key: 'destinations.img_3', label: 'Kandy Temple of Tooth', sectionName: '📍 Sacred Pilgrimage', sectionId: 'destinations', defaultUrl: 'assets/images/cultural/sigiriya-1.webp', attrType: 'image' },
          { key: 'destinations.img_4', label: 'Dambulla Golden Cave Temple', sectionName: '📍 Sacred Pilgrimage', sectionId: 'destinations', defaultUrl: 'assets/images/cultural/polonnaruwa-gal-vihara-3.webp', attrType: 'image' },
          { key: 'destinations.img_5', label: 'Polonnaruwa Ancient Citadel', sectionName: '📍 Sacred Pilgrimage', sectionId: 'destinations', defaultUrl: 'assets/images/cultural/polonnaruwa-gal-vihara-3.webp', attrType: 'image' },
          { key: 'destinations.img_6', label: 'Kelaniya Raja Maha Vihara', sectionName: '📍 Sacred Pilgrimage', sectionId: 'destinations', defaultUrl: 'assets/tours/cultural/hero.jpg', attrType: 'image' },
          { key: 'destinations.img_7', label: "Sri Pada (Adam's Peak)", sectionName: '📍 Sacred Pilgrimage', sectionId: 'destinations', defaultUrl: 'assets/images/hill-country/nuwara-eliya-tea-2.webp', attrType: 'image' },
          { key: 'destinations.img_8', label: 'Kataragama Sacred Shrine', sectionName: '📍 Sacred Pilgrimage', sectionId: 'destinations', defaultUrl: 'assets/images/cultural/sigiriya-1.webp', attrType: 'image' },
          { key: 'destinations.img_9', label: 'Sigiriya Rock Fortress', sectionName: '🏛️ Cultural Heritage', sectionId: 'destinations', defaultUrl: 'assets/images/cultural/sigiriya-1.webp', attrType: 'image' },
          { key: 'destinations.img_10', label: 'Galle Dutch Fort', sectionName: '🏛️ Cultural Heritage', sectionId: 'destinations', defaultUrl: 'assets/images/beach/mirissa-1.webp', attrType: 'image' },
          { key: 'destinations.img_11', label: 'Colombo & Kelani Valley', sectionName: '🏛️ Cultural Heritage', sectionId: 'destinations', defaultUrl: 'assets/images/about/hospitality-scenes-1.webp', attrType: 'image' },
          { key: 'destinations.img_12', label: 'Nuwara Eliya Highlands', sectionName: '🍵 Highland Tea Country', sectionId: 'destinations', defaultUrl: 'assets/images/hill-country/nuwara-eliya-tea-2.webp', attrType: 'image' },
          { key: 'destinations.img_13', label: 'Ella & Nine Arch Bridge', sectionName: '🍵 Highland Tea Country', sectionId: 'destinations', defaultUrl: 'assets/images/hill-country/nine-arches-bridge-1.webp', attrType: 'image' },
          { key: 'destinations.img_14', label: "Horton Plains & World's End", sectionName: '🍵 Highland Tea Country', sectionId: 'destinations', defaultUrl: 'assets/images/wildlife/sinharaja-rainforest-5.webp', attrType: 'image' },
          { key: 'destinations.img_15', label: "Haputale & Lipton's Seat", sectionName: '🍵 Highland Tea Country', sectionId: 'destinations', defaultUrl: 'assets/images/hill-country/nuwara-eliya-tea-2.webp', attrType: 'image' },
          { key: 'destinations.img_16', label: 'Yala National Park Safari', sectionName: '🐆 Wildlife Safari', sectionId: 'destinations', defaultUrl: 'assets/images/wildlife/yala-leopard-1.webp', attrType: 'image' },
          { key: 'destinations.img_17', label: 'Minneriya Elephant Gathering', sectionName: '🐆 Wildlife Safari', sectionId: 'destinations', defaultUrl: 'assets/images/wildlife/minneriya-elephant-gathering-2.webp', attrType: 'image' },
          { key: 'destinations.img_18', label: 'Udawalawe National Park', sectionName: '🐆 Wildlife Safari', sectionId: 'destinations', defaultUrl: 'assets/tours/wildlife/hero.jpg', attrType: 'image' },
          { key: 'destinations.img_19', label: 'Wilpattu Leopard Wilderness', sectionName: '🐆 Wildlife Safari', sectionId: 'destinations', defaultUrl: 'assets/images/wildlife/yala-leopard-1.webp', attrType: 'image' },
          { key: 'destinations.img_20', label: 'Mirissa & Weligama Bay', sectionName: '🏖️ Pristine Coasts', sectionId: 'destinations', defaultUrl: 'assets/images/honeymoon/mirissa-sunset-2.webp', attrType: 'image' },
          { key: 'destinations.img_21', label: 'Bentota & Beruwala Sands', sectionName: '🏖️ Pristine Coasts', sectionId: 'destinations', defaultUrl: 'assets/images/beach/mirissa-1.webp', attrType: 'image' },
          { key: 'destinations.img_22', label: 'Trincomalee & Nilaveli', sectionName: '🏖️ Pristine Coasts', sectionId: 'destinations', defaultUrl: 'assets/images/beach/pasikudah-5.webp', attrType: 'image' },
          { key: 'destinations.img_23', label: 'Arugam Bay Surf Haven', sectionName: '🏖️ Pristine Coasts', sectionId: 'destinations', defaultUrl: 'assets/images/adventure/kitulgala-rafting-1.webp', attrType: 'image' },
          { key: 'destinations.img_24', label: 'Negombo Beach & Lagoon', sectionName: '🏖️ Pristine Coasts', sectionId: 'destinations', defaultUrl: 'assets/tours/beach/hero.jpg', attrType: 'image' },
          ctaBg
        ];
        return destList;
      }

      if (docName === 'about' || pageFile.includes('about')) {
        return [
          { key: 'about.hero_bg', label: 'About Us Hero Banner', sectionName: '🎯 Hero Banner', sectionId: 'hero', defaultUrl: 'assets/images/about/hospitality-scenes-1.webp', attrType: 'bg-image' },
          { key: 'about.img_1', label: 'Our Story: Sacred Heritage Feature Photo', sectionName: '🏛️ Our Story', sectionId: 'about', defaultUrl: 'assets/images/buddhist-heritage/ruwanwelisaya-2.webp', attrType: 'image' },
          { key: 'about.img_2', label: 'Our Story: Philosophy & Hospitality Photo', sectionName: '🏛️ Our Story', sectionId: 'about', defaultUrl: 'assets/images/about/hospitality-scenes-1.webp', attrType: 'image' },
          { key: 'about.img_3', label: 'Leadership: Director & Founders Photo', sectionName: '👥 Team & Leadership', sectionId: 'team', defaultUrl: 'assets/images/about/hospitality-scenes-1.webp', attrType: 'image' },
          ctaBg
        ];
      }

      if (docName === 'contact' || pageFile.includes('contact')) {
        return [
          { key: 'contact.hero_bg', label: 'Contact Us Hero Banner', sectionName: '🎯 Hero Banner', sectionId: 'hero', defaultUrl: 'assets/images/contact/negombo-lagoon-1.webp', attrType: 'bg-image' },
          { key: 'contact.img_1', label: 'Ceylon Sanctuary / Office Photo', sectionName: '📍 Contact Office', sectionId: 'contact', defaultUrl: 'assets/images/about/hospitality-scenes-1.webp', attrType: 'image' },
          ctaBg
        ];
      }

      if (docName === 'experiences' || pageFile.includes('experiences')) {
        return [
          { key: 'experiences.hero_bg', label: 'Experiences Hero Banner', sectionName: '🎯 Hero Banner', sectionId: 'hero', defaultUrl: 'assets/images/cultural/kandy-temple-of-tooth-4.webp', attrType: 'bg-image' },
          { key: 'experiences.img_1', label: 'Artisan Sacred Heritage', sectionName: '🌿 Signature Pillar 1', sectionId: 'exp', defaultUrl: 'assets/images/cultural/sigiriya-1.webp', attrType: 'image' },
          { key: 'experiences.img_2', label: 'Lotus Ayu Holistic Rejuvenation', sectionName: '🌿 Signature Pillar 2', sectionId: 'exp', defaultUrl: 'assets/images/honeymoon/seaside-villa-1.webp', attrType: 'image' },
          { key: 'experiences.img_3', label: 'Nature Odyssey Wildlife Safari', sectionName: '🌿 Signature Pillar 3', sectionId: 'exp', defaultUrl: 'assets/images/wildlife/yala-leopard-1.webp', attrType: 'image' },
          { key: 'experiences.img_4', label: 'Temple of the Tooth Evening Chanting', sectionName: '🌿 Experience Showcase', sectionId: 'exp', defaultUrl: 'assets/images/cultural/kandy-temple-of-tooth-4.webp', attrType: 'image' },
          { key: 'experiences.img_5', label: 'Dawn Meditation at Jaya Sri Maha Bodhi', sectionName: '🌿 Experience Showcase', sectionId: 'exp', defaultUrl: 'assets/images/buddhist-heritage/jaya-sri-maha-bodhi-1.webp', attrType: 'image' },
          { key: 'experiences.img_6', label: 'Private Leopard Tracking in Yala', sectionName: '🌿 Experience Showcase', sectionId: 'exp', defaultUrl: 'assets/images/wildlife/yala-leopard-1.webp', attrType: 'image' },
          { key: 'experiences.img_7', label: 'The Great Elephant Gathering Minneriya', sectionName: '🌿 Experience Showcase', sectionId: 'exp', defaultUrl: 'assets/images/wildlife/minneriya-elephant-gathering-2.webp', attrType: 'image' },
          { key: 'experiences.img_8', label: 'Vaidya Ayurvedic Consultation', sectionName: '🌿 Experience Showcase', sectionId: 'exp', defaultUrl: 'assets/images/ayurveda/herbal-treatment-1.webp', attrType: 'image' },
          { key: 'experiences.img_9', label: 'Demodara Nine Arch Scenic Train', sectionName: '🌿 Experience Showcase', sectionId: 'exp', defaultUrl: 'assets/images/hill-country/nine-arches-bridge-1.webp', attrType: 'image' },
          { key: 'experiences.img_10', label: 'Highland Tea Tasting Experience', sectionName: '🌿 Experience Showcase', sectionId: 'exp', defaultUrl: 'assets/images/hill-country/nuwara-eliya-tea-2.webp', attrType: 'image' },
          { key: 'experiences.img_11', label: 'Blue Whale Watching in Mirissa', sectionName: '🌿 Experience Showcase', sectionId: 'exp', defaultUrl: 'assets/images/wildlife/mirissa-blue-whale-4.webp', attrType: 'image' },
          { key: 'experiences.img_12', label: 'Geoffrey Bawa Lunuganga Estate', sectionName: '🌿 Experience Showcase', sectionId: 'exp', defaultUrl: 'assets/images/beach/mirissa-1.webp', attrType: 'image' },
          { key: 'experiences.img_13', label: 'Traditional Mask Carving Guild', sectionName: '🌿 Experience Showcase', sectionId: 'exp', defaultUrl: 'assets/images/cultural/galle-fort-5.webp', attrType: 'image' },
          { key: 'experiences.img_14', label: 'Ritigala Forest Meditation Walk', sectionName: '🌿 Experience Showcase', sectionId: 'exp', defaultUrl: 'assets/images/wildlife/sinharaja-rainforest-5.webp', attrType: 'image' },
          { key: 'experiences.img_15', label: 'Madu Ganga River Cinnamon Safari', sectionName: '🌿 Experience Showcase', sectionId: 'exp', defaultUrl: 'assets/images/beach/mirissa-1.webp', attrType: 'image' },
          ctaBg
        ];
      }

      // Default fallback for any category page, tours, reviews, blog, gallery
      const hero = this.getHeroBindingForActivePage();
      return [
        {
          key: hero.key,
          label: hero.label,
          sectionName: '🎯 Hero Banner',
          sectionId: 'hero',
          defaultUrl: hero.defaultVal,
          attrType: hero.attrType
        },
        ctaBg
      ];
    },

    renderEmptyState() {
      const body = document.getElementById('inspectorBody');
      if (!body) return;

      const hero = this.getHeroBindingForActivePage();
      const currentHeroImg = this.getCurrentValue(hero.key, (this.activeDocData && this.activeDocData[hero.key]) || hero.defaultVal);
      const sectionImages = this.getSectionImagesForActivePage();

      let sectionImagesHtml = '';
      sectionImages.forEach((img, idx) => {
        const val = this.getCurrentValue(img.key, (this.activeDocData && this.activeDocData[img.key]) || img.defaultUrl || '');
        const previewUrl = this.resolvePreviewUrl(val);
        sectionImagesHtml += `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">
              <img src="${previewUrl}" style="width: 48px; height: 38px; object-fit: cover; border-radius: 6px; border: 1px solid #CBD5E1; flex-shrink: 0;" onerror="this.src='../assets/images/placeholder.png'"/>
              <div style="min-width: 0;">
                <div style="font-size: 0.72rem; font-weight: 700; color: #64748B; text-transform: uppercase;">${this.escapeHtml(img.sectionName)}</div>
                <div style="font-size: 0.82rem; font-weight: 600; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${this.escapeAttr(img.label)}">${this.escapeHtml(img.label)}</div>
              </div>
            </div>
            <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openImageEditor('${img.key}', '${this.escapeAttr(img.label)}', '${this.escapeAttr(img.sectionName)}', '${this.escapeAttr(img.defaultUrl)}', '${img.attrType}')" style="margin-left: 8px; white-space: nowrap; font-size: 0.78rem; font-weight: 600; padding: 4px 10px;">
              ✏️ Edit
            </button>
          </div>
        `;
      });

      body.innerHTML = `
        <div class="inspector-empty-state">
          <!-- 1. Tour Packages Quick Access -->
          <div style="background: linear-gradient(135deg, #FFFBEB, #FEF3C7); border: 1px solid #FCD34D; border-radius: 8px; padding: 12px; margin-bottom: 14px; text-align: center;">
            <div style="font-size: 0.88rem; color: #92400E; margin-bottom: 4px; font-weight: 700;">📦 Tour Packages Manager</div>
            <p style="font-size: 0.78rem; color: #78350F; margin: 0 0 10px 0;">Add new tours, edit prices, days, itineraries, photo galleries, and highlights.</p>
            <button type="button" class="btn btn-gold btn-sm btn-block" onclick="AdminApp.switchSection('packages')" style="font-weight: 700;">
              📦 Open 29 Tour Packages Table
            </button>
          </div>

          <!-- 2. Primary Page Hero Banner Card -->
          <div style="background: linear-gradient(135deg, #0F172A, #1E293B); border: 1px solid #D4AF37; border-radius: 8px; padding: 14px; margin-bottom: 16px; color: #FFFFFF; text-align: left; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <strong style="color: #D4AF37; font-size: 0.95rem;">🎯 Top Hero Banner Media</strong>
              <span class="badge" style="background: rgba(212, 175, 55, 0.25); color: #F8E5DD; font-size: 0.72rem;">Photo &amp; Video</span>
            </div>
            <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
              <img src="${this.resolvePreviewUrl(currentHeroImg)}" style="width: 64px; height: 42px; object-fit: cover; border-radius: 6px; border: 1px solid #D4AF37;" onerror="this.src='../assets/images/placeholder.png'"/>
              <div style="font-size: 0.78rem; color: #E2E8F0; line-height: 1.3;">
                <div>${this.escapeHtml(hero.label)}</div>
                <span class="badge" style="background: #334155; color: #94A3B8; font-size: 0.68rem;">${this.escapeHtml(hero.key)}</span>
              </div>
            </div>
            <button type="button" class="btn btn-gold btn-sm btn-block" onclick="PageEditor.openHeroBannerEditor()" style="font-weight: 700;">
              🎯 Edit / Change Hero Banner &amp; Video
            </button>
          </div>

          <!-- 3. All Section Showcase & Hero Images on this Page -->
          <div style="margin-bottom: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <div style="font-size: 0.88rem; font-weight: 700; color: #0F172A; display: flex; align-items: center; gap: 6px;">
                <span>🖼️ Section Images &amp; Banners</span>
              </div>
              <span class="badge" style="background: #E2E8F0; color: #334155; font-size: 0.72rem;">${sectionImages.length} Photos</span>
            </div>
            <p style="font-size: 0.78rem; color: #64748B; margin: 0 0 10px 0;">Click "Edit" on any section below to change, upload, or remove its showcase photo:</p>
            <div style="max-height: 380px; overflow-y: auto; padding-right: 4px;">
              ${sectionImagesHtml}
            </div>
          </div>

          <!-- 4. Click Preview Reminder -->
          <div style="padding: 12px; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 8px; text-align: center; margin-bottom: 16px;">
            <div style="font-size: 1.4rem; margin-bottom: 4px;">👆</div>
            <div style="font-weight: 700; font-size: 0.84rem; color: #1E293B;">Click Anything on Left Preview</div>
            <p style="font-size: 0.76rem; color: #64748B; margin: 0;">Click directly on any photo, headline, or text on the page to customize it live.</p>
          </div>

          <!-- 5. Quick Jump to Page Sections -->
          <div class="quick-jump-title">Quick Jump &amp; Edit Page Sections</div>
          <div class="quick-jump-grid">
            <div class="quick-jump-card" onclick="PageEditor.openHeroBannerEditor()" style="border: 1px solid #D4AF37; background: #FFFDF8;">
              <span class="qj-icon">🎯</span>
              <span class="qj-label" style="font-weight: 700; color: #92400E;">Hero Banner</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.jumpToSection('about')">
              <span class="qj-icon">🏛️</span>
              <span class="qj-label">About &amp; Story</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.jumpToSection('why-us')">
              <span class="qj-icon">💎</span>
              <span class="qj-label">Why Choose Us</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.jumpToSection('categories')">
              <span class="qj-icon">🐆</span>
              <span class="qj-label">Tour Categories</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.jumpToSection('destinations')">
              <span class="qj-icon">📍</span>
              <span class="qj-label">Destinations</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.handlePackagesJump()">
              <span class="qj-icon">📦</span>
              <span class="qj-label">Tour Packages</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.jumpToSection('bespoke')">
              <span class="qj-icon">✨</span>
              <span class="qj-label">Bespoke Planner</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.jumpToSection('testimonials')">
              <span class="qj-icon">💬</span>
              <span class="qj-label">Reviews &amp; Trust</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.jumpToSection('faq')">
              <span class="qj-icon">❓</span>
              <span class="qj-label">FAQs</span>
            </div>
            <div class="quick-jump-card" onclick="PageEditor.openImageEditor('siteGlobal.branding.cta_bg', 'Sacred Bottom CTA Banner', '🕊️ Sacred CTA Banner', 'assets/images/cultural/sigiriya-1.webp', 'bg-image')">
              <span class="qj-icon">🕊️</span>
              <span class="qj-label">Sacred CTA</span>
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

      // Sync active slide if currently inside slider
      if (this.selectedElement && this.selectedElement.sliderImages && (attrType === 'image' || attrType === 'bg-image')) {
        const matchedIdx = this.selectedElement.sliderImages.findIndex(s => s.key === key || (key.includes('.') && s.key === key.split('.').pop()));
        if (matchedIdx >= 0) {
          this.selectedElement.sliderImages[matchedIdx].src = val;
          const tabThumb = document.getElementById(`sliderTabThumb_${matchedIdx}`);
          if (tabThumb) tabThumb.src = this.resolvePreviewUrl(val);
        }
      }
    },

    handlePackagesJump() {
      if (this.activePageKey === 'siteContent/home') {
        this.scrollToSection('packages');
      } else if (window.AdminApp) {
        window.AdminApp.switchSection('packages');
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
        iframe.src = `../${this.activePageFile}?edit=1&v=20261029_slider_v5`;
      }

      // Fetch doc from Firestore
      this.activeDocData = await this.fetchPageDoc(docKey);
      this.clearSelectedElement();
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
      if (!defaultVal && this.selectedElement && this.selectedElement.sliderImages) {
        const slide = this.selectedElement.sliderImages.find(s => s.key === key || (key.includes('.') && s.key === key.split('.').pop()));
        if (slide) defaultVal = slide.src;
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
        iframe.src = '../index.html?edit=1&v=20261029_slider_v5';
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

    
    openSeoModal() {
      const iframe = document.getElementById('visualCmsIframe');
      let titleVal = '';
      let descVal = '';
      let imgVal = '';
      if (iframe && iframe.contentDocument) {
        try {
          titleVal = iframe.contentDocument.title || '';
          const metaDesc = iframe.contentDocument.querySelector('meta[name="description"]');
          if (metaDesc) descVal = metaDesc.getAttribute('content') || '';
          const ogImg = iframe.contentDocument.querySelector('meta[property="og:image"]');
          if (ogImg) imgVal = ogImg.getAttribute('content') || '';
        } catch(e) {}
      }
      const titleInput = document.getElementById('seoPageTitle');
      const descInput = document.getElementById('seoPageDesc');
      const imgInput = document.getElementById('seoPageImage');
      if (titleInput) titleInput.value = titleVal;
      if (descInput) descInput.value = descVal;
      if (imgInput) imgInput.value = imgVal;
      if (window.AdminApp && typeof window.AdminApp.openModal === 'function') {
        window.AdminApp.openModal('seoModal');
      }
    },

    saveSeoSettings() {
      const titleVal = document.getElementById('seoPageTitle')?.value || '';
      const descVal = document.getElementById('seoPageDesc')?.value || '';
      const imgVal = document.getElementById('seoPageImage')?.value || '';

      const iframe = document.getElementById('visualCmsIframe');
      if (iframe && iframe.contentDocument) {
        try {
          iframe.contentDocument.title = titleVal;
          const metaDesc = iframe.contentDocument.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.setAttribute('content', descVal);
          const ogImg = iframe.contentDocument.querySelector('meta[property="og:image"]');
          if (ogImg) ogImg.setAttribute('content', imgVal);
        } catch(e) {}
      }

      if (this.activePageKey) {
        this.pendingChanges = this.pendingChanges || {};
        this.pendingChanges[`${this.activePageKey}.seo.title`] = titleVal;
        this.pendingChanges[`${this.activePageKey}.seo.description`] = descVal;
        if (imgVal) this.pendingChanges[`${this.activePageKey}.seo.image`] = imgVal;
      }
      this.hasUnsavedChanges = true;
      if (typeof this.updateSaveIndicators === 'function') {
        this.updateSaveIndicators();
      }

      if (window.AdminApp && typeof window.AdminApp.closeModal === 'function') {
        window.AdminApp.closeModal('seoModal');
        window.AdminApp.showToast('Page SEO settings saved to draft! Click "Publish Live" to apply.', 'success');
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
