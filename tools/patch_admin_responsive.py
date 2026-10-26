with open('admin/css/admin.css', 'r', encoding='utf-8') as f:
    css = f.read().replace('\r\n', '\n')

old_responsive = """/* RESPONSIVE */
@media (max-width: 992px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }
  .admin-sidebar.open {
    transform: translateX(0);
  }
  .admin-main {
    margin-left: 0;
  }
  .menu-toggle-btn {
    display: block;
  }
}"""

new_responsive = """/* RESPONSIVE */
@media (max-width: 992px) {
  .admin-sidebar {
    transform: translateX(-100%);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
  }
  .admin-sidebar.open {
    transform: translateX(0);
  }
  .admin-main {
    margin-left: 0 !important;
    min-width: 0 !important;
    max-width: 100% !important;
    overflow-x: hidden !important;
  }
  .menu-toggle-btn {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .admin-topbar {
    padding: 0 12px !important;
    height: auto !important;
    min-height: 56px !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
  }
  .topbar-left {
    gap: 8px !important;
  }
  .page-breadcrumb {
    font-size: 0.92rem !important;
    max-width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .topbar-right {
    gap: 8px !important;
    margin-left: auto;
  }
  .topbar-right .session-indicator {
    display: none !important;
  }
  .topbar-right #currentUserEmail {
    display: none !important;
  }
  .topbar-btn {
    padding: 6px 10px !important;
    font-size: 0.78rem !important;
  }
  .admin-content {
    padding: 14px 10px !important;
    max-width: 100% !important;
    overflow-x: hidden !important;
  }
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)) !important;
    gap: 10px !important;
  }
  .section-header {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 10px !important;
  }
  .table-card {
    padding: 10px !important;
    border-radius: 8px !important;
    max-width: 100% !important;
  }
  .data-table-wrap {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }
  .data-table {
    min-width: 580px !important;
  }
  .modal-dialog {
    width: 95% !important;
    margin: 10px auto !important;
    max-height: 90vh !important;
    overflow-y: auto !important;
  }
}

@media (max-width: 480px) {
  .page-breadcrumb {
    display: none !important;
  }
  .inquiry-tab-bar {
    flex-wrap: wrap !important;
    gap: 6px !important;
  }
  .inquiry-tab-btn {
    padding: 6px 12px !important;
    font-size: 0.8rem !important;
  }
}"""

if old_responsive in css:
    css = css.replace(old_responsive, new_responsive)
    with open('admin/css/admin.css', 'w', encoding='utf-8', newline='\n') as f:
        f.write(css)
    print("SUCCESS: Updated admin.css responsive rules.")
else:
    print("FAILED: old_responsive pattern not found in admin.css")
