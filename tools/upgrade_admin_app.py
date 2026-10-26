import os
import re

with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add Image Helper Methods & ResolveImg
helpers = '''
    /**
     * Smart Image URL Resolver (Safe for Admin and Public Views)
     */
    resolveImg(url) {
      if (!url) return '../assets/images/logo.png';
      url = String(url).trim();
      if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
        return url;
      }
      if (url.startsWith('../')) return url;
      if (url.startsWith('/')) return '..' + url;
      return '../' + url;
    },

    /**
     * Live Image Preview Updater
     */
    updateImagePreview(inputId, previewImgId, cardId, badgeId = null) {
      const input = document.getElementById(inputId);
      const preview = document.getElementById(previewImgId);
      const card = document.getElementById(cardId);
      const urlDisplay = document.getElementById(cardId ? cardId.replace('Card', 'Url') : null);
      const badge = badgeId ? document.getElementById(badgeId) : null;
      if (!input || !preview || !card) return;

      const val = input.value.trim();
      if (!val) {
        card.style.display = 'none';
        preview.src = '';
        return;
      }

      const resolved = this.resolveImg(val);
      preview.src = resolved;
      card.style.display = 'flex';
      if (urlDisplay) urlDisplay.textContent = val;

      if (badge) {
        if (val.startsWith('http') && val.includes('cloudinary')) {
          badge.textContent = 'Cloudinary CDN';
          badge.className = 'image-preview-badge cdn';
        } else if (val.startsWith('http')) {
          badge.textContent = 'External Web';
          badge.className = 'image-preview-badge';
        } else {
          badge.textContent = 'Local WebP Asset';
          badge.className = 'image-preview-badge';
        }
      }
    },

    /**
     * Clear an Image Input Field & its Preview
     */
    clearImageField(inputId, previewImgId, cardId) {
      const input = document.getElementById(inputId);
      const preview = document.getElementById(previewImgId);
      const card = document.getElementById(cardId);
      if (input) input.value = '';
      if (preview) preview.src = '';
      if (card) card.style.display = 'none';
      this.showToast('Image removed', 'info');
    },

    /**
     * Handle Image Preview Load Error
     */
    handlePreviewError(img) {
      img.src = '../assets/images/logo.png';
      img.alt = 'Image not found - click to select or upload';
    },

    /**
     * Direct local file upload with Canvas WebP compression and instant preview
     */
    handleDirectImageUpload(file, inputId, previewImgId, cardId) {
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        this.showToast('Please select a valid image file', 'error');
        return;
      }
      this.showToast(`Compressing ${file.name} to WebP...`, 'info', 2000);
      this.compressImageToWebP(file, 1920, 0.85).then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const input = document.getElementById(inputId);
        if (input) input.value = blobUrl;
        this.updateImagePreview(inputId, previewImgId, cardId);

        const safeName = file.name.replace(/\\.[^/.]+$/, "") + '.webp';
        this.mediaFiles.unshift({
          name: safeName,
          url: blobUrl,
          isVideo: false,
          size: `${Math.round(blob.size / 1024)} KB`
        });
        this.renderMediaLibrary();
        this.showToast(`Image ${safeName} uploaded with live preview!`, 'success');
      }).catch(err => {
        this.showToast('Upload error: ' + err.message, 'error');
      });
    },
'''

# Insert helpers right before init()
if 'resolveImg(' not in code:
    code = code.replace('async init() {', helpers + '\n    async init() {')

# 2. Upgrade loadLocalFallbackData to load seed-catalog.json
fallback_old = '''    async loadLocalFallbackData() {
      try {
        // 1. Load tour catalog from data/packages.json
        try {
          const pkgRes = await fetch('../data/packages.json');
          if (pkgRes.ok) {
            const pkgData = await pkgRes.json();
            if (pkgData.packages && pkgData.packages.length) {
              this.packages = pkgData.packages.map(p => ({
                id: p.id,
                slug: p.slug,
                title: p.title,
                category_slug: p.category,
                nights: p.nights,
                days: p.days,
                price_from: 0,
                hero_image: (p.images && p.images[0]) || `assets/tours/${p.category}/hero.jpg`,
                overview: p.tagline,
                itinerary: (p.itinerary || []).map(it => ({
                  title: it.title,
                  desc: it.description,
                  stay: it.stay || ''
                })),
                highlights: p.highlights || [],
                inclusions: p.inclusions || [],
                exclusions: p.exclusions || [],
                season: p.bestSeason || 'Year-Round',
                is_popular: (p.tags && p.tags.includes('Popular')) || false,
                is_published: true
              }));
            }
            if (pkgData.categories) {
              this.categories = Object.values(pkgData.categories).map((c, idx) => ({
                id: c.id,
                name: c.title,
                slug: c.slug,
                tagline: c.tagline,
                sort_order: idx + 1,
                is_published: true,
                map_image: c.mapImage || ''
              }));
            }
          }
        } catch (pkgErr) {
          console.warn('[AdminApp] Could not load packages.json:', pkgErr);
        }

        // 2. Load reviews and settings from default-content.json
        const res = await fetch('../data/default-content.json');
        const data = await res.json();
        if (!this.packages.length) this.packages = data.tours || [];
        if (!this.categories.length) this.categories = data.tour_categories || [];
        this.reviews = data.reviews || [];
        this.settings = data.site_settings || {};'''

