#!/usr/bin/env node
/**
 * Write a static Celestial-branded Terms PDF into /public for direct download.
 * Usage: node scripts/generate-terms-pdf.js
 */
const fs = require('fs');
const path = require('path');
const { generateTermsPdfBuffer, TERMS_META } = require('../lib/generateTermsPdf');

async function main() {
  const outPath = path.join(__dirname, '..', 'public', TERMS_META.filename);
  const pdf = await generateTermsPdfBuffer();
  fs.writeFileSync(outPath, pdf);
  console.log(`Wrote ${outPath} (${pdf.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
