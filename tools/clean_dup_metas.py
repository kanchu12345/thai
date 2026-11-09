# -*- coding: utf-8 -*-
with open('404.html', 'r', encoding='utf-8') as f:
    c = f.read()
target404 = '<meta content="The page you are looking for has moved or does not exist. Explore our bespoke Sri Lanka tour packages." name="description"/>'
if target404 in c:
    c = c.replace(target404, '')
    with open('404.html', 'w', encoding='utf-8') as f:
        f.write(c)
    print("Cleaned 404.html duplicate meta")

with open('inquiry-detailed.html', 'r', encoding='utf-8') as f:
    c = f.read()
target_inq = '<meta content="Detailed custom Sri Lanka holiday inquiry form. Share your bespoke travel dates, guest count, hotel and experience preferences for an individualized itinerary." name="description"/>'
if target_inq in c:
    c = c.replace(target_inq, '')
    with open('inquiry-detailed.html', 'w', encoding='utf-8') as f:
        f.write(c)
    print("Cleaned inquiry-detailed.html duplicate meta")
