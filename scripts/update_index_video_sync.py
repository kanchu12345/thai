import re, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update initial badge HTML text
old_badge_html = """  <div class="location-badge-text-col">
    <span class="location-badge-label" id="heroLocationTitle">Lotus Blossom Sanctuaries</span>
    <span class="location-badge-sub" id="heroLocationSub">Sacred Waters of Ceylon</span>
  </div>"""

new_badge_html = """  <div class="location-badge-text-col">
    <span class="location-badge-label" id="heroLocationTitle">Lotus Tower &amp; Colombo Skyline</span>
    <span class="location-badge-sub" id="heroLocationSub">Iconic Capital Landmark (350m)</span>
  </div>"""

if old_badge_html in content:
    content = content.replace(old_badge_html, new_badge_html)
    print("Replaced initial badge text")

# 2. Update CSS for razor sharp typography
old_css_part = """.location-badge-label {
  font-size: 0.84rem;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0.02em;
  font-family: var(--font-heading, 'Playfair Display', serif);
}
.location-badge-sub {
  font-size: 0.68rem;
  color: #D4AF37;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
}"""

new_css_part = """.location-badge-label {
  font-size: 0.88rem;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0.02em;
  font-family: var(--font-heading, 'Playfair Display', serif);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.location-badge-sub {
  font-size: 0.70rem;
  color: #F5C842;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.85);
  -webkit-font-smoothing: antialiased;
}"""

if old_css_part in content:
    content = content.replace(old_css_part, new_css_part)
    print("Updated badge typography CSS")

# 3. Update scenes array in JavaScript
pattern = r'var scenes = \[\s*\{ start: 0\.0.*?\}\s*\];'
new_scenes_js = """var scenes = [
    { start: 0.0, end: 3.6, title: 'Lotus Tower & Colombo Skyline', sub: 'Iconic Capital Landmark (350m)' },
    { start: 3.6, end: 7.2, title: 'Colombo Maritime Capital', sub: 'Beira Lake & Ocean Horizon' },
    { start: 7.2, end: 10.8, title: 'Sacred Anuradhapura & Nuwara Wewa', sub: 'Ancient Buddhist Capital (4th c. BCE)' },
    { start: 10.8, end: 14.4, title: 'Colossal Jetavanaramaya Stupa', sub: 'UNESCO Sacred Heritage & Monasteries' },
    { start: 14.4, end: 18.0, title: 'Sigiriya Ancient Rock Citadel', sub: '5th Century Royal Sky Palace' },
    { start: 18.0, end: 21.6, title: 'Sigiriya Lion\\'s Paw Terrace', sub: 'Royal Ascent & Ancient Ramparts' },
    { start: 21.6, end: 25.2, title: 'Dambulla Golden Rock Temple', sub: 'Sacred Cave Monastery & Murals' },
    { start: 25.2, end: 28.8, title: 'Nine Arch Demodara Bridge', sub: 'Highland Colonial Railway, Ella' },
    { start: 28.8, end: 32.4, title: 'Diyaluma Cascading Waterfall', sub: 'Highland Mountain Rapids, Koslanda' },
    { start: 32.4, end: 36.0, title: 'Ambuluwawa Biodiversity Spire', sub: 'Misty 360° Mountain Summit, Gampola' },
    { start: 36.0, end: 39.6, title: 'Kandy Sacred Hill Capital', sub: 'Last Royal Kingdom & Sacred Valley' },
    { start: 39.6, end: 43.2, title: 'Anuradhapura Sacred Parklands', sub: 'Ancient Monasteries & Royal Gardens' },
    { start: 43.2, end: 46.8, title: 'Maskeliya & Nuwara Eliya Valleys', sub: 'Pure Ceylon Tea Country & Lakes' },
    { start: 46.8, end: 50.4, title: 'Wild Elephant Gathering', sub: 'Kaudulla & Minneriya Sanctuaries' },
    { start: 50.4, end: 54.0, title: 'Yala National Park Wilderness', sub: 'Untamed Wildlife & Open Savannas' },
    { start: 54.0, end: 57.6, title: 'Galle Dutch Fort Ramparts', sub: 'UNESCO 17th Century Living Citadel' },
    { start: 57.6, end: 61.2, title: 'Bentota Golden Beach', sub: 'Pristine Southwest Turquoise Coast' },
    { start: 61.2, end: 66.0, title: 'Dondra Head Lighthouse', sub: 'Southernmost Tip of Sri Lanka' }
  ];"""

m = re.search(pattern, content, re.DOTALL)
if m:
    content = content[:m.start()] + new_scenes_js + content[m.end():]
    print("Replaced scenes array with 18 verified destinations!")
else:
    print("Warning: scenes regex pattern did not match!")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Saved updated index.html!")
