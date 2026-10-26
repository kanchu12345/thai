import os
import glob
import re

ROOT_DIR = os.getcwd()
css_files = glob.glob(os.path.join(ROOT_DIR, '**/*.css'), recursive=True)
css_files = [f for f in css_files if '.git' not in f and 'node_modules' not in f]

print(f"Total CSS files: {len(css_files)}")

for cf in css_files:
    rel_path = os.path.relpath(cf, ROOT_DIR)
    with open(cf, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Check matching braces
    open_b = content.count('{')
    close_b = content.count('}')
    if open_b != close_b:
        print(f"  [SYNTAX ERROR] {rel_path}: Mismatched braces ({open_b} open vs {close_b} close)")
    else:
        # print ok
        pass

    # Check for broken url(...)
    urls = re.findall(r'url\((.*?)\)', content)
    for u in urls:
        u_clean = u.strip('\'" ')
        if not u_clean or u_clean.startswith(('data:', 'http:', 'https:', '//', '#')):
            continue
        # verify relative path
        dir_name = os.path.dirname(cf)
        clean_target = u_clean.split('?')[0].split('#')[0]
        if clean_target.startswith('/'):
            target = os.path.normpath(os.path.join(ROOT_DIR, clean_target.lstrip('/')))
        else:
            target = os.path.normpath(os.path.join(dir_name, clean_target))
        if not os.path.exists(target):
            print(f"  [BROKEN CSS URL] {rel_path}: {u_clean} -> {target}")
