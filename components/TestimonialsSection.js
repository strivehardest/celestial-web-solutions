'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GoogleAIBadge from './GoogleAIBadge';

// ── Data ──────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 'bpd',
    tabName: 'Building Planner',
    tabLogo: '/testimonials/logos/building.png',
    cardPhoto: '/testimonials/frank.jpg',
    cardLogo: '/testimonials/logos/building.png',
    logoAlt: 'Building Planner Designs logo',
    photoAlt: 'Rev. Frank Ntow Gyan',
    logoInitials: 'BPD',
    nameInitials: 'FG',
    name: 'Rev. Frank Ntow Gyan',
    role: 'CEO',
    company: 'Building Planner Designs Limited',
    text: 'Working with Celestial Web Solutions was incredible! They transformed our outdated website into a modern, user-friendly platform. Our online sales have increased by 200% since the launch.',
  },
  {
    id: 'rak',
    tabName: 'RAK Foundation',
    tabLogo: '/testimonials/logos/rak.png',
    cardPhoto: '/testimonials/righteous.jpg',
    cardLogo: '/testimonials/logos/rak.png',
    logoAlt: 'RAK Foundation logo',
    photoAlt: 'Righteous Semahar',
    logoInitials: 'RAK',
    nameInitials: 'RS',
    name: 'Righteous Semahar',
    role: 'CEO',
    company: 'RAK Foundation',
    text: 'Expertise in Web Development — their services are excellent. They built exactly what we envisioned and delivered on time. The team is professional, communicative, and genuinely cares about results.',
  },
  {
    id: 'elolo',
    tabName: 'Elolo Agbleke',
    tabLogo: '/testimonials/logos/elolo2.jpeg',
    cardPhoto: '/testimonials/elolo.jpg',
    cardLogo: '/testimonials/logos/elolo2.jpeg',
    logoAlt: 'Keta Institute of Technology logo',
    photoAlt: 'Elolo Agbleke',
    logoInitials: 'KIT',
    nameInitials: 'EA',
    name: 'Elolo Agbleke',
    role: 'Program Manager, COO',
    company: 'Keta Institute of Technology',
    text: 'Great design concepts, always available for quick changes, open to collaboration and customer-focused. Vast experience easily shows in their output. Good prices as well.',
  },
  {
    id: 'akari',
    tabName: 'Akari Kev',
    tabLogo: null,
    cardPhoto: null,
    cardLogo: null,
    logoAlt: 'Akari Kev',
    photoAlt: 'Akari Kev',
    logoInitials: 'AK',
    nameInitials: 'AK',
    name: 'Akari Kev',
    role: 'Client',
    company: 'Ghana',
    text: "Celestial Web Solutions was professional, responsive, and easy to work with. They understood my requirements clearly and delivered quality work on time. Communication was smooth, and any feedback was handled quickly. I'd definitely recommend them.",
  },
  {
    id: 'myyspace',
    tabName: 'Myy Space Furniture',
    tabLogo: '/testimonials/logos/myspace.png',
    cardPhoto: '/testimonials/myspace.jpg',
    cardLogo: '/testimonials/logos/myspace.png',
    logoAlt: 'Myy Space Furniture logo',
    photoAlt: 'Paul Dickens Doe',
    logoInitials: 'MS',
    nameInitials: 'PD',
    name: 'Paul Dickens Doe',
    role: 'Client',
    company: 'Myy Space Furniture',
    text: 'Celestial Web Solutions did a great job on our website. They always finish each project in record time. Their continuous tech support and updating of pages is just excellent. Highly recommended.',
  },
];

const AUTO_DELAY = 6000;

// ── Tab logo ──────────────────────────────────────────────────────────────────
function TabLogo({ src, initials, active }) {
  const [err, setErr] = useState(false);

  if (src && !err) {
    return (
      <span className="relative block flex-shrink-0" style={{ width: 26, height: 26 }}>
        <Image
          src={src}
          alt={initials}
          fill
          className="object-contain"
          onError={() => setErr(true)}
        />
      </span>
    );
  }
  return (
    <span
      className={`flex-shrink-0 flex items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-200
        ${active
          ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400'
          : 'bg-gray-200 text-gray-500 dark:bg-white/10 dark:text-white/50'
        }`}
      style={{ width: 26, height: 26 }}
    >
      {initials}
    </span>
  );
}

