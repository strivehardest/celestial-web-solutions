import Footer from './Footer';
import Head from 'next/head';
import PromoPopup from './PromoPopup';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Sun, Moon, Phone } from 'lucide-react';
import PremiumCTA from './PremiumCTA';

export default function Layout({ children }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ];

  const whatsappNumber = '+233245671832';
  const whatsappMessage = encodeURIComponent('Hello! I am interested in your web development services.');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
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

      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <img 
                  src="/logo.png" 
                  alt="Celestial Web Solutions" 
                  className="h-10 w-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <span 
                  className="hidden text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                >
                  Celestial
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-medium transition-colors duration-300 ${
                    router.pathname === link.href
                      ? 'text-orange-600 dark:text-orange-400'
                      : scrolled 
                        ? 'text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400'
                        : 'text-white hover:text-orange-200'
                  }`}
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  {link.label}
                  {router.pathname === link.href && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 right-0 bottom-[-4px] h-0.5 bg-orange-500"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* WhatsApp Button - Use PremiumCTA for consistency */}
              <PremiumCTA
                href={whatsappLink}
                size="small"
                variant="secondary"
                external
                className="!px-4 !py-2"
                icon={true}
              >
                WhatsApp
              </PremiumCTA>
              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  scrolled
                    ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              {/* Get Started CTA */}
              <PremiumCTA href="/contact" size="small">
                Get Started
              </PremiumCTA>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile WhatsApp */}
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-green-500 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.a>

              {/* Dark Mode Toggle Mobile */}
              <motion.button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${
                  scrolled
                    ? 'text-gray-700 dark:text-gray-200'
                    : 'text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Hamburger Menu */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg ${
                  scrolled
                    ? 'text-gray-700 dark:text-gray-200'
                    : 'text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 font-medium transition-colors duration-300 ${
                      router.pathname === link.href
                        ? 'text-orange-600 dark:text-orange-400'
                        : 'text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400'
                    }`}
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4">
                  <PremiumCTA href="/contact" size="default" className="w-full justify-center">
                    Get Started
                  </PremiumCTA>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 
                className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent mb-4"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                Celestial Web Solutions
              </h3>
              <p 
                className="text-gray-400 mb-6 max-w-md"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Transforming ideas into stunning digital experiences. We build modern, 
                responsive websites that help businesses grow and succeed online.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com/celestialwebsolutions" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://twitter.com/strivehardest" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="https://linkedin.com/in/aforlabi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Quick Links</h4>
              <ul className="space-y-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Contact Us</h4>
              <ul className="space-y-3 text-gray-400" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                <li className="flex items-center space-x-2">
                  <Phone size={16} className="text-orange-500" />
                  <span>+233 24 567 1832</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                  <span>info@celestialwebsolutions.net</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-orange-500 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                  <span>235 Agblor Link, Keta<br/>Accra, Ghana</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            <p>&copy; {new Date().getFullYear()} Celestial Web Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}