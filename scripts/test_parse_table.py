import os
import re
import json
from bs4 import BeautifulSoup

tours_dir = 'tours'
categories = [d for d in os.listdir(tours_dir) if os.path.isdir(os.path.join(tours_dir, d))]

results = {}

for cat in sorted(categories):
    html_file = os.path.join(tours_dir, cat, 'index.html')
    if not os.path.exists(html_file):
        continue
    with open(html_file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table', class_='lotus-comparison-table')
    if not table:
        print(f"[{cat}] No table found")
        continue

    # Title & Note
    caption = table.find('caption')
    caption_text = caption.get_text(strip=True) if caption else f"Comparison of Sri Lanka {cat.replace('-', ' ').title()} Tour Packages"
    
    # Check intro header before table
    intro_header = table.find_parent('section')
    title = caption_text
    note = "Itineraries are indicative and fully customisable."
    if intro_header:
        h2 = intro_header.find(class_='comparison-title')
        if h2:
            title = h2.get_text(strip=True)
        p = intro_header.find(class_='comparison-subtitle')
        if p:
            note = p.get_text(strip=True)
            
    # Headers / Columns
    thead = table.find('thead')
    packages = []
    if thead:
        headers = thead.find_all('th')
        for th in headers[1:]: # skip first col (Destinations & Key Sights)
            link = th.find('a')
            if link:
                href = link.get('href', '')
                slug = href.split('/')[0].replace('.html', '').replace('index', '')
                if not slug:
                    slug = link.get_text(strip=True).lower().replace(' ', '-').replace('&', 'and')
                pkg_name = link.get_text(strip=True)
            else:
                pkg_name = th.get_text(strip=True)
                slug = pkg_name.lower().replace(' ', '-').replace('&', 'and')
            packages.append({
                'name': pkg_name,
                'slug': slug
            })

    # Rows: groups and sights
    tbody = table.find('tbody')
    groups = []
    curr_group = None
    group_order = 0
    sight_order = 0

    if tbody:
        rows = tbody.find_all('tr')
        for r in rows:
            classes = r.get('class', [])
            if 'destination-row' in classes:
                th = r.find('th') or r.find('td')
                dest_name = th.get_text(strip=True) if th else 'Unknown'
                group_order += 1
                sight_order = 0
                dest_id = dest_name.lower().replace(' ', '-').replace('&', 'and')
                
                # Check ticks at group level
                tds = r.find_all('td')
                manual_ticks = {}
                for idx, td in enumerate(tds):
                    is_checked = 'check-cell' in td.get('class', []) or '✓' in td.get_text() or '✔' in td.get_text() or '[x]' in td.get_text()
                    if idx < len(packages):
                        manual_ticks[packages[idx]['slug']] = is_checked

                curr_group = {
                    'id': f"grp_{dest_id}",
                    'destinationId': dest_id,
                    'label': dest_name,
                    'order': group_order,
                    'manualTicks': manual_ticks,
                    'sights': []
                }
                groups.append(curr_group)
            elif 'activity-subrow' in classes:
                tds = r.find_all('td')
                if not tds:
                    continue
                sight_name = tds[0].get_text(strip=True)
                sight_order += 1
                sight_id = re.sub(r'[^a-z0-9]+', '_', sight_name.lower()).strip('_')
                
                included_in = []
                for idx, td in enumerate(tds[1:]):
                    is_checked = 'check-cell' in td.get('class', []) or '✓' in td.get_text() or '✔' in td.get_text() or '[x]' in td.get_text()
                    if is_checked and idx < len(packages):
                        included_in.append(packages[idx]['slug'])
                
                sight_item = {
                    'id': f"sight_{sight_id[:30]}",
                    'label': sight_name,
                    'order': sight_order,
                    'includedIn': included_in
                }
                if curr_group:
                    curr_group['sights'].append(sight_item)
                else:
                    # Fallback group if sights appear before group
                    group_order += 1
                    curr_group = {
                        'id': 'grp_general',
                        'destinationId': 'general',
                        'label': 'Highlights & Activities',
                        'order': group_order,
                        'manualTicks': {},
                        'sights': [sight_item]
                    }
                    groups.append(curr_group)

    results[cat] = {
        'category': cat,
        'title': title,
        'note': note,
        'packages': [p['slug'] for p in packages],
        'packageDetails': packages,
        'groups': groups
    }
    total_sights = sum(len(g['sights']) for g in groups)
    print(f"[{cat}] Parsed {len(packages)} packages, {len(groups)} destination groups, {total_sights} sights.")

with open('data/comparison_tables.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print("\nSaved all parsed tables to data/comparison_tables.json")
