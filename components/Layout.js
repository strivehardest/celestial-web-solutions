import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
import PromoPopup from "./PromoPopup";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function Layout({ children }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />

        {/* Custom Scrollbar Styles */}
        <style jsx global>{`
          ::-webkit-scrollbar {
            width: 12px;
            height: 12px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }

          .dark ::-webkit-scrollbar-track {
            background: #1f2937;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #ea580c, #f97316);
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: padding-box;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #c2410c, #ea580c);
          }

          * {
            scrollbar-width: thin;
            scrollbar-color: #f97316 #f1f1f1;
          }

          .dark * {
            scrollbar-color: #f97316 #1f2937;
          }

          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </Head>

      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <PromoPopup />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-orange-500/25 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}