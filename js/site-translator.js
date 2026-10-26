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

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

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

  function updatePillUI(lang) {
    const config = LANG_CONFIG[lang] || LANG_CONFIG['en'];
    const currentLangLabel = document.getElementById('currentLangLabel');
    if (currentLangLabel) {
      currentLangLabel.textContent = config.label;
    }

    document.documentElement.lang = lang;
    document.documentElement.dir = config.dir;
    if (config.dir === 'rtl') {
      document.documentElement.classList.add('is-rtl');
      if (document.body) document.body.classList.add('is-rtl');
    } else {
      document.documentElement.classList.remove('is-rtl');
      if (document.body) document.body.classList.remove('is-rtl');
    }

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

    document.querySelectorAll('#mobileLangGrid button, .mobile-lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang || (btnLang === 'zh' && lang === 'zh-CN')) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      }
    });
  }

  function triggerCombo(lang) {
    const teCombo = document.querySelector('.goog-te-combo');
    if (teCombo) {
      teCombo.value = (lang === 'en' ? '' : lang);
      teCombo.dispatchEvent(new Event('change'));
      return true;
    }
    return false;
  }

  function applyLanguage(lang) {
    if (!LANG_CONFIG[lang]) lang = 'en';

    localStorage.setItem('lotus_lang', lang);
    localStorage.setItem('lotus_preferred_lang', lang);
    setGoogleTranslateCookie(lang);
    updatePillUI(lang);

    // Call custom i18n engine if present
    if (window.lotusI18n && typeof window.lotusI18n.setLanguage === 'function') {
      const dictKey = lang === 'zh-CN' ? 'zh' : (lang === 'zh-TW' ? 'zh' : lang);
      try {
        window.lotusI18n.setLanguage(dictKey);
      } catch (e) {
        console.warn('[Lotus i18n]:', e);
      }
    }

    if (lang === 'en') {
      triggerCombo('');
      setTimeout(() => {
        window.location.reload();
      }, 150);
      return;
    }

    const success = triggerCombo(lang);
    if (!success) {
      // Retry for combo after script loads
      let retries = 0;
      const interval = setInterval(() => {
        retries++;
        if (triggerCombo(lang) || retries > 10) {
          clearInterval(interval);
          if (retries > 10 && !document.querySelector('.goog-te-combo')) {
            window.location.reload();
          }
        }
      }, 300);
    }
  }

  function injectGoogleTranslateScript() {
    let container = document.getElementById('google_translate_element');
    if (!container) {
      container = document.createElement('div');
      container.id = 'google_translate_element';
      // Crucial: Must be technically rendered in layout so Google Translate script runs
      container.style.cssText = 'position:fixed;bottom:0;left:0;width:1px;height:1px;opacity:0.001;pointer-events:none;z-index:-9999;overflow:hidden;';
      document.body.appendChild(container);
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

      // Accessibility hardening: label third-party Google Translate voting inputs
      setTimeout(function() {
        document.querySelectorAll('input[id^="goog-gt-"], #goog-gt-tt input').forEach(function(inp) {
          if (!inp.getAttribute('aria-label')) {
            inp.setAttribute('aria-label', 'Google Translate Internal Input');
            inp.setAttribute('tabindex', '-1');
          }
        });
      }, 500);

      const current = getStoredLang();
      if (current && current !== 'en') {
        setTimeout(() => {
          triggerCombo(current);
        }, 600);
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

  function setupEventDelegation() {
    document.addEventListener('click', function (e) {
      // 1. Language Button Click (Desktop Pill + Mobile Drawer Grid)
      const btn = e.target.closest('#langPillMenu button, .lang-pill-dropdown button, #mobileLangGrid button, .mobile-lang-btn');
      if (btn) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const targetLang = btn.getAttribute('data-lang');
        const menu = btn.closest('.lang-pill-dropdown, #langPillMenu');
        if (menu) {
          menu.classList.remove('is-active');
          menu.classList.remove('show');
        }
        if (targetLang) {
          applyLanguage(targetLang);
        }
        return;
      }

      // 2. Dropdown Pill Toggle Click
      const toggle = e.target.closest('#langPillToggle, .lang-pill-btn');
      if (toggle) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const menu = document.getElementById('langPillMenu') || toggle.parentElement.querySelector('.lang-pill-dropdown');
        if (menu) {
          menu.classList.toggle('is-active');
          menu.classList.toggle('show');
        }
        return;
      }

      // 3. Outside Click
      const openMenu = document.querySelector('.lang-pill-dropdown.is-active, #langPillMenu.is-active, .lang-pill-dropdown.show, #langPillMenu.show');
      if (openMenu && !openMenu.contains(e.target)) {
        openMenu.classList.remove('is-active');
        openMenu.classList.remove('show');
      }
    }, true);
  }

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

  window.LotusSiteTranslator = {
    setLanguage: applyLanguage,
    getLanguage: getStoredLang,
    languages: LANG_CONFIG
  };

})();
