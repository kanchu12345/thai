# -*- coding: utf-8 -*-
with open('admin/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
sections = re.findall(r'<section class="content-section[^"]*" id="([^"]+)"', text)
print(f"Total content sections found: {len(sections)}")
for s in sections:
    print(f"  {s}")
