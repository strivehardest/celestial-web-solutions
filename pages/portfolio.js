import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Head from "next/head";
import { ArrowRight } from "lucide-react";
import projects from "../data/projects";
import WhatsAppButton from '../components/WhatsAppButton';

// Typing effect phrases for portfolio
const typingPhrases = [
  'Websites',
  'E-Commerce Stores',
  'Web Applications',
  'Digital Platforms',
  'Business Solutions'
];

// Glass Button Component
const GlassButton = ({ children, href, variant = "light" }) => {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-md border cursor-pointer";
  const variants = {
    light: "bg-white/20 hover:bg-white/30 border-white/30 text-white hover:shadow-lg hover:shadow-white/10",
    dark: "bg-black/20 hover:bg-black/30 border-black/20 text-gray-900 hover:shadow-lg",
    orange: "bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/30 text-orange-600 dark:text-orange-400 hover:shadow-lg hover:shadow-orange-500/20"
  };

  return (
    <Link href={href}>
      <motion.span
        className={`${baseClasses} ${variants[variant]}`}
        style={{ fontFamily: 'Google Sans, sans-serif' }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
        <ArrowRight size={18} />
      </motion.span>
    </Link>
  );
};

// Country to flag code mapping
const countryFlags = {
  'Ghana': 'gh',
  'United States': 'us',
  'USA': 'us',
  'United Kingdom': 'gb',
  'UK': 'gb',
  'Nigeria': 'ng',
  'South Africa': 'za',
  'Kenya': 'ke',
  'Canada': 'ca',
  'Germany': 'de',
  'France': 'fr',
  'India': 'in',
  'Australia': 'au',
};

// CountryFlag component
const CountryFlag = ({ country }) => {
  const flagCode = countryFlags[country] || 'gh';
  return (
    <img 
      src={`https://flagcdn.com/w40/${flagCode}.png`}
      alt={country}
      className="w-5 h-4 object-cover rounded-sm inline-block"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
};

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  
  // Typing effect state
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
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
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  // Enhanced categories to match various service types
  const categories = [
    "all",
    "business & corporate",
    "e-commerce & retail",
    "portfolio & personal",
    "news & media",
    "educational institutions",
    "ngos & nonprofits",
    "churches & religious",
    "finance & banking",
    "healthcare & wellness",
    "real estate & construction",
    "restaurants & hospitality",
    "marketplace & classifieds"
  ];

  // Enhanced filtering logic
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => {
        const title = p.title.toLowerCase();
        const description = p.description.toLowerCase();
        const searchTerm = filter.toLowerCase();
        
        // Custom matching logic for different categories
        switch(filter) {
          case "business & corporate":
            return title.includes("business") || title.includes("solutions") || 
                   title.includes("corporate") || title.includes("company") ||
                   description.includes("business") || description.includes("corporate") ||
                   title.includes("web solutions") || title.includes("planner");
          
          case "finance & banking":
            return title.includes("bank") || title.includes("finance") || 
                   title.includes("financial") || title.includes("investment") ||
                   description.includes("banking") || description.includes("financial");
          
          case "healthcare & wellness":
            return title.includes("health") || title.includes("medical") || 
                   title.includes("clinic") || title.includes("hospital") ||
                   title.includes("wellness") || description.includes("healthcare") ||
                   description.includes("medical");
          
          case "real estate & construction":
            return title.includes("real estate") || title.includes("property") || 
                   title.includes("building") || title.includes("construction") ||
                   title.includes("planner") || description.includes("building") ||
                   description.includes("construction") || description.includes("planning");
          
          case "restaurants & hospitality":
            return title.includes("restaurant") || title.includes("hotel") || 
                   title.includes("cafe") || title.includes("hospitality") ||
                   title.includes("catering") || description.includes("restaurant") ||
                   description.includes("food") || description.includes("hospitality");
          
          case "educational institutions":
            return title.includes("school") || title.includes("university") || 
                   title.includes("college") || title.includes("education") ||
                   description.includes("educational");
          
          case "ngos & nonprofits":
            return title.includes("ngo") || title.includes("nonprofit") || 
                   title.includes("foundation") || title.includes("charity") ||
                   description.includes("nonprofit") || description.includes("ngo");
          
          case "churches & religious":
            return title.includes("church") || title.includes("ministry") || 
                   title.includes("chapel") || title.includes("chaplain") ||
                   description.includes("church") || description.includes("ministry") ||
                   description.includes("chaplain") || description.includes("motivational speaker");
          
          case "news & media":
            return title.includes("news") || title.includes("media") || 
                   title.includes("updates") || description.includes("news") ||
                   description.includes("radio") || description.includes("streaming");
          
          case "marketplace & classifieds":
            return title.includes("marketplace") || title.includes("classified") ||
                   title.includes("adbay") || description.includes("marketplace") ||
                   description.includes("buy and sell") || description.includes("classified");
          
          case "e-commerce & retail":
            return title.includes("commerce") || title.includes("shop") || 
                   title.includes("store") || description.includes("e-commerce") ||
                   description.includes("woocommerce") || description.includes("online booking") ||
                   description.includes("payment");
          
          case "portfolio & personal":
            return title.includes("portfolio") || description.includes("portfolio") ||
                   title.includes("personal");
          
          default:
            return title.includes(searchTerm) || description.includes(searchTerm);
        }
      });

  // Happy Clients Data
  const happyClients = [
    { name: "Building Planner Designs", logo: "/png/projects/building.png" },
    { name: "Ghana Updates Online", logo: "/png/projects/ghanaupdates1.jpg" },
    { name: "AdBay Store", logo: "/png/projects/Adbay1.png" },
    { name: "Elolo Agbleke", logo: "/png/projects/elolo2.jpeg" },
    { name: "Mart Ban Logistics", logo: "/png/projects/martb.png" },
    { name: "My Space Furniture", logo: "/png/projects/myspace.png" },
    { name: "Valyd", logo: "/png/projects/valyd.png" },
  ];
      {/* Happy Clients Section - Kava Style */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-8 text-gray-700 dark:text-gray-200" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
            Brands that trust us
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {happyClients.map((client, idx) => (
              <div key={client.name + idx} className="flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-14 w-auto max-w-[120px] object-contain"
                  loading="lazy"
                  decoding="async"
                  style={{ filter: 'none', background: 'none' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

  return (
    <>
      <Head>
        <title>Portfolio | Celestial Web Solutions - Our Recent Projects</title>
        <meta name="description" content="Explore our portfolio of successful web development projects. See how we've helped businesses, NGOs, churches, educational institutions and more grow with custom websites, e-commerce solutions, and digital platforms." />
        <meta name="keywords" content="web development portfolio, website projects, e-commerce websites, Ghana web projects, Celestial Web Solutions work, NGO websites, church websites, educational websites, best web designer in accra" />
        <link rel="canonical" href="https://celestialwebsolutions.net/portfolio" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section - Kava Style */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=90&w=2400&auto=format&fit=crop" 
              alt="Portfolio Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <motion.span 
                className="inline-block px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                OUR PORTFOLIO
              </motion.span>
              
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                We Build
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> {displayText}</span>
                <span className="text-orange-500 animate-pulse">|</span>
              </h1>
              
              <p
                className="text-xl text-gray-300 max-w-2xl leading-relaxed mb-8"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                Explore our collection of successful projects. From stunning websites to powerful e-commerce platforms - see how we bring ideas to life.
              </p>

              <div className="flex flex-wrap gap-4">
                <GlassButton href="/contact" variant="light">
                  Start Your Project
                </GlassButton>
                <GlassButton href="/services" variant="light">
                  Our Services
                </GlassButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter Buttons */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm ${
                  filter === category
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                {category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </motion.button>
            ))}
          </div>

          {/* Two Column Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/portfolio/${project.slug}`}>
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700"
                    whileHover={{ y: -5 }}
                  >
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* View Project Badge */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2">
                          View Project <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3
                          className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors"
                          style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                        >
                          {project.title}
                        </h3>
                        {project.clientCountry && (
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <CountryFlag country={project.clientCountry} />
                            <span>{project.clientCountry}</span>
                          </div>
                        )}
                      </div>
                      <p
                        className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2"
                        style={{ fontFamily: "Google Sans, sans-serif" }}
                      >
                        {project.description}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech && project.tech.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full font-medium"
                            style={{ fontFamily: "Google Sans, sans-serif" }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech && project.tech.length > 3 && (
                          <span
                            className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full font-medium"
                            style={{ fontFamily: "Google Sans, sans-serif" }}
                          >
                            +{project.tech.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p
                className="text-gray-500 dark:text-gray-400 text-lg"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                No projects found in this category yet. Check back soon!
              </p>
            </motion.div>
          )}

          {/* Happy Clients Section */}
          <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden rounded-3xl mt-20 mb-12">
            <div className="max-w-7xl mx-auto px-4 mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Our Happy Clients
              </motion.h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-8" style={{ fontFamily: "Google Sans, sans-serif" }}>
                Trusted by businesses across Ghana
              </p>
            </div>

            {/* Scrolling Container */}
            <div className="relative">
              <div className="flex animate-scroll">
                {/* First set of logos */}
                {happyClients.map((client, index) => (
                  <div
                    key={`client-1-${index}`}
                    className="flex-shrink-0 mx-8 w-48 h-32 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {happyClients.map((client, index) => (
                  <div
                    key={`client-2-${index}`}
                    className="flex-shrink-0 mx-8 w-48 h-32 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <style jsx>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .animate-scroll {
                animation: scroll 30s linear infinite;
              }
              .animate-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>
          </section>

          {/* Start a Project CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mt-20 py-24 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=90&w=2400&auto=format&fit=crop" 
                alt="CTA Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/95 via-orange-500/90 to-red-600/95"></div>
            </div>

            <div className="relative z-10 text-center px-4">
              <h2
                className="text-2xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Ready to Start Your Project?
              </h2>
              <p
                className="text-orange-100 mb-10 max-w-2xl mx-auto leading-relaxed text-lg"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                Let's create something amazing together. Whether it's a website, e-commerce platform, or custom web application, we're here to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlassButton href="/contact" variant="light">
                  Start a Project
                </GlassButton>
                <GlassButton href="/pricing" variant="light">
                  View Pricing
                </GlassButton>
              </div>
              
              {/* Additional Info */}
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-orange-100 text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Bottom Spacing */}
        <div className="pb-20"></div>
      </div>
      <WhatsAppButton />
    </>
  );
}