import glob, re, sys
sys.stdout.reconfigure(encoding='utf-8')

arts = glob.glob('blog/*/index.html')
print(f"Auditing {len(arts)} blog articles for data-cms:")
for a in arts:
    with open(a, 'r', encoding='utf-8') as f:
        c = f.read()
    cms_tags = re.findall(r'data-cms(?:-img|-link|-html)?=["\']([^"\']+)["\']', c)
    print(f" - {a}: {len(cms_tags)} data-cms attributes")
