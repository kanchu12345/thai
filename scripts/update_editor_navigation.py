import re

# 1. Update assets/js/cms.js
with open('assets/js/cms.js', 'r', encoding='utf-8') as f:
    cms_code = f.read()

# Enhance destination slug and linkedHref detection in cms.js
target_cms_dest = """          // Check if element is inside or part of a tour package card
          const pkgEl = target.closest('[data-package-slug], [data-slug], [data-tour], .package-card, .tour-card, .tour-grid-card, .curated-card, .beach-package-card, .dest-card');
          let packageSlug = pkgEl ? (pkgEl.getAttribute('data-package-slug') || pkgEl.getAttribute('data-slug') || pkgEl.getAttribute('data-tour')) : null;
          if (!packageSlug) {
            const linkEl = target.closest('a') || (pkgEl ? pkgEl.querySelector('a[href*="/tours/"]') : null);
            if (linkEl && linkEl.getAttribute('href')) {
              const href = linkEl.getAttribute('href');
              const parts = href.split('/').filter(p => p && !p.endsWith('.html') && p !== 'tours');
              if (parts.length > 0) packageSlug = parts[parts.length - 1];
            }
          }"""

replacement_cms_dest = """          // Check if element is inside or part of a tour package card
          const pkgEl = target.closest('[data-package-slug], [data-slug], [data-tour], .package-card, .tour-card, .tour-grid-card, .curated-card, .beach-package-card');
          let packageSlug = pkgEl ? (pkgEl.getAttribute('data-package-slug') || pkgEl.getAttribute('data-slug') || pkgEl.getAttribute('data-tour')) : null;
          if (!packageSlug) {
            const linkEl = target.closest('a[href*="/tours/"]') || (pkgEl ? pkgEl.querySelector('a[href*="/tours/"]') : null);
            if (linkEl && linkEl.getAttribute('href')) {
              const href = linkEl.getAttribute('href');
              const parts = href.split('/').filter(p => p && !p.endsWith('.html') && p !== 'tours');
              if (parts.length > 0) packageSlug = parts[parts.length - 1];
            }
          }

          // Check if element is inside or part of a destination card
          const destEl = target.closest('[data-destination-slug], .dest-card, a[href*="destinations/"]');
          let destinationSlug = destEl ? (destEl.getAttribute('data-destination-slug') || destEl.getAttribute('data-slug')) : null;
          if (!destinationSlug) {
            const dLink = target.closest('a[href*="destinations/"]') || (destEl ? destEl.querySelector('a[href*="destinations/"]') : null);
            if (dLink && dLink.getAttribute('href')) {
              const href = dLink.getAttribute('href');
              const parts = href.split('destinations/')[1].split('/').filter(p => p && !p.endsWith('.html'));
              if (parts.length > 0) destinationSlug = parts[0];
            }
          }

          // Check linked href on anchor or enclosing link
          const enclosingAnchor = target.closest('a') || (target.tagName === 'A' ? target : null) || (pkgEl ? pkgEl.querySelector('a') : null) || (destEl ? destEl.querySelector('a') : null);
          const linkedHref = enclosingAnchor ? enclosingAnchor.getAttribute('href') : null;

          // Double click or Alt/Ctrl click fast navigation
          if (e.altKey || e.ctrlKey || e.metaKey) {
            if (linkedHref && window.parent && window.parent !== window) {
              window.parent.postMessage({ type: 'lotus:navigate-page', href: linkedHref }, '*');
              return;
            }
          }"""

if target_cms_dest in cms_code:
    cms_code = cms_code.replace(target_cms_dest, replacement_cms_dest)
    print("Replaced destination & linkedHref detection in cms.js")
else:
    print("Warning: target_cms_dest not found in cms.js")

# Add destinationSlug and linkedHref to postMessage payload in cms.js
target_postmsg = """              sectionId: sectionId,
              packageSlug: packageSlug || null,
              isWatermark: isWatermark,
              sliderImages: sliderImages"""

replacement_postmsg = """              sectionId: sectionId,
              packageSlug: packageSlug || null,
              destinationSlug: destinationSlug || null,
              linkedHref: linkedHref || null,
              isWatermark: isWatermark,
              sliderImages: sliderImages"""

if target_postmsg in cms_code:
    cms_code = cms_code.replace(target_postmsg, replacement_postmsg)
    print("Added destinationSlug & linkedHref to postMessage in cms.js")

with open('assets/js/cms.js', 'w', encoding='utf-8') as f:
    f.write(cms_code)


# 2. Update admin/js/page-editor.js
with open('admin/js/page-editor.js', 'r', encoding='utf-8') as f:
    pe_code = f.read()

