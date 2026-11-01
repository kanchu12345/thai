import os
import re
from bs4 import BeautifulSoup

dests_dir = 'destinations'
folders = [d for d in os.listdir(dests_dir) if os.path.isdir(os.path.join(dests_dir, d))]

count_updated = 0

for folder in sorted(folders):
    html_file = os.path.join(dests_dir, folder, 'index.html')
    if not os.path.exists(html_file):
        continue

    with open(html_file, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')
    body = soup.find('body')
    if not body:
        continue

    clean_slug = folder.replace('-', '_')

    # 1. Hero section
    hero = soup.find(class_='destination-detail-hero')
    if hero:
        if not hero.get('data-cms-bg'):
            hero['data-cms-bg'] = f"dest_{clean_slug}.hero_bg"

        # Badge
        badge = hero.find(class_='badge')
        if badge and not badge.get('data-cms'):
            badge['data-cms'] = f"dest_{clean_slug}.badge"

        # Title
        h1 = hero.find('h1')
        if h1 and not h1.get('data-cms'):
            h1['data-cms'] = f"dest_{clean_slug}.title"

        # Lead
        p_lead = hero.find('p')
        if p_lead and not p_lead.get('data-cms'):
            p_lead['data-cms'] = f"dest_{clean_slug}.lead"

        # Pills/badges inside hero
        pill_div = hero.find('div', style=lambda s: s and 'display: flex' in s and 'gap: 10px' in s)
        if pill_div:
            spans = pill_div.find_all('span')
            for i, sp in enumerate(spans):
                if not sp.get('data-cms'):
                    sp['data-cms'] = f"dest_{clean_slug}.pill_{i+1}"

    # 2. Essence section
    content_sec = soup.find('section', style=lambda s: s and 'background: #FAF8F5' in s)
    if content_sec:
        h2 = content_sec.find('h2')
        if h2 and not h2.get('data-cms'):
            h2['data-cms'] = f"dest_{clean_slug}.essence_title"

        p_desc = content_sec.find('p', style=lambda s: s and 'color: #475569' in s)
        if p_desc and not p_desc.get('data-cms'):
            p_desc['data-cms'] = f"dest_{clean_slug}.essence_body"

        # Experiences box
        exp_box = content_sec.find('div', style=lambda s: s and 'box-shadow: 0 4px 15px' in s)
        if exp_box:
            h3_exp = exp_box.find('h3')
            if h3_exp and not h3_exp.get('data-cms'):
                h3_exp['data-cms'] = f"dest_{clean_slug}.exp_title"
            lis = exp_box.find_all('li')
            for i, li in enumerate(lis):
                if not li.get('data-cms'):
                    li['data-cms'] = f"dest_{clean_slug}.exp_item_{i+1}"

        # Tailor-Made Journey box
        tailor_box = content_sec.find('div', style=lambda s: s and 'background: #0F172A' in s)
        if tailor_box:
            span_tag = tailor_box.find('span')
            if span_tag and not span_tag.get('data-cms'):
                span_tag['data-cms'] = f"dest_{clean_slug}.tailor_badge"

            h3_tailor = tailor_box.find('h3')
            if h3_tailor and not h3_tailor.get('data-cms'):
                h3_tailor['data-cms'] = f"dest_{clean_slug}.tailor_title"

            p_tailor = tailor_box.find('p')
            if p_tailor and not p_tailor.get('data-cms'):
                p_tailor['data-cms'] = f"dest_{clean_slug}.tailor_desc"

            a_btn = tailor_box.find('a')
            if a_btn:
                if not a_btn.get('data-cms'):
                    a_btn['data-cms'] = f"dest_{clean_slug}.tailor_btn"
                if not a_btn.get('data-cms-link'):
                    a_btn['data-cms-link'] = f"dest_{clean_slug}.tailor_link"

    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    count_updated += 1

print(f"Successfully bound all {count_updated} destination pages with data-cms!")
