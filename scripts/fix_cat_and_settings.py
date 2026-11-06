import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Fix category heroImage fallbacks
old_cat_fallback_1 = "heroImage: `assets/tours/${c.slug}/hero.jpg`,"
new_cat_fallback_1 = "heroImage: c.heroImage || c.image || 'assets/images/cultural/sigiriya-1.webp',"
assert old_cat_fallback_1 in code, "old_cat_fallback_1 not found"
code = code.replace(old_cat_fallback_1, new_cat_fallback_1)

old_cat_fallback_2 = "const hero = c.heroImage || ('assets/tours/' + c.slug + '/hero.jpg');"
new_cat_fallback_2 = "const hero = c.heroImage || c.image || 'assets/images/cultural/sigiriya-1.webp';"
assert old_cat_fallback_2 in code, "old_cat_fallback_2 not found"
code = code.replace(old_cat_fallback_2, new_cat_fallback_2)

old_cat_fallback_3 = "document.getElementById('catHeroImage').value = cat.heroImage || ('assets/tours/' + cat.slug + '/hero.jpg');"
new_cat_fallback_3 = "document.getElementById('catHeroImage').value = cat.heroImage || cat.image || 'assets/images/cultural/sigiriya-1.webp';"
assert old_cat_fallback_3 in code, "old_cat_fallback_3 not found"
code = code.replace(old_cat_fallback_3, new_cat_fallback_3)

# 2. Fix saveSettings cloudinaryConfig undefined safety
old_settings_cloud = '''    async saveSettings() {
      // Sync Cloudinary settings
      const cName = document.getElementById('settingCloudName') ? document.getElementById('settingCloudName').value.trim() : '';
      const cPreset = document.getElementById('settingUploadPreset') ? document.getElementById('settingUploadPreset').value.trim() : '';
      if (cName) this.cloudinaryConfig.cloudName = cName;
      if (cPreset) this.cloudinaryConfig.uploadPreset = cPreset;'''

new_settings_cloud = '''    async saveSettings() {
      // Sync Cloudinary settings
      this.cloudinaryConfig = this.cloudinaryConfig || {};
      const cName = document.getElementById('settingCloudName') ? document.getElementById('settingCloudName').value.trim() : '';
      const cPreset = document.getElementById('settingUploadPreset') ? document.getElementById('settingUploadPreset').value.trim() : '';
      if (cName) this.cloudinaryConfig.cloudName = cName;
      if (cPreset) this.cloudinaryConfig.uploadPreset = cPreset;'''

assert old_settings_cloud in code, "old_settings_cloud not found"
code = code.replace(old_settings_cloud, new_settings_cloud)

with open('admin/js/admin-app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Fixed category 404 fallbacks and saveSettings cloudinaryConfig safety!")
