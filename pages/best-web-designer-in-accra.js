import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useRef, useCallback } from 'react';
import { CheckCircle, Award, Users, Code, TrendingUp } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import Image from 'next/image';
import TestimonialsSection from '../components/TestimonialsSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import PremiumCTA from '../components/PremiumCTA';
import 'swiper/css';
import 'swiper/css/effect-fade';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <p className="text-center py-8 text-gray-500">Loading map...</p>,
});

const highlights = [
  'Pixel-perfect, responsive layouts for every device',
  'SEO-first builds that rank locally in Accra and beyond',
  'Fast delivery with clear, friendly communication'
];

const heroProjects = [
  { image: '/portfolio/desktop/building.png', title: 'Building Planner Designs', bgColor: 'from-blue-950 via-blue-900 to-amber-900' },
  { image: '/portfolio/desktop/myspace.png', title: 'My Space Furniture', bgColor: 'from-gray-950 via-neutral-900 to-stone-900' },
  { image: '/portfolio/desktop/elolo.png', title: 'Elolo Agbleke', bgColor: 'from-slate-950 via-blue-950 to-indigo-950' },
  { image: '/portfolio/desktop/ghanaupdates.png', title: 'Ghana Updates Online', bgColor: 'from-red-950 via-red-900 to-red-800' },
  { image: '/portfolio/desktop/dlautos.png', title: 'DL Auto Parts', bgColor: 'from-green-950 via-green-900 to-emerald-900' },
  { image: '/portfolio/desktop/valyd.png', title: 'Valyd Homes', bgColor: 'from-emerald-950 via-teal-900 to-green-950' },
];

const serviceFocus = [
  'Business websites with clear messaging',
  'Conversion-ready e-commerce experiences',
  'SEO and Core Web Vitals performance',
];

const portfolioHighlights = [
  {
    title: 'My Space Furniture',
    category: 'Furniture & E-Commerce',
    description: 'Modern furniture platform with interactive categories and seamless shopping experience.',
    image: '/png/projects/myspace-furniture.png',
    slug: 'myspace-furniture'
  },
  {
    title: 'Ghana Updates Online',
    category: 'News & Media',
    description: 'High-performance news platform delivering timely updates to thousands of readers.',
    image: '/png/projects/ghanaupdates.png',
    slug: 'ghana-updates-online'
  },
  {
    title: 'Building Planner Designs',
    category: 'Architecture & Design',
    description: 'Professional services website showcasing architectural and design expertise.',
    image: '/png/projects/buildingplanner.png',
    slug: 'building-planner-designs'
  }
];

const NAV_H_MOBILE = 72;
const NAV_H_DESKTOP = 80;

// ─── Structured Data ─────────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does web design cost in Accra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most projects start from GHS 4,500 for a lean business site. E-commerce builds typically range from GHS 8,500–16,500 depending on catalog size, integrations, and custom features. You'll get a clear quote after a quick call."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build a website in Accra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A focused business site usually launches in 2–4 weeks. E-commerce projects run 3–6 weeks depending on product setup, payments, and content readiness. We share a clear timeline on day one."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer SEO services in Accra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every build includes on-page SEO, fast performance, mobile optimization, and basic schema. We can add local SEO, blog setup, and content guidance to help you rank in Accra and beyond."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work with small businesses in Accra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. We support founders, SMEs, and growing teams with right-sized packages — clear pricing, fast launches, and ongoing support to keep you online and converting."
      }
    }
  ]
};

const localBusinessSchema = {
  "@context": "https://www.schema.org",
  "@type": "ProfessionalService",
  "name": "Celestial Web Solutions",
  "url": "https://www.celestialwebsolutions.net",
  "logo": "https://www.celestialwebsolutions.net/logo-white.webp",
  "image": "https://www.celestialwebsolutions.net/logo-white.webp",
  "description": "Celestial Web Solutions is the best web design company in Accra, Ghana. We build fast, SEO-optimized websites for SMEs, NGOs, e-commerce, and churches.",
  "telephone": "+233530505031",
  "whatsapp" : "+233245709341",
  "email": "info@celestialwebsolutions.net",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Accra",
    "addressLocality": "Accra",
    "addressRegion": "Greater Accra",
    "addressCountry": "GH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 5.6679307,
    "longitude": -0.1661991
  },
  "areaServed": [
    { "@type": "City", "name": "Accra" },
    { "@type": "City", "name": "Tema" },
    { "@type": "City", "name": "Madina" },
    { "@type": "State", "name": "Greater Accra" },
    { "@type": "Country", "name": "Ghana" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "21",
    "bestRating": "5"
  },
  "sameAs": [
    "https://clutch.co/profile/celestial-web-solutions",
    "https://www.designrush.com/agency/profile/celestial-web-solutions",
    "https://themanifest.com/gh/web-design/agencies"
  ],
  "priceRange": "GHS 4,500 – GHS 28,000",
  "openingHours": "Mo-Fr 08:00-18:00",
  "hasMap": "https://www.google.com/maps/place/Celestial+Web+Solutions"
};

