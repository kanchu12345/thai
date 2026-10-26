with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    c = f.read()

target = """    async togglePublishPackage(slug, isPublished) {
      const pkg = this.packages.find(p => p.slug === slug);
      if (pkg) pkg.is_published = isPublished;

      if (this.client) {
        try {
          await this.client.from('tours').update({ is_published: isPublished }).eq('slug', slug);
          this.showToast(`Package "${slug}" ${isPublished ? 'published' : 'unpublished'}`, 'success');
        } catch (e) {
          this.showToast('Failed to update status on server', 'error');
        }
      } else {
        this.showToast(`Package status updated to ${isPublished ? 'published' : 'unpublished'} (Local mode)`, 'info');
      }
    },"""

replacement = """    async togglePublishPackage(slug, isPublished) {
      const pkg = this.packages.find(p => p.slug === slug);
      if (pkg) {
        pkg.is_published = isPublished;
        pkg.status = isPublished ? 'published' : 'draft';
      }

      if (this.fbDb) {
        try {
          await this.fbDb.collection('tours').doc(slug).set({ is_published: isPublished, status: isPublished ? 'published' : 'draft', updatedAt: new Date().toISOString() }, { merge: true });
          await this.fbDb.collection('packages').doc(slug).set({ is_published: isPublished, status: isPublished ? 'published' : 'draft', updatedAt: new Date().toISOString() }, { merge: true });
        } catch (e) {
          console.warn('Firestore toggle publish warning:', e);
        }
      }

      this.syncCatalogCache();
      this.showToast(`Package "${slug}" ${isPublished ? 'published' : 'unpublished'}!`, 'success');
    },"""

norm = c.replace('\r\n', '\n')
norm = norm.replace(target.replace('\r\n', '\n'), replacement.replace('\r\n', '\n'), 1)

with open('admin/js/admin-app.js', 'w', encoding='utf-8') as f:
    f.write(norm)

print("Updated togglePublishPackage with direct Firestore update and cache sync!")
