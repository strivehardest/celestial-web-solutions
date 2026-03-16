import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Head from "next/head";
import { ArrowRight, ExternalLink } from "lucide-react";
import projects from "../data/projects";
import WhatsAppButton from '../components/WhatsAppButton';

// Helper to convert .png/.jpg to .webp if available
const toWebp = (src) => {
  if (!src) return src;
  return src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
};

const GlassButton = ({ children, href, variant = "light" }) => {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-md border cursor-pointer";
  const variants = {
    light: "bg-white/20 hover:bg-white/30 border-white/30 text-white hover:shadow-lg hover:shadow-white/10",
    dark: "bg-black/20 hover:bg-black/30 border-black/20 text-gray-900 hover:shadow-lg",
    orange: "bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/30 text-orange-600 dark:text-orange-400 hover:shadow-lg hover:shadow-orange-500/20"
  };
  return (
    <Link href={href} className={`${baseClasses} ${variants[variant]}`} style={{ fontFamily: 'Google Sans, sans-serif' }}>
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

// ✅ NEW: Clean hover-reveal portfolio card
const PortfolioCard = ({ project, image, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <Link href={`/portfolio/${project.slug}`}>
        <div
          className="relative overflow-hidden rounded-xl cursor-pointer group"
          style={{ aspectRatio: '4/3' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Project Image */}
          <Image
            src={image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={index < 6}
          />

          {/* In Progress Badge */}
          {project.completionDate === "In Progress" && (
            <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-yellow-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-md">
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/>
              </svg>
              In Progress
            </div>
          )}

          {/* Hover Overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 z-10 flex flex-col justify-end"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)'
                }}
              >
                <motion.div
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="p-5"
                >
                  {/* Country flag */}
                  {project.clientCountry && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <CountryFlag country={project.clientCountry} />
                      <span className="text-white/60 text-xs" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                        {project.clientCountry}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className="text-white text-lg font-bold leading-tight mb-3"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                  >
                    {project.title}
                  </h3>

                  {/* View button */}
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-full transition-colors"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      View Project <ArrowRight size={12} />
                    </span>
                    {project.link && project.link !== "#" && project.completionDate !== "In Progress" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        <ExternalLink size={11} /> Live Site
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </motion.div>
  );
};

export default function Portfolio() {
  const portfolioImages = {
    'building-planner-designs': '/portfolio/desktop/building.png',
    'celestial-shopping': '/portfolio/desktop/celestial-shopping.png',
    'celestial-web-solutions': '/portfolio/desktop/celestial-web.png',
    'dl-auto-parts': '/portfolio/desktop/dlautos.png',
    'doeman-group': '/portfolio/desktop/doeman.jpeg',
    'adbay-store': '/portfolio/desktop/adbay.png',
    'elolo-agbleke-website': '/portfolio/desktop/elolo.png',
    'finance-tracker': '/portfolio/desktop/finance.png',
    'ghana-updates-online': '/portfolio/desktop/ghanaupdates.png',
    'myspace-furniture': '/portfolio/desktop/myspace.png',
    'valyd-homes': '/portfolio/desktop/valyd.png',
    'personal-portfolio-website': '/portfolio/desktop/waliu.png',
    'tru-seeds-africa': '/portfolio/desktop/trueseeds.png',
  };

  const [filter, setFilter] = useState("all");

  const categories = [
    "all", "business & corporate", "e-commerce & retail", "portfolio & personal",
    "news & media", "educational institutions", "ngos & nonprofits", "churches & religious",
    "finance & banking", "healthcare & wellness", "real estate & construction",
    "restaurants & hospitality", "marketplace & classifieds"
  ];

  const filteredProjects = filter === "all"
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
      });

  const happyClients = [
    { name: "Building Planner Designs", src: "/png/projects/building.png" },
    { name: "Ghana Updates Online", src: "/png/projects/ghanaupdates1.jpg" },
    { name: "AdBay Store", src: "/png/projects/Adbay1.png" },
    { name: "Elolo Agbleke", src: "/png/projects/elolo2.jpeg" },
    { name: "Mart Ban Logistics", src: "/png/projects/martb.png" },
    { name: "My Space Furniture", src: "/png/projects/myspace.png" },
    { name: "Valyd Homes", src: "/png/projects/valyd.png" },
    { name: "Doeman Group", src: "/png/projects/doeman.jpeg" },
    { name: "DL Auto Parts", src: "/png/projects/dl-auto-parts.png" },
    { name: "Tru Seeds Africa", src: "/png/projects/truseeds.webp" },
  ];

  return (
    <>
      <Head>
        <title>Portfolio | Celestial Web Solutions - Our Recent Projects</title>
        <meta name="description" content="Explore our portfolio of successful web development projects. See how we've helped businesses, NGOs, churches, educational institutions and more grow with custom websites, e-commerce solutions, and digital platforms." />
        <meta name="keywords" content="best web designer in accra and ghana, web development portfolio, website projects, e-commerce websites, Ghana web projects, Celestial Web Solutions work, NGO websites, church websites, educational websites, best web designer in accra" />
        <link rel="canonical" href="https://celestialwebsolutions.net/portfolio" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">

        {/* ── Hero Section ── */}
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
                transition={{ delay: 0.2 }} style={{ fontFamily: 'Google Sans, sans-serif' }}>
                OUR PORTFOLIO
              </motion.span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                Our Work Speaks
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> for Itself</span>
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl leading-relaxed mb-4"
                style={{ fontFamily: "Google Sans, sans-serif" }}>
                From sleek corporate websites to powerful e-commerce platforms — explore how we've helped businesses across Ghana, the U.S., and beyond establish a powerful online presence.
              </p>

              <p className="text-base text-gray-200 max-w-2xl leading-relaxed mb-8"
                style={{ fontFamily: "Google Sans, sans-serif" }}>
                Looking for the best web designer in Accra?{" "}
                <Link href="/best-web-designer-in-accra"
                  className="text-orange-300 font-semibold underline underline-offset-4 hover:text-orange-200">
                  Learn more
                </Link>.
              </p>

              <div className="flex flex-wrap gap-4">
                <GlassButton href="/contact" variant="light">Start Your Project</GlassButton>
                <GlassButton href="/web-design-company-in-ghana" variant="light">Our Services</GlassButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Filter + Grid ── */}
        <div className="max-w-7xl mx-auto px-4 py-12">

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <motion.button key={category} onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-xs ${
                  filter === category
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
                style={{ fontFamily: "Google Sans, sans-serif" }}>
                {category.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </motion.button>
            ))}
          </div>

          {/* ✅ NEW: 3-col desktop/tablet, 2-col mobile grid — no card details, hover to reveal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
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

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg" style={{ fontFamily: "Google Sans, sans-serif" }}>
                No projects found in this category yet. Check back soon!
              </p>
            </motion.div>
          )}

          {/* ── Happy Clients ── */}
          <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl mt-20 mb-12">
            <div className="max-w-7xl mx-auto px-4 mb-8">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                Our Happy Clients
              </motion.h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-8" style={{ fontFamily: "Google Sans, sans-serif" }}>
                Trusted by businesses across Ghana and abroad.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 justify-items-center items-center px-4">
              {happyClients.map((client, idx) => (
                <div key={`${client.name}-${idx}`} className="flex flex-col items-center justify-center w-full">
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={200}
                    height={120}
                    loading="lazy"
                    className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[240px] object-contain mx-auto mb-2"
                    style={client.name === 'Elolo Agbleke' ? { maxHeight: '60px' } : client.name === 'Ghana Updates Online' ? { maxHeight: '80px' } : {}}
                    style={client.name === 'Elolo Agbleke' ? { maxHeight: '60px' } : client.name === 'Ghana Updates Online' ? { maxHeight: '80px' } : client.name === 'Tru Seeds Africa' ? { maxHeight: '50px' } : {}}
                    unoptimized={false}
                  />
                  <span className="text-xs text-gray-700 dark:text-gray-300 mt-1 text-center" style={{ fontFamily: 'Google Sans, sans-serif' }}>{client.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA Section ── */}
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
                style={{ fontFamily: "Google Sans, sans-serif" }}>
                Let's create something amazing together. Whether it's a website, e-commerce platform, or custom web application, we're here to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlassButton href="/contact" variant="light">Start a Project</GlassButton>
                <GlassButton href="/pricing" variant="light">View Pricing</GlassButton>
              </div>
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-orange-100 text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>
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