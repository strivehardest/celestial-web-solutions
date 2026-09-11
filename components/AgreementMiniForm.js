import { useState } from 'react';
import AgreementDownloadButton from './AgreementDownloadButton';

const SERVICE_OPTIONS = [
  'Web Design & Development',
  'E-commerce Website',
  'SEO Services',
  'Google Ads Management',
  'UX/UI Design',
  'IT Support',
  'Web Hosting & Maintenance',
  'Training & Courses',
  'Other',
];

const TIMEFRAME_OPTIONS = [
  'ASAP (rush — may include surcharge)',
  '1–2 weeks',
  '2–4 weeks',
  '1–2 months',
  '3+ months',
  'Flexible / to be confirmed',
];

/**
 * Compact project-agreement form for Celestial AI chat replies.
 * Renders when the assistant emits [[agreement]].
 */
export default function AgreementMiniForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Design & Development',
    timeframe: '',
    budget: '',
    message: '',
  });
  const [snapshot, setSnapshot] = useState(null);

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setSnapshot(null);
  };

  const ready =
    form.name.trim().length >= 2 && form.service.trim().length >= 2;

  const handlePrepare = (e) => {
    e.preventDefault();
    if (!ready) return;
    setSnapshot({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: form.service.trim(),
      timeframe: form.timeframe.trim(),
      budget: form.budget.trim() || 'To be confirmed',
      message: form.message.trim() || 'Requested via Celestial AI chat.',
      source: 'celestial-ai',
    });
  };

  const fieldClass =
    'w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white';
  const labelClass =
    'mb-1 block text-xs font-medium text-stone-600 dark:text-stone-300';

  return (
    <div className="mt-2 rounded-2xl border border-orange-200/80 bg-orange-50/60 p-4 dark:border-orange-400/25 dark:bg-orange-500/10">
      <p
        className="mb-3 text-sm font-semibold text-stone-900 dark:text-white"
        style={{ fontFamily: 'Albert Sans, sans-serif' }}
      >
        Download your Celestial project agreement
      </p>
      <p
        className="mb-4 text-xs leading-relaxed text-stone-600 dark:text-stone-300"
        style={{ fontFamily: 'Albert Sans, sans-serif' }}
      >
        Enter a few details and we will generate a branded PDF with timeframe estimates,
        payment terms, and signature lines.
      </p>

      <form onSubmit={handlePrepare} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="ai-ag-name">
              Full name *
            </label>
            <input
              id="ai-ag-name"
              required
              value={form.name}
              onChange={update('name')}
              className={fieldClass}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="ai-ag-service">
              Service *
            </label>
            <select
              id="ai-ag-service"
              value={form.service}
              onChange={update('service')}
              className={fieldClass}
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="ai-ag-email">
              Email
            </label>
            <input
              id="ai-ag-email"
              type="email"
              value={form.email}
              onChange={update('email')}
              className={fieldClass}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="ai-ag-phone">
              Phone / WhatsApp
            </label>
            <input
              id="ai-ag-phone"
              value={form.phone}
              onChange={update('phone')}
              className={fieldClass}
              placeholder="+233…"
              autoComplete="tel"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="ai-ag-timeframe">
              Target timeframe
            </label>
            <select
              id="ai-ag-timeframe"
              value={form.timeframe}
              onChange={update('timeframe')}
              className={fieldClass}
            >
              <option value="">Typical for this service</option>
              {TIMEFRAME_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="ai-ag-budget">
              Budget (optional)
            </label>
            <input
              id="ai-ag-budget"
              value={form.budget}
              onChange={update('budget')}
              className={fieldClass}
              placeholder="e.g. GH₵5,000"
            />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="ai-ag-message">
            Project notes
          </label>
          <textarea
            id="ai-ag-message"
            rows={3}
            value={form.message}
            onChange={update('message')}
            className={`${fieldClass} resize-y`}
            placeholder="Briefly describe what you need"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={!ready}
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
            style={{ fontFamily: 'Albert Sans, sans-serif' }}
          >
            Prepare agreement
          </button>
          {snapshot ? (
            <AgreementDownloadButton
              agreementData={snapshot}
              className="!shadow-none"
              label="Download project agreement (PDF)"
            />
          ) : null}
        </div>
      </form>
    </div>
  );
}
