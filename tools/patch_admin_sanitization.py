import re

with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    code = f.read().replace('\r\n', '\n')

# 1. Dashboard recent inquiries
old_dash_map = """      tbody.innerHTML = recent.map(inq => `

        <tr>

          <td><strong style="color: var(--lotus-primary); font-size: 0.8rem;">${inq.reference_no}</strong></td>

          <td><strong>${inq.full_name}</strong><br><small style="color: var(--ink-muted);">${inq.country || ''}</small></td>

          <td>${inq.email}<br><small style="color: var(--ink-muted);">${inq.phone || 'N/A'}</small></td>

          <td>${inq.travel_dates || 'Flexible'}<br><small>${inq.travelers_count || 2} Pax</small></td>

          <td><span class="badge ${this.getInquiryBadgeClass(inq.status)}">${inq.status}</span></td>

          <td><small style="color: var(--ink-muted);">${this.formatDate(inq.created_at)}</small></td>

          <td>

            <button class="btn btn-outline btn-sm" onclick="AdminApp.viewInquiry('${inq.reference_no}')">View</button>

          </td>

        </tr>

      `).join('');"""

new_dash_map = """      tbody.innerHTML = recent.map(inq => {
        const refNo = this.escapeHtml(inq.reference_no || 'N/A');
        const refAttr = this.escapeAttr(inq.reference_no || '');
        const name = this.escapeHtml(inq.full_name || 'Guest');
        const country = this.escapeHtml(inq.country || '');
        const email = this.escapeHtml(inq.email || '');
        const phone = this.escapeHtml(inq.phone || 'N/A');
        const dates = this.escapeHtml(inq.travel_dates || 'Flexible');
        const pax = this.escapeHtml(String(inq.travelers_count || 2));
        const status = this.escapeHtml(inq.status || 'new');
        return `
        <tr>
          <td><strong style="color: var(--lotus-primary); font-size: 0.8rem;">${refNo}</strong></td>
          <td><strong>${name}</strong><br><small style="color: var(--ink-muted);">${country}</small></td>
          <td>${email}<br><small style="color: var(--ink-muted);">${phone}</small></td>
          <td>${dates}<br><small>${pax} Pax</small></td>
          <td><span class="badge ${this.getInquiryBadgeClass(inq.status)}">${status}</span></td>
          <td><small style="color: var(--ink-muted);">${this.formatDate(inq.created_at)}</small></td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="AdminApp.viewInquiry('${refAttr}')">View</button>
          </td>
        </tr>
      `;
      }).join('');"""

if old_dash_map in code:
    code = code.replace(old_dash_map, new_dash_map)
    print("1. Dashboard inquiries sanitized.")
else:
    print("WARNING: old_dash_map not matched")

