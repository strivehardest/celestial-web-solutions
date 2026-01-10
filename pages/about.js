import Head from "next/head";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Target, Eye, Lightbulb, Shield, Award, Users, Rocket, Heart, Code, Linkedin, Facebook, Twitter, Github, Phone, ArrowRight, Globe, Palette, Zap, CheckCircle } from "lucide-react";
import WhatsAppButton from '../components/WhatsAppButton';
import Link from "next/link";
import PremiumCTA from '../components/PremiumCTA';
import CTASection from '../components/CTASection';

/**
 * HappyClients data (place images under public/png/projects/)
 * Provide 1x, 2x variants as needed; webp optional
 */
const happyClients = [
  {
    name: "Building Planner Designs",
    src: "/png/projects/building.png",
  },
  {
    name: "Ghana Updates Online",
    src: "/png/projects/ghanaupdates1.jpg",
  },
  {
    name: "AdBay Store",
    src: "/png/projects/Adbay1.png",
  },
  {
    name: "Elolo Agbleke",
    src: "/png/projects/elolo2.jpeg",
  },
  {
    name: "Mart Ban Logistics",
    src: "/png/projects/martb.png",
  },
  {
    name: "My Space Furniture",
    src: "/png/projects/myspace.png",
  }
  ,{
    name: "Valyd",
    src: "/png/projects/valyd.png",
  },
  { name: "Doeman",
    src: "/png/projects/doeman.jpeg",
  }
];

/**
 * HappyClients component (inline, reusable)
 * Props:
 *  - clients: array
 *  - speed: number (seconds per loop)
 *  - cardWidth: tailwind width class
 */
