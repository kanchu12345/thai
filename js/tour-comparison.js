/**
 * Lotus Ceylon - Dynamic Tour Package Comparison Component (Phase 1)
 * 100% data-driven comparison matrix with Firestore & CMS support,
 * ordered routes, destination groups, sub-activity sights, and language translations.
 */

(function () {
  'use strict';

  class LotusTourComparison {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.getElementById(container) : container;
      if (!this.container) return;

      this.options = options;
      this.category = options.category || this.container.dataset.category;
      this.isSubfolder = options.isSubfolder || this.container.dataset.subfolder === 'true';
      this.dataPath = options.dataPath || this.container.dataset.dataPath || (this.isSubfolder ? '../../data/packages.json' : 'data/packages.json');
      this.comparisonPath = options.comparisonPath || this.container.dataset.comparisonPath || (this.isSubfolder ? '../../data/comparison_tables.json' : 'data/comparison_tables.json');

      if (this.category) {
        this.init();
      }

      // Listen for CMS preview/publish updates
      window.addEventListener('message', (e) => {
        if (e.data && (e.data.type === 'lotus:comparison-updated' || e.data.type === 'lotus:cms-update')) {
          this.init();
        }
      });
      window.addEventListener('storage', (e) => {
        if (e.key && e.key.includes('lotus_cms_published')) {
          this.init();
        }
      });
    }

    async init() {
      try {
        let pkgCatalog = null;
        let compCatalog = null;

        // 1. Try local storage instant published cache
        try {
          const cachedCat = localStorage.getItem(`lotus_cms_published_tourCategories/${this.category}`);
          if (cachedCat) {
            const parsed = JSON.parse(cachedCat);
            if (parsed && parsed.comparison) {
              compCatalog = { [this.category]: parsed.comparison };
            }
          }
        } catch (e) {}

        // 2. Fetch packages catalog
        if (window.LotusFirebase && typeof window.LotusFirebase.getCatalog === 'function') {
          pkgCatalog = await window.LotusFirebase.getCatalog(this.dataPath);
        } else {
          const res = await fetch(this.dataPath);
          if (res.ok) pkgCatalog = await res.json();
        }

        // 3. Fetch comparison catalog if not yet loaded from cache
        if (!compCatalog) {
          try {
            const cRes = await fetch(this.comparisonPath);
            if (cRes.ok) compCatalog = await cRes.json();
          } catch (e) {}
        }

        const catPackages = (pkgCatalog && pkgCatalog.packages ? pkgCatalog.packages : []).filter(p => p.category === this.category);
        const pkgMap = {};
        catPackages.forEach(p => { pkgMap[p.slug] = p; });

        // Retrieve comparison spec for this category
        let compData = compCatalog ? compCatalog[this.category] : null;
        if (!compData && pkgCatalog && pkgCatalog.categories && pkgCatalog.categories[this.category]) {
          compData = pkgCatalog.categories[this.category].comparison;
        }

        if (compData) {
          this.renderStructured(compData, pkgMap);
        } else if (catPackages.length > 0) {
          this.renderFallback(catPackages);
        }
      } catch (err) {
        console.warn('LotusTourComparison: Could not refresh comparison table:', err);
      }
    }

    renderStructured(compData, pkgMap) {
      const catName = (this.category || '').replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());
      const title = compData.title || `Compare Sri Lanka ${catName} Tour Packages`;
      const note = compData.note || 'Review how each itinerary traverses Sri Lanka\'s iconic destinations, cultural landmarks, and nature reserves.';
      const packagesList = compData.packages || [];

      // Resolve package objects
      const columns = packagesList.map(slug => {
        const found = pkgMap[slug] || { slug: slug, title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), nights: 7, days: 8 };
        const titleStr = typeof found.title === 'object' ? (found.title.en || found.slug) : (found.title || found.slug);
        const nights = found.nights || 7;
        const days = found.days || (nights + 1);
        return {
          slug: found.slug,
          title: titleStr,
          nights: nights,
          days: days
        };
      });

      let html = `
        <div class="comparison-compact-wrapper">
          <div class="comparison-intro-header text-center">
            <span class="comparison-eyebrow">✦ SIDE-BY-SIDE ITINERARY COMPARISON</span>
            <h2 class="comparison-title">${this.escapeHtml(title)}</h2>
            <p class="comparison-subtitle">${this.escapeHtml(note)}</p>
          </div>

          <div class="lotus-table-responsive" tabindex="0" role="region" aria-label="${catName} Package Comparison Table">
            <table class="lotus-comparison-table">
              <caption class="visually-hidden">${this.escapeHtml(title)}</caption>
              <thead>
                <tr>
                  <th scope="col" class="dest-col-header">Destinations &amp; Key Sights</th>
      `;

      columns.forEach(p => {
        const pkgHref = this.isSubfolder ? `${p.slug}/index.html` : `tours/${this.category}/${p.slug}/index.html`;
        html += `
          <th scope="col" class="comparison-pkg-header">
            <a href="${pkgHref}" class="comparison-pkg-link">${this.escapeHtml(p.title)}</a>
            <span class="comparison-pkg-nights">${p.nights}N &amp; ${p.days}D</span>
          </th>
        `;
      });

      html += `
                </tr>
              </thead>
              <tbody>
      `;

      const groups = (compData.groups || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));

      groups.forEach(group => {
        const manualTicks = group.manualTicks || {};
        const sights = (group.sights || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));

        // Group Header Row
        html += `
          <tr class="destination-row">
            <th scope="row" class="destination-name-cell"><strong>${this.escapeHtml(group.label)}</strong></th>
        `;

        columns.forEach(p => {
          // Derived check or manual override
          let isChecked = false;
          if (manualTicks[p.slug] !== undefined) {
            isChecked = Boolean(manualTicks[p.slug]);
          } else {
            isChecked = sights.some(s => (s.includedIn || []).includes(p.slug));
          }

          if (isChecked) {
            html += `<td class="comparison-cell check-cell" aria-label="Included in ${this.escapeHtml(p.title)} (${this.escapeHtml(group.label)})">✓</td>`;
          } else {
            html += `<td class="comparison-cell empty-cell" aria-label="Not included in ${this.escapeHtml(p.title)} (${this.escapeHtml(group.label)})"></td>`;
          }
        });

        html += `</tr>`;

        // Sights Subrows
        sights.forEach(sight => {
          const includedList = sight.includedIn || [];
          html += `
            <tr class="activity-subrow">
              <td class="activity-name-cell">${this.escapeHtml(sight.label)}</td>
          `;

          columns.forEach(p => {
            const hasSight = includedList.includes(p.slug);
            if (hasSight) {
              html += `<td class="comparison-cell check-cell sub-check" aria-label="Included in ${this.escapeHtml(p.title)}: ${this.escapeHtml(sight.label)}">✓</td>`;
            } else {
              html += `<td class="comparison-cell empty-cell" aria-label="Not included in ${this.escapeHtml(p.title)}: ${this.escapeHtml(sight.label)}"></td>`;
            }
          });

          html += `</tr>`;
        });
      });

      html += `
              </tbody>
            </table>
          </div>
        </div>
      `;

      this.container.innerHTML = html;
    }

    renderFallback(packages) {
      // Fallback renderer if no structured comparison groups exist
      const destMap = {};
      packages.forEach(p => {
        (p.destinations || []).forEach(d => {
          const dName = (d.name || '').trim();
          if (!destMap[dName]) {
            destMap[dName] = { name: dName, activities: {}, pkgIds: new Set() };
          }
          destMap[dName].pkgIds.add(p.slug);
          (d.activities || []).forEach(act => {
            const actName = (act || '').trim();
            if (!destMap[dName].activities[actName]) {
              destMap[dName].activities[actName] = new Set();
            }
            destMap[dName].activities[actName].add(p.slug);
          });
        });
      });

      const catName = (this.category || '').replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());
      let html = `
        <div class="comparison-compact-wrapper">
          <div class="comparison-intro-header text-center">
            <span class="comparison-eyebrow">✦ SIDE-BY-SIDE ITINERARY COMPARISON</span>
            <h2 class="comparison-title">Compare Destinations &amp; Sights</h2>
            <p class="comparison-subtitle">Review how each ${catName} itinerary traverses Sri Lanka's iconic destinations.</p>
          </div>
          <div class="lotus-table-responsive" tabindex="0" role="region">
            <table class="lotus-comparison-table">
              <thead><tr><th scope="col" class="dest-col-header">Destinations &amp; Key Sights</th>
      `;
      packages.forEach(p => {
        const pkgHref = this.isSubfolder ? `${p.slug}/index.html` : `tours/${this.category}/${p.slug}/index.html`;
        html += `<th scope="col" class="comparison-pkg-header"><a href="${pkgHref}" class="comparison-pkg-link">${p.title}</a><span class="comparison-pkg-nights">${p.nights}N &amp; ${p.days}D</span></th>`;
      });
      html += `</tr></thead><tbody>`;

      Object.keys(destMap).forEach(dName => {
        const dInfo = destMap[dName];
        html += `<tr class="destination-row"><th scope="row" class="destination-name-cell"><strong>${dName}</strong></th>`;
        packages.forEach(p => {
          html += dInfo.pkgIds.has(p.slug) ? `<td class="comparison-cell check-cell">✓</td>` : `<td class="comparison-cell empty-cell"></td>`;
        });
        html += `</tr>`;
      });

      html += `</tbody></table></div></div>`;
      this.container.innerHTML = html;
    }

    escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
  }

  // Auto-initialize on all marked comparison wrappers
  document.addEventListener('DOMContentLoaded', () => {
    const dynWrappers = document.querySelectorAll('.js-lotus-comparison');
    dynWrappers.forEach(el => {
      new LotusTourComparison(el);
    });
  });

  window.LotusTourComparison = LotusTourComparison;
})();