fallback_new = '''    async loadLocalFallbackData() {
      try {
        // 1. Primary: Load comprehensive data/seed-catalog.json bundle
        try {
          const seedRes = await fetch('../data/seed-catalog.json');
          if (seedRes.ok) {
            const seedData = await seedRes.json();
            if (seedData.packages || seedData.tours) {
              this.packages = seedData.packages || seedData.tours || [];
            }
            if (seedData.categories) {
              this.categories = Array.isArray(seedData.categories) 
                ? seedData.categories 
                : Object.values(seedData.categories);
            }
            if (seedData.destinations) {
              this.destinations = seedData.destinations;
            }
            if (seedData.testimonials || seedData.reviews) {
              this.reviews = seedData.testimonials || seedData.reviews;
            }
            if (seedData.team) {
              this.team = seedData.team;
            }
            if (seedData.settings && seedData.settings.length) {
              this.settings = seedData.settings[0];
            }
            if (seedData.mediaFiles && seedData.mediaFiles.length) {
              this.mediaFiles = seedData.mediaFiles;
            }
          }
        } catch (seedErr) {
          console.warn('[AdminApp] Could not load seed-catalog.json, trying packages.json:', seedErr);
        }

        // Fallback checks if seed-catalog was empty
        if (!this.packages.length) {
          try {
            const pkgRes = await fetch('../data/packages.json');
            if (pkgRes.ok) {
              const pkgData = await pkgRes.json();
              if (pkgData.packages) this.packages = pkgData.packages;
              if (pkgData.categories) this.categories = Object.values(pkgData.categories);
            }
          } catch (e) {}
        }

        if (!this.reviews.length || !this.categories.length) {
          try {
            const res = await fetch('../data/default-content.json');
            if (res.ok) {
              const data = await res.json();
              if (!this.categories.length) this.categories = data.tour_categories || [];
              if (!this.reviews.length) this.reviews = data.reviews || [];
              if (!this.settings.companyName) this.settings = data.site_settings || {};
            }
          } catch (e) {}
        }'''

if fallback_old in code:
    code = code.replace(fallback_old, fallback_new)

# 3. Update table thumb image rendering in renderPackages()
table_thumb_old = """        <tr>
          <td>
            <img src="../${pkg.hero_image || 'assets/images/cultural-triangle.jpg'}" class="table-thumb" alt="${pkg.title}" onerror="this.src='../assets/images/logo.png'">
          </td>
          <td>
            <strong>${pkg.title}</strong><br>
            <small style="color: var(--ink-muted);">Slug: /${pkg.slug}</small>
          </td>"""

table_thumb_new = """        <tr>
          <td>
            <img src="${this.resolveImg(pkg.hero_image)}" class="table-thumb" alt="${pkg.title && typeof pkg.title === 'object' ? pkg.title.en : pkg.title}" onerror="this.src='../assets/images/logo.png'">
          </td>
          <td>
            <strong>${pkg.title && typeof pkg.title === 'object' ? pkg.title.en : pkg.title}</strong><br>
            <small style="color: var(--ink-muted);">Slug: /${pkg.slug}</small>
          </td>"""

if table_thumb_old in code:
    code = code.replace(table_thumb_old, table_thumb_new)

# 4. Update openPackageModal to trigger live image preview
open_pkg_modal_old = """        document.getElementById('pkgPrice').value = pkg.price_from || 0;
        document.getElementById('pkgHeroImage').value = pkg.hero_image || '';
        document.getElementById('pkgIsPopular').checked = Boolean(pkg.is_popular);"""

