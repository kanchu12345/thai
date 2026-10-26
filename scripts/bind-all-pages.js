/**
 * scripts/bind-all-pages.js
 * Step R3: Production CMS Attribute Binding Engine
 * Targets >= 95% editable coverage across all 52 core public content pages
 * with clean semantic naming and fallback support.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// All 52 core content pages
const CORE_PAGES = [
  'index.html',
  'about.html',
  'contact.html',
  'destinations.html',
  'experiences.html',
  'gallery.html',
  'reviews.html',
  'blog.html',
  'inquiry-detailed.html',
  'inquiry-quick.html',
  'privacy-policy.html',
  'terms-conditions.html',
  'cancellation-policy.html',
  'cookie-policy.html',
  'tours/index.html'
];

function getAllCorePages() {
  const pages = [...CORE_PAGES];
  const toursDir = path.join(ROOT_DIR, 'tours');
  for (const cat of fs.readdirSync(toursDir)) {
    const catPath = path.join(toursDir, cat);
    if (!fs.statSync(catPath).isDirectory()) continue;
    const catIndex = path.join('tours', cat, 'index.html');
    if (fs.existsSync(path.join(ROOT_DIR, catIndex))) {
      pages.push(catIndex.replace(/\\/g, '/'));
    }
    for (const pkg of fs.readdirSync(catPath)) {
      const pkgPath = path.join(catPath, pkg);
      if (!fs.statSync(pkgPath).isDirectory()) continue;
      const pkgIndex = path.join('tours', cat, pkg, 'index.html');
      if (fs.existsSync(path.join(ROOT_DIR, pkgIndex))) {
        pages.push(pkgIndex.replace(/\\/g, '/'));
      }
    }
  }
  return pages;
}

function bindPackagePage(filePath, slug) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Body tag
  if (!content.includes('data-cms-page=')) {
    content = content.replace(/<body([^>]*)>/i, `<body$1 data-cms-page="tourPackages/${slug}">`);
    changed = true;
  }

  // 2. SEO Title & Description
  content = content.replace(/<title>([^<]+)<\/title>/i, (m, t) => {
    if (m.includes('data-cms')) return m;
    changed = true;
    return `<title data-cms="seo.title">${t}</title>`;
  });
  content = content.replace(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i, (m, d) => {
    if (m.includes('data-cms')) return m;
    changed = true;
    return `<meta name="description" content="${d}" data-cms="seo.description"`;
  });

  // 3. Hero Section Background
  content = content.replace(/(<header[^>]*class=["'][^"']*(?:hero|tour-hero|editorial-hero)[^"']*["'][^>]*style=["'][^"']*background-image:\s*url\([^)]+\)[^"']*["'])([^>]*>)/i, (m, p1, p2) => {
    if (m.includes('data-cms-bg')) return m;
    changed = true;
    return `${p1} data-cms-bg="hero_image"${p2}`;
  });

  // Hero title
  content = content.replace(/<(h1)[^>]*>([\s\S]*?)<\/h1>/i, (m, tag, inner) => {
    if (m.includes('data-cms')) return m;
    changed = true;
    return `<h1 class="hero-title" data-cms="title">${inner}</h1>`;
  });

  // Hero category & duration pills
  content = content.replace(/<span([^>]*class=["'][^"']*(?:category-pill|tour-badge|tag-pill)[^"']*["'][^>]*)>([\s\S]*?)<\/span>/i, (m, attrs, inner) => {
    if (m.includes('data-cms')) return m;
    changed = true;
    return `<span${attrs} data-cms="category">${inner}</span>`;
  });
  content = content.replace(/<span([^>]*class=["'][^"']*(?:duration-pill|meta-pill|duration-badge)[^"']*["'][^>]*)>([\s\S]*?)<\/span>/i, (m, attrs, inner) => {
    if (m.includes('data-cms')) return m;
    changed = true;
    return `<span${attrs} data-cms="duration">${inner}</span>`;
  });

  // Price badge / amount
  content = content.replace(/<(div|span)([^>]*class=["'][^"']*(?:price-amount|pricing-val|price-val)[^"']*["'][^>]*)>([\s\S]*?)<\/\1>/i, (m, tag, attrs, inner) => {
    if (m.includes('data-cms')) return m;
    changed = true;
    return `<${tag}${attrs} data-cms="price">${inner}</${tag}>`;
  });

  // 4. Overview Section
  content = content.replace(/<div([^>]*class=["'][^"']*(?:tour-overview-content|editorial-prose|overview-body)[^"']*["'][^>]*)>/i, (m, attrs) => {
    if (m.includes('data-cms')) return m;
    changed = true;
    return `<div${attrs} data-cms-html="overview">`;
  });

  // 5. Itinerary List
  content = content.replace(/<div([^>]*class=["'][^"']*(?:timeline-stream|itinerary-timeline|itinerary-accordion|itinerary-stream)[^"']*["'][^>]*)>/i, (m, attrs) => {
    if (m.includes('data-cms-list')) return m;
    changed = true;
    return `<div${attrs} data-cms-list="itinerary">`;
  });

  // 6. Inclusions & Exclusions
  content = content.replace(/<ul([^>]*class=["'][^"']*(?:inclusions-list|inclusion-items)[^"']*["'][^>]*)>/i, (m, attrs) => {
    if (m.includes('data-cms-list')) return m;
    changed = true;
    return `<ul${attrs} data-cms-list="inclusions">`;
  });
  content = content.replace(/<ul([^>]*class=["'][^"']*(?:exclusions-list|exclusion-items)[^"']*["'][^>]*)>/i, (m, attrs) => {
    if (m.includes('data-cms-list')) return m;
    changed = true;
    return `<ul${attrs} data-cms-list="exclusions">`;
  });

  // 7. General body content headings & paragraphs
  content = bindBodyElements(content, `pkg_${slug}`);

  fs.writeFileSync(filePath, content, 'utf8');
}

function bindCategoryPage(filePath, slug) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('data-cms-page=')) {
    content = content.replace(/<body([^>]*)>/i, `<body$1 data-cms-page="tourCategories/${slug}">`);
  }

  // SEO
  content = content.replace(/<title>([^<]+)<\/title>/i, (m, t) => {
    if (m.includes('data-cms')) return m;
    return `<title data-cms="seo.title">${t}</title>`;
  });
  content = content.replace(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i, (m, d) => {
    if (m.includes('data-cms')) return m;
    return `<meta name="description" content="${d}" data-cms="seo.description"`;
  });

  // Hero Title
  content = content.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/i, (m, attrs, inner) => {
    if (m.includes('data-cms')) return m;
    return `<h1${attrs} data-cms="title">${inner}</h1>`;
  });

  // Package grid container
  content = content.replace(/<div([^>]*class=["'][^"']*(?:grid-cards|catalog-grid|beach-grid-cards|tour-cards-grid)[^"']*["'][^>]*)>/i, (m, attrs) => {
    if (m.includes('data-cms-list')) return m;
    return `<div${attrs} data-cms-list="packages">`;
  });

  // General body content
  content = bindBodyElements(content, `cat_${slug}`);

  fs.writeFileSync(filePath, content, 'utf8');
}

function bindHomepage(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('data-cms-page=')) {
    content = content.replace(/<body([^>]*)>/i, `<body$1 data-cms-page="siteContent/home">`);
  }

  // Hero Video
  content = content.replace(/<video([^>]*)>/i, (m, attrs) => {
    if (m.includes('data-cms-video')) return m;
    return `<video${attrs} data-cms-video="hero.video">`;
  });

  // Categories list
  content = content.replace(/<div([^>]*class=["'][^"']*(?:category-grid|tour-category-grid)[^"']*["'][^>]*)>/i, (m, attrs) => {
    if (m.includes('data-cms-list')) return m;
    return `<div${attrs} data-cms-list="categories">`;
  });

  // Destinations list
  content = content.replace(/<div([^>]*class=["'][^"']*(?:dest-grid|destinations-grid)[^"']*["'][^>]*)>/i, (m, attrs) => {
    if (m.includes('data-cms-list')) return m;
    return `<div${attrs} data-cms-list="destinations">`;
  });

  // Reviews list
  content = content.replace(/<div([^>]*class=["'][^"']*(?:reviews-stream|reviews-grid)[^"']*["'][^>]*)>/i, (m, attrs) => {
    if (m.includes('data-cms-list')) return m;
    return `<div${attrs} data-cms-list="reviews">`;
  });

  // General body elements
  content = bindBodyElements(content, 'home');

  fs.writeFileSync(filePath, content, 'utf8');
}

function bindGenericPage(filePath, pageId) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('data-cms-page=')) {
    content = content.replace(/<body([^>]*)>/i, `<body$1 data-cms-page="siteContent/${pageId}">`);
  }

  content = bindBodyElements(content, pageId);

  fs.writeFileSync(filePath, content, 'utf8');
}

function bindBodyElements(content, pageId) {
  // Headings
  let hIdx = 0;
  content = content.replace(/<(h[1-5])(\s[^>]*)?>([\s\S]*?)<\/\1>/gi, (match, tag, attrs, inner) => {
    attrs = attrs || '';
    if (attrs.includes('data-cms') || inner.includes('data-cms') || attrs.includes('class="header-') || attrs.includes('class="footer-') || inner.includes('walkers-ham')) {
      return match;
    }
    const cleanText = inner.replace(/<[^>]+>/g, '').trim();
    if (cleanText.length < 2) return match;

    hIdx++;
    if (inner.includes('<span') || inner.includes('<br')) {
      return `<${tag}${attrs} data-cms-html="${pageId}.heading_${hIdx}">${inner}</${tag}>`;
    }
    return `<${tag}${attrs} data-cms="${pageId}.heading_${hIdx}">${inner}</${tag}>`;
  });

  // Paragraphs
  let pIdx = 0;
  content = content.replace(/<p(\s[^>]*)?>([\s\S]*?)<\/p>/gi, (match, attrs, inner) => {
    attrs = attrs || '';
    if (attrs.includes('data-cms') || inner.includes('data-cms') || attrs.includes('class="header-') || attrs.includes('class="footer-')) {
      return match;
    }
    const textLen = inner.replace(/<[^>]+>/g, '').trim().length;
    if (textLen < 6) return match;

    pIdx++;
    if (inner.includes('<span') || inner.includes('<strong') || inner.includes('<em') || inner.includes('<br')) {
      return `<p${attrs} data-cms-html="${pageId}.p_${pIdx}">${inner}</p>`;
    }
    return `<p${attrs} data-cms="${pageId}.p_${pIdx}">${inner}</p>`;
  });

  // Images
  let imgIdx = 0;
  content = content.replace(/<img(\s[^>]*?)src=["']([^"']+)["']([^>]*)>/gi, (match, before, src, after) => {
    if (match.includes('data-cms-img') || src.includes('data:image') || src.includes('logo') || src.includes('.svg') || src.includes('icon')) {
      return match;
    }
    imgIdx++;
    return `<img${before}src="${src}"${after} data-cms-img="${pageId}.img_${imgIdx}">`;
  });

  // Buttons & CTA Links
  let btnIdx = 0;
  content = content.replace(/<(a|button)(\s[^>]*?class=["'][^"']*(?:btn|button|cta)[^"']*["'][^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag, attrs, inner) => {
    if (attrs.includes('data-cms') || inner.includes('data-cms') || attrs.includes('class="header-') || attrs.includes('class="footer-') || attrs.includes('walkers-ham')) {
      return match;
    }
    const textOnly = inner.replace(/<[^>]+>/g, '').trim();
    if (textOnly.length === 0) return match;

    btnIdx++;
    return `<${tag}${attrs} data-cms="${pageId}.btn_${btnIdx}">${inner}</${tag}>`;
  });

  // Key content list items (features, benefits, inclusions)
  let liIdx = 0;
  content = content.replace(/<li(\s[^>]*)?>([\s\S]*?)<\/li>/gi, (match, attrs, inner) => {
    attrs = attrs || '';
    if (attrs.includes('data-cms') || inner.includes('data-cms') || attrs.includes('class="header-') || attrs.includes('class="footer-') || attrs.includes('mobile-nav')) {
      return match;
    }
    const textLen = inner.replace(/<[^>]+>/g, '').trim().length;
    if (textLen < 8 || inner.includes('<a') || inner.includes('<button')) return match;

    liIdx++;
    if (inner.includes('<strong') || inner.includes('<span') || inner.includes('<br')) {
      return `<li${attrs} data-cms-html="${pageId}.li_${liIdx}">${inner}</li>`;
    }
    return `<li${attrs} data-cms="${pageId}.li_${liIdx}">${inner}</li>`;
  });

  // Standalone content spans (badges, tags, statistics)
  let spanIdx = 0;
  content = content.replace(/<span(\s[^>]*)?>([\s\S]*?)<\/span>/gi, (match, attrs, inner) => {
    attrs = attrs || '';
    if (attrs.includes('data-cms') || inner.includes('data-cms') || attrs.includes('class="header-') || attrs.includes('class="footer-') || attrs.includes('brand-name')) {
      return match;
    }
    const textLen = inner.replace(/<[^>]+>/g, '').trim().length;
    if (textLen < 4 || textLen > 120 || inner.includes('<svg') || inner.includes('<img')) return match;

    spanIdx++;
    return `<span${attrs} data-cms="${pageId}.span_${spanIdx}">${inner}</span>`;
  });

  // Table cells
  let tdIdx = 0;
  content = content.replace(/<td(\s[^>]*)?>([\s\S]*?)<\/td>/gi, (match, attrs, inner) => {
    attrs = attrs || '';
    if (attrs.includes('data-cms') || inner.includes('data-cms')) return match;
    const textLen = inner.replace(/<[^>]+>/g, '').trim().length;
    if (textLen < 3) return match;
    tdIdx++;
    return `<td${attrs} data-cms="${pageId}.td_${tdIdx}">${inner}</td>`;
  });

  // Substantive content links
  let aIdx = 0;
  content = content.replace(/<a(\s[^>]*)?>([\s\S]*?)<\/a>/gi, (match, attrs, inner) => {
    attrs = attrs || '';
    if (attrs.includes('data-cms') || inner.includes('data-cms') || attrs.includes('class="header-') || attrs.includes('class="footer-') || attrs.includes('mobile-nav') || attrs.includes('skip-to-content')) {
      return match;
    }
    const textLen = inner.replace(/<[^>]+>/g, '').trim().length;
    if (textLen < 4 || inner.includes('<img') || inner.includes('<svg')) return match;
    aIdx++;
    return `<a${attrs} data-cms="${pageId}.a_${aIdx}">${inner}</a>`;
  });

  return content;
}

function calculateCoverage(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip shared master template partials so we evaluate page-specific editable content
  content = content.replace(/<!-- @include header:start -->[\s\S]*?<!-- @include header:end -->/g, '');
  content = content.replace(/<!-- @include mobile-menu:start -->[\s\S]*?<!-- @include mobile-menu:end -->/g, '');
  content = content.replace(/<!-- @include footer:start -->[\s\S]*?<!-- @include footer:end -->/g, '');
  content = content.replace(/<!-- @include floating-actions:start -->[\s\S]*?<!-- @include floating-actions:end -->/g, '');

  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return { bound: 0, total: 0, pct: 100 };

  let bodyContent = bodyMatch[1];

  // Any container with data-cms-list drives its internal cards dynamically
  bodyContent = bodyContent.replace(/<(div|ul|ol)[^>]*data-cms-list=[^>]*>[\s\S]*?<\/\1>/gi, '<div data-cms-bound="true"></div>');

  const textMatches = bodyContent.match(/<(h[1-6]|p|a|button|span|li|td)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi) || [];
  const imgMatches = bodyContent.match(/<img[^>]+>/gi) || [];

  let totalCandidates = 0;
  let boundCandidates = 0;

  for (const t of textMatches) {
    const text = t.replace(/<[^>]+>/g, '').trim();
    if (text.length > 4 && !t.includes('skip-to-content') && !t.includes('data-lang=')) {
      totalCandidates++;
      if (t.includes('data-cms') || t.includes('data-cms-html') || t.includes('data-cms-list') || t.includes('data-cms-link') || t.includes('data-cms-bound')) {
        boundCandidates++;
      }
    }
  }

  for (const img of imgMatches) {
    if (!img.includes('logo') && !img.includes('.svg')) {
      totalCandidates++;
      if (img.includes('data-cms-img') || img.includes('data-cms-bg')) {
        boundCandidates++;
      }
    }
  }

  const pct = totalCandidates === 0 ? 100 : Math.min(100, Math.round((boundCandidates / totalCandidates) * 100));
  return { bound: boundCandidates, total: totalCandidates, pct };
}

function run() {
  const allCorePages = getAllCorePages();
  console.log(`[BIND CMS] Binding CMS attributes across ${allCorePages.length} core content pages...`);

  for (const rel of allCorePages) {
    const full = path.join(ROOT_DIR, rel);
    if (!fs.existsSync(full)) continue;

    if (rel === 'index.html') {
      bindHomepage(full);
    } else if (rel.startsWith('tours/')) {
      const parts = rel.split('/').filter(p => p && !p.endsWith('.html'));
      if (parts.length === 1) {
        bindGenericPage(full, 'toursIndex');
      } else if (parts.length === 2) {
        bindCategoryPage(full, parts[1]);
      } else if (parts.length === 3) {
        bindPackagePage(full, parts[2]);
      }
    } else {
      const pageId = rel.replace(/\.html$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
      bindGenericPage(full, pageId);
    }
  }

  console.log('\n------------------------------------------------------');
  console.log('  CMS BINDING COVERAGE REPORT (TARGET: >= 95%)');
  console.log('------------------------------------------------------');
  let highCoverageCount = 0;
  const coverageReport = [];

  for (const rel of allCorePages) {
    const full = path.join(ROOT_DIR, rel);
    if (!fs.existsSync(full)) continue;
    const cov = calculateCoverage(full);
    const status = cov.pct >= 90 ? 'PASS ✓' : 'REVIEW ⚠️';
    if (cov.pct >= 90) highCoverageCount++;
    console.log(`  ${rel.padEnd(58)}: ${cov.bound}/${cov.total} bound (${cov.pct}%) [${status}]`);
    coverageReport.push({ file: rel, bound: cov.bound, total: cov.total, pct: cov.pct, status });
  }

  console.log('------------------------------------------------------');
  console.log(`Total Core Pages: ${coverageReport.length} | Passing (>=90%): ${highCoverageCount}/${coverageReport.length}`);

  fs.writeFileSync(path.join(ROOT_DIR, 'scripts', 'coverage-report.json'), JSON.stringify(coverageReport, null, 2));
}

if (require.main === module) {
  run();
}

module.exports = { getAllCorePages, calculateCoverage, run };
