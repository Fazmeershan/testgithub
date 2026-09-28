// Generates placeholder logo files. Replace assets/logo-dark.png (for light
// backgrounds) and assets/logo-light.png (for dark backgrounds) with the real
// Dawodia Holding logo, then re-run build_deck.js.
const sharp = require("sharp");
const path = require("path");

function svg(text, sub) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="300" viewBox="0 0 960 300">
  <g transform="translate(150,150)">
    <rect x="-95" y="-95" width="190" height="190" rx="18" transform="rotate(45)" fill="none" stroke="#C8A04A" stroke-width="14"/>
    <rect x="-58" y="-58" width="116" height="116" rx="10" transform="rotate(45)" fill="#C8A04A"/>
    <text x="0" y="30" text-anchor="middle" font-family="DejaVu Serif, serif" font-weight="bold" font-size="92" fill="${sub}">D</text>
  </g>
  <text x="315" y="160" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="104" letter-spacing="10" fill="${text}">DAWODIA</text>
  <text x="320" y="238" font-family="DejaVu Sans, Arial, sans-serif" font-size="50" letter-spacing="26" fill="#C8A04A">HOLDING</text>
</svg>`;
}

(async () => {
  const out = path.join(__dirname, "assets");
  await sharp(Buffer.from(svg("#0B1F33", "#0B1F33"))).png().toFile(path.join(out, "logo-dark.png"));
  await sharp(Buffer.from(svg("#FFFFFF", "#0B1F33"))).png().toFile(path.join(out, "logo-light.png"));
  console.log("logos written");
})();
