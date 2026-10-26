with open('assets/css/site.css', 'r', encoding='utf-8') as f:
    css = f.read().replace('\r\n', '\n')

a11y_css = """
/* ==============================================================================
 * WCAG 2.2 AA ACCESSIBILITY: VISIBLE FOCUS INDICATORS & SKIP NAVIGATION
 * ============================================================================== */
:focus-visible {
  outline: 3px solid #D4A359 !important;
  outline-offset: 3px !important;
  box-shadow: 0 0 0 1px #FFFFFF, 0 0 8px rgba(212, 163, 89, 0.6) !important;
}

input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid #002B49 !important;
  outline-offset: 2px !important;
  border-color: #D4A359 !important;
}

/* Skip link for keyboard users (WCAG 2.4.1 Bypass Blocks) */
.skip-to-content-link {
  position: absolute;
  top: -120px;
  left: 16px;
  background: #002B49;
  color: #FFFFFF !important;
  padding: 12px 20px;
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 6px;
  z-index: 100000;
  text-decoration: none !important;
  border: 2px solid #D4A359;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: top 0.2s ease-in-out;
}

.skip-to-content-link:focus,
.skip-to-content-link:focus-visible {
  top: 16px;
  outline: 3px solid #D4A359 !important;
}
"""

if ":focus-visible" not in css:
    css += a11y_css
    with open('assets/css/site.css', 'w', encoding='utf-8', newline='\n') as f:
        f.write(css)
    print("SUCCESS: Added WCAG 2.2 AA accessibility styles to assets/css/site.css")
else:
    print("ALREADY EXISTS: :focus-visible found in assets/css/site.css")
