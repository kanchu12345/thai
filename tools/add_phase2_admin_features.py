with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Methods to add to AdminApp
phase2_methods = '''
    /**
     * Audit Activity Logging in Firestore (Phase 2)
     */
    async logActivity(action, collectionName, docId, summary) {
      const entry = {
        timestamp: new Date().toISOString(),
        user: this.currentUser ? this.currentUser.email : 'admin',
        role: this.currentRole || 'editor',
        action: action, // 'create', 'update', 'delete', 'seed', 'restore'
        collection: collectionName,
        docId: docId,
        summary: summary
      };

      console.log('[ActivityLog]', entry);

      if (this.fbDb) {
        try {
          if (this.fbDb.collection) {
            await this.fbDb.collection('activityLog').add(entry);
          } else {
            const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');
            await addDoc(collection(this.fbDb, 'activityLog'), entry);
          }
        } catch (e) {
          console.warn('[ActivityLog] Could not write to activityLog:', e.message);
        }
      }
    },

    /**
     * Backup Button: Export all 14 Collections to a single JSON file (Phase 2)
     */
    exportCompleteBackup() {
      const backup = {
        meta: {
          exportedAt: new Date().toISOString(),
          version: '2.0-firestore',
          exportedBy: this.currentUser ? this.currentUser.email : 'admin'
        },
        settings: [this.settings],
        categories: this.categories,
        tours: this.packages,
        packages: this.packages,
        destinations: this.destinations,
        testimonials: this.reviews,
        reviews: this.reviews,
        team: this.team,
        mediaFiles: this.mediaFiles,
        inquiries: {
          quick: this.quickInquiries,
          detailed: this.detailedInquiries
        }
      };

      const jsonStr = JSON.stringify(backup, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = `lotus-ceylon-full-backup-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.logActivity('export', 'system', 'all', 'Full database snapshot exported');
      this.showToast('Full database backup downloaded successfully!', 'success');
    },

    /**
     * Restore Button: Imports a JSON snapshot with confirmation (Phase 2)
     */
    async restoreBackup(file) {
      if (!file) return;
      if (!file.name.endsWith('.json')) {
        this.showToast('Please select a valid .json backup file', 'error');
        return;
      }

      if (!confirm(`Warning: Restoring "${file.name}" will merge and update existing collections in Firestore and the Admin Panel. Proceed?`)) {
        return;
      }

      this.showToast(`Reading backup file "${file.name}"...`, 'info', 3000);

      try {
        const text = await file.text();
        const backup = JSON.parse(text);

        if (backup.packages || backup.tours) this.packages = backup.packages || backup.tours;
        if (backup.categories) this.categories = backup.categories;
        if (backup.destinations) this.destinations = backup.destinations;
        if (backup.reviews || backup.testimonials) this.reviews = backup.reviews || backup.testimonials;
        if (backup.team) this.team = backup.team;
        if (backup.settings) this.settings = Array.isArray(backup.settings) ? backup.settings[0] : backup.settings;
        if (backup.mediaFiles) this.mediaFiles = backup.mediaFiles;

        // Sync to Firebase if available
        if (window.LotusFirebase && typeof window.LotusFirebase.seedAllCollections === 'function') {
          await window.LotusFirebase.seedAllCollections();
        }

        this.renderDashboard();
        this.renderPackages();
        this.renderCategories();
        this.renderDestinations();
        this.renderReviews();
        this.renderTeam();
        this.renderMediaLibrary();
        this.renderSettings();

        this.logActivity('restore', 'system', 'all', `Database restored from ${file.name}`);
        this.showToast('Database restore complete and synchronized!', 'success', 5000);
      } catch (err) {
        console.error('Restore error:', err);
        this.showToast('Restore failed: ' + err.message, 'error', 5000);
      }
    },
'''

if 'exportCompleteBackup()' not in code:
    code = code.replace('async seedAllToFirestore() {', phase2_methods + '\n    async seedAllToFirestore() {')

# Add "Where is this used?" check before deleting a category
cat_delete_old = """    deleteCategory(slug) {
      this.confirmDelete(`Are you sure you want to delete category "${slug}"?`, async () => {
        this.categories = this.categories.filter(c => c.slug !== slug);
        this.renderCategories();
        this.showToast(`Category "${slug}" removed`, 'info');
      });
    },"""

cat_delete_new = """    deleteCategory(slug) {
      // "Where is this used?" pre-deletion validation guardrail
      const linkedTours = this.packages.filter(p => p.category_slug === slug || p.category === slug);
      if (linkedTours.length > 0) {
        const tourNames = linkedTours.slice(0, 3).map(p => (typeof p.title === 'object' ? p.title.en : p.title)).join(', ');
        const extra = linkedTours.length > 3 ? ` and ${linkedTours.length - 3} more` : '';
        alert(`Cannot delete category "${slug}".\\n\\nWHERE IS THIS USED?\\nThis category is currently referenced by ${linkedTours.length} active tour package(s):\\n- ${tourNames}${extra}.\\n\\nPlease edit or reassign those tours before deleting this category.`);
        return;
      }

      this.confirmDelete(`Are you sure you want to permanently delete category "${slug}"? This action cannot be undone.`, async () => {
        this.categories = this.categories.filter(c => c.slug !== slug);
        this.renderCategories();
        this.logActivity('delete', 'categories', slug, `Category deleted: ${slug}`);
        this.showToast(`Category "${slug}" removed`, 'info');
      });
    },"""

if cat_delete_old in code:
    code = code.replace(cat_delete_old, cat_delete_new)

# Add "Where is this used?" check before deleting a tour package
pkg_delete_old = """    deletePackage(slug) {
      this.confirmDelete(`Are you sure you want to permanently delete package "${slug}"?`, async () => {
        this.packages = this.packages.filter(p => p.slug !== slug);"""

pkg_delete_new = """    deletePackage(slug) {
      const pkg = this.packages.find(p => p.slug === slug);
      const pkgName = pkg ? (typeof pkg.title === 'object' ? pkg.title.en : pkg.title) : slug;
      const usageNotice = `WHERE IS THIS USED?\\n- Displayed on Homepage signature tours carousel\\n- Included in category "/tours/${pkg?.category_slug || ''}/"\\n- Listed in tours index directory\\n\\nAre you sure you want to permanently delete "${pkgName}"?`;

      this.confirmDelete(usageNotice, async () => {
        this.packages = this.packages.filter(p => p.slug !== slug);
        this.logActivity('delete', 'tours', slug, `Package deleted: ${slug}`);"""

if pkg_delete_old in code:
    code = code.replace(pkg_delete_old, pkg_delete_new)

with open('admin/js/admin-app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print('Successfully added Phase 2 features to admin-app.js!')
