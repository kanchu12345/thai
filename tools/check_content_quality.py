import os

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'brain' in root or 'admin' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            p = os.path.join(root, file)
            with open(p, 'r', encoding='utf-8', errors='ignore') as f:
                c = f.read().lower()
            for pattern in ['lorem ipsum', 'todo:', 'placeholder', 'tbd', 'xxx', 'sample text']:
                if pattern in c:
                    # check if it is just a form input placeholder attribute or actual text
                    if pattern == 'placeholder':
                        # count occurrences not in placeholder="..."
                        import re
                        no_attr = re.sub(r'placeholder="[^"]*"', '', c)
                        if 'placeholder' in no_attr:
                            print(f"{p}: text contains 'placeholder'")
                    else:
                        print(f"{p}: contains '{pattern}'")
