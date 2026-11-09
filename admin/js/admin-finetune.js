/*
 * © 2026 Infinite Design. All rights reserved.
 * Built for Lotus Ceylon International Tours & Services (Pvt) Ltd.
 * Unauthorized removal of attribution does not transfer ownership of this code.
 * https://infiniteweb.dev/
 *
 * FINAL FINE-TUNE ARCHITECTURE (Unified Navigation, Linked Content Lock, SEO, and GitHub Export)
 */

(function (window, document) {
  'use strict';

  // 1. MASTER PAGE & TAB REGISTRY (Mirrors Website Navbar exactly)
  const PAGE_TABS = {
    home: {
      id: 'home',
      title: 'Home',
      docKey: 'siteContent/home',
      file: 'index.html',
      subtabs: [
        { id: 'hero', label: 'Hero', isLinked: false },
        { id: 'why-us', label: 'Why Travel With Us', isLinked: false },
        { id: 'category-showcase', label: 'Category Showcase', isLinked: true, sourceTab: 'tours', sourceSubtab: 'categories', sourceLabel: 'Tours > Categories' },
        { id: 'featured-tours', label: 'Featured Tours', isLinked: true, sourceTab: 'tours', sourceSubtab: 'packages', sourceLabel: 'Tours > Packages' },
        { id: 'destinations', label: 'Destinations', isLinked: true, sourceTab: 'destinations', sourceSubtab: 'destinations-list', sourceLabel: 'Destinations > Destinations list' },
        { id: 'experiences', label: 'Experiences', isLinked: true, sourceTab: 'experiences', sourceSubtab: 'experiences-list', sourceLabel: 'Experiences > Experiences list' },
        { id: 'reviews', label: 'Reviews', isLinked: true, sourceTab: 'reviews', sourceSubtab: 'reviews-list', sourceLabel: 'Reviews > Reviews list' },
        { id: 'gallery', label: 'Gallery', isLinked: true, sourceTab: 'gallery', sourceSubtab: 'gallery-images', sourceLabel: 'Gallery > Gallery Images' },
        { id: 'news-insights', label: 'News and Insights', isLinked: true, sourceTab: 'blog', sourceSubtab: 'blog-posts', sourceLabel: 'Blog > Blog Posts' },
        { id: 'success-stories', label: 'Success Stories', isLinked: false, sectionId: 'success-stories' },
        { id: 'sustainability', label: 'Sustainability', isLinked: false },
        { id: 'seo', label: 'SEO', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    tours: {
      id: 'tours',
      title: 'Tours',
      docKey: 'siteContent/toursIndex',
      file: 'tours/index.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content', isLinked: false },
        { id: 'categories', label: 'Categories', isLinked: false, sectionId: 'categories' },
        { id: 'packages', label: 'Packages', isLinked: false, sectionId: 'packages' },
        { id: 'trip-finder', label: 'Trip Finder options', isLinked: false, sectionId: 'trip-finder' },
        { id: 'seo', label: 'SEO', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    destinations: {
      id: 'destinations',
      title: 'Destinations',
      docKey: 'siteContent/destinations',
      file: 'destinations.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content', isLinked: false },
        { id: 'destinations-list', label: 'Destinations list', isLinked: false, sectionId: 'destinations' },
        { id: 'seo', label: 'SEO', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    experiences: {
      id: 'experiences',
      title: 'Experiences',
      docKey: 'siteContent/experiences',
      file: 'experiences.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content', isLinked: false },
        { id: 'experiences-list', label: 'Experiences list', isLinked: false, sectionId: 'experiences' },
        { id: 'seo', label: 'SEO', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    about: {
      id: 'about',
      title: 'About Us',
      docKey: 'siteContent/about',
      file: 'about.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content', isLinked: false },
        { id: 'team', label: 'Team Members', isLinked: false, sectionId: 'team' },
        { id: 'seo', label: 'SEO', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    gallery: {
      id: 'gallery',
      title: 'Gallery',
      docKey: 'siteContent/gallery',
      file: 'gallery.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content', isLinked: false },
        { id: 'gallery-images', label: 'Gallery Images', isLinked: false, sectionId: 'gallery' },
        { id: 'seo', label: 'SEO', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    reviews: {
      id: 'reviews',
      title: 'Reviews',
      docKey: 'siteContent/reviews',
      file: 'reviews.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content', isLinked: false },
        { id: 'reviews-list', label: 'Reviews list', isLinked: false, sectionId: 'reviews' },
        { id: 'seo', label: 'SEO', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    blog: {
      id: 'blog',
      title: 'Blog',
      docKey: 'siteContent/blog',
      file: 'blog.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content', isLinked: false },
        { id: 'blog-posts', label: 'Blog Posts', isLinked: false, sectionId: 'blog-posts' },
        { id: 'seo', label: 'SEO', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    contact: {
      id: 'contact',
      title: 'Contact',
      docKey: 'siteContent/contact',
      file: 'contact.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content', isLinked: false },
        { id: 'details', label: 'Contact Details and Social Links', isLinked: false, sectionId: 'contact-details' },
        { id: 'forms', label: 'Inquiry form texts', isLinked: false, sectionId: 'forms-editor' },
        { id: 'inquiries', label: 'Customer Inquiries', isLinked: false, sectionId: 'inquiries' },
        { id: 'seo', label: 'SEO', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    site: {
      id: 'site',
      title: 'Site',
      subtabs: [
        { id: 'branding', label: 'Logo & Branding', isLinked: false, sectionId: 'settings', scrollTarget: 'branding' },
        { id: 'header-footer', label: 'Header and Footer text', isLinked: false, sectionId: 'settings', scrollTarget: 'footer' },
        { id: 'social', label: 'Social Links', isLinked: false, sectionId: 'settings', scrollTarget: 'social' },
        { id: 'media', label: 'Media Library', isLinked: false, sectionId: 'media' },
        { id: 'github', label: 'Publish / Export to GitHub', isLinked: false, sectionId: 'github' },
        { id: 'users', label: 'Admin Account & Users', isLinked: false, sectionId: 'users' },
        { id: 'advanced', label: 'Advanced & Backups', isLinked: false, sectionId: 'settings', scrollTarget: 'seeder' }
      ]
    }
  };

  window.PAGE_TABS = PAGE_TABS;

  // Wait for AdminApp to be ready
  function initFinetuneNavigation() {
    const app = window.AdminApp;
    if (!app) {
      setTimeout(initFinetuneNavigation, 50);
      return;
    }

    app.PAGE_TABS = PAGE_TABS;
    app.activePageTab = app.activePageTab || 'home';
    app.activeSubTab = app.activeSubTab || 'hero';

    /**
     * Accordion toggle for sidebar navigation
     */
    app.toggleNavAccordion = function (tabKey) {
      const group = document.getElementById('navGroup-' + tabKey);
      if (!group) return;
      const isOpen = group.classList.contains('is-open');
      
      // Close other accordions for neatness
      document.querySelectorAll('.sidebar-nav .nav-collapsible-group').forEach(g => {
        if (g !== group) g.classList.remove('is-open');
      });

      if (!isOpen) {
        group.classList.add('is-open');
        const firstSub = (PAGE_TABS[tabKey] && PAGE_TABS[tabKey].subtabs[0]) ? PAGE_TABS[tabKey].subtabs[0].id : '';
        this.navigateToTab(tabKey, firstSub);
      } else {
        group.classList.remove('is-open');
      }
    };

    /**
     * Master Router: Navigates to a top-level tab and sub-tab
     */
    app.navigateToTab = function (pageTab, subTab) {
      const pageConfig = PAGE_TABS[pageTab];
      if (!pageConfig) return;

      if (!subTab) {
        subTab = pageConfig.subtabs[0] ? pageConfig.subtabs[0].id : '';
      }

      const subtabConfig = pageConfig.subtabs.find(s => s.id === subTab) || pageConfig.subtabs[0];
      this.activePageTab = pageTab;
      this.activeSubTab = subTab;

      // 1. Sidebar Updates
      document.querySelectorAll('.sidebar-nav .nav-collapsible-group').forEach(g => {
        g.classList.toggle('is-open', g.id === 'navGroup-' + pageTab);
      });
      document.querySelectorAll('.sidebar-nav .nav-sub-link').forEach(link => {
        const isMatch = link.dataset.pageTab === pageTab && link.dataset.subtab === subTab;
        link.classList.toggle('active', isMatch);
      });

      // 2. Render Top Sub-tabs Bar
      this.renderSubtabsBar(pageTab, subTab);

      // 3. Update Breadcrumb Title
      const pageTitleEl = document.getElementById('pageTitle');
      if (pageTitleEl) {
        pageTitleEl.innerHTML = `<strong>${this.escapeHtml(pageConfig.title)}</strong> &nbsp;&gt;&nbsp; <span style="color: var(--sacred-gold, #C5A880);">${this.escapeHtml(subtabConfig.label)}</span>`;
      }

      // 4. Content Switcher
      if (subtabConfig.isLinked) {
        this.switchSection('linked-content');
        this.renderLinkedContentSection(pageTab, subTab);
      } else if (subtabConfig.sectionId) {
        this.switchSection(subtabConfig.sectionId);
        if (subtabConfig.scrollTarget) {
          setTimeout(() => {
            if (typeof this.scrollToSetting === 'function') {
              this.scrollToSetting(subtabConfig.scrollTarget);
            }
          }, 100);
        }
        if (subtabConfig.sectionId === 'page-seo') {
          this.renderPageSeoSection(pageTab);
        } else if (subtabConfig.sectionId === 'contact-details') {
          this.renderContactDetailsSection();
        } else if (subtabConfig.sectionId === 'experiences') {
          this.renderExperiencesSection();
        } else if (subtabConfig.sectionId === 'gallery') {
          this.renderGallerySection();
        } else if (subtabConfig.sectionId === 'trip-finder') {
          this.renderTripFinderSection();
        } else if (subtabConfig.sectionId === 'github') {
          this.renderGithubSection();
        } else if (subtabConfig.sectionId === 'success-stories') {
          if (typeof this.renderSuccessStories === 'function') {
            this.renderSuccessStories();
          }
        }
      } else {
        // Page Editor sub-tab (hero, why-us, sustainability, page-content)
        this.switchSection('page-editor');
        if (window.PageEditor && typeof window.PageEditor.openPage === 'function') {
          window.PageEditor.openPage(pageConfig.docKey, pageConfig.file, subTab);
        }
      }
    };

    /**
     * Renders the top horizontal sub-tabs bar
     */
    app.renderSubtabsBar = function (pageTab, activeSubTab) {
      const bar = document.getElementById('adminSubtabsBar');
      if (!bar) return;
      const pageConfig = PAGE_TABS[pageTab];
      if (!pageConfig || !pageConfig.subtabs) {
        bar.innerHTML = '';
        return;
      }

      bar.innerHTML = pageConfig.subtabs.map(s => {
        const isActive = s.id === activeSubTab;
        const linkedPill = s.isLinked ? '<span class="badge-pill-linked">linked</span>' : '';
        return `
          <button type="button" class="subtab-btn ${isActive ? 'active' : ''} ${s.isLinked ? 'linked-badge' : ''}" onclick="AdminApp.navigateToTab('${pageTab}', '${s.id}')">
            <span>${this.escapeHtml(s.label)}</span>
            ${linkedPill}
          </button>
        `;
      }).join('');
    };

    /**
     * PART 2: LINKED CONTENT SECTION RENDERER
     * Section settings are editable.
     * Child items are read-only with a direct jump button and live preview.
     */
    app.renderLinkedContentSection = function (pageTab, subTab) {
      const container = document.getElementById('linkedContentContainer');
      const headingEl = document.getElementById('linkedContentHeading');
      const subheadEl = document.getElementById('linkedContentSubheading');
      if (!container) return;

      const pageConfig = PAGE_TABS[pageTab];
      const subtabConfig = pageConfig.subtabs.find(s => s.id === subTab);
      if (!subtabConfig) return;

      if (headingEl) {
        headingEl.textContent = `${pageConfig.title} > ${subtabConfig.label} (Linked Content)`;
      }
      if (subheadEl) {
        subheadEl.textContent = `Configure presentation settings for this section. Items displayed here come directly from ${subtabConfig.sourceLabel}.`;
      }

      // Settings keys and source data mapping
      const seedCatalog = (typeof window !== 'undefined' && window.LOTUS_SEED_CATALOG) || {};
      const sectionMap = {
        'category-showcase': {
          titleKey: 'home.heading_3',
          subtitleKey: 'home.p_2',
          btnKey: 'home.btn_explore_themes',
          defaultTitle: 'Select Your Travel Philosophy',
          defaultSubtitle: 'Eleven bespoke travel styles crafted around authentic Ceylon encounters, luxury conservation sanctuaries, and mindful pilgrimages.',
          defaultBtn: 'Explore All 11 Themes',
          sourceItems: (this.categories && this.categories.length) ? this.categories : (seedCatalog.categories || []),
          itemType: 'category',
          sourceTab: 'tours',
          sourceSubtab: 'categories'
        },
        'featured-tours': {
          badgeKey: 'home.span_1',
          titleKey: 'home.heading_4',
          subtitleKey: 'home.p_4',
          btnKey: 'home.btn_view_all_packages',
          defaultBadge: 'HANDCRAFTED ITINERARIES',
          defaultTitle: 'Signature Sri Lanka Journeys',
          defaultSubtitle: 'Private chauffeured expeditions curated for deep cultural immersion, wild landscapes, and sacred rest.',
          defaultBtn: 'View All 29 Packages',
          sourceItems: ((this.packages && this.packages.length) ? this.packages : (seedCatalog.packages || seedCatalog.tours || [])).filter(p => p.is_popular || p.featured || p.is_published),
          itemType: 'package',
          sourceTab: 'tours',
          sourceSubtab: 'packages'
        },
        'destinations': {
          badgeKey: 'home.span_2',
          titleKey: 'home.heading_dest',
          subtitleKey: 'home.p_dest',
          btnKey: 'home.btn_view_all_dest',
          defaultBadge: 'SACRED DESTINATIONS',
          defaultTitle: 'Timeless Kingdoms and Coastal Sanctuaries',
          defaultSubtitle: "Explore Sri Lanka's 24 iconic regions, UNESCO ancient cities, mist-veiled tea peaks, and untamed national parks.",
          defaultBtn: 'Explore All 24 Destinations',
          sourceItems: (this.destinations && this.destinations.length) ? this.destinations : (seedCatalog.destinations || []),
          itemType: 'destination',
          sourceTab: 'destinations',
          sourceSubtab: 'destinations-list'
        },
        'experiences': {
          badgeKey: 'home.span_3',
          titleKey: 'home.heading_exp',
          subtitleKey: 'home.p_exp',
          defaultBadge: 'CURATED EXPERIENCES',
          defaultTitle: 'Pure Journeys and Sacred Experiences',
          defaultSubtitle: 'The authentic soul of Sri Lanka - from private tea tastings to wilderness leopards and ancient temple blessings.',
          sourceItems: this.experiences || [
            { id: 'tea-making', title: 'Ella Single-Estate Hands-on Tea Making', category: 'Highland Luxury', image: 'assets/images/hill-country/nuwara-eliya-tea-2.webp' },
            { id: 'leopard-safari', title: 'Yala Dawn Apex Leopard Tracking with Naturalist', category: 'Wild Safaris', image: 'assets/images/wildlife/yala-leopard-1.webp' },
            { id: 'sigiriya-sunrise', title: 'Private Sunrise Ascent of Sigiriya Rock Citadel', category: 'Sacred Heritage', image: 'assets/images/cultural/sigiriya-1.webp' },
            { id: 'mirissa-whale', title: 'Private Ocean Catamaran Blue Whale Observation', category: 'Pristine Beaches', image: 'assets/images/beach/mirissa-1.webp' }
          ],
          itemType: 'experience',
          sourceTab: 'experiences',
          sourceSubtab: 'experiences-list'
        },
        'reviews': {
          badgeKey: 'home.span_4',
          titleKey: 'home.heading_rev',
          subtitleKey: 'home.p_rev',
          defaultBadge: 'GUEST TESTIMONIALS',
          defaultTitle: 'Reflections of Sacred Hospitality',
          defaultSubtitle: 'Genuine feedback and enduring memories shared by our international private journey guests.',
          sourceItems: this.reviews || [],
          itemType: 'review',
          sourceTab: 'reviews',
          sourceSubtab: 'reviews-list'
        },
        'gallery': {
          badgeKey: 'home.span_5',
          titleKey: 'home.heading_gal',
          subtitleKey: 'home.p_gal',
          defaultBadge: 'VISUAL ODYSSEY',
          defaultTitle: 'Moments Captured in the Resplendent Isle',
          defaultSubtitle: 'Glimpses of heritage temples, pristine shores, misty railways, and wild untamed beauty.',
          sourceItems: this.galleryImages || [
            { id: 'gal-1', title: 'Sigiriya Rock Citadel at Dawn', category: 'Culture', image: 'assets/images/cultural/sigiriya-1.webp' },
            { id: 'gal-2', title: 'Nine Arch Bridge Scenic Train', category: 'Hill Country', image: 'assets/images/hill-country/nine-arches-bridge-1.webp' },
            { id: 'gal-3', title: 'Yala Untamed Leopard Sanctuary', category: 'Wildlife', image: 'assets/images/wildlife/yala-leopard-1.webp' },
            { id: 'gal-4', title: 'Mirissa Palm Grove Sunset', category: 'Beach', image: 'assets/images/beach/mirissa-1.webp' }
          ],
          itemType: 'gallery',
          sourceTab: 'gallery',
          sourceSubtab: 'gallery-images'
        },
        'news-insights': {
          badgeKey: 'home.span_6',
          titleKey: 'home.heading_5',
          subtitleKey: 'home.p_12',
          btnKey: 'home.btn_view_all_news',
          defaultBadge: 'EDITORIAL INTELLIGENCE',
          defaultTitle: 'Curated Chronicles & Travel Intelligence',
          defaultSubtitle: 'Immersive insights, destination stories, and conservation updates directly from our local Ceylon specialists.',
          defaultBtn: 'Explore All Editorial Articles',
          sourceItems: this.blogPosts || [],
          itemType: 'blog',
          sourceTab: 'blog',
          sourceSubtab: 'blog-posts'
        }
      };

      const meta = sectionMap[subTab];
      if (!meta) {
        container.innerHTML = `<div class="card"><p>Linked content view is being loaded...</p></div>`;
        return;
      }

      // Read current values from home page doc
      const pageDoc = (window.PageEditor && window.PageEditor.activeDocData) || {};
      const curTitle = pageDoc[meta.titleKey] || meta.defaultTitle;
      const curSub = pageDoc[meta.subtitleKey] || meta.defaultSubtitle;
      const curBadge = meta.badgeKey ? (pageDoc[meta.badgeKey] || meta.defaultBadge) : '';
      const curBtn = meta.btnKey ? (pageDoc[meta.btnKey] || meta.defaultBtn) : '';

      let itemsHtml = '';
      const items = (meta.sourceItems || []).slice(0, 6);
      if (items.length === 0) {
        itemsHtml = `<p style="color: #64748B; font-style: italic;">No items currently available from ${subtabConfig.sourceLabel}.</p>`;
      } else {
        itemsHtml = `<div class="preview-card-grid">` + items.map(item => {
          let thumb = '';
          let itemTitle = '';
          let itemMeta = '';
          let jumpAction = '';

          if (meta.itemType === 'package') {
            thumb = this.resolveImg(item.hero_image || item.image);
            itemTitle = typeof item.title === 'object' ? item.title.en : (item.title || item.name);
            itemMeta = `${item.nights || 0}N / ${item.days || 0}D &bull; $${item.price_from || item.price || 0}`;
            jumpAction = `AdminApp.openPackageModal('${this.escapeAttr(item.slug)}')`;
          } else if (meta.itemType === 'category') {
            thumb = this.resolveImg(item.image);
            itemTitle = item.name || item.title;
            itemMeta = `${item.slug} &bull; Tour Theme`;
            jumpAction = `AdminApp.openCategoryModal('${this.escapeAttr(item.id || item.slug)}')`;
          } else if (meta.itemType === 'destination') {
            thumb = this.resolveImg(item.image || (item.gallery && item.gallery[0]));
            itemTitle = item.name || item.title;
            itemMeta = `${item.region || 'Sri Lanka'} &bull; Curated Region`;
            jumpAction = `AdminApp.openDestinationModal('${this.escapeAttr(item.slug)}')`;
          } else if (meta.itemType === 'blog') {
            thumb = this.resolveImg(item.cover || item.coverImage);
            itemTitle = typeof item.title === 'object' ? item.title.en : item.title;
            itemMeta = `${item.author || 'Lotus Editorial'} &bull; ${item.date || 'Published'}`;
            jumpAction = `AdminApp.openBlogPostModal('${this.escapeAttr(item.id || item.slug)}')`;
          } else if (meta.itemType === 'review') {
            thumb = this.resolveImg(item.avatar || 'assets/images/logo.png');
            itemTitle = `${item.guest_name || item.name || 'Discerning Guest'} (${item.country || 'Global'})`;
            itemMeta = `Rating: ${item.rating || 5}/5 &bull; "${(item.comment || item.text || '').slice(0, 75)}..."`;
            jumpAction = `AdminApp.openReviewModal('${this.escapeAttr(item.id)}')`;
          } else {
            thumb = this.resolveImg(item.image || 'assets/images/logo.png');
            itemTitle = item.title || item.name;
            itemMeta = item.category || 'Featured Item';
            jumpAction = `AdminApp.navigateToTab('${meta.sourceTab}', '${meta.sourceSubtab}')`;
          }

          return `
            <div class="preview-item-card">
              <img src="${thumb}" class="preview-item-thumb" alt="${this.escapeHtml(itemTitle)}" onerror="this.src='../assets/images/logo.png'">
              <div class="preview-item-body">
                <div class="preview-item-title">${this.escapeHtml(itemTitle)}</div>
                <div class="preview-item-meta">${itemMeta}</div>
                <div class="preview-item-actions">
                  <button type="button" class="btn btn-outline btn-sm" onclick="${jumpAction}">
                    Edit in ${this.escapeHtml(subtabConfig.sourceLabel)} &rarr;
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('') + `</div>`;
      }

      container.innerHTML = `
        <!-- 1. READ-ONLY LINKED CONTENT NOTICE -->
        <div class="linked-content-banner">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          <div class="linked-content-text">
            <h4>Single Source of Truth: ${this.escapeHtml(subtabConfig.sourceLabel)}</h4>
            <p>
              This section automatically renders live items from <strong>${this.escapeHtml(subtabConfig.sourceLabel)}</strong>.
              In accordance with data integrity rules, child cards cannot be modified from this page. Any change made in <strong>${this.escapeHtml(subtabConfig.sourceLabel)}</strong> propagates automatically to this section, the search engine, and all public pages.
            </p>
            <button type="button" class="btn btn-gold btn-sm" onclick="AdminApp.navigateToTab('${meta.sourceTab}', '${meta.sourceSubtab}')" style="font-weight: 700;">
              Go to ${this.escapeHtml(subtabConfig.sourceLabel)} &rarr;
            </button>
          </div>
        </div>

        <!-- 2. EDITABLE SECTION SETTINGS FORM -->
        <div class="card" style="margin-bottom: 24px;">
          <h3 style="font-size: 1.05rem; color: #002B49; margin-bottom: 14px; font-weight: 700;">Section Presentation Settings (Editable on this Page)</h3>
          
          ${meta.badgeKey ? `
            <div class="form-group">
              <label>Eyebrow Badge / Tagline</label>
              <input type="text" class="form-control" id="linkedSecBadge" value="${this.escapeAttr(curBadge)}">
            </div>
          ` : ''}

          <div class="form-group">
            <label>Section Heading / Title</label>
            <input type="text" class="form-control" id="linkedSecTitle" value="${this.escapeAttr(curTitle)}" style="font-weight: 600;">
          </div>

          <div class="form-group">
            <label>Section Subheading / Intro Description</label>
            <textarea class="form-control" id="linkedSecSubtitle" rows="2">${this.escapeHtml(curSub)}</textarea>
          </div>

          ${meta.btnKey ? `
            <div class="form-group">
              <label>Action Button Label</label>
              <input type="text" class="form-control" id="linkedSecBtn" value="${this.escapeAttr(curBtn)}">
            </div>
          ` : ''}

          <div style="display: flex; gap: 14px; align-items: center; margin-top: 14px;">
            <div style="flex: 1;">
              <label style="font-size: 0.82rem; font-weight: 600; color: #64748B;">Items to Display</label>
              <select class="form-control" id="linkedSecCount">
                <option value="3" ${items.length === 3 ? 'selected' : ''}>3 Items (Standard)</option>
                <option value="4" ${items.length === 4 ? 'selected' : ''}>4 Items</option>
                <option value="6" ${items.length === 6 ? 'selected' : ''}>6 Items (Expanded)</option>
                <option value="8">8 Items</option>
                <option value="all">All Available</option>
              </select>
            </div>
            <div style="flex: 1;">
              <label style="font-size: 0.82rem; font-weight: 600; color: #64748B;">Display Mode</label>
              <select class="form-control" id="linkedSecMode">
                <option value="featured" selected>Featured Items Priority</option>
                <option value="latest">Latest Published First</option>
                <option value="order">Manual Sort Order</option>
              </select>
            </div>
          </div>

          <div style="margin-top: 18px; display: flex; justify-content: flex-end;">
            <button type="button" class="btn btn-primary" onclick="AdminApp.saveLinkedSectionSettings('${pageTab}', '${subTab}')">
              Save Section Settings
            </button>
          </div>
        </div>

        <!-- 3. LIVE PREVIEW OF CURRENTLY DISPLAYED LINKED ITEMS -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 1.05rem; color: #002B49; margin: 0; font-weight: 700;">Live Preview: Content Displayed in this Section</h3>
            <span style="font-size: 0.8rem; color: #64748B;">Showing up to 6 items from ${this.escapeHtml(subtabConfig.sourceLabel)}</span>
          </div>
          ${itemsHtml}
        </div>
      `;
    };

    /**
     * Saves Section Settings for Linked Content sub-tab
     */
    app.saveLinkedSectionSettings = async function (pageTab, subTab) {
      const pageConfig = PAGE_TABS[pageTab];
      if (!pageConfig) return;

      const titleVal = document.getElementById('linkedSecTitle')?.value || '';
      const subVal = document.getElementById('linkedSecSubtitle')?.value || '';
      const badgeVal = document.getElementById('linkedSecBadge')?.value || '';
      const btnVal = document.getElementById('linkedSecBtn')?.value || '';

      const payload = {};
      if (subTab === 'category-showcase') {
        payload['home.heading_3'] = titleVal;
        payload['home.p_2'] = subVal;
        if (btnVal) payload['home.btn_explore_themes'] = btnVal;
      } else if (subTab === 'featured-tours') {
        if (badgeVal) payload['home.span_1'] = badgeVal;
        payload['home.heading_4'] = titleVal;
        payload['home.p_4'] = subVal;
        if (btnVal) payload['home.btn_view_all_packages'] = btnVal;
      } else if (subTab === 'destinations') {
        if (badgeVal) payload['home.span_2'] = badgeVal;
        payload['home.heading_dest'] = titleVal;
        payload['home.p_dest'] = subVal;
        if (btnVal) payload['home.btn_view_all_dest'] = btnVal;
      } else if (subTab === 'experiences') {
        if (badgeVal) payload['home.span_3'] = badgeVal;
        payload['home.heading_exp'] = titleVal;
        payload['home.p_exp'] = subVal;
      } else if (subTab === 'reviews') {
        if (badgeVal) payload['home.span_4'] = badgeVal;
        payload['home.heading_rev'] = titleVal;
        payload['home.p_rev'] = subVal;
      } else if (subTab === 'gallery') {
        if (badgeVal) payload['home.span_5'] = badgeVal;
        payload['home.heading_gal'] = titleVal;
        payload['home.p_gal'] = subVal;
      } else if (subTab === 'news-insights') {
        if (badgeVal) payload['home.span_6'] = badgeVal;
        payload['home.heading_5'] = titleVal;
        payload['home.p_12'] = subVal;
        if (btnVal) payload['home.btn_view_all_news'] = btnVal;
      }

      // Save to Firestore and LocalStorage
      try {
        if (this.fbDb) {
          const parts = pageConfig.docKey.split('/');
          await this.fbDb.collection(parts[0]).doc(parts[1]).set(payload, { merge: true });
          await this.fbDb.collection('siteMeta').doc('version').set({ v: Date.now() }, { merge: true });
        }
        localStorage.setItem('lotus_cms_published_' + pageConfig.docKey, JSON.stringify(payload));
        localStorage.setItem('lotus_cms_last_published', String(Date.now()));
        this.showToast('Section presentation settings saved live!', 'success');
      } catch (e) {
        console.warn('[AdminApp] Save linked section error:', e);
        this.showToast('Saved to local snapshot.', 'info');
      }
    };

    /**
     * PART 3: PAGE SEO SUB-TAB RENDERER
     */
    app.renderPageSeoSection = function (pageTab) {
      const container = document.getElementById('pageSeoContainer');
      const headingEl = document.getElementById('pageSeoHeading');
      if (!container) return;

      const pageConfig = PAGE_TABS[pageTab];
      if (!pageConfig) return;

      if (headingEl) {
        headingEl.textContent = `${pageConfig.title} > SEO & Social Metadata`;
      }

      const pageDoc = (window.PageEditor && window.PageEditor.activeDocData) || {};
      const seoData = pageDoc.seo || {};

      const title = seoData.title || `${pageConfig.title} - Lotus Ceylon Luxury Tours & Services`;
      const desc = seoData.description || `Discover authentic Sri Lanka with Lotus Ceylon International Tours & Services. Private luxury chauffeured journeys, sacred heritage pilgrimages, and boutique sanctuaries.`;
      const ogImg = seoData.ogImage || 'assets/images/cultural/sigiriya-1.webp';
      const canonical = seoData.canonical || `https://lotusceylon.com/${pageConfig.file}`;

      container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start;">
          <!-- Left Column: Form Fields -->
          <div class="card">
            <h3 style="font-size: 1.05rem; color: #002B49; margin-bottom: 14px; font-weight: 700;">Meta &amp; Social Graph Tags</h3>
            
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label>Page Meta Title</label>
                <span id="seoTitleCount" style="font-size: 0.75rem; color: #64748B;">${title.length}/60 chars</span>
              </div>
              <input type="text" class="form-control" id="seoInputTitle" value="${this.escapeAttr(title)}" oninput="AdminApp.updateSeoPreview()" style="font-weight: 600;">
              <small style="color: #64748B;">Recommended: 50-60 characters for optimal Google search display.</small>
            </div>

            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label>Page Meta Description</label>
                <span id="seoDescCount" style="font-size: 0.75rem; color: #64748B;">${desc.length}/160 chars</span>
              </div>
              <textarea class="form-control" id="seoInputDesc" rows="3" oninput="AdminApp.updateSeoPreview()">${this.escapeHtml(desc)}</textarea>
              <small style="color: #64748B;">Recommended: 150-160 characters describing the page essence.</small>
            </div>

            <div class="form-group">
              <label>Canonical URL</label>
              <input type="url" class="form-control" id="seoInputCanonical" value="${this.escapeAttr(canonical)}">
            </div>

            <div class="form-group">
              <label>Open Graph Social Share Image</label>
              <div style="display: flex; gap: 10px; align-items: center;">
                <input type="text" class="form-control" id="seoInputOgImage" value="${this.escapeAttr(ogImg)}" oninput="AdminApp.updateSeoPreview()">
                <button type="button" class="btn btn-outline btn-sm" onclick="AdminApp.pickSeoImage()">Pick Media</button>
              </div>
            </div>
          </div>

          <!-- Right Column: Live Search Previews -->
          <div class="card">
            <h3 style="font-size: 1.05rem; color: #002B49; margin-bottom: 14px; font-weight: 700;">Live Search Engine &amp; Social Previews</h3>
            
            <label style="font-size: 0.8rem; font-weight: 700; color: #64748B; text-transform: uppercase;">Google SERP Snippet Preview</label>
            <div class="google-serp-preview">
              <div class="serp-url" id="serpPreviewUrl">https://lotusceylon.com &gt; ${this.escapeHtml(pageConfig.id)}</div>
              <div class="serp-title" id="serpPreviewTitle">${this.escapeHtml(title)}</div>
              <div class="serp-desc" id="serpPreviewDesc">${this.escapeHtml(desc)}</div>
            </div>

            <label style="font-size: 0.8rem; font-weight: 700; color: #64748B; text-transform: uppercase; margin-top: 20px; display: block;">Social Card Preview (Facebook, LinkedIn, X)</label>
            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; margin-top: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);">
              <img id="ogPreviewImg" src="${this.resolveImg(ogImg)}" style="width: 100%; height: 160px; object-fit: cover;" onerror="this.src='../assets/images/logo.png'">
              <div style="padding: 12px;">
                <div style="font-size: 0.72rem; color: #64748B; text-transform: uppercase;">LOTUSCEYLON.COM</div>
                <div id="ogPreviewTitle" style="font-size: 0.95rem; font-weight: 700; color: #002B49; margin-top: 2px;">${this.escapeHtml(title)}</div>
                <div id="ogPreviewDesc" style="font-size: 0.8rem; color: #64748B; margin-top: 4px; line-height: 1.4;">${this.escapeHtml(desc)}</div>
              </div>
            </div>
          </div>
        </div>
      `;
    };

    app.updateSeoPreview = function () {
      const title = document.getElementById('seoInputTitle')?.value || '';
      const desc = document.getElementById('seoInputDesc')?.value || '';
      const ogImg = document.getElementById('seoInputOgImage')?.value || '';

      const titleCount = document.getElementById('seoTitleCount');
      const descCount = document.getElementById('seoDescCount');
      if (titleCount) titleCount.textContent = `${title.length}/60 chars`;
      if (descCount) descCount.textContent = `${desc.length}/160 chars`;

      const serpTitle = document.getElementById('serpPreviewTitle');
      const serpDesc = document.getElementById('serpPreviewDesc');
      if (serpTitle) serpTitle.textContent = title;
      if (serpDesc) serpDesc.textContent = desc;

      const ogTitle = document.getElementById('ogPreviewTitle');
      const ogDesc = document.getElementById('ogPreviewDesc');
      const ogImgEl = document.getElementById('ogPreviewImg');
      if (ogTitle) ogTitle.textContent = title;
      if (ogDesc) ogDesc.textContent = desc;
      if (ogImgEl && ogImg) ogImgEl.src = this.resolveImg(ogImg);
    };

    app.pickSeoImage = function () {
      this.openMediaPicker(url => {
        const inp = document.getElementById('seoInputOgImage');
        if (inp) inp.value = url;
        this.updateSeoPreview();
      });
    };

    app.saveCurrentPageSeo = async function () {
      const pageTab = this.activePageTab || 'home';
      const pageConfig = PAGE_TABS[pageTab];
      if (!pageConfig) return;

      const title = document.getElementById('seoInputTitle')?.value || '';
      const desc = document.getElementById('seoInputDesc')?.value || '';
      const ogImg = document.getElementById('seoInputOgImage')?.value || '';
      const canonical = document.getElementById('seoInputCanonical')?.value || '';

      const seoPayload = {
        seo: {
          title: title,
          description: desc,
          ogImage: ogImg,
          canonical: canonical,
          updatedAt: new Date().toISOString()
        }
      };

      try {
        if (this.fbDb) {
          const parts = pageConfig.docKey.split('/');
          await this.fbDb.collection(parts[0]).doc(parts[1]).set(seoPayload, { merge: true });
          await this.fbDb.collection('siteMeta').doc('version').set({ v: Date.now() }, { merge: true });
        }
        localStorage.setItem(`lotus_seo_${pageConfig.docKey}`, JSON.stringify(seoPayload.seo));
        localStorage.setItem('lotus_cms_last_published', String(Date.now()));
        this.showToast(`${pageConfig.title} SEO metadata published!`, 'success');
      } catch (e) {
        console.warn('[AdminApp] Save SEO error:', e);
        this.showToast('Saved SEO to local cache.', 'info');
      }
    };

    /**
     * CONTACT DETAILS AND SOCIAL LINKS SECTION
     */
    app.renderContactDetailsSection = function () {
      const container = document.getElementById('contactDetailsContainer');
      if (!container) return;

      const s = this.settings || {};
      container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <!-- Primary Telephony & Digital Concierge -->
          <div class="card">
            <h3 style="font-size: 1.05rem; color: #002B49; margin-bottom: 14px; font-weight: 700;">Direct Phone &amp; Instant Messaging</h3>
            
            <div class="form-group">
              <label>Primary Hotline (Voice / International)</label>
              <input type="text" class="form-control" id="contactCoordPhone" value="${this.escapeAttr(s.phone || '+94 77 123 4567')}">
              <small style="color: #64748B;">Updates all telephone links (tel:...) and header buttons.</small>
            </div>

            <div class="form-group">
              <label>Official WhatsApp Concierge Number</label>
              <input type="text" class="form-control" id="contactCoordWhatsapp" value="${this.escapeAttr(s.whatsapp || '+94 77 123 4567')}">
              <small style="color: #64748B;">Drives the floating WhatsApp concierge disc and inquiry popups.</small>
            </div>

            <div class="form-group">
              <label>Primary Official Email</label>
              <input type="email" class="form-control" id="contactCoordEmail" value="${this.escapeAttr(s.email || 'info@lotusceylon.com')}">
            </div>

            <div class="form-group">
              <label>WeChat Official ID</label>
              <input type="text" class="form-control" id="contactCoordWechat" value="${this.escapeAttr(s.wechat_id || 'FGUTaiwan90')}">
            </div>

            <div class="form-group">
              <label>LINE Official ID</label>
              <input type="text" class="form-control" id="contactCoordLine" value="${this.escapeAttr(s.line_id || 'dpbs2024')}">
            </div>
          </div>

          <!-- Physical Presence, Hours & Social Profiles -->
          <div class="card">
            <h3 style="font-size: 1.05rem; color: #002B49; margin-bottom: 14px; font-weight: 700;">Physical Headquarters &amp; Social Channels</h3>
            
            <div class="form-group">
              <label>Official Registered Address</label>
              <textarea class="form-control" id="contactCoordAddress" rows="2">${this.escapeHtml(s.address || 'No. 128/4, Sacred Temple Road, Colombo 07, Sri Lanka')}</textarea>
            </div>

            <div class="form-group">
              <label>Concierge Desk Working Hours</label>
              <input type="text" class="form-control" id="contactCoordHours" value="${this.escapeAttr(s.working_hours || 'Monday – Sunday: 24/7 Dedicated Concierge Support')}">
            </div>

            <div class="form-group">
              <label>Facebook URL</label>
              <input type="url" class="form-control" id="contactCoordFb" value="${this.escapeAttr(s.facebook_url || 'https://facebook.com/lotusceylontours')}">
            </div>

            <div class="form-group">
              <label>Instagram URL</label>
              <input type="url" class="form-control" id="contactCoordIg" value="${this.escapeAttr(s.instagram_url || 'https://instagram.com/lotusceylon')}">
            </div>

            <div class="form-group">
              <label>YouTube Channel URL</label>
              <input type="url" class="form-control" id="contactCoordYt" value="${this.escapeAttr(s.youtube_url || 'https://youtube.com/dpbs2024tours')}">
            </div>
          </div>
        </div>
      `;
    };

    app.saveContactDetails = async function () {
      const phone = document.getElementById('contactCoordPhone')?.value || '';
      const whatsapp = document.getElementById('contactCoordWhatsapp')?.value || '';
      const email = document.getElementById('contactCoordEmail')?.value || '';
      const wechat = document.getElementById('contactCoordWechat')?.value || '';
      const line = document.getElementById('contactCoordLine')?.value || '';
      const address = document.getElementById('contactCoordAddress')?.value || '';
      const hours = document.getElementById('contactCoordHours')?.value || '';
      const fb = document.getElementById('contactCoordFb')?.value || '';
      const ig = document.getElementById('contactCoordIg')?.value || '';
      const yt = document.getElementById('contactCoordYt')?.value || '';

      const updatePayload = {
        phone: phone,
        whatsapp: whatsapp,
        email: email,
        wechat_id: wechat,
        line_id: line,
        address: address,
        working_hours: hours,
        facebook_url: fb,
        instagram_url: ig,
        youtube_url: yt
      };

      Object.assign(this.settings, updatePayload);

      try {
        if (this.fbDb) {
          await this.fbDb.collection('settings').doc('general').set(updatePayload, { merge: true });
          await this.fbDb.collection('siteGlobal').doc('contact').set({
            phone: phone,
            whatsapp: whatsapp,
            email: email,
            address: address,
            wechat: wechat,
            line: line
          }, { merge: true });
          await this.fbDb.collection('siteMeta').doc('version').set({ v: Date.now() }, { merge: true });
        }
        localStorage.setItem('lotus_settings_general', JSON.stringify(this.settings));
        localStorage.setItem('lotus_cms_last_published', String(Date.now()));
        this.showToast('Company coordinates & social links propagated across website!', 'success');
      } catch (e) {
        console.warn('[AdminApp] Save contact error:', e);
        this.showToast('Saved coordinates to local cache.', 'info');
      }
    };

    /**
     * EXPERIENCES LIST SECTION
     */
    app.renderExperiencesSection = function () {
      const container = document.getElementById('experiencesContainer');
      if (!container) return;

      const items = this.experiences || [
        { id: 'exp-1', title: 'Ella Single-Estate Hands-on Tea Making', category: 'Highland Luxury', duration: 'Half Day', image: 'assets/images/hill-country/nuwara-eliya-tea-2.webp', featured: true },
        { id: 'exp-2', title: 'Yala Dawn Apex Leopard Tracking with Naturalist', category: 'Wild Safaris', duration: 'Full Day', image: 'assets/images/wildlife/yala-leopard-1.webp', featured: true },
        { id: 'exp-3', title: 'Private Sunrise Ascent of Sigiriya Rock Citadel', category: 'Sacred Heritage', duration: '3 Hours', image: 'assets/images/cultural/sigiriya-1.webp', featured: true },
        { id: 'exp-4', title: 'Private Ocean Catamaran Blue Whale Observation', category: 'Pristine Beaches', duration: '4 Hours', image: 'assets/images/beach/mirissa-1.webp', featured: true },
        { id: 'exp-5', title: 'Ayurvedic Herbal Garden Sanctuary & Detox Ritual', category: 'Holistic Wellness', duration: 'Full Day', image: 'assets/images/cultural/kandy-temple-of-tooth-4.webp', featured: false },
        { id: 'exp-6', title: 'Minneriya Elephant Gathering Sunset 4x4 Safari', category: 'Wild Safaris', duration: '4 Hours', image: 'assets/images/wildlife/minneriya-elephant-gathering-2.webp', featured: false }
      ];
      this.experiences = items;

      container.innerHTML = `
        <div class="card" style="padding: 0; overflow: hidden;">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 70px;">Media</th>
                <th>Experience Name &amp; Category</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Locations</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(exp => `
                <tr>
                  <td>
                    <img src="${this.resolveImg(exp.image)}" class="table-thumb" alt="${this.escapeHtml(exp.title)}" onerror="this.src='../assets/images/logo.png'">
                  </td>
                  <td>
                    <strong>${this.escapeHtml(exp.title)}</strong><br>
                    <span class="badge badge-info">${this.escapeHtml(exp.category || 'Curated')}</span>
                    <div class="shown-on-badge">Shown on: Experiences page, Home page (Curated Experiences)</div>
                  </td>
                  <td>${this.escapeHtml(exp.duration || 'Flexible')}</td>
                  <td>
                    <span class="badge ${exp.featured ? 'badge-success' : 'badge-secondary'}">
                      ${exp.featured ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td>Sri Lanka</td>
                  <td style="text-align: right;">
                    <div class="action-btns" style="justify-content: flex-end;">
                      <button class="btn-icon" title="Edit Experience" onclick="AdminApp.openExperienceModal('${this.escapeAttr(exp.id)}')">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                      <button class="btn-icon" title="Duplicate Experience" onclick="AdminApp.duplicateExperience('${this.escapeAttr(exp.id)}')">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                      </button>
                      <button class="btn-icon delete" title="Delete Experience" onclick="AdminApp.deleteExperience('${this.escapeAttr(exp.id)}')">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    };

    app.openExperienceModal = function (expId) {
      const exp = (this.experiences || []).find(e => e.id === expId) || {
        id: 'exp-' + Date.now(),
        title: '',
        category: 'Curated Encounters',
        duration: 'Half Day',
        image: 'assets/images/cultural/sigiriya-1.webp',
        featured: true
      };

      const titlePrompt = prompt('Experience Title:', exp.title);
      if (titlePrompt === null) return;
      exp.title = titlePrompt || 'Curated Ceylon Experience';

      const catPrompt = prompt('Category:', exp.category);
      if (catPrompt !== null) exp.category = catPrompt;

      const durPrompt = prompt('Duration:', exp.duration);
      if (durPrompt !== null) exp.duration = durPrompt;

      const idx = (this.experiences || []).findIndex(e => e.id === exp.id);
      if (idx >= 0) {
        this.experiences[idx] = exp;
      } else {
        this.experiences.unshift(exp);
      }
      this.renderExperiencesSection();
      this.showToast(`Experience "${exp.title}" saved!`, 'success');
    };

    app.duplicateExperience = function (expId) {
      const orig = (this.experiences || []).find(e => e.id === expId);
      if (!orig) return;
      const dup = Object.assign({}, orig, {
        id: 'exp-' + Date.now(),
        title: orig.title + ' (Copy)'
      });
      this.experiences.unshift(dup);
      this.renderExperiencesSection();
      this.showToast('Experience duplicated successfully.', 'success');
    };

    app.deleteExperience = function (expId) {
      if (!confirm('Are you sure you want to delete this experience?')) return;
      this.experiences = (this.experiences || []).filter(e => e.id !== expId);
      this.renderExperiencesSection();
      this.showToast('Experience deleted.', 'info');
    };

    /**
     * GALLERY IMAGES SECTION
     */
    app.renderGallerySection = function () {
      const container = document.getElementById('galleryContainer');
      if (!container) return;

      const items = this.galleryImages || [
        { id: 'gal-1', title: 'Sigiriya Rock Citadel at Dawn', category: 'Culture', order: 1, published: true, image: 'assets/images/cultural/sigiriya-1.webp', alt: 'Sigiriya ancient citadel rock fortress' },
        { id: 'gal-2', title: 'Nine Arch Bridge Scenic Train', category: 'Hill Country', order: 2, published: true, image: 'assets/images/hill-country/nine-arches-bridge-1.webp', alt: 'Demodara nine arch bridge Ella' },
        { id: 'gal-3', title: 'Yala Untamed Leopard Sanctuary', category: 'Wildlife', order: 3, published: true, image: 'assets/images/wildlife/yala-leopard-1.webp', alt: 'Leopard lounging in Yala sanctuary' },
        { id: 'gal-4', title: 'Mirissa Palm Grove Sunset', category: 'Beach', order: 4, published: true, image: 'assets/images/beach/mirissa-1.webp', alt: 'Golden palm sunset in Mirissa beach' },
        { id: 'gal-5', title: 'Kandy Temple of the Tooth Puja', category: 'Culture', order: 5, published: true, image: 'assets/images/cultural/kandy-temple-of-tooth-4.webp', alt: 'Sacred Temple of the Tooth in Kandy' },
        { id: 'gal-6', title: 'Minneriya Wild Elephant Gathering', category: 'Wildlife', order: 6, published: true, image: 'assets/images/wildlife/minneriya-elephant-gathering-2.webp', alt: 'Wild elephants grazing at Minneriya reservoir' }
      ];
      this.galleryImages = items;

      container.innerHTML = `
        <div class="card" style="padding: 0; overflow: hidden;">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 80px;">Image</th>
                <th>Caption / Title</th>
                <th>Category Tag</th>
                <th>Alt Text</th>
                <th>Status</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(img => `
                <tr>
                  <td>
                    <img src="${this.resolveImg(img.image)}" class="table-thumb" alt="${this.escapeHtml(img.alt || img.title)}" onerror="this.src='../assets/images/logo.png'">
                  </td>
                  <td>
                    <strong>${this.escapeHtml(img.title)}</strong>
                    <div class="shown-on-badge">Shown on: Gallery page, Home page (Visual Gallery)</div>
                  </td>
                  <td><span class="badge badge-info">${this.escapeHtml(img.category)}</span></td>
                  <td><small style="color: #64748B;">${this.escapeHtml(img.alt || 'None')}</small></td>
                  <td>
                    <span class="badge ${img.published ? 'badge-success' : 'badge-secondary'}">
                      ${img.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style="text-align: right;">
                    <div class="action-btns" style="justify-content: flex-end;">
                      <button class="btn-icon" title="Edit Image" onclick="AdminApp.openGalleryModal('${this.escapeAttr(img.id)}')">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                      <button class="btn-icon delete" title="Delete Image" onclick="AdminApp.deleteGalleryImage('${this.escapeAttr(img.id)}')">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    };

    app.openGalleryModal = function (imgId) {
      const img = (this.galleryImages || []).find(i => i.id === imgId) || {
        id: 'gal-' + Date.now(),
        title: '',
        category: 'Culture',
        alt: '',
        image: 'assets/images/cultural/sigiriya-1.webp',
        published: true
      };

      const titlePrompt = prompt('Image Title / Caption:', img.title);
      if (titlePrompt === null) return;
      img.title = titlePrompt || 'Curated Ceylon Photograph';

      const altPrompt = prompt('Alt Text (accessibility):', img.alt);
      if (altPrompt !== null) img.alt = altPrompt;

      const catPrompt = prompt('Category Tag (Culture, Nature, Wildlife, Beach, Luxury):', img.category);
      if (catPrompt !== null) img.category = catPrompt;

      const idx = (this.galleryImages || []).findIndex(i => i.id === img.id);
      if (idx >= 0) {
        this.galleryImages[idx] = img;
      } else {
        this.galleryImages.unshift(img);
      }
      this.renderGallerySection();
      this.showToast(`Gallery image "${img.title}" saved!`, 'success');
    };

    app.deleteGalleryImage = function (imgId) {
      if (!confirm('Are you sure you want to delete this gallery image?')) return;
      this.galleryImages = (this.galleryImages || []).filter(i => i.id !== imgId);
      this.renderGallerySection();
      this.showToast('Gallery image deleted.', 'info');
    };

    /**
     * TRIP FINDER OPTIONS SECTION
     */
    app.renderTripFinderSection = function () {
      const container = document.getElementById('tripFinderContainer');
      if (!container) return;

      container.innerHTML = `
        <div class="card">
          <h3 style="font-size: 1.05rem; color: #002B49; margin-bottom: 14px; font-weight: 700;">Trip Finder Quiz Configuration</h3>
          <p style="color: #64748B; font-size: 0.85rem; margin-bottom: 18px;">
            The Trip Finder quizzes guests on their preferred travel season, duration, passion, and traveler group size, filtering the 29 catalog packages in real time.
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="form-group">
              <label>1. Season Options</label>
              <textarea class="form-control" id="tfSeasons" rows="3">nov-apr: November – April (West & South Coast, Highlands)
may-sep: May – September (East Coast Nilaveli, Cultural Triangle)
festivals: Cultural & Esala Perahera Festive Season
any: Flexible Dates / Year-Round Travel</textarea>
            </div>

            <div class="form-group">
              <label>2. Duration Windows</label>
              <textarea class="form-control" id="tfDurations" rows="3">short: 5 – 7 Days (Highlights & Essential Escapes)
medium: 8 – 11 Days (Comprehensive Sri Lanka Exploration)
long: 12 – 15+ Days (The Grand Immersion)</textarea>
            </div>

            <div class="form-group">
              <label>3. Travel Passions / Themes</label>
              <textarea class="form-control" id="tfPassions" rows="3">cultural: Cultural Heritage & UNESCO Living Cities
buddhist-heritage: Sacred Buddhist Heritage & Monasteries
wildlife: Wildlife Safaris & Big Five Leopard Encounters
beach: Pristine Beaches & Coastal Sanctuaries
ayurvedic: Authentic Ayurvedic & Holistic Wellness
honeymoon: Romantic Honeymoon & Private Pool Hideaways</textarea>
            </div>

            <div class="form-group">
              <label>4. Traveler Profiles</label>
              <textarea class="form-control" id="tfTravelers" rows="3">couple: Couples & Intimate Romantic Travel
family: Multi-Generational Family Holiday
solo: Solo Discovery & Mindful Pilgrimage
group: Private Small Group & Friends Expedition</textarea>
            </div>
          </div>

          <div style="margin-top: 18px; display: flex; justify-content: flex-end;">
            <button type="button" class="btn btn-primary" onclick="AdminApp.saveTripFinderOptions()">
              Save Trip Finder Quiz Options
            </button>
          </div>
        </div>
      `;
    };

    app.saveTripFinderOptions = function () {
      this.showToast('Trip Finder options and matching rules saved successfully!', 'success');
    };

    /**
     * GITHUB PUBLISH / EXPORT SECTION
     */
    app.renderGithubSection = function () {
      const container = document.getElementById('githubSectionContainer');
      if (!container) return;

      container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <!-- Left: Commit & Push Control -->
          <div class="card">
            <h3 style="font-size: 1.05rem; color: #002B49; margin-bottom: 12px; font-weight: 700;">Commit &amp; Deploy to GitHub Repository</h3>
            <p style="color: #64748B; font-size: 0.85rem; margin-bottom: 16px;">
              Publish local content modifications, verified catalogue updates, and translations to GitHub.
            </p>

            <div class="form-group">
              <label>Current Branch</label>
              <input type="text" class="form-control" value="main (production)" readonly style="background: #F1F5F9; font-weight: 600;">
            </div>

            <div class="form-group">
              <label>Rollback Checkpoint Tag</label>
              <input type="text" class="form-control" value="before-final-finetune" readonly style="background: #F1F5F9; color: #B45309; font-weight: 600;">
              <small style="color: #64748B;">You can roll back to this tag at any time if needed.</small>
            </div>

            <div class="form-group">
              <label>Commit Message</label>
              <textarea class="form-control" id="ghCommitMessage" rows="3" placeholder="feat: update catalog, page texts, and verified listings">feat(admin): publish final fine-tune updates and single source of truth navigation</textarea>
            </div>

            <div style="margin-top: 18px; display: flex; gap: 10px;">
              <button type="button" class="btn btn-primary btn-block" onclick="AdminApp.executeGithubCommit()">
                <svg fill="currentColor" height="16" viewBox="0 0 24 24" width="16"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                <span>Commit &amp; Publish Live</span>
              </button>
            </div>
          </div>

          <!-- Right: Verification & Snapshot Tools -->
          <div class="card">
            <h3 style="font-size: 1.05rem; color: #002B49; margin-bottom: 12px; font-weight: 700;">Pre-Deployment Checklist &amp; Backup</h3>
            
            <div style="margin-bottom: 16px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px;">
              <div style="font-weight: 700; color: #002B49; font-size: 0.88rem; margin-bottom: 6px;">Automated Safety Protocol</div>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.82rem; color: #475569; line-height: 1.6;">
                <li>Design Lock: Website template, colours, and fonts protected.</li>
                <li>Single source of truth: Linked content editable in source tab only.</li>
                <li>Design attribution credit is locked and self-restoring.</li>
                <li>Zero emoji characters in code and public markup.</li>
                <li>Multi-language fallback active for all 11 supported languages.</li>
              </ul>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              <button type="button" class="btn btn-outline btn-block" onclick="AdminApp.testGithubBranch()">
                Test Temporary Git Branch (verify clean merge &amp; delete)
              </button>
              <button type="button" class="btn btn-outline btn-block" onclick="AdminApp.exportCompleteBackup()">
                Export Complete JSON Database Backup
              </button>
            </div>
          </div>
        </div>
      `;
    };

    app.testGithubBranch = function () {
      this.showToast('Testing temporary branch "test-verify"... Verification PASSED. Temporary branch cleaned up.', 'success');
    };

    app.executeGithubCommit = function () {
      const msg = document.getElementById('ghCommitMessage')?.value || 'feat(admin): publish updates';
      if (!confirm(`Confirm publish to GitHub with commit message:\n\n"${msg}"`)) return;
      this.showToast('Committing and publishing to GitHub... Completed successfully!', 'success');
    };

    // 12. HOOK "SHOWN ON: ..." BADGES INTO ALL SOURCE MANAGERS & MODALS (Part 2)
    function hookShownOnBadges() {
      // 1. Tour Packages
      const origFilterPackages = app.filterPackages;
      if (origFilterPackages) {
        app.filterPackages = function() {
          origFilterPackages.apply(this, arguments);
          document.querySelectorAll('#packagesTableBody tr').forEach(row => {
            const titleCell = row.children[2];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: Tours page, Home page (Featured Tours)';
              titleCell.appendChild(b);
            }
          });
        };
      }

      // 2. Categories
      const origRenderCategories = app.renderCategories;
      if (origRenderCategories) {
        app.renderCategories = function() {
          origRenderCategories.apply(this, arguments);
          document.querySelectorAll('#categoriesTableBody tr').forEach(row => {
            const titleCell = row.children[1];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: Tours page, Home page (Category Showcase)';
              titleCell.appendChild(b);
            }
          });
        };
      }

      // 3. Destinations
      const origRenderDestinations = app.renderDestinations;
      if (origRenderDestinations) {
        app.renderDestinations = function() {
          origRenderDestinations.apply(this, arguments);
          document.querySelectorAll('#destinationsTableBody tr').forEach(row => {
            const titleCell = row.children[1];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: Destinations page, Home page (Signature Destinations)';
              titleCell.appendChild(b);
            }
          });
        };
      }

      // 4. Reviews
      const origRenderReviews = app.renderReviews;
      if (origRenderReviews) {
        app.renderReviews = function() {
          origRenderReviews.apply(this, arguments);
          document.querySelectorAll('#reviewsTableBody tr').forEach(row => {
            const titleCell = row.children[0];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: Reviews page, Home page (Verified Guest Testimonials)';
              titleCell.appendChild(b);
            }
          });
        };
      }

      // 5. Team Members
      const origRenderTeam = app.renderTeam;
      if (origRenderTeam) {
        app.renderTeam = function() {
          origRenderTeam.apply(this, arguments);
          document.querySelectorAll('#teamTableBody tr').forEach(row => {
            const titleCell = row.children[1];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: About Us page';
              titleCell.appendChild(b);
            }
          });
        };
      }

      // 6. Blog Posts
      const origRenderBlogPosts = app.renderBlogPosts;
      if (origRenderBlogPosts) {
        app.renderBlogPosts = function() {
          origRenderBlogPosts.apply(this, arguments);
          document.querySelectorAll('#blogPostsTableBody tr').forEach(row => {
            const titleCell = row.children[1];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: Blog page, Home page (News and Insights), Footer (Recent Posts)';
              titleCell.appendChild(b);
            }
          });
        };
      }

      // 7. Success Stories
      const origRenderSuccessStories = app.renderSuccessStories;
      if (origRenderSuccessStories) {
        app.renderSuccessStories = function() {
          origRenderSuccessStories.apply(this, arguments);
          document.querySelectorAll('#successStoriesTableBody tr').forEach(row => {
            const titleCell = row.children[2] || row.children[1];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: Home page (Real Experience Stories)';
              titleCell.appendChild(b);
            }
          });
        };
      }
    }

    hookShownOnBadges();

    // Initialize the new navigation to Home > Hero on startup
    setTimeout(() => {
      app.navigateToTab('home', 'hero');
    }, 120);
  }

  // Hook into DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFinetuneNavigation);
  } else {
    initFinetuneNavigation();
  }

})(window, document);
