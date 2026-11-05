const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve('.');
const PARTIAL_PATH = path.join(ROOT_DIR, 'partials', 'footer.html');
const footerTemplate = fs.readFileSync(PARTIAL_PATH, 'utf8');

const REDIRECT_PAGES = new Set([
  'adventure-tours.html', 'ayurvedic-tours.html', 'beach-tours.html',
  'buddhist-heritage-tours.html', 'category.html', 'cultural-tours.html',
  'family-tours.html', 'golf-tours.html', 'hill-country-tours.html',
  'honeymoon-tours.html', 'ramayana-tours.html', 'sri-lanka-tours.html',
  'tour-package-detail.html', 'tours.html', 'wildlife-tours.html',
  'detail.html'
]);

function getBasePath(relPath) {
  const parts = relPath.replace(/\\/g, '/').split('/');
  const depth = parts.length - 1;
  return depth === 0 ? './' : '../'.repeat(depth);
}

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    if (['node_modules', '.git', 'archive', 'backups', 'artifacts', 'rollout-screens', 'scratch', 'admin', 'partials'].includes(f.name)) {
      continue;
    }
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      walk(full, fileList);
    } else if (f.isFile() && f.name.endsWith('.html') && !REDIRECT_PAGES.has(f.name)) {
      fileList.push(full);
    }
  }
  return fileList;
}

const htmlFiles = walk(ROOT_DIR);
console.log(`Syncing footer to ${htmlFiles.length} HTML pages...`);

let updatedCount = 0;
for (const filePath of htmlFiles) {
  const relPath = path.relative(ROOT_DIR, filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  const basePath = getBasePath(relPath);
  const resolvedFooter = footerTemplate.replace(/\{\{BASE_PATH\}\}/g, basePath);
  const wrappedFooter = `<!-- @include footer:start -->\n${resolvedFooter.trim()}\n<!-- @include footer:end -->`;

  const footerRegex = /<!--\s*@include\s+footer:start\s*-->[\s\S]*?<!--\s*@include\s+footer:end\s*-->/i;
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, wrappedFooter);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  } else {
    console.log(`No footer markers in: ${relPath}`);
  }
}

console.log(`Successfully synced footer in ${updatedCount} pages.`);
