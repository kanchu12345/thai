/**
 * Lotus Ceylon - Interactive Leaflet & CartoDB Tour Route Map
 * Privacy-first, locally vendored Leaflet, accessible, responsive & lazy-loaded.
 * Fully offline & file:/// compatible with built-in route catalog fallback.
 */

(function() {
  'use strict';

  const DEFAULT_CENTER = [7.879, 80.767];
  const DEFAULT_ZOOM = 8;
  const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>';

  // Palette for multi-package category routes
  const ROUTE_COLORS = [
    { name: 'Gold', stroke: '#C9962B', fill: '#F2C14E' },
    { name: 'Teal', stroke: '#1F8A8A', fill: '#3AB0B0' },
    { name: 'Navy', stroke: '#002B49', fill: '#00477A' },
    { name: 'Brown', stroke: '#3B2A14', fill: '#6B4F29' }
  ];

  // Built-in offline & file:/// fallback packages
  const BUILTIN_FALLBACK_PACKAGES = [
  {
    "id": "pkg-beach-01",
    "slug": "southern-sands-serenade",
    "title": "Southern Sands Serenade",
    "days": 10,
    "nights": 9,
    "category": "beach",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Lagoon catamaran sailing",
          "Dutch canal sunset cruise",
          "Fish market morning walk"
        ]
      },
      {
        "name": "Tangalle",
        "lat": 6.0243,
        "lng": 80.7941,
        "activities": [
          "Kalametiya bird sanctuary boat tour",
          "Silent beach private dinner",
          "Mulkirigala rock monastery"
        ]
      },
      {
        "name": "Mirissa",
        "lat": 5.9482,
        "lng": 80.4578,
        "activities": [
          "Dawn deep-sea whale & dolphin safari",
          "Coconut Tree Hill photography",
          "Secret Beach secluded cove"
        ]
      },
      {
        "name": "Unawatuna",
        "lat": 6.0104,
        "lng": 80.2492,
        "activities": [
          "Jungle Beach coastal trek",
          "Japanese Peace Pagoda",
          "Coral reef swimming"
        ]
      },
      {
        "name": "Galle Fort",
        "lat": 6.0328,
        "lng": 80.2168,
        "activities": [
          "UNESCO ramparts private heritage walk",
          "Lighthouse sunset viewing",
          "Maritime archaeology museum"
        ]
      },
      {
        "name": "Bentota",
        "lat": 6.4256,
        "lng": 79.9958,
        "activities": [
          "Madu Ganga river boat safari",
          "Brief Garden by Bevis Bawa",
          "Kosgoda Sea Turtle Conservation"
        ]
      },
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "National Museum private tour",
          "Galle Face Green evening stroll",
          "Old Dutch Hospital dining"
        ]
      }
    ]
  },
  {
    "id": "pkg-beach-02",
    "slug": "turquoise-eastern-sanctuary",
    "title": "Turquoise Eastern Sanctuary",
    "days": 12,
    "nights": 11,
    "category": "beach",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Lagoon catamaran sailing",
          "Dutch canal sunset cruise",
          "Fish market morning walk"
        ]
      },
      {
        "name": "Trincomalee",
        "lat": 8.5874,
        "lng": 81.2152,
        "activities": [
          "Koneswaram Shiva Temple cliff walk",
          "Fort Frederick deer sanctuary",
          "Swami Rock ocean view"
        ]
      },
      {
        "name": "Nilaveli",
        "lat": 8.6897,
        "lng": 81.1897,
        "activities": [
          "Pristine white sand relaxation",
          "Private coastal catamaran sail",
          "Ayurvedic oceanfront spa"
        ]
      },
      {
        "name": "Pigeon Island",
        "lat": 8.7188,
        "lng": 81.2028,
        "activities": [
          "National Park marine coral snorkeling",
          "Blacktip reef shark observation",
          "Sea turtle swimming"
        ]
      },
      {
        "name": "Pasikudah",
        "lat": 7.9239,
        "lng": 81.5647,
        "activities": [
          "Calm shallow bay swimming",
          "Coral garden glass-bottom boat tour",
          "Beachfront sunset dining"
        ]
      },
      {
        "name": "Arugam Bay",
        "lat": 6.8417,
        "lng": 81.8294,
        "activities": [
          "Point break world-class surfing",
          "Kudumbigala monastery forest climb",
          "Panama lagoon crocodile safari"
        ]
      },
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "National Museum private tour",
          "Galle Face Green evening stroll",
          "Old Dutch Hospital dining"
        ]
      }
    ]
  },
  {
    "id": "pkg-beach-03",
    "slug": "pristine-seaboard-odyssey",
    "title": "Pristine Seaboard Odyssey",
    "days": 14,
    "nights": 13,
    "category": "beach",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Lagoon catamaran sailing",
          "Dutch canal sunset cruise",
          "Fish market morning walk"
        ]
      },
      {
        "name": "Kalpitiya",
        "lat": 8.2289,
        "lng": 79.7661,
        "activities": [
          "Dolphin pod boat expedition",
          "Kite surfing lagoon clinic",
          "Dutch Fort Kalpitiya exploration"
        ]
      },
      {
        "name": "Mannar Island",
        "lat": 9.0558,
        "lng": 79.9074,
        "activities": [
          "Adam's Bridge sandbank expedition",
          "Ancient Baobab tree visit",
          "Flamingo salt pans birding"
        ]
      },
      {
        "name": "Jaffna",
        "lat": 9.6615,
        "lng": 80.0255,
        "activities": [
          "Nallur Kandaswamy Kovil puja",
          "Jaffna Fort ramparts walk",
          "Casuarina Beach & Karainagar Island"
        ]
      },
      {
        "name": "Trincomalee",
        "lat": 8.5874,
        "lng": 81.2152,
        "activities": [
          "Koneswaram Shiva Temple cliff walk",
          "Fort Frederick deer sanctuary",
          "Swami Rock ocean view"
        ]
      },
      {
        "name": "Pasikudah",
        "lat": 7.9239,
        "lng": 81.5647,
        "activities": [
          "Calm shallow bay swimming",
          "Coral garden glass-bottom boat tour",
          "Beachfront sunset dining"
        ]
      },
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "National Museum private tour",
          "Galle Face Green evening stroll",
          "Old Dutch Hospital dining"
        ]
      }
    ]
  },
  {
    "id": "pkg-cultural-01",
    "slug": "royal-kingdoms-sacred-temples",
    "title": "Royal Kingdoms & Sacred Temples",
    "days": 6,
    "nights": 5,
    "category": "cultural",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Lagoon catamaran sailing",
          "Dutch canal sunset cruise",
          "Fish market morning walk"
        ]
      },
      {
        "name": "Dambulla",
        "lat": 7.8742,
        "lng": 80.6511,
        "activities": [
          "UNESCO Golden Cave Temple murals",
          "Ancient Buddhist statues",
          "Rangiri panoramic valley view"
        ]
      },
      {
        "name": "Sigiriya",
        "lat": 7.957,
        "lng": 80.7603,
        "activities": [
          "Lion Rock Citadel 5th-century summit climb",
          "Water gardens & mirror wall",
          "Pidurangala sunrise hike"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "Temple of the Sacred Tooth Relic evening puja",
          "Royal Botanical Gardens Peradeniya",
          "Kandy Lake scenic walk"
        ]
      },
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "National Museum private tour",
          "Galle Face Green evening stroll",
          "Old Dutch Hospital dining"
        ]
      }
    ]
  },
  {
    "id": "pkg-cultural-02",
    "slug": "the-sacred-lotus-triangle",
    "title": "The Sacred Lotus Triangle",
    "days": 9,
    "nights": 8,
    "category": "cultural",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Lagoon catamaran sailing",
          "Dutch canal sunset cruise",
          "Fish market morning walk"
        ]
      },
      {
        "name": "Anuradhapura",
        "lat": 8.3114,
        "lng": 80.4037,
        "activities": [
          "Jaya Sri Maha Bodhi sacred tree blessing",
          "Ruwanwelisaya monumental stupa",
          "Jetavanaramaya ancient brick dome"
        ]
      },
      {
        "name": "Sigiriya",
        "lat": 7.957,
        "lng": 80.7603,
        "activities": [
          "Lion Rock Citadel 5th-century summit climb",
          "Water gardens & mirror wall",
          "Pidurangala sunrise hike"
        ]
      },
      {
        "name": "Polonnaruwa",
        "lat": 7.9403,
        "lng": 81.0188,
        "activities": [
          "Gal Vihara colossal rock Buddha statues",
          "Royal Palace of King Parakramabahu",
          "Parakrama Samudra lake cycling"
        ]
      },
      {
        "name": "Dambulla",
        "lat": 7.8742,
        "lng": 80.6511,
        "activities": [
          "UNESCO Golden Cave Temple murals",
          "Ancient Buddhist statues",
          "Rangiri panoramic valley view"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "Temple of the Sacred Tooth Relic evening puja",
          "Royal Botanical Gardens Peradeniya",
          "Kandy Lake scenic walk"
        ]
      },
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "National Museum private tour",
          "Galle Face Green evening stroll",
          "Old Dutch Hospital dining"
        ]
      }
    ]
  },
  {
    "id": "pkg-cultural-03",
    "slug": "three-millennia-of-living-heritage",
    "title": "Three Millennia of Living Heritage",
    "days": 15,
    "nights": 14,
    "category": "cultural",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Lagoon catamaran sailing",
          "Dutch canal sunset cruise",
          "Fish market morning walk"
        ]
      },
      {
        "name": "Wilpattu",
        "lat": 8.4489,
        "lng": 80.0075,
        "activities": [
          "Natural villus safari",
          "Sri Lankan leopard tracking",
          "Wild Asian elephant sightings"
        ]
      },
      {
        "name": "Anuradhapura",
        "lat": 8.3114,
        "lng": 80.4037,
        "activities": [
          "Jaya Sri Maha Bodhi sacred tree blessing",
          "Ruwanwelisaya monumental stupa",
          "Jetavanaramaya ancient brick dome"
        ]
      },
      {
        "name": "Jaffna",
        "lat": 9.6615,
        "lng": 80.0255,
        "activities": [
          "Nallur Kandaswamy Kovil puja",
          "Jaffna Fort ramparts walk",
          "Casuarina Beach & Karainagar Island"
        ]
      },
      {
        "name": "Sigiriya",
        "lat": 7.957,
        "lng": 80.7603,
        "activities": [
          "Lion Rock Citadel 5th-century summit climb",
          "Water gardens & mirror wall",
          "Pidurangala sunrise hike"
        ]
      },
      {
        "name": "Polonnaruwa",
        "lat": 7.9403,
        "lng": 81.0188,
        "activities": [
          "Gal Vihara colossal rock Buddha statues",
          "Royal Palace of King Parakramabahu",
          "Parakrama Samudra lake cycling"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "Temple of the Sacred Tooth Relic evening puja",
          "Royal Botanical Gardens Peradeniya",
          "Kandy Lake scenic walk"
        ]
      },
      {
        "name": "Nuwara Eliya",
        "lat": 6.9497,
        "lng": 80.7891,
        "activities": [
          "Single-estate tea factory & tasting",
          "Gregory Lake lakeside promenade",
          "Colonial Queen's Cottage gardens"
        ]
      },
      {
        "name": "Galle Fort",
        "lat": 6.0328,
        "lng": 80.2168,
        "activities": [
          "UNESCO ramparts private heritage walk",
          "Lighthouse sunset viewing",
          "Maritime archaeology museum"
        ]
      },
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "National Museum private tour",
          "Galle Face Green evening stroll",
          "Old Dutch Hospital dining"
        ]
      }
    ]
  },
  {
    "id": "pkg-wildlife-01",
    "slug": "wild-ceylon-predator-elephant-trail",
    "title": "Wild Ceylon Predator & Elephant Trail",
    "days": 8,
    "nights": 7,
    "category": "wildlife",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Lagoon catamaran sailing",
          "Dutch canal sunset cruise",
          "Fish market morning walk"
        ]
      },
      {
        "name": "Wilpattu National Park",
        "lat": 8.4489,
        "lng": 80.0075,
        "activities": [
          "Villus lake system game drive",
          "Leopard & sloth bear tracking",
          "Dense dry-zone forest exploration"
        ]
      },
      {
        "name": "Minneriya National Park",
        "lat": 8.0336,
        "lng": 80.8322,
        "activities": [
          "The Great Elephant Gathering safari",
          "Ancient Minneriya Tank wetland birding",
          "Open-top 4x4 jeep safari"
        ]
      },
      {
        "name": "Yala National Park",
        "lat": 6.3688,
        "lng": 81.5204,
        "activities": [
          "Block 1 apex leopard safari",
          "Sloth bear & spotted deer sightings",
          "Indian Ocean coastal dunes drive"
        ]
      },
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "National Museum private tour",
          "Galle Face Green evening stroll",
          "Old Dutch Hospital dining"
        ]
      }
    ]
  },
  {
    "id": "pkg-wildlife-02",
    "slug": "the-sri-lanka-big-five-expedition",
    "title": "The Sri Lanka Big Five Expedition",
    "days": 14,
    "nights": 13,
    "category": "wildlife",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Lagoon catamaran sailing",
          "Dutch canal sunset cruise",
          "Fish market morning walk"
        ]
      },
      {
        "name": "Wilpattu",
        "lat": 8.4489,
        "lng": 80.0075,
        "activities": [
          "Natural villus safari",
          "Sri Lankan leopard tracking",
          "Wild Asian elephant sightings"
        ]
      },
      {
        "name": "Habarana",
        "lat": 8.0353,
        "lng": 80.7514,
        "activities": [
          "Traditional village bullock cart ride",
          "Hiriwadunna lake catamaran ferry",
          "Authentic chena farm lunch"
        ]
      },
      {
        "name": "Udawalawe",
        "lat": 6.4745,
        "lng": 80.8987,
        "activities": [
          "Elephant nursery visit",
          "Open grassland 4x4 game drive",
          "Wild water buffalo & deer watching"
        ]
      },
      {
        "name": "Yala",
        "lat": 6.3688,
        "lng": 81.5204,
        "activities": [
          "Private naturalist-escorted game drive",
          "High leopard density tracking",
          "Patanangala beach viewpoint"
        ]
      },
      {
        "name": "Mirissa",
        "lat": 5.9482,
        "lng": 80.4578,
        "activities": [
          "Dawn deep-sea whale & dolphin safari",
          "Coconut Tree Hill photography",
          "Secret Beach secluded cove"
        ]
      },
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "National Museum private tour",
          "Galle Face Green evening stroll",
          "Old Dutch Hospital dining"
        ]
      }
    ]
  },
  {
    "id": "pkg-wildlife-03",
    "slug": "untamed-biosphere-rainforest-odyssey",
    "title": "Untamed Biosphere & Rainforest Odyssey",
    "days": 17,
    "nights": 16,
    "category": "wildlife",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Lagoon catamaran sailing",
          "Dutch canal sunset cruise",
          "Fish market morning walk"
        ]
      },
      {
        "name": "Wilpattu",
        "lat": 8.4489,
        "lng": 80.0075,
        "activities": [
          "Natural villus safari",
          "Sri Lankan leopard tracking",
          "Wild Asian elephant sightings"
        ]
      },
      {
        "name": "Minneriya",
        "lat": 8.0336,
        "lng": 80.8322,
        "activities": [
          "Wild elephant herd observation",
          "Dry-zone birding",
          "Sunset reservoir safari"
        ]
      },
      {
        "name": "Gal Oya",
        "lat": 7.2167,
        "lng": 81.4667,
        "activities": [
          "Boat safari on Senanayake Samudra",
          "Swimming wild elephants observation",
          "Indigenous Vedda community walk"
        ]
      },
      {
        "name": "Kumana",
        "lat": 6.5186,
        "lng": 81.7003,
        "activities": [
          "Mangrove bird nesting sanctuaries",
          "Rare black-necked stork spotting",
          "Quiet wilderness 4x4 safari"
        ]
      },
      {
        "name": "Yala",
        "lat": 6.3688,
        "lng": 81.5204,
        "activities": [
          "Private naturalist-escorted game drive",
          "High leopard density tracking",
          "Patanangala beach viewpoint"
        ]
      },
      {
        "name": "Sinharaja",
        "lat": 6.4167,
        "lng": 80.4167,
        "activities": [
          "UNESCO virgin lowland rainforest trek",
          "Endemic mixed bird feeding flocks",
          "Giant fern & waterfall trail"
        ]
      },
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "National Museum private tour",
          "Galle Face Green evening stroll",
          "Old Dutch Hospital dining"
        ]
      }
    ]
  },
  {
    "id": "pkg-ceylon-tea-trails-colonial-grandeur",
    "slug": "ceylon-tea-trails-colonial-grandeur",
    "title": "Ceylon Tea Trails & Colonial Grandeur",
    "days": 8,
    "nights": 7,
    "category": "hill-country",
    "destinations": [
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "Old Dutch Hospital dining",
          "National Museum colonial exhibits",
          "Galle Face Green sunset walk"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "Temple of the Sacred Tooth Relic private viewing",
          "Royal Botanic Gardens Peradeniya stroll",
          "Kandyan cultural drumming performance"
        ]
      },
      {
        "name": "Nuwara Eliya",
        "lat": 6.9497,
        "lng": 80.7891,
        "activities": [
          "Pedro Tea Estate working factory tour",
          "Gregory Lake swan boat cruise",
          "High tea at historic Grand Hotel"
        ]
      },
      {
        "name": "Ella",
        "lat": 6.8667,
        "lng": 81.0466,
        "activities": [
          "Nine Arches Bridge scenic viaduct walk",
          "Little Adam's Peak sunrise hike",
          "Ravana Falls viewpoint & photography"
        ]
      }
    ]
  },
  {
    "id": "pkg-misty-peaks-scenic-railways-expedition",
    "slug": "misty-peaks-scenic-railways-expedition",
    "title": "Misty Peaks & Scenic Railways Expedition",
    "days": 10,
    "nights": 9,
    "category": "hill-country",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Lellama fishing market visit",
          "Dutch canal sunset cruise",
          "Boutique seaside relaxation"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "Temple of the Sacred Tooth Relic private viewing",
          "Royal Botanic Gardens Peradeniya stroll",
          "Kandyan cultural drumming performance"
        ]
      },
      {
        "name": "Hatton",
        "lat": 6.8916,
        "lng": 80.5975,
        "activities": [
          "Castlereagh Lake kayak excursion",
          "Private colonial bungalow garden lunch",
          "Bogawantalawa valley tea tasting"
        ]
      },
      {
        "name": "Nuwara Eliya",
        "lat": 6.9497,
        "lng": 80.7891,
        "activities": [
          "Pedro Tea Estate working factory tour",
          "Gregory Lake swan boat cruise",
          "High tea at historic Grand Hotel"
        ]
      },
      {
        "name": "Ella",
        "lat": 6.8667,
        "lng": 81.0466,
        "activities": [
          "Nine Arches Bridge scenic viaduct walk",
          "Little Adam's Peak sunrise hike",
          "Ravana Falls viewpoint & photography"
        ]
      },
      {
        "name": "Bandarawela",
        "lat": 6.8333,
        "lng": 80.9833,
        "activities": [
          "Dowa Rock Temple ancient murals",
          "Adisham Benedictine Monastery grounds",
          "Organic highland fruit farm visit"
        ]
      }
    ]
  },
  {
    "id": "pkg-highland-wilderness-cascading-waterfalls",
    "slug": "highland-wilderness-cascading-waterfalls",
    "title": "Highland Wilderness & Cascading Waterfalls",
    "days": 12,
    "nights": 11,
    "category": "hill-country",
    "destinations": [
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "Old Dutch Hospital dining",
          "National Museum colonial exhibits",
          "Galle Face Green sunset walk"
        ]
      },
      {
        "name": "Kitulgala",
        "lat": 6.9902,
        "lng": 80.4131,
        "activities": [
          "Kelani River nature walk",
          "Prehistoric Belilena cave exploration",
          "Tropical rainforest birdwatching"
        ]
      },
      {
        "name": "Nuwara Eliya",
        "lat": 6.9497,
        "lng": 80.7891,
        "activities": [
          "Pedro Tea Estate working factory tour",
          "Gregory Lake swan boat cruise",
          "High tea at historic Grand Hotel"
        ]
      },
      {
        "name": "Horton Plains",
        "lat": 6.8096,
        "lng": 80.8037,
        "activities": [
          "World's End sheer cliff trek",
          "Baker's Falls cataract hike",
          "Cloud forest endemic wildlife spotting"
        ]
      },
      {
        "name": "Haputale",
        "lat": 6.7686,
        "lng": 80.9575,
        "activities": [
          "Lipton's Seat 360-degree viewpoint",
          "Dambatenne Tea Factory historical tour",
          "Highland mountain pass photography"
        ]
      },
      {
        "name": "Ella",
        "lat": 6.8667,
        "lng": 81.0466,
        "activities": [
          "Nine Arches Bridge scenic viaduct walk",
          "Little Adam's Peak sunrise hike",
          "Ravana Falls viewpoint & photography"
        ]
      },
      {
        "name": "Adam's Peak",
        "lat": 6.8092,
        "lng": 80.4994,
        "activities": [
          "Sacred Sri Pada mountain vista",
          "Peak Wilderness Sanctuary hike",
          "Alpine tea estate garden stroll"
        ]
      }
    ]
  },
  {
    "id": "pkg-island-adrenaline-rapids-expedition",
    "slug": "island-adrenaline-rapids-expedition",
    "title": "Island Adrenaline & Rapids Expedition",
    "days": 8,
    "nights": 7,
    "category": "adventure",
    "destinations": [
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "Urban cycling tour through colonial Fort",
          "Kelani river kayak workout",
          "Galle Face breeze sprint"
        ]
      },
      {
        "name": "Kitulgala",
        "lat": 6.9902,
        "lng": 80.4131,
        "activities": [
          "Grade III-IV white water rafting on Kelani River",
          "Jungle canyoning & rock pool sliding",
          "Stream abseiling down rock faces"
        ]
      },
      {
        "name": "Knuckles",
        "lat": 7.4243,
        "lng": 80.7937,
        "activities": [
          "Cloud forest trek through Knuckles range",
          "Wild river gorge swimming",
          "Wilderness ridge trail hiking with ranger"
        ]
      },
      {
        "name": "Ella",
        "lat": 6.8667,
        "lng": 81.0466,
        "activities": [
          "Flying Ravana mega zip-line experience",
          "Ella Rock strenuous mountain ridge climb",
          "Off-road quad bike highland tour"
        ]
      },
      {
        "name": "Mirissa",
        "lat": 5.9482,
        "lng": 80.4578,
        "activities": [
          "Deep ocean offshore whale tracking boat",
          "Coconut Hill sunset surf check",
          "Secret Beach snorkeling session"
        ]
      }
    ]
  },
  {
    "id": "pkg-wild-peaks-trails-surf-safari",
    "slug": "wild-peaks-trails-surf-safari",
    "title": "Wild Peaks, Trails & Surf Safari",
    "days": 11,
    "nights": 10,
    "category": "adventure",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Maha Oya river paddle-boarding",
          "Lagoon catamaran sailing",
          "Coastal mangrove kayaking"
        ]
      },
      {
        "name": "Sinharaja",
        "lat": 6.4167,
        "lng": 80.4167,
        "activities": [
          "Deep virgin rainforest canopy hike",
          "Searching for endemic birds & reptiles with naturalist",
          "Natural forest stream swimming"
        ]
      },
      {
        "name": "Ella",
        "lat": 6.8667,
        "lng": 81.0466,
        "activities": [
          "Flying Ravana mega zip-line experience",
          "Ella Rock strenuous mountain ridge climb",
          "Off-road quad bike highland tour"
        ]
      },
      {
        "name": "Arugam Bay",
        "lat": 6.8428,
        "lng": 81.8344,
        "activities": [
          "Point break surfing with ISA instructors",
          "Lagoon safari watching crocodiles & elephants",
          "Kudumbigala forest hermitage trek"
        ]
      },
      {
        "name": "Yala",
        "lat": 6.3714,
        "lng": 81.5207,
        "activities": [
          "Rugged 4x4 leopard tracker expedition",
          "Kumana boundary birding by canoe",
          "Night campfire under equatorial stars"
        ]
      }
    ]
  },
  {
    "id": "pkg-lotus-ayu-holistic-rejuvenation",
    "slug": "lotus-ayu-holistic-rejuvenation",
    "title": "Lotus Ayu Holistic Rejuvenation",
    "days": 10,
    "nights": 9,
    "category": "ayurvedic",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Arrival relaxation & herbal tea welcome",
          "Seaside breathing exercises",
          "Ayurvedic physician introductory consultation"
        ]
      },
      {
        "name": "Wadduwa",
        "lat": 6.6631,
        "lng": 79.9328,
        "activities": [
          "Full-body herbal Abhyanga massage",
          "Shirodhara warm herbal oil forehead flow",
          "Doctor-formulated tri-dosha gourmet dining"
        ]
      },
      {
        "name": "Bentota",
        "lat": 6.4256,
        "lng": 79.9958,
        "activities": [
          "Daily sunrise yoga on quiet sands",
          "Pinda Sweda warm herbal pouch therapy",
          "Herbal steam bath & holistic meditation"
        ]
      },
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "Pettah herbal apothecary market walk",
          "Lotus Ceylon flagship spa consult",
          "Galle Face sunset mindfulness"
        ]
      }
    ]
  },
  {
    "id": "pkg-sacred-serenity-forest-meditation-retreat",
    "slug": "sacred-serenity-forest-meditation-retreat",
    "title": "Sacred Serenity & Forest Meditation Retreat",
    "days": 14,
    "nights": 13,
    "category": "ayurvedic",
    "destinations": [
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "Pettah herbal apothecary market walk",
          "Lotus Ceylon flagship spa consult",
          "Galle Face sunset mindfulness"
        ]
      },
      {
        "name": "Dambulla",
        "lat": 7.8742,
        "lng": 80.6511,
        "activities": [
          "Cave temple silent walking meditation",
          "Forest hermitage chanting & mindfulness",
          "Organic herbal garden walkthrough"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "Sacred Tooth Relic mindful evening offering",
          "Udawattakele royal forest sanctuary walk",
          "Ayurvedic doctor pulse consultation"
        ]
      },
      {
        "name": "Bentota",
        "lat": 6.4256,
        "lng": 79.9958,
        "activities": [
          "Daily sunrise yoga on quiet sands",
          "Pinda Sweda warm herbal pouch therapy",
          "Herbal steam bath & holistic meditation"
        ]
      }
    ]
  },
  {
    "id": "pkg-enchanted-ceylon-romantic-hideaway",
    "slug": "enchanted-ceylon-romantic-hideaway",
    "title": "Enchanted Ceylon Romantic Hideaway",
    "days": 9,
    "nights": 8,
    "category": "honeymoon",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Private sunset catamaran cruise with champagne",
          "Secluded beach candlelit seafood dining",
          "Couples spa massage treatment"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "Private balcony dinner overlooking misty hills",
          "Romantic Peradeniya royal garden stroll",
          "VIP blessings at sacred Tooth Relic"
        ]
      },
      {
        "name": "Tea Trails",
        "lat": 6.8916,
        "lng": 80.5975,
        "activities": [
          "Luxury planter bungalow private fireplace dinner",
          "Romantic picnic lunch by Castlereagh Lake",
          "Afternoon tea & strawberry tasting"
        ]
      },
      {
        "name": "Galle Fort",
        "lat": 6.0328,
        "lng": 80.2168,
        "activities": [
          "Sunset stroll along 17th-century ramparts",
          "Fine dining in restored Dutch mansion courtyards",
          "Private gemstone shopping & artisan jewel craft"
        ]
      },
      {
        "name": "Tangalle",
        "lat": 6.0243,
        "lng": 80.7941,
        "activities": [
          "Private cliffside plunge pool relaxation",
          "Candlelit dinner on isolated Mawella beach",
          "Sunset cocktails overlooking coconut palms"
        ]
      }
    ]
  },
  {
    "id": "pkg-pure-serenade-coastal-highland-romance",
    "slug": "pure-serenade-coastal-highland-romance",
    "title": "Pure Serenade Coastal & Highland Romance",
    "days": 12,
    "nights": 11,
    "category": "honeymoon",
    "destinations": [
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "Ocean-view luxury suite check-in",
          "Sunset aperitifs at Galle Face Hotel terrace",
          "Fine dining at Ministry of Crab"
        ]
      },
      {
        "name": "Cultural Triangle",
        "lat": 7.957,
        "lng": 80.7603,
        "activities": [
          "Private sunrise hot air balloon flight over Sigiriya",
          "Champagne sunset climb of Pidurangala rock",
          "Luxury eco-lodge pool villa dinner"
        ]
      },
      {
        "name": "Nuwara Eliya",
        "lat": 6.9497,
        "lng": 80.7891,
        "activities": [
          "Romantic boat ride on Lake Gregory",
          "Fireside wine & high tea in colonial manor",
          "Victoria Park botanical stroll"
        ]
      },
      {
        "name": "Yala",
        "lat": 6.3714,
        "lng": 81.5207,
        "activities": [
          "Private luxury tented safari glamping",
          "Candlelight dinner under southern skies in the dunes",
          "Exclusive private 4x4 leopard safari"
        ]
      },
      {
        "name": "Mirissa",
        "lat": 5.9482,
        "lng": 80.4578,
        "activities": [
          "Private chartered yacht whale watching",
          "Sunset couple photography on Coconut Tree Hill",
          "Secluded beach daybed relaxation"
        ]
      }
    ]
  },
  {
    "id": "pkg-island-wonder-multi-gen-family-discovery",
    "slug": "island-wonder-multi-gen-family-discovery",
    "title": "Island Wonder Multi-Gen Family Discovery",
    "days": 10,
    "nights": 9,
    "category": "family",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Beach sandcastle building & kid-friendly pool",
          "Lagoon boat safari spotting kingfishers & crabs",
          "Fresh tropical fruit tasting"
        ]
      },
      {
        "name": "Pinnawala",
        "lat": 7.3013,
        "lng": 80.3853,
        "activities": [
          "Elephant river bathing spectacle from riverside cafe",
          "Visiting baby elephants at feeding time",
          "Handmade elephant dung paper craft workshop"
        ]
      },
      {
        "name": "Sigiriya",
        "lat": 7.957,
        "lng": 80.7603,
        "activities": [
          "Gentle climb of Sigiriya water gardens",
          "Bullock cart & catamaran village safari",
          "Clay cooking class making coconut roti"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "Royal Botanic Gardens giant tree climbing & bats",
          "Kandyan traditional fire-walking show",
          "Tooth Relic golden roof viewing"
        ]
      },
      {
        "name": "Nuwara Eliya",
        "lat": 6.9497,
        "lng": 80.7891,
        "activities": [
          "Strawberry picking at highland farm",
          "Pony rides & pedal boating on Gregory Lake",
          "Ambewela highland dairy farm tour"
        ]
      },
      {
        "name": "Bentota",
        "lat": 6.4256,
        "lng": 79.9958,
        "activities": [
          "Kosgoda Sea Turtle Conservation hatchery",
          "Madu River mangrove boat safari & fish therapy",
          "Watersports: banana boat & jet ski fun"
        ]
      }
    ]
  },
  {
    "id": "pkg-wild-safari-coastal-family-holiday",
    "slug": "wild-safari-coastal-family-holiday",
    "title": "Wild Safari & Coastal Family Holiday",
    "days": 12,
    "nights": 11,
    "category": "family",
    "destinations": [
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "Viharamahadevi Park playground & train",
          "Tuk-tuk safari tasting street food",
          "Colombo National Museum skeleton displays"
        ]
      },
      {
        "name": "Minneriya",
        "lat": 8.0333,
        "lng": 80.9,
        "activities": [
          "The Great Elephant Gathering jeep safari",
          "Open-top 4x4 adventure across grassland",
          "Spotting deer, peacocks & hornbills"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "Royal Botanic Gardens giant tree climbing & bats",
          "Kandyan traditional fire-walking show",
          "Tooth Relic golden roof viewing"
        ]
      },
      {
        "name": "Ella",
        "lat": 6.8667,
        "lng": 81.0466,
        "activities": [
          "Riding the world-famous blue train over 9 Arches",
          "Easy walk to Little Adam's Peak",
          "Fresh fruit smoothie cafe stops"
        ]
      },
      {
        "name": "Yala",
        "lat": 6.3714,
        "lng": 81.5207,
        "activities": [
          "Thrilling wildlife tracking game drive",
          "Looking for elephants, sloth bears & leopards",
          "Beachcombing at coastal safari camp"
        ]
      },
      {
        "name": "Galle",
        "lat": 6.0328,
        "lng": 80.2168,
        "activities": [
          "Walk atop historic Galle Fort thick stone walls",
          "Ice cream tasting in cobblestone Dutch lanes",
          "Searching for hermit crabs at lighthouse beach"
        ]
      },
      {
        "name": "Mirissa",
        "lat": 5.9482,
        "lng": 80.4578,
        "activities": [
          "Boat cruise searching for dolphins & whales",
          "Gentle swimming at calm Mirissa bay",
          "Coconut Tree Hill family photo shoot"
        ]
      }
    ]
  },
  {
    "id": "pkg-the-grand-ceylon-family-adventure",
    "slug": "the-grand-ceylon-family-adventure",
    "title": "The Grand Ceylon Family Adventure",
    "days": 14,
    "nights": 13,
    "category": "family",
    "destinations": [
      {
        "name": "Negombo",
        "lat": 7.2083,
        "lng": 79.8358,
        "activities": [
          "Beach sandcastle building & kid-friendly pool",
          "Lagoon boat safari spotting kingfishers & crabs",
          "Fresh tropical fruit tasting"
        ]
      },
      {
        "name": "Wilpattu",
        "lat": 8.45,
        "lng": 80.0167,
        "activities": [
          "Scenic jungle drive past sparkling natural villus",
          "Spotting wild barking deer & painted storks",
          "Junior ranger tracking certificates"
        ]
      },
      {
        "name": "Cultural Triangle",
        "lat": 7.957,
        "lng": 80.7603,
        "activities": [
          "Cycling through ancient Polonnaruwa ruins",
          "Sigiriya ancient lion paw gate ascent",
          "Village catamaran lake cruise"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "Royal Botanic Gardens giant tree climbing & bats",
          "Kandyan traditional fire-walking show",
          "Tooth Relic golden roof viewing"
        ]
      },
      {
        "name": "Scenic Train",
        "lat": 6.9497,
        "lng": 80.7891,
        "activities": [
          "Iconic mountain rail journey through misty tunnels",
          "Waving to village children along tea hills",
          "Snacking on roasted highland peanuts"
        ]
      },
      {
        "name": "Bentota",
        "lat": 6.4256,
        "lng": 79.9958,
        "activities": [
          "Kosgoda Sea Turtle Conservation hatchery",
          "Madu River mangrove boat safari & fish therapy",
          "Watersports: banana boat & jet ski fun"
        ]
      }
    ]
  },
  {
    "id": "pkg-sacred-ramayana-heritage-trail",
    "slug": "sacred-ramayana-heritage-trail",
    "title": "Sacred Ramayana Heritage Trail",
    "days": 7,
    "nights": 6,
    "category": "ramayana",
    "destinations": [
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "Kelaniya Raja Maha Vihara (Vibhishana coronation shrine)",
          "Anjaneyar Temple (Panchamukha Hanuman)",
          "Sri Ponnambalawaneswaram Temple"
        ]
      },
      {
        "name": "Chilaw",
        "lat": 7.5758,
        "lng": 79.7953,
        "activities": [
          "Munneswaram Shiva Temple (Lord Rama's atonement)",
          "Manavari Temple (first lingam installed by Rama)",
          "Chilaw lagoon coastal prayers"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "Temple of the Sacred Tooth Relic visit",
          "Kataragama Devale ancient shrine",
          "Royal highland panoramic views"
        ]
      },
      {
        "name": "Nuwara Eliya",
        "lat": 6.9497,
        "lng": 80.7891,
        "activities": [
          "Seetha Amman Temple & footprints of Lord Hanuman",
          "Ashoka Vatika (Hakgala Botanical Gardens)",
          "Divurumpola Agni Pariksha sacred temple"
        ]
      }
    ]
  },
  {
    "id": "pkg-the-epic-ramayana-chronicle-pilgrimage",
    "slug": "the-epic-ramayana-chronicle-pilgrimage",
    "title": "The Epic Ramayana Chronicle Pilgrimage",
    "days": 10,
    "nights": 9,
    "category": "ramayana",
    "destinations": [
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "Kelaniya Raja Maha Vihara (Vibhishana coronation shrine)",
          "Anjaneyar Temple (Panchamukha Hanuman)",
          "Sri Ponnambalawaneswaram Temple"
        ]
      },
      {
        "name": "Mannar",
        "lat": 8.981,
        "lng": 79.9042,
        "activities": [
          "Thiruketheeswaram ancient Ishwaram temple",
          "Adam's Bridge (Rama Setu) geological formation",
          "Baobab tree & historic Mannar fort"
        ]
      },
      {
        "name": "Jaffna",
        "lat": 9.6615,
        "lng": 80.0255,
        "activities": [
          "Nallur Kandaswamy Kovil grand worship",
          "Nagapooshani Amman Temple on Nainativu island",
          "Keerimalai sacred natural healing spring"
        ]
      },
      {
        "name": "Trincomalee",
        "lat": 8.5711,
        "lng": 81.2335,
        "activities": [
          "Koneswaram Temple atop majestic Swami Rock",
          "Ravana's Cleft (Ravana Vettuwa)",
          "Kanniya sacred hot water springs"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "Temple of the Sacred Tooth Relic visit",
          "Kataragama Devale ancient shrine",
          "Royal highland panoramic views"
        ]
      },
      {
        "name": "Nuwara Eliya",
        "lat": 6.9497,
        "lng": 80.7891,
        "activities": [
          "Seetha Amman Temple & footprints of Lord Hanuman",
          "Ashoka Vatika (Hakgala Botanical Gardens)",
          "Divurumpola Agni Pariksha sacred temple"
        ]
      },
      {
        "name": "Ella",
        "lat": 6.8667,
        "lng": 81.0466,
        "activities": [
          "Ravana Ella waterfall sacred pools",
          "Ravana Cave high-mountain cavern trail",
          "Nil Diya Pokuna underground lake entrance"
        ]
      }
    ]
  },
  {
    "id": "pkg-the-royal-ceylon-fairways-tour",
    "slug": "the-royal-ceylon-fairways-tour",
    "title": "The Royal Ceylon Fairways Tour",
    "days": 7,
    "nights": 6,
    "category": "golf",
    "destinations": [
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "18 Holes at Royal Colombo Golf Club (est. 1879)",
          "Clubhouse terrace drinks & historical tour",
          "Pro-shop fitting & driving range warmup"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "18 Holes at Victoria Golf Resort by Donald Steel",
          "Lake Victoria stunning water hazards & fairways",
          "Championship club dinner in the hills"
        ]
      }
    ]
  },
  {
    "id": "pkg-highland-greens-coastal-links-championship",
    "slug": "highland-greens-coastal-links-championship",
    "title": "Highland Greens & Coastal Links Championship",
    "days": 10,
    "nights": 9,
    "category": "golf",
    "destinations": [
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "18 Holes at Royal Colombo Golf Club (est. 1879)",
          "Clubhouse terrace drinks & historical tour",
          "Pro-shop fitting & driving range warmup"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "18 Holes at Victoria Golf Resort by Donald Steel",
          "Lake Victoria stunning water hazards & fairways",
          "Championship club dinner in the hills"
        ]
      },
      {
        "name": "Nuwara Eliya",
        "lat": 6.9497,
        "lng": 80.7891,
        "activities": [
          "18 Holes at Nuwara Eliya Golf Club (est. 1889)",
          "High-altitude ball trajectory across fir trees",
          "Log-fire whisky night at colonial clubhouse"
        ]
      },
      {
        "name": "Hambantota",
        "lat": 6.1362,
        "lng": 81.0425,
        "activities": [
          "18 Holes at Shangri-La Hambantota Golf Resort",
          "Oceanfront par 3 coastal wind challenges",
          "Post-round luxury spa & beach relaxation"
        ]
      }
    ]
  },
  {
    "id": "pkg-the-grand-ceylon-masters-golf-odyssey",
    "slug": "the-grand-ceylon-masters-golf-odyssey",
    "title": "The Grand Ceylon Masters Golf Odyssey",
    "days": 12,
    "nights": 11,
    "category": "golf",
    "destinations": [
      {
        "name": "Colombo",
        "lat": 6.9271,
        "lng": 79.8612,
        "activities": [
          "18 Holes at Royal Colombo Golf Club (est. 1879)",
          "Clubhouse terrace drinks & historical tour",
          "Pro-shop fitting & driving range warmup"
        ]
      },
      {
        "name": "Kandy",
        "lat": 7.2906,
        "lng": 80.6337,
        "activities": [
          "18 Holes at Victoria Golf Resort by Donald Steel",
          "Lake Victoria stunning water hazards & fairways",
          "Championship club dinner in the hills"
        ]
      },
      {
        "name": "Nuwara Eliya",
        "lat": 6.9497,
        "lng": 80.7891,
        "activities": [
          "18 Holes at Nuwara Eliya Golf Club (est. 1889)",
          "High-altitude ball trajectory across fir trees",
          "Log-fire whisky night at colonial clubhouse"
        ]
      },
      {
        "name": "Hambantota",
        "lat": 6.1362,
        "lng": 81.0425,
        "activities": [
          "18 Holes at Shangri-La Hambantota Golf Resort",
          "Oceanfront par 3 coastal wind challenges",
          "Post-round luxury spa & beach relaxation"
        ]
      },
      {
        "name": "Galle",
        "lat": 6.0328,
        "lng": 80.2168,
        "activities": [
          "Sunset dinner at historic Galle Fort",
          "Private transfer along Southern Expressway",
          "Colonial luxury hotel overnight"
        ]
      }
    ]
  }
];

  class LotusTourMap {
    constructor(containerId, options = {}) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;

      this.options = options;
      this.category = options.category || this.container.dataset.category;
      this.packageId = options.packageId || this.container.dataset.packageId;
      this.packagesData = [];
      this.map = null;
      this.layerGroups = {};
      this.initialized = false;

      this.initLazyLoading();
    }

    initLazyLoading() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.initialized) {
              this.initialized = true;
              this.loadAndRender();
              observer.unobserve(entry.target);
            }
          });
        }, { rootMargin: '300px 0px' });
        observer.observe(this.container);
      } else {
        this.loadAndRender();
      }
    }

    async loadAndRender() {
      try {
        if (!window.L) {
          console.warn('[LotusTourMap] Leaflet library not loaded.');
          return;
        }

        const dataPath = this.options.dataPath || 'data/packages.json';
        let allPackages = [];

        // 1. Check in-memory global catalog
        if (window.LOTUS_PACKAGES_DATA && Array.isArray(window.LOTUS_PACKAGES_DATA.packages)) {
          allPackages = window.LOTUS_PACKAGES_DATA.packages;
        }

        // 2. Try Firebase cached catalog
        if ((!allPackages || allPackages.length === 0) && window.LotusFirebase && typeof window.LotusFirebase.getCatalog === 'function') {
          try {
            const data = await window.LotusFirebase.getCatalog(dataPath);
            if (data && data.packages) allPackages = data.packages;
          } catch (e) {}
        }

        // 3. Try standard fetch (works on HTTP/HTTPS)
        if (!allPackages || allPackages.length === 0) {
          try {
            const res = await fetch(dataPath);
            if (res.ok) {
              const data = await res.json();
              allPackages = data.packages || [];
            }
          } catch (fetchErr) {
            // Expected on file:/// protocol
          }
        }

        // 4. Reliable built-in fallback (prevents empty grey map on file:/// or offline)
        if (!allPackages || allPackages.length === 0) {
          allPackages = BUILTIN_FALLBACK_PACKAGES;
        }

        // Filter for specific package or category
        if (this.packageId) {
          this.packagesData = allPackages.filter(p => p.id === this.packageId || p.slug === this.packageId);
        } else if (this.category && this.category !== 'all') {
          this.packagesData = allPackages.filter(p => p.category === this.category);
        } else {
          // Signature geographic overview: 4 diverse regional flagship circuits
          const signatureSlugs = [
            'southern-sands-serenade',
            'royal-kingdoms-sacred-temples',
            'wild-ceylon-predator-elephant-trail',
            'ceylon-tea-trails-colonial-grandeur'
          ];
          const flagship = allPackages.filter(p => signatureSlugs.includes(p.slug) || signatureSlugs.includes(p.id));
          this.packagesData = flagship.length > 0 ? flagship : allPackages.slice(0, 4);
        }

        if (this.packagesData.length === 0 && allPackages.length > 0) {
          this.packagesData = allPackages.slice(0, 3);
        }

        this.renderMap();
        this.renderAccessibleFallback();
      } catch (err) {
        console.error('[LotusTourMap] Error initializing map:', err);
      }
    }

    renderMap() {
      if (this.map) {
        try { this.map.remove(); } catch (e) {}
      }

      // Initialize map with high-performance settings
      this.map = L.map(this.container, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        scrollWheelZoom: false,
        attributionControl: true,
        fadeAnimation: true,
        zoomControl: true
      });

      // Add CartoDB Voyager tiles (crisp, beautiful, never aborted on file:///)
      const tileLayer = L.tileLayer(TILE_URL, {
        subdomains: 'abcd',
        maxZoom: 19,
        attribution: ATTRIBUTION
      });

      tileLayer.on('tileerror', () => {
        // Fallback to standard OpenStreetMap tiles if CartoDB fails
        if (!this._osmFallbackAdded) {
          this._osmFallbackAdded = true;
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; OpenStreetMap'
          }).addTo(this.map);
        }
      });

      tileLayer.addTo(this.map);

      // Create Route Layers & Markers
      const allBounds = [];
      this.packagesData.forEach((pkg, pkgIdx) => {
        const colorScheme = ROUTE_COLORS[pkgIdx % ROUTE_COLORS.length];
        const layerGroup = L.layerGroup();
        const routeCoords = [];

        const dests = pkg.destinations || [];
        dests.forEach((d, idx) => {
          const lat = Number(d.lat);
          const lng = Number(d.lng);
          if (isNaN(lat) || isNaN(lng)) return;

          routeCoords.push([lat, lng]);
          allBounds.push([lat, lng]);

          // Create Numbered SVG Marker
          const stopNum = idx + 1;
          const customIcon = L.divIcon({
            className: 'lotus-map-marker-pin',
            html: '<div style="' +
              'background: ' + colorScheme.stroke + ';' +
              'color: #FFFFFF;' +
              'width: 28px;' +
              'height: 28px;' +
              'border-radius: 50%;' +
              'display: flex;' +
              'align-items: center;' +
              'justify-content: center;' +
              'font-family: Plus Jakarta Sans, sans-serif;' +
              'font-size: 11px;' +
              'font-weight: 800;' +
              'border: 2.5px solid #FFFFFF;' +
              'box-shadow: 0 4px 10px rgba(0,0,0,0.3);' +
            '">' + stopNum + '</div>',
            iconSize: [28, 28],
            iconAnchor: [14, 14],
            popupAnchor: [0, -16]
          });

          // Accessible popup with destination info
          const activitiesList = (d.activities && d.activities.length > 0)
            ? '<ul style="margin: 6px 0 0; padding-left: 16px; font-size: 12px; color: #4A5568;">' +
                d.activities.map(a => '<li>' + a + '</li>').join('') +
              '</ul>'
            : '';

          const popupContent = 
            '<div style="font-family: Plus Jakarta Sans, sans-serif; min-width: 170px;">' +
              '<span style="font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: ' + colorScheme.stroke + ';">' +
                (pkg.title || pkg.name || 'Tour') + ' • Stop ' + stopNum +
              '</span>' +
              '<h4 style="margin: 4px 0 2px; font-size: 14px; font-weight: 700; color: #002B49;">' + d.name + '</h4>' +
              activitiesList +
            '</div>';

          const marker = L.marker([lat, lng], {
            icon: customIcon,
            title: d.name + ' (Stop ' + stopNum + ')',
            alt: 'Map pin for ' + d.name
          }).bindPopup(popupContent);

          layerGroup.addLayer(marker);
        });

        // Draw Route Line
        if (routeCoords.length > 1) {
          const polyline = L.polyline(routeCoords, {
            color: colorScheme.stroke,
            weight: 3.5,
            opacity: 0.85,
            dashArray: pkgIdx > 0 ? '6, 6' : undefined,
            smoothFactor: 1
          });
          layerGroup.addLayer(polyline);
        }

        layerGroup.addTo(this.map);
        this.layerGroups[pkg.id] = { group: layerGroup, pkg, color: colorScheme };
      });

      // Fit bounds if valid coordinates exist
      if (allBounds.length > 0) {
        this.map.fitBounds(allBounds, { padding: [35, 35], maxZoom: 10 });
      }

      // Crucial: Recalculate dimensions so map never renders empty/grey
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 200);

      window.addEventListener('resize', () => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, { passive: true });

      this.renderControls();
    }

    renderControls() {
      if (this.packagesData.length <= 1) return;
      if (this.container.parentNode && this.container.parentNode.querySelector('.lotus-map-package-selector')) {
        return; // Already rendered
      }

      const controlBar = document.createElement('div');
      controlBar.className = 'lotus-map-package-selector';
      controlBar.setAttribute('role', 'tablist');
      controlBar.setAttribute('aria-label', 'Select Tour Route on Map');

      this.packagesData.forEach((pkg, idx) => {
        const color = ROUTE_COLORS[idx % ROUTE_COLORS.length];
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'lotus-map-tab-btn ' + (idx === 0 ? 'active' : '');
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
        btn.innerHTML = 
          '<span class="route-legend-bullet" style="background: ' + color.stroke + ';"></span>' +
          '<span>' + (pkg.title || pkg.name) + ' (' + (pkg.nights || 0) + 'N/' + (pkg.days || 0) + 'D)</span>';

        btn.addEventListener('click', () => {
          controlBar.querySelectorAll('.lotus-map-tab-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          // Toggle visible layers
          Object.entries(this.layerGroups).forEach(([id, item]) => {
            if (id === pkg.id) {
              if (!this.map.hasLayer(item.group)) this.map.addLayer(item.group);
            } else {
              if (this.map.hasLayer(item.group)) this.map.removeLayer(item.group);
            }
          });
        });

        controlBar.appendChild(btn);
      });

      if (this.container.parentNode) {
        this.container.parentNode.insertBefore(controlBar, this.container);
      }
    }

    renderAccessibleFallback() {
      if (this.container.parentNode && this.container.parentNode.querySelector('.lotus-map-accessible-fallback')) {
        return;
      }

      const fallbackWrap = document.createElement('div');
      fallbackWrap.className = 'lotus-map-accessible-fallback';
      fallbackWrap.innerHTML = 
        '<details style="margin-top: 14px; font-family: Plus Jakarta Sans, sans-serif; font-size: 13px; color: #4A5568;">' +
          '<summary style="cursor: pointer; font-weight: 700; color: #002B49; padding: 4px 0;">' +
            '🗺️ View Complete Text Itinerary of Route Stops' +
          '</summary>' +
          '<div style="padding: 10px 0;">' +
            this.packagesData.map(pkg => 
              '<div style="margin-bottom: 12px;">' +
                '<strong style="color: #002B49;">' + (pkg.title || pkg.name) + ' (' + (pkg.nights || 0) + ' Nights & ' + (pkg.days || 0) + ' Days):</strong>' +
                '<ol style="margin: 4px 0 0; padding-left: 20px;">' +
                  (pkg.destinations || []).map(d => 
                    '<li><strong>' + d.name + ':</strong> ' + (d.activities && d.activities.length ? d.activities.join(', ') : 'Sightseeing & Safari') + '</li>'
                  ).join('') +
                '</ol>' +
              '</div>'
            ).join('') +
          '</div>' +
        '</details>';

      if (this.container.parentNode) {
        this.container.parentNode.appendChild(fallbackWrap);
      }
    }
  }

  // Auto-initialize any .js-lotus-route-map containers
  function initAllMaps() {
    document.querySelectorAll('.js-lotus-route-map').forEach(el => {
      new LotusTourMap(el.id, {
        category: el.dataset.category,
        packageId: el.dataset.packageId,
        dataPath: el.dataset.dataPath || 'data/packages.json'
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllMaps);
  } else {
    initAllMaps();
  }

  window.LotusTourMap = LotusTourMap;
})();
