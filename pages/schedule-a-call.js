import Head from 'next/head';
import { motion } from 'framer-motion';
import WhatsAppButton from '../components/WhatsAppButton';
import dynamic from 'next/dynamic';
// Dynamically import CalendlyWidget with no SSR to avoid hydration mismatch
const CalendlyWidget = dynamic(() => import('../components/CalendlyWidget'), { ssr: false });

export default function ScheduleCall() {
  return (
    <>
      <Head>
        <title>Schedule a Call | Celestial Web Solutions</title>
        <meta name="description" content="Book a free consultation call with Celestial Web Solutions to discuss your web project, get expert advice, and start your digital journey." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://celestialwebsolutions.net/schedule-a-call" />
      </Head>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1500&q=80)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/95 via-orange-600/90 to-red-500/95"></div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Schedule a Call
              </h1>
              <p className="text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                Book a free consultation with our team. Let’s discuss your project, answer your questions, and help you achieve your digital goals.
              </p>
            </motion.div>
          </div>
        </section>
        <div className="max-w-2xl mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Book Your Free Consultation
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              Choose a time that works for you and we’ll connect via phone or video call.
            </p>
          </motion.div>
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-orange-100 dark:border-gray-700">
            <CalendlyWidget />
          </div>
          <div className="mt-10 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              Prefer to contact us directly?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+233245671832" className="flex items-center justify-center text-white bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded-xl transition-all text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>Call</a>
              <a href="https://wa.me/233530505031" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-white bg-green-500 hover:bg-green-600 font-bold py-2 px-4 rounded-xl transition-all text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>WhatsApp</a>
              <a href="mailto:info@celestialwebsolutions.net" className="flex items-center justify-center text-white bg-red-500 hover:bg-red-600 font-bold py-2 px-4 rounded-xl transition-all text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>Email</a>
            </div>
          </div>
        </div>
        <WhatsAppButton />
      </div>
    </>
  );
}
