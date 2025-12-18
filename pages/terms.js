import Head from "next/head";
import { motion } from "framer-motion";
import { FileText, Shield, Clock, CreditCard, Users, AlertTriangle, CheckCircle, Info, Mail, Phone, MapPin } from "lucide-react";
import WhatsAppButton from '../components/WhatsAppButton';
import PremiumCTA from '../components/PremiumCTA';


export default function Terms() {
  const sections = [
    {
      title: "1. Agreement to Terms",
      icon: FileText,
      content: `By accessing and using the services provided by Celestial Web Solutions ("we," "our," or "us"), you ("client," "you," or "your") accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms and conditions, you are not authorized to use or access our services.

These terms constitute a legally binding agreement between you and Celestial Web Solutions. We reserve the right to update, change or replace any part of these Terms and Conditions by posting updates and/or changes to our website.`
    },
    {
      title: "2. Services Description",
      icon: Users,
      content: `Celestial Web Solutions provides web development, web design, e-commerce solutions, digital marketing, SEO optimization, and related technology services. Our services include but are not limited to:

• Custom website development using modern technologies (React, Next.js, WordPress, etc.)
• Responsive web design and user experience optimization
• E-commerce platform development and integration
• Search engine optimization (SEO) services
• Website maintenance and support services
• Digital marketing and online advertising management
• Domain registration and web hosting services

All services are provided according to the specifications agreed upon in individual project contracts or service agreements.`
    },
    {
      title: "3. Payment Terms",
      icon: CreditCard,
      content: `Payment terms are specified in individual project agreements. Unless otherwise agreed:

• Project payments are due according to the payment schedule outlined in your project agreement
• We accept payments in Ghana Cedis (₵) through mobile money, bank transfer, cash, and international payments via Flutterwave/Paystack
• A deposit of 50% is typically required before work commences
• Final payment is due upon project completion and before final delivery
• Monthly service fees (hosting, maintenance, SEO) are due in advance
• Late payments may incur a fee of 2% per month on outstanding amounts
• All prices quoted are valid for 30 days unless otherwise stated
• Additional work beyond the original scope will be charged separately

Payment schedules and methods will be clearly outlined in your project agreement.`
    },
    {
      title: "4. Project Timeline & Delivery",
      icon: Clock,
      content: `Project timelines are estimates based on project complexity and scope:

• Timeline estimates are provided in good faith based on project requirements
• Actual delivery dates may vary due to project complexity, client feedback cycles, or unforeseen technical challenges
• Client delays in providing required materials, feedback, or approvals may extend project timelines
• We will communicate any significant delays promptly and work to minimize impact
• Rush projects may incur additional fees (25-50% surcharge)
• Project completion is subject to final client approval and payment
• We strive to deliver projects on or before the agreed timeline

Timeline adjustments will be communicated and agreed upon with clients as needed.`
    },
    {
      title: "5. Client Responsibilities",
      icon: CheckCircle,
      content: `Clients are responsible for providing the following to ensure successful project completion:

• Accurate project requirements and specifications
• Timely provision of content, images, logos, and other materials
• Prompt feedback and approvals during the development process
• Access to necessary third-party services (hosting, domain, existing systems)
• Payment according to agreed schedule
• Reasonable and constructive feedback during review phases
• Final content review and approval before project launch
• Compliance with applicable laws and regulations for their business

Delays in client responsibilities may impact project timelines and may incur additional charges for extended project duration.`
    },
    {
      title: "6. Intellectual Property & Ownership",
      icon: Shield,
      content: `Ownership rights are clearly defined as follows:

• Upon full payment, clients own the final delivered website/application and custom code developed specifically for their project
• Clients retain ownership of their business content, images, logos, and proprietary information
• Celestial Web Solutions retains rights to general methodologies, techniques, and any pre-existing intellectual property
• Third-party software, plugins, and frameworks remain subject to their respective licenses
• We reserve the right to use completed projects in our portfolio and marketing materials (unless otherwise agreed)
• Any custom graphics, designs, or code developed specifically for your project becomes your property upon full payment
• We may reuse general concepts, layouts, or non-proprietary elements in future projects

Detailed intellectual property terms will be specified in individual project agreements.`
    },
    {
      title: "7. Warranties & Support",
      icon: AlertTriangle,
      content: `Our warranty and support terms include:

• 30-day warranty on custom development work for bug fixes and minor adjustments
• Ongoing support packages available for continued maintenance and updates
• We do not warrant that websites will be error-free or uninterrupted
• Third-party software/services are subject to their own warranties and terms
• Support response times vary based on support package (24-72 hours typical)
• Emergency support available for critical issues (additional charges may apply)
• We provide training and documentation to help clients manage their websites
• Major changes or new features beyond original scope are not covered under warranty

Extended support and maintenance packages are available and recommended for optimal website performance.`
    },
    {
      title: "8. Limitation of Liability",
      icon: Info,
      content: `Celestial Web Solutions' liability is limited as follows:

• Our total liability for any project shall not exceed the total amount paid by the client for that specific project
• We are not liable for indirect, incidental, special, consequential, or punitive damages
• We are not responsible for data loss, business interruption, or lost profits
• Clients are responsible for maintaining backups of their data and content
• We are not liable for issues arising from third-party services, hosting providers, or external integrations
• Force majeure events (natural disasters, government actions, etc.) may excuse performance delays
• We recommend clients maintain appropriate business insurance coverage

These limitations apply to the maximum extent permitted by law in Ghana.`
    },
    {
      title: "9. Termination",
      icon: AlertTriangle,
      content: `Either party may terminate services under the following conditions:

• Client may terminate services at any time with written notice, but remains liable for work completed and expenses incurred
• We may terminate services for non-payment, breach of terms, or if client requests violate legal/ethical standards
• Upon termination, client will receive all completed work upon payment of outstanding invoices
• Ongoing service subscriptions require 30 days written notice for cancellation
• Refunds for terminated projects will be calculated based on work completed
• All confidential information must be returned or destroyed upon termination
• Termination does not relieve either party of obligations that arose before termination

Termination procedures and any applicable refunds will be handled professionally and promptly.`
    },
    {
      title: "10. Governing Law & Dispute Resolution",
      icon: Shield,
      content: `These terms are governed by the laws of Ghana:

• Any disputes will first be addressed through good faith negotiation
• If negotiation fails, disputes will be resolved through arbitration in Accra, Ghana
• Ghana courts will have jurisdiction over any legal proceedings
• These terms are interpreted according to Ghanaian law
• Any invalid provisions will not affect the validity of remaining terms
• Amendments must be in writing and signed by both parties
• These terms supersede all previous agreements between the parties

We are committed to resolving any disputes fairly and professionally in accordance with Ghanaian legal standards.`
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Terms & Conditions | Celestial Web Solutions</title>
        <meta
          name="description"
          content="Terms and conditions for Celestial Web Solutions' web development services. Our policies on payments, project delivery, warranties, and client responsibilities."
        />
        <meta
          name="keywords"
          content="terms and conditions, web development contract, service agreement, Celestial Web Solutions terms, Ghana web development policies"
        />
        <meta name="author" content="Celestial Web Solutions" />
        <meta name="robots" content="noindex, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Terms & Conditions | Celestial Web Solutions" />
        <meta
          property="og:description"
          content="Read our terms and conditions for web development services, payment policies, and client agreements."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://celestialwebsolutions.net/terms" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://celestialwebsolutions.net/terms" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=600&fit=crop" 
              alt="Terms and Conditions Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/80 via-orange-600/80 to-red-500/80"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1
                className="text-4xl md:text-6xl font-bold text-white mb-6"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Terms & Conditions
              </h1>
              <p
                className="text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                Please read these terms and conditions carefully before using our services
              </p>
              <div className="mt-6 text-orange-100">
                <p style={{ fontFamily: "Quicksand, sans-serif" }}>
                  Last Updated: January 15, 2025
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {sections.slice(0, 5).map((section, index) => (
                <motion.a
                  key={index}
                  href={`#section-${index + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm border border-orange-200 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors"
                  style={{ fontFamily: "Quicksand, sans-serif" }}
                >
                  <section.icon size={16} className="text-orange-500" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {section.title.split('.')[1]?.trim() || section.title}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700"
            >
              <div className="flex items-start space-x-4">
                <Info className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h2
                    className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    Important Information
                  </h2>
                  <p
                    className="text-blue-600 dark:text-blue-200 leading-relaxed"
                    style={{ fontFamily: "Quicksand, sans-serif" }}
                  >
                    These terms and conditions outline the rules and regulations for the use of Celestial Web Solutions' services. 
                    By engaging our services, you agree to these terms in full. Please read them carefully and contact us if you have any questions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Terms Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  id={`section-${index + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  {/* Section Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <section.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h2
                        className="text-2xl font-bold text-gray-900 dark:text-white"
                        style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                      >
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div
                    className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: "Quicksand, sans-serif" }}
                  >
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <h3
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                Questions About Our Terms?
              </h3>
              <p
                className="text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                If you have any questions about these Terms and Conditions, please don't hesitate to contact us. 
                We're here to help clarify any concerns you may have.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <PremiumCTA href="/contact" size="large" variant="primary">
                  Contact Us
                </PremiumCTA>
                <PremiumCTA href="mailto:info@celestialwebsolutions.net" size="large" variant="primary">
                  <span>Email Us</span>
                </PremiumCTA>
              </div>

              <div className="mt-8 text-orange-100 space-y-2">
                <p className="flex items-center justify-center space-x-2" style={{ fontFamily: "Quicksand, sans-serif" }}>
                  <Mail size={18} />
                  <span>Email: info@celestialwebsolutions.net</span>
                </p>
                <p className="flex items-center justify-center space-x-2" style={{ fontFamily: "Quicksand, sans-serif" }}>
                  <Phone size={18} />
                  <span>Phone: +233 245 671 832</span>
                </p>
                <p className="flex items-center justify-center space-x-2" style={{ fontFamily: "Quicksand, sans-serif" }}>
                  <MapPin size={18} />
                  <span>235 Agblor Link, Keta, Ghana</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        <WhatsAppButton />
      </div>
    </>
  );
}