/**
 * scripts/replace-legacy-images.js
 * Step R5: Permanently replaces the 10 legacy image paths in all HTML and JSON files
 * with real, verified assets from IMAGE_AUDIT.md while preserving relative path prefixes.
 */

const fs = require('fs');
const path = require('path');
const { getHtmlFiles } = require('./verify-links');

const ROOT_DIR = path.resolve(__dirname, '..');

const REPLACEMENTS = [
  { legacy: 'assets/tours/beach/southern-sands-1.jpg', real: 'assets/images/beach/mirissa-1.webp' },
  { legacy: 'assets/tours/beach/seaboard-odyssey-1.jpg', real: 'assets/images/beach/unawatuna-2.webp' },
  { legacy: 'assets/tours/beach/eastern-sanctuary-1.jpg', real: 'assets/images/beach/pasikudah-5.webp' },
  { legacy: 'assets/tours/cultural/royal-kingdoms-1.jpg', real: 'assets/images/cultural/sigiriya-1.webp' },
  { legacy: 'assets/tours/cultural/sacred-triangle-1.jpg', real: 'assets/images/cultural/dambulla-cave-temple-2.webp' },
  { legacy: 'assets/tours/cultural/three-millennia-1.jpg', real: 'assets/images/cultural/polonnaruwa-gal-vihara-3.webp' },
  { legacy: 'assets/tours/wildlife/big-five-1.jpg', real: 'assets/images/wildlife/yala-leopard-1.webp' },
  { legacy: 'assets/tours/wildlife/rainforest-1.jpg', real: 'assets/images/wildlife/sinharaja-rainforest-5.webp' },
  { legacy: 'assets/tours/wildlife/predator-trail-1.jpg', real: 'assets/images/wildlife/minneriya-elephant-gathering-2.webp' },
  { legacy: 'assets/tours/wildlife/biosphere-odyssey-1.jpg', real: 'assets/images/wildlife/udawalawe-3.webp' }
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let fileChanged = false;
  let count = 0;

  for (const { legacy, real } of REPLACEMENTS) {
    if (content.includes(legacy)) {
      // Replace legacy with real, preserving whatever prefix preceded it
      const regex = new RegExp(legacy.replace(/\//g, '[\\\\/]'), 'g');
      content = content.replace(regex, real);
      fileChanged = true;
      count++;
    }
  }

  if (fileChanged) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[REPLACED] ${path.relative(ROOT_DIR, filePath)}: ${count} legacy image path(s) updated`);
  }
  return count;
}

function run() {
  const htmlFiles = getHtmlFiles(ROOT_DIR);
  const jsonFiles = [];
  
  function scanJson(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      if (e.name === 'node_modules' || e.name === '.git' || e.name === 'brain') continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        scanJson(full);
      } else if (e.name.endsWith('.json')) {
        jsonFiles.push(full);
      }
    }
  }
  scanJson(ROOT_DIR);

  const allFiles = [...htmlFiles, ...jsonFiles];
  let totalReplaced = 0;
  for (const f of allFiles) {
    totalReplaced += replaceInFile(f);
  }
  console.log(`\n✓ Total legacy paths replaced across repo: ${totalReplaced}`);
}

if (require.main === module) {
  run();
}

module.exports = { REPLACEMENTS, replaceInFile };
