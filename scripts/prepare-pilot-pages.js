/**
 * scripts/prepare-pilot-pages.js
 * Prepares the two Pilot pages:
 * 1. index.html
 * 2. tours/beach/southern-sands-serenade/index.html
 * 
 * - Injects partial placeholder markers (<!-- @include ... -->)
 * - Adds data-cms-page attributes to <body>
 * - Binds data-cms, data-cms-html, data-cms-img, data-cms-bg, data-cms-video, data-cms-list
 * - Runs scripts/build-partials.js to assemble them
 */

const fs = require('fs');
const path = require('path');
const { processFile, loadPartials } = require('./build-partials');

const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Prepare index.html
function prepareIndexHtml() {
  const filePath = path.join(ROOT_DIR, 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');

  // Add data-cms-page="siteContent/home" to body if not present
  if (!content.includes('data-cms-page=')) {
    content = content.replace(/<body>/i, '<body data-cms-page="siteContent/home">');
  }

  // Replace Header with <!-- @include header -->
  const headerRegex = /<!-- Site Header & Navigation[\s\S]*?<\/header>/i;
  if (headerRegex.test(content) && !content.includes('<!-- @include header')) {
    content = content.replace(headerRegex, '<!-- @include header -->');
  }

  // Replace Mobile Menu with <!-- @include mobile-menu -->
  const mobileMenuRegex = /<!-- Full-Screen Slide-in Mobile Navigation Menu -->[\s\S]*?<div [^>]*id="mobileNavFullscreen"[\s\S]*?<\/div>\s*<\/div>\s*(<!-- Full-Screen Slide-in Mobile Navigation Menu -->)*/i;
  if (mobileMenuRegex.test(content) && !content.includes('<!-- @include mobile-menu')) {
    content = content.replace(mobileMenuRegex, '<!-- @include mobile-menu -->');
  }

  // Replace Footer with <!-- @include footer -->
  const footerRegex = /<!-- Site Footer \(Unified Walkers Standard[\s\S]*?<\/footer>/i;
  if (footerRegex.test(content) && !content.includes('<!-- @include footer')) {
    content = content.replace(footerRegex, '<!-- @include footer -->');
  }

  // Replace Floating actions with <!-- @include floating-actions -->
  const fabRegex = /<!-- Unified Mobile-First Floating Action Group[\s\S]*?<a class="floating-inquire-tab"[\s\S]*?<\/a>/i;
  if (fabRegex.test(content) && !content.includes('<!-- @include floating-actions')) {
    content = content.replace(fabRegex, '<!-- @include floating-actions -->');
  }

  // Bind Hero Content in index.html
  content = content.replace(
    '<span class="banner-subtitle-badge">SRI LANKA TAILOR-MADE LUXURY HOLIDAYS</span>',
    '<span class="banner-subtitle-badge" data-cms="hero.badge">SRI LANKA TAILOR-MADE LUXURY HOLIDAYS</span>'
  );
  content = content.replace(
    /<h1 class="banner-main-title">[\s\S]*?<\/h1>/i,
    '<h1 class="banner-main-title" data-cms-html="hero.title">\n              Discover Sri Lanka’s <br/><span>Timeless Wonder</span>\n</h1>'
  );
  content = content.replace(
    /<p class="paragraph--20" style="color: #E2EBF1; max-width: 680px; margin-bottom: 2rem;">[\s\S]*?<\/p>/i,
    '<p class="paragraph--20" style="color: #E2EBF1; max-width: 680px; margin-bottom: 2rem;" data-cms="hero.subtitle">\n              Step into an island of extraordinary heritage, misty tea hills, untamed wildlife, and sun-kissed coasts — curated with unmatched luxury and heartfelt devotion.\n            </p>'
  );

  // Bind video and hero img
  content = content.replace(
    '<source media="(min-width: 993px)" src="./assets/videos/hero-banner.mp4" type="video/mp4"/>',
    '<source media="(min-width: 993px)" src="./assets/videos/hero-banner.mp4" type="video/mp4" data-cms-video="hero.video"/>'
  );
  content = content.replace(
    '<img alt="Sigiriya Ancient Rock Citadel Aerial View" class="hero-img-bg" fetchpriority="high" height="1080" src="./assets/images/home/hero-sigiriya-aerial-1.webp" width="1920"/>',
    '<img alt="Sigiriya Ancient Rock Citadel Aerial View" class="hero-img-bg" fetchpriority="high" height="1080" src="./assets/images/home/hero-sigiriya-aerial-1.webp" width="1920" data-cms-img="hero.image" data-cms-alt="hero.title"/>'
  );

  // Ensure cms.js is present before </body>
  if (!content.includes('assets/js/cms.js')) {
    content = content.replace('</body>', '<script defer src="./assets/js/cms.js"></script>\n</body>');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ Prepared index.html with CMS bindings & partial markers');
}

// 2. Prepare tours/beach/southern-sands-serenade/index.html
function prepareTourDetailPage() {
  const filePath = path.join(ROOT_DIR, 'tours', 'beach', 'southern-sands-serenade', 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');

  // Add data-cms-page to body
  content = content.replace(
    /<body class="page-tour-detail">/i,
    '<body class="page-tour-detail" data-cms-page="tourPackages/southern-sands-serenade">'
  );

  // Replace Header
  const headerRegex = /<!-- Site Header & Navigation[\s\S]*?<\/header>/i;
  if (headerRegex.test(content) && !content.includes('<!-- @include header')) {
    content = content.replace(headerRegex, '<!-- @include header -->');
  }

  // Replace Mobile Menu
  const mobileMenuRegex = /<!-- Full-Screen Slide-in Mobile Navigation Menu -->[\s\S]*?<div [^>]*id="mobileNavFullscreen"[\s\S]*?<\/div>\s*<\/div>\s*(<!-- Full-Screen Slide-in Mobile Navigation Menu -->)*/i;
  if (mobileMenuRegex.test(content) && !content.includes('<!-- @include mobile-menu')) {
    content = content.replace(mobileMenuRegex, '<!-- @include mobile-menu -->');
  }

  // Replace Footer
  const footerRegex = /<!-- Site Footer \(Unified Walkers Standard[\s\S]*?<\/footer>/i;
  if (footerRegex.test(content) && !content.includes('<!-- @include footer')) {
    content = content.replace(footerRegex, '<!-- @include footer -->');
  }

  // Replace Floating Actions
  const fabRegex = /<!-- Unified Mobile-First Floating Action Group[\s\S]*?<a href="https:\/\/wa\.me\/94715422384[^>]*>[\s\S]*?<\/a>\s*<\/div>/i;
  if (fabRegex.test(content) && !content.includes('<!-- @include floating-actions')) {
    content = content.replace(fabRegex, '<!-- @include floating-actions -->');
  }

  // Bind Tour Hero Section
  content = content.replace(
    /<section class="tour-hero-section" id="tourHero"[^>]*>/i,
    '<section class="tour-hero-section" id="tourHero" style="background-image: url(\'../../../assets/images/beach/mirissa-1.webp\');" data-cms-bg="hero_image">'
  );
  content = content.replace(
    '<span class="tour-badge-pill tour-badge-gold">9 Nights &bull; 10 Days</span>',
    '<span class="tour-badge-pill tour-badge-gold" data-cms="durationText">9 Nights &bull; 10 Days</span>'
  );
  content = content.replace(
    '<span class="tour-badge-pill tour-badge-glass">Sri Lanka Luxury Beach Holidays</span>',
    '<span class="tour-badge-pill tour-badge-glass" data-cms="category">Sri Lanka Luxury Beach Holidays</span>'
  );
  content = content.replace(
    '<span class="hero-title-main">Southern Sands Serenade</span>',
    '<span class="hero-title-main" data-cms="title">Southern Sands Serenade</span>'
  );
  content = content.replace(
    '<span class="hero-title-accent">Sun-Kissed Bays & Blue Whales</span>',
    '<span class="hero-title-accent" data-cms="subtitle">Sun-Kissed Bays & Blue Whales</span>'
  );
  content = content.replace(
    '<p class="tour-hero-tagline">Sun-Kissed Bays, Blue Whales & Dutch Ramparts</p>',
    '<p class="tour-hero-tagline" data-cms="tagline">Sun-Kissed Bays, Blue Whales & Dutch Ramparts</p>'
  );

  // Bind Itinerary List:
  // Add data-cms-list="itinerary" to .itinerary-timeline
  // And add child data-cms attributes to Day 1 item template
  content = content.replace(
    '<div class="itinerary-timeline">',
    '<div class="itinerary-timeline" data-cms-list="itinerary">'
  );

  // Bind Day 1 elements
  content = content.replace(
    /<div class="itinerary-item" data-day="1">\s*<div class="itinerary-day-badge">Day 1<\/div>\s*<div class="itinerary-content">\s*<h3 class="itinerary-day-title">([\s\S]*?)<\/h3>\s*<p class="itinerary-day-desc">([\s\S]*?)<\/p>\s*<div class="itinerary-meta-tags">\s*<span class="itinerary-meta-pill"><span class="pill-icon">🏨<\/span> Overnight: ([\s\S]*?)<\/span>\s*<span class="itinerary-meta-pill"><span class="pill-icon">🍽️<\/span> ([\s\S]*?)<\/span>\s*<span class="itinerary-meta-pill"><span class="pill-icon">🚗<\/span> ([\s\S]*?)<\/span>/i,
    `<div class="itinerary-item" data-day="1">
          <div class="itinerary-day-badge" data-cms="dayBadge">Day 1</div>
          <div class="itinerary-content">
            <h3 class="itinerary-day-title" data-cms="title">$1</h3>
            <p class="itinerary-day-desc" data-cms-html="description">$2</p>
            <div class="itinerary-meta-tags">
              <span class="itinerary-meta-pill"><span class="pill-icon">🏨</span> Overnight: <span data-cms="hotel">$3</span></span>
              <span class="itinerary-meta-pill"><span class="pill-icon">🍽️</span> <span data-cms="meals">$4</span></span>
              <span class="itinerary-meta-pill"><span class="pill-icon">🚗</span> <span data-cms="travelTime">$5</span></span>`
  );

  // Ensure cms.js is present before </body>
  if (!content.includes('assets/js/cms.js')) {
    content = content.replace('</body>', '<script defer src="../../../assets/js/cms.js"></script>\n</body>');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ Prepared southern-sands-serenade/index.html with CMS bindings & partial markers');
}

function main() {
  prepareIndexHtml();
  prepareTourDetailPage();

  console.log('\n[BUILD] Injecting Partials...');
  const partials = loadPartials();
  processFile(path.join(ROOT_DIR, 'index.html'), partials);
  processFile(path.join(ROOT_DIR, 'tours', 'beach', 'southern-sands-serenade', 'index.html'), partials);
  console.log('[BUILD COMPLETE] Both pilot pages compiled successfully!');
}

main();
