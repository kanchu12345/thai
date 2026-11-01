import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('data/packages.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

buddhist_pkgs = [p for p in d.get('packages', []) if p.get('category') == 'buddhist-heritage']
print(f"Buddhist heritage packages: {len(buddhist_pkgs)}")
for p in buddhist_pkgs:
    print(f"- {p.get('slug')}: {p.get('title')} ({p.get('nights')}N / {p.get('days')}D)")
    for dst in p.get('destinations', []):
        print(f"   * {dst.get('name')}: {dst.get('activities')}")