function HappyClients({ clients = [], speed = 28, cardWidth = "w-48" }) {
  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
          style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
        >
          Trusted by
        </motion.h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 justify-items-center items-center">
          {clients.map((client, idx) => (
            <div key={`${client.name}-${idx}`} className="flex items-center justify-center w-full">
              <img
                src={client.src}
                alt={client.name}
                className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[240px] object-contain mx-auto"
                loading="lazy"
                decoding="async"
                style={
                  client.name === 'Elolo Agbleke'
                    ? { maxHeight: '60px' }
                    : client.name === 'Ghana Updates Online'
                    ? { maxHeight: '80px' }
                    : {}
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutUs() {
  // Typing effect state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  const typingPhrases = [
    "Web Design",
    "Development", 
    "Digital Solutions",
    "Branding"
  ];

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

  // Technology stack with external logo URLs
  const techStack = [
    { name: 'React', logo: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
    { name: 'Next.js', logo: 'https://cdn.worldvectorlogo.com/logos/nextjs-2.svg' },
    { name: 'Node.js', logo: 'https://cdn.worldvectorlogo.com/logos/nodejs-1.svg' },
    { name: 'Django', logo: 'https://cdn.worldvectorlogo.com/logos/django.svg' },
    { name: 'Tailwind CSS', logo: 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg' },
    { name: 'JavaScript', logo: 'https://cdn.worldvectorlogo.com/logos/javascript-1.svg' },
    { name: 'TypeScript', logo: 'https://cdn.worldvectorlogo.com/logos/typescript.svg' },
    { name: 'Python', logo: 'https://cdn.worldvectorlogo.com/logos/python-5.svg' },
    { name: 'HTML5', logo: 'https://cdn.worldvectorlogo.com/logos/html-1.svg' },
    { name: 'CSS3', logo: 'https://cdn.worldvectorlogo.com/logos/css-3.svg' },
    { name: 'WordPress', logo: 'https://cdn.worldvectorlogo.com/logos/wordpress-icon.svg' },
    { name: 'Bootstrap', logo: 'https://cdn.worldvectorlogo.com/logos/bootstrap-4.svg' },
    { name: 'Framer Motion', logo: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg' },
    { name: 'PostgreSQL', logo: 'https://cdn.worldvectorlogo.com/logos/postgresql.svg' },
    { name: 'MongoDB', logo: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg' },
    { name: 'Shopify', logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },
    { name: 'Vercel', logo: 'https://www.svgrepo.com/show/354513/vercel-icon.svg' },
    { name: 'Render', logo: 'https://images.seeklogo.com/logo-png/53/1/render-logo-png_seeklogo-532232.png' },
    { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'Elementor', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-elementor-logo-icon-svg-download-png-3029975.png' }
  ];

  return (
    <>
      <Head>
        <title>About Celestial Web Solutions | Web Design Company in Ghana</title>
        <meta name="description" content="Learn more about Celestial Web Solutions, a professional web design and development company in Ghana committed to helping businesses grow online." />
        <meta name="keywords" content="web design company in Ghana, professional web designers Ghana, Celestial Web Solutions, Waliu Aforlabi"/>
        <meta name="author" content="Celestial Web Solutions" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="geo.region" content="GH" />
        <meta name="geo.placename" content="Accra, Ghana" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About Celestial Web Solutions | Web Design Company in Ghana"/>
        <meta property="og:description" content="Learn more about Celestial Web Solutions, a professional web design and development company in Ghana committed to helping businesses grow online." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://celestialwebsolutions.net/about" />
        <meta property="og:locale" content="en_GH" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Celestial Web Solutions | Web Design Company in Ghana" />
        <meta name="twitter:description" content="Learn more about Celestial Web Solutions, a professional web design and development company in Ghana committed to helping businesses grow online." />
        
        <link rel="canonical" href="https://celestialwebsolutions.net/about" />
      </Head>

      {/* Hero Section - Full Background Image Like Services Page */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Hero Video */}
        <div className="absolute inset-0 z-0">
          <video
            src="/videos/hero1.mp4"
            className="w-full h-full object-cover object-center"
            style={{ minHeight: '90vh' }}
            autoPlay
            muted
            loop
            playsInline
            poster="/team.png"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 opacity-80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-orange-400 text-sm font-medium" style={{ fontFamily: "Google Sans, sans-serif" }}>
                  BEST IN WEB DESIGN IN GHANA
                </span>
              </motion.div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                About Celestial Web Solutions
              </h1>

              <p
                className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                At <span className="text-orange-400 font-semibold">Celestial Web Solutions</span>, we specialize in building modern, responsive, and user-friendly digital experiences that help businesses grow and thrive online.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
                    style={{ fontFamily: "Google Sans, sans-serif" }}
                  >
                    Work With Us
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link href="/portfolio">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 border-2 border-gray-700 hover:border-orange-500/50 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                    style={{ fontFamily: "Google Sans, sans-serif" }}
                  >
                    View Our Work
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Stats Cards Only */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "03+", label: "Years of Excellence", icon: Award },
                  { value: "20+", label: "Happy Clients", icon: Users },
                  { value: "20+", label: "Projects Delivered", icon: Rocket },
                  { value: "02+", label: "Countries Served", icon: Globe }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-gray-900/80 border border-gray-800 hover:border-orange-500/30 rounded-2xl p-6 transition-all duration-300"
                  >
                    <stat.icon size={28} className="text-orange-500 mb-3" />
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm md:text-base" style={{ fontFamily: "Google Sans, sans-serif" }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Work With Us Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Phone size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm" style={{ fontFamily: "Google Sans, sans-serif" }}>Ready to start?</p>
                      <p className="text-white font-bold text-lg" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Let's Talk</p>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm mb-4" style={{ fontFamily: "Google Sans, sans-serif" }}>
                    Get a free consultation and quote for your next project
                  </p>
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white text-orange-600 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors"
                      style={{ fontFamily: "Google Sans, sans-serif" }}
                    >
                      Contact Us Now
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="bg-white dark:bg-gray-900">
        {/* About Company Section - Kava Style */}
        <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left - About Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block text-orange-500 font-semibold text-sm tracking-wider uppercase mb-4"
                  style={{ fontFamily: "Google Sans, sans-serif" }}
                >
                  About Celestial
                </motion.span>
                
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  We Help Businesses{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                    Thrive Online
                  </span>
                </h2>

                <div className="space-y-6 text-gray-600 dark:text-gray-300" style={{ fontFamily: "Google Sans, sans-serif" }}>
                  <p className="text-lg leading-relaxed">
                    <span className="text-orange-500 font-semibold">Celestial Web Solutions</span> is a premier web design and development agency based in Accra, Ghana. We specialize in creating beautiful, functional, and user-centered digital experiences that help businesses establish a powerful online presence.
                  </p>
                  
                  <p className="leading-relaxed">
                    Founded with a vision to bridge the gap between African businesses and world-class digital solutions, we've grown to serve clients across Ghana and beyond. Our team combines creativity, technical expertise, and a deep understanding of local and global markets to deliver results that exceed expectations.
                  </p>

                  <p className="leading-relaxed">
                    From stunning websites and e-commerce platforms to custom web applications and brand identity design, we offer comprehensive digital solutions tailored to your unique business needs. Our commitment to excellence and client satisfaction drives everything we do.
                  </p>
                </div>

                {/* Features List */}
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {[
                    "Custom Web Development",
                    "E-commerce Solutions",
                    "UI/UX Design",
                    "Brand Identity",
                    "SEO Optimization",
                    "24/7 Support"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={14} className="text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium" style={{ fontFamily: "Google Sans, sans-serif" }}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10">
                  <Link href="/web-design-company-in-ghana">
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center gap-2 text-orange-500 font-semibold text-lg hover:text-orange-600 transition-colors"
                      style={{ fontFamily: "Google Sans, sans-serif" }}
                    >
                      View All Services
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              {/* Right - Image & Service Cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                    alt="Our team at work"
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-lg font-semibold" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                      Building Digital Excellence Since 2023
                    </p>
                  </div>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Palette, title: "Design", desc: "Beautiful & intuitive interfaces" },
                    { icon: Code, title: "Development", desc: "Clean & scalable code" },
                    { icon: Globe, title: "Hosting", desc: "Fast & reliable servers" },
                    { icon: Zap, title: "Performance", desc: "Optimized for speed" }
                  ].map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-600 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mb-3">
                        <service.icon size={24} className="text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                        {service.title}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm" style={{ fontFamily: "Google Sans, sans-serif" }}>
                        {service.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Meet Our Founder
              </h2>
              <p
                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                The visionary behind Celestial Web Solutions
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-12 items-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              {/* Left Column - Picture */}
              <div className="relative">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl transform rotate-6"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img
                      src="/founder-waliu.png"
                      alt="Waliu Ibrahimah Aforlabi - Founder & CEO"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div 
                      className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600"
                      style={{ display: 'none' }}
                    >
                      <div className="text-center text-white p-8">
                        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Code size={64} />
                        </div>
                        <p className="text-lg font-semibold">Waliu Ibrahimah Aforlabi</p>
                        <p className="text-sm">Founder & CEO</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-300 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>

              {/* Right Column - Info */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Founder & CEO
                  </div>
                  
                  <h3
                    className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    Waliu Ibrahimah Aforlabi
                  </h3>
                  
                  <p
                    className="text-lg text-orange-600 dark:text-orange-400 font-semibold mb-6"
                    style={{ fontFamily: "Google Sans, sans-serif" }}
                  >
                    Full Stack Web Developer
                  </p>

                  <div className="space-y-4 mb-6">
                    <p
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      style={{ fontFamily: "Google Sans, sans-serif" }}
                    >
                      With a passion for creating innovative digital solutions, Waliu founded Celestial Web Solutions to help businesses transform their online presence and achieve their digital goals.
                    </p>
                    
                    <p
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      style={{ fontFamily: "Google Sans, sans-serif" }}
                    >
                      As a Graduate of ALX Backend Engineering, he brings expertise in both frontend and backend technologies, ensuring every project is built with precision, scalability, and user experience in mind.
                    </p>
                  </div>

                  {/* Skills/Expertise - Tech Stack with Logo Images */}
                  <div className="mb-6">
                    <h4
                      className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Tech Stack & Expertise
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                      {techStack.map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="flex flex-col items-center justify-center p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-600 group"
                          title={tech.name}
                        >
                          <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 flex items-center justify-center mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                            <img
                              src={tech.logo}
                              alt={tech.name}
                              className="max-w-full max-h-full object-contain"
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                          <span className="text-xs sm:text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 text-center group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 line-clamp-2" style={{ fontFamily: "Google Sans, sans-serif" }}>
                            {tech.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-4">
                    <motion.a
                      href="https://linkedin.com/in/aforlabi"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                      title="LinkedIn"
                    >
                      <img 
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" 
                        alt="LinkedIn"
                        className="w-6 h-6 object-contain"
                      />
                    </motion.a>
                    <motion.a
                      href="https://twitter.com/strivehardest"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                      title="Twitter"
                    >
                      <img 
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" 
                        alt="Twitter"
                        className="w-6 h-6 object-contain"
                      />
                    </motion.a>
                    <motion.a
                      href="https://facebook.com/aforlabi"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                      title="Facebook"
                    > 
                      <img 
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" 
                        alt="Facebook"
                        className="w-6 h-6 object-contain"
                      />
                    </motion.a>
                    <motion.a
                      href="https://github.com/strivehardest"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                      title="GitHub"
                    >
                      <img 
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" 
                        alt="GitHub"
                        className="w-6 h-6 object-contain"
                      />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* âœ… Mission & Vision with Icons */}
        <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50 dark:bg-gray-800">
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Target size={28} />
                </div>
                <h2
                  className="text-2xl font-bold text-orange-600 dark:text-orange-400"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  Our Mission
                </h2>
              </div>
              <p
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                To deliver innovative, secure, and scalable digital solutions that empower businesses to achieve their full potential in the digital era.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Eye size={28} />
                </div>
                <h2
                  className="text-2xl font-bold text-orange-600 dark:text-orange-400"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  Our Vision
                </h2>
              </div>
              <p
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                To become Ghana & Africa's most trusted digital solutions provider, enabling businesses to succeed through technology, creativity, and innovation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* âœ… Core Values with Icons */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-12"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Our Core Values
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  desc: "We embrace creativity and cutting-edge technology to deliver exceptional digital experiences that push boundaries.",
                  icon: Lightbulb,
                  gradient: "from-orange-400 to-orange-500"
                },
                {
                  title: "Integrity",
                  desc: "Honesty, transparency, and trust form the foundation of our client relationships and business practices.",
                  icon: Shield,
                  gradient: "from-orange-500 to-orange-600"
                },
                {
                  title: "Excellence",
                  desc: "We strive for perfection in every project, ensuring the highest quality standards and exceptional results.",
                  icon: Award,
                  gradient: "from-orange-600 to-red-500"
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-600"
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${value.gradient} flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300`}> 
                      <value.icon size={32} />
                    </div>
                    <h3
                      className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      {value.title}
                    </h3>
                  </div>
                  <p
                    className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed"
                    style={{ fontFamily: "Google Sans, sans-serif" }}
                  >
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* âœ… Why Choose Us Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-12"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Why Choose Us
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Expert Team",
                  desc: "Skilled developers and designers with years of experience",
                  icon: Users,
                  color: "text-orange-500"
                },
                {
                  title: "Fast Delivery",
                  desc: "Quick turnaround times without compromising quality",
                  icon: Rocket,
                  color: "text-orange-600"
                },
                {
                  title: "24/7 Support",
                  desc: "Round-the-clock support and maintenance services",
                  icon: Heart,
                  color: "text-red-500"
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 flex items-center justify-center">
                      <feature.icon size={40} className={feature.color} />
                    </div>
                  </div>
                  <h3
                    className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-300 text-base md:text-lg"
                    style={{ fontFamily: "Google Sans, sans-serif" }}
                  >
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* âœ… Enhanced CTA Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&h=600&fit=crop" 
              alt="Developer coding background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 via-orange-600/80 to-red-500/80"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20"
            >
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Ready to Transform Your Business?
              </h3>
              <p
                className="text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                Let's discuss your project and create something amazing together. Get started with a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PremiumCTA
                  href="/contact"
                  size="large"
                  variant="primary"
                  icon={true}
                >
                  Work With Us
                </PremiumCTA>
                <PremiumCTA
                  href="/portfolio"
                  size="large"
                  variant="secondary"
                  icon={true}
                >
                  View Our Portfolio
                </PremiumCTA>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === HAPPY CLIENTS (inserted at the end as requested) === */}
        <HappyClients clients={happyClients} speed={28} cardWidth="w-48" />

        <WhatsAppButton />
      </div>
    </>
  );
}
