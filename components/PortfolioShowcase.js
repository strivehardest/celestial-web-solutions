import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// 1. Upload each project walkthrough video to youtube.com/@celestialwebsolutions
// 2. Grab the video ID from the URL e.g. https://youtu.be/ABC123 → "ABC123"
// 3. Paste it in the youtubeId field below
// ─────────────────────────────────────────────────────────────────────────────
const showcaseProjects = [
  {
    slug: 'tru-seeds-africa',
    title: 'Tru Seeds Africa',
    category: 'Corporate Website',
    description: 'Agricultural company web presence built with Next.js & TypeScript.',
    country: 'Ghana 🇬🇭',
    liveUrl: 'https://truseeds.africa',
    youtubeId: 'REPLACE_WITH_VIDEO_ID', // ← paste YouTube video ID here
    posterImg: '/portfolio/desktop/trueseeds.png',
    bg: '#1a6b3c',
    accent: '#f5c842',
    textColor: '#fff',
  },
  {
    slug: 'dl-auto-parts',
    title: 'DL Auto Parts Ghana',
    category: 'E-Commerce Store',
    description: 'WooCommerce auto parts store with shipment tracking.',
    country: 'Ghana 🇬🇭',
    liveUrl: 'https://dlautoparts.com',
    youtubeId: 'REPLACE_WITH_VIDEO_ID',
    posterImg: '/portfolio/desktop/dlautos.png',
    bg: '#c0392b',
    accent: '#f5c842',
    textColor: '#fff',
  },
  {
    slug: 'valyd-homes',
    title: 'Valyd Homes',
    category: 'Real Estate Website',
    description: 'Premium property listings site built in Next.js.',
    country: 'Ghana 🇬🇭',
    liveUrl: 'https://valyd.com',
    youtubeId: 'REPLACE_WITH_VIDEO_ID',
    posterImg: '/portfolio/desktop/valyd.png',
    bg: '#1a2a4a',
    accent: '#f5a623',
    textColor: '#fff',
  },
  {
    slug: 'elolo-agbleke-website',
    title: 'Elolo Agbleke',
    category: 'Personal Brand',
    description: 'Speaker & chaplain personal website with events.',
    country: 'Ghana 🇬🇭',
    liveUrl: 'https://eloloagbleke.com',
    youtubeId: 'REPLACE_WITH_VIDEO_ID',
    posterImg: '/portfolio/desktop/elolo.png',
    bg: '#6b3fa0',
    accent: '#ffd700',
    textColor: '#fff',
  },
  {
    slug: 'ghana-updates-online',
    title: 'Ghana Updates Online',
    category: 'News & Media',
    description: 'WordPress news portal with AdSense monetisation.',
    country: 'Ghana 🇬🇭',
    liveUrl: 'https://ghanaupdates.online',
    youtubeId: 'REPLACE_WITH_VIDEO_ID',
    posterImg: '/portfolio/desktop/ghanaupdates.png',
    bg: '#e67e22',
    accent: '#2c3e50',
    textColor: '#fff',
  },
  {
    slug: 'myspace-furniture',
    title: 'MySpace Furniture',
    category: 'E-Commerce Store',
    description: 'Furniture shop with product catalogue & enquiry.',
    country: 'Ghana 🇬🇭',
    liveUrl: '#',
    youtubeId: 'REPLACE_WITH_VIDEO_ID',
    posterImg: '/portfolio/desktop/myspace.png',
    bg: '#2c3e50',
    accent: '#e74c3c',
    textColor: '#fff',
  },
];

