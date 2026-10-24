/**
 * Lotus Ceylon - Tour Interactive Suite
 * Implements:
 * 4. Blooming Lotus Day-by-Day Timeline Observer
 * 6. Quick-Facts Bar responsiveness
 * 7. "Make It Yours" Customizer Modal & Inquiry Prefill Forwarding
 * 8. Save & Share (WhatsApp, Copy Link, Browser Favorites)
 */

(function() {
  'use strict';

  // =========================================================================
  // 4. Blooming Lotus Day-by-Day Timeline Observer
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
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      });

      timelineItems.forEach(item => observer.observe(item));
    } else {
      // Fallback
      timelineItems.forEach(item => item.classList.add('lotus-bloomed'));
    }
  }

  // =========================================================================
  // 7. "Make It Yours" Customizer Modal
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
        <h3 class="modal-title">Make It Yours: <span>${packageTitle || 'Your Private Tour'}</span></h3>
        <p class="modal-subtitle">
          Every Lotus Ceylon journey is 100% tailor-made. Select your preferred enhancements below, and our concierge will calculate your customized proposal.
        </p>

        <form id="makeItYoursForm" onsubmit="window.LotusInteractive.submitCustomization(event, '${packageTitle}', '${categorySlug}')">
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

    // Calculate relative path to inquiry-detailed.html
    const depth = (window.location.pathname.match(/\//g) || []).length;
    let prefix = '';
    if (window.location.pathname.includes('/tours/')) {
      const parts = window.location.pathname.split('/tours/')[1].split('/').filter(Boolean);
      prefix = '../'.repeat(parts.length + 1);
    }
    const targetUrl = new URL(`${prefix || ''}inquiry-detailed.html`, window.location.href);
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
  // 8. Save & Share (Browser Storage & WhatsApp)
  // =========================================================================
  function toggleSaveTour(packageId, buttonEl) {
    const key = 'lotus_saved_tours';
    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem(key) || '[]');
    } catch(e) { saved = []; }

    const idx = saved.indexOf(packageId);
    let isNowSaved = false;
    if (idx === -1) {
      saved.push(packageId);
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
    const url = window.location.href;
    const msg = encodeURIComponent(`Hello! Take a look at this luxury Sri Lanka journey by Lotus Ceylon: "${title}"\n${url}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  }

  function copyTourLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Tour itinerary link copied to clipboard!');
    }).catch(() => {
      prompt('Copy this tour link:', window.location.href);
    });
  }

  // Auto initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initBloomingLotusTimeline();
  });

  window.LotusInteractive = {
    initBloomingLotusTimeline,
    openMakeItYoursModal,
    closeModal,
    submitCustomization,
    toggleSaveTour,
    shareTourWhatsApp,
    copyTourLink
  };
})();
