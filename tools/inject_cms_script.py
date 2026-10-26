with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target = '<script src="./assets/js/mobile-nav.js"></script>'
replacement = '<script src="./assets/js/mobile-nav.js"></script>\n  <script src="./assets/js/cms.js"></script>'

if target in html and 'assets/js/cms.js' not in html:
    html = html.replace(target, replacement, 1)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('Added cms.js to index.html!')
else:
    print('Already present or target not found.')