// Builds the YouTube embed URL with autoplay, loop, no controls, no branding
const ytEmbed = (id) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&iv_load_policy=3`;

export default function PortfolioShowcase() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const project = showcaseProjects[current];

  const go = (dir) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + showcaseProjects.length) % showcaseProjects.length);
  };

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-950 overflow-hidden">

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <span
            className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2 block"
            style={{ fontFamily: 'Google Sans, sans-serif' }}
          >
            Our Work
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
          >
            Featured Projects
          </h2>
        </div>

        {/* Prev / Next arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => go(-1)}
            className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 dark:hover:border-orange-400 dark:hover:text-orange-400 transition-all text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft size={18} />
          </button>
          <span
            className="text-sm text-gray-400 dark:text-gray-500 min-w-[48px] text-center tabular-nums"
            style={{ fontFamily: 'Google Sans, sans-serif' }}
          >
            {String(current + 1).padStart(2, '0')} / {String(showcaseProjects.length).padStart(2, '0')}
          </span>
          <button
            onClick={() => go(1)}
            className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 dark:hover:border-orange-400 dark:hover:text-orange-400 transition-all text-gray-600 dark:text-gray-300"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Main showcase card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.32, 0, 0.67, 0] }}
          className="max-w-7xl mx-auto px-4"
        >
          <div
            className="relative rounded-3xl overflow-hidden min-h-[480px] md:min-h-[560px] flex items-center"
            style={{ backgroundColor: project.bg }}
          >

            {/* Giant background word */}
            <span
              className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontSize: 'clamp(80px, 18vw, 220px)',
                fontWeight: 900,
                color: 'rgba(255,255,255,0.06)',
                letterSpacing: '-0.04em',
                whiteSpace: 'nowrap',
              }}
            >
              portfolio
            </span>

            <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-8 md:px-12 py-12">

              {/* ── Left: project info ─────────────────────────────────── */}
              <div className="flex flex-col gap-6">

                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold w-fit"
                  style={{
                    backgroundColor: project.accent,
                    color: project.bg,
                    fontFamily: 'Google Sans, sans-serif',
                  }}
                >
                  {project.category}
                </div>

                <div>
                  <h3
                    className="text-3xl md:text-5xl font-bold mb-3 leading-tight"
                    style={{ color: project.textColor, fontFamily: 'Bricolage Grotesque, sans-serif' }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-base md:text-lg opacity-80 max-w-sm"
                    style={{ color: project.textColor, fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {project.description}
                  </p>
                  <p
                    className="text-sm mt-2 opacity-60"
                    style={{ color: project.textColor, fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {project.country}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90 hover:scale-105"
                    style={{
                      backgroundColor: project.accent,
                      color: project.bg,
                      fontFamily: 'Google Sans, sans-serif',
                    }}
                  >
                    View Case Study <ArrowRight size={14} />
                  </Link>
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full font-semibold text-sm border-2 transition-all hover:opacity-80"
                      style={{
                        borderColor: 'rgba(255,255,255,0.4)',
                        color: project.textColor,
                        fontFamily: 'Google Sans, sans-serif',
                      }}
                    >
                      <ExternalLink size={13} /> Live Site
                    </a>
                  )}
                </div>
              </div>

              {/* ── Right: iMac + iPhone device frames ───────────────── */}
              <div className="relative flex items-end justify-center" style={{ minHeight: '320px' }}>

                {/* iMac frame */}
                <div className="relative z-10" style={{ width: '72%', maxWidth: '400px' }}>
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      background: '#1a1a1a',
                      padding: '8px 8px 0',
                      boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* Mac traffic lights */}
                    <div className="flex items-center gap-1.5 px-2 pb-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>

                    {/* YouTube embed — 16:10 aspect */}
                    <div className="rounded-t-lg overflow-hidden" style={{ aspectRatio: '16/10' }}>
                      <iframe
                        key={project.youtubeId + '-desktop'}
                        src={ytEmbed(project.youtubeId)}
                        title={`${project.title} demo`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen={false}
                        className="w-full h-full"
                        style={{ border: 'none', display: 'block', pointerEvents: 'none' }}
                      />
                    </div>
                  </div>

                  {/* iMac stand */}
                  <div className="flex justify-center">
                    <div style={{ width: '30%', height: '20px', background: '#2a2a2a', borderRadius: '0 0 4px 4px' }} />
                  </div>
                  <div className="flex justify-center">
                    <div style={{ width: '45%', height: '6px', background: '#333', borderRadius: '4px' }} />
                  </div>
                </div>

                {/* iPhone frame — overlapping bottom-right */}
                <div
                  className="absolute right-0 bottom-4 z-20"
                  style={{ width: '24%', maxWidth: '130px' }}
                >
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: '#1a1a1a',
                      padding: '6px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {/* iPhone notch */}
                    <div className="flex justify-center mb-1">
                      <div style={{ width: '40%', height: '10px', background: '#000', borderRadius: '0 0 8px 8px' }} />
                    </div>

                    {/* Same YouTube embed — portrait crop */}
                    <div className="rounded-xl overflow-hidden" style={{ aspectRatio: '9/18' }}>
                      <iframe
                        key={project.youtubeId + '-mobile'}
                        src={ytEmbed(project.youtubeId)}
                        title={`${project.title} mobile demo`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen={false}
                        className="w-full h-full"
                        style={{
                          border: 'none',
                          display: 'block',
                          pointerEvents: 'none',
                          transform: 'scale(1.5)',
                          transformOrigin: 'top center',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {showcaseProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    backgroundColor: i === current ? project.accent : 'rgba(255,255,255,0.35)',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Thumbnail strip */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {showcaseProjects.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className="flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300"
              style={{
                width: '100px',
                height: '66px',
                border: i === current ? `3px solid ${p.accent}` : '3px solid transparent',
                opacity: i === current ? 1 : 0.5,
                backgroundColor: p.bg,
              }}
            >
              <img
                src={p.posterImg}
                alt={p.title}
                className="w-full h-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}