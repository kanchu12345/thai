/**
 * scripts/scan-cms.js
 * Step R7-1: Production CMS Registry Scanner with Global Deduplication
 * 
 * Maps every public page -> section -> fieldKey, type, label, defaultValue, i18n,
 * and maps every key to an exact concrete Firestore path.
 * Collects siteGlobal.* keys ONLY ONCE into siteGlobal/{subDoc},
 * excluding them from per-page counts.
 */

const fs = require('fs');
const path = require('path');
const { getAllCorePages } = require('./bind-all-pages');

const ROOT_DIR = path.resolve(__dirname, '..');

function getElementLabel(fieldKey, tagName, innerText) {
  const parts = fieldKey.split('.');
  const lastPart = parts[parts.length - 1];
  
  if (lastPart === 'title') return 'Page Title / Heading';
  if (lastPart === 'description' || lastPart === 'overview') return 'Overview / Description';
  if (lastPart === 'duration') return 'Tour Duration';
  if (lastPart === 'price') return 'Starting Price';
  if (lastPart === 'hero_image') return 'Hero Banner Image';
  if (lastPart.startsWith('heading_')) return `Section Heading (${lastPart})`;
  if (lastPart.startsWith('p_')) return `Paragraph Text (${lastPart})`;
  if (lastPart.startsWith('btn_')) return `Action Button (${lastPart})`;
  if (lastPart.startsWith('img_')) return `Editorial Image (${lastPart})`;
  if (lastPart.startsWith('li_')) return `List Item (${lastPart})`;
  if (lastPart.startsWith('span_')) return `Badge / Statistic (${lastPart})`;
  if (lastPart.startsWith('td_')) return `Table Cell (${lastPart})`;
  if (lastPart.startsWith('a_')) return `Text Link (${lastPart})`;

  return lastPart.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function resolveFirestorePath(pageDocKey, fieldKey) {
  if (fieldKey.startsWith('siteGlobal.')) {
    const parts = fieldKey.split('.');
    // siteGlobal.branding.brandNameLotus -> siteGlobal/branding.brandNameLotus
    const subDoc = parts[1] || 'branding';
    const field = parts.slice(2).join('.');
    return `siteGlobal/${subDoc}.${field}`;
  }
  return `${pageDocKey}.${fieldKey}`;
}

function scanFileRaw(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  const content = fs.readFileSync(fullPath, 'utf8');

  const pageDocMatch = content.match(/<body[^>]*data-cms-page=["']([^"']+)["']/i);
  let pageDocKey = 'siteContent/home';
  if (pageDocMatch) {
    pageDocKey = pageDocMatch[1];
  } else if (relPath.startsWith('tours/')) {
    const segments = relPath.split('/');
    if (segments.length === 2 && segments[1] === 'index.html') {
      pageDocKey = 'siteContent/toursIndex';
    } else if (segments.length === 3 && segments[2] === 'index.html') {
      pageDocKey = 'tourCategories/' + segments[1];
    } else if (segments.length >= 4) {
      pageDocKey = 'tourPackages/' + segments[2];
    }
  } else {
    pageDocKey = 'siteContent/' + relPath.replace(/\.html$/, '');
  }

  const entries = [];

  // 1. data-cms (text)
  const textMatches = content.matchAll(/<([a-z0-9]+)([^>]*?)data-cms=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/\1>/gi);
  for (const m of textMatches) {
    const [_, tag, before, key, after, inner] = m;
    const cleanText = inner.replace(/<[^>]+>/g, '').trim();
    entries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
      firestorePath: resolveFirestorePath(pageDocKey, key),
      type: 'text',
      label: getElementLabel(key, tag, cleanText),
      defaultValue: cleanText,
      i18n: !key.startsWith('siteGlobal.branding.logo')
    });
  }

  // 2. data-cms-html
  const htmlMatches = content.matchAll(/<([a-z0-9]+)([^>]*?)data-cms-html=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/\1>/gi);
  for (const m of htmlMatches) {
    const [_, tag, before, key, after, inner] = m;
    entries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
      firestorePath: resolveFirestorePath(pageDocKey, key),
      type: 'html',
      label: getElementLabel(key, tag, inner),
      defaultValue: inner.trim(),
      i18n: true
    });
  }

  // 3. data-cms-img
  const imgMatches = content.matchAll(/<img([^>]*?)src=["']([^"']+)["']([^>]*?)data-cms-img=["']([^"']+)["']/gi);
  for (const m of imgMatches) {
    const [_, before, src, mid, key] = m;
    entries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
      firestorePath: resolveFirestorePath(pageDocKey, key),
      type: 'image',
      label: getElementLabel(key, 'img', src),
      defaultValue: src,
      i18n: false
    });
  }

  // 4. data-cms-bg
  const bgMatches = content.matchAll(/<([a-z0-9]+)([^>]*?)style=["'][^"']*url\(['"]?([^"')]+)['"]?\)[^"']*["']([^>]*?)data-cms-bg=["']([^"']+)["']/gi);
  for (const m of bgMatches) {
    const [_, tag, before, url, mid, key] = m;
    entries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
      firestorePath: resolveFirestorePath(pageDocKey, key),
      type: 'background',
      label: getElementLabel(key, tag, url),
      defaultValue: url,
      i18n: false
    });
  }

  // 5. data-cms-video
  const videoMatches = content.matchAll(/<video([^>]*?)data-cms-video=["']([^"']+)["']/gi);
  for (const m of videoMatches) {
    const [_, attrs, key] = m;
    const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
    entries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
      firestorePath: resolveFirestorePath(pageDocKey, key),
      type: 'video',
      label: 'Hero Video Source',
      defaultValue: srcMatch ? srcMatch[1] : '',
      i18n: false
    });
  }

  // 6. data-cms-link
  const linkMatches = content.matchAll(/<a([^>]*?)href=["']([^"']+)["']([^>]*?)data-cms-link=["']([^"']+)["']/gi);
  for (const m of linkMatches) {
    const [_, before, href, mid, key] = m;
    entries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
      firestorePath: resolveFirestorePath(pageDocKey, key),
      type: 'link',
      label: getElementLabel(key, 'a', href),
      defaultValue: href,
      i18n: false
    });
  }

  // 7. data-cms-list
  const listMatches = content.matchAll(/<([a-z0-9]+)([^>]*?)data-cms-list=["']([^"']+)["']/gi);
  for (const m of listMatches) {
    const [_, tag, attrs, key] = m;
    entries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
      firestorePath: resolveFirestorePath(pageDocKey, key),
      type: 'list',
      label: `Dynamic List (${key})`,
      defaultValue: `[dynamic list container: ${key}]`,
      i18n: false
    });
  }

  return entries;
}

