
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import WhatsAppButton from '../../components/WhatsAppButton';
import { ArrowRight, ArrowLeft, CheckCircle2, Zap, Users, Clock, Award, Search, Code, Monitor, ShoppingCart, LifeBuoy } from 'lucide-react';

const GlassButton = ({ children, href, variant = 'light', external = false }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 backdrop-blur-md border";
  const variants = {
    light: "bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl",
    dark: "bg-black/20 hover:bg-black/30 text-gray-900 dark:text-white border-black/20 dark:border-white/20",
    orange: "bg-orange-500/90 hover:bg-orange-600 text-white border-orange-400/50 hover:border-orange-500 shadow-lg hover:shadow-orange-500/25",
    outline: "bg-transparent hover:bg-white/10 text-white border-white/50 hover:border-white"
  };
  const Component = external ? 'a' : Link;
  const props = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
  return (
    <Component {...props} className={`${baseStyles} ${variants[variant]}`} style={{ fontFamily: 'Google Sans, sans-serif' }}>
      {children}
    </Component>
  );
};

const service = {
  title: "UX/UI Design",
  slug: "ux-ui-design",
  description: "We create intuitive, user-centered designs that enhance user experience and drive engagement. Our UX/UI design services combine research, strategy, and creativity to deliver seamless digital experiences.",
  icon: require("lucide-react").Palette,
  heroImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=90&w=800&auto=format&fit=crop",
  keywords: ["UX design", "UI design", "user experience", "interface design"],
  details: [
    {
      heading: "What We Offer",
      content: [
        "User research and persona development.",
        "Wireframing and prototyping.",
        "Visual design and branding.",
        "Usability testing and iteration.",
        "Responsive design for all devices."
      ]
    },
    {
      heading: "Design Tools",
      content: [
        { name: "Figma", url: "data:image/png;base64,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" },
        { name: "Adobe XD", url: "data:image/png;base64,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" },
        { name: "Framer", url: "https://i.pinimg.com/736x/b2/44/8c/b2448c6183e4a6c6bb9a1a22093905f3.jpg" },
        { name: "Sketch", url: "https://cdn.worldvectorlogo.com/logos/sketch-2.svg" },
      ]
    },
    {
      heading: "Pricing",
      content: [
        "Landing Page Design: from $120 (GH₵1,500)",
        "Full Website UI: from $400 (GH₵5,000)",
        "App UI/UX: from $600 (GH₵7,500)",
        "Contact us for a custom quote."
      ]
    }
  ]
};

