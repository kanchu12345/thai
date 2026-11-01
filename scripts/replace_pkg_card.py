import re

with open('admin/js/page-editor.js', 'r', encoding='utf-8') as f:
    pe_code = f.read()

replacement_action_cards = """      // 1. Tour Package Action Card
      if (pkgSlug) {
        html += `
          <div style="background: linear-gradient(135deg, #EFF6FF, #DBEAFE); border: 1px solid #93C5FD; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
            <div style="font-weight: 700; color: #1E40AF; font-size: 0.88rem; display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span>📦 Tour Package: ${this.escapeHtml(pkgSlug)}</span>
            </div>
            <p style="font-size: 0.78rem; color: #1E3A8A; margin: 0 0 10px 0;">Directly open this tour's standalone page or edit its full fields.</p>
            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn btn-primary btn-sm" style="flex: 1;" onclick="PageEditor.openTourDetailPage('${this.escapeAttr(pkgSlug)}')">🚀 Open & Edit Page</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="AdminApp.openPackageModal('${this.escapeAttr(pkgSlug)}')">📝 Edit in Manager</button>
            </div>
          </div>
        `;
      }

      // 2. Destination Action Card
      const destSlug = item.destinationSlug || null;
      if (destSlug) {
        html += `
          <div style="background: linear-gradient(135deg, #F0FDF4, #DCFCE7); border: 1px solid #86EFAC; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
            <div style="font-weight: 700; color: #166534; font-size: 0.88rem; margin-bottom: 4px;">
              <span>📍 Destination: ${this.escapeHtml(destSlug)}</span>
            </div>
            <p style="font-size: 0.78rem; color: #14532D; margin: 0 0 8px 0;">Edit lead text, sights badges, essence narrative, and tailor-made box.</p>
            <button type="button" class="btn btn-primary btn-sm btn-block" onclick="PageEditor.openDestinationPage('${this.escapeAttr(destSlug)}')">🚀 Open & Edit Destination Page</button>
          </div>
        `;
      }

      // 3. General Linked Href Card (if clicked an anchor)
      if (item.linkedHref && !pkgSlug && !destSlug && !item.linkedHref.startsWith('#')) {
        html += `
          <div style="margin-bottom: 14px; background: #FAFBFD; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px;">
            <div style="font-size: 0.78rem; color: #64748B; margin-bottom: 6px;">Target URL: <code style="color: #002B49;">${this.escapeHtml(item.linkedHref)}</code></div>
            <button type="button" class="btn btn-outline btn-sm btn-block" onclick="PageEditor.openLinkedHref('${this.escapeAttr(item.linkedHref)}')">↗ Switch Editor to Linked Page</button>
          </div>
        `;
      }"""

# Replace `if (pkgSlug) { ... }` block
pattern = r'if\s*\(pkgSlug\)\s*\{\s*html\s*\+=\s*`[^`]+`;\s*\}'
if re.search(pattern, pe_code):
    pe_code = re.sub(pattern, replacement_action_cards, pe_code, count=1)
    with open('admin/js/page-editor.js', 'w', encoding='utf-8') as f:
        f.write(pe_code)
    print("Successfully replaced pkgSlug card with multi-page navigation cards in page-editor.js!")
else:
    print("Pattern not found!")
