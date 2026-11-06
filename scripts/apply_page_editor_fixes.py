import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/js/page-editor.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Fix broken image URL at line 1070
old_img = "defaultUrl: 'assets/images/colonial/galle-fort-lighthouse-1.webp',"
new_img = "defaultUrl: 'assets/images/cultural/galle-fort-5.webp',"
assert old_img in code, "old_img not found"
code = code.replace(old_img, new_img)

# 2. Fix cache invalidation
old_cache = "localStorage.removeItem('lotus_cms_v3');"
new_cache = "localStorage.removeItem('lotus_cms_v5');\n            localStorage.removeItem('lotus_cms_v3');"
assert old_cache in code, "old_cache not found"
code = code.replace(old_cache, new_cache)

# 3. Add resetCurrentPage, openFormEditor, saveActiveForm, saveActiveBlogPost
methods_to_add = '''
    resetCurrentPage() {
      if (!confirm('Are you sure you want to reset this page and discard all unsaved edits?')) {
        return;
      }
      this.currentFieldValues = {};
      this.hasUnsavedChanges = false;
      this.markSaved();
      const iframe = document.getElementById('visualCmsIframe');
      if (iframe) {
        const curSrc = iframe.src;
        iframe.src = 'about:blank';
        setTimeout(() => { iframe.src = curSrc; }, 60);
      }
      this.fetchPageDoc(this.activePageKey).then(() => {
        this.renderEmptyState();
        if (window.AdminApp) {
          window.AdminApp.showToast('Page reset to saved state.', 'info');
        }
      });
    },

    openFormEditor(formType = 'inquiry_detailed') {
      this.activeFormType = formType;
      const titleEl = document.getElementById('formEditorActiveTitle');
      const emailEl = document.getElementById('formRecipientEmail');
      const subjEl = document.getElementById('formEmailSubject');
      const honeypotEl = document.getElementById('formHoneypotEnabled');
      const destEl = document.getElementById('formDestinationsList');
      const stylesEl = document.getElementById('formTravelStylesList');

      if (window.AdminApp) {
        window.AdminApp.switchSection('forms-editor');
      }

      let saved = null;
      try {
        const raw = localStorage.getItem('lotus_form_config_' + formType);
        if (raw) saved = JSON.parse(raw);
      } catch (e) {}

      if (formType === 'inquiry_quick') {
        if (titleEl) titleEl.textContent = 'Quick Consultation & Tour Inquire Form (All Pages Quick Modal)';
        if (emailEl) emailEl.value = (saved && saved.recipientEmail) || 'paliforbuddhism@gmail.com';
        if (subjEl) subjEl.value = (saved && saved.emailSubject) || 'New Tour Consultation Inquiry - Lotus Ceylon';
        if (honeypotEl) honeypotEl.value = saved ? String(saved.honeypotEnabled) : 'true';
        if (destEl) destEl.value = (saved && saved.destinations) || 'Cultural Triangle, Hill Country, Wildlife Safari, Southern Coast, Jaffna & North';
        if (stylesEl) stylesEl.value = (saved && saved.travelStyles) || 'Luxury Heritage, Wildlife Safari, Cultural Immersion, Romantic Honeymoon, Ayurveda Wellness';
      } else {
        if (titleEl) titleEl.textContent = 'Bespoke Journey Inquiry Form (inquiry-detailed.html)';
        if (emailEl) emailEl.value = (saved && saved.recipientEmail) || 'paliforbuddhism@gmail.com';
        if (subjEl) subjEl.value = (saved && saved.emailSubject) || 'We received your bespoke Sri Lanka journey inquiry - Lotus Ceylon';
        if (honeypotEl) honeypotEl.value = saved ? String(saved.honeypotEnabled) : 'true';
        if (destEl) destEl.value = (saved && saved.destinations) || 'Cultural Triangle (Sigiriya/Polonnaruwa), Hill Country (Kandy/Nuwara Eliya/Ella), Wildlife and Safari (Yala/Wilpattu), Southern Coast (Galle/Mirissa/Tangalle), East Coast (Trincomalee/Pasikudah), Jaffna and Northern Province';
        if (stylesEl) stylesEl.value = (saved && saved.travelStyles) || 'Luxury Boutique and Heritage, Wildlife Safari and Nature, Cultural Immersion and Ancient Cities, Romantic Honeymoon, Wellness and Ayurveda Retreat, Scenic Train and Tea Country';
      }
    },

    async saveActiveForm() {
      const formType = this.activeFormType || 'inquiry_detailed';
      const emailEl = document.getElementById('formRecipientEmail');
      const subjEl = document.getElementById('formEmailSubject');
      const honeypotEl = document.getElementById('formHoneypotEnabled');
      const destEl = document.getElementById('formDestinationsList');
      const stylesEl = document.getElementById('formTravelStylesList');

      const config = {
        formType,
        recipientEmail: emailEl ? emailEl.value.trim() : 'paliforbuddhism@gmail.com',
        emailSubject: subjEl ? subjEl.value.trim() : '',
        honeypotEnabled: honeypotEl ? (honeypotEl.value === 'true') : true,
        destinations: destEl ? destEl.value.trim() : '',
        travelStyles: stylesEl ? stylesEl.value.trim() : '',
        updatedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('lotus_form_config_' + formType, JSON.stringify(config));
      } catch (e) {}

      if (window.AdminApp && window.AdminApp.fbDb) {
        try {
          await window.AdminApp.fbDb.collection('forms').doc(formType).set(config, { merge: true });
        } catch (err) {
          console.warn('[PageEditor] Firestore save form error:', err);
        }
      }

      if (window.AdminApp) {
        window.AdminApp.showToast(`Form configuration for "${formType === 'inquiry_quick' ? 'Quick Consultation' : 'Bespoke Inquiry'}" saved successfully!`, 'success');
      }
    },

    saveActiveBlogPost() {
      if (window.AdminApp && typeof window.AdminApp.saveBlogModal === 'function') {
        window.AdminApp.saveBlogModal();
      }
    },
'''

