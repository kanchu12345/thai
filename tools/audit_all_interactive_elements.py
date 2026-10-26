import os
import glob
import re
from bs4 import BeautifulSoup
from urllib.parse import urlparse, unquote

ROOT_DIR = os.getcwd()
html_files = glob.glob(os.path.join(ROOT_DIR, '**/*.html'), recursive=True)
html_files = [f for f in html_files if '.git' not in f and 'node_modules' not in f and 'archive' not in f]

print(f"Inspecting interactive elements across {len(html_files)} HTML pages...")

broken_links = []
empty_hash_links = []
broken_anchors = []
forms_found = []
buttons_found = []
social_links = []

for hf in html_files:
    rel_path = os.path.relpath(hf, ROOT_DIR).replace('\\', '/')
    dir_name = os.path.dirname(hf)
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    soup = BeautifulSoup(content, 'html.parser')

    # 1. Audit Links
    for a in soup.find_all('a'):
        href = a.get('href')
        text = a.get_text(strip=True)
        if href is None:
            continue
        href_clean = href.strip()

        # Check empty or pure hash
        if href_clean == '#' or href_clean == '':
            onclick = a.get('onclick')
            aid = a.get('id')
            aclass = a.get('class')
            # Check if it has a JS handler or is a known trigger
            empty_hash_links.append((rel_path, str(a)[:80], text, aid, aclass, onclick))
            continue

        if href_clean.startswith(('mailto:', 'tel:', 'javascript:')):
            continue

        if href_clean.startswith(('http://', 'https://')):
            if any(s in href_clean for s in ['facebook.com', 'instagram.com', 'youtube.com', 'wa.me', 'tripadvisor.com', 'twitter.com']):
                social_links.append((rel_path, href_clean, text))
            continue

        # In-page anchor link (e.g. #itinerary)
        if href_clean.startswith('#'):
            target_id = href_clean[1:]
            if target_id and not soup.find(id=target_id) and not soup.find('a', attrs={'name': target_id}):
                broken_anchors.append((rel_path, href_clean, text))
            continue

        # Relative or root internal link
        parsed = urlparse(href_clean)
        path_part = parsed.path
        fragment = parsed.fragment

        # Resolve path
        if path_part.startswith('/thai/'):
            clean_sub = path_part.replace('/thai/', '')
            target_path = os.path.normpath(os.path.join(ROOT_DIR, clean_sub))
        elif path_part.startswith('/'):
            target_path = os.path.normpath(os.path.join(ROOT_DIR, path_part.lstrip('/')))
        else:
            target_path = os.path.normpath(os.path.join(dir_name, path_part))

        # Check existence
        exists = os.path.exists(target_path)
        if not exists and not target_path.endswith('.html'):
            if os.path.exists(target_path + '.html'):
                exists = True
                target_path = target_path + '.html'
            elif os.path.exists(os.path.join(target_path, 'index.html')):
                exists = True
                target_path = os.path.join(target_path, 'index.html')

        if not exists:
            broken_links.append((rel_path, href_clean, text, target_path))
        elif fragment:
            # Check anchor in target file
            if os.path.isfile(target_path):
                with open(target_path, 'r', encoding='utf-8', errors='ignore') as tf:
                    t_content = tf.read()
                t_soup = BeautifulSoup(t_content, 'html.parser')
                if not t_soup.find(id=fragment) and not t_soup.find('a', attrs={'name': fragment}):
                    broken_anchors.append((rel_path, href_clean, text))

    # 2. Audit Forms
    for form in soup.find_all('form'):
        fid = form.get('id')
        action = form.get('action')
        method = form.get('method', 'GET').upper()
        inputs = [inp.get('name') or inp.get('id') for inp in form.find_all(['input', 'select', 'textarea'])]
        forms_found.append((rel_path, fid, action, method, inputs))

print(f"\n--- AUDIT SUMMARY ---")
print(f"Broken internal links: {len(broken_links)}")
for b in broken_links[:15]:
    print(f"  [404 LINK] in {b[0]}: href='{b[1]}' (text: '{b[2]}') -> {b[3]}")

print(f"\nBroken in-page anchor IDs: {len(broken_anchors)}")
for ba in broken_anchors[:15]:
    print(f"  [DEAD ANCHOR] in {ba[0]}: href='{ba[1]}' (text: '{ba[2]}')")

print(f"\nPure href='#' links: {len(empty_hash_links)}")
for eh in empty_hash_links[:10]:
    print(f"  [EMPTY HASH] in {eh[0]}: id={eh[3]}, class={eh[4]}, text='{eh[2]}', onclick={eh[5]}")

print(f"\nTotal Forms Detected: {len(forms_found)}")
for f in forms_found:
    print(f"  [FORM] in {f[0]}: id='{f[1]}', action='{f[2]}', method='{f[3]}', fields={len(f[4])}")
