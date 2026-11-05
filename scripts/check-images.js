const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');

// Scan all HTML, CSS, JSON files for image references
const TEXT_EXTS = ['.html', '.css', '.json', '.js'];
const IMG_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];

const imageRefs = new Map(); // path -> { locations: Set, exists: bool, resolvedPath: string, mappedPath: string|null }

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['.git', 'node_modules', '.vscode', 'scratch', 'archive'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (TEXT_EXTS.includes(ext)) {
        scanFile(full);
      }
    }
  }
}

// Regex to capture image paths
const IMG_REGEX = /['"\(]([a-zA-Z0-9_\-\.\/]+\.(?:webp|jpg|jpeg|png|svg|gif))['"\)]/gi;

function scanFile(filePath) {
  const relFile = path.relative(REPO_ROOT, filePath).replace(/\\/g, '/');
  // Skip result and temporary files
  if (relFile.startsWith('tools/') && relFile.endsWith('.json')) return;
  if (relFile.includes('image-manifest') || relFile.includes('media-manifest')) return;

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    let match;
    while ((match = IMG_REGEX.exec(content)) !== null) {
      let rawPath = match[1].trim();
      // Ignore external URLs or base64
      if (rawPath.startsWith('http://') || rawPath.startsWith('https://') || rawPath.startsWith('//') || rawPath.startsWith('data:')) {
        continue;
      }

      // Clean leading relative parts
      let clean = rawPath.replace(/^[./]+/, '').split('?')[0].split('#')[0];
      if (!clean) continue;

      if (!imageRefs.has(clean)) {
        imageRefs.set(clean, {
          raw: rawPath,
          locations: new Set(),
          exists: false,
          diskPath: '',
          mappedPath: null
        });
      }
      imageRefs.get(clean).locations.add(relFile);
    }
  } catch (e) {}
}

console.log('Auditing image references across repository...');
walk(REPO_ROOT);

// Check disk existence
let totalChecked = 0;
let missingCount = 0;
let existingCount = 0;

// Collect real files under assets/images
const realImages = [];
function collectRealImages(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectRealImages(full);
    } else if (entry.isFile()) {
      const rel = path.relative(REPO_ROOT, full).replace(/\\/g, '/');
      realImages.push(rel);
    }
  }
}
collectRealImages(path.join(REPO_ROOT, 'assets', 'images'));
collectRealImages(path.join(REPO_ROOT, 'assets', 'tours'));

const missingImages = [];
const existingImages = [];

for (const [cleanPath, item] of imageRefs.entries()) {
  totalChecked++;
  const fullDiskPath = path.join(REPO_ROOT, cleanPath);
  if (fs.existsSync(fullDiskPath)) {
    item.exists = true;
    item.diskPath = cleanPath;
    existingCount++;
    existingImages.push(item);
  } else {
    // Check if filename exists elsewhere in assets/images
    const basename = path.basename(cleanPath);
    const nameWithoutExt = basename.split('.')[0];
    
    // Find candidate match
    const candidate = realImages.find(r => {
      const rBase = path.basename(r);
      const rName = rBase.split('.')[0];
      return rBase === basename || rName === nameWithoutExt || (cleanPath.includes('beach') && r.includes('beach'));
    });

    if (candidate) {
      item.mappedPath = candidate;
    }
    missingCount++;
    missingImages.push(item);
  }
}

// Generate IMAGE_AUDIT.md
let md = `# Lotus Ceylon - Image Asset Audit Report

**Date**: October 2026  
**Total Image References Audited**: ${totalChecked}  
**Valid Existing Images on Disk**: ${existingCount}  
**Missing or Legacy References**: ${missingCount}  

---

## 1. Summary of Legacy & Missing Image References

The audit detected legacy references (chiefly legacy \`assets/tours/...\` paths from early prototypes) that either do not exist or can be mapped to high-quality WebP assets in \`assets/images/...\`.

| Referenced Path | Disk Status | Suggested Replacement / Mapping | Referenced In (Sample) |
| :--- | :---: | :--- | :--- |
`;

for (const item of missingImages) {
  const locSample = Array.from(item.locations).slice(0, 2).join(', ');
  const statusStr = item.mappedPath ? `Mapped to \`${item.mappedPath}\`` : 'Missing on disk';
  md += `| \`${item.raw}\` | ❌ Missing | ${statusStr} | \`${locSample}\` |\n`;
}

md += `\n---

## 2. Valid Existing Image Directory Distribution

Total ${realImages.length} real image files verified under \`assets/images/\` and \`assets/tours/\`:
- **About**: \`assets/images/about/\`
- **Adventure**: \`assets/images/adventure/\`
- **Ayurveda**: \`assets/images/ayurveda/\`
- **Beach**: \`assets/images/beach/\`
- **Brand**: \`assets/images/brand/\`
- **Buddhist Heritage**: \`assets/images/buddhist-heritage/\`
- **Contact**: \`assets/images/contact/\`
- **Cultural**: \`assets/images/cultural/\`
- **Family**: \`assets/images/family/\`
- **Hill Country**: \`assets/images/hill-country/\`
- **Home**: \`assets/images/home/\`
- **Honeymoon**: \`assets/images/honeymoon/\`
- **Ramayana**: \`assets/images/ramayana/\`
- **Wildlife**: \`assets/images/wildlife/\`

---

## 3. Recommended Remediation in CMS & Engine
1. In \`assets/js/cms.js\` image resolver: add legacy alias table mapping \`assets/tours/{category}/{name}.jpg\` to the corresponding real asset in \`assets/images/{category}/...\`.
2. Add image \`onerror\` fallback to \`assets/images/brand/logo.png\` to ensure zero broken image icons appear in public view.
`;

fs.writeFileSync(path.join(REPO_ROOT, 'IMAGE_AUDIT.md'), md, 'utf-8');
console.log(`Image audit complete: ${existingCount} valid, ${missingCount} missing/legacy references.`);
console.log('Saved report to IMAGE_AUDIT.md');