export default function BestWebDesignerInAccraPage() {
  return (
    <>
      <Head>
        <title>Best Web Designer in Accra | Celestial Web Solutions</title>
        <meta
          name="description"
          content="Looking for the best web designer in Accra? Celestial Web Solutions builds fast, SEO-optimized websites that grow businesses in Ghana. Get started today."
        />
        <link
          rel="canonical"
          href="https://www.celestialwebsolutions.net/best-web-designer-in-accra"
        />
        <meta name="keywords" content="best web designer in Accra, web design companies in accra, web design company in Ghana, SEO services in Ghana, e-commerce website Ghana, business website design Ghana, affordable web design Ghana" />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </Head>

      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-300">

        {/* ─── Hero Section ──────────────────────────────────────────────────── */}
        <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
          <Swiper
            modules={[EffectFade, Autoplay]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1200}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            simulateTouch={true}
            threshold={30}
            touchStartPreventDefault={false}
            className="w-full h-full"
          >
            {heroProjects.map((project, index) => (
              <SwiperSlide key={index}>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.bgColor}`} />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
                  <div className="flex flex-col lg:flex-row items-stretch h-full">

                    <div
                      className="w-full lg:w-[45%] flex flex-col justify-center z-20 pb-4 lg:pb-0"
                      style={{ paddingTop: `${NAV_H_MOBILE}px` }}
                    >
                      <div className="lg:pt-0 lg:-mt-0 flex flex-col h-full justify-center">

                        <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-2 w-fit mb-5">
                          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                          <span
                            className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase"
                            style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}
                          >
                            BEST IN WEB DESIGN IN ACCRA
                          </span>
                        </div>

                        <h1
                          className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.02] mb-4 sm:mb-6"
                          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                        >
                          Best Web Designer in Accra
                        </h1>

                        <p
                          className="text-base sm:text-lg md:text-xl text-white/75 max-w-md mb-6 leading-relaxed"
                          style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}
                        >
                          We craft conversion-focused websites that help Ghanaian brands launch fast and stand out online.
                        </p>

                        <div className="space-y-2.5 mb-6">
                          {serviceFocus.map((item) => (
                            <div key={item} className="flex items-start gap-3 text-base text-white/90">
                              <CheckCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                              <span style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-5">
                          <PremiumCTA
                            href="/contact"
                            variant="primary"
                            size="default"
                            className="!bg-orange-500 !text-white !border-orange-500 !shadow-lg !shadow-orange-500/40 hover:!bg-orange-600 hover:!text-white"
                          >
                            Book a project call
                          </PremiumCTA>
                          <PremiumCTA
                            href="/portfolio"
                            variant="secondary"
                            size="default"
                            className="!bg-white !text-orange-600 !border-white !shadow-lg hover:!bg-orange-100"
                          >
                            View recent work
                          </PremiumCTA>
                        </div>

                        <div
                          className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/50"
                          style={{ fontFamily: 'Albert Sans, sans-serif' }}
                        >
                          <span className="inline-flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4 text-orange-400" />
                            Fast response
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4 text-orange-400" />
                            Accra-based
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4 text-orange-400" />
                            MoMo &amp; Paystack
                          </span>
                        </div>

                      </div>
                    </div>

                    {/* Desktop image */}
                    <div className="hidden lg:block w-[55%] relative z-10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-[90%] h-[78%] rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
                          <div className="bg-gray-900/95 backdrop-blur-sm px-4 py-2.5 flex items-center gap-1.5 border-b border-white/5 flex-shrink-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            <span className="ml-3 text-[10px] text-white/30 font-mono truncate">{project.title}</span>
                          </div>
                          <div className="relative bg-gray-800" style={{ height: 'calc(100% - 36px)' }}>
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="50vw"
                              className="object-cover object-top"
                              priority={index === 0}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile image */}
                    <div className="lg:hidden w-full px-3 flex-shrink-0 pb-6 mt-4">
                      <div className="relative w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/15">
                        <div className="bg-gray-900 px-3 py-2 flex items-center gap-1.5 border-b border-white/10">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                          <span className="ml-2 text-[10px] text-white/30 font-mono">{project.title}</span>
                        </div>
                        <div className="relative w-full aspect-[16/10] bg-gray-800">
                          <Image
                            src={project.image}
                            alt={project.title}
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
        </section>

        <div className="max-w-6xl mx-auto px-6 pt-16 pb-16 sm:pb-20 space-y-14">
          <section className="space-y-8">

            {/* Highlights */}
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-5 shadow-lg shadow-orange-500/10"
                >
                  <p className="text-base text-gray-800 dark:text-gray-200" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>{item}</p>
                </div>
              ))}
            </div>

            {/* Why Trust Us */}
            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-8 shadow-xl shadow-orange-500/10 space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.16em] text-orange-500 font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>Why choose us (proof)</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">Why you can trust Celestial Web Solutions</h2>
                <p className="text-base text-gray-700 dark:text-gray-200 max-w-3xl" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>Evidence that we deliver: seasoned experience, diverse clients, modern stacks, and measurable business outcomes.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <Award className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Years of experience</span>
                  </div>
                  <p className="text-xl font-display text-gray-900 dark:text-white">3+ years shipping web experiences</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>Product, marketing, and transactional sites delivered for Ghanaian brands.</p>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <Users className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Clients served</span>
                  </div>
                  <p className="text-xl font-display text-gray-900 dark:text-white">NGOs, SMEs, e-commerce, churches</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>Built for founders, ministries, schools, and fast-moving retail teams.</p>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <Code className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Tech &amp; SEO</span>
                  </div>
                  <p className="text-xl font-display text-gray-900 dark:text-white">Next.js, WordPress, on-page SEO</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>Performance, Core Web Vitals, schema, and analytics set up from day one.</p>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Results</span>
                  </div>
                  <p className="text-xl font-display text-gray-900 dark:text-white">More leads, sales, visibility</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>Conversion-led pages, faster load times, and SEO foundations that drive traffic.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-6 text-sm text-gray-700 dark:text-gray-300">
              <p style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>
                Ready to transform your web presence? Let&apos;s design a site that feels premium, loads fast, and converts visitors into loyal customers.
              </p>
            </div>

            {/* Services */}
            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-8 shadow-xl shadow-orange-500/10 space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.16em] text-orange-500 font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Local expertise</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">Web Design Services in Accra</h2>
                <p className="text-base text-gray-700 dark:text-gray-200 max-w-3xl" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>
                  Based in Accra, Ghana, we know the local market and deliver websites built for Ghanaian businesses to succeed online.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Business Websites', desc: 'Professional sites that establish Accra brands online' },
                  { title: 'E-commerce Websites', desc: 'Online stores with payment integration for Accra businesses' },
                  { title: 'Portfolio Websites', desc: 'Showcase your work with stunning portfolio sites' },
                  { title: 'SEO & Optimization', desc: 'Rank higher locally and reach more customers in Accra' },
                  { title: 'Website Maintenance', desc: 'Keep your site secure, fast, and up-to-date' },
                  { title: 'Speed & Performance', desc: 'Fast-loading sites that convert visitors to customers' },
                ].map(({ title, desc }) => (
                  <div key={title} className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>{title}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-8 shadow-xl shadow-orange-500/10 space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.16em] text-orange-500 font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Portfolio</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">Recent Projects &amp; Highlights</h2>
                <p className="text-base text-gray-700 dark:text-gray-200 max-w-3xl" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>
                  A selection of websites we&apos;ve built for businesses across e-commerce, media, services, and more.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioHighlights.map((project) => (
                  <div key={project.slug} className="group rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                    <div className="relative overflow-hidden h-48 sm:h-40 bg-gray-300 dark:bg-gray-700">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="flex flex-col flex-grow p-5 space-y-3">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-orange-500 font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{project.category}</p>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>{project.title}</h3>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>{project.description}</p>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 text-sm font-medium transition-colors group/link"
                        style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}
                      >
                        View Case Study
                        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
                  style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}
                >
                  View All Projects <span>→</span>
                </Link>
              </div>
            </div>

            {/* Testimonials */}
            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-8 shadow-xl shadow-orange-500/10 space-y-6">
              <TestimonialsSection />
            </div>

            {/* FAQ */}
            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-8 shadow-xl shadow-orange-500/10 space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.16em] text-orange-500 font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>FAQs</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                <p className="text-base text-gray-700 dark:text-gray-200 max-w-3xl" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>
                  Quick answers to the most common questions from Accra clients.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: 'How much does web design cost in Accra?',
                    a: "Most projects start from GHS 4,500 for a lean business site. E-commerce builds typically range from GHS 8,500–16,500 depending on catalog size, integrations, and custom features. You'll get a clear quote after a quick call."
                  },
                  {
                    q: 'How long does it take to build a website in Accra?',
                    a: 'A focused business site usually launches in 2–4 weeks. E-commerce projects run 3–6 weeks depending on product setup, payments, and content readiness. We share a clear timeline on day one.'
                  },
                  {
                    q: 'Do you offer SEO services in Accra?',
                    a: 'Yes. Every build includes on-page SEO, fast performance, mobile optimization, and basic schema. We can add local SEO, blog setup, and content guidance to help you rank in Accra and beyond.'
                  },
                  {
                    q: 'Do you work with small businesses in Accra?',
                    a: "Absolutely. We support founders, SMEs, and growing teams with right-sized packages — clear pricing, fast launches, and ongoing support to keep you online and converting."
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>{q}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Map + Local Area */}
            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur p-8 shadow-xl shadow-orange-500/10 space-y-6 overflow-hidden">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.16em] text-orange-500 font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Local Expertise</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">Serving Businesses Across Accra &amp; Greater Accra</h2>
                <p className="text-base text-gray-700 dark:text-gray-200 max-w-3xl" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>
                  Based in Accra, we partner with businesses throughout Greater Accra and beyond. We understand the local market and deliver web solutions built for success.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg h-96">
                <Map center={[5.6679307, -0.1661991]} zoom={15} markerText="Celestial Web Solutions - Accra, Office" height="100%" useCustomIcon={false} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 justify-center">
                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 max-w-xl w-full mx-auto">
                  <p className="text-sm font-semibold text-orange-500 uppercase tracking-wide mb-2" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Service Area</p>
                  <p className="text-base text-gray-900 dark:text-white font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Greater Accra Region</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Accra, Tema, Madina, Kasoa, Pokuase, and surrounding areas</p>
                </div>
              </div>

              {/* Related Blog Articles */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.16em] text-orange-500 font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Resources</p>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">Related Articles</h2>
                  <p className="text-base text-gray-700 dark:text-gray-200 max-w-3xl" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>
                    Learn more about web design, e-commerce, and growing your online business in Ghana.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Link href="/blog/web-design-prices-in-ghana-2026">
                    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600">
                        <img
                          src="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1170&auto=format&fit=crop"
                          alt="Web Design Prices in Ghana 2026"
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold uppercase tracking-wide mb-2" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Web Design</p>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Web Design Prices in Ghana (2026)</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>
                          A complete, honest breakdown of how much a website costs in Ghana in 2026 — by project type, features, and complexity.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold text-sm">Read More →</div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/blog/why-every-business-needs-a-website-in-ghana-2026">
                    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600">
                        <img
                          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=600&fit=crop"
                          alt="Why Every Business Needs a Website in Ghana 2026"
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold uppercase tracking-wide mb-2" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Business</p>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Why Every Business Needs a Website in Ghana 2026</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>
                          Discover why having a professional website is crucial for every business in Ghana in 2026 and what you're losing without one.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold text-sm">Read More →</div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="text-center mt-8">
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
                    style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}
                  >
                    View All Articles
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Final CTA */}
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 p-8 text-center space-y-4">
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Ready to Launch Your Web Presence in Accra?</h3>
                <p className="text-base text-gray-700 dark:text-gray-200 max-w-2xl mx-auto" style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>
                  Join businesses across Accra and Greater Accra that have transformed their online presence with our web design services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
                    style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}
                  >
                    Get a Website Today
                  </Link>
                  <a
                    href="https://wa.me/233245709341?text=Hi%20Celestial,%20I'm%20interested%20in%20getting%20a%20website%20designed%20in%20Accra."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold transition-all shadow-lg shadow-green-500/30"
                    style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>

            </div>
          </section>
        </div>
      </main>
      <WhatsAppButton />
    </>
  );
}