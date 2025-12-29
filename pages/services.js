import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from "framer-motion";
import { Monitor, Code, Search, ShoppingCart, Palette, Headphones, Target, MousePointer, ArrowRight, CheckCircle2, Rocket, Users, Star, Zap } from "lucide-react";
import Link from "next/link";
import WhatsAppButton from '../components/WhatsAppButton';

// Typing effect phrases for services
const typingPhrases = [
  'Web Development',
  'UI/UX Design',
  'E-Commerce',
  'SEO Services',
  'Digital Marketing'
];

const services = [
  { 
    title: "Web Development",
    slug: "web-development",
    description: "We build robust, scalable web applications using cutting-edge technologies like React, Next.js, and Node.js. From simple business websites to complex enterprise systems, we create custom solutions that grow with your business.",
    icon: Code,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=90&w=800&auto=format&fit=crop",
    keywords: ["web development", "custom web applications", "React development", "Node.js"]
  },
  { 
    title: "Web Design",
    slug: "web-design",
    description: "We create stunning, responsive websites that captivate your audience across all devices. Our designs blend modern aesthetics with intuitive user experience, featuring optimal color schemes and strategic layouts.",
    icon: Monitor,
    image: "https://www.ntc.edu/sites/default/files/styles/16_9_1600x900/public/2021-06/web-design-header.jpg?itok=KPytPu7S",
    keywords: ["responsive web design", "modern website design", "UI design", "mobile-first design"]
  },
  { 
    title: "E-Commerce Solutions",
    slug: "ecommerce-solutions",
    description: "We develop high-converting online stores with secure payment gateways, inventory management, and user-friendly interfaces. Our platforms support multiple payment options including mobile money.",
    icon: ShoppingCart,
    image: "https://admin.wac.co/uploads/What_is_E_commerce_and_What_are_its_Applications_2_d2eb0d4402.jpg",
    keywords: ["e-commerce development", "online store", "payment gateway", "mobile money integration"]
  },
  { 
    title: "SEO Optimization",
    slug: "seo-optimization",
    description: "We elevate your online visibility with data-driven SEO strategies that drive organic traffic and improve search rankings. Our services include keyword research, on-page optimization, and technical SEO.",
    icon: Search,
    image: "https://www.intellibright.com/wp-content/uploads/2025/04/Search-Engine-Optimization.jpg",
    keywords: ["SEO services", "search engine optimization", "organic traffic", "local SEO Ghana"]
  },
  { 
    title: "UX/UI Design",
    slug: "ux-ui-design",
    description: "We craft exceptional user experiences through thoughtful design that combines beauty with functionality. Our process includes user research, wireframing, and interactive prototypes.",
    icon: Palette,
    image: "https://designmaniac.in/wp-content/uploads/2023/02/ui-ux.png",
    keywords: ["UX design", "UI design", "user experience", "wireframing", "usability testing"]
  },
  { 
    title: "IT Support",
    slug: "it-support",
    description: "We provide comprehensive IT support to keep your business technology running smoothly. From system setup and maintenance to troubleshooting and security implementations.",
    icon: Headphones,
    image: "https://res.cloudinary.com/jerrick/image/upload/v1738225878/679b38d615e36b001df71563.webp",
    keywords: ["IT support", "technical support", "system maintenance", "cybersecurity"]
  },
  { 
    title: "Google AdSense Management",
    slug: "google-adsense-management",
    description: "We maximize your website revenue through strategic AdSense optimization. Our services include ad placement optimization, A/B testing, and content strategy development.",
    icon: Target,
    image: "https://new.growketing.com/wp-content/uploads/2022/11/98-%C2%BFQue-es-y-como-aprovechar-al-maximo-Google-AdSense_.jpg",
    keywords: ["Google AdSense", "ad revenue optimization", "website monetization", "content monetization"]
  },
  { 
    title: "Google Ads Management",
    slug: "google-ads-management",
    description: "We drive targeted traffic and maximize conversions through expertly managed Google Ads campaigns. Our certified specialists handle strategy, keyword research, and campaign optimization.",
    icon: MousePointer,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI23FVIbMh2YmJeuWfIldox2fhWDLkv6P8ww&s",
    keywords: ["Google Ads", "PPC management", "paid advertising", "campaign management"]
  }
];

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

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "" }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", duration: 0.8 }}
    >
      {value}{suffix}
    </motion.span>
  );
};

