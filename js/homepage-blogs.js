/**
 * Lotus Ceylon - Homepage Blog Articles Controller
 * Connects the homepage "The Lotus Journal: Chronicles of Ceylon" showcase
 * with the Blog hub and individual blog post pages.
 * Supports dynamic configuration from the Admin Panel.
 */
(function (window, document) {
  'use strict';

  const STORAGE_KEY = 'lotus_homepage_blogs_config';
  const DATA_PAYLOAD_KEY = 'lotus_data_payload';

  const DEFAULT_CONFIG = {
    main: 'sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms',
    mainBadge: 'Sacred Heritage',
    side: [
      'ella-hands-on-tea-making-experience',
      'the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya',
      'growing-a-greener-future-volunteer-reforestation-sinharaja',
      'living-healing-traditional-ceylon-ayurveda'
    ],
    sideBadges: {
      'ella-hands-on-tea-making-experience': 'Hill Country and Tea',
      'the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya': 'Wildlife Journal',
      'growing-a-greener-future-volunteer-reforestation-sinharaja': 'Eco Reverence',
      'living-healing-traditional-ceylon-ayurveda': 'Holistic Wellness'
    }
  };

  const DEFAULT_BLOGS = [
    {
      id: 'sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms',
      slug: 'sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms',
      title: "Sacred Footsteps: Unlocking Sri Lanka's Ancient Buddhist Kingdoms",
      category: 'Sacred Heritage',
      cover: 'assets/images/cultural/sigiriya-1.webp',
      excerpt: "From the soaring stupas of Anuradhapura to the golden cave shrines of Dambulla, explore the living spirituality, meditation sanctuaries, and royal chronicles of Ceylon."
    },
    {
      id: 'ella-hands-on-tea-making-experience',
      slug: 'ella-hands-on-tea-making-experience',
      title: 'Ella: Hands-On Tea Making Experience with Tasting',
      category: 'Hill Country and Tea',
      cover: 'assets/images/blog/ella-tea-making-thumb.webp',
      excerpt: "Discover the heart of Sri Lanka's tea culture with an authentic hands-on tea making experience in Ella. Learn the art of tea making, from plucking leaves to brewing the perfect cup."
    },
    {
      id: 'the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya',
      slug: 'the-great-gathering-watching-hundreds-of-wild-elephants-at-minneriya',
      title: 'The Great Gathering: Watching Hundreds of Wild Elephants at Minneriya',
      category: 'Wildlife Journal',
      cover: 'assets/images/buddhist-heritage/ruwanwelisaya-2.webp',
      excerpt: "Ranked among the world's greatest wildlife spectacles by Lonely Planet, the annual Elephant Gathering brings up to 300 Asian elephants to the lush receding shores of Minneriya reservoir."
    },
    {
      id: 'growing-a-greener-future-volunteer-reforestation-sinharaja',
      slug: 'growing-a-greener-future-volunteer-reforestation-sinharaja',
      title: 'Growing a Greener Future: Volunteer Reforestation in the Sinharaja Canopy',
      category: 'Eco Reverence',
      cover: 'assets/images/family/kosgoda-turtle-hatchery-1.webp',
      excerpt: "Explore how Lotus Ceylon supports rainforest buffer zone conservation in UNESCO Sinharaja, protecting over 147 endemic bird species, rare purple-faced langurs, and virgin ancient trees."
    },
    {
      id: 'living-healing-traditional-ceylon-ayurveda',
      slug: 'living-healing-traditional-ceylon-ayurveda',
      title: 'Living Healing: The Ancient Art and Science of Traditional Ceylon Ayurveda',
      category: 'Holistic Wellness',
      cover: 'assets/images/ayurveda/herbal-treatment-1.webp',
      excerpt: "Discover how Sri Lanka's unique Deshiya Chikitsa indigenous medicine intertwines with Classical Ayurveda, balancing Vata, Pitta, and Kapha doshas through therapeutic herbal baths and mindful wellness."
    }
  ];

  let config = { ...DEFAULT_CONFIG };
  let allBlogs = [...DEFAULT_BLOGS];

  function getLang() {
    try {
      const saved = localStorage.getItem('lotus_lang');
      if (saved) return saved;
    } catch (e) {}
    return document.documentElement.lang || 'en';
  }

  function getText(val, lang) {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val[lang] || val['en'] || Object.values(val)[0] || '';
    }
    return String(val);
  }

  function resolvePath(relativePath) {
    if (!relativePath) return '';
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://') || relativePath.startsWith('//')) {
      return relativePath;
    }
    const clean = relativePath.replace(/^(\.\/)+/, '').replace(/^\/+/, '');
    return './' + clean;
  }

  function resolveArticleUrl(slug) {
    if (!slug) return './blog.html';
    return './blog/' + slug + '/index.html';
  }

  async function loadConfig() {
    try {
      const localCfg = localStorage.getItem(STORAGE_KEY);
      if (localCfg) {
        const parsed = JSON.parse(localCfg);
        if (parsed && (parsed.main || Array.isArray(parsed.side))) {
          config = Object.assign({}, DEFAULT_CONFIG, parsed);
          return;
        }
      }
    } catch (e) {}

    try {
      const payloadStr = localStorage.getItem(DATA_PAYLOAD_KEY);
      if (payloadStr) {
        const payload = JSON.parse(payloadStr);
        if (payload && payload.homepageBlogConfig) {
          config = Object.assign({}, DEFAULT_CONFIG, payload.homepageBlogConfig);
          return;
        }
      }
    } catch (e) {}

    try {
      const res = await fetch('./data/homepage-blogs.json');
      if (res.ok) {
        const data = await res.json();
        if (data && (data.main || Array.isArray(data.side))) {
          config = Object.assign({}, DEFAULT_CONFIG, data);
        }
      }
    } catch (e) {}
  }

  async function loadBlogs() {
    if (window.LotusSiteData && typeof window.LotusSiteData.getBlogs === 'function') {
      const siteBlogs = window.LotusSiteData.getBlogs();
      if (Array.isArray(siteBlogs) && siteBlogs.length > 0) {
        allBlogs = siteBlogs;
        return;
      }
    }

    try {
      const payloadStr = localStorage.getItem(DATA_PAYLOAD_KEY);
      if (payloadStr) {
        const payload = JSON.parse(payloadStr);
        const list = payload.blog || payload.blogPosts;
        if (Array.isArray(list) && list.length > 0) {
          allBlogs = list;
          return;
        }
      }
    } catch (e) {}

    try {
      const res = await fetch('./data/blog.json');
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list) && list.length > 0) {
          allBlogs = list;
          return;
        }
      }
    } catch (e) {}
  }

  function findPost(identifier) {
    if (!identifier) return null;
    const clean = String(identifier).trim().toLowerCase();
    return allBlogs.find(b => {
      const s = (b.slug || '').toLowerCase();
      const id = (b.id || '').toLowerCase();
      return s === clean || id === clean;
    }) || null;
  }

  function render() {
    const lang = getLang();
    const bigCard = document.querySelector('.news-card-big') || document.getElementById('homeMainBlogCard');
    const sideList = document.querySelector('.news-side-list') || document.getElementById('homeSideBlogList');

    if (!bigCard && !sideList) return;

    // 1. Render Main Big Card
    const mainPost = findPost(config.main) || allBlogs[0] || DEFAULT_BLOGS[0];
    if (bigCard && mainPost) {
      const mainSlug = mainPost.slug || mainPost.id || 'sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms';
      const mainUrl = resolveArticleUrl(mainSlug);
      const mainTitle = getText(mainPost.title, lang);
      const mainExcerpt = getText(mainPost.excerpt, lang);
      const mainBadge = config.mainBadge || (typeof mainPost.category === 'string' ? mainPost.category : getText(mainPost.category, lang)) || 'Sacred Heritage';
      const rawCover = mainPost.cover || mainPost.coverImage || 'assets/images/cultural/sigiriya-1.webp';
      const coverSrc = resolvePath(rawCover);

      bigCard.setAttribute('href', mainUrl);
      bigCard.setAttribute('title', mainTitle);

      const img = bigCard.querySelector('img');
      if (img) {
        img.src = coverSrc;
        img.alt = mainTitle;
      }

      const dateEl = bigCard.querySelector('.news-date');
      if (dateEl) {
        dateEl.innerHTML = `${mainBadge} &bull; Lotus Journal`;
      }

      const titleEl = bigCard.querySelector('h3');
      if (titleEl) {
        titleEl.textContent = mainTitle;
      }

      const excerptEl = bigCard.querySelector('p');
      if (excerptEl && mainExcerpt) {
        excerptEl.textContent = mainExcerpt;
      }

      // Ensure click navigates directly to blog article
      bigCard.onclick = function (e) {
        // Normal link behavior
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
          window.location.href = mainUrl;
        }
      };
    }

    // 2. Render Side Articles (Up to 4 slots)
    if (sideList) {
      const sideIds = Array.isArray(config.side) && config.side.length > 0
        ? config.side
        : DEFAULT_CONFIG.side;

      const sideItems = [];
      sideIds.forEach((id) => {
        const post = findPost(id);
        if (post) sideItems.push(post);
      });

      // Fallback if less than 4 found
      if (sideItems.length === 0) {
        allBlogs.slice(1, 5).forEach(p => sideItems.push(p));
      }

      sideList.innerHTML = sideItems.map((post) => {
        const slug = post.slug || post.id;
        const postUrl = resolveArticleUrl(slug);
        const title = getText(post.title, lang);
        const customBadge = (config.sideBadges && config.sideBadges[slug])
          || (typeof post.category === 'string' ? post.category : getText(post.category, lang))
          || 'Travel Journal';
        const rawCover = post.cover || post.coverImage || 'assets/images/sigiriya.jpg';
        const coverSrc = resolvePath(rawCover);

        return `
          <a class="news-side-item" href="${postUrl}" title="${title.replace(/"/g, '&quot;')}" style="text-decoration: none; display: flex; gap: 1.25rem; align-items: center; background: #FFFFFF; padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid #EAF0F4; transition: var(--transition);">
            <img alt="${title.replace(/"/g, '&quot;')}" src="${coverSrc}" style="width: 105px; height: 85px; object-fit: cover; border-radius: var(--radius-sm); flex-shrink: 0;" loading="lazy" decoding="async" onerror="this.src='./assets/images/sigiriya.jpg'">
            <div class="news-side-item-content">
              <span class="news-date" style="color: var(--color-gold); font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">${customBadge}</span>
              <h4 class="news-side-title" style="font-size: 1.02rem; font-weight: 600; color: var(--color-dark-blue); margin-top: 0.25rem; line-height: 1.4;">${title}</h4>
            </div>
          </a>
        `;
      }).join('');
    }
  }

  async function init() {
    await Promise.all([loadConfig(), loadBlogs()]);
    render();

    window.addEventListener('lotus_homepage_blogs_updated', async (e) => {
      if (e && e.detail) {
        config = Object.assign({}, DEFAULT_CONFIG, e.detail);
      } else {
        await loadConfig();
      }
      await loadBlogs();
      render();
    });

    window.addEventListener('storage', async (e) => {
      if (e.key === STORAGE_KEY || e.key === DATA_PAYLOAD_KEY) {
        await loadConfig();
        await loadBlogs();
        render();
      }
    });

    window.addEventListener('lotus_lang_changed', () => {
      render();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.LotusHomepageBlogs = {
    init,
    render,
    getConfig: () => ({ ...config }),
    setConfig: (newCfg) => {
      config = Object.assign({}, config, newCfg);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      } catch (e) {}
      render();
    }
  };
})(window, document);
