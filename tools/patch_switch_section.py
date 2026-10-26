with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    c = f.read().replace('\r\n', '\n')

old_switch = """    switchSection(sectionId) {

      if (this.unsavedChanges && !confirm('You have unsaved changes. Discard and switch section?')) {

        return;

      }

      this.unsavedChanges = false;

      this.activeSection = sectionId;"""

new_switch = """    switchSection(sectionId) {
      if (this.currentRole !== 'super_admin' && sectionId === 'users') {
        this.showToast('Access denied: Users & Roles section is restricted to Super Admins.', 'error');
        this.activeSection = 'dashboard';
        sectionId = 'dashboard';
      }

      if (this.unsavedChanges && !confirm('You have unsaved changes. Discard and switch section?')) {

        return;

      }

      this.unsavedChanges = false;

      this.activeSection = sectionId;"""

if old_switch in c:
    c = c.replace(old_switch, new_switch)
    with open('admin/js/admin-app.js', 'w', encoding='utf-8', newline='\n') as f:
        f.write(c)
    print("SUCCESS: Added RBAC guard to switchSection.")
else:
    print("FAILED: old_switch not found.")
