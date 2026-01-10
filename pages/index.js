// Happy Clients data (same as About/Portfolio)
const happyClients = [
  { name: "Building Planner Designs", src: "/png/projects/building.png" },
  { name: "Ghana Updates Online", src: "/png/projects/ghanaupdates1.jpg" },
  { name: "AdBay Store", src: "/png/projects/Adbay1.png" },
  { name: "Elolo Agbleke", src: "/png/projects/elolo2.jpeg" },
  { name: "Mart Ban Logistics", src: "/png/projects/martb.png" },
  { name: "My Space Furniture", src: "/png/projects/myspace.png" },
  { name: "Valyd", src: "/png/projects/valyd.png" },
  { name: "Doeman", src: "/png/projects/doeman.jpeg" }
];
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Monitor, Search, ShoppingCart, ArrowRight, Zap, CheckCircle } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import WhatsAppButton from '../components/WhatsAppButton';
import PremiumCTA, { TextCTA } from '../components/PremiumCTA';
import CTASection from '../components/CTASection';

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
    <Link href={href}>
      <motion.span
        className={`${baseClasses} ${variants[variant]} ${className}`}
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

// SEO Component with Next.js Head
const SEOHead = () => {
  return (
    <Head>
      <title>Best Web Design Company in Ghana | Celestial Web Solutions</title>
      <meta name="description" content="Celestial Web Solutions is a leading web design company in Ghana offering professional website design, e-commerce development, SEO, and digital solutions for businesses."/>
      <meta name="keywords" content="web design company in Ghana, web development company in Ghana, website designers in Ghana, web development company Ghana, SEO services in Ghana, e-commerce website Ghana, web designer in Accra, web designer in Keta, web design company in Accra, web designer in Accra Ghana, web design company in Keta, website design services Ghana, e-commerce website development Ghana, business website design Ghana, affordable web design Ghana" />
      <meta name="author" content="Celestial Web Solutions" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="geo.region" content="GH" />
      <meta name="geo.placename" content="Accra, Ghana" />
      <meta name="geo.position" content="5.6037;-0.1870" />
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content="Best Web Design Company in Ghana | Celestial Web Solutions"/>
      <meta property="og:description" content="Celestial Web Solutions is a leading web design company in Ghana providing professional website design, web development, e-commerce solutions, and SEO services for businesses." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://celestialwebsolutions.net" />
      <meta property="og:image" content="https://celestialwebsolutions.net/og-image.jpg" />
      <meta property="og:site_name" content="Celestial Web Solutions" />
      <meta property="og:locale" content="en_GH" />
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Best Web Design Company in Ghana | Celestial Web Solutions" />
      <meta name="twitter:description" content="Celestial Web Solutions is a leading web design company in Ghana providing professional website design, web development, e-commerce solutions, and SEO services for businesses." />
      <meta name="twitter:image" content="https://celestialwebsolutions.net/twitter-image.jpg" />
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#FF6B00" />
      <meta name="ICBM" content="5.6037, -0.1870" />
      <meta name="language" content="en-GH" />
      <meta name="country" content="GH" />
      
      <link rel="canonical" href="https://celestialwebsolutions.net" />
      <link rel="alternate" hrefLang="en-GH" href="https://celestialwebsolutions.net" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebDesignCompany",
            "name": "Celestial Web Solutions",
            "description": "Celestial Web Solutions is a leading web design company in Ghana providing professional website design, web development, e-commerce solutions, and SEO services for businesses.",
            "url": "https://celestialwebsolutions.net",
            "logo": "https://celestialwebsolutions.net/logo.png",
            "image": "https://celestialwebsolutions.net/og-image.jpg",
            "telephone": "+233-245671832",
            "email": "info@celestialwebsolutions.net",
            "areaServed": ["Accra", "Keta", "Ghana", "West Africa"],
            "priceRange": "GHC",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+233-245671832",
              "contactType": "Customer Service",
              "areaServed": "GH",
              "availableLanguage": "English"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "235 Agblor Link, Keta",
              "addressLocality": "Accra",
              "addressRegion": "Greater Accra",
              "postalCode": "DS 1742",
              "addressCountry": "GH"
            },
            "sameAs": [
              "https://facebook.com/celestialwebsolutions",
              "https://twitter.com/strivehardest",
              "https://linkedin.com/in/aforlabi"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "30"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Web Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": "Custom web development services in Ghana"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Design",
                    "description": "Professional web design services in Accra and Ghana"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-Commerce Solutions",
                    "description": "E-commerce development and online store creation in Ghana"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "SEO Optimization",
                    "description": "SEO services and digital marketing in Ghana"
                  }
                }
              ]
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
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' }
    ]
  },
  {
    title: "E-commerce & Payments",
    description: "Complete e-commerce solutions with secure payment integrations",
    color: "from-purple-500 to-purple-600",
    items: [
      {
  name: 'WooCommerce', 
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg' 
},
{ 
  name: 'Shopify', 
  icon: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' 
},
{ name: 'Paystack', icon: 'https://website-v3-assets.s3.amazonaws.com/assets/img/hero/Paystack-mark-white-twitter.png' },
{ 
  name: 'Flutterwave', 
  icon: 'https://play-lh.googleusercontent.com/qIVVU7H--GiVAPbvasD1kIdmiDaRroK3J5g5uYdd-O8XHlC_MwSro1JhZRe06l18FIc=w480-h960-rw' 
}


    ]
  },
  {
    title: "Backend Development",
    description: "Robust server solutions with Node.js, Python, and databases",
    color: "from-blue-600 to-blue-700",
    items: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' }
    ]
  },
  {
    title: "Design & Tools",
    description: "Modern design and development tools for optimal workflow",
    color: "from-orange-500 to-orange-600",
    items: [
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'TailwindCSS', icon: 'https://getlogovector.com/wp-content/uploads/2021/01/tailwind-css-logo-vector.png' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { name: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' }
    ]
  }
];

