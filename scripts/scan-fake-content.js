/**
 * scripts/scan-fake-content.js
 * Scans all HTML, JSON, and JS seed files for potentially unverified claims:
 * - Testimonials/reviews with person names
 * - Star ratings, TripAdvisor, Google Reviews, Booking.com
 * - SLTDA, licensed, premier, award
 * - Payment provider logos / accepted payment claims
 * - Guarantee, sustainability/reforestation claims, numeric stats
 * 
 * Generates FAKE_CONTENT_SCAN.md and identifies actions.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const PATTERNS = [
  { category: 'Reviews & Testimonials', pattern: /(?:testimonial|guest-review|review-card|review-author|reviewer|client-name)/i, recommendation: 'remove if fabricated' },
  { category: 'Star Ratings & Platforms', pattern: /(?:★|5-star|4\.[89]\s*\/\s*5|tripadvisor|google reviews?|booking\.com|trustpilot)/i, recommendation: 'remove if unverified' },
  { category: 'Licensing & Awards', pattern: /\b(sltda|licensed|licence|premier|award-winning|national award)\b/i, recommendation: 'needs proof / client verification' },
  { category: 'Payment Providers', pattern: /\b(visa|mastercard|amex|american express|unionpay|paypal|apple pay|accepted payment)\b/i, recommendation: 'needs proof / verify active merchant gateway' },
  { category: 'Guarantees & Sustainability', pattern: /\b(100%\s*guarantee|money-back|reforestation|carbon neutral|eco-certified|planted \d+ trees)\b/i, recommendation: 'needs proof / verify corporate initiative' },
  { category: 'Numeric Claims & Statistics', pattern: /\b(\d{1,3}(?:,\d{3})+\+?|\d+\+?\s*(?:happy travelers|satisfied guests|tours completed|years of excellence))\b/i, recommendation: 'needs proof / verify business metrics' }
];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const findings = [];

  lines.forEach((line, lineNum) => {
    // Skip script/style/comment-only lines if needed, but be thorough
    for (const rule of PATTERNS) {
      const match = line.match(rule.pattern);
      if (match) {
        findings.push({
          file: path.relative(ROOT_DIR, filePath).replace(/\\/g, '/'),
          line: lineNum + 1,
          category: rule.category,
          matchedText: match[0],
          snippet: line.trim().slice(0, 140),
          recommendation: rule.recommendation
        });
      }
    }
  });

  return findings;
}

function getAllFiles(dir, exts = ['.html', '.json', '.js']) {
  let res = [];
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.git' || item === 'tests' || item === 'rollout-screens') continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      res = res.concat(getAllFiles(full, exts));
    } else if (exts.includes(path.extname(item))) {
      res.push(full);
    }
  }
  return res;
}

function run() {
  console.log('[FAKE CONTENT SCAN] Auditing repository codebase...');
  const files = getAllFiles(ROOT_DIR);
  let allFindings = [];

  for (const f of files) {
    // Skip scan script itself
    if (f.includes('scan-fake-content.js') || f.includes('scan-cms.js')) continue;
    const fFindings = scanFile(f);
    allFindings = allFindings.concat(fFindings);
  }

  // Deduplicate identical line matches
  const uniqueFindings = [];
  const seen = new Set();
  for (const item of allFindings) {
    const key = `${item.file}:${item.line}:${item.category}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueFindings.push(item);
    }
  }

  console.log(`Found ${uniqueFindings.length} candidate items across ${files.length} files.`);

  // Build FAKE_CONTENT_SCAN.md
  let md = `# Trust & Authenticity Audit: Content Verification Report\n\n`;
  md += `**Date**: ${new Date().toISOString()}\n`;
  md += `**Audited Files**: ${files.length} HTML, JSON, and JS files\n`;
  md += `**Total Candidates Scanned**: ${uniqueFindings.length}\n\n`;

  md += `## Audit Policy & Directive\n\n`;
  md += `Per strict instructions from the site owner:\n`;
  md += `1. **Clear Fake Reviews & Star Ratings**: Remove only fabricated testimonials with person names and arbitrary star ratings.\n`;
  md += `2. **Factual Claims / Certifications / Partners / Statistics**: Do **NOT** remove unilaterally. Flag with \`needs proof\` and catalog for site owner business verification.\n\n`;

  md += `## Categorized Findings Summary\n\n`;
  const byCategory = {};
  for (const f of uniqueFindings) {
    byCategory[f.category] = (byCategory[f.category] || 0) + 1;
  }
  md += `| Category | Flagged Count | Action Policy |\n`;
  md += `| :--- | :---: | :--- |\n`;
  for (const cat in byCategory) {
    let action = 'Needs owner proof / keep as placeholder';
    if (cat.includes('Reviews') || cat.includes('Star')) action = 'Remove fabricated names/ratings; keep schema clean';
    md += `| ${cat} | ${byCategory[cat]} | ${action} |\n`;
  }
  md += `\n`;

  md += `## Detailed Findings Table\n\n`;
  md += `| File | Line | Category | Flagged Text | Snippet | Recommendation |\n`;
  md += `| :--- | :---: | :--- | :--- | :--- | :--- |\n`;

  uniqueFindings.forEach(f => {
    const cleanSnippet = f.snippet.replace(/\|/g, '\\|');
    md += `| \`${f.file}\` | ${f.line} | ${f.category} | \`${f.matchedText}\` | \`${cleanSnippet}\` | **${f.recommendation}** |\n`;
  });

  const outPath = path.join(ROOT_DIR, 'FAKE_CONTENT_SCAN.md');
  fs.writeFileSync(outPath, md, 'utf8');
  console.log(`✓ Audit report generated: ${outPath}`);

  return uniqueFindings;
}

if (require.main === module) {
  run();
}

module.exports = { run };
