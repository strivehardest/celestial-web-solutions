'use client';
// Happy Clients data (same as About/Portfolio)
const happyClients = [
  { name: "Building Planner Designs", src: "/png/projects/building.png" },
  { name: "Ghana Updates Online", src: "/png/projects/ghanaupdates1.jpg" },
  { name: "AdBay Store", src: "/png/projects/Adbay1.png" },
  { name: "Elolo Agbleke", src: "/png/projects/elolo2.jpeg" },
  { name: "Mart Ban Logistics", src: "/png/projects/martb.png" },
  { name: "My Space Furniture", src: "/png/projects/myspace.png" },
  { name: "Valyd", src: "/png/projects/valyd.png" },
  { name: "Doeman", src: "/png/projects/doeman.jpeg" },
  { name: "DL Auto Parts", src: "/png/projects/dl-auto-parts.png" },
  { name: "Tru Seeds Africa", src: "/png/projects/truseeds.webp" },
];

import { useState, useEffect, useRef } from 'react';
const TestimonialsSection = dynamic(() => import('../components/TestimonialsSection'), { ssr: false });
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Monitor, Search, ShoppingCart, ArrowRight, Zap, CheckCircle } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
const WhatsAppButton = dynamic(() => import('../components/WhatsAppButton'), { ssr: false });
const PremiumCTA = dynamic(() => import('../components/PremiumCTA'), { ssr: false });
import { TextCTA } from '../components/PremiumCTA';
import CTASection from '../components/CTASection';
import dynamic from 'next/dynamic';

const HeroSwiper = dynamic(() => import('../components/HeroSwiper'), { ssr: false });

// Glass Button Component
const GlassButton = ({ children, href, variant = "light", className = "" }) => {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-md border cursor-pointer";
  const variants = {
    light: "bg-white/20 hover:bg-white/30 border-white/30 text-white hover:shadow-lg hover:shadow-white/10",
    dark: "bg-black/20 hover:bg-black/30 border-black/20 text-gray-900 hover:shadow-lg",
    orange: "bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/30 text-orange-600 dark:text-orange-400 hover:shadow-lg hover:shadow-orange-500/20",
    solid: "bg-orange-500 hover:bg-orange-600 border-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/30"
  };

  return (
    <Link href={href} className={`${baseClasses} ${variants[variant]} ${className}`} style={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}>
      {children}
      <ArrowRight size={18} />
    </Link>
  );
};

// SEO Component with Next.js Head
const SEOHead = () => {
  return (
    <Head>
      <title>Best Web Design Company in Ghana | Celestial Web Solutions</title>
      <meta name="description" content="Celestial Web Solutions is a leading web design company in Ghana offering professional website design, e-commerce development, SEO, and digital solutions for businesses."/>
      <meta name="keywords" content="best web design company in ghana, web design company in Ghana, web design companies in accra, web development company in Ghana, website designers in Ghana, web development company Ghana, SEO services in Ghana, e-commerce website Ghana, web designer in Accra, web designer in Keta, web design company in Accra, web designer in Accra Ghana, web design company in Keta, website design services Ghana, e-commerce website development Ghana, business website design Ghana, affordable web design Ghana" />
      <meta name="author" content="Celestial Web Solutions" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="geo.region" content="GH" />
      <meta name="geo.placename" content="Accra, Ghana" />
      <meta name="geo.position" content="5.6037;-0.1870" />
      <meta property="og:title" content="Best Web Design Company in Ghana | Celestial Web Solutions"/>
      <meta property="og:description" content="Celestial Web Solutions is a leading web design company in Ghana providing professional website design, web development, e-commerce solutions, and SEO services for businesses." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://celestialwebsolutions.net" />
      <meta property="og:image" content="https://celestialwebsolutions.net/og-image.jpg" />
      <meta property="og:site_name" content="Celestial Web Solutions" />
      <meta property="og:locale" content="en_GH" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Best Web Design Company in Ghana | Celestial Web Solutions" />
      <meta name="twitter:description" content="Celestial Web Solutions is a leading web design company in Ghana providing professional website design, web development, e-commerce solutions, and SEO services for businesses." />
      <meta name="twitter:image" content="https://celestialwebsolutions.net/twitter-image.jpg" />
      <meta name="theme-color" content="#FF6B00" />
      <link rel="canonical" href="https://celestialwebsolutions.net" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebDesignCompany",
            "name": "Celestial Web Solutions",
            "description": "Celestial Web Solutions is a leading web design company in Ghana providing professional website design, web development, e-commerce solutions, and SEO services for businesses.",
            "url": "https://celestialwebsolutions.net",
            "telephone": "+233-530-505-031",
            "email": "info@celestialwebsolutions.net",
            "areaServed": ["Accra", "Keta", "Ghana", "West Africa"],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "235 Agblor Link, Keta",
              "addressLocality": "Accra",
              "addressRegion": "Greater Accra",
              "postalCode": "DS 1742",
              "addressCountry": "GH"
            }
          })
        }}
      />
    </Head>
  );
};

