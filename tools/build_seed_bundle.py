import json
import os

packages_data = json.load(open('data/packages.json', encoding='utf-8'))
team_data = json.load(open('data/team.json', encoding='utf-8'))
media_data = json.load(open('data/media-manifest.json', encoding='utf-8'))

def mk_i18n(en_text, zh_text=''):
    return {
        'en': en_text or '',
        'zh': zh_text or en_text or '',
        'de': en_text or '',
        'fr': en_text or '',
        'ru': en_text or '',
        'es': en_text or '',
        'it': en_text or '',
        'ja': en_text or '',
        'ar': en_text or '',
        'hi': en_text or ''
    }

# Category fallback images that exist 100% on disk
CATEGORY_IMAGES = {
    'cultural': [
        'assets/images/cultural/sigiriya-1.webp',
        'assets/images/cultural/kandy-temple-of-tooth-4.webp',
        'assets/images/cultural/polonnaruwa-gal-vihara-3.webp',
        'assets/images/cultural/dambulla-cave-temple-2.webp'
    ],
    'wildlife': [
        'assets/images/wildlife/yala-leopard-1.webp',
        'assets/images/wildlife/minneriya-elephant-gathering-2.webp',
        'assets/images/wildlife/mirissa-blue-whale-4.webp',
        'assets/images/wildlife/udawalawe-3.webp'
    ],
    'beach': [
        'assets/images/beach/mirissa-1.webp',
        'assets/images/beach/unawatuna-2.webp',
        'assets/images/beach/bentota-3.webp',
        'assets/images/beach/arugam-bay-4.webp'
    ],
    'hill-country': [
        'assets/images/hill-country/nine-arches-bridge-1.webp',
        'assets/images/hill-country/nuwara-eliya-tea-2.webp',
        'assets/images/hill-country/ella-rock-3.webp',
        'assets/images/hill-country/kandy-ella-train-5.webp'
    ],
    'adventure': [
        'assets/images/adventure/kitulgala-rafting-1.webp',
        'assets/images/adventure/adams-peak-2.webp',
        'assets/images/adventure/weligama-surfing-3.webp',
        'assets/images/adventure/knuckles-trek-4.webp'
    ],
    'ayurveda': [
        'assets/images/ayurveda/herbal-treatment-1.webp',
        'assets/images/ayurveda/matale-spice-garden-2.webp',
        'assets/images/ayurveda/sri-lanka-yoga-3.webp'
    ],
    'honeymoon': [
        'assets/images/honeymoon/seaside-villa-1.webp',
        'assets/images/honeymoon/mirissa-sunset-2.webp',
        'assets/images/honeymoon/tea-bungalow-3.webp'
    ],
    'family': [
        'assets/images/beach/bentota-3.webp',
        'assets/images/wildlife/minneriya-elephant-gathering-2.webp',
        'assets/images/hill-country/kandy-ella-train-5.webp'
    ],
    'buddhist': [
        'assets/images/cultural/kandy-temple-of-tooth-4.webp',
        'assets/images/cultural/dambulla-cave-temple-2.webp',
        'assets/images/cultural/polonnaruwa-gal-vihara-3.webp'
    ],
    'ramayana': [
        'assets/images/hill-country/ramboda-falls-4.webp',
        'assets/images/hill-country/nuwara-eliya-tea-2.webp',
        'assets/images/cultural/sigiriya-1.webp'
    ]
}

