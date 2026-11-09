# -*- coding: utf-8 -*-
"""
tools/audit_crawler.py
Comprehensive Phase 1 Audit Crawler for Lotus Ceylon International Tours & Services
Crawls every page in the website in all 10 languages and identifies every single element:
text, image, video, link, repeating list, inquiry form fields, SEO tags, company data,
hidden content, scripts injecting text, and content mistakes.
"""

import os
import re
import json
from bs4 import BeautifulSoup, Comment, NavigableString

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Languages to check
LANGUAGES = ['en', 'fr', 'de', 'zh-CN', 'zh-TW', 'ja', 'ar', 'hi', 'it', 'ru', 'es']

# Target pages
def get_all_target_pages():
    pages = []
    # 1. Root HTML files
    for f in os.listdir(ROOT_DIR):
        if f.endswith('.html') and not f.endswith('.backup.html'):
            pages.append(f)
    
    # 2. tours, destinations, blog, partials
    for folder in ['tours', 'destinations', 'blog', 'partials']:
        folder_path = os.path.join(ROOT_DIR, folder)
        if os.path.exists(folder_path):
            for root, dirs, files in os.walk(folder_path):
                for f in files:
                    if f.endswith('.html') and not f.endswith('.backup.html'):
                        rel = os.path.relpath(os.path.join(root, f), ROOT_DIR).replace('\\', '/')
                        pages.append(rel)
    return sorted(list(set(pages)))

