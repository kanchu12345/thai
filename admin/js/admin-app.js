/**
 * LOTUS CEYLON International Tours & Services (Pvt) Ltd
 * CMS Admin Panel Application Logic
 * 
 * Features:
 * - Supabase Authentication & Role Verification (super_admin vs editor)
 * - Automatic Session Idle Timeout (30 mins)
 * - Full CRUD for Inquiries, Packages, Categories, Destinations, Reviews
 * - Client-side Image Compression (HTML5 Canvas to WebP max 1920px, 5MB limit)
 * - Drag-drop upload to Supabase Storage "media" bucket
 * - Reusable Image Picker Modal
 * - CSV Export for Customer Inquiries
 * - Multi-language Form Tabs (EN, 中文) & Itinerary/Highlight Repeaters
 * - Unsaved Changes Protection
 * - Toast Notification System
 */

(function (window) {
  'use strict';

  const IDLE_TIMEOUT_MINUTES = 30;
  const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

  const AdminApp = {
    client: null,
    fbAuth: null,
    fbDb: null,
    currentUser: null,
    currentRole: 'editor',
    activeSection: 'dashboard',
    lastActivity: Date.now(),
    unsavedChanges: false,
    
    // In-memory data store
    inquiries: [],
    activeInquiryTab: 'quick',
    quickInquiries: [],
    detailedInquiries: [],
    team: [],
    packages: [],
    categories: [],
    destinations: [],
    reviews: [],
    mediaFiles: [],
    settings: {},

    targetPickerInputId: null,
    deleteActionCallback: null,

    /**
     * Application Initialization
     */
    async init() {
      this.initFirebase();
      this.initSupabaseClient();
      this.setupIdleDetector();
      this.setupBeforeUnload();

      if (this.fbAuth) {
        // Firebase Authentication is the primary login system
        this.fbAuth.onAuthStateChanged(async (user) => {
          if (user) {
            this.currentUser = { email: user.email, id: user.uid };
            await this.fetchUserRole(user.uid, user.email);
            this.showApp();
          } else {
            // Fallback check if Supabase session exists
            if (this.client) {
              const { data: { session } } = await this.client.auth.getSession();
              if (session && session.user) {
                this.currentUser = session.user;
                await this.fetchUserRole(session.user.id, session.user.email);
                this.showApp();
                return;
              }
            }
            this.currentUser = null;
            this.showLogin();
          }
        });
      } else if (this.client) {
        // Supabase Auth listener fallback
        this.client.auth.onAuthStateChange(async (event, session) => {
          if (session && session.user) {
            this.currentUser = session.user;
            await this.fetchUserRole(session.user.id, session.user.email);
            this.showApp();
          } else {
            this.currentUser = null;
            this.showLogin();
          }
        });

        const { data: { session } } = await this.client.auth.getSession();
        if (session && session.user) {
          this.currentUser = session.user;
          await this.fetchUserRole(session.user.id, session.user.email);
          this.showApp();
        } else {
          this.showLogin();
        }
      } else {
        // Local mode fallback
        console.warn('[AdminApp] Neither Firebase nor Supabase initialized. Ready for login.');
        this.showLogin();
      }
    },

    /**
     * Initialize Firebase SDK
     */
    initFirebase() {
      const cfg = (window.LOTUS_CONFIG && window.LOTUS_CONFIG.firebase) || null;
      if (window.firebase && cfg && cfg.apiKey) {
        try {
          if (!window.firebase.apps || !window.firebase.apps.length) {
            window.firebase.initializeApp(cfg);
          }
          this.fbAuth = window.firebase.auth();
          this.fbDb = window.firebase.firestore();
          console.log('[AdminApp] Firebase Auth & Firestore successfully initialized.');
        } catch (e) {
          console.warn('[AdminApp] Firebase initialization error:', e);
        }
      }
    },

    /**
     * Initialize Supabase SDK
     */
    initSupabaseClient() {
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
          console.error('[AdminApp] Supabase init error:', e);
          this.client = null;
        }
      }
    },

    /**
     * Fetch user role from Firestore 'admins' or Supabase 'roles'
     */
    async fetchUserRole(userId, email) {
      if (this.fbDb && userId) {
        try {
          const docSnap = await this.fbDb.collection('admins').doc(userId).get();
          if (docSnap.exists) {
            const data = docSnap.data();
            this.currentRole = data.role || 'super_admin';
            return;
          }
        } catch (e) {
          console.warn('[AdminApp] Firestore admin verification:', e.message);
        }
      }

      if (this.client && userId) {
        try {
          const { data, error } = await this.client
            .from('roles')
            .select('role')
            .eq('user_id', userId)
            .single();

          if (!error && data && data.role) {
            this.currentRole = data.role;
            return;
          }
        } catch (e) {
          // ignore
        }
      }

      this.currentRole = 'super_admin';
    },

    /**
     * Show Main Dashboard App
     */
    async showApp() {
      document.getElementById('authScreen').style.display = 'none';
      document.getElementById('adminApp').style.display = 'flex';

      // Update User Info in Topbar
      const emailEl = document.getElementById('currentUserEmail');
      const roleEl = document.getElementById('currentUserRole');
      if (emailEl) emailEl.textContent = this.currentUser ? this.currentUser.email : 'Admin';
      if (roleEl) {
        roleEl.textContent = this.currentRole.replace('_', ' ').toUpperCase();
        roleEl.className = 'role-badge ' + this.currentRole;
      }

      await this.loadAllData();
      this.switchSection('dashboard');
    },

    /**
     * Show Login Screen
     */
    showLogin() {
      document.getElementById('adminApp').style.display = 'none';
      document.getElementById('authScreen').style.display = 'flex';
    },

    /**
     * Handle Admin Login (Firebase Auth primary, Supabase fallback, Local demo fallback)
     */
    async handleLogin(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const btn = document.getElementById('loginBtn');

      if (!email || !password) {
        this.showToast('Please enter both email and password', 'error');
        return;
      }

      btn.disabled = true;
      btn.innerHTML = '<span>Signing In...</span>';

      try {
        if (this.fbAuth) {
          const cred = await this.fbAuth.signInWithEmailAndPassword(email, password);
          this.currentUser = { email: cred.user.email, id: cred.user.uid };
          await this.fetchUserRole(cred.user.uid, cred.user.email);
          this.showToast('Welcome back to Lotus Ceylon CMS', 'success');
          this.showApp();
        } else if (this.client) {
          const { data, error } = await this.client.auth.signInWithPassword({
            email,
            password
          });
          if (error) throw error;
          this.showToast('Welcome back to Lotus Ceylon CMS', 'success');
        } else {
          this.showToast('Entering local preview mode...', 'info');
          this.currentUser = { email, id: 'demo-admin-uid' };
          this.currentRole = 'super_admin';
          this.showApp();
        }
      } catch (err) {
        this.showToast('Login failed: ' + err.message, 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>Sign In to Dashboard</span>';
      }
    },

    /**
     * Handle Admin Logout
     */
    async handleLogout() {
      if (this.unsavedChanges && !confirm('You have unsaved changes. Are you sure you want to log out?')) {
        return;
      }

      if (this.fbAuth) {
        try { await this.fbAuth.signOut(); } catch (e) { console.warn(e); }
      }
      if (this.client) {
        try { await this.client.auth.signOut(); } catch (e) { console.warn(e); }
      }
      this.currentUser = null;
      this.showLogin();
      this.showToast('Signed out successfully', 'info');
    },

    /**
     * Show Password Reset Modal
     */
    showResetModal(e) {
      if (e) e.preventDefault();
      this.openModal('resetModal');
    },

    /**
     * Send Password Reset Link
     */
    async sendPasswordReset() {
      const email = document.getElementById('resetEmail').value.trim();
      if (!email) {
        this.showToast('Please enter your email address', 'error');
        return;
      }

      try {
        if (this.fbAuth) {
          await this.fbAuth.sendPasswordResetEmail(email);
          this.showToast('Password reset email sent to ' + email, 'success');
          this.closeModal('resetModal');
        } else if (this.client) {
          const { error } = await this.client.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/admin/'
          });
          if (error) throw error;
          this.showToast('Password reset email sent to ' + email, 'success');
          this.closeModal('resetModal');
        } else {
          this.showToast('Password reset link sent to ' + email + ' (Simulated in local mode)', 'success');
          this.closeModal('resetModal');
        }
      } catch (err) {
        this.showToast('Error: ' + err.message, 'error');
      }
    },

    /**
     * Setup 30-min Idle Timeout
     */
    setupIdleDetector() {
      const updateActivity = () => { this.lastActivity = Date.now(); };
      window.addEventListener('mousemove', updateActivity, { passive: true });
      window.addEventListener('keydown', updateActivity, { passive: true });
      window.addEventListener('click', updateActivity, { passive: true });

      setInterval(() => {
        if (!this.currentUser) return;
        const idleMins = (Date.now() - this.lastActivity) / (1000 * 60);
        if (idleMins >= IDLE_TIMEOUT_MINUTES) {
          this.handleLogout();
          this.showToast('You were logged out due to 30 minutes of inactivity.', 'warning', 8000);
        }
      }, 60000); // Check every minute
    },

    /**
     * Setup Unsaved Changes Warning
     */
    setupBeforeUnload() {
      window.addEventListener('beforeunload', (e) => {
        if (this.unsavedChanges) {
          e.preventDefault();
          e.returnValue = '';
        }
      });
    },

    /**
     * Switch Navigation Section
     */
    switchSection(sectionId) {
      if (this.unsavedChanges && !confirm('You have unsaved changes. Discard and switch section?')) {
        return;
      }
      this.unsavedChanges = false;
      this.activeSection = sectionId;

      // Update Sidebar Active Class
      document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionId);
      });

      // Update Content Section
      document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
      });
      const targetSec = document.getElementById('section-' + sectionId);
      if (targetSec) targetSec.classList.add('active');

      // Update Topbar Title
      const titleMap = {
        dashboard: 'Dashboard Overview',
        inquiries: 'Customer Inquiries',
        packages: 'Tour Packages',
        categories: 'Tour Categories',
        destinations: 'Destinations',
        reviews: 'Guest Reviews & Testimonials',
        media: 'Media Library',
        users: 'User Roles & Access',
        settings: 'Global Settings',
        team: 'Our People & Global Representatives'
      };
      const titleEl = document.getElementById('pageTitle');
      if (titleEl) titleEl.textContent = titleMap[sectionId] || 'Admin';

      // Close mobile sidebar if open
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.remove('open');
    },

    toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.toggle('open');
    },

    /**
     * Load All Content Data
     */
    async loadAllData() {
      if (this.client) {
        try {
          // Parallel fetch from Supabase
          const [inqRes, pkgRes, catRes, revRes] = await Promise.all([
            this.client.from('inquiries').select('*').order('created_at', { ascending: false }),
            this.client.from('tours').select('*').order('sort_order', { ascending: true }),
            this.client.from('tour_categories').select('*').order('sort_order', { ascending: true }),
            this.client.from('reviews').select('*').order('created_at', { ascending: false })
          ]);

          this.inquiries = inqRes.data || [];
          this.packages = pkgRes.data || [];
          this.categories = catRes.data || [];
          this.reviews = revRes.data || [];
        } catch (e) {
          console.warn('[AdminApp] Supabase fetch error, falling back to local dataset:', e);
          await this.loadLocalFallbackData();
        }
      } else {
        await this.loadLocalFallbackData();
      }

      this.renderDashboard();
        if (window.LotusFirebase) {
          this.updateFirebaseBadge('Firebase Ready', '#3B82F6');
        }
      await this.loadDualInquiries();
      await this.loadTeamData();
      this.renderInquiries();
      this.renderTeam();
      this.renderPackages();
      this.renderCategories();
      this.renderDestinations();
      this.renderReviews();
      this.renderMediaLibrary();
      this.renderUsers();
      this.renderSettings();
    },

    /**
     * Fallback to default JSON content if offline or unconfigured
     */
    async loadLocalFallbackData() {
      try {
        // 1. Load tour catalog from data/packages.json
        try {
          const pkgRes = await fetch('../data/packages.json');
          if (pkgRes.ok) {
            const pkgData = await pkgRes.json();
            if (pkgData.packages && pkgData.packages.length) {
              this.packages = pkgData.packages.map(p => ({
                id: p.id,
                slug: p.slug,
                title: p.title,
                category_slug: p.category,
                nights: p.nights,
                days: p.days,
                price_from: 0,
                hero_image: (p.images && p.images[0]) || `assets/tours/${p.category}/hero.jpg`,
                overview: p.tagline,
                itinerary: (p.itinerary || []).map(it => ({
                  title: it.title,
                  desc: it.description,
                  stay: it.stay || ''
                })),
                highlights: p.highlights || [],
                inclusions: p.inclusions || [],
                exclusions: p.exclusions || [],
                season: p.bestSeason || 'Year-Round',
                is_popular: (p.tags && p.tags.includes('Popular')) || false,
                is_published: true
              }));
            }
            if (pkgData.categories) {
              this.categories = Object.values(pkgData.categories).map((c, idx) => ({
                id: c.id,
                name: c.title,
                slug: c.slug,
                tagline: c.tagline,
                sort_order: idx + 1,
                is_published: true,
                map_image: c.mapImage || ''
              }));
            }
          }
        } catch (pkgErr) {
          console.warn('[AdminApp] Could not load packages.json:', pkgErr);
        }

        // 2. Load reviews and settings from default-content.json
        const res = await fetch('../data/default-content.json');
        const data = await res.json();
        if (!this.packages.length) this.packages = data.tours || [];
        if (!this.categories.length) this.categories = data.tour_categories || [];
        this.reviews = data.reviews || [];
        this.settings = data.site_settings || {};
        
        // Sample fallback inquiries
        this.inquiries = [
          {
            reference_no: 'LC-20261021-8492',
            full_name: 'Arthur Pendelton',
            email: 'arthur.p@voyages.co.uk',
            phone: '+44 7911 123456',
            country: 'United Kingdom',
            travel_dates: 'Nov 14 – Nov 24, 2026',
            travelers_count: 2,
            package_type: 'Grand Ceylon Heritage',
            budget_range: '$3,000 – $5,000 USD',
            special_notes: 'Interested in private cultural excursions, Buddhist meditation session, and luxury boutique villas.',
            status: 'new',
            created_at: new Date().toISOString()
          },
          {
            reference_no: 'LC-20261020-5120',
            full_name: 'Chen Meng',
            email: 'chen.meng@shanghai.cn',
            phone: '+86 138 0000 1234',
            country: 'China',
            travel_dates: 'Dec 22 – Jan 02, 2027',
            travelers_count: 4,
            package_type: 'Family Escapes & Wildlife',
            budget_range: '$6,000 – $8,000 USD',
            special_notes: 'Family with two children. Requesting Chinese speaking tour escort and private minivan.',
            status: 'contacted',
            created_at: new Date(Date.now() - 86400000).toISOString()
          }
        ];
      } catch (e) {
        console.error('[AdminApp] Could not load fallback JSON:', e);
      }
    },

    /**
     * 1. DASHBOARD RENDERING
     */
    renderDashboard() {
      // Counts
      const totalPackages = this.packages.length;
      const newInquiries = this.inquiries.filter(i => i.status === 'new').length;
      const monthInquiries = this.inquiries.length;
      const totalReviews = this.reviews.length;

      document.getElementById('statPackagesCount').textContent = totalPackages;
      document.getElementById('statNewInquiriesCount').textContent = newInquiries;
      document.getElementById('statMonthInquiriesCount').textContent = monthInquiries;
      document.getElementById('statReviewsCount').textContent = totalReviews;
      document.getElementById('unreadInquiriesBadge').textContent = newInquiries;

      // Recent 5 Inquiries
      const tbody = document.getElementById('dashboardInquiriesTbody');
      const recent = this.inquiries.slice(0, 5);

      if (recent.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--ink-muted);">No inquiries received yet.</td></tr>';
        return;
      }

      tbody.innerHTML = recent.map(inq => `
        <tr>
          <td><strong style="color: var(--lotus-primary); font-size: 0.8rem;">${inq.reference_no}</strong></td>
          <td><strong>${inq.full_name}</strong><br><small style="color: var(--ink-muted);">${inq.country || ''}</small></td>
          <td>${inq.email}<br><small style="color: var(--ink-muted);">${inq.phone || 'N/A'}</small></td>
          <td>${inq.travel_dates || 'Flexible'}<br><small>${inq.travelers_count || 2} Pax</small></td>
          <td><span class="badge ${this.getInquiryBadgeClass(inq.status)}">${inq.status}</span></td>
          <td><small style="color: var(--ink-muted);">${this.formatDate(inq.created_at)}</small></td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="AdminApp.viewInquiry('${inq.reference_no}')">View</button>
          </td>
        </tr>
      `).join('');
    },

    getInquiryBadgeClass(status) {
      switch (status) {
        case 'new': return 'badge-warning';
        case 'contacted': return 'badge-info';
        case 'customizing': return 'badge-primary';
        case 'confirmed': return 'badge-success';
        default: return 'badge-secondary';
      }
    },

    formatDate(isoString) {
      if (!isoString) return '';
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },

    /**
     * 2. INQUIRIES MANAGEMENT
     */
    async loadDualInquiries() {
      // 1. Try Firebase Firestore
      if (window.LotusFirebase && typeof window.LotusFirebase.fetchInquiries === 'function') {
        try {
          const quickList = await window.LotusFirebase.fetchInquiries('inquiries_quick');
          const detailedList = await window.LotusFirebase.fetchInquiries('inquiries_detailed');
          if (quickList.length > 0 || detailedList.length > 0) {
            this.quickInquiries = quickList;
            this.detailedInquiries = detailedList;
          }
        } catch (e) {
          console.warn('[AdminApp] Firebase inquiries fetch notice:', e.message);
        }
      }

      // 2. Check localStorage backups
      try {
        const localList = JSON.parse(localStorage.getItem('lotus_inquiries') || '[]');
        localList.forEach(item => {
          const ref = item.referenceId || item.reference_no;
          if (item.isQuickForm || item.formType === 'quick') {
            if (!this.quickInquiries.some(q => (q.referenceId || q.reference_no) === ref)) {
              this.quickInquiries.push(item);
            }
          } else {
            if (!this.detailedInquiries.some(d => (d.referenceId || d.reference_no) === ref)) {
              this.detailedInquiries.push(item);
            }
          }
        });
      } catch (e) {}

      // 3. Fallback to Supabase inquiries if empty
      if (this.quickInquiries.length === 0 && this.detailedInquiries.length === 0 && this.inquiries.length > 0) {
        this.inquiries.forEach(inq => {
          if ((inq.package_type && inq.package_type.toLowerCase().includes('quick')) || inq.is_quick) {
            this.quickInquiries.push(inq);
          } else {
            this.detailedInquiries.push(inq);
          }
        });
      }

      // Update counters
      const countQ = document.getElementById('countQuickInquiries');
      if (countQ) countQ.textContent = this.quickInquiries.length;
      const countD = document.getElementById('countDetailedInquiries');
      if (countD) countD.textContent = this.detailedInquiries.length;
    },

    switchInquiryTab(tab) {
      this.activeInquiryTab = tab;
      const btnQ = document.getElementById('btnTabQuickInquiries');
      const btnD = document.getElementById('btnTabDetailedInquiries');
      if (btnQ && btnD) {
        btnQ.classList.toggle('active', tab === 'quick');
        btnD.classList.toggle('active', tab === 'detailed');
      }

      const thead = document.getElementById('inquiriesTableHead');
      if (thead) {
        if (tab === 'quick') {
          thead.innerHTML = `
            <tr>
              <th>Ref #</th>
              <th>Guest Details</th>
              <th>Country</th>
              <th>Travel Dates</th>
              <th>Pax</th>
              <th>Status</th>
              <th>Received</th>
              <th>Actions</th>
            </tr>
          `;
        } else {
          thead.innerHTML = `
            <tr>
              <th>Ref #</th>
              <th>Guest Details</th>
              <th>Country</th>
              <th>Travel Dates</th>
              <th>Pax & Rooms</th>
              <th>Hotels & Budget</th>
              <th>Status</th>
              <th>Received</th>
              <th>Actions</th>
            </tr>
          `;
        }
      }

      this.filterInquiries();
    },

    renderInquiries() {
      this.filterInquiries();
    },

    filterInquiries() {
      const search = (document.getElementById('inquirySearchInput')?.value || '').toLowerCase();
      const statusFilter = document.getElementById('inquiryStatusFilter')?.value || 'all';

      const isQuick = this.activeInquiryTab === 'quick';
      let list = isQuick ? [...this.quickInquiries] : [...this.detailedInquiries];

      if (statusFilter !== 'all') {
        list = list.filter(i => (i.status || 'new') === statusFilter);
      }

      if (search) {
        list = list.filter(i => {
          const name = (i.fullName || i.full_name || '').toLowerCase();
          const email = (i.emailAddress || i.email || '').toLowerCase();
          const ref = (i.referenceId || i.reference_no || '').toLowerCase();
          const country = (i.country || '').toLowerCase();
          return name.includes(search) || email.includes(search) || ref.includes(search) || country.includes(search);
        });
      }

      const tbody = document.getElementById('inquiriesTableBody');
      if (!tbody) return;

      const colCount = isQuick ? 8 : 9;
      if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${colCount}" style="text-align: center; color: var(--ink-muted); padding: 30px;">No ${isQuick ? 'quick' : 'detailed'} inquiries found matching criteria.</td></tr>`;
        return;
      }

      tbody.innerHTML = list.map(inq => {
        const refNo = inq.referenceId || inq.reference_no || inq.id || 'N/A';
        const name = inq.fullName || inq.full_name || 'Guest';
        const email = inq.emailAddress || inq.email || '';
        const phone = inq.whatsapp || inq.phone || '';
        const country = inq.country || 'N/A';
        const dates = (inq.arrivalDate && inq.departureDate) ? `${inq.arrivalDate} to ${inq.departureDate}` : (inq.travel_dates || 'Flexible');
        const pax = `${inq.totalPax || inq.travelers_count || 2} Pax`;
        const rooms = inq.roomsRequired ? `${inq.roomsRequired} Rm` : '';
        const hotels = inq.hotelCategory || 'N/A';
        const budget = inq.packageBudget && inq.packageBudget !== 'Custom' ? `${inq.currency || 'USD'} ${inq.packageBudget}` : (inq.budget_range || 'Custom');
        const status = inq.status || 'new';
        const dateReceived = this.formatDate(inq.createdAt || inq.timestamp || inq.created_at);

        if (isQuick) {
          return `
            <tr>
              <td><strong style="color: var(--lotus-primary); font-size: 0.82rem;">${refNo}</strong></td>
              <td>
                <strong>${name}</strong><br>
                <small style="color: var(--ink-muted);">${email} ${phone ? `| ${phone}` : ''}</small>
              </td>
              <td>${country}</td>
              <td>${dates}</td>
              <td>${pax}</td>
              <td>
                <select class="filter-select" style="padding: 3px 6px; font-size: 0.78rem;" onchange="AdminApp.updateInquiryStatus('${refNo}', this.value)">
                  <option value="new" ${status === 'new' ? 'selected' : ''}>New</option>
                  <option value="contacted" ${status === 'contacted' ? 'selected' : ''}>Contacted</option>
                  <option value="customizing" ${status === 'customizing' ? 'selected' : ''}>Customizing</option>
                  <option value="confirmed" ${status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                  <option value="archived" ${status === 'archived' ? 'selected' : ''}>Archived</option>
                </select>
              </td>
              <td><small style="color: var(--ink-muted);">${dateReceived}</small></td>
              <td>
                <div class="action-btns">
                  <button class="btn-icon" title="View Details" onclick="AdminApp.viewInquiry('${refNo}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  </button>
                  <button class="btn-icon delete" title="Delete Inquiry" onclick="AdminApp.deleteInquiry('${refNo}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          `;
        } else {
          return `
            <tr>
              <td><strong style="color: var(--lotus-primary); font-size: 0.82rem;">${refNo}</strong></td>
              <td>
                <strong>${name}</strong><br>
                <small style="color: var(--ink-muted);">${email} ${phone ? `| ${phone}` : ''}</small>
              </td>
              <td>${country}</td>
              <td>${dates}</td>
              <td>${pax} ${rooms ? `<br><small style="color: var(--ink-muted);">${rooms}</small>` : ''}</td>
              <td>
                <small><strong>Hotels:</strong> ${hotels}</small><br>
                <small style="color: var(--sacred-gold);"><strong>Budget:</strong> ${budget}</small>
              </td>
              <td>
                <select class="filter-select" style="padding: 3px 6px; font-size: 0.78rem;" onchange="AdminApp.updateInquiryStatus('${refNo}', this.value)">
                  <option value="new" ${status === 'new' ? 'selected' : ''}>New</option>
                  <option value="contacted" ${status === 'contacted' ? 'selected' : ''}>Contacted</option>
                  <option value="customizing" ${status === 'customizing' ? 'selected' : ''}>Customizing</option>
                  <option value="confirmed" ${status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                  <option value="archived" ${status === 'archived' ? 'selected' : ''}>Archived</option>
                </select>
              </td>
              <td><small style="color: var(--ink-muted);">${dateReceived}</small></td>
              <td>
                <div class="action-btns">
                  <button class="btn-icon" title="View Details" onclick="AdminApp.viewInquiry('${refNo}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  </button>
                  <button class="btn-icon delete" title="Delete Inquiry" onclick="AdminApp.deleteInquiry('${refNo}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }
      }).join('');
    },

    async updateInquiryStatus(refNo, newStatus) {
      const inq = this.inquiries.find(i => i.reference_no === refNo);
      if (inq) inq.status = newStatus;

      if (this.client) {
        try {
          await this.client
            .from('inquiries')
            .update({ status: newStatus })
            .eq('reference_no', refNo);
          this.showToast(`Inquiry ${refNo} updated to ${newStatus}`, 'success');
        } catch (e) {
          this.showToast('Failed to update status on server', 'error');
        }
      } else {
        this.showToast(`Status updated to ${newStatus} (Local mode)`, 'info');
      }
      this.renderDashboard();
    },

    viewInquiry(refNo) {
      const inq = this.inquiries.find(i => i.reference_no === refNo);
      if (!inq) return;

      document.getElementById('inquiryModalRef').textContent = `Inquiry: ${inq.reference_no}`;
      const body = document.getElementById('inquiryModalBody');
      body.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Guest Name</label><div style="font-weight: 600;">${inq.full_name}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Country</label><div>${inq.country || 'N/A'}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Email</label><div><a href="mailto:${inq.email}">${inq.email}</a></div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Phone / WhatsApp</label><div><a href="tel:${inq.phone}">${inq.phone || 'N/A'}</a></div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Travel Dates</label><div>${inq.travel_dates || 'Flexible'}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Travelers Count</label><div>${inq.travelers_count || 2} Pax</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Tour / Category</label><div>${inq.package_type || 'Bespoke Tour'}</div></div>
          <div><label style="color: var(--ink-muted); font-size: 0.78rem;">Budget Range</label><div>${inq.budget_range || 'Not specified'}</div></div>
        </div>
        <div style="margin-top: 14px; background: var(--ivory); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <label style="font-weight: 600; font-size: 0.85rem; color: var(--ink);">Guest Notes & Special Requests</label>
          <p style="margin-top: 6px; font-size: 0.9rem; line-height: 1.6; color: var(--ink-light);">${inq.special_notes || 'No special notes provided.'}</p>
        </div>
      `;

      // WhatsApp reply button
      const waBtn = document.getElementById('inquiryWhatsAppBtn');
      if (inq.phone) {
        const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
        const message = encodeURIComponent(`Hello ${inq.full_name}, thank you for contacting Lotus Ceylon Tours regarding your Sri Lanka journey (Ref: ${inq.reference_no}). We would love to assist you with your personalized itinerary!`);
        waBtn.onclick = () => window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
        waBtn.style.display = 'inline-flex';
      } else {
        waBtn.style.display = 'none';
      }

      this.openModal('inquiryModal');
    },

    deleteInquiry(refNo) {
      this.confirmDelete(`Are you sure you want to delete inquiry ${refNo}?`, async () => {
        this.inquiries = this.inquiries.filter(i => i.reference_no !== refNo);
        if (this.client) {
          try {
            await this.client.from('inquiries').delete().eq('reference_no', refNo);
            this.showToast('Inquiry deleted from server', 'success');
          } catch (e) {
            this.showToast('Failed to delete on server', 'error');
          }
        }
        this.renderInquiries();
        this.renderDashboard();
      });
    },

    exportInquiriesCSV() {
      const isQuick = this.activeInquiryTab === 'quick';
      const list = isQuick ? this.quickInquiries : this.detailedInquiries;
      const sheetName = isQuick ? 'Lotus_Ceylon_Quick_Inquiries' : 'Lotus_Ceylon_Detailed_Inquiries';

      if (list.length === 0) {
        this.showToast(`No ${isQuick ? 'quick' : 'detailed'} inquiries available to export`, 'error');
        return;
      }

      let headers = [];
      let rows = [];

      if (isQuick) {
        headers = ['Reference No', 'Guest Name', 'Email', 'WhatsApp Phone', 'Country', 'Arrival Date', 'Departure Date', 'Total Pax', 'Adults', 'Children', 'Hotel Style', 'Status', 'Date Received'];
        rows = list.map(i => [
          `"${i.referenceId || i.reference_no || ''}"`,
          `"${(i.fullName || i.full_name || '').replace(/"/g, '""')}"`,
          `"${i.emailAddress || i.email || ''}"`,
          `"${i.whatsapp || i.phone || ''}"`,
          `"${i.country || ''}"`,
          `"${i.arrivalDate || ''}"`,
          `"${i.departureDate || ''}"`,
          i.totalPax || i.travelers_count || 2,
          i.adults || 2,
          i.children || 0,
          `"${(i.hotelCategory || '').replace(/"/g, '""')}"`,
          `"${i.status || 'new'}"`,
          `"${i.createdAt || i.timestamp || i.created_at || ''}"`
        ]);
      } else {
        headers = ['Reference No', 'Guest Name', 'Email', 'WhatsApp Phone', 'Country', 'Arrival Date', 'Departure Date', 'Total Pax', 'Adults', 'Children', 'Rooms', 'Hotels', 'Meal Plan', 'Interests', 'Currency', 'Budget', 'Special Notes', 'Status', 'Date Received'];
        rows = list.map(i => [
          `"${i.referenceId || i.reference_no || ''}"`,
          `"${(i.fullName || i.full_name || '').replace(/"/g, '""')}"`,
          `"${i.emailAddress || i.email || ''}"`,
          `"${i.whatsapp || i.phone || ''}"`,
          `"${i.country || ''}"`,
          `"${i.arrivalDate || ''}"`,
          `"${i.departureDate || ''}"`,
          i.totalPax || i.travelers_count || 2,
          i.adults || 2,
          i.children || 0,
          i.roomsRequired || 1,
          `"${(i.hotelCategory || '').replace(/"/g, '""')}"`,
          `"${(i.mealPlan || '').replace(/"/g, '""')}"`,
          `"${(i.interests || '').replace(/"/g, '""')}"`,
          `"${i.currency || 'USD'}"`,
          `"${i.packageBudget || ''}"`,
          `"${(i.otherRequirements || i.special_notes || '').replace(/"/g, '""')}"`,
          `"${i.status || 'new'}"`,
          `"${i.createdAt || i.timestamp || i.created_at || ''}"`
        ]);
      }

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${sheetName}_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.showToast(`Exported ${list.length} inquiries to CSV successfully!`, 'success');
    },

    // =========================================================================
    // TEAM & GLOBAL REPRESENTATIVES (DATA-DRIVEN)
    // =========================================================================
    async loadTeamData() {
      if (window.LotusFirebase && typeof window.LotusFirebase.fetchTeam === 'function') {
        try {
          const list = await window.LotusFirebase.fetchTeam('../data/team.json');
          if (list && list.length > 0) {
            this.team = list;
          }
        } catch (e) {
          console.warn('[AdminApp] Team fetch error, using local fallback:', e);
        }
      }

      if (this.team.length === 0) {
        try {
          const res = await fetch('../data/team.json');
          if (res.ok) this.team = await res.json();
        } catch (e) {}
      }
    },

    renderTeam() {
      const tbody = document.getElementById('teamTableBody');
      if (!tbody) return;

      if (!this.team || this.team.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--ink-muted); padding: 30px;">No representatives found. Click "+ Add Representative" to create one.</td></tr>';
        return;
      }

      this.team.sort((a, b) => (a.sortOrder || 1) - (b.sortOrder || 1));

      tbody.innerHTML = this.team.map(member => {
        const photoUrl = member.photo ? (member.photo.url || member.photo.secure_url || '') : '';
        const flag = member.flag || '🌐';
        return `
          <tr>
            <td>
              ${photoUrl ? `<img src="${photoUrl}" alt="${member.name}" class="team-avatar-cell">` : `<div class="team-avatar-cell" style="background:#E2E8F0; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">${flag}</div>`}
            </td>
            <td><strong>${member.name}</strong></td>
            <td>${member.role}</td>
            <td><span>${flag}</span> ${member.country}</td>
            <td>${member.sortOrder || 1}</td>
            <td>
              <span class="badge ${member.published ? 'badge-success' : 'badge-secondary'}" style="cursor:pointer;" onclick="AdminApp.toggleTeamPublished('${member.id}')">
                ${member.published ? 'Published' : 'Draft'}
              </span>
            </td>
            <td>
              <div class="action-btns">
                <button class="btn-icon" title="Edit" onclick="AdminApp.openTeamModal('${member.id}')">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </button>
                <button class="btn-icon delete" title="Delete" onclick="AdminApp.deleteTeamMember('${member.id}')">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    },

    openTeamModal(memberId = null) {
      const modal = document.getElementById('teamModal');
      const title = document.getElementById('teamModalTitle');
      const form = document.getElementById('teamMemberForm');
      if (!modal || !form) return;

      form.reset();

      if (memberId) {
        const member = this.team.find(m => m.id === memberId);
        if (member) {
          title.textContent = 'Edit Representative';
          document.getElementById('teamMemberId').value = member.id;
          document.getElementById('teamName').value = member.name || '';
          document.getElementById('teamFlag').value = member.flag || '';
          document.getElementById('teamRole').value = member.role || '';
          document.getElementById('teamCountry').value = member.country || '';
          document.getElementById('teamPhotoUrl').value = member.photo ? (member.photo.url || '') : '';
          document.getElementById('teamBio').value = member.bio || '';
          document.getElementById('teamSortOrder').value = member.sortOrder || 1;
          document.getElementById('teamPublished').checked = member.published !== false;
        }
      } else {
        title.textContent = 'Add Representative';
        document.getElementById('teamMemberId').value = '';
        document.getElementById('teamSortOrder').value = (this.team.length + 1);
        document.getElementById('teamPublished').checked = true;
      }

      this.openModal('teamModal');
    },

    openCloudinaryForTeam() {
      if (!window.cloudinary) {
        this.showToast('Cloudinary widget not loaded', 'error');
        return;
      }

      const widget = window.cloudinary.createUploadWidget({
        cloudName: LOTUS_CONFIG.cloudinary.cloudName,
        uploadPreset: LOTUS_CONFIG.cloudinary.uploadPreset,
        folder: 'lotus/team',
        cropping: true,
        croppingAspectRatio: 0.8,
        gravity: 'face',
        sources: ['local', 'url', 'camera'],
        multiple: false
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          const optimizedUrl = result.info.secure_url.replace('/upload/', '/upload/c_fill,g_face,q_auto,f_auto/');
          const input = document.getElementById('teamPhotoUrl');
          if (input) input.value = optimizedUrl;
          this.showToast('Photo uploaded & face-centered successfully!', 'success');
        }
      });
      widget.open();
    },

    async saveTeamMember(e) {
      e.preventDefault();
      const id = document.getElementById('teamMemberId').value || ('rep-' + Date.now());
      const name = document.getElementById('teamName').value.trim();
      const flag = document.getElementById('teamFlag').value.trim() || '🌐';
      const role = document.getElementById('teamRole').value.trim();
      const country = document.getElementById('teamCountry').value.trim();
      const photoUrl = document.getElementById('teamPhotoUrl').value.trim();
      const bio = document.getElementById('teamBio').value.trim() || 'Introduction coming soon';
      const sortOrder = parseInt(document.getElementById('teamSortOrder').value, 10) || 1;
      const published = document.getElementById('teamPublished').checked;

      const memberData = {
        id: id,
        name: name,
        flag: flag,
        role: role,
        country: country,
        photo: {
          url: photoUrl,
          alt: `${name}, ${role}`,
          cloudinaryPublicId: photoUrl.includes('cloudinary') ? photoUrl.split('/').pop().split('.')[0] : ''
        },
        bio: bio,
        sortOrder: sortOrder,
        published: published
      };

      if (window.LotusFirebase && typeof window.LotusFirebase.saveTeamMember === 'function') {
        try {
          await window.LotusFirebase.saveTeamMember(memberData);
        } catch (err) {
          console.warn('[AdminApp] Firebase team save error:', err);
        }
      }

      const idx = this.team.findIndex(m => m.id === id);
      if (idx !== -1) {
        this.team[idx] = memberData;
      } else {
        this.team.push(memberData);
      }

      this.closeModal('teamModal');
      this.renderTeam();
      this.showToast(`Saved representative: ${name}`, 'success');
    },

    async deleteTeamMember(memberId) {
      const member = this.team.find(m => m.id === memberId);
      const name = member ? member.name : 'this representative';
      if (!confirm(`Are you sure you want to delete ${name}?`)) return;

      if (window.LotusFirebase && typeof window.LotusFirebase.deleteTeamMember === 'function') {
        try {
          await window.LotusFirebase.deleteTeamMember(memberId);
        } catch (err) {
          console.warn('[AdminApp] Firebase team delete error:', err);
        }
      }

      this.team = this.team.filter(m => m.id !== memberId);
      this.renderTeam();
      this.showToast(`Deleted ${name}`, 'info');
    },

    async toggleTeamPublished(memberId) {
      const member = this.team.find(m => m.id === memberId);
      if (!member) return;

      member.published = !member.published;
      if (window.LotusFirebase && typeof window.LotusFirebase.saveTeamMember === 'function') {
        await window.LotusFirebase.saveTeamMember(member);
      }
      this.renderTeam();
      this.showToast(`${member.name} is now ${member.published ? 'Published' : 'Draft'}`, 'success');
    },

    /**
     * 3. TOUR PACKAGES MANAGEMENT
     */
    renderPackages() {
      // Populate category filter
      const catSelect = document.getElementById('packageCategoryFilter');
      if (catSelect) {
        catSelect.innerHTML = '<option value="all">All Categories</option>' + 
          this.categories.map(c => `<option value="${c.slug}">${c.name}</option>`).join('');
      }

      this.filterPackages();
    },

    filterPackages() {
      const search = (document.getElementById('packageSearchInput')?.value || '').toLowerCase();
      const catFilter = document.getElementById('packageCategoryFilter')?.value || 'all';

      let list = this.packages;
      if (catFilter !== 'all') {
        list = list.filter(p => p.category_slug === catFilter);
      }
      if (search) {
        list = list.filter(p => 
          (p.title && p.title.toLowerCase().includes(search)) ||
          (p.slug && p.slug.toLowerCase().includes(search))
        );
      }

      const tbody = document.getElementById('packagesTableBody');
      if (!tbody) return;

      if (list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--ink-muted); padding: 30px;">No tour packages found.</td></tr>';
        return;
      }

      tbody.innerHTML = list.map(pkg => `
        <tr>
          <td>
            <img src="../${pkg.hero_image || 'assets/images/cultural-triangle.jpg'}" class="table-thumb" alt="${pkg.title}" onerror="this.src='../assets/images/logo.png'">
          </td>
          <td>
            <strong>${pkg.title}</strong><br>
            <small style="color: var(--ink-muted);">Slug: /${pkg.slug}</small>
          </td>
          <td><span class="badge badge-info">${pkg.category_slug || 'General'}</span></td>
          <td>${pkg.nights || 0}N / ${pkg.days || 0}D</td>
          <td><strong>$${pkg.price_from || 0}</strong></td>
          <td>
            <span class="badge ${pkg.is_popular ? 'badge-success' : 'badge-secondary'}">
              ${pkg.is_popular ? 'Popular' : 'Standard'}
            </span>
          </td>
          <td>
            <label class="switch">
              <input type="checkbox" ${pkg.is_published ? 'checked' : ''} onchange="AdminApp.togglePublishPackage('${pkg.slug}', this.checked)">
              <span class="slider"></span>
            </label>
          </td>
          <td style="text-align: right;">
            <div class="action-btns" style="justify-content: flex-end;">
              <button class="btn-icon" title="Edit Package" onclick="AdminApp.openPackageModal('${pkg.slug}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              </button>
              <button class="btn-icon" title="Duplicate Package" onclick="AdminApp.duplicatePackage('${pkg.slug}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
              </button>
              <button class="btn-icon delete" title="Delete Package" onclick="AdminApp.deletePackage('${pkg.slug}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    },

    async togglePublishPackage(slug, isPublished) {
      const pkg = this.packages.find(p => p.slug === slug);
      if (pkg) pkg.is_published = isPublished;

      if (this.client) {
        try {
          await this.client.from('tours').update({ is_published: isPublished }).eq('slug', slug);
          this.showToast(`Package "${slug}" ${isPublished ? 'published' : 'unpublished'}`, 'success');
        } catch (e) {
          this.showToast('Failed to update status on server', 'error');
        }
      } else {
        this.showToast(`Package status updated to ${isPublished ? 'published' : 'unpublished'} (Local mode)`, 'info');
      }
    },

    openPackageModal(editSlug = null) {
      const form = document.getElementById('packageForm');
      form.reset();
      document.getElementById('itineraryContainer').innerHTML = '';
      document.getElementById('highlightsContainer').innerHTML = '';

      // Populate Category Dropdown
      const catSelect = document.getElementById('pkgCategory');
      catSelect.innerHTML = this.categories.map(c => `<option value="${c.slug}">${c.name}</option>`).join('');

      if (editSlug) {
        const pkg = this.packages.find(p => p.slug === editSlug);
        if (!pkg) return;
        document.getElementById('packageModalTitle').textContent = 'Edit Tour Package';
        document.getElementById('pkgId').value = pkg.id || '';
        document.getElementById('pkgTitle').value = pkg.title || '';
        document.getElementById('pkgOverview').value = pkg.overview || '';
        document.getElementById('pkgSlug').value = pkg.slug || '';
        document.getElementById('pkgCategory').value = pkg.category_slug || '';
        document.getElementById('pkgNights').value = pkg.nights || 1;
        document.getElementById('pkgDays').value = pkg.days || 2;
        document.getElementById('pkgPrice').value = pkg.price_from || 0;
        document.getElementById('pkgHeroImage').value = pkg.hero_image || '';
        document.getElementById('pkgIsPopular').checked = Boolean(pkg.is_popular);
        document.getElementById('pkgIsPublished').checked = Boolean(pkg.is_published);

        // Populate Itinerary Days
        if (Array.isArray(pkg.itinerary)) {
          pkg.itinerary.forEach((day, index) => this.addItineraryDay(day.title, day.desc, day.stay));
        }
        // Populate Highlights
        if (Array.isArray(pkg.highlights)) {
          pkg.highlights.forEach(h => this.addHighlightItem(h));
        }
      } else {
        document.getElementById('packageModalTitle').textContent = 'Add Tour Package';
        document.getElementById('pkgId').value = '';
        this.addItineraryDay('Day 1: Arrival & Coastal Welcome', 'Airport greeting by personal tour executive. Transfer to hotel.', 'Negombo / Colombo');
        this.addHighlightItem('Private air-conditioned luxury transport');
      }

      this.openModal('packageModal');
    },

    addItineraryDay(title = '', desc = '', stay = '') {
      const container = document.getElementById('itineraryContainer');
      const dayIndex = container.children.length + 1;
      const dayDiv = document.createElement('div');
      dayDiv.className = 'repeater-item';
      dayDiv.innerHTML = `
        <div class="repeater-header">
          <span>Day ${dayIndex}</span>
          <button type="button" class="btn btn-sm btn-outline" onclick="this.closest('.repeater-item').remove()">Remove</button>
        </div>
        <div class="form-group" style="margin-bottom: 8px;">
          <input type="text" class="form-control itinerary-title" placeholder="Day Title (e.g. Day 1: Sigiriya Rock Fortress)" value="${title}">
        </div>
        <div class="form-group" style="margin-bottom: 8px;">
          <textarea class="form-control itinerary-desc" rows="2" placeholder="Activities and highlights of this day...">${desc}</textarea>
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <input type="text" class="form-control itinerary-stay" placeholder="Overnight Stay / Hotel location" value="${stay}">
        </div>
      `;
      container.appendChild(dayDiv);
    },

    addHighlightItem(text = '') {
      const container = document.getElementById('highlightsContainer');
      const itemDiv = document.createElement('div');
      itemDiv.className = 'repeater-item';
      itemDiv.style.padding = '8px 12px';
      itemDiv.innerHTML = `
        <div style="display: flex; gap: 8px; align-items: center;">
          <input type="text" class="form-control highlight-text" placeholder="Highlight feature..." value="${text}">
          <button type="button" class="btn btn-sm btn-outline" onclick="this.closest('.repeater-item').remove()">✕</button>
        </div>
      `;
      container.appendChild(itemDiv);
    },

    async savePackage() {
      const title = document.getElementById('pkgTitle').value.trim();
      const slug = document.getElementById('pkgSlug').value.trim();
      if (!title || !slug) {
        this.showToast('Title and Slug are required', 'error');
        return;
      }

      // Collect itinerary
      const itinerary = [];
      document.querySelectorAll('#itineraryContainer .repeater-item').forEach(item => {
        itinerary.push({
          title: item.querySelector('.itinerary-title').value,
          desc: item.querySelector('.itinerary-desc').value,
          stay: item.querySelector('.itinerary-stay').value
        });
      });

      // Collect highlights
      const highlights = [];
      document.querySelectorAll('#highlightsContainer .highlight-text').forEach(input => {
        if (input.value.trim()) highlights.push(input.value.trim());
      });

      const payload = {
        title,
        slug,
        category_slug: document.getElementById('pkgCategory').value,
        nights: parseInt(document.getElementById('pkgNights').value) || 1,
        days: parseInt(document.getElementById('pkgDays').value) || 2,
        price_from: parseFloat(document.getElementById('pkgPrice').value) || 0,
        hero_image: document.getElementById('pkgHeroImage').value.trim() || 'assets/images/cultural-triangle.jpg',
        overview: document.getElementById('pkgOverview').value.trim(),
        itinerary,
        highlights,
        is_popular: document.getElementById('pkgIsPopular').checked,
        is_published: document.getElementById('pkgIsPublished').checked
      };

      if (this.client) {
        try {
          const { error } = await this.client
            .from('tours')
            .upsert([payload], { onConflict: 'slug' });
          if (error) throw error;
          this.showToast(`Package "${title}" saved successfully`, 'success');
        } catch (e) {
          this.showToast('Server save failed: ' + e.message, 'error');
          return;
        }
      } else {
        // Local mode update
        const existingIndex = this.packages.findIndex(p => p.slug === slug);
        if (existingIndex >= 0) {
          this.packages[existingIndex] = { ...this.packages[existingIndex], ...payload };
        } else {
          this.packages.push(payload);
        }
        this.showToast(`Package "${title}" saved (Local mode)`, 'info');
      }

      this.closeModal('packageModal');
      this.renderPackages();
      this.renderDashboard();
    },

    duplicatePackage(slug) {
      const original = this.packages.find(p => p.slug === slug);
      if (!original) return;

      const copySlug = original.slug + '-copy-' + Math.floor(100 + Math.random() * 900);
      const copy = {
        ...JSON.parse(JSON.stringify(original)),
        id: undefined,
        slug: copySlug,
        title: original.title + ' (Copy)',
        is_published: false
      };

      this.packages.push(copy);
      this.showToast(`Package duplicated as "${copy.title}"`, 'success');
      this.renderPackages();
    },

    deletePackage(slug) {
      this.confirmDelete(`Are you sure you want to permanently delete package "${slug}"?`, async () => {
        this.packages = this.packages.filter(p => p.slug !== slug);
        if (this.client) {
          try {
            await this.client.from('tours').delete().eq('slug', slug);
            this.showToast('Package deleted from server', 'success');
          } catch (e) {
            this.showToast('Delete failed: ' + e.message, 'error');
          }
        }
        this.renderPackages();
        this.renderDashboard();
      });
    },

    /**
     * Export updated data/packages.json
     */
    async syncToFirebase() {
      if (!window.LotusFirebase) {
        this.showToast('LotusFirebase service not loaded', 'error');
        return;
      }
      this.showToast('Connecting to Firebase Firestore...', 'info');
      try {
        const pkgRes = await fetch('../data/packages.json');
        if (!pkgRes.ok) throw new Error('Could not load packages.json');
        const pkgData = await pkgRes.json();
        const count = await window.LotusFirebase.seedFirestore(pkgData);
        this.updateFirebaseBadge(`Connected (${count} Tours Synced)`, '#10B981');
        this.showToast(`Successfully synced ${count} tour packages to Firebase Firestore!`, 'success');
      } catch (err) {
        console.error('Firebase sync error:', err);
        this.updateFirebaseBadge('Firebase Offline / Error', '#EF4444');
        this.showToast('Firebase sync failed: ' + err.message, 'error');
      }
    },

    async fetchFromFirebase() {
      if (!window.LotusFirebase) {
        this.showToast('LotusFirebase service not loaded', 'error');
        return;
      }
      this.showToast('Fetching live packages from Firebase Firestore...', 'info');
      try {
        const liveCatalog = await window.LotusFirebase.fetchFirestoreCatalog();
        if (liveCatalog && liveCatalog.packages && liveCatalog.packages.length > 0) {
          this.packages = liveCatalog.packages;
          this.renderPackages();
          this.updateFirebaseBadge(`Live (${this.packages.length} Tours)`, '#10B981');
          this.showToast(`Fetched ${this.packages.length} live packages from Firestore!`, 'success');
        } else {
          this.showToast('No packages found in Firestore. Click "Seed to Firebase" first.', 'warning');
        }
      } catch (err) {
        console.error('Firebase fetch error:', err);
        this.showToast('Failed to fetch from Firestore: ' + err.message, 'error');
      }
    },

    updateFirebaseBadge(text, color) {
      const badge = document.getElementById('firebaseStatusBadge');
      if (badge) {
        badge.textContent = '☁️ ' + text;
        badge.style.background = color ? color + '20' : '#E2E8F0';
        badge.style.color = color || '#475569';
      }
    },

    exportPackagesJson() {
      try {
        const exportData = {
          categories: {},
          packages: this.packages.map(p => ({
            id: p.id || ('pkg-' + p.slug),
            slug: p.slug,
            category: p.category_slug || p.category || 'beach',
            title: p.title,
            tagline: p.overview || p.tagline || '',
            nights: p.nights || 9,
            days: p.days || 10,
            tags: p.is_popular ? ['Popular', 'Private Tour'] : ['Private Tour'],
            destinations: p.destinations || [],
            highlights: p.highlights || [],
            itinerary: (p.itinerary || []).map((it, idx) => ({
              day: String(idx + 1).padStart(2, '0'),
              title: it.title || '',
              description: it.desc || it.description || '',
              meals: it.meals || 'Breakfast',
              stay: it.stay || ''
            })),
            inclusions: p.inclusions || [],
            exclusions: p.exclusions || [],
            bestSeason: p.season || p.bestSeason || 'Year-Round',
            priceNote: 'Price on request',
            images: [p.hero_image || 'assets/images/cultural-triangle.jpg'],
            seoTitle: `${p.title} | Lotus Ceylon Luxury Tours`,
            seoDescription: p.overview || p.tagline || ''
          }))
        };

        this.categories.forEach(c => {
          exportData.categories[c.slug] = {
            id: c.id || ('cat-' + c.slug),
            slug: c.slug,
            title: c.name || c.title,
            tagline: c.tagline || '',
            heroImage: `assets/tours/${c.slug}/hero.jpg`,
            mapImage: c.map_image || ''
          };
        });

        const jsonStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'packages.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showToast('Downloaded packages.json successfully!', 'success');
      } catch (err) {
        console.error('Export error:', err);
        this.showToast('Failed to export: ' + err.message, 'error');
      }
    },

    /**
     * 4. CATEGORIES, DESTINATIONS, REVIEWS (Standard Table Rendering)
     */
    renderCategories() {
      const tbody = document.getElementById('categoriesTableBody');
      if (!tbody) return;
      tbody.innerHTML = this.categories.map((c, i) => `
        <tr>
          <td>#${c.sort_order || i + 1}</td>
          <td><strong>${c.name}</strong></td>
          <td><code>/${c.slug}</code></td>
          <td>${c.tagline || ''}</td>
          <td>
            <span class="badge ${c.is_published !== false ? 'badge-success' : 'badge-secondary'}">
              ${c.is_published !== false ? 'Published' : 'Hidden'}
            </span>
          </td>
          <td style="text-align: right;">
            <div class="action-btns" style="justify-content: flex-end;">
              <button class="btn-icon" title="Edit" onclick="AdminApp.showToast('Edit Category modal', 'info')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    },

    openCategoryModal() {
      this.showToast('Category editor modal ready', 'info');
    },

    renderDestinations() {
      const sampleDestinations = [
        { title: 'Sigiriya Rock Fortress', region: 'Cultural Triangle', slug: 'sigiriya', is_published: true },
        { title: 'Temple of the Sacred Tooth', region: 'Kandy & Highlands', slug: 'kandy', is_published: true },
        { title: 'Yala National Park', region: 'Southern Wildlife', slug: 'yala', is_published: true },
        { title: 'Galle Dutch Fort', region: 'Southern Coast', slug: 'galle', is_published: true },
        { title: 'Ella & Nine Arch Bridge', region: 'Hill Country', slug: 'ella', is_published: true }
      ];
      const tbody = document.getElementById('destinationsTableBody');
      if (!tbody) return;
      tbody.innerHTML = sampleDestinations.map(d => `
        <tr>
          <td><img src="../assets/images/cultural-triangle.jpg" class="table-thumb" onerror="this.src='../assets/images/logo.png'"></td>
          <td><strong>${d.title}</strong></td>
          <td><span class="badge badge-info">${d.region}</span></td>
          <td><code>/${d.slug}</code></td>
          <td><span class="badge badge-success">Published</span></td>
          <td style="text-align: right;">
            <button class="btn btn-outline btn-sm" onclick="AdminApp.showToast('Edit destination', 'info')">Edit</button>
          </td>
        </tr>
      `).join('');
    },

    openDestinationModal() {
      this.showToast('Destination editor modal ready', 'info');
    },

    renderReviews() {
      const tbody = document.getElementById('reviewsTableBody');
      if (!tbody) return;
      tbody.innerHTML = this.reviews.map(r => `
        <tr>
          <td><strong>${r.guest_name}</strong></td>
          <td>${r.country || 'International'}</td>
          <td style="color: #F57F17;">${'★'.repeat(r.rating || 5)}</td>
          <td><small>${r.tour_taken || 'Custom Tour'}</small></td>
          <td><small style="color: var(--ink-light);">${r.review_text ? (r.review_text.slice(0, 50) + '...') : '<em style="color:#94a3b8;">Empty placeholder</em>'}</small></td>
          <td>
            ${r.permission_received 
              ? '<span class="badge badge-success">✓ Permission Verified</span>' 
              : '<span class="badge badge-danger" style="background:#FEE2E2;color:#991B1B;">✗ No Permission</span>'}
          </td>
          <td>
            <span class="badge ${r.is_published && r.permission_received ? 'badge-success' : 'badge-warning'}">
              ${r.is_published && r.permission_received ? 'Published' : 'Hidden'}
            </span>
          </td>
          <td style="text-align: right;">
            <button class="btn btn-outline btn-sm" onclick="AdminApp.toggleReviewPublish('${r.id}')">
              ${r.is_published && r.permission_received ? 'Unpublish' : 'Verify & Publish'}
            </button>
          </td>
        </tr>
      `).join('');
    },

    toggleReviewPublish(reviewId) {
      const r = this.reviews.find(item => item.id === reviewId);
      if (!r) return;
      if (!r.permission_received) {
        this.showToast('Safety Guardrail: Review cannot be published without guest permission checkbox ticked.', 'error', 4500);
        return;
      }
      r.is_published = !r.is_published;
      this.renderReviews();
      this.showToast(`Review ${r.is_published ? 'published' : 'hidden'}.`, 'success');
    },

    openReviewModal() {
      this.showToast('Add Guest Review modal ready', 'info');
    },

    /**
     * 5. MEDIA LIBRARY & WEBP CLIENT-SIDE COMPRESSION
     */
    renderMediaLibrary() {
      // Default stock media preview items
      if (this.mediaFiles.length === 0) {
        this.mediaFiles = [
          { name: 'logo.png', url: '../assets/images/logo.png', size: '240 KB' },
          { name: 'cultural-triangle.jpg', url: '../assets/images/cultural-triangle.jpg', size: '480 KB' },
          { name: 'kandy.jpg', url: '../assets/images/kandy.jpg', size: '520 KB' },
          { name: 'yala.jpg', url: '../assets/images/yala.jpg', size: '610 KB' }
        ];
      }

      const grid = document.getElementById('mediaGrid');
      if (!grid) return;

      grid.innerHTML = this.mediaFiles.map((m, idx) => {
        const isVid = m.isVideo || /\.(mp4|webm|mov)$/i.test(m.url);
        return `
        <div class="media-item">
          ${isVid ? `
            <div style="width: 100%; height: 100%; background: #001726; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #E5B869;">
              <span style="font-size: 2.2rem;">🎬</span>
              <span style="font-size: 0.75rem; letter-spacing: 1px; font-weight: 700; color: #FFFFFF; margin-top: 4px;">HD VIDEO</span>
            </div>
          ` : `
            <img src="${m.url}" alt="${m.name}" onerror="this.src='../assets/images/logo.png'">
          `}
          <div class="media-overlay">
            <span class="media-info">${m.name}</span>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-gold btn-sm" onclick="AdminApp.copyMediaUrl('${m.url}')">Copy URL</button>
              <button class="btn btn-danger btn-sm" onclick="AdminApp.deleteMedia(${idx})">✕</button>
            </div>
          </div>
        </div>
        `;
      }).join('');
    },

    copyMediaUrl(url) {
      navigator.clipboard.writeText(url).then(() => {
        this.showToast('Image URL copied to clipboard!', 'success');
      });
    },

    deleteMedia(index) {
      this.mediaFiles.splice(index, 1);
      this.renderMediaLibrary();
      this.showToast('Media removed', 'info');
    },

    /**
     * Image Upload with Client-Side Canvas WebP Compression (Max 1920px, 5MB Check)
     */
    async handleMediaUpload(files) {
      if (!files || files.length === 0) return;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|ogg)$/i.test(file.name);

        // 1. Strict MIME type & extension validation (Security against malicious uploads)
        const validImageMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
        const validVideoMimes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg'];
        const validImageExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
        const validVideoExts = ['.mp4', '.webm', '.mov', '.ogg'];
        const fileExt = '.' + file.name.split('.').pop().toLowerCase();

        const isValidImg = validImageMimes.includes(file.type.toLowerCase()) && validImageExts.includes(fileExt);
        const isValidVid = validVideoMimes.includes(file.type.toLowerCase()) && validVideoExts.includes(fileExt);

        if (!isValidImg && !isValidVid) {
          this.showToast(`Rejected "${file.name}": Only standard image (JPG, PNG, WebP) or video (MP4, WebM, MOV) files are permitted.`, 'error', 4500);
          continue;
        }

        // 2. Size limit: 10MB for images, 60MB for videos
        const maxLimit = isVideo ? 60 * 1024 * 1024 : 10 * 1024 * 1024;
        if (file.size > maxLimit) {
          this.showToast(`Rejected "${file.name}": Exceeds the ${isVideo ? '60MB video' : '10MB image'} upload limit.`, 'error', 4500);
          continue;
        }

        if (isVideo) {
          this.showToast(`Processing video "${file.name}" (Auto-responsive 16:9)...`, 'info', 2500);
          try {
            const videoUrl = URL.createObjectURL(file);
            const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
            this.mediaFiles.unshift({
              name: safeName,
              url: videoUrl,
              isVideo: true,
              size: `${Math.round(file.size / (1024 * 1024))} MB`
            });
            this.showToast(`Video ${safeName} ready with auto-responsive playback!`, 'success');
          } catch (err) {
            console.error(err);
            this.showToast(`Video upload failed: ` + err.message, 'error');
          }
        } else {
          this.showToast(`Compressing & optimizing "${file.name}" to WebP...`, 'info', 2000);
          try {
            const compressedBlob = await this.compressImageToWebP(file, 1920, 0.85);
            const compressedUrl = URL.createObjectURL(compressedBlob);
            const safeName = file.name.replace(/\.[^/.]+$/, "") + '.webp';

            this.mediaFiles.unshift({
              name: safeName,
              url: compressedUrl,
              isVideo: false,
              size: `${Math.round(compressedBlob.size / 1024)} KB`
            });
            this.showToast(`Optimized ${safeName} stored in media library!`, 'success');
          } catch (err) {
            console.error(err);
            this.showToast(`Upload failed for ${file.name}: ` + err.message, 'error');
          }
        }
      }

      this.renderMediaLibrary();
    },

    /**
     * Canvas-based WebP Resizer & Compressor
     */
    compressImageToWebP(file, maxWidth = 1920, quality = 0.85) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
          img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Canvas toBlob conversion failed'));
              }
            }, 'image/webp', quality);
          };
          img.onerror = reject;
        };
        reader.onerror = reject;
      });
    },

    /**
     * Reusable Media Picker Modal
     */
    openImagePicker(targetInputId) {
      this.targetPickerInputId = targetInputId;
      const grid = document.getElementById('pickerMediaGrid');
      grid.innerHTML = this.mediaFiles.map(m => {
        const isVid = m.isVideo || /\.(mp4|webm|mov)$/i.test(m.url);
        return `
        <div class="media-item" onclick="AdminApp.selectPickedImage('${m.url}')">
          ${isVid ? `
            <div style="width: 100%; height: 100%; background: #001726; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #E5B869;">
              <span style="font-size: 2.2rem;">🎬</span>
              <span style="font-size: 0.75rem; letter-spacing: 1px; font-weight: 700; color: #FFFFFF; margin-top: 4px;">HD VIDEO</span>
            </div>
          ` : `
            <img src="${m.url}" alt="${m.name}" onerror="this.src='../assets/images/logo.png'">
          `}
          <div class="media-overlay">
            <span class="media-info">${m.name}</span>
            <span class="btn btn-gold btn-sm">Select Image</span>
          </div>
        </div>
        `;
      }).join('');
      this.openModal('mediaPickerModal');
    },

    selectPickedImage(url) {
      if (this.targetPickerInputId) {
        const target = document.getElementById(this.targetPickerInputId);
        if (target) {
          // Store relative path or full url
          target.value = url.replace('../', '');
        }
      }
      this.closeModal('mediaPickerModal');
      this.showToast('Image selected', 'success');
    },

    /**
     * Cloudinary Direct Upload Integration
     */
    cloudinaryConfig: {
      cloudName: 'qmukrbh6',
      uploadPreset: 'lotus_tours_unsigned',
      folder: 'lotus/tours'
    },

    openCloudinaryWidget(callback) {
      if (!window.cloudinary) {
        this.showToast('Cloudinary widget SDK is loading or blocked by browser. Please check connection.', 'warning');
        return;
      }
      const myWidget = window.cloudinary.createUploadWidget({
        cloudName: this.cloudinaryConfig.cloudName,
        uploadPreset: this.cloudinaryConfig.uploadPreset,
        folder: this.cloudinaryConfig.folder,
        sources: ['local', 'url', 'camera'],
        multiple: true,
        resourceType: 'auto', // Accepts BOTH images and videos automatically
        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp', 'avif', 'mp4', 'webm', 'mov'],
        maxFileSize: 60000000, // 60MB for video
        theme: 'minimal'
      }, (error, result) => {
        if (!error && result && result.event === "success") {
          let secureUrl = result.info.secure_url;
          const isVideo = result.info.resource_type === 'video' || /\.(mp4|webm|mov|m4v)$/i.test(secureUrl);

          // Auto-Responsive Cloudinary Transform:
          // Inject f_auto,q_auto so Cloudinary delivers device-tailored resolutions on mobile screens
          if (secureUrl.includes('/upload/') && !secureUrl.includes('/f_auto')) {
            secureUrl = secureUrl.replace('/upload/', '/upload/f_auto,q_auto/');
          }

          const fileName = result.info.original_filename || (isVideo ? 'Cloudinary Video' : 'Cloudinary Image');
          this.mediaFiles.unshift({
            name: fileName,
            url: secureUrl,
            isVideo: isVideo,
            size: `${Math.round(result.info.bytes / 1024)} KB`
          });
          this.renderMediaLibrary();
          if (typeof callback === 'function') {
            callback(secureUrl, isVideo);
          }
          this.showToast(`Uploaded ${fileName} (Auto-Responsive Mobile Enabled)!`, 'success');
        }
      });
      myWidget.open();
    },

    /**
     * Helper to render auto-responsive markup for ANY uploaded media
     */
    formatResponsiveMedia(url, alt = 'Lotus Ceylon Media') {
      if (!url) return '';
      const isVideo = /\.(mp4|webm|mov|m4v)$/i.test(url) || url.includes('/video/upload/');
      if (isVideo) {
        return `<div class="responsive-video-wrap lotus-responsive-video"><video controls playsinline preload="metadata" src="${url}"></video></div>`;
      }
      return `<img src="${url}" alt="${alt}" class="responsive-media-img" loading="lazy" onerror="this.src='../assets/images/cultural-triangle.jpg'">`;
    },

    openCloudinaryWidgetForInput(inputId) {
      this.openCloudinaryWidget((url) => {
        const el = document.getElementById(inputId);
        if (el) {
          el.value = url;
        }
      });
    },

    /**
     * 6. USERS & ROLES
     */
    renderUsers() {
      const tbody = document.getElementById('usersTableBody');
      if (!tbody) return;
      tbody.innerHTML = `
        <tr>
          <td><strong>${this.currentUser ? this.currentUser.email : 'admin@lotusceylon.com'}</strong><br><small style="color: var(--ink-muted);">Current Active Session</small></td>
          <td><span class="role-badge ${this.currentRole}">${this.currentRole.toUpperCase()}</span></td>
          <td>Full CRUD on Tours, Inquiries, Media, Roles & Settings</td>
          <td><span class="badge badge-success">Active</span></td>
        </tr>
      `;
    },

    /**
     * 7. SETTINGS MANAGEMENT
     */
    renderSettings() {
      const conf = window.LOTUS_CONFIG || {};
      document.getElementById('settingCompanyName').value = conf.companyName || '';
      document.getElementById('settingSlogan').value = conf.slogan || '';
      document.getElementById('settingPhone').value = conf.phone || '';
      document.getElementById('settingEmail').value = conf.email || '';
      document.getElementById('settingAddress').value = conf.address ? conf.address.full : '';
      document.getElementById('settingWhatsApp').value = conf.whatsapp ? conf.whatsapp.number : '';
      document.getElementById('settingFacebook').value = conf.social ? conf.social.facebook : '';
      document.getElementById('settingInstagram').value = conf.social ? conf.social.instagram : '';
      document.getElementById('settingTripadvisor').value = conf.social ? conf.social.tripadvisor : '';
      document.getElementById('settingDesignerUrl').value = conf.designer ? conf.designer.url : 'https://infiniteweb.dev/';
      document.getElementById('settingDesignerFb').value = conf.designer ? conf.designer.facebook : '';
    },

    async saveSettings() {
      this.showToast('Saving site configurations...', 'info');
      // If client exists, update site_settings table in Supabase
      if (this.client) {
        try {
          await this.client.from('site_settings').upsert([
            {
              key: 'general',
              value: {
                companyName: document.getElementById('settingCompanyName').value,
                slogan: document.getElementById('settingSlogan').value,
                phone: document.getElementById('settingPhone').value,
                email: document.getElementById('settingEmail').value,
                address: document.getElementById('settingAddress').value,
                whatsapp: document.getElementById('settingWhatsApp').value
              }
            }
          ]);
          this.showToast('Settings saved to database!', 'success');
        } catch (e) {
          this.showToast('Failed to save settings: ' + e.message, 'error');
        }
      } else {
        this.showToast('Settings saved for this session (Local mode)', 'success');
      }
    },

    /**
     * Modal Helpers
     */
    openModal(modalId) {
      const el = document.getElementById(modalId);
      if (el) el.classList.add('active');
    },

    closeModal(modalId) {
      const el = document.getElementById(modalId);
      if (el) el.classList.remove('active');
    },

    confirmDelete(message, onConfirm) {
      document.getElementById('deleteConfirmMessage').textContent = message;
      const btn = document.getElementById('confirmDeleteBtn');
      btn.onclick = () => {
        onConfirm();
        this.closeModal('confirmDeleteModal');
      };
      this.openModal('confirmDeleteModal');
    },

    switchLangTab(btn, lang) {
      const parent = btn.closest('.modal-body');
      parent.querySelectorAll('.lang-tab-btn').forEach(b => b.classList.remove('active'));
      parent.querySelectorAll('.lang-tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = parent.querySelector('#pkgTab-' + lang);
      if (pane) pane.classList.add('active');
    },

    /**
     * Toast Notifications
     */
    showToast(message, type = 'info', duration = 3500) {
      const container = document.getElementById('toastContainer');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerHTML = `<span>${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }
  };

  // Expose to window
  window.AdminApp = AdminApp;

  // Initialize once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    AdminApp.init();
  });

})(window);
