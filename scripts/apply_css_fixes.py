import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/css/admin.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update modal visibility
old_modal = '''.modal-overlay,
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(28, 27, 31, 0.6);
  backdrop-filter: blur(3px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

.modal-overlay.active,
.modal.active {
  opacity: 1;
  pointer-events: auto;
}'''

new_modal = '''.modal-overlay,
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(28, 27, 31, 0.6);
  backdrop-filter: blur(3px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: opacity 0.25s ease, visibility 0.25s ease;
}

.modal-overlay.active,
.modal.active {
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
}'''

# Normalize line endings for replacement
css_normalized = css.replace('\r\n', '\n')
assert old_modal in css_normalized, "old_modal not found"
css_normalized = css_normalized.replace(old_modal, new_modal)

# 2. Add .table-responsive styling
old_dt = '''.data-table-wrap {
  overflow-x: auto;
}'''

new_dt = '''.data-table-wrap,
.table-responsive {
  overflow-x: auto;
  width: 100%;
  -webkit-overflow-scrolling: touch;
}'''

assert old_dt in css_normalized, "old_dt not found"
css_normalized = css_normalized.replace(old_dt, new_dt)

# Write back
with open('admin/css/admin.css', 'w', encoding='utf-8') as f:
    f.write(css_normalized)

print("CSS updates applied successfully!")
