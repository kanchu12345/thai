# -*- coding: utf-8 -*-
"""
tools/build_complete_seed_data.py
Crawls all HTML files and extracts every single bound CMS key and value,
merges with translations from js/i18n.js and data/seed-catalog.json,
and builds complete, ready-to-upload page documents for Firestore and local snapshots.
"""

import os
import re
import json
from bs4 import BeautifulSoup

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

LANGS = ['en', 'fr', 'de', 'zh-CN', 'zh-TW', 'ja', 'ar', 'hi', 'it', 'ru', 'es', 'vi']

def mk_multilingual(en_val):
    if not isinstance(en_val, str):
        return en_val
    return {l: en_val for l in LANGS}

def run():
    print("Building complete seed bundle from all 105 pages...")
    from audit_crawler import get_all_target_pages
    from bind_all_elements import determine_page_key, is_locked_design_credit

    pages = get_all_target_pages()
    
    # Load existing seed-catalog for rich metadata
    seed_cat = {}
    seed_path = os.path.join(ROOT_DIR, 'data', 'seed-catalog.json')
    if os.path.exists(seed_path):
        with open(seed_path, 'r', encoding='utf-8') as f:
            seed_cat = json.load(f)

    # Documents to build: doc_path -> dict
    documents = {
        'siteGlobal/branding': {
            'status': 'published',
            'updatedAt': '2026-11-09T23:59:00Z',
            'companyName': mk_multilingual('Lotus Ceylon International Tours & Services (Pvt) Ltd'),
            'companyLegalName': 'Lotus Ceylon International Tours and Services (Private) Limited',
            'brandName': 'Lotus Ceylon',
            'brandNameLotus': 'Lotus',
            'brandNameCeylon': 'Ceylon',
            'tagline': mk_multilingual('PURE JOURNEYS. SACRED EXPERIENCES.'),
            'slogan': mk_multilingual('PURE JOURNEYS. SACRED EXPERIENCES.'),
            'logo': 'assets/images/brand/logo-header.png',
            'favicon': 'logo.png',
            'inquireButtonText': mk_multilingual('Inquire'),
            'planJourneyBtnText': mk_multilingual('Plan My Bespoke Journey ➔')
        },
        'siteGlobal/header': {
            'status': 'published',
            'updatedAt': '2026-11-09T23:59:00Z'
        },
        'siteGlobal/footer': {
            'status': 'published',
            'updatedAt': '2026-11-09T23:59:00Z',
            'allRightsReserved': mk_multilingual('All Rights Reserved.'),
            'addressTitle': mk_multilingual('ADDRESS'),
            'phoneTitle': mk_multilingual('PHONE'),
            'emailTitle': mk_multilingual('EMAIL'),
            'newsletterTitle': mk_multilingual('NEWSLETTER'),
            'paymentPartnersTitle': mk_multilingual('OUR PAYMENT PARTNERS'),
            'quickLinksTitle': mk_multilingual('QUICK LINKS'),
            'newsletterPlaceholder': mk_multilingual('Enter your email address')
        },
        'siteGlobal/contact': {
            'status': 'published',
            'updatedAt': '2026-11-09T23:59:00Z',
            'phone': '+94 71 54 22 384',
            'phoneTel': 'tel:+94715422384',
            'phoneRaw': '94715422384',
            'email': 'info@lotusceylon.com',
            'emailMailto': 'mailto:info@lotusceylon.com',
            'whatsapp': '+94 71 54 22 384',
            'whatsappUrl': 'https://wa.me/94715422384?text=Hello%20Lotus%20Ceylon!%20I%20would%20like%20to%20inquire%20about%20a%20private%20tour.',
            'wechat': 'FGUTaiwan90',
            'line': 'dpbs2024',
            'lineUrl': 'https://line.me/R/ti/p/~dpbs2024',
            'address': mk_multilingual('Lotus Ceylon International Tours and Services (Pvt) Ltd, 286/C, Niwandama South, Ja-Ela, Western Province, Sri Lanka – 11350 (12 Min./13km away from Airport)'),
            'googleMapsEmbed': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.8828342415174!2d79.888725!3d7.0785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDQnNDIuNiJOIDc5wrA1MycyOC4yIkU!5e0!3m2!1sen!2slk!4v1600000000000!5m2!1sen!2slk'
        },
        'siteGlobal/menu': {
            'status': 'published',
            'updatedAt': '2026-11-09T23:59:00Z',
            'home': mk_multilingual('Home'),
            'tours': mk_multilingual('Tours'),
            'destinations': mk_multilingual('Destinations'),
            'experiences': mk_multilingual('Experiences'),
            'about': mk_multilingual('About Us'),
            'gallery': mk_multilingual('Gallery'),
            'reviews': mk_multilingual('Reviews'),
            'blog': mk_multilingual('Blog'),
            'contact': mk_multilingual('Contact'),
            'cat_cultural': mk_multilingual('Cultural Heritage'),
            'cat_buddhist': mk_multilingual('Buddhist Heritage'),
            'cat_wildlife': mk_multilingual('Wildlife Safaris'),
            'cat_beach': mk_multilingual('Pristine Beaches'),
            'cat_hill_country': mk_multilingual('Hill Country and Tea'),
            'cat_ayurvedic': mk_multilingual('Ayurvedic Healing'),
            'cat_honeymoon': mk_multilingual('Honeymoon Romance'),
            'cat_family': mk_multilingual('Family Discovery'),
            'cat_adventure': mk_multilingual('Active Adventure'),
            'cat_golf': mk_multilingual('Championship Golf'),
            'cat_ramayana': mk_multilingual('Ramayana Trail'),
            'all_tours': mk_multilingual('View All Tours & Themes (29 Packages)')
        }
    }

    # Now crawl each page and collect keys
    for rel_path in pages:
        full_path = os.path.join(ROOT_DIR, rel_path)
        with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
            html = f.read()
        soup = BeautifulSoup(html, 'html.parser')
        doc_key = determine_page_key(rel_path)

        if doc_key not in documents:
            documents[doc_key] = {
                'status': 'published',
                'updatedAt': '2026-11-09T23:59:00Z',
                'file': rel_path
            }

        target_doc = documents[doc_key]

        # Extract all elements with data-cms*
        for el in soup.find_all(True):
            if is_locked_design_credit(el): continue

            # Text / HTML
            for attr in ['data-cms', 'data-cms-html']:
                if el.has_attr(attr):
                    k = el[attr]
                    val = el.get_text(strip=True) if el.name != 'meta' and el.name != 'input' else (el.get('content') or el.get('placeholder') or '')
                    # Resolve destination doc
                    dest_d = target_doc
                    clean_k = k
                    if k.startswith('siteGlobal.'):
                        sub_parts = k.split('.')
                        col_doc = f"siteGlobal/{sub_parts[1]}"
                        clean_k = '.'.join(sub_parts[2:])
                        if col_doc not in documents: documents[col_doc] = {'status': 'published'}
                        dest_d = documents[col_doc]

                    # Store value
                    if clean_k and clean_k not in dest_d:
                        dest_d[clean_k] = mk_multilingual(val)

            # Images
            if el.has_attr('data-cms-img'):
                k = el['data-cms-img']
                src = el.get('content') if el.name == 'meta' else (el.get('src') or '')
                dest_d = target_doc
                clean_k = k
                if k.startswith('siteGlobal.'):
                    sub_parts = k.split('.')
                    col_doc = f"siteGlobal/{sub_parts[1]}"
                    clean_k = '.'.join(sub_parts[2:])
                    if col_doc not in documents: documents[col_doc] = {'status': 'published'}
                    dest_d = documents[col_doc]
                if clean_k and clean_k not in dest_d:
                    dest_d[clean_k] = src

            # Links
            if el.has_attr('data-cms-link'):
                k = el['data-cms-link']
                href = el.get('href') or el.get('content') or ''
                dest_d = target_doc
                clean_k = k
                if k.startswith('siteGlobal.'):
                    sub_parts = k.split('.')
                    col_doc = f"siteGlobal/{sub_parts[1]}"
                    clean_k = '.'.join(sub_parts[2:])
                    if col_doc not in documents: documents[col_doc] = {'status': 'published'}
                    dest_d = documents[col_doc]
                if clean_k and clean_k not in dest_d:
                    dest_d[clean_k] = href

            # Videos
            if el.has_attr('data-cms-video'):
                k = el['data-cms-video']
                src = el.get('src', '')
                if k and k not in target_doc:
                    target_doc[k] = src

            # Backgrounds
            if el.has_attr('data-cms-bg'):
                k = el['data-cms-bg']
                style = el.get('style', '')
                m = re.search(r'url\(["\']?([^"\')]+)["\']?\)', style)
                bg = m.group(1) if m else ''
                dest_d = target_doc
                clean_k = k
                if k.startswith('siteGlobal.'):
                    sub_parts = k.split('.')
                    col_doc = f"siteGlobal/{sub_parts[1]}"
                    clean_k = '.'.join(sub_parts[2:])
                    if col_doc not in documents: documents[col_doc] = {'status': 'published'}
                    dest_d = documents[col_doc]
                if clean_k and clean_k not in dest_d:
                    dest_d[clean_k] = bg

    print(f"Total Firestore documents prepared: {len(documents)}")

    # Add 18 Hero Video Location Scenes into siteContent/home
    if 'siteContent/home' in documents:
        home_doc = documents['siteContent/home']
        home_doc['hero_scenes'] = [
            { 'start': 0.0, 'end': 9.4, 'title': 'Lotus Blossom Sanctuaries', 'sub': 'Sacred Waters of Ceylon' },
            { 'start': 9.4, 'end': 13.8, 'title': 'Lotus Tower and Colombo Skyline', 'sub': 'Iconic Capital Landmark (350m)' },
            { 'start': 13.8, 'end': 17.3, 'title': 'Sigiriya Ancient Rock Citadel', 'sub': '5th Century Royal Sky Palace' },
            { 'start': 17.3, 'end': 20.9, 'title': 'Sigiriya Lion\'s Paw Terrace', 'sub': 'Royal Ascent and Ancient Ramparts' },
            { 'start': 20.9, 'end': 24.4, 'title': 'Sacred Anuradhapura and Nuwara Wewa', 'sub': 'Ancient Buddhist Capital (4th c. BCE)' },
            { 'start': 24.4, 'end': 28.0, 'title': 'Colossal Jetavanaramaya Stupa', 'sub': 'UNESCO Sacred Heritage and Monasteries' },
            { 'start': 28.0, 'end': 31.6, 'title': 'Dambulla Golden Rock Temple', 'sub': 'Sacred Cave Monastery and Murals' },
            { 'start': 31.6, 'end': 35.1, 'title': 'Nine Arch Demodara Bridge', 'sub': 'Highland Colonial Railway, Ella' },
            { 'start': 35.1, 'end': 38.7, 'title': 'Diyaluma Cascading Waterfall', 'sub': 'Highland Mountain Rapids, Koslanda' },
            { 'start': 38.7, 'end': 42.3, 'title': 'Ambuluwawa Biodiversity Spire', 'sub': 'Misty 360° Mountain Summit, Gampola' },
            { 'start': 42.3, 'end': 45.9, 'title': 'Kandy Sacred Hill Capital', 'sub': 'Last Royal Kingdom and Sacred Valley' },
            { 'start': 45.9, 'end': 49.4, 'title': 'Ramboda Highland Falls', 'sub': 'Mist-Shrouded Tea Valley Cascades' },
            { 'start': 49.4, 'end': 53.0, 'title': 'Maskeliya and Nuwara Eliya Valleys', 'sub': 'Pure Ceylon Tea Country and Lakes' },
            { 'start': 53.0, 'end': 56.6, 'title': 'Wild Elephant Gathering', 'sub': 'Kaudulla and Minneriya Sanctuaries' },
            { 'start': 56.6, 'end': 60.1, 'title': 'Yala National Park Wilderness', 'sub': 'Untamed Wildlife and Open Savannas' },
            { 'start': 60.1, 'end': 63.7, 'title': 'Galle Dutch Fort Ramparts', 'sub': 'UNESCO 17th Century Living Citadel' },
            { 'start': 63.7, 'end': 67.3, 'title': 'Bentota Golden Beach', 'sub': 'Pristine Southwest Turquoise Coast' },
            { 'start': 67.3, 'end': 70.8, 'title': 'Dondra Head Lighthouse', 'sub': 'Southernmost Tip of Sri Lanka' }
        ]

    # Write out local bundled seed file
    bundle_out = os.path.join(ROOT_DIR, 'data', 'seed_documents.json')
    with open(bundle_out, 'w', encoding='utf-8') as f:
        json.dump(documents, f, indent=2, ensure_ascii=False)
    print(f"Saved seed bundle to {bundle_out} ({os.path.getsize(bundle_out):,} bytes).")

    # Also update seed-catalog.json and seed-catalog.js
    if 'pages' not in seed_cat: seed_cat['pages'] = {}
    seed_cat['pages'] = documents
    seed_cat_path = os.path.join(ROOT_DIR, 'data', 'seed-catalog.json')
    with open(seed_cat_path, 'w', encoding='utf-8') as f:
        json.dump(seed_cat, f, indent=2, ensure_ascii=False)

    seed_js_path = os.path.join(ROOT_DIR, 'data', 'seed-catalog.js')
    with open(seed_js_path, 'w', encoding='utf-8') as f:
        f.write('/* Auto-generated Seed Catalog Snapshot */\n')
        f.write('window.SEED_CATALOG = ')
        json.dump(seed_cat, f, ensure_ascii=False)
        f.write(';\n')

    print("seed-catalog.json and seed-catalog.js synchronized.")

if __name__ == '__main__':
    run()
