import os, re, sys
sys.stdout.reconfigure(encoding='utf-8')

for root, dirs, files in os.walk('.'):
    for fn in files:
        if fn.endswith(('.html', '.js')):
            fp = os.path.join(root, fn)
            try:
                with open(fp, 'r', encoding='utf-8') as f:
                    c = f.read()
                if 'visualPageDropdown' in c:
                    print(f"{fp}: {len(re.findall('visualPageDropdown', c))} matches")
            except Exception:
                pass
