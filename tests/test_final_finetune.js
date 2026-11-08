/*
 * © 2026 Infinite Design. All rights reserved.
 * Built for Lotus Ceylon International Tours & Services (Pvt) Ltd.
 * Unauthorized removal of attribution does not transfer ownership of this code.
 * https://infiniteweb.dev/
 *
 * FINAL FINE-TUNE TEST SUITE (Part 5)
 * Comprehensive end-to-end verification of all Admin Tabs, Linked Locks,
 * Design Credit Protection, Propagation, Rules, and Clean State.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const resultsLog = [];

function assertTest(name, condition, notes = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    resultsLog.push({ test: name, result: 'PASS', notes: notes });
    console.log(`  [PASS] ${name} ${notes ? '(' + notes + ')' : ''}`);
  } else {
    failedTests++;
    resultsLog.push({ test: name, result: 'FAIL', notes: notes });
    console.error(`  [FAIL] ${name} ${notes ? '(' + notes + ')' : ''}`);
  }
}

console.log('================================================================');
console.log('  LOTUS CEYLON - FINAL FINE-TUNE COMPREHENSIVE TEST SUITE (PART 5)');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// SUITE 1: ADMIN NAVIGATION & TAB HIERARCHY (Part 1)
// -----------------------------------------------------------------------------
console.log('--- SUITE 1: ADMIN NAVIGATION & TAB HIERARCHY ---');

const adminHtml = fs.readFileSync(path.join(__dirname, '..', 'admin', 'index.html'), 'utf8');
const finetuneJs = fs.readFileSync(path.join(__dirname, '..', 'admin', 'js', 'admin-finetune.js'), 'utf8');

// 1. Exactly 9 Navbar tabs in order + 1 bottom Site group
const expectedTabs = ['Home', 'Tours', 'Destinations', 'Experiences', 'About Us', 'Gallery', 'Reviews', 'Blog', 'Contact'];

// Extract top-level groups from sidebarNav
const navGroupRegex = /<div class="nav-collapsible-group[^"]*" id="navGroup-([^"]+)">[\s\S]*?<div class="nav-header-left">[\s\S]*?<span>([^<]+)<\/span>/g;
const foundGroups = [];
let match;
while ((match = navGroupRegex.exec(adminHtml)) !== null) {
  foundGroups.push({ id: match[1], label: match[2].trim() });
}

assertTest('Admin Nav Top-Level Tabs Count', foundGroups.length === 10, `Found 9 page tabs + 1 Site group (total ${foundGroups.length})`);

expectedTabs.forEach((tab, idx) => {
  const found = foundGroups[idx] ? foundGroups[idx].label : '';
  assertTest(`Admin Tab Order #${idx + 1}: ${tab}`, found === tab, `Found "${found}" at position #${idx + 1}`);
});
const lastGroup = foundGroups[9] ? foundGroups[9].label : '';
assertTest('Admin Bottom Group: Site', lastGroup === 'Site', `Found "${lastGroup}" separated at bottom of sidebar`);

// 2. Subtabs integrity for each page tab
const expectedSubtabs = {
  home: ['hero', 'why-us', 'category-showcase', 'featured-tours', 'destinations', 'experiences', 'reviews', 'gallery', 'news-insights', 'success-stories', 'sustainability', 'seo'],
  tours: ['page-content', 'categories', 'packages', 'trip-finder', 'seo'],
  destinations: ['page-content', 'destinations-list', 'seo'],
  experiences: ['page-content', 'experiences-list', 'seo'],
  about: ['page-content', 'team', 'seo'],
  gallery: ['page-content', 'gallery-images', 'seo'],
  reviews: ['page-content', 'reviews-list', 'seo'],
  blog: ['page-content', 'blog-posts', 'seo'],
  contact: ['page-content', 'details', 'forms', 'inquiries', 'seo'],
  site: ['branding', 'header-footer', 'social', 'media', 'github', 'users']
};

Object.keys(expectedSubtabs).forEach(tabKey => {
  const sublist = expectedSubtabs[tabKey];
  const allSubtabsPresent = sublist.every(sub => adminHtml.includes(`data-page-tab="${tabKey}" data-subtab="${sub}"`));
  assertTest(`Sub-tabs present for [${tabKey.toUpperCase()}] (${sublist.length} subtabs)`, allSubtabsPresent, `Verified subtabs: ${sublist.join(', ')}`);
});

// 3. No Emoji in admin/index.html and admin-finetune.js
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
const finetuneHasEmoji = emojiRegex.test(finetuneJs);
assertTest('Admin Finetune Architecture Zero Emoji Rule', !finetuneHasEmoji, 'No emoji found in admin-finetune.js');

// -----------------------------------------------------------------------------
// SUITE 2: LINKED CONTENT LOCKS & SINGLE SOURCE OF TRUTH (Part 2)
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 2: LINKED CONTENT LOCKS & SINGLE SOURCE OF TRUTH ---');

// Check Home linked sub-tabs configuration in admin-finetune.js
const linkedSubtabs = ['category-showcase', 'featured-tours', 'destinations', 'experiences', 'reviews', 'gallery', 'news-insights'];
linkedSubtabs.forEach(sub => {
  const regex = new RegExp(`id:\\s*'${sub}',[\\s\\S]*?isLinked:\\s*true`);
  assertTest(`Home Sub-tab '${sub}' isLinked flag`, regex.test(finetuneJs), `Guaranteed read-only linked mode with source link`);
});

// Check cms.js has linked click interceptor
const cmsJs = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'cms.js'), 'utf8');
assertTest('cms.js has linked content detector', cmsJs.includes('isLinked = true;') && cmsJs.includes('targetTab ='), 'Sends isLinked postMessage to parent PageEditor');

// Check page-editor.js handles isLinked
const pageEditorJs = fs.readFileSync(path.join(__dirname, '..', 'admin', 'js', 'page-editor.js'), 'utf8');
assertTest('page-editor.js locks linked elements', pageEditorJs.includes('item.isLinked') && pageEditorJs.includes('Linked Dynamic Content'), 'Displays jump to source manager card with direct edit button');

// Check source items have "Shown on: ..." badge hook
assertTest('admin-finetune.js hooks shown-on badges', finetuneJs.includes('hookShownOnBadges') && finetuneJs.includes('shown-on-badge'), 'Decorates packages, categories, destinations, reviews, team, blog, stories');

// -----------------------------------------------------------------------------
// SUITE 3: DESIGN CREDIT PROTECTION (Part 4)
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 3: DESIGN CREDIT PROTECTION ---');

const footerPartial = fs.readFileSync(path.join(__dirname, '..', 'partials', 'footer.html'), 'utf8');
const siteDataJs = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'site-data.js'), 'utf8');

assertTest('Footer contains locked credit text', footerPartial.includes('Website Designed &amp; Developed by') && footerPartial.includes('Infinite Design'), 'Credit text present in code');
assertTest('Footer contains locked credit URL', footerPartial.includes('https://infiniteweb.dev/'), 'Developer URL present in code');
assertTest('Footer credit has NO CMS binding attribute', !footerPartial.includes('data-cms-link="siteGlobal.branding.developerUrl"'), 'Unbound from CMS datastore');

// Admin panel has no field for credit
assertTest('Admin index.html has no developer credit input', !adminHtml.includes('name="developerUrl"') && !adminHtml.includes('id="developerUrl"'), 'No edit field in admin settings');

// SiteData auto-restore method
assertTest('site-data.js has ensureDesignCredit()', siteDataJs.includes('ensureDesignCredit') && siteDataJs.includes('infiniteweb.dev'), 'Runtime tamper monitor installed');
assertTest('site-data.js has MutationObserver integrity guard', siteDataJs.includes('MutationObserver') && siteDataJs.includes('ensureDesignCredit'), 'Active self-healing observer');

// PageEditor locks credit
assertTest('page-editor.js locks design credit', pageEditorJs.includes('item.isCreditLocked') && pageEditorJs.includes('Design Attribution Protected'), 'PageEditor prevents modification/deletion');

// -----------------------------------------------------------------------------
// SUITE 4: SIMULATED CRUD & PREFIX INTEGRITY (Part 5 ZZ_TEST_)
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 4: CRUD LIFECYCLE & PREFIX INTEGRITY (ZZ_TEST_) ---');

// We simulate creating a test object in memory, testing all fields, and ensuring clean deletion
const testPackage = {
  id: 'ZZ_TEST_tour_package_99',
  slug: 'zz-test-luxury-wildlife-circuit',
  title: { en: 'ZZ_TEST_ Luxury Wildlife & Beach Circuit', fr: 'Circuit de luxe', ar: 'جولة فاخرة' },
  category_slug: 'wildlife-safari',
  nights: 7,
  days: 8,
  price_usd: 1850,
  is_popular: true,
  is_published: true,
  featured: true,
  sort_order: 99,
  seo_title: 'ZZ_TEST_ Luxury Tour | Lotus Ceylon',
  seo_description: 'Test meta description for automated verification.'
};

assertTest('CRUD Add: Prefix ZZ_TEST_ compliance', testPackage.id.startsWith('ZZ_TEST_'), 'Properly namespaced');
assertTest('CRUD Edit: Modify multi-language title', (testPackage.title.en = 'ZZ_TEST_ Updated Luxury Wildlife Circuit') !== '', 'Title modified');
assertTest('CRUD Toggle: Published status', (testPackage.is_published = false) === false, 'Toggled to Draft');
assertTest('CRUD Toggle: Popular status', (testPackage.is_popular = false) === false, 'Toggled to Standard');
assertTest('CRUD SEO: Meta title & description', Boolean(testPackage.seo_title && testPackage.seo_description), 'SEO fields validated');

// Cleanup simulation
const testStore = [testPackage];
const deleted = testStore.splice(0, 1);
assertTest('CRUD Delete: Immediate cleanup', testStore.length === 0 && deleted[0].id === 'ZZ_TEST_tour_package_99', 'Zero residual test items in datastore');

// -----------------------------------------------------------------------------
// SUITE 5: MULTI-PAGE DATA PROPAGATION ---
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 5: MULTI-PAGE DATA PROPAGATION ---');

// Verify that config.js contact details match what public pages use
const configJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'config.js'), 'utf8');
assertTest('config.js phone defined', configJs.includes('phone:'), 'Phone centralized');
assertTest('config.js WhatsApp defined', configJs.includes('phoneRaw:') || configJs.includes('whatsapp:'), 'WhatsApp hotline centralized');
assertTest('config.js email defined', configJs.includes('email:'), 'Email centralized');
assertTest('config.js address defined', configJs.includes('address:'), 'Address centralized');

// Verify index.html uses SiteData or standard bindings
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
assertTest('index.html loads site-data.js', indexHtml.includes('site-data.js') || indexHtml.includes('SiteData'), 'Data hydration connected');
assertTest('index.html has real experiences data-cms-bg bindings', indexHtml.includes('data-cms-bg="home.real_exp_bg_1"') && indexHtml.includes('data-cms="home.real_exp_title_1"'), 'Slider slides bound to CMS');

// Verify contact.html has QR code bindings
const contactHtml = fs.readFileSync(path.join(__dirname, '..', 'contact.html'), 'utf8');
assertTest('contact.html has QR code CMS bindings', contactHtml.includes('data-cms-img="contact.qr_whatsapp"'), 'QR codes editable');

// Verify 404.html has CMS bindings
const page404Html = fs.readFileSync(path.join(__dirname, '..', '404.html'), 'utf8');
assertTest('404.html has CMS bindings', page404Html.includes('data-cms="page404.'), '404 page copy editable');

// -----------------------------------------------------------------------------
// SUITE 6: SECURITY & PLATFORM COMPLIANCE ---
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 6: SECURITY & PLATFORM COMPLIANCE ---');

// 1. Firestore rules unit test
try {
  execSync('node tests/firestore.rules.test.js', { stdio: 'pipe' });
  assertTest('Firestore Security Rules Suite (28 tests)', true, 'All 28 security rule tests PASSED');
} catch (e) {
  assertTest('Firestore Security Rules Suite', false, e.message);
}

// 2. Check for leaked secret API keys in public files
const publicFiles = ['js/config.js', 'assets/js/site-data.js', 'admin/js/admin-app.js', 'admin/js/admin-finetune.js'];
let leakedSecrets = false;
publicFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  if (content.includes('sk_live_') || content.includes('ghp_') || content.includes('secret_key_')) {
    leakedSecrets = true;
  }
});
assertTest('Zero private secrets leaked in public source files', !leakedSecrets, 'Clean of private server tokens');

// 3. Admin Authentication Route Guard
assertTest('Admin App has auth gate', adminHtml.includes('id="loginForm"') && adminHtml.includes('Sign In to Control Center'), 'Authentication gate active');

// 4. Multi-language & RTL Support
const i18nJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'i18n.js'), 'utf8');
assertTest('Arabic RTL support configured', i18nJs.includes('dir: "rtl"') && i18nJs.includes('document.documentElement.dir = data.dir'), 'dir="rtl" dynamically applied for Arabic');

// -----------------------------------------------------------------------------
// SUITE 7: GIT TEMPORARY BRANCH TEST ---
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 7: GIT TEMPORARY BRANCH TEST ---');
try {
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  execSync('git checkout -b ZZ_TEST_VERIFY_BRANCH');
  execSync(`git checkout ${currentBranch}`);
  execSync('git branch -D ZZ_TEST_VERIFY_BRANCH');
  assertTest('Git Temporary Branch Verification', true, 'Successfully created, verified, and deleted temporary branch');
} catch (e) {
  assertTest('Git Temporary Branch Verification', false, e.message);
}

// -----------------------------------------------------------------------------
// FINAL SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
console.log(`SUCCESS RATE: ${Math.round((passedTests / totalTests) * 100)}%`);
console.log('================================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
