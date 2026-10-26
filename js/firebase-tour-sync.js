/**

 * Lotus Ceylon - Firebase Firestore Live Tour Data Sync & Authentication Service

 * Seamlessly connects front-end views & admin panel to Firebase Firestore

 * with robust local data/seed-catalog.json fallback and complete collection management.

 */



(function() {

  'use strict';



  const firebaseConfig = {

    apiKey: "AIzaSyD5NyCFaPHeS1cKlsgxZ_WsraswHlYonNA",

    authDomain: "louterst-36b64.firebaseapp.com",

    projectId: "louterst-36b64",

    storageBucket: "louterst-36b64.firebasestorage.app",

    messagingSenderId: "416036235757",

    appId: "1:416036235757:web:544c89abdb74b41a585fe4",

    measurementId: "G-KKNCD89X6F"

  };



  function resolveFallbackPath(relPath) {

    if (!relPath || relPath.startsWith('http://') || relPath.startsWith('https://') || relPath.startsWith('/')) {

      return relPath;

    }

    const clean = relPath.replace(/^(\.\/)+/, '');

    const path = window.location.pathname.replace(/\\/g, '/');

    if (path.includes('/tours/')) {

      const after = path.split('/tours/')[1].split('/').filter(p => p && !p.endsWith('.html'));

      return '../'.repeat(after.length + 1) + clean;

    }

    return './' + clean;

  }



  class LotusTourService {

    constructor() {

      this.config = firebaseConfig;

      this.db = null;

      this.auth = null;

      this.initialized = false;

      this.isOnline = navigator.onLine;

      this.cacheKey = 'lotus_seed_catalog_cache_v2';

      this.cacheTimeKey = 'lotus_seed_catalog_cache_time';

      this.cachedData = null;

    }



    /**

     * Resolves image paths seamlessly whether in /admin/ or public site

     */

    resolveImageUrl(url, fromAdmin = false) {

      if (!url) return fromAdmin ? '../assets/images/logo.png' : 'assets/images/logo.png';

      url = String(url).trim();

      if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {

        return url;

      }

      if (fromAdmin) {

        if (url.startsWith('../')) return url;

        if (url.startsWith('/')) return '..' + url;

        return '../' + url;

      } else {

        if (url.startsWith('../')) return url.substring(3);

        if (url.startsWith('/')) return url.substring(1);

        return url;

      }

    }



    /**

     * Multilingual field translation helper (falls back to English)

     */

    t(field, lang = 'en') {

      if (!field) return '';

      if (typeof field === 'string') return field;

      if (typeof field === 'object') {

        return field[lang] || field['en'] || Object.values(field)[0] || '';

      }

      return String(field);

    }



    /**

     * Dynamically initialize Firebase SDKs if not already loaded

     */

    async init() {

      if (this.initialized) return;



      try {

        if (window.firebase && window.firebase.initializeApp) {

          if (!window.firebase.apps.length) {

            window.firebase.initializeApp(this.config);

          }

          this.db = window.firebase.firestore();

          this.auth = window.firebase.auth();

          this.initialized = true;

          console.log('[LotusFirebase] Initialized with Firebase Compat SDK');

        } else {

          const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js');

          const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

          const { getAuth } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js');



          const app = initializeApp(this.config);

          this.db = getFirestore(app);

          this.auth = getAuth(app);

          this.initialized = true;

          console.log('[LotusFirebase] Initialized with Firebase Modular ESM SDK');

        }

      } catch (err) {

        console.warn('[LotusFirebase] Direct Firebase init deferred or offline, using fallback:', err.message);

      }

    }



    /**

     * Get all tour packages (Firestore live -> Cache -> Static JSON fallback)

     */

    async getCatalog(fallbackJsonPath = 'data/seed-catalog.json') {

      if (this.initialized && this.db && navigator.onLine) {

        try {

          const snapshot = await this.fetchFirestoreCatalog();

          if (snapshot && snapshot.packages && snapshot.packages.length > 0) {

            this.cachedData = snapshot;

            this.saveToCache(snapshot);

            return snapshot;

          }

        } catch (e) {

          console.warn('[LotusFirebase] Firestore fetch failed, trying local fallback:', e.message);

        }

      }



      const cached = this.readFromCache();

      if (cached && cached.packages && cached.packages.length > 0) {

        return cached;

      }



      try {

        const res = await fetch(resolveFallbackPath(fallbackJsonPath));

        if (res.ok) {

          const data = await res.json();

          this.saveToCache(data);

          return data;

        }

      } catch (err) {

        // Try fallback to packages.json

        try {

          const res2 = await fetch(resolveFallbackPath(fallbackJsonPath).replace('seed-catalog.json', 'packages.json'));

          if (res2.ok) return await res2.json();

        } catch (e) {

          console.error('[LotusFirebase] Could not load static fallback JSON:', err);

        }

      }



      return { categories: {}, packages: [] };

    }



    /**

     * Fetch all tour packages from Firestore collection 'tours' / 'packages'

     */

    async seedFirestore(pkgData) {

      return this.seedAllCollections();

    }



    async fetchFirestoreCatalog() {

      if (!this.initialized) await this.init();

      if (this.db && this.db.collection) {

        let pkgSnap = await this.db.collection('tours').get();

        if (pkgSnap.empty) {

          pkgSnap = await this.db.collection('packages').get();

        }



        const packages = [];

        pkgSnap.forEach(doc => {

          packages.push({ id: doc.id, ...doc.data() });

        });



        const catSnap = await this.db.collection('categories').get();

        const categories = {};

        catSnap.forEach(doc => {

          categories[doc.id] = doc.data();

        });



        return { categories, packages };

      }



      // Modular style

      const { collection, getDocs } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

      let pkgSnap = await getDocs(collection(this.db, 'tours'));

      if (pkgSnap.empty) {

        pkgSnap = await getDocs(collection(this.db, 'packages'));

      }

      const packages = [];

      pkgSnap.forEach(doc => {

        packages.push({ id: doc.id, ...doc.data() });

      });



      const catSnap = await getDocs(collection(this.db, 'categories'));

      const categories = {};

      catSnap.forEach(doc => {

        categories[doc.id] = doc.data();

      });



      return { categories, packages };

    }



    /**

     * Fetch Destinations from Firestore or fallback

     */

    async fetchDestinations(fallbackPath = 'data/seed-catalog.json') {

      if (!this.initialized) await this.init();

      if (this.db && navigator.onLine) {

        try {

          if (this.db.collection) {

            const snap = await this.db.collection('destinations').orderBy('order', 'asc').get();

            const list = [];

            snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));

            if (list.length > 0) return list;

          }

        } catch (e) {

          console.warn('[LotusFirebase] Destinations fetch failed:', e.message);

        }

      }

      try {

        const res = await fetch(resolveFallbackPath(fallbackPath));

        if (res.ok) {

          const data = await res.json();

          return data.destinations || [];

        }

      } catch (err) {}

      return [];

    }



    /**

     * Fetch Reviews / Testimonials from Firestore or fallback

     */

    async fetchReviews(fallbackPath = 'data/seed-catalog.json') {

      if (!this.initialized) await this.init();

      if (this.db && navigator.onLine) {

        try {

          if (this.db.collection) {

            const snap = await this.db.collection('testimonials').get();

            const list = [];

            snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));

            if (list.length > 0) return list;

          }

        } catch (e) {

          console.warn('[LotusFirebase] Reviews fetch failed:', e.message);

        }

      }

      try {

        const res = await fetch(resolveFallbackPath(fallbackPath));

        if (res.ok) {

          const data = await res.json();

          return data.testimonials || data.reviews || [];

        }

      } catch (err) {}

      return [];

    }



    /**

     * Fetch Site Settings

     */

    async fetchSettings(fallbackPath = 'data/seed-catalog.json') {

      if (!this.initialized) await this.init();

      if (this.db && navigator.onLine) {

        try {

          if (this.db.collection) {

            const doc = await this.db.collection('settings').doc('global_settings').get();

            if (doc.exists) return doc.data();

          }

        } catch (e) {

          console.warn('[LotusFirebase] Settings fetch failed:', e.message);

        }

      }

      try {

        const res = await fetch(resolveFallbackPath(fallbackPath));

        if (res.ok) {

          const data = await res.json();

          return (data.settings && data.settings[0]) || {};

        }

      } catch (err) {}

      return {};

    }



    /**

     * Admin: Save or update package in Firestore

     */

    async savePackage(pkg) {

      await this.init();

      if (!this.db) throw new Error('Firestore is not initialized.');



      const pkgId = pkg.id || ('pkg-' + (pkg.slug || Date.now()));

      const payload = {

        ...pkg,

        id: pkgId,

        updatedAt: new Date().toISOString()

      };



      if (this.db.collection) {

        await this.db.collection('tours').doc(pkgId).set(payload, { merge: true });

        await this.db.collection('packages').doc(pkgId).set(payload, { merge: true });

        return payload;

      }



      const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

      await setDoc(doc(this.db, 'tours', pkgId), payload, { merge: true });

      await setDoc(doc(this.db, 'packages', pkgId), payload, { merge: true });

      return payload;

    }



    /**

     * Admin: Save Category

     */

    async saveCategory(cat) {

      await this.init();

      if (!this.db) throw new Error('Firestore is not initialized.');

      const catId = cat.id || ('cat-' + (cat.slug || Date.now()));

      const payload = { ...cat, id: catId, updatedAt: new Date().toISOString() };



      if (this.db.collection) {

        await this.db.collection('categories').doc(catId).set(payload, { merge: true });

      } else {

        const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

        await setDoc(doc(this.db, 'categories', catId), payload, { merge: true });

      }

      return payload;

    }



    /**

     * Admin: Save Destination

     */

    async saveDestination(dest) {

      await this.init();

      if (!this.db) throw new Error('Firestore is not initialized.');

      const destId = dest.id || ('dest-' + (dest.slug || Date.now()));

      const payload = { ...dest, id: destId, updatedAt: new Date().toISOString() };



      if (this.db.collection) {

        await this.db.collection('destinations').doc(destId).set(payload, { merge: true });

      } else {

        const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

        await setDoc(doc(this.db, 'destinations', destId), payload, { merge: true });

      }

      return payload;

    }



    /**

     * Admin: Save Review

     */

    async saveReview(rev) {

      await this.init();

      if (!this.db) throw new Error('Firestore is not initialized.');

      const revId = rev.id || ('rev-' + Date.now());

      const payload = { ...rev, id: revId, updatedAt: new Date().toISOString() };



      if (this.db.collection) {

        await this.db.collection('testimonials').doc(revId).set(payload, { merge: true });

        await this.db.collection('reviews').doc(revId).set(payload, { merge: true });

      } else {

        const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

        await setDoc(doc(this.db, 'testimonials', revId), payload, { merge: true });

        await setDoc(doc(this.db, 'reviews', revId), payload, { merge: true });

      }

      return payload;

    }



    /**

     * Master Seeder: Seeds ALL collections from data/seed-catalog.json into Firestore

     */

    async seedAllCollections(onProgress = null) {

      await this.init();

      if (!this.db) throw new Error('Firestore is not initialized.');



      // Load master seed bundle

      let data = null;

      try {

        const res = await fetch('../data/seed-catalog.json');

        if (res.ok) data = await res.json();

      } catch (e) {

        try {

          const res2 = await fetch('data/seed-catalog.json');

          if (res2.ok) data = await res2.json();

        } catch (e2) {}

      }



      if (!data) throw new Error('Could not load data/seed-catalog.json');



      const collectionsToSeed = [

        { key: 'settings', col: 'settings', idField: 'id' },

        { key: 'categories', col: 'categories', idField: 'id' },

        { key: 'tours', col: 'tours', idField: 'id' },

        { key: 'packages', col: 'packages', idField: 'id' },

        { key: 'destinations', col: 'destinations', idField: 'id' },

        { key: 'testimonials', col: 'testimonials', idField: 'id' },

        { key: 'reviews', col: 'reviews', idField: 'id' },

        { key: 'team', col: 'team', idField: 'id' },

        { key: 'faqs', col: 'faqs', idField: 'id' },

        { key: 'navigation', col: 'navigation', idField: 'id' },

        { key: 'formDefinitions', col: 'formDefinitions', idField: 'id' }

      ];



      let totalItems = 0;

      collectionsToSeed.forEach(c => {

        if (Array.isArray(data[c.key])) totalItems += data[c.key].length;

        else if (data[c.key] && typeof data[c.key] === 'object') totalItems += Object.keys(data[c.key]).length;

      });



      let processed = 0;



      for (const item of collectionsToSeed) {

        const colData = data[item.key];

        if (!colData) continue;



        const list = Array.isArray(colData) ? colData : Object.entries(colData).map(([k, v]) => ({ ...v, id: v.id || k }));



        for (const docData of list) {

          const docId = String(docData[item.idField] || docData.slug || docData.id || ('doc-' + Date.now()));

          

          if (this.db.collection) {

            await this.db.collection(item.col).doc(docId).set(docData, { merge: true });

          } else {

            const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

            await setDoc(doc(this.db, item.col, docId), docData, { merge: true });

          }



          processed++;

          if (typeof onProgress === 'function') {

            const label = (docData.title && typeof docData.title === 'object' ? docData.title.en : (docData.title || docData.name || docId));

            onProgress({

              processed,

              total: totalItems,

              percent: Math.round((processed / totalItems) * 100),

              collection: item.col,

              title: label

            });

          }

        }

      }



      this.saveToCache(data);

      return processed;

    }



    saveToCache(data) {

      try {

        localStorage.setItem(this.cacheKey, JSON.stringify(data));

        localStorage.setItem(this.cacheTimeKey, Date.now().toString());

      } catch (e) {}

    }



    readFromCache() {

      try {

        const raw = localStorage.getItem(this.cacheKey);

        if (!raw) return null;

        const time = parseInt(localStorage.getItem(this.cacheTimeKey) || '0', 10);

        if (Date.now() - time > 3600000) return null;

        return JSON.parse(raw);

      } catch (e) {

        return null;

      }

    }



    /**

     * Submit an inquiry to Firestore collection: inquiries_quick or inquiries_detailed

     */

    async submitInquiry(data, isQuick = false) {

      if (!this.initialized) await this.init();

      const colName = isQuick ? 'inquiries_quick' : 'inquiries_detailed';

      const payload = {

        ...data,

        createdAt: new Date().toISOString(),

        status: 'new'

      };



      if (this.db && this.db.collection) {

        const docRef = await this.db.collection(colName).add(payload);

        return { id: docRef.id, ...payload };

      } else if (this.db) {

        const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

        const docRef = await addDoc(collection(this.db, colName), payload);

        return { id: docRef.id, ...payload };

      }

      return { id: data.referenceId || 'LOCAL-' + Date.now(), ...payload };

    }



    /**

     * Fetch inquiries from collection inquiries_quick or inquiries_detailed

     */

    async fetchInquiries(collectionName = 'inquiries_detailed') {

      if (!this.initialized) await this.init();

      const list = [];

      if (!this.db) return list;



      try {

        if (this.db.collection) {

          const snapshot = await this.db.collection(collectionName).orderBy('createdAt', 'desc').get();

          snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));

        } else {

          const { collection, getDocs, query, orderBy } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

          const q = query(collection(this.db, collectionName), orderBy('createdAt', 'desc'));

          const snapshot = await getDocs(q);

          snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));

        }

      } catch (err) {

        console.warn(`[LotusFirebase] Fetch ${collectionName} error:`, err.message);

      }

      return list;

    }



    /**

     * Update inquiry status in Firestore

     */

    async updateInquiryStatus(collectionName, docId, status) {

      if (!this.initialized) await this.init();

      if (!this.db) return false;



      try {

        if (this.db.collection) {

          await this.db.collection(collectionName).doc(docId).update({ status: status, updatedAt: new Date().toISOString() });

        } else {

          const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

          await updateDoc(doc(this.db, collectionName, docId), { status: status, updatedAt: new Date().toISOString() });

        }

        return true;

      } catch (err) {

        console.error(`[LotusFirebase] Update inquiry status error:`, err);

        return false;

      }

    }



    /**

     * Delete inquiry from Firestore

     */

    async deleteInquiry(collectionName, docId) {

      if (!this.initialized) await this.init();

      if (!this.db) return false;



      try {

        if (this.db.collection) {

          await this.db.collection(collectionName).doc(docId).delete();

        } else {

          const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

          await deleteDoc(doc(this.db, collectionName, docId));

        }

        return true;

      } catch (err) {

        console.error(`[LotusFirebase] Delete inquiry error:`, err);

        return false;

      }

    }



    /**

     * Fetch Team members (Firestore -> local data/team.json fallback)

     */

    async fetchTeam(fallbackJsonPath = 'data/team.json') {

      if (!this.initialized) await this.init();

      const list = [];

      if (this.db && navigator.onLine) {

        try {

          if (this.db.collection) {

            const snap = await this.db.collection('team').orderBy('sortOrder', 'asc').get();

            snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));

          } else {

            const { collection, getDocs, query, orderBy } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

            const q = query(collection(this.db, 'team'), orderBy('sortOrder', 'asc'));

            const snap = await getDocs(q);

            snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));

          }

          if (list.length > 0) return list;

        } catch (e) {

          console.warn('[LotusFirebase] Firestore team fetch failed, using fallback:', e.message);

        }

      }



      try {

        const res = await fetch(resolveFallbackPath(fallbackJsonPath));

        if (res.ok) {

          return await res.json();

        }

      } catch (err) {

        console.warn('[LotusFirebase] Could not load static team JSON:', err.message);

      }

      return [];

    }



    /**

     * Save/Update Team Member

     */

    async saveTeamMember(memberData) {

      if (!this.initialized) await this.init();

      if (!this.db) return null;

      const memberId = memberData.id || 'team-' + Date.now();

      const payload = { ...memberData, id: memberId, updatedAt: new Date().toISOString() };



      if (this.db.collection) {

        await this.db.collection('team').doc(memberId).set(payload, { merge: true });

      } else {

        const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

        await setDoc(doc(this.db, 'team', memberId), payload, { merge: true });

      }

      return payload;

    }



    /**

     * Delete Team Member

     */

    async deleteTeamMember(memberId) {

      if (!this.initialized) await this.init();

      if (!this.db) return false;



      if (this.db.collection) {

        await this.db.collection('team').doc(memberId).delete();

      } else {

        const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');

        await deleteDoc(doc(this.db, 'team', memberId));

      }

      return true;

    }



  
    /**
     * Admin: Delete package from tours & packages collections by ID and slug
     */
    async deletePackage(pkgIdOrSlug, alternateId = null) {
      await this.init();
      if (!this.db) return false;
      const ids = [pkgIdOrSlug];
      if (alternateId && alternateId !== pkgIdOrSlug) ids.push(alternateId);

      for (const id of ids) {
        if (!id) continue;
        try {
          if (this.db.collection) {
            await this.db.collection('tours').doc(id).delete();
            await this.db.collection('packages').doc(id).delete();
          } else {
            const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');
            await deleteDoc(doc(this.db, 'tours', id));
            await deleteDoc(doc(this.db, 'packages', id));
          }
        } catch (e) {
          console.warn(`[LotusFirebase] Delete package ${id} warning:`, e.message);
        }
      }
      return true;
    }

    /**
     * Admin: Delete category by ID and slug
     */
    async deleteCategory(catIdOrSlug, alternateId = null) {
      await this.init();
      if (!this.db) return false;
      const ids = [catIdOrSlug];
      if (alternateId && alternateId !== catIdOrSlug) ids.push(alternateId);

      for (const id of ids) {
        if (!id) continue;
        try {
          if (this.db.collection) {
            await this.db.collection('categories').doc(id).delete();
          } else {
            const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');
            await deleteDoc(doc(this.db, 'categories', id));
          }
        } catch (e) {}
      }
      return true;
    }

    /**
     * Admin: Delete destination by ID and slug
     */
    async deleteDestination(destIdOrSlug, alternateId = null) {
      await this.init();
      if (!this.db) return false;
      const ids = [destIdOrSlug];
      if (alternateId && alternateId !== destIdOrSlug) ids.push(alternateId);

      for (const id of ids) {
        if (!id) continue;
        try {
          if (this.db.collection) {
            await this.db.collection('destinations').doc(id).delete();
          } else {
            const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');
            await deleteDoc(doc(this.db, 'destinations', id));
          }
        } catch (e) {}
      }
      return true;
    }

    /**
     * Admin: Delete review by ID
     */
    async deleteReview(reviewId) {
      await this.init();
      if (!this.db || !reviewId) return false;
      try {
        if (this.db.collection) {
          await this.db.collection('testimonials').doc(reviewId).delete();
          await this.db.collection('reviews').doc(reviewId).delete();
        } else {
          const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');
          await deleteDoc(doc(this.db, 'testimonials', reviewId));
          await deleteDoc(doc(this.db, 'reviews', reviewId));
        }
        return true;
      } catch (e) {
        return false;
      }
    }

    }

  window.LotusFirebase = new LotusTourService();

  window.LotusFirebase.init();

})();