# 2. filterInquiries
# Let's inspect the exact lines around filterInquiries tbody.innerHTML = list.map
filter_inq_pattern = r"(tbody\.innerHTML\s*=\s*list\.map\(inq\s*=>\s*\{)(.*?)(const\s+refNo\s*=.*?)(const\s+dateReceived\s*=.*?;\s*)(if\s*\(isQuick\)\s*\{)(.*?)(\}\.join\(''\);)"
# Instead of complex regex, let's replace the whole tbody.innerHTML = list.map ... }.join(''); block
# Let's find index of list.map(inq => { in filterInquiries
idx1 = code.find("filterInquiries() {")
if idx1 != -1:
    idx2 = code.find("tbody.innerHTML = list.map(inq => {", idx1)
    idx3 = code.find("}).join('');", idx2)
    if idx2 != -1 and idx3 != -1:
        old_filter_block = code[idx2:idx3 + len("}).join('');")]
        new_filter_block = """tbody.innerHTML = list.map(inq => {
        const rawRef = inq.referenceId || inq.reference_no || inq.id || 'N/A';
        const refNo = this.escapeHtml(rawRef);
        const refAttr = this.escapeAttr(rawRef);
        const name = this.escapeHtml(inq.fullName || inq.full_name || 'Guest');
        const email = this.escapeHtml(inq.emailAddress || inq.email || '');
        const phone = this.escapeHtml(inq.whatsapp || inq.phone || '');
        const country = this.escapeHtml(inq.country || 'N/A');
        const rawDates = (inq.arrivalDate && inq.departureDate) ? `${inq.arrivalDate} to ${inq.departureDate}` : (inq.travel_dates || 'Flexible');
        const dates = this.escapeHtml(rawDates);
        const pax = this.escapeHtml(`${inq.totalPax || inq.travelers_count || 2} Pax`);
        const rooms = inq.roomsRequired ? this.escapeHtml(`${inq.roomsRequired} Rm`) : '';
        const hotels = this.escapeHtml(inq.hotelCategory || 'N/A');
        const rawBudget = inq.packageBudget && inq.packageBudget !== 'Custom' ? `${inq.currency || 'USD'} ${inq.packageBudget}` : (inq.budget_range || 'Custom');
        const budget = this.escapeHtml(rawBudget);
        const status = this.escapeHtml(inq.status || 'new');
        const dateReceived = this.formatDate(inq.createdAt || inq.timestamp || inq.created_at);

        if (isQuick) {
          return `
            <tr>
              <td><strong style="color: var(--lotus-primary); font-size: 0.82rem;">${refNo}</strong></td>
              <td>
                <strong>${name}</strong><br>
                <small style="color: var(--ink-muted);">${email} ${phone ? `| ${phone}` : ''}</small>
              </td>
              <td>${country}</td>
              <td>${dates}</td>
              <td>${pax}</td>
              <td>
                <select class="filter-select" style="padding: 3px 6px; font-size: 0.78rem;" onchange="AdminApp.updateInquiryStatus('${refAttr}', this.value)">
                  <option value="new" ${status === 'new' ? 'selected' : ''}>New</option>
                  <option value="contacted" ${status === 'contacted' ? 'selected' : ''}>Contacted</option>
                  <option value="customizing" ${status === 'customizing' ? 'selected' : ''}>Customizing</option>
                  <option value="confirmed" ${status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                  <option value="archived" ${status === 'archived' ? 'selected' : ''}>Archived</option>
                </select>
              </td>
              <td><small style="color: var(--ink-muted);">${dateReceived}</small></td>
              <td>
                <div class="action-btns">
                  <button class="btn-icon" title="View Details" onclick="AdminApp.viewInquiry('${refAttr}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  </button>
                  <button class="btn-icon delete" title="Delete Inquiry" onclick="AdminApp.deleteInquiry('${refAttr}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          `;
        } else {
          return `
            <tr>
              <td><strong style="color: var(--lotus-primary); font-size: 0.82rem;">${refNo}</strong></td>
              <td>
                <strong>${name}</strong><br>
                <small style="color: var(--ink-muted);">${email} ${phone ? `| ${phone}` : ''}</small>
              </td>
              <td>${country}</td>
              <td>${dates}</td>
              <td>${pax} ${rooms ? `<br><small style="color: var(--ink-muted);">${rooms}</small>` : ''}</td>
              <td>
                <small><strong>Hotels:</strong> ${hotels}</small><br>
                <small style="color: var(--sacred-gold);"><strong>Budget:</strong> ${budget}</small>
              </td>
              <td>
                <select class="filter-select" style="padding: 3px 6px; font-size: 0.78rem;" onchange="AdminApp.updateInquiryStatus('${refAttr}', this.value)">
                  <option value="new" ${status === 'new' ? 'selected' : ''}>New</option>
                  <option value="contacted" ${status === 'contacted' ? 'selected' : ''}>Contacted</option>
                  <option value="customizing" ${status === 'customizing' ? 'selected' : ''}>Customizing</option>
                  <option value="confirmed" ${status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                  <option value="archived" ${status === 'archived' ? 'selected' : ''}>Archived</option>
                </select>
              </td>
              <td><small style="color: var(--ink-muted);">${dateReceived}</small></td>
              <td>
                <div class="action-btns">
                  <button class="btn-icon" title="View Details" onclick="AdminApp.viewInquiry('${refAttr}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  </button>
                  <button class="btn-icon delete" title="Delete Inquiry" onclick="AdminApp.deleteInquiry('${refAttr}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }
      }).join('');"""
        code = code[:idx2] + new_filter_block + code[idx3 + len("}).join('');"):]
        print("2. filterInquiries sanitized.")

