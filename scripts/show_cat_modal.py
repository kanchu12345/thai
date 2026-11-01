with open('admin/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start = None
end = None
for i, l in enumerate(lines):
    if '<!-- CATEGORY EDIT MODAL -->' in l:
        start = i
    if start is not None and '<!-- DESTINATION EDIT MODAL -->' in l:
        end = i
        break

print(f"Start: {start}, End: {end}")
print("".join(lines[start:end]))