function run() {
  const pages = getAllCorePages();
  console.log(`[SCAN CMS] Scanning ${pages.length} pages to build deduplicated cms-registry.json...`);

  const globalEntriesMap = new Map();
  const byPage = {};
  let totalPageSpecificBindings = 0;

  for (const p of pages) {
    const entries = scanFileRaw(p);
    const pageSpecific = [];

    for (const e of entries) {
      if (e.fieldKey.startsWith('siteGlobal.')) {
        if (!globalEntriesMap.has(e.fieldKey)) {
          const parts = e.fieldKey.split('.');
          const subDoc = parts[1] || 'branding';
          globalEntriesMap.set(e.fieldKey, {
            ...e,
            page: `siteGlobal/${subDoc}`
          });
        }
      } else {
        pageSpecific.push(e);
      }
    }

    byPage[p] = pageSpecific;
    totalPageSpecificBindings += pageSpecific.length;
  }

  const uniqueGlobalEntries = Array.from(globalEntriesMap.values());
  const allEntries = [...uniqueGlobalEntries];
  for (const p of pages) {
    allEntries.push(...byPage[p]);
  }

  const registry = {
    schemaVersion: '2.0',
    scannedAt: new Date().toISOString(),
    totalPagesScanned: pages.length,
    totalUniqueBindings: allEntries.length,
    totalPageSpecificBindings: totalPageSpecificBindings,
    totalGlobalBindings: uniqueGlobalEntries.length,
    fieldsByType: {
      text: allEntries.filter(e => e.type === 'text').length,
      html: allEntries.filter(e => e.type === 'html').length,
      image: allEntries.filter(e => e.type === 'image').length,
      background: allEntries.filter(e => e.type === 'background').length,
      video: allEntries.filter(e => e.type === 'video').length,
      link: allEntries.filter(e => e.type === 'link').length,
      list: allEntries.filter(e => e.type === 'list').length
    },
    siteGlobal: uniqueGlobalEntries,
    byPage: byPage,
    entries: allEntries
  };

  const outPath = path.join(ROOT_DIR, 'cms-registry.json');
  fs.writeFileSync(outPath, JSON.stringify(registry, null, 2), 'utf8');

  console.log(`✓ Deduplicated Registry Generated:`);
  console.log(`  - Total Pages Scanned: ${pages.length}`);
  console.log(`  - Unique Global Keys: ${uniqueGlobalEntries.length}`);
  console.log(`  - Page-Specific Keys: ${totalPageSpecificBindings}`);
  console.log(`  - Total Unique Field Bindings: ${allEntries.length}`);
  console.log('Breakdown by Type:');
  console.table(registry.fieldsByType);
}

if (require.main === module) {
  run();
}

module.exports = { scanFileRaw, run };
