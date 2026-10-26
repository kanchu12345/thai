import re

with open('inquiry-detailed.html', encoding='utf-8') as f:
    text = f.read()

classes = set()
for match in re.finditer(r'class=["\']([^"\']+)["\']', text):
    for c in match.group(1).split():
        if any(w in c for w in ['grid', 'tile', 'interest', 'col', 'form']):
            classes.add(c)
print("inquiry-detailed classes:", sorted(classes))

with open('contact.html', encoding='utf-8') as f:
    text2 = f.read()

classes2 = set()
for match in re.finditer(r'class=["\']([^"\']+)["\']', text2):
    for c in match.group(1).split():
        if any(w in c for w in ['grid', 'tile', 'map', 'contact', 'col', 'form']):
            classes2.add(c)
print("contact classes:", sorted(classes2))
