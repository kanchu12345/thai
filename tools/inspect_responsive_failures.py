import json

with open('tools/full_responsive_audit_results.json', encoding='utf-8') as f:
    data = json.load(f)

print("=== FAILURES ACROSS PAGES & VIEWPORTS ===")
failure_count = 0
for page_key, pdata in data.items():
    for vp_name, m in pdata['viewports'].items():
        if m['hasOverflow'] or m['headerOverlap'] or m['uncontainedTables'] > 0 or m['overlyWideCards'] > 0:
            failure_count += 1
            print(f"[{page_key}] @ {vp_name}:")
            if m['hasOverflow']:
                print(f"   - Horizontal Overflow: sW={m['scrollWidth']}, cW={m['clientWidth']}, bSW={m['bodyScrollWidth']}, scrollX={m['scrollX']}")
            if m['headerOverlap']:
                print(f"   - Header Overlap with Title: headerHeight={m['headerHeight']}")
            if m['uncontainedTables'] > 0:
                print(f"   - Uncontained Tables: {m['uncontainedTables']}")
            if m['overlyWideCards'] > 0:
                print(f"   - Overly Wide Cards: {m['overlyWideCards']}")

print(f"\nTotal failure instances: {failure_count}")

# Check small text (< 11px) summary
print("\n=== SMALL TEXT FINDINGS (< 11px) ===")
for page_key, pdata in data.items():
    m = pdata['viewports'].get('360_standard_android', {})
    if m.get('smallTextCount', 0) > 0:
        print(f"[{page_key}] has {m['smallTextCount']} text elements < 11px: {m.get('sampleSmallText')}")
