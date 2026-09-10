const { generateClientAgreementPdf } = require('../../lib/generateClientAgreementPdf');

export const config = {
  api: {
    responseLimit: '8mb',
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

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
      [payload.firstName, payload.lastName].filter(Boolean).join(' ');
    const service = payload.service || payload.subject;

    if (!clientName || !service) {
      return res.status(400).json({
        error: 'Client name and service (or subject) are required to generate an agreement.',
      });
    }

    const { buffer, filename, agreement } = await generateClientAgreementPdf(payload);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('X-Agreement-Id', agreement.agreementId);
    return res.status(200).send(buffer);
  } catch (error) {
    console.error('Client agreement PDF generation failed:', error);
    return res.status(500).json({ error: 'Failed to generate project agreement PDF' });
  }
}
