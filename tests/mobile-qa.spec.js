const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Discover all public HTML pages
function getPublicPages(dir, baseDir = '') {
  let pages = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(baseDir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', 'admin', 'artifacts', 'tests', 'scripts'].includes(entry.name)) {
        pages = pages.concat(getPublicPages(fullPath, relPath));
      }
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const urlPath = relPath.replace(/\\/g, '/');
      pages.push(urlPath);
    }
  }
  return pages;
}

const PUBLIC_PAGES = getPublicPages(__dirname + '/..');
const VIEWPORTS = [
  { name: '360x640', width: 360, height: 640 },
  { name: '390x844', width: 390, height: 844 },
  { name: '412x915', width: 412, height: 915 }
];

test.describe('Lotus Ceylon - Site-Wide Mobile Responsiveness QA', () => {
  for (const pageUrl of PUBLIC_PAGES) {
    for (const vp of VIEWPORTS) {
      test(`${pageUrl} on ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        
        const consoleErrors = [];
        page.on('console', msg => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        });

        const targetUrl = `http://127.0.0.1:8089/${pageUrl}`;
        await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.waitForTimeout(1000);

        const metrics = await page.evaluate(() => {
          const scrollWidth = document.documentElement.scrollWidth;
          const clientWidth = document.documentElement.clientWidth;
          const hasHorizontalOverflow = scrollWidth > (clientWidth + 1);

          // Fixed elements > 25% viewport height
          const largeFixedElements = [];
          document.querySelectorAll('*').forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.position === 'fixed' && style.display !== 'none' && style.visibility !== 'hidden') {
              const r = el.getBoundingClientRect();
              if (r.height > (window.innerHeight * 0.25) && r.width > 50) {
                largeFixedElements.push({ tag: el.tagName, id: el.id, className: el.className, height: r.height });
              }
            }
          });

          // Broken images
          let brokenImages = 0;
          document.querySelectorAll('img').forEach(img => {
            if (img.complete && img.naturalWidth === 0 && img.offsetParent !== null) {
              brokenImages++;
            }
          });

          return {
            hasHorizontalOverflow,
            scrollWidth,
            clientWidth,
            largeFixedElements,
            brokenImages
          };
        });

        expect(metrics.hasHorizontalOverflow).toBe(false);
        expect(metrics.largeFixedElements.length).toBe(0);
        expect(consoleErrors.length).toBe(0);
      });
    }
  }
});
