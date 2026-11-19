/**
 * scripts/sync-catalog-cache.js
 * Synchronizes and exports canonical Firestore tour packages, itineraries, and categories
 * into static cache seed files with fresh cache version timestamps (lotus_cms_v8).
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PKG_PATH = path.join(ROOT_DIR, 'data', 'packages.json');
const SEED_PATH = path.join(ROOT_DIR, 'data', 'seed-catalog.json');
const SEED_JS_PATH = path.join(ROOT_DIR, 'data', 'seed-catalog.js');
const TOURS_DATA_PATH = path.join(ROOT_DIR, 'assets', 'data', 'tours-data.js');

const NOW_ISO = new Date().toISOString();
const CACHE_VERSION = 'lotus_cms_v8';
const DATE_VERSION = NOW_ISO.slice(0, 10).replace(/-/g, '.');

console.log('[sync-catalog-cache] Starting sync at ' + NOW_ISO + ' with cacheVersion ' + CACHE_VERSION + '...');

// 1. Read files
if (!fs.existsSync(PKG_PATH)) throw new Error('data/packages.json not found');
if (!fs.existsSync(SEED_PATH)) throw new Error('data/seed-catalog.json not found');

const pkgData = JSON.parse(fs.readFileSync(PKG_PATH, 'utf8'));
const seedData = JSON.parse(fs.readFileSync(SEED_PATH, 'utf8'));

// 2. Normalize and update data/packages.json
pkgData.version = DATE_VERSION;
pkgData.cacheVersion = CACHE_VERSION;
pkgData.updatedAt = NOW_ISO;
pkgData.lastSyncedAt = NOW_ISO;

const packages = pkgData.packages || [];
packages.forEach(p => {
  p.updatedAt = NOW_ISO;
  if (!p.status) p.status = 'published';
});
pkgData.packages = packages;

if (pkgData.tourPackages) {
  pkgData.tourPackages.forEach(tp => {
    tp.updatedAt = NOW_ISO;
    if (!tp.status) tp.status = 'published';
  });
} else {
  pkgData.tourPackages = packages;
}

pkgData.totalPackages = packages.length;
pkgData.totalCategories = pkgData.categoriesList ? pkgData.categoriesList.length : Object.keys(pkgData.categories || {}).length;

fs.writeFileSync(PKG_PATH, JSON.stringify(pkgData, null, 2), 'utf8');
console.log('[sync-catalog-cache] Updated data/packages.json (' + pkgData.totalPackages + ' packages, ' + pkgData.totalCategories + ' categories)');

// 3. Normalize and update data/seed-catalog.json
seedData.version = DATE_VERSION;
seedData.cacheVersion = CACHE_VERSION;
seedData.updatedAt = NOW_ISO;
seedData.lastSyncedAt = NOW_ISO;

// Sync packages in seedData
const seedPackages = seedData.packages || [];
seedPackages.forEach(p => {
  p.updatedAt = NOW_ISO;
  p.status = 'published';
});
seedData.packages = seedPackages;
seedData.tours = seedPackages;

// Sync categories in seedData
const seedCategories = seedData.categories || [];
seedCategories.forEach(c => {
  c.updatedAt = NOW_ISO;
  c.status = 'published';
});
seedData.categories = seedCategories;

// Update settings
if (Array.isArray(seedData.settings) && seedData.settings.length > 0) {
  seedData.settings[0].updatedAt = NOW_ISO;
}

fs.writeFileSync(SEED_PATH, JSON.stringify(seedData, null, 2), 'utf8');
console.log('[sync-catalog-cache] Updated data/seed-catalog.json (' + seedPackages.length + ' packages, ' + seedCategories.length + ' categories)');

// 4. Regenerate data/seed-catalog.js
const seedJsContent = 'window.LOTUS_SEED_CATALOG = ' + JSON.stringify(seedData) + ';\n';
fs.writeFileSync(SEED_JS_PATH, seedJsContent, 'utf8');
console.log('[sync-catalog-cache] Regenerated data/seed-catalog.js (' + (seedJsContent.length / 1024 / 1024).toFixed(2) + ' MB)');

// 5. Regenerate assets/data/tours-data.js
const bundle = {
  version: DATE_VERSION,
  cacheVersion: CACHE_VERSION,
  updatedAt: NOW_ISO,
  totalCategories: pkgData.totalCategories,
  totalPackages: pkgData.totalPackages,
  categories: pkgData.categoriesList || Object.values(pkgData.categories || {}),
  packages: pkgData.packages || []
};

const toursDataHeader = '/*\n' +
  ' * © 2026 Infinite Design. All rights reserved.\n' +
  ' * Built for Lotus Ceylon International Tours & Services (Pvt) Ltd.\n' +
  ' * Unauthorized removal of attribution does not transfer ownership of this code.\n' +
  ' * https://infiniteweb.dev/\n' +
  ' */\n' +
  '/**\n' +
  ' * ============================================================================\n' +
  ' * GENERATED FILE - DO NOT EDIT DIRECTLY\n' +
  ' * Single Source of Truth is /data/packages.json\n' +
  ' * Regenerate with: node scripts/sync-catalog-cache.js\n' +
  ' * ============================================================================\n' +
  ' */\n' +
  '(function() {\n' +
  '  \'use strict\';\n' +
  '  const toursData = ';

