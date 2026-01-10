
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import WhatsAppButton from '../../components/WhatsAppButton';
import { ArrowRight, ArrowLeft, CheckCircle2, Zap, Users, Clock, Award, Search, Monitor, ShoppingCart, LifeBuoy } from 'lucide-react';

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
  title: "Professional SEO Services in Ghana",
  slug: "seo-services-in-ghana",
  description: "We elevate your online visibility with data-driven SEO strategies that drive organic traffic and improve search rankings. Our services include keyword research, on-page optimization, technical SEO, local SEO for Ghana, and monthly performance reports showing measurable results.",
  metaTitle: "SEO Services in Ghana | Search Engine Optimization Experts",
  metaDescription: "Celestial Web Solutions offers professional SEO services in Ghana to help businesses rank higher on Google and attract more customers online.",
  metaKeywords: [
    "SEO services in Ghana",
    "search engine optimization Ghana",
    "local SEO Ghana"
  ],
  icon: require("lucide-react").Search,
  heroImage: "https://www.intellibright.com/wp-content/uploads/2025/04/Search-Engine-Optimization.jpg",
  keywords: [
    "SEO services in Ghana",
    "search engine optimization Ghana",
    "local SEO Ghana"
  ],
  details: [
    {
      heading: "Search Engine Optimization for Ghanaian Businesses",
      content: [
        "Comprehensive SEO audits to identify growth opportunities for your website.",
        "Competitive analysis to understand what your rivals rank for.",
        "Custom SEO strategy aligned with your business goals and market.",
        "Monthly monitoring and reporting with actionable recommendations."
      ]
    },
    {
      heading: "On-Page & Technical SEO",
      content: [
        "Meta tags, heading structure, and content optimization for ranking.",
        "Site speed optimization and Core Web Vitals improvements.",
        "Mobile-first indexing compliance and responsive design.",
        "Structured data and schema markup for rich search results."
      ]
    },
    {
      heading: "Local SEO for Businesses in Ghana",
      content: [
        "Google My Business optimization and local citation building.",
        "Location-based keyword targeting for Ghana and major cities.",
        "Local link building and community engagement strategies.",
        "Review management and local schema setup for map visibility."
      ]
    },
    {
      heading: "Keyword Research & Content Optimization",
      content: [
        "In-depth keyword research using analytics and search intent data.",
        "Content creation and optimization for high-volume, low-competition terms.",
        "Blog strategy and publishing schedule to attract organic traffic.",
        "Internal linking strategy to distribute authority across your site."
      ]
    },
    {
      heading: "Long-Term SEO Growth Strategy",
      content: [
        "Link building campaigns with high-authority, relevant websites.",
        "Backlink analysis and competitor link research.",
        "Content marketing to establish thought leadership and earn links.",
        "Continuous optimization based on data and algorithm updates."
      ]
    },
    {
      heading: "Tech Stack",
      content: [
        { name: "Google Analytics", url: "https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg" },
        { name: "Google Search Console", url: "https://cdn.worldvectorlogo.com/logos/google-search-console.svg" },
        { name: "Ahrefs", url: "data:image/png;base64,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" },
        { name: "SEMrush", url: "data:image/png;base64,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" }
      ]
    },
    {
      heading: "Pricing",
      content: [
        "SEO Audit: from $120 (GH₵1,500)",
        "Monthly SEO Package: from $60 (GH₵800)",
        "Local SEO: from $180 (GH₵2,300)"
      ]
    }
  ]
};

export default function SEOOptimizationServicePage() {
  const pageTitle = service.metaTitle || `${service.title} | Celestial Web Solutions`;
  const pageDescription = service.metaDescription || service.description;
  const pageKeywords = (service.metaKeywords && service.metaKeywords.length > 0 ? service.metaKeywords : service.keywords).join(', ');

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={service.heroImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={service.heroImage} />
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
