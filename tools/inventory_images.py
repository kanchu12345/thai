import os
import re
import json
from bs4 import BeautifulSoup
from PIL import Image

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

def resolve_to_disk(src, html_path):
    if not src:
        return None
    src = src.strip().split('?')[0].split('#')[0]
    if src.startswith('http://') or src.startswith('https://') or src.startswith('data:') or src.startswith('//'):
        return None
    if src.startswith('/'):
        clean = src.lstrip('/')
        p = os.path.join(REPO_ROOT, clean)
        if os.path.exists(p):
            return p
    html_dir = os.path.dirname(html_path)
    rel_p = os.path.normpath(os.path.join(html_dir, src))
    if os.path.exists(rel_p):
        return rel_p
    clean = src.lstrip('./').lstrip('/')
    root_p = os.path.join(REPO_ROOT, clean)
    if os.path.exists(root_p):
        return root_p
    alias_p = os.path.join(REPO_ROOT, 'assets', 'images', clean)
    if os.path.exists(alias_p):
        return alias_p
    return None

DISK_INFO_CACHE = {}

def get_disk_info(disk_path):
    if not disk_path:
        return {'exists': False}
    if disk_path in DISK_INFO_CACHE:
        return DISK_INFO_CACHE[disk_path]
    if not os.path.exists(disk_path):
        res = {'exists': False}
        DISK_INFO_CACHE[disk_path] = res
        return res
    try:
        size_bytes = os.path.getsize(disk_path)
        ext = os.path.splitext(disk_path)[1].lower()
        if ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif']:
            with Image.open(disk_path) as im:
                w, h = im.size
                fmt = im.format
            res = {'exists': True, 'size_bytes': size_bytes, 'width': w, 'height': h, 'format': fmt}
        elif ext in ['.mp4', '.webm', '.ogg', '.mov']:
            res = {'exists': True, 'size_bytes': size_bytes, 'type': 'video'}
        elif ext in ['.svg']:
            res = {'exists': True, 'size_bytes': size_bytes, 'type': 'svg'}
        else:
            res = {'exists': True, 'size_bytes': size_bytes, 'type': 'other'}
    except Exception as e:
        res = {'exists': True, 'size_bytes': os.path.getsize(disk_path), 'error': str(e)}
    DISK_INFO_CACHE[disk_path] = res
    return res

def find_context_fast(el):
    section_name = ""
    heading = ""
    curr = el.parent
    depth = 0
    while curr and curr.name != '[document]' and depth < 6:
        if not section_name:
            if curr.name in ['header', 'footer', 'nav', 'aside', 'main']:
                section_name = curr.name
            elif curr.get('id'):
                section_name = f"{curr.name}#{curr.get('id')}"
            else:
                classes = curr.get('class', [])
                for c in classes:
                    if any(term in c for term in ['section', 'hero', 'footer', 'header', 'banner', 'card', 'box', 'slide', 'gallery']):
                        section_name = f"{curr.name}.{c}"
                        break
        if not heading:
            for h in curr.find_all(['h1', 'h2', 'h3', 'h4', 'figcaption'], recursive=False):
                txt = h.get_text(' ', strip=True)
                if txt:
                    heading = txt[:100]
                    break
        curr = curr.parent
        depth += 1

    return section_name or "body", heading

