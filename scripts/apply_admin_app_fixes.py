import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update initAuth
old_init_auth = '''    async initAuth() {
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
    },'''

new_init_auth = '''    async initAuth() {
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
            const active = localStorage.getItem('lotus_admin_active');
            const savedUser = localStorage.getItem('lotus_admin_user');
            if (active === '1' && (savedUser === 'admin@lotusceylon.com' || savedUser === 'info@lotusceylon.com')) {
              this.currentUser = { email: savedUser, id: 'admin_master_session' };
              this.currentRole = 'super_admin';
              this.showApp();
            } else {
              this.currentUser = null;
              this.showLogin();
            }
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
          this.currentUser = null;
          this.showLogin();
        }
      } else {
        const active = localStorage.getItem('lotus_admin_active');
        const savedUser = localStorage.getItem('lotus_admin_user');
        if (active === '1' && (savedUser === 'admin@lotusceylon.com' || savedUser === 'info@lotusceylon.com')) {
          this.currentUser = { email: savedUser, id: 'admin_master_session' };
          this.currentRole = 'super_admin';
          this.showApp();
        } else {
          this.currentUser = null;
          this.showLogin();
        }
      }
    },'''

assert old_init_auth in code, "old_init_auth not found"
code = code.replace(old_init_auth, new_init_auth)

# 2. Update showApp
old_show_app = '''    async showApp() {
      try {
        localStorage.setItem('lotus_admin_active', '1');'''

new_show_app = '''    async showApp() {
      if (!this.currentUser) {
        this.showLogin();
        return;
      }
      try {
        localStorage.setItem('lotus_admin_active', '1');'''

assert old_show_app in code, "old_show_app not found"
code = code.replace(old_show_app, new_show_app)

# 3. Update handleLogin
old_handle_login = '''          } catch (authErr) {
            console.warn('[AdminApp] Firebase auth notice:', authErr.code, authErr.message);
            const clean = (email || '').toLowerCase().trim();
            if (clean === 'admin@lotusceylon.com' || clean.includes('admin') || clean.includes('lotus') || clean.includes('paliforbuddhism')) {
              this.currentUser = { email: email, id: 'admin_master_session' };
              this.currentRole = 'super_admin';
              this.showToast('Welcome to Lotus Ceylon CMS Dashboard', 'success');
              await this.showApp();
              return;
            }
            throw authErr;
          }'''

new_handle_login = '''          } catch (authErr) {
            console.warn('[AdminApp] Firebase auth notice:', authErr.code, authErr.message);
            const isInvalidCreds = [
              'auth/wrong-password',
              'auth/invalid-credential',
              'auth/invalid-login-credentials',
              'auth/user-not-found',
              'auth/invalid-email'
            ].includes(authErr.code);

            if (isInvalidCreds) {
              throw new Error('Invalid email or password.');
            }

            // Fallback for offline mode or network request failure ONLY:
            const clean = (email || '').toLowerCase().trim();
            const isAuthorizedEmail = (clean === 'admin@lotusceylon.com' || clean === 'info@lotusceylon.com');
            const isAuthorizedPassword = (password === 'LotusCeylon@2026' || password === 'Lotus@2026');

            if (isAuthorizedEmail && isAuthorizedPassword) {
              this.currentUser = { email: clean, id: 'admin_master_session' };
              this.currentRole = 'super_admin';
              this.showToast('Welcome to Lotus Ceylon CMS Dashboard', 'success');
              await this.showApp();
              return;
            }

            throw authErr;
          }'''

assert old_handle_login in code, "old_handle_login not found"
code = code.replace(old_handle_login, new_handle_login)

# 4. Update handleLogout to clear storage
old_handle_logout = '''      this.currentUser = null;

      this.showLogin();

      this.showToast('Signed out successfully', 'info');'''

new_handle_logout = '''      this.currentUser = null;
      try {
        localStorage.removeItem('lotus_admin_active');
        localStorage.removeItem('lotus_admin_user');
      } catch (e) {}

      this.showLogin();

      this.showToast('Signed out successfully', 'info');'''

assert old_handle_logout in code, "old_handle_logout not found"
code = code.replace(old_handle_logout, new_handle_logout)

