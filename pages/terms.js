import Head from "next/head";
import { motion } from "framer-motion";
import {
  FileText,
  Shield,
  Clock,
  CreditCard,
  Users,
  AlertTriangle,
  CheckCircle,
  Info,
  Mail,
  Phone,
  MapPin,
  Download,
} from "lucide-react";
import WhatsAppButton from '../components/WhatsAppButton';
import PremiumCTA from '../components/PremiumCTA';
import { TERMS_META, TERMS_SECTIONS } from '../lib/termsContent';

const ICON_MAP = {
  fileText: FileText,
  users: Users,
  creditCard: CreditCard,
  clock: Clock,
  checkCircle: CheckCircle,
  shield: Shield,
  info: Info,
  alertTriangle: AlertTriangle,
};

export default function Terms() {
  const sections = TERMS_SECTIONS.map((section) => ({
    ...section,
    icon: ICON_MAP[section.iconKey] || FileText,
  }));

  return (
    <>
      <Head>
        <title>Terms & Conditions | Celestial Web Solutions</title>
        <meta
          name="description"
          content="Terms and conditions for Celestial Web Solutions' web development services. Our policies on payments, project delivery, warranties, and client responsibilities. Download the branded PDF."
        />
        <meta
          name="keywords"
          content="terms and conditions, web development contract, service agreement, Celestial Web Solutions terms, Ghana web development policies, download PDF"
        />
        <meta name="author" content="Celestial Web Solutions" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Terms & Conditions | Celestial Web Solutions" />
        <meta
          property="og:description"
          content="Read our terms and conditions for web development services, payment policies, and client agreements. Download a Celestial-branded PDF."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.celestialwebsolutions.net/terms" />

        <link rel="canonical" href="https://www.celestialwebsolutions.net/terms" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        <section className="relative py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=600&fit=crop"
              alt="Terms and Conditions Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/80 via-orange-600/80 to-red-500/80"></div>
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
                Terms & Conditions
              </h1>
              <p
                className="text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: "Albert Sans, sans-serif", fontWeight: 400 }}
              >
                Please read these terms and conditions carefully before using our services
              </p>
              <div className="mt-6 text-orange-100">
                <p style={{ fontFamily: "Albert Sans, sans-serif" }}>
                  Last Updated: {TERMS_META.lastUpdated}
                </p>
              </div>
              <div className="mt-8 flex justify-center">
                <a
                  href={`/${TERMS_META.filename}`}
                  download={TERMS_META.filename}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-orange-600 font-semibold shadow-lg shadow-orange-900/20 transition hover:bg-orange-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  style={{ fontFamily: "Albert Sans, sans-serif" }}
                >
                  <Download size={18} aria-hidden />
                  Download PDF
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {sections.slice(0, 5).map((section, index) => (
                <motion.a
                  key={index}
                  href={`#section-${index + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm border border-orange-200 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors"
                  style={{ fontFamily: "Albert Sans, sans-serif" }}
                >
                  <section.icon size={16} className="text-orange-500" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {section.title.split('.')[1]?.trim() || section.title}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700"
            >
              <div className="flex items-start space-x-4">
                <Info className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h2
                    className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    Important Information
                  </h2>
                  <p
                    className="text-blue-600 dark:text-blue-200 leading-relaxed"
                    style={{ fontFamily: "Albert Sans, sans-serif" }}
                  >
                    {TERMS_META.intro}
                  </p>
                  <a
                    href={`/${TERMS_META.filename}`}
                    download={TERMS_META.filename}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400"
                    style={{ fontFamily: "Albert Sans, sans-serif" }}
                  >
                    <Download size={16} aria-hidden />
                    Download Celestial-branded PDF
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  id={`section-${index + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <section.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h2
                        className="text-2xl font-bold text-gray-900 dark:text-white"
                        style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                      >
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div
                    className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: "Albert Sans, sans-serif" }}
                  >
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <h3
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Questions About Our Terms?
              </h3>
              <p
                className="text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: "Albert Sans, sans-serif" }}
              >
                If you have any questions about these Terms and Conditions, please don't hesitate to contact us.
                We're here to help clarify any concerns you may have.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <PremiumCTA href="/contact" size="large" variant="light">
                  Contact Us
                </PremiumCTA>
                <a
                  href={`/${TERMS_META.filename}`}
                  download={TERMS_META.filename}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/80 bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                  style={{ fontFamily: "Albert Sans, sans-serif" }}
                >
                  <Download size={18} aria-hidden />
                  Download PDF
                </a>
              </div>

              <div className="mt-8 text-orange-100 space-y-2">
                <p className="flex items-center justify-center space-x-2" style={{ fontFamily: "Albert Sans, sans-serif" }}>
                  <Mail size={18} />
                  <span>Email: {TERMS_META.email}</span>
                </p>
                <p className="flex items-center justify-center space-x-2" style={{ fontFamily: "Albert Sans, sans-serif" }}>
                  <Phone size={18} />
                  <span>Phone: {TERMS_META.phone} · WhatsApp: {TERMS_META.whatsapp}</span>
                </p>
                <p className="flex items-center justify-center space-x-2" style={{ fontFamily: "Albert Sans, sans-serif" }}>
                  <MapPin size={18} />
                  <span>{TERMS_META.address}</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        <WhatsAppButton />
      </div>
    </>
  );
}
