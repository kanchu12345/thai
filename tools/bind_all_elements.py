# -*- coding: utf-8 -*-
"""
tools/bind_all_elements.py
Universal CMS Attribute Binding Engine (Phase 2)
Binds every visible text node, image, video, link, form field, and SEO tag across all 105 pages
to a stable CMS key while strictly locking the Infinite Design developer credit.
"""

import os
import re
from bs4 import BeautifulSoup

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

def get_base_path(rel_path):
    segments = rel_path.replace('\\', '/').split('/')
    depth = len(segments) - 1
    return './' if depth == 0 else '../' * depth

def is_locked_design_credit(tag):
    if not tag: return False
    # Check text
    text = tag.get_text()
    if 'Infinite Design' in text:
        return True
    # Check href
    href = tag.get('href', '')
    if 'infiniteweb.dev' in href:
        return True
    # Check meta generator
    if tag.name == 'meta' and (tag.get('name') == 'generator' or 'Infinite Design' in tag.get('content', '')):
        return True
    # Check if parent is locked
    for p in tag.parents:
        if p.name in ['div', 'span', 'p'] and ('Infinite Design' in p.get_text() or 'footer-bottom-right' in (p.get('class') or [])):
            return True
    return False

def determine_page_key(rel_path):
    p = rel_path.replace('\\', '/').lower()
    if p == 'index.html': return 'siteContent/home'
    if p == 'about.html': return 'siteContent/about'
    if p == 'contact.html': return 'siteContent/contact'
    if p == 'destinations.html': return 'siteContent/destinations'
    if p == 'experiences.html': return 'siteContent/experiences'
    if p == 'gallery.html': return 'siteContent/gallery'
    if p == 'reviews.html': return 'siteContent/reviews'
    if p == 'blog.html': return 'siteContent/blog'
    if p in ['tours.html', 'sri-lanka-tours.html', 'tours/index.html']: return 'siteContent/toursIndex'
    if p == 'inquiry-detailed.html': return 'siteContent/inquiry-detailed'
    if p == 'inquiry-quick.html': return 'siteContent/inquiry-quick'
    if p == 'privacy-policy.html': return 'siteContent/privacy-policy'
    if p == 'terms-conditions.html': return 'siteContent/terms-conditions'
    if p == 'cancellation-policy.html': return 'siteContent/cancellation-policy'
    if p == 'cookie-policy.html': return 'siteContent/cookie-policy'
    if p == '404.html': return 'siteContent/404'
    
    if p.startswith('tours/'):
        parts = p.split('/')
        if len(parts) == 3 and parts[2] == 'index.html': # tours/<cat>/index.html
            return f'tourCategories/{parts[1]}'
        if len(parts) == 4 and parts[3] == 'index.html': # tours/<cat>/<pkg>/index.html
            return f'tourPackages/{parts[2]}'
    
    if p.startswith('destinations/'):
        parts = p.split('/')
        if len(parts) == 3 and parts[2] == 'index.html':
            return f'destinations/{parts[1]}'
            
    if p.startswith('blog/'):
        parts = p.split('/')
        if len(parts) == 3 and parts[2] == 'index.html':
            return f'blogPosts/{parts[1]}'
            
    if p.endswith('-tours.html') or p in ['category.html', 'tour-package-detail.html', 'tours/detail.html']:
        slug = os.path.basename(p).replace('.html', '')
        return f'siteContent/redirect-{slug}'

    slug = os.path.basename(p).replace('.html', '')
    return f'siteContent/{slug}'

def get_clean_section_id(tag):
    curr = tag
    while curr and curr.name not in ['html', '[document]']:
        if curr.name in ['section', 'header', 'footer', 'nav', 'main', 'article', 'aside']:
            sec_id = curr.get('id')
            if sec_id: return sec_id.replace('-', '_')
            classes = curr.get('class') or []
            for c in classes:
                if any(x in c for x in ['hero', 'banner', 'about', 'contact', 'footer', 'header', 'tours', 'dest', 'reviews', 'faq', 'why', 'category', 'packages', 'gallery', 'blog']):
                    return c.replace('-', '_')
            return curr.name
        curr = curr.parent
    return 'section'

