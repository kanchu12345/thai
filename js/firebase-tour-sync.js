/**
 * Lotus Ceylon - Firebase Firestore Live Tour Data Sync & Authentication Service
 * Seamlessly connects front-end views & admin panel to Firebase Firestore
 * with robust local data/packages.json fallback.
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

  class LotusTourService {
    constructor() {
      this.config = firebaseConfig;
      this.db = null;
      this.auth = null;
      this.initialized = false;
      this.isOnline = navigator.onLine;
      this.cacheKey = 'lotus_packages_cache_v1';
      this.cacheTimeKey = 'lotus_packages_cache_time';
      this.cachedData = null;
    }

    /**
     * Dynamically initialize Firebase SDKs if not already loaded
     */
    async init() {
      if (this.initialized) return;

      try {
        // Check if Firebase compat or modular SDK is in window
        if (window.firebase && window.firebase.initializeApp) {
          if (!window.firebase.apps.length) {
            window.firebase.initializeApp(this.config);
          }
          this.db = window.firebase.firestore();
          this.auth = window.firebase.auth();
          this.initialized = true;
          console.log('[LotusFirebase] Initialized with Firebase Compat SDK');
        } else {
          // Attempt dynamic ESM load
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
        console.warn('[LotusFirebase] Direct Firebase init deferred or offline, will use static JSON fallback:', err.message);
      }
    }

    /**
     * Get all tour packages (Firestore live -> Cache -> Static JSON fallback)
     */
    async getCatalog(fallbackJsonPath = 'data/packages.json') {
      // 1. Try Firestore if online & initialized
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

      // 2. Check localStorage cache
      const cached = this.readFromCache();
      if (cached && cached.packages && cached.packages.length > 0) {
        return cached;
      }

      // 3. Fallback to bundled data/packages.json
      try {
        const res = await fetch(fallbackJsonPath);
        if (res.ok) {
          const data = await res.json();
          this.saveToCache(data);
          return data;
        }
      } catch (err) {
        console.error('[LotusFirebase] Could not load static fallback JSON:', err);
      }

      return { categories: {}, packages: [] };
    }

    /**
     * Fetch all tour packages from Firestore collection 'packages'
     */
    async fetchFirestoreCatalog() {
      // Compat style
      if (this.db.collection) {
        const pkgSnap = await this.db.collection('packages').get();
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
      const pkgSnap = await getDocs(collection(this.db, 'packages'));
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
     * Admin: Save or update package in Firestore
     */
    async savePackage(pkg) {
      await this.init();
      if (!this.db) throw new Error('Firestore is not initialized.');

      const pkgId = pkg.id;
      if (!pkgId) throw new Error('Package ID is required');

      if (this.db.collection) {
        await this.db.collection('packages').doc(pkgId).set(pkg, { merge: true });
        return true;
      }

      const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');
      await setDoc(doc(this.db, 'packages', pkgId), pkg, { merge: true });
      return true;
    }

    /**
     * Admin: Seed Firestore with packages from JSON file
     */
    async seedFirestore(jsonData) {
      await this.init();
      if (!this.db) throw new Error('Firestore is not initialized.');

      let count = 0;
      // Seed categories
      if (jsonData.categories) {
        for (const [catId, catData] of Object.entries(jsonData.categories)) {
          if (this.db.collection) {
            await this.db.collection('categories').doc(catId).set(catData, { merge: true });
          } else {
            const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');
            await setDoc(doc(this.db, 'categories', catId), catData, { merge: true });
          }
        }
      }

      // Seed packages
      if (jsonData.packages) {
        for (const pkg of jsonData.packages) {
          const pkgId = pkg.id;
          if (this.db.collection) {
            await this.db.collection('packages').doc(pkgId).set(pkg, { merge: true });
          } else {
            const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');
            await setDoc(doc(this.db, 'packages', pkgId), pkg, { merge: true });
          }
          count++;
        }
      }

      return count;
    }

    saveToCache(data) {
      try {
        localStorage.setItem(this.cacheKey, JSON.stringify(data));
        localStorage.setItem(this.cacheTimeKey, Date.now().toString());
      } catch (e) {
        // ignore quota errors
      }
    }

    readFromCache() {
      try {
        const raw = localStorage.getItem(this.cacheKey);
        if (!raw) return null;
        const time = parseInt(localStorage.getItem(this.cacheTimeKey) || '0', 10);
        // 1 hour cache TTL
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

      // Fallback to static JSON
      try {
        const res = await fetch(fallbackJsonPath);
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
  }

  window.LotusFirebase = new LotusTourService();
  // Auto-init quietly in background
  window.LotusFirebase.init();
})();
