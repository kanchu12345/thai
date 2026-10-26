import json

with open('tools/audit_browser_results.json', encoding='utf-8') as f:
    d = json.load(f)

print(f"=== CONSOLE ERRORS ({len(d['console_errors'])} pages) ===")
for page, errs in d['console_errors'].items():
    print(f"  {page}:")
    for e in errs:
        print(f"    - {e}")

print(f"\n=== FAILED REQUESTS ({len(d['failed_requests'])} pages) ===")
for page, reqs in d['failed_requests'].items():
    print(f"  {page}:")
    for r in reqs:
        print(f"    - {r}")

print(f"\n=== RESPONSIVE OVERFLOW ({len(d['responsive_checks'])} pages) ===")
for page, checks in d['responsive_checks'].items():
    print(f"  {page}:")
    for c in checks:
        print(f"    - VP {c['viewport']} (width {c['width']}px): cW={c['overflow']['clientWidth']} sW={c['overflow']['scrollWidth']} bSW={c['overflow']['bodyScrollWidth']}")

print(f"\n=== ACCESSIBILITY ISSUES ({len(d['accessibility_issues'])} pages) ===")
print(f"Total pages with a11y issues: {len(d['accessibility_issues'])}")
# group by issue type
issue_types = {}
for page, issues in d['accessibility_issues'].items():
    for iss in issues:
        key = iss.split(':')[0]
        if 'Missing alt attribute' in iss: key = 'Missing alt attribute'
        elif 'lack accessible text' in iss: key = 'Buttons lack accessible text'
        elif 'lack associated labels' in iss: key = 'Inputs lack labels'
        elif 'Missing H1' in iss: key = 'Missing H1'
        elif 'Multiple H1' in iss: key = 'Multiple H1'
        issue_types.setdefault(key, []).append((page, iss))

for itype, occurrences in issue_types.items():
    print(f"  - {itype} ({len(occurrences)} pages): example: {occurrences[0][1]} on {occurrences[0][0]}")
