const { generateTermsPdfBuffer, TERMS_META } = require('../../lib/generateTermsPdf');

export const config = {
  api: {
    responseLimit: '8mb',
  },
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const pdf = await generateTermsPdfBuffer();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${TERMS_META.filename}"`
    );
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Content-Length', pdf.length);
    return res.status(200).send(pdf);
  } catch (error) {
    console.error('Terms PDF generation failed:', error);
    return res.status(500).json({ error: 'Failed to generate Terms PDF' });
  }
}