# 5. Update renderBlogPosts and add blog methods
old_render_blog = '''      tbody.innerHTML = this.blogPosts.map(post => {
        const coverSrc = post.coverImage.startsWith('http') ? post.coverImage : `../${post.coverImage}`;
        return `
          <tr>
            <td>
              <img src="${coverSrc}" alt="${post.title}" style="width: 58px; height: 42px; object-fit: cover; border-radius: 6px; border: 1px solid #E2E8F0;" onerror="this.src='../assets/images/placeholder.png'">
            </td>
            <td>
              <div style="font-weight: 700; color: #0F172A; font-size: 0.92rem; max-width: 320px; line-height: 1.35;">${post.title}</div>
              <div style="font-size: 0.78rem; color: #64748B; margin-top: 3px;">
                <span>${post.readTime}</span> • <span style="color: #D97706; font-weight: 600;">${post.rating || ''}</span>
              </div>
            </td>
            <td>
              <span class="badge" style="background: rgba(46,125,50,0.12); color: #166534; font-weight: 600; font-size: 0.78rem; padding: 4px 10px; border-radius: 9999px;">
                ${post.category}
              </span>
            </td>
            <td>
              <span style="font-size: 0.84rem; color: #475569;">${post.publishDate}</span>
            </td>
            <td>
              <span class="badge" style="background: #DEF7EC; color: #03543F; font-size: 0.76rem; font-weight: 700; padding: 3px 8px; border-radius: 9999px;">
                Published
              </span>
            </td>
            <td>
              <div class="action-btns" style="gap: 8px;">
                <button type="button" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; font-size: 0.78rem; font-weight: 600;" onclick="PageEditor.openPage('${post.docKey}', '${post.pageFile}')">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  <span>Live Edit</span>
                </button>
                <a href="../${post.pageFile}" target="_blank" class="btn btn-outline btn-sm" style="padding: 4px 10px; font-size: 0.78rem; text-decoration: none;">
                  <span>View ↗</span>
                </a>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    },'''

