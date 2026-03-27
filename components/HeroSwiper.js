import { useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import PremiumCTA from './PremiumCTA';

import 'swiper/css';
import 'swiper/css/effect-fade';

const heroSlides = [
  {
    tag: 'WEB DEVELOPMENT, SEO',
    title: 'Building Planner\nDesigns',
    description: 'We designed a professional website for Ghana\'s trusted building planning firm — fast, SEO-ready, and built to convert.',
    caseStudyLink: '/portfolio/building-planner-designs',
    caseStudyLabel: 'VIEW PROJECT',
    ctaLink: '/contact',
    ctaLabel: 'START YOUR PROJECT',
    mainImage: '/portfolio/desktop/building.png',
    bgColor: 'from-blue-950 via-blue-900 to-amber-900',
  },
  {
    tag: 'E-COMMERCE, WEB DESIGN',
    title: 'MySpace\nFurniture',
    description: 'A full-featured e-commerce store we built for a US-based premium furniture brand — sleek, fast, and ready for sales.',
    caseStudyLink: '/portfolio/myspace-furniture',
    caseStudyLabel: 'VIEW PROJECT',
    ctaLink: '/contact',
    ctaLabel: 'START YOUR PROJECT',
    mainImage: '/portfolio/desktop/myspace.png',
    bgColor: 'from-gray-950 via-neutral-900 to-stone-900',
  },
  {
    tag: 'CUSTOM WEBSITE, BRANDING',
    title: 'Elolo Agbleke\nPortfolio',
    description: 'A personal brand website crafted for a renowned motivational speaker and entrepreneur — bold, clean, and memorable.',
    caseStudyLink: '/portfolio/elolo-agbleke-website',
    caseStudyLabel: 'VIEW PROJECT',
    ctaLink: '/contact',
    ctaLabel: 'START YOUR PROJECT',
    mainImage: '/portfolio/desktop/elolo.png',
    bgColor: 'from-slate-950 via-blue-950 to-indigo-950',
  },
  {
    tag: 'NEWS & MEDIA, ADSENSE',
    title: 'Ghana Updates\nOnline',
    description: 'A high-traffic news platform with live radio streaming we developed — optimized for speed and AdSense revenue.',
    caseStudyLink: '/portfolio/ghana-updates-online',
    caseStudyLabel: 'VIEW PROJECT',
    ctaLink: '/contact',
    ctaLabel: 'START YOUR PROJECT',
    mainImage: '/portfolio/desktop/ghanaupdates.png',
    bgColor: 'from-red-950 via-red-900 to-red-800',
  },
  {
    tag: 'E-COMMERCE, WOOCOMMERCE',
    title: 'DL Auto\nParts',
    description: 'A WooCommerce auto parts store with secure payment integration — built to serve the Ghanaian market at scale.',
    caseStudyLink: '/portfolio/dl-auto-parts',
    caseStudyLabel: 'VIEW PROJECT',
    ctaLink: '/contact',
    ctaLabel: 'START YOUR PROJECT',
    mainImage: '/portfolio/desktop/dlautos.png',
    bgColor: 'from-green-950 via-green-900 to-emerald-900',
  },
  {
    tag: 'REAL ESTATE, WEB APPLICATION',
    title: 'Valyd Homes\nPlatform',
    description: 'A modern real estate web app we engineered for seamless property discovery — responsive, fast, and user-first.',
    caseStudyLink: '/portfolio/valyd-homes',
    caseStudyLabel: 'VIEW PROJECT',
    ctaLink: '/contact',
    ctaLabel: 'START YOUR PROJECT',
    mainImage: '/portfolio/desktop/valyd.png',
    bgColor: 'from-emerald-950 via-teal-900 to-green-950',
  },
  {
    tag: 'AGRIBUSINESS, BRANDING',
    title: 'Tru Seeds\nAfrica',
    description: 'A comprehensive platform for agribusinesses — innovative, user-friendly, and designed to drive growth.',
    caseStudyLink: '/portfolio/tru-seeds-africa',
    caseStudyLabel: 'VIEW PROJECT',
    ctaLink: '/contact',
    ctaLabel: 'START YOUR PROJECT',
    mainImage: '/portfolio/desktop/trueseeds.png',
    bgColor: 'from-green-950 via-green-900 to-green-900',
  },
];

export default function HeroSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const slideNumber = String(activeIndex + 1).padStart(2, '0');

  return (
    <section className="relative w-full h-screen min-h-[750px] lg:min-h-[650px] max-h-[920px] overflow-hidden">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        simulateTouch={true}
        touchRatio={1}
        threshold={30}
        touchStartPreventDefault={false}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        className="w-full h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor}`} />
            <div className="absolute inset-0 bg-black/40" />

            {/* Slide content */}
            <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
              <div className="flex flex-col lg:flex-row items-stretch h-full">

                {/* ─── LEFT SIDE: Text Content ─── */}
                <div className="w-full lg:w-[45%] flex flex-col justify-center z-20 pt-20 sm:pt-24 lg:pt-0 pb-4 lg:pb-0">
                  <span
                    className="text-orange-400 text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-5"
                    style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}
                  >
                    {slide.tag}
                  </span>

                  <h1
                    className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-7xl font-black text-white leading-[1.02] mb-6 whitespace-pre-line"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                  >
                    {slide.title}
                  </h1>

                  <p
                    className="text-base sm:text-lg md:text-xl text-white/75 max-w-md mb-10 leading-relaxed"
                    style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}
                  >
                    {slide.description}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-4 mb-10">
                    <PremiumCTA
                      href={slide.caseStudyLink}
                      variant="primary"
                      size="default"
                    >
                      {slide.caseStudyLabel}
                    </PremiumCTA>
                    <PremiumCTA
                      href={slide.ctaLink}
                      variant="secondary"
                      size="default"
                    >
                      {slide.ctaLabel}
                    </PremiumCTA>
                  </div>
                </div>

                {/* ─── RIGHT SIDE: Large Project Image (Desktop) ─── */}
                <div className="hidden lg:block w-[55%] relative z-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[90%] h-[80%] rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
                      {/* Browser chrome bar */}
                      <div className="bg-gray-900/95 backdrop-blur-sm px-4 py-2 flex items-center gap-1.5 border-b border-white/5 flex-shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        <span className="ml-3 text-[10px] text-white/30 font-mono truncate">celestialwebsolutions.net</span>
                      </div>
                      <div className="relative bg-gray-800" style={{ height: 'calc(100% - 34px)' }}>
                        <Image
                          src={slide.mainImage}
                          alt={slide.title}
                          fill
                          sizes="50vw"
                          className="object-cover object-top"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile: Large Project Image */}
                <div className="lg:hidden w-full px-3 mt-4 mb-20">
                  <div className="relative w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/15">
                    <div className="bg-gray-900 px-3 py-2 flex items-center gap-1.5 border-b border-white/10">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      <span className="ml-2 text-[10px] text-white/30 font-mono">project preview</span>
                    </div>
                    <div className="relative w-full aspect-[16/10] bg-gray-800">
                      <Image
                        src={slide.mainImage}
                        alt={slide.title}
                        fill
                        sizes="(max-width: 640px) 95vw, 450px"
                        className="object-cover object-top"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide counter */}
      <div className="absolute z-20 left-2 sm:left-6 bottom-10 hidden md:flex items-center gap-2">
        <span className="text-white/40 text-sm">—</span>
        <span className="text-white font-bold text-sm font-mono">{slideNumber}</span>
      </div>

      {/* Bottom navigation dots */}
      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className={`relative transition-all duration-400 rounded-full after:absolute after:content-[''] after:inset-[-17px] ${
              activeIndex === i
                ? 'w-10 h-2.5 bg-orange-500 shadow-lg shadow-orange-500/40'
                : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
