import os
import re

SVG_ICONS = {
    'all': '<svg class="submenu-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    'cultural': '<svg class="submenu-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V9M19 21V9M9 21V9M15 21V9M2 9l10-6 10 6"/></svg>',
    'buddhist': '<svg class="submenu-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></svg>',
    'wildlife': '<svg class="submenu-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 11c-2.5 0-4 1.8-4 4 0 3 4 7 4 7s4-4 4-7c0-2.2-1.5-4-4-4z"/><circle cx="7" cy="8" r="2"/><circle cx="17" cy="8" r="2"/><circle cx="12" cy="5" r="2"/></svg>',
    'beach': '<svg class="submenu-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0 5.5-1.5 8 0M2 16c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0M12 2a4 4 0 014 4c0 3-4 5-4 5s-4-2-4-5a4 4 0 014-4z"/></svg>',
    'hill-country': '<svg class="submenu-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 20l7-12 5 8 6-10 3 14H3z"/></svg>',
    'ayurvedic': '<svg class="submenu-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8M8 12h8"/></svg>',
    'honeymoon': '<svg class="submenu-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
    'family': '<svg class="submenu-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    'adventure': '<svg class="submenu-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    'ramayana': '<svg class="submenu-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
}

def generate_submenu(rel_prefix):
    return f'''          <div class="mobile-accordion-submenu" id="mobileToursSubmenu">
            <a href="{rel_prefix}sri-lanka-tours.html" class="submenu-link">{SVG_ICONS['all']}<strong>All Tour Packages</strong></a>
            <a href="{rel_prefix}tours/cultural/" class="submenu-link">{SVG_ICONS['cultural']}Cultural Heritage</a>
            <a href="{rel_prefix}tours/buddhist-heritage/" class="submenu-link">{SVG_ICONS['buddhist']}Buddhist Pilgrimages</a>
            <a href="{rel_prefix}tours/wildlife/" class="submenu-link">{SVG_ICONS['wildlife']}Wildlife Safaris</a>
            <a href="{rel_prefix}tours/beach/" class="submenu-link">{SVG_ICONS['beach']}Pristine Beaches</a>
            <a href="{rel_prefix}tours/hill-country/" class="submenu-link">{SVG_ICONS['hill-country']}Hill Country &amp; Tea</a>
            <a href="{rel_prefix}tours/ayurvedic/" class="submenu-link">{SVG_ICONS['ayurvedic']}Ayurvedic Healing</a>
            <a href="{rel_prefix}tours/honeymoon/" class="submenu-link">{SVG_ICONS['honeymoon']}Honeymoon Sanctuaries</a>
            <a href="{rel_prefix}tours/family/" class="submenu-link">{SVG_ICONS['family']}Family Journeys</a>
            <a href="{rel_prefix}tours/adventure/" class="submenu-link">{SVG_ICONS['adventure']}Active Adventure</a>
            <a href="{rel_prefix}tours/ramayana/" class="submenu-link">{SVG_ICONS['ramayana']}Ramayana Trail</a>
          </div>'''

count = 0
for root, dirs, files in os.walk('.'):
    if any(s in root for s in ['.git', 'node_modules', '.gemini', 'tools', 'admin']): continue
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as fp:
                html = fp.read()
            
            orig_html = html
            rel_depth = (filepath.replace('\\', '/').count('/') - 1)
            rel_prefix = '../' * rel_depth if rel_depth > 0 else './'

            # 1. Close button aria-label
            html = re.sub(r'<button\s+type="button"\s+class="mobile-nav-close"\s+id="mobileNavClose"[^>]*>', 
                          r'<button type="button" class="mobile-nav-close" id="mobileNavClose" aria-label="Close navigation menu">&times;</button>', 
                          html)

            # 2. Hamburger button attributes
            html = re.sub(r'<button\s+type="button"\s+class="walkers-ham"\s+id="mobileHamToggle"[^>]*>',
                          r'<button type="button" class="walkers-ham" id="mobileHamToggle" aria-label="Open mobile navigation menu" aria-expanded="false" aria-controls="mobileNavFullscreen">',
                          html)

            # 3. Replace mobileToursSubmenu with SVG icons
            if 'id="mobileToursSubmenu"' in html:
                pattern = r'<div class="mobile-accordion-submenu" id="mobileToursSubmenu">.*?</div>'
                new_sub = generate_submenu(rel_prefix)
                html = re.sub(pattern, new_sub, html, flags=re.DOTALL)

            # 4. Mobile nav header brand styling (Dark Navy & Gold)
            mobile_header_brand = f'''<div class="mobile-nav-header">
      <a href="{rel_prefix}index.html" class="header-brand">
        <img src="{rel_prefix}logo.png?v=20261021_step1" alt="Lotus Ceylon Official Emblem" class="header-brand-logo" width="38" height="38">
        <span class="header-brand-name"><span class="brand-name-lotus">Lotus</span> <span class="brand-name-ceylon">Ceylon</span></span>
      </a>
      <button type="button" class="mobile-nav-close" id="mobileNavClose" aria-label="Close navigation menu">&times;</button>
    </div>'''
            
            pattern_hdr = r'<div class="mobile-nav-header">.*?<button[^>]*id="mobileNavClose"[^>]*>.*?</button>\s*</div>'
            html = re.sub(pattern_hdr, mobile_header_brand, html, flags=re.DOTALL)

            if html != orig_html:
                with open(filepath, 'w', encoding='utf-8') as fp:
                    fp.write(html)
                count += 1

print(f"Updated mobile menu and accessibility attributes across {count} HTML pages!")