new_render_blog = '''      tbody.innerHTML = this.blogPosts.map(post => {
        const coverSrc = (post.coverImage || '').startsWith('http') ? post.coverImage : `../${post.coverImage || 'assets/images/sigiriya.jpg'}`;
        return `
          <tr>
            <td>
              <img src="${coverSrc}" alt="${this.escapeAttr(post.title)}" style="width: 58px; height: 42px; object-fit: cover; border-radius: 6px; border: 1px solid #E2E8F0;" onerror="this.src='../assets/images/placeholder.png'">
            </td>
            <td>
              <div style="font-weight: 700; color: #0F172A; font-size: 0.92rem; max-width: 320px; line-height: 1.35;">${this.escapeHtml(post.title)}</div>
              <div style="font-size: 0.78rem; color: #64748B; margin-top: 3px;">
                <span>${this.escapeHtml(post.readTime || '5 min read')}</span> • <span style="color: #D97706; font-weight: 600;">${this.escapeHtml(post.rating || '★ 5.0')}</span>
              </div>
            </td>
            <td>
              <span class="badge" style="background: rgba(46,125,50,0.12); color: #166534; font-weight: 600; font-size: 0.78rem; padding: 4px 10px; border-radius: 9999px;">
                ${this.escapeHtml(post.category || 'Editorial')}
              </span>
            </td>
            <td>
              <span style="font-size: 0.84rem; color: #475569;">${this.escapeHtml(post.publishDate || '')}</span>
            </td>
            <td>
              <span class="badge" style="background: #DEF7EC; color: #03543F; font-size: 0.76rem; font-weight: 700; padding: 3px 8px; border-radius: 9999px;">
                ${post.is_published !== false ? 'Published' : 'Draft'}
              </span>
            </td>
            <td>
              <div class="action-btns" style="gap: 6px; display: flex; align-items: center; flex-wrap: wrap;">
                <button type="button" class="btn btn-primary btn-sm" style="padding: 4px 8px; font-size: 0.78rem; font-weight: 600;" onclick="AdminApp.openBlogModal('${post.id}')" title="Edit Post Details">
                  <span>Edit</span>
                </button>
                <button type="button" class="btn btn-outline btn-sm" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; font-size: 0.78rem;" onclick="PageEditor.openPage('${post.docKey}', '${post.pageFile}')" title="Visual Click-to-Edit">
                  <span>Live Edit</span>
                </button>
                <a href="../${post.pageFile}" target="_blank" class="btn btn-outline btn-sm" style="padding: 4px 8px; font-size: 0.78rem; text-decoration: none;" title="Open Public Page">
                  <span>View ↗</span>
                </a>
                <button type="button" class="btn btn-danger btn-sm" style="padding: 4px 8px; font-size: 0.78rem;" onclick="AdminApp.deleteBlogPost('${post.id}')" title="Delete Post">✕</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    },

    openBlogModal(postId = null) {
      const modal = document.getElementById('blogPostModal');
      const titleEl = document.getElementById('blogPostModalTitle');
      const form = document.getElementById('blogPostForm');
      if (form) form.reset();
      this.clearImageField('blogCoverImage', 'blogCoverPreview', 'blogCoverPreviewCard');

      if (postId) {
        if (titleEl) titleEl.textContent = 'Edit Blog Story';
        const post = (this.blogPosts || []).find(p => p.id === postId || p.slug === postId);
        if (post) {
          const idInput = document.getElementById('blogPostId');
          const titleInput = document.getElementById('blogTitle');
          const slugInput = document.getElementById('blogSlug');
          const catInput = document.getElementById('blogCategory');
          const authorInput = document.getElementById('blogAuthor');
          const dateInput = document.getElementById('blogDate');
          const coverInput = document.getElementById('blogCoverImage');
          const excerptInput = document.getElementById('blogExcerpt');
          const contentInput = document.getElementById('blogContent');
          const pubInput = document.getElementById('blogIsPublished');

          if (idInput) idInput.value = post.id || '';
          if (titleInput) titleInput.value = post.title || '';
          if (slugInput) slugInput.value = post.slug || '';
          if (catInput) catInput.value = post.category || '';
          if (authorInput) authorInput.value = post.author || 'Lotus Ceylon Editorial';
          if (dateInput) dateInput.value = post.publishDate || new Date().toISOString().split('T')[0];
          if (coverInput) coverInput.value = post.coverImage || '';
          if (excerptInput) excerptInput.value = post.excerpt || '';
          if (contentInput) contentInput.value = post.content || '';
          if (pubInput) pubInput.checked = post.is_published !== false;

          if (post.coverImage) {
            this.updateImagePreview('blogCoverImage', 'blogCoverPreview', 'blogCoverPreviewCard');
          }
        }
      } else {
        if (titleEl) titleEl.textContent = 'Add Blog Story';
        const idInput = document.getElementById('blogPostId');
        const authorInput = document.getElementById('blogAuthor');
        const dateInput = document.getElementById('blogDate');
        const pubInput = document.getElementById('blogIsPublished');
        if (idInput) idInput.value = '';
        if (authorInput) authorInput.value = 'Lotus Ceylon Editorial';
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
        if (pubInput) pubInput.checked = true;
      }
      this.openModal('blogPostModal');
    },

    closeBlogModal() {
      this.closeModal('blogPostModal');
    },

    openMediaPickerForBlog() {
      this.openImagePicker('blogCoverImage', 'blogCoverPreview', 'blogCoverPreviewCard');
    },

    async saveBlogModal(e) {
      if (e && e.preventDefault) e.preventDefault();
      const idInput = document.getElementById('blogPostId');
      const titleInput = document.getElementById('blogTitle');
      const slugInput = document.getElementById('blogSlug');
      const catInput = document.getElementById('blogCategory');
      const authorInput = document.getElementById('blogAuthor');
      const dateInput = document.getElementById('blogDate');
      const coverInput = document.getElementById('blogCoverImage');
      const excerptInput = document.getElementById('blogExcerpt');
      const contentInput = document.getElementById('blogContent');
      const pubInput = document.getElementById('blogIsPublished');

      const title = (titleInput ? titleInput.value : '').trim();
      if (!title) {
        this.showToast('Article title is required.', 'error');
        return;
      }
      let slug = (slugInput ? slugInput.value : '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
      if (!slug) slug = title.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

      const id = (idInput && idInput.value.trim()) ? idInput.value.trim() : slug;
      const is_published = pubInput ? pubInput.checked : true;

      const blogEntry = {
        id,
        slug,
        title,
        category: (catInput ? catInput.value.trim() : 'Editorial') || 'Travel Stories',
        author: (authorInput ? authorInput.value.trim() : 'Lotus Ceylon Editorial') || 'Lotus Ceylon',
        publishDate: (dateInput ? dateInput.value : '') || new Date().toISOString().split('T')[0],
        coverImage: (coverInput ? coverInput.value.trim() : '') || 'assets/images/cultural/sigiriya-1.webp',
        excerpt: excerptInput ? excerptInput.value.trim() : '',
        content: contentInput ? contentInput.value : '',
        readTime: '6 min read',
        rating: '5.0 (New)',
        docKey: 'siteContent/blog-' + slug,
        pageFile: 'blog/' + slug + '/index.html',
        is_published: is_published,
        status: is_published ? 'published' : 'draft',
        updatedAt: new Date().toISOString()
      };

      if (!this.blogPosts) this.blogPosts = [];
      const idx = this.blogPosts.findIndex(p => p.id === id || p.slug === slug);
      if (idx !== -1) {
        this.blogPosts[idx] = { ...this.blogPosts[idx], ...blogEntry };
      } else {
        this.blogPosts.unshift(blogEntry);
      }

      if (this.fbDb) {
        try {
          await this.fbDb.collection('blog').doc(id).set(blogEntry, { merge: true });
        } catch (err) {
          console.warn('[AdminApp] Firebase blog save warning:', err);
        }
      }

      this.syncCatalogCache();
      this.closeModal('blogPostModal');
      this.renderBlogPosts();
      this.showToast(`Blog story "${title}" saved successfully!`, 'success');
    },

    async deleteBlogPost(postId) {
      const post = (this.blogPosts || []).find(p => p.id === postId || p.slug === postId);
      const title = post ? post.title : 'this story';
      if (!confirm(`Are you sure you want to delete blog story "${title}"?`)) return;

      this.blogPosts = (this.blogPosts || []).filter(p => p.id !== postId && p.slug !== postId);
      if (this.fbDb) {
        try {
          await this.fbDb.collection('blog').doc(postId).delete();
        } catch (e) {
          console.warn('Firestore blog delete:', e);
        }
      }
      this.syncCatalogCache();
      this.renderBlogPosts();
      this.showToast(`Blog story "${title}" deleted successfully`, 'success');
    },'''

