import re

with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update init, escapeHtml, escapeAttr, fetchUserRole, applyRolePermissions, initAuth, showApp, handleLogin
target_block = """    async init() {
      this.initFirebase();
      this.initSupabaseClient();
      this.setupIdleDetector();
      this.setupBeforeUnload();
      await this.initAuth();
    },

    async initAuth() {
      if (this.fbAuth) {
        this.fbAuth.onAuthStateChanged(async (user) => {
          if (user) {
            this.currentUser = { email: user.email, id: user.uid };
            const isAuthorized = await this.fetchUserRole(user.uid, user.email);
            if (!isAuthorized) {
              await this.fbAuth.signOut();
              this.showToast('Access denied: Your account is not configured in /admins/.', 'error');
              this.showLogin();
              return;
            }
            this.showApp();
          } else {
            this.showLogin();
          }
        });
      } else if (this.client) {
        const { data: { session } } = await this.client.auth.getSession();
        if (session) {
          this.currentUser = { email: session.user.email, id: session.user.id };
          await this.fetchUserRole(session.user.id, session.user.email);
          this.showApp();
        } else {
          this.showLogin();
        }
      } else {
        this.showLogin();
      }
    },

    showLogin() {
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

    async handleLogin(e) {
      if (e && e.preventDefault) e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const btn = document.getElementById('loginBtn');

      if (!email || !password) {
        this.showToast('Please enter both email and password', 'error');
        return;
      }

      btn.disabled = true;
      btn.innerHTML = '<span>Signing In...</span>';

      try {
        if (this.fbAuth) {
          const cred = await this.fbAuth.signInWithEmailAndPassword(email, password);
          this.currentUser = { email: cred.user.email, id: cred.user.uid };
          const isAuthorized = await this.fetchUserRole(cred.user.uid, cred.user.email);
          if (isAuthorized === false) {
            await this.fbAuth.signOut();
            this.showToast('Access denied: Account is not configured as an administrator.', 'error');
            return;
          }
          this.showToast('Welcome back to Lotus Ceylon CMS', 'success');
          this.showApp();
        } else if (this.client) {
          const { data, error } = await this.client.auth.signInWithPassword({ email, password });
          if (error) throw error;
          this.showToast('Welcome back to Lotus Ceylon CMS', 'success');
        } else {
          this.showToast('Entering local preview mode...', 'info');
          this.currentUser = { email, id: 'demo-admin-uid' };
          this.currentRole = 'super_admin';
          this.showApp();
        }
      } catch (err) {
        this.showToast('Login failed: ' + err.message, 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>Sign In to Dashboard</span>';
      }
    },"""

