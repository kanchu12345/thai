/**
 * scripts/patch-admin-sync.js
 * Patches firebase-tour-sync.js and admin-app.js to:
 * 1. Read/Write tourPackages canonical collection using slug as doc ID
 * 2. Bump siteMeta/version on save
 * 3. Fall back to legacy collections smoothly
 */

const fs = require('fs');
const path = require('path');

// 1. Patch js/firebase-tour-sync.js
const syncPath = path.join(__dirname, '..', 'js', 'firebase-tour-sync.js');
let syncContent = fs.readFileSync(syncPath, 'utf8');

// Patch fetchFirestoreCatalog to check tourPackages first
if (!syncContent.includes("collection('tourPackages')")) {
  syncContent = syncContent.replace(
    /let pkgSnap = await this\.db\.collection\('tours'\)\.get\(\);/g,
    `let pkgSnap = await this.db.collection('tourPackages').get();\n        if (pkgSnap.empty) {\n          pkgSnap = await this.db.collection('tours').get();\n        }`
  );
  syncContent = syncContent.replace(
    /let pkgSnap = await getDocs\(collection\(this\.db, 'tours'\)\);/g,
    `let pkgSnap = await getDocs(collection(this.db, 'tourPackages'));\n      if (pkgSnap.empty) {\n        pkgSnap = await getDocs(collection(this.db, 'tours'));\n      }`
  );
}

// Patch savePackage to write tourPackages and bump siteMeta/version
const oldSavePkgPattern = /async savePackage\(pkg\)\s*\{[\s\S]*?return payload;\s*\}/;
const newSavePkg = `async savePackage(pkg) {
      await this.init();
      if (!this.db) throw new Error('Firestore is not initialized.');

      const canonicalDocId = pkg.slug || pkg.id || ('pkg-' + Date.now());
      const payload = {
        ...pkg,
        id: canonicalDocId,
        slug: pkg.slug || canonicalDocId,
        updatedAt: new Date().toISOString()
      };

      if (this.db.collection) {
        await this.db.collection('tourPackages').doc(canonicalDocId).set(payload, { merge: true });
        try {
          await this.db.collection('siteMeta').doc('version').set({
            v: Date.now(),
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (e) {}
        return payload;
      }

      const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');
      await setDoc(doc(this.db, 'tourPackages', canonicalDocId), payload, { merge: true });
      try {
        await setDoc(doc(this.db, 'siteMeta', 'version'), {
          v: Date.now(),
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (e) {}
      return payload;
    }`;

if (oldSavePkgPattern.test(syncContent)) {
  syncContent = syncContent.replace(oldSavePkgPattern, newSavePkg);
  fs.writeFileSync(syncPath, syncContent, 'utf8');
  console.log('✓ Patched js/firebase-tour-sync.js');
} else {
  console.log('! Notice: savePackage pattern in js/firebase-tour-sync.js did not match directly, checking if already patched...');
}

// 2. Patch admin/js/admin-app.js
const adminPath = path.join(__dirname, '..', 'admin', 'js', 'admin-app.js');
let adminContent = fs.readFileSync(adminPath, 'utf8');

const oldAdminDbSave = /if \(this\.fbDb\) \{\s*try \{\s*await this\.fbDb\.collection\('tours'\)\.doc\(pkgId\)[\s\S]*?catch \(e\) \{\s*console\.warn\('\[AdminApp\] Direct Firestore doc save:', e\.message\);\s*\}\s*\}/;

const newAdminDbSave = `if (this.fbDb) {
        try {
          const canonicalDocId = slug || pkgId;
          await this.fbDb.collection('tourPackages').doc(canonicalDocId).set(payload, { merge: true });
          await this.fbDb.collection('siteMeta').doc('version').set({
            v: Date.now(),
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (e) {
          console.warn('[AdminApp] Direct Firestore doc save:', e.message);
        }
      }`;

if (oldAdminDbSave.test(adminContent)) {
  adminContent = adminContent.replace(oldAdminDbSave, newAdminDbSave);
  fs.writeFileSync(adminPath, adminContent, 'utf8');
  console.log('✓ Patched admin/js/admin-app.js savePackage logic');
} else {
  console.log('! Notice: oldAdminDbSave pattern in admin-app.js did not match or already patched.');
}
