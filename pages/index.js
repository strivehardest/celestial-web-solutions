import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Code, Monitor, Search, ShoppingCart } from 'lucide-react';
import Head from 'next/head';
import WhatsAppButton from '../components/WhatsAppButton';

// SEO Component with Next.js Head
const SEOHead = () => {
  return (
    <Head>
      <title>Celestial Web Solutions | No 1 Best Web Designer in Accra, Ghana</title>
      <meta name="description" content="Best Web Designer in Accra, Ghana. Professional web development and design services in Ghana." />
      <meta name="keywords" content="best web designer in Accra, seo agency in Ghana, best web designers in accra, best web developer in accra, best web designer in keta, best web designer in Ghana, web development Ghana, website design accra, e-commerce development, React developer, Next.js, WordPress, SEO optimization in Ghana, digital marketing, web solutions Accra, affordable web design Ghana, custom website design Ghana, Volta Region web designer, hire web designer Ghana, website cost Ghana, web development company Ghana, best web agency in Accra," />
      <meta name="author" content="Celestial Web Solutions" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content="Celestial Web Solutions | No 1 Best Web Designer in Accra, Ghana"/>
      <meta property="og:description" content="Transform your business with our expert web development and design services. Custom websites, e-commerce solutions, and digital marketing in Ghana." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://celestialwebsolutions.net" />
      <meta property="og:image" content="https://celestialwebsolutions.net/og-image.jpg" />
      <meta property="og:site_name" content="Celestial Web Solutions" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Celestial Web Solutions | Best Web Designer in Accra, Ghana - Professional Web Development & Design Services" />
      <meta name="twitter:description" content="Professional web development services in Ghana. Custom websites, e-commerce, and digital solutions that grow your business." />
      <meta name="twitter:image" content="https://celestialwebsolutions.net/twitter-image.jpg" />
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#FF6B00" />
      <meta name="geo.region" content="GH-AA" />
      <meta name="geo.placename" content="Accra" />
      <meta name="geo.position" content="5.6037;-0.1870" />
      <meta name="ICBM" content="5.6037, -0.1870" />
      
      <link rel="canonical" href="https://celestialwebsolutions.net" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Celestial Web Solutions",
            "description": "Best Web Designer in Accra, Ghana - Professional Web Development & Design Services",
            "url": "https://celestialwebsolutions.net",
            "logo": "https://celestialwebsolutions.net/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+233-245671832",
              "contactType": "customer service",
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
            "service": [
              {
                "@type": "Service",
                "name": "Web Development",
                "description": "Custom web application development using modern technologies"
              },
              {
                "@type": "Service", 
                "name": "Web Design",
                "description": "Professional website design and user experience optimization"
              },
              {
                "@type": "Service",
                "name": "E-commerce Development", 
                "description": "Online store development with secure payment integration"
              }
            ]
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
    link: "/services/web-development"
  },
  {
    icon: Monitor,
    title: "Web Design",
    description: "Beautiful, user-friendly designs that engage your audience and drive conversions",
    color: "from-orange-500 to-orange-600",
    link: "/services/web-design"
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "Custom online stores with secure payment integration and inventory management",
    color: "from-orange-500 to-orange-600",
    link: "/services/ecommerce-solutions"
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Improve your visibility and reach with our proven SEO strategies",
    color: "from-orange-500 to-orange-600",
    link: "/services/seo-optimization"
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
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' }
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

const IndexPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Handle scroll effect for any scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation function using Next.js router
  const handleNavigation = (path) => {
    router.push(path);
  };

  // Portfolio data
  const portfolioItems = [
    { 
      title: "AdBay.store, Free classified Website", 
      category: "Website", 
      description: "Modern online free buy and sell website",
      tech: ["Elementor", "Wordpress", "WooCommerce", "CSS"],
      link: "/portfolio/adbay-store",
      images: {
        main: "/images/projects/adbay/adbay-home.png",
        gallery: [
          "/images/projects/adbay/adbay-listings.png",
          "/images/projects/adbay/adbay-mobile.png"
        ]
      }
    },
    { 
      title: "Building Planner Design", 
      category: "Website", 
      description: "Professional building planning website with project management and client portal features",
      tech: ["CSS", "Elementor", "WordPress", "HTML"],
      link: "/portfolio/best-web-designer-in-accra",
      images: {
        main: "/images/projects/building-planner/bp-home.png",
        gallery: [
          "/images/projects/building-planner/bp-projects.png",
          "/images/projects/building-planner/bp-services.png"
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
      image: "/testimonials/frank.jpg",
      date: "6 months ago"
    },
    {
      name: "Righteous Semahar",
      company: "RAK Foundation",
      role: "CEO",
      text: "Expertise in Web Development, their services are excellent.",
      rating: 5,
      image: "/testimonials/righteous.jpg",
      date: "7 months ago"
    },
    {
      name: "Elolo Agbleke",
      company: "Keta Institute of Technology",
      role: "Program Manager, COO",
      text: "Excellent web development company! Celestial Web Solutions helped me in creating a personal website.",
      rating: 5,
      image: "/testimonials/elolo.jpg",
      date: "3 weeks ago"
    }
  ];

  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
       {/* Hero Section with Celestial Web Solutions Coding Theme */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
  {/* Custom Background with Coding Theme */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: 'linear-gradient(135deg, rgba(255,107,0,0.9) 0%, rgba(255,69,0,0.8) 50%, rgba(220,38,127,0.9) 100%), url("https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80")'
    }}
  />
  
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
  
  <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Custom Coding Illustration - Responsive sizing */}
      <motion.div
        className="mb-6 sm:mb-8 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <svg 
          width="200" 
          height="150" 
          viewBox="0 0 200 150" 
          className="drop-shadow-lg w-40 h-30 sm:w-48 sm:h-36 md:w-52 md:h-39 lg:w-56 lg:h-42"
        >
          {/* Desk */}
          <rect x="20" y="100" width="160" height="8" fill="#8B4513" opacity="0.8"/>
          
          {/* Monitor */}
          <rect x="60" y="50" width="80" height="50" rx="4" fill="#2D3748" stroke="#FF6B00" strokeWidth="2"/>
          <rect x="65" y="55" width="70" height="40" fill="#1A202C"/>
          
          {/* Code on screen */}
          <rect x="68" y="58" width="20" height="2" fill="#FF6B00"/>
          <rect x="68" y="62" width="15" height="2" fill="#FF8C00"/>
          <rect x="68" y="66" width="25" height="2" fill="#FF4500"/>
          <rect x="68" y="70" width="18" height="2" fill="#DC2678"/>
          <rect x="68" y="74" width="22" height="2" fill="#FF6B00"/>
          <rect x="68" y="78" width="16" height="2" fill="#FF8C00"/>
          <rect x="68" y="82" width="28" height="2" fill="#FF4500"/>
          <rect x="68" y="86" width="14" height="2" fill="#DC2678"/>
          
          {/* Monitor stand */}
          <rect x="95" y="100" width="10" height="8" fill="#4A5568"/>
          <rect x="85" y="108" width="30" height="4" fill="#4A5568"/>
          
          {/* Person silhouette */}
          {/* Head */}
          <circle cx="100" cy="35" r="12" fill="#FF6B00" opacity="0.9"/>
          
          {/* Body */}
          <rect x="88" y="47" width="24" height="30" rx="12" fill="#FF8C00" opacity="0.8"/>
          
          {/* Arms coding */}
          <ellipse cx="82" cy="55" rx="6" ry="15" fill="#FF4500" opacity="0.8"/>
          <ellipse cx="118" cy="55" rx="6" ry="15" fill="#FF4500" opacity="0.8"/>
          
          {/* Hands on keyboard */}
          <circle cx="85" cy="68" r="3" fill="#FF6B00"/>
          <circle cx="115" cy="68" r="3" fill="#FF6B00"/>
          
          {/* Keyboard */}
          <rect x="70" y="105" width="60" height="8" rx="2" fill="#4A5568"/>
          <rect x="72" y="107" width="4" height="4" fill="#FF6B00" opacity="0.6"/>
          <rect x="78" y="107" width="4" height="4" fill="#FF6B00" opacity="0.6"/>
          <rect x="84" y="107" width="4" height="4" fill="#FF6B00" opacity="0.6"/>
          <rect x="90" y="107" width="4" height="4" fill="#FF6B00" opacity="0.6"/>
          <rect x="96" y="107" width="4" height="4" fill="#FF6B00" opacity="0.6"/>
          <rect x="102" y="107" width="4" height="4" fill="#FF6B00" opacity="0.6"/>
          <rect x="108" y="107" width="4" height="4" fill="#FF6B00" opacity="0.6"/>
          <rect x="114" y="107" width="4" height="4" fill="#FF6B00" opacity="0.6"/>
          <rect x="120" y="107" width="4" height="4" fill="#FF6B00" opacity="0.6"/>
          
          {/* Coffee cup */}
          <rect x="140" y="95" width="12" height="15" rx="2" fill="#8B4513"/>
          <rect x="142" y="97" width="8" height="11" fill="#D2691E"/>
          <ellipse cx="154" cy="100" rx="2" ry="3" fill="#8B4513"/>
          
          {/* Floating code particles */}
          <circle cx="30" cy="30" r="2" fill="#FF6B00" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="170" cy="40" r="1.5" fill="#FF8C00" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="25" cy="80" r="1" fill="#DC2678" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="175" cy="70" r="2" fill="#FF4500" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="1.8s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </motion.div>

      {/* Developer Badge - Responsive text and padding */}
      <motion.div
        className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-orange-300/30 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full mb-6 sm:mb-8 text-xs sm:text-sm font-semibold"
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
        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 text-white drop-shadow-2xl leading-tight"
        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <span className="block">Welcome to</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-400 to-red-400">
          Celestial Web Solutions
        </span>
      </motion.h1>
      
      <motion.p
        className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90 mb-3 sm:mb-4 max-w-4xl mx-auto leading-relaxed drop-shadow-lg px-2"
        style={{ fontFamily: 'Quicksand, sans-serif' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Crafting exceptional web experiences with
        <span className="text-orange-300 font-semibold block sm:inline"> modern technologies</span>
      </motion.p>
      
      <motion.p
        className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto px-2"
        style={{ fontFamily: 'Quicksand, sans-serif' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        From concept to deployment, we build scalable web applications that drive business growth. 
        Let's turn your vision into digital reality.
      </motion.p>
      
      {/* Tech Stack - Responsive Grid Layout */}
      <motion.div
        className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto">
          {[
            'React', 'Next.js', 'Python', 'Django', 'SQL', 'WordPress', 
            'TailwindCSS', 'Node.js', 'JavaScript', 'HTML5', 'CSS3'
          ].map((tech) => (
            <div key={tech} className="flex justify-center">
              <div className="text-xs sm:text-sm font-mono bg-white/10 px-2 py-1 sm:px-3 sm:py-1 rounded text-white/70 text-center whitespace-nowrap">
                {tech}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Call to Action Buttons - Responsive sizing and stacking */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <motion.button
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-semibold shadow-xl hover:bg-white/30 hover:shadow-2xl transition-all duration-300 text-sm sm:text-base lg:text-lg"
          style={{ fontFamily: 'Quicksand, sans-serif' }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavigation('/contact')}
        >
          <span>Let's Build Together</span>
        </motion.button>
        <motion.button
          className="w-full sm:w-auto flex items-center justify-center space-x-2 border-2 border-white/50 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base lg:text-lg"
          style={{ fontFamily: 'Quicksand, sans-serif' }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavigation('/portfolio')}
        >
          <span>View Our Work</span>
        </motion.button>
      </motion.div>
      
      {/* Scroll Indicator - Hidden on small mobile */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2 font-mono">scroll down</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
</section>

        {/* Services Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Our Core Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                 style={{ fontFamily: 'Quicksand, sans-serif' }}>
                Comprehensive digital solutions to transform your business presence
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {mainServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-6`}>
                    <service.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white"
                      style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6"
                     style={{ fontFamily: 'Quicksand, sans-serif' }}>
                    {service.description}
                  </p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-orange-500 hover:text-orange-600 dark:text-orange-400 font-medium flex items-center space-x-2"
                    onClick={() => handleNavigation(service.link)}
                  >                  
                    <span>Learn More</span>
                    <span>→</span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                 style={{ fontFamily: 'Quicksand, sans-serif' }}>
                Showcasing our latest work and the innovative solutions we've created for our clients
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12">
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-600 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-full h-48 mb-6 overflow-hidden rounded-xl">
                      <img
                        src={item.images.main}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
                        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      {item.title}
                    </h3>
                    <p className="text-orange-600 dark:text-orange-400 font-medium mb-4"
                       style={{ fontFamily: 'Quicksand, sans-serif' }}>
                      {item.category}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                       style={{ fontFamily: 'Quicksand, sans-serif' }}>
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-white/50 dark:bg-gray-800/50 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <motion.button
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      style={{ fontFamily: 'Quicksand, sans-serif' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNavigation(item.link)}
                    >
                      <span>View Project</span>
                      <span>→</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <motion.button
                className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 text-lg"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation('/portfolio')}
              >
                View All Projects
              </motion.button>
            </div>
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
                 style={{ fontFamily: 'Quicksand, sans-serif' }}>
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
        <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                What Our Clients Say
              </h2>
              <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed"
                 style={{ fontFamily: 'Quicksand, sans-serif' }}>
                Don't just take our word for it - hear from satisfied clients who've experienced transformative results
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group border border-white/20"
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=FF6B00&color=fff`;
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white"
                          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                        {testimonial.name}
                      </h4>
                      <p className="text-orange-600 dark:text-orange-400 text-sm font-medium"
                         style={{ fontFamily: 'Quicksand, sans-serif' }}>
                        {testimonial.role}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm"
                         style={{ fontFamily: 'Quicksand, sans-serif' }}>
                        {testimonial.company}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                        {testimonial.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-orange-500 text-lg">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  About Celestial Web Solutions
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed"
                   style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  At Celestial Web Solutions, we're passionate about creating digital experiences that truly shine. 
                  With over 5 years of experience in web development and design.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed"
                   style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  Our team of skilled developers and designers combines creativity with technical expertise to 
                  deliver solutions that not only look stunning but also drive real business results. We believe 
                  in building long-term partnerships with our clients and providing ongoing support.
                </p>
                <motion.button
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 text-lg"
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation('/about')}
                >
                  <span>Learn More About Us</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 text-center shadow-2xl">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6"
                      style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    Our Mission
                  </h3>
                  <p className="text-orange-100 text-lg leading-relaxed"
                     style={{ fontFamily: 'Quicksand, sans-serif' }}>
                    To deliver innovative, secure, and scalable digital solutions that empower businesses to achieve their full potential in the digital era.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                 style={{ fontFamily: 'Quicksand, sans-serif' }}>
                Let's discuss your project and create something amazing together. Get started with a free consultation today.
              </p>
              <motion.button
                className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white px-10 py-5 rounded-2xl font-semibold shadow-xl hover:shadow-orange-500/30 transition-all duration-300 text-xl"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation('/contact')}
              >
                Start Your Project Today
              </motion.button>
            </motion.div>
          </div>
        </section>
         <WhatsAppButton />
      </div>
    </>
  );
};

export default IndexPage;