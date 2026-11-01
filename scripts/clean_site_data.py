with open('assets/js/site-data.js', 'r', encoding='utf-8') as f:
    code = f.read()

header = """/*
 * © 2026 Infinite Design. All rights reserved.
 * Built for Lotus Ceylon International Tours & Services (Pvt) Ltd.
 * Unauthorized removal of attribution does not transfer ownership of this code.
 * https://infiniteweb.dev/
 */
"""

# Cut off before "// ========================================================================="
# where "Core Attribution & License Integrity Engine" starts
cut_marker = "// Core Attribution & License Integrity Engine"
idx = code.find(cut_marker)
if idx != -1:
    # find comment line start
    line_start = code.rfind('//', 0, idx)
    code = code[:line_start] + """  // Expose globally
  window.SiteData = SiteData;

  // Auto-init
  SiteData.init();

})(window, document);
"""
    print("Cleaned Guardian observer and atob from site-data.js")

if "© 2026 Infinite Design. All rights reserved." not in code:
    code = header + code
    print("Added copyright header to site-data.js")

with open('assets/js/site-data.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Saved assets/js/site-data.js")
