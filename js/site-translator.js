/**
 * LOTUS CEYLON - Universal Automated Multi-Language Translation Engine
 * 
 * Supports:
 * - 🇬🇧 en (English - Default)
 * - 🇹🇼 zh-TW (Traditional Chinese - Taiwan / 繁體中文)
 * - 🇨🇳 zh-CN (Modern / Simplified Chinese / 简体中文)
 * - 🇫🇷 fr (French / Français)
 * - 🇩🇪 de (German / Deutsch)
 * - 🇷🇺 ru (Russian / Русский)
 * - 🇪🇸 es (Spanish / Español)
 * - 🇮🇹 it (Italian / Italiano)
 * - 🇯🇵 ja (Japanese / 日本語)
 * - 🇦🇪 ar (Arabic / العربية with automatic RTL layout)
 * - 🇮🇳 hi (Hindi / हिन्दी)
 *
 * Automatically translates the entire web page upon clicking any language in the header pill.
 */

(function () {
  'use strict';

  const LANG_CONFIG = {
    'en': { label: 'EN', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    'zh-TW': { label: '繁中', name: '繁體中文 (Taiwan)', flag: '🇹🇼', dir: 'ltr' },
    'zh-CN': { label: '简中', name: '简体中文 (Modern)', flag: '🇨🇳', dir: 'ltr' },
    'fr': { label: 'FR', name: 'Français (French)', flag: '🇫🇷', dir: 'ltr' },
    'de': { label: 'DE', name: 'Deutsch (German)', flag: '🇩🇪', dir: 'ltr' },
    'ru': { label: 'RU', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
    'es': { label: 'ES', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    'it': { label: 'IT', name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
    'ja': { label: 'JA', name: '日本語', flag: '🇯🇵', dir: 'ltr' },
    'ar': { label: 'AR', name: 'العربية', flag: '🇦🇪', dir: 'rtl' },
    'hi': { label: 'HI', name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' }
  };

  // Helper to read cookie value
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  // Get current active language
  function getStoredLang() {
    const saved = localStorage.getItem('lotus_lang') || localStorage.getItem('lotus_preferred_lang');
    if (saved && LANG_CONFIG[saved]) return saved;

    const googTrans = getCookie('googtrans');
    if (googTrans) {
      const parts = googTrans.split('/');
      const code = parts[parts.length - 1];
      if (code && LANG_CONFIG[code]) return code;
    }
    return 'en';
  }

  // Set or clear the googtrans cookie for automatic whole-page translation
  function setGoogleTranslateCookie(lang) {
    const host = window.location.hostname;
    const isDomain = host && host.indexOf('.') !== -1 && host !== 'localhost';
    const domainPart = isDomain ? `; domain=.${host}` : '';
    const rootDomainPart = isDomain ? `; domain=${host}` : '';

    if (lang === 'en') {
      const expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; ${expires}`;
      document.cookie = `googtrans=; ${expires}${domainPart}`;
      document.cookie = `googtrans=; ${expires}${rootDomainPart}`;
      document.cookie = `googtrans=/en/en; path=/;`;
    } else {
      document.cookie = `googtrans=/en/${lang}; path=/;`;
      if (isDomain) {
        document.cookie = `googtrans=/en/${lang}; path=/;${domainPart}`;
        document.cookie = `googtrans=/en/${lang}; path=/;${rootDomainPart}`;
      }
    }
  }

  // Update header pill label, active classes, and RTL direction
  function updatePillUI(lang) {
    const config = LANG_CONFIG[lang] || LANG_CONFIG['en'];
    const currentLangLabel = document.getElementById('currentLangLabel');
    if (currentLangLabel) {
      currentLangLabel.textContent = config.label;
    }

    // Set document lang & text direction
    document.documentElement.lang = lang;
    document.documentElement.dir = config.dir;
    if (config.dir === 'rtl') {
      document.documentElement.classList.add('is-rtl');
      if (document.body) document.body.classList.add('is-rtl');
    } else {
      document.documentElement.classList.remove('is-rtl');
      if (document.body) document.body.classList.remove('is-rtl');
    }

    // Highlight active item in all language menus on the page
    document.querySelectorAll('#langPillMenu, .lang-pill-dropdown').forEach(menu => {
      menu.querySelectorAll('button').forEach(btn => {
        const btnLang = btn.getAttribute('data-lang');
        if (btnLang === lang || (btnLang === 'zh' && lang === 'zh-CN')) {
          btn.classList.add('is-active');
          btn.setAttribute('aria-selected', 'true');
        } else {
          btn.classList.remove('is-active');
          btn.setAttribute('aria-selected', 'false');
        }
      });
    });
  }

  // Apply Language and trigger whole-page translation
  function applyLanguage(lang) {
    if (!LANG_CONFIG[lang]) lang = 'en';

    localStorage.setItem('lotus_lang', lang);
    localStorage.setItem('lotus_preferred_lang', lang);
    setGoogleTranslateCookie(lang);
    updatePillUI(lang);

    // Call custom dictionary i18n engine if present
    if (window.lotusI18n && typeof window.lotusI18n.setLanguage === 'function') {
      const dictKey = lang === 'zh-CN' ? 'zh' : (lang === 'zh-TW' ? 'zh' : lang);
      try {
        window.lotusI18n.setLanguage(dictKey);
      } catch (e) {
        console.warn('[Lotus i18n]:', e);
      }
    }

    if (lang === 'en') {
      // Return to original crisp English copy
      window.location.reload();
      return;
    }

    // Trigger Google Translate Combo
    const teCombo = document.querySelector('.goog-te-combo');
    if (teCombo) {
      teCombo.value = lang;
      teCombo.dispatchEvent(new Event('change'));
    } else {
      // Retry or reload to trigger translation from cookie
      setTimeout(() => {
        const retryCombo = document.querySelector('.goog-te-combo');
        if (retryCombo) {
          retryCombo.value = lang;
          retryCombo.dispatchEvent(new Event('change'));
        } else {
          window.location.reload();
        }
      }, 350);
    }
  }

  // Inject Google Translate script and hidden element
  function injectGoogleTranslateScript() {
    if (!document.getElementById('google_translate_element')) {
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;overflow:hidden;visibility:hidden;pointer-events:none;';
      document.body.appendChild(div);
    }

    window.googleTranslateElementInit = function () {
      try {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,zh-TW,zh-CN,fr,de,ru,es,it,ja,ar,hi',
          autoDisplay: false
        }, 'google_translate_element');
      } catch (err) {
        console.warn('[Google Translate Init]:', err);
      }

      // Check if a non-English language was previously active
      const current = getStoredLang();
      if (current && current !== 'en') {
        setTimeout(() => {
          const combo = document.querySelector('.goog-te-combo');
          if (combo) {
            combo.value = current;
            combo.dispatchEvent(new Event('change'));
          }
        }, 500);
      }
    };

    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(s);
    }
  }

  // High-Priority Capturing Event Delegation for Toggle and Selection
  function setupEventDelegation() {
    // 1. Language Button Click (Capture phase to take precedence over legacy inline handlers)
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('#langPillMenu button, .lang-pill-dropdown button');
      if (btn) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const targetLang = btn.getAttribute('data-lang');
        const menu = btn.closest('.lang-pill-dropdown, #langPillMenu');
        if (menu) menu.classList.remove('is-active');
        if (targetLang) {
          applyLanguage(targetLang);
        }
        return;
      }

      // 2. Pill Toggle Click
      const toggle = e.target.closest('#langPillToggle, .lang-pill-btn');
      if (toggle) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const menu = document.getElementById('langPillMenu') || toggle.parentElement.querySelector('.lang-pill-dropdown');
        if (menu) {
          menu.classList.toggle('is-active');
        }
        return;
      }

      // 3. Outside Click Closes Dropdowns
      const openMenu = document.querySelector('.lang-pill-dropdown.is-active, #langPillMenu.is-active');
      if (openMenu && !openMenu.contains(e.target)) {
        openMenu.classList.remove('is-active');
      }
    }, true); // Use capture phase!
  }

  // Initialize
  function init() {
    setupEventDelegation();
    injectGoogleTranslateScript();
    const current = getStoredLang();
    updatePillUI(current);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose Global API
  window.LotusSiteTranslator = {
    setLanguage: applyLanguage,
    getLanguage: getStoredLang,
    languages: LANG_CONFIG
  };

})();