const mainServices = [
  {
    icon: Code,
    title: "Web Development",
    description: "Modern, responsive websites built with Next.js, React and cutting-edge technologies",
    color: "from-orange-500 to-orange-600",
    link: "/web-design-company-in-ghana/web-development-company-in-ghana",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=90&w=800&auto=format&fit=crop"
  },
  {
    icon: Monitor,
    title: "Web Design",
    description: "Beautiful, user-friendly designs that engage your audience and drive conversions",
    color: "from-orange-500 to-orange-600",
    link: "/web-design-company-in-ghana/web-design-in-ghana",
    image: "https://www.ntc.edu/sites/default/files/styles/16_9_1600x900/public/2021-06/web-design-header.jpg?itok=KPytPu7S"
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "Custom online stores with secure payment integration and inventory management",
    color: "from-orange-500 to-orange-600",
    link: "/web-design-company-in-ghana/ecommerce-website-development-ghana",
    image: "https://admin.wac.co/uploads/What_is_E_commerce_and_What_are_its_Applications_2_d2eb0d4402.jpg"
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Improve your visibility and reach with our proven SEO strategies",
    color: "from-orange-500 to-orange-600",
    link: "/web-design-company-in-ghana/seo-services-in-ghana",
    image: "https://www.intellibright.com/wp-content/uploads/2025/04/Search-Engine-Optimization.jpg"
  }
];

const techStackCategories = [
  {
    title: "Frontend Development",
    description: "Building modern web interfaces with HTML, CSS, JavaScript, and React",
    color: "from-blue-500 to-blue-600",
    items: [
      { name: 'React', icon: '/images/tech/react.svg' },
      { name: 'Next.js', icon: '/images/tech/nextjs.svg' },
      { name: 'JavaScript', icon: '/images/tech/javascript.svg' },
      { name: 'CSS3', icon: '/images/tech/css3.svg' },
      { name: 'HTML5', icon: '/images/tech/html5.svg' },
      { name: 'TypeScript', icon: '/images/tech/typescript.svg' }
    ]
  },
  {
    title: "E-commerce & Payments",
    description: "Complete e-commerce solutions with secure payment integrations",
    color: "from-purple-500 to-purple-600",
    items: [
      { name: 'WooCommerce', icon: '/images/tech/woocommerce.svg' },
      { name: 'Shopify', icon: '/images/shopify-logo.png' },
      { name: 'Paystack', icon: '/images/paystack-logo.png' },
      { name: 'Flutterwave', icon: '/images/flutterwave-logo.png' }
    ]
  },
  {
    title: "Backend Development",
    description: "Robust server solutions with Node.js, Python, and databases",
    color: "from-blue-600 to-blue-700",
    items: [
      { name: 'Node.js', icon: '/images/tech/nodejs.svg' },
      { name: 'Python', icon: '/images/tech/python.svg' },
      { name: 'MongoDB', icon: '/images/tech/mongodb.svg' },
      { name: 'Django', icon: '/images/tech/django.svg' }
    ]
  },
  {
    title: "Design & Tools",
    description: "Modern design and development tools for optimal workflow",
    color: "from-orange-500 to-orange-600",
    items: [
      { name: 'Figma', icon: '/images/tech/figma.svg' },
      { name: 'TailwindCSS', icon: '/images/tailwindcss-logo.png' },
      { name: 'Bootstrap', icon: '/images/tech/bootstrap.svg' },
      { name: 'WordPress', icon: '/images/tech/wordpress.svg' }
    ]
  }
];

// Typing effect phrases
const typingPhrases = [
  'Websites',
  'E-Commerce Stores',
  'Web Applications',
  'Mobile Apps',
  'Digital Solutions'
];

