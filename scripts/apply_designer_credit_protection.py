import os
import re

HEADER_COMMENT = "<!-- Site design & development: Infinite Design (https://infiniteweb.dev/) — see /humans.txt and LICENSE.txt -->"
META_GENERATOR = '<meta name="generator" content="Built by Infinite Design — https://infiniteweb.dev/">'
BUILD_WATERMARK = "<!-- ID-BUILD: infinite-design / 2026-11-01 / lotusceylon -->"

JS_CSS_HEADER = """/*
 * © 2026 Infinite Design. All rights reserved.
 * Built for Lotus Ceylon International Tours & Services (Pvt) Ltd.
 * Unauthorized removal of attribution does not transfer ownership of this code.
 * https://infiniteweb.dev/
 */
"""

html_count = 0
js_count = 0
css_count = 0

rare_files = {'privacy-policy.html', 'terms-conditions.html', 'cancellation-policy.html', 'cookie-policy.html'}

for root, dirs, files in os.walk('.'):
    # Skip git, node_modules, .gemini, tmp
    if any(skip in root for skip in ['.git', 'node_modules', '.gemini', 'tmp']):
        continue

    for f in files:
        file_path = os.path.join(root, f)
        
        # 1. HTML files
        if f.endswith('.html'):
            try:
                with open(file_path, 'r', encoding='utf-8') as hf:
                    content = hf.read()
            except Exception:
                continue

            changed = False

            # Add top comment
            if HEADER_COMMENT not in content:
                # Place right after <!DOCTYPE html> or at the very top
                doctype_match = re.search(r'<!DOCTYPE\s+html[^>]*>', content, re.IGNORECASE)
                if doctype_match:
                    pos = doctype_match.end()
                    content = content[:pos] + "\n" + HEADER_COMMENT + content[pos:]
                else:
                    content = HEADER_COMMENT + "\n" + content
                changed = True

            # Add meta generator in <head>
            if 'name="generator"' not in content:
                head_match = re.search(r'<head[^>]*>', content, re.IGNORECASE)
                if head_match:
                    pos = head_match.end()
                    content = content[:pos] + "\n  " + META_GENERATOR + content[pos:]
                    changed = True

            # Add watermark in rare files
            if f in rare_files and BUILD_WATERMARK not in content:
                content += f"\n{BUILD_WATERMARK}\n"
                changed = True

            # Also ensure watermark in shared footer if present
            if 'id="siteFooter"' in content and BUILD_WATERMARK not in content:
                content = content.replace('id="siteFooter"', f'id="siteFooter"\n{BUILD_WATERMARK}')
                changed = True

            if changed:
                with open(file_path, 'w', encoding='utf-8') as hf:
                    hf.write(content)
                html_count += 1

        # 2. CSS files (skip vendor)
        elif f.endswith('.css') and 'vendor' not in root:
            try:
                with open(file_path, 'r', encoding='utf-8') as cf:
                    c_content = cf.read()
            except Exception:
                continue

            if "© 2026 Infinite Design" not in c_content:
                c_content = JS_CSS_HEADER + c_content
                with open(file_path, 'w', encoding='utf-8') as cf:
                    cf.write(c_content)
                css_count += 1

        # 3. JS files (skip vendor, scripts)
        elif f.endswith('.js') and 'vendor' not in root and not root.startswith('.\\scripts') and not root.startswith('./scripts'):
            try:
                with open(file_path, 'r', encoding='utf-8') as jf:
                    j_content = jf.read()
            except Exception:
                continue

            if "© 2026 Infinite Design" not in j_content:
                j_content = JS_CSS_HEADER + j_content
                with open(file_path, 'w', encoding='utf-8') as jf:
                    jf.write(j_content)
                js_count += 1

print(f"Applied protection: {html_count} HTML files, {css_count} CSS files, {js_count} JS files.")
