/**
 * scripts/pilot-seed.js
 * Seeds Firestore with initial canonical content for Pilot verification:
 * - siteMeta/version
 * - siteGlobal/* (branding, header, footer, contact, menu)
 * - siteContent/home
 * - tourPackages/southern-sands-serenade
 */

const https = require('https');
const path = require('path');
const canonicalData = require('../data/canonical-packages.json');

const PROJECT_ID = 'louterst-36b64';
const API_KEY = 'AIzaSyD5NyCFaPHeS1cKlsgxZ_WsraswHlYonNA';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

function wrapFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === 'string') return { stringValue: val };
  if (typeof val === 'number') {
    return Number.isInteger(val) ? { integerValue: String(val) } : { doubleValue: val };
  }
  if (typeof val === 'boolean') return { booleanValue: val };
  if (Array.isArray(val)) {
    return {
      arrayValue: {
        values: val.map(wrapFirestoreValue)
      }
    };
  }
  if (typeof val === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = wrapFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

function wrapFirestoreDoc(obj) {
  const fields = {};
  for (const [k, v] of Object.entries(obj)) {
    fields[k] = wrapFirestoreValue(v);
  }
  return { fields };
}

function writeDoc(docPath, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(wrapFirestoreDoc(data));
    const url = `${FIRESTORE_BASE}/${docPath}?key=${API_KEY}`;

    const req = https.request(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, path: docPath });
        } else {
          reject(new Error(`Failed ${docPath} HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function runSeed() {
  console.log('[SEED] Starting Pilot Data Seeding into Firestore...');

  // 1. siteMeta/version
  await writeDoc('siteMeta/version', {
    v: 1,
    updatedAt: new Date().toISOString()
  });
  console.log('✓ Seeded siteMeta/version');

  // 2. siteGlobal/branding
  await writeDoc('siteGlobal/branding', {
    companyName: 'Lotus Ceylon Luxury Tours',
    companyLegalName: 'Lotus Ceylon International Tours & Services (Private) Limited',
    brandNameLotus: 'Lotus',
    brandNameCeylon: 'Ceylon',
    tagline: 'INTERNATIONAL TOURS & SERVICES',
    logo: 'assets/images/brand/logo-header.png',
    inquireButtonText: 'Inquire'
  });
  console.log('✓ Seeded siteGlobal/branding');

  // 3. siteGlobal/header
  await writeDoc('siteGlobal/header', {
    topHotline: '+94 71 54 22 384',
    topEmail: 'paliforbuddhism@gmail.com'
  });
  console.log('✓ Seeded siteGlobal/header');

  // 4. siteGlobal/footer
  await writeDoc('siteGlobal/footer', {
    aboutText: 'Crafting bespoke, transformative travel experiences across sacred Ceylon with authentic warmth since 2014.',
    quickLinksTitle: 'Quick Links',
    signatureThemesTitle: 'Signature Themes',
    hqTitle: 'Island Headquarters',
    headquartersLinkText: 'Registered Office & Headquarters Details'
  });
  console.log('✓ Seeded siteGlobal/footer');

  // 5. siteGlobal/contact
  await writeDoc('siteGlobal/contact', {
    hotlineLabel: '24/7 Travel Concierge Hotline',
    phone: '+94 71 54 22 384',
    phoneTel: 'tel:+94715422384',
    emailLabel: 'Email Inquiries',
    email: 'paliforbuddhism@gmail.com',
    emailMailto: 'mailto:paliforbuddhism@gmail.com',
    address: '286/C, Niwandama South, Ja-Ela, Sri Lanka – 11350',
    directMessagingLabel: 'Direct Messaging',
    wechat: 'LotusCeylonTours',
    line: '@lotusceylon',
    whatsappUrl: 'https://wa.me/94715422384?text=Hello%20Lotus%20Ceylon!%20I%20would%20like%20to%20inquire%20about%20a%20private%20tour.'
  });
  console.log('✓ Seeded siteGlobal/contact');

  // 6. siteGlobal/menu
  await writeDoc('siteGlobal/menu', {
    home: 'Home',
    tours: 'Tours',
    destinations: 'Destinations',
    experiences: 'Experiences',
    about: 'About Us',
    gallery: 'Gallery',
    reviews: 'Reviews',
    blog: 'Blog',
    contact: 'Contact'
  });
  console.log('✓ Seeded siteGlobal/menu');

  // 7. siteContent/home
  await writeDoc('siteContent/home', {
    hero: {
      badge: 'Bespoke Luxury Sri Lanka Tours',
      title: 'Sacred Splendour & Pure Journeys',
      subtitle: 'Immerse in timeless heritage, private wildlife safaris, and secluded coastal pavilions curated exclusively for you.',
      ctaPrimary: 'Explore Signature Tours',
      ctaSecondary: 'Plan Tailor-Made Journey'
    },
    stats: {
      travelersCount: '1,500+',
      travelersLabel: 'Discerning Travelers',
      ratingCount: '4.9 ★',
      ratingLabel: 'Private Concierge Rating',
      experienceYears: '10+',
      experienceLabel: 'Years of Island Mastery'
    },
    features: {
      title: 'The Lotus Ceylon Distinction',
      subtitle: 'Every journey is elevated with peerless discretion, authentic local knowledge, and uncompromising attention to detail.'
    }
  });
  console.log('✓ Seeded siteContent/home');

  // 8. tourPackages/southern-sands-serenade
  const sss = canonicalData.tourPackages.find(p => p.slug === 'southern-sands-serenade');
  if (sss) {
    const packagePayload = {
      ...sss,
      durationText: '9 Nights • 10 Days',
      tagline: 'Sun-Kissed Bays, Blue Whales & Dutch Ramparts',
      dayBadge: 'Day',
      // Ensure itinerary has dayBadge for template
      itinerary: sss.itinerary.map(item => ({
        ...item,
        dayBadge: `Day ${item.day}`
      }))
    };
    await writeDoc('tourPackages/southern-sands-serenade', packagePayload);
    console.log('✓ Seeded tourPackages/southern-sands-serenade');
  } else {
    console.warn('! Package southern-sands-serenade not found in canonical-packages.json');
  }

  console.log('\n[SEED COMPLETE] All pilot Firestore documents seeded successfully!');
}

if (require.main === module) {
  runSeed().catch(err => {
    console.error('[SEED ERROR]', err);
    process.exit(1);
  });
}

module.exports = { runSeed, writeDoc };
