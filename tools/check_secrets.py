import os, re

patterns = [
    r'-----BEGIN (?:RSA )?PRIVATE KEY-----',
    r'ghp_[a-zA-Z0-9]{36}',
    r'"private_key":\s*"-----BEGIN',
    r'service_role',
    r'sk_live_[0-9a-zA-Z]{24}',
    r'AKIA[0-9A-Z]{16}'
]

TEXT_EXTS = ('.html', '.js', '.css', '.json', '.yml', '.rules', '.md', '.txt', '.py')

findings = []
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in ('.git', 'node_modules', '.vscode', '__pycache__')]
    for f in files:
        if not f.endswith(TEXT_EXTS):
            continue
        p = os.path.join(root, f)
        try:
            with open(p, 'r', encoding='utf-8', errors='ignore') as fl:
                content = fl.read()
                for pat in patterns:
                    if re.search(pat, content):
                        findings.append((p, pat))
        except Exception:
            pass

print('Sensitive secret scan findings:', findings)
