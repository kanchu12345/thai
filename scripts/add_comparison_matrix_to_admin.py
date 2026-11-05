import re

code_to_inject = '''
    // =========================================================================
    // PHASE 1: COMPARISON TABLE MATRIX EDITOR
    // =========================================================================

    currentCatComparison: null,
    currentCatSlug: '',
    comparisonTables: {},
    compPreviewViewport: 'desktop',

    switchCatModalTab(tab) {
      const btnGen = document.getElementById('catTabBtn-general');
      const btnComp = document.getElementById('catTabBtn-comparison');
      const paneGen = document.getElementById('catTabPane-general');
      const paneComp = document.getElementById('catTabPane-comparison');
      const dialog = document.getElementById('categoryModalDialog');

      if (tab === 'comparison') {
        if (btnGen) btnGen.classList.remove('active');
        if (btnComp) btnComp.classList.add('active');
        if (paneGen) paneGen.style.display = 'none';
        if (paneComp) paneComp.style.display = 'block';
        if (dialog) {
          dialog.style.maxWidth = '1180px';
          dialog.style.width = '95vw';
        }
        this.renderCatComparisonEditor();
      } else {
        if (btnComp) btnComp.classList.remove('active');
        if (btnGen) btnGen.classList.add('active');
        if (paneComp) paneComp.style.display = 'none';
        if (paneGen) paneGen.style.display = 'block';
        if (dialog) {
          dialog.style.maxWidth = '680px';
          dialog.style.width = '95vw';
        }
      }
    },

    switchPkgLangTab(btn, lang) {
      document.querySelectorAll('#packageModal .lang-tab-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');

      const paneEn = document.getElementById('pkgTab-en');
      const paneZh = document.getElementById('pkgTab-zh');
      const paneComp = document.getElementById('pkgTab-comparison');

      if (paneComp) paneComp.style.display = 'none';
      if (lang === 'zh') {
        if (paneEn) paneEn.style.display = 'none';
        if (paneZh) paneZh.style.display = 'block';
      } else {
        if (paneZh) paneZh.style.display = 'none';
        if (paneEn) paneEn.style.display = 'block';
      }
    },

    switchPkgTab(tab) {
      if (tab === 'comparison') {
        document.querySelectorAll('#packageModal .lang-tab-btn').forEach(b => b.classList.remove('active'));
        const btnComp = document.getElementById('pkgTabBtn-comp');
        if (btnComp) btnComp.classList.add('active');

        const paneEn = document.getElementById('pkgTab-en');
        const paneZh = document.getElementById('pkgTab-zh');
        const paneComp = document.getElementById('pkgTab-comparison');

        if (paneEn) paneEn.style.display = 'none';
        if (paneZh) paneZh.style.display = 'none';
        if (paneComp) paneComp.style.display = 'block';

        this.renderPackageComparisonTicks();
      }
    },

    initCatComparisonData(slug) {
      const cat = this.categories.find(c => c.slug === slug);
      let comp = (cat && cat.comparison) ? JSON.parse(JSON.stringify(cat.comparison)) : null;

      if (!comp && this.comparisonTables && this.comparisonTables[slug]) {
        comp = JSON.parse(JSON.stringify(this.comparisonTables[slug]));
      }

      const catPackages = (this.packages || []).filter(p => p.category === slug);
      const catPkgSlugs = catPackages.map(p => p.slug);

      if (!comp) {
        const catName = (slug || '').replace('-', ' ').replace(/\\b\\w/g, c => c.toUpperCase());
        comp = {
          title: `Comparison of Sri Lanka ${catName} Tour Packages by Destination and Highlights`,
          note: 'Itineraries are indicative and fully customisable.',
          packages: catPkgSlugs,
          groups: []
        };
      }

      if (!comp.packages || comp.packages.length === 0) {
        comp.packages = catPkgSlugs;
      }

      this.currentCatComparison = comp;
      this.currentCatSlug = slug;

      const titleInp = document.getElementById('compTableTitle');
      const noteInp = document.getElementById('compTableNote');
      if (titleInp) titleInp.value = comp.title || '';
      if (noteInp) noteInp.value = comp.note || '';
    },

    renderCatComparisonEditor() {
      if (!this.currentCatComparison) {
        const slug = document.getElementById('catSlug') ? document.getElementById('catSlug').value.trim() : '';
        this.initCatComparisonData(slug || 'cultural');
      }

      this.renderCompColumnsManager();
      this.renderCompMatrixGrid();
      this.checkCompValidation();
      if (document.getElementById('compLivePreviewContainer') && document.getElementById('compLivePreviewContainer').style.display !== 'none') {
        this.renderCompLivePreview();
      }
    },

    renderCompColumnsManager() {
      const wrap = document.getElementById('compColumnsWrap');
      if (!wrap) return;

      const comp = this.currentCatComparison;
      const catPackages = (this.packages || []).filter(p => p.category === this.currentCatSlug);

      wrap.innerHTML = catPackages.map((p, idx) => {
        const isIncluded = comp.packages.includes(p.slug);
        const nights = p.nights || 7;
        const days = p.days || (nights + 1);
        const title = typeof p.title === 'object' ? (p.title.en || p.slug) : (p.title || p.slug);

        return `
          <div style="display: inline-flex; align-items: center; gap: 8px; background: ${isIncluded ? '#EFF6FF' : '#F1F5F9'}; border: 1px solid ${isIncluded ? '#93C5FD' : '#CBD5E1'}; border-radius: 6px; padding: 6px 10px; font-size: 0.85rem;">
            <label style="display: flex; align-items: center; gap: 6px; margin: 0; cursor: pointer; font-weight: ${isIncluded ? '600' : '400'}; color: ${isIncluded ? '#1E3A8A' : '#64748B'};">
              <input type="checkbox" ${isIncluded ? 'checked' : ''} onchange="AdminApp.toggleCompPackageColumn('${p.slug}', this.checked)" />
              <span>${title} (${nights}N & ${days}D)</span>
            </label>
            ${isIncluded ? `
              <div style="display: flex; gap: 2px;">
                <button type="button" class="btn-icon" style="padding: 2px 4px; font-size: 0.75rem;" title="Move Left" onclick="AdminApp.moveCompPackageColumn('${p.slug}', -1)">◀</button>
                <button type="button" class="btn-icon" style="padding: 2px 4px; font-size: 0.75rem;" title="Move Right" onclick="AdminApp.moveCompPackageColumn('${p.slug}', 1)">▶</button>
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
    },

    toggleCompPackageColumn(slug, isIncluded) {
      const comp = this.currentCatComparison;
      if (!comp) return;

      if (isIncluded) {
        if (!comp.packages.includes(slug)) comp.packages.push(slug);
      } else {
        comp.packages = comp.packages.filter(s => s !== slug);
      }
      this.renderCatComparisonEditor();
    },

    moveCompPackageColumn(slug, dir) {
      const comp = this.currentCatComparison;
      if (!comp) return;

      const idx = comp.packages.indexOf(slug);
      if (idx === -1) return;
      const targetIdx = idx + dir;
      if (targetIdx < 0 || targetIdx >= comp.packages.length) return;

      comp.packages.splice(idx, 1);
      comp.packages.splice(targetIdx, 0, slug);
      this.renderCatComparisonEditor();
    },

    renderCompMatrixGrid() {
      const wrap = document.getElementById('compMatrixGridWrap');
      if (!wrap) return;

      const comp = this.currentCatComparison;
      const selectedPkgs = comp.packages.map(slug => {
        const found = (this.packages || []).find(p => p.slug === slug);
        return {
          slug: slug,
          title: found ? (typeof found.title === 'object' ? found.title.en : found.title) : slug,
          nights: found ? (found.nights || 7) : 7,
          days: found ? (found.days || 8) : 8
        };
      });

      if (selectedPkgs.length === 0) {
        wrap.innerHTML = `<div style="padding: 30px; text-align: center; color: #64748B;">No packages selected for this comparison table. Check at least one package above.</div>`;
        return;
      }

      let html = `
        <table class="data-table" style="width: 100%; border-collapse: collapse; min-width: 700px;">
          <thead>
            <tr style="background: #002B49; color: #FFFFFF;">
              <th style="padding: 12px 14px; text-align: left; width: 340px; position: sticky; left: 0; background: #002B49; z-index: 2;">
                Destinations & Highlights
              </th>
      `;

      selectedPkgs.forEach(p => {
        html += `
          <th style="padding: 10px 12px; text-align: center; font-size: 0.82rem; border-left: 1px solid rgba(255,255,255,0.15);">
            <div style="font-weight: 700;">${p.title}</div>
            <div style="color: #D4AF37; font-size: 0.76rem; font-weight: 600;">${p.nights}N & ${p.days}D</div>
          </th>
        `;
      });

      html += `
            </tr>
          </thead>
          <tbody>
      `;

      const groups = comp.groups || [];
      if (groups.length === 0) {
        html += `
          <tr>
            <td colspan="${selectedPkgs.length + 1}" style="text-align: center; padding: 30px; color: #64748B;">
              No destination groups defined yet. Click <strong>"+ Add Destination Group"</strong> or <strong>"⚡ Auto-generate from Routes"</strong> above.
            </td>
          </tr>
        `;
      }

      groups.forEach((group, gIdx) => {
        const manualTicks = group.manualTicks || {};
        const sights = group.sights || [];

        // Group Header Row
        html += `
          <tr style="background: #F1F5F9; border-top: 2px solid #CBD5E1; border-bottom: 1px solid #CBD5E1;">
            <td style="padding: 8px 12px; position: sticky; left: 0; background: #F1F5F9; z-index: 1;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 6px; flex: 1;">
                  <button type="button" class="btn-icon" title="Move Up" onclick="AdminApp.moveCompGroup('${group.id}', -1)" ${gIdx === 0 ? 'disabled' : ''}>▲</button>
                  <button type="button" class="btn-icon" title="Move Down" onclick="AdminApp.moveCompGroup('${group.id}', 1)" ${gIdx === groups.length - 1 ? 'disabled' : ''}>▼</button>
                  <input type="text" class="form-control form-control-sm" style="font-weight: 700; color: #002B49; width: 170px;" value="${this.escapeHtml(group.label)}" onchange="AdminApp.updateCompGroupLabel('${group.id}', this.value)" />
                </div>
                <div style="display: flex; gap: 4px;">
                  <button type="button" class="btn btn-xs btn-outline" onclick="AdminApp.addCompSight('${group.id}')">+ Sight</button>
                  <button type="button" class="btn-icon delete" title="Delete Group" onclick="AdminApp.deleteCompGroup('${group.id}')">🗑</button>
                </div>
              </div>
            </td>
        `;

        selectedPkgs.forEach(p => {
          let isChecked = false;
          let isManual = manualTicks[p.slug] !== undefined;

          if (isManual) {
            isChecked = Boolean(manualTicks[p.slug]);
          } else {
            isChecked = sights.some(s => (s.includedIn || []).includes(p.slug));
          }

          html += `
            <td style="text-align: center; padding: 6px; border-left: 1px solid #E2E8F0; background: ${isChecked ? '#F0FDF4' : '#F8FAFC'};">
              <label style="cursor: pointer; display: inline-flex; flex-direction: column; align-items: center; margin: 0;" title="${isManual ? 'Manual override (click to toggle)' : 'Derived from sights (click to override)'}">
                <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="AdminApp.toggleCompGroupManualTick('${group.id}', '${p.slug}')" />
                <span style="font-size: 0.65rem; color: ${isManual ? '#D97706' : '#16A34A'}; font-weight: 600;">
                  ${isManual ? 'Manual' : 'Auto'}
                </span>
              </label>
            </td>
          `;
        });

        html += `</tr>`;

        // Sights Subrows
        sights.forEach((sight, sIdx) => {
          const includedList = sight.includedIn || [];

          html += `
            <tr style="border-bottom: 1px solid #F1F5F9; background: #FFFFFF;">
              <td style="padding: 6px 12px 6px 32px; position: sticky; left: 0; background: #FFFFFF; z-index: 1;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px;">
                  <div style="display: flex; align-items: center; gap: 4px; flex: 1;">
                    <span style="color: #94A3B8; font-size: 0.75rem;">↳</span>
                    <input type="text" class="form-control form-control-sm" style="font-size: 0.82rem; width: 190px;" value="${this.escapeHtml(sight.label)}" onchange="AdminApp.updateCompSightLabel('${group.id}', '${sight.id}', this.value)" />
                  </div>
                  <div style="display: flex; gap: 2px;">
                    <button type="button" class="btn-icon" title="Duplicate Sight" onclick="AdminApp.duplicateCompSight('${group.id}', '${sight.id}')">📋</button>
                    <button type="button" class="btn-icon delete" title="Delete Sight" onclick="AdminApp.deleteCompSight('${group.id}', '${sight.id}')">✕</button>
                    <button type="button" class="btn-icon" title="Tick All Packages" onclick="AdminApp.tickAllRowSights('${group.id}', '${sight.id}')" style="font-size: 0.7rem; color: #16A34A;">All</button>
                    <button type="button" class="btn-icon" title="Clear Row" onclick="AdminApp.clearRowSights('${group.id}', '${sight.id}')" style="font-size: 0.7rem; color: #DC2626;">None</button>
                  </div>
                </div>
              </td>
          `;

          selectedPkgs.forEach(p => {
            const hasSight = includedList.includes(p.slug);
            html += `
              <td style="text-align: center; padding: 4px; border-left: 1px solid #F1F5F9; background: ${hasSight ? '#F0FDF4' : '#FFFFFF'};">
                <input type="checkbox" ${hasSight ? 'checked' : ''} onchange="AdminApp.toggleCompSightTick('${group.id}', '${sight.id}', '${p.slug}')" style="cursor: pointer; transform: scale(1.15);" />
              </td>
            `;
          });

          html += `</tr>`;
        });
      });

      html += `
          </tbody>
        </table>
      `;

      wrap.innerHTML = html;
    },

    addCompGroup(initialLabel = 'New Destination') {
      const comp = this.currentCatComparison;
      if (!comp) return;
      if (!comp.groups) comp.groups = [];

      const id = 'grp_' + Date.now();
      comp.groups.push({
        id: id,
        destinationId: id,
        label: initialLabel,
        order: comp.groups.length + 1,
        manualTicks: {},
        sights: [
          {
            id: 'sight_' + Date.now(),
            label: 'Key Landmark or Experience',
            order: 1,
            includedIn: (comp.packages || []).slice(0, 1)
          }
        ]
      });

      this.renderCatComparisonEditor();
    },

    deleteCompGroup(groupId) {
      if (!confirm('Are you sure you want to delete this entire destination group and its sights?')) return;
      const comp = this.currentCatComparison;
      if (!comp || !comp.groups) return;

      comp.groups = comp.groups.filter(g => g.id !== groupId);
      this.renderCatComparisonEditor();
    },

    updateCompGroupLabel(groupId, label) {
      const comp = this.currentCatComparison;
      if (!comp || !comp.groups) return;
      const group = comp.groups.find(g => g.id === groupId);
      if (group) group.label = label.trim();
      this.checkCompValidation();
    },

    moveCompGroup(groupId, dir) {
      const comp = this.currentCatComparison;
      if (!comp || !comp.groups) return;

      const idx = comp.groups.findIndex(g => g.id === groupId);
      if (idx === -1) return;
      const targetIdx = idx + dir;
      if (targetIdx < 0 || targetIdx >= comp.groups.length) return;

      const temp = comp.groups[idx];
      comp.groups[idx] = comp.groups[targetIdx];
      comp.groups[targetIdx] = temp;

      comp.groups.forEach((g, i) => { g.order = i + 1; });
      this.renderCatComparisonEditor();
    },

    addCompSight(groupId) {
      const comp = this.currentCatComparison;
      if (!comp || !comp.groups) return;
      const group = comp.groups.find(g => g.id === groupId);
      if (!group) return;
      if (!group.sights) group.sights = [];

      group.sights.push({
        id: 'sight_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        label: 'New Sight or Highlight',
        order: group.sights.length + 1,
        includedIn: (comp.packages || []).slice(0, 1)
      });

      this.renderCatComparisonEditor();
    },

    deleteCompSight(groupId, sightId) {
      const comp = this.currentCatComparison;
      if (!comp || !comp.groups) return;
      const group = comp.groups.find(g => g.id === groupId);
      if (!group || !group.sights) return;

      group.sights = group.sights.filter(s => s.id !== sightId);
      this.renderCatComparisonEditor();
    },

    duplicateCompSight(groupId, sightId) {
      const comp = this.currentCatComparison;
      if (!comp || !comp.groups) return;
      const group = comp.groups.find(g => g.id === groupId);
      if (!group || !group.sights) return;

      const sight = group.sights.find(s => s.id === sightId);
      if (!sight) return;

      const copy = JSON.parse(JSON.stringify(sight));
      copy.id = 'sight_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
      copy.label = copy.label + ' (Copy)';
      copy.order = group.sights.length + 1;

      group.sights.push(copy);
      this.renderCatComparisonEditor();
    },

    updateCompSightLabel(groupId, sightId, label) {
      const comp = this.currentCatComparison;
      if (!comp || !comp.groups) return;
      const group = comp.groups.find(g => g.id === groupId);
      if (!group || !group.sights) return;

      const sight = group.sights.find(s => s.id === sightId);
      if (sight) sight.label = label.trim();
      this.checkCompValidation();
    },

    toggleCompSightTick(groupId, sightId, pkgSlug) {
      const comp = this.currentCatComparison;
      if (!comp || !comp.groups) return;
      const group = comp.groups.find(g => g.id === groupId);
      if (!group || !group.sights) return;

      const sight = group.sights.find(s => s.id === sightId);
      if (!sight) return;

      if (!sight.includedIn) sight.includedIn = [];
      const idx = sight.includedIn.indexOf(pkgSlug);
      if (idx !== -1) {
        sight.includedIn.splice(idx, 1);
      } else {
        sight.includedIn.push(pkgSlug);
      }

      this.renderCatComparisonEditor();
    },

    toggleCompGroupManualTick(groupId, pkgSlug) {
      const comp = this.currentCatComparison;
      if (!comp || !comp.groups) return;
      const group = comp.groups.find(g => g.id === groupId);
      if (!group) return;

      if (!group.manualTicks) group.manualTicks = {};

      const currentManual = group.manualTicks[pkgSlug];
      if (currentManual === undefined) {
        // First click: invert current derived tick and mark manual
        const derived = (group.sights || []).some(s => (s.includedIn || []).includes(pkgSlug));
        group.manualTicks[pkgSlug] = !derived;
      } else if (currentManual === true) {
        group.manualTicks[pkgSlug] = false;
      } else {
        // Return to auto-derived
        delete group.manualTicks[pkgSlug];
      }

      this.renderCatComparisonEditor();
    },

    tickAllRowSights(groupId, sightId) {
      const comp = this.currentCatComparison;
      if (!comp || !comp.groups) return;
      const group = comp.groups.find(g => g.id === groupId);
      if (!group || !group.sights) return;
      const sight = group.sights.find(s => s.id === sightId);
      if (!sight) return;

      sight.includedIn = (comp.packages || []).slice();
      this.renderCatComparisonEditor();
    },

    clearRowSights(groupId, sightId) {
      const comp = this.currentCatComparison;
      if (!comp || !comp.groups) return;
      const group = comp.groups.find(g => g.id === groupId);
      if (!group || !group.sights) return;
      const sight = group.sights.find(s => s.id === sightId);
      if (!sight) return;

      sight.includedIn = [];
      this.renderCatComparisonEditor();
    },

    tickAllCompSights() {
      const comp = this.currentCatComparison;
      if (!comp || !comp.groups) return;
      const allPkgs = (comp.packages || []).slice();

      comp.groups.forEach(g => {
        (g.sights || []).forEach(s => {
          s.includedIn = allPkgs.slice();
        });
      });
      this.renderCatComparisonEditor();
    },

    clearAllCompTicks() {
      const comp = this.currentCatComparison;
      if (!comp || !comp.groups) return;

      comp.groups.forEach(g => {
        g.manualTicks = {};
        (g.sights || []).forEach(s => {
          s.includedIn = [];
        });
      });
      this.renderCatComparisonEditor();
    },

    autoGenerateCompFromRoutes() {
      const comp = this.currentCatComparison;
      if (!comp) return;

      const selectedPkgs = (this.packages || []).filter(p => comp.packages.includes(p.slug));
      if (selectedPkgs.length === 0) {
        alert('Please select at least one package column first.');
        return;
      }

      // Collect existing sights map: destinationLabel -> { sightLabel: [pkgSlugs] }
      const existingData = {};
      (comp.groups || []).forEach(g => {
        const destKey = g.label.toLowerCase().trim();
        existingData[destKey] = existingData[destKey] || {};
        (g.sights || []).forEach(s => {
          existingData[destKey][s.label] = (s.includedIn || []).slice();
        });
      });

      const newGroups = [];
      const seenDests = new Set();

      selectedPkgs.forEach(pkg => {
        const dests = pkg.destinations || [];
        dests.forEach(d => {
          const dName = (typeof d === 'string' ? d : d.name) || 'Dest';
          const cleanName = dName.trim();
          const dKey = cleanName.toLowerCase();

          if (!seenDests.has(dKey)) {
            seenDests.add(dKey);
            const preservedSights = existingData[dKey] || {};
            const sightList = [];

            // Add activities from destination definition
            const activities = (typeof d === 'object' && d.activities) ? d.activities : [];
            activities.forEach(act => {
              const actName = String(act).trim();
              const existingTicks = preservedSights[actName] || [];
              if (!existingTicks.includes(pkg.slug)) existingTicks.push(pkg.slug);

              sightList.push({
                id: 'sight_' + Date.now() + '_' + Math.floor(Math.random() * 10000),
                label: actName,
                order: sightList.length + 1,
                includedIn: existingTicks
              });
              delete preservedSights[actName];
            });

            // Preserve any custom sights previously entered for this destination
            Object.keys(preservedSights).forEach(customLabel => {
              sightList.push({
                id: 'sight_' + Date.now() + '_' + Math.floor(Math.random() * 10000),
                label: customLabel,
                order: sightList.length + 1,
                includedIn: preservedSights[customLabel]
              });
            });

            if (sightList.length === 0) {
              sightList.push({
                id: 'sight_' + Date.now() + '_' + Math.floor(Math.random() * 10000),
                label: cleanName + ' Highlights',
                order: 1,
                includedIn: [pkg.slug]
              });
            }

            newGroups.push({
              id: 'grp_' + dKey.replace(/[^a-z0-9]+/g, '-'),
              destinationId: dKey.replace(/[^a-z0-9]+/g, '-'),
              label: cleanName,
              order: newGroups.length + 1,
              manualTicks: {},
              sights: sightList
            });
          }
        });
      });

      if (newGroups.length > 0) {
        comp.groups = newGroups;
        this.renderCatComparisonEditor();
        this.showToast(`Auto-generated ${newGroups.length} destination groups from routes with existing ticks preserved!`, 'success');
      } else {
        alert('No route destinations found on the selected packages to generate from.');
      }
    },

    checkCompValidation() {
      const box = document.getElementById('compValidationBox');
      if (!box) return;

      const comp = this.currentCatComparison;
      if (!comp) {
        box.style.display = 'none';
        return;
      }

      const warnings = [];
      const selectedPkgs = (this.packages || []).filter(p => comp.packages.includes(p.slug));
      const sightLabels = new Set();

      // Check empty groups and duplicate sights
      (comp.groups || []).forEach(g => {
        if (!g.sights || g.sights.length === 0) {
          warnings.push(`Destination group "<strong>${g.label}</strong>" is empty and has no sights.`);
        }
        (g.sights || []).forEach(s => {
          const l = s.label.trim().toLowerCase();
          if (l) {
            if (sightLabels.has(l)) {
              warnings.push(`Duplicate sight label detected: "<strong>${s.label}</strong>".`);
            } else {
              sightLabels.add(l);
            }
          }
        });
      });

      // Check packages with no ticks
      selectedPkgs.forEach(p => {
        let tickCount = 0;
        (comp.groups || []).forEach(g => {
          (g.sights || []).forEach(s => {
            if ((s.includedIn || []).includes(p.slug)) tickCount++;
          });
        });
        if (tickCount === 0) {
          warnings.push(`Package "<strong>${p.title}</strong>" has 0 ticked sights in this table.`);
        }
      });

      if (warnings.length > 0) {
        box.style.display = 'block';
        box.style.background = '#FFFBEB';
        box.style.border = '1px solid #FDE68A';
        box.style.color = '#B45309';
        box.innerHTML = `
          <div style="font-weight: 700; margin-bottom: 4px;">⚠️ Table Validation Notices (${warnings.length}):</div>
          <ul style="margin: 0; padding-left: 18px; line-height: 1.5;">
            ${warnings.map(w => `<li>${w}</li>`).join('')}
          </ul>
        `;
      } else {
        box.style.display = 'block';
        box.style.background = '#F0FDF4';
        box.style.border = '1px solid #BBF7D0';
        box.style.color = '#15803D';
        box.innerHTML = `✓ Table validation passed: All groups have sights, packages have coverage, and routes align.`;
      }
    },

    toggleCompLivePreview() {
      const container = document.getElementById('compLivePreviewContainer');
      if (!container) return;
      const isHidden = container.style.display === 'none';
      container.style.display = isHidden ? 'block' : 'none';
      if (isHidden) this.renderCompLivePreview();
    },

    setCompPreviewViewport(vp) {
      this.compPreviewViewport = vp;
      const btnDesk = document.getElementById('btnCompPrevDesktop');
      const btnMob = document.getElementById('btnCompPrevMobile');
      const wrap = document.getElementById('compLivePreviewWrapper');

      if (vp === 'mobile') {
        if (btnDesk) btnDesk.classList.remove('active');
        if (btnMob) btnMob.classList.add('active');
        if (wrap) {
          wrap.style.maxWidth = '390px';
          wrap.style.margin = '0 auto';
          wrap.style.border = '2px solid #002B49';
        }
      } else {
        if (btnMob) btnMob.classList.remove('active');
        if (btnDesk) btnDesk.classList.add('active');
        if (wrap) {
          wrap.style.maxWidth = '100%';
          wrap.style.margin = '0';
          wrap.style.border = 'none';
        }
      }
      this.renderCompLivePreview();
    },

    renderCompLivePreview() {
      const wrap = document.getElementById('compLivePreviewWrapper');
      if (!wrap || !this.currentCatComparison) return;

      const comp = this.currentCatComparison;
      const selectedPkgs = comp.packages.map(slug => {
        const found = (this.packages || []).find(p => p.slug === slug);
        return {
          slug: slug,
          title: found ? (typeof found.title === 'object' ? found.title.en : found.title) : slug,
          nights: found ? (found.nights || 7) : 7,
          days: found ? (found.days || 8) : 8
        };
      });

      let html = `
        <div style="padding: 16px; font-family: inherit;">
          <div style="text-align: center; margin-bottom: 16px;">
            <div style="font-size: 0.75rem; letter-spacing: 0.1em; color: #D4AF37; font-weight: 700;">✦ SIDE-BY-SIDE ITINERARY COMPARISON</div>
            <h3 style="margin: 4px 0 6px; font-family: 'Cinzel', serif; color: #002B49; font-size: 1.15rem;">${this.escapeHtml(comp.title || '')}</h3>
            <p style="margin: 0; font-size: 0.82rem; color: #64748B;">${this.escapeHtml(comp.note || '')}</p>
          </div>
          <div style="overflow-x: auto;">
            <table class="lotus-comparison-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
              <thead>
                <tr style="background: #F8FAFC; border-bottom: 2px solid #002B49;">
                  <th style="padding: 10px; text-align: left; font-weight: 700; color: #002B49;">Destinations & Highlights</th>
      `;

      selectedPkgs.forEach(p => {
        html += `
          <th style="padding: 10px; text-align: center; border-left: 1px solid #E2E8F0;">
            <div style="font-weight: 700; color: #002B49;">${p.title}</div>
            <span style="display: inline-block; font-size: 0.75rem; color: #C4984F; font-weight: 600;">${p.nights}N & ${p.days}D</span>
          </th>
        `;
      });

      html += `</tr></thead><tbody>`;

      (comp.groups || []).forEach(g => {
        const manualTicks = g.manualTicks || {};
        const sights = g.sights || [];

        html += `
          <tr style="background: #F1F5F9; font-weight: 700; border-top: 1px solid #CBD5E1;">
            <td style="padding: 8px 10px; color: #002B49;"><strong>${this.escapeHtml(g.label)}</strong></td>
        `;

        selectedPkgs.forEach(p => {
          let isChecked = manualTicks[p.slug] !== undefined ? Boolean(manualTicks[p.slug]) : sights.some(s => (s.includedIn || []).includes(p.slug));
          html += `<td style="text-align: center; padding: 8px; border-left: 1px solid #E2E8F0; color: #16A34A; font-size: 1.05rem;">${isChecked ? '✓' : ''}</td>`;
        });

        html += `</tr>`;

        sights.forEach(s => {
          html += `
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 6px 10px 6px 24px; color: #334155;">${this.escapeHtml(s.label)}</td>
          `;

          selectedPkgs.forEach(p => {
            const hasSight = (s.includedIn || []).includes(p.slug);
            html += `<td style="text-align: center; padding: 6px; border-left: 1px solid #F1F5F9; color: #16A34A; font-weight: bold;">${hasSight ? '✓' : ''}</td>`;
          });

          html += `</tr>`;
        });
      });

      html += `</tbody></table></div></div>`;
      wrap.innerHTML = html;
    },

    renderPackageComparisonTicks() {
      const wrap = document.getElementById('pkgComparisonTicksWrap');
      if (!wrap) return;

      const slugInp = document.getElementById('pkgSlug');
      const catInp = document.getElementById('pkgCategory');
      const pkgSlug = slugInp ? slugInp.value.trim() : '';
      const catSlug = catInp ? catInp.value.trim() : '';

      if (!catSlug) {
        wrap.innerHTML = `<div style="padding: 20px; text-align: center; color: #64748B;">Please select a category for this package first.</div>`;
        return;
      }

      const cat = this.categories.find(c => c.slug === catSlug);
      let comp = (cat && cat.comparison) || (this.comparisonTables && this.comparisonTables[catSlug]);

      if (!comp || !comp.groups || comp.groups.length === 0) {
        wrap.innerHTML = `<div style="padding: 20px; text-align: center; color: #64748B;">No comparison table defined for category "${catSlug}" yet. Open Categories to create one.</div>`;
        return;
      }

      let html = `<div style="display: flex; flex-direction: column; gap: 14px;">`;

      comp.groups.forEach(group => {
        html += `
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 10px 14px;">
            <div style="font-weight: 700; color: #002B49; margin-bottom: 8px; font-size: 0.92rem;">
              📍 ${this.escapeHtml(group.label)}
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 8px;">
        `;

        (group.sights || []).forEach(sight => {
          const isTicked = (sight.includedIn || []).includes(pkgSlug);
          html += `
            <label style="display: flex; align-items: center; gap: 8px; margin: 0; padding: 6px 10px; background: ${isTicked ? '#F0FDF4' : '#FFFFFF'}; border: 1px solid ${isTicked ? '#86EFAC' : '#E2E8F0'}; border-radius: 4px; font-size: 0.82rem; cursor: pointer;">
              <input type="checkbox" ${isTicked ? 'checked' : ''} onchange="AdminApp.togglePkgSightCheck('${catSlug}', '${group.id}', '${sight.id}', this.checked)" />
              <span style="color: ${isTicked ? '#166534' : '#334155'}; font-weight: ${isTicked ? '600' : '400'};">${this.escapeHtml(sight.label)}</span>
            </label>
          `;
        });

        html += `</div></div>`;
      });

      html += `</div>`;
      wrap.innerHTML = html;
    },

    togglePkgSightCheck(catSlug, groupId, sightId, isChecked) {
      const slugInp = document.getElementById('pkgSlug');
      const pkgSlug = slugInp ? slugInp.value.trim() : '';
      if (!pkgSlug) return;

      const cat = this.categories.find(c => c.slug === catSlug);
      let comp = (cat && cat.comparison) || (this.comparisonTables && this.comparisonTables[catSlug]);
      if (!comp || !comp.groups) return;

      const group = comp.groups.find(g => g.id === groupId);
      if (!group || !group.sights) return;

      const sight = group.sights.find(s => s.id === sightId);
      if (!sight) return;

      if (!sight.includedIn) sight.includedIn = [];
      if (isChecked) {
        if (!sight.includedIn.includes(pkgSlug)) sight.includedIn.push(pkgSlug);
      } else {
        sight.includedIn = sight.includedIn.filter(s => s !== pkgSlug);
      }

      if (cat) cat.comparison = comp;
      if (this.comparisonTables) this.comparisonTables[catSlug] = comp;

      this.renderPackageComparisonTicks();
    },
'''

