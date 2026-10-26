import re
from bs4 import BeautifulSoup

for page_name in ["index.html", "about.html", "reviews.html", "sri-lanka-tours.html"]:
    with open(page_name, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")

    print(f"\n=== {page_name} Statistics / Numbers ===")
    stat_elements = soup.find_all(class_=re.compile(r"stat|counter|number|badge", re.I))
    for el in stat_elements[:10]:
        text = " ".join(el.get_text().split())
        if any(char.isdigit() for char in text):
            print(f"  [{el.get('class')}]: {text}")

    print(f"\n=== {page_name} FAQs ===")
    faq_elements = soup.find_all(class_=re.compile(r"faq", re.I))
    faqs = []
    for el in faq_elements:
        q = el.find(["h3", "h4", "button", "summary", "strong"])
        if q:
            faqs.append(q.get_text(strip=True))
    print(f"Total FAQs found: {len(faqs)}")
    for q in faqs[:5]:
        print(f"  Q: {q}")