export default function UXUIDesignServicePage() {
  // ...identical JSX structure as web-design.js, using the service object above...
  return (
    <>
      <Head>
        <title>{service.title} | Celestial Web Solutions</title>
        <meta name="description" content={service.description} />
        <meta name="keywords" content={service.keywords.join(', ')} />
        <meta name="author" content="Celestial Web Solutions" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://celestialwebsolutions.net/web-design-company-in-ghana/ux-ui-design-in-ghana`} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://celestialwebsolutions.net/web-design-company-in-ghana/ux-ui-design-in-ghana`} />
        <meta property="og:title" content={`${service.title} | Celestial Web Solutions`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:image" content={service.heroImage} />
        <meta property="og:site_name" content="Celestial Web Solutions" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${service.title} | Celestial Web Solutions`} />
        <meta name="twitter:description" content={service.description} />
        <meta name="twitter:image" content={service.heroImage} />
        {/* Structured Data - Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": `${service.title} | Celestial Web Solutions`,
              "description": service.description,
              "provider": {
                "@type": "Organization",
                "name": "Celestial Web Solutions",
                "url": "https://celestialwebsolutions.net"
              },
              "areaServed": "Ghana",
              "image": service.heroImage,
              "keywords": service.keywords.join(', '),
              "url": `https://celestialwebsolutions.net/web-design-company-in-ghana/ux-ui-design-in-ghana`
            })
          }}
        />
      </Head>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {/* Hero Section - Full Width Image Background */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={service.heroImage}
              alt={`${service.title} hero background`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                href="/web-design-company-in-ghana" 
                className="text-white/80 hover:text-white mb-8 inline-flex items-center gap-2 transition font-medium group"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to All Services
              </Link>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6"
              >
                {service.icon && <service.icon className="w-10 h-10 text-white" />}
              </motion.div>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                {service.title}
              </h1>
              <p
                className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed mb-8"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <GlassButton href="/contact" variant="orange">
                  Get Started <ArrowRight className="w-4 h-4" />
                </GlassButton>
                <GlassButton href="/portfolio" variant="light">
                  View Our Work
                </GlassButton>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {service.keywords.map((keyword, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="text-sm px-4 py-2 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 rounded-full font-medium border border-orange-200 dark:border-orange-800/50 shadow-sm"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-12">
              {service.details && service.details.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800"
                >
                  <h2 
                    className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    {section.heading}
                  </h2>
                  {Array.isArray(section.content) && section.content.length > 0 && typeof section.content[0] === 'object' && section.content[0].url ? (
                    <div className="flex flex-wrap gap-6">
                      {section.content.map((tech, i) => (
                        <motion.div 
                          key={i} 
                          className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <img src={tech.url} alt={tech.name} className="w-12 h-12 object-contain mb-2" loading="lazy" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200" style={{ fontFamily: 'Google Sans, sans-serif' }}>{tech.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {section.content.map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-200"
                          style={{ fontFamily: "Google Sans, sans-serif" }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl"
                >
                  <div className="absolute inset-0">
                    <img 
                      src={service.heroImage}
                      alt={`${service.title} background`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/95 via-orange-500/90 to-orange-600/95"></div>
                  </div>
                  <div className="relative z-10 p-6 text-white">
                    <h3
                      className="text-xl font-bold mb-6"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Why Choose Us
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>Fast Delivery</p>
                          <p className="text-orange-200 text-sm">2-4 weeks turnaround</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>20+ Happy Clients</p>
                          <p className="text-orange-200 text-sm">Trusted globally</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>24/7 Support</p>
                          <p className="text-orange-200 text-sm">Always here to help</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>Quality Guaranteed</p>
                          <p className="text-orange-200 text-sm">100% satisfaction</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
                >
                  <h3 
                    className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                  >
                    Ready to Get Started?
                  </h3>
                  <p 
                    className="text-gray-600 dark:text-gray-400 text-sm mb-6"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    Get a free consultation and custom quote for your project.
                  </p>
                  <GlassButton href="/contact" variant="orange" className="w-full">
                    Get Free Quote <ArrowRight className="w-4 h-4" />
                  </GlassButton>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
                >
                  <h3 
                    className="text-lg font-bold text-gray-900 dark:text-white mb-4"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                  >
                    Explore Other Services
                  </h3>
                  <div className="space-y-3">
                    <Link 
                      href="/web-design-company-in-ghana/seo-services-in-ghana"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                        <Search className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                      </div>
                      <span 
                        className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        SEO Optimization
                      </span>
                    </Link>
                    <Link 
                      href="/web-design-company-in-ghana/it-support-in-ghana"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                        <LifeBuoy className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                      </div>
                      <span 
                        className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        IT Support
                      </span>
                    </Link>
                    <Link 
                      href="/web-design-company-in-ghana/web-design-in-ghana"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                        <Monitor className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                      </div>
                      <span 
                        className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        Web Design
                      </span>
                    </Link>
                    <Link 
                      href="/web-design-company-in-ghana/ecommerce-website-development-ghana"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                        <ShoppingCart className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                      </div>
                      <span 
                        className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        E-Commerce Solutions
                      </span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=90&w=2400&auto=format&fit=crop" 
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/95 via-orange-500/90 to-red-500/95"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Let's Build Something Amazing
              </h2>
              <p
                className="text-lg sm:text-xl text-orange-100 mb-10 max-w-2xl mx-auto"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Ready to transform your business with our {service.title.toLowerCase()} expertise? Get started today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlassButton href="/contact" variant="light">
                  Start Your Project <ArrowRight className="w-4 h-4" />
                </GlassButton>
                <GlassButton href="/web-design-company-in-ghana" variant="outline">
                  View All Services
                </GlassButton>
              </div>
            </motion.div>
          </div>
        </section>
        <WhatsAppButton />
      </div>
    </>
  );
}