with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# 1. Update openCategoryModal to initialize comparison data and reset tab to general
old_open_cat = """    openCategoryModal(editSlug = null) {
      const form = document.getElementById('categoryForm');
      if (!form) return;
      form.reset();
      const titleEl = document.getElementById('categoryModalTitle');"""

new_open_cat = """    openCategoryModal(editSlug = null) {
      const form = document.getElementById('categoryForm');
      if (!form) return;
      form.reset();
      this.switchCatModalTab('general');
      const titleEl = document.getElementById('categoryModalTitle');"""

if old_open_cat in js_content:
    js_content = js_content.replace(old_open_cat, new_open_cat)
    print("Updated openCategoryModal start")
else:
    # try normalized whitespace
    print("Warning: old_open_cat exact match not found, looking with regex")
    js_content = re.sub(r'openCategoryModal\s*\(\s*editSlug\s*=\s*null\s*\)\s*\{\s*const form = document\.getElementById\(\'categoryForm\'\);\s*if\s*\(!form\)\s*return;\s*form\.reset\(\);',
                        'openCategoryModal(editSlug = null) {\n      const form = document.getElementById(\'categoryForm\');\n      if (!form) return;\n      form.reset();\n      this.switchCatModalTab(\'general\');',
                        js_content)

# 2. Inside openCategoryModal, after populating fields, call this.initCatComparisonData(cat.slug)
js_content = re.sub(r'this\.updateImagePreview\(\'catHeroImage\',\s*\'catHeroPreview\',\s*\'catHeroPreviewCard\'\);\s*\}\s*else\s*\{',
                    'this.updateImagePreview(\'catHeroImage\', \'catHeroPreview\', \'catHeroPreviewCard\');\n        this.initCatComparisonData(cat.slug);\n      } else {',
                    js_content)

