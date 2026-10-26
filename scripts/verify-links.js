/**
 * scripts/verify-links.js
 * Scans HTML files for internal links, image paths, stylesheets, scripts,
 * and validates that they resolve to existing files on disk.
 * Reports broken links count (target: 0).
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function getHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (['node_modules', '.git', 'archive', 'vendor'].includes(item.name)) continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      getHtmlFiles(full, files);
    } else if (item.isFile() && item.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function checkFileLinks(filePath) {
  const fileDir = path.dirname(filePath);
  const relFile = path.relative(ROOT_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  const broken = [];

  // Match href="..." and src="..." (data-cms-img is a CMS key, not a static URL)
  const linkRegex = /(?:href|src)=["']([^"'#?]+)(?:[#?][^"']*)?["']/gi;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const rawTarget = match[1].trim();

    // Ignore external URLs, protocols, anchors, and JS template placeholders (${...})
    if (!rawTarget || rawTarget.includes('${') || rawTarget.startsWith('http://') || rawTarget.startsWith('https://') || rawTarget.startsWith('tel:') || rawTarget.startsWith('mailto:') || rawTarget.startsWith('javascript:') || rawTarget.startsWith('data:') || rawTarget.startsWith('blob:') || rawTarget.startsWith('weixin:') || rawTarget.startsWith('line:')) {
      continue;
    }

    // Resolve target relative to file
    let targetPath;
    if (rawTarget.startsWith('/')) {
      targetPath = path.join(ROOT_DIR, rawTarget.replace(/^\//, ''));
    } else {
      targetPath = path.resolve(fileDir, rawTarget);
    }

    // If path is a directory, check for index.html
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
      targetPath = path.join(targetPath, 'index.html');
    }

    if (!fs.existsSync(targetPath)) {
      broken.push({
        file: relFile,
        raw: rawTarget,
        resolved: path.relative(ROOT_DIR, targetPath)
      });
    }
  }

  return broken;
}

function runLinkCheck(targetFiles = null) {
  const files = targetFiles || getHtmlFiles(ROOT_DIR);
  console.log(`[LINK CHECKER] Validating ${files.length} HTML file(s)...`);

  let totalBroken = 0;
  const brokenByFile = {};

  for (const file of files) {
    const broken = checkFileLinks(file);
    if (broken.length > 0) {
      totalBroken += broken.length;
      brokenByFile[path.relative(ROOT_DIR, file)] = broken;
    }
  }

  if (totalBroken === 0) {
    console.log(`[LINK CHECKER] PASS: 0 broken internal links found across ${files.length} pages!`);
  } else {
    console.warn(`[LINK CHECKER] WARNING: ${totalBroken} broken links detected!`);
    for (const [f, items] of Object.entries(brokenByFile)) {
      console.warn(`  In ${f}:`);
      items.forEach(i => console.warn(`    - ${i.raw} -> (missing: ${i.resolved})`));
    }
  }

  return { totalBroken, brokenByFile, filesCount: files.length };
}

if (require.main === module) {
  runLinkCheck();
}

module.exports = { runLinkCheck, getHtmlFiles };
