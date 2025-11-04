import { motion } from "framer-motion";
import { Monitor, Code, Search, ShoppingCart, Palette, Headphones, Target, MousePointer, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
import WhatsAppButton from '../components/WhatsAppButton';

const services = [
  { 
    title: "Web Development",
    slug: "web-development",
    description: "We build robust, scalable web applications using cutting-edge technologies like React, Next.js, and Node.js. From simple business websites to complex enterprise systems, we create custom solutions that grow with your business, including CMS platforms, e-learning systems, and API integrations.",
    icon: Code,
    keywords: ["web development", "custom web applications", "React development", "Node.js"]
  },
  { 
    title: "Web Design",
    slug: "web-design",
    description: "We create stunning, responsive websites that captivate your audience across all devices. Our designs blend modern aesthetics with intuitive user experience, featuring optimal color schemes, strategic layouts, and conversion-oriented elements that reflect your brand identity and maximize engagement.",
    icon: Monitor,
    keywords: ["responsive web design", "modern website design", "UI design", "mobile-first design"]
  },
  { 
    title: "E-Commerce Solutions",
    slug: "ecommerce-solutions",
    description: "We develop high-converting online stores with secure payment gateways, inventory management, and user-friendly interfaces. Our platforms support multiple payment options including mobile money, feature abandoned cart recovery, product recommendations, and comprehensive analytics dashboards.",
    icon: ShoppingCart,
    keywords: ["e-commerce development", "online store", "payment gateway", "mobile money integration"]
  },
  { 
    title: "SEO Optimization",
    slug: "seo-optimization",
    description: "We elevate your online visibility with data-driven SEO strategies that drive organic traffic and improve search rankings. Our services include keyword research, on-page optimization, technical SEO, local SEO for Ghana, and monthly performance reports showing measurable results.",
    icon: Search,
    keywords: ["SEO services", "search engine optimization", "organic traffic", "local SEO Ghana"]
  },
  { 
    title: "UX/UI Design",
    slug: "ux-ui-design",
    description: "We craft exceptional user experiences through thoughtful design that combines beauty with functionality. Our process includes user research, wireframing, interactive prototypes, and usability testing to create intuitive, accessible interfaces that work seamlessly across all platforms.",
    icon: Palette,
    keywords: ["UX design", "UI design", "user experience", "wireframing", "usability testing"]
  },
  { 
    title: "IT Support",
    slug: "it-support",
    description: "We provide comprehensive IT support to keep your business technology running smoothly. From system setup and maintenance to troubleshooting, security implementations, and technology consulting, we ensure your technology enables business growth rather than causing downtime.",
    icon: Headphones,
    keywords: ["IT support", "technical support", "system maintenance", "cybersecurity"]
  },
  { 
    title: "Google AdSense Management",
    slug: "google-adsense-management",
    description: "We maximize your website revenue through strategic AdSense optimization. Our services include ad placement optimization, A/B testing, content strategy development, performance monitoring, and policy compliance to ensure sustainable revenue growth from your website traffic.",
    icon: Target,
    keywords: ["Google AdSense", "ad revenue optimization", "website monetization", "content monetization"]
  },
  { 
    title: "Google Ads Management",
    slug: "google-ads-management",
    description: "We drive targeted traffic and maximize conversions through expertly managed Google Ads campaigns. Our certified specialists handle strategy, keyword research, ad creation, bid management, and continuous optimization across Search, Display, Shopping, and Video campaigns to maximize your ROI.",
    icon: MousePointer,
    keywords: ["Google Ads", "PPC management", "paid advertising", "campaign management"]
  }
];

// Happy Clients Data
const happyClients = [
  { name: "Building Planner Designs", logo: "/png/projects/building.png" },
  { name: "Ghana Updates Online", logo: "/png/projects/ghanaupdates1.jpg" },
  { name: "AdBay Store", logo: "/png/projects/Adbay1.png" },
  { name: "Elolo Agbleke", logo: "/png/projects/elolo2.jpeg" },
  { name: "Mart Ban Logistics", logo: "/png/projects/martb.png" },
];

export default function ServicesPage() {
  // SEO Meta Tags and Structured Data
  useEffect(() => {
    document.title = "Professional Web Services | Celestial Web Solutions - Web Development, SEO & Digital Marketing";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Expert web development, design, SEO optimization, e-commerce solutions, and digital marketing services. Transform your business with Celestial Web Solutions' comprehensive digital services.";

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "web development, web design, best web designer in Accra, best web designer Ghana, SEO optimization, e-commerce solutions, UX/UI design, IT support, Google AdSense, Google Ads, digital marketing";

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Celestial Web Solutions",
      "description": "Best web Designer in Accra, Best Web Developer in Accra, design, and digital marketing services",
      "url": window.location.origin,
      "logo": `${window.location.origin}/logo.png`,
      "sameAs": [
        "https://facebook.com/celestialwebsolutions",
        "https://twitter.com/strivehardest",
        "https://linkedin.com/in/aforlabi"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+233-245671832",
        "contactType": "Customer Service",
        "availableLanguage": "English"
      },
      "areaServed": "Worldwide",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Services",
        "itemListElement": services.map((service, index) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.title,
            "description": service.description,
            "provider": {
              "@type": "Organization",
              "name": "Celestial Web Solutions"
            }
          }
        }))
      }
    };

    let structuredDataScript = document.querySelector('#structured-data');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

    return () => {
      const script = document.querySelector('#structured-data');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full opacity-30 animate-spin" style={{animationDuration: '20s'}}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Our Services
            </h1>
            <p
              className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "Quicksand, sans-serif" }}
            >
              Comprehensive digital solutions to transform your business presence and drive measurable growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scrolling Clients Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
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
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8" style={{ fontFamily: "Quicksand, sans-serif" }}>
            Trusted by businesses 
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

      {/* Services Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-700"
              >
                <div className="flex gap-6 mb-6">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {service.icon && <service.icon className="w-8 h-8 text-white" />}
                  </motion.div>
                  <h3 
                    className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                  >
                    {service.title}
                  </h3>
                </div>

                <p 
                  className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                >
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {service.keywords.map((keyword, idx) => (
                    <span 
                      key={idx}
                      className="text-sm px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full"
                      style={{ fontFamily: 'Quicksand, sans-serif' }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Learn More Link */}
                <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold hover:gap-3 transition-all duration-300 cursor-pointer" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 
                className="text-2xl md:text-3xl font-bold mb-6 text-white"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Ready to Transform Your Business?
              </h2>
              <p
                className="text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                Let's discuss your project and create something amazing together. Get started with a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                >
                  Get Started Today
                </Link>
                <Link
                  href="/portfolio"
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <WhatsAppButton />
    </div>
  );
}