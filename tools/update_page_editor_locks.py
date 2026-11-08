import os

file_path = r'admin\js\page-editor.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = """      // Special Success Stories Card Inspector
      if (item.attrType === 'success-stories' || item.key === 'home.success_stories_card') {
        body.innerHTML = this.renderSuccessStoriesInspector(item);
        return;
      }"""

replacement = """      // Protected Design Credit Lock (Part 4)
      if (item.isCreditLocked || (item.currentVal && item.currentVal.includes('Infinite Design')) || item.key === 'siteGlobal.branding.developerUrl') {
        body.innerHTML = `
          <div style="padding: 24px 18px; text-align: center;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: #EFF6FF; border: 2px solid #BFDBFE; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #1D4ED8;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
            </div>
            <h4 style="color: #002B49; font-size: 1.05rem; font-weight: 700; margin-bottom: 8px;">Design Attribution Protected</h4>
            <p style="font-size: 0.85rem; color: #475569; line-height: 1.5; margin-bottom: 16px;">
              <strong>"Website Designed &amp; Developed by Infinite Design"</strong><br>
              This developer attribution credit is permanently locked in code and cannot be edited, hidden, or deleted from the admin panel.
            </p>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; font-size: 0.8rem; color: #64748B; text-align: left;">
              <div>• Single source of truth in code (locked constant)</div>
              <div>• Automated tamper protection active on all public pages</div>
              <div>• Non-removable by admin or page editor</div>
            </div>
          </div>
        `;
        return;
      }

      // Linked Dynamic Content Lock (Part 2)
      if (item.isLinked) {
        body.innerHTML = `
          <div style="padding: 24px 18px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
              <div style="width: 44px; height: 44px; border-radius: 8px; background: #FEF3C7; color: #92400E; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
              </div>
              <div>
                <h4 style="color: #002B49; font-size: 1rem; font-weight: 700; margin: 0;">Linked Dynamic Content</h4>
                <div style="font-size: 0.78rem; color: #64748B;">Source: ${this.escapeHtml(item.linkedSource || 'Source Catalog')}</div>
              </div>
            </div>

            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; margin-bottom: 18px;">
              <p style="font-size: 0.84rem; color: #334155; line-height: 1.5; margin: 0 0 10px 0;">
                This item is part of a centrally managed collection. To maintain data consistency across all pages, linked items cannot be edited directly inside the visual page preview.
              </p>
              <div style="font-size: 0.8rem; font-weight: 600; color: #002B49;">
                Edit this item in: <span style="color: #D4AF37;">${this.escapeHtml(item.linkedSource || 'Source Manager')}</span>
              </div>
            </div>

            <button type="button" class="btn btn-primary btn-block" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 16px; font-weight: 700;" onclick="AdminApp.navigateToTab('${item.targetTab || 'home'}', '${item.targetSubtab || ''}'); ${item.modalOpenFn || ''}">
              <span>Edit this in ${this.escapeHtml(item.linkedSource || 'Source Manager')} &rarr;</span>
            </button>
          </div>
        `;
        return;
      }

      // Special Success Stories Card Inspector
      if (item.attrType === 'success-stories' || item.key === 'home.success_stories_card') {
        body.innerHTML = this.renderSuccessStoriesInspector(item);
        return;
      }"""

normalized = content.replace('\r\n', '\n')
if target in normalized:
    new_content = normalized.replace(target, replacement, 1)
    if '\r\n' in content:
        new_content = new_content.replace('\n', '\r\n')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: Updated admin/js/page-editor.js")
else:
    print("ERROR: Target not found in admin/js/page-editor.js")
