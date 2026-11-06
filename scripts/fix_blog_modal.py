import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# We want to remove the redundant duplicate blogModal block
start_marker = '<!-- BLOG POST MODAL -->\n<div class="modal-backdrop" id="blogModal"'
start_marker_crlf = '<!-- BLOG POST MODAL -->\r\n<div class="modal-backdrop" id="blogModal"'
end_marker = '</form>\n</div>\n</div>'
end_marker_crlf = '</form>\r\n</div>\r\n</div>'

if start_marker_crlf in content:
    idx_start = content.find(start_marker_crlf)
    idx_end = content.find(end_marker_crlf, idx_start) + len(end_marker_crlf)
    content = content[:idx_start] + content[idx_end:]
    with open('admin/index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully removed duplicate blogModal with CRLF.")
elif start_marker in content:
    idx_start = content.find(start_marker)
    idx_end = content.find(end_marker, idx_start) + len(end_marker)
    content = content[:idx_start] + content[idx_end:]
    with open('admin/index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully removed duplicate blogModal with LF.")
else:
    print("Start marker not found, searching...")
    import re
    m = re.search(r'<!-- BLOG POST MODAL -->\s*<div class="modal-backdrop" id="blogModal".*?</form>\s*</div>\s*</div>', content, re.DOTALL)
    if m:
        content = content[:m.start()] + content[m.end():]
        with open('admin/index.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Successfully removed duplicate blogModal with regex.")
    else:
        print("Regex match failed.")