// Hero slideshow images - Featuring actual project screenshots
const heroImages = [
  {
    image: '/png/screenshots/myspace-furniture-full.png',
    title: 'My Space Furniture',
    category: 'E-Commerce',
    link: '/portfolio/myspace-furniture'
  },
  {
    image: '/png/screenshots/ghanaupdates-full.png',
    title: 'Ghana Updates Online',
    category: 'News & Media',
    link: '/portfolio/ghana-updates-online'
  },
  {
    image: '/png/screenshots/elolo-full.png',
    title: 'Elolo Agbleke Portfolio',
    category: 'Personal Website',
    link: '/portfolio/elolo-agbleke-website'
  },
  {
    image: '/png/screenshots/finance-tracker-full.png',
    title: 'Finance Tracker',
    category: 'Web Application',
    link: '/portfolio/finance-tracker'
  },
  {
    image: '/png/screenshots/celestial-shopping.png',
    title: 'Celestial Shopping',
    category: 'E-Commerce',
    link: '/portfolio/celestial-shopping'
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

const IndexPage = () => {
    // Hero overlay portfolio state
    const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentPortfolioIndex((prev) => (prev + 1) % heroImages.length);
      }, 5000); // Change every 5 seconds
      return () => clearInterval(interval);
    }, []);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  
  // Hero video state
  const heroVideos = [
    '/videos/hero1.mp4', 
    '/videos/hero2.mp4', 
  ];
  const [showFirstVideo, setShowFirstVideo] = useState(true);
  const videoRef = useCallback((node) => {
    if (node) {
      node.currentTime = 0;
      node.play();
    }
  }, [showFirstVideo]);
  const handleVideoEnd = () => {
    if (showFirstVideo) {
      setShowFirstVideo(false);
    } else {
      setShowFirstVideo(true); // Loop back to the first video
    }
  };
  
  // Typing effect state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle scroll effect for any scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Removed auto-scroll images effect

  // Typing effect
  useEffect(() => {
    const currentPhrase = typingPhrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          // Pause before deleting
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

  // Navigation function using Next.js router
  const handleNavigation = (path) => {
    router.push(path);
  };

  // Portfolio data
  const portfolioItems = [
    { 
      title: "My Space Furniture", 
      category: "Furniture E-Commerce", 
      description: "Modern furniture with various categories like mattresses, sofas, chairs, tables, and home decor items.",
      tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
      link: "/portfolio/myspace-furniture",
      images: {
        main: "/png/projects/myspace-furniture.png",
        gallery: [
          "/png/screenshots/myspace-furniture-full.png"
        ]
      }
    },
    { 
      title: "Finance Tracker", 
      category: "Personal Projects", 
      description: "A personal finance tracking web application that helps users manage their income, expenses, and budgets with intuitive visualizations and reporting features",
      tech: ["Django", "Python", "HTML5", "CSS3"],
      link: "/portfolio/finance-tracker",
      images: {
        main: "/png/projects/finance-tracker.png",
        gallery: [
          "/png/screenshots/finance-tracker-full.png"
        ]
      }
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Rev. Frank Ntow Gyan",
      company: "Building Planner Designs Limited",
      role: "CEO",
      text: "Working with Celestial Web Solutions was incredible! They transformed our outdated website into a modern, user-friendly platform. Our online sales have increased by 200% since the launch.",
      rating: 5,
      image: "/testimonials/frank.jpg"
    },
    {
      name: "Righteous Semahar",
      company: "RAK Foundation",
      role: "CEO",
      text: "Expertise in Web Development, their services are excellent.",
      rating: 5,
      image: "/testimonials/righteous.jpg"
    },
    {
      name: "Elolo Agbleke",
      company: "Keta Institute of Technology",
      role: "Program Manager, COO",
      text: "Excellent web development company! Celestial Web Solutions helped me in creating a personal website.",
      rating: 5,
      image: "/testimonials/elolo.jpg"
    }
  ];

  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section with Auto-Scroll Images and Typing Effect */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Sequential Hero Videos */}
          <div className="absolute inset-0">
            <video
              key={showFirstVideo ? 'video1' : 'video2'}
              ref={videoRef}
              src={showFirstVideo ? heroVideos[0] : heroVideos[1]}
              className="w-full h-full object-cover object-top"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
            />
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          
          {/* Project Info Overlay - Bottom Left (desktop), Top for mobile) */}
          <div>
            <div className="hidden sm:block absolute bottom-20 left-8 z-20">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-xs">
                <span 
                  className="text-orange-400 text-xs font-semibold tracking-wider uppercase"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  {heroImages[currentPortfolioIndex].category}
                </span>
                <h3 
                  className="text-white text-xl font-bold mt-1 mb-3"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                >
                  {heroImages[currentPortfolioIndex].title}
                </h3>
                <Link 
                  href={heroImages[currentPortfolioIndex].link}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  View Case Study <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            {/* Mobile overlay edited */}
          </div>
          
          {/* Image Indicators - Below Project Info */}
          {/* Removed image indicators since hero is now video */}
          
          {/* Floating Code Elements - Hidden on mobile for cleaner look */}
          <div className="absolute inset-0 overflow-hidden hidden md:block">
            {/* Animated Code Snippets */}
            <div className="absolute top-20 left-10 text-orange-300/30 text-sm font-mono animate-pulse">
              const company = "Celestial Web Solutions";
            </div>
            <div className="absolute top-40 right-20 text-orange-400/40 text-xs font-mono animate-pulse" style={{animationDelay: '1s'}}>
              NextJS.createApp()
            </div>
            <div className="absolute bottom-32 left-32 text-orange-200/30 text-sm font-mono animate-pulse" style={{animationDelay: '2s'}}>
              function buildWebsite() {"{"}
            </div>
            <div className="absolute bottom-52 right-16 text-orange-300/35 text-xs font-mono animate-pulse" style={{animationDelay: '3s'}}>
              Django.models.create()
            </div>
            <div className="absolute top-60 left-1/4 text-orange-400/30 text-xs font-mono animate-pulse" style={{animationDelay: '4s'}}>
              React.render(solution)
            </div>
            <div className="absolute bottom-40 right-1/3 text-orange-200/35 text-sm font-mono animate-pulse" style={{animationDelay: '5s'}}>
              return success;
            </div>
    
            {/* Animated Background Elements */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/30 to-orange-600/30 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-300/30 to-red-400/30 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full opacity-30 animate-spin" style={{animationDuration: '20s'}}></div>
    
            {/* Binary Code Rain Effect */}
            <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-orange-400/20 via-orange-500/10 to-transparent animate-pulse"></div>
            <div className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-orange-300/20 via-orange-400/10 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-orange-500/15 via-orange-400/8 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
          </div>
  
          {/* Mobile-only simplified background elements */}
          <div className="absolute inset-0 overflow-hidden md:hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-tr from-orange-300/20 to-red-400/20 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
  
          <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Developer Badge - Responsive text and padding */}
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-orange-300/30 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full mb-6 sm:mb-8 text-xs sm:text-sm font-semibold"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="hidden sm:inline">Full Stack Development</span>
                <span className="sm:hidden">Full Stack Dev</span>
                <span className="animate-pulse">●</span>
                <span className="hidden sm:inline">Available for Projects</span>
                <span className="sm:hidden">Available</span>
              </motion.div>
              
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 text-white drop-shadow-2xl leading-tight"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Best Web Design Company in Ghana
              </motion.h1>


              

              
              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto px-2"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                From concept to deployment, we build scalable web applications that drive business growth. 
                Let's turn your vision into digital reality.
              </motion.p>
              
              {/* Enhanced Call to Action Buttons - GLASS STYLE */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 pb-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <GlassButton href="/contact" variant="solid">
                  Let's Build Together
                </GlassButton>

                <GlassButton href="/portfolio" variant="light">
                  View Our Work
                </GlassButton>
              </motion.div>
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
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                Celestial Web Solutions is a professional web design and development company in Ghana, helping businesses grow online with modern, responsive, and SEO-friendly websites.
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                We specialize in website design, custom web development, e-commerce solutions, and search engine optimization for businesses across Accra, Keta, and Ghana.
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                As a trusted website design company in Ghana, we work with startups, SMEs, and established businesses across Accra, Keta, and other parts of Ghana, delivering custom digital solutions that drive growth.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Happy Clients Section - 4-Grid Kava Style */}
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
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    className="h-32 w-auto max-w-[280px] object-contain transition-colors duration-200 group-hover:bg-black group-hover:grayscale"
                    loading="lazy"
                    decoding="async"
                    style={
                      client.name === 'Elolo Agbleke'
                        ? { maxHeight: '60px', filter: 'none', background: 'none' }
                        : client.name === 'Ghana Updates Online'
                        ? { maxHeight: '80px', filter: 'none', background: 'none' }
                        : { filter: 'none', background: 'none' }
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section - Enhanced with Images */}
        <section className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                WHAT WE DO
              </motion.span>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Our Core Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg"
                 style={{ fontFamily: 'Google Sans, sans-serif' }}>
                Comprehensive digital solutions to transform your business presence
              </p>
            </motion.div>

            {/* Detailed Service Descriptions */}
            {/* (Removed empty div that caused unclosed tag error) */}

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
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <motion.div
                      className="relative h-72 lg:h-96 rounded-3xl overflow-hidden shadow-2xl group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Service Icon Badge */}
                      <motion.div 
                        className="absolute top-6 left-6 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/30"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <service.icon className="w-7 h-7 text-white" />
                      </motion.div>

                      {/* Service Number */}
                      <div className="absolute bottom-6 right-6 text-7xl font-bold text-white/10" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                        0{index + 1}
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 space-y-5">
                    <span 
                      className="text-orange-500 font-semibold text-sm tracking-wider"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      SERVICE 0{index + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white"
                        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      {service.title}
                    </h3>
                    {/* Custom detailed descriptions for each service */}
                    {index === 0 && (
                      <>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          We offer professional website design services in Ghana tailored to meet the needs of businesses in different industries. Our websites are designed to be user-friendly, visually engaging, and conversion-focused.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          Whether you need a business website, portfolio website, or corporate website, Celestial Web Solutions ensures your website reflects your brand and builds trust with your audience.
                        </p>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          As a reliable web development company in Ghana, we build custom websites and web applications that are secure, scalable, and performance-driven. Our development process focuses on clean code, fast loading speeds, and seamless user experience.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          We work with modern technologies to deliver reliable web solutions for businesses looking to grow online in Ghana and beyond.
                        </p>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          Looking to sell online? We provide e-commerce website development in Ghana for businesses that want to reach more customers and increase sales.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          Our e-commerce solutions include:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 text-lg mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          <li>Online stores</li>
                          <li>Secure payment integration</li>
                          <li>Product management systems</li>
                          <li>Mobile-friendly shopping experiences</li>
                        </ul>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          We help businesses launch professional online stores that are easy to manage and optimized for sales.
                        </p>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          A great website is useless without visibility. Our SEO services in Ghana help businesses rank higher on Google and attract organic traffic.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          Our SEO services include:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 text-lg mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          <li>On-page SEO optimization</li>
                          <li>Keyword research</li>
                          <li>Technical SEO</li>
                          <li>Local SEO for Ghanaian businesses</li>
                        </ul>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          We design and optimize websites with SEO in mind, ensuring long-term online growth.
                        </p>
                      </>
                    )}
                    <div className="pt-2">
                      <GlassButton href={service.link} variant="orange">
                        Learn More
                      </GlassButton>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Services CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <GlassButton href="/web-design-company-in-ghana" variant="solid">
                View All Services
              </GlassButton>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section - Enhanced */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                OUR WORK
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                 style={{ fontFamily: 'Google Sans, sans-serif' }}>
                Showcasing our latest work and the innovative solutions we've created for our clients
              </p>
            </motion.div>
            
            <div className="space-y-16">
              {portfolioItems.slice(0, 2).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.15 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                >
                  {/* Image Column */}
                  <div className="w-full lg:w-1/2">
                    <motion.div
                      className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-2xl group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={item.images.main}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(item.title)}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-6 left-6 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white text-sm font-semibold shadow-lg">
                        {item.category}
                      </div>

                      {/* Hover Overlay with View Button */}
                      <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Link href={item.link}>
                          <motion.span 
                            className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold inline-flex items-center gap-2"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                            whileHover={{ scale: 1.05 }}
                          >
                            View Project <ArrowRight className="w-4 h-4" />
                          </motion.span>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Content Column */}
                  <div className="w-full lg:w-1/2 relative">
                    <div className="relative rounded-3xl overflow-hidden min-h-[400px]">
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <img
                          src={item.images.main}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-orange-900/60"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative p-8 md:p-10 space-y-5 h-full flex flex-col justify-center">
                        <span 
                          className="text-orange-400 font-semibold text-sm tracking-wider"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          PROJECT 0{index + 1}
                        </span>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white"
                            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                          {item.title}
                        </h3>
                        <p className="text-gray-200 text-lg leading-relaxed"
                           style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tech.map((tech, techIndex) => (
                            <motion.span 
                              key={techIndex} 
                              className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30 hover:border-orange-400/50 transition-colors"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                              whileHover={{ scale: 1.05, y: -2 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                        <div className="pt-2">
                          <GlassButton href={item.link} variant="light">
                            View Project
                          </GlassButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <GlassButton href="/portfolio" variant="solid">
                View All Projects
              </GlassButton>
            </motion.div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                INSIGHTS & TIPS
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Latest Blog Articles
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                 style={{ fontFamily: 'Google Sans, sans-serif' }}>
                Expert insights, tips, and guides to help your business thrive online
              </p>
            </motion.div>

            {/* Blog Cards Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  title: "Top 15 AI Tools Revolutionizing Web Development in 2026",
                  excerpt: "Explore the latest AI-powered tools transforming web development. From code generation to design automation, discover how AI is making development faster and more efficient.",
                  category: "AI & Technology",
                  date: "January 10, 2026",
                  readTime: "9 min read",
                  slug: "ai-tools-web-development-2026",
                  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop"
                },
                {
                  title: "How to Choose the Best Web Design Company in Ghana (2026 Guide)",
                  excerpt: "Learn what to look for when hiring a web design company in Ghana. Discover key factors like experience, SEO optimization, mobile responsiveness, and transparent pricing.",
                  category: "Web Design",
                  date: "January 10, 2026",
                  readTime: "6 min read",
                  slug: "how-to-choose-best-web-design-company-ghana-2026",
                  image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&h=600&fit=crop"
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
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/600x300?text=${encodeURIComponent(article.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white text-xs font-semibold">
                      {article.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
                        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow"
                       style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      {article.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          {article.date}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          {article.readTime}
                        </span>
                      </div>
                      <Link href={`/blog/${article.slug}`}>
                        <motion.span
                          className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold text-sm hover:gap-3 transition-all"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                          whileHover={{ x: 5 }}
                        >
                          Read More <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Articles CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <GlassButton href="/blog" variant="solid">
                View All Articles
              </GlassButton>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Our Technology Stack
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                 style={{ fontFamily: 'Google Sans, sans-serif' }}>
                Modern tools and technologies we use to build exceptional digital experiences
              </p>
            </motion.div>

            {/* Tech Stack Categories */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-12">
              {techStackCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`h-1 w-full bg-gradient-to-r ${category.color} rounded-full mb-4`}></div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2"
                      style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    {category.title}
                  </h3>
                </motion.div>
              ))}
            </div>

            {/* Scrolling Tech Stack */}
            <div className="relative w-full overflow-hidden">
              <div className="absolute left-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
              
              <style jsx>{`
                @keyframes scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                  animation: scroll 30s linear infinite;
                }
                .animate-scroll:hover {
                  animation-play-state: paused;
                }
                @media (max-width: 640px) {
                  .animate-scroll {
                    animation-duration: 20s;
                  }
                }
              `}</style>
              
              <div className="flex space-x-4 sm:space-x-12 overflow-hidden py-8">
                <div className="flex space-x-4 sm:space-x-12 animate-scroll">
                  {[...techStackCategories, ...techStackCategories].map((category, index) => (
                    <div key={`${category.title}-${index}`} className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                      {category.items.map((item, itemIndex) => (
                        <motion.div
                          key={`${item.name}-${index}-${itemIndex}`}
                          className="flex flex-col items-center w-16 sm:w-20 flex-shrink-0"
                          whileHover={{ y: -5, scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 flex items-center justify-center hover:shadow-xl hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                            <img
                              src={item.icon}
                              alt={item.name}
                              className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium text-center">
                            {item.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold mb-6"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                TESTIMONIALS
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                 style={{ fontFamily: 'Google Sans, sans-serif' }}>
                Don't just take our word for it - hear from satisfied clients who've experienced transformative results
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-orange-500/30 transition-all duration-500 group"
                  whileHover={{ y: -8 }}
                >
                  {/* Large Quote Mark */}
                  <div className="absolute -top-4 -left-2 text-8xl text-orange-500/20 font-serif leading-none select-none">
                    "
                  </div>
                  
                  {/* Stars */}
                  <div className="flex mb-6 relative z-10">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 relative z-10"
                     style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    {testimonial.text}
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center relative z-10">
                    <div className="relative w-14 h-14 mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-full ring-2 ring-orange-500/50"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=FF6B00&color=fff`;
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg"
                          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                        {testimonial.name}
                      </h4>
                      <p className="text-orange-400 text-sm font-medium"
                         style={{ fontFamily: 'Google Sans, sans-serif' }}>
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                  
                  {/* Closing Quote */}
                  <div className="absolute -bottom-6 -right-2 text-8xl text-orange-500/20 font-serif leading-none select-none rotate-180">
                    "
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section - Kava Style */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Best in Web Design in Ghana
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                A Website Design & Creative<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Marketing Agency</span> in Ghana
              </h2>

              {/* Why Choose Celestial Web Solutions Section */}
              <div className="max-w-3xl mx-auto mt-10 mb-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  Why Choose Celestial Web Solutions
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-4" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  Businesses choose Celestial Web Solutions because we deliver quality, reliability, and results.
                </p>
                <ul className="list-none space-y-2 text-left inline-block mx-auto mb-4">
                  <li className="flex items-center text-base text-gray-700 dark:text-gray-200"><CheckCircle className="w-5 h-5 text-orange-500 mr-2" /> Experienced web designers and developers</li>
                  <li className="flex items-center text-base text-gray-700 dark:text-gray-200"><CheckCircle className="w-5 h-5 text-orange-500 mr-2" /> Affordable website design packages</li>
                  <li className="flex items-center text-base text-gray-700 dark:text-gray-200"><CheckCircle className="w-5 h-5 text-orange-500 mr-2" /> SEO-friendly websites</li>
                  <li className="flex items-center text-base text-gray-700 dark:text-gray-200"><CheckCircle className="w-5 h-5 text-orange-500 mr-2" /> Mobile-responsive designs</li>
                  <li className="flex items-center text-base text-gray-700 dark:text-gray-200"><CheckCircle className="w-5 h-5 text-orange-500 mr-2" /> Client-focused approach</li>
                </ul>
                <p className="text-base text-gray-700 dark:text-gray-200" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  We are committed to helping businesses succeed online with professional digital solutions.
                </p>
              </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed"
                   style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  Celestial Web Solutions based in Accra, Ghana is a website design and digital marketing 
                  company with years of experience on the Ghanaian market. We have had the privilege of 
                  working with award winning clients and international prestigious companies as well as start-up companies.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed"
                   style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  Our dedication in crafting custom professional websites that meet industry standards with 
                  the latest and innovative technologies has positioned us as one of the leading and best 
                  web design companies in Accra, Ghana to work with.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed"
                   style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  Our design and development teams never stop learning. We are committed to continuous 
                  learning and improvement to better solve complex challenges for our clients with measurable results.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <GlassButton href="/about" variant="solid">
                    More About Us
                  </GlassButton>
                  <GlassButton href="/contact" variant="orange">
                    Work With Us
                  </GlassButton>
                </div>
              </motion.div>
              
              {/* Right Column - Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=90&w=1200&auto=format&fit=crop"
                    alt="Celestial Web Solutions Team"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 to-transparent"></div>
                </div>
                
                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>3+</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Google Sans, sans-serif' }}>Years Experience</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* CTA Section - Glass Style */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=90&w=2400&auto=format&fit=crop" 
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/95 via-orange-500/90 to-red-500/95"></div>
            
            {/* Decorative Elements */}
            <motion.div 
              className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full"
              animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span 
                className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Web Design Company Serving Accra, Keta, Ghana and across the Globe
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Celestial Web Solutions proudly serves clients across Accra, Keta, and all regions of Ghana.
              </h2>
              <p
                className="text-lg sm:text-xl text-orange-100 mb-10 max-w-2xl mx-auto"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                No matter your location, we provide professional web design and development services tailored to your business goals.<br /><br />
                Contact us today to get a professional website that helps your business grow online
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlassButton href="/contact" variant="light">
                  Start Your Project
                </GlassButton>
                <GlassButton href="/portfolio" variant="light">
                  View Our Work
                </GlassButton>
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