# 4. Expanded renderGlobalInspector
old_render_global = '''    renderGlobalInspector(docKey, label) {
      const panel = document.getElementById('inspectorBody');
      if (!panel) return;

      if (docKey === 'siteGlobal/branding') {
        const logoSrc = (this.activeDocData && this.activeDocData['siteGlobal.branding.logo']) || 'assets/images/brand/logo-header.png';
        const heroVideoSrc = (this.activeDocData && this.activeDocData['home.hero_video']) || 'assets/videos/sigiriya-aerial.mp4';
        const heroBgSrc = (this.activeDocData && this.activeDocData['home.hero_bg']) || 'assets/images/home/hero-sigiriya-aerial-1.webp';

        panel.innerHTML = `
          <div class="inspector-card">
            <h4 style="font-size: 1.05rem; margin-bottom: 8px;">🌸 Branding & Global Media</h4>
            <p style="color: #64748B; font-size: 0.82rem; margin-bottom: 16px;">Configure brand logos, emblems, hero video and global background assets across all pages.</p>
            
            <div class="inspector-field-group">
              <label>Header Brand Logo / Emblem</label>
              <img src="${this.resolvePreviewUrl(logoSrc)}" class="inspector-thumb-preview" id="preview_branding_logo" style="max-height: 80px; object-fit: contain; background: #0B132B; padding: 6px; border-radius: 4px;"/>
              <div style="display: flex; gap: 8px; margin-top: 8px;">
                <input type="text" class="form-control" id="fieldInput_siteGlobal.branding.logo" value="${this.escapeAttr(logoSrc)}" oninput="PageEditor.handleLiveInput('siteGlobal.branding.logo', this.value, 'image')"/>
                <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('siteGlobal.branding.logo')">📁 Browse</button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForField('siteGlobal.branding.logo')">☁️ Upload</button>
              </div>
            </div>

            <div class="inspector-field-group" style="margin-top: 16px;">
              <label>Home Hero Background Video (MP4 / WebM)</label>
              <video src="${this.resolvePreviewUrl(heroVideoSrc)}" class="inspector-video-preview" controls muted autoplay loop style="max-height: 140px; width: 100%; border-radius: 6px;"></video>
              <div style="display: flex; gap: 8px; margin-top: 8px;">
                <input type="text" class="form-control" id="fieldInput_home.hero_video" value="${this.escapeAttr(heroVideoSrc)}" oninput="PageEditor.handleLiveInput('home.hero_video', this.value, 'video')"/>
                <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('home.hero_video')">📁 Browse</button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForField('home.hero_video', 'video')">🎬 Upload Video</button>
              </div>
            </div>

            <div class="inspector-field-group" style="margin-top: 16px;">
              <label>Home Hero Background Image (Fallback / Poster)</label>
              <img src="${this.resolvePreviewUrl(heroBgSrc)}" class="inspector-thumb-preview" id="preview_hero_bg" style="max-height: 120px;"/>
              <div style="display: flex; gap: 8px; margin-top: 8px;">
                <input type="text" class="form-control" id="fieldInput_home.hero_bg" value="${this.escapeAttr(heroBgSrc)}" oninput="PageEditor.handleLiveInput('home.hero_bg', this.value, 'bg-image')"/>
                <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('home.hero_bg')">📁 Browse</button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForField('home.hero_bg')">☁️ Upload</button>
              </div>
            </div>
          </div>
        `;
      } else {
        panel.innerHTML = `
          <div class="inspector-card">
            <h4>${label}</h4>
            <p style="color: #64748B; font-size: 0.85rem;">Global document components are editable via the live preview on the left. Click any element on the page with a dashed outline to edit its text, link, or media.</p>
          </div>
        `;
      }
    },'''

