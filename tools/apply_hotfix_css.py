# Master Hotfix CSS for Android Horizontal Overflow, Menu, Header, Footer
HOTFIX_CSS = """
/* ==========================================================================
   HOTFIX - ANDROID HORIZONTAL OVERFLOW, MENU, HEADER & FOOTER
   Strictly enforces 100% mobile viewport containment (320px - 412px)
   ========================================================================== */

/* 1. Global Reset & Root Safety Net */
html {
  max-width: 100% !important;
  overflow-x: clip !important;
  -webkit-text-size-adjust: 100% !important;
}

body {
  max-width: 100% !important;
  overflow-x: clip !important;
  position: relative !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Ensure no element stretches document width */
*, *::before, *::after {
  box-sizing: border-box !important;
}

img, video, iframe, table {
  max-width: 100% !important;
  height: auto;
}

/* 2. Source-Level Overflow Fixes */

/* Fix A: CTA Motif Overflow */
.site-cta,
.cta-band {
  position: relative !important;
  overflow: hidden !important;
  max-width: 100% !important;
  width: 100% !important;
}

.cta-motif {
  max-width: 100% !important;
  overflow: hidden !important;
  pointer-events: none !important;
}

/* Fix B: Category Carousel & Track Viewport */
.categories-carousel-wrapper,
.categories-carousel-viewport {
  overflow: hidden !important;
  max-width: 100% !important;
  width: 100% !important;
}

/* Fix C: Watermarks under 768px */
@media (max-width: 768px) {
  .watermark-heading,
  .section-watermark-header .watermark-heading {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
    font-size: 0 !important;
  }
}

/* Fix D: Form Grids in Inquiry Quick & Detailed */
@media (max-width: 640px) {
  .form-grid-2 {
    display: flex !important;
    flex-direction: column !important;
    gap: 1rem !important;
    width: 100% !important;
    max-width: 100% !important;
  }
}

@media (max-width: 768px) {
  .cards-grid-5 {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.65rem !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  .cards-grid-5 .selectable-card:last-child {
    grid-column: span 2 !important;
  }
}

/* Fix E: Leaflet Map containment */
.leaflet-container {
  max-width: 100% !important;
  overflow: hidden !important;
}

/* 3. Mobile Header (Screens <= 1024px) */
@media (max-width: 1024px) {
  .site-header-walkers {
    height: 64px !important;
    max-height: 64px !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    background: #FFFFFF !important; /* Solid white background */
    border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04) !important;
    backdrop-filter: none !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 1000 !important;
  }

  .site-header-walkers:not(.is-scrolled) {
    background: #FFFFFF !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04) !important;
    backdrop-filter: none !important;
  }

  .site-header-walkers .header-container {
    height: 64px !important;
    display: flex !important;
    align-items: center !important;
    padding-left: calc(1rem + env(safe-area-inset-left, 0px)) !important;
    padding-right: calc(1rem + env(safe-area-inset-right, 0px)) !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .site-header-walkers .header-top-row {
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 0.5rem !important;
  }

  .header-brand {
    display: flex !important;
    align-items: center !important;
    gap: 0.6rem !important;
    max-width: calc(100% - 56px) !important;
    text-decoration: none !important;
  }

  .header-brand-logo {
    height: 38px !important;
    max-height: 40px !important;
    width: auto !important;
    flex-shrink: 0 !important;
    object-fit: contain !important;
  }

  .header-brand-name {
    font-size: clamp(1.05rem, 3.8vw, 1.25rem) !important;
    letter-spacing: 0.04em !important;
    white-space: nowrap !important;
    font-weight: 700 !important;
    color: #002B49 !important;
  }

  .site-header-walkers .brand-name-lotus {
    color: #002B49 !important; /* Navy */
  }

  .site-header-walkers .brand-name-ceylon {
    color: #B38744 !important; /* Deep Royal Gold (4.5:1 contrast on white) */
  }

  .header-brand-sub {
    color: #334155 !important; /* Dark Slate (contrast >= 4.5:1) */
    font-size: 0.55rem !important;
    letter-spacing: 0.05em !important;
    font-weight: 600 !important;
  }

  .walkers-ham {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 48px !important;
    height: 48px !important;
    min-width: 48px !important;
    min-height: 48px !important;
    background: transparent !important;
    border: none !important;
    cursor: pointer !important;
    padding: 0 !important;
    margin-right: -4px !important;
    flex-shrink: 0 !important;
    z-index: 1005 !important;
  }

  .walkers-ham span {
    display: block !important;
    width: 24px !important;
    height: 2.5px !important;
    background: #002B49 !important; /* Dark navy bars */
    border-radius: 2px !important;
    transition: transform 0.25s, opacity 0.25s !important;
  }
}

@media (max-width: 480px) {
  .header-brand-sub {
    display: none !important; /* Cleanly hidden under 480px */
  }
}

/* 4. Fullscreen Slide-in Mobile Drawer (100dvh, Cream Theme, Fixed Containment) */
.mobile-nav-fullscreen {
  position: fixed !important;
  inset: 0 !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
  height: 100dvh !important;
  background: #FBF7F0 !important; /* Elegant Cream */
  z-index: 3000 !important;
  display: flex !important;
  flex-direction: column !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
  transform: translateX(100%) !important;
  visibility: hidden !important;
  pointer-events: none !important;
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), visibility 0.35s !important;
  padding: calc(1rem + env(safe-area-inset-top, 0px)) 24px calc(2rem + env(safe-area-inset-bottom, 0px)) 24px !important;
  box-sizing: border-box !important;
}

.mobile-nav-fullscreen.is-open {
  transform: translateX(0) !important;
  visibility: visible !important;
  pointer-events: auto !important;
}

.mobile-nav-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding-bottom: 0.85rem !important;
  border-bottom: 1.5px solid rgba(28, 27, 31, 0.12) !important;
  background: transparent !important;
}

.mobile-nav-header .header-brand {
  display: flex !important;
  align-items: center !important;
  gap: 0.65rem !important;
  text-decoration: none !important;
}

.mobile-nav-header .header-brand-logo {
  height: 38px !important;
  width: auto !important;
  filter: none !important;
}

.mobile-nav-header .header-brand-name {
  font-family: var(--font-display, 'Cinzel', serif) !important;
  font-size: 1.18rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  color: #002B49 !important; /* Dark navy */
  text-shadow: none !important;
}

.mobile-nav-header .brand-name-lotus {
  color: #002B49 !important; /* Dark Navy */
}

.mobile-nav-header .brand-name-ceylon {
  color: #B38744 !important; /* Deep Royal Gold */
}

.mobile-nav-close {
  width: 48px !important;
  height: 48px !important;
  min-width: 48px !important;
  min-height: 48px !important;
  border-radius: 50% !important;
  background: #E8E2D8 !important;
  border: 1px solid rgba(28, 27, 31, 0.15) !important;
  font-size: 1.8rem !important;
  line-height: 1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #1C1B1F !important; /* High contrast >= 4.5:1 */
  cursor: pointer !important;
  padding: 0 !important;
}

.mobile-nav-body {
  padding: 1rem 0 2rem !important;
  display: flex !important;
  flex-direction: column !important;
  flex-grow: 1 !important;
}

.mobile-nav-list {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.25rem !important;
}

.mobile-nav-item {
  margin: 0 !important;
  padding: 0 !important;
  min-height: 48px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
}

.mobile-nav-link {
  min-height: 48px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0.6rem 0.5rem !important;
  font-size: 1.15rem !important;
  font-weight: 700 !important;
  color: #1C1B1F !important;
  text-decoration: none !important;
  border-radius: 8px !important;
  transition: background-color 0.2s, color 0.2s !important;
}

.mobile-nav-link:active,
.mobile-nav-link:hover {
  background: #EFE7DC !important;
  color: #B86214 !important;
}

/* Accordion Toggle */
.accordion-toggle {
  width: 100% !important;
  border: none !important;
  background: transparent !important;
  cursor: pointer !important;
  text-align: left !important;
}

/* Tours Submenu: Indented, Clean SVG alignment */
.mobile-accordion-submenu {
  display: none !important;
  flex-direction: column !important;
  padding: 0.5rem 0 0.5rem 1.25rem !important; /* Indented */
  margin: 0.25rem 0 0.5rem 0.5rem !important;
  border-left: 2.5px solid #D4A359 !important; /* Gold accent guide */
  gap: 0.25rem !important;
}

.mobile-accordion-submenu.is-expanded {
  display: flex !important;
}

.submenu-link {
  min-height: 46px !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.75rem !important;
  padding: 0.45rem 0.5rem !important;
  font-size: 0.95rem !important;
  font-weight: 600 !important;
  color: #334155 !important;
  text-decoration: none !important;
  border-radius: 6px !important;
}

.submenu-link:active,
.submenu-link:hover {
  background: #EFE7DC !important;
  color: #B86214 !important;
}

/* Fixed-width SVG column so icons line up across all Android devices */
.submenu-icon {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 22px !important;
  min-width: 22px !important;
  height: 22px !important;
  flex-shrink: 0 !important;
  color: #B38744 !important;
}

/* 5. Mobile Footer Rules */
@media (max-width: 768px) {
  .site-footer-walkers {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  .site-footer-walkers .wrapper--80,
  .site-footer-walkers .footer-container {
    width: 100% !important;
    max-width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    box-sizing: border-box !important;
  }

  .site-footer-walkers .footer-grid,
  .footer-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 2rem !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  /* Phone shows in full without wrapping digits or cutting */
  .footer-contact-item a[href^="tel:"],
  a[href^="tel:"] {
    white-space: nowrap !important;
    font-size: clamp(0.95rem, 4.2vw, 1.15rem) !important;
    letter-spacing: 0.02em !important;
    display: inline-block !important;
    max-width: 100% !important;
  }

  /* Wrap long email addresses, links, and text inside padding */
  .site-footer-walkers a,
  .site-footer-walkers p,
  .site-footer-walkers span,
  .site-footer-walkers li {
    overflow-wrap: anywhere !important;
    word-break: break-word !important;
    max-width: 100% !important;
  }
}
"""

with open('assets/css/site.css', 'r', encoding='utf-8') as f:
    site_css = f.read()

# Append or replace hotfix section
if 'HOTFIX - ANDROID HORIZONTAL OVERFLOW' in site_css:
    site_css = site_css.split('/* ==========================================================================\n   HOTFIX - ANDROID HORIZONTAL OVERFLOW')[0]

site_css += "\n" + HOTFIX_CSS

with open('assets/css/site.css', 'w', encoding='utf-8') as f:
    f.write(site_css)

print("Appended HOTFIX_CSS to assets/css/site.css!")

# Also patch css/style.css to eliminate right: -100%
with open('css/style.css', 'r', encoding='utf-8', errors='ignore') as f:
    style_css = f.read()

style_css = style_css.replace('right: -100%;', '/* right: -100% replaced */ transform: translateX(100%); visibility: hidden; pointer-events: none;')
style_css = style_css.replace('right: 0;', '/* right: 0 replaced */ transform: translateX(0); visibility: visible; pointer-events: auto;')

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(style_css)

print("Patched right: -100% in css/style.css!")
