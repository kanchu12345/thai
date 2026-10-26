/**
 * LOTUS CEYLON - Master Mobile Navigation & Interaction Controller
 * Handles 100% responsive Android & iOS behaviors:
 * - Slide-in mobile menu with body scroll lock
 * - Tap-to-expand Tours accordion (no hover dependencies)
 * - Android Back button integration (History API popstate)
 * - Auto-close on link tap
 * - VisualViewport keyboard detection (hides floating buttons during input focus)
 * - Mobile Leaflet map touch scroll prevention
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initToursAccordion();
    initAndroidBackNav();
    initVisualViewportKeyboardHandler();
    initBackToTop();
  });

  // --- 1. Mobile Menu Open / Close ---
  function initMobileNav() {
    const hamBtn = document.getElementById('mobileHamToggle');
    const closeBtn = document.getElementById('mobileNavClose');
    const drawer = document.getElementById('mobileNavFullscreen');

    if (!drawer) return;

    function openMenu() {
      drawer.classList.add('is-open');
      document.body.classList.add('menu-open');
      document.documentElement.classList.add('menu-open');
      if (hamBtn) hamBtn.setAttribute('aria-expanded', 'true');
      
      // Push history state so Android Back button closes the menu instead of exiting the page
      if (!history.state || !history.state.mobileMenuOpen) {
        history.pushState({ mobileMenuOpen: true }, '', window.location.href);
      }
    }

    function closeMenu(skipHistory) {
      drawer.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
      if (hamBtn) hamBtn.setAttribute('aria-expanded', 'false');

      if (!skipHistory && history.state && history.state.mobileMenuOpen) {
        history.back();
      }
    }

    if (hamBtn) {
      hamBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (drawer.classList.contains('is-open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
      });
    }

    // Close on backdrop tap (click outside inner content if clicked directly on overlay)
    drawer.addEventListener('click', function(e) {
      if (e.target === drawer) {
        closeMenu();
      }
    });

    // Close on link tap
    const links = drawer.querySelectorAll('a:not(.accordion-toggle)');
    links.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu(true);
      });
    });

    // Expose closeMenu for popstate
    window._closeLotusMobileMenu = closeMenu;
  }

  // --- 2. Tap-to-Expand Tours Accordion ---
  function initToursAccordion() {
    const accordionToggle = document.getElementById('mobileToursToggle');
    const accordionSubmenu = document.getElementById('mobileToursSubmenu');

    if (accordionToggle && accordionSubmenu) {
      accordionToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isOpen = accordionSubmenu.classList.toggle('is-expanded');
        accordionToggle.classList.toggle('is-expanded', isOpen);
        accordionToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
  }

  // --- 3. Android Back Button Interception ---
  function initAndroidBackNav() {
    window.addEventListener('popstate', function(e) {
      const drawer = document.getElementById('mobileNavFullscreen');
      if (drawer && drawer.classList.contains('is-open')) {
        if (typeof window._closeLotusMobileMenu === 'function') {
          window._closeLotusMobileMenu(true);
        }
      }
    });
  }

  // --- 4. VisualViewport Soft Keyboard Detection ---
  function initVisualViewportKeyboardHandler() {
    const floatingGroup = document.querySelector('.unified-fab-group');
    if (!floatingGroup || !window.visualViewport) return;

    let initialHeight = window.visualViewport.height;

    function handleResize() {
      // If viewport shrinks by more than 20%, keyboard is open
      const currentHeight = window.visualViewport.height;
      if (initialHeight - currentHeight > 150) {
        floatingGroup.classList.add('keyboard-hidden');
      } else {
        floatingGroup.classList.remove('keyboard-hidden');
      }
    }

    window.visualViewport.addEventListener('resize', handleResize);

    // Additional focus/blur fallback for older browsers
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(function(el) {
      el.addEventListener('focus', function() {
        floatingGroup.classList.add('keyboard-hidden');
      });
      el.addEventListener('blur', function() {
        setTimeout(function() {
          floatingGroup.classList.remove('keyboard-hidden');
        }, 150);
      });
    });
  }

  // --- 5. Back to Top Smooth Scroll ---
  function initBackToTop() {
    const topBtn = document.getElementById('fabBackToTop');
    if (topBtn) {
      topBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
          topBtn.classList.add('is-visible');
        } else {
          topBtn.classList.remove('is-visible');
        }
      }, { passive: true });
    }
  }

})();