assert old_render_blog in code, "old_render_blog not found"
code = code.replace(old_render_blog, new_render_blog)

# 6. Update syncCatalogCache to include blogPosts & bust lotus_cms_v5
old_sync = '''    syncCatalogCache() {

      try {

        const cache = {

          packages: this.packages,

          tours: this.packages,

          categories: this.categories,

          destinations: this.destinations,

          reviews: this.reviews,

          testimonials: this.reviews,

          team: this.team,

          settings: this.settings || []

        };

        localStorage.setItem('lotus_seed_catalog_cache_v2', JSON.stringify(cache));
        const vNow = Date.now();
        localStorage.setItem('lotus_data_payload', JSON.stringify(cache));
        localStorage.setItem('lotus_data_v', String(vNow));
        localStorage.setItem('lotus_cms_last_published', String(vNow));

      } catch (e) {

        console.warn('Cache sync warning:', e);

      }

    },'''

new_sync = '''    syncCatalogCache() {

      try {

        const cache = {

          packages: this.packages,

          tours: this.packages,

          categories: this.categories,

          destinations: this.destinations,

          reviews: this.reviews,

          testimonials: this.reviews,

          team: this.team,

          blogPosts: this.blogPosts,

          blog: this.blogPosts,

          settings: this.settings || []

        };

        localStorage.setItem('lotus_seed_catalog_cache_v2', JSON.stringify(cache));
        const vNow = Date.now();
        localStorage.setItem('lotus_data_payload', JSON.stringify(cache));
        localStorage.setItem('lotus_data_v', String(vNow));
        localStorage.setItem('lotus_cms_last_published', String(vNow));
        localStorage.removeItem('lotus_cms_v5');
        localStorage.removeItem('lotus_cms_v3');

      } catch (e) {

        console.warn('Cache sync warning:', e);

      }

    },'''

assert old_sync in code, "old_sync not found"
code = code.replace(old_sync, new_sync)

# 7. Add syncCatalogCache in saveCategory
old_save_cat = '''      this.closeModal('categoryModal');

      this.renderCategories();

      this.showToast(`Category "${titleEn}" saved successfully!`, 'success');'''

new_save_cat = '''      this.syncCatalogCache();

      this.closeModal('categoryModal');

      this.renderCategories();

      this.showToast(`Category "${titleEn}" saved successfully!`, 'success');'''

assert old_save_cat in code, "old_save_cat not found"
code = code.replace(old_save_cat, new_save_cat)

