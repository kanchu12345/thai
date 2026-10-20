/**
 * LOTUS CEYLON International Tours & Services (Pvt) Ltd
 * Dynamic Public Content Renderer & Multi-Language Translation Engine
 * 
 * Drives all public sections directly from Supabase / Cached Data / Bundled Fallback:
 * - Header menu & Category Mega-Dropdown
 * - Hero banner (headline, intro, CTAs)
 * - Stats counters & Why Book with us
 * - Tour Categories ticker & grid
 * - Tour Packages slider & cards
 * - Guest Reviews & Testimonials
 * - FAQs accordion
 * - Timeline & Milestones
 * - Footer contact info & Infinite Design credits
 * - Dynamic single pages: tours.html?slug=..., category.html?slug=..., blog.html?slug=...
 */

(function (window) {
  'use strict';

  const DynamicRenderer = {
    currentLang: 'en',
    data: {
      settings: {},
      categories: [],
      tours: [],
      reviews: []
    },

    /**
     * Initialize Dynamic Content Rendering
     */
    async init() {
      this.initLanguage();
      await this.loadData();
      this.bindAllSections();
      this.setupLanguageSwitcher();
      this.handleDynamicRouting();
    },

    /**
     * Sanitise rich-text and dynamic HTML using DOMPurify
     */
    safeHtml(html) {
      if (window.DOMPurify && typeof window.DOMPurify.sanitize === 'function') {
        return window.DOMPurify.sanitize(html);
      }
      return html;
    },

    /**
     * Initialize Language Selection
     */
    initLanguage() {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      const savedLang = localStorage.getItem('lotus_preferred_lang');
      this.currentLang = urlLang || savedLang || 'en';

      // Update html lang attribute
      document.documentElement.lang = this.currentLang;
      if (this.currentLang === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    },

    /**
     * Resolve Multilingual Text with Fallback to English
     */
    t(field, obj) {
      if (!obj) return '';
      // Check translations JSON dictionary if available
      if (obj.translations && obj.translations[this.currentLang] && obj.translations[this.currentLang][field]) {
        return obj.translations[this.currentLang][field];
      }
      // Check language-specific keys (e.g., title_zh, title_fr)
      const langKey = `${field}_${this.currentLang}`;
      if (obj[langKey]) return obj[langKey];

      // Fallback to English / default field
      return obj[field] || '';
    },

    /**
     * Load Data from Supabase / Cache / Default Fallback
     */
    async loadData() {
      if (!window.LotusSupabase) return;

      try {
        const [settings, categories, tours, reviews] = await Promise.all([
          window.LotusSupabase.getSiteSettings(),
          window.LotusSupabase.getCategories(),
          window.LotusSupabase.getTours(),
          window.LotusSupabase.getReviews()
        ]);

        this.data.settings = settings || {};
        this.data.categories = categories || [];
        this.data.tours = tours || [];
        this.data.reviews = reviews || [];
      } catch (e) {
        console.warn('[DynamicRenderer] Error loading data:', e);
      }
    },

    /**
     * Bind Content to All Sections on the Page
     */
    bindAllSections() {
      this.renderHeader();
      this.renderHero();
      this.renderAboutAndStats();
      this.renderCategories();
      this.renderPackagesSlider();
      this.renderReviews();
      this.renderFAQ();
      this.renderFooter();
    },

    /**
     * 1. Header Mega Menu & Categories
     */
    renderHeader() {
      const megamenuGrid = document.querySelector('.walkers-megamenu-grid');
      if (megamenuGrid && this.data.categories.length > 0) {
        megamenuGrid.innerHTML = this.data.categories.map(cat => `
          <a href="category.html?slug=${cat.slug}" class="megamenu-cat-card">
            <span class="megamenu-cat-icon">${this.getCategoryIcon(cat.slug)}</span>
            <div class="megamenu-cat-text">
              <span class="megamenu-cat-name">${this.t('name', cat)}</span>
              <span class="megamenu-cat-desc">${this.t('tagline', cat) || this.t('description', cat)}</span>
            </div>
          </a>
        `).join('');
      }

      // Update current language label on header button
      const langLabel = document.getElementById('currentLangLabel') || document.getElementById('currentLangDisplay');
      if (langLabel) {
        langLabel.textContent = this.currentLang.toUpperCase();
      }
    },

    getCategoryIcon(slug) {
      const icons = {
        'cultural-triangle': '🏛️',
        'buddhist-heritage': '☸️',
        'wildlife-safari': '🐆',
        'pristine-beaches': '🏖️',
        'hill-country-tea': '⛰️',
        'authentic-ayurveda': '🌿',
        'romantic-honeymoon': '💍',
        'family-escapes': '👨‍👩‍👧‍👦',
        'adventure-trekking': '🧗‍♂️',
        'ramayana-trail': '🏹'
      };
      return icons[slug] || '✨';
    },

    /**
     * 2. Hero Section
     */
    renderHero() {
      const heroData = (this.data.settings && this.data.settings.hero) || {};
      
      const headlineEl = document.querySelector('.banner-main-title') || document.querySelector('.hero-title');
      if (headlineEl && heroData.headline) {
        headlineEl.innerHTML = heroData.headline.replace('.', '.<br>');
      }

      const introEl = document.querySelector('.banner-text-inner .paragraph--20') || document.querySelector('.hero-slogan');
      if (introEl && heroData.intro) {
        introEl.textContent = heroData.intro;
      }
    },

    /**
     * 3. About & Stats Counters
     */
    renderAboutAndStats() {
      const general = (this.data.settings && this.data.settings.general) || {};

      // Dynamic stats counters if present
      const countUps = document.querySelectorAll('.count-up');
      if (countUps.length >= 4) {
        const years = new Date().getFullYear() - (general.foundedYear || 2014);
        countUps[0].setAttribute('data-target', years);
        countUps[0].textContent = years;
      }
    },

    /**
     * 4. Categories Ticker & Grid
     */
    renderCategories() {
      const catContainer = document.querySelector('.categories-slider-grid');
      if (!catContainer || this.data.categories.length === 0) return;

      catContainer.innerHTML = this.data.categories.map(cat => `
        <a href="category.html?slug=${cat.slug}" class="hover-box">
          <img src="${cat.image_url || 'assets/images/cultural-triangle.jpg'}" class="hover-box__img" alt="${this.t('name', cat)}" loading="lazy" onerror="this.src='assets/images/cultural-triangle.jpg'">
          <div class="hover-box__overlay"></div>
          <div class="hover-box__details">
            <div class="hover-box__details_visible">
              <p class="heading--24 font-color--white all-caps para--white-line">${this.t('name', cat)}</p>
              <small style="color: rgba(255,255,255,0.8);">${this.t('tagline', cat) || ''}</small>
            </div>
            <div class="next-btn next-btn--white">
              <span class="next-btn-circle">➔</span>
              <span>Explore</span>
            </div>
          </div>
        </a>
      `).join('');
    },

    /**
     * 5. Tour Packages Slider & Cards
     */
    renderPackagesSlider() {
      const pkgContainers = document.querySelectorAll('.packages-slider-track, #packagesTrack, .packages-grid');
      if (pkgContainers.length === 0 || this.data.tours.length === 0) return;

      pkgContainers.forEach(container => {
        container.innerHTML = this.data.tours.map(pkg => `
          <div class="package-card-item">
            <div class="pkg-card" style="background: var(--white); border-radius: 12px; overflow: hidden; border: 1px solid rgba(28,27,31,0.08); box-shadow: 0 4px 14px rgba(0,0,0,0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; flex-direction: column; height: 100%;">
              <div class="pkg-card-media" style="position: relative; height: 240px; overflow: hidden;">
                <img src="${pkg.hero_image || 'assets/images/cultural-triangle.jpg'}" alt="${this.t('title', pkg)}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" onerror="this.src='assets/images/cultural-triangle.jpg'">
                ${pkg.is_popular ? '<span class="pkg-popular-badge" style="position: absolute; top: 12px; left: 12px; background: var(--lotus-primary); color: #fff; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Most Popular</span>' : ''}
                <span class="pkg-duration-badge" style="position: absolute; bottom: 12px; right: 12px; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); color: #fff; padding: 4px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 600;">${pkg.nights}N / ${pkg.days}D</span>
              </div>
              <div class="pkg-card-body" style="padding: 20px; display: flex; flex-direction: column; flex: 1;">
                <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--sacred-gold); font-weight: 700; letter-spacing: 1px;">${pkg.category_slug || 'Sri Lanka'}</span>
                <h3 style="font-family: 'Playfair Display', serif; font-size: 1.25rem; margin: 8px 0 10px; line-height: 1.3;"><a href="tours.html?slug=${pkg.slug}" style="color: var(--ink);">${this.t('title', pkg)}</a></h3>
                <p style="color: var(--ink-light); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px; flex: 1;">${(this.t('overview', pkg) || '').slice(0, 110)}...</p>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(28,27,31,0.06); padding-top: 14px; margin-top: auto;">
                  <div>
                    <span style="font-size: 0.75rem; color: var(--ink-muted); display: block;">From</span>
                    <strong style="font-size: 1.2rem; color: var(--lotus-primary); font-family: 'Playfair Display', serif;">$${pkg.price_from || 950}</strong>
                  </div>
                  <a href="tours.html?slug=${pkg.slug}" class="gold-inquire-btn" style="padding: 8px 14px; font-size: 0.82rem;">View Journey →</a>
                </div>
              </div>
            </div>
          </div>
        `).join('');
      });
    },

    /**
     * 6. Reviews & Testimonials
     */
    renderReviews() {
      const reviewContainer = document.querySelector('.reviews-slider-track, #reviewsTrack');
      if (!reviewContainer || this.data.reviews.length === 0) return;

      reviewContainer.innerHTML = this.data.reviews.map(rev => `
        <div class="review-card" style="background: var(--white); padding: 28px; border-radius: 12px; border: 1px solid rgba(212,163,89,0.3); box-shadow: 0 4px 14px rgba(0,0,0,0.04); margin: 10px;">
          <div style="color: #D4A359; font-size: 1.1rem; margin-bottom: 12px;">${'★'.repeat(rev.rating || 5)}</div>
          <p style="font-style: italic; color: var(--ink-light); line-height: 1.6; margin-bottom: 18px; font-size: 0.95rem;">&ldquo;${rev.review_text}&rdquo;</p>
          <div style="border-top: 1px solid rgba(28,27,31,0.08); padding-top: 12px;">
            <strong style="color: var(--ink); font-size: 0.95rem;">${rev.guest_name}</strong>
            <span style="color: var(--ink-muted); font-size: 0.82rem; display: block;">${rev.country || 'International Traveler'} &bull; ${rev.tour_taken || 'Custom Tour'}</span>
          </div>
        </div>
      `).join('');
    },

    /**
     * 7. FAQs Accordion
     */
    renderFAQ() {
      const faqContainer = document.getElementById('faqAccordionContainer');
      if (!faqContainer) return;

      const faqs = [
        {
          q: "Why choose Lotus Ceylon for our Sri Lanka holiday?",
          a: "Since 2014, Lotus Ceylon has delivered bespoke, culturally immersive journeys backed by licensed national chauffeur guides, luxury vehicles, and 24/7 personalized concierge support."
        },
        {
          q: "Can itineraries be completely customized?",
          a: "Yes, 100% of our journeys are tailor-made. We accommodate your preferred pace, hotel categories (boutique, luxury eco-retreats, beach resorts), meal plans, and specific interests."
        },
        {
          q: "What is included in a Lotus Ceylon private tour?",
          a: "Every private tour includes luxury air-conditioned transport, expert English-speaking or multilingual chauffeur-guide, audited boutique hotel accommodations, daily breakfast/meals as selected, all site entrance tickets, and emergency care."
        },
        {
          q: "How do we book and confirm our trip?",
          a: "Simply submit your inquiry on our website or message us on WhatsApp. Our travel designer will prepare a customized proposal and itinerary. Once approved, secure booking is confirmed."
        }
      ];

      faqContainer.innerHTML = faqs.map((faq, i) => `
        <div class="faq-item" style="border-bottom: 1px solid rgba(28,27,31,0.1); padding: 16px 0;">
          <button type="button" class="faq-question" style="width: 100%; text-align: left; background: none; border: none; font-size: 1.05rem; font-weight: 600; color: var(--ink); cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="this.nextElementSibling.classList.toggle('active'); this.querySelector('.faq-icon').textContent = this.nextElementSibling.classList.contains('active') ? '−' : '+';">
            <span>${faq.q}</span>
            <span class="faq-icon" style="font-size: 1.4rem; color: var(--sacred-gold); margin-left: 10px;">+</span>
          </button>
          <div class="faq-answer" style="display: none; padding-top: 10px; color: var(--ink-light); line-height: 1.6; font-size: 0.92rem;">
            <p>${faq.a}</p>
          </div>
        </div>
      `).join('');
    },

    /**
     * 8. Footer & Contact Details
     */
    renderFooter() {
      const general = (this.data.settings && this.data.settings.general) || (window.LOTUS_CONFIG || {});

      // Phone
      document.querySelectorAll('.footer-phone, [data-bind="phone"]').forEach(el => {
        el.textContent = general.phone || '+94 71 54 22 384';
        if (el.tagName === 'A') el.href = `tel:${general.phoneRaw || '94715422384'}`;
      });

      // Email
      document.querySelectorAll('.footer-email, [data-bind="email"]').forEach(el => {
        el.textContent = general.email || 'inquiry@lotusceylon.com';
        if (el.tagName === 'A') el.href = `mailto:${general.email || 'inquiry@lotusceylon.com'}`;
      });

      // Address
      document.querySelectorAll('.footer-address, [data-bind="address"]').forEach(el => {
        el.textContent = general.address ? (general.address.full || general.address) : '286/C, Niwandama South, Ja-Ela, Sri Lanka – 11350';
      });

      // WhatsApp links
      document.querySelectorAll('a[href*="wa.me"], .whatsapp-hotline-link').forEach(el => {
        const phone = general.phoneRaw || '94715422384';
        el.href = `https://wa.me/${phone}`;
      });

      // Designer Credits (Infinite Design)
      const creditEl = document.querySelector('.designer-credit');
      if (creditEl) {
        creditEl.innerHTML = `Designed & Developed by <a href="https://infiniteweb.dev/" target="_blank" rel="noopener" style="color: var(--sacred-gold); font-weight: 600;">Infinite Design</a>`;
      }
    },

    /**
     * Setup 10-Slot Language Switcher Interaction
     */
    setupLanguageSwitcher() {
      document.querySelectorAll('[data-lang]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetLang = btn.getAttribute('data-lang');
          if (targetLang) {
            this.setLanguage(targetLang);
          }
        });
      });
    },

    setLanguage(langCode) {
      this.currentLang = langCode;
      localStorage.setItem('lotus_preferred_lang', langCode);
      document.documentElement.lang = langCode;
      if (langCode === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }

      // Update Active class
      document.querySelectorAll('[data-lang]').forEach(b => {
        b.classList.toggle('is-active', b.getAttribute('data-lang') === langCode);
      });

      // Re-bind sections with translated strings
      this.bindAllSections();
    },

    /**
     * Dynamic Page Routing: Single Tour / Category / Blog
     */
    handleDynamicRouting() {
      const urlParams = new URLSearchParams(window.location.search);
      const slug = urlParams.get('slug');
      const pathname = window.location.pathname;

      if (pathname.includes('tours.html') && slug) {
        this.renderSingleTourPage(slug);
      } else if (pathname.includes('category.html') && slug) {
        this.renderSingleCategoryPage(slug);
      } else if (pathname.includes('blog.html') && slug) {
        this.renderSingleBlogPage(slug);
      }
    },

    /**
     * Render Single Tour Page from Supabase
     */
    renderSingleTourPage(slug) {
      const pkg = this.data.tours.find(t => t.slug === slug);
      const container = document.getElementById('singleTourContainer');
      if (!container || !pkg) return;

      const catalog = document.getElementById('toursCatalogWrapper');
      if (catalog) catalog.style.display = 'none';

      document.title = `${this.t('title', pkg)} | Lotus Ceylon Tours`;

      const markup = `
        <section class="tour-hero-section" style="position: relative; min-height: 55vh; display: flex; align-items: flex-end; background: url('${pkg.hero_image || 'assets/images/cultural-triangle.jpg'}') center/cover no-repeat; padding: 60px 0;">
          <div style="position: absolute; inset: 0; background: linear-gradient(0deg, rgba(28,27,31,0.85) 0%, rgba(28,27,31,0.3) 100%);"></div>
          <div class="wrapper--80" style="position: relative; z-index: 2; color: #fff;">
            <span style="background: var(--sacred-gold); color: var(--ink); padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; text-transform: uppercase;">${pkg.category_slug || 'Signature Tour'}</span>
            <h1 style="font-family: 'Playfair Display', serif; font-size: 2.8rem; margin: 12px 0; color: #fff; line-height: 1.2;">${this.t('title', pkg)}</h1>
            <div style="display: flex; gap: 20px; font-size: 1rem; align-items: center; flex-wrap: wrap;">
              <span>🗓️ <strong>${pkg.nights} Nights / ${pkg.days} Days</strong></span>
              <span>💵 Starting from <strong style="color: var(--sacred-gold); font-size: 1.3rem;">$${pkg.price_from || 950}</strong> per person</span>
              <a href="inquiry-detailed.html?package=${encodeURIComponent(pkg.title)}&slug=${pkg.slug}" class="gold-inquire-btn" style="margin-left: auto;">Book This Private Tour</a>
            </div>
          </div>
        </section>

        <section class="padding-top--70 padding-bottom--70">
          <div class="wrapper--80" style="display: grid; grid-template-columns: 2fr 1fr; gap: 40px;">
            
            <!-- Left: Overview & Itinerary -->
            <div>
              <h2 style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 14px;">Journey Overview</h2>
              <p style="font-size: 1.05rem; line-height: 1.8; color: var(--ink-light); margin-bottom: 30px;">${this.t('overview', pkg)}</p>

              <!-- Highlights -->
              ${Array.isArray(pkg.highlights) && pkg.highlights.length > 0 ? `
                <div style="background: var(--ivory); padding: 24px; border-radius: 12px; border: 1px solid rgba(212,163,89,0.3); margin-bottom: 30px;">
                  <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; margin-bottom: 12px; color: var(--lotus-primary);">Tour Highlights</h3>
                  <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    ${pkg.highlights.map(h => `<li style="display: flex; gap: 8px; font-size: 0.95rem;"><span>✦</span> <span>${h}</span></li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              <!-- Day by Day Itinerary -->
              <h2 style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 20px;">Day-by-Day Itinerary</h2>
              <div class="itinerary-timeline">
                ${Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 ? pkg.itinerary.map((day, idx) => `
                  <div style="border-left: 2px solid var(--sacred-gold); padding-left: 20px; margin-bottom: 24px; position: relative;">
                    <div style="position: absolute; left: -9px; top: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--lotus-primary); border: 2px solid #fff;"></div>
                    <h3 style="font-family: 'Playfair Display', serif; font-size: 1.25rem; margin-bottom: 6px; color: var(--ink);">${day.title || `Day ${idx + 1}`}</h3>
                    <p style="color: var(--ink-light); line-height: 1.6; font-size: 0.95rem; margin-bottom: 8px;">${day.desc || ''}</p>
                    ${day.stay ? `<small style="background: var(--mist); padding: 3px 8px; border-radius: 4px; font-weight: 600; color: var(--ink-light);">Overnight: ${day.stay}</small>` : ''}
                  </div>
                `).join('') : '<p>Detailed daily itinerary customized on request.</p>'}
              </div>
            </div>

            <!-- Right: Booking & Concierge Card -->
            <div>
              <div style="background: var(--white); border: 1px solid var(--border-gold); padding: 30px; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); position: sticky; top: 100px;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 1.4rem; margin-bottom: 10px;">Tailor This Tour</h3>
                <p style="font-size: 0.88rem; color: var(--ink-muted); margin-bottom: 20px;">All packages are 100% customizable to your exact dates, pace and interests.</p>
                
                <a href="inquiry-detailed.html?package=${encodeURIComponent(pkg.title)}&slug=${pkg.slug}" class="btn btn-primary btn-block" style="text-align: center; margin-bottom: 12px; padding: 12px;">Plan This Itinerary</a>
                <a href="https://wa.me/94715422384?text=Hello%20Lotus%20Ceylon!%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg.title)}%20tour." target="_blank" rel="noopener" class="btn btn-block" style="background: #25D366; color: #fff; text-align: center;">Chat on WhatsApp</a>

                <div style="margin-top: 24px; border-top: 1px solid rgba(28,27,31,0.08); padding-top: 16px; font-size: 0.82rem; color: var(--ink-muted);">
                  <p>✔ Private air-conditioned luxury vehicle</p>
                  <p>✔ Licensed English or multilingual guide</p>
                  <p>✔ 24/7 dedicated concierge assistance</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      `;

      container.innerHTML = this.safeHtml(markup);
    },

    /**
     * Render Single Category Page
     */
    renderSingleCategoryPage(slug) {
      const cat = this.data.categories.find(c => c.slug === slug);
      const container = document.getElementById('categoryToursContainer');
      const titleEl = document.getElementById('categoryPageTitle');
      const descEl = document.getElementById('categoryPageDesc');
      if (!cat) return;

      document.title = `${this.t('name', cat)} Tours | Lotus Ceylon`;
      if (titleEl) titleEl.textContent = this.t('name', cat);
      if (descEl) descEl.textContent = this.t('description', cat) || this.t('tagline', cat);

      const matchingTours = this.data.tours.filter(t => t.category_slug === slug);
      if (container) {
        if (matchingTours.length === 0) {
          container.innerHTML = `<p style="text-align: center; padding: 40px; color: var(--ink-muted);">Custom itineraries available on request for this category.</p>`;
          return;
        }
        container.innerHTML = matchingTours.map(pkg => `
          <div class="pkg-card" style="background: var(--white); border-radius: 12px; overflow: hidden; border: 1px solid rgba(28,27,31,0.08); box-shadow: 0 4px 14px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <img src="${pkg.hero_image || 'assets/images/cultural-triangle.jpg'}" alt="${pkg.title}" style="height: 220px; object-fit: cover;">
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.25rem;"><a href="tours.html?slug=${pkg.slug}" style="color: var(--ink);">${this.t('title', pkg)}</a></h3>
              <p style="color: var(--ink-light); font-size: 0.88rem; margin: 10px 0 16px; flex: 1;">${(this.t('overview', pkg) || '').slice(0, 100)}...</p>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(28,27,31,0.06); padding-top: 12px;">
                <strong style="color: var(--lotus-primary);">$${pkg.price_from || 950}</strong>
                <a href="tours.html?slug=${pkg.slug}" class="gold-inquire-btn" style="padding: 6px 12px; font-size: 0.8rem;">Explore →</a>
              </div>
            </div>
          </div>
        `).join('');
      }
    },

    /**
     * Render Single Blog Page
     */
    renderSingleBlogPage(slug) {
      const blogContainer = document.getElementById('singleBlogContainer');
      if (!blogContainer) return;
      blogContainer.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto; padding: 60px 20px;">
          <span style="color: var(--lotus-primary); font-weight: 700; text-transform: uppercase; font-size: 0.8rem;">Lotus Ceylon Travel Insights</span>
          <h1 style="font-family: 'Playfair Display', serif; font-size: 2.4rem; margin: 12px 0 16px;">The Sacred Essence of Ancient Ceylon</h1>
          <p style="color: var(--ink-muted); font-size: 0.85rem; margin-bottom: 24px;">Published by Lotus Ceylon Editorial &bull; 8 min read</p>
          <img src="assets/images/cultural-triangle.jpg" alt="Ancient Ceylon" style="width: 100%; border-radius: 12px; margin-bottom: 30px;">
          <p style="font-size: 1.1rem; line-height: 1.8; color: var(--ink-light); margin-bottom: 20px;">From the sacred peaks of Adam’s Peak to the ancient monastic city of Anuradhapura, Sri Lanka has remained a beacon of Buddhist heritage, tranquil healing, and untouched natural beauty for millennia.</p>
        </div>
      `;
    }
  };

  // Expose to window
  window.DynamicRenderer = DynamicRenderer;

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    DynamicRenderer.init();
  });

})(window);
