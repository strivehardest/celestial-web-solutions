import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { Monitor, Code, Search, ShoppingCart, Palette, Headphones, Target, MousePointer, Check, ArrowRight } from "lucide-react";
import Head from "next/head";
import WhatsAppButton from '../../components/WhatsAppButton';

// Service data with detailed content
const servicesData = {
  "web-development": {
    title: "Web Development",
    icon: Code,
    description: "Transform your business with custom web solutions built using cutting-edge technologies",
    longDescription: "We specialize in creating robust, scalable web applications that drive business growth. Our expert developers use modern frameworks and best practices to deliver solutions that are fast, secure, and built to scale with your business needs.",
    features: [
      "Custom Web Applications",
      "Content Management Systems (CMS)",
      "E-learning Platforms",
      "API Development & Integration",
      "Progressive Web Apps (PWA)",
      "Database Design & Optimization",
      "Performance Optimization",
      "Security Implementation"
    ],
    technologies: ["React", "Next.js", "Node.js", "Javascript", "HTML5", "CSS3", "WordPress", "django"],
    benefits: [
      { title: "Scalable Architecture", description: "Build applications that grow with your business without performance degradation" },
      { title: "Modern Tech Stack", description: "Leverage the latest technologies for optimal performance and user experience" },
      { title: "SEO-Friendly", description: "Built-in SEO optimization for better search engine visibility" },
      { title: "Maintenance & Support", description: "Ongoing support and updates to keep your application running smoothly" }
    ],
    process: [
      { step: 1, title: "Discovery & Planning", description: "We understand your business goals, target audience, and technical requirements" },
      { step: 2, title: "Design & Architecture", description: "Create wireframes, user flows, and technical architecture" },
      { step: 3, title: "Development", description: "Build your application using agile methodology with regular updates" },
      { step: 4, title: "Testing & QA", description: "Rigorous testing across devices, browsers, and scenarios" },
      { step: 5, title: "Deployment", description: "Launch your application with zero downtime and monitoring" },
      { step: 6, title: "Support & Maintenance", description: "Ongoing updates, security patches, and feature enhancements" }
    ],
    pricing: {
      starting: "GH₵ 2,000",
      note: "Pricing varies based on project complexity and requirements"
    }
  },
  "web-design": {
    title: "Web Design",
    icon: Monitor,
    description: "Create stunning, user-centric designs that captivate and convert",
    longDescription: "Our design team creates beautiful, intuitive websites that not only look amazing but also deliver exceptional user experiences. We combine aesthetics with functionality to create designs that resonate with your target audience and drive conversions.",
    features: [
      "Responsive Design",
      "Mobile-First Approach",
      "Brand Identity Integration",
      "UI/UX Design",
      "Wireframing & Prototyping",
      "Color Theory & Typography",
      "Accessibility Compliance",
      "Conversion Optimization"
    ],
    technologies: ["Figma", "Canva", "Photoshop", "Illustrator", "Tailwind CSS", "Bootstrap"],
    benefits: [
      { title: "First Impressions Matter", description: "Make a lasting impact with professionally designed interfaces" },
      { title: "User-Centric Design", description: "Designs focused on user needs and behavior patterns" },
      { title: "Brand Consistency", description: "Cohesive design language across all touchpoints" },
      { title: "Higher Conversions", description: "Strategic design elements that drive user actions" }
    ],
    process: [
      { step: 1, title: "Research & Discovery", description: "Understanding your brand, audience, and competitors" },
      { step: 2, title: "Concept Development", description: "Creating initial design concepts and mood boards" },
      { step: 3, title: "Wireframing", description: "Developing layout structure and user flow" },
      { step: 4, title: "Visual Design", description: "Applying colors, typography, and brand elements" },
      { step: 5, title: "Prototyping", description: "Creating interactive prototypes for testing" },
      { step: 6, title: "Final Delivery", description: "Delivering design files and style guides" }
    ],
    pricing: {
      starting: "GH₵ 1,500",
      note: "Custom quotes based on project scope and deliverables"
    }
  },
  "ecommerce-solutions": {
    title: "E-Commerce Solutions",
    icon: ShoppingCart,
    description: "Build powerful online stores that drive sales and delight customers",
    longDescription: "Launch a successful online store with our comprehensive e-commerce solutions. We create secure, scalable platforms with seamless payment integration, inventory management, and analytics to help you grow your online business.",
    features: [
      "Custom Shopping Cart",
      "Payment Gateway Integration",
      "Mobile Money Integration",
      "Inventory Management",
      "Order Tracking System",
      "Customer Reviews & Ratings",
      "Abandoned Cart Recovery",
      "Analytics Dashboard"
    ],
    technologies: ["WooCommerce", "Shopify", "Paystack", "Stripe", "React", "Node.js", "Flutterwave"],
    benefits: [
      { title: "Secure Payments", description: "Multiple payment options with bank-level security" },
      { title: "Mobile Commerce", description: "Optimized shopping experience on all devices" },
      { title: "Inventory Control", description: "Real-time stock management and alerts" },
      { title: "Growth Tools", description: "Built-in marketing and sales optimization features" }
    ],
    process: [
      { step: 1, title: "Business Analysis", description: "Understanding your products, target market, and business model" },
      { step: 2, title: "Platform Selection", description: "Choosing the right e-commerce platform for your needs" },
      { step: 3, title: "Store Setup", description: "Configuring products, categories, and payment methods" },
      { step: 4, title: "Custom Development", description: "Building custom features and integrations" },
      { step: 5, title: "Testing & QA", description: "Thorough testing of checkout, payments, and user flows" },
      { step: 6, title: "Launch & Training", description: "Going live and training your team on store management" }
    ],
    pricing: {
      starting: "GH₵ 3,000",
      note: "Pricing depends on store complexity and integrations"
    }
  },
  "seo-optimization": {
    title: "SEO Optimization",
    icon: Search,
    description: "Boost your visibility and drive organic traffic with proven SEO strategies",
    longDescription: "Dominate search results with our data-driven SEO services. We implement comprehensive strategies that improve your rankings, increase organic traffic, and drive qualified leads to your business.",
    features: [
      "Keyword Research & Analysis",
      "On-Page Optimization",
      "Technical SEO Audit",
      "Local SEO",
      "Content Strategy",
      "Link Building",
      "Competitor Analysis",
      "Monthly Reporting"
    ],
    technologies: ["Google Analytics", "Google Search Console", "SEMrush", "Ahrefs", "Moz", "Screaming Frog", "Yoast SEO"],
    benefits: [
      { title: "Increased Visibility", description: "Rank higher in search results for relevant keywords" },
      { title: "Quality Traffic", description: "Attract visitors who are actively searching for your services" },
      { title: "Better ROI", description: "Cost-effective marketing with long-term results" },
      { title: "Measurable Results", description: "Track rankings, traffic, and conversions with detailed reports" }
    ],
    process: [
      { step: 1, title: "SEO Audit", description: "Comprehensive analysis of your current SEO performance" },
      { step: 2, title: "Strategy Development", description: "Creating a custom SEO roadmap for your business" },
      { step: 3, title: "On-Page Optimization", description: "Optimizing content, meta tags, and site structure" },
      { step: 4, title: "Technical SEO", description: "Improving site speed, mobile-friendliness, and crawlability" },
      { step: 5, title: "Content Creation", description: "Developing SEO-optimized content for your audience" },
      { step: 6, title: "Monitoring & Reporting", description: "Tracking progress and adjusting strategies" }
    ],
    pricing: {
      starting: "GH₵ 800/month",
      note: "Monthly packages with flexible terms"
    }
  },
  "ux-ui-design": {
    title: "UX/UI Design",
    icon: Palette,
    description: "Create intuitive interfaces that users love",
    longDescription: "We design user experiences that are both beautiful and functional. Our UX/UI design services focus on creating interfaces that are intuitive, accessible, and aligned with your business goals.",
    features: [
      "User Research",
      "Information Architecture",
      "Wireframing",
      "Interactive Prototypes",
      "Usability Testing",
      "Design Systems",
      "Accessibility Design",
      "Interaction Design"
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "Framer"],
    benefits: [
      { title: "User Satisfaction", description: "Create experiences that users find intuitive and enjoyable" },
      { title: "Reduced Development Costs", description: "Catch usability issues early in the design phase" },
      { title: "Competitive Advantage", description: "Stand out with superior user experience" },
      { title: "Data-Driven Decisions", description: "Design based on user research and testing" }
    ],
    process: [
      { step: 1, title: "User Research", description: "Understanding your users through interviews and surveys" },
      { step: 2, title: "Persona Development", description: "Creating detailed user personas and journey maps" },
      { step: 3, title: "Information Architecture", description: "Organizing content and navigation structure" },
      { step: 4, title: "Wireframing", description: "Creating low-fidelity designs to test concepts" },
      { step: 5, title: "Visual Design", description: "Applying visual elements and brand identity" },
      { step: 6, title: "Usability Testing", description: "Testing designs with real users and iterating" }
    ],
    pricing: {
      starting: "GH₵ 2,500",
      note: "Project-based pricing for comprehensive UX/UI packages"
    }
  },
  "it-support": {
    title: "IT Support",
    icon: Headphones,
    description: "Keep your technology running smoothly with expert IT support",
    longDescription: "Our IT support services ensure your business technology operates efficiently and securely. From system setup to ongoing maintenance, we provide the technical expertise you need to focus on growing your business.",
    features: [
      "Help Desk Support",
      "System Maintenance",
      "Security Management",
      "Data Backup Solutions",
      "Network Setup",
      "Cloud Services",
      "Hardware Support",
      "Remote Assistance"
    ],
    technologies: ["Microsoft 365", "Google Workspace", "VPN", "Firewalls"],
    benefits: [
      { title: "24/7 Support", description: "Get help whenever you need it with our support team" },
      { title: "Proactive Monitoring", description: "Prevent issues before they affect your business" },
      { title: "Cost Savings", description: "Reduce downtime and avoid expensive IT emergencies" },
      { title: "Expert Guidance", description: "Access to experienced IT professionals" }
    ],
    process: [
      { step: 1, title: "Assessment", description: "Evaluating your current IT infrastructure" },
      { step: 2, title: "Strategy Development", description: "Creating an IT support plan tailored to your needs" },
      { step: 3, title: "Implementation", description: "Setting up systems and support protocols" },
      { step: 4, title: "Monitoring", description: "Continuous monitoring of your systems" },
      { step: 5, title: "Support", description: "Providing ongoing help desk and technical support" },
      { step: 6, title: "Optimization", description: "Regular reviews and improvements to your IT systems" }
    ],
    pricing: {
      starting: "GH₵ 500/month",
      note: "Flexible support packages based on your needs"
    }
  },
  "google-adsense-management": {
    title: "Google AdSense Management",
    icon: Target,
    description: "Maximize your website revenue through strategic AdSense optimization",
    longDescription: "We help you maximize your website revenue through strategic AdSense optimization. Our services include ad placement optimization, A/B testing, content strategy development, performance monitoring, and policy compliance to ensure sustainable revenue growth from your website traffic.",
    features: [
      "Ad Placement Optimization",
      "Revenue Tracking & Analytics",
      "A/B Testing",
      "Content Strategy",
      "Policy Compliance",
      "Performance Monitoring",
      "Mobile Optimization",
      "Monthly Revenue Reports"
    ],
    technologies: ["Google AdSense", "Google Analytics", "Google Tag Manager", "AdThrive", "Mediavine"],
    benefits: [
      { title: "Increased Revenue", description: "Optimize ad placements for maximum earnings" },
      { title: "Policy Compliance", description: "Stay compliant with AdSense policies to avoid penalties" },
      { title: "Performance Insights", description: "Detailed analytics and reporting on ad performance" },
      { title: "Strategic Placement", description: "Balance user experience with revenue optimization" }
    ],
    process: [
      { step: 1, title: "Account Audit", description: "Reviewing your current AdSense setup and performance" },
      { step: 2, title: "Strategy Development", description: "Creating an optimization plan for your website" },
      { step: 3, title: "Implementation", description: "Optimizing ad placements and formats" },
      { step: 4, title: "Testing", description: "A/B testing different ad configurations" },
      { step: 5, title: "Monitoring", description: "Tracking performance and making adjustments" },
      { step: 6, title: "Reporting", description: "Monthly reports with insights and recommendations" }
    ],
    pricing: {
      starting: "GH₵ 600/month",
      note: "Performance-based pricing options available"
    }
  },
  "google-ads-management": {
    title: "Google Ads Management",
    icon: MousePointer,
    description: "Drive targeted traffic and maximize conversions with expert Google Ads campaigns",
    longDescription: "We drive targeted traffic and maximize conversions through expertly managed Google Ads campaigns. Our certified specialists handle strategy, keyword research, ad creation, bid management, and continuous optimization across Search, Display, Shopping, and Video campaigns to maximize your ROI.",
    features: [
      "Campaign Strategy & Setup",
      "Keyword Research",
      "Ad Copy Creation",
      "Bid Management",
      "Landing Page Optimization",
      "Conversion Tracking",
      "A/B Testing",
      "Performance Reporting"
    ],
    technologies: ["Google Ads", "Google Analytics", "Google Tag Manager", "SEMrush", "Google Keyword Planner"],
    benefits: [
      { title: "Targeted Traffic", description: "Reach customers actively searching for your products or services" },
      { title: "Measurable ROI", description: "Track every click, conversion, and dollar spent" },
      { title: "Quick Results", description: "Start seeing results within days, not months" },
      { title: "Expert Management", description: "Google Ads certified specialists managing your campaigns" }
    ],
    process: [
      { step: 1, title: "Business Analysis", description: "Understanding your goals, audience, and competition" },
      { step: 2, title: "Campaign Strategy", description: "Developing a comprehensive advertising strategy" },
      { step: 3, title: "Setup & Launch", description: "Creating campaigns, ad groups, and compelling ads" },
      { step: 4, title: "Optimization", description: "Continuous testing and refinement of campaigns" },
      { step: 5, title: "Monitoring", description: "Daily monitoring and bid adjustments" },
      { step: 6, title: "Reporting", description: "Detailed performance reports and strategy updates" }
    ],
    pricing: {
      starting: "GH₵ 1,000/month",
      note: "Management fee separate from ad spend budget"
    }
  }
};

