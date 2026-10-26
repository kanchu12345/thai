with open('firestore.rules', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    new_lines.append(line)
    if 'function isAdmin()' in line:
        # Find where isAdmin closes
        pass

# Let's inspect line by line
content = "".join(lines)
idx1 = content.find("function isAdmin()")
idx2 = content.find("match /admins/{docId}")

if idx1 != -1 and idx2 != -1:
    # insert isSuperAdmin after isAdmin's closing brace
    brace_idx = content.find("}", idx1)
    insert_code = """

    function isSuperAdmin() {
      return isAuthenticated() && (
        (exists(/databases/$(database)/documents/admins/$(request.auth.uid)) &&
         get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'super_admin') ||
        request.auth.token.role == 'super_admin' ||
        request.auth.token.admin == true
      );
    }"""
    content = content[:brace_idx + 1] + insert_code + content[brace_idx + 1:]
    content = content.replace("match /admins/{docId} {\n      allow read: if isAuthenticated();\n      allow write: if isAdmin();",
                              "match /admins/{docId} {\n      allow read: if isAuthenticated();\n      allow write: if isSuperAdmin();")
    content = content.replace("match /admins/{docId} {\r\n      allow read: if isAuthenticated();\r\n      allow write: if isAdmin();",
                              "match /admins/{docId} {\r\n      allow read: if isAuthenticated();\r\n      allow write: if isSuperAdmin();")
    with open('firestore.rules', 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESSFULLY PATCHED firestore.rules")
else:
    print("INDEX NOT FOUND", idx1, idx2)
