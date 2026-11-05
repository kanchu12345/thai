import os
import re
from bs4 import BeautifulSoup

# Collect all HTML files to audit
all_pages = []

# 1. Root and top-level pages
for f in os.listdir('.'):
    if f.endswith('.html') and f != '404.html':
        all_pages.append(f)

# 2. Category pages and Tour detail pages
for root, dirs, files in os.walk('tours'):
    for f in files:
        if f.endswith('.html'):
            rel = os.path.relpath(os.path.join(root, f), '.').replace('\\', '/')
            all_pages.append(rel)

# 3. Destinations pages
for root, dirs, files in os.walk('destinations'):
    for f in files:
        if f.endswith('.html'):
            rel = os.path.relpath(os.path.join(root, f), '.').replace('\\', '/')
            all_pages.append(rel)

# 4. Blog pages
for root, dirs, files in os.walk('blog'):
    for f in files:
        if f.endswith('.html'):
            rel = os.path.relpath(os.path.join(root, f), '.').replace('\\', '/')
            all_pages.append(rel)

all_pages = sorted(list(set(all_pages)))

print(f"Total pages identified for Phase 0 Audit: {len(all_pages)}")

audit_data = []
total_all_elements = 0
total_all_bound = 0
total_all_hardcoded = 0

def is_cms_bound(tag):
    if not tag:
        return False
    # Check current tag attributes
    attrs = ['data-cms', 'data-cms-html', 'data-cms-img', 'data-cms-bg', 'data-cms-video', 'data-cms-link', 'data-cms-list', 'data-cms-alt']
    for a in attrs:
        if tag.has_attr(a):
            return True
    return False

