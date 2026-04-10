import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";
import { ArrowRight, ExternalLink } from "lucide-react";
import projects from "../data/projects";
import WhatsAppButton from '../components/WhatsAppButton';

const GlassButton = ({ children, href, variant = "light" }) => {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-md border cursor-pointer";
  const variants = {
    light: "bg-white/20 hover:bg-white/30 border-white/30 text-white hover:shadow-lg hover:shadow-white/10",
    dark: "bg-black/20 hover:bg-black/30 border-black/20 text-gray-900 hover:shadow-lg",
    orange: "bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/30 text-orange-600 dark:text-orange-400 hover:shadow-lg hover:shadow-orange-500/20"
  };
  return (
    <Link href={href} className={`${baseClasses} ${variants[variant]}`} style={{ fontFamily: 'Albert Sans, sans-serif' }}>
      {children}
      <ArrowRight size={18} />
    </Link>
  );
};

const countryFlags = {
  'Ghana': 'gh', 'United States': 'us', 'USA': 'us', 'United Kingdom': 'gb',
  'UK': 'gb', 'Nigeria': 'ng', 'South Africa': 'za', 'Kenya': 'ke',
  'Canada': 'ca', 'Germany': 'de', 'France': 'fr', 'India': 'in', 'Australia': 'au',
};

const CountryFlag = ({ country }) => {
  const flagCode = countryFlags[country] || 'gh';
  return (
    <img src={`https://flagcdn.com/w40/${flagCode}.png`} alt={country}
      className="w-5 h-4 object-cover rounded-sm inline-block"
      onError={(e) => { e.target.style.display = 'none'; }} />
  );
};

