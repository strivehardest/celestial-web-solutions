const fs = require('fs');
const path = require('path');

const FONT_CANDIDATES = {
  regular: [
    path.join(process.cwd(), 'public', 'fonts', 'DejaVuSans.ttf'),
    '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    '/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf',
  ],
  bold: [
    path.join(process.cwd(), 'public', 'fonts', 'DejaVuSans-Bold.ttf'),
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf',
  ],
};

function firstExisting(paths) {
  return paths.find((p) => fs.existsSync(p)) || null;
}

/**
 * Register Unicode-capable fonts so Ghana Cedi (₵) and other symbols render.
 * Falls back to Helvetica if no TTF is available.
 * @param {import('pdfkit')} doc
 * @returns {{ regular: string, bold: string }}
 */
function registerPdfFonts(doc) {
  const regularPath = firstExisting(FONT_CANDIDATES.regular);
  const boldPath = firstExisting(FONT_CANDIDATES.bold);

  if (regularPath) {
    doc.registerFont('CelestialSans', regularPath);
  }
  if (boldPath) {
    doc.registerFont('CelestialSans-Bold', boldPath);
  }

  return {
    regular: regularPath ? 'CelestialSans' : 'Helvetica',
    bold: boldPath ? 'CelestialSans-Bold' : regularPath ? 'CelestialSans' : 'Helvetica-Bold',
  };
}

module.exports = {
  registerPdfFonts,
};
