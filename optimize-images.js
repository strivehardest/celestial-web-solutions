const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC = './public'; // adjust if your public folder is elsewhere

const images = [
  // Logo — resize from 1024x1024 to 160x160 (2x retina for 80x80 display)
  {
    input:  `${PUBLIC}/logo-white.png`,
    output: `${PUBLIC}/logo-white.webp`,
    width:  160,
    height: 160,
    label:  'Logo White',
  },
  // Portfolio desktop screenshots — resize from 1440x900 to 800x500 (2x retina for ~392x294 display)
  {
    input:  `${PUBLIC}/portfolio/desktop/dlautos.png`,
    output: `${PUBLIC}/portfolio/desktop/dlautos.webp`,
    width:  800,
    height: 500,
    label:  'DL Auto Parts',
  },
  {
    input:  `${PUBLIC}/portfolio/desktop/myspace.png`,
    output: `${PUBLIC}/portfolio/desktop/myspace.webp`,
    width:  800,
    height: 500,
    label:  'My Space Furniture',
  },
  {
    input:  `${PUBLIC}/portfolio/desktop/ghanaupdates.png`,
    output: `${PUBLIC}/portfolio/desktop/ghanaupdates.webp`,
    width:  800,
    height: 500,
    label:  'Ghana Updates Online',
  },
  {
    input:  `${PUBLIC}/portfolio/desktop/elolo.png`,
    output: `${PUBLIC}/portfolio/desktop/elolo.webp`,
    width:  800,
    height: 500,
    label:  'Elolo Agbleke',
  },
  {
    input:  `${PUBLIC}/portfolio/desktop/valyd.png`,
    output: `${PUBLIC}/portfolio/desktop/valyd.webp`,
    width:  800,
    height: 500,
    label:  'Valyd',
  },
  {
    input:  `${PUBLIC}/portfolio/desktop/finance.png`,
    output: `${PUBLIC}/portfolio/desktop/finance.webp`,
    width:  800,
    height: 500,
    label:  'Finance Tracker',
  },
  {
   input:  `${PUBLIC}/portfolio/desktop/trueseeds.png`,
   output: `${PUBLIC}/portfolio/desktop/trueseeds.webp`,
   width:  800,
   height: 500,
   label:  'Tru Seeds Africa',
  },
];

async function optimize() {
  console.log('\nCelestial Web Solutions — Image Optimizer\n');
  let totalSavedKB = 0;

  for (const img of images) {
    if (!fs.existsSync(img.input)) {
      console.warn(`  SKIP  ${img.label} — file not found: ${img.input}`);
      continue;
    }

    const originalSize = fs.statSync(img.input).size;

    await sharp(img.input)
      .resize(img.width, img.height, { fit: 'cover', position: 'top' })
      .webp({ quality: 82, effort: 6 })
      .toFile(img.output);

    const newSize = fs.statSync(img.output).size;
    const savedKB = Math.round((originalSize - newSize) / 1024);
    const reduction = Math.round((1 - newSize / originalSize) * 100);
    totalSavedKB += savedKB;

    console.log(`  OK    ${img.label}`);
    console.log(`        ${Math.round(originalSize / 1024)} KB  →  ${Math.round(newSize / 1024)} KB  (saved ${savedKB} KB, ${reduction}% smaller)`);
    console.log(`        Output: ${img.output}\n`);
  }

  console.log(`\nTotal saved: ~${Math.round(totalSavedKB / 1024 * 10) / 10} MB`);
  console.log('\nNext step: Update your components (see comments below in this file)\n');
}

optimize().catch(console.error);


/**
 * ─── COMPONENT FIXES ────────────────────────────────────────────────────────
 *
 * After running this script, make these changes in your Next.js components:
 *
 * ── 1. LOGO (in your Navbar / Header component) ─────────────────────────────
 *
 * BEFORE:
 *   <img src="/logo-white.png" alt="Celestial Web Solutions Logo" class="w-20 h-20 object-contain">
 *
 * AFTER:
 *   import Image from 'next/image';
 *   <Image
 *     src="/logo-white.webp"
 *     alt="Celestial Web Solutions Logo"
 *     width={80}
 *     height={80}
 *     className="object-contain"
 *     priority              // logo is above the fold — load it first
 *   />
 *
 *
 * ── 2. PORTFOLIO CARDS (in your portfolio section / page) ───────────────────
 *
 * BEFORE (raw img tags like this):
 *   <img
 *     src="/portfolio/desktop/dlautos.png"
 *     alt="DL Auto Parts"
 *     class="w-full h-full object-cover group-hover:scale-[1.04] transition-transform ..."
 *   >
 *
 * AFTER:
 *   import Image from 'next/image';
 *   <Image
 *     src="/portfolio/desktop/dlautos.webp"
 *     alt="DL Auto Parts"
 *     width={392}
 *     height={294}
 *     className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform ..."
 *     loading="lazy"        // portfolio is below the fold
 *   />
 *
 * Apply the same pattern to: myspace, ghanaupdates, elolo, valyd, finance
 *
 *
 * ── 3. BRAND LOGOS (client logos in homepage marquee/grid) ──────────────────
 *
 * These are already going through /_next/image (Next.js Image component) but
 * the source PNGs in /public/png/projects/ are too large.
 * Run this to also compress the brand logos in place:
 *
 *   Add these to the images array above and re-run the script:
 *
 *   { input: './public/png/projects/martb.png',      output: './public/png/projects/martb.webp',      width: 256, height: 128, label: 'Mart Ban' },
 *   { input: './public/png/projects/building.png',   output: './public/png/projects/building.webp',   width: 256, height: 128, label: 'Building Planner' },
 *   { input: './public/png/projects/ghanaupdates1.jpg', output: './public/png/projects/ghanaupdates1.webp', width: 160, height: 80, label: 'Ghana Updates Logo' },
 *   { input: './public/png/projects/dl-auto-parts.png', output: './public/png/projects/dl-auto-parts.webp', width: 256, height: 128, label: 'DL Auto Parts Logo' },
 *   { input: './public/png/projects/myspace.png',    output: './public/png/projects/myspace.webp',    width: 256, height: 128, label: 'My Space Logo' },
 *   { input: './public/png/projects/elolo2.jpeg',    output: './public/png/projects/elolo2.webp',     width: 170, height: 120, label: 'Elolo Logo' },
 *
 * Then update the src paths in your component from .png/.jpg to .webp.
 *
 *
 * ── 4. next.config.js — ENABLE WEBP ─────────────────────────────────────────
 *
 * Make sure your next.config.js (or next.config.ts) includes this:
 *
 *   const nextConfig = {
 *     images: {
 *       formats: ['image/avif', 'image/webp'],  // serve AVIF first, WebP fallback
 *       deviceSizes: [640, 750, 828, 1080, 1200],
 *       imageSizes: [16, 32, 48, 64, 96, 128, 160, 256, 384],
 *     },
 *   };
 *
 *
 * ── 5. EXPECTED RESULTS AFTER FIXES ─────────────────────────────────────────
 *
 *   Before: ~5,700 KB total image payload on homepage
 *   After:  ~300–400 KB estimated total image payload
 *   LCP improvement: typically 1–3 second reduction on mobile
 *   PageSpeed score improvement: typically +15 to +30 points
 *
 */