# Add lotus:navigate-page message listener in page-editor.js
target_pe_msg = """      if (event.data.type === 'lotus:element-selected') {
        this.selectElement(event.data);
      }"""

replacement_pe_msg = """      if (event.data.type === 'lotus:element-selected') {
        this.selectElement(event.data);
      }
      if (event.data.type === 'lotus:navigate-page') {
        this.openLinkedHref(event.data.href);
      }"""

if target_pe_msg in pe_code:
    pe_code = pe_code.replace(target_pe_msg, replacement_pe_msg)
    print("Added lotus:navigate-page listener in page-editor.js")

# Add openTourDetailPage, openDestinationPage, openLinkedHref methods before renderElementForm
target_methods_anchor = "renderElementForm(item) {"
new_nav_methods = """openTourDetailPage(slug) {
      if (!slug) return;
      const cleanSlug = slug.toLowerCase().trim();
      const pageSelect = document.getElementById('visualPageDropdown');
      if (pageSelect) {
        for (let i = 0; i < pageSelect.options.length; i++) {
          const opt = pageSelect.options[i];
          if (opt.value.includes(`tourPackages/${cleanSlug}|`)) {
            this.handlePageSelectChange(opt.value);
            return;
          }
        }
      }
      this.openPage(`tourPackages/${cleanSlug}`, `tours/cultural/${cleanSlug}/index.html`);
    },

    openDestinationPage(slug) {
      if (!slug) return;
      const cleanSlug = slug.toLowerCase().trim();
      const pageSelect = document.getElementById('visualPageDropdown');
      if (pageSelect) {
        for (let i = 0; i < pageSelect.options.length; i++) {
          const opt = pageSelect.options[i];
          if (opt.value.includes(`destinations/${cleanSlug}|`)) {
            this.handlePageSelectChange(opt.value);
            return;
          }
        }
      }
      this.openPage(`destinations/${cleanSlug}`, `destinations/${cleanSlug}/index.html`);
    },

    openLinkedHref(href) {
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      let clean = href.replace(/\\.\\.\\//g, '').replace(/^\\//, '').split('?')[0].split('#')[0];
      if (clean.endsWith('/')) clean += 'index.html';
      if (!clean.endsWith('.html') && clean.includes('/')) clean += '/index.html';

      const pageSelect = document.getElementById('visualPageDropdown');
      if (pageSelect) {
        for (let i = 0; i < pageSelect.options.length; i++) {
          const opt = pageSelect.options[i];
          const [docK, fileP] = opt.value.split('|');
          if (fileP === clean || fileP.endsWith(clean) || clean.endsWith(fileP)) {
            this.handlePageSelectChange(opt.value);
            return;
          }
        }
      }
    },

    renderElementForm(item) {"""

if target_methods_anchor in pe_code and "openTourDetailPage(slug)" not in pe_code:
    pe_code = pe_code.replace(target_methods_anchor, new_nav_methods)
    print("Injected navigation methods into page-editor.js")

# In renderElementForm, add action cards for tour package, destination, and linked href
target_pkg_card = """      if (pkgSlug) {
        html += `
          <div style="background: linear-gradient(135deg, #FFFBEB, #FEF3C7); border: 1px solid #FCD34D; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
            <div style="font-weight: 700; color: #92400E; font-size: 0.88rem; display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span>dY" Tour Package: ${this.escapeHtml(pkgSlug)}</span>
            </div>
            <p style="font-size: 0.78rem; color: #78350F; margin: 0 0 8px 0;">Edit full price, days, route, day-by-day itinerary, highlights, and gallery images.</p>
            <button type="button" class="btn btn-gold btn-sm btn-block" onclick="AdminApp.openPackageModal('${this.escapeAttr(pkgSlug)}')" style="font-weight: 700;">o?,? Edit Full Tour Package</button>
          </div>
        `;
      }"""

replacement_action_cards = """      // 1. Tour Package Action Card
      if (pkgSlug) {
        html += `
          <div style="background: linear-gradient(135deg, #EFF6FF, #DBEAFE); border: 1px solid #93C5FD; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
            <div style="font-weight: 700; color: #1E40AF; font-size: 0.88rem; display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
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

if target_pkg_card in pe_code:
    pe_code = pe_code.replace(target_pkg_card, replacement_action_cards)
    print("Replaced action cards in page-editor.js")
else:
    print("Warning: target_pkg_card not found in page-editor.js")

with open('admin/js/page-editor.js', 'w', encoding='utf-8') as f:
    f.write(pe_code)

print("Saved assets/js/cms.js and admin/js/page-editor.js successfully!")
