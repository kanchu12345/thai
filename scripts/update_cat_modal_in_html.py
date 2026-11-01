import os

new_markup = """<!-- CATEGORY EDIT MODAL -->
<div class="modal-overlay" id="categoryModal">
<div class="modal-dialog" id="categoryModalDialog" style="max-width: 680px; width: 95vw; transition: max-width 0.25s ease;">
<div class="modal-header">
<h3 id="categoryModalTitle">Edit Category</h3>
<button class="modal-close" onclick="AdminApp.closeModal('categoryModal')">×</button>
</div>
<!-- Category Modal Tabs: General Details vs Comparison Table Matrix -->
<div style="padding: 0 24px; border-bottom: 2px solid var(--mist); background: #FAFBFD;">
  <div class="lang-tabs" style="margin-bottom: 0; border-bottom: none; gap: 8px;">
    <button type="button" class="lang-tab-btn active" id="catTabBtn-general" onclick="AdminApp.switchCatModalTab('general')">📋 General Details</button>
    <button type="button" class="lang-tab-btn" id="catTabBtn-comparison" onclick="AdminApp.switchCatModalTab('comparison')">📊 Comparison Table Matrix</button>
  </div>
</div>
<div class="modal-body" style="max-height: 80vh; overflow-y: auto; padding: 20px 24px;">
<form id="categoryForm" onsubmit="AdminApp.saveCategory(event)">
<input id="catId" type="hidden"/>

<!-- TAB 1: GENERAL DETAILS -->
<div id="catTabPane-general">
<div class="form-group">
<label>Category Title (EN) *</label>
<input class="form-control" id="catTitle" placeholder="Cultural Triangle & Heritage" required="" type="text"/>
</div>
<div class="form-group">
<label>Category Title (Chinese)</label>
<input class="form-control" id="catTitleZh" placeholder="文化三角与古代文明" type="text"/>
</div>
<div class="form-row">
<div class="form-group" style="flex: 1;">
<label>Slug *</label>
<input class="form-control" id="catSlug" placeholder="cultural" required="" type="text"/>
</div>
<div class="form-group" style="flex: 1;">
<label>Display Sort Order</label>
<input class="form-control" id="catOrder" max="99" min="1" type="number" value="1"/>
</div>
</div>
<div class="form-group">
<label>Tagline</label>
<input class="form-control" id="catTagline" placeholder="SACRED KINGDOMS • UNESCO LIVING HERITAGE" type="text"/>
</div>
<div class="form-group">
<label>Description & Overview</label>
<textarea class="form-control" id="catDescription" placeholder="Overview of this travel category..." rows="3"></textarea>
</div>
<div class="form-group">
<label>Category Hero Image</label>
<div style="display: flex; gap: 8px; flex-wrap: wrap;">
<input class="form-control" id="catHeroImage" oninput="AdminApp.updateImagePreview('catHeroImage', 'catHeroPreview', 'catHeroPreviewCard')" placeholder="assets/tours/cultural/hero.jpg" style="flex: 1; min-width: 200px;" type="text"/>
<button class="btn btn-secondary" onclick="AdminApp.openCloudinaryWidgetForInput('catHeroImage', 'catHeroPreview', 'catHeroPreviewCard')" type="button">☁️ Cloudinary</button>
<button class="btn btn-outline" onclick="AdminApp.openImagePicker('catHeroImage', 'catHeroPreview', 'catHeroPreviewCard')" type="button">Browse Media</button>
</div>
<div class="image-preview-card" id="catHeroPreviewCard" style="display: none;">
<div class="image-preview-thumb-wrap">
<img alt="Category Hero Preview" class="image-preview-thumb" id="catHeroPreview" onerror="if(window.AdminApp)AdminApp.handlePreviewError(this)" src=""/>
</div>
<div class="image-preview-info">
<span class="image-preview-title">Category Hero Image</span>
<span class="image-preview-url" id="catHeroPreviewUrl"></span>
</div>
<div class="image-preview-actions">
<button class="btn btn-sm btn-outline" onclick="AdminApp.clearImageField('catHeroImage', 'catHeroPreview', 'catHeroPreviewCard')" type="button">Remove</button>
</div>
</div>
</div>
<div class="form-group" style="margin-top: 15px;">
<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
<input checked="" id="catPublished" type="checkbox"/> Published on Website
</label>
</div>
</div>

<!-- TAB 2: COMPARISON TABLE MATRIX -->
<div id="catTabPane-comparison" style="display: none;">
  <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
    <div class="form-group" style="margin-bottom: 12px;">
      <label style="font-weight: 600;">Comparison Table Title *</label>
      <input type="text" id="compTableTitle" class="form-control" placeholder="Comparison of Sri Lanka Hill Country Tour Packages by Destination and Highlights" />
    </div>
    <div class="form-group" style="margin-bottom: 0;">
      <label style="font-weight: 600;">Subtitle / Note</label>
      <input type="text" id="compTableNote" class="form-control" placeholder="Itineraries are indicative and fully customisable." />
    </div>
  </div>

  <!-- Package Columns Manager -->
  <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <label style="font-weight: 700; margin: 0; font-size: 0.92rem; color: #0F172A;">Included Packages (Columns)</label>
      <span style="font-size: 0.8rem; color: #64748B;">Check to show column; use ◀ ▶ to reorder</span>
    </div>
    <div id="compColumnsWrap" style="display: flex; flex-wrap: wrap; gap: 10px;">
      <!-- Populated dynamically by AdminApp.renderCompColumnsManager() -->
    </div>
  </div>

  <!-- Action Toolbar & Validation -->
  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 14px;">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <button type="button" class="btn btn-sm btn-primary" onclick="AdminApp.addCompGroup()">+ Add Destination Group</button>
      <button type="button" class="btn btn-sm btn-secondary" onclick="AdminApp.autoGenerateCompFromRoutes()">⚡ Auto-generate from Routes</button>
      <button type="button" class="btn btn-sm btn-outline" onclick="AdminApp.toggleCompLivePreview()">👁️ Toggle Live Preview</button>
    </div>
    <div style="display: flex; gap: 6px;">
      <button type="button" class="btn btn-sm btn-outline" onclick="AdminApp.tickAllCompSights()">✓ Tick All Sights</button>
      <button type="button" class="btn btn-sm btn-outline" onclick="AdminApp.clearAllCompTicks()">✕ Clear All</button>
    </div>
  </div>

  <!-- Non-blocking validation warning alerts -->
  <div id="compValidationBox" style="display: none; margin-bottom: 16px; padding: 12px 16px; border-radius: 8px; font-size: 0.84rem;"></div>

  <!-- Live Preview Container (Collapsible) -->
  <div id="compLivePreviewContainer" style="display: none; margin-bottom: 20px; border: 2px dashed #CBD5E1; border-radius: 8px; padding: 16px; background: #FAFBFD;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="font-weight: 700; font-size: 0.88rem; color: #002B49;">Live Table Preview</span>
      <div style="display: flex; gap: 6px;">
        <button type="button" class="btn btn-xs btn-outline active" id="btnCompPrevDesktop" onclick="AdminApp.setCompPreviewViewport('desktop')">Desktop</button>
        <button type="button" class="btn btn-xs btn-outline" id="btnCompPrevMobile" onclick="AdminApp.setCompPreviewViewport('mobile')">Mobile (390px)</button>
      </div>
    </div>
    <div id="compLivePreviewWrapper" style="overflow-x: auto; background: #FFFFFF; border-radius: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">
      <!-- Dynamic render will mount here -->
    </div>
  </div>

  <!-- Matrix Editor Grid Container -->
  <div style="overflow-x: auto; border: 1px solid #E2E8F0; border-radius: 8px; background: #FFFFFF; max-height: 480px; overflow-y: auto;">
    <div id="compMatrixGridWrap">
      <!-- Populated dynamically by AdminApp.renderCompMatrixGrid() -->
    </div>
  </div>
</div>

<div class="modal-footer" style="padding: 16px 0 0; margin-top: 16px; display: flex; justify-content: space-between; align-items: center;">
<span style="font-size: 0.82rem; color: #64748B;">All changes sync to public website and packages automatically upon saving.</span>
<div style="display: flex; gap: 10px;">
<button class="btn btn-outline" onclick="AdminApp.closeModal('categoryModal')" type="button">Cancel</button>
<button class="btn btn-primary" type="submit">Save Category & Comparison</button>
</div>
</div>
</form>
</div>
</div>
</div>
"""

with open('admin/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '<!-- CATEGORY EDIT MODAL -->'
end_marker = '<!-- DESTINATION EDIT MODAL -->'

if start_marker in content and end_marker in content:
    pre = content[:content.find(start_marker)]
    post = content[content.find(end_marker):]
    updated = pre + new_markup + post
    with open('admin/index.html', 'w', encoding='utf-8') as f:
        f.write(updated)
    print("Successfully replaced category modal in admin/index.html!")
else:
    print("Markers not found!")
