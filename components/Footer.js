import { motion } from 'framer-motion';
import { X, Facebook, Instagram, Linkedin, Github, MessageCircle, Sun, Moon, MapPin, Phone, Mail } from 'lucide-react';

const Footer = ({ darkMode, toggleDarkMode }) => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Our Services', href: '/services' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'FAQs', href: '/faq' },
        { name: 'Terms', href: '/terms' },
        { name: 'Tech Stack', href: '/tech-stack' }
      ]
    }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 pt-16 pb-12 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description Column */}
          <div className="lg:col-span-1">
            <motion.div className="flex items-center mb-6">
              <motion.div 
                whileHover={{ rotate: 5 }}
                className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-lg"
              >
                C
              </motion.div>
              <div className="ml-3">
                <div className="text-xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent"
                     style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  Celestial
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400"
                     style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  Web Solutions
                </div>
              </div>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-400 mb-6"
               style={{ fontFamily: 'Quicksand, sans-serif' }}>
              Transforming ideas into exceptional digital experiences. Your vision, our expertise.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <MapPin size={18} />
                <span style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  235 Agblor Link, Keta-Ghana
                </span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Phone size={18} />
                <a href="tel:+233245671832" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  +233 245 671 832
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Mail size={18} />
                <a href="mailto:info@celestialwebsolutions.net" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  info@celestialwebsolutions.net
                </a>
              </div>
            </div>
            
            {/* Social Links and Theme Toggle */}
            <div className="flex items-center space-x-4 mb-6">
              <motion.a href="https://x.com/strivehardest" target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-orange-500"
              >
                <X size={18} />
              </motion.a>
              <motion.a href="https://wa.me/+233530505031" target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-orange-500"
              >
                <MessageCircle size={18} />
              </motion.a>
              <motion.a href="https://facebook.com/celestialwebsolutions" target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-orange-500"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a href="https://instagram.com/celestialwebsolutions" target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-orange-500"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a href="https://linkedin.com/in/aforlabi" target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-orange-500"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ y: -4 }}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-orange-500"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </div>
          </div>

          {/* Menu Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 
                className="text-lg font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 text-sm transition-colors duration-200"
                      style={{ fontFamily: 'Quicksand, sans-serif' }}
                      whileHover={{ x: 4 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Google Map */}
          <div className="lg:col-span-1">
            <h3 
              className="text-lg font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              Find Us
            </h3>
            <div className="w-full h-[200px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
              <iframe
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.80059685584!2d0.9828870999999997!3d5.883621700000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1021710073fe6fff%3A0x96453357ca880329!2sCelestial%20Web%20Solutions!5e0!3m2!1sen!2sgh!4v1755809307538!5m2!1sen!2sgh" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-300"
                title="Celestial Web Solutions Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400"
             style={{ fontFamily: 'Quicksand, sans-serif' }}>
            © {currentYear} Celestial Web Solutions. All rights reserved.
            <span className="block sm:inline sm:ml-2">
              Crafted with ❤️ in Keta, Ghana
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;