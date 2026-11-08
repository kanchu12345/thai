/**
 * Lotus Ceylon / Walkers Real Experiences Auto-Swap Controller
 * Controls 4 cross-fading panoramic backgrounds, quotes, circular navigation, and thumbnails.
 */
(function() {
  function initRealExp() {
    var sec = document.querySelector('.real-experiences-sec, .walkers-real-experiences, #experiences');
    if (!sec || sec._realExpInitialized) return;
    sec._realExpInitialized = true;

    var bgSlides = Array.prototype.slice.call(sec.querySelectorAll('.real-exp-bg-layer, .wre-bg-slide'));
    var quoteSlides = Array.prototype.slice.call(sec.querySelectorAll('.real-exp-slide, .wre-quote-slide'));
    var prevBtn = document.getElementById('realExpPrevBtn') || document.getElementById('wrePrevBtn');
    var nextBtn = document.getElementById('realExpNextBtn') || document.getElementById('wreNextBtn');
    var thumbs = Array.prototype.slice.call(sec.querySelectorAll('.real-exp-thumb-btn'));
    var dotsContainer = document.getElementById('realExpDots') || sec.querySelector('.real-exp-dots-row, .wre-dots-row');

    if (bgSlides.length === 0 || quoteSlides.length === 0) return;

    var total = Math.min(bgSlides.length, quoteSlides.length);
    var current = 0;
    var timer = null;
    var interval = 6000; // Auto-swaps every 6 seconds

    // Populate dots if empty
    var dots = [];
    if (dotsContainer) {
      if (dotsContainer.children.length === 0) {
        for (var d = 0; d < total; d++) {
          var dotBtn = document.createElement('button');
          dotBtn.type = 'button';
          dotBtn.className = 'real-exp-dot' + (d === 0 ? ' is-active' : '');
          dotBtn.setAttribute('aria-label', 'Go to slide ' + (d + 1));
          dotBtn.setAttribute('data-slide-index', String(d));
          dotsContainer.appendChild(dotBtn);
        }
      }
      dots = Array.prototype.slice.call(dotsContainer.querySelectorAll('.real-exp-dot, .wre-dot'));
    }

    function goTo(index) {
      current = (index + total) % total;
      for (var i = 0; i < total; i++) {
        var isActive = (i === current);
        if (bgSlides[i]) {
          bgSlides[i].classList.toggle('is-active', isActive);
        }
        if (quoteSlides[i]) {
          quoteSlides[i].classList.toggle('is-active', isActive);
          quoteSlides[i].setAttribute('aria-hidden', isActive ? 'false' : 'true');
        }
        if (dots[i]) {
          dots[i].classList.toggle('is-active', isActive);
        }
        if (thumbs[i]) {
          thumbs[i].classList.toggle('is-active', isActive);
          thumbs[i].setAttribute('aria-selected', isActive ? 'true' : 'false');
        }
      }
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function start() {
      stop();
      timer = setInterval(next, interval);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    if (nextBtn) {
      nextBtn.onclick = function(e) {
        if (e) e.preventDefault();
        next();
        start();
      };
    }
    if (prevBtn) {
      prevBtn.onclick = function(e) {
        if (e) e.preventDefault();
        prev();
        start();
      };
    }

    dots.forEach(function(dot, i) {
      dot.onclick = function(e) {
        if (e) e.preventDefault();
        goTo(i);
        start();
      };
    });

    thumbs.forEach(function(thumb, i) {
      thumb.onclick = function(e) {
        if (e) e.preventDefault();
        goTo(i);
        start();
      };
    });

    sec.onmouseenter = stop;
    sec.onmouseleave = start;

    window.LotusRealExp = {
      goTo: goTo,
      next: next,
      prev: prev,
      start: start,
      stop: stop,
      getCurrent: function() { return current; }
    };

    window.addEventListener('message', function(e) {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === 'lotus:set-wre-slide' || e.data.type === 'lotus:set-real-exp-slide') {
        goTo(typeof e.data.index === 'number' ? e.data.index : 0);
        stop();
      }
      if (e.data.type === 'lotus:activate-slide' && e.data.key && e.data.key.indexOf('real_exp_bg_') !== -1) {
        var num = parseInt(e.data.key.replace(/.*real_exp_bg_/, ''), 10);
        if (!isNaN(num) && num >= 1 && num <= total) {
          goTo(num - 1);
          stop();
        }
      }
    });

    // Mobile touch swipe support
    var startX = 0;
    sec.addEventListener('touchstart', function(e) {
      if (e.changedTouches && e.changedTouches[0]) {
        startX = e.changedTouches[0].screenX;
      }
      stop();
    }, { passive: true });

    sec.addEventListener('touchend', function(e) {
      if (e.changedTouches && e.changedTouches[0]) {
        var diff = e.changedTouches[0].screenX - startX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) prev(); else next();
        }
      }
      start();
    }, { passive: true });

    // Start auto-rotation
    start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRealExp);
  } else {
    initRealExp();
  }
})();
