// ─────────────────────────────────────────────────────────────────────────────
// TestimonialsSection.jsx
// Drop-in replacement — dark/light mode via Tailwind dark: classes
// Real avatar images with initials fallback.
// Usage: import TestimonialsSection from '../components/TestimonialsSection'
//        then <TestimonialsSection /> where the old testimonials section was.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: "Rev. Frank Ntow Gyan",
    company: "Building Planner Designs Limited",
    role: "CEO",
    text: "Working with Celestial Web Solutions was incredible! They transformed our outdated website into a modern, user-friendly platform. Our online sales have increased by 200% since the launch.",
    rating: 5,
    image: "/testimonials/frank.jpg",
    initials: "FG",
  },
  {
    name: "Righteous Semahar",
    company: "RAK Foundation",
    role: "CEO",
    text: "Expertise in Web Development, their services are excellent. They built exactly what we envisioned and delivered on time. The team is professional, communicative, and genuinely cares about results.",
    rating: 5,
    image: "/testimonials/righteous.jpg",
    initials: "RS",
  },
  {
    name: "Elolo Agbleke",
    company: "Keta Institute of Technology",
    role: "Program Manager, COO",
    text: "Great design concepts, always available for quick design changes, open to collaboration and customer-focused. Vast experience easily shows in their output. Good prices as well.",
    rating: 5,
    image: "/testimonials/elolo.jpg",
    initials: "EA",
  },
  {
    name: "Akari Kev",
    company: "Ghana",
    role: "Client",
    text: "Celestial Web Solutions was professional, responsive, and easy to work with. They understood my requirements clearly and delivered quality work on time. Communication was smooth, and any feedback was handled quickly. I'd definitely recommend them.",
    rating: 5,
    image: null,
    initials: "AK",
    badge: "Trustpilot",
  },
  {
    name: "Paul Dickens Doe",
    company: "My Space Furniture",
    role: "Client",
    text: "Celestial Web Solutions team did a great job on our websites. They always finish each project in record time. Their continuous tech support and updating of pages is just excellent. Highly recommended.",
    rating: 5,
    image: null,
    initials: "PD",
    badge: "Trustpilot",
  },
];

