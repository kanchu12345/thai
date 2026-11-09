# -*- coding: utf-8 -*-
from audit_crawler import get_all_target_pages, load_seed_catalog, scan_file
from collections import Counter

pages = get_all_target_pages()
seed_data = load_seed_catalog()
unbound = []
for p in pages:
    elems, _ = scan_file(p, seed_data)
    for e in elems:
        if e['source'] == 'Hardcoded in HTML' and e['cms_key'] == 'MISSING':
            unbound.append(e)

print(f"Total unbound remaining: {len(unbound)}")
c = Counter(e['element_type'] for e in unbound)
for t, cnt in c.most_common():
    print(f"  {t}: {cnt}")

print("\nSample 25 unbound items:")
for e in unbound[:25]:
    val = str(e['current_value'])[:70].replace('\n', ' ')
    print(f"  [{e['page']}] {e['element_type']} in {e['section']}: {val}")