// ── Client card: LARGE logo top-right + SMALL circular avatar bottom-left ─────
//
//   Cloudflare Shopify layout:
//
//        [                 ]
//        [   LARGE LOGO    ]  ← 124px, top-right
//   [av] [                 ]
//    ↑
//    62px circle, bottom-left, overlaps logo
//    Border matches card bg via CSS var --tw-card-bg
//
function ClientCard({ photo, photoAlt, logo, logoAlt, nameInitials, logoInitials }) {
  const [photoErr, setPhotoErr] = useState(false);
  const [logoErr,  setLogoErr]  = useState(false);

  return (
    <div className="relative flex-shrink-0" style={{ width: 165, height: 140 }}>

      {/* Large company logo — top-right */}
      <div className="absolute top-0 right-0" style={{ width: 124, height: 124 }}>
        {logo && !logoErr ? (
          <Image
            src={logo}
            alt={logoAlt}
            fill
            className="object-contain"
            onError={() => setLogoErr(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center rounded-2xl
                          bg-orange-50 border border-orange-200
                          dark:bg-orange-500/10 dark:border-orange-500/20">
            <span
              className="text-orange-500 dark:text-orange-400 font-black text-3xl"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              {logoInitials}
            </span>
          </div>
        )}
      </div>

      {/* Small circular avatar — bottom-left, overlaps logo */}
      {/* The border color matches the card bg via [--tw-card-bg] CSS variable set on the card container */}
      <div
        className="absolute bottom-0 left-0 rounded-full overflow-hidden z-10
                   border-[3px] border-[var(--testimonial-card-bg,#ffffff)]
                   shadow-md"
        style={{
          width: 62,
          height: 62,
          background: 'linear-gradient(135deg, #f97316, #dc2626)',
        }}
      >
        {photo && !photoErr ? (
          <Image
            src={photo}
            alt={photoAlt}
            fill
            className="object-cover object-top"
            onError={() => setPhotoErr(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white font-bold text-lg"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
          >
            {nameInitials}
          </div>
        )}
      </div>

    </div>
  );
}

// ── Nav button (prev / next) ──────────────────────────────────────────────────
function NavBtn({ onClick, label, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex items-center justify-center rounded-full transition-all duration-200
                 w-9 h-9
                 border border-gray-300 text-gray-400
                 hover:border-orange-500 hover:text-orange-500
                 dark:border-white/[0.12] dark:text-white/45
                 dark:hover:border-orange-500 dark:hover:text-orange-400"
      style={{ background: 'transparent', cursor: 'pointer' }}
    >
      {children}
    </button>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((idx) => {
    clearTimeout(timerRef.current);
    setCurrent(((idx % testimonials.length) + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(
      () => setCurrent((c) => (c + 1) % testimonials.length),
      AUTO_DELAY
    );
    return () => clearTimeout(timerRef.current);
  }, [current, paused]);

  const t = testimonials[current];

  return (
    <section
      className="relative py-24 overflow-hidden
                 bg-gray-50 dark:bg-[#0f1729]
                 transition-colors duration-300"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-30"
             style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10 dark:opacity-20"
             style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <div className="mb-10">
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider
                       bg-orange-100 text-orange-700
                       dark:bg-orange-900/40 dark:text-orange-300
                       transition-colors duration-300"
            style={{ fontFamily: 'Albert Sans, sans-serif' }}
          >
            What our clients say
          </span>
        </div>

        {/* Google AI Badge */}
        <div className="mb-10">
          <GoogleAIBadge />
        </div>

        {/*
          Card container.
          CSS variable --testimonial-card-bg is read by ClientCard to color
          the avatar separator ring — must always match the card background.

          Light: white (#ffffff)
          Dark:  #111827
        */}
        <div
          className="rounded-2xl overflow-hidden
                     [--testimonial-card-bg:#ffffff] dark:[--testimonial-card-bg:#111827]
                     bg-white dark:bg-[#111827]
                     border border-gray-200 dark:border-white/[0.07]
                     transition-colors duration-300"
        >

          {/* ── TAB BAR ── */}
          <div
            className="flex items-stretch overflow-x-auto
                       bg-gray-50 dark:bg-black/20
                       border-b border-gray-200 dark:border-white/[0.08]
                       transition-colors duration-300"
            style={{ scrollbarWidth: 'none' }}
            role="tablist"
            aria-label="Client testimonials navigation"
          >
            {testimonials.map((item, i) => {
              const isActive = i === current;
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`testimonial-panel-${item.id}`}
                  onClick={() => goTo(i)}
                  className={`relative flex items-center gap-2.5 px-6 py-5 flex-shrink-0
                              transition-colors duration-200 whitespace-nowrap
                              border-none cursor-pointer bg-transparent
                              ${isActive
                                ? 'text-gray-900 dark:text-white font-semibold'
                                : 'text-gray-400 dark:text-white/40 font-normal hover:text-gray-700 dark:hover:text-white/70'
                              }`}
                  style={{
                    fontFamily: 'Albert Sans, sans-serif',
                    fontSize: 14,
                  }}
                >
                  <TabLogo src={item.tabLogo} initials={item.logoInitials} active={isActive} />
                  <span>{item.tabName}</span>

                  {/* Animated orange underline for active tab */}
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500"
                      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── CARD BODY ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              id={`testimonial-panel-${t.id}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex items-center justify-between gap-10 px-10 md:px-16 py-14"
            >
              {/* Left: quote + attribution */}
              <div className="flex-1 min-w-0">

                {/* Quote text */}
                <p
                  className="font-bold leading-snug text-gray-900 dark:text-white transition-colors duration-300"
                  style={{
                    fontFamily: 'Bricolage Grotesque, sans-serif',
                    fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="text-gray-900 dark:text-white"
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
                      lineHeight: 1,
                      marginRight: 3,
                      verticalAlign: 'top',
                    }}
                  >&#8220;</span>
                  {t.text}
                  <span
                    aria-hidden="true"
                    className="text-gray-900 dark:text-white"
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
                      lineHeight: 1,
                      marginLeft: 3,
                      verticalAlign: 'bottom',
                    }}
                  >&#8221;</span>
                </p>

                {/* Attribution */}
                <p
                  className="mt-8 text-gray-500 dark:text-white/55 transition-colors duration-300"
                  style={{ fontFamily: 'Albert Sans, sans-serif', fontSize: 15 }}
                >
                  <strong className="text-gray-900 dark:text-white font-semibold">
                    {t.name}
                  </strong>
                  {`, ${t.role}, ${t.company}`}
                </p>
              </div>

              {/* Right: large logo + small avatar */}
              <div className="flex-shrink-0 self-center hidden sm:block">
                <ClientCard
                  photo={t.cardPhoto}
                  photoAlt={t.photoAlt}
                  logo={t.cardLogo}
                  logoAlt={t.logoAlt}
                  nameInitials={t.nameInitials}
                  logoInitials={t.logoInitials}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Bottom nav bar ── */}
          <div
            className="flex items-center justify-between px-10 md:px-16 py-5
                       border-t border-gray-100 dark:border-white/[0.07]
                       transition-colors duration-300"
          >
            {/* Prev / Next arrows */}
            <div className="flex items-center gap-3">
              <NavBtn onClick={() => goTo(current - 1)} label="Previous testimonial">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </NavBtn>
              <NavBtn onClick={() => goTo(current + 1)} label="Next testimonial">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </NavBtn>
            </div>

            {/* Dot-pill indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full border-none cursor-pointer transition-all duration-300 p-0
                    ${i === current
                      ? 'bg-orange-500'
                      : 'bg-gray-300 dark:bg-white/20 hover:bg-orange-300 dark:hover:bg-white/40'
                    }`}
                  style={{
                    height: 7,
                    width: i === current ? 22 : 7,
                  }}
                />
              ))}
            </div>
          </div>

        </div>
        {/* ── End card ── */}

      </div>
    </section>
  );
}
