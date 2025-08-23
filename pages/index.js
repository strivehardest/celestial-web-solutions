import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Globe, Search, ShoppingCart } from 'lucide-react';
import Link from "next/link";

// Tech stack logos - import from public/logos directory
const techLogos = [
  '/logos/react.svg',
  '/logos/next.svg',
  '/logos/tailwind.svg',
  '/logos/node.svg',
  '/logos/typescript.svg',
  '/logos/mongodb.svg',
  '/logos/firebase.svg',
  '/logos/aws.svg',
  '/logos/vercel.svg',
  '/logos/github.svg'
];

const mainServices = [
  {
    icon: Code,
    title: "Web Development",
    description: "Modern, responsive websites built with Next.js, React and cutting-edge technologies",
    color: "from-blue-500 to-blue-600",
    link: "/services/web-development"
  },
  {
    icon: Globe,
    title: "Web Design",
    description: "Beautiful, user-friendly designs that engage your audience and drive conversions",
    color: "from-purple-500 to-purple-600",
    link: "/services/web-design"
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "Custom online stores with secure payment integration and inventory management",
    color: "from-green-500 to-green-600",
    link: "/services/ecommerce"
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Improve your visibility and reach with our proven SEO strategies",
    color: "from-orange-500 to-orange-600",
    link: "/services/seo"
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
    ],
    link: '/services/frontend'
  },
  {
    title: "E-commerce & Payments",
    description: "Complete e-commerce solutions with secure payment integrations",
    color: "from-purple-500 to-purple-600",
    items: [
      { name: 'WooCommerce', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg' },
      { name: 'Shopify', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg' },
      { name: 'Paystack', icon: 'https://website-v3-assets.s3.amazonaws.com/assets/img/hero/Paystack-mark-white-twitter.png' },
      { name: 'Flutterwave', icon: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/flutterwave_logo_icon_168735.png' }
    ],
    link: '/services/ecommerce'
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
    ],
    link: '/services/backend'
  },
  {
    title: "Design & Tools",
    description: "Modern design and development tools for optimal workflow",
    color: "from-orange-500 to-orange-600",
    items: [
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { name: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' }
    ],
    link: '/services/design'
  }
];

const IndexPage = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for any scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Updated Services data
  const servicesOverview = [
    { 
      title: "Web Development", 
      description: "Custom web applications built with cutting-edge technology and modern frameworks for optimal performance",
      icon: "💻"
    },
    { 
      title: "Web Design", 
      description: "Stunning, responsive websites that captivate your audience and create memorable user experiences",
      icon: "🎨"
    },
    { 
      title: "E-Commerce Solutions", 
      description: "High-converting online stores with secure payment gateways and seamless shopping experiences",
      icon: "🛒"
    },
    { 
      title: "Google Adsense Management", 
      description: "Maximize your ad revenue with strategic placement and optimization of Google Adsense campaigns",
      icon: "💰"
    },
    {
      title: "UX/UI Design",
      description: "User-centered design approaches that create intuitive interfaces and exceptional user experiences",
      icon: "🎯"
    },
    {
      title: "SEO Optimization",
      description: "Boost your search rankings and drive organic traffic with proven SEO strategies and techniques",
      icon: "🚀"
    },
    {
      title: "IT Support",
      description: "Comprehensive technical support and maintenance services to keep your systems running smoothly",
      icon: "🔧"
    },
    {
      title: "Google Ads Management",
      description: "Strategic Google Ads campaigns that maximize ROI and drive qualified traffic to your business",
      icon: "📊"
    }
  ];

  // Portfolio data
  const portfolioItems = [
    { 
      title: "Personal Portfolio Website", 
      category: "Portfolio", 
      image: "🛍️",
      description: "Modern online fashion store with advanced filtering, wishlist, and seamless checkout experience",
      tech: ["React", "Node.js", "WooCommerce", "Paystack"],
      link: "/portfolio/waliu-portfolio"
    },
    { 
      title: "Restaurant Management System", 
      category: "Web Application", 
      image: "🍕",
      description: "Complete restaurant management solution with online ordering, inventory, and analytics dashboard",
      tech: ["Next.js", "Django", "Tailwind CSS", "Shopify"],
      link: "/portfolio/restaurant-system"
    }
  ];

  // Updated Tech stack data
  const techStacks = [
    { name: "WordPress", category: "CMS", icon: "🔷", description: "Popular content management system for websites" },
    { name: "Elementor Pro", category: "Page Builder", icon: "🎨", description: "Advanced WordPress page builder for stunning designs" },
    { name: "WooCommerce", category: "E-commerce", icon: "🛒", description: "Powerful WordPress e-commerce plugin" },
    { name: "Paystack", category: "Payment", icon: "💳", description: "African payment gateway for secure transactions" },
    { name: "Node.js", category: "Backend", icon: "🟢", description: "JavaScript runtime for server-side development" },
    { name: "React.js", category: "Frontend", icon: "⚛️", description: "Modern JavaScript library for user interfaces" },
    { name: "PHP", category: "Backend", icon: "🐘", description: "Server-side scripting language for web development" },
    { name: "Django", category: "Framework", icon: "🐍", description: "High-level Python web framework" },
    { name: "Next.js", category: "Framework", icon: "🔺", description: "Full-stack React framework for production" },
    { name: "Shopify", category: "E-commerce", icon: "🛍️", description: "Leading e-commerce platform for online stores" },
    { name: "HTML", category: "Markup", icon: "📄", description: "Standard markup language for web pages" },
    { name: "CSS", category: "Styling", icon: "🎨", description: "Style sheet language for web presentation" },
    { name: "JavaScript", category: "Language", icon: "📘", description: "Dynamic programming language for web interactivity" },
    { name: "Tailwind CSS", category: "Framework", icon: "🌪️", description: "Utility-first CSS framework for rapid development" },
    { name: "Bootstrap", category: "Framework", icon: "🅱️", description: "Popular CSS framework for responsive design" },
    { name: "Figma", category: "UX", icon: "🎨", description: "We use Figma for our UX Design projects" }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Rev. Frank Ntow Gyan",
      company: "Building Planner Designs Limited",
      role: "CEO",
      text: "Working with Celestial Web Solutions was incredible! They transformed our outdated website into a modern, user-friendly platform. Our online sales have increased by 200% since the launch.",
      rating: 5,
      image: "/testimonials/frank.jpg", // Add profile image
      date: "6 months ago"
    },
    {
      name: "Abena Serwaa",
      company: "Serwaa Fashion House",
      role: "CEO",
      text: "The e-commerce website they built for my fashion business is amazing! The integration with local payment systems like MTN MoMo and Paystack works perfectly.",
      rating: 5,
      image: "/testimonials/abena.jpg", // Add profile image
      date: "1 month ago"
    },
    {
      name: "Kwame Mensah",
      company: "Tech Innovations Ghana",
      role: "Project Manager",
      text: "Excellent web development company! They helped us create a complex web application with multiple integrations. Their technical expertise is outstanding.",
      rating: 5,
      image: "/testimonials/kwame.jpg", // Add profile image
      date: "3 weeks ago"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-300 to-red-400 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-5 animate-spin" style={{animationDuration: '20s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Celestial Web Solutions
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Quicksand, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Elevating businesses through exceptional web solutions that combine stunning design, 
              robust functionality, and measurable results.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-orange-500/30 transition-all duration-300 text-lg"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🚀</span>
                <span>Get Started Today</span>
              </motion.button>
              <motion.button
                className="flex items-center space-x-2 border-2 border-orange-500 text-orange-600 dark:text-orange-400 px-8 py-4 rounded-2xl font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300 text-lg"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>👁️</span>
                <span>View Our Work</span>
              </motion.button>
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
                  onClick={() => router.push(service.link)}
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
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.image}</div>
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

          <div className="grid grid-cols-4 gap-8 mb-12">
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  {category.title}
                </h3>
              </motion.div>
            ))}
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white dark:from-gray-900 z-10" />
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white dark:from-gray-900 z-10" />
            
            <div className="flex space-x-12 overflow-hidden py-8">
              <div className="flex space-x-12 animate-scroll">
                {[...techStackCategories, ...techStackCategories].map((category, index) => (
                  <div key={`${category.title}-${index}`} className="flex space-x-8">
                    {category.items.map((item) => (
                      <motion.div
                        key={item.name}
                        className="flex flex-col items-center w-20"
                        whileHover={{ y: -5 }}
                      >
                        <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 p-3 flex items-center justify-center group-hover:shadow-xl transition-all duration-300">
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">
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
                      With over 5 years of experience in web development and design, we've helped over 150 businesses 
                      transform their online presence and achieve remarkable growth.
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
                    >
                      <Link href="/about" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold"></Link>
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
                      <div className="text-6xl mb-6">🌟</div>
                      <h3 className="text-3xl font-bold text-white mb-6"
                          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                        Our Mission
                      </h3>
                      <p className="text-orange-100 text-lg leading-relaxed"
                         style={{ fontFamily: 'Quicksand, sans-serif' }}>
                        To elevate businesses through exceptional web solutions that combine stunning design, 
                        robust functionality, and measurable results that drive sustainable growth.
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
                  >
                    Start Your Project Today
                  </motion.button>
                </motion.div>
              </div>
            </section>
          </div>
        );
      };
      
      export default IndexPage;