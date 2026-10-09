// Generates clearly-labelled placeholder SVGs. Replace with real photos (see README).
import fs from 'node:fs';
const out = 'public/images/demo/';
const svg = (w, h, seed, label) => {
  let g = '';
  for (let i = 0; i < 7; i++) {
    const x = ((seed * 97 + i * 211) % (w - 300)) + 60, y = ((seed * 53 + i * 131) % (h - 260)) + 60;
    g += `<rect x="${x}" y="${y}" width="${150 + (i * 37 + seed * 11) % 220}" height="${110 + (i * 29 + seed * 7) % 160}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b2540"/><stop offset="1" stop-color="#0c1220"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><g fill="none" stroke="#c9a54c" stroke-opacity=".45" stroke-width="2">${g}<path d="M0 ${h * .7}H${w}M${w * .3} 0V${h}" stroke-opacity=".2"/></g><text x="${w / 2}" y="${h / 2}" fill="#f4efe6" fill-opacity=".7" font-family="Georgia,serif" font-size="${Math.round(w / 30)}" text-anchor="middle">${label}</text><text x="${w / 2}" y="${h / 2 + w / 22}" fill="#c9a54c" font-family="sans-serif" font-size="${Math.round(w / 55)}" text-anchor="middle">ILLUSTRATIVE PLACEHOLDER – REPLACE WITH REAL IMAGE</text></svg>`;
};
const slugs = ['courtyard-house','hillside-retreat','linen-brass-apartment','atelier-loft','terrace-pavilion','quiet-study','stone-gate-villa','gallery-dining-room'];
slugs.forEach((s, i) => {
  fs.writeFileSync(`${out}${s}-cover.svg`, svg(1600, 1100, i + 1, s.replace(/-/g, ' ')));
  [['1',1600,1000],['2',1000,1250],['3',1000,1250]].forEach(([n,w,h], j) =>
    fs.writeFileSync(`${out}${s}-${n}.svg`, svg(w, h, i * 3 + j + 9, `${s.replace(/-/g, ' ')} · detail ${n}`)));
});
