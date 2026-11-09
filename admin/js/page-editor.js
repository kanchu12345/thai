/*
 * © 2026 Infinite Design. All rights reserved.
 * Built for Lotus Ceylon International Tours & Services (Pvt) Ltd.
 * Unauthorized removal of attribution does not transfer ownership of this code.
 * https://infiniteweb.dev/
 */
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
    { code: 'es', label: '🇪🇸 Español' },
    { code: 'vi', label: '🇻🇳 Tiếng Việt' }
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
      this.registry = { totalUniqueBindings: 0, entries: [] };

      // 1. Setup PostMessage Listener
      window.addEventListener('message', this.handleIframeMessage.bind(this));

      // 2. Bind Topbar Controls
      this.bindTopbarEvents();

      // Check URL parameters for direct page editing
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const editPage = urlParams.get('editPage');
        const editFile = urlParams.get('file');
        if (editPage && editFile) {
          this.activePageKey = editPage;
          this.activePageFile = editFile;
          const pageSelect = document.getElementById('visualPageDropdown');
          if (pageSelect) {
            pageSelect.value = `${editPage}|${editFile}`;
          }
        }
      } catch (e) {}

      // 3. Initial load for Home page doc
      await this.fetchPageDoc(this.activePageKey);

      // 4. Render default empty state / quick jumps
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
      if (event.data.type === 'lotus:navigate-page') {
        this.openLinkedHref(event.data.href);
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
          keys: ['home.real_exp_bg_1', 'home.real_exp_bg_2', 'home.real_exp_bg_3', 'home.real_exp_bg_4'],
          alts: ['Ella Misty Highlands (Panoramic)', 'Sigiriya Rock Citadel (Panoramic)', 'Kaudulla Wild Elephants Safari (Panoramic)', 'Scenic Ceylon Highlands Train (Panoramic)'],
          defaults: [
            'assets/images/experiences/real-experiences-ella-rock-large.webp',
            'assets/images/home/hero-sigiriya-aerial-1.webp',
            'assets/images/wildlife/minneriya-elephant-gathering-2.webp',
            'assets/images/family/scenic-train-ride-2.webp'
          ]
        },
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
        iframe.contentWindow.postMessage({
          type: 'lotus:set-wre-slide',
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
      if (key && key.includes('team_img_')) {
        const num = key.replace(/.*team_img_/, '');
        return `👥 Leadership / Global Representative #${num}`;
      }
      if (key && key.includes('real_exp_bg_')) {
        const slideNum = key.replace(/.*real_exp_bg_/, '');
        return `✨ Real Experiences (Slide ${slideNum} of 4)`;
      }
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
      if (attrType === 'success-stories' || key === 'home.success_stories_card') return '👑 Our Success Stories (Card Slider)';
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

    PACKAGE_FILE_MAP: {
      'island-adrenaline-rapids-expedition': 'tours/adventure/island-adrenaline-rapids-expedition/index.html',
      'wild-peaks-trails-surf-safari': 'tours/adventure/wild-peaks-trails-surf-safari/index.html',
      'lotus-ayu-holistic-rejuvenation': 'tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html',
      'sacred-serenity-forest-meditation-retreat': 'tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html',
      'pristine-seaboard-odyssey': 'tours/beach/pristine-seaboard-odyssey/index.html',
      'southern-sands-serenade': 'tours/beach/southern-sands-serenade/index.html',
      'turquoise-eastern-sanctuary': 'tours/beach/turquoise-eastern-sanctuary/index.html',
      'forest-hermitages-mindful-ceylon': 'tours/buddhist-heritage/forest-hermitages-mindful-ceylon/index.html',
      'the-sacred-bodhi-ancient-kingdoms': 'tours/buddhist-heritage/the-sacred-bodhi-ancient-kingdoms/index.html',
      'the-sacred-tooth-monastic-sanctuaries': 'tours/buddhist-heritage/the-sacred-tooth-monastic-sanctuaries/index.html',
      'royal-kingdoms-sacred-temples': 'tours/cultural/royal-kingdoms-sacred-temples/index.html',
      'the-sacred-lotus-triangle': 'tours/cultural/the-sacred-lotus-triangle/index.html',
      'three-millennia-of-living-heritage': 'tours/cultural/three-millennia-of-living-heritage/index.html',
      'island-wonder-multi-gen-family-discovery': 'tours/family/island-wonder-multi-gen-family-discovery/index.html',
      'the-grand-ceylon-family-adventure': 'tours/family/the-grand-ceylon-family-adventure/index.html',
      'wild-safari-coastal-family-holiday': 'tours/family/wild-safari-coastal-family-holiday/index.html',
      'highland-greens-coastal-links-championship': 'tours/golf/highland-greens-coastal-links-championship/index.html',
      'the-grand-ceylon-masters-golf-odyssey': 'tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html',
      'the-royal-ceylon-fairways-tour': 'tours/golf/the-royal-ceylon-fairways-tour/index.html',
      'ceylon-tea-trails-colonial-grandeur': 'tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html',
      'highland-wilderness-cascading-waterfalls': 'tours/hill-country/highland-wilderness-cascading-waterfalls/index.html',
      'misty-peaks-scenic-railways-expedition': 'tours/hill-country/misty-peaks-scenic-railways-expedition/index.html',
      'enchanted-ceylon-romantic-hideaway': 'tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html',
      'pure-serenade-coastal-highland-romance': 'tours/honeymoon/pure-serenade-coastal-highland-romance/index.html',
      'sacred-ramayana-heritage-trail': 'tours/ramayana/sacred-ramayana-heritage-trail/index.html',
      'the-epic-ramayana-chronicle-pilgrimage': 'tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html',
      'the-sri-lanka-big-five-expedition': 'tours/wildlife/the-sri-lanka-big-five-expedition/index.html',
      'untamed-biosphere-rainforest-odyssey': 'tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html',
      'wild-ceylon-predator-elephant-trail': 'tours/wildlife/wild-ceylon-predator-elephant-trail/index.html'
    },

    DESTINATION_FILE_MAP: {
      'anuradhapura': 'destinations/anuradhapura/index.html',
      'arugam-bay': 'destinations/arugam-bay/index.html',
      'bentota-beruwala': 'destinations/bentota-beruwala/index.html',
      'bentota': 'destinations/bentota-beruwala/index.html',
      'colombo-kelani-valley': 'destinations/colombo-kelani-valley/index.html',
      'colombo': 'destinations/colombo-kelani-valley/index.html',
      'dambulla': 'destinations/dambulla/index.html',
      'ella-demodara': 'destinations/ella-demodara/index.html',
      'ella': 'destinations/ella-demodara/index.html',
      'galle-dutch-fort': 'destinations/galle-dutch-fort/index.html',
      'galle': 'destinations/galle-dutch-fort/index.html',
      'haputale-lipton-s-seat': 'destinations/haputale-lipton-s-seat/index.html',
      'haputale': 'destinations/haputale-lipton-s-seat/index.html',
      'horton-plains-world-s-end': 'destinations/horton-plains-world-s-end/index.html',
      'horton-plains': 'destinations/horton-plains-world-s-end/index.html',
      'kandy': 'destinations/kandy/index.html',
      'kataragama': 'destinations/kataragama/index.html',
      'kelaniya': 'destinations/kelaniya/index.html',
      'mihintale': 'destinations/mihintale/index.html',
      'minneriya-national-park': 'destinations/minneriya-national-park/index.html',
      'minneriya': 'destinations/minneriya-national-park/index.html',
      'mirissa-weligama': 'destinations/mirissa-weligama/index.html',
      'mirissa': 'destinations/mirissa-weligama/index.html',
      'negombo-beach-lagoon': 'destinations/negombo-beach-lagoon/index.html',
      'negombo': 'destinations/negombo-beach-lagoon/index.html',
      'nuwara-eliya': 'destinations/nuwara-eliya/index.html',
      'polonnaruwa': 'destinations/polonnaruwa/index.html',
      'sigiriya-rock-citadel': 'destinations/sigiriya-rock-citadel/index.html',
      'sigiriya': 'destinations/sigiriya-rock-citadel/index.html',
      'sri-pada': 'destinations/sri-pada/index.html',
      'trincomalee-nilaveli': 'destinations/trincomalee-nilaveli/index.html',
      'trincomalee': 'destinations/trincomalee-nilaveli/index.html',
      'udawalawe-national-park': 'destinations/udawalawe-national-park/index.html',
      'udawalawe': 'destinations/udawalawe-national-park/index.html',
      'wilpattu-national-park': 'destinations/wilpattu-national-park/index.html',
      'wilpattu': 'destinations/wilpattu-national-park/index.html',
      'yala-national-park': 'destinations/yala-national-park/index.html',
      'yala': 'destinations/yala-national-park/index.html'
    },

    filterSidebarPackages(query) {
      const q = (query || '').toLowerCase().trim();
      const list = document.getElementById('sidebarPackagesList');
      if (!list) return;
      const links = list.querySelectorAll('.sidebar-pkg-link');
      const headers = list.querySelectorAll('.sidebar-cat-header');
      links.forEach(link => {
        const title = (link.getAttribute('data-pkg-title') || link.textContent || '').toLowerCase();
        if (!q || title.includes(q)) {
          link.style.display = 'flex';
        } else {
          link.style.display = 'none';
        }
      });
      // Show/hide category headers if all children are hidden
      headers.forEach(h => {
        let sibling = h.nextElementSibling;
        let anyVisible = false;
        while (sibling && sibling.classList.contains('sidebar-pkg-link')) {
          if (sibling.style.display !== 'none') anyVisible = true;
          sibling = sibling.nextElementSibling;
        }
        h.style.display = (!q || anyVisible) ? 'block' : 'none';
      });
    },

    openTourDetailPage(slug) {
      if (!slug) return;
      const cleanSlug = slug.toLowerCase().trim();
      const filePath = this.PACKAGE_FILE_MAP[cleanSlug] || `tours/cultural/${cleanSlug}/index.html`;
      this.openPage(`tourPackages/${cleanSlug}`, filePath);
    },

    openDestinationPage(slug) {
      if (!slug) return;
      const cleanSlug = slug.toLowerCase().trim();
      const filePath = this.DESTINATION_FILE_MAP[cleanSlug] || `destinations/${cleanSlug}/index.html`;
      this.openPage(`destinations/${cleanSlug}`, filePath);
    },

    openCategoryPage(slug) {
      if (!slug) return;
      const cleanSlug = slug.toLowerCase().trim();
      const filePath = `tours/${cleanSlug}/index.html`;
      this.openPage(`tourCategories/${cleanSlug}`, filePath);
    },

    openLinkedHref(href) {
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      let clean = href.replace(/\.\.\//g, '').replace(/^\//, '').split('?')[0].split('#')[0];
      if (clean.endsWith('/')) clean += 'index.html';
      if (!clean.endsWith('.html') && clean.includes('/')) clean += '/index.html';

      const pageSelect = document.getElementById('visualPageDropdown');
      if (pageSelect) {
        for (let i = 0; i < pageSelect.options.length; i++) {
          const opt = pageSelect.options[i];
          const [docK, fileP] = opt.value.split('|');
          if (fileP === clean || fileP.endsWith(clean) || clean.endsWith(fileP)) {
            this.handlePageSelectChange(opt.value);
            return;
          }
        }
      }
    },

    setInspectorTab(tab) {
      this.activeInspectorTab = tab;
      if (this.selectedElement) {
        this.renderElementForm(this.selectedElement);
      }
    },

    toggleElementVisibility(key, isVisible) {
      if (!this.selectedElement) return;
      this.selectedElement.isHidden = !isVisible;
      this.postIframeMessage({
        type: 'lotus:toggle-visibility',
        key: key,
        hidden: !isVisible
      });
      this.handleLiveInput(key + '_hidden', !isVisible ? 'true' : 'false', 'hidden');
      if (window.AdminApp) {
        window.AdminApp.showToast(isVisible ? 'Element set to visible on live site' : 'Element hidden from live site', 'info');
      }
      this.renderElementForm(this.selectedElement);
    },

    convertElementTag(newTag) {
      if (!this.selectedElement) return;
      this.postIframeMessage({
        type: 'lotus:convert-tag',
        newTag: newTag
      });
      this.selectedElement.tagName = newTag.toLowerCase();
      if (newTag === 'p') this.selectedElement.attrType = 'text';
      this.renderElementForm(this.selectedElement);
      if (window.AdminApp) {
        window.AdminApp.showToast(`Converted element to <${newTag.toUpperCase()}>`, 'info');
      }
    },

    updateElementStyle(prop, val) {
      if (!this.selectedElement) return;
      this.postIframeMessage({
        type: 'lotus:update-style',
        prop: prop,
        value: val
      });
      this.handleLiveInput(`${this.selectedElement.key}_style_${prop}`, val, 'style');
    },

    addElementBelow(tag) {
      const autoKey = 'block_' + tag + '_' + Date.now().toString(36);
      this.postIframeMessage({
        type: 'lotus:add-element',
        tag: tag,
        key: autoKey
      });
      this.activeInspectorTab = 'edit';
      if (window.AdminApp) {
        window.AdminApp.showToast(`Added new <${tag.toUpperCase()}> block below!`, 'success');
      }
    },

    deleteSelectedElement() {
      if (!this.selectedElement) return;
      const key = this.selectedElement.key;
      this.postIframeMessage({
        type: 'lotus:delete-element',
        key: key
      });
      this.handleLiveInput(key + '_hidden', 'true', 'hidden');
      if (window.AdminApp) {
        window.AdminApp.showToast('Element removed from page view.', 'info');
      }
      this.clearSelectedElement();
    },

    clearSelectedContent() {
      if (!this.selectedElement) return;
      const key = this.selectedElement.key;
      const type = this.selectedElement.attrType;
      if (type === 'image' || type === 'bg-image') {
        this.handleLiveInput(key, '', type);
        const input = document.getElementById(`fieldInput_${key}`);
        if (input) input.value = '';
        const thumb = document.getElementById('inspectorThumb');
        if (thumb) thumb.src = '../assets/images/placeholder.png';
      } else {
        this.handleLiveInput(key, '', type);
        const input = document.getElementById(`fieldInput_${key}`);
        if (input) input.value = '';
      }
      if (window.AdminApp) {
        window.AdminApp.showToast('Content cleared.', 'info');
      }
    },

    resetSelectedElement() {
      if (!this.selectedElement) return;
      const key = this.selectedElement.key;
      const type = this.selectedElement.attrType;
      this.resetFieldToDefault(key, type);
      this.renderElementForm(this.selectedElement);
      if (window.AdminApp) {
        window.AdminApp.showToast('Reset to default values.', 'info');
      }
    },

    postIframeMessage(msg) {
      const iframe = document.getElementById('visualCmsIframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(msg, '*');
      }
    },

    renderElementForm(item) {
      const body = document.getElementById('inspectorBody');
      if (!body) return;

      this.activeInspectorTab = this.activeInspectorTab || 'edit';

      const currentVal = this.getCurrentValue(item.key, item.currentVal);
      const isEnglish = this.activeLang === 'en';
      const enVal = this.getEnglishValue(item.key, item.currentVal);
      const isMissingTranslation = !isEnglish && (!currentVal || currentVal === enVal);
      const isHidden = item.isHidden || this.getCurrentValue(item.key + '_hidden', '') === 'true';

      // Protected Design Credit Lock (Part 4)
      if (item.isCreditLocked || (item.currentVal && item.currentVal.includes('Infinite Design')) || item.key === 'siteGlobal.branding.developerUrl') {
        body.innerHTML = `
          <div style="padding: 24px 18px; text-align: center;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: #EFF6FF; border: 2px solid #BFDBFE; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #1D4ED8;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
            </div>
            <h4 style="color: #002B49; font-size: 1.05rem; font-weight: 700; margin-bottom: 8px;">Design Attribution Protected</h4>
            <p style="font-size: 0.85rem; color: #475569; line-height: 1.5; margin-bottom: 16px;">
              <strong>"Website Designed &amp; Developed by Infinite Design"</strong><br>
              This developer attribution credit is permanently locked in code and cannot be edited, hidden, or deleted from the admin panel.
            </p>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; font-size: 0.8rem; color: #64748B; text-align: left;">
              <div>• Single source of truth in code (locked constant)</div>
              <div>• Automated tamper protection active on all public pages</div>
              <div>• Non-removable by admin or page editor</div>
            </div>
          </div>
        `;
        return;
      }

      // Linked Dynamic Content Lock (Part 2)
      if (item.isLinked) {
        body.innerHTML = `
          <div style="padding: 24px 18px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
              <div style="width: 44px; height: 44px; border-radius: 8px; background: #FEF3C7; color: #92400E; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
              </div>
              <div>
                <h4 style="color: #002B49; font-size: 1rem; font-weight: 700; margin: 0;">Linked Dynamic Content</h4>
                <div style="font-size: 0.78rem; color: #64748B;">Source: ${this.escapeHtml(item.linkedSource || 'Source Catalog')}</div>
              </div>
            </div>

            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; margin-bottom: 18px;">
              <p style="font-size: 0.84rem; color: #334155; line-height: 1.5; margin: 0 0 10px 0;">
                This item is part of a centrally managed collection. To maintain data consistency across all pages, linked items cannot be edited directly inside the visual page preview.
              </p>
              <div style="font-size: 0.8rem; font-weight: 600; color: #002B49;">
                Edit this item in: <span style="color: #D4AF37;">${this.escapeHtml(item.linkedSource || 'Source Manager')}</span>
              </div>
            </div>

            <button type="button" class="btn btn-primary btn-block" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 16px; font-weight: 700;" onclick="AdminApp.navigateToTab('${item.targetTab || 'home'}', '${item.targetSubtab || ''}'); ${item.modalOpenFn || ''}">
              <span>Edit this in ${this.escapeHtml(item.linkedSource || 'Source Manager')} &rarr;</span>
            </button>
          </div>
        `;
        return;
      }

      // Special Success Stories Card Inspector
      if (item.attrType === 'success-stories' || item.key === 'home.success_stories_card') {
        body.innerHTML = this.renderSuccessStoriesInspector(item);
        return;
      }

      let html = '';

      // --- 1. INSPECTOR TABS: [ ✏️ Edit ] [ ➕ Add Block ] [ 🗑️ Delete ] ---
      html += `
        <div class="inspector-tabs">
          <button type="button" class="inspector-tab-btn tab-edit ${this.activeInspectorTab === 'edit' ? 'active' : ''}" onclick="PageEditor.setInspectorTab('edit')">
            <span>✏️ Edit Content</span>
          </button>
          <button type="button" class="inspector-tab-btn tab-add ${this.activeInspectorTab === 'add' ? 'active' : ''}" onclick="PageEditor.setInspectorTab('add')">
            <span>➕ Add Element</span>
          </button>
          <button type="button" class="inspector-tab-btn tab-delete ${this.activeInspectorTab === 'delete' ? 'active' : ''}" onclick="PageEditor.setInspectorTab('delete')">
            <span>🗑️ Delete / Actions</span>
          </button>
        </div>
      `;

      // --- 2. LIVE VISIBILITY SWITCH BAR ---
      html += `
        <div class="visibility-switch-bar">
          <div class="visibility-label-wrap">
            <span style="font-size: 0.8rem; font-weight: 700; color: ${isHidden ? '#EF4444' : '#10B981'};">
              ${isHidden ? '👁️‍🗨️ Hidden on Website' : '👁️ Visible on Website'}
            </span>
            <span class="badge" style="font-size: 0.72rem; background: #E2E8F0; color: #334155;">&lt;${(item.tagName || 'div').toUpperCase()}&gt;</span>
          </div>
          <label class="switch-toggle" title="Toggle visibility of this element on the live website">
            <input type="checkbox" id="elementVisibilityToggle" ${!isHidden ? 'checked' : ''} onchange="PageEditor.toggleElementVisibility('${this.escapeAttr(item.key)}', this.checked)">
            <span class="switch-slider"></span>
          </label>
        </div>
      `;

      // ==========================================
      // TAB 2: ADD ELEMENT BELOW
      // ==========================================
      if (this.activeInspectorTab === 'add') {
        html += `
          <div class="inspector-field-group">
            <div style="margin-bottom: 12px;">
              <strong style="display: block; font-size: 0.9rem; color: #0F172A; margin-bottom: 4px;">Insert New Element Below</strong>
              <p style="font-size: 0.78rem; color: #64748B; margin: 0;">Add a new block directly underneath the currently selected &lt;${(item.tagName || 'element').toUpperCase()}&gt;:</p>
            </div>

            <button type="button" class="add-element-card" onclick="PageEditor.addElementBelow('h3')">
              <div class="add-element-icon"><strong>H3</strong></div>
              <div class="add-element-info">
                <strong>Add Heading (H3)</strong>
                <small>Section or subsection title</small>
              </div>
            </button>

            <button type="button" class="add-element-card" onclick="PageEditor.addElementBelow('p')">
              <div class="add-element-icon"><span>¶</span></div>
              <div class="add-element-info">
                <strong>Add Paragraph Text</strong>
                <small>Standard narrative or description text block</small>
              </div>
            </button>

            <button type="button" class="add-element-card" onclick="PageEditor.addElementBelow('img')">
              <div class="add-element-icon"><span>🖼️</span></div>
              <div class="add-element-info">
                <strong>Add Image / Photo</strong>
                <small>Responsive picture or editorial visual</small>
              </div>
            </button>

            <button type="button" class="add-element-card" onclick="PageEditor.addElementBelow('a')">
              <div class="add-element-icon"><span>🔗</span></div>
              <div class="add-element-info">
                <strong>Add Call-to-Action Button</strong>
                <small>Golden action button with destination link</small>
              </div>
            </button>

            <button type="button" class="add-element-card" onclick="PageEditor.addElementBelow('li')">
              <div class="add-element-icon"><span>•</span></div>
              <div class="add-element-info">
                <strong>Add Bullet List Item</strong>
                <small>Feature highlight or itinerary bullet point</small>
              </div>
            </button>
          </div>
        `;
      }

      // ==========================================
      // TAB 3: DELETE / RESET / ACTIONS
      // ==========================================
      else if (this.activeInspectorTab === 'delete') {
        html += `
          <div class="inspector-field-group">
            <div class="action-danger-card">
              <h4><span>⚠️</span> Remove or Hide Element</h4>
              <p>Hiding or deleting this element will remove it from the page in real time. You can publish changes or reset back to default at any time.</p>
              
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <button type="button" class="btn btn-danger btn-block" onclick="PageEditor.deleteSelectedElement()" style="background: #DC2626; color: #FFFFFF; font-weight: 700; border: none; padding: 10px;">
                  🗑️ Delete This Element
                </button>
                <button type="button" class="btn btn-outline btn-block" onclick="PageEditor.clearSelectedContent()">
                  🧹 Clear Content Text / Image
                </button>
                <button type="button" class="btn btn-outline btn-block" onclick="PageEditor.resetSelectedElement()">
                  🔄 Restore Original Seeded Value
                </button>
              </div>
            </div>
          </div>
        `;
      }

      // ==========================================
      // TAB 1: EDIT CONTENT (Default)
      // ==========================================
      else {
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

        // 1. Tour Package Action Card
        if (pkgSlug) {
          html += `
            <div style="background: linear-gradient(135deg, #EFF6FF, #DBEAFE); border: 1px solid #93C5FD; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
              <div style="font-weight: 700; color: #1E40AF; font-size: 0.88rem; display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span>📦 Tour Package: ${this.escapeHtml(pkgSlug)}</span>
              </div>
              <p style="font-size: 0.78rem; color: #1E3A8A; margin: 0 0 10px 0;">Directly open this tour's standalone page or edit its full fields.</p>
              <div style="display: flex; gap: 8px;">
                <button type="button" class="btn btn-primary btn-sm" style="flex: 1;" onclick="PageEditor.openTourDetailPage('${this.escapeAttr(pkgSlug)}')">🚀 Open & Edit Page</button>
                <button type="button" class="btn btn-outline btn-sm" onclick="AdminApp.openPackageModal('${this.escapeAttr(pkgSlug)}')">📝 Edit in Manager</button>
              </div>
            </div>
          `;
        }

        // 2. Destination Action Card
        const destSlug = item.destinationSlug || null;
        if (destSlug) {
          html += `
            <div style="background: linear-gradient(135deg, #F0FDF4, #DCFCE7); border: 1px solid #86EFAC; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
              <div style="font-weight: 700; color: #166534; font-size: 0.88rem; margin-bottom: 4px;">
                <span>📍 Destination: ${this.escapeHtml(destSlug)}</span>
              </div>
              <p style="font-size: 0.78rem; color: #14532D; margin: 0 0 8px 0;">Edit lead text, sights badges, essence narrative, and tailor-made box.</p>
              <button type="button" class="btn btn-primary btn-sm btn-block" onclick="PageEditor.openDestinationPage('${this.escapeAttr(destSlug)}')">🚀 Open & Edit Destination Page</button>
            </div>
          `;
        }

        // 3. General Linked Href Card (if clicked an anchor)
        if (item.linkedHref && !pkgSlug && !destSlug && !item.linkedHref.startsWith('#')) {
          html += `
            <div style="margin-bottom: 14px; background: #FAFBFD; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px;">
              <div style="font-size: 0.78rem; color: #64748B; margin-bottom: 6px;">Target URL: <code style="color: #002B49;">${this.escapeHtml(item.linkedHref)}</code></div>
              <button type="button" class="btn btn-outline btn-sm btn-block" onclick="PageEditor.openLinkedHref('${this.escapeAttr(item.linkedHref)}')">↗ Switch Editor to Linked Page</button>
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
          let activeAlt = item.altText || '';
          let imgSrc = currentVal || 'assets/images/sigiriya.jpg';

          if (hasSlider) {
            const activeIdx = Math.min(this.activeSliderIndex || 0, item.sliderImages.length - 1);
            const activeSlide = item.sliderImages[activeIdx] || item.sliderImages[0];
            activeKey = activeSlide.key;
            activeAlt = activeSlide.alt || '';
            imgSrc = this.getCurrentValue(activeKey, activeSlide.src || imgSrc);

            html += `
              <div class="slider-tabs-container" style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px; margin-bottom: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.8rem; font-weight: 700; color: #002B49;">📸 Carousel Slides (${item.sliderImages.length} Photos)</span>
                  <span class="badge" style="font-size: 0.72rem; background: #E2E8F0; color: #002B49;">Slide ${activeIdx + 1} of ${item.sliderImages.length}</span>
                </div>
                <div class="slider-thumbnails-row" style="display: grid; grid-template-columns: repeat(${item.sliderImages.length}, 1fr); gap: 6px;">
                  ${item.sliderImages.map((slide, idx) => {
                    const slideVal = this.getCurrentValue(slide.key, slide.src);
                    const isCur = idx === activeIdx;
                    return `
                      <button type="button" class="slider-thumb-btn ${isCur ? 'active' : ''}" onclick="PageEditor.switchSliderSlide(${idx}, '${this.escapeAttr(slide.key)}')" style="padding: 3px; border: 2px solid ${isCur ? '#D4AF37' : '#E2E8F0'}; border-radius: 6px; background: #FFFFFF; cursor: pointer; transition: all 0.15s ease;" title="${this.escapeAttr(slide.alt || ('Slide ' + (idx + 1)))}">
                        <img src="${this.resolvePreviewUrl(slideVal)}" id="sliderTabThumb_${idx}" style="width: 100%; height: 42px; object-fit: cover; border-radius: 4px; display: block;" onerror="this.src='../assets/images/placeholder.png'"/>
                        <span style="display: block; font-size: 0.68rem; font-weight: 600; color: ${isCur ? '#002B49' : '#64748B'}; margin-top: 2px; text-overflow: ellipsis; overflow: hidden; max-width: 100%; white-space: nowrap;">${this.escapeHtml(slide.key.split('.').pop())}</span>
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
              <small style="display: block; font-size: 0.72rem; color: #64748B; margin-top: 4px;">Recommended: 30-100 characters for optimal image SEO.</small>
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
              
              <div style="display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
                <span style="font-size: 0.74rem; font-weight: 600; color: #64748B; width: 100%;">Quick Presets:</span>
                <button type="button" class="pill-ctrl-btn" onclick="document.getElementById('fieldInput_${item.key}').value='#inquiry'; PageEditor.handleLiveInput('${item.key}', '#inquiry', 'link');">#inquiry</button>
                <button type="button" class="pill-ctrl-btn" onclick="document.getElementById('fieldInput_${item.key}').value='inquiry-detailed.html'; PageEditor.handleLiveInput('${item.key}', 'inquiry-detailed.html', 'link');">Bespoke Form</button>
                <button type="button" class="pill-ctrl-btn" onclick="document.getElementById('fieldInput_${item.key}').value='tours/index.html'; PageEditor.handleLiveInput('${item.key}', 'tours/index.html', 'link');">Tours Index</button>
                <button type="button" class="pill-ctrl-btn" onclick="document.getElementById('fieldInput_${item.key}').value='contact.html'; PageEditor.handleLiveInput('${item.key}', 'contact.html', 'link');">Contact Us</button>
              </div>

              <div style="display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;">
                <button type="button" class="btn btn-danger btn-sm" onclick="PageEditor.clearTextField('${item.key}');" style="background: #EF4444; color: #FFFFFF; border: none;">🗑️ Clear Link</button>
                <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.resetFieldToDefault('${item.key}', 'link')">🔄 Reset Default</button>
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
            </div>
          `;
        }

        // --- F. STANDARD PLAIN TEXT & HEADINGS ---
        else {
          const isLong = (currentVal || '').length > 70;
          const currentTag = (item.tagName || 'p').toLowerCase();
          
          html += `
            <div class="inspector-field-group">
              <!-- Tag Switcher Pills -->
              <div style="margin-bottom: 10px;">
                <label style="font-size: 0.74rem; font-weight: 600; color: #64748B; margin-bottom: 4px; display: block;">Convert Element Tag:</label>
                <div class="pill-controls-group">
                  <button type="button" class="pill-ctrl-btn ${currentTag === 'h1' ? 'active' : ''}" onclick="PageEditor.convertElementTag('h1')">H1</button>
                  <button type="button" class="pill-ctrl-btn ${currentTag === 'h2' ? 'active' : ''}" onclick="PageEditor.convertElementTag('h2')">H2</button>
                  <button type="button" class="pill-ctrl-btn ${currentTag === 'h3' ? 'active' : ''}" onclick="PageEditor.convertElementTag('h3')">H3</button>
                  <button type="button" class="pill-ctrl-btn ${currentTag === 'h4' ? 'active' : ''}" onclick="PageEditor.convertElementTag('h4')">H4</button>
                  <button type="button" class="pill-ctrl-btn ${currentTag === 'p' ? 'active' : ''}" onclick="PageEditor.convertElementTag('p')">Paragraph</button>
                  <button type="button" class="pill-ctrl-btn ${currentTag === 'blockquote' ? 'active' : ''}" onclick="PageEditor.convertElementTag('blockquote')">Quote</button>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label style="margin: 0; font-weight: 700; color: #0F172A;">✏️ Text Content (${this.activeLang.toUpperCase()})</label>
                ${isMissingTranslation ? `<button type="button" class="auto-translate-btn" onclick="PageEditor.autoTranslateCurrentField('${item.key}', '${this.escapeAttr(enVal)}')">✨ Auto-Translate from EN</button>` : ''}
              </div>
              ${isLong ? `
                <textarea class="form-control" id="fieldInput_${item.key}" rows="4" oninput="PageEditor.handleLiveInput('${item.key}', this.value, 'text')">${this.escapeHtml(this.decodeEntities(currentVal))}</textarea>
              ` : `
                <input type="text" class="form-control" id="fieldInput_${item.key}" value="${this.escapeAttr(this.decodeEntities(currentVal))}" oninput="PageEditor.handleLiveInput('${item.key}', this.value, 'text')"/>
              `}

              <!-- Typography & Alignment Controls -->
              <div style="margin-top: 10px;">
                <label style="font-size: 0.74rem; font-weight: 600; color: #64748B; margin-bottom: 4px; display: block;">Text Formatting &amp; Style:</label>
                <div class="pill-controls-group">
                  <button type="button" class="pill-ctrl-btn" onclick="PageEditor.updateElementStyle('textAlign', 'left')" title="Align Left">⬅ Left</button>
                  <button type="button" class="pill-ctrl-btn" onclick="PageEditor.updateElementStyle('textAlign', 'center')" title="Align Center">⬍ Center</button>
                  <button type="button" class="pill-ctrl-btn" onclick="PageEditor.updateElementStyle('textAlign', 'right')" title="Align Right">➡ Right</button>
                  <button type="button" class="pill-ctrl-btn" onclick="PageEditor.updateElementStyle('fontWeight', '700')" title="Bold">Bold</button>
                  <button type="button" class="pill-ctrl-btn" onclick="PageEditor.updateElementStyle('fontWeight', 'normal')" title="Normal">Normal</button>
                </div>

                <div class="color-swatch-row">
                  <span style="font-size: 0.74rem; font-weight: 600; color: #64748B;">Color:</span>
                  <button type="button" class="color-swatch-btn" style="background: #D4AF37;" onclick="PageEditor.updateElementStyle('color', '#D4AF37')" title="Sacred Gold"></button>
                  <button type="button" class="color-swatch-btn" style="background: #002B49;" onclick="PageEditor.updateElementStyle('color', '#002B49')" title="Deep Navy"></button>
                  <button type="button" class="color-swatch-btn" style="background: #0F172A;" onclick="PageEditor.updateElementStyle('color', '#0F172A')" title="Obsidian"></button>
                  <button type="button" class="color-swatch-btn" style="background: #64748B;" onclick="PageEditor.updateElementStyle('color', '#64748B')" title="Slate Gray"></button>
                  <button type="button" class="color-swatch-btn" style="background: #FFFFFF;" onclick="PageEditor.updateElementStyle('color', '#FFFFFF')" title="Pure White"></button>
                  <button type="button" class="color-swatch-btn" style="background: #C95451;" onclick="PageEditor.updateElementStyle('color', '#C95451')" title="Lotus Red"></button>
                </div>
              </div>
              
              <div style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
                <button type="button" class="btn btn-danger btn-sm" onclick="PageEditor.clearTextField('${item.key}')" style="background: #EF4444; color: #FFFFFF; border: none;">🗑️ Clear Text</button>
                <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.resetFieldToDefault('${item.key}', 'text')">🔄 Reset Default</button>
              </div>
            </div>
          `;
        }
      }

      // --- STICKY PUBLISH / SAVE ACTION BAR ---
      html += `
        <div style="margin-top: 20px; padding-top: 14px; border-top: 1px solid #E2E8F0; display: flex; flex-direction: column; gap: 8px;">
          <button type="button" class="btn btn-gold btn-block" onclick="PageEditor.publish()" style="font-weight: 700;">
            🚀 Publish Changes Live
          </button>
          <button type="button" class="btn btn-outline btn-block" onclick="PageEditor.saveDraft()">
            💾 Save Draft
          </button>
        </div>
      `;

      // Technical Info Accordion (collapsed by default)
      html += `
        <details class="technical-info-toggle" style="margin-top: 14px;">
          <summary style="font-size: 0.78rem; color: #94A3B8; cursor: pointer;">⚙️ Technical Info &amp; Database Binding</summary>
          <div class="technical-info-box" style="margin-top: 6px; font-size: 0.76rem; background: #F8FAFC; padding: 10px; border-radius: 6px; border: 1px solid #E2E8F0;">
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
      let mapped = keyMap[cleanDoc];
      if (!mapped) {
        if (this.activePageKey && this.activePageKey.startsWith('destinations/')) {
          mapped = {
            key: `dest_${docName}.hero_bg`,
            label: `${this.getFriendlySectionName(docName)} Destination Hero Banner`,
            defaultVal: 'assets/images/cultural/sigiriya-1.webp'
          };
        } else if (this.activePageKey && this.activePageKey.startsWith('tourPackages/')) {
          mapped = {
            key: `pkg_${docName}.hero_bg`,
            label: `${this.getFriendlySectionName(docName)} Tour Hero Banner`,
            defaultVal: 'assets/images/cultural/sigiriya-1.webp'
          };
        } else {
          mapped = {
            key: `${docName}.hero_bg`,
            label: `${this.getFriendlySectionName(docName)} Hero Banner`,
            defaultVal: 'assets/images/cultural/sigiriya-1.webp'
          };
        }
      }

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

    openRealExperiencesEditor() {
      this.openImageEditor(
        'home.real_exp_bg_1',
        'Real Experiences: Slide 1 (Ella Misty Highlands)',
        '✨ Real Experiences',
        'assets/images/experiences/real-experiences-ella-rock-large.webp',
        'bg-image'
      );
      const iframe = document.getElementById('visualCmsIframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'lotus:scroll-to-key', key: 'experiences' }, '*');
        iframe.contentWindow.postMessage({ type: 'lotus:set-wre-slide', index: 0 }, '*');
      }
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
            key: 'home.real_exp_bg_1',
            label: 'Real Experiences: Slide 1 (Ella Misty Highlands Panoramic Photo)',
            sectionName: '✨ Real Experiences Slides',
            sectionId: 'experiences',
            defaultUrl: 'assets/images/experiences/real-experiences-ella-rock-large.webp',
            attrType: 'bg-image'
          },
          {
            key: 'home.real_exp_bg_2',
            label: 'Real Experiences: Slide 2 (Sigiriya Rock Citadel Panoramic Photo)',
            sectionName: '✨ Real Experiences Slides',
            sectionId: 'experiences',
            defaultUrl: 'assets/images/cultural/sigiriya-1.webp',
            attrType: 'bg-image'
          },
          {
            key: 'home.real_exp_bg_3',
            label: 'Real Experiences: Slide 3 (Kaudulla Wild Elephants & Safari Photo)',
            sectionName: '✨ Real Experiences Slides',
            sectionId: 'experiences',
            defaultUrl: 'assets/images/wildlife/yala-leopard-1.webp',
            attrType: 'bg-image'
          },
          {
            key: 'home.real_exp_bg_4',
            label: 'Real Experiences: Slide 4 (Scenic Ceylon Highlands Train Photo)',
            sectionName: '✨ Real Experiences Slides',
            sectionId: 'experiences',
            defaultUrl: 'assets/images/wildlife/yala-leopard-1.webp',
            attrType: 'bg-image'
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
            defaultUrl: 'assets/images/cultural/galle-fort-5.webp',
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
          {
            key: 'home.img_40',
            label: 'Editorial & News: Wild Elephant Gathering',
            sectionName: '📰 Travel Insights & News',
            sectionId: 'news',
            defaultUrl: 'assets/images/buddhist-heritage/ruwanwelisaya-2.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_41',
            label: 'Editorial & News: Sinharaja Volunteer Reforestation',
            sectionName: '📰 Travel Insights & News',
            sectionId: 'news',
            defaultUrl: 'assets/images/family/kosgoda-turtle-hatchery-1.webp',
            attrType: 'image'
          },
          {
            key: 'home.img_42',
            label: 'Editorial & News: Traditional Ceylon Ayurveda',
            sectionName: '📰 Travel Insights & News',
            sectionId: 'news',
            defaultUrl: 'assets/images/ayurveda/herbal-treatment-1.webp',
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
          { key: 'about.team_img_1', label: 'CEO & Founder: Mallawa Arachchige Dhushantha Gihan Mallawaarachchi (Sri Lanka 🇱🇰)', sectionName: '👥 Leadership & Representatives', sectionId: 'ourPeople', defaultUrl: 'assets/images/team/avatar-dg.svg', attrType: 'image' },
          { key: 'about.team_img_2', label: 'Global Representative 1: Mr. Kuenga Yarpel (Bhutan 🇧🇹)', sectionName: '👥 Leadership & Representatives', sectionId: 'ourPeople', defaultUrl: 'assets/images/team/avatar-ky.svg', attrType: 'image' },
          { key: 'about.team_img_3', label: 'Global Representative 2: United Kingdom & Ireland (🇬🇧)', sectionName: '👥 Leadership & Representatives', sectionId: 'ourPeople', defaultUrl: 'assets/images/team/rep-uk.svg', attrType: 'image' },
          { key: 'about.team_img_4', label: 'Global Representative 3: Australia & New Zealand (🇦🇺)', sectionName: '👥 Leadership & Representatives', sectionId: 'ourPeople', defaultUrl: 'assets/images/team/rep-australia.svg', attrType: 'image' },
          { key: 'about.team_img_5', label: 'Global Representative 4: Germany & DACH (🇩🇪)', sectionName: '👥 Leadership & Representatives', sectionId: 'ourPeople', defaultUrl: 'assets/images/team/rep-germany.svg', attrType: 'image' },
          { key: 'about.team_img_6', label: 'Global Representative 5: France & Benelux (🇫🇷)', sectionName: '👥 Leadership & Representatives', sectionId: 'ourPeople', defaultUrl: 'assets/images/team/rep-france.svg', attrType: 'image' },
          { key: 'about.team_img_7', label: 'Global Representative 6: United States & Canada (🇺🇸)', sectionName: '👥 Leadership & Representatives', sectionId: 'ourPeople', defaultUrl: 'assets/images/team/rep-usa.svg', attrType: 'image' },
          { key: 'about.team_img_8', label: 'Global Representative 7: Greater China & WeChat (🇨🇳)', sectionName: '👥 Leadership & Representatives', sectionId: 'ourPeople', defaultUrl: 'assets/images/team/rep-china.svg', attrType: 'image' },
          { key: 'about.team_img_9', label: 'Global Representative 8: Japan & LINE Concierge (🇯🇵)', sectionName: '👥 Leadership & Representatives', sectionId: 'ourPeople', defaultUrl: 'assets/images/team/rep-japan.svg', attrType: 'image' },
          { key: 'about.team_img_10', label: 'Global Representative 9: India & South Asia (🇮🇳)', sectionName: '👥 Leadership & Representatives', sectionId: 'ourPeople', defaultUrl: 'assets/images/team/rep-india.svg', attrType: 'image' },
          { key: 'about.team_img_11', label: 'Global Representative 10: UAE & Middle East (🇦🇪)', sectionName: '👥 Leadership & Representatives', sectionId: 'ourPeople', defaultUrl: 'assets/images/team/rep-uae.svg', attrType: 'image' },
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

          <!-- 2b. Real Experiences Panoramic Slides Card -->
          <div style="background: linear-gradient(135deg, #0A192F, #002B49); border: 1px solid #D4AF37; border-radius: 8px; padding: 14px; margin-bottom: 16px; color: #FFFFFF; text-align: left; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <strong style="color: #D4AF37; font-size: 0.95rem;">✨ Real Experiences Slides</strong>
              <span class="badge" style="background: rgba(212, 175, 55, 0.25); color: #F8E5DD; font-size: 0.72rem;">4 Panoramic Slides</span>
            </div>
            <p style="font-size: 0.76rem; color: #CBD5E1; margin: 0 0 10px 0;">Customize the full-width panoramic background photos (Ella Rock, Sigiriya, Kaudulla Elephants, Scenic Train).</p>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 10px;">
              <div style="text-align: center;">
                <img src="${this.resolvePreviewUrl(this.getCurrentValue('home.real_exp_bg_1', 'assets/images/experiences/real-experiences-ella-rock-large.webp'))}" style="width: 100%; height: 42px; object-fit: cover; border-radius: 4px; border: 1px solid #D4AF37;" onerror="this.src='../assets/images/placeholder.png'"/>
                <span style="font-size: 0.65rem; color: #94A3B8; display: block; margin-top: 2px;">1: Ella</span>
              </div>
              <div style="text-align: center;">
                <img src="${this.resolvePreviewUrl(this.getCurrentValue('home.real_exp_bg_2', 'assets/images/home/hero-sigiriya-aerial-1.webp'))}" style="width: 100%; height: 42px; object-fit: cover; border-radius: 4px; border: 1px solid #D4AF37;" onerror="this.src='../assets/images/placeholder.png'"/>
                <span style="font-size: 0.65rem; color: #94A3B8; display: block; margin-top: 2px;">2: Sigiriya</span>
              </div>
              <div style="text-align: center;">
                <img src="${this.resolvePreviewUrl(this.getCurrentValue('home.real_exp_bg_3', 'assets/images/wildlife/minneriya-elephant-gathering-2.webp'))}" style="width: 100%; height: 42px; object-fit: cover; border-radius: 4px; border: 1px solid #D4AF37;" onerror="this.src='../assets/images/placeholder.png'"/>
                <span style="font-size: 0.65rem; color: #94A3B8; display: block; margin-top: 2px;">3: Elephants</span>
              </div>
              <div style="text-align: center;">
                <img src="${this.resolvePreviewUrl(this.getCurrentValue('home.real_exp_bg_4', 'assets/images/family/scenic-train-ride-2.webp'))}" style="width: 100%; height: 42px; object-fit: cover; border-radius: 4px; border: 1px solid #D4AF37;" onerror="this.src='../assets/images/placeholder.png'"/>
                <span style="font-size: 0.65rem; color: #94A3B8; display: block; margin-top: 2px;">4: Train</span>
              </div>
            </div>
            <button type="button" class="btn btn-gold btn-sm btn-block" onclick="PageEditor.openRealExperiencesEditor()" style="font-weight: 700;">
              ✨ Edit Real Experiences Images &amp; Slides
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
            <div class="quick-jump-card" onclick="PageEditor.openRealExperiencesEditor()" style="border: 1px solid #D4AF37; background: #FFFDF8;">
              <span class="qj-icon">✨</span>
              <span class="qj-label" style="font-weight: 700; color: #92400E;">Real Experiences</span>
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

            // Highlight only the matching sub-link / red-page-tab in sidebar and ensure its accordion is open
      const subLinks = document.querySelectorAll('.sidebar-nav .nav-sub-link, .sidebar-nav .red-page-tab');
      let matchedGroup = null;
      subLinks.forEach(link => {
        const linkDoc = link.getAttribute('data-page-doc');
        const onclickAttr = link.getAttribute('onclick') || '';
        const isMatch = (linkDoc === docKey) || 
                        (onclickAttr.includes(`'${docKey}'`) || onclickAttr.includes(`"${docKey}"`) || 
                        (fileName && (onclickAttr.includes(`'${fileName}'`) || onclickAttr.includes(`"${fileName}"`))));
        link.classList.toggle('active', !!isMatch);
        if (isMatch && !matchedGroup) {
          matchedGroup = link.closest('.nav-collapsible-group');
        }
      });
      if (matchedGroup) {
        document.querySelectorAll('.sidebar-nav .nav-collapsible-group').forEach(g => {
          if (g !== matchedGroup) g.classList.remove('is-open');
        });
        matchedGroup.classList.add('is-open');
      }

      // Also highlight matching quick page strip button
      document.querySelectorAll('.strip-tab-btn').forEach(btn => {
        const btnKey = btn.getAttribute('data-page-key');
        const onclickAttr = btn.getAttribute('onclick') || '';
        const isMatch = (btnKey === docKey) || onclickAttr.includes(`'${docKey}'`) || (fileName && onclickAttr.includes(`'${fileName}'`));
        btn.classList.toggle('active', !!isMatch);
      });

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
        // Auto-save active success story before publishing if open
        if (document.getElementById('peStoryTitle')) {
          try {
            await this.saveActiveStory();
          } catch (se) {
            console.warn('[PageEditor] Auto-save story warning:', se);
          }
        }

        const payload = Object.assign({}, this.activeDocData);
        payload.status = status;
        payload.updatedAt = new Date().toISOString();
        if (this.activePageKey === 'siteContent/home' && window.AdminApp && window.AdminApp.successStories) {
          payload.successStories = window.AdminApp.successStories;
        }
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
            localStorage.removeItem('lotus_cms_v5');
            localStorage.removeItem('lotus_cms_v3');
          } catch (e) {}
        }

        // Save to Firestore
        if (window.AdminApp && window.AdminApp.fbDb) {
          const parts = this.activePageKey.split('/');
          const col = parts[0];
          const docId = parts.slice(1).join('/');

          await window.AdminApp.fbDb.collection(col).doc(docId).set(payload, { merge: true });

          // If published, increment version and record version history snapshot
          if (status === 'published') {
            await window.AdminApp.fbDb.collection('siteMeta').doc('version').set({
              v: Date.now(),
              updatedAt: new Date().toISOString()
            }, { merge: true });

            // Record snapshot in siteHistory
            try {
              const versionId = 'v_' + Date.now();
              const historyDocKey = this.activePageKey.replace('/', '__');
              await window.AdminApp.fbDb.collection('siteHistory').doc(historyDocKey).collection('versions').doc(versionId).set({
                id: versionId,
                timestamp: new Date().toISOString(),
                pageKey: this.activePageKey,
                updatedBy: payload.updatedBy || 'admin',
                payload: payload
              });
            } catch(he) { console.warn('[PageEditor] History record warning:', he); }
          }

          // Always record locally in localStorage
          if (status === 'published') {
            try {
              const hKey = 'lotus_history_' + this.activePageKey;
              const list = JSON.parse(localStorage.getItem(hKey) || '[]');
              list.unshift({
                id: 'v_' + Date.now(),
                timestamp: new Date().toISOString(),
                pageKey: this.activePageKey,
                updatedBy: payload.updatedBy || 'admin',
                payload: payload
              });
              if (list.length > 20) list.length = 20;
              localStorage.setItem(hKey, JSON.stringify(list));
            } catch(le) {}
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
      } else if (docKey === 'siteGlobal/header') {
        const phone = (this.activeDocData && this.activeDocData['siteGlobal.header.phone']) || '+94 77 722 0070';
        const topbarText = (this.activeDocData && this.activeDocData['siteGlobal.header.topbar_text']) || 'Official Luxury Concierge for Sri Lanka & Ceylon Travel';
        const waText = (this.activeDocData && this.activeDocData['siteGlobal.header.whatsapp_label']) || 'Chat on WhatsApp';
        const waNum = (this.activeDocData && this.activeDocData['siteGlobal.header.whatsapp_num']) || '+94 77 722 0070';
        const inqBtn = (this.activeDocData && this.activeDocData['siteGlobal.header.inquire_btn']) || 'Inquire Now';

        panel.innerHTML = `
          <div class="inspector-card">
            <h4 style="font-size: 1.05rem; margin-bottom: 8px;">🔝 Global Header & Topbar</h4>
            <p style="color: #64748B; font-size: 0.82rem; margin-bottom: 16px;">Customize the top announcement bar, telephone, WhatsApp button, and Inquire call-to-action.</p>
            
            <div class="inspector-field-group">
              <label>Topbar Announcement / Slogan</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.header.topbar_text" value="${this.escapeAttr(topbarText)}" oninput="PageEditor.handleLiveInput('siteGlobal.header.topbar_text', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>Direct Telephone Hotline</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.header.phone" value="${this.escapeAttr(phone)}" oninput="PageEditor.handleLiveInput('siteGlobal.header.phone', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>WhatsApp Button Label</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.header.whatsapp_label" value="${this.escapeAttr(waText)}" oninput="PageEditor.handleLiveInput('siteGlobal.header.whatsapp_label', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>WhatsApp Target Number</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.header.whatsapp_num" value="${this.escapeAttr(waNum)}" oninput="PageEditor.handleLiveInput('siteGlobal.header.whatsapp_num', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>Inquire Button Text</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.header.inquire_btn" value="${this.escapeAttr(inqBtn)}" oninput="PageEditor.handleLiveInput('siteGlobal.header.inquire_btn', this.value, 'text')"/>
            </div>
          </div>
        `;
      } else if (docKey === 'siteGlobal/footer') {
        const about = (this.activeDocData && this.activeDocData['siteGlobal.footer.about_text']) || 'Lotus Ceylon International Tours & Services (Pvt) Ltd is a registered inbound tour operator curating ultra-luxury, culturally authentic Sri Lanka journeys.';
        const copyright = (this.activeDocData && this.activeDocData['siteGlobal.footer.copyright']) || '© 2026 Lotus Ceylon International Tours & Services (Pvt) Ltd. All rights reserved.';
        const license = (this.activeDocData && this.activeDocData['siteGlobal.footer.license_note']) || 'SLTDA Approved Destination Management Company (PV 00374439)';

        panel.innerHTML = `
          <div class="inspector-card">
            <h4 style="font-size: 1.05rem; margin-bottom: 8px;">🔻 Global Footer & Legal</h4>
            <p style="color: #64748B; font-size: 0.82rem; margin-bottom: 16px;">Configure brand description, copyright notices, and regulatory disclosures appearing on all footers.</p>
            
            <div class="inspector-field-group">
              <label>Footer Brand Summary</label>
              <textarea class="form-control" rows="3" id="fieldInput_siteGlobal.footer.about_text" oninput="PageEditor.handleLiveInput('siteGlobal.footer.about_text', this.value, 'text')">${this.escapeHtml(about)}</textarea>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>Copyright Statement</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.footer.copyright" value="${this.escapeAttr(copyright)}" oninput="PageEditor.handleLiveInput('siteGlobal.footer.copyright', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>SLTDA License & Certification Badge</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.footer.license_note" value="${this.escapeAttr(license)}" oninput="PageEditor.handleLiveInput('siteGlobal.footer.license_note', this.value, 'text')"/>
            </div>
          </div>
        `;
      } else if (docKey === 'siteGlobal/contact') {
        const email = (this.activeDocData && this.activeDocData['siteGlobal.contact.email']) || 'info@lotusceylon.com';
        const phone = (this.activeDocData && this.activeDocData['siteGlobal.contact.phone']) || '+94 77 722 0070';
        const address = (this.activeDocData && this.activeDocData['siteGlobal.contact.address']) || 'Colombo & Kandy, Sri Lanka';
        const wechat = (this.activeDocData && this.activeDocData['siteGlobal.contact.wechat']) || 'FGUTaiwan90';
        const line = (this.activeDocData && this.activeDocData['siteGlobal.contact.line']) || 'dpbs2024';

        panel.innerHTML = `
          <div class="inspector-card">
            <h4 style="font-size: 1.05rem; margin-bottom: 8px;">📞 Concierge & Direct Contact Channels</h4>
            <p style="color: #64748B; font-size: 0.82rem; margin-bottom: 16px;">Manage official inquiry email, hotline, messaging IDs (WeChat/LINE), and office addresses.</p>
            
            <div class="inspector-field-group">
              <label>Official Concierge Email</label>
              <input type="email" class="form-control" id="fieldInput_siteGlobal.contact.email" value="${this.escapeAttr(email)}" oninput="PageEditor.handleLiveInput('siteGlobal.contact.email', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>Concierge Phone / WhatsApp</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.contact.phone" value="${this.escapeAttr(phone)}" oninput="PageEditor.handleLiveInput('siteGlobal.contact.phone', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>Physical Address</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.contact.address" value="${this.escapeAttr(address)}" oninput="PageEditor.handleLiveInput('siteGlobal.contact.address', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>WeChat ID (China & Asian Guests)</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.contact.wechat" value="${this.escapeAttr(wechat)}" oninput="PageEditor.handleLiveInput('siteGlobal.contact.wechat', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>LINE ID (Taiwan & East Asia)</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.contact.line" value="${this.escapeAttr(line)}" oninput="PageEditor.handleLiveInput('siteGlobal.contact.line', this.value, 'text')"/>
            </div>
          </div>
        `;
      } else if (docKey === 'siteGlobal/social') {
        const fb = (this.activeDocData && this.activeDocData['siteGlobal.social.facebook']) || 'https://facebook.com/lotusceylon';
        const ig = (this.activeDocData && this.activeDocData['siteGlobal.social.instagram']) || 'https://instagram.com/lotusceylon';
        const yt = (this.activeDocData && this.activeDocData['siteGlobal.social.youtube']) || 'https://youtube.com/@lotusceylontours';
        const ta = (this.activeDocData && this.activeDocData['siteGlobal.social.tripadvisor']) || 'https://tripadvisor.com';

        panel.innerHTML = `
          <div class="inspector-card">
            <h4 style="font-size: 1.05rem; margin-bottom: 8px;">🌐 Social Media Channels</h4>
            <p style="color: #64748B; font-size: 0.82rem; margin-bottom: 16px;">Global URLs for Facebook, Instagram, YouTube, and TripAdvisor linked across the entire site.</p>
            
            <div class="inspector-field-group">
              <label>Facebook Page URL</label>
              <input type="url" class="form-control" id="fieldInput_siteGlobal.social.facebook" value="${this.escapeAttr(fb)}" oninput="PageEditor.handleLiveInput('siteGlobal.social.facebook', this.value, 'link')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>Instagram Profile URL</label>
              <input type="url" class="form-control" id="fieldInput_siteGlobal.social.instagram" value="${this.escapeAttr(ig)}" oninput="PageEditor.handleLiveInput('siteGlobal.social.instagram', this.value, 'link')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>YouTube Channel URL</label>
              <input type="url" class="form-control" id="fieldInput_siteGlobal.social.youtube" value="${this.escapeAttr(yt)}" oninput="PageEditor.handleLiveInput('siteGlobal.social.youtube', this.value, 'link')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>TripAdvisor Listing URL</label>
              <input type="url" class="form-control" id="fieldInput_siteGlobal.social.tripadvisor" value="${this.escapeAttr(ta)}" oninput="PageEditor.handleLiveInput('siteGlobal.social.tripadvisor', this.value, 'link')"/>
            </div>
          </div>
        `;
      } else {
        panel.innerHTML = `
          <div class="inspector-card">
            <h4>${this.escapeHtml(label || docKey)}</h4>
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
      this.updateSeoCounters();
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


    resetCurrentPage() {
      if (!confirm('Are you sure you want to reset this page and discard all unsaved edits?')) {
        return;
      }
      this.currentFieldValues = {};
      this.hasUnsavedChanges = false;
      this.markSaved();
      const iframe = document.getElementById('visualCmsIframe');
      if (iframe) {
        const curSrc = iframe.src;
        iframe.src = 'about:blank';
        setTimeout(() => { iframe.src = curSrc; }, 60);
      }
      this.fetchPageDoc(this.activePageKey).then(() => {
        this.renderEmptyState();
        if (window.AdminApp) {
          window.AdminApp.showToast('Page reset to saved state.', 'info');
        }
      });
    },

    openFormEditor(formType = 'inquiry_detailed') {
      this.activeFormType = formType;
      const titleEl = document.getElementById('formEditorActiveTitle');
      const emailEl = document.getElementById('formRecipientEmail');
      const subjEl = document.getElementById('formEmailSubject');
      const honeypotEl = document.getElementById('formHoneypotEnabled');
      const destEl = document.getElementById('formDestinationsList');
      const stylesEl = document.getElementById('formTravelStylesList');

      if (window.AdminApp) {
        window.AdminApp.switchSection('forms-editor');
      }

      let saved = null;
      try {
        const raw = localStorage.getItem('lotus_form_config_' + formType);
        if (raw) saved = JSON.parse(raw);
      } catch (e) {}

      if (formType === 'inquiry_quick') {
        if (titleEl) titleEl.textContent = 'Quick Consultation & Tour Inquire Form (All Pages Quick Modal)';
        if (emailEl) emailEl.value = (saved && saved.recipientEmail) || 'info@lotusceylon.com';
        if (subjEl) subjEl.value = (saved && saved.emailSubject) || 'New Tour Consultation Inquiry - Lotus Ceylon';
        if (honeypotEl) honeypotEl.value = saved ? String(saved.honeypotEnabled) : 'true';
        if (destEl) destEl.value = (saved && saved.destinations) || 'Cultural Triangle, Hill Country, Wildlife Safari, Southern Coast, Jaffna & North';
        if (stylesEl) stylesEl.value = (saved && saved.travelStyles) || 'Luxury Heritage, Wildlife Safari, Cultural Immersion, Romantic Honeymoon, Ayurveda Wellness';
      } else {
        if (titleEl) titleEl.textContent = 'Bespoke Journey Inquiry Form (inquiry-detailed.html)';
        if (emailEl) emailEl.value = (saved && saved.recipientEmail) || 'info@lotusceylon.com';
        if (subjEl) subjEl.value = (saved && saved.emailSubject) || 'We received your bespoke Sri Lanka journey inquiry - Lotus Ceylon';
        if (honeypotEl) honeypotEl.value = saved ? String(saved.honeypotEnabled) : 'true';
        if (destEl) destEl.value = (saved && saved.destinations) || 'Cultural Triangle (Sigiriya/Polonnaruwa), Hill Country (Kandy/Nuwara Eliya/Ella), Wildlife and Safari (Yala/Wilpattu), Southern Coast (Galle/Mirissa/Tangalle), East Coast (Trincomalee/Pasikudah), Jaffna and Northern Province';
        if (stylesEl) stylesEl.value = (saved && saved.travelStyles) || 'Luxury Boutique and Heritage, Wildlife Safari and Nature, Cultural Immersion and Ancient Cities, Romantic Honeymoon, Wellness and Ayurveda Retreat, Scenic Train and Tea Country';
      }
    },

    async saveActiveForm() {
      const formType = this.activeFormType || 'inquiry_detailed';
      const emailEl = document.getElementById('formRecipientEmail');
      const subjEl = document.getElementById('formEmailSubject');
      const honeypotEl = document.getElementById('formHoneypotEnabled');
      const destEl = document.getElementById('formDestinationsList');
      const stylesEl = document.getElementById('formTravelStylesList');

      const config = {
        formType,
        recipientEmail: emailEl ? emailEl.value.trim() : 'info@lotusceylon.com',
        emailSubject: subjEl ? subjEl.value.trim() : '',
        honeypotEnabled: honeypotEl ? (honeypotEl.value === 'true') : true,
        destinations: destEl ? destEl.value.trim() : '',
        travelStyles: stylesEl ? stylesEl.value.trim() : '',
        updatedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('lotus_form_config_' + formType, JSON.stringify(config));
      } catch (e) {}

      if (window.AdminApp && window.AdminApp.fbDb) {
        try {
          await window.AdminApp.fbDb.collection('forms').doc(formType).set(config, { merge: true });
        } catch (err) {
          console.warn('[PageEditor] Firestore save form error:', err);
        }
      }

      if (window.AdminApp) {
        window.AdminApp.showToast(`Form configuration for "${formType === 'inquiry_quick' ? 'Quick Consultation' : 'Bespoke Inquiry'}" saved successfully!`, 'success');
      }
    },

    saveActiveBlogPost() {
      if (window.AdminApp && typeof window.AdminApp.saveBlogModal === 'function') {
        window.AdminApp.saveBlogModal();
      }
    },

    escapeHtml(str) {
      if (!str) return '';
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    renderSuccessStoriesInspector(item) {
      const storyData = item.storyData || {};
      let stories = (window.AdminApp && window.AdminApp.successStories && window.AdminApp.successStories.length > 0)
        ? window.AdminApp.successStories
        : (storyData.stories || []);

      // Fallback: If stories still empty, read from localStorage cache or seed
      if (!stories || stories.length === 0) {
        try {
          const cached = localStorage.getItem('lotus_success_stories_cache_v7') || localStorage.getItem('lotus_success_stories_cache');
          if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              stories = parsed;
              if (window.AdminApp) window.AdminApp.successStories = parsed;
            }
          }
        } catch (e) {}
      }
      const currentIdx = (typeof this.activeStoryIndex === 'number' && stories[this.activeStoryIndex])
        ? this.activeStoryIndex
        : (storyData.currentSlide || 0);
      const story = stories[currentIdx] || storyData.story || {
        id: 'story-01',
        title: 'Anuradhapura',
        badge: 'SACRED SITES',
        photo: 'assets/images/home/anuradhapura-success-story.jpg',
        description: 'Ancient capital of great stupas and the revered Sri Maha Bodhi tree...',
        sortOrder: 1,
        published: true
      };

      let html = `
        <div style="background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); border: 1.5px solid #F59E0B; border-radius: 8px; padding: 14px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-weight: 700; font-size: 0.9rem; color: #92400E;">👑 Our Success Stories (${stories.length || 5} Landscape Stories)</span>
            <span class="badge" style="background: #FDE68A; color: #78350F; font-size: 0.72rem; font-weight: 700;">Rotates 5s</span>
          </div>
          <p style="font-size: 0.78rem; color: #78350F; margin: 0 0 10px 0; line-height: 1.45;">
            These luxury stories rotate automatically on the homepage right below the "About Us" button. Select any story below to edit its text, badge, or landscape photo:
          </p>

          <!-- 5 Story Switcher Tabs -->
          <div style="display: grid; grid-template-columns: repeat(${Math.max(stories.length, 1)}, 1fr); gap: 6px; margin-bottom: 8px;">
            ${stories.map((s, idx) => {
              const isSelected = idx === currentIdx;
              const photoSrc = s.photo || '';
              return `
                <button type="button" 
                        onclick="PageEditor.switchStorySlide(${idx})"
                        style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px 4px; border-radius: 6px; cursor: pointer; border: 2px solid ${isSelected ? '#D97706' : '#FDE68A'}; background: ${isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.7)'}; box-shadow: ${isSelected ? '0 2px 6px rgba(217,119,6,0.25)' : 'none'}; transition: all 0.15s ease;">
                  <img src="${this.resolvePreviewUrl(photoSrc)}" style="width: 100%; height: 38px; object-fit: cover; border-radius: 4px; border: 1px solid #E2E8F0;" onerror="this.src='../assets/images/placeholder.png'"/>
                  <span style="font-size: 0.73rem; font-weight: 700; color: ${isSelected ? '#92400E' : '#475569'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">${idx + 1}. ${(s.title || 'Story').split(' ')[0]}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Form fields for active story -->
        <div class="inspector-field-group">
          <label style="font-weight: 700; color: #0F172A; font-size: 0.85rem;">Story Title *</label>
          <input type="text" class="form-control" id="peStoryTitle" value="${this.escapeAttr(story.title || '')}" placeholder="e.g. Kandy Royal Kingdom" oninput="PageEditor.handleStoryLiveInput('title', this.value)"/>
        </div>

        <div class="inspector-field-group">
          <label style="font-weight: 700; color: #0F172A; font-size: 0.85rem;">Badge / Tag *</label>
          <input type="text" class="form-control" id="peStoryBadge" value="${this.escapeAttr(story.badge || 'OUR SUCCESS STORIES')}" placeholder="e.g. SACRED SITES, SACRED HERITAGE" oninput="PageEditor.handleStoryLiveInput('badge', this.value)"/>
        </div>

        <div class="inspector-field-group">
          <label style="font-weight: 700; color: #0F172A; font-size: 0.85rem;">Story Description *</label>
          <textarea class="form-control" rows="3" id="peStoryDesc" placeholder="Brief story text describing this Ceylon experience..." oninput="PageEditor.handleStoryLiveInput('description', this.value)">${this.escapeHtml(story.description || '')}</textarea>
        </div>

        <div class="inspector-field-group">
          <label style="font-weight: 700; color: #0F172A; font-size: 0.85rem;">Landscape Photo URL / CDN *</label>
          <div style="position: relative; border-radius: 8px; overflow: hidden; background: #0B132B; text-align: center; border: 1px solid #CBD5E1; margin-bottom: 8px;">
            <img src="${this.resolvePreviewUrl(story.photo || '')}" class="inspector-thumb-preview" id="peStoryPhotoPreview" style="max-height: 160px; width: 100%; object-fit: cover; display: block;" onerror="this.src='../assets/images/placeholder.png'"/>
          </div>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <input type="text" class="form-control" id="peStoryPhoto" value="${this.escapeAttr(story.photo || '')}" placeholder="assets/images/... or Cloudinary URL" oninput="PageEditor.handleStoryLiveInput('photo', this.value)"/>
          </div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;">
            <button type="button" class="btn btn-primary btn-sm" onclick="PageEditor.triggerStoryUploadDirect()">📤 Upload Photo</button>
            <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPickerForStory()">📁 Media Library</button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForStoryField()">☁️ Crop/Edit</button>
            <button type="button" class="btn btn-outline btn-sm text-danger" style="color: #EF4444; border-color: #FECACA;" onclick="PageEditor.clearStoryPhoto()">🗑️ Remove</button>
          </div>
        </div>

        <!-- Order & Published -->
        <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px;">
          <div style="flex: 1;">
            <label style="font-size: 0.8rem; font-weight: 600; color: #475569;">Display Order (1 - 5)</label>
            <input type="number" min="1" max="5" class="form-control" id="peStorySortOrder" value="${story.sortOrder || (currentIdx + 1)}"/>
          </div>
          <div style="flex: 1; margin-top: 22px;">
            <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer; font-size: 0.85rem;">
              <input type="checkbox" id="peStoryPublished" ${story.published !== false ? 'checked' : ''}/>
              <span>Active / Published</span>
            </label>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 10px; margin-top: 20px;">
          <button type="button" class="btn btn-primary btn-block" style="flex: 2; padding: 10px;" onclick="PageEditor.saveActiveStory()">
            💾 Save Success Story
          </button>
          <button type="button" class="btn btn-outline btn-sm" style="flex: 1;" onclick="AdminApp.switchSection('success-stories')" title="Switch to full table manager in Admin">
            📋 Full Table
          </button>
        </div>
      `;
      return html;
    },

    switchStorySlide(idx) {
      this.activeStoryIndex = idx;
      const iframe = document.getElementById('visualCmsIframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'lotus:set-story-slide', index: idx }, '*');
      }
      this.renderElementForm(this.selectedElement);
    },

    handleStoryLiveInput(field, val) {
      const idx = (typeof this.activeStoryIndex === 'number') ? this.activeStoryIndex : 0;
      if (window.AdminApp && window.AdminApp.successStories && window.AdminApp.successStories[idx]) {
        window.AdminApp.successStories[idx][field] = val;
      }
      const iframe = document.getElementById('visualCmsIframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'lotus:update-story-live', field: field, val: val, index: idx }, '*');
      }
      if (field === 'photo') {
        const preview = document.getElementById('peStoryPhotoPreview');
        if (preview) preview.src = this.resolvePreviewUrl(val);
      }
    },

    openCloudinaryForStoryField() {
      if (!window.cloudinary) {
        this.triggerStoryUploadDirect();
        return;
      }
      const widget = window.cloudinary.createUploadWidget({
        cloudName: (window.LOTUS_CONFIG && window.LOTUS_CONFIG.cloudinary && window.LOTUS_CONFIG.cloudinary.cloudName) || 'qmukrbh6',
        uploadPreset: (window.LOTUS_CONFIG && window.LOTUS_CONFIG.cloudinary && window.LOTUS_CONFIG.cloudinary.uploadPreset) || 'lotus_tours_unsigned',
        folder: 'lotus/stories',
        sources: ['local', 'url', 'camera'],
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1.777,
        showSkipCropButton: true,
        croppingShowDimensions: true,
        resourceType: 'image'
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          const optimizedUrl = result.info.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
          const input = document.getElementById('peStoryPhoto');
          if (input) {
            input.value = optimizedUrl;
            this.handleStoryLiveInput('photo', optimizedUrl);
          }
          if (window.AdminApp) window.AdminApp.showToast('Photo uploaded and cropped successfully!', 'success');
        }
      });
      widget.open();
    },

    triggerStoryUploadDirect() {
      if (window.AdminApp && typeof window.AdminApp.triggerUploadForInput === 'function') {
        window.AdminApp.triggerUploadForInput('peStoryPhoto', 'peStoryPhotoPreview', null, {
          folder: 'lotus/stories',
          resourceType: 'image',
          callback: (url) => {
            const input = document.getElementById('peStoryPhoto');
            if (input) input.value = url;
            this.handleStoryLiveInput('photo', url);
            if (window.AdminApp) window.AdminApp.showToast('Story photo uploaded!', 'success');
          }
        });
      }
    },

    clearStoryPhoto() {
      const input = document.getElementById('peStoryPhoto');
      if (input) {
        input.value = '';
        this.handleStoryLiveInput('photo', '');
      }
      const preview = document.getElementById('peStoryPhotoPreview');
      if (preview) {
        preview.src = '../assets/images/placeholder.png';
      }
      if (window.AdminApp) window.AdminApp.showToast('Photo removed', 'info');
    },

    openMediaPickerForStory() {
      if (window.AdminApp && typeof window.AdminApp.openImagePicker === 'function') {
        window.AdminApp.openImagePicker('peStoryPhoto', 'peStoryPhotoPreview', null, {
          filter: 'image',
          onSelect: (url) => {
            const input = document.getElementById('peStoryPhoto');
            if (input) {
              input.value = url;
              this.handleStoryLiveInput('photo', url);
            }
          }
        });
      }
    },

    async saveActiveStory() {
      const titleInput = document.getElementById('peStoryTitle');
      const badgeInput = document.getElementById('peStoryBadge');
      const descInput = document.getElementById('peStoryDesc');
      const photoInput = document.getElementById('peStoryPhoto');
      const sortInput = document.getElementById('peStorySortOrder');
      const pubInput = document.getElementById('peStoryPublished');

      if (!titleInput || !descInput || !photoInput) return;

      const title = titleInput.value.trim();
      const badge = (badgeInput && badgeInput.value.trim()) || 'OUR SUCCESS STORIES';
      const desc = descInput.value.trim();
      const photo = photoInput.value.trim();
      const sortOrder = parseInt(sortInput ? sortInput.value : '1', 10) || 1;
      const published = pubInput ? pubInput.checked : true;

      if (!title || !desc || !photo) {
        if (window.AdminApp) window.AdminApp.showToast('Please fill all required fields (Title, Badge, Description, Photo)', 'error');
        return;
      }

      const stories = (window.AdminApp && window.AdminApp.successStories) ? window.AdminApp.successStories : [];
      const idx = (typeof this.activeStoryIndex === 'number') ? this.activeStoryIndex : 0;
      const existing = stories[idx] || {};
      const id = existing.id || ('story-0' + (idx + 1));

      const storyData = {
        id: id,
        title: title,
        badge: badge,
        photo: photo,
        description: desc,
        sortOrder: sortOrder,
        published: published,
        updatedAt: new Date().toISOString()
      };

      // 1. Firebase save
      if (window.LotusFirebase && typeof window.LotusFirebase.saveSuccessStory === 'function') {
        try {
          await window.LotusFirebase.saveSuccessStory(storyData);
        } catch (err) {
          console.warn('[PageEditor] Firebase story save warning:', err);
        }
      }

      // 2. Update AdminApp local array
      if (window.AdminApp) {
        if (!window.AdminApp.successStories) window.AdminApp.successStories = [];
        const sIdx = window.AdminApp.successStories.findIndex(s => s.id === id);
        if (sIdx !== -1) {
          window.AdminApp.successStories[sIdx] = storyData;
        } else {
          window.AdminApp.successStories.push(storyData);
        }
        window.AdminApp.successStories.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        try {
          localStorage.setItem('lotus_success_stories_cache', JSON.stringify(window.AdminApp.successStories));
          localStorage.setItem('lotus_success_stories_cache_v6', JSON.stringify(window.AdminApp.successStories));
          window.dispatchEvent(new CustomEvent('lotus_stories_updated', { detail: window.AdminApp.successStories }));
        } catch (e) {}

        // Also save to Firestore siteContent/home so public visitors can read it via 200 OK REST API
        if (window.AdminApp && window.AdminApp.fbDb) {
          try {
            await window.AdminApp.fbDb.collection('siteContent').doc('home').set({
              successStories: window.AdminApp.successStories,
              updatedAt: new Date().toISOString()
            }, { merge: true });
          } catch(he) {
            console.warn('[PageEditor] Could not save successStories to siteContent/home:', he);
          }
        }
        if (typeof window.AdminApp.renderSuccessStories === 'function') {
          window.AdminApp.renderSuccessStories();
        }
      }

      // 3. Notify iframe to reload or refresh story
      const iframe = document.getElementById('visualCmsIframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'lotus:update-story-live',
          field: 'title',
          val: title
        }, '*');
        iframe.contentWindow.postMessage({
          type: 'lotus:update-story-live',
          field: 'description',
          val: desc
        }, '*');
        iframe.contentWindow.postMessage({
          type: 'lotus:update-story-live',
          field: 'badge',
          val: badge
        }, '*');
        iframe.contentWindow.postMessage({
          type: 'lotus:update-story-live',
          field: 'photo',
          val: photo
        }, '*');
      }

      if (window.AdminApp) {
        window.AdminApp.showToast(`Saved story: ${title}`, 'success');
      }
      this.renderElementForm(this.selectedElement);
    },

    async openVersionHistoryModal() {
      const modal = document.getElementById('versionHistoryModal');
      const pageTitle = document.getElementById('versionHistoryPageTitle');
      const listEl = document.getElementById('versionHistoryList');
      if (!modal || !listEl) return;

      if (pageTitle) {
        pageTitle.textContent = `Page: ${this.activePageKey} (${this.activePageFile || 'live view'})`;
      }
      modal.style.display = 'flex';
      listEl.innerHTML = '<div style="text-align: center; color: #64748B; padding: 24px;">Loading version checkpoints...</div>';

      let versions = [];
      try {
        const localList = JSON.parse(localStorage.getItem('lotus_history_' + this.activePageKey) || '[]');
        if (localList.length > 0) versions = localList;
      } catch(e) {}

      if (window.AdminApp && window.AdminApp.fbDb) {
        try {
          const historyDocKey = this.activePageKey.replace('/', '__');
          const snap = await window.AdminApp.fbDb.collection('siteHistory').doc(historyDocKey).collection('versions').orderBy('timestamp', 'desc').limit(15).get();
          if (!snap.empty) {
            versions = [];
            snap.forEach(doc => versions.push(doc.data()));
          }
        } catch(fe) { console.warn('[PageEditor] Could not fetch remote history:', fe); }
      }

      if (versions.length === 0) {
        listEl.innerHTML = `
          <div style="text-align: center; padding: 32px 16px; color: #64748B;">
            <div style="font-size: 2.2rem; margin-bottom: 8px;">⏳</div>
            <h4 style="color: #0F172A; margin: 0 0 6px 0;">No Prior Published Checkpoints</h4>
            <p style="font-size: 0.82rem; margin: 0;">Clicking <strong>Publish Live</strong> creates an automatic version snapshot that allows 1-click rollback at any time.</p>
          </div>
        `;
        return;
      }

      listEl.innerHTML = versions.map((v, i) => {
        const dateStr = v.timestamp ? new Date(v.timestamp).toLocaleString() : 'Recent checkpoint';
        const isCurrent = i === 0;
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px; margin-bottom: 10px; background: ${isCurrent ? '#F0FDF4' : '#F8FAFC'}; border: 1px solid ${isCurrent ? '#86EFAC' : '#E2E8F0'}; border-radius: 8px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <strong style="color: #0F172A; font-size: 0.88rem;">${dateStr}</strong>
                ${isCurrent ? '<span class="badge badge-success" style="font-size: 0.7rem;">Current Live</span>' : ''}
              </div>
              <small style="color: #64748B; font-size: 0.76rem; display: block; margin-top: 2px;">Published by: ${this.escapeHtml(v.updatedBy || 'admin')}</small>
            </div>
            <div>
              ${isCurrent ? `
                <button type="button" class="btn btn-outline btn-sm" disabled style="opacity: 0.6; cursor: default;">Active</button>
              ` : `
                <button type="button" class="btn btn-outline btn-sm" style="color: #B45309; border-color: #D97706; background: #FFFBEB;" onclick="PageEditor.rollbackToVersion('${v.id}')">
                  ↺ Rollback
                </button>
              `}
            </div>
          </div>
        `;
      }).join('');
    },

    closeVersionHistoryModal() {
      const modal = document.getElementById('versionHistoryModal');
      if (modal) modal.style.display = 'none';
    },

    async rollbackToVersion(versionId) {
      if (!confirm('Are you sure you want to roll back this page to this previous version checkpoint? Current draft changes will be replaced.')) {
        return;
      }

      let targetVersion = null;
      try {
        const localList = JSON.parse(localStorage.getItem('lotus_history_' + this.activePageKey) || '[]');
        targetVersion = localList.find(v => v.id === versionId);
      } catch(e) {}

      if (!targetVersion && window.AdminApp && window.AdminApp.fbDb) {
        try {
          const historyDocKey = this.activePageKey.replace('/', '__');
          const doc = await window.AdminApp.fbDb.collection('siteHistory').doc(historyDocKey).collection('versions').doc(versionId).get();
          if (doc.exists) targetVersion = doc.data();
        } catch(e) {}
      }

      if (!targetVersion || !targetVersion.payload) {
        if (window.AdminApp) window.AdminApp.showToast('Could not load target version payload.', 'error');
        return;
      }

      this.activeDocData = Object.assign({}, targetVersion.payload);
      this.currentFieldValues = {};

      const iframe = document.getElementById('visualCmsIframe');
      if (iframe) {
        const curSrc = iframe.src;
        iframe.src = 'about:blank';
        setTimeout(() => { iframe.src = curSrc; }, 80);
      }

      this.closeVersionHistoryModal();
      await this.savePageContent('published');
      if (window.AdminApp) {
        window.AdminApp.showToast('Page rolled back to chosen checkpoint and published live!', 'success');
      }
    },

    escapeAttr(str) {
      if (!str) return '';
      return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  };

  window.PageEditor = PageEditor;

  // Lazy init on demand when user opens Visual Page Editor tab
  window.initPageEditorIfNeeded = function() {
    if (!PageEditor.initialized) {
      PageEditor.initialized = true;
      PageEditor.init();
    }
  };

  // Warn on unsaved changes when navigating away
  window.addEventListener('beforeunload', function(e) {
    if (window.PageEditor && window.PageEditor.hasUnsavedChanges) {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes in the visual editor. Are you sure you want to leave?';
      return e.returnValue;
    }
  });

})(window, document);
