/**
 * LOTUS CEYLON - Cloudinary Dynamic Transformation & Preset Pipeline
 * 
 * Provides automated image resizing, smart AI/face gravity cropping,
 * auto-format (f_auto -> AVIF/WebP), and auto-compression (q_auto)
 * tailored specifically for each website section allocation:
 * 
 * 1. Tour Hero: 16:9 widescreen, smart AI focus (c_fill,g_auto,ar_16:9,w_1600)
 * 2. Itinerary Days: 16:10 card aspect ratio, landmark focus (c_fill,g_auto,ar_16:10,w_800)
 * 3. Destination Cards: 16:10 ratio, smart landscape focus (c_fill,g_auto,ar_16:10,w_800)
 * 4. Team Avatars: 1:1 square, facial recognition centering (c_fill,g_face,w_600,h_600)
 * 5. Review Avatars: 1:1 square, facial recognition centering (c_fill,g_face,w_300,h_300)
 * 6. Category Hero: 16:9 widescreen, smart focus (c_fill,g_auto,ar_16:9,w_1600)
 * 7. Blog Cover: 16:9 editorial hero (c_fill,g_auto,ar_16:9,w_1200)
 * 8. Gallery: High-res bounded preservation (c_limit,w_1920,h_1440)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CloudinaryPipeline = factory();
    if (root.LOTUS_CONFIG) {
      root.LOTUS_CONFIG.cloudinaryPipeline = root.CloudinaryPipeline;
    }
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const SECTION_PRESETS = {
    tour_hero: {
      key: 'tour_hero',
      tag: 'section_tour_hero',
      folder: 'lotus/tours/hero',
      aspectRatio: '16:9',
      width: 1600,
      gravity: 'auto',
      crop: 'fill',
      transformation: 'c_fill,g_auto,ar_16:9,w_1600,f_auto,q_auto',
      description: 'Tour Hero / Main Banner (16:9 Widescreen, Smart AI Content Focus)'
    },
    itinerary_day: {
      key: 'itinerary_day',
      tag: 'section_itinerary_day',
      folder: 'lotus/tours/itinerary',
      aspectRatio: '16:10',
      width: 800,
      gravity: 'auto',
      crop: 'fill',
      transformation: 'c_fill,g_auto,ar_16:10,w_800,f_auto,q_auto',
      description: 'Day-by-Day Itinerary Cards (16:10 Aspect, Smart Landmark Focus)'
    },
    destination_card: {
      key: 'destination_card',
      tag: 'section_destination_card',
      folder: 'lotus/destinations',
      aspectRatio: '16:10',
      width: 800,
      gravity: 'auto',
      crop: 'fill',
      transformation: 'c_fill,g_auto,ar_16:10,w_800,f_auto,q_auto',
      description: 'Destination Cards (16:10 Aspect Ratio, AI Focal Point)'
    },
    team_avatar: {
      key: 'team_avatar',
      tag: 'section_team_avatar',
      folder: 'lotus/team',
      aspectRatio: '1:1',
      width: 600,
      height: 600,
      gravity: 'face',
      crop: 'fill',
      transformation: 'c_fill,g_face,w_600,h_600,f_auto,q_auto',
      description: 'Team & Leadership Avatars (1:1 Square, Smart Face Detection Centering)'
    },
    review_avatar: {
      key: 'review_avatar',
      tag: 'section_review_avatar',
      folder: 'lotus/reviews',
      aspectRatio: '1:1',
      width: 300,
      height: 300,
      gravity: 'face',
      crop: 'fill',
      transformation: 'c_fill,g_face,w_300,h_300,f_auto,q_auto',
      description: 'Customer Review Avatars (1:1 Square, Face Centering)'
    },
    category_hero: {
      key: 'category_hero',
      tag: 'section_category_hero',
      folder: 'lotus/categories',
      aspectRatio: '16:9',
      width: 1600,
      gravity: 'auto',
      crop: 'fill',
      transformation: 'c_fill,g_auto,ar_16:9,w_1600,f_auto,q_auto',
      description: 'Category Hero Banners (16:9 Widescreen)'
    },
    blog_cover: {
      key: 'blog_cover',
      tag: 'section_blog_cover',
      folder: 'lotus/blog',
      aspectRatio: '16:9',
      width: 1200,
      gravity: 'auto',
      crop: 'fill',
      transformation: 'c_fill,g_auto,ar_16:9,w_1200,f_auto,q_auto',
      description: 'Blog & Article Covers (16:9 Editorial)'
    },
    gallery: {
      key: 'gallery',
      tag: 'section_gallery',
      folder: 'lotus/gallery',
      aspectRatio: 'free',
      maxWidth: 1920,
      maxHeight: 1440,
      gravity: 'none',
      crop: 'limit',
      transformation: 'c_limit,w_1920,h_1440,f_auto,q_auto',
      description: 'Photo Gallery (High-Res Bounded Preservation)'
    },
    default: {
      key: 'default',
      tag: 'section_general',
      folder: 'lotus/media',
      transformation: 'c_limit,w_1920,f_auto,q_auto',
      description: 'General Media Asset (Auto-Format & Auto-Quality)'
    }
  };

  /**
   * Intelligently detect section key from an input ID, HTML element ID, tag, or field name
   */
  function detectSection(hint) {
    if (!hint || typeof hint !== 'string') return 'default';
    const s = hint.toLowerCase();

    // 1. Itinerary
    if (s.includes('itin') || s.includes('itinerary') || s.includes('day_') || s.includes('dayimg') || s.includes('activity')) {
      return 'itinerary_day';
    }
    // 2. Team & Leadership
    if (s.includes('team') || s.includes('leader') || s.includes('member') || s.includes('author') || s.includes('staff')) {
      return 'team_avatar';
    }
    // 3. Reviews & Testimonials
    if (s.includes('review') || s.includes('testimonial') || s.includes('feedback') || s.startsWith('rev') || s.includes('revavatar')) {
      return 'review_avatar';
    }
    // 4. Destinations
    if (s.includes('dest') || s.includes('location') || s.includes('attraction')) {
      return 'destination_card';
    }
    // 5. Category
    if (s.includes('cat') && (s.includes('hero') || s.includes('banner') || s.includes('img') || s.includes('image'))) {
      return 'category_hero';
    }
    // 6. Blog
    if (s.includes('blog') || s.includes('post') || s.includes('article') || s.includes('news')) {
      return 'blog_cover';
    }
    // 7. Gallery
    if (s.includes('gallery') || s.includes('album') || s.includes('slide')) {
      return 'gallery';
    }
    // 8. Tour Hero / Banner
    if (s.includes('hero') || s.includes('banner') || s.includes('pkg') || s.includes('tour')) {
      return 'tour_hero';
    }

    return 'default';
  }

  function getPreset(section) {
    const key = (section in SECTION_PRESETS) ? section : detectSection(section);
    return SECTION_PRESETS[key] || SECTION_PRESETS.default;
  }

  /**
   * Universal URL Transformer:
   * Strips any old/partial transformation parameters and injects the
   * section-specific transformation string (f_auto, q_auto, smart crop, gravity).
   */
  function applyTransformation(url, sectionOrPreset) {
    if (!url || typeof url !== 'string') return url;
    url = url.trim();

    // Only transform Cloudinary URLs
    if (!url.includes('cloudinary.com') || !url.includes('/upload/')) {
      return url;
    }

    const preset = (typeof sectionOrPreset === 'object' && sectionOrPreset && sectionOrPreset.transformation)
      ? sectionOrPreset
      : getPreset(sectionOrPreset);

    const transformStr = preset.transformation;

    const uploadIdx = url.indexOf('/upload/');
    if (uploadIdx === -1) return url;

    const prefix = url.substring(0, uploadIdx + '/upload/'.length);
    let remainder = url.substring(uploadIdx + '/upload/'.length);

    // Strip existing transformation parameters before version segment or asset name
    while (/^(?:(?:c_|w_|h_|ar_|g_|f_|q_|so_|fl_|e_|b_|co_|dpr_)[^/]*|f_auto|q_auto)\//.test(remainder)) {
      remainder = remainder.replace(/^[^/]+\//, '');
    }

    return prefix + transformStr + '/' + remainder;
  }

  /**
   * Generates upload options suitable for passing to XMLHttpRequest / FormData
   */
  function getUploadParams(section) {
    const preset = getPreset(section);
    const tags = ['lotus_cdn', preset.tag, 'section_' + preset.key].join(',');
    return {
      folder: preset.folder,
      tags: tags,
      section: preset.key,
      transformation: preset.transformation
    };
  }

  /**
   * Generates responsive srcset URLs for modern multi-device rendering
   * (Mobile ~480px, Tablet ~800px, Desktop ~1200px/1600px)
   */
  function generateResponsiveSrcSet(url, section) {
    if (!url || !url.includes('cloudinary.com') || !url.includes('/upload/')) return '';
    const preset = getPreset(section);
    const widths = [400, 800, 1200, 1600];
    
    return widths.map(function(w) {
      let customTransform = preset.transformation.replace(/w_\d+/, 'w_' + w);
      if (!customTransform.includes('w_')) {
        customTransform = 'w_' + w + ',' + customTransform;
      }
      const transformedUrl = applyTransformation(url, { transformation: customTransform });
      return transformedUrl + ' ' + w + 'w';
    }).join(', ');
  }

  return {
    PRESETS: SECTION_PRESETS,
    detectSection: detectSection,
    getPreset: getPreset,
    applyTransformation: applyTransformation,
    optimizeUrl: applyTransformation,
    getUploadParams: getUploadParams,
    generateResponsiveSrcSet: generateResponsiveSrcSet
  };
}));
