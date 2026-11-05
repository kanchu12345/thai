/**
 * scripts/restore-pristine-tours.js
 * Restores full pristine tour category & package pages from commit 574d596
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const git = 'C:\\Users\\kanch\\AppData\\Local\\GitHubDesktop\\app-3.6.4\\resources\\app\\git\\cmd\\git.exe';

const categories = [
  'adventure',
  'ayurvedic',
  'beach',
  'buddhist-heritage',
  'cultural',
  'family',
  'hill-country',
  'honeymoon',
  'ramayana',
  'wildlife'
];

// Restore category index pages
for (const cat of categories) {
  const catFile = `tours/${cat}/index.html`;
  try {
    execSync(`"${git}" checkout 574d596 -- ${catFile}`, { stdio: 'inherit' });
    console.log(`[RESTORED] ${catFile}`);
  } catch (e) {
    console.error(`Failed to restore ${catFile}:`, e.message);
  }
}

// Restore tours/index.html
try {
  execSync(`"${git}" checkout 574d596 -- tours/index.html`, { stdio: 'inherit' });
  console.log(`[RESTORED] tours/index.html`);
} catch (e) {
  console.error(`Failed to restore tours/index.html:`, e.message);
}

// Restore all package pages except southern-sands-serenade
const toursDir = path.resolve(__dirname, '..', 'tours');
for (const cat of fs.readdirSync(toursDir)) {
  const catPath = path.join(toursDir, cat);
  if (!fs.statSync(catPath).isDirectory()) continue;
  for (const pkg of fs.readdirSync(catPath)) {
    const pkgPath = path.join(catPath, pkg);
    if (!fs.statSync(pkgPath).isDirectory()) continue;
    if (cat === 'beach' && pkg === 'southern-sands-serenade') {
      console.log(`[SKIPPED PILOT] tours/beach/southern-sands-serenade/index.html`);
      continue;
    }
    const relFile = `tours/${cat}/${pkg}/index.html`;
    try {
      execSync(`"${git}" checkout 574d596 -- ${relFile}`, { stdio: 'inherit' });
      console.log(`[RESTORED] ${relFile}`);
    } catch (e) {
      console.error(`Failed to restore ${relFile}:`, e.message);
    }
  }
}
console.log('\nAll pristine pages successfully restored from 574d596!');