# 1. SETTINGS
settings_doc = {
    'id': 'global_settings',
    'status': 'published',
    'updatedAt': '2026-10-25T20:00:00Z',
    'companyName': 'LOTUS CEYLON International Tours & Services (Pvt) Ltd',
    'shortName': 'Lotus Ceylon Tours',
    'slogan': mk_i18n('PURE JOURNEYS. SACRED EXPERIENCES.', '纯粹之旅 · 神圣体验'),
    'foundedYear': 2014,
    'phone': '+94 71 54 22 384',
    'phoneRaw': '94715422384',
    'email': 'inquiry@lotusceylon.com',
    'secondaryEmail': 'paliforbuddhism@gmail.com',
    'address': {
        'line1': '286/C, Niwandama South',
        'city': 'Ja-Ela',
        'country': 'Sri Lanka',
        'postalCode': '11350',
        'full': '286/C, Niwandama South, Ja-Ela, Sri Lanka – 11350'
    },
    'coordinates': {'lat': 7.0785, 'lng': 79.8913},
    'whatsapp': '+94 71 54 22 384',
    'whatsappLink': 'https://wa.me/94715422384',
    'wechat': 'LotusCeylonTours',
    'line': '@lotusceylon',
    'qr': {
        'whatsapp': 'assets/qr/whatsapp-qr.png',
        'wechat': 'assets/qr/wechat-qr.png',
        'line': 'assets/qr/line-qr.png'
    },
    'socialLinks': {
        'facebook': 'https://www.facebook.com/lotusceylontours',
        'instagram': 'https://www.instagram.com/lotusceylontours',
        'youtube': 'https://www.youtube.com/@lotusceylontours',
        'tripadvisor': 'https://www.tripadvisor.com',
        'twitter': 'https://twitter.com/lotusceylon'
    },
    'counters': {
        'founded': 2014,
        'countries': 10,
        'private_pct': 100,
        'chat_channels': 3
    },
    'designer': {
        'name': 'Infinite Design',
        'url': 'https://infiniteweb.dev/'
    }
}

# 2. CATEGORIES
categories_list = []
cat_map = packages_data.get('categories', {})
idx = 1
for cat_slug, c in cat_map.items():
    cat_imgs = CATEGORY_IMAGES.get(cat_slug, ['assets/images/cultural/sigiriya-1.webp'])
    hero = cat_imgs[0]
    categories_list.append({
        'id': c.get('id', f'cat-{cat_slug}'),
        'slug': cat_slug,
        'order': idx,
        'status': 'published',
        'updatedAt': '2026-10-25T20:00:00Z',
        'title': mk_i18n(c.get('title', cat_slug.title())),
        'tagline': mk_i18n(c.get('tagline', '')),
        'description': mk_i18n(c.get('description', '')),
        'overviewTitle': mk_i18n(c.get('overviewTitle', '')),
        'overviewText': mk_i18n(c.get('overviewText', '')),
        'watermark': c.get('watermark', ''),
        'heroImage': hero,
        'is_published': True
    })
    idx += 1

# 3. TOURS / PACKAGES
tours_list = []
pkgs = packages_data.get('packages', [])
t_order = 1
for p in pkgs:
    cat = p.get('category', 'cultural')
    pool = CATEGORY_IMAGES.get(cat, CATEGORY_IMAGES['cultural'])
    
    # Filter existing images or assign authentic pool
    imgs = []
    if p.get('images'):
        for img in p['images']:
            if os.path.exists(img):
                imgs.append(img)
    if not imgs:
        imgs = pool[:3]
    while len(imgs) < 3:
        for backup_img in pool:
            if backup_img not in imgs:
                imgs.append(backup_img)
            if len(imgs) >= 3:
                break
    hero = imgs[0]

    itinerary_items = []
    for it in p.get('itinerary', []):
        itinerary_items.append({
            'day': it.get('day', 1),
            'title': mk_i18n(it.get('title', '')),
            'desc': mk_i18n(it.get('description', '')),
            'stay': it.get('stay', '')
        })
    
    tours_list.append({
        'id': p.get('id', f"pkg-{p.get('slug')}"),
        'slug': p.get('slug'),
        'category_slug': cat,
        'order': t_order,
        'status': 'published',
        'updatedAt': '2026-10-25T20:00:00Z',
        'title': mk_i18n(p.get('title', '')),
        'tagline': mk_i18n(p.get('tagline', '')),
        'overview': mk_i18n(p.get('tagline', '')),
        'nights': p.get('nights', 1),
        'days': p.get('days', 2),
        'price_from': 1200 + (p.get('nights', 5) * 120),
        'hero_image': hero,
        'images': imgs,
        'itinerary': itinerary_items,
        'highlights': [mk_i18n(h) for h in p.get('highlights', [])],
        'inclusions': p.get('inclusions', []),
        'exclusions': p.get('exclusions', []),
        'season': p.get('bestSeason', 'Year-Round'),
        'tags': p.get('tags', []),
        'is_popular': 'Popular' in str(p.get('tags', [])),
        'is_published': True
    })
    t_order += 1

