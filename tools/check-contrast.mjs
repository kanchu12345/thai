// tools/check-contrast.mjs
// WCAG 2.2 Relative Luminance and Contrast Ratio Calculator

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function srgbToLinear(val) {
  const c = val / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function getLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function getContrast(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const colors = {
  ivory: '#FBF6EC',
  sandstone: '#F1E6D3',
  templeMaroon: '#4A1620',
  saffron: '#D9822B',
  deepSaffron: '#A8530E',
  gildedGold: '#C9A24B',
  lotusRose: '#C85C8A',
  blush: '#F6DDE6',
  bodhiGreen: '#3F6B4A',
  ink: '#2A1D17',
  muted: '#6B5B50',
  white: '#FFFFFF'
};

const pairs = [
  // Text on Ivory background (#FBF6EC)
  { name: 'Ink text on Ivory', fg: colors.ink, bg: colors.ivory, target: 4.5, type: 'Normal Text' },
  { name: 'Muted text on Ivory', fg: colors.muted, bg: colors.ivory, target: 4.5, type: 'Normal Text' },
  { name: 'Deep Saffron links on Ivory', fg: colors.deepSaffron, bg: colors.ivory, target: 4.5, type: 'Normal Text' },
  { name: 'Bodhi Green on Ivory', fg: colors.bodhiGreen, bg: colors.ivory, target: 4.5, type: 'Normal Text / Tag' },
  { name: 'Temple Maroon headings on Ivory', fg: colors.templeMaroon, bg: colors.ivory, target: 4.5, type: 'Heading Text' },
  { name: 'Saffron UI icon/button on Ivory', fg: colors.saffron, bg: colors.ivory, target: 3.0, type: 'UI Component' },
  { name: 'Lotus Rose on Ivory', fg: colors.lotusRose, bg: colors.ivory, target: 3.0, type: 'UI Accent' },

  // Text on Sandstone background (#F1E6D3)
  { name: 'Ink text on Sandstone', fg: colors.ink, bg: colors.sandstone, target: 4.5, type: 'Normal Text' },
  { name: 'Muted text on Sandstone', fg: colors.muted, bg: colors.sandstone, target: 4.5, type: 'Normal Text' },
  { name: 'Deep Saffron on Sandstone', fg: colors.deepSaffron, bg: colors.sandstone, target: 4.5, type: 'Normal Text' },
  { name: 'Temple Maroon on Sandstone', fg: colors.templeMaroon, bg: colors.sandstone, target: 4.5, type: 'Heading Text' },

  // Text & UI on Temple Maroon background (#4A1620)
  { name: 'White text on Temple Maroon', fg: colors.white, bg: colors.templeMaroon, target: 4.5, type: 'Normal Text' },
  { name: 'Ivory text on Temple Maroon', fg: colors.ivory, bg: colors.templeMaroon, target: 4.5, type: 'Normal Text' },
  { name: 'Gilded Gold headings on Temple Maroon', fg: colors.gildedGold, bg: colors.templeMaroon, target: 4.5, type: 'Large Heading / Accent' },
  { name: 'Saffron on Temple Maroon', fg: colors.saffron, bg: colors.templeMaroon, target: 3.0, type: 'UI Component / Pill' },
  { name: 'Blush on Temple Maroon', fg: colors.blush, bg: colors.templeMaroon, target: 4.5, type: 'Subtext' },

  // Button Combinations
  { name: 'White on Saffron (#D9822B)', fg: colors.white, bg: colors.saffron, target: 4.5, type: 'Button Text (Check)' },
  { name: 'Ink (#2A1D17) on Saffron (#D9822B)', fg: colors.ink, bg: colors.saffron, target: 4.5, type: 'Button Text (Check)' },
  { name: 'White on Deep Saffron (#A8530E)', fg: colors.white, bg: colors.deepSaffron, target: 4.5, type: 'Button Text (Check)' },
  { name: 'White on Temple Maroon (#4A1620)', fg: colors.white, bg: colors.templeMaroon, target: 4.5, type: 'Button Text' },
  { name: 'White on Bodhi Green (#3F6B4A)', fg: colors.white, bg: colors.bodhiGreen, target: 4.5, type: 'Button / Badge' },
  { name: 'Ink on Blush (#F6DDE6)', fg: colors.ink, bg: colors.blush, target: 4.5, type: 'Badge / Pill' }
];

console.log('| Combination | FG Hex | BG Hex | Contrast | Target | Status | Usage / Note |');
console.log('|---|---|---|---|---|---|---|');

pairs.forEach(p => {
  const ratio = getContrast(p.fg, p.bg);
  const formatted = ratio.toFixed(2) + ':1';
  const pass = ratio >= p.target;
  const status = pass ? 'PASS (AA)' : 'FAIL';
  console.log(`| ${p.name} | \`${p.fg}\` | \`${p.bg}\` | **${formatted}** | ${p.target}:1 | ${status} | ${p.type} |`);
});
