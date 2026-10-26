import re

with open('contact.html', encoding='utf-8') as f:
    text = f.read()

keywords = ['contact-grid', 'contact-info-card', 'contact-form-card', 'contact-map-wrapper', 'contactMap', 'leaflet']
with open('tools/contact_rules.txt', 'w', encoding='utf-8') as out:
    for kw in keywords:
        for m in re.finditer(r'([^{}]*' + kw + r'[^{}]*\{[^}]*\})', text):
            out.write(f"=== {kw} ===\n" + m.group(1) + "\n\n")

    with open('css/style.css', encoding='utf-8') as f:
        text_css = f.read()
    for kw in keywords:
        for m in re.finditer(r'([^{}]*' + kw + r'[^{}]*\{[^}]*\})', text_css):
            out.write(f"=== {kw} in style.css ===\n" + m.group(1) + "\n\n")

print("Done scanning contact rules")
