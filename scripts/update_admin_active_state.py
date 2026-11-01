with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# In showApp():
target_show_app = "async showApp() {"
replacement_show_app = """async showApp() {
      try {
        localStorage.setItem('lotus_admin_active', '1');
        localStorage.setItem('lotus_admin_user', this.currentUser ? this.currentUser.email : 'admin');
      } catch (e) {}"""

if target_show_app in code:
    code = code.replace(target_show_app, replacement_show_app, 1)
    print("Added lotus_admin_active storage in showApp")

with open('admin/js/admin-app.js', 'w', encoding='utf-8') as f:
    f.write(code)

with open('assets/js/cms.js', 'r', encoding='utf-8') as f:
    cms_code = f.read()

# Add keyboard shortcut Ctrl+Shift+E to toggle edit mode / floating button
target_key_anchor = "setupAdminFloatingButton() {"
replacement_key_anchor = """setupAdminFloatingButton() {
      // Global shortcut: Ctrl+Shift+E or Alt+E activates Quick Edit
      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) || (e.altKey && (e.key === 'E' || e.key === 'e'))) {
          e.preventDefault();
          try {
            localStorage.setItem('lotus_admin_active', '1');
          } catch (err) {}
          const existing = document.getElementById('lotusAdminQuickEditPill');
          if (existing) {
            existing.style.display = existing.style.display === 'none' ? 'flex' : 'none';
          } else {
            this.setupAdminFloatingButton();
          }
        }
      });"""

if target_key_anchor in cms_code and "Ctrl+Shift+E" not in cms_code:
    cms_code = cms_code.replace(target_key_anchor, replacement_key_anchor, 1)
    print("Added keyboard shortcut to setupAdminFloatingButton in cms.js")

with open('assets/js/cms.js', 'w', encoding='utf-8') as f:
    f.write(cms_code)

print("Updated admin-app.js and cms.js successfully!")
