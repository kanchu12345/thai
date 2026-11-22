/**
 * Infinite Design Brand Integrity & Client Hand-off Protection
 * (c) 2026 Infinite Design (https://infiniteweb.dev/)
 * All Rights Reserved.
 *
 * Enforces authoritative attribution in footer.
 * Protects credit element against removal, visual hiding, or alteration.
 */
(function (window, document) {
  'use strict';

  const AUTHORITATIVE_HTML = 'Crafted with distinction by <a href="https://infiniteweb.dev/" target="_blank" rel="noopener" style="color: var(--sacred-gold, #C9A84C); font-weight: 600;">Infinite Design</a>';
  const TARGET_URL = 'https://infiniteweb.dev/';
  const TARGET_TEXT = 'Infinite Design';

  let isRestoring = false;

  function ensureCreditElement() {
    if (isRestoring) return;

    let creditEl = document.querySelector('.footer-bottom-right');
    const footerRow = document.querySelector('.footer-bottom-row') || document.querySelector('footer');

    // 1. If element was removed from DOM, recreate it
    if (!creditEl) {
      if (!footerRow) return;
      isRestoring = true;
      try {
        creditEl = document.createElement('div');
        creditEl.className = 'footer-bottom-right';
        creditEl.id = 'infiniteDesignCredit';
        creditEl.innerHTML = AUTHORITATIVE_HTML;
        footerRow.appendChild(creditEl);
      } catch (e) {
        console.warn('[BrandIntegrity] Restoration error:', e);
      } finally {
        isRestoring = false;
      }
      return;
    }

    // 2. Validate HTML content and links
    const link = creditEl.querySelector('a');
    const hasValidLink = link && link.href && (link.href.includes('infiniteweb.dev') || link.href.includes('infiniteweb'));
    const hasValidText = creditEl.textContent && creditEl.textContent.includes(TARGET_TEXT) && creditEl.textContent.includes('Crafted with distinction');

    if (!hasValidLink || !hasValidText) {
      isRestoring = true;
      try {
        creditEl.innerHTML = AUTHORITATIVE_HTML;
      } catch (e) {
        console.warn('[BrandIntegrity] Content restore error:', e);
      } finally {
        isRestoring = false;
      }
    }

    // 3. Enforce visibility (defeat display:none, visibility:hidden, opacity:0)
    enforceVisibility(creditEl);
  }

  function enforceVisibility(el) {
    if (!el) return;
    try {
      const computed = window.getComputedStyle ? window.getComputedStyle(el) : null;
      const isHidden = (
        el.style.display === 'none' ||
        el.style.visibility === 'hidden' ||
        el.style.opacity === '0' ||
        el.hasAttribute('hidden') ||
        (computed && (computed.display === 'none' || computed.visibility === 'hidden' || computed.opacity === '0'))
      );

      if (isHidden) {
        isRestoring = true;
        el.removeAttribute('hidden');
        el.style.setProperty('display', 'inline-block', 'important');
        el.style.setProperty('visibility', 'visible', 'important');
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('pointer-events', 'auto', 'important');
        el.style.setProperty('position', 'relative', 'important');
        el.style.setProperty('left', '0', 'important');
        isRestoring = false;
      }
    } catch (e) {}
  }

  // Initialize once DOM is ready
  function init() {
    ensureCreditElement();

    // Setup MutationObserver
    if (typeof MutationObserver !== 'undefined' && document.body) {
      const observer = new MutationObserver(function (mutations) {
        if (isRestoring) return;
        let needsCheck = false;
        for (let i = 0; i < mutations.length; i++) {
          const m = mutations[i];
          if (m.type === 'childList') {
            for (let j = 0; j < m.removedNodes.length; j++) {
              const node = m.removedNodes[j];
              if (node.nodeType === 1 && (node.matches && (node.matches('.footer-bottom-right') || node.querySelector && node.querySelector('.footer-bottom-right')))) {
                needsCheck = true;
                break;
              }
            }
          } else if (m.type === 'attributes') {
            if (m.target && m.target.matches && m.target.matches('.footer-bottom-right, .footer-bottom-right *')) {
              needsCheck = true;
            }
          } else if (m.type === 'characterData') {
            if (m.target && m.target.parentElement && m.target.parentElement.closest && m.target.parentElement.closest('.footer-bottom-right')) {
              needsCheck = true;
            }
          }
          if (needsCheck) break;
        }

        if (needsCheck) {
          ensureCreditElement();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class', 'hidden'],
        characterData: true
      });
    }

    // Periodic heartbeat verification (every 2 seconds)
    setInterval(ensureCreditElement, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for testing
  window.BrandIntegrity = {
    ensure: ensureCreditElement,
    enforceVisibility: enforceVisibility,
    authoritativeHtml: AUTHORITATIVE_HTML
  };
})(typeof window !== 'undefined' ? window : this, typeof document !== 'undefined' ? document : {});