export default function ServiceDetail() {
  const router = useRouter();
  const { slug } = router.query;
  
  // Add early return for initial render
  if (!router.isReady) {
    return null;
  }
  
  const service = slug ? servicesData[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Service not found</h1>
          <Link href="/services" className="text-orange-500 hover:text-orange-600">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <>
      <Head>
        <title>{service.title} | Celestial Web Solutions</title>
        <meta name="description" content={service.description} />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white py-20">
          <div className="container mx-auto px-4">
            <Link href="/services" className="inline-flex items-center text-white hover:text-orange-100 mb-8">
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to Services
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex items-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg mr-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  {service.title}
                </h1>
              </div>
              <p className="text-xl text-orange-100" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                {service.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Overview
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                {service.longDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg"
                >
                  <Check className="w-6 h-6 text-orange-500 mb-3" />
                  <p className="text-gray-900 dark:text-white font-medium" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Technologies We Use
            </h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {service.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-full font-medium"
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Why Choose Us
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {service.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl"
                >
                  <Target className="w-10 h-10 text-orange-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Our Process
            </h2>
            <div className="max-w-4xl mx-auto">
              {service.process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 mb-8"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Pricing
            </h2>
            <p className="text-5xl font-bold mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Starting from {service.pricing.starting}
            </p>
            <p className="text-xl text-orange-100 mb-8" style={{ fontFamily: 'Quicksand, sans-serif' }}>
              {service.pricing.note}
            </p>
            <Link href="/contact" className="inline-flex items-center bg-white text-orange-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors" style={{ fontFamily: 'Quicksand, sans-serif' }}>
              Get a Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                Let's discuss how we can help you achieve your goals with our {service.title.toLowerCase()} services.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  Contact Us
                </Link>
                <Link href="/services" className="bg-gray-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-600 transition-colors" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  View All Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <WhatsAppButton />
      </div>
    </>
  );
}