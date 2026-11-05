import re

with open('admin/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Package Modal: Hero image preview
pkg_old = '''          <div class="form-group">
            <label>Hero Featured Image</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <input type="text" id="pkgHeroImage" class="form-control" style="flex: 1; min-width: 220px;" placeholder="assets/images/cultural-triangle.jpg or Cloudinary URL">
              <button type="button" class="btn btn-secondary" onclick="AdminApp.openCloudinaryWidgetForInput('pkgHeroImage')" title="Direct unsigned upload to Cloudinary preset">☁️ Upload Cloudinary</button>
              <button type="button" class="btn btn-outline" onclick="AdminApp.openImagePicker('pkgHeroImage')">Browse Media</button>
            </div>
          </div>'''

pkg_new = '''          <div class="form-group">
            <label>Hero Featured Image *</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <input type="text" id="pkgHeroImage" class="form-control" style="flex: 1; min-width: 220px;" placeholder="assets/images/cultural/sigiriya-1.webp or Cloudinary URL" oninput="AdminApp.updateImagePreview('pkgHeroImage', 'pkgHeroImagePreview', 'pkgHeroPreviewCard')">
              <button type="button" class="btn btn-secondary" onclick="AdminApp.openCloudinaryWidgetForInput('pkgHeroImage', 'pkgHeroImagePreview', 'pkgHeroPreviewCard')" title="Direct unsigned upload to Cloudinary preset">☁️ Upload Cloudinary</button>
              <button type="button" class="btn btn-outline" onclick="AdminApp.openImagePicker('pkgHeroImage', 'pkgHeroImagePreview', 'pkgHeroPreviewCard')">Browse Media</button>
              <label class="btn-upload-direct" title="Upload local WebP/JPG directly">
                <span>📁 Local Upload</span>
                <input type="file" accept="image/*" style="display: none;" onchange="AdminApp.handleDirectImageUpload(this.files[0], 'pkgHeroImage', 'pkgHeroImagePreview', 'pkgHeroPreviewCard')">
              </label>
            </div>
            <!-- Live Image Preview Card -->
            <div class="image-preview-card" id="pkgHeroPreviewCard" style="display: none;">
              <div class="image-preview-thumb-wrap">
                <img id="pkgHeroImagePreview" src="" alt="Hero Image Preview" class="image-preview-thumb" onerror="AdminApp.handlePreviewError(this)">
              </div>
              <div class="image-preview-info">
                <span class="image-preview-title">Hero Featured Image <span class="image-preview-badge" id="pkgHeroBadge">Image Preview</span></span>
                <span class="image-preview-url" id="pkgHeroPreviewUrl"></span>
              </div>
              <div class="image-preview-actions">
                <button type="button" class="btn btn-sm btn-outline" onclick="AdminApp.clearImageField('pkgHeroImage', 'pkgHeroImagePreview', 'pkgHeroPreviewCard')">Remove</button>
              </div>
            </div>
          </div>'''

html = html.replace(pkg_old, pkg_new)

# 2. Team Modal: Photo preview
team_old = '''          <div class="form-group">
            <label for="teamPhotoUrl">Photo URL (Cloudinary or local image)</label>
            <div style="display: flex; gap: 8px;">
              <input type="url" id="teamPhotoUrl" class="form-control" placeholder="https://res.cloudinary.com/..." style="flex: 1;">
              <button type="button" class="btn btn-outline btn-sm" onclick="AdminApp.openCloudinaryForTeam()">Upload Photo</button>
            </div>
            <small style="color: var(--ink-muted); font-size: 0.78rem;">Upload portrait or square photo. Face will be centered automatically via Cloudinary.</small>
          </div>'''

team_new = '''          <div class="form-group">
            <label for="teamPhotoUrl">Photo URL (Cloudinary or local image)</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <input type="url" id="teamPhotoUrl" class="form-control" placeholder="https://res.cloudinary.com/..." style="flex: 1; min-width: 200px;" oninput="AdminApp.updateImagePreview('teamPhotoUrl', 'teamPhotoPreview', 'teamPhotoPreviewCard')">
              <button type="button" class="btn btn-outline btn-sm" onclick="AdminApp.openCloudinaryForTeam()">Upload Photo</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="AdminApp.openImagePicker('teamPhotoUrl', 'teamPhotoPreview', 'teamPhotoPreviewCard')">Browse Media</button>
            </div>
            <!-- Live Image Preview Card -->
            <div class="image-preview-card" id="teamPhotoPreviewCard" style="display: none;">
              <div class="image-preview-thumb-wrap">
                <img id="teamPhotoPreview" src="" alt="Representative Photo" class="image-preview-thumb" onerror="AdminApp.handlePreviewError(this)">
              </div>
              <div class="image-preview-info">
                <span class="image-preview-title">Representative Photo</span>
                <span class="image-preview-url" id="teamPhotoPreviewUrl"></span>
              </div>
              <div class="image-preview-actions">
                <button type="button" class="btn btn-sm btn-outline" onclick="AdminApp.clearImageField('teamPhotoUrl', 'teamPhotoPreview', 'teamPhotoPreviewCard')">Remove</button>
              </div>
            </div>
            <small style="color: var(--ink-muted); font-size: 0.78rem;">Upload portrait or square photo. Face will be centered automatically via Cloudinary.</small>
          </div>'''

html = html.replace(team_old, team_new)

# 3. Settings: Master Seeder Banner
settings_target = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 24px;">'
seeder_banner = '''          <!-- Master Seeder Banner (Job 5) -->
          <div class="seeder-banner">
            <h3><span>⚡</span> Master Firestore Synchronizer &amp; Content Seeder</h3>
            <p>Seed, sync, and persist all 14 site collections to Firebase Firestore with a single click. Populates all 26 tour packages, 10 categories, 10 destinations, reviews, team, faqs, settings, and 140 self-hosted media assets across 10 supported languages.</p>
            <div class="seeder-stats">
              <span class="seeder-stat-pill"><strong>26</strong> Tour Packages</span>
              <span class="seeder-stat-pill"><strong>10</strong> Travel Categories</span>
              <span class="seeder-stat-pill"><strong>10</strong> Sacred Destinations</span>
              <span class="seeder-stat-pill"><strong>140</strong> Media Assets</span>
              <span class="seeder-stat-pill"><strong>10</strong> Languages</span>
              <span class="seeder-stat-pill"><strong>3</strong> Inquiry Forms</span>
            </div>
            <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
              <button type="button" class="btn btn-gold" onclick="AdminApp.seedAllToFirestore()" id="btnMasterSeed" style="padding: 10px 22px; font-weight: 700; font-size: 0.95rem;">
                <span>🚀 Seed All 14 Collections to Firebase</span>
              </button>
              <button type="button" class="btn btn-secondary" onclick="AdminApp.fetchFromFirebase()" style="padding: 10px 18px;">
                <span>🔄 Refresh from Firestore</span>
              </button>
              <span id="seederStatusText" style="font-size: 0.88rem; color: #E5B869; font-weight: 600;">Ready to seed</span>
            </div>
            <div class="seeder-progress-wrap" id="seederProgressWrap">
              <div class="seeder-progress-bar" id="seederProgressBar"></div>
            </div>
          </div>

          '''

if 'seeder-banner' not in html:
    html = html.replace(settings_target, seeder_banner + settings_target, 1)

# 4. Modals for Category, Destination, Review
modals_html = '''
  <!-- CATEGORY EDIT MODAL -->
  <div class="modal-overlay" id="categoryModal">
    <div class="modal-dialog">
      <div class="modal-header">
        <h3 id="categoryModalTitle">Edit Category</h3>
        <button class="modal-close" onclick="AdminApp.closeModal('categoryModal')">&times;</button>
      </div>
      <div class="modal-body">
        <form id="categoryForm" onsubmit="AdminApp.saveCategory(event)">
          <input type="hidden" id="catId">
          
          <div class="form-group">
            <label>Category Title (EN) *</label>
            <input type="text" id="catTitle" class="form-control" required placeholder="Cultural Triangle & Heritage">
          </div>
          <div class="form-group">
            <label>Category Title (中文)</label>
            <input type="text" id="catTitleZh" class="form-control" placeholder="文化三角洲与世界遗产">
          </div>
          
          <div class="form-row">
            <div class="form-group" style="flex: 1;">
              <label>Slug *</label>
              <input type="text" id="catSlug" class="form-control" required placeholder="cultural">
            </div>
            <div class="form-group" style="flex: 1;">
              <label>Display Sort Order</label>
              <input type="number" id="catOrder" class="form-control" value="1" min="1" max="99">
            </div>
          </div>

          <div class="form-group">
            <label>Tagline</label>
            <input type="text" id="catTagline" class="form-control" placeholder="SACRED KINGDOMS · UNESCO LIVING HERITAGE">
          </div>

          <div class="form-group">
            <label>Description & Overview</label>
            <textarea id="catDescription" class="form-control" rows="3" placeholder="Overview of this travel category..."></textarea>
          </div>

          <div class="form-group">
            <label>Category Hero Image</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <input type="text" id="catHeroImage" class="form-control" style="flex: 1; min-width: 200px;" placeholder="assets/tours/cultural/hero.jpg" oninput="AdminApp.updateImagePreview('catHeroImage', 'catHeroPreview', 'catHeroPreviewCard')">
              <button type="button" class="btn btn-secondary" onclick="AdminApp.openCloudinaryWidgetForInput('catHeroImage', 'catHeroPreview', 'catHeroPreviewCard')">☁️ Cloudinary</button>
              <button type="button" class="btn btn-outline" onclick="AdminApp.openImagePicker('catHeroImage', 'catHeroPreview', 'catHeroPreviewCard')">Browse Media</button>
            </div>
            <div class="image-preview-card" id="catHeroPreviewCard" style="display: none;">
              <div class="image-preview-thumb-wrap">
                <img id="catHeroPreview" src="" alt="Category Hero Preview" class="image-preview-thumb" onerror="AdminApp.handlePreviewError(this)">
              </div>
              <div class="image-preview-info">
                <span class="image-preview-title">Category Hero Image</span>
                <span class="image-preview-url" id="catHeroPreviewUrl"></span>
              </div>
              <div class="image-preview-actions">
                <button type="button" class="btn btn-sm btn-outline" onclick="AdminApp.clearImageField('catHeroImage', 'catHeroPreview', 'catHeroPreviewCard')">Remove</button>
              </div>
            </div>
          </div>

          <div class="form-group" style="margin-top: 15px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="catPublished" checked> Published on Website
            </label>
          </div>

          <div class="modal-footer" style="padding: 16px 0 0; margin-top: 16px;">
            <button type="button" class="btn btn-outline" onclick="AdminApp.closeModal('categoryModal')">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Category</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- DESTINATION EDIT MODAL -->
  <div class="modal-overlay" id="destinationModal">
    <div class="modal-dialog">
      <div class="modal-header">
        <h3 id="destinationModalTitle">Edit Destination</h3>
        <button class="modal-close" onclick="AdminApp.closeModal('destinationModal')">&times;</button>
      </div>
      <div class="modal-body">
        <form id="destinationForm" onsubmit="AdminApp.saveDestination(event)">
          <input type="hidden" id="destId">
          
          <div class="form-group">
            <label>Destination Name (EN) *</label>
            <input type="text" id="destTitle" class="form-control" required placeholder="Sigiriya Rock Fortress">
          </div>
          <div class="form-group">
            <label>Destination Name (中文)</label>
            <input type="text" id="destTitleZh" class="form-control" placeholder="狮子岩空中宫殿">
          </div>

          <div class="form-row">
            <div class="form-group" style="flex: 1;">
              <label>Region *</label>
              <select id="destRegion" class="form-control">
                <option value="Cultural Triangle">Cultural Triangle</option>
                <option value="Sacred Sites">Sacred Sites</option>
                <option value="Hill Country">Hill Country</option>
                <option value="Wildlife Parks">Wildlife Parks</option>
                <option value="Southern Coast">Southern Coast</option>
                <option value="Beach & Ocean">Beach & Ocean</option>
              </select>
            </div>
            <div class="form-group" style="flex: 1;">
              <label>Slug *</label>
              <input type="text" id="destSlug" class="form-control" required placeholder="sigiriya">
            </div>
            <div class="form-group" style="flex: 1;">
              <label>Order</label>
              <input type="number" id="destOrder" class="form-control" value="1" min="1" max="99">
            </div>
          </div>

          <div class="form-group">
            <label>Description (EN)</label>
            <textarea id="destDescription" class="form-control" rows="3" placeholder="Dramatic fifth-century rock citadel rising from the jungle..."></textarea>
          </div>

          <div class="form-group">
            <label>Destination Card Image</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <input type="text" id="destImage" class="form-control" style="flex: 1; min-width: 200px;" placeholder="assets/images/cultural/sigiriya-1.webp" oninput="AdminApp.updateImagePreview('destImage', 'destImagePreview', 'destImagePreviewCard')">
              <button type="button" class="btn btn-secondary" onclick="AdminApp.openCloudinaryWidgetForInput('destImage', 'destImagePreview', 'destImagePreviewCard')">☁️ Cloudinary</button>
              <button type="button" class="btn btn-outline" onclick="AdminApp.openImagePicker('destImage', 'destImagePreview', 'destImagePreviewCard')">Browse Media</button>
            </div>
            <div class="image-preview-card" id="destImagePreviewCard" style="display: none;">
              <div class="image-preview-thumb-wrap">
                <img id="destImagePreview" src="" alt="Destination Preview" class="image-preview-thumb" onerror="AdminApp.handlePreviewError(this)">
              </div>
              <div class="image-preview-info">
                <span class="image-preview-title">Card Image</span>
                <span class="image-preview-url" id="destImagePreviewUrl"></span>
              </div>
              <div class="image-preview-actions">
                <button type="button" class="btn btn-sm btn-outline" onclick="AdminApp.clearImageField('destImage', 'destImagePreview', 'destImagePreviewCard')">Remove</button>
              </div>
            </div>
          </div>

          <div class="form-group" style="margin-top: 15px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="destPublished" checked> Published on Website
            </label>
          </div>

          <div class="modal-footer" style="padding: 16px 0 0; margin-top: 16px;">
            <button type="button" class="btn btn-outline" onclick="AdminApp.closeModal('destinationModal')">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Destination</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- REVIEW EDIT MODAL -->
  <div class="modal-overlay" id="reviewModal">
    <div class="modal-dialog">
      <div class="modal-header">
        <h3 id="reviewModalTitle">Add Guest Review</h3>
        <button class="modal-close" onclick="AdminApp.closeModal('reviewModal')">&times;</button>
      </div>
      <div class="modal-body">
        <form id="reviewForm" onsubmit="AdminApp.saveReview(event)">
          <input type="hidden" id="revId">
          
          <div class="form-row">
            <div class="form-group" style="flex: 2;">
              <label>Guest Name *</label>
              <input type="text" id="revGuestName" class="form-control" required placeholder="Dr. David & Sarah Jenkins">
            </div>
            <div class="form-group" style="flex: 1;">
              <label>Country *</label>
              <input type="text" id="revCountry" class="form-control" required placeholder="United Kingdom">
            </div>
            <div class="form-group" style="flex: 1;">
              <label>Rating (Stars) *</label>
              <select id="revRating" class="form-control">
                <option value="5">★★★★★ (5 Stars)</option>
                <option value="4">★★★★☆ (4 Stars)</option>
                <option value="3">★★★☆☆ (3 Stars)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Tour Taken</label>
            <input type="text" id="revTourTaken" class="form-control" placeholder="14-Day Grand Ceylon Heritage & Leopard Safari">
          </div>

          <div class="form-group">
            <label>Review Narrative (EN) *</label>
            <textarea id="revText" class="form-control" rows="4" required placeholder="Detailed guest testimonial feedback..."></textarea>
          </div>

          <div class="form-group">
            <label>Review Narrative (中文)</label>
            <textarea id="revTextZh" class="form-control" rows="3" placeholder="中文翻译..."></textarea>
          </div>

          <div class="form-group">
            <label>Guest Avatar Photo</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <input type="text" id="revAvatar" class="form-control" style="flex: 1; min-width: 200px;" placeholder="assets/images/avatar-1.jpg" oninput="AdminApp.updateImagePreview('revAvatar', 'revAvatarPreview', 'revAvatarPreviewCard')">
              <button type="button" class="btn btn-secondary" onclick="AdminApp.openCloudinaryWidgetForInput('revAvatar', 'revAvatarPreview', 'revAvatarPreviewCard')">☁️ Cloudinary</button>
              <button type="button" class="btn btn-outline" onclick="AdminApp.openImagePicker('revAvatar', 'revAvatarPreview', 'revAvatarPreviewCard')">Browse Media</button>
            </div>
            <div class="image-preview-card" id="revAvatarPreviewCard" style="display: none;">
              <div class="image-preview-thumb-wrap">
                <img id="revAvatarPreview" src="" alt="Avatar Preview" class="image-preview-thumb" onerror="AdminApp.handlePreviewError(this)">
              </div>
              <div class="image-preview-info">
                <span class="image-preview-title">Guest Avatar</span>
                <span class="image-preview-url" id="revAvatarPreviewUrl"></span>
              </div>
              <div class="image-preview-actions">
                <button type="button" class="btn btn-sm btn-outline" onclick="AdminApp.clearImageField('revAvatar', 'revAvatarPreview', 'revAvatarPreviewCard')">Remove</button>
              </div>
            </div>
          </div>

          <div class="form-group" style="margin-top: 15px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="revPublished" checked> Published on Website
            </label>
          </div>

          <div class="modal-footer" style="padding: 16px 0 0; margin-top: 16px;">
            <button type="button" class="btn btn-outline" onclick="AdminApp.closeModal('reviewModal')">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Review</button>
          </div>
        </form>
      </div>
    </div>
  </div>
'''

if 'id="categoryModal"' not in html:
    toast_pos = html.find('<!-- TOAST NOTIFICATIONS CONTAINER -->')
    if toast_pos != -1:
        html = html[:toast_pos] + modals_html + '\n  ' + html[toast_pos:]

with open('admin/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Updated admin/index.html successfully!')