// ── Avatar component ──────────────────────────────────────────────────────────
// Shows real photo if available, falls back gracefully to initials circle
function Avatar({ src, initials, name }) {
  const [imgError, setImgError] = useState(false);

  if (src && !imgError) {
    return (
      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-orange-500/50 shadow-md">
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 ring-2 ring-orange-500/40 shadow-md"
      style={{
        background: 'linear-gradient(135deg, #f97316, #dc2626)',
        fontFamily: 'Bricolage Grotesque, sans-serif',
      }}
    >
      {initials}
    </div>
  );
}

// ── Typing effect hook ────────────────────────────────────────────────────────
function useTypingEffect(text, isActive) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayed('');
      setDone(false);
      return;
    }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 22);
    return () => clearInterval(id);
  }, [text, isActive]);

  return { displayed, done };
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [typing, setTyping] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const DURATION = 7000; // ms to wait after typing before auto-advancing

  const total = testimonials.length;
  const t = testimonials[current];
  const { displayed, done } = useTypingEffect(t.text, typing);

  // Auto-advance with progress bar after typing finishes
  useEffect(() => {
    if (!done) return;
    setProgress(0);
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
      if (elapsed < DURATION) {
        progressRef.current = requestAnimationFrame(tick);
      } else {
        goNext();
      }
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [done, current]);

  const goTo = (idx) => {
    cancelAnimationFrame(progressRef.current);
    setProgress(0);
    setTyping(false);
    setTimeout(() => {
      setCurrent(idx);
      setTyping(true);
    }, 50);
  };

  const goPrev = () => goTo((current - 1 + total) % total);
  const goNext = () => goTo((current + 1) % total);

  return (
    /*
      LIGHT: soft gray-50 background, dark text
      DARK:  deep navy #0f1729 background, light text
      Both respond automatically to ThemeToggle's `dark` class on <html>
    */
    <section className="relative py-24 overflow-hidden bg-gray-50 dark:bg-[#0f1729] transition-colors duration-300">

      {/* Noise texture — only visible in dark mode */}
      <div
        className="absolute inset-0 opacity-0 dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/5 dark:bg-orange-600/10 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/4" />

      {/* Giant decorative quote marks — top right like Stack Overflow */}
      <div
        className="absolute top-0 right-0 select-none pointer-events-none
                   text-gray-200 dark:text-white/[0.04] transition-colors duration-300"
        aria-hidden="true"
        style={{
          fontSize: 'clamp(180px, 20vw, 320px)',
          lineHeight: 1,
          fontFamily: 'Georgia, serif',
          transform: 'translate(5%, -15%)',
          letterSpacing: '-0.05em',
        }}
      >
        &#8220;&#8221;
      </div>

      {/* Section label */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <span
          className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors duration-300"
          style={{ fontFamily: 'Google Sans, sans-serif' }}
        >
          What our clients say
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center min-h-[280px]"
          >

            {/* ── LEFT: Quote text ── */}
            <div className="lg:col-span-3">
              {/* Decorative small quote */}
              <span
                className="block text-orange-500 mb-4 select-none"
                style={{ fontSize: '3.5rem', fontFamily: 'Georgia, serif', lineHeight: 1 }}
                aria-hidden="true"
              >
                &#8220;&#8221;
              </span>

              <p
                className="text-gray-800 dark:text-white font-medium leading-relaxed min-h-[140px] transition-colors duration-300"
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)',
                }}
              >
                {displayed}
                {/* blinking cursor while text is typing */}
                {!done && (
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      width: '2px',
                      height: '1.15em',
                      background: '#f97316',
                      marginLeft: '3px',
                      verticalAlign: 'text-bottom',
                      animation: 'blink 0.7s step-end infinite',
                    }}
                  />
                )}
              </p>
            </div>

            {/* ── RIGHT: Author card ── */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Avatar + name block */}
              <div className="flex items-center gap-4">
                <Avatar src={t.image} initials={t.initials} name={t.name} />
                <div>
                  <p
                    className="text-orange-500 dark:text-orange-400 font-bold text-lg uppercase tracking-wide transition-colors duration-300"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider transition-colors duration-300"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>

              {/* Company — left-bordered */}
              <div className="border-l-2 border-orange-500/50 pl-4">
                <p
                  className="text-gray-600 dark:text-gray-300 text-sm font-medium transition-colors duration-300"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  {t.company}
                </p>
              </div>

              {/* Star rating */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                  </svg>
                ))}
              </div>

              {/* Trustpilot badge */}
              {t.badge === 'Trustpilot' && (
                <div className="inline-flex items-center gap-2 bg-[#00b67a] px-3 py-2 rounded w-fit">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1.5l3.27 6.6 7.23 1.05-5.25 5.1 1.24 7.23-6.49-3.42-6.49 3.42 1.24-7.23-5.25-5.1 7.23-1.05z" />
                  </svg>
                  <span className="text-white text-sm font-bold">Trustpilot</span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom controls (Stack Overflow style) ── */}
        <div className="mt-12 flex items-center gap-4 flex-wrap">

          {/* ← Prev */}
          <button
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border
                       border-gray-300 dark:border-white/20
                       text-gray-600 dark:text-white
                       hover:border-orange-500 hover:text-orange-500
                       dark:hover:border-orange-500 dark:hover:text-orange-400
                       flex items-center justify-center transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* → Next */}
          <button
            onClick={goNext}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full border
                       border-gray-300 dark:border-white/20
                       text-gray-600 dark:text-white
                       hover:border-orange-500 hover:text-orange-500
                       dark:hover:border-orange-500 dark:hover:text-orange-400
                       flex items-center justify-center transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* "1 / 5" counter */}
          <span
            className="text-gray-700 dark:text-white font-semibold text-base tabular-nums transition-colors duration-300"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif', minWidth: '3rem' }}
          >
            {current + 1} / {total}
          </span>

          {/* Progress bar */}
          <div className="h-[3px] rounded-full overflow-hidden w-32 sm:w-48 bg-gray-200 dark:bg-white/10 transition-colors duration-300">
            <div
              className="h-full bg-orange-500 rounded-full"
              style={{ width: `${done ? progress : 0}%`, transition: 'none' }}
            />
          </div>

          {/* Dot indicators */}
          <div className="flex gap-2 ml-auto">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-5 h-2 bg-orange-500'
                    : 'w-2 h-2 bg-gray-300 dark:bg-white/20 hover:bg-orange-300 dark:hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Blink keyframe for typing cursor */}
      <style>{`
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}