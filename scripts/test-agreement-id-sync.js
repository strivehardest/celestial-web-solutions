/**
 * Prove email-path + download-path PDFs share the same CWS agreement id,
 * and that a missing id refuses to mint a second silent code.
 *
 * Run: node scripts/test-agreement-id-sync.js
 */
const fs = require('fs');
const path = require('path');
const {
  createAgreementId,
  isValidAgreementId,
  buildAgreementData,
} = require('../lib/agreementHelpers');
const { generateClientAgreementPdf } = require('../lib/generateClientAgreementPdf');

const OUT_DIR = '/opt/cursor/artifacts';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function extractCwsIds(buffer) {
  const text = Buffer.from(buffer).toString('latin1');
  const matches = text.match(/CWS-\d{8}-[A-Z0-9]{1,12}-[A-Z0-9]{4}/gi) || [];
  return [...new Set(matches.map((m) => m.toUpperCase()))];
}

async function main() {
  const sample = {
    firstName: 'Kofi',
    lastName: 'Mensah',
    email: 'kofi@example.com',
    phone: '+233241111111',
    company: 'Mensah Ventures',
    businessCategory: 'Retail',
    service: 'Web Design & Development',
    budget: 'GHS 5,000 – GHS 15,000',
    timeframe: '2–4 weeks',
    projectGoals: 'Launch a modern company site',
    keyFeatures: 'Contact form, gallery, blog',
    message: 'Need mobile-first design',
  };

  // --- Simulate submit: mint once (email path) ---
  const agreementId = createAgreementId(`${sample.firstName} ${sample.lastName}`);
  const createdAt = '2026-09-15T12:00:00.000Z';
  assert(isValidAgreementId(agreementId), `minted id should be valid: ${agreementId}`);

  const emailPdf = await generateClientAgreementPdf({
    ...sample,
    agreementId,
    createdAt,
    source: 'request-a-service-email',
  });
  assert(
    emailPdf.agreement.agreementId === agreementId,
    `email PDF agreement object id mismatch: ${emailPdf.agreement.agreementId} vs ${agreementId}`
  );
  const emailIds = extractCwsIds(emailPdf.buffer);
  assert(emailIds.includes(agreementId), `email PDF bytes missing ${agreementId}; found ${emailIds}`);

  // --- Simulate success-screen download payload with same id ---
  const downloadPayload = {
    ...sample,
    agreementId,
    createdAt,
    source: 'request-a-service',
  };
  const downloadPdf = await generateClientAgreementPdf(downloadPayload, {
    requireAgreementId: true,
  });
  assert(
    downloadPdf.agreement.agreementId === agreementId,
    `download PDF agreement object id mismatch: ${downloadPdf.agreement.agreementId} vs ${agreementId}`
  );
  const downloadIds = extractCwsIds(downloadPdf.buffer);
  assert(
    downloadIds.includes(agreementId),
    `download PDF bytes missing ${agreementId}; found ${downloadIds}`
  );
  assert(
    emailIds.length === 1 && downloadIds.length === 1 && emailIds[0] === downloadIds[0],
    `CWS strings differ: email=${emailIds} download=${downloadIds}`
  );

  // --- Missing id must NOT silently mint ---
  let missingThrew = false;
  let mintedAnyway = null;
  try {
    const bad = await generateClientAgreementPdf(
      { ...sample, source: 'download-without-id' },
      { requireAgreementId: true }
    );
    mintedAnyway = bad.agreement?.agreementId;
  } catch (err) {
    missingThrew = true;
    assert(
      err.code === 'MISSING_AGREEMENT_ID' || /agreementId/i.test(err.message),
      `unexpected error: ${err.message}`
    );
  }
  assert(missingThrew, `missing id should throw; silently minted ${mintedAnyway}`);

  // --- buildAgreementData allowCreate:false ---
  let buildThrew = false;
  try {
    buildAgreementData({ ...sample }, { allowCreate: false });
  } catch (err) {
    buildThrew = true;
    assert(err.code === 'MISSING_AGREEMENT_ID', `expected MISSING_AGREEMENT_ID, got ${err.code}`);
  }
  assert(buildThrew, 'buildAgreementData(allowCreate:false) should throw without id');

  // --- Old 6-char slug still validates ---
  assert(
    isValidAgreementId('CWS-20260910-KOFIME-ABCD'),
    '6-char slug ids from older builds must remain valid'
  );
  assert(
    isValidAgreementId('CWS-20260915-KOFI-WXYZ'),
    '4-char slug ids from current builds must remain valid'
  );

  // Write artifacts
  try {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(path.join(OUT_DIR, `agreement_id_sync_email_${agreementId}.pdf`), emailPdf.buffer);
    fs.writeFileSync(
      path.join(OUT_DIR, `agreement_id_sync_download_${agreementId}.pdf`),
      downloadPdf.buffer
    );
    fs.writeFileSync(
      path.join(OUT_DIR, 'agreement_id_sync_proof.json'),
      JSON.stringify(
        {
          agreementId,
          emailIds,
          downloadIds,
          identicalCwsString: emailIds[0] === downloadIds[0],
          missingIdRefused: true,
          accepts4And6CharSlugs: true,
        },
        null,
        2
      )
    );
  } catch (err) {
    console.warn('Could not write artifacts:', err.message);
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        agreementId,
        emailIds,
        downloadIds,
        identicalCwsString: true,
        missingIdRefused: true,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error('FAIL:', err);
  process.exit(1);
});
