/**
 * Lotus Ceylon - Tour Package Canonical Consolidation & Normalization Script
 * Merges legacy tours + packages collections and local JSON data into canonical 'tourPackages' schema.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');

// Image alias map for legacy paths
const IMAGE_ALIAS_MAP = {
  'assets/tours/beach/southern-sands-1.jpg': 'assets/images/beach/mirissa-1.webp',
  'assets/tours/beach/seaboard-odyssey-1.jpg': 'assets/images/beach/unawatuna-2.webp',
  'assets/tours/beach/eastern-sanctuary-1.jpg': 'assets/images/beach/pasikudah-5.webp',
  'assets/tours/cultural/royal-kingdoms-1.jpg': 'assets/images/cultural/sigiriya-1.webp',
  'assets/tours/cultural/sacred-triangle-1.jpg': 'assets/images/cultural/dambulla-cave-temple-2.webp',
  'assets/tours/cultural/three-millennia-1.jpg': 'assets/images/cultural/polonnaruwa-gal-vihara-3.webp',
  'assets/tours/wildlife/big-five-1.jpg': 'assets/images/wildlife/yala-leopard-1.webp',
  'assets/tours/wildlife/rainforest-1.jpg': 'assets/images/wildlife/sinharaja-rainforest-5.webp',
  'assets/tours/wildlife/predator-trail-1.jpg': 'assets/images/wildlife/minneriya-elephant-gathering-2.webp',
  'assets/tours/wildlife/biosphere-odyssey-1.jpg': 'assets/images/wildlife/udawalawe-3.webp'
};

function resolveImagePath(rawPath, category = '') {
  if (!rawPath) {
    if (category && fs.existsSync(path.join(REPO_ROOT, 'assets/images', category))) {
      const files = fs.readdirSync(path.join(REPO_ROOT, 'assets/images', category));
      if (files.length > 0) return `assets/images/${category}/${files[0]}`;
    }
    return 'assets/images/home/hero-sigiriya-aerial-1.webp';
  }

  rawPath = rawPath.replace(/^[./]+/, '').trim();
  if (IMAGE_ALIAS_MAP[rawPath]) return IMAGE_ALIAS_MAP[rawPath];
  if (fs.existsSync(path.join(REPO_ROOT, rawPath))) return rawPath;

  // Check if file exists under assets/images
  const base = path.basename(rawPath).split('.')[0];
  const catFolder = path.join(REPO_ROOT, 'assets/images', category);
  if (fs.existsSync(catFolder)) {
    const files = fs.readdirSync(catFolder);
    const match = files.find(f => f.includes(base) || f.endsWith('.webp'));
    if (match) return `assets/images/${category}/${match}`;
  }

  return 'assets/images/home/hero-sigiriya-aerial-1.webp';
}

function normalizePackage(raw, index = 0) {
  const slug = raw.slug || (raw.id ? raw.id.replace(/^pkg-/, '') : `tour-${index + 1}`);
  const catSlug = (raw.category || 'cultural').toLowerCase().replace(/[^a-z0-9\-]/g, '');

  // Extract hero image
  let heroImage = raw.hero_image || (Array.isArray(raw.images) && raw.images[0]) || '';
  heroImage = resolveImagePath(heroImage, catSlug);

  // Gallery
  const gallery = Array.isArray(raw.images) && raw.images.length > 0
    ? raw.images.map(img => resolveImagePath(img, catSlug))
    : [heroImage];

  // Itinerary
  const rawItinerary = raw.itinerary || [];
  const normalizedItinerary = rawItinerary.map((item, idx) => {
    return {
      day: item.day || (idx + 1),
      title: item.title || (typeof item === 'string' ? item : `Day ${idx + 1}`),
      description: item.description || item.desc || '',
      hotel: item.hotel || item.accommodation || 'Luxury Boutique Resort / 5-Star Hotel',
      meals: item.meals || 'Breakfast & Dinner',
      image: resolveImagePath(item.image, catSlug)
    };
  });

  return {
    id: slug,
    slug: slug,
    title: raw.title || raw.name || 'Sri Lanka Bespoke Tour',
    subtitle: raw.subtitle || raw.tagline || 'Private Chauffeur Guided Journey',
    category: catSlug,
    nights: parseInt(raw.nights) || (parseInt(raw.days) > 1 ? parseInt(raw.days) - 1 : 1),
    days: parseInt(raw.days) || 2,
    price_from: parseFloat(raw.price_from || raw.price || 0) || 0,
    hero_image: heroImage,
    gallery: gallery,
    video: raw.video || '',
    itinerary: normalizedItinerary,
    highlights: Array.isArray(raw.highlights) ? raw.highlights : [],
    inclusions: Array.isArray(raw.inclusions) ? raw.inclusions : [
      'Luxury air-conditioned private vehicle with dedicated English-speaking chauffeur guide',
      'Daily gourmet breakfast and curated dinners',
      'All government taxes, highway tolls, and monument entrance permits'
    ],
    exclusions: Array.isArray(raw.exclusions) ? raw.exclusions : [
      'International flights and Sri Lanka entry visa (ETA)',
      'Personal expenses, gratuities, and alcoholic beverages'
    ],
    faqs: Array.isArray(raw.faqs) ? raw.faqs : [],
    seo: {
      title: (raw.seo && raw.seo.title) || raw.seoTitle || `${raw.title || 'Tour'} | Lotus Ceylon Luxury Holidays`,
      description: (raw.seo && raw.seo.description) || raw.seoDescription || raw.tagline || 'Curated luxury private journey across Sri Lanka.',
      og_image: heroImage
    },
    status: raw.is_published === false ? 'draft' : 'published',
    sortOrder: parseInt(raw.sortOrder) || (index + 1),
    featured: Boolean(raw.featured || raw.is_popular || false),
    updatedAt: raw.updated_at || raw.updatedAt || new Date().toISOString()
  };
}

console.log('Migrating and consolidating packages into canonical tourPackages...');

const packagesFile = path.join(REPO_ROOT, 'data/packages.json');
const seedFile = path.join(REPO_ROOT, 'data/seed-catalog.json');

let allRaw = [];
if (fs.existsSync(packagesFile)) {
  const pData = JSON.parse(fs.readFileSync(packagesFile, 'utf-8'));
  allRaw.push(...(pData.packages || []));
}
if (fs.existsSync(seedFile)) {
  const sData = JSON.parse(fs.readFileSync(seedFile, 'utf-8'));
  allRaw.push(...(sData.packages || sData.tours || []));
}

const packageMap = new Map();
let conflictCount = 0;

allRaw.forEach((item, idx) => {
  const slug = item.slug || (item.id ? item.id.replace(/^pkg-/, '') : `tour-${idx}`);
  if (packageMap.has(slug)) {
    const existing = packageMap.get(slug);
    const existingTime = new Date(existing.updatedAt || 0).getTime();
    const newTime = new Date(item.updated_at || item.updatedAt || 0).getTime();
    conflictCount++;
    if (newTime > existingTime) {
      packageMap.set(slug, normalizePackage(item, idx));
    }
  } else {
    packageMap.set(slug, normalizePackage(item, idx));
  }
});

const consolidated = Array.from(packageMap.values());
consolidated.sort((a, b) => a.sortOrder - b.sortOrder);

const outputPath = path.join(REPO_ROOT, 'data/canonical-packages.json');
fs.writeFileSync(outputPath, JSON.stringify({ tourPackages: consolidated }, null, 2), 'utf-8');

console.log(`Successfully consolidated ${consolidated.length} unique canonical tour packages (${conflictCount} duplicate entries merged).`);
console.log(`Saved output to ${outputPath}`);
