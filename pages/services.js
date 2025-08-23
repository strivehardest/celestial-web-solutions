import { motion } from "framer-motion";
import { Monitor, Code, Search, ShoppingCart, Palette, Headphones, Target, MousePointer } from "lucide-react";
import Navbar from '../components/Navbar';
import { useEffect } from "react";

const services = [
  { 
    title: "Web Development", 
    description: "At Celestial Web Solutions, we specialize in building robust, scalable web applications and custom portals using cutting-edge technologies like React, Next.js, Node.js, and modern frameworks. Our development process begins with thorough requirement analysis and system architecture design, followed by agile development methodologies to ensure timely delivery. We create everything from simple business websites to complex enterprise-level web systems, including custom Content Management Systems (CMS), e-learning platforms, customer portals, and API integrations. Our developers are proficient in both frontend and backend technologies, ensuring seamless user experiences with powerful server-side functionality. We prioritize clean, maintainable code, performance optimization, and scalability to ensure your web applications grow with your business needs. Each project includes comprehensive testing, documentation, and post-launch support to guarantee optimal performance and reliability.",
    icon: Code,
    keywords: ["web development", "custom web applications", "scalable websites", "modern web technologies", "React development", "Node.js"]
  },
  { 
    title: "Web Design", 
    description: "At Celestial Web Solutions, we create stunning, responsive websites that captivate your audience across all devices and screen sizes. Our design philosophy seamlessly blends modern aesthetics with intuitive user experience, ensuring your brand stands out in the competitive digital landscape. We begin every project with comprehensive brand analysis and target audience research to create designs that truly resonate with your customers. Our design process includes wireframing, mockup creation, prototyping, and iterative refinement based on client feedback. We specialize in creating visually appealing layouts with optimal color schemes, typography, and imagery that reflects your brand identity. Our responsive designs ensure perfect functionality across desktops, tablets, and mobile devices, incorporating the latest design trends like minimalism, micro-interactions, and accessibility standards. We also focus on conversion-oriented design elements, strategic call-to-action placement, and user journey optimization to maximize engagement and business results.",
    icon: Monitor,
    keywords: ["responsive web design", "modern website design", "UI design", "brand identity", "mobile-first design"]
  },
  { 
    title: "E-Commerce Solutions", 
    description: "At Celestial Web Solutions, we develop comprehensive, high-converting online stores that maximize your sales potential and provide exceptional shopping experiences. Our e-commerce platforms are built with scalability in mind, featuring secure payment gateways, advanced inventory management systems, and user-friendly interfaces that convert visitors into loyal customers. We integrate multiple payment options including PayPal, Stripe, bank transfers, and mobile money solutions popular in Ghana and Africa. Our e-commerce solutions include advanced features like abandoned cart recovery, wishlist functionality, product recommendations, multi-currency support, and detailed analytics dashboards. We implement robust security measures including SSL certificates, PCI compliance, and fraud protection to ensure customer data safety. Our platforms are optimized for search engines and mobile devices, include social media integration, and support multiple shipping options. We also provide comprehensive admin panels for easy product management, order processing, and customer relationship management.",
    icon: ShoppingCart,
    keywords: ["e-commerce development", "online store", "payment gateway", "shopping cart solutions", "mobile money integration"]
  },
  { 
    title: "SEO Optimization", 
    description: "At Celestial Web Solutions, we elevate your online visibility with proven, data-driven SEO strategies that drive organic traffic and significantly improve search engine rankings. Our comprehensive SEO approach begins with thorough website audits, competitor analysis, and keyword research tailored to your industry and target market in Ghana and beyond. We implement both on-page and off-page optimization techniques, including content optimization, meta tag enhancement, internal linking strategies, and technical SEO improvements like site speed optimization and mobile responsiveness. Our services include local SEO for Ghana-based businesses, Google My Business optimization, citation building, and reputation management. We create engaging, SEO-friendly content that addresses your audience's search intent while building your authority in your industry. Our team stays updated with Google algorithm changes and implements white-hat SEO practices that deliver sustainable, long-term results. We provide detailed monthly reports showing ranking improvements, traffic growth, and conversion metrics to demonstrate the tangible impact of our SEO efforts.",
    icon: Search,
    keywords: ["SEO services", "search engine optimization", "organic traffic", "keyword research", "local SEO Ghana"]
  },
  { 
    title: "UX/UI Design", 
    description: "At Celestial Web Solutions, we craft exceptional user experiences through thoughtful UX/UI design that combines aesthetic appeal with functional excellence. Our design process begins with extensive user research, persona development, and journey mapping to understand your target audience's needs, behaviors, and pain points. We create detailed wireframes, interactive prototypes, and conduct usability testing to ensure optimal user flow and interface design. Our UI designs focus on visual hierarchy, color psychology, typography selection, and consistent design systems that enhance brand recognition and user engagement. We specialize in creating intuitive navigation structures, efficient information architecture, and accessibility-compliant designs that cater to users with diverse abilities. Our designs are optimized for conversion, incorporating strategic placement of call-to-action buttons, forms, and interactive elements. We also ensure cross-platform consistency, designing interfaces that work seamlessly across web, mobile, and tablet devices while maintaining the same high-quality user experience and brand consistency throughout all touchpoints.",
    icon: Palette,
    keywords: ["UX design", "UI design", "user experience", "interface design", "wireframing", "usability testing"]
  },
  { 
    title: "IT Support", 
    description: "At Celestial Web Solutions, we provide comprehensive IT support services designed to keep your business technology infrastructure running smoothly and efficiently. Our IT support encompasses everything from initial system setup and configuration to ongoing maintenance, troubleshooting, and strategic technology consulting. We offer both remote and on-site support for hardware issues, software installations, network configuration, and security implementations. Our services include regular system maintenance, software updates, backup solutions, cybersecurity measures, and disaster recovery planning. We provide proactive monitoring of your systems to identify and resolve potential issues before they impact your business operations. Our team is experienced in supporting various operating systems, cloud platforms, and business applications commonly used in Ghana and internationally. We also offer technology consulting to help you make informed decisions about hardware upgrades, software selections, and digital transformation initiatives. Our goal is to ensure your technology serves as an enabler for your business growth rather than a source of frustration or downtime.",
    icon: Headphones,
    keywords: ["IT support", "technical support", "system maintenance", "technology consulting", "cybersecurity", "network support"]
  },
  { 
    title: "Google AdSense Management", 
    description: "At Celestial Web Solutions, we maximize your website's revenue potential through strategic Google AdSense optimization and comprehensive monetization strategies. Our data-driven approach begins with thorough analysis of your website's content, traffic patterns, and user behavior to identify the most profitable ad placement opportunities. We implement advanced ad optimization techniques including strategic ad unit placement, size optimization, and A/B testing to maximize click-through rates and earnings per click. Our services include content strategy development to create high-quality, AdSense-friendly content that attracts both users and advertisers. We monitor your AdSense performance continuously, analyzing metrics like page RPM, CTR, and CPC to make data-driven optimizations. We also ensure compliance with Google AdSense policies, helping you avoid violations that could lead to account suspension. Our team stays updated with AdSense policy changes and industry best practices, implementing white-hat optimization techniques that deliver sustainable revenue growth. We provide detailed monthly reports showing revenue growth, traffic analysis, and optimization recommendations to help you understand and improve your website's monetization performance.",
    icon: Target,
    keywords: ["Google AdSense", "ad revenue optimization", "website monetization", "advertising income", "content monetization"]
  },
  { 
    title: "Google Ads Management", 
    description: "At Celestial Web Solutions, we drive targeted traffic and maximize conversions through expertly managed Google Ads campaigns tailored to the Ghanaian and international markets. Our certified Google Ads specialists handle every aspect of your campaigns, from initial strategy development and keyword research to ad creation, bid management, and continuous performance optimization. We begin with comprehensive market research and competitor analysis to identify the most profitable keywords and audience segments for your business. Our campaign setup includes precise audience targeting, geographic targeting (especially for Ghana-based businesses), device optimization, and strategic budget allocation across different campaign types including Search, Display, Shopping, and Video ads. We create compelling ad copy that resonates with your target audience and drives action, while continuously testing different variations to improve performance. Our optimization process includes regular bid adjustments, negative keyword management, ad schedule optimization, and landing page recommendations to maximize your return on ad spend (ROAS). We provide transparent, detailed reporting that shows exactly how your advertising budget is performing and contributing to your business growth.",
    icon: MousePointer,
    keywords: ["Google Ads", "PPC management", "paid advertising", "conversion optimization", "campaign management", "ROAS optimization"]
  }
];

