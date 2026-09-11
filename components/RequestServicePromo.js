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
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-labelledby="request-service-promo-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-orange-200/70 bg-white shadow-2xl dark:border-orange-900/40 dark:bg-gray-950"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="px-6 pb-6 pt-5">
              <p
                className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                Ready when you are
              </p>
              <h2
                id="request-service-promo-title"
                className="mt-2 text-2xl font-bold text-gray-950 dark:text-white"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Request a Service
              </h2>
              <p
                className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                Tell us about your goals, budget, timeframe, and what you need before work begins — on a full page with room to write.
              </p>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <Link
                  href="/request-a-service"
                  onClick={onClose}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                  style={{ fontFamily: 'Albert Sans, sans-serif' }}
                >
                  Open full form
                  <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-900"
                  style={{ fontFamily: 'Albert Sans, sans-serif' }}
                >
                  Not now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
