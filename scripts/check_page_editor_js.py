import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/js/page-editor.js', 'r', encoding='utf-8') as f:
    c = f.read()

for match in re.finditer(r'visualPageDropdown', c):
    idx = match.start()
    print("--- Match ---")
    print(c[max(0, idx-100):min(len(c), idx+300)])
