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
const WHITE = '#ffffff';
const CREAM = '#fff7ed';

const MARGIN_X = 48;
const HEADER_H = 88;
const FOOTER_H = 52;

function getLogoPath() {
  const candidates = [
    path.join(__dirname, 'pdf-assets', 'logo-pdf.png'),
    path.join(process.cwd(), 'lib', 'pdf-assets', 'logo-pdf.png'),
    path.join(process.cwd(), 'public', 'logo-pdf.png'),
    path.join(process.cwd(), 'public', 'logo.png'),
    path.join(__dirname, '..', 'public', 'logo-pdf.png'),
    path.join(__dirname, '..', 'public', 'logo.png'),
  ];
  return candidates.find((p) => {
    try {
      return fs.existsSync(p);
    } catch (_) {
      return false;
    }
  }) || null;
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

function drawChrome(doc, fonts, agreementId, logoPath, pageNumber, pageCount) {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const savedMargins = { ...doc.page.margins };
  doc.page.margins = { top: 0, bottom: 0, left: 0, right: 0 };

  doc.save();
  doc.rect(0, 0, pageWidth, HEADER_H).fill(ORANGE);
  doc.rect(0, HEADER_H - 4, pageWidth, 4).fill(ORANGE_DARK);

  if (logoPath) {
    try {
      doc.image(logoPath, 40, 18, { width: 52, height: 52 });
    } catch (_) {
      /* optional */
    }
  }

  doc
    .fillColor(WHITE)
    .font(fonts.bold)
    .fontSize(16)
    .text(COMPANY.name, 108, 26, { width: pageWidth - 160, lineBreak: false });

  doc
    .font(fonts.regular)
    .fontSize(11)
    .fillColor('#ffedd5')
    .text('Client Project Agreement', 108, 48, {
      width: pageWidth - 160,
      lineBreak: false,
    });

  const footerY = pageHeight - 36;
  doc
    .moveTo(MARGIN_X, footerY)
    .lineTo(pageWidth - MARGIN_X, footerY)
    .strokeColor(RULE)
    .lineWidth(0.8)
    .stroke();

  doc
    .font(fonts.regular)
    .fontSize(8)
    .fillColor(MUTED)
    .text(
      `${COMPANY.name}  ·  ${agreementId}  ·  ${COMPANY.website.replace(/^https?:\/\//, '')}`,
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

function sectionTitle(doc, fonts, title, contentWidth) {
  const y = doc.y;
  doc.fillColor(ORANGE).rect(MARGIN_X, y + 2, 4, 12).fill();
  doc
    .fillColor(INK)
    .font(fonts.bold)
    .fontSize(12)
    .text(title, MARGIN_X + 12, y, { width: contentWidth - 12 });
  doc.moveDown(0.4);
}

function kv(doc, fonts, label, value, contentWidth) {
  doc.font(fonts.bold).fontSize(9.5).fillColor(MUTED).text(label, { width: contentWidth });
  doc.font(fonts.regular).fontSize(10).fillColor(INK).text(value || '—', { width: contentWidth });
  doc.moveDown(0.35);
}

/**
 * Generate a Celestial-branded client project agreement PDF.
 * Uses embedded DejaVu fonts (not Helvetica) so Vercel/serverless builds work
 * and Ghana Cedi / Unicode characters render correctly.
 *
 * @param {Record<string, any>} rawFormData
 * @returns {Promise<{ buffer: Buffer, filename: string, agreement: object }>}
 */
function generateClientAgreementPdf(rawFormData) {
  const agreement = buildAgreementData(rawFormData || {});
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
      // Pass a TTF path as the default font so pdfkit never loads Helvetica AFM
      // files (those break on Vercel/serverless even before custom fonts register).
      const fontPaths = resolvePdfFontPaths();
      const doc = new PDFDocument({
        size: 'A4',
        bufferPages: true,
        font: fontPaths.regular,
        margins: {
          top: HEADER_H + 24,
          bottom: FOOTER_H,
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

      const stripTop = doc.y;
      doc.roundedRect(MARGIN_X, stripTop, contentWidth, 44, 6).fill(CREAM);
      doc
        .fillColor(ORANGE_DARK)
        .font(fonts.bold)
        .fontSize(10)
        .text(`Agreement ID: ${agreement.agreementId}`, MARGIN_X + 14, stripTop + 10, {
          width: contentWidth - 28,
          lineBreak: false,
        });
      doc
        .fillColor(MUTED)
        .font(fonts.regular)
        .fontSize(9)
        .text(
          `Date: ${formatDate(agreement.createdAt)}  ·  Generated from a Celestial Web Solutions service request`,
          MARGIN_X + 14,
          stripTop + 26,
          { width: contentWidth - 28, lineBreak: false }
        );
      doc.y = stripTop + 56;

      doc
        .fillColor(INK)
        .font(fonts.regular)
        .fontSize(10)
        .text(
          'This Project Agreement summarises the understanding between the Client and Celestial Web Solutions based on the details submitted in the service request form. A final scoped proposal may refine deliverables, fees, and dates once discovery is complete.',
          { width: contentWidth, lineGap: 2 }
        );
      doc.moveDown(0.8);

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
      doc.moveDown(0.3);

      sectionTitle(doc, fonts, '2. Project details', contentWidth);
      kv(doc, fonts, 'Service requested', project.service, contentWidth);
      kv(doc, fonts, 'Indicative budget', project.budget, contentWidth);
      kv(doc, fonts, 'Target / estimated timeframe', project.timeframe, contentWidth);
      doc
        .font(fonts.bold)
        .fontSize(9.5)
        .fillColor(MUTED)
        .text('Project notes / requirements', { width: contentWidth });
      doc
        .font(fonts.regular)
        .fontSize(10)
        .fillColor(INK)
        .text(project.description, { width: contentWidth, lineGap: 1.5 });
      doc.moveDown(0.7);

      sectionTitle(doc, fonts, '3. Timeframe', contentWidth);
      doc
        .font(fonts.regular)
        .fontSize(10)
        .fillColor(INK)
        .text(
          `Estimated delivery window: ${project.timeframe}. Exact start and end dates will be confirmed in writing after requirements are finalised and payment (or the agreed first instalment) is received. Client delays in providing content, feedback, or approvals may extend the timeline.`,
          { width: contentWidth, lineGap: 2 }
        );
      doc.moveDown(0.7);

      sectionTitle(doc, fonts, '4. Payment terms', contentWidth);
      paymentTerms.forEach((line) => {
        doc
          .font(fonts.regular)
          .fontSize(9.5)
          .fillColor(INK)
          .text(`•  ${line}`, { width: contentWidth, lineGap: 1.2 });
      });
      doc.moveDown(0.35);
      doc
        .font(fonts.regular)
        .fontSize(9.5)
        .fillColor(INK)
        .text(
          `Indicative budget from request: ${project.budget}. Final fees will be confirmed in the project quote or invoice.`,
          { width: contentWidth, lineGap: 1.5 }
        );
      doc.moveDown(0.7);

      sectionTitle(doc, fonts, '5. Scope & deliverables', contentWidth);
      doc
        .font(fonts.regular)
        .fontSize(10)
        .fillColor(INK)
        .text(
          'Deliverables will match the service selected and the written quote that follows this agreement. Unless otherwise agreed in writing, Celestial Web Solutions provides professional design/development services, reasonable revisions within the agreed scope, and handoff documentation. Third-party fees (domains, paid plugins, ads spend, stock assets) are the Client\'s responsibility unless included in the quote.',
          { width: contentWidth, lineGap: 2 }
        );
      doc.moveDown(0.7);

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
      doc.moveDown(0.7);

      sectionTitle(doc, fonts, '7. Governing law', contentWidth);
      doc
        .font(fonts.regular)
        .fontSize(10)
        .fillColor(INK)
        .text(
          'This agreement is governed by the laws of Ghana. Disputes will first be addressed through good-faith negotiation, then arbitration in Accra if needed. The full website Terms & Conditions also apply: www.celestialwebsolutions.net/terms',
          { width: contentWidth, lineGap: 2 }
        );
      doc.moveDown(0.9);

      if (doc.y + 130 > doc.page.height - FOOTER_H) {
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
      doc.moveDown(0.8);

      const colW = (contentWidth - 24) / 2;
      const sigY = doc.y;
      doc.roundedRect(MARGIN_X, sigY, colW, 90, 6).strokeColor(RULE).lineWidth(1).stroke();
      doc
        .roundedRect(MARGIN_X + colW + 24, sigY, colW, 90, 6)
        .strokeColor(RULE)
        .lineWidth(1)
        .stroke();

      doc
        .font(fonts.bold)
        .fontSize(10)
        .fillColor(INK)
        .text('Client', MARGIN_X + 12, sigY + 12, { width: colW - 24, lineBreak: false });
      doc
        .font(fonts.regular)
        .fontSize(9)
        .fillColor(MUTED)
        .text(client.name, MARGIN_X + 12, sigY + 28, { width: colW - 24, lineBreak: false })
        .text('Signature: ____________________', MARGIN_X + 12, sigY + 50, {
          width: colW - 24,
          lineBreak: false,
        })
        .text('Date: ____________________', MARGIN_X + 12, sigY + 68, {
          width: colW - 24,
          lineBreak: false,
        });

      doc
        .font(fonts.bold)
        .fontSize(10)
        .fillColor(INK)
        .text(COMPANY.name, MARGIN_X + colW + 36, sigY + 12, {
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
        .text('Signature: ____________________', MARGIN_X + colW + 36, sigY + 50, {
          width: colW - 24,
          lineBreak: false,
        })
        .text('Date: ____________________', MARGIN_X + colW + 36, sigY + 68, {
          width: colW - 24,
          lineBreak: false,
        });

      doc.y = sigY + 110;

      if (doc.y + 100 > doc.page.height - FOOTER_H) {
        doc.addPage();
      }
      const boxTop = doc.y;
      doc.roundedRect(MARGIN_X, boxTop, contentWidth, 92, 8).fill(ORANGE);
      doc
        .fillColor(WHITE)
        .font(fonts.bold)
        .fontSize(12)
        .text('Questions about this agreement?', MARGIN_X + 16, boxTop + 14, {
          width: contentWidth - 32,
          lineBreak: false,
        });
      doc
        .font(fonts.regular)
        .fontSize(9.5)
        .fillColor('#ffedd5')
        .text(
          'Celestial Web Solutions will confirm final scope, fees, and dates after reviewing your request.',
          MARGIN_X + 16,
          boxTop + 34,
          { width: contentWidth - 32 }
        );
      doc
        .fillColor(WHITE)
        .font(fonts.regular)
        .fontSize(9.5)
        .text(
          `Email: ${company.email}  ·  Phone: ${company.phone}  ·  WhatsApp: ${company.whatsapp}`,
          MARGIN_X + 16,
          boxTop + 56,
          { width: contentWidth - 32, lineBreak: false }
        )
        .text(company.address, MARGIN_X + 16, boxTop + 70, {
          width: contentWidth - 32,
          lineBreak: false,
        });

      const range = doc.bufferedPageRange();
      for (let i = 0; i < range.count; i += 1) {
        doc.switchToPage(range.start + i);
        drawChrome(doc, fonts, agreement.agreementId, logoPath, i + 1, range.count);
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