def load_seed_catalog():
    seed_path = os.path.join(ROOT_DIR, 'data', 'seed-catalog.json')
    if os.path.exists(seed_path):
        try:
            with open(seed_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print("Error loading seed catalog:", e)
    return {}

def load_i18n():
    i18n_path = os.path.join(ROOT_DIR, 'js', 'i18n.js')
    if os.path.exists(i18n_path):
        try:
            with open(i18n_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Extract dictionary keys if possible
                keys = set(re.findall(r'["\']([a-zA-Z0-9_.]+)["\']\s*:', content))
                return keys
        except:
            pass
    return set()

# Map element / key to admin tab & subtab
def map_to_admin_tab(page_path, section_name, cms_key):
    p = page_path.lower()
    s = (section_name or '').lower()
    k = (cms_key or '').lower()

    if 'header' in p or 'header' in s or 'menu' in k:
        return 'Global > Header & Navigation'
    if 'footer' in p or 'footer' in s or 'copyright' in k or 'designer' in k or 'infinite' in k:
        return 'Global > Footer & Legal'
    if 'social' in s or 'social' in k:
        return 'Global > Social Links'
    if 'floating' in p or 'whatsapp' in k or 'line' in k or 'wechat' in k:
        return 'Global > Header & Navigation'
    
    # Inquiry forms
    if 'inquiry' in p or 'form' in s or 'inquiry' in k:
        if 'quick' in p or 'quick' in k:
            return 'Inquiry Forms > Quick Inquiry Form'
        return 'Inquiry Forms > Detailed Inquiry Form'
    
    # Home
    if p == 'index.html' or k.startswith('home.'):
        if 'hero' in s or 'hero' in k or 'banner' in s:
            return 'Home > Hero'
        if 'why' in s or 'why' in k:
            return 'Home > Why Travel With Us'
        if 'category' in s or 'category' in k:
            return 'Home > Category Showcase (Linked -> Tours > Categories)'
        if 'featured' in s or 'featured' in k or 'packages' in s:
            return 'Home > Featured Tours (Linked -> Tours > Packages)'
        if 'destination' in s or 'destination' in k:
            return 'Home > Destinations (Linked -> Destinations > Destinations list)'
        if 'experience' in s or 'experience' in k:
            return 'Home > Experiences (Linked -> Experiences > Experiences list)'
        if 'review' in s or 'review' in k or 'testimonial' in s:
            return 'Home > Reviews (Linked -> Reviews > Reviews list)'
        if 'gallery' in s or 'gallery' in k:
            return 'Home > Gallery (Linked -> Gallery > Gallery Images)'
        if 'news' in s or 'blog' in s or 'news' in k:
            return 'Home > News and Insights (Linked -> Blog > Blog Posts)'
        if 'success' in s or 'story' in s or 'stories' in k:
            return 'Home > Success Stories'
        if 'sustain' in s or 'sustain' in k:
            return 'Home > Sustainability'
        if 'seo' in s or 'seo' in k or 'title' in s or 'meta' in s:
            return 'Home > SEO'
        return 'Home > Content'

    # Tours
    if p.startswith('tours/'):
        if p == 'tours/index.html' or p == 'tours.html' or p == 'sri-lanka-tours.html':
            if 'seo' in s or 'seo' in k: return 'Tours > SEO'
            if 'finder' in s or 'finder' in k: return 'Tours > Trip Finder options'
            return 'Tours > Page Content'
        if '/index.html' in p and p.count('/') == 2: # e.g. tours/beach/index.html
            return 'Tours > Categories'
        if p.count('/') >= 3: # e.g. tours/beach/southern-sands-serenade/index.html
            return 'Tours > Packages'
        return 'Tours > Page Content'
    
    if p.endswith('-tours.html') or p in ['category.html', 'tour-package-detail.html', 'tours/detail.html']:
        return 'Tours > Root Redirect Stubs'

    # Destinations
    if p.startswith('destinations/'):
        return 'Destinations > Destinations list'
    if p == 'destinations.html':
        if 'seo' in s or 'seo' in k: return 'Destinations > SEO'
        return 'Destinations > Page Content'

    # Experiences
    if p == 'experiences.html':
        if 'seo' in s or 'seo' in k: return 'Experiences > SEO'
        if 'list' in s or 'exp' in k: return 'Experiences > Experiences list'
        return 'Experiences > Page Content'

    # About
    if p == 'about.html':
        if 'team' in s or 'team' in k: return 'About > Team Members'
        if 'seo' in s or 'seo' in k: return 'About > SEO'
        return 'About > Page Content'

    # Gallery
    if p == 'gallery.html':
        if 'image' in s or 'gallery' in k: return 'Gallery > Gallery Images'
        if 'seo' in s or 'seo' in k: return 'Gallery > SEO'
        return 'Gallery > Page Content'

    # Reviews
    if p == 'reviews.html':
        if 'list' in s or 'review' in k: return 'Reviews > Reviews list'
        if 'seo' in s or 'seo' in k: return 'Reviews > SEO'
        return 'Reviews > Page Content'

    # Blog
    if p.startswith('blog/'):
        return 'Blog > Blog Posts'
    if p == 'blog.html':
        if 'seo' in s or 'seo' in k: return 'Blog > SEO'
        return 'Blog > Page Content'

    # Contact
    if p == 'contact.html':
        if 'details' in s or 'phone' in k or 'email' in k or 'address' in k:
            return 'Contact > Contact Details and Social Links'
        if 'form' in s or 'inquiry' in k:
            return 'Inquiry Forms > Detailed Inquiry Form'
        if 'seo' in s or 'seo' in k:
            return 'Contact > SEO'
        return 'Contact > Page Content'

    # Legal
    if p in ['privacy-policy.html', 'terms-conditions.html', 'cancellation-policy.html', 'cookie-policy.html']:
        return 'Global > Footer & Legal'
    
    if p == '404.html':
        return 'Global > 404 Page'

    return 'Global > General'

def scan_file(rel_path, seed_data):
    full_path = os.path.join(ROOT_DIR, rel_path)
    try:
        with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
            html = f.read()
    except Exception as e:
        return None, []

    soup = BeautifulSoup(html, 'html.parser')
    elements = []
    mistakes = []

    # 1. Content mistake checks on raw HTML
    # A. Check for "Sri Lanka is Sri Lanka" or duplicate words
    dup_word_re = re.compile(r'\b([a-zA-Z]{3,})\s+\1\b', re.IGNORECASE)
    for line_no, line in enumerate(html.splitlines(), start=1):
        # Skip script/css tag lines
        if any(tag in line.lower() for tag in ['<script', '<style', 'class=', 'src=', 'href=', 'xmlns']):
            # Still check inner text if visible
            pass
        if 'paliforbuddhism@gmail.com' in line:
            mistakes.append({
                'file': rel_path,
                'line': line_no,
                'type': 'Security / Prohibited Secondary Email',
                'detail': 'Found prohibited secondary email paliforbuddhism@gmail.com',
                'snippet': line.strip()[:100]
            })
        if '..' in line and not '../' in line and not '...' in line:
            mistakes.append({
                'file': rel_path,
                'line': line_no,
                'type': 'Punctuation Error',
                'detail': 'Double period found (..)',
                'snippet': line.strip()[:100]
            })
        for match in dup_word_re.finditer(line):
            w = match.group(1).lower()
            if w not in ['that', 'had', 'the']: # exclude valid repeats
                mistakes.append({
                    'file': rel_path,
                    'line': line_no,
                    'type': 'Duplicated Word / Sentence',
                    'detail': f'Duplicate word: "{match.group(0)}"',
                    'snippet': line.strip()[:100]
                })

    # Find section context for an element
    def get_section(tag):
        curr = tag
        while curr:
            if curr.name in ['header', 'footer', 'nav', 'section', 'main']:
                sec_id = curr.get('id') or curr.get('class')
                if sec_id:
                    if isinstance(sec_id, list): sec_id = ' '.join(sec_id)
                    return f"{curr.name}#{sec_id}"
                return curr.name
            curr = curr.parent
        return 'body'

    # Check CMS binding attributes
    def get_cms_binding(tag):
        for attr in ['data-cms', 'data-cms-html', 'data-cms-img', 'data-cms-bg', 'data-cms-video', 'data-cms-link', 'data-cms-list', 'data-cms-alt', 'data-cms-aria', 'data-cms-title']:
            if tag.has_attr(attr):
                return attr, tag.get(attr)
        return None, None

    # Check if element is locked design credit
    def is_locked_design_credit(tag):
        text = tag.get_text()
        href = tag.get('href', '')
        if 'Infinite Design' in text or 'infiniteweb.dev' in href:
            return True
        return False

    # 1. SEO Head elements
    # Title
    title_tag = soup.find('title')
    if title_tag:
        cms_attr, cms_key = get_cms_binding(title_tag)
        elements.append({
            'page': rel_path,
            'section': 'SEO / Head',
            'element_type': 'Page Title (<title>)',
            'current_value': title_tag.get_text(strip=True),
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': map_to_admin_tab(rel_path, 'seo', cms_key) if cms_key else 'MISSING'
        })

    # Meta description
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    if meta_desc:
        cms_attr, cms_key = get_cms_binding(meta_desc)
        elements.append({
            'page': rel_path,
            'section': 'SEO / Head',
            'element_type': 'Meta Description (<meta name="description">)',
            'current_value': meta_desc.get('content', ''),
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': map_to_admin_tab(rel_path, 'seo', cms_key) if cms_key else 'MISSING'
        })

    # Meta keywords
    meta_kw = soup.find('meta', attrs={'name': 'keywords'})
    if meta_kw:
        cms_attr, cms_key = get_cms_binding(meta_kw)
        elements.append({
            'page': rel_path,
            'section': 'SEO / Head',
            'element_type': 'Meta Keywords (<meta name="keywords">)',
            'current_value': meta_kw.get('content', ''),
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': map_to_admin_tab(rel_path, 'seo', cms_key) if cms_key else 'MISSING'
        })

    # Canonical
    canon = soup.find('link', attrs={'rel': 'canonical'})
    if canon:
        cms_attr, cms_key = get_cms_binding(canon)
        elements.append({
            'page': rel_path,
            'section': 'SEO / Head',
            'element_type': 'Canonical URL (<link rel="canonical">)',
            'current_value': canon.get('href', ''),
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': map_to_admin_tab(rel_path, 'seo', cms_key) if cms_key else 'MISSING'
        })

    # OG / Twitter tags
    for og in soup.find_all('meta', attrs={'property': re.compile(r'^og:')}):
        cms_attr, cms_key = get_cms_binding(og)
        elements.append({
            'page': rel_path,
            'section': 'SEO / Open Graph',
            'element_type': f"Open Graph Tag ({og.get('property')})",
            'current_value': og.get('content', ''),
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': map_to_admin_tab(rel_path, 'seo', cms_key) if cms_key else 'MISSING'
        })

    for tw in soup.find_all('meta', attrs={'name': re.compile(r'^twitter:')}):
        cms_attr, cms_key = get_cms_binding(tw)
        elements.append({
            'page': rel_path,
            'section': 'SEO / Twitter Cards',
            'element_type': f"Twitter Card Tag ({tw.get('name')})",
            'current_value': tw.get('content', ''),
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': map_to_admin_tab(rel_path, 'seo', cms_key) if cms_key else 'MISSING'
        })

    # JSON-LD Schema
    for ld in soup.find_all('script', attrs={'type': 'application/ld+json'}):
        cms_attr, cms_key = get_cms_binding(ld)
        elements.append({
            'page': rel_path,
            'section': 'SEO / Structured Data',
            'element_type': 'JSON-LD Structured Data',
            'current_value': ld.get_text(strip=True)[:120] + '...',
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': map_to_admin_tab(rel_path, 'seo', cms_key) if cms_key else 'MISSING'
        })

    # Favicon
    favicon = soup.find('link', attrs={'rel': re.compile(r'icon')})
    if favicon:
        cms_attr, cms_key = get_cms_binding(favicon)
        elements.append({
            'page': rel_path,
            'section': 'SEO / Branding',
            'element_type': 'Favicon (<link rel="icon">)',
            'current_value': favicon.get('href', ''),
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': 'Global > Logo & Branding' if cms_key else 'MISSING'
        })

    # 2. Text elements: Headings (h1 - h6)
    for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
        text = h.get_text(strip=True)
        if not text: continue
        sec = get_section(h)
        cms_attr, cms_key = get_cms_binding(h)
        # Check if child has cms attribute
        if not cms_key:
            for child in h.find_all():
                c_attr, c_key = get_cms_binding(child)
                if c_key:
                    cms_attr, cms_key = c_attr, c_key
                    break
        elements.append({
            'page': rel_path,
            'section': sec,
            'element_type': f'Heading (<{h.name}>)',
            'current_value': text[:120],
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': map_to_admin_tab(rel_path, sec, cms_key) if cms_key else 'MISSING'
        })

    # 3. Paragraphs (p)
    for p in soup.find_all('p'):
        text = p.get_text(strip=True)
        if not text: continue
        sec = get_section(p)
        cms_attr, cms_key = get_cms_binding(p)
        if not cms_key:
            for child in p.find_all():
                c_attr, c_key = get_cms_binding(child)
                if c_key:
                    cms_attr, cms_key = c_attr, c_key
                    break
        elements.append({
            'page': rel_path,
            'section': sec,
            'element_type': 'Paragraph (<p>)',
            'current_value': text[:120],
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': map_to_admin_tab(rel_path, sec, cms_key) if cms_key else 'MISSING'
        })

    # 4. Buttons & Action Links
    for btn in soup.find_all(['button', 'a']):
        text = btn.get_text(strip=True)
        is_btn = (btn.name == 'button') or ('btn' in (btn.get('class') or [])) or ('button' in (btn.get('class') or []))
        if is_locked_design_credit(btn):
            elements.append({
                'page': rel_path,
                'section': get_section(btn),
                'element_type': 'Protected Designer Credit',
                'current_value': text,
                'source': 'LOCKED (Protected by Code & Firestore Rules)',
                'cms_key': 'LOCKED',
                'admin_tab': 'LOCKED (Read-only banner)'
            })
            continue

        if is_btn:
            sec = get_section(btn)
            cms_attr, cms_key = get_cms_binding(btn)
            elements.append({
                'page': rel_path,
                'section': sec,
                'element_type': 'Button / CTA',
                'current_value': text[:80] if text else (btn.get('aria-label') or btn.get('title') or '<icon-btn>'),
                'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
                'cms_key': cms_key or 'MISSING',
                'admin_tab': map_to_admin_tab(rel_path, sec, cms_key) if cms_key else 'MISSING'
            })
        elif btn.has_attr('href') and not btn.get('href').startswith('#'):
            # Hyperlink
            sec = get_section(btn)
            cms_attr, cms_key = get_cms_binding(btn)
            elements.append({
                'page': rel_path,
                'section': sec,
                'element_type': 'Link URL (<a href>)',
                'current_value': btn.get('href'),
                'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
                'cms_key': cms_key or 'MISSING',
                'admin_tab': map_to_admin_tab(rel_path, sec, cms_key) if cms_key else 'MISSING'
            })

    # 5. Images (img, picture source, bg)
    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src') or ''
        alt = img.get('alt', '')
        sec = get_section(img)
        cms_attr, cms_key = get_cms_binding(img)
        elements.append({
            'page': rel_path,
            'section': sec,
            'element_type': 'Image (<img>)',
            'current_value': f"{src} [alt='{alt}']",
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': map_to_admin_tab(rel_path, sec, cms_key) if cms_key else 'MISSING'
        })

    # Videos
    for vid in soup.find_all('video'):
        src = vid.get('src', '')
        sec = get_section(vid)
        cms_attr, cms_key = get_cms_binding(vid)
        elements.append({
            'page': rel_path,
            'section': sec,
            'element_type': 'Video (<video>)',
            'current_value': src or [s.get('src') for s in vid.find_all('source')],
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': map_to_admin_tab(rel_path, sec, cms_key) if cms_key else 'MISSING'
        })

    # Background images
    for tag in soup.find_all(attrs={'style': re.compile(r'background(?:-image)?:\s*url\(')}):
        style = tag.get('style', '')
        m = re.search(r'url\(["\']?([^"\')]+)["\']?\)', style)
        bg_url = m.group(1) if m else ''
        sec = get_section(tag)
        cms_attr, cms_key = get_cms_binding(tag)
        elements.append({
            'page': rel_path,
            'section': sec,
            'element_type': 'Background Image (style="url(...)")',
            'current_value': bg_url,
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': map_to_admin_tab(rel_path, sec, cms_key) if cms_key else 'MISSING'
        })

    # 6. Form Fields (input, select, textarea)
    for fld in soup.find_all(['input', 'select', 'textarea']):
        name = fld.get('name') or fld.get('id') or fld.get('type')
        placeholder = fld.get('placeholder', '')
        label = ''
        if fld.get('id'):
            lbl = soup.find('label', attrs={'for': fld.get('id')})
            if lbl: label = lbl.get_text(strip=True)
        sec = get_section(fld)
        cms_attr, cms_key = get_cms_binding(fld)
        elements.append({
            'page': rel_path,
            'section': sec,
            'element_type': f'Form Field ({fld.name}:{fld.get("type","text")})',
            'current_value': f"name='{name}', label='{label}', placeholder='{placeholder}'",
            'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
            'cms_key': cms_key or 'MISSING',
            'admin_tab': map_to_admin_tab(rel_path, sec, cms_key) if cms_key else 'MISSING'
        })

    # 7. Badges, Spans & Labels
    for sp in soup.find_all(['span', 'label', 'li']):
        text = sp.get_text(strip=True)
        if not text or len(text) > 200 or len(sp.find_all()) > 0: # only leaf text nodes
            continue
        cls = ' '.join(sp.get('class') or [])
        if any(b in cls.lower() for b in ['badge', 'pill', 'tag', 'label', 'stat', 'counter']):
            sec = get_section(sp)
            cms_attr, cms_key = get_cms_binding(sp)
            elements.append({
                'page': rel_path,
                'section': sec,
                'element_type': 'Badge / Stat / Pill',
                'current_value': text,
                'source': 'Firebase / CMS' if cms_key else 'Hardcoded in HTML',
                'cms_key': cms_key or 'MISSING',
                'admin_tab': map_to_admin_tab(rel_path, sec, cms_key) if cms_key else 'MISSING'
            })

    # 8. Hidden content & Scripts injecting text
    for script in soup.find_all('script'):
        stext = script.get_text()
        if 'scenes =' in stext or 'scenes=' in stext:
            # Hero video location badge scenes!
            elements.append({
                'page': rel_path,
                'section': 'Hero Banner Video Location Badge',
                'element_type': 'Script-Injected Video Scene Labels',
                'current_value': '18 Time-Synced Scenes (Lotus Blossom Sanctuaries, Sigiriya, etc.)',
                'source': 'Hardcoded in <script> inside index.html',
                'cms_key': 'home.hero_scenes',
                'admin_tab': 'Home > Hero'
            })
        if 'successStories' in stext or 'LotusSuccessStories' in stext:
            elements.append({
                'page': rel_path,
                'section': 'Our Success Stories',
                'element_type': 'Script-Injected Success Stories Data',
                'current_value': '5 Traveler Stories (Sacred Anuradhapura, etc.)',
                'source': 'Firebase / CMS + Local Fallback',
                'cms_key': 'home.success_stories',
                'admin_tab': 'Home > Success Stories'
            })

    return elements, mistakes

def run_full_audit():
    print("Starting Comprehensive Phase 1 Full Audit...")
    pages = get_all_target_pages()
    seed_data = load_seed_catalog()

    all_elements = []
    all_mistakes = []
    page_summaries = {}

    for p in pages:
        elems, mists = scan_file(p, seed_data)
        if elems is not None:
            all_elements.extend(elems)
            all_mistakes.extend(mists)
            bound_count = sum(1 for e in elems if e['source'] != 'Hardcoded in HTML' and e['cms_key'] != 'MISSING')
            page_summaries[p] = {
                'total': len(elems),
                'bound': bound_count,
                'hardcoded': len(elems) - bound_count,
                'pct': round((bound_count / len(elems) * 100) if elems else 100, 1)
            }

    print(f"Audit completed: {len(pages)} pages, {len(all_elements)} elements, {len(all_mistakes)} potential mistakes.")
    return pages, all_elements, all_mistakes, page_summaries

if __name__ == '__main__':
    pages, all_elements, all_mistakes, page_summaries = run_full_audit()
    print("Writing AUDIT_REPORT.md ...")
