import { motion } from 'framer-motion';
import { X, Facebook, Instagram, Linkedin, MessageCircle, Star, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ darkMode, toggleDarkMode }) {
  const currentYear = new Date().getFullYear();

  const googleRating = {
    score: 4.9,
    totalReviews: 30,
    googleBusinessUrl: "https://www.google.com/maps/place/Celestial+Web+Solutions/@5.883579,0.9829622,17z/data=!4m6!3m5!1s0x1021710073fe6fff:0x96453357ca880329!8m2!3d5.8836217!4d0.9828871!16s%2Fg%2F11lf36fzj1?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Services', href: '/services' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Blog', href: '/blog' }
    ],
    support: [
      { name: 'Contact', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Make Payment', href: '/payment' }
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' }
    ]
  };

  const socialLinks = [
    { icon: X, href: 'https://x.com/strivehardest', label: 'X (Twitter)', gradient: 'from-gray-800 to-black' },
    { icon: MessageCircle, href: 'https://wa.me/+233530505031', label: 'WhatsApp', gradient: 'from-green-500 to-green-600' },
    { icon: Facebook, href: 'https://facebook.com/celestialwebsolutions', label: 'Facebook', gradient: 'from-blue-600 to-blue-700' },
    { icon: Instagram, href: 'https://instagram.com/celestialwebsolutions', label: 'Instagram', gradient: 'from-pink-500 to-purple-600' },
    { icon: Linkedin, href: 'https://linkedin.com/in/aforlabi', label: 'LinkedIn', gradient: 'from-blue-700 to-blue-800' }
  ];

  const StarRating = ({ rating }) => (
    <div className="flex items-center space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600'
          }`}
        />
      ))}
    </div>
  );

  return (
    <footer className="bg-white dark:bg-gray-900 pt-16 pb-12 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Column - Spans 4 columns */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <motion.div className="flex items-center mb-6">
              <motion.div whileHover={{ scale: 1.05 }} className="w-24 h-24 relative">
                <img
                  src="/logo.png"
                  alt="Celestial Web Solutions"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="w-full h-full bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-2xl"
                  style={{ display: 'none' }}
                >
                  C
                </div>
              </motion.div>

              <div className="ml-4">
                <div
                  className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent"
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif', letterSpacing: '-0.5px' }}
                >
                  Celestial
                </div>
                <div
                  className="text-sm font-medium text-orange-600 dark:text-orange-400"
                  style={{ fontFamily: 'Quicksand, sans-serif', letterSpacing: '1px' }}
                >
                  Web Solutions
                </div>
              </div>
            </motion.div>

            <p className="text-gray-600 dark:text-gray-400 mb-6" style={{ fontFamily: 'Quicksand, sans-serif' }}>
              Transforming ideas into exceptional digital experiences. Your vision, our expertise.
            </p>

            {/* Google Reviews Card - now includes Google logo */}
            <motion.a
              href={googleRating.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-6 p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-orange-200 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Read our Google Reviews"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  Google Reviews
                </span>

                {/* Google logo (small) */}
                <img
                  src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_74x24dp.png"
                  alt="Google"
                  className="h-5 ml-2"
                  style={{ display: 'inline-block' }}
                />
              </div>

              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  {googleRating.score}
                </span>
                <div>
                  <StarRating rating={googleRating.score} />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                    Based on {googleRating.totalReviews} reviews
                  </p>
                </div>
              </div>

              <div className="text-xs text-orange-600 dark:text-orange-400 font-medium flex items-center" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                Read our reviews
                <span className="ml-1">→</span>
              </div>
            </motion.a>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <MapPin size={18} className="text-orange-500 flex-shrink-0" />
                <span style={{ fontFamily: 'Quicksand, sans-serif' }}>235 Agblor Link, Keta-Ghana</span>
              </div>

              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Phone size={18} className="text-orange-500 flex-shrink-0" />
                <a href="tel:+233245671832" className="hover:text-orange-500 transition-colors duration-200" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  +233 245 671 832
                </a>
              </div>

              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                <a href="mailto:info@celestialwebsolutions.net" className="hover:text-orange-500 transition-colors duration-200" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  info@celestialwebsolutions.net
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 mb-6">
              <motion.a 
                href="https://x.com/strivehardest" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -3, scale: 1.1 }} 
                whileTap={{ scale: 0.95 }} 
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-gray-800 hover:to-black dark:hover:from-gray-600 dark:hover:to-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <X size={18} />
              </motion.a>

              <motion.a 
                href="https://wa.me/+233530505031" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -3, scale: 1.1 }} 
                whileTap={{ scale: 0.95 }} 
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <MessageCircle size={18} />
              </motion.a>

              <motion.a 
                href="https://facebook.com/celestialwebsolutions" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -3, scale: 1.1 }} 
                whileTap={{ scale: 0.95 }} 
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Facebook size={18} />
              </motion.a>

              <motion.a 
                href="https://instagram.com/celestialwebsolutions" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -3, scale: 1.1 }} 
                whileTap={{ scale: 0.95 }} 
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Instagram size={18} />
              </motion.a>

              <motion.a 
                href="https://linkedin.com/in/aforlabi" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -3, scale: 1.1 }} 
                whileTap={{ scale: 0.95 }} 
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </div>

          {/* Links Columns - Spans 5 columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Company */}
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 text-sm transition-colors duration-200 inline-flex items-center"
                      style={{ fontFamily: 'Quicksand, sans-serif' }}
                      whileHover={{ x: 4 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 text-sm transition-colors duration-200 inline-flex items-center"
                      style={{ fontFamily: 'Quicksand, sans-serif' }}
                      whileHover={{ x: 4 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 text-sm transition-colors duration-200 inline-flex items-center"
                      style={{ fontFamily: 'Quicksand, sans-serif' }}
                      whileHover={{ x: 4 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Find Us / Map - Spans 3 columns */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Find Us
              </h3>
            </div>

            <p className="mb-3 text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>
              Celestial Web Solutions Office Location — Keta, Ghana
            </p>

            <div className="relative w-full h-[200px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.80059685584!2d0.9828870999999997!3d5.883621700000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1021710073fe6fff%3A0x96453357ca880329!2sCelestial%20Web%20Solutions!5e0!3m2!1sen!2sgh!4v1755809307538!5m2!1sen!2sgh"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
                title="Celestial Web Solutions Location"
              />

              <motion.a
                href={googleRating.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-300"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin size={16} />
                <span>View Map</span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            © {currentYear} Celestial Web Solutions. All rights reserved.
            <span className="block sm:inline sm:ml-2">Crafted with ❤️ in Keta, Ghana</span>
          </p>
        </div>
      </div>
    </footer>
  );
}