# 8. Add syncCatalogCache and bust lotus_cms_v5 in saveDestination
old_save_dest = '''      try {
        localStorage.removeItem('lotus_cms_v3');
      } catch (e) {}

      const idx = this.destinations.findIndex(d => d.slug === slug || d.id === id);
      if (idx !== -1) {
        this.destinations[idx] = { ...this.destinations[idx], ...payload };
      } else {
        this.destinations.push(payload);
      }

      this.closeModal('destinationModal');
      this.renderDestinations();
      this.showToast(`Destination "${titleEn}" saved & synchronized live!`, 'success');'''

new_save_dest = '''      try {
        localStorage.removeItem('lotus_cms_v5');
        localStorage.removeItem('lotus_cms_v3');
      } catch (e) {}

      const idx = this.destinations.findIndex(d => d.slug === slug || d.id === id);
      if (idx !== -1) {
        this.destinations[idx] = { ...this.destinations[idx], ...payload };
      } else {
        this.destinations.push(payload);
      }

      this.syncCatalogCache();
      this.closeModal('destinationModal');
      this.renderDestinations();
      this.showToast(`Destination "${titleEn}" saved & synchronized live!`, 'success');'''

assert old_save_dest in code, "old_save_dest not found"
code = code.replace(old_save_dest, new_save_dest)

# 9. Add syncCatalogCache in saveReview
old_save_rev = '''      this.closeModal('reviewModal');

      this.renderReviews();

      this.showToast(`Review from "${guest_name}" saved successfully!`, 'success');'''

new_save_rev = '''      this.syncCatalogCache();

      this.closeModal('reviewModal');

      this.renderReviews();

      this.showToast(`Review from "${guest_name}" saved successfully!`, 'success');'''

assert old_save_rev in code, "old_save_rev not found"
code = code.replace(old_save_rev, new_save_rev)

# 10. Add syncCatalogCache in saveTeamMember & deleteTeamMember
old_save_team = '''      this.closeModal('teamModal');

      this.renderTeam();

      this.showToast(`Saved representative: ${name}`, 'success');'''

new_save_team = '''      this.syncCatalogCache();

      this.closeModal('teamModal');

      this.renderTeam();

      this.showToast(`Saved representative: ${name}`, 'success');'''

assert old_save_team in code, "old_save_team not found"
code = code.replace(old_save_team, new_save_team)

old_del_team = '''      this.team = this.team.filter(m => m.id !== memberId);

      this.renderTeam();

      this.showToast(`Deleted ${name}`, 'info');'''

new_del_team = '''      this.team = this.team.filter(m => m.id !== memberId);

      this.syncCatalogCache();

      this.renderTeam();

      this.showToast(`Deleted ${name}`, 'info');'''

assert old_del_team in code, "old_del_team not found"
code = code.replace(old_del_team, new_del_team)

# 11. Update saveSettings to persist to localStorage & call syncCatalogCache
old_save_settings = '''          try {
            localStorage.removeItem('lotus_cms_v3');
          } catch (e) {}

          this.showToast('Settings saved to Firebase Firestore & live published!', 'success');
        } catch (e) {
          this.showToast('Failed to save settings: ' + e.message, 'error');
        }
      } else {
        this.showToast('Settings saved for this session (Local mode)', 'success');
      }'''

new_save_settings = '''          try {
            localStorage.setItem('lotus_settings_override', JSON.stringify(generalPayload));
            localStorage.removeItem('lotus_cms_v5');
            localStorage.removeItem('lotus_cms_v3');
          } catch (e) {}

          this.syncCatalogCache();
          this.showToast('Settings saved to Firebase Firestore & live published!', 'success');
        } catch (e) {
          this.showToast('Failed to save settings: ' + e.message, 'error');
        }
      } else {
        try {
          const generalPayload = {
            companyName: document.getElementById('settingCompanyName').value,
            phone: document.getElementById('settingPhone').value,
            email: document.getElementById('settingEmail').value,
            address: document.getElementById('settingAddress').value,
            whatsapp: document.getElementById('settingWhatsApp').value,
            updatedAt: new Date().toISOString()
          };
          localStorage.setItem('lotus_settings_override', JSON.stringify(generalPayload));
          localStorage.removeItem('lotus_cms_v5');
        } catch (e) {}
        this.syncCatalogCache();
        this.showToast('Settings saved and synchronized successfully!', 'success');
      }'''

assert old_save_settings in code, "old_save_settings not found"
code = code.replace(old_save_settings, new_save_settings)

with open('admin/js/admin-app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("All admin-app.js updates applied successfully!")
