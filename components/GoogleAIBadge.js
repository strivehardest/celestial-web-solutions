import { useState } from "react";
import Image from "next/image";

/**
 * GoogleAIBadge
 * -------------
 * Drop this anywhere inside your testimonials / reviews section.
 *
 * SETUP:
 *  1. Copy your two screenshots into /public/recognition/
 *     and name them:
 *       google-ai-1.png   (full list screenshot)
 *       google-ai-2.png   (Celestial close-up screenshot)
 *  2. Import & render <GoogleAIBadge /> wherever you want it.
 */

const SCREENSHOTS = [
  {
    src: "/recognition/google-ai-1.png",
    alt: "Google AI Mode showing Top 10 Web Designers in Accra",
    caption: "Google AI Mode – Top 10 Web Designers in Accra (2026)",
  },
  {
    src: "/recognition/google-ai-2.png",
    alt: "Celestial Web Solutions listed in Google AI top 10",
    caption: "Celestial Web Solutions – 4.9★ · Featured by Google AI",
  },
];

export default function GoogleAIBadge() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const openModal = (idx = 0) => {
    setActive(idx);
    setOpen(true);
  };

  return (
    <>
      {/* ── Badge Card ─────────────────────────────────────────── */}
      <button
        onClick={() => openModal(0)}
        aria-label="View Google AI recognition screenshot"
        className="group relative w-full text-left rounded-2xl border border-blue-200 dark:border-blue-900 bg-gradient-to-br from-white to-blue-50 dark:from-[#0d1117] dark:to-[#0d1f3c] shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer overflow-hidden"
      >
        {/* Decorative glow blob */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-3xl group-hover:scale-125 transition-transform duration-500"
        />

        {/* Google G icon + label */}
        <div className="flex items-center gap-3 mb-4">
          {/* Minimal Google "G" */}
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-[#161b22] shadow-sm border border-gray-100 dark:border-gray-800 shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </span>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Google AI Mode · 2026
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">
              Verified · Accra, Ghana
            </p>
          </div>

          {/* "View proof" pill — right side */}
          <span className="ml-auto flex items-center gap-1.5 text-[11px] font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full px-3 py-1 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-colors duration-200 whitespace-nowrap">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              <path
                fillRule="evenodd"
                d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41Z"
                clipRule="evenodd"
              />
            </svg>
            View proof
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-1">
          Featured in Google AI — Top 10 Web Designers in Accra
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Google&apos;s AI Mode independently ranked Celestial Web Solutions
          among the top 10 web design agencies in Accra, citing our expertise
          in conversion-focused websites and SEO-optimised solutions.
        </p>

        {/* Stars + rating */}
        <div className="flex items-center gap-2 mt-4">
          <span className="flex gap-0.5" aria-label="4.9 out of 5 stars">
            {[1, 2, 3, 4].map((i) => (
              <svg
                key={i}
                viewBox="0 0 20 20"
                fill="#FBBF24"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
              </svg>
            ))}
            {/* Half star */}
            <svg viewBox="0 0 20 20" className="w-4 h-4" aria-hidden="true">
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="#FBBF24" />
                  <stop offset="50%" stopColor="#D1D5DB" />
                </linearGradient>
              </defs>
              <path
                fill="url(#half)"
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"
              />
            </svg>
          </span>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            4.9
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            · 20 Google reviews
          </span>
        </div>
      </button>

      {/* ── Lightbox Modal ─────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Google AI recognition screenshot"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-white dark:bg-[#0d1117] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Google AI Mode — Featured Agency (2026)
              </p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>

            {/* Screenshot */}
            <div className="relative w-full bg-gray-50 dark:bg-[#161b22]">
              <Image
                src={SCREENSHOTS[active].src}
                alt={SCREENSHOTS[active].alt}
                width={800}
                height={500}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Caption + arrow switcher */}
            <div className="px-5 py-4 flex items-center justify-between gap-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {SCREENSHOTS[active].caption}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActive((active - 1 + SCREENSHOTS.length) % SCREENSHOTS.length)}
                  aria-label="Previous screenshot"
                  className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 0 1-.02 1.06L8.832 10l3.938 3.71a.75.75 0 1 1-1.04 1.08l-4.5-4.25a.75.75 0 0 1 0-1.08l4.5-4.25a.75.75 0 0 1 1.06.02Z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="text-xs tabular-nums text-gray-400 dark:text-gray-500">
                  {active + 1} / {SCREENSHOTS.length}
                </span>
                <button
                  onClick={() => setActive((active + 1) % SCREENSHOTS.length)}
                  aria-label="Next screenshot"
                  className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}