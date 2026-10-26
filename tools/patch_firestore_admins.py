import re

with open('firestore.rules', 'r', encoding='utf-8') as f:
    c = f.read()

c = re.sub(
    r'(match\s+/admins/\{docId\}\s*\{\s*allow\s+read:\s*if\s+isAuthenticated\(\);\s*)allow\s+write:\s*if\s+isAdmin\(\);',
    r'\1allow write: if isSuperAdmin();',
    c
)

with open('firestore.rules', 'w', encoding='utf-8') as f:
    f.write(c)

print("admins rule update complete.")