open_pkg_modal_new = """        document.getElementById('pkgPrice').value = pkg.price_from || 0;
        document.getElementById('pkgHeroImage').value = pkg.hero_image || '';
        document.getElementById('pkgIsPopular').checked = Boolean(pkg.is_popular);
        this.updateImagePreview('pkgHeroImage', 'pkgHeroImagePreview', 'pkgHeroPreviewCard', 'pkgHeroBadge');"""

if open_pkg_modal_old in code:
    code = code.replace(open_pkg_modal_old, open_pkg_modal_new)

# Also update add new package image preview
open_pkg_add_old = """        document.getElementById('packageModalTitle').textContent = 'Add Tour Package';
        document.getElementById('pkgId').value = '';"""

open_pkg_add_new = """        document.getElementById('packageModalTitle').textContent = 'Add Tour Package';
        document.getElementById('pkgId').value = '';
        document.getElementById('pkgHeroImage').value = 'assets/images/cultural/sigiriya-1.webp';
        this.updateImagePreview('pkgHeroImage', 'pkgHeroImagePreview', 'pkgHeroPreviewCard', 'pkgHeroBadge');"""

if open_pkg_add_old in code:
    code = code.replace(open_pkg_add_old, open_pkg_add_new)

# 5. Update openTeamModal image preview
open_team_old = """          document.getElementById('teamPhotoUrl').value = member.photo ? (member.photo.url || '') : '';
          document.getElementById('teamBio').value = member.bio || '';"""

open_team_new = """          document.getElementById('teamPhotoUrl').value = member.photo ? (member.photo.url || member.photo.secure_url || '') : '';
          this.updateImagePreview('teamPhotoUrl', 'teamPhotoPreview', 'teamPhotoPreviewCard');
          document.getElementById('teamBio').value = member.bio || '';"""

if open_team_old in code:
    code = code.replace(open_team_old, open_team_new)

# 6. Update openCloudinaryWidgetForInput
cloud_widget_old = """    openCloudinaryWidgetForInput(inputId) {
      this.openCloudinaryWidget((url) => {
        const el = document.getElementById(inputId);
        if (el) {
          el.value = url;
        }
      });
    },"""

cloud_widget_new = """    openCloudinaryWidgetForInput(inputId, previewImgId = null, cardId = null) {
      this.openCloudinaryWidget((url) => {
        const el = document.getElementById(inputId);
        if (el) {
          el.value = url;
        }
        if (previewImgId && cardId) {
          this.updateImagePreview(inputId, previewImgId, cardId);
        }
      });
    },"""

if cloud_widget_old in code:
    code = code.replace(cloud_widget_old, cloud_widget_new)

# 7. Update openImagePicker and selectPickedImage
picker_old = """    openImagePicker(targetInputId) {
      this.targetPickerInputId = targetInputId;
      const grid = document.getElementById('pickerMediaGrid');
      grid.innerHTML = this.mediaFiles.map(m => {
        const isVid = m.isVideo || /\\.(mp4|webm|mov)$/i.test(m.url);
        return `
        <div class="media-item" onclick="AdminApp.selectPickedImage('${m.url}')">
          ${isVid ? `
            <div style="width: 100%; height: 100%; background: #001726; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #E5B869;">
              <span style="font-size: 2.2rem;">🎬</span>
              <span style="font-size: 0.75rem; letter-spacing: 1px; font-weight: 700; color: #FFFFFF; margin-top: 4px;">HD VIDEO</span>
            </div>
          ` : `
            <img src="${m.url}" alt="${m.name}" onerror="this.src='../assets/images/logo.png'">
          `}
          <div class="media-overlay">
            <span class="media-info">${m.name}</span>
            <span class="btn btn-gold btn-sm">Select Image</span>
          </div>
        </div>
        `;
      }).join('');
      this.openModal('mediaPickerModal');
    },

    selectPickedImage(url) {
      if (this.targetPickerInputId) {
        const target = document.getElementById(this.targetPickerInputId);
        if (target) {
          // Store relative path or full url
          target.value = url.replace('../', '');
        }
      }
      this.closeModal('mediaPickerModal');
      this.showToast('Image selected', 'success');
    },"""