export default function ServicesPage() {
  // Typing effect state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
    <>
      <Head>
        <title>Professional Web Services Ghana | Web Development, Design, SEO & Digital Marketing</title>
        <meta name="description" content="Complete web services in Ghana including web development, web design, e-commerce solutions, SEO optimization, UX/UI design, IT support, and digital marketing. Transform your business with Celestial Web Solutions." />
        <meta name="keywords" content="web services Ghana, web development services, web design services Ghana, e-commerce solutions, SEO services Ghana, UX/UI design, IT support Ghana, Google Ads management, Google AdSense management, digital marketing Ghana, web development company, design agency Ghana, full stack development, website maintenance, technical support" />
        <meta name="author" content="Celestial Web Solutions" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="geo.region" content="GH" />
        <meta name="geo.placename" content="Accra, Ghana" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Professional Web Services Ghana | Web Development & Design"/>
        <meta property="og:description" content="Comprehensive web services including development, design, SEO, e-commerce solutions, and digital marketing in Ghana." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://celestialwebsolutions.net/services" />
        <meta property="og:locale" content="en_GH" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Professional Web Services Ghana | Web Development & Design" />
        <meta name="twitter:description" content="Complete web services: development, design, SEO, e-commerce, and digital marketing." />
        
        <link rel="canonical" href="https://celestialwebsolutions.net/services" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section - Enhanced with Floating Elements */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=90&w=2400&auto=format&fit=crop" 
              alt="Services Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/70"></div>
          </div>

          {/* Floating Decorative Elements */}
          <motion.div 
            className="absolute top-20 right-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 7, repeat: Infinity }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span 
                  className="inline-block px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  OUR SERVICES
                </motion.span>
                
                <h1
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  <span className="block">World-class</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 min-h-[1.2em] inline-block">
                    {displayText}
                    <span className="animate-pulse">|</span>
                  </span>
                </h1>
                
                <p
                  className="text-xl text-gray-300 max-w-xl leading-relaxed mb-8"
                  style={{ fontFamily: "Google Sans, sans-serif" }}
                >
                  From concept to deployment, we deliver comprehensive digital solutions that transform businesses and drive measurable growth.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <GlassButton href="/contact" variant="solid">
                    Start Your Project
                  </GlassButton>
                  <GlassButton href="/portfolio" variant="light">
                    View Our Work
                  </GlassButton>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <CheckCircle2 className="w-5 h-5 text-orange-500" />
                    <span className="text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>Free Consultation</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <CheckCircle2 className="w-5 h-5 text-orange-500" />
                    <span className="text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <CheckCircle2 className="w-5 h-5 text-orange-500" />
                    <span className="text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>Money Back Guarantee</span>
                  </div>
                </div>
              </motion.div>

              {/* Hero Stats Cards */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden lg:grid grid-cols-2 gap-4"
              >
                {[
                  { icon: Rocket, value: "20+", label: "Projects Completed", color: "from-orange-500 to-orange-600" },
                  { icon: Users, value: "20+", label: "Happy Clients", color: "from-orange-400 to-orange-500" },
                  { icon: Star, value: "5.0", label: "Average Rating", color: "from-orange-500 to-orange-600" },
                  { icon: Zap, value: "99%", label: "Client Satisfaction", color: "from-orange-400 to-orange-500" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-gray-400 text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <motion.div 
                className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Services Section - Enhanced with Better Cards */}
        <div className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                WHAT WE OFFER
              </motion.span>
              <h2 
                className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Comprehensive Digital Services
              </h2>
              <p 
                className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Professional services tailored to meet your unique business needs and drive exceptional results
              </p>
            </motion.div>

            <div className="space-y-24">
              {services.map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <motion.div
                      className="relative h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* Service Icon Badge */}
                      <motion.div 
                        className="absolute top-6 left-6 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/30"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <service.icon className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Service Number */}
                      <div className="absolute bottom-6 right-6 text-8xl font-bold text-white/10" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                        0{index + 1}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Link href={`/services/${service.slug}`}>
                          <motion.span 
                            className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold inline-flex items-center gap-2"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                            whileHover={{ scale: 1.05 }}
                          >
                            View Details <ArrowRight className="w-4 h-4" />
                          </motion.span>
                        </Link>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <span 
                        className="text-orange-500 font-semibold text-sm tracking-wider"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        SERVICE 0{index + 1}
                      </span>
                      <h3 
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-2"
                        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                      >
                        {service.title}
                      </h3>
                    </motion.div>
                    
                    <p 
                      className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {service.keywords.map((keyword, idx) => (
                        <motion.span 
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="text-sm px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-medium shadow-sm hover:shadow-md hover:border-orange-300 dark:hover:border-orange-600 transition-all"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          {keyword}
                        </motion.span>
                      ))}
                    </div>

                    <div className="pt-4">
                      <GlassButton href={`/services/${service.slug}`} variant="orange">
                        Learn More
                      </GlassButton>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Why Choose Us Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-24 mb-20"
            >
              <div className="text-center mb-12">
                <span 
                  className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  WHY CHOOSE US
                </span>
                <h2 
                  className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                >
                  What Sets Us Apart
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Zap, title: "Fast Delivery", desc: "Quick turnaround without compromising quality", color: "from-orange-500 to-orange-600" },
                  { icon: Users, title: "Expert Team", desc: "Skilled developers & designers at your service", color: "from-orange-400 to-orange-500" },
                  { icon: Star, title: "Quality First", desc: "Premium solutions that exceed expectations", color: "from-orange-500 to-orange-600" },
                  { icon: CheckCircle2, title: "24/7 Support", desc: "Always here when you need assistance", color: "from-orange-400 to-orange-500" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-800"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 
                      className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                      style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="text-gray-600 dark:text-gray-400 text-l"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* CTA Section - Enhanced */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative py-24 rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=90&w=2400&auto=format&fit=crop" 
                  alt="CTA Background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/95 via-orange-500/90 to-red-600/95"></div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
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
              </div>

              <div className="relative z-10 text-center px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span 
                    className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    LET'S WORK TOGETHER
                  </span>
                  <h2 
                    className="text-3xl md:text-5xl font-bold mb-6 text-white"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                  >
                    Ready to Transform Your Business?
                  </h2>
                  <p
                    className="text-orange-100 mb-10 max-w-2xl mx-auto leading-relaxed text-lg"
                    style={{ fontFamily: "Google Sans, sans-serif" }}
                  >
                    Let's discuss your project and create something amazing together. Get started with a free consultation today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <GlassButton href="/contact" variant="light">
                      Get Started Today
                    </GlassButton>
                    <GlassButton href="/portfolio" variant="light">
                      View Our Work
                    </GlassButton>
                  </div>
                </motion.div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { value: "20+", label: "Happy Clients" },
                    { value: "20+", label: "Projects Delivered" },
                    { value: "3+", label: "Years Experience" },
                    { value: "2+", label: "Countries Served" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <motion.div 
                        className="text-4xl md:text-5xl font-bold text-white mb-2" 
                        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-orange-200 text-lg" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
      <WhatsAppButton />
    </>
  );
}