# UI/UX Specification: Full-Image Presentation Architecture for Success Stories Card

## 1. Problem Definition & Root Cause Analysis
- **User Observation:** In the "Our Success Stories" card on the home page (`#successStoriesCard`), images (specifically group dining and tour group photos, such as Story 3/5) are aggressively cropped top and bottom. Heads and faces of guests are cut in half, degrading the perceived quality and storytelling power of the website.
- **Technical Cause:** The card container uses a fixed, shallow height (`clamp(285px, 22vw, 335px)` ~ 2.6:1 aspect ratio), and `.story-image` was configured with `object-fit: cover !important; object-position: center !important;`. For standard 4:3, 3:2, or smartphone-ratio photos, `cover` slices off the top 30% and bottom 30% of the image.

---

## 2. Luxury Dual-Layer Ambient Presentation Solution

To showcase **100% of the photograph** without any cropping while eliminating harsh black letterbox bars, we employ a luxury dual-layer rendering system:

### Layer 1: Ambient Blurred Backdrop (`.story-image-backdrop`)
- **Visual Purpose:** Fills the letterbox area with a soft, blurred aura of the same photograph's dominant colors and atmosphere.
- **Specifications:**
  - `position: absolute; inset: -10%; width: 120%; height: 120%;`
  - `object-fit: cover; object-position: center;`
  - `filter: blur(24px) brightness(0.32) saturate(1.2);`
  - `z-index: 1; pointer-events: none;`
  - `transform: scale(1.08);`
  - Transition on swap: `opacity 0.4s ease;`

### Layer 2: Subtle Cinematic Vignette (`.story-image-overlay`)
- **Visual Purpose:** Enhances contrast at top and bottom edges so the title pill, counter, and navigation dots remain perfectly legible without obscuring the middle photo.
- **Specifications:**
  - `background: linear-gradient(180deg, rgba(7, 20, 34, 0.65) 0%, rgba(7, 20, 34, 0.05) 25%, rgba(7, 20, 34, 0.05) 75%, rgba(7, 20, 34, 0.8) 100%);`
  - `z-index: 2; pointer-events: none;`

### Layer 3: Crisp Contained Foreground Photograph (`.story-image`)
- **Visual Purpose:** Renders the pristine, uncropped photograph in full glory.
- **Specifications:**
  - `position: absolute; inset: 0; width: 100%; height: 100%;`
  - `object-fit: contain !important;` (Strict zero-crop constraint)
  - `object-position: center !important;`
  - `z-index: 3; display: block;`
  - Subtle hover zoom: `transform: scale(1.02);`

---

## 3. Card Dimensions & Proportions

| Viewport | Min Height | Height Property | Max Width |
| :--- | :--- | :--- | :--- |
| **Desktop (> 1024px)** | `350px` | `clamp(340px, 28vw, 420px)` | `780px` |
| **Tablet (681px - 1024px)** | `320px` | `clamp(320px, 32vw, 380px)` | `100%` |
| **Mobile (<= 680px)** | `280px` | `clamp(280px, 58vw, 340px)` | `100%` |

---

## 4. UI Controls & Contrast Refinements
- **Top Meta Pill (`.story-meta-pill`):**
  - `z-index: 4;`
  - `background: rgba(7, 20, 34, 0.78); backdrop-filter: blur(10px);`
  - `border: 1px solid rgba(212, 175, 55, 0.45); border-radius: 999px;`
- **Bottom Navigation Bar (`.story-controls-bar`):**
  - `z-index: 4;`
  - `background: rgba(7, 20, 34, 0.78); backdrop-filter: blur(10px);`
  - `border: 1px solid rgba(212, 175, 55, 0.35); border-radius: 999px;`
  - Nav buttons: Hover states with subtle gold glow.
- **Linear Progress Bar (`.story-progress-track`):**
  - `z-index: 5; height: 3px; background: rgba(255, 255, 255, 0.12);`
  - Progress fill: `#D4AF37` (Royal Gold gradient).

---

## 5. Implementation Code Specs for Frontend Dev

