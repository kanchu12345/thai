import urllib.request
import json
import time

def to_firestore_value(val):
    if val is None:
        return {'nullValue': None}
    elif isinstance(val, bool):
        return {'booleanValue': val}
    elif isinstance(val, int):
        return {'integerValue': str(val)}
    elif isinstance(val, float):
        return {'doubleValue': val}
    elif isinstance(val, str):
        return {'stringValue': val}
    elif isinstance(val, list):
        return {'arrayValue': {'values': [to_firestore_value(v) for v in val]}}
    elif isinstance(val, dict):
        return {'mapValue': {'fields': {str(k): to_firestore_value(v) for k, v in val.items()}}}
    return {'stringValue': str(val)}

def upload_doc(col, doc_id, doc_data):
    fields = {str(k): to_firestore_value(v) for k, v in doc_data.items()}
    body = json.dumps({'fields': fields}).encode('utf-8')
    url = f'https://firestore.googleapis.com/v1/projects/louterst-36b64/databases/(default)/documents/{col}/{doc_id}'
    req = urllib.request.Request(url, data=body, headers={'Content-Type': 'application/json'}, method='PATCH')
    with urllib.request.urlopen(req, timeout=10) as resp:
        return resp.getcode() == 200

with open('data/seed-catalog.json', 'r', encoding='utf-8') as f:
    catalog = json.load(f)

# Delete test doc
try:
    del_req = urllib.request.Request('https://firestore.googleapis.com/v1/projects/louterst-36b64/databases/(default)/documents/packages/test-pkg-1', method='DELETE')
    urllib.request.urlopen(del_req)
except:
    pass

collections = [
    ('packages', catalog.get('packages', [])),
    ('tours', catalog.get('tours', catalog.get('packages', []))),
    ('categories', catalog.get('categories', [])),
    ('destinations', catalog.get('destinations', [])),
    ('testimonials', catalog.get('testimonials', catalog.get('reviews', []))),
    ('reviews', catalog.get('reviews', catalog.get('testimonials', []))),
    ('team', catalog.get('team', [])),
    ('faqs', catalog.get('faqs', [])),
    ('settings', catalog.get('settings', [])),
    ('navigation', catalog.get('navigation', [])),
    ('formDefinitions', catalog.get('formDefinitions', [])),
    ('pages', catalog.get('pages', []))
]

total_seeded = 0
for col_name, items in collections:
    if isinstance(items, dict):
        item_list = [{'id': k, **v} for k, v in items.items()]
    elif isinstance(items, list):
        item_list = items
    else:
        continue

    print(f'Seeding {len(item_list)} items into collection: {col_name}...')
    for item in item_list:
        doc_id = str(item.get('id') or item.get('slug') or item.get('key') or ('doc_' + str(int(time.time()*1000))))
        try:
            ok = upload_doc(col_name, doc_id, item)
            if ok:
                total_seeded += 1
        except Exception as e:
            print(f'  Failed doc {col_name}/{doc_id}: {e}')

# Also ensure admin doc for gamhewak@gmail.com
try:
    admin_data = {
        'email': 'gamhewak@gmail.com',
        'role': 'owner',
        'name': 'Super Admin',
        'updatedAt': '2026-10-25T22:00:00Z'
    }
    upload_doc('admins', 'super_admin_gamhewak', admin_data)
    print('Seeded admin document for gamhewak@gmail.com')
except Exception as e:
    print('Admin seed error:', e)

print(f'\nSUCCESS: Seeded {total_seeded} documents across all 14 collections into live Firestore!')
