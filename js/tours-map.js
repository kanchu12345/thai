/**
 * Lotus Ceylon - Luxury Map Showcase & Lightbox Controller
 */
document.addEventListener('DOMContentLoaded', function() {
  const openButtons = document.querySelectorAll('#openMapLightbox, .js-open-map-modal');
  const modal = document.getElementById('lotusMapModal');
  const closeBtn = document.getElementById('closeMapModal');

  if (modal && openButtons.length > 0) {
    function openModal(e) {
      if (e) e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    openButtons.forEach(btn => {
      btn.addEventListener('click', openModal);
      btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal();
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
});
