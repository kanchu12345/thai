import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('data/seed-catalog.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

for b in d.get('blog', []):
    print("ID:", b.get('id'))
    print("Title:", b.get('title'))
    print("Image:", b.get('image'))
    print("Category:", b.get('category'))
    print("---")
