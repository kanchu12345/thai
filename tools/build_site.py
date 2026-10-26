import os
import re

def get_rel_prefix(filepath):
    depth = filepath.replace("\\", "/").count("/")
    return "../" * depth if depth > 0 else "./"

def get_header_html(rel_prefix, active_tab="home"):
    return f'''  <!-- Site Header & Navigation (Unified Master Standard: Mobile Max 64px, Logo Max 40px) -->
  <header class="site-header-walkers" id="siteHeader">
    <div class="header-container">
      <div class="header-top-row">
        <!-- Logo & Brand Badge -->
        <a href="{rel_prefix}index.html" class="header-brand" title="Lotus Ceylon Luxury Tours & Pilgrimages">
          <img src="{rel_prefix}logo.png?v=20261021_step1" alt="Lotus Ceylon Official Emblem" class="header-brand-logo" width="40" height="40">
          <div class="header-brand-text">
            <span class="header-brand-name"><span class="brand-name-lotus">Lotus</span> <span class="brand-name-ceylon">Ceylon</span></span>
            <span class="header-brand-sub">INTERNATIONAL TOURS &amp; SERVICES</span>
          </div>
        </a>

        <!-- Desktop Navigation Menu (hidden on screens <= 1024px) -->
        <nav class="walkers-nav" aria-label="Main Navigation">
          <ul class="walkers-menu">
            <li class="walkers-menu-item{' active' if active_tab == 'home' else ''}"><a href="{rel_prefix}index.html" class="walkers-menu-link">Home</a></li>
            <li class="walkers-menu-item has-dropdown{' active' if active_tab == 'tours' else ''}">
              <a href="{rel_prefix}sri-lanka-tours.html" class="walkers-menu-link">
                <span>Tours</span>
                <svg class="walkers-caret" viewBox="0 0 10 6"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>
              </a>
              <div class="walkers-megamenu">
                <a href="{rel_prefix}tours/cultural/" class="megamenu-link"><span class="megamenu-link-icon">🏛️</span> Cultural Heritage</a>
                <a href="{rel_prefix}tours/buddhist-heritage/" class="megamenu-link"><span class="megamenu-link-icon">☸️</span> Buddhist Heritage</a>
                <a href="{rel_prefix}tours/wildlife/" class="megamenu-link"><span class="megamenu-link-icon">🐆</span> Wildlife Safaris</a>
                <a href="{rel_prefix}tours/beach/" class="megamenu-link"><span class="megamenu-link-icon">🏖️</span> Pristine Beaches</a>
                <a href="{rel_prefix}tours/hill-country/" class="megamenu-link"><span class="megamenu-link-icon">⛰️</span> Hill Country &amp; Tea</a>
                <a href="{rel_prefix}tours/ayurvedic/" class="megamenu-link"><span class="megamenu-link-icon">🌿</span> Ayurvedic Healing</a>
                <a href="{rel_prefix}tours/honeymoon/" class="megamenu-link"><span class="megamenu-link-icon">💍</span> Honeymoon Romance</a>
                <a href="{rel_prefix}tours/family/" class="megamenu-link"><span class="megamenu-link-icon">👨‍👩‍👧‍👦</span> Family Discovery</a>
                <a href="{rel_prefix}tours/adventure/" class="megamenu-link"><span class="megamenu-link-icon">🏄</span> Active Adventure</a>
                <a href="{rel_prefix}tours/ramayana/" class="megamenu-link"><span class="megamenu-link-icon">🏹</span> Ramayana Trail</a>
              </div>
            </li>
            <li class="walkers-menu-item{' active' if active_tab == 'destinations' else ''}"><a href="{rel_prefix}destinations.html" class="walkers-menu-link">Destinations</a></li>
            <li class="walkers-menu-item{' active' if active_tab == 'experiences' else ''}"><a href="{rel_prefix}experiences.html" class="walkers-menu-link">Experiences</a></li>
            <li class="walkers-menu-item{' active' if active_tab == 'about' else ''}"><a href="{rel_prefix}about.html" class="walkers-menu-link">About Us</a></li>
            <li class="walkers-menu-item{' active' if active_tab == 'gallery' else ''}"><a href="{rel_prefix}gallery.html" class="walkers-menu-link">Gallery</a></li>
            <li class="walkers-menu-item{' active' if active_tab == 'reviews' else ''}"><a href="{rel_prefix}reviews.html" class="walkers-menu-link">Reviews</a></li>
            <li class="walkers-menu-item{' active' if active_tab == 'blog' else ''}"><a href="{rel_prefix}blog.html" class="walkers-menu-link">Blog</a></li>
            <li class="walkers-menu-item{' active' if active_tab == 'contact' else ''}"><a href="{rel_prefix}contact.html" class="walkers-menu-link">Contact</a></li>
          </ul>
        </nav>

        <!-- Right Header Tools (Desktop) -->
        <div class="header-tools">
          <div class="custom-lang-pill">
            <button type="button" class="lang-pill-btn" id="langPillToggle" title="Select Language" aria-haspopup="true">
              <span id="currentLangLabel">EN</span>
              <svg class="walkers-caret" viewBox="0 0 10 6"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>
            </button>
            <div class="lang-pill-dropdown" id="langPillMenu">
              <button type="button" data-lang="en" class="is-active">🇬🇧 English</button>
              <button type="button" data-lang="zh-TW">🇹🇼 繁體中文 (Taiwan)</button>
              <button type="button" data-lang="zh-CN">🇨🇳 简体中文 (Modern)</button>
              <button type="button" data-lang="fr">🇫🇷 Français (French)</button>
              <button type="button" data-lang="de">🇩🇪 Deutsch (German)</button>
              <button type="button" data-lang="ru">🇷🇺 Русский</button>
              <button type="button" data-lang="es">🇪🇸 Español</button>
              <button type="button" data-lang="it">🇮🇹 Italiano</button>
              <button type="button" data-lang="ja">🇯🇵 日本語</button>
              <button type="button" data-lang="ar">🇦🇪 العربية</button>
              <button type="button" data-lang="hi">🇮🇳 हिन्दी</button>
            </div>
          </div>

          <a href="{rel_prefix}inquiry-detailed.html" class="gold-inquire-btn" title="Plan Your Bespoke Travel">
            <span>Inquire</span>
          </a>
        </div>

        <!-- Mobile Hamburger Button (Active up to 1024px, 48x48px min tap target) -->
        <button type="button" class="walkers-ham" id="mobileHamToggle" aria-label="Open mobile navigation menu" aria-expanded="false" aria-controls="mobileNavFullscreen">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Full-Screen Slide-in Mobile Navigation Menu -->
  <div class="mobile-nav-fullscreen" id="mobileNavFullscreen" aria-hidden="true" role="dialog" aria-label="Mobile Navigation">
    <div class="mobile-nav-header">
      <a href="{rel_prefix}index.html" class="header-brand">
        <img src="{rel_prefix}logo.png?v=20261021_step1" alt="Lotus Ceylon Emblem" style="height: 38px; width: auto;">
        <span class="header-brand-name" style="color: var(--ink); font-size: 1.15rem;"><span style="color: var(--ink);">Lotus</span> <span style="color: var(--lotus-primary);">Ceylon</span></span>
      </a>
      <button type="button" class="mobile-nav-close" id="mobileNavClose" aria-label="Close navigation menu">&times;</button>
    </div>
    
    <div class="mobile-nav-body">
      <ul class="mobile-nav-list">
        <li class="mobile-nav-item"><a href="{rel_prefix}index.html" class="mobile-nav-link">Home</a></li>
        
        <!-- Accordion Item for Tours -->
        <li class="mobile-nav-item has-accordion">
          <button type="button" class="mobile-nav-link accordion-toggle" id="mobileToursToggle" aria-expanded="false">
            <span>Tours &amp; Packages</span>
            <svg class="accordion-chevron" viewBox="0 0 10 6" width="12" height="8"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>
          </button>
          <div class="mobile-accordion-submenu" id="mobileToursSubmenu">
            <a href="{rel_prefix}sri-lanka-tours.html" class="submenu-link"><strong>All Tour Packages</strong></a>
            <a href="{rel_prefix}tours/cultural/" class="submenu-link">🏛️ Cultural Heritage</a>
            <a href="{rel_prefix}tours/buddhist-heritage/" class="submenu-link">☸️ Buddhist Pilgrimages</a>
            <a href="{rel_prefix}tours/wildlife/" class="submenu-link">🐆 Wildlife Safaris</a>
            <a href="{rel_prefix}tours/beach/" class="submenu-link">🏖️ Pristine Beaches</a>
            <a href="{rel_prefix}tours/hill-country/" class="submenu-link">⛰️ Hill Country &amp; Tea</a>
            <a href="{rel_prefix}tours/ayurvedic/" class="submenu-link">🌿 Ayurvedic Healing</a>
            <a href="{rel_prefix}tours/honeymoon/" class="submenu-link">💍 Honeymoon Sanctuaries</a>
            <a href="{rel_prefix}tours/family/" class="submenu-link">👨‍👩‍👧‍👦 Family Journeys</a>
            <a href="{rel_prefix}tours/adventure/" class="submenu-link">🏄 Active Adventure</a>
            <a href="{rel_prefix}tours/ramayana/" class="submenu-link">🏹 Ramayana Trail</a>
          </div>
        </li>

        <li class="mobile-nav-item"><a href="{rel_prefix}destinations.html" class="mobile-nav-link">Destinations</a></li>
        <li class="mobile-nav-item"><a href="{rel_prefix}experiences.html" class="mobile-nav-link">Experiences</a></li>
        <li class="mobile-nav-item"><a href="{rel_prefix}about.html" class="mobile-nav-link">About Us</a></li>
        <li class="mobile-nav-item"><a href="{rel_prefix}gallery.html" class="mobile-nav-link">Gallery</a></li>
        <li class="mobile-nav-item"><a href="{rel_prefix}reviews.html" class="mobile-nav-link">Reviews</a></li>
        <li class="mobile-nav-item"><a href="{rel_prefix}blog.html" class="mobile-nav-link">Blog</a></li>
        <li class="mobile-nav-item"><a href="{rel_prefix}contact.html" class="mobile-nav-link">Contact Us</a></li>
      </ul>

      <!-- Mobile Language Selector Section -->
      <div class="mobile-lang-section">
        <p class="mobile-section-label">Select Language</p>
        <div class="mobile-lang-grid" id="mobileLangGrid">
          <button type="button" data-lang="en" class="mobile-lang-btn is-active">🇬🇧 English</button>
          <button type="button" data-lang="zh-TW" class="mobile-lang-btn">🇹🇼 繁體中文</button>
          <button type="button" data-lang="zh-CN" class="mobile-lang-btn">🇨🇳 简体中文</button>
          <button type="button" data-lang="fr" class="mobile-lang-btn">🇫🇷 Français</button>
          <button type="button" data-lang="de" class="mobile-lang-btn">🇩🇪 Deutsch</button>
          <button type="button" data-lang="ru" class="mobile-lang-btn">🇷🇺 Русский</button>
          <button type="button" data-lang="es" class="mobile-lang-btn">🇪🇸 Español</button>
          <button type="button" data-lang="it" class="mobile-lang-btn">🇮🇹 Italiano</button>
          <button type="button" data-lang="ja" class="mobile-lang-btn">🇯🇵 日本語</button>
          <button type="button" data-lang="ar" class="mobile-lang-btn">🇦🇪 العربية</button>
          <button type="button" data-lang="hi" class="mobile-lang-btn">🇮🇳 हिन्दी</button>
        </div>
      </div>

      <!-- Mobile Action Buttons -->
      <div class="mobile-nav-actions">
        <a href="https://wa.me/94715422384?text=Hello%20Lotus%20Ceylon!%20I%20would%20like%20to%20inquire%20about%20a%20private%20tour." target="_blank" rel="noopener noreferrer" class="btn-mobile-whatsapp">
          <span>💬 WhatsApp (+94 71 54 22 384)</span>
        </a>
        <a href="{rel_prefix}inquiry-detailed.html" class="btn-mobile-inquire">
          <span>Plan My Bespoke Journey ➔</span>
        </a>
      </div>
    </div>
  </div>'''