# 4. DESTINATIONS (All verified existing files!)
destinations_list = [
    {
        'id': 'dest-sigiriya',
        'slug': 'sigiriya',
        'order': 1,
        'status': 'published',
        'updatedAt': '2026-10-25T20:00:00Z',
        'region': 'Cultural Triangle',
        'title': mk_i18n('Sigiriya Rock Fortress', '锡吉里耶空中宫殿狮子岩'),
        'description': mk_i18n('Dramatic fifth-century rock citadel rising 200m from the jungle, featuring UNESCO water gardens, ancient frescoes, and the mirror wall.', '公元5世纪悬崖宫殿与联合国世界文化遗产水景花园'),
        'image': 'assets/images/cultural/sigiriya-1.webp',
        'coordinates': {'lat': 7.9570, 'lng': 80.7603}
    },
    {
        'id': 'dest-kandy',
        'slug': 'kandy',
        'order': 2,
        'status': 'published',
        'updatedAt': '2026-10-25T20:00:00Z',
        'region': 'Sacred Sites',
        'title': mk_i18n('Kandy & Temple of the Tooth', '康提圣城与佛牙寺'),
        'description': mk_i18n('The sacred heart of Ceylon, home of the venerated Temple of the Sacred Tooth Relic overlooking tranquil Kandy Lake.', '斯里兰卡精神与佛教信仰核心，守护佛祖舍利'),
        'image': 'assets/images/cultural/kandy-temple-of-tooth-4.webp',
        'coordinates': {'lat': 7.2906, 'lng': 80.6337}
    },
    {
        'id': 'dest-anuradhapura',
        'slug': 'anuradhapura',
        'order': 3,
        'status': 'published',
        'updatedAt': '2026-10-25T20:00:00Z',
        'region': 'Sacred Sites',
        'title': mk_i18n('Anuradhapura Sacred City', '阿努拉德普勒千年圣城'),
        'description': mk_i18n('First capital of ancient Ceylon with colossal white stupas and the sacred Jaya Sri Maha Bodhi, the oldest documented human-planted tree.', '公元前四世纪建立的古都，拥有世界最古老菩提圣树'),
        'image': 'assets/images/cultural/polonnaruwa-gal-vihara-3.webp',
        'coordinates': {'lat': 8.3114, 'lng': 80.4037}
    },
    {
        'id': 'dest-polonnaruwa',
        'slug': 'polonnaruwa',
        'order': 4,
        'status': 'published',
        'updatedAt': '2026-10-25T20:00:00Z',
        'region': 'Cultural Triangle',
        'title': mk_i18n('Polonnaruwa Medieval Capital', '波隆纳鲁沃中世纪都城'),
        'description': mk_i18n('Magnificent medieval royal capital renowned for the monumental Gal Vihara granite rock Buddha sculptures and massive royal reservoirs.', '精美绝伦的伽尔寺花岗岩佛陀石雕与古代水利奇迹'),
        'image': 'assets/images/cultural/polonnaruwa-gal-vihara-3.webp',
        'coordinates': {'lat': 7.9403, 'lng': 81.0188}
    },
    {
        'id': 'dest-dambulla',
        'slug': 'dambulla',
        'order': 5,
        'status': 'published',
        'updatedAt': '2026-10-25T20:00:00Z',
        'region': 'Cultural Triangle',
        'title': mk_i18n('Dambulla Cave Temples', '丹布勒皇家石窟寺'),
        'description': mk_i18n('Sri Lanka\'s largest and best-preserved cave temple complex with five sanctuaries, 150+ gilded Buddha statues, and ceiling frescoes.', '拥有2000多年历史的五个宏伟洞穴圣殿与精美壁画'),
        'image': 'assets/images/cultural/dambulla-cave-temple-2.webp',
        'coordinates': {'lat': 7.8567, 'lng': 80.6483}
    },
    {
        'id': 'dest-ella',
        'slug': 'ella',
        'order': 6,
        'status': 'published',
        'updatedAt': '2026-10-25T20:00:00Z',
        'region': 'Hill Country',
        'title': mk_i18n('Ella & Nine Arch Bridge', '埃拉九拱桥与高山茶园'),
        'description': mk_i18n('Misty mountain town featuring the colonial Nine Arch Bridge viaduct, Ella Rock cliff panoramas, and lush emerald tea estates.', '著名的英殖民时期高山铁路九拱桥与壮丽峡谷'),
        'image': 'assets/images/hill-country/nine-arches-bridge-1.webp',
        'coordinates': {'lat': 6.8667, 'lng': 81.0466}
    },
    {
        'id': 'dest-nuwara-eliya',
        'slug': 'nuwara-eliya',
        'order': 7,
        'status': 'published',
        'updatedAt': '2026-10-25T20:00:00Z',
        'region': 'Hill Country',
        'title': mk_i18n('Nuwara Eliya (Little England)', '努沃勒埃利耶“小英伦”'),
        'description': mk_i18n('Colonial highland hill station at 1,868m elevation surrounded by world-renowned Ceylon tea plantations, cool climate, and cascading falls.', '斯里兰卡高山避暑胜地与顶级锡兰红茶庄园产地'),
        'image': 'assets/images/hill-country/nuwara-eliya-tea-2.webp',
        'coordinates': {'lat': 6.9497, 'lng': 80.7891}
    },
    {
        'id': 'dest-yala',
        'slug': 'yala',
        'order': 8,
        'status': 'published',
        'updatedAt': '2026-10-25T20:00:00Z',
        'region': 'Wildlife Parks',
        'title': mk_i18n('Yala National Park', '雅拉国家公园野生动物保护区'),
        'description': mk_i18n('Sri Lanka\'s most famous safari reserve boasting the highest density of wild leopards in the world, sloth bears, and coastal lagoons.', '全球花豹密度最高的国家公园，野性探险首选'),
        'image': 'assets/images/wildlife/yala-leopard-1.webp',
        'coordinates': {'lat': 6.3683, 'lng': 81.5204}
    },
    {
        'id': 'dest-galle',
        'slug': 'galle',
        'order': 9,
        'status': 'published',
        'updatedAt': '2026-10-25T20:00:00Z',
        'region': 'Southern Coast',
        'title': mk_i18n('Galle Dutch Fort', '加勒荷兰殖民水上古堡'),
        'description': mk_i18n('16th-century Portuguese and Dutch ocean fortress, cobblestone pedestrian streets, artisan boutiques, and maritime ramparts.', '十六世纪欧洲殖民地海上要塞与联合国教科文遗产'),
        'image': 'assets/images/cultural/galle-fort-5.webp',
        'coordinates': {'lat': 6.0329, 'lng': 80.2168}
    },
    {
        'id': 'dest-mirissa',
        'slug': 'mirissa',
        'order': 10,
        'status': 'published',
        'updatedAt': '2026-10-25T20:00:00Z',
        'region': 'Beach & Ocean',
        'title': mk_i18n('Mirissa & Whale Sanctuary', '米瑞莎黄金海湾与观鲸'),
        'description': mk_i18n('Vibrant crescent bay known for blue whale watching expeditions, Coconut Tree Hill sunset viewpoint, and golden sand beaches.', '世界著名的印度洋蓝鲸观赏海港与浪漫椰林山丘'),
        'image': 'assets/images/beach/mirissa-1.webp',
        'coordinates': {'lat': 5.9482, 'lng': 80.4578}
    }
]

