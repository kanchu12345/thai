/**
 * Lotus Ceylon - Interactive Leaflet & OpenStreetMap Tour Route Map
 * Privacy-first, locally vendored Leaflet, accessible, responsive & lazy-loaded.
 */

(function() {
  'use strict';

  const DEFAULT_CENTER = [7.879, 80.767];
  const DEFAULT_ZOOM = 8;
  const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';

  // Palette for multi-package category routes
  const ROUTE_COLORS = [
    { name: 'Gold', stroke: '#C9962B', fill: '#F2C14E' },
    { name: 'Teal', stroke: '#1F8A8A', fill: '#3AB0B0' },
    { name: 'Navy', stroke: '#002B49', fill: '#00477A' },
    { name: 'Brown', stroke: '#3B2A14', fill: '#6B4F29' }
  ];

  class LotusTourMap {
    constructor(containerId, options = {}) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;

      this.options = options;
      this.category = options.category || this.container.dataset.category;
      this.packageId = options.packageId || this.container.dataset.packageId;
      this.packagesData = [];
      this.map = null;
      this.layerGroups = {};
      this.initialized = false;

      this.initLazyLoading();
    }

    initLazyLoading() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.initialized) {
              this.initialized = true;
              this.loadAndRender();
              observer.unobserve(entry.target);
            }
          });
        }, { rootMargin: '200px 0px' });
        observer.observe(this.container);
      } else {
        // Fallback for older browsers
        this.loadAndRender();
      }
    }

    async loadAndRender() {
      try {
        if (!window.L) {
          console.warn('Leaflet library not loaded.');
          return;
        }

        const dataPath = this.options.dataPath || 'data/packages.json';
        let data;
        if (window.LotusFirebase && typeof window.LotusFirebase.getCatalog === 'function') {
          data = await window.LotusFirebase.getCatalog(dataPath);
        } else {
          const res = await fetch(dataPath);
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          data = await res.json();
        }
        
        const allPackages = data.packages || [];
        if (this.packageId) {
          this.packagesData = allPackages.filter(p => p.id === this.packageId || p.slug === this.packageId);
        } else if (this.category) {
          this.packagesData = allPackages.filter(p => p.category === this.category);
        } else {
          this.packagesData = allPackages.slice(0, 3);
        }

        this.renderMap();
        this.renderAccessibleFallback();
      } catch (err) {
        console.error('Error loading packages for map:', err);
      }
    }

    renderMap() {
      // Initialize map
      this.map = L.map(this.container, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        scrollWheelZoom: false,
        attributionControl: true
      });

      // Add OpenStreetMap tiles
      L.tileLayer(TILE_URL, {
        maxZoom: 18,
        attribution: ATTRIBUTION
      }).addTo(this.map);

      // Create Route Layers
      const allBounds = [];
      this.packagesData.forEach((pkg, pkgIdx) => {
        const colorScheme = ROUTE_COLORS[pkgIdx % ROUTE_COLORS.length];
        const layerGroup = L.layerGroup();
        const routeCoords = [];

        const dests = pkg.destinations || [];
        dests.forEach((d, idx) => {
          const lat = d.lat;
          const lng = d.lng;
          if (typeof lat !== 'number' || typeof lng !== 'number') return;

          routeCoords.push([lat, lng]);
          allBounds.push([lat, lng]);

          // Create Numbered SVG Marker
          const stopNum = idx + 1;
          const customIcon = L.divIcon({
            className: 'lotus-map-marker-pin',
            html: `<div style="
              background: ${colorScheme.stroke};
              color: #FFFFFF;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-size: 11px;
              font-weight: 800;
              border: 2.5px solid #FFFFFF;
              box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            ">${stopNum}</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
            popupAnchor: [0, -16]
          });

          // Accessible popup with destination info and activities
          const activitiesList = (d.activities && d.activities.length > 0)
            ? `<ul style="margin: 6px 0 0; padding-left: 16px; font-size: 12px; color: #4A5568;">
                ${d.activities.map(a => `<li>${a}</li>`).join('')}
              </ul>`
            : '';

          const popupContent = `
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 170px;">
              <span style="font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: ${colorScheme.stroke};">
                ${pkg.title} • Stop ${stopNum}
              </span>
              <h4 style="margin: 4px 0 2px; font-size: 14px; font-weight: 700; color: #002B49;">${d.name}</h4>
              ${activitiesList}
            </div>
          `;

          const marker = L.marker([lat, lng], {
            icon: customIcon,
            title: `${d.name} (Stop ${stopNum})`,
            alt: `Map pin for ${d.name}`
          }).bindPopup(popupContent);

          layerGroup.addLayer(marker);
        });

        // Draw Route Line
        if (routeCoords.length > 1) {
          const polyline = L.polyline(routeCoords, {
            color: colorScheme.stroke,
            weight: 3.5,
            opacity: 0.85,
            dashArray: pkgIdx > 0 ? '6, 6' : undefined,
            smoothFactor: 1
          });
          layerGroup.addLayer(polyline);
        }

        layerGroup.addTo(this.map);
        this.layerGroups[pkg.id] = { group: layerGroup, pkg, color: colorScheme };
      });

      // Fit bounds if valid coordinates exist
      if (allBounds.length > 0) {
        this.map.fitBounds(allBounds, { padding: [35, 35], maxZoom: 10 });
      }

      this.renderControls();
    }

    renderControls() {
      if (this.packagesData.length <= 1) return;

      // Add a sleek selector bar above the map for multi-package category view
      const controlBar = document.createElement('div');
      controlBar.className = 'lotus-map-package-selector';
      controlBar.setAttribute('role', 'tablist');
      controlBar.setAttribute('aria-label', 'Select Tour Route on Map');

      this.packagesData.forEach((pkg, idx) => {
        const color = ROUTE_COLORS[idx % ROUTE_COLORS.length];
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `lotus-map-tab-btn ${idx === 0 ? 'active' : ''}`;
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
        btn.innerHTML = `
          <span class="route-legend-bullet" style="background: ${color.stroke};"></span>
          <span>${pkg.title} (${pkg.nights}N/${pkg.days}D)</span>
        `;

        btn.addEventListener('click', () => {
          controlBar.querySelectorAll('.lotus-map-tab-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          // Toggle visible layers
          Object.entries(this.layerGroups).forEach(([id, item]) => {
            if (id === pkg.id) {
              if (!this.map.hasLayer(item.group)) this.map.addLayer(item.group);
            } else {
              if (this.map.hasLayer(item.group)) this.map.removeLayer(item.group);
            }
          });
        });

        controlBar.appendChild(btn);
      });

      // Insert selector above map container
      if (this.container.parentNode) {
        this.container.parentNode.insertBefore(controlBar, this.container);
      }
    }

    renderAccessibleFallback() {
      // Append accessible text list of route stops beneath the map container
      const fallbackWrap = document.createElement('div');
      fallbackWrap.className = 'lotus-map-accessible-fallback';
      fallbackWrap.innerHTML = `
        <details style="margin-top: 14px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; color: #4A5568;">
          <summary style="cursor: pointer; font-weight: 700; color: #002B49; padding: 4px 0;">
            🗺️ View Complete Text Itinerary of Route Stops
          </summary>
          <div style="padding: 10px 0;">
            ${this.packagesData.map(pkg => `
              <div style="margin-bottom: 12px;">
                <strong style="color: #002B49;">${pkg.title} (${pkg.nights} Nights & ${pkg.days} Days):</strong>
                <ol style="margin: 4px 0 0; padding-left: 20px;">
                  ${(pkg.destinations || []).map((d, idx) => `
                    <li><strong>${d.name}:</strong> ${d.activities ? d.activities.join(', ') : 'Sightseeing'}</li>
                  `).join('')}
                </ol>
              </div>
            `).join('')}
          </div>
        </details>
      `;
      if (this.container.parentNode) {
        this.container.parentNode.appendChild(fallbackWrap);
      }
    }
  }

  // Auto-initialize any .js-lotus-route-map containers
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-lotus-route-map').forEach(el => {
      new LotusTourMap(el.id, {
        category: el.dataset.category,
        packageId: el.dataset.packageId,
        dataPath: el.dataset.dataPath || 'data/packages.json'
      });
    });
  });

  window.LotusTourMap = LotusTourMap;
})();