# 3. viewInquiry
idx_v1 = code.find("viewInquiry(refNo) {")
if idx_v1 != -1:
    idx_v2 = code.find("this.openModal('inquiryModal');", idx_v1)
    if idx_v2 != -1:
        # replace the body.innerHTML assignment inside viewInquiry
        idx_body = code.find("body.innerHTML = `", idx_v1)
        idx_body_end = code.find("`;", idx_body)
        if idx_body != -1 and idx_body < idx_v2 and idx_body_end != -1:
            new_body_block = """const cleanName = this.escapeHtml(inq.full_name || inq.fullName || 'Guest');
      const cleanCountry = this.escapeHtml(inq.country || 'N/A');
      const cleanEmail = this.escapeHtml(inq.email || inq.emailAddress || '');
      const cleanPhone = this.escapeHtml(inq.phone || inq.whatsapp || 'N/A');
      const cleanDates = this.escapeHtml(inq.travel_dates || inq.arrivalDate || 'Flexible');
      const cleanPax = this.escapeHtml(`${inq.travelers_count || inq.totalPax || 2} Pax`);
      const cleanPackage = this.escapeHtml(inq.package_type || inq.packageBudget || 'Bespoke Tour');
      const cleanBudget = this.escapeHtml(inq.budget_range || inq.packageBudget || 'Not specified');
      const cleanNotes = this.escapeHtml(inq.special_notes || inq.specialRequests || 'No special notes provided.');

      body.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Guest Name</label><div style="font-weight: 600;">${cleanName}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Country</label><div>${cleanCountry}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Email</label><div><a href="mailto:${cleanEmail}">${cleanEmail}</a></div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Phone / WhatsApp</label><div><a href="tel:${cleanPhone}">${cleanPhone}</a></div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Travel Dates</label><div>${cleanDates}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Travelers Count</label><div>${cleanPax}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Tour / Category</label><div>${cleanPackage}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Budget Range</label><div>${cleanBudget}</div></div>
        </div>
        <div style="margin-top: 14px; background: var(--ivory); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <label style="font-weight: 600; font-size: 0.85rem; color: var(--ink);">Guest Notes & Special Requests</label>
          <p style="margin-top: 6px; font-size: 0.9rem; line-height: 1.6; color: var(--ink-light); white-space: pre-wrap;">${cleanNotes}</p>
        </div>
      `;"""
            code = code[:idx_body] + new_body_block + code[idx_body_end + 2:]
            print("3. viewInquiry sanitized.")

# 4. renderReviews
idx_r1 = code.find("renderReviews() {")
if idx_r1 != -1:
    idx_r2 = code.find("tbody.innerHTML = this.reviews.map(r => {", idx_r1)
    idx_r3 = code.find("}).join('');", idx_r2)
    if idx_r2 != -1 and idx_r3 != -1:
        new_rev_block = """tbody.innerHTML = this.reviews.map(r => {
        const rawText = r.review_text && typeof r.review_text === 'object' ? r.review_text.en : (r.review_text || '');
        const text = this.escapeHtml(rawText);
        const name = this.escapeHtml(r.guest_name || 'Guest');
        const country = this.escapeHtml(r.country || 'International');
        const tour = this.escapeHtml(r.tour_taken || 'Custom Tour');
        const revId = this.escapeAttr(r.id || '');
        const avatar = r.avatar || 'assets/images/avatar-1.jpg';
        const rating = Math.max(1, Math.min(5, parseInt(r.rating || 5, 10)));

        return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <img src="${this.resolveImg(avatar)}" class="table-thumb" style="width:36px; height:36px; border-radius:50%;" onerror="this.src='../assets/images/logo.png'">
              <strong>${name}</strong>
            </div>
          </td>
          <td>${country}</td>
          <td style="color: #F57F17;">${'★'.repeat(rating)}</td>
          <td><small>${tour}</small></td>
          <td><small style="color: var(--ink-light);">${text ? (text.slice(0, 50) + '...') : '<em style="color:#94a3b8;">Empty placeholder</em>'}</small></td>
          <td>
            <span class="badge badge-success">✓ Verified</span>
          </td>
          <td>
            <span class="badge ${r.status !== 'draft' ? 'badge-success' : 'badge-warning'}">
              ${r.status !== 'draft' ? 'Published' : 'Hidden'}
            </span>
          </td>
          <td style="text-align: right;">
            <div class="action-btns" style="justify-content: flex-end; display: flex; gap: 6px;">
              <button class="btn btn-outline btn-sm" onclick="AdminApp.openReviewModal('${revId}')">Edit</button>
              <button class="btn-icon delete" title="Delete Review" onclick="AdminApp.deleteReview('${revId}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
      }).join('');"""
        code = code[:idx_r2] + new_rev_block + code[idx_r3 + len("}).join('');"):]
        print("4. renderReviews sanitized.")

