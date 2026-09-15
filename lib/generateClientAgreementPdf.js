const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { buildAgreementData, agreementFilename, COMPANY } = require('./agreementHelpers');
const { resolvePdfFontPaths, registerPdfFonts } = require('./pdfFonts');

const ORANGE = '#ea580c';
const ORANGE_DARK = '#c2410c';
const INK = '#1c1917';
const MUTED = '#57534e';
const RULE = '#e7e5e4';
const RULE_STRONG = '#d6d3d1';
const WHITE = '#ffffff';
const CREAM = '#fff7ed';
const SLATE = '#292524';

const MARGIN_X = 50;
const HEADER_H = 96;
const FOOTER_H = 64;

function getLogoPath() {
  const candidates = [
    path.join(__dirname, 'pdf-assets', 'logo-pdf.png'),
    path.join(process.cwd(), 'lib', 'pdf-assets', 'logo-pdf.png'),
    path.join(process.cwd(), 'public', 'logo-pdf.png'),
    path.join(process.cwd(), 'public', 'logo.png'),
    path.join(__dirname, '..', 'public', 'logo-pdf.png'),
    path.join(__dirname, '..', 'public', 'logo.png'),
  ];
  return (
    candidates.find((p) => {
      try {
        return fs.existsSync(p);
      } catch (_) {
        return false;
      }
    }) || null
  );
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch (_) {
    return String(iso);
  }
}

/**
 * Split CWS IDs into two readable lines (e.g. CWS-20260915 / WALI-X5HU).
 * Structured wrap keeps the full ID visible without crowding the issued date.
 */
function agreementIdLines(agreementId, doc, font, fontSize, maxWidth) {
  const id = String(agreementId || '').trim();
  if (!id) return [''];

  const parts = id.split('-');
  // Prefer the natural CWS-DATE / SLUG-RAND break for standard IDs
  if (parts.length >= 4 && /^CWS$/i.test(parts[0]) && /^\d{8}$/.test(parts[1])) {
    return [`${parts[0]}-${parts[1]}`, parts.slice(2).join('-')];
  }

  doc.font(font).fontSize(fontSize);
  if (doc.widthOfString(id) <= maxWidth) {
    return [id];
  }

  const mid = Math.ceil(id.length / 2);
  const dashNear = id.lastIndexOf('-', mid);
  const splitAt = dashNear > 3 ? dashNear : mid;
  return [id.slice(0, splitAt), id.slice(splitAt).replace(/^-/, '')];
}

/**
 * Professional letterhead header + footer for every page.
 */
