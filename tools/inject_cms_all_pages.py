import os

count = 0
for root, dirs, files in os.walk('.'):
    # Skip node_modules, .git, etc.
    if any(skip in root for skip in ['.git', 'node_modules', '.gemini', 'tools']):
        continue
    for file in files:
        if file.endswith('.html') and not root.startswith('./admin') and not root.startswith('.\\admin'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                html = f.read()

            if 'cms.js' in html:
                continue

            rel_depth = (path.replace('\\', '/').count('/') - 1)
            rel_prefix = '../' * rel_depth if rel_depth > 0 else './'
            script_tag = f'<script src="{rel_prefix}assets/js/cms.js"></script>'

            if '</body>' in html:
                html = html.replace('</body>', f'  {script_tag}\n</body>')
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(html)
                count += 1

print(f'Injected cms.js into {count} pages!')