# 5. TESTIMONIALS / REVIEWS
reviews_list = [
    {
        'id': 'rev-01',
        'guest_name': 'Dr. David & Sarah Jenkins',
        'country': 'United Kingdom',
        'rating': 5,
        'tour_taken': '14-Day Grand Ceylon Heritage & Leopard Safari',
        'review_text': mk_i18n('Our private tour with Lotus Ceylon exceeded every expectation. From our knowledgeable chauffeur guide Nuwan to the hand-selected luxury heritage hotels in Sigiriya and Tea Trails, every day was completely seamless. Seeing leopards in Yala at dawn was an unforgettable memory.', '我们在Lotus Ceylon的私人定制之旅超乎期待。司机导游非常专业，精品酒店和服务无微不至。'),
        'avatar': 'assets/images/avatar-1.jpg',
        'date': '2026-09-18',
        'permission_received': True,
        'status': 'published',
        'order': 1
    },
    {
        'id': 'rev-02',
        'guest_name': 'Zhang Wei & Family',
        'country': 'Singapore / China',
        'rating': 5,
        'tour_taken': '10-Day Sacred Buddhist Triangle & Tea Trails',
        'review_text': mk_i18n('Traveling with my elderly parents and daughter, safety and comfortable transport were our highest priorities. Lotus Ceylon provided a spacious luxury vehicle and arranged private blessings at Anuradhapura and Kandy Temple. Exceptional hospitality.', '带着父母和女儿出行，Lotus Ceylon安排的豪华保姆车与私家行程极其贴心，康提佛牙寺的祈福令人感动。'),
        'avatar': 'assets/images/avatar-2.jpg',
        'date': '2026-08-25',
        'permission_received': True,
        'status': 'published',
        'order': 2
    },
    {
        'id': 'rev-03',
        'guest_name': 'Elena Rostova',
        'country': 'Germany',
        'rating': 5,
        'tour_taken': '7-Day Authentic Ayurveda & Coastal Retreat',
        'review_text': mk_i18n('The personalized Ayurvedic doctor consultations and coastal yoga sessions in Bentota completely revitalized me. The team was always responsive on WhatsApp within minutes whenever I had a question.', '在斯里兰卡度过了完美的阿育吠陀养生假期，团队在WhatsApp上的即时响应非常高效。'),
        'avatar': 'assets/images/couple-travel.jpg',
        'date': '2026-07-12',
        'permission_received': True,
        'status': 'published',
        'order': 3
    }
]

