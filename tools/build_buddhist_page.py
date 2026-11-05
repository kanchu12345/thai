import os
import sys

sys.path.append(os.path.abspath("."))
from tools.build_site import get_header_html, get_footer_html, get_cta_band_html

def build_buddhist_page(rel_prefix, out_path):
    d = os.path.dirname(out_path)
    if d:
        os.makedirs(d, exist_ok=True)
    header = get_header_html(rel_prefix, active_tab="tours")
    footer = get_footer_html(rel_prefix)
    cta = get_cta_band_html(rel_prefix)

    html = f'''<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Buddhist Heritage &amp; Sacred Pilgrimages | Lotus Ceylon Luxury Tours</title>
  <meta name="description" content="Embark on transformative Buddhist pilgrimage journeys across Sri Lanka. Visit the sacred Jaya Sri Maha Bodhi, Ruwanwelisaya, Mihintale, and the Temple of the Sacred Tooth Relic.">
  <link rel="icon" type="image/png" href="{rel_prefix}logo.png?v=20261021_step1">

  <!-- Master Stylesheet -->
  <link rel="stylesheet" href="{rel_prefix}assets/css/site.css">
</head>
<body>

{header}

  <!-- Unified Hero Banner (Category Template C) -->
  <section class="hero-banner" style="background-image: url('{rel_prefix}assets/images/buddhist-heritage/ruwanwelisaya-2.webp');">
    <div class="hero-overlay-motif"></div>
    <div class="hero-content">
      <div class="hero-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C13.5 6 17 8 17 11C17 14 14.5 16.5 12 16.5C9.5 16.5 7 14 7 11C7 8 10.5 6 12 2Z"/></svg>
        <span>SACRED DHAMMA PILGRIMAGES</span>
      </div>
      <h1 class="hero-title">Buddhist Heritage Tours</h1>
      <p class="hero-slogan">PURE JOURNEYS. SACRED EXPERIENCES.</p>
      <nav class="hero-breadcrumbs" aria-label="Breadcrumbs">
        <a href="{rel_prefix}index.html">Home</a>
        <span class="sep">/</span>
        <a href="{rel_prefix}sri-lanka-tours.html">Tours</a>
        <span class="sep">/</span>
        <span>Buddhist Heritage</span>
      </nav>
    </div>
  </section>

  <!-- Category Introduction -->
  <main class="section-pad">
    <div class="site-container">
      <div class="section-header-center">
        <span class="section-tag">Living Spiritual Traditions</span>
        <h2 class="section-title">Walk the Footsteps of the Enlightened Ones</h2>
        <p class="section-subtitle">
          Sri Lanka has nurtured the Theravada Buddhist Dhamma unbroken for over 2,300 years. Lotus Ceylon crafts deeply reverent, private pilgrimages to the island's most sanctified temples, ancient stupas, and contemplative forest hermitages.
        </p>
      </div>

      <!-- Tour Packages Grid -->
      <div class="cards-grid-3">
        
        <!-- Package 1 -->
        <article class="tour-card">
          <div class="tour-card-img-wrap">
            <img src="{rel_prefix}assets/images/buddhist-heritage/jaya-sri-maha-bodhi-1.webp" alt="Jaya Sri Maha Bodhi tree sanctuary in Anuradhapura" class="tour-card-img" loading="lazy">
            <span class="tour-card-badge">Signature Pilgrimage</span>
          </div>
          <div class="tour-card-body">
            <div class="tour-card-meta">
              <span>⏱️ 8 Days / 7 Nights</span>
              <span>🕊️ Reverent Pace</span>
            </div>
            <h3 class="tour-card-title">The Sacred Bodhi &amp; Ancient Kingdoms</h3>
            <p class="tour-card-desc">
              Experience morning puja offerings at the oldest living human-planted tree in recorded history (Jaya Sri Maha Bodhi), circumambulate the great Ruwanwelisaya, and meditate beneath Mihintale’s granite peak.
            </p>
            <div class="tour-card-footer">
              <div class="tour-price-box">
                <span class="from">From</span>
                <span class="amount">$1,450 <small style="font-size:0.75rem; color:#64748B;">/ person</small></span>
              </div>
              <a href="{rel_prefix}inquiry-detailed.html?package=Sacred%20Bodhi%20Pilgrimage" class="btn-primary-gold" style="padding: 0.65rem 1.4rem; font-size: 0.88rem;">
                <span>Inquire</span>
              </a>
            </div>
          </div>
        </article>

        <!-- Package 2 -->
        <article class="tour-card">
          <div class="tour-card-img-wrap">
            <img src="{rel_prefix}assets/images/buddhist-heritage/temple-of-the-tooth-4.webp" alt="Temple of the Sacred Tooth Relic Kandy" class="tour-card-img" loading="lazy">
            <span class="tour-card-badge">Deep Dhamma Trail</span>
          </div>
          <div class="tour-card-body">
            <div class="tour-card-meta">
              <span>⏱️ 10 Days / 9 Nights</span>
              <span>☸️ Living Heritage</span>
            </div>
            <h3 class="tour-card-title">The Sacred Tooth &amp; Monastic Sanctuaries</h3>
            <p class="tour-card-desc">
              Witness the rhythmic drumming and evening Tevava ceremony at Sri Dalada Maligawa in Kandy, discover the 1st-century BCE rock cave murals of Dambulla, and marvel at the rock-cut Gal Vihara Buddhas.
            </p>
            <div class="tour-card-footer">
              <div class="tour-price-box">
                <span class="from">From</span>
                <span class="amount">$1,890 <small style="font-size:0.75rem; color:#64748B;">/ person</small></span>
              </div>
              <a href="{rel_prefix}inquiry-detailed.html?package=Sacred%20Tooth%20Heritage" class="btn-primary-gold" style="padding: 0.65rem 1.4rem; font-size: 0.88rem;">
                <span>Inquire</span>
              </a>
            </div>
          </div>
        </article>

        <!-- Package 3 -->
        <article class="tour-card">
          <div class="tour-card-img-wrap">
            <img src="{rel_prefix}assets/images/buddhist-heritage/mihintale-3.webp" alt="Mihintale sacred mountain stupa" class="tour-card-img" loading="lazy">
            <span class="tour-card-badge">Meditation Retreat</span>
          </div>
          <div class="tour-card-body">
            <div class="tour-card-meta">
              <span>⏱️ 12 Days / 11 Nights</span>
              <span>🧘 Mindful Living</span>
            </div>
            <h3 class="tour-card-title">Forest Hermitages &amp; Mindful Ceylon</h3>
            <p class="tour-card-desc">
              Step into ancient forest meditation monasteries hidden in the jungle at Ritigala, practice guided Vipassana with senior Buddhist monks, and stay in serene eco-villas surrounded by birdsong.
            </p>
            <div class="tour-card-footer">
              <div class="tour-price-box">
                <span class="from">From</span>
                <span class="amount">$2,250 <small style="font-size:0.75rem; color:#64748B;">/ person</small></span>
              </div>
              <a href="{rel_prefix}inquiry-detailed.html?package=Forest%20Hermitage%20Retreat" class="btn-primary-gold" style="padding: 0.65rem 1.4rem; font-size: 0.88rem;">
                <span>Inquire</span>
              </a>
            </div>
          </div>
        </article>

      </div>
    </div>
  </main>

  <!-- Sacred Pilgrimage FAQ -->
  <section class="section-pad faq-section">
    <div class="site-container">
      <div class="section-header-center">
        <span class="section-tag">Pilgrimage Etiquette &amp; Planning</span>
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-subtitle">Helpful guidance for respectful, serene visits to Sri Lanka's holy Buddhist sites.</p>
      </div>

      <div class="faq-accordion">
        <div class="faq-item">
          <button type="button" class="faq-question">
            <span>What dress code is required when visiting sacred Buddhist temples?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>Modest white or light-coloured attire covering shoulders and knees is traditional and respectful. Shoes and hats must be removed before entering temple compounds; our private chauffeurs provide clean shoe-storage bags and gentle reminders at every sanctuary.</p>
          </div>
        </div>

        <div class="faq-item">
          <button type="button" class="faq-question">
            <span>Can private Dhamma discussions and blessings be arranged with monks?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>Yes. With Lotus Ceylon’s deep respect and long-standing relationships with monastery elders, we arrange private Pirith chanting blessings, Bodhi Puja ceremonies, and Dhamma discussions with English-speaking monks.</p>
          </div>
        </div>

        <div class="faq-item">
          <button type="button" class="faq-question">
            <span>Are these pilgrimages physically demanding?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>Each pilgrimage is paced entirely to your comfort. Anuradhapura and Kandy sites are flat and accessible. Sites with stairs like Mihintale and Dambulla have gradual steps, and our guides accompany you at whatever pace you prefer.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

{cta}

{footer}

  <!-- Scripts -->
  <script src="{rel_prefix}assets/js/config.js"></script>
  <script src="{rel_prefix}js/site-translator.js"></script>
  <script>
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    const siteHeader = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {{
      if (window.scrollY > 30) siteHeader.classList.add('is-scrolled');
      else siteHeader.classList.remove('is-scrolled');
    }}, {{ passive: true }});

    // Mobile nav toggle
    const mobileHam = document.getElementById('mobileHamToggle');
    const mobileClose = document.getElementById('mobileNavClose');
    const mobileNav = document.getElementById('mobileNavFullscreen');
    if (mobileHam && mobileNav) {{
      mobileHam.addEventListener('click', () => {{ mobileNav.classList.add('is-open'); document.body.style.overflow = 'hidden'; }});
      if (mobileClose) mobileClose.addEventListener('click', () => {{ mobileNav.classList.remove('is-open'); document.body.style.overflow = ''; }});
    }}

    // FAQ Accordion Toggle
    document.querySelectorAll('.faq-question').forEach(btn => {{
      btn.addEventListener('click', () => {{
        const item = btn.closest('.faq-item');
        const isActive = item.classList.contains('is-active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-active'));
        if (!isActive) item.classList.add('is-active');
      }});
    }});
  </script>
</body>
</html>'''

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Built {out_path}")

build_buddhist_page("./", "buddhist-heritage-tours.html")
build_buddhist_page("../../", "tours/buddhist-heritage/index.html")
