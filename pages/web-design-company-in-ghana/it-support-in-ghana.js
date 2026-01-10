
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
  title: "Professional IT Support in Ghana",
  slug: "it-support-in-ghana",
  description: "Reliable IT support and maintenance services including server management, website security, performance optimization, email setup, backups, monitoring, and emergency incident response to keep your business running smoothly.",
  metaTitle: "IT Support Services in Ghana | Reliable Maintenance & Security",
  metaDescription: "Celestial Web Solutions provides professional IT support in Ghana — server management, security hardening, monitoring, backups, email/DNS setup, and 24/7 incident response.",
  metaKeywords: [
    "IT support Ghana",
    "website maintenance Ghana",
    "security hardening Ghana",
    "server management Ghana"
  ],
  icon: require("lucide-react").LifeBuoy,
  heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=90&w=2400&auto=format&fit=crop",
  keywords: ["IT support", "website maintenance", "security", "server management", "monitoring"],
  details: [
    {
      heading: "What We Offer",
      content: [
        "Website maintenance and uptime monitoring",
        "Security hardening and malware cleanup",
        "SSL, DNS, and email setup",
        "Performance optimization and backups"
      ]
    },
    {
      heading: "Support Tools",
      content: [
        { name: "Cloudflare", url: "https://cdn.worldvectorlogo.com/logos/cloudflare.svg" },
        { name: "Google Workspace", url: "https://hiviewsolutions.com/wp-content/uploads/2024/08/HiView-Solutions-Google-Workspace-Reseller.-Super-G-Icon.png" },
        { name: "Microsoft 365", url: "https://its.uri.edu/wp-content/uploads/Office-365-2.jpg" },
        { name: "AWS", url: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
        { name: "DigitalOcean", url: "https://cdn.worldvectorlogo.com/logos/digitalocean-2.svg" },
      ]
    },
    {
      heading: "Pricing",
      content: [
        "Basic Maintenance: from $40/mo (GH₵500)",
        "Security Package: from $80/mo (GH₵1,000)",
        "24/7 Support: from $120/mo (GH₵1,500)",
        "Contact us for a custom plan."
      ]
    }
  ]
};

export default function ITSupportServicePage() {
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
