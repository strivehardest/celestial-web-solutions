import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import VscodeLineField from '../components/VscodeLineField';
import AgreementDownloadButton from '../components/AgreementDownloadButton';
import PremiumCTA from '../components/PremiumCTA';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  businessCategory: '',
  websiteUrl: '',
  city: '',
  service: '',
  projectGoals: '',
  targetAudience: '',
  keyFeatures: '',
  hasExistingBrand: '',
  contentReady: '',
  budget: '',
  timeframe: '',
  preferredContact: '',
  howDidYouHear: '',
  message: '',
};

const businessCategoryOptions = [
  'Technology',
  'Retail',
  'Healthcare',
  'Education',
  'Finance',
  'Real Estate',
  'Hospitality',
  'Manufacturing',
  'Non-Profit',
  'Other',
];

const serviceOptions = [
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

const budgetOptions = [
  'Under GHS 2,000',
  'GHS 2,000 – GHS 5,000',
  'GHS 5,000 – GHS 15,000',
  'GHS 15,000+',
  'Not sure yet',
];

const timeframeOptions = [
  'ASAP (rush — may include surcharge)',
  '1–2 weeks',
  '2–4 weeks',
  '1–2 months',
  '3+ months',
  'Flexible / to be confirmed',
];

export default function RequestAServicePage() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [agreementSnapshot, setAgreementSnapshot] = useState(null);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) {
      console.error('[Turnstile] NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set.');
      return undefined;
    }

    const renderWidget = () => {
      if (!turnstileRef.current || !window.turnstile) return;
      if (turnstileWidgetId.current !== null) {
        try {
          window.turnstile.remove(turnstileWidgetId.current);
        } catch (e) {
          /* ignore */
        }
      }
      turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(null),
        'error-callback': () => setTurnstileToken(null),
        theme: 'auto',
        size: 'normal',
      });
    };

    const timer = setTimeout(() => {
      if (window.turnstile) {
        renderWidget();
      } else {
        const check = setInterval(() => {
          if (window.turnstile) {
            clearInterval(check);
            renderWidget();
          }
        }, 200);
        setTimeout(() => clearInterval(check), 10000);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      if (turnstileWidgetId.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(turnstileWidgetId.current);
        } catch (e) {
          /* ignore */
        }
        turnstileWidgetId.current = null;
      }
    };
  }, [submitStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!turnstileToken) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/talk-to-expert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      if (response.ok) {
        setAgreementSnapshot({
          ...formData,
          source: 'request-a-service',
        });
        setSubmitStatus('success');
        setFormData(INITIAL_FORM);
        setTurnstileToken(null);
        setTimeout(() => {
          successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Request a Service | Web Design &amp; Development Brief | Celestial Web Solutions</title>
        <meta
          name="description"
          content="Request a website, ecommerce, SEO, or design project from Celestial Web Solutions in Ghana. Share goals, features, budget, and timeframe so work can begin with the right brief."
        />
        <meta
          name="keywords"
          content="request web design Ghana, website quote Ghana, hire web developer Accra, ecommerce website Ghana, Celestial Web Solutions service request, web design brief"
        />
        <meta name="author" content="Celestial Web Solutions" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://www.celestialwebsolutions.net/request-a-service" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Celestial Web Solutions" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Request a Service | Celestial Web Solutions" />
        <meta
          property="og:description"
          content="Share your project goals, budget, and timeframe. Celestial Web Solutions will reply within 24 hours with next steps."
        />
        <meta property="og:url" content="https://www.celestialwebsolutions.net/request-a-service" />
        <meta property="og:image" content="https://www.celestialwebsolutions.net/og-image.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@strivehardest" />
        <meta name="twitter:title" content="Request a Service | Celestial Web Solutions" />
        <meta
          name="twitter:description"
          content="Submit a full project brief for web design, ecommerce, SEO, or digital services in Ghana."
        />
        <meta name="twitter:image" content="https://www.celestialwebsolutions.net/og-image.jpg" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebPage',
                  '@id': 'https://www.celestialwebsolutions.net/request-a-service#webpage',
                  url: 'https://www.celestialwebsolutions.net/request-a-service',
                  name: 'Request a Service | Celestial Web Solutions',
                  description:
                    'Submit a project brief for web design, development, ecommerce, SEO, or digital services with Celestial Web Solutions in Ghana.',
                  isPartOf: {
                    '@type': 'WebSite',
                    name: 'Celestial Web Solutions',
                    url: 'https://www.celestialwebsolutions.net',
                  },
                  about: {
                    '@type': 'Organization',
                    name: 'Celestial Web Solutions',
                    url: 'https://www.celestialwebsolutions.net',
                    email: 'info@celestialwebsolutions.net',
                    telephone: '+233245671832',
                  },
                },
                {
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Home',
                      item: 'https://www.celestialwebsolutions.net/',
                    },
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: 'Request a Service',
                      item: 'https://www.celestialwebsolutions.net/request-a-service',
                    },
                  ],
                },
                {
                  '@type': 'ContactPage',
                  name: 'Request a Service',
                  url: 'https://www.celestialwebsolutions.net/request-a-service',
                  description:
                    'Project intake form for Celestial Web Solutions clients who want to start a website or digital service.',
                },
              ],
            }),
          }}
        />
      </Head>

      <main className="min-h-screen bg-stone-50 dark:bg-gray-950">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2400&q=80"
              alt="Celestial Web Solutions team discussing a client project brief"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-950/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-700/75 via-orange-600/55 to-stone-950/40" />
          </div>

          <div className="relative mx-auto flex min-h-[420px] max-w-5xl flex-col justify-end px-4 pb-14 pt-32 sm:min-h-[480px] sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-100"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                Celestial Web Solutions
              </p>
              <h1
                className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Request a Service
              </h1>
              <p
                className="mt-4 max-w-2xl text-lg leading-relaxed text-orange-50/95"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                Share the details we need before work begins — goals, audience, features, budget, and timeframe.
              </p>
              <a
                href="#project-brief"
                className="mt-7 inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-orange-50"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                Start your brief
              </a>
            </motion.div>
          </div>
        </section>

        <section id="project-brief" className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          {submitStatus === 'success' ? (
            <motion.div
              ref={successRef}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-orange-200 bg-white p-8 text-center shadow-sm dark:border-orange-900/40 dark:bg-gray-950 sm:p-12"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2
                className="text-2xl font-bold text-stone-950 dark:text-white"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Request sent successfully
              </h2>
              <p
                className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-600 dark:text-stone-300"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                A confirmation email is on its way to you, and our team at Celestial Web Solutions has been notified.
                We&apos;ll reply within 24 hours.
              </p>
              <p
                className="mx-auto mt-4 max-w-xl text-xs text-stone-500 dark:text-stone-400"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                Download your Celestial project agreement PDF with your request details, estimated timeframe, and payment terms.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3">
                <AgreementDownloadButton agreementData={agreementSnapshot} />
                <button
                  type="button"
                  onClick={() => {
                    setSubmitStatus(null);
                    setAgreementSnapshot(null);
                  }}
                  className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-900"
                  style={{ fontFamily: 'Albert Sans, sans-serif' }}
                >
                  Submit another request
                </button>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400"
                  style={{ fontFamily: 'Albert Sans, sans-serif' }}
                >
                  Or send a quick contact message
                </Link>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white/90 shadow-[0_20px_60px_-30px_rgba(28,25,23,0.35)] backdrop-blur dark:border-white/10 dark:bg-gray-950/90"
            >
              <div className="border-b border-stone-200 px-6 py-5 dark:border-white/10 sm:px-8">
                <h2
                  className="text-xl font-bold text-stone-950 dark:text-white"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                >
                  Project brief
                </h2>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                  Required fields are marked <span className="text-orange-500">*</span>
                </p>
              </div>

              <div className="space-y-10 px-6 py-8 sm:px-8">
                <section className="space-y-6">
                  <h3
                    className="text-sm font-semibold uppercase tracking-[0.14em] text-orange-600 dark:text-orange-400"
                    style={{ fontFamily: 'Albert Sans, sans-serif' }}
                  >
                    1 · Contact
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <VscodeLineField id="firstName" name="firstName" label="First name" required value={formData.firstName} onChange={handleChange} placeholder="Kofi" />
                    <VscodeLineField id="lastName" name="lastName" label="Last name" required value={formData.lastName} onChange={handleChange} placeholder="Mensah" />
                    <VscodeLineField id="email" name="email" type="email" label="Work email" required value={formData.email} onChange={handleChange} placeholder="you@company.com" />
                    <VscodeLineField id="phone" name="phone" type="tel" label="Phone / WhatsApp" required value={formData.phone} onChange={handleChange} placeholder="+233 24 567 1832" />
                    <VscodeLineField id="company" name="company" label="Business / company" required value={formData.company} onChange={handleChange} placeholder="Your company name" />
                    <VscodeLineField id="jobTitle" name="jobTitle" label="Your role" value={formData.jobTitle} onChange={handleChange} placeholder="Owner, Marketing lead…" />
                  </div>
                </section>

                <section className="space-y-6">
                  <h3
                    className="text-sm font-semibold uppercase tracking-[0.14em] text-orange-600 dark:text-orange-400"
                    style={{ fontFamily: 'Albert Sans, sans-serif' }}
                  >
                    2 · Business context
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <VscodeLineField as="select" id="businessCategory" name="businessCategory" label="Business category" required value={formData.businessCategory} onChange={handleChange}>
                      <option value="">Select category</option>
                      {businessCategoryOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </VscodeLineField>
                    <VscodeLineField id="city" name="city" label="City / region" value={formData.city} onChange={handleChange} placeholder="Accra, Keta…" />
                    <VscodeLineField
                      id="websiteUrl"
                      name="websiteUrl"
                      type="url"
                      label="Current website"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      placeholder="https://"
                      hint="Optional — leave blank if you need a new site."
                      className="sm:col-span-2"
                    />
                  </div>
                </section>

                <section className="space-y-6">
                  <h3
                    className="text-sm font-semibold uppercase tracking-[0.14em] text-orange-600 dark:text-orange-400"
                    style={{ fontFamily: 'Albert Sans, sans-serif' }}
                  >
                    3 · What you need
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <VscodeLineField as="select" id="service" name="service" label="Service needed" required value={formData.service} onChange={handleChange} className="sm:col-span-2">
                      <option value="">Select a service</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </VscodeLineField>
                    <VscodeLineField
                      as="textarea"
                      id="projectGoals"
                      name="projectGoals"
                      label="Project goals"
                      required
                      rows={4}
                      value={formData.projectGoals}
                      onChange={handleChange}
                      placeholder="What should this project achieve for your business?"
                      className="sm:col-span-2"
                    />
                    <VscodeLineField
                      as="textarea"
                      id="targetAudience"
                      name="targetAudience"
                      label="Target audience"
                      rows={3}
                      value={formData.targetAudience}
                      onChange={handleChange}
                      placeholder="Who should this site or campaign reach?"
                      className="sm:col-span-2"
                    />
                    <VscodeLineField
                      as="textarea"
                      id="keyFeatures"
                      name="keyFeatures"
                      label="Must-have features / pages"
                      required
                      rows={4}
                      value={formData.keyFeatures}
                      onChange={handleChange}
                      placeholder="e.g. online store, bookings, blog, payment, admin dashboard…"
                      className="sm:col-span-2"
                    />
                    <VscodeLineField as="select" id="hasExistingBrand" name="hasExistingBrand" label="Do you have brand assets?" value={formData.hasExistingBrand} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="Yes — logo, colors, fonts ready">Yes — logo, colors, fonts ready</option>
                      <option value="Partial — some assets only">Partial — some assets only</option>
                      <option value="No — need branding help">No — need branding help</option>
                    </VscodeLineField>
                    <VscodeLineField as="select" id="contentReady" name="contentReady" label="Is your content ready?" value={formData.contentReady} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="Yes — copy and images ready">Yes — copy and images ready</option>
                      <option value="Partial — some content ready">Partial — some content ready</option>
                      <option value="No — need content support">No — need content support</option>
                    </VscodeLineField>
                  </div>
                </section>

                <section className="space-y-6">
                  <h3
                    className="text-sm font-semibold uppercase tracking-[0.14em] text-orange-600 dark:text-orange-400"
                    style={{ fontFamily: 'Albert Sans, sans-serif' }}
                  >
                    4 · Timeline & budget
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <VscodeLineField as="select" id="budget" name="budget" label="Budget range" required value={formData.budget} onChange={handleChange}>
                      <option value="">Select budget</option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </VscodeLineField>
                    <VscodeLineField as="select" id="timeframe" name="timeframe" label="Preferred timeframe" required value={formData.timeframe} onChange={handleChange}>
                      <option value="">Select timeframe</option>
                      {timeframeOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </VscodeLineField>
                    <VscodeLineField as="select" id="preferredContact" name="preferredContact" label="Preferred contact method" required value={formData.preferredContact} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="Email">Email</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Phone call">Phone call</option>
                    </VscodeLineField>
                    <VscodeLineField as="select" id="howDidYouHear" name="howDidYouHear" label="How did you hear about us?" value={formData.howDidYouHear} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="Google search">Google search</option>
                      <option value="Referral">Referral</option>
                      <option value="Social media">Social media</option>
                      <option value="Celestial AI">Celestial AI</option>
                      <option value="Other">Other</option>
                    </VscodeLineField>
                    <VscodeLineField
                      as="textarea"
                      id="message"
                      name="message"
                      label="Anything else we should know?"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Competitors to reference, constraints, examples you like…"
                      className="sm:col-span-2"
                    />
                  </div>
                </section>

                <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600 dark:border-white/10 dark:bg-white/5 dark:text-stone-300" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                  Most projects require <strong className="text-stone-900 dark:text-white">full payment before work begins</strong>.
                  Pay with Paystack USSD <span className="font-semibold text-orange-600">*415*3370#</span> or ask us for a payment link.
                </div>

                <div className="flex justify-center">
                  <div ref={turnstileRef} />
                </div>

                {submitStatus === 'error' && (
                  <div
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200"
                    style={{ fontFamily: 'Albert Sans, sans-serif' }}
                    role="alert"
                  >
                    We couldn&apos;t send your request. Complete the CAPTCHA and try again, or WhatsApp +233 53 050 5031.
                  </div>
                )}

                <PremiumCTA
                  type="submit"
                  size="large"
                  variant="primary"
                  icon
                  className="w-full"
                  disabled={isSubmitting || !turnstileToken}
                >
                  {isSubmitting ? 'Sending request…' : 'Submit service request'}
                </PremiumCTA>
              </div>
            </form>
          )}
        </section>
      </main>
    </>
  );
}
