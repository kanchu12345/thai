import os
import re
import json
from bs4 import BeautifulSoup

tours_dir = 'tours'
categories = [d for d in os.listdir(tours_dir) if os.path.isdir(os.path.join(tours_dir, d))]

with open('data/packages.json', 'r', encoding='utf-8') as f:
    packages_db = json.load(f)

pkg_list = packages_db.get('packages', [])
pkg_by_slug = {p.get('slug'): p for p in pkg_list}

# Ensure every package has route destination ids
for p in pkg_list:
    dests = p.get('destinations', [])
    route_ids = []
    if dests:
        for d in dests:
            d_name = d.get('name', '') if isinstance(d, dict) else str(d)
            d_id = re.sub(r'[^a-z0-9]+', '-', d_name.lower()).strip('-')
            if d_id and d_id not in route_ids:
                route_ids.append(d_id)
    elif p.get('itinerary'):
        for it in p.get('itinerary'):
            title = it.get('title', '')
            for loc in ['negombo', 'anuradhapura', 'mihintale', 'ritigala', 'polonnaruwa', 'sigiriya', 'dambulla', 'kandy', 'nuwara-eliya', 'knuckles', 'colombo', 'kelaniya']:
                if loc.replace('-', ' ') in title.lower() and loc not in route_ids:
                    route_ids.append(loc)
    p['route'] = route_ids

results = {}