# 3. Inside saveCategory, collect comparison data and add to payload
save_cat_target = 'const payload = {'
save_cat_replacement = '''if (this.currentCatComparison) {
        const titleInp = document.getElementById('compTableTitle');
        const noteInp = document.getElementById('compTableNote');
        if (titleInp && titleInp.value) this.currentCatComparison.title = titleInp.value.trim();
        if (noteInp) this.currentCatComparison.note = noteInp.value.trim();
      }

      const payload = {
        comparison: this.currentCatComparison || null,'''

if save_cat_target in js_content:
    # only replace the first occurrence inside saveCategory
    pos = js_content.find('async saveCategory(')
    if pos != -1:
        target_pos = js_content.find(save_cat_target, pos)
        if target_pos != -1:
            js_content = js_content[:target_pos] + save_cat_replacement + js_content[target_pos + len(save_cat_target):]
            print("Updated saveCategory to attach comparison payload")

# 4. Inject the new methods right before renderDestinations()
inject_target = 'renderDestinations() {'
if inject_target in js_content:
    js_content = js_content.replace(inject_target, code_to_inject + '\n    ' + inject_target)
    print("Injected Comparison Matrix methods into AdminApp!")

with open('admin/js/admin-app.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Saved admin/js/admin-app.js successfully!")
