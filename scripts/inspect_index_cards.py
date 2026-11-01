import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

m = re.search(r'<section[^>]*id=["\']news["\'].*?</section>', c, re.DOTALL)
if m:
    sec = m.group(0)
    cards = re.findall(r'<a[^>]*class=["\']news-card[^"\']*["\'][^>]*>.*?</a>', sec, re.DOTALL)
    print(f"Found {len(cards)} cards in index.html #news:")
    for i, card in enumerate(cards):
        title = re.search(r'<h[34][^>]*>(.*?)</h[34]>', card)
        img = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', card)
        print(f"Card {i+1}:")
        print("  Title:", title.group(1).strip() if title else "No title")
        print("  Image:", img.group(1) if img else "No image")
