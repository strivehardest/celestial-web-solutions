import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Menu, X, ChevronDown, FileText, Shield, HelpCircle, CreditCard, BookOpen, DollarSign } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TalkToExpertModal from './TalkToExpertModal';


const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPath, setCurrentPath] = useState('/');
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Our Services', href: '/web-design-company-in-ghana' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About Us', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { 
      name: 'Resources', 
      href: '/#',
      megaMenu: true,
      dropdown: [
        { name: 'Blog', href: '/blog', description: 'Insights, tutorials & industry updates', icon: 'blog' },
        { name: 'Pricing', href: '/pricing', description: 'Transparent plans for every budget', icon: 'pricing' },
        { name: 'FAQs', href: '/faqs', description: 'Quick answers to common questions', icon: 'faqs' },
        { name: 'Make Payment', href: '/payment', description: 'Secure & easy online payments', icon: 'payment' },
        { name: 'Terms of Service', href: '/terms', description: 'Our terms & conditions', icon: 'terms' },
        { name: 'Privacy Policy', href: '/privacy', description: 'How we protect your data', icon: 'privacy' }
      ]
    },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (href) => {
    if (href === '/') return currentPath === '/';
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  const handleNavigation = (href) => {
    if (typeof window !== 'undefined') {
      setIsMenuOpen(false);
      setActiveDropdown(null);
      if (href.startsWith('https://')) {
        window.open(href, '_blank', 'noopener,noreferrer');
        return;
      }
      router.push(href);
    }
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      setCurrentPath(url);
      setIsMenuOpen(false);
      setActiveDropdown(null);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router.events]);

  const Logo = () => {
    const logoImagePath = scrolled ? "/logo.png" : "/logo-white.png";
    const useImageLogo = true;
    const logoSize = "w-20 h-20";

    if (useImageLogo && logoImagePath) {
      return (
        <motion.div
          className="flex items-center cursor-pointer group"
          onClick={() => handleNavigation('/')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <motion.img
              src={logoImagePath}
              alt="Celestial Web Solutions Logo"
              className={`${logoSize} object-contain`}
              whileHover={{ rotate: 5 }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div className="ml-3">
            <div
              className={scrolled
                ? "text-xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300"
                : "text-xl font-bold text-white transition-all duration-300"}
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              Celestial
            </div>
            <div
              className={scrolled ? "text-xs text-gray-500 dark:text-gray-400 -mt-1" : "text-xs text-white -mt-1"}
              style={{ fontFamily: 'Google Sans, sans-serif' }}
            >
              Web Solutions
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        className="flex items-center cursor-pointer group"
        onClick={() => handleNavigation('/')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div whileHover={{ rotate: 5 }} className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-lg">
          C
        </motion.div>
        <div className="ml-3">
          <div className="text-xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
            Celestial
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Web Solutions
          </div>
        </div>
      </motion.div>
    );
  };

  // ✅ Request a Service Button — Desktop
  const RequestServiceButton = () => (
    <motion.button
      onClick={() => setIsExpertModalOpen(true)}
      className="hidden md:flex items-center gap-2.5 px-5 py-2.5 rounded-full font-semibold text-sm relative overflow-hidden"
      style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Outer glow ring */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #f97316, #ef4444)',
          boxShadow: '0 0 0 0 rgba(249,115,22,0.5)',
        }}
        animate={{
          boxShadow: [
            '0 0 0 0px rgba(249,115,22,0.4)',
            '0 0 0 6px rgba(249,115,22,0)',
          ],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />

      {/* Shimmer sweep */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% center', '-200% center'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
      />

      {/* Code icon */}
      <span className="relative z-10 flex items-center justify-center w-5 h-5 bg-white/20 rounded-full">
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </span>

      {/* Text */}
      <span className="relative z-10 text-white tracking-wide">Request a Service</span>

      {/* Arrow */}
      <motion.span
        className="relative z-10"
        initial={{ x: 0 }}
        whileHover={{ x: 3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.span>
    </motion.button>
  );

  // ✅ Request a Service Button — Mobile
  const RequestServiceButtonMobile = () => (
    <motion.button
      onClick={() => { setIsMenuOpen(false); setIsExpertModalOpen(true); }}
      className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-semibold relative overflow-hidden"
      style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Background gradient */}
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-500 to-red-500" />

      {/* Shimmer */}
      <motion.span
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% center', '-200% center'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
      />

      {/* Pulsing dot */}
      <span className="relative z-10 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-white animate-ping absolute opacity-75" />
        <span className="w-2 h-2 rounded-full bg-white relative" />
      </span>

      {/* Code icon */}
      <span className="relative z-10 flex items-center justify-center w-6 h-6 bg-white/20 rounded-full">
        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </span>

      <span className="relative z-10 text-white text-base tracking-wide">Request a Service</span>

      <motion.span
        className="relative z-10"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.span>
    </motion.button>
  );

  // Icon map for mega menu items
  const getDropdownIcon = (iconName) => {
    const iconClass = "w-5 h-5";
    switch (iconName) {
      case 'blog': return <BookOpen className={iconClass} />;
      case 'pricing': return <DollarSign className={iconClass} />;
      case 'faqs': return <HelpCircle className={iconClass} />;
      case 'payment': return <CreditCard className={iconClass} />;
      case 'terms': return <FileText className={iconClass} />;
      case 'privacy': return <Shield className={iconClass} />;
      default: return <FileText className={iconClass} />;
    }
  };

  const renderNavItem = (item) => {
    if (item.dropdown) {
      return (
        <motion.button
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
            isActive(item.href)
              ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25'
              : scrolled
                ? 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                : 'text-white hover:text-orange-100 hover:bg-white/10'
          }`}
          style={{ fontFamily: 'Google Sans, sans-serif' }}
          whileHover={{ y: -1 }}
          onClick={() => handleNavigation(item.href)}
        >
          <span>{item.name}</span>
          <motion.svg
            className="w-4 h-4 transition-transform duration-200"
            animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>
      );
    }

    return (
      <motion.button
        className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative ${
          isActive(item.href)
            ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25'
            : scrolled
              ? 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
              : 'text-white hover:text-orange-100 hover:bg-white/10'
        }`}
        style={{ fontFamily: 'Google Sans, sans-serif' }}
        whileHover={{ y: -1 }}
        onClick={() => handleNavigation(item.href)}
      >
        <span>{item.name}</span>
        {item.name === 'Courses' && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">
            New
          </span>
        )}
      </motion.button>
    );
  };

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/20 dark:border-gray-700/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 md:h-20">

            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 md:space-x-3 lg:space-x-4">
              {navigation.map((item) => (
                <div key={item.name} className="relative group"
                  onMouseEnter={() => item.dropdown ? setActiveDropdown(item.name) : null}
                  onMouseLeave={() => item.dropdown ? setActiveDropdown(null) : null}
                >
                  {renderNavItem(item)}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      item.megaMenu ? (
                        /* StackOverflow-style Mega Menu */
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.96 }}
                          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                          className="absolute top-full right-0 pt-3 w-[520px]"
                        >
                        <div className="bg-white dark:bg-gray-900 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-gray-200/60 dark:border-gray-700/40 overflow-hidden">
                          {/* Header */}
                          <div className="px-6 pt-5 pb-3 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500" style={{ fontFamily: 'Google Sans, sans-serif' }}>Resources</h3>
                          </div>

                          {/* 2-column grid */}
                          <div className="grid grid-cols-2 gap-1 p-3">
                            {item.dropdown.map((dropItem, index) => (
                              <motion.button
                                key={dropItem.name}
                                className="flex items-start gap-3 px-4 py-3.5 rounded-xl text-left hover:bg-orange-50/70 dark:hover:bg-orange-900/15 transition-all duration-200 group"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.04 }}
                                onClick={() => handleNavigation(dropItem.href)}
                              >
                                <span className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 flex items-center justify-center text-orange-500 dark:text-orange-400 group-hover:from-orange-100 group-hover:to-orange-200 dark:group-hover:from-orange-900/50 dark:group-hover:to-orange-800/30 transition-all duration-200">
                                  {getDropdownIcon(dropItem.icon)}
                                </span>
                                <div className="min-w-0">
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">{dropItem.name}</span>
                                  <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{dropItem.description}</span>
                                </div>
                              </motion.button>
                            ))}
                          </div>

                          {/* Footer CTA */}
                          <div className="px-6 py-3.5 bg-gray-50/80 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                            <motion.button
                              className="flex items-center gap-2 text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-200"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                              whileHover={{ x: 3 }}
                              onClick={() => handleNavigation('/contact')}
                            >
                              <span>Need help? Contact us</span>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                        </motion.div>
                      ) : (
                        /* Regular dropdown for non-mega items */
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 pt-2 w-64"
                        >
                        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 overflow-hidden">
                          <div className="py-3">
                            {item.dropdown.map((dropItem, index) => (
                              <motion.button
                                key={dropItem.name}
                                className="w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-900/20 transition-all duration-200 text-left"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                                whileHover={{ x: 4 }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => handleNavigation(dropItem.href)}
                              >
                                <span className="font-medium">{dropItem.name}</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                        </motion.div>
                      )
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* ✅ Request a Service Desktop Button */}
              <RequestServiceButton />

              {/* Mobile menu button */}
              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl mt-4 shadow-2xl border border-gray-200/20 dark:border-gray-700/20"
              >
                <div className="p-6 space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 relative ${
                          isActive(item.href)
                            ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg'
                            : 'text-gray-800 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-900/20'
                        }`}
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                        onClick={() => item.dropdown ? setActiveDropdown(activeDropdown === item.name ? null : item.name) : handleNavigation(item.href)}
                      >
                        <span className="flex items-center gap-2">
                          {item.name}
                          {item.name === 'Courses' && (
                            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">New</span>
                          )}
                        </span>
                        {item.dropdown && (
                          <motion.span animate={{ rotate: activeDropdown === item.name ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-lg flex items-center">
                            <ChevronDown size={20} />
                          </motion.span>
                        )}
                      </button>

                      <AnimatePresence>
                        {item.dropdown && activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-2 overflow-hidden"
                          >
                            {/* Section header for mobile mega menu */}
                            {item.megaMenu && (
                              <div className="px-4 py-2 mb-1">
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Resources</span>
                              </div>
                            )}
                            <div className={item.megaMenu ? 'space-y-0.5 ml-2' : 'space-y-1 ml-4'}>
                              {item.dropdown.map((dropItem, dropIndex) => (
                                <motion.button
                                  key={dropItem.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: dropIndex * 0.05 }}
                                  className="w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-orange-50/50 dark:hover:bg-orange-900/15 rounded-xl transition-all duration-200 group"
                                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                                  onClick={() => handleNavigation(dropItem.href)}
                                >
                                  {item.megaMenu && dropItem.icon && (
                                    <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 dark:text-orange-400">
                                      {getDropdownIcon(dropItem.icon)}
                                    </span>
                                  )}
                                  <div className="min-w-0">
                                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{dropItem.name}</span>
                                    {dropItem.description && (
                                      <span className="block text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-relaxed">{dropItem.description}</span>
                                    )}
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  {/* ✅ Request a Service Mobile Button */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <RequestServiceButtonMobile />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Request a Service Modal */}
      <TalkToExpertModal
        isOpen={isExpertModalOpen}
        onClose={() => setIsExpertModalOpen(false)}
      />
    </>
  );
};

export default Navbar;