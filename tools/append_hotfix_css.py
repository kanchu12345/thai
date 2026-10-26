hotfix_css = """

/* ==============================================================================
   HOTFIX - ZERO HORIZONTAL OVERFLOW AT 320px, 360px, 393px, 412px
   Strict Root-Cause Resolution for All Grids, Inputs, Maps, and Menus
   ============================================================================== */

/* Safety Net applied strictly after fixing causes at source */
html, body {
  max-width: 100% !important;
  overflow-x: clip !important;
  overflow-wrap: anywhere !important;
  -webkit-text-size-adjust: 100% !important;
}

/* 1. Mobile Menu: Inset 0, 100dvh, closed state visibility hidden & zero width impact */
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
  background: #FBF7F0 !important; /* Cream */
  z-index: 3000 !important;
  display: flex !important;
  flex-direction: column !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
  padding: calc(1rem + env(safe-area-inset-top, 0px)) 24px calc(2rem + env(safe-area-inset-bottom, 0px)) 24px !important;
  box-sizing: border-box !important;
}

.mobile-nav-fullscreen:not(.is-open) {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
  opacity: 0 !important;
  transform: translateX(100%) !important;
}

.mobile-nav-fullscreen.is-open {
  display: flex !important;
  visibility: visible !important;
  pointer-events: auto !important;
  opacity: 1 !important;
  transform: translateX(0) !important;
}

/* 2. Inquiry Form Grids & Pax Calculator */
@media (max-width: 768px) {
  .pax-inputs-row {
    display: flex !important;
    flex-direction: column !important;
    gap: 0.75rem !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  .total-pax-badge-wrapper {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  .checkbox-tiles-grid {
    grid-template-columns: 1fr !important;
    gap: 0.5rem !important;
    width: 100% !important;
  }
  .interests-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.5rem !important;
    width: 100% !important;
  }
  .interest-tile, .checkbox-tile {
    width: 100% !important;
    box-sizing: border-box !important;
    padding: 0.65rem 0.5rem !important;
  }
  .form-card {
    padding: 1.5rem 1rem !important;
    border-radius: 12px !important;
    box-sizing: border-box !important;
    width: 100% !important;
    max-width: 100% !important;
  }
}

@media (max-width: 360px) {
  .interests-grid {
    grid-template-columns: 1fr !important;
  }
  .checkbox-tiles-grid {
    grid-template-columns: 1fr !important;
  }
}

/* 3. Contact Page Cards & Leaflet Maps */
@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  .contact-info-card,
  .contact-form-card {
    padding: 1.5rem 1rem !important;
    border-radius: 12px !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  .contact-map-section,
  .contact-map-wrapper,
  .contact-map-wrap,
  #contactMap {
    width: 100% !important;
    max-width: 100% !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
  }
  .leaflet-container {
    max-width: 100% !important;
    overflow: hidden !important;
  }
  .leaflet-tile-container {
    max-width: 100% !important;
  }
  .chat-channel-pills {
    display: flex !important;
    flex-direction: column !important;
    gap: 0.5rem !important;
    width: 100% !important;
  }
  .chat-pill {
    width: 100% !important;
    justify-content: center !important;
    box-sizing: border-box !important;
  }
}

@media (max-width: 360px) {
  .contact-info-card,
  .contact-form-card {
    padding: 1.25rem 0.75rem !important;
  }
  .wrapper--90,
  .wrapper--80,
  .wrapper--95 {
    width: 100% !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    box-sizing: border-box !important;
  }
}
"""

with open('assets/css/site.css', 'a', encoding='utf-8') as f:
    f.write(hotfix_css)
print("Updated assets/css/site.css")

with open('css/style.css', 'a', encoding='utf-8') as f:
    f.write(hotfix_css)
print("Updated css/style.css")
