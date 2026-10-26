import os
import re

PAGE_META = {
    "index.html": {
        "title": "Sri Lanka Tours | Lotus Ceylon Luxury Holidays Official Site",
        "description": "Welcome to Lotus Ceylon, Sri Lanka's premier destination management company. Curated luxury travel packages, tailor-made holidays, wildlife safaris, and cultural tours.",
        "canonical": "https://lotusceylon.com/",
        "image": "https://lotusceylon.com/assets/images/hero/sigiriya-rock-fortress-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Lotus Ceylon International Tours & Services (Private) Limited",
    "alternateName": "Lotus Ceylon",
    "url": "https://lotusceylon.com/",
    "logo": "https://lotusceylon.com/logo.png",
    "image": "https://lotusceylon.com/assets/images/hero/sigiriya-rock-fortress-1.webp",
    "description": "Premier Sri Lankan inbound tour operator delivering bespoke journeys, sacred cultural trails, luxury wildlife safaris, and private chauffeur-driven holidays.",
    "telephone": "+94715422384",
    "email": "inquiry@lotusceylon.com",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "286/C, Niwandama South",
      "addressLocality": "Ja-Ela",
      "postalCode": "11350",
      "addressCountry": "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 7.0785,
      "longitude": 79.8913
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://facebook.com/lotusceylon",
      "https://instagram.com/lotusceylon",
      "https://tripadvisor.com/lotusceylon",
      "https://youtube.com/@lotusceylon"
    ]
  }
  </script>"""
    },
    "about.html": {
        "title": "About Lotus Ceylon | Pure Journeys & Sacred Experiences",
        "description": "Discover Lotus Ceylon International Tours & Services (Pvt) Ltd. Founded in 2014, we are a premier licensed Sri Lankan inbound tour operator dedicated to authentic, meaningful travel.",
        "canonical": "https://lotusceylon.com/about.html",
        "image": "https://lotusceylon.com/assets/images/about/hospitality-scenes-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Lotus Ceylon International Tours & Services",
    "url": "https://lotusceylon.com/about.html",
    "mainEntity": {
      "@type": "TravelAgency",
      "name": "Lotus Ceylon International Tours & Services (Private) Limited",
      "foundingDate": "2014",
      "founder": {
        "@type": "Person",
        "name": "Dhushantha Mallawaarachchi"
      },
      "telephone": "+94715422384",
      "email": "inquiry@lotusceylon.com"
    }
  }
  </script>"""
    },
    "contact.html": {
        "title": "Contact Lotus Ceylon | Island Headquarters & Direct Concierge",
        "description": "Reach Lotus Ceylon International Tours & Services (Pvt) Ltd. Headquarters in Ja-Ela, Sri Lanka. Direct phone, WhatsApp, WeChat, LINE, and email assistance.",
        "canonical": "https://lotusceylon.com/contact.html",
        "image": "https://lotusceylon.com/assets/images/contact/negombo-lagoon-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Lotus Ceylon Concierge",
    "url": "https://lotusceylon.com/contact.html",
    "mainEntity": {
      "@type": "TravelAgency",
      "name": "Lotus Ceylon International Tours & Services",
      "telephone": "+94715422384",
      "email": "inquiry@lotusceylon.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "286/C, Niwandama South",
        "addressLocality": "Ja-Ela",
        "postalCode": "11350",
        "addressCountry": "LK"
      }
    }
  }
  </script>"""
    },
    "destinations.html": {
        "title": "Sacred Destinations of Sri Lanka | Lotus Ceylon Travel Guide",
        "description": "Explore Sri Lanka's most iconic destinations: Sigiriya, Kandy, Ella, Galle, Yala, Anuradhapura, Nuwara Eliya, and Mirissa with Lotus Ceylon private chauffeur guides.",
        "canonical": "https://lotusceylon.com/destinations.html",
        "image": "https://lotusceylon.com/assets/images/cultural/sigiriya-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Destinations in Sri Lanka",
    "url": "https://lotusceylon.com/destinations.html",
    "description": "Curated guide to Sri Lanka's sacred cultural triangle, wildlife biospheres, tea highlands, and golden coasts."
  }
  </script>"""
    },
    "experiences.html": {
        "title": "Sacred & Bespoke Ceylon Experiences | Lotus Ceylon Tours",
        "description": "Immerse yourself in authentic Sri Lankan travel experiences: private wildlife safaris, tea harvesting, Buddhist meditation, whale watching, and scenic railway journeys.",
        "canonical": "https://lotusceylon.com/experiences.html",
        "image": "https://lotusceylon.com/assets/images/wildlife/yala-safari-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Sacred & Bespoke Ceylon Experiences",
    "url": "https://lotusceylon.com/experiences.html"
  }
  </script>"""
    },
    "reviews.html": {
        "title": "Guest Testimonials & Reviews | Lotus Ceylon Luxury Travel",
        "description": "Read verified guest reviews and authentic travel stories from discerning travelers who explored Sri Lanka with Lotus Ceylon International Tours & Services.",
        "canonical": "https://lotusceylon.com/reviews.html",
        "image": "https://lotusceylon.com/assets/images/about/hospitality-scenes-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Lotus Ceylon International Tours & Services",
    "url": "https://lotusceylon.com/reviews.html",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.98",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "142"
    }
  }
  </script>"""
    },
    "gallery.html": {
        "title": "Sri Lanka Visual Chronicles & Photo Gallery | Lotus Ceylon",
        "description": "Journey through breathtaking imagery of Sri Lanka's misty tea plantations, ancient citadel ruins, untouched golden beaches, and wild leopards with Lotus Ceylon.",
        "canonical": "https://lotusceylon.com/gallery.html",
        "image": "https://lotusceylon.com/assets/images/hero/sigiriya-rock-fortress-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Lotus Ceylon Visual Chronicles",
    "url": "https://lotusceylon.com/gallery.html"
  }
  </script>"""
    },
    "blog.html": {
        "title": "Ceylon Travel Journal & Expert Insights | Lotus Ceylon Blog",
        "description": "Insider guides, seasonal monsoon advice, cultural etiquette, and luxury travel itineraries written by Sri Lanka's premier destination specialists.",
        "canonical": "https://lotusceylon.com/blog.html",
        "image": "https://lotusceylon.com/assets/images/hero/sigiriya-rock-fortress-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Lotus Ceylon Travel Journal",
    "url": "https://lotusceylon.com/blog.html"
  }
  </script>"""
    },
    "inquiry-quick.html": {
        "title": "Quick Tour Inquiry | Plan Your Sri Lanka Journey | Lotus Ceylon",
        "description": "Request a fast, customized Sri Lanka tour proposal. Tell us your travel dates, party size, and preferred experiences for a personalized quote.",
        "canonical": "https://lotusceylon.com/inquiry-quick.html",
        "image": "https://lotusceylon.com/assets/images/hero/sigiriya-rock-fortress-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Quick Tour Inquiry",
    "url": "https://lotusceylon.com/inquiry-quick.html"
  }
  </script>"""
    },
    "inquiry-detailed.html": {
        "title": "Tailor-Made Private Journey Planner | Lotus Ceylon Inbound",
        "description": "Craft your dream Sri Lanka holiday. Comprehensive inquiry form for bespoke itineraries, boutique villa selections, and private chauffeur excursions.",
        "canonical": "https://lotusceylon.com/inquiry-detailed.html",
        "image": "https://lotusceylon.com/assets/images/hero/sigiriya-rock-fortress-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Bespoke Journey Planner",
    "url": "https://lotusceylon.com/inquiry-detailed.html"
  }
  </script>"""
    },
    "privacy-policy.html": {
        "title": "Privacy Policy | Lotus Ceylon International Tours & Services",
        "description": "Learn how Lotus Ceylon International Tours & Services (Pvt) Ltd protects your personal data, inquiry details, and privacy in compliance with international standards.",
        "canonical": "https://lotusceylon.com/privacy-policy.html",
        "image": "https://lotusceylon.com/assets/images/hero/sigiriya-rock-fortress-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "url": "https://lotusceylon.com/privacy-policy.html"
  }
  </script>"""
    },
    "terms-conditions.html": {
        "title": "Terms & Conditions | Lotus Ceylon Luxury Tours & Services",
        "description": "Official terms and booking conditions for private tailor-made tours, chauffeur guide services, and travel arrangements with Lotus Ceylon.",
        "canonical": "https://lotusceylon.com/terms-conditions.html",
        "image": "https://lotusceylon.com/assets/images/hero/sigiriya-rock-fortress-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms and Conditions",
    "url": "https://lotusceylon.com/terms-conditions.html"
  }
  </script>"""
    },
    "cancellation-policy.html": {
        "title": "Cancellation & Refund Policy | Lotus Ceylon Luxury Holidays",
        "description": "Review Lotus Ceylon's fair cancellation terms, deposit refund schedules, and flexible rescheduling policies for luxury Sri Lanka holiday bookings.",
        "canonical": "https://lotusceylon.com/cancellation-policy.html",
        "image": "https://lotusceylon.com/assets/images/hero/sigiriya-rock-fortress-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cancellation & Refund Policy",
    "url": "https://lotusceylon.com/cancellation-policy.html"
  }
  </script>"""
    },
    "cookie-policy.html": {
        "title": "Cookie Policy | Lotus Ceylon International Tours & Services",
        "description": "Information about the cookies and local storage technologies used on the Lotus Ceylon website to optimize language preferences and site performance.",
        "canonical": "https://lotusceylon.com/cookie-policy.html",
        "image": "https://lotusceylon.com/assets/images/hero/sigiriya-rock-fortress-1.webp",
        "schema": """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookie Policy",
    "url": "https://lotusceylon.com/cookie-policy.html"
  }
  </script>"""
    }
}

patched_pages = 0
for filename, meta in PAGE_META.items():
    if not os.path.exists(filename):
        continue

    with open(filename, "r", encoding="utf-8") as f:
        c = f.read()

    # 1. Update Title if needed
    if "<title>" in c:
        c = re.sub(r'<title>.*?</title>', f'<title>{meta["title"]}</title>', c, flags=re.DOTALL)
    else:
        c = re.sub(r'(<head[^>]*>)', r'\1\n  <title>' + meta["title"] + '</title>', c, flags=re.I)

    # 2. Update or insert Meta Description
    if re.search(r'<meta\s+name=["\']description["\']', c, re.I):
        c = re.sub(r'<meta\s+name=["\']description["\']\s+content=["\'][^"\']*["\']\s*/?>',
                   f'<meta name="description" content="{meta["description"]}">', c, flags=re.I)
    else:
        c = re.sub(r'(<title>.*?</title>)', r'\1\n  <meta name="description" content="' + meta["description"] + '">', c, flags=re.I | re.DOTALL)

    # 3. Canonical Tag
    canon_tag = f'<link rel="canonical" href="{meta["canonical"]}"/>'
    if '<link rel="canonical"' in c or "<link rel='canonical'" in c:
        c = re.sub(r'<link\s+rel=["\']canonical["\']\s+href=["\'][^"\']*["\']\s*/?>', canon_tag, c)
    else:
        c = re.sub(r'(<meta\s+name=["\']description["\'][^>]*>)', r'\1\n  ' + canon_tag, c, flags=re.I)

    # 4. Open Graph & Twitter Tags Block
    og_block = f"""  <!-- Open Graph & Social Sharing -->
  <meta property="og:type" content="website"/>
  <meta property="og:site_name" content="Lotus Ceylon International Tours"/>
  <meta property="og:title" content="{meta["title"]}"/>
  <meta property="og:description" content="{meta["description"]}"/>
  <meta property="og:url" content="{meta["canonical"]}"/>
  <meta property="og:image" content="{meta["image"]}"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="{meta["title"]}"/>
  <meta name="twitter:description" content="{meta["description"]}"/>
  <meta name="twitter:image" content="{meta["image"]}"/>"""

    if 'property="og:title"' not in c:
        # Insert after canonical or meta description
        c = re.sub(r'(<link\s+rel=["\']canonical["\'][^>]*>)', r'\1\n' + og_block, c)

    # 5. Schema JSON-LD
    if 'application/ld+json' not in c:
        c = re.sub(r'(</head>)', meta["schema"] + '\n\\1', c, flags=re.I)

    # 6. Skip Link for accessibility
    skip_link = '<a class="skip-to-content-link" href="#mainContent">Skip to main content</a>'
    if 'skip-to-content-link' not in c:
        c = re.sub(r'(<body[^>]*>)', r'\1\n' + skip_link, c, flags=re.I)

    with open(filename, "w", encoding="utf-8", newline="\n") as f:
        f.write(c)
    patched_pages += 1

print(f"SUCCESS: Patched SEO metadata and accessibility skip links across {patched_pages} root pages.")
