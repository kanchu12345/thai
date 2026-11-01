import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('data/packages.json', 'r', encoding='utf-8') as f:
    packages_db = json.load(f)

for p in packages_db.get('packages', []):
    if p.get('category') == 'buddhist-heritage':
        print('===', p.get('slug'))
        for day in p.get('itinerary', []):
            print(f"  Day {day.get('day')}: {day.get('title')}")
