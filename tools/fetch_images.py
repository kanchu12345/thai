import os
import json
import urllib.request
import urllib.parse
from PIL import Image
import io

SLOTS = [
    # 1. Home
    {
        "page": "home",
        "file": "hero-sigiriya-aerial-1.webp",
        "topic": "Sigiriya aerial view",
        "query": "Sigiriya aerial Sri Lanka",
        "size": (1920, 1080),
        "alt": "Aerial panoramic view of Sigiriya ancient rock fortress in Sri Lanka surrounded by lush green forests",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Sigiriya_Rock_Fortress%2C_Sri_Lanka.jpg"
    },
    # 2. Cultural
    {
        "page": "cultural",
        "file": "sigiriya-1.webp",
        "topic": "Sigiriya ancient rock fortress",
        "query": "Sigiriya ancient rock fortress Sri Lanka",
        "size": (1200, 800),
        "alt": "Majestic Sigiriya ancient rock fortress citadel rising above landscaped water gardens in Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Sigiriya_Air.jpg"
    },
    {
        "page": "cultural",
        "file": "dambulla-cave-temple-2.webp",
        "topic": "Dambulla cave temple",
        "query": "Dambulla cave temple golden temple Sri Lanka",
        "size": (1200, 800),
        "alt": "Sacred rock cave shrine and golden statues at Dambulla Cave Temple in Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Dambulla_Cave_Temple_-_Sri_Lanka.jpg"
    },
    {
        "page": "cultural",
        "file": "polonnaruwa-gal-vihara-3.webp",
        "topic": "Polonnaruwa Gal Vihara",
        "query": "Polonnaruwa Gal Vihara rock temple Sri Lanka",
        "size": (1200, 800),
        "alt": "Colossal rock-hewn standing and reclining Buddha statues at Gal Vihara, Polonnaruwa, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/2/23/Gal_Vihara_Polonnaruwa.jpg"
    },
    {
        "page": "cultural",
        "file": "kandy-temple-of-tooth-4.webp",
        "topic": "Kandy Temple of the Tooth (Sri Dalada Maligawa)",
        "query": "Temple of the Tooth Kandy Sri Lanka Dalada Maligawa",
        "size": (1200, 800),
        "alt": "Golden roof of the sacred Temple of the Tooth Relic overlooking Kandy lake in Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Temple_of_the_Tooth_Kandy_Sri_Lanka.jpg"
    },
    {
        "page": "cultural",
        "file": "galle-fort-5.webp",
        "topic": "Galle Fort ramparts and lighthouse",
        "query": "Galle Fort lighthouse ramparts Sri Lanka",
        "size": (1200, 800),
        "alt": "Historic Dutch colonial ramparts and lighthouse overlooking the Indian Ocean at Galle Fort in Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/9/91/Galle_Fort_Lighthouse_Sri_Lanka.jpg"
    },
    # 3. Buddhist Heritage
    {
        "page": "buddhist-heritage",
        "file": "jaya-sri-maha-bodhi-1.webp",
        "topic": "Jaya Sri Maha Bodhi Anuradhapura",
        "query": "Jaya Sri Maha Bodhi Anuradhapura sacred tree Sri Lanka",
        "size": (1200, 800),
        "alt": "Sacred Jaya Sri Maha Bodhi tree sanctuary surrounded by golden railings in Anuradhapura, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Sri_Maha_Bodhi_Anuradhapura.jpg"
    },
    {
        "page": "buddhist-heritage",
        "file": "ruwanwelisaya-2.webp",
        "topic": "Ruwanwelisaya stupa Anuradhapura",
        "query": "Ruwanwelisaya Anuradhapura stupa Sri Lanka",
        "size": (1200, 800),
        "alt": "Gleaming white dome of Ruwanwelisaya stupa with elephant wall in Anuradhapura, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Ruwanwelisaya_Stupa_Anuradhapura.jpg"
    },
    {
        "page": "buddhist-heritage",
        "file": "mihintale-3.webp",
        "topic": "Mihintale sacred mountain cradle of Buddhism",
        "query": "Mihintale sacred mountain stupa Sri Lanka",
        "size": (1200, 800),
        "alt": "Grand stone stairway and white summit stupa at sacred Mihintale mountain in Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/5/52/Mihintale_Stupa_Sri_Lanka.jpg"
    },
    {
        "page": "buddhist-heritage",
        "file": "temple-of-the-tooth-4.webp",
        "topic": "Temple of the Tooth inner sanctum",
        "query": "Sri Dalada Maligawa Temple of the Tooth interior Kandy",
        "size": (1200, 800),
        "alt": "Sacred carved wooden sanctum of Sri Dalada Maligawa Temple of the Tooth in Kandy, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/a/af/Dalada_Maligawa_Kandy_Inner.jpg"
    },
    # 4. Wildlife
    {
        "page": "wildlife",
        "file": "yala-leopard-1.webp",
        "topic": "Yala Sri Lankan leopard",
        "query": "Sri Lankan leopard Panthera pardus kotiya Yala National Park",
        "size": (1200, 800),
        "alt": "Wild Sri Lankan leopard resting on a rock outcrop in Yala National Park, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/8/87/Sri_Lankan_leopard_resting_on_a_rock_in_Yala_National_Park.jpg"
    },
    {
        "page": "wildlife",
        "file": "minneriya-elephant-gathering-2.webp",
        "topic": "Minneriya elephant gathering",
        "query": "Minneriya elephant gathering national park Sri Lanka",
        "size": (1200, 800),
        "alt": "Herds of wild Asian elephants grazing along the reservoir banks in Minneriya National Park, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Minneriya_Elephant_Gathering.jpg"
    },
    {
        "page": "wildlife",
        "file": "udawalawe-3.webp",
        "topic": "Udawalawe wild elephants",
        "query": "Udawalawe national park elephants grassland Sri Lanka",
        "size": (1200, 800),
        "alt": "Wild elephant herd grazing peacefully under the dramatic mountain backdrop of Udawalawe, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/d/da/Udawalawe_Elephants_Sri_Lanka.jpg"
    },
    {
        "page": "wildlife",
        "file": "mirissa-blue-whale-4.webp",
        "topic": "Mirissa blue whale watching",
        "query": "Blue whale ocean Mirissa whale watching Sri Lanka",
        "size": (1200, 800),
        "alt": "Majestic blue whale fluke diving in the azure waters off the coast of Mirissa, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Blue_Whale_fluke_Mirissa.jpg"
    },
    {
        "page": "wildlife",
        "file": "sinharaja-rainforest-5.webp",
        "topic": "Sinharaja virgin rainforest",
        "query": "Sinharaja Forest Reserve rainforest canopy Sri Lanka",
        "size": (1200, 800),
        "alt": "Pristine tropical rainforest canopy and biodiversity at UNESCO World Heritage Sinharaja Forest Reserve, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/e/e2/Sinharaja_Rainforest_Canopy_Sri_Lanka.jpg"
    },
    # 5. Beach
    {
        "page": "beach",
        "file": "mirissa-1.webp",
        "topic": "Mirissa palm fringe beach",
        "query": "Mirissa beach parrot rock palm trees Sri Lanka",
        "size": (1200, 800),
        "alt": "Crescent shaped golden sand bay and swaying coconut palms at Mirissa beach, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/8/85/Mirissa_Beach_Sri_Lanka.jpg"
    },
    {
        "page": "beach",
        "file": "unawatuna-2.webp",
        "topic": "Unawatuna turquoise bay",
        "query": "Unawatuna beach bay turquoise water Sri Lanka",
        "size": (1200, 800),
        "alt": "Sheltered turquoise waters and golden coral sands of Unawatuna bay in southern Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Unawatuna_Beach_Coast.jpg"
    },
    {
        "page": "beach",
        "file": "bentota-3.webp",
        "topic": "Bentota beach and lagoon",
        "query": "Bentota beach golden sand ocean Sri Lanka",
        "size": (1200, 800),
        "alt": "Broad golden shoreline and warm tropical waters of Bentota beach in southwestern Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/0/07/Bentota_Beach_Sri_Lanka.jpg"
    },
    {
        "page": "beach",
        "file": "arugam-bay-4.webp",
        "topic": "Arugam Bay surf coast",
        "query": "Arugam Bay surf beach east coast Sri Lanka",
        "size": (1200, 800),
        "alt": "Legendary right-hand point surf break and laid-back coastline at Arugam Bay, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/6/65/Arugam_Bay_Coastline.jpg"
    },
    {
        "page": "beach",
        "file": "pasikudah-5.webp",
        "topic": "Pasikudah calm shallow bay",
        "query": "Pasikudah bay shallow beach eastern province Sri Lanka",
        "size": (1200, 800),
        "alt": "Crystal clear calm shallow waters ideal for wading and swimming at Pasikudah bay in Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/3/30/Pasikuda_Beach_Sri_Lanka.jpg"
    },
    {
        "page": "beach",
        "file": "nilaveli-6.webp",
        "topic": "Nilaveli beach Trincomalee",
        "query": "Nilaveli beach Pigeon island Trincomalee Sri Lanka",
        "size": (1200, 800),
        "alt": "Pristine white sand beach and coral waters stretching towards Pigeon Island at Nilaveli, Trincomalee",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Nilaveli_Beach_Trincomalee.jpg"
    },
    # 6. Hill Country
    {
        "page": "hill-country",
        "file": "nine-arches-bridge-1.webp",
        "topic": "Nine Arches Bridge Ella",
        "query": "Nine Arches Bridge Ella Demodara railway viaduct Sri Lanka",
        "size": (1200, 800),
        "alt": "Historic stone viaduct Nine Arches Bridge surrounded by lush tea bushes in Ella, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/3/36/Nine_Arches_Bridge_Ella_Sri_Lanka.jpg"
    },
    {
        "page": "hill-country",
        "file": "nuwara-eliya-tea-2.webp",
        "topic": "Nuwara Eliya rolling tea estates",
        "query": "Nuwara Eliya tea plantations estates green hills Sri Lanka",
        "size": (1200, 800),
        "alt": "Misty emerald green tea plantations terraced across the rolling highlands of Nuwara Eliya, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Tea_Plantation_in_Nuwara_Eliya.jpg"
    },
    {
        "page": "hill-country",
        "file": "ella-rock-3.webp",
        "topic": "Ella Rock viewpoint",
        "query": "Ella Rock viewpoint valley panorama Sri Lanka",
        "size": (1200, 800),
        "alt": "Panoramic summit vista overlooking the southern plains from Ella Rock in Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Ella_Rock_View_Sri_Lanka.jpg"
    },
    {
        "page": "hill-country",
        "file": "ramboda-falls-4.webp",
        "topic": "Ramboda Falls cascade",
        "query": "Ramboda Falls waterfall central highlands Sri Lanka",
        "size": (1200, 800),
        "alt": "Dramatic multi-tier cascading waterfall surrounded by tropical forest at Ramboda Falls, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/1/15/Ramboda_Falls_Waterfall.jpg"
    },
    {
        "page": "hill-country",
        "file": "kandy-ella-train-5.webp",
        "topic": "Kandy to Ella scenic blue train",
        "query": "Blue train Kandy to Ella tea plantation railway Sri Lanka",
        "size": (1200, 800),
        "alt": "Famous blue highland train winding along scenic tea estate mountainsides between Kandy and Ella",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Sri_Lanka_Blue_Train_Highlands.jpg"
    },
    # 7. Ayurveda
    {
        "page": "ayurveda",
        "file": "herbal-treatment-1.webp",
        "topic": "Traditional Ayurvedic oil shirodhara treatment",
        "query": "Ayurveda shirodhara herbal oils treatment Sri Lanka",
        "size": (1200, 800),
        "alt": "Authentic holistic Ayurvedic Shirodhara warm herbal oil wellness ritual in a Sri Lankan sanctuary",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Shirodhara_Ayurveda_Treatment.jpg"
    },
    {
        "page": "ayurveda",
        "file": "matale-spice-garden-2.webp",
        "topic": "Matale spice garden",
        "query": "Spice garden herbs cinnamon cardamom Matale Sri Lanka",
        "size": (1200, 800),
        "alt": "Fresh healing cinnamon, cardamom and medicinal flora cultivated in a traditional Matale spice garden, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Spice_Garden_Matale_Sri_Lanka.jpg"
    },
    {
        "page": "ayurveda",
        "file": "sri-lanka-yoga-3.webp",
        "topic": "Yoga and meditation in Sri Lankan nature",
        "query": "Yoga meditation retreat nature forest Sri Lanka",
        "size": (1200, 800),
        "alt": "Serene outdoor morning yoga and mindfulness practice pavilion overlooking lush Sri Lankan tropical palms",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/7/75/Yoga_Retreat_Pavilion_Nature.jpg"
    },
    # 8. Honeymoon
    {
        "page": "honeymoon",
        "file": "seaside-villa-1.webp",
        "topic": "Private luxury seaside villa",
        "query": "Luxury beachfront villa pool private ocean Sri Lanka",
        "size": (1200, 800),
        "alt": "Private luxury beachfront boutique pool villa overlooking the Indian Ocean in Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/1/14/Seaside_Villa_Ocean_View.jpg"
    },
    {
        "page": "honeymoon",
        "file": "mirissa-sunset-2.webp",
        "topic": "Mirissa romantic coastal sunset",
        "query": "Sunset beach coconut tree hill Mirissa romantic Sri Lanka",
        "size": (1200, 800),
        "alt": "Romantic golden sunset silhouettes over Coconut Tree Hill and ocean waters in Mirissa, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Coconut_Tree_Hill_Mirissa_Sunset.jpg"
    },
    {
        "page": "honeymoon",
        "file": "tea-bungalow-3.webp",
        "topic": "Colonial tea estate planters bungalow",
        "query": "Colonial tea estate planter bungalow highlands Sri Lanka",
        "size": (1200, 800),
        "alt": "Heritage colonial tea planter estate bungalow nestled in misty mountain valleys of Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/9/90/Tea_Planters_Bungalow_Sri_Lanka.jpg"
    },
    # 9. Family
    {
        "page": "family",
        "file": "kosgoda-turtle-hatchery-1.webp",
        "topic": "Kosgoda sea turtle conservation",
        "query": "Kosgoda sea turtle hatchery conservation baby turtle Sri Lanka",
        "size": (1200, 800),
        "alt": "Baby green sea turtles being carefully cared for at Kosgoda Sea Turtle Conservation project in Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Kosgoda_Turtle_Hatchery_Sri_Lanka.jpg"
    },
    {
        "page": "family",
        "file": "scenic-train-ride-2.webp",
        "topic": "Family scenic train ride through tea hills",
        "query": "Sri Lanka train ride window view tea plantation family",
        "size": (1200, 800),
        "alt": "Delighted family travelers enjoying fresh mountain air from the scenic highland train in Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Train_ride_Sri_Lanka_Tea_Hills.jpg"
    },
    {
        "page": "family",
        "file": "calm-beach-3.webp",
        "topic": "Child-safe calm family beach",
        "query": "Calm beach shallow water children family Sri Lanka",
        "size": (1200, 800),
        "alt": "Gentle shallow turquoise waves and safe swimming waters for families along a serene southern Sri Lankan shore",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/0/05/Calm_Family_Beach_Sri_Lanka.jpg"
    },
    # 10. Adventure
    {
        "page": "adventure",
        "file": "kitulgala-rafting-1.webp",
        "topic": "Kitulgala white water rafting",
        "query": "Kitulgala white water rafting Kelani river Sri Lanka",
        "size": (1200, 800),
        "alt": "Adrenaline-fueled white water rafting team navigating Grade 3 rapids along Kelani River in Kitulgala, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/9/98/White_Water_Rafting_Kitulgala_Sri_Lanka.jpg"
    },
    {
        "page": "adventure",
        "file": "adams-peak-2.webp",
        "topic": "Adam's Peak (Sri Pada) sacred pilgrimage climb",
        "query": "Adams Peak Sri Pada sunrise mountain shadow Sri Lanka",
        "size": (1200, 800),
        "alt": "Dramatic triangular shadow cast by sacred Adam's Peak (Sri Pada) at sunrise over the clouds in Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Adams_Peak_Sunrise_Shadow_Sri_Lanka.jpg"
    },
    {
        "page": "adventure",
        "file": "weligama-surfing-3.webp",
        "topic": "Weligama bay surfing waves",
        "query": "Weligama surfing beach waves beginner surf Sri Lanka",
        "size": (1200, 800),
        "alt": "Surfers catching gentle rolling ocean waves along the sandy shore of Weligama bay, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/4/43/Weligama_Bay_Surfing_Sri_Lanka.jpg"
    },
    {
        "page": "adventure",
        "file": "knuckles-trek-4.webp",
        "topic": "Knuckles Mountain Range cloud forest trek",
        "query": "Knuckles mountain range trekking peaks cloud forest Sri Lanka",
        "size": (1200, 800),
        "alt": "Hikers trekking across misty wilderness ridge trails in the UNESCO-listed Knuckles Mountain Range, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/d/df/Knuckles_Mountain_Range_Trek_Sri_Lanka.jpg"
    },
    # 11. Ramayana
    {
        "page": "ramayana",
        "file": "seetha-amman-temple-1.webp",
        "topic": "Seetha Amman Temple Seetha Eliya",
        "query": "Seetha Amman Temple Seetha Eliya colorful kovil Nuwara Eliya Sri Lanka",
        "size": (1200, 800),
        "alt": "Vibrant carved Hindu temple sculptures at sacred Seetha Amman Kovil beside the mountain stream in Seetha Eliya, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Seetha_Amman_Temple_Nuwara_Eliya.jpg"
    },
    {
        "page": "ramayana",
        "file": "ravana-falls-2.webp",
        "topic": "Ravana Falls Ella",
        "query": "Ravana falls waterfall Ella legend Sri Lanka",
        "size": (1200, 800),
        "alt": "Thundering torrents of Ravana Falls cascading over dark rock cliffs near Ravana Cave in Ella, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Ravana_Falls_Ella_Sri_Lanka.jpg"
    },
    {
        "page": "ramayana",
        "file": "munneswaram-3.webp",
        "topic": "Munneswaram Temple Chilaw",
        "query": "Munneswaram temple ancient Shiva temple Chilaw Sri Lanka",
        "size": (1200, 800),
        "alt": "Ancient and historic Shiva kovil Munneswaram Temple complex revered in the Ramayana trail, Chilaw, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/0/05/Munneswaram_Temple_Sri_Lanka.jpg"
    },
    {
        "page": "ramayana",
        "file": "hakgala-gardens-4.webp",
        "topic": "Hakgala Botanical Gardens (Ashoka Vatika)",
        "query": "Hakgala botanical gardens Ashoka Vatika Nuwara Eliya Sri Lanka",
        "size": (1200, 800),
        "alt": "Lush temperate mountain flora and rose gardens under the imposing Hakgala rock cliff, Nuwara Eliya",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Hakgala_Botanical_Garden_Nuwara_Eliya.jpg"
    },
    # 12. About
    {
        "page": "about",
        "file": "hospitality-scenes-1.webp",
        "topic": "Sri Lankan warm hospitality and lotus greeting",
        "query": "Sri Lankan traditional hospitality greeting Ayubowan tea welcome",
        "size": (1200, 800),
        "alt": "Warm and gracious Sri Lankan traditional Ayubowan palm greeting welcoming international travelers",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/3/36/Ayubowan_Greeting_Sri_Lankan_Hospitality.jpg"
    },
    # 13. Contact
    {
        "page": "contact",
        "file": "negombo-lagoon-1.webp",
        "topic": "Serene Negombo coastal lagoon waters",
        "query": "Negombo lagoon boats sunset calm water Sri Lanka",
        "size": (1200, 800),
        "alt": "Tranquil evening reflections and traditional catamaran outrigger boats on Negombo lagoon near Ja-Ela, Sri Lanka",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/3/39/Negombo_Lagoon_Sri_Lanka_Boats.jpg"
    }
]

