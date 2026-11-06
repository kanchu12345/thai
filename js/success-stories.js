/**
 * Lotus Ceylon - Our Success Stories Landscape Card & Auto-Swap Controller
 * Auto-rotates stories every 60 seconds (1 minute), with pause on hover,
 * keyboard/button navigation, and instant sync from Firestore & localStorage.
 */
(function (window, document) {
  'use strict';

  const STORAGE_KEY = 'lotus_success_stories_cache';
  const SWAP_INTERVAL_MS = 60000; // 1 minute (60s)
  const PROGRESS_TICK_MS = 100; // Smooth progress bar updates

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
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const fresh = JSON.parse(e.newValue);
          if (Array.isArray(fresh) && fresh.length > 0) {
            stories = fresh.filter(s => s.published !== false);
            renderStory(currentIndex >= stories.length ? 0 : currentIndex);
          }
        } catch (err) {}
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
    // Check localStorage cache first for fast display
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          stories = parsed.filter(s => s.published !== false);
        }
      }
    } catch (e) {}

    // Fetch from Firebase service if available
    if (window.LotusFirebase && typeof window.LotusFirebase.fetchSuccessStories === 'function') {
      try {
        const live = await window.LotusFirebase.fetchSuccessStories('data/success-stories.json');
        if (Array.isArray(live) && live.length > 0) {
          stories = live.filter(s => s.published !== false);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
        }
      } catch (e) {
        console.warn('[SuccessStories] Live fetch error:', e);
      }
    }

    // Fallback to static JSON file if still empty
    if (!stories || stories.length === 0) {
      try {
        const res = await fetch('data/success-stories.json');
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json)) {
            stories = json.filter(s => s.published !== false);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
          }
        }
      } catch (e) {
        console.warn('[SuccessStories] Static JSON fetch error:', e);
      }
    }

    // Default fallback if everything else fails
    if (!stories || stories.length === 0) {
      stories = [
        {
          id: 'story-01',
          badge: 'SACRED SITES',
          title: 'Anuradhapura',
          photo: 'assets/images/home/anuradhapura-success-story.jpg',
          description: 'Ancient capital of great stupas and the revered Sri Maha Bodhi tree. Our travellers experienced peaceful evening meditation beneath the sacred Bodhi canopy.',
          sortOrder: 1,
          published: true
        }
      ];
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
        elImg.src = story.photo || 'assets/images/home/anuradhapura-success-story.jpg';
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
    const nextIdx = (currentIndex + 1) % stories.length;
    renderStory(nextIdx);
  }

  function prevStory() {
    const prevIdx = (currentIndex - 1 + stories.length) % stories.length;
    renderStory(prevIdx);
  }

  function startAutoSwapTimer() {
    if (timerId) clearInterval(timerId);
    if (progressTimerId) clearInterval(progressTimerId);

    progressElapsedMs = 0;

    // Progress bar runner
    progressTimerId = setInterval(() => {
      if (!isPaused) {
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
