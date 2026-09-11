import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';

/**
 * Session promo that points visitors to the full Request a Service page.
 */
export default function RequestServicePromo({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Dismiss"
            className="absolute inset-0 bg-stone-950/50"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-labelledby="request-service-promo-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-xl border border-stone-200 bg-white shadow-[0_24px_60px_-28px_rgba(28,25,23,0.55)] dark:border-stone-800 dark:bg-stone-950"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-800 dark:hover:bg-stone-900 dark:hover:text-stone-200"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="border-b border-stone-200 px-6 py-5 dark:border-stone-800">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                Celestial Web Solutions
              </p>
              <h2
                id="request-service-promo-title"
                className="mt-2 pr-8 text-2xl font-bold tracking-tight text-stone-950 dark:text-white"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Request a Service
              </h2>
            </div>

            <div className="px-6 py-5">
              <p
                className="text-sm leading-relaxed text-stone-600 dark:text-stone-300"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                Share your project goals, features, budget, and timeframe on our full intake form so we can prepare an accurate next step.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <Link
                  href="/request-a-service"
                  onClick={onClose}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
                  style={{ fontFamily: 'Albert Sans, sans-serif' }}
                >
                  Continue to form
                  <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-lg border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-900"
                  style={{ fontFamily: 'Albert Sans, sans-serif' }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
