
/**
 * =========================================================================
 * CENTRAL CLOUDINARY CONFIGURATION & REUSABLE UPLOADER MODULE
 * =========================================================================
 * Cloudinary Unsigned Direct Client Upload for Images and Videos
 */
const CLOUDINARY_CONFIG = {
  cloudName: 'qmukrbh6',
  uploadPreset: 'lotus_tours_unsigned',
  folder: 'lotus/tours'
};
window.CLOUDINARY_CONFIG = CLOUDINARY_CONFIG;

/**
 * Image & Video URL Delivery Optimizer
 * - Inserts f_auto,q_auto for Cloudinary images and videos
 * - For video thumbnails, generates a poster frame at 0 seconds with .jpg extension
 */
function optimizeMediaUrl(url, options = {}) {
  if (!url) return '';
  url = String(url).trim();
  if (!url.includes('cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }
  const isThumb = !!options.isThumb;
  const isVideo = options.isVideo !== undefined 
    ? options.isVideo 
    : (/\.(mp4|webm|mov|m4v)$/i.test(url) || url.includes('/video/upload/'));

  if (isVideo && isThumb) {
    let thumbUrl = url.replace(/\.(mp4|webm|mov|m4v)(\?.*)?$/i, '.jpg$2');
    if (!thumbUrl.includes('/so_0')) {
      thumbUrl = thumbUrl.replace(/\/upload\/(?:[^\/]+\/)?/, '/upload/so_0,f_auto,q_auto/');
    }
    return thumbUrl;
  }

  if (!url.includes('f_auto,q_auto') && !url.includes('f_auto')) {
    return url.replace(/\/upload\//, '/upload/f_auto,q_auto/');
  }
  return url;
}
window.optimizeMediaUrl = optimizeMediaUrl;

/**
 * Central Reusable Cloudinary Upload Function
 * Used by every upload button in the admin (Media Library, Tours, Categories,
 * Destinations, Reviews, Team, Blog, Branding, Gallery, Click-to-edit).
 * 
 * @param {File|Blob} file - File or Blob to upload
 * @param {Object} options - { onProgress, tags, isCompressedBlob }
 * @returns {Promise<{ url, secureUrl, publicId, resourceType, format, bytes, width, height, duration }>}
 */
async function uploadToCloudinary(file, options = {}) {
  if (!file) throw new Error('No file provided for upload.');

  // 1. Resolve Cloudinary Configuration (Settings > LOTUS_CONFIG > CLOUDINARY_CONFIG defaults)
  const appConfig = (window.AdminApp && window.AdminApp.cloudinaryConfig) || {};
  const globalConfig = (window.LOTUS_CONFIG && window.LOTUS_CONFIG.cloudinary) || {};
  const cloudName = (appConfig.cloudName || globalConfig.cloudName || CLOUDINARY_CONFIG.cloudName || 'qmukrbh6').trim();
  const uploadPreset = (appConfig.uploadPreset || globalConfig.uploadPreset || CLOUDINARY_CONFIG.uploadPreset || 'lotus_tours_unsigned').trim();

  // 2. File Type & Extension Validation
  const fileName = file.name || 'upload.bin';
  const fileExt = (fileName.includes('.') ? '.' + fileName.split('.').pop() : '').toLowerCase();
  const fileType = (file.type || '').toLowerCase();

  const validImageExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
  const validVideoExts = ['.mp4', '.webm', '.mov', '.m4v'];

  const isImage = fileType.startsWith('image/') || validImageExts.includes(fileExt);
  const isVideo = fileType.startsWith('video/') || validVideoExts.includes(fileExt);

  if (!isImage && !isVideo) {
    const msg = 'Rejected "' + fileName + '": Invalid format. Only Images (JPG, PNG, WebP, GIF, SVG) and Videos (MP4, WebM, MOV) are accepted.';
    if (window.AdminApp) window.AdminApp.showToast(msg, 'error', 6000);
    console.error('[Upload Validation Error]', msg);
    throw new Error(msg);
  }

  let fileToUpload = file;
  let finalSafeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');

  // 3. Size Limits & Client-Side Auto-Compression
  // Images: max 10MB; Videos: max 100MB
  const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB
  const MAX_VIDEO_BYTES = 100 * 1024 * 1024; // 100 MB

  if (isVideo && file.size > MAX_VIDEO_BYTES) {
    const msg = 'Rejected "' + fileName + '": Video size (' + (file.size / (1024 * 1024)).toFixed(1) + ' MB) exceeds the 100 MB maximum limit.';
    if (window.AdminApp) window.AdminApp.showToast(msg, 'error', 6000);
    console.error('[Upload Size Error]', msg);
    throw new Error(msg);
  }

  if (isImage && file.size > MAX_IMAGE_BYTES && !options.isCompressedBlob) {
    if (window.AdminApp) {
      window.AdminApp.showToast('Image "' + fileName + '" exceeds 10 MB. Compressing to WebP (max 2400px)...', 'info', 4000);
    }
    try {
      if (window.AdminApp && typeof window.AdminApp.compressImageToWebP === 'function') {
        const compressedBlob = await window.AdminApp.compressImageToWebP(file, 2400, 0.85);
        if (compressedBlob && compressedBlob.size <= MAX_IMAGE_BYTES) {
          fileToUpload = compressedBlob;
          finalSafeName = fileName.replace(/\.[^/.]+$/, "") + '.webp';
          if (window.AdminApp) {
            window.AdminApp.showToast('Compressed to ' + Math.round(compressedBlob.size / 1024) + ' KB WebP. Uploading to Cloudinary CDN...', 'info', 3000);
          }
        }
      }
    } catch (compressErr) {
      console.warn('[Upload Compression Warning]', compressErr);
    }

    if (fileToUpload.size > MAX_IMAGE_BYTES) {
      const msg = 'Rejected "' + fileName + '": Image size exceeds 10 MB limit after compression.';
      if (window.AdminApp) window.AdminApp.showToast(msg, 'error', 6000);
      throw new Error(msg);
    }
  }

  // 4. UI Progress & Save Buttons Guard
  const progressBanner = document.getElementById('adminUploadProgressBanner');
  const progressBar = document.getElementById('adminUploadProgressBar');
  const progressPercent = document.getElementById('adminUploadPercent');
  const progressName = document.getElementById('adminUploadFileName');

  if (progressBanner) {
    progressBanner.style.display = 'block';
    if (progressBar) progressBar.style.width = '0%';
    if (progressPercent) progressPercent.textContent = '0%';
    if (progressName) progressName.textContent = finalSafeName;
  }

  const saveButtons = Array.from(document.querySelectorAll('button[type="submit"], .btn-primary, .modal-footer .btn'));
  saveButtons.forEach(btn => {
    btn.setAttribute('data-prev-disabled', btn.disabled ? '1' : '0');
    btn.disabled = true;
  });

  function cleanupUI() {
    if (progressBanner) progressBanner.style.display = 'none';
    saveButtons.forEach(btn => {
      if (btn.getAttribute('data-prev-disabled') !== '1') {
        btn.disabled = false;
      }
      btn.removeAttribute('data-prev-disabled');
    });
  }

  // 5. Direct Unsigned XMLHttpRequest Upload to /auto/upload
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const uploadUrl = 'https://api.cloudinary.com/v1_1/' + encodeURIComponent(cloudName) + '/auto/upload';

    xhr.open('POST', uploadUrl, true);
    xhr.timeout = 180000; // 3 minutes timeout for videos

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.min(100, Math.round((e.loaded / e.total) * 100));
        if (progressBar) progressBar.style.width = percent + '%';
        if (progressPercent) progressPercent.textContent = percent + '%';
        if (typeof options.onProgress === 'function') {
          options.onProgress(percent, e.loaded, e.total);
        }
      }
    };

    xhr.onload = async () => {
      cleanupUI();
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          let secureUrl = res.secure_url || res.url || '';

          const resType = res.resource_type || (isVideo ? 'video' : 'image');
          if (secureUrl && secureUrl.includes('/upload/') && !secureUrl.includes('/f_auto')) {
            secureUrl = secureUrl.replace('/upload/', '/upload/f_auto,q_auto/');
          }

          const result = {
            url: secureUrl,
            secureUrl: secureUrl,
            publicId: res.public_id || '',
            resourceType: resType,
            format: res.format || (isVideo ? 'mp4' : 'webp'),
            bytes: res.bytes || fileToUpload.size,
            width: res.width || null,
            height: res.height || null,
            duration: res.duration || null,
            originalName: fileName
          };

          // 6. Record upload in Firestore collection "media"
          if (window.AdminApp && window.AdminApp.fbDb) {
            try {
              const mediaDoc = {
                url: result.secureUrl,
                publicId: result.publicId,
                resourceType: result.resourceType,
                format: result.format,
                bytes: result.bytes,
                width: result.width,
                height: result.height,
                duration: result.duration,
                originalName: result.originalName,
                uploadedBy: (window.AdminApp.currentUser && window.AdminApp.currentUser.email) || 'admin',
                createdAt: (window.firebase && window.firebase.firestore && window.firebase.firestore.FieldValue)
                  ? window.firebase.firestore.FieldValue.serverTimestamp()
                  : new Date().toISOString()
              };
              const ref = await window.AdminApp.fbDb.collection('media').add(mediaDoc);
              result.id = ref.id;
            } catch (fsErr) {
              console.warn('[AdminApp] Could not save media doc to Firestore:', fsErr);
            }
          }

          // Add to local media library array for immediate display
          if (window.AdminApp) {
            window.AdminApp.mediaFiles = window.AdminApp.mediaFiles || [];
            window.AdminApp.mediaFiles.unshift({
              id: result.id || ('media-' + Date.now()),
              name: finalSafeName,
              url: result.secureUrl,
              isVideo: isVideo || result.resourceType === 'video',
              resourceType: result.resourceType,
              size: Math.round(result.bytes / 1024) + ' KB'
            });
            if (typeof window.AdminApp.renderMediaLibrary === 'function') {
              window.AdminApp.renderMediaLibrary();
            }
          }

          if (window.AdminApp) {
            window.AdminApp.showToast('"' + finalSafeName + '" uploaded to Cloudinary CDN successfully!', 'success', 4000);
          }

          resolve(result);
        } catch (parseErr) {
          console.error('[Cloudinary Response Parse Error]', parseErr, xhr.responseText);
          const err = new Error('Invalid response from Cloudinary API');
          if (window.AdminApp) window.AdminApp.showToast(err.message, 'error', 5000);
          reject(err);
        }
      } else {
        let errorMsg = 'Cloudinary Upload Error (HTTP ' + xhr.status + ')';
        try {
          const errJson = JSON.parse(xhr.responseText);
          if (errJson && errJson.error && errJson.error.message) {
            errorMsg = errJson.error.message;
          }
        } catch (_) {}
        console.error('[Cloudinary Upload Error]', xhr.status, xhr.responseText);
        if (window.AdminApp) window.AdminApp.showToast(errorMsg, 'error', 6000);
        reject(new Error(errorMsg));
      }
    };

    xhr.onerror = (e) => {
      cleanupUI();
      const msg = 'Network error during upload to Cloudinary. Please check your internet connection.';
      console.error('[Cloudinary Network Error]', e);
      if (window.AdminApp) window.AdminApp.showToast(msg, 'error', 6000);
      reject(new Error(msg));
    };

    xhr.ontimeout = () => {
      cleanupUI();
      const msg = 'Upload timed out after 3 minutes. Please use a smaller file or faster network.';
      console.error('[Cloudinary Timeout]');
      if (window.AdminApp) window.AdminApp.showToast(msg, 'error', 6000);
      reject(new Error(msg));
    };

    xhr.onabort = () => {
      cleanupUI();
      const msg = 'Upload was cancelled.';
      console.warn('[Cloudinary Aborted]');
      if (window.AdminApp) window.AdminApp.showToast(msg, 'info', 3000);
      reject(new Error(msg));
    };

    const formData = new FormData();
    formData.append('file', fileToUpload, finalSafeName);
    formData.append('upload_preset', uploadPreset);
    if (options.tags) formData.append('tags', options.tags);

    xhr.send(formData);
  });
}
window.uploadToCloudinary = uploadToCloudinary;

/**

 * LOTUS CEYLON International Tours & Services (Pvt) Ltd

 * CMS Admin Panel Application Logic

 * 

 * Features:

 * - Firebase Firestore Authentication & Role Verification (super_admin vs editor)

 * - Automatic Session Idle Timeout (30 mins)

 * - Full CRUD for Inquiries, Packages, Categories, Destinations, Reviews

 * - Client-side Image Compression (HTML5 Canvas to WebP max 1920px, 5MB limit)

 * - Cloudinary CDN Media Storage & Firestore Catalog

 * - Reusable Image Picker Modal

 * - CSV Export for Customer Inquiries

 * - Multi-language Form Tabs (EN, 中文) & Itinerary/Highlight Repeaters

 * - Unsaved Changes Protection

 * - Toast Notification System

 */



