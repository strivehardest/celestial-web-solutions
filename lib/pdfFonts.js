const fs = require('fs');
const path = require('path');

const FONT_CANDIDATES = {
  regular: [
    // Bundled next to this module so Vercel serverless file tracing includes them
    path.join(__dirname, 'pdf-assets', 'fonts', 'DejaVuSans.ttf'),
    path.join(process.cwd(), 'lib', 'pdf-assets', 'fonts', 'DejaVuSans.ttf'),
    path.join(process.cwd(), 'public', 'fonts', 'DejaVuSans.ttf'),
    path.join(__dirname, '..', 'public', 'fonts', 'DejaVuSans.ttf'),
    '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    '/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf',
  ],
  bold: [
    path.join(__dirname, 'pdf-assets', 'fonts', 'DejaVuSans-Bold.ttf'),
    path.join(process.cwd(), 'lib', 'pdf-assets', 'fonts', 'DejaVuSans-Bold.ttf'),
    path.join(process.cwd(), 'public', 'fonts', 'DejaVuSans-Bold.ttf'),
    path.join(__dirname, '..', 'public', 'fonts', 'DejaVuSans-Bold.ttf'),
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf',
  ],
};

function firstExisting(paths) {
  return paths.find((p) => {
    try {
      return fs.existsSync(p);
    } catch (_) {
      return false;
    }
  }) || null;
}

/**
 * Register Unicode-capable fonts so Ghana Cedi (₵) and other symbols render.
 * Prefer embedded DejaVu TTFs — never rely on Helvetica AFM files (broken on
 * many Vercel/serverless pdfkit installs).
 *
 * @param {import('pdfkit')} doc
 * @param {{ requireUnicode?: boolean }} [options]
 * @returns {{ regular: string, bold: string }}
 */
function registerPdfFonts(doc, options = {}) {
  const requireUnicode = options.requireUnicode !== false;
  const regularPath = firstExisting(FONT_CANDIDATES.regular);
  const boldPath = firstExisting(FONT_CANDIDATES.bold);

  if (!regularPath) {
    if (requireUnicode) {
      throw new Error(
        'PDF fonts missing: DejaVuSans.ttf not found under lib/pdf-assets/fonts or public/fonts'
      );
    }
    return { regular: 'Helvetica', bold: 'Helvetica-Bold' };
  }

  doc.registerFont('CelestialSans', regularPath);
  if (boldPath) {
    doc.registerFont('CelestialSans-Bold', boldPath);
  }

  return {
    regular: 'CelestialSans',
    bold: boldPath ? 'CelestialSans-Bold' : 'CelestialSans',
  };
}

module.exports = {
  registerPdfFonts,
  firstExisting,
};
