import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, Phone, Mail, Building2 } from 'lucide-react';

const whatsappNumber = '233530505031';
const whatsappMessage = encodeURIComponent("Hi Celestial, I'm interested in your web development services.");
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer({ darkMode, toggleDarkMode }) {
  const currentYear = new Date().getFullYear();

  const googleRating = {
    score: 4.9,
    totalReviews: 30,
    googleBusinessUrl: "https://www.google.com/maps/place/Celestial+Web+Solutions/@5.883579,0.9829622,17z/data=!4m6!3m5!1s0x1021710073fe6fff:0x96453357ca880329!8m2!3d5.8836217!4d0.9828871!16s%2Fg%2F11lf36fzj1?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
  };

  const offices = {
    main: {
      name: "Main Office - Keta",
      address: "235 Agblor Link, Keta",
      city: "Keta, Ghana",
      phone: "+233 245 671 832",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.80059685584!2d0.9828870999999997!3d5.883621700000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1021710073fe6fff%3A0x96453357ca880329!2sCelestial%20Web%20Solutions!5e0!3m2!1sen!2sgh!4v1755809307538!5m2!1sen!2sgh",
      mapUrl: googleRating.googleBusinessUrl
    },
    branch: {
      name: "Branch Office - Accra",
      address: "Madina Estate, Accra",
      city: "Accra, Ghana",
      phone: "+233 530 505 031",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7171234567!2d-0.1870!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzYnMTMuMyJOIDDCsDExJzEzLjIiVw!5e0!3m2!1sen!2sgh!4v1234567890",
      mapUrl: "https://maps.google.com/?q=Accra,Ghana"
    }
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
      { name: 'Payments', href: '/payment' }

    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' }
    ]
  };

  const socialLinks = [
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg', 
      href: 'https://x.com/strivehardest', 
      label: 'X (Twitter)'
    },
    { 
      icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg', 
      href: 'https://wa.me/+233530505031', 
      label: 'WhatsApp'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg', 
      href: 'https://facebook.com/celestialwebsolutions', 
      label: 'Facebook'
    },
    { 
      icon: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg', 
      href: 'https://instagram.com/celestialwebsolutions', 
      label: 'Instagram'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg', 
      href: 'https://linkedin.com/in/aforlabi', 
      label: 'LinkedIn'
    },
    {
      icon: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
      href: 'https://youtube.com/@celestialwebsolutions',
      label: 'YouTube'
    }
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

  const OfficeCard = ({ office, isMain }) => (
    <div className="h-full">
      <div className="flex items-center mb-3">
        <Building2 size={18} className={`${isMain ? 'text-orange-500' : 'text-orange-400'} mr-2`} />
        <h3 className={`text-base font-bold ${isMain ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'}`} style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
          {office.name}
        </h3>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
          <div style={{ fontFamily: 'Quicksand, sans-serif' }}>
            <div>{office.address}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">{office.city}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Phone size={16} className="text-orange-500 flex-shrink-0" />
          <a href={`tel:${office.phone}`} className="hover:text-orange-500 transition-colors duration-200" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            {office.phone}
          </a>
        </div>
      </div>

      <div className="relative w-full h-[160px] rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
        <iframe
          src={office.mapEmbed}
          width="100%"
          height="160"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-500"
          title={`${office.name} Location`}
        />

        <motion.a
          href={office.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 px-3 py-1.5 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-semibold rounded-lg shadow-lg flex items-center space-x-1.5 transition-all duration-300"
          style={{ fontFamily: 'Quicksand, sans-serif' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MapPin size={14} />
          <span>View</span>
        </motion.a>
      </div>
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
                  src="/logo1.png"
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

            {/* Google Reviews Card */}
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

            {/* General Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                <a href="mailto:info@celestialwebsolutions.net" className="hover:text-orange-500 transition-colors duration-200" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  info@celestialwebsolutions.net
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 mb-6">
              {socialLinks.map((social) => (
                <motion.a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ y: -3, scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-lg transition-all duration-300"
                  title={social.label}
                >
                  <img 
                    src={social.icon} 
                    alt={social.label}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns - Spans 3 columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-8">
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

          {/* Office Locations - Spans 5 columns */}
          <div className="lg:col-span-5">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Our Offices
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Office - Keta */}
              <OfficeCard office={offices.main} isMain={true} />

              {/* Branch Office - Accra */}
              <OfficeCard office={offices.branch} isMain={false} />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            © {currentYear} Celestial Web Solutions. All rights reserved.
            <span className="block sm:inline sm:ml-2">Main Office in Keta • Branch Office in Accra, Ghana</span>
          </p>
        </div>
      </div>
    </footer>
  );
}