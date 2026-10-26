with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if any(k in l for k in ['auth', 'signIn', 'login', 'currentUser', 'initApp', 'supabase']):
        if i < 200 or 'signIn' in l or 'login' in l:
            print(f"{i+1}: {l.strip()[:100]}")