# 5. renderTeam
idx_t1 = code.find("renderTeam() {")
if idx_t1 != -1:
    idx_t2 = code.find("tbody.innerHTML = this.team.map(member => {", idx_t1)
    idx_t3 = code.find("}).join('');", idx_t2)
    if idx_t2 != -1 and idx_t3 != -1:
        new_team_block = """tbody.innerHTML = this.team.map(member => {
        const photoUrl = member.photo ? (member.photo.url || member.photo.secure_url || '') : '';
        const flag = this.escapeHtml(member.flag || '🌐');
        const name = this.escapeHtml(member.name || '');
        const role = this.escapeHtml(member.role || '');
        const country = this.escapeHtml(member.country || '');
        const memberId = this.escapeAttr(member.id || '');

        return `
          <tr>
            <td>
              ${photoUrl ? `<img src="${this.resolveImg(photoUrl)}" alt="${name}" class="team-avatar-cell">` : `<div class="team-avatar-cell" style="background:#E2E8F0; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">${flag}</div>`}
            </td>
            <td><strong>${name}</strong></td>
            <td>${role}</td>
            <td><span>${flag}</span> ${country}</td>
            <td>${member.sortOrder || 1}</td>
            <td>
              <span class="badge ${member.published ? 'badge-success' : 'badge-secondary'}" style="cursor:pointer;" onclick="AdminApp.toggleTeamPublished('${memberId}')">
                ${member.published ? 'Published' : 'Draft'}
              </span>
            </td>
            <td>
              <div class="action-btns">
                <button class="btn-icon" title="Edit Member" onclick="AdminApp.openTeamModal('${memberId}')">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </button>
                <button class="btn-icon delete" title="Delete Member" onclick="AdminApp.deleteTeamMember('${memberId}')">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');"""
        code = code[:idx_t2] + new_team_block + code[idx_t3 + len("}).join('');"):]
        print("5. renderTeam sanitized.")

# 6. filterPackages
idx_p1 = code.find("filterPackages() {")
if idx_p1 != -1:
    idx_p2 = code.find("tbody.innerHTML = list.map(pkg => `", idx_p1)
    idx_p3 = code.find("`).join('');", idx_p2)
    if idx_p2 != -1 and idx_p3 != -1:
        new_pkg_block = """tbody.innerHTML = list.map(pkg => {
        const titleStr = pkg.title && typeof pkg.title === 'object' ? pkg.title.en : (pkg.title || '');
        const title = this.escapeHtml(titleStr);
        const slugAttr = this.escapeAttr(pkg.slug || '');
        const cat = this.escapeHtml(pkg.category_slug || 'General');
        const price = this.escapeHtml(String(pkg.price_from || 0));

        return `
        <tr>
          <td>
            <img src="${this.resolveImg(pkg.hero_image)}" class="table-thumb" alt="${title}" onerror="this.src='../assets/images/logo.png'">
          </td>
          <td>
            <strong>${title}</strong><br>
            <small style="color: var(--ink-muted);">Slug: /${this.escapeHtml(pkg.slug || '')}</small>
          </td>
          <td><span class="badge badge-info">${cat}</span></td>
          <td>${pkg.nights || 0}N / ${pkg.days || 0}D</td>
          <td><strong>$${price}</strong></td>
          <td>
            <span class="badge ${pkg.is_popular ? 'badge-success' : 'badge-secondary'}">
              ${pkg.is_popular ? 'Popular' : 'Standard'}
            </span>
          </td>
          <td>
            <label class="switch">
              <input type="checkbox" ${pkg.is_published ? 'checked' : ''} onchange="AdminApp.togglePublishPackage('${slugAttr}', this.checked)">
              <span class="slider"></span>
            </label>
          </td>
          <td style="text-align: right;">
            <div class="action-btns" style="justify-content: flex-end;">
              <button class="btn-icon" title="Edit Package" onclick="AdminApp.openPackageModal('${slugAttr}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              </button>
              <button class="btn-icon" title="Duplicate Package" onclick="AdminApp.duplicatePackage('${slugAttr}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
              </button>
              <button class="btn-icon delete" title="Delete Package" onclick="AdminApp.deletePackage('${slugAttr}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
      }).join('');"""
        code = code[:idx_p2] + new_pkg_block + code[idx_p3 + len("`).join('');"):]
        print("6. filterPackages sanitized.")

with open('admin/js/admin-app.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write(code)

print("Sanitization patch complete.")
