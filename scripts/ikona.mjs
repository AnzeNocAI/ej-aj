// Writes the site icon files from src/data/ikona.mjs: public/favicon.svg (follows the browser's
// light/dark theme), public/apple-touch-icon.png (180) and public/icon-512.png. Run locally after
// changing the icon: node scripts/ikona.mjs. The PNGs are committed, like public/og.png.
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { IKONA } from '../src/data/ikona.mjs';

const { size, radius, dot, letters } = IKONA;
const shapes = (bg, ink, accent, rx) =>
  `<rect width="${size}" height="${size}" rx="${rx}" ${bg}/>` +
  `<circle cx="${dot.cx}" cy="${dot.cy}" r="${dot.r}" ${accent}/>` +
  `<path d="${letters}" ${ink}/>`;

const favicon =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">` +
  `<style>.b{fill:#fbfaf7}.i{fill:#16181d}.a{fill:#1f3bd6}` +
  `@media (prefers-color-scheme:dark){.b{fill:#111317}.i{fill:#eceef2}.a{fill:#8ea0ff}}</style>` +
  shapes('class="b"', 'class="i"', 'class="a"', radius) +
  `</svg>\n`;
writeFileSync('public/favicon.svg', favicon);

// Square PNGs without rounded corners: iOS and Android apply their own mask.
const flat = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">` +
    shapes('fill="#fbfaf7"', 'fill="#16181d"', 'fill="#1f3bd6"', 0) +
    `</svg>`,
);
await sharp(flat, { density: 300 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(flat, { density: 300 }).resize(512, 512).png().toFile('public/icon-512.png');
console.log('public/favicon.svg, public/apple-touch-icon.png, public/icon-512.png written');
