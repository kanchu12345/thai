# -*- coding: utf-8 -*-
import os
import sys

# Ensure UTF-8 output on Windows
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except:
        pass

from bs4 import BeautifulSoup, Comment
from bind_all_elements import is_locked_design_credit

def check_file(rel_path):
    full_path = os.path.join(os.path.dirname(__file__), '..', rel_path)
    with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    unbound = []
    for el in soup.find_all(True):
        if el.name in ['script', 'style', 'noscript', 'meta', 'link', 'title', 'head', 'html', 'body']:
            continue
        if is_locked_design_credit(el):
            continue

        # Check if this element has direct text nodes (excluding comments)
        direct_texts = [s.strip() for s in el.find_all(string=True, recursive=False) if not isinstance(s, Comment) and s.strip()]
        if not direct_texts:
            continue

        # Check if el or any ancestor (excluding body/html) is bound
        curr = el
        bound = False
        while curr and curr.name not in ['body', 'html', '[document]']:
            if any(curr.has_attr(a) for a in [
                'data-cms', 'data-cms-html', 'data-cms-list', 'data-cms-items',
                'data-cms-img', 'data-cms-link', 'data-cms-video', 'data-cms-bg',
                'data-cms-aria', 'data-cms-title'
            ]):
                bound = True
                break
            if is_locked_design_credit(curr):
                bound = True
                break
            curr = curr.parent

        if not bound:
            unbound.append({
                'file': rel_path,
                'tag': el.name,
                'class': el.get('class', []),
                'text': ' '.join(direct_texts)[:70]
            })

    return unbound

if __name__ == '__main__':
    from audit_crawler import get_all_target_pages
    pages = get_all_target_pages()
    all_unbound = {}
    total = 0
    for p in pages:
        un = check_file(p)
        if un:
            all_unbound[p] = un
            total += len(un)

    print(f"Total unbound direct-text elements across all 105 pages: {total} across {len(all_unbound)} pages")
    for p, un in list(all_unbound.items())[:15]:
        print(f"\n[{p}] ({len(un)} unbound):")
        for u in un[:5]:
            print(f"  <{u['tag']} class=\"{u['class']}\">: {u['text']}")
