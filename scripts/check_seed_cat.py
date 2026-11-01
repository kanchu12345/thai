import json

with open('data/seed-catalog.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

print('Root keys:', list(d.keys()))
print('Categories count:', len(d.get('categories', [])))
print('Packages count:', len(d.get('packages', [])))
