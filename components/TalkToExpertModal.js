import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// Cloudflare Turnstile site key (public, exposed to browser)
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

const TalkToExpertModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    businessCategory: '',
    service: '',
    budget: '',
    message: '',
  });
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Render Cloudflare Turnstile when modal opens
  useEffect(() => {
    if (!isOpen) {
      // Cleanup widget when modal closes
      if (turnstileWidgetId.current !== null && window.turnstile) {
        try { window.turnstile.remove(turnstileWidgetId.current); } catch (e) {}
        turnstileWidgetId.current = null;
      }
      setTurnstileToken(null);
      return;
    }

    const renderWidget = () => {
      if (!turnstileRef.current || !window.turnstile) return;
      // Remove any existing widget first
      if (turnstileWidgetId.current !== null) {
        try { window.turnstile.remove(turnstileWidgetId.current); } catch (e) {}
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

    // Wait briefly for DOM to be ready, then render
    const timer = setTimeout(() => {
      if (window.turnstile) {
        renderWidget();
      } else {
        // If script hasn't loaded yet, wait for it
        const check = setInterval(() => {
          if (window.turnstile) {
            clearInterval(check);
            renderWidget();
          }
        }, 200);
        // Stop checking after 10s
        setTimeout(() => clearInterval(check), 10000);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [isOpen, submitStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        setSubmitStatus('success');
        setFormData({
          firstName: '', lastName: '', email: '', phone: '',
          company: '', service: '', budget: '', message: '',
        });
        setTurnstileToken(null);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const inputClass =
    "w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all duration-200";
  const labelClass =
    "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="px-6 pt-7 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h2
                    className="text-xl font-bold text-gray-900 dark:text-white"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                  >
                    Let&apos;s do our best work together
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                How can we help? Fill out the form below and we&apos;ll reach out.
              </p>
            </div>

            {/* Success State */}
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-12 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3
                  className="text-lg font-bold text-gray-900 dark:text-white mb-2"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                >
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitStatus(null); onClose(); }}
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200"
                  style={{ fontFamily: 'Albert Sans, sans-serif' }}
                >
                  Close
                </button>
              </motion.div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

                {/* Required fields note */}
                <div className="flex justify-end">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    Required fields<span className="text-red-500 ml-0.5">*</span>
                  </span>
                </div>

                {/* Name Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className={labelClass} style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Kofi"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass} style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Mensah"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass} style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                    Work email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={labelClass} style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="+233 53 050 5031"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className={labelClass} style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                    Business Name / Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Your company name"
                  />
                </div>

                {/* Business Category */}
                <div>
                  <label htmlFor="businessCategory" className={labelClass} style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                    Business Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="businessCategory"
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    required
                    className={`${inputClass} appearance-none cursor-pointer`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    <option value="">Select...</option>
                    {businessCategoryOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Service Interest */}
                <div>
                  <label htmlFor="service" className={labelClass} style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                    I&apos;m interested in <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className={`${inputClass} appearance-none cursor-pointer`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    <option value="">Select...</option>
                    {serviceOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className={labelClass} style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                    Budget range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    <option value="">Select...</option>
                    {budgetOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClass} style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="Briefly describe what you need..."
                  />
                </div>

                {/* Cloudflare Turnstile CAPTCHA */}
                <div className="flex justify-center">
                  <div ref={turnstileRef} />
                </div>

                {/* Error message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                  >
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-sm text-red-600 dark:text-red-400">Something went wrong. Please try again.</span>
                  </motion.div>
                )}

                {/* Submit */}
                <div className="pt-2 pb-1">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !turnstileToken}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                    whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Privacy note */}
                <p className="text-center text-xs text-gray-400 dark:text-gray-500 pb-2">
                  By submitting, you agree to our{' '}
                  <a href="/privacy" className="text-orange-500 hover:text-orange-600 underline underline-offset-2">Privacy Policy</a>.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TalkToExpertModal;