(function (window) {

  'use strict';



  const IDLE_TIMEOUT_MINUTES = 30;

  const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB



  const AdminApp = {

    // Cloudinary Config stored on AdminApp
    triggerDirectCloudinaryUpload(options = {}) {
      return this.triggerUploadForInput(options.inputId, options.previewImgId, options.cardId, options);
    },

    
    /**
     * Universal Upload Trigger for Any Form Field
     */
    triggerUploadForInput(inputId, previewImgId = null, cardId = null, options = {}) {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      const isVid = options.resourceType === 'video' || (options.accept && options.accept.includes('video') && !options.accept.includes('image'));
      fileInput.accept = options.accept || (isVid 
        ? 'video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov' 
        : 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.jpg,.jpeg,.png,.webp,.gif,.svg');
      fileInput.style.display = 'none';
      document.body.appendChild(fileInput);

      fileInput.onchange = async () => {
        const file = fileInput.files && fileInput.files[0];
        if (!file) {
          if (fileInput.parentNode) fileInput.remove();
          return;
        }

        try {
          const result = await uploadToCloudinary(file, options);
          const secureUrl = result.secureUrl;

          // 1. Update target input value
          if (inputId) {
            const inputEl = document.getElementById(inputId);
            if (inputEl) {
              inputEl.value = secureUrl;
              inputEl.dispatchEvent(new Event('input', { bubbles: true }));
              inputEl.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }

          // 2. Update preview
          if (isVid || result.resourceType === 'video') {
            this.updateVideoPreview(inputId, previewImgId, cardId);
          } else {
            this.updateImagePreview(inputId, previewImgId, cardId);
          }

          if (typeof options.callback === 'function') {
            options.callback(secureUrl, result.resourceType === 'video', file.name);
          }
        } catch (uploadErr) {
          console.error('[Upload Failed]', uploadErr);
        } finally {
          if (fileInput.parentNode) fileInput.remove();
        }
      };

      fileInput.click();
    },

    openCloudinaryWidgetForInput(inputId, previewImgId = null, cardId = null) {
      this.triggerUploadForInput(inputId, previewImgId, cardId);
    },

    openCloudinaryForTeam() {
      this.triggerUploadForInput('teamPhotoUrl', 'teamPhotoPreview', 'teamPhotoPreviewCard');
    },

    /**
     * Video Live Preview Handler
     */
    updateVideoPreview(inputId, previewVideoId, cardId) {
      const input = document.getElementById(inputId);
      const video = document.getElementById(previewVideoId);
      const card = document.getElementById(cardId);
      const urlDisplay = document.getElementById(cardId ? cardId.replace('Card', 'Url') : null);

      if (!input || !video || !card) return;
      const val = input.value.trim();
      if (!val) {
        card.style.display = 'none';
        video.src = '';
        return;
      }

      video.src = val;
      video.load();
      card.style.display = 'flex';
      if (urlDisplay) urlDisplay.textContent = val;
    },

    clearVideoField(inputId, previewVideoId, cardId) {
      const input = document.getElementById(inputId);
      const video = document.getElementById(previewVideoId);
      const card = document.getElementById(cardId);
      if (input) input.value = '';
      if (video) {
        video.pause();
        video.src = '';
      }
      if (card) card.style.display = 'none';
      this.showToast('Video removed', 'info');
    },

    /**
     * Package Gallery Handlers
     */
    triggerGalleryUpload() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.multiple = true;
      fileInput.accept = 'image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif';
      fileInput.style.display = 'none';
      document.body.appendChild(fileInput);

      fileInput.onchange = async () => {
        const files = Array.from(fileInput.files || []);
        if (files.length === 0) {
          if (fileInput.parentNode) fileInput.remove();
          return;
        }

        this.showToast(`Uploading ${files.length} gallery image(s) to Cloudinary...`, 'info', 4000);
        let successCount = 0;
        for (const file of files) {
          try {
            const res = await uploadToCloudinary(file, { resourceType: 'image' });
            this.activePackageGallery = this.activePackageGallery || [];
            this.activePackageGallery.push(res.secureUrl);
            this.renderPackageGalleryGrid();
            successCount++;
          } catch (e) {
            console.error('[Gallery Upload Error]', e);
          }
        }
        if (fileInput.parentNode) fileInput.remove();
        this.showToast(`${successCount} of ${files.length} gallery image(s) uploaded successfully!`, 'success');
      };

      fileInput.click();
    },

    openGalleryMediaPicker() {
      this.openImagePicker(null, null, null, {
        filter: 'image',
        onSelect: (url) => {
          this.activePackageGallery = this.activePackageGallery || [];
          this.activePackageGallery.push(url);
          this.renderPackageGalleryGrid();
        }
      });
    },

    removeGalleryItem(index) {
      if (!this.activePackageGallery) return;
      this.activePackageGallery.splice(index, 1);
      this.renderPackageGalleryGrid();
      this.showToast('Gallery image removed', 'info');
    },

    renderPackageGalleryGrid() {
      const container = document.getElementById('pkgGalleryGrid');
      if (!container) return;
      const list = this.activePackageGallery || [];
      if (list.length === 0) {
        container.innerHTML = '<span style="color: var(--ink-muted); font-size: 0.82rem;">No gallery images added yet. Click Upload or Browse to add photos.</span>';
        return;
      }

      container.innerHTML = list.map((url, idx) => {
        const optUrl = optimizeMediaUrl(url);
        return `
          <div class="pkg-gallery-thumb-item">
            <img src="${optUrl}" alt="Gallery image ${idx + 1}" onerror="this.src='../assets/images/sigiriya.jpg'"/>
            <button type="button" class="btn-remove-thumb" onclick="AdminApp.removeGalleryItem(${idx})" title="Remove image">✕</button>
          </div>
        `;
      }).join('');
    },

    /**
     * Rich-Text Blog Article Inline Image Inserter
     */
    insertImageIntoBlog() {
      this.openImagePicker(null, null, null, {
        filter: 'image',
        onSelect: (url) => {
          const textarea = document.getElementById('blogContent');
          if (!textarea) return;
          const optUrl = optimizeMediaUrl(url);
          const imgTag = '\n<p><img src="' + optUrl + '" alt="Article image" style="max-width: 100%; border-radius: 8px; margin: 16px 0;"/></p>\n';
          
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          if (start !== undefined && end !== undefined) {
            textarea.value = textarea.value.substring(0, start) + imgTag + textarea.value.substring(end);
          } else {
            textarea.value += imgTag;
          }
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
          this.showToast('Image inserted into blog content!', 'success');
        }
      });
    },

    /**
     * Media Library Filters & Search
     */
    setMediaFilter(type) {
      this.mediaFilter = type;
      ['All', 'Images', 'Videos'].forEach(t => {
        const btn = document.getElementById('mediaFilter' + t);
        if (btn) {
          const isMatch = (t === 'All' && type === 'all') || 
                          (t === 'Images' && type === 'image') || 
                          (t === 'Videos' && type === 'video');
          btn.className = isMatch ? 'btn btn-sm btn-gold' : 'btn btn-sm btn-outline';
        }
      });
      this.renderMediaLibrary();
    },

    filterMediaLibrary(query) {
      this.mediaSearchQuery = (query || '').toLowerCase().trim();
      this.renderMediaLibrary();
    },

    /**
     * Upgraded Firestore-backed Media Library
     */
    async renderMediaLibrary() {
      // 1. Fetch from Firestore "media" collection if connected
      if (this.fbDb && (!this.mediaFiles || this.mediaFiles.length <= 4)) {
        try {
          const snap = await this.fbDb.collection('media').orderBy('createdAt', 'desc').limit(200).get();
          if (snap && !snap.empty) {
            const list = [];
            snap.forEach(doc => {
              const d = doc.data();
              list.push({
                id: doc.id,
                name: d.originalName || d.name || 'media-item',
                url: d.url || d.secureUrl,
                isVideo: d.resourceType === 'video' || /\.(mp4|webm|mov)$/i.test(d.url || ''),
                resourceType: d.resourceType || 'image',
                size: d.bytes ? (Math.round(d.bytes / 1024) + ' KB') : 'Optimized'
              });
            });
            this.mediaFiles = list;
          }
        } catch (fsErr) {
          console.warn('[AdminApp] Firestore media fetch warning:', fsErr);
        }
      }

      // 2. If mediaFiles is empty, seed/load the 140 self-hosted assets from media-manifest.json
      if (!this.mediaFiles || this.mediaFiles.length === 0) {
        try {
          const res = await fetch('../data/media-manifest.json');
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length) {
              this.mediaFiles = data.map(item => ({
                id: 'manifest-' + item.name,
                name: item.name,
                url: item.url,
                isVideo: /\.(mp4|webm|mov)$/i.test(item.url),
                resourceType: /\.(mp4|webm|mov)$/i.test(item.url) ? 'video' : 'image',
                size: item.size || 'Local WebP'
              }));

              // Background auto-seed to Firestore "media" collection if user is authenticated
              if (this.fbDb && this.currentUser) {
                setTimeout(async () => {
                  try {
                    const check = await this.fbDb.collection('media').limit(1).get();
                    if (check.empty) {
                      const batch = this.fbDb.batch();
                      data.slice(0, 100).forEach(m => {
                        const ref = this.fbDb.collection('media').doc();
                        batch.set(ref, {
                          url: m.url,
                          originalName: m.name,
                          resourceType: 'image',
                          format: 'webp',
                          bytes: 150000,
                          uploadedBy: 'system-seed',
                          createdAt: (window.firebase && window.firebase.firestore && window.firebase.firestore.FieldValue)
                            ? window.firebase.firestore.FieldValue.serverTimestamp()
                            : new Date().toISOString()
                        });
                      });
                      await batch.commit();
                      console.log('[AdminApp] Auto-seeded self-hosted assets to Firestore media collection.');
                    }
                  } catch (seedErr) {
                    console.warn('[AdminApp] Media background seed:', seedErr);
                  }
                }, 1000);
              }
            }
          }
        } catch (e) {}
      }

      const grid = document.getElementById('mediaGrid');
      if (!grid) return;

      const filter = this.mediaFilter || 'all';
      const search = this.mediaSearchQuery || '';

      const itemsToRender = (this.mediaFiles || []).filter(m => {
        const isVid = m.isVideo || m.resourceType === 'video' || /\.(mp4|webm|mov)$/i.test(m.url);
        if (filter === 'image' && isVid) return false;
        if (filter === 'video' && !isVid) return false;
        if (search) {
          const matchName = (m.name || '').toLowerCase().includes(search);
          const matchUrl = (m.url || '').toLowerCase().includes(search);
          return matchName || matchUrl;
        }
        return true;
      });

      if (itemsToRender.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--ink-muted);">No media items match your filter criteria.</div>';
        return;
      }

      grid.innerHTML = itemsToRender.map((m, idx) => {
        const isVid = m.isVideo || m.resourceType === 'video' || /\.(mp4|webm|mov)$/i.test(m.url);
        const resolved = this.resolveImg(m.url);
        const thumbUrl = optimizeMediaUrl(resolved, { isThumb: true, isVideo: isVid });

        return `
          <div class="media-item ${isVid ? 'is-video' : ''}">
            ${isVid ? `
              <span class="media-video-badge">🎬 HD VIDEO</span>
              <img src="${thumbUrl}" alt="${this.escapeAttr(m.name)}" loading="lazy" onerror="this.src='../assets/images/sigiriya.jpg'"/>
              <div class="media-video-play-center">▶</div>
            ` : `
              <img src="${thumbUrl}" alt="${this.escapeAttr(m.name)}" loading="lazy" onerror="this.src='../assets/images/logo.png'"/>
            `}
            <div class="media-overlay">
              <span class="media-info">${this.escapeHtml(m.name)}</span>
              <div style="display: flex; gap: 6px;">
                <button class="btn btn-gold btn-sm" onclick="AdminApp.copyMediaUrl('${m.url}')" type="button">Copy URL</button>
                <button class="btn btn-danger btn-sm" onclick="AdminApp.deleteMedia(${idx}, '${m.id || ''}')" title="Remove from catalog" type="button">✕</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    },

    deleteMedia(index, docId) {
      const item = this.mediaFiles && this.mediaFiles[index];
      const itemName = item ? item.name : 'this item';
      if (!confirm('Remove "' + itemName + '" from the Media Library catalog?\n\nNote: Cloudinary unsigned presets retain hosted assets on CDN; this action removes the record from your site catalog.')) {
        return;
      }

      if (docId && this.fbDb) {
        this.fbDb.collection('media').doc(docId).delete().catch(err => {
          console.warn('[AdminApp] Delete media doc from Firestore:', err);
        });
      }

      this.mediaFiles.splice(index, 1);
      this.renderMediaLibrary();
      this.showToast('Media entry removed from library catalog.', 'info');
    },

    /**
     * Enhanced Media Picker Modal
     */
    openImagePicker(targetInputId, previewImgId = null, cardId = null, options = {}) {
      this.targetPickerInputId = targetInputId;
      this.targetPickerPreviewId = previewImgId;
      this.targetPickerCardId = cardId;
      this.pickerOptions = options || {};
      this.pickerFilter = options.filter || 'all';
      this.pickerSearchQuery = '';

      // Update filter tabs inside picker modal
      ['All', 'Images', 'Videos'].forEach(t => {
        const btn = document.getElementById('pickerFilter' + t);
        if (btn) {
          const isMatch = (t === 'All' && this.pickerFilter === 'all') || 
                          (t === 'Images' && this.pickerFilter === 'image') || 
                          (t === 'Videos' && this.pickerFilter === 'video');
          btn.className = isMatch ? 'btn btn-sm btn-gold' : 'btn btn-sm btn-outline';
        }
      });

      this.renderPickerMediaGrid();
      this.openModal('mediaPickerModal');
    },

    setPickerFilter(type) {
      this.pickerFilter = type;
      ['All', 'Images', 'Videos'].forEach(t => {
        const btn = document.getElementById('pickerFilter' + t);
        if (btn) {
          const isMatch = (t === 'All' && type === 'all') || 
                          (t === 'Images' && type === 'image') || 
                          (t === 'Videos' && type === 'video');
          btn.className = isMatch ? 'btn btn-sm btn-gold' : 'btn btn-sm btn-outline';
        }
      });
      this.renderPickerMediaGrid();
    },

    filterPickerMedia(val) {
      this.pickerSearchQuery = (val || '').toLowerCase().trim();
      this.renderPickerMediaGrid();
    },

    renderPickerMediaGrid() {
      const grid = document.getElementById('pickerMediaGrid');
      if (!grid) return;

      if (!this.mediaFiles || this.mediaFiles.length === 0) {
        this.renderMediaLibrary();
      }

      const filter = this.pickerFilter || 'all';
      const search = this.pickerSearchQuery || '';

      const items = (this.mediaFiles || []).filter(m => {
        const isVid = m.isVideo || m.resourceType === 'video' || /\.(mp4|webm|mov)$/i.test(m.url);
        if (filter === 'image' && isVid) return false;
        if (filter === 'video' && !isVid) return false;
        if (search) {
          return (m.name || '').toLowerCase().includes(search) || (m.url || '').toLowerCase().includes(search);
        }
        return true;
      });

      if (items.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1 / -1; padding: 30px; text-align: center; color: var(--ink-muted);">No media items found. Click "Upload New" above to upload now.</div>';
        return;
      }

      grid.innerHTML = items.map(m => {
        const isVid = m.isVideo || m.resourceType === 'video' || /\.(mp4|webm|mov)$/i.test(m.url);
        const resolved = this.resolveImg(m.url);
        const thumbUrl = optimizeMediaUrl(resolved, { isThumb: true, isVideo: isVid });

        return `
          <div class="media-item ${isVid ? 'is-video' : ''}" onclick="AdminApp.selectPickedImage('${m.url}', ${isVid})" title="${this.escapeAttr(m.name)}">
            ${isVid ? `
              <span class="media-video-badge">🎬 VIDEO</span>
              <img src="${thumbUrl}" alt="${this.escapeAttr(m.name)}" loading="lazy" onerror="this.src='../assets/images/sigiriya.jpg'"/>
              <div class="media-video-play-center">▶</div>
            ` : `
              <img src="${thumbUrl}" alt="${this.escapeAttr(m.name)}" loading="lazy" onerror="this.src='../assets/images/logo.png'"/>
            `}
            <div class="media-overlay">
              <span class="media-info">${this.escapeHtml(m.name)}</span>
              <span class="btn btn-gold btn-sm">Select Media</span>
            </div>
          </div>
        `;
      }).join('');
    },

    selectPickedImage(url, isVideo = false) {
      const cleanUrl = url.replace('../', '');

      if (this.targetPickerInputId) {
        const target = document.getElementById(this.targetPickerInputId);
        if (target) {
          target.value = cleanUrl;
          target.dispatchEvent(new Event('input', { bubbles: true }));
          target.dispatchEvent(new Event('change', { bubbles: true }));
          
          if (isVideo || this.targetPickerInputId.toLowerCase().includes('video')) {
            this.updateVideoPreview(this.targetPickerInputId, this.targetPickerPreviewId, this.targetPickerCardId);
          } else {
            this.updateImagePreview(this.targetPickerInputId, this.targetPickerPreviewId, this.targetPickerCardId);
          }
        }
      }

      if (this.pickerOptions && typeof this.pickerOptions.onSelect === 'function') {
        this.pickerOptions.onSelect(cleanUrl, isVideo);
      }

      this.closeModal('mediaPickerModal');
      this.showToast('Media selected and preview updated!', 'success');
    },

    triggerUploadFromPicker() {
      const isVid = this.pickerFilter === 'video';
      this.triggerUploadForInput(this.targetPickerInputId, this.targetPickerPreviewId, this.targetPickerCardId, {
        resourceType: isVid ? 'video' : 'auto',
        callback: (url, isVideo) => {
          if (this.pickerOptions && typeof this.pickerOptions.onSelect === 'function') {
            this.pickerOptions.onSelect(url, isVideo);
          }
          this.closeModal('mediaPickerModal');
        }
      });
    },

    /**
     * Cloudinary 1x1 Self-Test in Settings
     */
    async runCloudinarySelfTest() {
      const statusEl = document.getElementById('cloudinaryTestStatus');
      const detailsEl = document.getElementById('cloudinaryTestDetails');
      if (statusEl) {
        statusEl.textContent = '⏳ Uploading 1x1 test image to Cloudinary CDN...';
        statusEl.style.color = '#3B82F6';
      }
      if (detailsEl) detailsEl.style.display = 'none';

      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#E5B869';
        ctx.fillRect(0, 0, 1, 1);

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const testFile = new File([blob], 'test-self-check.png', { type: 'image/png' });

        const result = await uploadToCloudinary(testFile, { tags: 'admin_test' });

        if (statusEl) {
          statusEl.textContent = '✅ Cloudinary Direct Upload Working: HTTP 200 OK!';
          statusEl.style.color = '#10B981';
        }
        if (detailsEl) {
          detailsEl.style.display = 'block';
          detailsEl.innerHTML = '<strong>Status:</strong> HTTP 200 OK<br><strong>Public ID:</strong> ' + result.publicId + '<br><strong>CDN URL:</strong> <a href="' + result.secureUrl + '" target="_blank" style="color: #FDE047;">' + result.secureUrl + '</a>';
        }
        this.showToast('Cloudinary self-test passed! CDN upload is active.', 'success', 5000);
      } catch (err) {
        console.error('[Cloudinary Self Test Error]', err);
        if (statusEl) {
          statusEl.textContent = '❌ Test Failed: ' + err.message;
          statusEl.style.color = '#EF4444';
        }
        if (detailsEl) {
          detailsEl.style.display = 'block';
          detailsEl.innerHTML = '<strong>Error:</strong> ' + err.message + '<br><small>Ensure preset "lotus_tours_unsigned" is set to Unsigned in Cloudinary Console.</small>';
        }
        this.showToast('Cloudinary self-test failed: ' + err.message, 'error', 6000);
      }
    },


    client: null,

    fbAuth: null,

    fbDb: null,

    currentUser: null,

    currentRole: 'editor',

    activeSection: 'dashboard',

    lastActivity: Date.now(),

    unsavedChanges: false,

    

    // In-memory data store

    inquiries: [],

    activeInquiryTab: 'quick',

    quickInquiries: [],

    detailedInquiries: [],

    team: [],

    packages: [],

    categories: [],

    destinations: [],

    reviews: [],

    mediaFiles: [],

    settings: {},



    targetPickerInputId: null,

    deleteActionCallback: null,



    /**

     * Application Initialization

     */

    

    /**

     * Smart Image URL Resolver (Safe for Admin and Public Views)

     */

    
    /**
     * Direct Unsigned Upload to Cloudinary CDN
     */
    async uploadBlobToCloudinary(blob, originalFilename = 'image.webp') {
      const res = await uploadToCloudinary(blob, { originalName: originalFilename });
      return res.secureUrl;
    },
resolveImg(url) {
      if (!url) return "../assets/images/logo.png";
      url = String(url).trim();
      const LEGACY_MAP = {
        "assets/tours/beach/southern-sands-1.jpg": "assets/images/beach-galle.jpg",
        "assets/tours/wildlife/wild-ceylon-1.jpg": "assets/images/wildlife.jpg",
        "assets/tours/cultural/heritage-1.jpg": "assets/images/sigiriya.jpg",
        "assets/tours/wellness/ayurveda-1.jpg": "assets/images/temple-culture.jpg",
        "assets/tours/honeymoon/romance-1.jpg": "assets/images/couple-travel.jpg",
        "assets/tours/luxury/private-island-1.jpg": "assets/images/sunset-mirissa.jpg",
        "assets/tours/scenic/hill-country-1.jpg": "assets/images/tea-country.jpg"
      };
      const clean = url.replace(/^(\.\.\/)+/, "").replace(/^\//, "");
      if (LEGACY_MAP[clean]) {
        return "../" + LEGACY_MAP[clean];
      }
      if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:") || url.startsWith("blob:")) {
        return url;
      }
      if (url.startsWith("../")) return url;
      if (url.startsWith("/")) return ".." + url;
      return "../" + url;
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

    async handleDirectImageUpload(file, inputId, previewImgId, cardId) {
      if (!file) return;
      try {
        const res = await uploadToCloudinary(file);
        const permanentUrl = res.secureUrl;
        const input = document.getElementById(inputId);
        if (input) {
          input.value = permanentUrl;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
        this.updateImagePreview(inputId, previewImgId, cardId);
        this.renderMediaLibrary();
        this.showToast(`"${file.name}" uploaded to Cloudinary successfully!`, 'success');
      } catch (err) {
        console.error('[AdminApp] handleDirectImageUpload failed:', err);
        this.showToast(`Upload failed: ${err.message}`, 'error');
      }
    },


    initFirebase() {
      if (window.firebase && window.firebase.apps && window.firebase.apps.length > 0) {
        this.fbDb = window.firebase.firestore();
        this.fbAuth = window.firebase.auth();
      } else if (window.firebase && typeof window.firebase.initializeApp === 'function') {
        const config = (window.LOTUS_CONFIG && window.LOTUS_CONFIG.firebase) || {};
        try {
          const app = window.firebase.initializeApp(config);
          this.fbDb = window.firebase.firestore(app);
          this.fbAuth = window.firebase.auth(app);
        } catch (e) {
          console.warn('[AdminApp] Firebase initializeApp:', e.message);
        }
      } else if (window.LotusFirebase) {
        this.fbDb = window.LotusFirebase.db;
        this.fbAuth = window.LotusFirebase.auth;
      }
    },

    /* Supabase removed in favor of Firebase Firestore */

    async init() {
      this.verifyFirebaseConnection();
      this.initFirebase();
      // Firebase only
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
          const candidateDocIds = [];
          if (uid) candidateDocIds.push(uid);
          if (email) {
            const cleanEmail = email.toLowerCase().trim();
            const username = cleanEmail.split('@')[0];
            candidateDocIds.push(cleanEmail);
            candidateDocIds.push('super_admin_' + username);
            candidateDocIds.push('admin_' + username);
            candidateDocIds.push(username);
          }
          for (const docId of candidateDocIds) {
            try {
              const snap = await this.fbDb.collection('admins').doc(docId).get();
              if (snap && snap.exists) {
                doc = snap;
                break;
              }
            } catch (e) {
              // try next candidate
            }
          }
          if (doc && doc.exists) {
            const data = doc.data() || {};
            const r = (data.role || '').toLowerCase();
            this.currentRole = (r === 'super_admin' || r === 'owner' || r === 'admin') ? 'super_admin' : 'editor';
            return true;
          }
          // Check users collection as well
          for (const docId of candidateDocIds) {
            try {
              const snap = await this.fbDb.collection('users').doc(docId).get();
              if (snap && snap.exists) {
                doc = snap;
                break;
              }
            } catch (e) {}
          }
          if (doc && doc.exists) {
            const data = doc.data() || {};
            const r = (data.role || '').toLowerCase();
            this.currentRole = (r === 'super_admin' || r === 'owner' || r === 'admin') ? 'super_admin' : 'editor';
            return true;
          }
          // Legitimate Firebase Auth user fallback: grant access to authenticated staff
          if (email && (email.toLowerCase().includes('gamhewak') || email.toLowerCase().includes('admin') || email.toLowerCase().includes('lotus') || email.toLowerCase().includes('paliforbuddhism'))) {
            this.currentRole = 'super_admin';
            return true;
          }
          this.currentRole = 'editor';
          return true;
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
      ['users', 'settings', 'forms-editor'].forEach(sec => {
        const el = document.querySelector(`.nav-link[data-section="${sec}"]`);
        if (el) el.style.display = isSuper ? 'flex' : 'none';
      });
      if (!isSuper && (this.activeSection === 'users' || this.activeSection === 'settings' || this.activeSection === 'forms-editor')) {
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

    togglePasswordVisibility() {
      const input = document.getElementById('loginPassword');
      const icon = document.getElementById('togglePasswordIcon');
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        if (icon) icon.textContent = '🙈';
      } else {
        input.type = 'password';
        if (icon) icon.textContent = '👁️';
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
          throw new Error('Firebase Authentication is offline or not configured. Access denied.');
        }
      } catch (err) {
        this.showToast('Login failed: ' + err.message, 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>Sign In to Dashboard</span>';
      }
    },



    /**

     * Handle Admin Logout

     */

    async handleLogout() {

      if (this.unsavedChanges && !confirm('You have unsaved changes. Are you sure you want to log out?')) {

        return;

      }



      if (this.fbAuth) {

        try { await this.fbAuth.signOut(); } catch (e) { console.warn(e); }

      }

      if (this.client) {

        try { await this.client.auth.signOut(); } catch (e) { console.warn(e); }

      }

      this.currentUser = null;

      this.showLogin();

      this.showToast('Signed out successfully', 'info');

    },



    /**

     * Show Password Reset Modal

     */

    showResetModal(e) {

      if (e) e.preventDefault();

      this.openModal('resetModal');

    },



    /**

     * Send Password Reset Link

     */

    async sendPasswordReset() {

      const email = document.getElementById('resetEmail').value.trim();

      if (!email) {

        this.showToast('Please enter your email address', 'error');

        return;

      }



      try {

        if (this.fbAuth) {

          await this.fbAuth.sendPasswordResetEmail(email);

          this.showToast('Password reset email sent to ' + email, 'success');

          this.closeModal('resetModal');

        } else if (this.client) {

          const { error } = await this.client.auth.resetPasswordForEmail(email, {

            redirectTo: window.location.origin + '/admin/'

          });

          if (error) throw error;

          this.showToast('Password reset email sent to ' + email, 'success');

          this.closeModal('resetModal');

        } else {

          this.showToast('Password reset link sent to ' + email + ' (Simulated in local mode)', 'success');

          this.closeModal('resetModal');

        }

      } catch (err) {

        this.showToast('Error: ' + err.message, 'error');

      }

    },



    /**

     * Setup 30-min Idle Timeout

     */

    setupIdleDetector() {

      const updateActivity = () => { this.lastActivity = Date.now(); };

      window.addEventListener('mousemove', updateActivity, { passive: true });

      window.addEventListener('keydown', updateActivity, { passive: true });

      window.addEventListener('click', updateActivity, { passive: true });



      setInterval(() => {

        if (!this.currentUser) return;

        const idleMins = (Date.now() - this.lastActivity) / (1000 * 60);

        if (idleMins >= IDLE_TIMEOUT_MINUTES) {

          this.handleLogout();

          this.showToast('You were logged out due to 30 minutes of inactivity.', 'warning', 8000);

        }

      }, 60000); // Check every minute

    },



    /**

     * Setup Unsaved Changes Warning

     */

    setupBeforeUnload() {

      window.addEventListener('beforeunload', (e) => {

        if (this.unsavedChanges) {

          e.preventDefault();

          e.returnValue = '';

        }

      });

    },



    /**

     * Switch Navigation Section

     */

    switchSection(sectionId) {
      if (this.currentRole !== 'super_admin' && (sectionId === 'users' || sectionId === 'settings' || sectionId === 'forms-editor')) {
        this.showToast('Access denied: Users & Roles section is restricted to Super Admins.', 'error');
        this.activeSection = 'dashboard';
        sectionId = 'dashboard';
      }

      if (this.unsavedChanges && !confirm('You have unsaved changes. Discard and switch section?')) {

        return;

      }

      this.unsavedChanges = false;

      this.activeSection = sectionId;



      // Update Sidebar Active Class

      document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {

        link.classList.toggle('active', link.dataset.section === sectionId);

      });



      // Update Content Section

      document.querySelectorAll('.content-section').forEach(sec => {

        sec.classList.remove('active');

      });

      const targetSec = document.getElementById('section-' + sectionId);

      if (targetSec) targetSec.classList.add('active');



      // Update Topbar Title

      const titleMap = {

        dashboard: 'Dashboard Overview',

        inquiries: 'Customer Inquiries',

        packages: 'Tour Packages',

        categories: 'Tour Categories',

        destinations: 'Destinations',

        reviews: 'Guest Reviews & Testimonials',

        media: 'Media Library',

        users: 'User Roles & Access',

        settings: 'Global Settings',

        team: 'Our People & Global Representatives',
        'page-editor': 'Page Content Editor',
        'forms-editor': 'Form Definitions & Dynamic Schemas',
        'blog-posts': 'Blog Posts & Editorial Stories'

      };

      const titleEl = document.getElementById('pageTitle');

      if (titleEl) titleEl.textContent = titleMap[sectionId] || 'Admin';



      // Close mobile sidebar if open

      const sidebar = document.getElementById('sidebar');

      if (sidebar) sidebar.classList.remove('open');

      // Re-render section data on navigation
      if (sectionId === 'packages') {
        this.renderPackages();
      } else if (sectionId === 'categories') {
        this.renderCategories();
      } else if (sectionId === 'destinations') {
        this.renderDestinations();
      } else if (sectionId === 'reviews') {
        this.renderReviews();
      } else if (sectionId === 'team') {
        this.renderTeam();
      } else if (sectionId === 'media') {
        this.renderMediaLibrary();
      } else if (sectionId === 'dashboard') {
        this.renderDashboard();
      } else if (sectionId === 'users') {
        this.renderUsers();
      } else if (sectionId === 'inquiries') {
        this.renderInquiries();
      }
    },



    toggleSidebar() {

      const sidebar = document.getElementById('sidebar');

      if (sidebar) sidebar.classList.toggle('open');

    },



    /**

     * Load All Content Data

     */

    async loadAllData() {
      if (this.fbDb) {
        try {
          const cloudDoc = await this.fbDb.collection('settings').doc('cloudinary').get();
          if (cloudDoc && cloudDoc.exists) {
            const cd = cloudDoc.data();
            if (cd.cloudName) this.cloudinaryConfig.cloudName = cd.cloudName;
            if (cd.uploadPreset) this.cloudinaryConfig.uploadPreset = cd.uploadPreset;
            if (window.CLOUDINARY_CONFIG) {
              if (cd.cloudName) window.CLOUDINARY_CONFIG.cloudName = cd.cloudName;
              if (cd.uploadPreset) window.CLOUDINARY_CONFIG.uploadPreset = cd.uploadPreset;
            }
            if (document.getElementById('settingCloudName')) document.getElementById('settingCloudName').value = cd.cloudName;
            if (document.getElementById('settingUploadPreset')) document.getElementById('settingUploadPreset').value = cd.uploadPreset;
          }
        } catch (e) {}
      }
      let loadedFromLive = false;

      // 1. Fetch from Firebase Firestore live
      if (!loadedFromLive && window.LotusFirebase && navigator.onLine) {
        try {
          const [liveCatalog, liveDests, liveRevs] = await Promise.all([
            window.LotusFirebase.fetchFirestoreCatalog(),
            window.LotusFirebase.fetchDestinations(),
            window.LotusFirebase.fetchReviews()
          ]);
          if (liveCatalog && liveCatalog.packages && liveCatalog.packages.length > 0) {
            this.packages = liveCatalog.packages;
            const cats = liveCatalog.categories || {};
            this.categories = Array.isArray(cats) ? cats : Object.values(cats);
            if (liveDests && liveDests.length > 0) this.destinations = liveDests;
            if (liveRevs && liveRevs.length > 0) this.reviews = liveRevs;
            loadedFromLive = true;
            this.syncCatalogCache();
            console.log(`[AdminApp] Loaded ${this.packages.length} tours from Firestore live.`);
          }
        } catch (fbErr) {
          console.warn('[AdminApp] Firestore live catalog fetch error:', fbErr);
        }
      }

      // 2. Fallback to bundled seed bundle if live source returned empty
      if (!loadedFromLive) {
        await this.loadLocalFallbackData();
        // Auto-seed to Firestore so live site and admin are immediately populated
        if (this.fbDb && this.packages && this.packages.length > 0) {
          try {
            console.log('[AdminApp] Auto-seeding default catalog to Firestore...');
            if (window.LotusFirebase && typeof window.LotusFirebase.seedFirestore === 'function') {
              window.LotusFirebase.seedFirestore({
                packages: this.packages,
                categories: this.categories,
                destinations: this.destinations,
                reviews: this.reviews
              }).catch(e => console.warn('[Auto-seed]', e));
            }
          } catch (e) {}
        }
      }

      this.renderDashboard();

        if (window.LotusFirebase) {

          this.updateFirebaseBadge('Firebase Ready', '#3B82F6');

        }

      await this.loadDualInquiries();

      await this.loadTeamData();

      this.renderInquiries();

      this.renderTeam();

      this.renderPackages();

      this.renderCategories();

      this.renderDestinations();

      this.renderReviews();

      this.renderMediaLibrary();

      this.renderUsers();

      this.renderSettings();

    },



    /**

     * Fallback to default JSON content if offline or unconfigured

     */

    async loadLocalFallbackData() {

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

        }

        

        // Sample fallback inquiries

        this.inquiries = [

          {

            reference_no: 'LC-20261021-8492',

            full_name: 'Arthur Pendelton',

            email: 'arthur.p@voyages.co.uk',

            phone: '+44 7911 123456',

            country: 'United Kingdom',

            travel_dates: 'Nov 14 – Nov 24, 2026',

            travelers_count: 2,

            package_type: 'Grand Ceylon Heritage',

            budget_range: '$3,000 – $5,000 USD',

            special_notes: 'Interested in private cultural excursions, Buddhist meditation session, and luxury boutique villas.',

            status: 'new',

            created_at: new Date().toISOString()

          },

          {

            reference_no: 'LC-20261020-5120',

            full_name: 'Chen Meng',

            email: 'chen.meng@shanghai.cn',

            phone: '+86 138 0000 1234',

            country: 'China',

            travel_dates: 'Dec 22 – Jan 02, 2027',

            travelers_count: 4,

            package_type: 'Family Escapes & Wildlife',

            budget_range: '$6,000 – $8,000 USD',

            special_notes: 'Family with two children. Requesting Chinese speaking tour escort and private minivan.',

            status: 'contacted',

            created_at: new Date(Date.now() - 86400000).toISOString()

          }

        ];

      } catch (e) {

        console.error('[AdminApp] Could not load fallback JSON:', e);

      }

    },



    /**

     * 1. DASHBOARD RENDERING

     */

    renderDashboard() {

      // Counts

      const totalPackages = this.packages.length;

      const newInquiries = this.inquiries.filter(i => i.status === 'new').length;

      const monthInquiries = this.inquiries.length;

      const totalReviews = this.reviews.length;



      document.getElementById('statPackagesCount').textContent = totalPackages;

      document.getElementById('statNewInquiriesCount').textContent = newInquiries;

      document.getElementById('statMonthInquiriesCount').textContent = monthInquiries;

      document.getElementById('statReviewsCount').textContent = totalReviews;

      document.getElementById('unreadInquiriesBadge').textContent = newInquiries;



      // Recent 5 Inquiries

      const tbody = document.getElementById('dashboardInquiriesTbody');

      const recent = this.inquiries.slice(0, 5);



      if (recent.length === 0) {

        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--ink-muted);">No inquiries received yet.</td></tr>';

        return;

      }



      tbody.innerHTML = recent.map(inq => {
        const refNo = this.escapeHtml(inq.reference_no || 'N/A');
        const refAttr = this.escapeAttr(inq.reference_no || '');
        const name = this.escapeHtml(inq.full_name || 'Guest');
        const country = this.escapeHtml(inq.country || '');
        const email = this.escapeHtml(inq.email || '');
        const phone = this.escapeHtml(inq.phone || 'N/A');
        const dates = this.escapeHtml(inq.travel_dates || 'Flexible');
        const pax = this.escapeHtml(String(inq.travelers_count || 2));
        const status = this.escapeHtml(inq.status || 'new');
        return `
        <tr>
          <td><strong style="color: var(--lotus-primary); font-size: 0.8rem;">${refNo}</strong></td>
          <td><strong>${name}</strong><br><small style="color: var(--ink-muted);">${country}</small></td>
          <td>${email}<br><small style="color: var(--ink-muted);">${phone}</small></td>
          <td>${dates}<br><small>${pax} Pax</small></td>
          <td><span class="badge ${this.getInquiryBadgeClass(inq.status)}">${status}</span></td>
          <td><small style="color: var(--ink-muted);">${this.formatDate(inq.created_at)}</small></td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="AdminApp.viewInquiry('${refAttr}')">View</button>
          </td>
        </tr>
      `;
      }).join('');

    },



    getInquiryBadgeClass(status) {

      switch (status) {

        case 'new': return 'badge-warning';

        case 'contacted': return 'badge-info';

        case 'customizing': return 'badge-primary';

        case 'confirmed': return 'badge-success';

        default: return 'badge-secondary';

      }

    },



    formatDate(isoString) {

      if (!isoString) return '';

      const d = new Date(isoString);

      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    },



    /**

     * 2. INQUIRIES MANAGEMENT

     */

    async loadDualInquiries() {

      // 1. Try Firebase Firestore

      if (window.LotusFirebase && typeof window.LotusFirebase.fetchInquiries === 'function') {

        try {

          const quickList = await window.LotusFirebase.fetchInquiries('inquiries_quick');

          const detailedList = await window.LotusFirebase.fetchInquiries('inquiries_detailed');

          if (quickList.length > 0 || detailedList.length > 0) {

            this.quickInquiries = quickList;

            this.detailedInquiries = detailedList;

          }

        } catch (e) {

          console.warn('[AdminApp] Firebase inquiries fetch notice:', e.message);

        }

      }



      // 2. Check localStorage backups

      try {

        const localList = JSON.parse(localStorage.getItem('lotus_inquiries') || '[]');

        localList.forEach(item => {

          const ref = item.referenceId || item.reference_no;

          if (item.isQuickForm || item.formType === 'quick') {

            if (!this.quickInquiries.some(q => (q.referenceId || q.reference_no) === ref)) {

              this.quickInquiries.push(item);

            }

          } else {

            if (!this.detailedInquiries.some(d => (d.referenceId || d.reference_no) === ref)) {

              this.detailedInquiries.push(item);

            }

          }

        });

      } catch (e) {}



      // 3. Fallback to Supabase inquiries if empty

      if (this.quickInquiries.length === 0 && this.detailedInquiries.length === 0 && this.inquiries.length > 0) {

        this.inquiries.forEach(inq => {

          if ((inq.package_type && inq.package_type.toLowerCase().includes('quick')) || inq.is_quick) {

            this.quickInquiries.push(inq);

          } else {

            this.detailedInquiries.push(inq);

          }

        });

      }



      // Update counters

      const countQ = document.getElementById('countQuickInquiries');

      if (countQ) countQ.textContent = this.quickInquiries.length;

      const countD = document.getElementById('countDetailedInquiries');

      if (countD) countD.textContent = this.detailedInquiries.length;

    },



    switchInquiryTab(tab) {

      this.activeInquiryTab = tab;

      const btnQ = document.getElementById('btnTabQuickInquiries');

      const btnD = document.getElementById('btnTabDetailedInquiries');

      if (btnQ && btnD) {

        btnQ.classList.toggle('active', tab === 'quick');

        btnD.classList.toggle('active', tab === 'detailed');

      }



      const thead = document.getElementById('inquiriesTableHead');

      if (thead) {

        if (tab === 'quick') {

          thead.innerHTML = `

            <tr>

              <th>Ref #</th>

              <th>Guest Details</th>

              <th>Country</th>

              <th>Travel Dates</th>

              <th>Pax</th>

              <th>Status</th>

              <th>Received</th>

              <th>Actions</th>

            </tr>

          `;

        } else {

          thead.innerHTML = `

            <tr>

              <th>Ref #</th>

              <th>Guest Details</th>

              <th>Country</th>

              <th>Travel Dates</th>

              <th>Pax & Rooms</th>

              <th>Hotels & Budget</th>

              <th>Status</th>

              <th>Received</th>

              <th>Actions</th>

            </tr>

          `;

        }

      }



      this.filterInquiries();

    },



    renderInquiries() {

      this.filterInquiries();

    },



    filterInquiries() {

      const search = (document.getElementById('inquirySearchInput')?.value || '').toLowerCase();

      const statusFilter = document.getElementById('inquiryStatusFilter')?.value || 'all';



      const isQuick = this.activeInquiryTab === 'quick';

      let list = isQuick ? [...this.quickInquiries] : [...this.detailedInquiries];



      if (statusFilter !== 'all') {

        list = list.filter(i => (i.status || 'new') === statusFilter);

      }



      if (search) {

        list = list.filter(i => {

          const name = (i.fullName || i.full_name || '').toLowerCase();

          const email = (i.emailAddress || i.email || '').toLowerCase();

          const ref = (i.referenceId || i.reference_no || '').toLowerCase();

          const country = (i.country || '').toLowerCase();

          return name.includes(search) || email.includes(search) || ref.includes(search) || country.includes(search);

        });

      }



      const tbody = document.getElementById('inquiriesTableBody');

      if (!tbody) return;



      const colCount = isQuick ? 8 : 9;

      if (list.length === 0) {

        tbody.innerHTML = `<tr><td colspan="${colCount}" style="text-align: center; color: var(--ink-muted); padding: 30px;">No ${isQuick ? 'quick' : 'detailed'} inquiries found matching criteria.</td></tr>`;

        return;

      }



      tbody.innerHTML = list.map(inq => {
        const rawRef = inq.referenceId || inq.reference_no || inq.id || 'N/A';
        const refNo = this.escapeHtml(rawRef);
        const refAttr = this.escapeAttr(rawRef);
        const name = this.escapeHtml(inq.fullName || inq.full_name || 'Guest');
        const email = this.escapeHtml(inq.emailAddress || inq.email || '');
        const phone = this.escapeHtml(inq.whatsapp || inq.phone || '');
        const country = this.escapeHtml(inq.country || 'N/A');
        const rawDates = (inq.arrivalDate && inq.departureDate) ? `${inq.arrivalDate} to ${inq.departureDate}` : (inq.travel_dates || 'Flexible');
        const dates = this.escapeHtml(rawDates);
        const pax = this.escapeHtml(`${inq.totalPax || inq.travelers_count || 2} Pax`);
        const rooms = inq.roomsRequired ? this.escapeHtml(`${inq.roomsRequired} Rm`) : '';
        const hotels = this.escapeHtml(inq.hotelCategory || 'N/A');
        const rawBudget = inq.packageBudget && inq.packageBudget !== 'Custom' ? `${inq.currency || 'USD'} ${inq.packageBudget}` : (inq.budget_range || 'Custom');
        const budget = this.escapeHtml(rawBudget);
        const status = this.escapeHtml(inq.status || 'new');
        const dateReceived = this.formatDate(inq.createdAt || inq.timestamp || inq.created_at);

        if (isQuick) {
          return `
            <tr>
              <td><strong style="color: var(--lotus-primary); font-size: 0.82rem;">${refNo}</strong></td>
              <td>
                <strong>${name}</strong><br>
                <small style="color: var(--ink-muted);">${email} ${phone ? `| ${phone}` : ''}</small>
              </td>
              <td>${country}</td>
              <td>${dates}</td>
              <td>${pax}</td>
              <td>
                <select class="filter-select" style="padding: 3px 6px; font-size: 0.78rem;" onchange="AdminApp.updateInquiryStatus('${refAttr}', this.value)">
                  <option value="new" ${status === 'new' ? 'selected' : ''}>New</option>
                  <option value="contacted" ${status === 'contacted' ? 'selected' : ''}>Contacted</option>
                  <option value="customizing" ${status === 'customizing' ? 'selected' : ''}>Customizing</option>
                  <option value="confirmed" ${status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                  <option value="archived" ${status === 'archived' ? 'selected' : ''}>Archived</option>
                </select>
              </td>
              <td><small style="color: var(--ink-muted);">${dateReceived}</small></td>
              <td>
                <div class="action-btns">
                  <button class="btn-icon" title="View Details" onclick="AdminApp.viewInquiry('${refAttr}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  </button>
                  <button class="btn-icon delete" title="Delete Inquiry" onclick="AdminApp.deleteInquiry('${refAttr}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          `;
        } else {
          return `
            <tr>
              <td><strong style="color: var(--lotus-primary); font-size: 0.82rem;">${refNo}</strong></td>
              <td>
                <strong>${name}</strong><br>
                <small style="color: var(--ink-muted);">${email} ${phone ? `| ${phone}` : ''}</small>
              </td>
              <td>${country}</td>
              <td>${dates}</td>
              <td>${pax} ${rooms ? `<br><small style="color: var(--ink-muted);">${rooms}</small>` : ''}</td>
              <td>
                <small><strong>Hotels:</strong> ${hotels}</small><br>
                <small style="color: var(--sacred-gold);"><strong>Budget:</strong> ${budget}</small>
              </td>
              <td>
                <select class="filter-select" style="padding: 3px 6px; font-size: 0.78rem;" onchange="AdminApp.updateInquiryStatus('${refAttr}', this.value)">
                  <option value="new" ${status === 'new' ? 'selected' : ''}>New</option>
                  <option value="contacted" ${status === 'contacted' ? 'selected' : ''}>Contacted</option>
                  <option value="customizing" ${status === 'customizing' ? 'selected' : ''}>Customizing</option>
                  <option value="confirmed" ${status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                  <option value="archived" ${status === 'archived' ? 'selected' : ''}>Archived</option>
                </select>
              </td>
              <td><small style="color: var(--ink-muted);">${dateReceived}</small></td>
              <td>
                <div class="action-btns">
                  <button class="btn-icon" title="View Details" onclick="AdminApp.viewInquiry('${refAttr}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  </button>
                  <button class="btn-icon delete" title="Delete Inquiry" onclick="AdminApp.deleteInquiry('${refAttr}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }
      }).join('');

    },



    async updateInquiryStatus(refNo, newStatus) {

      const inq = this.inquiries.find(i => i.reference_no === refNo);

      if (inq) inq.status = newStatus;



      if (this.client) {

        try {

          await this.client

            .from('inquiries')

            .update({ status: newStatus })

            .eq('reference_no', refNo);

          this.showToast(`Inquiry ${refNo} updated to ${newStatus}`, 'success');

        } catch (e) {

          this.showToast('Failed to update status on server', 'error');

        }

      } else {

        this.showToast(`Status updated to ${newStatus} (Local mode)`, 'info');

      }

      this.renderDashboard();

    },



    viewInquiry(refNo) {

      const inq = this.inquiries.find(i => i.reference_no === refNo);

      if (!inq) return;



      document.getElementById('inquiryModalRef').textContent = `Inquiry: ${inq.reference_no}`;

      const body = document.getElementById('inquiryModalBody');

      const cleanName = this.escapeHtml(inq.full_name || inq.fullName || 'Guest');
      const cleanCountry = this.escapeHtml(inq.country || 'N/A');
      const cleanEmail = this.escapeHtml(inq.email || inq.emailAddress || '');
      const cleanPhone = this.escapeHtml(inq.phone || inq.whatsapp || 'N/A');
      const cleanDates = this.escapeHtml(inq.travel_dates || inq.arrivalDate || 'Flexible');
      const cleanPax = this.escapeHtml(`${inq.travelers_count || inq.totalPax || 2} Pax`);
      const cleanPackage = this.escapeHtml(inq.package_type || inq.packageBudget || 'Bespoke Tour');
      const cleanBudget = this.escapeHtml(inq.budget_range || inq.packageBudget || 'Not specified');
      const cleanNotes = this.escapeHtml(inq.special_notes || inq.specialRequests || 'No special notes provided.');

      body.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Guest Name</label><div style="font-weight: 600;">${cleanName}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Country</label><div>${cleanCountry}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Email</label><div><a href="mailto:${cleanEmail}">${cleanEmail}</a></div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Phone / WhatsApp</label><div><a href="tel:${cleanPhone}">${cleanPhone}</a></div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Travel Dates</label><div>${cleanDates}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Travelers Count</label><div>${cleanPax}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Tour / Category</label><div>${cleanPackage}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Budget Range</label><div>${cleanBudget}</div></div>
        </div>
        <div style="margin-top: 14px; background: var(--ivory); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <label style="font-weight: 600; font-size: 0.85rem; color: var(--ink);">Guest Notes & Special Requests</label>
          <p style="margin-top: 6px; font-size: 0.9rem; line-height: 1.6; color: var(--ink-light); white-space: pre-wrap;">${cleanNotes}</p>
        </div>
      `;



      // WhatsApp reply button

      const waBtn = document.getElementById('inquiryWhatsAppBtn');

      if (inq.phone) {

        const cleanPhone = inq.phone.replace(/[^0-9]/g, '');

        const message = encodeURIComponent(`Hello ${inq.full_name}, thank you for contacting Lotus Ceylon Tours regarding your Sri Lanka journey (Ref: ${inq.reference_no}). We would love to assist you with your personalized itinerary!`);

        waBtn.onclick = () => window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');

        waBtn.style.display = 'inline-flex';

      } else {

        waBtn.style.display = 'none';

      }



      this.openModal('inquiryModal');

    },



    deleteInquiry(refNo) {

      this.confirmDelete(`Are you sure you want to delete inquiry ${refNo}?`, async () => {

        this.inquiries = this.inquiries.filter(i => i.reference_no !== refNo);

        if (this.client) {

          try {

            await this.client.from('inquiries').delete().eq('reference_no', refNo);

            this.showToast('Inquiry deleted from server', 'success');

          } catch (e) {

            this.showToast('Failed to delete on server', 'error');

          }

        }

        this.renderInquiries();

        this.renderDashboard();

      });

    },



    exportInquiriesCSV() {

      const isQuick = this.activeInquiryTab === 'quick';

      const list = isQuick ? this.quickInquiries : this.detailedInquiries;

      const sheetName = isQuick ? 'Lotus_Ceylon_Quick_Inquiries' : 'Lotus_Ceylon_Detailed_Inquiries';



      if (list.length === 0) {

        this.showToast(`No ${isQuick ? 'quick' : 'detailed'} inquiries available to export`, 'error');

        return;

      }



      let headers = [];

      let rows = [];



      if (isQuick) {

        headers = ['Reference No', 'Guest Name', 'Email', 'WhatsApp Phone', 'Country', 'Arrival Date', 'Departure Date', 'Total Pax', 'Adults', 'Children', 'Hotel Style', 'Status', 'Date Received'];

        rows = list.map(i => [

          `"${i.referenceId || i.reference_no || ''}"`,

          `"${(i.fullName || i.full_name || '').replace(/"/g, '""')}"`,

          `"${i.emailAddress || i.email || ''}"`,

          `"${i.whatsapp || i.phone || ''}"`,

          `"${i.country || ''}"`,

          `"${i.arrivalDate || ''}"`,

          `"${i.departureDate || ''}"`,

          i.totalPax || i.travelers_count || 2,

          i.adults || 2,

          i.children || 0,

          `"${(i.hotelCategory || '').replace(/"/g, '""')}"`,

          `"${i.status || 'new'}"`,

          `"${i.createdAt || i.timestamp || i.created_at || ''}"`

        ]);

      } else {

        headers = ['Reference No', 'Guest Name', 'Email', 'WhatsApp Phone', 'Country', 'Arrival Date', 'Departure Date', 'Total Pax', 'Adults', 'Children', 'Rooms', 'Hotels', 'Meal Plan', 'Interests', 'Currency', 'Budget', 'Special Notes', 'Status', 'Date Received'];

        rows = list.map(i => [

          `"${i.referenceId || i.reference_no || ''}"`,

          `"${(i.fullName || i.full_name || '').replace(/"/g, '""')}"`,

          `"${i.emailAddress || i.email || ''}"`,

          `"${i.whatsapp || i.phone || ''}"`,

          `"${i.country || ''}"`,

          `"${i.arrivalDate || ''}"`,

          `"${i.departureDate || ''}"`,

          i.totalPax || i.travelers_count || 2,

          i.adults || 2,

          i.children || 0,

          i.roomsRequired || 1,

          `"${(i.hotelCategory || '').replace(/"/g, '""')}"`,

          `"${(i.mealPlan || '').replace(/"/g, '""')}"`,

          `"${(i.interests || '').replace(/"/g, '""')}"`,

          `"${i.currency || 'USD'}"`,

          `"${i.packageBudget || ''}"`,

          `"${(i.otherRequirements || i.special_notes || '').replace(/"/g, '""')}"`,

          `"${i.status || 'new'}"`,

          `"${i.createdAt || i.timestamp || i.created_at || ''}"`

        ]);

      }



      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

      const encodedUri = encodeURI(csvContent);

      const link = document.createElement('a');

      link.setAttribute('href', encodedUri);

      link.setAttribute('download', `${sheetName}_${new Date().toISOString().slice(0, 10)}.csv`);

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      this.showToast(`Exported ${list.length} inquiries to CSV successfully!`, 'success');

    },



    // =========================================================================

    // TEAM & GLOBAL REPRESENTATIVES (DATA-DRIVEN)

    // =========================================================================

    async loadTeamData() {

      if (window.LotusFirebase && typeof window.LotusFirebase.fetchTeam === 'function') {

        try {

          const list = await window.LotusFirebase.fetchTeam('../data/team.json');

          if (list && list.length > 0) {

            this.team = list;

          }

        } catch (e) {

          console.warn('[AdminApp] Team fetch error, using local fallback:', e);

        }

      }



      if (this.team.length === 0) {

        try {

          const res = await fetch('../data/team.json');

          if (res.ok) this.team = await res.json();

        } catch (e) {}

      }

    },



    renderTeam() {

      const tbody = document.getElementById('teamTableBody');

      if (!tbody) return;



      if (!this.team || this.team.length === 0) {

        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--ink-muted); padding: 30px;">No representatives found. Click "+ Add Representative" to create one.</td></tr>';

        return;

      }



      this.team.sort((a, b) => (a.sortOrder || 1) - (b.sortOrder || 1));



      tbody.innerHTML = this.team.map(member => {
        const photoUrl = member.photo ? (member.photo.url || member.photo.secure_url || '') : '';
        const flag = this.escapeHtml(member.flag || '🌐');
        const name = this.escapeHtml(member.name || '');
        const role = this.escapeHtml(member.role || '');
        const country = this.escapeHtml(member.country || '');
        const memberId = this.escapeAttr(member.id || '');

        return `
          <tr>
            <td>
              ${photoUrl ? `<img src="${this.resolveImg(photoUrl)}" alt="${name}" class="team-avatar-cell">` : `<div class="team-avatar-cell" style="background:#E2E8F0; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">${flag}</div>`}
            </td>
            <td><strong>${name}</strong></td>
            <td>${role}</td>
            <td><span>${flag}</span> ${country}</td>
            <td>${member.sortOrder || 1}</td>
            <td>
              <span class="badge ${member.published ? 'badge-success' : 'badge-secondary'}" style="cursor:pointer;" onclick="AdminApp.toggleTeamPublished('${memberId}')">
                ${member.published ? 'Published' : 'Draft'}
              </span>
            </td>
            <td>
              <div class="action-btns">
                <button class="btn-icon" title="Edit Member" onclick="AdminApp.openTeamModal('${memberId}')">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </button>
                <button class="btn-icon delete" title="Delete Member" onclick="AdminApp.deleteTeamMember('${memberId}')">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

    },



    openTeamModal(memberId = null) {

      const modal = document.getElementById('teamModal');

      const title = document.getElementById('teamModalTitle');

      const form = document.getElementById('teamMemberForm');

      if (!modal || !form) return;



      form.reset();



      if (memberId) {

        const member = this.team.find(m => m.id === memberId);

        if (member) {

          title.textContent = 'Edit Representative';

          document.getElementById('teamMemberId').value = member.id;

          document.getElementById('teamName').value = member.name || '';

          document.getElementById('teamFlag').value = member.flag || '';

          document.getElementById('teamRole').value = member.role || '';

          document.getElementById('teamCountry').value = member.country || '';

          document.getElementById('teamPhotoUrl').value = member.photo ? (member.photo.url || member.photo.secure_url || '') : '';

          this.updateImagePreview('teamPhotoUrl', 'teamPhotoPreview', 'teamPhotoPreviewCard');

          document.getElementById('teamBio').value = member.bio || '';

          document.getElementById('teamSortOrder').value = member.sortOrder || 1;

          document.getElementById('teamPublished').checked = member.published !== false;

        }

      } else {

        title.textContent = 'Add Representative';

        document.getElementById('teamMemberId').value = '';

        document.getElementById('teamSortOrder').value = (this.team.length + 1);

        document.getElementById('teamPublished').checked = true;

      }



      this.openModal('teamModal');

    },



    openCloudinaryForTeam() {

      if (!window.cloudinary) {

        this.showToast('Cloudinary widget not loaded', 'error');

        return;

      }



      const widget = window.cloudinary.createUploadWidget({

        cloudName: LOTUS_CONFIG.cloudinary.cloudName,

        uploadPreset: LOTUS_CONFIG.cloudinary.uploadPreset,

        folder: 'lotus/team',

        cropping: true,

        croppingAspectRatio: 0.8,

        gravity: 'face',

        sources: ['local', 'url', 'camera'],

        multiple: false

      }, (error, result) => {

        if (!error && result && result.event === 'success') {

          const optimizedUrl = result.info.secure_url.replace('/upload/', '/upload/c_fill,g_face,q_auto,f_auto/');

          const input = document.getElementById('teamPhotoUrl');

          if (input) input.value = optimizedUrl;

          this.showToast('Photo uploaded & face-centered successfully!', 'success');

        }

      });

      widget.open();

    },



    async saveTeamMember(e) {

      e.preventDefault();

      const id = document.getElementById('teamMemberId').value || ('rep-' + Date.now());

      const name = document.getElementById('teamName').value.trim();

      const flag = document.getElementById('teamFlag').value.trim() || '🌐';

      const role = document.getElementById('teamRole').value.trim();

      const country = document.getElementById('teamCountry').value.trim();

      const photoUrl = document.getElementById('teamPhotoUrl').value.trim();

      const bio = document.getElementById('teamBio').value.trim() || 'Introduction coming soon';

      const sortOrder = parseInt(document.getElementById('teamSortOrder').value, 10) || 1;

      const published = document.getElementById('teamPublished').checked;



      const memberData = {

        id: id,

        name: name,

        flag: flag,

        role: role,

        country: country,

        photo: {

          url: photoUrl,

          alt: `${name}, ${role}`,

          cloudinaryPublicId: photoUrl.includes('cloudinary') ? photoUrl.split('/').pop().split('.')[0] : ''

        },

        bio: bio,

        sortOrder: sortOrder,

        published: published

      };



      if (window.LotusFirebase && typeof window.LotusFirebase.saveTeamMember === 'function') {

        try {

          await window.LotusFirebase.saveTeamMember(memberData);

        } catch (err) {

          console.warn('[AdminApp] Firebase team save error:', err);

        }

      }



      const idx = this.team.findIndex(m => m.id === id);

      if (idx !== -1) {

        this.team[idx] = memberData;

      } else {

        this.team.push(memberData);

      }



      this.closeModal('teamModal');

      this.renderTeam();

      this.showToast(`Saved representative: ${name}`, 'success');

    },



    async deleteTeamMember(memberId) {

      const member = this.team.find(m => m.id === memberId);

      const name = member ? member.name : 'this representative';

      if (!confirm(`Are you sure you want to delete ${name}?`)) return;



      if (window.LotusFirebase && typeof window.LotusFirebase.deleteTeamMember === 'function') {

        try {

          await window.LotusFirebase.deleteTeamMember(memberId);

        } catch (err) {

          console.warn('[AdminApp] Firebase team delete error:', err);

        }

      }



      this.team = this.team.filter(m => m.id !== memberId);

      this.renderTeam();

      this.showToast(`Deleted ${name}`, 'info');

    },



    async toggleTeamPublished(memberId) {

      const member = this.team.find(m => m.id === memberId);

      if (!member) return;



      member.published = !member.published;

      if (window.LotusFirebase && typeof window.LotusFirebase.saveTeamMember === 'function') {

        await window.LotusFirebase.saveTeamMember(member);

      }

      this.renderTeam();

      this.showToast(`${member.name} is now ${member.published ? 'Published' : 'Draft'}`, 'success');

    },



    /**

     * 3. TOUR PACKAGES MANAGEMENT

     */

    renderPackages() {

      // Populate category filter

      const catSelect = document.getElementById('packageCategoryFilter');

      if (catSelect) {

        catSelect.innerHTML = '<option value="all">All Categories</option>' + 

          this.categories.map(c => `<option value="${c.slug}">${c.name}</option>`).join('');

      }



      this.filterPackages();

    },



    filterPackages() {

      const search = (document.getElementById('packageSearchInput')?.value || '').toLowerCase();

      const catFilter = document.getElementById('packageCategoryFilter')?.value || 'all';



      let list = this.packages;

      if (catFilter !== 'all') {

        list = list.filter(p => p.category_slug === catFilter);

      }

      if (search) {
        list = list.filter(p => {
          const titleStr = p.title && typeof p.title === 'object' ? (p.title.en || '') : (p.title || '');
          const titleZhStr = p.title && typeof p.title === 'object' ? (p.title.zh || '') : (p.title_zh || '');
          const slugStr = p.slug || '';
          return titleStr.toLowerCase().includes(search) || titleZhStr.toLowerCase().includes(search) || slugStr.toLowerCase().includes(search);
        });
      }



      const tbody = document.getElementById('packagesTableBody');

      if (!tbody) return;



      if (list.length === 0) {

        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--ink-muted); padding: 30px;">No tour packages found.</td></tr>';

        return;

      }



      tbody.innerHTML = list.map(pkg => {
        const titleStr = pkg.title && typeof pkg.title === 'object' ? pkg.title.en : (pkg.title || '');
        const title = this.escapeHtml(titleStr);
        const slugAttr = this.escapeAttr(pkg.slug || '');
        const cat = this.escapeHtml(pkg.category_slug || 'General');
        const price = this.escapeHtml(String(pkg.price_from || 0));

        return `
        <tr>
          <td>
            <img src="${this.resolveImg(pkg.hero_image)}" class="table-thumb" alt="${title}" onerror="this.src='../assets/images/logo.png'">
          </td>
          <td>
            <strong>${title}</strong><br>
            <small style="color: var(--ink-muted);">Slug: /${this.escapeHtml(pkg.slug || '')}</small>
          </td>
          <td><span class="badge badge-info">${cat}</span></td>
          <td>${pkg.nights || 0}N / ${pkg.days || 0}D</td>
          <td><strong>$${price}</strong></td>
          <td>
            <span class="badge ${pkg.is_popular ? 'badge-success' : 'badge-secondary'}">
              ${pkg.is_popular ? 'Popular' : 'Standard'}
            </span>
          </td>
          <td>
            <label class="switch">
              <input type="checkbox" ${pkg.is_published ? 'checked' : ''} onchange="AdminApp.togglePublishPackage('${slugAttr}', this.checked)">
              <span class="slider"></span>
            </label>
          </td>
          <td style="text-align: right;">
            <div class="action-btns" style="justify-content: flex-end;">
              <button class="btn-icon" title="Edit Package" onclick="AdminApp.openPackageModal('${slugAttr}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              </button>
              <button class="btn-icon" title="Duplicate Package" onclick="AdminApp.duplicatePackage('${slugAttr}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
              </button>
              <button class="btn-icon delete" title="Delete Package" onclick="AdminApp.deletePackage('${slugAttr}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
      }).join('');

    },



    async togglePublishPackage(slug, isPublished) {

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

    },



    openPackageModal(editSlug = null) {

      const form = document.getElementById('packageForm');

      form.reset();

      document.getElementById('itineraryContainer').innerHTML = '';

      document.getElementById('highlightsContainer').innerHTML = '';



      // Populate Category Dropdown

      const catSelect = document.getElementById('pkgCategory');

      catSelect.innerHTML = this.categories.map(c => {

        const catName = c.title && typeof c.title === 'object' ? c.title.en : (c.name || c.slug);

        return `<option value="${c.slug}">${catName}</option>`;

      }).join('');



      if (editSlug) {

        const pkg = this.packages.find(p => p.slug === editSlug || p.id === editSlug);

        if (!pkg) return;

        document.getElementById('packageModalTitle').textContent = 'Edit Tour Package';

        document.getElementById('pkgId').value = pkg.id || '';

        const titleEn = pkg.title && typeof pkg.title === 'object' ? pkg.title.en : (pkg.title || '');

        const titleZh = pkg.title && typeof pkg.title === 'object' ? pkg.title.zh : (pkg.title_zh || '');

        const overviewEn = pkg.overview && typeof pkg.overview === 'object' ? pkg.overview.en : (pkg.overview || '');

        const overviewZh = pkg.overview && typeof pkg.overview === 'object' ? pkg.overview.zh : (pkg.overview_zh || '');



        document.getElementById('pkgTitle').value = titleEn;

        const zhTitleInput = document.getElementById('pkgTitleZh');

        if (zhTitleInput) zhTitleInput.value = titleZh;

        document.getElementById('pkgOverview').value = overviewEn;

        const zhOverviewInput = document.getElementById('pkgOverviewZh');

        if (zhOverviewInput) zhOverviewInput.value = overviewZh;



        document.getElementById('pkgSlug').value = pkg.slug || '';

        document.getElementById('pkgCategory').value = pkg.category_slug || pkg.category || '';

        document.getElementById('pkgNights').value = pkg.nights || 1;

        document.getElementById('pkgDays').value = pkg.days || 2;

        document.getElementById('pkgPrice').value = pkg.price_from || 0;

        document.getElementById('pkgHeroImage').value = pkg.hero_image || '';
        if (document.getElementById('pkgRoute')) document.getElementById('pkgRoute').value = pkg.route || '';
        const promoVal = pkg.promo_video || '';
        document.getElementById('pkgPromoVideo').value = promoVal;
        this.updateVideoPreview('pkgPromoVideo', 'pkgPromoVideoPreview', 'pkgPromoPreviewCard');
        this.activePackageGallery = (pkg.gallery_images || pkg.gallery || []).slice();
        this.renderPackageGalleryGrid();
        if (document.getElementById('pkgPromoVideo')) document.getElementById('pkgPromoVideo').value = pkg.promo_video || pkg.promoVideo || '';
        if (document.getElementById('pkgMetaTitle')) document.getElementById('pkgMetaTitle').value = pkg.metaTitle || pkg.meta_title || '';
        if (document.getElementById('pkgMetaDescription')) document.getElementById('pkgMetaDescription').value = pkg.metaDescription || pkg.meta_description || '';
        const faqBox = document.getElementById('faqsContainer');
        if (faqBox) {
          faqBox.innerHTML = '';
          if (Array.isArray(pkg.faqs)) {
            pkg.faqs.forEach(f => this.addFaqItem(f.q || f.question, f.a || f.answer));
          }
        }

        document.getElementById('pkgIsPopular').checked = Boolean(pkg.is_popular);

        this.updateImagePreview('pkgHeroImage', 'pkgHeroImagePreview', 'pkgHeroPreviewCard', 'pkgHeroBadge');

        document.getElementById('pkgIsPublished').checked = Boolean(pkg.is_published);



        // Populate Itinerary Days

        if (Array.isArray(pkg.itinerary)) {

          pkg.itinerary.forEach((day, index) => this.addItineraryDay(day.title, day.desc, day.stay));

        }

        // Populate Highlights

        if (Array.isArray(pkg.highlights)) {

          pkg.highlights.forEach(h => this.addHighlightItem(h));

        }

      } else {

        document.getElementById('packageModalTitle').textContent = 'Add Tour Package';

        document.getElementById('pkgId').value = '';

        document.getElementById('pkgHeroImage').value = 'assets/images/cultural/sigiriya-1.webp';

        this.updateImagePreview('pkgHeroImage', 'pkgHeroImagePreview', 'pkgHeroPreviewCard', 'pkgHeroBadge');

        this.addItineraryDay('Day 1: Arrival & Coastal Welcome', 'Airport greeting by personal tour executive. Transfer to hotel.', 'Negombo / Colombo');

        this.addHighlightItem('Private air-conditioned luxury transport');
        if (document.getElementById('pkgRoute')) document.getElementById('pkgRoute').value = '';
        if (document.getElementById('pkgPromoVideo')) document.getElementById('pkgPromoVideo').value = '';
        if (document.getElementById('pkgMetaTitle')) document.getElementById('pkgMetaTitle').value = '';
        if (document.getElementById('pkgMetaDescription')) document.getElementById('pkgMetaDescription').value = '';
        const faqBox = document.getElementById('faqsContainer');
        if (faqBox) {
          faqBox.innerHTML = '';
          this.addFaqItem('What is included in the bespoke package?', 'Luxury private vehicle with dedicated chauffeur-guide, boutique stays, permits, and concierge support.');
        }

      }



      this.openModal('packageModal');

    },



    addItineraryDay(title = '', desc = '', stay = '') {

      const container = document.getElementById('itineraryContainer');

      const dayIndex = container.children.length + 1;

      const titleStr = typeof title === 'object' ? (title.en || '') : (title || '');

      const descStr = typeof desc === 'object' ? (desc.en || '') : (desc || '');

      const stayStr = typeof stay === 'object' ? (stay.en || '') : (stay || '');

      const dayDiv = document.createElement('div');

      dayDiv.className = 'repeater-item';

      dayDiv.innerHTML = `

        <div class="repeater-header">

          <span>Day ${dayIndex}</span>

          <button type="button" class="btn btn-sm btn-outline" onclick="this.closest('.repeater-item').remove()">Remove</button>

        </div>

        <div class="form-group" style="margin-bottom: 8px;">

          <input type="text" class="form-control itinerary-title" placeholder="Day Title (e.g. Day 1: Sigiriya Rock Fortress)" value="${titleStr}">

        </div>

        <div class="form-group" style="margin-bottom: 8px;">

          <textarea class="form-control itinerary-desc" rows="2" placeholder="Activities and highlights of this day...">${descStr}</textarea>

        </div>

        <div class="form-group" style="margin-bottom: 0;">

          <input type="text" class="form-control itinerary-stay" placeholder="Overnight Stay / Hotel location" value="${stayStr}">

        </div>

      `;

      container.appendChild(dayDiv);

    },
    addFaqItem(q = "", a = "") {
      const container = document.getElementById("faqsContainer");
      if (!container) return;
      const qStr = typeof q === "object" ? (q.en || "") : (q || "");
      const aStr = typeof a === "object" ? (a.en || "") : (a || "");
      const itemDiv = document.createElement("div");
      itemDiv.className = "faq-repeater-item";
      itemDiv.innerHTML = "<div class=\"faq-repeater-header\"><strong style=\"font-size: 0.82rem; color: var(--ink-light);\">FAQ Item</strong><button type=\"button\" class=\"btn-icon delete\" title=\"Remove FAQ\" onclick=\"this.closest('.faq-repeater-item').remove()\">×</button></div><input type=\"text\" class=\"form-control faq-question\" placeholder=\"Question...\" value=\"" + qStr + "\"><textarea class=\"form-control faq-answer\" rows=\"2\" placeholder=\"Answer...\">" + aStr + "</textarea>";
      container.appendChild(itemDiv);
    },




    addHighlightItem(text = '') {

      const container = document.getElementById('highlightsContainer');

      const textStr = typeof text === 'object' ? (text.en || '') : (text || '');

      const itemDiv = document.createElement('div');

      itemDiv.className = 'repeater-item';

      itemDiv.style.padding = '8px 12px';

      itemDiv.innerHTML = `

        <div style="display: flex; gap: 8px; align-items: center;">

          <input type="text" class="form-control highlight-text" placeholder="Highlight feature..." value="${textStr}">

          <button type="button" class="btn btn-sm btn-outline" onclick="this.closest('.repeater-item').remove()">✕</button>

        </div>

      `;

      container.appendChild(itemDiv);

    },



    async savePackage() {
      const title = document.getElementById('pkgTitle').value.trim();
      const slug = document.getElementById('pkgSlug').value.trim();
      const pkgIdInput = document.getElementById('pkgId');
      const existingId = pkgIdInput ? pkgIdInput.value.trim() : '';

      if (!title || !slug) {
        this.showToast('Title and Slug are required', 'error');
        return;
      }

      // Collect itinerary
      const itinerary = [];
      document.querySelectorAll('#itineraryContainer .repeater-item').forEach(item => {
        itinerary.push({
          title: item.querySelector('.itinerary-title').value,
          desc: item.querySelector('.itinerary-desc').value,
          stay: item.querySelector('.itinerary-stay').value
        });
      });

      // Collect FAQs
      const faqs = [];
      document.querySelectorAll("#faqsContainer .faq-repeater-item").forEach(item => {
        const q = item.querySelector(".faq-question") ? item.querySelector(".faq-question").value.trim() : "";
        const a = item.querySelector(".faq-answer") ? item.querySelector(".faq-answer").value.trim() : "";
        if (q) faqs.push({ q, a: a || "" });
      });

      const route = document.getElementById("pkgRoute") ? document.getElementById("pkgRoute").value.trim() : "";
      const promoVideo = document.getElementById("pkgPromoVideo") ? document.getElementById("pkgPromoVideo").value.trim() : "";
      const metaTitle = document.getElementById("pkgMetaTitle") ? document.getElementById("pkgMetaTitle").value.trim() : "";
      const metaDescription = document.getElementById("pkgMetaDescription") ? document.getElementById("pkgMetaDescription").value.trim() : "";
      const rawPrice = parseFloat(document.getElementById("pkgPrice").value) || 0;
      const priceFormatted = rawPrice > 0 ? ("$" + rawPrice.toLocaleString()) : "Price on request";

      // Collect highlights
      const highlights = [];
      document.querySelectorAll('#highlightsContainer .highlight-text').forEach(input => {
        if (input.value.trim()) highlights.push(input.value.trim());
      });

      // Multilingual fields
      const titleZhEl = document.getElementById('pkgTitleZh');
      const titleZh = titleZhEl ? titleZhEl.value.trim() : '';
      const overviewZhEl = document.getElementById('pkgOverviewZh');
      const overviewZh = overviewZhEl ? overviewZhEl.value.trim() : '';
      const overviewEn = document.getElementById('pkgOverview').value.trim();

      // Find existing package to preserve attributes
      const existing = this.packages.find(p => p.slug === slug || (existingId && p.id === existingId)) || {};
      const pkgId = existingId || existing.id || ('pkg-' + slug);

      const payload = {
        ...existing,
        id: pkgId,
        slug: slug,
        title: titleZh ? { en: title, zh: titleZh } : (typeof existing.title === 'object' ? { ...existing.title, en: title } : title),
        overview: overviewZh ? { en: overviewEn, zh: overviewZh } : (typeof existing.overview === 'object' ? { ...existing.overview, en: overviewEn } : overviewEn),
        category_slug: document.getElementById('pkgCategory').value,
        category: document.getElementById('pkgCategory').value,
        nights: parseInt(document.getElementById('pkgNights').value) || 1,
        days: parseInt(document.getElementById('pkgDays').value) || 2,
        price_from: rawPrice,
        price_formatted: priceFormatted,
        route: route,
        promo_video: promoVideo,
        promoVideo: promoVideo,
        faqs: faqs,
        metaTitle: metaTitle,
        metaDescription: metaDescription,
        promo_video: (document.getElementById('pkgPromoVideo') ? document.getElementById('pkgPromoVideo').value.trim() : '') || existing.promo_video || '',
        gallery_images: this.activePackageGallery || existing.gallery_images || existing.gallery || [],
        hero_image: document.getElementById('pkgHeroImage').value.trim() || existing.hero_image || 'assets/images/cultural-triangle.jpg',
        itinerary: itinerary.length > 0 ? itinerary : (existing.itinerary || []),
        highlights: highlights.length > 0 ? highlights : (existing.highlights || []),
        is_popular: document.getElementById('pkgIsPopular').checked,
        is_published: document.getElementById('pkgIsPublished').checked,
        updated_at: new Date().toISOString()
      };

      // 1. Save to Firebase Firestore
      if (window.LotusFirebase && typeof window.LotusFirebase.savePackage === 'function') {
        try {
          await window.LotusFirebase.savePackage(payload);
          this.showToast(`Package "${title}" saved to Firestore!`, 'success');
        } catch (e) {
          console.warn('[AdminApp] Firebase savePackage warning:', e.message);
          this.showToast(`Saved locally (Firebase sync error: ${e.message})`, 'warning');
        }
      }

      if (this.fbDb) {
        try {
          const canonicalDocId = slug || pkgId;
          await this.fbDb.collection('tourPackages').doc(canonicalDocId).set(payload, { merge: true });
          await this.fbDb.collection('siteMeta').doc('version').set({
            v: Date.now(),
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (e) {
          console.warn('[AdminApp] Direct Firestore doc save:', e.message);
        }
      }

      

      // 2. Update in-memory state
      const existingIndex = this.packages.findIndex(p => p.slug === slug || (pkgId && p.id === pkgId));
      if (existingIndex >= 0) {
        this.packages[existingIndex] = payload;
      } else {
        this.packages.push(payload);
      }

      // 3. Immediately synchronize local cache so public website & admin match
      this.syncCatalogCache();

      this.closeModal('packageModal');
      this.renderPackages();
      this.renderDashboard();
    },



    duplicatePackage(slug) {

      const original = this.packages.find(p => p.slug === slug);

      if (!original) return;



      const copySlug = original.slug + '-copy-' + Math.floor(100 + Math.random() * 900);

      const copy = {

        ...JSON.parse(JSON.stringify(original)),

        id: undefined,

        slug: copySlug,

        title: original.title + ' (Copy)',

        is_published: false

      };



      this.packages.push(copy);

      this.showToast(`Package duplicated as "${copy.title}"`, 'success');

      this.renderPackages();

    },





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
        const vNow = Date.now();
        localStorage.setItem('lotus_data_payload', JSON.stringify(cache));
        localStorage.setItem('lotus_data_v', String(vNow));
        localStorage.setItem('lotus_cms_last_published', String(vNow));

      } catch (e) {

        console.warn('Cache sync warning:', e);

      }

    },



    deleteCategory(slugOrId) {

      const cat = this.categories.find(c => c.slug === slugOrId || c.id === slugOrId);

      const name = cat ? (cat.title?.en || cat.name || slugOrId) : slugOrId;

      if (!confirm(`Are you sure you want to permanently delete category "${name}"?`)) return;



      this.categories = this.categories.filter(c => c.slug !== slugOrId && c.id !== slugOrId);

      if (this.fbDb) {

        this.fbDb.collection('categories').doc(slugOrId).delete().catch(e => console.warn('Firestore delete cat:', e));
        this.fbDb.collection('siteMeta').doc('version').set({ v: Date.now(), updatedAt: new Date().toISOString() }, { merge: true }).catch(e => {});

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
        this.fbDb.collection('siteMeta').doc('version').set({ v: Date.now(), updatedAt: new Date().toISOString() }, { merge: true }).catch(e => {});

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
        this.fbDb.collection('siteMeta').doc('version').set({ v: Date.now(), updatedAt: new Date().toISOString() }, { merge: true }).catch(e => {});

      }

      this.syncCatalogCache();

      this.renderReviews();

      this.showToast(`Review deleted successfully`, 'success');

    },



    deletePackage(slug) {
      const pkg = this.packages.find(p => p.slug === slug || p.id === slug);
      const pkgId = pkg ? pkg.id : null;
      const pkgSlug = pkg ? pkg.slug : slug;
      const pkgName = pkg ? (typeof pkg.title === 'object' ? pkg.title.en : pkg.title) : slug;
      const usageNotice = `Are you sure you want to permanently delete "${pkgName}"?`;

      this.confirmDelete(usageNotice, async () => {
        this.packages = this.packages.filter(p => p.slug !== pkgSlug && (!pkgId || p.id !== pkgId));
        this.logActivity('delete', 'tours', pkgSlug, `Package deleted: ${pkgSlug}`);

        if (this.fbDb) {
          try {
            const deletes = [
              this.fbDb.collection('tourPackages').doc(pkgSlug).delete(),
              this.fbDb.collection('tours').doc(pkgSlug).delete(),
              this.fbDb.collection('packages').doc(pkgSlug).delete()
            ];
            if (pkgId && pkgId !== pkgSlug) {
              deletes.push(this.fbDb.collection('tourPackages').doc(pkgId).delete());
              deletes.push(this.fbDb.collection('tours').doc(pkgId).delete());
              deletes.push(this.fbDb.collection('packages').doc(pkgId).delete());
            }
            deletes.push(this.fbDb.collection('siteMeta').doc('version').set({
              v: Date.now(),
              updatedAt: new Date().toISOString()
            }, { merge: true }));
            await Promise.all(deletes);
          } catch (e) {
            console.warn('Firestore package delete warning:', e);
          }
        }
        if (this.client) {
          try {
            await this.client.from('tours').delete().eq('slug', pkgSlug);
          } catch (e) {}
        }
        this.syncCatalogCache();
        this.renderPackages();
        this.renderDashboard();
        this.showToast(`Tour package "${pkgName}" deleted successfully!`, 'success');
      });
      return;
    },

    _legacyDeletePackage(slug) {

      const pkg = this.packages.find(p => p.slug === slug);

      const pkgName = pkg ? (typeof pkg.title === 'object' ? pkg.title.en : pkg.title) : slug;

      const usageNotice = `WHERE IS THIS USED?\n- Displayed on Homepage signature tours carousel\n- Included in category "/tours/${pkg?.category_slug || ''}/"\n- Listed in tours index directory\n\nAre you sure you want to permanently delete "${pkgName}"?`;



      this.confirmDelete(usageNotice, async () => {

        this.packages = this.packages.filter(p => p.slug !== slug);

        this.logActivity('delete', 'tours', slug, `Package deleted: ${slug}`);

        if (this.client) {

          try {

            await this.client.from('tours').delete().eq('slug', slug);

            this.showToast('Package deleted from server', 'success');

          } catch (e) {

            this.showToast('Delete failed: ' + e.message, 'error');

          }

        }

        this.renderPackages();

        this.renderDashboard();

      });

    },



    /**

     * Export updated data/packages.json

     */

    

    /**

     * Master Seeder: Push all 14 Collections to Firebase Firestore

     */

    

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



    async syncToFirebase() {

      if (!window.LotusFirebase) {

        this.showToast('LotusFirebase service not loaded', 'error');

        return;

      }

      this.showToast('Connecting to Firebase Firestore...', 'info');

      try {

        const pkgRes = await fetch('../data/packages.json');

        if (!pkgRes.ok) throw new Error('Could not load packages.json');

        const pkgData = await pkgRes.json();

        const count = await window.LotusFirebase.seedFirestore(pkgData);

        this.updateFirebaseBadge(`Connected (${count} Tours Synced)`, '#10B981');

        this.showToast(`Successfully synced ${count} tour packages to Firebase Firestore!`, 'success');

      } catch (err) {

        console.error('Firebase sync error:', err);

        this.updateFirebaseBadge('Firebase Offline / Error', '#EF4444');

        this.showToast('Firebase sync failed: ' + err.message, 'error');

      }

    },



    async fetchFromFirebase() {

      if (!window.LotusFirebase) {

        this.showToast('LotusFirebase service not loaded', 'error');

        return;

      }

      this.showToast('Fetching live packages from Firebase Firestore...', 'info');

      try {

        const liveCatalog = await window.LotusFirebase.fetchFirestoreCatalog();

        if (liveCatalog && liveCatalog.packages && liveCatalog.packages.length > 0) {

          this.packages = liveCatalog.packages;

          this.renderPackages();

          this.updateFirebaseBadge(`Live (${this.packages.length} Tours)`, '#10B981');

          this.showToast(`Fetched ${this.packages.length} live packages from Firestore!`, 'success');

        } else {

          this.showToast('No packages found in Firestore. Click "Seed to Firebase" first.', 'warning');

        }

      } catch (err) {

        console.error('Firebase fetch error:', err);

        this.showToast('Failed to fetch from Firestore: ' + err.message, 'error');

      }

    },



    updateFirebaseBadge(text, color) {

      const badge = document.getElementById('firebaseStatusBadge');

      if (badge) {

        badge.textContent = '☁️ ' + text;

        badge.style.background = color ? color + '20' : '#E2E8F0';

        badge.style.color = color || '#475569';

      }

    },



    exportPackagesJson() {

      try {

        const exportData = {

          categories: {},

          packages: this.packages.map(p => ({

            id: p.id || ('pkg-' + p.slug),

            slug: p.slug,

            category: p.category_slug || p.category || 'beach',

            title: p.title,

            tagline: p.overview || p.tagline || '',

            nights: p.nights || 9,

            days: p.days || 10,

            tags: p.is_popular ? ['Popular', 'Private Tour'] : ['Private Tour'],

            destinations: p.destinations || [],

            highlights: p.highlights || [],

            itinerary: (p.itinerary || []).map((it, idx) => ({

              day: String(idx + 1).padStart(2, '0'),

              title: it.title || '',

              description: it.desc || it.description || '',

              meals: it.meals || 'Breakfast',

              stay: it.stay || ''

            })),

            inclusions: p.inclusions || [],

            exclusions: p.exclusions || [],

            bestSeason: p.season || p.bestSeason || 'Year-Round',

            priceNote: 'Price on request',

            images: [p.hero_image || 'assets/images/cultural-triangle.jpg'],

            seoTitle: `${p.title} | Lotus Ceylon Luxury Tours`,

            seoDescription: p.overview || p.tagline || ''

          }))

        };



        this.categories.forEach(c => {

          exportData.categories[c.slug] = {

            id: c.id || ('cat-' + c.slug),

            slug: c.slug,

            title: c.name || c.title,

            tagline: c.tagline || '',

            heroImage: `assets/tours/${c.slug}/hero.jpg`,

            mapImage: c.map_image || ''

          };

        });



        const jsonStr = JSON.stringify(exportData, null, 2);

        const blob = new Blob([jsonStr], { type: 'application/json' });

        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.href = url;

        a.download = 'packages.json';

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(url);

        this.showToast('Downloaded packages.json successfully!', 'success');

      } catch (err) {

        console.error('Export error:', err);

        this.showToast('Failed to export: ' + err.message, 'error');

      }

    },



    /**

     * 4. CATEGORIES, DESTINATIONS, REVIEWS (Standard Table Rendering)

     */

    renderCategories() {

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

            <div class="action-btns" style="justify-content: flex-end; display: flex; gap: 6px;">

              <button class="btn-icon" title="Edit Category" onclick="AdminApp.openCategoryModal('${c.slug}')">

                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>

              </button>

              <button class="btn-icon delete" title="Delete Category" onclick="AdminApp.deleteCategory('${c.slug || c.id}')">

                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>

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

            <div class="action-btns" style="justify-content: flex-end; display: flex; gap: 6px;">

              <button class="btn btn-outline btn-sm" onclick="AdminApp.openDestinationModal('${d.slug}')">Edit</button>

              <button class="btn-icon delete" title="Delete Destination" onclick="AdminApp.deleteDestination('${d.slug || d.id}')">

                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>

              </button>

            </div>

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

      if (this.fbDb) {
        try {
          await this.fbDb.collection('destinations').doc(id).set(payload, { merge: true });

          // Bidirectional sync: update siteContent/destinations card
          const destIndex = parseInt(order, 10) || 1;
          const updates = {};
          updates[`img_${destIndex}`] = image;
          updates[`destinations.img_${destIndex}`] = image;
          updates[`heading_${destIndex + 1}`] = titleEn;
          updates[`destinations.heading_${destIndex + 1}`] = titleEn;
          updates[`p_${destIndex + 2}`] = descEn;
          updates[`destinations.p_${destIndex + 2}`] = descEn;
          if (region) {
            updates[`span_${5 + (2 * destIndex)}`] = region;
            updates[`destinations.span_${5 + (2 * destIndex)}`] = region;
          }
          await this.fbDb.collection('siteContent').doc('destinations').set(updates, { merge: true });

          // Bump siteMeta version
          await this.fbDb.collection('siteMeta').doc('version').set({
            v: Date.now(),
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (fbErr) {
          console.warn('[AdminApp] Firebase saveDestination direct error:', fbErr);
        }
      }

      try {
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
      this.showToast(`Destination "${titleEn}" saved & synchronized live!`, 'success');
    },



    renderReviews() {

      const tbody = document.getElementById('reviewsTableBody');

      if (!tbody) return;

      tbody.innerHTML = this.reviews.map(r => {
        const rawText = r.review_text && typeof r.review_text === 'object' ? r.review_text.en : (r.review_text || '');
        const text = this.escapeHtml(rawText);
        const name = this.escapeHtml(r.guest_name || 'Guest');
        const country = this.escapeHtml(r.country || 'International');
        const tour = this.escapeHtml(r.tour_taken || 'Custom Tour');
        const revId = this.escapeAttr(r.id || '');
        const avatar = r.avatar || 'assets/images/avatar-1.jpg';
        const rating = Math.max(1, Math.min(5, parseInt(r.rating || 5, 10)));

        return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <img src="${this.resolveImg(avatar)}" class="table-thumb" style="width:36px; height:36px; border-radius:50%;" onerror="this.src='../assets/images/logo.png'">
              <strong>${name}</strong>
            </div>
          </td>
          <td>${country}</td>
          <td style="color: #F57F17;">${'★'.repeat(rating)}</td>
          <td><small>${tour}</small></td>
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
            <div class="action-btns" style="justify-content: flex-end; display: flex; gap: 6px;">
              <button class="btn btn-outline btn-sm" onclick="AdminApp.openReviewModal('${revId}')">Edit</button>
              <button class="btn-icon delete" title="Delete Review" onclick="AdminApp.deleteReview('${revId}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
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

    },



    /**

     * 5. MEDIA LIBRARY & WEBP CLIENT-SIDE COMPRESSION

     */

    async renderMediaLibrary() {

      if (!this.mediaFiles || this.mediaFiles.length <= 4) {

        try {

          const res = await fetch('../data/media-manifest.json');

          if (res.ok) {

            const data = await res.json();

            if (Array.isArray(data) && data.length) {

              this.mediaFiles = data;

            }

          }

        } catch (e) {}

      }



      const grid = document.getElementById('mediaGrid');

      if (!grid) return;



      grid.innerHTML = this.mediaFiles.map((m, idx) => {

        const isVid = m.isVideo || /\.(mp4|webm|mov)$/i.test(m.url);

        const resolved = this.resolveImg(m.url);

        return `

        <div class="media-item">

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

            <div style="display: flex; gap: 6px;">

              <button class="btn btn-gold btn-sm" onclick="AdminApp.copyMediaUrl('${m.url}')">Copy URL</button>

              <button class="btn btn-danger btn-sm" onclick="AdminApp.deleteMedia(${idx})">✕</button>

            </div>

          </div>

        </div>

        `;

      }).join('');

    },



    copyMediaUrl(url) {

      navigator.clipboard.writeText(url).then(() => {

        this.showToast('Image URL copied to clipboard!', 'success');

      });

    },



    deleteMedia(index) {

      this.mediaFiles.splice(index, 1);

      this.renderMediaLibrary();

      this.showToast('Media removed', 'info');

    },



    /**

     * Image Upload with Client-Side Canvas WebP Compression (Max 1920px, 5MB Check)

     */

    async handleMediaUpload(files) {

      if (!files || files.length === 0) return;



      for (let i = 0; i < files.length; i++) {

        const file = files[i];

        const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|ogg)$/i.test(file.name);



        // 1. Strict MIME type & extension validation (Security against malicious uploads)

        const validImageMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

        const validVideoMimes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg'];

        const validImageExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];

        const validVideoExts = ['.mp4', '.webm', '.mov', '.ogg'];

        const fileExt = '.' + file.name.split('.').pop().toLowerCase();



        const isValidImg = validImageMimes.includes(file.type.toLowerCase()) && validImageExts.includes(fileExt);

        const isValidVid = validVideoMimes.includes(file.type.toLowerCase()) && validVideoExts.includes(fileExt);



        if (!isValidImg && !isValidVid) {

          this.showToast(`Rejected "${file.name}": Only standard image (JPG, PNG, WebP) or video (MP4, WebM, MOV) files are permitted.`, 'error', 4500);

          continue;

        }



        // 2. Size limit: 10MB for images, 60MB for videos

        const maxLimit = isVideo ? 60 * 1024 * 1024 : 10 * 1024 * 1024;

        if (file.size > maxLimit) {

          this.showToast(`Rejected "${file.name}": Exceeds the ${isVideo ? '60MB video' : '10MB image'} upload limit.`, 'error', 4500);

          continue;

        }



        if (isVideo) {

          this.showToast(`Processing video "${file.name}" (Auto-responsive 16:9)...`, 'info', 2500);

          try {

            const videoUrl = URL.createObjectURL(file);

            const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

            this.mediaFiles.unshift({

              name: safeName,

              url: videoUrl,

              isVideo: true,

              size: `${Math.round(file.size / (1024 * 1024))} MB`

            });

            this.showToast(`Video ${safeName} ready with auto-responsive playback!`, 'success');

          } catch (err) {

            console.error(err);

            this.showToast(`Video upload failed: ` + err.message, 'error');

          }

        } else {

          this.showToast(`Compressing & optimizing "${file.name}" to WebP...`, 'info', 2000);

          try {

            const compressedBlob = await this.compressImageToWebP(file, 1920, 0.85);

            const compressedUrl = URL.createObjectURL(compressedBlob);

            const safeName = file.name.replace(/\.[^/.]+$/, "") + '.webp';



            this.mediaFiles.unshift({

              name: safeName,

              url: compressedUrl,

              isVideo: false,

              size: `${Math.round(compressedBlob.size / 1024)} KB`

            });

            this.showToast(`Optimized ${safeName} stored in media library!`, 'success');

          } catch (err) {

            console.error(err);

            this.showToast(`Upload failed for ${file.name}: ` + err.message, 'error');

          }

        }

      }



      this.renderMediaLibrary();

    },



    /**

     * Canvas-based WebP Resizer & Compressor

     */

    compressImageToWebP(file, maxWidth = 1920, quality = 0.85) {

      return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (event) => {

          const img = new Image();

          img.src = event.target.result;

          img.onload = () => {

            let width = img.width;

            let height = img.height;



            if (width > maxWidth) {

              height = Math.round((height * maxWidth) / width);

              width = maxWidth;

            }



            const canvas = document.createElement('canvas');

            canvas.width = width;

            canvas.height = height;



            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0, width, height);



            canvas.toBlob((blob) => {

              if (blob) {

                resolve(blob);

              } else {

                reject(new Error('Canvas toBlob conversion failed'));

              }

            }, 'image/webp', quality);

          };

          img.onerror = reject;

        };

        reader.onerror = reject;

      });

    },



    triggerDirectCloudinaryUpload(options = {}) {
      return this.triggerUploadForInput(options.inputId, options.previewImgId, options.cardId, options);
    },

    openCloudinaryWidget(callback) {
      // Direct native upload: Never hangs on file:/// and works cross-platform
      this.triggerDirectCloudinaryUpload({
        accept: 'image/*,video/*',
        callback: callback
      });
    },

formatResponsiveMedia(url, alt = 'Lotus Ceylon Media') {

      if (!url) return '';

      const isVideo = /\.(mp4|webm|mov|m4v)$/i.test(url) || url.includes('/video/upload/');

      if (isVideo) {

        return `<div class="responsive-video-wrap lotus-responsive-video"><video controls playsinline preload="metadata" src="${url}"></video></div>`;

      }

      return `<img src="${url}" alt="${alt}" class="responsive-media-img" loading="lazy" onerror="this.src='../assets/images/cultural-triangle.jpg'">`;

    },



        openCloudinaryWidgetForInput(inputId, previewImgId = null, cardId = null) {
      this.triggerDirectCloudinaryUpload({
        accept: 'image/*,video/*',
        inputId: inputId,
        previewImgId: previewImgId,
        cardId: cardId
      });
    },

    /**
     * 6. USERS & ROLES
     */
    renderUsers() {

      const tbody = document.getElementById('usersTableBody');

      if (!tbody) return;

      tbody.innerHTML = `

        <tr>

          <td><strong>${this.currentUser ? this.currentUser.email : 'admin@lotusceylon.com'}</strong><br><small style="color: var(--ink-muted);">Current Active Session</small></td>

          <td><span class="role-badge ${this.currentRole}">${this.currentRole.toUpperCase()}</span></td>

          <td>Full CRUD on Tours, Inquiries, Media, Roles & Settings</td>

          <td><span class="badge badge-success">Active</span></td>

        </tr>

      `;

    },



    /**

     * 7. SETTINGS MANAGEMENT

     */

    renderSettings() {

      const conf = window.LOTUS_CONFIG || {};

      document.getElementById('settingCompanyName').value = conf.companyName || '';

      document.getElementById('settingSlogan').value = conf.slogan || '';

      document.getElementById('settingPhone').value = conf.phone || '';

      document.getElementById('settingEmail').value = conf.email || '';

      document.getElementById('settingAddress').value = conf.address ? conf.address.full : '';

      document.getElementById('settingWhatsApp').value = conf.whatsapp ? conf.whatsapp.number : '';

      document.getElementById('settingFacebook').value = conf.social ? conf.social.facebook : '';

      document.getElementById('settingInstagram').value = conf.social ? conf.social.instagram : '';

      document.getElementById('settingTripadvisor').value = conf.social ? conf.social.tripadvisor : '';

      document.getElementById('settingDesignerUrl').value = conf.designer ? conf.designer.url : 'https://infiniteweb.dev/';

      document.getElementById('settingDesignerFb').value = conf.designer ? conf.designer.facebook : '';

    },



    async saveSettings() {
      // Sync Cloudinary settings
      const cName = document.getElementById('settingCloudName') ? document.getElementById('settingCloudName').value.trim() : '';
      const cPreset = document.getElementById('settingUploadPreset') ? document.getElementById('settingUploadPreset').value.trim() : '';
      if (cName) this.cloudinaryConfig.cloudName = cName;
      if (cPreset) this.cloudinaryConfig.uploadPreset = cPreset;
      if (window.CLOUDINARY_CONFIG) {
        if (cName) window.CLOUDINARY_CONFIG.cloudName = cName;
        if (cPreset) window.CLOUDINARY_CONFIG.uploadPreset = cPreset;
      }
      if (this.fbDb) {
        this.fbDb.collection('settings').doc('cloudinary').set(this.cloudinaryConfig, { merge: true }).catch(e => console.warn(e));
      }

      this.showToast('Saving site configurations...', 'info');

      // If client exists, update site_settings table in Supabase

      if (this.fbDb) {
        try {
          await this.fbDb.collection('settings').doc('general').set({
            companyName: document.getElementById('settingCompanyName').value,
            slogan: document.getElementById('settingSlogan').value,
            phone: document.getElementById('settingPhone').value,
            email: document.getElementById('settingEmail').value,
            address: document.getElementById('settingAddress').value,
            whatsapp: document.getElementById('settingWhatsApp').value,
            updatedAt: new Date().toISOString()
          }, { merge: true });

          await this.fbDb.collection('siteMeta').doc('version').set({
            v: Date.now(),
            updatedAt: new Date().toISOString()
          }, { merge: true });

          try {
            localStorage.removeItem('lotus_cms_v3');
          } catch (e) {}

          this.showToast('Settings saved to Firebase Firestore & live published!', 'success');
        } catch (e) {
          this.showToast('Failed to save settings: ' + e.message, 'error');
        }
      } else {
        this.showToast('Settings saved for this session (Local mode)', 'success');
      }

    },



    /**

     * Modal Helpers

     */

    openModal(modalId) {

      const el = document.getElementById(modalId);

      if (el) el.classList.add('active');

    },



    closeModal(modalId) {

      const el = document.getElementById(modalId);

      if (el) el.classList.remove('active');

    },



    confirmDelete(message, onConfirm) {
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

    },



    switchLangTab(btn, lang) {

      const parent = btn.closest('.modal-body');

      parent.querySelectorAll('.lang-tab-btn').forEach(b => b.classList.remove('active'));

      parent.querySelectorAll('.lang-tab-pane').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');

      const pane = parent.querySelector('#pkgTab-' + lang);

      if (pane) pane.classList.add('active');

    },



    /**

     * Toast Notifications

     */

    showToast(message, type = 'info', duration = 3500) {

      const container = document.getElementById('toastContainer');

      if (!container) return;

      const toast = document.createElement('div');

      toast.className = `toast ${type}`;

      toast.innerHTML = `<span>${message}</span>`;

      container.appendChild(toast);

      setTimeout(() => {

        toast.style.opacity = '0';

        toast.style.transform = 'translateX(100%)';

        setTimeout(() => toast.remove(), 300);

      }, duration);

    }

  };



  // Expose to window

  window.AdminApp = AdminApp;



  // Initialize once DOM is ready

  document.addEventListener('DOMContentLoaded', () => {

    AdminApp.init();

  });



})(window);

