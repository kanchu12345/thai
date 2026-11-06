import sys
import re
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open('admin/index.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

print('=== 1. SIDEBAR NAV ITEMS ===')
nav_items = soup.select('nav.sidebar-nav a.nav-link')
print(f'Total Nav Items: {len(nav_items)}')
for nav in nav_items:
    onclick = nav.get('onclick', '')
    text = nav.get_text(strip=True)
    sec = nav.get('data-section', '')
    doc = nav.get('data-page-doc', '')
    pkg = nav.get('data-pkg-title', '')
    print(f'  - [{text}] section="{sec}" doc="{doc}" pkg="{pkg}" onclick="{onclick}"')

print('\n=== 2. SECTIONS ===')
sections = soup.select('section.content-section')
print(f'Total Content Sections: {len(sections)}')
for sec in sections:
    sec_id = sec.get('id')
    h2 = sec.select_one('h2')
    h2_text = h2.get_text(strip=True) if h2 else 'No H2'
    print(f'  - Section: #{sec_id} ("{h2_text}")')

print('\n=== 3. MODALS ===')
modals = soup.select('.modal-overlay, .modal-backdrop')
print(f'Total Modals: {len(modals)}')
for mod in modals:
    mod_id = mod.get('id')
    h3 = mod.select_one('h3')
    h3_text = h3.get_text(strip=True) if h3 else 'No H3'
    print(f'  - Modal: #{mod_id} ("{h3_text}")')

print('\n=== 4. FORMS ===')
forms = soup.select('form')
print(f'Total Forms: {len(forms)}')
for form in forms:
    form_id = form.get('id')
    onsubmit = form.get('onsubmit', '')
    inputs = len(form.select('input, select, textarea'))
    buttons = len(form.select('button, input[type="submit"]'))
    print(f'  - Form: #{form_id} (Inputs: {inputs}, Buttons: {buttons}, onsubmit="{onsubmit}")')

print('\n=== 5. ALL BUTTONS IN ADMIN ===')
buttons = soup.select('button')
print(f'Total Buttons: {len(buttons)}')
btn_map = {}
for btn in buttons:
    txt = btn.get_text(strip=True)
    onclick = btn.get('onclick', '')
    btn_id = btn.get('id', '')
    btn_type = btn.get('type', 'button')
    key = f'{btn_id}|{txt}|{onclick[:35]}'
    btn_map[key] = btn_map.get(key, 0) + 1
for k, count in list(btn_map.items())[:40]:
    print(f'  - Btn: {k} (x{count})')
if len(btn_map) > 40:
    print(f'  ... and {len(btn_map)-40} more button variants')

print('\n=== 6. SETTINGS FIELDS ===')
settings_inputs = soup.select('#section-settings input, #section-settings select, #section-settings textarea')
print(f'Total Settings Editable Fields: {len(settings_inputs)}')
for inp in settings_inputs:
    print(f'  - Setting Field: id="{inp.get("id")}" name="{inp.get("name")}" type="{inp.get("type", inp.name)}"')
