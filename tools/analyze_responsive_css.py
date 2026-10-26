import os
import re

css_files = ['css/style.css', 'css/brand-header.css', 'assets/css/site.css']

def analyze_patterns():
    for cf in css_files:
        if not os.path.exists(cf):
            print(f"File not found: {cf}")
            continue
        print(f"\n==========================================")
        print(f"ANALYZING {cf}")
        print(f"==========================================")
        with open(cf, 'r', encoding='utf-8', errors='ignore') as f:
            text = f.read()

        # 1. Comparison matrix & tables
        print("\n--- TABLES & COMPARISON MATRIX ---")
        for m in re.finditer(r'([^{}]*(?:table|matrix|comparison)[^{}]*\{[^}]*\})', text, re.IGNORECASE):
            rule = m.group(1).strip()
            if any(k in rule for k in ['min-width', 'width', 'overflow', 'display', 'grid']):
                print(rule[:180] + '...')

        # 2. Floating action buttons & WhatsApp
        print("\n--- FLOATING WHATSAPP & FAB ---")
        for m in re.finditer(r'([^{}]*(?:fab|whatsapp)[^{}]*\{[^}]*\})', text, re.IGNORECASE):
            rule = m.group(1).strip()
            if any(k in rule for k in ['position', 'bottom', 'right', 'z-index', 'safe-area']):
                print(rule[:180] + '...')

        # 3. Header breakpoints
        print("\n--- HEADER BREAKPOINTS & MEDIA QUERIES ---")
        for m in re.finditer(r'(@media[^{]*\{[^{}]*(?:header|nav|menu|ham)[^{}]*\{[^}]*\})', text, re.IGNORECASE):
            print(m.group(1).strip()[:180] + '...')

        # 4. Safe area insets
        print("\n--- SAFE AREA INSETS ---")
        for m in re.finditer(r'([^{}]*safe-area[^{}]*\{[^}]*\})', text, re.IGNORECASE):
            print(m.group(1).strip()[:180] + '...')

analyze_patterns()
