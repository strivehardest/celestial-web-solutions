import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MapPin, Phone, Mail, ArrowRight, Award, Clock } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

const whatsappNumber = '233530505031';
const whatsappMessage = encodeURIComponent("Hi Celestial, I'm interested in your web development services.");
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export default function Footer({ darkMode, toggleDarkMode }) {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  // Live time zones configuration
  const timeZones = [
    { city: 'Accra', country: 'Ghana', timezone: 'Africa/Accra', flagCode: 'gh' },
    { city: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos', flagCode: 'ng' },
    { city: 'New York', country: 'USA', timezone: 'America/New_York', flagCode: 'us' },
    { city: 'London', country: 'UK', timezone: 'Europe/London', flagCode: 'gb' },
  ];

  const [times, setTimes] = useState({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = {};
      timeZones.forEach(({ city, timezone }) => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        newTimes[city] = formatter.format(now);
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const googleRating = {
    score: 4.9,
    totalReviews: 30,
    googleBusinessUrl: "https://www.google.com/maps/place/Celestial+Web+Solutions/@5.883579,0.9829622,17z/data=!4m6!3m5!1s0x1021710073fe6fff:0x96453357ca880329!8m2!3d5.8836217!4d0.9828871!16s%2Fg%2F11lf36fzj1?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
  };

  const reviewPlatforms = [
    {
      name: 'Google',
      rating: 4.9,
      reviews: 30,
      url: googleRating.googleBusinessUrl,
      logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_74x24dp.png',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Clutch',
      rating: 5.0,
      reviews: 'Top Rated',
      url: 'https://clutch.co/profile/celestial-web-solutions',
      logo: './clutch-logo.png',
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'GoodFirms',
      rating: 5.0,
      reviews: 'Top Rated',
      url: 'https://www.goodfirms.co/company/celestial-web-solutions',
      logo: null, // Will use Award icon
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Trustpilot',
      rating: 4.8,
      reviews: 'Excellent',
      url: 'https://www.trustpilot.com/review/celestialwebsolutions.net',
      logo: null,
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'The Manifest',
      rating: 5.0,
      reviews: 'Top 10 in Ghana',
      url: 'https://themanifest.com/web-designers/ghana',
      logo: null,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const footerLinks = {
    services: [
      { name: 'Web Development', href: '/web-design-company-in-ghana/web-development-company-in-ghana' },
      { name: 'Web Design', href: '/web-design-company-in-ghana/web-design-in-ghana' },
      { name: 'E-Commerce Solutions', href: '/web-design-company-in-ghana/ecommerce-website-development-ghana' },
      { name: 'SEO Optimization', href: '/web-design-company-in-ghana/seo-services-in-ghana' },
      { name: 'UX/UI Design', href: '/web-design-company-in-ghana/ux-ui-design-in-ghana' },
      { name: 'IT Support', href: '/web-design-company-in-ghana/it-support-in-ghana' },
      { name: 'Google AdSense', href: '/web-design-company-in-ghana/google-adsense-management-in-ghana' },
      { name: 'Google Ads', href: '/web-design-company-in-ghana/google-ads-management-in-ghana' }
    ],
    company: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Best Web Designer in Accra', href: '/best-web-designer-in-accra' },
      { name: 'Courses', href: '/courses', isNew: true },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Blog', href: '/blog' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Make Payment', href: '/payment' }
    ],
    support: [
      { name: 'Contact', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Terms', href: '/terms' },
      { name: 'Privacy', href: '/privacy' }
    ]
  };

  const socialLinks = [
    { 
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      href: 'https://x.com/strivehardest'
    },
    { 
      name: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      href: 'https://wa.me/233530505031'
    },
    { 
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: 'https://facebook.com/celestialwebsolutions'
    },
    { 
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      href: 'https://instagram.com/celestialwebsolutions'
    },
    { 
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: 'https://linkedin.com/in/aforlabi'
    },
    { 
      name: 'YouTube',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      href: 'https://youtube.com/@celestialwebsolutions'
    }
  ];

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={`${
            star <= Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-300 text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Badges Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Trusted by Ghana Businesses
            </h3>
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              Verified reviews from happy clients
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {/* Google Reviews */}
            <a 
              href={reviewPlatforms[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-all duration-300 hover:scale-105 flex items-center gap-4 group"
            >
              <div className="bg-white rounded-lg p-3 flex-shrink-0">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-yellow-400 text-lg">★★★★★</span>
                  <span className="font-bold ml-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    {reviewPlatforms[0].rating}
                  </span>
                </div>
                <div className="text-sm text-gray-400" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  {reviewPlatforms[0].reviews} Google Reviews
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Clutch */}
            <a 
              href={reviewPlatforms[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-all duration-300 hover:scale-105 flex items-center gap-4 group"
            >
              <div className="bg-white rounded-lg p-3 flex-shrink-0">
                <img src="/clutch-logo.png" alt="Clutch" className="w-8 h-8 object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-yellow-400 text-lg">★★★★★</span>
                  <span className="font-bold ml-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    {reviewPlatforms[1].rating}
                  </span>
                </div>
                <div className="text-sm text-gray-400" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  Top Rated on Clutch
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-600 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* GoodFirms */}
            <a 
              href={reviewPlatforms[2].url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-all duration-300 hover:scale-105 flex items-center gap-4 group"
            >
              <div className="bg-white rounded-lg p-3 flex-shrink-0">
                <img src="/goodfirms-logo.png" alt="GoodFirms" className="w-8 h-8 object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-yellow-400 text-lg">★★★★★</span>
                  <span className="font-bold ml-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    {reviewPlatforms[2].rating}
                  </span>
                </div>
                <div className="text-sm text-gray-400" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  Top Rated on GoodFirms
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Trustpilot */}
            <a 
              href={reviewPlatforms[3].url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-all duration-300 hover:scale-105 flex items-center gap-4 group"
            >
              <div className="bg-white rounded-lg p-3 flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <path
                    fill="#00b67a"
                    d="M12 1l3.09 7.92H23l-6.54 4.75 2.5 7.83L12 17.7 5.04 21.5l2.5-7.83L1 8.92h7.91z"
                  />
                  <path
                    fill="#00e59b"
                    d="M16.9 15.78L12 17.7V1l3.09 7.92H23l-6.54 4.75z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-yellow-400 text-lg">★★★★★</span>
                  <span className="font-bold ml-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    {reviewPlatforms[3].rating}
                  </span>
                </div>
                <div className="text-sm text-gray-400" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  Excellent on Trustpilot
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-600 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20">
                <Image
                  src="/logo-white.png"
                  alt="Celestial Web Solutions"
                  fill
                  quality={80}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  Celestial
                </div>
                <div className="text-base text-gray-400" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  Web Solutions
                </div>
              </div>
            </Link>

            <p className="text-gray-400 text-base mb-6 max-w-sm leading-relaxed" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              A focused web design and development company in Ghana, delivering exceptional digital experiences for businesses across Africa.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="tel:+233245671832" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors text-base" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                <Phone size={16} className="text-orange-500" />
                +233 245 671 832
              </a>
              <a href="mailto:info@celestialwebsolutions.net" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors text-base" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                <Mail size={16} className="text-orange-500" />
                info@celestialwebsolutions.net
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-base" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                <MapPin size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <span>Keta & Accra, Ghana</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className={`text-sm transition-colors ${router.pathname === link.href ? 'text-orange-400 font-bold' : 'text-gray-400 hover:text-orange-400'}`}
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name} className="relative">
                  <Link 
                    href={link.href}
                    className={`text-sm transition-colors inline-flex items-center gap-2 ${router.pathname === link.href ? 'text-orange-400 font-bold' : 'text-gray-400 hover:text-orange-400'}`}
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {link.name}
                    {link.isNew && (
                      <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded animate-pulse">
                        NEW
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className={`text-sm transition-colors ${router.pathname === link.href ? 'text-orange-400 font-bold' : 'text-gray-400 hover:text-orange-400'}`}
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link 
              href="/schedule-a-call"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              Schedule a Call
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Live Time Zones Section */}
      <div className="border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {timeZones.map(({ city, country, flagCode }) => (
              <div key={city} className="flex items-center gap-3 group">
                <img 
                  src={`https://flagcdn.com/w40/${flagCode}.png`}
                  srcSet={`https://flagcdn.com/w80/${flagCode}.png 2x`}
                  width="32"
                  height="24"
                  alt={`${country} flag`}
                  className="rounded shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    {city}, {country}
                  </span>
                  <span 
                    className="text-xl md:text-2xl font-mono text-white tracking-wider group-hover:text-orange-400 transition-colors"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {times[city] || '--:--:--'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center gap-4">
            {/* Badges */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a 
                href="https://techbehemoths.com/company/celestial-web-solutions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="Trusted and Verified by TechBehemoths"
              >
                <Image 
                  src="/images/TB-Trusted-on-black.svg" 
                  alt="Trusted and Verified by TechBehemoths" 
                  width={200} 
                  height={60}
                />
              </a>
            </div>
            
            <div className="text-center">
              <p className="text-gray-300 text-base" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                © {currentYear} Celestial Web Solutions. All rights reserved.
              </p>
              <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                Handcrafted with passion in Ghana.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <div className="flex items-center gap-4 pt-2">
              <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </div>
          </div>
          
          {/* DMCA Badge - Bottom Centered */}
          <div className="flex justify-center pt-4">
            <a href="//www.dmca.com/Protection/Status.aspx?ID=a2cdeca7-613e-4377-a477-855d263ffc77" title="DMCA.com Protection Status" className="dmca-badge"> 
              <img src="https://images.dmca.com/Badges/dmca_protected_sml_120a.png?ID=a2cdeca7-613e-4377-a477-855d263ffc77" alt="DMCA.com Protection Status" />
            </a>
          </div>
          <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>
        </div>
      </div>
    </footer>
  );
}