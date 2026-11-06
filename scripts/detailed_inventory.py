import sys
import json
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open('admin/index.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

print("--- DETAILED ADMIN CHECKLIST INVENTORY ---")

# 1. AUTH SCREEN
auth = soup.select_one('#authScreen')
print("\n[AUTH SCREEN]")
for el in auth.select('input, button, a'):
    tag = el.name
    el_id = el.get('id', '')
    el_type = el.get('type', '')
    text = el.get_text(strip=True)
    onclick = el.get('onclick', '')
    print(f"  Auth: <{tag}> id='{el_id}' type='{el_type}' text='{text}' onclick='{onclick}'")

# 2. SECTIONS & THEIR ACTIONS
sections = soup.select('section.content-section')
print(f"\n[CONTENT SECTIONS ({len(sections)})]")
for sec in sections:
    sec_id = sec.get('id')
    h2 = sec.select_one('h2, .section-title-wrap h3')
    title = h2.get_text(strip=True) if h2 else ''
    buttons = [b.get_text(strip=True) or b.get('onclick', '') for b in sec.select('button, .btn')]
    inputs = [i.get('id') or i.get('placeholder') or i.get('type') for i in sec.select('input, select, textarea')]
    tables = [t.get('id') or 'table' for t in sec.select('table, tbody')]
    print(f"\n  Section #{sec_id} ({title}):")
    print(f"    Buttons ({len(buttons)}): {buttons[:10]}")
    print(f"    Inputs ({len(inputs)}): {inputs[:10]}")
    print(f"    Tables ({len(tables)}): {tables}")

# 3. MODALS & FORMS
modals = soup.select('.modal-overlay, .modal-backdrop')
print(f"\n[MODALS ({len(modals)})]")
for mod in modals:
    mod_id = mod.get('id')
    h3 = mod.select_one('h3')
    title = h3.get_text(strip=True) if h3 else ''
    form = mod.select_one('form')
    form_id = form.get('id') if form else 'NO_FORM'
    tabs = [t.get_text(strip=True) for t in mod.select('.tab-btn, .nav-tab, button[role="tab"]')]
    inputs = [i.get('id') or i.get('name') or i.get('type') for i in mod.select('input, select, textarea')]
    buttons = [b.get_text(strip=True) or b.get('onclick', '') for b in mod.select('button')]
    print(f"\n  Modal #{mod_id} ('{title}') - Form: #{form_id}:")
    if tabs:
        print(f"    Tabs: {tabs}")
    print(f"    Inputs ({len(inputs)}): {inputs}")
    print(f"    Buttons ({len(buttons)}): {buttons}")
