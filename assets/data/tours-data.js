/*
 * © 2026 Infinite Design. All rights reserved.
 * Built for Lotus Ceylon International Tours & Services (Pvt) Ltd.
 * Unauthorized removal of attribution does not transfer ownership of this code.
 * https://infiniteweb.dev/
 */
/**
 * Single Source of Truth for Lotus Ceylon Tours & Categories
 * Defines all 11 Curated Holiday Themes and 29 Handcrafted Packages.
 */
(function() {
  'use strict';
  const toursData = {
  "version": "2026.11.08",
  "totalCategories": 11,
  "totalPackages": 29,
  "categories": [
    {
      "id": "cultural",
      "slug": "cultural",
      "displayName": "Cultural Heritage",
      "tagline": "SACRED KINGDOMS • UNESCO LIVING HERITAGE",
      "image": "assets/images/cultural/sigiriya-1.webp",
      "shortDescription": "Journey across 2,500 years of living history. From sky palaces perched atop dramatic monadnocks to candlelit evening temple pujas and ancient royal reservoirs, immerse in the authentic soul of Ceylon with our bespoke, private guided cultural expeditions.",
      "link": "/tours/cultural/index.html",
      "packageCount": 3,
      "packages": [
        {
          "slug": "royal-kingdoms-sacred-temples",
          "category": "cultural",
          "title": "Royal Kingdoms & Sacred Temples",
          "days": 6,
          "nights": 5,
          "image": "assets/images/cultural/sigiriya-1.webp",
          "shortDescription": "Private chauffeur journey through Sigiriya Citadel, Dambulla cave murals, and the Sacred Tooth Relic Temple in Kandy.",
          "link": "/tours/cultural/royal-kingdoms-sacred-temples/index.html",
          "destinations": [
            "Negombo",
            "Dambulla",
            "Sigiriya",
            "Kandy",
            "Colombo"
          ],
          "highlights": [
            "Lion Rock Fortress",
            "Dambulla Cave Temples",
            "Temple of the Tooth",
            "Peradeniya Botanical Gardens"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "small-group",
            "solo",
            "family"
          ],
          "difficulty": "Moderate",
          "pace": "Balanced"
        },
        {
          "slug": "the-sacred-lotus-triangle",
          "category": "cultural",
          "title": "The Sacred Lotus Triangle",
          "days": 9,
          "nights": 8,
          "image": "assets/images/cultural/dambulla-cave-temple-2.webp",
          "shortDescription": "Comprehensive cultural triangle pilgrimage spanning Anuradhapura stupas, Polonnaruwa medieval ruins, Sigiriya, and Kandy.",
          "link": "/tours/cultural/the-sacred-lotus-triangle/index.html",
          "destinations": [
            "Anuradhapura",
            "Mihintale",
            "Sigiriya",
            "Polonnaruwa",
            "Dambulla",
            "Kandy",
            "Colombo"
          ],
          "highlights": [
            "Jaya Sri Maha Bodhi",
            "Polonnaruwa Gal Vihara",
            "Sigiriya Rock",
            "Dambulla Caves"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "small-group",
            "family"
          ],
          "difficulty": "Moderate",
          "pace": "Balanced"
        },
        {
          "slug": "three-millennia-of-living-heritage",
          "category": "cultural",
          "title": "Three Millennia of Living Heritage",
          "days": 15,
          "nights": 14,
          "image": "assets/images/cultural/polonnaruwa-gal-vihara-3.webp",
          "shortDescription": "Grand 15-day in-depth odyssey through Ceylon's ancient dynasties, royal reservoirs, forest hermitages, and living traditions.",
          "link": "/tours/cultural/three-millennia-of-living-heritage/index.html",
          "destinations": [
            "Wilpattu",
            "Anuradhapura",
            "Jaffna",
            "Trincomalee",
            "Polonnaruwa",
            "Sigiriya",
            "Kandy",
            "Galle"
          ],
          "highlights": [
            "Anuradhapura Ruwanwelisaya",
            "Jaffna Nallur Kovil",
            "Koneswaram Temple",
            "Galle Dutch Fort"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "small-group",
            "solo"
          ],
          "difficulty": "Moderate",
          "pace": "Relaxed"
        }
      ]
    },
    {
      "id": "buddhist-heritage",
      "slug": "buddhist-heritage",
      "displayName": "Buddhist Heritage",
      "tagline": "LIVING DHAMMA • ANCIENT BODHI SHRINES • MINDFUL MEDITATION",
      "image": "assets/images/buddhist-heritage/jaya-sri-maha-bodhi-1.webp",
      "shortDescription": "Reverent, deeply peaceful journeys to Sri Lanka's most venerated Buddhist sites—from the 2,300-year-old Jaya Sri Maha Bodhi and sacred Ruwanwelisaya to Kandy’s Sri Dalada Maligawa and Ritigala forest hermitages.",
      "link": "/tours/buddhist-heritage/index.html",
      "packageCount": 3,
      "packages": [
        {
          "slug": "the-sacred-bodhi-ancient-kingdoms",
          "category": "buddhist-heritage",
          "title": "The Sacred Bodhi & Ancient Kingdoms",
          "days": 6,
          "nights": 5,
          "image": "assets/images/buddhist-heritage/jaya-sri-maha-bodhi-1.webp",
          "shortDescription": "Morning puja at the world's oldest planted tree, Ruwanwelisaya circumambulation, and Mihintale peak meditation.",
          "link": "/tours/buddhist-heritage/the-sacred-bodhi-ancient-kingdoms/index.html",
          "destinations": [
            "Anuradhapura",
            "Mihintale",
            "Aukana",
            "Colombo"
          ],
          "highlights": [
            "Jaya Sri Maha Bodhi",
            "Ruwanwelisaya Stupa",
            "Mihintale Cradle of Buddhism",
            "Aukana Buddha Statue"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "family",
            "small-group",
            "solo"
          ],
          "difficulty": "Easy",
          "pace": "Relaxed"
        },
        {
          "slug": "the-sacred-tooth-monastic-sanctuaries",
          "category": "buddhist-heritage",
          "title": "The Sacred Tooth & Monastic Sanctuaries",
          "days": 6,
          "nights": 5,
          "image": "assets/images/buddhist-heritage/temple-of-the-tooth-4.webp",
          "shortDescription": "Evening Tevava drumming ceremonies at Sri Dalada Maligawa, Dambulla caves, and highland mountain temples.",
          "link": "/tours/buddhist-heritage/the-sacred-tooth-monastic-sanctuaries/index.html",
          "destinations": [
            "Kandy",
            "Dambulla",
            "Matale",
            "Aluvihara",
            "Colombo"
          ],
          "highlights": [
            "Temple of the Sacred Tooth Relic",
            "Aluvihara Rock Temple",
            "Dambulla Golden Temple",
            "Gadaladeniya & Embekke"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "family",
            "small-group",
            "solo"
          ],
          "difficulty": "Easy",
          "pace": "Relaxed"
        },
        {
          "slug": "forest-hermitages-mindful-ceylon",
          "category": "buddhist-heritage",
          "title": "Forest Hermitages & Mindful Ceylon",
          "days": 6,
          "nights": 5,
          "image": "assets/images/buddhist-heritage/ruwanwelisaya-2.webp",
          "shortDescription": "Secluded meditation at Ritigala ruins, forest monastic retreats, and deep mindful contemplation.",
          "link": "/tours/buddhist-heritage/forest-hermitages-mindful-ceylon/index.html",
          "destinations": [
            "Ritigala",
            "Arankele",
            "Dambulla",
            "Kandy",
            "Colombo"
          ],
          "highlights": [
            "Ritigala Strict Nature Reserve",
            "Arankele Forest Monastery",
            "Guided Vipassana Meditation",
            "Herbal Baths"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "solo",
            "small-group"
          ],
          "difficulty": "Moderate",
          "pace": "Relaxed"
        }
      ]
    },
    {
      "id": "wildlife",
      "slug": "wildlife",
      "displayName": "Wildlife Safaris",
      "tagline": "ASIA’S APEX WILDLIFE • THE BIG FIVE SANCTUARY",
      "image": "assets/images/wildlife/yala-leopard-1.webp",
      "shortDescription": "Encounter earth’s highest leopard density, dramatic elephant gatherings of 300+ gentle giants, elusive sloth bears, and the colossal blue whale. Experience Sri Lanka’s untamed nature in luxury tented safari camps with private expert naturalists.",
      "link": "/tours/wildlife/index.html",
      "packageCount": 3,
      "packages": [
        {
          "slug": "wild-ceylon-predator-elephant-trail",
          "category": "wildlife",
          "title": "Wild Ceylon Predator & Elephant Trail",
          "days": 17,
          "nights": 16,
          "image": "assets/images/wildlife/minneriya-elephant-gathering-2.webp",
          "shortDescription": "Deep wilderness safari tracking apex leopards, massive elephant gatherings, and oceanic blue whales in premier national parks.",
          "link": "/tours/wildlife/wild-ceylon-predator-elephant-trail/index.html",
          "destinations": [
            "Wilpattu",
            "Minneriya",
            "Gal Oya",
            "Yala",
            "Mirissa",
            "Sinharaja"
          ],
          "highlights": [
            "Yala Leopard Safaris",
            "Minneriya Elephant Gathering",
            "Mirissa Blue Whale Cruise",
            "Gal Oya Boat Safari"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "family",
            "small-group"
          ],
          "difficulty": "Moderate",
          "pace": "Active"
        },
        {
          "slug": "the-sri-lanka-big-five-expedition",
          "category": "wildlife",
          "title": "The Sri Lanka Big Five Expedition",
          "days": 14,
          "nights": 13,
          "image": "assets/images/wildlife/yala-leopard-1.webp",
          "shortDescription": "Ethical private tracking of leopard, Asian elephant, sloth bear, blue whale, and sperm whale with expert naturalists.",
          "link": "/tours/wildlife/the-sri-lanka-big-five-expedition/index.html",
          "destinations": [
            "Wilpattu",
            "Minneriya",
            "Yala",
            "Bundala",
            "Mirissa"
          ],
          "highlights": [
            "Big Five Encounters",
            "Wilpattu Sloth Bears",
            "Yala Leopards",
            "Bundala Wetland Birds"
          ],
          "bestSeason": "Nov-Apr",
          "travelers": [
            "couple",
            "family",
            "small-group",
            "solo"
          ],
          "difficulty": "Moderate",
          "pace": "Balanced"
        },
        {
          "slug": "untamed-biosphere-rainforest-odyssey",
          "category": "wildlife",
          "title": "Untamed Biosphere & Rainforest Odyssey",
          "days": 17,
          "nights": 16,
          "image": "assets/images/wildlife/udawalawe-3.webp",
          "shortDescription": "Pristine Sinharaja primary rainforest biodiversity, endemic birding, and open savannah elephant safaris in Udawalawe.",
          "link": "/tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html",
          "destinations": [
            "Kitulgala",
            "Sinharaja",
            "Udawalawe",
            "Yala",
            "Bundala"
          ],
          "highlights": [
            "Sinharaja UNESCO Rainforest",
            "Udawalawe Elephant Orphanage",
            "Endemic Bird Trails",
            "Luxury Safari Lodges"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "small-group",
            "solo"
          ],
          "difficulty": "Challenging",
          "pace": "Active"
        }
      ]
    },
    {
      "id": "beach",
      "slug": "beach",
      "displayName": "Pristine Beaches",
      "tagline": "PURE JOURNEYS • TROPICAL COASTAL ESCAPES",
      "image": "assets/images/beach/mirissa-1.webp",
      "shortDescription": "Surrender to 1,300 kilometers of sun-blessed coastline, secret golden coves, and crystal sapphire waters. From peaceful private seaside villas to blue whale safaris and world-class surfing, experience coastal Sri Lanka crafted entirely around you.",
      "link": "/tours/beach/index.html",
      "packageCount": 3,
      "packages": [
        {
          "slug": "southern-sands-serenade",
          "category": "beach",
          "title": "Southern Sands Serenade",
          "days": 10,
          "nights": 9,
          "image": "assets/images/beach/mirissa-1.webp",
          "shortDescription": "Barefoot luxury along Mirissa, Tangalle golden coves, and UNESCO Galle Fort ramparts in private oceanfront villas.",
          "link": "/tours/beach/southern-sands-serenade/index.html",
          "destinations": [
            "Negombo",
            "Bentota",
            "Galle",
            "Mirissa",
            "Tangalle"
          ],
          "highlights": [
            "Mirissa Whale Watching",
            "Galle Fort Ramparts",
            "Kosgoda Turtle Sanctuary",
            "Boutique Beachfront Stays"
          ],
          "bestSeason": "Nov-Apr",
          "travelers": [
            "couple",
            "family",
            "solo"
          ],
          "difficulty": "Easy",
          "pace": "Relaxed"
        },
        {
          "slug": "turquoise-eastern-sanctuary",
          "category": "beach",
          "title": "Turquoise Eastern Sanctuary",
          "days": 12,
          "nights": 11,
          "image": "assets/images/beach/pasikudah-5.webp",
          "shortDescription": "Trincomalee cliffs, Pigeon Island coral reef snorkeling, and tranquil shallow Pasikudah bay relaxation.",
          "link": "/tours/beach/turquoise-eastern-sanctuary/index.html",
          "destinations": [
            "Trincomalee",
            "Nilaveli",
            "Pigeon Island",
            "Pasikudah",
            "Arugam Bay"
          ],
          "highlights": [
            "Pigeon Island Marine Park",
            "Koneswaram Temple Cliff",
            "Pasikudah Calm Waters",
            "Arugam Bay Surf"
          ],
          "bestSeason": "May-Sep",
          "travelers": [
            "couple",
            "family",
            "small-group"
          ],
          "difficulty": "Easy",
          "pace": "Relaxed"
        },
        {
          "slug": "pristine-seaboard-odyssey",
          "category": "beach",
          "title": "Pristine Seaboard Odyssey",
          "days": 14,
          "nights": 13,
          "image": "assets/images/beach/unawatuna-2.webp",
          "shortDescription": "Grand coastal loop from Kalpitiya dolphins and Jaffna lagoons to serene southern sandbars and surf breaks.",
          "link": "/tours/beach/pristine-seaboard-odyssey/index.html",
          "destinations": [
            "Kalpitiya",
            "Mannar",
            "Jaffna",
            "Trincomalee",
            "Pasikudah",
            "Galle"
          ],
          "highlights": [
            "Kalpitiya Dolphin Pods",
            "Jaffna Islands",
            "Casuarina Beach",
            "Trincomalee Whale Watching"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "small-group",
            "solo"
          ],
          "difficulty": "Moderate",
          "pace": "Balanced"
        }
      ]
    },
    {
      "id": "hill-country",
      "slug": "hill-country",
      "displayName": "Hill Country and Tea",
      "tagline": "MISTY VALLEYS • HERITAGE TEA TRAILS • HIGHLAND SANCTUARY",
      "image": "assets/images/hill-country/nine-arches-bridge-1.webp",
      "shortDescription": "Escape to the cool emerald highlands of Ceylon. Wander through rolling tea plantations, ride the legendary scenic railway over Nine Arches Bridge, stay in restored British colonial planter bungalows, and breathe crisp mountain air.",
      "link": "/tours/hill-country/index.html",
      "packageCount": 3,
      "packages": [
        {
          "slug": "ceylon-tea-trails-colonial-grandeur",
          "category": "hill-country",
          "title": "Ceylon Tea Trails & Colonial Grandeur",
          "days": 8,
          "nights": 7,
          "image": "assets/images/hill-country/nuwara-eliya-tea-2.webp",
          "shortDescription": "Heritage colonial planter bungalows, private tea tastings, and misty Nuwara Eliya valleys in the emerald highlands.",
          "link": "/tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html",
          "destinations": [
            "Kandy",
            "Nuwara Eliya",
            "Hatton",
            "Tea Trails",
            "Colombo"
          ],
          "highlights": [
            "Private Tea Factory Tasting",
            "Historic Planter Bungalows",
            "Highland Waterfalls",
            "Gregory Lake"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "family",
            "small-group"
          ],
          "difficulty": "Easy",
          "pace": "Relaxed"
        },
        {
          "slug": "misty-peaks-scenic-railways-expedition",
          "category": "hill-country",
          "title": "Misty Peaks & Scenic Railways Expedition",
          "days": 10,
          "nights": 9,
          "image": "assets/images/hill-country/nine-arches-bridge-1.webp",
          "shortDescription": "Iconic blue observation train ride, Nine Arches viaduct photography, and Little Adam's Peak viewpoints in Ella.",
          "link": "/tours/hill-country/misty-peaks-scenic-railways-expedition/index.html",
          "destinations": [
            "Kandy",
            "Nanu Oya",
            "Nuwara Eliya",
            "Ella",
            "Haputale"
          ],
          "highlights": [
            "Scenic Mainline Train Journey",
            "Nine Arches Bridge",
            "Little Adam's Peak",
            "Lipton's Seat Panoramic View"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "family",
            "solo",
            "small-group"
          ],
          "difficulty": "Moderate",
          "pace": "Balanced"
        },
        {
          "slug": "highland-wilderness-cascading-waterfalls",
          "category": "hill-country",
          "title": "Highland Wilderness & Cascading Waterfalls",
          "days": 12,
          "nights": 11,
          "image": "assets/images/hill-country/ramboda-falls-4.webp",
          "shortDescription": "Roaring Ramboda and Diyaluma cascades, Horton Plains World's End trek, and alpine cloud forest sanctuaries.",
          "link": "/tours/hill-country/highland-wilderness-cascading-waterfalls/index.html",
          "destinations": [
            "Kandy",
            "Ramboda",
            "Horton Plains",
            "Bakers Falls",
            "Ella",
            "Wellawaya"
          ],
          "highlights": [
            "Horton Plains World's End",
            "Diyaluma Falls Natural Pools",
            "Bakers Falls Hike",
            "Alpine Cloud Forest"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "small-group",
            "solo"
          ],
          "difficulty": "Challenging",
          "pace": "Active"
        }
      ]
    },
    {
      "id": "ayurvedic",
      "slug": "ayurvedic",
      "displayName": "Ayurvedic Healing",
      "tagline": "SACRED BOTANICAL HEALING • MINDFULNESS • YOGA RETREATS",
      "image": "assets/images/ayurveda/herbal-treatment-1.webp",
      "shortDescription": "Restore harmony of body, mind, and spirit with 3,000-year-old indigenous Ayurveda. Certified physician consultations, bespoke herbal oil therapies, and daily yoga amidst serene tropical forests.",
      "link": "/tours/ayurvedic/index.html",
      "packageCount": 2,
      "packages": [
        {
          "slug": "lotus-ayu-holistic-rejuvenation",
          "category": "ayurvedic",
          "title": "Lotus Ayu Holistic Rejuvenation",
          "days": 10,
          "nights": 9,
          "image": "assets/images/ayurveda/herbal-treatment-1.webp",
          "shortDescription": "Traditional Panchakarma detox, private doctor consultations, and curative herbal therapies in oceanfront sanctuary.",
          "link": "/tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html",
          "destinations": [
            "Wadduwa",
            "Bentota",
            "Beruwala",
            "Colombo"
          ],
          "highlights": [
            "Doctor Pulse Diagnosis",
            "Daily Shirodhara & Abhyanga",
            "Organic Herbal Cuisine",
            "Mindful Meditation"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "solo"
          ],
          "difficulty": "Easy",
          "pace": "Relaxed"
        },
        {
          "slug": "sacred-serenity-forest-meditation-retreat",
          "category": "ayurvedic",
          "title": "Sacred Serenity & Forest Meditation Retreat",
          "days": 14,
          "nights": 13,
          "image": "assets/images/ayurveda/sri-lanka-yoga-3.webp",
          "shortDescription": "Immersive 14-day holistic mind-body transformation with Ayurvedic healing, daily sunrise yoga, and silent forest contemplation.",
          "link": "/tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html",
          "destinations": [
            "Kandy",
            "Knuckles Foothills",
            "Matale Spice Sanctuary",
            "Tangalle"
          ],
          "highlights": [
            "14-Day Complete Panchakarma",
            "Vipassana Forest Sessions",
            "Ayurvedic Botanical Gardens",
            "Daily Yoga Pavilion"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "solo",
            "couple"
          ],
          "difficulty": "Easy",
          "pace": "Relaxed"
        }
      ]
    },
    {
      "id": "honeymoon",
      "slug": "honeymoon",
      "displayName": "Honeymoon Romance",
      "tagline": "INTIMATE LUXURY • SECLUDED BAYS • CANDLELIT RAMPS",
      "image": "assets/images/honeymoon/seaside-villa-1.webp",
      "shortDescription": "Celebrate your love in an enchanted tropical paradise. Secluded oceanfront plunge pool villas, private candlelight dinners on historic ramparts, and bespoke champagne moments crafted for two.",
      "link": "/tours/honeymoon/index.html",
      "packageCount": 2,
      "packages": [
        {
          "slug": "enchanted-ceylon-romantic-hideaway",
          "category": "honeymoon",
          "title": "Enchanted Ceylon Romantic Hideaway",
          "days": 9,
          "nights": 8,
          "image": "assets/images/honeymoon/seaside-villa-1.webp",
          "shortDescription": "Private plunge-pool seaside retreats, candlelit beach dinners, and scenic highland hideaways for romantic couples.",
          "link": "/tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html",
          "destinations": [
            "Negombo",
            "Sigiriya",
            "Kandy",
            "Nuwara Eliya",
            "Bentota"
          ],
          "highlights": [
            "Private Plunge Pool Villas",
            "Candlelit Sand Dining",
            "Helicopter Transfers on Request",
            "Couples Ayurvedic Spa"
          ],
          "bestSeason": "Nov-Apr",
          "travelers": [
            "couple"
          ],
          "difficulty": "Easy",
          "pace": "Relaxed"
        },
        {
          "slug": "pure-serenade-coastal-highland-romance",
          "category": "honeymoon",
          "title": "Pure Serenade Coastal & Highland Romance",
          "days": 12,
          "nights": 11,
          "image": "assets/images/honeymoon/mirissa-sunset-2.webp",
          "shortDescription": "Luxury boutique honeymoon combining colonial tea estates, private catamaran sails, and sunset ocean dining.",
          "link": "/tours/honeymoon/pure-serenade-coastal-highland-romance/index.html",
          "destinations": [
            "Cultural Triangle",
            "Tea Trails",
            "Yala Safari Camp",
            "Galle Coast"
          ],
          "highlights": [
            "Luxury Safari Glamping",
            "Private Sunset Catamaran",
            "Tea Trails Grand Romance",
            "Historic Fort Strolls"
          ],
          "bestSeason": "Nov-Apr",
          "travelers": [
            "couple"
          ],
          "difficulty": "Easy",
          "pace": "Relaxed"
        }
      ]
    },
    {
      "id": "family",
      "slug": "family",
      "displayName": "Family Discovery",
      "tagline": "SAFE EXPEDITIONS • LIVING NATURE • TIMELESS BONDING",
      "image": "assets/images/family/kosgoda-turtle-hatchery-1.webp",
      "shortDescription": "Create unforgettable memories across generations. Engaging wildlife safaris, baby sea turtle hatcheries, gentle train rides, scenic mountain walks, and family-friendly luxury stays.",
      "link": "/tours/family/index.html",
      "packageCount": 3,
      "packages": [
        {
          "slug": "island-wonder-multi-gen-family-discovery",
          "category": "family",
          "title": "Island Wonder Multi-Gen Family Discovery",
          "days": 10,
          "nights": 9,
          "image": "assets/images/family/kosgoda-turtle-hatchery-1.webp",
          "shortDescription": "Baby turtle conservation, elephant transit home, gentle tea train rides, and shallow beach fun for all ages.",
          "link": "/tours/family/island-wonder-multi-gen-family-discovery/index.html",
          "destinations": [
            "Pinnawala",
            "Sigiriya",
            "Kandy",
            "Nuwara Eliya",
            "Bentota"
          ],
          "highlights": [
            "Kosgoda Sea Turtle Hatchery",
            "Elephant Transit Home",
            "Scenic Family Train Ride",
            "Calm Sandy Bays"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "family",
            "small-group"
          ],
          "difficulty": "Easy",
          "pace": "Balanced"
        },
        {
          "slug": "wild-safari-coastal-family-holiday",
          "category": "family",
          "title": "Wild Safari & Coastal Family Holiday",
          "days": 12,
          "nights": 11,
          "image": "assets/images/family/calm-beach-3.webp",
          "shortDescription": "Private jeep safaris, tranquil lagoon boat rides, safe sea swimming, and family beach villas on the south coast.",
          "link": "/tours/family/wild-safari-coastal-family-holiday/index.html",
          "destinations": [
            "Udawalawe",
            "Yala",
            "Mirissa",
            "Weligama",
            "Galle"
          ],
          "highlights": [
            "Elephant Herd Watching",
            "River Boat Safaris",
            "Beginner Surf Lessons",
            "Beachfront Family Suites"
          ],
          "bestSeason": "Nov-Apr",
          "travelers": [
            "family"
          ],
          "difficulty": "Easy",
          "pace": "Balanced"
        },
        {
          "slug": "the-grand-ceylon-family-adventure",
          "category": "family",
          "title": "The Grand Ceylon Family Adventure",
          "days": 14,
          "nights": 13,
          "image": "assets/images/family/scenic-train-ride-2.webp",
          "shortDescription": "All-inclusive multi-generational holiday featuring ancient fortresses, train rides, wildlife encounters, and beach days.",
          "link": "/tours/family/the-grand-ceylon-family-adventure/index.html",
          "destinations": [
            "Wilpattu",
            "Sigiriya",
            "Kandy",
            "Nuwara Eliya",
            "Yala",
            "Bentota"
          ],
          "highlights": [
            "Lion Rock Ascent",
            "Blue Train Across Bridges",
            "Double Safari Expeditions",
            "Water Sports in Bentota"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "family",
            "small-group"
          ],
          "difficulty": "Moderate",
          "pace": "Balanced"
        }
      ]
    },
    {
      "id": "adventure",
      "slug": "adventure",
      "displayName": "Active Adventure",
      "tagline": "WILD RAPIDS • PEAK ASCENTS • OCEAN SURF",
      "image": "assets/images/adventure/kitulgala-rafting-1.webp",
      "shortDescription": "Challenge your spirit across raw, untamed terrain. White water rafting down raging Kelani rapids, trekking the misty Knuckles wilderness, climbing Adam's Peak, and surfing ocean breaks.",
      "link": "/tours/adventure/index.html",
      "packageCount": 2,
      "packages": [
        {
          "slug": "island-adrenaline-rapids-expedition",
          "category": "adventure",
          "title": "Island Adrenaline & Rapids Expedition",
          "days": 8,
          "nights": 7,
          "image": "assets/images/adventure/kitulgala-rafting-1.webp",
          "shortDescription": "Grade 3-4 white-water rafting in Kitulgala, canyon jumps, waterfall abseiling, and Knuckles mountain trekking.",
          "link": "/tours/adventure/island-adrenaline-rapids-expedition/index.html",
          "destinations": [
            "Kitulgala",
            "Adam's Peak",
            "Knuckles Range",
            "Ella"
          ],
          "highlights": [
            "Kelani White Water Rafting",
            "Waterfall Abseiling",
            "Rainforest Trekking",
            "Ziplining Ella"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "solo",
            "small-group",
            "couple"
          ],
          "difficulty": "Challenging",
          "pace": "Active"
        },
        {
          "slug": "wild-peaks-trails-surf-safari",
          "category": "adventure",
          "title": "Wild Peaks, Trails & Surf Safari",
          "days": 11,
          "nights": 10,
          "image": "assets/images/adventure/knuckles-trek-4.webp",
          "shortDescription": "Knuckles mountain range trekking, Ella rock climbs, and world-class surfing along the southern coastal breaks.",
          "link": "/tours/adventure/wild-peaks-trails-surf-safari/index.html",
          "destinations": [
            "Knuckles Range",
            "Ella",
            "Ahangama",
            "Mirissa",
            "Weligama"
          ],
          "highlights": [
            "Knuckles Cloud Forest Hike",
            "Ella Rock Summit",
            "Point Break Surfing",
            "Off-Road Mountain Biking"
          ],
          "bestSeason": "Nov-Apr",
          "travelers": [
            "solo",
            "small-group",
            "couple"
          ],
          "difficulty": "Challenging",
          "pace": "Active"
        }
      ]
    },
    {
      "id": "golf",
      "slug": "golf",
      "displayName": "Championship Golf",
      "tagline": "COLONIAL GREENS • CHAMPIONSHIP LINKS • TROPICAL FAIRWAYS",
      "image": "assets/images/golf/ceylon-championship-golf-1.webp",
      "shortDescription": "Tee off across Asia’s most scenic and historic courses. The 1879 Royal Colombo Golf Club, Donald Steel’s breathtaking Victoria Golf Resort in Kandy, and colonial Nuwara Eliya greens.",
      "link": "/tours/golf/index.html",
      "packageCount": 3,
      "packages": [
        {
          "slug": "the-royal-ceylon-fairways-tour",
          "category": "golf",
          "title": "The Royal Ceylon Fairways Tour",
          "days": 7,
          "nights": 6,
          "image": "assets/images/golf/ceylon-championship-golf-1.webp",
          "shortDescription": "Play Royal Colombo (est. 1879) and Donald Steel's Victoria Golf Resort Kandy with guaranteed prime tee times and caddies.",
          "link": "/tours/golf/the-royal-ceylon-fairways-tour/index.html",
          "destinations": [
            "Colombo",
            "Kandy",
            "Victoria Reservoir"
          ],
          "highlights": [
            "Royal Colombo 18 Holes",
            "Victoria Golf Resort 18 Holes",
            "VIP Clubhouse Privileges",
            "Private Luxury Executive Van"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "small-group",
            "solo"
          ],
          "difficulty": "Challenging",
          "pace": "Balanced"
        },
        {
          "slug": "highland-greens-coastal-links-championship",
          "category": "golf",
          "title": "Highland Greens & Coastal Links Championship",
          "days": 10,
          "nights": 9,
          "image": "assets/images/golf/ceylon-championship-golf-1.webp",
          "shortDescription": "Four distinct championship courses from misty alpine Nuwara Eliya pines to oceanfront Shangri-La links in Hambantota.",
          "link": "/tours/golf/highland-greens-coastal-links-championship/index.html",
          "destinations": [
            "Colombo",
            "Kandy",
            "Nuwara Eliya",
            "Hambantota"
          ],
          "highlights": [
            "Nuwara Eliya Golf Club",
            "Shangri-La Coastal Links",
            "Lake Victoria Fairways",
            "Luxury Resort Spas"
          ],
          "bestSeason": "Dec-Apr",
          "travelers": [
            "couple",
            "small-group",
            "solo"
          ],
          "difficulty": "Challenging",
          "pace": "Balanced"
        },
        {
          "slug": "the-grand-ceylon-masters-golf-odyssey",
          "category": "golf",
          "title": "The Grand Ceylon Masters Golf Odyssey",
          "days": 12,
          "nights": 11,
          "image": "assets/images/golf/ceylon-championship-golf-1.webp",
          "shortDescription": "The definitive 12-day Sri Lanka masters golf pilgrimage with 6 championship rounds, colonial manors, and fine dining.",
          "link": "/tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html",
          "destinations": [
            "Colombo",
            "Kandy",
            "Nuwara Eliya",
            "Hambantota",
            "Galle"
          ],
          "highlights": [
            "6 Championship Rounds",
            "All 4 Sri Lankan Master Courses",
            "Galle Fort Ramparts Dinner",
            "Dedicated Golf Vehicle"
          ],
          "bestSeason": "Dec-Apr",
          "travelers": [
            "couple",
            "small-group",
            "solo"
          ],
          "difficulty": "Challenging",
          "pace": "Balanced"
        }
      ]
    },
    {
      "id": "ramayana",
      "slug": "ramayana",
      "displayName": "Ramayana Trail",
      "tagline": "EPIC LEGENDS • SACRED SHRINES • ANCIENT CHRONICLES",
      "image": "assets/images/ramayana/seetha-amman-temple-1.webp",
      "shortDescription": "Walk in the footsteps of Sri Rama, Sita Devi, Lakshmana, and Hanuman. From Munneswaram and Koneswaram temples to Seetha Amman Temple and Ravana Ella waterfall.",
      "link": "/tours/ramayana/index.html",
      "packageCount": 2,
      "packages": [
        {
          "slug": "sacred-ramayana-heritage-trail",
          "category": "ramayana",
          "title": "Sacred Ramayana Heritage Trail",
          "days": 7,
          "nights": 6,
          "image": "assets/images/ramayana/seetha-amman-temple-1.webp",
          "shortDescription": "Pilgrimage to Seetha Amman Temple, Ashoka Vatika, Ravana Falls, and ancient Munneswaram Shiva Kovil.",
          "link": "/tours/ramayana/sacred-ramayana-heritage-trail/index.html",
          "destinations": [
            "Chilaw",
            "Kandy",
            "Nuwara Eliya",
            "Ella",
            "Colombo"
          ],
          "highlights": [
            "Seetha Amman Temple",
            "Ashoka Vatika (Hakgala)",
            "Ravana Ella Falls",
            "Munneswaram Kovil"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "family",
            "small-group"
          ],
          "difficulty": "Easy",
          "pace": "Balanced"
        },
        {
          "slug": "the-epic-ramayana-chronicle-pilgrimage",
          "category": "ramayana",
          "title": "The Epic Ramayana Chronicle Pilgrimage",
          "days": 10,
          "nights": 9,
          "image": "assets/images/ramayana/ravana-falls-2.webp",
          "shortDescription": "Comprehensive Ramayana journey from Mannar Rama Setu and Trincomalee Koneswaram to Divurumpola and Ravana caves.",
          "link": "/tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html",
          "destinations": [
            "Mannar",
            "Jaffna",
            "Trincomalee",
            "Kandy",
            "Nuwara Eliya",
            "Ella"
          ],
          "highlights": [
            "Rama Setu (Adam's Bridge)",
            "Koneswaram Temple Swami Rock",
            "Divurumpola Agni Pariksha",
            "Ravana Cave"
          ],
          "bestSeason": "Year-Round",
          "travelers": [
            "couple",
            "family",
            "small-group"
          ],
          "difficulty": "Moderate",
          "pace": "Balanced"
        }
      ]
    }
  ],
  "packages": [
    {
      "slug": "royal-kingdoms-sacred-temples",
      "category": "cultural",
      "title": "Royal Kingdoms & Sacred Temples",
      "days": 6,
      "nights": 5,
      "image": "assets/images/cultural/sigiriya-1.webp",
      "shortDescription": "Private chauffeur journey through Sigiriya Citadel, Dambulla cave murals, and the Sacred Tooth Relic Temple in Kandy.",
      "link": "/tours/cultural/royal-kingdoms-sacred-temples/index.html",
      "destinations": [
        "Negombo",
        "Dambulla",
        "Sigiriya",
        "Kandy",
        "Colombo"
      ],
      "highlights": [
        "Lion Rock Fortress",
        "Dambulla Cave Temples",
        "Temple of the Tooth",
        "Peradeniya Botanical Gardens"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "small-group",
        "solo",
        "family"
      ],
      "difficulty": "Moderate",
      "pace": "Balanced"
    },
    {
      "slug": "the-sacred-lotus-triangle",
      "category": "cultural",
      "title": "The Sacred Lotus Triangle",
      "days": 9,
      "nights": 8,
      "image": "assets/images/cultural/dambulla-cave-temple-2.webp",
      "shortDescription": "Comprehensive cultural triangle pilgrimage spanning Anuradhapura stupas, Polonnaruwa medieval ruins, Sigiriya, and Kandy.",
      "link": "/tours/cultural/the-sacred-lotus-triangle/index.html",
      "destinations": [
        "Anuradhapura",
        "Mihintale",
        "Sigiriya",
        "Polonnaruwa",
        "Dambulla",
        "Kandy",
        "Colombo"
      ],
      "highlights": [
        "Jaya Sri Maha Bodhi",
        "Polonnaruwa Gal Vihara",
        "Sigiriya Rock",
        "Dambulla Caves"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "small-group",
        "family"
      ],
      "difficulty": "Moderate",
      "pace": "Balanced"
    },
    {
      "slug": "three-millennia-of-living-heritage",
      "category": "cultural",
      "title": "Three Millennia of Living Heritage",
      "days": 15,
      "nights": 14,
      "image": "assets/images/cultural/polonnaruwa-gal-vihara-3.webp",
      "shortDescription": "Grand 15-day in-depth odyssey through Ceylon's ancient dynasties, royal reservoirs, forest hermitages, and living traditions.",
      "link": "/tours/cultural/three-millennia-of-living-heritage/index.html",
      "destinations": [
        "Wilpattu",
        "Anuradhapura",
        "Jaffna",
        "Trincomalee",
        "Polonnaruwa",
        "Sigiriya",
        "Kandy",
        "Galle"
      ],
      "highlights": [
        "Anuradhapura Ruwanwelisaya",
        "Jaffna Nallur Kovil",
        "Koneswaram Temple",
        "Galle Dutch Fort"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "small-group",
        "solo"
      ],
      "difficulty": "Moderate",
      "pace": "Relaxed"
    },
    {
      "slug": "the-sacred-bodhi-ancient-kingdoms",
      "category": "buddhist-heritage",
      "title": "The Sacred Bodhi & Ancient Kingdoms",
      "days": 6,
      "nights": 5,
      "image": "assets/images/buddhist-heritage/jaya-sri-maha-bodhi-1.webp",
      "shortDescription": "Morning puja at the world's oldest planted tree, Ruwanwelisaya circumambulation, and Mihintale peak meditation.",
      "link": "/tours/buddhist-heritage/the-sacred-bodhi-ancient-kingdoms/index.html",
      "destinations": [
        "Anuradhapura",
        "Mihintale",
        "Aukana",
        "Colombo"
      ],
      "highlights": [
        "Jaya Sri Maha Bodhi",
        "Ruwanwelisaya Stupa",
        "Mihintale Cradle of Buddhism",
        "Aukana Buddha Statue"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "family",
        "small-group",
        "solo"
      ],
      "difficulty": "Easy",
      "pace": "Relaxed"
    },
    {
      "slug": "the-sacred-tooth-monastic-sanctuaries",
      "category": "buddhist-heritage",
      "title": "The Sacred Tooth & Monastic Sanctuaries",
      "days": 6,
      "nights": 5,
      "image": "assets/images/buddhist-heritage/temple-of-the-tooth-4.webp",
      "shortDescription": "Evening Tevava drumming ceremonies at Sri Dalada Maligawa, Dambulla caves, and highland mountain temples.",
      "link": "/tours/buddhist-heritage/the-sacred-tooth-monastic-sanctuaries/index.html",
      "destinations": [
        "Kandy",
        "Dambulla",
        "Matale",
        "Aluvihara",
        "Colombo"
      ],
      "highlights": [
        "Temple of the Sacred Tooth Relic",
        "Aluvihara Rock Temple",
        "Dambulla Golden Temple",
        "Gadaladeniya & Embekke"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "family",
        "small-group",
        "solo"
      ],
      "difficulty": "Easy",
      "pace": "Relaxed"
    },
    {
      "slug": "forest-hermitages-mindful-ceylon",
      "category": "buddhist-heritage",
      "title": "Forest Hermitages & Mindful Ceylon",
      "days": 6,
      "nights": 5,
      "image": "assets/images/buddhist-heritage/ruwanwelisaya-2.webp",
      "shortDescription": "Secluded meditation at Ritigala ruins, forest monastic retreats, and deep mindful contemplation.",
      "link": "/tours/buddhist-heritage/forest-hermitages-mindful-ceylon/index.html",
      "destinations": [
        "Ritigala",
        "Arankele",
        "Dambulla",
        "Kandy",
        "Colombo"
      ],
      "highlights": [
        "Ritigala Strict Nature Reserve",
        "Arankele Forest Monastery",
        "Guided Vipassana Meditation",
        "Herbal Baths"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "solo",
        "small-group"
      ],
      "difficulty": "Moderate",
      "pace": "Relaxed"
    },
    {
      "slug": "wild-ceylon-predator-elephant-trail",
      "category": "wildlife",
      "title": "Wild Ceylon Predator & Elephant Trail",
      "days": 17,
      "nights": 16,
      "image": "assets/images/wildlife/minneriya-elephant-gathering-2.webp",
      "shortDescription": "Deep wilderness safari tracking apex leopards, massive elephant gatherings, and oceanic blue whales in premier national parks.",
      "link": "/tours/wildlife/wild-ceylon-predator-elephant-trail/index.html",
      "destinations": [
        "Wilpattu",
        "Minneriya",
        "Gal Oya",
        "Yala",
        "Mirissa",
        "Sinharaja"
      ],
      "highlights": [
        "Yala Leopard Safaris",
        "Minneriya Elephant Gathering",
        "Mirissa Blue Whale Cruise",
        "Gal Oya Boat Safari"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "family",
        "small-group"
      ],
      "difficulty": "Moderate",
      "pace": "Active"
    },
    {
      "slug": "the-sri-lanka-big-five-expedition",
      "category": "wildlife",
      "title": "The Sri Lanka Big Five Expedition",
      "days": 14,
      "nights": 13,
      "image": "assets/images/wildlife/yala-leopard-1.webp",
      "shortDescription": "Ethical private tracking of leopard, Asian elephant, sloth bear, blue whale, and sperm whale with expert naturalists.",
      "link": "/tours/wildlife/the-sri-lanka-big-five-expedition/index.html",
      "destinations": [
        "Wilpattu",
        "Minneriya",
        "Yala",
        "Bundala",
        "Mirissa"
      ],
      "highlights": [
        "Big Five Encounters",
        "Wilpattu Sloth Bears",
        "Yala Leopards",
        "Bundala Wetland Birds"
      ],
      "bestSeason": "Nov-Apr",
      "travelers": [
        "couple",
        "family",
        "small-group",
        "solo"
      ],
      "difficulty": "Moderate",
      "pace": "Balanced"
    },
    {
      "slug": "untamed-biosphere-rainforest-odyssey",
      "category": "wildlife",
      "title": "Untamed Biosphere & Rainforest Odyssey",
      "days": 17,
      "nights": 16,
      "image": "assets/images/wildlife/udawalawe-3.webp",
      "shortDescription": "Pristine Sinharaja primary rainforest biodiversity, endemic birding, and open savannah elephant safaris in Udawalawe.",
      "link": "/tours/wildlife/untamed-biosphere-rainforest-odyssey/index.html",
      "destinations": [
        "Kitulgala",
        "Sinharaja",
        "Udawalawe",
        "Yala",
        "Bundala"
      ],
      "highlights": [
        "Sinharaja UNESCO Rainforest",
        "Udawalawe Elephant Orphanage",
        "Endemic Bird Trails",
        "Luxury Safari Lodges"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "small-group",
        "solo"
      ],
      "difficulty": "Challenging",
      "pace": "Active"
    },
    {
      "slug": "southern-sands-serenade",
      "category": "beach",
      "title": "Southern Sands Serenade",
      "days": 10,
      "nights": 9,
      "image": "assets/images/beach/mirissa-1.webp",
      "shortDescription": "Barefoot luxury along Mirissa, Tangalle golden coves, and UNESCO Galle Fort ramparts in private oceanfront villas.",
      "link": "/tours/beach/southern-sands-serenade/index.html",
      "destinations": [
        "Negombo",
        "Bentota",
        "Galle",
        "Mirissa",
        "Tangalle"
      ],
      "highlights": [
        "Mirissa Whale Watching",
        "Galle Fort Ramparts",
        "Kosgoda Turtle Sanctuary",
        "Boutique Beachfront Stays"
      ],
      "bestSeason": "Nov-Apr",
      "travelers": [
        "couple",
        "family",
        "solo"
      ],
      "difficulty": "Easy",
      "pace": "Relaxed"
    },
    {
      "slug": "turquoise-eastern-sanctuary",
      "category": "beach",
      "title": "Turquoise Eastern Sanctuary",
      "days": 12,
      "nights": 11,
      "image": "assets/images/beach/pasikudah-5.webp",
      "shortDescription": "Trincomalee cliffs, Pigeon Island coral reef snorkeling, and tranquil shallow Pasikudah bay relaxation.",
      "link": "/tours/beach/turquoise-eastern-sanctuary/index.html",
      "destinations": [
        "Trincomalee",
        "Nilaveli",
        "Pigeon Island",
        "Pasikudah",
        "Arugam Bay"
      ],
      "highlights": [
        "Pigeon Island Marine Park",
        "Koneswaram Temple Cliff",
        "Pasikudah Calm Waters",
        "Arugam Bay Surf"
      ],
      "bestSeason": "May-Sep",
      "travelers": [
        "couple",
        "family",
        "small-group"
      ],
      "difficulty": "Easy",
      "pace": "Relaxed"
    },
    {
      "slug": "pristine-seaboard-odyssey",
      "category": "beach",
      "title": "Pristine Seaboard Odyssey",
      "days": 14,
      "nights": 13,
      "image": "assets/images/beach/unawatuna-2.webp",
      "shortDescription": "Grand coastal loop from Kalpitiya dolphins and Jaffna lagoons to serene southern sandbars and surf breaks.",
      "link": "/tours/beach/pristine-seaboard-odyssey/index.html",
      "destinations": [
        "Kalpitiya",
        "Mannar",
        "Jaffna",
        "Trincomalee",
        "Pasikudah",
        "Galle"
      ],
      "highlights": [
        "Kalpitiya Dolphin Pods",
        "Jaffna Islands",
        "Casuarina Beach",
        "Trincomalee Whale Watching"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "small-group",
        "solo"
      ],
      "difficulty": "Moderate",
      "pace": "Balanced"
    },
    {
      "slug": "ceylon-tea-trails-colonial-grandeur",
      "category": "hill-country",
      "title": "Ceylon Tea Trails & Colonial Grandeur",
      "days": 8,
      "nights": 7,
      "image": "assets/images/hill-country/nuwara-eliya-tea-2.webp",
      "shortDescription": "Heritage colonial planter bungalows, private tea tastings, and misty Nuwara Eliya valleys in the emerald highlands.",
      "link": "/tours/hill-country/ceylon-tea-trails-colonial-grandeur/index.html",
      "destinations": [
        "Kandy",
        "Nuwara Eliya",
        "Hatton",
        "Tea Trails",
        "Colombo"
      ],
      "highlights": [
        "Private Tea Factory Tasting",
        "Historic Planter Bungalows",
        "Highland Waterfalls",
        "Gregory Lake"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "family",
        "small-group"
      ],
      "difficulty": "Easy",
      "pace": "Relaxed"
    },
    {
      "slug": "misty-peaks-scenic-railways-expedition",
      "category": "hill-country",
      "title": "Misty Peaks & Scenic Railways Expedition",
      "days": 10,
      "nights": 9,
      "image": "assets/images/hill-country/nine-arches-bridge-1.webp",
      "shortDescription": "Iconic blue observation train ride, Nine Arches viaduct photography, and Little Adam's Peak viewpoints in Ella.",
      "link": "/tours/hill-country/misty-peaks-scenic-railways-expedition/index.html",
      "destinations": [
        "Kandy",
        "Nanu Oya",
        "Nuwara Eliya",
        "Ella",
        "Haputale"
      ],
      "highlights": [
        "Scenic Mainline Train Journey",
        "Nine Arches Bridge",
        "Little Adam's Peak",
        "Lipton's Seat Panoramic View"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "family",
        "solo",
        "small-group"
      ],
      "difficulty": "Moderate",
      "pace": "Balanced"
    },
    {
      "slug": "highland-wilderness-cascading-waterfalls",
      "category": "hill-country",
      "title": "Highland Wilderness & Cascading Waterfalls",
      "days": 12,
      "nights": 11,
      "image": "assets/images/hill-country/ramboda-falls-4.webp",
      "shortDescription": "Roaring Ramboda and Diyaluma cascades, Horton Plains World's End trek, and alpine cloud forest sanctuaries.",
      "link": "/tours/hill-country/highland-wilderness-cascading-waterfalls/index.html",
      "destinations": [
        "Kandy",
        "Ramboda",
        "Horton Plains",
        "Bakers Falls",
        "Ella",
        "Wellawaya"
      ],
      "highlights": [
        "Horton Plains World's End",
        "Diyaluma Falls Natural Pools",
        "Bakers Falls Hike",
        "Alpine Cloud Forest"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "small-group",
        "solo"
      ],
      "difficulty": "Challenging",
      "pace": "Active"
    },
    {
      "slug": "lotus-ayu-holistic-rejuvenation",
      "category": "ayurvedic",
      "title": "Lotus Ayu Holistic Rejuvenation",
      "days": 10,
      "nights": 9,
      "image": "assets/images/ayurveda/herbal-treatment-1.webp",
      "shortDescription": "Traditional Panchakarma detox, private doctor consultations, and curative herbal therapies in oceanfront sanctuary.",
      "link": "/tours/ayurvedic/lotus-ayu-holistic-rejuvenation/index.html",
      "destinations": [
        "Wadduwa",
        "Bentota",
        "Beruwala",
        "Colombo"
      ],
      "highlights": [
        "Doctor Pulse Diagnosis",
        "Daily Shirodhara & Abhyanga",
        "Organic Herbal Cuisine",
        "Mindful Meditation"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "solo"
      ],
      "difficulty": "Easy",
      "pace": "Relaxed"
    },
    {
      "slug": "sacred-serenity-forest-meditation-retreat",
      "category": "ayurvedic",
      "title": "Sacred Serenity & Forest Meditation Retreat",
      "days": 14,
      "nights": 13,
      "image": "assets/images/ayurveda/sri-lanka-yoga-3.webp",
      "shortDescription": "Immersive 14-day holistic mind-body transformation with Ayurvedic healing, daily sunrise yoga, and silent forest contemplation.",
      "link": "/tours/ayurvedic/sacred-serenity-forest-meditation-retreat/index.html",
      "destinations": [
        "Kandy",
        "Knuckles Foothills",
        "Matale Spice Sanctuary",
        "Tangalle"
      ],
      "highlights": [
        "14-Day Complete Panchakarma",
        "Vipassana Forest Sessions",
        "Ayurvedic Botanical Gardens",
        "Daily Yoga Pavilion"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "solo",
        "couple"
      ],
      "difficulty": "Easy",
      "pace": "Relaxed"
    },
    {
      "slug": "enchanted-ceylon-romantic-hideaway",
      "category": "honeymoon",
      "title": "Enchanted Ceylon Romantic Hideaway",
      "days": 9,
      "nights": 8,
      "image": "assets/images/honeymoon/seaside-villa-1.webp",
      "shortDescription": "Private plunge-pool seaside retreats, candlelit beach dinners, and scenic highland hideaways for romantic couples.",
      "link": "/tours/honeymoon/enchanted-ceylon-romantic-hideaway/index.html",
      "destinations": [
        "Negombo",
        "Sigiriya",
        "Kandy",
        "Nuwara Eliya",
        "Bentota"
      ],
      "highlights": [
        "Private Plunge Pool Villas",
        "Candlelit Sand Dining",
        "Helicopter Transfers on Request",
        "Couples Ayurvedic Spa"
      ],
      "bestSeason": "Nov-Apr",
      "travelers": [
        "couple"
      ],
      "difficulty": "Easy",
      "pace": "Relaxed"
    },
    {
      "slug": "pure-serenade-coastal-highland-romance",
      "category": "honeymoon",
      "title": "Pure Serenade Coastal & Highland Romance",
      "days": 12,
      "nights": 11,
      "image": "assets/images/honeymoon/mirissa-sunset-2.webp",
      "shortDescription": "Luxury boutique honeymoon combining colonial tea estates, private catamaran sails, and sunset ocean dining.",
      "link": "/tours/honeymoon/pure-serenade-coastal-highland-romance/index.html",
      "destinations": [
        "Cultural Triangle",
        "Tea Trails",
        "Yala Safari Camp",
        "Galle Coast"
      ],
      "highlights": [
        "Luxury Safari Glamping",
        "Private Sunset Catamaran",
        "Tea Trails Grand Romance",
        "Historic Fort Strolls"
      ],
      "bestSeason": "Nov-Apr",
      "travelers": [
        "couple"
      ],
      "difficulty": "Easy",
      "pace": "Relaxed"
    },
    {
      "slug": "island-wonder-multi-gen-family-discovery",
      "category": "family",
      "title": "Island Wonder Multi-Gen Family Discovery",
      "days": 10,
      "nights": 9,
      "image": "assets/images/family/kosgoda-turtle-hatchery-1.webp",
      "shortDescription": "Baby turtle conservation, elephant transit home, gentle tea train rides, and shallow beach fun for all ages.",
      "link": "/tours/family/island-wonder-multi-gen-family-discovery/index.html",
      "destinations": [
        "Pinnawala",
        "Sigiriya",
        "Kandy",
        "Nuwara Eliya",
        "Bentota"
      ],
      "highlights": [
        "Kosgoda Sea Turtle Hatchery",
        "Elephant Transit Home",
        "Scenic Family Train Ride",
        "Calm Sandy Bays"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "family",
        "small-group"
      ],
      "difficulty": "Easy",
      "pace": "Balanced"
    },
    {
      "slug": "wild-safari-coastal-family-holiday",
      "category": "family",
      "title": "Wild Safari & Coastal Family Holiday",
      "days": 12,
      "nights": 11,
      "image": "assets/images/family/calm-beach-3.webp",
      "shortDescription": "Private jeep safaris, tranquil lagoon boat rides, safe sea swimming, and family beach villas on the south coast.",
      "link": "/tours/family/wild-safari-coastal-family-holiday/index.html",
      "destinations": [
        "Udawalawe",
        "Yala",
        "Mirissa",
        "Weligama",
        "Galle"
      ],
      "highlights": [
        "Elephant Herd Watching",
        "River Boat Safaris",
        "Beginner Surf Lessons",
        "Beachfront Family Suites"
      ],
      "bestSeason": "Nov-Apr",
      "travelers": [
        "family"
      ],
      "difficulty": "Easy",
      "pace": "Balanced"
    },
    {
      "slug": "the-grand-ceylon-family-adventure",
      "category": "family",
      "title": "The Grand Ceylon Family Adventure",
      "days": 14,
      "nights": 13,
      "image": "assets/images/family/scenic-train-ride-2.webp",
      "shortDescription": "All-inclusive multi-generational holiday featuring ancient fortresses, train rides, wildlife encounters, and beach days.",
      "link": "/tours/family/the-grand-ceylon-family-adventure/index.html",
      "destinations": [
        "Wilpattu",
        "Sigiriya",
        "Kandy",
        "Nuwara Eliya",
        "Yala",
        "Bentota"
      ],
      "highlights": [
        "Lion Rock Ascent",
        "Blue Train Across Bridges",
        "Double Safari Expeditions",
        "Water Sports in Bentota"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "family",
        "small-group"
      ],
      "difficulty": "Moderate",
      "pace": "Balanced"
    },
    {
      "slug": "island-adrenaline-rapids-expedition",
      "category": "adventure",
      "title": "Island Adrenaline & Rapids Expedition",
      "days": 8,
      "nights": 7,
      "image": "assets/images/adventure/kitulgala-rafting-1.webp",
      "shortDescription": "Grade 3-4 white-water rafting in Kitulgala, canyon jumps, waterfall abseiling, and Knuckles mountain trekking.",
      "link": "/tours/adventure/island-adrenaline-rapids-expedition/index.html",
      "destinations": [
        "Kitulgala",
        "Adam's Peak",
        "Knuckles Range",
        "Ella"
      ],
      "highlights": [
        "Kelani White Water Rafting",
        "Waterfall Abseiling",
        "Rainforest Trekking",
        "Ziplining Ella"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "solo",
        "small-group",
        "couple"
      ],
      "difficulty": "Challenging",
      "pace": "Active"
    },
    {
      "slug": "wild-peaks-trails-surf-safari",
      "category": "adventure",
      "title": "Wild Peaks, Trails & Surf Safari",
      "days": 11,
      "nights": 10,
      "image": "assets/images/adventure/knuckles-trek-4.webp",
      "shortDescription": "Knuckles mountain range trekking, Ella rock climbs, and world-class surfing along the southern coastal breaks.",
      "link": "/tours/adventure/wild-peaks-trails-surf-safari/index.html",
      "destinations": [
        "Knuckles Range",
        "Ella",
        "Ahangama",
        "Mirissa",
        "Weligama"
      ],
      "highlights": [
        "Knuckles Cloud Forest Hike",
        "Ella Rock Summit",
        "Point Break Surfing",
        "Off-Road Mountain Biking"
      ],
      "bestSeason": "Nov-Apr",
      "travelers": [
        "solo",
        "small-group",
        "couple"
      ],
      "difficulty": "Challenging",
      "pace": "Active"
    },
    {
      "slug": "the-royal-ceylon-fairways-tour",
      "category": "golf",
      "title": "The Royal Ceylon Fairways Tour",
      "days": 7,
      "nights": 6,
      "image": "assets/images/golf/ceylon-championship-golf-1.webp",
      "shortDescription": "Play Royal Colombo (est. 1879) and Donald Steel's Victoria Golf Resort Kandy with guaranteed prime tee times and caddies.",
      "link": "/tours/golf/the-royal-ceylon-fairways-tour/index.html",
      "destinations": [
        "Colombo",
        "Kandy",
        "Victoria Reservoir"
      ],
      "highlights": [
        "Royal Colombo 18 Holes",
        "Victoria Golf Resort 18 Holes",
        "VIP Clubhouse Privileges",
        "Private Luxury Executive Van"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "small-group",
        "solo"
      ],
      "difficulty": "Challenging",
      "pace": "Balanced"
    },
    {
      "slug": "highland-greens-coastal-links-championship",
      "category": "golf",
      "title": "Highland Greens & Coastal Links Championship",
      "days": 10,
      "nights": 9,
      "image": "assets/images/golf/ceylon-championship-golf-1.webp",
      "shortDescription": "Four distinct championship courses from misty alpine Nuwara Eliya pines to oceanfront Shangri-La links in Hambantota.",
      "link": "/tours/golf/highland-greens-coastal-links-championship/index.html",
      "destinations": [
        "Colombo",
        "Kandy",
        "Nuwara Eliya",
        "Hambantota"
      ],
      "highlights": [
        "Nuwara Eliya Golf Club",
        "Shangri-La Coastal Links",
        "Lake Victoria Fairways",
        "Luxury Resort Spas"
      ],
      "bestSeason": "Dec-Apr",
      "travelers": [
        "couple",
        "small-group",
        "solo"
      ],
      "difficulty": "Challenging",
      "pace": "Balanced"
    },
    {
      "slug": "the-grand-ceylon-masters-golf-odyssey",
      "category": "golf",
      "title": "The Grand Ceylon Masters Golf Odyssey",
      "days": 12,
      "nights": 11,
      "image": "assets/images/golf/ceylon-championship-golf-1.webp",
      "shortDescription": "The definitive 12-day Sri Lanka masters golf pilgrimage with 6 championship rounds, colonial manors, and fine dining.",
      "link": "/tours/golf/the-grand-ceylon-masters-golf-odyssey/index.html",
      "destinations": [
        "Colombo",
        "Kandy",
        "Nuwara Eliya",
        "Hambantota",
        "Galle"
      ],
      "highlights": [
        "6 Championship Rounds",
        "All 4 Sri Lankan Master Courses",
        "Galle Fort Ramparts Dinner",
        "Dedicated Golf Vehicle"
      ],
      "bestSeason": "Dec-Apr",
      "travelers": [
        "couple",
        "small-group",
        "solo"
      ],
      "difficulty": "Challenging",
      "pace": "Balanced"
    },
    {
      "slug": "sacred-ramayana-heritage-trail",
      "category": "ramayana",
      "title": "Sacred Ramayana Heritage Trail",
      "days": 7,
      "nights": 6,
      "image": "assets/images/ramayana/seetha-amman-temple-1.webp",
      "shortDescription": "Pilgrimage to Seetha Amman Temple, Ashoka Vatika, Ravana Falls, and ancient Munneswaram Shiva Kovil.",
      "link": "/tours/ramayana/sacred-ramayana-heritage-trail/index.html",
      "destinations": [
        "Chilaw",
        "Kandy",
        "Nuwara Eliya",
        "Ella",
        "Colombo"
      ],
      "highlights": [
        "Seetha Amman Temple",
        "Ashoka Vatika (Hakgala)",
        "Ravana Ella Falls",
        "Munneswaram Kovil"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "family",
        "small-group"
      ],
      "difficulty": "Easy",
      "pace": "Balanced"
    },
    {
      "slug": "the-epic-ramayana-chronicle-pilgrimage",
      "category": "ramayana",
      "title": "The Epic Ramayana Chronicle Pilgrimage",
      "days": 10,
      "nights": 9,
      "image": "assets/images/ramayana/ravana-falls-2.webp",
      "shortDescription": "Comprehensive Ramayana journey from Mannar Rama Setu and Trincomalee Koneswaram to Divurumpola and Ravana caves.",
      "link": "/tours/ramayana/the-epic-ramayana-chronicle-pilgrimage/index.html",
      "destinations": [
        "Mannar",
        "Jaffna",
        "Trincomalee",
        "Kandy",
        "Nuwara Eliya",
        "Ella"
      ],
      "highlights": [
        "Rama Setu (Adam's Bridge)",
        "Koneswaram Temple Swami Rock",
        "Divurumpola Agni Pariksha",
        "Ravana Cave"
      ],
      "bestSeason": "Year-Round",
      "travelers": [
        "couple",
        "family",
        "small-group"
      ],
      "difficulty": "Moderate",
      "pace": "Balanced"
    }
  ]
};
  window.LOTUS_TOURS_DATA = toursData;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = toursData;
  }
})();