new_render_global = '''    renderGlobalInspector(docKey, label) {
      const panel = document.getElementById('inspectorBody');
      if (!panel) return;

      if (docKey === 'siteGlobal/branding') {
        const logoSrc = (this.activeDocData && this.activeDocData['siteGlobal.branding.logo']) || 'assets/images/brand/logo-header.png';
        const heroVideoSrc = (this.activeDocData && this.activeDocData['home.hero_video']) || 'assets/videos/sigiriya-aerial.mp4';
        const heroBgSrc = (this.activeDocData && this.activeDocData['home.hero_bg']) || 'assets/images/home/hero-sigiriya-aerial-1.webp';

        panel.innerHTML = `
          <div class="inspector-card">
            <h4 style="font-size: 1.05rem; margin-bottom: 8px;">🌸 Branding & Global Media</h4>
            <p style="color: #64748B; font-size: 0.82rem; margin-bottom: 16px;">Configure brand logos, emblems, hero video and global background assets across all pages.</p>
            
            <div class="inspector-field-group">
              <label>Header Brand Logo / Emblem</label>
              <img src="${this.resolvePreviewUrl(logoSrc)}" class="inspector-thumb-preview" id="preview_branding_logo" style="max-height: 80px; object-fit: contain; background: #0B132B; padding: 6px; border-radius: 4px;"/>
              <div style="display: flex; gap: 8px; margin-top: 8px;">
                <input type="text" class="form-control" id="fieldInput_siteGlobal.branding.logo" value="${this.escapeAttr(logoSrc)}" oninput="PageEditor.handleLiveInput('siteGlobal.branding.logo', this.value, 'image')"/>
                <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('siteGlobal.branding.logo')">📁 Browse</button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForField('siteGlobal.branding.logo')">☁️ Upload</button>
              </div>
            </div>

            <div class="inspector-field-group" style="margin-top: 16px;">
              <label>Home Hero Background Video (MP4 / WebM)</label>
              <video src="${this.resolvePreviewUrl(heroVideoSrc)}" class="inspector-video-preview" controls muted autoplay loop style="max-height: 140px; width: 100%; border-radius: 6px;"></video>
              <div style="display: flex; gap: 8px; margin-top: 8px;">
                <input type="text" class="form-control" id="fieldInput_home.hero_video" value="${this.escapeAttr(heroVideoSrc)}" oninput="PageEditor.handleLiveInput('home.hero_video', this.value, 'video')"/>
                <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('home.hero_video')">📁 Browse</button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForField('home.hero_video', 'video')">🎬 Upload Video</button>
              </div>
            </div>

            <div class="inspector-field-group" style="margin-top: 16px;">
              <label>Home Hero Background Image (Fallback / Poster)</label>
              <img src="${this.resolvePreviewUrl(heroBgSrc)}" class="inspector-thumb-preview" id="preview_hero_bg" style="max-height: 120px;"/>
              <div style="display: flex; gap: 8px; margin-top: 8px;">
                <input type="text" class="form-control" id="fieldInput_home.hero_bg" value="${this.escapeAttr(heroBgSrc)}" oninput="PageEditor.handleLiveInput('home.hero_bg', this.value, 'bg-image')"/>
                <button type="button" class="btn btn-outline btn-sm" onclick="PageEditor.openMediaPicker('home.hero_bg')">📁 Browse</button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="PageEditor.openCloudinaryForField('home.hero_bg')">☁️ Upload</button>
              </div>
            </div>
          </div>
        `;
      } else if (docKey === 'siteGlobal/header') {
        const phone = (this.activeDocData && this.activeDocData['siteGlobal.header.phone']) || '+94 77 722 0070';
        const topbarText = (this.activeDocData && this.activeDocData['siteGlobal.header.topbar_text']) || 'Official Luxury Concierge for Sri Lanka & Ceylon Travel';
        const waText = (this.activeDocData && this.activeDocData['siteGlobal.header.whatsapp_label']) || 'Chat on WhatsApp';
        const waNum = (this.activeDocData && this.activeDocData['siteGlobal.header.whatsapp_num']) || '+94 77 722 0070';
        const inqBtn = (this.activeDocData && this.activeDocData['siteGlobal.header.inquire_btn']) || 'Inquire Now';

        panel.innerHTML = `
          <div class="inspector-card">
            <h4 style="font-size: 1.05rem; margin-bottom: 8px;">🔝 Global Header & Topbar</h4>
            <p style="color: #64748B; font-size: 0.82rem; margin-bottom: 16px;">Customize the top announcement bar, telephone, WhatsApp button, and Inquire call-to-action.</p>
            
            <div class="inspector-field-group">
              <label>Topbar Announcement / Slogan</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.header.topbar_text" value="${this.escapeAttr(topbarText)}" oninput="PageEditor.handleLiveInput('siteGlobal.header.topbar_text', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>Direct Telephone Hotline</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.header.phone" value="${this.escapeAttr(phone)}" oninput="PageEditor.handleLiveInput('siteGlobal.header.phone', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>WhatsApp Button Label</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.header.whatsapp_label" value="${this.escapeAttr(waText)}" oninput="PageEditor.handleLiveInput('siteGlobal.header.whatsapp_label', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>WhatsApp Target Number</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.header.whatsapp_num" value="${this.escapeAttr(waNum)}" oninput="PageEditor.handleLiveInput('siteGlobal.header.whatsapp_num', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>Inquire Button Text</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.header.inquire_btn" value="${this.escapeAttr(inqBtn)}" oninput="PageEditor.handleLiveInput('siteGlobal.header.inquire_btn', this.value, 'text')"/>
            </div>
          </div>
        `;
      } else if (docKey === 'siteGlobal/footer') {
        const about = (this.activeDocData && this.activeDocData['siteGlobal.footer.about_text']) || 'Lotus Ceylon International Tours & Services (Pvt) Ltd is a registered inbound tour operator curating ultra-luxury, culturally authentic Sri Lanka journeys.';
        const copyright = (this.activeDocData && this.activeDocData['siteGlobal.footer.copyright']) || '© 2026 Lotus Ceylon International Tours & Services (Pvt) Ltd. All rights reserved.';
        const license = (this.activeDocData && this.activeDocData['siteGlobal.footer.license_note']) || 'SLTDA Approved Destination Management Company (PV 00374439)';

        panel.innerHTML = `
          <div class="inspector-card">
            <h4 style="font-size: 1.05rem; margin-bottom: 8px;">🔻 Global Footer & Legal</h4>
            <p style="color: #64748B; font-size: 0.82rem; margin-bottom: 16px;">Configure brand description, copyright notices, and regulatory disclosures appearing on all footers.</p>
            
            <div class="inspector-field-group">
              <label>Footer Brand Summary</label>
              <textarea class="form-control" rows="3" id="fieldInput_siteGlobal.footer.about_text" oninput="PageEditor.handleLiveInput('siteGlobal.footer.about_text', this.value, 'text')">${this.escapeHtml(about)}</textarea>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>Copyright Statement</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.footer.copyright" value="${this.escapeAttr(copyright)}" oninput="PageEditor.handleLiveInput('siteGlobal.footer.copyright', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>SLTDA License & Certification Badge</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.footer.license_note" value="${this.escapeAttr(license)}" oninput="PageEditor.handleLiveInput('siteGlobal.footer.license_note', this.value, 'text')"/>
            </div>
          </div>
        `;
      } else if (docKey === 'siteGlobal/contact') {
        const email = (this.activeDocData && this.activeDocData['siteGlobal.contact.email']) || 'paliforbuddhism@gmail.com';
        const phone = (this.activeDocData && this.activeDocData['siteGlobal.contact.phone']) || '+94 77 722 0070';
        const address = (this.activeDocData && this.activeDocData['siteGlobal.contact.address']) || 'Colombo & Kandy, Sri Lanka';
        const wechat = (this.activeDocData && this.activeDocData['siteGlobal.contact.wechat']) || 'FGUTaiwan90';
        const line = (this.activeDocData && this.activeDocData['siteGlobal.contact.line']) || 'dpbs2024';

        panel.innerHTML = `
          <div class="inspector-card">
            <h4 style="font-size: 1.05rem; margin-bottom: 8px;">📞 Concierge & Direct Contact Channels</h4>
            <p style="color: #64748B; font-size: 0.82rem; margin-bottom: 16px;">Manage official inquiry email, hotline, messaging IDs (WeChat/LINE), and office addresses.</p>
            
            <div class="inspector-field-group">
              <label>Official Concierge Email</label>
              <input type="email" class="form-control" id="fieldInput_siteGlobal.contact.email" value="${this.escapeAttr(email)}" oninput="PageEditor.handleLiveInput('siteGlobal.contact.email', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>Concierge Phone / WhatsApp</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.contact.phone" value="${this.escapeAttr(phone)}" oninput="PageEditor.handleLiveInput('siteGlobal.contact.phone', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>Physical Address</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.contact.address" value="${this.escapeAttr(address)}" oninput="PageEditor.handleLiveInput('siteGlobal.contact.address', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>WeChat ID (China & Asian Guests)</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.contact.wechat" value="${this.escapeAttr(wechat)}" oninput="PageEditor.handleLiveInput('siteGlobal.contact.wechat', this.value, 'text')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>LINE ID (Taiwan & East Asia)</label>
              <input type="text" class="form-control" id="fieldInput_siteGlobal.contact.line" value="${this.escapeAttr(line)}" oninput="PageEditor.handleLiveInput('siteGlobal.contact.line', this.value, 'text')"/>
            </div>
          </div>
        `;
      } else if (docKey === 'siteGlobal/social') {
        const fb = (this.activeDocData && this.activeDocData['siteGlobal.social.facebook']) || 'https://facebook.com/lotusceylon';
        const ig = (this.activeDocData && this.activeDocData['siteGlobal.social.instagram']) || 'https://instagram.com/lotusceylon';
        const yt = (this.activeDocData && this.activeDocData['siteGlobal.social.youtube']) || 'https://youtube.com/@lotusceylontours';
        const ta = (this.activeDocData && this.activeDocData['siteGlobal.social.tripadvisor']) || 'https://tripadvisor.com';

        panel.innerHTML = `
          <div class="inspector-card">
            <h4 style="font-size: 1.05rem; margin-bottom: 8px;">🌐 Social Media Channels</h4>
            <p style="color: #64748B; font-size: 0.82rem; margin-bottom: 16px;">Global URLs for Facebook, Instagram, YouTube, and TripAdvisor linked across the entire site.</p>
            
            <div class="inspector-field-group">
              <label>Facebook Page URL</label>
              <input type="url" class="form-control" id="fieldInput_siteGlobal.social.facebook" value="${this.escapeAttr(fb)}" oninput="PageEditor.handleLiveInput('siteGlobal.social.facebook', this.value, 'link')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>Instagram Profile URL</label>
              <input type="url" class="form-control" id="fieldInput_siteGlobal.social.instagram" value="${this.escapeAttr(ig)}" oninput="PageEditor.handleLiveInput('siteGlobal.social.instagram', this.value, 'link')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>YouTube Channel URL</label>
              <input type="url" class="form-control" id="fieldInput_siteGlobal.social.youtube" value="${this.escapeAttr(yt)}" oninput="PageEditor.handleLiveInput('siteGlobal.social.youtube', this.value, 'link')"/>
            </div>

            <div class="inspector-field-group" style="margin-top: 14px;">
              <label>TripAdvisor Listing URL</label>
              <input type="url" class="form-control" id="fieldInput_siteGlobal.social.tripadvisor" value="${this.escapeAttr(ta)}" oninput="PageEditor.handleLiveInput('siteGlobal.social.tripadvisor', this.value, 'link')"/>
            </div>
          </div>
        `;
      } else {
        panel.innerHTML = `
          <div class="inspector-card">
            <h4>${this.escapeHtml(label || docKey)}</h4>
            <p style="color: #64748B; font-size: 0.85rem;">Global document components are editable via the live preview on the left. Click any element on the page with a dashed outline to edit its text, link, or media.</p>
          </div>
        `;
      }
    },'''

assert old_render_global in code, "old_render_global not found"
code = code.replace(old_render_global, new_render_global)

# Insert the new methods before escapeHtml
old_escape = "    escapeHtml(str) {"
assert old_escape in code, "old_escape not found"
code = code.replace(old_escape, methods_to_add + "\n" + old_escape)

with open('admin/js/page-editor.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("All page-editor.js updates applied successfully!")