### CSS (`css/brand-header.css`)
```css
/* Card Height update */
.success-stories-landscape-card {
  position: relative !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  width: 100% !important;
  min-height: 350px !important;
  height: clamp(340px, 28vw, 420px) !important;
  background: #071422 !important;
  border: 1.5px solid rgba(212, 175, 55, 0.45) !important;
  border-radius: 20px !important;
  overflow: hidden !important;
  box-shadow: 0 16px 44px rgba(0, 43, 73, 0.2), 0 4px 16px rgba(212, 175, 55, 0.18) !important;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease !important;
  cursor: pointer !important;
}

/* Layer 1: Ambient Blurred Backdrop */
.success-stories-landscape-card .story-image-backdrop {
  position: absolute !important;
  inset: -10% !important;
  width: 120% !important;
  height: 120% !important;
  object-fit: cover !important;
  object-position: center !important;
  filter: blur(24px) brightness(0.32) saturate(1.2) !important;
  z-index: 1 !important;
  pointer-events: none !important;
  transform: scale(1.08) !important;
  transition: opacity 0.4s ease !important;
}

/* Layer 2: Multi-stop Cinematic Vignette Gradient Overlay */
.success-stories-landscape-card .story-image-overlay {
  position: absolute !important;
  inset: 0 !important;
  background: linear-gradient(
    180deg,
    rgba(7, 20, 34, 0.65) 0%,
    rgba(7, 20, 34, 0.05) 25%,
    rgba(7, 20, 34, 0.05) 75%,
    rgba(7, 20, 34, 0.8) 100%
  ) !important;
  z-index: 2 !important;
  pointer-events: none !important;
}

/* Layer 3: Crisp Contained Foreground Image */
.success-stories-landscape-card .story-image {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  object-position: center !important;
  z-index: 3 !important;
  display: block !important;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease !important;
}

.success-stories-landscape-card:hover .story-image {
  transform: scale(1.02) !important;
}

/* Z-Index for UI Overlays */
.story-top-row {
  z-index: 4 !important;
}
.story-bottom-row {
  z-index: 4 !important;
}
.story-progress-track {
  z-index: 5 !important;
}

@media (max-width: 680px) {
  .success-stories-landscape-card {
    min-height: 280px !important;
    height: clamp(280px, 58vw, 340px) !important;
  }
}
```

### HTML (`index.html`)
Inside `#successStoriesCard`:
```html
<!-- Ambient Blurred Background Backdrop -->
<img alt="" aria-hidden="true" class="story-image-backdrop" id="storyImageBackdrop" loading="lazy" src="https://res.cloudinary.com/qmukrbh6/image/upload/f_auto,q_auto/v1794916467/duyawh1nziw7o7esk9j5.jpg"/>

<!-- Crisp 100% Full Foreground Image (object-fit: contain) -->
<img alt="Lotus Ceylon Completed Tour" class="story-image" id="storyImage" loading="lazy" src="https://res.cloudinary.com/qmukrbh6/image/upload/f_auto,q_auto/v1794916467/duyawh1nziw7o7esk9j5.jpg"/>

<!-- Multi-Stop Luxury Cinematic Vignette Overlay -->
<div class="story-image-overlay" id="storyMediaBox"></div>
```

### JavaScript (`js/success-stories.js`)
In `renderStory(index)`:
```javascript
const elImgBackdrop = document.getElementById('storyImageBackdrop');
if (elImgBackdrop) {
  elImgBackdrop.src = story.photo || '...';
}
if (elImg) {
  elImg.src = story.photo || '...';
  elImg.alt = story.title || 'Our Success Story';
}
```

---

## 6. QA Verification Criteria
1. **Zero Cropping:** All 5 success stories (especially Story 3 with the dining table) show 100% of faces, heads, hands, table, and surroundings without top/bottom cropping.
2. **Visual Aesthetics:** No harsh letterbox bars; smooth ambient blurred backdrop seamlessly fills empty lateral spaces.
3. **Contrast & Readability:** "OUR SUCCESS STORIES 3/5" badge and navigation controls are distinct, legible, and functional.
4. **Responsive Testing:** Verify at 1440px (Desktop), 1024px (iPad Pro), 768px (iPad Mini), and 390px (iPhone).
