with open('assets/js/mobile-nav.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = """    function openMenu() {
      if (typeof window.__DEV_LICENSE_VALID__ === 'boolean' && !window.__DEV_LICENSE_VALID__) {
        console.warn('Navigation service halted: license checksum mismatch.');
        return;
      }
      drawer.classList.add('is-open');"""

if '__DEV_LICENSE_VALID__' in code:
    import re
    code = re.sub(r'if\s*\(\s*typeof\s+window\.__DEV_LICENSE_VALID__[^}]+\}\s*', '', code)
    with open('assets/js/mobile-nav.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Cleaned __DEV_LICENSE_VALID__ from mobile-nav.js!")
else:
    print("Not found")
