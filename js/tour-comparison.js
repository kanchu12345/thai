/**
 * Lotus Ceylon - Dynamic Tour Package Comparison Component
 * 100% original, accessible, responsive comparison table matching real package destinations & sights.
 */

(function() {
  'use strict';

  // Geographic route sequence across Sri Lanka
  const CEYLON_GEO_ORDER = [
    'colombo', 'negombo', 'kalpitiya', 'mannar', 'wilpattu', 'jaffna',
    'pinnawala', 'anuradhapura', 'dambulla', 'sigiriya', 'cultural triangle',
    'polonnaruwa', 'habarana', 'minneriya', 'kitulgala', 'knuckles', 'kandy',
    'horton plains', 'hatton', 'tea trails', "adam's peak", 'nuwara eliya',
    'scenic train', 'bandarawela', 'haputale', 'ella', 'udawalawe', 'gal oya',
    'sinharaja', 'kumana', 'yala', 'kataragama', 'hambantota', 'tangalle',
    'mirissa', 'weligama', 'unawatuna', 'galle', 'bentota', 'wadduwa',
    'arugam bay', 'pasikudah', 'trincomalee', 'nilaveli', 'pigeon island'
  ];

  function getGeoRank(name) {
    const n = (name || '').toLowerCase();
    for (let i = 0; i < CEYLON_GEO_ORDER.length; i++) {
      if (n.includes(CEYLON_GEO_ORDER[i]) || CEYLON_GEO_ORDER[i].includes(n)) {
        return i;
      }
    }
    return 999;
  }

  class LotusTourComparison {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.getElementById(container) : container;
      if (!this.container) return;

      this.options = options;
      this.category = options.category || this.container.dataset.category;
      this.dataPath = options.dataPath || this.container.dataset.dataPath || 'data/packages.json';
      this.isSubfolder = options.isSubfolder || this.container.dataset.subfolder === 'true';

      if (this.category) {
        this.init();
      }
    }

    async init() {
      try {
        let data;
        if (window.LotusFirebase && typeof window.LotusFirebase.getCatalog === 'function') {
          data = await window.LotusFirebase.getCatalog(this.dataPath);
        } else {
          const res = await fetch(this.dataPath);
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          data = await res.json();
        }

        const packages = (data.packages || []).filter(p => p.category === this.category);
        if (packages.length === 0) return;

        this.render(packages);
      } catch (err) {
        console.warn('LotusTourComparison: Could not refresh dynamic table data:', err);
      }
    }

    render(packages) {
      const destMap = {};
      packages.forEach(p => {
        (p.destinations || []).forEach(d => {
          const dName = (d.name || '').trim();
          if (!destMap[dName]) {
            destMap[dName] = {
              name: dName,
              activities: {},
              pkgIds: new Set()
            };
          }
          destMap[dName].pkgIds.add(p.id);

          (d.activities || []).forEach(act => {
            const actName = (act || '').trim();
            if (!destMap[dName].activities[actName]) {
              destMap[dName].activities[actName] = new Set();
            }
            destMap[dName].activities[actName].add(p.id);
          });
        });
      });

      const sortedDests = Object.keys(destMap).sort((a, b) => getGeoRank(a) - getGeoRank(b));
      const prefix = this.isSubfolder ? '../' : '';
      const catName = (this.category || '').replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());

      let html = `
        <div class="comparison-compact-wrapper">
          <div class="comparison-intro-header text-center">
            <span class="comparison-eyebrow">✦ SIDE-BY-SIDE ITINERARY COMPARISON</span>
            <h2 class="comparison-title">Compare Destinations &amp; Sights</h2>
            <p class="comparison-subtitle">
              Review how each ${catName} itinerary traverses Sri Lanka’s iconic destinations, cultural landmarks, and nature reserves.
            </p>
          </div>

          <div class="lotus-table-responsive" tabindex="0" role="region" aria-label="${catName} Package Comparison Table">
            <table class="lotus-comparison-table">
              <caption class="visually-hidden">Comparison of Sri Lanka ${catName} Tour Packages by Destination and Highlights</caption>
              <thead>
                <tr>
                  <th scope="col" class="dest-col-header">Destinations &amp; Key Sights</th>
      `;

      packages.forEach(p => {
        const pkgHref = this.isSubfolder ? `${p.slug}/index.html` : `tours/${this.category}/${p.slug}/index.html`;
        html += `
          <th scope="col" class="comparison-pkg-header">
            <a href="${pkgHref}" class="comparison-pkg-link">${p.title}</a>
            <span class="comparison-pkg-nights">${p.nights}N &amp; ${p.days}D</span>
          </th>
        `;
      });

      html += `
                </tr>
              </thead>
              <tbody>
      `;

      sortedDests.forEach(dName => {
        const dInfo = destMap[dName];
        html += `
          <tr class="destination-row">
            <th scope="row" class="destination-name-cell"><strong>${dName}</strong></th>
        `;
        packages.forEach(p => {
          if (dInfo.pkgIds.has(p.id)) {
            html += `<td class="comparison-cell check-cell" aria-label="Included in ${p.title} (${dName})">✓</td>`;
          } else {
            html += `<td class="comparison-cell empty-cell" aria-label="Not included in ${p.title} (${dName})"></td>`;
          }
        });
        html += `</tr>`;

        Object.keys(dInfo.activities).forEach(actName => {
          const actPkgIds = dInfo.activities[actName];
          html += `
            <tr class="activity-subrow">
              <td class="activity-name-cell">${actName}</td>
          `;
          packages.forEach(p => {
            if (actPkgIds.has(p.id)) {
              html += `<td class="comparison-cell check-cell sub-check" aria-label="Included in ${p.title}: ${actName}">✓</td>`;
            } else {
              html += `<td class="comparison-cell empty-cell" aria-label="Not included in ${p.title}: ${actName}"></td>`;
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
  }

  // Auto-initialize if target container is marked
  document.addEventListener('DOMContentLoaded', () => {
    const dynWrappers = document.querySelectorAll('.js-lotus-comparison');
    dynWrappers.forEach(el => {
      new LotusTourComparison(el);
    });
  });

  window.LotusTourComparison = LotusTourComparison;
})();
