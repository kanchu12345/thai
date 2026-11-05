/**
 * scripts/build-partials.js
 * Injects shared HTML partials (header, mobile-menu, footer, floating-actions)
 * into target HTML pages with idempotent comment markers.
 * 
 * Usage:
 *   node scripts/build-partials.js           # Builds pilot pages
 *   node scripts/build-partials.js --all     # Builds all HTML files with markers
 *   node scripts/build-partials.js <file>    # Builds specific file
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PARTIALS_DIR = path.join(ROOT_DIR, 'partials');

const PARTIAL_NAMES = ['header', 'mobile-menu', 'footer', 'floating-actions'];

function loadPartials() {
  const partials = {};
  for (const name of PARTIAL_NAMES) {
    const filePath = path.join(PARTIALS_DIR, `${name}.html`);
    if (fs.existsSync(filePath)) {
      partials[name] = fs.readFileSync(filePath, 'utf8');
    } else {
      console.warn(`Warning: Partial ${name}.html not found at ${filePath}`);
    }
  }
  return partials;
}

function getBasePath(relPath) {
  const segments = relPath.replace(/\\/g, '/').split('/');
  const depth = segments.length - 1;
  return depth === 0 ? './' : '../'.repeat(depth);
}

function injectPartial(content, name, partialTemplate, basePath) {
  const resolvedPartial = partialTemplate.replace(/\{\{BASE_PATH\}\}/g, basePath);
  
  // Pattern 1: Existing block <!-- @include name:start --> ... <!-- @include name:end -->
  const blockRegex = new RegExp(
    `<!--\\s*@include\\s+${name}:start\\s*-->[\\s\\S]*?<!--\\s*@include\\s+${name}:end\\s*-->`,
    'gi'
  );

  // Pattern 2: Single placeholder <!-- @include name -->
  const singleRegex = new RegExp(
    `<!--\\s*@include\\s+${name}\\s*-->`,
    'gi'
  );

  const wrapped = `<!-- @include ${name}:start -->\n${resolvedPartial.trim()}\n<!-- @include ${name}:end -->`;

  if (blockRegex.test(content)) {
    return content.replace(blockRegex, wrapped);
  } else if (singleRegex.test(content)) {
    return content.replace(singleRegex, wrapped);
  }
  
  return content;
}

function processFile(filePath, partials) {
  const relPath = path.relative(ROOT_DIR, filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const basePath = getBasePath(relPath);

  for (const name of PARTIAL_NAMES) {
    if (partials[name]) {
      content = injectPartial(content, name, partials[name], basePath);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[SUCCESS] Updated partials in: ${relPath} (basePath: ${basePath})`);
    return true;
  } else {
    // No markers found or already up to date
    return false;
  }
}

function findHtmlFiles(dir, fileList = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.name.startsWith('.') || item.name === 'node_modules' || item.name === 'admin' || item.name === 'partials') {
      continue;
    }
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      findHtmlFiles(fullPath, fileList);
    } else if (item.isFile() && item.name.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function main() {
  const args = process.argv.slice(2);
  const partials = loadPartials();
  
  let targetFiles = [];

  if (args.includes('--all')) {
    targetFiles = findHtmlFiles(ROOT_DIR);
  } else if (args.length > 0 && !args[0].startsWith('--')) {
    targetFiles = args.map(arg => path.resolve(ROOT_DIR, arg));
  } else {
    // Pilot files default
    targetFiles = [
      path.join(ROOT_DIR, 'index.html'),
      path.join(ROOT_DIR, 'tours', 'beach', 'southern-sands-serenade', 'index.html')
    ];
  }

  console.log(`Checking ${targetFiles.length} file(s) for partial markers...`);
  let updatedCount = 0;
  for (const file of targetFiles) {
    if (fs.existsSync(file)) {
      if (processFile(file, partials)) {
        updatedCount++;
      }
    } else {
      console.warn(`File not found: ${file}`);
    }
  }
  console.log(`Done. ${updatedCount} file(s) modified.`);
}

if (require.main === module) {
  main();
}

module.exports = { processFile, loadPartials, getBasePath };
