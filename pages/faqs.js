import Head from "next/head";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Clock, Users, Globe, Code, ShoppingCart, Phone } from "lucide-react";
import WhatsAppButton from '../components/WhatsAppButton';
import PremiumCTA from '../components/PremiumCTA';


export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);
  
  // Create refs for each section
  const sectionRefs = {
    general: useRef(null),
    pricing: useRef(null),
    technical: useRef(null),
    process: useRef(null)
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Smooth scroll function
  const scrollToSection = (sectionKey) => {
    const targetRef = sectionRefs[sectionKey];
    if (targetRef && targetRef.current) {
      const offsetTop = targetRef.current.offsetTop - 120; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const faqData = [
    {
      category: "General",
      key: "general",
      icon: MessageCircle,
      questions: [
        {
          question: "What services does Celestial Web Solutions offer?",
          answer: "We offer comprehensive web development services including custom website development, e-commerce solutions, web design, SEO optimization, WordPress development, mobile app development, and digital marketing services. We specialize in React, Next.js, and modern web technologies."
        },
        {
          question: "How long does it take to build a website?",
          answer: "The timeline varies depending on the project complexity. A simple business website typically takes 2-3 weeks, while complex e-commerce or custom web applications can take 6-12 weeks. We provide detailed timelines during our initial consultation."
        },
        {
          question: "Do you work with businesses outside Ghana?",
          answer: "Yes! While we're based in Accra and Keta, Ghana, we work with clients globally. We would deliver projects for clients across Africa, Europe, and North America through our remote collaboration process."
        },
        {
          question: "What makes Celestial Web Solutions different?",
          answer: "We combine technical expertise with local market knowledge, offer competitive pricing in Cedis, provide 24/7 support, and focus on building long-term partnerships. Our team understands both global standards and local business needs."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      key: "pricing",
      icon: ShoppingCart,
      questions: [
        {
          question: "How much does a website cost?",
          answer: "Our websites start from GH₵2,500 for basic business websites and can range up to GH₵25,000+ for complex e-commerce platforms. We offer flexible payment plans and provide detailed quotes based on your specific requirements."
        },
        {
          question: "Do you accept payments in Cedis?",
          answer: "Yes! We accept payments in Ghana Cedis (GH₵) through mobile money (MTN, Vodafone, AirtelTigo), bank transfers, and cash payments. We also accept international payments via Flutterwave, DPO Pay and Paystack for overseas clients."
        },
        {
          question: "Do you offer payment plans?",
          answer: "Absolutely! We offer flexible payment plans including 50% upfront and 50% on completion, or monthly installments for larger projects. We work with your budget to make quality web development accessible."
        },
        {
          question: "Are there any hidden costs?",
          answer: "No hidden costs! We provide transparent pricing upfront. The only additional costs might be third-party services like premium plugins, hosting, or domain names, which we discuss beforehand."
        }
      ]
    },
    {
      category: "Technical",
      key: "technical",
      icon: Code,
      questions: [
        {
          question: "What technologies do you use?",
          answer: "We use modern technologies including HTML5, CSS3, Javascript, React, Next.js, Node.js, WordPress, WooCommerce, Shopify, TailwindCSS, Framer Motion and various databases. We choose the best technology stack based on your project requirements and budget."
        },
        {
          question: "Do you provide website hosting?",
          answer: "No, but we work with popular hosting providers like Namecheap, Vercel, Netlify, Render, Hostinger, and traditional hosting companies based on your needs and budget."
        },
        {
          question: "Will my website be mobile-friendly?",
          answer: "Absolutely! All our websites are built with mobile-first responsive design, ensuring they look and work perfectly on all devices - smartphones, tablets, and desktops. This is standard in all our projects."
        },
        {
          question: "Do you provide website maintenance?",
          answer: "Yes, we offer ongoing maintenance packages starting from GH₵150/month including security updates, content updates, backup services, and technical support. We also offer one-time maintenance services."
        }
      ]
    },
    {
      category: "Process & Support",
      key: "process",
      icon: Users,
      questions: [
        {
          question: "What is your development process?",
          answer: "Our process includes: 1) Consultation & Planning, 2) Design & Mockups, 3) Development & Testing, 4) Client Review & Feedback, 5) Launch & Training, 6) Ongoing Support. We keep you involved throughout the entire process."
        },
        {
          question: "Do you provide training on how to use my website?",
          answer: "Yes! We provide comprehensive training sessions (in-person or virtual) on how to manage your website, update content, add products (for e-commerce), and use the admin dashboard. Training materials and videos are also provided."
        },
        {
          question: "What kind of support do you offer after launch?",
          answer: "We provide 30 days of free post-launch support for bug fixes and minor adjustments. Beyond that, we offer various support packages including emergency support, regular maintenance, and content management services."
        },
        {
          question: "Can you help with SEO and digital marketing?",
          answer: "Absolutely! We offer comprehensive SEO services, Google Ads management, social media marketing, and content marketing. We can help improve your search rankings and drive more traffic to your website."
        }
      ]
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Frequently Asked Questions | Celestial Web Solutions</title>
        <meta
          name="description"
          content="Find answers to common questions about web development, pricing, hosting, and our services. Get clarity on timelines, costs in Cedis, and our development process."
        />
        <meta
          name="keywords"
          content="web development FAQ, website cost in Ghana, web design questions, Celestial Web Solutions FAQ, website pricing in Cedis, web development process"
        />
        <meta name="author" content="Celestial Web Solutions" />

        {/* Open Graph */}
        <meta property="og:title" content="FAQs | Celestial Web Solutions" />
        <meta
          property="og:description"
          content="Get answers to frequently asked questions about our web development services, pricing, and process."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://celestialwebsolutions.net/faqs" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://celestialwebsolutions.net/faqs" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section with Background Image */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/95 via-orange-600/90 to-red-500/95"></div>

          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
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
                Frequently Asked Questions
              </h1>
              <p
                className="text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                Get answers to common questions about our web development services, pricing, and process
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Categories Navigation */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {faqData.map((category, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(category.key)}
                  className="flex items-center space-x-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm border border-orange-200 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-gray-600 hover:scale-105 transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <category.icon size={20} className="text-orange-500" />
                  <span
                    className="font-medium text-gray-700 dark:text-gray-300"
                    style={{ fontFamily: "Google Sans, sans-serif" }}
                  >
                    {category.category}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            {faqData.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                ref={sectionRefs[category.key]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-12 scroll-mt-32"
                id={category.key}
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                    <category.icon size={24} className="text-white" />
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    {category.category}
                  </h2>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 10 + faqIndex;
                    return (
                      <motion.div
                        key={faqIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: faqIndex * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
                      >
                        <motion.button
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => toggleFAQ(globalIndex)}
                          whileHover={{ x: 5 }}
                        >
                          <span
                            className="font-semibold text-gray-800 dark:text-white pr-4"
                            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                          >
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{ rotate: openIndex === globalIndex ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={20} className="text-orange-500 flex-shrink-0" />
                          </motion.div>
                        </motion.button>
                        
                        <AnimatePresence>
                          {openIndex === globalIndex && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-4 border-t border-gray-100 dark:border-gray-700">
                                <p
                                  className="text-gray-600 dark:text-gray-300 leading-relaxed pt-4"
                                  style={{ fontFamily: "Google Sans, sans-serif" }}
                                >
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3
                className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Still Have Questions?
              </h3>
              <p
                className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                Can't find the answer you're looking for? Our team is here to help! Get in touch for a personalized consultation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <PremiumCTA href="/contact" size="large" variant="secondary">
                  Contact Us
                </PremiumCTA>
                <PremiumCTA href="tel:+233245671832" size="large" variant="primary">
                  <span>Call Us</span>
                </PremiumCTA>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <WhatsAppButton />
    </>
  );
}