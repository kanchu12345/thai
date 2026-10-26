pages = [
    'destinations.html', 'experiences.html', 'reviews.html', 'gallery.html', 
    'blog.html', 'privacy-policy.html', 'terms-conditions.html', 
    'cancellation-policy.html', 'cookie-policy.html', 'inquiry-quick.html', 'inquiry-detailed.html'
]

for p in pages:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()[:1500]
    has_canon = 'rel="canonical"' in c or "rel='canonical'" in c
    has_og = 'property="og:' in c or "property='og:" in c
    has_tw = 'name="twitter:' in c or "name='twitter:" in c
    has_jsonld = 'application/ld+json' in c
    print(f"{p:25}: canonical={has_canon:<5} og={has_og:<5} twitter={has_tw:<5} jsonld={has_jsonld:<5}")
