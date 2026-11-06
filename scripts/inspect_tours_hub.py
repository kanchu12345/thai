import sys
import re
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open('tours/index.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

cards = soup.select('.category-card, .tour-card, [data-cms]')
print(f"Total elements with data-cms or cards in tours/index.html: {len(cards)}")
for el in soup.select('[data-cms]')[:20]:
    print(f"  Tag: <{el.name}> data-cms='{el.get('data-cms')}' text='{el.get_text(strip=True)[:40]}'")