for page_path in all_pages:
    if not os.path.exists(page_path):
        continue

    try:
        with open(page_path, 'r', encoding='utf-8') as f:
            html = f.read()
    except Exception as e:
        print(f"Error reading {page_path}: {e}")
        continue

    soup = BeautifulSoup(html, 'html.parser')

    page_stats = {
        'page': page_path,
        'headings': {'total': 0, 'bound': 0, 'hardcoded': [], 'type': 'Heading'},
        'paragraphs': {'total': 0, 'bound': 0, 'hardcoded': [], 'type': 'Paragraph'},
        'list_items': {'total': 0, 'bound': 0, 'hardcoded': [], 'type': 'List Item'},
        'buttons': {'total': 0, 'bound': 0, 'hardcoded': [], 'type': 'Button'},
        'links': {'total': 0, 'bound': 0, 'hardcoded': [], 'type': 'Link'},
        'images': {'total': 0, 'bound': 0, 'hardcoded': [], 'type': 'Image'},
        'tables': {'total': 0, 'bound': 0, 'hardcoded': [], 'type': 'Table Cell'},
        'faqs': {'total': 0, 'bound': 0, 'hardcoded': [], 'type': 'FAQ Item'},
        'stats': {'total': 0, 'bound': 0, 'hardcoded': [], 'type': 'Stat / Counter'},
        'badges': {'total': 0, 'bound': 0, 'hardcoded': [], 'type': 'Badge / Tag'},
        'meta_tags': {'total': 0, 'bound': 0, 'hardcoded': [], 'type': 'Meta Tag'},
        'json_ld': {'total': 0, 'bound': 0, 'hardcoded': [], 'type': 'JSON-LD'}
    }

    # 1. Headings (h1 - h6)
    for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
        text = h.get_text(strip=True)
        if not text:
            continue
        page_stats['headings']['total'] += 1
        if is_cms_bound(h) or any(is_cms_bound(child) for child in h.find_all()):
            page_stats['headings']['bound'] += 1
        else:
            page_stats['headings']['hardcoded'].append(f"<{h.name}> {text[:70]}")

    # 2. Paragraphs (p)
    for p in soup.find_all('p'):
        text = p.get_text(strip=True)
        if not text:
            continue
        page_stats['paragraphs']['total'] += 1
        if is_cms_bound(p) or any(is_cms_bound(child) for child in p.find_all()):
            page_stats['paragraphs']['bound'] += 1
        else:
            page_stats['paragraphs']['hardcoded'].append(f"{text[:70]}...")

    # 3. List Items (li)
    for li in soup.find_all('li'):
        text = li.get_text(strip=True)
        if not text:
            continue
        page_stats['list_items']['total'] += 1
        if is_cms_bound(li) or any(is_cms_bound(child) for child in li.find_all()):
            page_stats['list_items']['bound'] += 1
        else:
            page_stats['list_items']['hardcoded'].append(f"{text[:60]}")

    # 4. Buttons (button and a.btn)
    for btn in soup.find_all(['button']):
        text = btn.get_text(strip=True) or btn.get('aria-label', '') or btn.get('title', '')
        if not text:
            continue
        page_stats['buttons']['total'] += 1
        if is_cms_bound(btn) or any(is_cms_bound(c) for c in btn.find_all()):
            page_stats['buttons']['bound'] += 1
        else:
            page_stats['buttons']['hardcoded'].append(f"{text[:50]}")

    # 5. Links (a with href)
    for a in soup.find_all('a', href=True):
        href = a.get('href', '')
        text = a.get_text(strip=True) or a.get('aria-label', '')
        if not href or href == '#' or href.startswith('javascript:'):
            continue
        page_stats['links']['total'] += 1
        if is_cms_bound(a) or any(is_cms_bound(c) for c in a.find_all()) or a.has_attr('data-cms-link'):
            page_stats['links']['bound'] += 1
        else:
            page_stats['links']['hardcoded'].append(f"href='{href}' [{text[:30]}]")

    # 6. Images (img and [data-cms-bg])
    for img in soup.find_all('img'):
        src = img.get('src', '')
        alt = img.get('alt', '')
        page_stats['images']['total'] += 1
        if is_cms_bound(img):
            page_stats['images']['bound'] += 1
        else:
            page_stats['images']['hardcoded'].append(f"src='{src}' alt='{alt[:30]}'")

    # Background images
    for bg_el in soup.find_all(lambda t: t.has_attr('style') and 'background-image' in t['style']):
        page_stats['images']['total'] += 1
        if is_cms_bound(bg_el):
            page_stats['images']['bound'] += 1
        else:
            bg_style = bg_el['style']
            m = re.search(r'url\([\'"]?([^\'")]+)[\'"]?\)', bg_style)
            bg_url = m.group(1) if m else bg_style[:40]
            page_stats['images']['hardcoded'].append(f"bg='{bg_url}' on <{bg_el.name}>")

    # 7. Tables (th, td)
    for cell in soup.find_all(['th', 'td']):
        text = cell.get_text(strip=True)
        if not text:
            continue
        page_stats['tables']['total'] += 1
        if is_cms_bound(cell) or any(is_cms_bound(c) for c in cell.find_all()):
            page_stats['tables']['bound'] += 1
        else:
            page_stats['tables']['hardcoded'].append(f"<{cell.name}> {text[:40]}")

    # 8. FAQs
    for faq in soup.find_all(['details', '.faq-item', '.faq-question', '.accordion-item']):
        page_stats['faqs']['total'] += 1
        if is_cms_bound(faq):
            page_stats['faqs']['bound'] += 1
        else:
            q_text = faq.get_text(strip=True)[:50]
            page_stats['faqs']['hardcoded'].append(f"FAQ: {q_text}")

    # 9. Stats / Counters
    for stat in soup.find_all(class_=re.compile(r'counter|stat-number|stat-value|trust-stat|metric-num')):
        text = stat.get_text(strip=True)
        page_stats['stats']['total'] += 1
        if is_cms_bound(stat):
            page_stats['stats']['bound'] += 1
        else:
            page_stats['stats']['hardcoded'].append(f"Stat: {text[:30]}")

    # 10. Badges / Tags
    for badge in soup.find_all(class_=re.compile(r'badge|pill|tag-badge|duration-pill|category-badge|sacred-badge')):
        text = badge.get_text(strip=True)
        if not text:
            continue
        page_stats['badges']['total'] += 1
        if is_cms_bound(badge):
            page_stats['badges']['bound'] += 1
        else:
            page_stats['badges']['hardcoded'].append(f"Badge: {text[:40]}")

    # 11. Meta tags (title, description, keywords, canonical, og:*, twitter:*)
    title_tag = soup.find('title')
    if title_tag:
        page_stats['meta_tags']['total'] += 1
        if is_cms_bound(title_tag):
            page_stats['meta_tags']['bound'] += 1
        else:
            page_stats['meta_tags']['hardcoded'].append(f"<title> {title_tag.get_text(strip=True)[:50]}")

    for meta in soup.find_all('meta'):
        name = meta.get('name', '') or meta.get('property', '')
        content = meta.get('content', '')
        if name in ['description', 'keywords'] or name.startswith('og:') or name.startswith('twitter:'):
            page_stats['meta_tags']['total'] += 1
            if is_cms_bound(meta):
                page_stats['meta_tags']['bound'] += 1
            else:
                page_stats['meta_tags']['hardcoded'].append(f"meta[{name}]='{content[:40]}'")

    canonical = soup.find('link', rel='canonical')
    if canonical:
        page_stats['meta_tags']['total'] += 1
        if is_cms_bound(canonical):
            page_stats['meta_tags']['bound'] += 1
        else:
            page_stats['meta_tags']['hardcoded'].append(f"canonical='{canonical.get('href', '')}'")

    # 12. JSON-LD
    for script in soup.find_all('script', type='application/ld+json'):
        page_stats['json_ld']['total'] += 1
        if is_cms_bound(script) or script.has_attr('data-cms-jsonld'):
            page_stats['json_ld']['bound'] += 1
        else:
            page_stats['json_ld']['hardcoded'].append("JSON-LD Schema Script block")

    # Page totals
    page_total = sum(page_stats[k]['total'] for k in page_stats if isinstance(page_stats[k], dict))
    page_bound = sum(page_stats[k]['bound'] for k in page_stats if isinstance(page_stats[k], dict))
    page_hardcoded = page_total - page_bound
    coverage_pct = (page_bound / page_total * 100) if page_total > 0 else 100.0

    page_summary = {
        'page': page_path,
        'total': page_total,
        'bound': page_bound,
        'hardcoded': page_hardcoded,
        'pct': coverage_pct,
        'categories': page_stats
    }
    audit_data.append(page_summary)

    total_all_elements += page_total
    total_all_bound += page_bound
    total_all_hardcoded += page_hardcoded

