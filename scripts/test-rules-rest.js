/**
 * scripts/test-rules-rest.js
 * Executes the 4 unauthenticated REST probe requests required by Step R0
 */

const https = require('https');

const PROJECT_ID = 'louterst-36b64';
const API_KEY = 'AIzaSyD5NyCFaPHeS1cKlsgxZ_WsraswHlYonNA';
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

function makeRestCall(method, docPath, payload = null) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${docPath}?key=${API_KEY}`;
    const bodyStr = payload ? JSON.stringify(payload) : null;
    
    const req = https.request(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(bodyStr ? { 'Content-Length': Buffer.byteLength(bodyStr) } : {})
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let parsed = null;
        try { parsed = JSON.parse(data); } catch(e) { parsed = data; }
        resolve({
          method,
          path: docPath,
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          response: parsed
        });
      });
    });

    req.on('error', err => resolve({ method, path: docPath, error: err.message }));
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

async function runProbes() {
  console.log('Probing Live Firebase REST API (Unauthenticated)...\n');

  // Probe 1: Read siteMeta/version
  const probe1 = await makeRestCall('GET', '/siteMeta/version');
  console.log('PROBE 1 - Read siteMeta/version:');
  console.log(`HTTP ${probe1.statusCode} ${probe1.statusMessage}`);
  console.log(JSON.stringify(probe1.response, null, 2).slice(0, 300));
  console.log('----------------------------------------------------');

  // Probe 2: Read inquiries
  const probe2 = await makeRestCall('GET', '/inquiries');
  console.log('\nPROBE 2 - Read inquiries:');
  console.log(`HTTP ${probe2.statusCode} ${probe2.statusMessage}`);
  console.log(JSON.stringify(probe2.response, null, 2).slice(0, 300));
  console.log('----------------------------------------------------');

  // Probe 3: Write siteContent/home (without auth)
  const probe3 = await makeRestCall('PATCH', '/siteContent/home', {
    fields: { test_unauth_write: { stringValue: 'blocked' } }
  });
  console.log('\nPROBE 3 - Write siteContent/home without auth:');
  console.log(`HTTP ${probe3.statusCode} ${probe3.statusMessage}`);
  console.log(JSON.stringify(probe3.response, null, 2).slice(0, 300));
  console.log('----------------------------------------------------');

  // Probe 4: Create inquiry with invalid fields
  const probe4 = await makeRestCall('POST', '/inquiries', {
    fields: {
      illegalField: { stringValue: 'hack' },
      hp_website_lotus: { stringValue: 'bot_spam' }
    }
  });
  console.log('\nPROBE 4 - Create inquiry with invalid/honeypot fields:');
  console.log(`HTTP ${probe4.statusCode} ${probe4.statusMessage}`);
  console.log(JSON.stringify(probe4.response, null, 2).slice(0, 300));
  console.log('----------------------------------------------------');
}

runProbes();
