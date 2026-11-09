# -*- coding: utf-8 -*-
"""
tools/enhance_cms_js.py
Enhances assets/js/cms.js:
1. Supports <meta> tags in data-cms and data-cms-img
2. Supports data-cms-aria and data-cms-title
3. Fixes bug on line 422 where url("${val}") was used instead of url("${resolved}")
4. Adds storage event listener for instant cross-tab live updates
"""

import os

cms_path = os.path.join(os.path.dirname(__file__), '..', 'assets', 'js', 'cms.js')
with open(cms_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update data-cms binding to handle META
old_data_cms = """      // 1. data-cms (textContent or input placeholder)
      scope.querySelectorAll('[data-cms]').forEach(el => {
        const key = el.getAttribute('data-cms');
        const raw = this.getValueByPath(key);
        const val = this.resolveI18n(raw, lang);
        if (val !== null && val !== undefined && val !== '') {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.setAttribute('placeholder', String(val));
          } else {
            if (el.textContent !== String(val)) {
              el.textContent = String(val);
            }
          }
          el.setAttribute('data-translated-by', 'cms');
        }
      });"""

new_data_cms = """      // 1. data-cms (textContent, meta content, or input placeholder)
      scope.querySelectorAll('[data-cms]').forEach(el => {
        const key = el.getAttribute('data-cms');
        const raw = this.getValueByPath(key);
        const val = this.resolveI18n(raw, lang);
        if (val !== null && val !== undefined && val !== '') {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.setAttribute('placeholder', String(val));
          } else if (el.tagName === 'META') {
            el.setAttribute('content', String(val));
          } else {
            if (el.textContent !== String(val)) {
              el.textContent = String(val);
            }
          }
          el.setAttribute('data-translated-by', 'cms');
        }
      });"""

# 2. Update data-cms-img to handle META content
old_data_img = """      // 3. data-cms-img (src)
      scope.querySelectorAll('[data-cms-img]').forEach(el => {
        const key = el.getAttribute('data-cms-img');
        const raw = this.getValueByPath(key);
        if (raw !== undefined && raw !== null) {
          const resolved = raw ? resolveImgUrl(raw) : 'assets/images/placeholder.png';
          if (resolved && el.getAttribute('src') !== resolved) {
            this.attachImgErrorHandler(el);
            el.setAttribute('src', resolved);
          }
        }
      });"""

new_data_img = """      // 3. data-cms-img (src or meta content)
      scope.querySelectorAll('[data-cms-img]').forEach(el => {
        const key = el.getAttribute('data-cms-img');
        const raw = this.getValueByPath(key);
        if (raw !== undefined && raw !== null) {
          const resolved = raw ? resolveImgUrl(raw) : 'assets/images/placeholder.png';
          if (resolved) {
            if (el.tagName === 'META') {
              el.setAttribute('content', resolved);
            } else if (el.getAttribute('src') !== resolved) {
              this.attachImgErrorHandler(el);
              el.setAttribute('src', resolved);
            }
          }
        }
      });"""

# 3. Add aria and title
old_alt = """      // 4. data-cms-alt (alt)
      scope.querySelectorAll('[data-cms-alt]').forEach(el => {
        const key = el.getAttribute('data-cms-alt');
        const raw = this.getValueByPath(key);
        const val = this.resolveI18n(raw, lang);
        if (val) {
          el.setAttribute('alt', String(val));
        }
      });"""

new_alt = """      // 4. data-cms-alt (alt)
      scope.querySelectorAll('[data-cms-alt]').forEach(el => {
        const key = el.getAttribute('data-cms-alt');
        const raw = this.getValueByPath(key);
        const val = this.resolveI18n(raw, lang);
        if (val) {
          el.setAttribute('alt', String(val));
        }
      });

      // 4b. data-cms-aria (aria-label)
      scope.querySelectorAll('[data-cms-aria]').forEach(el => {
        const key = el.getAttribute('data-cms-aria');
        const raw = this.getValueByPath(key);
        const val = this.resolveI18n(raw, lang);
        if (val) {
          el.setAttribute('aria-label', String(val));
        }
      });

      // 4c. data-cms-title (title tooltip)
      scope.querySelectorAll('[data-cms-title]').forEach(el => {
        const key = el.getAttribute('data-cms-title');
        const raw = this.getValueByPath(key);
        const val = this.resolveI18n(raw, lang);
        if (val) {
          el.setAttribute('title', String(val));
        }
      });"""

# 4. Fix line 422 url("${val}") -> url("${resolved}")
old_val = 'el.style.backgroundImage = `linear-gradient(135deg, rgba(13, 43, 29, 0.82) 0%, rgba(22, 54, 29, 0.90) 100%), url("${val}")`;'
new_val = 'el.style.backgroundImage = `linear-gradient(135deg, rgba(13, 43, 29, 0.82) 0%, rgba(22, 54, 29, 0.90) 100%), url("${resolved}")`;'

# 5. Add storage listener inside setupLanguageListeners or init
old_init = """    init() {
      if (this.initialized) return;
      this.initialized = true;

      this.purgeLegacyCaches();
      this.detectLanguage();
      this.setupLanguageListeners();"""

new_init = """    setupStorageListener() {
      window.addEventListener('storage', (e) => {
        if (e.key === 'lotus_cms_last_published' || e.key === 'lotus_data_v' || (e.key && e.key.startsWith('lotus_cms_published_'))) {
          try { localStorage.removeItem(CACHE_KEY); } catch(err) {}
          this.loadContent();
        }
      });
    },

    init() {
      if (this.initialized) return;
      this.initialized = true;

      this.purgeLegacyCaches();
      this.detectLanguage();
      this.setupLanguageListeners();
      this.setupStorageListener();"""

content_norm = content.replace('\r\n', '\n')
replaced = 0

if old_data_cms.replace('\r\n', '\n') in content_norm:
    content_norm = content_norm.replace(old_data_cms.replace('\r\n', '\n'), new_data_cms)
    replaced += 1

if old_data_img.replace('\r\n', '\n') in content_norm:
    content_norm = content_norm.replace(old_data_img.replace('\r\n', '\n'), new_data_img)
    replaced += 1

if old_alt.replace('\r\n', '\n') in content_norm:
    content_norm = content_norm.replace(old_alt.replace('\r\n', '\n'), new_alt)
    replaced += 1

if old_val in content_norm:
    content_norm = content_norm.replace(old_val, new_val)
    replaced += 1

if old_init.replace('\r\n', '\n') in content_norm:
    content_norm = content_norm.replace(old_init.replace('\r\n', '\n'), new_init)
    replaced += 1

print(f"Total replacements made in cms.js: {replaced}/5")

with open(cms_path, 'w', encoding='utf-8') as f:
    f.write(content_norm)

print("cms.js updated successfully.")
