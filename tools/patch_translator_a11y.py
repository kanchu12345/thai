with open('js/site-translator.js', 'r', encoding='utf-8') as f:
    c = f.read().replace('\r\n', '\n')

old_code = """    window.googleTranslateElementInit = function () {
      try {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,zh-TW,zh-CN,fr,de,ru,es,it,ja,ar,hi',
          autoDisplay: false
        }, 'google_translate_element');
      } catch (err) {
        console.warn('[Google Translate Init]:', err);
      }"""

new_code = """    window.googleTranslateElementInit = function () {
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
      }, 500);"""

if old_code in c:
    c = c.replace(old_code, new_code)
    with open('js/site-translator.js', 'w', encoding='utf-8', newline='\n') as f:
        f.write(c)
    print("SUCCESS: Added accessible labeling for Google Translate inputs in js/site-translator.js")
else:
    print("FAILED: old_code not found")
