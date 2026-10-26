/**
 * scripts/create-redirects.js
 * Converts legacy root tour pages into canonical 301/meta-refresh redirect stubs:
 * - 11 legacy category pages -> tours/<category>/
 * - tours.html & sri-lanka-tours.html -> tours/
 * - Adds noindex, follow to category.html, tour-package-detail.html, tours/detail.html
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const REDIRECTS = [
  { file: 'cultural-tours.html', target: './tours/cultural/', canonical: 'tours/cultural/', title: 'Sri Lanka Cultural Tours' },
  { file: 'buddhist-heritage-tours.html', target: './tours/buddhist-heritage/', canonical: 'tours/buddhist-heritage/', title: 'Buddhist Heritage Pilgrimages' },
  { file: 'wildlife-tours.html', target: './tours/wildlife/', canonical: 'tours/wildlife/', title: 'Wildlife & Safari Tours' },
  { file: 'beach-tours.html', target: './tours/beach/', canonical: 'tours/beach/', title: 'Pristine Beach Holidays' },
  { file: 'hill-country-tours.html', target: './tours/hill-country/', canonical: 'tours/hill-country/', title: 'Hill Country & Tea Tours' },
  { file: 'ayurvedic-tours.html', target: './tours/ayurvedic/', canonical: 'tours/ayurvedic/', title: 'Ayurvedic Healing & Wellness' },
  { file: 'honeymoon-tours.html', target: './tours/honeymoon/', canonical: 'tours/honeymoon/', title: 'Honeymoon & Romantic Escapes' },
  { file: 'family-tours.html', target: './tours/family/', canonical: 'tours/family/', title: 'Family Discovery Tours' },
  { file: 'adventure-tours.html', target: './tours/adventure/', canonical: 'tours/adventure/', title: 'Active Adventure Tours' },
  { file: 'golf-tours.html', target: './tours/golf/', canonical: 'tours/golf/', title: 'Championship Golf Tours' },
  { file: 'ramayana-tours.html', target: './tours/ramayana/', canonical: 'tours/ramayana/', title: 'Ramayana Trail Tours' },
  { file: 'tours.html', target: './tours/', canonical: 'tours/', title: 'Sri Lanka Tours & Packages' },
  { file: 'sri-lanka-tours.html', target: './tours/', canonical: 'tours/', title: 'Sri Lanka Tours & Packages' }
];

function generateRedirectHtml(item) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirecting to ${item.title} | Lotus Ceylon</title>
  <meta http-equiv="refresh" content="0; url=${item.target}">
  <link rel="canonical" href="https://lotusceylon.com/${item.canonical}">
  <meta name="robots" content="noindex, follow">
  <script>
    (function() {
      window.location.replace('${item.target}');
    })();
  </script>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 4rem 1rem; color: #1e293b; background: #f8fafc;">
  <p style="font-size: 1.1rem; margin-bottom: 1rem;">Redirecting to <a href="${item.target}" style="color: #c5a880; font-weight: 600;">${item.title}</a>...</p>
  <p style="font-size: 0.9rem; color: #64748b;">If you are not redirected automatically, please click the link above.</p>
</body>
</html>
`;
}

function run() {
  console.log('[REDIRECTS] Generating canonical redirect stubs...');
  for (const item of REDIRECTS) {
    const fullPath = path.join(ROOT_DIR, item.file);
    fs.writeFileSync(fullPath, generateRedirectHtml(item), 'utf8');
    console.log(`✓ Created redirect: ${item.file} -> ${item.target}`);
  }

  // Ensure category.html, tour-package-detail.html, tours/detail.html have noindex, follow
  const utilityFiles = ['category.html', 'tour-package-detail.html', 'tours/detail.html'];
  for (const f of utilityFiles) {
    const p = path.join(ROOT_DIR, f);
    if (fs.existsSync(p)) {
      let content = fs.readFileSync(p, 'utf8');
      if (!content.includes('name="robots"')) {
        content = content.replace('<head>', '<head>\n  <meta name="robots" content="noindex, follow">');
        fs.writeFileSync(p, content, 'utf8');
        console.log(`✓ Added noindex to utility page: ${f}`);
      }
    }
  }

  console.log('[REDIRECTS COMPLETE] All 13 legacy routes converted to canonical redirects.');
}

if (require.main === module) {
  run();
}

module.exports = { REDIRECTS, run };
