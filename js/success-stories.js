/**
 * Lotus Ceylon - Our Success Stories Landscape Card & Auto-Swap Controller
 * Auto-rotates stories every 60 seconds (1 minute), with pause on hover,
 * keyboard/button navigation, and instant sync from Firestore & localStorage.
 */
(function (window, document) {
  'use strict';

  const STORAGE_KEY = 'lotus_success_stories_cache_v6';
  const SWAP_INTERVAL_MS = 60000; // 1 minute (60s)
  const PROGRESS_TICK_MS = 100; // Smooth progress bar updates

  const DEFAULT_STORIES = [
    {
      id: 'story-01',
      badge: 'SACRED SITES',
      title: 'Sacred Anuradhapura',
      location: 'Ancient Capital • Cultural Triangle',
      photo: 'assets/images/buddhist-heritage/ruwanwelisaya-2.webp',
      description: 'Ancient capital of colossal white stupas and the revered Sri Maha Bodhi tree. Our travellers experienced peaceful evening meditation beneath the sacred Bodhi canopy with private scholarly guidance.',
      sortOrder: 1,
      published: true
    },
    {
      id: 'story-02',
      badge: 'OUR SUCCESS STORIES',
      title: 'The Coastal Marvel of Coconut Tree Hill',
      location: 'Mirissa • Southern Coast',
      photo: 'assets/images/honeymoon/mirissa-sunset-2.webp',
      description: 'Traveling down to Mirissa, our guests stood beneath the famous palm canopy atop the red cliffs, watching a breathtaking sunset melt into the Indian Ocean—capturing memories they promised would last a lifetime.',
      sortOrder: 2,
      published: true
    },
    {
      id: 'story-03',
      badge: 'TEA HIGHLANDS',
      title: 'Ella Tea Country',
      location: 'Badulla Highlands • Scenic Railway Trails',
      photo: 'assets/images/hill-country/kandy-ella-train-5.webp',
      description: 'Misty emerald tea estates, iconic colonial railways, and artisanal tea crafting. Bespoke private journeys through scenic mountain trails, Nine Arch Bridge, and cascades.',
      sortOrder: 3,
      published: true
    },
    {
      id: 'story-04',
      badge: 'OCEAN SANCTUARY',
      title: 'Mirissa Blue Waters',
      location: 'Southern Coast • Whale Sanctuary',
      photo: 'assets/images/beach/mirissa-1.webp',
      description: 'Gentle ocean giants and sun-kissed golden coastlines. Private sunrise catamaran voyages encountering magnificent blue whales and dolphins off the southern Ceylon shores.',
      sortOrder: 4,
      published: true
    },
    {
      id: 'story-05',
      badge: 'ROYAL HERITAGE',
      title: 'Kandy Royal Kingdom',
      location: 'Sacred Hill Capital • Temple of the Tooth',
      photo: 'assets/images/cultural/kandy-temple-of-tooth-4.webp',
      description: 'The revered Temple of the Sacred Tooth Relic amidst misty hills. Exclusive VIP access to the traditional evening royal pooja ceremony with private sacred blessings.',
      sortOrder: 5,
      published: true
    }
  ];

  let stories = [];
  let currentIndex = 0;
  let timerId = null;
  let progressTimerId = null;
  let progressElapsedMs = 0;
  let isPaused = false;

  // DOM Elements
  let elCard = null;
  let elMediaBox = null;
  let elImg = null;
  let elBadge = null;
  let elTitle = null;
  let elDesc = null;
  let elLocationText = null;
  let elCurrentIdx = null;
  let elTotalCount = null;
  let elProgressBar = null;
  let elDotsContainer = null;
  let elPrevBtn = null;
  let elNextBtn = null;

  async function init() {
    elCard = document.getElementById('successStoriesCard');
    if (!elCard) return;

    elMediaBox = document.getElementById('storyMediaBox');
    elImg = document.getElementById('storyImage');
    elBadge = document.getElementById('storyBadge');
    elTitle = document.getElementById('storyTitle');
    elDesc = document.getElementById('storyDesc');
    elLocationText = document.getElementById('storyLocationText');
    elCurrentIdx = document.getElementById('storyCurrentIndex');
    elTotalCount = document.getElementById('storyTotalCount');
    elProgressBar = document.getElementById('storyProgressBar');
    elDotsContainer = document.getElementById('storyDots');
    elPrevBtn = document.getElementById('storyPrevBtn');
    elNextBtn = document.getElementById('storyNextBtn');

    // 1. Load data
    await loadData();

    // 2. Setup event listeners
    if (elPrevBtn) {
      elPrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevStory();
      });
    }

    if (elNextBtn) {
      elNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextStory();
      });
    }

    // Pause on hover so the user can easily read the story
    elCard.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    elCard.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    elCard.addEventListener('touchstart', (e) => {
      isPaused = true;
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    elCard.addEventListener('touchend', (e) => {
      isPaused = false;
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        nextStory();
      } else if (touchEndX - touchStartX > 45) {
        prevStory();
      }
    }, { passive: true });

    // Listen to localStorage update from Admin panel (multi-tab / instant update)
    window.addEventListener('storage', (e) => {
      if ((e.key === STORAGE_KEY || e.key === 'lotus_success_stories_cache' || e.key === 'lotus_success_stories_cache_v6') && e.newValue) {
        try {
          const fresh = JSON.parse(e.newValue);
          if (Array.isArray(fresh) && fresh.length > 0) {
            stories = fresh.filter(s => s.published !== false);
            renderStory(currentIndex >= stories.length ? 0 : currentIndex);
          }
        } catch (err) {}
      }
    });

    // Listen to iframe live preview messages from Admin Visual Editor
    window.addEventListener('message', (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === 'lotus:set-story-slide') {
        isPaused = true;
        const targetIdx = typeof e.data.index === 'number' ? e.data.index : 0;
        renderStory(targetIdx);
      } else if (e.data.type === 'lotus:update-story-live') {
        isPaused = true;
        const { field, val, index } = e.data;
        const targetIdx = (typeof index === 'number') ? index : currentIndex;
        if (stories && stories[targetIdx]) {
          stories[targetIdx][field] = val;
        }
        if (targetIdx === currentIndex) {
          if (field === 'title' && elTitle) elTitle.textContent = val;
          if (field === 'badge' && elBadge) elBadge.textContent = val;
          if (field === 'description' && elDesc) elDesc.textContent = val;
          if (field === 'photo' && elImg) elImg.src = val;
        }
      }
    });

    // Custom window event for same-tab updates
    window.addEventListener('lotus_stories_updated', (e) => {
      if (e.detail && Array.isArray(e.detail)) {
        stories = e.detail.filter(s => s.published !== false);
        renderStory(currentIndex >= stories.length ? 0 : currentIndex);
      }
    });

    // Initial render & start timer
    renderStory(0);
    startAutoSwapTimer();
  }

  async function loadData() {
    // 1. Check window.CMS page data (already loaded from Firestore REST API siteContent/home)
    try {
      if (window.CMS && window.CMS.data && window.CMS.data.page && Array.isArray(window.CMS.data.page.successStories) && window.CMS.data.page.successStories.length > 0) {
        stories = window.CMS.data.page.successStories.filter(s => s.published !== false);
      }
    } catch (e) {}

    // 2. Check localStorage cache (support both v6 and legacy keys)
    if (!stories || stories.length === 0) {
      try {
        const cached = localStorage.getItem('lotus_success_stories_cache_v6') || localStorage.getItem('lotus_success_stories_cache');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length >= 5) {
            stories = parsed.filter(s => s.published !== false);
          }
        }
      } catch (e) {}
    }

    // 3. Fetch from Firebase service if available
    if ((!stories || stories.length < 5) && window.LotusFirebase && typeof window.LotusFirebase.fetchSuccessStories === 'function') {
      try {
        const live = await window.LotusFirebase.fetchSuccessStories('data/success-stories.json');
        if (Array.isArray(live) && live.length > 0) {
          stories = live.filter(s => s.published !== false);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
          localStorage.setItem('lotus_success_stories_cache', JSON.stringify(stories));
        }
      } catch (e) {
        console.warn('[SuccessStories] Live fetch error:', e);
      }
    }

    // 4. Fetch directly from Firestore REST API (siteContent/home is publicly accessible with 200 OK)
    if (!stories || stories.length < 5) {
      try {
        const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/louterst-36b64/databases/(default)/documents/siteContent/home?key=AIzaSyD5NyCFaPHeS1cKlsgxZ_WsraswHlYonNA';
        const fres = await fetch(firestoreUrl, { cache: 'no-store' });
        if (fres.ok) {
          const fjson = await fres.json();
          if (fjson.fields && fjson.fields.successStories && fjson.fields.successStories.arrayValue) {
            const rawArr = fjson.fields.successStories.arrayValue.values || [];
            const parsed = rawArr.map(v => {
              const f = (v.mapValue && v.mapValue.fields) || {};
              const obj = {};
              for (const k in f) {
                obj[k] = f[k].stringValue || (f[k].integerValue ? parseInt(f[k].integerValue, 10) : (f[k].booleanValue !== undefined ? f[k].booleanValue : ''));
              }
              return obj;
            });
            if (parsed.length > 0) {
              stories = parsed.filter(s => s.published !== false);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
              localStorage.setItem('lotus_success_stories_cache', JSON.stringify(stories));
            }
          }
        }
      } catch (fe) {}
    }

    // 5. Fallback to static JSON file if still empty or fewer than 5
    if (!stories || stories.length < 5) {
      try {
        const res = await fetch('data/success-stories.json');
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json) && json.length > 0) {
            stories = json.filter(s => s.published !== false);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
            localStorage.setItem('lotus_success_stories_cache', JSON.stringify(stories));
          }
        }
      } catch (e) {
        console.warn('[SuccessStories] Static JSON fetch error:', e);
      }
    }

    // 6. Default fallback if still empty or fewer than 5
    if (!stories || stories.length < 5) {
      stories = DEFAULT_STORIES.slice();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
        localStorage.setItem('lotus_success_stories_cache', JSON.stringify(stories));
      } catch (e) {}
    }

    // Limit to 5 maximum
    stories = stories.slice(0, 5);
  }

  function renderStory(index) {
    if (!stories || stories.length === 0) return;
    if (index < 0) index = stories.length - 1;
    if (index >= stories.length) index = 0;

    currentIndex = index;
    const story = stories[currentIndex];

    // Smooth transition
    if (elCard) {
      elCard.classList.add('is-animating');
    }

    setTimeout(() => {
      // Update Image
      if (elImg) {
        elImg.src = story.photo || 'assets/images/buddhist-heritage/ruwanwelisaya-2.webp';
        elImg.alt = story.title || 'Our Success Story';
      }

      // Update Badge
      if (elBadge) {
        elBadge.textContent = story.badge || 'SACRED SITES';
      }

      // Update Title
      if (elTitle) {
        elTitle.textContent = story.title || 'Sri Lanka Experience';
      }

      // Update Description
      if (elDesc) {
        elDesc.textContent = story.description || '';
      }

      // Update Location Route
      if (elLocationText) {
        elLocationText.textContent = story.location || 'Curated Ceylon Journey';
      }

      // Update Counter
      if (elCurrentIdx) {
        elCurrentIdx.textContent = currentIndex + 1;
      }
      if (elTotalCount) {
        elTotalCount.textContent = stories.length;
      }

      // Render dots
      renderDots();

      if (elCard) {
        elCard.classList.remove('is-animating');
      }
    }, 180);

    // Reset 1-minute progress timer
    resetProgress();
  }

  function renderDots() {
    if (!elDotsContainer) return;
    elDotsContainer.innerHTML = '';
    stories.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'story-dot' + (i === currentIndex ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Go to story ' + (i + 1));
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        renderStory(i);
      });
      elDotsContainer.appendChild(dot);
    });
  }

  function nextStory() {
    if (!stories || stories.length <= 1) return;
    const nextIdx = (currentIndex + 1) % stories.length;
    renderStory(nextIdx);
  }

  function prevStory() {
    if (!stories || stories.length <= 1) return;
    const prevIdx = (currentIndex - 1 + stories.length) % stories.length;
    renderStory(prevIdx);
  }

  function startAutoSwapTimer() {
    if (timerId) clearInterval(timerId);
    if (progressTimerId) clearInterval(progressTimerId);

    progressElapsedMs = 0;

    // Progress bar runner
    progressTimerId = setInterval(() => {
      if (!isPaused && stories && stories.length > 1) {
        progressElapsedMs += PROGRESS_TICK_MS;
        const pct = Math.min(100, (progressElapsedMs / SWAP_INTERVAL_MS) * 100);
        if (elProgressBar) {
          elProgressBar.style.width = pct + '%';
        }
        if (progressElapsedMs >= SWAP_INTERVAL_MS) {
          progressElapsedMs = 0;
          nextStory();
        }
      }
    }, PROGRESS_TICK_MS);
  }

  function resetProgress() {
    progressElapsedMs = 0;
    if (elProgressBar) {
      elProgressBar.style.width = '0%';
    }
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global controller
  window.LotusSuccessStories = {
    refresh: async function () {
      await loadData();
      renderStory(0);
    },
    next: nextStory,
    prev: prevStory,
    goTo: renderStory,
    getStories: () => stories
  };
})(window, document);