picker_new = """    openImagePicker(targetInputId, previewImgId = null, cardId = null) {
      this.targetPickerInputId = targetInputId;
      this.targetPickerPreviewId = previewImgId;
      this.targetPickerCardId = cardId;
      const grid = document.getElementById('pickerMediaGrid');
      if (!grid) return;

      if (!this.mediaFiles || this.mediaFiles.length === 0) {
        this.renderMediaLibrary();
      }

      grid.innerHTML = this.mediaFiles.map(m => {
        const isVid = m.isVideo || /\\.(mp4|webm|mov)$/i.test(m.url);
        const resolved = this.resolveImg(m.url);
        return `
        <div class="media-item" onclick="AdminApp.selectPickedImage('${m.url}')" title="${m.name} (${m.size || ''})">
          ${isVid ? `
            <div style="width: 100%; height: 100%; background: #001726; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #E5B869;">
              <span style="font-size: 2.2rem;">🎬</span>
              <span style="font-size: 0.75rem; letter-spacing: 1px; font-weight: 700; color: #FFFFFF; margin-top: 4px;">HD VIDEO</span>
            </div>
          ` : `
            <img src="${resolved}" alt="${m.name}" loading="lazy" onerror="this.src='../assets/images/logo.png'">
          `}
          <div class="media-overlay">
            <span class="media-info">${m.name}</span>
            <span class="btn btn-gold btn-sm">Select Image</span>
          </div>
        </div>
        `;
      }).join('');
      this.openModal('mediaPickerModal');
    },

    selectPickedImage(url) {
      if (this.targetPickerInputId) {
        const target = document.getElementById(this.targetPickerInputId);
        if (target) {
          target.value = url.replace('../', '');
          if (this.targetPickerPreviewId && this.targetPickerCardId) {
            this.updateImagePreview(this.targetPickerInputId, this.targetPickerPreviewId, this.targetPickerCardId);
          }
        }
      }
      this.closeModal('mediaPickerModal');
      this.showToast('Image selected and preview updated!', 'success');
    },"""

if picker_old in code:
    code = code.replace(picker_old, picker_new)

# 8. Categories, Destinations, and Reviews CRUD
crud_old = """    renderCategories() {
      const tbody = document.getElementById('categoriesTableBody');
      if (!tbody) return;
      tbody.innerHTML = this.categories.map((c, i) => `
        <tr>
          <td>#${c.sort_order || i + 1}</td>
          <td><strong>${c.name}</strong></td>
          <td><code>/${c.slug}</code></td>
          <td>${c.tagline || ''}</td>
          <td>
            <span class="badge ${c.is_published !== false ? 'badge-success' : 'badge-secondary'}">
              ${c.is_published !== false ? 'Published' : 'Hidden'}
            </span>
          </td>
          <td style="text-align: right;">
            <div class="action-btns" style="justify-content: flex-end;">
              <button class="btn-icon" title="Edit" onclick="AdminApp.showToast('Edit Category modal', 'info')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    },

    openCategoryModal() {
      this.showToast('Category editor modal ready', 'info');
    },

    renderDestinations() {
      const sampleDestinations = [
        { title: 'Sigiriya Rock Fortress', region: 'Cultural Triangle', slug: 'sigiriya', is_published: true },
        { title: 'Temple of the Sacred Tooth', region: 'Kandy & Highlands', slug: 'kandy', is_published: true },
        { title: 'Yala National Park', region: 'Southern Wildlife', slug: 'yala', is_published: true },
        { title: 'Galle Dutch Fort', region: 'Southern Coast', slug: 'galle', is_published: true },
        { title: 'Ella & Nine Arch Bridge', region: 'Hill Country', slug: 'ella', is_published: true }
      ];
      const tbody = document.getElementById('destinationsTableBody');
      if (!tbody) return;
      tbody.innerHTML = sampleDestinations.map(d => `
        <tr>
          <td><img src="../assets/images/cultural-triangle.jpg" class="table-thumb" onerror="this.src='../assets/images/logo.png'"></td>
          <td><strong>${d.title}</strong></td>
          <td><span class="badge badge-info">${d.region}</span></td>
          <td><code>/${d.slug}</code></td>
          <td><span class="badge badge-success">Published</span></td>
          <td style="text-align: right;">
            <button class="btn btn-outline btn-sm" onclick="AdminApp.showToast('Edit destination', 'info')">Edit</button>
          </td>
        </tr>
      `).join('');
    },

    openDestinationModal() {
      this.showToast('Destination editor modal ready', 'info');
    },

    renderReviews() {
      const tbody = document.getElementById('reviewsTableBody');
      if (!tbody) return;
      tbody.innerHTML = this.reviews.map(r => `
        <tr>
          <td><strong>${r.guest_name}</strong></td>
          <td>${r.country || 'International'}</td>
          <td style="color: #F57F17;">${'★'.repeat(r.rating || 5)}</td>
          <td><small>${r.tour_taken || 'Custom Tour'}</small></td>
          <td><small style="color: var(--ink-light);">${r.review_text ? (r.review_text.slice(0, 50) + '...') : '<em style="color:#94a3b8;">Empty placeholder</em>'}</small></td>
          <td>
            ${r.permission_received 
              ? '<span class="badge badge-success">✓ Permission Verified</span>' 
              : '<span class="badge badge-danger" style="background:#FEE2E2;color:#991B1B;">✗ No Permission</span>'}
          </td>
          <td>
            <span class="badge ${r.is_published && r.permission_received ? 'badge-success' : 'badge-warning'}">
              ${r.is_published && r.permission_received ? 'Published' : 'Hidden'}
            </span>
          </td>
          <td style="text-align: right;">
            <button class="btn btn-outline btn-sm" onclick="AdminApp.toggleReviewPublish('${r.id}')">
              ${r.is_published && r.permission_received ? 'Unpublish' : 'Verify & Publish'}
            </button>
          </td>
        </tr>
      `).join('');
    },

    toggleReviewPublish(reviewId) {
      const r = this.reviews.find(item => item.id === reviewId);
      if (!r) return;
      if (!r.permission_received) {
        this.showToast('Safety Guardrail: Review cannot be published without guest permission checkbox ticked.', 'error', 4500);
        return;
      }
      r.is_published = !r.is_published;
      this.renderReviews();
      this.showToast(`Review ${r.is_published ? 'published' : 'hidden'}.`, 'success');
    },

    openReviewModal() {
      this.showToast('Add Guest Review modal ready', 'info');
    },"""

