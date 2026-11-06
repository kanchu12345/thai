import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = '''    async saveTeamMember(e) {

      e.preventDefault();'''

replacement = '''    async saveTeamMember(e) {

      if (e && e.preventDefault) e.preventDefault();'''

assert target in code, "target not found"
code = code.replace(target, replacement)

with open('admin/js/admin-app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Fixed saveTeamMember preventDefault!")
