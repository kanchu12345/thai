with open('admin/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'id="categoryModal"' in line:
        print(f"categoryModal at line {i+1}")
        for j in range(i, min(i+75, len(lines))):
            if 'id="destinationModal"' in lines[j]:
                print(f"destinationModal at line {j+1}")
                break
