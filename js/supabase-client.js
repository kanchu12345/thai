/**
 * LOTUS CEYLON International Tours & Services (Pvt) Ltd
 * Resilient Supabase Client & Dynamic Content Loader
 * 
 * Features:
 * - Direct connection using Supabase public anon key (RLS secured)
 * - In-memory & localStorage caching for blazing fast page loads
 * - Graceful fallback to bundled `data/default-content.json` if Supabase
 *   is unconfigured, offline, or returns an error. The site NEVER renders a blank page.
 */

(function (window) {
  'use strict';

  const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

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

  const FALLBACK_DATA_URL = 'data/default-content.json';

  class LotusSupabaseClient {
    constructor() {
      this.client = null;
      this.memCache = {};
      this.fallbackData = null;
      this.initClient();
    }

    /**
     * Initialize Supabase SDK client if credentials are configured
     */
    initClient() {
      const config = (window.LOTUS_CONFIG && window.LOTUS_CONFIG.supabase) || {};
      const url = config.url && config.url.trim();
      const anonKey = config.anonKey && config.anonKey.trim();

      if (url && anonKey && window.supabase && typeof window.supabase.createClient === 'function') {
        try {
          this.client = window.supabase.createClient(url, anonKey, {
            auth: {
              persistSession: true,
              autoRefreshToken: true
            }
          });
        } catch (e) {
          console.warn('[Lotus CMS] Failed to initialize Supabase client:', e);
          this.client = null;
        }
      } else {
        // Not configured yet or Supabase SDK not loaded on this page
        this.client = null;
        console.info('[Lotus CMS] Supabase client unconfigured; using local & Firestore-bridged fallback data.');
      }
    }

    /**
     * Check if live Supabase client is connected
     */
    isLive() {
      return Boolean(this.client);
    }

    /**
     * Load bundled default JSON fallback data
     */
    async getFallbackData() {
      if (this.fallbackData) return this.fallbackData;
      // 1. Check local seed cache populated from live Firestore sync or Admin updates
      try {
        const cachedRaw = localStorage.getItem('lotus_seed_catalog_cache_v2');
        if (cachedRaw) {
          const parsed = JSON.parse(cachedRaw);
          if (parsed && (parsed.packages || parsed.tours)) {
            const rawCats = parsed.categories || [];
            this.fallbackData = {
              site_settings: parsed.settings ? (Array.isArray(parsed.settings) ? parsed.settings[0] : parsed.settings) : {},
              tour_categories: Array.isArray(rawCats) ? rawCats : Object.values(rawCats),
              tours: parsed.packages || parsed.tours || [],
              reviews: parsed.reviews || parsed.testimonials || []
            };
            return this.fallbackData;
          }
        }
      } catch (e) {}

      // 2. Bundled JSON fallback
      try {
        const res = await fetch(resolveFallbackPath(FALLBACK_DATA_URL));
        if (!res.ok) throw new Error(HTTP );
        this.fallbackData = await res.json();
        return this.fallbackData;
      } catch (err) {
        console.warn('[Lotus CMS] Could not load bundled fallback JSON:', err);
        return {
          site_settings: {},
          tour_categories: [],
          tours: [],
          reviews: []
        };
      }
    }

    /**
     * Cache helper: Read from memory or localStorage
     */
    getCache(key) {
      if (this.memCache[key]) {
        const item = this.memCache[key];
        if (Date.now() - item.time < CACHE_TTL_MS) {
          return item.data;
        }
      }

      try {
        const raw = localStorage.getItem('lotus_' + key);
        if (raw) {
          const item = JSON.parse(raw);
          if (Date.now() - item.time < CACHE_TTL_MS) {
            this.memCache[key] = item;
            return item.data;
          }
        }
      } catch (e) {
        // Ignore localStorage error (private browsing / disabled)
      }
      return null;
    }

    /**
     * Cache helper: Write to memory & localStorage
     */
    setCache(key, data) {
      const payload = { time: Date.now(), data };
      this.memCache[key] = payload;
      try {
        localStorage.setItem('lotus_' + key, JSON.stringify(payload));
      } catch (e) {
        // Quota exceeded or disabled
      }
    }

    /**
     * Clear client cache
     */
    clearCache() {
      this.memCache = {};
      try {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith('lotus_cache_')) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
      } catch (e) {}
    }

    /**
     * Fetch Site Settings
     */
    async getSiteSettings() {
      const cacheKey = 'cache_settings';
      const cached = this.getCache(cacheKey);
      if (cached) return cached;

      if (this.client) {
        try {
          const { data, error } = await this.client
            .from('site_settings')
            .select('*');

          if (!error && data && data.length > 0) {
            const settingsObj = {};
            data.forEach(item => {
              settingsObj[item.key] = item.value;
            });
            this.setCache(cacheKey, settingsObj);
            return settingsObj;
          }
        } catch (err) {
          console.warn('[Lotus CMS] Live fetch settings failed, falling back:', err);
        }
      }

      // Fallback
      const fallback = await this.getFallbackData();
      return fallback.site_settings || {};
    }

    /**
     * Fetch Tour Categories
     */
    async getCategories() {
      const cacheKey = 'cache_categories';
      const cached = this.getCache(cacheKey);
      if (cached) return cached;

      if (this.client) {
        try {
          const { data, error } = await this.client
            .from('tour_categories')
            .select('*')
            .eq('is_published', true)
            .order('sort_order', { ascending: true });

          if (!error && data && data.length > 0) {
            this.setCache(cacheKey, data);
            return data;
          }
        } catch (err) {
          console.warn('[Lotus CMS] Live fetch categories failed, falling back:', err);
        }
      }

      // Fallback
      const fallback = await this.getFallbackData();
      return fallback.tour_categories || [];
    }

    /**
     * Fetch Published Tours
     */
    async getTours(categorySlug = null) {
      const cacheKey = 'cache_tours_' + (categorySlug || 'all');
      const cached = this.getCache(cacheKey);
      if (cached) return cached;

      if (this.client) {
        try {
          let query = this.client
            .from('tours')
            .select('*')
            .eq('is_published', true)
            .order('sort_order', { ascending: true });

          if (categorySlug) {
            query = query.eq('category_slug', categorySlug);
          }

          const { data, error } = await query;
          if (!error && data && data.length > 0) {
            this.setCache(cacheKey, data);
            return data;
          }
        } catch (err) {
          console.warn('[Lotus CMS] Live fetch tours failed, falling back:', err);
        }
      }

      // Fallback
      const fallback = await this.getFallbackData();
      const tours = fallback.tours || [];
      if (categorySlug) {
        return tours.filter(t => t.category_slug === categorySlug);
      }
      return tours;
    }

    /**
     * Fetch Published Reviews / Testimonials
     */
    async getReviews() {
      const cacheKey = 'cache_reviews';
      const cached = this.getCache(cacheKey);
      if (cached) return cached;

      if (this.client) {
        try {
          const { data, error } = await this.client
            .from('reviews')
            .select('*')
            .eq('is_published', true)
            .order('sort_order', { ascending: true });

          if (!error && data && data.length > 0) {
            this.setCache(cacheKey, data);
            return data;
          }
        } catch (err) {
          console.warn('[Lotus CMS] Live fetch reviews failed, falling back:', err);
        }
      }

      // Fallback
      const fallback = await this.getFallbackData();
      return fallback.reviews || [];
    }

    /**
     * Generate Inquiry Reference Number
     */
    generateRefNo() {
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const rand = Math.floor(1000 + Math.random() * 9000);
      return `LC-${date}-${rand}`;
    }

    /**
     * Submit an Inquiry to Supabase with RLS Protection
     */
    async submitInquiry(inquiryData) {
      const referenceNo = inquiryData.reference_no || this.generateRefNo();
      const payload = {
        ...inquiryData,
        reference_no: referenceNo,
        status: 'new'
      };

      if (this.client) {
        try {
          const { data, error } = await this.client
            .from('inquiries')
            .insert([payload])
            .select();

          if (error) throw error;
          return { success: true, referenceNo, data };
        } catch (err) {
          console.error('[Lotus CMS] Inquiry insert error:', err);
          return { success: false, referenceNo, error: err.message };
        }
      }

      // If client is not live, return success with reference number for email/whatsapp fallback
      console.info('[Lotus CMS] Supabase client offline, handled locally with ref:', referenceNo);
      return { success: true, referenceNo, offline: true };
    }
  }

  // Expose singleton to global window scope
  window.LotusSupabase = new LotusSupabaseClient();

})(window);
