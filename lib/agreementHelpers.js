/**
 * Shared helpers for Celestial client project agreements.
 */

const COMPANY = {
  name: 'Celestial Web Solutions',
  website: 'https://www.celestialwebsolutions.net',
  email: 'info@celestialwebsolutions.net',
  phone: '+233 24 567 1832',
  whatsapp: '+233 53 050 5031',
  address: '235 Agblor Link, Keta, Ghana',
  paystackUssd: '*415*3370#',
};

const TIMEFRAME_OPTIONS = [
  'ASAP (rush — may include surcharge)',
  '1–2 weeks',
  '2–4 weeks',
  '1–2 months',
  '3+ months',
  'Flexible / to be confirmed',
];

const SERVICE_TIMEFRAME_DEFAULTS = {
  'Web Design & Development': '2–4 weeks (typical 5–10 page site)',
  'Web Development': '2–4 weeks (typical 5–10 page site)',
  'Web Design': '1–3 weeks',
  'E-commerce Website': '3–6 weeks',
  'E-commerce': '3–6 weeks',
  'E-commerce Solutions': '3–6 weeks',
  'SEO Services': 'Ongoing monthly (initial setup 1–2 weeks)',
  'SEO Optimization': 'Ongoing monthly (initial setup 1–2 weeks)',
  'Google Ads Management': 'Setup 3–7 days, then ongoing monthly',
  'Google AdSense Management': 'Setup 3–7 days, then ongoing',
  'UX/UI Design': '1–3 weeks',
  'IT Support': 'Same day to 1 week depending on scope',
  'Web Hosting & Maintenance': 'Activation within 1–3 business days',
  'Training & Courses': 'Per course schedule',
  Other: 'To be confirmed after discovery call',
};

const PAYMENT_TERMS = [
  'Full payment is required before project work begins for most projects.',
  'Flexible payment plans may be offered for larger, higher-cost projects only, and must be agreed in writing before work starts.',
  'Accepted methods: mobile money, bank transfer, cash, Paystack (online or USSD *415*3370#), and international payments via Flutterwave/Paystack.',
  'Work will not commence until the agreed initial payment has been received and confirmed.',
  'Quotes are typically valid for 30 days unless otherwise stated.',
  'Work beyond the agreed scope will be quoted and billed separately.',
  'Monthly services (hosting, maintenance, SEO, ads) are billed in advance.',
];

function slugPart(value) {
  return (
    String(value || '')
      .replace(/[^a-zA-Z0-9]+/g, '')
      .slice(0, 6)
      .toUpperCase() || 'CLIENT'
  );
}

function createAgreementId(clientName) {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CWS-${stamp}-${slugPart(clientName)}-${rand}`;
}

function estimateTimeframe(service, requestedTimeframe) {
  if (requestedTimeframe && String(requestedTimeframe).trim()) {
    return String(requestedTimeframe).trim();
  }
  const key = Object.keys(SERVICE_TIMEFRAME_DEFAULTS).find(
    (k) => k.toLowerCase() === String(service || '').toLowerCase()
  );
  return key ? SERVICE_TIMEFRAME_DEFAULTS[key] : SERVICE_TIMEFRAME_DEFAULTS.Other;
}

function buildAgreementData(raw = {}) {
  const firstName = raw.firstName || '';
  const lastName = raw.lastName || '';
  const fullName =
    raw.clientName ||
    raw.name ||
    [firstName, lastName].filter(Boolean).join(' ').trim() ||
    'Client';

  const service = raw.service || raw.subject || 'Web Design & Development';
  const agreementId = raw.agreementId || createAgreementId(fullName);
  const createdAt = raw.createdAt || new Date().toISOString();

  return {
    agreementId,
    createdAt,
    source: raw.source || 'website-form',
    client: {
      name: fullName,
      email: raw.email || '',
      phone: raw.phone || '',
      company: raw.company || '',
      businessCategory: raw.businessCategory || '',
    },
    project: {
      service,
      budget: raw.budget || 'To be confirmed',
      timeframe: estimateTimeframe(service, raw.timeframe),
      description:
        raw.projectGoals ||
        raw.keyFeatures ||
        raw.message ||
        raw.description ||
        'As discussed in the service request form.',
    },
    paymentTerms: PAYMENT_TERMS,
    company: COMPANY,
  };
}

function agreementFilename(data) {
  const id = (data.agreementId || 'draft').replace(/[^a-zA-Z0-9-]/g, '');
  return `Celestial-Project-Agreement-${id}.pdf`;
}

module.exports = {
  COMPANY,
  TIMEFRAME_OPTIONS,
  SERVICE_TIMEFRAME_DEFAULTS,
  PAYMENT_TERMS,
  createAgreementId,
  estimateTimeframe,
  buildAgreementData,
  agreementFilename,
};