# Sort audit_data by hardcoded count descending (pages with most work needed first)
audit_data.sort(key=lambda x: x['hardcoded'], reverse=True)

# Generate ADMIN_COVERAGE_REPORT.md
overall_coverage_pct = (total_all_bound / total_all_elements * 100) if total_all_elements > 0 else 0

md = []
md.append("# Phase 0: Master Admin Content & CMS Coverage Audit Report")
md.append("")
md.append("> **Target Objective**: 100% of visible content, links, images, SEO fields, tables, badges, and numbers on every public page must be editable, deletable, and uploadable from the admin panel with 0 hard-coded visible elements remaining.")
md.append("")
md.append("## Executive Summary")
md.append("")
md.append(f"- **Total Pages Audited**: `{len(audit_data)}` pages across the public repository.")
md.append(f"- **Total Elements Audited**: `{total_all_elements:,}` elements (headings, text, links, images, table cells, FAQs, badges, counters, meta tags, and schema).")
md.append(f"- **Currently Bound to Firestore / CMS**: `{total_all_bound:,}` elements (`{overall_coverage_pct:.1f}%`).")
md.append(f"- **Hard-Coded Elements to be Migrated**: `{total_all_hardcoded:,}` elements (`{100 - overall_coverage_pct:.1f}%`).")
md.append("")
md.append("| Metric | Count | Percentage |")
md.append("| :--- | :--- | :--- |")
md.append(f"| **Total Public Pages** | `{len(audit_data)}` | `100.0%` |")
md.append(f"| **Total Tracked Elements** | `{total_all_elements:,}` | `100.0%` |")
md.append(f"| **CMS Bound Elements** | `{total_all_bound:,}` | `{overall_coverage_pct:.1f}%` |")
md.append(f"| **Hard-Coded Elements (Phase 1-3 Scope)** | `{total_all_hardcoded:,}` | `{(100 - overall_coverage_pct):.1f}%` |")
md.append("")
md.append("---")
md.append("")
md.append("## Coverage by Page Category")
md.append("")
md.append("| Category | Page Count | Total Elements | CMS Bound | Hard-Coded | Coverage % |")
md.append("| :--- | :--- | :--- | :--- | :--- | :--- |")

