/**
 * Synchronizes assets/data/tours-data.js from data/packages.json
 * GENERATED FILE - DO NOT EDIT
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const pkgPath = path.join(rootDir, 'data', 'packages.json');
const outPath = path.join(rootDir, 'assets', 'data', 'tours-data.js');

if (!fs.existsSync(pkgPath)) {
  console.error('[sync-tours-data] Error: data/packages.json not found');
  process.exit(1);
}

const pkgData = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const bundle = {
  version: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
  totalCategories: pkgData.totalCategories || (pkgData.categoriesList ? pkgData.categoriesList.length : 11),
  totalPackages: pkgData.totalPackages || (pkgData.packages ? pkgData.packages.length : 29),
  categories: pkgData.categoriesList || Object.values(pkgData.categories || {}),
  packages: pkgData.packages || []
};

const header = `/*
 * © 2026 Infinite Design. All rights reserved.
 * Built for Lotus Ceylon International Tours & Services (Pvt) Ltd.
 * Unauthorized removal of attribution does not transfer ownership of this code.
 * https://infiniteweb.dev/
 */
/**
 * ============================================================================
 * GENERATED FILE - DO NOT EDIT DIRECTLY
 * Single Source of Truth is /data/packages.json
 * Regenerate with: node scripts/sync-tours-data.js
 * ============================================================================
 */
(function() {
  'use strict';
  const toursData = `;

const footer = `;
  if (typeof window !== 'undefined') {
    window.LOTUS_TOURS_DATA = toursData;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = toursData;
  }
})();
`;

fs.writeFileSync(outPath, header + JSON.stringify(bundle, null, 2) + footer, 'utf8');
console.log(`[sync-tours-data] Successfully generated assets/data/tours-data.js (${bundle.totalPackages} packages, ${bundle.totalCategories} categories)`);
