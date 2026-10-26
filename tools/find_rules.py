import re

with open('inquiry-detailed.html', encoding='utf-8') as f:
    text = f.read()

with open('tools/rules_out.txt', 'w', encoding='utf-8') as out:
    for m in re.finditer(r'([^{}]*total-pax[^{}]*\{[^}]*\})', text):
        out.write("Found total-pax rule in inquiry-detailed.html:\n" + m.group(1) + "\n\n")

    for m in re.finditer(r'([^{}]*checkbox-tiles[^{}]*\{[^}]*\})', text):
        out.write("Found checkbox-tiles rule in inquiry-detailed.html:\n" + m.group(1) + "\n\n")

    with open('assets/css/site.css', encoding='utf-8') as f:
        text_css = f.read()

    for m in re.finditer(r'([^{}]*total-pax[^{}]*\{[^}]*\})', text_css):
        out.write("Found total-pax rule in site.css:\n" + m.group(1) + "\n\n")

    for m in re.finditer(r'([^{}]*checkbox-tiles[^{}]*\{[^}]*\})', text_css):
        out.write("Found checkbox-tiles rule in site.css:\n" + m.group(1) + "\n\n")

print("Written to tools/rules_out.txt")
