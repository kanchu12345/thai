with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    c = f.read()

old_code = """      if (this.client) {
        try {
          const { error } = await this.client
            .from('tours')
            .upsert([payload], { onConflict: 'slug' });
          if (error) throw error;
          this.showToast(`Package "${title}" saved successfully`, 'success');
        } catch (e) {
          this.showToast('Server save failed: ' + e.message, 'error');
          return;
        }
      } else {
        // Local mode update
        const existingIndex = this.packages.findIndex(p => p.slug === slug);
        if (existingIndex >= 0) {
          this.packages[existingIndex] = { ...this.packages[existingIndex], ...payload };
        } else {
          this.packages.push(payload);
        }
        this.showToast(`Package "${title}" saved (Local mode)`, 'info');
      }"""

new_code = """      // 1. Save to Firebase Firestore
      if (window.LotusFirebase && typeof window.LotusFirebase.savePackage === 'function') {
        try {
          await window.LotusFirebase.savePackage(payload);
          this.showToast(`Package "${title}" saved to Firestore!`, 'success');
        } catch (e) {
          console.warn('[AdminApp] Firebase savePackage warning:', e.message);
          this.showToast(`Saved locally (Firebase sync error: ${e.message})`, 'warning');
        }
      } else if (this.client) {
        try {
          await this.client.from('tours').upsert([payload], { onConflict: 'slug' });
          this.showToast(`Package "${title}" saved successfully`, 'success');
        } catch (e) {
          this.showToast('Server save failed: ' + e.message, 'error');
          return;
        }
      }

      // 2. Update in-memory state
      const existingIndex = this.packages.findIndex(p => p.slug === slug);
      if (existingIndex >= 0) {
        this.packages[existingIndex] = { ...this.packages[existingIndex], ...payload };
      } else {
        this.packages.push(payload);
      }"""

norm_c = c.replace('\r\n', '\n')
norm_old = old_code.replace('\r\n', '\n')
norm_new = new_code.replace('\r\n', '\n')

assert norm_old in norm_c, "Could not find target in admin-app.js"
norm_c = norm_c.replace(norm_old, norm_new, 1)

with open('admin/js/admin-app.js', 'w', encoding='utf-8') as f:
    f.write(norm_c)

print("Updated savePackage successfully!")
