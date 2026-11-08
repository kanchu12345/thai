/*
 * © 2026 Infinite Design. All rights reserved.
 * Built for Lotus Ceylon International Tours & Services (Pvt) Ltd.
 * Unauthorized removal of attribution does not transfer ownership of this code.
 * https://infiniteweb.dev/
 */
/**
 * Lotus Ceylon - Tours Catalog, Live Search & Trip Finder Engine
 * Single Source of Truth for 11 Themes & 29 Handcrafted Packages.
 */

(function () {
  'use strict';


  // i18n Translation Helper
  function getI18n(key, fallback) {
    try {
      const currentLang = document.documentElement.lang || localStorage.getItem('lotus_lang') || 'en';
      const baseLang = currentLang.split('-')[0];
      if (window.TRANSLATIONS) {
        const dict = window.TRANSLATIONS[currentLang] || window.TRANSLATIONS[baseLang] || window.TRANSLATIONS['en'];
        if (dict && dict.tours && dict.tours[key]) {
          return dict.tours[key];
        }
      }
    } catch (e) {}
    return fallback;
  }

  // State
  let allCategories = [];
  let allPackages = [];
  let currentCategory = 'all';
  let currentSearchQuery = '';
  let searchDebounceTimer = null;

  // Path resolver for relative URLs under /tours/ and GitHub Pages subfolders
  function resolveAssetUrl(path) {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
    const clean = path.replace(/^(\.\.\/|\.\/|\/)+/, '');
    return '../' + clean;
  }

  function resolvePackageUrl(categorySlug, packageSlug) {
    return './' + encodeURIComponent(categorySlug) + '/' + encodeURIComponent(packageSlug) + '/index.html';
  }

  function resolveCategoryUrl(categorySlug) {
    return './' + encodeURIComponent(categorySlug) + '/index.html';
  }

  // Normalization helper (case, space, diacritics)
  function normalizeText(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  // Package Card Component Generator
  function createPackageCardHtml(pkg) {
    const imgUrl = resolveAssetUrl(pkg.image);
    const pkgUrl = resolvePackageUrl(pkg.category, pkg.slug);
    const destPills = (pkg.destinations || [])
      .slice(0, 4)
      .map(d => '<span class="pkg-dest-pill">' + (typeof d === 'string' ? d : d.name) + '</span>')
      .join('');

    return (
      '<article class="lotus-package-card" data-slug="' + pkg.slug + '" data-category="' + pkg.category + '">' +
        '<div class="pkg-card-media">' +
          '<img src="' + imgUrl + '" alt="' + (pkg.title || '').replace(/"/g, '&quot;') + '" loading="lazy" width="400" height="260" class="pkg-card-img">' +
          '<span class="pkg-badge-days">' + pkg.days + ' ' + getI18n('catalog_days', 'Days') + '</span>' +
          '<span class="pkg-badge-cat">' + (pkg.categoryName || pkg.category) + '</span>' +
        '</div>' +
        '<div class="pkg-card-body">' +
          '<h3 class="pkg-card-title">' + (pkg.title || '') + '</h3>' +
          '<p class="pkg-card-desc">' + (pkg.shortDescription || pkg.tagline || '') + '</p>' +
          (destPills ? '<div class="pkg-card-destinations" aria-label="Destinations visited">' + destPills + '</div>' : '') +
          '<div class="pkg-card-footer">' +
            '<a href="' + pkgUrl + '" class="pkg-card-btn" aria-label="View itinerary for ' + (pkg.title || '').replace(/"/g, '&quot;') + '">' +
              '<span>' + getI18n('catalog_view_itinerary', 'View Itinerary') + '</span>' +
              '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
                '<path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
              '</svg>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  // Render Filter Chips
  function renderFilterChips() {
    const chipsContainer = document.getElementById('lotusFilterChips');
    if (!chipsContainer) return;

    let html = '<button type="button" class="lotus-filter-chip' + (currentCategory === 'all' ? ' active' : '') + '" data-cat="all" role="tab" aria-selected="' + (currentCategory === 'all') + '">' +
      (getI18n('catalog_all', 'All Packages')) + ' (' + allPackages.length + ')' +
      '</button>';

    allCategories.forEach(cat => {
      const isSelected = currentCategory === cat.slug;
      const count = (cat.packages && cat.packages.length) ? cat.packages.length : allPackages.filter(p => p.category === cat.slug).length;
      html += '<button type="button" class="lotus-filter-chip' + (isSelected ? ' active' : '') + '" data-cat="' + cat.slug + '" role="tab" aria-selected="' + isSelected + '">' +
        cat.displayName + ' (' + count + ')' +
        '</button>';
    });

    chipsContainer.innerHTML = html;
  }

  // Filter and Render Packages
  function filterAndRenderPackages() {
    const grid = document.getElementById('lotusPackagesGrid');
    const counter = document.getElementById('lotusCatalogCounter');
    const visibleCountEl = document.getElementById('lotusVisibleCount');
    const totalCountEl = document.getElementById('lotusTotalCount');
    const emptyState = document.getElementById('lotusCatalogEmpty');
    const clearBtn = document.getElementById('lotusSearchClear');

    if (clearBtn) {
      clearBtn.style.display = currentSearchQuery.length > 0 ? 'inline-flex' : 'none';
    }

    const normQuery = normalizeText(currentSearchQuery);

    const matches = allPackages.filter(pkg => {
      // Category check
      if (currentCategory !== 'all' && pkg.category !== currentCategory) {
        return false;
      }
      // Search query check
      if (!normQuery) return true;

      const titleNorm = normalizeText(pkg.title);
      const catNorm = normalizeText(pkg.categoryName || pkg.category);
      const descNorm = normalizeText(pkg.shortDescription || pkg.tagline);
      const destNorm = (pkg.destinations || []).map(d => normalizeText(typeof d === 'string' ? d : d.name)).join(' ');
      const highlightNorm = (pkg.highlights || []).map(h => normalizeText(h)).join(' ');

      return (
        titleNorm.includes(normQuery) ||
        catNorm.includes(normQuery) ||
        descNorm.includes(normQuery) ||
        destNorm.includes(normQuery) ||
        highlightNorm.includes(normQuery)
      );
    });

    if (totalCountEl) totalCountEl.textContent = allPackages.length;
    if (visibleCountEl) visibleCountEl.textContent = matches.length;

    if (counter) {
      const txtShowing = getI18n('catalog_showing', 'Showing');
      const txtOf = getI18n('catalog_of', 'of');
      const txtPkgs = getI18n('catalog_packages', 'packages');
      counter.innerHTML = txtShowing + ' <strong id="lotusVisibleCount">' + matches.length + '</strong> ' + txtOf + ' <strong id="lotusTotalCount">' + allPackages.length + '</strong> ' + txtPkgs;
      counter.setAttribute('aria-label', txtShowing + ' ' + matches.length + ' ' + txtOf + ' ' + allPackages.length + ' ' + txtPkgs);
    }

    if (matches.length === 0) {
      if (grid) grid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      if (grid) {
        grid.style.display = 'grid';
        grid.innerHTML = matches.map(createPackageCardHtml).join('');
      }
    }

    // Sync active chip
    document.querySelectorAll('#lotusFilterChips .lotus-filter-chip').forEach(chip => {
      const cat = chip.getAttribute('data-cat');
      const isActive = cat === currentCategory;
      chip.classList.toggle('active', isActive);
      chip.setAttribute('aria-selected', isActive);
    });

    // Update URL params without page reload
    updateUrlParams();
  }

  // Update URL Search Parameters
  function updateUrlParams() {
    try {
      const url = new URL(window.location.href);
      if (currentSearchQuery) {
        url.searchParams.set('q', currentSearchQuery);
      } else {
        url.searchParams.delete('q');
      }

      if (currentCategory && currentCategory !== 'all') {
        url.searchParams.set('cat', currentCategory);
      } else {
        url.searchParams.delete('cat');
      }

      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      // Fallback for older browsers
    }
  }

  // Read URL Search Parameters on load
  function readUrlParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      const cat = params.get('cat');

      if (q) {
        currentSearchQuery = q;
        const searchInput = document.getElementById('lotusPackageSearch');
        if (searchInput) searchInput.value = q;
      }

      if (cat) {
        const found = allCategories.some(c => c.slug === cat);
        if (found || cat === 'all') {
          currentCategory = cat;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  // Setup Event Delegation for Chips and Search
  function setupEventListeners() {
    const searchInput = document.getElementById('lotusPackageSearch');
    const searchForm = document.getElementById('lotusSearchForm');
    const clearBtn = document.getElementById('lotusSearchClear');
    const chipsContainer = document.getElementById('lotusFilterChips');
    const resetBtn = document.getElementById('btnResetFilters');

    if (searchForm) {
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      });

      searchInput.addEventListener('input', function (e) {
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(function () {
          currentSearchQuery = searchInput.value;
          filterAndRenderPackages();
        }, 200);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        currentSearchQuery = '';
        filterAndRenderPackages();
      });
    }

    if (chipsContainer) {
      chipsContainer.addEventListener('click', function (e) {
        const chip = e.target.closest('.lotus-filter-chip');
        if (!chip) return;
        const cat = chip.getAttribute('data-cat');
        if (cat) {
          currentCategory = cat;
          filterAndRenderPackages();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        currentCategory = 'all';
        currentSearchQuery = '';
        if (searchInput) searchInput.value = '';
        filterAndRenderPackages();
      });
    }

    // Sync with browser back/forward buttons
    window.addEventListener('popstate', function () {
      readUrlParams();
      filterAndRenderPackages();
    });
  }

  // Global Trip Finder Quiz Handler
  window.handleFindJourney = function (event) {
    if (event && event.preventDefault) event.preventDefault();

    const season = document.getElementById('quizSeason') ? document.getElementById('quizSeason').value : 'any';
    const duration = document.getElementById('quizDuration') ? document.getElementById('quizDuration').value : 'any';
    const passion = document.getElementById('quizPassion') ? document.getElementById('quizPassion').value : 'any';
    const travelers = document.getElementById('quizTravelers') ? document.getElementById('quizTravelers').value : 'any';

    const resultsContainer = document.getElementById('quizResults');
    const matchesGrid = document.getElementById('quizMatchesGrid');
    const explanationEl = document.getElementById('quizMatchExplanation');

    if (!matchesGrid || !resultsContainer) return;

    const matches = allPackages.filter(pkg => {
      // 1. Duration filter
      if (duration === 'short' && pkg.days > 7) return false;
      if (duration === 'medium' && (pkg.days < 8 || pkg.days > 11)) return false;
      if (duration === 'long' && pkg.days < 12) return false;

      // 2. Passion / Category filter
      if (passion !== 'any' && pkg.category !== passion) return false;

      // 3. Season filter
      if (season !== 'any') {
        const pkgSeason = (pkg.bestSeason || '').toLowerCase();
        if (season === 'nov-apr' && !(pkgSeason.includes('nov') || pkgSeason.includes('year-round') || ['beach', 'wildlife', 'honeymoon', 'golf'].includes(pkg.category))) {
          return false;
        }
        if (season === 'may-sep' && !(pkgSeason.includes('may') || pkgSeason.includes('year-round') || ['beach', 'cultural'].includes(pkg.category))) {
          return false;
        }
        if (season === 'festivals' && !(pkg.destinations || []).some(d => (typeof d === 'string' ? d : d.name).toLowerCase().includes('kandy'))) {
          // Keep if cultural or buddhist-heritage
          if (!['cultural', 'buddhist-heritage'].includes(pkg.category)) return false;
        }
      }

      // 4. Travelers filter
      if (travelers !== 'any' && pkg.travelers && pkg.travelers.length > 0) {
        if (!pkg.travelers.includes(travelers)) {
          // Keep as soft match if small-group or couple
          if (travelers === 'couple' && !pkg.travelers.includes('couple')) return false;
        }
      }

      return true;
    });

    resultsContainer.style.display = 'block';

    if (matches.length > 0) {
      if (explanationEl) {
        explanationEl.textContent = 'Found ' + matches.length + ' curated ' + (matches.length === 1 ? 'itinerary' : 'itineraries') + ' perfectly tailored to your window and travel preferences.';
      }
      matchesGrid.innerHTML = matches.map(createPackageCardHtml).join('');
    } else {
      if (explanationEl) {
        explanationEl.textContent = 'We handcraft completely customized private Ceylon journeys tailored around your exact dates and wishes.';
      }
      matchesGrid.innerHTML = (
        '<div class="quiz-empty-box" style="grid-column: 1 / -1; background: #FFFDF9; border: 1px dashed #C9962B; border-radius: 12px; padding: 2rem; text-align: center;">' +
          '<h5 style="color: #002B49; font-size: 1.1rem; margin-bottom: 0.5rem;">No exact off-the-shelf match found</h5>' +
          '<p style="color: #64748B; font-size: 0.92rem; max-width: 540px; margin: 0 auto 1.25rem;">Our master Ceylon travel designers specialize in creating bespoke, 100% private journeys tailored to your exact dates, travel party, and pace.</p>' +
          '<a href="../inquiry-detailed.html" class="gold-inquire-btn" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.75rem; text-decoration: none; border-radius: 8px;">' +
            '<span>Plan a Bespoke Private Journey</span>' +
            '<span>➔</span>' +
          '</a>' +
        '</div>'
      );
    }

    try {
      resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) {}
  };

  // Sync category cards filter click
  window.filterTours = function (category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const cards = document.querySelectorAll('.cat-showcase-card');
    cards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    // Also sync the All Packages section below
    currentCategory = category;
    renderFilterChips();
    filterAndRenderPackages();
  };

  // Dynamic hero count updater
  function updateHeroCounts() {
    const heroLead = document.querySelector('.tours-hero-lead');
    if (heroLead) {
      heroLead.innerHTML = '<strong id="heroPkgCount">' + allPackages.length + '</strong> Curated tailor-made expeditions across <strong id="heroThemeCount">' + allCategories.length + '</strong> signature holiday themes. Private luxury chauffeur journeys crafted around the rhythm of Ceylon.';
    }
  }

  // Initialize Catalog
  async function initCatalog() {
    // 1. Read data from window.LotusFirebase (admin/Firestore), window.LOTUS_TOURS_DATA, or fallback fetch
    let data = window.LOTUS_TOURS_DATA;

    if (window.LotusFirebase && typeof window.LotusFirebase.getCatalog === 'function') {
      try {
        const firestoreCatalog = await window.LotusFirebase.getCatalog();
        if (firestoreCatalog && firestoreCatalog.packages && firestoreCatalog.packages.length > 0) {
          // If firestore data exists, we can merge or use it
        }
      } catch (e) {
        // Fallback to LOTUS_TOURS_DATA
      }
    }

    if (!data) {
      try {
        const res = await fetch('../assets/data/tours-data.json');
        if (res.ok) {
          data = await res.json();
        }
      } catch (e) {
        console.warn('Could not fetch tours-data.json, using existing window data if present');
      }
    }

    if (!data || !data.categories || !data.packages) {
      console.warn('LOTUS_TOURS_DATA not loaded properly');
      return;
    }

    allCategories = data.categories;
    allPackages = data.packages;

    updateHeroCounts();
    readUrlParams();
    renderFilterChips();
    filterAndRenderPackages();
    setupEventListeners();

    // Observe html[lang] changes for real-time translation updates
    try {
      const langObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          if (m.attributeName === 'lang' || m.attributeName === 'dir') {
            renderFilterChips();
            filterAndRenderPackages();
          }
        });
      });
      langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
    } catch (e) {}

  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCatalog);
  } else {
    initCatalog();
  }
})();
