import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Head from 'next/head';
import WhatsAppButton from '../components/WhatsAppButton';
import PremiumCTA from '../components/PremiumCTA';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/mdklokaq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Celestial Web Solutions | Web Design Company Ghana</title>
        <meta name="description" content="Contact Celestial Web Solutions in Accra or Keta, Ghana. Get in touch for web design, development, and digital marketing services. Free consultation available." />
        <meta name="keywords" content="contact us Ghana, web designer contact, web development inquiries, Celestial Web Solutions contact, email web designer Ghana, phone web developer, consultation Ghana, contact form Ghana, office location Accra, office Keta, business hours Ghana, website inquiry, project quote, free consultation, support contact, customer service Ghana" />
        <meta name="author" content="Celestial Web Solutions" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact Celestial Web Solutions | Ghana"/>
        <meta property="og:description" content="Get in touch with Celestial Web Solutions. Contact us for web design and development services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://celestialwebsolutions.net/contact" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Celestial Web Solutions | Ghana" />
        <meta name="twitter:description" content="Contact us for web design and development services in Ghana." />
        
        <link rel="canonical" href="https://celestialwebsolutions.net/contact" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700;800&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section with Background Image */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://media.istockphoto.com/id/879441788/photo/web-contact-us-icons-on-cubes.jpg?s=612x612&w=0&k=20&c=4wKebqcelXRP3skkhI-SlTeJQekYavAKGrcwYm9awag=")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/95 via-orange-600/90 to-red-500/95"></div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full opacity-30 animate-spin" style={{animationDuration: '20s'}}></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1
                className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Get In Touch
              </h1>
              <p
                className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                Ready to bring your digital vision to life? Let's discuss your project and create something amazing together.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Phone */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-orange-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-medium" style={{ fontFamily: 'Quicksand, sans-serif' }}>+233 24 567 1832</p>
                </motion.div>

                {/* WhatsApp */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-green-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>WhatsApp</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-medium" style={{ fontFamily: 'Quicksand, sans-serif' }}>+233 53 050 5031</p>
                </motion.div>

                {/* Email */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-red-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Email</h3>
                  <p className="text-gray-600 dark:text-gray-300 break-all font-medium" style={{ fontFamily: 'Quicksand, sans-serif' }}>info@celestialwebsolutions.net</p>
                </motion.div>

                {/* Location */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-purple-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Location</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-medium" style={{ fontFamily: 'Quicksand, sans-serif' }}>Keta & Accra, Ghana</p>
                </motion.div>
              </div>

              {/* Google Maps */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-orange-100 dark:border-gray-700"
              >
                <div className="p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Find Us</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-medium" style={{ fontFamily: 'Quicksand, sans-serif' }}> Our Main Office is located in the beautiful coastal city of Keta, Ghana</p>
                </div>
                <div className="h-64 bg-gray-200 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d992.20014921396!2d0.9828871000000039!3d5.883621700000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1021710073fe6fff%3A0x96453357ca880329!2sCelestial%20Web%20Solutions!5e0!3m2!1sen!2sgh!4v1756050482259!5m2!1sen!2sgh"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                    title="Celestial Web Solutions Location - Keta, Ghana"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 border border-orange-100 dark:border-gray-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-5 transform translate-x-16 -translate-y-16"></div>
              
              <div className="mb-10 relative z-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Send us a Message</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Quicksand, sans-serif' }}>Tell us about your project and we'll get back to you within 24 hours.</p>
              </div>

              {submitStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-8 p-5 rounded-2xl border-l-4 ${
                    submitStatus === 'success' 
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-500' 
                      : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-500'
                  }`}
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                >
                  <div className="flex items-center">
                    {submitStatus === 'success' ? (
                      <svg className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 mr-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <div>
                      {submitStatus === 'success' 
                        ? 'Thank you! Your message has been sent successfully. We\'ll get back to you soon!' 
                        : 'Sorry, there was an error sending your message. Please try again.'
                      }
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-bold text-gray-800 dark:text-gray-200" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                      style={{ fontFamily: 'Quicksand, sans-serif' }}
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-800 dark:text-gray-200" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                      style={{ fontFamily: 'Quicksand, sans-serif' }}
                      placeholder="+233 24 567 1832"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-bold text-gray-800 dark:text-gray-200" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                    style={{ fontFamily: 'Quicksand, sans-serif' }}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-bold text-gray-800 dark:text-gray-200" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                    style={{ fontFamily: 'Quicksand, sans-serif' }}
                  >
                    <option value="">Select a subject</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Web Design">Web Design</option>
                    <option value="E-commerce">E-commerce Solutions</option>
                    <option value="SEO Optimization">SEO Optimization</option>
                    <option value="UX/UI Design">UX/UI Design</option>
                    <option value="IT Support">IT Support</option>
                    <option value="Google Ads Management">Google Ads Management</option>
                    <option value="Google AdSense Management">Google AdSense Management</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-bold text-gray-800 dark:text-gray-200" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 resize-none"
                    style={{ fontFamily: 'Quicksand, sans-serif' }}
                    placeholder="Tell us about your project..."
                  />
                </div>

                <div>
                  <PremiumCTA
                    type="submit"
                    size="large"
                    variant="primary"
                    icon
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </PremiumCTA>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-medium" style={{ fontFamily: 'Quicksand, sans-serif' }}>Prefer to contact us directly?</p>
                <div className="grid grid-cols-3 gap-3">
                  <motion.a 
                    href="tel:+233245671832" 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center text-white bg-orange-500 hover:bg-orange-600 font-bold py-2 px-3 rounded-xl transition-all text-sm"
                    style={{ fontFamily: 'Quicksand, sans-serif' }}
                  >
                    Call
                  </motion.a>
                  
                  <motion.a 
                    href="https://wa.me/233530505031" 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center text-white bg-green-500 hover:bg-green-600 font-bold py-2 px-3 rounded-xl transition-all text-sm"
                    style={{ fontFamily: 'Quicksand, sans-serif' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </motion.a>
                  
                  <motion.a 
                    href="mailto:info@celestialwebsolutions.net" 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center text-white bg-red-500 hover:bg-red-600 font-bold py-2 px-3 rounded-xl transition-all text-sm"
                    style={{ fontFamily: 'Quicksand, sans-serif' }}
                  >
                    Email
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Schedule a Meeting Section with Calendly */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Schedule a Meeting
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                Book a free consultation call to discuss your project requirements and get expert advice.
              </p>
            </motion.div>

            {/* Calendly Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-orange-100 dark:border-gray-700"
            >
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/waliuaforlabi?hide_landing_page_details=1&primary_color=f7a707" 
                style={{ minWidth: '320px', height: '700px' }}
              />
            </motion.div>
          </div>
        </section>

        <div className="pb-20"></div>
      </div>
      <WhatsAppButton />
    </>
  );
}