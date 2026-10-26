import re

with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Helper to sync current in-memory admin state into localStorage cache so public site reflects edits instantly
sync_cache_helper = """
    /**
     * Update localStorage catalog cache so public website reflects changes immediately
     */
    syncCatalogCache() {
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
      } catch (e) {
        console.warn('Cache sync warning:', e);
      }
    },
"""

# 1. Update renderCategories to add Delete button
old_render_cats = """          <td style="text-align: right;">
            <div class="action-btns" style="justify-content: flex-end;">
              <button class="btn-icon" title="Edit Category" onclick="AdminApp.openCategoryModal('${c.slug}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              </button>
            </div>
          </td>"""

new_render_cats = """          <td style="text-align: right;">
            <div class="action-btns" style="justify-content: flex-end; display: flex; gap: 6px;">
              <button class="btn-icon" title="Edit Category" onclick="AdminApp.openCategoryModal('${c.slug}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              </button>
              <button class="btn-icon delete" title="Delete Category" onclick="AdminApp.deleteCategory('${c.slug || c.id}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
          </td>"""

# 2. Update renderDestinations to add Delete button
old_render_dests = """          <td style="text-align: right;">
            <button class="btn btn-outline btn-sm" onclick="AdminApp.openDestinationModal('${d.slug}')">Edit</button>
          </td>"""

new_render_dests = """          <td style="text-align: right;">
            <div class="action-btns" style="justify-content: flex-end; display: flex; gap: 6px;">
              <button class="btn btn-outline btn-sm" onclick="AdminApp.openDestinationModal('${d.slug}')">Edit</button>
              <button class="btn-icon delete" title="Delete Destination" onclick="AdminApp.deleteDestination('${d.slug || d.id}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
          </td>"""

# 3. Update renderReviews to add Delete button
old_render_revs = """          <td style="text-align: right;">
            <button class="btn btn-outline btn-sm" onclick="AdminApp.openReviewModal('${r.id}')">Edit</button>
          </td>"""

new_render_revs = """          <td style="text-align: right;">
            <div class="action-btns" style="justify-content: flex-end; display: flex; gap: 6px;">
              <button class="btn btn-outline btn-sm" onclick="AdminApp.openReviewModal('${r.id}')">Edit</button>
              <button class="btn-icon delete" title="Delete Review" onclick="AdminApp.deleteReview('${r.id}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
          </td>"""

norm = code.replace('\r\n', '\n')
norm = norm.replace(old_render_cats.replace('\r\n', '\n'), new_render_cats.replace('\r\n', '\n'))
norm = norm.replace(old_render_dests.replace('\r\n', '\n'), new_render_dests.replace('\r\n', '\n'))
norm = norm.replace(old_render_revs.replace('\r\n', '\n'), new_render_revs.replace('\r\n', '\n'))

# Add CRUD methods: deleteCategory, deleteDestination, deleteReview and robust deletePackage
crud_methods = """
    deleteCategory(slugOrId) {
      const cat = this.categories.find(c => c.slug === slugOrId || c.id === slugOrId);
      const name = cat ? (cat.title?.en || cat.name || slugOrId) : slugOrId;
      if (!confirm(`Are you sure you want to permanently delete category "${name}"?`)) return;

      this.categories = this.categories.filter(c => c.slug !== slugOrId && c.id !== slugOrId);
      if (this.fbDb) {
        this.fbDb.collection('categories').doc(slugOrId).delete().catch(e => console.warn('Firestore delete cat:', e));
      }
      this.syncCatalogCache();
      this.renderCategories();
      this.showToast(`Category "${name}" deleted successfully`, 'success');
    },

    deleteDestination(slugOrId) {
      const dest = this.destinations.find(d => d.slug === slugOrId || d.id === slugOrId);
      const name = dest ? (dest.title?.en || dest.title || slugOrId) : slugOrId;
      if (!confirm(`Are you sure you want to permanently delete destination "${name}"?`)) return;

      this.destinations = this.destinations.filter(d => d.slug !== slugOrId && d.id !== slugOrId);
      if (this.fbDb) {
        this.fbDb.collection('destinations').doc(slugOrId).delete().catch(e => console.warn('Firestore delete dest:', e));
      }
      this.syncCatalogCache();
      this.renderDestinations();
      this.showToast(`Destination "${name}" deleted successfully`, 'success');
    },

    deleteReview(id) {
      const rev = this.reviews.find(r => r.id === id);
      const name = rev ? rev.guest_name : id;
      if (!confirm(`Are you sure you want to delete review from "${name}"?`)) return;

      this.reviews = this.reviews.filter(r => r.id !== id);
      if (this.fbDb) {
        this.fbDb.collection('testimonials').doc(id).delete().catch(e => {});
        this.fbDb.collection('reviews').doc(id).delete().catch(e => {});
      }
      this.syncCatalogCache();
      this.renderReviews();
      this.showToast(`Review deleted successfully`, 'success');
    },
"""

# Insert crud_methods and syncCatalogCache right before deletePackage
old_del_pkg = """    deletePackage(slug) {"""
new_del_pkg = sync_cache_helper + crud_methods + """
    deletePackage(slug) {
      const pkg = this.packages.find(p => p.slug === slug);
      const pkgName = pkg ? (typeof pkg.title === 'object' ? pkg.title.en : pkg.title) : slug;
      const usageNotice = `Are you sure you want to permanently delete "${pkgName}"?`;

      this.confirmDelete(usageNotice, async () => {
        this.packages = this.packages.filter(p => p.slug !== slug);
        this.logActivity('delete', 'tours', slug, `Package deleted: ${slug}`);

        if (this.fbDb) {
          try {
            await this.fbDb.collection('tours').doc(slug).delete();
            await this.fbDb.collection('packages').doc(slug).delete();
          } catch (e) {
            console.warn('Firestore package delete warning:', e);
          }
        }
        if (this.client) {
          try {
            await this.client.from('tours').delete().eq('slug', slug);
          } catch (e) {}
        }
        this.syncCatalogCache();
        this.renderPackages();
        this.renderDashboard();
        this.showToast(`Tour package "${pkgName}" deleted successfully!`, 'success');
      });
      return;
    },
    _legacyDeletePackage(slug) {"""

norm = norm.replace(old_del_pkg, new_del_pkg, 1)

with open('admin/js/admin-app.js', 'w', encoding='utf-8') as f:
    f.write(norm)

print("Updated admin-app.js with full CRUD and Delete actions!")