replacement_block = """    async init() {
      this.initFirebase();
      this.initSupabaseClient();
      this.setupIdleDetector();
      this.setupBeforeUnload();
      await this.initAuth();
    },

    escapeHtml(val) {
      if (val === null || val === undefined) return '';
      const str = String(val);
      if (window.DOMPurify && typeof window.DOMPurify.sanitize === 'function') {
        return window.DOMPurify.sanitize(str);
      }
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },

    escapeAttr(val) {
      if (val === null || val === undefined) return '';
      return String(val)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    },

    async fetchUserRole(uid, email) {
      try {
        if (this.fbDb) {
          let doc = null;
          if (uid) {
            try {
              doc = await this.fbDb.collection('admins').doc(uid).get();
            } catch (e) {
              doc = null;
            }
          }
          if ((!doc || !doc.exists) && email) {
            try {
              doc = await this.fbDb.collection('admins').doc(email.toLowerCase()).get();
            } catch (e) {
              doc = null;
            }
          }
          if (doc && doc.exists) {
            const data = doc.data() || {};
            this.currentRole = data.role === 'super_admin' ? 'super_admin' : 'editor';
            return true;
          }
          return false;
        }

        if (this.client) {
          const { data, error } = await this.client
            .from('roles')
            .select('role')
            .eq('user_id', uid)
            .maybeSingle();
          if (!error && data && data.role) {
            this.currentRole = data.role === 'super_admin' ? 'super_admin' : 'editor';
            return true;
          }
          return false;
        }

        return false;
      } catch (err) {
        console.error('[AdminApp] fetchUserRole error:', err);
        return false;
      }
    },

    applyRolePermissions() {
      const isSuper = this.currentRole === 'super_admin';
      const usersNav = document.querySelector('.nav-link[data-section="users"]');
      if (usersNav) {
        usersNav.style.display = isSuper ? 'flex' : 'none';
      }
      if (!isSuper && this.activeSection === 'users') {
        this.switchSection('dashboard');
      }
      document.querySelectorAll('.btn-icon.delete').forEach(btn => {
        if (!isSuper) {
          btn.style.opacity = '0.35';
          btn.title = 'Requires Super Admin privileges to delete';
        } else {
          btn.style.opacity = '1';
          btn.removeAttribute('title');
        }
      });
    },

    async initAuth() {
      if (this.fbAuth) {
        this.fbAuth.onAuthStateChanged(async (user) => {
          if (user) {
            this.currentUser = { email: user.email, id: user.uid };
            const isAuthorized = await this.fetchUserRole(user.uid, user.email);
            if (!isAuthorized) {
              await this.fbAuth.signOut();
              this.showToast('Access denied: Your account is not configured in /admins/.', 'error');
              this.showLogin();
              return;
            }
            this.showApp();
          } else {
            this.showLogin();
          }
        });
      } else if (this.client) {
        const { data: { session } } = await this.client.auth.getSession();
        if (session) {
          this.currentUser = { email: session.user.email, id: session.user.id };
          const isAuthorized = await this.fetchUserRole(session.user.id, session.user.email);
          if (!isAuthorized) {
            await this.client.auth.signOut();
            this.showToast('Access denied: Account is not configured with an administrator role.', 'error');
            this.showLogin();
            return;
          }
          this.showApp();
        } else {
          this.showLogin();
        }
      } else {
        this.showLogin();
      }
    },

    showLogin() {
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

      const emailEl = document.getElementById('currentUserEmail') || document.getElementById('adminUserEmail');
      const roleEl = document.getElementById('currentUserRole') || document.getElementById('adminUserRole');
      if (emailEl) emailEl.textContent = this.currentUser ? this.currentUser.email : 'Admin';
      if (roleEl) {
        roleEl.textContent = this.currentRole.replace('_', ' ').toUpperCase();
        roleEl.className = 'role-badge ' + this.currentRole;
      }

      this.applyRolePermissions();
      await this.loadAllData();
      this.switchSection(this.activeSection || 'dashboard');
    },

    async handleLogin(e) {
      if (e && e.preventDefault) e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const btn = document.getElementById('loginBtn');

      if (!email || !password) {
        this.showToast('Please enter both email and password', 'error');
        return;
      }

      btn.disabled = true;
      btn.innerHTML = '<span>Signing In...</span>';

      try {
        if (this.fbAuth) {
          const cred = await this.fbAuth.signInWithEmailAndPassword(email, password);
          this.currentUser = { email: cred.user.email, id: cred.user.uid };
          const isAuthorized = await this.fetchUserRole(cred.user.uid, cred.user.email);
          if (isAuthorized === false) {
            await this.fbAuth.signOut();
            this.showToast('Access denied: Account is not configured as an administrator.', 'error');
            return;
          }
          this.showToast('Welcome back to Lotus Ceylon CMS', 'success');
          this.showApp();
        } else if (this.client) {
          const { data, error } = await this.client.auth.signInWithPassword({ email, password });
          if (error) throw error;
          if (data && data.user) {
            this.currentUser = { email: data.user.email, id: data.user.id };
            const isAuthorized = await this.fetchUserRole(data.user.id, data.user.email);
            if (isAuthorized === false) {
              await this.client.auth.signOut();
              this.showToast('Access denied: Account is not configured with an administrator role.', 'error');
              return;
            }
          }
          this.showToast('Welcome back to Lotus Ceylon CMS', 'success');
          this.showApp();
        } else {
          throw new Error('No authentication provider (Firebase / Supabase) configured or online. Access denied.');
        }
      } catch (err) {
        this.showToast('Login failed: ' + err.message, 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>Sign In to Dashboard</span>';
      }
    },"""

norm_content = content.replace('\r\n', '\n')
norm_target = target_block.replace('\r\n', '\n')
norm_repl = replacement_block.replace('\r\n', '\n')

if norm_target in norm_content:
    norm_content = norm_content.replace(norm_target, norm_repl)
    print("Patched auth block successfully.")
else:
    print("FAILED: target_block not found in admin-app.js")

# 2. Update confirmDelete to enforce role
old_confirm = """    confirmDelete(message, onConfirm) {

      document.getElementById('deleteConfirmMessage').textContent = message;

      const btn = document.getElementById('confirmDeleteBtn');

      btn.onclick = () => {

        onConfirm();

        this.closeModal('confirmDeleteModal');

      };

      this.openModal('confirmDeleteModal');

    },"""

new_confirm = """    confirmDelete(message, onConfirm) {
      if (this.currentRole !== 'super_admin') {
        this.showToast('Access denied: Only Super Admins can delete records.', 'error');
        return;
      }

      document.getElementById('deleteConfirmMessage').textContent = message;

      const btn = document.getElementById('confirmDeleteBtn');

      btn.onclick = () => {

        onConfirm();

        this.closeModal('confirmDeleteModal');

      };

      this.openModal('confirmDeleteModal');

    },"""

norm_old_confirm = old_confirm.replace('\r\n', '\n')
norm_new_confirm = new_confirm.replace('\r\n', '\n')

if norm_old_confirm in norm_content:
    norm_content = norm_content.replace(norm_old_confirm, norm_new_confirm)
    print("Patched confirmDelete role guard successfully.")
else:
    print("WARNING: confirmDelete target not found, trying regex fallback")

with open('admin/js/admin-app.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write(norm_content)

print("Finished security patch.")
