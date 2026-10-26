import re

with open('css/style.css', encoding='utf-8') as f:
    text = f.read()

keywords = ['pax-inputs-row', 'total-pax', 'checkbox-tiles', 'interests-grid', 'contact-grid', 'contact-map']
with open('tools/style_css_rules.txt', 'w', encoding='utf-8') as out:
    for kw in keywords:
        for m in re.finditer(r'([^{}]*' + kw + r'[^{}]*\{[^}]*\})', text):
            out.write(f"=== {kw} ===\n" + m.group(1) + "\n\n")

print("Done scanning css/style.css")