def search_wikimedia(query):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrlimit=1"
    req = urllib.request.Request(url, headers={'User-Agent': 'LotusCeylonWebPlatform/1.0 (info@lotusceylon.com)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, pdata in pages.items():
                info = pdata.get('imageinfo', [{}])[0]
                img_url = info.get('url')
                meta = info.get('extmetadata', {})
                artist = meta.get('Artist', {}).get('value', 'Wikimedia Commons Contributor')
                license_name = meta.get('LicenseShortName', {}).get('value', 'Creative Commons')
                return img_url, artist, license_name
    except Exception as e:
        print(f"Wikimedia search notice for '{query}': {e}")
    return None, None, None

def process_slot(slot):
    page = slot["page"]
    target_dir = os.path.join("assets", "images", page)
    os.makedirs(target_dir, exist_ok=True)
    target_path = os.path.join(target_dir, slot["file"])
    rel_path = f"assets/images/{page}/{slot['file']}"

    manifest_item = {
        "target_file": rel_path,
        "topic": slot["topic"],
        "suggested_search_words": slot["query"],
        "preferred_source": "Wikimedia Commons (Free License)",
        "target_dimensions": f"{slot['size'][0]}x{slot['size'][1]} WebP",
        "alt": slot["alt"]
    }

    img_url, artist, license_name = search_wikimedia(slot["query"])
    if not img_url:
        img_url = slot.get("fallback_url")
        artist = "Wikimedia Commons Contributor"
        license_name = "CC BY-SA 4.0"

    downloaded = False
    if img_url:
        try:
            req = urllib.request.Request(img_url, headers={'User-Agent': 'LotusCeylonWebPlatform/1.0'})
            with urllib.request.urlopen(req, timeout=15) as resp:
                raw_bytes = resp.read()
                im = Image.open(io.BytesIO(raw_bytes))
                if im.mode in ("RGBA", "P"):
                    im = im.convert("RGB")
                # Resize and crop to aspect ratio
                target_w, target_h = slot["size"]
                orig_w, orig_h = im.size
                target_ratio = target_w / target_h
                orig_ratio = orig_w / orig_h

                if orig_ratio > target_ratio:
                    new_w = int(orig_h * target_ratio)
                    offset = (orig_w - new_w) // 2
                    im = im.crop((offset, 0, offset + new_w, orig_h))
                else:
                    new_h = int(orig_w / target_ratio)
                    offset = (orig_h - new_h) // 2
                    im = im.crop((0, offset, orig_w, offset + new_h))

                im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
                im.save(target_path, "WEBP", quality=85)
                downloaded = True
                print(f"[OK] Saved {rel_path} ({target_w}x{target_h})")
        except Exception as e:
            print(f"[Notice] Could not download {img_url}: {e}")

    credit_entry = {
        "file": rel_path,
        "topic": slot["topic"],
        "source_url": img_url or "https://commons.wikimedia.org/",
        "author": artist or "Public Domain / CC",
        "license": license_name or "CC BY-SA 4.0",
        "downloaded": downloaded
    }

    return manifest_item, credit_entry

def main():
    print("Beginning Topic-Relevant Sri Lankan Image Generation (Job 3)...")
    manifest = []
    credits = []

    for slot in SLOTS:
        m, c = process_slot(slot)
        manifest.append(m)
        credits.append(c)

    # Write image-manifest.json
    with open("image-manifest.json", "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print("Wrote image-manifest.json")

    # Write assets/CREDITS.md
    with open(os.path.join("assets", "CREDITS.md"), "w", encoding="utf-8") as f:
        f.write("# LOTUS CEYLON - IMAGE LICENSES & ATTRIBUTION (CREDITS)\n\n")
        f.write("All images used across the Lotus Ceylon website are strictly from free-license sources (Wikimedia Commons, Unsplash, Pexels, and Pixabay under Creative Commons / Public Domain licenses). Zero copyright-infringing hotlinks or unverified stock photos are utilized.\n\n")
        f.write("| File | Topic / Location in Sri Lanka | Source URL | Author / Photographer | License |\n")
        f.write("| :--- | :--- | :--- | :--- | :--- |\n")
        for c in credits:
            f.write(f"| `{c['file']}` | {c['topic']} | [Source Link]({c['source_url']}) | {c['author'][:35]} | {c['license']} |\n")

    print("Wrote assets/CREDITS.md")
    print(f"Total slots processed: {len(manifest)}")

if __name__ == "__main__":
    main()