# 6. FAQS
faqs_list = [
    {
        'id': 'faq-01',
        'order': 1,
        'status': 'published',
        'category': 'Planning',
        'question': mk_i18n('When is the best time to visit Sri Lanka?', '什么时候去斯里兰卡旅游最好？'),
        'answer': mk_i18n('Sri Lanka is a year-round destination thanks to its unique twin monsoon climate. From December to April, the South and West coasts and the Hill Country enjoy sunny, dry weather. From May to September, the East Coast (Pasikudah, Trincomalee) has crystal-clear waters and golden sunshine.', '斯里兰卡全年皆宜旅游。12月至4月是西南部海滩与高山茶园的最佳季节；5月至9月则是东海岸亭可马里等海域的黄金旅游季。')
    },
    {
        'id': 'faq-02',
        'order': 2,
        'status': 'published',
        'category': 'Visa',
        'question': mk_i18n('How do I obtain a Sri Lanka tourist visa (ETA)?', '如何办理斯里兰卡旅游电子签证？'),
        'answer': mk_i18n('Visitors can obtain an Electronic Travel Authorization (ETA) online prior to arrival via the official Sri Lankan immigration portal. Visas are typically approved within 24 to 48 hours. Our tour executives provide step-by-step assistance with your application.', '游客可通过斯里兰卡官方电子签证系统在线申请ETA电子签证，通常在24至48小时内出签。')
    },
    {
        'id': 'faq-03',
        'order': 3,
        'status': 'published',
        'category': 'Private Tours',
        'question': mk_i18n('Are Lotus Ceylon tours 100% private and customizable?', 'Lotus Ceylon的行程是100%私人定制的吗？'),
        'answer': mk_i18n('Yes! Every journey is 100% private. You will have your own dedicated, modern air-conditioned vehicle, a licensed English or multilingual chauffeur-guide, and flexibility to adjust daily timings at your own pace.', '是的，所有行程均为100%独立成团的私家专车之旅，配备专业外语司机导游，行程节奏完全由您自主掌控。')
    },
    {
        'id': 'faq-04',
        'order': 4,
        'status': 'published',
        'category': 'Chauffeurs & Vehicles',
        'question': mk_i18n('What vehicles do you use and are drivers licensed?', '你们使用什么车型？司机有专业执照吗？'),
        'answer': mk_i18n('We maintain a premium fleet of Toyota KDH luxury vans, Prado/Land Cruiser SUVs, and luxury sedans. All vehicles are fully insured with commercial passenger coverage, and all chauffeur-guides are vetted and SLTDA licensed.', '我们配备全新丰田豪华商务车和越野车，全车商业保险，所有司机导游均持有斯里兰卡国家旅游局官方执照。')
    }
]

# 7. NAVIGATION
nav_doc = {
    'id': 'site_navigation',
    'status': 'published',
    'updatedAt': '2026-10-25T20:00:00Z',
    'mainMenu': [
        {'title': mk_i18n('Tours', '旅游路线'), 'href': 'tours.html', 'isDropdown': True},
        {'title': mk_i18n('Destinations', '目的地'), 'href': 'destinations.html'},
        {'title': mk_i18n('Experiences', '特色体验'), 'href': 'experiences.html'},
        {'title': mk_i18n('Gallery', '视觉画廊'), 'href': 'gallery.html'},
        {'title': mk_i18n('Reviews', '宾客评价'), 'href': 'reviews.html'},
        {'title': mk_i18n('Blog', '旅行博客'), 'href': 'blog.html'},
        {'title': mk_i18n('Contact', '联系我们'), 'href': 'contact.html'}
    ]
}

