import Head from "next/head";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Users,
  Globe,
  Bell,
  FileText,
  CheckCircle,
  AlertTriangle,
  Mail
} from "lucide-react";
import WhatsAppButton from '../components/WhatsAppButton';
import PremiumCTA from '../components/PremiumCTA';

export default function Privacy() {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: Database,
      content: `We collect information that you provide directly to us and information that is automatically collected when you use our services:

Personal Information:
â€¢ Name, email address, phone number, and company name
â€¢ Billing and payment information
â€¢ Project requirements and business information
â€¢ Communication preferences and correspondence

Technical Information:
â€¢ IP address, browser type, and device information
â€¢ Website usage data and analytics
â€¢ Cookies and similar tracking technologies
â€¢ Log files and performance data

Project-Related Information:
â€¢ Content, images, and materials you provide for projects
â€¢ Feedback and communication during project development
â€¢ Access credentials for third-party services (encrypted)
â€¢ Website performance and user behavior data

We only collect information that is necessary to provide our services effectively and improve your experience.`
    },
    {
      title: "2. How We Use Your Information",
      icon: Eye,
      content: `We use the information we collect for the following purposes:

Service Delivery:
â€¢ To provide, maintain, and improve our web development services
â€¢ To process payments and manage your account
â€¢ To communicate with you about projects and services
â€¢ To provide customer support and respond to inquiries

Business Operations:
â€¢ To analyze website usage and improve our services
â€¢ To develop new features and functionality
â€¢ To conduct research and analytics
â€¢ To maintain security and prevent fraud

Marketing and Communication:
â€¢ To send you updates about our services (with your consent)
â€¢ To provide relevant promotional materials
â€¢ To send project updates and important notifications
â€¢ To request feedback and reviews

Legal Compliance:
â€¢ To comply with legal obligations and regulations
â€¢ To protect our rights and enforce our terms
â€¢ To respond to legal requests and prevent harm

We do not sell or rent your personal information to third parties for their marketing purposes.`
    },
    {
      title: "3. Information Sharing and Disclosure",
      icon: Users,
      content: `We may share your information in the following circumstances:

Service Providers:
â€¢ Third-party vendors who assist in providing our services
â€¢ Payment processors (Flutterwave, Paystack, mobile money providers)
â€¢ Hosting providers and cloud service platforms
â€¢ Email and communication service providers
â€¢ Analytics and performance monitoring tools

Business Transfers:
â€¢ In connection with a merger, acquisition, or sale of assets
â€¢ During negotiations of such transactions
â€¢ To successor entities in business transitions

Legal Requirements:
â€¢ To comply with applicable laws and regulations
â€¢ In response to legal process or government requests
â€¢ To protect our rights, property, or safety
â€¢ To prevent fraud or security issues

With Your Consent:
â€¢ When you explicitly authorize us to share information
â€¢ For purposes you have approved
â€¢ To third parties specified by you

All third-party service providers are required to maintain appropriate security measures and use your information only for specified purposes.`
    },
    {
      title: "4. Data Security",
      icon: Lock,
      content: `We implement comprehensive security measures to protect your information:

Technical Security:
â€¢ SSL/TLS encryption for data transmission
â€¢ Secure servers and encrypted databases
â€¢ Regular security audits and updates
â€¢ Firewall protection and intrusion detection
â€¢ Access controls and authentication systems

Organizational Security:
â€¢ Limited access to personal information on a need-to-know basis
â€¢ Employee training on data protection
â€¢ Confidentiality agreements with staff and contractors
â€¢ Regular security policy reviews and updates

Data Protection Practices:
â€¢ Secure backup systems with encryption
â€¢ Password protection and two-factor authentication
â€¢ Secure file transfer protocols
â€¢ Regular software updates and patches
â€¢ Incident response and breach notification procedures

While we implement strong security measures, no system is completely secure. We continuously work to improve our security practices and protect your information.`
    },
    {
      title: "5. Cookies and Tracking Technologies",
      icon: Globe,
      content: `We use cookies and similar technologies to enhance your experience:

Types of Cookies We Use:
â€¢ Essential cookies: Required for website functionality
â€¢ Performance cookies: Help us understand how visitors use our site
â€¢ Functionality cookies: Remember your preferences and settings
â€¢ Analytics cookies: Collect information about site usage

Third-Party Cookies:
â€¢ Google Analytics for website analytics
â€¢ Social media plugins (Facebook, Instagram, LinkedIn)
â€¢ Payment processing services
â€¢ Advertising and marketing platforms

Your Cookie Choices:
â€¢ Most browsers allow you to control cookies through settings
â€¢ You can block or delete cookies at any time
â€¢ Disabling cookies may affect website functionality
â€¢ You can opt out of third-party cookies individually

Cookie Policy:
â€¢ We display cookie consent notices on first visit
â€¢ You can update your cookie preferences at any time
â€¢ We respect Do Not Track signals where applicable
â€¢ Cookie retention periods vary by type and purpose

For more information about cookies and how to manage them, please visit your browser's help section.`
    },
    {
      title: "6. Your Privacy Rights",
      icon: Shield,
      content: `You have certain rights regarding your personal information:

Access Rights:
â€¢ Request access to your personal information
â€¢ Receive a copy of the data we hold about you
â€¢ Know what information we collect and how we use it
â€¢ Understand who we share your information with

Correction and Update:
â€¢ Request correction of inaccurate information
â€¢ Update your personal details and preferences
â€¢ Modify your communication settings
â€¢ Change your consent preferences

Deletion Rights:
â€¢ Request deletion of your personal information
â€¢ Withdraw consent for data processing
â€¢ Opt out of marketing communications
â€¢ Close your account and associated data

Additional Rights:
â€¢ Object to certain types of processing
â€¢ Request data portability (receive data in portable format)
â€¢ Lodge a complaint with data protection authorities
â€¢ Restrict processing under certain circumstances

To exercise these rights, please contact us at info@celestialwebsolutions.net. We will respond to requests within 30 days.`
    },
    {
      title: "7. Data Retention",
      icon: Database,
      content: `We retain your information for specific periods based on legal and business needs:

Account Information:
â€¢ Active account data: Retained while account is active
â€¢ Inactive accounts: May be deleted after 3 years of inactivity
â€¢ Contact information: Retained for communication purposes
â€¢ Payment history: Retained for 7 years for tax compliance

Project Data:
â€¢ Project files and deliverables: Retained for duration of service agreement
â€¢ Client-provided content: Returned or deleted upon request after project completion
â€¢ Project communications: Retained for 2 years for reference
â€¢ Backup copies: Maintained according to backup schedules (30-90 days)

Legal and Financial Records:
â€¢ Contracts and agreements: 7 years after termination
â€¢ Financial transactions: 7 years for tax and accounting purposes
â€¢ Legal correspondence: Retained as long as legally required

Marketing Data:
â€¢ Marketing communications: Until you unsubscribe or object
â€¢ Analytics data: Aggregated and anonymized after 2 years
â€¢ Cookie data: Varies by cookie type (session to 2 years)

We regularly review and delete data that is no longer necessary. You can request early deletion of your data by contacting us.`
    },
    {
      title: "8. Third-Party Services",
      icon: Globe,
      content: `We use various third-party services that may collect and process your information:

Essential Services:
â€¢ Web hosting providers (secure servers and infrastructure)
â€¢ Domain registrars (domain management services)
â€¢ Payment processors (Flutterwave, Paystack, mobile money services)
â€¢ Email service providers (business communication)

Development Tools:
â€¢ Content management systems (WordPress, custom platforms)
â€¢ Development frameworks and libraries
â€¢ Version control and collaboration tools
â€¢ Testing and debugging services

Marketing and Analytics:
â€¢ Google Analytics (website traffic analysis)
â€¢ Social media platforms (Facebook, Instagram, LinkedIn)
â€¢ Email marketing services (when applicable)
â€¢ CRM systems for client management

Your Responsibilities:
â€¢ Review third-party privacy policies independently
â€¢ Understand data sharing with integrated services
â€¢ Manage your preferences within third-party services
â€¢ Contact third parties directly for their data practices

We carefully select third-party providers and ensure they maintain appropriate privacy and security standards. However, we are not responsible for the privacy practices of third-party services.`
    },
    {
      title: "9. International Data Transfers",
      icon: Globe,
      content: `Your information may be transferred and processed in different locations:

Primary Operations:
â€¢ Our primary operations are based in Ghana
â€¢ Data is primarily stored on servers in secure locations
â€¢ Some services may use international cloud providers
â€¢ We ensure appropriate safeguards for all transfers

Data Protection Measures:
â€¢ Standard contractual clauses with international providers
â€¢ Adequacy decisions and recognized transfer mechanisms
â€¢ Encryption during transmission and storage
â€¢ Compliance with applicable data protection laws

Third-Party Services:
â€¢ Some third-party services may process data internationally
â€¢ Cloud services may use data centers in multiple countries
â€¢ We ensure providers meet appropriate security standards
â€¢ Data processing agreements are in place with all providers

Your Rights:
â€¢ You have the right to know where your data is processed
â€¢ Request information about safeguards we use
â€¢ Object to international transfers in certain circumstances
â€¢ Contact us for specific information about data locations

We take reasonable steps to ensure that your data receives adequate protection regardless of where it is processed.`
    },
    {
      title: "10. Children's Privacy",
      icon: Shield,
      content: `We are committed to protecting the privacy of children:

Age Restrictions:
â€¢ Our services are not intended for children under 18 years old
â€¢ We do not knowingly collect information from minors
â€¢ Parents/guardians must provide consent for minors' use of services
â€¢ We verify age when necessary

Parental Control:
â€¢ Parents have the right to review their child's information
â€¢ Request deletion of a child's personal information
â€¢ Refuse further collection or use of child's information
â€¢ Contact us immediately if you believe we have collected children's data

Data Collection:
â€¢ We do not knowingly solicit data from children
â€¢ If we learn we have collected child data, we delete it promptly
â€¢ Special protections apply to educational or youth-focused projects
â€¢ Enhanced consent requirements for services involving minors

Reporting:
If you believe we have inadvertently collected information from a child under 18, please contact us immediately at info@celestialwebsolutions.net, and we will take steps to delete such information.`
    },
    {
      title: "11. Changes to This Privacy Policy",
      icon: Bell,
      content: `We may update this privacy policy from time to time:

Updates and Modifications:
â€¢ We reserve the right to modify this policy at any time
â€¢ Material changes will be communicated via email or website notice
â€¢ Continued use of services after changes constitutes acceptance
â€¢ Version history available upon request

Notification:
â€¢ Significant changes announced with 30 days notice
â€¢ Policy update date shown at the top of this page
â€¢ Email notifications for substantial policy changes
â€¢ Website banners for important updates

Your Options:
â€¢ Review the updated policy carefully
â€¢ Contact us if you have questions about changes
â€¢ Exercise your rights if you disagree with updates
â€¢ Discontinue services if you do not accept new terms

We encourage you to review this privacy policy periodically to stay informed about how we protect your information.`
    },
    {
      title: "12. Contact Us",
      icon: FileText,
      content: `If you have questions, concerns, or requests regarding this privacy policy:

Primary Contact:
â€¢ Email: info@celestialwebsolutions.net
â€¢ Phone: +233 245 671 832
â€¢ WhatsApp: +233 530 505 031

Physical Address:
â€¢ Celestial Web Solutions, 235 Agblor Link, Keta, Ghana
â€¢ Accra, Ghana


Support Hours:
â€¢ Monday to Friday: 9:00 AM - 6:00 PM GMT
â€¢ Saturday: 10:00 AM - 4:00 PM GMT
â€¢ Sunday: Closed

Response Time:
â€¢ We aim to respond to all inquiries within 2-3 business days
â€¢ Complex requests may take up to 30 days
â€¢ Urgent privacy concerns addressed as quickly as possible
â€¢ Written confirmation provided for all requests

What to Include:
â€¢ Clear description of your request or concern
â€¢ Your contact information for follow-up
â€¢ Relevant account or project details
â€¢ Any supporting documentation

We take privacy seriously and are committed to addressing your concerns promptly and professionally.`
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Privacy Policy | Celestial Web Solutions</title>
        <meta
          name="description"
          content="Privacy policy for Celestial Web Solutions. Learn how we collect, use, protect, and manage your personal information and data."
        />
        <meta
          name="keywords"
          content="privacy policy, data protection, personal information, Celestial Web Solutions privacy, GDPR, data security"
        />
        <meta name="author" content="Celestial Web Solutions" />
        <meta name="robots" content="noindex, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy | Celestial Web Solutions" />
        <meta
          property="og:description"
          content="Read our privacy policy to understand how we protect and manage your personal information."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://celestialwebsolutions.net/privacy" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://celestialwebsolutions.net/privacy" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://www.cookieyes.com/wp-content/uploads/2023/03/privacy-by-design.png" 
              alt="Privacy Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-300/80 via-orange-500/60 to-red-500/60"></div>
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
                Privacy Policy
              </h1>
              <p
                className="text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </p>
              <div className="mt-6 text-orange-100">
                <p style={{ fontFamily: "Google Sans, sans-serif" }}>
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
              {sections.slice(0, 6).map((section, index) => (
                <motion.a
                  key={index}
                  href={`#section-${index + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm border border-orange-200 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors"
                  style={{ fontFamily: "Google Sans, sans-serif" }}
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

        {/* Privacy Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700"
            >
              <div className="flex items-start space-x-4">
                <Shield className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h2
                    className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    Our Commitment to Your Privacy
                  </h2>
                  <p
                    className="text-blue-600 dark:text-blue-200 leading-relaxed"
                    style={{ fontFamily: "Google Sans, sans-serif" }}
                  >
                    At Celestial Web Solutions, we are committed to protecting your privacy and handling your personal information with care and respect. 
                    This privacy policy explains how we collect, use, share, and protect your information when you use our services.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Privacy Sections */}
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
                    style={{ fontFamily: "Google Sans, sans-serif" }}
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
                Questions About Your Privacy?
              </h3>
              <p
                className="text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: "Google Sans, sans-serif" }}
              >
                If you have any questions about this Privacy Policy or how we handle your information, 
                please don't hesitate to contact us. We're here to address your concerns.
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
                <p style={{ fontFamily: "Google Sans, sans-serif" }}>
                  Email: info@celestialwebsolutions.net
                </p>
                <p style={{ fontFamily: "Google Sans, sans-serif" }}>
                  Phone: +233 245 671 832
                </p>
                <p style={{ fontFamily: "Google Sans, sans-serif" }}>
                  Address: 235 Agblor Link, Keta, Ghana
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
