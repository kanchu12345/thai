import os

def update_file(filepath, target, replacement):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if target in content:
        content = content.replace(target, replacement)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"Target not found in {filepath}")

# 1. js/config.js
update_file(
    'js/config.js',
    'window.BASE_PATH = window.BASE_PATH || "/thai/";',
    'window.BASE_PATH = window.BASE_PATH || (typeof window !== "undefined" && window.location.pathname.startsWith("/thai") ? "/thai/" : "/");'
)

# 2. assets/js/config.js
update_file(
    'assets/js/config.js',
    'window.BASE_PATH = window.BASE_PATH || "/thai/";',
    'window.BASE_PATH = window.BASE_PATH || (typeof window !== "undefined" && window.location.pathname.startsWith("/thai") ? "/thai/" : "/");'
)

# 3. assets/js/site-data.js
update_file(
    'assets/js/site-data.js',
    'return window.BASE_PATH || (window.location.pathname.includes(\'/thai/\') ? \'/thai/\' : \'/\');',
    'return (typeof window !== "undefined" && window.location.pathname.startsWith("/thai")) ? "/thai/" : (window.BASE_PATH || "/");'
)
