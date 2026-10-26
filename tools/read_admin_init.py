with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines[155:220], start=156):
    print(f"{i}: {l.strip()}")
