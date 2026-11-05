/**
 * scripts/audit-performance.js
 * Step R6: Performance & Web Vitals Measurement Script using Playwright
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PAGES_TO_TEST = [
  { name: 'Home (index.html)', url: 'http://localhost:8089/index.html' },
  { name: 'About Us (about.html)', url: 'http://localhost:8089/about.html' },
  { name: 'Destinations (destinations.html)', url: 'http://localhost:8089/destinations.html' },
  { name: 'Category Beach (tours/beach/index.html)', url: 'http://localhost:8089/tours/beach/index.html' },
  { name: 'Package Southern Sands', url: 'http://localhost:8089/tours/beach/southern-sands-serenade/index.html' }
];

async function measurePage(browser, pageInfo) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Inject performance observer for CLS and LCP
  await page.addInitScript(() => {
    window.__cls = 0;
    window.__lcp = 0;
    
    // CLS Observer
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__cls += entry.value;
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });

    // LCP Observer
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        window.__lcp = lastEntry.renderTime || lastEntry.loadTime;
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });

  const start = Date.now();
  await page.goto(pageInfo.url, { waitUntil: 'load' });
  await page.waitForTimeout(2000); // Allow CMS bindings to settle

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0] || {};
    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find(p => p.name === 'first-contentful-paint');

    return {
      fcp: fcp ? Math.round(fcp.startTime) : null,
      domInteractive: Math.round(nav.domInteractive || 0),
      loadEventEnd: Math.round(nav.loadEventEnd || 0),
      cls: Number((window.__cls || 0).toFixed(4)),
      lcp: Math.round(window.__lcp || 0)
    };
  });

  await context.close();
  return { ...pageInfo, ...metrics };
}

async function run() {
  console.log('======================================================');
  console.log('  WEB VITALS & CLS MEASUREMENT (STEP R6)');
  console.log('======================================================');

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const p of PAGES_TO_TEST) {
    try {
      const res = await measurePage(browser, p);
      results.push(res);
      console.log(`✓ ${p.name.padEnd(45)} | FCP: ${res.fcp}ms | LCP: ${res.lcp}ms | CLS: ${res.cls}`);
    } catch (e) {
      console.error(`✗ Error measuring ${p.name}:`, e.message);
    }
  }

  await browser.close();

  console.log('\n------------------------------------------------------');
  console.table(results.map(r => ({
    Page: r.name,
    'FCP (ms)': r.fcp,
    'LCP (ms)': r.lcp,
    CLS: r.cls,
    'Load (ms)': r.loadEventEnd,
    'CLS Status': r.cls < 0.05 ? 'EXCELLENT (<0.05)' : (r.cls < 0.1 ? 'GOOD' : 'NEEDS WORK')
  })));

  fs.writeFileSync(path.join(__dirname, 'performance-results.json'), JSON.stringify(results, null, 2));
}

if (require.main === module) {
  run();
}

module.exports = { run };