export default function ServicesPage() {
  // SEO Meta Tags and Structured Data
  useEffect(() => {
    // Update page title and meta description
    document.title = "Professional Web Services | Celestial Web Solutions - Web Development, SEO & Digital Marketing";
    
    // Create or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Expert web development, design, SEO optimization, e-commerce solutions, and digital marketing services. Transform your business with Celestial Web Solutions' comprehensive digital services.";

    // Create or update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "web development, web design, SEO optimization, e-commerce solutions, UX/UI design, IT support, Google AdSense, Google Ads, digital marketing, responsive design";

    // Add Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: 'Best Web Designer in Accra, Professional Web Services | Celestial Web Solutions' },
      { property: 'og:description', content: 'Expert web development, design, SEO optimization, and digital marketing services to transform your business online.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'Celestial Web Solutions' }
    ];

    ogTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!existingTag) {
        existingTag = document.createElement('meta');
        existingTag.setAttribute('property', tag.property);
        document.head.appendChild(existingTag);
      }
      existingTag.content = tag.content;
    });

    // Add Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Best Web Designer in Ghana, Professional Web Services | Celestial Web Solutions' },
      { name: 'twitter:description', content: 'Expert web development, design, SEO optimization, and digital marketing services.' }
    ];

    twitterTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!existingTag) {
        existingTag = document.createElement('meta');
        existingTag.name = tag.name;
        document.head.appendChild(existingTag);
      }
      existingTag.content = tag.content;
    });

    // Add structured data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Celestial Web Solutions",
      "description": "Best web Designer in Accra, Best Web Developr in Accra, design, and digital marketing services",
      "url": window.location.origin,
      "logo": `${window.location.origin}/logo.png`,
      "sameAs": [
        "https://facebook.com/celestialwebsolutions",
        "https://twitter.com/celestialweb",
        "https://linkedin.com/company/celestial-web-solutions"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+233-245671832",
        "contactType": "Customer Service",
        "availableLanguage": "English"
      },
      "areaServed": "Worldwide",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Services",
        "itemListElement": services.map((service, index) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.title,
            "description": service.description,
            "provider": {
              "@type": "Organization",
              "name": "Celestial Web Solutions"
            }
          }
        }))
      }
    };

    let structuredDataScript = document.querySelector('#structured-data');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

    // Cleanup function
    return () => {
      // Remove structured data on unmount
      const script = document.querySelector('#structured-data');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 text-center"
        >
          <h1 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
          >
            Our Professional Services
          </h1>
          <p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            Comprehensive digital solutions to transform your business presence and drive measurable growth.
          </p>
        </motion.div>

        {/* Two Column Services Grid */}
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex gap-6 mb-6">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {service.icon && <service.icon className="w-8 h-8 text-white" />}
                  </motion.div>
                  <h3 
                    className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors"
                    style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                  >
                    {service.title}
                  </h3>
                </div>

                <p 
                  className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                >
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.keywords.map((keyword, idx) => (
                    <span 
                      key={idx}
                      className="text-sm px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full"
                      style={{ fontFamily: 'Quicksand, sans-serif' }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              Ready to Transform Your Business?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/25"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
              >
                Get Started Today
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-orange-500 text-orange-600 dark:text-orange-400 font-semibold rounded-xl hover:bg-orange-500 hover:text-white"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/portfolio'}
              >
                View Our Work
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}