// ─────────────────────────────────────────────
// Portfolio data
// ─────────────────────────────────────────────
const portfolioItems = [
  {
    title: "Tru Seeds Africa",
    category: "Agriculture",
    description: "A modern, responsive website for a leading agricultural company in Ghana specializing in high-quality seeds.",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    link: "/portfolio/tru-seeds-africa",
    image: "/portfolio/desktop/trueseeds.webp",
    accent: "#f97316"
  },
  {
    title: "My Space Furniture",
    category: "Furniture E-Commerce",
    description: "Modern furniture e-commerce with mattresses, sofas, chairs, tables, and home decor.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    link: "/portfolio/myspace-furniture",
    image: "/portfolio/desktop/myspace.webp",
    accent: "#f97316"
  },
  {
    title: "Finance Tracker",
    category: "Web Application",
    description: "Personal finance tracking app with income, expense management and visual reporting.",
    tech: ["Django", "Python", "HTML5", "CSS3"],
    link: "/portfolio/finance-tracker",
    image: "/portfolio/desktop/finance.webp",
    accent: "#3b82f6"
  },
  {
    title: "Ghana Updates Online",
    category: "News & Media",
    description: "A leading Ghanaian news platform delivering real-time updates and editorial content.",
    tech: ["WordPress", "Custom Theme", "SEO"],
    link: "/portfolio/ghana-updates-online",
    image: "/portfolio/desktop/ghanaupdates.webp",
    accent: "#10b981"
  },
  {
    title: "Elolo Agbleke Portfolio",
    category: "Personal Website",
    description: "Sleek personal brand website for a tech leader and program manager.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "/portfolio/elolo-agbleke-website",
    image: "/portfolio/desktop/elolo.webp",
    accent: "#8b5cf6"
  },
  {
    title: "Valyd",
    category: "Real Estate",
    description: "A real estate company website showcasing properties and services.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "React"],
    link: "/portfolio/valyd",
    image: "/portfolio/desktop/valyd.webp",
    accent: "#ec4899"
  },
  {
    title: "DL Auto Parts",
    category: "Auto Parts Store",
    description: "Professional auto parts e-commerce store for a Ghanaian automotive business.",
    tech: ["WooCommerce", "WordPress", "Paystack Integration"],
    link: "/portfolio/dl-auto-parts",
    image: "/portfolio/desktop/dlautos.webp",
    accent: "#f59e0b"
  }
];

