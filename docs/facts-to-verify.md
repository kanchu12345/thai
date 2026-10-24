# Lotus Ceylon — Facts to Verify Before Launch

This document tracks all operational, cultural, regulatory, and technical facts that the business owner and destination operations team should verify before official public advertising.

---

## 1. Sacred Monuments & Temple Protocols
- **Dress Code Requirements:** Shoulders and knees must be fully covered at all Buddhist and Hindu shrines (Temple of the Tooth in Kandy, Dambulla Cave Temples, Anuradhapura Ruwanwelisaya, Kelaniya Raja Maha Vihara, Munneswaram Temple, Seetha Amman Temple). White or light-colored attire is respectful and customary.
- **Footwear & Headwear:** Shoes, hats, and sunglasses must be removed prior to stepping onto temple terraces and sacred compounds. Shoe-minding stations are available at temple entrances (nominal tip of 50–100 LKR).
- **Photography Etiquette:** Posing for selfies with one's back turned to a Buddha statue is strictly prohibited by Sri Lankan cultural laws and considered offensive. Flash photography is disallowed in painted cave sanctuaries (Dambulla, Sigiriya frescoes).

---

## 2. Wildlife Parks & Marine Conservation
- **Yala National Park (Block 1):** Annual drought closure typically occurs in September and early October for wildlife replenishment. Alternative game drives during this period run through Yala Block 5, Lunugamvehera, or Bundala.
- **Minneriya & Kaudulla "The Gathering":** Peak elephant aggregation occurs between July and October at Minneriya Reservoir as water levels recede. In late October/November, herds migrate between Kaudulla and Eco Park depending on seasonal rains.
- **Whale Watching Seasons:** 
  - *South Coast (Mirissa):* Peak season runs from November to April (calm seas, blue whales, sperm whales, spinner dolphins).
  - *East Coast (Trincomalee):* Peak season runs from May to September.
- **Kosgoda Sea Turtle Hatchery & Conservation:** Emphasize non-invasive educational visits; night nesting observation is regulated.

---

## 3. Adventure, Trains & Scenic Activities
- **Scenic Mountain Railway (Kandy – Nuwara Eliya – Ella):** First-class reserved observation car tickets open for reservation strictly **30 days prior** to travel date via Sri Lanka Railways. Due to extreme global demand, Lotus Ceylon reserves tickets on opening morning. If reserved first-class is sold out, reserved second-class or luxury private chauffeur backup transit is provided.
- **Hot Air Ballooning:** Operates exclusively from Kandalama / Dambulla between November and April, weather permitting.
- **White-Water Rafting (Kitulgala):** Operates year-round on Grade 2–3+ rapids on the Kelani River; high-water seasons occur during monsoon peaks.
- **Kite Surfing (Kalpitiya):** Dual peak wind seasons: Summer (May to October, 20–25 knots) and Winter (December to February, 15–20 knots).
- **Adam's Peak (Sri Pada) Pilgrimage Season:** Unduvap Poya (December full moon) to Vesak Poya (May full moon). Climbing outside this season is possible but nighttime path lighting and tea stalls are closed.

---

## 4. Visa & Entry Regulations
- **Electronic Travel Authorization (ETA / eVisa):** All foreign nationals must secure an official entry visa online prior to boarding. Always link exclusively to the official Sri Lanka Government immigration portal: `https://www.srilankaevisa.lk` (beware third-party scam lookalike websites).
- **Passport Validity:** Must have minimum 6 months validity from date of arrival.

---

## 5. Marketing Claims & Tone Calibration
- **"1,300 km Coastline":** Accurate official geographic measurement of Sri Lanka's marine coastline is approximately 1,340 km.
- **"Over 50 Ramayana Sites":** Verify historical references mapped by the Ministry of Tourism's Ramayana Trail research committee.
- **"3,000-Year-Old Ayurveda Tradition":** Grounded in ancient Hela Wedakama indigenous medicine intertwined with classical Ayurvedic texts; accurate historically.
- **"Highest Leopard Density in the World":** Yala National Park Block 1 historically records one of the highest recorded densities of *Panthera pardus kotiya* (approx. 1 leopard per square kilometer).
- **"Sri Lanka's Big Five":** Blue Whale, Sperm Whale, Leopard, Asian Elephant, and Sloth Bear.
- **"140+ Years of Golf Heritage":** Royal Colombo Golf Club was founded in 1879, making it the oldest golf club in Sri Lanka and second oldest Royal club outside the British Isles (147 years). Nuwara Eliya Golf Club was founded in 1889.

---

## 6. Technical & Third-Party Service Quotas
- **OpenStreetMap Public Tile Server Usage:** Free tile servers (`tile.openstreetmap.org`) are suitable for moderate traffic. If site traffic exceeds 50,000 monthly map views, consider upgrading to a dedicated cached tile layer (e.g. MapTiler or Protomaps).
- **Cloudinary Free Tier Quotas:** Current free plan includes 25 monthly credits (approx. 25,000 transformations or 25 GB storage/bandwidth). Use auto-format `f_auto` and quality `q_auto` on all image deliveries.
- **Firebase Spark Tier Limits:** Spark plan includes 50,000 daily Firestore document reads, 20,000 daily document writes, and 1 GB storage. Client caching in `localStorage` prevents redundant reads.
