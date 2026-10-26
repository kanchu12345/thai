with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    c = f.read()

show_methods = '''    showLogin() {
      const auth = document.getElementById('authScreen');
      const app = document.getElementById('adminApp');
      if (auth) auth.style.display = 'flex';
      if (app) app.style.display = 'none';
    },

    async showApp() {
      const auth = document.getElementById('authScreen');
      const app = document.getElementById('adminApp');
      if (auth) auth.style.display = 'none';
      if (app) app.style.display = 'grid';

      const emailEl = document.getElementById('adminUserEmail');
      const roleEl = document.getElementById('adminUserRole');
      if (emailEl) emailEl.textContent = this.currentUser ? this.currentUser.email : 'Admin';
      if (roleEl) {
        roleEl.textContent = this.currentRole.replace('_', ' ').toUpperCase();
        roleEl.className = 'role-badge ' + this.currentRole;
      }

      await this.loadAllData();
      this.switchSection(this.activeSection || 'dashboard');
    },

    async handleLogin(e) {'''

target = "    async handleLogin(e) {"
assert target in c, "target async handleLogin(e) not found"
c = c.replace(target, show_methods, 1)

with open('admin/js/admin-app.js', 'w', encoding='utf-8') as f:
    f.write(c)

print("Added showLogin and showApp to AdminApp!")