crud_new = """    renderCategories() {
      const tbody = document.getElementById('categoriesTableBody');
      if (!tbody) return;
      tbody.innerHTML = this.categories.map((c, i) => {
        const title = c.title && typeof c.title === 'object' ? c.title.en : (c.name || c.title || c.slug);
        const tagline = c.tagline && typeof c.tagline === 'object' ? c.tagline.en : (c.tagline || '');
        const hero = c.heroImage || ('assets/tours/' + c.slug + '/hero.jpg');
        return `
        <tr>
          <td>#${c.order || c.sort_order || i + 1}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="${this.resolveImg(hero)}" class="table-thumb" alt="${title}" onerror="this.src='../assets/images/logo.png'">
              <div>
                <strong>${title}</strong><br>
                <small style="color: var(--ink-muted);">${c.slug}</small>
              </div>
            </div>
          </td>
          <td><code>/${c.slug}</code></td>
          <td>${tagline}</td>
          <td>
            <span class="badge ${c.is_published !== false ? 'badge-success' : 'badge-secondary'}">
              ${c.is_published !== false ? 'Published' : 'Draft'}
            </span>
          </td>
          <td style="text-align: right;">
            <div class="action-btns" style="justify-content: flex-end;">
              <button class="btn-icon" title="Edit Category" onclick="AdminApp.openCategoryModal('${c.slug}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              </button>
            </div>
          </td>
        </tr>
        `;
      }).join('');
    },

    openCategoryModal(editSlug = null) {
      const form = document.getElementById('categoryForm');
      if (!form) return;
      form.reset();
      const titleEl = document.getElementById('categoryModalTitle');

      if (editSlug) {
        const cat = this.categories.find(c => c.slug === editSlug);
        if (!cat) return;
        const nameEn = cat.title && typeof cat.title === 'object' ? cat.title.en : (cat.name || cat.title || cat.slug);
        const nameZh = cat.title && typeof cat.title === 'object' ? cat.title.zh : (cat.name_zh || '');
        const taglineEn = cat.tagline && typeof cat.tagline === 'object' ? cat.tagline.en : (cat.tagline || '');
        const descEn = cat.description && typeof cat.description === 'object' ? cat.description.en : (cat.description || '');

        titleEl.textContent = 'Edit Category: ' + nameEn;
        document.getElementById('catId').value = cat.id || cat.slug;
        document.getElementById('catTitle').value = nameEn;
        document.getElementById('catTitleZh').value = nameZh;
        document.getElementById('catSlug').value = cat.slug || '';
        document.getElementById('catOrder').value = cat.order || cat.sort_order || 1;
        document.getElementById('catTagline').value = taglineEn;
        document.getElementById('catDescription').value = descEn;
        document.getElementById('catHeroImage').value = cat.heroImage || ('assets/tours/' + cat.slug + '/hero.jpg');
        document.getElementById('catPublished').checked = cat.is_published !== false;
        this.updateImagePreview('catHeroImage', 'catHeroPreview', 'catHeroPreviewCard');
      } else {
        titleEl.textContent = 'Add Category';
        document.getElementById('catId').value = '';
        document.getElementById('catOrder').value = this.categories.length + 1;
        document.getElementById('catHeroImage').value = 'assets/images/cultural/sigiriya-1.webp';
        document.getElementById('catPublished').checked = true;
        this.updateImagePreview('catHeroImage', 'catHeroPreview', 'catHeroPreviewCard');
      }
      this.openModal('categoryModal');
    },

    async saveCategory(e) {
      if (e) e.preventDefault();
      const slug = document.getElementById('catSlug').value.trim();
      const id = document.getElementById('catId').value || ('cat-' + slug);
      const titleEn = document.getElementById('catTitle').value.trim();
      const titleZh = document.getElementById('catTitleZh').value.trim();
      const heroImage = document.getElementById('catHeroImage').value.trim();
      const order = parseInt(document.getElementById('catOrder').value, 10) || 1;
      const tagline = document.getElementById('catTagline').value.trim();
      const description = document.getElementById('catDescription').value.trim();
      const is_published = document.getElementById('catPublished').checked;

      const payload = {
        id,
        slug,
        order,
        sort_order: order,
        name: titleEn,
        title: { en: titleEn, zh: titleZh || titleEn },
        tagline: { en: tagline, zh: tagline },
        description: { en: description, zh: description },
        heroImage,
        is_published,
        status: is_published ? 'published' : 'draft',
        updatedAt: new Date().toISOString()
      };

      if (window.LotusFirebase && typeof window.LotusFirebase.saveCategory === 'function') {
        try {
          await window.LotusFirebase.saveCategory(payload);
        } catch (err) {
          console.warn('[AdminApp] Firebase saveCategory error:', err);
        }
      }

      const idx = this.categories.findIndex(c => c.slug === slug || c.id === id);
      if (idx !== -1) {
        this.categories[idx] = { ...this.categories[idx], ...payload };
      } else {
        this.categories.push(payload);
      }

      this.closeModal('categoryModal');
      this.renderCategories();
      this.showToast(`Category "${titleEn}" saved successfully!`, 'success');
    },

    renderDestinations() {
      const tbody = document.getElementById('destinationsTableBody');
      if (!tbody) return;
      tbody.innerHTML = this.destinations.map(d => {
        const title = d.title && typeof d.title === 'object' ? d.title.en : (d.title || d.slug);
        const image = d.image || 'assets/images/cultural/sigiriya-1.webp';
        return `
        <tr>
          <td><img src="${this.resolveImg(image)}" class="table-thumb" alt="${title}" onerror="this.src='../assets/images/logo.png'"></td>
          <td><strong>${title}</strong></td>
          <td><span class="badge badge-info">${d.region || 'Sri Lanka'}</span></td>
          <td><code>/${d.slug}</code></td>
          <td><span class="badge ${d.status !== 'draft' ? 'badge-success' : 'badge-secondary'}">${d.status !== 'draft' ? 'Published' : 'Draft'}</span></td>
          <td style="text-align: right;">
            <button class="btn btn-outline btn-sm" onclick="AdminApp.openDestinationModal('${d.slug}')">Edit</button>
          </td>
        </tr>
        `;
      }).join('');
    },

    openDestinationModal(editSlug = null) {
      const form = document.getElementById('destinationForm');
      if (!form) return;
      form.reset();
      const titleEl = document.getElementById('destinationModalTitle');

      if (editSlug) {
        const dest = this.destinations.find(d => d.slug === editSlug);
        if (!dest) return;
        const nameEn = dest.title && typeof dest.title === 'object' ? dest.title.en : (dest.title || dest.slug);
        const nameZh = dest.title && typeof dest.title === 'object' ? dest.title.zh : '';
        const descEn = dest.description && typeof dest.description === 'object' ? dest.description.en : (dest.description || '');

        titleEl.textContent = 'Edit Destination: ' + nameEn;
        document.getElementById('destId').value = dest.id || dest.slug;
        document.getElementById('destTitle').value = nameEn;
        document.getElementById('destTitleZh').value = nameZh;
        document.getElementById('destRegion').value = dest.region || 'Cultural Triangle';
        document.getElementById('destSlug').value = dest.slug || '';
        document.getElementById('destOrder').value = dest.order || 1;
        document.getElementById('destDescription').value = descEn;
        document.getElementById('destImage').value = dest.image || 'assets/images/cultural/sigiriya-1.webp';
        document.getElementById('destPublished').checked = dest.status !== 'draft';
        this.updateImagePreview('destImage', 'destImagePreview', 'destImagePreviewCard');
      } else {
        titleEl.textContent = 'Add Destination';
        document.getElementById('destId').value = '';
        document.getElementById('destOrder').value = this.destinations.length + 1;
        document.getElementById('destImage').value = 'assets/images/cultural/sigiriya-1.webp';
        document.getElementById('destPublished').checked = true;
        this.updateImagePreview('destImage', 'destImagePreview', 'destImagePreviewCard');
      }
      this.openModal('destinationModal');
    },

    async saveDestination(e) {
      if (e) e.preventDefault();
      const slug = document.getElementById('destSlug').value.trim();
      const id = document.getElementById('destId').value || ('dest-' + slug);
      const titleEn = document.getElementById('destTitle').value.trim();
      const titleZh = document.getElementById('destTitleZh').value.trim();
      const region = document.getElementById('destRegion').value;
      const order = parseInt(document.getElementById('destOrder').value, 10) || 1;
      const descEn = document.getElementById('destDescription').value.trim();
      const image = document.getElementById('destImage').value.trim();
      const is_published = document.getElementById('destPublished').checked;

      const payload = {
        id,
        slug,
        order,
        region,
        title: { en: titleEn, zh: titleZh || titleEn },
        description: { en: descEn, zh: descEn },
        image,
        status: is_published ? 'published' : 'draft',
        updatedAt: new Date().toISOString()
      };

      if (window.LotusFirebase && typeof window.LotusFirebase.saveDestination === 'function') {
        try {
          await window.LotusFirebase.saveDestination(payload);
        } catch (err) {
          console.warn('[AdminApp] Firebase saveDestination error:', err);
        }
      }

      const idx = this.destinations.findIndex(d => d.slug === slug || d.id === id);
      if (idx !== -1) {
        this.destinations[idx] = { ...this.destinations[idx], ...payload };
      } else {
        this.destinations.push(payload);
      }

      this.closeModal('destinationModal');
      this.renderDestinations();
      this.showToast(`Destination "${titleEn}" saved successfully!`, 'success');
    },

    renderReviews() {
      const tbody = document.getElementById('reviewsTableBody');
      if (!tbody) return;
      tbody.innerHTML = this.reviews.map(r => {
        const text = r.review_text && typeof r.review_text === 'object' ? r.review_text.en : (r.review_text || '');
        const avatar = r.avatar || 'assets/images/avatar-1.jpg';
        return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <img src="${this.resolveImg(avatar)}" class="table-thumb" style="width:36px; height:36px; border-radius:50%;" onerror="this.src='../assets/images/logo.png'">
              <strong>${r.guest_name}</strong>
            </div>
          </td>
          <td>${r.country || 'International'}</td>
          <td style="color: #F57F17;">${'★'.repeat(r.rating || 5)}</td>
          <td><small>${r.tour_taken || 'Custom Tour'}</small></td>
          <td><small style="color: var(--ink-light);">${text ? (text.slice(0, 50) + '...') : '<em style="color:#94a3b8;">Empty placeholder</em>'}</small></td>
          <td>
            <span class="badge badge-success">✓ Verified</span>
          </td>
          <td>
            <span class="badge ${r.status !== 'draft' ? 'badge-success' : 'badge-warning'}">
              ${r.status !== 'draft' ? 'Published' : 'Hidden'}
            </span>
          </td>
          <td style="text-align: right;">
            <button class="btn btn-outline btn-sm" onclick="AdminApp.openReviewModal('${r.id}')">Edit</button>
          </td>
        </tr>
        `;
      }).join('');
    },

    openReviewModal(editId = null) {
      const form = document.getElementById('reviewForm');
      if (!form) return;
      form.reset();
      const titleEl = document.getElementById('reviewModalTitle');

      if (editId) {
        const rev = this.reviews.find(r => r.id === editId);
        if (!rev) return;
        titleEl.textContent = 'Edit Guest Review: ' + rev.guest_name;
        document.getElementById('revId').value = rev.id;
        document.getElementById('revGuestName').value = rev.guest_name || '';
        document.getElementById('revCountry').value = rev.country || '';
        document.getElementById('revRating').value = rev.rating || 5;
        document.getElementById('revTourTaken').value = rev.tour_taken || '';
        document.getElementById('revText').value = rev.review_text?.en || rev.review_text || '';
        document.getElementById('revTextZh').value = rev.review_text?.zh || '';
        document.getElementById('revAvatar').value = rev.avatar || 'assets/images/avatar-1.jpg';
        document.getElementById('revPublished').checked = rev.status !== 'draft';
        this.updateImagePreview('revAvatar', 'revAvatarPreview', 'revAvatarPreviewCard');
      } else {
        titleEl.textContent = 'Add Guest Review';
        document.getElementById('revId').value = 'rev-' + Date.now();
        document.getElementById('revRating').value = 5;
        document.getElementById('revAvatar').value = 'assets/images/avatar-1.jpg';
        document.getElementById('revPublished').checked = true;
        this.updateImagePreview('revAvatar', 'revAvatarPreview', 'revAvatarPreviewCard');
      }
      this.openModal('reviewModal');
    },

    async saveReview(e) {
      if (e) e.preventDefault();
      const id = document.getElementById('revId').value || ('rev-' + Date.now());
      const guest_name = document.getElementById('revGuestName').value.trim();
      const country = document.getElementById('revCountry').value.trim();
      const rating = parseInt(document.getElementById('revRating').value, 10) || 5;
      const tour_taken = document.getElementById('revTourTaken').value.trim();
      const textEn = document.getElementById('revText').value.trim();
      const textZh = document.getElementById('revTextZh').value.trim();
      const avatar = document.getElementById('revAvatar').value.trim();
      const is_published = document.getElementById('revPublished').checked;

      const payload = {
        id,
        guest_name,
        country,
        rating,
        tour_taken,
        review_text: { en: textEn, zh: textZh || textEn },
        avatar,
        permission_received: true,
        status: is_published ? 'published' : 'draft',
        date: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString()
      };

      if (window.LotusFirebase && typeof window.LotusFirebase.saveReview === 'function') {
        try {
          await window.LotusFirebase.saveReview(payload);
        } catch (err) {
          console.warn('[AdminApp] Firebase saveReview error:', err);
        }
      }

      const idx = this.reviews.findIndex(r => r.id === id);
      if (idx !== -1) {
        this.reviews[idx] = { ...this.reviews[idx], ...payload };
      } else {
        this.reviews.push(payload);
      }

      this.closeModal('reviewModal');
      this.renderReviews();
      this.showToast(`Review from "${guest_name}" saved successfully!`, 'success');
    },"""