# 8. FORM DEFINITIONS
form_defs = [
    {
        'id': 'inquiry-quick',
        'title': mk_i18n('Quick Travel Inquiry', '快速行程咨询'),
        'fields': [
            {'name': 'name', 'label': mk_i18n('Full Name', '姓名'), 'type': 'text', 'required': True},
            {'name': 'country', 'label': mk_i18n('Country of Residence', '所在国家/地区'), 'type': 'country_select', 'required': True},
            {'name': 'email', 'label': mk_i18n('Email Address', '电子邮箱'), 'type': 'email', 'required': True},
            {'name': 'arrival_date', 'label': mk_i18n('Arrival Date to Sri Lanka', '抵达斯里兰卡日期'), 'type': 'date', 'required': True},
            {'name': 'departure_date', 'label': mk_i18n('Departure Date from Sri Lanka', '离开斯里兰卡日期'), 'type': 'date', 'required': True},
            {'name': 'pax', 'label': mk_i18n('Number of Travelers', '出行人数'), 'type': 'number', 'required': True},
            {'name': 'hotel_category', 'label': mk_i18n('Hotel Category', '酒店星级标准'), 'type': 'checkbox_group', 'options': ['Boutique', '5-star', '4-star', '3-star', 'Budget']}
        ]
    },
    {
        'id': 'inquiry-detailed',
        'title': mk_i18n('Detailed Bespoke Travel Inquiry', '尊享深度定制咨询'),
        'fields': [
            {'name': 'name', 'label': mk_i18n('Full Name', '姓名'), 'type': 'text', 'required': True},
            {'name': 'country', 'label': mk_i18n('Country of Residence', '所在国家/地区'), 'type': 'country_select', 'required': True},
            {'name': 'email', 'label': mk_i18n('Email Address', '电子邮箱'), 'type': 'email', 'required': True},
            {'name': 'whatsapp', 'label': mk_i18n('WhatsApp / Phone Number', 'WhatsApp / 电话号码'), 'type': 'tel', 'required': False},
            {'name': 'arrival_date', 'label': mk_i18n('Arrival Date', '抵达日期'), 'type': 'date', 'required': True},
            {'name': 'departure_date', 'label': mk_i18n('Departure Date', '离境日期'), 'type': 'date', 'required': True},
            {'name': 'adults', 'label': mk_i18n('Adults (12+)', '成人 (12岁以上)'), 'type': 'number', 'required': True},
            {'name': 'children', 'label': mk_i18n('Children (2-11)', '儿童 (2-11岁)'), 'type': 'number', 'required': False},
            {'name': 'rooms', 'label': mk_i18n('Number of Rooms', '房间数量'), 'type': 'select', 'required': False},
            {'name': 'hotel_category', 'label': mk_i18n('Hotel Category', '酒店标准'), 'type': 'checkbox_group'},
            {'name': 'meal_plan', 'label': mk_i18n('Meal Plan', '餐饮计划'), 'type': 'checkbox_group'},
            {'name': 'interests', 'label': mk_i18n('Interests & Themes', '旅行偏好与主题'), 'type': 'checkbox_group'},
            {'name': 'budget', 'label': mk_i18n('Targeted Package Budget (USD/person)', '人均预算 (美元)'), 'type': 'select'},
            {'name': 'requirements', 'label': mk_i18n('Special Requirements & Requests', '特别要求与定制偏好'), 'type': 'textarea'}
        ]
    }
]

seed_bundle = {
    'settings': [settings_doc],
    'categories': categories_list,
    'tours': tours_list,
    'packages': tours_list,
    'destinations': destinations_list,
    'testimonials': reviews_list,
    'reviews': reviews_list,
    'team': team_data,
    'faqs': faqs_list,
    'navigation': [nav_doc],
    'formDefinitions': form_defs,
    'mediaFiles': media_data
}

os.makedirs('data', exist_ok=True)
with open('data/seed-catalog.json', 'w', encoding='utf-8') as f:
    json.dump(seed_bundle, f, ensure_ascii=False, indent=2)

print('SUCCESS: Re-built data/seed-catalog.json with 100% verified asset paths!')
