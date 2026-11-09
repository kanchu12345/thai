# -*- coding: utf-8 -*-
with open('tools/bind_all_elements.py', 'r', encoding='utf-8') as f:
    c = f.read()

target = '    # 4. Ensure cms.js script is included'

addition = '''    # Skip to content link
    skip_link = soup.find('a', class_='skip-to-content-link')
    if skip_link and not skip_link.has_attr('data-cms'):
        skip_link['data-cms'] = 'siteGlobal.skipToContent'

    # 3.5 Universal pass for any elements with direct visible text nodes
    from bs4 import Comment
    for el in soup.find_all(True):
        if el.name in ['script', 'style', 'noscript', 'meta', 'link', 'title', 'head', 'html', 'body']:
            continue
        if is_locked_design_credit(el):
            continue

        direct_texts = [s.strip() for s in el.find_all(string=True, recursive=False) if not isinstance(s, Comment) and s.strip()]
        if not direct_texts:
            continue

        curr = el
        already_bound = False
        while curr and curr.name not in ['body', 'html', '[document]']:
            if any(curr.has_attr(a) for a in [
                'data-cms', 'data-cms-html', 'data-cms-list', 'data-cms-items',
                'data-cms-img', 'data-cms-link', 'data-cms-video', 'data-cms-bg'
            ]):
                already_bound = True
                break
            if is_locked_design_credit(curr):
                already_bound = True
                break
            curr = curr.parent

        if not already_bound:
            sec = get_clean_section_id(el)
            idx = get_next_idx(sec, el.name)
            el['data-cms'] = f"{page_name}.{sec}.{el.name}_{idx}"

    # 4. Ensure cms.js script is included'''

c_new = c.replace(target, addition)
with open('tools/bind_all_elements.py', 'w', encoding='utf-8') as f:
    f.write(c_new)
print('Updated tools/bind_all_elements.py successfully')
