const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { TERMS_META, TERMS_SECTIONS } = require('./termsContent');
const { registerPdfFonts } = require('./pdfFonts');

const ORANGE = '#ea580c';
const ORANGE_DARK = '#c2410c';
const INK = '#1c1917';
const MUTED = '#57534e';
const RULE = '#e7e5e4';
const WHITE = '#ffffff';
const CREAM = '#fff7ed';

const MARGIN_X = 48;
const HEADER_H = 88;
const FOOTER_H = 52;

function getLogoPath() {
  const compact = path.join(process.cwd(), 'public', 'logo-pdf.png');
  const full = path.join(process.cwd(), 'public', 'logo.png');
  return fs.existsSync(compact) ? compact : full;
}

function drawChrome(doc, meta, logoPath, pageNumber, pageCount) {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  const savedMargins = { ...doc.page.margins };
  doc.page.margins = { top: 0, bottom: 0, left: 0, right: 0 };

  doc.save();

  doc.rect(0, 0, pageWidth, HEADER_H).fill(ORANGE);
  doc.rect(0, HEADER_H - 4, pageWidth, 4).fill(ORANGE_DARK);

  if (logoPath && fs.existsSync(logoPath)) {
    try {
      doc.image(logoPath, 40, 18, { width: 52, height: 52 });
    } catch (_) {
      /* logo optional */
    }
  }

  // Header/footer stay on Helvetica (ASCII-only). Body uses Unicode fonts for ₵.
  doc
    .fillColor(WHITE)
    .font('Helvetica-Bold')
    .fontSize(16)
    .text(meta.company, 108, 28, { width: pageWidth - 160, lineBreak: false });

  doc
    .font('Helvetica')
    .fontSize(11)
    .fillColor('#ffedd5')
    .text(meta.title, 108, 50, { width: pageWidth - 160, lineBreak: false });

  const footerY = pageHeight - 36;
  doc
    .moveTo(MARGIN_X, footerY)
    .lineTo(pageWidth - MARGIN_X, footerY)
    .strokeColor(RULE)
    .lineWidth(0.8)
    .stroke();

  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(MUTED)
    .text(
      `${meta.company}  ·  ${String(meta.website || '').replace(/^https?:\/\//, '')}`,
      MARGIN_X,
      footerY + 8,
      { width: pageWidth - 180, lineBreak: false }
    );

  doc.text(`Page ${pageNumber} of ${pageCount}`, pageWidth - 120, footerY + 8, {
    width: 72,
    align: 'right',
    lineBreak: false,
  });

  doc.restore();
  doc.page.margins = savedMargins;
}

/**
 * Celestial-branded Terms & Conditions PDF (Unicode fonts for Ghana Cedi ₵).
 * @returns {Promise<Buffer>}
 */
function generateTermsPdfBuffer() {
  const logoPath = getLogoPath();

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      bufferPages: true,
      margins: {
        top: HEADER_H + 24,
        bottom: FOOTER_H,
        left: MARGIN_X,
        right: MARGIN_X,
      },
      info: {
        Title: `${TERMS_META.title} | ${TERMS_META.company}`,
        Author: TERMS_META.company,
        Subject: 'Terms and Conditions',
        Creator: TERMS_META.company,
        Keywords: 'Celestial Web Solutions, terms, Ghana',
      },
    });

    const fonts = registerPdfFonts(doc);

    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('error', reject);
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    const width = doc.page.width - MARGIN_X * 2;

    const stripTop = doc.y;
    doc.roundedRect(MARGIN_X, stripTop, width, 40, 6).fill(CREAM);
    doc
      .fillColor(ORANGE_DARK)
      .font(fonts.bold)
      .fontSize(10)
      .text(`Last updated: ${TERMS_META.lastUpdated}`, MARGIN_X + 14, stripTop + 10, {
        width: width - 28,
        lineBreak: false,
      });
    doc
      .fillColor(MUTED)
      .font(fonts.regular)
      .fontSize(9)
      .text('Official service agreement for Celestial Web Solutions clients', MARGIN_X + 14, stripTop + 24, {
        width: width - 28,
        lineBreak: false,
      });
    doc.y = stripTop + 52;

    doc
      .fillColor(INK)
      .font(fonts.bold)
      .fontSize(12)
      .text('Important Information', { width });

    doc.moveDown(0.35);
    doc
      .font(fonts.regular)
      .fontSize(10)
      .fillColor(MUTED)
      .text(TERMS_META.intro, { width, align: 'left', lineGap: 2 });

    doc.moveDown(0.9);

    TERMS_SECTIONS.forEach((section, index) => {
      const titleY = doc.y;
      doc
        .fillColor(ORANGE)
        .rect(MARGIN_X, titleY + 2, 4, 12)
        .fill();

      doc
        .fillColor(INK)
        .font(fonts.bold)
        .fontSize(11.5)
        .text(section.title, MARGIN_X + 12, titleY, { width: width - 12 });

      doc.moveDown(0.35);

      section.content.split(/\n\n+/).forEach((block) => {
        block.split('\n').forEach((line) => {
          const trimmed = line.trimEnd();
          if (!trimmed) {
            doc.moveDown(0.15);
            return;
          }
          const bullet = trimmed.startsWith('•');
          doc
            .font(fonts.regular)
            .fontSize(9.5)
            .fillColor(INK)
            .text(trimmed, {
              width: width - (bullet ? 6 : 0),
              indent: bullet ? 6 : 0,
              align: 'left',
              lineGap: 1.25,
            });
        });
        doc.moveDown(0.25);
      });

      if (index < TERMS_SECTIONS.length - 1) {
        doc.moveDown(0.15);
        const y = doc.y;
        doc
          .moveTo(MARGIN_X, y)
          .lineTo(doc.page.width - MARGIN_X, y)
          .strokeColor(RULE)
          .lineWidth(0.5)
          .stroke();
        doc.moveDown(0.65);
      }
    });

    doc.moveDown(0.6);
    if (doc.y + 120 > doc.page.height - FOOTER_H) {
      doc.addPage();
    }
    const top = doc.y;
    doc.roundedRect(MARGIN_X, top, width, 120, 8).fill(ORANGE);
    doc
      .fillColor(WHITE)
      .font(fonts.bold)
      .fontSize(13)
      .text('Questions about these terms?', MARGIN_X + 16, top + 16, {
        width: width - 32,
        lineBreak: false,
      });
    doc
      .font(fonts.regular)
      .fontSize(9.5)
      .fillColor('#ffedd5')
      .text(
        'Contact Celestial Web Solutions — we are happy to clarify anything in this agreement.',
        MARGIN_X + 16,
        top + 36,
        { width: width - 32 }
      );
    doc
      .fillColor(WHITE)
      .font(fonts.regular)
      .fontSize(9.5)
      .text(`Email: ${TERMS_META.email}`, MARGIN_X + 16, top + 58, { lineBreak: false })
      .text(`Phone: ${TERMS_META.phone}`, MARGIN_X + 16, top + 72, { lineBreak: false })
      .text(`WhatsApp: ${TERMS_META.whatsapp}`, MARGIN_X + 16, top + 86, { lineBreak: false })
      .text(`Address: ${TERMS_META.address}`, MARGIN_X + 16, top + 100, { lineBreak: false });

    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i += 1) {
      doc.switchToPage(range.start + i);
      drawChrome(doc, TERMS_META, logoPath, i + 1, range.count);
    }

    doc.end();
  });
}

module.exports = {
  generateTermsPdfBuffer,
  TERMS_META,
  TERMS_SECTIONS,
};
