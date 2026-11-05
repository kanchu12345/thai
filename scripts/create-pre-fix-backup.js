const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_ID = 'louterst-36b64';
const API_KEY = 'AIzaSyD5NyCFaPHeS1cKlsgxZ_WsraswHlYonNA';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, error: e.message, body });
        }
      });
    }).on('error', (err) => resolve({ error: err.message }));
  });
}

function unwrapFirestore(val) {
  if (!val) return null;
  if ('stringValue' in val) return val.stringValue;
  if ('integerValue' in val) return parseInt(val.integerValue, 10);
  if ('doubleValue' in val) return parseFloat(val.doubleValue);
  if ('booleanValue' in val) return val.booleanValue;
  if ('nullValue' in val) return null;
  if ('arrayValue' in val) {
    return (val.arrayValue.values || []).map(unwrapFirestore);
  }
  if ('mapValue' in val) {
    const res = {};
    for (const [k, v] of Object.entries(val.mapValue.fields || {})) {
      res[k] = unwrapFirestore(v);
    }
    return res;
  }
  return val;
}

async function exportFullBackup() {
  console.log('--- STARTING PRE-CMS-FIX BACKUP EXPORT ---');

  const backup = {
    exportedAt: new Date().toISOString(),
    projectId: PROJECT_ID,
    source: 'Firestore & Local Snapshot',
    firestore: {},
    localData: {}
  };

  // 1. Fetch available Firestore collections
  const collections = ['siteMeta', 'siteGlobal', 'settings', 'tourPackages', 'tourCategories', 'destinations', 'team', 'reviews', 'blogPosts', 'gallery', 'forms', 'inquiries'];
  for (const col of collections) {
    console.log(`Checking Firestore collection: ${col}...`);
    const res = await fetchJson(`${FIRESTORE_BASE}/${col}?key=${API_KEY}`);
    if (res.status === 200 && res.data && res.data.documents) {
      backup.firestore[col] = res.data.documents.map(doc => {
        const docName = doc.name.split('/').pop();
        const docData = {};
        for (const [k, v] of Object.entries(doc.fields || {})) {
          docData[k] = unwrapFirestore(v);
        }
        return { id: docName, path: doc.name, data: docData };
      });
      console.log(`  -> Retrieved ${backup.firestore[col].length} docs from ${col}`);
    } else {
      console.log(`  -> Collection ${col} returned status ${res.status} (${res.data?.error?.message || 'empty/restricted'})`);
      backup.firestore[col] = [];
    }
  }

  // 2. Fetch specific single documents in siteGlobal / siteMeta / settings
  const singleDocs = [
    'siteMeta/version',
    'siteGlobal/branding',
    'siteGlobal/header',
    'siteGlobal/footer',
    'siteGlobal/contact',
    'siteGlobal/menu',
    'siteGlobal/social',
    'settings/business',
    'settings/general'
  ];
  backup.firestore.singleDocs = {};
  for (const sd of singleDocs) {
    const res = await fetchJson(`${FIRESTORE_BASE}/${sd}?key=${API_KEY}`);
    if (res.status === 200 && res.data && res.data.fields) {
      const docData = {};
      for (const [k, v] of Object.entries(res.data.fields || {})) {
        docData[k] = unwrapFirestore(v);
      }
      backup.firestore.singleDocs[sd] = docData;
      console.log(`  -> Retrieved single doc: ${sd}`);
    }
  }

  // 3. Include all local committed data files
  const dataDir = path.resolve(__dirname, '../data');
  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          backup.localData[file] = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
          console.log(`  -> Included local data/${file}`);
        } catch (e) {
          console.warn(`  Could not parse local data/${file}:`, e.message);
        }
      }
    }
  }

  const outPath = path.resolve(__dirname, '../backups/firestore-backup-pre-fix.json');
  fs.writeFileSync(outPath, JSON.stringify(backup, null, 2), 'utf8');
  console.log(`\n✅ Backup successfully written to ${outPath}`);
  console.log(`Total backup size: ${(fs.statSync(outPath).size / 1024).toFixed(2)} KB`);
}

exportFullBackup();