for cat in sorted(categories):
    html_file = os.path.join(tours_dir, cat, 'index.html')
    if not os.path.exists(html_file):
        continue
    with open(html_file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table', class_='lotus-comparison-table')

    cat_pkgs = [p for p in pkg_list if p.get('category') == cat]
    cat_pkg_slugs = [p.get('slug') for p in cat_pkgs]

    if not table and cat == 'buddhist-heritage':
        # Custom rich comparison data for buddhist-heritage
        title = "Comparison of Sri Lanka Buddhist Heritage Tour Packages by Sacred Sanctuary and Highlights"
        note = "All monastic and temple pilgrimages are privately guided and fully customisable."
        
        buddhist_groups = [
            {
                "id": "grp_negombo",
                "destinationId": "negombo",
                "label": "Negombo Seaboard",
                "order": 1,
                "manualTicks": {"the-sacred-bodhi-ancient-kingdoms": True, "the-sacred-tooth-monastic-sanctuaries": True, "forest-hermitages-mindful-ceylon": True},
                "sights": [
                    {"id": "sight_neg_seaboard", "label": "Seaboard arrival & restful acclimation", "order": 1, "includedIn": ["the-sacred-bodhi-ancient-kingdoms", "the-sacred-tooth-monastic-sanctuaries", "forest-hermitages-mindful-ceylon"]},
                    {"id": "sight_neg_lagoon", "label": "Coastal coconut groves & tranquil lagoons", "order": 2, "includedIn": ["the-sacred-bodhi-ancient-kingdoms", "forest-hermitages-mindful-ceylon"]}
                ]
            },
            {
                "id": "grp_anuradhapura",
                "destinationId": "anuradhapura",
                "label": "Anuradhapura Sacred City",
                "order": 2,
                "manualTicks": {"the-sacred-bodhi-ancient-kingdoms": True, "the-sacred-tooth-monastic-sanctuaries": True, "forest-hermitages-mindful-ceylon": True},
                "sights": [
                    {"id": "sight_anur_bodhi", "label": "Jaya Sri Maha Bodhi ancient sapling veneration", "order": 1, "includedIn": ["the-sacred-bodhi-ancient-kingdoms", "the-sacred-tooth-monastic-sanctuaries", "forest-hermitages-mindful-ceylon"]},
                    {"id": "sight_anur_ruwanweli", "label": "Ruwanwelisaya stupa circumambulation & evening puja", "order": 2, "includedIn": ["the-sacred-bodhi-ancient-kingdoms", "the-sacred-tooth-monastic-sanctuaries"]},
                    {"id": "sight_anur_atamasthana", "label": "The Eight Sacred Atamasthana sanctuaries", "order": 3, "includedIn": ["the-sacred-bodhi-ancient-kingdoms", "the-sacred-tooth-monastic-sanctuaries"]},
                    {"id": "sight_anur_abhayagiri", "label": "Abhayagiri & Jetavanaramaya colossal monastic ruins", "order": 4, "includedIn": ["the-sacred-bodhi-ancient-kingdoms"]}
                ]
            },
            {
                "id": "grp_mihintale_ritigala",
                "destinationId": "mihintale-ritigala",
                "label": "Mihintale & Ritigala",
                "order": 3,
                "manualTicks": {"the-sacred-bodhi-ancient-kingdoms": True, "the-sacred-tooth-monastic-sanctuaries": True, "forest-hermitages-mindful-ceylon": True},
                "sights": [
                    {"id": "sight_mihin_cradle", "label": "Mihintale mountain cradle of Sri Lankan Buddhism", "order": 1, "includedIn": ["the-sacred-bodhi-ancient-kingdoms", "the-sacred-tooth-monastic-sanctuaries", "forest-hermitages-mindful-ceylon"]},
                    {"id": "sight_ritigala_forest", "label": "Ritigala strict nature reserve ancient forest monastery", "order": 2, "includedIn": ["the-sacred-bodhi-ancient-kingdoms", "forest-hermitages-mindful-ceylon"]},
                    {"id": "sight_ritigala_meditation", "label": "Walking meditation along secluded stone pathways", "order": 3, "includedIn": ["forest-hermitages-mindful-ceylon"]}
                ]
            },
            {
                "id": "grp_polonnaruwa",
                "destinationId": "polonnaruwa",
                "label": "Polonnaruwa Medieval Capital",
                "order": 4,
                "manualTicks": {"the-sacred-bodhi-ancient-kingdoms": True, "the-sacred-tooth-monastic-sanctuaries": False, "forest-hermitages-mindful-ceylon": False},
                "sights": [
                    {"id": "sight_pol_galvihara", "label": "Gal Vihara rock-cut granite master Buddha images", "order": 1, "includedIn": ["the-sacred-bodhi-ancient-kingdoms"]},
                    {"id": "sight_pol_vatadage", "label": "Sacred Quadrangle & Vatadage relic chamber", "order": 2, "includedIn": ["the-sacred-bodhi-ancient-kingdoms"]}
                ]
            },
            {
                "id": "grp_dambulla_sigiriya",
                "destinationId": "dambulla-sigiriya",
                "label": "Dambulla & Matale",
                "order": 5,
                "manualTicks": {"the-sacred-bodhi-ancient-kingdoms": True, "the-sacred-tooth-monastic-sanctuaries": True, "forest-hermitages-mindful-ceylon": True},
                "sights": [
                    {"id": "sight_dam_caves", "label": "Dambulla Golden Rock Cave temple sanctuaries", "order": 1, "includedIn": ["the-sacred-bodhi-ancient-kingdoms", "the-sacred-tooth-monastic-sanctuaries", "forest-hermitages-mindful-ceylon"]},
                    {"id": "sight_mat_aluvihara", "label": "Aluvihara Rock Temple where Tripitaka was inscribed", "order": 2, "includedIn": ["the-sacred-tooth-monastic-sanctuaries"]}
                ]
            },
            {
                "id": "grp_kandy",
                "destinationId": "kandy",
                "label": "Kandy Royal Realm",
                "order": 6,
                "manualTicks": {"the-sacred-bodhi-ancient-kingdoms": True, "the-sacred-tooth-monastic-sanctuaries": True, "forest-hermitages-mindful-ceylon": True},
                "sights": [
                    {"id": "sight_kan_tooth", "label": "Sri Dalada Maligawa Tevava ceremony attendance", "order": 1, "includedIn": ["the-sacred-bodhi-ancient-kingdoms", "the-sacred-tooth-monastic-sanctuaries", "forest-hermitages-mindful-ceylon"]},
                    {"id": "sight_kan_chapters", "label": "Malwatta & Asgiriya Maha Vihara monastic seats", "order": 2, "includedIn": ["the-sacred-bodhi-ancient-kingdoms", "the-sacred-tooth-monastic-sanctuaries"]},
                    {"id": "sight_kan_hermitage", "label": "Udawattakele forest hermitage walking contemplation", "order": 3, "includedIn": ["forest-hermitages-mindful-ceylon"]}
                ]
            },
            {
                "id": "grp_retreat_highlands",
                "destinationId": "knuckles-highlands",
                "label": "Knuckles & Highlands Sanctuary",
                "order": 7,
                "manualTicks": {"the-sacred-bodhi-ancient-kingdoms": False, "the-sacred-tooth-monastic-sanctuaries": True, "forest-hermitages-mindful-ceylon": True},
                "sights": [
                    {"id": "sight_knuck_vipassana", "label": "Silent day of nature contemplation & Vipassana", "order": 1, "includedIn": ["forest-hermitages-mindful-ceylon"]},
                    {"id": "sight_high_seetha", "label": "Highland scenic pass through Seetha Eliya", "order": 2, "includedIn": ["the-sacred-tooth-monastic-sanctuaries"]}
                ]
            },
            {
                "id": "grp_colombo_kelaniya",
                "destinationId": "colombo-kelaniya",
                "label": "Kelaniya & Colombo",
                "order": 8,
                "manualTicks": {"the-sacred-bodhi-ancient-kingdoms": True, "the-sacred-tooth-monastic-sanctuaries": True, "forest-hermitages-mindful-ceylon": True},
                "sights": [
                    {"id": "sight_kel_rajamaha", "label": "Kelaniya Raja Maha Vihara historic Buddha visit site", "order": 1, "includedIn": ["the-sacred-tooth-monastic-sanctuaries"]},
                    {"id": "sight_col_galleface", "label": "Colombo sunset ocean contemplation & farewell", "order": 2, "includedIn": ["the-sacred-bodhi-ancient-kingdoms", "the-sacred-tooth-monastic-sanctuaries", "forest-hermitages-mindful-ceylon"]}
                ]
            }
        ]

        results[cat] = {
            'category': cat,
            'title': title,
            'note': note,
            'packages': cat_pkg_slugs,
            'packageDetails': [{'slug': p.get('slug'), 'name': (p.get('title') if isinstance(p.get('title'), str) else p.get('title', {}).get('en', p.get('slug'))), 'nights': p.get('nights', 7), 'days': p.get('days', 8)} for p in cat_pkgs],
            'groups': buddhist_groups
        }
        print(f"[{cat}] Created custom comparison: {len(cat_pkgs)} packages, {len(buddhist_groups)} groups.")
        continue

    # Title & Note from HTML
    caption = table.find('caption')
    caption_text = caption.get_text(strip=True) if caption else f"Comparison of Sri Lanka {cat.replace('-', ' ').title()} Tour Packages"
    
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
            
    thead = table.find('thead')
    packages = []
    if thead:
        headers = thead.find_all('th')
        for th in headers[1:]:
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

            real_pkg = pkg_by_slug.get(slug)
            nights = real_pkg.get('nights', 7) if real_pkg else 7
            days = real_pkg.get('days', 8) if real_pkg else 8
            if real_pkg and isinstance(real_pkg.get('title'), dict):
                real_title = real_pkg.get('title', {}).get('en', pkg_name)
            elif real_pkg and isinstance(real_pkg.get('title'), str):
                real_title = real_pkg.get('title')
            else:
                real_title = pkg_name

            packages.append({
                'name': real_title,
                'slug': slug,
                'nights': nights,
                'days': days
            })

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
                dest_id = re.sub(r'[^a-z0-9]+', '-', dest_name.lower()).strip('-')
                
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

# Also attach comparison into packages_db categories
for cat, comp in results.items():
    if cat in packages_db.get('categories', {}):
        packages_db['categories'][cat]['comparison'] = {
            'title': comp['title'],
            'note': comp['note'],
            'packages': comp['packages'],
            'groups': comp['groups']
        }

with open('data/comparison_tables.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

with open('data/packages.json', 'w', encoding='utf-8') as f:
    json.dump(packages_db, f, indent=2, ensure_ascii=False)

print("\nSuccessfully updated data/comparison_tables.json and data/packages.json with ALL 11 categories!")
