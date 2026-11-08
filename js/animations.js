/*
 * © 2026 Infinite Design. All rights reserved.
 * Built for Lotus Ceylon International Tours & Services (Pvt) Ltd.
 * Unauthorized removal of attribution does not transfer ownership of this code.
 * https://infiniteweb.dev/
 *
 * UNIFIED WIPE-IN & FADE-UP ANIMATION ENGINE
 * Supports all 10 languages (EN, ZH-TW, ZH-CN, FR, DE, RU, ES, IT, JA, AR [RTL], HI, VI)
 */

(function () {
  'use strict';

  // 1. Accessibility Check: prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable all animations immediately, allow CSS fallback to display content cleanly
    return;
  }

  // 2. Strict Exclusion Filter (DO NOT ANIMATE)
  function shouldSkip(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return true;
    if (el.closest('header, #siteHeader, .site-header-walkers, nav, .walkers-nav, .mobile-nav-fullscreen')) return true;
    if (el.closest('.custom-lang-pill, #langPillToggle, #langPillMenu, .mobile-lang-section, #mobileLangGrid, [data-lang]')) return true;
    if (el.closest('footer, #siteFooter, .site-footer-walkers')) return true;
    if (el.closest('form, label, input, textarea, select, .form-group, .field-wrap')) return true;
    if (el.closest('.unified-fab-group, #whatsappFab, #phoneFab')) return true;
    return false;
  }

  // 3. Dynamic Fixed Header Height Synchronizer (--header-h)
  function syncHeaderHeight() {
    const header = document.querySelector('.site-header-walkers') || document.querySelector('header');
    if (header) {
      const rect = header.getBoundingClientRect();
      const h = Math.round(rect.height);
      if (h > 0) {
        document.documentElement.style.setProperty('--header-h', `${h}px`);
      }
    }
  }

  // 4. Element Animation Execution
  function animateElement(el, type) {
    if (!el || el.classList.contains('is-animated')) return;

    const animType = type || el.getAttribute('data-anim') || 'wipe';
    const durationMs = animType === 'fade' ? 750 : 950;

    // Apply will-change only while animating
    el.classList.add('is-animating');

    // Force style recalculation to guarantee transition fires smoothly
    void el.offsetWidth;

    el.classList.add('is-animated');

    // Reset will-change after transition completes to preserve GPU memory
    setTimeout(function () {
      el.classList.remove('is-animating');
    }, durationMs);
  }

  // 5. Scroll IntersectionObserver for Section Headings & Body Content
  let scrollObserver = null;

  function initObserver() {
    if (scrollObserver) return;
    if (!('IntersectionObserver' in window)) {
      // Fallback: If browser lacks IntersectionObserver, reveal immediately
      document.querySelectorAll('[data-anim]').forEach(function (el) {
        el.classList.add('is-animated');
      });
      return;
    }

    scrollObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const target = entry.target;
          animateElement(target);
          observer.unobserve(target); // Play ONCE only
        }
      });
    }, {
      threshold: 0.2, // Viewport entry threshold 0.2 as specified
      rootMargin: '0px 0px -40px 0px'
    });
  }

  // 6. Hero Banner Sequence Engine (Badge, H1 per line, Paragraph, Buttons)
  function setupHeroSequence(heroSection) {
    if (!heroSection || heroSection.hasAttribute('data-hero-initialized')) return;
    heroSection.setAttribute('data-hero-initialized', 'true');

    const heroItems = [];

    // Step 1: Breadcrumb (if present)
    const breadcrumb = heroSection.querySelector(
      '.beach-breadcrumb, .category-breadcrumb, .tours-breadcrumbs, .hero-breadcrumbs, .tour-breadcrumb, nav[aria-label*="Breadcrumb"]'
    );
    if (breadcrumb && !shouldSkip(breadcrumb)) {
      breadcrumb.setAttribute('data-anim', 'wipe');
      heroItems.push({ el: breadcrumb, order: 1 });
    }

    // Step 2: Badge Pill
    const badge = heroSection.querySelector(
      '.banner-subtitle-badge, .sacred-badge-tag, .about-badge, .hero-badge, .legal-hero-badge, .tour-badge-pill-walkers, .badge, [class*="badge"], .notfound-eyebrow'
    );
    if (badge && !shouldSkip(badge) && badge !== breadcrumb) {
      badge.setAttribute('data-anim', 'wipe');
      heroItems.push({ el: badge, order: 2 });
    }

    // Step 3: H1 (per line)
    const h1 = heroSection.querySelector(
      'h1, .banner-main-title, .about-hero-title, .beach-hero-title, .tours-hero-title, .hero-title, .tour-title-walkers, .heading--60, .notfound-title'
    );
    if (h1 && !shouldSkip(h1)) {
      const mainSpan = h1.querySelector('.hero-title-main');
      const accentSpan = h1.querySelector('.hero-title-accent');

      if (mainSpan && accentSpan) {
        // Multi-line via span structure
        mainSpan.setAttribute('data-anim', 'wipe');
        mainSpan.classList.add('hero-line');
        heroItems.push({ el: mainSpan, order: 3 });

        accentSpan.setAttribute('data-anim', 'wipe');
        accentSpan.classList.add('hero-line');
        heroItems.push({ el: accentSpan, order: 4 });
      } else if (h1.innerHTML.indexOf('<br') !== -1 && h1.children.length === 0) {
        // Multi-line via <br> in plain text
        const parts = h1.innerHTML.split(/<br\s*\/?>/i);
        if (parts.length >= 2) {
          h1.innerHTML = parts
            .map(function (p) {
              return `<span class="hero-line" data-anim="wipe">${p.trim()}</span>`;
            })
            .join('<br>');
          const newSpans = h1.querySelectorAll('.hero-line');
          newSpans.forEach(function (sp, i) {
            heroItems.push({ el: sp, order: 3 + i });
          });
        } else {
          h1.setAttribute('data-anim', 'wipe');
          heroItems.push({ el: h1, order: 3 });
        }
      } else {
        // Single heading or complex CMS wrapper
        h1.setAttribute('data-anim', 'wipe');
        heroItems.push({ el: h1, order: 3 });
      }
    }

    // Step 4: Hero Paragraph
    const p = heroSection.querySelector(
      '.banner-text-inner p, .banner-content-wrap p, .about-hero-sub, .beach-hero-lead, .tours-hero-lead, .hero-slogan, .tour-desc-walkers p, .destination-detail-hero p, .legal-hero-sub, .contact-hero p, .dest-hero p, .exp-hero p, .gallery-hero p, .reviews-hero p, .blog-hero p, .notfound-desc, .hero-lead, .paragraph--20'
    );
    if (p && !shouldSkip(p)) {
      p.setAttribute('data-anim', 'wipe');
      heroItems.push({ el: p, order: 5 });
    }

    // Step 5: CTA Buttons Row
    const ctaRow = heroSection.querySelector(
      '.banner-actions, .about-hero-actions, .beach-hero-cta-row, .notfound-actions, .hero-cta-row, .cta-btn-group, .tour-overview-walkers .wrapper--70 > div[style*="display: flex"]'
    );
    if (ctaRow && !shouldSkip(ctaRow)) {
      ctaRow.setAttribute('data-anim', 'wipe');
      heroItems.push({ el: ctaRow, order: 6 });
    }

    // Sort items by designated sequence order
    heroItems.sort(function (a, b) {
      return a.order - b.order;
    });

    // Reveal one after another with 0.15s stagger and 0.9s ease-out
    const INITIAL_HERO_DELAY_MS = 120;
    const HERO_STAGGER_MS = 150; // 0.15s stagger

    heroItems.forEach(function (item, index) {
      const delay = INITIAL_HERO_DELAY_MS + index * HERO_STAGGER_MS;
      setTimeout(function () {
        animateElement(item.el, 'wipe');
      }, delay);
    });
  }

  // 7. Auto-tag and Observe Non-Hero Elements
  function scanAndObserveElements(root) {
    const scope = root || document;
    initObserver();

    // A) Section headings and subtitles: wipe-in
    const headings = scope.querySelectorAll(
      'h2, h3, .section-title, .section-subtitle, .heading--48, .heading--36, .heading--32, .walkers-brand-heading, .experience-pillar-title, .itinerary-heading-walkers'
    );
    headings.forEach(function (h) {
      if (shouldSkip(h) || h.closest('[data-hero="true"], .banner-section, .about-hero, .dest-hero, .exp-hero, .gallery-hero, .reviews-hero, .blog-hero, .contact-hero, .legal-hero, .hero-banner, .destination-detail-hero, .tours-hero-banner, .banner-section-inner, .beach-hero-banner, .tour-banner-walkers, .notfound-section')) {
        return;
      }
      if (!h.hasAttribute('data-anim')) {
        h.setAttribute('data-anim', 'wipe');
      }
      if (scrollObserver && !h.classList.contains('is-animated')) {
        scrollObserver.observe(h);
      }
    });

    // B) Cards, Images, Body paragraphs: simple fade-up (opacity + translateY 20px) 0.7s
    const cards = scope.querySelectorAll(
      '.tour-card, .dest-card, .blog-card, .review-card, .category-card, .experience-card, .destination-card, .package-card, [class*="-card"], .lotus-pillar-card, .overview-card, .itinerary-card, .grid-item, .luxury-feature-card, .highlight-card, .value-card, .walkers-acc-item, .faq-item'
    );
    cards.forEach(function (card) {
      if (shouldSkip(card) || card.closest('header, footer, form')) return;
      if (!card.hasAttribute('data-anim')) {
        card.setAttribute('data-anim', 'fade');
      }
      if (scrollObserver && !card.classList.contains('is-animated')) {
        scrollObserver.observe(card);
      }
    });

    // Content Images (exclude logos, icons, flags)
    const images = scope.querySelectorAll(
      'main img, article img, section:not(.banner-section) img'
    );
    images.forEach(function (img) {
      if (shouldSkip(img)) return;
      if (
        img.classList.contains('header-brand-logo') ||
        img.classList.contains('footer-logo') ||
        img.classList.contains('flag-img') ||
        img.classList.contains('hero-img-bg') ||
        img.getAttribute('width') === '40' ||
        img.getAttribute('width') === '38'
      ) {
        return;
      }
      // If image is inside a card that is already animated, skip individual image animation
      if (img.closest('[data-anim]')) return;

      if (!img.hasAttribute('data-anim')) {
        img.setAttribute('data-anim', 'fade');
      }
      if (scrollObserver && !img.classList.contains('is-animated')) {
        scrollObserver.observe(img);
      }
    });

    // Body Paragraphs (outside cards and forms)
    const paragraphs = scope.querySelectorAll(
      'main > section > p, .site-container > p, .wrapper--80 > p, .wrapper--70 > p, .article-body p, .content-block p'
    );
    paragraphs.forEach(function (p) {
      if (shouldSkip(p)) return;
      if (p.closest('[data-anim]')) return;
      if (!p.hasAttribute('data-anim')) {
        p.setAttribute('data-anim', 'fade');
      }
      if (scrollObserver && !p.classList.contains('is-animated')) {
        scrollObserver.observe(p);
      }
    });

    // C) Explicitly marked elements: [data-anim="wipe"], [data-anim="fade"]
    // (Ensures admin-panel-driven content with data-anim is automatically observed)
    const explicit = scope.querySelectorAll('[data-anim]:not(.is-animated)');
    explicit.forEach(function (el) {
      if (shouldSkip(el)) return;
      if (scrollObserver) {
        scrollObserver.observe(el);
      }
    });
  }

  // 8. Main Initialization
  function init() {
    try {
      // Synchronize header height
      syncHeaderHeight();

      // Enable animation mode on document
      document.documentElement.classList.add('js-anim-ready');

      // Locate Hero banner
      const heroSection = document.querySelector(
        '.banner-section, .about-hero, .dest-hero, .exp-hero, .gallery-hero, .reviews-hero, .blog-hero, .contact-hero, .legal-hero, .hero-banner, .destination-detail-hero, .tours-hero-banner, .banner-section-inner, .beach-hero-banner, .tour-banner-walkers, .notfound-section, [data-hero="true"]'
      );

      if (heroSection) {
        setupHeroSequence(heroSection);
      }

      // Check for Tour Package Detail overview section (Section 2)
      const tourOverview = document.querySelector('.tour-overview-walkers');
      if (tourOverview && !tourOverview.hasAttribute('data-hero-initialized')) {
        setupHeroSequence(tourOverview);
      }

      // Scan and observe all other sections, headings, cards, and images
      scanAndObserveElements(document);

      // 9. Dynamic Content Watcher (Admin Panel & CMS integration)
      if ('MutationObserver' in window) {
        const mutObs = new MutationObserver(function (mutations) {
          let hasNewNodes = false;
          for (let i = 0; i < mutations.length; i++) {
            if (mutations[i].addedNodes && mutations[i].addedNodes.length > 0) {
              hasNewNodes = true;
              break;
            }
          }
          if (hasNewNodes) {
            scanAndObserveElements(document);
          }
        });

        mutObs.observe(document.body, { childList: true, subtree: true });
      }

      // Listen for CMS custom events
      ['cms:ready', 'cms:rendered', 'cms:contentUpdated', 'i18n:translated'].forEach(function (evt) {
        window.addEventListener(evt, function () {
          scanAndObserveElements(document);
        });
      });

      // 10. Fail-Safe Fallback:
      // Guarantee that all elements are made visible after 3.5s so no content is ever stuck hidden
      setTimeout(function () {
        document.querySelectorAll('[data-anim]:not(.is-animated)').forEach(function (el) {
          el.classList.add('is-animated');
        });
      }, 3500);

    } catch (err) {
      console.warn('Animation engine error, reverting to fallback:', err);
      document.documentElement.classList.remove('js-anim-ready');
      document.querySelectorAll('[data-anim]').forEach(function (el) {
        el.classList.add('is-animated');
      });
    }
  }

  // Event Listeners for Lifecycle
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('resize', syncHeaderHeight, { passive: true });
  window.addEventListener('orientationchange', syncHeaderHeight, { passive: true });
  window.addEventListener('load', syncHeaderHeight, { passive: true });

  // Expose API for dynamic admin scripts
  window.LotusAnimations = {
    syncHeaderHeight: syncHeaderHeight,
    scan: scanAndObserveElements,
    animate: animateElement
  };

})();
