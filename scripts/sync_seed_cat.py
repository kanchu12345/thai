import json

with open('data/seed-catalog.json', 'r', encoding='utf-8') as f:
    seed_cat = json.load(f)

with open('data/packages.json', 'r', encoding='utf-8') as f:
    pkg_db = json.load(f)

with open('data/comparison_tables.json', 'r', encoding='utf-8') as f:
    comp_tables = json.load(f)

# Update packages in seed_cat
seed_packages = seed_cat.get('packages', [])
pkg_db_packages = pkg_db.get('packages', [])

# Map of pkg by slug
pkg_map = {p['slug']: p for p in pkg_db_packages}

# Update or add packages in seed_cat
for sp in seed_packages:
    if sp.get('slug') in pkg_map:
        sp['route'] = pkg_map[sp['slug']].get('route', [])

# Update categories in seed_cat
seed_categories = seed_cat.get('categories', [])
existing_cat_slugs = {c.get('slug'): c for c in seed_categories}

for cat_slug, comp in comp_tables.items():
    if cat_slug in existing_cat_slugs:
        existing_cat_slugs[cat_slug]['comparison'] = {
            'title': comp['title'],
            'note': comp['note'],
            'packages': comp['packages'],
            'groups': comp['groups']
        }
    else:
        # Add missing category (e.g. buddhist-heritage)
        cat_info = pkg_db.get('categories', {}).get(cat_slug, {})
        new_cat = {
            'id': f"cat-{cat_slug}",
            'slug': cat_slug,
            'title': cat_info.get('title', cat_slug.replace('-', ' ').title()),
            'tagline': cat_info.get('tagline', 'SACRED MONASTIC EXPEDITIONS'),
            'description': cat_info.get('description', ''),
            'order': len(seed_categories) + 1,
            'published': True,
            'comparison': {
                'title': comp['title'],
                'note': comp['note'],
                'packages': comp['packages'],
                'groups': comp['groups']
            }
        }
        seed_categories.append(new_cat)

seed_cat['categories'] = seed_categories

with open('data/seed-catalog.json', 'w', encoding='utf-8') as f:
    json.dump(seed_cat, f, indent=2, ensure_ascii=False)

print(f"Updated data/seed-catalog.json: {len(seed_categories)} categories, {len(seed_packages)} packages!")
