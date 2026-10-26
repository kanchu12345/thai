/**
 * scripts/rollout-partials.js
 * Injects shared partials (header, mobile-menu, footer, floating-actions) in 3 batches:
 *   node scripts/rollout-partials.js batch1   (Root pages)
 *   node scripts/rollout-partials.js batch2   (Category pages + tours index)
 *   node scripts/rollout-partials.js batch3   (Tour Package pages)
 */

const fs = require('fs');
const path = require('path');
const { processFile, loadPartials } = require('./build-partials');

const ROOT_DIR = path.resolve(__dirname, '..');

// Batch 1: Root public pages
const BATCH_1_FILES = [
  'about.html',
  'contact.html',
  'destinations.html',
  'experiences.html',
  'gallery.html',
  'reviews.html',
  'blog.html',
  'inquiry-detailed.html',
  'inquiry-quick.html',
  'privacy-policy.html',
  'terms-conditions.html',
  'cancellation-policy.html',
  'cookie-policy.html'
].map(f => path.join(ROOT_DIR, f));

// Batch 2: Category pages + tours index
const BATCH_2_FILES = [
  'tours/index.html',
  'tours/cultural/index.html',
  'tours/buddhist-heritage/index.html',
  'tours/wildlife/index.html',
  'tours/beach/index.html',
  'tours/hill-country/index.html',
  'tours/ayurvedic/index.html',
  'tours/honeymoon/index.html',
  'tours/family/index.html',
  'tours/adventure/index.html',
  'tours/golf/index.html',
  'tours/ramayana/index.html'
].map(f => path.join(ROOT_DIR, f));

// Batch 3: All 26 Tour Package pages
function getBatch3Files() {
  const toursDir = path.join(ROOT_DIR, 'tours');
  const files = [];
  const categories = fs.readdirSync(toursDir, { withFileTypes: true });
  for (const cat of categories) {
    if (!cat.isDirectory()) continue;
    const catPath = path.join(toursDir, cat.name);
    const packages = fs.readdirSync(catPath, { withFileTypes: true });
    for (const pkg of packages) {
      if (!pkg.isDirectory()) continue;
      const pkgFile = path.join(catPath, pkg.name, 'index.html');
      if (fs.existsSync(pkgFile)) {
        files.push(pkgFile);
      }
    }
  }
  return files;
}

function prepareFileForPartials(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Header: exact tag match
  if (!content.includes('<!-- @include header')) {
    const headerRegex = /<header\s+class=["'][^"']*site-header-walkers[^"']*["'][\s\S]*?<\/header>/i;
    if (headerRegex.test(content)) {
      content = content.replace(headerRegex, '<!-- @include header -->');
      changed = true;
    }
  }

  // 2. Mobile Nav: exact tag match
  if (!content.includes('<!-- @include mobile-menu')) {
    const mobileRegex = /<div\s+[^>]*id=["']mobileNavFullscreen["'][\s\S]*?<\/ul>[\s\S]*?<\/div>\s*<\/div>/i;
    if (mobileRegex.test(content)) {
      content = content.replace(mobileRegex, '<!-- @include mobile-menu -->');
      changed = true;
    }
  }

  // 3. Footer: exact tag match
  if (!content.includes('<!-- @include footer')) {
    const footerRegex = /<footer\s+class=["'][^"']*site-footer-walkers[^"']*["'][\s\S]*?<\/footer>/i;
    if (footerRegex.test(content)) {
      content = content.replace(footerRegex, '<!-- @include footer -->');
      changed = true;
    }
  }

  // 4. Floating actions: exact tag match
  if (!content.includes('<!-- @include floating-actions')) {
    const fabRegex = /<div\s+[^>]*id=["']unifiedFabGroup["'][\s\S]*?<\/div>/i;
    const tabRegex = /<a\s+class=["']floating-inquire-tab["'][\s\S]*?<\/a>/i;
    
    if (fabRegex.test(content)) {
      content = content.replace(fabRegex, '<!-- @include floating-actions -->');
      changed = true;
      if (tabRegex.test(content)) {
        content = content.replace(tabRegex, '');
      }
    }
  }

  // 5. Ensure cms.js is present before </body>
  if (!content.includes('cms.js')) {
    const depth = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/').split('/').length - 1;
    const base = depth === 0 ? './' : '../'.repeat(depth);
    content = content.replace('</body>', `  <script defer src="${base}assets/js/cms.js"></script>\n</body>`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

function processBatch(batchName, files) {
  console.log(`\n======================================================`);
  console.log(`  PROCESSING ${batchName.toUpperCase()} (${files.length} pages)`);
  console.log(`======================================================`);

  const partials = loadPartials();
  let updatedCount = 0;

  for (const file of files) {
    if (fs.existsSync(file)) {
      prepareFileForPartials(file);
      if (processFile(file, partials)) {
        updatedCount++;
      }
    } else {
      console.warn(`File not found: ${file}`);
    }
  }

  console.log(`✓ ${batchName.toUpperCase()} completed: ${updatedCount} pages updated with partials.`);
}

function main() {
  const batchArg = process.argv[2] || 'all';

  if (batchArg === 'batch1') {
    processBatch('Batch 1: Root Pages', BATCH_1_FILES);
  } else if (batchArg === 'batch2') {
    processBatch('Batch 2: Category Pages', BATCH_2_FILES);
  } else if (batchArg === 'batch3') {
    processBatch('Batch 3: Tour Package Pages', getBatch3Files());
  } else if (batchArg === 'all') {
    processBatch('Batch 1: Root Pages', BATCH_1_FILES);
    processBatch('Batch 2: Category Pages', BATCH_2_FILES);
    processBatch('Batch 3: Tour Package Pages', getBatch3Files());
  } else {
    console.error(`Unknown batch: ${batchArg}. Use batch1, batch2, batch3, or all.`);
  }
}

if (require.main === module) {
  main();
}

module.exports = { BATCH_1_FILES, BATCH_2_FILES, getBatch3Files, processBatch };
