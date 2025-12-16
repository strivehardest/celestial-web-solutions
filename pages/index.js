import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Code, Monitor, Search, ShoppingCart, ArrowRight, Zap } from 'lucide-react';
import Head from 'next/head';
import WhatsAppButton from '../components/WhatsAppButton';
import PremiumCTA, { TextCTA } from '../components/PremiumCTA';
import CTASection from '../components/CTASection';

// SEO Component with Next.js Head
const SEOHead = () => {
  return (
    <Head>
      <title>Celestial Web Solutions | No 1 Best Web Designer in Accra, and Keta, Ghana</title>
      <meta name="description" content="Best Web Designer in Accra and Keta, Ghana. Professional web development, e-commerce solutions, SEO optimization, and digital marketing services for businesses in Ghana." />
      <meta name="keywords" content="best web designer in Ghana, web designer Accra, web developer Ghana, website design Ghana, e-commerce Ghana, SEO Ghana, digital marketing Ghana, web solutions Accra, best web designer in Keta, web development Accra, affordable web design Ghana, custom website Ghana, WordPress developer Ghana, React developer Ghana, web agency Ghana, website builder Ghana, online store Ghana, business website Ghana, church website Ghana, NGO website Ghana, school website Ghana, website design Accra, web designer near me Ghana, freelance web designer Ghana, professional web designer Ghana, experienced web developer Ghana, website maintenance Ghana, web hosting Ghana, domain registration Ghana, website optimization Ghana, mobile app development Ghana, software development Ghana, IT services Ghana, web design company Ghana, best web development company Ghana, top web designers Ghana, website designer Ghana, web design services Ghana, e-commerce development Ghana, online marketing Ghana, social media marketing Ghana, content marketing Ghana, brand development Ghana, digital transformation Ghana, web technology Ghana, web platform Ghana, responsive website Ghana, SEO services Ghana, Google ranking Ghana, website traffic Ghana, lead generation Ghana, business growth Ghana, digital presence Ghana, online visibility Ghana, website conversion Ghana, user experience design Ghana, web interface design Ghana, website performance Ghana, fast loading website Ghana, secure website Ghana, SSL certificate Ghana, website security Ghana, cyber security Ghana, data protection Ghana" />
      <meta name="author" content="Celestial Web Solutions" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="geo.region" content="GH" />
      <meta name="geo.placename" content="Accra, Ghana" />
      <meta name="geo.position" content="5.6037;-0.1870" />
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content="Celestial Web Solutions | No 1 Best Web Designer in Accra, Ghana"/>
      <meta property="og:description" content="Transform your business with expert web development and design services in Ghana. Custom websites, e-commerce solutions, and digital marketing for Accra, Keta, and beyond." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://celestialwebsolutions.net" />
      <meta property="og:image" content="https://celestialwebsolutions.net/og-image.jpg" />
      <meta property="og:site_name" content="Celestial Web Solutions" />
      <meta property="og:locale" content="en_GH" />
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Celestial Web Solutions | Best Web Designer in Accra, Ghana - Web Development & Design Services" />
      <meta name="twitter:description" content="Professional web development, design, and digital marketing services in Ghana. Best web designer in Accra. Custom websites for businesses, NGOs, churches, and institutions." />
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
            "@type": "LocalBusiness",
            "name": "Celestial Web Solutions",
            "description": "Best Web Designer and Developer in Accra, Ghana. Professional web development, design, e-commerce, and digital marketing services.",
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
        {/* Hero Section with Enhanced Buttons and Local Image */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Custom Background with Local Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'linear-gradient(135deg, rgba(255,107,0,0.85) 0%, rgba(255,69,0,0.8) 50%, rgba(220,38,127,0.85) 100%), url("/hero-bg.jpg")',
              backgroundAttachment: 'fixed'
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
  
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              
              {/* Enhanced Call to Action Buttons - PREMIUM STYLE */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <PremiumCTA href="/contact" variant="secondary" size="large">
                  Let's Build Together
                </PremiumCTA>

                <PremiumCTA href="/portfolio" variant="primary" size="large">
                  View Our Work
                </PremiumCTA>
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
                  <TextCTA href={service.link}>
                    Learn More
                  </TextCTA>
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
            <div className="space-y-12">
              {portfolioItems.slice(0, 2).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-600 rounded-3xl p-8 md:p-12 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.01, y: -4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* Image Column */}
                      <div className="w-full h-64 md:h-80 overflow-hidden rounded-2xl order-2 md:order-1">
                        <img
                          src={item.images.main}
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(item.title)}`;
                          }}
                        />
                      </div>
                      
                      {/* Content Column */}
                      <div className="order-1 md:order-2">
                        <div className="inline-block bg-orange-200 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-bold mb-4">
                          {item.category}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
                            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg"
                           style={{ fontFamily: 'Quicksand, sans-serif' }}>
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {item.tech.map((tech, techIndex) => (
                            <span key={techIndex} className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 border border-orange-200 dark:border-orange-700">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <PremiumCTA href={item.link} size="default">
                          View Project
                        </PremiumCTA>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <PremiumCTA href="/portfolio" size="large">
                View All Projects
              </PremiumCTA>
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
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-orange-500 text-lg">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic"
                     style={{ fontFamily: 'Quicksand, sans-serif' }}>
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
                  With over 3 years of experience in web development and design.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed"
                   style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  Our team of skilled developers and designers combines creativity with technical expertise to 
                  deliver solutions that not only look stunning but also drive real business results. We believe 
                  in building long-term partnerships with our clients and providing ongoing support.
                </p>
                <PremiumCTA href="/about" size="large">
                  Learn More About Us
                </PremiumCTA>
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

        {/* CTA Section - PREMIUM STYLE */}
        <CTASection 
          title="Ready to Transform Your Business?"
          subtitle="Let's discuss your project and create something amazing together. Get started with a free consultation today."
          primaryText="Start Your Project Today"
          secondaryText="View Portfolio"
          primaryHref="/contact"
          secondaryHref="/portfolio"
          variant="gradient"
        />

        <WhatsAppButton />
      </div>
    </>
  );
};

export default IndexPage;