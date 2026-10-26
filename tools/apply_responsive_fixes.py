responsive_fixes_css = """

/* ==============================================================================
   RESPONSIVE DESIGN REPAIR - ALL VIEWPORTS & DEVICES (320px - 1920px & LANDSCAPE)
   Strict Element-by-Element Sizing, Breakpoints & Safe-Area Adjustments
   ============================================================================== */

/* 1. Header Brand Protection (Zero Crushing / Squishing between 1024px - 1280px) */
.header-brand,
.site-header-walkers .header-brand {
  flex-shrink: 0 !important;
  white-space: nowrap !important;
}
.header-brand-text,
.site-header-walkers .header-brand-text {
  flex-shrink: 0 !important;
  white-space: nowrap !important;
}
.header-brand-name,
.site-header-walkers .header-brand-name {
  white-space: nowrap !important;
}
.header-brand-sub,
.site-header-walkers .header-brand-sub {
  white-space: nowrap !important;
  font-size: clamp(0.65rem, 1.1vw, 0.76rem) !important;
  letter-spacing: 0.08em !important;
}

/* 2. Laptop Navigation Compact Tuning (1025px - 1280px) */
@media (min-width: 1025px) and (max-width: 1280px) {
  .site-header-walkers {
    padding: 0.55rem 0 !important;
  }
  .site-header-walkers .header-container {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    max-width: 100% !important;
  }
  .header-brand-logo {
    height: 46px !important;
    max-width: 58px !important;
  }
  .header-brand-name {
    font-size: 1.15rem !important;
  }
  .walkers-nav {
    flex-grow: 1 !important;
    justify-content: center !important;
  }
  .walkers-menu {
    gap: 0.65rem !important;
  }
  .walkers-menu-link {
    font-size: 0.82rem !important;
    padding: 0.35rem 0.35rem !important;
  }
  .header-tools {
    gap: 0.5rem !important;
  }
  .lang-pill-btn {
    padding: 0.4rem 0.6rem !important;
    font-size: 0.8rem !important;
  }
  .gold-inquire-btn {
    padding: 0.45rem 0.85rem !important;
    font-size: 0.82rem !important;
  }
}

/* 3. Hero Banner & Heading Fluid Sizing */
.hero-banner,
.contact-hero {
  padding-top: max(140px, calc(80px + 3vw)) !important;
}

.hero-title,
.contact-hero h1 {
  font-size: clamp(1.85rem, 4.8vw, 3.4rem) !important;
  overflow-wrap: anywhere !important;
  word-break: break-word !important;
  line-height: 1.2 !important;
}

.hero-slogan {
  font-size: clamp(0.78rem, 1.8vw, 0.95rem) !important;
  letter-spacing: 0.12em !important;
}

@media (max-width: 1024px) {
  .hero-banner,
  .contact-hero {
    padding-top: max(96px, calc(64px + 2rem)) !important;
  }
}

/* 4. Universal Grid Adaptability under 768px */
@media (max-width: 768px) {
  .beach-packages-grid,
  .packages-grid,
  .tours-grid,
  .category-card-grid,
  .destinations-grid,
  .vision-mission-grid {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
    width: 100% !important;
  }
  .beach-package-card,
  .package-card,
  .cat-showcase-card,
  .destination-card,
  .tour-card,
  .vision-mission-card {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
}

/* 5. Comparison Matrix & Tables Touch Scrolling Affordance */
.lotus-table-responsive {
  width: 100% !important;
  max-width: 100% !important;
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch !important;
  position: relative !important;
  border-radius: 12px !important;
  border: 1px solid var(--border-subtle, #E8E2D8) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
  margin-bottom: 2rem !important;
}

.lotus-table-responsive::-webkit-scrollbar {
  height: 6px !important;
}
.lotus-table-responsive::-webkit-scrollbar-track {
  background: #F1E9E1 !important;
  border-radius: 3px !important;
}
.lotus-table-responsive::-webkit-scrollbar-thumb {
  background: var(--sacred-gold, #D4A359) !important;
  border-radius: 3px !important;
}

@media (max-width: 768px) {
  .lotus-comparison-table th,
  .lotus-comparison-table td {
    padding: 0.75rem 0.65rem !important;
    font-size: 0.82rem !important;
  }
}

/* 6. Short Mobile Landscape Viewports (e.g. 800x360, 915x412) & Safe Areas */
@media (max-height: 480px) and (orientation: landscape) {
  .site-header-walkers {
    height: 54px !important;
    max-height: 54px !important;
    padding: 0 !important;
  }
  .site-header-walkers .header-container {
    height: 54px !important;
  }
  .header-brand-logo {
    height: 34px !important;
    max-height: 34px !important;
  }
  .header-brand-name {
    font-size: 1.05rem !important;
  }
  .header-brand-sub {
    display: none !important;
  }
  .hero-banner,
  .contact-hero {
    padding-top: 80px !important;
    min-height: auto !important;
    padding-bottom: 2rem !important;
  }
  .unified-fab-group {
    bottom: calc(0.5rem + env(safe-area-inset-bottom, 0px)) !important;
    right: calc(0.75rem + env(safe-area-inset-right, 0px)) !important;
    gap: 0.4rem !important;
  }
  .fab-btn {
    width: 42px !important;
    height: 42px !important;
    min-width: 42px !important;
    min-height: 42px !important;
  }
  .mobile-nav-fullscreen {
    padding-top: calc(0.5rem + env(safe-area-inset-top, 0px)) !important;
  }
}

/* 7. Minimum Typography & Line Spacing for Android & Touch Legibility */
p, li {
  line-height: 1.65 !important;
}
.beach-tag-badge,
.tag-badge,
.meta-pill {
  font-size: clamp(0.72rem, 1.5vw, 0.8rem) !important;
  line-height: 1.3 !important;
}
"""

with open('assets/css/site.css', 'a', encoding='utf-8') as f:
    f.write(responsive_fixes_css)
print("Updated assets/css/site.css with comprehensive responsive repairs")

with open('css/style.css', 'a', encoding='utf-8') as f:
    f.write(responsive_fixes_css)
print("Updated css/style.css with comprehensive responsive repairs")