def get_footer_html(rel_prefix):
    return f'''  <!-- Site Footer (Unified Walkers Standard with Single Source of Truth Coordinates) -->
  <footer class="site-footer-walkers" id="siteFooter">
    <div class="site-container">
      <div class="footer-top-grid">
        <!-- Col 1: About & 24/7 Concierge Hotline -->
        <div>
          <p class="footer-col-title">Lotus Ceylon Luxury Tours</p>
          <p style="color: rgba(255, 255, 255, 0.78); font-size: 0.92rem; line-height: 1.65; margin: 0.85rem 0 1.25rem; max-width: 330px;">
            Crafting bespoke, transformative travel experiences across sacred Ceylon with authentic warmth since 2014.
          </p>
          <div class="footer-contact-list">
            <div class="footer-contact-item">
              <p>24/7 Travel Concierge Hotline</p>
              <a href="tel:+94715422384" style="color: #FFFFFF; font-weight: 700; font-size: 1.05rem;">+94 71 54 22 384</a>
            </div>
            <div class="footer-contact-item">
              <p>Email Inquiries</p>
              <a href="mailto:paliforbuddhism@gmail.com">paliforbuddhism@gmail.com</a>
            </div>
            <div class="footer-contact-item" style="margin-top: 0.85rem;">
              <a href="{rel_prefix}about.html#headquarters" style="color: var(--sacred-gold); font-size: 0.85rem; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
                <span>Registered Office &amp; Headquarters Details</span> <span>➔</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div>
          <p class="footer-col-title">Quick Links</p>
          <div class="footer-links-grid">
            <a href="{rel_prefix}index.html">Home</a>
            <a href="{rel_prefix}sri-lanka-tours.html">Sri Lanka Tours</a>
            <a href="{rel_prefix}destinations.html">Destinations</a>
            <a href="{rel_prefix}experiences.html">Curated Experiences</a>
            <a href="{rel_prefix}about.html">About Us</a>
            <a href="{rel_prefix}gallery.html">Visual Gallery</a>
            <a href="{rel_prefix}reviews.html">Guest Reviews</a>
            <a href="{rel_prefix}blog.html">Travel Blog</a>
            <a href="{rel_prefix}contact.html">Contact Us</a>
            <a href="{rel_prefix}inquiry-quick.html">Quick Inquiry Form</a>
            <a href="{rel_prefix}inquiry-detailed.html">Detailed Travel Inquiry</a>
          </div>
        </div>

        <!-- Col 3: Tour Categories -->
        <div>
          <p class="footer-col-title">Signature Themes</p>
          <div class="footer-links-grid">
            <a href="{rel_prefix}tours/cultural/">Cultural Heritage</a>
            <a href="{rel_prefix}tours/buddhist-heritage/">Buddhist Pilgrimage</a>
            <a href="{rel_prefix}tours/wildlife/">Wildlife &amp; Safari</a>
            <a href="{rel_prefix}tours/beach/">Coast &amp; Beaches</a>
            <a href="{rel_prefix}tours/hill-country/">Highlands &amp; Tea</a>
            <a href="{rel_prefix}tours/ayurvedic/">Ayurvedic Wellness</a>
            <a href="{rel_prefix}tours/honeymoon/">Honeymoon Sanctuaries</a>
            <a href="{rel_prefix}tours/family/">Family Journeys</a>
            <a href="{rel_prefix}tours/adventure/">Active Adventure</a>
            <a href="{rel_prefix}tours/ramayana/">Ramayana Heritage</a>
          </div>
        </div>

        <!-- Col 4: Registered Office & Legal -->
        <div>
          <p class="footer-col-title">Island Headquarters</p>
          <p style="color: rgba(255, 255, 255, 0.78); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">
            286/C, Niwandama South, Ja-Ela, Sri Lanka – 11350
          </p>
          <p style="font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--sacred-gold); margin-bottom: 0.4rem;">Direct Messaging</p>
          <p style="color: #FFFFFF; font-size: 0.9rem; margin-bottom: 1.25rem;">
            WhatsApp: +94 71 54 22 384<br>
            WeChat: LotusCeylonTours<br>
            LINE: @lotusceylon
          </p>
          <div class="footer-links-grid" style="font-size: 0.85rem;">
            <a href="{rel_prefix}privacy-policy.html">Privacy Policy</a>
            <a href="{rel_prefix}terms-conditions.html">Terms &amp; Conditions</a>
            <a href="{rel_prefix}cancellation-policy.html">Cancellation Policy</a>
            <a href="{rel_prefix}cookie-policy.html">Cookie Policy</a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom Row -->
      <div class="footer-bottom-row">
        <div>
          &copy; <span id="currentYear">2026</span> Lotus Ceylon International Tours &amp; Services (Private) Limited. All Rights Reserved.
        </div>
        <div>
          SLTDA Registered Inbound Tour Operator &bull; Designed &amp; Developed by <a href="https://infiniteweb.dev/" target="_blank" rel="noopener" style="color: var(--sacred-gold); font-weight: 600;">Infinite Design</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Unified Mobile-First Floating Action Group (WhatsApp + Back to Top) -->
  <div class="unified-fab-group" id="unifiedFabGroup" aria-label="Quick Actions">
    <button type="button" class="fab-btn fab-top" id="fabBackToTop" aria-label="Scroll to top" title="Back to Top">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg>
    </button>
    <a href="https://wa.me/94715422384?text=Hello%20Lotus%20Ceylon!%20I%20would%20like%20to%20inquire%20about%20a%20private%20tour." target="_blank" rel="noopener noreferrer" class="fab-btn fab-whatsapp" title="Chat on WhatsApp" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.11-.059-.441-.144-1.025-.338-1.776-.816-1.579-1.004-2.613-2.616-2.695-2.726-.082-.11-1.082-1.442-1.082-2.75 0-1.309.684-1.954.928-2.222.244-.268.531-.334.708-.334.177 0 .354.002.508.01.164.008.385-.062.602.459.223.535.759 1.854.825 1.99.066.136.111.297.022.474-.088.177-.133.287-.266.442-.133.155-.28.347-.399.465-.133.133-.271.277-.117.542.155.266.689 1.134 1.477 1.835 1.014.903 1.87 1.182 2.136 1.315.266.133.421.111.576-.066.155-.177.664-.774.841-1.039.177-.266.354-.222.597-.133.244.089 1.549.73 1.815.863.266.133.443.2.509.311.066.11.066.643-.078 1.048z"/></svg>
    </a>
  </div>'''

def get_cta_band_html(rel_prefix):
    return f'''  <!-- Sacred Ceylon CTA Band (Unified Standard) -->
  <section class="sacred-cta-banner">
    <div class="cta-motif" aria-hidden="true"></div>
    <div class="cta-content">
      <h2 class="cta-title">Ready to Begin Your Sacred Ceylon Journey?</h2>
      <p class="cta-desc">Speak directly with our senior destination specialists in Ja-Ela or connect via WhatsApp for an immediate bespoke itinerary proposal tailored to your rhythm.</p>
      <div class="cta-btn-group">
        <a href="{rel_prefix}inquiry-detailed.html" class="btn-primary-gold">
          <span>Plan My Bespoke Journey</span>
          <span aria-hidden="true">➔</span>
        </a>
        <a href="https://wa.me/94715422384?text=Hello%20Lotus%20Ceylon!%20I%20would%20like%20to%20inquire%20about%20a%20private%20tour." target="_blank" rel="noopener noreferrer" class="cta-wa-btn">
          <span>💬 Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  </section>'''

print("Builder components defined successfully.")
