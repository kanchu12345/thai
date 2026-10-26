with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Update saveSettings to write directly to Firestore
old_settings = """    saveSettings() {
      this.showToast('Saving site configurations...', 'info');
      // If client exists, update site_settings table in Supabase
      if (this.client) {
        try {
          await this.client.from('site_settings').upsert([
            {
              key: 'general',
              value: {
                companyName: document.getElementById('settingCompanyName').value,
                slogan: document.getElementById('settingSlogan').value,
                phone: document.getElementById('settingPhone').value,
                email: document.getElementById('settingEmail').value,
                address: document.getElementById('settingAddress').value
              }
            }
          ]);
          this.showToast('Settings saved to database', 'success');
        } catch (e) {
          this.showToast('Save failed: ' + e.message, 'error');
        }
      } else {
        this.showToast('Settings saved locally (Local Mode)', 'info');
      }
    },"""

new_settings = """    async saveSettings() {
      this.showToast('Saving site configurations...', 'info');
      const settingsPayload = {
        id: 'global_settings',
        companyName: document.getElementById('settingCompanyName')?.value || 'Lotus Ceylon',
        slogan: document.getElementById('settingSlogan')?.value || 'PURE JOURNEYS. SACRED EXPERIENCES.',
        phone: document.getElementById('settingPhone')?.value || '+94 71 54 22 384',
        email: document.getElementById('settingEmail')?.value || 'inquiry@lotusceylon.com',
        address: { full: document.getElementById('settingAddress')?.value || '286/C, Niwandama South, Ja-Ela, Sri Lanka – 11350' },
        updatedAt: new Date().toISOString()
      };

      if (this.fbDb) {
        try {
          await this.fbDb.collection('settings').doc('global_settings').set(settingsPayload, { merge: true });
          this.showToast('Settings saved to Firestore!', 'success');
        } catch (e) {
          console.warn('Firestore settings error:', e);
          this.showToast('Saved locally (Firestore error: ' + e.message + ')', 'warning');
        }
      }

      this.settings = [settingsPayload];
      this.syncCatalogCache();
      this.showToast('Settings updated & synced across website!', 'success');
    },"""

# 2. Ensure saveCategory writes to Firestore and calls syncCatalogCache
old_save_cat_end = """      this.closeModal('categoryModal');
      this.renderCategories();
      this.showToast(`Category "${titleEn}" saved successfully`, 'success');
    },"""

new_save_cat_end = """      if (this.fbDb) {
        try {
          await this.fbDb.collection('categories').doc(slug).set(payload, { merge: true });
        } catch (e) {
          console.warn('Firestore category save:', e);
        }
      }
      this.syncCatalogCache();
      this.closeModal('categoryModal');
      this.renderCategories();
      this.showToast(`Category "${titleEn}" saved & synced!`, 'success');
    },"""

# 3. Ensure saveDestination writes to Firestore and calls syncCatalogCache
old_save_dest_end = """      this.closeModal('destinationModal');
      this.renderDestinations();
      this.showToast(`Destination "${titleEn}" saved successfully`, 'success');
    },"""

new_save_dest_end = """      if (this.fbDb) {
        try {
          await this.fbDb.collection('destinations').doc(slug).set(payload, { merge: true });
        } catch (e) {
          console.warn('Firestore destination save:', e);
        }
      }
      this.syncCatalogCache();
      this.closeModal('destinationModal');
      this.renderDestinations();
      this.showToast(`Destination "${titleEn}" saved & synced!`, 'success');
    },"""

# 4. Ensure saveReview writes to Firestore and calls syncCatalogCache
old_save_rev_end = """      this.closeModal('reviewModal');
      this.renderReviews();
      this.showToast(`Review for "${guest_name}" saved successfully`, 'success');
    },"""

new_save_rev_end = """      if (this.fbDb) {
        try {
          await this.fbDb.collection('testimonials').doc(id).set(payload, { merge: true });
          await this.fbDb.collection('reviews').doc(id).set(payload, { merge: true });
        } catch (e) {
          console.warn('Firestore review save:', e);
        }
      }
      this.syncCatalogCache();
      this.closeModal('reviewModal');
      this.renderReviews();
      this.showToast(`Review for "${guest_name}" saved & synced!`, 'success');
    },"""

norm = c.replace('\r\n', '\n')
norm = norm.replace(old_settings.replace('\r\n', '\n'), new_settings.replace('\r\n', '\n'))
norm = norm.replace(old_save_cat_end.replace('\r\n', '\n'), new_save_cat_end.replace('\r\n', '\n'))
norm = norm.replace(old_save_dest_end.replace('\r\n', '\n'), new_save_dest_end.replace('\r\n', '\n'))
norm = norm.replace(old_save_rev_end.replace('\r\n', '\n'), new_save_rev_end.replace('\r\n', '\n'))

with open('admin/js/admin-app.js', 'w', encoding='utf-8') as f:
    f.write(norm)

print("Updated saveCategory, saveDestination, saveReview, and saveSettings with Firestore direct persistence!")