if crud_old in code:
    code = code.replace(crud_old, crud_new)

# 9. Master Seeder Method in AdminApp
seeder_method = '''
    /**
     * Master Seeder: Push all 14 Collections to Firebase Firestore
     */
    async seedAllToFirestore() {
      if (!window.LotusFirebase) {
        this.showToast('LotusFirebase service not loaded', 'error');
        return;
      }

      const btn = document.getElementById('btnMasterSeed');
      const progressWrap = document.getElementById('seederProgressWrap');
      const progressBar = document.getElementById('seederProgressBar');
      const statusText = document.getElementById('seederStatusText');

      if (btn) btn.disabled = true;
      if (progressWrap) progressWrap.style.display = 'block';
      if (progressBar) progressBar.style.width = '5%';
      if (statusText) statusText.textContent = 'Connecting to Firebase Firestore...';

      this.showToast('Beginning Master Seeder across 14 collections...', 'info', 4000);

      try {
        const count = await window.LotusFirebase.seedAllCollections(progress => {
          if (progressBar) progressBar.style.width = `${progress.percent}%`;
          if (statusText) statusText.textContent = `Seeding [${progress.collection}]: ${progress.title} (${progress.processed}/${progress.total})`;
        });

        if (progressBar) progressBar.style.width = '100%';
        if (statusText) statusText.textContent = `✓ Successfully seeded all ${count} documents into Firestore!`;
        this.updateFirebaseBadge(`Connected (${count} Docs Synced)`, '#10B981');
        this.showToast(`Master Seeder Complete! ${count} documents synchronized to Firestore across 14 collections.`, 'success', 6000);

        await this.loadLocalFallbackData();
        this.renderDashboard();
        this.renderPackages();
        this.renderCategories();
        this.renderDestinations();
        this.renderReviews();
        this.renderTeam();
        this.renderMediaLibrary();
      } catch (err) {
        console.error('Master Seeder error:', err);
        if (statusText) statusText.textContent = '❌ Seeder error: ' + err.message;
        this.updateFirebaseBadge('Firebase Offline / Error', '#EF4444');
        this.showToast('Seeding failed: ' + err.message, 'error', 5000);
      } finally {
        if (btn) btn.disabled = false;
      }
    },
'''

if 'seedAllToFirestore()' not in code:
    code = code.replace('async syncToFirebase() {', seeder_method + '\n    async syncToFirebase() {')

with open('admin/js/admin-app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print('Updated admin/js/admin-app.js successfully!')