# Category breakdowns
cat_groups = {
    'Category Pages (tours/*/index.html)': [p for p in audit_data if p['page'].startswith('tours/') and p['page'].count('/') == 2 and p['page'].endswith('/index.html')],
    'Individual Tour Detail Pages (29 Tours)': [p for p in audit_data if p['page'].startswith('tours/') and p['page'].count('/') == 3],
    'Destination Pages (24 Destinations)': [p for p in audit_data if p['page'].startswith('destinations/')],
    'Core Site Pages (Home, About, Contact, etc.)': [p for p in audit_data if not '/' in p['page'] and not p['page'].startswith('category') and not p['page'].startswith('tours-') and not p['page'].endswith('-tours.html')],
    'Legacy / Redirect Stubs (*-tours.html)': [p for p in audit_data if p['page'].endswith('-tours.html') or p['page'] in ['category.html', 'tours.html', 'sri-lanka-tours.html', 'tour-package-detail.html', 'tours/detail.html']],
    'Blog Pages (4 Articles + Index)': [p for p in audit_data if p['page'].startswith('blog')]
}

for cat_name, pages in cat_groups.items():
    c_tot = sum(p['total'] for p in pages)
    c_bnd = sum(p['bound'] for p in pages)
    c_hc = sum(p['hardcoded'] for p in pages)
    c_pct = (c_bnd / c_tot * 100) if c_tot > 0 else 0
    md.append(f"| **{cat_name}** | `{len(pages)}` | `{c_tot:,}` | `{c_bnd:,}` | `{c_hc:,}` | `{c_pct:.1f}%` |")

md.append("")
md.append("---")
md.append("")
md.append("## Per-Page Comprehensive Audit Table")
md.append("")
md.append("| Page Path | Total Elements | CMS Bound | Hard-Coded | Coverage % | Status |")
md.append("| :--- | :--- | :--- | :--- | :--- | :--- |")

for p in audit_data:
    status = "[HIGH] High (>75%)" if p['pct'] >= 75 else ("[MED] Partial (40-75%)" if p['pct'] >= 40 else "[LOW] Low (<40%)")
    md.append(f"| [`{p['page']}`]({p['page']}) | `{p['total']}` | `{p['bound']}` | `{p['hardcoded']}` | `{p['pct']:.1f}%` | {status} |")

md.append("")
md.append("---")
md.append("")
md.append("## Detailed Hard-Coded Elements Breakdown (Phase 1-3 Migration Targets)")
md.append("")

for p in audit_data:
    if p['hardcoded'] == 0:
        continue
    md.append(f"### [`{p['page']}`]({p['page']})")
    md.append(f"- **Coverage**: `{p['bound']} / {p['total']}` elements bound (`{p['pct']:.1f}%`) | **Hard-Coded**: `{p['hardcoded']}` elements")
    md.append("")
    cats = p['categories']
    for k, cat in cats.items():
        if isinstance(cat, dict) and cat['hardcoded']:
            md.append(f"**{cat['type']} ({len(cat['hardcoded'])} hard-coded):**")
            for item in cat['hardcoded'][:8]:
                clean_item = item.replace('\n', ' ').strip()
                md.append(f"- `{clean_item}`")
            if len(cat['hardcoded']) > 8:
                md.append(f"- *... and {len(cat['hardcoded']) - 8} more*")
            md.append("")
    md.append("")

with open('ADMIN_COVERAGE_REPORT.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(md))

print(f"ADMIN_COVERAGE_REPORT.md generated successfully! Total pages: {len(audit_data)}, Total elements: {total_all_elements}, Hardcoded: {total_all_hardcoded}")
