import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';


const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPath, setCurrentPath] = useState('/');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update current path effect
  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);



  // Navigation structure without icons and updated dropdowns
  const navigation = [
    { 
      name: 'Home', 
      href: '/'
    },
    { 
      name: 'Our Services', 
      href: '/web-design-company-in-ghana',
    
    },
    { 
      name: 'Portfolio', 
      href: '/portfolio'
    },
    { 
      name: 'About Us', 
      href: '/about'
    },
    { 
      name: 'Courses', 
      href: '/courses'
    },
    { 
      name: 'Resources', 
      href: '/#',
      dropdown: [
        { name: 'Terms', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Make Payment', href: '/payment'},
        { name: 'Blog', href: '/blog' },
        { name: 'Pricing', href: '/pricing' }
      ]
    },
    { 
      name: 'Contact', 
      href: '/contact'
    }
  ];

  const isActive = (href) => {
    if (href === '/') {
      return currentPath === '/';
    }
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  // Update the navigation handler
  const handleNavigation = (href) => {
    if (typeof window !== 'undefined') {
      setIsMenuOpen(false);
      setActiveDropdown(null);
      
      // Handle external links (WhatsApp)
      if (href.startsWith('https://')) {
        window.open(href, '_blank', 'noopener,noreferrer');
        return;
      }

      // Use Next.js router for internal navigation
      router.push(href);
    }
  };

  // Add router event listener for path updates
  useEffect(() => {
    const handleRouteChange = (url) => {
      setCurrentPath(url);
      setIsMenuOpen(false);
      setActiveDropdown(null);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // Logo Component - Easy to customize
  const Logo = () => {
    // CONFIGURATION: Set your logo path here
    const logoImagePath = scrolled ? "/logo.png" : "/logo-white.png"; 
    const useImageLogo = true; 
    
    // Optional: Configure logo size
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
              onError={(e) => {
                console.error('Logo failed to load:', logoImagePath);
                // Fallback: hide the image if it fails to load
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="ml-3">
            <div
              className={
                scrolled
                  ? "text-xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300"
                  : "text-xl font-bold text-white transition-all duration-300"
              }
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              Celestial
            </div>
            <div
              className={
                scrolled
                  ? "text-xs text-gray-500 dark:text-gray-400 -mt-1"
                  : "text-xs text-white -mt-1"
              }
              style={{ fontFamily: 'Google Sans, sans-serif' }}
            >
              Web Solutions
            </div>
          </div>
        </motion.div>
      );
    }

    // Fallback: Text-based logo
    return (
      <motion.div
        className="flex items-center cursor-pointer group"
        onClick={() => handleNavigation('/')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <motion.div 
            whileHover={{ rotate: 5 }}
            className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-lg"
          >
            C
          </motion.div>
        </div>
        <div className="ml-3">
          <div className="text-xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300"
               style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
            Celestial
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1"
               style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Web Solutions
          </div>
        </div>
      </motion.div>
    );
  };

  // Navigation items rendering helper
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
          onMouseOver={() => setActiveDropdown(item.name)}
          onClick={() => handleNavigation(item.href)}
        >
          <span>{item.name}</span>
          <motion.svg
            className="w-4 h-4 transition-transform duration-200"
            animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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

  // WhatsApp configuration
  // Change WhatsApp button to link to schedule-a-call page
  const whatsappLink = "/schedule-a-call";

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
            
            {/* Enhanced Logo */}
            <Logo />

            {/* Desktop/Tablet Navigation */}
            <div className="hidden md:flex items-center space-x-2 md:space-x-3 lg:space-x-4">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {renderNavItem(item)}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 overflow-hidden"
                        onMouseOver={() => setActiveDropdown(item.name)}
                        onMouseOut={() => setActiveDropdown(null)}
                      >
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              
              {/* Premium WhatsApp Button - Desktop */}
              <motion.a
                href={whatsappLink}
                className="hidden md:flex items-center space-x-2 px-6 py-3 rounded-full font-semibold relative overflow-hidden group"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background */}
                <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300"></span>
                
                {/* Hover slide effect */}
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%', skewX: '-15deg' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />
                
                {/* ...removed WhatsApp logo SVG... */}
                
                {/* Text */}
                <motion.span 
                  className="relative z-10 text-white group-hover:text-white transition-colors duration-300"
                >
                  Schedule a Call
                </motion.span>
                
                {/* Arrow SVG with group-hover up animation */}
                <motion.span
                  className="relative z-10 flex items-center"
                  animate={{ y: 0 }}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.span>
              </motion.a>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {isMenuOpen ? (
                    <X size={28} />
                  ) : (
                    <Menu size={28} />
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
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
                            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">
                              New
                            </span>
                          )}
                        </span>
                        {item.dropdown && (
                          <motion.span
                            animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-lg flex items-center"
                          >
                            <ChevronDown size={20} />
                          </motion.span>
                        )}
                      </button>

                      {/* Mobile Dropdown */}
                      <AnimatePresence>
                        {item.dropdown && activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-2 space-y-1 overflow-hidden"
                          >
                            {item.dropdown.map((dropItem, dropIndex) => (
                              <motion.button
                                key={dropItem.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: dropIndex * 0.05 }}
                                className="w-full flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50/30 dark:hover:bg-orange-900/10 rounded-lg transition-all duration-200 text-left"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                                onClick={() => handleNavigation(dropItem.href)}
                              >
                                <span>{dropItem.name}</span>
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Actions */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    
                    {/* Premium WhatsApp Button - Mobile */}
                    <motion.a
                      href={whatsappLink}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-full font-semibold relative overflow-hidden group"
                      style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Background */}
                      <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600"></span>
                      
                      {/* Hover slide effect */}
                      <motion.span
                        className="absolute inset-0 bg-white"
                        initial={{ x: '-100%', skewX: '-15deg' }}
                        whileHover={{ x: '0%' }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      />
                      
                      {/* ...removed WhatsApp logo SVG... */}
                      
                      {/* Text */}
                      <span className="relative z-10 text-white group-hover:text-green-600 transition-colors duration-300">
                        Schedule a Call
                      </span>
                      
                      {/* Arrow SVG with group-hover up animation (mobile) */}
                      <motion.span
                        className="relative z-10 flex items-center"
                        animate={{ y: 0 }}
                        whileHover={{ y: -6 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
};

export default Navbar;