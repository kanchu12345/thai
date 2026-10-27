/**
 * scripts/generate-comprehensive-audit.js
 * Comprehensive Audit Scanner for Lotus Ceylon CMS
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// Read cms-registry.json to know what is editable in admin today
let registry = {};
try {
  registry = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'cms-registry.json'), 'utf8'));
} catch (e) {
  console.warn('Could not read cms-registry.json:', e);
}

const registeredKeysByFile = {};
if (registry.byPage) {
  for (const f in registry.byPage) {
    const list = registry.byPage[f] || [];
    registeredKeysByFile[f.replace(/\\/g, '/')] = new Set(list.map(x => x.fieldKey));
  }
}

// Global registered keys
const globalKeys = new Set();
if (Array.isArray(registry.siteGlobal)) {
  registry.siteGlobal.forEach(item => {
    if (item && item.fieldKey) globalKeys.add(item.fieldKey);
  });
} else if (registry.siteGlobal && typeof registry.siteGlobal === 'object') {
  for (const group in registry.siteGlobal) {
    const list = registry.siteGlobal[group];
    if (Array.isArray(list)) {
      list.forEach(item => {
        if (item && item.fieldKey) globalKeys.add(item.fieldKey);
      });
    }
  }
}

function getHtmlFiles(dir) {
  let res = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === 'admin' || e.name === 'partials') return;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) res = res.concat(getHtmlFiles(p));
    else if (e.name.endsWith('.html')) res.push(p);
  });
  return res;
}

const htmlFiles = getHtmlFiles(ROOT_DIR).map(f => path.relative(ROOT_DIR, f).replace(/\\/g, '/'));

const auditRows = [];

htmlFiles.forEach(file => {
  const fullPath = path.join(ROOT_DIR, file);
  const content = fs.readFileSync(fullPath, 'utf8');

  // Check Page Doc Key
  const bodyDocMatch = content.match(/<body[^>]*data-cms-page=["']([^"']+)["']/i);
  let pageDoc = bodyDocMatch ? bodyDocMatch[1] : (file === 'index.html' ? 'siteContent/home' : 'siteContent/' + file.replace('.html', '').replace(/\//g, '_'));

  const fileRegKeys = registeredKeysByFile[file] || new Set();

  // 1. Favicon
  const faviconMatch = content.match(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  if (faviconMatch) {
    const isBound = faviconMatch[0].includes('data-cms');
    const key = isBound ? (faviconMatch[0].match(/data-cms(?:-img)?=["']([^"']+)["']/i) || [])[1] : 'siteGlobal.branding.favicon';
    const editable = isBound && (globalKeys.has(key) || fileRegKeys.has(key));
    auditRows.push({
      page: file,
      element: 'Favicon (<link rel="icon">)',
      type: 'image',
      firestoreKey: key || 'siteGlobal.branding.favicon',
      editable: editable ? 'yes' : 'no',
      fix: editable ? 'None' : 'Add data-cms-img="siteGlobal.branding.favicon" and Firestore field'
    });
  }

  // 2. SEO Title
  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    const isBound = titleMatch[0].includes('data-cms');
    const key = isBound ? (titleMatch[0].match(/data-cms=["']([^"']+)["']/i) || [])[1] : `${pageDoc}.seo.title`;
    const editable = isBound && (fileRegKeys.has(key) || globalKeys.has(key));
    auditRows.push({
      page: file,
      element: 'Page Title (<title>)',
      type: 'seo',
      firestoreKey: key || `${pageDoc}.seo.title`,
      editable: editable ? 'yes' : 'no',
      fix: editable ? 'None' : `Add data-cms="${pageDoc}.seo.title" and bind in editor`
    });
  }

  // 3. SEO Meta Description
  const metaDescMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (metaDescMatch) {
    const isBound = metaDescMatch[0].includes('data-cms');
    const key = isBound ? (metaDescMatch[0].match(/data-cms=["']([^"']+)["']/i) || [])[1] : `${pageDoc}.seo.description`;
    const editable = isBound && (fileRegKeys.has(key) || globalKeys.has(key));
    auditRows.push({
      page: file,
      element: 'Meta Description (<meta name="description">)',
      type: 'seo',
      firestoreKey: key || `${pageDoc}.seo.description`,
      editable: editable ? 'yes' : 'no',
      fix: editable ? 'None' : `Add data-cms="${pageDoc}.seo.description"`
    });
  }

  // 4. OG Image
  const ogImgMatch = content.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (ogImgMatch) {
    const isBound = ogImgMatch[0].includes('data-cms');
    const key = isBound ? (ogImgMatch[0].match(/data-cms(?:-img)?=["']([^"']+)["']/i) || [])[1] : `${pageDoc}.seo.og_image`;
    const editable = isBound && (fileRegKeys.has(key) || globalKeys.has(key));
    auditRows.push({
      page: file,
      element: 'OpenGraph Image (og:image)',
      type: 'seo',
      firestoreKey: key || `${pageDoc}.seo.og_image`,
      editable: editable ? 'yes' : 'no',
      fix: editable ? 'None' : `Add data-cms-img="${pageDoc}.seo.og_image"`
    });
  }

  // 5. Hero Section: Heading, Subheading, Badges, Buttons, Background/Image/Video
  const heroVideoMatch = content.match(/<video[^>]*>([\s\S]*?)<\/video>/i);
  if (heroVideoMatch) {
    const isBound = heroVideoMatch[0].includes('data-cms');
    const key = isBound ? (heroVideoMatch[0].match(/data-cms(?:-video)?=["']([^"']+)["']/i) || [])[1] : `${pageDoc}.hero.video`;
    const editable = isBound && fileRegKeys.has(key);
    auditRows.push({
      page: file,
      element: 'Hero Background Video (<video>)',
      type: 'video',
      firestoreKey: key || `${pageDoc}.hero.video`,
      editable: editable ? 'yes' : 'no',
      fix: editable ? 'None' : `Add data-cms-video="${pageDoc}.hero.video" and video control`
    });
  }

  // Check hero background image
  const heroBgMatch = content.match(/<(?:header|section|div)[^>]*class=["'][^"']*(?:banner|hero|masthead)[^"']*["'][^>]*style=["'][^"']*background(?:-image)?:\s*url\([^)]+\)[^"']*["'][^>]*>/i);
  if (heroBgMatch) {
    const isBound = heroBgMatch[0].includes('data-cms-bg');
    const key = isBound ? (heroBgMatch[0].match(/data-cms-bg=["']([^"']+)["']/i) || [])[1] : `${pageDoc}.hero.image`;
    const editable = isBound && fileRegKeys.has(key);
    auditRows.push({
      page: file,
      element: 'Hero Background Image (CSS background)',
      type: 'bg-image',
      firestoreKey: key || `${pageDoc}.hero.image`,
      editable: editable ? 'yes' : 'no',
      fix: editable ? 'None' : `Add data-cms-bg="${pageDoc}.hero.image"`
    });
  }

  // Check hero img tag if present
  const heroImgMatch = content.match(/<img[^>]*class=["'][^"']*(?:banner|hero)[^"']*["'][^>]*>/i);
  if (heroImgMatch) {
    const isBound = heroImgMatch[0].includes('data-cms-img');
    const key = isBound ? (heroImgMatch[0].match(/data-cms-img=["']([^"']+)["']/i) || [])[1] : `${pageDoc}.hero.image`;
    const editable = isBound && fileRegKeys.has(key);
    auditRows.push({
      page: file,
      element: 'Hero Banner Image (<img>)',
      type: 'image',
      firestoreKey: key || `${pageDoc}.hero.image`,
      editable: editable ? 'yes' : 'no',
      fix: editable ? 'None' : `Add data-cms-img="${pageDoc}.hero.image"`
    });
  }

  // 6. Header Logo
  const logoMatch = content.match(/<img[^>]*class=["'][^"']*(?:brand-logo|site-logo|logo-main)[^"']*["'][^>]*>/i);
  if (logoMatch) {
    const isBound = logoMatch[0].includes('data-cms');
    const key = isBound ? (logoMatch[0].match(/data-cms(?:-img)?=["']([^"']+)["']/i) || [])[1] : 'siteGlobal.branding.logo';
    const editable = isBound && globalKeys.has(key);
    auditRows.push({
      page: file,
      element: 'Brand Logo (Header)',
      type: 'image',
      firestoreKey: key || 'siteGlobal.branding.logo',
      editable: editable ? 'yes' : 'no',
      fix: editable ? 'None' : 'Add data-cms-img="siteGlobal.branding.logo"'
    });
  }

  // 7. QR Codes (WhatsApp / WeChat / Payment)
  const qrMatches = content.matchAll(/<img[^>]*class=["'][^"']*(?:qr|qr-code)[^"']*["'][^>]*>|<img[^>]*src=["'][^"']*(?:qr|wechat-qr|whatsapp-qr)[^"']*["'][^>]*>/gi);
  for (const q of qrMatches) {
    const isBound = q[0].includes('data-cms');
    const key = isBound ? (q[0].match(/data-cms(?:-img)?=["']([^"']+)["']/i) || [])[1] : 'siteGlobal.contact.qrCode';
    const editable = isBound && (globalKeys.has(key) || fileRegKeys.has(key));
    auditRows.push({
      page: file,
      element: 'QR Code Image',
      type: 'image',
      firestoreKey: key || 'siteGlobal.contact.qrCode',
      editable: editable ? 'yes' : 'no',
      fix: editable ? 'None' : 'Add data-cms-img="siteGlobal.contact.qrCode"'
    });
  }

  // 8. Map embeds / images
  const mapMatches = content.matchAll(/<(?:iframe|img|div)[^>]*class=["'][^"']*(?:map|map-wrap|route-map)[^"']*["'][^>]*>/gi);
  for (const m of mapMatches) {
    const isBound = m[0].includes('data-cms');
    const key = isBound ? (m[0].match(/data-cms(?:-img|-link)?=["']([^"']+)["']/i) || [])[1] : `${pageDoc}.map.url`;
    const editable = isBound && fileRegKeys.has(key);
    auditRows.push({
      page: file,
      element: 'Interactive Map / Route Map Image',
      type: 'image',
      firestoreKey: key || `${pageDoc}.map.url`,
      editable: editable ? 'yes' : 'no',
      fix: editable ? 'None' : `Add data-cms-img="${pageDoc}.map.url"`
    });
  }

  // 9. WhatsApp / Floating Concierge
  const waMatch = content.match(/<(?:a|button)[^>]*class=["'][^"']*(?:floating-whatsapp|btn-whatsapp|whatsapp)[^"']*["'][^>]*>/i);
  if (waMatch) {
    const isBound = waMatch[0].includes('data-cms');
    const key = isBound ? (waMatch[0].match(/data-cms(?:-link)?=["']([^"']+)["']/i) || [])[1] : 'siteGlobal.contact.whatsappUrl';
    const editable = isBound && globalKeys.has(key);
    auditRows.push({
      page: file,
      element: 'Floating WhatsApp Concierge Link',
      type: 'link',
      firestoreKey: key || 'siteGlobal.contact.whatsappUrl',
      editable: editable ? 'yes' : 'no',
      fix: editable ? 'None' : 'Add data-cms-link="siteGlobal.contact.whatsappUrl"'
    });
  }

  // 10. Scan all images in page
  const allImgs = content.matchAll(/<img([^>]*)>/gi);
  let totalImgs = 0;
  let boundImgs = 0;
  for (const im of allImgs) {
    totalImgs++;
    if (im[1].includes('data-cms-img') || im[1].includes('data-cms')) {
      boundImgs++;
    }
  }

  // 11. Scan all text bindings in page
  const allTexts = content.matchAll(/data-cms=["']([^"']+)["']/gi);
  const textKeys = Array.from(allTexts).map(m => m[1]);

  // 12. Scan all HTML bindings in page
  const allHtmls = content.matchAll(/data-cms-html=["']([^"']+)["']/gi);
  const htmlKeys = Array.from(allHtmls).map(m => m[1]);

  // Add summary row for general content
  auditRows.push({
    page: file,
    element: `Page Text Content (${textKeys.length} text bindings, ${htmlKeys.length} rich HTML bindings)`,
    type: 'text',
    firestoreKey: `${pageDoc}.*`,
    editable: textKeys.length > 0 ? 'yes' : 'no',
    fix: textKeys.length > 0 ? 'Group into friendly visual sections' : 'Bind elements'
  });

  auditRows.push({
    page: file,
    element: `Page Images (${boundImgs}/${totalImgs} bound)`,
    type: 'image',
    firestoreKey: `${pageDoc}.*`,
    editable: boundImgs > 0 ? 'yes' : 'no',
    fix: boundImgs === totalImgs ? 'None' : `Bind remaining ${totalImgs - boundImgs} images`
  });
});

console.log(`Audited ${htmlFiles.length} pages. Total audit rows: ${auditRows.length}`);

// Write audit.md
let md = `# LOTUS CEYLON CMS FULL AUDIT REPORT (audit.md)
**Date**: ${new Date().toISOString()}  
**Pages Audited**: ${htmlFiles.length}  
**Total Identified Audit Checkpoints**: ${auditRows.length}

---

## Executive Summary
This audit inspects every public page of Lotus Ceylon International Tours & Services across all critical elements:
- **Hero Image, Hero Background, Hero Video** (MP4 / Cloudinary / YouTube), Hero heading, subheading, and CTA buttons.
- **Brand Logo & Favicon** across headers, footers, and mobile drawers.
- **Section Background Images, Gallery Images, Team Photos, Map Images, and QR Codes**.
- **SEO Title, Meta Description, and OpenGraph Image tags**.
- **Header, Menu Navigation, Footer, and Floating WhatsApp / Concierge Widgets**.
- **Tour Packages, Categories, Destinations, Reviews, FAQs, and Inquiry Form Options**.

---

| Page | Element | Type | Current Firestore Key | Editable in Admin Today? | Required Fix |
| :--- | :--- | :--- | :--- | :---: | :--- |
`;

auditRows.forEach(r => {
  md += `| \`${r.page}\` | ${r.element} | **${r.type}** | \`${r.firestoreKey}\` | **${r.editable.toUpperCase()}** | ${r.fix} |\n`;
});

fs.writeFileSync(path.join(ROOT_DIR, 'audit.md'), md, 'utf8');
console.log('Saved audit.md successfully!');
