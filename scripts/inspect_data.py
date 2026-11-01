import json

with open('data/packages.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

print('Root keys:', list(d.keys()))
print('Categories count:', len(d.get('categories', {})))
print('Packages count:', len(d.get('packages', [])))
if 'packages' in d and len(d['packages']) > 0:
    first_pkg = d['packages'][0]
    print('Sample package:', json.dumps({k: first_pkg[k] for k in list(first_pkg.keys())[:10]}, indent=2))