function drawLetterhead(doc, fonts, agreementId, logoPath, pageNumber, pageCount, createdAt) {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const savedMargins = { ...doc.page.margins };
  doc.page.margins = { top: 0, bottom: 0, left: 0, right: 0 };

  doc.save();

  // Top accent bar
  doc.rect(0, 0, pageWidth, 5).fill(ORANGE);

  // Letterhead background
  doc.rect(0, 5, pageWidth, HEADER_H - 5).fill(WHITE);

  // Logo plate
  if (logoPath) {
    try {
      doc.roundedRect(MARGIN_X, 16, 48, 48, 6).fill(CREAM);
      doc.image(logoPath, MARGIN_X + 4, 20, { width: 40, height: 40 });
    } catch (_) {
      /* optional */
    }
  }

  const textLeft = logoPath ? MARGIN_X + 60 : MARGIN_X;

  // Right-side document identity card (sized for long CWS IDs)
  const idBoxW = 168;
  const idBoxX = pageWidth - MARGIN_X - idBoxW;
  const idPadX = 8;
  const idInnerW = idBoxW - idPadX * 2;
  const idFontSize = 7;
  const idLines = agreementIdLines(agreementId, doc, fonts.bold, idFontSize, idInnerW);
  const idLineH = 11;
  const idBoxH = idLines.length > 1 ? 62 : 50;
  const idBoxY = 12;

  doc
    .fillColor(SLATE)
    .font(fonts.bold)
    .fontSize(12.5)
    .text(COMPANY.name.toUpperCase(), textLeft, 18, {
      width: pageWidth - textLeft - MARGIN_X - (idBoxW + 12),
      lineBreak: false,
      characterSpacing: 0.35,
    });

  doc
    .font(fonts.regular)
    .fontSize(8)
    .fillColor(MUTED)
    .text('Web Design  ·  Development  ·  Digital Growth', textLeft, 36, {
      width: 280,
      lineBreak: false,
    })
    .text(COMPANY.website.replace(/^https?:\/\//, ''), textLeft, 48, {
      width: 220,
      lineBreak: false,
    });

  doc
    .roundedRect(idBoxX, idBoxY, idBoxW, idBoxH, 5)
    .strokeColor(RULE_STRONG)
    .lineWidth(1)
    .stroke();
  doc
    .fillColor(ORANGE)
    .font(fonts.bold)
    .fontSize(6.5)
    .text('CLIENT PROJECT AGREEMENT', idBoxX + idPadX, idBoxY + 6, {
      width: idInnerW,
      align: 'center',
      lineBreak: false,
      characterSpacing: 0.45,
    });

  let idY = idBoxY + 18;
  doc.fillColor(SLATE).font(fonts.bold).fontSize(idFontSize);
  idLines.forEach((line) => {
    doc.text(line, idBoxX + idPadX, idY, {
      width: idInnerW,
      align: 'center',
      lineBreak: false,
    });
    idY += idLineH;
  });

  doc
    .fillColor(MUTED)
    .font(fonts.regular)
    .fontSize(6.5)
    .text(`Issued ${formatDate(createdAt)}`, idBoxX + idPadX, idY + 4, {
      width: idInnerW,
      align: 'center',
      lineBreak: false,
    });

  // Dual rule under letterhead
  doc
    .moveTo(MARGIN_X, HEADER_H - 8)
    .lineTo(pageWidth - MARGIN_X, HEADER_H - 8)
    .strokeColor(ORANGE)
    .lineWidth(1.5)
    .stroke();
  doc
    .moveTo(MARGIN_X, HEADER_H - 5)
    .lineTo(pageWidth - MARGIN_X, HEADER_H - 5)
    .strokeColor(RULE_STRONG)
    .lineWidth(0.6)
    .stroke();

  // Footer dual rule
  const footerTop = pageHeight - FOOTER_H;
  doc
    .moveTo(MARGIN_X, footerTop)
    .lineTo(pageWidth - MARGIN_X, footerTop)
    .strokeColor(RULE_STRONG)
    .lineWidth(0.6)
    .stroke();
  doc
    .moveTo(MARGIN_X, footerTop + 2)
    .lineTo(pageWidth - MARGIN_X, footerTop + 2)
    .strokeColor(ORANGE)
    .lineWidth(1.2)
    .stroke();

  doc
    .font(fonts.bold)
    .fontSize(7)
    .fillColor(ORANGE_DARK)
    .text('CONFIDENTIAL', MARGIN_X, footerTop + 10, {
      width: 90,
      lineBreak: false,
      characterSpacing: 0.8,
    });

  doc
    .font(fonts.regular)
    .fontSize(7)
    .fillColor(MUTED)
    .text(
      `${COMPANY.name}  ·  ${COMPANY.email}  ·  ${COMPANY.phone}`,
      MARGIN_X,
      footerTop + 24,
      { width: pageWidth - MARGIN_X * 2 - 70, lineBreak: false }
    )
    .text(
      `${COMPANY.address}  ·  WhatsApp ${COMPANY.whatsapp}`,
      MARGIN_X,
      footerTop + 36,
      { width: pageWidth - MARGIN_X * 2 - 70, lineBreak: false }
    );

  doc
    .font(fonts.bold)
    .fontSize(9)
    .fillColor(SLATE)
    .text(`${pageNumber}`, pageWidth - MARGIN_X - 42, footerTop + 18, {
      width: 18,
      align: 'right',
      lineBreak: false,
    });
  doc
    .font(fonts.regular)
    .fontSize(8)
    .fillColor(MUTED)
    .text(`/ ${pageCount}`, pageWidth - MARGIN_X - 22, footerTop + 19, {
      width: 22,
      lineBreak: false,
    });

  // Bottom accent
  doc.rect(0, pageHeight - 5, pageWidth, 5).fill(ORANGE);

  doc.restore();
  doc.page.margins = savedMargins;
}

