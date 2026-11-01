import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('data/seed-catalog.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

# Inspect first blog item
first_blog = d['blog'][0]
print("Keys of blog item:", list(first_blog.keys()))
print("Example item:", json.dumps(first_blog, indent=2)[:500])