// ── Connective-style tall portrait card ──────────────────────────────────────
const PortfolioCard = ({ project, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <Link href={`/portfolio/${project.slug}`} className="group block">

        {/* ── Image container: tall portrait ── */}
        <div
          className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4"
          style={{ aspectRatio: '3 / 4' }}
        >
          <Image
            src={image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority={index < 6}
          />

          {/* Subtle dark vignette at bottom for readability */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none rounded-b-2xl" />

          {/* In Progress badge */}
          {project.completionDate === "In Progress" && (
            <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-yellow-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-md" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/>
              </svg>
              In Progress
            </div>
          )}

          {/* Hover: orange arrow pill bottom-right */}
          <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              View <ArrowRight size={12} />
            </span>
          </div>

          {/* Live site link — top right on hover */}
          {project.link && project.link !== "#" && project.completionDate !== "In Progress" && (
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-semibold px-2.5 py-1.5 rounded-full shadow hover:bg-white transition-colors"
              >
                <ExternalLink size={10} /> Live Site
              </a>
            </div>
          )}
        </div>

        {/* ── Title below image (always visible, like Connective) ── */}
        <div className="px-1">
          {/* Country flag */}
          {project.clientCountry && (
            <div className="flex items-center gap-1.5 mb-1.5">
              <CountryFlag country={project.clientCountry} />
              <span
                className="text-xs text-gray-400 dark:text-gray-500"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                {project.clientCountry}
              </span>
            </div>
          )}

          <h3
            className="text-base font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors leading-snug"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
          >
            {project.title}
          </h3>

          {project.category && (
            <p
              className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 capitalize"
              style={{ fontFamily: 'Albert Sans, sans-serif' }}
            >
              {project.category}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {

  const portfolioImages = {
    'building-planner-designs':   '/png/screenshots/buildingplanner.webp',
    'celestial-shopping':         '/png/screenshots/celestial-shopping.webp',
    'dl-auto-parts':              '/png/screenshots/dlautos-full.webp',
    'doeman-group':               '/png/projects/doeman.webp',
    'adbay-store':                '/png/screenshots/adbay-full.webp',
    'elolo-agbleke-website':      '/png/screenshots/elolo-full.webp',
    'finance-tracker':            '/png/screenshots/finance-tracker-full.webp',
    'ghana-updates-online':       '/png/screenshots/ghanaupdates-full.webp',
    'myspace-furniture':          '/png/screenshots/myspace-furniture.webp',
    'valyd-homes':                '/png/screenshots/valyd.webp',
    'personal-portfolio-website': '/png/screenshots/waliu-portfolio-full.webp',
    'tru-seeds-africa':           '/png/screenshots/truseeds.webp',
    'afrocinema':                   '/png/screenshots/afrocinema.webp',
  };

  const [filter, setFilter] = useState("all");

  const categories = [
    "all", "agriculture & farming", "business & corporate", "e-commerce & retail", "portfolio & personal",
    "news & media", "educational institutions", "ngos & nonprofits", "churches & religious",
    "finance & banking", "healthcare & wellness", "real estate & construction",
    "restaurants & hospitality", "marketplace & classifieds"
  ];

  const filteredProjects = (filter === "all"
    ? projects
    : projects.filter(p => {
        const category = (p.category || '').toLowerCase();
        const title = p.title.toLowerCase();
        const description = p.description.toLowerCase();
        const searchTerm = filter.toLowerCase();
        if (category === searchTerm) return true;
        switch (filter) {
          case "business & corporate":
            return category.includes("business") || category.includes("corporate") ||
              title.includes("solutions") || title.includes("planner") || title.includes("group");
          case "e-commerce & retail":
            return category.includes("e-commerce") || category.includes("retail") ||
              description.includes("woocommerce") || description.includes("checkout");
          case "portfolio & personal":
            return category.includes("portfolio") || category.includes("personal");
          case "news & media":
            return category.includes("news") || category.includes("media") ||
              description.includes("radio") || description.includes("streaming");
          case "marketplace & classifieds":
            return category.includes("marketplace") || category.includes("classified") ||
              title.includes("adbay");
          case "finance & banking":
            return category.includes("finance") || category.includes("banking");
          case "real estate & construction":
            return category.includes("real estate") || category.includes("construction") ||
              title.includes("homes") || title.includes("building");
          case "churches & religious":
            return description.includes("chaplain") || description.includes("motivational speaker") ||
              title.includes("church");
          case "ngos & nonprofits":
            return title.includes("foundation") || description.includes("nonprofit");
          case "educational institutions":
            return title.includes("school") || description.includes("educational");
          case "healthcare & wellness":
            return title.includes("health") || description.includes("healthcare");
          case "restaurants & hospitality":
            return title.includes("restaurant") || description.includes("food");
          default:
            return title.includes(searchTerm) || description.includes(searchTerm);
        }
      }))
    // Remove any project with 'Celestial Web Solutions' in title, client, or description
    .filter(p => {
      const t = (p.title || '').toLowerCase();
      const c = (p.client || '').toLowerCase();
      const d = (p.description || '').toLowerCase();
      return !(
        t.includes('celestial web solutions') ||
        c.includes('celestial web solutions') ||
        d.includes('celestial web solutions')
      );
    });

  const happyClients = [
    { name: "Building Planner Designs", src: "/png/projects/building.png" },
    { name: "Ghana Updates Online",    src: "/png/projects/ghanaupdates1.jpg" },
    { name: "AdBay Store",             src: "/png/projects/Adbay1.png" },
    { name: "Elolo Agbleke",           src: "/png/projects/elolo2.jpeg" },
    { name: "Mart Ban Logistics",      src: "/png/projects/martb.png" },
    { name: "My Space Furniture",      src: "/png/projects/myspace.png" },
    { name: "Valyd Homes",             src: "/png/projects/valyd.png" },
    { name: "Doeman Group",            src: "/png/projects/doeman.jpeg" },
    { name: "DL Auto Parts",           src: "/png/projects/dl-auto-parts.png" },
    { name: "Tru Seeds Africa",        src: "/png/projects/truseeds.webp" },
  ];

  return (
    <>
      <Head>
        <title>Portfolio | Celestial Web Solutions - Our Recent Projects</title>
        <meta name="description" content="Explore our portfolio of successful web development projects. See how we've helped businesses, NGOs, churches, educational institutions and more grow with custom websites, e-commerce solutions, and digital platforms." />
        <meta name="keywords" content="best web designer in accra and ghana, web development portfolio, website projects, e-commerce websites, Ghana web projects, Celestial Web Solutions work, NGO websites, church websites, educational websites, best web designer in accra" />
        <link rel="canonical" href="https://www.celestialwebsolutions.net/portfolio" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <video className="w-full h-full object-cover" src="/videos/hero6.mp4"
              autoPlay loop muted playsInline poster="/hero-bg.jpg" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-32">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }} className="max-w-3xl">

              <motion.span
                className="inline-block px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold mb-6"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }} style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                OUR PORTFOLIO
              </motion.span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                Our Work Speaks
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> for Itself</span>
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl leading-relaxed mb-4"
                style={{ fontFamily: "Albert Sans, sans-serif" }}>
                From sleek corporate websites to powerful e-commerce platforms — explore how we've helped businesses across Ghana, the U.S., and beyond establish a powerful online presence.
              </p>

              <p className="text-base text-gray-200 max-w-2xl leading-relaxed mb-8"
                style={{ fontFamily: "Albert Sans, sans-serif" }}>
                Looking for the best web designer in Accra?{" "}
                <Link href="/best-web-designer-in-accra"
                  className="text-orange-300 font-semibold underline underline-offset-4 hover:text-orange-200">
                  Learn more
                </Link>.
              </p>

              {/* ── Review Badges — Full Width Strip ── */}
              <section className="relative z-20 w-full max-w-4xl mx-auto mb-10">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/15 backdrop-blur-md shadow-xl shadow-black/20">
                  {/* 1. Trustpilot */}
                  <a
                    href="https://www.trustpilot.com/review/celestialwebsolutions.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Celestial Web Solutions on Trustpilot"
                    className="group flex flex-col items-center justify-center gap-1.5 bg-white/8 hover:bg-white/15 transition-all duration-300 py-4 px-3 text-center"
                  >
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#00B67A">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-white text-xs font-bold leading-none" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                      <span className="text-[#00B67A]">Excellent</span> 4.9/5
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <svg viewBox="0 0 111 110" className="w-3 h-3" fill="#00B67A">
                        <path d="M55.5 0L68.2 40.2H110.6L77.7 65.1L90.4 105.3L55.5 80.4L20.6 105.3L33.3 65.1L0.4 40.2H42.8Z"/>
                      </svg>
                      <span className="text-white/50 text-[10px] tracking-wide" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Trustpilot</span>
                    </div>
                  </a>
                  {/* 2. Google Reviews */}
                  <a
                    href="https://www.google.com/maps/place/Celestial+Web+Solutions/@5.883579,0.9829622,17z/data=!4m6!3m5!1s0x1021710073fe6fff:0x96453357ca880329!8m2!3d5.8836217!4d0.9828871!16s%2Fg%2F11lf36fzj1?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Celestial Web Solutions on Google Reviews"
                    className="group flex flex-col items-center justify-center gap-1.5 bg-white/8 hover:bg-white/15 transition-all duration-300 py-4 px-3 text-center"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-white text-xs font-bold leading-none" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                      <span className="text-yellow-400">4.9</span> / 5 stars
                    </p>
                    <span className="text-white/50 text-[10px] tracking-wide" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Google Reviews</span>
                  </a>
                  {/* 3. DesignRush */}
                  <a
                    href="https://www.designrush.com/agency/profile/celestial-web-solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Celestial Web Solutions on DesignRush"
                    className="group flex flex-col items-center justify-center gap-1.5 bg-white/8 hover:bg-white/15 transition-all duration-300 py-4 px-3 text-center"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img src="/designrush.png" alt="DesignRush" className="w-9 h-9 object-contain" />
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-white text-xs font-bold leading-none" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                      <span className="text-blue-400">Top Agency</span>
                    </p>
                    <span className="text-white/50 text-[10px] tracking-wide" style={{ fontFamily: 'Albert Sans, sans-serif' }}>DesignRush</span>
                  </a>
                  {/* 4. Clutch */}
                  <a
                    href="https://clutch.co/profile/celestial-web-solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Celestial Web Solutions on Clutch"
                    className="group flex flex-col items-center justify-center gap-1.5 bg-white/8 hover:bg-white/15 transition-all duration-300 py-4 px-3 text-center"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img src="/clutch-logo.png" alt="Clutch" className="w-9 h-9 object-contain" />
                    </div>
                    <div className="flex items-center gap-0.5 opacity-40">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    {/* Hide rating text since no reviews yet */}
                    <span className="text-white/50 text-[10px] tracking-wide" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Clutch</span>
                  </a>
                </div>
              </section>

              <div className="flex flex-wrap gap-4">
                <GlassButton href="/contact" variant="light">Start Your Project</GlassButton>
                <GlassButton href="/web-design-company-in-ghana" variant="light">Our Services</GlassButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Filter + Grid ─────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 py-16">

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {categories.map((category) => (
              <motion.button key={category} onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-xs ${
                  filter === category
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
                style={{ fontFamily: "Albert Sans, sans-serif" }}>
                {category.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </motion.button>
            ))}
          </div>

          {/* ── Connective-style 3-col portrait grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <PortfolioCard
                  key={project.slug}
                  project={project}
                  image={portfolioImages[project.slug]}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg" style={{ fontFamily: "Albert Sans, sans-serif" }}>
                No projects found in this category yet. Check back soon!
              </p>
            </motion.div>
          )}

          {/* ── Happy Clients ─────────────────────────────────────────────── */}
          <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl mt-24 mb-12">
            <div className="max-w-7xl mx-auto px-4 mb-8">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                Our Happy Clients
              </motion.h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-8" style={{ fontFamily: "Albert Sans, sans-serif" }}>
                Trusted by businesses across Ghana and abroad.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 justify-items-center items-center px-4">
              {happyClients.map((client, idx) => {
                // Decrease logo size for Elolo Agbleke and Tru Seeds Africa
                const isSmallLogo = client.name === "Elolo Agbleke" || client.name === "Tru Seeds Africa";
                const imgClass = isSmallLogo
                  ? "h-10 sm:h-12 md:h-16 lg:h-20 w-auto max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px] object-contain mx-auto mb-2"
                  : "h-16 sm:h-20 md:h-24 lg:h-32 w-auto max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[240px] object-contain mx-auto mb-2";
                return (
                  <div key={`${client.name}-${idx}`} className="flex flex-col items-center justify-center w-full">
                    <Image
                      src={client.src}
                      alt={client.name}
                      width={isSmallLogo ? 100 : 200}
                      height={isSmallLogo ? 60 : 120}
                      loading="lazy"
                      className={imgClass}
                      unoptimized={false}
                    />
                    <span className="text-xs text-gray-700 dark:text-gray-300 mt-1 text-center" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{client.name}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── CTA ───────────────────────────────────────────────────────── */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="relative mt-20 py-24 rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=90&w=2400&auto=format&fit=crop"
                alt="CTA Background" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/95 via-orange-500/90 to-red-600/95" />
            </div>
            <div className="relative z-10 text-center px-4">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                Ready to Start Your Project?
              </h2>
              <p className="text-orange-100 mb-10 max-w-2xl mx-auto leading-relaxed text-lg"
                style={{ fontFamily: "Albert Sans, sans-serif" }}>
                Let's create something amazing together. Whether it's a website, e-commerce platform, or custom web application, we're here to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlassButton href="/contact" variant="light">Start a Project</GlassButton>
                <GlassButton href="/pricing" variant="light">View Pricing</GlassButton>
              </div>
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-orange-100 text-sm" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                {["Free Consultation", "24/7 Support", "Fast Delivery"].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        <div className="pb-20" />
      </div>
      <WhatsAppButton />
    </>
  );
}