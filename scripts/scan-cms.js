/**
 * scripts/scan-cms.js
 * Step R4: Scans all HTML files and builds cms-registry.json
 * Mapping page -> section -> fieldKey, type, label, defaultValue, i18n support.
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

function scanFile(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  const content = fs.readFileSync(fullPath, 'utf8');

  const pageDocMatch = content.match(/<body[^>]*data-cms-page=["']([^"']+)["']/i);
  const pageDocKey = pageDocMatch ? pageDocMatch[1] : (relPath.startsWith('tours/') ? 'tourPackages/' + path.basename(path.dirname(relPath)) : 'siteContent/' + relPath.replace(/\.html$/, ''));

  const registryEntries = [];

  // 1. data-cms (text)
  const textMatches = content.matchAll(/<([a-z0-9]+)([^>]*?)data-cms=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/\1>/gi);
  for (const m of textMatches) {
    const [_, tag, before, key, after, inner] = m;
    const cleanText = inner.replace(/<[^>]+>/g, '').trim();
    registryEntries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
      type: 'text',
      label: getElementLabel(key, tag, cleanText),
      defaultValue: cleanText,
      i18n: true
    });
  }

  // 2. data-cms-html
  const htmlMatches = content.matchAll(/<([a-z0-9]+)([^>]*?)data-cms-html=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/\1>/gi);
  for (const m of htmlMatches) {
    const [_, tag, before, key, after, inner] = m;
    registryEntries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
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
    registryEntries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
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
    registryEntries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
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
    registryEntries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
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
    registryEntries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
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
    registryEntries.push({
      page: pageDocKey,
      file: relPath,
      fieldKey: key,
      type: 'list',
      label: `Dynamic List (${key})`,
      defaultValue: `[dynamic list container: ${key}]`,
      i18n: false
    });
  }

  return registryEntries;
}

function run() {
  const pages = getAllCorePages();
  console.log(`[SCAN CMS] Scanning ${pages.length} pages to build cms-registry.json...`);

  let allEntries = [];
  const byPage = {};

  for (const p of pages) {
    const entries = scanFile(p);
    allEntries = allEntries.concat(entries);
    byPage[p] = entries;
  }

  const registry = {
    schemaVersion: '1.0',
    scannedAt: new Date().toISOString(),
    totalPagesScanned: pages.length,
    totalFieldsBound: allEntries.length,
    fieldsByType: {
      text: allEntries.filter(e => e.type === 'text').length,
      html: allEntries.filter(e => e.type === 'html').length,
      image: allEntries.filter(e => e.type === 'image').length,
      background: allEntries.filter(e => e.type === 'background').length,
      video: allEntries.filter(e => e.type === 'video').length,
      link: allEntries.filter(e => e.type === 'link').length,
      list: allEntries.filter(e => e.type === 'list').length
    },
    entries: allEntries,
    byPage: byPage
  };

  const outPath = path.join(ROOT_DIR, 'cms-registry.json');
  fs.writeFileSync(outPath, JSON.stringify(registry, null, 2), 'utf8');

  console.log(`✓ Registry generated: ${allEntries.length} field bindings indexed.`);
  console.log('Breakdown by Type:');
  console.table(registry.fieldsByType);
}

if (require.main === module) {
  run();
}

module.exports = { scanFile, run };
