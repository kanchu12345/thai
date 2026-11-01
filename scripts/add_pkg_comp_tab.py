with open('admin/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target = """<!-- Multi-language tabs -->
<div class="lang-tabs">
<button class="lang-tab-btn active" onclick="AdminApp.switchLangTab(this, 'en')" type="button">English (EN)</button>
<button class="lang-tab-btn" onclick="AdminApp.switchLangTab(this, 'zh')" type="button">"""

replacement = """<!-- Multi-language tabs -->
<div class="lang-tabs">
<button class="lang-tab-btn active" id="pkgTabBtn-en" onclick="AdminApp.switchPkgLangTab(this, 'en')" type="button">English (EN)</button>
<button class="lang-tab-btn" id="pkgTabBtn-zh" onclick="AdminApp.switchPkgLangTab(this, 'zh')" type="button">中文 (Chinese)</button>
<button class="lang-tab-btn" id="pkgTabBtn-comp" onclick="AdminApp.switchPkgTab('comparison')" type="button">📊 Category Comparison Ticks</button>
</div>
<div class="lang-tab-pane" id="pkgTab-comparison" style="display: none; padding: 12px 0;">
  <div style="background: #FAFBFD; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 16px; margin-bottom: 16px;">
    <h4 style="margin: 0 0 6px; font-size: 0.95rem; color: #002B49;">Category Comparison Highlights & Sights</h4>
    <p style="margin: 0; font-size: 0.82rem; color: #64748B;">Tick which sights and destinations are included in this tour. Changes sync to the category table automatically.</p>
  </div>
  <div id="pkgComparisonTicksWrap" style="max-height: 420px; overflow-y: auto; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; background: #FFFFFF;">
    <!-- Rendered dynamically by AdminApp.renderPackageComparisonTicks() -->
  </div>
</div>"""

# Let's find where `<div class="lang-tabs">` starts inside `#packageForm`
pkg_form_idx = html.find('<form id="packageForm">')
if pkg_form_idx != -1:
    tabs_start = html.find('<!-- Multi-language tabs -->', pkg_form_idx)
    zh_btn_end = html.find('</button>\n</div>', tabs_start) + len('</button>\n</div>')
    old_tabs_block = html[tabs_start:zh_btn_end]
    html = html[:tabs_start] + replacement + html[zh_btn_end:]
    with open('admin/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully added comparison tab to packageModal in admin/index.html!")
else:
    print("Could not find packageForm!")
