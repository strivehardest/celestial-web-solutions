const { generateClientAgreementPdf } = require('../../lib/generateClientAgreementPdf');

export const config = {
  api: {
    responseLimit: '8mb',
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

function resolveGenerator(mod) {
  if (!mod) return null;
  if (typeof mod === 'function') return mod;
  if (typeof mod.generateClientAgreementPdf === 'function') return mod.generateClientAgreementPdf;
  if (typeof mod.default === 'function') return mod.default;
  if (mod.default && typeof mod.default.generateClientAgreementPdf === 'function') {
    return mod.default.generateClientAgreementPdf;
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body || {};
    const clientName =
      payload.clientName ||
      payload.name ||
      [payload.firstName, payload.lastName].filter(Boolean).join(' ').trim();
    const service = payload.service || payload.subject;

    if (!clientName || !service) {
      return res.status(400).json({
        error: 'Client name and service (or subject) are required to generate an agreement.',
      });
    }

    const generate = resolveGenerator({ generateClientAgreementPdf });
    if (!generate) {
      throw new Error('Agreement PDF generator is not available');
    }

    const result = await generate({
      ...payload,
      name: clientName,
      service,
      source: payload.source || 'website-form',
    });

    const buffer = result.buffer || result.pdf || result;
    const filename =
      result.filename ||
      `Celestial-Project-Agreement-${Date.now()}.pdf`;
    const agreementId = result.agreement?.agreementId || '';

    if (!Buffer.isBuffer(buffer) && !(buffer instanceof Uint8Array)) {
      throw new Error('PDF generator returned an invalid buffer');
    }

    const out = Buffer.from(buffer);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Length', out.length);
    if (agreementId) res.setHeader('X-Agreement-Id', agreementId);
    return res.status(200).send(out);
  } catch (error) {
    console.error('Client agreement PDF generation failed:', error);
    return res.status(500).json({
      error: 'Failed to generate project agreement PDF',
      detail: String(error?.message || error).slice(0, 300),
    });
  }
}