// ─────────────────────────────────────────────
// Portfolio Showcase 
// ─────────────────────────────────────────────
const PortfolioShowcase = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-orange-500/10 text-orange-500 dark:text-orange-400 border border-orange-500/20 mb-5"
              style={{ fontFamily: 'Albert Sans, sans-serif' }}
            >
              Showcase
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              Real-world websites we&rsquo;ve built
            </h2>
          </div>
          <Link
            href="/portfolio"
            aria-label="View all our web design projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 transition-colors shrink-0"
            style={{ fontFamily: 'Albert Sans, sans-serif' }}
          >
            View all projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid — 2 cols on mobile, 3 on md, 5 on lg (first row 3, second row 3) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-5">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <Link href={item.link} className="group block">
                <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[16/10] shadow-sm hover:shadow-xl transition-shadow duration-300">
                  {/* Screenshot */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={680}
                    height={425}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3}
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    onError={(e) => { e.target.src = `https://placehold.co/680x425/1a1a1a/ffffff?text=${encodeURIComponent(item.title)}`; }}
                  />
                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Title overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <h3
                      className="text-sm md:text-base font-semibold text-white leading-snug"
                      style={{ fontFamily: 'Albert Sans, sans-serif' }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="flex justify-center mt-10 sm:hidden">
          <GlassButton href="/portfolio" variant="solid">View All Projects</GlassButton>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
const IndexPage = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  // Typing effect state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Manifest typing effect state
  const [manifestText, setManifestText] = useState('');
  const [manifestIsDeleting, setManifestIsDeleting] = useState(false);
  const manifestFullText = 'Listed Top 10 Web Designers in Ghana on the Manifest';

  const heroTitleText = 'Best Web Design Company in Ghana';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentPhrase = typingPhrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex]);

  // Manifest typing effect
  useEffect(() => {
    const typingSpeed = manifestIsDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!manifestIsDeleting) {
        if (manifestText.length < manifestFullText.length) {
          setManifestText(manifestFullText.slice(0, manifestText.length + 1));
        } else {
          setTimeout(() => setManifestIsDeleting(true), 3000);
        }
      } else {
        if (manifestText.length > 0) {
          setManifestText(manifestText.slice(0, -1));
        } else {
          setManifestIsDeleting(false);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [manifestText, manifestIsDeleting]);



  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

        {/* ── HERO SECTION — Kava-style Swiper Slider ── */}
        <div className="min-h-[320px] w-full">
          <HeroSwiper />
        </div>

        {/* ── Hero Text Section ── */}
        <section className="relative py-16 sm:py-20 bg-white dark:bg-gray-900 overflow-hidden min-h-[520px]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full mb-6 text-xs sm:text-sm font-semibold"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span>Full Stack Development</span>
                <span className="animate-pulse">●</span>
                <span>Available for Projects</span>
              </motion.div>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Best Web Design Company in Ghana
              </h1>

              <p
                className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                From concept to deployment, we build scalable web applications that drive business growth. Let&rsquo;s turn your vision into digital reality.{' '}
                <Link href="/best-web-designer-in-accra" className="text-orange-500 hover:text-orange-600 underline underline-offset-4 font-semibold">
                  See our Accra page.
                </Link>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlassButton href="/contact" variant="solid">Let&rsquo;s Build Together</GlassButton>
                <GlassButton href="/portfolio" variant="orange">View Our Work</GlassButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Company Intro Section */}
        <section className="py-8 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.div
              className="rounded-2xl bg-white dark:bg-gray-900 shadow-lg p-6 sm:p-10 mb-8 border border-orange-100 dark:border-orange-900/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-orange-600 dark:text-orange-400" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Grow Your Business Online
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-2" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                Celestial Web Solutions is a professional web design and development company in Ghana, helping businesses grow online with modern, responsive, and SEO-friendly websites.
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-2" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                As a trusted website design company in Ghana, we work with startups, SMEs, and established businesses across Accra, Keta, and other parts of Ghana, delivering custom digital solutions that drive growth.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Manifest Badge Section */}
        <section className="py-8 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 border-y border-orange-200 dark:border-orange-900/30">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              className="flex flex-col items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a
                href="https://themanifest.com/gh/web-design/agencies"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-white dark:bg-gray-800 border-2 border-orange-300 dark:border-orange-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Image src="/images/manifest-logo.png" alt="The Manifest" width={120} height={30} className="object-contain" />
              </a>
              <div className="text-center min-h-[40px] flex items-center justify-center">
                <div className="text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  <span>{manifestText}</span>
                  <span className="cursor-blink text-orange-500 ml-1">|</span>
                </div>
              </div>
            </motion.div>
          </div>
          <style jsx>{`
            .cursor-blink { animation: blink-caret 0.8s step-end infinite; }
            @keyframes blink-caret { from, to { opacity: 0; } 50% { opacity: 1; } }
          `}</style>
        </section>

        {/* Happy Clients Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-10 text-gray-700 dark:text-gray-200" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Brands that trust us
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
              {happyClients.map((client, idx) => (
                <div
                  key={client.name + idx}
                  className="flex items-center justify-center transition-colors duration-200 group"
                  style={{ height: client.name === 'Elolo Agbleke' ? '60px' : client.name === 'Ghana Updates Online' ? '80px' : '128px' }}
                >
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={280}
                    height={client.name === 'Elolo Agbleke' ? 60 : client.name === 'Ghana Updates Online' ? 80 : client.name === 'Tru Seeds Africa' ? 50 : 128}
                    quality={75}
                    className="object-contain transition-colors duration-200 group-hover:grayscale max-w-full h-auto"
                    style={{ maxHeight: client.name === 'Tru Seeds Africa' ? '50px' : '100%', width: 'auto' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                WHAT WE DO
              </motion.span>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Our Core Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                Comprehensive digital solutions for your business
              </p>
            </motion.div>

            <div className="space-y-16">
              {mainServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                >
                  <div className="w-full lg:w-1/2">
                    <motion.div className="relative h-72 lg:h-96 rounded-3xl overflow-hidden shadow-2xl group" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                      <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, 50vw" quality={75} className="object-cover group-hover:scale-110 transition-transform duration-700" priority={index === 0} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <motion.div className="absolute top-6 left-6 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/30" whileHover={{ rotate: 10, scale: 1.1 }}>
                        <service.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div className="absolute bottom-6 right-6 text-7xl font-bold text-white/10" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>0{index + 1}</div>
                    </motion.div>
                  </div>

                  <div className="w-full lg:w-1/2 space-y-5">
                    <span className="text-orange-500 font-semibold text-sm tracking-wider" style={{ fontFamily: 'Albert Sans, sans-serif' }}>SERVICE 0{index + 1}</span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{service.title}</h3>
                    {index === 0 && (<><p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-2" style={{ fontFamily: 'Albert Sans, sans-serif' }}>We offer professional website design services in Ghana tailored to meet the needs of businesses in different industries. Our websites are designed to be user-friendly, visually engaging, and conversion-focused.</p><p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Whether you need a business website, portfolio website, or corporate website, Celestial Web Solutions ensures your website reflects your brand and builds trust with your audience.</p></>)}
                    {index === 1 && (<><p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-2" style={{ fontFamily: 'Albert Sans, sans-serif' }}>As a reliable web development company in Ghana, we build custom websites and web applications that are secure, scalable, and performance-driven.</p><p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Albert Sans, sans-serif' }}>We work with modern technologies to deliver reliable web solutions for businesses looking to grow online in Ghana and beyond.</p></>)}
                    {index === 2 && (<><p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-2" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Looking to sell online? We provide e-commerce website development in Ghana for businesses that want to reach more customers and increase sales.</p><ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 text-lg mb-2" style={{ fontFamily: 'Albert Sans, sans-serif' }}><li>Online stores</li><li>Secure payment integration</li><li>Product management systems</li><li>Mobile-friendly shopping experiences</li></ul></>)}
                    {index === 3 && (<><p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-2" style={{ fontFamily: 'Albert Sans, sans-serif' }}>A great website is useless without visibility. Our SEO services in Ghana help businesses rank higher on Google and attract organic traffic.</p><ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 text-lg mb-2" style={{ fontFamily: 'Albert Sans, sans-serif' }}><li>On-page SEO optimization</li><li>Keyword research</li><li>Technical SEO</li><li>Local SEO for Ghanaian businesses</li></ul></>)}
                    <div className="pt-2">
                      <GlassButton href={service.link} variant="orange">Explore {service.title}</GlassButton>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-16">
              <GlassButton href="/web-design-company-in-ghana" variant="solid">View All Services</GlassButton>
            </motion.div>
          </div>
        </section>

        {/* ── PORTFOLIO SHOWCASE  ── */}
        <PortfolioShowcase />

        {/* Blog Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                INSIGHTS & TIPS
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Latest Blog Articles
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                Expert insights, tips, and guides to help your business thrive online
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  title: "Web Design Prices in Ghana 2026: The Complete Honest Guide",
                  excerpt: "Wondering how much a website costs in Ghana in 2026? This comprehensive guide breaks down web design prices based on project type, features, and complexity to help you budget for your next website project.",
                  category: "Web Design",
                  date: "March 23, 2026",
                  readTime: "15 min read",
                  slug: "web-design-prices-in-ghana-2026",
                  image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  title: "Why Every Business in Ghana Needs a Website in 2026",
                  excerpt: "Still running your business without a website in 2026? Here's why every business in Ghana needs a professional website — and what you're losing without one.",
                  category: "Business",
                  date: "March 23, 2026",
                  readTime: "10 min read",
                  slug: "why-every-business-needs-a-website-in-ghana-2026",
                  image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=600&fit=crop"
                }
              ].map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <div className="relative h-56 min-h-[224px] overflow-hidden">
                    <Image src={article.image} alt={article.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white text-xs font-semibold">{article.category}</div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{article.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{article.date}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{article.readTime}</span>
                      </div>
                      <Link
                        href={`/blog/${article.slug}`}
                        aria-label={`Read More about ${article.title}`}
                      >
                        <motion.span className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold text-sm hover:gap-3 transition-all" style={{ fontFamily: 'Albert Sans, sans-serif' }} whileHover={{ x: 5 }}>
                          Read More
                          <span className="sr-only">about {article.title}</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <GlassButton href="/blog" variant="solid">View All Articles</GlassButton>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Our Technology Stack
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                Modern tools and technologies we use to build exceptional digital experiences
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-12">
              {techStackCategories.map((category, index) => (
                <motion.div key={category.title} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className={`h-1 w-full bg-gradient-to-r ${category.color} rounded-full mb-4`} />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{category.title}</h3>
                </motion.div>
              ))}
            </div>

            <div className="relative w-full overflow-hidden">
              <div className="absolute left-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
              <style jsx>{`
                @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-scroll { animation: scroll 30s linear infinite; }
                .animate-scroll:hover { animation-play-state: paused; }
                @media (max-width: 640px) { .animate-scroll { animation-duration: 20s; } }
              `}</style>
              <div className="flex space-x-4 sm:space-x-12 overflow-hidden py-8">
                <div className="flex space-x-4 sm:space-x-12 animate-scroll">
                  {[...techStackCategories, ...techStackCategories].map((category, index) => (
                    <div key={`${category.title}-${index}`} className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                      {category.items.map((item, itemIndex) => (
                        <motion.div key={`${item.name}-${index}-${itemIndex}`} className="flex flex-col items-center w-16 sm:w-20 flex-shrink-0" whileHover={{ y: -5, scale: 1.05 }} transition={{ duration: 0.2 }}>
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 flex items-center justify-center hover:shadow-xl hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                            <Image src={item.icon} alt={item.name} width={40} height={40} className="max-w-8 max-h-8 sm:max-w-10 sm:max-h-10 object-contain group-hover:scale-110 transition-transform duration-300" onError={(e) => { e.target.style.display = 'none'; }} />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium text-center">{item.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* About Us Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                Best in Web Design in Ghana
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                A Website Design & Creative<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Marketing Agency</span> in Ghana
              </h2>
              <div className="max-w-3xl mx-auto mt-10 mb-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Why Choose Celestial Web Solutions</h2>
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-4" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Businesses choose Celestial Web Solutions because we deliver quality, reliability, and results.</p>
                <ul className="list-none space-y-2 text-left inline-block mx-auto mb-4">
                  {["Experienced web designers and developers","Affordable website design packages","SEO-friendly websites","Mobile-responsive designs","Client-focused approach"].map((item) => (
                    <li key={item} className="flex items-center text-base text-gray-700 dark:text-gray-200"><CheckCircle className="w-5 h-5 text-orange-500 mr-2" />{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                  Celestial Web Solutions based in Accra, Ghana is a website design and digital marketing company with years of experience on the Ghanaian market. We have had the privilege of working with award winning clients and international prestigious companies as well as start-up companies.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                  Our dedication in crafting custom professional websites that meet industry standards with the latest and innovative technologies has positioned us as one of the leading and best web design companies in Accra, Ghana to work with.
                </p>
                <div className="flex flex-wrap gap-4">
                  <GlassButton href="/about" variant="solid">More About Us</GlassButton>
                  <GlassButton href="/contact" variant="orange">Work With Us</GlassButton>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=90&w=1200&auto=format&fit=crop" alt="Celestial Web Solutions Team" className="w-full h-[400px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 to-transparent" />
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>3+</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Years Experience</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=90&w=2400&auto=format&fit=crop" alt="Team collaboration" fill sizes="100vw" quality={70} className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/95 via-orange-500/90 to-red-500/95" />
            <motion.div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" animate={{ scale: [1,1.2,1], rotate: [0,90,0] }} transition={{ duration: 10, repeat: Infinity }} />
            <motion.div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full" animate={{ scale: [1.2,1,1.2], rotate: [0,-90,0] }} transition={{ duration: 12, repeat: Infinity }} />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                Web Design Company Serving Accra, Keta, Ghana and across the Globe
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Celestial Web Solutions proudly serves clients across Accra, Keta, and all regions of Ghana.
              </h2>
              <p className="text-lg sm:text-xl text-orange-100 mb-10 max-w-2xl mx-auto" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                No matter your location, we provide professional web design and development services tailored to your business goals.<br /><br />
                Contact us today to get a professional website that helps your business grow online
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlassButton href="/contact" variant="light">Start Your Project</GlassButton>
                <GlassButton href="/portfolio" variant="light">View Our Work</GlassButton>
              </div>
            </motion.div>
          </div>
        </section>

        <WhatsAppButton />
      </div>
    </>
  );
};

export default IndexPage;