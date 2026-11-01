import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('data/seed-catalog.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

new_id = "ella-hands-on-tea-making-experience"

# Check if already present
existing = [b for b in d.get('blog', []) if b.get('id') == new_id]
if not existing:
    new_blog = {
        "id": new_id,
        "slug": new_id,
        "title": {
            "en": "Ella: Hands-On Tea Making Experience with Tasting",
            "fr": "Ella : Expérience Pratique de Fabrication et Dégustation de Thé",
            "de": "Ella: Traditionelle Teeherstellung & Verkostung zum Mitmachen",
            "zh-CN": "埃拉：沉浸式锡兰手工制茶与品鉴体验",
            "zh-TW": "埃拉：沉浸式錫蘭手工製茶與品鑑體驗",
            "ru": "Элла: Практический мастер-класс по производству и дегустации чая",
            "es": "Ella: Experiencia Práctica de Elaboración y Cata de Té de Ceilán",
            "it": "Ella: Esperienza Pratica di Lavorazione e Degustazione del Tè",
            "ja": "エッラ：伝統の手もみ製茶体験とプレミアム紅茶テイスティング",
            "ar": "إيلا: تجربة عملية لصنع وتذوق شاي سيلان الفاخر",
            "hi": "एला: हाथों से चाय बनाने का अनुभव और चाय चखना"
        },
        "category": "Hill Country & Tea",
        "cover": "assets/images/blog/ella-tea-making-experience.webp",
        "author": "Lotus Ceylon Destination Specialists",
        "date": "2026-11-01",
        "readTime": "6 min read",
        "rating": 4.9,
        "reviewsCount": 100,
        "excerpt": {
            "en": "Discover the heart of Sri Lanka’s tea culture with a hands-on tea making experience in Ella. Learn the art of tea making, from plucking leaves to brewing the perfect cup.",
            "fr": "Découvrez le cœur de la culture du thé au Sri Lanka avec un atelier pratique à Ella : cueillette, flétrissage, roulage à la main et dégustation.",
            "de": "Erleben Sie das Herz der Teekultur Sri Lankas mit einem Mitmach-Workshop in Ella – vom Pflücken frischer Blätter bis zum perfekten Aufguss.",
            "zh-CN": "在埃拉亲身体验斯里兰卡茶文化的心脏：从采摘一芽二叶、手工揉捻到炭火烘焙与大师级品茶全过程。",
            "zh-TW": "在埃拉親身體驗斯里蘭卡茶文化的心臟：從採摘一芽二葉、手工揉捻到炭火烘焙與大師級品茶全過程。",
            "ru": "Откройте для себя чайную культуру Шри-Ланки в Элле: от сбора чайного листа до традиционного скручивания и дегустации.",
            "es": "Descubra el corazón de la cultura del té en Sri Lanka con una experiencia interactiva en Ella, desde la recolección hasta la cata sensorial.",
            "it": "Scopri il cuore della cultura del tè dello Sri Lanka con un laboratorio pratico a Ella: dalla raccolta alla degustazione guidata.",
            "ja": "エッラの山岳パビリオンで本場セイロンティー作りを体験。手摘みから手もみ、焙煎、本格テイスティングまでを満喫。",
            "ar": "اكتشف جوهر ثقافة الشاي في سريلانكا من خلال تجربة عملية في إيلا: من قطف الأوراق إلى التخمير والتحميص والتذوق.",
            "hi": "एला में श्रीलंका की चाय संस्कृति का प्रत्यक्ष अनुभव करें: ताजी पत्तियां तोड़ने से लेकर हाथ से चाय बनाने और चखने तक।"
        },
        "contentHtml": {
            "en": "<p>Discover the heart of Sri Lanka’s tea culture with an authentic hands-on tea making experience in Ella...</p>"
        }
    }
    d['blog'].insert(0, new_blog)
    with open('data/seed-catalog.json', 'w', encoding='utf-8') as f:
        json.dump(d, f, indent=2, ensure_ascii=False)
    print("Added ella-hands-on-tea-making-experience to data/seed-catalog.json!")
else:
    print("Already in seed-catalog.json")