def crawl():
    inventory = []
    html_files = []
    for root, dirs, files in os.walk(REPO_ROOT):
        if any(ignored in root for ignored in ['.git', 'node_modules', 'archive', 'backup', 'backups', 'rollout-screens', 'scratch']):
            continue
        for fname in files:
            if fname.endswith('.html') and '.backup.' not in fname:
                html_files.append(os.path.join(root, fname))

    print(f"Scanning {len(html_files)} HTML files...")
    for idx, html_path in enumerate(html_files):
        rel_html = os.path.relpath(html_path, REPO_ROOT).replace('\\', '/')
        try:
            with open(html_path, 'r', encoding='utf-8') as f:
                content = f.read()
            soup = BeautifulSoup(content, 'html.parser')
            page_title = soup.title.string.strip() if soup.title and soup.title.string else ""

            # og:image and twitter:image
            for meta in soup.find_all('meta'):
                prop = meta.get('property') or meta.get('name') or ''
                if prop in ['og:image', 'twitter:image']:
                    content_val = meta.get('content', '')
                    if content_val:
                        disk_p = resolve_to_disk(content_val, html_path)
                        rel_disk = os.path.relpath(disk_p, REPO_ROOT).replace('\\', '/') if disk_p else None
                        info = get_disk_info(disk_p)
                        inventory.append({
                            'page': rel_html,
                            'page_title': page_title,
                            'section': 'meta-tag',
                            'element': prop,
                            'raw_src': content_val,
                            'disk_path': rel_disk,
                            'alt': '',
                            'heading': 'Social Share Image',
                            'info': info
                        })

            # favicon
            for link in soup.find_all('link', rel=re.compile(r'icon', re.I)):
                href = link.get('href', '')
                if href:
                    disk_p = resolve_to_disk(href, html_path)
                    rel_disk = os.path.relpath(disk_p, REPO_ROOT).replace('\\', '/') if disk_p else None
                    info = get_disk_info(disk_p)
                    inventory.append({
                        'page': rel_html,
                        'page_title': page_title,
                        'section': 'head',
                        'element': 'favicon',
                        'raw_src': href,
                        'disk_path': rel_disk,
                        'alt': '',
                        'heading': 'Favicon',
                        'info': info
                    })

            # img tags
            for img in soup.find_all('img'):
                src = img.get('src') or img.get('data-src') or ''
                if not src:
                    continue
                alt = img.get('alt', '').strip()
                sec, heading = find_context_fast(img)
                disk_p = resolve_to_disk(src, html_path)
                rel_disk = os.path.relpath(disk_p, REPO_ROOT).replace('\\', '/') if disk_p else None
                info = get_disk_info(disk_p)
                inventory.append({
                    'page': rel_html,
                    'page_title': page_title,
                    'section': sec,
                    'element': 'img',
                    'raw_src': src,
                    'disk_path': rel_disk,
                    'alt': alt,
                    'heading': heading,
                    'info': info,
                    'data_cms': img.get('data-cms', '')
                })

            # video and source tags
            for vid in soup.find_all(['video', 'source']):
                src = vid.get('src', '')
                if not src and vid.name == 'video':
                    src = vid.get('poster', '')
                if not src:
                    continue
                sec, heading = find_context_fast(vid)
                disk_p = resolve_to_disk(src, html_path)
                rel_disk = os.path.relpath(disk_p, REPO_ROOT).replace('\\', '/') if disk_p else None
                info = get_disk_info(disk_p)
                inventory.append({
                    'page': rel_html,
                    'page_title': page_title,
                    'section': sec,
                    'element': vid.name,
                    'raw_src': src,
                    'disk_path': rel_disk,
                    'alt': vid.get('title', '') or vid.get('aria-label', ''),
                    'heading': heading or 'Hero Video',
                    'info': info
                })

            # Inline background-image styles
            for el in soup.find_all(style=re.compile(r'url\s*\([^\)]+\)', re.I)):
                style_str = el.get('style', '')
                matches = re.findall(r'url\s*\(\s*[\'"]?([^\'")]+)[\'"]?\s*\)', style_str, re.I)
                for m in matches:
                    if m.startswith('data:'):
                        continue
                    sec, heading = find_context_fast(el)
                    disk_p = resolve_to_disk(m, html_path)
                    rel_disk = os.path.relpath(disk_p, REPO_ROOT).replace('\\', '/') if disk_p else None
                    info = get_disk_info(disk_p)
                    inventory.append({
                        'page': rel_html,
                        'page_title': page_title,
                        'section': sec,
                        'element': 'inline-bg-style',
                        'raw_src': m,
                        'disk_path': rel_disk,
                        'alt': '',
                        'heading': heading,
                        'info': info
                    })

        except Exception as e:
            print(f"Error parsing {html_path}: {e}")

    out_file = os.path.join(REPO_ROOT, 'tools', 'raw_inventory.json')
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(inventory, f, indent=2, ensure_ascii=False)
    print(f"Done! Extracted {len(inventory)} references across {len(html_files)} files. Saved to {out_file}")

if __name__ == '__main__':
    crawl()
