// Renders public/og.png (1200x630), the default share image. Run locally after design
// changes: node scripts/og-image.mjs. The PNG is committed, so builds need no fonts.
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1f3bd6"/>
      <stop offset="1" stop-color="#101a5c"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="120" r="260" fill="#ffffff" opacity="0.06"/>
  <circle cx="1120" cy="560" r="180" fill="#ffffff" opacity="0.05"/>
  <text x="90" y="170" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="64" font-weight="800" fill="#ffffff" letter-spacing="-2">ej<tspan fill="#8ea0ff">-</tspan>aj</text>
  <text x="90" y="330" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="84" font-weight="800" fill="#ffffff" letter-spacing="-3">Umetna inteligenca</text>
  <text x="90" y="430" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="84" font-weight="800" fill="#8ea0ff" letter-spacing="-3">po slovensko.</text>
  <text x="90" y="540" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="32" fill="#dfe4ff">Tedenske novice, primerjava modelov, AI slovar · ej-aj.si</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('public/og.png written');