def bind_page(rel_path):
    full_path = os.path.join(ROOT_DIR, rel_path)
    with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')
    page_key = determine_page_key(rel_path)
    base_path = get_base_path(rel_path)
    page_name = page_key.split('/')[-1].replace('-', '_')

    # 1. Ensure body has data-cms-page
    body = soup.find('body')
    if body and not body.has_attr('data-cms-page'):
        body['data-cms-page'] = page_key

    # 2. SEO head bindings
    # Title
    title = soup.find('title')
    if title and not title.has_attr('data-cms'):
        title['data-cms'] = f"{page_name}.seo.title"

    # Meta description
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    if meta_desc and not meta_desc.has_attr('data-cms'):
        meta_desc['data-cms'] = f"{page_name}.seo.description"

    # Meta keywords
    meta_kw = soup.find('meta', attrs={'name': 'keywords'})
    if meta_kw and not meta_kw.has_attr('data-cms'):
        meta_kw['data-cms'] = f"{page_name}.seo.keywords"

    # Canonical
    canon = soup.find('link', attrs={'rel': 'canonical'})
    if canon and not canon.has_attr('data-cms-link'):
        canon['data-cms-link'] = f"{page_name}.seo.canonical"

    # OG Title, Desc, Image, Type, Site Name
    og_title = soup.find('meta', attrs={'property': 'og:title'})
    if og_title and not og_title.has_attr('data-cms'):
        og_title['data-cms'] = f"{page_name}.seo.og_title"

    og_desc = soup.find('meta', attrs={'property': 'og:description'})
    if og_desc and not og_desc.has_attr('data-cms'):
        og_desc['data-cms'] = f"{page_name}.seo.og_description"

    og_img = soup.find('meta', attrs={'property': 'og:image'})
    if og_img and not og_img.has_attr('data-cms-img'):
        og_img['data-cms-img'] = f"{page_name}.seo.og_image"

    og_url = soup.find('meta', attrs={'property': 'og:url'})
    if og_url and not og_url.has_attr('data-cms-link'):
        og_url['data-cms-link'] = f"{page_name}.seo.canonical"

    og_type = soup.find('meta', attrs={'property': 'og:type'})
    if og_type and not og_type.has_attr('data-cms'):
        og_type['data-cms'] = f"{page_name}.seo.og_type"

    og_site = soup.find('meta', attrs={'property': 'og:site_name'})
    if og_site and not og_site.has_attr('data-cms'):
        og_site['data-cms'] = f"{page_name}.seo.og_site_name"

    # Twitter cards
    tw_card = soup.find('meta', attrs={'name': 'twitter:card'})
    if tw_card and not tw_card.has_attr('data-cms'):
        tw_card['data-cms'] = f"{page_name}.seo.twitter_card"

    tw_title = soup.find('meta', attrs={'name': 'twitter:title'})
    if tw_title and not tw_title.has_attr('data-cms'):
        tw_title['data-cms'] = f"{page_name}.seo.twitter_title"

    tw_desc = soup.find('meta', attrs={'name': 'twitter:description'})
    if tw_desc and not tw_desc.has_attr('data-cms'):
        tw_desc['data-cms'] = f"{page_name}.seo.twitter_description"

    tw_img = soup.find('meta', attrs={'name': 'twitter:image'})
    if tw_img and not tw_img.has_attr('data-cms-img'):
        tw_img['data-cms-img'] = f"{page_name}.seo.twitter_image"

    # JSON-LD Schema
    for idx, ld in enumerate(soup.find_all('script', attrs={'type': 'application/ld+json'}), start=1):
        if not ld.has_attr('data-cms'):
            ld['data-cms'] = f"{page_name}.seo.json_ld_{idx}"

    # Favicon
    favicon = soup.find('link', attrs={'rel': re.compile(r'icon')})
    if favicon and not favicon.has_attr('data-cms-img'):
        favicon['data-cms-img'] = "siteGlobal.branding.favicon"

    # 3. Headings, Paragraphs, Buttons, Links, Images, Badges
    counters = {}

    def get_next_idx(sec, elem_type):
        k = f"{sec}_{elem_type}"
        counters[k] = counters.get(k, 0) + 1
        return counters[k]

    # Headings
    for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
        if is_locked_design_credit(h): continue
        if any(h.has_attr(a) for a in ['data-cms', 'data-cms-html']): continue
        if any(child.has_attr('data-cms') or child.has_attr('data-cms-html') for child in h.find_all()):
            continue
        text = h.get_text(strip=True)
        if not text: continue
        sec = get_clean_section_id(h)
        idx = get_next_idx(sec, h.name)
        h['data-cms'] = f"{page_name}.{sec}.{h.name}_{idx}"

    # Paragraphs
    for p in soup.find_all('p'):
        if is_locked_design_credit(p): continue
        if any(p.has_attr(a) for a in ['data-cms', 'data-cms-html']): continue
        if any(child.has_attr('data-cms') or child.has_attr('data-cms-html') for child in p.find_all()):
            continue
        text = p.get_text(strip=True)
        if not text: continue
        sec = get_clean_section_id(p)
        idx = get_next_idx(sec, 'p')
        p['data-cms'] = f"{page_name}.{sec}.p_{idx}"

    # Buttons & Action Links
    for btn in soup.find_all(['button', 'a']):
        if is_locked_design_credit(btn): continue
        text = btn.get_text(strip=True)
        is_btn = (btn.name == 'button') or any('btn' in c for c in (btn.get('class') or []))
        sec = get_clean_section_id(btn)
        if is_btn:
            if not btn.has_attr('data-cms'):
                idx = get_next_idx(sec, 'btn')
                btn['data-cms'] = f"{page_name}.{sec}.btn_{idx}"
            if btn.has_attr('aria-label') and not btn.has_attr('data-cms-aria'):
                idx = get_next_idx(sec, 'aria')
                btn['data-cms-aria'] = f"{page_name}.{sec}.aria_{idx}"
            if btn.has_attr('title') and not btn.has_attr('data-cms-title'):
                idx = get_next_idx(sec, 'title')
                btn['data-cms-title'] = f"{page_name}.{sec}.title_{idx}"
        if btn.name == 'a' and btn.has_attr('href') and not btn.has_attr('data-cms-link'):
            href = btn.get('href', '')
            if href and not href.startswith('#') and not href.startswith('javascript:'):
                idx = get_next_idx(sec, 'link')
                btn['data-cms-link'] = f"{page_name}.{sec}.link_{idx}"

    # Images
    for img in soup.find_all('img'):
        if is_locked_design_credit(img): continue
        sec = get_clean_section_id(img)
        idx = get_next_idx(sec, 'img')
        if not img.has_attr('data-cms-img'):
            img['data-cms-img'] = f"{page_name}.{sec}.img_{idx}"
        if img.has_attr('alt') and not img.has_attr('data-cms-alt'):
            img['data-cms-alt'] = f"{page_name}.{sec}.alt_{idx}"

    # Videos
    for vid in soup.find_all('video'):
        sec = get_clean_section_id(vid)
        idx = get_next_idx(sec, 'vid')
        if not vid.has_attr('data-cms-video'):
            vid['data-cms-video'] = f"{page_name}.{sec}.video_{idx}"
        for s in vid.find_all('source'):
            if not s.has_attr('data-cms-video'):
                s['data-cms-video'] = f"{page_name}.{sec}.video_{idx}"

    # Background images
    for tag in soup.find_all(attrs={'style': re.compile(r'background(?:-image)?:\s*url\(')}):
        if is_locked_design_credit(tag): continue
        if not tag.has_attr('data-cms-bg'):
            sec = get_clean_section_id(tag)
            idx = get_next_idx(sec, 'bg')
            tag['data-cms-bg'] = f"{page_name}.{sec}.bg_{idx}"

    # Form controls
    for fld in soup.find_all(['input', 'textarea', 'select']):
        name = fld.get('name') or fld.get('id') or fld.get('type') or 'fld'
        sec = get_clean_section_id(fld)
        if not fld.has_attr('data-cms'):
            fld['data-cms'] = f"{page_name}.form.{name}"
        if fld.has_attr('placeholder') and not fld.has_attr('data-cms'):
            fld['data-cms'] = f"{page_name}.form.{name}.placeholder"
        if fld.has_attr('aria-label') and not fld.has_attr('data-cms-aria'):
            fld['data-cms-aria'] = f"{page_name}.form.{name}.aria"
        if fld.name == 'select':
            for opt_idx, opt in enumerate(fld.find_all('option'), start=1):
                opt_val = opt.get_text(strip=True)
                if opt_val and not opt.has_attr('data-cms'):
                    opt['data-cms'] = f"{page_name}.form.{name}.opt_{opt_idx}"

    for lbl in soup.find_all('label'):
        if is_locked_design_credit(lbl): continue
        if not lbl.has_attr('data-cms'):
            for_id = lbl.get('for') or 'lbl'
            sec = get_clean_section_id(lbl)
            lbl['data-cms'] = f"{page_name}.form.{for_id}.label"

    # Standalone labels, badges, pills, spans
    for sp in soup.find_all(['span', 'li', 'td', 'th']):
        if is_locked_design_credit(sp): continue
        if any(sp.has_attr(a) for a in ['data-cms', 'data-cms-html', 'data-cms-list']): continue
        # Only bind if element has NO element children (leaf node)
        if len(sp.find_all()) == 0:
            text = sp.get_text(strip=True)
            if text and len(text) <= 250:
                sec = get_clean_section_id(sp)
                idx = get_next_idx(sec, sp.name)
                sp['data-cms'] = f"{page_name}.{sec}.{sp.name}_{idx}"

    # 4. Ensure cms.js script is included
    has_cms_js = False
    for s in soup.find_all('script'):
        if 'assets/js/cms.js' in (s.get('src') or ''):
            has_cms_js = True
            break
    if not has_cms_js and body:
        new_script = soup.new_tag('script', src=f"{base_path}assets/js/cms.js")
        body.append(new_script)

    # Serialize back
    out_html = str(soup)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(out_html)

    return True

def run():
    from audit_crawler import get_all_target_pages
    pages = get_all_target_pages()
    print(f"Binding CMS attributes across all {len(pages)} pages...")
    bound_count = 0
    for p in pages:
        if bind_page(p):
            bound_count += 1
    print(f"Successfully processed {bound_count} pages.")

if __name__ == '__main__':
    run()
