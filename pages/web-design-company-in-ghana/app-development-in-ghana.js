import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import WhatsAppButton from '../../components/WhatsAppButton';
import { ArrowRight, ArrowLeft, CheckCircle2, Zap, Users, Clock, Award, Code, Monitor, ShoppingCart, Palette, Smartphone } from 'lucide-react';

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
    <Component {...props} className={`${baseStyles} ${variants[variant]}`} style={{ fontFamily: 'Albert Sans, sans-serif' }}>
      {children}
    </Component>
  );
};

const PAGE_URL = 'https://www.celestialwebsolutions.net/web-design-company-in-ghana/app-development-in-ghana';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.ghanasevent.app';

const service = {
  title: "App Development",
  slug: "app-development-in-ghana",
  description: "We design and build mobile apps for Android and iOS from a single cross-platform codebase. From MVPs to full-featured apps with Mobile Money payments, push notifications and admin dashboards, we take your idea from wireframe to the Google Play Store and Apple App Store.",
  icon: Smartphone,
  heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=90&w=1600&auto=format&fit=crop",
  keywords: ["app development Ghana", "mobile app development", "Android apps", "iOS apps", "cross-platform apps", "React Native", "Expo"],
  details: [
    {
      heading: "What We Build",
      content: [
        "Cross-platform Android and iOS apps from one React Native / Expo codebase.",
        "Booking, ticketing, delivery, e-commerce, school, church and membership apps.",
        "MVPs for startups that need to validate an idea quickly and affordably.",
        "Companion apps for existing websites and web platforms, sharing the same backend.",
        "Internal business apps for field teams, inventory and staff operations."
      ]
    },
    {
      heading: "Features & Integrations",
      content: [
        "User sign-up and login (email, phone OTP, Google and Apple sign-in).",
        "Paystack checkout with MTN MoMo, Telecel Cash, AirtelTigo Money and cards.",
        "Push notifications, in-app messaging and email/SMS alerts.",
        "Maps, location, camera, QR code scanning and offline access.",
        "Admin dashboard (web) to manage users, content, orders and analytics."
      ]
    },
    {
      heading: "Tech Stack",
      content: [
        { name: "React Native", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Expo", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg" },
        { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Supabase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
        { name: "Firebase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
        { name: "Android", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
        { name: "iOS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" }
      ]
    },
    {
      heading: "Our App Development Process",
      content: [
        "Discovery: goals, users, core features and a written scope.",
        "UX/UI design: wireframes and clickable prototypes in Figma for your approval.",
        "Development: weekly builds you can install and test on your own phone.",
        "Testing: real-device QA on Android and iPhone, including slow-network checks.",
        "Launch: Google Play and Apple App Store submission, listings and review support.",
        "Support: 30 days of free bug fixes, then optional monthly maintenance."
      ]
    },
    {
      heading: "App Development Pricing in Ghana",
      content: [
        "Starter App (MVP): from GH₵12,000 — up to 8 screens, auth, 1 platform build or cross-platform, 6–8 weeks.",
        "Standard App: from GH₵20,000 — up to 15 screens, Paystack / Mobile Money, push notifications, Android + iOS, 8–10 weeks.",
        "Advanced App: from GH₵35,000 — custom backend, admin dashboard, real-time features, integrations, 10–12+ weeks.",
        "App maintenance: from GH₵500/month (updates, OS compatibility, store compliance).",
        "Full payment is required before work begins for most projects; flexible plans only for larger projects, agreed in writing."
      ]
    },
    {
      heading: "Timelines",
      content: [
        "Most mobile apps take 6–12 weeks from signed scope to store submission.",
        "Simple MVPs can launch in about 6 weeks; complex apps with custom backends take longer.",
        "Google Play review usually takes a few days; Apple App Store review can take 1–7 days.",
        "Developer accounts are in your name: Google Play (US$25 one-time) and Apple Developer (US$99/year)."
      ]
    }
  ]
};

const faqs = [
  {
    q: "How much does it cost to build a mobile app in Ghana?",
    a: "Our mobile apps start from GH₵12,000 for a starter MVP, GH₵20,000 for a standard Android + iOS app with payments, and from GH₵35,000 for advanced apps with custom backends and admin dashboards. The final quote depends on screens, features and integrations."
  },
  {
    q: "Do you build for both Android and iOS?",
    a: "Yes. We use React Native and Expo, so one codebase powers both Android and iPhone apps. This keeps costs lower and updates faster than building two separate native apps."
  },
  {
    q: "How long does app development take?",
    a: "Typically 6–12 weeks. A focused MVP can be ready in about 6 weeks, while apps with custom backends, dashboards and many integrations take 10–12 weeks or more."
  },
  {
    q: "Can my app accept Mobile Money payments?",
    a: "Yes. We integrate Paystack so your customers can pay with MTN MoMo, Telecel Cash, AirtelTigo Money and cards directly inside the app."
  },
  {
    q: "Will you publish the app to the Play Store and App Store?",
    a: "Yes. We handle store listings, screenshots, privacy details and submission. The developer accounts are registered in your name so you fully own the app."
  }
];

export default function AppDevelopmentServicePage() {
  return (
    <>
      <Head>
        <title>App Development in Ghana | Android & iOS Apps | Celestial Web Solutions</title>
        <meta name="description" content="Mobile app development in Ghana for Android and iOS. Cross-platform React Native apps with Mobile Money payments, push notifications and Play Store / App Store publishing. From GH₵12,000." />
        <meta name="keywords" content={service.keywords.join(', ')} />
        <meta name="author" content="Celestial Web Solutions" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="App Development in Ghana | Celestial Web Solutions" />
        <meta property="og:description" content={service.description} />
        <meta property="og:image" content={service.heroImage} />
        <meta property="og:site_name" content="Celestial Web Solutions" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="App Development in Ghana | Celestial Web Solutions" />
        <meta name="twitter:description" content={service.description} />
        <meta name="twitter:image" content={service.heroImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "App Development in Ghana | Celestial Web Solutions",
              "serviceType": "Mobile App Development",
              "description": service.description,
              "provider": {
                "@type": "Organization",
                "name": "Celestial Web Solutions",
                "url": "https://www.celestialwebsolutions.net"
              },
              "areaServed": "Ghana",
              "image": service.heroImage,
              "keywords": service.keywords.join(', '),
              "url": PAGE_URL,
              "offers": [
                { "@type": "Offer", "name": "Starter App (MVP)", "price": "12000", "priceCurrency": "GHS" },
                { "@type": "Offer", "name": "Standard App", "price": "20000", "priceCurrency": "GHS" },
                { "@type": "Offer", "name": "Advanced App", "price": "35000", "priceCurrency": "GHS" }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((f) => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a }
              }))
            })
          }}
        />
      </Head>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={service.heroImage}
              alt="Mobile app development in Ghana"
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
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
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
                <service.icon className="w-10 h-10 text-white" />
              </motion.div>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                App Development in Ghana
              </h1>
              <p
                className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed mb-8"
                style={{ fontFamily: "Albert Sans, sans-serif" }}
              >
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <GlassButton href="/request-a-service?service=App%20Development" variant="orange">
                  Request an App <ArrowRight className="w-4 h-4" />
                </GlassButton>
                <GlassButton href="/pricing#app-development" variant="light">
                  View App Pricing
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
                  style={{ fontFamily: 'Albert Sans, sans-serif' }}
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-orange-200 dark:border-orange-800/50"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-600 dark:text-orange-400 mb-3" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                  Featured app project
                </p>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <img
                    src="/images/stores/ghanas-event-app-home.jpeg"
                    alt="Ghanas Event mobile app home screen"
                    className="w-40 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <h2
                      className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Ghanas Event Mobile App
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-5" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                      An event discovery and ticketing app for Ghana, built with React Native, Expo, Supabase and Paystack. Attendees find events, pay with Mobile Money and carry secure QR tickets on their phones. The Android app is live on Google Play; iOS is coming soon.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Get Ghanas Event on Google Play">
                        <img src="/images/stores/google-play-badge.png" alt="Get it on Google Play" className="h-12 w-auto" loading="lazy" />
                      </a>
                      <Link
                        href="/portfolio/ghanas-event-app"
                        className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold hover:underline"
                        style={{ fontFamily: 'Albert Sans, sans-serif' }}
                      >
                        View case study <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
              {service.details.map((section, idx) => (
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
                  {typeof section.content[0] === 'object' && section.content[0].url ? (
                    <div className="flex flex-wrap gap-6">
                      {section.content.map((tech, i) => (
                        <motion.div
                          key={i}
                          className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <img src={tech.url} alt={tech.name} className="w-12 h-12 object-contain mb-2" loading="lazy" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{tech.name}</span>
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
                          style={{ fontFamily: "Albert Sans, sans-serif" }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800"
              >
                <h2
                  className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  App Development FAQs
                </h2>
                <div className="space-y-6">
                  {faqs.map((f, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                        {f.q}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                        {f.a}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
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
                          <p className="font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>One Codebase</p>
                          <p className="text-orange-200 text-sm">Android + iOS together</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>6–12 Weeks</p>
                          <p className="text-orange-200 text-sm">Scope to store launch</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>Live on Google Play</p>
                          <p className="text-orange-200 text-sm">Ghanas Event App</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>You Own It</p>
                          <p className="text-orange-200 text-sm">Source code & store accounts</p>
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
                    Have an App Idea?
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-400 text-sm mb-6"
                    style={{ fontFamily: 'Albert Sans, sans-serif' }}
                  >
                    Tell us about your app and get a free consultation and written quote.
                  </p>
                  <GlassButton href="/request-a-service?service=App%20Development" variant="orange">
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
                    {[
                      { href: '/web-design-company-in-ghana/web-development-company-in-ghana', label: 'Web Development', Icon: Code },
                      { href: '/web-design-company-in-ghana/ux-ui-design-in-ghana', label: 'UX/UI Design', Icon: Palette },
                      { href: '/web-design-company-in-ghana/web-design-in-ghana', label: 'Web Design', Icon: Monitor },
                      { href: '/web-design-company-in-ghana/ecommerce-website-development-ghana', label: 'E-Commerce Solutions', Icon: ShoppingCart },
                    ].map(({ href, label, Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                          <Icon className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                        </div>
                        <span
                          className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
                          style={{ fontFamily: 'Albert Sans, sans-serif' }}
                        >
                          {label}
                        </span>
                      </Link>
                    ))}
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
                Let's Build Your App
              </h2>
              <p
                className="text-lg sm:text-xl text-orange-100 mb-10 max-w-2xl mx-auto"
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                Ready to put your business in your customers' pockets? Start your Android and iOS app today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlassButton href="/request-a-service?service=App%20Development" variant="light">
                  Start Your App Project <ArrowRight className="w-4 h-4" />
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