const toursDataFooter = ';\n' +
  '  if (typeof window !== \'undefined\') {\n' +
  '    window.LOTUS_TOURS_DATA = toursData;\n' +
  '  }\n' +
  '  if (typeof module !== \'undefined\' && module.exports) {\n' +
  '    module.exports = toursData;\n' +
  '  }\n' +
  '})();\n';

fs.writeFileSync(TOURS_DATA_PATH, toursDataHeader + JSON.stringify(bundle, null, 2) + toursDataFooter, 'utf8');
console.log('[sync-catalog-cache] Regenerated assets/data/tours-data.js (' + bundle.totalPackages + ' packages, ' + bundle.totalCategories + ' categories)');

// 6. Verification
console.log('\n--- VERIFICATION CHECKS ---');

// Validate data/packages.json
const vPkg = JSON.parse(fs.readFileSync(PKG_PATH, 'utf8'));
if (vPkg.packages.length !== 29 || vPkg.totalCategories !== 11) {
  throw new Error('packages.json count mismatch: ' + vPkg.packages.length + ' packages, ' + vPkg.totalCategories + ' categories');
}
console.log('✓ data/packages.json verified: 29 packages, 11 categories, cacheVersion: ' + vPkg.cacheVersion);

// Validate data/seed-catalog.json
const vSeed = JSON.parse(fs.readFileSync(SEED_PATH, 'utf8'));
if (vSeed.packages.length !== 29 || vSeed.categories.length !== 11) {
  throw new Error('seed-catalog.json count mismatch: ' + vSeed.packages.length + ' packages, ' + vSeed.categories.length + ' categories');
}
console.log('✓ data/seed-catalog.json verified: 29 packages, 11 categories, cacheVersion: ' + vSeed.cacheVersion);

// Validate assets/data/tours-data.js
const toursDataModule = require(TOURS_DATA_PATH);
if (toursDataModule.packages.length !== 29 || toursDataModule.categories.length !== 11) {
  throw new Error('tours-data.js count mismatch: ' + toursDataModule.packages.length + ' packages, ' + toursDataModule.categories.length + ' categories');
}
console.log('✓ assets/data/tours-data.js verified: 29 packages, 11 categories, cacheVersion: ' + toursDataModule.cacheVersion);

// Verify itineraries for all 29 packages
let missingItinerary = 0;
vPkg.packages.forEach(p => {
  if (!p.itinerary || p.itinerary.length === 0) {
    missingItinerary++;
    console.error('Missing itinerary for: ' + p.slug);
  }
});
if (missingItinerary > 0) {
  throw new Error(missingItinerary + ' packages are missing itineraries!');
}
console.log('✓ All 29 packages have verified, fully populated day-by-day itineraries.');

console.log('\n[SUCCESS] All catalog cache files synchronized and verified without errors!');
