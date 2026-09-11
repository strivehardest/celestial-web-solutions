const fs = require('fs');
const path = require('path');
const os = require('os');

const FONT_FILES = {
  regular: 'DejaVuSans.ttf',
  bold: 'DejaVuSans-Bold.ttf',
};

function sourceCandidates(filename) {
  return [
    path.join(__dirname, 'pdf-assets', 'fonts', filename),
    path.join(process.cwd(), 'lib', 'pdf-assets', 'fonts', filename),
    path.join(process.cwd(), 'public', 'fonts', filename),
    path.join(__dirname, '..', 'public', 'fonts', filename),
  ];
}

function firstExisting(paths) {
  return (
    paths.find((p) => {
      try {
        return fs.existsSync(p);
      } catch (_) {
        return false;
      }
    }) || null
  );
}

/**
 * Copy a bundled TTF into /tmp so Vercel serverless can read it reliably,
 * even when the original path is read-only or awkwardly traced.
 */
function materializeFont(filename) {
  const source = firstExisting(sourceCandidates(filename));
  if (!source) return null;

  const dest = path.join(os.tmpdir(), `celestial-${filename}`);
  try {
    const srcStat = fs.statSync(source);
    let needsCopy = true;
    try {
      const destStat = fs.statSync(dest);
      needsCopy = destStat.size !== srcStat.size;
    } catch (_) {
      needsCopy = true;
    }
    if (needsCopy) {
      fs.copyFileSync(source, dest);
    }
    return dest;
  } catch (_) {
    // Fall back to the source path if /tmp is unavailable
    return source;
  }
}

/**
 * Resolve Unicode TTF paths for pdfkit.
 * Prefer materialized /tmp copies so Vercel never needs Helvetica AFM files.
 *
 * @returns {{ regular: string, bold: string }}
 */
function resolvePdfFontPaths() {
  const regular = materializeFont(FONT_FILES.regular);
  const bold = materializeFont(FONT_FILES.bold) || regular;

  if (!regular) {
    throw new Error(
      'PDF fonts missing: DejaVuSans.ttf not found under lib/pdf-assets/fonts or public/fonts'
    );
  }

  return { regular, bold };
}

/**
 * Register Unicode-capable fonts on a pdfkit document.
 * Call AFTER constructing PDFDocument with `font: paths.regular` so Helvetica
 * AFM files are never loaded (they break on many Vercel/serverless installs).
 *
 * @param {import('pdfkit')} doc
 * @param {{ regular: string, bold: string }} [paths]
 * @returns {{ regular: string, bold: string }}
 */
function registerPdfFonts(doc, paths) {
  const fontPaths = paths || resolvePdfFontPaths();

  doc.registerFont('CelestialSans', fontPaths.regular);
  doc.registerFont('CelestialSans-Bold', fontPaths.bold);

  return {
    regular: 'CelestialSans',
    bold: 'CelestialSans-Bold',
  };
}

module.exports = {
  resolvePdfFontPaths,
  registerPdfFonts,
  firstExisting,
};
