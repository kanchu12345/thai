/**
 * Lotus Ceylon - Tour Interactive Suite
 * Complete Creative Suite (Section 11):
 * 1. Blooming Lotus Day-by-Day Timeline Observer
 * 2. "Make It Yours" Customizer Modal & Inquiry Prefill Forwarding
 * 3. Save & Share (WhatsApp, Copy Link, Browser Favorites)
 * 4. Side-by-Side Package Comparator (Any 2 packages across all categories)
 * 5. Best-Time-To-Visit 12-Month Strip (Dual Monsoon Microclimates)
 * 6. FAQ Accordion with JSON-LD FAQPage Schema
 * 7. "Why Travel with Lotus" 4-Pillar Trust Strip
 * 8. Mobile Sticky Bottom Inquire & WhatsApp Bar
 */

(function() {
  'use strict';

  // Path resolution helper
  function getPrefix() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/tours/')) {
      const after = path.split('/tours/')[1].split('/').filter(p => p && !p.endsWith('.html'));
      return '../'.repeat(after.length + 1);
    }
    return './';
  }

  // Global cache of all packages
  let packageCatalogCache = null;

  async function getCatalog() {
    if (packageCatalogCache) return packageCatalogCache;
    if (window.LotusFirebase && typeof window.LotusFirebase.getCatalog === 'function') {
      try {
        packageCatalogCache = await window.LotusFirebase.getCatalog();
        if (packageCatalogCache && packageCatalogCache.length) return packageCatalogCache;
      } catch(e) {
        console.warn('Firebase catalog fetch failed, falling back to local JSON:', e);
      }
    }
    try {
      const prefix = getPrefix();
      const res = await fetch(`${prefix}data/packages.json`);
      const data = await res.json();
      packageCatalogCache = data.packages || [];
      return packageCatalogCache;
    } catch(e) {
      console.error('Failed to load packages.json:', e);
      return [];
    }
  }

  // =========================================================================
  // 1. Blooming Lotus Day-by-Day Timeline Observer
  // =========================================================================
  function initBloomingLotusTimeline() {
    const timelineItems = document.querySelectorAll('.itinerary-item');
    if (!timelineItems.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('lotus-bloomed');
            const badge = entry.target.querySelector('.itinerary-day-badge');
            if (badge) {
              badge.classList.add('is-bloomed');
            }
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      timelineItems.forEach(item => observer.observe(item));
    } else {
      timelineItems.forEach(item => item.classList.add('lotus-bloomed'));
    }
  }

  // =========================================================================
  // 2. "Make It Yours" Customizer Modal
  // =========================================================================
  const MAKE_IT_YOURS_OPTIONS = [
    { id: 'opt-extra-days', label: 'Add extra leisure days in Sri Lanka (+2-3 Nights)', icon: '🗓️' },
    { id: 'opt-ayurveda', label: 'Include Ayurvedic restorative massage & wellness day', icon: '🌿' },
    { id: 'opt-hotel-upgrade', label: 'Upgrade to private plunge-pool villa / presidential suite', icon: '💎' },
    { id: 'opt-safari', label: 'Add exclusive 4x4 private game drive & naturalist tracker', icon: '🐆' },
    { id: 'opt-chauffeur', label: 'Senior national tourist guide lecturer / language specialist', icon: '🎩' },
    { id: 'opt-train', label: 'First-class reserved scenic mountain railway observation car', icon: '🚂' }
  ];

  function openMakeItYoursModal(packageTitle, categorySlug) {
    let modal = document.getElementById('makeItYoursModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'makeItYoursModal';
      modal.className = 'lotus-modal-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Make It Yours - Tailor Your Tour');
      document.body.appendChild(modal);
    }

    const titleText = packageTitle || document.querySelector('.hero-title, .tour-header-title, h1')?.textContent?.trim() || 'Your Private Tour';
    const catText = categorySlug || '';

    const optionsHtml = MAKE_IT_YOURS_OPTIONS.map(opt => `
      <label class="custom-opt-label">
        <input type="checkbox" name="custom_options" value="${opt.label}" class="custom-opt-checkbox">
        <span class="custom-opt-icon">${opt.icon}</span>
        <span class="custom-opt-text">${opt.label}</span>
      </label>
    `).join('');

    modal.innerHTML = `
      <div class="lotus-modal-card">
        <button type="button" class="lotus-modal-close" onclick="window.LotusInteractive.closeModal()">&times;</button>
        <div class="modal-header-badge">✦ BESPOKE CUSTOMIZATION</div>
        <h3 class="modal-title">Make It Yours: <span>${titleText}</span></h3>
        <p class="modal-subtitle">
          Every Lotus Ceylon journey is 100% tailor-made. Select your preferred enhancements below, and our concierge will calculate your customized proposal.
        </p>

        <form id="makeItYoursForm" onsubmit="window.LotusInteractive.submitCustomization(event, '${titleText.replace(/'/g, "\\'")}', '${catText}')">
          <div class="custom-options-grid">
            ${optionsHtml}
          </div>

          <div style="margin-top: 1.5rem;">
            <label style="font-size: 0.88rem; font-weight: 600; color: #002B49; display: block; margin-bottom: 0.4rem;">
              Any specific wishes, dietary needs or dates?
            </label>
            <textarea id="customWishesText" rows="3" placeholder="e.g. Traveling for anniversary in November, vegetarian meals, preference for eco-lodges..." style="width: 100%; border: 1px solid #CBD5E1; border-radius: 8px; padding: 0.75rem; font-family: inherit; font-size: 0.9rem; resize: vertical;"></textarea>
          </div>

          <div class="modal-actions-row">
            <button type="submit" class="btn-proceed-inquiry">
              <span>Continue to Detailed Inquiry ➔</span>
            </button>
            <button type="button" class="btn-cancel-modal" onclick="window.LotusInteractive.closeModal()">
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('makeItYoursModal');
    if (modal) {
      modal.classList.remove('is-active');
    }
    document.body.style.overflow = '';
  }

  function submitCustomization(event, packageTitle, categorySlug) {
    event.preventDefault();
    const checked = Array.from(document.querySelectorAll('input[name="custom_options"]:checked')).map(cb => cb.value);
    const notes = document.getElementById('customWishesText')?.value?.trim() || '';

    const prefix = getPrefix();
    const targetUrl = new URL(`${prefix}inquiry-detailed.html`, window.location.href);
    targetUrl.searchParams.set('package', packageTitle);
    if (categorySlug) {
      targetUrl.searchParams.set('category', categorySlug);
    }
    if (checked.length) {
      targetUrl.searchParams.set('custom', checked.join(' | '));
    }
    if (notes) {
      targetUrl.searchParams.set('notes', notes);
    }

    closeModal();
    window.location.href = targetUrl.toString();
  }

  // =========================================================================
  // 3. Save & Share (WhatsApp & Local Favorites)
  // =========================================================================
  function toggleSaveTour(packageId, buttonEl) {
    const key = 'lotus_saved_tours';
    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem(key) || '[]');
    } catch(e) { saved = []; }

    const id = packageId || window.location.pathname;
    const idx = saved.indexOf(id);
    let isNowSaved = false;
    if (idx === -1) {
      saved.push(id);
      isNowSaved = true;
    } else {
      saved.splice(idx, 1);
      isNowSaved = false;
    }
    localStorage.setItem(key, JSON.stringify(saved));

    if (buttonEl) {
      buttonEl.classList.toggle('is-saved', isNowSaved);
      buttonEl.setAttribute('aria-pressed', isNowSaved.toString());
      const label = buttonEl.querySelector('.save-btn-text');
      if (label) {
        label.textContent = isNowSaved ? 'Saved to Favorites' : 'Save Trip';
      }
    }
  }

  function shareTourWhatsApp(title) {
    const pkgTitle = title || document.title;
    const url = window.location.href;
    const msg = encodeURIComponent(`Hello! Take a look at this luxury Sri Lanka journey by Lotus Ceylon: "${pkgTitle}"\n${url}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  }

  function copyTourLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Tour itinerary link copied to clipboard!');
    }).catch(() => {
      prompt('Copy this tour link:', window.location.href);
    });
  }

  // =========================================================================
  // 4. Cross-Category Side-by-Side Package Comparator
  // =========================================================================
  let compareBasket = [];

  function initPackageComparator() {
    try {
      compareBasket = JSON.parse(sessionStorage.getItem('lotus_compare_basket') || '[]');
    } catch(e) {
      compareBasket = [];
    }
    renderCompareDock();
    bindCompareTriggers();
  }

  function bindCompareTriggers() {
    document.querySelectorAll('[data-compare-id]').forEach(btn => {
      const id = btn.getAttribute('data-compare-id');
      const inBasket = compareBasket.includes(id);
      btn.classList.toggle('is-in-compare', inBasket);
    });
  }

  function toggleComparePackage(packageId) {
    if (!packageId) return;
    const idx = compareBasket.indexOf(packageId);
    if (idx > -1) {
      compareBasket.splice(idx, 1);
    } else {
      if (compareBasket.length >= 2) {
        compareBasket.shift(); // keep max 2
      }
      compareBasket.push(packageId);
    }
    sessionStorage.setItem('lotus_compare_basket', JSON.stringify(compareBasket));
    renderCompareDock();
    bindCompareTriggers();
    if (compareBasket.length === 2) {
      openCompareModal(compareBasket[0], compareBasket[1]);
    }
  }

  function renderCompareDock() {
    let dock = document.getElementById('lotusCompareDock');
    if (!dock) {
      dock = document.createElement('div');
      dock.id = 'lotusCompareDock';
      dock.className = 'lotus-compare-dock';
      document.body.appendChild(dock);
    }

    if (compareBasket.length === 0) {
      dock.classList.remove('is-visible');
      return;
    }

    dock.classList.add('is-visible');
    dock.innerHTML = `
      <div class="dock-content">
        <span class="dock-icon">⚖️</span>
        <span class="dock-text"><strong>${compareBasket.length}/2</strong> Packages Selected for Comparison</span>
        <button type="button" class="btn-dock-compare" onclick="window.LotusInteractive.openCompareModal('${compareBasket[0] || ''}', '${compareBasket[1] || ''}')">
          <span>Compare Side-by-Side</span>
        </button>
        <button type="button" class="btn-dock-clear" onclick="window.LotusInteractive.clearCompare()" title="Clear selection">&times;</button>
      </div>
    `;
  }

  function clearCompare() {
    compareBasket = [];
    sessionStorage.removeItem('lotus_compare_basket');
    renderCompareDock();
    bindCompareTriggers();
    closeCompareModal();
  }

  async function openCompareModal(pkgId1, pkgId2) {
    const catalog = await getCatalog();
    if (!catalog.length) return;

    let p1 = catalog.find(p => p.id === pkgId1) || catalog[0];
    let p2 = catalog.find(p => p.id === pkgId2) || catalog[1] || catalog[0];

    let modal = document.getElementById('lotusCompareModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lotusCompareModal';
      modal.className = 'lotus-modal-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      document.body.appendChild(modal);
    }

    const prefix = getPrefix();

    function renderSelectOptions(selectedId) {
      return catalog.map(p => `
        <option value="${p.id}" ${p.id === selectedId ? 'selected' : ''}>
          [${p.category ? p.category.toUpperCase() : 'TOUR'}] ${p.title} (${p.nights}N/${p.days}D)
        </option>
      `).join('');
    }

    function renderColumn(pkg) {
      const hero = pkg.heroImage ? (pkg.heroImage.startsWith('http') ? pkg.heroImage : `${prefix}${pkg.heroImage}`) : `${prefix}assets/images/sigiriya.jpg`;
      const url = `${prefix}tours/${pkg.category}/${pkg.slug}/index.html`;
      const inqUrl = `${prefix}inquiry-detailed.html?package=${encodeURIComponent(pkg.title)}&category=${pkg.category}`;

      const hls = (pkg.highlights || []).slice(0, 5).map(h => `<li><span class="check-icon">✓</span> ${h}</li>`).join('');
      const dests = (pkg.destinations || []).map(d => typeof d === 'string' ? d : d.name).join(' ➔ ');

      return `
        <div class="compare-col">
          <div class="compare-card-top">
            <img src="${hero}" alt="${pkg.title}" class="compare-hero-img" onerror="this.src='${prefix}assets/images/logo.png'">
            <div class="compare-cat-badge">${(pkg.category || 'Luxury Tour').toUpperCase()}</div>
            <h4 class="compare-pkg-title">${pkg.title}</h4>
            <div class="compare-dur-pill">⏱️ ${pkg.nights} Nights / ${pkg.days} Days</div>
          </div>

          <div class="compare-specs-list">
            <div class="spec-row">
              <span class="spec-label">Pace & Style:</span>
              <span class="spec-val">${pkg.pace || 'Leisurely & Balanced'}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Difficulty:</span>
              <span class="spec-val">${pkg.difficulty || 'Easy / Moderate'}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Best Season:</span>
              <span class="spec-val">${pkg.bestSeason || 'Year-Round'}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Group Size:</span>
              <span class="spec-val">${pkg.groupSize || 'Private / Tailor-made'}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Route Flow:</span>
              <span class="spec-val" style="font-size: 0.85rem; color: #475569;">${dests || 'Bespoke routing'}</span>
            </div>
          </div>

          <div class="compare-highlights-block">
            <h5 class="highlights-heading">Signature Inclusions:</h5>
            <ul class="compare-hl-list">
              ${hls || '<li>✓ Private luxury vehicle & chauffeur</li><li>✓ Hand-picked boutique retreats</li>'}
            </ul>
          </div>

          <div class="compare-col-footer">
            <a href="${inqUrl}" class="btn-compare-inquire">Inquire About This Tour ➔</a>
            <a href="${url}" class="link-compare-view">View Full Itinerary</a>
          </div>
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="lotus-modal-card compare-modal-card">
        <button type="button" class="lotus-modal-close" onclick="window.LotusInteractive.closeCompareModal()">&times;</button>
        <div class="modal-header-badge">✦ SIDE-BY-SIDE ITINERARY COMPARISON</div>
        <h3 class="modal-title">Compare Sri Lanka Journeys</h3>
        <p class="modal-subtitle">Select any two packages below to evaluate pace, duration, seasonal alignment, and inclusions.</p>

        <div class="compare-selectors-row">
          <div class="selector-box">
            <label>Select Tour 1:</label>
            <select id="compareSelect1" class="compare-dropdown" onchange="window.LotusInteractive.updateCompareSelection()">
              ${renderSelectOptions(p1.id)}
            </select>
          </div>
          <div class="compare-vs-badge">VS</div>
          <div class="selector-box">
            <label>Select Tour 2:</label>
            <select id="compareSelect2" class="compare-dropdown" onchange="window.LotusInteractive.updateCompareSelection()">
              ${renderSelectOptions(p2.id)}
            </select>
          </div>
        </div>

        <div class="compare-grid" id="compareGridContainer">
          ${renderColumn(p1)}
          ${renderColumn(p2)}
        </div>
      </div>
    `;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  async function updateCompareSelection() {
    const s1 = document.getElementById('compareSelect1')?.value;
    const s2 = document.getElementById('compareSelect2')?.value;
    if (s1 && s2) {
      openCompareModal(s1, s2);
    }
  }

  function closeCompareModal() {
    const modal = document.getElementById('lotusCompareModal');
    if (modal) modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  // =========================================================================
  // 5. Best-Time-To-Visit 12-Month Strip
  // =========================================================================
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  function calculateMonthRatings(pkg) {
    const season = (pkg?.bestSeason || '').toLowerCase();
    const cat = (pkg?.category || '').toLowerCase();
    const title = (pkg?.title || '').toLowerCase();

    // Default status array: 1 = peak, 2 = good, 3 = moderate
    let ratings = [1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 1];

    if (cat === 'beach' || cat === 'honeymoon') {
      if (season.includes('may to october') || season.includes('east') || title.includes('eastern')) {
        // East coast pattern: May-Oct peak, Nov-Feb monsoon
        ratings = [3, 3, 2, 2, 1, 1, 1, 1, 1, 2, 3, 3];
      } else {
        // South/West coast pattern: Dec-Apr peak, May-Sep monsoon
        ratings = [1, 1, 1, 1, 3, 3, 2, 2, 3, 3, 2, 1];
      }
    } else if (cat === 'cultural' || cat === 'ramayana') {
      // Cultural Triangle: dry Feb-Sep, rainy Oct-Dec
      ratings = [1, 1, 1, 2, 2, 1, 1, 1, 1, 3, 3, 2];
    } else if (cat === 'hill-country') {
      // Hill Country: Jan-Apr & Jul-Aug peak
      ratings = [1, 1, 1, 1, 2, 2, 1, 1, 2, 3, 3, 2];
    } else if (cat === 'wildlife') {
      // Wildlife: dry season is best for game viewing
      ratings = [1, 1, 1, 2, 2, 1, 1, 1, 1, 3, 3, 1];
    } else if (cat === 'ayurvedic') {
      // Ayurveda: Monsoons (Jun-Sep) actually open pores and are traditionally prized!
      ratings = [1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1];
    }

    return ratings;
  }

  function renderSeasonStrip(pkg, container) {
    if (!container) return;
    const ratings = calculateMonthRatings(pkg);

    const monthPills = MONTHS.map((m, idx) => {
      const r = ratings[idx];
      let statusClass = 'season-peak';
      let statusLabel = 'Peak Sunshine';
      if (r === 2) {
        statusClass = 'season-good';
        statusLabel = 'Pleasant & Mild';
      } else if (r === 3) {
        statusClass = 'season-moderate';
        statusLabel = 'Lush Monsoon';
      }

      return `
        <div class="season-month-cell ${statusClass}" title="${m}: ${statusLabel}">
          <span class="month-name">${m}</span>
          <span class="season-dot"></span>
          <span class="season-badge">${statusLabel.split(' ')[0]}</span>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="lotus-season-strip-box">
        <div class="season-strip-header">
          <div class="season-strip-title">
            <span class="season-icon">☀️</span>
            <h4>Best Time to Visit: <span>${pkg.bestSeason || 'Year-Round Destination'}</span></h4>
          </div>
          <div class="season-legend">
            <span class="legend-item"><span class="legend-dot peak"></span> Peak Conditions</span>
            <span class="legend-item"><span class="legend-dot good"></span> Pleasant Touring</span>
            <span class="legend-item"><span class="legend-dot moderate"></span> Tropical Monsoon</span>
          </div>
        </div>

        <div class="season-months-grid">
          ${monthPills}
        </div>

        <div class="season-strip-footer">
          <p class="season-microclimate-note">
            🌴 <strong>Dual Microclimate Note:</strong> Sri Lanka benefits from two alternating monsoon cycles on opposite coastlines. When the south is damp, the eastern and northern bays remain sun-drenched and serene — ensuring Lotus Ceylon journeys offer perfect conditions every single month of the year.
          </p>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 6. FAQ Accordion & Schema.org/FAQPage Generator
  // =========================================================================
  const DEFAULT_FAQS = [
    {
      q: 'Can this itinerary be fully customized or reversed?',
      a: 'Yes, absolutely. Every tour presented by Lotus Ceylon is an artisanal starting framework. Our destination architects can extend or reduce your stay, change boutique hotel properties, reverse the route sequence, or seamlessly weave in private wellness treatments, hot air ballooning, or specialized birdwatching excursions.'
    },
    {
      q: 'What type of vehicle and chauffeur-guide is assigned to our party?',
      a: 'All our journeys are 100% private. We assign modern, premium air-conditioned vehicles (such as Toyota Prado 4WDs, luxury KDH vans, or executive sedans) matched strictly to your party size. Your dedicated chauffeur-guide is a government-certified National Tourist Guide Lecturer licensed by the Sri Lanka Tourism Development Authority (SLTDA).'
    },
    {
      q: 'Are entrance fees, national park safaris, and train tickets included?',
      a: 'Yes. Unless you request a customized land-only option, our comprehensive quotations include VIP pre-booked entry tickets to all UNESCO monuments, exclusive private 4x4 safari jeeps with park rangers, and reserved first-class scenic mountain railway observation car seats.'
    },
    {
      q: 'What are your payment terms and cancellation policies?',
      a: 'Upon approving your bespoke itinerary, a modest deposit secures your boutique reservations and chauffeur allocation. Final balance payments are processed securely ahead of arrival. In the event of unforeseen flight disruptions or emergencies, we provide compassionate postponement terms with no administrative penalties.'
    },
    {
      q: 'Do you arrange airport transfers and VIP meet-and-greet services?',
      a: 'From the moment your flight touches down at Colombo Bandaranaike International Airport (CMB), our private airport representative and your chauffeur await you just beyond customs with cold floral towels, chilled bottled water, and your complete welcome briefing folder.'
    }
  ];

  function renderFAQSection(container, customFaqs = null) {
    if (!container) return;
    const faqs = customFaqs || DEFAULT_FAQS;

    const accordionHtml = faqs.map((faq, idx) => `
      <details class="lotus-faq-item" ${idx === 0 ? 'open' : ''}>
        <summary class="lotus-faq-question">
          <span class="faq-q-text">${faq.q}</span>
          <span class="faq-chevron">▾</span>
        </summary>
        <div class="lotus-faq-answer">
          <p>${faq.a}</p>
        </div>
      </details>
    `).join('');

    container.innerHTML = `
      <div class="lotus-faq-inner">
        <div class="faq-header-wrap">
          <span class="faq-eyebrow">✦ TRAVELER ESSENTIALS & ADVICE</span>
          <h2 class="faq-main-title">Frequently Asked Questions</h2>
          <p class="faq-subtitle">Everything you need to know about planning your private luxury voyage through Sri Lanka with Lotus Ceylon.</p>
        </div>
        <div class="lotus-faq-list">
          ${accordionHtml}
        </div>
      </div>
    `;

    // Inject FAQPage JSON-LD schema into head
    injectFAQSchema(faqs);
  }

  function injectFAQSchema(faqs) {
    const existing = document.getElementById('lotusFaqSchema');
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    const s = document.createElement('script');
    s.id = 'lotusFaqSchema';
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  }

  // =========================================================================
  // 7. "Why Travel with Lotus" 4-Pillar Trust Strip
  // =========================================================================
  function renderWhyLotusStrip(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="lotus-why-inner">
        <div class="why-header">
          <span class="why-eyebrow">✦ THE LOTUS CEYLON ASSURANCE</span>
          <h2 class="why-title">Why Discerning Travelers Choose Us</h2>
          <p class="why-sub">Pure Journeys. Sacred Experiences. Curated to uncompromising standards since 2014.</p>
        </div>

        <div class="why-pillars-grid">
          <div class="why-pillar-card">
            <div class="why-icon-wrap">🛡️</div>
            <h4 class="why-card-title">100% Private & Bespoke</h4>
            <p class="why-card-desc">No shared coaches or rushed timetables. Your private vehicle, personal chauffeur, and schedule adapt entirely to your mood and waking hour.</p>
          </div>

          <div class="why-pillar-card">
            <div class="why-icon-wrap">👨‍✈️</div>
            <h4 class="why-card-title">Certified Master Chauffeurs</h4>
            <p class="why-card-desc">Hand-vetted SLTDA-licensed tourist guide lecturers who bring cultural depth, warm hospitality, and defensive driving excellence to every mile.</p>
          </div>

          <div class="why-pillar-card">
            <div class="why-icon-wrap">🌿</div>
            <h4 class="why-card-title">Curated Boutique Sanctuaries</h4>
            <p class="why-card-desc">We personally inspect every heritage tea bungalow, private beach pavilion, and wildlife luxury tented suite for soul, privacy, and impeccable service.</p>
          </div>

          <div class="why-pillar-card">
            <div class="why-icon-wrap">💎</div>
            <h4 class="why-card-title">24/7 Dedicated Concierge</h4>
            <p class="why-card-desc">A senior trip director monitors your itinerary around the clock. Backed by a strict zero-commission policy—no tourist traps, guaranteed.</p>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 8. Mobile Sticky Bottom Inquire & WhatsApp Bar
  // =========================================================================
  function renderMobileStickyBar(packageTitle) {
    let bar = document.getElementById('lotusMobileStickyBar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'lotusMobileStickyBar';
      bar.className = 'lotus-mobile-sticky-bar';
      document.body.appendChild(bar);
    }

    const title = packageTitle || document.querySelector('h1')?.textContent?.trim() || 'Sri Lanka Tour';
    const prefix = getPrefix();
    const inqUrl = `${prefix}inquiry-detailed.html?package=${encodeURIComponent(title)}`;
    const waUrl = `https://wa.me/94715422384?text=${encodeURIComponent(`Hello Lotus Ceylon! I would like to inquire about "${title}".`)}`;

    bar.innerHTML = `
      <div class="mobile-sticky-inner">
        <div class="mobile-sticky-info">
          <span class="mobile-sticky-label">Pure Ceylon Private Journey</span>
          <span class="mobile-sticky-title">${title}</span>
        </div>
        <div class="mobile-sticky-actions">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-sticky-wa" aria-label="Chat on WhatsApp">
            <span>💬</span>
          </a>
          <a href="${inqUrl}" class="btn-sticky-inquire">
            <span>Tailor Journey ➔</span>
          </a>
        </div>
      </div>
    `;
    document.body.classList.add('has-mobile-sticky-bar');
  }

  // =========================================================================
  // =========================================================================
  // 9. Sri Lanka Travel Authority & Information Hub Tabs (Phase 6)
  // =========================================================================
  function initTravelHubTabs() {
    const tabs = document.querySelectorAll('.travel-hub-tab-btn');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('aria-controls');
        if (!targetId) return;

        // Deselect all tabs
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });

        // Hide all panels
        const panels = document.querySelectorAll('.travel-hub-panel');
        panels.forEach(p => {
          p.classList.remove('active');
          p.hidden = true;
        });

        // Activate clicked tab
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Show target panel
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
          targetPanel.hidden = false;
        }
      });
    });
  }

  // Auto-Initialization
  // =========================================================================
  document.addEventListener('DOMContentLoaded', async () => {
    initBloomingLotusTimeline();
    initTravelHubTabs();
    initPackageComparator();

    // Auto-detect package detail page context
    const isPackagePage = window.location.pathname.includes('/tours/') && (window.location.pathname.match(/\//g) || []).length >= 4;
    
    // Auto-mount Season Strip if container exists or on package pages
    const seasonContainer = document.getElementById('lotusSeasonStripContainer') || document.querySelector('.season-strip-mount');
    if (seasonContainer) {
      const catalog = await getCatalog();
      // Match current package
      const pathParts = window.location.pathname.split('/').filter(Boolean);
      const slug = pathParts[pathParts.length - 2] || pathParts[pathParts.length - 1];
      const pkg = catalog.find(p => p.slug === slug) || catalog[0];
      if (pkg) renderSeasonStrip(pkg, seasonContainer);
    }

    // Auto-mount FAQ Section if container exists
    const faqContainer = document.getElementById('lotusFaqContainer') || document.querySelector('.faq-mount');
    if (faqContainer) {
      renderFAQSection(faqContainer);
    }

    // Auto-mount Why Lotus Strip if container exists
    const whyContainer = document.getElementById('lotusWhyContainer') || document.querySelector('.why-lotus-mount');
    if (whyContainer) {
      renderWhyLotusStrip(whyContainer);
    }

    // Auto-mount Mobile Sticky Bar on package detail pages
    if (isPackagePage || document.querySelector('.tour-booking-card') || document.querySelector('.itinerary-timeline')) {
      const pageTitle = document.querySelector('h1')?.textContent?.trim() || '';
      renderMobileStickyBar(pageTitle);
    }
  });

  // Public Interface
  window.LotusInteractive = {
    initBloomingLotusTimeline,
    openMakeItYoursModal,
    closeModal,
    submitCustomization,
    toggleSaveTour,
    shareTourWhatsApp,
    copyTourLink,
    initPackageComparator,
    toggleComparePackage,
    openCompareModal,
    closeCompareModal,
    clearCompare,
    updateCompareSelection,
    renderSeasonStrip,
    renderFAQSection,
    renderWhyLotusStrip,
    renderMobileStickyBar,
    initTravelHubTabs
  };

})();