function sectionTitle(doc, fonts, title, contentWidth) {
  const y = doc.y;
  doc.fillColor(ORANGE).rect(MARGIN_X, y + 2, 3, 11).fill();
  doc
    .fillColor(SLATE)
    .font(fonts.bold)
    .fontSize(11)
    .text(title, MARGIN_X + 10, y, { width: contentWidth - 10 });
  doc.moveDown(0.35);
}

function kv(doc, fonts, label, value, contentWidth) {
  doc.font(fonts.bold).fontSize(8.5).fillColor(MUTED).text(label.toUpperCase(), { width: contentWidth });
  doc.font(fonts.regular).fontSize(10).fillColor(INK).text(value || '—', { width: contentWidth });
  doc.moveDown(0.32);
}

/**
 * Generate a Celestial-branded client project agreement PDF.
 * Uses embedded DejaVu fonts (not Helvetica) so Vercel/serverless builds work.
 *
 * @param {Record<string, any>} rawFormData
 * @param {{ requireAgreementId?: boolean }} [options]
 *   When requireAgreementId is true, refuse to mint a new CWS id (download path).
 * @returns {Promise<{ buffer: Buffer, filename: string, agreement: object }>}
 */
function generateClientAgreementPdf(rawFormData, options = {}) {
  const agreement = buildAgreementData(rawFormData || {}, {
    allowCreate: !options.requireAgreementId,
  });
  const filename = agreementFilename(agreement);
  const logoPath = getLogoPath();

  return new Promise((resolve, reject) => {
    let settled = false;
    const fail = (err) => {
      if (settled) return;
      settled = true;
      reject(err instanceof Error ? err : new Error(String(err)));
    };

    try {
      const fontPaths = resolvePdfFontPaths();
      const doc = new PDFDocument({
        size: 'A4',
        bufferPages: true,
        font: fontPaths.regular,
        margins: {
          top: HEADER_H + 20,
          bottom: FOOTER_H + 8,
          left: MARGIN_X,
          right: MARGIN_X,
        },
        info: {
          Title: `Project Agreement ${agreement.agreementId}`,
          Author: COMPANY.name,
          Subject: 'Client Project Agreement',
          Creator: COMPANY.name,
        },
      });

      const fonts = registerPdfFonts(doc, fontPaths);
      const chunks = [];
      doc.on('data', (c) => chunks.push(c));
      doc.on('error', fail);
      doc.on('end', () => {
        if (settled) return;
        settled = true;
        resolve({
          buffer: Buffer.concat(chunks),
          filename,
          agreement,
        });
      });

      const contentWidth = doc.page.width - MARGIN_X * 2;
      const { client, project, paymentTerms, company } = agreement;

      // Opening statement
      doc
        .fillColor(INK)
        .font(fonts.regular)
        .fontSize(10)
        .text(
          'This Project Agreement summarises the understanding between the Client and Celestial Web Solutions based on the details submitted in the service request form. A final scoped proposal may refine deliverables, fees, and dates once discovery is complete.',
          { width: contentWidth, lineGap: 2 }
        );
      doc.moveDown(0.85);

      sectionTitle(doc, fonts, '1. Parties', contentWidth);
      kv(doc, fonts, 'Service provider', company.name, contentWidth);
      kv(
        doc,
        fonts,
        'Provider contact',
        `${company.email}  ·  ${company.phone}  ·  WhatsApp ${company.whatsapp}`,
        contentWidth
      );
      kv(doc, fonts, 'Provider address', company.address, contentWidth);
      kv(doc, fonts, 'Client name', client.name, contentWidth);
      if (client.company) kv(doc, fonts, 'Client company', client.company, contentWidth);
      if (client.businessCategory) {
        kv(doc, fonts, 'Business category', client.businessCategory, contentWidth);
      }
      kv(doc, fonts, 'Client email', client.email || 'Not provided', contentWidth);
      kv(doc, fonts, 'Client phone', client.phone || 'Not provided', contentWidth);
      doc.moveDown(0.25);

      sectionTitle(doc, fonts, '2. Project details', contentWidth);
      kv(doc, fonts, 'Service requested', project.service, contentWidth);
      kv(doc, fonts, 'Indicative budget', project.budget, contentWidth);
      kv(doc, fonts, 'Target / estimated timeframe', project.timeframe, contentWidth);
      doc.font(fonts.bold).fontSize(8.5).fillColor(MUTED).text('PROJECT NOTES / REQUIREMENTS', {
        width: contentWidth,
      });
      doc
        .font(fonts.regular)
        .fontSize(10)
        .fillColor(INK)
        .text(project.description, { width: contentWidth, lineGap: 1.5 });
      doc.moveDown(0.65);

      sectionTitle(doc, fonts, '3. Timeframe', contentWidth);
      doc
        .font(fonts.regular)
        .fontSize(10)
        .fillColor(INK)
        .text(
          `Estimated delivery window: ${project.timeframe}. Exact start and end dates will be confirmed in writing after requirements are finalised and payment (or the agreed first instalment) is received. Client delays in providing content, feedback, or approvals may extend the timeline.`,
          { width: contentWidth, lineGap: 2 }
        );
      doc.moveDown(0.65);

      sectionTitle(doc, fonts, '4. Payment terms', contentWidth);
      paymentTerms.forEach((line) => {
        doc
          .font(fonts.regular)
          .fontSize(9.5)
          .fillColor(INK)
          .text(`•  ${line}`, { width: contentWidth, lineGap: 1.15 });
      });
      doc.moveDown(0.3);
      doc
        .font(fonts.regular)
        .fontSize(9.5)
        .fillColor(INK)
        .text(
          `Indicative budget from request: ${project.budget}. Final fees will be confirmed in the project quote or invoice.`,
          { width: contentWidth, lineGap: 1.5 }
        );
      doc.moveDown(0.65);

      sectionTitle(doc, fonts, '5. Scope & deliverables', contentWidth);
      doc
        .font(fonts.regular)
        .fontSize(10)
        .fillColor(INK)
        .text(
          "Deliverables will match the service selected and the written quote that follows this agreement. Unless otherwise agreed in writing, Celestial Web Solutions provides professional design/development services, reasonable revisions within the agreed scope, and handoff documentation. Third-party fees (domains, paid plugins, ads spend, stock assets) are the Client's responsibility unless included in the quote.",
          { width: contentWidth, lineGap: 2 }
        );
      doc.moveDown(0.65);

      sectionTitle(doc, fonts, '6. Client responsibilities', contentWidth);
      [
        'Provide accurate requirements, brand assets, and content in a timely manner.',
        'Respond to feedback requests within agreed review windows.',
        'Ensure payment according to the payment terms above.',
        'Confirm final approval before launch or handoff.',
      ].forEach((line) => {
        doc.font(fonts.regular).fontSize(9.5).fillColor(INK).text(`•  ${line}`, {
          width: contentWidth,
        });
      });
      doc.moveDown(0.65);

      sectionTitle(doc, fonts, '7. Governing law', contentWidth);
      doc
        .font(fonts.regular)
        .fontSize(10)
        .fillColor(INK)
        .text(
          'This agreement is governed by the laws of Ghana. Disputes will first be addressed through good-faith negotiation, then arbitration in Accra if needed. The full website Terms & Conditions also apply: www.celestialwebsolutions.net/terms',
          { width: contentWidth, lineGap: 2 }
        );
      doc.moveDown(0.85);

      if (doc.y + 130 > doc.page.height - FOOTER_H - 8) {
        doc.addPage();
      }
      sectionTitle(doc, fonts, '8. Acknowledgement', contentWidth);
      doc
        .font(fonts.regular)
        .fontSize(9.5)
        .fillColor(MUTED)
        .text(
          'By submitting the service request form and downloading this agreement, the Client acknowledges the project summary, timeframe estimate, and payment terms. Formal signatures may be completed digitally or on a follow-up quote.',
          { width: contentWidth, lineGap: 1.5 }
        );
      doc.moveDown(0.75);

      const colW = (contentWidth - 24) / 2;
      const sigY = doc.y;
      doc.roundedRect(MARGIN_X, sigY, colW, 92, 4).strokeColor(RULE_STRONG).lineWidth(1).stroke();
      doc
        .roundedRect(MARGIN_X + colW + 24, sigY, colW, 92, 4)
        .strokeColor(RULE_STRONG)
        .lineWidth(1)
        .stroke();

      doc
        .font(fonts.bold)
        .fontSize(9.5)
        .fillColor(SLATE)
        .text('CLIENT', MARGIN_X + 12, sigY + 12, { width: colW - 24, lineBreak: false });
      doc
        .font(fonts.regular)
        .fontSize(9)
        .fillColor(MUTED)
        .text(client.name, MARGIN_X + 12, sigY + 28, { width: colW - 24, lineBreak: false })
        .text('Signature: ____________________', MARGIN_X + 12, sigY + 52, {
          width: colW - 24,
          lineBreak: false,
        })
        .text('Date: ____________________', MARGIN_X + 12, sigY + 70, {
          width: colW - 24,
          lineBreak: false,
        });

      doc
        .font(fonts.bold)
        .fontSize(9.5)
        .fillColor(SLATE)
        .text('CELESTIAL WEB SOLUTIONS', MARGIN_X + colW + 36, sigY + 12, {
          width: colW - 24,
          lineBreak: false,
        });
      doc
        .font(fonts.regular)
        .fontSize(9)
        .fillColor(MUTED)
        .text('Authorised representative', MARGIN_X + colW + 36, sigY + 28, {
          width: colW - 24,
          lineBreak: false,
        })
        .text('Signature: ____________________', MARGIN_X + colW + 36, sigY + 52, {
          width: colW - 24,
          lineBreak: false,
        })
        .text('Date: ____________________', MARGIN_X + colW + 36, sigY + 70, {
          width: colW - 24,
          lineBreak: false,
        });

      doc.y = sigY + 112;

      if (doc.y + 88 > doc.page.height - FOOTER_H - 8) {
        doc.addPage();
      }
      const boxTop = doc.y;
      doc.roundedRect(MARGIN_X, boxTop, contentWidth, 78, 6).fill(SLATE);
      doc.rect(MARGIN_X, boxTop, 4, 78).fill(ORANGE);
      doc
        .fillColor(WHITE)
        .font(fonts.bold)
        .fontSize(11)
        .text('Questions about this agreement?', MARGIN_X + 16, boxTop + 14, {
          width: contentWidth - 32,
          lineBreak: false,
        });
      doc
        .font(fonts.regular)
        .fontSize(9)
        .fillColor('#d6d3d1')
        .text(
          'Celestial Web Solutions will confirm final deliverables, fees, and dates after reviewing your request.',
          MARGIN_X + 16,
          boxTop + 32,
          { width: contentWidth - 32 }
        );
      doc
        .fillColor(WHITE)
        .font(fonts.regular)
        .fontSize(8.5)
        .text(
          `${company.email}  ·  ${company.phone}  ·  WhatsApp ${company.whatsapp}`,
          MARGIN_X + 16,
          boxTop + 52,
          { width: contentWidth - 32, lineBreak: false }
        );

      const range = doc.bufferedPageRange();
      for (let i = 0; i < range.count; i += 1) {
        doc.switchToPage(range.start + i);
        drawLetterhead(
          doc,
          fonts,
          agreement.agreementId,
          logoPath,
          i + 1,
          range.count,
          agreement.createdAt
        );
      }

      doc.end();
    } catch (err) {
      fail(err);
    }
  });
}

module.exports = {
  generateClientAgreementPdf,
};
