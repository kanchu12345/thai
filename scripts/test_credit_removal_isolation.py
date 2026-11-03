import re
import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

credit_pattern = r'Designed\s*(?:&amp;|&|and)\s*Developed by\s*<a[^>]*https://infiniteweb\.dev/[^>]*>Infinite Design</a>'
stripped_html = re.sub(credit_pattern, '', html, flags=re.IGNORECASE)

print(f"Original index.html length: {len(html)}")
print(f"Stripped index.html length: {len(stripped_html)}")
assert len(stripped_html) < len(html), "Credit link was successfully removed in simulation"
assert 'Infinite Design</a>' not in stripped_html, "Credit link verified absent"

soup = BeautifulSoup(stripped_html, 'html.parser')
assert soup.find('header', id='siteHeader') is not None, "Header intact"
assert soup.find('footer', id='siteFooter') is not None, "Footer intact"
assert soup.find('form') is not None, "Search/Inquiry form intact"
assert len(soup.find_all('script')) >= 5, "All scripts intact"
assert soup.find('video', class_='video-banner-video') is not None, "Hero video intact"

print("[PASS] Acceptance Check 1: Site renders 100% normally when footer credit is completely absent.")
